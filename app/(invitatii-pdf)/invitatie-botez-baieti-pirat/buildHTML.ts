const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function buildHTML_pirat(fields: Record<string, string>): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Pirata+One&family=Cinzel:wght@400;700;900&family=Uncial+Antiqua&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; }
.inv { width: 794px; height: 1123px; position: relative; overflow: hidden; }
</style>
</head>
<body>
<div class="inv">

<svg style="position:absolute;inset:0;width:100%;height:100%;z-index:0;" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="parchment" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#f5e6c8"/>
    <stop offset="35%" stop-color="#edd9a3"/>
    <stop offset="65%" stop-color="#e8d090"/>
    <stop offset="100%" stop-color="#d4b86a"/>
  </linearGradient>
  <linearGradient id="parchment-edge" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#c9a84c"/>
    <stop offset="100%" stop-color="#8b6914"/>
  </linearGradient>
  <radialGradient id="burn-tl" cx="0%" cy="0%" r="50%">
    <stop offset="0%" stop-color="#5a3010" stop-opacity=".55"/>
    <stop offset="100%" stop-color="#5a3010" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="burn-tr" cx="100%" cy="0%" r="50%">
    <stop offset="0%" stop-color="#4a2808" stop-opacity=".5"/>
    <stop offset="100%" stop-color="#4a2808" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="burn-bl" cx="0%" cy="100%" r="50%">
    <stop offset="0%" stop-color="#5a3010" stop-opacity=".5"/>
    <stop offset="100%" stop-color="#5a3010" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="burn-br" cx="100%" cy="100%" r="50%">
    <stop offset="0%" stop-color="#4a2808" stop-opacity=".55"/>
    <stop offset="100%" stop-color="#4a2808" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#5b8fa8" stop-opacity=".6"/>
    <stop offset="100%" stop-color="#3a6a88" stop-opacity=".8"/>
  </linearGradient>
  <linearGradient id="island" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#8ab840"/>
    <stop offset="60%" stop-color="#c8a840"/>
    <stop offset="100%" stop-color="#a08020"/>
  </linearGradient>
  <radialGradient id="treasure-glow" cx="50%" cy="40%" r="60%">
    <stop offset="0%" stop-color="#ffd700" stop-opacity=".5"/>
    <stop offset="100%" stop-color="#ffd700" stop-opacity="0"/>
  </radialGradient>
  <filter id="paper-grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="5" result="noise"/>
    <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
    <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend"/>
    <feComposite in="blend" in2="SourceGraphic" operator="in"/>
  </filter>
  <filter id="ink-shadow">
    <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#3a1808" flood-opacity=".35"/>
  </filter>
  <filter id="treasure-filter">
    <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#c8900a" flood-opacity=".6"/>
  </filter>
</defs>

<!-- ══ FUNDAL PERGAMENT ══ -->
<rect width="794" height="1123" fill="url(#parchment)"/>
<!-- Textura grain hartie -->
<rect width="794" height="1123" fill="#c09040" opacity=".08" filter="url(#paper-grain)"/>
<!-- Vigneta colturi arse -->
<rect width="794" height="1123" fill="url(#burn-tl)"/>
<rect width="794" height="1123" fill="url(#burn-tr)"/>
<rect width="794" height="1123" fill="url(#burn-bl)"/>
<rect width="794" height="1123" fill="url(#burn-br)"/>

<!-- ══ MARGINI PERGAMENT RUPTE/ARSE ══ -->
<!-- Sus -->
<path d="M0 0 Q15 8 30 3 Q45 -2 60 6 Q75 14 90 4 Q105 -4 120 8 Q135 20 150 6 Q165 -6 180 10 Q195 26 210 8 Q225 -4 240 12 Q255 28 270 10 Q285 -4 300 14 Q315 32 330 12 Q345 -4 360 16 Q375 36 390 14 Q405 -4 420 18 Q435 40 450 16 Q465 -4 480 14 Q495 32 510 12 Q525 -4 540 16 Q555 36 570 14 Q585 -6 600 12 Q615 30 630 10 Q645 -8 660 8 Q675 24 690 6 Q705 -8 720 8 Q735 24 750 4 Q765 -12 780 6 Q790 14 794 10 L794 0 L0 0 Z" fill="#c09848" opacity=".55"/>
<!-- Ardere suplimentara sus -->
<path d="M0 0 Q20 15 40 8 Q60 1 80 12 Q100 23 120 12 Q140 1 160 14 Q180 27 200 14 Q220 1 240 18 Q260 35 280 18 Q300 1 320 16 Q340 31 360 16 Q380 1 400 18 Q420 35 440 18 Q460 1 480 16 Q500 31 520 16 Q540 1 560 14 Q580 27 600 12 Q620 -1 640 10 Q660 21 680 8 Q700 -3 720 10 Q740 23 760 8 Q780 -5 794 6 L794 0 L0 0 Z" fill="#8a6020" opacity=".3"/>

