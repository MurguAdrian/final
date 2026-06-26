const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function buildHTML_castel(fields: Record<string, string>): string {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    x: ((i * 179.3 + 53) % 754 + 20).toFixed(1),
    y: ((i * 113.7 + 31) % 820 + 20).toFixed(1),
    s: (3 + (i % 5) * 2).toFixed(0),
    op: (0.25 + (i % 6) * 0.08).toFixed(2),
    c: ['#ffd700','#ffe566','#ffffff','#e8c8f8','#fff0a0'][i % 5],
  }))

  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    x: ((i * 237.1 + 71) % 700 + 47).toFixed(1),
    y: ((i * 149.3 + 43) % 600 + 30).toFixed(1),
    s: (6 + (i % 4) * 5),
    op: (0.15 + (i % 5) * 0.08).toFixed(2),
  }))

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; }
.inv { width: 794px; height: 1123px; position: relative; overflow: hidden; background: #1a0a2e; }
</style>
</head>
<body>
<div class="inv">

<svg style="position:absolute;inset:0;width:794px;height:1123px;z-index:0;" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0d0520"/>
    <stop offset="30%" stop-color="#1a0a38"/>
    <stop offset="60%" stop-color="#220d48"/>
    <stop offset="100%" stop-color="#150828"/>
  </linearGradient>
  <radialGradient id="moon-g" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fffde0"/>
    <stop offset="50%" stop-color="#f5e060"/>
    <stop offset="100%" stop-color="#c8a020"/>
  </radialGradient>
  <linearGradient id="castle-dark" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1e0845"/>
    <stop offset="100%" stop-color="#0a0118"/>
  </linearGradient>
  <linearGradient id="castle-mid" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#2a1055"/>
    <stop offset="100%" stop-color="#120430"/>
  </linearGradient>
  <radialGradient id="win-glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#ffd700" stop-opacity=".95"/>
    <stop offset="50%" stop-color="#ffa500" stop-opacity=".6"/>
    <stop offset="100%" stop-color="#ff6600" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="crown-g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffe566"/>
    <stop offset="50%" stop-color="#ffd700"/>
    <stop offset="100%" stop-color="#b8800a"/>
  </linearGradient>
  <linearGradient id="gold-line" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="transparent"/>
    <stop offset="20%" stop-color="#b8800a"/>
    <stop offset="50%" stop-color="#ffd700"/>
    <stop offset="80%" stop-color="#b8800a"/>
    <stop offset="100%" stop-color="transparent"/>
  </linearGradient>
  <filter id="sg"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="gg"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="sb"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="cs-sh"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#c8900a" flood-opacity=".55"/></filter>
  <filter id="moon-glow"><feGaussianBlur stdDeviation="16" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>

<!-- Fundal -->
<rect width="794" height="1123" fill="url(#bg)"/>
<!-- Nebulozitate -->
<ellipse cx="397" cy="280" rx="450" ry="280" fill="#4a1a8a" opacity=".18" filter="url(#sb)"/>
<ellipse cx="150" cy="350" rx="220" ry="160" fill="#7a20c8" opacity=".1" filter="url(#sb)"/>
<ellipse cx="660" cy="300" rx="200" ry="160" fill="#5a10a0" opacity=".1" filter="url(#sb)"/>

<!-- Luna -->
<circle cx="650" cy="120" r="100" fill="#ffd700" opacity=".1" filter="url(#sb)"/>
<circle cx="650" cy="120" r="70" fill="#f8e840" opacity=".12" filter="url(#sb)"/>
<circle cx="650" cy="120" r="52" fill="url(#moon-g)" filter="url(#moon-glow)"/>
<circle cx="635" cy="106" r="9" fill="#c8a030" opacity=".45"/>
<circle cx="663" cy="120" r="6" fill="#c8a030" opacity=".38"/>
<circle cx="645" cy="136" r="7" fill="#c8a030" opacity=".4"/>
<ellipse cx="632" cy="104" rx="14" ry="8" fill="#fffde0" opacity=".25" transform="rotate(-25 632 104)"/>

<!-- Stele -->
${stars.map(s => `<text x="${s.x}" y="${s.y}" font-size="${s.s}" fill="${s.c}" opacity="${s.op}" text-anchor="middle" filter="url(#sg)">★</text>`).join('')}

<!-- Sparkles -->
${sparkles.map(s => `<g transform="translate(${s.x},${s.y})" opacity="${s.op}"><line x1="0" y1="${-s.s*0.65}" x2="0" y2="${s.s*0.65}" stroke="#ffd700" stroke-width="1.3"/><line x1="${-s.s*0.65}" y1="0" x2="${s.s*0.65}" y2="0" stroke="#ffd700" stroke-width="1.3"/><line x1="${-s.s*0.42}" y1="${-s.s*0.42}" x2="${s.s*0.42}" y2="${s.s*0.42}" stroke="#ffe566" stroke-width=".8"/><line x1="${s.s*0.42}" y1="${-s.s*0.42}" x2="${-s.s*0.42}" y2="${s.s*0.42}" stroke="#ffe566" stroke-width=".8"/></g>`).join('')}

<!-- DEALURI -->
<ellipse cx="200" cy="840" rx="380" ry="190" fill="#0a0118" opacity=".95"/>
<ellipse cx="620" cy="855" rx="320" ry="175" fill="#080110" opacity=".95"/>
<path d="M0 900 Q200 820 397 840 Q594 860 794 820 L794 1123 L0 1123 Z" fill="#08010e"/>

<!-- ══ CASTEL ══ -->

<!-- TURN STANGA FUNDAL (mai mic, mai in spate) -->
<rect x="90" y="560" width="70" height="320" fill="url(#castle-dark)" opacity=".7"/>
<polygon points="125,480 90,562 160,562" fill="#0e0228" opacity=".7"/>
<rect x="90" y="546" width="14" height="18" fill="#160538" opacity=".7"/>
<rect x="109" y="546" width="14" height="18" fill="#160538" opacity=".7"/>
<rect x="128" y="546" width="14" height="18" fill="#160538" opacity=".7"/>
<line x1="125" y1="480" x2="125" y2="440" stroke="#b8800a" stroke-width="1.5" opacity=".7"/>
<polygon points="125,440 143,451 125,462" fill="#ffd700" opacity=".7"/>

<!-- TURN DREAPTA FUNDAL -->
<rect x="634" y="560" width="70" height="320" fill="url(#castle-dark)" opacity=".7"/>
<polygon points="669,480 634,562 704,562" fill="#0e0228" opacity=".7"/>
<rect x="634" y="546" width="14" height="18" fill="#160538" opacity=".7"/>
<rect x="653" y="546" width="14" height="18" fill="#160538" opacity=".7"/>
<rect x="672" y="546" width="14" height="18" fill="#160538" opacity=".7"/>
<line x1="669" y1="480" x2="669" y2="440" stroke="#b8800a" stroke-width="1.5" opacity=".7"/>
<polygon points="669,440 687,451 669,462" fill="#ffd700" opacity=".7"/>

<!-- CORP PRINCIPAL CASTEL -->
<rect x="210" y="570" width="374" height="310" fill="url(#castle-mid)"/>

<!-- TURN STANGA PRINCIPAL -->
<rect x="168" y="500" width="100" height="380" fill="url(#castle-mid)"/>
<!-- Creneluri turn stanga -->
<rect x="168" y="482" width="17" height="22" fill="#2a1055"/>
<rect x="191" y="482" width="17" height="22" fill="#2a1055"/>
<rect x="214" y="482" width="17" height="22" fill="#2a1055"/>
<rect x="237" y="482" width="17" height="22" fill="#2a1055"/>
<!-- Varf turn stanga -->
<polygon points="218,382 168,504 268,504" fill="#140430"/>
<!-- Stegulet turn stanga -->
<line x1="218" y1="382" x2="218" y2="330" stroke="#b8800a" stroke-width="2.5"/>
<polygon points="218,330 252,346 218,362" fill="#ffd700" filter="url(#gg)" opacity=".95"/>

<!-- TURN DREAPTA PRINCIPAL -->
<rect x="526" y="500" width="100" height="380" fill="url(#castle-mid)"/>
<rect x="526" y="482" width="17" height="22" fill="#2a1055"/>
<rect x="549" y="482" width="17" height="22" fill="#2a1055"/>
<rect x="572" y="482" width="17" height="22" fill="#2a1055"/>
<rect x="595" y="482" width="17" height="22" fill="#2a1055"/>
<polygon points="576,382 526,504 626,504" fill="#140430"/>
<line x1="576" y1="382" x2="576" y2="330" stroke="#b8800a" stroke-width="2.5"/>
<polygon points="576,330 610,346 576,362" fill="#ffd700" filter="url(#gg)" opacity=".95"/>

<!-- Creneluri corp principal -->
<rect x="210" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="236" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="262" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="288" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="314" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="340" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="366" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="392" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="418" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="444" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="470" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="496" y="550" width="20" height="24" fill="#2a1055"/>
<rect x="522" y="550" width="20" height="24" fill="#2a1055"/>

<!-- TURN CENTRAL -->
<rect x="327" y="460" width="140" height="130" fill="#241050"/>
<rect x="327" y="440" width="20" height="24" fill="#2a1055"/>
<rect x="353" y="440" width="20" height="24" fill="#2a1055"/>
<rect x="379" y="440" width="20" height="24" fill="#2a1055"/>
<rect x="405" y="440" width="20" height="24" fill="#2a1055"/>
<rect x="431" y="440" width="20" height="24" fill="#2a1055"/>
<rect x="447" y="440" width="20" height="24" fill="#2a1055"/>
<polygon points="397,340 327,462 467,462" fill="#0e0228"/>
<line x1="397" y1="340" x2="397" y2="282" stroke="#b8800a" stroke-width="3"/>
<polygon points="397,282 438,302 397,322" fill="#ffd700" filter="url(#gg)" opacity=".98"/>

<!-- POARTA -->
<rect x="357" y="670" width="80" height="110" fill="#04000a"/>
<path d="M357 710 Q357 670 397 670 Q437 670 437 710" fill="#04000a"/>
<path d="M357 710 Q357 670 397 670 Q437 670 437 710" fill="none" stroke="#3a1268" stroke-width="2" opacity=".6"/>
<line x1="377" y1="672" x2="377" y2="780" stroke="#1a0838" stroke-width="3.5"/>
<line x1="397" y1="672" x2="397" y2="780" stroke="#1a0838" stroke-width="3.5"/>
<line x1="417" y1="672" x2="417" y2="780" stroke="#1a0838" stroke-width="3.5"/>
<line x1="357" y1="706" x2="437" y2="706" stroke="#1a0838" stroke-width="3"/>
<line x1="357" y1="735" x2="437" y2="735" stroke="#1a0838" stroke-width="3"/>

<!-- FERESTRE (cu lumina calda) -->
<!-- Turn stanga -->
<ellipse cx="218" cy="540" rx="11" ry="16" fill="url(#win-glow)" opacity=".85"/>
<ellipse cx="218" cy="590" rx="11" ry="16" fill="url(#win-glow)" opacity=".75"/>
<ellipse cx="218" cy="640" rx="9" ry="13" fill="url(#win-glow)" opacity=".7"/>
<!-- Turn dreapta -->
<ellipse cx="576" cy="540" rx="11" ry="16" fill="url(#win-glow)" opacity=".85"/>
<ellipse cx="576" cy="590" rx="11" ry="16" fill="url(#win-glow)" opacity=".75"/>
<ellipse cx="576" cy="640" rx="9" ry="13" fill="url(#win-glow)" opacity=".7"/>
<!-- Corp stanga -->
<ellipse cx="268" cy="630" rx="13" ry="18" fill="url(#win-glow)" opacity=".8"/>
<ellipse cx="268" cy="690" rx="11" ry="15" fill="url(#win-glow)" opacity=".7"/>
<!-- Corp dreapta -->
<ellipse cx="526" cy="630" rx="13" ry="18" fill="url(#win-glow)" opacity=".8"/>
<ellipse cx="526" cy="690" rx="11" ry="15" fill="url(#win-glow)" opacity=".7"/>
<!-- Fereastra centrala rotunda -->
<circle cx="397" cy="620" r="22" fill="url(#win-glow)" opacity=".75"/>
<circle cx="397" cy="620" r="22" fill="none" stroke="#ffd700" stroke-width="1.5" opacity=".5"/>
<line x1="397" y1="598" x2="397" y2="642" stroke="#ffd700" stroke-width="1" opacity=".4"/>
<line x1="375" y1="620" x2="419" y2="620" stroke="#ffd700" stroke-width="1" opacity=".4"/>

<!-- Glow castel jos -->
<ellipse cx="397" cy="700" rx="250" ry="80" fill="#5a10a0" opacity=".1" filter="url(#sb)"/>

<!-- Contur subtil castel -->
<path d="M168 880 L168 500 L218 382 L268 504 L210 504 L210 570 L327 570 L327 462 L397 340 L467 462 L467 570 L584 570 L584 504 L526 504 L576 382 L626 504 L626 880" fill="none" stroke="#4a1e7a" stroke-width="1" opacity=".4"/>

<!-- BORDURA PAGINA -->
<rect x="16" y="16" width="762" height="1091" rx="10" fill="none" stroke="#c8900a" stroke-width="2" opacity=".5"/>
<rect x="24" y="24" width="746" height="1075" rx="8" fill="none" stroke="#8a2be2" stroke-width="1" opacity=".25"/>
<g fill="none" stroke="#c8900a" stroke-width="1.5" opacity=".55">
  <path d="M16 16 L16 60 M16 16 L60 16"/>
  <path d="M778 16 L778 60 M778 16 L734 16"/>
  <path d="M16 1107 L16 1063 M16 1107 L60 1107"/>
  <path d="M778 1107 L778 1063 M778 1107 L734 1107"/>
</g>
<g fill="#c8900a" opacity=".7">
  <circle cx="16" cy="16" r="4"/>
  <circle cx="778" cy="16" r="4"/>
  <circle cx="16" cy="1107" r="4"/>
  <circle cx="778" cy="1107" r="4"/>
</g>

<!-- COROANA deasupra zonei text -->
<g transform="translate(397, 862)" filter="url(#cs-sh)">
  <path d="M-62 0 L-62 -32 L-42 -16 L-22 -48 L0 -24 L22 -48 L42 -16 L62 -32 L62 0 Z" fill="url(#crown-g)"/>
  <path d="M-62 0 L-62 -32 L-42 -16 L-22 -48 L0 -24 L22 -48 L42 -16 L62 -32 L62 0 Z" fill="none" stroke="#c8900a" stroke-width="1.5" opacity=".8"/>
  <rect x="-62" y="-8" width="124" height="12" rx="4" fill="#b8800a"/>
  <circle cx="0" cy="-26" r="7" fill="#e040fb" opacity=".95" filter="url(#gg)"/>
  <circle cx="-24" cy="-14" r="5" fill="#7c4dff" opacity=".9"/>
  <circle cx="24" cy="-14" r="5" fill="#7c4dff" opacity=".9"/>
  <circle cx="-46" cy="-24" r="5" fill="#ff4081" opacity=".9"/>
  <circle cx="46" cy="-24" r="5" fill="#ff4081" opacity=".9"/>
  <text x="-22" y="-52" font-size="14" fill="#ffd700" text-anchor="middle" filter="url(#gg)">★</text>
  <text x="22" y="-52" font-size="14" fill="#ffd700" text-anchor="middle" filter="url(#gg)">★</text>
  <text x="0" y="-30" font-size="10" fill="#ffe566" text-anchor="middle" opacity=".7">✦</text>
  <!-- highlight coroana -->
  <path d="M-52 -28 Q-32 -12 -22 -44 Q-10 -22 0 -20 Q10 -22 22 -44 Q32 -12 52 -28" stroke="#ffe566" stroke-width="1.5" fill="none" opacity=".4"/>
</g>

<!-- LINIE SEPARATOARE AURIE -->
<line x1="60" y1="878" x2="734" y2="878" stroke="url(#gold-line)" stroke-width="2" opacity=".8"/>
<line x1="60" y1="882" x2="734" y2="882" stroke="url(#gold-line)" stroke-width=".8" opacity=".4"/>

</svg>

<!-- ══ CONTENT TEXT ══ -->
<div style="position:absolute;inset:0;z-index:6;display:flex;flex-direction:column;align-items:center;text-align:center;">

  <!-- ZONA SUS -->
  <div style="padding-top:28px;width:100%;">
    <p style="font-family:'Quicksand',sans-serif;font-size:11px;font-weight:700;letter-spacing:.55em;text-transform:uppercase;color:#d4a0f8;background:rgba(10,2,28,.6);display:inline-block;padding:5px 22px;border-radius:20px;border:1px solid rgba(200,144,10,.4);">✦ Invitație de Botez ✦</p>
  </div>

  <!-- BABY NAME -->
  <div style="margin-top:16px;padding:0 60px;">
    <p style="font-family:'Quicksand',sans-serif;font-size:13px;font-weight:700;letter-spacing:.4em;text-transform:uppercase;color:#c8a0f0;margin-bottom:4px;">Mica noastră prințesă</p>
    <span style="font-family:'Cinzel',serif;font-size:96px;font-weight:900;color:#ffd700;line-height:.88;display:block;letter-spacing:.04em;text-shadow:0 0 40px rgba(255,215,0,.5),0 0 80px rgba(138,43,226,.3),0 4px 0 rgba(180,120,0,.6),0 8px 0 rgba(140,80,0,.3);">${fields.babyName || 'Sofia'}</span>
    <p style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;font-style:italic;color:#e0c0ff;margin-top:10px;letter-spacing:.08em;text-shadow:0 0 20px rgba(138,43,226,.4);">a sosit în regatul nostru 👑</p>
  </div>

  <!-- SPACER -->
  <div style="flex:1;"></div>

  <!-- ZONA TEXT JOS - pe fundal mov inchis transparent -->
  <div style="width:100%;background:rgba(8,1,20,.85);padding:28px 60px 32px;border-top:2px solid rgba(200,144,10,.5);">

    <!-- PARINTI + NASI (stanga) + LOCATII (dreapta) -->
    <div style="display:grid;grid-template-columns:1fr 2px 1fr;gap:0;margin-bottom:22px;">

      <!-- COLOANA STANGA -->
      <div style="text-align:right;padding-right:30px;">
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:#c8900a;margin-bottom:6px;opacity:.9;">👑 Părinți</p>
        <p style="font-family:'Cinzel',serif;font-size:26px;font-weight:400;color:#fff8e0;line-height:1.3;margin-bottom:18px;text-shadow:0 1px 8px rgba(200,144,10,.3);">${fields.parents}</p>
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:#c8900a;margin-bottom:6px;opacity:.9;">✦ Nași</p>
        <p style="font-family:'Cinzel',serif;font-size:26px;font-weight:400;color:#fff8e0;line-height:1.3;text-shadow:0 1px 8px rgba(200,144,10,.3);">${fields.godparents}</p>
      </div>

      <!-- SEPARATOR VERTICAL -->
      <div style="background:linear-gradient(180deg,transparent,#c8900a 15%,#ffd700 50%,#c8900a 85%,transparent);"></div>

      <!-- COLOANA DREAPTA -->
      <div style="text-align:left;padding-left:30px;">
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:#c8900a;margin-bottom:5px;opacity:.9;">🕊 Sfântul Botez</p>
        <p style="font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;font-style:italic;color:#fff8e0;line-height:1.25;margin-bottom:4px;">${fields.church}</p>
        <p style="font-family:'Quicksand',sans-serif;font-size:19px;font-weight:500;color:#d4a0f8;line-height:1.5;margin-bottom:18px;">${formatDate(fields.churchDate)}<br>ora ${fields.churchTime}</p>
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:#c8900a;margin-bottom:5px;opacity:.9;">🎉 Petrecere</p>
        <p style="font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;font-style:italic;color:#fff8e0;line-height:1.25;margin-bottom:4px;">${fields.restaurant}</p>
        <p style="font-family:'Quicksand',sans-serif;font-size:19px;font-weight:500;color:#d4a0f8;line-height:1.5;">${formatDate(fields.restaurantDate)}<br>ora ${fields.restaurantTime}</p>
      </div>
    </div>

    <!-- LINIE CONTACT -->
    <div style="border-top:1px solid rgba(200,144,10,.4);padding-top:16px;">
      <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.42em;text-transform:uppercase;color:#c8900a;margin-bottom:5px;">Confirmați prezența</p>
      <p style="font-family:'Cinzel',serif;font-size:32px;font-weight:700;color:#ffd700;letter-spacing:.06em;text-shadow:0 0 20px rgba(255,215,0,.4);">${fields.contact}</p>
    </div>

  </div>
</div>

</div>
</body>
</html>`
}