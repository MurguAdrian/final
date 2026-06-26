'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.io * { box-sizing: border-box; margin: 0; padding: 0; }
.io { font-family: 'DM Sans', sans-serif; background: #FDFAF6; color: #1A1208; min-height: 100vh; overflow-x: hidden; position: relative; }

@keyframes io-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-18px) scale(1.05)} 66%{transform:translate(-12px,14px) scale(.97)} }
.io-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(90px); }
.io-o1 { width: 600px; height: 600px; background: radial-gradient(circle,rgba(255,107,0,.14) 0%,transparent 70%); top: -120px; right: -100px; animation: io-orb 14s ease-in-out infinite; }
.io-o2 { width: 350px; height: 350px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 100px; left: -80px; animation: io-orb 19s ease-in-out infinite reverse; }

@keyframes io-up      { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes io-dot     { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes io-shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
@keyframes io-tick    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes io-pulse   { 0%{transform:scale(.9);opacity:.6} 70%{transform:scale(1.5);opacity:0} 100%{transform:scale(.9);opacity:0} }
@keyframes io-card-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

.io-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; }
.io-ti-inner { display: flex; width: max-content; animation: io-tick 28s linear infinite; }
.io-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.io-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

.io-inner { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; padding: 52px 24px 80px; }

.io-hero { text-align: center; margin-bottom: 44px; opacity: 0; animation: io-up .7s ease .1s forwards; }
.io-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: io-dot 1.8s ease-in-out infinite; display: inline-block; }
.io-super { display: inline-flex; align-items: center; gap: 7px; background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px; padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500; color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px; }
.io-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px,5vw,54px); font-weight: 300; line-height: 1.1; color: #1A1208; margin-bottom: 14px; }
.io-h1 em { font-style: italic; color: #FF6B00; }
.io-h1 strong { font-weight: 600; }
.io-lead { font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62); max-width: 480px; margin: 0 auto; }

.io-tabs { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 36px; opacity: 0; animation: io-up .7s ease .2s forwards; }
.io-tab { display: inline-flex; align-items: center; gap: 8px; padding: 11px 28px; border-radius: 100px; border: 1.5px solid rgba(26,18,8,.13); font-size: 14px; font-weight: 500; color: rgba(26,18,8,.65); background: #fff; cursor: pointer; transition: all .2s; font-family: inherit; user-select: none; }
.io-tab:hover  { border-color: rgba(255,107,0,.4); color: #FF6B00; background: #FFF4ED; }
.io-tab.active { border-color: #FF6B00; color: #FF6B00; background: #FFF4ED; font-weight: 600; box-shadow: 0 4px 16px rgba(255,107,0,.15); }
.io-tab-count { background: #FF6B00; color: #fff; border-radius: 100px; padding: 1px 8px; font-size: 11px; font-weight: 700; }

/* Grid — 3 col desktop, 2 col tablet, 1 col mobile */
.io-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Card */
.io-card {
  background: #fff; border-radius: 20px; border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 8px 32px rgba(0,0,0,.05);
  overflow: hidden; transition: transform .25s, box-shadow .25s, border-color .25s;
  cursor: pointer; position: relative; animation: io-card-in .5s ease both;
  text-decoration: none; display: block; color: inherit;
}
.io-card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(0,0,0,.07), 0 24px 56px rgba(255,107,0,.13); border-color: rgba(255,107,0,.3); }

.io-card-soon {
  background: #fff; border-radius: 20px; border: 1px dashed rgba(26,18,8,.12);
  overflow: hidden; position: relative; animation: io-card-in .5s ease both;
}

/* Preview container — mantine aspect ratio A4, se adapteaza la latimea cardului */
.io-preview-wrap {
  width: 100%;
  aspect-ratio: 794 / 1123;
  position: relative;
  overflow: hidden;
  background: #FEFBF3;
}

/* Invitatie randata la 794px, scalata sa umple perfect containerul */
.io-preview-scaler {
  position: absolute;
  top: 0; left: 0;
  width: 794px;
  height: 1123px;
  transform-origin: top left;
  /* scale-ul e setat inline din JS pe baza latimii reale a containerului */
}

/* Placeholder pentru carduri indisponibile */
.io-preview-soon {
  width: 100%; height: 100%;
  background: linear-gradient(145deg, #f7f4f0 0%, #edeae5 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
}
.io-soon-icon  { font-size: 32px; opacity: .3; }
.io-soon-badge { background: #1A1208; color: #fff; border-radius: 100px; padding: 6px 18px; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; opacity: .55; }
.io-shimmer    { position: absolute; inset: 0; background: linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent); background-size: 400px 100%; animation: io-shimmer 2.5s linear infinite; pointer-events: none; }

.io-card-body { padding: 16px 18px 18px; }
.io-card-name { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 400; color: #1A1208; margin-bottom: 4px; line-height: 1.2; }
.io-card-name em { font-style: italic; color: #FF6B00; }
.io-card-desc { font-size: 12px; color: rgba(26,18,8,.5); line-height: 1.6; margin-bottom: 14px; }
.io-card-footer { display: flex; align-items: center; justify-content: space-between; }
.io-card-price { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: #FF6B00; }
.io-card-price span { font-size: 12px; font-weight: 400; color: rgba(26,18,8,.4); font-family: 'DM Sans', sans-serif; }
.io-card-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 100px; background: #FF6B00; color: #fff; font-size: 12px; font-weight: 600; border: none; cursor: pointer; font-family: inherit; transition: background .2s; }
.io-card-btn:hover { background: #e85f00; }
.io-card-btn-ghost { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 100px; border: 1.5px solid rgba(26,18,8,.12); color: rgba(26,18,8,.3); font-size: 12px; font-weight: 600; background: transparent; cursor: not-allowed; font-family: inherit; }

.io-coming-soon { text-align: center; margin: 52px 0 0; opacity: 0; animation: io-up .7s ease .5s forwards; }
.io-cs-card { background: linear-gradient(135deg,#1A1208 0%,#2d1f0e 100%); border-radius: 28px; padding: 44px 40px; display: inline-flex; flex-direction: column; align-items: center; gap: 14px; max-width: 520px; position: relative; overflow: hidden; }
.io-cs-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#FF6B00,#FF8C35,#FF6B00); }
.io-cs-ring { width: 60px; height: 60px; border-radius: 50%; background: rgba(255,107,0,.15); display: flex; align-items: center; justify-content: center; font-size: 26px; position: relative; }
.io-cs-ring::before { content:''; position:absolute; inset:-6px; border-radius:50%; border:1px solid rgba(255,107,0,.2); animation: io-pulse 2s ease-out infinite; }
.io-cs-h { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: #fff; }
.io-cs-h em { font-style: italic; color: #FF8C35; }
.io-cs-sub { font-size: 13px; color: rgba(255,255,255,.5); line-height: 1.7; max-width: 360px; }
.io-cs-dots { display: flex; gap: 8px; }
.io-cs-dot { width: 8px; height: 8px; border-radius: 50%; background: #FF6B00; animation: io-dot 1.8s ease-in-out infinite; }
.io-cs-dot:nth-child(2) { animation-delay: .3s; }
.io-cs-dot:nth-child(3) { animation-delay: .6s; }

.io-guarantee { display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap; background: #fff; border-radius: 20px; border: 1px solid rgba(255,107,0,.1); padding: 18px 28px; margin-top: 28px; opacity: 0; animation: io-up .7s ease .6s forwards; }
.io-gi { display: flex; align-items: center; gap: 9px; }
.io-gico { font-size: 20px; }
.io-gtxt { font-size: 12px; font-weight: 500; color: rgba(26,18,8,.65); }
.io-gtxt strong { color: #1A1208; display: block; font-size: 12.5px; }
.io-gdiv { width: 1px; height: 28px; background: rgba(26,18,8,.1); }

@media (max-width: 900px) {
  .io-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
@media (max-width: 500px) {
  .io-inner { padding: 28px 14px 52px; }
  .io-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .io-tabs { gap: 8px; }
  .io-tab { padding: 9px 16px; font-size: 13px; }
  .io-guarantee { gap: 14px; }
  .io-gdiv { display: none; }
  .io-cs-card { padding: 32px 20px; }
  .io-card-body { padding: 12px 14px 14px; }
  .io-card-name { font-size: 16px; }
  .io-card-desc { display: none; }
  .io-card-price { font-size: 18px; }
}
`

const TICKER = [
  '💌 40+ Teme în pregătire', '✨ Design Premium', '📲 Trimite prin link sau QR',
  '🎊 Nunți · Botezuri · Petreceri', '💸 Plată Unică',
  '⭐ 4.9 Rating', '🔒 Plată securizată', '🛠️ Suport inclus',
]

type Card = {
  id: number
  name: string
  desc: string
  category: 'nunta' | 'botez'
  available: boolean
  slug: string | null
  PreviewComp: React.FC<any> | null
}
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

function PreviewMasina() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden', background:'#0a0a0a' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Russo+One&family=Nunito:wght@300;400;700;900&display=swap');`}</style>
      <RacingBg />
      <div style={{ position:'absolute', inset:0, zIndex:6, display:'flex', flexDirection:'column', alignItems:'center', padding:0, textAlign:'center' }}>
        <div style={{ padding:'94px 60px 0', width:'100%' }}>
          <p style={{ fontFamily:"'Orbitron',monospace", fontSize:'11px', letterSpacing:'.5em', textTransform:'uppercase', color:'#ffd700', marginBottom:'6px', opacity:.8 }}>⚑ OFFICIAL ANNOUNCEMENT ⚑</p>
          <div style={{ width:'100%', height:'2px', background:'linear-gradient(90deg,transparent,#ff1a1a,transparent)', marginBottom:'14px' }} />
          <p style={{ fontFamily:"'Russo One',sans-serif", fontSize:'22px', letterSpacing:'.22em', textTransform:'uppercase', color:'white', opacity:.7 }}>PILOT ÎN DEVENIRE</p>
        </div>
        <div style={{ flex:1 }} />
        <div style={{ width:'100%', padding:'0 60px 30px' }}>
          <p style={{ fontFamily:"'Orbitron',monospace", fontSize:'13px', fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#ff2222', marginBottom:'2px' }}>BOTEZ</p>
          <span style={{ fontFamily:"'Russo One',sans-serif", fontSize:'96px', color:'white', lineHeight:.9, textShadow:'0 0 30px rgba(255,30,30,.5),3px 3px 0 #880000', letterSpacing:'.02em', marginBottom:'4px', display:'block' }}>LUCA</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', marginBottom:'8px' }}>
            <div style={{ flex:1, height:'2px', background:'linear-gradient(90deg,transparent,#ff1a1a)' }} />
            <span style={{ fontFamily:"'Orbitron',monospace", fontSize:'18px', color:'#ffd700', textShadow:'0 0 10px #ffd700' }}>★</span>
            <div style={{ flex:1, height:'2px', background:'linear-gradient(90deg,#ff1a1a,transparent)' }} />
          </div>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'20px', fontWeight:300, fontStyle:'italic', color:'rgba(255,255,255,.6)', marginBottom:'14px' }}>a coborât în circuit!</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, marginBottom:'12px' }}>
            <div style={{ borderRight:'1px solid rgba(255,30,30,.3)', paddingRight:'20px', textAlign:'right' }}>
              <p style={{ fontFamily:"'Orbitron',monospace", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#ff2222', marginBottom:'4px', opacity:.8 }}>ECHIPA</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', fontWeight:700, color:'white', lineHeight:1.3, marginBottom:'12px' }}>Elena și Andrei Popescu</p>
              <p style={{ fontFamily:"'Orbitron',monospace", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#ff2222', marginBottom:'4px', opacity:.8 }}>SPONSORI</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', fontWeight:700, color:'white', lineHeight:1.3 }}>Maria și Cristian Ionescu</p>
            </div>
            <div style={{ paddingLeft:'20px', textAlign:'left' }}>
              <p style={{ fontFamily:"'Orbitron',monospace", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#ffd700', marginBottom:'4px', opacity:.8 }}>🕊 CIRCUIT #1</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'20px', fontWeight:700, color:'white', marginBottom:'2px' }}>Biserica Sf. Nicolae</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'18px', fontWeight:300, color:'rgba(255,255,255,.6)', marginBottom:'12px' }}>20 Aprilie 2025, ora 11:00</p>
              <p style={{ fontFamily:"'Orbitron',monospace", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#ffd700', marginBottom:'4px', opacity:.8 }}>🏆 CIRCUIT #2</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'20px', fontWeight:700, color:'white', marginBottom:'2px' }}>Restaurant La Conac</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'18px', fontWeight:300, color:'rgba(255,255,255,.6)' }}>20 Aprilie 2025, ora 13:00</p>
            </div>
          </div>
          <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg,transparent,#ff1a1a 30%,#ffd700 50%,#ff1a1a 70%,transparent)', margin:'12px 0', opacity:.6 }} />
          <p style={{ fontFamily:"'Orbitron',monospace", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#ff2222', marginBottom:'4px', opacity:.8 }}>🏁 BOX RADIO — RSVP</p>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'26px', fontWeight:900, color:'white', letterSpacing:'.06em' }}>0700 000 000</p>
        </div>
      </div>
    </div>
  )
}
function PreviewAstronaut() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden', background:'#04090f' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@300;400;600&family=Quicksand:wght@700&display=swap');`}</style>
      <SpaceBg />
      <div style={{ position:'absolute', inset:0, zIndex:6, display:'flex', flexDirection:'column', alignItems:'center', padding:'52px 70px 48px', textAlign:'center' }}>
        <div style={{ height:'290px' }} />
        <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'13px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#80c8ff', marginBottom:'8px' }}>🚀 Invitație de Botez 🚀</p>
        <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:'96px', color:'#fff', lineHeight:1, display:'block', textShadow:'0 4px 20px rgba(100,180,255,.4)', marginBottom:'6px' }}>Luca</span>
        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', fontWeight:300, color:'#b8d8f8', fontStyle:'italic', marginBottom:'18px' }}>a aterizat pe Pământ!</p>
        <div style={{ width:'60px', height:'3px', background:'linear-gradient(90deg,#4090e0,#80c8ff,#4090e0)', borderRadius:'2px', margin:'0 auto 14px' }} /><p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'12px', fontWeight:700, letterSpacing:'.26em', textTransform:'uppercase', color:'#ffffff', marginBottom:'5px' }}>Părinți</p>
<p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'28px', fontWeight:600, color:'#ffffff', textShadow:'0 1px 8px rgba(0,0,0,.4)', marginBottom:'12px' }}>Elena și Andrei Popescu</p>
<p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'12px', fontWeight:700, letterSpacing:'.26em', textTransform:'uppercase', color:'#ffffff', marginBottom:'5px' }}>Nași</p>
<p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'28px', fontWeight:600, color:'#ffffff', textShadow:'0 1px 8px rgba(0,0,0,.4)', marginBottom:'12px' }}>Maria și Cristian Ionescu</p>
        <div style={{ width:'60px', height:'3px', background:'linear-gradient(90deg,#4090e0,#80c8ff,#4090e0)', borderRadius:'2px', margin:'0 auto 12px' }} />
        <p style={{ fontFamily:"'Fredoka One',cursive", fontSize:'30px', color:'#2060b0', marginBottom:'3px' }}>Biserica Sf. Nicolae</p>
        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', color:'#304060', marginBottom:'12px' }}>Duminică, 20 Aprilie 2025, ora 11:00</p>
        <p style={{ fontFamily:"'Fredoka One',cursive", fontSize:'30px', color:'#2060b0', marginBottom:'3px' }}>Restaurant Cosmos</p>
        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', color:'#304060', marginBottom:'12px' }}>Duminică, 20 Aprilie 2025, ora 13:00</p>
        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', color:'#406090' }}>Tel: <strong style={{ color:'#1a3060' }}>0700 000 000</strong></p>
      </div>
    </div>
  )
}
function PreviewAuriu() {
  return (
    <div style={{ width:'794px', height:'1123px', background:'#FEFBF3', border:'2px solid #C9A84C', position:'relative', overflow:'hidden', padding:'60px 70px 100px', boxSizing:'border-box', fontFamily:"'EB Garamond',serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=EB+Garamond:ital,wght@0,400&family=Cinzel:wght@400;600&display=swap');`}</style>
      <div style={{ position:'absolute', inset:'10px', border:'1px solid rgba(201,168,76,.3)', pointerEvents:'none' }} />
      {(['tl','tr','bl','br'] as const).map((pos) => {
        const style: React.CSSProperties = { position:'absolute', width:'90px', height:'90px', opacity:.55 }
        if (pos === 'tl') { style.top = '20px'; style.left = '20px' }
        if (pos === 'tr') { style.top = '20px'; style.right = '20px'; style.transform = 'scaleX(-1)' }
        if (pos === 'bl') { style.bottom = '20px'; style.left = '20px'; style.transform = 'scaleY(-1)' }
        if (pos === 'br') { style.bottom = '20px'; style.right = '20px'; style.transform = 'scale(-1)' }
        return (
          <svg key={pos} viewBox="0 0 90 90" fill="none" style={style}>
            <path d="M4 86 L4 4 L86 4" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
            <path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" strokeWidth=".8" fill="none" opacity=".5"/>
            <circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/>
          </svg>
        )
      })}
      <div style={{ textAlign:'center', padding:'0 40px' }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'.25em', textTransform:'uppercase', color:'#8B6914', marginBottom:'8px' }}>Cu binecuvântarea părinților</p>
        <p style={{ fontSize:'16px', color:'#5C4A1E', lineHeight:'1.8', fontStyle:'italic' }}>Ion și Maria Popescu</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'13px', letterSpacing:'.2em', color:'#C9A84C', textTransform:'uppercase', margin:'4px 0' }}>și</p>
        <p style={{ fontSize:'16px', color:'#5C4A1E', lineHeight:'1.8', fontStyle:'italic' }}>Gheorghe și Elena Ionescu</p>
      </div>
      <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C 30%,#C9A84C 70%,transparent)', margin:'20px 0', opacity:.6 }} />
      <div style={{ textAlign:'center', padding:'8px 0' }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'52px', fontWeight:300, fontStyle:'italic', color:'#1A1208', lineHeight:1.1 }}>Andreea</p>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'72px', fontWeight:300, color:'#C9A84C', lineHeight:1, display:'block', margin:'4px 0', textAlign:'center' }}>&amp;</span>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'52px', fontWeight:300, fontStyle:'italic', color:'#1A1208', lineHeight:1.1 }}>Alexandru</p>
      </div>
      <div style={{ width:'50%', height:'1px', margin:'14px auto', background:'linear-gradient(90deg,transparent,#C9A84C 30%,#C9A84C 70%,transparent)', opacity:.4 }} />
      <span style={{ fontSize:'20px', color:'#C9A84C', opacity:.5, display:'block', textAlign:'center', margin:'6px 0' }}>✦</span>
      <div style={{ textAlign:'center', fontSize:'15px', color:'#5C4A1E', lineHeight:2, padding:'0 60px', fontStyle:'italic' }}>
        <strong style={{ fontStyle:'normal', fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'.2em', color:'#8B6914', display:'block', marginBottom:'6px' }}>vă invită cu drag la nunta lor</strong>
        Vă așteptăm alături de noi în ziua în care ne unim destinele
      </div>
      <div style={{ width:'50%', height:'1px', margin:'14px auto', background:'linear-gradient(90deg,transparent,#C9A84C 30%,#C9A84C 70%,transparent)', opacity:.4 }} />
      <div style={{ textAlign:'center', padding:'6px 0' }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'18px', color:'#1A1208', letterSpacing:'.12em' }}>Sâmbătă, 14 Iunie</p>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:'32px', fontWeight:600, color:'#C9A84C', display:'block', letterSpacing:'.08em' }}>2025</span>
      </div>
      <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg,transparent,#C9A84C 30%,#C9A84C 70%,transparent)', margin:'20px 0', opacity:.6 }} />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', margin:'6px 0' }}>
        {[['Cununie','Biserica Sf. Nicolae','13:00'],['Recepție','Restaurant Dolce Vita','18:00']].map(([label,name,time]) => (
          <div key={label} style={{ textAlign:'center', padding:'14px 10px', border:'1px solid rgba(201,168,76,.4)', borderRadius:'6px', background:'rgba(201,168,76,.04)' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'.2em', color:'#C9A84C', textTransform:'uppercase', marginBottom:'6px' }}>{label}</p>
            <p style={{ fontSize:'14px', color:'#1A1208', fontStyle:'italic', lineHeight:1.5, marginBottom:'4px' }}>{name}</p>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'12px', color:'#8B6914', letterSpacing:'.1em' }}>ora {time}</p>
          </div>
        ))}
      </div>
      <div style={{ width:'50%', height:'1px', margin:'14px auto', background:'linear-gradient(90deg,transparent,#C9A84C 30%,#C9A84C 70%,transparent)', opacity:.4 }} />
      <div style={{ textAlign:'center', fontSize:'15px', color:'#5C4A1E', lineHeight:1.8, fontStyle:'italic', padding:'0 20px' }}>
        <strong style={{ fontStyle:'normal', fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'.2em', color:'#8B6914', display:'block', marginBottom:'4px' }}>Nași de cununie</strong>
        Mihai și Cristina Dumitrescu
      </div>
      <div style={{ textAlign:'center', padding:'14px 30px', background:'rgba(201,168,76,.08)', borderTop:'1px solid rgba(201,168,76,.3)', position:'absolute', bottom:0, left:0, right:0, fontSize:'13px', color:'#5C4A1E', fontStyle:'italic' }}>
        Confirmați prezența până pe <span style={{ color:'#C9A84C', fontStyle:'normal', fontWeight:600 }}>1 Iunie 2025</span> · Tel: <span style={{ color:'#C9A84C', fontStyle:'normal', fontWeight:600 }}>0700 000 000</span>
      </div>
    </div>
  )
}
const BotanicalSVG = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" fill="none">
    <g opacity=".85">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <path d="M60 20 Q100 80 80 150" stroke="#5a7a3a" strokeWidth="1" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
      <ellipse cx="100" cy="180" rx="22" ry="9" fill="#5a8040" opacity=".55" transform="rotate(-20 100 180)"/>
      <path d="M15 80 Q35 70 45 85 Q35 100 15 90 Z" fill="#4a6a30" opacity=".5"/>
      <path d="M25 110 Q50 95 58 115 Q50 130 25 120 Z" fill="#5a7a3a" opacity=".5"/>
    </g>
    <g opacity=".85" transform="translate(794,0) scale(-1,1)">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
      <ellipse cx="100" cy="180" rx="22" ry="9" fill="#5a8040" opacity=".55" transform="rotate(-20 100 180)"/>
      <path d="M15 80 Q35 70 45 85 Q35 100 15 90 Z" fill="#4a6a30" opacity=".5"/>
      <path d="M25 110 Q50 95 58 115 Q50 130 25 120 Z" fill="#5a7a3a" opacity=".5"/>
    </g>
    <g opacity=".8" transform="translate(0,1123) scale(1,-1)">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
    </g>
    <g opacity=".8" transform="translate(794,1123) scale(-1,-1)">
      <path d="M20 20 Q80 60 60 120 Q40 180 100 200" stroke="#5a7a3a" strokeWidth="1.5" fill="none"/>
      <ellipse cx="55" cy="55" rx="18" ry="9" fill="#6a8f4a" opacity=".7" transform="rotate(-30 55 55)"/>
      <ellipse cx="40" cy="90" rx="16" ry="8" fill="#4a7a3a" opacity=".6" transform="rotate(20 40 90)"/>
      <ellipse cx="75" cy="75" rx="14" ry="7" fill="#7a9f5a" opacity=".65" transform="rotate(-50 75 75)"/>
      <ellipse cx="30" cy="130" rx="20" ry="9" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 130)"/>
      <ellipse cx="90" cy="115" rx="15" ry="7" fill="#6a9a4a" opacity=".55" transform="rotate(-40 90 115)"/>
      <ellipse cx="55" cy="160" rx="18" ry="8" fill="#4a7030" opacity=".6" transform="rotate(30 55 160)"/>
    </g>
    <path d="M160 35 Q300 20 397 28 Q494 20 634 35" stroke="#5a7a3a" strokeWidth="1" fill="none" opacity=".5"/>
    <path d="M160 1088 Q300 1103 397 1095 Q494 1103 634 1088" stroke="#5a7a3a" strokeWidth="1" fill="none" opacity=".5"/>
    <ellipse cx="220" cy="28" rx="12" ry="5" fill="#6a8f4a" opacity=".5" transform="rotate(-15 220 28)"/>
    <ellipse cx="340" cy="20" rx="11" ry="5" fill="#7a9f5a" opacity=".45" transform="rotate(-5 340 20)"/>
    <ellipse cx="460" cy="20" rx="11" ry="5" fill="#5a8040" opacity=".45" transform="rotate(5 460 20)"/>
    <ellipse cx="580" cy="28" rx="12" ry="5" fill="#4a7a3a" opacity=".5" transform="rotate(15 580 28)"/>
    <ellipse cx="220" cy="1095" rx="12" ry="5" fill="#6a8f4a" opacity=".5" transform="rotate(15 220 1095)"/>
    <ellipse cx="340" cy="1103" rx="11" ry="5" fill="#5a7a3a" opacity=".45" transform="rotate(5 340 1103)"/>
    <ellipse cx="460" cy="1103" rx="11" ry="5" fill="#5a8040" opacity=".45" transform="rotate(-5 460 1103)"/>
    <ellipse cx="580" cy="1095" rx="12" ry="5" fill="#4a7a3a" opacity=".5" transform="rotate(-15 580 1095)"/>
  </svg>
)

