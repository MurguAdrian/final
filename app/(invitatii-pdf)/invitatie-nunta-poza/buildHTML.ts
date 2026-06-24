function getInitials(groom: string, bride: string) {
  const g = (groom || 'M').trim().charAt(0).toUpperCase()
  const b = (bride || 'S').trim().charAt(0).toUpperCase()
  return [g, b]
}

const MONTHS_UP = ['IANUARIE','FEBRUARIE','MARTIE','APRILIE','MAI','IUNIE','IULIE','AUGUST','SEPTEMBRIE','OCTOMBRIE','NOIEMBRIE','DECEMBRIE']
const DAYS = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă']

function formatDateUp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${d.getDate()} ${MONTHS_UP[d.getMonth()]} ${d.getFullYear()}`
}
function formatRsvp(val: string) {
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  return `${d.getDate()} ${MONTHS_UP[d.getMonth()]} ${d.getFullYear()}`
}

export function buildHTML_poza(fields: Record<string, string>): string {
  const [init1, init2] = getInitials(fields.groom, fields.bride)

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; font-family: 'Raleway', sans-serif; }
.inv {
  width: 794px; height: 1123px;
  position: relative; overflow: hidden;
}

/* ── FUNDAL FORESTIER ── */
.bg { position: absolute; inset: 0; z-index: 0; }

/* ── OVERLAY INCHIS ── */
.overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(15,10,5,.45) 0%,
    rgba(20,13,6,.35) 30%,
    rgba(25,15,5,.5) 70%,
    rgba(10,6,2,.7) 100%
  );
}

/* ── VIGNETA margini ── */
.vignette {
  position: absolute; inset: 0; z-index: 3;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(5,3,1,.65) 100%);
}

/* ── CONTINUT ── */
.content {
  position: absolute; inset: 0; z-index: 4;
  display: flex; flex-direction: column;
  align-items: center; justify-content: space-between;
  padding: 60px 80px 56px;
  color: #fff; text-align: center;
}

/* ── MONOGRAMA ── */
.monogram {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.mono-subtitle {
  font-size: 11px; font-weight: 400;
  letter-spacing: .32em; text-transform: uppercase;
  color: rgba(255,255,255,.65); margin-bottom: 6px;
}
.mono-box {
  position: relative; width: 110px; height: 110px;
}
.mono-initials {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 36px; font-weight: 400; font-style: italic;
  color: #fff; line-height: 1.1; gap: 0;
}

/* ── TEXT CENTRAL ── */
.middle { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }

.vii-invitati {
  font-size: 15px; font-weight: 400;
  letter-spacing: .22em; text-transform: uppercase;
  color: rgba(255,255,255,.7); margin-bottom: 10px;
}

.names {
  font-family: 'Playfair Display', serif;
  font-size: 96px; font-weight: 400; font-style: italic;
  color: #fff; line-height: 1; display: block;
  text-shadow: 0 2px 20px rgba(0,0,0,.4);
  margin-bottom: 32px;
}
.names-amp {
  font-family: 'Playfair Display', serif;
  font-size: 72px; font-weight: 300; font-style: italic;
  color: rgba(255,255,255,.85);
}

/* ── INFO JOS ── */
.bottom { width: 100%; }

.sep-line {
  width: 100%; height: 1px;
  background: rgba(255,255,255,.3);
  margin-bottom: 24px;
}

.parents-row {
  font-size: 17px; font-weight: 400;
  letter-spacing: .1em; text-transform: uppercase;
  color: rgba(255,255,255,.9); line-height: 1.7;
  margin-bottom: 20px;
}

.date-block {
  font-size: 26px; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase;
  color: #fff; margin-bottom: 18px;
  text-shadow: 0 1px 8px rgba(0,0,0,.3);
}

.sep-line-2 {
  width: 100%; height: 1px;
  background: rgba(255,255,255,.3);
  margin-bottom: 18px;
}

.rsvp {
  font-size: 15px; font-weight: 300;
  letter-spacing: .14em; color: rgba(255,255,255,.6);
  font-style: italic;
}
</style>
</head>
<body>
<div class="inv">

  <!-- FUNDAL FORESTIER SVG -->
  <svg class="bg" viewBox="0 0 794 1123" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Cer amurg/toamna -->
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4a3020"/>
        <stop offset="25%" stop-color="#6b4a2a"/>
        <stop offset="50%" stop-color="#8a6035"/>
        <stop offset="70%" stop-color="#5a3a18"/>
        <stop offset="100%" stop-color="#2a1808"/>
      </linearGradient>
      <!-- Sol -->
      <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1005"/>
        <stop offset="100%" stop-color="#0a0803"/>
      </linearGradient>
      <!-- Ceata -->
      <filter id="fog">
        <feGaussianBlur stdDeviation="12"/>
      </filter>
      <!-- Copac silhouette filter -->
      <filter id="tree-shadow">
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in="SourceGraphic"/>
      </filter>
    </defs>

    <!-- Cer gradient toamna -->
    <rect width="794" height="1123" fill="url(#sky)"/>

    <!-- Ceata de fundal -->
    <ellipse cx="397" cy="500" rx="500" ry="200" fill="#a08050" opacity=".08" filter="url(#fog)"/>
    <ellipse cx="200" cy="600" rx="300" ry="150" fill="#c09060" opacity=".06" filter="url(#fog)"/>
    <ellipse cx="600" cy="550" rx="280" ry="120" fill="#b07040" opacity=".06" filter="url(#fog)"/>

    <!-- Dealuri fundal departate -->
    <path d="M0 680 Q100 620 200 640 Q300 660 400 620 Q500 580 600 610 Q700 640 794 600 L794 780 L0 780Z" fill="#3a2510" opacity=".7"/>
    <path d="M0 700 Q150 650 280 670 Q400 690 520 650 Q640 610 794 640 L794 800 L0 800Z" fill="#2a1a08" opacity=".8"/>

    <!-- COPACI MARI - primul plan dreapta -->
    <!-- Molid drept stanga 1 -->
    <path d="M60 1123 L60 400 L20 500 L60 480 L15 560 L60 540 L10 630 L60 600 L5 700 L60 670 L0 760 L60 730 L0 830 L60 800 L10 900 L60 870 L60 1123Z" fill="#0a0a05"/>
    <path d="M60 400 L100 500 L60 480 L105 560 L60 540 L110 630 L60 600 L115 700 L60 670 L120 760 L60 730 L120 830 L60 800 L110 900 L60 870 L60 400Z" fill="#0d0d06"/>

    <!-- Molid stanga 2 mare -->
    <path d="M-20 1123 L-20 320 L-65 430 L-20 405 L-75 510 L-20 480 L-80 590 L-20 560 L-85 680 L-20 645 L-85 770 L-20 740 L-80 860 L-20 830 L-20 1123Z" fill="#080805"/>
    <path d="M-20 320 L25 430 L-20 405 L30 510 L-20 480 L35 590 L-20 560 L40 680 L-20 645 L40 770 L-20 740 L35 860 L-20 830 L-20 320Z" fill="#0c0c07"/>

    <!-- Molid dreapta 1 -->
    <path d="M734 1123 L734 380 L694 480 L734 460 L689 545 L734 520 L684 615 L734 585 L679 685 L734 655 L674 755 L734 725 L679 835 L734 805 L689 905 L734 875 L734 1123Z" fill="#080805"/>
    <path d="M734 380 L774 480 L734 460 L779 545 L734 520 L784 615 L734 585 L789 685 L734 655 L794 755 L734 725 L794 835 L734 805 L784 905 L734 875 L734 380Z" fill="#0d0d06"/>

    <!-- Molid dreapta 2 mai mare -->
    <path d="M800 1123 L800 300 L755 410 L800 385 L750 500 L800 470 L745 590 L800 555 L740 675 L800 645 L735 760 L800 730 L740 855 L800 825 L800 1123Z" fill="#060603"/>
    <path d="M800 300 L845 410 L800 385 L850 500 L800 470 L855 590 L800 555 L860 675 L800 645 L865 760 L800 730 L860 855 L800 825 L800 300Z" fill="#0a0a05"/>

    <!-- Molid mijloc stanga -->
    <path d="M140 1123 L140 500 L105 585 L140 565 L100 645 L140 620 L95 705 L140 680 L90 775 L140 745 L88 845 L140 815 L95 915 L140 885 L140 1123Z" fill="#0a0a06"/>
    <path d="M140 500 L175 585 L140 565 L180 645 L140 620 L185 705 L140 680 L190 775 L140 745 L192 845 L140 815 L185 915 L140 885 L140 500Z" fill="#0e0e07"/>

    <!-- Molid mijloc dreapta -->
    <path d="M650 1123 L650 480 L615 565 L650 545 L610 625 L650 600 L605 690 L650 660 L600 755 L650 725 L596 820 L650 790 L605 890 L650 860 L650 1123Z" fill="#080806"/>
    <path d="M650 480 L685 565 L650 545 L690 625 L650 600 L695 690 L650 660 L700 755 L650 725 L704 820 L650 790 L695 890 L650 860 L650 480Z" fill="#0c0c07"/>

    <!-- Copaci foiosi toamna dreapta - siluete -->
    <path d="M700 1123 L700 600 Q680 560 660 540 Q680 520 700 500 Q720 520 740 510 Q730 550 750 560 Q730 590 720 600 L720 1123Z" fill="#1a1005" opacity=".9"/>
    <path d="M680 560 Q660 520 640 500 Q650 480 670 470 Q690 480 700 500 Q680 520 680 560Z" fill="#2a1808" opacity=".85"/>

    <!-- Copac foios stanga -->
    <path d="M100 1123 L100 580 Q80 540 55 520 Q75 500 100 485 Q125 500 145 510 Q130 545 150 560 Q130 590 115 600 L115 1123Z" fill="#1a1005" opacity=".9"/>

    <!-- Sol inchis jos -->
    <rect y="880" width="794" height="243" fill="url(#ground)"/>
    <path d="M0 880 Q200 860 400 870 Q600 880 794 860 L794 900 L0 900Z" fill="#100a03"/>

    <!-- Textura pamant/ierburi -->
    <path d="M0 900 Q50 890 80 900 Q120 910 150 900 Q200 890 230 900 L230 1123 L0 1123Z" fill="#0c0803"/>
    <path d="M150 910 Q200 900 250 910 Q300 920 350 908 Q400 896 450 910 L450 1123 L150 1123Z" fill="#0a0702"/>
    <path d="M400 905 Q450 895 500 905 Q550 915 600 903 Q650 891 700 905 L700 1123 L400 1123Z" fill="#0c0803"/>
    <path d="M600 910 Q650 900 700 910 Q750 920 794 908 L794 1123 L600 1123Z" fill="#0a0702"/>

    <!-- Ierburi/tufisuri siluete -->
    <path d="M0 920 Q15 900 25 920 Q35 900 45 920 Q50 905 60 920 L60 1123 L0 1123Z" fill="#080603"/>
    <path d="M70 925 Q85 905 95 925 Q108 908 118 925 Q125 910 135 925 L135 1123 L70 1123Z" fill="#060502"/>
    <path d="M300 915 Q315 895 325 915 Q338 898 348 915 L348 1123 L300 1123Z" fill="#080603"/>
    <path d="M500 918 Q518 898 528 918 Q542 900 552 918 L552 1123 L500 1123Z" fill="#060502"/>
    <path d="M680 912 Q695 892 705 912 Q718 895 728 912 L728 1123 L680 1123Z" fill="#080603"/>

    <!-- Lumina luna / ceata in spate copacilor -->
    <ellipse cx="397" cy="520" rx="180" ry="120" fill="#c0a060" opacity=".04" filter="url(#fog)"/>
    <ellipse cx="397" cy="580" rx="220" ry="100" fill="#d0b070" opacity=".03" filter="url(#fog)"/>

    <!-- Gradient inchis sus pentru text lizibil -->
    <rect width="794" height="300" fill="url(#top-dark)"/>
    <defs>
      <linearGradient id="top-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050302" stop-opacity=".7"/>
        <stop offset="100%" stop-color="#050302" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bot-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050302" stop-opacity="0"/>
        <stop offset="100%" stop-color="#050302" stop-opacity=".8"/>
      </linearGradient>
    </defs>
    <!-- Gradient inchis jos pentru text lizibil -->
    <rect y="700" width="794" height="423" fill="url(#bot-dark)"/>
  </svg>

  <!-- Overlay semi-transparent sepia -->
  <div class="overlay"></div>
  <!-- Vigneta -->
  <div class="vignette"></div>

  <!-- CONTENT -->
  <div class="content">

    <!-- MONOGRAMA sus -->
    <div class="monogram">
      <p class="mono-subtitle">VĂ INVITĂM ÎMPREUNĂ</p>
      <div class="mono-box">
        <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:110px;height:110px;">
          <!-- Patrat exterior rotit 45° -->
          <rect x="20" y="20" width="70" height="70" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.5" transform="rotate(45 55 55)"/>
          <!-- Patrat interior rotit 45° -->
          <rect x="28" y="28" width="54" height="54" fill="none" stroke="rgba(255,255,255,.4)" stroke-width=".8" transform="rotate(45 55 55)"/>
          <!-- Diamant mic sus -->
          <polygon points="55,4 59,10 55,16 51,10" fill="rgba(255,255,255,.7)"/>
          <!-- Diamant mic jos -->
          <polygon points="55,94 59,100 55,106 51,100" fill="rgba(255,255,255,.7)"/>
          <!-- Diamant mic stanga -->
          <polygon points="4,55 10,51 16,55 10,59" fill="rgba(255,255,255,.7)"/>
          <!-- Diamant mic dreapta -->
          <polygon points="94,55 100,51 106,55 100,59" fill="rgba(255,255,255,.7)"/>
          <!-- Initiale -->
          <text x="55" y="48" text-anchor="middle" font-family="Playfair Display, serif" font-size="26" font-style="italic" fill="white" opacity=".95">${init1}</text>
          <text x="55" y="76" text-anchor="middle" font-family="Playfair Display, serif" font-size="26" font-style="italic" fill="white" opacity=".95">${init2}</text>
        </svg>
      </div>
    </div>

    <!-- MIJLOC - Nume -->
    <div class="middle">
      <span class="names">${fields.groom} <span class="names-amp">&amp;</span> ${fields.bride}</span>
    </div>

    <!-- JOS - Info -->
    <div class="bottom">
      <div class="sep-line"></div>
      <p class="parents-row">
        ${fields.parentsBride}<br/>
        ${fields.parentsGroom}
      </p>
      <p class="date-block">${formatDateUp(fields.weddingDate)}</p>
      <div class="sep-line-2"></div>
      <p class="rsvp">${fields.church} / Ora ${fields.churchTime} &nbsp;·&nbsp; ${fields.restaurant} / Ora ${fields.restTime}</p>
      <p class="rsvp" style="margin-top:8px;">Confirmați până pe ${formatRsvp(fields.rsvpDate)} · Tel: ${fields.rsvpTel}</p>
    </div>

  </div>
</div>
</body>
</html>`
}