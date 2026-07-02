'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const MONTHS_UP = ['IANUARIE','FEBRUARIE','MARTIE','APRILIE','MAI','IUNIE','IULIE','AUGUST','SEPTEMBRIE','OCTOMBRIE','NOIEMBRIE','DECEMBRIE']

function formatDateUp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${d.getDate()} ${MONTHS_UP[d.getMonth()]} ${d.getFullYear()}`
}
function formatRsvp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${d.getDate()} ${MONTHS_UP[d.getMonth()]} ${d.getFullYear()}`
}
function formatDisplayDate(val: string) {
  if (!val) return ''
  const [y, m, d] = val.split('-')
  return `${d}.${m}.${y}`
}
function getInitials(groom: string, bride: string) {
  return [
    (groom || 'M').trim().charAt(0).toUpperCase(),
    (bride || 'S').trim().charAt(0).toUpperCase(),
  ]
}

interface Fields {
  bride: string; groom: string; parentsGroom: string; parentsBride: string
  nasi: string; weddingDate: string; church: string; churchTime: string
  restaurant: string; restTime: string; rsvpDate: string; rsvpTel: string
}

const DEFAULTS: Fields = {
  bride: 'Ștefan', groom: 'Miruna',
  parentsGroom: 'Ana și Gheorghe Ionescu', parentsBride: 'Elena și Constantin Vasiliu',
  nasi: 'Mihaela și Florin Popescu',
  weddingDate: '2024-09-14', church: 'Cununie-generatii.trust', churchTime: '14:00',
  restaurant: 'Restaurant Forest View', restTime: '18:00',
  rsvpDate: '2024-09-01', rsvpTel: '0700 000 000',
}

// ── SVG Fundal forestier (identic cu buildHTML) ───────────────────────────────
const ForestBg = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="fp-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a3020"/>
        <stop offset="25%" stopColor="#6b4a2a"/>
        <stop offset="50%" stopColor="#8a6035"/>
        <stop offset="70%" stopColor="#5a3a18"/>
        <stop offset="100%" stopColor="#2a1808"/>
      </linearGradient>
      <linearGradient id="fp-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1005"/>
        <stop offset="100%" stopColor="#0a0803"/>
      </linearGradient>
      <linearGradient id="fp-top-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050302" stopOpacity=".7"/>
        <stop offset="100%" stopColor="#050302" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="fp-bot-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050302" stopOpacity="0"/>
        <stop offset="100%" stopColor="#050302" stopOpacity=".8"/>
      </linearGradient>
      <filter id="fp-fog"><feGaussianBlur stdDeviation="12"/></filter>
    </defs>
    <rect width="794" height="1123" fill="url(#fp-sky)"/>
    <ellipse cx="397" cy="500" rx="500" ry="200" fill="#a08050" opacity=".08" filter="url(#fp-fog)"/>
    <path d="M0 680 Q100 620 200 640 Q300 660 400 620 Q500 580 600 610 Q700 640 794 600 L794 780 L0 780Z" fill="#3a2510" opacity=".7"/>
    <path d="M0 700 Q150 650 280 670 Q400 690 520 650 Q640 610 794 640 L794 800 L0 800Z" fill="#2a1a08" opacity=".8"/>
    {/* Molizi stanga */}
    <path d="M60 1123 L60 400 L20 500 L60 480 L15 560 L60 540 L10 630 L60 600 L5 700 L60 670 L0 760 L60 730 L0 830 L60 800 L10 900 L60 870 L60 1123Z" fill="#0a0a05"/>
    <path d="M60 400 L100 500 L60 480 L105 560 L60 540 L110 630 L60 600 L115 700 L60 670 L120 760 L60 730 L120 830 L60 800 L110 900 L60 870 L60 400Z" fill="#0d0d06"/>
    <path d="M-20 1123 L-20 320 L-65 430 L-20 405 L-75 510 L-20 480 L-80 590 L-20 560 L-85 680 L-20 645 L-85 770 L-20 740 L-80 860 L-20 830 L-20 1123Z" fill="#080805"/>
    <path d="M-20 320 L25 430 L-20 405 L30 510 L-20 480 L35 590 L-20 560 L40 680 L-20 645 L40 770 L-20 740 L35 860 L-20 830 L-20 320Z" fill="#0c0c07"/>
    <path d="M140 1123 L140 500 L105 585 L140 565 L100 645 L140 620 L95 705 L140 680 L90 775 L140 745 L88 845 L140 815 L95 915 L140 885 L140 1123Z" fill="#0a0a06"/>
    <path d="M140 500 L175 585 L140 565 L180 645 L140 620 L185 705 L140 680 L190 775 L140 745 L192 845 L140 815 L185 915 L140 885 L140 500Z" fill="#0e0e07"/>
    {/* Molizi dreapta */}
    <path d="M734 1123 L734 380 L694 480 L734 460 L689 545 L734 520 L684 615 L734 585 L679 685 L734 655 L674 755 L734 725 L679 835 L734 805 L689 905 L734 875 L734 1123Z" fill="#080805"/>
    <path d="M734 380 L774 480 L734 460 L779 545 L734 520 L784 615 L734 585 L789 685 L734 655 L794 755 L734 725 L794 835 L734 805 L784 905 L734 875 L734 380Z" fill="#0d0d06"/>
    <path d="M800 1123 L800 300 L755 410 L800 385 L750 500 L800 470 L745 590 L800 555 L740 675 L800 645 L735 760 L800 730 L740 855 L800 825 L800 1123Z" fill="#060603"/>
    <path d="M800 300 L845 410 L800 385 L850 500 L800 470 L855 590 L800 555 L860 675 L800 645 L865 760 L800 730 L860 855 L800 825 L800 300Z" fill="#0a0a05"/>
    <path d="M650 1123 L650 480 L615 565 L650 545 L610 625 L650 600 L605 690 L650 660 L600 755 L650 725 L596 820 L650 790 L605 890 L650 860 L650 1123Z" fill="#080806"/>
    <path d="M650 480 L685 565 L650 545 L690 625 L650 600 L695 690 L650 660 L700 755 L650 725 L704 820 L650 790 L695 890 L650 860 L650 480Z" fill="#0c0c07"/>
    {/* Sol */}
    <rect y="880" width="794" height="243" fill="url(#fp-ground)"/>
    <path d="M0 900 Q50 890 80 900 Q120 910 150 900 Q200 890 230 900 L230 1123 L0 1123Z" fill="#0c0803"/>
    <path d="M150 910 Q200 900 250 910 Q300 920 350 908 Q400 896 450 910 L450 1123 L150 1123Z" fill="#0a0702"/>
    <path d="M600 910 Q650 900 700 910 Q750 920 794 908 L794 1123 L600 1123Z" fill="#0a0702"/>
    {/* Gradient sus/jos */}
    <rect width="794" height="300" fill="url(#fp-top-dark)"/>
    <rect y="700" width="794" height="423" fill="url(#fp-bot-dark)"/>
  </svg>
)

