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
  church: 'Biserica Sf. Nicolae', churchDate: '2025-06-15', churchTime: '11:00',
  restaurant: 'Restaurant La Conac', restaurantDate: '2025-06-15', restaurantTime: '13:00',
  contact: '0700 000 000',
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

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Pirata+One&family=Cinzel:wght@400;700;900&family=Nunito:wght@300;400;600;700;900&display=swap');

.pt * { box-sizing: border-box; margin: 0; padding: 0; }
.pt { font-family: 'Nunito', sans-serif; background: #f0e0b0; color: #3a1808; min-height: 100vh; }

.pt-topbar { background: #3a1808; border-bottom: 3px solid #8b6914; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.pt-logo { font-family: 'Pirata One', cursive; font-size: 18px; letter-spacing: .06em; color: #f5e6c8; text-decoration: none; }
.pt-logo span { color: #c8900a; }
.pt-back { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 4px; border: 1.5px solid rgba(200,144,10,.4); color: #c8900a; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 700; text-decoration: none; background: transparent; transition: background .2s; }
.pt-back:hover { background: rgba(200,144,10,.1); }

.pt-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.pt-title { text-align: center; margin-bottom: 40px; }
.pt-title h1 { font-family: 'Pirata One', cursive; font-size: clamp(18px,3vw,28px); color: #3a1808; margin-bottom: 8px; letter-spacing: .04em; }
.pt-title p { font-size: 11px; color: rgba(58,24,8,.5); letter-spacing: .1em; text-transform: uppercase; font-family: 'Cinzel', serif; }

.pt-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.pt-inv-wrap { position: sticky; top: 72px; }
.pt-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.pt-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.pt-inv-inner { position: absolute; inset: 0; }
.pt-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

.pt-inv { width: 794px; height: 1123px; position: relative; overflow: hidden; }
.pt-content { position: absolute; inset: 0; z-index: 6; display: flex; flex-direction: column; align-items: center; padding: 52px 80px 48px; text-align: center; }
.pt-badge { font-family: 'Cinzel', serif; font-size: 11px; font-weight: 400; letter-spacing: .5em; text-transform: uppercase; color: #5a3010; opacity: .7; margin-bottom: 8px; }
.pt-div { width: 100%; height: 2px; background: linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent); margin-bottom: 14px; opacity: .7; }
.pt-baby-name { font-family: 'Pirata One', cursive; font-size: 80px; color: #3a1808; line-height: .9; text-shadow: 2px 2px 0 #c8900a, 4px 4px 0 rgba(139,105,20,.3); letter-spacing: .02em; }
.pt-sep { display: flex; align-items: center; gap: 14px; margin: 12px 0 8px; width: 100%; }
.pt-sep-line { flex: 1; height: 1px; }
.pt-tagline { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 400; font-style: italic; color: #5a3010; letter-spacing: .08em; }
.pt-flex1 { flex: 1; min-height: 160px; }
.pt-info-bottom { width: 100%; }
.pt-div2 { width: 100%; height: 1px; background: linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent); margin-bottom: 20px; opacity: .6; }
.pt-grid { display: grid; grid-template-columns: 1fr 2px 1fr; gap: 0; margin-bottom: 18px; }
.pt-col-l { text-align: right; padding-right: 28px; }
.pt-col-r { text-align: left; padding-left: 28px; }
.pt-v-sep { background: linear-gradient(180deg,transparent,#8b6914,transparent); }
.pt-label { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: #8b6914; margin-bottom: 5px; }
.pt-val { font-family: 'Cinzel', serif; font-size: 22px; font-weight: 400; color: #3a1808; line-height: 1.4; margin-bottom: 18px; }
.pt-event-name { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 400; color: #3a1808; line-height: 1.3; margin-bottom: 4px; }
.pt-event-detail { font-family: 'Nunito', sans-serif; font-size: 18px; font-weight: 400; color: #6a3818; margin-bottom: 18px; }
.pt-div3 { width: 100%; height: 1px; background: linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent); margin-bottom: 14px; opacity: .6; }
.pt-contact-label { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .38em; text-transform: uppercase; color: #8b6914; margin-bottom: 5px; }
.pt-contact-val { font-family: 'Cinzel', serif; font-size: 28px; font-weight: 700; color: #3a1808; letter-spacing: .04em; }

.pt-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.pt-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.pt-wm-row { display: flex; white-space: nowrap; }
.pt-wm-item { font-size: 34px; letter-spacing: .1em; color: #ff0000; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; font-family: 'Pirata One', cursive; }
.pt-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(58,24,8,.2); border-top: 2px solid #8b6914; padding: 8px 10px; text-align: center; font-size: 11px; color: #5a3010; letter-spacing: .06em; z-index: 25; font-family: 'Cinzel', serif; }

.pt-form h2 { font-family: 'Pirata One', cursive; font-size: 22px; color: #3a1808; margin-bottom: 24px; border-bottom: 2px solid #8b6914; padding-bottom: 10px; letter-spacing: .04em; }
.pt-section { margin-bottom: 18px; }
.pt-sl { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #8b6914; margin-bottom: 7px; }
.pt-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.pt-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.pt-input { width: 100%; padding: 10px 12px; font-size: 13px; border: 1.5px solid rgba(139,105,20,.25); border-radius: 6px; background: rgba(245,230,200,.4); color: #3a1808; font-family: 'Nunito', sans-serif; outline: none; transition: border-color .2s; font-weight: 600; }
.pt-input:focus { border-color: #8b6914; box-shadow: 0 0 0 3px rgba(139,105,20,.1); }
.pt-input::placeholder { color: rgba(58,24,8,.3); font-weight: 400; }
.pt-dw { position: relative; display: flex; align-items: center; }
.pt-dw .pt-input { padding-right: 40px; }
.pt-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.pt-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #8b6914; }
.pt-iw { position: relative; }
.pt-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(58,24,8,.3); pointer-events: none; }
.pt-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 6px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.pt-pay-btn { width: 100%; padding: 15px; margin-top: 24px; background: linear-gradient(135deg,#3a1808,#5a2c10); color: #f5e6c8; border: 2px solid #8b6914; border-radius: 6px; font-family: 'Pirata One', cursive; font-size: 20px; letter-spacing: .06em; cursor: pointer; transition: opacity .2s; box-shadow: 0 4px 20px rgba(58,24,8,.3), inset 0 1px 0 rgba(200,144,10,.2); }
.pt-pay-btn:hover { opacity: .88; }
.pt-pay-btn:disabled { opacity: .5; cursor: not-allowed; }
.pt-pay-note { font-size: 11px; color: rgba(58,24,8,.45); text-align: center; margin-top: 8px; line-height: 1.6; font-family: 'Cinzel', serif; }
.pt-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(200,144,10,.06); border: 1.5px solid rgba(139,105,20,.2); border-radius: 6px; }
.pt-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(58,24,8,.6); font-family: 'Cinzel', serif; }
.pt-gi span { font-size: 16px; }

.pt-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.pt-alert-box { background: #f5e6c8; border: 3px solid #8b6914; border-radius: 8px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.3); }
.pt-alert-icon { font-size: 44px; margin-bottom: 12px; }
.pt-alert-title { font-family: 'Pirata One', cursive; font-size: 24px; color: #3a1808; margin-bottom: 14px; }
.pt-alert-text { font-family: 'Nunito', sans-serif; font-size: 14px; color: rgba(58,24,8,.65); line-height: 1.8; margin-bottom: 24px; }
.pt-alert-text strong { color: #3a1808; }
.pt-alert-btns { display: flex; gap: 10px; }
.pt-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(139,105,20,.3); border-radius: 6px; background: transparent; color: rgba(58,24,8,.5); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.pt-alert-confirm { flex: 2; padding: 11px; border: 2px solid #8b6914; border-radius: 6px; background: #3a1808; color: #f5e6c8; font-family: 'Pirata One', cursive; font-size: 16px; cursor: pointer; }
.pt-alert-cancel:hover { background: rgba(139,105,20,.06); }

.pt-footer { border-top: 3px solid #8b6914; background: #3a1808; padding: 28px 24px; text-align: center; }
.pt-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(200,144,10,.45); margin-bottom: 14px; }
.pt-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 4px; background: #8b6914; color: #f5e6c8; font-family: 'Pirata One', cursive; font-size: 16px; text-decoration: none; border: 1px solid #c8900a; }
.pt-footer-copy { font-size: 11px; color: rgba(200,144,10,.2); margin-top: 16px; font-family: 'Cinzel', serif; }

@media (max-width: 800px) { .pt-layout { grid-template-columns: 1fr; gap: 32px; } .pt-inv-wrap { position: static; } }
@media (max-width: 480px) { .pt-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieBotezBaietiPirat() {
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
        body: JSON.stringify({ fields, template: 'invitatie-botez-baieti-pirat' }),
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
    <div key={i} className="pt-wm-row">
      {Array(8).fill(null).map((_, j) => (
        <span key={j} className="pt-wm-item">VibeInvite.ro · 30 lei</span>
      ))}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pt">

        {showAlert && (
          <div className="pt-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="pt-alert-box" onClick={e => e.stopPropagation()}>
              <div className="pt-alert-icon">☠</div>
              <h3 className="pt-alert-title">Ahoy! Înainte să continui</h3>
              <p className="pt-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate după descărcare.
              </p>
              <div className="pt-alert-btns">
                <button className="pt-alert-cancel" onClick={() => setShowAlert(false)}>Înapoi!</button>
                <button className="pt-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>
                  ⚓ Land Ho!
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="pt-topbar">
          <Link href="/" className="pt-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="pt-back">← Înapoi la port</Link>
        </header>

        <div className="pt-inner">
          <div className="pt-title">
            <h1>⚓ Invitație Botez — Pirat</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="pt-layout">
            <div className="pt-inv-wrap">
              <div className="pt-inv-ratio">
                <div className="pt-inv-inner">
                  <div className="pt-inv-scale" style={{ transform: `scale(${360 / 794})` }}>
                    <div className="pt-inv">
                      <PiratBg />
                      <div className="pt-content">
                        <p className="pt-badge">⚓ Invitație de Botez ⚓</p>
                        <div className="pt-div" />
                        <p className="pt-baby-name">{fields.babyName || 'PRENUME'}</p>
                        <div className="pt-sep">
                          <div className="pt-sep-line" style={{ background:'linear-gradient(90deg,transparent,#8b6914)' }} />
                          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'18px', color:'#8b6914' }}>☠</span>
                          <div className="pt-sep-line" style={{ background:'linear-gradient(90deg,#8b6914,transparent)' }} />
                        </div>
                        <p className="pt-tagline">a aterizat în port!</p>
                        <div className="pt-flex1" />
                        <div className="pt-info-bottom">
                          <div className="pt-div2" />
                          <div className="pt-grid">
                            <div className="pt-col-l">
                              <p className="pt-label">⚓ Echipaj</p>
                              <p className="pt-val">{fields.parents}</p>
                              <p className="pt-label">☠ Nași</p>
                              <p className="pt-val" style={{ marginBottom:0 }}>{fields.godparents}</p>
                            </div>
                            <div className="pt-v-sep" />
                            <div className="pt-col-r">
                              <p className="pt-label">🕊 Port I — Botez</p>
                              <p className="pt-event-name">{fields.church || 'Biserica'}</p>
                              <p className="pt-event-detail">{formatDate(fields.churchDate) || fields.churchDate}, ora {fields.churchTime}</p>
                              <p className="pt-label">🍖 Port II — Petrecere</p>
                              <p className="pt-event-name">{fields.restaurant || 'Restaurantul'}</p>
                              <p className="pt-event-detail" style={{ marginBottom:0 }}>{formatDate(fields.restaurantDate) || fields.restaurantDate}, ora {fields.restaurantTime}</p>
                            </div>
                          </div>
                          <div className="pt-div3" />
                          <p className="pt-contact-label">🗺 Trimite semnal radio</p>
                          <p className="pt-contact-val">{fields.contact}</p>
                        </div>
                      </div>
                      <div className="pt-wm">
                        <div className="pt-wm-grid">{WM_TEXTS}</div>
                        <div className="pt-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-form">
              <h2>⚓ Personalizează</h2>
              <div className="pt-section">
                <p className="pt-sl">Prenume Copil</p>
                <div className="pt-g1">
                  <input className="pt-input" placeholder="ex: Luca" value={fields.babyName} onChange={set('babyName')} />
                </div>
              </div>
              <div className="pt-section">
                <p className="pt-sl">Echipaj (Părinți)</p>
                <div className="pt-g1">
                  <input className="pt-input" placeholder="ex: Elena și Andrei Popescu" value={fields.parents} onChange={set('parents')} />
                </div>
              </div>
              <div className="pt-section">
                <p className="pt-sl">Nași</p>
                <div className="pt-g1">
                  <input className="pt-input" placeholder="ex: Maria și Cristian Ionescu" value={fields.godparents} onChange={set('godparents')} />
                </div>
              </div>
              <div className="pt-section">
                <p className="pt-sl">Port I — Botez</p>
                <div className="pt-g1">
                  <input className="pt-input" placeholder="ex: Biserica Sf. Nicolae" value={fields.church} onChange={set('church')} />
                </div>
              </div>
              <div className="pt-section">
                <p className="pt-sl">Botez — Dată & Ora</p>
                <div className="pt-g2">
                  <div className="pt-dw">
                    <input className="pt-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.churchDate)} />
                    <span className="pt-ci">📅</span>
                    <input className="pt-dn" type="date" value={fields.churchDate} onChange={e => setFields(f => ({ ...f, churchDate: e.target.value }))} />
                  </div>
                  <div className="pt-iw">
                    <input className="pt-input" type="text" placeholder="11:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="pt-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="pt-section">
                <p className="pt-sl">Port II — Petrecere</p>
                <div className="pt-g1">
                  <input className="pt-input" placeholder="ex: Restaurant La Conac" value={fields.restaurant} onChange={set('restaurant')} />
                </div>
              </div>
              <div className="pt-section">
                <p className="pt-sl">Petrecere — Dată & Ora</p>
                <div className="pt-g2">
                  <div className="pt-dw">
                    <input className="pt-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={formatDisplayDate(fields.restaurantDate)} />
                    <span className="pt-ci">📅</span>
                    <input className="pt-dn" type="date" value={fields.restaurantDate} onChange={e => setFields(f => ({ ...f, restaurantDate: e.target.value }))} />
                  </div>
                  <div className="pt-iw">
                    <input className="pt-input" type="text" placeholder="13:00" maxLength={5} value={fields.restaurantTime} onChange={e => setFields(f => ({ ...f, restaurantTime: e.target.value.replace(/[^0-9:]/g, '') }))} />
                    <span className="pt-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="pt-section">
                <p className="pt-sl">Semnal Radio (Contact)</p>
                <div className="pt-g1">
                  <input className="pt-input" type="tel" placeholder="ex: 0700 000 000" value={fields.contact} onChange={set('contact')} />
                </div>
              </div>

              {error && <div className="pt-error">⚠️ {error}</div>}

              <button className="pt-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '☠ Plătește 30 lei — Ahoy! ☠'}
              </button>
              <p className="pt-pay-note">Watermark dispare după plată · PDF + JPG incluse · Stripe secured</p>
              <div className="pt-guarantee">
                <div className="pt-gi"><span>⚓</span> Download instant</div>
                <div className="pt-gi"><span>☠</span> PDF + JPG</div>
                <div className="pt-gi"><span>🗺</span> 30 lei · o dată</div>
                <div className="pt-gi"><span>⚔</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="pt-footer">
          <p className="pt-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="pt-footer-btn">⚓ Toate modelele</Link>
          <p className="pt-footer-copy">© {new Date().getFullYear()} VibeInvite · PIRATE EDITION</p>
        </footer>
      </div>
    </>
  )
}
