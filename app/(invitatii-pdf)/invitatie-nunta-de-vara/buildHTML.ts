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
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Lato:wght@300;400&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #f9f7f2; font-family: 'Lato', sans-serif; }
.inv {
  width: 794px; height: 1123px; background: #f9f7f2;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 110px 90px 90px;
}
.botanical { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.seal { position: absolute; right: 68px; bottom: 88px; z-index: 3; width: 88px; height: 88px; }
.content { position: relative; z-index: 2; text-align: center; width: 100%; }

.intro  { font-size: 20px; font-weight: 300; font-style: italic; color: #3d5a3e; letter-spacing: .03em; margin-bottom: 6px; line-height: 1.6; }
.tagline { font-size: 20px; font-weight: 300; font-style: italic; color: #3d5a3e; letter-spacing: .03em; margin-bottom: 36px; line-height: 1.6; }

.name-groom { font-family: 'Cormorant Garamond', serif; font-size: 96px; font-weight: 300; color: #1a2e1a; line-height: 1; display: block; }
.amp        { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 300; font-style: italic; color: #3d5a3e; display: block; line-height: 1; margin: 8px 0; }
.name-bride { font-family: 'Cormorant Garamond', serif; font-size: 96px; font-weight: 300; color: #1a2e1a; line-height: 1; display: block; margin-bottom: 36px; }

.sep { width: 70px; height: 1px; background: #3d5a3e; opacity: .35; margin: 0 auto 28px; }

.block-label { font-size: 14px; font-weight: 400; letter-spacing: .16em; text-transform: uppercase; color: #5a7a5a; margin-bottom: 8px; }
.block-value { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; font-style: italic; color: #1a2e1a; line-height: 1.5; margin-bottom: 22px; }
.block-value.big { font-size: 32px; margin-bottom: 10px; }

.details-row { display: flex; align-items: flex-start; justify-content: center; gap: 48px; margin: 14px 0 26px; }
.detail-col { text-align: center; }
.detail-label { font-size: 13px; font-weight: 400; letter-spacing: .16em; text-transform: uppercase; color: #5a7a5a; margin-bottom: 6px; }
.detail-val   { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-style: italic; color: #1a2e1a; line-height: 1.4; }
.detail-time  { font-size: 16px; font-weight: 300; color: #5a7a5a; margin-top: 4px; }
.dot { color: #3d5a3e; opacity: .4; font-size: 28px; margin-top: 10px; }

.rsvp-block { font-size: 17px; font-weight: 300; color: #5a7a5a; line-height: 1.9; font-style: italic; margin-top: 26px; }
.rsvp-block span { color: #3d5a3e; font-weight: 400; }
</style>
</head>
<body>
<div class="inv">

  <svg class="botanical" viewBox="0 0 794 1123" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity=".85">
      <path d="M20 20 Q90 70 65 140 Q42 200 110 230" stroke="#5a7a3a" stroke-width="2" fill="none"/>
      <path d="M65 18 Q110 90 88 165" stroke="#5a7a3a" stroke-width="1.2" fill="none"/>
      <ellipse cx="60" cy="60" rx="26" ry="12" fill="#6a8f4a" opacity=".7" transform="rotate(-30 60 60)"/>
      <ellipse cx="42" cy="100" rx="22" ry="11" fill="#4a7a3a" opacity=".65" transform="rotate(20 42 100)"/>
      <ellipse cx="85" cy="82" rx="20" ry="10" fill="#7a9f5a" opacity=".65" transform="rotate(-50 85 82)"/>
      <ellipse cx="30" cy="148" rx="28" ry="12" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 148)"/>
      <ellipse cx="98" cy="128" rx="22" ry="10" fill="#6a9a4a" opacity=".6" transform="rotate(-40 98 128)"/>
      <ellipse cx="58" cy="182" rx="26" ry="11" fill="#4a7030" opacity=".65" transform="rotate(30 58 182)"/>
      <ellipse cx="112" cy="208" rx="30" ry="12" fill="#5a8040" opacity=".6" transform="rotate(-20 112 208)"/>
      <path d="M14 88 Q40 76 54 94 Q40 112 14 100 Z" fill="#4a6a30" opacity=".55"/>
      <path d="M24 124 Q56 106 66 128 Q56 148 24 136 Z" fill="#5a7a3a" opacity=".55"/>
    </g>
    <g opacity=".85" transform="translate(794,0) scale(-1,1)">
      <path d="M20 20 Q90 70 65 140 Q42 200 110 230" stroke="#5a7a3a" stroke-width="2" fill="none"/>
      <path d="M65 18 Q110 90 88 165" stroke="#5a7a3a" stroke-width="1.2" fill="none"/>
      <ellipse cx="60" cy="60" rx="26" ry="12" fill="#6a8f4a" opacity=".7" transform="rotate(-30 60 60)"/>
      <ellipse cx="42" cy="100" rx="22" ry="11" fill="#4a7a3a" opacity=".65" transform="rotate(20 42 100)"/>
      <ellipse cx="85" cy="82" rx="20" ry="10" fill="#7a9f5a" opacity=".65" transform="rotate(-50 85 82)"/>
      <ellipse cx="30" cy="148" rx="28" ry="12" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 148)"/>
      <ellipse cx="98" cy="128" rx="22" ry="10" fill="#6a9a4a" opacity=".6" transform="rotate(-40 98 128)"/>
      <ellipse cx="58" cy="182" rx="26" ry="11" fill="#4a7030" opacity=".65" transform="rotate(30 58 182)"/>
      <ellipse cx="112" cy="208" rx="30" ry="12" fill="#5a8040" opacity=".6" transform="rotate(-20 112 208)"/>
      <path d="M14 88 Q40 76 54 94 Q40 112 14 100 Z" fill="#4a6a30" opacity=".55"/>
      <path d="M24 124 Q56 106 66 128 Q56 148 24 136 Z" fill="#5a7a3a" opacity=".55"/>
    </g>
    <g opacity=".75" transform="translate(0,1123) scale(1,-1)">
      <path d="M20 20 Q90 70 65 140 Q42 200 110 230" stroke="#5a7a3a" stroke-width="2" fill="none"/>
      <ellipse cx="60" cy="60" rx="26" ry="12" fill="#6a8f4a" opacity=".7" transform="rotate(-30 60 60)"/>
      <ellipse cx="42" cy="100" rx="22" ry="11" fill="#4a7a3a" opacity=".65" transform="rotate(20 42 100)"/>
      <ellipse cx="85" cy="82" rx="20" ry="10" fill="#7a9f5a" opacity=".65" transform="rotate(-50 85 82)"/>
      <ellipse cx="30" cy="148" rx="28" ry="12" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 148)"/>
      <ellipse cx="98" cy="128" rx="22" ry="10" fill="#6a9a4a" opacity=".6" transform="rotate(-40 98 128)"/>
      <ellipse cx="58" cy="182" rx="26" ry="11" fill="#4a7030" opacity=".65" transform="rotate(30 58 182)"/>
      <path d="M14 88 Q40 76 54 94 Q40 112 14 100 Z" fill="#4a6a30" opacity=".55"/>
    </g>
    <g opacity=".75" transform="translate(794,1123) scale(-1,-1)">
      <path d="M20 20 Q90 70 65 140 Q42 200 110 230" stroke="#5a7a3a" stroke-width="2" fill="none"/>
      <ellipse cx="60" cy="60" rx="26" ry="12" fill="#6a8f4a" opacity=".7" transform="rotate(-30 60 60)"/>
      <ellipse cx="42" cy="100" rx="22" ry="11" fill="#4a7a3a" opacity=".65" transform="rotate(20 42 100)"/>
      <ellipse cx="85" cy="82" rx="20" ry="10" fill="#7a9f5a" opacity=".65" transform="rotate(-50 85 82)"/>
      <ellipse cx="30" cy="148" rx="28" ry="12" fill="#5a8a4a" opacity=".6" transform="rotate(10 30 148)"/>
      <ellipse cx="98" cy="128" rx="22" ry="10" fill="#6a9a4a" opacity=".6" transform="rotate(-40 98 128)"/>
      <ellipse cx="58" cy="182" rx="26" ry="11" fill="#4a7030" opacity=".65" transform="rotate(30 58 182)"/>
    </g>
    <path d="M180 38 Q320 18 397 26 Q474 18 614 38" stroke="#5a7a3a" stroke-width="1.2" fill="none" opacity=".5"/>
    <path d="M180 1085 Q320 1105 397 1097 Q474 1105 614 1085" stroke="#5a7a3a" stroke-width="1.2" fill="none" opacity=".5"/>
    <ellipse cx="240" cy="28" rx="16" ry="7" fill="#6a8f4a" opacity=".5" transform="rotate(-15 240 28)"/>
    <ellipse cx="320" cy="20" rx="14" ry="6" fill="#7a9f5a" opacity=".45" transform="rotate(-5 320 20)"/>
    <ellipse cx="397" cy="18" rx="12" ry="5" fill="#5a8040" opacity=".4" transform="rotate(0 397 18)"/>
    <ellipse cx="474" cy="20" rx="14" ry="6" fill="#5a8040" opacity=".45" transform="rotate(5 474 20)"/>
    <ellipse cx="554" cy="28" rx="16" ry="7" fill="#4a7a3a" opacity=".5" transform="rotate(15 554 28)"/>
    <ellipse cx="240" cy="1095" rx="16" ry="7" fill="#6a8f4a" opacity=".5" transform="rotate(15 240 1095)"/>
    <ellipse cx="320" cy="1103" rx="14" ry="6" fill="#5a7a3a" opacity=".45" transform="rotate(5 320 1103)"/>
    <ellipse cx="474" cy="1103" rx="14" ry="6" fill="#5a8040" opacity=".45" transform="rotate(-5 474 1103)"/>
    <ellipse cx="554" cy="1095" rx="16" ry="7" fill="#4a7a3a" opacity=".5" transform="rotate(-15 554 1095)"/>
  </svg>

  <svg class="seal" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="44" cy="44" r="42" fill="#3d5a3e" opacity=".92"/>
    <circle cx="44" cy="44" r="35" fill="none" stroke="#a8c89a" stroke-width="1.2" opacity=".6"/>
    <path d="M44 24 C34 34 32 44 44 64 C56 44 54 34 44 24Z" fill="#a8c89a" opacity=".8"/>
    <path d="M44 24 L44 64" stroke="#3d5a3e" stroke-width="1" opacity=".6"/>
  </svg>

  <div class="content">
    <p class="intro">Două suflete, o promisiune sub cerul liber</p>
    <p class="tagline">Vă invităm cu drag la nunta noastră</p>
    <span class="name-groom">${fields.groom}</span>
    <span class="amp">&amp;</span>
    <span class="name-bride">${fields.bride}</span>
    <div class="sep"></div>
    <p class="block-label">Cu binecuvântarea părinților noștri</p>
    <p class="block-value">Familia ${fields.parentsGroom}<br/>Familia ${fields.parentsBride}</p>
    <p class="block-label">Și călăuziți de nașii noștri</p>
    <p class="block-value">${fields.nasi}</p>
    <div class="sep"></div>
    <p class="block-value big">${formatDate(fields.weddingDate)}, ${getYear(fields.weddingDate)}</p>
    <div class="details-row">
      <div class="detail-col">
        <p class="detail-label">Cununia Religioasă</p>
        <p class="detail-val">${fields.church}</p>
        <p class="detail-time">Ora ${fields.churchTime}</p>
      </div>
      <div class="dot">·</div>
      <div class="detail-col">
        <p class="detail-label">Marea Sărbătoare</p>
        <p class="detail-val">${fields.restaurant}</p>
        <p class="detail-time">Ora ${fields.restTime}</p>
      </div>
    </div>
    <div class="rsvp-block">
      Confirmați prezența până pe <span>${formatRsvp(fields.rsvpDate)}</span><br/>
      Tel: <span>${fields.rsvpTel}</span>
    </div>
  </div>

</div>
</body>
</html>`
}