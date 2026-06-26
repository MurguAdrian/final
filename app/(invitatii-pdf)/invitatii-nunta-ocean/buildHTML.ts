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

export function buildHTML_ocean(fields: Record<string, string>): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #f0f5fa; font-family: 'Raleway', sans-serif; }
.inv {
  width: 794px; height: 1123px; background: #f0f5fa;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center;
  padding: 0 80px 60px;
}

/* ── COROANA SVG sus ── */
.crown-wrap { width: 220px; height: 220px; margin: 0 auto -10px; position: relative; z-index: 2; }

/* Sigiliu ceara albastru */
.seal { position: absolute; right: 60px; bottom: 100px; z-index: 3; width: 90px; height: 90px; }

/* Botanice laterale */
.botanical { position: absolute; inset: 0; z-index: 1; pointer-events: none; }

/* ── TEXT ── */
.content { position: relative; z-index: 2; text-align: center; width: 100%; }

.inv-title {
  font-family: 'Raleway', sans-serif; font-size: 15px; font-weight: 500;
  letter-spacing: .28em; text-transform: uppercase; color: #2a5fa8;
  margin-bottom: 4px;
}
.names-script {
  font-family: 'Playfair Display', serif; font-size: 88px; font-weight: 400; font-style: italic;
  color: #1a3a6a; line-height: 1; display: block; margin-bottom: 8px;
  letter-spacing: .01em;
}
.names-amp {
  font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 400; font-style: italic;
  color: #2a5fa8; display: inline;
}
.tagline {
  font-size: 20px; font-weight: 300; font-style: italic; color: #2a5fa8;
  margin-bottom: 28px; letter-spacing: .04em;
}

