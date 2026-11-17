import { CheckCircle2, MessageCircle, Phone, ScrollText } from 'lucide-react'
import { BRAND, CLAIM_DOCUMENTS, CLAIM_STEPS } from '../data/content'
import { CLAIM_EXTRA_DOCUMENTS, CLAIM_FAQS, CLAIM_PROMISES, STATUS_HELP } from '../data/siteContent'
import { ButtonLink } from '../components/ui/Button'
import { StaggerLi, StaggerOl, StaggerUl } from '../components/ui/Reveal'
import { Band, Faq, PageHero, SectionHeading, SubNav } from '../components/ui/Page'

const NAV = [
  { id: 'claim-process', label: 'How to claim' },
  { id: 'claim-documents', label: 'Documents' },
  { id: 'claim-track', label: 'Claim status' },
  { id: 'claim-faq', label: 'FAQ' },
]

function StatusHelp() {
  return (
    <div className="rounded-[26px] border border-line bg-white p-5 shadow-card sm:p-7">
      <h3 className="font-display text-[1.2rem] font-semibold text-ink">Keep these ready</h3>
      <ul className="mt-3 space-y-2">
        {STATUS_HELP.map((t) => (
          <li key={t} className="flex gap-2 text-[0.98rem] leading-snug text-ink">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={BRAND.phoneHref}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-display font-semibold text-white transition hover:bg-brand-deep"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call {BRAND.phone}
        </a>
        <a
          href={BRAND.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/20 px-6 font-display font-semibold text-ink transition hover:border-ink/45"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </a>
      </div>
    </div>
  )
}

export function ClaimsPage() {
  const groups = [...CLAIM_DOCUMENTS, ...CLAIM_EXTRA_DOCUMENTS]
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Claims' }]}
        eyebrow="Claims"
        title="When you need it most, I help you through"
        lead="A claim is the moment a policy proves its worth. Here is what happens, what to keep ready and how I help you through it, even if I was not your original agent."
        actions={
          <>
            <ButtonLink to="/claims/process" size="lg" arrow>
              How to make a claim
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="outline">
              Talk to me about a claim
            </ButtonLink>
          </>
        }
      />
      <SubNav label="Claims sections" items={NAV} />

      <Band id="claim-process">
        <SectionHeading eyebrow="Four steps" title="How to make a claim" intro="From first call to money in the claimant’s account." />
        <StaggerOl className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CLAIM_STEPS.map((s, i) => (
            <StaggerLi key={s.title} className="kv-lift rounded-[22px] bg-white p-5 shadow-card ring-1 ring-ink/[0.05]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-[1.05rem] font-bold text-white">{i + 1}</span>
              <h3 className="mt-4 font-display text-[1.1rem] font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-[0.96rem] leading-relaxed text-ink-soft">{s.body}</p>
            </StaggerLi>
          ))}
        </StaggerOl>
        <StaggerUl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CLAIM_PROMISES.map((p) => (
            <StaggerLi key={p.title} className="flex gap-3 rounded-2xl bg-mist p-4">
              <p.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="font-display font-semibold leading-snug text-ink">{p.title}</p>
                <p className="mt-1 text-[0.9rem] leading-snug text-ink-soft">{p.body}</p>
              </div>
            </StaggerLi>
          ))}
        </StaggerUl>
      </Band>

      <Band id="claim-documents" tone="mist">
        <SectionHeading eyebrow="Be prepared" title="Documents checklist" intro="Keep these ready for the claim type that applies. Sending everything at once is the fastest route to a decision." />
        <StaggerUl className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <StaggerLi key={g.heading} className="kv-lift rounded-[22px] border border-line bg-white p-5">
              <section aria-label={g.heading}>
              <h3 className="flex items-center gap-2 font-display text-[1.08rem] font-semibold text-ink">
                <ScrollText className="h-5 w-5 text-brand" aria-hidden />
                {g.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[0.94rem] leading-snug text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              </section>
            </StaggerLi>
          ))}
        </StaggerUl>
      </Band>

      <Band id="claim-track">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-start lg:gap-12">
          <SectionHeading eyebrow="Stay informed" title="Where does my claim stand?" intro="Call or message me with these details and I will check with the branch and tell you the status." />
          <StatusHelp />
        </div>
      </Band>

      <Band id="claim-faq" tone="mist">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
          <SectionHeading eyebrow="Questions" title="Claims, answered" />
          <Faq items={CLAIM_FAQS} />
        </div>
      </Band>
    </>
  )
}
