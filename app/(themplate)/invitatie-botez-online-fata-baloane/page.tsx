'use client'

import { useState, useEffect } from 'react'

/* ════════════════════════════════════════
   CONFIG — Tema Prințesă (Carusel Magic)
════════════════════════════════════════ */
const SKY_BG = 'radial-gradient(ellipse 75% 60% at 20% 15%, rgba(216,180,254,.4) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(255,214,165,.35) 0%, transparent 55%), linear-gradient(155deg, #FFF9F0 0%, #FDEFFA 45%, #F3E4FF 100%)'

const STARS = [
  { t: '10%', l: '18%', w: 16, d: 2.8, delay: 0 },
  { t: '20%', l: '76%', w: 12, d: 3.4, delay: .5 },
  { t: '38%', l: '10%', w: 10, d: 3.8, delay: .2 },
  { t: '55%', l: '82%', w: 14, d: 3.1, delay: .8 },
  { t: '68%', l: '26%', w: 9, d: 4.2, delay: .15 },
  { t: '30%', l: '48%', w: 8, d: 4.6, delay: 1 },
  { t: '78%', l: '60%', w: 10, d: 3.6, delay: .65 },
  { t: '14%', l: '52%', w: 7, d: 5, delay: .35 },
]

const BALLOONS = [
  { l: '6%', d: 18, delay: 0, c: '#F472B6' },
  { l: '22%', d: 22, delay: 4, c: '#A78BFA' },
  { l: '40%', d: 20, delay: 2, c: '#FDBA74' },
  { l: '60%', d: 24, delay: 6, c: '#F9A8D4' },
  { l: '78%', d: 19, delay: 1, c: '#C4B5FD' },
  { l: '90%', d: 23, delay: 5, c: '#FDE68A' },
]

const TRAIL = [
  { x: '14%', y: '14%', s: 16, delay: .05, k: 'star' },
  { x: '26%', y: '34%', s: 20, delay: .18, k: 'confetti' },
  { x: '40%', y: '18%', s: 14, delay: .32, k: 'star' },
  { x: '52%', y: '40%', s: 22, delay: .46, k: 'crown' },
  { x: '64%', y: '20%', s: 16, delay: .6, k: 'confetti' },
  { x: '76%', y: '36%', s: 18, delay: .74, k: 'star' },
  { x: '34%', y: '48%', s: 12, delay: .4, k: 'confetti' },
  { x: '58%', y: '14%', s: 14, delay: .66, k: 'star' },
]


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
   SVG COMPONENTS
