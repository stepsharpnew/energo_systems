#!/usr/bin/env bash
set -euo pipefail

# Invoked by CI from the uploaded app directory. Do not stop live services
# until both replacement images have been built successfully.
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

stage=preflight
replacement_started=false

report_failure() {
  local status=$?
  trap - EXIT
  if [ "$status" -ne 0 ]; then
    echo "Deployment failed during ${stage} (exit ${status})." >&2
    if [ "$replacement_started" = false ]; then
      echo "Existing application containers were not stopped by this deployment." >&2
    else
      echo "Replacement has started; inspect service health before retrying." >&2
    fi
    sudo docker compose --profile docker-nginx ps --all || true
    sudo docker compose --profile docker-nginx logs --no-color --tail=80 frontend tg_bot nginx || true
  fi
  exit "$status"
}
trap report_failure EXIT

wait_for_url() {
  local label=$1 url=$2 attempt
  shift 2
  for attempt in {1..20}; do
    if curl --fail --silent --show-error --connect-timeout 3 --max-time 5 \
      --output /dev/null "$@" "$url"; then
      echo "${label} is available"
      return 0
    fi
    echo "Waiting for ${label} (${attempt}/20)..."
    sleep 2
  done
  echo "${label} did not become available" >&2
  return 1
}

start_proxy() {
  # Refresh nginx's upstream addresses without recreating healthy app services.
  sudo env NGINX_CONF="$1" docker compose --profile docker-nginx up \
    -d --no-build --pull never --no-deps --force-recreate nginx
}

for required in .env front/Dockerfile tg_bot/Dockerfile docker-base-images.tar.gz; do
  if [ ! -s "$required" ]; then
    echo "Required deployment file is missing or empty: ${required}" >&2
    exit 1
  fi
done
chmod 600 .env
# Never print the expanded config: it includes SMTP credentials from .env.
sudo docker compose config --quiet

echo "Loading Docker base images"
sudo docker image load --input docker-base-images.tar.gz
sudo docker image inspect node:20-alpine node:18-alpine nginx:stable-alpine certbot/certbot:latest >/dev/null

lead_paths=(front/components tg_bot/src)
if [ -d front/src/components ]; then
  lead_paths+=(front/src/components)
fi
if grep -R -n '/api/telegram/lead' "${lead_paths[@]}"; then
  echo "Old lead endpoint found" >&2
  exit 1
fi
if ! grep -R -q '/api/lead' "${lead_paths[@]}"; then
  echo "Lead endpoint /api/lead was not found" >&2
  exit 1
fi

stage=build
echo "Building replacement images; existing services remain running"
# Keep the layer cache and serialize builds to reduce production-host memory
# pressure. npm has shorter per-request timeouts and verbose diagnostics.
if timeout --kill-after=30s 900s sudo docker compose --progress plain --parallel 1 \
  build --pull=false tg_bot frontend; then
  echo "Both application images built successfully"
else
  status=$?
  if [ "$status" -eq 124 ] || [ "$status" -eq 137 ]; then
    echo "Build exceeded its 15-minute limit; check the npm/build output above." >&2
  fi
  exit "$status"
fi

stage=replace
replacement_started=true
# No compose down, no orphan cleanup, and no implicit build/pull at this point.
# This also recovers a deployment whose old containers were already removed.
sudo docker compose up -d --no-build --pull never frontend tg_bot

stage=application-health
wait_for_url "Lead API" http://127.0.0.1:3001/api/health
wait_for_url "Frontend" http://127.0.0.1:5173/

stage=https
sudo mkdir -p certbot/www/.well-known/acme-challenge

if ! sudo test -s /etc/letsencrypt/live/e-systems.su/fullchain.pem || \
   ! sudo test -s /etc/letsencrypt/live/e-systems.su/privkey.pem; then
  echo "No certificate found; starting temporary HTTP nginx"
  start_proxy ./nginx.http.conf
  printf 'ok\n' | sudo tee certbot/www/.well-known/acme-challenge/ping >/dev/null

  challenge_ready=false
  for attempt in {1..10}; do
    if curl --fail --silent --show-error --connect-timeout 3 --max-time 5 \
      -H 'Host: e-systems.su' \
      http://127.0.0.1/.well-known/acme-challenge/ping | grep -qx 'ok'; then
      challenge_ready=true
      break
    fi
    sleep 2
  done
  if [ "$challenge_ready" = false ]; then
    echo "HTTP ACME challenge endpoint is unavailable" >&2
    exit 1
  fi

  timeout --kill-after=30s 180s sudo docker compose --profile certbot run --rm -T --no-deps certbot certonly \
    --non-interactive --webroot --webroot-path /var/www/certbot \
    --email sales@e-systems.su --agree-tos --no-eff-email \
    -d e-systems.su -d www.e-systems.su < /dev/null
  start_proxy ./nginx.conf
else
  # Refresh proxy immediately after the app update, before waiting on Certbot.
  start_proxy ./nginx.conf
  timeout --kill-after=30s 180s sudo docker compose --profile certbot run --rm -T --no-deps certbot renew \
    --non-interactive --quiet < /dev/null
  sudo docker compose --profile docker-nginx exec -T nginx nginx -t
  sudo docker compose --profile docker-nginx exec -T nginx nginx -s reload
fi

stage=https-health
wait_for_url "HTTPS frontend" https://e-systems.su/ --resolve e-systems.su:443:127.0.0.1
wait_for_url "HTTPS API" https://e-systems.su/api/health --resolve e-systems.su:443:127.0.0.1
sudo docker compose --profile docker-nginx ps
echo "Deployment completed successfully"
