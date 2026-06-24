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
