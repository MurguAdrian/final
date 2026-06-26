const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
function formatRsvp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function buildHTML_stele(fields: Record<string, string>): string {
  // Generare stele pseudo-random dar deterministice
  const stars = Array.from({ length: 220 }, (_, i) => {
    const x = ((i * 137.508 + 47) % 794)
    const y = ((i * 97.3 + 23) % 1123)
    const r = i % 7 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.7
    const op = 0.3 + (i % 10) * 0.07
    return { x: x.toFixed(1), y: y.toFixed(1), r, op: op.toFixed(2) }
  })

  const starsSVG = stars.map(s =>
    `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="#f0d880" opacity="${s.op}"/>`
  ).join('')

  // Stele stralucitoare mari cu raze
  const brightStars = [
    { x: 120, y: 180 }, { x: 680, y: 140 }, { x: 400, y: 80 },
    { x: 80, y: 400 }, { x: 720, y: 380 }, { x: 200, y: 900 },
    { x: 650, y: 920 }, { x: 380, y: 980 },
  ].map(s => `
    <circle cx="${s.x}" cy="${s.y}" r="3" fill="#f8e890" opacity=".9"/>
    <line x1="${s.x - 10}" y1="${s.y}" x2="${s.x + 10}" y2="${s.y}" stroke="#f8e890" stroke-width=".6" opacity=".5"/>
    <line x1="${s.x}" y1="${s.y - 10}" x2="${s.x}" y2="${s.y + 10}" stroke="#f8e890" stroke-width=".6" opacity=".5"/>
    <line x1="${s.x - 7}" y1="${s.y - 7}" x2="${s.x + 7}" y2="${s.y + 7}" stroke="#f8e890" stroke-width=".4" opacity=".3"/>
    <line x1="${s.x + 7}" y1="${s.y - 7}" x2="${s.x - 7}" y2="${s.y + 7}" stroke="#f8e890" stroke-width=".4" opacity=".3"/>
  `).join('')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;1,400&family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #080c1a; font-family: 'Cormorant Garamond', serif; }
.inv { width: 794px; height: 1123px; position: relative; overflow: hidden; background: #080c1a; }
.bg { position: absolute; inset: 0; z-index: 0; }
.content {
  position: absolute; inset: 0; z-index: 5;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  padding: 56px 88px 52px;
  text-align: center;
}
/* ── TIPOGRAFIE ── */
.moon-phase-row {
  display: flex; align-items: center; justify-content: center;
  gap: 18px; margin-bottom: 20px;
}
.moon-ph { font-size: 26px; opacity: .7; }
.pre-title {
  font-family: 'Raleway', sans-serif;
  font-size: 11px; font-weight: 400;
  letter-spacing: .38em; text-transform: uppercase;
  color: #b8a050; margin-bottom: 6px;
}
.ornament-line {
  display: flex; align-items: center; gap: 12px;
  width: 100%; margin-bottom: 24px;
}
.ornament-line-bar {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, #c8a840, transparent);
  opacity: .5;
}
.ornament-star { font-size: 16px; color: #c8a840; opacity: .7; }

.together {
  font-family: 'Raleway', sans-serif;
  font-size: 11px; font-weight: 300;
  letter-spacing: .32em; text-transform: uppercase;
  color: #8090c0; margin-bottom: 8px;
}
.names {
  font-family: 'Cormorant Garamond', serif;
  font-size: 96px; font-weight: 300; font-style: italic;
  color: #f0d060; line-height: 1;
  text-shadow: 0 0 40px rgba(240,208,96,.25), 0 2px 4px rgba(0,0,0,.8);
  display: block; margin-bottom: 4px;
  letter-spacing: .01em;
}
.amp {
  font-size: 72px; font-weight: 300; font-style: italic;
  color: #c8b878; display: inline;
  text-shadow: 0 0 20px rgba(200,184,120,.3);
}
.invite-sub {
  font-family: 'Raleway', sans-serif;
  font-size: 11px; font-weight: 300;
  letter-spacing: .28em; text-transform: uppercase;
  color: #7080b0; margin-bottom: 22px;
}

.parents-label {
  font-family: 'Raleway', sans-serif;
  font-size: 9px; font-weight: 400;
  letter-spacing: .28em; text-transform: uppercase;
  color: #b8a050; margin-bottom: 5px; opacity: .8;
}
.parents-val {
  font-size: 22px; font-style: italic;
  color: #c8d4f0; line-height: 1.6; margin-bottom: 4px;
}
.nasi-label {
  font-family: 'Raleway', sans-serif;
  font-size: 9px; font-weight: 400;
  letter-spacing: .28em; text-transform: uppercase;
  color: #b8a050; margin-bottom: 5px; margin-top: 10px; opacity: .8;
}
.nasi-val {
  font-size: 24px; font-style: italic;
  color: #c8d4f0; line-height: 1.5; margin-bottom: 18px;
}

.date-block {
  font-size: 30px; font-weight: 600;
  color: #e8d080; letter-spacing: .06em;
  text-shadow: 0 0 20px rgba(232,208,128,.2);
  margin-bottom: 16px;
}

.event-label {
  font-family: 'Raleway', sans-serif;
  font-size: 9px; font-weight: 400;
  letter-spacing: .28em; text-transform: uppercase;
  color: #b8a050; margin-bottom: 4px; opacity: .8;
}
.event-val {
  font-size: 24px; font-style: italic;
  color: #c8d4f0; line-height: 1.5; margin-bottom: 4px;
}
.event-time {
  font-family: 'Raleway', sans-serif;
  font-size: 13px; font-weight: 300;
  color: #8090b8; letter-spacing: .1em;
  margin-bottom: 14px;
}

.rsvp {
  font-size: 18px; font-style: italic;
  color: #8090b8; line-height: 1.9;
  margin-top: 8px;
}
.rsvp strong { color: #c8d4f0; font-style: normal; font-weight: 400; }

/* Sigiliu ceara */
.wax-seal {
  position: absolute; right: 68px; bottom: 72px; z-index: 6;
}
</style>
</head>
<body>
<div class="inv">

  <!-- ── FUNDAL SPATIAL ── -->
  <svg class="bg" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradient midnight blue profund -->
      <radialGradient id="deep-space" cx="50%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#0d1535"/>
        <stop offset="40%" stop-color="#080c22"/>
        <stop offset="100%" stop-color="#030508"/>
      </radialGradient>
      <!-- Gradient nebuloza albastra -->
      <radialGradient id="nebula-blue" cx="25%" cy="20%" r="60%">
        <stop offset="0%" stop-color="#1a2860" stop-opacity=".6"/>
        <stop offset="60%" stop-color="#0a1440" stop-opacity=".3"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <!-- Gradient nebuloza mov -->
      <radialGradient id="nebula-purple" cx="75%" cy="75%" r="55%">
        <stop offset="0%" stop-color="#2a1050" stop-opacity=".5"/>
        <stop offset="60%" stop-color="#180830" stop-opacity=".25"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <!-- Gradient auriu folie -->
      <linearGradient id="gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e8c840"/>
        <stop offset="25%" stop-color="#f8e870"/>
        <stop offset="50%" stop-color="#c8a020"/>
        <stop offset="75%" stop-color="#f0d050"/>
        <stop offset="100%" stop-color="#d4b030"/>
      </linearGradient>
      <!-- Gradient cupru sigiliu -->
      <radialGradient id="copper-seal" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#c87040"/>
        <stop offset="40%" stop-color="#a85020"/>
        <stop offset="100%" stop-color="#6a2c08"/>
      </radialGradient>
      <!-- Glow auriu -->
      <filter id="gold-glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="soft-glow">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="star-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <!-- Fundal profund -->
    <rect width="794" height="1123" fill="url(#deep-space)"/>
    <!-- Nebulozele -->
    <ellipse cx="200" cy="220" rx="340" ry="260" fill="url(#nebula-blue)"/>
    <ellipse cx="600" cy="860" rx="300" ry="240" fill="url(#nebula-purple)"/>
    <!-- Stea Calea Lactee estompata -->
    <path d="M0 350 Q200 300 397 320 Q594 340 794 280" stroke="#3040a0" stroke-width="80" fill="none" opacity=".06" filter="url(#soft-glow)"/>

    <!-- ── STELE ── -->
    ${starsSVG}
    <!-- Stele stralucitoare cu raze -->
    ${brightStars}

    <!-- ── CONSTELATIE: Orion (stanga sus) ── -->
    <g opacity=".55" filter="url(#star-glow)">
      <circle cx="110" cy="230" r="2.5" fill="#f0d880"/>
      <circle cx="145" cy="195" r="2" fill="#f0d880"/>
      <circle cx="160" cy="220" r="2.5" fill="#f0d880"/>
      <circle cx="125" cy="258" r="2" fill="#f0d880"/>
      <circle cx="155" cy="270" r="2" fill="#f0d880"/>
      <circle cx="100" cy="290" r="1.8" fill="#f0d880"/>
      <circle cx="170" cy="245" r="1.8" fill="#f0d880"/>
      <!-- Centura Orion -->
      <circle cx="128" cy="240" r="1.5" fill="#f8f0a0"/>
      <circle cx="140" cy="240" r="1.5" fill="#f8f0a0"/>
      <circle cx="152" cy="240" r="1.5" fill="#f8f0a0"/>
      <!-- Linii constelatie -->
      <line x1="110" y1="230" x2="145" y2="195" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
      <line x1="145" y1="195" x2="160" y2="220" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
      <line x1="110" y1="230" x2="128" y2="240" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
      <line x1="160" y1="220" x2="152" y2="240" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
      <line x1="128" y1="240" x2="100" y2="290" stroke="#c8a840" stroke-width=".7" opacity=".35"/>
      <line x1="152" y1="240" x2="170" y2="245" stroke="#c8a840" stroke-width=".7" opacity=".35"/>
      <line x1="100" y1="290" x2="125" y2="258" stroke="#c8a840" stroke-width=".7" opacity=".35"/>
      <line x1="170" y1="245" x2="155" y2="270" stroke="#c8a840" stroke-width=".7" opacity=".35"/>
    </g>

    <!-- ── CONSTELATIE: Cassiopeia (dreapta sus) ── -->
    <g opacity=".5" filter="url(#star-glow)">
      <circle cx="640" cy="170" r="2.2" fill="#f0d880"/>
      <circle cx="665" cy="148" r="2.5" fill="#f0d880"/>
      <circle cx="690" cy="162" r="2.2" fill="#f0d880"/>
      <circle cx="715" cy="145" r="2.5" fill="#f0d880"/>
      <circle cx="738" cy="160" r="2" fill="#f0d880"/>
      <line x1="640" y1="170" x2="665" y2="148" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
      <line x1="665" y1="148" x2="690" y2="162" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
      <line x1="690" y1="162" x2="715" y2="145" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
      <line x1="715" y1="145" x2="738" y2="160" stroke="#c8a840" stroke-width=".7" opacity=".4"/>
    </g>

    <!-- ── CONSTELATIE: Mica Ursa (dreapta mijloc) ── -->
    <g opacity=".45" filter="url(#star-glow)">
      <circle cx="680" cy="450" r="2" fill="#f0d880"/>
      <circle cx="710" cy="435" r="1.8" fill="#f0d880"/>
      <circle cx="730" cy="448" r="2.2" fill="#f0d880"/>
      <circle cx="750" cy="430" r="2.5" fill="#e8d070"/>
      <circle cx="760" cy="410" r="1.8" fill="#f0d880"/>
      <circle cx="745" cy="395" r="2" fill="#f0d880"/>
      <circle cx="755" cy="375" r="2.8" fill="#f8f0a0"/>
      <line x1="680" y1="450" x2="710" y2="435" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="710" y1="435" x2="730" y2="448" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="730" y1="448" x2="750" y2="430" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="750" y1="430" x2="760" y2="410" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="760" y1="410" x2="745" y2="395" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="745" y1="395" x2="755" y2="375" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
    </g>

    <!-- ── CONSTELATIE: Scorpius (stanga jos) ── -->
    <g opacity=".45" filter="url(#star-glow)">
      <circle cx="80" cy="820" r="2.5" fill="#f8a060"/>
      <circle cx="100" cy="845" r="2" fill="#f0d880"/>
      <circle cx="110" cy="868" r="2" fill="#f0d880"/>
      <circle cx="95" cy="888" r="1.8" fill="#f0d880"/>
      <circle cx="80" cy="905" r="1.8" fill="#f0d880"/>
      <circle cx="70" cy="925" r="2" fill="#f0d880"/>
      <circle cx="85" cy="942" r="2.2" fill="#f0d880"/>
      <circle cx="100" cy="955" r="1.8" fill="#f0d880"/>
      <line x1="80" y1="820" x2="100" y2="845" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="100" y1="845" x2="110" y2="868" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="110" y1="868" x2="95" y2="888" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="95" y1="888" x2="80" y2="905" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="80" y1="905" x2="70" y2="925" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="70" y1="925" x2="85" y2="942" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
      <line x1="85" y1="942" x2="100" y2="955" stroke="#c8a840" stroke-width=".6" opacity=".35"/>
    </g>

    <!-- ── FAZELE LUNII (sus centru) ── -->
    <!-- Luna noua -->
    <circle cx="260" cy="68" r="18" fill="#080c22" stroke="#c8a840" stroke-width="1" opacity=".6"/>
    <!-- Semiluna crestere -->
    <g transform="translate(310,50)">
      <circle r="18" fill="#c8a840" opacity=".15"/>
      <path d="M0,-18 A18,18 0 0,1 0,18 A10,18 0 0,0 0,-18" fill="#c8a840" opacity=".65"/>
    </g>
    <!-- Primul cartier -->
    <g transform="translate(360,50)">
      <circle r="18" fill="#080c22" stroke="#c8a840" stroke-width="1" opacity=".5"/>
      <path d="M0,-18 A18,18 0 0,1 0,18 L0,-18" fill="#c8a840" opacity=".6"/>
    </g>
    <!-- Luna plina - CENTRALA -->
    <circle cx="397" cy="50" r="22" fill="none" stroke="#c8a840" stroke-width="1.5" opacity=".7" filter="url(#gold-glow)"/>
    <circle cx="397" cy="50" r="18" fill="#c8a840" opacity=".18" filter="url(#soft-glow)"/>
    <circle cx="397" cy="50" r="14" fill="#f0d880" opacity=".3"/>
    <!-- Al treilea cartier -->
    <g transform="translate(434,50)">
      <circle r="18" fill="#080c22" stroke="#c8a840" stroke-width="1" opacity=".5"/>
      <path d="M0,-18 A18,18 0 0,0 0,18 L0,-18" fill="#c8a840" opacity=".6"/>
    </g>
    <!-- Semiluna descrescatoare -->
    <g transform="translate(484,50)">
      <circle r="18" fill="#c8a840" opacity=".15"/>
      <path d="M0,-18 A18,18 0 0,0 0,18 A10,18 0 0,1 0,-18" fill="#c8a840" opacity=".65"/>
    </g>
    <!-- Luna noua 2 -->
    <circle cx="534" cy="68" r="18" fill="#080c22" stroke="#c8a840" stroke-width="1" opacity=".6"/>

    <!-- ── CADRU CELESTIAL AURIU ── -->
    <!-- Chenar exterior -->
    <rect x="32" y="32" width="730" height="1059" fill="none" stroke="url(#gold-foil)" stroke-width="1.5" opacity=".5"/>
    <!-- Chenar interior -->
    <rect x="44" y="44" width="706" height="1035" fill="none" stroke="url(#gold-foil)" stroke-width=".6" opacity=".3"/>

    <!-- Ornamente colturi aurii -->
    <g fill="url(#gold-foil)" opacity=".7" filter="url(#gold-glow)">
      <!-- TL -->
      <path d="M32 72 L32 32 L72 32"/>
      <path d="M32 72 L32 32 L72 32" fill="none" stroke="url(#gold-foil)" stroke-width="2"/>
      <circle cx="32" cy="32" r="3" fill="#f0d060"/>
      <path d="M52 32 L60 40 L52 48 L44 40 Z" fill="#f0d060" opacity=".6"/>
      <!-- TR -->
      <path d="M722 32 L762 32 L762 72" fill="none" stroke="url(#gold-foil)" stroke-width="2"/>
      <circle cx="762" cy="32" r="3" fill="#f0d060"/>
      <path d="M742 32 L750 40 L742 48 L734 40 Z" fill="#f0d060" opacity=".6"/>
      <!-- BL -->
      <path d="M32 1051 L32 1091 L72 1091" fill="none" stroke="url(#gold-foil)" stroke-width="2"/>
      <circle cx="32" cy="1091" r="3" fill="#f0d060"/>
      <path d="M52 1091 L60 1083 L52 1075 L44 1083 Z" fill="#f0d060" opacity=".6"/>
      <!-- BR -->
      <path d="M722 1091 L762 1091 L762 1051" fill="none" stroke="url(#gold-foil)" stroke-width="2"/>
      <circle cx="762" cy="1091" r="3" fill="#f0d060"/>
      <path d="M742 1091 L750 1083 L742 1075 L734 1083 Z" fill="#f0d060" opacity=".6"/>
    </g>

    <!-- Stea de 8 colturi sus centru ornament -->
    <g transform="translate(397,100)" opacity=".65" filter="url(#gold-glow)">
      <path d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3 Z" fill="#f0d060"/>
      <path d="M0,-9 L2,-2 L9,0 L2,2 L0,9 L-2,2 L-9,0 L-2,-2 Z" fill="#f8e880" opacity=".8"/>
    </g>

    <!-- ── SIGILIU CEARA CUPRU - luna crai ── -->
    <g transform="translate(634,990)" filter="url(#soft-glow)">
      <!-- Umbra sigiliu -->
      <ellipse cx="4" cy="6" rx="46" ry="46" fill="#000" opacity=".4"/>
      <!-- Corp sigiliu ceara -->
      <circle r="44" fill="url(#copper-seal)"/>
      <!-- Reflexie -->
      <ellipse cx="-12" cy="-16" rx="18" ry="12" fill="#e08050" opacity=".25" transform="rotate(-30)"/>
      <!-- Chenar interior -->
      <circle r="36" fill="none" stroke="#c06030" stroke-width="1" opacity=".5"/>
      <!-- Luna crai in sigiliu -->
      <circle r="22" fill="none" stroke="#f0c090" stroke-width="1.5" opacity=".4"/>
      <path d="M-2,-18 A20,20 0 0,1 14,14 A14,20 0 0,0 -2,-18" fill="#f0c090" opacity=".7"/>
      <!-- Stele mici in sigiliu -->
      <circle cx="12" cy="-8" r="2" fill="#f8d880" opacity=".8"/>
      <circle cx="8" cy="14" r="1.5" fill="#f8d880" opacity=".7"/>
      <circle cx="-14" cy="4" r="1.5" fill="#f8d880" opacity=".6"/>
    </g>

    <!-- Gradient vigneta marginile inchise -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="55%" stop-color="transparent"/>
      <stop offset="100%" stop-color="#020408" stop-opacity=".75"/>
    </radialGradient>
    <rect width="794" height="1123" fill="url(#vignette)"/>

    <!-- Gradient inchis sus pt text -->
    <linearGradient id="top-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#030508" stop-opacity=".6"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
    <rect width="794" height="200" fill="url(#top-fade)"/>

    <!-- Gradient inchis jos pt text -->
    <linearGradient id="bot-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="100%" stop-color="#030508" stop-opacity=".6"/>
    </linearGradient>
    <rect y="920" width="794" height="203" fill="url(#bot-fade)"/>
  </svg>

  <!-- ── SIGILIU CEARA (element HTML) ── -->
  <div class="wax-seal">
    <svg viewBox="-50 -50 100 100" width="90" height="90">
      <defs>
        <radialGradient id="ws-copper" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#c87040"/>
          <stop offset="40%" stop-color="#a85020"/>
          <stop offset="100%" stop-color="#6a2c08"/>
        </radialGradient>
      </defs>
      <ellipse cx="3" cy="5" rx="44" ry="44" fill="#000" opacity=".35"/>
      <circle r="42" fill="url(#ws-copper)"/>
      <ellipse cx="-10" cy="-14" rx="16" ry="10" fill="#e08050" opacity=".22" transform="rotate(-30)"/>
      <circle r="34" fill="none" stroke="#c06030" stroke-width="1" opacity=".4"/>
      <circle r="20" fill="none" stroke="#f0c090" stroke-width="1.2" opacity=".35"/>
      <path d="-2,-17 A19,19 0 0,1 13,13 A13,19 0 0,0 -2,-17" fill="#f0c090" opacity=".65"/>
      <path d="M-2,-17 A19,19 0 0,1 13,13 A13,19 0 0,0 -2,-17" fill="#f0c090" opacity=".65"/>
      <circle cx="11" cy="-7" r="1.8" fill="#f8d880" opacity=".8"/>
      <circle cx="7" cy="12" r="1.4" fill="#f8d880" opacity=".7"/>
      <circle cx="-12" cy="3" r="1.4" fill="#f8d880" opacity=".6"/>
    </svg>
  </div>

  <!-- ── CONTENT TEXT ── -->
  <div class="content">

    <!-- Fazele lunii svg mic - in content -->
    <div class="moon-phase-row" style="margin-top:48px;">
      <span style="font-size:20px;opacity:.55;">🌑</span>
      <span style="font-size:18px;opacity:.5;">🌒</span>
      <span style="font-size:22px;opacity:.7;color:#f0d060;">🌕</span>
      <span style="font-size:18px;opacity:.5;">🌘</span>
      <span style="font-size:20px;opacity:.55;">🌑</span>
    </div>

    <p class="pre-title">Sub cerul înstelat, cu dragoste</p>

    <div class="ornament-line">
      <div class="ornament-line-bar"></div>
      <span class="ornament-star">✦</span>
      <div class="ornament-line-bar"></div>
    </div>

    <p class="together">Cu binecuvântarea părinților</p>
    <p class="parents-val">${fields.parentsGroom}</p>
    <p class="parents-val">${fields.parentsBride}</p>

    <div class="ornament-line" style="margin:16px 0 14px;">
      <div class="ornament-line-bar"></div>
      <span class="ornament-star" style="font-size:12px;">· · ·</span>
      <div class="ornament-line-bar"></div>
    </div>

    <span class="names">${fields.groom} <span class="amp">&amp;</span> ${fields.bride}</span>
    <p class="invite-sub">vă invită cu drag la nunta noastră</p>

    <p class="nasi-label">Nași de cununie</p>
    <p class="nasi-val">${fields.nasi}</p>

    <div class="ornament-line" style="margin:14px 0;">
      <div class="ornament-line-bar"></div>
      <span class="ornament-star">✦</span>
      <div class="ornament-line-bar"></div>
    </div>

    <p class="date-block">${formatDate(fields.weddingDate)}</p>

    <p class="event-label">Cununie Religioasă</p>
    <p class="event-val">${fields.church}</p>
    <p class="event-time">ora ${fields.churchTime}</p>

    <p class="event-label">Recepție</p>
    <p class="event-val">${fields.restaurant}</p>
    <p class="event-time">ora ${fields.restTime}</p>

    <div class="ornament-line" style="margin:14px 0 10px;">
      <div class="ornament-line-bar"></div>
      <span class="ornament-star" style="font-size:18px;">☽</span>
      <div class="ornament-line-bar"></div>
    </div>

    <p class="rsvp">
      Confirmați prezența până la <strong>${formatRsvp(fields.rsvpDate)}</strong><br/>
      Tel: <strong>${fields.rsvpTel}</strong>
    </p>

  </div>

</div>
</body>
</html>`
}