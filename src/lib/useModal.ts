import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared behaviour for dialogs and drawers: locks page scroll, moves focus inside,
 * traps Tab, closes on Escape, and returns focus to whatever opened it.
 */
export function useModal(open: boolean, panelRef: RefObject<HTMLElement>, onClose: () => void) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current
      if (!panel) return
      const preferred = panel.querySelector<HTMLElement>('[data-autofocus]')
      const first = panel.querySelector<HTMLElement>(FOCUSABLE)
      ;(preferred ?? first ?? panel).focus()
    }, 40)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const activeInside = panelRef.current.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === first || !activeInside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !activeInside)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey, true)
      html.style.overflow = prevOverflow
      // Return focus to the opener, unless the page already moved it somewhere meaningful (e.g. a new page heading).
      const active = document.activeElement
      const stillInside = !active || active === document.body || !!panelRef.current?.contains(active)
      if (stillInside && opener && document.contains(opener)) opener.focus({ preventScroll: true })
    }
  }, [open, panelRef])

  return closeRef
}
