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
  bride: 'Miruna', groom: 'Ștefan',
  parentsGroom: 'Elena și Gheorghe Ionescu', parentsBride: 'Elma și Constantin Vasile',
  nasi: 'Mihaela și Florin Popescu',
  weddingDate: '2024-09-14', church: 'Biserica Sfântul Gheorghe', churchTime: '13:00',
  restaurant: 'Restaurant Vatra Botoșanei', restTime: '18:00',
  rsvpDate: '2024-09-01', rsvpTel: '0700 000 000',
}

// Botanical SVG refolosit in preview
const BotanicalOcean = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" fill="none">
    <g opacity=".75">
      <path d="M-10 200 Q60 240 40 320 Q20 400 80 450" stroke="#4a8fd4" strokeWidth="1.8" fill="none"/>
      <path d="M10 320 Q70 350 50 420" stroke="#4a8fd4" strokeWidth="1.2" fill="none"/>
      <ellipse cx="30" cy="250" rx="32" ry="14" fill="#5a9fd4" opacity=".55" transform="rotate(-35 30 250)"/>
      <ellipse cx="55" cy="300" rx="28" ry="12" fill="#3a7fc4" opacity=".5" transform="rotate(20 55 300)"/>
      <ellipse cx="20" cy="360" rx="34" ry="14" fill="#6aaad8" opacity=".5" transform="rotate(-15 20 360)"/>
      <ellipse cx="70" cy="340" rx="24" ry="11" fill="#4a90cc" opacity=".45" transform="rotate(40 70 340)"/>
      <ellipse cx="35" cy="420" rx="30" ry="13" fill="#5a9fd4" opacity=".5" transform="rotate(-25 35 420)"/>
      <ellipse cx="80" cy="400" rx="20" ry="9" fill="#3a7fc4" opacity=".4" transform="rotate(30 80 400)"/>
      <path d="M-5 280 Q25 265 38 285 Q25 305 -5 292 Z" fill="#3a6aaa" opacity=".45"/>
      <path d="M5 390 Q40 370 55 395 Q40 418 5 405 Z" fill="#4a80bc" opacity=".4"/>
      <circle cx="45" cy="270" r="7" fill="#8ac0e8" opacity=".6"/>
      <circle cx="25" cy="330" r="6" fill="#6aaad8" opacity=".55"/>
      <circle cx="60" cy="380" r="8" fill="#9acce0" opacity=".5"/>
    </g>
    <g opacity=".75" transform="translate(794,0) scale(-1,1)">
      <path d="M-10 200 Q60 240 40 320 Q20 400 80 450" stroke="#4a8fd4" strokeWidth="1.8" fill="none"/>
      <path d="M10 320 Q70 350 50 420" stroke="#4a8fd4" strokeWidth="1.2" fill="none"/>
      <ellipse cx="30" cy="250" rx="32" ry="14" fill="#5a9fd4" opacity=".55" transform="rotate(-35 30 250)"/>
      <ellipse cx="55" cy="300" rx="28" ry="12" fill="#3a7fc4" opacity=".5" transform="rotate(20 55 300)"/>
      <ellipse cx="20" cy="360" rx="34" ry="14" fill="#6aaad8" opacity=".5" transform="rotate(-15 20 360)"/>
      <ellipse cx="70" cy="340" rx="24" ry="11" fill="#4a90cc" opacity=".45" transform="rotate(40 70 340)"/>
      <ellipse cx="35" cy="420" rx="30" ry="13" fill="#5a9fd4" opacity=".5" transform="rotate(-25 35 420)"/>
      <ellipse cx="80" cy="400" rx="20" ry="9" fill="#3a7fc4" opacity=".4" transform="rotate(30 80 400)"/>
      <path d="M-5 280 Q25 265 38 285 Q25 305 -5 292 Z" fill="#3a6aaa" opacity=".45"/>
      <path d="M5 390 Q40 370 55 395 Q40 418 5 405 Z" fill="#4a80bc" opacity=".4"/>
      <circle cx="45" cy="270" r="7" fill="#8ac0e8" opacity=".6"/>
      <circle cx="25" cy="330" r="6" fill="#6aaad8" opacity=".55"/>
      <circle cx="60" cy="380" r="8" fill="#9acce0" opacity=".5"/>
    </g>
    <g opacity=".65" transform="translate(0,1123) scale(1,-1)">
      <path d="M-10 80 Q70 110 50 200 Q30 280 90 310" stroke="#4a8fd4" strokeWidth="1.5" fill="none"/>
      <ellipse cx="30" cy="110" rx="28" ry="12" fill="#5a9fd4" opacity=".5" transform="rotate(-30 30 110)"/>
      <ellipse cx="60" cy="160" rx="24" ry="10" fill="#3a7fc4" opacity=".45" transform="rotate(25 60 160)"/>
      <ellipse cx="20" cy="210" rx="30" ry="12" fill="#6aaad8" opacity=".45" transform="rotate(-20 20 210)"/>
      <circle cx="40" cy="130" r="7" fill="#8ac0e8" opacity=".5"/>
      <circle cx="65" cy="185" r="6" fill="#6aaad8" opacity=".45"/>
    </g>
    <g opacity=".65" transform="translate(794,1123) scale(-1,-1)">
      <path d="M-10 80 Q70 110 50 200 Q30 280 90 310" stroke="#4a8fd4" strokeWidth="1.5" fill="none"/>
      <ellipse cx="30" cy="110" rx="28" ry="12" fill="#5a9fd4" opacity=".5" transform="rotate(-30 30 110)"/>
      <ellipse cx="60" cy="160" rx="24" ry="10" fill="#3a7fc4" opacity=".45" transform="rotate(25 60 160)"/>
      <ellipse cx="20" cy="210" rx="30" ry="12" fill="#6aaad8" opacity=".45" transform="rotate(-20 20 210)"/>
      <circle cx="40" cy="130" r="7" fill="#8ac0e8" opacity=".5"/>
      <circle cx="65" cy="185" r="6" fill="#6aaad8" opacity=".45"/>
    </g>
  </svg>
)

