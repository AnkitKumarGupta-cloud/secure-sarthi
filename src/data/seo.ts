import { BRAND, LEGAL_DOCS, PLANS, type PlanId } from './content'
import { PLAN_DETAILS } from './planPages'
import { CLAIM_FAQS } from './siteContent'
import { NAMED_PLANS, findNamedPlan } from './namedPlans'
import type { Route } from '../lib/router'

/** Everything search engines and link previews need to know about each page. */

export const SITE = {
  url: 'https://secure-sarthi.com',
  name: 'Secure Sarthi',
  locality: 'Bengaluru',
  region: 'Karnataka',
  image: '/og-image.png',
}

export interface PageMeta {
  path: string
  title: string
  description: string
  crumbs: Array<{ name: string; path: string }>
  faqs?: Array<{ q: string; a: string }>
  noindex?: boolean
}

const HOME_CRUMB = { name: 'Home', path: '/' }

export function pathFor(route: Route): string {
  switch (route.name) {
    case 'home':
      return '/'
    case 'plans':
      return '/plans'
    case 'plan':
      return `/plans/${route.id}`
    case 'named':
      return `/plans/${route.slug}`
    case 'claims':
      return '/claims'
    case 'about':
      return '/about'
    case 'contact':
      return '/contact'
    case 'legal':
      return `/legal/${route.doc}`
    default:
      return '/404'
  }
}

export function metaFor(route: Route): PageMeta {
  switch (route.name) {
    case 'home':
      return {
        path: '/',
        title: `${SITE.name} | LIC Agent in ${SITE.locality}, Independent LIC Advisor`,
        description:
          `Authorized LIC agent in ${SITE.locality}. Compare endowment, money-back, pension and child plans, estimate premiums and get claims help, by call or WhatsApp.`,
        crumbs: [],
      }
    case 'plans':
      return {
        path: '/plans',
        title: `LIC Plans Compared: Endowment, Money Back, Pension, Child | ${SITE.name}`,
        description:
          'Compare four LIC plans side by side: endowment, money back, pension and child. Entry age, term, benefits and who each plan suits, in plain words.',
        crumbs: [HOME_CRUMB, { name: 'Plans', path: '/plans' }],
      }
    case 'plan': {
      const plan = PLANS.find((p) => p.id === route.id)!
      const d = PLAN_DETAILS[route.id as PlanId]
      return {
        path: `/plans/${route.id}`,
        title: `${d.product} (${d.planNo}): Benefits, Eligibility & Premium | ${SITE.name}`,
        description: `${d.product} (${d.planNo}) explained in plain words: benefits, eligibility, a premium example and FAQs. Advice from an authorized LIC agent.`,
        crumbs: [HOME_CRUMB, { name: 'Plans', path: '/plans' }, { name: plan.title, path: `/plans/${route.id}` }],
        faqs: d.faqs,
      }
    }
    case 'named': {
      const n = findNamedPlan(route.slug)!
      const cat = PLANS.find((p) => p.id === n.category)!
      const short = n.name.replace('LIC’s ', '')
      return {
        path: `/plans/${n.slug}`,
        title: `LIC ${short} Plan ${n.planNo}: Benefits, Eligibility & Details | ${SITE.name}`,
        description: `LIC ${short} (Plan ${n.planNo}${n.oldPlanNo ? `, earlier ${n.oldPlanNo}` : ''}) in plain words: ${n.kind.toLowerCase()}, entry age, term, benefits and FAQs. Advice from an LIC agent in ${SITE.locality}.`,
        crumbs: [HOME_CRUMB, { name: 'Plans', path: '/plans' }, { name: cat.title, path: `/plans/${cat.id}` }, { name: short, path: `/plans/${n.slug}` }],
        faqs: n.faqs,
      }
    }
    case 'claims':
      return {
        path: '/claims',
        title: `LIC Claim Help: Process, Documents & Status | ${SITE.name}`,
        description:
          'How to make an LIC claim, the documents you need, how to check claim status and what to do if a claim is rejected. Personal help from an authorized agent.',
        crumbs: [HOME_CRUMB, { name: 'Claims', path: '/claims' }],
        faqs: CLAIM_FAQS,
      }
    case 'about':
      return {
        path: '/about',
        title: `About ${SITE.name} | Your Authorized LIC Agent`,
        description:
          'About Secure Sarthi: an independent advisory run by an authorized LIC agent who stays with you from choosing a plan to settling a claim.',
        crumbs: [HOME_CRUMB, { name: 'About', path: '/about' }],
      }
    case 'contact':
      return {
        path: '/contact',
        title: `Contact ${SITE.name} | Call or WhatsApp an LIC Agent`,
        description:
          'Call, WhatsApp or email Secure Sarthi for LIC plan advice, premium help, revival, nominations, loans and claims support.',
        crumbs: [HOME_CRUMB, { name: 'Contact', path: '/contact' }],
      }
    case 'legal': {
      const doc = LEGAL_DOCS[route.doc]
      return {
        path: `/legal/${route.doc}`,
        title: `${doc.title} | ${SITE.name}`,
        description: `${doc.title} for the ${SITE.name} website.`,
        crumbs: [HOME_CRUMB, { name: doc.title, path: `/legal/${route.doc}` }],
      }
    }
    default:
      return {
        path: '/404',
        title: `Page not found | ${SITE.name}`,
        description: 'This page could not be found.',
        crumbs: [],
        noindex: true,
      }
  }
}

/** Every page that should exist as its own crawlable URL. */
export function allRoutes(): Route[] {
  return [
    { name: 'home' },
    { name: 'plans' },
    ...PLANS.map((p) => ({ name: 'plan', id: p.id }) as Route),
    ...NAMED_PLANS.map((n) => ({ name: 'named', slug: n.slug }) as Route),
    { name: 'claims' },
    { name: 'about' },
    { name: 'contact' },
    ...(Object.keys(LEGAL_DOCS) as Array<keyof typeof LEGAL_DOCS>).map((doc) => ({ name: 'legal', doc }) as Route),
  ]
}

export const absolute = (path: string) => `${SITE.url}${path === '/' ? '/' : path}`

export function jsonLd(meta: PageMeta): object[] {
  const out: object[] = []
  if (meta.path === '/') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'InsuranceAgency',
      '@id': `${SITE.url}/#agency`,
      name: SITE.name,
      alternateName: BRAND.hindi,
      url: SITE.url,
      image: absolute(SITE.image),
      description: meta.description,
      telephone: BRAND.phone,
      email: BRAND.email,
      address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: 'IN' },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: SITE.locality },
      ],
      knowsAbout: PLANS.map((p) => p.title),
    })
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE.url}/#site`, url: SITE.url, name: SITE.name, inLanguage: 'en-IN' })
  }
  if (meta.crumbs.length > 1) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: meta.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absolute(c.path) })),
    })
  }
  if (meta.faqs?.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  return out
}

/** Updates the head for client-side navigation. Prerendered HTML already carries the same tags. */
export function applyMeta(meta: PageMeta) {
  document.title = meta.title
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }
  set('meta[name="description"]', 'content', meta.description)
  set('link[rel="canonical"]', 'href', absolute(meta.path))
  set('meta[property="og:title"]', 'content', meta.title)
  set('meta[property="og:description"]', 'content', meta.description)
  set('meta[property="og:url"]', 'content', absolute(meta.path))
  set('meta[name="twitter:title"]', 'content', meta.title)
  set('meta[name="twitter:description"]', 'content', meta.description)
  set('meta[name="robots"]', 'content', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  const ld = document.getElementById('ld-json')
  if (ld) ld.textContent = JSON.stringify(jsonLd(meta))
}
