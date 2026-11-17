import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from '../../lib/router'
import { PLANS, type Plan } from '../../data/content'
import { cn } from '../../lib/hooks'
import { img } from '../../data/images'
import { ButtonLink } from '../ui/Button'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { TiltCard } from '../ui/TiltCard'

const chip = (a: string) =>
  a.startsWith('Child aged') ? 'Child 30 days to 13 yrs' : a.endsWith('and above') ? `Age ${a.replace(' years and above', '+')}` : `Ages ${a.replace(' years', '')}`

function Illustration({ plan }: { plan: Plan }) {
  return (
    <img
      src={img(plan.id)}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.05]"
    />
  )
}

function ProductCard({ plan }: { plan: Plan }) {
  return (
    <motion.li variants={staggerChild} className="snap-start sm:w-[232px] sm:shrink-0 lg:w-auto">
      <TiltCard
        className={cn(
          'group flex h-full items-center gap-4 rounded-[26px] p-3 pr-4 shadow-card ring-1 ring-ink/[0.05] transition-shadow duration-300 hover:shadow-lift sm:flex-col sm:items-stretch sm:gap-0 sm:p-4 xl:p-3.5',
          'bg-mist',
        )}
      >
        <div
          className="relative aspect-[300/236] w-[128px] shrink-0 sm:w-full"
          style={{ transform: 'translateZ(34px)' }}
        >
          <Illustration plan={plan} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col sm:mt-3">
          <h3 className="font-display text-[1.06rem] font-[700] leading-tight text-ink lg:text-[1.02rem] xl:text-[1.04rem]">{plan.title}</h3>
          <p className="mt-1 text-[0.92rem] leading-snug text-ink-soft">{plan.short}</p>
          <p className="mt-2 inline-flex self-start rounded-full bg-white px-2.5 py-1 text-[0.76rem] font-semibold text-brand-deep ring-1 ring-ink/10">{chip(plan.entryAge)}</p>
          <Link
            to={`/plans/${plan.id}`}
            aria-label={`Learn about ${plan.title}`}
            className="mt-3 self-start rounded-full after:absolute after:inset-0 after:rounded-[26px] after:content-[''] sm:mt-auto sm:pt-4"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white shadow-[0_6px_14px_-6px_rgb(var(--ink)/0.7)] transition-[background-color,transform] duration-200 group-hover:translate-x-0.5 group-hover:bg-brand">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
            </span>
          </Link>
        </div>
      </TiltCard>
    </motion.li>
  )
}

export function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="relative bg-white pb-16 pt-10 lg:pb-20 lg:pt-12">
      <div className="gutter">
        <div className="wrap grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-center xl:gap-9">
          <Reveal>
            <p className="eyebrow text-brand-deep">Our products</p>
            <h2 id="products-title" className="mt-3 text-[2rem] font-[740] leading-[1.12] text-ink sm:text-[2.3rem] xl:text-[1.62rem]">
              Insurance Solutions for Every Stage of Life
            </h2>
            <p className="mt-4 max-w-[34rem] text-[1.02rem] leading-relaxed text-ink-soft">
              An LIC plan for every stage of life. I help you pick the right one.
            </p>
            <ButtonLink to="/plans" variant="outline" size="md" arrow className="mt-6">
              View All Products
            </ButtonLink>
          </Reveal>

          <motion.ul
            variants={staggerParent}
            initial="rest"
            whileInView="shown"
            viewport={{ once: true, amount: 0.15 }}
            aria-label="Insurance plans"
            className="grid gap-3 sm:-mx-6 sm:flex sm:snap-x sm:snap-mandatory sm:gap-4 sm:overflow-x-auto sm:px-6 sm:py-3 sm:[scroll-padding-inline:24px] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:py-2 no-scrollbar"
          >
            {PLANS.map((plan) => (
              <ProductCard key={plan.id} plan={plan} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
