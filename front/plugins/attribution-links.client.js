import { withAttributionUrl } from '~/utils/attribution'

export default defineNuxtPlugin((nuxtApp) => {
  const decorated = new WeakMap()
  const decorateLink = (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null
    if (!link || link.hasAttribute('download')) return

    const href = link.getAttribute('href')
    const previous = decorated.get(link)
    const original = previous?.href === href ? previous.original : href
    const query = Object.fromEntries(new URLSearchParams(window.location.search))
    const next = withAttributionUrl(original, window.location.href, query)
    if (next !== href) {
      decorated.set(link, { original, href: next })
      link.setAttribute('href', next)
    }
  }

  nuxtApp.hook('app:mounted', () => {
    // Capture before NuxtLink's handler; also cover native links, keyboard
    // activation, middle-click and opening/copying a link via the context menu.
    for (const event of ['pointerdown', 'click', 'contextmenu']) {
      document.addEventListener(event, decorateLink, true)
    }
  })
})
