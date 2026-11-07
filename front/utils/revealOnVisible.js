// Content stays visible in SSR and without JavaScript. Only offscreen elements
// receive a short, one-time entrance animation as they enter the viewport.
export function revealOnVisible(root, selector, browser = window) {
  if (!root || !browser.IntersectionObserver || browser.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  const observed = []
  const observer = new browser.IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('es-reveal')
      observer.unobserve(entry.target)
    }
  }, { threshold: 0.08 })
  for (const element of root.querySelectorAll(selector)) {
    if (element.getBoundingClientRect().top < browser.innerHeight) continue
    observed.push(element)
    observer.observe(element)
  }
  return () => {
    observer.disconnect()
    for (const element of observed) element.classList.remove('es-reveal')
  }
}
