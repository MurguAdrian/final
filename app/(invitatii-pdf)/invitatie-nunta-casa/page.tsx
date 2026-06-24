'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDateFull(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${DAYS[d.getDay()]} | ${d.getDate()} ${MONTHS[d.getMonth()].toUpperCase()} ${d.getFullYear()}`
}
function formatRsvp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${d.getDate()} ${MONTHS[d.getMonth()].toUpperCase()} ${d.getFullYear()}`
}
function formatDisplayDate(val: string) {
  if (!val) return ''
  const [y, m, d] = val.split('-')
  return `${d}.${m}.${y}`
}
function getInitials(groom: string, bride: string) {
  return [
    (groom || 'A').trim().charAt(0).toUpperCase(),
    (bride || 'A').trim().charAt(0).toUpperCase(),
  ]
}

interface Fields {
  bride: string; groom: string; parentsGroom: string; parentsBride: string
  nasi: string; weddingDate: string; church: string; churchTime: string
  churchAddress: string; restaurant: string; restTime: string
  rsvpDate: string; rsvpTel: string
}

const DEFAULTS: Fields = {
  bride: 'Andreea', groom: 'Adrian',
  parentsGroom: 'Ana și Gheorghe Ionescu', parentsBride: 'Elena și Constantin Vasiliu',
  nasi: 'Mihaela și Florin Popescu',
  weddingDate: '2027-09-12',
  church: 'Biserica Sf. Gheorghe',
  churchTime: '16:00',
  churchAddress: 'Catedrala Ortodoxă, Onești',
  restaurant: 'Restaurant "Vatra", Bacău',
  restTime: '18:00',
  rsvpDate: '2027-07-15',
  rsvpTel: '0700 000 000',
}

// ── SVG Monograma geometrica (refolosita in preview) ──────────────────────────
const GeoMonogram = ({ init1, init2 }: { init1: string; init2: string }) => (
  <svg viewBox="0 0 200 200" fill="none" width="200" height="200">
    <defs>
      <linearGradient id="cs-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a840"/>
        <stop offset="50%" stopColor="#f0cc70"/>
        <stop offset="100%" stopColor="#b8900c"/>
      </linearGradient>
    </defs>
    <polygon points="100,12 172,52 172,148 100,188 28,148 28,52" fill="none" stroke="url(#cs-gold)" strokeWidth="1.5" opacity=".9"/>
    <polygon points="100,28 158,62 158,138 100,172 42,138 42,62" fill="none" stroke="url(#cs-gold)" strokeWidth=".7" opacity=".5"/>
    <line x1="28" y1="52" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    <line x1="172" y1="52" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    <line x1="28" y1="148" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    <line x1="172" y1="148" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    {/* Frunze stanga */}
    <path d="M28 100 Q10 80 5 60 Q18 72 28 100Z" fill="#8faa90" opacity=".8"/>
    <path d="M28 100 Q12 112 8 130 Q22 118 28 100Z" fill="#8faa90" opacity=".7"/>
    <path d="M5 60 Q16 80 28 100 Q22 118 8 130" stroke="#6a8a6a" strokeWidth="1" fill="none" opacity=".6"/>
    {/* Frunze dreapta */}
    <path d="M172 100 Q190 80 195 60 Q182 72 172 100Z" fill="#8faa90" opacity=".8"/>
    <path d="M172 100 Q188 112 192 130 Q178 118 172 100Z" fill="#8faa90" opacity=".7"/>
    <path d="M195 60 Q184 80 172 100 Q178 118 192 130" stroke="#6a8a6a" strokeWidth="1" fill="none" opacity=".6"/>
    {/* Initiale */}
    <text x="100" y="90" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="38" fontStyle="italic" fill="url(#cs-gold)" opacity=".95">{init1}</text>
    <line x1="70" y1="100" x2="130" y2="100" stroke="url(#cs-gold)" strokeWidth="1" opacity=".6"/>
    <text x="100" y="136" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="38" fontStyle="italic" fill="url(#cs-gold)" opacity=".95">{init2}</text>
  </svg>
)

// ── SVG Pete acuarela sage ────────────────────────────────────────────────────
const SageBlobs = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" preserveAspectRatio="none">
    <defs>
      <filter id="cs-blur"><feGaussianBlur stdDeviation="18"/></filter>
      <filter id="cs-blur-sm"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    <ellipse cx="80" cy="120" rx="160" ry="100" fill="#8faa90" opacity=".28" filter="url(#cs-blur)"/>
    <ellipse cx="40" cy="80" rx="90" ry="60" fill="#7a9a80" opacity=".2" filter="url(#cs-blur-sm)"/>
    <ellipse cx="140" cy="160" rx="110" ry="70" fill="#a0b8a0" opacity=".18" filter="url(#cs-blur)"/>
    <ellipse cx="720" cy="100" rx="140" ry="90" fill="#8faa90" opacity=".25" filter="url(#cs-blur)"/>
    <ellipse cx="760" cy="60" rx="80" ry="50" fill="#7a9a80" opacity=".18" filter="url(#cs-blur-sm)"/>
    <ellipse cx="100" cy="1020" rx="150" ry="90" fill="#8faa90" opacity=".22" filter="url(#cs-blur)"/>
    <ellipse cx="700" cy="1010" rx="140" ry="85" fill="#8faa90" opacity=".22" filter="url(#cs-blur)"/>
    <ellipse cx="750" cy="1060" rx="90" ry="55" fill="#7a9a80" opacity=".16" filter="url(#cs-blur-sm)"/>
  </svg>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Raleway:wght@300;400;500;600;700&family=Cinzel:wght@400;600&display=swap');

.cs * { box-sizing: border-box; margin: 0; padding: 0; }
.cs { font-family: 'Raleway', sans-serif; background: #f0ede5; color: #1a1a14; min-height: 100vh; }

.cs-topbar { background: #fff; border-bottom: 1px solid rgba(184,160,96,.2); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.cs-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #1a1a14; text-decoration: none; font-weight: 600; }
.cs-topbar-logo span { color: #b8a060; }
.cs-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #b8a060; color: #8a7030; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: #fff; transition: background .2s, color .2s; }
.cs-topbar-btn:hover { background: #b8a060; color: #fff; }

.cs-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.cs-title { text-align: center; margin-bottom: 40px; }
.cs-title h1 { font-family: 'Playfair Display', serif; font-size: clamp(20px,3vw,30px); font-weight: 400; font-style: italic; color: #1a1a14; margin-bottom: 8px; }
.cs-title p { font-size: 11px; color: rgba(26,26,20,.5); letter-spacing: .1em; text-transform: uppercase; }

.cs-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.cs-inv-wrap { position: sticky; top: 72px; }
.cs-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.cs-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.cs-inv-inner { position: absolute; inset: 0; }
.cs-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.cs-inv {
  width: 794px; height: 1123px; background: #f8f5ef;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 60px 90px 70px;
}
.cs-paper { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.cs-content { position: relative; z-index: 3; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center; }

.cs-mono-wrap { margin-bottom: 28px; }
.cs-together { font-size: 13px; font-weight: 500; letter-spacing: .28em; text-transform: uppercase; color: #5a5a4a; margin-bottom: 10px; }
.cs-names { font-family: 'Playfair Display', serif; font-size: 80px; font-weight: 700; color: #1a1a14; line-height: 1; margin-bottom: 10px; }
.cs-amp { font-style: italic; font-weight: 400; color: #b8a060; }
.cs-invite-line { font-size: 13px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase; color: #5a5a4a; margin-bottom: 28px; }
.cs-sep { width: 80px; height: 1px; background: #b8a060; opacity: .5; margin: 0 auto 28px; }
.cs-date { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; font-style: italic; color: #1a1a14; letter-spacing: .04em; margin-bottom: 20px; }
.cs-church-name { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #1a1a14; margin-bottom: 6px; }
.cs-church-sub { font-size: 14px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase; color: #5a5a4a; margin-bottom: 18px; }
.cs-event-line { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-style: italic; color: #3a3a2e; line-height: 1.7; }
.cs-sep2 { width: 80px; height: 1px; background: #b8a060; opacity: .4; margin: 24px auto; }
.cs-confirm-btn { display: inline-block; padding: 14px 52px; background: #6b8a70; color: #fff; font-size: 16px; font-weight: 500; letter-spacing: .1em; border-radius: 4px; margin-bottom: 22px; }
.cs-rsvp { font-size: 14px; font-weight: 300; font-style: italic; color: #5a5a4a; letter-spacing: .04em; }

/* Watermark */
.cs-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.cs-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.cs-wm-row { display: flex; white-space: nowrap; }
.cs-wm-item { font-size: 14px; letter-spacing: .1em; color: #b8a060; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; }
.cs-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(107,138,112,.12); border-top: 1px solid rgba(107,138,112,.25); padding: 8px 10px; text-align: center; font-size: 11px; color: #5a7a5a; letter-spacing: .06em; z-index: 25; }

/* FORM */
.cs-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1a1a14; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(184,160,96,.25); padding-bottom: 10px; }
.cs-section { margin-bottom: 18px; }
.cs-section-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #b8a060; margin-bottom: 7px; }
.cs-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.cs-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.cs-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(184,160,96,.22); border-radius: 6px; background: #fff; color: #1a1a14; font-family: 'Raleway', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.cs-input:focus { border-color: #b8a060; }
.cs-input::placeholder { color: rgba(26,26,20,.3); font-style: italic; }
.cs-date-wrap { position: relative; display: flex; align-items: center; }
.cs-date-wrap .cs-input { padding-right: 40px; }
.cs-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.cs-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #b8a060; }
.cs-input-wrap { position: relative; }
.cs-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,26,20,.3); pointer-events: none; }
.cs-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.cs-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #6b8a70; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s; }
.cs-pay-btn:hover { background: #527058; }
.cs-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.cs-pay-note { font-size: 11px; color: rgba(26,26,20,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.cs-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(107,138,112,.05); border: 1px solid rgba(107,138,112,.15); border-radius: 8px; }
.cs-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,26,20,.6); }
.cs-gi span { font-size: 14px; }

.cs-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.cs-alert-box { background: #fff; border: 1px solid rgba(184,160,96,.2); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.18); }
.cs-alert-icon { font-size: 36px; margin-bottom: 12px; }
.cs-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1a1a14; letter-spacing: .08em; margin-bottom: 14px; }
.cs-alert-text { font-size: 13px; color: rgba(26,26,20,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.cs-alert-text strong { font-style: normal; color: #1a1a14; }
.cs-alert-btns { display: flex; gap: 10px; }
.cs-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(184,160,96,.25); border-radius: 8px; background: #fff; color: rgba(26,26,20,.5); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.cs-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #6b8a70; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600; cursor: pointer; }
.cs-alert-cancel:hover { background: rgba(107,138,112,.06); }
.cs-alert-confirm:hover { background: #527058; }

.cs-footer { border-top: 1px solid rgba(184,160,96,.15); background: #fff; padding: 28px 24px; text-align: center; }
.cs-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(26,26,20,.45); margin-bottom: 14px; }
.cs-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #6b8a70; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600; text-decoration: none; transition: background .2s; }
.cs-footer-btn:hover { background: #527058; }
.cs-footer-copy { font-size: 11px; color: rgba(26,26,20,.3); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .cs-layout { grid-template-columns: 1fr; gap: 32px; } .cs-inv-wrap { position: static; } }
@media (max-width: 480px) { .cs-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieNuntaCasa() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const dateFormatted = formatDateFull(fields.weddingDate)
  const rsvpFormatted = formatRsvp(fields.rsvpDate)
  const [init1, init2] = getInitials(fields.groom, fields.bride)

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatie-nunta-casa' }),
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
    <div key={i} className="cs-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="cs-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cs">

        {showAlert && (
          <div className="cs-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="cs-alert-box" onClick={e => e.stopPropagation()}>
              <div className="cs-alert-icon">⚠️</div>
              <h3 className="cs-alert-title">Înainte să continui</h3>
              <p className="cs-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="cs-alert-btns">
                <button className="cs-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="cs-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="cs-topbar">
          <Link href="/" className="cs-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="cs-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="cs-inner">
          <div className="cs-title">
            <h1>Invitație Nuntă — Geometric Sage</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="cs-layout">
            <div className="cs-inv-wrap">
              <div className="cs-inv-ratio">
                <div className="cs-inv-inner">
                  <div className="cs-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="cs-inv">
                      {/* Hartie */}
                      <svg className="cs-paper" viewBox="0 0 794 1123" preserveAspectRatio="none">
                        <rect width="794" height="1123" fill="#f8f5ef"/>
                        <path d="M0 0 Q18 6 4 18 Q14 34 0 50 Q16 68 2 86 Q12 104 0 122 Q18 140 2 158 Q10 176 0 194 L0 0Z" fill="#ede8dc" opacity=".7"/>
                        <path d="M794 0 Q776 8 790 22 Q780 40 794 56 Q778 74 792 90 Q782 108 794 124 Q776 142 792 158 L794 0Z" fill="#ede8dc" opacity=".7"/>
                        <path d="M0 1123 Q18 1115 2 1101 Q14 1087 0 1073 Q16 1059 2 1045 L0 1123Z" fill="#ede8dc" opacity=".7"/>
                        <path d="M794 1123 Q776 1113 790 1099 Q780 1085 794 1071 Q778 1057 792 1043 L794 1123Z" fill="#ede8dc" opacity=".7"/>
                        <rect width="794" height="1123" fill="none" stroke="#d8d0bc" strokeWidth="1" opacity=".4"/>
                      </svg>
                      <SageBlobs />

                      <div className="cs-content">
                        <div className="cs-mono-wrap">
                          <GeoMonogram init1={init1} init2={init2} />
                        </div>
                        <p className="cs-together">CU BINECUVÂNTAREA PĂRINȚILOR</p>
                        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontStyle:'italic', color:'#3a3a2e', lineHeight:1.5, marginBottom:'8px', textAlign:'center' }}>
                          {fields.parentsBride} · {fields.parentsGroom}
                        </p>
                        <p style={{ fontSize:'11px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', color:'#5a5a4a', marginBottom:'4px' }}>NAȘI DE CUNUNIE</p>
                        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontStyle:'italic', color:'#3a3a2e', marginBottom:'0' }}>{fields.nasi}</p>
                        <div className="cs-sep" />
                        <p className="cs-names">
                          {fields.groom || 'Adrian'} <span className="cs-amp">&amp;</span> {fields.bride || 'Andreea'}
                        </p>
                        <p className="cs-invite-line">VĂ INVITĂ CU DRAG LA NUNTA LOR</p>
                        <div className="cs-sep" />
                        <p className="cs-date">{dateFormatted || 'Data nunții'}</p>
                        <p className="cs-church-name">{fields.church || 'Biserica'}</p>
                        <p className="cs-church-sub">RECEPȚIE, CINĂ ȘI DANS</p>
                        <p className="cs-event-line">Ora {fields.churchTime}, {fields.churchAddress || 'Locația cununie'}</p>
                        <p className="cs-event-line">Ora {fields.restTime}, {fields.restaurant || 'Restaurantul'}</p>
                        <div className="cs-sep2" />
                        <div className="cs-confirm-btn">Confirmare Prezență</div>
                        <p className="cs-rsvp">Vă rugăm să confirmați până la {rsvpFormatted || fields.rsvpDate}</p>
                        <p className="cs-rsvp" style={{ marginTop:'6px' }}>Tel: {fields.rsvpTel}</p>
                      </div>

                      <div className="cs-wm">
                        <div className="cs-wm-grid">{WM_TEXTS}</div>
                        <div className="cs-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cs-form">
              <h2>Personalizează invitația</h2>
              <div className="cs-section">
                <p className="cs-section-label">Miri</p>
                <div className="cs-grid2">
                  <input className="cs-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="cs-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">Părinți mire</p>
                <div className="cs-grid1">
                  <input className="cs-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">Părinți mireasă</p>
                <div className="cs-grid1">
                  <input className="cs-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">Nași de cununie</p>
                <div className="cs-grid1">
                  <input className="cs-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">Data nunții</p>
                <div className="cs-grid1">
                  <div className="cs-date-wrap">
                    <input className="cs-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="cs-cal-icon">📅</span>
                    <input className="cs-date-native" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">Numele Bisericii</p>
                <div className="cs-grid1">
                  <input className="cs-input" placeholder="ex: Biserica Sf. Gheorghe" value={fields.church} onChange={set('church')} />
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">Cununie — Adresă & Ora</p>
                <div className="cs-grid2">
                  <input className="cs-input" placeholder="Adresa cununie" value={fields.churchAddress} onChange={set('churchAddress')} />
                  <div className="cs-input-wrap">
                    <input className="cs-input" type="text" placeholder="16:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="cs-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">Recepție & Ora</p>
                <div className="cs-grid2">
                  <input className="cs-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="cs-input-wrap">
                    <input className="cs-input" type="text" placeholder="18:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="cs-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-section-label">RSVP</p>
                <div className="cs-grid2">
                  <div className="cs-date-wrap">
                    <input className="cs-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="cs-cal-icon">📅</span>
                    <input className="cs-date-native" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="cs-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="cs-error">⚠️ {error}</div>}

              <button className="cs-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="cs-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>
              <div className="cs-guarantee">
                <div className="cs-gi"><span>✓</span> Download instant</div>
                <div className="cs-gi"><span>✓</span> PDF + JPG</div>
                <div className="cs-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="cs-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="cs-footer">
          <p className="cs-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="cs-footer-btn">← Vezi toate modelele</Link>
          <p className="cs-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
