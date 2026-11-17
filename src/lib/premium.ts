import { formatINR, inWords } from './inr'

/**
 * Premium estimates built from LIC's own published sample premiums, so results land close to a real quote.
 *
 * Savings uses LIC's New Endowment Plan (714) brochure: yearly premiums for a ₹2 lakh basic sum assured at
 * ages 20, 30 and 40 for terms of 15, 25 and 35 years. Between those points we interpolate; outside them
 * (ages 18–19 and 41–50, terms under 15) we extend the same curves, so those results are less exact.
 * The high sum assured rebate (₹2.50 per ₹1,000 from ₹5 lakh, ₹4 per ₹1,000 from ₹10 lakh) is applied.
 * Taxes and riders are excluded. Still an estimate, not a quotation.
 */

/** LIC 714 brochure: yearly premium for ₹2,00,000 basic sum assured. Rows: age 20, 30, 40. Columns: term 15, 25, 35. */
const ENDOWMENT_714 = {
  ages: [20, 30, 40],
  terms: [15, 25, 35],
  premium: [
    [14543, 8369, 5949],
    [14592, 8497, 6213],
    [14847, 8987, 6958],
  ],
  basicSumAssured: 2_00_000,
}

/** Solves for x, y, z in P(t) = x/t + y + z·t through three (term, premium) points. */
function fitTerm(ts: number[], ps: number[]) {
  const rows = ts.map((t) => [1 / t, 1, t])
  const det3 = (m: number[][]) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  const d = det3(rows)
  const col = (k: number) => rows.map((r, i) => r.map((v, j) => (j === k ? ps[i] : v)))
  return [det3(col(0)) / d, det3(col(1)) / d, det3(col(2)) / d]
}

/** Quadratic (Lagrange) through three ages. */
function lagrange(xs: number[], ys: number[], x: number) {
  let sum = 0
  for (let i = 0; i < 3; i++) {
    let term = ys[i]
    for (let j = 0; j < 3; j++) if (j !== i) term *= (x - xs[j]) / (xs[i] - xs[j])
    sum += term
  }
  return sum
}

/** LIC 714 yearly premium per ₹1,000 basic sum assured, before the high sum assured rebate. */
export function endowmentRatePerThousand(age: number, term: number) {
  const { ages, terms, premium, basicSumAssured } = ENDOWMENT_714
  const atTerm = premium.map((row) => {
    const [x, y, z] = fitTerm(terms, row)
    return x / term + y + z * term
  })
  return lagrange(ages, atTerm, age) / (basicSumAssured / 1000)
}

/** LIC 714 high basic sum assured rebate, ₹ per ₹1,000 of basic sum assured. */
export function highSumAssuredRebate(amount: number) {
  if (amount >= 10_00_000) return 4
  if (amount >= 5_00_000) return 2.5
  return 0
}

export type CalcPlanId = 'savings' | 'child'

export interface CalcPlan {
  id: CalcPlanId
  label: string
  ageLabel: string
  amountLabel: string
  ageMin: number
  ageMax: number
  /** Latest age at which the policy term may end (vesting age for pension). */
  maxEndAge: number
  terms: number[]
  amountMin: number
  amountMax: number
}

export const CALC_PLANS: Record<CalcPlanId, CalcPlan> = {
  savings: {
    id: 'savings',
    label: 'Savings',
    ageLabel: 'Age',
    amountLabel: 'Sum Assured',
    ageMin: 18,
    ageMax: 50,
    maxEndAge: 75,
    terms: [12, 15, 20, 25, 30, 35],
    amountMin: 2_00_000,
    amountMax: 5_00_00_000,
  },
  child: {
    id: 'child',
    label: 'Child Plan',
    ageLabel: 'Parent’s age',
    amountLabel: 'Sum Assured',
    ageMin: 20,
    ageMax: 50,
    maxEndAge: 70,
    terms: [10, 13, 15, 18, 21, 25],
    amountMin: 2_00_000,
    amountMax: 2_00_00_000,
  },
}

/** The child plan (Amritbaal) has its own estimator on its page: it is priced on the child's age with 5–7 years of premiums. */
export const CALC_ORDER: CalcPlanId[] = ['savings']

export interface CalcInput {
  plan: CalcPlanId
  age: string
  term: number
  amount: number | null
  amountText: string
}

export type CalcErrors = Partial<Record<'age' | 'term' | 'amount', string>>

export function validate(input: CalcInput): CalcErrors {
  const plan = CALC_PLANS[input.plan]
  const errors: CalcErrors = {}
  const ageText = input.age.trim()
  const age = Number(ageText)
  if (!ageText) errors.age = 'Enter your age in years.'
  else if (!/^\d+$/.test(ageText)) errors.age = 'Enter your age as a whole number, like 32.'
  else if (age < plan.ageMin || age > plan.ageMax)
    errors.age = `${plan.label} is available from age ${plan.ageMin} to ${plan.ageMax}.`

  if (!plan.terms.includes(input.term)) errors.term = 'Choose a policy term from the list.'
  else if (!errors.age && age + input.term > plan.maxEndAge)
    errors.term = `This term would end at age ${age + input.term}. Choose one that ends by ${plan.maxEndAge}.`

  if (!input.amountText.trim()) errors.amount = `Enter the ${plan.amountLabel.toLowerCase()}.`
  else if (input.amount === null) errors.amount = 'Enter an amount like 50,00,000 or 50 lakh.'
  else if (input.amount < plan.amountMin || input.amount > plan.amountMax)
    errors.amount = `Enter between ${formatINR(plan.amountMin)} (${inWords(plan.amountMin)}) and ${inWords(plan.amountMax)}.`
  return errors
}

export interface Estimate {
  annual: number
  monthly: number
  totalPaid: number
  amount: number
  term: number
  endAge: number
  note: string
}

const round10 = (n: number) => Math.max(10, Math.round(n / 10) * 10)

export function estimate(plan: CalcPlanId, age: number, term: number, amount: number): Estimate {
  let annual: number
  let note: string
  switch (plan) {
    case 'savings': {
      // Brochure samples are yearly-mode premiums; the sum assured rebate comes off the tabular premium (2% yearly mode rebate).
      annual = (amount / 1000) * (endowmentRatePerThousand(age, term) - highSumAssuredRebate(amount) * 0.98)
      note = 'Based on LIC’s published sample premiums for the New Endowment Plan (714), yearly mode, before GST.'
      break
    }
    case 'child': {
      const mortality = (amount / 1000) * 1.1 * Math.exp(0.058 * (age - 30))
      annual = ((amount / term) * 0.95 + mortality) * 1.04
      note = 'Includes a premium waiver if the parent passes away.'
      break
    }
  }
  const yearly = round10(annual)
  return {
    annual: yearly,
    // Monthly (NACH) mode gets no 2% yearly rebate.
    monthly: round10(yearly / 0.98 / 12),
    totalPaid: yearly * term,
    amount,
    term,
    endAge: age + term,
    note,
  }
}
