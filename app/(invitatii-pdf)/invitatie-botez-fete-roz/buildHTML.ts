const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function buildHTML_fetiRoz(fields: Record<string, string>): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; }
.inv { width: 794px; height: 1123px; position: relative; overflow: hidden; }
</style>
</head>
<body>
<div class="inv">

<svg style="position:absolute;inset:0;width:794px;height:1123px;z-index:0;" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Fundal gradient crem roz -->
  <linearGradient id="bg-main" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#fef6f0"/>
    <stop offset="40%" stop-color="#fdf0f4"/>
    <stop offset="70%" stop-color="#fce8f0"/>
    <stop offset="100%" stop-color="#f8e0ea"/>
  </linearGradient>
  <!-- Gradient roz petala trandafir -->
  <radialGradient id="rose-1" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#f9c8d8"/>
    <stop offset="40%" stop-color="#f0a0bc"/>
    <stop offset="100%" stop-color="#d4607a"/>
  </radialGradient>
  <!-- Gradient bujor -->
  <radialGradient id="peony-1" cx="40%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#fcd8e4"/>
    <stop offset="50%" stop-color="#f8aac4"/>
    <stop offset="100%" stop-color="#e07098"/>
  </radialGradient>
  <!-- Gradient trandafir profund -->
  <radialGradient id="rose-deep" cx="30%" cy="25%" r="70%">
    <stop offset="0%" stop-color="#f5b8cc"/>
    <stop offset="35%" stop-color="#e8849e"/>
    <stop offset="70%" stop-color="#c85878"/>
    <stop offset="100%" stop-color="#a03858"/>
  </radialGradient>
  <!-- Gradient petala mica -->
  <radialGradient id="petal-sm" cx="50%" cy="30%" r="70%">
    <stop offset="0%" stop-color="#fde0ea"/>
    <stop offset="100%" stop-color="#f0b0c8"/>
  </radialGradient>
  <!-- Gradient frunza -->
  <linearGradient id="leaf-g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#8ab878"/>
    <stop offset="100%" stop-color="#5a8848"/>
  </linearGradient>
  <!-- Gradient eucalipt argintiu -->
  <linearGradient id="eucalypt" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#a8c8b8"/>
    <stop offset="100%" stop-color="#78a898"/>
  </linearGradient>
  <!-- Gradient auriu delicat -->
  <linearGradient id="gold-del" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="transparent"/>
    <stop offset="20%" stop-color="#d4aa70"/>
    <stop offset="50%" stop-color="#e8c888"/>
    <stop offset="80%" stop-color="#d4aa70"/>
    <stop offset="100%" stop-color="transparent"/>
  </linearGradient>
  <!-- Glow roz subtil -->
  <filter id="glow-rose">
    <feGaussianBlur stdDeviation="12" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="glow-soft">
    <feGaussianBlur stdDeviation="20"/>
  </filter>
  <filter id="petal-shadow">
    <feDropShadow dx="2" dy="4" stdDeviation="6" flood-color="#c85878" flood-opacity=".2"/>
  </filter>
  <filter id="leaf-shadow">
    <feDropShadow dx="1" dy="3" stdDeviation="4" flood-color="#2a5a38" flood-opacity=".25"/>
  </filter>
  <filter id="text-emboss">
    <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#c85878" flood-opacity=".2"/>
  </filter>
</defs>

<!-- ══ FUNDAL ══ -->
<rect width="794" height="1123" fill="url(#bg-main)"/>

<!-- Glow-uri ambientale roz -->
<ellipse cx="150" cy="200" rx="280" ry="220" fill="#f8b0c8" opacity=".12" filter="url(#glow-soft)"/>
<ellipse cx="650" cy="180" rx="260" ry="200" fill="#f0a0bc" opacity=".1" filter="url(#glow-soft)"/>
<ellipse cx="397" cy="950" rx="300" ry="200" fill="#f8c0d0" opacity=".1" filter="url(#glow-soft)"/>

<!-- ══ ARANJAMENT FLORAL STANGA SUS (coroana/cascada) ══ -->

