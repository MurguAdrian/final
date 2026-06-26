const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDateFull(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]} | ${d.getDate()} ${MONTHS[d.getMonth()].toUpperCase()} ${d.getFullYear()}`
}
function formatRsvp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${d.getDate()} ${MONTHS[d.getMonth()].toUpperCase()} ${d.getFullYear()}`
}
function getInitials(groom: string, bride: string) {
  return [
    (groom || 'A').trim().charAt(0).toUpperCase(),
    (bride || 'A').trim().charAt(0).toUpperCase(),
  ]
}

export function buildHTML_casa(fields: Record<string, string>): string {
  const [init1, init2] = getInitials(fields.groom, fields.bride)
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #f8f5ef; font-family: 'Raleway', sans-serif; }
.inv {
  width: 794px; height: 1123px;
  background: #f8f5ef;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 60px 90px 70px;
}

/* ── HARTIE TEXTURATA margini neregulate ── */
.paper { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

/* ── PETE ACUARELA SAGE ── */
.blobs { position: absolute; inset: 0; z-index: 1; pointer-events: none; }

/* ── CONTENT ── */
.content { position: relative; z-index: 3; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center; }

/* ── MONOGRAMA GEOMETRICA ── */
.mono-wrap { margin-bottom: 28px; }

/* ── TEXT ── */
.together {
  font-family: 'Raleway', sans-serif;
  font-size: 13px; font-weight: 500;
  letter-spacing: .28em; text-transform: uppercase;
  color: #5a5a4a; margin-bottom: 6px;
}
.parents-line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-style: italic;
  color: #3a3a2e; line-height: 1.5; margin-bottom: 8px;
}
.nasi-label {
  font-size: 11px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase;
  color: #5a5a4a; margin-bottom: 4px;
}
.nasi-line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-style: italic;
  color: #3a3a2e; margin-bottom: 0;
}
.names {
  font-family: 'Playfair Display', serif;
  font-size: 80px; font-weight: 700;
  color: #1a1a14; line-height: 1;
  margin-bottom: 10px; letter-spacing: .01em;
}
.names .amp {
  font-style: italic; font-weight: 400;
  color: #b8a060;
}
.invite-line {
  font-family: 'Raleway', sans-serif;
  font-size: 13px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase;
  color: #5a5a4a; margin-bottom: 28px;
}
.sep { width: 80px; height: 1px; background: #b8a060; opacity: .5; margin: 0 auto 28px; }

.date-line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px; font-weight: 400; font-style: italic;
  color: #1a1a14; letter-spacing: .04em; margin-bottom: 20px;
}

.church-name {
  font-family: 'Playfair Display', serif;
  font-size: 30px; font-weight: 700;
  color: #1a1a14; margin-bottom: 6px;
}
.church-sub {
  font-family: 'Raleway', sans-serif;
  font-size: 14px; font-weight: 500;
  letter-spacing: .2em; text-transform: uppercase;
  color: #5a5a4a; margin-bottom: 18px;
}

.event-line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-style: italic;
  color: #3a3a2e; line-height: 1.7; margin-bottom: 4px;
}

