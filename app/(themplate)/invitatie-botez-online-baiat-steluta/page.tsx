'use client'

import { useState, useEffect, useRef } from 'react'

/* ════════════════════════════════════════
   CONFIG — Tema Mint & Gold (Stele & Magie)
════════════════════════════════════════ */
const BG = 'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(167,243,208,.22) 0%, transparent 50%), radial-gradient(ellipse 70% 55% at 92% 88%, rgba(253,230,138,.28) 0%, transparent 52%), linear-gradient(148deg, #F0FDF9 0%, #ECFDF5 40%, #FFFBEB 100%)'

const SPARKLE_POS = [
  { t: '6%', l: '8%', w: 18, d: 2.6, delay: 0 },
  { t: '14%', l: '78%', w: 22, d: 3.1, delay: .4 },
  { t: '28%', l: '4%', w: 14, d: 3.7, delay: .9 },
  { t: '44%', l: '90%', w: 16, d: 2.9, delay: .2 },
  { t: '60%', l: '14%', w: 12, d: 4.1, delay: .7 },
  { t: '76%', l: '82%', w: 20, d: 3.4, delay: .5 },
  { t: '88%', l: '38%', w: 14, d: 3.8, delay: 1.2 },
  { t: '20%', l: '50%', w: 10, d: 4.5, delay: .3 },
  { t: '52%', l: '62%', w: 8, d: 5, delay: 1 },
]

const FLOAT_ITEMS = [
  { l: '3%', size: 42, d: 17, delay: 0, type: 'star' },
  { l: '16%', size: 56, d: 22, delay: 3, type: 'moon' },
  { l: '34%', size: 38, d: 19, delay: 8, type: 'star' },
  { l: '52%', size: 48, d: 24, delay: 1, type: 'cloud' },
  { l: '68%', size: 40, d: 20, delay: 6, type: 'star' },
  { l: '82%', size: 52, d: 23, delay: 4, type: 'moon' },
  { l: '94%', size: 36, d: 18, delay: 2, type: 'star' },
]

const CONFETTI_COLORS = ['#6EE7B7', '#FCD34D', '#A7F3D0', '#FDE68A', '#34D399', '#FBBF24', '#D1FAE5']



/* ════════════════════════════════════════
   COUNTDOWN
════════════════════════════════════════ */
function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const targetMs = target.getTime()
  useEffect(() => {
    const tick = () => {
      const diff = targetMs - Date.now()
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return }
      setT({ d: Math.floor(diff / 864e5), h: Math.floor((diff % 864e5) / 36e5), m: Math.floor((diff % 36e5) / 6e4), s: Math.floor((diff % 6e4) / 1e3) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [targetMs])
  return t
}
const pad = (n: number) => String(n).padStart(2, '0')

/* ════════════════════════════════════════
   CONFETTI CANVAS
════════════════════════════════════════ */
function ConfettiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; r: number; c: string; spin: number; spinV: number; shape: number }[]>([])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth; canvas.height = window.innerHeight
    particles.current = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width, y: -30 - Math.random() * 250,
      vx: (Math.random() - .5) * 3.5, vy: 2.2 + Math.random() * 3.5,
      r: 5 + Math.random() * 9, c: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      spin: Math.random() * Math.PI * 2, spinV: (Math.random() - .5) * .2, shape: Math.floor(Math.random() * 3),
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.spin += p.spinV
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.spin)
        ctx.fillStyle = p.c; ctx.globalAlpha = .9
        if (p.shape === 0) { ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * .4, 0, 0, Math.PI * 2); ctx.fill() }
        else if (p.shape === 1) { ctx.fillRect(-p.r * .5, -p.r * .5, p.r, p.r) }
        else { ctx.beginPath(); ctx.moveTo(0, -p.r); for (let i = 0; i < 4; i++) { ctx.lineTo(Math.cos((i * 2 + 1) * Math.PI / 4) * p.r * .4, Math.sin((i * 2 + 1) * Math.PI / 4) * p.r * .4); ctx.lineTo(Math.cos((i + 1) * Math.PI / 2) * p.r, Math.sin((i + 1) * Math.PI / 2) * p.r) } ctx.closePath(); ctx.fill() }
        ctx.restore()
      })
      particles.current = particles.current.filter(p => p.y < canvas.height + 60)
      if (particles.current.length > 0) frameRef.current = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    draw()
    return () => cancelAnimationFrame(frameRef.current)
  }, [active])

  if (!active) return null
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 400 }} />
}

