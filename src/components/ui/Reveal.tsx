import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Section reveal that only moves content (never hides it), so the page is complete
 * and readable before any animation runs. Framer's reducedMotion="user" disables it.
 */
const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent: Variants = {
  rest: {},
  shown: { transition: { staggerChildren: 0.07 } },
}

export const staggerChild: Variants = {
  rest: { y: 22 },
  shown: { y: 0, transition: { duration: 0.8, ease } },
}

/* Convenience wrappers: a stagger group and its items, as any element. */
const group = { once: true, amount: 0.12 } as const
const item: Variants = {
  rest: { y: 24, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
}

type WithClass = { children: ReactNode; className?: string; 'aria-label'?: string }

export const StaggerUl = ({ children, className, ...rest }: WithClass) => (
  <motion.ul variants={staggerParent} initial="rest" whileInView="shown" viewport={group} className={className} {...rest}>
    {children}
  </motion.ul>
)
export const StaggerOl = ({ children, className, ...rest }: WithClass) => (
  <motion.ol variants={staggerParent} initial="rest" whileInView="shown" viewport={group} className={className} {...rest}>
    {children}
  </motion.ol>
)
export const StaggerDl = ({ children, className, ...rest }: WithClass) => (
  <motion.dl variants={staggerParent} initial="rest" whileInView="shown" viewport={group} className={className} {...rest}>
    {children}
  </motion.dl>
)
export const StaggerLi = ({ children, className }: WithClass) => (
  <motion.li variants={item} className={className}>
    {children}
  </motion.li>
)
export const StaggerDiv = ({ children, className }: WithClass) => (
  <motion.div variants={item} className={className}>
    {children}
  </motion.div>
)

/** Fades and lifts a block when it scrolls into view. */
export function FadeUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 22, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
