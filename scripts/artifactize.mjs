// Turns the single-file artifact build (dist-artifact/index.html) into a page body for
// claude.ai Artifacts: the host wraps the file in its own <!doctype>/<head>/<body>, so the
// document-level tags are removed and the <title> is moved to the very top.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const src = readFileSync('dist-artifact/index.html', 'utf8')

const pick = (re) => [...src.matchAll(re)].map((m) => m[0])
const title = pick(/<title>[\s\S]*?<\/title>/g)[0] ?? '<title>Kavach Life</title>'
const metas = pick(/<meta\s[^>]*>/g).filter((m) => /name="(?:claude:viewport-fit-sides|theme-color)"/.test(m))
const links = pick(/<link\s[^>]*>/g)
  .filter((l) => /fonts\.(?:googleapis|gstatic)\.com/.test(l))
  .map((l) => l.replace(/\s+/g, ' '))
const styles = pick(/<style[^>]*>[\s\S]*?<\/style>/g)
const scripts = pick(/<script[^>]*>[\s\S]*?<\/script>/g)
const body = src.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? ''
const bodyMarkup = body.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '').trim()

// Classic CDN scripts first, then the import map, then the inlined app module.
const classic = scripts.filter((s) => /<script[^>]*\ssrc=/.test(s))
const importmap = scripts.filter((s) => /type="importmap"/.test(s))
const modules = scripts.filter((s) => /type="module"/.test(s) && !/\ssrc=/.test(s))

const out = [
  title,
  ...metas,
  ...links,
  ...styles,
  bodyMarkup,
  ...classic,
  ...importmap,
  ...modules,
].join('\n')

mkdirSync('artifact', { recursive: true })
writeFileSync('artifact/kavach-life.html', out)
const kb = (Buffer.byteLength(out) / 1024).toFixed(0)
console.log(`artifact/kavach-life.html written (${kb} KB): ${classic.length} CDN scripts, ${modules.length} module`)