<!-- EUCALIPT / VERDEATA FUNDAL stanga -->
<!-- Ramura eucalipt mare 1 -->
<g opacity=".85" filter="url(#leaf-shadow)">
  <path d="M 0 -20 Q 40 60 20 160 Q 10 220 30 300" stroke="#78a898" stroke-width="2.5" fill="none"/>
  <ellipse cx="18" cy="80" rx="22" ry="11" fill="url(#eucalypt)" transform="rotate(-35 18 80)"/>
  <ellipse cx="28" cy="110" rx="24" ry="11" fill="url(#eucalypt)" transform="rotate(25 28 110)"/>
  <ellipse cx="15" cy="140" rx="22" ry="10" fill="url(#eucalypt)" transform="rotate(-40 15 140)"/>
  <ellipse cx="30" cy="168" rx="23" ry="10" fill="url(#eucalypt)" transform="rotate(30 30 168)"/>
  <ellipse cx="16" cy="196" rx="21" ry="10" fill="url(#eucalypt)" transform="rotate(-35 16 196)"/>
  <ellipse cx="28" cy="222" rx="20" ry="9" fill="url(#eucalypt)" transform="rotate(20 28 222)"/>
  <ellipse cx="26" cy="280" rx="18" ry="8" fill="url(#eucalypt)" transform="rotate(-20 26 280)"/>
</g>
<!-- Ramura eucalipt 2 - mai in afara -->
<g opacity=".7">
  <path d="M -10 0 Q 70 80 50 200 Q 40 260 70 340" stroke="#8ab898" stroke-width="2" fill="none"/>
  <ellipse cx="48" cy="95" rx="20" ry="9" fill="#a8c8b0" transform="rotate(-30 48 95)"/>
  <ellipse cx="62" cy="130" rx="22" ry="9" fill="#a8c8b0" transform="rotate(28 62 130)"/>
  <ellipse cx="48" cy="162" rx="20" ry="9" fill="#a8c8b0" transform="rotate(-32 48 162)"/>
  <ellipse cx="64" cy="195" rx="21" ry="9" fill="#a8c8b0" transform="rotate(25 64 195)"/>
  <ellipse cx="50" cy="226" rx="19" ry="8" fill="#a8c8b0" transform="rotate(-28 50 226)"/>
  <ellipse cx="65" cy="305" rx="18" ry="8" fill="#a8c8b0" transform="rotate(20 65 305)"/>
</g>
<!-- Frunze verzi intunecate -->
<g opacity=".75" filter="url(#leaf-shadow)">
  <path d="M 30 50 C 80 20 140 40 130 90 C 120 130 60 140 40 110 C 20 80 -5 75 30 50 Z" fill="url(#leaf-g)"/>
  <path d="M 30 50 C 80 100 100 120 100 140" stroke="#4a7838" stroke-width="1" fill="none" opacity=".5"/>
</g>
<g opacity=".7" filter="url(#leaf-shadow)">
  <path d="M 60 120 C 110 90 165 115 158 165 C 150 205 90 212 72 180 C 54 148 28 142 60 120 Z" fill="#6a9858" opacity=".8"/>
  <path d="M 60 120 C 108 172 128 188 130 200" stroke="#4a7838" stroke-width="1" fill="none" opacity=".4"/>
</g>
<g opacity=".65">
  <path d="M 10 200 C 55 168 108 188 102 235 C 96 272 38 278 22 248 C 6 218 -18 224 10 200 Z" fill="#5a8848" opacity=".75"/>
</g>

<!-- ══ TRANDAFIRI MARI (centru stanga sus) ══ -->