const MonogramPoza = ({ init1, init2 }: { init1: string; init2: string }) => (
  <svg viewBox="0 0 110 110" fill="none" style={{ width:'110px', height:'110px' }}>
    <rect x="20" y="20" width="70" height="70" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" transform="rotate(45 55 55)"/>
    <rect x="28" y="28" width="54" height="54" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth=".8" transform="rotate(45 55 55)"/>
    <polygon points="55,4 59,10 55,16 51,10" fill="rgba(255,255,255,.7)"/>
    <polygon points="55,94 59,100 55,106 51,100" fill="rgba(255,255,255,.7)"/>
    <polygon points="4,55 10,51 16,55 10,59" fill="rgba(255,255,255,.7)"/>
    <polygon points="94,55 100,51 106,55 100,59" fill="rgba(255,255,255,.7)"/>
    <text x="55" y="48" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="26" fontStyle="italic" fill="white" opacity=".95">{init1}</text>
    <text x="55" y="76" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="26" fontStyle="italic" fill="white" opacity=".95">{init2}</text>
  </svg>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:wght@300;400;500;600&family=Cinzel:wght@400;600&display=swap');

.pz * { box-sizing: border-box; margin: 0; padding: 0; }
.pz { font-family: 'Raleway', sans-serif; background: #1a1208; color: #fff; min-height: 100vh; }

.pz-topbar { background: #1a1208; border-bottom: 1px solid rgba(255,255,255,.1); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.pz-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #fff; text-decoration: none; font-weight: 600; }
.pz-topbar-logo span { color: #c09050; }
.pz-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(255,255,255,.3); color: rgba(255,255,255,.8); font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: transparent; transition: background .2s, color .2s; }
.pz-topbar-btn:hover { background: rgba(255,255,255,.1); color: #fff; }

.pz-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.pz-title { text-align: center; margin-bottom: 40px; }
.pz-title h1 { font-family: 'Playfair Display', serif; font-size: clamp(20px,3vw,30px); font-weight: 400; font-style: italic; color: #fff; margin-bottom: 8px; }
.pz-title p { font-size: 11px; color: rgba(255,255,255,.4); letter-spacing: .1em; text-transform: uppercase; }

.pz-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.pz-inv-wrap { position: sticky; top: 72px; }
.pz-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.pz-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.pz-inv-inner { position: absolute; inset: 0; }
.pz-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.pz-inv {
  width: 794px; height: 1123px;
  position: relative; overflow: hidden;
}
.pz-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(180deg, rgba(15,10,5,.45) 0%, rgba(20,13,6,.35) 30%, rgba(25,15,5,.5) 70%, rgba(10,6,2,.7) 100%);
}
.pz-vignette {
  position: absolute; inset: 0; z-index: 3;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(5,3,1,.65) 100%);
}
.pz-content {
  position: absolute; inset: 0; z-index: 4;
  display: flex; flex-direction: column;
  align-items: center; justify-content: space-between;
  padding: 60px 80px 56px;
  color: #fff; text-align: center;
}
.pz-mono-sub { font-size: 11px; font-weight: 400; letter-spacing: .32em; text-transform: uppercase; color: rgba(255,255,255,.65); margin-bottom: 6px; }
.pz-middle { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.pz-names { font-family: 'Playfair Display', serif; font-size: 96px; font-weight: 400; font-style: italic; color: #fff; line-height: 1; display: block; text-shadow: 0 2px 20px rgba(0,0,0,.4); }
.pz-amp { font-family: 'Playfair Display', serif; font-size: 72px; font-weight: 300; font-style: italic; color: rgba(255,255,255,.85); }
.pz-sep { width: 100%; height: 1px; background: rgba(255,255,255,.3); margin-bottom: 24px; }
.pz-parents { font-size: 17px; font-weight: 400; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.9); line-height: 1.7; margin-bottom: 20px; }
.pz-date { font-size: 26px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #fff; margin-bottom: 18px; }
.pz-sep2 { width: 100%; height: 1px; background: rgba(255,255,255,.3); margin-bottom: 18px; }
.pz-rsvp { font-size: 15px; font-weight: 300; letter-spacing: .1em; color: rgba(255,255,255,.6); font-style: italic; }

/* Watermark */
.pz-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.pz-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.pz-wm-row { display: flex; white-space: nowrap; }
.pz-wm-item { font-size: 34px; letter-spacing: .1em; color: #f31111; opacity: .07; padding: 28px 30px; white-space: nowrap; user-select: none; }
.pz-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.4); border-top: 1px solid rgba(255,255,255,.15); padding: 8px 10px; text-align: center; font-size: 11px; color: rgba(255,255,255,.6); letter-spacing: .06em; z-index: 25; }

/* FORM */
.pz-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #fff; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,.15); padding-bottom: 10px; }
.pz-section { margin-bottom: 18px; }
.pz-section-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #c09050; margin-bottom: 7px; }
.pz-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.pz-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.pz-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(255,255,255,.15); border-radius: 6px; background: rgba(255,255,255,.08); color: #fff; font-family: 'Raleway', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.pz-input:focus { border-color: rgba(192,144,80,.6); }
.pz-input::placeholder { color: rgba(255,255,255,.25); font-style: italic; }
.pz-date-wrap { position: relative; display: flex; align-items: center; }
.pz-date-wrap .pz-input { padding-right: 40px; }
.pz-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.pz-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #c09050; }
.pz-input-wrap { position: relative; }
.pz-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(255,255,255,.25); pointer-events: none; }
.pz-error { background: rgba(220,38,38,.15); border: 1px solid rgba(220,38,38,.4); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #ff8080; }
.pz-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #c09050; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s; }
.pz-pay-btn:hover { background: #a07838; }
.pz-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.pz-pay-note { font-size: 11px; color: rgba(255,255,255,.35); text-align: center; margin-top: 8px; line-height: 1.6; }
.pz-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; }
.pz-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,.5); }
.pz-gi span { font-size: 14px; }

.pz-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.65); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.pz-alert-box { background: #1a1208; border: 1px solid rgba(192,144,80,.3); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.5); }
.pz-alert-icon { font-size: 36px; margin-bottom: 12px; }
.pz-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #fff; letter-spacing: .08em; margin-bottom: 14px; }
.pz-alert-text { font-size: 13px; color: rgba(255,255,255,.6); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.pz-alert-text strong { font-style: normal; color: #fff; }
.pz-alert-btns { display: flex; gap: 10px; }
.pz-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(255,255,255,.2); border-radius: 8px; background: transparent; color: rgba(255,255,255,.5); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.pz-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #c09050; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600; cursor: pointer; }
.pz-alert-cancel:hover { background: rgba(255,255,255,.05); }
.pz-alert-confirm:hover { background: #a07838; }

.pz-footer { border-top: 1px solid rgba(255,255,255,.08); background: #1a1208; padding: 28px 24px; text-align: center; }
.pz-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(255,255,255,.35); margin-bottom: 14px; }
.pz-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #c09050; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600; text-decoration: none; transition: background .2s; }
.pz-footer-btn:hover { background: #a07838; }
.pz-footer-copy { font-size: 11px; color: rgba(255,255,255,.2); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .pz-layout { grid-template-columns: 1fr; gap: 32px; } .pz-inv-wrap { position: static; } }
@media (max-width: 480px) { .pz-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieNuntaPoza() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const weddingDateFormatted = formatDateUp(fields.weddingDate)
  const rsvpFormatted = formatRsvp(fields.rsvpDate)
  const [init1, init2] = getInitials(fields.groom, fields.bride)

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatie-nunta-poza' }),
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
    <div key={i} className="pz-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="pz-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pz">

        {showAlert && (
          <div className="pz-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="pz-alert-box" onClick={e => e.stopPropagation()}>
              <div className="pz-alert-icon">⚠️</div>
              <h3 className="pz-alert-title">Înainte să continui</h3>
              <p className="pz-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="pz-alert-btns">
                <button className="pz-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="pz-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="pz-topbar">
          <Link href="/" className="pz-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="pz-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="pz-inner">
          <div className="pz-title">
            <h1>Invitație Nuntă — Pădure de Toamnă</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="pz-layout">
            <div className="pz-inv-wrap">
              <div className="pz-inv-ratio">
                <div className="pz-inv-inner">
                  <div className="pz-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="pz-inv">
                      <ForestBg />
                      <div className="pz-overlay" />
                      <div className="pz-vignette" />
                      <div className="pz-content">
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
                          <p className="pz-mono-sub">VĂ INVITĂM ÎMPREUNĂ</p>
                          <MonogramPoza init1={init1} init2={init2} />
                        </div>
                        <div className="pz-middle">
                          <span className="pz-names">
                            {fields.groom || 'Miruna'} <span className="pz-amp">&amp;</span> {fields.bride || 'Ștefan'}
                          </span>
                        </div>
                        <div style={{ width:'100%' }}>
                          <div className="pz-sep" />
                          <p className="pz-parents">
                            {fields.parentsBride}<br/>
                            {fields.parentsGroom}
                          </p>
                          <p className="pz-date">{weddingDateFormatted || 'Data nunții'}</p>
                          <div className="pz-sep2" />
                          <p className="pz-rsvp">{fields.church} / Ora {fields.churchTime} · {fields.restaurant} / Ora {fields.restTime}</p>
                          <p className="pz-rsvp" style={{ marginTop:'8px' }}>Confirmați până pe {rsvpFormatted || fields.rsvpDate} · Tel: {fields.rsvpTel}</p>
                        </div>
                      </div>
                      <div className="pz-wm">
                        <div className="pz-wm-grid">{WM_TEXTS}</div>
                        <div className="pz-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pz-form">
              <h2>Personalizează invitația</h2>
              <div className="pz-section">
                <p className="pz-section-label">Miri</p>
                <div className="pz-grid2">
                  <input className="pz-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="pz-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="pz-section">
                <p className="pz-section-label">Părinți mire</p>
                <div className="pz-grid1">
                  <input className="pz-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="pz-section">
                <p className="pz-section-label">Părinți mireasă</p>
                <div className="pz-grid1">
                  <input className="pz-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="pz-section">
                <p className="pz-section-label">Nași de cununie</p>
                <div className="pz-grid1">
                  <input className="pz-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="pz-section">
                <p className="pz-section-label">Data nunții</p>
                <div className="pz-grid1">
                  <div className="pz-date-wrap">
                    <input className="pz-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="pz-cal-icon">📅</span>
                    <input className="pz-date-native" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="pz-section">
                <p className="pz-section-label">Cununie religioasă</p>
                <div className="pz-grid2">
                  <input className="pz-input" placeholder="Numele / Website" value={fields.church} onChange={set('church')} />
                  <div className="pz-input-wrap">
                    <input className="pz-input" type="text" placeholder="14:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="pz-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="pz-section">
                <p className="pz-section-label">Recepție</p>
                <div className="pz-grid2">
                  <input className="pz-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="pz-input-wrap">
                    <input className="pz-input" type="text" placeholder="18:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="pz-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="pz-section">
                <p className="pz-section-label">RSVP</p>
                <div className="pz-grid2">
                  <div className="pz-date-wrap">
                    <input className="pz-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="pz-cal-icon">📅</span>
                    <input className="pz-date-native" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="pz-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="pz-error">⚠️ {error}</div>}

              <button className="pz-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="pz-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>
              <div className="pz-guarantee">
                <div className="pz-gi"><span>✓</span> Download instant</div>
                <div className="pz-gi"><span>✓</span> PDF + JPG</div>
                <div className="pz-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="pz-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="pz-footer">
          <p className="pz-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="pz-footer-btn">← Vezi toate modelele</Link>
          <p className="pz-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
