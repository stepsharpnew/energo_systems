// A queued native-dialog close event must not unlock another open DGU dialog.
const locks = new Set()
export function createDguDialogLock() {
  const token = {}
  return {
    lock() {
      locks.add(token)
      document.body.classList.add('dgu-modal-open', 'is-locked')
    },
    unlock() {
      locks.delete(token)
      if (!locks.size) document.body.classList.remove('dgu-modal-open', 'is-locked')
    },
  }
}