<!-- Jos -->
<path d="M0 1123 Q20 1115 40 1120 Q60 1125 80 1116 Q100 1107 120 1118 Q140 1129 160 1116 Q180 1103 200 1116 Q220 1129 240 1114 Q260 1099 280 1114 Q300 1129 320 1112 Q340 1095 360 1112 Q380 1129 400 1110 Q420 1091 440 1110 Q460 1129 480 1112 Q500 1095 520 1112 Q540 1129 560 1116 Q580 1103 600 1116 Q620 1129 640 1118 Q660 1107 680 1118 Q700 1129 720 1114 Q740 1099 760 1114 Q780 1129 794 1118 L794 1123 L0 1123 Z" fill="#c09848" opacity=".55"/>
<path d="M0 1123 Q25 1112 50 1118 Q75 1124 100 1113 Q125 1102 150 1113 Q175 1124 200 1111 Q225 1098 250 1111 Q275 1124 300 1109 Q325 1094 350 1109 Q375 1124 400 1107 Q425 1090 450 1107 Q475 1124 500 1111 Q525 1098 550 1111 Q575 1124 600 1113 Q625 1102 650 1113 Q675 1124 700 1113 Q725 1102 750 1113 Q775 1124 794 1118 L794 1123 L0 1123 Z" fill="#8a6020" opacity=".3"/>

<!-- ══ HARTĂ GEOGRAFICĂ (linii cost, oceane) ══ -->
<!-- Ocean - zona stanga -->
<path d="M80 200 Q120 180 160 220 Q200 260 180 300 Q160 340 120 320 Q80 300 70 260 Q60 220 80 200 Z" fill="url(#water)" opacity=".5"/>
<!-- Insula mare - centru stanga -->
<path d="M100 310 Q150 280 200 300 Q250 320 260 370 Q270 420 220 440 Q170 460 130 430 Q90 400 85 360 Q80 320 100 310 Z" fill="url(#island)" opacity=".7"/>
<!-- Contur insula -->
<path d="M100 310 Q150 280 200 300 Q250 320 260 370 Q270 420 220 440 Q170 460 130 430 Q90 400 85 360 Q80 320 100 310 Z" fill="none" stroke="#5a3a10" stroke-width="1.5" opacity=".6"/>

<!-- Ocean dreapta sus -->
<path d="M500 150 Q560 130 620 160 Q680 190 690 240 Q700 290 650 310 Q600 330 550 300 Q500 270 490 220 Q480 170 500 150 Z" fill="url(#water)" opacity=".45"/>

<!-- Peninsula dreapta -->
<path d="M620 280 Q680 260 730 290 Q760 310 750 360 Q740 400 700 410 Q660 420 640 390 Q620 360 610 320 Q600 280 620 280 Z" fill="url(#island)" opacity=".65"/>
<path d="M620 280 Q680 260 730 290 Q760 310 750 360 Q740 400 700 410 Q660 420 640 390 Q620 360 610 320 Q600 280 620 280 Z" fill="none" stroke="#5a3a10" stroke-width="1.5" opacity=".5"/>

<!-- Insula mica jos stanga -->
<path d="M60 700 Q100 680 140 700 Q170 720 165 750 Q160 780 120 790 Q80 800 60 770 Q40 740 60 700 Z" fill="url(#island)" opacity=".6"/>
<path d="M60 700 Q100 680 140 700 Q170 720 165 750 Q160 780 120 790 Q80 800 60 770 Q40 740 60 700 Z" fill="none" stroke="#5a3a10" stroke-width="1.2" opacity=".5"/>

<!-- ══ LINII HARTA (rute pirat, linii de navigatie) ══ -->
<!-- Ruta principala punctata -->
<path d="M120 440 Q200 500 280 480 Q360 460 420 520 Q480 580 530 560 Q580 540 600 600" stroke="#8b4513" stroke-width="2" fill="none" stroke-dasharray="8,5" opacity=".6"/>
<!-- Ruta secundara -->
<path d="M600 600 Q640 640 660 680 Q680 720 640 740" stroke="#8b4513" stroke-width="1.5" fill="none" stroke-dasharray="6,4" opacity=".5"/>
<!-- Sageata ruta -->
<path d="M595 595 L610 600 L600 612" stroke="#8b4513" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>

