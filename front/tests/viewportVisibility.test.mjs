import test from 'node:test'
import assert from 'node:assert/strict'
import { observeViewportBand } from '../utils/viewportVisibility.js'

function fixture({ observer = true, rect = { top: 750, bottom: 5000 } } = {}) {
  const listeners = new Map(), observers = [], frames = new Map(), changes = []
  const target = { getBoundingClientRect: () => rect }
  let targetResize, resizeDisconnected = false, nextFrame = 0, measurements = 0
  target.getBoundingClientRect = () => { measurements++; return rect }
  const browser = {
    innerHeight: 1000,
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event, callback) => { if (listeners.get(event) === callback) listeners.delete(event) },
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: id => frames.delete(id),
    ResizeObserver: class {
      constructor(callback) { targetResize = callback }
      observe(element) { assert.equal(element, target) }
      disconnect() { resizeDisconnected = true }
    },
  }
  if (observer) browser.IntersectionObserver = class {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this) }
    observe(element) { assert.equal(element, target) }
    disconnect() { this.disconnected = true }
  }
  return { browser, target, changes, listeners, observers, frames,
    setRect: value => { rect = value },
    targetResize: () => targetResize(),
    hasTargetResize: () => Boolean(targetResize),
    measurements: () => measurements,
    resizeDisconnected: () => resizeDisconnected,
    flushFrames: () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback()) },
  }
}

test('tall sections enter the central viewport band even at tiny intersection ratios', () => {
  const f = fixture()
  const stop = observeViewportBand(f.target, value => f.changes.push(value), { top: .25, bottom: .7, browser: f.browser })
  assert.equal(f.changes.length, 0, 'initial state comes from the observer after layout')
  assert.equal(f.measurements(), 0, 'mount must not synchronously force layout')
  assert.equal(f.hasTargetResize(), false, 'native IntersectionObserver already tracks layout changes')
  assert.equal(f.listeners.has('scroll'), false)
  assert.deepEqual(f.observers[0].options, { rootMargin: '-250px 0px -300px 0px', threshold: 0 })
  f.setRect({ top: 650, bottom: 4900 })
  f.observers[0].callback([{ target: f.target, isIntersecting: true, intersectionRatio: .012 }])
  assert.equal(f.changes.at(-1), true)
  f.setRect({ top: -5000, bottom: 200 })
  f.observers[0].callback([{ target: f.target, isIntersecting: false, intersectionRatio: 0 }])
  assert.equal(f.changes.at(-1), false)
  stop()
})

test('viewport resize rebuilds pixel margins and ignores queued old-observer events', () => {
  const f = fixture({ rect: { top: 800, bottom: 5000 } })
  const stop = observeViewportBand(f.target, value => f.changes.push(value), { browser: f.browser })
  const previous = f.observers[0]
  previous.callback([{ target: f.target, isIntersecting: true }])
  assert.equal(f.changes.at(-1), true)
  f.browser.innerHeight = 500
  f.listeners.get('resize')()
  f.listeners.get('resize')()
  assert.equal(f.frames.size, 1)
  f.flushFrames()
  assert.equal(previous.disconnected, true)
  assert.deepEqual(f.observers[1].options, { rootMargin: '-75px 0px -75px 0px', threshold: 0 })
  assert.equal(f.measurements(), 0)
  f.observers[1].callback([{ target: f.target, isIntersecting: false }])
  assert.equal(f.changes.at(-1), false)
  previous.callback([{ target: f.target, isIntersecting: true }])
  assert.equal(f.changes.at(-1), false)
  f.setRect({ top: 300, bottom: 1000 })
  f.observers[1].callback([{ target: f.target, isIntersecting: true }])
  assert.equal(f.changes.at(-1), true)
  stop()
  assert.equal(f.observers[1].disconnected, true)
  assert.equal(f.hasTargetResize(), false)
  assert.equal(f.listeners.size, 0)
})

test('scroll fallback is installed only without IntersectionObserver and cleans up', () => {
  const f = fixture({ observer: false, rect: { top: 100, bottom: 4000 } })
  const stop = observeViewportBand(f.target, value => f.changes.push(value), { browser: f.browser })
  assert.equal(f.changes.at(-1), true)
  f.setRect({ top: -4000, bottom: 20 })
  f.listeners.get('scroll')()
  assert.equal(f.changes.at(-1), false)
  f.setRect({ top: 100, bottom: 2000 })
  f.targetResize()
  assert.equal(f.changes.at(-1), true)
  stop()
  assert.equal(f.resizeDisconnected(), true)
  assert.equal(f.listeners.size, 0)
})
