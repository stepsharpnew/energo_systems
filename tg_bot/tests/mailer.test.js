const test = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');
const { sendLeadEmail, verifyEmailConfiguration } = require('../src/mailer');

const originalTransport = nodemailer.createTransport;
const envKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS', 'SMTP_PASSWORD', 'EMAIL_FROM', 'EMAIL_TO', 'EMAIL_CC'];
const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
const lead = { type: 'service', name: 'Тест', contact: '+7 (999)-000-00-00', service: 'Проверка формы' };

test.beforeEach(() => {
  for (const key of envKeys) delete process.env[key];
  process.env.SMTP_USER = 'application@example.test';
  process.env.SMTP_PASS = 'test-only-password';
});
test.afterEach(() => {
  nodemailer.createTransport = originalTransport;
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

test('a lead is addressed to sales and returns the SMTP receipt', async () => {
  let sent;
  nodemailer.createTransport = () => ({ sendMail: async message => {
    sent = message;
    return { messageId: 'smtp-test-id', accepted: ['sales@e-systems.su', 'inbox@e-systems.su'], rejected: [] };
  } });
  const result = await sendLeadEmail(lead);
  assert.equal(sent.to, 'sales@e-systems.su');
  assert.equal(sent.cc, 'inbox@e-systems.su');
  assert.ok(sent.text.includes('Проверка формы'));
  assert.deepEqual(result, { messageId: 'smtp-test-id', accepted: ['sales@e-systems.su', 'inbox@e-systems.su'], rejected: [] });
});

test('SMTP acceptance of only the CC mailbox does not acknowledge the lead', async () => {
  nodemailer.createTransport = () => ({ sendMail: async () => ({
    messageId: 'partial', accepted: ['inbox@e-systems.su'], rejected: ['sales@e-systems.su'],
  }) });
  await assert.rejects(sendLeadEmail(lead), error => {
    assert.equal(error.code, 'EMAIL_RECIPIENT_REJECTED');
    assert.deepEqual(error.rejected, ['sales@e-systems.su']);
    return true;
  });
});

test('rejecting only the copy keeps a successfully accepted primary delivery', async () => {
  nodemailer.createTransport = () => ({ sendMail: async () => ({
    messageId: 'primary', accepted: ['sales@e-systems.su'], rejected: ['inbox@e-systems.su'],
  }) });
  const result = await sendLeadEmail(lead);
  assert.deepEqual(result.rejected, ['inbox@e-systems.su']);
});

test('all configured primary recipients must be accepted, irrespective of case or display name', async () => {
  process.env.EMAIL_TO = 'Sales <Sales@example.test>, manager@example.test';
  nodemailer.createTransport = () => ({ sendMail: async () => ({ accepted: ['sales@example.test', 'manager@example.test'] }) });
  await sendLeadEmail(lead);
  nodemailer.createTransport = () => ({ sendMail: async () => ({ accepted: ['sales@example.test'] }) });
  await assert.rejects(sendLeadEmail(lead), { code: 'EMAIL_RECIPIENT_REJECTED' });
});

test('missing credentials and SMTP failures cannot report success', async () => {
  nodemailer.createTransport = () => ({ sendMail: async () => { throw Object.assign(new Error('Authentication failed'), { code: 'EAUTH' }); } });
  await assert.rejects(sendLeadEmail(lead), { code: 'EAUTH' });
  delete process.env.SMTP_PASS;
  await assert.rejects(sendLeadEmail(lead), /SMTP_USER\/SMTP_PASS/);
});

test('SMTP diagnostics verify authentication without sending a message and close the connection', async () => {
  let verified = false;
  let closed = false;
  nodemailer.createTransport = () => ({
    verify: async () => { verified = true; },
    sendMail: async () => { assert.fail('Diagnostics must not send messages'); },
    close: () => { closed = true; },
  });
  const result = await verifyEmailConfiguration();
  assert.equal(verified, true);
  assert.equal(closed, true);
  assert.equal(result.to, 'sales@e-systems.su');
  assert.equal('pass' in result, false);
});

test('SMTP diagnostics fail for missing credentials and close failed connections', async () => {
  let closed = false;
  nodemailer.createTransport = () => ({ verify: async () => { throw Object.assign(new Error('Timeout'), { code: 'ETIMEDOUT' }); }, close: () => { closed = true; } });
  await assert.rejects(verifyEmailConfiguration(), { code: 'ETIMEDOUT' });
  assert.equal(closed, true);
  delete process.env.SMTP_PASS;
  await assert.rejects(verifyEmailConfiguration(), { code: 'SMTP_NOT_CONFIGURED' });
});
