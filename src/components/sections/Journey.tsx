import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, Scale, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../ui/Page'
import { StaggerLi, StaggerOl } from '../ui/Reveal'

const STEPS = [
  { icon: MessageCircle, title: 'We talk', body: 'A short call about your family, your goals and your budget. No pressure.' },
  { icon: Scale, title: 'We compare', body: 'I show the LIC plans that fit, and explain what each one does and costs.' },
  { icon: CheckCircle2, title: 'You apply', body: 'I help with the form and documents so nothing is missed or misstated.' },
  { icon: ShieldCheck, title: 'I stay with you', body: 'Reminders, nominations, loans, revival and claims. I am a call away.' },
]

export function Journey() {
  return (
    <section id="journey" aria-label="Your journey with me" className="bg-mist py-14 lg:py-20">
      <div className="gutter">
        <div className="wrap">
          <SectionHeading eyebrow="How it works" title="Your journey with me" />
          <div className="relative mt-10">
            {/* the line draws itself as the section scrolls into view */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-brand via-gold to-gold-deep lg:block"
            />
            <StaggerOl className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <StaggerLi key={s.title} className="relative text-center lg:px-2">
                  <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-[0_12px_24px_-12px_rgb(var(--ink)/0.8)] ring-[6px] ring-mist">
                    <s.icon className="h-6 w-6" aria-hidden />
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold font-display text-[0.8rem] font-bold text-ink">{i + 1}</span>
                  </span>
                  <h3 className="mt-4 font-display text-[1.12rem] font-semibold text-ink">{s.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-[16rem] text-[0.96rem] leading-relaxed text-ink-soft">{s.body}</p>
                </StaggerLi>
              ))}
            </StaggerOl>
          </div>
        </div>
      </div>
    </section>
  )
}
