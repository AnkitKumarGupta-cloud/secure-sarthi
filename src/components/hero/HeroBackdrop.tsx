import { memo, useMemo, type CSSProperties } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { seeded } from '../../lib/random'

/**
 * Daylight sky, drifting clouds and a layered Indian city skyline.
 * Each layer shifts a different amount with the pointer for depth.
 * Colours here are illustration colours, not UI tokens.
 */

const W = 1600
const GROUND = 404

interface Tower {
  x: number
  w: number
  h: number
  cap: 'flat' | 'step' | 'mast' | 'dome' | 'spire' | 'slant'
}

function towers(seed: number, from: number, to: number, hMin: number, hMax: number, peakAt?: number) {
  const rnd = seeded(seed)
  const list: Tower[] = []
  let x = from
  while (x < to) {
    const w = 26 + rnd() * 52
    const boost = peakAt === undefined ? 1 : 0.55 + 0.75 * Math.exp(-(((x - peakAt) / 260) ** 2))
    const h = (hMin + rnd() * (hMax - hMin)) * boost
    const r = rnd()
    const cap: Tower['cap'] = r < 0.5 ? 'flat' : r < 0.68 ? 'step' : r < 0.82 ? 'mast' : r < 0.92 ? 'slant' : 'dome'
    list.push({ x, w, h, cap })
    x += w * (0.62 + rnd() * 0.5)
  }
  return list
}

function TowerShape({ t, fill }: { t: Tower; fill: string }) {
  const top = GROUND - t.h
  const parts = [<rect key="b" x={t.x} y={top} width={t.w} height={t.h + 2} fill={fill} />]
  if (t.cap === 'step')
    parts.push(<rect key="s" x={t.x + t.w * 0.2} y={top - t.h * 0.08} width={t.w * 0.6} height={t.h * 0.08 + 1} fill={fill} />)
  if (t.cap === 'mast')
    parts.push(<rect key="m" x={t.x + t.w / 2 - 1.2} y={top - 26} width={2.4} height={27} fill={fill} />)
  if (t.cap === 'slant')
    parts.push(<path key="sl" d={`M${t.x} ${top}L${t.x + t.w} ${top - 16}L${t.x + t.w} ${top}z`} fill={fill} />)
  if (t.cap === 'dome')
    parts.push(<ellipse key="d" cx={t.x + t.w / 2} cy={top} rx={t.w * 0.42} ry={t.w * 0.34} fill={fill} />)
  return <g>{parts}</g>
}

function Trees({ seed, ranges, scale = 1 }: { seed: number; ranges: Array<[number, number, number]>; scale?: number }) {
  const shapes = useMemo(() => {
    const rnd = seeded(seed)
    const out: Array<{ cx: number; cy: number; r: number; c: string }> = []
    const palette = ['#3f7d3c', '#4f9146', '#5fa152', '#74b35f']
    for (const [from, to, height] of ranges) {
      let x = from
      while (x < to) {
        const size = (26 + rnd() * 30) * scale * height
        const base = GROUND + 6
        const blobs = 4 + Math.floor(rnd() * 3)
        for (let i = 0; i < blobs; i++) {
          const r = size * (0.55 + rnd() * 0.45)
          out.push({
            cx: x + (rnd() - 0.5) * size * 1.4,
            cy: base - size * 0.9 - rnd() * size * 0.9,
            r,
            c: palette[Math.min(palette.length - 1, Math.floor(rnd() * 2) + (i > 2 ? 2 : 0))],
          })
        }
        x += size * (0.9 + rnd() * 0.6)
      }
    }
    return out.sort((a, b) => a.cy - b.cy)
  }, [seed, ranges, scale])
  return (
    <g>
      {shapes.map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={s.r} fill={s.c} />
          <circle cx={s.cx - s.r * 0.28} cy={s.cy - s.r * 0.32} r={s.r * 0.55} fill="#8cc472" opacity={0.35} />
        </g>
      ))}
    </g>
  )
}

