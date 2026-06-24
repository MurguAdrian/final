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

export function buildHTML_rustic(fields: Record<string, string>): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #c8a96e; font-family: 'Cormorant Garamond', serif; }
.inv {
  width: 794px; height: 1123px;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
}

/* ── CONTINUT ── */
.content {
  position: relative; z-index: 4;
  text-align: center; width: 100%;
  padding: 52px 90px 48px;
  display: flex; flex-direction: column;
  align-items: center;
}

.pre-title {
  font-family: 'Raleway', sans-serif;
  font-size: 12px; font-weight: 400;
  letter-spacing: .32em; text-transform: uppercase;
  color: #5a3a1a; opacity: .75;
  margin-bottom: 16px;
}

/* Cheie Sol decorativa */
.treble-clef {
  font-size: 64px; line-height: 1;
  color: #8b5e2e; opacity: .6;
  margin-bottom: 8px;
  font-family: serif;
}

/* Separatori portativ */
.staff {
  width: 100%;
  margin: 14px 0;
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
}
.staff-lines {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.staff-line {
  width: 100%;
  height: 1px;
  background: #5a3a1a;
  opacity: .35;
}
/* Note muzicale pe portativ */
.note {
  position: absolute;
  font-size: 28px;
  color: #3a2010;
  opacity: .55;
  top: -8px;
}

.names-block {
  margin: 6px 0 4px;
}
/* f-uri de vioara ca incadrament */
.violin-f {
  font-family: 'IM Fell English', serif;
  font-size: 72px;
  color: #8b5e2e;
  opacity: .55;
  line-height: 1;
  vertical-align: middle;
  display: inline-block;
  margin: 0 12px;
}
.name-groom {
  font-family: 'Playfair Display', serif;
  font-size: 80px; font-weight: 400; font-style: italic;
  color: #1a0e06; line-height: 1;
  display: block;
}
.amp {
  font-family: 'Cormorant Garamond', serif;
  font-size: 64px; font-weight: 300; font-style: italic;
  color: #8b5e2e; display: block;
  line-height: 1; margin: 2px 0;
}
.name-bride {
  font-family: 'Playfair Display', serif;
  font-size: 80px; font-weight: 400; font-style: italic;
  color: #1a0e06; line-height: 1;
  display: block;
}

.invite-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 300; font-style: italic;
  color: #3a2010; letter-spacing: .06em;
  margin: 14px 0 6px;
}

.sep-ornament {
  font-size: 28px; color: #8b5e2e; opacity: .6;
  margin: 8px 0; letter-spacing: 8px;
}

.date-line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px; font-weight: 600;
  color: #1a0e06; letter-spacing: .06em;
  margin-bottom: 10px;
}

.section-label {
  font-family: 'Raleway', sans-serif;
  font-size: 11px; font-weight: 400;
  letter-spacing: .28em; text-transform: uppercase;
  color: #5a3a1a; opacity: .7;
  margin-bottom: 4px;
}
.section-val {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px; font-weight: 400; font-style: italic;
  color: #1a0e06; line-height: 1.5;
  margin-bottom: 14px;
}
.section-val.sm {
  font-size: 22px; margin-bottom: 10px;
}
.event-row {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-style: italic;
  color: #3a2010; line-height: 1.7;
}

