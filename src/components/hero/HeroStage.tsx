import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import { img } from '../../data/images'

/** Twinkling gold sparkles around the illustration (x/y are percentages of the stage). */
const SPARKS = [
  { x: 7, y: 20, s: 16, d: 0, t: 4.2 },
  { x: 91, y: 13, s: 20, d: 1.1, t: 5 },
  { x: 15, y: 56, s: 11, d: 2, t: 3.8 },
  { x: 94, y: 48, s: 13, d: 0.6, t: 4.6 },
  { x: 31, y: 7, s: 10, d: 1.7, t: 5.4 },
  { x: 74, y: 5, s: 12, d: 2.6, t: 4.1 },
  { x: 3, y: 38, s: 9, d: 3.1, t: 4.8 },
  { x: 86, y: 70, s: 10, d: 1.4, t: 3.9 },
]

function Spark({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path d="M12 0c.9 7.2 4.8 11.1 12 12-7.2.9-11.1 4.8-12 12-.9-7.2-4.8-11.1-12-12C7.2 11.1 11.1 7.2 12 0z" fill="#f9c421" />
    </svg>
  )
}

export function HeroStage({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const artX = useTransform(px, [-1, 1], [-9, 9])
  const artY = useTransform(py, [-1, 1], [-5, 5])
  const sparkX = useTransform(px, [-1, 1], [14, -14])
  const sparkY = useTransform(py, [-1, 1], [8, -8])

  return (
    <div className="absolute inset-0">
      {/* soft light behind the dome */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[46%] aspect-square h-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(255,255,255,0.35)_55%,rgba(255,255,255,0)_74%)]"
      />
      <motion.div aria-hidden style={reduce ? undefined : { x: sparkX, y: sparkY }} className="absolute inset-0">
        {SPARKS.map((p, i) => (
          <span
            key={i}
            className="kv-spark absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, ['--t' as string]: `${p.t}s`, ['--d' as string]: `${p.d}s` }}
          >
            <Spark size={p.s} />
          </span>
        ))}
      </motion.div>
      {/* soft contact shadow */}
      <div
        aria-hidden
        className="absolute bottom-[9%] left-1/2 h-[6%] w-[60%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(16,48,110,0.32),rgba(16,48,110,0))]"
      />
      <motion.div style={reduce ? undefined : { x: artX, y: artY }} className="absolute inset-x-0 bottom-[10%] top-0">
        <img
          src={img('hero')}
          width={832}
          height={1165}
          alt="A smiling Indian family of five, parents, two children and grandparents, standing together inside a protective glass dome with shield emblems on a golden platform"
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="kv-bob h-full w-full select-none object-contain object-bottom drop-shadow-[0_22px_30px_rgba(20,50,110,0.22)]"
        />
      </motion.div>
    </div>
  )
}
