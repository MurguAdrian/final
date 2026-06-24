'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const MONTHS_UP = ['IANUARIE','FEBRUARIE','MARTIE','APRILIE','MAI','IUNIE','IULIE','AUGUST','SEPTEMBRIE','OCTOMBRIE','NOIEMBRIE','DECEMBRIE']
const MONTHS    = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS      = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return ''
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_UP[d.getMonth()]} ${d.getFullYear()}`
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
function getInitials(groom: string, bride: string) {
  return [(groom || 'M').charAt(0).toUpperCase(), (bride || 'S').charAt(0).toUpperCase()]
}

interface Fields {
  bride: string; groom: string; parentsGroom: string; parentsBride: string
  nasi: string; weddingDate: string; church: string; churchTime: string
  restaurant: string; restTime: string; rsvpDate: string; rsvpTel: string
}

const DEFAULTS: Fields = {
  bride: 'Ștefan', groom: 'Miruna',
  parentsGroom: 'Elena și Constantin Vasiliu', parentsBride: 'Ana și Gheorghe Ionescu',
  nasi: 'Mihaela și Florin Popescu',
  weddingDate: '2024-09-14', church: 'Biserica "Sfântul Gheorghe" — Onești', churchTime: '14:00',
  restaurant: 'Restaurant "Vatra Boierească"', restTime: '18:00',
  rsvpDate: '2024-09-15', rsvpTel: 'www.eliza&theo.wedding',
}

// ── Componente SVG reutilizabile ──────────────────────────────────────────────

const CoralWreath = ({ init1, init2 }: { init1: string; init2: string }) => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" fill="none">
    <defs>
      <radialGradient id="cr-b1" cx="30%" cy="25%" r="70%">
        <stop offset="0%" stopColor="#4a2d7a" stopOpacity=".7"/>
        <stop offset="40%" stopColor="#6a3a9a" stopOpacity=".5"/>
        <stop offset="100%" stopColor="#3a1a6a" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cr-b2" cx="70%" cy="25%" r="70%">
        <stop offset="0%" stopColor="#c87040" stopOpacity=".65"/>
        <stop offset="40%" stopColor="#d4884a" stopOpacity=".45"/>
        <stop offset="100%" stopColor="#b85a20" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cr-b3" cx="20%" cy="80%" r="60%">
        <stop offset="0%" stopColor="#1a5a4a" stopOpacity=".6"/>
        <stop offset="100%" stopColor="#2a7a5a" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cr-b4" cx="80%" cy="80%" r="60%">
        <stop offset="0%" stopColor="#5a2a7a" stopOpacity=".65"/>
        <stop offset="100%" stopColor="#3a1a5a" stopOpacity="0"/>
      </radialGradient>
      <filter id="cr-blur-sm"><feGaussianBlur stdDeviation="8"/></filter>
      <filter id="cr-blur-md"><feGaussianBlur stdDeviation="14"/></filter>
    </defs>

    {/* Pete acuarela */}
    <ellipse cx="140" cy="200" rx="180" ry="140" fill="url(#cr-b1)" filter="url(#cr-blur-md)" opacity=".85"/>
    <ellipse cx="80" cy="280" rx="120" ry="100" fill="#5a2a8a" opacity=".4" filter="url(#cr-blur-sm)"/>
    <ellipse cx="660" cy="180" rx="160" ry="130" fill="url(#cr-b2)" filter="url(#cr-blur-md)" opacity=".85"/>
    <ellipse cx="720" cy="260" rx="110" ry="90" fill="#c86840" opacity=".4" filter="url(#cr-blur-sm)"/>
    <ellipse cx="120" cy="900" rx="160" ry="120" fill="url(#cr-b3)" filter="url(#cr-blur-md)" opacity=".8"/>
    <ellipse cx="680" cy="880" rx="150" ry="120" fill="url(#cr-b4)" filter="url(#cr-blur-md)" opacity=".8"/>

    {/* Feriga stanga */}
    <g opacity=".9">
      <path d="M50 80 Q120 140 80 240 Q60 290 90 340" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
      {[140,165,190,215,238].map((y,i) => (<g key={i}>
        <path d={`M${80-i} ${y} Q${50-i*2} ${y-13} ${35-i*2} ${y-26}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
        <path d={`M${80-i} ${y} Q${108+i} ${y-12} ${118+i} ${y-25}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
      </g>))}
    </g>
    {/* Eucalipt stanga */}
    <g opacity=".85">
      <path d="M20 180 Q80 220 60 320 Q50 370 80 420" stroke="#4a6a3a" strokeWidth="1.2" fill="none"/>
      {[[45,220,-30],[55,255,15],[48,290,-20],[60,325,25],[52,358,-15],[65,390,20]].map(([cx,cy,r],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="22" ry="10" fill="#5a7a44" opacity=".65" transform={`rotate(${r} ${cx} ${cy})`}/>
      ))}
    </g>
    {/* Frunze mov stanga */}
    <g opacity=".8">
      <ellipse cx="100" cy="120" rx="35" ry="14" fill="#4a1a6a" opacity=".6" transform="rotate(-40 100 120)"/>
      <ellipse cx="140" cy="95" rx="30" ry="12" fill="#5a2a7a" opacity=".55" transform="rotate(-60 140 95)"/>
      <ellipse cx="75" cy="150" rx="32" ry="13" fill="#3a1258" opacity=".55" transform="rotate(-25 75 150)"/>
      <ellipse cx="165" cy="130" rx="28" ry="11" fill="#4a1a6a" opacity=".5" transform="rotate(-50 165 130)"/>
    </g>
    {/* Flori coral stanga */}
    <g opacity=".85">
      <circle cx="180" cy="105" r="10" fill="#e8783a" opacity=".8"/>
      <circle cx="168" cy="90" r="7" fill="#f0904a" opacity=".7"/>
      <circle cx="195" cy="88" r="6" fill="#d86030" opacity=".75"/>
      <circle cx="130" cy="78" r="5" fill="#e87030" opacity=".7"/>
      <circle cx="148" cy="70" r="4" fill="#f0884a" opacity=".65"/>
    </g>

    {/* Mirror dreapta */}
    <g transform="translate(794,0) scale(-1,1)">
      <g opacity=".9">
        <path d="M50 80 Q120 140 80 240 Q60 290 90 340" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
        {[140,165,190,215,238].map((y,i) => (<g key={i}>
          <path d={`M${80-i} ${y} Q${50-i*2} ${y-13} ${35-i*2} ${y-26}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
          <path d={`M${80-i} ${y} Q${108+i} ${y-12} ${118+i} ${y-25}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
        </g>))}
      </g>
      <g opacity=".85">
        <path d="M20 180 Q80 220 60 320 Q50 370 80 420" stroke="#4a6a3a" strokeWidth="1.2" fill="none"/>
        {[[45,220,30],[55,255,-15],[48,290,20],[60,325,-25],[52,358,15]].map(([cx,cy,r],i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="22" ry="10" fill="#5a7a44" opacity=".65" transform={`rotate(${r} ${cx} ${cy})`}/>
        ))}
      </g>
      <g opacity=".8">
        <ellipse cx="100" cy="120" rx="35" ry="14" fill="#4a1a6a" opacity=".6" transform="rotate(40 100 120)"/>
        <ellipse cx="140" cy="95" rx="30" ry="12" fill="#5a2a7a" opacity=".55" transform="rotate(60 140 95)"/>
        <ellipse cx="75" cy="150" rx="32" ry="13" fill="#3a1258" opacity=".55" transform="rotate(25 75 150)"/>
      </g>
      <g opacity=".85">
        <circle cx="180" cy="105" r="10" fill="#e8783a" opacity=".8"/>
        <circle cx="168" cy="90" r="7" fill="#f0904a" opacity=".7"/>
        <circle cx="195" cy="88" r="6" fill="#d86030" opacity=".75"/>
        <circle cx="130" cy="78" r="5" fill="#e87030" opacity=".7"/>
      </g>
    </g>

    {/* Jos stanga */}
    <g opacity=".88" transform="translate(0,1123) scale(1,-1)">
      <path d="M30 60 Q100 100 80 200 Q65 250 100 300" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
      {[110,140,168].map((y,i) => (<g key={i}>
        <path d={`M80 ${y} Q${50-i*4} ${y-15} ${35-i*4} ${y-28}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
        <path d={`M80 ${y} Q${108+i*4} ${y-12} ${118+i*4} ${y-24}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
      </g>))}
      <ellipse cx="50" cy="185" rx="26" ry="11" fill="#5a7a4a" opacity=".65" transform="rotate(-20 50 185)"/>
      <ellipse cx="70" cy="220" rx="24" ry="10" fill="#4a6a38" opacity=".6" transform="rotate(18 70 220)"/>
      <ellipse cx="90" cy="115" rx="34" ry="14" fill="#4a1a6a" opacity=".55" transform="rotate(-42 90 115)"/>
      <ellipse cx="130" cy="90" rx="30" ry="12" fill="#5a2a7a" opacity=".5" transform="rotate(-62 130 90)"/>
      <circle cx="160" cy="80" r="9" fill="#e8783a" opacity=".75"/>
      <circle cx="148" cy="65" r="6" fill="#f0904a" opacity=".65"/>
      <circle cx="120" cy="70" r="5" fill="#e87030" opacity=".65"/>
    </g>
    <g opacity=".88" transform="translate(794,1123) scale(-1,-1)">
      <path d="M30 60 Q100 100 80 200 Q65 250 100 300" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
      {[110,140,168].map((y,i) => (<g key={i}>
        <path d={`M80 ${y} Q${50-i*4} ${y-15} ${35-i*4} ${y-28}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
        <path d={`M80 ${y} Q${108+i*4} ${y-12} ${118+i*4} ${y-24}`} stroke="#3a5a28" strokeWidth="1" fill="none"/>
      </g>))}
      <ellipse cx="50" cy="185" rx="26" ry="11" fill="#5a7a4a" opacity=".65" transform="rotate(20 50 185)"/>
      <ellipse cx="90" cy="115" rx="34" ry="14" fill="#4a1a6a" opacity=".55" transform="rotate(42 90 115)"/>
      <ellipse cx="130" cy="90" rx="30" ry="12" fill="#5a2a7a" opacity=".5" transform="rotate(62 130 90)"/>
      <circle cx="160" cy="80" r="9" fill="#e8783a" opacity=".75"/>
      <circle cx="148" cy="65" r="6" fill="#f0904a" opacity=".65"/>
    </g>

    {/* Monograma hexagonala */}
    <g transform="translate(397,130)">
      <polygon points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26" fill="none" stroke="#b8860b" strokeWidth="1.8" opacity=".9"/>
      <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22" fill="none" stroke="#b8860b" strokeWidth="1" opacity=".5"/>
      <path d="M-12,-50 Q-6,-62 0,-58 Q6,-62 12,-50" stroke="#b8860b" strokeWidth="1.2" fill="none" opacity=".8"/>
      <text x="0" y="-8" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fontStyle="italic" fill="#b8860b" opacity=".95">{init1}</text>
      <text x="0" y="22" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fontStyle="italic" fill="#b8860b" opacity=".95">{init2}</text>
    </g>
  </svg>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400;1,600&family=Raleway:wght@300;400;500;600&family=Cinzel:wght@400;600&display=swap');

