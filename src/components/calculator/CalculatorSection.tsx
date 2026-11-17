import { useRef, useState } from 'react'
import { img } from '../../data/images'
import { cn } from '../../lib/hooks'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { EstimatePanel, PremiumForm, usePremiumCalculator } from './PremiumForm'

function CalculatorStage() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        aria-hidden
        className="absolute aspect-square h-[92%] rounded-full bg-[radial-gradient(closest-side,rgba(96,176,255,0.5),rgba(96,176,255,0)_72%)]"
      />
      <img
        src={img('calculator')}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="kv-bob relative h-full w-full select-none object-contain drop-shadow-[0_24px_28px_rgba(0,10,50,0.4)]"
      />
    </div>
  )
}

export function CalculatorSection() {
  const calc = usePremiumCalculator()
  const formWrap = useRef<HTMLDivElement>(null)
  const [pulse, setPulse] = useState(false)

  const goToForm = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    formWrap.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' })
    calc.refs.ageRef.current?.focus({ preventScroll: true })
    setPulse(false)
    requestAnimationFrame(() => setPulse(true))
  }

  return (
    <section id="calculator" aria-labelledby="calc-title" className="bg-white pb-16 lg:pb-20">
      <div className="gutter">
        <Reveal className="wrap">
          <div
            className="calc-banner relative isolate overflow-hidden rounded-[30px] text-white shadow-panel"
          >
            <div className="relative grid gap-x-8 gap-y-6 p-5 sm:p-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-cols-[minmax(0,270px)_minmax(0,1fr)_minmax(0,400px)] lg:grid-rows-[auto_1fr] lg:p-10 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,410px)]">
              <div className="relative h-[230px] self-center sm:h-[260px] lg:row-span-2 lg:h-[320px]">
                <CalculatorStage />
              </div>
              <div className="relative self-center lg:self-end">
                <p className="eyebrow text-gold">Quick &amp; easy</p>
                <h2 id="calc-title" className="mt-3 text-[2rem] font-[740] leading-[1.08] text-white sm:text-[2.3rem]">
                  Calculate Your Premium
                </h2>
                <p className="mt-3 max-w-[26rem] text-[1.04rem] leading-relaxed text-white/80">
                  Get a quick, illustrative estimate for your preferred plan. It is a rough guide, not LIC’s rate. For the exact premium, ask me for a quotation.
                </p>
                <Button variant="white" size="md" arrow className="mt-6" onClick={goToForm}>
                  Try Premium Calculator
                </Button>
              </div>
              <div
                ref={formWrap}
                onAnimationEnd={() => setPulse(false)}
                className={cn(
                  'relative rounded-[26px] md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center',
                  pulse && 'animate-[calc-pulse_1s_ease-out]',
                )}
              >
                <PremiumForm calc={calc} />
              </div>
              <EstimatePanel calc={calc} className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 lg:self-start" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
