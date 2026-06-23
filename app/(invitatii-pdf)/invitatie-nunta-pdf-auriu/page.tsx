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
  bride: string
  groom: string
  parentsGroom: string
  parentsBride: string
  nasi: string
  weddingDate: string
  church: string
  churchTime: string
  restaurant: string
  restTime: string
  rsvpDate: string
  rsvpTel: string
}

const DEFAULTS: Fields = {
  bride: 'Andreea',
  groom: 'Alexandru',
  parentsGroom: 'Ion și Maria Popescu',
  parentsBride: 'Gheorghe și Elena Ionescu',
  nasi: 'Mihai și Cristina Dumitrescu',
  weddingDate: '2025-06-14',
  church: 'Biserica Sf. Nicolae',
  churchTime: '13:00',
  restaurant: 'Restaurant Dolce Vita',
  restTime: '18:00',
  rsvpDate: '2025-06-01',
  rsvpTel: '0700 000 000',
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&family=Cinzel:wght@400;600&display=swap');

.vr * { box-sizing: border-box; margin: 0; padding: 0; }
.vr { font-family: 'Montserrat', sans-serif; background: #EEF4EF; color: #1B3B2B; min-height: 100vh; }

.vr-topbar { background: #fff; border-bottom: 1px solid rgba(95,133,117,.2); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.vr-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #1B3B2B; text-decoration: none; font-weight: 600; }
.vr-topbar-logo span { color: #5F8575; }
.vr-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #5F8575; color: #5F8575; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: #fff; transition: background .2s, color .2s; }
.vr-topbar-btn:hover { background: #5F8575; color: #fff; }

.vr-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.vr-title { text-align: center; margin-bottom: 40px; }
.vr-title h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px, 3vw, 32px); font-weight: 300; font-style: italic; letter-spacing: .06em; color: #1B3B2B; margin-bottom: 8px; }
.vr-title p { font-size: 12px; color: rgba(27,59,43,.55); letter-spacing: .08em; text-transform: uppercase; font-weight: 300; }

.vr-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.vr-inv-wrap { position: sticky; top: 72px; }

.vr-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.vr-inv-ratio::before { content: ''; display: block; padding-top: calc(1123 / 794 * 100%); }
.vr-inv-inner { position: absolute; inset: 0; }
.vr-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE PREVIEW ── */
.vr-inv {
  width: 794px; height: 1123px;
  background: #D1E2D3;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
}

.vr-leaf-top { position: absolute; top: 36px; right: 52px; opacity: .55; }
.vr-leaf-bottom { position: absolute; bottom: 72px; left: 44px; opacity: .5; transform: rotate(15deg); }

.vr-zone-top {
  flex: 0 0 35%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
  padding: 48px 80px 32px;
}
.vr-intro-text {
  font-size: 11px; font-weight: 300;
  letter-spacing: .28em; text-transform: uppercase;
  color: #1B3B2B; opacity: .65;
  text-align: center; margin-bottom: 20px;
}
.vr-parents-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 300; font-style: italic;
  color: #1B3B2B; line-height: 1.9; letter-spacing: .04em; text-align: center;
}
.vr-parents-and {
  font-size: 9px; letter-spacing: .24em; text-transform: uppercase;
  color: #5F8575; margin: 4px 0; display: block; text-align: center;
}

.vr-band-wrap { flex: 0 0 auto; position: relative; }
.vr-band-svg { display: block; width: 100%; }
.vr-band-names {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.vr-name-bride, .vr-name-groom {
  font-family: 'Cormorant Garamond', serif;
  font-size: 68px; font-weight: 300; font-style: italic;
  color: #FDFBF7; line-height: 1.05;
}
.vr-name-amp {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px; font-weight: 300; font-style: italic;
  color: rgba(253,251,247,.75); line-height: 1;
  display: block; text-align: center;
}

.vr-zone-bottom {
  flex: 1;
  display: flex; flex-direction: column;
  align-items: center;
  padding: 28px 80px 80px;
}
.vr-invite-line {
  font-size: 10px; font-weight: 300;
  letter-spacing: .22em; text-transform: uppercase;
  color: #1B3B2B; opacity: .6;
  margin-bottom: 22px; text-align: center;
}
.vr-sep { width: 44px; height: 1px; background: #5F8575; opacity: .5; margin: 0 auto 22px; }
.vr-date-main {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 300; font-style: italic;
  color: #1B3B2B; letter-spacing: .06em; text-align: center; margin-bottom: 6px;
}
.vr-date-year {
  font-size: 13px; font-weight: 300;
  letter-spacing: .3em; text-transform: uppercase;
  color: #5F8575; text-align: center; margin-bottom: 28px;
}
.vr-events { display: grid; grid-template-columns: 1fr 1fr; width: 100%; margin-bottom: 24px; }
.vr-event { text-align: center; padding: 18px 16px; }
.vr-event-left { border-right: 1px solid rgba(95,133,117,.25); }
.vr-ev-label {
  font-size: 9px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase;
  color: #5F8575; margin-bottom: 8px;
}
.vr-ev-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px; font-weight: 300; font-style: italic;
  color: #1B3B2B; line-height: 1.5; margin-bottom: 6px;
}
.vr-ev-time {
  font-size: 10px; font-weight: 300;
  letter-spacing: .16em; color: #5F8575;
}
.vr-sep2 { width: 44px; height: 1px; background: #5F8575; opacity: .4; margin: 0 auto 22px; }
.vr-nasi-label {
  font-size: 9px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase;
  color: #5F8575; text-align: center; margin-bottom: 8px;
}
.vr-nasi-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 19px; font-weight: 300; font-style: italic;
  color: #1B3B2B; text-align: center; line-height: 1.6;
}
.vr-rsvp {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 16px 48px;
  background: rgba(27,59,43,.06);
  border-top: 1px solid rgba(95,133,117,.2);
  text-align: center;
  font-size: 10px; font-weight: 300;
  letter-spacing: .16em; text-transform: uppercase;
  color: #1B3B2B; opacity: .75;
}
.vr-rsvp span { color: #5F8575; font-weight: 500; opacity: 1; }

/* Watermark */
.vr-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.vr-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; gap: 0; transform: rotate(-30deg); }
.vr-wm-row { display: flex; gap: 0; white-space: nowrap; }
.vr-wm-item { font-size: 14px; letter-spacing: .1em; color: #1B3B2B; opacity: .12; padding: 28px 30px; white-space: nowrap; user-select: none; }
.vr-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(95,133,117,.18); border-top: 1px solid rgba(95,133,117,.4); padding: 8px 10px; text-align: center; font-size: 11px; color: #1B3B2B; letter-spacing: .06em; z-index: 25; }

/* FORM */
.vr-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1B3B2B; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(95,133,117,.3); padding-bottom: 10px; }
.vr-section { margin-bottom: 18px; }
.vr-section-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #5F8575; margin-bottom: 7px; }
.vr-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.vr-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.vr-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(95,133,117,.3); border-radius: 6px; background: #fff; color: #1B3B2B; font-family: 'Montserrat', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.vr-input:focus { border-color: #5F8575; }
.vr-input::placeholder { color: rgba(27,59,43,.3); font-style: italic; }
.vr-date-wrap { position: relative; display: flex; align-items: center; }
.vr-date-wrap .vr-input { padding-right: 40px; }
.vr-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.vr-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #5F8575; }
.vr-input-wrap { position: relative; }
.vr-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(27,59,43,.3); pointer-events: none; letter-spacing: .06em; }
.vr-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.vr-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #5F8575; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s, opacity .2s; }
.vr-pay-btn:hover { background: #4a6b5d; }
.vr-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.vr-pay-note { font-size: 11px; color: rgba(27,59,43,.45); text-align: center; margin-top: 8px; line-height: 1.6; font-weight: 300; }
.vr-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(95,133,117,.06); border: 1px solid rgba(95,133,117,.2); border-radius: 8px; }
.vr-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(27,59,43,.6); font-weight: 400; }
.vr-gi span { font-size: 14px; }

/* Alert */
.vr-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.vr-alert-box { background: #fff; border: 1px solid rgba(95,133,117,.3); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.18); }
.vr-alert-icon { font-size: 36px; margin-bottom: 12px; }
.vr-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1B3B2B; letter-spacing: .08em; margin-bottom: 14px; }
.vr-alert-text { font-size: 13px; color: rgba(27,59,43,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.vr-alert-text strong { font-style: normal; color: #1B3B2B; }
.vr-alert-btns { display: flex; gap: 10px; }
.vr-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(95,133,117,.4); border-radius: 8px; background: #fff; color: rgba(27,59,43,.5); font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; cursor: pointer; }
.vr-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #5F8575; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; cursor: pointer; }
.vr-alert-cancel:hover { background: rgba(95,133,117,.08); }
.vr-alert-confirm:hover { background: #4a6b5d; }

/* Footer */
.vr-footer { border-top: 1px solid rgba(95,133,117,.2); background: #fff; padding: 28px 24px; text-align: center; }
.vr-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(27,59,43,.45); margin-bottom: 14px; }
.vr-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #5F8575; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; font-weight: 600; text-decoration: none; transition: background .2s; }
.vr-footer-btn:hover { background: #4a6b5d; }
.vr-footer-copy { font-size: 11px; color: rgba(27,59,43,.3); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) {
  .vr-layout { grid-template-columns: 1fr; gap: 32px; }
  .vr-inv-wrap { position: static; }
  .vr-topbar-logo { font-size: 12px; }
}
@media (max-width: 480px) {
  .vr-inner { padding: 28px 16px 60px; }
}
`

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
            <h1>Invitație Nuntă — Vară Organică</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="vr-layout">

            <div className="vr-inv-wrap">
              <div className="vr-inv-ratio">
                <div className="vr-inv-inner">
                  <div className="vr-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="vr-inv">

                      {/* Frunza dreapta sus */}
                      <svg className="vr-leaf-top" width="52" height="90" viewBox="0 0 52 90" fill="none">
                        <path d="M26 88 C26 88 2 60 2 34 C2 16 12 2 26 2 C40 2 50 16 50 34 C50 60 26 88 26 88Z" fill="#5F8575" opacity=".35"/>
                        <path d="M26 88 L26 2" stroke="#1B3B2B" strokeWidth=".8" opacity=".4"/>
                        <path d="M26 30 C16 24 8 20 4 16" stroke="#1B3B2B" strokeWidth=".6" opacity=".25"/>
                        <path d="M26 45 C36 38 44 34 48 30" stroke="#1B3B2B" strokeWidth=".6" opacity=".25"/>
                      </svg>

                      {/* Frunza stanga jos */}
                      <svg className="vr-leaf-bottom" width="44" height="76" viewBox="0 0 44 76" fill="none">
                        <path d="M22 74 C22 74 2 50 2 28 C2 13 10 2 22 2 C34 2 42 13 42 28 C42 50 22 74 22 74Z" fill="#5F8575" opacity=".3"/>
                        <path d="M22 74 L22 2" stroke="#1B3B2B" strokeWidth=".7" opacity=".35"/>
                        <path d="M22 25 C14 20 8 17 4 14" stroke="#1B3B2B" strokeWidth=".5" opacity=".22"/>
                        <path d="M22 38 C30 32 36 29 40 26" stroke="#1B3B2B" strokeWidth=".5" opacity=".22"/>
                      </svg>

                      {/* Zona superioara */}
                      <div className="vr-zone-top">
                        <p className="vr-intro-text">Cu bucurie vă invităm la nunta noastră</p>
                        <div>
                          <p className="vr-parents-name">{fields.parentsGroom}</p>
                          <span className="vr-parents-and">și</span>
                          <p className="vr-parents-name">{fields.parentsBride}</p>
                        </div>
                      </div>

                      {/* Banda acuarela */}
                      <div className="vr-band-wrap">
                        <svg className="vr-band-svg" viewBox="0 0 794 200" preserveAspectRatio="none">
                          <defs>
                            <filter id="wc" x="-5%" y="-5%" width="110%" height="110%">
                              <feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="4" seed="8" result="noise"/>
                              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
                              <feGaussianBlur in="displaced" stdDeviation="1.2" result="blurred"/>
                              <feComposite in="blurred" in2="SourceGraphic" operator="in"/>
                            </filter>
                          </defs>
                          <path d="M-10 28 Q60 18 160 24 Q280 32 400 20 Q520 8 640 22 Q720 30 804 18 L804 172 Q740 182 620 176 Q500 168 380 180 Q260 192 140 178 Q60 170 -10 180 Z" fill="#5F8575" filter="url(#wc)" opacity=".88"/>
                          <path d="M-10 38 Q80 26 200 34 Q340 44 460 30 Q580 16 700 32 Q760 40 804 28 L804 162 Q730 174 600 166 Q470 158 350 170 Q220 182 100 168 Q40 162 -10 170 Z" fill="#5F8575" filter="url(#wc)" opacity=".35"/>
                        </svg>
                        <div className="vr-band-names">
                          <p className="vr-name-bride">{fields.bride || 'Mireasă'}</p>
                          <span className="vr-name-amp">&amp;</span>
                          <p className="vr-name-groom">{fields.groom || 'Mire'}</p>
                        </div>
                      </div>

                      {/* Zona inferioara */}
                      <div className="vr-zone-bottom">
                        <p className="vr-invite-line">vă invită cu drag la celebrarea căsătoriei lor</p>
                        <div className="vr-sep" />
                        <p className="vr-date-main">{weddingDateFormatted || 'Ziua nunții'}</p>
                        <p className="vr-date-year">{weddingYear}</p>
                        <div className="vr-events">
                          <div className="vr-event vr-event-left">
                            <p className="vr-ev-label">Cununie</p>
                            <p className="vr-ev-name">{fields.church || 'Biserica'}</p>
                            <p className="vr-ev-time">ora {fields.churchTime}</p>
                          </div>
                          <div className="vr-event">
                            <p className="vr-ev-label">Recepție</p>
                            <p className="vr-ev-name">{fields.restaurant || 'Restaurantul'}</p>
                            <p className="vr-ev-time">ora {fields.restTime}</p>
                          </div>
                        </div>
                        <div className="vr-sep2" />
                        <p className="vr-nasi-label">Nași de cununie</p>
                        <p className="vr-nasi-name">{fields.nasi}</p>
                        <div className="vr-rsvp">
                          Confirmați prezența până pe <span>{rsvpFormatted || fields.rsvpDate}</span> &nbsp;·&nbsp; Tel: <span>{fields.rsvpTel}</span>
                        </div>
                      </div>

                      {/* Watermark */}
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
              <p className="vr-pay-note">
                Watermark dispare după plată · PDF + JPG incluse<br />
                Plată securizată prin Stripe
              </p>

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