.cr * { box-sizing: border-box; margin: 0; padding: 0; }
.cr { font-family: 'Raleway', sans-serif; background: #f0ece4; color: #1a1208; min-height: 100vh; }

.cr-topbar { background: #fff; border-bottom: 1px solid rgba(184,134,11,.2); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.cr-topbar-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #1a1208; text-decoration: none; font-weight: 600; }
.cr-topbar-logo span { color: #b8860b; }
.cr-topbar-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #b8860b; color: #6b4c1e; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: #fff; transition: background .2s, color .2s; }
.cr-topbar-btn:hover { background: #b8860b; color: #fff; }

.cr-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.cr-title { text-align: center; margin-bottom: 40px; }
.cr-title h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px,3vw,30px); font-weight: 400; font-style: italic; color: #1a1208; margin-bottom: 8px; }
.cr-title p { font-size: 11px; color: rgba(26,18,8,.5); letter-spacing: .1em; text-transform: uppercase; }

.cr-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.cr-inv-wrap { position: sticky; top: 72px; }
.cr-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.cr-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.cr-inv-inner { position: absolute; inset: 0; }
.cr-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

/* ── INVITATIE ── */
.cr-inv {
  width: 794px; height: 1123px; background: #faf8f5;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: center;
}
.cr-mono-space { height: 230px; flex-shrink: 0; }
.cr-content { position: relative; z-index: 3; text-align: center; width: 100%; padding: 0 80px; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }

.cr-inv-title { font-size: 13px; font-weight: 600; letter-spacing: .28em; text-transform: uppercase; color: #6b4c1e; margin-bottom: 16px; }
.cr-name-groom { font-family: 'Playfair Display', serif; font-size: 84px; font-weight: 700; font-style: italic; color: #1a1208; line-height: 1; display: block; }
.cr-amp { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 400; font-style: italic; color: #b8860b; display: inline-block; line-height: 1; }
.cr-name-bride { font-family: 'Playfair Display', serif; font-size: 84px; font-weight: 700; font-style: italic; color: #1a1208; line-height: 1; display: block; }
.cr-ornament { color: #b8860b; font-size: 22px; opacity: .7; margin: 6px 0 14px; display: block; }
.cr-tagline { font-size: 18px; font-weight: 300; font-style: italic; color: #4a3a2a; letter-spacing: .04em; margin-bottom: 20px; }
.cr-info-box { border: 1.5px solid #b8860b; border-radius: 2px; padding: 14px 32px; margin-bottom: 20px; background: rgba(255,255,255,.5); width: 100%; }
.cr-info-date { font-size: 17px; font-weight: 600; letter-spacing: .08em; color: #1a1208; text-transform: uppercase; margin-bottom: 6px; }
.cr-info-line { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: #2a1a0a; line-height: 1.6; }
.cr-sep { width: 60px; height: 1px; background: #b8860b; opacity: .4; margin: 14px auto; }
.cr-section-label { font-size: 11px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: #6b4c1e; margin-bottom: 4px; }
.cr-section-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-style: italic; color: #1a1208; line-height: 1.5; margin-bottom: 10px; }
.cr-rsvp { font-size: 13px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: #6b4c1e; margin-top: 14px; line-height: 1.8; }
.cr-rsvp-web { font-size: 14px; font-style: italic; color: #b8860b; font-family: 'Cormorant Garamond', serif; }

/* Watermark */
.cr-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.cr-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.cr-wm-row { display: flex; white-space: nowrap; }
.cr-wm-item { font-size: 14px; letter-spacing: .1em; color: #b8860b; opacity: .08; padding: 28px 30px; white-space: nowrap; user-select: none; }
.cr-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(184,134,11,.1); border-top: 1px solid rgba(184,134,11,.25); padding: 8px 10px; text-align: center; font-size: 11px; color: #6b4c1e; letter-spacing: .06em; z-index: 25; }

/* FORM */
.cr-form h2 { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .14em; color: #1a1208; margin-bottom: 24px; text-transform: uppercase; border-bottom: 1px solid rgba(184,134,11,.25); padding-bottom: 10px; }
.cr-section { margin-bottom: 18px; }
.cr-section-label-form { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: #b8860b; margin-bottom: 7px; }
.cr-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.cr-grid1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.cr-input { width: 100%; padding: 9px 12px; font-size: 13px; border: 1px solid rgba(184,134,11,.22); border-radius: 6px; background: #fff; color: #1a1208; font-family: 'Raleway', sans-serif; outline: none; transition: border-color .2s; font-weight: 300; }
.cr-input:focus { border-color: #b8860b; }
.cr-input::placeholder { color: rgba(26,18,8,.3); font-style: italic; }
.cr-date-wrap { position: relative; display: flex; align-items: center; }
.cr-date-wrap .cr-input { padding-right: 40px; }
.cr-date-native { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.cr-cal-icon { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #b8860b; }
.cr-input-wrap { position: relative; }
.cr-input-hint { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(26,18,8,.3); pointer-events: none; }
.cr-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.cr-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: #b8860b; color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: background .2s; }
.cr-pay-btn:hover { background: #9a7009; }
.cr-pay-btn:disabled { opacity: .6; cursor: not-allowed; }
.cr-pay-note { font-size: 11px; color: rgba(26,18,8,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.cr-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(184,134,11,.05); border: 1px solid rgba(184,134,11,.15); border-radius: 8px; }
.cr-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(26,18,8,.6); }
.cr-gi span { font-size: 14px; }

.cr-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.cr-alert-box { background: #fff; border: 1px solid rgba(184,134,11,.2); border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.18); }
.cr-alert-icon { font-size: 36px; margin-bottom: 12px; }
.cr-alert-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 600; color: #1a1208; letter-spacing: .08em; margin-bottom: 14px; }
.cr-alert-text { font-size: 13px; color: rgba(26,18,8,.65); line-height: 1.8; font-style: italic; margin-bottom: 24px; }
.cr-alert-text strong { font-style: normal; color: #1a1208; }
.cr-alert-btns { display: flex; gap: 10px; }
.cr-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(184,134,11,.25); border-radius: 8px; background: #fff; color: rgba(26,18,8,.5); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.cr-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: #b8860b; color: #fff; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600; cursor: pointer; }
.cr-alert-cancel:hover { background: rgba(184,134,11,.06); }
.cr-alert-confirm:hover { background: #9a7009; }

.cr-footer { border-top: 1px solid rgba(184,134,11,.15); background: #fff; padding: 28px 24px; text-align: center; }
.cr-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(26,18,8,.45); margin-bottom: 14px; }
.cr-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: #b8860b; color: #fff; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600; text-decoration: none; transition: background .2s; }
.cr-footer-btn:hover { background: #9a7009; }
.cr-footer-copy { font-size: 11px; color: rgba(26,18,8,.3); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .cr-layout { grid-template-columns: 1fr; gap: 32px; } .cr-inv-wrap { position: static; } }
@media (max-width: 480px) { .cr-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieNuntaImgCoral() {
  const [fields, setFields] = useState<Fields>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const weddingDateFormatted = formatDate(fields.weddingDate)
  const rsvpFormatted = formatRsvp(fields.rsvpDate)
  const [init1, init2] = getInitials(fields.groom, fields.bride)

  const handlePay = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/invitatii-pdf/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, template: 'invitatie-nunta-img-coral' }),
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
    <div key={i} className="cr-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="cr-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cr">

        {showAlert && (
          <div className="cr-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="cr-alert-box" onClick={e => e.stopPropagation()}>
              <div className="cr-alert-icon">⚠️</div>
              <h3 className="cr-alert-title">Înainte să continui</h3>
              <p className="cr-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate sau nedistribuite după descărcare.
              </p>
              <div className="cr-alert-btns">
                <button className="cr-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="cr-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  Am înțeles, continuă
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="cr-topbar">
          <Link href="/" className="cr-topbar-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="cr-topbar-btn">← Alege alt model</Link>
        </header>

        <div className="cr-inner">
          <div className="cr-title">
            <h1>Invitație Nuntă — Botanică Mov &amp; Coral</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="cr-layout">
            <div className="cr-inv-wrap">
              <div className="cr-inv-ratio">
                <div className="cr-inv-inner">
                  <div className="cr-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="cr-inv">
                      <CoralWreath init1={init1} init2={init2} />
                      <div className="cr-mono-space" />
                      <div className="cr-content">
                        <p className="cr-inv-title">INVITAȚIE DE NUNTĂ</p>
                        <span className="cr-name-groom">{fields.groom || 'Miruna'}</span>
                        <span className="cr-amp">&amp;</span>
                        <span className="cr-name-bride">{fields.bride || 'Ștefan'}</span>
                        <span className="cr-ornament">❧</span>
                        <p className="cr-tagline">vă invită cu dragoste la nuntă</p>
                        <div className="cr-info-box">
                          <p className="cr-info-date">{weddingDateFormatted || 'Data nunții'}</p>
                          <p className="cr-info-line">Ora {fields.churchTime} / {fields.church || 'Biserica'}</p>
                          <p className="cr-info-line">Ora {fields.restTime} / {fields.restaurant || 'Restaurantul'}</p>
                        </div>
                        <div className="cr-sep" />
                        <p className="cr-section-label">Părinții Miresei</p>
                        <p className="cr-section-val">{fields.parentsBride}</p>
                        <p className="cr-section-label">Părinții Mirelui</p>
                        <p className="cr-section-val">{fields.parentsGroom}</p>
                        <p className="cr-section-label">Nașii</p>
                        <p className="cr-section-val">{fields.nasi}</p>
                        <p className="cr-rsvp">VĂ RUGĂM SĂ CONFIRMAȚI PÂNĂ LA <strong>{rsvpFormatted || fields.rsvpDate}</strong></p>
                        <p className="cr-rsvp-web">{fields.rsvpTel}</p>
                      </div>
                      <div className="cr-wm">
                        <div className="cr-wm-grid">{WM_TEXTS}</div>
                        <div className="cr-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cr-form">
              <h2>Personalizează invitația</h2>
              <div className="cr-section">
                <p className="cr-section-label-form">Miri</p>
                <div className="cr-grid2">
                  <input className="cr-input" placeholder="Prenume mireasă" value={fields.bride} onChange={set('bride')} />
                  <input className="cr-input" placeholder="Prenume mire" value={fields.groom} onChange={set('groom')} />
                </div>
              </div>
              <div className="cr-section">
                <p className="cr-section-label-form">Părinți mire</p>
                <div className="cr-grid1">
                  <input className="cr-input" placeholder="ex: Ion și Maria Popescu" value={fields.parentsGroom} onChange={set('parentsGroom')} />
                </div>
              </div>
              <div className="cr-section">
                <p className="cr-section-label-form">Părinți mireasă</p>
                <div className="cr-grid1">
                  <input className="cr-input" placeholder="ex: Gheorghe și Elena Ionescu" value={fields.parentsBride} onChange={set('parentsBride')} />
                </div>
              </div>
              <div className="cr-section">
                <p className="cr-section-label-form">Nași de cununie</p>
                <div className="cr-grid1">
                  <input className="cr-input" placeholder="ex: Mihai și Cristina Dumitrescu" value={fields.nasi} onChange={set('nasi')} />
                </div>
              </div>
              <div className="cr-section">
                <p className="cr-section-label-form">Data nunții</p>
                <div className="cr-grid1">
                  <div className="cr-date-wrap">
                    <input className="cr-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.weddingDate)} />
                    <span className="cr-cal-icon">📅</span>
                    <input className="cr-date-native" type="date" value={fields.weddingDate} onChange={e => setFields(f => ({ ...f, weddingDate: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="cr-section">
                <p className="cr-section-label-form">Cununie religioasă</p>
                <div className="cr-grid2">
                  <input className="cr-input" placeholder="Numele bisericii" value={fields.church} onChange={set('church')} />
                  <div className="cr-input-wrap">
                    <input className="cr-input" type="text" placeholder="14:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="cr-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="cr-section">
                <p className="cr-section-label-form">Recepție</p>
                <div className="cr-grid2">
                  <input className="cr-input" placeholder="Numele restaurantului" value={fields.restaurant} onChange={set('restaurant')} />
                  <div className="cr-input-wrap">
                    <input className="cr-input" type="text" placeholder="18:00" maxLength={5} value={fields.restTime} onChange={e => setFields(f => ({ ...f, restTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="cr-input-hint">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="cr-section">
                <p className="cr-section-label-form">RSVP / Website</p>
                <div className="cr-grid2">
                  <div className="cr-date-wrap">
                    <input className="cr-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.rsvpDate)} />
                    <span className="cr-cal-icon">📅</span>
                    <input className="cr-date-native" type="date" value={fields.rsvpDate} onChange={e => setFields(f => ({ ...f, rsvpDate: e.target.value }))} />
                  </div>
                  <input className="cr-input" type="text" placeholder="website sau telefon" value={fields.rsvpTel} onChange={set('rsvpTel')} />
                </div>
              </div>

              {error && <div className="cr-error">⚠️ {error}</div>}

              <button className="cr-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🔒 Plătește 30 lei și descarcă'}
              </button>
              <p className="cr-pay-note">Watermark dispare după plată · PDF + JPG incluse<br />Plată securizată prin Stripe</p>
              <div className="cr-guarantee">
                <div className="cr-gi"><span>✓</span> Download instant</div>
                <div className="cr-gi"><span>✓</span> PDF + JPG</div>
                <div className="cr-gi"><span>✓</span> Plată unică 30 lei</div>
                <div className="cr-gi"><span>✓</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="cr-footer">
          <p className="cr-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="cr-footer-btn">← Vezi toate modelele</Link>
          <p className="cr-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