const Skyline = memo(function Skyline({ layer }: { layer: 'far' | 'mid' | 'near' }) {
  const far = useMemo(() => towers(7, -20, W + 40, 50, 170, 1050), [])
  const mid = useMemo(() => [...towers(19, 640, W + 40, 120, 270, 1080), ...towers(23, -20, 330, 70, 150)], [])

  if (layer === 'far')
    return (
      <svg viewBox={`0 0 ${W} 420`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <linearGradient id="sky-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c3d5ee" />
            <stop offset="1" stopColor="#dfe9f6" />
          </linearGradient>
        </defs>
        <g fill="url(#sky-far)">
          {far.map((t, i) => (
            <TowerShape key={i} t={t} fill="url(#sky-far)" />
          ))}
          {/* temple spire and domed hall, kept in the haze */}
          <path d="M548 404V318q14-58 24-92q10 34 24 92v86z" fill="url(#sky-far)" />
          <rect x="566" y="214" width="12" height="14" rx="3" fill="url(#sky-far)" />
          <rect x="396" y="350" width="96" height="56" fill="url(#sky-far)" />
          <ellipse cx="444" cy="350" rx="36" ry="30" fill="url(#sky-far)" />
          <rect x="1462" y="300" width="9" height="106" fill="url(#sky-far)" />
          <circle cx="1466.5" cy="298" r="9" fill="url(#sky-far)" />
          <rect x="1512" y="300" width="9" height="106" fill="url(#sky-far)" />
          <circle cx="1516.5" cy="298" r="9" fill="url(#sky-far)" />
        </g>
      </svg>
    )

  if (layer === 'mid')
    return (
      <svg viewBox={`0 0 ${W} 420`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <linearGradient id="sky-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a9c1e4" />
            <stop offset="1" stopColor="#cbdaef" />
          </linearGradient>
          <pattern id="sky-windows" width="12" height="16" patternUnits="userSpaceOnUse">
            <rect x="2.5" y="3" width="6" height="9" fill="#e4eefc" opacity="0.38" />
          </pattern>
        </defs>
        {mid.map((t, i) => (
          <g key={i}>
            <TowerShape t={t} fill="url(#sky-mid)" />
            <rect x={t.x + 4} y={GROUND - t.h + 8} width={Math.max(0, t.w - 8)} height={t.h - 8} fill="url(#sky-windows)" />
          </g>
        ))}
      </svg>
    )

  return (
    <svg viewBox={`0 0 ${W} 420`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6e3f3" />
          <stop offset="1" stopColor="#eef4fb" />
        </linearGradient>
      </defs>
      <rect x="-20" y={GROUND - 2} width={W + 40} height="40" fill="url(#ground)" />
      <rect x="-20" y={GROUND + 6} width={W + 40} height="2" fill="#ffffff" opacity="0.7" />
      <Trees
        seed={41}
        ranges={[
          [-40, 400, 1.15],
          [1240, 1660, 1.2],
        ]}
      />
      <Trees seed={53} ranges={[[560, 760, 0.55]]} scale={0.8} />
    </svg>
  )
})

function Cloud({ style, className }: { style?: CSSProperties; className?: string }) {
  const blob = (x: string, y: string, w: string, h: string) =>
    `radial-gradient(closest-side, rgba(255,255,255,0.96), rgba(255,255,255,0.75) 45%, rgba(255,255,255,0)) ${x} ${y} / ${w} ${h} no-repeat`
  return (
    <div
      className={className}
      style={{
        aspectRatio: '3 / 1',
        background: [
          blob('0%', '70%', '42%', '70%'),
          blob('30%', '30%', '48%', '95%'),
          blob('62%', '45%', '46%', '85%'),
          blob('100%', '75%', '38%', '60%'),
        ].join(','),
        ...style,
      }}
    />
  )
}

export function HeroBackdrop({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const farX = useTransform(px, (v) => v * -7)
  const farY = useTransform(py, (v) => v * -3)
  const midX = useTransform(px, (v) => v * -14)
  const midY = useTransform(py, (v) => v * -5)
  const nearX = useTransform(px, (v) => v * -24)
  const cloudX = useTransform(px, (v) => v * -10)

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#b9d6f9_0%,#d3e5fb_30%,#e6f0fd_56%,#f3f8fe_100%)]" />
      <div className="absolute -left-[12%] bottom-[2%] h-[78%] w-[58%] bg-[radial-gradient(closest-side,rgba(255,246,220,0.95),rgba(255,238,196,0.5)_45%,rgba(255,238,196,0)_76%)]" />
      <div className="absolute right-[-8%] top-[-10%] h-[70%] w-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.7),rgba(255,255,255,0))]" />

      <motion.div style={{ x: cloudX }} className="absolute inset-0">
        <Cloud className="absolute left-[54%] top-[9%] w-[min(440px,48vw)] animate-drift opacity-95" />
        <Cloud className="absolute left-[78%] top-[26%] w-[min(320px,40vw)] animate-drift-slow opacity-80" />
        <Cloud className="absolute left-[6%] top-[16%] w-[min(300px,40vw)] animate-drift-slow opacity-70" />
        <Cloud className="absolute left-[34%] top-[4%] w-[min(220px,30vw)] animate-drift opacity-60" />
      </motion.div>

      <motion.div style={{ x: farX, y: farY }} className="absolute inset-x-[-40px] bottom-0 h-[72%] opacity-90">
        <Skyline layer="far" />
      </motion.div>
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-x-[-40px] bottom-0 h-[64%] opacity-95">
        <Skyline layer="mid" />
      </motion.div>
      <motion.div style={{ x: nearX }} className="absolute inset-x-[-50px] bottom-0 h-[46%]">
        <Skyline layer="near" />
      </motion.div>

      <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(244,249,255,0.94)_0%,rgba(244,249,255,0.82)_32%,rgba(244,249,255,0.2)_55%,rgba(244,249,255,0)_70%)] lg:w-[78%]" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}