<!-- Trandafir 1 - cel mai mare, in stanga sus -->
<g transform="translate(118, 145)" filter="url(#petal-shadow)">
  <!-- Petale exterioare -->
  <path d="M 0 -52 C 28 -48 52 -28 52 0 C 52 30 28 52 0 52 C -28 52 -52 30 -52 0 C -52 -28 -28 -48 0 -52 Z" fill="#f5b8cc" opacity=".6"/>
  <!-- Petale strat 2 -->
  <path d="M 0 -44 C 22 -40 42 -22 44 2 C 46 28 24 46 0 46 C -24 46 -44 28 -42 2 C -40 -22 -22 -40 0 -44 Z" fill="url(#peony-1)" opacity=".8"/>
  <!-- Petale individuale vizibile -->
  <path d="M 0 -44 C 15 -36 28 -18 26 4 C 18 -8 5 -18 0 -28 C -5 -18 -18 -8 -26 4 C -28 -18 -15 -36 0 -44 Z" fill="#f8d0e0" opacity=".7"/>
  <!-- Strat 3 interior -->
  <path d="M 0 -32 C 16 -28 30 -14 30 4 C 30 22 16 32 0 32 C -16 32 -30 22 -30 4 C -30 -14 -16 -28 0 -32 Z" fill="url(#rose-deep)" opacity=".85"/>
  <!-- Petale interioare -->
  <path d="M 0 -28 C 10 -22 18 -10 16 4 C 8 -4 2 -10 0 -16 C -2 -10 -8 -4 -16 4 C -18 -10 -10 -22 0 -28 Z" fill="#fce0ea" opacity=".6"/>
  <!-- Centru trandafir -->
  <path d="M 0 -18 C 8 -14 14 -6 12 4 C 6 -2 1 -6 0 -10 C -1 -6 -6 -2 -12 4 C -14 -6 -8 -14 0 -18 Z" fill="#f8c0d4"/>
  <circle cx="0" cy="2" r="8" fill="#e8789a"/>
  <circle cx="0" cy="2" r="4" fill="#d45878"/>
  <circle cx="0" cy="0" r="2" fill="#c03a5a"/>
  <!-- Petale exterior suplimentare -->
  <path d="M 44 -22 C 52 -8 52 12 44 26" stroke="#f0a0bc" stroke-width="8" fill="none" stroke-linecap="round" opacity=".5"/>
  <path d="M -44 -22 C -52 -8 -52 12 -44 26" stroke="#f0a0bc" stroke-width="8" fill="none" stroke-linecap="round" opacity=".5"/>
  <path d="M -22 -44 C -8 -52 12 -52 26 -44" stroke="#f0a0bc" stroke-width="8" fill="none" stroke-linecap="round" opacity=".5"/>
  <path d="M -22 44 C -8 52 12 52 26 44" stroke="#f0a0bc" stroke-width="7" fill="none" stroke-linecap="round" opacity=".4"/>
</g>

<!-- Trandafir 2 - dreapta sus, mai mic -->
<g transform="translate(220, 80)" filter="url(#petal-shadow)">
  <path d="M 0 -38 C 20 -34 36 -18 36 2 C 36 22 20 36 0 36 C -20 36 -36 22 -36 2 C -36 -18 -20 -34 0 -38 Z" fill="#f9c8d8" opacity=".65"/>
  <path d="M 0 -30 C 16 -26 28 -12 28 4 C 28 20 14 28 0 28 C -14 28 -28 20 -28 4 C -28 -12 -16 -26 0 -30 Z" fill="url(#rose-1)" opacity=".9"/>
  <path d="M 0 -22 C 10 -18 18 -8 16 4 C 8 -2 1 -8 0 -12 C -1 -8 -8 -2 -16 4 C -18 -8 -10 -18 0 -22 Z" fill="#fde8f0" opacity=".7"/>
  <circle cx="0" cy="4" r="7" fill="#e0789a"/>
  <circle cx="0" cy="4" r="3" fill="#c85878"/>
</g>

<!-- Trandafir 3 - stanga mijloc -->
<g transform="translate(55, 255)" filter="url(#petal-shadow)">
  <path d="M 0 -34 C 18 -30 32 -16 32 2 C 32 20 18 32 0 32 C -18 32 -32 20 -32 2 C -32 -16 -18 -30 0 -34 Z" fill="#fbd0e0" opacity=".7"/>
  <path d="M 0 -26 C 14 -22 24 -10 24 4 C 24 18 12 26 0 26 C -12 26 -24 18 -24 4 C -24 -10 -14 -22 0 -26 Z" fill="url(#peony-1)" opacity=".85"/>
  <path d="M 0 -18 C 8 -14 14 -6 12 4" stroke="#fce0ea" stroke-width="6" fill="none" stroke-linecap="round" opacity=".6"/>
  <circle cx="0" cy="4" r="6" fill="#d86888"/>
  <circle cx="0" cy="4" r="3" fill="#c04868"/>
