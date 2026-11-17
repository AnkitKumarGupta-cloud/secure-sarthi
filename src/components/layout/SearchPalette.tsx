import { useId, useMemo, useState, type KeyboardEvent } from 'react'
import { ArrowRight, Calculator, CornerDownLeft, FileQuestion, Info, Search, ShieldCheck, Users } from 'lucide-react'
import { CLAIM_TOPICS, PLANS } from '../../data/content'
import { cn } from '../../lib/hooks'
import { PLAN_DETAILS } from '../../data/planPages'
import { useRouter } from '../../lib/router'
import { useUI } from '../../state/ui'
import { Dialog } from '../ui/Dialog'
import type { LucideIcon } from 'lucide-react'

interface Item {
  id: string
  title: string
  hint: string
  group: 'Plans' | 'Pages' | 'Help'
  keywords: string
  icon: LucideIcon
  run: () => void
}

const SUGGESTIONS = ['endowment', 'pension', 'claim', 'revival']

export function SearchPalette() {
  const { searchOpen, setSearchOpen } = useUI()
  const { navigate } = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listId = useId()

  const close = () => {
    setSearchOpen(false)
    setQuery('')
    setActive(0)
  }

  const items = useMemo<Item[]>(
    () => [
      ...PLANS.map((p) => {
        const d = PLAN_DETAILS[p.id]
        return {
          id: `plan-${p.id}`,
          title: d.product,
          hint: p.title,
          group: 'Plans' as const,
          keywords: `${p.summary} ${p.goodFor} ${d.lead} ${d.riders.map((r) => r.name).join(' ')} plan policy`,
          icon: p.icon,
          run: () => navigate(`/plans/${p.id}`),
        }
      }),
      {
        id: 'annuity',
        title: 'Annuity options',
        hint: 'Ways to take your pension income (Jeevan Akshay VII)',
        group: 'Plans',
        keywords: 'annuity pension income life joint purchase price retirement',
        icon: ShieldCheck,
        run: () => navigate('/plans/pension?section=options'),
      },
      {
        id: 'go-calc',
        title: 'Premium calculator',
        hint: 'Estimate a yearly premium',
        group: 'Pages',
        keywords: 'premium cost price quote estimate calculate',
        icon: Calculator,
        run: () => navigate('/?section=calculator'),
      },
      {
        id: 'go-products',
        title: 'Compare all plans',
        hint: 'Side by side, with who each suits',
        group: 'Pages',
        keywords: 'products compare plans goal',
        icon: ShieldCheck,
        run: () => navigate('/plans'),
      },
      {
        id: 'go-about',
        title: 'About me',
        hint: 'Who I am and how I work',
        group: 'Pages',
        keywords: 'about company story values',
        icon: Info,
        run: () => navigate('/about'),
      },
      {
        id: 'go-stories',
        title: 'Services',
        hint: 'Revival, nomination, loans, claims support',
        group: 'Pages',
        keywords: 'services revival nomination loan reminders premium payment support',
        icon: Users,
        run: () => navigate('/?section=services'),
      },
      ...CLAIM_TOPICS.map((t) => ({
        id: `claim-${t.id}`,
        title: t.title,
        hint: t.blurb,
        group: 'Help' as const,
        keywords: 'claim settlement nominee documents death maturity',
        icon: t.icon,
        run: () => navigate(`/claims/${t.id}`),
      })),
      {
        id: 'faq',
        title: 'Claims questions',
        hint: 'Who can claim, timelines, rejections',
        group: 'Help',
        keywords: 'faq questions rejected timeline nominee ombudsman',
        icon: FileQuestion,
        run: () => navigate('/claims'),
      },
      {
        id: 'contact',
        title: 'Contact me',
        hint: 'Call, WhatsApp or email',
        group: 'Help',
        keywords: 'contact call phone whatsapp email advisor agent help support callback',
        icon: ArrowRight,
        run: () => navigate('/contact'),
      },
    ],
    [navigate],
  )

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return items
    return items.filter((it) => {
      const hay = `${it.title} ${it.hint} ${it.keywords}`.toLowerCase()
      return words.every((w) => hay.includes(w))
    })
  }, [items, query])

  const run = (item: Item) => {
    close()
    window.setTimeout(item.run, 40)
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      run(results[active])
    }
  }

  let lastGroup = ''
  return (
    <Dialog open={searchOpen} onClose={close} labelledBy="search-title" placement="top" hideClose>
      <h2 id="search-title" className="sr-only">
        Search Secure Sarthi
      </h2>
      <div className="flex items-center gap-3 border-b border-line px-5">
        <Search className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden />
        <input
          data-autofocus
          id="site-search"
          type="search"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          aria-autocomplete="list"
          aria-label="Search plans, services and help"
          placeholder="Search plans, services and help"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKey}
          className="h-16 w-full bg-transparent text-[1.08rem] text-ink outline-none placeholder:text-ink-soft/70 [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="button"
          onClick={close}
          className="rounded-lg border border-line px-2 py-1 text-[0.75rem] font-semibold text-ink-soft hover:bg-mist"
        >
          Esc
        </button>
      </div>
      <ul id={listId} role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto p-2">
        {results.map((it, i) => {
          const header = it.group !== lastGroup
          lastGroup = it.group
          return (
            <li key={it.id} role="presentation">
              {header && (
                <p role="presentation" className="px-3 pb-1.5 pt-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-soft/80">
                  {it.group}
                </p>
              )}
              <div
                id={`${listId}-${it.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(it)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors',
                  i === active ? 'bg-sky' : 'hover:bg-mist',
                )}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand ring-1 ring-line">
                  <it.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display font-semibold text-ink">{it.title}</span>
                  <span className="block truncate text-[0.9rem] text-ink-soft">{it.hint}</span>
                </span>
                {i === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-ink-soft" aria-hidden />}
              </div>
            </li>
          )
        })}
        {!results.length && (
          <li className="px-4 py-8 text-center text-ink-soft">
            No matches for “{query}”. Try{' '}
            {SUGGESTIONS.map((s, i) => (
              <span key={s}>
                <button type="button" className="font-semibold text-brand underline-offset-2 hover:underline" onClick={() => setQuery(s)}>
                  {s}
                </button>
                {i < SUGGESTIONS.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </li>
        )}
      </ul>
    </Dialog>
  )
}
