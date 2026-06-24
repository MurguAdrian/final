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
  PreviewComp: React.FC | null
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
function ScaledPreview({ PreviewComp }: { PreviewComp: React.FC }) {
  const wrapRef = useRef<HTMLDivElement>(null)
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

const CARDS_NUNTA: Card[] = [
  { id: 1, name: 'Aur & Lumină',    desc: 'Rafinament clasic cu accente aurii și tipografie elegantă.', category: 'nunta', available: true,  slug: 'invitatie-nunta-pdf-auriu', PreviewComp: PreviewAuriu },
{ id: 2, name: 'Vară Organică', desc: 'Verde salvie, eucalipt și bandă acuarelă — minimalism cald.', category: 'nunta', available: true, slug: 'invitatie-nunta-de-vara', PreviewComp: PreviewVara },  { id: 3, name: 'Grădina Secretă', desc: 'Verde botanical, elegant și plin de prospețime.',             category: 'nunta', available: false, slug: null, PreviewComp: null },
  { id: 4, name: 'Rustic Cald',     desc: 'Tonuri de portocaliu și teracotă, atmosferă de toamnă.',     category: 'nunta', available: false, slug: null, PreviewComp: null },
  { id: 5, name: 'Boho Chic',       desc: 'Liber, creativ, cu accente de mov pastelat și flori.',       category: 'nunta', available: false, slug: null, PreviewComp: null },
  { id: 6, name: 'Vintage 1920',    desc: 'Art deco, aur și nostalgie — o eră de neuitat.',             category: 'nunta', available: false, slug: null, PreviewComp: null },
]

const CARDS_BOTEZ: Card[] = [
  { id: 7,  name: 'Valuri Albastre', desc: 'Ocean bleu, proaspăt și modern — perfect pentru botez.',   category: 'botez', available: false, slug: null, PreviewComp: null },
  { id: 8,  name: 'Flori de Cireș',  desc: 'Sakura și delicatețe — design pentru fetițe.',             category: 'botez', available: false, slug: null, PreviewComp: null },
  { id: 9,  name: 'Teddy & Stars',   desc: 'Jucăuș și cald — urși și stele pentru cei mici.',         category: 'botez', available: false, slug: null, PreviewComp: null },
  { id: 10, name: 'Mint & Gold',     desc: 'Fresh și elegant — mentă cu accente aurii.',               category: 'botez', available: false, slug: null, PreviewComp: null },
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
