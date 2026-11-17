import {
  BadgeCheck,
  Banknote,
  CalendarClock,
  Coins,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Lock,
  Percent,
  PiggyBank,
  Repeat,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import type { PlanId } from './content'

/**
 * Long-form content for each plan page.
 *
 * Each page summarises a current LIC plan from public information (eligibility, terms, benefit structure,
 * riders). Everything is written in original words. The plan document and brochure issued by LIC are the only
 * authority on benefits and conditions, and the pages say so.
 */

export interface Benefit {
  icon: LucideIcon
  title: string
  body: string
}

export interface OptionItem {
  name: string
  detail: string
  tag?: string
}

export interface OptionGroup {
  title: string
  intro?: string
  items: OptionItem[]
}

export interface PlanDetail {
  id: PlanId
  /** Plan name as it is known in the market. */
  product: string
  /** Plan number, shown next to the name. */
  planNo: string
  lead: string
  facts: Array<{ label: string; value: string; note?: string }>
  benefits: Benefit[]
  steps: Array<{ title: string; body: string }>
  optionGroups: OptionGroup[]
  terms: Array<[string, string]>
  riders: Array<{ name: string; body: string }>
  suits: string[]
  notFor: string[]
  example: { name: string; text: string; calc?: { age: number; term: number; amount: number }; closing?: string }
  tax: string[]
  notes: string[]
  faqs: Array<{ q: string; a: string }>
  related: PlanId[]
  compare: { pays: string; maturity: string; growth: string; risk: string; cover: string }
}

export const PLAN_DETAILS: Record<PlanId, PlanDetail> = {
  /* ----------------------------------------------------------- endowment */
  endowment: {
    id: 'endowment',
    product: 'LIC’s New Endowment Plan',
    planNo: 'Plan 914',
    lead: 'Save for a goal that has a date on it. You are covered throughout, and you receive the sum assured plus bonuses when the plan matures.',
    facts: [
      { label: 'Entry age', value: '8–50 years', note: 'Upper age was reduced recently' },
      { label: 'Policy term', value: '12–35 years', note: 'Ends by age 75' },
      { label: 'Minimum cover', value: '₹1 lakh', note: 'No upper limit' },
      { label: 'At maturity', value: 'Sum assured + bonuses', note: 'Bonuses are not guaranteed' },
    ],
    benefits: [
      {
        icon: CalendarClock,
        title: 'A goal with a date',
        body: 'Pick a term that ends the year you need the money: a home down payment, a wedding or a business launch.',
      },
      {
        icon: Percent,
        title: 'Bonuses on top of the sum assured',
        body: 'LIC may declare simple reversionary bonuses each year, plus a final additional bonus at maturity or death. Declared bonuses add to what you receive, but they are not guaranteed in advance.',
      },
      {
        icon: ShieldCheck,
        title: 'Life cover all the way',
        body: 'If you pass away during the term, your family receives the death benefit along with the bonuses added so far.',
      },
      {
        icon: Wallet,
        title: 'Take the payout your way',
        body: 'Benefits can be paid as a lump sum, or as instalments over 5, 10 or 15 years.',
      },
      {
        icon: Landmark,
        title: 'Borrow against the policy',
        body: 'After two full years of premiums you can take a loan against the policy instead of surrendering it.',
      },
      {
        icon: PiggyBank,
        title: 'Revive a lapsed policy',
        body: 'A lapsed or paid-up policy can be revived within five years of the first unpaid premium, on the conditions in the policy.',
      },
    ],
    steps: [
      { title: 'Name your goal and year', body: 'Work out when you need the money. That year decides your policy term.' },
      { title: 'Choose the sum assured', body: 'This is the base amount. Bonuses, if declared, come on top of it. I help you fit it to your budget.' },
      { title: 'Pay premiums on time', body: 'Pay yearly, half-yearly, quarterly or monthly. A 30-day grace period (15 days for monthly) covers a late payment, and I remind you before each due date.' },
      { title: 'Receive the maturity benefit', body: 'At the end of the term you receive the sum assured plus vested bonuses and any final additional bonus.' },
    ],
    optionGroups: [
      {
        title: 'Choose your term',
        intro: 'Match the term to the goal. The plan runs from 12 to 35 years.',
        items: [
          { name: '12 to 15 years', detail: 'A first-home fund or a business seed.' },
          { name: '16 to 25 years', detail: 'A child’s higher studies, a wedding fund or a business expansion.' },
          { name: '26 to 35 years', detail: 'A long runway, for example a retirement top-up. The term must end by age 75.' },
        ],
      },
      {
        title: 'Paying the premium',
        items: [
          { name: 'Yearly or half-yearly', detail: 'Yearly payment earns a small rebate on the premium.' },
          { name: 'Quarterly or monthly', detail: 'Smaller, more frequent payments that fit a monthly budget.' },
        ],
      },
      {
        title: 'Receiving benefits',
        items: [
          { name: 'Lump sum', detail: 'The whole amount in one payment.' },
          { name: 'Instalments', detail: 'Over 5, 10 or 15 years, paid monthly, quarterly, half-yearly or yearly.' },
        ],
      },
    ],
    terms: [
      ['Plan type', 'Non-linked, participating, endowment plan with life cover'],
      ['Entry age', '8 to 50 years (please confirm the current limit with me)'],
      ['Policy term', '12 to 35 years'],
      ['Maximum age at maturity', '75 years'],
      ['Minimum basic sum assured', '₹1 lakh. No fixed maximum'],
      ['Premium modes', 'Yearly, half-yearly, quarterly or monthly'],
      ['Maturity benefit', 'Basic sum assured plus vested simple reversionary bonuses and any final additional bonus'],
      ['Death benefit', 'Highest of the basic sum assured, 7 times the annualised premium or 105% of premiums paid, plus vested bonuses and any final additional bonus'],
      ['Loan facility', 'Available after two full years of premiums'],
      ['Grace period', '30 days (15 days for monthly mode)'],
      ['Revival', 'Within five years of the first unpaid premium'],
    ],
    riders: [
      { name: 'Accidental Death and Disability Benefit', body: 'Pays an extra amount on accidental death, and a share of it on accidental disability.' },
      { name: 'Accident Benefit', body: 'Pays a benefit on accidental disability while premiums continue.' },
      { name: 'Term Assurance', body: 'Adds extra pure-protection cover on the same policy.' },
      { name: 'Critical Illness Benefit', body: 'Pays a sum when a listed serious illness is diagnosed.' },
      { name: 'Premium Waiver Benefit', body: 'Waives future premiums on the rider’s conditions so the policy carries on.' },
    ],
    suits: [
      'You want protection and saving in one plan',
      'You have a goal 12 to 35 years away',
      'You prefer steady, predictable growth to market ups and downs',
    ],
    notFor: [
      'You want the most cover for the least premium (look at term)',
      'You want regular payouts along the way (look at money back)',
    ],
    example: {
      name: 'A sample case',
      text: 'Meera is 35 and wants a wedding fund in 20 years. She picks a ₹10 lakh sum assured. This is an illustrative estimate, not LIC’s rate.',
      calc: { age: 35, term: 20, amount: 10_00_000 },
      closing: 'At the end of 20 years Meera receives ₹10 lakh plus any bonuses declared. If she passes away earlier, her family receives the death benefit. Ask me for the exact quotation.',
    },
    tax: [
      'Premiums may qualify for a deduction. Maturity and death proceeds are generally tax-free when the conditions of the law are met, for example where the yearly premium stays within a set share of the sum assured.',
      'Tax rules change and depend on your circumstances. Check with a tax adviser before relying on any benefit.',
    ],
    notes: [
      'Bonuses depend on LIC’s performance and are not guaranteed in advance. Once declared they stay with the policy.',
      'Surrendering early can return less than you paid in.',
      'Rider benefits come with their own conditions and exclusions.',
      'Always read the official brochure and policy document, which are the final word on terms and exclusions.',
    ],
    faqs: [
      {
        q: 'Are the bonuses guaranteed?',
        a: 'No. Bonuses are declared from time to time and depend on the performance of the participating fund. Once a bonus is declared it is added to your policy.',
      },
      {
        q: 'What happens if I miss a premium?',
        a: 'You have a 30-day grace period (15 days for monthly payments). After that the policy can lapse, and it can usually be revived within five years on the policy’s conditions. I send reminders so it does not come to that.',
      },
      {
        q: 'Can I take the money out before maturity?',
        a: 'After two full years of premiums you can borrow against the policy. Surrendering usually returns less than you paid in, so a loan is often the better choice for short-term needs.',
      },
      {
        q: 'How is this different from a fixed deposit?',
        a: 'An endowment plan includes life cover and bonus-linked returns that are not fixed. A fixed deposit has a fixed rate but no cover. Endowment plans suit goals you will not touch for many years.',
      },
      {
        q: 'Can the maturity amount be paid in parts?',
        a: 'Yes. You can choose instalments over 5, 10 or 15 years instead of a lump sum.',
      },
    ],
    related: ['moneyback', 'child'],
    compare: { pays: 'At maturity, or on death', maturity: 'Sum assured + bonuses', growth: 'Modest, bonus-linked', risk: 'Low', cover: 'Moderate' },
  },

  /* ----------------------------------------------------------- moneyback */
  moneyback: {
    id: 'moneyback',
    product: 'LIC’s New Money Back Plan – 20 Years',
    planNo: 'Plan 936',
    lead: 'A plan that pays part of your sum assured back at fixed points while your full life cover continues, with the balance and bonuses at the end.',
    facts: [
      { label: 'Entry age', value: '13–50 years' },
      { label: 'Policy term', value: '20 years', note: 'Pay for 15 years' },
      { label: 'Minimum cover', value: '₹1 lakh', note: 'In multiples of ₹5,000' },
      { label: 'Money back', value: '20% × 3, then 40%', note: 'At years 5, 10, 15 and 20' },
    ],
    benefits: [
      {
        icon: Banknote,
        title: 'Cash at planned milestones',
        body: '20% of the sum assured is paid at the end of years 5, 10 and 15. Useful for school fees, a vehicle or a family function.',
      },
      {
        icon: ShieldCheck,
        title: 'Full cover throughout',
        body: 'Money paid out as survival benefit does not reduce your life cover. If you pass away, the death benefit is paid in full.',
      },
      {
        icon: Percent,
        title: 'Bonuses on top',
        body: 'Simple reversionary bonuses may be declared each year and a final additional bonus at the end. Once declared, bonuses stay with the policy.',
      },
      {
        icon: Coins,
        title: '40% plus bonuses at maturity',
        body: 'The remaining 40% of the sum assured is paid at the end of year 20 along with the vested bonuses.',
      },
      {
        icon: Landmark,
        title: 'Borrow against the policy',
        body: 'Once the policy has a surrender value you can take a loan against it, within the limits in the policy.',
      },
      {
        icon: CalendarClock,
        title: 'Pay for 15 of 20 years',
        body: 'Premiums stop after 15 years, and you stay covered for the full 20.',
      },
    ],
    steps: [
      { title: 'Map your milestones', body: 'Note the years you will need cash. Payouts land at years 5, 10, 15 and 20, so I check they match your plans.' },
      { title: 'Choose the sum assured', body: 'The payouts are fixed shares of this amount, so choose it based on the cash you want at each point.' },
      { title: 'Pay premiums for 15 years', body: 'Pay yearly, half-yearly, quarterly or monthly. I remind you before each due date.' },
      { title: 'Collect your payouts', body: 'Each payout goes to your bank account. I keep a note of the dates so none is missed.' },
    ],
    optionGroups: [
      {
        title: 'The payout schedule',
        intro: 'Shares of the basic sum assured.',
        items: [
          { name: 'End of year 5', detail: '20% of the sum assured as a survival benefit.' },
          { name: 'End of year 10', detail: '20% of the sum assured as a survival benefit.' },
          { name: 'End of year 15', detail: '20% of the sum assured as a survival benefit.' },
          { name: 'End of year 20', detail: '40% of the sum assured plus vested bonuses and any final additional bonus.', tag: 'Maturity' },
        ],
      },
      {
        title: 'Paying the premium',
        items: [
          { name: 'Yearly or half-yearly', detail: 'Fewer payments to remember.' },
          { name: 'Quarterly or monthly', detail: 'Smaller payments that fit a monthly budget.' },
        ],
      },
    ],
    terms: [
      ['Plan type', 'Non-linked, participating, money-back plan with life cover'],
      ['Entry age', '13 to 50 years'],
      ['Policy term', '20 years'],
      ['Premium paying term', '15 years'],
      ['Maximum age at maturity', '70 years'],
      ['Minimum basic sum assured', '₹1 lakh, in multiples of ₹5,000. No fixed maximum'],
      ['Premium modes', 'Yearly, half-yearly, quarterly or monthly'],
      ['Survival benefit', '20% of the basic sum assured at the end of years 5, 10 and 15'],
      ['Maturity benefit', '40% of the basic sum assured plus vested bonuses and any final additional bonus'],
      ['Death benefit', 'Higher of 10 times the annualised premium or 125% of the basic sum assured, plus vested bonuses and any final additional bonus. Survival benefits already paid are not deducted'],
      ['Loan facility', 'Available once the policy has a surrender value'],
    ],
    riders: [
      { name: 'Accidental Death and Disability Benefit', body: 'Pays an extra amount on accidental death, and a share of it on accidental disability.' },
      { name: 'Accident Benefit', body: 'Pays a benefit on accidental disability. Needs enough premium-paying years remaining.' },
      { name: 'New Term Assurance', body: 'Adds extra pure-protection cover. Must be chosen when you buy the plan.' },
      { name: 'New Critical Illness Benefit', body: 'Pays a sum on diagnosis of a listed serious illness. Must be chosen when you buy the plan.' },
    ],
    suits: [
      'You like the idea of money coming back at planned points',
      'You want life cover to continue after payouts are made',
      'You prefer predictable payouts to market ups and downs',
    ],
    notFor: [
      'You want the largest cover at the lowest cost (look at term)',
      'You want everything paid at the end (look at endowment)',
    ],
    example: {
      name: 'See the payouts',
      text: 'Enter a sum assured to see how much would reach you, and when. These are fixed shares of the sum assured, shown before any bonuses.',
    },
    tax: [
      'Premiums may qualify for a deduction. Payouts and the death benefit are generally tax-free when the conditions of the law are met, for example where the yearly premium stays within a set share of the sum assured.',
      'Tax rules change and depend on your circumstances. Check with a tax adviser before relying on any benefit.',
    ],
    notes: [
      'Bonuses depend on LIC’s performance and are not guaranteed in advance.',
      'Survival payouts are fixed shares of the basic sum assured, so the premium is higher than for a plan that pays everything at the end.',
      'If you stop paying early, the benefits are reduced or the policy can lapse. Ask me before you stop.',
      'Always read the official brochure and policy document, which are the final word on terms and exclusions.',
    ],
    faqs: [
      {
        q: 'How much money do I get back?',
        a: 'In total, 100% of the basic sum assured: 20% at each of years 5, 10 and 15, and 40% at year 20, with any declared bonuses added at the end.',
      },
      {
        q: 'Does my life cover drop after each payout?',
        a: 'No. The death benefit is not reduced by the survival benefits already paid.',
      },
      {
        q: 'Are the bonuses guaranteed?',
        a: 'No. They depend on LIC’s performance. Once a bonus is declared it stays with the policy.',
      },
      {
        q: 'Why do I pay for only 15 years?',
        a: 'The plan lasts 20 years, but premiums are payable for the first 15. Cover continues for the full 20.',
      },
      {
        q: 'Can I borrow against this policy?',
        a: 'Yes, once it has a surrender value, within the limits stated in the policy. I can check the figure for your policy.',
      },
    ],
    related: ['endowment', 'child'],
    compare: { pays: 'At years 5, 10, 15 and 20, or on death', maturity: '40% + bonuses', growth: 'Modest, bonus-linked', risk: 'Low', cover: 'Moderate to high' },
  },

  /* ------------------------------------------------------------- pension */
  pension: {
    id: 'pension',
    product: 'LIC’s Jeevan Akshay VII',
    planNo: 'Plan 857',
    lead: 'An immediate annuity. You pay a one-time purchase price and the income starts straight away, for as long as you live, in the shape you choose.',
    facts: [
      { label: 'Starting age', value: '30 years +', note: 'Upper age depends on the option' },
      { label: 'Minimum purchase price', value: '₹1 lakh' },
      { label: 'Minimum annuity', value: '₹12,000 a year', note: '₹1,000 a month' },
      { label: 'Income starts', value: 'Immediately', note: 'No saving phase' },
    ],
    benefits: [
      {
        icon: Sun,
        title: 'Income for life',
        body: 'Once you buy the annuity, the income keeps coming for as long as you live.',
      },
      {
        icon: Repeat,
        title: 'Ten ways to take it',
        body: 'Lifetime only, with a guaranteed period, with the purchase price returned, rising each year, or joint income for you and your spouse.',
      },
      {
        icon: Lock,
        title: 'Return of purchase price',
        body: 'Some options pay the amount you used to buy the annuity back to your nominee after you pass away.',
      },
      {
        icon: CalendarClock,
        title: 'Monthly, quarterly or yearly',
        body: 'Choose how often the money reaches your bank account, to match how you budget.',
      },
      {
        icon: HeartHandshake,
        title: 'Protect your spouse',
        body: 'Joint-life options keep the income going to your spouse after you, at half or the full amount.',
      },
      {
        icon: Landmark,
        title: 'Loan on selected options',
        body: 'The options that return the purchase price also allow a loan against the policy after the first months.',
      },
    ],
    steps: [
      { title: 'Decide the purchase price', body: 'This is the lump sum you use to buy the annuity, for example money from a maturing policy or retirement savings. The minimum is ₹1 lakh.' },
      { title: 'Choose your annuity option', body: 'I explain all ten options and show which one suits your family. The choice cannot be changed later.' },
      { title: 'Pick how often to be paid', body: 'Monthly, quarterly, half-yearly or yearly, from the start of the policy.' },
      { title: 'Receive income', body: 'Payments arrive in your bank account on the schedule you chose, for life or for the period your option provides.' },
    ],
    optionGroups: [
      {
        title: 'Annuity options',
        intro: 'You choose one when you buy the plan.',
        items: [
          { name: 'A. Life annuity', detail: 'Income for as long as you live. Nothing is paid after you.', tag: 'Highest income' },
          { name: 'B to E. Life with a guaranteed period', detail: 'Guaranteed for 5, 10, 15 or 20 years and then for life. If you pass away within the period, your nominee receives the income until it ends.' },
          { name: 'F. Life, with return of purchase price', detail: 'Lifetime income, and the purchase price goes to your nominee after you.', tag: 'Leaves a legacy' },
          { name: 'G. Increasing life annuity', detail: 'Starts lower and rises 3% each year, to help with rising costs.' },
          { name: 'H. Joint life, 50% to the survivor', detail: 'Full income while you live, and half of it continues to your spouse after you.' },
          { name: 'I. Joint life, 100% to the survivor', detail: 'The full income continues as long as either of you is alive.' },
          { name: 'J. Joint life, with return of purchase price', detail: 'Full income to the survivor, and the purchase price to your nominee after both of you.' },
        ],
      },
      {
        title: 'How often you are paid',
        items: [
          { name: 'Monthly', detail: 'Closest to a salary. Minimum ₹1,000 a month.' },
          { name: 'Quarterly', detail: 'Minimum ₹3,000 a quarter.' },
          { name: 'Half-yearly', detail: 'Minimum ₹6,000 each half-year.' },
          { name: 'Yearly', detail: 'Minimum ₹12,000 a year.' },
        ],
      },
    ],
    terms: [
      ['Plan type', 'Non-linked, non-participating, single-premium immediate annuity'],
      ['Starting age', '30 years and above, with the upper limit depending on the option'],
      ['Minimum purchase price', '₹1,00,000, which may need to be higher to reach the minimum annuity'],
      ['Maximum purchase price', 'No limit'],
      ['Minimum annuity', '₹1,000 a month, ₹3,000 a quarter, ₹6,000 half-yearly or ₹12,000 a year'],
      ['Income frequency', 'Monthly, quarterly, half-yearly or yearly'],
      ['Annuity rate', 'Fixed when you buy, for the whole life of the policy'],
      ['Changing the option', 'Not allowed after the policy starts'],
      ['Loan', 'Only on the return-of-purchase-price options, after the free-look period or three months'],
      ['Surrender', 'Only on the return-of-purchase-price options'],
    ],
    riders: [],
    suits: [
      'You have a lump sum and want a steady income from it',
      'You do not want to manage withdrawals from savings yourself',
      'You want income that continues for your spouse',
    ],
    notFor: [
      'You are still building your fund and want to invest regularly',
      'You may need the lump sum back for emergencies',
    ],
    example: {
      name: 'Estimate the income',
      text: 'Enter a purchase price and your age to see an illustrative yearly income. Actual annuity rates are set by LIC for each option, age and date, so ask me for an exact figure.',
    },
    tax: [
      'The annuity you receive is generally taxed as income in the year you receive it, at your applicable rate. Some purchases may qualify for a deduction, depending on current law.',
      'Tax rules change and depend on your circumstances. Check with a tax adviser before relying on any benefit.',
    ],
    notes: [
      'The annuity rate is fixed at purchase. Buying when rates are higher means a higher income for life.',
      'The option you choose cannot be changed later, so choose carefully with your family in mind.',
      'Inflation reduces what a fixed income buys. Consider the increasing option if that worries you.',
      'Always read the official brochure and policy document, which are the final word on terms and exclusions.',
    ],
    faqs: [
      {
        q: 'What is the purchase price?',
        a: 'It is the lump sum you pay to buy the annuity. A larger purchase price buys a larger income. Some options return it to your nominee.',
      },
      {
        q: 'Does the income start straight away?',
        a: 'Yes. This is an immediate annuity, so payments begin from the start of the policy at the frequency you choose. If you want to save for years before the income starts, ask me about other ways to plan.',
      },
      {
        q: 'Which annuity option should I pick?',
        a: 'A pays the highest income. Add a guaranteed period or return of purchase price if you want your family to benefit if you pass away early. Choose a joint-life option if your spouse relies on the income. I will walk you through it.',
      },
      {
        q: 'Can I change the option later?',
        a: 'No. The option and the annuity rate are fixed when the policy starts.',
      },
      {
        q: 'Can I buy this for someone else?',
        a: 'A lower minimum purchase price applies when buying for a dependant with a disability. Ask me for the details.',
      },
    ],
    related: ['endowment', 'child'],
    compare: { pays: 'Regular income, starting immediately', maturity: 'An annuity (income)', growth: 'Fixed at purchase', risk: 'Low', cover: 'Limited' },
  },

  /* --------------------------------------------------------------- child */
  child: {
    id: 'child',
    product: 'LIC’s Amritbaal',
    planNo: 'Plan 874',
    lead: 'A savings plan for your child’s future. Guaranteed additions build the maturity amount every year, and you pay for only a few years.',
    facts: [
      { label: 'Child’s age at entry', value: '30 days–13 years' },
      { label: 'Maturity age', value: '18–25 years' },
      { label: 'Minimum cover', value: '₹2 lakh', note: 'No upper limit' },
      { label: 'Guaranteed additions', value: '₹80 per ₹1,000', note: 'Every policy year' },
    ],
    benefits: [
      {
        icon: TrendingUp,
        title: 'Guaranteed additions',
        body: 'Every policy year, ₹80 per ₹1,000 of basic sum assured is added while the policy is in force. You know the build-up from day one.',
      },
      {
        icon: GraduationCap,
        title: 'Money when the child needs it',
        body: 'The plan matures when your child is between 18 and 25, timed for college, a course or a first business.',
      },
      {
        icon: CalendarClock,
        title: 'Pay for only a few years',
        body: 'Pay a single premium, or for 5, 6 or 7 years, and stay covered until maturity.',
      },
      {
        icon: Wallet,
        title: 'Lump sum or instalments',
        body: 'Take the maturity amount at once, or spread it over 5, 10 or 15 years to cover yearly fees.',
      },
      {
        icon: ShieldCheck,
        title: 'Cover on the child’s life',
        body: 'The child is the life assured, and the plan carries a death benefit during the term, as set out in the policy.',
      },
      {
        icon: BadgeCheck,
        title: 'Non-market-linked',
        body: 'The benefits are fixed in the policy, with no investment risk to you.',
      },
    ],
    steps: [
      { title: 'Pick the goal year', body: 'The child’s age and the year you need the money decide the policy term and maturity age.' },
      { title: 'Choose the amount and payment term', body: 'Select the sum assured, and either a single premium or 5, 6 or 7 years of premiums.' },
      { title: 'Pay on schedule', body: 'Guaranteed additions accrue each year while the policy is in force, so I remind you before each due date.' },
      { title: 'Collect at maturity', body: 'Receive the sum assured plus the guaranteed additions, as a lump sum or in instalments.' },
    ],
    optionGroups: [
      {
        title: 'How long you pay',
        items: [
          { name: 'Single premium', detail: 'One payment at the start. Nothing more to remember.' },
          { name: '5, 6 or 7-year limited pay', detail: 'A shorter payment period, with cover until maturity.' },
        ],
      },
      {
        title: 'Policy term',
        items: [
          { name: 'Limited pay', detail: 'At least 10 years and at most 25 years, with maturity when the child is 18 to 25.' },
          { name: 'Single premium', detail: 'At least 5 years and at most 25 years, with maturity when the child is 18 to 25.' },
        ],
      },
      {
        title: 'Maturity payout',
        items: [
          { name: 'Lump sum', detail: 'The full amount when the child reaches the maturity age.' },
          { name: 'Instalments', detail: 'Over 5, 10 or 15 years through the settlement options.' },
        ],
      },
    ],
    terms: [
      ['Plan type', 'Non-linked, non-participating, endowment plan for children'],
      ['Child’s age at entry', '30 days completed to 13 years'],
      ['Maturity age', '18 to 25 years'],
      ['Premium payment term', 'Single premium, or limited pay of 5, 6 or 7 years'],
      ['Policy term', 'At least 10 years for limited pay, 5 years for single premium, at most 25 years'],
      ['Minimum basic sum assured', '₹2 lakh. No fixed maximum'],
      ['Guaranteed additions', '₹80 per ₹1,000 of basic sum assured at the end of each policy year while the policy is in force'],
      ['Maturity benefit', 'Basic sum assured plus guaranteed additions'],
      ['Settlement options', 'Maturity amount in instalments over 5, 10 or 15 years'],
      ['Death benefit and riders', 'As set out in the policy document. I will go through them with you'],
    ],
    riders: [],
    suits: [
      'You are planning for school, college or a first business',
      'You want a known, guaranteed build-up with no market risk',
      'You prefer to pay for only a few years',
    ],
    notFor: [
      'You want market-linked growth',
      'You only need cover for yourself (look at term)',
    ],
    example: {
      name: 'A sample case',
      text: 'Karan is 32 and has a newborn daughter. He wants a plan that matures when she is 18, with a ₹25 lakh sum assured. This is an illustrative estimate, not LIC’s rate.',
      calc: { age: 32, term: 18, amount: 25_00_000 },
      closing: 'At 18, his daughter receives ₹25 lakh plus the guaranteed additions, which at ₹80 per ₹1,000 come to ₹2 lakh for every year the policy runs. Ask me for the exact quotation.',
    },
    tax: [
      'Premiums may qualify for a deduction. The death benefit is generally tax-free for the nominee. Maturity proceeds are tax-free only when the plan meets the conditions of the law, such as a minimum ratio of sum assured to premium.',
      'Tax rules change and depend on your circumstances. Check with a tax adviser before relying on any benefit.',
    ],
    notes: [
      'Guaranteed additions apply only while the policy is in force, so keep premiums up to date.',
      'Ending the plan early may return less than you have paid.',
      'For a very young child, the full cover can begin after a short waiting period. Ask me for the exact rule.',
      'Always read the official brochure and policy document, which are the final word on terms and exclusions.',
    ],
    faqs: [
      {
        q: 'Who is the life assured?',
        a: 'The child. You, the parent or guardian, pay the premiums.',
      },
      {
        q: 'What are guaranteed additions?',
        a: 'A fixed amount, ₹80 for every ₹1,000 of basic sum assured, added at the end of each policy year while the policy is in force. They are paid at maturity along with the sum assured.',
      },
      {
        q: 'When does the plan mature?',
        a: 'When your child reaches the maturity age, between 18 and 25. The term is set so that this falls in the year you need the money.',
      },
      {
        q: 'Can I start the plan for a teenager?',
        a: 'Yes, up to age 13 at entry. The term must be long enough for the child to reach a maturity age of at least 18.',
      },
      {
        q: 'Can the money be paid in parts?',
        a: 'Yes. Choose instalments over 5, 10 or 15 years to cover costs such as annual college fees.',
      },
    ],
    related: ['moneyback', 'endowment'],
    compare: { pays: 'At maturity (child 18–25), or on death', maturity: 'Sum assured + guaranteed additions', growth: 'Fixed, known additions', risk: 'Low', cover: 'Moderate' },
  },
}

/** Quick "what do you want to do?" chooser for the plans page. */
export const GOALS: Array<{ goal: string; plan: PlanId }> = [
  { goal: 'Save for a goal with a date', plan: 'endowment' },
  { goal: 'Get cash back along the way', plan: 'moneyback' },
  { goal: 'Turn savings into income', plan: 'pension' },
  { goal: 'Fund my child’s education', plan: 'child' },
]
