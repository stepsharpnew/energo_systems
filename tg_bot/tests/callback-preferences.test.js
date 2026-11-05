const test = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');
const { normalizeCallbackPreferences } = require('../src/callback-preferences');
const { buildLeadEmail } = require('../src/mailer');

const phone = '+7 (999)-123-45-67';
const lead = { type: 'service', service: 'ГНБ', name: 'Тест', contact: phone, consent: true, consentVersion: '2026-07-13' };

test('callback metadata is optional, bounded and requires a phone and an explicit boolean', () => {
  assert.equal(normalizeCallbackPreferences(undefined, phone), undefined);
  assert.deepEqual(normalizeCallbackPreferences({ time: ' 10:00–18:00 ', allowNonWorkingDays: false }, phone), { time: '10:00–18:00', allowNonWorkingDays: false });
  for (const value of [null, [], '12:00', {}, { time: '', allowNonWorkingDays: 'false' },
    { time: [], allowNonWorkingDays: false }, { time: 'x'.repeat(121), allowNonWorkingDays: true },
    { time: '10:00\n18:00', allowNonWorkingDays: true }, { time: '', allowNonWorkingDays: false, unexpected: true }]) {
    assert.equal(normalizeCallbackPreferences(value, phone), null);
  }
  assert.equal(normalizeCallbackPreferences({ time: '', allowNonWorkingDays: false }, ''), null);
});

test('both email formats place call preferences next to the phone and escape custom text', () => {
  const callbackPreferences = { time: 'После 10:00 <по Москве>', allowNonWorkingDays: true };
  const mail = buildLeadEmail({ ...lead, callbackPreferences });
  assert.match(mail.text, /Телефон:.*\nУдобное время звонка \(МСК\): После 10:00 <по Москве>\nЗвонки в выходные и праздники: Разрешены клиентом/);
  assert.ok(mail.html.includes('После 10:00 &lt;по Москве&gt;'));
  const defaults = buildLeadEmail({ ...lead, callbackPreferences: { time: '', allowNonWorkingDays: false } });
  assert.match(defaults.text, /09:00–18:00/);
  assert.match(defaults.html, /Не звонить — только рабочие дни/);
  assert.doesNotMatch(buildLeadEmail(lead).text, /Удобное время звонка/);
});

test('API delivers preferences for services and equipment, allows legacy requests and rejects invalid preferences before SMTP', async () => {
  const original = nodemailer.createTransport;
  const envKeys = ['SMTP_USER', 'SMTP_PASS', 'EMAIL_TO', 'EMAIL_CC'];
  const savedEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
  const messages = [];
  nodemailer.createTransport = () => ({ sendMail: async message => {
    messages.push(message);
    return { messageId: 'test-only', accepted: ['test@example.test'], rejected: [] };
  } });
  Object.assign(process.env, { SMTP_USER: 'test@example.test', SMTP_PASS: 'test-only', EMAIL_TO: 'test@example.test', EMAIL_CC: '' });
  let server;
  let visitor = 0;
  try {
    server = require('../src/server').app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const submit = body => fetch(`http://127.0.0.1:${server.address().port}/api/lead`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': `192.0.2.${++visitor}` }, body: JSON.stringify(body),
    });
    for (const fields of [{ type: 'service', service: 'ГНБ' }, { type: 'equipment', product: 'КТП' }]) {
      const { service, ...common } = lead;
      for (const allowNonWorkingDays of [false, true]) {
        const response = await submit({ ...common, ...fields, callbackPreferences: { time: '10:00–18:00', allowNonWorkingDays } });
        assert.equal(response.status, 200);
        assert.match(messages.at(-1).text, /10:00–18:00/);
        assert.ok(messages.at(-1).text.includes(allowNonWorkingDays ? 'Разрешены клиентом' : 'Не звонить — только рабочие дни'));
      }
      assert.equal((await submit({ ...common, ...fields })).status, 200);
    }
    const before = messages.length;
    for (const callbackPreferences of [null, { time: '', allowNonWorkingDays: 'true' }, { time: 'x'.repeat(121), allowNonWorkingDays: true }]) {
      const response = await submit({ ...lead, callbackPreferences });
      assert.equal(response.status, 400);
      assert.equal((await response.json()).error, 'invalid_callback_preferences');
    }
    const { service, ...equipment } = lead;
    assert.equal((await submit({ ...equipment, type: 'equipment', product: 'КТП', contact: '', email: 'client@example.test', callbackPreferences: { time: '', allowNonWorkingDays: true } })).status, 400);
    assert.equal(messages.length, before);
    assert.equal((await submit({ ...equipment, type: 'equipment', product: 'КТП', contact: '', email: 'client@example.test' })).status, 200);
    assert.doesNotMatch(messages.at(-1).text, /Удобное время звонка/);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    nodemailer.createTransport = original;
    for (const key of envKeys) {
      if (savedEnv[key] === undefined) delete process.env[key];
      else process.env[key] = savedEnv[key];
    }
  }
});
