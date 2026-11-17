import { BRAND, SERVICES, VALUES } from '../data/content'
import { ABOUT_STORY, PRINCIPLES } from '../data/siteContent'
import { img } from '../data/images'
import { ButtonLink } from '../components/ui/Button'
import { FadeUp, StaggerLi, StaggerUl } from '../components/ui/Reveal'
import { Band, Note, PageHero, SectionHeading, SubNav } from '../components/ui/Page'

const NAV = [
  { id: 'about-story', label: 'About me' },
  { id: 'about-why', label: 'Why work with me' },
  { id: 'about-principles', label: 'How I work' },
]

export function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow={`About ${BRAND.name}`}
        title="Guidance you can understand, and a person you can call"
        lead="Secure Sarthi is an independent LIC insurance advisory. I help you choose the right plan, and I stay with you for payments, nominations, loans and claims."
        aside={
          <div className="relative mx-auto h-[280px] w-full max-w-[460px] sm:h-[330px]" aria-hidden>
            <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#7fb4f4_0%,#a9cdf8_45%,#e2eefc_100%)] sm:h-[330px] sm:w-[330px]" />
            <img src={img('building')} alt="" decoding="async" draggable={false} className="absolute bottom-0 left-1/2 w-[360px] max-w-none -translate-x-1/2 sm:w-[400px]" />
          </div>
        }
      />
      <SubNav label="About sections" items={NAV} />

      <Band id="about-story">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <SectionHeading eyebrow="About me" title="Advice first, sales second" />
            <div className="mt-5 space-y-4 text-[1.04rem] leading-relaxed text-ink-soft">
              {ABOUT_STORY.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-[1.2rem] font-[700] text-ink">What I help with</h3>
            <StaggerUl className="mt-4 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((sv) => (
                <StaggerLi key={sv.title} className="kv-lift flex gap-3 rounded-2xl bg-mist p-4">
                  <sv.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <span className="font-display font-semibold leading-snug text-ink">{sv.title}</span>
                </StaggerLi>
              ))}
            </StaggerUl>
          </div>
        </div>
      </Band>

      <Band id="about-why" tone="mist">
        <SectionHeading eyebrow="Why work with me" title="One person, start to finish" />
        <StaggerUl className="mt-8 grid gap-3 md:grid-cols-3">
          {VALUES.map((v) => (
            <StaggerLi key={v.title} className="kv-lift rounded-[22px] border border-line bg-white p-5">
              <v.icon className="h-6 w-6 text-brand" aria-hidden />
              <p className="mt-3 font-display font-semibold text-ink">{v.title}</p>
              <p className="mt-1 text-[0.95rem] leading-snug text-ink-soft">{v.body}</p>
            </StaggerLi>
          ))}
        </StaggerUl>
        <Note className="mt-4">{BRAND.disclaimer}</Note>
      </Band>

      <Band id="about-principles">
        <SectionHeading eyebrow="How I work" title="Six promises I hold myself to" />
        <StaggerUl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <StaggerLi key={p.title} className="kv-lift rounded-[22px] border border-line bg-white p-5 shadow-[0_8px_22px_-16px_rgb(var(--ink)/0.4)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-brand">
                <p.icon className="h-[22px] w-[22px]" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-[1.08rem] font-semibold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-[0.96rem] leading-relaxed text-ink-soft">{p.body}</p>
            </StaggerLi>
          ))}
        </StaggerUl>
        <FadeUp className="mt-10 flex flex-col gap-4 rounded-[28px] bg-sky p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[1.5rem] font-[740] text-ink">Want to talk it through?</h2>
            <p className="mt-1 text-ink-soft">I will explain your options before suggesting anything.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/plans" variant="outline" size="lg">
              See our plans
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" arrow>
              Talk to me
            </ButtonLink>
          </div>
        </FadeUp>
      </Band>
    </>
  )
}
