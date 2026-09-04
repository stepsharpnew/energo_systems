import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const scripts = dirname(fileURLToPath(import.meta.url));

function runDeployment(scenario = 'success') {
  const fixture = mkdtempSync(join(tmpdir(), 'energo-deploy-test-'));
  try {
    for (const directory of ['bin', 'scripts', 'front/components', 'tg_bot/src']) {
      mkdirSync(join(fixture, directory), { recursive: true });
    }
    copyFileSync(join(scripts, 'deploy.sh'), join(fixture, 'scripts/deploy.sh'));
    for (const command of ['sudo', 'docker', 'timeout', 'curl', 'sleep']) {
      const target = join(fixture, 'bin', command);
      copyFileSync(join(scripts, 'fixtures/mock-deploy-command.sh'), target);
      chmodSync(target, 0o755);
    }
    for (const file of ['front/Dockerfile', 'tg_bot/Dockerfile', 'docker-base-images.tar.gz']) {
      writeFileSync(join(fixture, file), 'test fixture\n');
    }
    if (scenario !== 'missing_env') {
      writeFileSync(join(fixture, '.env'), 'SMTP_PASS=test-secret-must-not-be-printed\n');
    }
    writeFileSync(join(fixture, 'tg_bot/src/server.js'), '/api/lead\n');
    const logPath = join(fixture, 'commands.log');
    const result = spawnSync('bash', ['scripts/deploy.sh'], {
      cwd: fixture,
      encoding: 'utf8',
      timeout: 15000,
      env: {
        ...process.env,
        PATH: `${join(fixture, 'bin')}:${process.env.PATH}`,
        DEPLOY_TEST_SCENARIO: scenario,
        DEPLOY_TEST_LOG: logPath,
        DEPLOY_TEST_COUNTER: join(fixture, 'attempts'),
      },
    });
    assert.ifError(result.error);
    const log = existsSync(logPath) ? readFileSync(logPath, 'utf8') : '';
    const output = result.stdout + result.stderr;
    assert.doesNotMatch(log, /compose (?:down|stop|rm)\b/);
    assert.doesNotMatch(log, /--no-cache|--remove-orphans/);
    assert.doesNotMatch(output, /test-secret-must-not-be-printed/);
    return { status: result.status, log, output };
  } finally {
    // Only remove this test's uniquely allocated temporary directory.
    rmSync(fixture, { recursive: true, force: true });
  }
}

test('build completes before services are replaced; startup never builds or pulls', () => {
  const { status, log, output } = runDeployment();
  assert.equal(status, 0, output);
  const build = log.indexOf('build --pull=false tg_bot frontend');
  const replace = log.indexOf('up -d --no-build --pull never frontend tg_bot');
  assert.ok(build >= 0 && replace > build);
  assert.match(log, /timeout --kill-after=30s 900s sudo docker compose --progress plain --parallel 1 build/);
  assert.match(log, /docker compose config --quiet/);
  assert.match(log, /curl .*http:\/\/127\.0\.0\.1:3001\/api\/health/);
  assert.match(log, /curl .*http:\/\/127\.0\.0\.1:5173\//);
  assert.match(log, /curl .*https:\/\/e-systems\.su\/api\/health/);
  assert.match(log, /--no-deps --force-recreate nginx/);
  assert.ok(log.indexOf('NGINX_CONF=./nginx.conf') < log.indexOf('certbot renew'));
  assert.match(output, /Deployment completed successfully/);
});

for (const scenario of ['build_failure', 'build_timeout', 'load_failure', 'missing_env']) {
  test(`${scenario}: leave existing application containers untouched`, () => {
    const { status, log, output } = runDeployment(scenario);
    assert.equal(status, scenario === 'build_timeout' ? 124 : 1, output);
    assert.doesNotMatch(log, /\bup\b|certbot renew/);
    assert.match(output, /Existing application containers were not stopped/);
    assert.match(log, /logs --no-color --tail=80/);
    if (scenario === 'build_timeout') assert.match(output, /15-minute limit/);
  });
}

for (const scenario of ['start_failure', 'api_failure', 'frontend_failure']) {
  test(`${scenario}: stop with diagnostics before modifying nginx or certificates`, () => {
    const { status, log, output } = runDeployment(scenario);
    assert.equal(status, 1, output);
    assert.match(output, /Replacement has started/);
    assert.match(log, /logs --no-color --tail=80/);
    assert.doesNotMatch(log, /NGINX_CONF=|certbot renew/);
  });
}

test('wait for slow API startup before continuing', () => {
  const { status, log, output } = runDeployment('slow_start');
  assert.equal(status, 0, output);
  assert.equal(log.split('\n').filter(line => line.startsWith('curl ') && line.endsWith('http://127.0.0.1:3001/api/health')).length, 3);
});

test('HTTPS failure fails deployment instead of reporting false success', () => {
  const { status, output } = runDeployment('https_failure');
  assert.equal(status, 1, output);
  assert.match(output, /failed during https-health/);
  assert.doesNotMatch(output, /Deployment completed successfully/);
});

test('first deployment obtains a certificate before switching to HTTPS', () => {
  const { status, log, output } = runDeployment('new_certificate');
  assert.equal(status, 0, output);
  const http = log.indexOf('NGINX_CONF=./nginx.http.conf');
  const issue = log.indexOf('certbot certonly');
  const https = log.indexOf('NGINX_CONF=./nginx.conf');
  assert.ok(http >= 0 && issue > http && https > issue);
  assert.match(log, /--no-deps certbot certonly/);
});
