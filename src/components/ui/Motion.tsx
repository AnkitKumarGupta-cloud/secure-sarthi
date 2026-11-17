import { useEffect, useRef, useState } from 'react'
import { animate, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { MessageCircle, PhoneCall } from 'lucide-react'
import { BRAND } from '../../data/content'

/** Thin gold bar at the very top that fills as you read down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-gold to-gold-deep"
    />
  )
}

/** Tweens a number to its new value so estimates glide instead of jumping. */
export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    if (reduce) {
      setShown(value)
      from.current = value
      return
    }
    const controls = animate(from.current, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        from.current = v
        setShown(v)
      },
    })
    return () => controls.stop()
  }, [value, reduce])
  return <>{format(Math.round(shown))}</>
}

/** Floating WhatsApp button with a soft pulse ring (the ring is skipped for reduced motion). */
/** Mobile-only sticky call + WhatsApp bar. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] flex gap-2 border-t border-line bg-white/95 p-2.5 pb-[max(10px,env(safe-area-inset-bottom,0px))] backdrop-blur sm:hidden">
      <a href={BRAND.phoneHref} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink font-display text-[0.98rem] font-semibold text-white">
        <PhoneCall className="h-5 w-5" aria-hidden /> Call me
      </a>
      <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25d366] font-display text-[0.98rem] font-semibold text-white">
        <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp
      </a>
    </div>
  )
}

export function WhatsAppFab() {
  return (
    <motion.a
      href={BRAND.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="kv-fab fixed max-sm:hidden bottom-[max(18px,env(safe-area-inset-bottom,0px))] right-[max(16px,env(safe-area-inset-right,0px))] z-[55] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgba(8,90,45,0.7)]"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.2} aria-hidden />
    </motion.a>
  )
}
