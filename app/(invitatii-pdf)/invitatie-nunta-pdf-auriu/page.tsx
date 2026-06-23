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
.au-inv { width: 100%; max-width: 360px; background: #FEFBF3; border: 1px solid #C9A84C; position: relative; overflow: hidden; padding: 28px 22px 32px; box-shadow: 0 0 0 6px #FEFBF3, 0 0 0 7px #C9A84C; margin: 8px auto; }

.au-corner { position: absolute; width: 56px; height: 56px; opacity: .55; }
.au-corner.tl { top: 14px; left: 14px; }
.au-corner.tr { top: 14px; right: 14px; transform: scaleX(-1); }
.au-corner.bl { bottom: 14px; left: 14px; transform: scaleY(-1); }
.au-corner.br { bottom: 14px; right: 14px; transform: scale(-1); }

.au-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); margin: 12px 0; opacity: .6; }
.au-divider-sm { width: 60%; height: 1px; margin: 8px auto; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); opacity: .4; }

.au-top { text-align: center; padding: 0 16px; }
.au-intro { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: .22em; text-transform: uppercase; color: #8B6914; margin-bottom: 5px; }
.au-parents { font-size: 11px; color: #5C4A1E; line-height: 1.7; font-style: italic; }
.au-and { font-family: 'Cormorant Garamond', serif; font-size: 10px; letter-spacing: .2em; color: #C9A84C; text-transform: uppercase; margin: 2px 0; }
.au-names { text-align: center; padding: 4px 0; }
.au-bride, .au-groom { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; font-style: italic; color: #1A1208; line-height: 1.1; }
.au-amp { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; color: #C9A84C; line-height: 1; display: block; margin: 2px 0; }
.au-invite { text-align: center; font-size: 11px; color: #5C4A1E; line-height: 1.8; padding: 0 14px; font-style: italic; }
.au-invite strong { font-style: normal; font-family: 'Cinzel', serif; font-size: 7.5px; letter-spacing: .16em; color: #8B6914; display: block; margin-bottom: 4px; }
.au-date-block { text-align: center; padding: 4px 0; }
.au-date-main { font-family: 'Cinzel', serif; font-size: 12px; color: #1A1208; letter-spacing: .1em; }
.au-date-year { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 600; color: #C9A84C; display: block; letter-spacing: .08em; }
.au-events { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 4px 0; }
.au-event { text-align: center; padding: 7px 5px; border: 1px solid rgba(201,168,76,.35); border-radius: 4px; background: rgba(201,168,76,.04); }
.au-ev-label { font-family: 'Cinzel', serif; font-size: 7px; letter-spacing: .16em; color: #C9A84C; text-transform: uppercase; margin-bottom: 3px; }
.au-ev-name { font-size: 9.5px; color: #1A1208; font-style: italic; line-height: 1.4; margin-bottom: 2px; }
.au-ev-time { font-family: 'Cinzel', serif; font-size: 8px; color: #8B6914; letter-spacing: .08em; }
.au-nasi { text-align: center; font-size: 10px; color: #5C4A1E; line-height: 1.7; font-style: italic; padding: 0 10px; }
.au-nasi strong { font-style: normal; font-family: 'Cinzel', serif; font-size: 7px; letter-spacing: .16em; color: #8B6914; display: block; margin-bottom: 3px; }
.au-fleuron { font-size: 14px; color: #C9A84C; opacity: .5; display: block; text-align: center; margin: 4px 0; }
.au-rsvp { text-align: center; padding: 6px 14px; background: rgba(201,168,76,.08); border-top: 1px solid rgba(201,168,76,.3); margin: 8px -22px -32px; font-size: 9px; color: #5C4A1E; font-style: italic; }
.au-rsvp span { color: #C9A84C; font-style: normal; font-weight: 600; }

.au-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.au-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; gap: 0; transform: rotate(-30deg); }
.au-wm-row { display: flex; gap: 0; white-space: nowrap; }
.au-wm-item { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .1em; color: #8B6914; opacity: .22; padding: 18px 20px; white-space: nowrap; user-select: none; }
.au-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(201,168,76,.18); border-top: 1px solid rgba(201,168,76,.45); padding: 5px 10px; text-align: center; font-size: 9px; color: #8B6914; font-family: 'Cinzel', serif; letter-spacing: .06em; z-index: 25; }

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

  const WM_TEXTS = Array(12).fill(null).map((_, i) => (
    <div key={i} className="au-wm-row">
      {Array(6).fill(null).map((_, j) => (
        <span key={j} className="au-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="au">

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
              <div className="au-inv">
                <svg className="au-corner tl" viewBox="0 0 56 56" fill="none">
                  <path d="M2 54 L2 2 L54 2" stroke="#C9A84C" strokeWidth="1" fill="none"/>
                  <path d="M2 54 Q8 40 2 28 Q8 16 14 8 Q20 2 28 2" stroke="#C9A84C" strokeWidth=".5" fill="none" opacity=".5"/>
                  <circle cx="2" cy="2" r="2.5" fill="#C9A84C" opacity=".7"/>
                  <circle cx="28" cy="2" r="1.5" fill="#C9A84C" opacity=".4"/>
                  <circle cx="2" cy="28" r="1.5" fill="#C9A84C" opacity=".4"/>
                </svg>
                <svg className="au-corner tr" viewBox="0 0 56 56" fill="none">
                  <path d="M2 54 L2 2 L54 2" stroke="#C9A84C" strokeWidth="1" fill="none"/>
                  <path d="M2 54 Q8 40 2 28 Q8 16 14 8 Q20 2 28 2" stroke="#C9A84C" strokeWidth=".5" fill="none" opacity=".5"/>
                  <circle cx="2" cy="2" r="2.5" fill="#C9A84C" opacity=".7"/>
                </svg>
                <svg className="au-corner bl" viewBox="0 0 56 56" fill="none">
                  <path d="M2 54 L2 2 L54 2" stroke="#C9A84C" strokeWidth="1" fill="none"/>
                  <path d="M2 54 Q8 40 2 28 Q8 16 14 8 Q20 2 28 2" stroke="#C9A84C" strokeWidth=".5" fill="none" opacity=".5"/>
                  <circle cx="2" cy="2" r="2.5" fill="#C9A84C" opacity=".7"/>
                </svg>
                <svg className="au-corner br" viewBox="0 0 56 56" fill="none">
                  <path d="M2 54 L2 2 L54 2" stroke="#C9A84C" strokeWidth="1" fill="none"/>
                  <path d="M2 54 Q8 40 2 28 Q8 16 14 8 Q20 2 28 2" stroke="#C9A84C" strokeWidth=".5" fill="none" opacity=".5"/>
                  <circle cx="2" cy="2" r="2.5" fill="#C9A84C" opacity=".7"/>
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
                  Vă așteptăm alături de noi în ziua<br />în care ne unim destinele
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
                  Confirmați prezența până pe <span>{rsvpFormatted || fields.rsvpDate}</span><br />
                  Tel: <span>{fields.rsvpTel}</span>
                </div>
                <div className="au-wm">
                  <div className="au-wm-grid">{WM_TEXTS}</div>
                  <div className="au-wm-notice">Watermark dispare după plata de 30 lei</div>
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
                    <input
                      className="au-input"
                      type="text"
                      placeholder="ZZ.LL.AAAA"
                      readOnly
                      value={formatDisplayDate(fields.weddingDate)}
                    />
                    <span className="au-cal-icon">📅</span>
                    <input
                      className="au-date-native"
                      type="date"
                      value={fields.weddingDate}
                      onChange={(e) => setFields(f => ({ ...f, weddingDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Cununie religioasă</p>
                <div className="au-grid2">
                  <input className="au-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="au-input-wrap">
                    <input
                      className="au-input"
                      type="text"
                      placeholder="13:00"
                      maxLength={5}
                      value={fields.churchTime}
                      onChange={(e) => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))}
                    />
                    <span className="au-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">Recepție</p>
                <div className="au-grid2">
                  <input className="au-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="au-input-wrap">
                    <input
                      className="au-input"
                      type="text"
                      placeholder="19:00"
                      maxLength={5}
                      value={fields.restTime}
                      onChange={(e) => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))}
                    />
                    <span className="au-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>

              <div className="au-section">
                <p className="au-section-label">RSVP</p>
                <div className="au-grid2">
                  <div className="au-date-wrap">
                    <input
                      className="au-input"
                      type="text"
                      placeholder="ZZ.LL.AAAA"
                      readOnly
                      value={formatDisplayDate(fields.rsvpDate)}
                    />
                    <span className="au-cal-icon">📅</span>
                    <input
                      className="au-date-native"
                      type="date"
                      value={fields.rsvpDate}
                      onChange={(e) => setFields(f => ({ ...f, rsvpDate: e.target.value }))}
                    />
                  </div>
                  <input className="au-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="au-error">⚠️ {error}</div>}

              <button className="au-pay-btn" onClick={handlePay} disabled={loading}>
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