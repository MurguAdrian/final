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
  restaurant: 'Restaurant Belle Fleur', restaurantDate: '2025-05-10', restaurantTime: '13:00',
  contact: '0700 000 000',
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

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Quicksand:wght@400;500;600;700&family=Cinzel:wght@400;600&display=swap');

.fr * { box-sizing: border-box; margin: 0; padding: 0; }
.fr { font-family: 'Quicksand', sans-serif; background: #fef0f4; color: #5a1e38; min-height: 100vh; }

.fr-topbar { background: #5a1e38; border-bottom: 2px solid #d4aa70; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.fr-logo { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: .14em; color: #fff; text-decoration: none; font-weight: 600; }
.fr-logo span { color: #f0a8c0; }
.fr-back { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(212,170,112,.4); color: #d4aa70; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; font-weight: 600; text-decoration: none; background: transparent; transition: background .2s; }
.fr-back:hover { background: rgba(212,170,112,.1); }

.fr-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; }
.fr-title { text-align: center; margin-bottom: 40px; }
.fr-title h1 { font-family: 'Playfair Display', serif; font-size: clamp(18px,3vw,28px); font-weight: 400; font-style: italic; color: #5a1e38; margin-bottom: 8px; }
.fr-title p { font-size: 11px; color: rgba(90,30,56,.5); letter-spacing: .1em; text-transform: uppercase; }

.fr-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
.fr-inv-wrap { position: sticky; top: 72px; }
.fr-inv-ratio { width: 100%; max-width: 360px; margin: 0 auto; position: relative; }
.fr-inv-ratio::before { content:''; display:block; padding-top: calc(1123 / 794 * 100%); }
.fr-inv-inner { position: absolute; inset: 0; }
.fr-inv-scale { width: 794px; height: 1123px; transform-origin: top left; position: absolute; top: 0; left: 0; }

.fr-inv { width: 794px; height: 1123px; position: relative; overflow: hidden; }
.fr-content { position: absolute; inset: 0; z-index: 6; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 90px; }
.fr-header { height: 380px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 16px; width: 100%; }
.fr-badge { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .55em; text-transform: uppercase; color: #b07090; margin-bottom: 10px; }
.fr-name { font-family: 'Playfair Display', serif; font-size: 96px; font-weight: 700; font-style: italic; color: #8a2848; line-height: .9; display: block; letter-spacing: -.01em; text-shadow: 0 2px 24px rgba(200,88,120,.2); margin-bottom: 8px; }
.fr-tagline { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; font-style: italic; color: #c06888; letter-spacing: .08em; }
.fr-sep { display: flex; align-items: center; gap: 14px; width: 100%; margin: 20px 0; }
.fr-sep-l { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #d4aa70); }
.fr-sep-r { flex: 1; height: 1px; background: linear-gradient(90deg, #d4aa70, transparent); }
.fr-sep-icon { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #d4aa70; letter-spacing: .1em; }
.fr-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 0; width: 100%; margin-bottom: 20px; }
.fr-col-l { padding-right: 30px; text-align: right; }
.fr-col-r { padding-left: 30px; text-align: left; }
.fr-vsep { background: linear-gradient(180deg, transparent, #d4aa70 20%, #d4aa70 80%, transparent); }
.fr-label { font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: #c87898; margin-bottom: 6px; }
.fr-val { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 400; color: #5a1e38; line-height: 1.35; margin-bottom: 20px; }
.fr-event-name { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 400; font-style: italic; color: #5a1e38; line-height: 1.3; margin-bottom: 5px; }
.fr-event-detail { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: #c87898; line-height: 1.5; margin-bottom: 20px; }
.fr-contact { text-align: center; padding-bottom: 40px; }
.fr-contact-label { font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .4em; text-transform: uppercase; color: #c87898; margin-bottom: 8px; }
.fr-contact-val { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 400; color: #5a1e38; letter-spacing: .04em; }

.fr-wm { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: hidden; }
.fr-wm-grid { position: absolute; inset: -60px; display: flex; flex-direction: column; transform: rotate(-30deg); }
.fr-wm-row { display: flex; white-space: nowrap; }
.fr-wm-item { font-size: 24px; letter-spacing: .1em; color: #ff0000; opacity: .1; padding: 28px 30px; white-space: nowrap; user-select: none; font-family: 'Quicksand', sans-serif; }
.fr-wm-notice { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(90,30,56,.12); border-top: 1px solid rgba(212,170,112,.3); padding: 8px 10px; text-align: center; font-size: 11px; color: #8a4060; letter-spacing: .06em; z-index: 25; }

.fr-form h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 400; font-style: italic; color: #5a1e38; margin-bottom: 24px; border-bottom: 1.5px solid rgba(212,170,112,.3); padding-bottom: 10px; }
.fr-section { margin-bottom: 18px; }
.fr-sl { font-family: 'Quicksand', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #c87898; margin-bottom: 7px; }
.fr-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.fr-g1 { display: grid; grid-template-columns: 1fr; gap: 8px; }
.fr-input { width: 100%; padding: 10px 12px; font-size: 13px; border: 1.5px solid rgba(200,120,152,.2); border-radius: 8px; background: rgba(253,230,240,.3); color: #5a1e38; font-family: 'Quicksand', sans-serif; outline: none; transition: border-color .2s; font-weight: 600; }
.fr-input:focus { border-color: #d4aa70; box-shadow: 0 0 0 3px rgba(212,170,112,.1); }
.fr-input::placeholder { color: rgba(90,30,56,.3); font-weight: 400; }
.fr-dw { position: relative; display: flex; align-items: center; }
.fr-dw .fr-input { padding-right: 40px; }
.fr-dn { position: absolute; right: 0; top: 0; width: 40px; height: 100%; opacity: 0; cursor: pointer; }
.fr-ci { position: absolute; right: 10px; font-size: 16px; pointer-events: none; color: #d4aa70; }
.fr-iw { position: relative; }
.fr-ih { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: rgba(90,30,56,.3); pointer-events: none; }
.fr-error { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.25); border-radius: 8px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #dc2626; }
.fr-pay-btn { width: 100%; padding: 14px; margin-top: 24px; background: linear-gradient(135deg, #8a2848, #c05878); color: #fff; border: none; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; cursor: pointer; font-weight: 600; transition: opacity .2s; box-shadow: 0 4px 20px rgba(138,40,72,.3); }
.fr-pay-btn:hover { opacity: .88; }
.fr-pay-btn:disabled { opacity: .5; cursor: not-allowed; }
.fr-pay-note { font-size: 11px; color: rgba(90,30,56,.45); text-align: center; margin-top: 8px; line-height: 1.6; }
.fr-guarantee { display: flex; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; padding: 14px 16px; background: rgba(200,120,152,.05); border: 1.5px solid rgba(200,120,152,.15); border-radius: 8px; }
.fr-gi { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(90,30,56,.6); font-family: 'Quicksand', sans-serif; font-weight: 600; }
.fr-gi span { font-size: 16px; }

.fr-alert-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
.fr-alert-box { background: #fef0f4; border: 2px solid #d4aa70; border-radius: 16px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
.fr-alert-icon { font-size: 40px; margin-bottom: 12px; }
.fr-alert-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 400; font-style: italic; color: #5a1e38; margin-bottom: 14px; }
.fr-alert-text { font-family: 'Quicksand', sans-serif; font-size: 14px; color: rgba(90,30,56,.65); line-height: 1.8; margin-bottom: 24px; }
.fr-alert-text strong { color: #5a1e38; }
.fr-alert-btns { display: flex; gap: 10px; }
.fr-alert-cancel { flex: 1; padding: 11px; border: 1.5px solid rgba(212,170,112,.3); border-radius: 8px; background: #fff; color: rgba(90,30,56,.5); font-family: 'Cinzel', serif; font-size: 11px; cursor: pointer; }
.fr-alert-confirm { flex: 2; padding: 11px; border: none; border-radius: 8px; background: linear-gradient(135deg,#8a2848,#c05878); color: #fff; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600; cursor: pointer; }
.fr-alert-cancel:hover { background: rgba(212,170,112,.06); }

.fr-footer { border-top: 1px solid rgba(212,170,112,.3); background: #5a1e38; padding: 28px 24px; text-align: center; }
.fr-footer-text { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: .08em; color: rgba(240,168,192,.4); margin-bottom: 14px; }
.fr-footer-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 100px; background: linear-gradient(135deg,#8a2848,#c05878); color: #fff; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600; text-decoration: none; box-shadow: 0 4px 16px rgba(138,40,72,.3); }
.fr-footer-copy { font-size: 11px; color: rgba(240,168,192,.2); margin-top: 16px; font-style: italic; }

@media (max-width: 800px) { .fr-layout { grid-template-columns: 1fr; gap: 32px; } .fr-inv-wrap { position: static; } }
@media (max-width: 480px) { .fr-inner { padding: 28px 16px 60px; } }
`

export default function InvitatieBotezFeteRoz() {
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
        body: JSON.stringify({ fields, template: 'invitatie-botez-fete-roz' }),
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
    <div key={i} className="fr-wm-row">
      {Array(8).fill(null).map((_, j) => <span key={j} className="fr-wm-item">VibeInvite.ro · 30 lei</span>)}
    </div>
  ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="fr">
        {showAlert && (
          <div className="fr-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="fr-alert-box" onClick={e => e.stopPropagation()}>
              <div className="fr-alert-icon">🌸</div>
              <h3 className="fr-alert-title">Înainte să continui</h3>
              <p className="fr-alert-text">
                După efectuarea plății, <strong>salvați imediat</strong> invitația (PDF și JPG) și distribuiți-o.<br /><br />
                Nu ne asumăm răspunderea pentru fișierele nesalvate după descărcare.
              </p>
              <div className="fr-alert-btns">
                <button className="fr-alert-cancel" onClick={() => setShowAlert(false)}>Anulează</button>
                <button className="fr-alert-confirm" onClick={() => { setShowAlert(false); handlePay() }}>Am înțeles, continuă</button>
              </div>
            </div>
          </div>
        )}

        <header className="fr-topbar">
          <Link href="/" className="fr-logo">Vibe<span>Invite</span></Link>
          <Link href="/invitatii-PDF" className="fr-back">← Alege alt model</Link>
        </header>

        <div className="fr-inner">
          <div className="fr-title">
            <h1>Invitație Botez Fată — Floral Roz</h1>
            <p>Personalizează câmpurile și previzualizează în timp real</p>
          </div>

          <div className="fr-layout">
            <div className="fr-inv-wrap">
              <div className="fr-inv-ratio">
                <div className="fr-inv-inner">
                  <div className="fr-inv-scale" style={{ transform:`scale(${360/794})` }}>
                    <div className="fr-inv">
                      <FloralBg id="frp" />
                      <div className="fr-content">
                        <div className="fr-header">
                          <p className="fr-badge">✦ Invitație de Botez ✦</p>
                        </div>
                        <span className="fr-name">{fields.babyName || 'Sofia'}</span>
                        <p className="fr-tagline">a înflorit în lumea noastră 🌸</p>
                        <div className="fr-sep">
                          <div className="fr-sep-l"/><span className="fr-sep-icon">❦</span><div className="fr-sep-r"/>
                        </div>
                        <div className="fr-grid">
                          <div className="fr-col-l">
                            <p className="fr-label">Părinți</p>
                            <p className="fr-val">{fields.parents}</p>
                            <p className="fr-label">Nași</p>
                            <p className="fr-val" style={{ marginBottom:0 }}>{fields.godparents}</p>
                          </div>
                          <div className="fr-vsep"/>
                          <div className="fr-col-r">
                            <p className="fr-label">🕊 Sfântul Botez</p>
                            <p className="fr-event-name">{fields.church || 'Biserica'}</p>
                            <p className="fr-event-detail">{formatDate(fields.churchDate) || fields.churchDate}<br/>ora {fields.churchTime}</p>
                            <p className="fr-label">🌸 Petrecere</p>
                            <p className="fr-event-name">{fields.restaurant || 'Restaurantul'}</p>
                            <p className="fr-event-detail" style={{ marginBottom:0 }}>{formatDate(fields.restaurantDate) || fields.restaurantDate}<br/>ora {fields.restaurantTime}</p>
                          </div>
                        </div>
                        <div className="fr-contact">
                          <p className="fr-contact-label">Confirmați prezența</p>
                          <p className="fr-contact-val">{fields.contact}</p>
                        </div>
                      </div>
                      <div className="fr-wm">
                        <div className="fr-wm-grid">{WM}</div>
                        <div className="fr-wm-notice">Watermark dispare după plata de 30 lei</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="fr-form">
              <h2>Personalizează invitația</h2>
              {[
                ['Prenume Copil','babyName','ex: Sofia'],
                ['Părinți','parents','ex: Elena și Andrei Popescu'],
                ['Nași de Botez','godparents','ex: Maria și Cristian Ionescu'],
                ['Botez — Locație','church','ex: Biserica Sf. Treime'],
              ].map(([label, key, ph]) => (
                <div className="fr-section" key={key}>
                  <p className="fr-sl">{label}</p>
                  <div className="fr-g1">
                    <input className="fr-input" placeholder={ph} value={fields[key as keyof Fields]} onChange={set(key as keyof Fields)} />
                  </div>
                </div>
              ))}
              <div className="fr-section">
                <p className="fr-sl">Botez — Dată & Ora</p>
                <div className="fr-g2">
                  <div className="fr-dw">
                    <input className="fr-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={fmt(fields.churchDate)} />
                    <span className="fr-ci">📅</span>
                    <input className="fr-dn" type="date" value={fields.churchDate} onChange={e => setFields(f => ({ ...f, churchDate: e.target.value }))} />
                  </div>
                  <div className="fr-iw">
                    <input className="fr-input" type="text" placeholder="11:00" maxLength={5} value={fields.churchTime} onChange={e => setFields(f => ({ ...f, churchTime: e.target.value.replace(/[^0-9:]/g,'') }))} />
                    <span className="fr-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="fr-section">
                <p className="fr-sl">Petrecere — Locație</p>
                <div className="fr-g1">
                  <input className="fr-input" placeholder="ex: Restaurant Belle Fleur" value={fields.restaurant} onChange={set('restaurant')} />
                </div>
              </div>
              <div className="fr-section">
                <p className="fr-sl">Petrecere — Dată & Ora</p>
                <div className="fr-g2">
                  <div className="fr-dw">
                    <input className="fr-input" type="text" placeholder="ZZ.LL.AAAA" readOnly value={fmt(fields.restaurantDate)} />
                    <span className="fr-ci">📅</span>
                    <input className="fr-dn" type="date" value={fields.restaurantDate} onChange={e => setFields(f => ({ ...f, restaurantDate: e.target.value }))} />
                  </div>
                  <div className="fr-iw">
                    <input className="fr-input" type="text" placeholder="13:00" maxLength={5} value={fields.restaurantTime} onChange={e => setFields(f => ({ ...f, restaurantTime: e.target.value.replace(/[^0-9:]/g,'') }))} />
                    <span className="fr-ih">HH:MM</span>
                  </div>
                </div>
              </div>
              <div className="fr-section">
                <p className="fr-sl">Număr de contact</p>
                <div className="fr-g1">
                  <input className="fr-input" type="tel" placeholder="ex: 0700 000 000" value={fields.contact} onChange={set('contact')} />
                </div>
              </div>

              {error && <div className="fr-error">⚠️ {error}</div>}

              <button className="fr-pay-btn" onClick={() => setShowAlert(true)} disabled={loading}>
                {loading ? 'Se procesează...' : '🌸 Plătește 30 lei și descarcă'}
              </button>
              <p className="fr-pay-note">Watermark dispare după plată · PDF + JPG incluse<br/>Plată securizată prin Stripe</p>
              <div className="fr-guarantee">
                <div className="fr-gi"><span>🌸</span> Download instant</div>
                <div className="fr-gi"><span>✦</span> PDF + JPG</div>
                <div className="fr-gi"><span>💛</span> 30 lei · o dată</div>
                <div className="fr-gi"><span>🌿</span> Fără abonament</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="fr-footer">
          <p className="fr-footer-text">Nu ai găsit modelul potrivit?</p>
          <Link href="/invitatii-PDF" className="fr-footer-btn">← Vezi toate modelele</Link>
          <p className="fr-footer-copy">© {new Date().getFullYear()} VibeInvite · Făcut cu ♥ în România</p>
        </footer>
      </div>
    </>
  )
}
