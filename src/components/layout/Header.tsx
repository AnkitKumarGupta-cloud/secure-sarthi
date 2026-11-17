import { useEffect, useState } from 'react'
import { ArrowRight, Menu, Phone, Search } from 'lucide-react'
import { ABOUT_LINKS, BRAND, CLAIM_TOPICS, PLANS } from '../../data/content'
import { cn, useScrolled, useScrollSpy } from '../../lib/hooks'
import { Link, useRouter } from '../../lib/router'
import { useUI } from '../../state/ui'
import { Logo } from '../ui/Logo'
import { ActiveBar, MenuItem, NavMenu } from './NavMenu'
import { MobileMenu } from './MobileMenu'

type MenuId = 'products' | 'claims' | 'about'
const SECTIONS = ['top', 'products', 'calculator', 'about', 'services']
const SECTION_TO_NAV: Record<string, string> = {
  top: 'home',
  products: 'products',
  calculator: 'calculator',
  about: 'about',
  services: 'about',
}

export function Header() {
  const scrolled = useScrolled(12)
  const section = useScrollSpy(SECTIONS)
  const { route } = useRouter()
  const activeNav =
    route.name === 'home'
      ? (SECTION_TO_NAV[section] ?? 'home')
      : route.name === 'plans' || route.name === 'plan'
        ? 'products'
        : route.name === 'claims'
          ? 'claims'
          : route.name === 'about'
            ? 'about'
            : route.name === 'contact'
              ? 'contact'
              : ''
  const [menu, setMenu] = useState<MenuId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setSearchOpen } = useUI()

  const setOpen = (id: MenuId) => (open: boolean) => setMenu((cur) => (open ? id : cur === id ? null : cur))
  const close = () => setMenu(null)

  // "/" or Ctrl/Cmd + K opens search, unless the visitor is typing somewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      const typing = t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSearchOpen])

  const link = (id: string, label: string, to: string) => (
    <Link
      to={to}
      aria-current={activeNav === id ? (id === 'home' ? 'page' : 'location') : undefined}
      className={cn(
        'relative flex h-11 items-center rounded-full px-3 font-display text-[0.97rem] font-semibold transition-colors',
        activeNav === id ? 'text-ink' : 'text-ink/80 hover:text-ink',
      )}
    >
      {label}
      {activeNav === id && <ActiveBar />}
    </Link>
  )

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,box-shadow,border-color] duration-300',
          scrolled
            ? 'border-b border-line/70 bg-white/85 shadow-[0_8px_30px_-18px_rgb(var(--ink)/0.35)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="gutter">
          <div className="wrap flex h-[var(--header-h)] items-center gap-4">
            <Link to="/" className="shrink-0 rounded-xl" aria-label="Secure Sarthi, home">
              <Logo />
            </Link>

            <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 lg:flex xl:gap-1.5">
              {link('home', 'Home', '/')}
              <NavMenu
                id="nav-products"
                label="Products"
                active={activeNav === 'products'}
                open={menu === 'products'}
                onOpenChange={setOpen('products')}
                panelClassName="w-[560px]"
              >
                <div className="grid grid-cols-2 gap-1">
                  {PLANS.map((p) => (
                    <MenuItem
                      key={p.id}
                      icon={
                        <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', p.iconTint)}>
                          <p.icon className="h-5 w-5" aria-hidden />
                        </span>
                      }
                      title={p.title}
                      blurb={p.short}
                      to={`/plans/${p.id}`}
                      onSelect={close}
                    />
                  ))}
                  <MenuItem
                    icon={
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/25 text-ink">
                        <ArrowRight className="h-5 w-5" aria-hidden />
                      </span>
                    }
                    title="Compare all plans"
                    blurb="Side by side, with who each suits"
                    to="/plans"
                    onSelect={close}
                  />
                </div>
              </NavMenu>
              {link('calculator', 'Premium Calculator', '/?section=calculator')}
              <NavMenu
                id="nav-claims"
                label="Claims"
                active={activeNav === 'claims'}
                open={menu === 'claims'}
                onOpenChange={setOpen('claims')}
                panelClassName="w-[340px]"
              >
                {CLAIM_TOPICS.map((t) => (
                  <MenuItem
                    key={t.id}
                    icon={
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-brand">
                        <t.icon className="h-5 w-5" aria-hidden />
                      </span>
                    }
                    title={t.title}
                    blurb={t.blurb}
                    to={`/claims/${t.id}`}
                    onSelect={close}
                  />
                ))}
              </NavMenu>
              <NavMenu
                id="nav-about"
                label="About"
                active={activeNav === 'about'}
                open={menu === 'about'}
                onOpenChange={setOpen('about')}
                panelClassName="w-[320px]"
              >
                {ABOUT_LINKS.map((a) => (
                  <MenuItem
                    key={a.id}
                    icon={
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-brand">
                        <a.icon className="h-5 w-5" aria-hidden />
                      </span>
                    }
                    title={a.title}
                    blurb={a.blurb}
                    to={a.to}
                    onSelect={close}
                  />
                ))}
              </NavMenu>
              {link('contact', 'Contact', '/contact')}
            </nav>

            <div className="ml-auto flex items-center gap-1.5 lg:ml-4 xl:ml-8">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-ink/[0.06]"
                aria-label="Search the site"
                aria-keyshortcuts="/ Control+K"
              >
                <Search className="h-[21px] w-[21px]" strokeWidth={2.3} aria-hidden />
              </button>
              <a
                href={BRAND.phoneHref}
                className="hidden h-11 items-center gap-2 rounded-full bg-ink px-5 font-display text-[0.95rem] font-semibold text-white shadow-[0_10px_22px_-12px_rgb(var(--ink)/0.85)] transition hover:-translate-y-px hover:bg-brand-deep sm:flex"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call me
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-ink/[0.06] lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" strokeWidth={2.2} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
