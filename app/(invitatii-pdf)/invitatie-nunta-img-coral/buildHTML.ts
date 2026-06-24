const MONTHS = ['IANUARIE','FEBRUARIE','MARTIE','APRILIE','MAI','IUNIE','IULIE','AUGUST','SEPTEMBRIE','OCTOMBRIE','NOIEMBRIE','DECEMBRIE']
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
function getInitials(groom: string, bride: string) {
  return `${(groom || 'M').charAt(0).toUpperCase()} ${(bride || 'S').charAt(0).toUpperCase()}`
}

export function buildHTML_coral(fields: Record<string, string>): string {
  const [init1, init2] = getInitials(fields.groom, fields.bride).split(' ')
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400;1,600&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; font-family: 'Raleway', sans-serif; background: #faf8f5; }
.inv {
  width: 794px; height: 1123px;
  position: relative; overflow: hidden;
  background: #faf8f5;
  display: flex; flex-direction: column;
  align-items: center;
}

/* ── FUNDAL HARTIE ── */
.bg { position: absolute; inset: 0; z-index: 0; }

/* ── COROANA BOTANICA ── */
.wreath { position: absolute; inset: 0; z-index: 1; pointer-events: none; }

/* ── MONOGRAMA ── */
.monogram-wrap {
  position: relative; z-index: 3;
  margin-top: 52px; margin-bottom: 8px;
  width: 110px; height: 110px;
  flex-shrink: 0;
}

/* ── CONTENT ── */
.content {
  position: relative; z-index: 3;
  text-align: center; width: 100%;
  padding: 0 80px;
  flex: 1;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}

.inv-title {
  font-family: 'Raleway', sans-serif;
  font-size: 13px; font-weight: 600;
  letter-spacing: .28em; text-transform: uppercase;
  color: #6b4c1e; margin-bottom: 16px;
}

.name-groom {
  font-family: 'Playfair Display', serif;
  font-size: 84px; font-weight: 700; font-style: italic;
  color: #1a1208; line-height: 1; display: block;
  letter-spacing: .01em;
}
.name-script-amp {
  font-family: 'Cormorant Garamond', serif;
  font-size: 72px; font-weight: 400; font-style: italic;
  color: #b8860b; display: inline-block;
  line-height: 1; vertical-align: middle;
  margin: 0 -4px;
}
.name-bride {
  font-family: 'Playfair Display', serif;
  font-size: 84px; font-weight: 700; font-style: italic;
  color: #1a1208; line-height: 1; display: block;
  letter-spacing: .01em;
}

/* Ornament floral mic sub nume */
.ornament {
  color: #b8860b; font-size: 22px; opacity: .7;
  margin: 6px 0 14px; display: block;
}

.tagline {
  font-size: 18px; font-weight: 300; font-style: italic;
  color: #4a3a2a; letter-spacing: .04em; margin-bottom: 20px;
}

/* Caseta data/loc */
.info-box {
  border: 1.5px solid #b8860b;
  border-radius: 2px;
  padding: 14px 32px;
  margin-bottom: 20px;
  position: relative;
  background: rgba(255,255,255,.5);
}
.info-box::before, .info-box::after {
  content: '◆';
  position: absolute; top: 50%; transform: translateY(-50%);
  color: #b8860b; font-size: 10px; opacity: .8;
}
.info-box::before { left: -6px; }
.info-box::after { right: -6px; }

.info-date {
  font-family: 'Raleway', sans-serif;
  font-size: 17px; font-weight: 600;
  letter-spacing: .08em; color: #1a1208;
  text-transform: uppercase; margin-bottom: 6px;
}
.info-line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-style: italic;
  color: #2a1a0a; line-height: 1.6;
}

