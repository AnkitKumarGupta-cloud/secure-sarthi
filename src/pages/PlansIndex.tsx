import { ArrowRight } from 'lucide-react'
import { PLANS } from '../data/content'
import { img } from '../data/images'
import { GOALS, PLAN_DETAILS } from '../data/planPages'
import { ButtonLink } from '../components/ui/Button'
import { Band, Note, PageHero, SectionHeading } from '../components/ui/Page'
import { cn } from '../lib/hooks'
import { FadeUp, StaggerLi, StaggerUl } from '../components/ui/Reveal'

import { Link } from '../lib/router'

const ROWS: Array<{ label: string; get: (i: number) => string }> = [
  { label: 'Best for', get: (i) => PLANS[i].goodFor },
  { label: 'Entry age', get: (i) => PLANS[i].entryAge },
  { label: 'Policy term', get: (i) => PLANS[i].term },
  { label: 'Pays out', get: (i) => PLAN_DETAILS[PLANS[i].id].compare.pays },
  { label: 'At the end', get: (i) => PLAN_DETAILS[PLANS[i].id].compare.maturity },
  { label: 'Growth', get: (i) => PLAN_DETAILS[PLANS[i].id].compare.growth },
  { label: 'Risk to your money', get: (i) => PLAN_DETAILS[PLANS[i].id].compare.risk },
  { label: 'Life cover', get: (i) => PLAN_DETAILS[PLANS[i].id].compare.cover },
]

export function PlansIndex() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Plans' }]}
        eyebrow="Our products"
        title="Find the plan that fits your goal"
        lead="Four LIC plans, one for each stage of life. Start with what you want to achieve, or compare them side by side."
      />

      <Band className="!pt-4">
        <SectionHeading title="What do you want to do?" />
        <StaggerUl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((g) => {
            const plan = PLANS.find((p) => p.id === g.plan)!
            return (
              <StaggerLi key={g.goal}>
                <Link
                  to={`/plans/${g.plan}`}
                  className="kv-lift group flex h-full flex-col justify-between gap-4 rounded-[22px] border border-line bg-white p-4 shadow-[0_8px_22px_-16px_rgb(var(--ink)/0.4)] transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift"
                >
                  <span className={cn('grid h-11 w-11 place-items-center rounded-xl', plan.iconTint)}>
                    <plan.icon className="h-[22px] w-[22px]" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-[1.02rem] font-semibold leading-snug text-ink">{g.goal}</span>
                    <span className="mt-1 flex items-center gap-1 text-[0.9rem] font-semibold text-brand">
                      {plan.title}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </Link>
              </StaggerLi>
            )
          })}
        </StaggerUl>
      </Band>

      <Band tone="mist">
        <SectionHeading eyebrow="Plan by plan" title="Explore each plan" />
        <StaggerUl className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((p) => (
            <StaggerLi key={p.id} className="flex">
              <article className={cn('kv-lift flex w-full flex-col rounded-[28px] p-5 shadow-card ring-1 ring-ink/[0.05]', p.tint)}>
                <div className="relative aspect-[300/236] w-full">
                  <img src={img(p.id)} alt="" loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-contain" />
                </div>
                <h3 className="mt-3 font-display text-[1.25rem] font-[740] leading-tight text-ink">{PLAN_DETAILS[p.id].product}</h3>
                <p className="text-[0.88rem] font-semibold text-brand-deep">
                  {p.title} · {PLAN_DETAILS[p.id].planNo}
                </p>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">{p.summary}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-ink/10 pt-4 text-[0.88rem]">
                  <div>
                    <dt className="text-ink-soft">Entry age</dt>
                    <dd className="font-semibold text-ink">{p.entryAge}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-soft">Term</dt>
                    <dd className="font-semibold text-ink">{p.term}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-5">
                  <ButtonLink to={`/plans/${p.id}`} variant="navy" arrow aria-label={`View ${PLAN_DETAILS[p.id].product}`}>
                    View plan
                  </ButtonLink>
                </div>
              </article>
            </StaggerLi>
          ))}
          <StaggerLi className="flex md:col-span-2 xl:col-span-2">
            <div className="flex w-full flex-col justify-center rounded-[28px] bg-night p-7 text-white shadow-card">
              <h3 className="font-display text-[1.5rem] font-[740] leading-tight">Not sure which plan fits?</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-white/75">
                I will ask about your family, your goals and your budget, and explain your options before suggesting anything.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to="/contact" arrow>
                  Talk to me
                </ButtonLink>
              </div>
            </div>
          </StaggerLi>
        </StaggerUl>
      </Band>

      <Band>
        <SectionHeading eyebrow="Side by side" title="Compare all plans" intro="The same questions, answered for each plan. Scroll sideways on a small screen." />
        <FadeUp className="mt-8 overflow-x-auto rounded-[22px] border border-line" >
        <div tabIndex={0} role="region" aria-label="Plan comparison table">
          <table className="w-full min-w-[820px] border-collapse text-left text-[0.95rem]">
            <caption className="sr-only">Comparison of the four LIC plans I advise on</caption>
            <thead>
              <tr className="bg-mist">
                <td className="w-[150px] p-4" />
                {PLANS.map((p) => (
                  <th key={p.id} scope="col" className="p-4 align-bottom">
                    <Link to={`/plans/${p.id}`} className="font-display text-[1.02rem] font-[700] leading-tight text-ink underline-offset-2 hover:text-brand hover:underline">
                      {p.title}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-t border-line align-top">
                  <th scope="row" className="p-4 text-[0.88rem] font-semibold text-ink-soft">
                    {r.label}
                  </th>
                  {PLANS.map((p, i) => (
                    <td key={p.id} className="p-4 leading-snug text-ink">
                      {r.get(i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </FadeUp>
        <Note className="mt-4">Summarised from public information and may not reflect the latest changes. The LIC brochure and policy document are the final authority.</Note>
      </Band>
    </>
  )
}