</g>

<!-- Bujor mare jos stanga -->
<g transform="translate(90, 340)" filter="url(#petal-shadow)">
  <!-- 8 petale mari bujor -->
  <path d="M 0 -42 C 14 -40 26 -28 28 -10 C 18 -18 6 -22 0 -30 Z" fill="#fbc8dc" opacity=".8"/>
  <path d="M 28 -30 C 40 -18 42 -2 36 14 C 30 4 24 -6 22 -18 Z" fill="#f8b8cc" opacity=".75"/>
  <path d="M 36 10 C 40 24 34 38 22 44 C 24 32 22 22 20 12 Z" fill="#fbc8dc" opacity=".8"/>
  <path d="M 14 42 C 4 50 -10 50 -22 44 C -10 38 0 32 6 24 Z" fill="#f8b8cc" opacity=".75"/>
  <path d="M -28 30 C -40 18 -42 2 -36 -14 C -30 -4 -26 8 -22 18 Z" fill="#fbc8dc" opacity=".8"/>
  <path d="M -36 -10 C -40 -24 -34 -38 -22 -44 C -24 -32 -22 -20 -18 -10 Z" fill="#f8b8cc" opacity=".75"/>
  <path d="M -22 -42 C -8 -50 8 -50 22 -44 C 8 -38 -2 -32 -6 -22 Z" fill="#fbc8dc" opacity=".8"/>
  <!-- Centru bujor - petale mici ingramadite -->
  <circle cx="0" cy="0" r="24" fill="url(#peony-1)" opacity=".9"/>
  <path d="M 0 -20 C 6 -16 10 -8 8 0 C 4 -6 0 -10 0 -14 Z" fill="#fde8f2" opacity=".7"/>
  <path d="M 14 -14 C 18 -6 16 4 10 10 C 10 2 10 -4 8 -10 Z" fill="#fde8f2" opacity=".65"/>
  <path d="M 16 8 C 12 16 4 20 -4 18 C 2 12 8 8 10 2 Z" fill="#fde8f2" opacity=".7"/>
  <path d="M -4 20 C -12 18 -18 10 -16 2 C -10 8 -6 12 -2 14 Z" fill="#fde8f2" opacity=".65"/>
  <path d="M -16 6 C -18 -4 -14 -14 -6 -18 C -6 -10 -8 -4 -8 2 Z" fill="#fde8f2" opacity=".7"/>
  <circle cx="0" cy="0" r="10" fill="#e87898"/>
  <circle cx="0" cy="0" r="5" fill="#d45878"/>
  <circle cx="-1" cy="-1" r="2" fill="#c03858"/>
</g>

<!-- Flori mici decorative stanga -->
<g transform="translate(168, 290)">
  <circle cx="0" cy="0" r="14" fill="#fce0ea" opacity=".7"/>
  <circle cx="0" cy="0" r="8" fill="#f0a8c0" opacity=".8"/>
  <circle cx="0" cy="0" r="4" fill="#e07898"/>
</g>
<g transform="translate(195, 360)">
  <circle cx="0" cy="0" r="10" fill="#fbd0e4" opacity=".65"/>
  <circle cx="0" cy="0" r="6" fill="#f0a0b8" opacity=".75"/>
  <circle cx="0" cy="0" r="3" fill="#d86888"/>
</g>

<!-- Petale cazatoare decorative -->
<path d="M 280 100 C 290 88 302 92 298 106 C 294 118 280 118 280 106 C 278 98 280 100 280 100 Z" fill="#f9c8d8" opacity=".6" transform="rotate(25 290 103)"/>
<path d="M 340 70 C 348 60 358 65 354 78 C 350 88 338 88 338 78 C 337 70 340 70 340 70 Z" fill="#f5b0c8" opacity=".55" transform="rotate(-15 348 74)"/>
<path d="M 310 180 C 318 170 328 175 325 186 C 322 196 310 196 310 186 C 309 178 310 180 310 180 Z" fill="#fbc8d8" opacity=".5" transform="rotate(40 319 183)"/>