<!-- ══ ROZA VÂNTURILOR ══ -->
<g transform="translate(680, 820)" opacity=".6">
  <!-- Cerc exterior -->
  <circle r="55" fill="none" stroke="#5a3010" stroke-width="1"/>
  <circle r="42" fill="none" stroke="#5a3010" stroke-width=".5" opacity=".5"/>
  <circle r="28" fill="#edd9a3" opacity=".8"/>
  <circle r="28" fill="none" stroke="#5a3010" stroke-width="1"/>
  <!-- Sagetile principale -->
  <path d="M0,-55 L7,-30 L0,-20 L-7,-30 Z" fill="#5a3010"/>
  <path d="M0,55 L5,32 L0,22 L-5,32 Z" fill="#5a3010" opacity=".7"/>
  <path d="M-55,0 L-32,5 L-22,0 L-32,-5 Z" fill="#5a3010" opacity=".7"/>
  <path d="M55,0 L32,7 L22,0 L32,-7 Z" fill="#c8900a"/>
  <!-- Litera N -->
  <text x="0" y="-62" text-anchor="middle" font-family="Cinzel,serif" font-size="13" font-weight="700" fill="#5a3010">N</text>
  <text x="62" y="4" text-anchor="start" font-family="Cinzel,serif" font-size="11" fill="#5a3010">E</text>
  <text x="0" y="72" text-anchor="middle" font-family="Cinzel,serif" font-size="11" fill="#5a3010">S</text>
  <text x="-64" y="4" text-anchor="end" font-family="Cinzel,serif" font-size="11" fill="#5a3010">V</text>
  <!-- Punct central -->
  <circle r="5" fill="#c8900a"/>
  <circle r="2" fill="#5a3010"/>
  <!-- Linii diagonale subtile -->
  <line x1="-38" y1="-38" x2="38" y2="38" stroke="#5a3010" stroke-width=".7" opacity=".4"/>
  <line x1="38" y1="-38" x2="-38" y2="38" stroke="#5a3010" stroke-width=".7" opacity=".4"/>
</g>

<!-- ══ CORABIE PIRAT (silueta eleganta) ══ -->
<g transform="translate(380, 570)" opacity=".8" filter="url(#ink-shadow)">
  <!-- Corp corabie - cala -->
  <path d="M-80 40 Q-90 60 -85 80 Q-60 95 0 100 Q60 95 85 80 Q90 60 80 40 Z" fill="#5a3010"/>
  <!-- Corp corabie superior -->
  <path d="M-80 40 Q-75 10 -60 0 Q-30 -8 0 -8 Q30 -8 60 0 Q75 10 80 40 Z" fill="#6a3818"/>
  <!-- Balustrada superioara -->
  <path d="M-60 0 L60 0" stroke="#8b4513" stroke-width="3" fill="none"/>
  <rect x="-62" y="-6" width="124" height="6" rx="2" fill="#8b4513"/>

  <!-- Catarg principal -->
  <rect x="-3" y="-120" width="6" height="120" fill="#4a2808"/>
  <!-- Vergea principala -->
  <rect x="-55" y="-98" width="110" height="5" rx="2" fill="#4a2808"/>
  <!-- Vela principala - umflata de vant -->
  <path d="M-52 -93 Q-30 -50 0 -45 Q30 -50 52 -93 Q30 -100 0 -106 Q-30 -100 -52 -93 Z" fill="#f5f0e0" stroke="#c8a840" stroke-width="1"/>
  <!-- Dungi vela -->
  <path d="M-30 -95 Q-15 -65 0 -60 Q15 -65 30 -95" stroke="#c8a840" stroke-width="1" fill="none" opacity=".5"/>

  <!-- Catarg secundar inclinat -->
  <line x1="-40" y1="-8" x2="-65" y2="-80" stroke="#4a2808" stroke-width="5" stroke-linecap="round"/>
  <!-- Vela secundara -->
  <path d="M-42 -12 Q-55 -40 -63 -75 Q-48 -58 -40 -40 Q-38 -25 -42 -12 Z" fill="#f5f0e0" stroke="#c8a840" stroke-width=".8" opacity=".9"/>

  <!-- Pavilion PIRAT pe catarg principal -->
  <rect x="3" y="-118" width="38" height="28" rx="2" fill="#1a1a1a"/>
  <!-- Craniu mic pe pavilion -->
  <ellipse cx="22" cy="-110" rx="7" ry="6" fill="#f5e6c8"/>
  <ellipse cx="22" cy="-107" rx="8" ry="4" fill="#1a1a1a"/>
  <circle cx="19" cy="-112" r="1.5" fill="#1a1a1a"/>
  <circle cx="25" cy="-112" r="1.5" fill="#1a1a1a"/>
  <!-- Oase incrucisate pe pavilion -->
  <line x1="15" y1="-104" x2="29" y2="-98" stroke="#f5e6c8" stroke-width="2" stroke-linecap="round"/>
  <line x1="29" y1="-104" x2="15" y2="-98" stroke="#f5e6c8" stroke-width="2" stroke-linecap="round"/>

  <!-- Geamuri corabie -->
  <circle cx="-45" cy="18" r="5" fill="#c8a840" opacity=".6"/>
  <circle cx="-25" cy="22" r="5" fill="#c8a840" opacity=".6"/>
  <circle cx="-5" cy="24" r="5" fill="#c8a840" opacity=".6"/>
  <circle cx="15" cy="22" r="5" fill="#c8a840" opacity=".6"/>
  <circle cx="35" cy="18" r="5" fill="#c8a840" opacity=".6"/>

  <!-- Valuri sub corabie -->
  <path d="M-90 88 Q-60 78 -30 88 Q0 98 30 88 Q60 78 90 88" stroke="#5b8fa8" stroke-width="2.5" fill="none" opacity=".7"/>
  <path d="M-85 96 Q-55 86 -25 96 Q5 106 35 96 Q65 86 85 96" stroke="#5b8fa8" stroke-width="2" fill="none" opacity=".5"/>
