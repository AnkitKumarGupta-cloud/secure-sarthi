import { VALUES } from '../../data/content'
import { img } from '../../data/images'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

function BuildingVisual() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[420px] overflow-hidden sm:h-[320px]" aria-hidden>
      <div className="absolute left-1/2 top-2 h-[340px] w-[340px] -translate-x-1/2 overflow-hidden rounded-full bg-[linear-gradient(180deg,#7fb4f4_0%,#a9cdf8_45%,#e2eefc_100%)] sm:h-[370px] sm:w-[370px]">
        <div className="absolute left-[8%] top-[18%] h-10 w-36 rounded-full bg-white/80 blur-md" />
        <div className="absolute right-[6%] top-[34%] h-8 w-28 rounded-full bg-white/70 blur-md" />
        <div className="absolute left-[30%] top-[8%] h-6 w-20 rounded-full bg-white/60 blur-md" />
      </div>
      <img
        src={img('building')}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute bottom-0 left-1/2 w-[400px] max-w-none -translate-x-1/2"
      />
    </div>
  )
}

export function Trust() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white pb-10 pt-4 lg:pb-14">
      <div className="gutter">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <Reveal>
            <p className="eyebrow text-brand-deep">Why Secure Sarthi</p>
            <h2 id="about-title" className="mt-3 text-[2rem] font-[740] leading-[1.1] text-ink sm:text-[2.3rem]">
              One person to guide you, start to finish
            </h2>
            <p className="mt-4 max-w-[34rem] text-[1.02rem] leading-relaxed text-ink-soft">
              I am an authorized LIC agent. You deal with me directly: not a rotating call centre, and not a different agent every time you have a
              question.
            </p>
            <ul id="stats" className="mt-7 grid gap-3 sm:grid-cols-3">
              {VALUES.map((v) => (
                <li key={v.title} className="rounded-[20px] bg-mist p-4">
                  <v.icon className="h-7 w-7 text-brand" aria-hidden />
                  <p className="mt-3 font-display font-semibold leading-tight text-ink">{v.title}</p>
                  <p className="mt-1 text-[0.9rem] leading-snug text-ink-soft">{v.body}</p>
                </li>
              ))}
            </ul>
            <ButtonLink to="/about" variant="outline" arrow className="mt-7">
              Know more about me
            </ButtonLink>
          </Reveal>
          <BuildingVisual />
        </div>
      </div>
    </section>
  )
}
