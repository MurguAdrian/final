'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

/* ════════════════════════════════
   COUNTDOWN
════════════════════════════════ */
function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const ms = target.getTime()
  useEffect(() => {
    const tick = () => {
      const diff = ms - Date.now()
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return }
      setT({ d: Math.floor(diff / 864e5), h: Math.floor((diff % 864e5) / 36e5), m: Math.floor((diff % 36e5) / 6e4), s: Math.floor((diff % 6e4) / 1e3) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [ms])
  return t
}
const pad = (n: number) => String(n).padStart(2, '0')

/* ════════════════════════════════
   INTERSECTION OBSERVER HOOK
════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ════════════════════════════════
   SVG DECORATIONS
════════════════════════════════ */
const FloralCorner = ({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `scale(${flip ? -1 : 1},${flipY ? -1 : 1})`, width: '100%', height: '100%' }}>
    <path d="M10 10 L10 130 M10 10 L130 10" stroke="url(#fg)" strokeWidth="1.2" />
    <path d="M22 22 L22 105 M22 22 L105 22" stroke="url(#fg)" strokeWidth=".7" strokeOpacity=".5" />
    <path d="M34 34 L34 80 M34 34 L80 34" stroke="url(#fg)" strokeWidth=".5" strokeOpacity=".35" />
    <path d="M10 55 L24 55 M10 75 L18 75 M10 95 L18 95" stroke="url(#fg)" strokeWidth=".8" />
    <path d="M55 10 L55 24 M75 10 L75 18 M95 10 L95 18" stroke="url(#fg)" strokeWidth=".8" />
    <circle cx="10" cy="10" r="5" fill="url(#fg)" fillOpacity=".9" />
    <circle cx="10" cy="10" r="9" fill="none" stroke="url(#fg)" strokeWidth=".6" strokeOpacity=".4" />
    <circle cx="22" cy="22" r="3" fill="none" stroke="url(#fg)" strokeWidth=".7" strokeOpacity=".4" />
    <path d="M10 10 Q40 20 55 45" stroke="url(#fg)" strokeWidth=".4" strokeOpacity=".25" fill="none" />
    <path d="M10 10 Q20 40 45 55" stroke="url(#fg)" strokeWidth=".4" strokeOpacity=".25" fill="none" />
    <defs>
      <linearGradient id="fg" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4A0B0" />
        <stop offset="40%" stopColor="#E8C4D0" />
        <stop offset="70%" stopColor="#C9956A" stopOpacity=".7" />
        <stop offset="100%" stopColor="#C9956A" stopOpacity=".2" />
      </linearGradient>
    </defs>
  </svg>
)

const RoseDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 460 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,160,176,.5))' }} />
    <svg viewBox="0 0 80 28" width="80" height="28" fill="none">
      <path d="M4 14 L24 14" stroke="#D4A0B0" strokeWidth=".8" strokeOpacity=".6" />
      <path d="M56 14 L76 14" stroke="#D4A0B0" strokeWidth=".8" strokeOpacity=".6" />
      <circle cx="14" cy="14" r="1.5" fill="#D4A0B0" fillOpacity=".5" />
      <circle cx="66" cy="14" r="1.5" fill="#D4A0B0" fillOpacity=".5" />
      {/* Rose */}
      <circle cx="40" cy="14" r="5" fill="url(#rg)" fillOpacity=".9" />
      <ellipse cx="40" cy="14" rx="4" ry="3" fill="url(#rg2)" fillOpacity=".6" />
      <ellipse cx="38" cy="13" rx="2.5" ry="2" fill="#F5C2D0" fillOpacity=".8" transform="rotate(-20 38 13)" />
      <ellipse cx="42" cy="13" rx="2.5" ry="2" fill="#F5C2D0" fillOpacity=".8" transform="rotate(20 42 13)" />
      <ellipse cx="40" cy="11" rx="2" ry="1.8" fill="#F0B8C8" fillOpacity=".9" />
      <circle cx="40" cy="14" r="1.5" fill="#E8A0B8" />
      <defs>
        <radialGradient id="rg" cx="40" cy="14" r="5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5C2D0" />
          <stop offset="100%" stopColor="#C9788A" />
        </radialGradient>
        <radialGradient id="rg2" cx="40" cy="14" r="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE8F0" />
          <stop offset="100%" stopColor="#E8A0B8" />
        </radialGradient>
      </defs>
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,160,176,.5),transparent)' }} />
  </div>
)

