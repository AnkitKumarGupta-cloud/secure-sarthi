import type { PlanId } from './content'

/**
 * One page per named LIC plan, so people searching for a plan by name ("Jeevan Anand 715") find it.
 *
 * Figures come from LIC's current plan listing and the plan's sales brochure or circular. Plan numbers
 * changed for many plans on 1 October 2024 (for example 915 became 715), so pages use the current numbers
 * and mention the old one for people who search by it. Where public sources disagree on a figure after the
 * 2024 revision, the page leaves the number out and says I will confirm it, rather than guess.
 */

export interface NamedPlan {
  slug: string
  name: string
  planNo: string
  oldPlanNo?: string
  uin: string
  category: PlanId
  /** Short plain-words description of the plan type. */
  kind: string
  lead: string
  facts: Array<{ label: string; value: string; note?: string }>
  how: string[]
  terms: Array<[string, string]>
  suits: string[]
  notFor: string[]
  faqs: Array<{ q: string; a: string }>
}

const LIC_LIST: Record<PlanId, string> = {
  endowment: 'https://licindia.in/endowment-plans',
  moneyback: 'https://licindia.in/money-back-plans',
  pension: 'https://licindia.in/pension-plan',
  child: 'https://licindia.in/money-back-plans',
}

export const officialListFor = (p: NamedPlan) => (p.slug === 'jeevan-umang' ? 'https://licindia.in/whole-life-plans' : LIC_LIST[p.category])

