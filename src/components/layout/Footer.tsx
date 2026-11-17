import type { ReactNode } from 'react'
import { Copy, PhoneCall } from 'lucide-react'
import { BRAND, CLAIM_TOPICS, LEGAL_DOCS, PLANS, type LegalDocId } from '../../data/content'
import { Link } from '../../lib/router'
import { PLAN_DETAILS } from '../../data/planPages'
import { useUI } from '../../state/ui'
import { Logo } from '../ui/Logo'

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-gold">{title}</h3>
      <ul className="mt-4 space-y-1">{children}</ul>
    </div>
  )
}

function FLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <li>
      <Link to={to} className="inline-flex min-h-[36px] items-center text-left text-[0.95rem] text-white/75 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  )
}

export function Footer() {
  const { toast } = useUI()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.email)
      toast('Email address copied')
    } catch {
      const el = document.getElementById('footer-email')
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
      toast('Address selected. Press Ctrl+C or ⌘C to copy.')
    }
  }

  return (
    <footer className="bg-night pb-16 text-white sm:pb-0">
      <div className="gutter">
        <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,0.9fr))_minmax(0,1.25fr)] lg:gap-8">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-[22rem] text-[0.95rem] leading-relaxed text-white/70">
              {BRAND.descriptor}. Guidance on LIC plans before you buy, and support for as long as you hold the policy.
            </p>
          </div>

          <Col title="Quick links">
            <FLink to="/">Home</FLink>
            <FLink to="/plans">All plans</FLink>
            <FLink to="/?section=calculator">Premium Calculator</FLink>
            <FLink to="/about">About me</FLink>
            <FLink to="/?section=services">Services</FLink>
            <FLink to="/contact">Contact</FLink>
          </Col>

          <Col title="Plans">
            {PLANS.map((p) => (
              <FLink key={p.id} to={`/plans/${p.id}`}>
                {PLAN_DETAILS[p.id].product}
              </FLink>
            ))}
          </Col>

          <Col title="Claims">
            {CLAIM_TOPICS.map((t) => (
              <FLink key={t.id} to={`/claims/${t.id}`}>
                {t.title}
              </FLink>
            ))}
          </Col>

          <div>
            <h3 className="font-display text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-gold">Contact</h3>
            <p className="mt-4 text-[0.85rem] text-white/60">Phone and WhatsApp</p>
            <a href={BRAND.phoneHref} className="mt-1 inline-block text-[1rem] font-semibold text-white hover:underline">
              {BRAND.phone}
            </a>
            <p className="mt-3 text-[0.85rem] text-white/60">Email</p>
            <div className="mt-1 flex items-center gap-2">
              <a id="footer-email" href={`mailto:${BRAND.email}`} className="text-[0.94rem] text-white [overflow-wrap:anywhere] hover:underline">
                {BRAND.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Copy email address"
              >
                <Copy className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <Link
              to="/contact"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-gold px-4 font-display text-[0.92rem] font-semibold text-ink transition hover:bg-[#ffd23d]"
            >
              <PhoneCall className="h-4 w-4" aria-hidden />
              Talk to me
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="gutter">
          <div className="wrap flex flex-col gap-4 py-6 text-[0.85rem] text-white/60 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[46rem]">
              © 2026 {BRAND.name}. {BRAND.disclaimer}
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {(Object.keys(LEGAL_DOCS) as LegalDocId[]).map((id) => (
                  <li key={id}>
                    <Link to={`/legal/${id}`} className="inline-flex min-h-[32px] items-center transition-colors hover:text-white">
                      {LEGAL_DOCS[id].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