<!-- ══ ARANJAMENT FLORAL DREAPTA JOS ══ -->

<!-- Eucalipt dreapta jos -->
<g transform="translate(794,1123) scale(-1,-1)" opacity=".8" filter="url(#leaf-shadow)">
  <path d="M 0 -10 Q 40 60 20 170 Q 10 230 40 310" stroke="#78a898" stroke-width="2.5" fill="none"/>
  <ellipse cx="18" cy="80" rx="22" ry="11" fill="url(#eucalypt)" transform="rotate(-35 18 80)"/>
  <ellipse cx="28" cy="112" rx="24" ry="11" fill="url(#eucalypt)" transform="rotate(25 28 112)"/>
  <ellipse cx="15" cy="144" rx="22" ry="10" fill="url(#eucalypt)" transform="rotate(-40 15 144)"/>
  <ellipse cx="30" cy="174" rx="23" ry="10" fill="url(#eucalypt)" transform="rotate(30 30 174)"/>
  <ellipse cx="16" cy="204" rx="21" ry="10" fill="url(#eucalypt)" transform="rotate(-35 16 204)"/>
  <ellipse cx="28" cy="270" rx="19" ry="9" fill="url(#eucalypt)" transform="rotate(20 28 270)"/>
</g>
<g transform="translate(794,1123) scale(-1,-1)" opacity=".65">
  <path d="M -10 0 Q 70 80 50 200 Q 40 260 70 340" stroke="#8ab898" stroke-width="2" fill="none"/>
  <ellipse cx="48" cy="95" rx="20" ry="9" fill="#a8c8b0" transform="rotate(-30 48 95)"/>
  <ellipse cx="62" cy="130" rx="22" ry="9" fill="#a8c8b0" transform="rotate(28 62 130)"/>
  <ellipse cx="50" cy="164" rx="20" ry="9" fill="#a8c8b0" transform="rotate(-32 50 164)"/>
  <ellipse cx="65" cy="198" rx="21" ry="9" fill="#a8c8b0" transform="rotate(25 65 198)"/>
  <ellipse cx="65" cy="310" rx="18" ry="8" fill="#a8c8b0" transform="rotate(20 65 310)"/>
</g>

<!-- Frunze verzi dreapta jos -->
<g transform="translate(794,1123) scale(-1,-1)" opacity=".75" filter="url(#leaf-shadow)">
  <path d="M 30 50 C 80 20 140 40 130 90 C 120 130 60 140 40 110 C 20 80 -5 75 30 50 Z" fill="url(#leaf-g)"/>
  <path d="M 60 120 C 110 90 165 115 158 165 C 150 205 90 212 72 180 C 54 148 28 142 60 120 Z" fill="#6a9858" opacity=".8"/>
  <path d="M 10 200 C 55 168 108 188 102 235 C 96 272 38 278 22 248 C 6 218 -18 224 10 200 Z" fill="#5a8848" opacity=".75"/>
</g>

<!-- Trandafir mare dreapta jos -->
<g transform="translate(676, 978)" filter="url(#petal-shadow)">
  <path d="M 0 -48 C 26 -44 46 -24 46 2 C 46 28 26 46 0 46 C -26 46 -46 28 -46 2 C -46 -24 -26 -44 0 -48 Z" fill="#f9c0d0" opacity=".6"/>
  <path d="M 0 -38 C 20 -34 36 -18 36 2 C 36 22 20 36 0 36 C -20 36 -36 22 -36 2 C -36 -18 -20 -34 0 -38 Z" fill="url(#rose-deep)" opacity=".85"/>
  <path d="M 0 -28 C 12 -24 22 -12 20 4 C 10 -4 2 -10 0 -14 C -2 -10 -10 -4 -20 4 C -22 -12 -12 -24 0 -28 Z" fill="#fde8f2" opacity=".65"/>
  <circle cx="0" cy="2" r="10" fill="#d46888"/>
  <circle cx="0" cy="2" r="5" fill="#b84868"/>
</g>

