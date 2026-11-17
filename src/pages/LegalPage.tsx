import { LEGAL_DOCS, type LegalDocId } from '../data/content'
import { Band, PageHero } from '../components/ui/Page'
import { cn } from '../lib/hooks'
import { Link } from '../lib/router'

export function LegalPage({ doc }: { doc: LegalDocId }) {
  const d = LEGAL_DOCS[doc]
  return (
    <>
      <PageHero breadcrumbs={[{ label: 'Home', to: '/' }, { label: d.title }]} eyebrow="Legal" title={d.title} />
      <Band className="!pt-2">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Legal pages">
            <ul className="flex gap-2 overflow-x-auto lg:flex-col">
              {(Object.keys(LEGAL_DOCS) as LegalDocId[]).map((id) => (
                <li key={id} className="shrink-0">
                  <Link
                    to={`/legal/${id}`}
                    aria-current={id === doc ? 'page' : undefined}
                    className={cn(
                      'flex min-h-[44px] items-center rounded-xl px-4 font-display font-semibold transition-colors',
                      id === doc ? 'bg-ink text-white' : 'text-ink-soft hover:bg-mist hover:text-ink',
                    )}
                  >
                    {LEGAL_DOCS[id].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="max-w-[44rem] space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            {d.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Band>
    </>
  )
}
