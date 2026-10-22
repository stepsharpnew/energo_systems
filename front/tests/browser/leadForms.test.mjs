import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../../.output/public/', import.meta.url))
const require = createRequire(new URL('../../../tg_bot/package.json', import.meta.url))
const nodemailer = require('nodemailer')
const mail = []
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }

// This transport is installed before importing the API. Tests cannot contact SMTP.
nodemailer.createTransport = () => ({ sendMail: async message => {
  mail.push(message)
  return { messageId: `test-${mail.length}`, accepted: ['sales@e-systems.su', 'inbox@e-systems.su'], rejected: [] }
} })
process.env.SMTP_USER = 'test@example.test'
process.env.SMTP_PASS = 'test-only'
process.env.EMAIL_TO = 'sales@e-systems.su'
process.env.EMAIL_CC = 'inbox@e-systems.su'

let app
let requestNumber = 0
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  if (url.pathname.startsWith('/api/')) {
    // Each test attempt models a distinct visitor, below the production rate limit.
    req.headers['x-forwarded-for'] = `192.0.2.${++requestNumber}`
    return app(req, res)
  }
  try {
    let path = join(root, decodeURIComponent(url.pathname))
    if ((await stat(path)).isDirectory()) path = join(path, 'index.html')
    const data = await readFile(path)
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
})

const campaign = {
  utm_source: 'yandexdirect', utm_medium: 'cpc', utm_campaign: '712977221',
  utm_content: '17786149843', utm_term: 'ГНБ + область & <тест>', yclid: 'test-click-123',
}
async function visitFromCampaign(page, base, destination) {
  // Exercise both directions across Nuxt and the standalone UPS landing.
  const landing = destination.startsWith('/services/ups') ? '/' : '/services/ups/'
  await page.goto(base + landing + '?' + new URLSearchParams(campaign), { waitUntil: 'networkidle' })
  await page.goto(base + destination, { waitUntil: 'networkidle' })
  // Submission must also work if the address bar no longer contains the tags.
  await page.evaluate(() => history.replaceState(history.state, '', location.pathname))
}
function assertCampaignEmail(message) {
  for (const [key, value] of Object.entries(campaign)) {
    assert.ok(message.text.includes(`${key}: ${value}`), `${key} must reach the text email`)
    assert.ok(message.html.includes(key), `${key} must reach the HTML email`)
  }
  assert.ok(message.html.includes('ГНБ + область &amp; &lt;тест&gt;'))
}

const check = locator => locator.evaluate(element => element.click())
async function enterContact(form, names) {
  await form.locator(`[name=${names.name}]`).fill('Тестовая заявка')
  await form.locator(`[name=${names.phone}]`).fill('79990000000')
  for (const name of names.consent) await check(form.locator(`[name=${name}]`))
}

const cases = [
  { name: 'ГНБ: форма в контактах', path: '/services/hdd', form: '[data-contact-form]', button: '.contacts__submit', error: '[data-submit-error]', success: '[data-contact-done]', names: { name: 'ctname', phone: 'ctphone', consent: ['ctconsent', 'ctprivacy'] } },
  { name: 'ГНБ: обратный звонок', path: '/services/hdd', opener: '[data-callback-open]', form: '[data-callback-form]', button: '.modal__submit', error: '[data-submit-error]', success: '[data-callback-done]', names: { name: 'cbname', phone: 'cbphone', consent: ['cbconsent', 'cbprivacy'] } },
  { name: 'ГНБ: опрос', path: '/services/hdd', form: '[data-quiz] form', quiz: 'hdd', button: '[data-next]', error: '[data-msg-out]', success: '[data-result].is-active', names: { name: 'name', phone: 'phone', consent: ['consent', 'privacy'] } },
  { name: 'ИБП: форма в контактах', path: '/services/ups', form: '[data-contact-form]', button: '.contacts__submit', error: '[data-contact-error]', success: '[data-contact-done]', names: { name: 'ctname', phone: 'ctphone', consent: ['ctconsent', 'ctprivacy'] } },
  { name: 'ИБП: обратный звонок', path: '/services/ups', opener: '[data-callback-open]', form: '[data-modal-form]', button: '[data-modal-submit]', error: '[data-modal-error]', success: '[data-modal-form].is-sent', names: { name: 'name', phone: 'phone', consent: ['consent', 'policy'] } },
  { name: 'ИБП: опрос', path: '/services/ups', form: '[data-quiz-form]', quiz: 'ups', button: '[data-quiz-next]', error: '[data-quiz-error]', success: '[data-quiz-done]', names: { name: 'name', phone: 'phone', consent: ['consent', 'policy'] } },
]

