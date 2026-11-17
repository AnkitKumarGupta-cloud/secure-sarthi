import type { PlanId } from './content'
import { BadgeCheck, Banknote, Clock, Compass, Eye, Handshake, HeartHandshake, Headset, Mail, MessageCircle, PhoneCall, ShieldCheck, Sprout, type LucideIcon } from 'lucide-react'

/** Extra copy for the claims, about and contact pages. */

export const CLAIM_EXTRA_DOCUMENTS = [
  {
    heading: 'Accident or disability rider',
    items: [
      'Claim form signed by the policyholder or nominee',
      'FIR or police report, where the law requires one',
      'Medical records and a doctor’s certificate',
      'For disability: a disability certificate from a recognised authority',
      'Photo ID and cancelled cheque',
    ],
  },
  {
    heading: 'Critical illness rider',
    items: [
      'Claim form with the treating doctor’s statement',
      'Diagnosis report and test results confirming the listed illness',
      'Hospital discharge summary',
      'Photo ID and cancelled cheque',
    ],
  },
  {
    heading: 'Pension: starting your income',
    items: [
      'Annuity option form, signed',
      'Proof of age',
      'Photo ID, PAN card and address proof',
      'Cancelled cheque for the income account',
    ],
  },
]

export const CLAIM_PROMISES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Clock, title: 'Quick first response', body: 'Call or message me as soon as a claim arises and I will tell you the next step the same day.' },
  { icon: Eye, title: 'One complete list', body: 'I check your documents against the checklist so the file goes in complete, not piece by piece.' },
  { icon: Banknote, title: 'Paid by LIC', body: 'LIC pays the approved amount directly to the claimant’s bank account.' },
  { icon: Headset, title: 'I follow up', body: 'I stay in touch with the branch and keep you updated until the claim is settled.' },
]

export const CLAIM_FAQS = [
  {
    q: 'Who can make a death claim?',
    a: 'The nominee named in the policy, or the legal heir if there is no valid nominee. Keeping nominee details up to date is the single most useful thing a policyholder can do. I can help you update yours.',
  },
  {
    q: 'I did not buy my policy through you. Can you still help?',
    a: 'Yes. I help existing policyholders with claims and servicing even if I was not their original agent. Call me with the policy number.',
  },
  {
    q: 'How long does a claim take?',
    a: 'It depends on the claim and how complete the documents are. A complete file moves fastest. Claims that need an investigation, for example a death in the first years of a policy, can take longer.',
  },
  {
    q: 'What if my claim is rejected?',
    a: 'LIC gives the reasons in writing. Tell me and I will help you ask for a review and, if needed, take it to the grievance channels or the Insurance Ombudsman.',
  },
  {
    q: 'Do I need the original policy document?',
    a: 'Usually yes. If it is lost, tell me early. A duplicate can be requested and the claim can be prepared in the meantime.',
  },
]

export const STATUS_HELP = [
  'Your policy number and the claimant’s name',
  'The date you submitted the claim, and the branch you submitted it to',
  'Any claim or acknowledgement number you were given',
]

export const ABOUT_STORY = [
  'Secure Sarthi is an independent insurance advisory service. I am an authorized LIC agent, and I work for my clients, not for a call centre.',
  'Choosing a plan can feel confusing, and what comes after the sale matters just as much: premium dates, nominations, loans, revivals and claims. That is why I stay available to my clients long after the policy is issued.',
  'You deal with me directly. There is no rotating team and no different agent each time you have a question, so you never have to explain your situation twice.',
]

export const PRINCIPLES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Handshake, title: 'Explain before I suggest', body: 'I walk you through what a plan does, what it costs and what it does not cover.' },
  { icon: Compass, title: 'Right plan, right size', body: 'I would rather recommend the cover you need than the biggest cover I can sell.' },
  { icon: ShieldCheck, title: 'Claims are what matter', body: 'A policy is only as good as the day it is claimed, so I prepare you for that day.' },
  { icon: Sprout, title: 'Built for the long term', body: 'Plans are for decades, so I look at them through every stage of your life.' },
  { icon: BadgeCheck, title: 'Nothing hidden', body: 'Charges, exclusions and waiting periods are explained up front.' },
  { icon: HeartHandshake, title: 'Treat people like family', body: 'A claim is often the hardest day of someone’s year. I behave accordingly.' },
]

export const CONTACT_CHANNELS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: PhoneCall, title: 'Call me', body: 'The quickest way to get an answer.' },
  { icon: MessageCircle, title: 'WhatsApp', body: 'Send your question or a photo of your policy, and I will reply when I can.' },
  { icon: Mail, title: 'Email', body: 'Write to me with details and I will get back to you.' },
]

export const CONTACT_TOPICS = ['Choosing a plan', 'An existing policy', 'Making a claim', 'Something else']

/**
 * Real client quotes only, and only with the client's permission.
 * Add entries like { quote: '…', name: 'Ramesh K.', place: 'Bengaluru' } and the cards appear on the home page.
 */
export const TESTIMONIALS: Array<{ quote: string; name: string; place?: string }> = []



/** "I want to…" goals on the home page. Each points to the plans that fit. */
export const GOAL_TABS: Array<{ id: string; label: string; line: string; plans: PlanId[] }> = [
  { id: 'family', label: 'Protect my family', line: 'Make sure the people who depend on you are looked after if you are not there.', plans: ['endowment', 'moneyback'] },
  { id: 'savings', label: 'Save for a goal', line: 'Build a fund for a house, a wedding or any date you can plan for.', plans: ['endowment', 'moneyback'] },
  { id: 'child', label: 'Child’s future', line: 'Start early for education and milestones, with cover for the parent.', plans: ['child', 'endowment'] },
  { id: 'retire', label: 'Retirement income', line: 'Turn what you have saved into a regular income for life.', plans: ['pension'] },
]
