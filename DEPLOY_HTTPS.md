# HTTPS deployment for e-systems.su

Before issuing the certificate, make sure DNS `A`/`AAAA` records for
`e-systems.su` point to this server and inbound ports `80` and `443` are open.

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