<!-- Bujor dreapta jos -->
<g transform="translate(734, 900)" filter="url(#petal-shadow)">
  <path d="M 0 -36 C 12 -34 22 -22 24 -8 C 16 -15 5 -19 0 -26 Z" fill="#fbc8dc" opacity=".8"/>
  <path d="M 24 -22 C 34 -12 36 0 30 14 C 24 6 20 -2 18 -14 Z" fill="#f8b8cc" opacity=".75"/>
  <path d="M 28 10 C 30 22 24 32 14 36 C 16 26 16 18 14 10 Z" fill="#fbc8dc" opacity=".8"/>
  <path d="M 6 34 C -2 40 -14 40 -22 34 C -12 28 -2 24 4 18 Z" fill="#f8b8cc" opacity=".75"/>
  <path d="M -24 22 C -32 12 -34 0 -28 -12 C -24 -4 -20 4 -16 12 Z" fill="#fbc8dc" opacity=".8"/>
  <path d="M -28 -10 C -32 -22 -26 -32 -16 -36 C -18 -26 -18 -16 -14 -8 Z" fill="#f8b8cc" opacity=".75"/>
  <path d="M -14 -34 C -4 -40 8 -40 18 -34 C 6 -28 -2 -24 -6 -16 Z" fill="#fbc8dc" opacity=".8"/>
  <circle cx="0" cy="0" r="20" fill="url(#peony-1)" opacity=".9"/>
  <circle cx="0" cy="0" r="9" fill="#e07898"/>
  <circle cx="0" cy="0" r="4" fill="#c85878"/>
</g>

<!-- Trandafir mic dreapta jos 2 -->
<g transform="translate(610, 1040)" filter="url(#petal-shadow)">
  <path d="M 0 -30 C 16 -26 28 -14 28 2 C 28 18 16 28 0 28 C -16 28 -28 18 -28 2 C -28 -14 -16 -26 0 -30 Z" fill="url(#rose-1)" opacity=".85"/>
  <path d="M 0 -20 C 8 -16 15 -8 14 2 C 7 -2 1 -7 0 -10 Z" fill="#fde8f2" opacity=".6"/>
  <circle cx="0" cy="2" r="7" fill="#d86888"/>
  <circle cx="0" cy="2" r="3" fill="#c04868"/>
</g>

<!-- Flori mici decorative dreapta jos -->
<g transform="translate(560, 1000)">
  <circle cx="0" cy="0" r="12" fill="#fce0ea" opacity=".65"/>
  <circle cx="0" cy="0" r="7" fill="#f0a8c0" opacity=".75"/>
  <circle cx="0" cy="0" r="3" fill="#e07898"/>
</g>

<!-- Petale cazatoare dreapta jos -->
<path d="M 460 1040 C 470 1028 482 1032 478 1046 C 474 1058 460 1058 460 1046 C 458 1038 460 1040 460 1040 Z" fill="#f9c8d8" opacity=".55" transform="rotate(-20 470 1043)"/>
<path d="M 500 1060 C 508 1050 518 1054 515 1066 C 512 1076 500 1076 500 1066 C 499 1058 500 1060 500 1060 Z" fill="#f5b0c8" opacity=".5" transform="rotate(30 509 1063)"/>