/* ════════════════════════════════════════
   MAGIC CURSOR TRAIL
════════════════════════════════════════ */
function MagicTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const dots = useRef<{ x: number; y: number; r: number; alpha: number; c: string }[]>([])
  const colors = ['#6EE7B7', '#FCD34D', '#34D399', '#FBBF24', '#A7F3D0', '#FDE68A']

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth; canvas.height = window.innerHeight

    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
      for (let i = 0; i < 3; i++) {
        dots.current.push({ x: x + (Math.random() - .5) * 20, y: y + (Math.random() - .5) * 20, r: 3 + Math.random() * 5, alpha: 1, c: colors[Math.floor(Math.random() * colors.length)] })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.current.forEach(d => { d.alpha -= .034; d.r += .15; d.y -= .6 })
      dots.current = dots.current.filter(d => d.alpha > 0)
      dots.current.forEach(d => { ctx.save(); ctx.globalAlpha = d.alpha; ctx.fillStyle = d.c; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill(); ctx.restore() })
      frameRef.current = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    draw()
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onMove); cancelAnimationFrame(frameRef.current) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }} />
}

/* ════════════════════════════════════════
   SVG COMPONENTS
════════════════════════════════════════ */
const Sparkle = ({ style, color = '#FCD34D' }: { style?: React.CSSProperties; color?: string }) => (
  <svg style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1 C12.8 6.6 17.4 11.2 23 12 C17.4 12.8 12.8 17.4 12 23 C11.2 17.4 6.6 12.8 1 12 C6.6 11.2 11.2 6.6 12 1 Z" fill={color} />
  </svg>
)

const MoonSVG = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6 C12 8 6 16 8 26 C10 36 20 40 30 36 C20 36 12 28 14 18 C15 12 18 8 22 6 Z" fill="#FCD34D" opacity=".8" />
  </svg>
)

const CloudSVG = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="38" rx="36" ry="10" fill="#D1FAE5" />
    <ellipse cx="32" cy="30" rx="20" ry="14" fill="#ECFDF5" />
    <ellipse cx="56" cy="26" rx="18" ry="16" fill="#ECFDF5" />
    <ellipse cx="72" cy="32" rx="16" ry="12" fill="#ECFDF5" />
    <ellipse cx="46" cy="34" rx="28" ry="11" fill="#ECFDF5" />
  </svg>
)

