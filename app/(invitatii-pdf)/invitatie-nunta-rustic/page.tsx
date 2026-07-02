'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
function formatRsvp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
function formatDisplayDate(val: string) {
  if (!val) return ''
  const [y, m, d] = val.split('-')
  return `${d}.${m}.${y}`
}

interface Fields {
  bride: string; groom: string; parentsGroom: string; parentsBride: string
  nasi: string; weddingDate: string; church: string; churchTime: string
  restaurant: string; restTime: string; rsvpDate: string; rsvpTel: string
}

const DEFAULTS: Fields = {
  bride: 'Andreea', groom: 'Adrian',
  parentsGroom: 'Ion și Maria Popescu', parentsBride: 'Gheorghe și Elena Ionescu',
  nasi: 'Mihai și Cristina Dumitrescu',
  weddingDate: '2025-09-14',
  church: 'Biserica Sf. Nicolae', churchTime: '13:00',
  restaurant: 'Restaurant La Conac', restTime: '18:00',
  rsvpDate: '2025-08-01', rsvpTel: '0700 000 000',
}

// ── SVG Fundal kraft + watermark muzical ──────────────────────────────────────
const KraftBg = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123" preserveAspectRatio="none">
    <defs>
      <linearGradient id="rk-kraft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d4b07a"/>
        <stop offset="30%" stopColor="#c8a060"/>
        <stop offset="60%" stopColor="#be9458"/>
        <stop offset="100%" stopColor="#c4a068"/>
      </linearGradient>
      <filter id="rk-blur-heavy"><feGaussianBlur stdDeviation="8"/></filter>
    </defs>
    <rect width="794" height="1123" fill="url(#rk-kraft)"/>
    <ellipse cx="200" cy="300" rx="250" ry="180" fill="#a07840" opacity=".12" filter="url(#rk-blur-heavy)"/>
    <ellipse cx="600" cy="800" rx="220" ry="160" fill="#8a6030" opacity=".1" filter="url(#rk-blur-heavy)"/>
    {/* Margini franjurate */}
    <path d="M0 0 Q30 12 60 5 Q90 -2 120 8 Q150 18 180 6 Q210 -4 240 10 Q270 24 300 8 Q330 -4 360 12 Q390 28 420 8 Q450 -8 480 10 Q510 28 540 6 Q570 -8 600 12 Q630 32 660 8 Q690 -8 720 12 Q750 32 780 8 Q794 4 794 0 L0 0Z" fill="#e8c888" opacity=".45"/>
    <path d="M0 1123 Q30 1111 60 1118 Q90 1125 120 1115 Q150 1105 180 1117 Q210 1129 240 1113 Q270 1097 300 1115 Q330 1133 360 1111 Q390 1089 420 1115 Q450 1141 480 1113 Q510 1085 540 1117 Q570 1149 600 1115 Q630 1081 660 1115 Q690 1149 720 1115 Q750 1081 780 1115 Q794 1123 794 1123 L0 1123Z" fill="#e8c888" opacity=".45"/>
    {/* Portative watermark */}
    <g opacity=".12">
      <line x1="40" y1="380" x2="754" y2="380" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="395" x2="754" y2="395" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="410" x2="754" y2="410" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="425" x2="754" y2="425" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="440" x2="754" y2="440" stroke="#3a2010" strokeWidth="1.2"/>
    </g>
    <g opacity=".08">
      <line x1="40" y1="720" x2="754" y2="720" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="735" x2="754" y2="735" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="750" x2="754" y2="750" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="765" x2="754" y2="765" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="780" x2="754" y2="780" stroke="#3a2010" strokeWidth="1.2"/>
    </g>
    {/* Cheie Sol watermark */}
    <text x="397" y="620" textAnchor="middle" fontFamily="serif" fontSize="280" fill="#3a2010" opacity=".05">𝄞</text>
    {/* Silueta vioara */}
    <g transform="translate(610,780) scale(0.7)" opacity=".13">
      <path d="M60 0 C80 0 95 15 95 35 C95 50 85 60 75 68 C85 78 92 90 92 105 C92 130 75 148 60 148 C45 148 28 130 28 105 C28 90 35 78 45 68 C35 60 25 50 25 35 C25 15 40 0 60 0Z" fill="none" stroke="#3a1a08" strokeWidth="3"/>
      <rect x="55" y="148" width="10" height="80" fill="none" stroke="#3a1a08" strokeWidth="2"/>
      <path d="M55 228 C50 240 45 250 50 258 C55 266 65 258 60 248" fill="none" stroke="#3a1a08" strokeWidth="2"/>
      <line x1="60" y1="40" x2="60" y2="145" stroke="#3a1a08" strokeWidth="1" opacity=".5"/>
      <line x1="48" y1="80" x2="72" y2="80" stroke="#3a1a08" strokeWidth="1.5"/>
    </g>
    {/* Bordura */}
    <rect x="28" y="28" width="738" height="1067" fill="none" stroke="#5a3a1a" strokeWidth="1.5" opacity=".45"/>
    <rect x="38" y="38" width="718" height="1047" fill="none" stroke="#5a3a1a" strokeWidth=".7" opacity=".3"/>
    <g opacity=".5">
      <path d="M28 80 L28 28 L80 28" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="28" cy="28" r="4" fill="#8b5e2e" opacity=".6"/>
      <path d="M714 28 L766 28 L766 80" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="766" cy="28" r="4" fill="#8b5e2e" opacity=".6"/>
      <path d="M28 1043 L28 1095 L80 1095" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="28" cy="1095" r="4" fill="#8b5e2e" opacity=".6"/>
      <path d="M714 1095 L766 1095 L766 1043" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="766" cy="1095" r="4" fill="#8b5e2e" opacity=".6"/>
    </g>
  </svg>
)

