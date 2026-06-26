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
  babyName: 'LUCA',
  parents: 'Elena și Andrei Popescu',
  godparents: 'Maria și Cristian Ionescu',
  church: 'Biserica Sf. Nicolae', churchDate: '2025-04-20', churchTime: '11:00',
  restaurant: 'Restaurant La Conac', restaurantDate: '2025-04-20', restaurantTime: '13:00',
  contact: '0700 000 000',
}

// ── SVG Fundal Racing ─────────────────────────────────────────────────────────
const RacingBg = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123">
    <defs>
      <linearGradient id="rc-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#080808"/><stop offset="40%" stopColor="#0d0d0d"/>
        <stop offset="100%" stopColor="#0a0a0a"/>
      </linearGradient>
      <linearGradient id="rc-red" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#cc0000"/><stop offset="50%" stopColor="#ff1a1a"/><stop offset="100%" stopColor="#cc0000"/>
      </linearGradient>
      <linearGradient id="rc-gold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#c8900a"/><stop offset="50%" stopColor="#ffd700"/><stop offset="100%" stopColor="#c8900a"/>
      </linearGradient>
      <linearGradient id="rc-car-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff2222"/><stop offset="40%" stopColor="#dd0000"/><stop offset="100%" stopColor="#880000"/>
      </linearGradient>
      <linearGradient id="rc-car-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff4444"/><stop offset="60%" stopColor="#cc0000"/><stop offset="100%" stopColor="#660000"/>
      </linearGradient>
      <radialGradient id="rc-tire" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#3a3a3a"/><stop offset="100%" stopColor="#111"/>
      </radialGradient>
      <linearGradient id="rc-gold2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe566"/><stop offset="50%" stopColor="#ffd700"/><stop offset="100%" stopColor="#c8900a"/>
      </linearGradient>
      <linearGradient id="rc-track" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1a1a"/><stop offset="50%" stopColor="#222"/><stop offset="100%" stopColor="#1a1a1a"/>
      </linearGradient>
      <pattern id="rc-checker" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="white"/><rect width="10" height="10" fill="black"/>
        <rect x="10" y="10" width="10" height="10" fill="black"/>
      </pattern>
      <linearGradient id="rc-checker-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="transparent"/><stop offset="100%" stopColor="#0a0a0a"/>
      </linearGradient>
      <linearGradient id="rc-speed" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0"/>
        <stop offset="50%" stopColor="#ff1a1a" stopOpacity=".6"/>
        <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0"/>
      </linearGradient>
      <filter id="rc-red-glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="rc-gold-glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="rc-blur-soft"><feGaussianBlur stdDeviation="12"/></filter>
      <filter id="rc-blur-heavy"><feGaussianBlur stdDeviation="25"/></filter>
      <filter id="rc-shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#ff0000" floodOpacity=".4"/></filter>
    </defs>
    <rect width="794" height="1123" fill="url(#rc-bg)"/>
    {/* Glow ambiental */}
    <ellipse cx="397" cy="750" rx="500" ry="200" fill="#cc0000" opacity=".08" filter="url(#rc-blur-heavy)"/>
    <ellipse cx="100" cy="800" rx="200" ry="150" fill="#ff2200" opacity=".06" filter="url(#rc-blur-heavy)"/>
    {/* Pista diagonala */}
    <path d="M-50 550 L844 350 L844 480 L-50 680 Z" fill="url(#rc-track)" opacity=".9"/>
    <path d="M-50 550 L844 350" stroke="white" strokeWidth="3" opacity=".6"/>
    <path d="M-50 680 L844 480" stroke="white" strokeWidth="3" opacity=".6"/>
    <path d="M-50 610 L844 410" stroke="#ffd700" strokeWidth="2" opacity=".5"/>
    <path d="M-50 620 L844 420" stroke="#ffd700" strokeWidth="2" opacity=".5"/>
    <path d="M-50 615 L844 415" stroke="white" strokeWidth="1.5" strokeDasharray="30,20" opacity=".4"/>
    {/* Checker sus */}
    <rect x="0" y="0" width="794" height="80" fill="url(#rc-checker)" opacity=".85"/>
    <rect x="0" y="0" width="794" height="80" fill="url(#rc-checker-fade)"/>
    <rect x="0" y="76" width="794" height="6" fill="url(#rc-red)" filter="url(#rc-red-glow)"/>
    {/* Speed lines */}
    {[120,135,148,162,176].map((y,i) => (
      <rect key={i} x="-100" y={y} width={400+i*30} height={3-i*0.4} rx="1" fill="url(#rc-speed)" transform={`rotate(-8 200 ${y})`} opacity={.7-i*.08}/>
    ))}
    {/* Masina F1 */}
    <g transform="translate(397,620) scale(1.4)">
      <ellipse cx="0" cy="62" rx="160" ry="14" fill="#000" opacity=".5" filter="url(#rc-blur-soft)"/>
      <ellipse cx="0" cy="58" rx="120" ry="10" fill="#ff0000" opacity=".25" filter="url(#rc-blur-soft)"/>
      <path d="M-145 10 L-80 8 L-80 35 L-145 38 Z" fill="url(#rc-car-side)"/>
      <path d="M80 8 L145 10 L145 38 L80 35 Z" fill="url(#rc-car-side)"/>
      <path d="M-80 30 L80 30 L85 55 L-85 55 Z" fill="url(#rc-car-body)"/>
      <path d="M-60 8 Q0,-30 60,8 L80 30 L-80 30 Z" fill="url(#rc-car-body)"/>
      <path d="M-40 8 Q0,-22 40,8 L50 20 L-50 20 Z" fill="#ff5555" opacity=".4"/>
      <path d="M-25 8 Q0,-18 25,8 Z" fill="#1a1a2a"/>
      <path d="M-18,-8 A18,18 0 0,1 18,-8 A14,14 0 0,1 0,14 Z" fill="#2244aa" opacity=".8"/>
      <path d="M-14 5 Q0,-9 14,5" stroke="#5577ff" strokeWidth="1" fill="none" opacity=".6"/>
      <path d="M-170 35 L-85 32 L-85 42 L-170 50 Z" fill="#cc0000"/>
      <path d="M85 32 L170 35 L170 50 L85 42 Z" fill="#cc0000"/>
      <rect x="140" y="18" width="42" height="7" rx="2" fill="#cc0000"/>
      <rect x="-182" y="44" width="42" height="6" rx="2" fill="#cc0000"/>
      <rect x="-35" y="38" width="70" height="10" rx="2" fill="#ffd700" opacity=".8"/>
      {/* Roti */}
      {[[-130,52],[-60,52],[130,52],[60,52]].map(([tx,ty],i) => (
        <g key={i} transform={`translate(${tx},${ty})`}>
          <circle r="26" fill="url(#rc-tire)"/>
          <circle r="26" fill="none" stroke="#333" strokeWidth="4"/>
          <circle r="18" fill="#222"/>
          <circle r="10" fill="none" stroke="#888" strokeWidth="2"/>
          <circle r="6" fill="#777"/>
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#888" strokeWidth="1.5"/>
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#888" strokeWidth="1.5"/>
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="#777" strokeWidth="1"/>
          <line x1="7" y1="-7" x2="-7" y2="7" stroke="#777" strokeWidth="1"/>
        </g>
      ))}
      <ellipse cx="160" cy="40" rx="25" ry="8" fill="#ff4400" opacity=".6" filter="url(#rc-blur-soft)"/>
    </g>
    {/* Trofeu */}
    <g transform="translate(660,200)">
      <ellipse cx="0" cy="0" rx="60" ry="80" fill="#ffd700" opacity=".1" filter="url(#rc-blur-soft)"/>
      <path d="M-8 80 L8 80 L12 100 L-12 100 Z" fill="#c8900a"/>
      <rect x="-18" y="96" width="36" height="8" rx="2" fill="#b8800a"/>
      <rect x="-22" y="104" width="44" height="6" rx="3" fill="#c8900a"/>
      <path d="M-24 -20 Q-28 10 -20 40 Q-10 65 0 70 Q10 65 20 40 Q28 10 24 -20 Z" fill="url(#rc-gold2)"/>
      <path d="M-18 -15 Q-20 10 -14 38 Q-8 60 0 65" stroke="#ffe566" strokeWidth="3" fill="none" opacity=".5" strokeLinecap="round"/>
      <path d="M-24 5 Q-45 0 -42 25 Q-40 40 -24 35" fill="none" stroke="url(#rc-gold2)" strokeWidth="6" strokeLinecap="round"/>
      <path d="M24 5 Q45 0 42 25 Q40 40 24 35" fill="none" stroke="url(#rc-gold2)" strokeWidth="6" strokeLinecap="round"/>
      <polygon points="0,-48 8,-28 28,-28 14,-14 20,8 0,-6 -20,8 -14,-14 -28,-28 -8,-28" fill="#ffd700" filter="url(#rc-gold-glow)" opacity=".95"/>
      <text x="0" y="55" textAnchor="middle" fontFamily="Orbitron,monospace" fontSize="18" fontWeight="900" fill="#0a0a0a" opacity=".7">#1</text>
    </g>
    {/* Triunghiuri decorative */}
    <polygon points="0,800 0,1123 250,1123" fill="#cc0000" opacity=".15"/>
    <polygon points="794,0 794,300 544,0" fill="#cc0000" opacity=".12"/>
    {/* Linii verticale accent */}
    <rect x="0" y="80" width="5" height="1043" fill="url(#rc-red)" opacity=".7"/>
    <rect x="0" y="80" width="5" height="1043" fill="url(#rc-red)" filter="url(#rc-red-glow)" opacity=".4"/>
    <rect x="789" y="80" width="5" height="1043" fill="url(#rc-red)" opacity=".7"/>
    <rect x="789" y="80" width="5" height="1043" fill="url(#rc-red)" filter="url(#rc-red-glow)" opacity=".4"/>
    <rect x="20" y="80" width="2" height="1043" fill="#ffd700" opacity=".25"/>
    <rect x="772" y="80" width="2" height="1043" fill="#ffd700" opacity=".25"/>
    {/* Panel jos */}
    <rect x="30" y="750" width="734" height="355" rx="8" fill="#0d0d0d" opacity=".95"/>
    <rect x="30" y="750" width="734" height="4" fill="url(#rc-red)" opacity=".9"/>
    <rect x="30" y="1101" width="734" height="4" fill="url(#rc-red)" opacity=".7"/>
    <rect x="42" y="762" width="710" height="1" fill="#ff2222" opacity=".15"/>
  </svg>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Russo+One&family=Nunito:wght@300;400;600;700;800;900&family=Cinzel:wght@400;600&display=swap');

