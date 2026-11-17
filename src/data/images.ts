/**
 * Illustrations (generated 3D artwork, cleaned to transparent WebP in src/assets/img).
 * Vite turns each file into a hashed asset in the normal build and into an inline data URI
 * in the single-file artifact build, so no image path ever depends on where the page is hosted.
 */
const files = import.meta.glob<string>('../assets/img/*.webp', { eager: true, query: '?url', import: 'default' })

export type ImageName =
  | 'hero'
  | 'endowment'
  | 'moneyback'
  | 'pension'
  | 'child'
  | 'calculator'
  | 'building'

const small = import.meta.glob<string>('../assets/img/sm/*.webp', { eager: true, query: '?url', import: 'default' })

const FILE: Partial<Record<ImageName, string>> = { moneyback: 'ulip' }

/** Full-size width, and the width of the phone-sized copy in src/assets/img/sm (scripts/make-small-images.mjs). */
const WIDTHS: Record<string, [number, number]> = {
  hero: [832, 560],
  endowment: [640, 320],
  ulip: [640, 320],
  pension: [640, 320],
  child: [640, 320],
  calculator: [900, 600],
  building: [1100, 600],
}

/** src + srcSet + sizes for an <img>, so phones download the smaller copy. */
export function art(name: ImageName, sizes: string) {
  const file = FILE[name] ?? name
  const [full, sm] = WIDTHS[file]
  const smallUrl = small[`../assets/img/sm/${file}.webp`]
  const src = img(name)
  return smallUrl ? { src, srcSet: `${smallUrl} ${sm}w, ${src} ${full}w`, sizes } : { src }
}

export function img(name: ImageName): string {
  return files[`../assets/img/${FILE[name] ?? name}.webp`]
}