const CrownOcean = () => (
  <svg viewBox="0 0 220 220" fill="none" style={{ width:'100%', height:'100%' }}>
    <circle cx="110" cy="110" r="80" stroke="#4a8fd4" strokeWidth="1" opacity=".2" fill="none"/>
    <path d="M50 110 Q70 70 110 60 Q150 70 170 110 Q150 150 110 160 Q70 150 50 110Z" stroke="#4a8fd4" strokeWidth="1.2" fill="none" opacity=".4"/>
    <ellipse cx="72" cy="78" rx="18" ry="8" fill="#5a9fd4" opacity=".6" transform="rotate(-45 72 78)"/>
    <ellipse cx="90" cy="62" rx="16" ry="7" fill="#3a7fc4" opacity=".55" transform="rotate(-20 90 62)"/>
    <ellipse cx="110" cy="57" rx="14" ry="6" fill="#6aaad8" opacity=".5"/>
    <ellipse cx="130" cy="62" rx="16" ry="7" fill="#4a90cc" opacity=".55" transform="rotate(20 130 62)"/>
    <ellipse cx="148" cy="78" rx="18" ry="8" fill="#5a9fd4" opacity=".6" transform="rotate(45 148 78)"/>
    <ellipse cx="158" cy="100" rx="16" ry="7" fill="#3a7fc4" opacity=".5" transform="rotate(65 158 100)"/>
    <ellipse cx="148" cy="142" rx="18" ry="8" fill="#6aaad8" opacity=".55" transform="rotate(135 148 142)"/>
    <ellipse cx="130" cy="158" rx="16" ry="7" fill="#4a90cc" opacity=".5" transform="rotate(160 130 158)"/>
    <ellipse cx="110" cy="163" rx="14" ry="6" fill="#5a9fd4" opacity=".5" transform="rotate(180 110 163)"/>
    <ellipse cx="90" cy="158" rx="16" ry="7" fill="#3a7fc4" opacity=".5" transform="rotate(200 90 158)"/>
    <ellipse cx="72" cy="142" rx="18" ry="8" fill="#6aaad8" opacity=".55" transform="rotate(225 72 142)"/>
    <ellipse cx="62" cy="120" rx="16" ry="7" fill="#4a90cc" opacity=".5" transform="rotate(250 62 120)"/>
    <circle cx="110" cy="57" r="5" fill="#a8d4f0" opacity=".8"/>
    <circle cx="158" cy="110" r="4" fill="#8ac0e8" opacity=".7"/>
    <circle cx="62" cy="110" r="4" fill="#8ac0e8" opacity=".7"/>
    <circle cx="110" cy="163" r="5" fill="#a8d4f0" opacity=".7"/>
    <text x="110" y="104" textAnchor="middle" fontFamily="Raleway, sans-serif" fontSize="11" fontWeight="500" letterSpacing="3" fill="#2a5fa8" opacity=".9">INVITATIE</text>
    <text x="110" y="122" textAnchor="middle" fontFamily="Raleway, sans-serif" fontSize="11" fontWeight="500" letterSpacing="3" fill="#2a5fa8" opacity=".9">DE NUNTĂ</text>
  </svg>
)

