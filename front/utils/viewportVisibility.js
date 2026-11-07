// Observe the viewport band itself, rather than a fraction of the target's
// height: a long section can be visible while its intersection ratio stays tiny.
export function observeViewportBand(element, onChange, { top = .15, bottom = .85, browser = window } = {}) {
  if (!element) return () => {}
  let observer, resizeObserver, frame, generation = 0, stopped = false
  const hasObserver = typeof browser.IntersectionObserver === 'function'
  const measure = () => {
    if (stopped) return
    const rect = element.getBoundingClientRect()
    onChange(rect.top < browser.innerHeight * bottom && rect.bottom > browser.innerHeight * top)
  }
  const recreate = () => {
    frame = undefined
    if (stopped) return
    observer?.disconnect()
    const current = ++generation
    if (hasObserver) {
      const height = browser.innerHeight
      observer = new browser.IntersectionObserver(entries => {
        if (stopped || current !== generation) return
        const entry = entries.find(item => item.target === element)
        if (entry) onChange(entry.isIntersecting)
      }, {
        rootMargin: `-${Math.round(height * top)}px 0px -${Math.round(height * (1 - bottom))}px 0px`,
        threshold: 0,
      })
      observer.observe(element)
    }
    measure()
  }
  const onResize = () => {
    if (!browser.requestAnimationFrame) recreate()
    else if (frame === undefined) frame = browser.requestAnimationFrame(recreate)
  }
  recreate()
  if (!hasObserver) browser.addEventListener('scroll', measure, { passive: true })
  browser.addEventListener('resize', onResize)
  if (typeof browser.ResizeObserver === 'function') {
    resizeObserver = new browser.ResizeObserver(measure)
    resizeObserver.observe(element)
  }
  return () => {
    stopped = true
    observer?.disconnect()
    resizeObserver?.disconnect()
    if (frame !== undefined) browser.cancelAnimationFrame(frame)
    browser.removeEventListener('scroll', measure)
    browser.removeEventListener('resize', onResize)
  }
}
