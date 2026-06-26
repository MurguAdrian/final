'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`
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
  bride: 'Mireasă', groom: 'Mire',
  parentsGroom: '[Nume Părinți Mire]', parentsBride: '[Nume Părinți Mireasă]',
  nasi: '[Prenume Nași]',
  weddingDate: '2025-06-14', church: '[Nume Biserică]', churchTime: '13:00',
  restaurant: '[Nume Restaurant]', restTime: '18:00',
  rsvpDate: '2025-06-01', rsvpTel: '0700 000 000',
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Lato:wght@300;400&family=Cinzel:wght@400;600&display=swap');

.vr * { box-sizing: border-box; margin: 0; padding: 0; }
.vr { font-family: 'Lato', sans-serif; background: #f0f4f0; color: #1a2e1a; min-height: 100vh; }

.vr-topbar { background: #fff; border-bottom: 1px solid rgba(90,122,58,.2); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.vr-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #1a2e1a; text-decoration: none; font-weight: 600; }
.vr-topbar-logo span { color: #3d5a3e; }
.vr-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #3d5a3e; color: #3d5a3e; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: #fff; transition: background .2s, color .2s; }
.vr-topbar-btn:hover { background: #3d5a3e; color: #fff; }

.vr-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.vr-title { text-align: center; margin-bottom: 40px; }
.vr-title h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px, 3vw, 32px); font-weight: 300; font-style: italic; color: #1a2e1a; margin-bottom: 8px; }
.vr-title p { font-size: 11px; color: rgba(26,46,26,.5); letter-spacing: .1em; text-transform: uppercase; }

.vr-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.vr-inv-wrap { position: sticky; top: 72px; }
.vr-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.vr-inv-ratio::before { content: ''; display: block; padding-top: calc(1123 / 794 * 100%); }
.vr-inv-inner { position: absolute; inset: 0; }
.vr-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.vr-inv {
  width: 794px; height: 1123px; background: #f9f7f2;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 110px 90px 90px;
}
.vr-botanical { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.vr-seal { position: absolute; right: 68px; bottom: 88px; z-index: 3; width: 88px; height: 88px; }
.vr-content { position: relative; z-index: 2; text-align: center; width: 100%; }

.vr-intro  { font-size: 20px; font-weight: 300; font-style: italic; color: #3d5a3e; letter-spacing: .03em; margin-bottom: 6px; line-height: 1.6; }
.vr-tagline { font-size: 20px; font-weight: 300; font-style: italic; color: #3d5a3e; letter-spacing: .03em; margin-bottom: 36px; line-height: 1.6; }
.vr-name-groom { font-family: 'Cormorant Garamond', serif; font-size: 96px; font-weight: 300; color: #1a2e1a; line-height: 1; display: block; }
.vr-amp { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 300; font-style: italic; color: #3d5a3e; display: block; line-height: 1; margin: 8px 0; }
.vr-name-bride { font-family: 'Cormorant Garamond', serif; font-size: 96px; font-weight: 300; color: #1a2e1a; line-height: 1; display: block; margin-bottom: 36px; }
.vr-sep { width: 70px; height: 1px; background: #3d5a3e; opacity: .35; margin: 0 auto 28px; }
.vr-block-label { font-size: 14px; font-weight: 400; letter-spacing: .16em; text-transform: uppercase; color: #5a7a5a; margin-bottom: 8px; }
.vr-block-value { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; font-style: italic; color: #1a2e1a; line-height: 1.5; margin-bottom: 22px; }
.vr-block-value.big { font-size: 32px; margin-bottom: 10px; }
.vr-details-row { display: flex; align-items: flex-start; justify-content: center; gap: 48px; margin: 14px 0 26px; }
.vr-detail-col { text-align: center; }
.vr-detail-label { font-size: 13px; font-weight: 400; letter-spacing: .16em; text-transform: uppercase; color: #5a7a5a; margin-bottom: 6px; }
.vr-detail-val { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-style: italic; color: #1a2e1a; line-height: 1.4; }
.vr-detail-time { font-size: 16px; font-weight: 300; color: #5a7a5a; margin-top: 4px; }
.vr-dot { color: #3d5a3e; opacity: .4; font-size: 28px; margin-top: 10px; }
.vr-rsvp-block { font-size: 17px; font-weight: 300; color: #5a7a5a; line-height: 1.9; font-style: italic; margin-top: 26px; }
.vr-rsvp-block span { color: #3d5a3e; font-weight: 400; }

/* Watermark */
.vr-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.vr-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; gap: 0; transform: rotate(-30deg); }
.vr-wm-row { display: flex; gap: 0; white-space: nowrap; }
.vr-wm-item { font-size: 34px; letter-spacing: .1em; color: #3d5a3e; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; }
.vr-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(61,90,62,.12); border-top: 1px solid rgba(61,90,62,.3); padding: 8px 10px; text-align: center; font-size: 11px; color: #3d5a3e; letter-spacing: .06em; z-index: 25; }

/* FORM */
.vr-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1a2e1a; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(61,90,62,.25); padding-bottom: 10px; }
.vr-section { margin-bottom: 18px; }
.vr-section-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #3d5a3e; margin-bottom: 7px; }
.vr-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.vr-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.vr-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(61,90,62,.25); border-radius: 6px; background: #fff; color: #1a2e1a; font-family: 'Lato', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.vr-input:focus { border-color: #3d5a3e; }
.vr-input::placeholder { color: rgba(26,46,26,.3); font-style: italic; }
.vr-date-wrap { position: relative; display: flex; align-items: center; }
.vr-date-wrap .vr-input { padding-right: 40px; }
.vr-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.vr-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #3d5a3e; }
.vr-input-wrap { position: relative; }
.vr-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,46,26,.3); pointer-events: none; letter-spacing: .06em; }
.vr-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.vr-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #3d5a3e; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s, opacity .2s; }
.vr-pay-btn:hover { background: #2d4530; }
.vr-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.vr-pay-note { font-size: 11px; color: rgba(26,46,26,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.vr-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(61,90,62,.05); border: 1px solid rgba(61,90,62,.15); border-radius: 8px; }
.vr-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,46,26,.6); }
.vr-gi span { font-size: 14px; }

.vr-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.vr-alert-box { background: #fff; border: 1px solid rgba(61,90,62,.25); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.18); }
.vr-alert-icon { font-size: 36px; margin-bottom: 12px; }
.vr-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1a2e1a; letter-spacing: .08em; margin-bottom: 14px; }
.vr-alert-text { font-size: 13px; color: rgba(26,46,26,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.vr-alert-text strong { font-style: normal; color: #1a2e1a; }
.vr-alert-btns { display: flex; gap: 10px; }
.vr-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(61,90,62,.3); border-radius: 8px; background: #fff; color: rgba(26,46,26,.5); font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; cursor: pointer; }
.vr-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #3d5a3e; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; cursor: pointer; }
.vr-alert-cancel:hover { background: rgba(61,90,62,.06); }
.vr-alert-confirm:hover { background: #2d4530; }

.vr-footer { border-top: 1px solid rgba(61,90,62,.15); background: #fff; padding: 28px 24px; text-align: center; }
.vr-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(26,46,26,.45); margin-bottom: 14px; }
.vr-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #3d5a3e; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; font-weight: 600; text-decoration: none; transition: background .2s; }
.vr-footer-btn:hover { background: #2d4530; }
.vr-footer-copy { font-size: 11px; color: rgba(26,46,26,.3); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .vr-layout { grid-template-columns: 1fr; gap: 32px; } .vr-inv-wrap { position: static; } }
@media (max-width: 480px) { .vr-inner { padding: 28px 16px 60px; } }
`

// SVG botanical corners refolosit si in preview
const BotanicalSVG = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" fill="none">
    <g opacity=".85">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <path d="M60 20 Q100 80 80 150" stroke="#5a7a3a" strokeWidth="1" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
      <ellipse cx="100" cy="180" rx="22" ry="9" fill="#5a8040" opacity=".55" transform="rotate(-20 100 180)"/>
      <path d="M15 80 Q35 70 45 85 Q35 100 15 90 Z" fill="#4a6a30" opacity=".5"/>
      <path d="M25 110 Q50 95 58 115 Q50 130 25 120 Z" fill="#5a7a3a" opacity=".5"/>
    </g>
    <g opacity=".85" transform="translate(794,0) scale(-1,1)">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
      <ellipse cx="100" cy="180" rx="22" ry="9" fill="#5a8040" opacity=".55" transform="rotate(-20 100 180)"/>
      <path d="M15 80 Q35 70 45 85 Q35 100 15 90 Z" fill="#4a6a30" opacity=".5"/>
      <path d="M25 110 Q50 95 58 115 Q50 130 25 120 Z" fill="#5a7a3a" opacity=".5"/>
    </g>
    <g opacity=".8" transform="translate(0,1123) scale(1,-1)">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
    </g>
    <g opacity=".8" transform="translate(794,1123) scale(-1,-1)">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
    </g>
    <path d="M160 35 Q300 20 397 28 Q494 20 634 35" stroke="#5a7a3a" strokeWidth="1" fill="none" opacity=".5"/>
    <path d="M160 1088 Q300 1103 397 1095 Q494 1103 634 1088" stroke="#5a7a3a" strokeWidth="1" fill="none" opacity=".5"/>
    <ellipse cx="220" cy="28" rx="12" ry="5" fill="#6a8f4a" opacity=".5" transform="rotate(-15 220 28)"/>
    <ellipse cx="340" cy="20" rx="11" ry="5" fill="#7a9f5a" opacity=".45" transform="rotate(-5 340 20)"/>
    <ellipse cx="460" cy="20" rx="11" ry="5" fill="#5a8040" opacity=".45" transform="rotate(5 460 20)"/>
    <ellipse cx="580" cy="28" rx="12" ry="5" fill="#4a7a3a" opacity=".5" transform="rotate(15 580 28)"/>
    <ellipse cx="220" cy="1095" rx="12" ry="5" fill="#6a8f4a" opacity=".5" transform="rotate(15 220 1095)"/>
    <ellipse cx="340" cy="1103" rx="11" ry="5" fill="#5a7a3a" opacity=".45" transform="rotate(5 340 1103)"/>
    <ellipse cx="460" cy="1103" rx="11" ry="5" fill="#5a8040" opacity=".45" transform="rotate(-5 460 1103)"/>
    <ellipse cx="580" cy="1095" rx="12" ry="5" fill="#4a7a3a" opacity=".5" transform="rotate(-15 580 1095)"/>
  </svg>
)

const SealSVG = () => (
  <svg style={{ position:'absolute', right:'80px', bottom:'110px', zIndex:3, width:'72px', height:'72px' }} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="34" fill="#3d5a3e" opacity=".92"/>
    <circle cx="36" cy="36" r="28" fill="none" stroke="#a8c89a" strokeWidth="1" opacity=".6"/>
    <path d="M36 20 C28 28 26 36 36 52 C46 36 44 28 36 20Z" fill="#a8c89a" opacity=".8"/>
    <path d="M36 20 L36 52" stroke="#3d5a3e" strokeWidth=".8" opacity=".6"/>
  </svg>
)

export default function InvitatieNuntaDeVara() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const weddingDateFormatted = formatDate(fields.weddingDate)
  const weddingYear = fields.weddingDate ? new Date(fields.weddingDate).getFullYear() : '2025'
  const rsvpFormatted = formatRsvp(fields.rsvpDate)

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatie-nunta-de-vara' }),
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
    <div key={i} className="vr-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="vr-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="vr">

        {showAlert && (
          <div className="vr-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="vr-alert-box" onClick={e => e.stopPropagation()}>
              <div className="vr-alert-icon">⚠️</div>
              <h3 className="vr-alert-title">Înainte să continui</h3>
              <p className="vr-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="vr-alert-btns">
                <button className="vr-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="vr-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="vr-topbar">
          <Link href="/" className="vr-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="vr-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="vr-inner">
          <div className="vr-title">
            <h1>Invitație Nuntă — Vară Botanică</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="vr-layout">
            <div className="vr-inv-wrap">
              <div className="vr-inv-ratio">
                <div className="vr-inv-inner">
                  <div className="vr-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="vr-inv">
                      <BotanicalSVG />
                      <SealSVG />

                      <div className="vr-content">
                        <p className="vr-intro">Două suflete, o promisiune sub cerul liber</p>
                        <p className="vr-tagline">Vă invităm cu drag la nunta noastră</p>

                        <span className="vr-name-groom">{fields.groom || 'Mire'}</span>
                        <span className="vr-amp">&amp;</span>
                        <span className="vr-name-bride">{fields.bride || 'Mireasă'}</span>

                        <div className="vr-sep" />

                        <p className="vr-block-label">Cu binecuvântarea părinților noștri</p>
                        <p className="vr-block-value">Familia {fields.parentsGroom}<br />Familia {fields.parentsBride}</p>

                        <p className="vr-block-label">Și călăuziți de nașii noștri</p>
                        <p className="vr-block-value">{fields.nasi}</p>

                        <div className="vr-sep" />

                        <p className="vr-block-value big">{weddingDateFormatted || 'Ziua nunții'}, {weddingYear}</p>

                        <div className="vr-details-row">
                          <div className="vr-detail-col">
                            <p className="vr-detail-label">Cununia Religioasă</p>
                            <p className="vr-detail-val">{fields.church || 'Biserica'}</p>
                            <p className="vr-detail-time">Ora {fields.churchTime}</p>
                          </div>
                          <div className="vr-dot">·</div>
                          <div className="vr-detail-col">
                            <p className="vr-detail-label">Marea Sărbătoare</p>
                            <p className="vr-detail-val">{fields.restaurant || 'Restaurantul'}</p>
                            <p className="vr-detail-time">Ora {fields.restTime}</p>
                          </div>
                        </div>

                        <div className="vr-rsvp-block">
                          Confirmați prezența până pe <span>{rsvpFormatted || fields.rsvpDate}</span><br />
                          Tel: <span>{fields.rsvpTel}</span>
                        </div>
                      </div>

                      <div className="vr-wm">
                        <div className="vr-wm-grid">{WM_TEXTS}</div>
                        <div className="vr-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vr-form">
              <h2>Personalizează invitația</h2>

              <div className="vr-section">
                <p className="vr-section-label">Miri</p>
                <div className="vr-grid2">
                  <input className="vr-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="vr-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="vr-section">
                <p className="vr-section-label">Părinți mire</p>
                <div className="vr-grid1">
                  <input className="vr-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="vr-section">
                <p className="vr-section-label">Părinți mireasă</p>
                <div className="vr-grid1">
                  <input className="vr-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="vr-section">
                <p className="vr-section-label">Nași de cununie</p>
                <div className="vr-grid1">
                  <input className="vr-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="vr-section">
                <p className="vr-section-label">Data nunții</p>
                <div className="vr-grid1">
                  <div className="vr-date-wrap">
                    <input className="vr-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="vr-cal-icon">📅</span>
                    <input className="vr-date-native" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="vr-section">
                <p className="vr-section-label">Cununie religioasă</p>
                <div className="vr-grid2">
                  <input className="vr-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="vr-input-wrap">
                    <input className="vr-input" type="text" placeholder="13:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="vr-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="vr-section">
                <p className="vr-section-label">Recepție</p>
                <div className="vr-grid2">
                  <input className="vr-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="vr-input-wrap">
                    <input className="vr-input" type="text" placeholder="19:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="vr-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="vr-section">
                <p className="vr-section-label">RSVP</p>
                <div className="vr-grid2">
                  <div className="vr-date-wrap">
                    <input className="vr-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="vr-cal-icon">📅</span>
                    <input className="vr-date-native" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="vr-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="vr-error">⚠️ {error}</div>}

              <button className="vr-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="vr-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>

              <div className="vr-guarantee">
                <div className="vr-gi"><span>✓</span> Download instant</div>
                <div className="vr-gi"><span>✓</span> PDF + JPG</div>
                <div className="vr-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="vr-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="vr-footer">
          <p className="vr-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="vr-footer-btn">← Vezi toate modelele</Link>
          <p className="vr-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
