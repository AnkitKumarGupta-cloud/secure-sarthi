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

/**
 * Jeevan Akshay VII (857) yearly annuity rates, % of purchase price, by age (30 to 80 in steps of 5).
 * Curves are LIC's published rates (Feb 2022 version, no incentive), scaled so age 60 matches the current
 * brochure illustration for ₹10 lakh: A ₹86,100, F ₹64,000, G ₹68,700 a year (which include the ₹3.40 per
 * ₹1,000 incentive for that slab). Joint life (I) has no current illustration, so it uses the published curve.
 */
const AGES = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
const OPTIONS = [
  {
    id: 'A',
    label: 'A. Life annuity',
    curve: [6.205, 6.345, 6.535, 6.795, 7.155, 7.645, 8.325, 9.245, 10.69, 13.23, 17.23],
    at60: 8.61,
    note: 'Income for life. Nothing is paid after you.',
  },
  {
    id: 'F',
    label: 'F. Life, return of purchase price',
    curve: [5.755, 5.765, 5.775, 5.795, 5.815, 5.845, 5.875, 5.915, 5.965, 6.015, 6.075],
    at60: 6.4,
    note: 'Income for life, and the purchase price goes to your nominee after you.',
  },
  {
    id: 'G',
    label: 'G. Increasing 3% a year',
    curve: [4.425, 4.575, 4.785, 5.065, 5.425, 5.925, 6.615, 7.545, 8.975, 11.435, 15.315],
    at60: 6.87,
    note: 'Starts lower, then rises by 3% of the starting amount every year.',
  },
  {
    id: 'I',
    label: 'I. Joint life, 100% to survivor',
    curve: [5.985, 6.025, 6.125, 6.265, 6.455, 6.715, 7.085, 7.605, 8.355, 9.525, 11.405],
    at60: null,
    note: 'The full income continues while either of you is alive. Assumes your spouse is about five years younger.',
  },
] as const

/** Extra annuity for a larger purchase price, ₹ per ₹1,000 a year (yearly mode). */
function incentive(amount: number) {
  if (amount >= 25_00_000) return 3.9
  if (amount >= 10_00_000) return 3.4
  if (amount >= 5_00_000) return 2.4
  return 0
}

