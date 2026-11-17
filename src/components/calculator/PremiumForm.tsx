import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CalendarClock, ChevronDown, IndianRupee, Info, UserRound, type LucideIcon } from 'lucide-react'
import { CALC_ORDER, CALC_PLANS, estimate, validate, type CalcErrors, type CalcPlanId, type Estimate } from '../../lib/premium'
import { formatGrouped, formatINR, inWords, parseAmount } from '../../lib/inr'
import { cn } from '../../lib/hooks'
import { Button } from '../ui/Button'
import { BRAND } from '../../data/content'
import { AnimatedNumber } from '../ui/Motion'

function Row({
  id,
  icon: Icon,
  label,
  error,
  hint,
  children,
}: {
  id: string
  icon: LucideIcon
  label: string
  error?: string
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div
        className={cn(
          'flex h-[54px] items-center gap-3 rounded-2xl border px-4 transition-colors',
          error
            ? 'border-[#ffb3b3]/80 bg-[#ff6b6b]/[0.12]'
            : 'border-white/[0.14] bg-white/[0.08] focus-within:border-gold/80 focus-within:bg-white/[0.13] hover:bg-white/[0.11]',
        )}
      >
        <Icon className="h-[19px] w-[19px] shrink-0 text-white/80" aria-hidden />
        <label htmlFor={id} className="shrink-0 font-display text-[0.95rem] font-semibold text-white">
          {label}
        </label>
        <div className="relative ml-auto flex min-w-0 flex-1 items-center justify-end">{children}</div>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 px-1 text-[0.86rem] leading-snug text-[#ffd6d6]">
          <AlertCircle className="mt-[2px] h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 px-1 text-[0.84rem] text-white/70">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

const QUICK: Record<CalcPlanId, number[]> = {
  savings: [5_00_000, 10_00_000, 25_00_000, 50_00_000],
  child: [10_00_000, 25_00_000, 50_00_000, 1_00_00_000],
}

function nearest(list: number[], value: number) {
  return list.reduce((best, v) => (Math.abs(v - value) < Math.abs(best - value) ? v : best), list[0])
}

export interface CalcInit {
  plan?: CalcPlanId
  age?: number
  term?: number
  amount?: number
}

export function usePremiumCalculator(init: CalcInit = {}) {
  const [plan, setPlan] = useState<CalcPlanId>(init.plan ?? 'savings')
  const [age, setAge] = useState(String(init.age ?? 25))
  const [term, setTerm] = useState(init.term ?? 20)
  const [amountText, setAmountText] = useState(formatGrouped(init.amount ?? 50_00_000))
  const [errors, setErrors] = useState<CalcErrors>({})
  const [attempted, setAttempted] = useState(true)
  const [result, setResult] = useState<(Estimate & { plan: CalcPlanId }) | null>(null)
  const ageRef = useRef<HTMLSelectElement>(null)
  const termRef = useRef<HTMLSelectElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const amount = useMemo(() => parseAmount(amountText), [amountText])

  const switchPlan = (next: CalcPlanId) => {
    setPlan(next)
    const c = CALC_PLANS[next]
    const a = Number(age)
    if (!(a >= c.ageMin && a <= c.ageMax)) setAge(String(Math.min(c.ageMax, Math.max(c.ageMin, a || c.ageMin))))
    const terms = CALC_PLANS[next].terms
    if (!terms.includes(term)) setTerm(nearest(terms, term))
  }

  // Keep errors and the estimate in step with what's typed.
  useEffect(() => {
    if (!attempted) return
    const errs = validate({ plan, age, term, amount, amountText })
    setErrors(errs)
    if (!Object.keys(errs).length && amount !== null) setResult({ ...estimate(plan, Number(age), term, amount), plan })
    else setResult(null)
  }, [attempted, plan, age, term, amount, amountText])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate({ plan, age, term, amount, amountText })
    setAttempted(true)
    setErrors(errs)
    if (errs.age) ageRef.current?.focus()
    else if (errs.term) termRef.current?.focus()
    else if (errs.amount) amountRef.current?.focus()
    if (!Object.keys(errs).length && amount !== null) {
      setResult({ ...estimate(plan, Number(age), term, amount), plan })
      setAmountText(formatGrouped(amount))
    }
  }

  return {
    plan,
    switchPlan,
    age,
    setAge,
    term,
    setTerm,
    amountText,
    setAmountText,
    amount,
    errors,
    result,
    submit,
    refs: { ageRef, termRef, amountRef },
  }
}

export type PremiumCalculator = ReturnType<typeof usePremiumCalculator>

export const PremiumForm = function PremiumForm({
  calc,
  className,
  hidePlanPicker,
}: {
  calc: PremiumCalculator
  className?: string
  hidePlanPicker?: boolean
}) {
  const { plan, switchPlan, age, setAge, term, setTerm, amountText, setAmountText, amount, errors, submit } = calc
  const { ageRef, termRef, amountRef } = calc.refs
  const radios = useRef<Array<HTMLButtonElement | null>>([])
  const cfg = CALC_PLANS[plan]
  const onSubmit = submit

  const onRadioKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (index + dir + CALC_ORDER.length) % CALC_ORDER.length
    switchPlan(CALC_ORDER[next])
    radios.current[next]?.focus()
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Premium calculator"
      className={cn(
        'rounded-[26px] border border-white/[0.16] bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_30px_60px_-30px_rgba(3,12,40,0.8)] backdrop-blur-xl sm:p-5',
        className,
      )}
    >
      {!hidePlanPicker && (
      <div role="radiogroup" aria-label="Plan type" className="grid grid-cols-2 gap-1 rounded-[18px] bg-night/40 p-1 min-[420px]:grid-cols-4 min-[420px]:rounded-full">
        {CALC_ORDER.map((id, i) => {
          const selected = plan === id
          return (
            <button
              key={id}
              ref={(el) => (radios.current[i] = el)}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => switchPlan(id)}
              onKeyDown={(e) => onRadioKey(e, i)}
              className={cn(
                'relative h-10 rounded-full px-2 font-display text-[0.88rem] font-semibold transition-colors',
                selected ? 'text-ink' : 'text-white/80 hover:text-white',
              )}
            >
              {selected && (
                <motion.span
                  layoutId="calc-plan-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{CALC_PLANS[id].label}</span>
            </button>
          )
        })}
      </div>
      )}

      <div className={cn('space-y-3', !hidePlanPicker && 'mt-4')}>
        <Row id="calc-age" icon={UserRound} label={cfg.ageLabel} error={errors.age}>
          <select
            ref={ageRef}
            id="calc-age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? 'calc-age-error' : undefined}
            style={{ colorScheme: 'dark' }}
            className="w-full max-w-[64px] cursor-pointer appearance-none bg-transparent text-right font-display text-[1.02rem] font-semibold text-white outline-none tabular"
          >
            {Array.from({ length: cfg.ageMax - cfg.ageMin + 1 }, (_, i) => cfg.ageMin + i).map((a) => (
              <option key={a} value={a} className="bg-night text-white">
                {a}
              </option>
            ))}
          </select>
          <span className="ml-1.5 text-[0.9rem] text-white/70">years</span>
          <ChevronDown className="pointer-events-none ml-1 h-4 w-4 shrink-0 text-white/80" aria-hidden />
        </Row>

        <Row id="calc-term" icon={CalendarClock} label="Policy Term" error={errors.term}>
          <select
            ref={termRef}
            id="calc-term"
            name="term"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            aria-invalid={!!errors.term}
            aria-describedby={errors.term ? 'calc-term-error' : undefined}
            style={{ colorScheme: 'dark' }}
            className="w-full max-w-[150px] cursor-pointer appearance-none bg-transparent pr-7 text-right font-display text-[1.02rem] font-semibold text-white outline-none"
          >
            {cfg.terms.map((t) => (
              <option key={t} value={t} className="bg-night text-white">
                {t} Years
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-white/80" aria-hidden />
        </Row>

        <Row
          id="calc-amount"
          icon={IndianRupee}
          label={cfg.amountLabel}
          error={errors.amount}
          hint={amount !== null ? `${formatINR(amount)} · ${inWords(amount)}` : 'Type 50,00,000 or 50 lakh'}
        >
          <input
            ref={amountRef}
            id="calc-amount"
            name="amount"
            inputMode="decimal"
            autoComplete="off"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            onBlur={() => amount !== null && setAmountText(formatGrouped(amount))}
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? 'calc-amount-error' : 'calc-amount-hint'}
            className="w-full min-w-0 max-w-[150px] bg-transparent text-right font-display text-[1.02rem] font-semibold text-white outline-none tabular"
          />
        </Row>
        <div className="flex flex-wrap gap-1.5 px-0.5" aria-label="Common amounts">
          {QUICK[plan].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAmountText(formatGrouped(v))}
              aria-pressed={amount === v}
              className={cn(
                'h-8 rounded-full border px-3 text-[0.82rem] font-semibold transition-colors',
                amount === v ? 'border-gold bg-gold text-ink' : 'border-white/20 text-white/85 hover:border-white/50 hover:text-white',
              )}
            >
              ₹{inWords(v).replace(' lakh', 'L').replace(' crore', ' Cr')}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" arrow className="mt-4 w-full">
        Calculate Now
      </Button>

    </form>
  )
}

/** The estimate, or what's needed to get one. Lives in an aria-live region. */
export function EstimatePanel({ calc, className }: { calc: PremiumCalculator; className?: string }) {
  const { result, errors } = calc
  const errorCount = Object.keys(errors).length
  return (
      <div aria-live="polite" className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            className="rounded-2xl bg-white p-4 text-ink shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.86rem] font-semibold text-ink-soft">Estimated premium · {CALC_PLANS[result.plan].label}</p>
              <span className="rounded-full bg-gold/30 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-ink">
                Illustrative
              </span>
            </div>
            <p className="mt-1 font-display text-[2rem] font-[760] leading-none tabular">
              <AnimatedNumber value={result.annual} format={formatINR} />
              <span className="ml-1 text-[0.95rem] font-semibold text-ink-soft">/ year</span>
            </p>
            <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-[0.8rem]">
              <div>
                <dt className="text-ink-soft">Monthly</dt>
                <dd className="font-semibold tabular">≈ {formatINR(result.monthly)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Paid over {result.term} yrs</dt>
                <dd className="font-semibold tabular">{inWords(result.totalPaid)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">{CALC_PLANS[result.plan].amountLabel}</dt>
                <dd className="font-semibold tabular">{inWords(result.amount)}</dd>
              </div>
            </dl>
            <p className="mt-3 flex gap-1.5 text-[0.78rem] leading-snug text-ink-soft">
              <Info className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                {result.note} A rough estimate, not LIC’s rate. For the exact premium, ask me for a quotation.
              </span>
            </p>
            <a
              href={`${BRAND.whatsapp}?text=${encodeURIComponent(`Hi, I'd like an exact LIC quotation. Plan type: ${CALC_PLANS[result.plan].label}, age ${result.endAge - result.term}, term ${result.term} years, amount ${formatINR(result.amount)}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex h-10 items-center rounded-full bg-ink px-4 font-display text-[0.88rem] font-semibold text-white hover:bg-brand-deep"
            >
              Get the exact premium on WhatsApp
            </a>
          </motion.div>
        ) : errorCount ? (
          <motion.p
            key="errors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-[0.9rem] text-[#ffd6d6]"
          >
            <AlertCircle className="h-4 w-4" aria-hidden />
            {errorCount === 1 ? 'Fix the highlighted field to see your estimate.' : `Fix the ${errorCount} highlighted fields to see your estimate.`}
          </motion.p>
        ) : (
          <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[0.9rem] text-white/70">
            Your illustrative yearly premium will appear here.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
