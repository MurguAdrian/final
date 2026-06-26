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

export function buildHTML_astronaut(fields: Record<string, string>): string {
  // Stele pseudo-random deterministice
  const stars = Array.from({ length: 180 }, (_, i) => ({
    x: ((i * 137.5 + 31) % 794).toFixed(1),
    y: ((i * 89.3 + 17) % 680).toFixed(1), // doar in jumatatea de sus
    r: i % 9 === 0 ? 2.2 : i % 4 === 0 ? 1.4 : 0.7,
    op: (0.4 + (i % 8) * 0.07).toFixed(2),
  }))

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&family=Fredoka+One&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #0a1628; }
.inv { width: 794px; height: 1123px; position: relative; overflow: hidden; }

.content {
  position: absolute; inset: 0; z-index: 6;
  display: flex; flex-direction: column;
  align-items: center;
  padding: 52px 70px 48px;
  text-align: center;
}

/* ── TIPOGRAFIE ── */
.baby-name {
  font-family: 'Fredoka One', cursive;
  font-size: 96px; color: #fff;
  line-height: 1; display: block;
  text-shadow: 0 4px 20px rgba(100,180,255,.4), 0 0 40px rgba(100,180,255,.2);
  letter-spacing: .02em;
  margin-bottom: 6px;
}
.announce {
  font-family: 'Nunito', sans-serif;
  font-size: 22px; font-weight: 300;
  color: #b8d8f8; font-style: italic;
  letter-spacing: .06em; margin-bottom: 24px;
}
.section-label {
  font-family: 'Quicksand', sans-serif;
  font-size: 12px; font-weight: 700;
  letter-spacing: .26em; text-transform: uppercase;
  color: #60b0f0; margin-bottom: 5px;
}
.section-val {
  font-family: 'Nunito', sans-serif;
  font-size: 28px; font-weight: 600;
  color: #ffffff; line-height: 1.4;
  margin-bottom: 14px;
}
.section-val.lg {
  font-size: 32px; font-weight: 700;
  color: #fff;
}
.event-name {
  font-family: 'Fredoka One', cursive;
  font-size: 30px; color: #80c8ff;
  margin-bottom: 3px; letter-spacing: .02em;
}
.event-detail {
  font-family: 'Nunito', sans-serif;
  font-size: 22px; font-weight: 400;
  color: #c0dff8; line-height: 1.6;
}
.rsvp {
  font-family: 'Nunito', sans-serif;
  font-size: 22px; font-weight: 400;
  color: #90c8f8; line-height: 1.8;
  margin-top: 10px;
}
.rsvp strong { color: #fff; font-weight: 700; }

.sep {
  width: 60px; height: 3px;
  background: linear-gradient(90deg, #4090e0, #80c8ff, #4090e0);
  border-radius: 2px; margin: 14px auto;
}
.star-sep {
  font-size: 22px; color: #60b0f0;
  letter-spacing: 12px; margin: 10px 0;
  opacity: .7;
}
</style>
</head>
<body>
<div class="inv">

<!-- ══ FUNDAL SPATIAL ══ -->
<svg style="position:absolute;inset:0;width:100%;height:100%;z-index:0;" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Gradient cer spatial - albastru profund spre cyan jos -->
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#04090f"/>
    <stop offset="25%" stop-color="#060d1f"/>
    <stop offset="55%" stop-color="#0a1e42"/>
    <stop offset="75%" stop-color="#0d2a5a"/>
    <stop offset="100%" stop-color="#1a4a8a"/>
  </linearGradient>
  <!-- Gradient nor albastru deschis jos -->
  <linearGradient id="cloud-grad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#3a8ae0" stop-opacity=".0"/>
    <stop offset="50%" stop-color="#5aaaf8" stop-opacity=".55"/>
    <stop offset="100%" stop-color="#7dc8ff" stop-opacity=".85"/>
  </linearGradient>
  <!-- Luna gradient -->
  <radialGradient id="moon-grad" cx="35%" cy="30%" r="70%">
    <stop offset="0%" stop-color="#fffae0"/>
    <stop offset="50%" stop-color="#f0e090"/>
    <stop offset="100%" stop-color="#d0c060"/>
  </radialGradient>
  <!-- Planeta rosie -->
  <radialGradient id="planet-red" cx="35%" cy="30%" r="70%">
    <stop offset="0%" stop-color="#ff9060"/>
    <stop offset="50%" stop-color="#e05030"/>
    <stop offset="100%" stop-color="#a02010"/>
  </radialGradient>
  <!-- Planeta verde -->
  <radialGradient id="planet-teal" cx="35%" cy="30%" r="70%">
    <stop offset="0%" stop-color="#60f0d0"/>
    <stop offset="50%" stop-color="#20c0a0"/>
    <stop offset="100%" stop-color="#008060"/>
  </radialGradient>
  <!-- Racheta gradient -->
  <linearGradient id="rocket-body" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#c0d8f8"/>
    <stop offset="50%" stop-color="#e8f4ff"/>
    <stop offset="100%" stop-color="#a0c0e8"/>
  </linearGradient>
  <!-- Flacare racheta -->
  <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fff0a0"/>
    <stop offset="40%" stop-color="#ff8000"/>
    <stop offset="100%" stop-color="#ff4000" stop-opacity="0"/>
  </linearGradient>
  <!-- Glow stele -->
  <filter id="star-glow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="glow-soft"><feGaussianBlur stdDeviation="12"/></filter>
  <!-- Halou luna -->
  <filter id="moon-halo"><feGaussianBlur stdDeviation="18"/></filter>
  <!-- Umbra racheta -->
  <filter id="rocket-shadow"><feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#0a1628" flood-opacity=".5"/></filter>
  <!-- Astronaut glow -->
  <filter id="astro-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <!-- Curcubeu nor -->
  <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#ff6060"/>
    <stop offset="25%" stop-color="#ffc040"/>
    <stop offset="50%" stop-color="#60e060"/>
    <stop offset="75%" stop-color="#40a0ff"/>
    <stop offset="100%" stop-color="#c060ff"/>
  </linearGradient>
  <!-- Gradient sector jos (biela) -->
  <linearGradient id="bottom-section" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#e8f4ff"/>
    <stop offset="100%" stop-color="#d0e8ff"/>
  </linearGradient>
</defs>

<!-- Fundal spatial -->
<rect width="794" height="1123" fill="url(#sky)"/>

<!-- Nebuloza subtila -->
<ellipse cx="200" cy="200" rx="300" ry="200" fill="#1840a0" opacity=".12" filter="url(#glow-soft)"/>
<ellipse cx="600" cy="350" rx="250" ry="180" fill="#104080" opacity=".1" filter="url(#glow-soft)"/>
<ellipse cx="400" cy="500" rx="350" ry="150" fill="#0d3060" opacity=".08" filter="url(#glow-soft)"/>

<!-- ── STELE ── -->
${stars.map(s => `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="white" opacity="${s.op}"/>`).join('')}
<!-- Stele stralucitoare -->
<circle cx="180" cy="60" r="3" fill="#fff" opacity=".95" filter="url(#star-glow)"/>
<line x1="173" y1="60" x2="187" y2="60" stroke="#fff" stroke-width=".8" opacity=".5"/>
<line x1="180" y1="53" x2="180" y2="67" stroke="#fff" stroke-width=".8" opacity=".5"/>
<circle cx="640" cy="120" r="2.5" fill="#fff" opacity=".9" filter="url(#star-glow)"/>
<line x1="634" y1="120" x2="646" y2="120" stroke="#fff" stroke-width=".6" opacity=".45"/>
<line x1="640" y1="114" x2="640" y2="126" stroke="#fff" stroke-width=".6" opacity=".45"/>
<circle cx="720" cy="280" r="2" fill="#e0f0ff" opacity=".8"/>
<circle cx="90" cy="320" r="2.5" fill="#fff" opacity=".75"/>
<circle cx="50" cy="180" r="2" fill="#fff" opacity=".85"/>
<circle cx="750" cy="180" r="1.8" fill="#fff" opacity=".8"/>

<!-- ── LUNA (sus, usor dreapta) ── -->
<!-- Halo luna -->
<circle cx="590" cy="118" r="90" fill="#f8e860" opacity=".06" filter="url(#moon-halo)"/>
<circle cx="590" cy="118" r="65" fill="#f8e860" opacity=".08" filter="url(#moon-halo)"/>
<!-- Luna -->
<circle cx="590" cy="118" r="58" fill="url(#moon-grad)"/>
<!-- Crateri luna -->
<circle cx="572" cy="95" r="10" fill="#c8b040" opacity=".5"/>
<circle cx="610" cy="108" r="7" fill="#c0a830" opacity=".45"/>
<circle cx="580" cy="132" r="8" fill="#c8b040" opacity=".4"/>
<circle cx="600" cy="85" r="5" fill="#d0bc50" opacity=".4"/>
<circle cx="560" cy="118" r="6" fill="#c8b040" opacity=".45"/>
<!-- Highlight luna -->
<ellipse cx="576" cy="100" rx="20" ry="14" fill="#fffde0" opacity=".22" transform="rotate(-20 576 100)"/>
<!-- Umbra luna (side) -->
<path d="M590 60 A58,58 0 0,0 590 176 A40,58 0 0,1 590 60" fill="#8a6808" opacity=".2"/>

<!-- ── INELE PLANETA (dreapta jos vizibil) ── -->
<!-- Planeta rosie cu inele - dreapta sus -->
<g transform="translate(700, 380)">
  <!-- Inele -->
  <ellipse cx="0" cy="8" rx="60" ry="14" fill="none" stroke="#e07040" stroke-width="5" opacity=".4"/>
  <ellipse cx="0" cy="8" rx="60" ry="14" fill="none" stroke="#f09060" stroke-width="2" opacity=".5"/>
  <!-- Planet body -->
  <circle cx="0" cy="0" r="35" fill="url(#planet-red)"/>
  <!-- Stripes -->
  <ellipse cx="0" cy="-8" rx="35" ry="6" fill="#c04020" opacity=".3"/>
  <ellipse cx="0" cy="8" rx="35" ry="5" fill="#c04020" opacity=".25"/>
  <!-- Highlight -->
  <ellipse cx="-10" cy="-12" rx="14" ry="9" fill="#ffb090" opacity=".25" transform="rotate(-20 -10 -12)"/>
  <!-- Inele in fata -->
  <path d="M-60 8 A60,14 0 0,0 0 22 A60,14 0 0,0 60 8" fill="none" stroke="#e07040" stroke-width="5" opacity=".55"/>
  <path d="M-60 8 A60,14 0 0,0 0 22 A60,14 0 0,0 60 8" fill="none" stroke="#f09060" stroke-width="2" opacity=".6"/>
</g>

<!-- Planeta mica teal - stanga -->
<g transform="translate(80, 480)">
  <circle cx="0" cy="0" r="28" fill="url(#planet-teal)"/>
  <ellipse cx="0" cy="-5" rx="28" ry="5" fill="#008060" opacity=".3"/>
  <ellipse cx="-8" cy="-8" rx="10" ry="7" fill="#a0ffe0" opacity=".2" transform="rotate(-15 -8 -8)"/>
</g>

<!-- ── ASTEROIZI MICI ── -->
<g opacity=".6">
  <ellipse cx="160" cy="200" rx="8" ry="5" fill="#8090a8" transform="rotate(25 160 200)"/>
  <ellipse cx="680" cy="240" rx="6" ry="4" fill="#7080a0" transform="rotate(-15 680 240)"/>
  <ellipse cx="740" cy="460" rx="5" ry="3" fill="#8090a8" transform="rotate(40 740 460)"/>
  <ellipse cx="55" cy="420" rx="7" ry="4" fill="#7888a0" transform="rotate(-30 55 420)"/>
</g>

<!-- ── RACHETA PRINCIPALA (stanga, lansata oblic) ── -->
<g transform="translate(160, 360) rotate(-30)" filter="url(#rocket-shadow)">
  <!-- Flacara -->
  <ellipse cx="0" cy="95" rx="18" ry="45" fill="url(#flame)" opacity=".9"/>
  <ellipse cx="-8" cy="105" rx="10" ry="28" fill="#fff0a0" opacity=".6"/>
  <ellipse cx="8" cy="100" rx="8" ry="22" fill="#ffcc40" opacity=".5"/>
  <!-- Corp racheta -->
  <path d="M-22 80 L-22 0 Q-22,-20 0,-38 Q22,-20 22,0 L22 80 Z" fill="url(#rocket-body)"/>
  <!-- Fereastra racheta -->
  <circle cx="0" cy="20" r="12" fill="#a0d8ff" stroke="#80b8e0" stroke-width="2"/>
  <circle cx="0" cy="20" r="9" fill="#c8eaff"/>
  <circle cx="-3" cy="17" r="3" fill="#fff" opacity=".6"/>
  <!-- Detalii corp -->
  <rect x="-22" y="40" width="44" height="4" fill="#80b0d8" opacity=".5"/>
  <rect x="-22" y="55" width="44" height="4" fill="#80b0d8" opacity=".4"/>
  <!-- Aripioare -->
  <path d="M-22 80 L-42 105 L-22 95 Z" fill="#c0d8f0"/>
  <path d="M22 80 L42 105 L22 95 Z" fill="#c0d8f0"/>
  <!-- Aripioare mici sus -->
  <path d="M-22 30 L-35 50 L-22 44 Z" fill="#d0e4f8" opacity=".8"/>
  <path d="M22 30 L35 50 L22 44 Z" fill="#d0e4f8" opacity=".8"/>
  <!-- Varf racheta -->
  <path d="M-8 0 Q0,-20 8,0" fill="#e8a0a0"/>
  <!-- Stea pe racheta -->
  <text x="0" y="72" text-anchor="middle" font-size="14" fill="#4080c0" opacity=".7">★</text>
</g>

<!-- Urme racheta (cercuri de fum) -->
<circle cx="130" cy="440" r="18" fill="none" stroke="rgba(160,200,255,.3)" stroke-width="2"/>
<circle cx="110" cy="470" r="14" fill="none" stroke="rgba(160,200,255,.25)" stroke-width="1.5"/>
<circle cx="95" cy="495" r="10" fill="none" stroke="rgba(160,200,255,.2)" stroke-width="1"/>

<!-- ── RACHETA MICA (dreapta sus) ── -->
<g transform="translate(680, 220) rotate(20)" opacity=".8">
  <ellipse cx="0" cy="55" rx="10" ry="28" fill="#ff8020" opacity=".7"/>
  <path d="M-12 48 L-12 0 Q-12,-12 0,-22 Q12,-12 12,0 L12 48 Z" fill="#d8ecff"/>
  <circle cx="0" cy="14" r="7" fill="#90ccff"/>
  <path d="M-12 48 L-24 62 L-12 56 Z" fill="#c0d8f0"/>
  <path d="M12 48 L24 62 L12 56 Z" fill="#c0d8f0"/>
</g>

<!-- ── ASTRONAUT (centru sus, plutind) ── -->
<g transform="translate(397, 290)" filter="url(#astro-glow)">
  <!-- Fir de legatara -->
  <path d="M0,-80 Q30,-60 20,-20 Q10,20 0,30" stroke="#a0c8e8" stroke-width="1.5" fill="none" opacity=".5" stroke-dasharray="4,3"/>
  <!-- Corp costum -->
  <!-- Picioare -->
  <rect x="-16" y="52" width="12" height="24" rx="6" fill="#c8ddf0"/>
  <rect x="4" y="52" width="12" height="24" rx="6" fill="#c8ddf0"/>
  <!-- Cizme -->
  <ellipse cx="-10" cy="76" rx="8" ry="5" fill="#90a8c0"/>
  <ellipse cx="10" cy="76" rx="8" ry="5" fill="#90a8c0"/>
  <!-- Trunchi costum -->
  <rect x="-24" y="18" width="48" height="36" rx="10" fill="#daeaff"/>
  <!-- Detalii piept -->
  <rect x="-8" y="28" width="16" height="10" rx="3" fill="#a0c0e0"/>
  <circle cx="0" cy="24" r="3" fill="#60a0d0"/>
  <!-- Brate -->
  <path d="M-24 22 Q-42 28 -38 44" stroke="#c8ddf0" stroke-width="12" stroke-linecap="round" fill="none"/>
  <path d="M24 22 Q42 28 38 44" stroke="#c8ddf0" stroke-width="12" stroke-linecap="round" fill="none"/>
  <!-- Manusi -->
  <circle cx="-38" cy="46" r="8" fill="#b0c8e0"/>
  <circle cx="38" cy="46" r="8" fill="#b0c8e0"/>
  <!-- Cap/Casca -->
  <circle cx="0" cy="0" r="28" fill="#daeaff" stroke="#b0ccee" stroke-width="2"/>
  <!-- Viziera casca -->
  <path d="M-18,-8 A18,18 0 0,1 18,-8 A14,14 0 0,1 0,14 Z" fill="#60c0f8" opacity=".85"/>
  <path d="M-18,-8 A18,18 0 0,1 18,-8 A14,14 0 0,1 0,14 Z" fill="url(#visor-grad)" opacity=".6"/>
  <!-- Reflectie viziera -->
  <path d="M-12,-4 Q-6,-14 -2,-10" stroke="white" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>
  <!-- Antena casca -->
  <line x1="10" y1="-28" x2="14" y2="-42" stroke="#b0ccee" stroke-width="1.5"/>
  <circle cx="14" cy="-44" r="3" fill="#ff8080" opacity=".9"/>
  <!-- Steluta micuta langa astronaut -->
  <text x="50" y="-40" font-size="22" fill="#ffe060" opacity=".8" filter="url(#star-glow)">★</text>
  <text x="-60" y="-20" font-size="16" fill="#80d0ff" opacity=".7">✦</text>
  <defs>
    <linearGradient id="visor-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#40a0e0" stop-opacity=".5"/>
      <stop offset="100%" stop-color="#80d0ff" stop-opacity=".1"/>
    </linearGradient>
  </defs>
</g>

<!-- ── NORI (jos, de la 700px in jos - zona alba) ── -->
<!-- Gradient tranzitie catre alb -->
<rect y="680" width="794" height="443" fill="url(#bottom-section)"/>

<!-- Nor 1 mare stanga -->
<g opacity=".95">
  <ellipse cx="120" cy="720" rx="90" ry="38" fill="white"/>
  <ellipse cx="80" cy="730" rx="58" ry="32" fill="white"/>
  <ellipse cx="160" cy="728" rx="55" ry="30" fill="white"/>
  <ellipse cx="120" cy="740" rx="95" ry="22" fill="white"/>
</g>

<!-- Nor 2 dreapta -->
<g opacity=".95">
  <ellipse cx="670" cy="710" rx="85" ry="35" fill="white"/>
  <ellipse cx="630" cy="720" rx="55" ry="30" fill="white"/>
  <ellipse cx="710" cy="718" rx="52" ry="28" fill="white"/>
  <ellipse cx="670" cy="730" rx="88" ry="20" fill="white"/>
</g>

<!-- Nor 3 mic centru -->
<g opacity=".8">
  <ellipse cx="397" cy="700" rx="60" ry="25" fill="white"/>
  <ellipse cx="370" cy="708" rx="38" ry="22" fill="white"/>
  <ellipse cx="424" cy="707" rx="36" ry="20" fill="white"/>
</g>

<!-- Curcubeu discret -->
<path d="M50 780 Q397 640 744 780" fill="none" stroke="url(#rainbow)" stroke-width="5" opacity=".18"/>
<path d="M70 790 Q397 658 724 790" fill="none" stroke="url(#rainbow)" stroke-width="3" opacity=".12"/>

<!-- ── ZONA ALBA JOS (pentru text) ── -->
<rect y="780" width="794" height="343" fill="white" opacity=".95"/>

<!-- Steluțe decorative mici pe zona alba -->
<text x="65" y="840" font-size="16" fill="#4090d0" opacity=".3" font-family="sans-serif">✦</text>
<text x="720" y="860" font-size="14" fill="#4090d0" opacity=".25" font-family="sans-serif">★</text>
<text x="730" y="900" font-size="10" fill="#4090d0" opacity=".2" font-family="sans-serif">✦</text>
<text x="55" y="920" font-size="12" fill="#4090d0" opacity=".25" font-family="sans-serif">★</text>
<text x="380" y="820" font-size="10" fill="#4090d0" opacity=".15" font-family="sans-serif">✦</text>

<!-- Rachetuta decorativa mica pe zona alba -->
<g transform="translate(730, 1020) rotate(-10)" opacity=".18">
  <ellipse cx="0" cy="30" rx="8" ry="18" fill="#ff8020"/>
  <path d="M-8 26 L-8 0 Q-8,-8 0,-15 Q8,-8 8,0 L8 26 Z" fill="#4090d0"/>
  <path d="M-8 26 L-16 34 L-8 30 Z" fill="#3070b0"/>
  <path d="M8 26 L16 34 L8 30 Z" fill="#3070b0"/>
</g>
<g transform="translate(60, 1060) rotate(15)" opacity=".18">
  <ellipse cx="0" cy="24" rx="6" ry="14" fill="#ff8020"/>
  <path d="M-6 20 L-6 0 Q-6,-6 0,-12 Q6,-6 6,0 L6 20 Z" fill="#4090d0"/>
  <path d="M-6 20 L-12 27 L-6 23 Z" fill="#3070b0"/>
  <path d="M6 20 L12 27 L6 23 Z" fill="#3070b0"/>
</g>

</svg>

<!-- ══ CONTENT TEXT ══ -->
<div class="content">

  <!-- Spatiu pentru fundal/astronaut -->
  <div style="height:290px;"></div>

  <!-- TITLU -->
  <p style="font-family:'Quicksand',sans-serif;font-size:13px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#80c8ff;margin-bottom:8px;">🚀 Invitație de Botez 🚀</p>
  <span class="baby-name">${fields.babyName || 'Prenume'}</span>
  <p class="announce">a aterizat pe Pământ!</p>

  <!-- Zona alba - info -->
  <div style="width:100%;background:rgba(255,255,255,.0);padding:0 10px;position:relative;">

    <div class="sep"></div>

<p class="section-label" style="color:#ffffff;">Părinți</p>
<p class="section-val">${fields.parents}</p>

<p class="section-label" style="color:#ffffff;">Nași</p>
<p class="section-val">${fields.godparents}</p>

    <div class="sep"></div>

    <p class="section-label" style="color:#2860a0;">🕊️ Botez</p>
    <p class="event-name" style="color:#2060b0;">${fields.church}</p>
    <p class="event-detail" style="color:#304060;">${formatDate(fields.churchDate)}, ora ${fields.churchTime}</p>

    <div style="height:14px;"></div>

    <p class="section-label" style="color:#2860a0;">🎈 Petrecere</p>
    <p class="event-name" style="color:#2060b0;">${fields.restaurant}</p>
    <p class="event-detail" style="color:#304060;">${formatDate(fields.restaurantDate)}, ora ${fields.restaurantTime}</p>

    <div class="sep"></div>

    <p class="rsvp" style="color:#406090;">
      Tel: <strong style="color:#1a3060;">${fields.contact}</strong>
    </p>
  </div>

</div>

</div>
</body>
</html>`
}