<!-- ══ ELEMENT DECORATIV CENTRAL - ARC FLORAL DEASUPRA NUMELUI ══ -->
<!-- Arc subtil de petale deasupra zonei numelui -->
<g transform="translate(397, 380)" opacity=".7">
  <!-- Petale mici arc stanga -->
  <ellipse cx="-140" cy="-15" rx="18" ry="8" fill="#f9c8d8" transform="rotate(-20 -140 -15)"/>
  <ellipse cx="-115" cy="-30" rx="16" ry="7" fill="#f5b8cc" transform="rotate(-35 -115 -30)"/>
  <ellipse cx="-88" cy="-40" rx="14" ry="6" fill="#fbc8d8" transform="rotate(-50 -88 -40)"/>
  <ellipse cx="-60" cy="-46" rx="12" ry="6" fill="#f9c0d0" transform="rotate(-65 -60 -46)"/>
  <ellipse cx="-30" cy="-50" rx="11" ry="5" fill="#fbd0dc" transform="rotate(-78 -30 -50)"/>
  <!-- Petale mici arc dreapta -->
  <ellipse cx="140" cy="-15" rx="18" ry="8" fill="#f9c8d8" transform="rotate(20 140 -15)"/>
  <ellipse cx="115" cy="-30" rx="16" ry="7" fill="#f5b8cc" transform="rotate(35 115 -30)"/>
  <ellipse cx="88" cy="-40" rx="14" ry="6" fill="#fbc8d8" transform="rotate(50 88 -40)"/>
  <ellipse cx="60" cy="-46" rx="12" ry="6" fill="#f9c0d0" transform="rotate(65 60 -46)"/>
  <ellipse cx="30" cy="-50" rx="11" ry="5" fill="#fbd0dc" transform="rotate(78 30 -50)"/>
  <!-- Flori mici pe arc -->
  <circle cx="-160" cy="-8" r="8" fill="#f0a8c0" opacity=".7"/>
  <circle cx="-160" cy="-8" r="4" fill="#e07898" opacity=".8"/>
  <circle cx="160" cy="-8" r="8" fill="#f0a8c0" opacity=".7"/>
  <circle cx="160" cy="-8" r="4" fill="#e07898" opacity=".8"/>
  <!-- Floricel centru arc -->
  <circle cx="0" cy="-52" r="10" fill="#fce0ea" opacity=".75"/>
  <circle cx="0" cy="-52" r="6" fill="#f0a8c0" opacity=".8"/>
  <circle cx="0" cy="-52" r="3" fill="#e07898"/>
</g>

<!-- ══ LINII DECORATIVE AURII ══ -->
<line x1="120" y1="500" x2="674" y2="500" stroke="url(#gold-del)" stroke-width="1" opacity=".7"/>
<line x1="80" y1="506" x2="714" y2="506" stroke="url(#gold-del)" stroke-width=".5" opacity=".4"/>

<line x1="120" y1="900" x2="674" y2="900" stroke="url(#gold-del)" stroke-width="1" opacity=".6"/>
<line x1="80" y1="906" x2="714" y2="906" stroke="url(#gold-del)" stroke-width=".5" opacity=".35"/>

<!-- Ornament romb central auriu linii -->
<g transform="translate(397, 503)">
  <polygon points="0,-8 8,0 0,8 -8,0" fill="#d4aa70" opacity=".8"/>
  <polygon points="0,-5 5,0 0,5 -5,0" fill="#e8c888" opacity=".6"/>
</g>
<g transform="translate(397, 903)">
  <polygon points="0,-8 8,0 0,8 -8,0" fill="#d4aa70" opacity=".7"/>
  <polygon points="0,-5 5,0 0,5 -5,0" fill="#e8c888" opacity=".55"/>
</g>

<!-- Puncte decorative aurii pe linii -->
<g fill="#d4aa70" opacity=".6">
  <circle cx="200" cy="503" r="2"/>
  <circle cx="250" cy="503" r="1.5"/>
  <circle cx="300" cy="503" r="2"/>
  <circle cx="350" cy="503" r="1.5"/>
  <circle cx="444" cy="503" r="1.5"/>
  <circle cx="494" cy="503" r="2"/>
  <circle cx="544" cy="503" r="1.5"/>
  <circle cx="594" cy="503" r="2"/>
</g>

<!-- ══ BORDURA EXTERIOARA DELICATA ══ -->
<rect x="22" y="22" width="750" height="1079" fill="none" stroke="#d4aa70" stroke-width="1.5" opacity=".5"/>
<rect x="30" y="30" width="734" height="1063" fill="none" stroke="#f0a8c0" stroke-width=".8" opacity=".4"/>
<!-- Ornamente colturi bordura -->
<g stroke="#d4aa70" stroke-width="1" fill="none" opacity=".6">
  <path d="M 22 22 L 22 60 M 22 22 L 60 22"/>
  <path d="M 772 22 L 772 60 M 772 22 L 734 22"/>
  <path d="M 22 1101 L 22 1063 M 22 1101 L 60 1101"/>
  <path d="M 772 1101 L 772 1063 M 772 1101 L 734 1101"/>
