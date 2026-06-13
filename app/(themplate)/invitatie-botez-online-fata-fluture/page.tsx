'use client'

import { useState, useEffect } from 'react'

/* ════════════════════════════════════════
   CONFIG — Tema Florală (Fluturași)
════════════════════════════════════════ */
const SKY_BG = 'radial-gradient(ellipse 72% 60% at 18% 18%, rgba(255,200,224,.35) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 82%, rgba(255,224,190,.3) 0%, transparent 55%), linear-gradient(160deg, #FFFFFF 0%, #FFF1F6 46%, #FDE6F0 100%)'

const STARS = [
  { t: '12%', l: '20%', w: 16, d: 3.2, delay: 0 },
  { t: '24%', l: '74%', w: 12, d: 3.8, delay: .6 },
  { t: '40%', l: '12%', w: 10, d: 4.2, delay: .3 },
  { t: '58%', l: '80%', w: 14, d: 3.5, delay: .9 },
  { t: '70%', l: '28%', w: 9, d: 4.6, delay: .2 },
  { t: '34%', l: '50%', w: 8, d: 5, delay: 1.1 },
]

const TRAIL = [
  { x: '14%', y: '14%', s: 16, delay: .05, k: 'f' },
  { x: '26%', y: '34%', s: 20, delay: .18, k: 'p' },
  { x: '40%', y: '18%', s: 14, delay: .32, k: 'f' },
  { x: '52%', y: '40%', s: 22, delay: .46, k: 'b' },
  { x: '64%', y: '20%', s: 16, delay: .6, k: 'p' },
  { x: '76%', y: '36%', s: 18, delay: .74, k: 'f' },
  { x: '34%', y: '48%', s: 12, delay: .4, k: 'p' },
  { x: '58%', y: '14%', s: 14, delay: .66, k: 'f' },
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
const Star = ({ className = '', style, color = '#F7B8CF' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1 C12.8 6.6 17.4 11.2 23 12 C17.4 12.8 12.8 17.4 12 23 C11.2 17.4 6.6 12.8 1 12 C6.6 11.2 11.2 6.6 12 1 Z" fill={color} />
  </svg>
)

const Petal = ({ className = '', style, color = '#F9A8C9' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 C18 6 20 12 12 22 C4 12 6 6 12 2 Z" fill={color} />
  </svg>
)

const Flower = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(72 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(144 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(216 40 40)" />
      <ellipse cx="40" cy="22" rx="13" ry="18" fill="#FBC4DD" transform="rotate(288 40 40)" />
    </g>
    <circle cx="40" cy="40" r="10" fill="#F7D88A" />
  </svg>
)

function SkyDecor() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      <Flower style={{ position: 'absolute', top: '8%', left: '-3%', width: 'clamp(80px,16vw,140px)', opacity: .85, animation: 'floatY 12s ease-in-out infinite' }} />
      <Flower style={{ position: 'absolute', top: '14%', right: '-4%', width: 'clamp(70px,14vw,120px)', opacity: .7, animation: 'floatY 14s ease-in-out infinite 1s' }} />
      <Flower style={{ position: 'absolute', bottom: '8%', left: '4%', width: 'clamp(60px,12vw,100px)', opacity: .6, animation: 'floatY 10s ease-in-out infinite .5s' }} />
      <Flower style={{ position: 'absolute', bottom: '16%', right: '6%', width: 'clamp(50px,10vw,90px)', opacity: .55, animation: 'floatY 11s ease-in-out infinite 1.5s' }} />
      {STARS.map((s, i) => (
        <div key={i} style={{ position: 'absolute', top: s.t, left: s.l, width: s.w, animation: `twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}><Star /></div>
      ))}
      <div style={{ position: 'absolute', top: '28%', right: '12%', width: 16, opacity: .55, animation: 'floatY 7s ease-in-out infinite' }}><Petal /></div>
      <div style={{ position: 'absolute', bottom: '32%', left: '12%', width: 14, opacity: .5, animation: 'floatY 8.5s ease-in-out infinite .5s' }}><Petal color="#FBD0E2" /></div>
    </div>
  )
}

const ButterflySVG = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="wgPink" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFCBE1" /><stop offset="1" stopColor="#F98EC0" /></linearGradient>
      <linearGradient id="wgGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFE6B0" /><stop offset="1" stopColor="#F9C66B" /></linearGradient>
    </defs>
    <ellipse cx="100" cy="86" rx="80" ry="8" fill="#F98EC0" opacity=".12" />
    <line x1="100" y1="42" x2="100" y2="112" stroke="#C77AA0" strokeWidth="3" strokeLinecap="round" />
    <circle cx="100" cy="40" r="7" fill="#C77AA0" />
    <path d="M100 40 C94 30 86 26 80 28" stroke="#C77AA0" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M100 40 C106 30 114 26 120 28" stroke="#C77AA0" strokeWidth="2" strokeLinecap="round" fill="none" />
    <g style={{ transformBox: 'fill-box', transformOrigin: '100px 76px', animation: 'wingFlapL .42s ease-in-out infinite alternate' }}>
      <path d="M98 70 C60 30 20 40 14 70 C20 100 60 110 98 80 Z" fill="url(#wgPink)" stroke="#F472B6" strokeOpacity=".4" strokeWidth="1.4" />
      <path d="M96 86 C66 76 40 90 38 112 C56 122 84 110 96 92 Z" fill="url(#wgGold)" stroke="#F9C66B" strokeOpacity=".5" strokeWidth="1.2" />
      <circle cx="48" cy="60" r="5" fill="#FFFFFF" opacity=".7" />
      <circle cx="64" cy="100" r="4" fill="#FFFFFF" opacity=".7" />
    </g>
    <g style={{ transformBox: 'fill-box', transformOrigin: '100px 76px', animation: 'wingFlapR .42s ease-in-out infinite alternate' }}>
      <path d="M102 70 C140 30 180 40 186 70 C180 100 140 110 102 80 Z" fill="url(#wgPink)" stroke="#F472B6" strokeOpacity=".4" strokeWidth="1.4" />
      <path d="M104 86 C134 76 160 90 162 112 C144 122 116 110 104 92 Z" fill="url(#wgGold)" stroke="#F9C66B" strokeOpacity=".5" strokeWidth="1.2" />
      <circle cx="152" cy="60" r="5" fill="#FFFFFF" opacity=".7" />
      <circle cx="136" cy="100" r="4" fill="#FFFFFF" opacity=".7" />
    </g>
    <ellipse cx="100" cy="78" rx="6" ry="34" fill="#D6608F" />
  </svg>
)

const TopMotif = () => (
  <div style={{ position: 'relative', width: 'clamp(150px,30vw,220px)' }}>
    <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 26, animation: 'twinkle 3s ease-in-out infinite' }}><Star /></div>
    <div style={{ position: 'absolute', top: 12, left: '16%', width: 16, animation: 'twinkle 3.6s ease-in-out infinite .5s' }}><Star /></div>
    <div style={{ position: 'absolute', top: 16, right: '16%', width: 14, animation: 'twinkle 4s ease-in-out infinite .9s' }}><Star /></div>
    <Flower style={{ width: '100%', filter: 'drop-shadow(0 8px 18px rgba(247,140,190,.25))', animation: 'spinSlow 50s linear infinite' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 26 }}><ButterflySVG /></div>
  </div>
)

/* icons reused */
const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z" /></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>)
const WhatsAppIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>)

type Phase = 'intro' | 'flying' | 'invite'

/* ════════════════════════════════════════
   INTRO SCREEN — fluturașul zboară
════════════════════════════════════════ */
function IntroScreen({ onStart, phase }: { onStart: () => void; phase: Phase }) {
  const flying = phase === 'flying'
  const fade: React.CSSProperties = { opacity: flying ? 0 : 1, transition: 'opacity .5s ease' }
  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: SKY_BG }} />
      <SkyDecor />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '16px 22px', width: '100%' }}>
        <p style={{ ...fade, fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, animation: 'fadeUp .7s ease both' }}>Invitație la Botez</p>
        <h1 style={{ ...fade, fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,8vw,76px)', fontWeight: 500, fontStyle: 'italic', color: '#C2487A', textAlign: 'center', lineHeight: 1, margin: 0, textShadow: '0 4px 24px rgba(247,140,190,.22)', animation: 'fadeUp .8s ease both .08s' }}>Sofia Maria</h1>
        <p style={{ ...fade, fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,2vw,19px)', fontStyle: 'italic', color: '#B57890', textAlign: 'center', maxWidth: 360, lineHeight: 1.5, animation: 'fadeUp .9s ease both .16s' }}>Cu emoție și bucurie, vă invităm la botezul micuței noastre</p>

        <div onClick={onStart} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onStart()} style={{ position: 'relative', width: 'min(94vw,520px)', height: 'clamp(170px,36vw,240px)', cursor: 'pointer', marginTop: 6 }}>
          {flying && TRAIL.map((it, i) => (
            <div key={i} style={{ position: 'absolute', left: it.x, top: it.y, width: it.s, opacity: 0, animation: `trailPop 1s ease ${it.delay}s forwards`, zIndex: 3, pointerEvents: 'none' }}>
              {it.k === 'f' ? <Flower /> : it.k === 'p' ? <Petal /> : <Star color="#F9C66B" />}
            </div>
          ))}
          <div style={{ position: 'absolute', left: '8%', top: '50%', width: 'clamp(110px,28vw,170px)', transform: flying ? 'translate(118vw,-60%) rotate(8deg)' : 'translate(0,-50%) rotate(0deg)', transition: 'transform 1.85s cubic-bezier(.5,.03,.5,1)', zIndex: 5 }}>
            <div style={{ animation: flying ? 'none' : 'butterflyBob 2.6s ease-in-out infinite' }}><ButterflySVG /></div>
          </div>
        </div>

        <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.24em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, opacity: flying ? .9 : undefined, animation: flying ? 'none' : 'fadeUp 1s ease both .4s, pulse 2.8s ease-in-out infinite 1.4s' }}>
          {flying ? '✦  Zburăm spre invitație…' : 'Atinge pentru a deschide'}
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   INVITE SCREEN
════════════════════════════════════════ */
function InviteScreen({ onBack: _onBack }: { onBack: () => void }) {
  const BAPTISM = new Date('2027-09-04T12:30:00')
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
    onMouseEnter: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 18px 48px rgba(247,140,190,.24)' },
    onMouseLeave: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 6px 28px rgba(247,140,190,.12)' },
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid rgba(247,140,190,.28)', background: 'rgba(255,255,255,.8)', fontFamily: "'Nunito',sans-serif", fontSize: 13, color: '#C2487A', outline: 'none' }
  const chip = (active: boolean): React.CSSProperties => ({ flex: 1, textAlign: 'center', padding: '11px 6px', borderRadius: 12, border: `1.5px solid ${active ? '#F472B6' : 'rgba(247,140,190,.25)'}`, background: active ? 'rgba(244,114,182,.14)' : 'rgba(255,255,255,.7)', color: active ? '#C2487A' : '#C2487A', cursor: 'pointer', fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 700, userSelect: 'none', transition: 'all .18s' })
  const fieldLabel: React.CSSProperties = { display: 'block', fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, marginBottom: 8 }

  const mapsHref = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
  const wazeHref = (q: string) => `https://waze.com/ul?q=${encodeURIComponent(q)}&navigate=yes`

  const events = [
    { type: 'Slujba Religioasă', name: 'Taina Botezului', venue: 'Biserica Sfânta Maria', addr: 'Str. Florilor 7, Cluj-Napoca', time: '12:30', bg: 'linear-gradient(135deg,#F98EC0 0%,#D6608F 100%)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 2L12 6M10 4h4" /><rect x="4" y="9" width="16" height="12" rx="1" /><path d="M9 21V14a3 3 0 0 1 6 0v7" /><path d="M4 9l8-4 8 4" /></svg> },
    { type: 'Petrecerea de După', name: 'Recepția Florală', venue: 'Salon Trandafirul', addr: 'Bd. Eroilor 21, Cluj-Napoca', time: '16:00', bg: 'linear-gradient(135deg,#F9C66B 0%,#E8965E 100%)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><ellipse cx="9" cy="8" rx="4" ry="5" /><ellipse cx="16" cy="10" rx="3.2" ry="4" /><path d="M9 13 C9 16 8 17 8 19" /><path d="M16 14 C16 16 17 17 17 19" /><path d="M8 19 L17 19" /></svg> },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflowY: 'auto', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, background: SKY_BG, zIndex: 0 }} />
      <SkyDecor />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: '44px 22px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        <div style={{ ...a(0), marginBottom: 14, display: 'flex', justifyContent: 'center', width: '100%' }}><TopMotif /></div>

        <p style={{ ...a(.06), fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, opacity: vis ? 1 : 0, marginBottom: 10 }}>Invitație la Botez</p>

        <div style={{ ...a(.12), textAlign: 'center', marginBottom: 6 }}>
          <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(54px,9.5vw,104px)', fontWeight: 500, fontStyle: 'italic', color: '#C2487A', lineHeight: .95, textShadow: '0 4px 28px rgba(247,140,190,.22)', letterSpacing: '-.01em' }}>Sofia Maria</span>
          <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(15px,1.9vw,20px)', fontStyle: 'italic', fontWeight: 400, color: '#B57890', marginTop: 6 }}>Fiica lui Elena &amp; Andrei</span>
        </div>

        <div style={{ ...a(.18), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
          <div style={{ width: 18 }}><Star /></div>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
        </div>

        <div style={{ ...a(.24), textAlign: 'center', marginBottom: 18 }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(12px,1.7vw,16px)', letterSpacing: '.12em', color: '#C2487A', fontWeight: 600, marginBottom: 5 }}>Sâmbătă · 4 Septembrie 2027</p>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.9vw,19px)', fontStyle: 'italic', color: '#B57890', letterSpacing: '.04em' }}>Cluj-Napoca, România</p>
        </div>

        {/* FAMILY */}
        <div style={{ ...a(.3), textAlign: 'center', padding: '22px 28px', border: '1px solid rgba(247,140,190,.22)', borderRadius: 20, background: 'rgba(255,255,255,.6)', backdropFilter: 'blur(10px)', maxWidth: 360, width: '100%', boxShadow: '0 4px 24px rgba(247,140,190,.1)' }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(9px,1.1vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, marginBottom: 12 }}>Cu Binecuvântarea Familiei</p>
          <div style={{ width: 36, height: 1, background: 'rgba(247,140,190,.5)', margin: '0 auto 14px' }} />
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: '#B57890', marginBottom: 4 }}>Părinții</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.3vw,23px)', fontStyle: 'italic', fontWeight: 400, color: '#C2487A' }}>Elena &amp; Andrei</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', margin: '14px auto' }}>
            <div style={{ width: 40, height: 1, background: 'rgba(247,140,190,.3)' }} />
            <div style={{ width: 7, height: 7, background: '#F9C66B', transform: 'rotate(45deg)' }} />
            <div style={{ width: 40, height: 1, background: 'rgba(247,140,190,.3)' }} />
          </div>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: '#B57890', marginBottom: 4 }}>Nașii</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.3vw,23px)', fontStyle: 'italic', fontWeight: 400, color: '#C2487A' }}>Ioana &amp; Mihai</p>
        </div>

        <div style={{ ...a(.36), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
          <div style={{ width: 16 }}><Star color="#F9C66B" /></div>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
        </div>

        {/* COUNTDOWN */}
        <div style={{ ...a(.44), width: '100%', maxWidth: 440, background: 'rgba(255,255,255,.6)', border: '1px solid rgba(247,140,190,.2)', borderRadius: 22, padding: '22px 18px', backdropFilter: 'blur(12px)', textAlign: 'center', boxShadow: '0 6px 28px rgba(247,140,190,.1)' }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(8px,.95vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, marginBottom: 14 }}>Timp Rămas Până La Botez</p>
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
            {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map(u => (
              <div key={u.l} style={{ flex: 1, maxWidth: 104, textAlign: 'center', padding: '0 4px', borderRight: '1px solid rgba(247,140,190,.2)' }}>
                <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(36px,5.8vw,58px)', fontWeight: 300, lineHeight: 1, transition: 'transform .15s ease, color .15s ease', transform: (u as { flip?: boolean }).flip ? 'scale(1.1) translateY(-3px)' : 'scale(1)', color: (u as { flip?: boolean }).flip ? '#F472B6' : '#C2487A' }}>{u.n}</span>
                <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(7px,.85vw,9px)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, display: 'block', marginTop: 3 }}>{u.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...a(.50), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
          <div style={{ width: 8, height: 8, background: '#F9C66B', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(249,198,107,.18)' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
        </div>

        {/* EVENT CARDS */}
        <div style={{ ...a(.54), width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(12px,2vw,22px)', maxWidth: 640 }}>
          {events.map(card => {
            const q = `${card.venue}, ${card.addr}`
            return (
              <div key={card.type} style={{ borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(247,140,190,.2)', background: 'rgba(255,255,255,.78)', backdropFilter: 'blur(10px)', boxShadow: '0 6px 28px rgba(247,140,190,.12)', transition: 'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                <div style={{ padding: '16px 18px 12px', background: card.bg, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{card.icon}</div>
                  <div>
                    <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.78)', fontWeight: 600, display: 'block', marginBottom: 2 }}>{card.type}</span>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>{card.name}</p>
                  </div>
                </div>
                <div style={{ padding: '14px 18px 16px' }}>
                  <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 'clamp(11px,1.2vw,13px)', color: '#C2487A', marginBottom: 3, letterSpacing: '.02em' }}>{card.venue}</p>
                  <p style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: '#B57890', lineHeight: 1.5, marginBottom: 10 }}>{card.addr}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#FDEAF2', border: '1px solid rgba(244,114,182,.22)', borderRadius: 100, padding: '4px 11px', fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, color: '#C2487A', marginBottom: 12 }}>🌸 4 septembrie 2027 · ora {card.time}</div>
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
        <div style={{ ...a(.58), width: '100%', maxWidth: 640, background: 'rgba(255,255,255,.65)', border: '1px solid rgba(247,140,190,.2)', borderRadius: 18, padding: '16px 20px', backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(247,140,190,.1)', marginTop: 'clamp(12px,2vw,20px)' }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#E89AB8', fontWeight: 600, marginBottom: 12 }}>Contact Părinți</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,1.8vw,18px)', fontStyle: 'italic', color: '#C2487A', marginBottom: 2 }}>Familia</p>
              <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', color: '#D6608F', letterSpacing: '.06em', fontWeight: 700 }}>0762 318 940</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="tel:0762318940" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#F98EC0,#D6608F)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(214,96,143,.3)', textDecoration: 'none' }}><PhoneIcon /> Telefon</a>
              <a href="https://wa.me/40762318940" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#25D366,#1DA851)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(37,211,102,.28)', textDecoration: 'none' }}><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>
        </div>

        <div style={{ ...a(.62), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '20px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(247,140,190,.35),transparent)' }} />
          <div style={{ width: 8, height: 8, background: '#F9C66B', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(249,198,107,.18)' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(247,140,190,.35),transparent)' }} />
        </div>

        {/* RSVP */}
        <div style={{ ...a(.66), textAlign: 'center', width: '100%', maxWidth: 380 }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', color: '#B57890', marginBottom: 14, lineHeight: 1.6, letterSpacing: '.03em' }}>
            Vă rugăm să ne anunțați prezența<br />până pe <strong style={{ color: '#C2487A', fontStyle: 'normal' }}>20 August 2027</strong>
          </p>
          <button onClick={() => setModal(true)} style={{ display: 'block', width: '100%', padding: 'clamp(14px,1.8vw,18px) 0', borderRadius: 100, background: 'linear-gradient(135deg,#F98EC0 0%,#D6608F 100%)', color: '#fff', textAlign: 'center', fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', boxShadow: '0 10px 32px rgba(214,96,143,.36)', transition: 'transform .22s,box-shadow .22s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 18px 42px rgba(214,96,143,.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 32px rgba(214,96,143,.36)' }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Confirmă Participarea ✦</span>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
          </button>
        </div>

        {/* CLOSING */}
        <div style={{ ...a(.70), width: '100%', maxWidth: 480, textAlign: 'center', marginTop: 26, padding: '24px 26px', background: 'rgba(255,255,255,.55)', border: '1px solid rgba(247,140,190,.2)', borderRadius: 20, backdropFilter: 'blur(8px)' }}>
          <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>🌸</span>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(16px,2.1vw,21px)', fontStyle: 'italic', color: '#A85C7C', lineHeight: 1.7, letterSpacing: '.01em' }}>
            Prezența dumneavoastră ne va aduce și mai multă bucurie într-o zi atât de specială pentru familia noastră.
          </p>
        </div>

        {/* CHOOSE THEME */}
        <div style={{ ...a(.74), width: '100%', padding: '20px 24px 24px', background: 'rgba(255,255,255,.6)', border: '1px solid rgba(247,140,190,.2)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, backdropFilter: 'blur(8px)', marginTop: 20 }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 15, fontStyle: 'italic', color: '#B57890', letterSpacing: '.03em', margin: 0, textAlign: 'center' }}>Îți place această temă? Personalizează-o pentru botezul copilului tău</p>
          <a href="/preturi?tema=botez-floral" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 38px', borderRadius: 100, background: 'linear-gradient(135deg,#F98EC0 0%,#D6608F 100%)', color: '#fff', textDecoration: 'none', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', boxShadow: '0 8px 28px rgba(214,96,143,.38)', transition: 'transform .2s,box-shadow .2s', border: '1.5px solid rgba(249,198,107,.3)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 16px 40px rgba(214,96,143,.52)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(214,96,143,.38)' }}>
            Alege Această Temă
          </a>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(181,120,144,.5)', fontWeight: 600, margin: 0 }}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* RSVP MODAL */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(120,40,80,.4)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeIn .28s ease', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(165deg,#FFFFFF,#FFF1F6)', borderRadius: 26, padding: 'clamp(24px,4vw,38px) clamp(18px,4vw,32px)', maxWidth: 460, width: '100%', border: '1px solid rgba(247,140,190,.25)', boxShadow: '0 40px 100px rgba(180,80,120,.28)', animation: 'slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight: '90vh', overflowY: 'auto' }}>

            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <span style={{ fontSize: 38, display: 'block', marginBottom: 10 }}>🎀</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 400, color: '#C2487A', marginBottom: 8 }}>Confirmă Participarea</h2>
              <div style={{ width: 36, height: 1, background: 'rgba(247,140,190,.5)', margin: '0 auto 10px' }} />
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 14, fontStyle: 'italic', color: '#B57890', lineHeight: 1.7 }}>Vă rugăm completați câmpurile de mai jos.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={fieldLabel}>Nume și Prenume</label>
                <input type="text" placeholder="ex. Maria Popescu" style={{ ...inputStyle }}
                  onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(244,114,182,.7)'}
                  onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(247,140,190,.28)'} />
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
              <button onClick={() => setModal(false)} style={{ display: 'block', width: '100%', padding: '14px 0', borderRadius: 100, background: 'linear-gradient(135deg,#F98EC0,#D6608F)', color: '#fff', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(214,96,143,.32)', transition: 'transform .2s,box-shadow .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 40px rgba(214,96,143,.45)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(214,96,143,.32)' }}>
                ✦ Confirmă Participarea ✦
              </button>
              <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(253,234,242,.8)', border: '1px solid rgba(247,140,190,.22)', borderRadius: 12 }}>
                <p style={{ fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: '#B57890', lineHeight: 1.8 }}>
                  Mulțumim! 🌸<br />Aceasta este o demonstrație a temei <strong style={{ color: '#C2487A', fontStyle: 'normal' }}>Floral</strong> pentru botez.<br />Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={() => setModal(false)} style={{ marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(181,120,144,.6)', textDecoration: 'underline' }}>Închide</button>
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


  function startFly() {
    if (phase !== 'intro') return
    setPhase('flying')
    setTimeout(() => setPhase('invite'), 1900)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'Nunito',sans-serif;background:#FFF1F6;color:#7A4A60;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes butterflyBob{0%,100%{transform:translateY(-50%)}50%{transform:translateY(calc(-50% - 12px))}}
        @keyframes wingFlapL{from{transform:rotateY(0deg)}to{transform:rotateY(50deg)}}
        @keyframes wingFlapR{from{transform:rotateY(0deg)}to{transform:rotateY(-50deg)}}
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes twinkle{0%,100%{opacity:.35;transform:scale(.82)}50%{opacity:1;transform:scale(1.12)}}
        @keyframes trailPop{0%{opacity:0;transform:translateY(8px) scale(.3)}35%{opacity:1}100%{opacity:0;transform:translateY(-36px) scale(1)}}
        @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.42}50%{opacity:.9}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: 'rgba(255,241,246,.93)', borderBottom: '1px solid rgba(247,140,190,.18)', backdropFilter: 'blur(14px)' }}>
        <a href="/invitatii-digitale" style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C2487A', textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#F9C66B'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#C2487A'}>
          Vibe<span style={{ color: '#F98EC0' }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant',serif", fontSize: 16, fontStyle: 'italic', color: '#B57890', letterSpacing: '.04em' }}>
          {phase === 'invite' ? 'Sofia Maria · 4 Septembrie 2027' : 'Invitație la Botez'}
        </div>
        <a href="/invitatii-digitale" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(249,142,192,.12)', border: '1px solid rgba(249,142,192,.25)', color: '#C2487A', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', transition: 'all .2s' }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(249,142,192,.2)'; b.style.borderColor = 'rgba(249,142,192,.4)' }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(249,142,192,.12)'; b.style.borderColor = 'rgba(249,142,192,.25)' }}>
          <BackArrow /> Înapoi
        </a>
      </header>

      {phase !== 'invite' && <IntroScreen onStart={startFly} phase={phase} />}
      {phase === 'invite' && <InviteScreen onBack={() => setPhase('intro')} />}
    </>
  )
}