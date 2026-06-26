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
function fmt(val: string) {
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
  babyName: 'Sofia',
  parents: 'Elena și Andrei Popescu',
  godparents: 'Maria și Cristian Ionescu',
  church: 'Biserica Sf. Treime', churchDate: '2025-05-10', churchTime: '11:00',
  restaurant: 'Restaurant La Conac', restaurantDate: '2025-05-10', restaurantTime: '13:00',
  contact: '0700 000 000',
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

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nunito:wght@300;400;600;700;800;900&family=Quicksand:wght@400;500;600;700&family=Dancing+Script:wght@400;600;700&family=Cinzel:wght@400;600&display=swap'

const CSS = `
.bl * { box-sizing: border-box; margin: 0; padding: 0; }
.bl { font-family: 'Quicksand', sans-serif; background: #fdf0f8; color: #5a1e58; min-height: 100vh; }
.bl-topbar { background: #5a1e58; border-bottom: 2px solid #f0a8c0; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.bl-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #fff; text-decoration: none; font-weight: 600; }
.bl-logo span { color: #f9c8d8; }
.bl-back { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(249,200,216,.4); color: #f9c8d8; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: transparent; transition: background .2s; }
.bl-back:hover { background: rgba(249,200,216,.1); }
.bl-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.bl-title { text-align: center; margin-bottom: 40px; }
.bl-title h1 { font-family: 'Abril Fatface', cursive; font-size: clamp(18px,3vw,26px); color: #d03870; margin-bottom: 8px; letter-spacing: .02em; }
.bl-title p { font-size: 11px; color: rgba(90,30,88,.5); letter-spacing: .1em; text-transform: uppercase; }
.bl-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.bl-inv-wrap { position: sticky; top: 72px; }
.bl-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.bl-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.bl-inv-inner { position: absolute; inset: 0; }
.bl-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }
.bl-inv { width: 794px; height: 1123px; position: relative; overflow: hidden; }
.bl-content { position: absolute; inset: 0; z-index: 6; display: flex; flex-direction: column; align-items: center; text-align: center; }
.bl-header { height: 520px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 18px; }
.bl-badge { font-family: 'Quicksand', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: .55em; text-transform: uppercase; color: #c060a0; background: rgba(255,255,255,.7); padding: 4px 20px; border-radius: 20px; }
.bl-panel { width: 100%; padding: 0 100px; flex: 1; display: flex; flex-direction: column; align-items: center; }
.bl-name { font-family: 'Abril Fatface', cursive; font-size: 96px; color: #d03870; line-height: .92; display: block; letter-spacing: .01em; text-shadow: 3px 3px 0 rgba(208,56,112,.15); margin-bottom: 10px; }
.bl-tagline { font-family: 'Dancing Script', cursive; font-size: 28px; font-weight: 400; color: #a050c0; letter-spacing: .04em; margin-bottom: 18px; }
.bl-sep { display: flex; align-items: center; gap: 12px; width: 100%; margin-bottom: 22px; }
.bl-sep-l { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #f0a0c0); }
.bl-sep-r { flex: 1; height: 1px; background: linear-gradient(90deg, #f0a0c0, transparent); }
.bl-grid { display: grid; grid-template-columns: 1fr 2px 1fr; gap: 0; width: 100%; margin-bottom: 20px; }
.bl-col-l { text-align: right; padding-right: 28px; }
.bl-col-r { text-align: left; padding-left: 28px; }
.bl-vsep { background: linear-gradient(180deg, transparent, #f0a0c0 20%, #f0a0c0 80%, transparent); }
.bl-label { font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: #c060a0; margin-bottom: 6px; }
.bl-val { font-family: 'Nunito', sans-serif; font-size: 28px; font-weight: 700; color: #5a1e58; line-height: 1.3; margin-bottom: 18px; }
.bl-event-name { font-family: 'Nunito', sans-serif; font-size: 26px; font-weight: 700; color: #5a1e58; line-height: 1.2; margin-bottom: 5px; }
.bl-event-detail { font-family: 'Nunito', sans-serif; font-size: 22px; font-weight: 300; color: #a060b0; line-height: 1.5; margin-bottom: 18px; }
.bl-contact { text-align: center; padding-bottom: 30px; width: 100%; }
.bl-contact-div { width: 100%; height: 1px; background: linear-gradient(90deg,transparent,#d4aa70 30%,#ffd700 50%,#d4aa70 70%,transparent); margin-bottom: 14px; opacity: .6; }
.bl-contact-label { font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .4em; text-transform: uppercase; color: #c060a0; margin-bottom: 6px; }
.bl-contact-val { font-family: 'Nunito', sans-serif; font-size: 32px; font-weight: 800; color: #5a1e58; letter-spacing: .04em; }
.bl-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.bl-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.bl-wm-row { display: flex; white-space: nowrap; }
.bl-wm-item { font-size: 34px; letter-spacing: .1em; color: #ff0000; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; font-family: 'Quicksand', sans-serif; }
.bl-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(90,30,88,.12); border-top: 1px solid rgba(240,168,192,.4); padding: 8px 10px; text-align: center; font-size: 11px; color: #a050c0; letter-spacing: .06em; z-index: 25; }
.bl-form h2 { font-family: 'Abril Fatface', cursive; font-size: 22px; color: #d03870; margin-bottom: 24px; border-bottom: 2px solid rgba(240,160,192,.3); padding-bottom: 10px; letter-spacing: .03em; }
.bl-section { margin-bottom: 18px; }
.bl-sl { font-family: 'Quicksand', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #c060a0; margin-bottom: 7px; }
.bl-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.bl-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.bl-input { width: 100%; padding: 10px 12px; font-size: 13px; border: 1.5px solid rgba(192,96,160,.2); border-radius: 10px; background: rgba(253,240,248,.4); color: #5a1e58; font-family: 'Nunito', sans-serif; outline: none; transition: border-color .2s; font-weight: 600; }
.bl-input:focus { border-color: #f0a8c0; box-shadow: 0 0 0 3px rgba(240,168,192,.12); }
.bl-input::placeholder { color: rgba(90,30,88,.3); font-weight: 400; }
.bl-dw { position: relative; display: flex; align-items: center; }
.bl-dw .bl-input { padding-right: 40px; }
.bl-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.bl-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #f0a0c0; }
.bl-iw { position: relative; }
.bl-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(90,30,88,.3); pointer-events: none; }
.bl-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 10px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.bl-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: linear-gradient(135deg,#d03870,#e060a0); color: #fff; border: none; border-radius: 100px; font-family: 'Abril Fatface', cursive; font-size: 18px; letter-spacing: .04em; cursor: pointer; transition: opacity .2s; box-shadow: 0 4px 20px rgba(208,56,112,.35); }
.bl-pay-btn:hover { opacity: .88; }
.bl-pay-btn:disabled { opacity: .5; cursor: not-allowed; }
.bl-pay-note { font-size: 11px; color: rgba(90,30,88,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.bl-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(192,96,160,.05); border: 1.5px solid rgba(192,96,160,.15); border-radius: 12px; }
.bl-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(90,30,88,.6); font-family: 'Quicksand', sans-serif; font-weight: 600; }
.bl-gi span { font-size: 16px; }
.bl-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.bl-alert-box { background: #fdf0f8; border: 2px solid #f0a8c0; border-radius: 20px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
.bl-alert-icon { font-size: 44px; margin-bottom: 12px; }
.bl-alert-title { font-family: 'Abril Fatface', cursive; font-size: 22px; color: #d03870; margin-bottom: 14px; }
.bl-alert-text { font-family: 'Nunito', sans-serif; font-size: 14px; color: rgba(90,30,88,.65); line-height: 1.8; margin-bottom: 24px; }
.bl-alert-text strong { color: #5a1e58; }
.bl-alert-btns { display: flex; gap: 10px; }
.bl-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(240,168,192,.3); border-radius: 10px; background: #fff; color: rgba(90,30,88,.5); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.bl-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 10px; background: linear-gradient(135deg,#d03870,#e060a0); color: #fff; font-family: 'Abril Fatface', cursive; font-size: 14px; cursor: pointer; }
.bl-alert-cancel:hover { background: rgba(240,168,192,.06); }
.bl-footer { border-top: 1px solid rgba(240,168,192,.3); background: #5a1e58; padding: 28px 24px; text-align: center; }
.bl-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(249,200,216,.4); margin-bottom: 14px; }
.bl-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: linear-gradient(135deg,#d03870,#e060a0); color: #fff; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600; text-decoration: none; box-shadow: 0 4px 16px rgba(208,56,112,.3); }
.bl-footer-copy { font-size: 11px; color: rgba(249,200,216,.2); margin-top: 16px; font-style: italic; }
@media (max-width: 800px) { .bl-layout { grid-template-columns: 1fr; gap: 32px; } .bl-inv-wrap { position: static; } }
@media (max-width: 480px) { .bl-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieBotezFeteBaloane() {
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
        body: JSON.stringify({ fields, template: 'invitatie-botez-fete-baloane' }),
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

  const WM = Array(16).fill(null).map((_, i) => (
    <div key={i} className="bl-wm-row">
      {Array(8).fill(null).map((_, j) => <span key={j} className="bl-wm-item">VibeInvite.ro · 30 lei</span>)}
    </div>
  ))

  return (
    <>
      <link rel="stylesheet" href={FONT_URL} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="bl">
        {showAlert && (
          <div className="bl-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="bl-alert-box" onClick={e => e.stopPropagation()}>
              <div className="bl-alert-icon">🎈</div>
              <h3 className="bl-alert-title">Înainte să continui!</h3>
              <p className="bl-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate după descărcare.
              </p>
              <div className="bl-alert-btns">
                <button className="bl-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="bl-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>🎈 Continuă!</button>
              </div>
            </div>
          </div>
        )}

        <header className="bl-topbar">
          <Link href="/" className="bl-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="bl-back">← Alege alt model</Link>
        </header>

        <div className="bl-inner">
          <div className="bl-title">
            <h1>🎈 Invitație Botez Fată — Baloane Magice</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="bl-layout">
            <div className="bl-inv-wrap">
              <div className="bl-inv-ratio">
                <div className="bl-inv-inner">
                  <div className="bl-inv-scale" style={{ transform:`scale(${360/794})` }}>
                    <div className="bl-inv">
                      <BalloonsBg id="blprev" />
                      <div className="bl-content">
                        <div className="bl-header">
                          <p className="bl-badge">✦ Invitație de Botez ✦</p>
                        </div>
                        <div className="bl-panel">
                          <span className="bl-name">{fields.babyName || 'Sofia'}</span>
                          <p className="bl-tagline">a sosit cu balonul ei magic! 🎈</p>
                          <div className="bl-sep">
                            <div className="bl-sep-l"/><span style={{ fontSize:'18px' }}>🎀</span><div className="bl-sep-r"/>
                          </div>
                          <div className="bl-grid">
                            <div className="bl-col-l">
                              <p className="bl-label">🎈 Părinți</p>
                              <p className="bl-val">{fields.parents}</p>
                              <p className="bl-label">🎀 Nași</p>
                              <p className="bl-val" style={{ marginBottom:0 }}>{fields.godparents}</p>
                            </div>
                            <div className="bl-vsep"/>
                            <div className="bl-col-r">
                              <p className="bl-label">🕊 Botez</p>
                              <p className="bl-event-name">{fields.church || 'Biserica'}</p>
                              <p className="bl-event-detail">{formatDate(fields.churchDate) || fields.churchDate}<br/>ora {fields.churchTime}</p>
                              <p className="bl-label">🎉 Petrecere</p>
                              <p className="bl-event-name">{fields.restaurant || 'Restaurantul'}</p>
                              <p className="bl-event-detail" style={{ marginBottom:0 }}>{formatDate(fields.restaurantDate) || fields.restaurantDate}<br/>ora {fields.restaurantTime}</p>
                            </div>
                          </div>
                          <div className="bl-contact">
                            <div className="bl-contact-div"/>
                            <p className="bl-contact-label">Confirmați prezența</p>
                            <p className="bl-contact-val">{fields.contact}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bl-wm">
                        <div className="bl-wm-grid">{WM}</div>
                        <div className="bl-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bl-form">
              <h2>🎈 Personalizează</h2>
              {[
                ['Prenume Copil','babyName','ex: Sofia'],
                ['Părinți','parents','ex: Elena și Andrei Popescu'],
                ['Nași de Botez','godparents','ex: Maria și Cristian Ionescu'],
                ['Botez — Locație','church','ex: Biserica Sf. Treime'],
              ].map(([label,key,ph]) => (
                <div className="bl-section" key={key}>
                  <p className="bl-sl">{label}</p>
                  <div className="bl-g1">
                    <input className="bl-input" placeholder={ph} value={fields[key as keyof Fields]} onChange={set(key as keyof Fields)}/>
                  </div>
                </div>
              ))}
              <div className="bl-section">
                <p className="bl-sl">Botez — Dată & Ora</p>
                <div className="bl-g2">
                  <div className="bl-dw">
                    <input className="bl-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={fmt(fields.churchDate)}/>
                    <span className="bl-ci">📅</span>
                    <input className="bl-dn" type="date" value={fields.churchDate} onChange={e => setFields(f => ({ ...f, churchDate: e.target.value }))}/>
                  </div>
                  <div className="bl-iw">
                    <input className="bl-input" type="text" placeholder="11:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g,'') }))}/>
                    <span className="bl-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="bl-section">
                <p className="bl-sl">Petrecere — Locație</p>
                <div className="bl-g1">
                  <input className="bl-input" placeholder="ex: Restaurant La Conac" value={fields.restaurant} onChange={set('restaurant')}/>
                </div>
              </div>
              <div className="bl-section">
                <p className="bl-sl">Petrecere — Dată & Ora</p>
                <div className="bl-g2">
                  <div className="bl-dw">
                    <input className="bl-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={fmt(fields.restaurantDate)}/>
                    <span className="bl-ci">📅</span>
                    <input className="bl-dn" type="date" value={fields.restaurantDate} onChange={e => setFields(f => ({ ...f, restaurantDate: e.target.value }))}/>
                  </div>
                  <div className="bl-iw">
                    <input className="bl-input" type="text" placeholder="13:00" maxLength={5} value={fields.restaurantTime} onChange={e => setFields(f => ({ ...f, restaurantTime: e.target.value.replace(/[^0-9:]/g,'') }))}/>
                    <span className="bl-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="bl-section">
                <p className="bl-sl">Număr de contact</p>
                <div className="bl-g1">
                  <input className="bl-input" type="tel" placeholder="ex: 0700 000 000" value={fields.contact} onChange={set('contact')}/>
                </div>
              </div>

              {error && <div className="bl-error">⚠️ {error}</div>}

              <button className="bl-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🎈 Plătește 30 lei și descarcă'}
              </button>
              <p className="bl-pay-note">Watermark dispare după plată · PDF + JPG incluse<br/>Plată securizată prin Stripe</p>
              <div className="bl-guarantee">
                <div className="bl-gi"><span>🎈</span> Download instant</div>
                <div className="bl-gi"><span>🎀</span> PDF + JPG</div>
                <div className="bl-gi"><span>✨</span> 30 lei · o dată</div>
                <div className="bl-gi"><span>🌸</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bl-footer">
          <p className="bl-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="bl-footer-btn">← Vezi toate modelele</Link>
          <p className="bl-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