/** Yearly annuity rate in % for an age and option, including the purchase-price incentive. */
export function annuityRate(age: number, opt: (typeof OPTIONS)[number], amount: number) {
  const i = Math.min(AGES.length - 2, Math.max(0, Math.floor((age - 30) / 5)))
  const w = (age - AGES[i]) / 5
  const raw = opt.curve[i] * (1 - w) + opt.curve[i + 1] * w
  const scale = opt.at60 === null ? 1 : (opt.at60 - 0.34) / opt.curve[6]
  return raw * scale + incentive(amount) / 10
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
  else if (ageNum < 30 || ageNum > 80) errors.age = 'This estimate covers ages 30 to 80. Ask me for other ages.'

  const option = OPTIONS.find((o) => o.id === opt)!
  const result = useMemo(() => {
    if (errors.amount || errors.age || amount === null) return null
    const yearly = Math.round((amount * annuityRate(ageNum, option, amount)) / 100 / 100) * 100
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
              <span className="rounded-full bg-gold/30 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-ink">Estimate</span>
            </div>
            <p className="mt-1 font-display text-[2.2rem] font-[760] leading-none text-ink tabular">
              <AnimatedNumber value={result.yearly} format={formatINR} />
              <span className="ml-1 text-[1rem] font-semibold text-ink-soft">/ year</span>
            </p>
            <p className="mt-1 text-[0.95rem] text-ink-soft tabular">Paid yearly. Monthly payouts come to a little under {formatINR(result.monthly)} a month.</p>
            <p className="mt-4 rounded-xl bg-mist p-3 text-[0.93rem] leading-snug text-ink">{option.note}</p>
            <p className="mt-3 flex gap-1.5 text-[0.8rem] leading-snug text-ink-soft">
              <Info className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Estimated from LIC’s published Jeevan Akshay VII rates, scaled to the current brochure. LIC revises rates from time to time; the rate on the day you buy is fixed for life. Ask me for the exact figure.</span>
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

/* --------------------------------------------------------------- amritbaal */

/**
 * LIC Amritbaal (774) brochure illustration: a 5-year-old child, 20-year policy, ₹5 lakh basic sum assured.
 * Limited pay uses Option I; single pay uses Option III. Other ages and terms change the premium, and the
 * high sum assured rebate differs by amount, so scaling to other amounts is approximate.
 */
const AMRITBAAL_SAMPLE = { amount: 5_00_000, term: 20, childAge: 5 }
const AMRITBAAL_PAY = [
  { id: '5', label: '5 years', premium: 99_625, years: 5 },
  { id: '6', label: '6 years', premium: 84_275, years: 6 },
  { id: '7', label: '7 years', premium: 73_625, years: 7 },
  { id: 'single', label: 'One-time (single premium)', premium: 3_89_225, years: 1 },
] as const

export function AmritbaalEstimator() {
  const uid = useId()
  const [text, setText] = useState(formatGrouped(5_00_000))
  const [pay, setPay] = useState<(typeof AMRITBAAL_PAY)[number]['id']>('7')
  const amount = useMemo(() => parseAmount(text), [text])
  let error: string | undefined
  if (!text.trim()) error = 'Enter the sum assured.'
  else if (amount === null) error = 'Enter an amount like 5,00,000 or 5 lakh.'
  else if (amount < 2_00_000) error = `The minimum sum assured is ${formatINR(2_00_000)}.`
  const p = AMRITBAAL_PAY.find((x) => x.id === pay)!
  const result =
    !error && amount !== null
      ? (() => {
          const premium = Math.round((p.premium * amount) / AMRITBAAL_SAMPLE.amount / 10) * 10
          const additions = Math.round(amount * 0.08 * AMRITBAAL_SAMPLE.term)
          return { premium, total: premium * p.years, additions, maturity: amount + additions }
        })()
      : null

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-8">
      <form noValidate onSubmit={(e) => e.preventDefault()} aria-label="Amritbaal estimator" className="grid content-start gap-4">
        <AmountField id="amritbaal-amount" label="Sum assured (₹)" value={text} onChange={setText} amount={amount} error={error} hint="Type 5,00,000 or 5 lakh" />
        <div>
          <label htmlFor={`${uid}-pay`} className="font-display font-semibold text-ink">
            Pay premiums for
          </label>
          <select id={`${uid}-pay`} value={pay} onChange={(e) => setPay(e.target.value as typeof pay)} className={cn(field, 'mt-1.5 border-line')}>
            {AMRITBAAL_PAY.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-[0.88rem] leading-snug text-ink-soft">
          For a child aged {AMRITBAAL_SAMPLE.childAge} with a {AMRITBAAL_SAMPLE.term}-year policy, as in LIC’s brochure. A younger child or a different term changes the figures.
        </p>
      </form>
      <div aria-live="polite" className="min-w-0">
        {result ? (
          <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.88rem] font-semibold text-ink-soft">{pay === 'single' ? 'One-time premium' : 'Yearly premium'}</p>
              <span className="rounded-full bg-gold/30 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-ink">Estimate</span>
            </div>
            <p className="mt-1 font-display text-[2.2rem] font-[760] leading-none text-ink tabular">
              <AnimatedNumber value={result.premium} format={formatINR} />
              {pay !== 'single' && <span className="ml-1 text-[1rem] font-semibold text-ink-soft">/ year</span>}
            </p>
            <dl className="mt-4 grid gap-2 text-[0.95rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">You pay in total</dt>
                <dd className="font-semibold text-ink tabular">{formatINR(result.total)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Guaranteed additions (₹80 per ₹1,000 a year)</dt>
                <dd className="font-semibold text-ink tabular">{formatINR(result.additions)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-2">
                <dt className="font-semibold text-ink">At maturity (age 25)</dt>
                <dd className="font-display text-[1.15rem] font-[740] text-ink tabular">{formatINR(result.maturity)}</dd>
              </div>
            </dl>
            <p className="mt-3 flex gap-1.5 text-[0.8rem] leading-snug text-ink-soft">
              <Info className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Scaled from LIC’s Amritbaal brochure example, before GST. Maturity assumes the policy stays in force. Ask me for the exact quotation for your child’s age.</span>
            </p>
          </div>
        ) : (
          <p className="flex items-center gap-2 rounded-2xl border border-dashed border-line p-6 text-[0.95rem] text-ink-soft">
            <AlertCircle className="h-4 w-4" aria-hidden />
            Fix the highlighted field to see the estimate.
          </p>
        )}
      </div>
    </div>
  )
}
