import test from 'node:test'
import assert from 'node:assert/strict'
import { scrollToPageSection } from '../utils/nativeScroll.js'
import { revealOnVisible } from '../utils/revealOnVisible.js'

test('native section navigation accounts for sticky navigation and reduced motion', () => {
  const calls = []
  const target = { getBoundingClientRect: () => ({ top: 400 }) }
  const navigation = { getBoundingClientRect: () => ({ height: 58 }) }
  const browser = {
    scrollY: 260,
    getComputedStyle: () => ({ position: 'sticky', top: '0px' }),
    matchMedia: () => ({ matches: false }),
    scrollTo: options => calls.push(options),
  }
  scrollToPageSection(target, navigation, browser)
  assert.deepEqual(calls.pop(), { top: 590, behavior: 'smooth' })
  browser.matchMedia = () => ({ matches: true })
  scrollToPageSection(target, navigation, browser)
  assert.deepEqual(calls.pop(), { top: 590, behavior: 'instant' })
  browser.getComputedStyle = () => ({ position: 'static', top: '0px' })
  scrollToPageSection(target, navigation, browser)
  assert.equal(calls.pop().top, 648)
  scrollToPageSection(null, navigation, browser)
  assert.equal(calls.length, 0)
})

test('progressive reveal leaves SSR/first-screen content visible and disconnects cleanly', () => {
  const classes = new Set()
  const firstScreen = { getBoundingClientRect: () => ({ top: 20 }) }
  const offscreen = {
    getBoundingClientRect: () => ({ top: 900 }),
    classList: { add: value => classes.add(value), remove: value => classes.delete(value) },
  }
  const observed = [], unobserved = []
  let callback, disconnected = false
  const browser = {
    innerHeight: 800,
    matchMedia: () => ({ matches: false }),
    IntersectionObserver: class {
      constructor(handler) { callback = handler }
      observe(element) { observed.push(element) }
      unobserve(element) { unobserved.push(element) }
      disconnect() { disconnected = true }
    },
  }
  const root = { querySelectorAll: () => [firstScreen, offscreen] }
  const cleanup = revealOnVisible(root, '.card', browser)
  assert.deepEqual(observed, [offscreen])
  assert.equal(classes.size, 0, 'initial rendering must not add a hiding class')
  callback([{ isIntersecting: false, target: offscreen }])
  assert.equal(classes.size, 0)
  callback([{ isIntersecting: true, target: offscreen }])
  assert.equal(classes.has('es-reveal'), true)
  assert.deepEqual(unobserved, [offscreen])
  cleanup()
  assert.equal(disconnected, true)
  assert.equal(classes.size, 0)
})

test('decorative effects stay optional without IntersectionObserver or with reduced motion', () => {
  const root = { querySelectorAll: () => { throw new Error('must not inspect or hide content') } }
  revealOnVisible(root, '.card', { matchMedia: () => ({ matches: false }) })()
  revealOnVisible(root, '.card', {
    IntersectionObserver: class { constructor() { throw new Error('must not animate') } },
    matchMedia: () => ({ matches: true }),
  })()
})