const Crown18 = () => (
  <svg viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 100, height: 50 }}>
    <path d="M12 58 L12 24 L35 46 L70 6 L105 46 L128 24 L128 58 Z" fill="none" stroke="url(#cg18)" strokeWidth="1.3" strokeLinejoin="round" />
    <circle cx="70" cy="6" r="4" fill="url(#cg18)" />
    <circle cx="35" cy="46" r="3" fill="url(#cg18)" />
    <circle cx="105" cy="46" r="3" fill="url(#cg18)" />
    <circle cx="12" cy="24" r="2.2" fill="url(#cg18)" />
    <circle cx="128" cy="24" r="2.2" fill="url(#cg18)" />
    <path d="M6 58 L134 58" stroke="url(#cg18)" strokeWidth="1" />
    <text x="70" y="52" textAnchor="middle" fontFamily="'Playfair Display',serif" fontSize="14" fontStyle="italic" fontWeight="600" fill="#0D0508" opacity=".7">18</text>
    <defs>
      <linearGradient id="cg18" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#9B6E7A" />
        <stop offset="35%" stopColor="#D4A0B0" />
        <stop offset="50%" stopColor="#F0C8D8" />
        <stop offset="65%" stopColor="#D4A0B0" />
        <stop offset="100%" stopColor="#9B6E7A" />
      </linearGradient>
    </defs>
  </svg>
)

const WazeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z" /></svg>)
const MapsIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>)
const BackArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>)
const UploadIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>)
const CloseIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>)