const SealOcean = () => (
  <svg style={{ position:'absolute', right:'60px', bottom:'100px', zIndex:3, width:'90px', height:'90px' }} viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="43" fill="#2a5fa8" opacity=".9"/>
    <circle cx="45" cy="45" r="36" fill="none" stroke="#a8c8e8" strokeWidth="1" opacity=".6"/>
    <ellipse cx="45" cy="35" rx="12" ry="18" fill="#a8c8e8" opacity=".7"/>
    <path d="M33 45 Q45 28 57 45" stroke="#a8c8e8" strokeWidth="1" fill="none" opacity=".5"/>
    <circle cx="45" cy="45" r="4" fill="#a8c8e8" opacity=".6"/>
  </svg>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Raleway:wght@300;400;500;600&family=Cinzel:wght@400;600&display=swap');

.oc * { box-sizing: border-box; margin: 0; padding: 0; }
.oc { font-family: 'Raleway', sans-serif; background: #eaf2fb; color: #1a3a6a; min-height: 100vh; }

.oc-topbar { background: #fff; border-bottom: 1px solid rgba(42,95,168,.15); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.oc-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #1a3a6a; text-decoration: none; font-weight: 600; }
.oc-topbar-logo span { color: #2a5fa8; }
.oc-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #2a5fa8; color: #2a5fa8; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: #fff; transition: background .2s, color .2s; }
.oc-topbar-btn:hover { background: #2a5fa8; color: #fff; }

.oc-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.oc-title { text-align: center; margin-bottom: 40px; }
.oc-title h1 { font-family: 'Playfair Display', serif; font-size: clamp(20px, 3vw, 30px); font-weight: 400; font-style: italic; color: #1a3a6a; margin-bottom: 8px; }
.oc-title p { font-size: 11px; color: rgba(26,58,106,.5); letter-spacing: .1em; text-transform: uppercase; }

.oc-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.oc-inv-wrap { position: sticky; top: 72px; }
.oc-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.oc-inv-ratio::before { content: ''; display: block; padding-top: calc(1123 / 794 * 100%); }
.oc-inv-inner { position: absolute; inset: 0; }
.oc-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.oc-inv {
  width: 794px; height: 1123px; background: #f0f5fa;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; padding: 0 80px 60px;
}
.oc-crown-wrap { width: 220px; height: 220px; margin: 0 auto -10px; position: relative; z-index: 2; flex-shrink: 0; }
.oc-content { position: relative; z-index: 2; text-align: center; width: 100%; }

.oc-tagline { font-size: 20px; font-weight: 300; font-style: italic; color: #2a5fa8; margin-bottom: 16px; letter-spacing: .04em; }
.oc-names { font-family: 'Playfair Display', serif; font-size: 88px; font-weight: 400; font-style: italic; color: #1a3a6a; line-height: 1; display: block; margin-bottom: 10px; }
.oc-amp { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 400; font-style: italic; color: #2a5fa8; }
.oc-sep { width: 80px; height: 1px; background: #2a5fa8; opacity: .3; margin: 14px auto 20px; }
.oc-date { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: #1a3a6a; letter-spacing: .04em; margin-bottom: 20px; }
.oc-event-block { margin-bottom: 16px; }
.oc-event-label { font-size: 14px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase; color: #2a5fa8; margin-bottom: 4px; }
.oc-event-name { font-family: 'Playfair Display', serif; font-size: 26px; font-style: italic; color: #1a3a6a; line-height: 1.4; }
.oc-event-time { font-size: 18px; font-weight: 300; color: #4a7ac0; margin-top: 2px; }
.oc-sep2 { width: 60px; height: 1px; background: #2a5fa8; opacity: .25; margin: 16px auto; }
.oc-info-label { font-size: 13px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase; color: #2a5fa8; margin-bottom: 5px; }
.oc-info-val { font-family: 'Playfair Display', serif; font-size: 24px; font-style: italic; color: #1a3a6a; line-height: 1.5; margin-bottom: 14px; }
.oc-rsvp { font-size: 17px; font-weight: 300; color: #4a7ac0; font-style: italic; line-height: 1.9; margin-top: 16px; }
.oc-rsvp span { color: #1a3a6a; font-weight: 500; font-style: normal; }

/* Watermark */
.oc-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.oc-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; gap: 0; transform: rotate(-30deg); }
.oc-wm-row { display: flex; gap: 0; white-space: nowrap; }
.oc-wm-item { font-size: 34px; letter-spacing: .1em; color: #f71212; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; }
.oc-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(42,95,168,.1); border-top: 1px solid rgba(42,95,168,.25); padding: 8px 10px; text-align: center; font-size: 11px; color: #2a5fa8; letter-spacing: .06em; z-index: 25; }

/* FORM */
.oc-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1a3a6a; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(42,95,168,.2); padding-bottom: 10px; }
.oc-section { margin-bottom: 18px; }
.oc-section-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #2a5fa8; margin-bottom: 7px; }
.oc-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.oc-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.oc-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(42,95,168,.2); border-radius: 6px; background: #fff; color: #1a3a6a; font-family: 'Raleway', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.oc-input:focus { border-color: #2a5fa8; }
.oc-input::placeholder { color: rgba(26,58,106,.3); font-style: italic; }
.oc-date-wrap { position: relative; display: flex; align-items: center; }
.oc-date-wrap .oc-input { padding-right: 40px; }
.oc-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.oc-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #2a5fa8; }
.oc-input-wrap { position: relative; }
.oc-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,58,106,.3); pointer-events: none; letter-spacing: .06em; }
.oc-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.oc-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #2a5fa8; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s, opacity .2s; }
.oc-pay-btn:hover { background: #1a4a8a; }
.oc-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.oc-pay-note { font-size: 11px; color: rgba(26,58,106,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.oc-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(42,95,168,.05); border: 1px solid rgba(42,95,168,.15); border-radius: 8px; }
.oc-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,58,106,.6); }
.oc-gi span { font-size: 14px; }

.oc-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.oc-alert-box { background: #fff; border: 1px solid rgba(42,95,168,.2); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.18); }
.oc-alert-icon { font-size: 36px; margin-bottom: 12px; }
.oc-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1a3a6a; letter-spacing: .08em; margin-bottom: 14px; }
.oc-alert-text { font-size: 13px; color: rgba(26,58,106,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.oc-alert-text strong { font-style: normal; color: #1a3a6a; }
.oc-alert-btns { display: flex; gap: 10px; }
.oc-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(42,95,168,.3); border-radius: 8px; background: #fff; color: rgba(26,58,106,.5); font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; cursor: pointer; }
.oc-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #2a5fa8; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; cursor: pointer; }
.oc-alert-cancel:hover { background: rgba(42,95,168,.06); }
.oc-alert-confirm:hover { background: #1a4a8a; }

.oc-footer { border-top: 1px solid rgba(42,95,168,.15); background: #fff; padding: 28px 24px; text-align: center; }
.oc-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(26,58,106,.45); margin-bottom: 14px; }
.oc-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #2a5fa8; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; font-weight: 600; text-decoration: none; transition: background .2s; }
.oc-footer-btn:hover { background: #1a4a8a; }
.oc-footer-copy { font-size: 11px; color: rgba(26,58,106,.3); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .oc-layout { grid-template-columns: 1fr; gap: 32px; } .oc-inv-wrap { position: static; } }
@media (max-width: 480px) { .oc-inner { padding: 28px 16px 60px; } }
`

export default function InvitatiiNuntaOcean() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const weddingDateFormatted = formatDate(fields.weddingDate)
  const rsvpFormatted = formatRsvp(fields.rsvpDate)

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatii-nunta-ocean' }),
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
    <div key={i} className="oc-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="oc-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="oc">

        {showAlert && (
          <div className="oc-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="oc-alert-box" onClick={e => e.stopPropagation()}>
              <div className="oc-alert-icon">⚠️</div>
              <h3 className="oc-alert-title">Înainte să continui</h3>
              <p className="oc-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="oc-alert-btns">
                <button className="oc-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="oc-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="oc-topbar">
          <Link href="/" className="oc-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="oc-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="oc-inner">
          <div className="oc-title">
            <h1>Invitație Nuntă — Ocean</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="oc-layout">
            <div className="oc-inv-wrap">
              <div className="oc-inv-ratio">
                <div className="oc-inv-inner">
                  <div className="oc-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="oc-inv">
                      <BotanicalOcean />
                      <SealOcean />

                      <div className="oc-crown-wrap"><CrownOcean /></div>

                      <div className="oc-content">
                        <p className="oc-tagline">vă invită cu drag la nunta noastră</p>
                        <span className="oc-names">
                          {fields.groom || 'Mire'} <span className="oc-amp">&amp;</span> {fields.bride || 'Mireasă'}
                        </span>
                        <div className="oc-sep" />
                        <p className="oc-date">{weddingDateFormatted || 'Ziua nunții'}</p>

                        <div className="oc-event-block">
                          <p className="oc-event-label">Cununia Religioasă</p>
                          <p className="oc-event-name">{fields.church || 'Biserica'}</p>
                          <p className="oc-event-time">Ora {fields.churchTime}</p>
                        </div>

                        <div className="oc-event-block">
                          <p className="oc-event-label">Recepție</p>
                          <p className="oc-event-name">{fields.restaurant || 'Restaurantul'}</p>
                          <p className="oc-event-time">Ora {fields.restTime}</p>
                        </div>

                        <div className="oc-sep2" />

                        <p className="oc-info-label">Părinții Mirelui</p>
                        <p className="oc-info-val">{fields.parentsGroom}</p>

                        <p className="oc-info-label">Părinții Miresei</p>
                        <p className="oc-info-val">{fields.parentsBride}</p>

                        <p className="oc-info-label">Nași</p>
                        <p className="oc-info-val">{fields.nasi}</p>

                        <div className="oc-rsvp">
                          Confirmați prezența până pe <span>{rsvpFormatted || fields.rsvpDate}</span><br />
                          Tel: <span>{fields.rsvpTel}</span>
                        </div>
                      </div>

                      <div className="oc-wm">
                        <div className="oc-wm-grid">{WM_TEXTS}</div>
                        <div className="oc-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="oc-form">
              <h2>Personalizează invitația</h2>

              <div className="oc-section">
                <p className="oc-section-label">Miri</p>
                <div className="oc-grid2">
                  <input className="oc-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="oc-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="oc-section">
                <p className="oc-section-label">Părinți mire</p>
                <div className="oc-grid1">
                  <input className="oc-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="oc-section">
                <p className="oc-section-label">Părinți mireasă</p>
                <div className="oc-grid1">
                  <input className="oc-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="oc-section">
                <p className="oc-section-label">Nași de cununie</p>
                <div className="oc-grid1">
                  <input className="oc-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="oc-section">
                <p className="oc-section-label">Data nunții</p>
                <div className="oc-grid1">
                  <div className="oc-date-wrap">
                    <input className="oc-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="oc-cal-icon">📅</span>
                    <input className="oc-date-native" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="oc-section">
                <p className="oc-section-label">Cununie religioasă</p>
                <div className="oc-grid2">
                  <input className="oc-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="oc-input-wrap">
                    <input className="oc-input" type="text" placeholder="13:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="oc-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="oc-section">
                <p className="oc-section-label">Recepție</p>
                <div className="oc-grid2">
                  <input className="oc-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="oc-input-wrap">
                    <input className="oc-input" type="text" placeholder="19:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="oc-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="oc-section">
                <p className="oc-section-label">RSVP</p>
                <div className="oc-grid2">
                  <div className="oc-date-wrap">
                    <input className="oc-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="oc-cal-icon">📅</span>
                    <input className="oc-date-native" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="oc-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="oc-error">⚠️ {error}</div>}

              <button className="oc-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="oc-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>

              <div className="oc-guarantee">
                <div className="oc-gi"><span>✓</span> Download instant</div>
                <div className="oc-gi"><span>✓</span> PDF + JPG</div>
                <div className="oc-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="oc-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="oc-footer">
          <p className="oc-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="oc-footer-btn">← Vezi toate modelele</Link>
          <p className="oc-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
