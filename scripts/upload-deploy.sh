#!/usr/bin/env bash
# The workflow bounds this entire step with GNU timeout (8 minutes).
set +x
set -euo pipefail
umask 077

fail() { printf 'Upload failed: %s\n' "$1" >&2; exit 1; }
[[ $# -le 1 ]] || fail 'expected one deploy bundle directory'
bundle=${1:-deploy}
[[ -d "$bundle" && -s "$bundle/.env" ]] || fail 'bundle or private .env is missing'
[[ ${SERVER_HOST:-} =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*$ ]] || fail 'invalid SERVER_HOST'
[[ ${SERVER_USER:-} =~ ^[a-z_][a-z0-9_-]*$ ]] || fail 'invalid SERVER_USER'
[[ ${GITHUB_RUN_ID:-} =~ ^[0-9]+$ ]] || fail 'invalid GITHUB_RUN_ID'
attempt=${GITHUB_RUN_ATTEMPT:-1}
[[ $attempt =~ ^[0-9]+$ ]] || fail 'invalid GITHUB_RUN_ATTEMPT'
[[ -n ${SERVER_SSH_KEY:-} ]] || fail 'SERVER_SSH_KEY is missing'

temporary=$(mktemp -d "${TMPDIR:-/tmp}/energo-upload.XXXXXXXX")
key=$temporary/key
hosts=$temporary/known_hosts
archive=$temporary/bundle.tar.gz
remote_dir=/home/$SERVER_USER/app
remote_archive=$remote_dir/.deploy-$GITHUB_RUN_ID-$attempt.tar.gz
partial_name=.deploy-partial-$GITHUB_RUN_ID-$attempt
target=$SERVER_USER@$SERVER_HOST
remote_owned=0
rsync_started=0
ssh_options=(-i "$key" -o BatchMode=yes -o IdentitiesOnly=yes
  -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$hosts"
  -o ConnectTimeout=15 -o ConnectionAttempts=1
  -o ServerAliveInterval=15 -o ServerAliveCountMax=3)

cleanup() {
  result=$?
  trap - EXIT TERM INT
  set +e
  if [[ $remote_owned == 1 ]]; then
    timeout --kill-after=2s 10s ssh "${ssh_options[@]}" "$target" \
      "rm -f -- '$remote_archive'" >/dev/null 2>&1
  fi
  if [[ $rsync_started == 1 ]]; then
    timeout --kill-after=2s 10s ssh "${ssh_options[@]}" "$target" \
      "find '$remote_dir' -type d -name '$partial_name' -prune -exec rm -rf -- {} +" >/dev/null 2>&1
  fi
  rm -f -- "$key" "$hosts" "$archive"
  rmdir -- "$temporary"
  exit "$result"
}
trap cleanup EXIT
trap 'exit 143' TERM
trap 'exit 130' INT

printf '%s\n' "$SERVER_SSH_KEY" > "$key"
unset SERVER_SSH_KEY
chmod 600 "$key"
chmod 600 "$bundle/.env"

# TOFU matches the previous action's unpinned host trust. Subsequent SSH/SCP
# calls use only this dedicated, verified known_hosts file and never prompt.
timeout --kill-after=2s 20s ssh-keyscan -T 10 "$SERVER_HOST" > "$hosts"
[[ -s "$hosts" ]] || fail 'SSH host key discovery returned no keys'
chmod 600 "$hosts"

# Docker archives are hundreds of MB and gzip changes defeat rsync's delta
# transfer. Existing base images remain valid across application releases.
# Verify the daemon first so an SSH/permission failure cannot mean "missing".
rsync_excludes=()
tar_excludes=()
if [[ -s "$bundle/docker-base-images.tar.gz" ]]; then
  printf 'Checking installed Docker base images before transferring their archive...\n'
  if timeout --kill-after=2s 30s ssh "${ssh_options[@]}" "$target" \
    'set -eu; sudo -n docker info >/dev/null; if sudo -n docker image inspect node:20-alpine node:18-alpine nginx:stable-alpine certbot/certbot:latest >/dev/null 2>&1; then exit 0; else exit 42; fi'; then
    rsync_excludes=(--exclude=/docker-base-images.tar.gz)
    tar_excludes=(--exclude=./docker-base-images.tar.gz)
    printf 'All Docker base images are installed; skipping the large archive.\n'
  else
    image_status=$?
    [[ $image_status == 42 ]] || { printf 'Docker preflight failed (exit %s).\n' "$image_status" >&2; exit "$image_status"; }
    printf 'Some Docker base images are missing; including their archive.\n'
  fi
fi

printf 'Checking incremental rsync support on the server...\n'
if timeout --kill-after=2s 30s ssh "${ssh_options[@]}" "$target" \
  'if command -v rsync >/dev/null 2>&1; then exit 0; else exit 42; fi'; then
  # A relative partial directory is created separately under each destination
  # directory: an absolute path would collide on repeated names like index.html.
  # Refuse to claim any existing directory with this run's unique name.
  timeout --kill-after=2s 30s ssh "${ssh_options[@]}" "$target" \
    "set -eu; umask 077; mkdir -p -- '$remote_dir'; test -z \"\$(find '$remote_dir' -name '$partial_name' -print -quit)\""
  rsync_started=1
  printf -v rsync_ssh '%q ' ssh "${ssh_options[@]}"
  printf 'Uploading changed files with rsync; progress includes transferred bytes and rate...\n'
  timeout --kill-after=5s 420s rsync -a --no-owner --no-group --checksum --delay-updates \
    --partial-dir="$partial_name" --timeout=60 --info=progress2 --stats \
    --rsync-path='umask 077; rsync' ${rsync_excludes[@]+"${rsync_excludes[@]}"} -e "$rsync_ssh" -- "$bundle/" "$target:$remote_dir/"
  timeout --kill-after=2s 30s ssh "${ssh_options[@]}" "$target" \
    "set -eu; test -s '$remote_dir/.env'; chmod 600 -- '$remote_dir/.env'; find '$remote_dir' -type d -name '$partial_name' -prune -exec rm -rf -- {} +"
  rsync_started=0
  printf 'Deployment bundle synchronized successfully.\n'
  exit 0
else
  probe_status=$?
  [[ $probe_status == 42 ]] || { printf 'SSH capability check failed (exit %s); not retrying with SCP.\n' "$probe_status" >&2; exit "$probe_status"; }
fi

printf 'Server has no rsync; packing private fallback archive with gzip -1...\n'
tar -C "$bundle" ${tar_excludes[@]+"${tar_excludes[@]}"} -cf - . | gzip -1 > "$archive"
chmod 600 "$archive"
bytes=$(wc -c < "$archive")
digest=$(sha256sum "$archive")
digest=${digest%% *}
printf 'Deployment archive: %s bytes\n' "${bytes//[[:space:]]/}"
timeout --kill-after=2s 30s ssh "${ssh_options[@]}" "$target" \
  "set -eu; umask 077; mkdir -p -- '$remote_dir'; (set -C; : > '$remote_archive'); chmod 600 -- '$remote_archive'"
remote_owned=1
printf 'Uploading archive through native OpenSSH SCP...\n'
timeout --kill-after=5s 120s scp -O "${ssh_options[@]}" "$archive" "$target:$remote_archive"
printf 'Verifying checksum and archive before extraction...\n'
timeout --kill-after=5s 90s ssh "${ssh_options[@]}" "$target" \
  "set -eu; printf '%s  %s\\n' '$digest' '$remote_archive' | sha256sum -c -; gzip -t -- '$remote_archive'; tar -tzf '$remote_archive' >/dev/null; tar -xzf '$remote_archive' -C '$remote_dir' --no-same-owner; rm -f -- '$remote_archive'"
remote_owned=0
printf 'Deployment bundle uploaded and verified successfully.\n'
