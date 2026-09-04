# HTTPS deployment for e-systems.su

Before issuing the certificate, make sure DNS `A`/`AAAA` records for
`e-systems.su` point to this server and inbound ports `80` and `443` are open.

## Automated deployment

Pushing to `master` runs `.github/workflows/deploy.yml`. Production deployments
are serialized and an active deployment is not cancelled by a newer push.
The uploaded `scripts/deploy.sh` performs the server-side steps:

1. Validate the environment/config without printing SMTP credentials; load base images.
2. Build both application images while the existing containers remain running.
   Docker layer cache is retained and builds run one at a time to limit memory
   pressure. The overall build limit is 15 minutes; the SSH step allows 30 minutes.
3. Only after both builds succeed, replace the application containers with
   `compose up --no-build --pull never`. There is no `compose down` or orphan cleanup.
4. Wait for HTTP responses from the API and frontend, refresh nginx without
   recreating its dependencies, then verify the site and API over HTTPS.

Bundle transfer uses the pinned composite version of `appleboy/scp-action`
(v1.0.0, drone-scp 1.8.0). Packing runs as the same GitHub Runner user that
created `.env`, so its `600` permissions can be preserved during preparation,
transfer, and extraction. Do not switch back to the v0 Docker action: its
different filesystem user cannot read the private file. A real tar-read check
runs before downloading base images or modifying the server, and bundle tests
cover packaging/extraction with a dummy private `.env`.

The base-image archive does **not** contain npm packages. Server builds still
require access to `registry.npmjs.org`. Both Dockerfiles use `npm ci` with the
committed lockfile, no deployment-time audit/funding requests, verbose HTTP and
lifecycle logs, a 30-second request timeout, and two retries. Diagnose DNS,
connection, or registry failures from these logs instead of increasing timeouts
indefinitely. Dependency security audits must be run separately.

A failed build leaves existing containers untouched. A failure **after** container
replacement is reported with service status/logs; automatic rollback is not
implemented. This is not a zero-downtime deployment: replacing the application
containers can cause a short interruption. If old containers were already removed
by an earlier failed deployment, a failed new build cannot restore them by itself.

Run the deployment control-flow tests without Docker, credentials, or network access:

```bash
bash -n scripts/deploy.sh
node --test scripts/*.test.mjs
```

The tests replace Docker, curl, sudo, and timeout with fixtures; they do not replace
an actual image build and server smoke test.

### Recovery after a failed legacy deployment

If the old workflow stopped the site before its build timed out, run these from
the app directory on the server **only if both previously built app images remain
available locally**. These commands do not rebuild or download images:

```bash
sudo docker image ls
sudo docker compose up -d --no-build --pull never frontend tg_bot
curl --fail --max-time 10 http://127.0.0.1:3001/api/health
curl --fail --max-time 10 http://127.0.0.1:5173/
```

With an existing valid certificate, refresh the HTTPS proxy after both checks pass:

```bash
sudo env NGINX_CONF=./nginx.conf docker compose --profile docker-nginx up -d --no-build --pull never --no-deps --force-recreate nginx
```

Otherwise, fix the build failure and run a new deployment. Re-running an old
GitHub Actions job uses its original commit, not the corrected workflow.

## First certificate issue

Start the site with the temporary HTTP nginx config so Let's Encrypt can reach
the webroot challenge path:

```bash
NGINX_CONF=./nginx.http.conf docker compose up -d --build
```

Before calling Certbot, verify that nginx and Certbot use the same challenge
directory:

```bash
mkdir -p certbot/www/.well-known/acme-challenge
printf 'ok\n' > certbot/www/.well-known/acme-challenge/ping
curl -i http://127.0.0.1/.well-known/acme-challenge/ping
curl -i http://e-systems.su/.well-known/acme-challenge/ping
```

Both `curl` commands must return `ok`. If the public domain returns 404, nginx
is serving a different webroot or the domain points to another server/address.
Pay special attention to `AAAA` records: Let's Encrypt may validate the domain
over IPv6.

Issue the certificate:

```bash
docker compose run --rm certbot certonly \
  --non-interactive \
  --webroot \
  --webroot-path /var/www/certbot \
  --email sales@e-systems.su \
  --agree-tos \
  --no-eff-email \
  -d e-systems.su
```

Switch nginx to the HTTPS config:

```bash
docker compose up -d nginx
```

Check the result:

```bash
curl -I https://e-systems.su
```

## Renewal

Run renewal from the project directory:

```bash
docker compose run --rm certbot renew --webroot --webroot-path /var/www/certbot
docker compose exec -T nginx nginx -s reload
```

Example root cron entry for daily renewal checks. If the project lives in a
different directory on the server, change the `cd` path.

```cron
15 3 * * * cd /home/step/main/energo_systems && docker compose run --rm certbot renew --webroot --webroot-path /var/www/certbot && docker compose exec -T nginx nginx -s reload
```

If `www.e-systems.su` should also work, add its DNS record first, then add
`www.e-systems.su` to `server_name` and reissue with an extra
`-d www.e-systems.su`.
