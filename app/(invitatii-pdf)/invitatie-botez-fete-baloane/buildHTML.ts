const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function buildHTML_baloane(fields: Record<string, string>): string {
  // Confetti deterministice
  const confetti = Array.from({ length: 80 }, (_, i) => ({
    x: ((i * 173.3 + 47) % 754 + 20).toFixed(1),
    y: ((i * 91.7 + 23) % 1050 + 30).toFixed(1),
    w: (4 + (i % 7) * 1.5).toFixed(1),
    h: (2 + (i % 5) * 1).toFixed(1),
    r: ((i * 37) % 180).toFixed(0),
    color: ['#f9c8d8','#ffd700','#c8e8f8','#d4b8e8','#a8e8c8','#ffeaa0','#f8b8d8'][i % 7],
    op: (0.4 + (i % 6) * 0.08).toFixed(2),
  }))

  // Stele mici
  const stars = Array.from({ length: 30 }, (_, i) => ({
    x: ((i * 211.3 + 83) % 730 + 32).toFixed(1),
    y: ((i * 137.7 + 41) % 500 + 30).toFixed(1),
    s: (6 + (i % 5) * 3).toFixed(0),
    op: (0.3 + (i % 6) * 0.1).toFixed(2),
    color: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#f9c8d8' : '#d4b8e8',
  }))

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nunito:wght@300;400;600;700;800;900&family=Quicksand:wght@400;500;600;700&family=Dancing+Script:wght@400;600;700&display=swap" rel="stylesheet">
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
  <!-- Fundal gradient cer magic -->
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f8f0ff"/>
    <stop offset="30%" stop-color="#fce8f8"/>
    <stop offset="60%" stop-color="#fff0f8"/>
    <stop offset="100%" stop-color="#fff8fc"/>
  </linearGradient>

  <!-- Baloane gradiente 3D - fiecare unic -->
  <radialGradient id="b-roz" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#ffeef5"/>
    <stop offset="25%" stop-color="#ffb8d4"/>
    <stop offset="60%" stop-color="#f07aaa"/>
    <stop offset="100%" stop-color="#d04878"/>
  </radialGradient>
  <radialGradient id="b-lila" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#f5eeff"/>
    <stop offset="25%" stop-color="#d4b8f8"/>
    <stop offset="60%" stop-color="#a878e8"/>
    <stop offset="100%" stop-color="#7840c0"/>
  </radialGradient>
  <radialGradient id="b-mint" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#eefff8"/>
    <stop offset="25%" stop-color="#a8f0d4"/>
    <stop offset="60%" stop-color="#58c8a0"/>
    <stop offset="100%" stop-color="#2a9070"/>
  </radialGradient>
  <radialGradient id="b-cer" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#eef8ff"/>
    <stop offset="25%" stop-color="#a8d8f8"/>
    <stop offset="60%" stop-color="#58a8e8"/>
    <stop offset="100%" stop-color="#2870c0"/>
  </radialGradient>
  <radialGradient id="b-piersica" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#fff8ee"/>
    <stop offset="25%" stop-color="#ffd0a8"/>
    <stop offset="60%" stop-color="#f0a060"/>
    <stop offset="100%" stop-color="#c86830"/>
  </radialGradient>
  <radialGradient id="b-galben" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#fffff0"/>
    <stop offset="25%" stop-color="#fff0a0"/>
    <stop offset="60%" stop-color="#f8d840"/>
    <stop offset="100%" stop-color="#d0a000"/>
  </radialGradient>
  <radialGradient id="b-fucsia" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#fff0ff"/>
    <stop offset="25%" stop-color="#f8b0f0"/>
    <stop offset="60%" stop-color="#e060c8"/>
    <stop offset="100%" stop-color="#a82898"/>
  </radialGradient>
  <radialGradient id="b-coral" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#fff0ee"/>
    <stop offset="25%" stop-color="#ffb8a8"/>
    <stop offset="60%" stop-color="#f07060"/>
    <stop offset="100%" stop-color="#c03840"/>
  </radialGradient>

  <!-- Gradiente text panel -->
  <linearGradient id="panel-grad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fff8fc"/>
    <stop offset="100%" stop-color="#fff0f8"/>
  </linearGradient>
  <linearGradient id="gold-line" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="transparent"/>
    <stop offset="15%" stop-color="#d4aa70"/>
    <stop offset="50%" stop-color="#ffd700"/>
    <stop offset="85%" stop-color="#d4aa70"/>
    <stop offset="100%" stop-color="transparent"/>
  </linearGradient>
  <linearGradient id="pink-line" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="transparent"/>
    <stop offset="20%" stop-color="#f0a0c0"/>
    <stop offset="50%" stop-color="#f8c8d8"/>
    <stop offset="80%" stop-color="#f0a0c0"/>
    <stop offset="100%" stop-color="transparent"/>
  </linearGradient>

  <!-- Filtere -->
  <filter id="balloon-shadow">
    <feDropShadow dx="4" dy="8" stdDeviation="8" flood-color="#c060a0" flood-opacity=".2"/>
  </filter>
  <filter id="balloon-glow">
    <feGaussianBlur stdDeviation="15" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="star-glow">
    <feGaussianBlur stdDeviation="2" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="text-shadow-soft">
    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#d04878" flood-opacity=".2"/>
  </filter>
  <filter id="ambient-blur">
    <feGaussianBlur stdDeviation="30"/>
  </filter>
</defs>

<!-- ══ FUNDAL ══ -->
<rect width="794" height="1123" fill="url(#sky)"/>

<!-- Glow-uri ambientale colorate -->
<ellipse cx="200" cy="300" rx="250" ry="200" fill="#f0b0d8" opacity=".08" filter="url(#ambient-blur)"/>
<ellipse cx="600" cy="250" rx="220" ry="180" fill="#c0a0e8" opacity=".07" filter="url(#ambient-blur)"/>
<ellipse cx="397" cy="600" rx="300" ry="150" fill="#f8d0e8" opacity=".06" filter="url(#ambient-blur)"/>
<ellipse cx="100" cy="700" rx="180" ry="150" fill="#a0d0f0" opacity=".06" filter="url(#ambient-blur)"/>
<ellipse cx="700" cy="750" rx="180" ry="150" fill="#d0b0f8" opacity=".07" filter="url(#ambient-blur)"/>

<!-- ══ CONFETTI ══ -->
${confetti.map(c => `<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="1" fill="${c.color}" opacity="${c.op}" transform="rotate(${c.r} ${parseFloat(c.x)+parseFloat(c.w)/2} ${parseFloat(c.y)+parseFloat(c.h)/2})"/>`).join('')}

<!-- ══ STELE DECORATIVE ══ -->
${stars.map(s => `<text x="${s.x}" y="${s.y}" font-size="${s.s}" fill="${s.color}" opacity="${s.op}" text-anchor="middle" filter="url(#star-glow)">★</text>`).join('')}

<!-- ══ BALOANE — ARANJAMENT DRAMATIC ══ -->

<!-- GRUP BALOANE STANGA SUS (3 baloane) -->

<!-- Balon 1 - ROZ mare, fundal stanga -->
<g transform="translate(85, 320)" filter="url(#balloon-shadow)">
  <!-- Corp balon oval -->
  <ellipse cx="0" cy="0" rx="62" ry="78" fill="url(#b-roz)"/>
  <!-- Reflex alb (highlight) -->
  <ellipse cx="-18" cy="-26" rx="18" ry="12" fill="white" opacity=".35" transform="rotate(-20 -18 -26)"/>
  <ellipse cx="-22" cy="-34" rx="8" ry="5" fill="white" opacity=".2" transform="rotate(-25 -22 -34)"/>
  <!-- Nodul balon jos -->
  <path d="M -6 78 Q 0 88 6 78" stroke="#d04878" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="90" rx="5" ry="4" fill="#d04878"/>
  <!-- Ata -->
  <path d="M 0 94 Q -12 130 -8 160 Q -4 190 -14 220" stroke="#f0a0c0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
</g>

<!-- Balon 2 - LILA, mai sus -->
<g transform="translate(168, 220)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="52" ry="65" fill="url(#b-lila)"/>
  <ellipse cx="-15" cy="-22" rx="15" ry="10" fill="white" opacity=".3" transform="rotate(-22 -15 -22)"/>
  <path d="M -5 65 Q 0 74 5 65" stroke="#7840c0" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="76" rx="4" ry="3.5" fill="#7840c0"/>
  <path d="M 0 79 Q 14 110 10 140 Q 6 165 18 195" stroke="#c0a0e8" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
</g>

<!-- Balon 3 - MINT, cel mai in fata stanga -->
<g transform="translate(62, 160)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="44" ry="56" fill="url(#b-mint)"/>
  <ellipse cx="-13" cy="-18" rx="12" ry="8" fill="white" opacity=".3" transform="rotate(-20 -13 -18)"/>
  <path d="M -4 56 Q 0 63 4 56" stroke="#2a9070" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="66" rx="3.5" ry="3" fill="#2a9070"/>
  <path d="M 0 69 Q 8 95 4 118 Q 0 138 10 160" stroke="#a8f0d4" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".65"/>
</g>

<!-- GRUP BALOANE DREAPTA SUS (3 baloane) -->

<!-- Balon 4 - CER, mare dreapta -->
<g transform="translate(710, 290)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="60" ry="75" fill="url(#b-cer)"/>
  <ellipse cx="-17" cy="-25" rx="17" ry="11" fill="white" opacity=".35" transform="rotate(-22 -17 -25)"/>
  <ellipse cx="-21" cy="-32" rx="7" ry="4" fill="white" opacity=".2" transform="rotate(-25 -21 -32)"/>
  <path d="M -5 75 Q 0 84 5 75" stroke="#2870c0" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="87" rx="4.5" ry="4" fill="#2870c0"/>
  <path d="M 0 91 Q 12 125 8 155 Q 4 180 14 210" stroke="#a8d8f8" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
</g>

<!-- Balon 5 - FUCSIA, dreapta sus -->
<g transform="translate(638, 190)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="50" ry="63" fill="url(#b-fucsia)"/>
  <ellipse cx="-14" cy="-21" rx="14" ry="9" fill="white" opacity=".3" transform="rotate(-20 -14 -21)"/>
  <path d="M -4 63 Q 0 72 4 63" stroke="#a82898" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="73" rx="4" ry="3.5" fill="#a82898"/>
  <path d="M 0 76 Q -14 108 -10 138 Q -6 163 -18 192" stroke="#f8b0f0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
</g>

<!-- Balon 6 - GALBEN, sus dreapta -->
<g transform="translate(730, 150)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="42" ry="53" fill="url(#b-galben)"/>
  <ellipse cx="-12" cy="-17" rx="11" ry="7" fill="white" opacity=".32" transform="rotate(-18 -12 -17)"/>
  <path d="M -3 53 Q 0 60 3 53" stroke="#d0a000" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="62" rx="3" ry="2.8" fill="#d0a000"/>
  <path d="M 0 65 Q -8 90 -4 112 Q 0 130 -10 152" stroke="#fff0a0" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".65"/>
</g>

<!-- BALON CENTRAL MARE (protagonistul - umbla printre doua grupe) -->
<g transform="translate(397, 200)" filter="url(#balloon-glow)">
  <!-- Halo glow in spate -->
  <ellipse cx="0" cy="0" rx="90" ry="110" fill="#f8b0d8" opacity=".15"/>
  <!-- Corp principal -->
  <ellipse cx="0" cy="0" rx="80" ry="100" fill="url(#b-roz)"/>
  <!-- Highlight principal -->
  <ellipse cx="-24" cy="-34" rx="24" ry="16" fill="white" opacity=".4" transform="rotate(-22 -24 -34)"/>
  <ellipse cx="-30" cy="-44" rx="10" ry="6" fill="white" opacity=".25" transform="rotate(-28 -30 -44)"/>
  <!-- Reflexie secundara -->
  <ellipse cx="28" cy="-20" rx="8" ry="5" fill="white" opacity=".12" transform="rotate(15 28 -20)"/>
  <!-- Nod -->
  <path d="M -8 100 Q 0 115 8 100" stroke="#d04878" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="118" rx="7" ry="6" fill="#d04878"/>
  <!-- Steluta pe balon -->
  <text x="0" y="15" text-anchor="middle" font-size="28" fill="white" opacity=".3">★</text>
  <!-- Ata centrala -->
  <path d="M 0 124 Q -5 170 5 210 Q 15 250 5 290 Q -5 320 8 355" stroke="#f0a0c0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
</g>

<!-- BALOANE JOS STANGA (grup mic decorativ) -->
<g transform="translate(130, 900)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="38" ry="48" fill="url(#b-piersica)"/>
  <ellipse cx="-11" cy="-15" rx="10" ry="7" fill="white" opacity=".3" transform="rotate(-20 -11 -15)"/>
  <path d="M -3 48 Q 0 55 3 48" stroke="#c86830" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="57" rx="3" ry="2.5" fill="#c86830"/>
</g>
<g transform="translate(190, 940)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="32" ry="40" fill="url(#b-lila)"/>
  <ellipse cx="-9" cy="-13" rx="9" ry="6" fill="white" opacity=".28" transform="rotate(-20 -9 -13)"/>
  <path d="M -3 40 Q 0 46 3 40" stroke="#7840c0" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="48" rx="2.5" ry="2.2" fill="#7840c0"/>
</g>

<!-- BALOANE JOS DREAPTA -->
<g transform="translate(620, 890)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="40" ry="50" fill="url(#b-coral)"/>
  <ellipse cx="-12" cy="-16" rx="11" ry="7" fill="white" opacity=".32" transform="rotate(-20 -12 -16)"/>
  <path d="M -3 50 Q 0 57 3 50" stroke="#c03840" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="59" rx="3" ry="2.6" fill="#c03840"/>
</g>
<g transform="translate(670, 940)" filter="url(#balloon-shadow)">
  <ellipse cx="0" cy="0" rx="30" ry="38" fill="url(#b-mint)"/>
  <ellipse cx="-9" cy="-12" rx="8" ry="5" fill="white" opacity=".28" transform="rotate(-18 -9 -12)"/>
  <path d="M -2 38 Q 0 44 2 38" stroke="#2a9070" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="45" rx="2.5" ry="2.2" fill="#2a9070"/>
</g>

<!-- ══ ATE LEGATE INTRE BALOANE (efect buchet) ══ -->
<!-- Ata de la balon central la stanga grup -->
<path d="M 317 318 Q 260 380 168 296" stroke="#f0a0c0" stroke-width="1" fill="none" stroke-dasharray="4,3" opacity=".4"/>
<!-- Ata de la balon central la dreapta grup -->
<path d="M 477 318 Q 540 370 638 263" stroke="#d4b8e8" stroke-width="1" fill="none" stroke-dasharray="4,3" opacity=".4"/>

<!-- ══ PANGLICI DECORATIVE ══ -->
<!-- Panglica stanga -->
<path d="M 85 410 Q 60 440 80 470 Q 100 500 75 530" stroke="#f9c8d8" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".5"/>
<!-- Panglica dreapta -->
<path d="M 710 375 Q 740 405 720 435 Q 700 465 730 495" stroke="#d4b8e8" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".5"/>

<!-- ══ PANEL TEXT (zona centrala) ══ -->
<!-- Fundal panel subtil -->
<rect x="60" y="520" width="674" height="560" rx="24" fill="white" opacity=".7"/>
<rect x="60" y="520" width="674" height="560" rx="24" fill="url(#panel-grad)" opacity=".5"/>
<!-- Bordura panel -->
<rect x="60" y="520" width="674" height="560" rx="24" fill="none" stroke="#f0a8c0" stroke-width="1.5" opacity=".5"/>
<rect x="68" y="528" width="658" height="544" rx="20" fill="none" stroke="#f9c8d8" stroke-width=".8" opacity=".4"/>

<!-- Linie decorativa sus panel -->
<line x1="120" y1="558" x2="674" y2="558" stroke="url(#pink-line)" stroke-width="1" opacity=".6"/>
<line x1="120" y1="562" x2="674" y2="562" stroke="url(#gold-line)" stroke-width=".8" opacity=".4"/>
<!-- Linie jos panel -->
<line x1="120" y1="1048" x2="674" y2="1048" stroke="url(#gold-line)" stroke-width="1" opacity=".5"/>
<line x1="120" y1="1052" x2="674" y2="1052" stroke="url(#pink-line)" stroke-width=".8" opacity=".4"/>

<!-- Ornamente colturi panel -->
<g fill="#d4aa70" opacity=".5">
  <circle cx="80" cy="535" r="4"/>
  <circle cx="714" cy="535" r="4"/>
  <circle cx="80" cy="1060" r="4"/>
  <circle cx="714" cy="1060" r="4"/>
</g>
<g stroke="#d4aa70" stroke-width="1" fill="none" opacity=".4">
  <path d="M 80 535 L 80 558 M 80 535 L 103 535"/>
  <path d="M 714 535 L 714 558 M 714 535 L 691 535"/>
  <path d="M 80 1060 L 80 1040 M 80 1060 L 103 1060"/>
  <path d="M 714 1060 L 714 1040 M 714 1060 L 691 1060"/>
</g>

<!-- Steluțe mici decorative pe panel -->
<g opacity=".4">
  <text x="100" y="580" font-size="12" fill="#ffd700" text-anchor="middle">✦</text>
  <text x="694" y="580" font-size="12" fill="#ffd700" text-anchor="middle">✦</text>
  <text x="100" y="1040" font-size="10" fill="#ffd700" text-anchor="middle">✦</text>
  <text x="694" y="1040" font-size="10" fill="#ffd700" text-anchor="middle">✦</text>
</g>

<!-- Baloane mici decorative pe panel corners -->
<g transform="translate(92,548)" opacity=".35">
  <ellipse cx="0" cy="0" rx="10" ry="13" fill="#f9c8d8"/>
  <path d="M -1 13 Q 0 16 1 13" stroke="#d04878" stroke-width="1" fill="none"/>
</g>
<g transform="translate(702,548)" opacity=".35">
  <ellipse cx="0" cy="0" rx="10" ry="13" fill="#d4b8e8"/>
  <path d="M -1 13 Q 0 16 1 13" stroke="#7840c0" stroke-width="1" fill="none"/>
</g>

<!-- Bordura exterioara intreaga pagina -->
<rect x="18" y="18" width="758" height="1087" rx="8" fill="none" stroke="#f0a8c0" stroke-width="1.5" opacity=".4"/>
<rect x="10" y="10" width="774" height="1103" rx="12" fill="none" stroke="#d4aa70" stroke-width="1" opacity=".25"/>

</svg>

<!-- ══ CONTENT TEXT ══ -->
<div style="position:absolute;inset:0;z-index:6;display:flex;flex-direction:column;align-items:center;text-align:center;">

  <!-- SPATIU BALOANE SUS -->
  <div style="height:520px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:18px;">
    <p style="font-family:'Quicksand',sans-serif;font-size:11px;font-weight:600;letter-spacing:.55em;text-transform:uppercase;color:#c060a0;background:rgba(255,255,255,.7);padding:4px 20px;border-radius:20px;">✦ Invitație de Botez ✦</p>
  </div>

  <!-- PANEL CONTINUT -->
  <div style="width:100%;padding:0 100px;flex:1;display:flex;flex-direction:column;align-items:center;">

    <!-- BABY NAME -->
    <div style="margin-bottom:10px;">
      <span style="font-family:'Abril Fatface',cursive;font-size:96px;color:#d03870;line-height:.92;display:block;letter-spacing:.01em;text-shadow:3px 3px 0 rgba(208,56,112,.15),0 0 40px rgba(208,56,112,.12);">${fields.babyName || 'Sofia'}</span>
    </div>
    <p style="font-family:'Dancing Script',cursive;font-size:28px;font-weight:400;color:#a050c0;letter-spacing:.04em;margin-bottom:18px;">a sosit cu balonul ei magic! 🎈</p>

    <!-- SEPARATOR -->
    <div style="display:flex;align-items:center;gap:12px;width:100%;margin-bottom:22px;">
      <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#f0a0c0);"></div>
      <span style="font-size:18px;">🎀</span>
      <div style="flex:1;height:1px;background:linear-gradient(90deg,#f0a0c0,transparent);"></div>
    </div>

    <!-- GRID INFO -->
    <div style="display:grid;grid-template-columns:1fr 2px 1fr;gap:0;width:100%;margin-bottom:20px;">
      <div style="text-align:right;padding-right:28px;">
        <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#c060a0;margin-bottom:6px;">🎈 Părinți</p>
        <p style="font-family:'Nunito',sans-serif;font-size:28px;font-weight:700;color:#5a1e58;line-height:1.3;margin-bottom:18px;">${fields.parents}</p>
        <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#c060a0;margin-bottom:6px;">🎀 Nași</p>
        <p style="font-family:'Nunito',sans-serif;font-size:28px;font-weight:700;color:#5a1e58;line-height:1.3;">${fields.godparents}</p>
      </div>
      <div style="background:linear-gradient(180deg,transparent,#f0a0c0 20%,#f0a0c0 80%,transparent);"></div>
      <div style="text-align:left;padding-left:28px;">
        <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#c060a0;margin-bottom:6px;">🕊 Botez</p>
        <p style="font-family:'Nunito',sans-serif;font-size:26px;font-weight:700;color:#5a1e58;line-height:1.2;margin-bottom:5px;">${fields.church}</p>
        <p style="font-family:'Nunito',sans-serif;font-size:22px;font-weight:300;color:#a060b0;line-height:1.5;margin-bottom:18px;">${formatDate(fields.churchDate)}<br>ora ${fields.churchTime}</p>
        <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#c060a0;margin-bottom:6px;">🎉 Petrecere</p>
        <p style="font-family:'Nunito',sans-serif;font-size:26px;font-weight:700;color:#5a1e58;line-height:1.2;margin-bottom:5px;">${fields.restaurant}</p>
        <p style="font-family:'Nunito',sans-serif;font-size:22px;font-weight:300;color:#a060b0;line-height:1.5;">${formatDate(fields.restaurantDate)}<br>ora ${fields.restaurantTime}</p>
      </div>
    </div>

    <!-- CONTACT -->
    <div style="text-align:center;padding-bottom:30px;">
      <div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#d4aa70 30%,#ffd700 50%,#d4aa70 70%,transparent);margin-bottom:14px;opacity:.6;"></div>
      <p style="font-family:'Quicksand',sans-serif;font-size:10px;font-weight:700;letter-spacing:.4em;text-transform:uppercase;color:#c060a0;margin-bottom:6px;">Confirmați prezența</p>
      <p style="font-family:'Nunito',sans-serif;font-size:32px;font-weight:800;color:#5a1e58;letter-spacing:.04em;">${fields.contact}</p>
    </div>
  </div>
</div>

</div>
</body>
</html>`
}