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

const FILE: Partial<Record<ImageName, string>> = { moneyback: 'ulip' }

export function img(name: ImageName): string {
  return files[`../assets/img/${FILE[name] ?? name}.webp`]
}
