const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const grouped = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** ₹50,00,000 style formatting (Indian digit grouping). */
export function formatINR(value: number) {
  return currency.format(Math.round(value))
}

/** 50,00,000 without the currency symbol. */
export function formatGrouped(value: number) {
  return grouped.format(Math.round(value))
}

function trim(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(n < 10 ? 2 : 1).replace(/\.?0+$/, '')
}

/** 50 lakh, 1.25 crore, ₹75,000. */
export function inWords(value: number) {
  if (value >= 1e7) return `${trim(value / 1e7)} crore`
  if (value >= 1e5) return `${trim(value / 1e5)} lakh`
  return formatINR(value)
}

/**
 * Parses what people actually type for rupee amounts:
 * "5000000", "50,00,000", "₹ 50,00,000", "50 lakh", "50L", "1.5 cr", "75k".
 * Returns null when the text isn't a recognisable amount.
 */
export function parseAmount(input: string): number | null {
  const s = input
    .toLowerCase()
    .replace(/rs\.?|inr|₹/g, '')
    .replace(/[,\s]/g, '')
  if (!s) return null
  const m = s.match(/^(\d+(?:\.\d+)?)(crores?|cr|lakhs?|lacs?|lac|l|thousand|k)?$/)
  if (!m) return null
  const n = parseFloat(m[1])
  const unit = m[2] ?? ''
  const mult = unit.startsWith('c') ? 1e7 : unit.startsWith('l') ? 1e5 : unit === 'k' || unit === 'thousand' ? 1e3 : 1
  const value = Math.round(n * mult)
  return Number.isFinite(value) ? value : null
}
