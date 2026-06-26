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
  bride: 'Andreea', groom: 'Adrian',
  parentsGroom: 'Ion și Maria Popescu', parentsBride: 'Gheorghe și Elena Ionescu',
  nasi: 'Mihai și Cristina Dumitrescu',
  weddingDate: '2025-09-14', church: 'Catedrala Sf. Iosif', churchTime: '16:00',
  restaurant: 'Château des Étoiles', restTime: '19:00',
  rsvpDate: '2025-08-01', rsvpTel: '0700 000 000',
}

// ── SVG Fundal celestial ──────────────────────────────────────────────────────
const CelestialBg = () => {
  const stars = Array.from({ length: 220 }, (_, i) => ({
    x: ((i * 137.508 + 47) % 794).toFixed(1),
    y: ((i * 97.3 + 23) % 1123).toFixed(1),
    r: i % 7 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.7,
    op: (0.3 + (i % 10) * 0.07).toFixed(2),
  }))
  const brightStars = [
    { x: 120, y: 180 }, { x: 680, y: 140 }, { x: 400, y: 80 },
    { x: 80, y: 400 }, { x: 720, y: 380 }, { x: 200, y: 900 },
    { x: 650, y: 920 }, { x: 380, y: 980 },
  ]
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123">
      <defs>
        <radialGradient id="ss-space" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#0d1535"/>
          <stop offset="40%" stopColor="#080c22"/>
          <stop offset="100%" stopColor="#030508"/>
        </radialGradient>
        <radialGradient id="ss-neb1" cx="25%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#1a2860" stopOpacity=".6"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="ss-neb2" cx="75%" cy="75%" r="55%">
          <stop offset="0%" stopColor="#2a1050" stopOpacity=".5"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="ss-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c840"/>
          <stop offset="25%" stopColor="#f8e870"/>
          <stop offset="50%" stopColor="#c8a020"/>
          <stop offset="75%" stopColor="#f0d050"/>
          <stop offset="100%" stopColor="#d4b030"/>
        </linearGradient>
        <radialGradient id="ss-copper" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c87040"/>
          <stop offset="40%" stopColor="#a85020"/>
          <stop offset="100%" stopColor="#6a2c08"/>
        </radialGradient>
        <filter id="ss-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="ss-soft"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="ss-sglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="ss-vign" cx="50%" cy="50%" r="70%">
          <stop offset="55%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#020408" stopOpacity=".75"/>
        </radialGradient>
        <linearGradient id="ss-tf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030508" stopOpacity=".6"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="ss-bf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#030508" stopOpacity=".6"/>
        </linearGradient>
      </defs>
      <rect width="794" height="1123" fill="url(#ss-space)"/>
      <ellipse cx="200" cy="220" rx="340" ry="260" fill="url(#ss-neb1)"/>
      <ellipse cx="600" cy="860" rx="300" ry="240" fill="url(#ss-neb2)"/>
      <path d="M0 350 Q200 300 397 320 Q594 340 794 280" stroke="#3040a0" strokeWidth="80" fill="none" opacity=".06" filter="url(#ss-soft)"/>
      {/* Stele */}
      {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f0d880" opacity={s.op}/>)}
      {/* Stele stralucitoare */}
      {brightStars.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="3" fill="#f8e890" opacity=".9"/>
          <line x1={s.x-10} y1={s.y} x2={s.x+10} y2={s.y} stroke="#f8e890" strokeWidth=".6" opacity=".5"/>
          <line x1={s.x} y1={s.y-10} x2={s.x} y2={s.y+10} stroke="#f8e890" strokeWidth=".6" opacity=".5"/>
          <line x1={s.x-7} y1={s.y-7} x2={s.x+7} y2={s.y+7} stroke="#f8e890" strokeWidth=".4" opacity=".3"/>
          <line x1={s.x+7} y1={s.y-7} x2={s.x-7} y2={s.y+7} stroke="#f8e890" strokeWidth=".4" opacity=".3"/>
        </g>
      ))}
      {/* Constelatie Orion */}
      <g opacity=".55" filter="url(#ss-sglow)">
        {[[110,230,2.5],[145,195,2],[160,220,2.5],[125,258,2],[155,270,2],[100,290,1.8],[170,245,1.8],[128,240,1.5],[140,240,1.5],[152,240,1.5]].map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={i>=7?"#f8f0a0":"#f0d880"}/>
        ))}
        {[[110,230,145,195],[145,195,160,220],[110,230,128,240],[160,220,152,240],[128,240,100,290],[152,240,170,245],[100,290,125,258],[170,245,155,270]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a840" strokeWidth=".7" opacity=".4"/>
        ))}
      </g>
      {/* Cassiopeia */}
      <g opacity=".5" filter="url(#ss-sglow)">
        {[[640,170,2.2],[665,148,2.5],[690,162,2.2],[715,145,2.5],[738,160,2]].map(([cx,cy,r],i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#f0d880"/>)}
        {[[640,170,665,148],[665,148,690,162],[690,162,715,145],[715,145,738,160]].map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a840" strokeWidth=".7" opacity=".4"/>)}
      </g>
      {/* Scorpius */}
      <g opacity=".45" filter="url(#ss-sglow)">
        {[[80,820,2.5],[100,845,2],[110,868,2],[95,888,1.8],[80,905,1.8],[70,925,2],[85,942,2.2],[100,955,1.8]].map(([cx,cy,r],i) => <circle key={i} cx={cx} cy={cy} r={r} fill={i===0?"#f8a060":"#f0d880"}/>)}
        {[[80,820,100,845],[100,845,110,868],[110,868,95,888],[95,888,80,905],[80,905,70,925],[70,925,85,942],[85,942,100,955]].map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a840" strokeWidth=".6" opacity=".35"/>)}
      </g>
      {/* Fazele lunii */}
      <circle cx="260" cy="68" r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".6"/>
      <g transform="translate(310,50)"><circle r="18" fill="#c8a840" opacity=".15"/><path d="M0,-18 A18,18 0 0,1 0,18 A10,18 0 0,0 0,-18" fill="#c8a840" opacity=".65"/></g>
      <g transform="translate(360,50)"><circle r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".5"/><path d="M0,-18 A18,18 0 0,1 0,18 L0,-18" fill="#c8a840" opacity=".6"/></g>
      <circle cx="397" cy="50" r="22" fill="none" stroke="#c8a840" strokeWidth="1.5" opacity=".7" filter="url(#ss-glow)"/>
      <circle cx="397" cy="50" r="14" fill="#f0d880" opacity=".3"/>
      <g transform="translate(434,50)"><circle r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".5"/><path d="M0,-18 A18,18 0 0,0 0,18 L0,-18" fill="#c8a840" opacity=".6"/></g>
      <g transform="translate(484,50)"><circle r="18" fill="#c8a840" opacity=".15"/><path d="M0,-18 A18,18 0 0,0 0,18 A10,18 0 0,1 0,-18" fill="#c8a840" opacity=".65"/></g>
      <circle cx="534" cy="68" r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".6"/>
      {/* Chenar auriu */}
      <rect x="32" y="32" width="730" height="1059" fill="none" stroke="url(#ss-gold)" strokeWidth="1.5" opacity=".5"/>
      <rect x="44" y="44" width="706" height="1035" fill="none" stroke="url(#ss-gold)" strokeWidth=".6" opacity=".3"/>
      {/* Coltuleti */}
      <g opacity=".7" filter="url(#ss-glow)">
        <path d="M32 72 L32 32 L72 32" fill="none" stroke="url(#ss-gold)" strokeWidth="2"/>
        <circle cx="32" cy="32" r="3" fill="#f0d060"/>
        <path d="M52 32 L60 40 L52 48 L44 40 Z" fill="#f0d060" opacity=".6"/>
        <path d="M722 32 L762 32 L762 72" fill="none" stroke="url(#ss-gold)" strokeWidth="2"/>
        <circle cx="762" cy="32" r="3" fill="#f0d060"/>
        <path d="M742 32 L750 40 L742 48 L734 40 Z" fill="#f0d060" opacity=".6"/>
        <path d="M32 1051 L32 1091 L72 1091" fill="none" stroke="url(#ss-gold)" strokeWidth="2"/>
        <circle cx="32" cy="1091" r="3" fill="#f0d060"/>
        <path d="M52 1091 L60 1083 L52 1075 L44 1083 Z" fill="#f0d060" opacity=".6"/>
        <path d="M722 1091 L762 1091 L762 1051" fill="none" stroke="url(#ss-gold)" strokeWidth="2"/>
        <circle cx="762" cy="1091" r="3" fill="#f0d060"/>
        <path d="M742 1091 L750 1083 L742 1075 L734 1083 Z" fill="#f0d060" opacity=".6"/>
      </g>
      {/* Ornament stea centru sus */}
      <g transform="translate(397,100)" opacity=".65" filter="url(#ss-glow)">
        <path d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3 Z" fill="#f0d060"/>
      </g>
      {/* Sigiliu ceara cupru */}
      <g transform="translate(634,990)" filter="url(#ss-soft)">
        <ellipse cx="4" cy="6" rx="46" ry="46" fill="#000" opacity=".4"/>
        <circle r="44" fill="url(#ss-copper)"/>
        <ellipse cx="-12" cy="-16" rx="18" ry="12" fill="#e08050" opacity=".25" transform="rotate(-30)"/>
        <circle r="36" fill="none" stroke="#c06030" strokeWidth="1" opacity=".5"/>
        <circle r="22" fill="none" stroke="#f0c090" strokeWidth="1.5" opacity=".4"/>
        <path d="M-2,-18 A20,20 0 0,1 14,14 A14,20 0 0,0 -2,-18" fill="#f0c090" opacity=".7"/>
        <circle cx="12" cy="-8" r="2" fill="#f8d880" opacity=".8"/>
        <circle cx="8" cy="14" r="1.5" fill="#f8d880" opacity=".7"/>
        <circle cx="-14" cy="4" r="1.5" fill="#f8d880" opacity=".6"/>
      </g>
      {/* Vigneta + gradient sus/jos */}
      <rect width="794" height="1123" fill="url(#ss-vign)"/>
      <rect width="794" height="200" fill="url(#ss-tf)"/>
      <rect y="920" width="794" height="203" fill="url(#ss-bf)"/>
    </svg>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Raleway:wght@300;400;500&family=Cinzel:wght@400;600&display=swap');

.ss * { box-sizing: border-box; margin: 0; padding: 0; }
.ss { font-family: 'Cormorant Garamond', serif; background: #040810; color: #c8d4f0; min-height: 100vh; }

.ss-topbar { background: #040810; border-bottom: 1px solid rgba(200,168,64,.15); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.ss-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #e8d080; text-decoration: none; font-weight: 600; }
.ss-logo span { color: #c8a840; }
.ss-back-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(200,168,64,.3); color: #c8a840; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: transparent; transition: background .2s; }
.ss-back-btn:hover { background: rgba(200,168,64,.08); }

.ss-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.ss-title { text-align: center; margin-bottom: 40px; }
.ss-title h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px,3vw,32px); font-weight: 300; font-style: italic; color: #e8d080; margin-bottom: 8px; }
.ss-title p { font-size: 11px; color: rgba(200,212,240,.4); letter-spacing: .1em; text-transform: uppercase; }

.ss-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.ss-inv-wrap { position: sticky; top: 72px; }
.ss-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.ss-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.ss-inv-inner { position: absolute; inset: 0; }
.ss-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.ss-inv { width: 794px; height: 1123px; position: relative; overflow: hidden; background: #080c1a; }

.ss-content {
  position: absolute; inset: 0; z-index: 5;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  padding: 108px 88px 52px;
  text-align: center;
}
.ss-moon-row { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 18px; font-size: 20px; }
.ss-pre { font-family: 'Raleway', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: .38em; text-transform: uppercase; color: #b8a050; margin-bottom: 8px; }
.ss-orn { display: flex; align-items: center; gap: 12px; width: 100%; margin-bottom: 20px; }
.ss-orn-bar { flex: 1; height: 1px; background: linear-gradient(90deg,transparent,#c8a840,transparent); opacity: .5; }
.ss-orn-star { font-size: 14px; color: #c8a840; opacity: .7; }
.ss-together { font-family: 'Raleway', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: .28em; text-transform: uppercase; color: #7080b0; margin-bottom: 6px; }
.ss-parents { font-size: 22px; font-style: italic; color: #c8d4f0; line-height: 1.6; margin-bottom: 4px; }
.ss-nasi-label { font-family: 'Raleway', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: .28em; text-transform: uppercase; color: #b8a050; margin-bottom: 5px; margin-top: 10px; opacity: .8; }
.ss-nasi { font-size: 24px; font-style: italic; color: #c8d4f0; line-height: 1.5; margin-bottom: 14px; }
.ss-names { font-family: 'Cormorant Garamond', serif; font-size: 96px; font-weight: 300; font-style: italic; color: #f0d060; line-height: 1; text-shadow: 0 0 40px rgba(240,208,96,.25); display: block; margin-bottom: 4px; }
.ss-amp { font-size: 72px; font-weight: 300; font-style: italic; color: #c8b878; text-shadow: 0 0 20px rgba(200,184,120,.3); }
.ss-invite-sub { font-family: 'Raleway', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: .28em; text-transform: uppercase; color: #7080b0; margin-bottom: 18px; }
.ss-date { font-size: 30px; font-weight: 600; color: #e8d080; letter-spacing: .06em; text-shadow: 0 0 20px rgba(232,208,128,.2); margin-bottom: 14px; }
.ss-event-label { font-family: 'Raleway', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: .28em; text-transform: uppercase; color: #b8a050; margin-bottom: 4px; opacity: .8; }
.ss-event-val { font-size: 24px; font-style: italic; color: #c8d4f0; line-height: 1.5; margin-bottom: 3px; }
.ss-event-time { font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 300; color: #8090b8; letter-spacing: .1em; margin-bottom: 12px; }
.ss-rsvp { font-size: 18px; font-style: italic; color: #8090b8; line-height: 1.9; margin-top: 8px; }
.ss-rsvp strong { color: #c8d4f0; font-style: normal; font-weight: 400; }

/* Watermark */
.ss-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.ss-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.ss-wm-row { display: flex; white-space: nowrap; }
.ss-wm-item { font-size: 34px; letter-spacing: .1em; color: #e40e0e; opacity: .07; padding: 28px 30px; white-space: nowrap; user-select: none; }
.ss-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(8,12,26,.7); border-top: 1px solid rgba(200,168,64,.2); padding: 8px 10px; text-align: center; font-size: 11px; color: #b8a050; letter-spacing: .06em; z-index: 25; }

/* FORM */
.ss-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #e8d080; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(200,168,64,.2); padding-bottom: 10px; }
.ss-section { margin-bottom: 18px; }
.ss-sl { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #c8a840; margin-bottom: 7px; }
.ss-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ss-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.ss-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(200,168,64,.18); border-radius: 6px; background: rgba(200,212,240,.05); color: #c8d4f0; font-family: 'Raleway', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.ss-input:focus { border-color: rgba(200,168,64,.5); }
.ss-input::placeholder { color: rgba(200,212,240,.2); font-style: italic; }
.ss-dw { position: relative; display: flex; align-items: center; }
.ss-dw .ss-input { padding-right: 40px; }
.ss-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.ss-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #c8a840; }
.ss-iw { position: relative; }
.ss-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(200,212,240,.2); pointer-events: none; }
.ss-error { background: rgba(220,38,38,.12); border: 1px solid rgba(220,38,38,.3); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #ff8080; }
.ss-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: linear-gradient(135deg, #c8a020, #f0d050, #c8a020); color: #080c1a; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: opacity .2s; }
.ss-pay-btn:hover { opacity: .88; }
.ss-pay-btn:disabled { opacity: .5; cursor: not-allowed; }
.ss-pay-note { font-size: 11px; color: rgba(200,212,240,.3); text-align: center; margin-top: 8px; line-height: 1.6; }
.ss-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(200,168,64,.04); border: 1px solid rgba(200,168,64,.12); border-radius: 8px; }
.ss-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(200,212,240,.4); }
.ss-gi span { font-size: 14px; color: #c8a840; }

.ss-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.ss-alert-box { background: #0d1535; border: 1px solid rgba(200,168,64,.25); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 40px rgba(200,168,64,.05); }
.ss-alert-icon { font-size: 36px; margin-bottom: 12px; }
.ss-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #e8d080; letter-spacing: .08em; margin-bottom: 14px; }
.ss-alert-text { font-size: 13px; color: rgba(200,212,240,.6); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.ss-alert-text strong { font-style: normal; color: #c8d4f0; }
.ss-alert-btns { display: flex; gap: 10px; }
.ss-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(200,168,64,.25); border-radius: 8px; background: transparent; color: rgba(200,212,240,.4); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.ss-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: linear-gradient(135deg,#c8a020,#f0d050); color: #080c1a; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600; cursor: pointer; }
.ss-alert-cancel:hover { background: rgba(200,168,64,.06); }

.ss-footer { border-top: 1px solid rgba(200,168,64,.08); background: #040810; padding: 28px 24px; text-align: center; }
.ss-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(200,168,64,.3); margin-bottom: 14px; }
.ss-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: linear-gradient(135deg,#c8a020,#f0d050); color: #080c1a; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600; text-decoration: none; }
.ss-footer-copy { font-size: 11px; color: rgba(200,168,64,.18); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .ss-layout { grid-template-columns: 1fr; gap: 32px; } .ss-inv-wrap { position: static; } }
@media (max-width: 480px) { .ss-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieNuntaSubStele() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const dateFormatted = formatDate(fields.weddingDate)
  const rsvpFormatted = formatRsvp(fields.rsvpDate)

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatie-nunta-sub-stele' }),
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
    <div key={i} className="ss-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="ss-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  const OrnLine = ({ star = '✦', starSize = '14px' }: { star?: string; starSize?: string }) => (
    <div className="ss-orn">
      <div className="ss-orn-bar" />
      <span className="ss-orn-star" style={{ fontSize: starSize }}>{star}</span>
      <div className="ss-orn-bar" />
    </div>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ss">

        {showAlert && (
          <div className="ss-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="ss-alert-box" onClick={e => e.stopPropagation()}>
              <div className="ss-alert-icon">⚠️</div>
              <h3 className="ss-alert-title">Înainte să continui</h3>
              <p className="ss-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="ss-alert-btns">
                <button className="ss-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="ss-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="ss-topbar">
          <Link href="/" className="ss-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="ss-back-btn">← Alege alt model</Link>
        </header>

        <div className="ss-inner">
          <div className="ss-title">
            <h1>Invitație Nuntă — Sub Stele</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="ss-layout">
            <div className="ss-inv-wrap">
              <div className="ss-inv-ratio">
                <div className="ss-inv-inner">
                  <div className="ss-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="ss-inv">
                      <CelestialBg />
                      <div className="ss-content">
                        <div className="ss-moon-row">
                          <span style={{ opacity:.55 }}>🌑</span>
                          <span style={{ opacity:.5, fontSize:'18px' }}>🌒</span>
                          <span style={{ opacity:.75, fontSize:'22px' }}>🌕</span>
                          <span style={{ opacity:.5, fontSize:'18px' }}>🌘</span>
                          <span style={{ opacity:.55 }}>🌑</span>
                        </div>
                        <p className="ss-pre">Sub cerul înstelat, cu dragoste</p>
                        <OrnLine />
                        <p className="ss-together">Cu binecuvântarea părinților</p>
                        <p className="ss-parents">{fields.parentsGroom}</p>
                        <p className="ss-parents">{fields.parentsBride}</p>
                        <OrnLine star="· · ·" starSize="12px" />
                        <span className="ss-names">
                          {fields.groom || 'Mire'} <span className="ss-amp">&amp;</span> {fields.bride || 'Mireasă'}
                        </span>
                        <p className="ss-invite-sub">vă invită cu drag la nunta noastră</p>
                        <p className="ss-nasi-label">Nași de cununie</p>
                        <p className="ss-nasi">{fields.nasi}</p>
                        <OrnLine />
                        <p className="ss-date">{dateFormatted || 'Data nunții'}</p>
                        <p className="ss-event-label">Cununie Religioasă</p>
                        <p className="ss-event-val">{fields.church || 'Biserica'}</p>
                        <p className="ss-event-time">ora {fields.churchTime}</p>
                        <p className="ss-event-label">Recepție</p>
                        <p className="ss-event-val">{fields.restaurant || 'Restaurantul'}</p>
                        <p className="ss-event-time">ora {fields.restTime}</p>
                        <OrnLine star="☽" starSize="18px" />
                        <p className="ss-rsvp">
                          Confirmați prezența până la <strong>{rsvpFormatted || fields.rsvpDate}</strong><br />
                          Tel: <strong>{fields.rsvpTel}</strong>
                        </p>
                      </div>
                      <div className="ss-wm">
                        <div className="ss-wm-grid">{WM_TEXTS}</div>
                        <div className="ss-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ss-form">
              <h2>Personalizează invitația</h2>
              <div className="ss-section">
                <p className="ss-sl">Miri</p>
                <div className="ss-g2">
                  <input className="ss-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="ss-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="ss-section">
                <p className="ss-sl">Părinți mire</p>
                <div className="ss-g1">
                  <input className="ss-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="ss-section">
                <p className="ss-sl">Părinți mireasă</p>
                <div className="ss-g1">
                  <input className="ss-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="ss-section">
                <p className="ss-sl">Nași de cununie</p>
                <div className="ss-g1">
                  <input className="ss-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="ss-section">
                <p className="ss-sl">Data nunții</p>
                <div className="ss-g1">
                  <div className="ss-dw">
                    <input className="ss-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="ss-ci">📅</span>
                    <input className="ss-dn" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="ss-section">
                <p className="ss-sl">Cununie religioasă</p>
                <div className="ss-g2">
                  <input className="ss-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="ss-iw">
                    <input className="ss-input" type="text" placeholder="16:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="ss-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="ss-section">
                <p className="ss-sl">Recepție</p>
                <div className="ss-g2">
                  <input className="ss-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="ss-iw">
                    <input className="ss-input" type="text" placeholder="19:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="ss-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="ss-section">
                <p className="ss-sl">RSVP</p>
                <div className="ss-g2">
                  <div className="ss-dw">
                    <input className="ss-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="ss-ci">📅</span>
                    <input className="ss-dn" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="ss-input" type="tel" placeholder="Nr. telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="ss-error">⚠️ {error}</div>}

              <button className="ss-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '✦ Plătește 30 lei și descarcă'}
              </button>
              <p className="ss-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>
              <div className="ss-guarantee">
                <div className="ss-gi"><span>✦</span> Download instant</div>
                <div className="ss-gi"><span>✦</span> PDF + JPG</div>
                <div className="ss-gi"><span>✦</span> Plată unică 30 lei</div>
                <div className="ss-gi"><span>✦</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="ss-footer">
          <p className="ss-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="ss-footer-btn">← Vezi toate modelele</Link>
          <p className="ss-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
