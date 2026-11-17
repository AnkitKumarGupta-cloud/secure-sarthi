import { ArrowRight, Check, ExternalLink, X } from 'lucide-react'
import { PLANS } from '../data/content'
import { art } from '../data/images'
import { findNamedPlan, namedPlansIn, officialListFor } from '../data/namedPlans'
import { ButtonLink } from '../components/ui/Button'
import { Band, Faq, Note, PageHero, SectionHeading } from '../components/ui/Page'
import { FadeUp, StaggerDiv, StaggerDl, StaggerLi, StaggerOl } from '../components/ui/Reveal'
import { cn } from '../lib/hooks'
import { Link } from '../lib/router'

/** A page for one named LIC plan, such as Jeevan Labh (736). */
export function NamedPlanPage({ slug }: { slug: string }) {
  const p = findNamedPlan(slug)!
  const category = PLANS.find((c) => c.id === p.category)!
  const siblings = namedPlansIn(p.category).filter((s) => s.slug !== slug)

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Plans', to: '/plans' },
          { label: category.title, to: `/plans/${category.id}` },
          { label: p.name.replace('LIC’s ', '') },
        ]}
        eyebrow={`Plan ${p.planNo}${p.oldPlanNo ? ` · earlier ${p.oldPlanNo}` : ''} · ${p.kind}`}
        title={`${p.name} (Plan ${p.planNo})`}
        lead={p.lead}
        actions={
          <>
            <ButtonLink to="/contact" size="lg" arrow className="kv-sheen">
              Get a quote for this plan
            </ButtonLink>
            <ButtonLink to={`/plans/${category.id}`} size="lg" variant="outline">
              Compare with {category.title.toLowerCase()}
            </ButtonLink>
          </>
        }
        aside={
          <div className={cn('relative mx-auto aspect-[300/236] w-full max-w-[420px] rounded-[36px] p-6 shadow-card ring-1 ring-ink/[0.05]', category.tint)}>
            <img {...art(category.id, '(min-width: 1024px) 380px, 80vw')} alt="" draggable={false} className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(11,36,99,0.18)]" />
          </div>
        }
      />

      <div className="gutter bg-white">
        <StaggerDl className="wrap grid grid-cols-2 gap-3 pb-10 pt-1 lg:grid-cols-4">
          {p.facts.map((f) => (
            <StaggerDiv key={f.label} className="kv-lift rounded-2xl border border-line bg-white p-4 shadow-card">
              <dt className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">{f.label}</dt>
              <dd className="mt-1.5 font-display text-[1.25rem] font-[740] leading-tight text-ink">{f.value}</dd>
              {f.note && <dd className="mt-1 text-[0.85rem] leading-snug text-ink-soft">{f.note}</dd>}
            </StaggerDiv>
          ))}
        </StaggerDl>
      </div>

      <Band tone="mist">
        <SectionHeading eyebrow="In plain words" title={`How ${p.name.replace('LIC’s ', '')} works`} />
        <StaggerOl className="mt-8 grid gap-4 md:grid-cols-2">
          {p.how.map((s, i) => (
            <StaggerLi key={s} className="flex gap-4 rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.04]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display font-bold text-white">{i + 1}</span>
              <p className="text-[1rem] leading-relaxed text-ink">{s}</p>
            </StaggerLi>
          ))}
        </StaggerOl>
      </Band>

      <Band>
        <SectionHeading eyebrow="The fine print, made readable" title="Plan details" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start">
          <FadeUp>
            <dl className="overflow-hidden rounded-[22px] border border-line bg-white">
              {p.terms.map(([k, v], i) => (
                <div key={k} className={cn('grid gap-1 px-5 py-3.5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-4', i % 2 === 1 && 'bg-mist/60')}>
                  <dt className="text-[0.92rem] font-semibold text-ink-soft">{k}</dt>
                  <dd className="text-[0.98rem] font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
          <FadeUp className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" delay={0.1}>
            <div className="rounded-[22px] bg-[#e4f6ed] p-5">
              <h3 className="font-display text-[1.05rem] font-semibold text-ink">Suits you if</h3>
              <ul className="mt-3 space-y-2">
                {p.suits.map((s) => (
                  <li key={s} className="flex gap-2 text-[0.95rem] leading-snug text-ink">
                    <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-success" strokeWidth={2.6} aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[22px] bg-pastel-cream p-5">
              <h3 className="font-display text-[1.05rem] font-semibold text-ink">Look elsewhere if</h3>
              <ul className="mt-3 space-y-2">
                {p.notFor.map((s) => (
                  <li key={s} className="flex gap-2 text-[0.95rem] leading-snug text-ink">
                    <X className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#9a6a00]" strokeWidth={2.6} aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
        <Note className="mt-6">
          This page summarises the plan in my own words from LIC’s public information (plan {p.planNo}, UIN {p.uin}). It is not an offer or a
          quotation. The brochure and policy document issued by LIC are the final authority.{' '}
          <a href={officialListFor(p)} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-brand-deep underline underline-offset-2">
            See LIC’s plan list <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </Note>
      </Band>

      <Band tone="mist">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
          <SectionHeading eyebrow="Questions" title={`${p.name.replace('LIC’s ', '')}: frequently asked`} intro="Short answers to what people ask most. For your own numbers, I am a call away." />
          <Faq items={p.faqs} />
        </div>
      </Band>

      <Band>
        <SectionHeading eyebrow="Keep exploring" title={`More ${category.title.toLowerCase()}`} />
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          <li>
            <Link to={`/plans/${category.id}`} className={cn('group flex h-full items-center justify-between gap-4 rounded-[22px] p-5 shadow-card ring-1 ring-ink/[0.05]', category.tint)}>
              <span>
                <span className="block font-display text-[1.08rem] font-[700] text-ink">{category.title}: overview and calculator</span>
                <span className="mt-1 block text-[0.93rem] text-ink-soft">{category.short}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </li>
          {siblings.map((s) => (
            <li key={s.slug}>
              <Link to={`/plans/${s.slug}`} className="group flex h-full items-center justify-between gap-4 rounded-[22px] border border-line bg-white p-5 shadow-card">
                <span>
                  <span className="block font-display text-[1.08rem] font-[700] text-ink">
                    {s.name} ({s.planNo})
                  </span>
                  <span className="mt-1 block text-[0.93rem] text-ink-soft">{s.kind}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Band>
    </>
  )
}

/** List of named plans for a category, shown on category pages and the plans index. */
export function NamedPlanLinks({ category, className }: { category: (typeof PLANS)[number]['id']; className?: string }) {
  const list = namedPlansIn(category)
  if (!list.length) return null
  return (
    <ul className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {list.map((s) => (
        <li key={s.slug}>
          <Link to={`/plans/${s.slug}`} className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-card">
            <span>
              <span className="block font-display text-[1.02rem] font-semibold text-ink">
                {s.name.replace('LIC’s ', '')} · {s.planNo}
              </span>
              <span className="mt-0.5 block text-[0.88rem] leading-snug text-ink-soft">{s.kind}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-ink transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  )
}
