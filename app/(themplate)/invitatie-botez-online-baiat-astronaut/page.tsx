'use client'

import { useState, useEffect } from 'react'

/* ════════════════════════════════════════
   CONFIG — Tema Spațială (Astronaut)
════════════════════════════════════════ */
const SKY_BG = 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(80,70,160,.35) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(40,50,120,.4) 0%, transparent 55%), linear-gradient(160deg, #14152B 0%, #1E2046 45%, #2A1F4D 100%)'

const STARS = [
  { t: '10%', l: '18%', w: 14, d: 2.8, delay: 0 },
  { t: '22%', l: '70%', w: 10, d: 3.4, delay: .5 },
  { t: '36%', l: '12%', w: 8, d: 3.8, delay: .2 },
  { t: '54%', l: '82%', w: 12, d: 3.1, delay: .8 },
  { t: '68%', l: '28%', w: 9, d: 4.2, delay: .15 },
  { t: '30%', l: '46%', w: 7, d: 4.6, delay: 1 },
  { t: '78%', l: '60%', w: 10, d: 3.6, delay: .65 },
  { t: '16%', l: '52%', w: 6, d: 5, delay: .35 },
  { t: '60%', l: '8%', w: 8, d: 3.9, delay: .9 },
]

const TRAIL = [
  { x: '20%', y: '55%', s: 18, delay: .05, k: 'star' },
  { x: '32%', y: '34%', s: 24, delay: .18, k: 'comet' },
  { x: '44%', y: '60%', s: 14, delay: .32, k: 'star' },
  { x: '56%', y: '30%', s: 26, delay: .46, k: 'planet' },
  { x: '68%', y: '52%', s: 16, delay: .6, k: 'star' },
  { x: '78%', y: '32%', s: 20, delay: .74, k: 'comet' },
  { x: '38%', y: '46%', s: 12, delay: .4, k: 'star' },
  { x: '62%', y: '58%', s: 14, delay: .66, k: 'star' },
]

/* ════════════════════════════════════════
   SEO
════════════════════════════════════════ */


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
const Star = ({ className = '', style, color = '#F4D87E' }: { className?: string; style?: React.CSSProperties; color?: string }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1 C12.8 6.6 17.4 11.2 23 12 C17.4 12.8 12.8 17.4 12 23 C11.2 17.4 6.6 12.8 1 12 C6.6 11.2 11.2 6.6 12 1 Z" fill={color} />
  </svg>
)

const Planet = ({ className = '', style, c1 = '#E8965E', c2 = '#C76B3A', ring = true }: { className?: string; style?: React.CSSProperties; c1?: string; c2?: string; ring?: boolean }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {ring && <ellipse cx="50" cy="52" rx="46" ry="11" fill="none" stroke="#F4D87E" strokeWidth="3" strokeOpacity=".5" transform="rotate(-12 50 52)" />}
    <circle cx="50" cy="50" r="30" fill={c1} />
    <path d="M22 40 C32 36 44 44 50 40 C60 34 70 42 78 38 A30 30 0 0 1 50 80 A30 30 0 0 1 22 40 Z" fill={c2} opacity=".55" />
    {ring && <ellipse cx="50" cy="48" rx="46" ry="11" fill="none" stroke="#F4D87E" strokeWidth="3" strokeOpacity=".85" transform="rotate(-12 50 48)" />}
  </svg>
)

const Comet = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M58 2 L4 12 L58 22 C40 18 30 16 30 12 C30 8 40 6 58 2 Z" fill="url(#cometGrad)" opacity=".8" />
    <circle cx="6" cy="12" r="4" fill="#FFF8E0" />
    <defs><linearGradient id="cometGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FFF8E0" stopOpacity="0" /><stop offset="1" stopColor="#FFF8E0" stopOpacity=".9" /></linearGradient></defs>
  </svg>
)

function SpaceDecor() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {STARS.map((s, i) => (
        <div key={i} style={{ position: 'absolute', top: s.t, left: s.l, width: s.w, animation: `twinkle ${s.d}s ease-in-out infinite ${s.delay}s` }}><Star /></div>
      ))}
      <Planet style={{ position: 'absolute', top: '8%', right: '-4%', width: 'clamp(80px,16vw,150px)', opacity: .9, animation: 'floatY 14s ease-in-out infinite' }} c1="#7C6BC4" c2="#5848A0" />
      <Planet style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 'clamp(70px,14vw,130px)', opacity: .85, animation: 'floatY 12s ease-in-out infinite 1s' }} c1="#E8965E" c2="#C76B3A" ring={false} />
      <Planet style={{ position: 'absolute', top: '46%', left: '4%', width: 'clamp(40px,8vw,70px)', opacity: .6, animation: 'floatY 9s ease-in-out infinite .5s' }} c1="#5EA8C7" c2="#3C7E9C" ring={false} />
      <Comet style={{ position: 'absolute', top: '20%', left: '8%', width: 'clamp(60px,12vw,110px)', opacity: .5, animation: 'cometFly 9s linear infinite' }} />
      <Comet style={{ position: 'absolute', top: '64%', right: '6%', width: 'clamp(50px,10vw,90px)', opacity: .4, animation: 'cometFly 11s linear infinite 3s reverse' }} />
    </div>
  )
}