function BgDecor() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {SPARKLE_POS.map((s, i) => (
        <div key={i} style={{ position: 'absolute', top: s.t, left: s.l, width: s.w, animation: `twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}>
          <Sparkle color={i % 3 === 0 ? '#FCD34D' : i % 3 === 1 ? '#6EE7B7' : '#FBBF24'} />
        </div>
      ))}
      {FLOAT_ITEMS.map((f, i) => (
        <div key={i} style={{ position: 'absolute', bottom: '-20%', left: f.l, width: f.size, opacity: .5, animation: `riseFloat ${f.d}s linear infinite ${f.delay}s` }}>
          {f.type === 'star' ? <Sparkle color={i % 2 ? '#FCD34D' : '#6EE7B7'} /> : f.type === 'moon' ? <MoonSVG /> : <CloudSVG />}
        </div>
      ))}
      <div style={{ position: 'absolute', top: '-10%', left: '-8%', width: 'clamp(180px,32vw,380px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(110,231,183,.18),transparent 70%)', animation: 'breathe 10s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-12%', right: '-8%', width: 'clamp(160px,28vw,340px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(253,211,77,.18),transparent 70%)', animation: 'breathe 13s ease-in-out infinite 3s' }} />
    </div>
  )
}

/* ──── MAGIC STAR WAND ──── */
const WandSVG = ({ className = '', spinning = false }: { className?: string; spinning?: boolean }) => (
  <svg className={className} viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="wand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6EE7B7" /><stop offset="1" stopColor="#34D399" /></linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#FCD34D" stopOpacity=".9" /><stop offset="1" stopColor="#FCD34D" stopOpacity="0" /></radialGradient>
    </defs>
    <circle cx="110" cy="56" r="52" fill="url(#glow)" style={{ animation: spinning ? 'none' : 'glowPulse 2.2s ease-in-out infinite' }} />
    <g style={{ transformBox: 'fill-box', transformOrigin: '110px 56px', animation: spinning ? 'spinFast 0.4s linear infinite' : 'starSpin 8s linear infinite' }}>
      <path d="M110 10 L119 38 L148 38 L126 56 L134 84 L110 68 L86 84 L94 56 L72 38 L101 38 Z" fill="#FCD34D" />
      <path d="M110 24 L116 40 L133 40 L120 50 L125 66 L110 57 L95 66 L100 50 L87 40 L104 40 Z" fill="#FBBF24" />
      <circle cx="110" cy="48" r="10" fill="#FEF3C7" opacity=".8" />
    </g>
    <rect x="105" y="90" width="10" height="130" rx="5" fill="url(#wand)" />
    <rect x="105" y="90" width="10" height="130" rx="5" fill="url(#wand)" opacity=".4" style={{ filter: 'blur(2px)' }} />
    {[120, 140, 160, 180].map((y, i) => <rect key={i} x="103" y={y} width="14" height="6" rx="3" fill="#FCD34D" opacity={.5 - i * .08} />)}
    {[[52, 100], [168, 90], [44, 168], [176, 160]].map(([x, y], i) => (
      <g key={i} style={{ transformBox: 'fill-box', transformOrigin: `${x}px ${y}px`, animation: `sparkleOrbit ${2.4 + i * .4}s ease-in-out infinite ${i * .5}s` }}>
        <path d={`M${x} ${y - 10} C${x + 1.5} ${y - 3} ${x + 7} ${y} ${x} ${y + 9} C${x - 1.5} ${y + 2} ${x - 7} ${y} ${x} ${y - 10}Z`} fill={i % 2 ? '#FCD34D' : '#6EE7B7'} />
      </g>
    ))}
    {spinning && [0, 60, 120, 180, 240, 300].map((angle, i) => (
      <circle key={i} cx={110 + Math.cos(angle * Math.PI / 180) * 66} cy={56 + Math.sin(angle * Math.PI / 180) * 66} r={4 - i * .4} fill={i % 2 ? '#FCD34D' : '#6EE7B7'} opacity={1 - i * .14} />
    ))}
  </svg>
)

const TeddyMini = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <circle cx="20" cy="22" r="9" fill="#D4A574" />
    <circle cx="60" cy="22" r="9" fill="#D4A574" />
    <circle cx="20" cy="22" r="5" fill="#E8C99A" />
    <circle cx="60" cy="22" r="5" fill="#E8C99A" />
    <circle cx="40" cy="38" r="24" fill="#E8C99A" />
    <ellipse cx="32" cy="34" rx="6" ry="7" fill="#FFFFFF" opacity=".8" />
    <ellipse cx="48" cy="34" rx="6" ry="7" fill="#FFFFFF" opacity=".8" />
    <circle cx="33" cy="36" r="3.5" fill="#2D1810" />
    <circle cx="47" cy="36" r="3.5" fill="#2D1810" />
    <circle cx="34" cy="35" r="1.2" fill="#FFFFFF" />
    <circle cx="48" cy="35" r="1.2" fill="#FFFFFF" />
    <ellipse cx="40" cy="46" rx="5" ry="3.5" fill="#8B5E3C" />
    <path d="M34 51 Q40 57 46 51" stroke="#7A4A2A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="28" cy="46" r="5" fill="#F4A882" opacity=".4" />
    <circle cx="52" cy="46" r="5" fill="#F4A882" opacity=".4" />
    <ellipse cx="40" cy="62" rx="18" ry="14" fill="#D4A574" />
    <ellipse cx="40" cy="62" rx="11" ry="9" fill="#E8C99A" />
  </svg>
)

/* icons */
const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z" /></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>)
const WhatsAppIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>)

type Phase = 'intro' | 'magic' | 'invite'

/* ════════════════════════════════════════
   INTRO SCREEN
════════════════════════════════════════ */
function IntroScreen({ onStart, phase }: { onStart: () => void; phase: Phase }) {
  const magic = phase === 'magic'
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!magic) return
    const id = setInterval(() => setTick(t => t + 1), 80)
    return () => clearInterval(id)
  }, [magic])

  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: BG }} />
      <BgDecor />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 560, padding: '0 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px,4vw,36px)', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div onClick={onStart} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onStart()}
            style={{ width: 'clamp(130px,28vw,200px)', cursor: 'pointer', flexShrink: 0, filter: magic ? 'drop-shadow(0 0 24px #FCD34D)' : 'none', transition: 'filter .4s' }}>
            <WandSVG spinning={magic} />
          </div>
          <div style={{ textAlign: 'left', flex: '1 1 200px', opacity: magic ? 0 : 1, transition: 'opacity .5s' }}>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.32em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 8, animation: 'fadeUp .7s ease both' }}>Invitație la Botez</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(38px,8vw,78px)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1, margin: '0 0 10px', animation: 'fadeUp .8s ease both .1s', background: 'linear-gradient(135deg,#059669,#D97706)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Matei Radu</h1>
            <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.9vw,18px)', fontStyle: 'italic', color: '#6B7280', lineHeight: 1.5, animation: 'fadeUp .9s ease both .2s' }}>Micuțul nostru magic îți deschide inima</p>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.24em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginTop: 18, animation: 'fadeUp 1s ease both .3s, pulse 2.8s ease-in-out infinite 1.3s' }}>🌟 Atinge bagheta pentru magie</p>
          </div>
        </div>

        {magic && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * Math.PI * 2 + tick * .15
              const r = 60 + (tick % 20) * 4
              return (
                <div key={i} style={{ position: 'absolute', left: `calc(50% + ${Math.cos(angle) * r}px)`, top: `calc(50% + ${Math.sin(angle) * r}px)`, width: 10 + (i % 3) * 4, opacity: .8 - (tick % 8) * .05 }}>
                  <Sparkle color={i % 3 === 0 ? '#FCD34D' : i % 3 === 1 ? '#6EE7B7' : '#FBBF24'} />
                </div>
              )
            })}
            <p style={{ position: 'absolute', bottom: '18%', fontFamily: "'Quicksand',sans-serif", fontSize: 13, letterSpacing: '.24em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, animation: 'pulse 1s ease-in-out infinite' }}>✨ Se pregătește magia…</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   INVITE SCREEN
════════════════════════════════════════ */
function InviteScreen({ onBack: _onBack }: { onBack: () => void }) {
  const BAPTISM = new Date('2027-05-15T11:00:00')
  const [modal, setModal] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [vis, setVis] = useState(false)
  const [flipS, setFlipS] = useState(false)
  const [insotit, setInsotit] = useState('')
  const [persoane, setPersoane] = useState('')
  const cd = useCountdown(BAPTISM)

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t) }, [])
  useEffect(() => { setFlipS(true); const t = setTimeout(() => setFlipS(false), 155); return () => clearTimeout(t) }, [cd.s])

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(28px)',
    transition: `opacity .65s ease ${d}s, transform .65s ease ${d}s`,
  })

  const mapsHref = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
  const wazeHref = (q: string) => `https://waze.com/ul?q=${encodeURIComponent(q)}&navigate=yes`

  const chip = (active: boolean): React.CSSProperties => ({
    flex: 1, textAlign: 'center', padding: '11px 6px', borderRadius: 12,
    border: `1.5px solid ${active ? '#059669' : 'rgba(5,150,105,.22)'}`,
    background: active ? 'rgba(5,150,105,.12)' : 'rgba(255,255,255,.75)',
    color: '#065F46', cursor: 'pointer', fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 700, userSelect: 'none', transition: 'all .18s'
  })

  const glass: React.CSSProperties = {
    background: 'rgba(255,255,255,.72)', backdropFilter: 'blur(14px)',
    border: '1px solid rgba(110,231,183,.3)', borderRadius: 22,
    boxShadow: '0 8px 30px rgba(5,150,105,.1)',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflowY: 'auto', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, background: BG, zIndex: 0 }} />
      <BgDecor />
      <MagicTrail />
      <ConfettiCanvas active={confetti} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto', padding: '32px 18px 60px' }}>

        {/* ── MASTHEAD */}
        <div style={{ ...a(0), ...glass, padding: 'clamp(28px,5vw,48px) clamp(20px,4vw,48px)', marginBottom: 22, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#6EE7B7,#FCD34D,#34D399,#FBBF24)', animation: 'shimmer 3s linear infinite', backgroundSize: '300% 100%' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#FBBF24,#34D399,#FCD34D,#6EE7B7)', animation: 'shimmer 3s linear infinite reverse', backgroundSize: '300% 100%' }} />

          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.32em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 14 }}>Invitație la Botez · 2027</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px,3vw,36px)', flexWrap: 'wrap', marginBottom: 16 }}>
            <div style={{ width: 60, animation: 'starSpin 8s linear infinite', flexShrink: 0 }}><WandSVG /></div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(48px,9vw,100px)', fontWeight: 600, fontStyle: 'italic', lineHeight: .95, background: 'linear-gradient(135deg,#059669,#D97706)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textShadow: 'none' }}>Rareș Ioan</span>
              <span style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.8vw,19px)', fontStyle: 'italic', color: '#6B7280', display: 'block', marginTop: 6 }}>Fiul lui Alina &amp; Cosmin</span>
            </div>
            <div style={{ width: 60, animation: 'starSpin 8s linear infinite reverse', flexShrink: 0 }}><WandSVG /></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ flex: 1, maxWidth: 180, height: 1, background: 'linear-gradient(90deg,transparent,rgba(110,231,183,.5))' }} />
            <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 12, letterSpacing: '.12em', color: '#059669', fontWeight: 700 }}>Sâmbătă · 15 Mai 2027 · Brașov</span>
            <div style={{ flex: 1, maxWidth: 180, height: 1, background: 'linear-gradient(90deg,rgba(110,231,183,.5),transparent)' }} />
          </div>
        </div>

        {/* ── GRID ROW 1: Countdown | Family */}
        <div style={{ ...a(.1), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16, marginBottom: 16 }}>

          {/* countdown */}
          <div style={{ ...glass, padding: '20px 22px' }}>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 14, textAlign: 'center' }}>⏳ Numărătoare Inversă</p>
            <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
              {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Min' }, { n: pad(cd.s), l: 'Sec', flip: flipS }].map((u, i) => (
                <div key={u.l} style={{ flex: 1, textAlign: 'center', padding: '0 4px', borderRight: i < 3 ? '1px solid rgba(110,231,183,.2)' : undefined }}>
                  <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, lineHeight: 1, color: (u as { flip?: boolean }).flip ? '#D97706' : '#065F46', transition: 'all .15s', transform: (u as { flip?: boolean }).flip ? 'scale(1.1)' : 'scale(1)' }}>{u.n}</span>
                  <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6B7280', fontWeight: 700, display: 'block', marginTop: 2 }}>{u.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* family */}
          <div style={{ ...glass, padding: '20px 22px' }}>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 14, textAlign: 'center' }}>👨‍👩‍👦 Familia</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: 'rgba(110,231,183,.1)', border: '1px solid rgba(110,231,183,.2)' }}>
                <div style={{ width: 32, flexShrink: 0 }}><TeddyMini /></div>
                <div>
                  <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: '#059669', fontWeight: 700 }}>Părinții</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontStyle: 'italic', color: '#065F46' }}>Alina &amp; Cosmin</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: 'rgba(253,211,77,.1)', border: '1px solid rgba(253,211,77,.25)' }}>
                <div style={{ width: 32, flexShrink: 0, animation: 'starSpin 6s linear infinite' }}><Sparkle color="#FCD34D" /></div>
                <div>
                  <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: '#D97706', fontWeight: 700 }}>Nașii</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontStyle: 'italic', color: '#92400E' }}>Mihaela &amp; Florin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── EVENTS */}
        <div style={{ ...a(.2), marginBottom: 16 }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 14, textAlign: 'center' }}>📍 Program</p>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {[
              { emoji: '⛪', label: 'Botez', venue: 'Catedrala Sf. Nicolae', addr: 'Str. Lungă 5, Brașov', time: '11:00', c1: '#6EE7B7', c2: '#059669', bg: 'rgba(110,231,183,.12)', border: 'rgba(110,231,183,.3)' },
              { emoji: '🎉', label: 'Petrecere', venue: 'Salon Magia Verde', addr: 'Calea Florești 22, Brașov', time: '14:30', c1: '#FCD34D', c2: '#D97706', bg: 'rgba(253,211,77,.12)', border: 'rgba(253,211,77,.35)' },
            ].map(ev => {
              const q = `${ev.venue}, ${ev.addr}`
              return (
                <div key={ev.label} style={{ minWidth: 'clamp(260px,48vw,340px)', borderRadius: 20, overflow: 'hidden', border: `1.5px solid ${ev.border}`, background: ev.bg, backdropFilter: 'blur(12px)', boxShadow: '0 8px 28px rgba(5,150,105,.1)', flexShrink: 0, transition: 'transform .24s,box-shadow .24s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 18px 44px rgba(5,150,105,.18)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(5,150,105,.1)' }}>
                  <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${ev.border}` }}>
                    <span style={{ fontSize: 28 }}>{ev.emoji}</span>
                    <div>
                      <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: ev.c2, fontWeight: 700 }}>{ev.label}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: 'italic', color: ev.c2 }}>{ev.venue}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', padding: '5px 11px', borderRadius: 100, background: 'rgba(255,255,255,.8)', border: `1px solid ${ev.border}`, fontFamily: "'Quicksand',sans-serif", fontSize: 11, fontWeight: 700, color: ev.c2, whiteSpace: 'nowrap' }}>🕐 {ev.time}</div>
                  </div>
                  <div style={{ padding: '12px 18px 16px' }}>
                    <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>{ev.addr}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={wazeHref(q)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 8px', borderRadius: 11, background: 'linear-gradient(135deg,#08A2D4,#0788B0)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none' }}><WazeIcon /> Waze</a>
                      <a href={mapsHref(q)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 8px', borderRadius: 11, background: 'linear-gradient(135deg,#4CAF4F,#388E3C)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none' }}><MapsIcon /> Maps</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── CONTACT | RSVP */}
        <div style={{ ...a(.3), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 16, marginBottom: 16 }}>

          {/* contact */}
          <div style={{ ...glass, padding: '20px 22px' }}>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 12 }}>📞 Contact</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontStyle: 'italic', color: '#065F46', marginBottom: 3 }}>Familia Radu</p>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 14, color: '#D97706', fontWeight: 700, letterSpacing: '.06em', marginBottom: 14 }}>0724 580 319</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="tel:0724580319" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 8px', borderRadius: 12, background: 'linear-gradient(135deg,#34D399,#059669)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 16px rgba(5,150,105,.3)' }}><PhoneIcon /> Telefon</a>
              <a href="https://wa.me/40724580319" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 8px', borderRadius: 12, background: 'linear-gradient(135deg,#25D366,#1DA851)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,.3)' }}><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>

          {/* rsvp */}
          <div style={{ ...glass, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 8 }}>✅ Confirmare</p>
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', color: '#374151', lineHeight: 1.6 }}>Confirmați prezența până pe<br /><strong style={{ color: '#D97706', fontStyle: 'normal' }}>1 Mai 2027</strong></p>
            </div>
            <button onClick={() => setModal(true)} style={{ width: '100%', padding: '16px 0', borderRadius: 100, background: 'linear-gradient(135deg,#34D399 0%,#D97706 100%)', backgroundSize: '200% 100%', color: '#fff', fontFamily: "'Quicksand',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', boxShadow: '0 12px 36px rgba(5,150,105,.35)', transition: 'transform .22s,box-shadow .22s', backgroundPosition: '0% 0%', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 20px 50px rgba(5,150,105,.5)'; (e.currentTarget as HTMLButtonElement).style.backgroundPosition = '100% 0%' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(5,150,105,.35)'; (e.currentTarget as HTMLButtonElement).style.backgroundPosition = '0% 0%' }}>
              <span style={{ position: 'relative', zIndex: 1 }}>✨ Confirmă Participarea</span>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)', backgroundSize: '300px 100%', animation: 'shimmer 2.5s linear infinite' }} />
            </button>
          </div>
        </div>

        {/* ── QUOTE */}
        <div style={{ ...a(.4), ...glass, padding: '22px 28px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 28, animation: 'starSpin 5s linear infinite' }}><Sparkle color="#FCD34D" /></div>
            <div style={{ width: 36 }}><TeddyMini /></div>
            <div style={{ width: 28, animation: 'starSpin 5s linear infinite reverse' }}><Sparkle color="#6EE7B7" /></div>
          </div>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(16px,2.2vw,22px)', fontStyle: 'italic', color: '#065F46', lineHeight: 1.7 }}>
            Prezența voastră face totul perfect pentru această zi magică.
          </p>
        </div>

        {/* ── CTA buy */}
        <div style={{ ...a(.48), ...glass, padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#6EE7B7,#FCD34D,#34D399)', backgroundSize: '300% 100%', animation: 'shimmer 3s linear infinite' }} />
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 16, fontStyle: 'italic', color: '#374151', margin: 0, textAlign: 'center' }}>Îți place această temă? Personalizează-o pentru botezul copilului tău</p>
          <a href="/preturi?tema=botez-mint" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 42px', borderRadius: 100, background: 'linear-gradient(135deg,#34D399 0%,#D97706 100%)', color: '#fff', textDecoration: 'none', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', boxShadow: '0 10px 34px rgba(5,150,105,.38)', transition: 'transform .2s,box-shadow .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px) scale(1.02)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 18px 48px rgba(5,150,105,.54)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 34px rgba(5,150,105,.38)' }}>
            ✨ Alege Această Temă
          </a>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(107,114,128,.5)', fontWeight: 700, margin: 0 }}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* ══ RSVP MODAL */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(5,60,40,.35)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeIn .28s ease', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(165deg,#FFFFFF,#F0FDF9)', borderRadius: 28, padding: 'clamp(24px,4vw,38px) clamp(18px,4vw,32px)', maxWidth: 460, width: '100%', border: '1px solid rgba(110,231,183,.3)', boxShadow: '0 40px 110px rgba(5,80,50,.24)', animation: 'slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <div style={{ width: 60, margin: '0 auto 12px', animation: 'starSpin 6s linear infinite' }}><WandSVG /></div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,28px)', fontStyle: 'italic', fontWeight: 600, color: '#065F46', marginBottom: 6 }}>Confirmă Participarea</h2>
              <div style={{ width: 40, height: 1.5, background: 'linear-gradient(90deg,#6EE7B7,#FCD34D)', margin: '0 auto 10px', borderRadius: 2 }} />
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 14, fontStyle: 'italic', color: '#6B7280', lineHeight: 1.7 }}>Completează câmpurile de mai jos</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 8 }}>Nume și Prenume</label>
                <input type="text" placeholder="ex. Maria Popescu" style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid rgba(110,231,183,.3)', background: 'rgba(255,255,255,.9)', fontFamily: "'Nunito',sans-serif", fontSize: 13, color: '#065F46', outline: 'none' }}
                  onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(5,150,105,.6)'}
                  onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(110,231,183,.3)'} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 8 }}>Veți fi însoțit/ă?</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Da', 'Nu'].map(opt => <div key={opt} onClick={() => setInsotit(opt)} style={chip(insotit === opt)}>{opt}</div>)}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#059669', fontWeight: 700, marginBottom: 8 }}>Număr persoane</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['1', '2', '3', '4', '5+'].map(opt => <div key={opt} onClick={() => setPersoane(opt)} style={chip(persoane === opt)}>{opt}</div>)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 22 }}>
              <button onClick={() => { setModal(false); setConfetti(true); setTimeout(() => setConfetti(false), 4000) }} style={{ display: 'block', width: '100%', padding: '15px 0', borderRadius: 100, background: 'linear-gradient(135deg,#34D399,#D97706)', color: '#fff', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 10px 32px rgba(5,150,105,.38)', transition: 'transform .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = ''}>
                ✨ Trimite Confirmarea
              </button>
              <div style={{ marginTop: 14, padding: '14px 16px', background: 'rgba(110,231,183,.1)', border: '1px solid rgba(110,231,183,.25)', borderRadius: 12, textAlign: 'center' }}>
                <p style={{ fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: '#374151', lineHeight: 1.8 }}>
                  Mulțumim! 🌟 Aceasta este o demonstrație a temei <strong style={{ color: '#059669', fontStyle: 'normal' }}>Mint &amp; Gold</strong>.<br />Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={() => setModal(false)} style={{ display: 'block', margin: '10px auto 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(107,114,128,.6)', textDecoration: 'underline' }}>Închide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */
export default function App() {
  const [phase, setPhase] = useState<Phase>('intro')

  function startMagic() {
    if (phase !== 'intro') return
    setPhase('magic')
    setTimeout(() => setPhase('invite'), 2200)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'Nunito',sans-serif;background:#F0FDF9;color:#065F46;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes starSpin{to{transform:rotate(360deg)}}
        @keyframes spinFast{to{transform:rotate(360deg)}}
        @keyframes sparkleOrbit{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.3)}}
        @keyframes glowPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
        @keyframes riseFloat{0%{transform:translateY(0) rotate(-4deg);opacity:0}10%{opacity:.5}90%{opacity:.5}100%{transform:translateY(-120vh) rotate(4deg);opacity:0}}
        @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
        @keyframes twinkle{0%,100%{opacity:.25;transform:scale(.75) rotate(0deg)}50%{opacity:1;transform:scale(1.25) rotate(18deg)}}
        @keyframes shimmer{0%{background-position:0% 0}100%{background-position:300% 0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.45}50%{opacity:1}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: 'rgba(240,253,249,.94)', borderBottom: '1px solid rgba(110,231,183,.2)', backdropFilter: 'blur(14px)' }}>
        <a href="/invitatii-digitale" style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#065F46', textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#D97706'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#065F46'}>
          Vibe<span style={{ color: '#059669' }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant',serif", fontSize: 16, fontStyle: 'italic', color: '#374151', letterSpacing: '.04em' }}>
          {phase === 'invite' ? 'Rareș Ioan · 15 Mai 2027' : 'Invitație la Botez'}
        </div>
        <a href="/invitatii-digitale" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(110,231,183,.14)', border: '1px solid rgba(110,231,183,.3)', color: '#065F46', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', transition: 'all .2s' }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(110,231,183,.24)'; b.style.borderColor = 'rgba(110,231,183,.5)' }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(110,231,183,.14)'; b.style.borderColor = 'rgba(110,231,183,.3)' }}>
          <BackArrow /> Înapoi
        </a>
      </header>

      {phase !== 'invite' && <IntroScreen onStart={startMagic} phase={phase} />}
      {phase === 'invite' && <InviteScreen onBack={() => setPhase('intro')} />}
    </>
  )
}