.rsvp-block {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-style: italic;
  color: #5a3a1a; line-height: 1.8;
  margin-top: 6px;
}
.rsvp-block strong {
  font-style: normal; color: #1a0e06; font-weight: 600;
}
</style>
</head>
<body>
<div class="inv">

  <!-- ── FUNDAL KRAFT + WATERMARK MUZICAL ── -->
  <svg style="position:absolute;inset:0;width:100%;height:100%;z-index:0;" viewBox="0 0 794 1123" preserveAspectRatio="none">
    <defs>
      <!-- Gradient kraft texturat -->
      <linearGradient id="kraft-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#d4b07a"/>
        <stop offset="30%" stop-color="#c8a060"/>
        <stop offset="60%" stop-color="#be9458"/>
        <stop offset="100%" stop-color="#c4a068"/>
      </linearGradient>
      <!-- Textura grain -->
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
        <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend"/>
        <feComposite in="blend" in2="SourceGraphic" operator="in"/>
      </filter>
      <filter id="blur-soft"><feGaussianBlur stdDeviation="3"/></filter>
      <filter id="blur-heavy"><feGaussianBlur stdDeviation="8"/></filter>
    </defs>

    <!-- Fundal kraft -->
    <rect width="794" height="1123" fill="url(#kraft-grad)"/>
    <!-- Textura suprapusa -->
    <rect width="794" height="1123" fill="#c09050" opacity=".15" filter="url(#grain)"/>
    <!-- Pete mai inchise organic -->
    <ellipse cx="200" cy="300" rx="250" ry="180" fill="#a07840" opacity=".12" filter="url(#blur-heavy)"/>
    <ellipse cx="600" cy="800" rx="220" ry="160" fill="#8a6030" opacity=".1" filter="url(#blur-heavy)"/>
    <ellipse cx="700" cy="200" rx="150" ry="120" fill="#b08850" opacity=".1" filter="url(#blur-heavy)"/>

    <!-- ── MARGINI FRANJURATE (hârtie ruptă) ── -->
    <!-- Sus -->
    <path d="M0 0 Q30 12 60 5 Q90 -2 120 8 Q150 18 180 6 Q210 -4 240 10 Q270 24 300 8 Q330 -4 360 12 Q390 28 420 8 Q450 -8 480 10 Q510 28 540 6 Q570 -8 600 12 Q630 32 660 8 Q690 -8 720 12 Q750 32 780 8 Q794 4 794 0 L0 0Z"
      fill="#e8c888" opacity=".45"/>
    <path d="M0 0 Q25 18 55 8 Q85 -2 115 14 Q145 30 175 10 Q205 -6 235 16 Q265 38 295 12 Q325 -8 355 18 Q385 44 415 14 Q445 -8 475 18 Q505 44 535 12 Q565 -16 595 18 Q625 52 655 16 Q685 -10 715 18 Q745 46 775 14 Q794 6 794 0 L0 0Z"
      fill="#f0d090" opacity=".3"/>

    <!-- Jos -->
    <path d="M0 1123 Q30 1111 60 1118 Q90 1125 120 1115 Q150 1105 180 1117 Q210 1129 240 1113 Q270 1097 300 1115 Q330 1133 360 1111 Q390 1089 420 1115 Q450 1141 480 1113 Q510 1085 540 1117 Q570 1149 600 1115 Q630 1081 660 1115 Q690 1149 720 1115 Q750 1081 780 1115 Q794 1123 794 1123 L0 1123Z"
      fill="#e8c888" opacity=".45"/>

    <!-- ── WATERMARK: PORTATIV pe fundal ── -->
    <!-- 5 linii portativ - discret -->
    <g opacity=".12">
      <line x1="40" y1="380" x2="754" y2="380" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="395" x2="754" y2="395" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="410" x2="754" y2="410" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="425" x2="754" y2="425" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="440" x2="754" y2="440" stroke="#3a2010" stroke-width="1.2"/>
    </g>
    <!-- Al doilea portativ jos -->
    <g opacity=".1">
      <line x1="40" y1="720" x2="754" y2="720" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="735" x2="754" y2="735" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="750" x2="754" y2="750" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="765" x2="754" y2="765" stroke="#3a2010" stroke-width="1.2"/>
      <line x1="40" y1="780" x2="754" y2="780" stroke="#3a2010" stroke-width="1.2"/>
    </g>

    <!-- ── SILUETA VIOARA - dreapta jos discreta ── -->
    <g transform="translate(610, 780) scale(0.7)" opacity=".14">
      <!-- Corp vioara -->
      <path d="M60 0 C80 0 95 15 95 35 C95 50 85 60 75 68 C85 78 92 90 92 105 C92 130 75 148 60 148 C45 148 28 130 28 105 C28 90 35 78 45 68 C35 60 25 50 25 35 C25 15 40 0 60 0Z"
        fill="none" stroke="#3a1a08" stroke-width="3"/>
      <!-- Gat vioara -->
      <rect x="55" y="148" width="10" height="80" fill="none" stroke="#3a1a08" stroke-width="2"/>
      <!-- Capul viorii -->
      <path d="M55 228 C50 240 45 250 50 258 C55 266 65 258 60 248" fill="none" stroke="#3a1a08" stroke-width="2"/>
      <!-- f-urile viorii -->
      <text x="38" y="95" font-family="serif" font-size="22" font-style="italic" fill="#3a1a08">ƒ</text>
      <text x="72" y="95" font-family="serif" font-size="22" font-style="italic" fill="#3a1a08" transform="scale(-1,1) translate(-144,0)">ƒ</text>
      <!-- Cordiera -->
      <line x1="60" y1="40" x2="60" y2="145" stroke="#3a1a08" stroke-width="1" opacity=".5"/>
      <line x1="48" y1="80" x2="72" y2="80" stroke="#3a1a08" stroke-width="1.5"/>
    </g>

    <!-- Note muzicale watermark decorative -->
    <text x="80" y="370" font-family="serif" font-size="32" fill="#3a2010" opacity=".12" transform="rotate(-5 80 370)">♩</text>
    <text x="200" y="360" font-family="serif" font-size="28" fill="#3a2010" opacity=".1">♪</text>
    <text x="350" y="375" font-family="serif" font-size="36" fill="#3a2010" opacity=".1" transform="rotate(3 350 375)">♫</text>
    <text x="500" y="362" font-family="serif" font-size="28" fill="#3a2010" opacity=".1">♩</text>
    <text x="640" y="370" font-family="serif" font-size="32" fill="#3a2010" opacity=".12">♪</text>

    <!-- ── BORDURA DECORATIVA ── -->
    <!-- Chenar exterior dublu -->
    <rect x="28" y="28" width="738" height="1067" fill="none" stroke="#5a3a1a" stroke-width="1.5" opacity=".45"/>
    <rect x="38" y="38" width="718" height="1047" fill="none" stroke="#5a3a1a" stroke-width=".7" opacity=".3"/>

    <!-- Coltuleti ornamentale kraft -->
    <g opacity=".5">
      <!-- TL -->
      <path d="M28 80 L28 28 L80 28" stroke="#5a3a1a" stroke-width="2.5" fill="none"/>
      <circle cx="28" cy="28" r="4" fill="#8b5e2e" opacity=".6"/>
      <!-- TR -->
      <path d="M714 28 L766 28 L766 80" stroke="#5a3a1a" stroke-width="2.5" fill="none"/>
      <circle cx="766" cy="28" r="4" fill="#8b5e2e" opacity=".6"/>
      <!-- BL -->
      <path d="M28 1043 L28 1095 L80 1095" stroke="#5a3a1a" stroke-width="2.5" fill="none"/>
      <circle cx="28" cy="1095" r="4" fill="#8b5e2e" opacity=".6"/>
      <!-- BR -->
      <path d="M714 1095 L766 1095 L766 1043" stroke="#5a3a1a" stroke-width="2.5" fill="none"/>
      <circle cx="766" cy="1095" r="4" fill="#8b5e2e" opacity=".6"/>
    </g>

    <!-- ── CHEIE SOL watermark centru ── -->
    <text x="397" y="620" text-anchor="middle" font-family="serif" font-size="280" fill="#3a2010" opacity=".05">𝄞</text>
  </svg>

  <!-- ── CONTENT ── -->
  <div class="content">

    <p class="pre-title">Cu dragoste vă invită</p>

    <!-- Portativ decorativ sus -->
    <div style="width:100%;position:relative;height:28px;margin-bottom:8px;">
      <svg viewBox="0 0 614 28" width="100%" height="28" fill="none">
        <!-- 5 linii portativ -->
        <line x1="0" y1="4" x2="614" y2="4" stroke="#5a3a1a" stroke-width="1" opacity=".4"/>
        <line x1="0" y1="10" x2="614" y2="10" stroke="#5a3a1a" stroke-width="1" opacity=".4"/>
        <line x1="0" y1="16" x2="614" y2="16" stroke="#5a3a1a" stroke-width="1" opacity=".4"/>
        <line x1="0" y1="22" x2="614" y2="22" stroke="#5a3a1a" stroke-width="1" opacity=".4"/>
        <line x1="0" y1="28" x2="614" y2="28" stroke="#5a3a1a" stroke-width="1" opacity=".4"/>
        <!-- Cheie Sol mica stanga -->
        <text x="4" y="26" font-family="serif" font-size="32" fill="#8b5e2e" opacity=".65">𝄞</text>
        <!-- Note decorative -->
        <text x="60" y="8" font-family="serif" font-size="18" fill="#3a2010" opacity=".5">♩</text>
        <text x="110" y="14" font-family="serif" font-size="16" fill="#3a2010" opacity=".45">♪</text>
        <text x="160" y="6" font-family="serif" font-size="20" fill="#3a2010" opacity=".45">♫</text>
        <text x="220" y="12" font-family="serif" font-size="16" fill="#3a2010" opacity=".4">♩</text>
        <text x="270" y="20" font-family="serif" font-size="18" fill="#3a2010" opacity=".4">♪</text>
        <text x="330" y="8" font-family="serif" font-size="16" fill="#3a2010" opacity=".45">♫</text>
        <text x="385" y="16" font-family="serif" font-size="20" fill="#3a2010" opacity=".4">♩</text>
        <text x="440" y="10" font-family="serif" font-size="16" fill="#3a2010" opacity=".45">♪</text>
        <text x="490" y="22" font-family="serif" font-size="18" fill="#3a2010" opacity=".4">♫</text>
        <text x="545" y="8" font-family="serif" font-size="16" fill="#3a2010" opacity=".45">♩</text>
      </svg>
    </div>

    <!-- Părinți -->
    <p class="section-label">Cu binecuvântarea părinților</p>
    <p class="section-val sm">${fields.parentsGroom}</p>
    <p class="section-val sm">${fields.parentsBride}</p>

    <!-- Separator f-uri vioara + NUME -->
    <div class="names-block">
      <span class="violin-f">ƒ</span>
      <span class="name-groom">${fields.groom}</span>
      <span class="amp">&amp;</span>
      <span class="name-bride">${fields.bride}</span>
      <span class="violin-f" style="transform:scaleX(-1);display:inline-block;">ƒ</span>
    </div>

    <p class="invite-text">vă invită cu drag la nunta lor</p>

    <!-- Portativ separator 2 -->
    <div style="width:100%;position:relative;height:22px;margin:12px 0;">
      <svg viewBox="0 0 614 22" width="100%" height="22" fill="none">
        <line x1="0" y1="3" x2="614" y2="3" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="8" x2="614" y2="8" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="13" x2="614" y2="13" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="18" x2="614" y2="18" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="22" x2="614" y2="22" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <text x="250" y="20" font-family="serif" font-size="26" fill="#8b5e2e" opacity=".55">𝄽</text>
        <text x="290" y="18" font-family="serif" font-size="22" fill="#3a2010" opacity=".4">♩</text>
        <text x="330" y="14" font-family="serif" font-size="26" fill="#8b5e2e" opacity=".5">𝄽</text>
      </svg>
    </div>

    <!-- Nasi -->
    <p class="section-label">Nași de cununie</p>
    <p class="section-val">${fields.nasi}</p>

    <!-- Sep ornament -->
    <p class="sep-ornament">✦ ♪ ✦</p>

    <!-- Data -->
    <p class="date-line">${formatDate(fields.weddingDate)}</p>

    <!-- Locatii -->
    <p class="section-label">Cununie Religioasă</p>
    <p class="section-val sm">${fields.church}</p>
    <p class="event-row">ora ${fields.churchTime}</p>

    <p class="sep-ornament" style="font-size:18px;margin:10px 0;">♫</p>

    <p class="section-label">Recepție</p>
    <p class="section-val sm">${fields.restaurant}</p>
    <p class="event-row">ora ${fields.restTime}</p>

    <!-- Portativ separator 3 -->
    <div style="width:100%;position:relative;height:22px;margin:16px 0 10px;">
      <svg viewBox="0 0 614 22" width="100%" height="22" fill="none">
        <line x1="0" y1="3" x2="614" y2="3" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="8" x2="614" y2="8" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="13" x2="614" y2="13" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="18" x2="614" y2="18" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <line x1="0" y1="22" x2="614" y2="22" stroke="#5a3a1a" stroke-width=".8" opacity=".35"/>
        <text x="4" y="20" font-family="serif" font-size="26" fill="#8b5e2e" opacity=".55">𝄢</text>
        <text x="120" y="16" font-family="serif" font-size="18" fill="#3a2010" opacity=".4">♩</text>
        <text x="200" y="10" font-family="serif" font-size="16" fill="#3a2010" opacity=".35">♪</text>
        <text x="300" y="20" font-family="serif" font-size="20" fill="#3a2010" opacity=".4">♫</text>
        <text x="420" y="12" font-family="serif" font-size="16" fill="#3a2010" opacity=".35">♩</text>
        <text x="520" y="18" font-family="serif" font-size="18" fill="#3a2010" opacity=".4">♪</text>
      </svg>
    </div>

    <!-- RSVP -->
    <p class="rsvp-block">
      Confirmați prezența până la <strong>${formatRsvp(fields.rsvpDate)}</strong><br/>
      Tel: <strong>${fields.rsvpTel}</strong>
    </p>

  </div>

</div>
</body>
</html>`
}