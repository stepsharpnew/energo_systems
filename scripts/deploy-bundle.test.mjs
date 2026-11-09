import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workflow = readFileSync(join(root, '.github/workflows/deploy.yml'), 'utf8');
const dummySecret = 'SMTP_PASS=dummy $value with spaces and "quotes"\n';

// Exercise the actual shell blocks from the workflow, not rewritten copies.
function runBlock(name) {
  const start = workflow.indexOf(`      - name: ${name}\n`);
  assert.ok(start >= 0, `Missing workflow step: ${name}`);
  const end = workflow.indexOf('\n      - name:', start + 1);
  const step = workflow.slice(start, end < 0 ? undefined : end);
  const lines = step.split('\n');
  const run = lines.indexOf('        run: |');
  assert.ok(run >= 0, `Missing shell block: ${name}`);
  return lines.slice(run + 1).filter(line => line.startsWith('          '))
    .map(line => line.slice(10)).join('\n');
}

function shell(script, cwd, env = {}) {
  const result = spawnSync('bash', ['-euo', 'pipefail', '-c', script], {
    cwd, env: { ...process.env, ...env }, encoding: 'utf8', timeout: 10000,
  });
  assert.ifError(result.error);
  assert.doesNotMatch(result.stdout + result.stderr, /dummy \$value/);
  return result;
}

function withFixture(callback) {
  const fixture = mkdtempSync(join(tmpdir(), 'energo-bundle-test-'));
  try {
    for (const directory of ['certbot', 'front/node_modules', 'front/.nuxt', 'front/.output', 'tg_bot', 'scripts']) {
      mkdirSync(join(fixture, directory), { recursive: true });
      writeFileSync(join(fixture, directory, 'fixture.txt'), 'dummy source');
    }
    for (const file of ['docker-compose.yml', 'nginx.conf', 'nginx.http.conf', 'nginx.host.conf']) {
      writeFileSync(join(fixture, file), 'dummy config');
    }
    callback(fixture);
  } finally {
    // Delete only this test's isolated, uniquely allocated dummy directory.
    rmSync(fixture, { recursive: true, force: true });
  }
}

test('private .env survives actual workflow preparation, tar packing and extraction', () => {
  withFixture(fixture => {
    const create = shell(runBlock('Create .env from DOTENV secret'), fixture, { DOTENV: dummySecret });
    assert.equal(create.status, 0, create.stderr);
    const original = readFileSync(join(fixture, '.env'), 'utf8');
    assert.equal(statSync(join(fixture, '.env')).mode & 0o777, 0o600);

    const prepare = shell(runBlock('Prepare deploy bundle'), fixture);
    assert.equal(prepare.status, 0, prepare.stderr);
    assert.equal(statSync(join(fixture, 'deploy/.env')).mode & 0o777, 0o600);
    for (const excluded of ['node_modules', '.nuxt', '.output']) {
      assert.equal(existsSync(join(fixture, 'deploy/front', excluded)), false);
    }
    const verify = shell(runBlock('Verify deploy bundle permissions'), fixture);
    assert.equal(verify.status, 0, verify.stderr);

    mkdirSync(join(fixture, 'unpacked'));
    const roundTrip = shell('tar -czf bundle.tar.gz deploy\ntar -xzf bundle.tar.gz --strip-components=1 -C unpacked', fixture);
    assert.equal(roundTrip.status, 0, roundTrip.stderr);
    assert.equal(readFileSync(join(fixture, 'unpacked/.env'), 'utf8'), original);
    assert.equal(statSync(join(fixture, 'unpacked/.env')).mode & 0o777, 0o600);
  });
});

test('bundle preflight rejects a missing or empty .env before transfer', () => {
  withFixture(fixture => {
    mkdirSync(join(fixture, 'deploy'));
    assert.notEqual(shell(runBlock('Verify deploy bundle permissions'), fixture).status, 0);
    writeFileSync(join(fixture, 'deploy/.env'), '');
    assert.notEqual(shell(runBlock('Verify deploy bundle permissions'), fixture).status, 0);
  });
});

test('dedicated SMTP configuration appends to the existing environment without exposing either secret', () => {
  withFixture(fixture => {
    const landing = 'SMTP_DGU_USER=dgu@example.test\nSMTP_DGU_PASS=dgu-test-secret\nSMTP_UPS_USER=ups@example.test\nSMTP_UPS_PASS=ups-test-secret';
    const result = shell(runBlock('Create .env from DOTENV secret'), fixture, {
      DOTENV: dummySecret,
      SMTP_LANDING_ENV: landing,
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(readFileSync(join(fixture, '.env'), 'utf8'), `${dummySecret}\n${landing}\n`);
    assert.equal(statSync(join(fixture, '.env')).mode & 0o777, 0o600);
    assert.doesNotMatch(result.stdout + result.stderr, /dgu-test-secret|ups-test-secret/);
  });
});

test('secret creation fails without DOTENV instead of packaging a stale file', () => {
  withFixture(fixture => {
    assert.notEqual(shell(runBlock('Create .env from DOTENV secret'), fixture, { DOTENV: '' }).status, 0);
  });
});

test('workflow bounds the native upload and stops before build if transfer fails', () => {
  withFixture(fixture => {
    const invocations = join(fixture, 'upload-invocations.txt');
    writeFileSync(join(fixture, 'scripts/upload-deploy.sh'), 'printf "%s\\n" "$1" > "$UPLOAD_TEST_LOG"\nexit 42\n');
    // macOS does not ship GNU timeout; the fixture preserves its child exit.
    mkdirSync(join(fixture, 'bin'));
    writeFileSync(join(fixture, 'bin/timeout'), '#!/bin/sh\nshift 2\nexec "$@"\n', { mode: 0o755 });
    const result = shell(runBlock('Copy deploy bundle to server'), fixture, {
      PATH: `${join(fixture, 'bin')}:${process.env.PATH}`,
      UPLOAD_TEST_LOG: invocations,
    });
    assert.equal(result.status, 42, 'a failed uploader must fail the workflow step');
    assert.equal(readFileSync(invocations, 'utf8').trim(), 'deploy');
  });
  assert.match(runBlock('Copy deploy bundle to server'), /timeout --kill-after=15s 8m /);
  assert.doesNotMatch(workflow, /uses: appleboy\/scp-action/);
  assert.doesNotMatch(workflow, /chmod 6(?:44|66) .*\.env/);
  assert.ok(workflow.indexOf('- name: Verify deploy bundle permissions') < workflow.indexOf('- name: Copy deploy bundle to server'));
  assert.ok(workflow.indexOf('- name: Copy deploy bundle to server') < workflow.indexOf('- name: Build and replace services on server'));
});