export const NAMED_PLANS: NamedPlan[] = [
  /* ---------------------------------------------------------------- endowment */
  {
    slug: 'new-jeevan-anand',
    name: 'LIC’s New Jeevan Anand',
    planNo: '715',
    oldPlanNo: '915',
    uin: '512N279V03',
    category: 'endowment',
    kind: 'Endowment plan with life cover that continues after maturity',
    lead: 'Save for a goal with bonuses on top, and keep a life cover of the basic sum assured even after the policy matures.',
    facts: [
      { label: 'Entry age', value: '18–50 years' },
      { label: 'Policy term', value: '15–35 years', note: 'Matures by age 75' },
      { label: 'Minimum cover', value: '₹2 lakh', note: 'No upper limit' },
      { label: 'After maturity', value: 'Cover continues', note: 'Basic sum assured on death' },
    ],
    how: [
      'You pay premiums for the whole policy term, yearly, half-yearly, quarterly or monthly.',
      'LIC may declare bonuses each year. Once declared, they are added to your policy and cannot be taken away.',
      'At maturity you receive the basic sum assured plus the bonuses added and any final additional bonus.',
      'After maturity, your family still receives the basic sum assured whenever you pass away. This lifelong cover is what sets Jeevan Anand apart from a plain endowment plan.',
    ],
    terms: [
      ['Plan number / UIN', '715 / 512N279V03 (replaced plan 915 from 1 October 2024)'],
      ['Entry age', '18 years completed to 50 years (nearer birthday)'],
      ['Policy term', '15 to 35 years, ending by age 75'],
      ['Minimum basic sum assured', '₹2,00,000. No fixed maximum'],
      ['Death during the term', 'Higher of 125% of the basic sum assured or 7 times the annual premium, plus bonuses; never less than 105% of premiums paid'],
      ['Death after maturity', 'Basic sum assured'],
      ['Maturity benefit', 'Basic sum assured plus vested bonuses and any final additional bonus'],
      ['Loan and surrender', 'Available after the first policy year, once a full year’s premium is paid'],
      ['Riders', 'Accidental death and disability, accident benefit, and term assurance riders (at most two). No critical illness rider'],
    ],
    suits: ['You want savings for a goal and lifelong cover from one policy', 'You prefer steady, low-risk growth through bonuses', 'You are between 18 and 50'],
    notFor: ['You need high life cover at a low cost. A term plan does that better', 'You want premiums to stop early. Look at Jeevan Labh'],
    faqs: [
      { q: 'Is New Jeevan Anand 715 the same as 915?', a: 'It is the revised version. LIC withdrew plan 915 on 1 October 2024 and launched 715 with a higher minimum sum assured (₹2 lakh), revised premiums and earlier surrender and loan eligibility. Existing 915 policies continue on their own terms.' },
      { q: 'What happens after a Jeevan Anand policy matures?', a: 'You receive the maturity benefit, and the basic sum assured stays as life cover for the rest of your life. Your nominee receives it whenever you pass away, without any further premiums.' },
      { q: 'Are Jeevan Anand bonuses guaranteed?', a: 'Not in advance. LIC declares bonuses each year based on its results. Once a bonus is declared and added to your policy, it is guaranteed.' },
      { q: 'Can I take a loan on Jeevan Anand?', a: 'Yes. Once one full year’s premium is paid you can borrow against the policy’s surrender value, within the limits LIC sets.' },
    ],
  },
  {
    slug: 'jeevan-labh',
    name: 'LIC’s Jeevan Labh',
    planNo: '736',
    oldPlanNo: '936',
    uin: '512N304V03',
    category: 'endowment',
    kind: 'Limited-premium endowment plan',
    lead: 'Pay for 10, 15 or 16 years while your cover and bonuses run for 16, 21 or 25 years. One of LIC’s most popular savings plans.',
    facts: [
      { label: 'Entry age', value: '8–59 years', note: 'Upper age depends on the term' },
      { label: 'Term / pay for', value: '16/10, 21/15, 25/16', note: 'Years' },
      { label: 'Minimum cover', value: '₹2 lakh', note: 'No upper limit' },
      { label: 'At maturity', value: 'Sum assured + bonuses', note: 'Bonuses are not guaranteed' },
    ],
    how: [
      'Choose one of three combinations: a 16-year policy paid for 10 years, 21 years paid for 15, or 25 years paid for 16.',
      'Premiums stop early, but the policy keeps running and keeps earning any bonuses LIC declares.',
      'At maturity you receive the basic sum assured plus the bonuses added and any final additional bonus.',
      'If you pass away during the term, your family receives the death benefit plus the bonuses added so far.',
    ],
    terms: [
      ['Plan number / UIN', '736 / 512N304V03 (replaced plan 936 from 1 October 2024)'],
      ['Entry age', '8 years completed; at most 59 (16-year term), 54 (21-year term) or 50 (25-year term)'],
      ['Policy term / premium paying term', '16/10, 21/15 or 25/16 years'],
      ['Maximum age at maturity', '75 years'],
      ['Minimum basic sum assured', '₹2,00,000. No fixed maximum'],
      ['Maturity benefit', 'Basic sum assured plus vested bonuses and any final additional bonus'],
      ['Riders', 'Accident and term riders are available at extra cost'],
    ],
    suits: ['You want to finish paying while you are still earning', 'You are saving for a child’s education or your own retirement', 'You want a disciplined, low-risk savings habit'],
    notFor: ['You need high life cover cheaply. Pair a term plan instead', 'You want market-linked growth'],
    faqs: [
      { q: 'What is the difference between Jeevan Labh 736 and 936?', a: 'Plan 736 is the revised version launched on 1 October 2024 after plan 936 was withdrawn. Premiums were revised, and surrender and paid-up rules changed to follow the new regulations. Existing 936 policies continue unchanged.' },
      { q: 'Which Jeevan Labh term should I choose?', a: 'Match it to when you need the money and how long you can pay. The 25-year option gives the longest run for bonuses but needs 16 years of premiums. I can show the numbers for each option at your age.' },
      { q: 'Can I buy Jeevan Labh for my child?', a: 'Yes. The minimum entry age is 8 years, so a parent can take it on a child’s life for a long-term goal.' },
    ],
  },
  /* ---------------------------------------------------------------- money back */
  {
    slug: 'new-money-back-25-years',
    name: 'LIC’s New Money Back Plan – 25 Years',
    planNo: '721',
    oldPlanNo: '921',
    uin: '512N278V03',
    category: 'moneyback',
    kind: 'Money back plan with payouts every five years',
    lead: 'Receive 15% of the sum assured every five years, and the rest with bonuses at the end of 25 years, while you stay covered throughout.',
    facts: [
      { label: 'Entry age', value: '13–45 years' },
      { label: 'Policy term', value: '25 years', note: 'Pay for 20 years' },
      { label: 'Money back', value: '15% × 4, then 40%', note: 'Years 5, 10, 15, 20 and 25' },
      { label: 'At maturity', value: '40% + bonuses', note: 'Bonuses are not guaranteed' },
    ],
    how: [
      'You pay premiums for 20 years; the policy runs for 25.',
      'At the end of years 5, 10, 15 and 20, LIC pays you 15% of the basic sum assured.',
      'At the end of year 25 you receive the remaining 40% plus the bonuses added and any final additional bonus.',
      'If you pass away during the term, your family receives the full death benefit plus bonuses. Payouts already made are not deducted.',
    ],
    terms: [
      ['Plan number / UIN', '721 / 512N278V03 (revised from 1 October 2024)'],
      ['Entry age', '13 to 45 years'],
      ['Policy term / premium paying term', '25 / 20 years'],
      ['Maximum age at maturity', '70 years'],
      ['Survival benefit', '15% of the basic sum assured at the end of years 5, 10, 15 and 20'],
      ['Maturity benefit', '40% of the basic sum assured plus vested bonuses and any final additional bonus'],
      ['Minimum basic sum assured', 'I confirm the current minimum when I prepare your quote'],
    ],
    suits: ['You want money at regular intervals for planned expenses', 'You like seeing returns along the way', 'You are between 13 and 45'],
    notFor: ['You want the largest possible lump sum at the end', 'You need high cover at low cost'],
    faqs: [
      { q: 'How much does the 25-year money back plan pay, and when?', a: '15% of the basic sum assured at the end of years 5, 10, 15 and 20, then 40% plus bonuses at year 25. For ₹5 lakh of cover that is ₹75,000 every five years, then ₹2 lakh plus bonuses.' },
      { q: 'If I die after receiving payouts, does my family get less?', a: 'No. The death benefit is paid in full along with bonuses; earlier survival payouts are not deducted.' },
      { q: 'Should I choose the 20-year or 25-year money back plan?', a: 'The 20-year plan pays 20% every five years over a shorter term; the 25-year plan pays 15% over a longer term with 20 years of premiums. It depends on when you need the money. See the 20-year plan on the money back page.' },
    ],
  },
  /* ---------------------------------------------------------------- child */
  {
    slug: 'new-childrens-money-back',
    name: 'LIC’s New Children’s Money Back Plan',
    planNo: '732',
    oldPlanNo: '932',
    uin: '512N296V03',
    category: 'child',
    kind: 'Child plan with payouts at ages 18, 20 and 22',
    lead: 'Plan for college and early career costs: the policy pays 20% of the sum assured when your child turns 18, 20 and 22, and the rest with bonuses at 25.',
    facts: [
      { label: 'Child’s age at entry', value: '0–12 years' },
      { label: 'Matures at', value: 'Age 25', note: 'Term is 25 minus entry age' },
      { label: 'Money back', value: '20% at 18, 20, 22' },
      { label: 'At 25', value: '40% + bonuses', note: 'Bonuses are not guaranteed' },
    ],
    how: [
      'A parent or grandparent takes the policy on the child’s life. The earlier you start, the lower the premium.',
      'When the child reaches 18, 20 and 22, LIC pays 20% of the basic sum assured each time.',
      'At 25 the policy matures and pays the remaining 40% plus bonuses.',
      'You can add the premium waiver benefit rider so premiums stop if the proposer passes away, while the child’s benefits continue.',
    ],
    terms: [
      ['Plan number / UIN', '732 / 512N296V03 (earlier plan 932)'],
      ['Child’s age at entry', '0 to 12 years'],
      ['Policy term', '25 minus the child’s age at entry'],
      ['Minimum basic sum assured', '₹2,00,000. No fixed maximum'],
      ['Survival benefit', '20% of the basic sum assured at ages 18, 20 and 22'],
      ['Maturity benefit', 'Remaining 40% of the basic sum assured plus vested bonuses and any final additional bonus'],
      ['Optional rider', 'Premium waiver benefit rider for the proposer'],
    ],
    suits: ['You want money ready for college fees at 18 and after', 'You prefer a traditional, low-risk plan for your child', 'Your child is 12 or younger'],
    notFor: ['You want guaranteed additions instead of bonuses. Look at Amritbaal', 'You want market-linked growth for a long horizon'],
    faqs: [
      { q: 'When does the Children’s Money Back Plan pay out?', a: '20% of the sum assured at ages 18, 20 and 22, and the remaining 40% plus bonuses at age 25.' },
      { q: 'Who can buy it?', a: 'A parent or grandparent can take the policy for a child aged 0 to 12.' },
      { q: 'What if the parent paying premiums passes away?', a: 'If you add the premium waiver benefit rider, future premiums are waived and the policy continues for the child. Without it, premiums would need to be paid to keep the policy in force.' },
    ],
  },
  {
    slug: 'jeevan-tarun',
    name: 'LIC’s Jeevan Tarun',
    planNo: '734',
    oldPlanNo: '934',
    uin: '512N299V03',
    category: 'child',
    kind: 'Child plan with yearly payouts from age 20 to 24',
    lead: 'Choose how much your child receives each year from age 20 to 24, and how much comes at 25. Premiums end when the child turns 20.',
    facts: [
      { label: 'Child’s age at entry', value: '30 days–12 years' },
      { label: 'Matures at', value: 'Age 25', note: 'Pay until age 20' },
      { label: 'Minimum cover', value: '₹2 lakh', note: 'Raised from ₹75,000' },
      { label: 'Payout options', value: '4 choices', note: '0%, 5%, 10% or 15% a year' },
    ],
    how: [
      'At the start, pick one of four options for yearly payouts between ages 20 and 24: nothing, 5%, 10% or 15% of the sum assured each year.',
      'Premiums are paid until the child turns 20.',
      'At 25 the policy matures. The maturity share is 100%, 75%, 50% or 25% of the sum assured depending on the option, plus bonuses.',
      'The option you choose cannot be changed later, so pick it with the expected college years in mind.',
    ],
    terms: [
      ['Plan number / UIN', '734 / 512N299V03 (revised from plan 934)'],
      ['Child’s age at entry', '30 days completed to 12 years'],
      ['Policy term', '25 minus the child’s age at entry'],
      ['Premium paying term', '20 minus the child’s age at entry'],
      ['Minimum basic sum assured', '₹2,00,000. No fixed maximum'],
      ['Survival benefit (ages 20 to 24)', 'Option 1: nil · Option 2: 5% a year · Option 3: 10% a year · Option 4: 15% a year'],
      ['Maturity benefit (age 25)', 'Option 1: 100% · Option 2: 75% · Option 3: 50% · Option 4: 25% of the sum assured, plus bonuses'],
    ],
    suits: ['You expect costs every year through college, from 20 to 24', 'You want premiums to stop by the time your child is 20', 'Your child is 12 or younger'],
    notFor: ['You need money at 18. The Children’s Money Back Plan pays then', 'You want a fixed, guaranteed amount'],
    faqs: [
      { q: 'Which Jeevan Tarun option should I choose?', a: 'If you want yearly help through college, options 3 or 4 pay more between 20 and 24. If you want the biggest lump sum at 25, option 1 pays everything at maturity. I can show the amounts side by side.' },
      { q: 'What changed in Jeevan Tarun 734?', a: 'In the revised plan, the minimum sum assured went up to ₹2 lakh from ₹75,000 and the minimum entry age came down to 30 days from 90 days.' },
      { q: 'Until when do I pay premiums?', a: 'Until the child turns 20, so a policy started at age 5 needs 15 years of premiums.' },
    ],
  },
  /* ---------------------------------------------------------------- pension / income */
  {
    slug: 'new-jeevan-shanti',
    name: 'LIC’s New Jeevan Shanti',
    planNo: '758',
    oldPlanNo: '858',
    uin: '512N338V08',
    category: 'pension',
    kind: 'Single-premium deferred pension plan',
    lead: 'Pay once now and lock in a guaranteed pension that starts a few years later, for yourself alone or for you and your spouse.',
    facts: [
      { label: 'Entry age', value: '30–79 years' },
      { label: 'Pension starts', value: 'After 1+ years', note: 'You choose the waiting period' },
      { label: 'Minimum investment', value: '₹1.5 lakh', note: 'One-time payment' },
      { label: 'Cover for', value: 'Single or joint life' },
    ],
    how: [
      'You pay a single lump sum, called the purchase price.',
      'You choose how long to wait before the pension starts. The longer you wait, the higher the pension rate.',
      'From then on, LIC pays a fixed pension for life, monthly, quarterly, half-yearly or yearly.',
      'Choose single life, or joint life so the pension continues for your spouse. On death, the nominee receives the amount set out in the policy.',
    ],
    terms: [
      ['Plan number / UIN', '758 / 512N338V08 (earlier plan 858)'],
      ['Entry age', '30 to 79 years'],
      ['Age when the pension starts', '31 to 80 years'],
      ['Waiting (deferment) period', 'At least 1 year; the maximum depends on your age. I confirm it for you'],
      ['Minimum purchase price', '₹1,50,000. No upper limit'],
      ['Minimum pension', '₹1,000 a month, ₹3,000 a quarter, ₹6,000 a half-year or ₹12,000 a year'],
      ['Options', 'Deferred annuity for single life, or for joint life'],
    ],
    suits: ['You will retire in a few years and want the pension fixed now', 'You have a lump sum from savings or a maturing policy', 'You want the pension to continue for your spouse'],
    notFor: ['You need income immediately. Look at Saral Pension or Jeevan Akshay VII', 'You may need the lump sum back soon'],
    faqs: [
      { q: 'Is the Jeevan Shanti pension guaranteed?', a: 'Yes. The pension rate is fixed when you buy the plan and is paid for life once it starts.' },
      { q: 'What is the minimum amount for Jeevan Shanti?', a: '₹1.5 lakh, and it must be enough to give at least the minimum pension of ₹1,000 a month.' },
      { q: 'How is Jeevan Shanti different from Jeevan Akshay VII?', a: 'Jeevan Akshay starts paying immediately. New Jeevan Shanti pays later, after a waiting period you choose, which usually means a higher rate.' },
    ],
  },
  {
    slug: 'saral-pension',
    name: 'LIC’s Saral Pension',
    planNo: '862',
    uin: '512N342V05',
    category: 'pension',
    kind: 'Single-premium immediate pension plan',
    lead: 'A simple, standard pension: pay once and start receiving income right away for life, with your money returned to your family afterwards.',
    facts: [
      { label: 'Entry age', value: '40–80 years' },
      { label: 'Pension starts', value: 'Immediately' },
      { label: 'Minimum pension', value: '₹1,000 a month' },
      { label: 'Cover for', value: 'Single or joint life' },
    ],
    how: [
      'You pay a single lump sum and your pension starts straight away.',
      'The pension is fixed for life and paid monthly, quarterly, half-yearly or yearly.',
      'When the pensioner passes away (or the last of a couple, under joint life), the purchase price is returned to the nominee.',
      'Saral Pension follows a standard design that every insurer offers in the same form, so it is easy to compare.',
    ],
    terms: [
      ['Plan number / UIN', '862 / 512N342V05'],
      ['Entry age', '40 to 80 years'],
      ['Premium', 'Single premium (purchase price)'],
      ['Minimum pension', '₹1,000 a month, ₹3,000 a quarter, ₹6,000 a half-year or ₹12,000 a year'],
      ['Options', 'Life annuity with return of purchase price, for single life or joint life'],
    ],
    suits: ['You have retired or are about to', 'You want income now and your capital passed to family later', 'You want something simple and standard'],
    notFor: ['You want the pension to start later. Look at New Jeevan Shanti', 'You need flexible access to your lump sum'],
    faqs: [
      { q: 'What is LIC Saral Pension?', a: 'A standard immediate pension. You pay once, receive a fixed pension for life, and the amount you paid goes back to your nominee on death.' },
      { q: 'Who can buy Saral Pension?', a: 'Anyone aged 40 to 80. You can choose single life or joint life with your spouse.' },
      { q: 'Saral Pension or Jeevan Akshay VII?', a: 'Jeevan Akshay offers more pension options and a wider age range; Saral Pension is a simpler standard product. I compare the actual rates for your age before you decide.' },
    ],
  },
  {
    slug: 'jeevan-umang',
    name: 'LIC’s Jeevan Umang',
    planNo: '745',
    oldPlanNo: '945',
    uin: '512N312V03',
    category: 'pension',
    kind: 'Whole life plan with yearly income until age 100',
    lead: 'Pay for 15 to 30 years, then receive 8% of the sum assured every year for life, with cover until age 100 and a lump sum at the end.',
    facts: [
      { label: 'Yearly income', value: '8% of sum assured', note: 'From the end of the premium term' },
      { label: 'Cover until', value: 'Age 100' },
      { label: 'Pay for', value: '15, 20, 25 or 30 years' },
      { label: 'Minimum cover', value: '₹2 lakh', note: 'No upper limit' },
    ],
    how: [
      'Choose to pay premiums for 15, 20, 25 or 30 years.',
      'Once premiums end, LIC pays 8% of the basic sum assured every year for as long as you live, up to age 99.',
      'At 100, the policy matures and pays the basic sum assured plus bonuses.',
      'If you pass away during the policy, your family receives the death benefit plus bonuses.',
    ],
    terms: [
      ['Plan number / UIN', '745 / 512N312V03 (replaced plan 945 from 1 October 2024)'],
      ['Entry age', 'From infancy (30 days) up to 55 years; the upper age depends on the premium term'],
      ['Premium paying term', '15, 20, 25 or 30 years'],
      ['Policy term', '100 minus your age at entry'],
      ['Minimum basic sum assured', '₹2,00,000. No fixed maximum'],
      ['Survival benefit', '8% of the basic sum assured every year after the premium term ends'],
      ['Maturity benefit (age 100)', 'Basic sum assured plus vested bonuses and any final additional bonus'],
    ],
    suits: ['You want a lifelong yearly income for retirement', 'You want to leave a lump sum to your family', 'You can commit to premiums for 15 years or more'],
    notFor: ['You need the money back within 10 to 15 years', 'You mainly need high life cover. A term plan costs far less'],
    faqs: [
      { q: 'Does Jeevan Umang give 8% returns?', a: 'No. It pays 8% of the sum assured each year after premiums end, which is not the same as an 8% return on what you paid. The effective return is lower. I can show the actual cash flows for your age.' },
      { q: 'When does Jeevan Umang income start?', a: 'At the end of the premium-paying term. If you choose 20 years, the first 8% payout comes after year 20, and continues every year after that.' },
      { q: 'What changed between Jeevan Umang 745 and 945?', a: 'Plan 945 was withdrawn on 1 October 2024 and replaced with 745, with revised premiums and surrender rules. Existing 945 policies continue unchanged.' },
    ],
  },
]

export const namedPlansIn = (category: PlanId) => NAMED_PLANS.filter((p) => p.category === category)
export const findNamedPlan = (slug: string) => NAMED_PLANS.find((p) => p.slug === slug)