.rc * { box-sizing: border-box; margin: 0; padding: 0; }
.rc { font-family: 'Nunito', sans-serif; background: #0a0a0a; color: #fff; min-height: 100vh; }

.rc-topbar { background: #0a0a0a; border-bottom: 3px solid #cc0000; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.rc-logo { font-family: 'Orbitron', monospace; font-size: 14px; letter-spacing: .12em; color: #fff; text-decoration: none; font-weight: 700; }
.rc-logo span { color: #ff1a1a; text-shadow: 0 0 12px rgba(255,30,30,.6); }
.rc-back-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 3px; border: 1.5px solid rgba(255,30,30,.4); color: #ff4444; font-family: 'Orbitron', monospace; font-size: 10px; letter-spacing: .08em; font-weight: 700; text-decoration: none; background: transparent; transition: background .2s; }
.rc-back-btn:hover { background: rgba(255,30,30,.08); }

.rc-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.rc-title { text-align: center; margin-bottom: 40px; }
.rc-title h1 { font-family: 'Orbitron', monospace; font-size: clamp(16px,2.5vw,24px); font-weight: 900; color: #ff1a1a; text-shadow: 0 0 20px rgba(255,30,30,.4); margin-bottom: 8px; letter-spacing: .08em; }
.rc-title p { font-size: 11px; color: rgba(255,255,255,.35); letter-spacing: .1em; text-transform: uppercase; font-family: 'Orbitron', monospace; }

.rc-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.rc-inv-wrap { position: sticky; top: 72px; }
.rc-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.rc-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.rc-inv-inner { position: absolute; inset: 0; }
.rc-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.rc-inv { width: 794px; height: 1123px; position: relative; overflow: hidden; background: #0a0a0a; }
.rc-content { position: absolute; inset: 0; z-index: 6; display: flex; flex-direction: column; align-items: center; padding: 0; text-align: center; }
.rc-top { padding: 94px 60px 0; width: 100%; }
.rc-announce { font-family: 'Orbitron', monospace; font-size: 11px; font-weight: 400; letter-spacing: .5em; text-transform: uppercase; color: #ffd700; margin-bottom: 6px; opacity: .8; }
.rc-pilot { font-family: 'Russo One', sans-serif; font-size: 22px; letter-spacing: .22em; text-transform: uppercase; color: white; margin-bottom: 4px; opacity: .7; }
.rc-flex1 { flex: 1; }
.rc-bottom { width: 100%; padding: 0 60px 30px; }
.rc-botez-label { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: #ff2222; margin-bottom: 2px; }
.rc-baby-name { font-family: 'Russo One', sans-serif; font-size: 96px; color: white; line-height: .9; text-shadow: 0 0 30px rgba(255,30,30,.5), 0 0 60px rgba(255,0,0,.2), 3px 3px 0 #880000; letter-spacing: .02em; margin-bottom: 4px; display: block; }
.rc-div-line { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px; }
.rc-div-line-bar { flex: 1; height: 2px; }
.rc-div-line-bar-l { background: linear-gradient(90deg,transparent,#ff1a1a); }
.rc-div-line-bar-r { background: linear-gradient(90deg,#ff1a1a,transparent); }
.rc-sub-text { font-family: 'Nunito', sans-serif; font-size: 20px; font-weight: 300; font-style: italic; color: rgba(255,255,255,.6); letter-spacing: .08em; }
.rc-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin: 14px 0; }
.rc-col-left { border-right: 1px solid rgba(255,30,30,.3); padding-right: 20px; text-align: right; }
.rc-col-right { padding-left: 20px; text-align: left; }
.rc-info-label { font-family: 'Orbitron', monospace; font-size: 9px; letter-spacing: .28em; text-transform: uppercase; color: #ff2222; margin-bottom: 4px; opacity: .8; }
.rc-info-label-gold { font-family: 'Orbitron', monospace; font-size: 9px; letter-spacing: .28em; text-transform: uppercase; color: #ffd700; margin-bottom: 4px; opacity: .8; }
.rc-info-val { font-family: 'Nunito', sans-serif; font-size: 22px; font-weight: 700; color: white; line-height: 1.3; margin-bottom: 14px; }
.rc-event-name { font-family: 'Nunito', sans-serif; font-size: 20px; font-weight: 700; color: white; line-height: 1.2; margin-bottom: 2px; }
.rc-event-detail { font-family: 'Nunito', sans-serif; font-size: 18px; font-weight: 300; color: rgba(255,255,255,.6); margin-bottom: 12px; }
.rc-sep-full { width: 100%; height: 1px; background: linear-gradient(90deg,transparent,#ff1a1a 30%,#ffd700 50%,#ff1a1a 70%,transparent); margin: 12px 0; opacity: .6; }
.rc-contact-label { font-family: 'Orbitron', monospace; font-size: 9px; letter-spacing: .28em; text-transform: uppercase; color: #ff2222; margin-bottom: 4px; opacity: .8; }
.rc-contact-val { font-family: 'Nunito', sans-serif; font-size: 26px; font-weight: 900; color: white; letter-spacing: .06em; }

/* Watermark */
.rc-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.rc-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.rc-wm-row { display: flex; white-space: nowrap; }
.rc-wm-item { font-size: 24px; letter-spacing: .1em; color: #ff0000; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; font-family: 'Orbitron', monospace; }
.rc-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(10,10,10,.8); border-top: 2px solid #cc0000; padding: 8px 10px; text-align: center; font-size: 11px; color: #ff4444; letter-spacing: .06em; z-index: 25; font-family: 'Orbitron', monospace; }

/* FORM */
.rc-form h2 { font-family: 'Orbitron', monospace; font-size: 14px; font-weight: 900; letter-spacing: .12em; color: #ff1a1a; text-shadow: 0 0 16px rgba(255,30,30,.4); margin-bottom: 24px; border-bottom: 2px solid #cc0000; padding-bottom: 10px; }
.rc-section { margin-bottom: 18px; }
.rc-sl { font-family: 'Orbitron', monospace; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: #ff4444; margin-bottom: 7px; }
.rc-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.rc-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.rc-input { width: 100%; padding: 10px 12px; font-size: 13px; border: 1.5px solid rgba(255,30,30,.2); border-radius: 3px; background: rgba(255,30,30,.04); color: #fff; font-family: 'Nunito', sans-serif; outline: none; transition: border-color .2s; font-weight: 600; }
.rc-input:focus { border-color: #ff1a1a; box-shadow: 0 0 0 2px rgba(255,30,30,.12); }
.rc-input::placeholder { color: rgba(255,255,255,.2); font-weight: 400; }
.rc-dw { position: relative; display: flex; align-items: center; }
.rc-dw .rc-input { padding-right: 40px; }
.rc-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.rc-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; }
.rc-iw { position: relative; }
.rc-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(255,255,255,.2); pointer-events: none; }
.rc-error { background: rgba(220,38,38,.12); border: 1px solid rgba(220,38,38,.35); border-radius: 3px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #ff8080; }
.rc-pay-btn { width: 100%; padding: 15px; margin-top: 24px; background: linear-gradient(135deg, #cc0000, #ff1a1a, #cc0000); color: #fff; border: none; border-radius: 3px; font-family: 'Orbitron', monospace; font-size: 14px; letter-spacing: .12em; cursor: pointer; font-weight: 900; transition: opacity .2s; box-shadow: 0 4px 24px rgba(255,0,0,.35), 0 0 0 2px rgba(255,30,30,.2); text-transform: uppercase; }
.rc-pay-btn:hover { opacity: .88; }
.rc-pay-btn:disabled { opacity: .5; cursor: not-allowed; }
.rc-pay-note { font-size: 11px; color: rgba(255,255,255,.3); text-align: center; margin-top: 8px; line-height: 1.6; font-family: 'Orbitron', monospace; letter-spacing: .04em; }
.rc-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(255,30,30,.04); border: 1px solid rgba(255,30,30,.15); border-radius: 3px; }
.rc-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,.4); font-family: 'Orbitron', monospace; }
.rc-gi span { font-size: 14px; color: #ff2222; }

.rc-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.rc-alert-box { background: #0a0a0a; border: 2px solid #cc0000; border-radius: 6px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 40px rgba(255,0,0,.1); }
.rc-alert-icon { font-size: 40px; margin-bottom: 12px; }
.rc-alert-title { font-family: 'Orbitron', monospace; font-size: 16px; font-weight: 900; color: #ff1a1a; letter-spacing: .1em; margin-bottom: 14px; text-transform: uppercase; }
.rc-alert-text { font-family: 'Nunito', sans-serif; font-size: 14px; color: rgba(255,255,255,.6); line-height: 1.8; margin-bottom: 24px; }
.rc-alert-text strong { color: #fff; }
.rc-alert-btns { display: flex; gap: 10px; }
.rc-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(255,30,30,.3); border-radius: 3px; background: transparent; color: rgba(255,255,255,.4); font-family: 'Orbitron', monospace; font-size: 10px; cursor: pointer; letter-spacing: .08em; }
.rc-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 3px; background: linear-gradient(135deg,#cc0000,#ff1a1a); color: #fff; font-family: 'Orbitron', monospace; font-size: 11px; font-weight: 900; cursor: pointer; letter-spacing: .08em; }
.rc-alert-cancel:hover { background: rgba(255,30,30,.06); }

.rc-footer { border-top: 3px solid #cc0000; background: #0a0a0a; padding: 28px 24px; text-align: center; }
.rc-footer-text { font-family: 'Orbitron', monospace; font-size: 10px; letter-spacing: .12em; color: rgba(255,30,30,.4); margin-bottom: 14px; text-transform: uppercase; }
.rc-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 3px; background: linear-gradient(135deg,#cc0000,#ff1a1a); color: #fff; font-family: 'Orbitron', monospace; font-size: 12px; font-weight: 900; text-decoration: none; letter-spacing: .08em; box-shadow: 0 4px 16px rgba(255,0,0,.3); }
.rc-footer-copy { font-size: 11px; color: rgba(255,30,30,.2); margin-top: 16px; font-family: 'Orbitron', monospace; }

@media (max-width: 800px) { .rc-layout { grid-template-columns: 1fr; gap: 32px; } .rc-inv-wrap { position: static; } }
@media (max-width: 480px) { .rc-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieBotezBaietiMasina() {
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
        body: JSON.stringify({ fields, template: 'invitatie-botez-baieti-masina' }),
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
    <div key={i} className="rc-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="rc-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="rc">

        {showAlert && (
          <div className="rc-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="rc-alert-box" onClick={e => e.stopPropagation()}>
              <div className="rc-alert-icon">🏎️</div>
              <h3 className="rc-alert-title">🏁 LIGHTS OUT!</h3>
              <p className="rc-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate după descărcare.
              </p>
              <div className="rc-alert-btns">
                <button className="rc-alert-cancel" onClick={() => setShowAlert(false)}>ABORT</button>
                <button className="rc-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  🏁 GO GO GO!
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="rc-topbar">
          <Link href="/" className="rc-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="rc-back-btn">← PIT LANE</Link>
        </header>

        <div className="rc-inner">
          <div className="rc-title">
            <h1>🏎️ BOTEZ — RACING EDITION</h1>
            <p>Personalizează și previzualizează în timp real</p>
          </div>

          <div className="rc-layout">
            <div className="rc-inv-wrap">
              <div className="rc-inv-ratio">
                <div className="rc-inv-inner">
                  <div className="rc-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="rc-inv">
                      <RacingBg />
                      <div className="rc-content">
                        <div className="rc-top">
                          <p className="rc-announce">⚑ OFFICIAL ANNOUNCEMENT ⚑</p>
                          <div style={{ width:'100%', height:'2px', background:'linear-gradient(90deg,transparent,#ff1a1a,transparent)', marginBottom:'14px' }} />
                          <p className="rc-pilot">PILOT ÎN DEVENIRE</p>
                        </div>
                        <div className="rc-flex1" />
                        <div className="rc-bottom">
                          <p className="rc-botez-label">BOTEZ</p>
                          <span className="rc-baby-name">{fields.babyName || 'LUCA'}</span>
                          <div className="rc-div-line">
                            <div className="rc-div-line-bar rc-div-line-bar-l" />
                            <span style={{ fontFamily:"'Orbitron',monospace", fontSize:'18px', color:'#ffd700', textShadow:'0 0 10px #ffd700' }}>★</span>
                            <div className="rc-div-line-bar rc-div-line-bar-r" />
                          </div>
                          <p className="rc-sub-text">a coborât în circuit!</p>

                          <div className="rc-info-grid">
                            <div className="rc-col-left">
                              <p className="rc-info-label">ECHIPA</p>
                              <p className="rc-info-val">{fields.parents}</p>
                              <p className="rc-info-label">SPONSORI</p>
                              <p className="rc-info-val">{fields.godparents}</p>
                            </div>
                            <div className="rc-col-right">
                              <p className="rc-info-label-gold">🕊 CIRCUIT #1</p>
                              <p className="rc-event-name">{fields.church || 'Biserica'}</p>
                              <p className="rc-event-detail">{formatDate(fields.churchDate) || fields.churchDate}<br />Ora {fields.churchTime}</p>
                              <p className="rc-info-label-gold">🏆 CIRCUIT #2</p>
                              <p className="rc-event-name">{fields.restaurant || 'Restaurantul'}</p>
                              <p className="rc-event-detail">{formatDate(fields.restaurantDate) || fields.restaurantDate}<br />Ora {fields.restaurantTime}</p>
                            </div>
                          </div>

                          <div className="rc-sep-full" />
                          <p className="rc-contact-label">🏁 BOX RADIO — RSVP</p>
                          <p className="rc-contact-val">{fields.contact}</p>
                        </div>
                      </div>
                      <div className="rc-wm">
                        <div className="rc-wm-grid">{WM_TEXTS}</div>
                        <div className="rc-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rc-form">
              <h2>🏎️ PERSONALIZEAZĂ</h2>

              <div className="rc-section">
                <p className="rc-sl">Prenume Copil</p>
                <div className="rc-g1">
                  <input className="rc-input" placeholder="ex: LUCA" value={fields.babyName} onChange={set('babyName')} />
                </div>
              </div>
              <div className="rc-section">
                <p className="rc-sl">Părinți (Echipa)</p>
                <div className="rc-g1">
                  <input className="rc-input" placeholder="ex: Elena și Andrei Popescu" value={fields.parents} onChange={set('parents')} />
                </div>
              </div>
              <div className="rc-section">
                <p className="rc-sl">Nași (Sponsori)</p>
                <div className="rc-g1">
                  <input className="rc-input" placeholder="ex: Maria și Cristian Ionescu" value={fields.godparents} onChange={set('godparents')} />
                </div>
              </div>
              <div className="rc-section">
                <p className="rc-sl">Circuit #1 — Botez</p>
                <div className="rc-g1">
                  <input className="rc-input" placeholder="ex: Biserica Sf. Nicolae" value={fields.church} onChange={set('church')} />
                </div>
              </div>
              <div className="rc-section">
                <p className="rc-sl">Botez — Dată & Ora</p>
                <div className="rc-g2">
                  <div className="rc-dw">
                    <input className="rc-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.churchDate)} />
                    <span className="rc-ci">📅</span>
                    <input className="rc-dn" type="date" value={fields.churchDate} onChange={e => setFields(f => ({ ...f, churchDate: e.target.value }))} />
                  </div>
                  <div className="rc-iw">
                    <input className="rc-input" type="text" placeholder="11:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="rc-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="rc-section">
                <p className="rc-sl">Circuit #2 — Petrecere</p>
                <div className="rc-g1">
                  <input className="rc-input" placeholder="ex: Restaurant La Conac" value={fields.restaurant} onChange={set('restaurant')} />
                </div>
              </div>
              <div className="rc-section">
                <p className="rc-sl">Petrecere — Dată & Ora</p>
                <div className="rc-g2">
                  <div className="rc-dw">
                    <input className="rc-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.restaurantDate)} />
                    <span className="rc-ci">📅</span>
                    <input className="rc-dn" type="date" value={fields.restaurantDate} onChange={e => setFields(f => ({ ...f, restaurantDate: e.target.value }))} />
                  </div>
                  <div className="rc-iw">
                    <input className="rc-input" type="text" placeholder="13:00" maxLength={5} value={fields.restaurantTime} onChange={e => setFields(f => ({ ...f, restaurantTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="rc-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="rc-section">
                <p className="rc-sl">Box Radio — Contact</p>
                <div className="rc-g1">
                  <input className="rc-input" type="tel" placeholder="ex: 0700 000 000" value={fields.contact} onChange={set('contact')} />
                </div>
              </div>

              {error && <div className="rc-error">⚠️ {error}</div>}

              <button className="rc-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'SE PROCESEAZĂ...' : '🏁 PLĂTEȘTE 30 LEI — LIGHTS OUT!'}
              </button>
              <p className="rc-pay-note">Watermark dispare după plată · PDF + JPG incluse · Stripe secured</p>
              <div className="rc-guarantee">
                <div className="rc-gi"><span>★</span> Download instant</div>
                <div className="rc-gi"><span>★</span> PDF + JPG</div>
                <div className="rc-gi"><span>★</span> 30 lei · o dată</div>
                <div className="rc-gi"><span>★</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="rc-footer">
          <p className="rc-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="rc-footer-btn">🏁 Pit Lane — Toate modelele</Link>
          <p className="rc-footer-copy">© {new Date().getFullYear()} VibeInvite · RACING EDITION</p>
        </footer>
      </div>
    </>
  )
}