</g>

<!-- ══ X MARKS THE SPOT ══ -->
<g transform="translate(640, 680)" filter="url(#treasure-filter)">
  <!-- Glow comoara -->
  <circle r="40" fill="url(#treasure-glow)"/>
  <!-- X rosu ingrosat -->
  <line x1="-22" y1="-22" x2="22" y2="22" stroke="#8b0000" stroke-width="8" stroke-linecap="round"/>
  <line x1="22" y1="-22" x2="-22" y2="22" stroke="#8b0000" stroke-width="8" stroke-linecap="round"/>
  <line x1="-22" y1="-22" x2="22" y2="22" stroke="#cc0000" stroke-width="5" stroke-linecap="round"/>
  <line x1="22" y1="-22" x2="-22" y2="22" stroke="#cc0000" stroke-width="5" stroke-linecap="round"/>
  <!-- Mic cerc auriu in centru -->
  <circle r="6" fill="#ffd700"/>
  <circle r="3" fill="#c8900a"/>
</g>

<!-- ══ LADA DE COMORI (jos dreapta, decorativa) ══ -->
<g transform="translate(645, 740)" opacity=".75">
  <!-- Corp lada -->
  <rect x="-30" y="-20" width="60" height="40" rx="4" fill="#5a3010"/>
  <!-- Capac arcuit -->
  <path d="M-30 -20 Q-30 -40 0 -40 Q30 -40 30 -20 Z" fill="#6a3818"/>
  <!-- Balama/Ferecatura aurie -->
  <rect x="-8" y="-24" width="16" height="10" rx="2" fill="#c8900a"/>
  <circle cx="0" cy="-19" r="3" fill="#ffd700"/>
  <!-- Colturi metalice -->
  <rect x="-30" y="-22" width="8" height="8" rx="1" fill="#c8900a" opacity=".8"/>
  <rect x="22" y="-22" width="8" height="8" rx="1" fill="#c8900a" opacity=".8"/>
  <rect x="-30" y="14" width="8" height="8" rx="1" fill="#c8900a" opacity=".8"/>
  <rect x="22" y="14" width="8" height="8" rx="1" fill="#c8900a" opacity=".8"/>
  <!-- Monede care ies din lada -->
  <ellipse cx="-10" cy="-26" rx="8" ry="5" fill="#ffd700" opacity=".9"/>
  <ellipse cx="5" cy="-30" rx="8" ry="5" fill="#e8c840" opacity=".9"/>
  <ellipse cx="15" cy="-26" rx="7" ry="4" fill="#ffd700" opacity=".85"/>
  <!-- Stralucire monede -->
  <ellipse cx="-10" cy="-26" rx="4" ry="2" fill="#fffde0" opacity=".5"/>
