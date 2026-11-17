import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/hooks'
import { Link } from '../../lib/router'

type Variant = 'gold' | 'outline' | 'navy' | 'white' | 'ghost' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  arrow?: boolean
  leading?: ReactNode
}

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-ink shadow-gold hover:bg-[#ffd23d] hover:shadow-[0_14px_28px_-12px_rgb(var(--gold-deep)/0.85)]',
  outline:
    'border border-ink/20 bg-white/75 text-ink backdrop-blur-sm hover:border-ink/45 hover:bg-white shadow-[0_6px_18px_-12px_rgb(var(--ink)/0.35)]',
  navy: 'bg-ink text-white hover:bg-brand-deep shadow-[0_10px_24px_-14px_rgb(var(--ink)/0.8)]',
  white: 'bg-white text-ink hover:bg-sky shadow-[0_10px_24px_-14px_rgb(var(--night)/0.6)]',
  ghost: 'text-ink hover:bg-ink/[0.06]',
  'outline-light': 'border border-white/35 text-white hover:bg-white/10 hover:border-white/60',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.92rem] gap-1.5',
  md: 'h-11 px-5 text-[0.98rem] gap-2',
  lg: 'h-[52px] px-7 text-[1.03rem] gap-2.5',
}

export function buttonClass(variant: Variant = 'gold', size: Size = 'md', className?: string) {
  return cn(
    'group inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-display font-semibold tracking-[0.005em]',
    'transition-[transform,background-color,box-shadow,border-color,color] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )
}

const Arrow = () => (
  <ArrowRight
    aria-hidden
    className="h-[1.05em] w-[1.05em] transition-transform duration-200 group-hover:translate-x-0.5"
    strokeWidth={2.4}
  />
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'gold', size = 'md', arrow, leading, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} {...rest}>
      {leading}
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  )
})

/** A link that looks like a button. Use it whenever the action is "go to another page". */
export function ButtonLink({
  to,
  variant = 'gold',
  size = 'md',
  arrow,
  leading,
  className,
  children,
  ...rest
}: {
  to: string
  variant?: Variant
  size?: Size
  arrow?: boolean
  leading?: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  return (
    <Link to={to} className={buttonClass(variant, size, className)} {...rest}>
      {leading}
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  )
}