/* ════════════════════════════════
   ANIMATED SECTION
════════════════════════════════ */
function Section({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity .8s ease ${delay}s, transform .8s ease ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

/* ════════════════════════════════
   CONFIG
════════════════════════════════ */
const EVENT = {
  name: 'Andreea Maria',
  date: new Date('2027-06-14T20:00:00'),
  dateStr: 'Duminică, 14 Iunie 2027',
  time: '20:00',
  venue: 'Grand Ballroom Events',
  address: 'Calea Floreasca 169, București',
  phone: '0752 954 258',
  mapsUrl: 'https://maps.google.com/?q=Calea+Floreasca+169+Bucuresti',
  wazeUrl: 'https://waze.com/ul?q=Calea+Floreasca+169+Bucuresti&navigate=yes',
}

/* ════════════════════════════════
   RSVP FORM
════════════════════════════════ */
type RSVPData = { name: string; attend: string; companion: string; companions: string; transport: string; message: string }
const defaultRsvp: RSVPData = { name: '', attend: '', companion: '', companions: '1', transport: '', message: '' }

function RSVPModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RSVPData>(defaultRsvp)
  const [sent, setSent] = useState(false)

  const s: React.CSSProperties = { width: '100%', padding: '11px 16px', borderRadius: 10, border: '1px solid rgba(212,160,176,.3)', background: 'rgba(255,255,255,.06)', fontFamily: "'Jost',sans-serif", fontSize: 14, color: '#3D1A22', outline: 'none', transition: 'border-color .2s' }
  const rl: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 10px', borderRadius: 10, border: '1px solid rgba(212,160,176,.3)', background: 'rgba(255,255,255,.05)', cursor: 'pointer', fontFamily: "'Jost',sans-serif", fontSize: 13, color: '#7A3A4A', transition: 'all .2s', userSelect: 'none' }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(30,10,18,.85)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeIn .25s ease', overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(160deg,#FFF5F8 0%,#FDE8F0 50%,#FFF0F5 100%)', borderRadius: 24, padding: 'clamp(24px,4vw,40px) clamp(20px,4vw,34px)', maxWidth: 500, width: '100%', border: '1px solid rgba(212,160,176,.35)', boxShadow: '0 40px 100px rgba(80,20,40,.25)', animation: 'slideUp .3s cubic-bezier(.4,0,.2,1)', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(212,160,176,.15)', border: '1px solid rgba(212,160,176,.3)', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#9B5566', display: 'flex', alignItems: 'center' }}><CloseIcon /></button>
        {!sent ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <Crown18 />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,4vw,30px)', fontStyle: 'italic', color: '#7A3A4A', marginBottom: 6, marginTop: 8 }}>Confirmă Prezența</h2>
              <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,160,176,.7),transparent)', margin: '0 auto 10px' }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(122,58,74,.6)', lineHeight: 1.7 }}>Spune-mi dacă vii la petrecere ✦</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(122,58,74,.65)', marginBottom: 7, fontWeight: 500 }}>Numele tău</label>
                <input type="text" placeholder="ex. Elena Popescu" style={s} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(122,58,74,.65)', marginBottom: 7, fontWeight: 500 }}>Vii la petrecere?</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Da, vin! 🎉', 'Nu pot 😢'].map((opt, i) => (
                    <label key={opt} style={{ ...rl, background: form.attend === ['da', 'nu'][i] ? 'rgba(212,160,176,.25)' : 'rgba(255,255,255,.05)', borderColor: form.attend === ['da', 'nu'][i] ? 'rgba(212,160,176,.6)' : 'rgba(212,160,176,.3)' }}>
                      <input type="radio" name="attend" value={['da', 'nu'][i]} style={{ accentColor: '#D4A0B0' }} onChange={e => setForm(f => ({ ...f, attend: e.target.value }))} />{opt}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(122,58,74,.65)', marginBottom: 7, fontWeight: 500 }}>Vii însoțit/ă?</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Da', 'Nu'].map(opt => (
                    <label key={opt} style={{ ...rl, background: form.companion === opt.toLowerCase() ? 'rgba(212,160,176,.25)' : 'rgba(255,255,255,.05)', borderColor: form.companion === opt.toLowerCase() ? 'rgba(212,160,176,.6)' : 'rgba(212,160,176,.3)' }}>
                      <input type="radio" name="companion" value={opt.toLowerCase()} style={{ accentColor: '#D4A0B0' }} onChange={e => setForm(f => ({ ...f, companion: e.target.value }))} />{opt}
                    </label>
                  ))}
                </div>
                {form.companion === 'da' && (
                  <div style={{ marginTop: 10 }}>
                    <label style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(122,58,74,.5)', marginBottom: 6, fontWeight: 500 }}>Câte persoane în plus?</label>
                    <input type="number" min="1" max="10" style={s} value={form.companions} onChange={e => setForm(f => ({ ...f, companions: e.target.value }))} />
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(122,58,74,.65)', marginBottom: 7, fontWeight: 500 }}>Ai nevoie de transport?</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Da', 'Nu'].map(opt => (
                    <label key={opt} style={{ ...rl, background: form.transport === opt.toLowerCase() ? 'rgba(212,160,176,.25)' : 'rgba(255,255,255,.05)', borderColor: form.transport === opt.toLowerCase() ? 'rgba(212,160,176,.6)' : 'rgba(212,160,176,.3)' }}>
                      <input type="radio" name="transport" value={opt.toLowerCase()} style={{ accentColor: '#D4A0B0' }} onChange={e => setForm(f => ({ ...f, transport: e.target.value }))} />{opt}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(122,58,74,.65)', marginBottom: 7, fontWeight: 500 }}>Mesaj pentru Andreea (opțional)</label>
                <textarea rows={3} placeholder="Un mesaj drag..." style={{ ...s, resize: 'vertical', minHeight: 80 }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button onClick={() => setSent(true)} style={{ display: 'block', width: '100%', padding: '15px 0', borderRadius: 12, background: 'linear-gradient(135deg,#C9788A 0%,#E8A0B8 40%,#F5C2D0 55%,#E8A0B8 70%,#C9788A 100%)', color: '#fff', fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(201,120,138,.4)', position: 'relative', overflow: 'hidden' }}>
                ✦ Trimite Confirmarea ✦
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
              </button>
              <div style={{ marginTop: 14, padding: '13px 16px', background: 'rgba(212,160,176,.1)', border: '1px solid rgba(212,160,176,.25)', borderRadius: 10 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(122,58,74,.6)', lineHeight: 1.8 }}>
                  Aceasta este o demonstrație a temei <strong style={{ color: '#C9788A', fontStyle: 'normal' }}>Majorat</strong>.<br />
                  Achiziționează pachetul pentru a activa RSVP-ul real.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🌸</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontStyle: 'italic', color: '#7A3A4A', marginBottom: 10 }}>Mulțumesc!</h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontStyle: 'italic', color: 'rgba(122,58,74,.65)', lineHeight: 1.8, marginBottom: 22 }}>Răspunsul tău a fost primit.<br />Abia aștept să te văd la petrecere! ✨</p>
            <button onClick={onClose} style={{ padding: '12px 36px', borderRadius: 12, background: 'linear-gradient(135deg,#C9788A,#E8A0B8,#C9788A)', color: '#fff', fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 6px 24px rgba(201,120,138,.35)' }}>Închide</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════
   UPLOAD MODAL
════════════════════════════════ */
type UploadedFile = { url: string; name: string }

function UploadModal({ onClose }: { onClose: () => void }) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((selected: FileList | null) => {
    if (!selected) return
    Array.from(selected).forEach(f => {
      const url = URL.createObjectURL(f)
      setFiles(prev => [...prev, { url, name: f.name }])
    })
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(30,10,18,.85)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeIn .25s ease', overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(160deg,#FFF5F8 0%,#FDE8F0 50%,#FFF0F5 100%)', borderRadius: 24, padding: 'clamp(24px,4vw,38px) clamp(20px,4vw,32px)', maxWidth: 520, width: '100%', border: '1px solid rgba(212,160,176,.35)', boxShadow: '0 40px 100px rgba(80,20,40,.25)', animation: 'slideUp .3s cubic-bezier(.4,0,.2,1)', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(212,160,176,.15)', border: '1px solid rgba(212,160,176,.3)', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#9B5566', display: 'flex', alignItems: 'center' }}><CloseIcon /></button>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 42, marginBottom: 10 }}>📸</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontStyle: 'italic', color: '#7A3A4A', marginBottom: 8 }}>Pozele Tale</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(122,58,74,.6)', lineHeight: 1.7 }}>Încarcă amintirile din această seară specială ✦</p>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
        <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => inputRef.current?.click()}
          style={{ border: '2px dashed rgba(212,160,176,.45)', borderRadius: 16, padding: 'clamp(24px,3vw,36px) 20px', textAlign: 'center', cursor: 'pointer', background: 'rgba(212,160,176,.06)', transition: 'all .25s', marginBottom: 16 }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,160,176,.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,160,176,.7)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,160,176,.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,160,176,.45)' }}>
          <div style={{ color: '#D4A0B0', marginBottom: 10, display: 'flex', justifyContent: 'center' }}><UploadIcon /></div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: '#9B5566', marginBottom: 4 }}>Drag & drop sau <span style={{ color: '#C9788A', fontWeight: 600 }}>alege fișiere</span></p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: 'rgba(155,85,102,.5)' }}>JPG, PNG, HEIC · multiple fișiere acceptate</p>
        </div>
        {files.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: 10, marginBottom: 16 }}>
            {files.map((f: UploadedFile, i: number) => (
              <div key={i} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '1', border: '1px solid rgba(212,160,176,.3)' }}>
                <img src={f.url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button onClick={() => setFiles((prev: UploadedFile[]) => prev.filter((_: UploadedFile, j: number) => j !== i))} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,.55)', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, lineHeight: 1 }}>×</button>
              </div>
            ))}
          </div>
        )}
        <div style={{ padding: '13px 16px', background: 'rgba(212,160,176,.1)', border: '1px solid rgba(212,160,176,.25)', borderRadius: 10, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(122,58,74,.6)', lineHeight: 1.8 }}>
            Demo temă <strong style={{ color: '#C9788A', fontStyle: 'normal' }}>Majorat</strong> — upload real disponibil după achiziționarea pachetului.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════
   PAGE
════════════════════════════════ */
export default function MajoratPage() {
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [heroVis, setHeroVis] = useState(false)
  const [flipS, setFlipS] = useState(false)
  const cd = useCountdown(EVENT.date)

  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 80); return () => clearTimeout(t) }, [])
  useEffect(() => { setFlipS(true); const t = setTimeout(() => setFlipS(false), 160); return () => clearTimeout(t) }, [cd.s])

  const ha = (d: number): React.CSSProperties => ({
    opacity: heroVis ? 1 : 0,
    transform: heroVis ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity .85s ease ${d}s, transform .85s ease ${d}s`,
  })

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,.55)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(212,160,176,.3)',
    borderRadius: 20,
    boxShadow: '0 8px 40px rgba(180,80,100,.08), 0 1px 0 rgba(255,255,255,.8) inset',
  }

  const pkgBtn: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '14px 38px', borderRadius: 12,
    background: 'linear-gradient(135deg,#C9788A 0%,#E8A0B8 40%,#F5C2D0 55%,#E8A0B8 70%,#C9788A 100%)',
    color: '#fff', border: 'none', cursor: 'pointer',
    fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 700,
    letterSpacing: '.18em', textTransform: 'uppercase',
    boxShadow: '0 8px 30px rgba(201,120,138,.4)',
    transition: 'transform .2s, box-shadow .2s',
    textDecoration: 'none', position: 'relative', overflow: 'hidden',
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; -webkit-font-smoothing: antialiased; }
        body { font-family: 'Jost', sans-serif; background: #FFF0F5; color: #3D1A22; overflow-x: hidden; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(22px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:-350px 0} 100%{background-position:350px 0} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:scale(.93) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes petals { 0%{transform:translateY(-10px) rotate(0deg) opacity:0} 100%{transform:translateY(110vh) rotate(720deg);opacity:.6} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-soft { 0%,100%{opacity:.5} 50%{opacity:1} }
        ::-webkit-scrollbar { width: 6px } ::-webkit-scrollbar-track { background: #FFF0F5 } ::-webkit-scrollbar-thumb { background: rgba(212,160,176,.4); border-radius: 3px }
      `}</style>

      {/* PETALS */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{ position: 'fixed', top: -20, left: `${(i * 8.3) % 100}%`, zIndex: 0, pointerEvents: 'none', animation: `petals ${7 + (i % 5)}s linear ${i * 0.8}s infinite`, opacity: 0 }}>
          <svg viewBox="0 0 20 24" width={10 + (i % 3) * 4} height={12 + (i % 3) * 5} fill="none">
            <ellipse cx="10" cy="12" rx="5" ry="8" fill="rgba(232,160,184,.4)" transform={`rotate(${i * 30} 10 12)`} />
          </svg>
        </div>
      ))}

      {/* HEADER */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(14px,4vw,28px)', background: 'rgba(255,240,245,.9)', borderBottom: '1px solid rgba(212,160,176,.2)', backdropFilter: 'blur(16px)' }}>
        <a href="/invitatii-digitale" style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C9788A', textDecoration: 'none' }}>
          Vibe<span style={{ color: 'rgba(201,120,138,.45)' }}>Invite</span>
        </a>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(122,58,74,.55)', letterSpacing: '.06em' }}>
          Andreea Maria · 18 Ani
        </div>
        <a href="/invitatii-digitale" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: 'rgba(212,160,176,.12)', border: '1px solid rgba(212,160,176,.28)', color: '#C9788A', fontFamily: "'Jost',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', transition: 'all .2s' }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(212,160,176,.22)' }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = 'rgba(212,160,176,.12)' }}>
          <BackArrow /> Înapoi
        </a>
      </header>

      {/* BACKGROUND */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 90% 70% at 50% 0%,#FFE5F0 0%,#FFF0F5 50%,#FFF8FA 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 60% 55% at 85% 90%,rgba(232,160,184,.18) 0%,transparent 60%), radial-gradient(ellipse 50% 45% at 10% 80%,rgba(201,149,106,.1) 0%,transparent 55%)', pointerEvents: 'none' }} />

      {/* ART DECO CORNERS */}
      <div style={{ position: 'fixed', top: 56, left: 0, width: 'min(160px,18vw)', height: 'min(160px,18vw)', opacity: .5, pointerEvents: 'none', zIndex: 1 }}><FloralCorner /></div>
      <div style={{ position: 'fixed', top: 56, right: 0, width: 'min(160px,18vw)', height: 'min(160px,18vw)', opacity: .5, pointerEvents: 'none', zIndex: 1 }}><FloralCorner flip /></div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 'min(140px,16vw)', height: 'min(140px,16vw)', opacity: .4, pointerEvents: 'none', zIndex: 1 }}><FloralCorner flipY /></div>
      <div style={{ position: 'fixed', bottom: 0, right: 0, width: 'min(140px,16vw)', height: 'min(140px,16vw)', opacity: .4, pointerEvents: 'none', zIndex: 1 }}><FloralCorner flip flipY /></div>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 720, margin: '0 auto', padding: 'clamp(84px,10vw,110px) clamp(16px,4vw,32px) 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* HERO */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 0 }}>
          <div style={{ ...ha(0), animation: heroVis ? 'float 6s ease-in-out infinite' : undefined, marginBottom: 10 }}><Crown18 /></div>
          <p style={{ ...ha(.08), fontFamily: "'Jost',sans-serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '.38em', textTransform: 'uppercase', color: 'rgba(201,120,138,.7)', marginBottom: 14 }}>Invitație la Majoratul meu</p>
          <h1 style={{ ...ha(.15), fontFamily: "'Playfair Display',serif", fontSize: 'clamp(56px,10vw,110px)', fontWeight: 700, fontStyle: 'italic', color: 'transparent', backgroundImage: 'linear-gradient(135deg,#C9788A 0%,#E8A0B8 40%,#F5C2D0 55%,#D4906A 75%,#C9788A 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', lineHeight: .95, letterSpacing: '-.01em', margin: 0 }}>
            Andreea<br />Maria
          </h1>
          <div style={{ ...ha(.22), display: 'flex', alignItems: 'center', gap: 14, margin: '18px 0 10px' }}>
            <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,120,138,.5))' }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,40px)', fontStyle: 'italic', color: '#C9788A', fontWeight: 400, letterSpacing: '.05em' }}>împlinește</span>
            <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg,rgba(201,120,138,.5),transparent)' }} />
          </div>
          <div style={{ ...ha(.28), display: 'flex', alignItems: 'baseline', gap: 10, justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(90px,16vw,160px)', fontWeight: 700, color: 'transparent', backgroundImage: 'linear-gradient(135deg,#C9788A 0%,#F5C2D0 45%,#D4906A 70%,#C9788A 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', lineHeight: 1, letterSpacing: '-.03em' }}>18</span>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,36px)', fontStyle: 'italic', color: 'rgba(201,120,138,.7)', alignSelf: 'flex-end', paddingBottom: 14 }}>ani</span>
          </div>
          <p style={{ ...ha(.35), fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,2.2vw,22px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(122,58,74,.6)', letterSpacing: '.06em', marginTop: -4 }}>
            și te invită să sărbătorim împreună ✦
          </p>
        </div>

        <div style={{ ...ha(.4), display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 460, margin: '28px auto' }}><RoseDivider /></div>

        {/* EVENT DETAILS CARD */}
        <Section delay={0.05} style={{ width: '100%', maxWidth: 640 }}>
          <div style={{ ...card, padding: 'clamp(24px,3.5vw,38px)' }}>
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(201,120,138,.6)', marginBottom: 14, fontWeight: 500 }}>Detalii Eveniment</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 'clamp(14px,2vw,22px)' }}>
              {[
                { icon: '📅', label: 'Data', value: EVENT.dateStr },
                { icon: '🕗', label: 'Ora', value: EVENT.time },
                { icon: '📍', label: 'Locație', value: EVENT.venue },
                { icon: '🗺️', label: 'Adresa', value: EVENT.address },
              ].map(item => (
                <div key={item.label} style={{ background: 'rgba(255,255,255,.6)', borderRadius: 14, padding: '16px 18px', border: '1px solid rgba(212,160,176,.2)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <span style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(201,120,138,.6)', marginBottom: 4, fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14px,1.8vw,17px)', fontStyle: 'italic', color: '#5A2A34', lineHeight: 1.35 }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Maps + Waze */}
            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, minWidth: 140, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', borderRadius: 10, background: 'linear-gradient(135deg,rgba(76,175,79,.15),rgba(76,175,79,.08))', border: '1px solid rgba(76,175,79,.28)', color: '#2E7D32', fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'transform .2s,box-shadow .2s' }}>
                <MapsIcon /> Google Maps
              </a>
              <a href={EVENT.wazeUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, minWidth: 140, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', borderRadius: 10, background: 'linear-gradient(135deg,rgba(8,162,212,.15),rgba(8,162,212,.08))', border: '1px solid rgba(8,162,212,.28)', color: '#0277BD', fontFamily: "'Jost',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'transform .2s' }}>
                <WazeIcon /> Waze
              </a>
            </div>
          </div>
        </Section>

        <Section delay={0.05} style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 460, margin: '28px auto' }}>
          <RoseDivider />
        </Section>

        {/* COUNTDOWN */}
        <Section delay={0.08} style={{ width: '100%', maxWidth: 640 }}>
          <div style={{ ...card, padding: 'clamp(22px,3.5vw,36px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,160,176,.5),transparent)' }} />
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(201,120,138,.6)', marginBottom: 20, fontWeight: 500 }}>Timp Rămas Până la Petrecere</p>
            <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
              {[{ n: pad(cd.d), l: 'Zile' }, { n: pad(cd.h), l: 'Ore' }, { n: pad(cd.m), l: 'Minute' }, { n: pad(cd.s), l: 'Secunde', flip: flipS }].map(u => (
                <div key={u.l} style={{ flex: 1, maxWidth: 120, textAlign: 'center', padding: '0 6px', borderRight: '1px solid rgba(212,160,176,.15)' }}>
                  <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(38px,6.5vw,68px)', fontWeight: 700, lineHeight: 1, color: 'transparent', backgroundImage: 'linear-gradient(135deg,#C9788A,#F5C2D0,#C9788A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', transition: 'transform .15s ease', transform: u.flip ? 'scale(1.1) translateY(-3px)' : 'scale(1)' }}>{u.n}</span>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 'clamp(7px,.85vw,9px)', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(201,120,138,.5)', display: 'block', marginTop: 4, fontWeight: 500 }}>{u.l}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,160,176,.5),transparent)' }} />
          </div>
        </Section>

        <Section delay={0.05} style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 460, margin: '28px auto' }}>
          <RoseDivider />
        </Section>

        {/* UPLOAD POZE */}
        <Section delay={0.08} style={{ width: '100%', maxWidth: 640 }}>
          <div style={{ ...card, padding: 'clamp(24px,3.5vw,38px)', textAlign: 'center', border: '1.5px dashed rgba(212,160,176,.4)' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>📸</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,3vw,28px)', fontStyle: 'italic', color: '#7A3A4A', marginBottom: 10, lineHeight: 1.2 }}>Împărtășiți momentele cu mine ✦</h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14px,1.8vw,17px)', fontStyle: 'italic', color: 'rgba(122,58,74,.6)', lineHeight: 1.85, marginBottom: 18, maxWidth: 460, margin: '0 auto 18px' }}>
              Faceți poze în timpul petrecerii și încărcați-le direct din telefon.<br />
              Voi accesa toate imaginile voastre într-un album privat — amintiri din toate perspectivele.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 22 }}>
              {['✦ Poze din toate unghiurile', '◆ Album privat', '✦ Fără limită', '◆ Acces securizat'].map(tag => (
                <span key={tag} style={{ fontFamily: "'Jost',sans-serif", fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '.1em', color: 'rgba(201,120,138,.8)', background: 'rgba(212,160,176,.12)', border: '1px solid rgba(212,160,176,.28)', borderRadius: 100, padding: '5px 14px', fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
            <button onClick={() => setUploadOpen(true)}
              style={{ ...pkgBtn, display: 'inline-flex' }}>
              <UploadIcon /> Încarcă pozele tale
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
            </button>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '.14em', color: 'rgba(201,120,138,.4)', marginTop: 10 }}>disponibil în ziua petrecerii și 72h după eveniment</p>
          </div>
        </Section>

        <Section delay={0.05} style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 460, margin: '28px auto' }}>
          <RoseDivider />
        </Section>

        {/* RSVP BUTTON SECTION */}
        <Section delay={0.08} style={{ width: '100%', maxWidth: 500, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,2vw,19px)', fontStyle: 'italic', color: 'rgba(122,58,74,.6)', lineHeight: 1.85, marginBottom: 20, letterSpacing: '.03em' }}>
            Vă rog să confirmați prezența<br />până pe <strong style={{ color: '#C9788A', fontStyle: 'normal' }}>1 Mai 2027</strong>
          </p>
          <button onClick={() => setRsvpOpen(true)}
            style={{ ...pkgBtn, display: 'block', width: '100%', justifyContent: 'center', fontSize: 13, padding: 'clamp(15px,2vw,18px) 0' }}>
            ✦ Confirmă Prezența ✦
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
          </button>
        </Section>

        <Section delay={0.05} style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 460, margin: '28px auto' }}>
          <RoseDivider />
        </Section>

        {/* CTA — Alege Tema */}
        <Section delay={0.08} style={{ width: '100%', maxWidth: 640 }}>
          <div style={{ ...card, padding: 'clamp(22px,3.5vw,34px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,2vw,18px)', fontStyle: 'italic', color: 'rgba(122,58,74,.65)', lineHeight: 1.7 }}>
              Îți place această temă? Personalizează-o pentru evenimentul tău ✦
            </p>
            <a href="/preturi?tema=majorat"
              style={pkgBtn}>
              ✦ Alege Această Temă
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
            </a>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(201,120,138,.35)', fontWeight: 400 }}>VibeInvite © 2026 · Toate drepturile rezervate</p>
          </div>
        </Section>
      </main>

      {rsvpOpen && <RSVPModal onClose={() => setRsvpOpen(false)} />}
      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)} />}
    </>
  )
}