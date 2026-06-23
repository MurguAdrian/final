import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const maxDuration = 60

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia' as any,
})

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

function buildHTML(fields: Record<string, string>) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;1,400&family=Cinzel:wght@400;600&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 794px; height: 1123px; background: #FEFBF3; font-family: 'EB Garamond', serif; }
.inv { width: 794px; height: 1123px; background: #FEFBF3; border: 2px solid #C9A84C; position: relative; overflow: hidden; padding: 60px 70px 70px; box-sizing: border-box; }
.inv::before { content: ''; position: absolute; inset: 10px; border: 1px solid rgba(201,168,76,.3); pointer-events: none; }
.corner { position: absolute; width: 90px; height: 90px; opacity: .55; }
.corner.tl { top: 20px; left: 20px; }
.corner.tr { top: 20px; right: 20px; transform: scaleX(-1); }
.corner.bl { bottom: 20px; left: 20px; transform: scaleY(-1); }
.corner.br { bottom: 20px; right: 20px; transform: scale(-1); }
.divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); margin: 20px 0; opacity: .6; }
.divider-sm { width: 50%; height: 1px; margin: 14px auto; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); opacity: .4; }
.top { text-align: center; padding: 0 40px; }
.intro { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .25em; text-transform: uppercase; color: #8B6914; margin-bottom: 8px; }
.parents { font-size: 16px; color: #5C4A1E; line-height: 1.8; font-style: italic; }
.and { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: .2em; color: #C9A84C; text-transform: uppercase; margin: 4px 0; }
.names { text-align: center; padding: 8px 0; }
.bride, .groom { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; font-style: italic; color: #1A1208; line-height: 1.1; }
.amp { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 300; color: #C9A84C; line-height: 1; display: block; margin: 4px 0; text-align: center; }
.invite { text-align: center; font-size: 15px; color: #5C4A1E; line-height: 2; padding: 0 60px; font-style: italic; }
.invite strong { font-style: normal; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .2em; color: #8B6914; display: block; margin-bottom: 6px; }
.date-block { text-align: center; padding: 6px 0; }
.date-main { font-family: 'Cinzel', serif; font-size: 18px; color: #1A1208; letter-spacing: .12em; }
.date-year { font-family: 'Cinzel', serif; font-size: 32px; font-weight: 600; color: #C9A84C; display: block; letter-spacing: .08em; }
.events { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 6px 0; }
.event { text-align: center; padding: 14px 10px; border: 1px solid rgba(201,168,76,.4); border-radius: 6px; background: rgba(201,168,76,.04); }
.ev-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em; color: #C9A84C; text-transform: uppercase; margin-bottom: 6px; }
.ev-name { font-size: 14px; color: #1A1208; font-style: italic; line-height: 1.5; margin-bottom: 4px; }
.ev-time { font-family: 'Cinzel', serif; font-size: 12px; color: #8B6914; letter-spacing: .1em; }
.nasi { text-align: center; font-size: 15px; color: #5C4A1E; line-height: 1.8; font-style: italic; padding: 0 20px; }
.nasi strong { font-style: normal; font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em; color: #8B6914; display: block; margin-bottom: 4px; }
.fleuron { font-size: 20px; color: #C9A84C; opacity: .5; display: block; text-align: center; margin: 6px 0; }
.rsvp { text-align: center; padding: 14px 30px; background: rgba(201,168,76,.08); border-top: 1px solid rgba(201,168,76,.3); position: absolute; bottom: 0; left: 0; right: 0; font-size: 13px; color: #5C4A1E; font-style: italic; }
.rsvp span { color: #C9A84C; font-style: normal; font-weight: 600; }
</style>
</head>
<body>
<div class="inv">
  <svg class="corner tl" viewBox="0 0 90 90" fill="none"><path d="M4 86 L4 4 L86 4" stroke="#C9A84C" stroke-width="1.5" fill="none"/><path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" stroke-width=".8" fill="none" opacity=".5"/><circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/><circle cx="46" cy="4" r="2.5" fill="#C9A84C" opacity=".4"/><circle cx="4" cy="46" r="2.5" fill="#C9A84C" opacity=".4"/></svg>
  <svg class="corner tr" viewBox="0 0 90 90" fill="none"><path d="M4 86 L4 4 L86 4" stroke="#C9A84C" stroke-width="1.5" fill="none"/><path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" stroke-width=".8" fill="none" opacity=".5"/><circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/></svg>
  <svg class="corner bl" viewBox="0 0 90 90" fill="none"><path d="M4 86 L4 4 L86 4" stroke="#C9A84C" stroke-width="1.5" fill="none"/><path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" stroke-width=".8" fill="none" opacity=".5"/><circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/></svg>
  <svg class="corner br" viewBox="0 0 90 90" fill="none"><path d="M4 86 L4 4 L86 4" stroke="#C9A84C" stroke-width="1.5" fill="none"/><path d="M4 86 Q12 64 4 46 Q12 28 22 14 Q34 4 46 4" stroke="#C9A84C" stroke-width=".8" fill="none" opacity=".5"/><circle cx="4" cy="4" r="4" fill="#C9A84C" opacity=".7"/></svg>
  <div class="top">
    <p class="intro">Cu binecuvântarea părinților</p>
    <p class="parents">${fields.parentsGroom}</p>
    <p class="and">și</p>
    <p class="parents">${fields.parentsBride}</p>
  </div>
  <div class="divider"></div>
  <div class="names">
    <p class="bride">${fields.bride}</p>
    <span class="amp">&amp;</span>
    <p class="groom">${fields.groom}</p>
  </div>
  <div class="divider-sm"></div>
  <span class="fleuron">✦</span>
  <div class="invite">
    <strong>vă invită cu drag la nunta lor</strong>
    Vă așteptăm alături de noi în ziua în care ne unim destinele
  </div>
  <div class="divider-sm"></div>
  <div class="date-block">
    <p class="date-main">${formatDate(fields.weddingDate)}</p>
    <span class="date-year">${getYear(fields.weddingDate)}</span>
  </div>
  <div class="divider"></div>
  <div class="events">
    <div class="event"><p class="ev-label">Cununie</p><p class="ev-name">${fields.church}</p><p class="ev-time">ora ${fields.churchTime}</p></div>
    <div class="event"><p class="ev-label">Recepție</p><p class="ev-name">${fields.restaurant}</p><p class="ev-time">ora ${fields.restTime}</p></div>
  </div>
  <div class="divider-sm"></div>
  <div class="nasi"><strong>Nași de cununie</strong>${fields.nasi}</div>
  <div class="rsvp">Confirmați prezența până pe <span>${formatRsvp(fields.rsvpDate)}</span> &nbsp;·&nbsp; Tel: <span>${fields.rsvpTel}</span></div>
</div>
</body>
</html>`
}
async function generate(html: string, format: 'pdf' | 'jpg'): Promise<string> {
  const chromium = await import('@sparticuz/chromium')
  const puppeteer = await import('puppeteer-core')
  const executablePath = await chromium.default.executablePath()
  const browser = await puppeteer.default.launch({
    args: chromium.default.args,
    defaultViewport: { width: 794, height: 1123 },
    executablePath,
    headless: true as any,
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 794, height: 1123 })
  await page.setContent(html, { waitUntil: 'load' })
  await new Promise(r => setTimeout(r, 2000))

  if (format === 'jpg') {
    const shot = await page.screenshot({ type: 'jpeg', quality: 95, encoding: 'base64', fullPage: false, clip: { x: 0, y: 0, width: 794, height: 1123 } })
    await browser.close()
    return shot as string
  }

  const pdf = await page.pdf({ width: '794px', height: '1123px', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } })
  await browser.close()
  return btoa(String.fromCharCode(...new Uint8Array(pdf.buffer as ArrayBuffer)))
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  const format = searchParams.get('format') as 'pdf' | 'jpg' | null

  if (!sessionId) return new NextResponse('Session ID lipsă', { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return new NextResponse('Plata nu a fost confirmată', { status: 402 })
    if (session.metadata?.paymentType !== 'invitatie_pdf') return new NextResponse('Tip plată invalid', { status: 400 })

    const fields = JSON.parse(session.metadata?.fields || '{}')
    const filename = `invitatie-nunta-${fields.bride || 'vibeinvite'}`

if (format === 'pdf' || format === 'jpg') {
  const html = buildHTML(fields)
  const base64 = await generate(html, format)
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Response(bytes.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': format === 'pdf' ? 'application/pdf' : 'image/jpeg',
      'Content-Disposition': `attachment; filename="${filename}.${format}"`,
    },
  })
}

    const pdfUrl = `${origin}/api/invitatii-pdf/download?session_id=${sessionId}&format=pdf`
    const jpgUrl = `${origin}/api/invitatii-pdf/download?session_id=${sessionId}&format=jpg`

    const successHtml = `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Invitație gata — VibeInvite</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'EB Garamond', serif; background: #FDFAF6; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 24px; }
.card { background: #fff; border: 1px solid rgba(201,168,76,.3); border-radius: 16px; padding: 52px 48px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 0 0 6px #FDFAF6, 0 0 0 7px rgba(201,168,76,.2); }
.icon { font-size: 48px; margin-bottom: 16px; }
h1 { font-family: 'Cinzel', serif; font-size: 22px; font-weight: 400; letter-spacing: .1em; color: #1A1208; margin-bottom: 10px; }
.sub { font-size: 15px; color: rgba(26,18,8,.55); line-height: 1.7; margin-bottom: 8px; font-style: italic; }
.status { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .1em; color: #C9A84C; margin-bottom: 32px; min-height: 20px; }
.divider { width: 60%; height: 1px; margin: 0 auto 28px; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); opacity: .4; }
.btn { display: block; width: 100%; padding: 14px; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; font-weight: 600; text-decoration: none; margin-bottom: 10px; }
.btn-pdf { background: #C9A84C; color: #1A1208; }
.btn-jpg { background: transparent; color: #C9A84C; border: 2px solid #C9A84C; }
.btn:hover { opacity: .85; }
.note { font-size: 11px; color: rgba(26,18,8,.4); margin-top: 16px; font-style: italic; line-height: 1.6; }
.spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(201,168,76,.3); border-top-color: #C9A84C; border-radius: 50%; animation: spin .8s linear infinite; margin-right: 6px; vertical-align: middle; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
<div class="card">
  <div class="icon">✨</div>
  <h1>Mulțumim!</h1>
  <p class="sub">Plata confirmată. Fișierele se descarcă automat.</p>
  <p class="status" id="st"><span class="spinner"></span>Se pregătesc fișierele...</p>
  <div class="divider"></div>
  <a href="${pdfUrl}" class="btn btn-pdf" download>↓ Descarcă PDF</a>
  <a href="${jpgUrl}" class="btn btn-jpg" download>↓ Descarcă JPG</a>
  <p class="note">Dacă descărcările nu pornesc automat,<br>apasă butoanele de mai sus.</p>
</div>
<script>
window.addEventListener('load', function() {
  setTimeout(function() {
    var a1 = document.createElement('a');
    a1.href = '${pdfUrl}';
    a1.download = '${filename}.pdf';
    a1.style.display = 'none';
    document.body.appendChild(a1);
    a1.click();
    setTimeout(function() {
      var a2 = document.createElement('a');
      a2.href = '${jpgUrl}';
      a2.download = '${filename}.jpg';
      a2.style.display = 'none';
      document.body.appendChild(a2);
      a2.click();
      document.getElementById('st').textContent = 'Fișierele sunt gata!';
    }, 3000);
  }, 1000);
});
</script>
</body>
</html>`

    return new NextResponse(successHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })

  } catch (err: any) {
    console.error('Download error:', err)
    return new NextResponse('Eroare la generare. Te rugăm să încerci din nou.', { status: 500 })
  }
}