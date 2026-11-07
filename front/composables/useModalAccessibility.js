import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

const dialogs = []
const isolated = new Map()
let previousOverflow = ''
const focusSelector = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusable(panel) {
  return [...panel.querySelectorAll(focusSelector)].filter(element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden' && !element.closest('[inert]'))
}

function focusInside(dialog) {
  const target = dialog.initialFocus?.value || focusable(dialog.panel)[0] || dialog.panel
  target.focus({ preventScroll: true })
}

function isolateBackground() {
  for (const [element, wasInert] of isolated) element.inert = wasInert
  isolated.clear()
  const current = dialogs.at(-1)
  if (!current) return
  let branch = current.panel
  while (branch?.parentElement && branch !== document.body) {
    for (const sibling of branch.parentElement.children) {
      if (sibling === branch || ['SCRIPT', 'STYLE', 'LINK'].includes(sibling.tagName)) continue
      if (!isolated.has(sibling)) isolated.set(sibling, sibling.inert)
      sibling.inert = true
    }
    branch = branch.parentElement
  }
}

function onKeydown(event) {
  const current = dialogs.at(-1)
  if (!current || event.defaultPrevented) return
  if (event.key === 'Escape') {
    event.preventDefault()
    current.close()
  } else if (event.key === 'Tab') {
    const controls = focusable(current.panel)
    const first = controls[0], last = controls.at(-1)
    if (!first) { event.preventDefault(); focusInside(current); return }
    const active = document.activeElement
    if (event.shiftKey && (active === first || !controls.includes(active))) {
      event.preventDefault(); last.focus()
    } else if (!event.shiftKey && (active === last || !current.panel.contains(active))) {
      event.preventDefault(); first.focus()
    }
  }
}

function onFocus(event) {
  const current = dialogs.at(-1)
  if (current && !current.panel.contains(event.target)) focusInside(current)
}

// Keep existing modal markup and styling while sharing keyboard and focus behavior.
export function useModalAccessibility(panel, isOpen, close, options = {}) {
  let current, stopWatching
  function deactivate() {
    if (!current) return
    const previousFocus = current.previousFocus
    dialogs.splice(dialogs.indexOf(current), 1)
    current = undefined
    isolateBackground()
    if (!dialogs.length) {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('focusin', onFocus)
    }
    if (previousFocus?.isConnected && !previousFocus.closest('[inert]')) previousFocus.focus({ preventScroll: true })
    else if (dialogs.length) focusInside(dialogs.at(-1))
  }
  onMounted(() => {
    stopWatching = watch(isOpen, async (open, _, onCleanup) => {
      let cancelled = false
      onCleanup(() => { cancelled = true })
      if (!open) { deactivate(); return }
      await nextTick()
      if (cancelled || current || !panel.value) return
      if (!dialogs.length) {
        previousOverflow = document.body.style.overflow
        document.addEventListener('keydown', onKeydown)
        document.addEventListener('focusin', onFocus)
      }
      current = { panel: panel.value, close, initialFocus: options.initialFocus, previousFocus: document.activeElement }
      dialogs.push(current)
      document.body.style.overflow = 'hidden'
      isolateBackground()
      focusInside(current)
    }, { immediate: true, flush: 'post' })
  })
  onBeforeUnmount(() => { stopWatching?.(); deactivate() })
}
