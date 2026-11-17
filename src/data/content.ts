import {
  Baby,
  BadgeCheck,
  Coins,
  BookOpenCheck,
  Building2,
  FileSearch,
  FileText,
  Handshake,
  Bell,
  Compass,
  RotateCcw,
  UserCheck,
  Wallet,
  Headset,
  HeartHandshake,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Sprout,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { CalcPlanId } from '../lib/premium'

export const BRAND = {
  name: 'Secure Sarthi',
  hindi: 'सिक्योर सारथी',
  tagline: 'Secure Your Tomorrow, With the Right Guidance',
  descriptor: 'Independent LIC Insurance Advisory',
  email: 'SecureSarthi@gmail.com',
  phone: '+91 86608 13472',
  phoneHref: 'tel:+918660813472',
  whatsapp: 'https://wa.me/918660813472',
  disclaimer:
    'Secure Sarthi is an independent LIC insurance advisory service. I am an authorized LIC agent, not an employee of LIC, and this website is not an official LIC platform.',
}

export type PlanId = 'endowment' | 'moneyback' | 'pension' | 'child'

export interface Plan {
  id: PlanId
  title: string
  short: string
  icon: LucideIcon
  tint: string
  iconTint: string
  calcPlan: CalcPlanId | null
  summary: string
  features: string[]
  goodFor: string
  entryAge: string
  term: string
}

export const PLANS: Plan[] = [
  {
    id: 'endowment',
    title: 'Endowment Plans',
    short: 'Protection + savings for a secure future.',
    icon: PiggyBank,
    tint: 'bg-pastel-cream',
    iconTint: 'bg-[#ffecc2] text-[#9a6a00]',
    calcPlan: 'savings',
    summary:
      'Life cover and disciplined saving in one plan. You receive the sum assured and bonuses at maturity, or your family receives the death benefit if you pass away during the term.',
    features: ['Lump sum with bonuses at maturity', 'Bonuses are added over the policy term', 'Loan facility once the policy qualifies'],
    goodFor: 'Goal-based saving for a home, a wedding or a business',
    entryAge: '8 to 50 years',
    term: '12 to 35 years',
  },
  {
    id: 'moneyback',
    title: 'Money Back Plans',
    short: 'Regular payouts while you stay covered.',
    icon: Coins,
    tint: 'bg-pastel-mint',
    iconTint: 'bg-[#cdeedd] text-[#1d7a4c]',
    calcPlan: null,
    summary:
      'Get part of your sum assured back at fixed points during the policy, with the balance and bonuses at the end. Full life cover continues throughout.',
    features: ['20% of the sum assured paid at years 5, 10 and 15', '40% plus bonuses paid at maturity', 'Death benefit is not reduced by payouts already made'],
    goodFor: 'People who want cash coming back at planned milestones',
    entryAge: '13 to 50 years',
    term: '20 years',
  },
  {
    id: 'pension',
    title: 'Pension Plans',
    short: 'A worry-free retirement life.',
    icon: HeartHandshake,
    tint: 'bg-pastel-lilac',
    iconTint: 'bg-[#efdcfa] text-[#7a3aa8]',
    calcPlan: null,
    summary:
      'Turn your savings into a regular income that starts straight away and keeps coming for as long as you live, with options to protect your spouse or return the purchase price.',
    features: ['Monthly, quarterly, half-yearly or yearly income', 'Ten annuity options, including joint life', 'Income for life, with the choice of guaranteed periods'],
    goodFor: 'Anyone with retirement savings who wants a steady income',
    entryAge: '30 years and above',
    term: 'For life',
  },
  {
    id: 'child',
    title: 'Child Plans',
    short: 'Help them dream bigger.',
    icon: Baby,
    tint: 'bg-pastel-periwinkle',
    iconTint: 'bg-[#dedcff] text-[#4b44c4]',
    calcPlan: 'child',
    summary:
      'Save for milestones like college. Guaranteed additions build the maturity amount year by year, and you pay for only a few years.',
    features: ['Guaranteed additions every policy year', 'Pay for 5, 6 or 7 years, or once', 'Maturity when the child is 18 to 25'],
    goodFor: 'Parents planning for education and early adulthood',
    entryAge: 'Child aged 30 days to 13 years',
    term: '10 to 25 years',
  },
]

export type ClaimTopicId = 'process' | 'documents' | 'track'

export const CLAIM_TOPICS: Array<{ id: ClaimTopicId; title: string; blurb: string; icon: LucideIcon }> = [
  { id: 'process', title: 'How to make a claim', blurb: 'Four steps from first call to settlement', icon: FileText },
  { id: 'documents', title: 'Documents checklist', blurb: 'What to keep ready for each claim type', icon: BookOpenCheck },
  { id: 'track', title: 'Claim status help', blurb: 'Find out where your claim stands', icon: FileSearch },
]

export const CLAIM_STEPS = [
  { title: 'Call me', body: 'Tell me the policy number and what happened. I explain which claim applies and what is needed.' },
  { title: 'Gather documents', body: 'Use the checklist below. I help you fill in the claim form and check nothing is missing.' },
  { title: 'Submit to LIC', body: 'The complete file goes to the LIC branch that services the policy, and I follow up with you.' },
  { title: 'Settlement', body: 'LIC pays the approved amount to the claimant’s bank account.' },
]

export const CLAIM_DOCUMENTS = [
  {
    heading: 'Death claim',
    items: [
      'Claim form signed by the nominee',
      'Original policy document',
      'Death certificate issued by the local authority',
      'Nominee’s photo ID and address proof',
      'Cancelled cheque or bank passbook copy',
    ],
  },
  {
    heading: 'Maturity or money-back payout',
    items: [
      'Discharge form signed by the policyholder',
      'Original policy document',
      'Photo ID and PAN card',
      'Cancelled cheque for the payout account',
    ],
  },
]

export type AboutLinkId = 'story' | 'why' | 'services' | 'contact'

export const ABOUT_LINKS: Array<{ id: AboutLinkId; title: string; blurb: string; icon: LucideIcon; to: string }> = [
  { id: 'story', title: 'About me', blurb: 'Who I am and how I work', icon: Building2, to: '/about' },
  { id: 'why', title: 'Why work with me', blurb: 'One person, start to finish', icon: BadgeCheck, to: '/about?section=why' },
  { id: 'services', title: 'Services', blurb: 'Help before and after you buy', icon: Users, to: '/?section=services' },
  { id: 'contact', title: 'Contact', blurb: 'Call, WhatsApp or email', icon: Headset, to: '/contact' },
]

export const HERO_POINTS: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Users, label: 'Trusted guidance' },
  { icon: BadgeCheck, label: 'Simple process' },
  { icon: ShieldCheck, label: 'Long-term support' },
]

