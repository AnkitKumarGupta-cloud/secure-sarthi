import { useMemo } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { PLANS, type PlanId } from '../data/content'
import { img } from '../data/images'
import { PLAN_DETAILS, type OptionItem } from '../data/planPages'
import { PremiumForm, EstimatePanel, usePremiumCalculator } from '../components/calculator/PremiumForm'
import { ButtonLink } from '../components/ui/Button'
import { Band, Faq, Note, PageHero, SectionHeading, SubNav } from '../components/ui/Page'
import { FadeUp, StaggerDiv, StaggerDl, StaggerLi, StaggerOl, StaggerUl } from '../components/ui/Reveal'
import { cn } from '../lib/hooks'
import { Link } from '../lib/router'
import { AnnuityEstimator, MoneyBackSchedule } from './PlanTools'

const NAV = [
  { id: 'plan-benefits', label: 'Benefits' },
  { id: 'plan-how', label: 'How it works' },
  { id: 'plan-options', label: 'Options' },
  { id: 'plan-details', label: 'Details' },
  { id: 'plan-calculator', label: 'Calculator' },
  { id: 'plan-faq', label: 'FAQ' },
]

function OptionCard({ item }: { item: OptionItem }) {
  return (
    <StaggerLi className="kv-lift rounded-2xl border border-line bg-white p-4 shadow-[0_6px_18px_-14px_rgb(var(--ink)/0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-display text-[1.02rem] font-semibold leading-snug text-ink">{item.name}</h4>
        {item.tag && <span className="rounded-full bg-gold/30 px-2.5 py-0.5 text-[0.72rem] font-bold uppercase tracking-[0.06em] text-ink">{item.tag}</span>}
      </div>
      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{item.detail}</p>
    </StaggerLi>
  )
}

function PlanCalculator({ id }: { id: PlanId }) {
  const plan = PLANS.find((p) => p.id === id)!
  const d = PLAN_DETAILS[id]
  const calc = usePremiumCalculator({ plan: plan.calcPlan ?? 'savings', ...d.example.calc })
  return (
    <div className="calc-banner relative isolate overflow-hidden rounded-[30px] p-5 text-white shadow-panel sm:p-8 lg:p-10">
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
        <div>
          <p className="eyebrow text-gold">{d.example.name}</p>
          <h3 className="mt-3 text-[1.7rem] font-[740] leading-tight text-white sm:text-[2rem]">
            What could it cost you?
          </h3>
          <p className="mt-3 max-w-[32rem] text-[1.03rem] leading-relaxed text-white/85">{d.example.text}</p>
          {d.example.closing && <p className="mt-3 max-w-[32rem] text-[1rem] leading-relaxed text-white/75">{d.example.closing}</p>}
          <EstimatePanel calc={calc} className="mt-6 max-w-[30rem]" />
        </div>
        <PremiumForm calc={calc} hidePlanPicker />
      </div>
    </div>
  )
}