</g>

<!-- ══ CRANIU DECORATIV (stanga jos) ══ -->
<g transform="translate(95, 780)" opacity=".5">
  <!-- Cap craniu -->
  <ellipse cx="0" cy="-15" rx="22" ry="20" fill="#3a2010"/>
  <!-- Fruntea rotunjita -->
  <ellipse cx="0" cy="-22" rx="20" ry="16" fill="#3a2010"/>
  <!-- Maxilar -->
  <path d="M-18 -5 Q-20 10 -12 16 Q0 20 12 16 Q20 10 18 -5 Z" fill="#3a2010"/>
  <!-- Ochi -->
  <ellipse cx="-8" cy="-16" rx="6" ry="7" fill="#edd9a3"/>
  <ellipse cx="8" cy="-16" rx="6" ry="7" fill="#edd9a3"/>
  <!-- Pupile ochi goale -->
  <ellipse cx="-8" cy="-15" rx="3.5" ry="4.5" fill="#1a1008"/>
  <ellipse cx="8" cy="-15" rx="3.5" ry="4.5" fill="#1a1008"/>
  <!-- Nas -->
  <path d="M-3 -6 L0 -2 L3 -6" fill="none" stroke="#edd9a3" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Dinti -->
  <rect x="-14" y="9" width="6" height="8" rx="1" fill="#edd9a3"/>
  <rect x="-6" y="8" width="6" height="9" rx="1" fill="#edd9a3"/>
  <rect x="2" y="8" width="6" height="9" rx="1" fill="#edd9a3"/>
  <rect x="10" y="9" width="6" height="8" rx="1" fill="#edd9a3"/>
  <!-- Oase incrucisate -->
  <line x1="-35" y1="25" x2="35" y2="-5" stroke="#3a2010" stroke-width="9" stroke-linecap="round"/>
  <line x1="35" y1="25" x2="-35" y2="-5" stroke="#3a2010" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="-38" cy="27" rx="9" ry="7" fill="#3a2010"/>
  <ellipse cx="38" cy="27" rx="9" ry="7" fill="#3a2010"/>
  <ellipse cx="-38" cy="-7" rx="9" ry="7" fill="#3a2010"/>
  <ellipse cx="38" cy="-7" rx="9" ry="7" fill="#3a2010"/>
</g>

<!-- ══ BORDURA PERGAMENT ORNAMENTALA ══ -->
<!-- Chenar dublu -->
<rect x="28" y="28" width="738" height="1067" fill="none" stroke="#8b6914" stroke-width="2.5" opacity=".7"/>
<rect x="36" y="36" width="722" height="1051" fill="none" stroke="#8b6914" stroke-width="1" opacity=".4"/>
<!-- Ornamente colturi -->
<g fill="#8b6914" opacity=".7">
  <!-- TL -->
  <path d="M28 28 L68 28 L28 68 Z"/>
  <path d="M28 28 L55 28 L28 55 Z" fill="#c8900a" opacity=".6"/>
  <!-- TR -->
  <path d="M766 28 L726 28 L766 68 Z"/>
  <path d="M766 28 L739 28 L766 55 Z" fill="#c8900a" opacity=".6"/>
  <!-- BL -->
  <path d="M28 1095 L68 1095 L28 1055 Z"/>
  <path d="M28 1095 L55 1095 L28 1068 Z" fill="#c8900a" opacity=".6"/>
  <!-- BR -->
  <path d="M766 1095 L726 1095 L766 1055 Z"/>
  <path d="M766 1095 L739 1095 L766 1068 Z" fill="#c8900a" opacity=".6"/>
</g>
<!-- Ornamente laterale (mici romburi) -->
<g fill="#8b6914" opacity=".5">
  <polygon points="28,561 38,571 28,581 18,571"/>
  <polygon points="766,561 776,571 766,581 756,571"/>
  <polygon points="397,28 407,38 397,48 387,38"/>
  <polygon points="397,1095 407,1085 397,1075 387,1085"/>
</g>

