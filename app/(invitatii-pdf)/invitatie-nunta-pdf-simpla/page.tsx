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
  parentsGroom: 'Ana și Gheorghe Ionescu', parentsBride: 'Elena și Constantin Vasile',
  nasi: 'Mihaela și Florin Popescu',
  weddingDate: '2024-09-14', church: 'Biserica Sfântul Gheorghe — Onești', churchTime: '14:00',
  restaurant: 'Restaurant Vatra Botoșanei', restTime: '18:00',
  rsvpDate: '2024-09-01', rsvpTel: '0700 000 000',
}

// Sigiliu si panglica refolosite in preview
const SealSimpla = () => (
  <>
    {/* Panglica */}
    <div style={{ position:'absolute', right:'112px', bottom:'180px', zIndex:4, width:'4px', height:'120px', background:'linear-gradient(180deg,#1a3a8a 0%,#2a5fa8 50%,#1a3a8a 100%)', borderRadius:'2px', transform:'rotate(8deg)' }} />
    {/* Sigiliu */}
    <svg style={{ position:'absolute', right:'72px', bottom:'80px', zIndex:5, width:'100px', height:'100px' }} viewBox="0 0 100 100" fill="none">
      <ellipse cx="52" cy="54" rx="42" ry="42" fill="#0a1a4a" opacity=".15"/>
      <circle cx="50" cy="50" r="44" fill="#1a3a8a"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#4a6ac8" strokeWidth="1.5" opacity=".6"/>
      <circle cx="50" cy="50" r="35" fill="none" stroke="#3a5ab8" strokeWidth="1" opacity=".4"/>
      <path d="M50 28 C38 36 34 44 50 68 C66 44 62 36 50 28Z" fill="#8ab0e8" opacity=".75"/>
      <path d="M50 28 L50 68" stroke="#2a4a98" strokeWidth="1.2" opacity=".5"/>
      <path d="M50 38 C43 35 38 33 34 32" stroke="#8ab0e8" strokeWidth=".8" opacity=".4"/>
      <path d="M50 48 C57 45 62 43 66 42" stroke="#8ab0e8" strokeWidth=".8" opacity=".4"/>
      <ellipse cx="38" cy="34" rx="8" ry="5" fill="#a8c8f0" opacity=".2" transform="rotate(-30 38 34)"/>
    </svg>
  </>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Raleway:wght@300;400;500;600&family=Cinzel:wght@400;600&display=swap');

.sp * { box-sizing: border-box; margin: 0; padding: 0; }
.sp { font-family: 'Raleway', sans-serif; background: #edeae4; color: #1a3a6a; min-height: 100vh; }

.sp-topbar { background: #fff; border-bottom: 1px solid rgba(26,58,106,.12); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.sp-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #1a3a6a; text-decoration: none; font-weight: 600; }
.sp-topbar-logo span { color: #2a5fa8; }
.sp-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #2a5fa8; color: #2a5fa8; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: #fff; transition: background .2s, color .2s; }
.sp-topbar-btn:hover { background: #2a5fa8; color: #fff; }

.sp-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.sp-title { text-align: center; margin-bottom: 40px; }
.sp-title h1 { font-family: 'Playfair Display', serif; font-size: clamp(20px, 3vw, 30px); font-weight: 400; font-style: italic; color: #1a3a6a; margin-bottom: 8px; }
.sp-title p { font-size: 11px; color: rgba(26,58,106,.5); letter-spacing: .1em; text-transform: uppercase; }

.sp-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.sp-inv-wrap { position: sticky; top: 72px; }
.sp-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.sp-inv-ratio::before { content: ''; display: block; padding-top: calc(1123 / 794 * 100%); }
.sp-inv-inner { position: absolute; inset: 0; }
.sp-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.sp-inv {
  width: 794px; height: 1123px;
  background: #f5f0e8;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 80px 100px 100px;
}

/* Textura hartie */
.sp-paper { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.sp-content { position: relative; z-index: 3; text-align: center; width: 100%; }

.sp-inv-label { font-size: 15px; font-weight: 500; letter-spacing: .32em; text-transform: uppercase; color: #2a5fa8; display: block; line-height: 1.6; }
.sp-title-block { margin-bottom: 32px; }
.sp-names { font-family: 'Playfair Display', serif; font-size: 96px; font-weight: 400; font-style: italic; color: #1a3a6a; line-height: 1; display: block; margin-bottom: 12px; }
.sp-amp { color: #2a5fa8; }
.sp-tagline { font-size: 22px; font-weight: 300; font-style: italic; color: #3a5a9a; letter-spacing: .04em; margin-bottom: 36px; }
.sp-date { font-size: 26px; font-weight: 400; color: #1a3a6a; letter-spacing: .04em; margin-bottom: 8px; }
.sp-event-block { margin-bottom: 20px; }
.sp-event-name { font-family: 'Playfair Display', serif; font-size: 28px; font-style: italic; color: #1a3a6a; line-height: 1.4; display: block; }
.sp-event-time { font-size: 20px; font-weight: 300; color: #3a5a9a; display: block; margin-top: 3px; }
.sp-hsep { width: 48px; height: 1px; background: #2a5fa8; opacity: .3; margin: 24px auto; }
.sp-info-label { font-size: 14px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase; color: #2a5fa8; margin-bottom: 6px; display: block; }
.sp-info-val { font-family: 'Playfair Display', serif; font-size: 26px; font-style: italic; color: #1a3a6a; line-height: 1.5; margin-bottom: 18px; display: block; }
.sp-rsvp { font-size: 18px; font-weight: 300; color: #3a5a9a; font-style: italic; line-height: 2; margin-top: 20px; }
.sp-rsvp strong { font-style: normal; color: #1a3a6a; font-weight: 500; }

/* Watermark */
.sp-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.sp-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; gap: 0; transform: rotate(-30deg); }
.sp-wm-row { display: flex; gap: 0; white-space: nowrap; }
.sp-wm-item { font-size: 34px; letter-spacing: .1em; color: #e70510; opacity: .08; padding: 28px 30px; white-space: nowrap; user-select: none; }
.sp-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(42,95,168,.1); border-top: 1px solid rgba(42,95,168,.2); padding: 8px 10px; text-align: center; font-size: 11px; color: #2a5fa8; letter-spacing: .06em; z-index: 25; }

/* FORM */
.sp-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1a3a6a; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(42,95,168,.18); padding-bottom: 10px; }
.sp-section { margin-bottom: 18px; }
.sp-section-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #2a5fa8; margin-bottom: 7px; }
.sp-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.sp-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.sp-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(42,95,168,.18); border-radius: 6px; background: #fff; color: #1a3a6a; font-family: 'Raleway', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.sp-input:focus { border-color: #2a5fa8; }
.sp-input::placeholder { color: rgba(26,58,106,.3); font-style: italic; }
.sp-date-wrap { position: relative; display: flex; align-items: center; }
.sp-date-wrap .sp-input { padding-right: 40px; }
.sp-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.sp-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #2a5fa8; }
.sp-input-wrap { position: relative; }
.sp-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,58,106,.3); pointer-events: none; letter-spacing: .06em; }
.sp-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.sp-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #2a5fa8; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s, opacity .2s; }
.sp-pay-btn:hover { background: #1a4a88; }
.sp-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.sp-pay-note { font-size: 11px; color: rgba(26,58,106,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.sp-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(42,95,168,.05); border: 1px solid rgba(42,95,168,.12); border-radius: 8px; }
.sp-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,58,106,.6); }
.sp-gi span { font-size: 14px; }

.sp-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.sp-alert-box { background: #fff; border: 1px solid rgba(42,95,168,.2); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.18); }
.sp-alert-icon { font-size: 36px; margin-bottom: 12px; }
.sp-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1a3a6a; letter-spacing: .08em; margin-bottom: 14px; }
.sp-alert-text { font-size: 13px; color: rgba(26,58,106,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.sp-alert-text strong { font-style: normal; color: #1a3a6a; }
.sp-alert-btns { display: flex; gap: 10px; }
.sp-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(42,95,168,.25); border-radius: 8px; background: #fff; color: rgba(26,58,106,.5); font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; cursor: pointer; }
.sp-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #2a5fa8; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; cursor: pointer; }
.sp-alert-cancel:hover { background: rgba(42,95,168,.05); }
.sp-alert-confirm:hover { background: #1a4a88; }

.sp-footer { border-top: 1px solid rgba(42,95,168,.12); background: #fff; padding: 28px 24px; text-align: center; }
.sp-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(26,58,106,.45); margin-bottom: 14px; }
.sp-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #2a5fa8; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; font-weight: 600; text-decoration: none; transition: background .2s; }
.sp-footer-btn:hover { background: #1a4a88; }
.sp-footer-copy { font-size: 11px; color: rgba(26,58,106,.3); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .sp-layout { grid-template-columns: 1fr; gap: 32px; } .sp-inv-wrap { position: static; } }
@media (max-width: 480px) { .sp-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieNuntaPdfSimpla() {
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
        body: JSON.stringify({ fields, template: 'invitatie-nunta-pdf-simpla' }),
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
    <div key={i} className="sp-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="sp-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sp">

        {showAlert && (
          <div className="sp-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="sp-alert-box" onClick={e => e.stopPropagation()}>
              <div className="sp-alert-icon">⚠️</div>
              <h3 className="sp-alert-title">Înainte să continui</h3>
              <p className="sp-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="sp-alert-btns">
                <button className="sp-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="sp-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="sp-topbar">
          <Link href="/" className="sp-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="sp-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="sp-inner">
          <div className="sp-title">
            <h1>Invitație Nuntă — Simplă Elegantă</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="sp-layout">
            <div className="sp-inv-wrap">
              <div className="sp-inv-ratio">
                <div className="sp-inv-inner">
                  <div className="sp-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="sp-inv">

                      {/* Textura hartie SVG */}
                      <svg className="sp-paper" viewBox="0 0 794 1123" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="sh-top-p" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#8a7a60"/>
                            <stop offset="1" stopColor="transparent"/>
                          </linearGradient>
                          <linearGradient id="sh-bot-p" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="transparent"/>
                            <stop offset="1" stopColor="#8a7a60"/>
                          </linearGradient>
                        </defs>
                        <rect width="794" height="1123" fill="#f5f0e8"/>
                        <rect width="794" height="1123" fill="none" stroke="#c8b89a" strokeWidth="1" opacity=".25"/>
                        <rect width="794" height="60" fill="url(#sh-top-p)" opacity=".1"/>
                        <rect y="1063" width="794" height="60" fill="url(#sh-bot-p)" opacity=".1"/>
                        {/* Margini neregulate */}
                        <path d="M0 0 Q14 10 2 24 Q10 40 0 58 Q12 76 0 94 Q8 112 0 130 Q14 148 0 166 L0 0Z" fill="#e0d8c8" opacity=".5"/>
                        <path d="M794 0 Q780 14 792 30 Q784 48 794 64 Q780 82 794 98 Q786 116 794 134 Q780 152 794 168 L794 0Z" fill="#e0d8c8" opacity=".5"/>
                        <path d="M0 1123 Q14 1113 0 1099 Q10 1085 0 1071 Q12 1057 0 1043 L0 1123Z" fill="#e0d8c8" opacity=".5"/>
                        <path d="M794 1123 Q780 1110 794 1096 Q784 1082 794 1068 Q780 1054 794 1040 L794 1123Z" fill="#e0d8c8" opacity=".5"/>
                      </svg>

                      <SealSimpla />

                      <div className="sp-content">
                        <div className="sp-title-block">
                          <span className="sp-inv-label">INVITAȚIE</span>
                          <span className="sp-inv-label">DE NUNTĂ</span>
                        </div>

                        <span className="sp-names">
                          {fields.groom || 'Mire'} <span className="sp-amp">&amp;</span> {fields.bride || 'Mireasă'}
                        </span>
                        <p className="sp-tagline">vă invită cu dragoste la nuntă</p>

                        <p className="sp-date">{weddingDateFormatted || 'Ziua nunții'}</p>

                        <div className="sp-event-block">
                          <span className="sp-event-name">{fields.church || 'Biserica'}</span>
                          <span className="sp-event-time">Ora {fields.churchTime}</span>
                        </div>
                        <div className="sp-event-block">
                          <span className="sp-event-name">{fields.restaurant || 'Restaurantul'}</span>
                          <span className="sp-event-time">Ora {fields.restTime}</span>
                        </div>

                        <div className="sp-hsep" />

                        <span className="sp-info-label">Părinții Miresei</span>
                        <span className="sp-info-val">{fields.parentsBride}</span>

                        <span className="sp-info-label">Părinții Mirelui</span>
                        <span className="sp-info-val">{fields.parentsGroom}</span>

                        <span className="sp-info-label">Nași</span>
                        <span className="sp-info-val">{fields.nasi}</span>

                        <p className="sp-rsvp">
                          Confirmați prezența până pe <strong>{rsvpFormatted || fields.rsvpDate}</strong><br />
                          Tel: <strong>{fields.rsvpTel}</strong>
                        </p>
                      </div>

                      <div className="sp-wm">
                        <div className="sp-wm-grid">{WM_TEXTS}</div>
                        <div className="sp-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sp-form">
              <h2>Personalizează invitația</h2>

              <div className="sp-section">
                <p className="sp-section-label">Miri</p>
                <div className="sp-grid2">
                  <input className="sp-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="sp-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="sp-section">
                <p className="sp-section-label">Părinți mire</p>
                <div className="sp-grid1">
                  <input className="sp-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="sp-section">
                <p className="sp-section-label">Părinți mireasă</p>
                <div className="sp-grid1">
                  <input className="sp-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="sp-section">
                <p className="sp-section-label">Nași de cununie</p>
                <div className="sp-grid1">
                  <input className="sp-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="sp-section">
                <p className="sp-section-label">Data nunții</p>
                <div className="sp-grid1">
                  <div className="sp-date-wrap">
                    <input className="sp-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="sp-cal-icon">📅</span>
                    <input className="sp-date-native" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="sp-section">
                <p className="sp-section-label">Cununie religioasă</p>
                <div className="sp-grid2">
                  <input className="sp-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="sp-input-wrap">
                    <input className="sp-input" type="text" placeholder="14:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="sp-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="sp-section">
                <p className="sp-section-label">Recepție</p>
                <div className="sp-grid2">
                  <input className="sp-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="sp-input-wrap">
                    <input className="sp-input" type="text" placeholder="18:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="sp-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="sp-section">
                <p className="sp-section-label">RSVP</p>
                <div className="sp-grid2">
                  <div className="sp-date-wrap">
                    <input className="sp-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="sp-cal-icon">📅</span>
                    <input className="sp-date-native" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="sp-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="sp-error">⚠️ {error}</div>}

              <button className="sp-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="sp-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>

              <div className="sp-guarantee">
                <div className="sp-gi"><span>✓</span> Download instant</div>
                <div className="sp-gi"><span>✓</span> PDF + JPG</div>
                <div className="sp-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="sp-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="sp-footer">
          <p className="sp-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="sp-footer-btn">← Vezi toate modelele</Link>
          <p className="sp-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
