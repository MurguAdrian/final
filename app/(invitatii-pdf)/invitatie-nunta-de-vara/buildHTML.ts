const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie']
const DAYS   = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDate(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`
}
function formatRsvp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
function getYear(val: string) {
  const d = new Date(val)
  return isNaN(d.getTime()) ? val : d.getFullYear().toString()
}

export function buildHTML_vara(fields: Record<string, string>): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #D1E2D3; font-family: 'Montserrat', sans-serif; }
.inv {
  width: 794px; height: 1123px;
  background: #D1E2D3;
  position: relative; overflow: hidden;
  box-sizing: border-box;
  display: flex; flex-direction: column;
}

/* ── ZONA SUPERIOARA (35%) ── */
.zone-top {
  flex: 0 0 35%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
  padding: 48px 80px 32px;
  position: relative;
}
.intro-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 8px; font-weight: 300;
  letter-spacing: .32em; text-transform: uppercase;
  color: #1B3B2B; opacity: .65;
  text-align: center; margin-bottom: 18px;
}
.parents-block { text-align: center; }
.parents-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px; font-weight: 300; font-style: italic;
  color: #1B3B2B; line-height: 2; letter-spacing: .04em;
}
.parents-and {
  font-family: 'Montserrat', sans-serif;
  font-size: 7px; letter-spacing: .28em; text-transform: uppercase;
  color: #5F8575; margin: 2px 0; display: block;
}

/* Frunza dreapta sus */
.leaf-top {
  position: absolute; top: 36px; right: 52px; opacity: .55;
}

/* ── BANDA CENTRALA ACUARELA ── */
.band-wrap {
  flex: 0 0 auto;
  position: relative;
  margin: 0 0;
}
.band-svg { display: block; width: 100%; }
.band-names {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 0;
}
.name-bride, .name-groom {
  font-family: 'Cormorant Garamond', serif;
  font-size: 58px; font-weight: 300; font-style: italic;
  color: #FDFBF7; line-height: 1.05; letter-spacing: .02em;
  text-shadow: 0 1px 8px rgba(27,59,43,.18);
}
.name-amp {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px; font-weight: 300; font-style: italic;
  color: rgba(253,251,247,.7); line-height: 1;
  display: block; text-align: center;
}

/* ── ZONA INFERIOARA (45%) ── */
.zone-bottom {
  flex: 1;
  display: flex; flex-direction: column;
  align-items: center;
  padding: 28px 80px 80px;
  position: relative;
}
.invite-line {
  font-family: 'Montserrat', sans-serif;
  font-size: 7.5px; font-weight: 300;
  letter-spacing: .28em; text-transform: uppercase;
  color: #1B3B2B; opacity: .6;
  margin-bottom: 24px; text-align: center;
}
.sep-line {
  width: 40px; height: 1px;
  background: #5F8575; opacity: .5;
  margin: 0 auto 24px;
}
.date-main {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 300; font-style: italic;
  color: #1B3B2B; letter-spacing: .06em;
  text-align: center; margin-bottom: 4px;
}
.date-year {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px; font-weight: 300;
  letter-spacing: .32em; text-transform: uppercase;
  color: #5F8575; text-align: center; margin-bottom: 28px;
}
.events {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0; width: 100%; margin-bottom: 24px;
}
.event { text-align: center; padding: 16px 12px; }
.event-left { border-right: 1px solid rgba(95,133,117,.25); }
.ev-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 7px; font-weight: 500;
  letter-spacing: .24em; text-transform: uppercase;
  color: #5F8575; margin-bottom: 7px;
}
.ev-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 13px; font-weight: 300; font-style: italic;
  color: #1B3B2B; line-height: 1.5; margin-bottom: 4px;
}
.ev-time {
  font-family: 'Montserrat', sans-serif;
  font-size: 8px; font-weight: 300;
  letter-spacing: .18em; color: #5F8575;
}
.sep-line-2 {
  width: 40px; height: 1px;
  background: #5F8575; opacity: .4;
  margin: 0 auto 20px;
}
.nasi-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 7px; font-weight: 500;
  letter-spacing: .24em; text-transform: uppercase;
  color: #5F8575; text-align: center; margin-bottom: 6px;
}
.nasi-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px; font-weight: 300; font-style: italic;
  color: #1B3B2B; text-align: center; line-height: 1.6;
  margin-bottom: 24px;
}

/* Frunza stanga jos */
.leaf-bottom {
  position: absolute; bottom: 72px; left: 44px; opacity: .5;
  transform: rotate(15deg);
}

/* RSVP footer */
.rsvp {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 14px 48px;
  background: rgba(27,59,43,.06);
  border-top: 1px solid rgba(95,133,117,.2);
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 7.5px; font-weight: 300;
  letter-spacing: .18em; text-transform: uppercase;
  color: #1B3B2B; opacity: .7;
}
.rsvp span { color: #5F8575; font-weight: 500; }
</style>
</head>
<body>
<div class="inv">

  <!-- Frunza dreapta sus -->
  <svg class="leaf-top" width="52" height="90" viewBox="0 0 52 90" fill="none">
    <path d="M26 88 C26 88 2 60 2 34 C2 16 12 2 26 2 C40 2 50 16 50 34 C50 60 26 88 26 88Z" fill="#5F8575" opacity=".35"/>
    <path d="M26 88 L26 2" stroke="#1B3B2B" stroke-width=".8" opacity=".4"/>
    <path d="M26 30 C16 24 8 20 4 16" stroke="#1B3B2B" stroke-width=".6" opacity=".25"/>
    <path d="M26 45 C36 38 44 34 48 30" stroke="#1B3B2B" stroke-width=".6" opacity=".25"/>
    <path d="M26 60 C18 55 12 52 8 50" stroke="#1B3B2B" stroke-width=".6" opacity=".2"/>
  </svg>

  <!-- ZONA SUPERIOARA -->
  <div class="zone-top">
    <p class="intro-text">Cu bucurie vă invităm la nunta noastră</p>
    <div class="parents-block">
      <p class="parents-name">${fields.parentsGroom}</p>
      <span class="parents-and">și</span>
      <p class="parents-name">${fields.parentsBride}</p>
    </div>
  </div>

  <!-- BANDA ACUARELA cu numele mirilor -->
  <div class="band-wrap">
    <svg class="band-svg" viewBox="0 0 794 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="watercolor" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="4" seed="8" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
          <feGaussianBlur in="displaced" stdDeviation="1.2" result="blurred"/>
          <feComposite in="blurred" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <!-- Banda principala cu textura acuarela -->
      <path d="M-10 28 Q60 18 160 24 Q280 32 400 20 Q520 8 640 22 Q720 30 804 18 L804 172 Q740 182 620 176 Q500 168 380 180 Q260 192 140 178 Q60 170 -10 180 Z"
        fill="#5F8575" filter="url(#watercolor)" opacity=".88"/>
      <!-- Strat secundar pentru adancime -->
      <path d="M-10 38 Q80 26 200 34 Q340 44 460 30 Q580 16 700 32 Q760 40 804 28 L804 162 Q730 174 600 166 Q470 158 350 170 Q220 182 100 168 Q40 162 -10 170 Z"
        fill="#5F8575" filter="url(#watercolor)" opacity=".35"/>
    </svg>
    <div class="band-names">
      <p class="name-bride">${fields.bride}</p>
      <span class="name-amp">&amp;</span>
      <p class="name-groom">${fields.groom}</p>
    </div>
  </div>

  <!-- ZONA INFERIOARA -->
  <div class="zone-bottom">
    <p class="invite-line">vă invită cu drag la celebrarea căsătoriei lor</p>
    <div class="sep-line"></div>

    <p class="date-main">${formatDate(fields.weddingDate)}</p>
    <p class="date-year">${getYear(fields.weddingDate)}</p>

    <div class="events">
      <div class="event event-left">
        <p class="ev-label">Cununie</p>
        <p class="ev-name">${fields.church}</p>
        <p class="ev-time">ora ${fields.churchTime}</p>
      </div>
      <div class="event">
        <p class="ev-label">Recepție</p>
        <p class="ev-name">${fields.restaurant}</p>
        <p class="ev-time">ora ${fields.restTime}</p>
      </div>
    </div>

    <div class="sep-line-2"></div>
    <p class="nasi-label">Nași de cununie</p>
    <p class="nasi-name">${fields.nasi}</p>

    <!-- Frunza stanga jos -->
    <svg class="leaf-bottom" width="44" height="76" viewBox="0 0 44 76" fill="none">
      <path d="M22 74 C22 74 2 50 2 28 C2 13 10 2 22 2 C34 2 42 13 42 28 C42 50 22 74 22 74Z" fill="#5F8575" opacity=".3"/>
      <path d="M22 74 L22 2" stroke="#1B3B2B" stroke-width=".7" opacity=".35"/>
      <path d="M22 25 C14 20 8 17 4 14" stroke="#1B3B2B" stroke-width=".5" opacity=".22"/>
      <path d="M22 38 C30 32 36 29 40 26" stroke="#1B3B2B" stroke-width=".5" opacity=".22"/>
    </svg>

    <div class="rsvp">
      Confirmați prezența până pe <span>${formatRsvp(fields.rsvpDate)}</span> &nbsp;·&nbsp; Tel: <span>${fields.rsvpTel}</span>
    </div>
  </div>

</div>
</body>
</html>`
}