import { motion } from 'framer-motion'
import { SERVICES } from '../../data/content'
import { BRAND } from '../../data/content'
import { ButtonLink } from '../ui/Button'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-white pb-20 pt-8 lg:pb-24">
      <div className="gutter">
        <div className="wrap">
          <Reveal className="max-w-[40rem]">
            <p className="eyebrow text-brand-deep">How I can help</p>
            <h2 id="services-title" className="mt-3 text-[2rem] font-[740] leading-[1.1] text-ink sm:text-[2.3rem]">
              Support before you buy, and after
            </h2>
            <p className="mt-3 text-[1.03rem] leading-relaxed text-ink-soft">
              Buying is the start. I look after the rest.
            </p>
          </Reveal>
          <motion.ul
            variants={staggerParent}
            initial="rest"
            whileInView="shown"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SERVICES.map((s) => (
              <motion.li key={s.title} variants={staggerChild} className="rounded-[22px] border border-line bg-white p-5 shadow-[0_8px_22px_-16px_rgb(var(--ink)/0.4)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-brand">
                  <s.icon className="h-[22px] w-[22px]" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[1.08rem] font-semibold leading-snug text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{s.body}</p>
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink to="/contact" size="lg" arrow>
              Talk to me
            </ButtonLink>
            <a
              href={BRAND.phoneHref}
              className="inline-flex h-[52px] items-center rounded-full border border-ink/20 px-6 font-display font-semibold text-ink transition hover:border-ink/45"
            >
              Call {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