.sep { width: 80px; height: 1px; background: #2a5fa8; opacity: .3; margin: 0 auto 24px; }

.date-main {
  font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600;
  color: #1a3a6a; letter-spacing: .04em; margin-bottom: 4px;
}
.time-row {
  font-size: 20px; font-weight: 300; color: #2a5fa8;
  letter-spacing: .06em; margin-bottom: 22px;
}

.event-block { margin-bottom: 18px; }
.event-label {
  font-size: 14px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
  color: #2a5fa8; margin-bottom: 5px;
}
.event-name {
  font-family: 'Playfair Display', serif; font-size: 26px; font-style: italic;
  color: #1a3a6a; line-height: 1.4;
}
.event-time { font-size: 18px; font-weight: 300; color: #4a7ac0; margin-top: 2px; }

.sep2 { width: 60px; height: 1px; background: #2a5fa8; opacity: .25; margin: 20px auto; }

.info-label {
  font-size: 13px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
  color: #2a5fa8; margin-bottom: 6px;
}
.info-val {
  font-family: 'Playfair Display', serif; font-size: 24px; font-style: italic;
  color: #1a3a6a; line-height: 1.5; margin-bottom: 16px;
}

.rsvp {
  font-size: 17px; font-weight: 300; color: #4a7ac0; font-style: italic;
  line-height: 1.9; margin-top: 18px;
}
.rsvp span { color: #1a3a6a; font-weight: 500; font-style: normal; }
</style>
</head>
<body>
<div class="inv">

  <!-- Botanical lateral stanga -->
  <svg class="botanical" viewBox="0 0 794 1123" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- stanga -->
    <g opacity=".75">
      <path d="M-10 200 Q60 240 40 320 Q20 400 80 450" stroke="#4a8fd4" stroke-width="1.8" fill="none"/>
      <path d="M10 320 Q70 350 50 420" stroke="#4a8fd4" stroke-width="1.2" fill="none"/>
      <!-- frunze albastre mari stanga -->
      <ellipse cx="30" cy="250" rx="32" ry="14" fill="#5a9fd4" opacity=".55" transform="rotate(-35 30 250)"/>
      <ellipse cx="55" cy="300" rx="28" ry="12" fill="#3a7fc4" opacity=".5" transform="rotate(20 55 300)"/>
      <ellipse cx="20" cy="360" rx="34" ry="14" fill="#6aaad8" opacity=".5" transform="rotate(-15 20 360)"/>
      <ellipse cx="70" cy="340" rx="24" ry="11" fill="#4a90cc" opacity=".45" transform="rotate(40 70 340)"/>
      <ellipse cx="35" cy="420" rx="30" ry="13" fill="#5a9fd4" opacity=".5" transform="rotate(-25 35 420)"/>
      <ellipse cx="80" cy="400" rx="20" ry="9" fill="#3a7fc4" opacity=".4" transform="rotate(30 80 400)"/>
      <!-- feriga stanga -->
      <path d="M-5 280 Q25 265 38 285 Q25 305 -5 292 Z" fill="#3a6aaa" opacity=".45"/>
      <path d="M5 390 Q40 370 55 395 Q40 418 5 405 Z" fill="#4a80bc" opacity=".4"/>
      <!-- flori mici -->
      <circle cx="45" cy="270" r="7" fill="#8ac0e8" opacity=".6"/>
      <circle cx="25" cy="330" r="6" fill="#6aaad8" opacity=".55"/>
      <circle cx="60" cy="380" r="8" fill="#9acce0" opacity=".5"/>
    </g>
    <!-- dreapta -->
    <g opacity=".75" transform="translate(794,0) scale(-1,1)">
      <path d="M-10 200 Q60 240 40 320 Q20 400 80 450" stroke="#4a8fd4" stroke-width="1.8" fill="none"/>
      <path d="M10 320 Q70 350 50 420" stroke="#4a8fd4" stroke-width="1.2" fill="none"/>
      <ellipse cx="30" cy="250" rx="32" ry="14" fill="#5a9fd4" opacity=".55" transform="rotate(-35 30 250)"/>
      <ellipse cx="55" cy="300" rx="28" ry="12" fill="#3a7fc4" opacity=".5" transform="rotate(20 55 300)"/>
      <ellipse cx="20" cy="360" rx="34" ry="14" fill="#6aaad8" opacity=".5" transform="rotate(-15 20 360)"/>
      <ellipse cx="70" cy="340" rx="24" ry="11" fill="#4a90cc" opacity=".45" transform="rotate(40 70 340)"/>
      <ellipse cx="35" cy="420" rx="30" ry="13" fill="#5a9fd4" opacity=".5" transform="rotate(-25 35 420)"/>
      <ellipse cx="80" cy="400" rx="20" ry="9" fill="#3a7fc4" opacity=".4" transform="rotate(30 80 400)"/>
      <path d="M-5 280 Q25 265 38 285 Q25 305 -5 292 Z" fill="#3a6aaa" opacity=".45"/>
      <path d="M5 390 Q40 370 55 395 Q40 418 5 405 Z" fill="#4a80bc" opacity=".4"/>
      <circle cx="45" cy="270" r="7" fill="#8ac0e8" opacity=".6"/>
      <circle cx="25" cy="330" r="6" fill="#6aaad8" opacity=".55"/>
      <circle cx="60" cy="380" r="8" fill="#9acce0" opacity=".5"/>
    </g>
    <!-- jos stanga -->
    <g opacity=".65" transform="translate(0,1123) scale(1,-1)">
      <path d="M-10 80 Q70 110 50 200 Q30 280 90 310" stroke="#4a8fd4" stroke-width="1.5" fill="none"/>
      <ellipse cx="30" cy="110" rx="28" ry="12" fill="#5a9fd4" opacity=".5" transform="rotate(-30 30 110)"/>
      <ellipse cx="60" cy="160" rx="24" ry="10" fill="#3a7fc4" opacity=".45" transform="rotate(25 60 160)"/>
      <ellipse cx="20" cy="210" rx="30" ry="12" fill="#6aaad8" opacity=".45" transform="rotate(-20 20 210)"/>
      <ellipse cx="80" cy="200" rx="20" ry="9" fill="#4a90cc" opacity=".4" transform="rotate(35 80 200)"/>
      <circle cx="40" cy="130" r="7" fill="#8ac0e8" opacity=".5"/>
      <circle cx="65" cy="185" r="6" fill="#6aaad8" opacity=".45"/>
    </g>
    <!-- jos dreapta -->
    <g opacity=".65" transform="translate(794,1123) scale(-1,-1)">
      <path d="M-10 80 Q70 110 50 200 Q30 280 90 310" stroke="#4a8fd4" stroke-width="1.5" fill="none"/>
      <ellipse cx="30" cy="110" rx="28" ry="12" fill="#5a9fd4" opacity=".5" transform="rotate(-30 30 110)"/>
      <ellipse cx="60" cy="160" rx="24" ry="10" fill="#3a7fc4" opacity=".45" transform="rotate(25 60 160)"/>
      <ellipse cx="20" cy="210" rx="30" ry="12" fill="#6aaad8" opacity=".45" transform="rotate(-20 20 210)"/>
      <ellipse cx="80" cy="200" rx="20" ry="9" fill="#4a90cc" opacity=".4" transform="rotate(35 80 200)"/>
      <circle cx="40" cy="130" r="7" fill="#8ac0e8" opacity=".5"/>
      <circle cx="65" cy="185" r="6" fill="#6aaad8" opacity=".45"/>
    </g>
  </svg>

  <!-- Coroana sus -->
  <div class="crown-wrap">
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- cerc de baza -->
      <circle cx="110" cy="110" r="80" stroke="#4a8fd4" stroke-width="1" opacity=".2" fill="none"/>
      <!-- ramuri coroana -->
      <path d="M50 110 Q70 70 110 60 Q150 70 170 110 Q150 150 110 160 Q70 150 50 110Z" stroke="#4a8fd4" stroke-width="1.2" fill="none" opacity=".4"/>
      <!-- frunze coroana -->
      <ellipse cx="72" cy="78" rx="18" ry="8" fill="#5a9fd4" opacity=".6" transform="rotate(-45 72 78)"/>
      <ellipse cx="90" cy="62" rx="16" ry="7" fill="#3a7fc4" opacity=".55" transform="rotate(-20 90 62)"/>
      <ellipse cx="110" cy="57" rx="14" ry="6" fill="#6aaad8" opacity=".5" transform="rotate(0 110 57)"/>
      <ellipse cx="130" cy="62" rx="16" ry="7" fill="#4a90cc" opacity=".55" transform="rotate(20 130 62)"/>
      <ellipse cx="148" cy="78" rx="18" ry="8" fill="#5a9fd4" opacity=".6" transform="rotate(45 148 78)"/>
      <ellipse cx="158" cy="100" rx="16" ry="7" fill="#3a7fc4" opacity=".5" transform="rotate(65 158 100)"/>
      <ellipse cx="148" cy="142" rx="18" ry="8" fill="#6aaad8" opacity=".55" transform="rotate(135 148 142)"/>
      <ellipse cx="130" cy="158" rx="16" ry="7" fill="#4a90cc" opacity=".5" transform="rotate(160 130 158)"/>
      <ellipse cx="110" cy="163" rx="14" ry="6" fill="#5a9fd4" opacity=".5" transform="rotate(180 110 163)"/>
      <ellipse cx="90" cy="158" rx="16" ry="7" fill="#3a7fc4" opacity=".5" transform="rotate(200 90 158)"/>
      <ellipse cx="72" cy="142" rx="18" ry="8" fill="#6aaad8" opacity=".55" transform="rotate(225 72 142)"/>
      <ellipse cx="62" cy="120" rx="16" ry="7" fill="#4a90cc" opacity=".5" transform="rotate(250 62 120)"/>
      <!-- flori mici coroana -->
      <circle cx="110" cy="57" r="5" fill="#a8d4f0" opacity=".8"/>
      <circle cx="158" cy="110" r="4" fill="#8ac0e8" opacity=".7"/>
      <circle cx="62" cy="110" r="4" fill="#8ac0e8" opacity=".7"/>
      <circle cx="110" cy="163" r="5" fill="#a8d4f0" opacity=".7"/>
      <!-- text INVITATIE DE NUNTA in coroana -->
      <text x="110" y="104" text-anchor="middle" font-family="Raleway, sans-serif" font-size="11" font-weight="500" letter-spacing="3" fill="#2a5fa8" opacity=".9">INVITATIE</text>
      <text x="110" y="122" text-anchor="middle" font-family="Raleway, sans-serif" font-size="11" font-weight="500" letter-spacing="3" fill="#2a5fa8" opacity=".9">DE NUNTĂ</text>
    </svg>
  </div>

  <!-- Sigiliu ceara albastru -->
  <svg class="seal" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="45" r="43" fill="#2a5fa8" opacity=".9"/>
    <circle cx="45" cy="45" r="36" fill="none" stroke="#a8c8e8" stroke-width="1" opacity=".6"/>
    <ellipse cx="45" cy="35" rx="12" ry="18" fill="#a8c8e8" opacity=".7"/>
    <path d="M33 45 Q45 28 57 45" stroke="#a8c8e8" stroke-width="1" fill="none" opacity=".5"/>
    <circle cx="45" cy="45" r="4" fill="#a8c8e8" opacity=".6"/>
  </svg>

  <!-- TEXT -->
  <div class="content">
    <p class="tagline">vă invită cu drag la nunta noastră</p>

    <span class="names-script">${fields.groom} <span class="names-amp">&amp;</span> ${fields.bride}</span>

    <div class="sep"></div>

    <p class="date-main">${formatDate(fields.weddingDate)}</p>

    <div class="event-block">
      <p class="event-label">Cununia Religioasă</p>
      <p class="event-name">${fields.church}</p>
      <p class="event-time">Ora ${fields.churchTime}</p>
    </div>

    <div class="event-block">
      <p class="event-label">Recepție</p>
      <p class="event-name">${fields.restaurant}</p>
      <p class="event-time">Ora ${fields.restTime}</p>
    </div>

    <div class="sep2"></div>

    <p class="info-label">Părinții Mirelui</p>
    <p class="info-val">${fields.parentsGroom}</p>

    <p class="info-label">Părinții Miresei</p>
    <p class="info-val">${fields.parentsBride}</p>

    <p class="info-label">Nași</p>
    <p class="info-val">${fields.nasi}</p>

    <div class="rsvp">
      Confirmați prezența până pe <span>${formatRsvp(fields.rsvpDate)}</span><br/>
      Tel: <span>${fields.rsvpTel}</span>
    </div>
  </div>

</div>
</body>
</html>`
}