<!-- Linii ornamentale laterale -->
<line x1="28" y1="100" x2="28" y2="220" stroke="#8b6914" stroke-width="2" opacity=".5"/>
<line x1="766" y1="100" x2="766" y2="220" stroke="#8b6914" stroke-width="2" opacity=".5"/>
<line x1="28" y1="900" x2="28" y2="1020" stroke="#8b6914" stroke-width="2" opacity=".5"/>
<line x1="766" y1="900" x2="766" y2="1020" stroke="#8b6914" stroke-width="2" opacity=".5"/>

</svg>

<!-- ══ CONTENT TEXT ══ -->
<div style="position:absolute;inset:0;z-index:6;display:flex;flex-direction:column;align-items:center;padding:52px 80px 48px;text-align:center;">

  <!-- TITLU SUS -->
  <div style="margin-bottom:16px;">
    <p style="font-family:'Cinzel',serif;font-size:11px;font-weight:400;letter-spacing:.5em;text-transform:uppercase;color:#5a3010;opacity:.7;margin-bottom:8px;">⚓ Invitație de Botez ⚓</p>
    <div style="width:100%;height:2px;background:linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent);margin-bottom:14px;opacity:.7;"></div>

    <!-- TITLU MARE -->
    <p style="font-family:'Pirata One',cursive;font-size:80px;color:#3a1808;line-height:.9;text-shadow:2px 2px 0 #c8900a,4px 4px 0 rgba(139,105,20,.3);letter-spacing:.02em;">${fields.babyName || 'PRENUME'}</p>
    <div style="display:flex;align-items:center;gap:14px;margin:12px 0 8px;">
      <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#8b6914);"></div>
      <span style="font-family:'Cinzel',serif;font-size:18px;color:#8b6914;">☠</span>
      <div style="flex:1;height:1px;background:linear-gradient(90deg,#8b6914,transparent);"></div>
    </div>
    <p style="font-family:'Cinzel',serif;font-size:20px;font-weight:400;font-style:italic;color:#5a3010;letter-spacing:.08em;">a aterizat în port!</p>
  </div>

  <!-- SPATIU LIBER (corabie) -->
  <div style="flex:1;min-height:160px;"></div>

  <!-- INFO JOS - pe pergament -->
  <div style="width:100%;">
    <div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent);margin-bottom:20px;opacity:.6;"></div>

    <!-- Grid 2 col -->
    <div style="display:grid;grid-template-columns:1fr 2px 1fr;gap:0;margin-bottom:18px;">
      <div style="text-align:right;padding-right:28px;">
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#8b6914;margin-bottom:5px;">⚓ Echipaj</p>
        <p style="font-family:'Cinzel',serif;font-size:22px;font-weight:400;color:#3a1808;line-height:1.4;margin-bottom:18px;">${fields.parents}</p>
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#8b6914;margin-bottom:5px;">☠ Nași</p>
        <p style="font-family:'Cinzel',serif;font-size:22px;font-weight:400;color:#3a1808;line-height:1.4;">${fields.godparents}</p>
      </div>
      <div style="background:linear-gradient(180deg,transparent,#8b6914,transparent);"></div>
      <div style="text-align:left;padding-left:28px;">
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#8b6914;margin-bottom:5px;">🕊 Port I — Botez</p>
        <p style="font-family:'Cinzel',serif;font-size:20px;font-weight:400;color:#3a1808;line-height:1.3;margin-bottom:4px;">${fields.church}</p>
        <p style="font-family:'Nunito',sans-serif;font-size:18px;font-weight:400;color:#6a3818;margin-bottom:18px;">${formatDate(fields.churchDate)}, ora ${fields.churchTime}</p>
        <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#8b6914;margin-bottom:5px;">🍖 Port II — Petrecere</p>
        <p style="font-family:'Cinzel',serif;font-size:20px;font-weight:400;color:#3a1808;line-height:1.3;margin-bottom:4px;">${fields.restaurant}</p>
        <p style="font-family:'Nunito',sans-serif;font-size:18px;font-weight:400;color:#6a3818;">${formatDate(fields.restaurantDate)}, ora ${fields.restaurantTime}</p>
      </div>
    </div>

    <div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#8b6914 30%,#c8900a 50%,#8b6914 70%,transparent);margin-bottom:14px;opacity:.6;"></div>
    <p style="font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.38em;text-transform:uppercase;color:#8b6914;margin-bottom:5px;">🗺 Trimite semnal radio</p>
    <p style="font-family:'Cinzel',serif;font-size:28px;font-weight:700;color:#3a1808;letter-spacing:.04em;">${fields.contact}</p>
  </div>
</div>

</div>
</body>
</html>`
}