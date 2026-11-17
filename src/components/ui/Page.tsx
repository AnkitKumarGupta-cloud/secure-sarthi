import { Fragment, useMemo, type ReactNode } from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import { cn, scrollToSection, useScrollSpy } from '../../lib/hooks'
import { Link } from '../../lib/router'
import { FadeUp } from './Reveal'

export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.9rem] text-ink-soft">
        {items.map((it, i) => (
          <Fragment key={it.label}>
            <li>
              {it.to ? (
                <Link to={it.to} className="rounded font-medium text-brand-deep underline-offset-2 hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-ink">
                  {it.label}
                </span>
              )}
            </li>
            {i < items.length - 1 && (
              <li aria-hidden className="grid">
                <ChevronRight className="h-4 w-4" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

/** Top band of every inner page. Sits under the fixed header. */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  actions,
  aside,
}: {
  breadcrumbs: Array<{ label: string; to?: string }>
  eyebrow: string
  title: string
  lead?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,rgb(var(--sky))_0%,rgb(var(--paper))_100%)] pt-[calc(var(--header-h)+env(safe-area-inset-top,0px)+20px)]">
      <div aria-hidden className="kv-drift absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(var(--gold)/0.28),transparent)]" />
      <div className="gutter">
        <div className={cn('wrap grid items-center gap-8 pb-10 pt-4 lg:pb-14', !!aside && 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12')}>
          <div>
            <Breadcrumbs items={breadcrumbs} />
            <p className="eyebrow mt-6 text-brand-deep">{eyebrow}</p>
            <h1 className="mt-3 text-[2.15rem] font-[760] leading-[1.06] text-ink sm:text-[2.8rem] lg:text-[3.1rem]">{title}</h1>
            {lead && <p className="mt-4 max-w-[38rem] text-[1.08rem] leading-[1.65] text-ink-soft sm:text-[1.15rem]">{lead}</p>}
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string
  title: string
  intro?: ReactNode
  className?: string
}) {
  return (
    <FadeUp className={cn('max-w-[42rem]', className)}>
      {eyebrow && <p className="eyebrow text-brand-deep">{eyebrow}</p>}
      <h2 className="mt-2 text-[1.75rem] font-[740] leading-[1.12] text-ink sm:text-[2.1rem]">{title}</h2>
      {intro && <p className="mt-3 text-[1.03rem] leading-relaxed text-ink-soft">{intro}</p>}
    </FadeUp>
  )
}

/** A full-width content band with the shared 1200px column. */
export function Band({
  id,
  children,
  tone = 'white',
  className,
}: {
  id?: string
  children: ReactNode
  tone?: 'white' | 'mist'
  className?: string
}) {
  return (
    <section id={id} className={cn(tone === 'mist' ? 'bg-mist' : 'bg-white', 'py-12 lg:py-16', className)}>
      <div className="gutter">
        <div className="wrap">{children}</div>
      </div>
    </section>
  )
}

export function Faq({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-display text-[1.02rem] font-semibold text-ink transition-colors hover:bg-mist [&::-webkit-details-marker]:hidden">
            {it.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky text-brand transition-transform duration-200 group-open:rotate-45">
              <Plus className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
            </span>
          </summary>
          <p className="px-5 pb-5 pr-14 text-[1rem] leading-relaxed text-ink-soft">{it.a}</p>
        </details>
      ))}
    </div>
  )
}

/** Sticky in-page navigation with a scroll-spy highlight. */
export function SubNav({ label, items }: { label: string; items: Array<{ id: string; label: string }> }) {
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const active = useScrollSpy(ids, 160)
  return (
    <div className="sticky top-[calc(var(--header-h)+env(safe-area-inset-top,0px))] z-40 border-b border-line bg-white/90 backdrop-blur-xl">
      <div className="gutter">
        <nav aria-label={label} className="wrap">
          <ul className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto py-2">
            {items.map((it) => (
              <li key={it.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToSection(it.id, 'h2')}
                  aria-current={active === it.id ? 'location' : undefined}
                  className={cn(
                    'flex h-10 items-center rounded-full px-4 font-display text-[0.93rem] font-semibold transition-colors',
                    active === it.id ? 'bg-ink text-white' : 'text-ink-soft hover:bg-mist hover:text-ink',
                  )}
                >
                  {it.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-[0.82rem] leading-snug text-ink-soft', className)}>{children}</p>
}
