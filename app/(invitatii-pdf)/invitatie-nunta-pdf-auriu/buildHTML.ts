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

export function buildHTML(fields: Record<string, string>): string {
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
.zone-top {
  flex: 0 0 32%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
  padding: 52px 80px 28px;
  position: relative;
}
.intro-text {
  font-size: 11px; font-weight: 300;
  letter-spacing: .28em; text-transform: uppercase;
  color: #1B3B2B; opacity: .65;
  text-align: center; margin-bottom: 20px;
}
.parents-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 300; font-style: italic;
  color: #1B3B2B; line-height: 1.9; letter-spacing: .04em; text-align: center;
}
.parents-and {
  font-size: 9px; letter-spacing: .24em; text-transform: uppercase;
  color: #5F8575; margin: 4px 0; display: block; text-align: center;
}
.leaf-top { position: absolute; top: 40px; right: 56px; opacity: .55; }
.leaf-bottom { position: absolute; bottom: 80px; left: 48px; opacity: .5; transform: rotate(15deg); }
.band-wrap { flex: 0 0 auto; position: relative; }
.band-svg { display: block; width: 100%; }
.band-names {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 0;
}
.name-bride, .name-groom {
  font-family: 'Cormorant Garamond', serif;
  font-size: 68px; font-weight: 300; font-style: italic;
  color: #FDFBF7; line-height: 1.05; letter-spacing: .02em;
  text-shadow: 0 1px 10px rgba(27,59,43,.2);
}
.name-amp {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px; font-weight: 300; font-style: italic;
  color: rgba(253,251,247,.75); line-height: 1;
  display: block; text-align: center;
}
.zone-bottom {
  flex: 1;
  display: flex; flex-direction: column;
  align-items: center;
  padding: 30px 80px 88px;
  position: relative;
}
.invite-line {
  font-size: 10px; font-weight: 300;
  letter-spacing: .22em; text-transform: uppercase;
  color: #1B3B2B; opacity: .6;
  margin-bottom: 22px; text-align: center;
}
.sep { width: 44px; height: 1px; background: #5F8575; opacity: .5; margin: 0 auto 22px; }
.date-main {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 300; font-style: italic;
  color: #1B3B2B; letter-spacing: .06em; text-align: center; margin-bottom: 6px;
}
.date-year {
  font-size: 13px; font-weight: 300;
  letter-spacing: .3em; text-transform: uppercase;
  color: #5F8575; text-align: center; margin-bottom: 28px;
}
.events { display: grid; grid-template-columns: 1fr 1fr; width: 100%; margin-bottom: 24px; }
.event { text-align: center; padding: 18px 16px; }
.event-left { border-right: 1px solid rgba(95,133,117,.25); }
.ev-label {
  font-size: 9px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase;
  color: #5F8575; margin-bottom: 8px;
}
.ev-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px; font-weight: 300; font-style: italic;
  color: #1B3B2B; line-height: 1.5; margin-bottom: 6px;
}
.ev-time {
  font-size: 10px; font-weight: 300;
  letter-spacing: .16em; color: #5F8575;
}
.sep2 { width: 44px; height: 1px; background: #5F8575; opacity: .4; margin: 0 auto 22px; }
.nasi-label {
  font-size: 9px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase;
  color: #5F8575; text-align: center; margin-bottom: 8px;
}
.nasi-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 19px; font-weight: 300; font-style: italic;
  color: #1B3B2B; text-align: center; line-height: 1.6;
}
.rsvp {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 16px 48px;
  background: rgba(27,59,43,.06);
  border-top: 1px solid rgba(95,133,117,.2);
  text-align: center;
  font-size: 10px; font-weight: 300;
  letter-spacing: .16em; text-transform: uppercase;
  color: #1B3B2B; opacity: .75;
}
.rsvp span { color: #5F8575; font-weight: 500; opacity: 1; }
</style>
</head>
<body>
<div class="inv">
  <svg class="leaf-top" width="52" height="90" viewBox="0 0 52 90" fill="none">
    <path d="M26 88 C26 88 2 60 2 34 C2 16 12 2 26 2 C40 2 50 16 50 34 C50 60 26 88 26 88Z" fill="#5F8575" opacity=".35"/>
    <path d="M26 88 L26 2" stroke="#1B3B2B" stroke-width=".8" opacity=".4"/>
    <path d="M26 30 C16 24 8 20 4 16" stroke="#1B3B2B" stroke-width=".6" opacity=".25"/>
    <path d="M26 45 C36 38 44 34 48 30" stroke="#1B3B2B" stroke-width=".6" opacity=".25"/>
  </svg>
  <svg class="leaf-bottom" width="44" height="76" viewBox="0 0 44 76" fill="none">
    <path d="M22 74 C22 74 2 50 2 28 C2 13 10 2 22 2 C34 2 42 13 42 28 C42 50 22 74 22 74Z" fill="#5F8575" opacity=".3"/>
    <path d="M22 74 L22 2" stroke="#1B3B2B" stroke-width=".7" opacity=".35"/>
    <path d="M22 25 C14 20 8 17 4 14" stroke="#1B3B2B" stroke-width=".5" opacity=".22"/>
    <path d="M22 38 C30 32 36 29 40 26" stroke="#1B3B2B" stroke-width=".5" opacity=".22"/>
  </svg>
  <div class="zone-top">
    <p class="intro-text">Cu bucurie vă invităm la nunta noastră</p>
    <div>
      <p class="parents-name">${fields.parentsGroom}</p>
      <span class="parents-and">și</span>
      <p class="parents-name">${fields.parentsBride}</p>
    </div>
  </div>
  <div class="band-wrap">
    <svg class="band-svg" viewBox="0 0 794 210" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="wc" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="4" seed="8" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
          <feGaussianBlur in="displaced" stdDeviation="1.2" result="blurred"/>
          <feComposite in="blurred" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <path d="M-10 28 Q60 18 160 24 Q280 32 400 20 Q520 8 640 22 Q720 30 804 18 L804 182 Q740 192 620 186 Q500 178 380 190 Q260 202 140 188 Q60 180 -10 190 Z" fill="#5F8575" filter="url(#wc)" opacity=".88"/>
      <path d="M-10 38 Q80 26 200 34 Q340 44 460 30 Q580 16 700 32 Q760 40 804 28 L804 172 Q730 184 600 176 Q470 168 350 180 Q220 192 100 178 Q40 172 -10 180 Z" fill="#5F8575" filter="url(#wc)" opacity=".35"/>
    </svg>
    <div class="band-names">
      <p class="name-bride">${fields.bride}</p>
      <span class="name-amp">&amp;</span>
      <p class="name-groom">${fields.groom}</p>
    </div>
  </div>
  <div class="zone-bottom">
    <p class="invite-line">vă invită cu drag la celebrarea căsătoriei lor</p>
    <div class="sep"></div>
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
    <div class="sep2"></div>
    <p class="nasi-label">Nași de cununie</p>
    <p class="nasi-name">${fields.nasi}</p>
    <div class="rsvp">
      Confirmați prezența până pe <span>${formatRsvp(fields.rsvpDate)}</span> &nbsp;·&nbsp; Tel: <span>${fields.rsvpTel}</span>
    </div>
  </div>
</div>
</body>
</html>`
}