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
function formatDisplayDate(val: string) {
  if (!val) return ''
  const [y, m, d] = val.split('-')
  return `${d}.${m}.${y}`
}

interface Fields {
  babyName: string; parents: string; godparents: string
  church: string; churchDate: string; churchTime: string
  restaurant: string; restaurantDate: string; restaurantTime: string
  contact: string
}

const DEFAULTS: Fields = {
  babyName: 'Luca',
  parents: 'Elena și Andrei Popescu',
  godparents: 'Maria și Cristian Ionescu',
  church: 'Biserica Sf. Nicolae', churchDate: '2025-04-20', churchTime: '11:00',
  restaurant: 'Restaurant Cosmos', restaurantDate: '2025-04-20', restaurantTime: '13:00',
  contact: '0700 000 000',
}

// ── SVG Fundal ────────────────────────────────────────────────────────────────
const SpaceBg = () => {
  const stars = Array.from({ length: 180 }, (_, i) => ({
    x: ((i * 137.5 + 31) % 794).toFixed(1),
    y: ((i * 89.3 + 17) % 680).toFixed(1),
    r: i % 9 === 0 ? 2.2 : i % 4 === 0 ? 1.4 : 0.7,
    op: (0.4 + (i % 8) * 0.07).toFixed(2),
  }))
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123">
      <defs>
        <linearGradient id="ab-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04090f"/>
          <stop offset="25%" stopColor="#060d1f"/>
          <stop offset="55%" stopColor="#0a1e42"/>
          <stop offset="75%" stopColor="#0d2a5a"/>
          <stop offset="100%" stopColor="#1a4a8a"/>
        </linearGradient>
        <radialGradient id="ab-moon" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fffae0"/>
          <stop offset="50%" stopColor="#f0e090"/>
          <stop offset="100%" stopColor="#d0c060"/>
        </radialGradient>
        <radialGradient id="ab-planet-red" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff9060"/>
          <stop offset="50%" stopColor="#e05030"/>
          <stop offset="100%" stopColor="#a02010"/>
        </radialGradient>
        <radialGradient id="ab-planet-teal" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#60f0d0"/>
          <stop offset="50%" stopColor="#20c0a0"/>
          <stop offset="100%" stopColor="#008060"/>
        </radialGradient>
        <linearGradient id="ab-rocket" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c0d8f8"/>
          <stop offset="50%" stopColor="#e8f4ff"/>
          <stop offset="100%" stopColor="#a0c0e8"/>
        </linearGradient>
        <linearGradient id="ab-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff0a0"/>
          <stop offset="40%" stopColor="#ff8000"/>
          <stop offset="100%" stopColor="#ff4000" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="ab-rainbow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff6060"/>
          <stop offset="25%" stopColor="#ffc040"/>
          <stop offset="50%" stopColor="#60e060"/>
          <stop offset="75%" stopColor="#40a0ff"/>
          <stop offset="100%" stopColor="#c060ff"/>
        </linearGradient>
        <linearGradient id="ab-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#40a0e0" stopOpacity=".5"/>
          <stop offset="100%" stopColor="#80d0ff" stopOpacity=".1"/>
        </linearGradient>
        <filter id="ab-star-glow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="ab-glow-soft"><feGaussianBlur stdDeviation="12"/></filter>
        <filter id="ab-moon-halo"><feGaussianBlur stdDeviation="18"/></filter>
        <filter id="ab-rocket-shadow"><feDropShadow dx="4" dy="8" stdDeviation="6" floodColor="#0a1628" floodOpacity=".5"/></filter>
        <filter id="ab-astro-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="794" height="1123" fill="url(#ab-sky)"/>
      <ellipse cx="200" cy="200" rx="300" ry="200" fill="#1840a0" opacity=".12" filter="url(#ab-glow-soft)"/>
      <ellipse cx="600" cy="350" rx="250" ry="180" fill="#104080" opacity=".1" filter="url(#ab-glow-soft)"/>
      {/* Stele */}
      {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op}/>)}
      <circle cx="180" cy="60" r="3" fill="#fff" opacity=".95" filter="url(#ab-star-glow)"/>
      <line x1="173" y1="60" x2="187" y2="60" stroke="#fff" strokeWidth=".8" opacity=".5"/>
      <line x1="180" y1="53" x2="180" y2="67" stroke="#fff" strokeWidth=".8" opacity=".5"/>
      <circle cx="640" cy="120" r="2.5" fill="#fff" opacity=".9" filter="url(#ab-star-glow)"/>
      <circle cx="720" cy="280" r="2" fill="#e0f0ff" opacity=".8"/>
      <circle cx="90" cy="320" r="2.5" fill="#fff" opacity=".75"/>
      {/* Luna */}
      <circle cx="590" cy="118" r="90" fill="#f8e860" opacity=".06" filter="url(#ab-moon-halo)"/>
      <circle cx="590" cy="118" r="58" fill="url(#ab-moon)"/>
      <circle cx="572" cy="95" r="10" fill="#c8b040" opacity=".5"/>
      <circle cx="610" cy="108" r="7" fill="#c0a830" opacity=".45"/>
      <circle cx="580" cy="132" r="8" fill="#c8b040" opacity=".4"/>
      <ellipse cx="576" cy="100" rx="20" ry="14" fill="#fffde0" opacity=".22" transform="rotate(-20 576 100)"/>
      {/* Planeta rosie */}
      <g transform="translate(700,380)">
        <ellipse cx="0" cy="8" rx="60" ry="14" fill="none" stroke="#e07040" strokeWidth="5" opacity=".4"/>
        <circle cx="0" cy="0" r="35" fill="url(#ab-planet-red)"/>
        <ellipse cx="0" cy="-8" rx="35" ry="6" fill="#c04020" opacity=".3"/>
        <ellipse cx="-10" cy="-12" rx="14" ry="9" fill="#ffb090" opacity=".25" transform="rotate(-20 -10 -12)"/>
        <path d="M-60 8 A60,14 0 0,0 0 22 A60,14 0 0,0 60 8" fill="none" stroke="#e07040" strokeWidth="5" opacity=".55"/>
      </g>
      {/* Planeta teal */}
      <g transform="translate(80,480)">
        <circle cx="0" cy="0" r="28" fill="url(#ab-planet-teal)"/>
        <ellipse cx="0" cy="-5" rx="28" ry="5" fill="#008060" opacity=".3"/>
        <ellipse cx="-8" cy="-8" rx="10" ry="7" fill="#a0ffe0" opacity=".2" transform="rotate(-15 -8 -8)"/>
      </g>
      {/* Racheta mare */}
      <g transform="translate(160,360) rotate(-30)" filter="url(#ab-rocket-shadow)">
        <ellipse cx="0" cy="95" rx="18" ry="45" fill="url(#ab-flame)" opacity=".9"/>
        <ellipse cx="-8" cy="105" rx="10" ry="28" fill="#fff0a0" opacity=".6"/>
        <path d="M-22 80 L-22 0 Q-22,-20 0,-38 Q22,-20 22,0 L22 80 Z" fill="url(#ab-rocket)"/>
        <circle cx="0" cy="20" r="12" fill="#a0d8ff" stroke="#80b8e0" strokeWidth="2"/>
        <circle cx="0" cy="20" r="9" fill="#c8eaff"/>
        <circle cx="-3" cy="17" r="3" fill="#fff" opacity=".6"/>
        <rect x="-22" y="40" width="44" height="4" fill="#80b0d8" opacity=".5"/>
        <path d="M-22 80 L-42 105 L-22 95 Z" fill="#c0d8f0"/>
        <path d="M22 80 L42 105 L22 95 Z" fill="#c0d8f0"/>
        <path d="M-22 30 L-35 50 L-22 44 Z" fill="#d0e4f8" opacity=".8"/>
        <path d="M22 30 L35 50 L22 44 Z" fill="#d0e4f8" opacity=".8"/>
      </g>
      {/* Urme racheta */}
      <circle cx="130" cy="440" r="18" fill="none" stroke="rgba(160,200,255,.3)" strokeWidth="2"/>
      <circle cx="110" cy="470" r="14" fill="none" stroke="rgba(160,200,255,.25)" strokeWidth="1.5"/>
      {/* Racheta mica */}
      <g transform="translate(680,220) rotate(20)" opacity=".8">
        <ellipse cx="0" cy="55" rx="10" ry="28" fill="#ff8020" opacity=".7"/>
        <path d="M-12 48 L-12 0 Q-12,-12 0,-22 Q12,-12 12,0 L12 48 Z" fill="#d8ecff"/>
        <circle cx="0" cy="14" r="7" fill="#90ccff"/>
        <path d="M-12 48 L-24 62 L-12 56 Z" fill="#c0d8f0"/>
        <path d="M12 48 L24 62 L12 56 Z" fill="#c0d8f0"/>
      </g>
      {/* Astronaut */}
      <g transform="translate(397,290)" filter="url(#ab-astro-glow)">
        <path d="M0,-80 Q30,-60 20,-20 Q10,20 0,30" stroke="#a0c8e8" strokeWidth="1.5" fill="none" opacity=".5" strokeDasharray="4,3"/>
        <rect x="-16" y="52" width="12" height="24" rx="6" fill="#c8ddf0"/>
        <rect x="4" y="52" width="12" height="24" rx="6" fill="#c8ddf0"/>
        <ellipse cx="-10" cy="76" rx="8" ry="5" fill="#90a8c0"/>
        <ellipse cx="10" cy="76" rx="8" ry="5" fill="#90a8c0"/>
        <rect x="-24" y="18" width="48" height="36" rx="10" fill="#daeaff"/>
        <rect x="-8" y="28" width="16" height="10" rx="3" fill="#a0c0e0"/>
        <circle cx="0" cy="24" r="3" fill="#60a0d0"/>
        <path d="M-24 22 Q-42 28 -38 44" stroke="#c8ddf0" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <path d="M24 22 Q42 28 38 44" stroke="#c8ddf0" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <circle cx="-38" cy="46" r="8" fill="#b0c8e0"/>
        <circle cx="38" cy="46" r="8" fill="#b0c8e0"/>
        <circle cx="0" cy="0" r="28" fill="#daeaff" stroke="#b0ccee" strokeWidth="2"/>
        <path d="M-18,-8 A18,18 0 0,1 18,-8 A14,14 0 0,1 0,14 Z" fill="#60c0f8" opacity=".85"/>
        <path d="M-18,-8 A18,18 0 0,1 18,-8 A14,14 0 0,1 0,14 Z" fill="url(#ab-visor)" opacity=".6"/>
        <path d="M-12,-4 Q-6,-14 -2,-10" stroke="white" strokeWidth="2" fill="none" opacity=".7" strokeLinecap="round"/>
        <line x1="10" y1="-28" x2="14" y2="-42" stroke="#b0ccee" strokeWidth="1.5"/>
        <circle cx="14" cy="-44" r="3" fill="#ff8080" opacity=".9"/>
        <text x="50" y="-40" fontSize="22" fill="#ffe060" opacity=".8" filter="url(#ab-star-glow)">★</text>
        <text x="-60" y="-20" fontSize="16" fill="#80d0ff" opacity=".7">✦</text>
      </g>
      {/* Nori + tranzitie alba */}
      <rect y="680" width="794" height="443" fill="#e8f4ff"/>
      <g opacity=".95">
        <ellipse cx="120" cy="720" rx="90" ry="38" fill="white"/>
        <ellipse cx="80" cy="730" rx="58" ry="32" fill="white"/>
        <ellipse cx="160" cy="728" rx="55" ry="30" fill="white"/>
        <ellipse cx="120" cy="740" rx="95" ry="22" fill="white"/>
      </g>
      <g opacity=".95">
        <ellipse cx="670" cy="710" rx="85" ry="35" fill="white"/>
        <ellipse cx="630" cy="720" rx="55" ry="30" fill="white"/>
        <ellipse cx="710" cy="718" rx="52" ry="28" fill="white"/>
        <ellipse cx="670" cy="730" rx="88" ry="20" fill="white"/>
      </g>
      <g opacity=".8">
        <ellipse cx="397" cy="700" rx="60" ry="25" fill="white"/>
        <ellipse cx="370" cy="708" rx="38" ry="22" fill="white"/>
        <ellipse cx="424" cy="707" rx="36" ry="20" fill="white"/>
      </g>
      <path d="M50 780 Q397 640 744 780" fill="none" stroke="url(#ab-rainbow)" strokeWidth="5" opacity=".18"/>
      <rect y="780" width="794" height="343" fill="white" opacity=".95"/>
      {/* Steluțe decorative zona alba */}
      <text x="65" y="840" fontSize="16" fill="#4090d0" opacity=".3" fontFamily="sans-serif">✦</text>
      <text x="720" y="860" fontSize="14" fill="#4090d0" opacity=".25" fontFamily="sans-serif">★</text>
      <text x="55" y="920" fontSize="12" fill="#4090d0" opacity=".25" fontFamily="sans-serif">★</text>
      {/* Racheta decorativa mica */}
      <g transform="translate(730,1020) rotate(-10)" opacity=".18">
        <ellipse cx="0" cy="30" rx="8" ry="18" fill="#ff8020"/>
        <path d="M-8 26 L-8 0 Q-8,-8 0,-15 Q8,-8 8,0 L8 26 Z" fill="#4090d0"/>
        <path d="M-8 26 L-16 34 L-8 30 Z" fill="#3070b0"/>
        <path d="M8 26 L16 34 L8 30 Z" fill="#3070b0"/>
      </g>
    </svg>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&family=Fredoka+One&family=Quicksand:wght@400;500;600;700&family=Cinzel:wght@400;600&display=swap');

