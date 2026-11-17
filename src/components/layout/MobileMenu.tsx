import { useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, X } from 'lucide-react'
import { ABOUT_LINKS, BRAND, CLAIM_TOPICS, PLANS } from '../../data/content'
import { cn } from '../../lib/hooks'
import { Link, useRouter } from '../../lib/router'
import { useModal } from '../../lib/useModal'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

function Group({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border-b border-line/70">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="flex min-h-[52px] w-full items-center justify-between font-display text-[1.08rem] font-semibold text-ink"
      >
        {title}
        <ChevronDown className={cn('h-5 w-5 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-3">{children}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function SubItem({ children, to, onClick }: { children: ReactNode; to: string; onClick: () => void }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="flex min-h-[46px] w-full items-center gap-3 rounded-xl px-2 text-left text-[1rem] text-ink-soft transition hover:bg-mist hover:text-ink"
      >
        {children}
      </Link>
    </li>
  )
}

function TopItem({ children, to, onClick }: { children: ReactNode; to: string; onClick: () => void }) {
  return (
    <li className="border-b border-line/70">
      <Link to={to} onClick={onClick} className="flex min-h-[52px] w-full items-center font-display text-[1.08rem] font-semibold text-ink">
        {children}
      </Link>
    </li>
  )
}

function Panel({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const close = useModal(true, panelRef, onClose)
  const { navigate } = useRouter()
  const then = (fn: () => void) => () => {
    close.current()
    window.setTimeout(fn, 60)
  }

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <motion.div
        className="absolute inset-0 bg-night/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => close.current()}
        aria-hidden
      />
      <motion.div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%', transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 420, damping: 40 }}
        className="absolute inset-y-0 right-0 flex w-[min(92vw,400px)] flex-col overflow-y-auto bg-white pb-[max(20px,env(safe-area-inset-bottom,0px))] pr-[env(safe-area-inset-right,0px)] pt-[env(safe-area-inset-top,0px)] shadow-panel outline-none"
      >
        <div className="flex h-[var(--header-h)] items-center justify-between px-5">
          <Logo />
          <button
            type="button"
            onClick={() => close.current()}
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-mist"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile" className="px-5">
          <ul>
            <TopItem to="/" onClick={() => close.current()}>
              Home
            </TopItem>
            <Group id="m-products" title="Products">
              {PLANS.map((p) => (
                <SubItem key={p.id} to={`/plans/${p.id}`} onClick={() => close.current()}>
                  <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg', p.iconTint)}>
                    <p.icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  {p.title}
                </SubItem>
              ))}
              <SubItem to="/plans" onClick={() => close.current()}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/25 text-ink">
                  <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
                </span>
                Compare all plans
              </SubItem>
            </Group>
            <TopItem to="/?section=calculator" onClick={() => close.current()}>
              Premium Calculator
            </TopItem>
            <Group id="m-claims" title="Claims">
              {CLAIM_TOPICS.map((t) => (
                <SubItem key={t.id} to={`/claims/${t.id}`} onClick={() => close.current()}>
                  <t.icon className="h-5 w-5 text-brand" aria-hidden />
                  {t.title}
                </SubItem>
              ))}
            </Group>
            <Group id="m-about" title="About">
              {ABOUT_LINKS.map((a) => (
                <SubItem key={a.id} to={a.to} onClick={() => close.current()}>
                  <a.icon className="h-5 w-5 text-brand" aria-hidden />
                  {a.title}
                </SubItem>
              ))}
            </Group>
            <TopItem to="/contact" onClick={() => close.current()}>
              Contact
            </TopItem>
          </ul>
        </nav>
        <div className="mt-auto grid gap-3 px-5 pt-8">
          <a href={BRAND.phoneHref} className="inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-7 font-display text-[1.03rem] font-semibold text-white">
            Call {BRAND.phone}
          </a>
          <Button size="lg" arrow onClick={then(() => navigate('/?section=calculator'))}>
            Estimate Premium
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof document === 'undefined') return null
  return createPortal(<AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>, document.body)
}