test('landing forms send validated leads and never report an unacknowledged submission as successful', async t => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  process.env.ALLOWED_ORIGINS = base
  app = require('./src/server.js').app
  let browser
  try {
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, headless: true })
    for (const item of cases) {
      await t.test(item.name, async () => {
        const context = await browser.newContext({ reducedMotion: 'reduce' })
        const page = await context.newPage()
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        let mode = 'error'
        const payloads = []
        await context.route('**/*', async route => {
          const url = new URL(route.request().url())
          if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
          if (url.pathname === '/api/lead') {
            payloads.push(route.request().postDataJSON())
            if (mode === 'error') return route.fulfill({ status: 500, contentType: 'application/json', body: '{"ok":false,"error":"email_send_failed"}' })
            if (mode === 'unacknowledged') return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":false}' })
          }
          return route.continue()
        })
        try {
          await visitFromCampaign(page, base, item.path)
          assert.equal(await page.locator(item.success).isVisible(), false, 'success must start hidden')
          if (item.opener) await page.locator(item.opener).first().click()
          const form = page.locator(item.form)
          if (item.quiz) {
            for (let i = 0; i < 4; i++) {
              const step = item.quiz === 'hdd' ? page.locator('[data-step].is-active') : page.locator('.qstep:visible')
              await check(step.locator('input[type=radio], input[type=checkbox]').first())
              await page.locator(item.button).click()
            }
          }
          await enterContact(form, item.names)
          if (item.quiz === 'hdd') await form.locator('[name=address]').fill('Тестовый адрес объекта')
          const button = page.locator(item.button)
          const error = item.quiz ? page.locator(item.error) : form.locator(item.error)
          await button.click()
          await error.filter({ hasText: /Не (получилось|удалось)/ }).waitFor()
          assert.equal(payloads.length, 1)
          assert.equal(await page.locator(item.success).isVisible(), false)
          assert.equal(await button.isEnabled(), true)
          assert.equal(await form.locator(`[name=${item.names.name}]`).inputValue(), 'Тестовая заявка')

          mode = 'unacknowledged'
          await button.click()
          await page.waitForFunction(selector => !document.querySelector(selector).disabled, item.button)
          assert.equal(payloads.length, 2)
          assert.equal(await page.locator(item.success).isVisible(), false)

          mode = 'success'
          const before = mail.length
          await button.click()
          await page.locator(item.success).waitFor({ state: 'visible' })
          assert.equal(payloads.length, 3)
          assert.equal(mail.length, before + 1)
          assert.equal(mail.at(-1).to, 'sales@e-systems.su')
          assertCampaignEmail(mail.at(-1))
          assert.ok(mail.at(-1).text.includes('Тестовая заявка'))
          const payload = payloads.at(-1)
          assert.deepEqual(payload.attribution, campaign)
          assert.equal(payload.consent, true)
          assert.equal(payload.consentVersion, '2026-07-13')
          assert.equal(payload.contact, '+7 (999)-000-00-00')
          if (item.quiz) assert.ok(payload.answers.length >= 4)
          assert.deepEqual(errors, [])
        } finally {
          await context.close()
        }
      })
    }
    for (const kind of ['service', 'equipment']) {
      await t.test(kind === 'service' ? 'Главная: заявка на услугу' : 'Каталог: заявка на оборудование', async () => {
        const context = await browser.newContext({ reducedMotion: 'reduce' })
        const page = await context.newPage()
        let acknowledged = false
        await context.route('**/*', route => {
          const url = new URL(route.request().url())
          if (url.origin !== base) return route.fulfill({ status: 200, body: '' })
          if (url.pathname === '/api/lead' && !acknowledged) {
            return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":false}' })
          }
          return route.continue()
        })
        page.on('dialog', dialog => dialog.accept())
        try {
          await visitFromCampaign(page, base, kind === 'service' ? '/' : '/equipment/mtp')
          let form
          if (kind === 'service') {
            await page.locator('.request-button').click()
            form = page.locator('.contact-form')
            await form.locator('#name').fill('Тестовая заявка')
            await form.locator('#phone').fill('79990000000')
            await form.locator('.custom-select').click()
            await form.locator('.custom-select-option').first().click()
            await check(form.locator('input[type=checkbox]'))
            const dialog = page.waitForEvent('dialog')
            await form.locator('[type=submit]').click()
            assert.match((await dialog).message(), /ошибка/)
            assert.equal(await form.isVisible(), true)
          } else {
            form = page.locator('.request-form')
            await form.locator('[name=name]').fill('Тестовая заявка')
            await form.locator('[name=email]').fill('test@example.test')
            await form.locator('[name=location]').fill('Тестовый город')
            await form.locator('[name=comment]').fill('Тестовая задача')
            await check(form.locator('[name=consent]'))
            await form.locator('[type=submit]').click()
            await form.locator('.form-error').waitFor()
            assert.equal(await page.locator('.success-state').isVisible(), false)
          }
          acknowledged = true
          const before = mail.length
          const dialog = kind === 'service' ? page.waitForEvent('dialog') : null
          await form.locator('[type=submit]').click()
          if (dialog) {
            assert.match((await dialog).message(), /Спасибо/)
            await form.waitFor({ state: 'hidden' })
          } else {
            await page.locator('.success-state').waitFor()
          }
          assert.equal(mail.length, before + 1)
          assert.equal(mail.at(-1).to, 'sales@e-systems.su')
          assertCampaignEmail(mail.at(-1))
        } finally {
          await context.close()
        }
      })
    }
  } finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
  }
})