.ab * { box-sizing: border-box; margin: 0; padding: 0; }
.ab { font-family: 'Nunito', sans-serif; background: #e8f4ff; color: #1a3060; min-height: 100vh; }

.ab-topbar { background: #0a1628; border-bottom: 1px solid rgba(100,160,255,.15); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.ab-logo { font-family: 'Fredoka One', cursive; font-size: 18px; letter-spacing: .04em; color: #fff; text-decoration: none; }
.ab-logo span { color: #60b0ff; }
.ab-back-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(100,160,255,.3); color: #80c0ff; font-family: 'Quicksand', sans-serif; font-size: 11px; letter-spacing: .08em; font-weight: 700; text-decoration: none; background: transparent; transition: background .2s; }
.ab-back-btn:hover { background: rgba(100,160,255,.1); }

.ab-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.ab-title { text-align: center; margin-bottom: 40px; }
.ab-title h1 { font-family: 'Fredoka One', cursive; font-size: clamp(20px,3vw,32px); color: #1a3a6a; margin-bottom: 8px; letter-spacing: .02em; }
.ab-title p { font-size: 11px; color: rgba(26,48,96,.5); letter-spacing: .1em; text-transform: uppercase; }

.ab-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.ab-inv-wrap { position: sticky; top: 72px; }
.ab-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.ab-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.ab-inv-inner { position: absolute; inset: 0; }
.ab-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE PREVIEW ── */
.ab-inv { width: 794px; height: 1123px; position: relative; overflow: hidden; background: #04090f; }
.ab-content {
  position: absolute; inset: 0; z-index: 6;
  display: flex; flex-direction: column;
  align-items: center; padding: 52px 70px 48px; text-align: center;
}
.ab-space { height: 290px; }
.ab-badge { font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: #80c8ff; margin-bottom: 8px; }
.ab-baby-name { font-family: 'Fredoka One', cursive; font-size: 96px; color: #fff; line-height: 1; display: block; text-shadow: 0 4px 20px rgba(100,180,255,.4); margin-bottom: 6px; }
.ab-announce { font-family: 'Nunito', sans-serif; font-size: 22px; font-weight: 300; color: #b8d8f8; font-style: italic; margin-bottom: 20px; }
.ab-sep { width: 60px; height: 3px; background: linear-gradient(90deg,#4090e0,#80c8ff,#4090e0); border-radius: 2px; margin: 10px auto 14px; }
.ab-section-label { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .26em; text-transform: uppercase; color: #ffffff; margin-bottom: 5px; }
.ab-section-val { font-family: 'Nunito', sans-serif; font-size: 28px; font-weight: 600; color: #ffffff; line-height: 1.4; margin-bottom: 12px; }
.ab-event-name { font-family: 'Fredoka One', cursive; font-size: 30px; color: #2060b0; margin-bottom: 3px; }
.ab-event-detail { font-family: 'Nunito', sans-serif; font-size: 22px; font-weight: 400; color: #304060; line-height: 1.6; margin-bottom: 12px; }
.ab-rsvp { font-family: 'Nunito', sans-serif; font-size: 22px; font-weight: 400; color: #406090; margin-top: 8px; }
.ab-rsvp strong { color: #1a3060; font-weight: 700; }

/* Watermark */
.ab-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.ab-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.ab-wm-row { display: flex; white-space: nowrap; }
.ab-wm-item { font-size: 34px; letter-spacing: .1em; color: #ff0000; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; }
.ab-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(235, 12, 12, 0.1); border-top: 1px solid rgba(197, 38, 99, 0.25); padding: 8px 10px; text-align: center; font-size: 11px; color: #ee091c; letter-spacing: .06em; z-index: 25; }

/* FORM */
.ab-form h2 { font-family: 'Fredoka One', cursive; font-size: 20px; color: #1a3a6a; margin-bottom: 24px; letter-spacing: .03em; border-bottom: 2px solid rgba(64,144,224,.2); padding-bottom: 10px; }
.ab-section { margin-bottom: 18px; }
.ab-sl { font-family: 'Quicksand', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #4090d0; margin-bottom: 7px; }
.ab-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ab-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.ab-input { width: 100%; padding: 10px 12px; font-size: 13px; border: 1.5px solid rgba(64,144,224,.2); border-radius: 10px; background: rgba(64,144,224,.04); color: #1a3060; font-family: 'Nunito', sans-serif; outline: none; transition: border-color .2s; font-weight: 600; }
.ab-input:focus { border-color: #60a8e0; box-shadow: 0 0 0 3px rgba(64,144,224,.1); }
.ab-input::placeholder { color: rgba(26,48,96,.3); font-weight: 400; }
.ab-dw { position: relative; display: flex; align-items: center; }
.ab-dw .ab-input { padding-right: 40px; }
.ab-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.ab-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; }
.ab-iw { position: relative; }
.ab-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,48,96,.3); pointer-events: none; }
.ab-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 10px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.ab-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: linear-gradient(135deg, #2060d0, #4090e0); color: #fff; border: none; border-radius: 10px; font-family: 'Fredoka One', cursive; font-size: 18px; letter-spacing: .04em; cursor: pointer; transition: opacity .2s; box-shadow: 0 4px 20px rgba(64,144,224,.3); }
.ab-pay-btn:hover { opacity: .88; }
.ab-pay-btn:disabled { opacity: .5; cursor: not-allowed; }
.ab-pay-note { font-size: 11px; color: rgba(26,48,96,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.ab-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(64,144,224,.05); border: 1.5px solid rgba(64,144,224,.15); border-radius: 10px; }
.ab-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,48,96,.6); font-family: 'Quicksand', sans-serif; font-weight: 600; }
.ab-gi span { font-size: 16px; }

.ab-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.ab-alert-box { background: #fff; border: 2px solid rgba(64,144,224,.2); border-radius: 20px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
.ab-alert-icon { font-size: 40px; margin-bottom: 12px; }
.ab-alert-title { font-family: 'Fredoka One', cursive; font-size: 20px; color: #1a3a6a; margin-bottom: 14px; letter-spacing: .03em; }
.ab-alert-text { font-family: 'Nunito', sans-serif; font-size: 14px; color: rgba(26,48,96,.65); line-height: 1.8; margin-bottom: 24px; }
.ab-alert-text strong { color: #1a3060; }
.ab-alert-btns { display: flex; gap: 10px; }
.ab-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(64,144,224,.25); border-radius: 10px; background: #fff; color: rgba(26,48,96,.5); font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; }
.ab-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 10px; background: linear-gradient(135deg,#2060d0,#4090e0); color: #fff; font-family: 'Fredoka One', cursive; font-size: 15px; cursor: pointer; }
.ab-alert-cancel:hover { background: rgba(64,144,224,.06); }

.ab-footer { border-top: 2px solid rgba(64,144,224,.15); background: #0a1628; padding: 28px 24px; text-align: center; }
.ab-footer-text { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .08em; color: rgba(100,160,255,.5); margin-bottom: 14px; }
.ab-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: linear-gradient(135deg,#2060d0,#4090e0); color: #fff; font-family: 'Fredoka One', cursive; font-size: 15px; text-decoration: none; box-shadow: 0 4px 16px rgba(64,144,224,.3); }
.ab-footer-copy { font-size: 11px; color: rgba(100,160,255,.25); margin-top: 16px; }

@media (max-width: 800px) { .ab-layout { grid-template-columns: 1fr; gap: 32px; } .ab-inv-wrap { position: static; } }
@media (max-width: 480px) { .ab-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieBotezBaiatAstronaut() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatie-botez-baiat-astronaut' }),
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
    <div key={i} className="ab-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="ab-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ab">

        {showAlert && (
          <div className="ab-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="ab-alert-box" onClick={e => e.stopPropagation()}>
              <div className="ab-alert-icon">🚀</div>
              <h3 className="ab-alert-title">Pregătit de lansare!</h3>
              <p className="ab-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate după descărcare.
              </p>
              <div className="ab-alert-btns">
                <button className="ab-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="ab-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  🚀 Lansare!
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="ab-topbar">
          <Link href="/" className="ab-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="ab-back-btn">← Alege alt model</Link>
        </header>

        <div className="ab-inner">
          <div className="ab-title">
            <h1>🚀 Invitație Botez — Astronaut</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="ab-layout">
            <div className="ab-inv-wrap">
              <div className="ab-inv-ratio">
                <div className="ab-inv-inner">
                  <div className="ab-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="ab-inv">
                      <SpaceBg />
                      <div className="ab-content">
                        <div className="ab-space" />
                        <p className="ab-badge">🚀 Invitație de Botez 🚀</p>
                        <span className="ab-baby-name">{fields.babyName || 'Prenume'}</span>
                        <p className="ab-announce">a aterizat pe Pământ!</p>
                        <div className="ab-sep" />
<p className="ab-section-label" style={{ color:'#ffffff' }}>Părinți</p>
<p className="ab-section-val" style={{ color:'#ffffff', textShadow:'0 1px 8px rgba(0,0,0,.4)' }}>{fields.parents}</p>

<p className="ab-section-label" style={{ color:'#ffffff' }}>Nași</p>
<p className="ab-section-val" style={{ color:'#ffffff', textShadow:'0 1px 8px rgba(0,0,0,.4)' }}>{fields.godparents}</p>
                        <div className="ab-sep" />
                        <p className="ab-section-label">🕊️ Botez</p>
                        <p className="ab-event-name">{fields.church || 'Biserica'}</p>
                        <p className="ab-event-detail">{formatDate(fields.churchDate) || fields.churchDate}, ora {fields.churchTime}</p>
                        <p className="ab-section-label">🎈 Petrecere</p>
                        <p className="ab-event-name">{fields.restaurant || 'Restaurantul'}</p>
                        <p className="ab-event-detail">{formatDate(fields.restaurantDate) || fields.restaurantDate}, ora {fields.restaurantTime}</p>
                        <div className="ab-sep" />
                        <p className="ab-rsvp">Tel: <strong>{fields.contact}</strong></p>
                      </div>
                      <div className="ab-wm">
                        <div className="ab-wm-grid">{WM_TEXTS}</div>
                        <div className="ab-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ab-form">
              <h2>🚀 Personalizează invitația</h2>

              <div className="ab-section">
                <p className="ab-sl">Prenume Copil</p>
                <div className="ab-g1">
                  <input className="ab-input" placeholder="ex: Luca" value={fields.babyName} onChange={set('babyName')} />
                </div>
              </div>
              <div className="ab-section">
                <p className="ab-sl">Părinți</p>
                <div className="ab-g1">
                  <input className="ab-input" placeholder="ex: Elena și Andrei Popescu" value={fields.parents} onChange={set('parents')} />
                </div>
              </div>
              <div className="ab-section">
                <p className="ab-sl">Nași de botez</p>
                <div className="ab-g1">
                  <input className="ab-input" placeholder="ex: Maria și Cristian Ionescu" value={fields.godparents} onChange={set('godparents')} />
                </div>
              </div>
              <div className="ab-section">
                <p className="ab-sl">Botez — Locație</p>
                <div className="ab-g1">
                  <input className="ab-input" placeholder="ex: Biserica Sf. Nicolae" value={fields.church} onChange={set('church')} />
                </div>
              </div>
              <div className="ab-section">
                <p className="ab-sl">Botez — Dată & Ora</p>
                <div className="ab-g2">
                  <div className="ab-dw">
                    <input className="ab-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.churchDate)} />
                    <span className="ab-ci">📅</span>
                    <input className="ab-dn" type="date" value={fields.churchDate} onChange={e => setFields(f => ({ ...f, churchDate: e.target.value }))} />
                  </div>
                  <div className="ab-iw">
                    <input className="ab-input" type="text" placeholder="11:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="ab-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="ab-section">
                <p className="ab-sl">Petrecere — Locație</p>
                <div className="ab-g1">
                  <input className="ab-input" placeholder="ex: Restaurant Cosmos" value={fields.restaurant} onChange={set('restaurant')} />
                </div>
              </div>
              <div className="ab-section">
                <p className="ab-sl">Petrecere — Dată & Ora</p>
                <div className="ab-g2">
                  <div className="ab-dw">
                    <input className="ab-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.restaurantDate)} />
                    <span className="ab-ci">📅</span>
                    <input className="ab-dn" type="date" value={fields.restaurantDate} onChange={e => setFields(f => ({ ...f, restaurantDate: e.target.value }))} />
                  </div>
                  <div className="ab-iw">
                    <input className="ab-input" type="text" placeholder="13:00" maxLength={5} value={fields.restaurantTime} onChange={e => setFields(f => ({ ...f, restaurantTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="ab-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="ab-section">
                <p className="ab-sl">Număr de contact</p>
                <div className="ab-g1">
                  <input className="ab-input" type="tel" placeholder="ex: 0700 000 000" value={fields.contact} onChange={set('contact')} />
                </div>
              </div>

              {error && <div className="ab-error">⚠️ {error}</div>}

              <button className="ab-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🚀 Plătește 30 lei și descarcă'}
              </button>
              <p className="ab-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>
              <div className="ab-guarantee">
                <div className="ab-gi"><span>✓</span> Download instant</div>
                <div className="ab-gi"><span>✓</span> PDF + JPG</div>
                <div className="ab-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="ab-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="ab-footer">
          <p className="ab-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="ab-footer-btn">← Vezi toate modelele</Link>
          <p className="ab-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
