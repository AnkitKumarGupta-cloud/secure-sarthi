// Runs after `vite build`. Writes one HTML file per page (unique title, description, canonical,
// social tags, structured data and a no-JavaScript fallback), plus sitemap.xml, robots.txt and 404.html.
import { build } from 'esbuild'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const tmp = join(tmpdir(), `seo-${process.pid}.mjs`)

await build({
  entryPoints: [join(root, 'src/data/seo.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: tmp,
  logLevel: 'silent',
  loader: { '.webp': 'dataurl' },
  define: { 'import.meta.env.MODE': '"production"' },
})
const seo = await import(pathToFileURL(tmp).href)
// The server build of the app (vite build --ssr). Each page's full content goes into its HTML.
const { render: renderApp } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const setMeta = (html, re, value) => html.replace(re, (m, a, b) => `${a}${esc(value)}${b}`)

function render(meta, fallback) {
  let h = template
  let body = ''
  try {
    body = renderApp(meta.path)
  } catch (err) {
    console.warn(`could not prerender ${meta.path}, using the short fallback:`, err.message)
  }
  if (body) h = h.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
  h = setMeta(h, /(<meta\s+name="description"\s+content=")[^"]*(")/, meta.description)
  h = setMeta(h, /(<link rel="canonical" href=")[^"]*(")/, seo.absolute(meta.path))
  h = setMeta(h, /(<meta property="og:title" content=")[^"]*(")/, meta.title)
  h = setMeta(h, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, meta.description)
  h = setMeta(h, /(<meta property="og:url" content=")[^"]*(")/, seo.absolute(meta.path))
  h = setMeta(h, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title)
  h = setMeta(h, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, meta.description)
  h = h.replace(
    /<meta name="robots" content="[^"]*" \/>/,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
  )
  h = h.replace(/(<script type="application\/ld\+json" id="ld-json">)[\s\S]*?(<\/script>)/, `$1${JSON.stringify(seo.jsonLd(meta)).replace(/</g, '\\u003c')}$2`)
  h = h.replace('<!--NOSCRIPT-->', body ? '' : `<noscript>${fallback}</noscript>`)
  return h
}

const links = [
  ['/', 'Home'],
  ['/plans', 'LIC plans'],
  ['/claims', 'Claims help'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]
const nav = `<nav>${links.map(([p, n]) => `<a href="${p}">${n}</a>`).join(' · ')}</nav>`
const fallbackFor = (meta) =>
  `<main><h1>${esc(meta.title.split(' | ')[0])}</h1><p>${esc(meta.description)}</p>${nav}<p>This site works best with JavaScript turned on.</p></main>`

const today = new Date().toISOString().slice(0, 10)
const urls = []
for (const route of seo.allRoutes()) {
  const meta = seo.metaFor(route)
  const html = render(meta, fallbackFor(meta))
  const dir = meta.path === '/' ? dist : join(dist, meta.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  const legal = route.name === 'legal'
  urls.push({ loc: seo.absolute(meta.path), priority: meta.path === '/' ? '1.0' : legal ? '0.2' : route.name === 'plan' ? '0.9' : '0.7' })
}

const nf = seo.metaFor({ name: 'notfound' })
writeFileSync(join(dist, '404.html'), render(nf, fallbackFor(nf)))

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${seo.SITE.url}/sitemap.xml\n`)
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${urls.length} pages + 404, sitemap.xml, robots.txt`)
