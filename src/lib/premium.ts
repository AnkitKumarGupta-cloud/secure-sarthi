import { formatINR, inWords } from './inr'

/**
 * ILLUSTRATIVE premium model.
 *
 * These formulas give a rough sense of scale. They are not LIC's rates and not a quotation,
 * and the UI labels every result as an estimate.
 */

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
    amountMin: 1_00_000,
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

export const CALC_ORDER: CalcPlanId[] = ['savings', 'child']

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
      const mortality = (amount / 1000) * 0.95 * Math.exp(0.058 * (age - 30))
      annual = (amount / term) * 0.93 + mortality
      note = 'Includes a savings component paid back at maturity.'
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
    monthly: round10((yearly / 12) * 1.03),
    totalPaid: yearly * term,
    amount,
    term,
    endAge: age + term,
    note,
  }
}
