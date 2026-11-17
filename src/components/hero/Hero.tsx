import type { PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { BRAND, HERO_POINTS } from '../../data/content'
import { scrollToSection } from '../../lib/hooks'
import { Button } from '../ui/Button'
import { HeroBackdrop } from './HeroBackdrop'
import { HeroStage } from './HeroStage'

const intro = {
  hidden: { y: 18 },
  shown: (i: number) => ({ y: 0, transition: { delay: 0.08 * i, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }),
}

export function Hero() {
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 })
  const py = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 })

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 2 - 1
    const y = ((e.clientY - r.top) / r.height) * 2 - 1
    rawX.set(x)
    rawY.set(y)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+env(safe-area-inset-top,0px))]"
    >
      <HeroBackdrop px={px} py={py} />
      <div className="gutter">
        <div className="wrap grid items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)] lg:gap-4">
          <motion.div initial="hidden" animate="shown" className="relative z-20 pb-4 pt-9 sm:pt-14 lg:pb-16 lg:pt-10">
            <motion.p custom={0} variants={intro} className="eyebrow text-brand-deep">
              Independent LIC Insurance Advisory
            </motion.p>
            <motion.h1
              custom={1}
              variants={intro}
              id="hero-title"
              className="mt-4 text-[2.5rem] font-[760] leading-[1.04] text-ink min-[400px]:text-[2.75rem] sm:text-[3.3rem] lg:text-[3.15rem] xl:text-[3.45rem]"
            >
              LIC Insurance Advice <span className="sm:block">for a Brighter Future</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={intro}
              className="mt-5 max-w-[31rem] text-[1.08rem] leading-[1.6] text-ink-soft sm:text-[1.16rem]"
            >
              With {BRAND.name}, you get an authorized LIC agent who explains your options, helps you choose and stays with you long after the policy is issued.
            </motion.p>
            <motion.div custom={3} variants={intro} className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" arrow onClick={() => scrollToSection('products', 'h2')}>
                Explore Our Plans
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('calculator', '#calc-age')}>
                Estimate Premium
              </Button>
            </motion.div>
            <motion.ul
              custom={4}
              variants={intro}
              className="mt-8 grid max-w-[34rem] md:max-w-[41rem] grid-cols-3 divide-x divide-ink/10 rounded-2xl bg-white/85 py-3 shadow-card ring-1 ring-ink/[0.06] backdrop-blur-md sm:mt-10 sm:py-3.5"
              aria-label="Why Secure Sarthi"
            >
              {HERO_POINTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:justify-center sm:gap-3 sm:px-5 sm:text-left"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white shadow-[0_6px_14px_-6px_rgb(var(--ink)/0.6)]">
                    <Icon className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                  </span>
                  <span className="text-[0.84rem] font-semibold leading-tight text-ink sm:text-[0.9rem] md:whitespace-nowrap">{label}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="relative -mx-4 h-[360px] min-[400px]:h-[390px] sm:mx-0 sm:h-[460px] lg:h-[560px]">
            <HeroStage px={px} py={py} />
            <p className="pointer-events-none absolute bottom-[2%] left-1/2 z-20 -translate-x-1/2 w-max max-w-[94%] rounded-full bg-white/85 px-5 py-1.5 text-center font-script text-[1rem] leading-tight text-ink shadow-card ring-1 ring-ink/[0.06] backdrop-blur-sm sm:text-[1.3rem]">
              {BRAND.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
