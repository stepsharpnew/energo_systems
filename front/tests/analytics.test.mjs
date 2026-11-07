import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { METRIKA_BOOTSTRAP, createPageViewTracker } from '../lib/browser/analytics.js'
import { afterFirstPaint } from '../lib/browser/afterPaint.js'

test('early analytics preserves the landing campaign, queues goals and deduplicates SPA views', () => {
  const browser = {
    location: { href: 'https://e-systems.su/?utm_source=yandex&yclid=123' },
    document: { title: 'Главная', referrer: 'https://yandex.ru/' },
  }
  const context = vm.createContext({ window: browser, location: browser.location, document: browser.document })
  vm.runInContext(METRIKA_BOOTSTRAP, context)
  vm.runInContext(METRIKA_BOOTSTRAP, context)
  const track = createPageViewTracker(browser)
  track()
  browser.ym(110919120, 'reachGoal', 'lead_sent')
  browser.location.href = 'https://e-systems.su/services/ups'
  browser.document.title = 'ИБП'
  track()
  track()
  browser.location.href = 'https://e-systems.su/'
  track()
  const events = Array.from(browser.ym.a, args => Array.from(args))
  assert.deepEqual(events.map(event => event[1]), ['init', 'hit', 'reachGoal', 'hit', 'hit'])
  assert.equal(events[1][2], 'https://e-systems.su/?utm_source=yandex&yclid=123')
  assert.equal(events[1][3].referer, 'https://yandex.ru/')
  assert.equal(events[3][3].referer, events[1][2])
  assert.equal(events[4][3].referer, events[3][2])
  assert.equal(events[0][2].clickmap, true)
  assert.equal(events[0][2].trackLinks, true)
  assert.equal(events[0][2].accurateTrackBounce, true)
})

function scheduler(visibilityState = 'visible') {
  const frames = [], idle = [], tasks = []
  const listeners = new Map()
  return {
    frames, idle, tasks, listeners,
    document: {
      visibilityState,
      addEventListener: (name, fn) => listeners.set(name, fn),
      removeEventListener: name => listeners.delete(name),
    },
    requestAnimationFrame: callback => frames.push(callback), cancelAnimationFrame() {},
    requestIdleCallback: (callback, options) => { assert.equal(options.timeout, 500); return idle.push(callback) },
    cancelIdleCallback() {}, setTimeout: callback => tasks.push(callback), clearTimeout() {},
  }
}

test('SDK work waits for a painted frame with a bounded idle deadline', () => {
  const browser = scheduler()
  let calls = 0
  afterFirstPaint(() => calls++, browser)
  assert.equal(calls, 0)
  browser.frames.shift()()
  assert.equal(browser.idle.length, 0)
  browser.frames.shift()()
  assert.equal(calls, 0)
  browser.idle.shift()()
  assert.equal(calls, 1)
})

test('hiding a tab between frames starts queued SDKs only once', () => {
  const browser = scheduler()
  let calls = 0
  afterFirstPaint(() => calls++, browser)
  browser.frames.shift()()
  browser.document.visibilityState = 'hidden'
  browser.listeners.get('visibilitychange')()
  assert.equal(calls, 1)
  assert.equal(browser.listeners.size, 0)
  browser.frames.shift()()
  assert.equal(browser.idle.length, 0)
  assert.equal(calls, 1)
})

test('background visits do not wait for animation frames and scheduled work can be cancelled', () => {
  const browser = scheduler('hidden')
  let calls = 0
  afterFirstPaint(() => calls++, browser)
  assert.equal(browser.frames.length, 0)
  browser.tasks.shift()()
  assert.equal(calls, 1)
  const cancel = afterFirstPaint(() => calls++, browser)
  cancel()
  browser.tasks.shift()()
  assert.equal(calls, 1)
})