════════════════════════════════════════ */
const Star = ({ className = '', style, color = '#FDBA74' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1 C12.8 6.6 17.4 11.2 23 12 C17.4 12.8 12.8 17.4 12 23 C11.2 17.4 6.6 12.8 1 12 C6.6 11.2 11.2 6.6 12 1 Z" fill={color} />
  </svg>
)

const Confetti = ({ className = '', style, color = '#F472B6' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="6" rx="2" fill={color} transform="rotate(20 12 12)" />
  </svg>
)

const Crown = ({ className = '', style, color = '#FBBF24' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18 L3 9 L8 13 L12 6 L16 13 L21 9 L21 18 Z" fill={color} />
    <circle cx="3" cy="7" r="1.6" fill={color} />
    <circle cx="12" cy="4" r="1.6" fill={color} />
    <circle cx="21" cy="7" r="1.6" fill={color} />
    <rect x="3" y="18" width="18" height="2.4" rx="1" fill={color} />
  </svg>
)

const Balloon = ({ className = '', style, color = '#F472B6' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="34" rx="28" ry="32" fill={color} />
    <path d="M22 60 C22 64 26 64 28 66 C30 68 30 72 28 74" stroke={color} strokeWidth="2" fill="none" opacity=".7" />
    <path d="M30 64 L30 96" stroke="#D9C2B0" strokeWidth="1.6" />
    <path d="M22 56 C26 64 34 64 38 56 L30 64 Z" fill={color} />
    <ellipse cx="20" cy="20" rx="6" ry="9" fill="#FFFFFF" opacity=".35" />
  </svg>
)

function SkyDecor() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {STARS.map((s, i) => (
        <div key={i} style={{ position: 'absolute', top: s.t, left: s.l, width: s.w, animation: `twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}><Star /></div>
      ))}
      {BALLOONS.map((b, i) => (
        <Balloon key={i} color={b.c} style={{ position: 'absolute', bottom: '-22%', left: b.l, width: 'clamp(36px,7vw,64px)', opacity: .55, animation: `riseUp ${b.d}s linear infinite ${b.delay}s` }} />
      ))}
    </div>
  )
}

const CarouselSVG = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="cpole" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBBF24" /><stop offset="1" stopColor="#F59E0B" /></linearGradient>
      <radialGradient id="cglow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#FDE68A" stopOpacity=".55" /><stop offset="1" stopColor="#FDE68A" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="120" cy="216" rx="92" ry="10" fill="#A78BFA" opacity=".15" />
    <circle cx="120" cy="120" r="116" fill="url(#cglow)" />
    {/* top */}
    <path d="M120 18 L168 58 L72 58 Z" fill="#A78BFA" />
    <circle cx="120" cy="14" r="8" fill="#FBBF24" />
    <ellipse cx="120" cy="58" rx="56" ry="10" fill="#F9A8D4" />
    {/* spinning platform with horses */}
    <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'carouselSpin 5s linear infinite' }}>
      <line x1="120" y1="68" x2="46" y2="186" stroke="url(#cpole)" strokeWidth="4" />
      <line x1="120" y1="68" x2="194" y2="186" stroke="url(#cpole)" strokeWidth="4" />
      <line x1="120" y1="68" x2="120" y2="190" stroke="url(#cpole)" strokeWidth="4" />
      {/* horse 1 */}
      <g transform="translate(46 150)">
        <ellipse cx="0" cy="36" rx="22" ry="9" fill="#F9A8D4" />
        <path d="M-16 30 C-22 10 -10 -8 8 -6 C20 -4 22 14 14 28 C8 36 -8 38 -16 30 Z" fill="#FBCFE8" />
        <path d="M8 -6 C16 -14 28 -16 28 -6 C28 0 18 2 12 0 Z" fill="#FBCFE8" />
        <circle cx="20" cy="-2" r="2" fill="#7C3AED" />
        <path d="M2 -8 C6 -16 14 -18 16 -12" stroke="#FBBF24" strokeWidth="3" fill="none" />
      </g>
      {/* horse 2 */}
      <g transform="translate(194 150) scale(-1,1)">
        <ellipse cx="0" cy="36" rx="22" ry="9" fill="#C4B5FD" />
        <path d="M-16 30 C-22 10 -10 -8 8 -6 C20 -4 22 14 14 28 C8 36 -8 38 -16 30 Z" fill="#DDD6FE" />
        <path d="M8 -6 C16 -14 28 -16 28 -6 C28 0 18 2 12 0 Z" fill="#DDD6FE" />
        <circle cx="20" cy="-2" r="2" fill="#7C3AED" />
        <path d="M2 -8 C6 -16 14 -18 16 -12" stroke="#FBBF24" strokeWidth="3" fill="none" />
      </g>
      {/* horse 3 */}
      <g transform="translate(120 174)">
        <ellipse cx="0" cy="20" rx="22" ry="9" fill="#FDE68A" />
        <path d="M-16 14 C-22 -6 -10 -24 8 -22 C20 -20 22 -2 14 12 C8 20 -8 22 -16 14 Z" fill="#FEF3C7" />
        <path d="M8 -22 C16 -30 28 -32 28 -22 C28 -16 18 -14 12 -16 Z" fill="#FEF3C7" />
        <circle cx="20" cy="-18" r="2" fill="#7C3AED" />
        <path d="M2 -24 C6 -32 14 -34 16 -28" stroke="#F472B6" strokeWidth="3" fill="none" />
      </g>
    </g>
    <ellipse cx="120" cy="190" rx="70" ry="12" fill="#FBBF24" opacity=".35" />
  </svg>
)

const TopMotif = () => (
  <div style={{ position: 'relative', width: 'clamp(150px,30vw,220px)' }}>
    <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 30, animation: 'twinkle 3s ease-in-out infinite' }}><Crown /></div>
    <div style={{ position: 'absolute', top: 14, left: '14%', width: 14, animation: 'twinkle 3.6s ease-in-out infinite .5s' }}><Star color="#F472B6" /></div>
    <div style={{ position: 'absolute', top: 18, right: '14%', width: 12, animation: 'twinkle 4s ease-in-out infinite .9s' }}><Star color="#A78BFA" /></div>
    <CarouselSVG />
  </div>
)

/* icons reused */
const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z" /></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>)
const WhatsAppIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>)

type Phase = 'intro' | 'spin' | 'invite'

/* ════════════════════════════════════════
   INTRO SCREEN — carusel magic
════════════════════════════════════════ */
function IntroScreen({ onStart, phase }: { onStart: () => void; phase: Phase }) {
  const spinning = phase === 'spin'
  const fade: React.CSSProperties = { opacity: spinning ? 0 : 1, transition: 'opacity .5s ease' }
  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: SKY_BG }} />
      <SkyDecor />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '16px 22px', width: '100%' }}>
        <p style={{ ...fade, fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, animation: 'fadeUp .7s ease both' }}>Invitație la Botez</p>
        <h1 style={{ ...fade, fontFamily: "'Playfair Display',serif", fontSize: 'clamp(42px,9vw,84px)', fontWeight: 600, fontStyle: 'italic', textAlign: 'center', lineHeight: 1, margin: 0, animation: 'fadeUp .8s ease both .08s, shineText 3.5s linear infinite', background: 'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Emma Ilinca</h1>
        <p style={{ ...fade, fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,2vw,19px)', fontStyle: 'italic', color: '#9D7BB0', textAlign: 'center', maxWidth: 360, lineHeight: 1.5, animation: 'fadeUp .9s ease both .16s' }}>Vă invităm la o poveste magică — botezul micuței noastre prințese</p>

        <div onClick={onStart} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onStart()} style={{ position: 'relative', width: 'min(86vw,300px)', height: 'min(86vw,300px)', cursor: 'pointer', marginTop: 6 }}>
          {spinning && TRAIL.map((it, i) => (
            <div key={i} style={{ position: 'absolute', left: it.x, top: it.y, width: it.s, opacity: 0, animation: `trailPop 1.1s ease ${it.delay}s forwards`, zIndex: 3, pointerEvents: 'none' }}>
              {it.k === 'star' ? <Star /> : it.k === 'crown' ? <Crown /> : <Confetti color={i % 2 ? '#A78BFA' : '#F472B6'} />}
            </div>
          ))}
          <div style={{ width: '100%', height: '100%', transform: spinning ? 'scale(1.3) rotate(360deg)' : 'scale(1)', opacity: spinning ? 0 : 1, transition: 'transform 1.85s cubic-bezier(.5,.03,.5,1), opacity 1.6s ease' }}>
            <CarouselSVG />
          </div>
        </div>

        <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.24em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, opacity: spinning ? .9 : undefined, animation: spinning ? 'none' : 'fadeUp 1s ease both .4s, pulse 2.8s ease-in-out infinite 1.4s' }}>
          {spinning ? '✦  Pornește magia…' : 'Atinge caruselul pentru a începe'}
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   INVITE SCREEN
════════════════════════════════════════ */
function InviteScreen({ onBack: _onBack }: { onBack: () => void }) {
  const BAPTISM = new Date('2027-07-17T13:00:00')
  const [modal, setModal] = useState(false)
  const [vis, setVis] = useState(false)
  const [flipS, setFlipS] = useState(false)
  const [insotit, setInsotit] = useState('')
  const [persoane, setPersoane] = useState('')
  const cd = useCountdown(BAPTISM)

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t) }, [])
  useEffect(() => { setFlipS(true); const t = setTimeout(() => setFlipS(false), 155); return () => clearTimeout(t) }, [cd.s])

  const a = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s ease ${d}s, transform .7s ease ${d}s`,
  })

  const cardHover = {
    onMouseEnter: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-5px) scale(1.015)'; el.style.boxShadow = '0 20px 50px rgba(167,139,250,.28)' },
    onMouseLeave: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 6px 28px rgba(167,139,250,.14)' },
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid rgba(167,139,250,.3)', background: 'rgba(255,255,255,.85)', fontFamily: "'Nunito',sans-serif", fontSize: 13, color: '#7C3AED', outline: 'none' }
  const chip = (active: boolean): React.CSSProperties => ({ flex: 1, textAlign: 'center', padding: '11px 6px', borderRadius: 12, border: `1.5px solid ${active ? '#F472B6' : 'rgba(167,139,250,.28)'}`, background: active ? 'rgba(244,114,182,.14)' : 'rgba(255,255,255,.75)', color: active ? '#DB2777' : '#7C3AED', cursor: 'pointer', fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 700, userSelect: 'none', transition: 'all .18s' })
  const fieldLabel: React.CSSProperties = { display: 'block', fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, marginBottom: 8 }

  const mapsHref = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
  const wazeHref = (q: string) => `https://waze.com/ul?q=${encodeURIComponent(q)}&navigate=yes`

  const events = [
    { type: 'Slujba Religioasă', name: 'Taina Botezului', venue: 'Catedrala Sfânta Treime', addr: 'Piața Unirii 3, Timișoara', time: '13:00', bg: 'linear-gradient(135deg,#A78BFA 0%,#7C3AED 100%)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 2L12 6M10 4h4" /><rect x="4" y="9" width="16" height="12" rx="1" /><path d="M9 21V14a3 3 0 0 1 6 0v7" /><path d="M4 9l8-4 8 4" /></svg> },
    { type: 'Petrecerea de După', name: 'Bal de Prințese', venue: 'Palatul Crystal', addr: 'Str. Mărăști 88, Timișoara', time: '17:00', bg: 'linear-gradient(135deg,#F472B6 0%,#DB2777 100%)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><ellipse cx="9" cy="8" rx="4" ry="5" /><ellipse cx="16" cy="10" rx="3.2" ry="4" /><path d="M9 13 C9 16 8 17 8 19" /><path d="M16 14 C16 16 17 17 17 19" /><path d="M8 19 L17 19" /></svg> },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflowY: 'auto', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, background: SKY_BG, zIndex: 0 }} />
      <SkyDecor />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: '44px 22px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* HERO */}
        <div style={{ ...a(0), textAlign: 'center', marginBottom: 4 }}>
          <div style={{ width: 36, margin: '0 auto 10px', animation: 'floatY 4s ease-in-out infinite' }}><Crown /></div>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, marginBottom: 10 }}>Invitație la Botez</p>
          <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(56px,10vw,112px)', fontWeight: 600, fontStyle: 'italic', lineHeight: .95, letterSpacing: '-.01em', backgroundImage: 'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'shineText 5s linear infinite' }}>Emma Ilinca</span>
          <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(15px,1.9vw,20px)', fontStyle: 'italic', fontWeight: 400, color: '#9D7BB0', marginTop: 8 }}>Fiica lui Cristina &amp; Bogdan</span>
        </div>

        {/* DATE BADGE */}
        <div style={{ ...a(.08), display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 22, padding: '10px 24px', borderRadius: 100, background: 'linear-gradient(135deg,rgba(167,139,250,.16),rgba(244,114,182,.16))', border: '1px solid rgba(167,139,250,.3)' }}>
          <span style={{ fontSize: 16 }}>🎈</span>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.5vw,14px)', letterSpacing: '.1em', color: '#7C3AED', fontWeight: 700 }}>Sâmbătă · 17 Iulie 2027 · Timișoara</p>
        </div>

        {/* COUNTDOWN */}
        <div style={{ ...a(.16), width: '100%', maxWidth: 440, background: 'rgba(255,255,255,.65)', border: '1px solid rgba(167,139,250,.22)', borderRadius: 24, padding: '24px 18px', backdropFilter: 'blur(14px)', textAlign: 'center', boxShadow: '0 10px 36px rgba(167,139,250,.18)', marginTop: 26 }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(8px,.95vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, marginBottom: 14 }}>Numărătoare Magică</p>
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
            {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map(u => (
              <div key={u.l} style={{ flex: 1, maxWidth: 104, textAlign: 'center', padding: '0 4px', borderRight: '1px solid rgba(167,139,250,.18)' }}>
                <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(36px,5.8vw,58px)', fontWeight: 400, lineHeight: 1, transition: 'transform .15s ease, color .15s ease', transform: (u as { flip?: boolean }).flip ? 'scale(1.12) translateY(-3px)' : 'scale(1)', color: (u as { flip?: boolean }).flip ? '#F472B6' : '#7C3AED' }}>{u.n}</span>
                <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(7px,.85vw,9px)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, display: 'block', marginTop: 3 }}>{u.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAMILY — glass duo cards */}
        <div style={{ ...a(.24), display: 'flex', gap: 14, width: '100%', maxWidth: 480, marginTop: 26, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 200px', textAlign: 'center', padding: '20px 18px', borderRadius: 18, background: 'rgba(255,255,255,.65)', border: '1px solid rgba(244,114,182,.22)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 28px rgba(244,114,182,.14)', transition: 'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
            <span style={{ fontSize: 22, display: 'block', marginBottom: 6 }}>👑</span>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, marginBottom: 8 }}>Părinții</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(17px,2.2vw,22px)', fontStyle: 'italic', color: '#7C3AED' }}>Cristina &amp; Bogdan</p>
          </div>
          <div style={{ flex: '1 1 200px', textAlign: 'center', padding: '20px 18px', borderRadius: 18, background: 'rgba(255,255,255,.65)', border: '1px solid rgba(167,139,250,.22)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 28px rgba(167,139,250,.14)', transition: 'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
            <span style={{ fontSize: 22, display: 'block', marginBottom: 6 }}>✨</span>
            <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, marginBottom: 8 }}>Nașii</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(17px,2.2vw,22px)', fontStyle: 'italic', color: '#7C3AED' }}>Larisa &amp; Tudor</p>
          </div>
        </div>

        {/* EVENT CARDS */}
        <div style={{ ...a(.32), width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(12px,2vw,22px)', maxWidth: 640, marginTop: 26 }}>
          {events.map(card => {
            const q = `${card.venue}, ${card.addr}`
            return (
              <div key={card.type} style={{ borderRadius: 20, overflow: 'hidden', border: '1.5px solid rgba(167,139,250,.22)', background: 'rgba(255,255,255,.75)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(167,139,250,.16)', transition: 'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                <div style={{ padding: '16px 18px 12px', background: card.bg, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.22)', border: '1px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{card.icon}</div>
                  <div>
                    <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.8)', fontWeight: 700, display: 'block', marginBottom: 2 }}>{card.type}</span>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>{card.name}</p>
                  </div>
                </div>
                <div style={{ padding: '14px 18px 16px' }}>
                  <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 'clamp(11px,1.2vw,13px)', color: '#7C3AED', marginBottom: 3, letterSpacing: '.02em' }}>{card.venue}</p>
                  <p style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: '#9D7BB0', lineHeight: 1.5, marginBottom: 10 }}>{card.addr}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(167,139,250,.12)', border: '1px solid rgba(167,139,250,.25)', borderRadius: 100, padding: '4px 11px', fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, color: '#7C3AED', marginBottom: 12 }}>🎉 17 iulie 2027 · ora {card.time}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={wazeHref(q)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 8px', borderRadius: 11, background: 'linear-gradient(135deg,#08A2D4,#0788B0)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}><WazeIcon /> Waze</a>
                    <a href={mapsHref(q)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 8px', borderRadius: 11, background: 'linear-gradient(135deg,#4CAF4F,#388E3C)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}><MapsIcon /> Maps</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CONTACT */}
        <div style={{ ...a(.4), width: '100%', maxWidth: 640, background: 'rgba(255,255,255,.65)', border: '1px solid rgba(167,139,250,.2)', borderRadius: 18, padding: '16px 20px', backdropFilter: 'blur(8px)', boxShadow: '0 8px 26px rgba(167,139,250,.14)', marginTop: 'clamp(12px,2vw,20px)' }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 700, marginBottom: 12 }}>Contact Părinți</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,1.8vw,18px)', fontStyle: 'italic', color: '#7C3AED', marginBottom: 2 }}>Familia</p>
              <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', color: '#DB2777', letterSpacing: '.06em', fontWeight: 700 }}>0731 559 207</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="tel:0731559207" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#A78BFA,#7C3AED)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 16px rgba(124,58,237,.35)', textDecoration: 'none' }}><PhoneIcon /> Telefon</a>
              <a href="https://wa.me/40731559207" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#25D366,#1DA851)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(37,211,102,.3)', textDecoration: 'none' }}><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>
        </div>

        {/* RSVP */}
        <div style={{ ...a(.48), textAlign: 'center', width: '100%', maxWidth: 380, marginTop: 30 }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', color: '#9D7BB0', marginBottom: 14, lineHeight: 1.6, letterSpacing: '.03em' }}>
            Confirmați-vă locul la bal<br />până pe <strong style={{ color: '#DB2777', fontStyle: 'normal' }}>5 Iulie 2027</strong>
          </p>
          <button onClick={() => setModal(true)} style={{ display: 'block', width: '100%', padding: 'clamp(15px,1.9vw,19px) 0', borderRadius: 100, backgroundImage: 'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize: '300% 100%', animation: 'shineText 5s linear infinite', color: '#fff', textAlign: 'center', fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', boxShadow: '0 12px 38px rgba(167,139,250,.4)', transition: 'transform .22s,box-shadow .22s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.02)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 20px 50px rgba(167,139,250,.55)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 38px rgba(167,139,250,.4)' }}>
            Confirmă Participarea 👑
          </button>
        </div>

        {/* CLOSING */}
        <div style={{ ...a(.56), width: '100%', maxWidth: 480, textAlign: 'center', marginTop: 26, padding: '24px 26px', background: 'rgba(255,255,255,.6)', border: '1px solid rgba(167,139,250,.2)', borderRadius: 20, backdropFilter: 'blur(8px)' }}>
          <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>🎠</span>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(16px,2.1vw,21px)', fontStyle: 'italic', color: '#7C5C99', lineHeight: 1.7, letterSpacing: '.01em' }}>
            Prezența voastră va transforma această zi într-o amintire de neuitat pentru familia noastră.
          </p>
        </div>

        {/* CHOOSE THEME */}
        <div style={{ ...a(.62), width: '100%', padding: '22px 24px 26px', background: 'rgba(255,255,255,.65)', border: '1px solid rgba(167,139,250,.22)', borderRadius: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, backdropFilter: 'blur(10px)', marginTop: 22, boxShadow: '0 10px 36px rgba(167,139,250,.18)' }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 15, fontStyle: 'italic', color: '#9D7BB0', letterSpacing: '.03em', margin: 0, textAlign: 'center' }}>Îți place această temă? Personalizează-o pentru botezul copilului tău</p>
          <a href="/preturi?tema=botez-printesa" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 40px', borderRadius: 100, backgroundImage: 'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize: '300% 100%', animation: 'shineText 5s linear infinite', color: '#fff', textDecoration: 'none', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', boxShadow: '0 10px 32px rgba(167,139,250,.4)', transition: 'transform .2s,box-shadow .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px) scale(1.02)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 18px 46px rgba(167,139,250,.55)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 32px rgba(167,139,250,.4)' }}>
            ✦ Alege Această Temă ✦
          </a>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(157,123,176,.55)', fontWeight: 700, margin: 0 }}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* RSVP MODAL */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(124,58,237,.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeIn .28s ease', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(165deg,#FFFFFF,#FDF2FF)', borderRadius: 28, padding: 'clamp(24px,4vw,38px) clamp(18px,4vw,32px)', maxWidth: 460, width: '100%', border: '1px solid rgba(167,139,250,.28)', boxShadow: '0 40px 110px rgba(124,58,237,.28)', animation: 'slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight: '90vh', overflowY: 'auto' }}>

            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <span style={{ fontSize: 38, display: 'block', marginBottom: 10 }}>👑</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 600, backgroundImage: 'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: 8 }}>Confirmă Participarea</h2>
              <div style={{ width: 36, height: 1, background: 'rgba(167,139,250,.4)', margin: '0 auto 10px' }} />
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 14, fontStyle: 'italic', color: '#9D7BB0', lineHeight: 1.7 }}>Vă rugăm completați câmpurile de mai jos.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={fieldLabel}>Nume și Prenume</label>
                <input type="text" placeholder="ex. Maria Popescu" style={{ ...inputStyle }}
                  onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(244,114,182,.7)'}
                  onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(167,139,250,.3)'} />
              </div>

              <div>
                <label style={fieldLabel}>Veți fi însoțit/ă?</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Da', 'Nu'].map(opt => (
                    <div key={opt} onClick={() => setInsotit(opt)} style={chip(insotit === opt)}>{opt}</div>
                  ))}
                </div>
              </div>

              <div>
                <label style={fieldLabel}>Număr persoane</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['1', '2', '3', '4', '5+'].map(opt => (
                    <div key={opt} onClick={() => setPersoane(opt)} style={chip(persoane === opt)}>{opt}</div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 22, textAlign: 'center' }}>
              <button onClick={() => setModal(false)} style={{ display: 'block', width: '100%', padding: '14px 0', borderRadius: 100, backgroundImage: 'linear-gradient(90deg,#F472B6,#FBBF24,#A78BFA,#F472B6)', backgroundSize: '300% 100%', animation: 'shineText 5s linear infinite', color: '#fff', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 10px 32px rgba(167,139,250,.4)', transition: 'transform .2s,box-shadow .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 44px rgba(167,139,250,.55)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 32px rgba(167,139,250,.4)' }}>
                ✦ Confirmă Participarea ✦
              </button>
              <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(167,139,250,.1)', border: '1px solid rgba(167,139,250,.22)', borderRadius: 12 }}>
                <p style={{ fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: '#9D7BB0', lineHeight: 1.8 }}>
                  Mulțumim! 🎈<br />Aceasta este o demonstrație a temei <strong style={{ color: '#7C3AED', fontStyle: 'normal' }}>Prințesă</strong> pentru botez.<br />Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={() => setModal(false)} style={{ marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(157,123,176,.6)', textDecoration: 'underline' }}>Închide</button>
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



  function startSpin() {
    if (phase !== 'intro') return
    setPhase('spin')
    setTimeout(() => setPhase('invite'), 1900)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'Nunito',sans-serif;background:#FDF2FF;color:#7C3AED;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes carouselSpin{to{transform:rotate(360deg)}}
        @keyframes shineText{0%{background-position:0% 0}100%{background-position:300% 0}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes riseUp{0%{transform:translateY(0) translateX(0)}50%{transform:translateY(-60vh) translateX(18px)}100%{transform:translateY(-120vh) translateX(-12px)}}
        @keyframes twinkle{0%,100%{opacity:.35;transform:scale(.82)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes trailPop{0%{opacity:0;transform:translateY(8px) scale(.3) rotate(0deg)}35%{opacity:1}100%{opacity:0;transform:translateY(-50px) scale(1) rotate(120deg)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.42}50%{opacity:.9}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: 'rgba(253,242,255,.92)', borderBottom: '1px solid rgba(167,139,250,.2)', backdropFilter: 'blur(14px)' }}>
        <a href="/invitatii-digitale" style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#7C3AED', textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#F472B6'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#7C3AED'}>
          Vibe<span style={{ color: '#F472B6' }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant',serif", fontSize: 16, fontStyle: 'italic', color: '#9D7BB0', letterSpacing: '.04em' }}>
          {phase === 'invite' ? 'Emma Ilinca · 17 Iulie 2027' : 'Invitație la Botez'}
        </div>
        <a href="/invitatii-digitale" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(167,139,250,.12)', border: '1px solid rgba(167,139,250,.25)', color: '#7C3AED', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', transition: 'all .2s' }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(167,139,250,.2)'; b.style.borderColor = 'rgba(167,139,250,.4)' }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(167,139,250,.12)'; b.style.borderColor = 'rgba(167,139,250,.25)' }}>
          <BackArrow /> Înapoi
        </a>
      </header>

      {phase !== 'invite' && <IntroScreen onStart={startSpin} phase={phase} />}
      {phase === 'invite' && <InviteScreen onBack={() => setPhase('intro')} />}
    </>
  )
}