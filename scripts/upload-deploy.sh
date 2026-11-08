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
target=$SERVER_USER@$SERVER_HOST
remote_owned=0
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
printf 'Packing deployment bundle with gzip -1...\n'
tar -C "$bundle" -cf - . | gzip -1 > "$archive"
chmod 600 "$archive"
bytes=$(wc -c < "$archive")
digest=$(sha256sum "$archive")
digest=${digest%% *}
printf 'Deployment archive: %s bytes\n' "${bytes//[[:space:]]/}"

# TOFU matches the previous action's unpinned host trust. Subsequent SSH/SCP
# calls use only this dedicated, verified known_hosts file and never prompt.
timeout --kill-after=2s 20s ssh-keyscan -T 10 "$SERVER_HOST" > "$hosts"
[[ -s "$hosts" ]] || fail 'SSH host key discovery returned no keys'
chmod 600 "$hosts"
timeout --kill-after=2s 30s ssh "${ssh_options[@]}" "$target" \
  "set -eu; umask 077; mkdir -p -- '$remote_dir'; (set -C; : > '$remote_archive'); chmod 600 -- '$remote_archive'"
remote_owned=1
printf 'Uploading archive through native OpenSSH SCP...\n'
timeout --kill-after=5s 420s scp -O "${ssh_options[@]}" "$archive" "$target:$remote_archive"
printf 'Verifying checksum and archive before extraction...\n'
timeout --kill-after=5s 90s ssh "${ssh_options[@]}" "$target" \
  "set -eu; printf '%s  %s\\n' '$digest' '$remote_archive' | sha256sum -c -; gzip -t -- '$remote_archive'; tar -tzf '$remote_archive' >/dev/null; tar -xzf '$remote_archive' -C '$remote_dir' --no-same-owner; rm -f -- '$remote_archive'"
remote_owned=0
printf 'Deployment bundle uploaded and verified successfully.\n'
