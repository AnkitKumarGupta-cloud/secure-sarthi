import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/hooks'
import { useModal } from '../../lib/useModal'

export interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  describedBy?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  /** Top-aligned on desktop (used by the search palette). */
  placement?: 'center' | 'top'
  className?: string
  hideClose?: boolean
  /** Changes when the dialog swaps its content while staying open; focus moves to the new content. */
  contentKey?: string
}

const widths = { sm: 'sm:max-w-[440px]', md: 'sm:max-w-[560px]', lg: 'sm:max-w-[720px]' }

function DialogPanel({
  onClose,
  labelledBy,
  describedBy,
  children,
  size = 'md',
  placement = 'center',
  className,
  hideClose,
  contentKey,
}: Omit<DialogProps, 'open'>) {
  const panelRef = useRef<HTMLDivElement>(null)
  const close = useModal(true, panelRef, onClose)
  const firstKey = useRef(contentKey)

  useEffect(() => {
    if (contentKey === firstKey.current) return
    firstKey.current = contentKey
    const panel = panelRef.current
    if (!panel) return
    panel.scrollTop = 0
    const target =
      panel.querySelector<HTMLElement>('[data-autofocus]') ?? panel.querySelector<HTMLElement>('h2[id]') ?? panel
    if (target.tagName === 'H2') target.setAttribute('tabindex', '-1')
    target.focus()
  }, [contentKey])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[90] flex justify-center sm:px-6',
        placement === 'top'
          ? 'items-start pt-[max(12px,env(safe-area-inset-top,0px))] sm:pt-[11vh]'
          : 'items-end sm:items-center',
      )}
    >
      <motion.div
        className="absolute inset-0 bg-night/45 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        onClick={() => close.current()}
        aria-hidden
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99, transition: { duration: 0.16 } }}
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        className={cn(
          'relative w-full overflow-y-auto overscroll-contain bg-white shadow-panel outline-none',
          placement === 'top'
            ? 'mx-3 max-h-[min(80vh,640px)] rounded-3xl'
            : 'max-h-[min(90vh,860px)] rounded-t-[28px] pb-[env(safe-area-inset-bottom,0px)] sm:rounded-[28px] sm:pb-0',
          widths[size],
          className,
        )}
      >
        {!hideClose && (
          <button
            type="button"
            onClick={() => close.current()}
            className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full text-ink-soft transition hover:bg-mist hover:text-ink"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        )}
        {children}
      </motion.div>
    </div>
  )
}

/** Accessible modal: focus trap, Escape to close, focus restored to the opener, page scroll locked. */
export function Dialog({ open, ...rest }: DialogProps) {
  if (typeof document === 'undefined') return null
  return createPortal(<AnimatePresence>{open && <DialogPanel {...rest} />}</AnimatePresence>, document.body)
}

/** Consistent dialog header used across the site's dialogs. */
export function DialogHeader({
  id,
  eyebrow,
  title,
  icon,
  children,
}: {
  id: string
  eyebrow?: string
  title: string
  icon?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="px-6 pb-2 pt-7 sm:px-8 sm:pt-8">
      <div className="flex items-start gap-4 pr-10">
        {icon}
        <div className="min-w-0">
          {eyebrow && <p className="eyebrow text-brand">{eyebrow}</p>}
          <h2 id={id} className="mt-1 text-[1.6rem] font-[720] leading-tight text-ink">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </div>
  )
}