const RocketSVG = ({ className = '', flame = true }: { className?: string; flame?: boolean }) => (
  <svg className={className} viewBox="0 0 120 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F0F4FB" /><stop offset="1" stopColor="#C7D4EA" /></linearGradient>
      <linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE6A0" /><stop offset=".5" stopColor="#F4A85E" /><stop offset="1" stopColor="#E8602E" /></linearGradient>
    </defs>
    {flame && (
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center top', animation: 'flameFlicker .22s ease-in-out infinite alternate' }}>
        <path d="M44 168 C44 168 36 195 60 220 C84 195 76 168 76 168 Z" fill="url(#rf)" />
      </g>
    )}
    <path d="M60 4 C84 30 92 78 92 120 L92 158 L28 158 L28 120 C28 78 36 30 60 4 Z" fill="url(#rb)" stroke="#9FB2D0" strokeWidth="1.4" />
    <path d="M28 130 L8 168 L28 158 Z" fill="#5848A0" />
    <path d="M92 130 L112 168 L92 158 Z" fill="#5848A0" />
    <circle cx="60" cy="58" r="18" fill="#3C7E9C" stroke="#2E6480" strokeWidth="2" />
    <circle cx="60" cy="58" r="11" fill="#BFE6F4" opacity=".8" />
    <rect x="40" y="100" width="40" height="6" rx="3" fill="#E8602E" />
    <rect x="40" y="114" width="40" height="6" rx="3" fill="#5848A0" opacity=".7" />
    <path d="M28 158 L92 158 L88 172 L32 172 Z" fill="#9FB2D0" />
  </svg>
)

const TopMotif = () => (
  <div style={{ position: 'relative', width: 'clamp(150px,30vw,220px)', height: 'clamp(80px,16vw,120px)' }}>
    <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 26, animation: 'twinkle 3s ease-in-out infinite' }}><Star /></div>
    <div style={{ position: 'absolute', top: 16, left: '14%', width: 14, animation: 'twinkle 3.6s ease-in-out infinite .5s' }}><Star color="#9CB6E8" /></div>
    <div style={{ position: 'absolute', top: 20, right: '14%', width: 12, animation: 'twinkle 4s ease-in-out infinite .9s' }}><Star color="#E8965E" /></div>
    <Planet style={{ position: 'absolute', left: '50%', top: '34%', transform: 'translateX(-50%)', width: '58%', filter: 'drop-shadow(0 8px 18px rgba(80,70,160,.4))', animation: 'spinSlow 40s linear infinite' }} c1="#7C6BC4" c2="#5848A0" />
  </div>
)

/* icons reused */
const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z" /></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>)
const WhatsAppIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>)
const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>)

type Phase = 'intro' | 'launch' | 'invite'

