// A short, bounded idle slot following a painted frame keeps optional SDK work
// out of hydration. This never waits for a click or a long page-load timeout.
export function afterFirstPaint(callback, browser = window) {
  let cancelled = false
  let completed = false
  let frame = 0
  let idle = 0
  let timer = 0
  const cleanup = () => {
    browser.cancelAnimationFrame(frame)
    browser.cancelIdleCallback?.(idle)
    browser.clearTimeout(timer)
    browser.document.removeEventListener('visibilitychange', onVisibility)
  }
  const run = () => {
    if (cancelled || completed) return
    completed = true
    cleanup()
    callback()
  }
  const onVisibility = () => {
    if (browser.document.visibilityState === 'hidden') run()
  }
  const enqueue = () => {
    if (cancelled || completed) return
    if (browser.requestIdleCallback) idle = browser.requestIdleCallback(run, { timeout: 500 })
    else timer = browser.setTimeout(run, 0)
  }
  browser.document.addEventListener('visibilitychange', onVisibility)
  if (browser.document.visibilityState === 'hidden') {
    // requestAnimationFrame is suspended in a background tab; still track it.
    timer = browser.setTimeout(run, 0)
  } else {
    frame = browser.requestAnimationFrame(() => {
      frame = browser.requestAnimationFrame(enqueue)
    })
  }
  return () => {
    cancelled = true
    cleanup()
  }
}
