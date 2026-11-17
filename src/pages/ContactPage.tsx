import { useState, type FormEvent } from 'react'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { BRAND } from '../data/content'
import { CONTACT_CHANNELS, CONTACT_TOPICS } from '../data/siteContent'
import { Button } from '../components/ui/Button'
import { Band, Note, PageHero } from '../components/ui/Page'
import { cn } from '../lib/hooks'
import { Link } from '../lib/router'

const field = 'h-12 w-full rounded-xl border bg-white px-4 text-[1rem] text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15'

function CallbackForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState(CONTACT_TOPICS[0])
  const [time, setTime] = useState('Morning')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [done, setDone] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = 'Enter your name so the advisor knows who to ask for.'
    const digits = phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
    if (!digits) next.phone = 'Enter a mobile number.'
    else if (!/^[6-9]\d{9}$/.test(digits)) next.phone = 'Enter a 10-digit Indian mobile number, like 98765 43210.'
    setErrors(next)
    if (next.name) document.getElementById('cb-name')?.focus()
    else if (next.phone) document.getElementById('cb-phone')?.focus()
    if (!Object.keys(next).length) setDone(name.trim().split(' ')[0])
  }

  const message = `Hello, my name is ${name.trim()}. Please call me back in the ${time.toLowerCase()} about: ${topic.toLowerCase()}. My number is ${phone.trim()}.`
  const waLink = `${BRAND.whatsapp}?text=${encodeURIComponent(message)}`

  if (done)
    return (
      <div role="status" className="rounded-[26px] border border-line bg-white p-6 shadow-card sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dcf5e7] text-success">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-[1.5rem] font-[740] text-ink">Thanks, {done}</h2>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-soft">
          Your message is ready. Tap the button to send it on WhatsApp and I will call you back in the {time.toLowerCase()}. Nothing is sent until you do.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-[52px] items-center gap-2 rounded-full bg-gold px-7 font-display font-semibold text-ink shadow-gold transition hover:bg-[#ffd23d]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Send on WhatsApp
        </a>
        <p className="mt-3 text-[0.9rem] text-ink-soft">
          Prefer to talk now? Call{' '}
          <a href={BRAND.phoneHref} className="font-semibold text-brand underline-offset-2 hover:underline">
            {BRAND.phone}
          </a>
          .
        </p>
        <Button variant="outline" className="mt-5" onClick={() => setDone(null)}>
          Edit my details
        </Button>
      </div>
    )

  return (
    <form noValidate onSubmit={submit} className="grid gap-4 rounded-[26px] border border-line bg-white p-5 shadow-card sm:p-8" aria-label="Ask for a callback">
      <h2 className="font-display text-[1.5rem] font-[740] text-ink">Ask for a callback</h2>
      <div>
        <label htmlFor="cb-name" className="font-display font-semibold text-ink">
          Your name
        </label>
        <input
          id="cb-name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cb-name-error' : undefined}
          className={cn(field, 'mt-1.5', errors.name ? 'border-danger' : 'border-line')}
        />
        {errors.name && (
          <p id="cb-name-error" className="mt-1.5 text-[0.88rem] text-danger">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="cb-phone" className="font-display font-semibold text-ink">
          Mobile number
        </label>
        <div className="mt-1.5 flex">
          <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-line bg-mist px-3 text-ink-soft">+91</span>
          <input
            id="cb-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'cb-phone-error' : undefined}
            className={cn(field, 'rounded-l-none', errors.phone ? 'border-danger' : 'border-line')}
          />
        </div>
        {errors.phone && (
          <p id="cb-phone-error" className="mt-1.5 text-[0.88rem] text-danger">
            {errors.phone}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="cb-topic" className="font-display font-semibold text-ink">
          What would you like to talk about?
        </label>
        <select id="cb-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={cn(field, 'mt-1.5 border-line')}>
          {CONTACT_TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="font-display font-semibold text-ink">Best time to call</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {['Morning', 'Afternoon', 'Evening'].map((t) => (
            <label
              key={t}
              className={cn(
                'flex h-11 cursor-pointer items-center justify-center rounded-xl border text-[0.95rem] font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20',
                time === t ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:bg-mist',
              )}
            >
              <input type="radio" name="cb-time" value={t} checked={time === t} onChange={() => setTime(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <Button type="submit" size="lg" arrow className="mt-1">
        Prepare my message
      </Button>
      <Note>This prepares a WhatsApp message for you to review and send. The site does not store what you type.</Note>
    </form>
  )
}

export function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Contact us"
        title="Talk to someone who will explain first"
        lead="Choosing life insurance is a big decision. Call or message me, or leave your number and I will call you back at a time that suits you."
      />
      <Band className="!pt-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12">
          <CallbackForm />
          <div className="space-y-4">
            {CONTACT_CHANNELS.map((c) => (
              <div key={c.title} className="flex gap-4 rounded-[22px] border border-line bg-white p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky text-brand">
                  <c.icon className="h-[22px] w-[22px]" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-[1.08rem] font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1 text-[0.96rem] leading-relaxed text-ink-soft">{c.body}</p>
                  {c.title === 'Call me' && (
                    <a href={BRAND.phoneHref} className="mt-1.5 inline-block font-semibold text-brand underline-offset-2 hover:underline">
                      {BRAND.phone}
                    </a>
                  )}
                  {c.title === 'WhatsApp' && (
                    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block font-semibold text-brand underline-offset-2 hover:underline">
                      Chat on WhatsApp
                    </a>
                  )}
                  {c.title === 'Email' && (
                    <a href={`mailto:${BRAND.email}`} className="mt-1.5 inline-block font-semibold text-brand underline-offset-2 hover:underline [overflow-wrap:anywhere]">
                      {BRAND.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
            <p className="px-1 text-[0.95rem] text-ink-soft">
              Not happy with a response? Read about{' '}
              <Link to="/legal/grievance" className="font-semibold text-brand underline-offset-2 hover:underline">
                grievance redressal
              </Link>
              . Have a claim? See the{' '}
              <Link to="/claims" className="font-semibold text-brand underline-offset-2 hover:underline">
                claims page
              </Link>
              .
            </p>
          </div>
        </div>
      </Band>
    </>
  )
}