/* ════════════════════════════════════════
   INTRO SCREEN — racheta lansată
════════════════════════════════════════ */
function IntroScreen({ onStart, phase }: { onStart: () => void; phase: Phase }) {
  const launching = phase === 'launch'
  const fade: React.CSSProperties = { opacity: launching ? 0 : 1, transition: 'opacity .5s ease' }
  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: SKY_BG }} />
      <SpaceDecor />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '16px 22px', width: '100%' }}>
        <p style={{ ...fade, fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, animation: 'fadeUp .7s ease both' }}>Invitație la Botez</p>
        <h1 style={{ ...fade, fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,8vw,76px)', fontWeight: 500, fontStyle: 'italic', color: '#F4F6FB', textAlign: 'center', lineHeight: 1, margin: 0, textShadow: '0 4px 30px rgba(124,107,196,.5)', animation: 'fadeUp .8s ease both .08s' }}>Vlad Ștefan</h1>
        <p style={{ ...fade, fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,2vw,19px)', fontStyle: 'italic', color: '#B8C4E8', textAlign: 'center', maxWidth: 360, lineHeight: 1.5, animation: 'fadeUp .9s ease both .16s' }}>Pregătiți rachetele — pornim într-o aventură cosmică plină de bucurie</p>

        <div onClick={onStart} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onStart()} style={{ position: 'relative', width: 'min(94vw,420px)', height: 'clamp(220px,46vw,340px)', cursor: 'pointer', marginTop: 6 }}>
          {launching && TRAIL.map((it, i) => (
            <div key={i} style={{ position: 'absolute', left: it.x, top: it.y, width: it.s, opacity: 0, animation: `trailPop 1.1s ease ${it.delay}s forwards`, zIndex: 3, pointerEvents: 'none' }}>
              {it.k === 'star' ? <Star /> : it.k === 'planet' ? <Planet c1="#5EA8C7" c2="#3C7E9C" ring={false} /> : <Comet />}
            </div>
          ))}
          <div style={{ position: 'absolute', left: '50%', bottom: '8%', width: 'clamp(80px,22vw,130px)', transform: launching ? 'translate(-50%,-160vh) scale(.7)' : 'translate(-50%,0) scale(1)', transition: 'transform 1.85s cubic-bezier(.5,.03,.5,1)', zIndex: 5 }}>
            <div style={{ animation: launching ? 'none' : 'rocketBob 2.6s ease-in-out infinite' }}><RocketSVG flame={launching} /></div>
          </div>
          <div style={{ position: 'absolute', left: '50%', bottom: '6%', transform: 'translateX(-50%)', width: 'clamp(100px,30vw,180px)', height: 14, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(124,107,196,.35),transparent 70%)' }} />
        </div>

        <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.24em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, opacity: launching ? .9 : undefined, animation: launching ? 'none' : 'fadeUp 1s ease both .4s, pulse 2.8s ease-in-out infinite 1.4s' }}>
          {launching ? '✦  Decolare spre invitație…' : 'Atinge pentru lansare'}
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   INVITE SCREEN
════════════════════════════════════════ */
function InviteScreen({ onBack: _onBack }: { onBack: () => void }) {
  const BAPTISM = new Date('2027-08-21T13:00:00')
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
    onMouseEnter: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 18px 48px rgba(80,70,160,.35)' },
    onMouseLeave: (e: React.MouseEvent) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 6px 28px rgba(20,20,50,.3)' },
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid rgba(156,182,232,.28)', background: 'rgba(255,255,255,.06)', fontFamily: "'Nunito',sans-serif", fontSize: 13, color: '#F4F6FB', outline: 'none' }
  const chip = (active: boolean): React.CSSProperties => ({ flex: 1, textAlign: 'center', padding: '11px 6px', borderRadius: 12, border: `1.5px solid ${active ? '#F4D87E' : 'rgba(156,182,232,.25)'}`, background: active ? 'rgba(244,216,126,.14)' : 'rgba(255,255,255,.05)', color: active ? '#F4D87E' : '#F4F6FB', cursor: 'pointer', fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 700, userSelect: 'none', transition: 'all .18s' })
  const fieldLabel: React.CSSProperties = { display: 'block', fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 8 }

  const mapsHref = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
  const wazeHref = (q: string) => `https://waze.com/ul?q=${encodeURIComponent(q)}&navigate=yes`

  const events = [
    { type: 'Slujba Religioasă', name: 'Taina Botezului', venue: 'Biserica Sfântul Andrei', addr: 'Str. Ștefan cel Mare 12, Bacău', time: '13:00', bg: 'linear-gradient(135deg,#5848A0 0%,#3C2E78 100%)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 2L12 6M10 4h4" /><rect x="4" y="9" width="16" height="12" rx="1" /><path d="M9 21V14a3 3 0 0 1 6 0v7" /><path d="M4 9l8-4 8 4" /></svg> },
    { type: 'Petrecerea de După', name: 'Recepția Galactică', venue: 'Restaurant Orion', addr: 'Calea Romanului 45, Bacău', time: '16:30', bg: 'linear-gradient(135deg,#3C7E9C 0%,#2A5A78 100%)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><ellipse cx="9" cy="8" rx="4" ry="5" /><ellipse cx="16" cy="10" rx="3.2" ry="4" /><path d="M9 13 C9 16 8 17 8 19" /><path d="M16 14 C16 16 17 17 17 19" /><path d="M8 19 L17 19" /></svg> },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, top: 56, overflowY: 'auto', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, background: SKY_BG, zIndex: 0 }} />
      <SpaceDecor />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: '44px 22px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        <div style={{ ...a(0), marginBottom: 6, display: 'flex', justifyContent: 'center', width: '100%' }}><TopMotif /></div>

        <p style={{ ...a(.06), fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.3em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, opacity: vis ? 1 : 0, marginBottom: 10 }}>Invitație la Botez</p>

        <div style={{ ...a(.12), textAlign: 'center', marginBottom: 6 }}>
          <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(54px,9.5vw,104px)', fontWeight: 500, fontStyle: 'italic', color: '#F4F6FB', lineHeight: .95, textShadow: '0 4px 32px rgba(124,107,196,.5)', letterSpacing: '-.01em' }}>Vlad Ștefan</span>
          <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(15px,1.9vw,20px)', fontStyle: 'italic', fontWeight: 400, color: '#B8C4E8', marginTop: 6 }}>Fiul lui Ana &amp; Radu</span>
        </div>

        {/* COUNTDOWN — sus, primul element important */}
        <div style={{ ...a(.18), width: '100%', maxWidth: 440, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(156,182,232,.18)', borderRadius: 22, padding: '22px 18px', backdropFilter: 'blur(12px)', textAlign: 'center', boxShadow: '0 6px 30px rgba(20,20,50,.35)', marginTop: 22 }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(8px,.95vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 14 }}>Numărătoare Inversă Spre Lansare</p>
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
            {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map(u => (
              <div key={u.l} style={{ flex: 1, maxWidth: 104, textAlign: 'center', padding: '0 4px', borderRight: '1px solid rgba(156,182,232,.18)' }}>
                <span style={{ display: 'block', fontFamily: "'Cormorant',serif", fontSize: 'clamp(36px,5.8vw,58px)', fontWeight: 300, lineHeight: 1, transition: 'transform .15s ease, color .15s ease', transform: (u as { flip?: boolean }).flip ? 'scale(1.1) translateY(-3px)' : 'scale(1)', color: (u as { flip?: boolean }).flip ? '#F4D87E' : '#F4F6FB' }}>{u.n}</span>
                <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(7px,.85vw,9px)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, display: 'block', marginTop: 3 }}>{u.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...a(.24), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '22px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
          <div style={{ width: 18 }}><Star /></div>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
        </div>

        <div style={{ ...a(.3), textAlign: 'center', marginBottom: 18 }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(12px,1.7vw,16px)', letterSpacing: '.12em', color: '#F4F6FB', fontWeight: 600, marginBottom: 5 }}>Sâmbătă · 21 August 2027</p>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.9vw,19px)', fontStyle: 'italic', color: '#B8C4E8', letterSpacing: '.04em' }}>Bacău, România</p>
        </div>

        {/* FAMILY — stil "crew manifest" */}
        <div style={{ ...a(.36), textAlign: 'center', padding: '22px 28px', border: '1px solid rgba(156,182,232,.18)', borderRadius: 20, background: 'rgba(255,255,255,.04)', backdropFilter: 'blur(10px)', maxWidth: 360, width: '100%', boxShadow: '0 4px 26px rgba(20,20,50,.3)' }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(9px,1.1vw,10px)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 12 }}>Echipajul Misiunii</p>
          <div style={{ width: 36, height: 1, background: 'rgba(244,216,126,.4)', margin: '0 auto 14px' }} />
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: '#B8C4E8', marginBottom: 4 }}>Părinții</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.3vw,23px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB' }}>Ana &amp; Radu</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', margin: '14px auto' }}>
            <div style={{ width: 40, height: 1, background: 'rgba(156,182,232,.25)' }} />
            <div style={{ width: 7, height: 7, background: '#F4D87E', transform: 'rotate(45deg)' }} />
            <div style={{ width: 40, height: 1, background: 'rgba(156,182,232,.25)' }} />
          </div>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: '#B8C4E8', marginBottom: 4 }}>Nașii</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,2.3vw,23px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB' }}>Diana &amp; Vlad</p>
        </div>

        <div style={{ ...a(.42), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '22px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
          <div style={{ width: 16 }}><Star color="#E8965E" /></div>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
        </div>

        {/* EVENT TIMELINE — stil vertical, diferit de carduri */}
        <div style={{ ...a(.48), width: '100%', maxWidth: 520, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 19, top: 10, bottom: 10, width: 2, background: 'linear-gradient(180deg,rgba(244,216,126,.5),rgba(156,182,232,.15))' }} />
          {events.map((card, idx) => {
            const q = `${card.venue}, ${card.addr}`
            return (
              <div key={card.type} style={{ display: 'flex', gap: 16, marginBottom: idx === events.length - 1 ? 0 : 22 }}>
                <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: card.bg, border: '2px solid rgba(244,216,126,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(20,20,50,.4)', zIndex: 1 }}>{card.icon}</div>
                <div style={{ flex: 1, borderRadius: 16, border: '1px solid rgba(156,182,232,.16)', background: 'rgba(255,255,255,.04)', backdropFilter: 'blur(10px)', padding: '14px 18px', boxShadow: '0 6px 26px rgba(20,20,50,.3)', transition: 'transform .24s ease,box-shadow .24s ease' }} {...cardHover}>
                  <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4D87E', fontWeight: 600, display: 'block', marginBottom: 2 }}>{card.type}</span>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,1.8vw,18px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB', lineHeight: 1.2, marginBottom: 6 }}>{card.name}</p>
                  <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 'clamp(11px,1.2vw,13px)', color: '#F4F6FB', marginBottom: 2 }}>{card.venue}</p>
                  <p style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: '#B8C4E8', lineHeight: 1.5, marginBottom: 10 }}>{card.addr}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(244,216,126,.1)', border: '1px solid rgba(244,216,126,.25)', borderRadius: 100, padding: '4px 11px', fontFamily: "'Quicksand',sans-serif", fontSize: 8.5, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, color: '#F4D87E', marginBottom: 12 }}>🚀 21 august 2027 · ora {card.time}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={wazeHref(q)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 8px', borderRadius: 11, background: 'linear-gradient(135deg,#08A2D4,#0788B0)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}><WazeIcon /> Waze</a>
                    <a href={mapsHref(q)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 8px', borderRadius: 11, background: 'linear-gradient(135deg,#4CAF4F,#388E3C)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}><MapsIcon /> Maps</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ ...a(.56), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '26px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
          <div style={{ width: 8, height: 8, background: '#F4D87E', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(244,216,126,.16)' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
        </div>

        {/* CONTACT */}
        <div style={{ ...a(.6), width: '100%', maxWidth: 640, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(156,182,232,.16)', borderRadius: 18, padding: '16px 20px', backdropFilter: 'blur(8px)', boxShadow: '0 4px 22px rgba(20,20,50,.3)' }}>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 600, marginBottom: 12 }}>Contact Centru de Comandă</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(15px,1.8vw,18px)', fontStyle: 'italic', color: '#F4F6FB', marginBottom: 2 }}>Familia</p>
              <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', color: '#F4D87E', letterSpacing: '.06em', fontWeight: 700 }}>0741 882 367</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="tel:0741882367" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#7C6BC4,#5848A0)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 16px rgba(88,72,160,.45)', textDecoration: 'none' }}><PhoneIcon /> Telefon</a>
              <a href="https://wa.me/40741882367" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 100, background: 'linear-gradient(135deg,#25D366,#1DA851)', color: '#fff', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.06em', boxShadow: '0 4px 14px rgba(37,211,102,.35)', textDecoration: 'none' }}><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>
        </div>

        <div style={{ ...a(.64), display: 'flex', alignItems: 'center', gap: 14, width: '100%', maxWidth: 360, margin: '26px auto' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(156,182,232,.35),transparent)' }} />
          <div style={{ width: 8, height: 8, background: '#F4D87E', transform: 'rotate(45deg)', boxShadow: '0 0 0 3px rgba(244,216,126,.16)' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(156,182,232,.35),transparent)' }} />
        </div>

        {/* RSVP */}
        <div style={{ ...a(.68), textAlign: 'center', width: '100%', maxWidth: 380 }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.7vw,17px)', fontStyle: 'italic', color: '#B8C4E8', marginBottom: 14, lineHeight: 1.6, letterSpacing: '.03em' }}>
            Confirmați-vă locul la bord<br />până pe <strong style={{ color: '#F4D87E', fontStyle: 'normal' }}>10 August 2027</strong>
          </p>
          <button onClick={() => setModal(true)} style={{ display: 'block', width: '100%', padding: 'clamp(14px,1.8vw,18px) 0', borderRadius: 100, background: 'linear-gradient(135deg,#7C6BC4 0%,#5848A0 100%)', color: '#fff', textAlign: 'center', fontFamily: "'Quicksand',sans-serif", fontSize: 'clamp(11px,1.3vw,13px)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', boxShadow: '0 10px 36px rgba(88,72,160,.5)', transition: 'transform .22s,box-shadow .22s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 18px 46px rgba(88,72,160,.65)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 36px rgba(88,72,160,.5)' }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Confirmă Participarea 🚀</span>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
          </button>
        </div>

        {/* CLOSING */}
        <div style={{ ...a(.72), width: '100%', maxWidth: 480, textAlign: 'center', marginTop: 26, padding: '24px 26px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(156,182,232,.16)', borderRadius: 20, backdropFilter: 'blur(8px)' }}>
          <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>🪐</span>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(16px,2.1vw,21px)', fontStyle: 'italic', color: '#D6DEFA', lineHeight: 1.7, letterSpacing: '.01em' }}>
            Prezența voastră va face această misiune și mai memorabilă pentru familia noastră.
          </p>
        </div>

        {/* CHOOSE THEME */}
        <div style={{ ...a(.76), width: '100%', padding: '20px 24px 24px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(156,182,232,.16)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, backdropFilter: 'blur(8px)', marginTop: 20 }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 15, fontStyle: 'italic', color: '#B8C4E8', letterSpacing: '.03em', margin: 0, textAlign: 'center' }}>Îți place această temă? Personalizează-o pentru botezul copilului tău</p>
          <a href="/preturi?tema=botez-cosmic" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 38px', borderRadius: 100, background: 'linear-gradient(135deg,#7C6BC4 0%,#5848A0 100%)', color: '#fff', textDecoration: 'none', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(88,72,160,.5)', transition: 'transform .2s,box-shadow .2s', border: '1.5px solid rgba(156,182,232,.3)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 16px 44px rgba(88,72,160,.65)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 30px rgba(88,72,160,.5)' }}>
            Alege Această Temă
          </a>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(184,196,232,.5)', fontWeight: 600, margin: 0 }}>VibeInvite © 2026 · Toate drepturile rezervate</p>
        </div>
      </div>

      {/* RSVP MODAL */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(10,10,28,.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeIn .28s ease', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(165deg,#23254A,#1A1B3A)', borderRadius: 26, padding: 'clamp(24px,4vw,38px) clamp(18px,4vw,32px)', maxWidth: 460, width: '100%', border: '1px solid rgba(156,182,232,.18)', boxShadow: '0 40px 110px rgba(0,0,10,.5)', animation: 'slideUp .32s cubic-bezier(.4,0,.2,1)', maxHeight: '90vh', overflowY: 'auto' }}>

            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <span style={{ fontSize: 38, display: 'block', marginBottom: 10 }}>👨‍🚀</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB', marginBottom: 8 }}>Confirmă Participarea</h2>
              <div style={{ width: 36, height: 1, background: 'rgba(244,216,126,.4)', margin: '0 auto 10px' }} />
              <p style={{ fontFamily: "'Cormorant',serif", fontSize: 14, fontStyle: 'italic', color: '#B8C4E8', lineHeight: 1.7 }}>Vă rugăm completați câmpurile de mai jos.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={fieldLabel}>Nume și Prenume</label>
                <input type="text" placeholder="ex. Maria Popescu" style={{ ...inputStyle }}
                  onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(244,216,126,.7)'}
                  onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(156,182,232,.28)'} />
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
              <button onClick={() => setModal(false)} style={{ display: 'block', width: '100%', padding: '14px 0', borderRadius: 100, background: 'linear-gradient(135deg,#7C6BC4,#5848A0)', color: '#fff', fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(88,72,160,.4)', transition: 'transform .2s,box-shadow .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 42px rgba(88,72,160,.55)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(88,72,160,.4)' }}>
                ✦ Confirmă Participarea ✦
              </button>
              <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(124,107,196,.12)', border: '1px solid rgba(156,182,232,.18)', borderRadius: 12 }}>
                <p style={{ fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: '#B8C4E8', lineHeight: 1.8 }}>
                  Mulțumim! 🪐<br />Aceasta este o demonstrație a temei <strong style={{ color: '#F4D87E', fontStyle: 'normal' }}>Cosmic</strong> pentru botez.<br />Achiziționează pachetul pentru a activa confirmările.
                </p>
              </div>
              <button onClick={() => setModal(false)} style={{ marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(184,196,232,.6)', textDecoration: 'underline' }}>Închide</button>
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



  function startLaunch() {
    if (phase !== 'intro') return
    setPhase('launch')
    setTimeout(() => setPhase('invite'), 1900)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;}
        body{font-family:'Nunito',sans-serif;background:#14152B;color:#F4F6FB;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rocketBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes flameFlicker{from{transform:scaleY(1) scaleX(1)}to{transform:scaleY(1.15) scaleX(.9)}}
        @keyframes spinSlow{to{transform:translateX(-50%) rotate(360deg)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes twinkle{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes cometFly{0%{transform:translateX(-40px) translateY(0)}100%{transform:translateX(40px) translateY(20px)}}
        @keyframes trailPop{0%{opacity:0;transform:translateY(8px) scale(.3)}35%{opacity:1}100%{opacity:0;transform:translateY(-60px) scale(1)}}
        @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:scale(.92) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.42}50%{opacity:.9}}
        @media(max-width:480px){body{overflow:hidden}}
      `}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: 'rgba(20,21,43,.9)', borderBottom: '1px solid rgba(156,182,232,.14)', backdropFilter: 'blur(14px)' }}>
        <a href="/invitatii-digitale" style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#F4F6FB', textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#F4D87E'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#F4F6FB'}>
          Vibe<span style={{ color: '#7C6BC4' }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant',serif", fontSize: 16, fontStyle: 'italic', color: '#B8C4E8', letterSpacing: '.04em' }}>
          {phase === 'invite' ? 'Vlad Ștefan · 21 August 2027' : 'Invitație la Botez'}
        </div>
        <a href="/invitatii-digitale" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(124,107,196,.12)', border: '1px solid rgba(124,107,196,.25)', color: '#F4F6FB', fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', transition: 'all .2s' }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(124,107,196,.22)'; b.style.borderColor = 'rgba(124,107,196,.4)' }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(124,107,196,.12)'; b.style.borderColor = 'rgba(124,107,196,.25)' }}>
          <BackArrow /> Înapoi
        </a>
      </header>

      {phase !== 'invite' && <IntroScreen onStart={startLaunch} phase={phase} />}
      {phase === 'invite' && <InviteScreen onBack={() => setPhase('intro')} />}
    </>
  )
}