const SealSVG = () => (
  <svg style={{ position:'absolute', right:'80px', bottom:'110px', zIndex:3, width:'72px', height:'72px' }} viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="34" fill="#3d5a3e" opacity=".92"/>
    <circle cx="36" cy="36" r="28" fill="none" stroke="#a8c89a" strokeWidth="1" opacity=".6"/>
    <path d="M36 20 C28 28 26 36 36 52 C46 36 44 28 36 20Z" fill="#a8c89a" opacity=".8"/>
    <path d="M36 20 L36 52" stroke="#3d5a3e" strokeWidth=".8" opacity=".6"/>
  </svg>
)
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
      <ellipse cx="30" cy="250" rx="32" ry="14" fill="#5a9fd4" opacity=".55" transform="rotate(-35 30 250)"/>
      <ellipse cx="55" cy="300" rx="28" ry="12" fill="#3a7fc4" opacity=".5" transform="rotate(20 55 300)"/>
      <ellipse cx="20" cy="360" rx="34" ry="14" fill="#6aaad8" opacity=".5" transform="rotate(-15 20 360)"/>
      <ellipse cx="70" cy="340" rx="24" ry="11" fill="#4a90cc" opacity=".45" transform="rotate(40 70 340)"/>
      <ellipse cx="35" cy="420" rx="30" ry="13" fill="#5a9fd4" opacity=".5" transform="rotate(-25 35 420)"/>
      <path d="M-5 280 Q25 265 38 285 Q25 305 -5 292 Z" fill="#3a6aaa" opacity=".45"/>
      <circle cx="45" cy="270" r="7" fill="#8ac0e8" opacity=".6"/>
      <circle cx="25" cy="330" r="6" fill="#6aaad8" opacity=".55"/>
    </g>
    <g opacity=".65" transform="translate(0,1123) scale(1,-1)">
      <path d="M-10 80 Q70 110 50 200 Q30 280 90 310" stroke="#4a8fd4" strokeWidth="1.5" fill="none"/>
      <ellipse cx="30" cy="110" rx="28" ry="12" fill="#5a9fd4" opacity=".5" transform="rotate(-30 30 110)"/>
      <ellipse cx="60" cy="160" rx="24" ry="10" fill="#3a7fc4" opacity=".45" transform="rotate(25 60 160)"/>
      <ellipse cx="20" cy="210" rx="30" ry="12" fill="#6aaad8" opacity=".45" transform="rotate(-20 20 210)"/>
      <circle cx="40" cy="130" r="7" fill="#8ac0e8" opacity=".5"/>
    </g>
    <g opacity=".65" transform="translate(794,1123) scale(-1,-1)">
      <path d="M-10 80 Q70 110 50 200 Q30 280 90 310" stroke="#4a8fd4" strokeWidth="1.5" fill="none"/>
      <ellipse cx="30" cy="110" rx="28" ry="12" fill="#5a9fd4" opacity=".5" transform="rotate(-30 30 110)"/>
      <ellipse cx="60" cy="160" rx="24" ry="10" fill="#3a7fc4" opacity=".45" transform="rotate(25 60 160)"/>
      <circle cx="40" cy="130" r="7" fill="#8ac0e8" opacity=".5"/>
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
    <ellipse cx="62" cy="120" rx="16" ry="7" fill="#4a90cc" opacity=".5" transform="rotate(250 62 120)"/>
    <ellipse cx="148" cy="142" rx="18" ry="8" fill="#6aaad8" opacity=".55" transform="rotate(135 148 142)"/>
    <ellipse cx="110" cy="163" rx="14" ry="6" fill="#5a9fd4" opacity=".5" transform="rotate(180 110 163)"/>
    <ellipse cx="90" cy="158" rx="16" ry="7" fill="#3a7fc4" opacity=".5" transform="rotate(200 90 158)"/>
    <ellipse cx="72" cy="142" rx="18" ry="8" fill="#6aaad8" opacity=".55" transform="rotate(225 72 142)"/>
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
const ForestBgPreview = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="fpv-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a3020"/>
        <stop offset="25%" stopColor="#6b4a2a"/>
        <stop offset="50%" stopColor="#8a6035"/>
        <stop offset="70%" stopColor="#5a3a18"/>
        <stop offset="100%" stopColor="#2a1808"/>
      </linearGradient>
      <linearGradient id="fpv-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1005"/>
        <stop offset="100%" stopColor="#0a0803"/>
      </linearGradient>
      <linearGradient id="fpv-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050302" stopOpacity=".7"/>
        <stop offset="100%" stopColor="#050302" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="fpv-bot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050302" stopOpacity="0"/>
        <stop offset="100%" stopColor="#050302" stopOpacity=".8"/>
      </linearGradient>
      <filter id="fpv-fog"><feGaussianBlur stdDeviation="12"/></filter>
    </defs>
    <rect width="794" height="1123" fill="url(#fpv-sky)"/>
    <ellipse cx="397" cy="500" rx="500" ry="200" fill="#a08050" opacity=".08" filter="url(#fpv-fog)"/>
    <path d="M0 680 Q100 620 200 640 Q300 660 400 620 Q500 580 600 610 Q700 640 794 600 L794 780 L0 780Z" fill="#3a2510" opacity=".7"/>
    <path d="M0 700 Q150 650 280 670 Q400 690 520 650 Q640 610 794 640 L794 800 L0 800Z" fill="#2a1a08" opacity=".8"/>
    <path d="M60 1123 L60 400 L20 500 L60 480 L15 560 L60 540 L10 630 L60 600 L5 700 L60 670 L0 760 L60 730 L0 830 L60 800 L10 900 L60 870 L60 1123Z" fill="#0a0a05"/>
    <path d="M60 400 L100 500 L60 480 L105 560 L60 540 L110 630 L60 600 L115 700 L60 670 L120 760 L60 730 L120 830 L60 800 L110 900 L60 870 L60 400Z" fill="#0d0d06"/>
    <path d="M-20 1123 L-20 320 L-65 430 L-20 405 L-75 510 L-20 480 L-80 590 L-20 560 L-85 680 L-20 645 L-85 770 L-20 740 L-80 860 L-20 830 L-20 1123Z" fill="#080805"/>
    <path d="M140 1123 L140 500 L105 585 L140 565 L100 645 L140 620 L95 705 L140 680 L90 775 L140 745 L88 845 L140 815 L95 915 L140 885 L140 1123Z" fill="#0a0a06"/>
    <path d="M734 1123 L734 380 L694 480 L734 460 L689 545 L734 520 L684 615 L734 585 L679 685 L734 655 L674 755 L734 725 L679 835 L734 805 L689 905 L734 875 L734 1123Z" fill="#080805"/>
    <path d="M734 380 L774 480 L734 460 L779 545 L734 520 L784 615 L734 585 L789 685 L734 655 L794 755 L734 725 L794 835 L734 805 L784 905 L734 875 L734 380Z" fill="#0d0d06"/>
    <path d="M800 1123 L800 300 L755 410 L800 385 L750 500 L800 470 L745 590 L800 555 L740 675 L800 645 L735 760 L800 730 L740 855 L800 825 L800 1123Z" fill="#060603"/>
    <path d="M650 1123 L650 480 L615 565 L650 545 L610 625 L650 600 L605 690 L650 660 L600 755 L650 725 L596 820 L650 790 L605 890 L650 860 L650 1123Z" fill="#080806"/>
    <path d="M650 480 L685 565 L650 545 L690 625 L650 600 L695 690 L650 660 L700 755 L650 725 L704 820 L650 790 L695 890 L650 860 L650 480Z" fill="#0c0c07"/>
    <rect y="880" width="794" height="243" fill="url(#fpv-ground)"/>
    <rect width="794" height="300" fill="url(#fpv-top)"/>
    <rect y="700" width="794" height="423" fill="url(#fpv-bot)"/>
  </svg>
)

