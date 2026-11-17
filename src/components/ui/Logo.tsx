import { useId } from 'react'
import { BRAND } from '../../data/content'
import { cn } from '../../lib/hooks'

export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-fill`} x1="10" y1="2" x2="38" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3f86ff" />
          <stop offset="0.55" stopColor="#1e5ad6" />
          <stop offset="1" stopColor="#0e2f80" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="8" y1="4" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M24 2.5c5.6 2.6 11.6 4 19.5 4.2.4 18.4-3.6 34.6-19.5 46.8C8.1 41.3 4.1 25.1 4.5 6.7 12.4 6.5 18.4 5.1 24 2.5z"
        fill={`url(#${id}-fill)`}
      />
      <path
        d="M24 6.2c4.6 2 9.6 3.2 15.8 3.5.1 6.6-.5 12.6-2.2 18-7.4-6.4-17.6-9.6-29.4-9.3-.4-2.8-.6-5.7-.6-8.7 6.2-.3 11.8-1.5 16.4-3.5z"
        fill={`url(#${id}-shine)`}
      />
      <path
        d="M24 34c-1.2-1-9.6-6.9-9.6-12.6 0-3 2.3-5.2 5-5.2 2 0 3.7 1.1 4.6 2.8.9-1.7 2.6-2.8 4.6-2.8 2.7 0 5 2.2 5 5.2 0 5.7-8.4 11.6-9.6 12.6z"
        fill="#ffffff"
      />
      <path d="M13.2 28.6c2.3 6.3 6.4 9.6 10.8 9.6s8.5-3.3 10.8-9.6" stroke="#f9c421" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const light = tone === 'light'
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className="h-11 w-auto shrink-0 drop-shadow-[0_6px_10px_rgba(14,47,128,0.25)]" />
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[1.34rem] font-[760] tracking-[-0.015em]',
            light ? 'text-white' : 'text-ink',
          )}
        >
          Secure <span className={light ? 'text-gold' : 'text-brand'}>Sarthi</span>
        </span>
        <span
          lang="hi"
          className={cn('mt-1 block font-deva text-[0.7rem] font-semibold', light ? 'text-white/70' : 'text-ink-soft')}
        >
          {BRAND.hindi}
        </span>
      </span>
    </span>
  )
}
