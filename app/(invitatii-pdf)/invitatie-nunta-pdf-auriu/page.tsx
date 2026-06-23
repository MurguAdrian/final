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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;1,400&family=Cinzel:wght@400;600&display=swap');

.au * { box-sizing: border-box; margin: 0; padding: 0; }
.au { font-family: 'EB Garamond', serif; background: #FDFAF6; color: #1A1208; min-height: 100vh; }

.au-topbar { background: #fff; border-bottom: 1px solid rgba(201,168,76,.2); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.au-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #1A1208; text-decoration: none; font-weight: 600; }
.au-topbar-logo span { color: #C9A84C; }
.au-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #C9A84C; color: #8B6914; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: #fff; transition: background .2s, color .2s; }
.au-topbar-btn:hover { background: #C9A84C; color: #1A1208; }

.au-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.au-title { text-align: center; margin-bottom: 40px; }
.au-title h1 { font-family: 'Cinzel', serif; font-size: clamp(18px, 3vw, 28px); font-weight: 400; letter-spacing: .14em; color: #1A1208; margin-bottom: 8px; }
.au-title p { font-size: 14px; color: rgba(26,18,8,.55); font-style: italic; }

.au-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.au-inv-wrap { position: sticky; top: 72px; }

/* Wrapper care mentine proportia A4 794x1123 */
.au-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.au-inv-ratio::before { content: ''; display: block; padding-top: calc(1123 / 794 * 100%); }
.au-inv-inner { position: absolute; inset: 0; }

/* Invitatie scalata sa umple wrapper-ul */
.au-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

.au-inv { width: 794px; height: 1123px; background: #FEFBF3; border: 2px solid #C9A84C; position: relative; overflow: hidden; padding: 60px 70px 100px; box-sizing: border-box; }
.au-inv::before { content: ''; position: absolute; inset: 10px; border: 1px solid rgba(201,168,76,.3); pointer-events: none; }

.au-corner { position: absolute; width: 90px; height: 90px; opacity: .55; }
.au-corner.tl { top: 20px; left: 20px; }
.au-corner.tr { top: 20px; right: 20px; transform: scaleX(-1); }
.au-corner.bl { bottom: 20px; left: 20px; transform: scaleY(-1); }
.au-corner.br { bottom: 20px; right: 20px; transform: scale(-1); }

.au-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); margin: 20px 0; opacity: .6; }
.au-divider-sm { width: 50%; height: 1px; margin: 14px auto; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); opacity: .4; }

.au-top { text-align: center; padding: 0 40px; }
.au-intro { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .25em; text-transform: uppercase; color: #8B6914; margin-bottom: 8px; }
.au-parents { font-size: 16px; color: #5C4A1E; line-height: 1.8; font-style: italic; }
.au-and { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: .2em; color: #C9A84C; text-transform: uppercase; margin: 4px 0; }
.au-names { text-align: center; padding: 8px 0; }
.au-bride, .au-groom { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; font-style: italic; color: #1A1208; line-height: 1.1; }
.au-amp { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 300; color: #C9A84C; line-height: 1; display: block; margin: 4px 0; text-align: center; }
.au-invite { text-align: center; font-size: 15px; color: #5C4A1E; line-height: 2; padding: 0 60px; font-style: italic; }
.au-invite strong { font-style: normal; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .2em; color: #8B6914; display: block; margin-bottom: 6px; }
.au-date-block { text-align: center; padding: 6px 0; }
.au-date-main { font-family: 'Cinzel', serif; font-size: 18px; color: #1A1208; letter-spacing: .12em; }
.au-date-year { font-family: 'Cinzel', serif; font-size: 32px; font-weight: 600; color: #C9A84C; display: block; letter-spacing: .08em; }
.au-events { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 6px 0; }
.au-event { text-align: center; padding: 14px 10px; border: 1px solid rgba(201,168,76,.4); border-radius: 6px; background: rgba(201,168,76,.04); }
.au-ev-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em; color: #C9A84C; text-transform: uppercase; margin-bottom: 6px; }
.au-ev-name { font-size: 14px; color: #1A1208; font-style: italic; line-height: 1.5; margin-bottom: 4px; }
.au-ev-time { font-family: 'Cinzel', serif; font-size: 12px; color: #8B6914; letter-spacing: .1em; }
.au-nasi { text-align: center; font-size: 15px; color: #5C4A1E; line-height: 1.8; font-style: italic; padding: 0 20px; }
.au-nasi strong { font-style: normal; font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em; color: #8B6914; display: block; margin-bottom: 4px; }
.au-fleuron { font-size: 20px; color: #C9A84C; opacity: .5; display: block; text-align: center; margin: 6px 0; }
.au-rsvp { text-align: center; padding: 14px 30px; background: rgba(201,168,76,.08); border-top: 1px solid rgba(201,168,76,.3); position: absolute; bottom: 0; left: 0; right: 0; font-size: 13px; color: #5C4A1E; font-style: italic; }
.au-rsvp span { color: #C9A84C; font-style: normal; font-weight: 600; }

.au-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.au-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; gap: 0; transform: rotate(-30deg); }
.au-wm-row { display: flex; gap: 0; white-space: nowrap; }
.au-wm-item { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .1em; color: #8B6914; opacity: .22; padding: 28px 30px; white-space: nowrap; user-select: none; }
.au-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(201,168,76,.18); border-top: 1px solid rgba(201,168,76,.45); padding: 8px 10px; text-align: center; font-size: 11px; color: #8B6914; font-family: 'Cinzel', serif; letter-spacing: .06em; z-index: 25; }

.au-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1A1208; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(201,168,76,.3); padding-bottom: 10px; }
.au-section { margin-bottom: 18px; }
.au-section-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #8B6914; margin-bottom: 7px; }
.au-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.au-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }

.au-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(201,168,76,.35); border-radius: 6px; background: #fff; color: #1A1208; font-family: 'EB Garamond', serif; outline: none; transition: border-color .2s; }
.au-input:focus { border-color: #C9A84C; }
.au-input::placeholder { color: rgba(26,18,8,.35); font-style: italic; }

.au-date-wrap { position: relative; display: flex; align-items: center; }
.au-date-wrap .au-input { padding-right: 40px; }
.au-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.au-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #C9A84C; }

.au-input-wrap { position: relative; }
.au-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,18,8,.3); font-family: 'Cinzel', serif; pointer-events: none; letter-spacing: .06em; }

.au-error { background: rgba(220,38,38,.08); border: 1px solid rgba(220,38,38,.3); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; font-style: italic; }

.au-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #C9A84C; color: #1A1208; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s, opacity .2s; }
.au-pay-btn:hover { background: #B8952E; }
.au-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.au-pay-note { font-size: 11px; color: rgba(26,18,8,.45); text-align: center; margin-top: 8px; font-style: italic; line-height: 1.6; }

.au-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(201,168,76,.06); border: 1px solid rgba(201,168,76,.2); border-radius: 8px; }
.au-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,18,8,.6); }
.au-gi span { font-size: 14px; }

.au-footer { border-top: 1px solid rgba(201,168,76,.2); background: #fff; padding: 28px 24px; text-align: center; }
.au-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(26,18,8,.45); margin-bottom: 14px; }
.au-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #C9A84C; color: #1A1208; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; font-weight: 600; text-decoration: none; transition: background .2s; }
.au-footer-btn:hover { background: #B8952E; }
.au-footer-copy { font-size: 11px; color: rgba(26,18,8,.3); margin-top: 16px; font-style: italic; }

.au-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.au-alert-box { background: #fff; border: 1px solid rgba(201,168,76,.3); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
.au-alert-icon { font-size: 36px; margin-bottom: 12px; }
.au-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1A1208; letter-spacing: .08em; margin-bottom: 14px; }
.au-alert-text { font-size: 13px; color: rgba(26,18,8,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.au-alert-text strong { font-style: normal; color: #1A1208; }
.au-alert-btns { display: flex; gap: 10px; }
.au-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(201,168,76,.4); border-radius: 8px; background: #fff; color: rgba(26,18,8,.5); font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; cursor: pointer; }
.au-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #C9A84C; color: #1A1208; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; cursor: pointer; }
.au-alert-cancel:hover { background: rgba(201,168,76,.08); }
.au-alert-confirm:hover { background: #B8952E; }

@media (max-width: 800px) {
  .au-layout { grid-template-columns: 1fr; gap: 32px; }
  .au-inv-wrap { position: static; }
  .au-topbar-logo { font-size: 12px; }
}
@media (max-width: 480px) {
  .au-inner { padding: 28px 16px 60px; }
}
`

export default function InvitatieNuntaAuriu() {
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
        body: JSON.stringify({ fields, template: 'invitatie-nunta-pdf-auriu' }),
      })
      const { url, error: err } = await res.json()
      if (err) { setError(err); return }
      window.location.href = url
    } catch (e) {
      setError('A apărut o eroare. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }, [fields])

  const WM_TEXTS = Array(16).fill(null).map((_, i) => (
    <div key={i} className="au-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="au-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="au">

        {showAlert && (
          <div className="au-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="au-alert-box" onClick={(e) => e.stopPropagation()}>
              <div className="au-alert-icon">⚠️</div>
              <h3 className="au-alert-title">Înainte să continui</h3>
              <p className="au-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="au-alert-btns">
                <button className="au-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="au-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="au-topbar">
          <Link href="/" className="au-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="au-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="au-inner">
          <div className="au-title">
            <h1>Invitație Nuntă — Auriu Elegant</h1>
            <p>Personalizează câmpurile din dreapta și previzualizează în timp real</p>
          </div>

          <div className="au-layout">

            <div className="au-inv-wrap">
              <div className="au-inv-ratio">
                <div className="au-inv-inner">
                  <div
                    className="au-inv-scale"
                    style={{ transform: `scale(${360 / 794})` }}
                  >
                    <div className="au-inv">
                      <svg className="au-corner tl" viewBox="0 0 90 90" fill="none">
                        <path d="M4 86 L4 4 L86 4" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                        <path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" strokeWidth=".8" fill="none" opacity=".5"/>
                        <circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/>
                        <circle cx="46" cy="4" r="2.5" fill="#C9A84C" opacity=".4"/>
                        <circle cx="4" cy="46" r="2.5" fill="#C9A84C" opacity=".4"/>
                      </svg>
                      <svg className="au-corner tr" viewBox="0 0 90 90" fill="none">
                        <path d="M4 86 L4 4 L86 4" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                        <path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" strokeWidth=".8" fill="none" opacity=".5"/>
                        <circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/>
                      </svg>
                      <svg className="au-corner bl" viewBox="0 0 90 90" fill="none">
                        <path d="M4 86 L4 4 L86 4" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                        <path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" strokeWidth=".8" fill="none" opacity=".5"/>
                        <circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/>
                      </svg>
                      <svg className="au-corner br" viewBox="0 0 90 90" fill="none">
                        <path d="M4 86 L4 4 L86 4" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                        <path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" strokeWidth=".8" fill="none" opacity=".5"/>
                        <circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/>
                      </svg>

                      <div className="au-top">
                        <p className="au-intro">Cu binecuvântarea părinților</p>
                        <p className="au-parents">{fields.parentsGroom}</p>
                        <p className="au-and">și</p>
                        <p className="au-parents">{fields.parentsBride}</p>
                      </div>
                      <div className="au-divider" />
                      <div className="au-names">
                        <p className="au-bride">{fields.bride || 'Mireasă'}</p>
                        <span className="au-amp">&amp;</span>
                        <p className="au-groom">{fields.groom || 'Mire'}</p>
                      </div>
                      <div className="au-divider-sm" />
                      <span className="au-fleuron">✦</span>
                      <div className="au-invite">
                        <strong>vă invită cu drag la nunta lor</strong>
                        Vă așteptăm alături de noi în ziua în care ne unim destinele
                      </div>
                      <div className="au-divider-sm" />
                      <div className="au-date-block">
                        <p className="au-date-main">{weddingDateFormatted || 'Ziua nunții'}</p>
                        <span className="au-date-year">{weddingYear}</span>
                      </div>
                      <div className="au-divider" />
                      <div className="au-events">
                        <div className="au-event">
                          <p className="au-ev-label">Cununie</p>
                          <p className="au-ev-name">{fields.church || 'Biserica'}</p>
                          <p className="au-ev-time">ora {fields.churchTime}</p>
                        </div>
                        <div className="au-event">
                          <p className="au-ev-label">Recepție</p>
                          <p className="au-ev-name">{fields.restaurant || 'Restaurantul'}</p>
                          <p className="au-ev-time">ora {fields.restTime}</p>
                        </div>
                      </div>
                      <div className="au-divider-sm" />
                      <div className="au-nasi">
                        <strong>Nași de cununie</strong>
                        {fields.nasi}
                      </div>
                      <div className="au-rsvp">
                        Confirmați prezența până pe <span>{rsvpFormatted || fields.rsvpDate}</span> &nbsp;·&nbsp; Tel: <span>{fields.rsvpTel}</span>
                      </div>
                      <div className="au-wm">
                        <div className="au-wm-grid">{WM_TEXTS}</div>
                        <div className="au-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="au-form">
              <h2>Personalizează invitația</h2>

              <div className="au-section">
                <p className="au-section-label">Miri</p>
                <div className="au-grid2">
                  <input className="au-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="au-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Părinți mire</p>
                <div className="au-grid1">
                  <input className="au-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Părinți mireasă</p>
                <div className="au-grid1">
                  <input className="au-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Nași de cununie</p>
                <div className="au-grid1">
                  <input className="au-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Data nunții</p>
                <div className="au-grid1">
                  <div className="au-date-wrap">
                    <input className="au-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="au-cal-icon">📅</span>
                    <input className="au-date-native" type="date" value={fields.weddingDate} onChange={(e) => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Cununie religioasă</p>
                <div className="au-grid2">
                  <input className="au-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="au-input-wrap">
                    <input className="au-input" type="text" placeholder="13:00" maxLength={5} value={fields.churchTime} onChange={(e) => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="au-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Recepție</p>
                <div className="au-grid2">
                  <input className="au-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="au-input-wrap">
                    <input className="au-input" type="text" placeholder="19:00" maxLength={5} value={fields.restTime} onChange={(e) => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="au-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">RSVP</p>
                <div className="au-grid2">
                  <div className="au-date-wrap">
                    <input className="au-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="au-cal-icon">📅</span>
                    <input className="au-date-native" type="date" value={fields.rsvpDate} onChange={(e) => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="au-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="au-error">⚠️ {error}</div>}

              <button className="au-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="au-pay-note">
                Watermark dispare după plată · PDF + JPG incluse<br />
                Plată securizată prin Stripe
              </p>

              <div className="au-guarantee">
                <div className="au-gi"><span>✓</span> Download instant</div>
                <div className="au-gi"><span>✓</span> PDF + JPG</div>
                <div className="au-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="au-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="au-footer">
          <p className="au-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="au-footer-btn">← Vezi toate modelele</Link>
          <p className="au-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>

      </div>
    </>
  )
}