const MonogramPozaPreview = ({ init1, init2 }: { init1: string; init2: string }) => (
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
const CelestialBgPreview = () => {
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
        <radialGradient id="cbp-space" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#0d1535"/><stop offset="40%" stopColor="#080c22"/><stop offset="100%" stopColor="#030508"/>
        </radialGradient>
        <radialGradient id="cbp-neb1" cx="25%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#1a2860" stopOpacity=".6"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="cbp-neb2" cx="75%" cy="75%" r="55%">
          <stop offset="0%" stopColor="#2a1050" stopOpacity=".5"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="cbp-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c840"/><stop offset="25%" stopColor="#f8e870"/>
          <stop offset="50%" stopColor="#c8a020"/><stop offset="75%" stopColor="#f0d050"/><stop offset="100%" stopColor="#d4b030"/>
        </linearGradient>
        <radialGradient id="cbp-copper" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c87040"/><stop offset="40%" stopColor="#a85020"/><stop offset="100%" stopColor="#6a2c08"/>
        </radialGradient>
        <filter id="cbp-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="cbp-soft"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="cbp-sglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="cbp-vign" cx="50%" cy="50%" r="70%">
          <stop offset="55%" stopColor="transparent"/><stop offset="100%" stopColor="#020408" stopOpacity=".75"/>
        </radialGradient>
        <linearGradient id="cbp-tf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030508" stopOpacity=".6"/><stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="cbp-bf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent"/><stop offset="100%" stopColor="#030508" stopOpacity=".6"/>
        </linearGradient>
      </defs>
      <rect width="794" height="1123" fill="url(#cbp-space)"/>
      <ellipse cx="200" cy="220" rx="340" ry="260" fill="url(#cbp-neb1)"/>
      <ellipse cx="600" cy="860" rx="300" ry="240" fill="url(#cbp-neb2)"/>
      <path d="M0 350 Q200 300 397 320 Q594 340 794 280" stroke="#3040a0" strokeWidth="80" fill="none" opacity=".06" filter="url(#cbp-soft)"/>
      {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f0d880" opacity={s.op}/>)}
      {brightStars.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="3" fill="#f8e890" opacity=".9"/>
          <line x1={s.x-10} y1={s.y} x2={s.x+10} y2={s.y} stroke="#f8e890" strokeWidth=".6" opacity=".5"/>
          <line x1={s.x} y1={s.y-10} x2={s.x} y2={s.y+10} stroke="#f8e890" strokeWidth=".6" opacity=".5"/>
        </g>
      ))}
      {/* Orion */}
      <g opacity=".55" filter="url(#cbp-sglow)">
        {[[110,230,2.5],[145,195,2],[160,220,2.5],[125,258,2],[155,270,2],[128,240,1.5],[140,240,1.5],[152,240,1.5]].map(([cx,cy,r],i)=><circle key={i} cx={cx} cy={cy} r={r} fill={i>=5?"#f8f0a0":"#f0d880"}/>)}
        {[[110,230,145,195],[145,195,160,220],[110,230,128,240],[160,220,152,240],[128,240,152,240]].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a840" strokeWidth=".7" opacity=".4"/>)}
      </g>
      {/* Cassiopeia */}
      <g opacity=".5" filter="url(#cbp-sglow)">
        {[[640,170,2.2],[665,148,2.5],[690,162,2.2],[715,145,2.5],[738,160,2]].map(([cx,cy,r],i)=><circle key={i} cx={cx} cy={cy} r={r} fill="#f0d880"/>)}
        {[[640,170,665,148],[665,148,690,162],[690,162,715,145],[715,145,738,160]].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a840" strokeWidth=".7" opacity=".4"/>)}
      </g>
      {/* Scorpius */}
      <g opacity=".45" filter="url(#cbp-sglow)">
        {[[80,820,2.5],[100,845,2],[110,868,2],[95,888,1.8],[80,905,1.8],[70,925,2],[85,942,2.2],[100,955,1.8]].map(([cx,cy,r],i)=><circle key={i} cx={cx} cy={cy} r={r} fill={i===0?"#f8a060":"#f0d880"}/>)}
        {[[80,820,100,845],[100,845,110,868],[110,868,95,888],[95,888,80,905],[80,905,70,925],[70,925,85,942],[85,942,100,955]].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a840" strokeWidth=".6" opacity=".35"/>)}
      </g>
      {/* Fazele lunii */}
      <circle cx="260" cy="68" r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".6"/>
      <g transform="translate(310,50)"><circle r="18" fill="#c8a840" opacity=".15"/><path d="M0,-18 A18,18 0 0,1 0,18 A10,18 0 0,0 0,-18" fill="#c8a840" opacity=".65"/></g>
      <g transform="translate(360,50)"><circle r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".5"/><path d="M0,-18 A18,18 0 0,1 0,18 L0,-18" fill="#c8a840" opacity=".6"/></g>
      <circle cx="397" cy="50" r="22" fill="none" stroke="#c8a840" strokeWidth="1.5" opacity=".7" filter="url(#cbp-glow)"/>
      <circle cx="397" cy="50" r="14" fill="#f0d880" opacity=".3"/>
      <g transform="translate(434,50)"><circle r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".5"/><path d="M0,-18 A18,18 0 0,0 0,18 L0,-18" fill="#c8a840" opacity=".6"/></g>
      <g transform="translate(484,50)"><circle r="18" fill="#c8a840" opacity=".15"/><path d="M0,-18 A18,18 0 0,0 0,18 A10,18 0 0,1 0,-18" fill="#c8a840" opacity=".65"/></g>
      <circle cx="534" cy="68" r="18" fill="#080c22" stroke="#c8a840" strokeWidth="1" opacity=".6"/>
      {/* Chenar auriu */}
      <rect x="32" y="32" width="730" height="1059" fill="none" stroke="url(#cbp-gold)" strokeWidth="1.5" opacity=".5"/>
      <rect x="44" y="44" width="706" height="1035" fill="none" stroke="url(#cbp-gold)" strokeWidth=".6" opacity=".3"/>
      <g opacity=".7" filter="url(#cbp-glow)">
        <path d="M32 72 L32 32 L72 32" fill="none" stroke="url(#cbp-gold)" strokeWidth="2"/>
        <circle cx="32" cy="32" r="3" fill="#f0d060"/>
        <path d="M52 32 L60 40 L52 48 L44 40 Z" fill="#f0d060" opacity=".6"/>
        <path d="M722 32 L762 32 L762 72" fill="none" stroke="url(#cbp-gold)" strokeWidth="2"/>
        <circle cx="762" cy="32" r="3" fill="#f0d060"/>
        <path d="M742 32 L750 40 L742 48 L734 40 Z" fill="#f0d060" opacity=".6"/>
        <path d="M32 1051 L32 1091 L72 1091" fill="none" stroke="url(#cbp-gold)" strokeWidth="2"/>
        <circle cx="32" cy="1091" r="3" fill="#f0d060"/>
        <path d="M722 1091 L762 1091 L762 1051" fill="none" stroke="url(#cbp-gold)" strokeWidth="2"/>
        <circle cx="762" cy="1091" r="3" fill="#f0d060"/>
      </g>
      {/* Ornament stea */}
      <g transform="translate(397,100)" opacity=".65" filter="url(#cbp-glow)">
        <path d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3 Z" fill="#f0d060"/>
      </g>
      {/* Sigiliu cupru */}
      <g transform="translate(634,990)" filter="url(#cbp-soft)">
        <ellipse cx="4" cy="6" rx="46" ry="46" fill="#000" opacity=".4"/>
        <circle r="44" fill="url(#cbp-copper)"/>
        <ellipse cx="-12" cy="-16" rx="18" ry="12" fill="#e08050" opacity=".25" transform="rotate(-30)"/>
        <circle r="36" fill="none" stroke="#c06030" strokeWidth="1" opacity=".5"/>
        <circle r="22" fill="none" stroke="#f0c090" strokeWidth="1.5" opacity=".4"/>
        <path d="M-2,-18 A20,20 0 0,1 14,14 A14,20 0 0,0 -2,-18" fill="#f0c090" opacity=".7"/>
        <circle cx="12" cy="-8" r="2" fill="#f8d880" opacity=".8"/>
        <circle cx="8" cy="14" r="1.5" fill="#f8d880" opacity=".7"/>
        <circle cx="-14" cy="4" r="1.5" fill="#f8d880" opacity=".6"/>
      </g>
      <rect width="794" height="1123" fill="url(#cbp-vign)"/>
      <rect width="794" height="200" fill="url(#cbp-tf)"/>
      <rect y="920" width="794" height="203" fill="url(#cbp-bf)"/>
    </svg>
  )
}
function PreviewSubStele() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden', background:'#080c1a', fontFamily:"'Cormorant Garamond',serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Raleway:wght@300;400&display=swap');`}</style>
      <CelestialBgPreview />
      <div style={{ position:'absolute', inset:0, zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'108px 88px 52px', textAlign:'center' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'16px', marginBottom:'18px', fontSize:'20px' }}>
          <span style={{ opacity:.55 }}>🌑</span><span style={{ opacity:.5, fontSize:'18px' }}>🌒</span>
          <span style={{ opacity:.75, fontSize:'22px' }}>🌕</span>
          <span style={{ opacity:.5, fontSize:'18px' }}>🌘</span><span style={{ opacity:.55 }}>🌑</span>
        </div>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'11px', letterSpacing:'.38em', textTransform:'uppercase', color:'#b8a050', marginBottom:'8px' }}>Sub cerul înstelat, cu dragoste</p>
        <div style={{ display:'flex', alignItems:'center', gap:'12px', width:'100%', marginBottom:'18px' }}>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c8a840,transparent)', opacity:.5 }} />
          <span style={{ fontSize:'14px', color:'#c8a840', opacity:.7 }}>✦</span>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c8a840,transparent)', opacity:.5 }} />
        </div>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'11px', letterSpacing:'.28em', textTransform:'uppercase', color:'#7080b0', marginBottom:'6px' }}>Cu binecuvântarea părinților</p>
        <p style={{ fontSize:'22px', fontStyle:'italic', color:'#c8d4f0', lineHeight:1.6, marginBottom:'4px' }}>Ion și Maria Popescu</p>
        <p style={{ fontSize:'22px', fontStyle:'italic', color:'#c8d4f0', lineHeight:1.6, marginBottom:'14px' }}>Gheorghe și Elena Ionescu</p>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'96px', fontWeight:300, fontStyle:'italic', color:'#f0d060', lineHeight:1, display:'block', textShadow:'0 0 40px rgba(240,208,96,.25)', marginBottom:'4px' }}>
          Adrian <span style={{ fontSize:'72px', color:'#c8b878' }}>&amp;</span> Andreea
        </span>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'11px', letterSpacing:'.28em', textTransform:'uppercase', color:'#7080b0', marginBottom:'14px' }}>vă invită cu drag la nunta lor</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#b8a050', marginBottom:'5px', opacity:.8 }}>Nași de cununie</p>
        <p style={{ fontSize:'24px', fontStyle:'italic', color:'#c8d4f0', marginBottom:'14px' }}>Mihai și Cristina Dumitrescu</p>
        <p style={{ fontSize:'30px', fontWeight:600, color:'#e8d080', letterSpacing:'.06em', marginBottom:'12px' }}>Duminică, 14 Septembrie 2025</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#b8a050', marginBottom:'4px', opacity:.8 }}>Cununie Religioasă</p>
        <p style={{ fontSize:'24px', fontStyle:'italic', color:'#c8d4f0', marginBottom:'3px' }}>Catedrala Sf. Iosif</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'13px', fontWeight:300, color:'#8090b8', letterSpacing:'.1em', marginBottom:'12px' }}>ora 16:00</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'#b8a050', marginBottom:'4px', opacity:.8 }}>Recepție</p>
        <p style={{ fontSize:'24px', fontStyle:'italic', color:'#c8d4f0', marginBottom:'3px' }}>Château des Étoiles</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'13px', fontWeight:300, color:'#8090b8', letterSpacing:'.1em', marginBottom:'12px' }}>ora 19:00</p>
        <p style={{ fontSize:'18px', fontStyle:'italic', color:'#8090b8', lineHeight:1.9 }}>
          Confirmați până la <strong style={{ color:'#c8d4f0', fontStyle:'normal', fontWeight:400 }}>1 August 2025</strong><br/>
          Tel: <strong style={{ color:'#c8d4f0', fontStyle:'normal', fontWeight:400 }}>0700 000 000</strong>
        </p>
      </div>
    </div>
  )
}
function PreviewPoza() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden', fontFamily:"'Raleway',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Raleway:wght@300;400;500&display=swap');`}</style>
      <ForestBgPreview />
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(180deg,rgba(15,10,5,.45) 0%,rgba(20,13,6,.35) 30%,rgba(25,15,5,.5) 70%,rgba(10,6,2,.7) 100%)' }} />
      <div style={{ position:'absolute', inset:0, zIndex:3, background:'radial-gradient(ellipse at center,transparent 40%,rgba(5,3,1,.65) 100%)' }} />
      <div style={{ position:'absolute', inset:0, zIndex:4, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', padding:'60px 80px 56px', color:'#fff', textAlign:'center' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
          <p style={{ fontSize:'11px', fontWeight:400, letterSpacing:'.32em', textTransform:'uppercase', color:'rgba(255,255,255,.65)', marginBottom:'6px' }}>VĂ INVITĂM ÎMPREUNĂ</p>
          <MonogramPozaPreview init1="M" init2="S" />
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'96px', fontWeight:400, fontStyle:'italic', color:'#fff', lineHeight:1, display:'block', textShadow:'0 2px 20px rgba(0,0,0,.4)' }}>
            Miruna <span style={{ fontSize:'72px', fontWeight:300 }}>&amp;</span> Ștefan
          </span>
        </div>
        <div style={{ width:'100%' }}>
          <div style={{ width:'100%', height:'1px', background:'rgba(255,255,255,.3)', marginBottom:'24px' }} />
          <p style={{ fontSize:'17px', fontWeight:400, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.9)', lineHeight:1.7, marginBottom:'20px' }}>
            Elena și Constantin Vasiliu<br/>Ana și Gheorghe Ionescu
          </p>
          <p style={{ fontSize:'26px', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'#fff', marginBottom:'18px' }}>14 SEPTEMBRIE 2024</p>
          <div style={{ width:'100%', height:'1px', background:'rgba(255,255,255,.3)', marginBottom:'18px' }} />
          <p style={{ fontSize:'15px', fontWeight:300, letterSpacing:'.1em', color:'rgba(255,255,255,.6)', fontStyle:'italic' }}>Cununie-generatii.trust / Ora 14:00 · Restaurant Forest View / Ora 18:00</p>
        </div>
      </div>
    </div>
  )
}
const GeoMonogram = ({ init1, init2 }: { init1: string; init2: string }) => (
  <svg viewBox="0 0 200 200" fill="none" width="200" height="200">
    <defs>
      <linearGradient id="cs-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a840"/>
        <stop offset="50%" stopColor="#f0cc70"/>
        <stop offset="100%" stopColor="#b8900c"/>
      </linearGradient>
    </defs>
    <polygon points="100,12 172,52 172,148 100,188 28,148 28,52" fill="none" stroke="url(#cs-gold)" strokeWidth="1.5" opacity=".9"/>
    <polygon points="100,28 158,62 158,138 100,172 42,138 42,62" fill="none" stroke="url(#cs-gold)" strokeWidth=".7" opacity=".5"/>
    <line x1="28" y1="52" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    <line x1="172" y1="52" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    <line x1="28" y1="148" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    <line x1="172" y1="148" x2="100" y2="100" stroke="url(#cs-gold)" strokeWidth=".6" opacity=".35"/>
    {/* Frunze stanga */}
    <path d="M28 100 Q10 80 5 60 Q18 72 28 100Z" fill="#8faa90" opacity=".8"/>
    <path d="M28 100 Q12 112 8 130 Q22 118 28 100Z" fill="#8faa90" opacity=".7"/>
    <path d="M5 60 Q16 80 28 100 Q22 118 8 130" stroke="#6a8a6a" strokeWidth="1" fill="none" opacity=".6"/>
    {/* Frunze dreapta */}
    <path d="M172 100 Q190 80 195 60 Q182 72 172 100Z" fill="#8faa90" opacity=".8"/>
    <path d="M172 100 Q188 112 192 130 Q178 118 172 100Z" fill="#8faa90" opacity=".7"/>
    <path d="M195 60 Q184 80 172 100 Q178 118 192 130" stroke="#6a8a6a" strokeWidth="1" fill="none" opacity=".6"/>
    {/* Initiale */}
    <text x="100" y="90" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="38" fontStyle="italic" fill="url(#cs-gold)" opacity=".95">{init1}</text>
    <line x1="70" y1="100" x2="130" y2="100" stroke="url(#cs-gold)" strokeWidth="1" opacity=".6"/>
    <text x="100" y="136" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="38" fontStyle="italic" fill="url(#cs-gold)" opacity=".95">{init2}</text>
  </svg>
)
const KraftBg = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123" preserveAspectRatio="none">
    <defs>
      <linearGradient id="rk-kraft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d4b07a"/>
        <stop offset="30%" stopColor="#c8a060"/>
        <stop offset="60%" stopColor="#be9458"/>
        <stop offset="100%" stopColor="#c4a068"/>
      </linearGradient>
      <filter id="rk-blur-heavy"><feGaussianBlur stdDeviation="8"/></filter>
    </defs>
    <rect width="794" height="1123" fill="url(#rk-kraft)"/>
    <ellipse cx="200" cy="300" rx="250" ry="180" fill="#a07840" opacity=".12" filter="url(#rk-blur-heavy)"/>
    <ellipse cx="600" cy="800" rx="220" ry="160" fill="#8a6030" opacity=".1" filter="url(#rk-blur-heavy)"/>
    {/* Margini franjurate */}
    <path d="M0 0 Q30 12 60 5 Q90 -2 120 8 Q150 18 180 6 Q210 -4 240 10 Q270 24 300 8 Q330 -4 360 12 Q390 28 420 8 Q450 -8 480 10 Q510 28 540 6 Q570 -8 600 12 Q630 32 660 8 Q690 -8 720 12 Q750 32 780 8 Q794 4 794 0 L0 0Z" fill="#e8c888" opacity=".45"/>
    <path d="M0 1123 Q30 1111 60 1118 Q90 1125 120 1115 Q150 1105 180 1117 Q210 1129 240 1113 Q270 1097 300 1115 Q330 1133 360 1111 Q390 1089 420 1115 Q450 1141 480 1113 Q510 1085 540 1117 Q570 1149 600 1115 Q630 1081 660 1115 Q690 1149 720 1115 Q750 1081 780 1115 Q794 1123 794 1123 L0 1123Z" fill="#e8c888" opacity=".45"/>
    {/* Portative watermark */}
    <g opacity=".12">
      <line x1="40" y1="380" x2="754" y2="380" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="395" x2="754" y2="395" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="410" x2="754" y2="410" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="425" x2="754" y2="425" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="440" x2="754" y2="440" stroke="#3a2010" strokeWidth="1.2"/>
    </g>
    <g opacity=".08">
      <line x1="40" y1="720" x2="754" y2="720" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="735" x2="754" y2="735" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="750" x2="754" y2="750" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="765" x2="754" y2="765" stroke="#3a2010" strokeWidth="1.2"/>
      <line x1="40" y1="780" x2="754" y2="780" stroke="#3a2010" strokeWidth="1.2"/>
    </g>
    {/* Cheie Sol watermark */}
    <text x="397" y="620" textAnchor="middle" fontFamily="serif" fontSize="280" fill="#3a2010" opacity=".05">𝄞</text>
    {/* Silueta vioara */}
    <g transform="translate(610,780) scale(0.7)" opacity=".13">
      <path d="M60 0 C80 0 95 15 95 35 C95 50 85 60 75 68 C85 78 92 90 92 105 C92 130 75 148 60 148 C45 148 28 130 28 105 C28 90 35 78 45 68 C35 60 25 50 25 35 C25 15 40 0 60 0Z" fill="none" stroke="#3a1a08" strokeWidth="3"/>
      <rect x="55" y="148" width="10" height="80" fill="none" stroke="#3a1a08" strokeWidth="2"/>
      <path d="M55 228 C50 240 45 250 50 258 C55 266 65 258 60 248" fill="none" stroke="#3a1a08" strokeWidth="2"/>
      <line x1="60" y1="40" x2="60" y2="145" stroke="#3a1a08" strokeWidth="1" opacity=".5"/>
      <line x1="48" y1="80" x2="72" y2="80" stroke="#3a1a08" strokeWidth="1.5"/>
    </g>
    {/* Bordura */}
    <rect x="28" y="28" width="738" height="1067" fill="none" stroke="#5a3a1a" strokeWidth="1.5" opacity=".45"/>
    <rect x="38" y="38" width="718" height="1047" fill="none" stroke="#5a3a1a" strokeWidth=".7" opacity=".3"/>
    <g opacity=".5">
      <path d="M28 80 L28 28 L80 28" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="28" cy="28" r="4" fill="#8b5e2e" opacity=".6"/>
      <path d="M714 28 L766 28 L766 80" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="766" cy="28" r="4" fill="#8b5e2e" opacity=".6"/>
      <path d="M28 1043 L28 1095 L80 1095" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="28" cy="1095" r="4" fill="#8b5e2e" opacity=".6"/>
      <path d="M714 1095 L766 1095 L766 1043" stroke="#5a3a1a" strokeWidth="2.5" fill="none"/>
      <circle cx="766" cy="1095" r="4" fill="#8b5e2e" opacity=".6"/>
    </g>
  </svg>
)
const StaffSVG = ({ opacity = '.4', notes = true }: { opacity?: string; notes?: boolean }) => (
  <svg viewBox="0 0 614 28" style={{ width:'100%', height:'28px', display:'block' }} fill="none">
    {[4,10,16,22,28].map(y => (
      <line key={y} x1="0" y1={y} x2="614" y2={y} stroke="#5a3a1a" strokeWidth="1" opacity={opacity}/>
    ))}
    <text x="4" y="26" fontFamily="serif" fontSize="32" fill="#8b5e2e" opacity=".65">𝄞</text>
    {notes && <>
      <text x="60" y="8" fontFamily="serif" fontSize="18" fill="#3a2010" opacity=".5">♩</text>
      <text x="110" y="14" fontFamily="serif" fontSize="16" fill="#3a2010" opacity=".45">♪</text>
      <text x="180" y="6" fontFamily="serif" fontSize="20" fill="#3a2010" opacity=".45">♫</text>
      <text x="260" y="20" fontFamily="serif" fontSize="16" fill="#3a2010" opacity=".4">♩</text>
      <text x="350" y="8" fontFamily="serif" fontSize="18" fill="#3a2010" opacity=".4">♪</text>
      <text x="440" y="16" fontFamily="serif" fontSize="20" fill="#3a2010" opacity=".45">♫</text>
      <text x="540" y="10" fontFamily="serif" fontSize="16" fill="#3a2010" opacity=".45">♩</text>
    </>}
  </svg>
)

function PreviewRustic() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', fontFamily:"'Cormorant Garamond',serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Raleway:wght@300;400;500&display=swap');`}</style>
      <KraftBg />
      <div style={{ position:'relative', zIndex:4, textAlign:'center', width:'100%', padding:'52px 90px 48px', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'12px', fontWeight:400, letterSpacing:'.32em', textTransform:'uppercase', color:'#5a3a1a', opacity:.75, marginBottom:'14px' }}>Cu dragoste vă invită</p>
        <StaffSVG />
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'11px', letterSpacing:'.28em', textTransform:'uppercase', color:'#5a3a1a', opacity:.7, marginBottom:'4px', marginTop:'10px' }}>Cu binecuvântarea părinților</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a0e06', lineHeight:1.5, marginBottom:'4px' }}>Ion și Maria Popescu</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a0e06', lineHeight:1.5, marginBottom:'8px' }}>Gheorghe și Elena Ionescu</p>
        <div style={{ margin:'6px 0' }}>
          <span style={{ fontFamily:"'IM Fell English',serif", fontSize:'72px', color:'#8b5e2e', opacity:.55, lineHeight:1, display:'inline-block', margin:'0 12px' }}>ƒ</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'80px', fontWeight:400, fontStyle:'italic', color:'#1a0e06', lineHeight:1, display:'block' }}>Adrian</span>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'64px', fontWeight:300, fontStyle:'italic', color:'#8b5e2e', display:'block', lineHeight:1 }}>&amp;</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'80px', fontWeight:400, fontStyle:'italic', color:'#1a0e06', lineHeight:1, display:'block' }}>Andreea</span>
          <span style={{ fontFamily:"'IM Fell English',serif", fontSize:'72px', color:'#8b5e2e', opacity:.55, lineHeight:1, display:'inline-block', margin:'0 12px', transform:'scaleX(-1)' }}>ƒ</span>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontWeight:300, fontStyle:'italic', color:'#3a2010', margin:'14px 0 6px' }}>vă invită cu drag la nunta lor</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'11px', letterSpacing:'.28em', textTransform:'uppercase', color:'#5a3a1a', opacity:.7, marginBottom:'4px' }}>Nași de cununie</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'26px', fontStyle:'italic', color:'#1a0e06', marginBottom:'10px' }}>Mihai și Cristina Dumitrescu</p>
        <p style={{ fontSize:'28px', color:'#8b5e2e', opacity:.6, margin:'8px 0', letterSpacing:'8px' }}>✦ ♪ ✦</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'30px', fontWeight:600, color:'#1a0e06', marginBottom:'10px' }}>Duminică, 14 Septembrie 2025</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'11px', letterSpacing:'.28em', textTransform:'uppercase', color:'#5a3a1a', opacity:.7, marginBottom:'4px' }}>Cununie Religioasă</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a0e06', marginBottom:'4px' }}>Biserica Sf. Nicolae</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#3a2010' }}>ora 13:00</p>
        <p style={{ fontSize:'18px', color:'#8b5e2e', opacity:.6, margin:'8px 0' }}>♫</p>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'11px', letterSpacing:'.28em', textTransform:'uppercase', color:'#5a3a1a', opacity:.7, marginBottom:'4px' }}>Recepție</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a0e06', marginBottom:'4px' }}>Restaurant La Conac</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#3a2010' }}>ora 18:00</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontStyle:'italic', color:'#5a3a1a', lineHeight:1.8, marginTop:'14px' }}>
          Confirmați prezența până la <strong style={{ fontStyle:'normal', color:'#1a0e06' }}>1 August 2025</strong><br/>
          Tel: <strong style={{ fontStyle:'normal', color:'#1a0e06' }}>0700 000 000</strong>
        </p>
      </div>
    </div>
  )
}
// ── SVG Pete acuarela sage ────────────────────────────────────────────────────
const SageBlobs = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" preserveAspectRatio="none">
    <defs>
      <filter id="cs-blur"><feGaussianBlur stdDeviation="18"/></filter>
      <filter id="cs-blur-sm"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    <ellipse cx="80" cy="120" rx="160" ry="100" fill="#8faa90" opacity=".28" filter="url(#cs-blur)"/>
    <ellipse cx="40" cy="80" rx="90" ry="60" fill="#7a9a80" opacity=".2" filter="url(#cs-blur-sm)"/>
    <ellipse cx="140" cy="160" rx="110" ry="70" fill="#a0b8a0" opacity=".18" filter="url(#cs-blur)"/>
    <ellipse cx="720" cy="100" rx="140" ry="90" fill="#8faa90" opacity=".25" filter="url(#cs-blur)"/>
    <ellipse cx="760" cy="60" rx="80" ry="50" fill="#7a9a80" opacity=".18" filter="url(#cs-blur-sm)"/>
    <ellipse cx="100" cy="1020" rx="150" ry="90" fill="#8faa90" opacity=".22" filter="url(#cs-blur)"/>
    <ellipse cx="700" cy="1010" rx="140" ry="85" fill="#8faa90" opacity=".22" filter="url(#cs-blur)"/>
    <ellipse cx="750" cy="1060" rx="90" ry="55" fill="#7a9a80" opacity=".16" filter="url(#cs-blur-sm)"/>
  </svg>
)
function PreviewCasa() {
  return (
    <div style={{ width:'794px', height:'1123px', background:'#f8f5ef', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 90px 70px', fontFamily:"'Raleway',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital,wght@1,400&family=Raleway:wght@300;400;500&display=swap');`}</style>
      <SageBlobs />
      <div style={{ position:'relative', zIndex:3, textAlign:'center', width:'100%', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ marginBottom:'28px' }}><GeoMonogram init1="A" init2="A" /></div>
        <p style={{ fontSize:'13px', fontWeight:500, letterSpacing:'.28em', textTransform:'uppercase', color:'#5a5a4a', marginBottom:'10px' }}>TOGETHER WITH THEIR FAMILIES</p>
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'80px', fontWeight:700, color:'#1a1a14', lineHeight:1, marginBottom:'10px' }}>
          Adrian <span style={{ fontStyle:'italic', fontWeight:400, color:'#b8a060' }}>&amp;</span> Andreea
        </p>
        <p style={{ fontSize:'13px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', color:'#5a5a4a', marginBottom:'28px' }}>INVITE YOU TO CELEBRATE THEIR UNION</p>
        <div style={{ width:'80px', height:'1px', background:'#b8a060', opacity:.5, margin:'0 auto 28px' }} />
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'32px', fontStyle:'italic', color:'#1a1a14', marginBottom:'20px' }}>Sâmbătă | 12 SEPTEMBRIE 2027</p>
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'30px', fontWeight:700, color:'#1a1a14', marginBottom:'6px' }}>Biserica Sf. Gheorghe</p>
        <p style={{ fontSize:'14px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#5a5a4a', marginBottom:'18px' }}>RECEPȚIE, CINĂ ȘI DANS</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#3a3a2e', lineHeight:1.7 }}>Ora 16:00, Catedrala Ortodoxă, Onești</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#3a3a2e', lineHeight:1.7 }}>Ora 18:00, Restaurant "Vatra", Bacău</p>
        <div style={{ width:'80px', height:'1px', background:'#b8a060', opacity:.4, margin:'24px auto' }} />
        <div style={{ display:'inline-block', padding:'14px 52px', background:'#6b8a70', color:'#fff', fontSize:'16px', fontWeight:500, letterSpacing:'.1em', borderRadius:'4px', marginBottom:'22px' }}>Confirmare Prezență</div>
        <p style={{ fontSize:'14px', fontWeight:300, fontStyle:'italic', color:'#5a5a4a' }}>Vă rugăm să confirmați până la 15 IULIE 2027</p>
      </div>
    </div>
  )
}
function PreviewOcean() {
  return (
    <div style={{ width:'794px', height:'1123px', background:'#f0f5fa', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', padding:'0 80px 60px', fontFamily:"'Raleway',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500&display=swap');`}</style>
      <BotanicalOcean />
      <SealOcean />
      <div style={{ width:'220px', height:'220px', margin:'0 auto -10px', position:'relative', zIndex:2, flexShrink:0 }}>
        <CrownOcean />
      </div>
      <div style={{ position:'relative', zIndex:2, textAlign:'center', width:'100%' }}>
        <p style={{ fontSize:'20px', fontWeight:300, fontStyle:'italic', color:'#2a5fa8', marginBottom:'16px' }}>vă invită cu drag la nunta lor</p>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'88px', fontWeight:400, fontStyle:'italic', color:'#1a3a6a', lineHeight:1, display:'block', marginBottom:'10px' }}>
          Miruna <span style={{ color:'#2a5fa8' }}>&amp;</span> Ștefan
        </span>
        <div style={{ width:'80px', height:'1px', background:'#2a5fa8', opacity:.3, margin:'14px auto 20px' }} />
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'28px', fontWeight:600, color:'#1a3a6a', marginBottom:'20px' }}>Sâmbătă, 14 Septembrie 2024</p>
        <div style={{ marginBottom:'16px' }}>
          <p style={{ fontSize:'14px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'4px' }}>Cununia Religioasă</p>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontStyle:'italic', color:'#1a3a6a' }}>Biserica Sfântul Gheorghe</p>
          <p style={{ fontSize:'18px', fontWeight:300, color:'#4a7ac0' }}>Ora 13:00</p>
        </div>
        <div style={{ marginBottom:'20px' }}>
          <p style={{ fontSize:'14px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'4px' }}>Recepție</p>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontStyle:'italic', color:'#1a3a6a' }}>Restaurant Vatra Botoșanei</p>
          <p style={{ fontSize:'18px', fontWeight:300, color:'#4a7ac0' }}>Ora 18:00</p>
        </div>
        <div style={{ width:'60px', height:'1px', background:'#2a5fa8', opacity:.25, margin:'0 auto 16px' }} />
        <p style={{ fontSize:'13px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'5px' }}>Părinții Miresei</p>
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'24px', fontStyle:'italic', color:'#1a3a6a', marginBottom:'14px' }}>Elena și Constantin Vasile</p>
        <p style={{ fontSize:'13px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'5px' }}>Părinții Mirelui</p>
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'24px', fontStyle:'italic', color:'#1a3a6a', marginBottom:'14px' }}>Ana și Gheorghe Ionescu</p>
        <p style={{ fontSize:'13px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'5px' }}>Nași</p>
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'24px', fontStyle:'italic', color:'#1a3a6a', marginBottom:'16px' }}>Mihaela și Florin Popescu</p>
        <p style={{ fontSize:'17px', fontWeight:300, color:'#4a7ac0', fontStyle:'italic', lineHeight:1.9 }}>
          Confirmați până pe <span style={{ color:'#1a3a6a', fontWeight:500, fontStyle:'normal' }}>1 Septembrie 2024</span><br/>
          Tel: <span style={{ color:'#1a3a6a', fontWeight:500, fontStyle:'normal' }}>0700 000 000</span>
        </p>
      </div>
    </div>
  )
}
function PreviewSimpla() {
  return (
    <div style={{ width:'794px', height:'1123px', background:'#f5f0e8', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 100px 100px', fontFamily:"'Raleway',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Raleway:wght@300;400;500&display=swap');`}</style>
      {/* Margini hartie */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" preserveAspectRatio="none">
        <rect width="794" height="1123" fill="#f5f0e8"/>
        <rect width="794" height="1123" fill="none" stroke="#c8b89a" strokeWidth="1" opacity=".25"/>
        <path d="M0 0 Q14 10 2 24 Q10 40 0 58 Q12 76 0 94 Q8 112 0 130 Q14 148 0 166 L0 0Z" fill="#e0d8c8" opacity=".5"/>
        <path d="M794 0 Q780 14 792 30 Q784 48 794 64 Q780 82 794 98 Q786 116 794 134 L794 0Z" fill="#e0d8c8" opacity=".5"/>
        <path d="M0 1123 Q14 1113 0 1099 Q10 1085 0 1071 L0 1123Z" fill="#e0d8c8" opacity=".5"/>
        <path d="M794 1123 Q780 1110 794 1096 Q784 1082 794 1068 L794 1123Z" fill="#e0d8c8" opacity=".5"/>
      </svg>
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
        <ellipse cx="38" cy="34" rx="8" ry="5" fill="#a8c8f0" opacity=".2" transform="rotate(-30 38 34)"/>
      </svg>
      {/* Text */}
      <div style={{ position:'relative', zIndex:3, textAlign:'center', width:'100%' }}>
        <p style={{ fontSize:'15px', fontWeight:500, letterSpacing:'.32em', textTransform:'uppercase', color:'#2a5fa8', lineHeight:1.6 }}>INVITAȚIE</p>
        <p style={{ fontSize:'15px', fontWeight:500, letterSpacing:'.32em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'32px' }}>DE NUNTĂ</p>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'96px', fontWeight:400, fontStyle:'italic', color:'#1a3a6a', lineHeight:1, display:'block', marginBottom:'12px' }}>
          Miruna <span style={{ color:'#2a5fa8' }}>&amp;</span> Ștefan
        </span>
        <p style={{ fontSize:'22px', fontWeight:300, fontStyle:'italic', color:'#3a5a9a', marginBottom:'36px' }}>vă invită cu dragoste la nuntă</p>
        <p style={{ fontSize:'26px', color:'#1a3a6a', marginBottom:'8px' }}>Sâmbătă, 14 Septembrie 2024</p>
        <div style={{ marginBottom:'20px' }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'28px', fontStyle:'italic', color:'#1a3a6a', display:'block' }}>Biserica Sfântul Gheorghe — Onești</span>
          <span style={{ fontSize:'20px', fontWeight:300, color:'#3a5a9a', display:'block' }}>Ora 14:00</span>
        </div>
        <div style={{ marginBottom:'24px' }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'28px', fontStyle:'italic', color:'#1a3a6a', display:'block' }}>Restaurant Vatra Botoșanei</span>
          <span style={{ fontSize:'20px', fontWeight:300, color:'#3a5a9a', display:'block' }}>Ora 18:00</span>
        </div>
        <div style={{ width:'48px', height:'1px', background:'#2a5fa8', opacity:.3, margin:'0 auto 24px' }} />
        <span style={{ fontSize:'14px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'6px', display:'block' }}>Părinții Miresei</span>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontStyle:'italic', color:'#1a3a6a', display:'block', marginBottom:'18px' }}>Elena și Constantin Vasile</span>
        <span style={{ fontSize:'14px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'6px', display:'block' }}>Părinții Mirelui</span>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontStyle:'italic', color:'#1a3a6a', display:'block', marginBottom:'18px' }}>Ana și Gheorghe Ionescu</span>
        <span style={{ fontSize:'14px', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a5fa8', marginBottom:'6px', display:'block' }}>Nași</span>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontStyle:'italic', color:'#1a3a6a', display:'block', marginBottom:'20px' }}>Mihaela și Florin Popescu</span>
        <p style={{ fontSize:'18px', fontWeight:300, color:'#3a5a9a', fontStyle:'italic', lineHeight:2 }}>
          Confirmați până pe <strong style={{ fontStyle:'normal', color:'#1a3a6a', fontWeight:500 }}>1 Septembrie 2024</strong><br/>
          Tel: <strong style={{ fontStyle:'normal', color:'#1a3a6a', fontWeight:500 }}>0700 000 000</strong>
        </p>
      </div>
    </div>
  )
}
const PreviewCoral = () => (
  <div style={{ width:'794px', height:'1123px', background:'#faf8f5', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', fontFamily:"'Raleway',sans-serif" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Cormorant+Garamond:ital,wght@1,400&family=Raleway:wght@300;400;500;600&display=swap');`}</style>
    {/* SVG coroana */}
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} viewBox="0 0 794 1123" fill="none">
      <defs>
        <radialGradient id="cp-b1" cx="30%" cy="25%" r="70%"><stop offset="0%" stopColor="#4a2d7a" stopOpacity=".7"/><stop offset="100%" stopColor="#3a1a6a" stopOpacity="0"/></radialGradient>
        <radialGradient id="cp-b2" cx="70%" cy="25%" r="70%"><stop offset="0%" stopColor="#c87040" stopOpacity=".65"/><stop offset="100%" stopColor="#b85a20" stopOpacity="0"/></radialGradient>
        <radialGradient id="cp-b3" cx="20%" cy="80%" r="60%"><stop offset="0%" stopColor="#1a5a4a" stopOpacity=".6"/><stop offset="100%" stopColor="#2a7a5a" stopOpacity="0"/></radialGradient>
        <radialGradient id="cp-b4" cx="80%" cy="80%" r="60%"><stop offset="0%" stopColor="#5a2a7a" stopOpacity=".65"/><stop offset="100%" stopColor="#3a1a5a" stopOpacity="0"/></radialGradient>
        <filter id="cp-blur-sm"><feGaussianBlur stdDeviation="8"/></filter>
        <filter id="cp-blur-md"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <ellipse cx="140" cy="200" rx="180" ry="140" fill="url(#cp-b1)" filter="url(#cp-blur-md)" opacity=".85"/>
      <ellipse cx="660" cy="180" rx="160" ry="130" fill="url(#cp-b2)" filter="url(#cp-blur-md)" opacity=".85"/>
      <ellipse cx="120" cy="900" rx="160" ry="120" fill="url(#cp-b3)" filter="url(#cp-blur-md)" opacity=".8"/>
      <ellipse cx="680" cy="880" rx="150" ry="120" fill="url(#cp-b4)" filter="url(#cp-blur-md)" opacity=".8"/>
      <g opacity=".9"><path d="M50 80 Q120 140 80 240 Q60 290 90 340" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
        {[140,165,190,215,238].map((y,i) => (<g key={i}><path d={`M${80-i} ${y} Q${50-i*2} ${y-13} ${35-i*2} ${y-26}`} stroke="#3a5a28" strokeWidth="1" fill="none"/><path d={`M${80-i} ${y} Q${108+i} ${y-12} ${118+i} ${y-25}`} stroke="#3a5a28" strokeWidth="1" fill="none"/></g>))}
      </g>
      <g opacity=".85"><path d="M20 180 Q80 220 60 320 Q50 370 80 420" stroke="#4a6a3a" strokeWidth="1.2" fill="none"/>
        {[[45,220,-30],[55,255,15],[48,290,-20],[60,325,25],[52,358,-15]].map(([cx,cy,r],i) => (<ellipse key={i} cx={cx} cy={cy} rx="22" ry="10" fill="#5a7a44" opacity=".65" transform={`rotate(${r} ${cx} ${cy})`}/>))}
      </g>
      <g opacity=".8">
        <ellipse cx="100" cy="120" rx="35" ry="14" fill="#4a1a6a" opacity=".6" transform="rotate(-40 100 120)"/>
        <ellipse cx="140" cy="95" rx="30" ry="12" fill="#5a2a7a" opacity=".55" transform="rotate(-60 140 95)"/>
        <ellipse cx="75" cy="150" rx="32" ry="13" fill="#3a1258" opacity=".55" transform="rotate(-25 75 150)"/>
      </g>
      <g opacity=".85">
        <circle cx="180" cy="105" r="10" fill="#e8783a" opacity=".8"/>
        <circle cx="168" cy="90" r="7" fill="#f0904a" opacity=".7"/>
        <circle cx="130" cy="78" r="5" fill="#e87030" opacity=".7"/>
      </g>
      <g transform="translate(794,0) scale(-1,1)" opacity=".9"><path d="M50 80 Q120 140 80 240 Q60 290 90 340" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
        {[140,165,190,215].map((y,i) => (<g key={i}><path d={`M${80-i} ${y} Q${50-i*2} ${y-13} ${35-i*2} ${y-26}`} stroke="#3a5a28" strokeWidth="1" fill="none"/><path d={`M${80-i} ${y} Q${108+i} ${y-12} ${118+i} ${y-25}`} stroke="#3a5a28" strokeWidth="1" fill="none"/></g>))}
      </g>
      <g transform="translate(794,0) scale(-1,1)" opacity=".85"><path d="M20 180 Q80 220 60 320 Q50 370 80 420" stroke="#4a6a3a" strokeWidth="1.2" fill="none"/>
        {[[45,220,30],[55,255,-15],[48,290,20],[60,325,-25]].map(([cx,cy,r],i) => (<ellipse key={i} cx={cx} cy={cy} rx="22" ry="10" fill="#5a7a44" opacity=".65" transform={`rotate(${r} ${cx} ${cy})`}/>))}
      </g>
      <g transform="translate(794,0) scale(-1,1)" opacity=".8">
        <ellipse cx="100" cy="120" rx="35" ry="14" fill="#4a1a6a" opacity=".6" transform="rotate(40 100 120)"/>
        <ellipse cx="140" cy="95" rx="30" ry="12" fill="#5a2a7a" opacity=".55" transform="rotate(60 140 95)"/>
      </g>
      <g transform="translate(794,0) scale(-1,1)" opacity=".85">
        <circle cx="180" cy="105" r="10" fill="#e8783a" opacity=".8"/>
        <circle cx="130" cy="78" r="5" fill="#e87030" opacity=".7"/>
      </g>
      <g opacity=".88" transform="translate(0,1123) scale(1,-1)"><path d="M30 60 Q100 100 80 200 Q65 250 100 300" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
        <ellipse cx="50" cy="185" rx="26" ry="11" fill="#5a7a4a" opacity=".65" transform="rotate(-20 50 185)"/>
        <ellipse cx="90" cy="115" rx="34" ry="14" fill="#4a1a6a" opacity=".55" transform="rotate(-42 90 115)"/>
        <circle cx="160" cy="80" r="9" fill="#e8783a" opacity=".75"/>
      </g>
      <g opacity=".88" transform="translate(794,1123) scale(-1,-1)"><path d="M30 60 Q100 100 80 200 Q65 250 100 300" stroke="#2d4a1e" strokeWidth="1.5" fill="none"/>
        <ellipse cx="50" cy="185" rx="26" ry="11" fill="#5a7a4a" opacity=".65" transform="rotate(20 50 185)"/>
        <ellipse cx="90" cy="115" rx="34" ry="14" fill="#4a1a6a" opacity=".55" transform="rotate(42 90 115)"/>
        <circle cx="160" cy="80" r="9" fill="#e8783a" opacity=".75"/>
      </g>
      {/* Monograma */}
      <g transform="translate(397,130)">
        <polygon points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26" fill="none" stroke="#b8860b" strokeWidth="1.8" opacity=".9"/>
        <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22" fill="none" stroke="#b8860b" strokeWidth="1" opacity=".5"/>
        <path d="M-12,-50 Q-6,-62 0,-58 Q6,-62 12,-50" stroke="#b8860b" strokeWidth="1.2" fill="none" opacity=".8"/>
        <text x="0" y="-8" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fontStyle="italic" fill="#b8860b" opacity=".95">M</text>
        <text x="0" y="22" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fontStyle="italic" fill="#b8860b" opacity=".95">S</text>
      </g>
    </svg>
    {/* Spatiu monograma */}
    <div style={{ height:'230px', flexShrink:0 }} />
    {/* TEXT */}
    <div style={{ position:'relative', zIndex:3, textAlign:'center', width:'100%', padding:'0 80px', flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <p style={{ fontSize:'13px', fontWeight:600, letterSpacing:'.28em', textTransform:'uppercase', color:'#6b4c1e', marginBottom:'16px' }}>INVITAȚIE DE NUNTĂ</p>
      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'84px', fontWeight:700, fontStyle:'italic', color:'#1a1208', lineHeight:1, display:'block' }}>Miruna</span>
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'72px', fontWeight:400, fontStyle:'italic', color:'#b8860b', lineHeight:1 }}>&amp;</span>
      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'84px', fontWeight:700, fontStyle:'italic', color:'#1a1208', lineHeight:1, display:'block' }}>Ștefan</span>
      <span style={{ color:'#b8860b', fontSize:'22px', opacity:.7, margin:'6px 0 14px', display:'block' }}>❧</span>
      <p style={{ fontSize:'18px', fontWeight:300, fontStyle:'italic', color:'#4a3a2a', marginBottom:'20px' }}>vă invită cu dragoste la nuntă</p>
      <div style={{ border:'1.5px solid #b8860b', borderRadius:'2px', padding:'14px 32px', marginBottom:'20px', background:'rgba(255,255,255,.5)', width:'100%' }}>
        <p style={{ fontSize:'17px', fontWeight:600, letterSpacing:'.08em', color:'#1a1208', textTransform:'uppercase', marginBottom:'6px' }}>Sâmbătă, 14 SEPTEMBRIE 2024</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontStyle:'italic', color:'#2a1a0a', lineHeight:1.6 }}>Ora 14:00 / Biserica "Sfântul Gheorghe"</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontStyle:'italic', color:'#2a1a0a', lineHeight:1.6 }}>Ora 18:00 / Restaurant "Vatra Boierească"</p>
      </div>
      <div style={{ width:'60px', height:'1px', background:'#b8860b', opacity:.4, margin:'0 auto 14px' }} />
      <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'.22em', textTransform:'uppercase', color:'#6b4c1e', marginBottom:'4px' }}>Părinții Miresei</p>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a1208', marginBottom:'10px' }}>Elena și Constantin Vasiliu</p>
      <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'.22em', textTransform:'uppercase', color:'#6b4c1e', marginBottom:'4px' }}>Părinții Mirelui</p>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a1208', marginBottom:'10px' }}>Ana și Gheorghe Ionescu</p>
      <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'.22em', textTransform:'uppercase', color:'#6b4c1e', marginBottom:'4px' }}>Nașii</p>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a1208', marginBottom:'14px' }}>Mihaela și Florin Popescu</p>
      <p style={{ fontSize:'13px', fontWeight:500, letterSpacing:'.14em', textTransform:'uppercase', color:'#6b4c1e', lineHeight:1.8 }}>VĂ RUGĂM SĂ CONFIRMAȚI PÂNĂ LA <strong>15 SEP 2024</strong></p>
    </div>
  </div>
)
function PreviewVara() {
  return (
    <div style={{ width:'794px', height:'1123px', background:'#f9f7f2', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 80px', fontFamily:"'Lato',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=Lato:wght@300;400&display=swap');`}</style>
      <BotanicalSVG />
      <SealSVG />
      <div style={{ position:'relative', zIndex:2, textAlign:'center', width:'100%' }}>
        <p style={{ fontSize:'13px', fontWeight:300, fontStyle:'italic', color:'#3d5a3e', marginBottom:'4px' }}>Două suflete, o promisiune sub cerul liber</p>
        <p style={{ fontSize:'13px', fontWeight:300, fontStyle:'italic', color:'#3d5a3e', marginBottom:'28px' }}>Vă invităm cu drag la nunta noastră</p>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'62px', fontWeight:300, color:'#1a2e1a', lineHeight:1.05, display:'block' }}>Mire</span>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'48px', fontWeight:300, fontStyle:'italic', color:'#3d5a3e', display:'block', lineHeight:1.1, margin:'4px 0' }}>&amp;</span>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'62px', fontWeight:300, color:'#1a2e1a', lineHeight:1.05, display:'block', marginBottom:'28px' }}>Mireasă</span>
        <div style={{ width:'60px', height:'1px', background:'#3d5a3e', opacity:.35, margin:'0 auto 24px' }} />
        <p style={{ fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'#5a7a5a', marginBottom:'5px' }}>Cu binecuvântarea părinților noștri</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'18px', fontStyle:'italic', color:'#1a2e1a', lineHeight:1.5, marginBottom:'16px' }}>Familia [Părinți Mire]<br/>Familia [Părinți Mireasă]</p>
        <p style={{ fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'#5a7a5a', marginBottom:'5px' }}>Și călăuziți de nașii noștri</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'18px', fontStyle:'italic', color:'#1a2e1a', lineHeight:1.5, marginBottom:'24px' }}>[Prenume Nași]</p>
        <div style={{ width:'60px', height:'1px', background:'#3d5a3e', opacity:.35, margin:'0 auto 20px' }} />
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontStyle:'italic', color:'#1a2e1a', marginBottom:'16px' }}>Sâmbătă, 14 Iunie, 2025</p>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'center', gap:'32px', marginBottom:'18px' }}>
          {[['Cununia Religioasă','[Biserică]','13:00'],['Marea Sărbătoare','[Restaurant]','18:00']].map(([label,name,time],i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <p style={{ fontSize:'9px', letterSpacing:'.18em', textTransform:'uppercase', color:'#5a7a5a', marginBottom:'4px' }}>{label}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'16px', fontStyle:'italic', color:'#1a2e1a' }}>{name}</p>
              <p style={{ fontSize:'11px', fontWeight:300, color:'#5a7a5a', marginTop:'2px' }}>Ora {time}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize:'11px', fontWeight:300, color:'#5a7a5a', fontStyle:'italic', lineHeight:1.8 }}>Confirmați prezența până pe <span style={{ color:'#3d5a3e' }}>1 Iunie 2025</span><br/>Tel: <span style={{ color:'#3d5a3e' }}>0700 000 000</span></p>
      </div>
    </div>
  )
}
// Wrapper care masoara latimea reala si aplica scale corect
function ScaledPreview({ PreviewComp }: { PreviewComp: React.FC<any> }) {  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(el.offsetWidth / 794)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="io-preview-wrap" ref={wrapRef}>
      <div className="io-preview-scaler" style={{ transform: `scale(${scale})` }}>
        <PreviewComp />
      </div>
    </div>
  )
}
const PiratBg = () => (
  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} viewBox="0 0 794 1123">
    <defs>
      <linearGradient id="pt-parch" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f5e6c8"/>
        <stop offset="35%" stopColor="#edd9a3"/>
        <stop offset="65%" stopColor="#e8d090"/>
        <stop offset="100%" stopColor="#d4b86a"/>
      </linearGradient>
      <radialGradient id="pt-btl" cx="0%" cy="0%" r="50%">
        <stop offset="0%" stopColor="#5a3010" stopOpacity=".55"/>
        <stop offset="100%" stopColor="#5a3010" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="pt-btr" cx="100%" cy="0%" r="50%">
        <stop offset="0%" stopColor="#4a2808" stopOpacity=".5"/>
        <stop offset="100%" stopColor="#4a2808" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="pt-bbl" cx="0%" cy="100%" r="50%">
        <stop offset="0%" stopColor="#5a3010" stopOpacity=".5"/>
        <stop offset="100%" stopColor="#5a3010" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="pt-bbr" cx="100%" cy="100%" r="50%">
        <stop offset="0%" stopColor="#4a2808" stopOpacity=".55"/>
        <stop offset="100%" stopColor="#4a2808" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="pt-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5b8fa8" stopOpacity=".6"/>
        <stop offset="100%" stopColor="#3a6a88" stopOpacity=".8"/>
      </linearGradient>
      <linearGradient id="pt-island" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8ab840"/>
        <stop offset="60%" stopColor="#c8a840"/>
        <stop offset="100%" stopColor="#a08020"/>
      </linearGradient>
      <radialGradient id="pt-tglow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffd700" stopOpacity=".5"/>
        <stop offset="100%" stopColor="#ffd700" stopOpacity="0"/>
      </radialGradient>
      <filter id="pt-ink"><feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#3a1808" floodOpacity=".35"/></filter>
      <filter id="pt-glow"><feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#c8900a" floodOpacity=".6"/></filter>
    </defs>

    <rect width="794" height="1123" fill="url(#pt-parch)"/>
    <rect width="794" height="1123" fill="url(#pt-btl)"/>
    <rect width="794" height="1123" fill="url(#pt-btr)"/>
    <rect width="794" height="1123" fill="url(#pt-bbl)"/>
    <rect width="794" height="1123" fill="url(#pt-bbr)"/>

    {/* Margini arse sus */}
    <path d="M0 0 Q15 8 30 3 Q45 -2 60 6 Q75 14 90 4 Q105 -4 120 8 Q135 20 150 6 Q165 -6 180 10 Q195 26 210 8 Q225 -4 240 12 Q255 28 270 10 Q285 -4 300 14 Q315 32 330 12 Q345 -4 360 16 Q375 36 390 14 Q405 -4 420 18 Q435 40 450 16 Q465 -4 480 14 Q495 32 510 12 Q525 -4 540 16 Q555 36 570 14 Q585 -6 600 12 Q615 30 630 10 Q645 -8 660 8 Q675 24 690 6 Q705 -8 720 8 Q735 24 750 4 Q765 -12 780 6 Q790 14 794 10 L794 0 L0 0 Z" fill="#c09848" opacity=".55"/>
    <path d="M0 1123 Q20 1115 40 1120 Q60 1125 80 1116 Q100 1107 120 1118 Q140 1129 160 1116 Q180 1103 200 1116 Q220 1129 240 1114 Q260 1099 280 1114 Q300 1129 320 1112 Q340 1095 360 1112 Q380 1129 400 1110 Q420 1091 440 1110 Q460 1129 480 1112 Q500 1095 520 1112 Q540 1129 560 1116 Q580 1103 600 1116 Q620 1129 640 1118 Q660 1107 680 1118 Q700 1129 720 1114 Q740 1099 760 1114 Q780 1129 794 1118 L794 1123 L0 1123 Z" fill="#c09848" opacity=".55"/>

    {/* Harta geografica */}
    <path d="M80 200 Q120 180 160 220 Q200 260 180 300 Q160 340 120 320 Q80 300 70 260 Q60 220 80 200 Z" fill="url(#pt-water)" opacity=".5"/>
    <path d="M100 310 Q150 280 200 300 Q250 320 260 370 Q270 420 220 440 Q170 460 130 430 Q90 400 85 360 Q80 320 100 310 Z" fill="url(#pt-island)" opacity=".7"/>
    <path d="M100 310 Q150 280 200 300 Q250 320 260 370 Q270 420 220 440 Q170 460 130 430 Q90 400 85 360 Q80 320 100 310 Z" fill="none" stroke="#5a3a10" strokeWidth="1.5" opacity=".6"/>
    <path d="M500 150 Q560 130 620 160 Q680 190 690 240 Q700 290 650 310 Q600 330 550 300 Q500 270 490 220 Q480 170 500 150 Z" fill="url(#pt-water)" opacity=".45"/>
    <path d="M620 280 Q680 260 730 290 Q760 310 750 360 Q740 400 700 410 Q660 420 640 390 Q620 360 610 320 Q600 280 620 280 Z" fill="url(#pt-island)" opacity=".65"/>
    <path d="M620 280 Q680 260 730 290 Q760 310 750 360 Q740 400 700 410 Q660 420 640 390 Q620 360 610 320 Q600 280 620 280 Z" fill="none" stroke="#5a3a10" strokeWidth="1.5" opacity=".5"/>
    <path d="M60 700 Q100 680 140 700 Q170 720 165 750 Q160 780 120 790 Q80 800 60 770 Q40 740 60 700 Z" fill="url(#pt-island)" opacity=".6"/>
    <path d="M60 700 Q100 680 140 700 Q170 720 165 750 Q160 780 120 790 Q80 800 60 770 Q40 740 60 700 Z" fill="none" stroke="#5a3a10" strokeWidth="1.2" opacity=".5"/>

    {/* Ruta punctata */}
    <path d="M120 440 Q200 500 280 480 Q360 460 420 520 Q480 580 530 560 Q580 540 600 600" stroke="#8b4513" strokeWidth="2" fill="none" strokeDasharray="8,5" opacity=".6"/>
    <path d="M600 600 Q640 640 660 680 Q680 720 640 740" stroke="#8b4513" strokeWidth="1.5" fill="none" strokeDasharray="6,4" opacity=".5"/>

    {/* Roza vanturilor */}
    <g transform="translate(680,820)" opacity=".6">
      <circle r="55" fill="none" stroke="#5a3010" strokeWidth="1"/>
      <circle r="28" fill="#edd9a3" opacity=".8"/>
      <circle r="28" fill="none" stroke="#5a3010" strokeWidth="1"/>
      <path d="M0,-55 L7,-30 L0,-20 L-7,-30 Z" fill="#5a3010"/>
      <path d="M0,55 L5,32 L0,22 L-5,32 Z" fill="#5a3010" opacity=".7"/>
      <path d="M-55,0 L-32,5 L-22,0 L-32,-5 Z" fill="#5a3010" opacity=".7"/>
      <path d="M55,0 L32,7 L22,0 L32,-7 Z" fill="#c8900a"/>
      <text x="0" y="-62" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="13" fontWeight="700" fill="#5a3010">N</text>
      <text x="62" y="4" textAnchor="start" fontFamily="Cinzel,serif" fontSize="11" fill="#5a3010">E</text>
      <text x="0" y="72" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="11" fill="#5a3010">S</text>
      <text x="-64" y="4" textAnchor="end" fontFamily="Cinzel,serif" fontSize="11" fill="#5a3010">V</text>
      <circle r="5" fill="#c8900a"/>
      <circle r="2" fill="#5a3010"/>
      <line x1="-38" y1="-38" x2="38" y2="38" stroke="#5a3010" strokeWidth=".7" opacity=".4"/>
      <line x1="38" y1="-38" x2="-38" y2="38" stroke="#5a3010" strokeWidth=".7" opacity=".4"/>
    </g>

    {/* Corabie */}
    <g transform="translate(380,570)" opacity=".8" filter="url(#pt-ink)">
      <path d="M-80 40 Q-90 60 -85 80 Q-60 95 0 100 Q60 95 85 80 Q90 60 80 40 Z" fill="#5a3010"/>
      <path d="M-80 40 Q-75 10 -60 0 Q-30 -8 0 -8 Q30 -8 60 0 Q75 10 80 40 Z" fill="#6a3818"/>
      <rect x="-62" y="-6" width="124" height="6" rx="2" fill="#8b4513"/>
      <rect x="-3" y="-120" width="6" height="120" fill="#4a2808"/>
      <rect x="-55" y="-98" width="110" height="5" rx="2" fill="#4a2808"/>
      <path d="M-52 -93 Q-30 -50 0 -45 Q30 -50 52 -93 Q30 -100 0 -106 Q-30 -100 -52 -93 Z" fill="#f5f0e0" stroke="#c8a840" strokeWidth="1"/>
      <path d="M-30 -95 Q-15 -65 0 -60 Q15 -65 30 -95" stroke="#c8a840" strokeWidth="1" fill="none" opacity=".5"/>
      <line x1="-40" y1="-8" x2="-65" y2="-80" stroke="#4a2808" strokeWidth="5" strokeLinecap="round"/>
      <path d="M-42 -12 Q-55 -40 -63 -75 Q-48 -58 -40 -40 Q-38 -25 -42 -12 Z" fill="#f5f0e0" stroke="#c8a840" strokeWidth=".8" opacity=".9"/>
      <rect x="3" y="-118" width="38" height="28" rx="2" fill="#1a1a1a"/>
      <ellipse cx="22" cy="-110" rx="7" ry="6" fill="#f5e6c8"/>
      <ellipse cx="22" cy="-107" rx="8" ry="4" fill="#1a1a1a"/>
      <circle cx="19" cy="-112" r="1.5" fill="#1a1a1a"/>
      <circle cx="25" cy="-112" r="1.5" fill="#1a1a1a"/>
      <line x1="15" y1="-104" x2="29" y2="-98" stroke="#f5e6c8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="29" y1="-104" x2="15" y2="-98" stroke="#f5e6c8" strokeWidth="2" strokeLinecap="round"/>
      {[[-45,18],[-25,22],[-5,24],[15,22],[35,18]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#c8a840" opacity=".6"/>
      ))}
      <path d="M-90 88 Q-60 78 -30 88 Q0 98 30 88 Q60 78 90 88" stroke="#5b8fa8" strokeWidth="2.5" fill="none" opacity=".7"/>
      <path d="M-85 96 Q-55 86 -25 96 Q5 106 35 96 Q65 86 85 96" stroke="#5b8fa8" strokeWidth="2" fill="none" opacity=".5"/>
    </g>

    {/* X marks the spot */}
    <g transform="translate(640,680)" filter="url(#pt-glow)">
      <circle r="40" fill="url(#pt-tglow)"/>
      <line x1="-22" y1="-22" x2="22" y2="22" stroke="#8b0000" strokeWidth="8" strokeLinecap="round"/>
      <line x1="22" y1="-22" x2="-22" y2="22" stroke="#8b0000" strokeWidth="8" strokeLinecap="round"/>
      <line x1="-22" y1="-22" x2="22" y2="22" stroke="#cc0000" strokeWidth="5" strokeLinecap="round"/>
      <line x1="22" y1="-22" x2="-22" y2="22" stroke="#cc0000" strokeWidth="5" strokeLinecap="round"/>
      <circle r="6" fill="#ffd700"/>
      <circle r="3" fill="#c8900a"/>
    </g>

    {/* Lada comori */}
    <g transform="translate(645,740)" opacity=".75">
      <rect x="-30" y="-20" width="60" height="40" rx="4" fill="#5a3010"/>
      <path d="M-30 -20 Q-30 -40 0 -40 Q30 -40 30 -20 Z" fill="#6a3818"/>
      <rect x="-8" y="-24" width="16" height="10" rx="2" fill="#c8900a"/>
      <circle cx="0" cy="-19" r="3" fill="#ffd700"/>
      {[[-30,-22],[ 22,-22],[-30,14],[22,14]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="8" height="8" rx="1" fill="#c8900a" opacity=".8"/>
      ))}
      <ellipse cx="-10" cy="-26" rx="8" ry="5" fill="#ffd700" opacity=".9"/>
      <ellipse cx="5" cy="-30" rx="8" ry="5" fill="#e8c840" opacity=".9"/>
      <ellipse cx="15" cy="-26" rx="7" ry="4" fill="#ffd700" opacity=".85"/>
    </g>

    {/* Craniu */}
    <g transform="translate(95,780)" opacity=".5">
      <ellipse cx="0" cy="-15" rx="22" ry="20" fill="#3a2010"/>
      <ellipse cx="0" cy="-22" rx="20" ry="16" fill="#3a2010"/>
      <path d="M-18 -5 Q-20 10 -12 16 Q0 20 12 16 Q20 10 18 -5 Z" fill="#3a2010"/>
      <ellipse cx="-8" cy="-16" rx="6" ry="7" fill="#edd9a3"/>
      <ellipse cx="8" cy="-16" rx="6" ry="7" fill="#edd9a3"/>
      <ellipse cx="-8" cy="-15" rx="3.5" ry="4.5" fill="#1a1008"/>
      <ellipse cx="8" cy="-15" rx="3.5" ry="4.5" fill="#1a1008"/>
      <path d="M-3 -6 L0 -2 L3 -6" fill="none" stroke="#edd9a3" strokeWidth="1.5" strokeLinecap="round"/>
      {[[-14,9],[-6,8],[2,8],[10,9]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="6" height={i===0||i===3?8:9} rx="1" fill="#edd9a3"/>
      ))}
      <line x1="-35" y1="25" x2="35" y2="-5" stroke="#3a2010" strokeWidth="9" strokeLinecap="round"/>
      <line x1="35" y1="25" x2="-35" y2="-5" stroke="#3a2010" strokeWidth="9" strokeLinecap="round"/>
      {[[-38,27],[38,27],[-38,-7],[38,-7]].map(([cx,cy],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="9" ry="7" fill="#3a2010"/>
      ))}
    </g>

    {/* Bordura */}
    <rect x="28" y="28" width="738" height="1067" fill="none" stroke="#8b6914" strokeWidth="2.5" opacity=".7"/>
    <rect x="36" y="36" width="722" height="1051" fill="none" stroke="#8b6914" strokeWidth="1" opacity=".4"/>
    <g fill="#8b6914" opacity=".7">
      <path d="M28 28 L68 28 L28 68 Z"/>
      <path d="M28 28 L55 28 L28 55 Z" fill="#c8900a" opacity=".6"/>
      <path d="M766 28 L726 28 L766 68 Z"/>
      <path d="M766 28 L739 28 L766 55 Z" fill="#c8900a" opacity=".6"/>
      <path d="M28 1095 L68 1095 L28 1055 Z"/>
      <path d="M28 1095 L55 1095 L28 1068 Z" fill="#c8900a" opacity=".6"/>
      <path d="M766 1095 L726 1095 L766 1055 Z"/>
      <path d="M766 1095 L739 1095 L766 1068 Z" fill="#c8900a" opacity=".6"/>
    </g>
    <g fill="#8b6914" opacity=".5">
      <polygon points="28,561 38,571 28,581 18,571"/>
      <polygon points="766,561 776,571 766,581 756,571"/>
      <polygon points="397,28 407,38 397,48 387,38"/>
      <polygon points="397,1095 407,1085 397,1075 387,1085"/>
    </g>
  </svg>
)
function PreviewPirat() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Pirata+One&family=Cinzel:wght@400;700&family=Nunito:wght@400;600&display=swap');`}</style>
      <PiratBg />
      <div style={{ position:'absolute', inset:0, zIndex:6, display:'flex', flexDirection:'column', alignItems:'center', padding:'52px 80px 48px', textAlign:'center' }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', fontWeight:400, letterSpacing:'.5em', textTransform:'uppercase', color:'#5a3010', opacity:.7, marginBottom:'8px' }}>⚓ Invitație de Botez ⚓</p>
        <div style={{ width:'100%', height:'2px', background:'linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent)', marginBottom:'14px', opacity:.7 }} />
        <p style={{ fontFamily:"'Pirata One',cursive", fontSize:'80px', color:'#3a1808', lineHeight:.9, textShadow:'2px 2px 0 #c8900a,4px 4px 0 rgba(139,105,20,.3)', letterSpacing:'.02em' }}>LUCA</p>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', margin:'12px 0 8px', width:'100%' }}>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#8b6914)' }} />
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'18px', color:'#8b6914' }}>☠</span>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#8b6914,transparent)' }} />
        </div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'20px', fontWeight:400, fontStyle:'italic', color:'#5a3010', letterSpacing:'.08em' }}>a aterizat în port!</p>
        <div style={{ flex:1, minHeight:'160px' }} />
        <div style={{ width:'100%' }}>
          <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent)', marginBottom:'20px', opacity:.6 }} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2px 1fr', gap:0, marginBottom:'18px' }}>
            <div style={{ textAlign:'right', paddingRight:'28px' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#8b6914', marginBottom:'5px' }}>⚓ Echipaj</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', fontWeight:400, color:'#3a1808', lineHeight:1.4, marginBottom:'18px' }}>Elena și Andrei Popescu</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#8b6914', marginBottom:'5px' }}>☠ Nași</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', fontWeight:400, color:'#3a1808', lineHeight:1.4 }}>Maria și Cristian Ionescu</p>
            </div>
            <div style={{ background:'linear-gradient(180deg,transparent,#8b6914,transparent)' }} />
            <div style={{ textAlign:'left', paddingLeft:'28px' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#8b6914', marginBottom:'5px' }}>🕊 Port I — Botez</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'20px', fontWeight:400, color:'#3a1808', lineHeight:1.3, marginBottom:'4px' }}>Biserica Sf. Nicolae</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'18px', fontWeight:400, color:'#6a3818', marginBottom:'18px' }}>15 Iunie 2025, ora 11:00</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#8b6914', marginBottom:'5px' }}>🍖 Port II — Petrecere</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'20px', fontWeight:400, color:'#3a1808', lineHeight:1.3, marginBottom:'4px' }}>Restaurant La Conac</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'18px', fontWeight:400, color:'#6a3818' }}>15 Iunie 2025, ora 13:00</p>
            </div>
          </div>
          <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent)', marginBottom:'14px', opacity:.6 }} />
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.38em', textTransform:'uppercase', color:'#8b6914', marginBottom:'5px' }}>🗺 Trimite semnal radio</p>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'28px', fontWeight:700, color:'#3a1808', letterSpacing:'.04em' }}>0700 000 000</p>
        </div>
      </div>
    </div>
  )
}
const FloralBg = ({ id = 'fr' }: { id?: string }) => (
  <svg style={{ position:'absolute', inset:0, width:'794px', height:'1123px', zIndex:0 }} viewBox="0 0 794 1123">
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef6f0"/>
        <stop offset="40%" stopColor="#fdf0f4"/>
        <stop offset="70%" stopColor="#fce8f0"/>
        <stop offset="100%" stopColor="#f8e0ea"/>
      </linearGradient>
      <radialGradient id={`${id}-r1`} cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#f9c8d8"/>
        <stop offset="40%" stopColor="#f0a0bc"/>
        <stop offset="100%" stopColor="#d4607a"/>
      </radialGradient>
      <radialGradient id={`${id}-p1`} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#fcd8e4"/>
        <stop offset="50%" stopColor="#f8aac4"/>
        <stop offset="100%" stopColor="#e07098"/>
      </radialGradient>
      <radialGradient id={`${id}-rd`} cx="30%" cy="25%" r="70%">
        <stop offset="0%" stopColor="#f5b8cc"/>
        <stop offset="35%" stopColor="#e8849e"/>
        <stop offset="70%" stopColor="#c85878"/>
        <stop offset="100%" stopColor="#a03858"/>
      </radialGradient>
      <linearGradient id={`${id}-lg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8ab878"/>
        <stop offset="100%" stopColor="#5a8848"/>
      </linearGradient>
      <linearGradient id={`${id}-eu`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a8c8b8"/>
        <stop offset="100%" stopColor="#78a898"/>
      </linearGradient>
      <linearGradient id={`${id}-gd`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="20%" stopColor="#d4aa70"/>
        <stop offset="50%" stopColor="#e8c888"/>
        <stop offset="80%" stopColor="#d4aa70"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
      <filter id={`${id}-gs`}><feGaussianBlur stdDeviation="20"/></filter>
      <filter id={`${id}-ps`}><feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#c85878" floodOpacity=".2"/></filter>
      <filter id={`${id}-ls`}><feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#2a5a38" floodOpacity=".25"/></filter>
    </defs>

    <rect width="794" height="1123" fill={`url(#${id}-bg)`}/>
    <ellipse cx="150" cy="200" rx="280" ry="220" fill="#f8b0c8" opacity=".12" filter={`url(#${id}-gs)`}/>
    <ellipse cx="650" cy="180" rx="260" ry="200" fill="#f0a0bc" opacity=".1" filter={`url(#${id}-gs)`}/>
    <ellipse cx="397" cy="950" rx="300" ry="200" fill="#f8c0d0" opacity=".1" filter={`url(#${id}-gs)`}/>

    {/* Eucalipt stanga */}
    <g opacity=".85" filter={`url(#${id}-ls)`}>
      <path d="M 0 -20 Q 40 60 20 160 Q 10 220 30 300" stroke="#78a898" strokeWidth="2.5" fill="none"/>
      {[[18,80,-35],[28,110,25],[15,140,-40],[30,168,30],[16,196,-35],[28,222,20],[26,280,-20]].map(([cx,cy,r],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={22-i} ry={11-i*0.3} fill={`url(#${id}-eu)`} transform={`rotate(${r} ${cx} ${cy})`}/>
      ))}
    </g>
    <g opacity=".7">
      <path d="M -10 0 Q 70 80 50 200 Q 40 260 70 340" stroke="#8ab898" strokeWidth="2" fill="none"/>
      {[[48,95,-30],[62,130,28],[48,162,-32],[64,195,25],[50,226,-28],[65,305,20]].map(([cx,cy,r],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={20-i*0.3} ry={9} fill="#a8c8b0" transform={`rotate(${r} ${cx} ${cy})`}/>
      ))}
    </g>
    {/* Frunze stanga */}
    <g opacity=".75" filter={`url(#${id}-ls)`}>
      <path d="M 30 50 C 80 20 140 40 130 90 C 120 130 60 140 40 110 C 20 80 -5 75 30 50 Z" fill={`url(#${id}-lg)`}/>
      <path d="M 60 120 C 110 90 165 115 158 165 C 150 205 90 212 72 180 C 54 148 28 142 60 120 Z" fill="#6a9858" opacity=".8"/>
      <path d="M 10 200 C 55 168 108 188 102 235 C 96 272 38 278 22 248 C 6 218 -18 224 10 200 Z" fill="#5a8848" opacity=".75"/>
    </g>

    {/* Trandafir 1 mare */}
    <g transform="translate(118,145)" filter={`url(#${id}-ps)`}>
      <path d="M 0 -52 C 28 -48 52 -28 52 0 C 52 30 28 52 0 52 C -28 52 -52 30 -52 0 C -52 -28 -28 -48 0 -52 Z" fill="#f5b8cc" opacity=".6"/>
      <path d="M 0 -44 C 22 -40 42 -22 44 2 C 46 28 24 46 0 46 C -24 46 -44 28 -42 2 C -40 -22 -22 -40 0 -44 Z" fill={`url(#${id}-p1)`} opacity=".8"/>
      <path d="M 0 -32 C 16 -28 30 -14 30 4 C 30 22 16 32 0 32 C -16 32 -30 22 -30 4 C -30 -14 -16 -28 0 -32 Z" fill={`url(#${id}-rd)`} opacity=".85"/>
      <path d="M 0 -28 C 10 -22 18 -10 16 4 C 8 -4 2 -10 0 -16 C -2 -10 -8 -4 -16 4 C -18 -10 -10 -22 0 -28 Z" fill="#fce0ea" opacity=".6"/>
      <circle cx="0" cy="2" r="8" fill="#e8789a"/>
      <circle cx="0" cy="2" r="4" fill="#d45878"/>
      <circle cx="0" cy="0" r="2" fill="#c03a5a"/>
      <path d="M 44 -22 C 52 -8 52 12 44 26" stroke="#f0a0bc" strokeWidth="8" fill="none" strokeLinecap="round" opacity=".5"/>
      <path d="M -44 -22 C -52 -8 -52 12 -44 26" stroke="#f0a0bc" strokeWidth="8" fill="none" strokeLinecap="round" opacity=".5"/>
      <path d="M -22 -44 C -8 -52 12 -52 26 -44" stroke="#f0a0bc" strokeWidth="8" fill="none" strokeLinecap="round" opacity=".5"/>
    </g>

    {/* Trandafir 2 */}
    <g transform="translate(220,80)" filter={`url(#${id}-ps)`}>
      <path d="M 0 -38 C 20 -34 36 -18 36 2 C 36 22 20 36 0 36 C -20 36 -36 22 -36 2 C -36 -18 -20 -34 0 -38 Z" fill="#f9c8d8" opacity=".65"/>
      <path d="M 0 -30 C 16 -26 28 -12 28 4 C 28 20 14 28 0 28 C -14 28 -28 20 -28 4 C -28 -12 -16 -26 0 -30 Z" fill={`url(#${id}-r1)`} opacity=".9"/>
      <path d="M 0 -22 C 10 -18 18 -8 16 4 C 8 -2 1 -8 0 -12 C -1 -8 -8 -2 -16 4 C -18 -8 -10 -18 0 -22 Z" fill="#fde8f0" opacity=".7"/>
      <circle cx="0" cy="4" r="7" fill="#e0789a"/>
      <circle cx="0" cy="4" r="3" fill="#c85878"/>
    </g>

    {/* Trandafir 3 stanga */}
    <g transform="translate(55,255)" filter={`url(#${id}-ps)`}>
      <path d="M 0 -34 C 18 -30 32 -16 32 2 C 32 20 18 32 0 32 C -18 32 -32 20 -32 2 C -32 -16 -18 -30 0 -34 Z" fill="#fbd0e0" opacity=".7"/>
      <path d="M 0 -26 C 14 -22 24 -10 24 4 C 24 18 12 26 0 26 C -12 26 -24 18 -24 4 C -24 -10 -14 -22 0 -26 Z" fill={`url(#${id}-p1)`} opacity=".85"/>
      <circle cx="0" cy="4" r="6" fill="#d86888"/>
      <circle cx="0" cy="4" r="3" fill="#c04868"/>
    </g>

    {/* Bujor mare stanga */}
    <g transform="translate(90,340)" filter={`url(#${id}-ps)`}>
      {[[-42,0,0,-26],[-30,14,24,-22],[14,36,28,10],[42,0,6,34],[-28,-12,-16,22],[-42,0,-28,-10],[-14,-34,18,-34]].map(([x1,y1,x2,y2],i) => (
        <path key={i} d={`M 0 ${x1} C ${y1} ${x2} ${i%2===0?24:34} ${y2} ${i%2===0?14:6} ${x1>0?x1-10:x1+10} Z`} fill={i%2===0?"#fbc8dc":"#f8b8cc"} opacity={i%2===0?.8:.75}/>
      ))}
      <circle cx="0" cy="0" r="24" fill={`url(#${id}-p1)`} opacity=".9"/>
      <circle cx="0" cy="0" r="10" fill="#e87898"/>
      <circle cx="0" cy="0" r="5" fill="#d45878"/>
      <circle cx="0" cy="0" r="2" fill="#c03858"/>
    </g>

    {/* Flori mici stanga */}
    <g transform="translate(168,290)"><circle r="14" fill="#fce0ea" opacity=".7"/><circle r="8" fill="#f0a8c0" opacity=".8"/><circle r="4" fill="#e07898"/></g>
    <g transform="translate(195,360)"><circle r="10" fill="#fbd0e4" opacity=".65"/><circle r="6" fill="#f0a0b8" opacity=".75"/><circle r="3" fill="#d86888"/></g>

    {/* Eucalipt dreapta jos (mirror) */}
    <g transform="translate(794,1123) scale(-1,-1)" opacity=".8" filter={`url(#${id}-ls)`}>
      <path d="M 0 -10 Q 40 60 20 170 Q 10 230 40 310" stroke="#78a898" strokeWidth="2.5" fill="none"/>
      {[[18,80,-35],[28,112,25],[15,144,-40],[30,174,30],[16,204,-35],[28,270,20]].map(([cx,cy,r],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={22-i*0.5} ry={11-i*0.3} fill={`url(#${id}-eu)`} transform={`rotate(${r} ${cx} ${cy})`}/>
      ))}
    </g>
    <g transform="translate(794,1123) scale(-1,-1)" opacity=".65">
      <path d="M -10 0 Q 70 80 50 200 Q 40 260 70 340" stroke="#8ab898" strokeWidth="2" fill="none"/>
      {[[48,95,-30],[62,130,28],[50,164,-32],[65,198,25],[65,310,20]].map(([cx,cy,r],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={20-i*0.3} ry={9} fill="#a8c8b0" transform={`rotate(${r} ${cx} ${cy})`}/>
      ))}
    </g>
    <g transform="translate(794,1123) scale(-1,-1)" opacity=".75" filter={`url(#${id}-ls)`}>
      <path d="M 30 50 C 80 20 140 40 130 90 C 120 130 60 140 40 110 C 20 80 -5 75 30 50 Z" fill={`url(#${id}-lg)`}/>
      <path d="M 60 120 C 110 90 165 115 158 165 C 150 205 90 212 72 180 C 54 148 28 142 60 120 Z" fill="#6a9858" opacity=".8"/>
      <path d="M 10 200 C 55 168 108 188 102 235 C 96 272 38 278 22 248 C 6 218 -18 224 10 200 Z" fill="#5a8848" opacity=".75"/>
    </g>

    {/* Trandafir mare dreapta jos */}
    <g transform="translate(676,978)" filter={`url(#${id}-ps)`}>
      <path d="M 0 -48 C 26 -44 46 -24 46 2 C 46 28 26 46 0 46 C -26 46 -46 28 -46 2 C -46 -24 -26 -44 0 -48 Z" fill="#f9c0d0" opacity=".6"/>
      <path d="M 0 -38 C 20 -34 36 -18 36 2 C 36 22 20 36 0 36 C -20 36 -36 22 -36 2 C -36 -18 -20 -34 0 -38 Z" fill={`url(#${id}-rd)`} opacity=".85"/>
      <path d="M 0 -28 C 12 -24 22 -12 20 4 C 10 -4 2 -10 0 -14 C -2 -10 -10 -4 -20 4 C -22 -12 -12 -24 0 -28 Z" fill="#fde8f2" opacity=".65"/>
      <circle cx="0" cy="2" r="10" fill="#d46888"/>
      <circle cx="0" cy="2" r="5" fill="#b84868"/>
    </g>

    {/* Bujor dreapta jos */}
    <g transform="translate(734,900)" filter={`url(#${id}-ps)`}>
      <circle cx="0" cy="0" r="36" fill={`url(#${id}-p1)`} opacity=".7"/>
      <circle cx="0" cy="0" r="22" fill={`url(#${id}-p1)`} opacity=".9"/>
      <circle cx="0" cy="0" r="11" fill="#e07898"/>
      <circle cx="0" cy="0" r="5" fill="#c85878"/>
    </g>

    {/* Trandafir mic dreapta jos */}
    <g transform="translate(610,1040)" filter={`url(#${id}-ps)`}>
      <path d="M 0 -30 C 16 -26 28 -14 28 2 C 28 18 16 28 0 28 C -16 28 -28 18 -28 2 C -28 -14 -16 -26 0 -30 Z" fill={`url(#${id}-r1)`} opacity=".85"/>
      <circle cx="0" cy="2" r="7" fill="#d86888"/>
      <circle cx="0" cy="2" r="3" fill="#c04868"/>
    </g>
    <g transform="translate(560,1000)"><circle r="12" fill="#fce0ea" opacity=".65"/><circle r="7" fill="#f0a8c0" opacity=".75"/><circle r="3" fill="#e07898"/></g>

    {/* Arc floral deasupra numelui */}
    <g transform="translate(397,380)" opacity=".7">
      {[[-140,-15,-20],[-115,-30,-35],[-88,-40,-50],[-60,-46,-65],[-30,-50,-78],[30,-50,78],[60,-46,65],[88,-40,50],[115,-30,35],[140,-15,20]].map(([cx,cy,r],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={18-Math.abs(i-4.5)*1.5} ry={8-Math.abs(i-4.5)*0.4} fill={i%2===0?"#f9c8d8":"#f5b8cc"} transform={`rotate(${r} ${cx} ${cy})`}/>
      ))}
      <circle cx="-160" cy="-8" r="8" fill="#f0a8c0" opacity=".7"/>
      <circle cx="-160" cy="-8" r="4" fill="#e07898" opacity=".8"/>
      <circle cx="160" cy="-8" r="8" fill="#f0a8c0" opacity=".7"/>
      <circle cx="160" cy="-8" r="4" fill="#e07898" opacity=".8"/>
      <circle cx="0" cy="-52" r="10" fill="#fce0ea" opacity=".75"/>
      <circle cx="0" cy="-52" r="6" fill="#f0a8c0" opacity=".8"/>
      <circle cx="0" cy="-52" r="3" fill="#e07898"/>
    </g>

    {/* Linii aurii */}
    <line x1="120" y1="500" x2="674" y2="500" stroke={`url(#${id}-gd)`} strokeWidth="1" opacity=".7"/>
    <line x1="80" y1="506" x2="714" y2="506" stroke={`url(#${id}-gd)`} strokeWidth=".5" opacity=".4"/>
    <line x1="120" y1="900" x2="674" y2="900" stroke={`url(#${id}-gd)`} strokeWidth="1" opacity=".6"/>
    <line x1="80" y1="906" x2="714" y2="906" stroke={`url(#${id}-gd)`} strokeWidth=".5" opacity=".35"/>
    <g transform="translate(397,503)"><polygon points="0,-8 8,0 0,8 -8,0" fill="#d4aa70" opacity=".8"/></g>
    <g transform="translate(397,903)"><polygon points="0,-8 8,0 0,8 -8,0" fill="#d4aa70" opacity=".7"/></g>

    {/* Bordura */}
    <rect x="22" y="22" width="750" height="1079" fill="none" stroke="#d4aa70" strokeWidth="1.5" opacity=".5"/>
    <rect x="30" y="30" width="734" height="1063" fill="none" stroke="#f0a8c0" strokeWidth=".8" opacity=".4"/>
    <g stroke="#d4aa70" strokeWidth="1" fill="none" opacity=".6">
      <path d="M 22 22 L 22 60 M 22 22 L 60 22"/>
      <path d="M 772 22 L 772 60 M 772 22 L 734 22"/>
      <path d="M 22 1101 L 22 1063 M 22 1101 L 60 1101"/>
      <path d="M 772 1101 L 772 1063 M 772 1101 L 734 1101"/>
    </g>
    <g fill="#d4aa70" opacity=".6">
      {[[22,22],[772,22],[22,1101],[772,1101]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="3"/>)}
    </g>
  </svg>
)
function PreviewFeteRoz() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Quicksand:wght@600&display=swap');`}</style>
      <FloralBg id="frprev" />
      <div style={{ position:'absolute', inset:0, zIndex:6, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'0 90px' }}>
        <div style={{ height:'380px', flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom:'16px', width:'100%' }}>
          <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'12px', fontWeight:600, letterSpacing:'.55em', textTransform:'uppercase', color:'#b07090', marginBottom:'10px' }}>✦ Invitație de Botez ✦</p>
        </div>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'96px', fontWeight:700, fontStyle:'italic', color:'#8a2848', lineHeight:.9, display:'block', letterSpacing:'-.01em', textShadow:'0 2px 24px rgba(200,88,120,.2)', marginBottom:'8px' }}>Sofia</span>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontWeight:300, fontStyle:'italic', color:'#c06888', letterSpacing:'.08em' }}>a înflorit în lumea noastră 🌸</p>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', width:'100%', margin:'20px 0' }}>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#d4aa70)' }}/>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', color:'#d4aa70' }}>❦</span>
          <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#d4aa70,transparent)' }}/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1px 1fr', gap:0, width:'100%', marginBottom:'20px' }}>
          <div style={{ paddingRight:'30px', textAlign:'right' }}>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#c87898', marginBottom:'6px' }}>Părinți</p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'28px', fontWeight:400, color:'#5a1e38', lineHeight:1.35, marginBottom:'20px' }}>Elena și Andrei Popescu</p>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#c87898', marginBottom:'6px' }}>Nași</p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'28px', fontWeight:400, color:'#5a1e38', lineHeight:1.35 }}>Maria și Cristian Ionescu</p>
          </div>
          <div style={{ background:'linear-gradient(180deg,transparent,#d4aa70 20%,#d4aa70 80%,transparent)' }}/>
          <div style={{ paddingLeft:'30px', textAlign:'left' }}>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#c87898', marginBottom:'6px' }}>🕊 Sfântul Botez</p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:400, fontStyle:'italic', color:'#5a1e38', lineHeight:1.3, marginBottom:'5px' }}>Biserica Sf. Treime</p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontWeight:300, color:'#c87898', lineHeight:1.5, marginBottom:'20px' }}>10 Mai 2025<br/>ora 11:00</p>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'#c87898', marginBottom:'6px' }}>🌸 Petrecere</p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:400, fontStyle:'italic', color:'#5a1e38', lineHeight:1.3, marginBottom:'5px' }}>Restaurant Belle Fleur</p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontWeight:300, color:'#c87898', lineHeight:1.5 }}>10 Mai 2025<br/>ora 13:00</p>
          </div>
        </div>
        <div style={{ textAlign:'center', paddingBottom:'40px' }}>
          <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.4em', textTransform:'uppercase', color:'#c87898', marginBottom:'8px' }}>Confirmați prezența</p>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:400, color:'#5a1e38', letterSpacing:'.04em' }}>0700 000 000</p>
        </div>
      </div>
    </div>
  )
}
const CONFETTI = Array.from({ length: 80 }, (_, i) => ({
  x: ((i * 173.3 + 47) % 754 + 20).toFixed(1),
  y: ((i * 91.7 + 23) % 1050 + 30).toFixed(1),
  w: (4 + (i % 7) * 1.5).toFixed(1),
  h: (2 + (i % 5) * 1).toFixed(1),
  r: ((i * 37) % 180).toFixed(0),
  color: ['#f9c8d8','#ffd700','#c8e8f8','#d4b8e8','#a8e8c8','#ffeaa0','#f8b8d8'][i % 7],
  op: (0.4 + (i % 6) * 0.08).toFixed(2),
}))

