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

export function buildHTML_simpla(fields: Record<string, string>): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; font-family: 'Raleway', sans-serif; }
.inv {
  width: 794px; height: 1123px;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 80px 100px 100px;
  /* Fundal hârtie texturată simulat cu SVG noise + culoare crem */
  background: #f5f0e8;
}

/* Textura hartie - margini neregulate */
.paper-edge {
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
}

/* Sigiliu ceara */
.seal {
  position: absolute; right: 72px; bottom: 80px; z-index: 5;
  width: 100px; height: 100px;
}

/* Panglica sigiliu */
.ribbon {
  position: absolute; right: 112px; bottom: 180px; z-index: 4;
  width: 4px; height: 120px;
  background: linear-gradient(180deg, #1a3a8a 0%, #2a5fa8 50%, #1a3a8a 100%);
  border-radius: 2px;
  transform: rotate(8deg);
}
.ribbon::after {
  content: '';
  position: absolute; bottom: -8px; left: -6px;
  width: 16px; height: 20px;
  background: linear-gradient(180deg, #2a5fa8, #1a3a8a);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

/* Content */
.content {
  position: relative; z-index: 3;
  text-align: center; width: 100%;
}

.title-block {
  margin-bottom: 32px;
}
.inv-label {
  font-size: 15px; font-weight: 500;
  letter-spacing: .32em; text-transform: uppercase;
  color: #2a5fa8; margin-bottom: 2px;
  display: block;
}
.inv-label-2 {
  font-size: 15px; font-weight: 500;
  letter-spacing: .32em; text-transform: uppercase;
  color: #2a5fa8; display: block;
}

.names {
  font-family: 'Playfair Display', serif;
  font-size: 96px; font-weight: 400; font-style: italic;
  color: #1a3a6a; line-height: 1; display: block;
  margin-bottom: 12px; letter-spacing: .01em;
}
.amp { color: #2a5fa8; }

.tagline {
  font-size: 22px; font-weight: 300; font-style: italic;
  color: #3a5a9a; letter-spacing: .04em; margin-bottom: 36px;
}

.sep { width: 1px; height: 0; border: none; margin: 0; }

.date-line {
  font-size: 26px; font-weight: 400;
  color: #1a3a6a; letter-spacing: .04em;
  margin-bottom: 8px; font-family: 'Raleway', sans-serif;
}

.event-block { margin-bottom: 20px; }
.event-name {
  font-family: 'Playfair Display', serif;
  font-size: 28px; font-style: italic; color: #1a3a6a;
  line-height: 1.4; display: block;
}
.event-time {
  font-size: 20px; font-weight: 300; color: #3a5a9a;
  display: block; margin-top: 3px;
}

.h-sep {
  width: 48px; height: 1px; background: #2a5fa8;
  opacity: .3; margin: 24px auto;
}

.info-label {
  font-size: 14px; font-weight: 500;
  letter-spacing: .2em; text-transform: uppercase;
  color: #2a5fa8; margin-bottom: 6px; display: block;
}
.info-val {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-style: italic; color: #1a3a6a;
  line-height: 1.5; margin-bottom: 18px; display: block;
}

.rsvp {
  font-size: 18px; font-weight: 300; color: #3a5a9a;
  font-style: italic; line-height: 2; margin-top: 20px;
}
.rsvp strong { font-style: normal; color: #1a3a6a; font-weight: 500; }
</style>
</head>
<body>
<div class="inv">

  <!-- Margini hartie texturata -->
  <svg class="paper-edge" viewBox="0 0 794 1123" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="paper">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="2" result="noise"/>
        <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
        <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blended"/>
        <feComposite in="blended" in2="SourceGraphic" operator="in"/>
      </filter>
      <filter id="roughen">
        <feTurbulence type="turbulence" baseFrequency="0.02 0.06" numOctaves="3" seed="5" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <!-- Suprafata hartie cu textura -->
    <rect width="794" height="1123" fill="#f5f0e8"/>
    <rect width="794" height="1123" fill="url(#paper-texture)" opacity=".15"/>
    <!-- Margini neregulate simulate -->
    <path d="M0 0 Q12 8 0 20 Q8 35 0 50 Q10 65 0 80 Q6 95 0 110 Q12 130 0 150 Q8 170 0 190 Q10 210 0 230 L0 0Z" fill="#e8e0d0" opacity=".6" filter="url(#roughen)"/>
    <path d="M794 0 Q782 12 794 28 Q786 45 794 62 Q782 80 794 95 Q788 115 794 135 Q782 155 794 175 Q786 195 794 215 L794 0Z" fill="#e8e0d0" opacity=".6" filter="url(#roughen)"/>
    <path d="M0 1123 Q12 1115 0 1103 Q10 1090 0 1078 Q8 1065 0 1050 Q12 1035 0 1020 L0 1123Z" fill="#e8e0d0" opacity=".6" filter="url(#roughen)"/>
    <path d="M794 1123 Q782 1112 794 1098 Q786 1085 794 1070 Q782 1055 794 1040 Q788 1025 794 1010 L794 1123Z" fill="#e8e0d0" opacity=".6" filter="url(#roughen)"/>
    <!-- Umbre subtile pe margini -->
    <rect width="794" height="1123" fill="none" stroke="#c8b89a" stroke-width="1" opacity=".25"/>
    <!-- Gradient umbra interioara sus -->
    <rect width="794" height="60" fill="url(#sh-top)" opacity=".12"/>
    <rect y="1063" width="794" height="60" fill="url(#sh-bot)" opacity=".12"/>
    <defs>
      <linearGradient id="sh-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7a60"/><stop offset="1" stop-color="transparent"/></linearGradient>
      <linearGradient id="sh-bot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="transparent"/><stop offset="1" stop-color="#8a7a60"/></linearGradient>
    </defs>
  </svg>

  <!-- Panglica -->
  <div class="ribbon"></div>

  <!-- Sigiliu ceara albastru -->
  <svg class="seal" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Umbra -->
    <ellipse cx="52" cy="54" rx="42" ry="42" fill="#0a1a4a" opacity=".15"/>
    <!-- Corp sigiliu -->
    <circle cx="50" cy="50" r="44" fill="#1a3a8a"/>
    <circle cx="50" cy="50" r="44" fill="url(#seal-grad)"/>
    <!-- Relief exterior -->
    <circle cx="50" cy="50" r="40" fill="none" stroke="#4a6ac8" stroke-width="1.5" opacity=".6"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="#3a5ab8" stroke-width="1" opacity=".4"/>
    <!-- Motiv frunza in centru -->
    <path d="M50 28 C38 36 34 44 50 68 C66 44 62 36 50 28Z" fill="#8ab0e8" opacity=".75"/>
    <path d="M50 28 L50 68" stroke="#2a4a98" stroke-width="1.2" opacity=".5"/>
    <path d="M50 38 C43 35 38 33 34 32" stroke="#8ab0e8" stroke-width=".8" opacity=".4"/>
    <path d="M50 48 C57 45 62 43 66 42" stroke="#8ab0e8" stroke-width=".8" opacity=".4"/>
    <path d="M50 58 C43 56 39 55 36 54" stroke="#8ab0e8" stroke-width=".8" opacity=".3"/>
    <!-- Highlight -->
    <ellipse cx="38" cy="34" rx="8" ry="5" fill="#a8c8f0" opacity=".2" transform="rotate(-30 38 34)"/>
    <defs>
      <radialGradient id="seal-grad" cx="35%" cy="35%" r="65%">
        <stop offset="0" stop-color="#2a5fc8" stop-opacity=".6"/>
        <stop offset="100" stop-color="#0a1a6a" stop-opacity="0"/>
      </radialGradient>
    </defs>
  </svg>

  <!-- TEXT -->
  <div class="content">
    <div class="title-block">
      <span class="inv-label">INVITAȚIE</span>
      <span class="inv-label-2">DE NUNTĂ</span>
    </div>

    <span class="names">${fields.groom} <span class="amp">&amp;</span> ${fields.bride}</span>
    <p class="tagline">vă invită cu dragoste la nuntă</p>

    <p class="date-line">${formatDate(fields.weddingDate)}</p>

    <div class="event-block">
      <span class="event-name">${fields.church}</span>
      <span class="event-time">Ora ${fields.churchTime}</span>
    </div>
    <div class="event-block">
      <span class="event-name">${fields.restaurant}</span>
      <span class="event-time">Ora ${fields.restTime}</span>
    </div>

    <div class="h-sep"></div>

    <span class="info-label">Părinții Miresei</span>
    <span class="info-val">${fields.parentsBride}</span>

    <span class="info-label">Părinții Mirelui</span>
    <span class="info-val">${fields.parentsGroom}</span>

    <span class="info-label">Nași</span>
    <span class="info-val">${fields.nasi}</span>

    <p class="rsvp">
      Confirmați prezența până pe <strong>${formatRsvp(fields.rsvpDate)}</strong><br/>
      Tel: <strong>${fields.rsvpTel}</strong>
    </p>
  </div>

</div>
</body>
</html>`
}