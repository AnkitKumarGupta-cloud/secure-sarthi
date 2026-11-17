import { useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedNumber } from '../components/ui/Motion'
import { AlertCircle, Info } from 'lucide-react'
import { cn } from '../lib/hooks'
import { formatGrouped, formatINR, inWords, parseAmount } from '../lib/inr'

const field = 'h-12 w-full rounded-xl border bg-white px-4 text-[1rem] text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15'

function AmountField({
  id,
  label,
  value,
  onChange,
  amount,
  error,
  hint,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  amount: number | null
  error?: string
  hint: string
}) {
  return (
    <div>
      <label htmlFor={id} className="font-display font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => amount !== null && onChange(formatGrouped(amount))}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : `${id}-hint`}
        className={cn(field, 'mt-1.5 tabular', error ? 'border-danger' : 'border-line')}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 flex gap-1.5 text-[0.88rem] text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.86rem] text-ink-soft">
          {amount !== null ? `${formatINR(amount)} · ${inWords(amount)}` : hint}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ money back */

const SCHEDULE = [
  { year: 5, share: 0.2, label: 'Survival benefit' },
  { year: 10, share: 0.2, label: 'Survival benefit' },
  { year: 15, share: 0.2, label: 'Survival benefit' },
  { year: 20, share: 0.4, label: 'Maturity benefit, plus bonuses' },
]

export function MoneyBackSchedule() {
  const [text, setText] = useState(formatGrouped(10_00_000))
  const amount = useMemo(() => parseAmount(text), [text])
  let error: string | undefined
  if (!text.trim()) error = 'Enter a sum assured.'
  else if (amount === null) error = 'Enter an amount like 10,00,000 or 10 lakh.'
  else if (amount < 1_00_000 || amount > 10_00_00_000) error = `Enter between ${formatINR(1_00_000)} and ${inWords(10_00_00_000)}.`
  else if (amount % 5000 !== 0) error = 'The sum assured must be a multiple of ₹5,000.'
  const ok = !error && amount !== null

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-8">
      <form noValidate onSubmit={(e) => e.preventDefault()} aria-label="Money back payout schedule" className="content-start">
        <AmountField id="mb-amount" label="Sum assured (₹)" value={text} onChange={setText} amount={amount} error={error} hint="Type 10,00,000 or 10 lakh" />
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[2_00_000, 5_00_000, 10_00_000, 25_00_000].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setText(formatGrouped(v))}
              aria-pressed={amount === v}
              className={cn(
                'h-8 rounded-full border px-3 text-[0.82rem] font-semibold transition-colors',
                amount === v ? 'border-ink bg-ink text-white' : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink',
              )}
            >
              {inWords(v)}
            </button>
          ))}
        </div>
      </form>
      <div aria-live="polite" className="min-w-0">
        {ok && amount !== null ? (
          <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <ol className="space-y-3">
              {SCHEDULE.map((s) => (
                <li key={s.year} className="grid grid-cols-[4.2rem_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="font-display font-semibold text-ink">Year {s.year}</span>
                  <span className="min-w-0">
                    <span className="block h-3 overflow-hidden rounded-full bg-sky">
                      <motion.span
                        className="block h-full rounded-full bg-brand"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, s.share * 100 * 2.2)}%` }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 * (SCHEDULE.indexOf(s) + 1) }}
                      />
                    </span>
                    <span className="mt-1 block text-[0.82rem] text-ink-soft">
                      {s.share * 100}% · {s.label}
                    </span>
                  </span>
                  <span className="font-display text-[1.15rem] font-[740] text-ink tabular"><AnimatedNumber value={Math.round(amount * s.share)} format={inWords} /></span>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-line pt-3 text-[0.95rem] text-ink">
              Life cover throughout: at least <strong className="tabular">{inWords(Math.round(amount * 1.25))}</strong>{' '}
              <span className="text-ink-soft">(125% of the sum assured, plus bonuses)</span>
            </p>
            <p className="mt-3 flex gap-1.5 text-[0.8rem] leading-snug text-ink-soft">
              <Info className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Shares are of the basic sum assured, before any bonuses. Bonuses are not guaranteed. Premium depends on your age: ask me for the exact quotation.</span>
            </p>
          </div>
        ) : (
          <p className="flex items-center gap-2 rounded-2xl border border-dashed border-line p-6 text-[0.95rem] text-ink-soft">
            <AlertCircle className="h-4 w-4" aria-hidden />
            Fix the highlighted field to see the schedule.
          </p>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- annuity */

const OPTIONS = [
  { id: 'A', label: 'A. Life annuity', factor: 1, note: 'Income for life. Nothing is paid after you.' },
  { id: 'C', label: 'C. Life, guaranteed 10 years', factor: 0.985, note: 'If you pass away within 10 years, your nominee receives the income for the rest of that period.' },
  { id: 'F', label: 'F. Life, return of purchase price', factor: 0.78, note: 'The purchase price goes to your nominee after you.' },
  { id: 'G', label: 'G. Increasing 3% a year', factor: 0.7, note: 'Starts lower, then rises 3% of the starting amount every year.' },
  { id: 'I', label: 'I. Joint life, 100% to survivor', factor: 0.82, note: 'The full income continues while either of you is alive.' },
]

/** Illustrative only: rises with age, as annuity rates do. */
function baseRate(age: number) {
  return Math.min(0.11, Math.max(0.045, 0.055 + 0.0011 * (age - 45)))
}

export function AnnuityEstimator() {
  const uid = useId()
  const [text, setText] = useState(formatGrouped(25_00_000))
  const [age, setAge] = useState('60')
  const [opt, setOpt] = useState('A')
  const amount = useMemo(() => parseAmount(text), [text])
  const ageNum = Number(age)

  const errors: { amount?: string; age?: string } = {}
  if (!text.trim()) errors.amount = 'Enter the purchase price.'
  else if (amount === null) errors.amount = 'Enter an amount like 25,00,000 or 25 lakh.'
  else if (amount < 1_00_000) errors.amount = `The minimum purchase price is ${formatINR(1_00_000)}.`
  if (!age.trim()) errors.age = 'Enter your age in years.'
  else if (!/^\d+$/.test(age)) errors.age = 'Enter your age as a whole number.'
  else if (ageNum < 30 || ageNum > 85) errors.age = 'This estimate covers ages 30 to 85.'

  const option = OPTIONS.find((o) => o.id === opt)!
  const result = useMemo(() => {
    if (errors.amount || errors.age || amount === null) return null
    const yearly = Math.round((amount * baseRate(ageNum) * option.factor) / 100) * 100
    return { yearly, monthly: Math.round(yearly / 12 / 10) * 10 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, ageNum, option, errors.amount, errors.age])

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-8">
      <form noValidate onSubmit={(e) => e.preventDefault()} aria-label="Annuity income estimator" className="grid content-start gap-4">
        <AmountField id="annuity-amount" label="Purchase price (₹)" value={text} onChange={setText} amount={amount} error={errors.amount} hint="Type 25,00,000 or 25 lakh" />
        <div>
          <label htmlFor={`${uid}-age`} className="font-display font-semibold text-ink">
            Your age
          </label>
          <input
            id={`${uid}-age`}
            inputMode="numeric"
            maxLength={3}
            autoComplete="off"
            value={age}
            onChange={(e) => setAge(e.target.value.replace(/[^\d]/g, ''))}
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? `${uid}-age-err` : undefined}
            className={cn(field, 'mt-1.5', errors.age ? 'border-danger' : 'border-line')}
          />
          {errors.age && (
            <p id={`${uid}-age-err`} className="mt-1.5 flex gap-1.5 text-[0.88rem] text-danger">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {errors.age}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${uid}-opt`} className="font-display font-semibold text-ink">
            Annuity option
          </label>
          <select id={`${uid}-opt`} value={opt} onChange={(e) => setOpt(e.target.value)} className={cn(field, 'mt-1.5 border-line')}>
            {OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div aria-live="polite" className="min-w-0">
        {result ? (
          <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.88rem] font-semibold text-ink-soft">Estimated income · Option {option.id}</p>
              <span className="rounded-full bg-gold/30 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-ink">Illustrative</span>
            </div>
            <p className="mt-1 font-display text-[2.2rem] font-[760] leading-none text-ink tabular">
              <AnimatedNumber value={result.yearly} format={formatINR} />
              <span className="ml-1 text-[1rem] font-semibold text-ink-soft">/ year</span>
            </p>
            <p className="mt-1 text-[0.95rem] text-ink-soft tabular">About {formatINR(result.monthly)} a month</p>
            <p className="mt-4 rounded-xl bg-mist p-3 text-[0.93rem] leading-snug text-ink">{option.note}</p>
            <p className="mt-3 flex gap-1.5 text-[0.8rem] leading-snug text-ink-soft">
              <Info className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>A rough estimate with a simple age-based rate, not LIC’s annuity rate. Real rates depend on the option, your age and the date you buy, and are fixed for life. Ask me for the exact figure.</span>
            </p>
          </div>
        ) : (
          <p className="flex items-center gap-2 rounded-2xl border border-dashed border-line p-6 text-[0.95rem] text-ink-soft">
            <AlertCircle className="h-4 w-4" aria-hidden />
            Fix the highlighted fields to see the estimate.
          </p>
        )}
      </div>
    </div>
  )
}
