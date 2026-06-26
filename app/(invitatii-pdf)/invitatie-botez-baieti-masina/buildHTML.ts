const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function buildHTML_masinuta(fields: Record<string, string>): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nunito:wght@300;400;600;700;800;900&family=Orbitron:wght@400;700;900&family=Russo+One&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; }
.inv { width: 794px; height: 1123px; position: relative; overflow: hidden; background: #0a0a0a; }
</style>
</head>
<body>
<div class="inv">

<!-- ══ FUNDAL COMPLET SVG ══ -->
<svg style="position:absolute;inset:0;width:100%;height:100%;z-index:0;" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Gradient fundal asfalt noapte -->
  <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#080808"/>
    <stop offset="40%" stop-color="#0d0d0d"/>
    <stop offset="70%" stop-color="#111111"/>
    <stop offset="100%" stop-color="#0a0a0a"/>
  </linearGradient>
  <!-- Gradient rosu racing -->
  <linearGradient id="red-grad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#cc0000"/>
    <stop offset="50%" stop-color="#ff1a1a"/>
    <stop offset="100%" stop-color="#cc0000"/>
  </linearGradient>
  <!-- Gradient galben/auriu accent -->
  <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#c8900a"/>
    <stop offset="50%" stop-color="#ffd700"/>
    <stop offset="100%" stop-color="#c8900a"/>
  </linearGradient>
  <!-- Gradient masina rosie -->
  <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ff2222"/>
    <stop offset="40%" stop-color="#dd0000"/>
    <stop offset="100%" stop-color="#880000"/>
  </linearGradient>
  <!-- Gradient masina lateral highlight -->
  <linearGradient id="car-side" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ff4444"/>
    <stop offset="60%" stop-color="#cc0000"/>
    <stop offset="100%" stop-color="#660000"/>
  </linearGradient>
  <!-- Gradient anvelopa -->
  <radialGradient id="tire-grad" cx="35%" cy="30%" r="70%">
    <stop offset="0%" stop-color="#3a3a3a"/>
    <stop offset="100%" stop-color="#111"/>
  </radialGradient>
  <!-- Glow rosu -->
  <filter id="red-glow">
    <feGaussianBlur stdDeviation="8" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="red-glow-soft">
    <feGaussianBlur stdDeviation="20" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="gold-glow">
    <feGaussianBlur stdDeviation="6" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="text-glow">
    <feGaussianBlur stdDeviation="4" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="shadow-drop">
    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#ff0000" flood-opacity=".4"/>
  </filter>
  <filter id="blur-soft"><feGaussianBlur stdDeviation="12"/></filter>
  <filter id="blur-heavy"><feGaussianBlur stdDeviation="25"/></filter>
  <!-- Gradient checkered flag top -->
  <pattern id="checker" width="20" height="20" patternUnits="userSpaceOnUse">
    <rect width="20" height="20" fill="white"/>
    <rect width="10" height="10" fill="black"/>
    <rect x="10" y="10" width="10" height="10" fill="black"/>
  </pattern>
  <!-- Gradient pista asfalt -->
  <linearGradient id="track-grad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#1a1a1a"/>
    <stop offset="50%" stop-color="#222222"/>
    <stop offset="100%" stop-color="#1a1a1a"/>
  </linearGradient>
  <!-- Gradient viteza (motion blur linii) -->
  <linearGradient id="speed-grad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#ff1a1a" stop-opacity="0"/>
    <stop offset="50%" stop-color="#ff1a1a" stop-opacity=".6"/>
    <stop offset="100%" stop-color="#ff1a1a" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="speed-white" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="white" stop-opacity="0"/>
    <stop offset="50%" stop-color="white" stop-opacity=".3"/>
    <stop offset="100%" stop-color="white" stop-opacity="0"/>
  </linearGradient>
</defs>

<!-- Fundal negru -->
<rect width="794" height="1123" fill="url(#bg-grad)"/>

<!-- ── GLOW AMBIENTAL ── -->
<ellipse cx="397" cy="750" rx="500" ry="200" fill="#cc0000" opacity=".08" filter="url(#blur-heavy)"/>
<ellipse cx="100" cy="800" rx="200" ry="150" fill="#ff2200" opacity=".06" filter="url(#blur-heavy)"/>
<ellipse cx="700" cy="700" rx="180" ry="130" fill="#ff0000" opacity=".07" filter="url(#blur-heavy)"/>

<!-- ══ PISTA DE CURSE DIAGONALA (traverseaza toata pagina) ══ -->
<!-- Pista principala - banda diagonala de asfalt -->
<path d="M-50 550 L844 350 L844 480 L-50 680 Z" fill="url(#track-grad)" opacity=".9"/>
<!-- Linii margine pista albe -->
<path d="M-50 550 L844 350" stroke="white" stroke-width="3" opacity=".6"/>
<path d="M-50 680 L844 480" stroke="white" stroke-width="3" opacity=".6"/>
<!-- Linie dubla galbena centru pista -->
<path d="M-50 610 L844 410" stroke="#ffd700" stroke-width="2" opacity=".5"/>
<path d="M-50 620 L844 420" stroke="#ffd700" stroke-width="2" opacity=".5"/>
<!-- Linie punctata alba centru pista -->
<path d="M-50 615 L844 415" stroke="white" stroke-width="1.5" stroke-dasharray="30,20" opacity=".4"/>
<!-- Textura asfalt -->
<path d="M-50 558 L844 358" stroke="#2a2a2a" stroke-width="1" opacity=".5"/>
<path d="M-50 568 L844 368" stroke="#252525" stroke-width="1" opacity=".4"/>
<path d="M-50 578 L844 378" stroke="#222" stroke-width="1" opacity=".35"/>
<path d="M-50 670 L844 470" stroke="#252525" stroke-width="1" opacity=".4"/>
<path d="M-50 660 L844 460" stroke="#2a2a2a" stroke-width="1" opacity=".35"/>

<!-- ── STEGULET CHECKERED sus ── -->
<rect x="0" y="0" width="794" height="80" fill="url(#checker)" opacity=".85"/>
<!-- Gradient peste checker pentru fade-out -->
<rect x="0" y="0" width="794" height="80" fill="url(#checker-fade)"/>
<defs>
  <linearGradient id="checker-fade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="transparent"/>
    <stop offset="100%" stop-color="#0a0a0a"/>
  </linearGradient>
</defs>
<!-- Linie rosie sub checker -->
<rect x="0" y="76" width="794" height="6" fill="url(#red-grad)" filter="url(#red-glow)"/>

<!-- ══ LINII DE VITEZA (motion blur effect) ══ -->
<!-- Sus stanga -->
<rect x="-100" y="120" width="500" height="3" rx="1.5" fill="url(#speed-grad)" transform="rotate(-8 200 120)" opacity=".7"/>
<rect x="-100" y="135" width="400" height="2" rx="1" fill="url(#speed-grad)" transform="rotate(-8 150 135)" opacity=".5"/>
<rect x="-100" y="148" width="550" height="1.5" rx=".75" fill="url(#speed-white)" transform="rotate(-8 220 148)" opacity=".4"/>
<rect x="-100" y="160" width="380" height="2" rx="1" fill="url(#speed-grad)" transform="rotate(-8 140 160)" opacity=".45"/>
<rect x="-100" y="175" width="480" height="1" rx=".5" fill="url(#speed-grad)" transform="rotate(-8 190 175)" opacity=".35"/>

<!-- Jos dreapta -->
<rect x="400" y="900" width="500" height="3" rx="1.5" fill="url(#speed-grad)" transform="rotate(-8 650 900)" opacity=".6"/>
<rect x="350" y="915" width="550" height="2" rx="1" fill="url(#speed-grad)" transform="rotate(-8 620 915)" opacity=".45"/>
<rect x="420" y="930" width="420" height="1.5" rx=".75" fill="url(#speed-white)" transform="rotate(-8 630 930)" opacity=".35"/>
<rect x="380" y="945" width="480" height="1" rx=".5" fill="url(#speed-grad)" transform="rotate(-8 620 945)" opacity=".3"/>

<!-- ══ MASINA F1 LATERALA (pe pista) ══ -->
<g transform="translate(397, 620) scale(1.4)">
  <!-- Umbra masina -->
  <ellipse cx="0" cy="62" rx="160" ry="14" fill="#000" opacity=".5" filter="url(#blur-soft)"/>
  <!-- Glow rosu sub masina -->
  <ellipse cx="0" cy="58" rx="120" ry="10" fill="#ff0000" opacity=".25" filter="url(#blur-soft)"/>

  <!-- ── CORP MASINA ── -->
  <!-- Ponton stanga -->
  <path d="M-145 10 L-80 8 L-80 35 L-145 38 Z" fill="url(#car-side)"/>
  <path d="M-145 10 L-80 8 L-80 35 L-145 38 Z" fill="#ff3333" opacity=".3"/>
  <!-- Ponton dreapta -->
  <path d="M80 8 L145 10 L145 38 L80 35 Z" fill="url(#car-side)"/>
  <path d="M80 8 L145 10 L145 38 L80 35 Z" fill="#ff3333" opacity=".3"/>

  <!-- Corp principal jos -->
  <path d="M-80 30 L80 30 L85 55 L-85 55 Z" fill="url(#car-body)"/>
  <!-- Corp principal sus/cockpit -->
  <path d="M-60 8 Q0,-30 60,8 L80 30 L-80 30 Z" fill="url(#car-body)"/>
  <!-- Highlight sus -->
  <path d="M-40 8 Q0,-22 40,8 L50 20 L-50 20 Z" fill="#ff5555" opacity=".4"/>

  <!-- Cockpit -->
  <path d="M-25 8 Q0,-18 25,8 Z" fill="#1a1a2a"/>
  <path d="M-22 7 Q0,-15 22,7" stroke="#333355" stroke-width="1.5" fill="none"/>
  <!-- Viziera pilot -->
  <path d="M-18 6 Q0,-12 18,6 L12 8 Q0,-6 -12,8 Z" fill="#2244aa" opacity=".8"/>
  <path d="M-14 5 Q0,-9 14,5" stroke="#5577ff" stroke-width="1" fill="none" opacity=".6"/>

  <!-- Aripioare fata -->
  <path d="M-170 35 L-85 32 L-85 42 L-170 50 Z" fill="#cc0000"/>
  <path d="M-170 35 L-85 32 L-85 36 L-170 38 Z" fill="#ff4444" opacity=".5"/>
  <!-- Element DRS fata -->
  <path d="M-170 36 L-170 50 L-180 50 L-180 36 Z" fill="#dd0000"/>
  <rect x="-172" y="30" width="4" height="22" fill="#aa0000"/>
  <!-- Aripioare spate -->
  <path d="M85 32 L170 35 L170 50 L85 42 Z" fill="#cc0000"/>
  <path d="M85 32 L170 35 L170 38 L85 36 Z" fill="#ff4444" opacity=".5"/>
  <!-- DRS spate -->
  <path d="M170 36 L180 36 L180 50 L170 50 Z" fill="#dd0000"/>
  <rect x="168" y="28" width="4" height="26" fill="#aa0000"/>
  <!-- Aripioare mari spate (rear wing) -->
  <rect x="140" y="18" width="42" height="7" rx="2" fill="#cc0000"/>
  <rect x="140" y="22" width="42" height="2" rx="1" fill="#ff3333" opacity=".6"/>
  <!-- Aripioare mari fata (front wing) -->
  <rect x="-182" y="44" width="42" height="6" rx="2" fill="#cc0000"/>

  <!-- Numarul masinii pe ponton -->
  <text x="-112" y="28" text-anchor="middle" font-family="Orbitron, monospace" font-size="16" font-weight="900" fill="white" opacity=".9">1</text>
  <text x="112" y="28" text-anchor="middle" font-family="Orbitron, monospace" font-size="16" font-weight="900" fill="white" opacity=".9">1</text>

  <!-- Logouri mici decorative -->
  <rect x="-35" y="38" width="70" height="10" rx="2" fill="#ffd700" opacity=".8"/>
  <text x="0" y="47" text-anchor="middle" font-family="Orbitron,monospace" font-size="7" font-weight="700" fill="#000">GRAND PRIX</text>

  <!-- ── ANVELOPE ── -->
  <!-- Roata fata stanga -->
  <g transform="translate(-130, 52)">
    <circle r="26" fill="url(#tire-grad)"/>
    <circle r="26" fill="none" stroke="#333" stroke-width="4"/>
    <circle r="18" fill="#222"/>
    <circle r="12" fill="#1a1a1a"/>
    <!-- Janta -->
    <circle r="10" fill="none" stroke="#888" stroke-width="2"/>
    <circle r="6" fill="#777"/>
    <line x1="0" y1="-10" x2="0" y2="10" stroke="#888" stroke-width="1.5"/>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="#888" stroke-width="1.5"/>
    <line x1="-7" y1="-7" x2="7" y2="7" stroke="#777" stroke-width="1"/>
    <line x1="7" y1="-7" x2="-7" y2="7" stroke="#777" stroke-width="1"/>
    <!-- Contur cauciuc -->
    <circle r="25" fill="none" stroke="#444" stroke-width="1"/>
  </g>
  <!-- Roata spate stanga -->
  <g transform="translate(-60, 52)">
    <circle r="26" fill="url(#tire-grad)"/>
    <circle r="26" fill="none" stroke="#333" stroke-width="4"/>
    <circle r="18" fill="#222"/>
    <circle r="10" fill="none" stroke="#888" stroke-width="2"/>
    <circle r="6" fill="#777"/>
    <line x1="0" y1="-10" x2="0" y2="10" stroke="#888" stroke-width="1.5"/>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="#888" stroke-width="1.5"/>
    <line x1="-7" y1="-7" x2="7" y2="7" stroke="#777" stroke-width="1"/>
    <line x1="7" y1="-7" x2="-7" y2="7" stroke="#777" stroke-width="1"/>
    <circle r="25" fill="none" stroke="#444" stroke-width="1"/>
  </g>
  <!-- Roata fata dreapta -->
  <g transform="translate(130, 52)">
    <circle r="26" fill="url(#tire-grad)"/>
    <circle r="26" fill="none" stroke="#333" stroke-width="4"/>
    <circle r="18" fill="#222"/>
    <circle r="10" fill="none" stroke="#888" stroke-width="2"/>
    <circle r="6" fill="#777"/>
    <line x1="0" y1="-10" x2="0" y2="10" stroke="#888" stroke-width="1.5"/>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="#888" stroke-width="1.5"/>
    <line x1="-7" y1="-7" x2="7" y2="7" stroke="#777" stroke-width="1"/>
    <line x1="7" y1="-7" x2="-7" y2="7" stroke="#777" stroke-width="1"/>
    <circle r="25" fill="none" stroke="#444" stroke-width="1"/>
  </g>
  <!-- Roata spate dreapta -->
  <g transform="translate(60, 52)">
    <circle r="26" fill="url(#tire-grad)"/>
    <circle r="26" fill="none" stroke="#333" stroke-width="4"/>
    <circle r="18" fill="#222"/>
    <circle r="10" fill="none" stroke="#888" stroke-width="2"/>
    <circle r="6" fill="#777"/>
    <line x1="0" y1="-10" x2="0" y2="10" stroke="#888" stroke-width="1.5"/>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="#888" stroke-width="1.5"/>
    <line x1="-7" y1="-7" x2="7" y2="7" stroke="#777" stroke-width="1"/>
    <line x1="7" y1="-7" x2="-7" y2="7" stroke="#777" stroke-width="1"/>
    <circle r="25" fill="none" stroke="#444" stroke-width="1"/>
  </g>

  <!-- Glow rosu din esapament -->
  <ellipse cx="160" cy="40" rx="25" ry="8" fill="#ff4400" opacity=".6" filter="url(#red-glow-soft)"/>
  <ellipse cx="170" cy="40" rx="10" ry="5" fill="#ffaa00" opacity=".4"/>
</g>

<!-- ══ TROFEUL (dreapta sus) ══ -->
<g transform="translate(660, 200)">
  <!-- Glow auriu in spate -->
  <ellipse cx="0" cy="0" rx="60" ry="80" fill="#ffd700" opacity=".1" filter="url(#blur-soft)"/>
  <!-- Corp trofeu -->
  <path d="M-8 80 L8 80 L12 100 L-12 100 Z" fill="#c8900a"/>
  <rect x="-18" y="96" width="36" height="8" rx="2" fill="#b8800a"/>
  <rect x="-22" y="104" width="44" height="6" rx="3" fill="#c8900a"/>
  <!-- Cupa trofeu -->
  <path d="M-24 -20 Q-28 10 -20 40 Q-10 65 0 70 Q10 65 20 40 Q28 10 24 -20 Z" fill="url(#gold-grad)"/>
  <!-- Highlight cupa -->
  <path d="M-18 -15 Q-20 10 -14 38 Q-8 60 0 65" stroke="#ffe566" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>
  <!-- Manerele trofeu -->
  <path d="M-24 5 Q-45 0 -42 25 Q-40 40 -24 35" fill="none" stroke="url(#gold-grad)" stroke-width="6" stroke-linecap="round"/>
  <path d="M24 5 Q45 0 42 25 Q40 40 24 35" fill="none" stroke="url(#gold-grad)" stroke-width="6" stroke-linecap="round"/>
  <!-- Stea pe trofeu -->
  <text x="0" y="28" text-anchor="middle" font-size="22" fill="#fff8d0" opacity=".9" filter="url(#gold-glow)">★</text>
  <!-- Varf trofeu -->
  <polygon points="0,-48 8,-28 28,-28 14,-14 20,8 0,-6 -20,8 -14,-14 -28,-28 -8,-28" fill="#ffd700" filter="url(#gold-glow)" opacity=".95"/>
  <polygon points="0,-44 6,-28 22,-28 10,-14 16,4 0,-8 -16,4 -10,-14 -22,-28 -6,-28" fill="#ffe566" opacity=".6"/>
  <!-- Numarul 1 pe trofeu -->
  <text x="0" y="55" text-anchor="middle" font-family="Orbitron,monospace" font-size="18" font-weight="900" fill="#0a0a0a" opacity=".7">#1</text>
</g>

<!-- ══ DECORATII STEGULETE ══ -->
<!-- Triunghi decorativ stanga jos -->
<polygon points="0,800 0,1123 250,1123" fill="#cc0000" opacity=".15"/>
<polygon points="0,900 0,1123 150,1123" fill="#ff2222" opacity=".1"/>
<!-- Triunghi decorativ dreapta sus -->
<polygon points="794,0 794,300 544,0" fill="#cc0000" opacity=".12"/>
<polygon points="794,0 794,200 644,0" fill="#ff2222" opacity=".08"/>

<!-- Linie rosie accent verticala stanga -->
<rect x="0" y="80" width="5" height="1043" fill="url(#red-grad)" opacity=".7"/>
<rect x="0" y="80" width="5" height="1043" fill="url(#red-grad)" filter="url(#red-glow)" opacity=".4"/>
<!-- Linie rosie accent verticala dreapta -->
<rect x="789" y="80" width="5" height="1043" fill="url(#red-grad)" opacity=".7"/>
<rect x="789" y="80" width="5" height="1043" fill="url(#red-grad)" filter="url(#red-glow)" opacity=".4"/>

<!-- Linie galbena subtire stanga (interna) -->
<rect x="20" y="80" width="2" height="1043" fill="#ffd700" opacity=".25"/>
<!-- Linie galbena subtire dreapta (interna) -->
<rect x="772" y="80" width="2" height="1043" fill="#ffd700" opacity=".25"/>

<!-- ══ CONFETTI / JETOANE DECORATIVE ══ -->
<circle cx="55" cy="180" r="6" fill="#ffd700" opacity=".6"/>
<circle cx="78" cy="220" r="4" fill="#ff2222" opacity=".5"/>
<circle cx="40" cy="250" r="5" fill="white" opacity=".3"/>
<circle cx="730" cy="160" r="5" fill="#ffd700" opacity=".55"/>
<circle cx="755" cy="195" r="4" fill="#ff2222" opacity=".5"/>
<circle cx="742" cy="230" r="6" fill="white" opacity=".25"/>

<!-- Steluțe decorative -->
<text x="48" y="310" font-size="18" fill="#ffd700" opacity=".4" filter="url(#gold-glow)">★</text>
<text x="730" y="290" font-size="14" fill="#ff2222" opacity=".45" filter="url(#red-glow)">★</text>
<text x="62" y="870" font-size="12" fill="#ffd700" opacity=".3">★</text>
<text x="718" y="850" font-size="16" fill="#ff2222" opacity=".35">★</text>

<!-- ══ BANNER JOS - FUNDAL TEXT ══ -->
<!-- Panel negru mat jos pentru text lizibil -->
<rect x="30" y="750" width="734" height="355" rx="8" fill="#0d0d0d" opacity=".95"/>
<rect x="30" y="750" width="734" height="4" fill="url(#red-grad)" opacity=".9"/>
<rect x="30" y="1101" width="734" height="4" fill="url(#red-grad)" opacity=".7"/>
<!-- Linii decorative interior panel -->
<rect x="42" y="762" width="710" height="1" fill="#ff2222" opacity=".15"/>
<rect x="42" y="1094" width="710" height="1" fill="#ff2222" opacity=".15"/>

</svg>

<!-- ══ CONTENT TEXT ══ -->
<div style="position:absolute;inset:0;z-index:6;display:flex;flex-direction:column;align-items:center;padding:0;text-align:center;">

  <!-- ZONA SUS - TITLU -->
  <div style="padding:94px 60px 0;width:100%;">
    <p style="font-family:'Orbitron',monospace;font-size:11px;font-weight:400;letter-spacing:.5em;text-transform:uppercase;color:#ffd700;margin-bottom:6px;opacity:.8;">⚑ OFFICIAL ANNOUNCEMENT ⚑</p>
    <div style="width:100%;height:2px;background:linear-gradient(90deg,transparent,#ff1a1a,transparent);margin-bottom:14px;"></div>
    <p style="font-family:'Russo One',sans-serif;font-size:22px;letter-spacing:.22em;text-transform:uppercase;color:white;margin-bottom:4px;opacity:.7;">PILOT ÎN DEVENIRE</p>
  </div>

  <!-- SPACER pentru masina -->
  <div style="flex:1;"></div>

  <!-- ZONA JOS - INFO PANEL -->
  <div style="width:100%;padding:0 60px 30px;">

    <!-- BABY NAME - mare si impactant -->
    <div style="margin-bottom:10px;position:relative;">
      <p style="font-family:'Orbitron',monospace;font-size:13px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#ff2222;margin-bottom:2px;">BOTEZ</p>
      <p style="font-family:'Russo One',sans-serif;font-size:96px;color:white;line-height:.9;text-shadow:0 0 30px rgba(255,30,30,.5),0 0 60px rgba(255,0,0,.2),3px 3px 0 #880000;letter-spacing:.02em;margin-bottom:4px;">${fields.babyName || 'LUCA'}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:8px;">
        <div style="flex:1;height:2px;background:linear-gradient(90deg,transparent,#ff1a1a);"></div>
        <span style="font-family:'Orbitron',monospace;font-size:18px;color:#ffd700;text-shadow:0 0 10px #ffd700;">★</span>
        <div style="flex:1;height:2px;background:linear-gradient(90deg,#ff1a1a,transparent);"></div>
      </div>
      <p style="font-family:'Nunito',sans-serif;font-size:20px;font-weight:300;font-style:italic;color:rgba(255,255,255,.6);letter-spacing:.08em;">a coborât în circuit!</p>
    </div>

    <!-- GRID INFO 2 coloane -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin:14px 0;">
      <!-- Coloana stanga -->
      <div style="border-right:1px solid rgba(255,30,30,.3);padding-right:20px;text-align:right;">
        <p style="font-family:'Orbitron',monospace;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#ff2222;margin-bottom:4px;opacity:.8;">ECHIPA</p>
        <p style="font-family:'Nunito',sans-serif;font-size:22px;font-weight:700;color:white;line-height:1.3;margin-bottom:14px;">${fields.parents}</p>
        <p style="font-family:'Orbitron',monospace;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#ff2222;margin-bottom:4px;opacity:.8;">SPONSORI</p>
        <p style="font-family:'Nunito',sans-serif;font-size:22px;font-weight:700;color:white;line-height:1.3;">${fields.godparents}</p>
      </div>
      <!-- Coloana dreapta -->
      <div style="padding-left:20px;text-align:left;">
        <p style="font-family:'Orbitron',monospace;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#ffd700;margin-bottom:4px;opacity:.8;">🕊 CIRCUIT #1</p>
        <p style="font-family:'Nunito',sans-serif;font-size:20px;font-weight:700;color:white;line-height:1.2;margin-bottom:2px;">${fields.church}</p>
        <p style="font-family:'Nunito',sans-serif;font-size:18px;font-weight:300;color:rgba(255,255,255,.6);margin-bottom:12px;">${formatDate(fields.churchDate)}<br/>Ora ${fields.churchTime}</p>
        <p style="font-family:'Orbitron',monospace;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#ffd700;margin-bottom:4px;opacity:.8;">🏆 CIRCUIT #2</p>
        <p style="font-family:'Nunito',sans-serif;font-size:20px;font-weight:700;color:white;line-height:1.2;margin-bottom:2px;">${fields.restaurant}</p>
        <p style="font-family:'Nunito',sans-serif;font-size:18px;font-weight:300;color:rgba(255,255,255,.6);">${formatDate(fields.restaurantDate)}<br/>Ora ${fields.restaurantTime}</p>
      </div>
    </div>

    <!-- DIVIDER -->
    <div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#ff1a1a 30%,#ffd700 50%,#ff1a1a 70%,transparent);margin:12px 0;opacity:.6;"></div>

    <!-- CONTACT -->
    <p style="font-family:'Orbitron',monospace;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#ff2222;margin-bottom:4px;opacity:.8;">🏁 BOX RADIO — RSVP</p>
    <p style="font-family:'Nunito',sans-serif;font-size:26px;font-weight:900;color:white;letter-spacing:.06em;">${fields.contact}</p>

  </div>
</div>

</div>
</body>
</html>`
}