.sep { width: 60px; height: 1px; background: #b8860b; opacity: .4; margin: 14px auto; }

.section-label {
  font-family: 'Raleway', sans-serif;
  font-size: 11px; font-weight: 600;
  letter-spacing: .22em; text-transform: uppercase;
  color: #6b4c1e; margin-bottom: 4px;
}
.section-val {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-style: italic;
  color: #1a1208; line-height: 1.5;
  margin-bottom: 10px;
}

.rsvp {
  font-size: 13px; font-weight: 500;
  letter-spacing: .14em; text-transform: uppercase;
  color: #6b4c1e; margin-top: 14px;
  line-height: 1.8;
}
.rsvp-web {
  font-size: 14px; font-style: italic;
  color: #b8860b; font-family: 'Cormorant Garamond', serif;
  font-weight: 400; letter-spacing: .02em;
}
</style>
</head>
<body>
<div class="inv">

  <!-- Fundal hârtie texturata -->
  <svg class="bg" viewBox="0 0 794 1123" preserveAspectRatio="none">
    <rect width="794" height="1123" fill="#faf8f5"/>
    <!-- vigneta margini -->
    <rect width="794" height="1123" fill="none" stroke="#e8dfc8" stroke-width="2" opacity=".5"/>
    <defs>
      <radialGradient id="vg" cx="50%" cy="50%" r="70%">
        <stop offset="60%" stop-color="transparent"/>
        <stop offset="100%" stop-color="#d4c8a8" stop-opacity=".25"/>
      </radialGradient>
    </defs>
    <rect width="794" height="1123" fill="url(#vg)"/>
    <!-- margini neregulate hartie -->
    <path d="M0 0 Q16 8 4 22 Q12 40 0 58 Q16 76 2 94 Q10 112 0 130 L0 0Z" fill="#ede5d0" opacity=".6"/>
    <path d="M794 0 Q778 12 790 28 Q782 46 794 62 Q778 80 792 96 Q784 114 794 130 L794 0Z" fill="#ede5d0" opacity=".6"/>
    <path d="M0 1123 Q16 1112 2 1098 Q12 1084 0 1070 Q16 1056 2 1042 L0 1123Z" fill="#ede5d0" opacity=".6"/>
    <path d="M794 1123 Q778 1110 792 1096 Q782 1082 794 1068 Q778 1054 792 1040 L794 1123Z" fill="#ede5d0" opacity=".6"/>
  </svg>

  <!-- ══ COROANA BOTANICA SVG ══ -->
  <svg class="wreath" viewBox="0 0 794 1123" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradient albastru-mov acuarela stanga -->
      <radialGradient id="blob1" cx="30%" cy="25%" r="70%">
        <stop offset="0%" stop-color="#4a2d7a" stop-opacity=".7"/>
        <stop offset="40%" stop-color="#6a3a9a" stop-opacity=".5"/>
        <stop offset="100%" stop-color="#3a1a6a" stop-opacity="0"/>
      </radialGradient>
      <!-- Gradient coral-portocaliu dreapta -->
      <radialGradient id="blob2" cx="70%" cy="25%" r="70%">
        <stop offset="0%" stop-color="#c87040" stop-opacity=".65"/>
        <stop offset="40%" stop-color="#d4884a" stop-opacity=".45"/>
        <stop offset="100%" stop-color="#b85a20" stop-opacity="0"/>
      </radialGradient>
      <!-- Gradient verde-teal jos stanga -->
      <radialGradient id="blob3" cx="20%" cy="80%" r="60%">
        <stop offset="0%" stop-color="#1a5a4a" stop-opacity=".6"/>
        <stop offset="100%" stop-color="#2a7a5a" stop-opacity="0"/>
      </radialGradient>
      <!-- Gradient mov-inchis jos dreapta -->
      <radialGradient id="blob4" cx="80%" cy="80%" r="60%">
        <stop offset="0%" stop-color="#5a2a7a" stop-opacity=".65"/>
        <stop offset="100%" stop-color="#3a1a5a" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur-sm"><feGaussianBlur stdDeviation="8"/></filter>
      <filter id="blur-md"><feGaussianBlur stdDeviation="14"/></filter>
    </defs>

    <!-- ── Pete acuarela de fundal ── -->
    <!-- Stanga sus - mov albastru -->
    <ellipse cx="140" cy="200" rx="180" ry="140" fill="url(#blob1)" filter="url(#blur-md)" opacity=".85"/>
    <ellipse cx="80" cy="280" rx="120" ry="100" fill="#5a2a8a" opacity=".4" filter="url(#blur-sm)"/>
    <!-- Dreapta sus - coral -->
    <ellipse cx="660" cy="180" rx="160" ry="130" fill="url(#blob2)" filter="url(#blur-md)" opacity=".85"/>
    <ellipse cx="720" cy="260" rx="110" ry="90" fill="#c86840" opacity=".4" filter="url(#blur-sm)"/>
    <!-- Jos stanga - verde inchis -->
    <ellipse cx="120" cy="900" rx="160" ry="120" fill="url(#blob3)" filter="url(#blur-md)" opacity=".8"/>
    <!-- Jos dreapta - mov -->
    <ellipse cx="680" cy="880" rx="150" ry="120" fill="url(#blob4)" filter="url(#blur-md)" opacity=".8"/>
    <ellipse cx="740" cy="960" rx="100" ry="80" fill="#6a3a9a" opacity=".35" filter="url(#blur-sm)"/>

    <!-- ── FRUNZE FERIGA stanga sus ── -->
    <g opacity=".9">
      <!-- Frunza feriga mare stanga -->
      <path d="M50 80 Q120 140 80 240 Q60 290 90 340" stroke="#2d4a1e" stroke-width="1.5" fill="none"/>
      <path d="M80 140 Q50 125 35 110" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M80 140 Q108 128 118 115" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 165 Q48 152 32 140" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 165 Q106 155 116 143" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 190 Q46 178 30 166" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 190 Q104 181 114 170" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M74 215 Q50 204 36 193" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M74 215 Q100 207 108 197" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M72 238 Q52 228 40 218" stroke="#3a5a28" stroke-width=".8" fill="none"/>
      <path d="M72 238 Q96 231 104 222" stroke="#3a5a28" stroke-width=".8" fill="none"/>
    </g>

    <!-- ── FRUNZE EUCALIPT stanga ── -->
    <g opacity=".85">
      <path d="M20 180 Q80 220 60 320 Q50 370 80 420" stroke="#4a6a3a" stroke-width="1.2" fill="none"/>
      <ellipse cx="45" cy="220" rx="22" ry="11" fill="#5a7a4a" opacity=".7" transform="rotate(-30 45 220)"/>
      <ellipse cx="55" cy="255" rx="24" ry="11" fill="#4a6a38" opacity=".65" transform="rotate(15 55 255)"/>
      <ellipse cx="48" cy="290" rx="22" ry="10" fill="#6a8a50" opacity=".65" transform="rotate(-20 48 290)"/>
      <ellipse cx="60" cy="325" rx="20" ry="9" fill="#5a7a44" opacity=".6" transform="rotate(25 60 325)"/>
      <ellipse cx="52" cy="358" rx="18" ry="8" fill="#4a6a38" opacity=".55" transform="rotate(-15 52 358)"/>
      <ellipse cx="65" cy="390" rx="22" ry="10" fill="#6a8a50" opacity=".6" transform="rotate(20 65 390)"/>
    </g>

    <!-- ── FRUNZE MOV INCHIS stanga sus ── -->
    <g opacity=".8">
      <ellipse cx="100" cy="120" rx="35" ry="14" fill="#4a1a6a" opacity=".6" transform="rotate(-40 100 120)"/>
      <ellipse cx="140" cy="95" rx="30" ry="12" fill="#5a2a7a" opacity=".55" transform="rotate(-60 140 95)"/>
      <ellipse cx="75" cy="150" rx="32" ry="13" fill="#3a1258" opacity=".55" transform="rotate(-25 75 150)"/>
      <ellipse cx="165" cy="130" rx="28" ry="11" fill="#4a1a6a" opacity=".5" transform="rotate(-50 165 130)"/>
      <ellipse cx="120" cy="160" rx="38" ry="14" fill="#5a2a7a" opacity=".5" transform="rotate(-35 120 160)"/>
    </g>

    <!-- ── FLORI MIC CORAL/PORTOCALIU stanga ── -->
    <g opacity=".85">
      <circle cx="180" cy="105" r="10" fill="#e8783a" opacity=".8"/>
      <circle cx="168" cy="90" r="7" fill="#f0904a" opacity=".7"/>
      <circle cx="195" cy="88" r="6" fill="#d86030" opacity=".75"/>
      <circle cx="155" cy="108" r="8" fill="#e8783a" opacity=".65"/>
      <circle cx="200" cy="118" r="5" fill="#f0904a" opacity=".6"/>
      <!-- bobite portocalii -->
      <circle cx="130" cy="78" r="5" fill="#e87030" opacity=".7"/>
      <circle cx="148" cy="70" r="4" fill="#f0884a" opacity=".65"/>
      <circle cx="115" cy="92" r="4" fill="#d85a28" opacity=".6"/>
    </g>

    <!-- ── FRUNZE FERIGA dreapta sus ── -->
    <g opacity=".9" transform="translate(794,0) scale(-1,1)">
      <path d="M50 80 Q120 140 80 240 Q60 290 90 340" stroke="#2d4a1e" stroke-width="1.5" fill="none"/>
      <path d="M80 140 Q50 125 35 110" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M80 140 Q108 128 118 115" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 165 Q48 152 32 140" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 165 Q106 155 116 143" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 190 Q46 178 30 166" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 190 Q104 181 114 170" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M74 215 Q50 204 36 193" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M74 215 Q100 207 108 197" stroke="#3a5a28" stroke-width="1" fill="none"/>
    </g>

    <!-- ── FRUNZE EUCALIPT dreapta ── -->
    <g opacity=".85" transform="translate(794,0) scale(-1,1)">
      <path d="M20 180 Q80 220 60 320 Q50 370 80 420" stroke="#4a6a3a" stroke-width="1.2" fill="none"/>
      <ellipse cx="45" cy="220" rx="22" ry="11" fill="#5a7a4a" opacity=".7" transform="rotate(30 45 220)"/>
      <ellipse cx="55" cy="255" rx="24" ry="11" fill="#4a6a38" opacity=".65" transform="rotate(-15 55 255)"/>
      <ellipse cx="48" cy="290" rx="22" ry="10" fill="#6a8a50" opacity=".65" transform="rotate(20 48 290)"/>
      <ellipse cx="60" cy="325" rx="20" ry="9" fill="#5a7a44" opacity=".6" transform="rotate(-25 60 325)"/>
      <ellipse cx="52" cy="358" rx="18" ry="8" fill="#4a6a38" opacity=".55" transform="rotate(15 52 358)"/>
    </g>

    <!-- ── FRUNZE MOV dreapta sus ── -->
    <g opacity=".8" transform="translate(794,0) scale(-1,1)">
      <ellipse cx="100" cy="120" rx="35" ry="14" fill="#4a1a6a" opacity=".6" transform="rotate(40 100 120)"/>
      <ellipse cx="140" cy="95" rx="30" ry="12" fill="#5a2a7a" opacity=".55" transform="rotate(60 140 95)"/>
      <ellipse cx="75" cy="150" rx="32" ry="13" fill="#3a1258" opacity=".55" transform="rotate(25 75 150)"/>
      <ellipse cx="165" cy="130" rx="28" ry="11" fill="#4a1a6a" opacity=".5" transform="rotate(50 165 130)"/>
    </g>

    <!-- ── FLORI CORAL dreapta ── -->
    <g opacity=".85" transform="translate(794,0) scale(-1,1)">
      <circle cx="180" cy="105" r="10" fill="#e8783a" opacity=".8"/>
      <circle cx="168" cy="90" r="7" fill="#f0904a" opacity=".7"/>
      <circle cx="195" cy="88" r="6" fill="#d86030" opacity=".75"/>
      <circle cx="155" cy="108" r="8" fill="#e8783a" opacity=".65"/>
      <circle cx="130" cy="78" r="5" fill="#e87030" opacity=".7"/>
      <circle cx="148" cy="70" r="4" fill="#f0884a" opacity=".65"/>
    </g>

    <!-- ── COROANA JOS stanga ── -->
    <g opacity=".88" transform="translate(0,1123) scale(1,-1)">
      <path d="M30 60 Q100 100 80 200 Q65 250 100 300" stroke="#2d4a1e" stroke-width="1.5" fill="none"/>
      <path d="M80 110 Q50 95 35 82" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M80 110 Q108 100 118 88" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 140 Q48 127 32 115" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 140 Q106 132 116 120" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 168 Q50 157 36 146" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 168 Q104 160 112 150" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <ellipse cx="50" cy="185" rx="26" ry="11" fill="#5a7a4a" opacity=".65" transform="rotate(-20 50 185)"/>
      <ellipse cx="70" cy="220" rx="24" ry="10" fill="#4a6a38" opacity=".6" transform="rotate(18 70 220)"/>
      <ellipse cx="55" cy="255" rx="22" ry="9" fill="#6a8a50" opacity=".6" transform="rotate(-15 55 255)"/>
      <ellipse cx="90" cy="115" rx="34" ry="14" fill="#4a1a6a" opacity=".55" transform="rotate(-42 90 115)"/>
      <ellipse cx="130" cy="90" rx="30" ry="12" fill="#5a2a7a" opacity=".5" transform="rotate(-62 130 90)"/>
      <circle cx="160" cy="80" r="9" fill="#e8783a" opacity=".75"/>
      <circle cx="148" cy="65" r="6" fill="#f0904a" opacity=".65"/>
      <circle cx="175" cy="70" r="5" fill="#d86030" opacity=".7"/>
      <circle cx="120" cy="70" r="5" fill="#e87030" opacity=".65"/>
    </g>

    <!-- ── COROANA JOS dreapta ── -->
    <g opacity=".88" transform="translate(794,1123) scale(-1,-1)">
      <path d="M30 60 Q100 100 80 200 Q65 250 100 300" stroke="#2d4a1e" stroke-width="1.5" fill="none"/>
      <path d="M80 110 Q50 95 35 82" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M80 110 Q108 100 118 88" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 140 Q48 127 32 115" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M78 140 Q106 132 116 120" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 168 Q50 157 36 146" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <path d="M76 168 Q104 160 112 150" stroke="#3a5a28" stroke-width="1" fill="none"/>
      <ellipse cx="50" cy="185" rx="26" ry="11" fill="#5a7a4a" opacity=".65" transform="rotate(20 50 185)"/>
      <ellipse cx="70" cy="220" rx="24" ry="10" fill="#4a6a38" opacity=".6" transform="rotate(-18 70 220)"/>
      <ellipse cx="90" cy="115" rx="34" ry="14" fill="#4a1a6a" opacity=".55" transform="rotate(42 90 115)"/>
      <ellipse cx="130" cy="90" rx="30" ry="12" fill="#5a2a7a" opacity=".5" transform="rotate(62 130 90)"/>
      <circle cx="160" cy="80" r="9" fill="#e8783a" opacity=".75"/>
      <circle cx="148" cy="65" r="6" fill="#f0904a" opacity=".65"/>
      <circle cx="175" cy="70" r="5" fill="#d86030" opacity=".7"/>
      <circle cx="120" cy="70" r="5" fill="#e87030" opacity=".65"/>
    </g>

    <!-- ── MONOGRAMA HEXAGONALA (sus centru) ── -->
    <g transform="translate(397, 130)">
      <!-- Hexagon auriu dublu -->
      <polygon points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26" fill="none" stroke="#b8860b" stroke-width="1.8" opacity=".9"/>
      <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22" fill="none" stroke="#b8860b" stroke-width="1" opacity=".5"/>
      <!-- Frunzulite mici deasupra -->
      <path d="M-12,-50 Q-6,-62 0,-58 Q6,-62 12,-50" stroke="#b8860b" stroke-width="1.2" fill="none" opacity=".8"/>
      <path d="M-8,-50 Q-4,-58 0,-56 Q4,-58 8,-50" stroke="#b8860b" stroke-width=".8" fill="none" opacity=".6"/>
      <!-- Initiale -->
      <text x="0" y="-8" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="24" font-style="italic" fill="#b8860b" opacity=".95">${init1}</text>
      <text x="0" y="22" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="24" font-style="italic" fill="#b8860b" opacity=".95">${init2}</text>
    </g>
  </svg>

  <!-- Spatiu monograma -->
  <div class="monogram-wrap"></div>

  <!-- TEXT -->
  <div class="content">
    <p class="inv-title">INVITAȚIE DE NUNTĂ</p>

    <span class="name-groom">${fields.groom}</span>
    <span class="name-script-amp">&amp;</span>
    <span class="name-bride">${fields.bride}</span>

    <span class="ornament">❧</span>
    <p class="tagline">vă invită cu dragoste la nuntă</p>

    <div class="info-box">
      <p class="info-date">${formatDate(fields.weddingDate)}</p>
      <p class="info-line">Ora ${fields.churchTime} / ${fields.church}</p>
      <p class="info-line">Ora ${fields.restTime} / ${fields.restaurant}</p>
    </div>

    <div class="sep"></div>

    <p class="section-label">Părinții Miresei</p>
    <p class="section-val">${fields.parentsBride}</p>

    <p class="section-label">Părinții Mirelui</p>
    <p class="section-val">${fields.parentsGroom}</p>

    <p class="section-label">Nașii</p>
    <p class="section-val">${fields.nasi}</p>

    <p class="rsvp">VĂ RUGĂM SĂ CONFIRMAȚI PÂNĂ LA <strong>${formatRsvp(fields.rsvpDate)}</strong></p>
    <p class="rsvp-web">${fields.rsvpTel}</p>
  </div>

</div>
</body>
</html>`
}