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
  church: 'Biserica Sf. Treime', churchDate: '2025-06-08', churchTime: '11:00',
  restaurant: 'Restaurant Royal', restaurantDate: '2025-06-08', restaurantTime: '13:00',
  contact: '0700 000 000',
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

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Quicksand:wght@400;500;600;700&display=swap'

const CSS = `
.cs * { box-sizing: border-box; margin: 0; padding: 0; }
.cs { font-family: 'Quicksand', sans-serif; background: #0d0520; color: #fff; min-height: 100vh; }
.cs-topbar { background: #0d0520; border-bottom: 2px solid #c8900a; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.cs-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #ffd700; text-decoration: none; font-weight: 600; }
.cs-logo span { color: #d4a0f8; }
.cs-back { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(200,144,10,.45); color: #ffd700; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: transparent; transition: background .2s; }
.cs-back:hover { background: rgba(200,144,10,.1); }
.cs-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.cs-title { text-align: center; margin-bottom: 40px; }
.cs-title h1 { font-family: 'Cinzel', serif; font-size: clamp(16px,2.5vw,22px); font-weight: 700; color: #ffd700; margin-bottom: 8px; letter-spacing: .08em; text-shadow: 0 0 20px rgba(255,215,0,.3); }
.cs-title p { font-size: 11px; color: rgba(212,160,248,.5); letter-spacing: .1em; text-transform: uppercase; }
.cs-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.cs-inv-wrap { position: sticky; top: 72px; }
.cs-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.cs-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.cs-inv-inner { position: absolute; inset: 0; }
.cs-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }
.cs-inv { width: 794px; height: 1123px; position: relative; overflow: hidden; background: #0d0520; }
.cs-content { position: absolute; inset: 0; z-index: 6; display: flex; flex-direction: column; align-items: center; text-align: center; }
.cs-top { padding-top: 28px; width: 100%; }
.cs-badge { font-family: 'Quicksand', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .55em; text-transform: uppercase; color: #d4a0f8; background: rgba(10,2,28,.6); display: inline-block; padding: 5px 22px; border-radius: 20px; border: 1px solid rgba(200,144,10,.4); }
.cs-name-wrap { margin-top: 16px; padding: 0 60px; }
.cs-pretitle { font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .4em; text-transform: uppercase; color: #c8a0f0; margin-bottom: 4px; }
.cs-name { font-family: 'Cinzel', serif; font-size: 96px; font-weight: 900; color: #ffd700; line-height: .88; display: block; letter-spacing: .04em; text-shadow: 0 0 40px rgba(255,215,0,.5), 0 4px 0 rgba(180,120,0,.6), 0 8px 0 rgba(140,80,0,.3); }
.cs-tagline { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; font-style: italic; color: #e0c0ff; margin-top: 10px; letter-spacing: .08em; }
.cs-flex1 { flex: 1; }
.cs-bottom { width: 100%; background: rgba(8,1,20,.85); padding: 28px 60px 32px; border-top: 2px solid rgba(200,144,10,.5); }
.cs-grid { display: grid; grid-template-columns: 1fr 2px 1fr; gap: 0; margin-bottom: 22px; }
.cs-col-l { text-align: right; padding-right: 30px; }
.cs-col-r { text-align: left; padding-left: 30px; }
.cs-vsep { background: linear-gradient(180deg, transparent, #c8900a 15%, #ffd700 50%, #c8900a 85%, transparent); }
.cs-label { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .32em; text-transform: uppercase; color: #c8900a; margin-bottom: 6px; opacity: .9; }
.cs-val { font-family: 'Cinzel', serif; font-size: 26px; font-weight: 400; color: #fff8e0; line-height: 1.3; margin-bottom: 18px; text-shadow: 0 1px 8px rgba(200,144,10,.3); }
.cs-event-name { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; font-style: italic; color: #fff8e0; line-height: 1.25; margin-bottom: 4px; }
.cs-event-detail { font-family: 'Quicksand', sans-serif; font-size: 19px; font-weight: 500; color: #d4a0f8; line-height: 1.5; margin-bottom: 18px; }
.cs-contact-wrap { border-top: 1px solid rgba(200,144,10,.4); padding-top: 16px; text-align: center; }
.cs-contact-label { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .42em; text-transform: uppercase; color: #c8900a; margin-bottom: 5px; }
.cs-contact-val { font-family: 'Cinzel', serif; font-size: 32px; font-weight: 700; color: #ffd700; letter-spacing: .06em; text-shadow: 0 0 20px rgba(255,215,0,.4); }
.cs-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.cs-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.cs-wm-row { display: flex; white-space: nowrap; }
.cs-wm-item { font-size: 24px; letter-spacing: .1em; color: #ff0000; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; font-family: 'Cinzel', serif; }
.cs-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(200,144,10,.15); border-top: 2px solid rgba(200,144,10,.5); padding: 10px; text-align: center; font-size: 13px; color: #ffd700; letter-spacing: .08em; z-index: 25; font-family: 'Cinzel', serif; font-weight: 600; }
.cs-form h2 { font-family: 'Cinzel', serif; font-size: 18px; font-weight: 700; color: #ffd700; margin-bottom: 24px; border-bottom: 2px solid rgba(200,144,10,.35); padding-bottom: 10px; letter-spacing: .08em; text-shadow: 0 0 16px rgba(255,215,0,.3); }
.cs-section { margin-bottom: 18px; }
.cs-sl { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #c8900a; margin-bottom: 7px; }
.cs-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.cs-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.cs-input { width: 100%; padding: 10px 12px; font-size: 13px; border: 1.5px solid rgba(200,144,10,.25); border-radius: 8px; background: rgba(20,5,50,.8); color: #fff8e0; font-family: 'Quicksand', sans-serif; outline: none; transition: border-color .2s; font-weight: 600; }
.cs-input:focus { border-color: #ffd700; box-shadow: 0 0 0 3px rgba(255,215,0,.1); }
.cs-input::placeholder { color: rgba(212,160,248,.35); font-weight: 400; }
.cs-dw { position: relative; display: flex; align-items: center; }
.cs-dw .cs-input { padding-right: 40px; }
.cs-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.cs-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #c8900a; }
.cs-iw { position: relative; }
.cs-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(212,160,248,.4); pointer-events: none; }
.cs-error { background: rgba(220,38,38,.1); border: 1px solid rgba(220,38,38,.3); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #ff8080; }
.cs-pay-btn { width: 100%; padding: 15px; margin-top: 24px; background: linear-gradient(135deg,#4a1e7a,#8a2be2); color: #ffd700; border: 2px solid #c8900a; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .1em; cursor: pointer; font-weight: 700; transition: opacity .2s; box-shadow: 0 4px 20px rgba(138,43,226,.5), 0 0 30px rgba(200,144,10,.15); }
.cs-pay-btn:hover { opacity: .88; }
.cs-pay-btn:disabled { opacity: .5; cursor: not-allowed; }
.cs-pay-note { font-size: 11px; color: rgba(212,160,248,.55); text-align: center; margin-top: 8px; line-height: 1.6; font-family: 'Quicksand', sans-serif; }
.cs-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(138,43,226,.08); border: 1.5px solid rgba(200,144,10,.2); border-radius: 8px; }
.cs-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(212,160,248,.7); font-family: 'Cinzel', serif; }
.cs-gi span { font-size: 16px; }
.cs-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.65); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.cs-alert-box { background: #1a0a38; border: 2px solid #c8900a; border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 40px rgba(138,43,226,.2); }
.cs-alert-icon { font-size: 44px; margin-bottom: 12px; }
.cs-alert-title { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 700; color: #ffd700; margin-bottom: 14px; letter-spacing: .06em; }
.cs-alert-text { font-family: 'Quicksand', sans-serif; font-size: 14px; color: rgba(212,160,248,.85); line-height: 1.8; margin-bottom: 24px; }
.cs-alert-text strong { color: #ffd700; }
.cs-alert-btns { display: flex; gap: 10px; }
.cs-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(200,144,10,.3); border-radius: 8px; background: transparent; color: rgba(212,160,248,.6); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.cs-alert-confirm { flex: 2; padding: 11px; border: 2px solid #c8900a; border-radius: 8px; background: linear-gradient(135deg,#4a1e7a,#8a2be2); color: #ffd700; font-family: 'Cinzel', serif; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: .06em; }
.cs-alert-cancel:hover { background: rgba(200,144,10,.06); }
.cs-footer { border-top: 2px solid #c8900a; background: #08010e; padding: 28px 24px; text-align: center; }
.cs-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(200,144,10,.4); margin-bottom: 14px; }
.cs-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: linear-gradient(135deg,#4a1e7a,#8a2be2); color: #ffd700; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #c8900a; box-shadow: 0 4px 16px rgba(138,43,226,.4); }
.cs-footer-copy { font-size: 11px; color: rgba(200,144,10,.2); margin-top: 16px; font-style: italic; }
@media (max-width: 800px) { .cs-layout { grid-template-columns: 1fr; gap: 32px; } .cs-inv-wrap { position: static; } }
@media (max-width: 480px) { .cs-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieBotezFeteCastel() {
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
        body: JSON.stringify({ fields, template: 'invitatie-botez-fete-castel' }),
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
    <div key={i} className="cs-wm-row">
      {Array(8).fill(null).map((_, j) => <span key={j} className="cs-wm-item">VibeInvite.ro · 30 lei</span>)}
    </div>
  ))

  return (
    <>
      <link rel="stylesheet" href={FONT_URL} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cs">
        {showAlert && (
          <div className="cs-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="cs-alert-box" onClick={e => e.stopPropagation()}>
              <div className="cs-alert-icon">👑</div>
              <h3 className="cs-alert-title">Înainte să continui</h3>
              <p className="cs-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate după descărcare.
              </p>
              <div className="cs-alert-btns">
                <button className="cs-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="cs-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>👑 Continuă</button>
              </div>
            </div>
          </div>
        )}

        <header className="cs-topbar">
          <Link href="/" className="cs-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="cs-back">← Alege alt model</Link>
        </header>

        <div className="cs-inner">
          <div className="cs-title">
            <h1>👑 Invitație Botez — Prințesă & Castel</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="cs-layout">
            <div className="cs-inv-wrap">
              <div className="cs-inv-ratio">
                <div className="cs-inv-inner">
                  <div className="cs-inv-scale" style={{ transform:`scale(${360/794})` }}>
                    <div className="cs-inv">
                      <CastleBg id="csprev" />
                      <div className="cs-content">
                        <div className="cs-top">
                          <p className="cs-badge">✦ Invitație de Botez ✦</p>
                        </div>
                        <div className="cs-name-wrap">
                          <p className="cs-pretitle">Mica noastră prințesă</p>
                          <span className="cs-name">{fields.babyName || 'Sofia'}</span>
                          <p className="cs-tagline">a sosit în regatul nostru 👑</p>
                        </div>
                        <div className="cs-flex1"/>
                        <div className="cs-bottom">
                          <div className="cs-grid">
                            <div className="cs-col-l">
                              <p className="cs-label">👑 Părinți</p>
                              <p className="cs-val">{fields.parents}</p>
                              <p className="cs-label">✦ Nași</p>
                              <p className="cs-val" style={{ marginBottom:0 }}>{fields.godparents}</p>
                            </div>
                            <div className="cs-vsep"/>
                            <div className="cs-col-r">
                              <p className="cs-label">🕊 Sfântul Botez</p>
                              <p className="cs-event-name">{fields.church || 'Biserica'}</p>
                              <p className="cs-event-detail">{formatDate(fields.churchDate) || fields.churchDate}<br/>ora {fields.churchTime}</p>
                              <p className="cs-label">🎉 Petrecere</p>
                              <p className="cs-event-name">{fields.restaurant || 'Restaurantul'}</p>
                              <p className="cs-event-detail" style={{ marginBottom:0 }}>{formatDate(fields.restaurantDate) || fields.restaurantDate}<br/>ora {fields.restaurantTime}</p>
                            </div>
                          </div>
                          <div className="cs-contact-wrap">
                            <p className="cs-contact-label">Confirmați prezența</p>
                            <p className="cs-contact-val">{fields.contact}</p>
                          </div>
                        </div>
                      </div>
                      <div className="cs-wm">
                        <div className="cs-wm-grid">{WM}</div>
                        <div className="cs-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cs-form">
              <h2>👑 Personalizează</h2>
              {[
                ['Prenume Copil','babyName','ex: Sofia'],
                ['Părinți','parents','ex: Elena și Andrei Popescu'],
                ['Nași de Botez','godparents','ex: Maria și Cristian Ionescu'],
                ['Botez — Locație','church','ex: Biserica Sf. Treime'],
              ].map(([label,key,ph]) => (
                <div className="cs-section" key={key}>
                  <p className="cs-sl">{label}</p>
                  <div className="cs-g1">
                    <input className="cs-input" placeholder={ph} value={fields[key as keyof Fields]} onChange={set(key as keyof Fields)}/>
                  </div>
                </div>
              ))}
              <div className="cs-section">
                <p className="cs-sl">Botez — Dată & Ora</p>
                <div className="cs-g2">
                  <div className="cs-dw">
                    <input className="cs-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={fmt(fields.churchDate)}/>
                    <span className="cs-ci">📅</span>
                    <input className="cs-dn" type="date" value={fields.churchDate} onChange={e => setFields(f => ({ ...f, churchDate: e.target.value }))}/>
                  </div>
                  <div className="cs-iw">
                    <input className="cs-input" type="text" placeholder="11:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g,'') }))}/>
                    <span className="cs-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-sl">Petrecere — Locație</p>
                <div className="cs-g1">
                  <input className="cs-input" placeholder="ex: Restaurant Royal" value={fields.restaurant} onChange={set('restaurant')}/>
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-sl">Petrecere — Dată & Ora</p>
                <div className="cs-g2">
                  <div className="cs-dw">
                    <input className="cs-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={fmt(fields.restaurantDate)}/>
                    <span className="cs-ci">📅</span>
                    <input className="cs-dn" type="date" value={fields.restaurantDate} onChange={e => setFields(f => ({ ...f, restaurantDate: e.target.value }))}/>
                  </div>
                  <div className="cs-iw">
                    <input className="cs-input" type="text" placeholder="13:00" maxLength={5} value={fields.restaurantTime} onChange={e => setFields(f => ({ ...f, restaurantTime: e.target.value.replace(/[^0-9:]/g,'') }))}/>
                    <span className="cs-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="cs-section">
                <p className="cs-sl">Număr de contact</p>
                <div className="cs-g1">
                  <input className="cs-input" type="tel" placeholder="ex: 0700 000 000" value={fields.contact} onChange={set('contact')}/>
                </div>
              </div>

              {error && <div className="cs-error">⚠️ {error}</div>}

              <button className="cs-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '👑 Plătește 30 lei și descarcă'}
              </button>
              <p className="cs-pay-note">Watermark dispare după plată · PDF + JPG incluse · Stripe secured</p>
              <div className="cs-guarantee">
                <div className="cs-gi"><span>👑</span> Download instant</div>
                <div className="cs-gi"><span>✦</span> PDF + JPG</div>
                <div className="cs-gi"><span>⭐</span> 30 lei · o dată</div>
                <div className="cs-gi"><span>🏰</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="cs-footer">
          <p className="cs-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="cs-footer-btn">← Vezi toate modelele</Link>
          <p className="cs-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