</g>
<g fill="#d4aa70" opacity=".6">
  <circle cx="22" cy="22" r="3"/>
  <circle cx="772" cy="22" r="3"/>
  <circle cx="22" cy="1101" r="3"/>
  <circle cx="772" cy="1101" r="3"/>
</g>

</svg>

<!-- ══ CONTENT TEXT ══ -->
<div style="position:absolute;inset:0;z-index:6;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 90px;">

  <!-- SPATIU SUS (flori) -->
  <div style="height:380px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:16px;width:100%;">
    <p style="font-family:'Quicksand',sans-serif;font-size:12px;font-weight:600;letter-spacing:.55em;text-transform:uppercase;color:#b07090;margin-bottom:10px;">✦ Invitație de Botez ✦</p>
  </div>

  <!-- BABY NAME - IMPACT MAXIM -->
  <div style="margin-bottom:8px;">
    <span style="font-family:'Playfair Display',serif;font-size:96px;font-weight:700;font-style:italic;color:#8a2848;line-height:.9;display:block;letter-spacing:-.01em;text-shadow:0 2px 24px rgba(200,88,120,.2),0 0 60px rgba(200,88,120,.1);">${fields.babyName || 'Sofia'}</span>
  </div>

  <!-- TAGLINE -->
  <p style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;font-style:italic;color:#c06888;letter-spacing:.08em;margin-bottom:0;">a înflorit în lumea noastră 🌸</p>

  <!-- SEPARATOR AURIU -->
  <div style="display:flex;align-items:center;gap:14px;width:100%;margin:20px 0;">
    <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#d4aa70);"></div>
    <span style="font-family:'Cormorant Garamond',serif;font-size:20px;color:#d4aa70;letter-spacing:.1em;">❦</span>
    <div style="flex:1;height:1px;background:linear-gradient(90deg,#d4aa70,transparent);"></div>
  </div>

  <!-- INFO GRID -->
  <div style="display:grid;grid-template-columns:1fr 1px 1fr;gap:0;width:100%;margin-bottom:20px;">
    <!-- Coloana stanga -->
    <div style="padding-right:30px;text-align:right;">
      <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#c87898;margin-bottom:6px;">Părinți</p>
      <p style="font-family:'Playfair Display',serif;font-size:28px;font-weight:400;color:#5a1e38;line-height:1.35;margin-bottom:20px;">${fields.parents}</p>
      <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#c87898;margin-bottom:6px;">Nași</p>
      <p style="font-family:'Playfair Display',serif;font-size:28px;font-weight:400;color:#5a1e38;line-height:1.35;">${fields.godparents}</p>
    </div>
    <!-- Separator -->
    <div style="background:linear-gradient(180deg,transparent,#d4aa70 20%,#d4aa70 80%,transparent);"></div>
    <!-- Coloana dreapta -->
    <div style="padding-left:30px;text-align:left;">
      <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#c87898;margin-bottom:6px;">🕊 Sfântul Botez</p>
      <p style="font-family:'Playfair Display',serif;font-size:26px;font-weight:400;font-style:italic;color:#5a1e38;line-height:1.3;margin-bottom:5px;">${fields.church}</p>
      <p style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:#c87898;line-height:1.5;margin-bottom:20px;">${formatDate(fields.churchDate)}<br>ora ${fields.churchTime}</p>
      <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#c87898;margin-bottom:6px;">🌸 Petrecere</p>
      <p style="font-family:'Playfair Display',serif;font-size:26px;font-weight:400;font-style:italic;color:#5a1e38;line-height:1.3;margin-bottom:5px;">${fields.restaurant}</p>
      <p style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:#c87898;line-height:1.5;">${formatDate(fields.restaurantDate)}<br>ora ${fields.restaurantTime}</p>
    </div>
  </div>

  <!-- CONTACT -->
  <div style="text-align:center;padding-bottom:40px;">
    <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.4em;text-transform:uppercase;color:#c87898;margin-bottom:8px;">Confirmați prezența</p>
    <p style="font-family:'Playfair Display',serif;font-size:32px;font-weight:400;color:#5a1e38;letter-spacing:.04em;">${fields.contact}</p>
  </div>

</div>

</div>
</body>
</html>`
}