.sep2 { width: 80px; height: 1px; background: #b8a060; opacity: .4; margin: 24px auto; }

/* Buton confirmare */
.confirm-btn {
  display: inline-block;
  padding: 14px 52px;
  background: #6b8a70;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 16px; font-weight: 500;
  letter-spacing: .1em;
  border-radius: 4px;
  margin-bottom: 22px;
  text-transform: none;
}

.rsvp-line {
  font-family: 'Raleway', sans-serif;
  font-size: 14px; font-weight: 300;
  font-style: italic; color: #5a5a4a;
  letter-spacing: .04em;
}
</style>
</head>
<body>
<div class="inv">

  <!-- Hartie texturata SVG -->
  <svg class="paper" viewBox="0 0 794 1123" preserveAspectRatio="none">
    <rect width="794" height="1123" fill="#f8f5ef"/>
    <!-- Margini neregulate hartie -->
    <path d="M0 0 Q18 6 4 18 Q14 34 0 50 Q16 68 2 86 Q12 104 0 122 Q18 140 2 158 Q10 176 0 194 Q16 210 0 228 L0 0Z" fill="#ede8dc" opacity=".7"/>
    <path d="M794 0 Q776 8 790 22 Q780 40 794 56 Q778 74 792 90 Q782 108 794 124 Q776 142 792 158 Q784 176 794 192 L794 0Z" fill="#ede8dc" opacity=".7"/>
    <path d="M0 1123 Q18 1115 2 1101 Q14 1087 0 1073 Q16 1059 2 1045 Q12 1031 0 1017 L0 1123Z" fill="#ede8dc" opacity=".7"/>
    <path d="M794 1123 Q776 1113 790 1099 Q780 1085 794 1071 Q778 1057 792 1043 L794 1123Z" fill="#ede8dc" opacity=".7"/>
    <!-- Umbra interioara subtila -->
    <rect width="794" height="1123" fill="none" stroke="#d8d0bc" stroke-width="1" opacity=".4"/>
  </svg>

  <!-- Pete acuarela sage -->
  <svg class="blobs" viewBox="0 0 794 1123" preserveAspectRatio="none">
    <defs>
      <filter id="blur-sage"><feGaussianBlur stdDeviation="18"/></filter>
      <filter id="blur-sage-sm"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    <!-- Sus stanga - verde sage -->
    <ellipse cx="80" cy="120" rx="160" ry="100" fill="#8faa90" opacity=".28" filter="url(#blur-sage)"/>
    <ellipse cx="40" cy="80" rx="90" ry="60" fill="#7a9a80" opacity=".2" filter="url(#blur-sage-sm)"/>
    <ellipse cx="140" cy="160" rx="110" ry="70" fill="#a0b8a0" opacity=".18" filter="url(#blur-sage)"/>
    <!-- Sus dreapta - verde sage deschis -->
    <ellipse cx="720" cy="100" rx="140" ry="90" fill="#8faa90" opacity=".25" filter="url(#blur-sage)"/>
    <ellipse cx="760" cy="60" rx="80" ry="50" fill="#7a9a80" opacity=".18" filter="url(#blur-sage-sm)"/>
    <!-- Jos stanga -->
    <ellipse cx="100" cy="1020" rx="150" ry="90" fill="#8faa90" opacity=".22" filter="url(#blur-sage)"/>
    <ellipse cx="60" cy="1060" rx="80" ry="50" fill="#a0b8a0" opacity=".16" filter="url(#blur-sage-sm)"/>
    <!-- Jos dreapta -->
    <ellipse cx="700" cy="1010" rx="140" ry="85" fill="#8faa90" opacity=".22" filter="url(#blur-sage)"/>
    <ellipse cx="750" cy="1060" rx="90" ry="55" fill="#7a9a80" opacity=".16" filter="url(#blur-sage-sm)"/>
  </svg>

  <!-- CONTENT -->
  <div class="content">

    <!-- MONOGRAMA GEOMETRICA AURIE -->
    <div class="mono-wrap">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <defs>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4a840"/>
            <stop offset="50%" stop-color="#f0cc70"/>
            <stop offset="100%" stop-color="#b8900c"/>
          </linearGradient>
        </defs>

        <!-- Hexagon geometric exterior -->
        <polygon points="100,12 172,52 172,148 100,188 28,148 28,52"
          fill="none" stroke="url(#gold-grad)" stroke-width="1.5" opacity=".9"/>
        <!-- Hexagon interior mic -->
        <polygon points="100,28 158,62 158,138 100,172 42,138 42,62"
          fill="none" stroke="url(#gold-grad)" stroke-width=".7" opacity=".5"/>

        <!-- Linii diagonale geometrice -->
        <line x1="28" y1="52" x2="100" y2="100" stroke="url(#gold-grad)" stroke-width=".6" opacity=".35"/>
        <line x1="172" y1="52" x2="100" y2="100" stroke="url(#gold-grad)" stroke-width=".6" opacity=".35"/>
        <line x1="28" y1="148" x2="100" y2="100" stroke="url(#gold-grad)" stroke-width=".6" opacity=".35"/>
        <line x1="172" y1="148" x2="100" y2="100" stroke="url(#gold-grad)" stroke-width=".6" opacity=".35"/>

        <!-- Frunze stanga -->
        <path d="M28 100 Q10 80 5 60 Q18 72 28 100Z" fill="#8faa90" opacity=".8"/>
        <path d="M28 100 Q8 90 2 70 Q16 80 28 100Z" fill="#7a9a80" opacity=".6"/>
        <path d="M28 100 Q12 112 8 130 Q22 118 28 100Z" fill="#8faa90" opacity=".7"/>
        <path d="M28 100 Q6 105 0 125 Q15 112 28 100Z" fill="#7a9a80" opacity=".55"/>
        <!-- Tulpina stanga -->
        <path d="M5 60 Q16 80 28 100 Q22 118 8 130" stroke="#6a8a6a" stroke-width="1" fill="none" opacity=".6"/>

        <!-- Frunze dreapta -->
        <path d="M172 100 Q190 80 195 60 Q182 72 172 100Z" fill="#8faa90" opacity=".8"/>
        <path d="M172 100 Q192 90 198 70 Q184 80 172 100Z" fill="#7a9a80" opacity=".6"/>
        <path d="M172 100 Q188 112 192 130 Q178 118 172 100Z" fill="#8faa90" opacity=".7"/>
        <path d="M172 100 Q194 105 200 125 Q185 112 172 100Z" fill="#7a9a80" opacity=".55"/>
        <!-- Tulpina dreapta -->
        <path d="M195 60 Q184 80 172 100 Q178 118 192 130" stroke="#6a8a6a" stroke-width="1" fill="none" opacity=".6"/>

        <!-- Initiale -->
        <text x="100" y="90" text-anchor="middle"
          font-family="Cormorant Garamond, serif" font-size="38" font-style="italic"
          fill="url(#gold-grad)" opacity=".95">${init1}</text>
        <line x1="70" y1="100" x2="130" y2="100" stroke="url(#gold-grad)" stroke-width="1" opacity=".6"/>
        <text x="100" y="136" text-anchor="middle"
          font-family="Cormorant Garamond, serif" font-size="38" font-style="italic"
          fill="url(#gold-grad)" opacity=".95">${init2}</text>
      </svg>
    </div>

    <p class="together">CU BINECUVÂNTAREA PĂRINȚILOR</p>
    <p class="parents-line">${fields.parentsBride} &nbsp;·&nbsp; ${fields.parentsGroom}</p>
    <p class="nasi-label">NAȘI DE CUNUNIE</p>
    <p class="nasi-line">${fields.nasi}</p>

    <div class="sep"></div>

    <p class="names">${fields.groom} <span class="amp">&amp;</span> ${fields.bride}</p>
    <p class="invite-line">VĂ INVITĂ CU DRAG LA NUNTA NOASTRA</p>

    <div class="sep"></div>

    <p class="date-line">${formatDateFull(fields.weddingDate)}</p>

    <p class="church-name">${fields.church}</p>
    <p class="church-sub">RECEPȚIE, CINĂ ȘI DANS</p>

    <p class="event-line">Ora ${fields.churchTime}, ${fields.churchAddress || 'Locația cununie'}</p>
    <p class="event-line">Ora ${fields.restTime}, ${fields.restaurant}</p>

    <div class="sep2"></div>

    <div class="confirm-btn">Confirmare Prezență</div>

    <p class="rsvp-line">Vă rugăm să confirmați până la ${formatRsvp(fields.rsvpDate)}</p>
    <p class="rsvp-line" style="margin-top:6px;">Tel: ${fields.rsvpTel}</p>
  </div>

</div>
</body>
</html>`
}