export function scrollToPageSection(target, navigation, browser = window) {
  if (!target) return
  let offset = 12
  if (navigation) {
    const style = browser.getComputedStyle(navigation)
    if (style.position === 'sticky' || style.position === 'fixed') {
      offset += navigation.getBoundingClientRect().height + Math.max(0, parseFloat(style.top) || 0)
    }
  }
  browser.scrollTo({
    top: Math.max(0, target.getBoundingClientRect().top + browser.scrollY - offset),
    behavior: browser.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}
