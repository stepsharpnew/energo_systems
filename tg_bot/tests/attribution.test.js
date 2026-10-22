const test = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');
const { ATTRIBUTION_KEYS, normalizeAttribution } = require('../src/attribution');
const { buildLeadEmail } = require('../src/mailer');

const campaign = {
  utm_source: 'yandexdirect', utm_medium: 'cpc', utm_campaign: '712977221',
  utm_content: '17786149843', utm_term: 'ГНБ + область & <тест>', yclid: 'click-123',
};
const lead = {
  type: 'service', name: 'Тест', contact: '+7 (999)-000-00-00', service: 'ГНБ',
  consent: true, consentVersion: '2026-07-13',
};

test('attribution supports all browser keys and normalizes only known string values', async () => {
  const { getAttributionQuery } = await import('../../front/lib/browser/attribution.js');
  const all = Object.fromEntries(ATTRIBUTION_KEYS.map(key => [key, 'value']));
  assert.deepEqual(getAttributionQuery(all), all);
  assert.deepEqual(normalizeAttribution(all), all);
  assert.deepEqual(normalizeAttribution({ ...campaign, utm_id: '   ', utm_source: ' yandexdirect ' }), campaign);
  assert.deepEqual(normalizeAttribution(undefined), {});
});

test('email includes exact campaign keys in both formats and escapes HTML values', () => {
  for (const type of ['service', 'equipment']) {
    const message = buildLeadEmail({ ...lead, type, product: 'КТП', attribution: campaign });
    for (const [key, value] of Object.entries(campaign)) {
      assert.ok(message.text.includes(`${key}: ${value}`));
      assert.ok(message.html.includes(key));
    }
    assert.ok(message.html.includes('ГНБ + область &amp; &lt;тест&gt;'));
    assert.ok(!message.html.includes('<тест>'));
    assert.ok(!message.text.includes('utm_id:'));
    const untagged = buildLeadEmail({ ...lead, type });
    assert.ok(untagged.text.includes('UTM-метки: не переданы'));
    assert.ok(untagged.html.includes('UTM-метки: не переданы'));
  }
});

test('API accepts campaign metadata for both lead types, keeps legacy leads and rejects malformed metadata before SMTP', async () => {
  const originalTransport = nodemailer.createTransport;
  const envKeys = ['SMTP_USER', 'SMTP_PASS', 'EMAIL_TO', 'EMAIL_CC', 'ALLOWED_ORIGINS'];
  const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
  const sent = [];
  nodemailer.createTransport = () => ({ sendMail: async message => {
    sent.push(message);
    return { messageId: 'test-only', accepted: ['sales@example.test'], rejected: [] };
  } });
  process.env.SMTP_USER = 'test@example.test';
  process.env.SMTP_PASS = 'test-only';
  process.env.EMAIL_TO = 'sales@example.test';
  process.env.EMAIL_CC = '';
  process.env.ALLOWED_ORIGINS = 'http://localhost';
  let server;
  let visitor = 0;
  try {
    const { app } = require('../src/server');
    server = app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const submit = body => fetch(`http://127.0.0.1:${server.address().port}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': `192.0.2.${++visitor}` },
      body: JSON.stringify(body),
    });
    for (const fields of [{ type: 'service', service: 'ГНБ' }, { type: 'equipment', product: 'КТП' }]) {
      const { service, ...common } = lead;
      const payload = { ...common, ...fields };
      for (const attribution of [campaign, undefined, {}]) {
        const before = sent.length;
        const response = await submit({ ...payload, attribution });
        assert.equal(response.status, 200);
        assert.equal((await response.json()).ok, true);
        assert.equal(sent.length, before + 1);
        if (attribution === campaign) {
          for (const [key, value] of Object.entries(campaign)) assert.ok(sent.at(-1).text.includes(`${key}: ${value}`));
        } else assert.ok(sent.at(-1).text.includes('UTM-метки: не переданы'));
      }
    }
    const before = sent.length;
    for (const attribution of [null, [], 'text', { utm_source: 123 }, { utm_source: {} }, { utm_source: ['yandex'] },
      { utm_source: 'x'.repeat(1001) }, { utm_term: 'value\nInjected: line' }, { email: 'unrelated@example.test' }]) {
      const response = await submit({ ...lead, attribution });
      assert.equal(response.status, 400);
      assert.equal((await response.json()).error, 'invalid_attribution');
    }
    assert.equal(sent.length, before);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    nodemailer.createTransport = originalTransport;
    for (const key of envKeys) {
      if (originalEnv[key] === undefined) delete process.env[key];
      else process.env[key] = originalEnv[key];
    }
  }
});
