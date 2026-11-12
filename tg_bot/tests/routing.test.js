const test = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');
const { sendLeadEmail, verifyEmailConfiguration } = require('../src/mailer');

const envKeys = ['SMTP_USER', 'SMTP_PASS', 'SMTP_PASSWORD', 'EMAIL_FROM', 'EMAIL_TO', 'EMAIL_CC',
  'SMTP_DGU_USER', 'SMTP_DGU_PASS', 'SMTP_UPS_USER', 'SMTP_UPS_PASS', 'ALLOWED_ORIGINS'];
const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
const originalTransport = nodemailer.createTransport;
const lead = { type: 'service', name: 'Тест', contact: '+7 (999)-000-00-00', service: 'Проверка формы',
  consent: true, consentVersion: '2026-07-13' };
let sent;

test.beforeEach(() => {
  for (const key of envKeys) delete process.env[key];
  Object.assign(process.env, {
    SMTP_USER: 'default@example.test', SMTP_PASS: 'default-test-password',
    EMAIL_FROM: 'Default <default@example.test>', EMAIL_TO: 'sales@e-systems.su',
    SMTP_DGU_USER: 'dgu@example.test', SMTP_DGU_PASS: 'dgu-test-password',
    SMTP_UPS_USER: 'ups@example.test', SMTP_UPS_PASS: 'ups-test-password',
  });
  sent = [];
  nodemailer.createTransport = options => ({
    sendMail: async message => {
      sent.push({ options, message });
      return { messageId: 'routing-test', accepted: ['sales@e-systems.su'], rejected: [] };
    },
  });
});
test.afterEach(() => {
  nodemailer.createTransport = originalTransport;
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

test('landing forms use the matching authenticated sender and keep sales as the primary recipient', async () => {
  for (const direction of ['dgu', 'ups']) {
    for (const sourcePage of [`/services/${direction}`, `/services/${direction}/`]) {
      await sendLeadEmail({ ...lead, sourcePage });
      const { options, message } = sent.at(-1);
      assert.deepEqual(options.auth, { user: `${direction}@example.test`, pass: `${direction}-test-password` });
      assert.ok(message.from.endsWith(`<${direction}@example.test>`));
      assert.equal(message.to, 'sales@e-systems.su');
      assert.equal(message.cc, 'inbox@e-systems.su, i.lysenko@e-systems.su');
      assert.ok(message.subject.startsWith(direction === 'dgu' ? '[ДГУ]' : '[ИБП]'));
      assert.ok(message.text.includes('Направление заявки:'));
      assert.ok(message.html.includes('Направление заявки'));
    }
  }
});

test('all existing landing service names and the generator quiz work without Referer', async () => {
  for (const [direction, fields] of [
    ['dgu', { service: 'ДГУ — Заказать звонок' }],
    ['dgu', { service: 'ДГУ — форма в контактах' }],
    ['dgu', { service: 'Опрос по ДГУ' }],
    ['dgu', { type: 'equipment', service: undefined, product: 'Подбор генератора — резервное питание' }],
    ['ups', { service: 'ИБП — Консультация' }],
    ['ups', { service: 'ИБП — форма в контактах' }],
    ['ups', { service: 'Опрос по ИБП' }],
  ]) {
    await sendLeadEmail({ ...lead, ...fields });
    assert.equal(sent.at(-1).options.auth.user, `${direction}@example.test`);
    assert.equal(sent.at(-1).message.cc, 'inbox@e-systems.su, i.lysenko@e-systems.su');
  }
});

test('unrelated forms keep the default SMTP sender and old email subject', async () => {
  for (const fields of [{ sourcePage: '/services/power' }, { sourcePage: '/services/dgu-extra' },
    { type: 'equipment', product: 'КТП', sourcePage: '/equipment/ktp' }]) {
    await sendLeadEmail({ ...lead, ...fields });
    assert.equal(sent.at(-1).options.auth.user, 'default@example.test');
    assert.equal(sent.at(-1).message.from, 'Default <default@example.test>');
    assert.equal(sent.at(-1).message.cc, 'inbox@e-systems.su');
    assert.doesNotMatch(sent.at(-1).message.subject, /^\[/);
  }
});

test('deployments without dedicated accounts keep sending landing leads through the default SMTP', async () => {
  for (const key of ['SMTP_DGU_USER', 'SMTP_DGU_PASS', 'SMTP_UPS_USER', 'SMTP_UPS_PASS']) delete process.env[key];
  for (const service of ['Опрос по ДГУ', 'Опрос по ИБП']) {
    await sendLeadEmail({ ...lead, service });
    assert.equal(sent.at(-1).options.auth.user, 'default@example.test');
    assert.equal(sent.at(-1).message.cc, 'inbox@e-systems.su, i.lysenko@e-systems.su');
  }
});

test('a partly configured account cannot silently use another account password', async () => {
  delete process.env.SMTP_DGU_PASS;
  await assert.rejects(sendLeadEmail({ ...lead, service: 'Опрос по ДГУ' }), /SMTP_DGU_USER\/SMTP_DGU_PASS/);
  assert.equal(sent.length, 0);
  delete process.env.SMTP_UPS_USER;
  await assert.rejects(sendLeadEmail({ ...lead, service: 'Опрос по ИБП' }), /SMTP_UPS_USER\/SMTP_UPS_PASS/);
  assert.equal(sent.length, 0);
});

test('each account can be verified without sending mail or returning its password', async () => {
  let closed = 0;
  const checked = [];
  nodemailer.createTransport = options => ({
    verify: async () => { checked.push(options.auth.user); },
    sendMail: async () => assert.fail('SMTP checks must not send a message'),
    close: () => { closed += 1; },
  });
  for (const direction of ['dgu', 'ups']) {
    const result = await verifyEmailConfiguration(direction);
    assert.equal(result.user, `${direction}@example.test`);
    assert.equal(result.to, 'sales@e-systems.su');
    assert.equal(result.cc, 'inbox@e-systems.su, i.lysenko@e-systems.su');
    assert.doesNotMatch(JSON.stringify(result), /test-password/);
  }
  assert.deepEqual(checked, ['dgu@example.test', 'ups@example.test']);
  assert.equal(closed, 2);
  await assert.rejects(verifyEmailConfiguration('arbitrary-account'), { code: 'SMTP_UNKNOWN_PROFILE' });
});

test('the API selects the sender for both landing pages and for legacy forms without a Referer', async () => {
  process.env.ALLOWED_ORIGINS = 'https://e-systems.su';
  const server = require('../src/server').app.listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  try {
    let visitor = 0;
    for (const [direction, service, referer] of [
      ['dgu', 'Проверка формы', 'https://e-systems.su/services/dgu'],
      ['ups', 'Проверка формы', 'https://e-systems.su/services/ups/'],
      ['dgu', 'Опрос по ДГУ', undefined],
      ['ups', 'Опрос по ИБП', undefined],
    ]) {
      const headers = { 'Content-Type': 'application/json', 'X-Forwarded-For': `192.0.2.${++visitor}` };
      if (referer) headers.Referer = referer;
      const response = await fetch(`http://127.0.0.1:${server.address().port}/api/lead`, {
        method: 'POST', headers, body: JSON.stringify({ ...lead, service }),
      });
      assert.equal(response.status, 200);
      assert.equal((await response.json()).ok, true);
      assert.equal(sent.at(-1).options.auth.user, `${direction}@example.test`);
      assert.equal(sent.at(-1).message.to, 'sales@e-systems.su');
      assert.equal(sent.at(-1).message.cc, 'inbox@e-systems.su, i.lysenko@e-systems.su');
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