export function PlanPage({ id }: { id: PlanId }) {
  const plan = PLANS.find((p) => p.id === id)!
  const d = PLAN_DETAILS[id]
  const related = useMemo(() => d.related.map((r) => PLANS.find((p) => p.id === r)!), [d.related])

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Plans', to: '/plans' }, { label: plan.title }]}
        eyebrow={`${plan.title} · ${d.planNo}`}
        title={d.product}
        lead={d.lead}
        actions={
          <>
            <ButtonLink to={`/plans/${id}?section=calculator`} size="lg" arrow className="kv-sheen">
              {id === 'moneyback' ? 'See the payouts' : id === 'pension' ? 'Estimate my income' : 'Estimate my premium'}
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="outline">
              Ask me about this plan
            </ButtonLink>
          </>
        }
        aside={
          <div className={cn('relative mx-auto aspect-[300/236] w-full max-w-[460px] rounded-[36px] p-6 shadow-card ring-1 ring-ink/[0.05]', plan.tint)}>
            <img src={img(id)} alt="" decoding="async" draggable={false} className="kv-bob h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(11,36,99,0.18)]" />
          </div>
        }
      />

      <div className="gutter bg-white">
        <StaggerDl className="wrap grid grid-cols-2 gap-3 pb-10 pt-1 lg:grid-cols-4">
          {d.facts.map((f) => (
            <StaggerDiv key={f.label} className="kv-lift rounded-2xl border border-line bg-white p-4 shadow-card">
              <dt className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">{f.label}</dt>
              <dd className="mt-1.5 font-display text-[1.25rem] font-[740] leading-tight text-ink">{f.value}</dd>
              {f.note && <dd className="mt-1 text-[0.85rem] leading-snug text-ink-soft">{f.note}</dd>}
            </StaggerDiv>
          ))}
        </StaggerDl>
      </div>

      <SubNav label={`${plan.title} sections`} items={NAV} />

      <Band id="plan-benefits">
        <SectionHeading eyebrow="Why this plan" title="What you get" intro={plan.summary} />
        <StaggerUl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.benefits.map((b) => (
            <StaggerLi key={b.title} className="kv-lift rounded-[22px] border border-line bg-white p-5 shadow-[0_8px_22px_-16px_rgb(var(--ink)/0.4)]">
              <span className={cn('grid h-11 w-11 place-items-center rounded-xl', plan.iconTint)}>
                <b.icon className="h-[22px] w-[22px]" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-[1.1rem] font-semibold leading-snug text-ink">{b.title}</h3>
              <p className="mt-1.5 text-[0.97rem] leading-relaxed text-ink-soft">{b.body}</p>
            </StaggerLi>
          ))}
        </StaggerUl>
      </Band>

      <Band id="plan-how" tone="mist">
        <SectionHeading eyebrow="Step by step" title="How it works" />
        <StaggerOl className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {d.steps.map((s, i) => (
            <StaggerLi key={s.title} className="kv-lift relative rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.04]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-[1.05rem] font-bold text-white">{i + 1}</span>
              <h3 className="mt-4 font-display text-[1.08rem] font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="mt-1.5 text-[0.96rem] leading-relaxed text-ink-soft">{s.body}</p>
            </StaggerLi>
          ))}
        </StaggerOl>
      </Band>

      <Band id="plan-options">
        <SectionHeading eyebrow="Make it yours" title="Your options" />
        <div className="mt-8 space-y-10">
          {d.optionGroups.map((g) => (
            <div key={g.title}>
              <h3 className="font-display text-[1.25rem] font-[700] text-ink">{g.title}</h3>
              {g.intro && <p className="mt-1 text-[0.98rem] text-ink-soft">{g.intro}</p>}
              <StaggerUl className={cn('mt-4 grid gap-3 sm:grid-cols-2', g.items.length % 3 === 0 && 'lg:grid-cols-3')}>
                {g.items.map((it) => (
                  <OptionCard key={it.name} item={it} />
                ))}
              </StaggerUl>
            </div>
          ))}
        </div>
      </Band>

      <Band id="plan-details" tone="mist">
        <SectionHeading eyebrow="The fine print, made readable" title="Plan details" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start">
          <FadeUp>
          <dl className="overflow-hidden rounded-[22px] border border-line bg-white">
            {d.terms.map(([k, v], i) => (
              <div key={k} className={cn('grid gap-1 px-5 py-3.5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-4', i % 2 === 1 && 'bg-mist/60')}>
                <dt className="text-[0.92rem] font-semibold text-ink-soft">{k}</dt>
                <dd className="text-[0.98rem] font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          </FadeUp>

          <FadeUp className="space-y-5" delay={0.1}>
            {d.riders.length > 0 && (
              <div className="rounded-[22px] border border-line bg-white p-5">
                <h3 className="font-display text-[1.12rem] font-semibold text-ink">Optional add-ons (riders)</h3>
                <ul className="mt-3 space-y-4">
                  {d.riders.map((r) => (
                    <li key={r.name}>
                      <p className="font-display font-semibold text-ink">{r.name}</p>
                      <p className="mt-0.5 text-[0.94rem] leading-relaxed text-ink-soft">{r.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[22px] bg-[#e4f6ed] p-5">
                <h3 className="font-display text-[1.05rem] font-semibold text-ink">Suits you if</h3>
                <ul className="mt-3 space-y-2">
                  {d.suits.map((s) => (
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
                  {d.notFor.map((s) => (
                    <li key={s} className="flex gap-2 text-[0.95rem] leading-snug text-ink">
                      <X className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#9a6a00]" strokeWidth={2.6} aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[22px] border border-line bg-white p-5">
            <h3 className="font-display text-[1.12rem] font-semibold text-ink">Tax</h3>
            <div className="mt-2 space-y-2 text-[0.96rem] leading-relaxed text-ink-soft">
              {d.tax.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[22px] border border-line bg-white p-5">
            <h3 className="font-display text-[1.12rem] font-semibold text-ink">Good to know</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-[0.96rem] leading-relaxed text-ink-soft marker:text-brand">
              {d.notes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <Note className="mt-5">
          This page summarises the plan in my own words from public information and may not reflect the latest changes. It is not an offer or a
          quotation. The brochure and policy document issued by LIC are the final authority on benefits, charges and exclusions.
        </Note>
      </Band>

      <Band id="plan-calculator">
        <SectionHeading
          eyebrow={id === 'endowment' || id === 'child' ? 'Try it' : 'Illustration'}
          title={id === 'moneyback' ? 'See what comes back, and when' : id === 'pension' ? 'Estimate your income' : 'Estimate your premium'}
          intro={id === 'moneyback' || id === 'pension' ? d.example.text : undefined}
        />
        <FadeUp className="mt-8">
          {id === 'moneyback' || id === 'pension' ? (
            <div className="rounded-[26px] border border-line bg-mist/70 p-4 sm:p-6">{id === 'moneyback' ? <MoneyBackSchedule /> : <AnnuityEstimator />}</div>
          ) : (
            <PlanCalculator id={id} />
          )}
        </FadeUp>
      </Band>

      <Band id="plan-faq" tone="mist">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
          <SectionHeading eyebrow="Questions" title="Frequently asked" intro="Short answers to what people ask most. For anything else, I am a call away." />
          <Faq items={d.faqs} />
        </div>
      </Band>

      <Band>
        <SectionHeading eyebrow="Keep exploring" title="You may also like" />
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {related.map((p) => (
            <li key={p.id}>
              <Link
                to={`/plans/${p.id}`}
                className={cn('group flex h-full items-center gap-5 rounded-[26px] p-4 pr-5 shadow-card ring-1 ring-ink/[0.05] transition-shadow hover:shadow-lift', p.tint)}
              >
                <img src={img(p.id)} alt="" loading="lazy" decoding="async" draggable={false} className="h-[96px] w-[122px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.05]" />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.12rem] font-[700] leading-tight text-ink">{PLAN_DETAILS[p.id].product}</span>
                  <span className="mt-1 block text-[0.93rem] leading-snug text-ink-soft">{p.short}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 overflow-hidden rounded-[30px] bg-night p-7 text-white sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[1.6rem] font-[740] leading-tight sm:text-[1.9rem]">Not sure this is the right plan?</h2>
              <p className="mt-2 max-w-[34rem] text-white/75">Compare every plan side by side, or talk it through with me. I will explain before I suggest anything.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/plans" variant="outline-light" size="lg">
                Compare all plans
              </ButtonLink>
              <ButtonLink to="/contact" size="lg" arrow>
                Talk to me
              </ButtonLink>
            </div>
          </div>
        </div>
      </Band>
    </>
  )
}
