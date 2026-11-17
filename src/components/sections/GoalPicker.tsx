import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PLANS } from '../../data/content'
import { GOAL_TABS } from '../../data/siteContent'
import { Link } from '../../lib/router'
import { cn } from '../../lib/hooks'
import { FadeUp } from '../ui/Reveal'

export function GoalPicker() {
  const [active, setActive] = useState(GOAL_TABS[0].id)
  const tab = GOAL_TABS.find((t) => t.id === active) ?? GOAL_TABS[0]
  const plans = tab.plans.map((id) => PLANS.find((p) => p.id === id)!).filter(Boolean)
  return (
    <section id="goals" aria-labelledby="goals-title" className="bg-white pb-6 pt-14 lg:pt-16">
      <div className="gutter">
        <div className="wrap">
          <FadeUp className="max-w-[40rem]">
            <p className="eyebrow text-brand-deep">Start with your goal</p>
            <h2 id="goals-title" className="mt-3 text-[2rem] font-[740] leading-[1.1] text-ink sm:text-[2.3rem]">
              What do you want to do?
            </h2>
          </FadeUp>
          <div role="tablist" aria-label="Your goal" className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
            {GOAL_TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`goal-tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls="goal-panel"
                onClick={() => setActive(t.id)}
                className={cn(
                  'h-11 shrink-0 rounded-full border px-5 font-display text-[0.95rem] font-semibold transition-colors',
                  active === t.id ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft hover:border-ink/40 hover:text-ink',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div id="goal-panel" role="tabpanel" aria-labelledby={`goal-tab-${tab.id}`} className="mt-5 rounded-[26px] bg-mist p-5 sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={tab.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <p className="max-w-[40rem] text-[1.05rem] leading-relaxed text-ink">{tab.line}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {plans.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/plans/${p.id}`}
                        className="kv-lift group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-4"
                      >
                        <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', p.iconTint)}>
                          <p.icon className="h-[22px] w-[22px]" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[1.05rem] font-semibold text-ink">{p.title}</span>
                          <span className="mt-0.5 block text-[0.93rem] leading-snug text-ink-soft">{p.short}</span>
                        </span>
                        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
