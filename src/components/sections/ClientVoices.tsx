import { Quote } from 'lucide-react'
import { BRAND } from '../../data/content'
import { TESTIMONIALS } from '../../data/siteContent'
import { SectionHeading } from '../ui/Page'
import { StaggerLi, StaggerUl } from '../ui/Reveal'

export function ClientVoices() {
  const has = TESTIMONIALS.length > 0
  return (
    <section id="clients" aria-labelledby="clients-title" className="bg-mist py-14 lg:py-16">
      <div className="gutter">
        <div className="wrap">
          <SectionHeading
            eyebrow="Client words"
            title={has ? 'What my clients say' : 'Already a client? Tell me how it went'}
            intro={has ? undefined : 'I only show real words from real clients, and only with their permission. If I have helped you, I would be glad to hear from you.'}
          />
          {has ? (
            <StaggerUl className="mt-8 grid gap-4 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <StaggerLi key={t.name} className="rounded-[22px] border border-line bg-white p-6">
                  <Quote className="h-6 w-6 text-gold-deep" aria-hidden />
                  <blockquote className="mt-3 text-[1rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
                  <p className="mt-4 font-display text-[0.95rem] font-semibold text-ink">
                    {t.name}
                    {t.place && <span className="font-normal text-ink-soft">, {t.place}</span>}
                  </p>
                </StaggerLi>
              ))}
            </StaggerUl>
          ) : (
            <a
              href={`${BRAND.whatsapp}?text=${encodeURIComponent('Hi, I would like to share my experience as a client.')}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-[52px] items-center rounded-full bg-ink px-6 font-display font-semibold text-white transition hover:bg-brand-deep"
            >
              Share your experience on WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
