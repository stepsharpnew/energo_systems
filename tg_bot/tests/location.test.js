const test = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');

test('API validates optional locations and includes them in both email formats for services and equipment', async () => {
  const originalTransport = nodemailer.createTransport;
  const envKeys = ['SMTP_USER', 'SMTP_PASS', 'EMAIL_TO', 'EMAIL_CC'];
  const savedEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
  const messages = [];
  nodemailer.createTransport = () => ({ sendMail: async message => {
    messages.push(message);
    return { messageId: 'test-only', accepted: ['test@example.test'], rejected: [] };
  } });
  Object.assign(process.env, { SMTP_USER: 'test@example.test', SMTP_PASS: 'test-only', EMAIL_TO: 'test@example.test', EMAIL_CC: '' });
  const common = { name: 'Тест', contact: '+7 (999)-123-45-67', consent: true, consentVersion: '2026-07-13' };
  let server;
  let visitor = 0;
  try {
    server = require('../src/server').app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const submit = body => fetch(`http://127.0.0.1:${server.address().port}/api/lead`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': `192.0.2.${++visitor}` }, body: JSON.stringify({ ...common, ...body }),
    });
    for (const fields of [
      { type: 'service', service: 'Опрос по ДГУ' },
      { type: 'service', service: 'ИБП — Заказать звонок' },
      { type: 'equipment', product: 'КТП' },
    ]) {
      const label = fields.type === 'service' ? 'Город и регион' : 'Регион / город объекта';
      for (const location of [undefined, '', '   ']) {
        const response = await submit({ ...fields, location });
        assert.equal(response.status, 200);
        assert.equal((await response.json()).ok, true);
        assert.ok(!messages.at(-1).text.includes(label));
      }
      const location = 'Новосибирск, Новосибирская область <тест> & район';
      assert.equal((await submit({ ...fields, location: `  ${location}  ` })).status, 200);
      assert.ok(messages.at(-1).text.includes(`${label}: ${location}\n`));
      assert.ok(messages.at(-1).html.includes('Новосибирск, Новосибирская область &lt;тест&gt; &amp; район'));
      assert.equal((await submit({ ...fields, location: 'я'.repeat(200) })).status, 200);

      const before = messages.length;
      for (const location of [null, 123, {}, [], 'я'.repeat(201), 'Москва\nМосковская область', 'Москва\rМосковская область']) {
        const response = await submit({ ...fields, location });
        assert.equal(response.status, 400);
        assert.equal((await response.json()).error, typeof location === 'string' ? 'invalid_location' : 'invalid_payload');
      }
      assert.equal(messages.length, before, 'invalid locations must be rejected before SMTP');
    }
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    nodemailer.createTransport = originalTransport;
    for (const key of envKeys) {
      if (savedEnv[key] === undefined) delete process.env[key];
      else process.env[key] = savedEnv[key];
    }
  }
});