export const SERVICES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Compass, title: 'Choosing the right plan', body: 'Honest advice on which LIC plan fits your goal, your budget and your stage of life.' },
  { icon: Wallet, title: 'Premium payment help', body: 'Questions about due dates, modes and receipts, answered by one person you can call.' },
  { icon: RotateCcw, title: 'Policy revival', body: 'A lapsed policy can often be revived. I explain the steps, the cost and the deadline.' },
  { icon: UserCheck, title: 'Nomination changes', body: 'Update who receives the benefit after a marriage, a birth or any change in your family.' },
  { icon: Landmark, title: 'Loan against policy', body: 'Find out whether your policy qualifies and how much you could borrow.' },
  { icon: FileText, title: 'Claims support', body: 'Help with paperwork for existing policyholders, even if I was not your original agent.' },
  { icon: Bell, title: 'Premium reminders', body: 'A reminder before every due date so a policy never lapses by accident.' },
  { icon: Handshake, title: 'One point of contact', body: 'You deal with me directly, not a rotating call centre or a different agent each time.' },
]

export const VALUES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Handshake, title: 'Trusted guidance', body: 'Advice that starts with your needs, not with the plan that pays the most commission.' },
  { icon: Sprout, title: 'Simple process', body: 'Clear steps from first call to policy in hand, with no jargon.' },
  { icon: Headset, title: 'Long-term support', body: 'I stay with you after the sale: payments, nominations, loans and claims.' },
]

export type LegalDocId = 'privacy' | 'terms' | 'disclaimer' | 'grievance'

const BRAND_DISCLAIMER = BRAND.disclaimer

export const LEGAL_DOCS: Record<LegalDocId, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'This website does not store the details you type into its forms. When you use the contact form, it prepares a WhatsApp message that you can choose to send. Nothing is sent until you do.',
      'If you share personal or policy details with me by phone, WhatsApp or email, I use them only to advise you and to service your policies, and I do not sell or share them for marketing.',
      'You can ask me at any time to delete the messages and details you have shared.',
    ],
  },
  terms: {
    title: 'Terms of Use',
    body: [
      'The information on this website is for general guidance. Plan summaries are written in my own words from publicly available information and may change. The plan document and brochure issued by LIC are the only authority on benefits, charges, exclusions and conditions.',
      'Nothing here is an offer, a quote or a guarantee. Insurance is subject to underwriting and acceptance by the insurer.',
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    body: [
      BRAND_DISCLAIMER,
      'Premium and payout figures from the calculators on this site are illustrative estimates made with a simple formula. They are not quotes and do not use LIC’s actual rates. For an exact figure, ask me for a quotation.',
      'Tax benefits depend on current law and your own circumstances. Please check with a tax adviser.',
    ],
  },
  grievance: {
    title: 'Grievance Redressal',
    body: [
      'If you have a concern about a policy or a claim, tell me first by phone, WhatsApp or email and I will help you take it to the right LIC office.',
      'Policyholders can also use the grievance channels listed by LIC, and if a complaint is not resolved, approach the Insurance Ombudsman for your area.',
    ],
  },
}