const STARS = Array.from({ length: 30 }, (_, i) => ({
  x: ((i * 211.3 + 83) % 730 + 32).toFixed(1),
  y: ((i * 137.7 + 41) % 500 + 30).toFixed(1),
  s: (6 + (i % 5) * 3).toFixed(0),
  op: (0.3 + (i % 6) * 0.1).toFixed(2),
  color: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#f9c8d8' : '#d4b8e8',
}))
const BalloonsBg = ({ id = 'bl' }: { id?: string }) => (
  <svg style={{ position:'absolute', inset:0, width:'794px', height:'1123px', zIndex:0 }} viewBox="0 0 794 1123">
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f8f0ff"/>
        <stop offset="30%" stopColor="#fce8f8"/>
        <stop offset="60%" stopColor="#fff0f8"/>
        <stop offset="100%" stopColor="#fff8fc"/>
      </linearGradient>
      <radialGradient id={`${id}-roz`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#ffeef5"/>
        <stop offset="25%" stopColor="#ffb8d4"/>
        <stop offset="60%" stopColor="#f07aaa"/>
        <stop offset="100%" stopColor="#d04878"/>
      </radialGradient>
      <radialGradient id={`${id}-lila`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#f5eeff"/>
        <stop offset="25%" stopColor="#d4b8f8"/>
        <stop offset="60%" stopColor="#a878e8"/>
        <stop offset="100%" stopColor="#7840c0"/>
      </radialGradient>
      <radialGradient id={`${id}-mint`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#eefff8"/>
        <stop offset="25%" stopColor="#a8f0d4"/>
        <stop offset="60%" stopColor="#58c8a0"/>
        <stop offset="100%" stopColor="#2a9070"/>
      </radialGradient>
      <radialGradient id={`${id}-cer`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#eef8ff"/>
        <stop offset="25%" stopColor="#a8d8f8"/>
        <stop offset="60%" stopColor="#58a8e8"/>
        <stop offset="100%" stopColor="#2870c0"/>
      </radialGradient>
      <radialGradient id={`${id}-piersica`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#fff8ee"/>
        <stop offset="25%" stopColor="#ffd0a8"/>
        <stop offset="60%" stopColor="#f0a060"/>
        <stop offset="100%" stopColor="#c86830"/>
      </radialGradient>
      <radialGradient id={`${id}-galben`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#fffff0"/>
        <stop offset="25%" stopColor="#fff0a0"/>
        <stop offset="60%" stopColor="#f8d840"/>
        <stop offset="100%" stopColor="#d0a000"/>
      </radialGradient>
      <radialGradient id={`${id}-fucsia`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#fff0ff"/>
        <stop offset="25%" stopColor="#f8b0f0"/>
        <stop offset="60%" stopColor="#e060c8"/>
        <stop offset="100%" stopColor="#a82898"/>
      </radialGradient>
      <radialGradient id={`${id}-coral`} cx="32%" cy="28%" r="68%">
        <stop offset="0%" stopColor="#fff0ee"/>
        <stop offset="25%" stopColor="#ffb8a8"/>
        <stop offset="60%" stopColor="#f07060"/>
        <stop offset="100%" stopColor="#c03840"/>
      </radialGradient>
      <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff8fc"/>
        <stop offset="100%" stopColor="#fff0f8"/>
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="15%" stopColor="#d4aa70"/>
        <stop offset="50%" stopColor="#ffd700"/>
        <stop offset="85%" stopColor="#d4aa70"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
      <linearGradient id={`${id}-pink`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="20%" stopColor="#f0a0c0"/>
        <stop offset="50%" stopColor="#f8c8d8"/>
        <stop offset="80%" stopColor="#f0a0c0"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
      <filter id={`${id}-bsh`}><feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="#c060a0" floodOpacity=".2"/></filter>
      <filter id={`${id}-bgl`}><feGaussianBlur stdDeviation="15" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id={`${id}-amb`}><feGaussianBlur stdDeviation="30"/></filter>
      <filter id={`${id}-sgl`}><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    <rect width="794" height="1123" fill={`url(#${id}-sky)`}/>

    <ellipse cx="200" cy="300" rx="250" ry="200" fill="#f0b0d8" opacity=".08" filter={`url(#${id}-amb)`}/>
    <ellipse cx="600" cy="250" rx="220" ry="180" fill="#c0a0e8" opacity=".07" filter={`url(#${id}-amb)`}/>
    <ellipse cx="397" cy="600" rx="300" ry="150" fill="#f8d0e8" opacity=".06" filter={`url(#${id}-amb)`}/>
    <ellipse cx="100" cy="700" rx="180" ry="150" fill="#a0d0f0" opacity=".06" filter={`url(#${id}-amb)`}/>
    <ellipse cx="700" cy="750" rx="180" ry="150" fill="#d0b0f8" opacity=".07" filter={`url(#${id}-amb)`}/>

    {CONFETTI.map((c, i) => {
      const cx = (parseFloat(c.x) + parseFloat(c.w) / 2).toFixed(1)
      const cy = (parseFloat(c.y) + parseFloat(c.h) / 2).toFixed(1)
      return <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} rx="1" fill={c.color} opacity={c.op} transform={`rotate(${c.r} ${cx} ${cy})`}/>
    })}

    {STARS.map((s, i) => (
      <text key={i} x={s.x} y={s.y} fontSize={s.s} fill={s.color} opacity={s.op} textAnchor="middle" filter={`url(#${id}-sgl)`}>★</text>
    ))}

    <g transform="translate(85,320)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="62" ry="78" fill={`url(#${id}-roz)`}/>
      <ellipse cx="-18" cy="-26" rx="18" ry="12" fill="white" opacity=".35" transform="rotate(-20 -18 -26)"/>
      <ellipse cx="-22" cy="-34" rx="8" ry="5" fill="white" opacity=".2" transform="rotate(-25 -22 -34)"/>
      <path d="M -6 78 Q 0 88 6 78" stroke="#d04878" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="90" rx="5" ry="4" fill="#d04878"/>
      <path d="M 0 94 Q -12 130 -8 160 Q -4 190 -14 220" stroke="#f0a0c0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".7"/>
    </g>

    <g transform="translate(168,220)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="52" ry="65" fill={`url(#${id}-lila)`}/>
      <ellipse cx="-15" cy="-22" rx="15" ry="10" fill="white" opacity=".3" transform="rotate(-22 -15 -22)"/>
      <path d="M -5 65 Q 0 74 5 65" stroke="#7840c0" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="76" rx="4" ry="3.5" fill="#7840c0"/>
      <path d="M 0 79 Q 14 110 10 140 Q 6 165 18 195" stroke="#c0a0e8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".7"/>
    </g>

    <g transform="translate(62,160)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="44" ry="56" fill={`url(#${id}-mint)`}/>
      <ellipse cx="-13" cy="-18" rx="12" ry="8" fill="white" opacity=".3" transform="rotate(-20 -13 -18)"/>
      <path d="M -4 56 Q 0 63 4 56" stroke="#2a9070" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="66" rx="3.5" ry="3" fill="#2a9070"/>
      <path d="M 0 69 Q 8 95 4 118 Q 0 138 10 160" stroke="#a8f0d4" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".65"/>
    </g>

    <g transform="translate(710,290)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="60" ry="75" fill={`url(#${id}-cer)`}/>
      <ellipse cx="-17" cy="-25" rx="17" ry="11" fill="white" opacity=".35" transform="rotate(-22 -17 -25)"/>
      <ellipse cx="-21" cy="-32" rx="7" ry="4" fill="white" opacity=".2" transform="rotate(-25 -21 -32)"/>
      <path d="M -5 75 Q 0 84 5 75" stroke="#2870c0" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="87" rx="4.5" ry="4" fill="#2870c0"/>
      <path d="M 0 91 Q 12 125 8 155 Q 4 180 14 210" stroke="#a8d8f8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".7"/>
    </g>

    <g transform="translate(638,190)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="50" ry="63" fill={`url(#${id}-fucsia)`}/>
      <ellipse cx="-14" cy="-21" rx="14" ry="9" fill="white" opacity=".3" transform="rotate(-20 -14 -21)"/>
      <path d="M -4 63 Q 0 72 4 63" stroke="#a82898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="73" rx="4" ry="3.5" fill="#a82898"/>
      <path d="M 0 76 Q -14 108 -10 138 Q -6 163 -18 192" stroke="#f8b0f0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".7"/>
    </g>

    <g transform="translate(730,150)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="42" ry="53" fill={`url(#${id}-galben)`}/>
      <ellipse cx="-12" cy="-17" rx="11" ry="7" fill="white" opacity=".32" transform="rotate(-18 -12 -17)"/>
      <path d="M -3 53 Q 0 60 3 53" stroke="#d0a000" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="62" rx="3" ry="2.8" fill="#d0a000"/>
      <path d="M 0 65 Q -8 90 -4 112 Q 0 130 -10 152" stroke="#fff0a0" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".65"/>
    </g>

    <g transform="translate(397,200)" filter={`url(#${id}-bgl)`}>
      <ellipse cx="0" cy="0" rx="90" ry="110" fill="#f8b0d8" opacity=".15"/>
      <ellipse cx="0" cy="0" rx="80" ry="100" fill={`url(#${id}-roz)`}/>
      <ellipse cx="-24" cy="-34" rx="24" ry="16" fill="white" opacity=".4" transform="rotate(-22 -24 -34)"/>
      <ellipse cx="-30" cy="-44" rx="10" ry="6" fill="white" opacity=".25" transform="rotate(-28 -30 -44)"/>
      <ellipse cx="28" cy="-20" rx="8" ry="5" fill="white" opacity=".12" transform="rotate(15 28 -20)"/>
      <path d="M -8 100 Q 0 115 8 100" stroke="#d04878" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="118" rx="7" ry="6" fill="#d04878"/>
      <text x="0" y="15" textAnchor="middle" fontSize="28" fill="white" opacity=".3">★</text>
      <path d="M 0 124 Q -5 170 5 210 Q 15 250 5 290 Q -5 320 8 355" stroke="#f0a0c0" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/>
    </g>

    <g transform="translate(130,900)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="38" ry="48" fill={`url(#${id}-piersica)`}/>
      <ellipse cx="-11" cy="-15" rx="10" ry="7" fill="white" opacity=".3" transform="rotate(-20 -11 -15)"/>
      <path d="M -3 48 Q 0 55 3 48" stroke="#c86830" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="57" rx="3" ry="2.5" fill="#c86830"/>
    </g>
    <g transform="translate(190,940)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="32" ry="40" fill={`url(#${id}-lila)`}/>
      <ellipse cx="-9" cy="-13" rx="9" ry="6" fill="white" opacity=".28" transform="rotate(-20 -9 -13)"/>
      <path d="M -3 40 Q 0 46 3 40" stroke="#7840c0" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="48" rx="2.5" ry="2.2" fill="#7840c0"/>
    </g>

    <g transform="translate(620,890)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="40" ry="50" fill={`url(#${id}-coral)`}/>
      <ellipse cx="-12" cy="-16" rx="11" ry="7" fill="white" opacity=".32" transform="rotate(-20 -12 -16)"/>
      <path d="M -3 50 Q 0 57 3 50" stroke="#c03840" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="59" rx="3" ry="2.6" fill="#c03840"/>
    </g>
    <g transform="translate(670,940)" filter={`url(#${id}-bsh)`}>
      <ellipse cx="0" cy="0" rx="30" ry="38" fill={`url(#${id}-mint)`}/>
      <ellipse cx="-9" cy="-12" rx="8" ry="5" fill="white" opacity=".28" transform="rotate(-18 -9 -12)"/>
      <path d="M -2 38 Q 0 44 2 38" stroke="#2a9070" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="0" cy="45" rx="2.5" ry="2.2" fill="#2a9070"/>
    </g>

    <path d="M 317 318 Q 260 380 168 296" stroke="#f0a0c0" strokeWidth="1" fill="none" strokeDasharray="4,3" opacity=".4"/>
    <path d="M 477 318 Q 540 370 638 263" stroke="#d4b8e8" strokeWidth="1" fill="none" strokeDasharray="4,3" opacity=".4"/>

    <path d="M 85 410 Q 60 440 80 470 Q 100 500 75 530" stroke="#f9c8d8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".5"/>
    <path d="M 710 375 Q 740 405 720 435 Q 700 465 730 495" stroke="#d4b8e8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".5"/>

    <rect x="60" y="520" width="674" height="560" rx="24" fill="white" opacity=".7"/>
    <rect x="60" y="520" width="674" height="560" rx="24" fill={`url(#${id}-panel)`} opacity=".5"/>
    <rect x="60" y="520" width="674" height="560" rx="24" fill="none" stroke="#f0a8c0" strokeWidth="1.5" opacity=".5"/>
    <rect x="68" y="528" width="658" height="544" rx="20" fill="none" stroke="#f9c8d8" strokeWidth=".8" opacity=".4"/>
    <line x1="120" y1="558" x2="674" y2="558" stroke={`url(#${id}-pink)`} strokeWidth="1" opacity=".6"/>
    <line x1="120" y1="562" x2="674" y2="562" stroke={`url(#${id}-gold)`} strokeWidth=".8" opacity=".4"/>
    <line x1="120" y1="1048" x2="674" y2="1048" stroke={`url(#${id}-gold)`} strokeWidth="1" opacity=".5"/>
    <line x1="120" y1="1052" x2="674" y2="1052" stroke={`url(#${id}-pink)`} strokeWidth=".8" opacity=".4"/>
    <g fill="#d4aa70" opacity=".5">
      {[[80,535],[714,535],[80,1060],[714,1060]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="4"/>)}
    </g>
    <g stroke="#d4aa70" strokeWidth="1" fill="none" opacity=".4">
      <path d="M 80 535 L 80 558 M 80 535 L 103 535"/>
      <path d="M 714 535 L 714 558 M 714 535 L 691 535"/>
      <path d="M 80 1060 L 80 1040 M 80 1060 L 103 1060"/>
      <path d="M 714 1060 L 714 1040 M 714 1060 L 691 1060"/>
    </g>
    <g opacity=".35">
      <ellipse cx="92" cy="548" rx="10" ry="13" fill="#f9c8d8"/>
      <path d="M 91 561 Q 92 564 93 561" stroke="#d04878" strokeWidth="1" fill="none"/>
      <ellipse cx="702" cy="548" rx="10" ry="13" fill="#d4b8e8"/>
      <path d="M 701 561 Q 702 564 703 561" stroke="#7840c0" strokeWidth="1" fill="none"/>
    </g>

    <rect x="18" y="18" width="758" height="1087" rx="8" fill="none" stroke="#f0a8c0" strokeWidth="1.5" opacity=".4"/>
    <rect x="10" y="10" width="774" height="1103" rx="12" fill="none" stroke="#d4aa70" strokeWidth="1" opacity=".25"/>
  </svg>
)

function PreviewFeteBaloane() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nunito:wght@300;700;800&family=Dancing+Script:wght@400&family=Quicksand:wght@600&display=swap');`}</style>
      <BalloonsBg id="blprev2" />
      <div style={{ position:'absolute', inset:0, zIndex:6, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
        <div style={{ height:'520px', flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom:'18px' }}>
          <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'11px', fontWeight:600, letterSpacing:'.55em', textTransform:'uppercase', color:'#c060a0', background:'rgba(255,255,255,.7)', padding:'4px 20px', borderRadius:'20px' }}>✦ Invitație de Botez ✦</p>
        </div>
        <div style={{ width:'100%', padding:'0 100px', flex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <span style={{ fontFamily:"'Abril Fatface',cursive", fontSize:'96px', color:'#d03870', lineHeight:.92, display:'block', letterSpacing:'.01em', textShadow:'3px 3px 0 rgba(208,56,112,.15)', marginBottom:'10px' }}>Sofia</span>
          <p style={{ fontFamily:"'Dancing Script',cursive", fontSize:'28px', fontWeight:400, color:'#a050c0', letterSpacing:'.04em', marginBottom:'18px' }}>a sosit cu balonul ei magic! 🎈</p>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', width:'100%', marginBottom:'22px' }}>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#f0a0c0)' }}/>
            <span style={{ fontSize:'18px' }}>🎀</span>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#f0a0c0,transparent)' }}/>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2px 1fr', gap:0, width:'100%', marginBottom:'20px' }}>
            <div style={{ textAlign:'right', paddingRight:'28px' }}>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#c060a0', marginBottom:'6px' }}>🎈 Părinți</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'28px', fontWeight:700, color:'#5a1e58', lineHeight:1.3, marginBottom:'18px' }}>Elena și Andrei Popescu</p>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#c060a0', marginBottom:'6px' }}>🎀 Nași</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'28px', fontWeight:700, color:'#5a1e58', lineHeight:1.3 }}>Maria și Cristian Ionescu</p>
            </div>
            <div style={{ background:'linear-gradient(180deg,transparent,#f0a0c0 20%,#f0a0c0 80%,transparent)' }}/>
            <div style={{ textAlign:'left', paddingLeft:'28px' }}>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#c060a0', marginBottom:'6px' }}>🕊 Botez</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'26px', fontWeight:700, color:'#5a1e58', lineHeight:1.2, marginBottom:'5px' }}>Biserica Sf. Treime</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', fontWeight:300, color:'#a060b0', lineHeight:1.5, marginBottom:'18px' }}>10 Mai 2025<br/>ora 11:00</p>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#c060a0', marginBottom:'6px' }}>🎉 Petrecere</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'26px', fontWeight:700, color:'#5a1e58', lineHeight:1.2, marginBottom:'5px' }}>Restaurant La Conac</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'22px', fontWeight:300, color:'#a060b0', lineHeight:1.5 }}>10 Mai 2025<br/>ora 13:00</p>
            </div>
          </div>
          <div style={{ textAlign:'center', paddingBottom:'30px', width:'100%' }}>
            <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg,transparent,#d4aa70 30%,#ffd700 50%,#d4aa70 70%,transparent)', marginBottom:'14px', opacity:.6 }}/>
            <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'.4em', textTransform:'uppercase', color:'#c060a0', marginBottom:'6px' }}>Confirmați prezența</p>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'32px', fontWeight:800, color:'#5a1e58', letterSpacing:'.04em' }}>0700 000 000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const STARS_D = Array.from({ length: 100 }, (_, i) => ({
  x: ((i * 179.3 + 53) % 754 + 20).toFixed(1),
  y: ((i * 113.7 + 31) % 820 + 20).toFixed(1),
  s: (3 + (i % 5) * 2).toFixed(0),
  op: (0.25 + (i % 6) * 0.08).toFixed(2),
  c: ['#ffd700','#ffe566','#ffffff','#e8c8f8','#fff0a0'][i % 5],
}))

const SPARK_D = Array.from({ length: 30 }, (_, i) => ({
  x: ((i * 237.1 + 71) % 700 + 47).toFixed(1),
  y: ((i * 149.3 + 43) % 600 + 30).toFixed(1),
  s: 6 + (i % 4) * 5,
  op: (0.15 + (i % 5) * 0.08).toFixed(2),
}))
const CastleBg = ({ id = 'cs' }: { id?: string }) => (
  <svg style={{ position:'absolute', inset:0, width:'794px', height:'1123px', zIndex:0 }} viewBox="0 0 794 1123">
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0d0520"/>
        <stop offset="30%" stopColor="#1a0a38"/>
        <stop offset="60%" stopColor="#220d48"/>
        <stop offset="100%" stopColor="#150828"/>
      </linearGradient>
      <radialGradient id={`${id}-moon`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fffde0"/>
        <stop offset="50%" stopColor="#f5e060"/>
        <stop offset="100%" stopColor="#c8a020"/>
      </radialGradient>
      <linearGradient id={`${id}-cd`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e0845"/>
        <stop offset="100%" stopColor="#0a0118"/>
      </linearGradient>
      <linearGradient id={`${id}-cm`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a1055"/>
        <stop offset="100%" stopColor="#120430"/>
      </linearGradient>
      <radialGradient id={`${id}-wg`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffd700" stopOpacity=".95"/>
        <stop offset="50%" stopColor="#ffa500" stopOpacity=".6"/>
        <stop offset="100%" stopColor="#ff6600" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id={`${id}-cg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe566"/>
        <stop offset="50%" stopColor="#ffd700"/>
        <stop offset="100%" stopColor="#b8800a"/>
      </linearGradient>
      <linearGradient id={`${id}-gl`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="20%" stopColor="#b8800a"/>
        <stop offset="50%" stopColor="#ffd700"/>
        <stop offset="80%" stopColor="#b8800a"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
      <filter id={`${id}-sg`}><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id={`${id}-gg`}><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id={`${id}-sb`}><feGaussianBlur stdDeviation="22"/></filter>
      <filter id={`${id}-sh`}><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#c8900a" floodOpacity=".55"/></filter>
      <filter id={`${id}-mg`}><feGaussianBlur stdDeviation="16" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    <rect width="794" height="1123" fill={`url(#${id}-bg)`}/>
    <ellipse cx="397" cy="280" rx="450" ry="280" fill="#4a1a8a" opacity=".18" filter={`url(#${id}-sb)`}/>
    <ellipse cx="150" cy="350" rx="220" ry="160" fill="#7a20c8" opacity=".1" filter={`url(#${id}-sb)`}/>
    <ellipse cx="660" cy="300" rx="200" ry="160" fill="#5a10a0" opacity=".1" filter={`url(#${id}-sb)`}/>

    {/* Luna */}
    <circle cx="650" cy="120" r="100" fill="#ffd700" opacity=".1" filter={`url(#${id}-sb)`}/>
    <circle cx="650" cy="120" r="52" fill={`url(#${id}-moon)`} filter={`url(#${id}-mg)`}/>
    <circle cx="635" cy="106" r="9" fill="#c8a030" opacity=".45"/>
    <circle cx="663" cy="120" r="6" fill="#c8a030" opacity=".38"/>
    <ellipse cx="632" cy="104" rx="14" ry="8" fill="#fffde0" opacity=".25" transform="rotate(-25 632 104)"/>

    {/* Stele */}
    {STARS_D.map((s, i) => (
      <text key={i} x={s.x} y={s.y} fontSize={s.s} fill={s.c} opacity={s.op} textAnchor="middle" filter={`url(#${id}-sg)`}>★</text>
    ))}

    {/* Sparkles */}
    {SPARK_D.map((s, i) => (
      <g key={i} transform={`translate(${s.x},${s.y})`} opacity={s.op}>
        <line x1="0" y1={-s.s*0.65} x2="0" y2={s.s*0.65} stroke="#ffd700" strokeWidth="1.3"/>
        <line x1={-s.s*0.65} y1="0" x2={s.s*0.65} y2="0" stroke="#ffd700" strokeWidth="1.3"/>
        <line x1={-s.s*0.42} y1={-s.s*0.42} x2={s.s*0.42} y2={s.s*0.42} stroke="#ffe566" strokeWidth=".8"/>
        <line x1={s.s*0.42} y1={-s.s*0.42} x2={-s.s*0.42} y2={s.s*0.42} stroke="#ffe566" strokeWidth=".8"/>
      </g>
    ))}

    {/* Dealuri */}
    <ellipse cx="200" cy="840" rx="380" ry="190" fill="#0a0118" opacity=".95"/>
    <ellipse cx="620" cy="855" rx="320" ry="175" fill="#080110" opacity=".95"/>
    <path d="M0 900 Q200 820 397 840 Q594 860 794 820 L794 1123 L0 1123 Z" fill="#08010e"/>

    {/* Turnuri fundal */}
    <rect x="90" y="560" width="70" height="320" fill={`url(#${id}-cd)`} opacity=".7"/>
    <polygon points="125,480 90,562 160,562" fill="#0e0228" opacity=".7"/>
    {[90,109,128].map((x,i) => <rect key={i} x={x} y="546" width="14" height="18" fill="#160538" opacity=".7"/>)}
    <line x1="125" y1="480" x2="125" y2="440" stroke="#b8800a" strokeWidth="1.5" opacity=".7"/>
    <polygon points="125,440 143,451 125,462" fill="#ffd700" opacity=".7"/>

    <rect x="634" y="560" width="70" height="320" fill={`url(#${id}-cd)`} opacity=".7"/>
    <polygon points="669,480 634,562 704,562" fill="#0e0228" opacity=".7"/>
    {[634,653,672].map((x,i) => <rect key={i} x={x} y="546" width="14" height="18" fill="#160538" opacity=".7"/>)}
    <line x1="669" y1="480" x2="669" y2="440" stroke="#b8800a" strokeWidth="1.5" opacity=".7"/>
    <polygon points="669,440 687,451 669,462" fill="#ffd700" opacity=".7"/>

    {/* Corp principal */}
    <rect x="210" y="570" width="374" height="310" fill={`url(#${id}-cm)`}/>

    {/* Turn stanga principal */}
    <rect x="168" y="500" width="100" height="380" fill={`url(#${id}-cm)`}/>
    {[168,191,214,237].map((x,i) => <rect key={i} x={x} y="482" width="17" height="22" fill="#2a1055"/>)}
    <polygon points="218,382 168,504 268,504" fill="#140430"/>
    <line x1="218" y1="382" x2="218" y2="330" stroke="#b8800a" strokeWidth="2.5"/>
    <polygon points="218,330 252,346 218,362" fill="#ffd700" filter={`url(#${id}-gg)`} opacity=".95"/>

    {/* Turn dreapta principal */}
    <rect x="526" y="500" width="100" height="380" fill={`url(#${id}-cm)`}/>
    {[526,549,572,595].map((x,i) => <rect key={i} x={x} y="482" width="17" height="22" fill="#2a1055"/>)}
    <polygon points="576,382 526,504 626,504" fill="#140430"/>
    <line x1="576" y1="382" x2="576" y2="330" stroke="#b8800a" strokeWidth="2.5"/>
    <polygon points="576,330 610,346 576,362" fill="#ffd700" filter={`url(#${id}-gg)`} opacity=".95"/>

    {/* Creneluri corp */}
    {[210,236,262,288,314,340,366,392,418,444,470,496,522].map((x,i) => (
      <rect key={i} x={x} y="550" width="20" height="24" fill="#2a1055"/>
    ))}

    {/* Turn central */}
    <rect x="327" y="460" width="140" height="130" fill="#241050"/>
    {[327,353,379,405,431,447].map((x,i) => <rect key={i} x={x} y="440" width="20" height="24" fill="#2a1055"/>)}
    <polygon points="397,340 327,462 467,462" fill="#0e0228"/>
    <line x1="397" y1="340" x2="397" y2="282" stroke="#b8800a" strokeWidth="3"/>
    <polygon points="397,282 438,302 397,322" fill="#ffd700" filter={`url(#${id}-gg)`} opacity=".98"/>

    {/* Poarta */}
    <rect x="357" y="670" width="80" height="110" fill="#04000a"/>
    <path d="M357 710 Q357 670 397 670 Q437 670 437 710" fill="#04000a"/>
    {[377,397,417].map((x,i) => <line key={i} x1={x} y1="672" x2={x} y2="780" stroke="#1a0838" strokeWidth="3.5"/>)}
    <line x1="357" y1="706" x2="437" y2="706" stroke="#1a0838" strokeWidth="3"/>
    <line x1="357" y1="735" x2="437" y2="735" stroke="#1a0838" strokeWidth="3"/>

    {/* Ferestre */}
    {[[218,540],[218,590],[576,540],[576,590]].map(([cx,cy],i) => (
      <ellipse key={i} cx={cx} cy={cy} rx="11" ry="16" fill={`url(#${id}-wg)`} opacity=".85"/>
    ))}
    {[[268,630],[268,690],[526,630],[526,690]].map(([cx,cy],i) => (
      <ellipse key={i} cx={cx} cy={cy} rx="12" ry="17" fill={`url(#${id}-wg)`} opacity=".78"/>
    ))}
    <circle cx="397" cy="620" r="22" fill={`url(#${id}-wg)`} opacity=".75"/>
    <circle cx="397" cy="620" r="22" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity=".5"/>
    <line x1="397" y1="598" x2="397" y2="642" stroke="#ffd700" strokeWidth="1" opacity=".4"/>
    <line x1="375" y1="620" x2="419" y2="620" stroke="#ffd700" strokeWidth="1" opacity=".4"/>

    {/* Coroana */}
    <g transform="translate(397,862)" filter={`url(#${id}-sh)`}>
      <path d="M-62 0 L-62 -32 L-42 -16 L-22 -48 L0 -24 L22 -48 L42 -16 L62 -32 L62 0 Z" fill={`url(#${id}-cg)`}/>
      <path d="M-62 0 L-62 -32 L-42 -16 L-22 -48 L0 -24 L22 -48 L42 -16 L62 -32 L62 0 Z" fill="none" stroke="#c8900a" strokeWidth="1.5" opacity=".8"/>
      <rect x="-62" y="-8" width="124" height="12" rx="4" fill="#b8800a"/>
      <circle cx="0" cy="-26" r="7" fill="#e040fb" opacity=".95" filter={`url(#${id}-gg)`}/>
      <circle cx="-24" cy="-14" r="5" fill="#7c4dff" opacity=".9"/>
      <circle cx="24" cy="-14" r="5" fill="#7c4dff" opacity=".9"/>
      <circle cx="-46" cy="-24" r="5" fill="#ff4081" opacity=".9"/>
      <circle cx="46" cy="-24" r="5" fill="#ff4081" opacity=".9"/>
      <text x="-22" y="-52" fontSize="14" fill="#ffd700" textAnchor="middle" filter={`url(#${id}-gg)`}>★</text>
      <text x="22" y="-52" fontSize="14" fill="#ffd700" textAnchor="middle" filter={`url(#${id}-gg)`}>★</text>
    </g>

    {/* Linie aurie separatoare */}
    <line x1="60" y1="878" x2="734" y2="878" stroke={`url(#${id}-gl)`} strokeWidth="2" opacity=".8"/>
    <line x1="60" y1="882" x2="734" y2="882" stroke={`url(#${id}-gl)`} strokeWidth=".8" opacity=".4"/>

    {/* Bordura */}
    <rect x="16" y="16" width="762" height="1091" rx="10" fill="none" stroke="#c8900a" strokeWidth="2" opacity=".5"/>
    <rect x="24" y="24" width="746" height="1075" rx="8" fill="none" stroke="#8a2be2" strokeWidth="1" opacity=".25"/>
    <g fill="none" stroke="#c8900a" strokeWidth="1.5" opacity=".55">
      <path d="M16 16 L16 60 M16 16 L60 16"/>
      <path d="M778 16 L778 60 M778 16 L734 16"/>
      <path d="M16 1107 L16 1063 M16 1107 L60 1107"/>
      <path d="M778 1107 L778 1063 M778 1107 L734 1107"/>
    </g>
    <g fill="#c8900a" opacity=".7">
      {[[16,16],[778,16],[16,1107],[778,1107]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="4"/>)}
    </g>
  </svg>
)
function PreviewFeteCastel() {
  return (
    <div style={{ width:'794px', height:'1123px', position:'relative', overflow:'hidden', background:'#0d0520' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Quicksand:wght@400;500;600;700&display=swap');`}</style>
      <CastleBg id="csprev2" />
      <div style={{ position:'absolute', inset:0, zIndex:6, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
        <div style={{ paddingTop:'28px', width:'100%' }}>
          <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'11px', fontWeight:700, letterSpacing:'.55em', textTransform:'uppercase', color:'#d4a0f8', background:'rgba(10,2,28,.6)', display:'inline-block', padding:'5px 22px', borderRadius:'20px', border:'1px solid rgba(200,144,10,.4)' }}>✦ Invitație de Botez ✦</p>
        </div>
        <div style={{ marginTop:'16px', padding:'0 60px' }}>
          <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'13px', fontWeight:700, letterSpacing:'.4em', textTransform:'uppercase', color:'#c8a0f0', marginBottom:'4px' }}>Mica noastră prințesă</p>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'96px', fontWeight:900, color:'#ffd700', lineHeight:.88, display:'block', letterSpacing:'.04em', textShadow:'0 0 40px rgba(255,215,0,.5),0 4px 0 rgba(180,120,0,.6),0 8px 0 rgba(140,80,0,.3)' }}>Sofia</span>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'24px', fontWeight:300, fontStyle:'italic', color:'#e0c0ff', marginTop:'10px', letterSpacing:'.08em' }}>a sosit în regatul nostru 👑</p>
        </div>
        <div style={{ flex:1 }}/>
        <div style={{ width:'100%', background:'rgba(8,1,20,.85)', padding:'28px 60px 32px', borderTop:'2px solid rgba(200,144,10,.5)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2px 1fr', gap:0, marginBottom:'22px' }}>
            <div style={{ textAlign:'right', paddingRight:'30px' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.32em', textTransform:'uppercase', color:'#c8900a', marginBottom:'6px' }}>👑 Părinți</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'26px', fontWeight:400, color:'#fff8e0', lineHeight:1.3, marginBottom:'18px', textShadow:'0 1px 8px rgba(200,144,10,.3)' }}>Elena și Andrei Popescu</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.32em', textTransform:'uppercase', color:'#c8900a', marginBottom:'6px' }}>✦ Nași</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'26px', fontWeight:400, color:'#fff8e0', lineHeight:1.3, textShadow:'0 1px 8px rgba(200,144,10,.3)' }}>Maria și Cristian Ionescu</p>
            </div>
            <div style={{ background:'linear-gradient(180deg,transparent,#c8900a 15%,#ffd700 50%,#c8900a 85%,transparent)' }}/>
            <div style={{ textAlign:'left', paddingLeft:'30px' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.32em', textTransform:'uppercase', color:'#c8900a', marginBottom:'5px' }}>🕊 Sfântul Botez</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'26px', fontWeight:400, fontStyle:'italic', color:'#fff8e0', lineHeight:1.25, marginBottom:'4px' }}>Biserica Sf. Treime</p>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'19px', fontWeight:500, color:'#d4a0f8', lineHeight:1.5, marginBottom:'18px' }}>8 Iunie 2025<br/>ora 11:00</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.32em', textTransform:'uppercase', color:'#c8900a', marginBottom:'5px' }}>🎉 Petrecere</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'26px', fontWeight:400, fontStyle:'italic', color:'#fff8e0', lineHeight:1.25, marginBottom:'4px' }}>Restaurant Royal</p>
              <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:'19px', fontWeight:500, color:'#d4a0f8', lineHeight:1.5 }}>8 Iunie 2025<br/>ora 13:00</p>
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(200,144,10,.4)', paddingTop:'16px', textAlign:'center' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', fontWeight:700, letterSpacing:'.42em', textTransform:'uppercase', color:'#c8900a', marginBottom:'5px' }}>Confirmați prezența</p>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'32px', fontWeight:700, color:'#ffd700', letterSpacing:'.06em', textShadow:'0 0 20px rgba(255,215,0,.4)' }}>0700 000 000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CARDS_NUNTA: Card[] = [
  { id: 1, name: 'Aur & Lumină',    desc: 'Rafinament clasic cu accente aurii și tipografie elegantă.', category: 'nunta', available: true,  slug: 'invitatie-nunta-pdf-auriu', PreviewComp: PreviewAuriu },
{ id: 2, name: 'Vară Organică', desc: 'Verde salvie, eucalipt și bandă acuarelă — minimalism cald.', category: 'nunta', available: true, slug: 'invitatie-nunta-de-vara', PreviewComp: PreviewVara }, 
{ id: 3, name: 'Ocean', desc: 'Albastru acuarelă, coroană florală și sigiliu ceară — eleganță maritimă.', category: 'nunta', available: true, slug: 'invitatii-nunta-ocean', PreviewComp: PreviewOcean },
{ id: 4, name: 'Simplă Elegantă', desc: 'Hârtie texturată, text centrat și sigiliu ceară albastru.', category: 'nunta', available: true, slug: 'invitatie-nunta-pdf-simpla', PreviewComp: PreviewSimpla }, 
{ id: 5, name: 'Botanică Mov & Coral', desc: 'Coroană florală mov, coral și auriu cu monogramă hexagonală.', category: 'nunta', available: true, slug: 'invitatie-nunta-img-coral', PreviewComp: PreviewCoral },
{ id: 6, name: 'Pădure de Toamnă', desc: 'Fundal forestier întunecat, monogramă elegantă și text alb.', category: 'nunta', available: true, slug: 'invitatie-nunta-poza', PreviewComp: PreviewPoza },
{ id: 7, name: 'Geometric Sage', desc: 'Monogramă geometrică aurie, pete acuarelă sage și hârtie texturată.', category: 'nunta', available: true, slug: 'invitatie-nunta-casa', PreviewComp: PreviewCasa },
{ id: 8, name: 'Rustic Simfonic', desc: 'Hârtie kraft, portativ muzical, siluetă vioară și font caligrafic.', category: 'nunta', available: true, slug: 'invitatie-nunta-rustic', PreviewComp: PreviewRustic },
{ id: 9, name: 'Sub Stele', desc: 'Midnight blue celestial cu constelații aurii, faze ale lunii și sigiliu cupru.', category: 'nunta', available: true, slug: 'invitatie-nunta-sub-stele', PreviewComp: PreviewSubStele },

]

const CARDS_BOTEZ: Card[] = [
{ id: 7, name: 'Astronaut 🚀', desc: 'Spațiu, rachete, lună și astronaut — perfect pentru băieți.', category: 'botez', available: true, slug: 'invitatie-botez-baiat-astronaut', PreviewComp: PreviewAstronaut },
{ id: 8, name: 'Racing 🏎️', desc: 'Mașină F1, pistă diagonală și design cinematic racing — pentru viitorii campioni.', category: 'botez', available: true, slug: 'invitatie-botez-baieti-masina', PreviewComp: PreviewMasina }, 
{ id: 9, name: 'Pirat ☠', desc: 'Hartă de comoară, corabie, X marks the spot — aventură pe mări!', category: 'botez', available: true, slug: 'invitatie-botez-baieti-pirat', PreviewComp: PreviewPirat },
{ id: 10, name: 'Floral Roz 🌸', desc: 'Trandafiri, bujori și eucalipt — eleganță florală pentru fetițe.', category: 'botez', available: true, slug: 'invitatie-botez-fete-roz', PreviewComp: PreviewFeteRoz },
{ id: 11, name: 'Baloane Magice 🎈', desc: 'Baloane pastel 3D, confetti auriu și cer lavandă — pură magie pentru fetițe.', category: 'botez', available: true, slug: 'invitatie-botez-fete-baloane', PreviewComp: PreviewFeteBaloane },
{ id: 12, name: 'Prințesă 👑', desc: 'Castel regal, coroană aurie și stele pe cerul mov — pentru mica prințesă.', category: 'botez', available: true, slug: 'invitatie-botez-fete-castel', PreviewComp: PreviewFeteCastel },


]

function CardItem({ card, idx }: { card: Card; idx: number }) {
  const body = (
    <>
      {card.PreviewComp ? (
        <ScaledPreview PreviewComp={card.PreviewComp} />
      ) : (
        <div className="io-preview-wrap">
          <div className="io-preview-soon">
            <div className="io-shimmer" />
            <span className="io-soon-icon">🎨</span>
            <span className="io-soon-badge">În curând</span>
          </div>
        </div>
      )}
      <div className="io-card-body">
        <h2 className="io-card-name"><em>{card.name}</em></h2>
        <p className="io-card-desc">{card.desc}</p>
        <div className="io-card-footer">
          <div className="io-card-price">30 lei <span>/ desc.</span></div>
          {card.available && card.slug
            ? <span className="io-card-btn">Alege ↗</span>
            : <span className="io-card-btn-ghost">În curând</span>
          }
        </div>
      </div>
    </>
  )

  if (card.available && card.slug) {
    return (
      <Link href={`/${card.slug}`} className="io-card" style={{ animationDelay: `${0.05 * idx}s` }}>
        {body}
      </Link>
    )
  }
  return (
    <article className="io-card-soon" style={{ animationDelay: `${0.05 * idx}s`, animation: `io-card-in .5s ease ${0.05 * idx}s both` }}>
      {body}
    </article>
  )
}

export default function InvitatiiPDFPage() {
  const [tab, setTab] = useState<'nunta' | 'botez'>('nunta')
  const cards = tab === 'nunta' ? CARDS_NUNTA : CARDS_BOTEZ
  const nuntaAvail = CARDS_NUNTA.filter(c => c.available).length
  const botezAvail = CARDS_BOTEZ.filter(c => c.available).length

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="io">
        <div className="io-orb io-o1" aria-hidden="true" />
        <div className="io-orb io-o2" aria-hidden="true" />

        <div className="io-ticker" aria-hidden="true">
          <div className="io-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => <div key={i} className="io-ti">{t}<span className="io-tdot" /></div>)}
          </div>
        </div>

        <div className="io-inner">
          <header className="io-hero">
            <p className="io-super"><span className="io-sdot" />Colecție Exclusivă</p>
            <h1 className="io-h1">
              Alege <em>invitația perfectă</em><br />
              pentru <strong>ziua ta specială</strong>
            </h1>
            <p className="io-lead">
              Design premium, personalizabil instant. Plătești o singură dată și descarci PDF + JPG gata de trimis.
            </p>
          </header>

          <div className="io-tabs">
            <button type="button" className={`io-tab${tab === 'nunta' ? ' active' : ''}`} onClick={() => setTab('nunta')}>
              💍 Nuntă <span className="io-tab-count">{nuntaAvail || CARDS_NUNTA.length} {nuntaAvail ? 'disponibile' : 'teme'}</span>
            </button>
            <button type="button" className={`io-tab${tab === 'botez' ? ' active' : ''}`} onClick={() => setTab('botez')}>
              🎀 Botez <span className="io-tab-count">{botezAvail || CARDS_BOTEZ.length} {botezAvail ? 'disponibile' : 'teme'}</span>
            </button>
          </div>

          <div className="io-grid">
            {cards.map((card, idx) => <CardItem key={card.id} card={card} idx={idx} />)}
          </div>

          <div className="io-coming-soon">
            <div className="io-cs-card">
              <div className="io-cs-ring">🎨</div>
              <h2 className="io-cs-h">Lucrăm la <em>40+ teme</em></h2>
              <p className="io-cs-sub">Colecția crește săptămânal. Te anunțăm când tema preferată devine disponibilă.</p>
              <div className="io-cs-dots">
                <span className="io-cs-dot" /><span className="io-cs-dot" /><span className="io-cs-dot" />
              </div>
            </div>
          </div>

          <div className="io-guarantee">
            {[
              { icon: '🔒', strong: 'Plată securizată', text: 'Tranzacție 100% sigură' },
              { icon: '📥', strong: 'Download instant',  text: 'PDF + JPG imediat' },
              { icon: '♾️', strong: 'Plată unică',       text: 'Fără abonament' },
              { icon: '✏️', strong: 'Editabil oricând',  text: 'Modifici gratuit' },
            ].map((g, i, arr) => (
              <>
                <div key={g.strong} className="io-gi">
                  <span className="io-gico">{g.icon}</span>
                  <span className="io-gtxt"><strong>{g.strong}</strong>{g.text}</span>
                </div>
                {i < arr.length - 1 && <div key={`d${i}`} className="io-gdiv" />}
              </>
            ))}
          </div>
        </div>

        <div className="io-ticker" aria-hidden="true">
          <div className="io-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => <div key={i} className="io-ti">{t}<span className="io-tdot" /></div>)}
          </div>
        </div>
      </div>
    </>
  )
}