// ── Portativ decorativ SVG ────────────────────────────────────────────────────
const StaffSVG = ({ opacity = '.4', notes = true }: { opacity?: string; notes?: boolean }) => (
  <svg viewBox="0 0 614 28" style={{ width:'100%', height:'28px', display:'block' }} fill="none">
    {[4,10,16,22,28].map(y => (
      <line key={y} x1="0" y1={y} x2="614" y2={y} stroke="#5a3a1a" strokeWidth="1" opacity={opacity}/>
    ))}
    <text x="4" y="26" fontFamily="serif" fontSize="32" fill="#8b5e2e" opacity=".65">𝄞</text>
    {notes && <>
      <text x="60" y="8" fontFamily="serif" fontSize="18" fill="#3a2010" opacity=".5">♩</text>
      <text x="110" y="14" fontFamily="serif" fontSize="16" fill="#3a2010" opacity=".45">♪</text>
      <text x="180" y="6" fontFamily="serif" fontSize="20" fill="#3a2010" opacity=".45">♫</text>
      <text x="260" y="20" fontFamily="serif" fontSize="16" fill="#3a2010" opacity=".4">♩</text>
      <text x="350" y="8" fontFamily="serif" fontSize="18" fill="#3a2010" opacity=".4">♪</text>
      <text x="440" y="16" fontFamily="serif" fontSize="20" fill="#3a2010" opacity=".45">♫</text>
      <text x="540" y="10" fontFamily="serif" fontSize="16" fill="#3a2010" opacity=".45">♩</text>
    </>}
  </svg>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;500&family=Cinzel:wght@400;600&display=swap');

.rk * { box-sizing: border-box; margin: 0; padding: 0; }
.rk { font-family: 'Cormorant Garamond', serif; background: #c8a060; color: #1a0e06; min-height: 100vh; }

.rk-topbar { background: #2a1808; border-bottom: 1px solid rgba(200,160,96,.2); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.rk-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #e8c888; text-decoration: none; font-weight: 600; }
.rk-topbar-logo span { color: #c8a060; }
.rk-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(200,160,96,.5); color: #e8c888; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: transparent; transition: background .2s; }
.rk-topbar-btn:hover { background: rgba(200,160,96,.15); }

.rk-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.rk-title { text-align: center; margin-bottom: 40px; }
.rk-title h1 { font-family: 'Playfair Display', serif; font-size: clamp(20px,3vw,30px); font-weight: 400; font-style: italic; color: #1a0e06; margin-bottom: 8px; }
.rk-title p { font-size: 11px; color: rgba(26,14,6,.55); letter-spacing: .1em; text-transform: uppercase; }

.rk-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.rk-inv-wrap { position: sticky; top: 72px; }
.rk-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.rk-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.rk-inv-inner { position: absolute; inset: 0; }
.rk-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.rk-inv {
  width: 794px; height: 1123px;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: center;
}
.rk-content {
  position: relative; z-index: 4;
  text-align: center; width: 100%;
  padding: 52px 90px 48px;
  display: flex; flex-direction: column; align-items: center;
}
.rk-pre-title { font-family: 'Raleway', sans-serif; font-size: 12px; font-weight: 400; letter-spacing: .32em; text-transform: uppercase; color: #5a3a1a; opacity: .75; margin-bottom: 14px; }
.rk-section-label { font-family: 'Raleway', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: .28em; text-transform: uppercase; color: #5a3a1a; opacity: .7; margin-bottom: 4px; }
.rk-section-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; font-style: italic; color: #1a0e06; line-height: 1.5; margin-bottom: 8px; }
.rk-section-val-sm { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; font-style: italic; color: #1a0e06; line-height: 1.5; margin-bottom: 8px; }
.rk-violin-f { font-family: 'IM Fell English', serif; font-size: 72px; color: #8b5e2e; opacity: .55; line-height: 1; vertical-align: middle; display: inline-block; margin: 0 12px; }
.rk-name-groom { font-family: 'Playfair Display', serif; font-size: 80px; font-weight: 400; font-style: italic; color: #1a0e06; line-height: 1; display: block; }
.rk-amp { font-family: 'Cormorant Garamond', serif; font-size: 64px; font-weight: 300; font-style: italic; color: #8b5e2e; display: block; line-height: 1; margin: 2px 0; }
.rk-name-bride { font-family: 'Playfair Display', serif; font-size: 80px; font-weight: 400; font-style: italic; color: #1a0e06; line-height: 1; display: block; }
.rk-invite-text { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; font-style: italic; color: #3a2010; letter-spacing: .06em; margin: 14px 0 6px; }
.rk-sep-ornament { font-size: 28px; color: #8b5e2e; opacity: .6; margin: 8px 0; letter-spacing: 8px; }
.rk-date { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 600; color: #1a0e06; letter-spacing: .06em; margin-bottom: 10px; }
.rk-event-row { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-style: italic; color: #3a2010; line-height: 1.7; }
.rk-rsvp { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: #5a3a1a; line-height: 1.8; margin-top: 6px; }
.rk-rsvp strong { font-style: normal; color: #1a0e06; font-weight: 600; }
.rk-staff { width: 100%; margin: 10px 0; }

/* Watermark */
.rk-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.rk-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.rk-wm-row { display: flex; white-space: nowrap; }
.rk-wm-item { font-size: 34px; letter-spacing: .1em; color: #f01935; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; }
.rk-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(58,32,16,.2); border-top: 1px solid rgba(139,94,46,.4); padding: 8px 10px; text-align: center; font-size: 11px; color: #5a3a1a; letter-spacing: .06em; z-index: 25; }

/* FORM */
.rk-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1a0e06; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(139,94,46,.3); padding-bottom: 10px; }
.rk-section { margin-bottom: 18px; }
.rk-sl { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #8b5e2e; margin-bottom: 7px; }
.rk-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.rk-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.rk-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(139,94,46,.25); border-radius: 6px; background: #fff; color: #1a0e06; font-family: 'Raleway', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.rk-input:focus { border-color: #8b5e2e; }
.rk-input::placeholder { color: rgba(26,14,6,.3); font-style: italic; }
.rk-dw { position: relative; display: flex; align-items: center; }
.rk-dw .rk-input { padding-right: 40px; }
.rk-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.rk-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #8b5e2e; }
.rk-iw { position: relative; }
.rk-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,14,6,.3); pointer-events: none; }
.rk-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.rk-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #8b5e2e; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s; }
.rk-pay-btn:hover { background: #6b4420; }
.rk-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.rk-pay-note { font-size: 11px; color: rgba(26,14,6,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.rk-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(139,94,46,.06); border: 1px solid rgba(139,94,46,.18); border-radius: 8px; }
.rk-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,14,6,.6); }
.rk-gi span { font-size: 14px; }

.rk-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.rk-alert-box { background: #fdf5e8; border: 1px solid rgba(139,94,46,.3); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.25); }
.rk-alert-icon { font-size: 36px; margin-bottom: 12px; }
.rk-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1a0e06; letter-spacing: .08em; margin-bottom: 14px; }
.rk-alert-text { font-size: 13px; color: rgba(26,14,6,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.rk-alert-text strong { font-style: normal; color: #1a0e06; }
.rk-alert-btns { display: flex; gap: 10px; }
.rk-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(139,94,46,.3); border-radius: 8px; background: #fff; color: rgba(26,14,6,.5); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.rk-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #8b5e2e; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600; cursor: pointer; }
.rk-alert-cancel:hover { background: rgba(139,94,46,.06); }
.rk-alert-confirm:hover { background: #6b4420; }

.rk-footer { border-top: 1px solid rgba(139,94,46,.2); background: #2a1808; padding: 28px 24px; text-align: center; }
.rk-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(232,200,136,.5); margin-bottom: 14px; }
.rk-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #8b5e2e; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600; text-decoration: none; transition: background .2s; }
.rk-footer-btn:hover { background: #6b4420; }
.rk-footer-copy { font-size: 11px; color: rgba(232,200,136,.25); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .rk-layout { grid-template-columns: 1fr; gap: 32px; } .rk-inv-wrap { position: static; } }
@media (max-width: 480px) { .rk-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieNuntaRustic() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const dateFormatted = formatDate(fields.weddingDate)
  const rsvpFormatted = formatRsvp(fields.rsvpDate)

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatie-nunta-rustic' }),
      })
      const { url, error: err } = await res.json()
      if (err) { setError(err); return }
      window.location.href = url
    } catch {
      setError('A apărut o eroare. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }, [fields])

  const WM_TEXTS = Array(16).fill(null).map((_, i) => (
    <div key={i} className="rk-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="rk-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="rk">

        {showAlert && (
          <div className="rk-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="rk-alert-box" onClick={e => e.stopPropagation()}>
              <div className="rk-alert-icon">⚠️</div>
              <h3 className="rk-alert-title">Înainte să continui</h3>
              <p className="rk-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="rk-alert-btns">
                <button className="rk-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="rk-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="rk-topbar">
          <Link href="/" className="rk-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="rk-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="rk-inner">
          <div className="rk-title">
            <h1>Invitație Nuntă — Rustic Simfonic</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="rk-layout">
            <div className="rk-inv-wrap">
              <div className="rk-inv-ratio">
                <div className="rk-inv-inner">
                  <div className="rk-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="rk-inv">
                      <KraftBg />
                      <div className="rk-content">
                        <p className="rk-pre-title">Cu dragoste vă invită</p>

                        <div className="rk-staff"><StaffSVG /></div>

                        <p className="rk-section-label">Cu binecuvântarea părinților</p>
                        <p className="rk-section-val-sm">{fields.parentsGroom}</p>
                        <p className="rk-section-val-sm">{fields.parentsBride}</p>

                        <div style={{ margin:'6px 0 4px' }}>
                          <span className="rk-violin-f">ƒ</span>
                          <span className="rk-name-groom">{fields.groom || 'Mire'}</span>
                          <span className="rk-amp">&amp;</span>
                          <span className="rk-name-bride">{fields.bride || 'Mireasă'}</span>
                          <span className="rk-violin-f" style={{ transform:'scaleX(-1)', display:'inline-block' }}>ƒ</span>
                        </div>

                        <p className="rk-invite-text">vă invită cu drag la nunta noastră</p>

                        <div className="rk-staff" style={{ marginTop:'10px' }}>
                          <StaffSVG notes={false} opacity=".3" />
                        </div>

                        <p className="rk-section-label" style={{ marginTop:'8px' }}>Nași de cununie</p>
                        <p className="rk-section-val">{fields.nasi}</p>

                        <p className="rk-sep-ornament">✦ ♪ ✦</p>

                        <p className="rk-date">{dateFormatted || 'Ziua nunții'}</p>

                        <p className="rk-section-label">Cununie Religioasă</p>
                        <p className="rk-section-val-sm">{fields.church || 'Biserica'}</p>
                        <p className="rk-event-row">ora {fields.churchTime}</p>

                        <p className="rk-sep-ornament" style={{ fontSize:'18px', margin:'8px 0' }}>♫</p>

                        <p className="rk-section-label">Recepție</p>
                        <p className="rk-section-val-sm">{fields.restaurant || 'Restaurantul'}</p>
                        <p className="rk-event-row">ora {fields.restTime}</p>

                        <div className="rk-staff" style={{ marginTop:'14px', marginBottom:'8px' }}>
                          <StaffSVG notes={false} opacity=".25" />
                        </div>

                        <p className="rk-rsvp">
                          Confirmați prezența până la <strong>{rsvpFormatted || fields.rsvpDate}</strong><br />
                          Tel: <strong>{fields.rsvpTel}</strong>
                        </p>
                      </div>

                      <div className="rk-wm">
                        <div className="rk-wm-grid">{WM_TEXTS}</div>
                        <div className="rk-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rk-form">
              <h2>Personalizează invitația</h2>

              <div className="rk-section">
                <p className="rk-sl">Miri</p>
                <div className="rk-g2">
                  <input className="rk-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="rk-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="rk-section">
                <p className="rk-sl">Părinți mire</p>
                <div className="rk-g1">
                  <input className="rk-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="rk-section">
                <p className="rk-sl">Părinți mireasă</p>
                <div className="rk-g1">
                  <input className="rk-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="rk-section">
                <p className="rk-sl">Nași de cununie</p>
                <div className="rk-g1">
                  <input className="rk-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="rk-section">
                <p className="rk-sl">Data nunții</p>
                <div className="rk-g1">
                  <div className="rk-dw">
                    <input className="rk-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="rk-ci">📅</span>
                    <input className="rk-dn" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="rk-section">
                <p className="rk-sl">Cununie religioasă</p>
                <div className="rk-g2">
                  <input className="rk-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="rk-iw">
                    <input className="rk-input" type="text" placeholder="13:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="rk-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="rk-section">
                <p className="rk-sl">Recepție</p>
                <div className="rk-g2">
                  <input className="rk-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="rk-iw">
                    <input className="rk-input" type="text" placeholder="18:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="rk-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="rk-section">
                <p className="rk-sl">RSVP</p>
                <div className="rk-g2">
                  <div className="rk-dw">
                    <input className="rk-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="rk-ci">📅</span>
                    <input className="rk-dn" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="rk-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="rk-error">⚠️ {error}</div>}

              <button className="rk-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="rk-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>
              <div className="rk-guarantee">
                <div className="rk-gi"><span>✓</span> Download instant</div>
                <div className="rk-gi"><span>✓</span> PDF + JPG</div>
                <div className="rk-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="rk-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="rk-footer">
          <p className="rk-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="rk-footer-btn">← Vezi toate modelele</Link>
          <p className="rk-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
