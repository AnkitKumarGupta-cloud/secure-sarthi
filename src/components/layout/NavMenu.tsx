import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/hooks'
import { Link } from '../../lib/router'

interface NavMenuProps {
  id: string
  label: string
  active: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  align?: 'center' | 'start'
  panelClassName?: string
}

/**
 * Disclosure-style navigation menu: click, hover (mouse only) or keyboard opens it.
 * Arrow keys move between items, Escape closes and returns focus to the button.
 */
export function NavMenu({ id, label, active, open, onOpenChange, children, align = 'center', panelClassName }: NavMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const hoverTimer = useRef<number>()

  const items = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>('[data-menu-item]') ?? [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onOpenChange(false)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const inside = rootRef.current?.contains(document.activeElement)
      onOpenChange(false)
      if (inside) buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  const focusItem = (index: number) => {
    const list = items()
    if (!list.length) return
    list[(index + list.length) % list.length].focus()
  }

  const onButtonKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || ((e.key === 'Enter' || e.key === ' ') && !open)) {
      e.preventDefault()
      onOpenChange(true)
      window.setTimeout(() => focusItem(0), 30)
    } else if (e.key === 'Escape' && open) {
      onOpenChange(false)
    }
  }

  const onPanelKey = (e: KeyboardEvent) => {
    const list = items()
    const index = list.indexOf(document.activeElement as HTMLElement)
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      focusItem(index + 1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      focusItem(index - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusItem(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusItem(list.length - 1)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onOpenChange(false)
      buttonRef.current?.focus()
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return
        window.clearTimeout(hoverTimer.current)
        onOpenChange(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return
        hoverTimer.current = window.setTimeout(() => onOpenChange(false), 160)
      }}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) onOpenChange(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => onOpenChange(!open)}
        onKeyDown={onButtonKey}
        className={cn(
          'relative flex h-11 items-center gap-1 rounded-full px-3 font-display text-[0.97rem] font-semibold transition-colors',
          active || open ? 'text-ink' : 'text-ink/80 hover:text-ink',
        )}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          strokeWidth={2.4}
        />
        {active && <ActiveBar />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={`${id}-menu`}
            onKeyDown={onPanelKey}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99, transition: { duration: 0.12 } }}
            transition={{ type: 'spring', stiffness: 520, damping: 36 }}
            style={align === 'center' ? { x: '-50%' } : undefined}
            className={cn('absolute top-full z-10 pt-2.5', align === 'center' ? 'left-1/2' : 'left-0')}
          >
            <div
              className={cn(
                'rounded-[22px] border border-line/80 bg-white/95 p-2 shadow-lift backdrop-blur-xl',
                panelClassName,
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ActiveBar() {
  return (
    <motion.span
      layoutId="nav-active"
      aria-hidden
      className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-gold"
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
    />
  )
}

export function MenuItem({
  icon,
  title,
  blurb,
  to,
  onSelect,
}: {
  icon: ReactNode
  title: string
  blurb?: string
  to: string
  onSelect?: () => void
}) {
  return (
    <Link
      to={to}
      data-menu-item
      onClick={onSelect}
      className="flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-mist focus-visible:bg-mist"
    >
      {icon}
      <span className="min-w-0">
        <span className="block font-display text-[0.98rem] font-semibold leading-snug text-ink">{title}</span>
        {blurb && <span className="mt-0.5 block text-[0.88rem] leading-snug text-ink-soft">{blurb}</span>}
      </span>
    </Link>
  )
}
