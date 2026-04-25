import type { Metadata } from 'next'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA — îmbunătățit
═══════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: 'Despre VibeInvite | Invitații Digitale Premium pentru Nuntă și Botez',
  description:
    'Povestea VibeInvite — platforma românească de invitații digitale all-in-one pentru nuntă, botez și petreceri. Invitații nelimitate, meniu QR, upload poze invitați, export Excel. 300 lei, plată unică.',
  keywords: [
    'despre VibeInvite',
    'platforma invitatii digitale Romania',
    'invitatii digitale premium nunta',
    'invitatii online botez Romania',
    'invitatie digitala all-in-one',
    'cine face invitatii digitale Romania',
    'platforma invitatii nunta online',
    'invitatii nunta moderne',
    'echipa VibeInvite',
    'misiune VibeInvite',
    'invitatii digitale elegante',
    'invitatii online premium botez nunta',
  ],
  authors: [{ name: 'VibeInvite', url: 'https://vibeinvite.ro' }],
  creator: 'VibeInvite',
  publisher: 'VibeInvite',
  metadataBase: new URL('https://vibeinvite.ro'),
  alternates: { canonical: 'https://vibeinvite.ro/despre' },
  openGraph: {
    type: 'website',
    url: 'https://vibeinvite.ro/despre',
    title: 'Despre VibeInvite — Platforma Română de Invitații Digitale Premium',
    description:
      'Invitații digitale all-in-one pentru nuntă și botez: nelimitate, meniu QR, upload poze invitați, export Excel. Află povestea VibeInvite.',
    siteName: 'VibeInvite',
    images: [{ url: '/og-despre.jpg', width: 1200, height: 630, alt: 'Despre VibeInvite' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Despre VibeInvite — Invitații Digitale Premium',
    description: 'Platforma română all-in-one pentru invitații de nuntă și botez. Povestea noastră.',
    images: ['/og-despre.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

/* ═══════════════════════════════════════════════════════════════
   STYLES — prefix vd- (despre page)
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vd-page * { box-sizing: border-box; margin: 0; padding: 0; }

.vd-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* ── orbs ── */
@keyframes vd-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vd-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vd-o1  { width: 480px; height: 480px; background: radial-gradient(circle,rgba(255,107,0,.16) 0%,transparent 70%); top: -80px; right: -80px; animation: vd-orb 14s ease-in-out infinite; }
.vd-o2  { width: 300px; height: 300px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 80px; left: -50px; animation: vd-orb 18s ease-in-out infinite reverse; }
.vd-o3  { width: 200px; height: 200px; background: radial-gradient(circle,rgba(255,200,100,.1) 0%,transparent 70%); top: 50%; left: 50%; animation: vd-orb 22s ease-in-out infinite 4s; }

/* ── animations ── */
@keyframes vd-up     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes vd-in     { from{opacity:0} to{opacity:1} }
@keyframes vd-dot    { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vd-shimmer{ 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vd-tick   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vd-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes vd-rowIn  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
@keyframes vd-scaleIn{ from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }

/* ── inner wrapper ── */
.vd-inner {
  position: relative; z-index: 10;
  max-width: 1160px; margin: 0 auto;
  padding: 48px 20px 64px;
}

/* ── page header ── */
.vd-header { text-align: center; margin-bottom: 52px; opacity: 0; animation: vd-up .7s ease .1s forwards; }

.vd-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vd-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vd-dot 1.8s ease-in-out infinite; }

.vd-tagline {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, #FF6B00, #FF8C35);
  color: #fff; border-radius: 12px; padding: 9px 20px;
  font-size: 13px; font-weight: 600; letter-spacing: .02em; margin-bottom: 20px;
}

.vd-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 300; line-height: 1.08; color: #1A1208; margin-bottom: 16px;
}
.vd-h1 em     { font-style: italic; color: #FF6B00; }
.vd-h1 strong { font-weight: 600; }

.vd-lead {
  font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62);
  max-width: 560px; margin: 0 auto;
}
.vd-lead strong { color: #1A1208; font-weight: 600; }

/* ════════════════════════════════════════════
   HERO INTRO CARD — povestea
════════════════════════════════════════════ */
.vd-story {
  background: #fff; border-radius: 28px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 16px 56px rgba(0,0,0,.08);
  overflow: hidden; position: relative; margin-bottom: 24px;
  opacity: 0; animation: vd-up .8s ease .2s forwards;
}
.vd-story::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
}
.vd-story-inner {
  display: grid; grid-template-columns: 1fr;
  gap: 0;
}
@media (min-width: 860px) {
  .vd-story-inner { grid-template-columns: 1fr 1fr; }
}

.vd-story-left {
  padding: 40px 40px 36px;
  background: linear-gradient(160deg, #FFF4ED 0%, #fff8f0 100%);
  border-right: 1px solid rgba(255,107,0,.1);
  position: relative;
}
.vd-story-left::after {
  content: '"'; position: absolute; top: 24px; right: 28px;
  font-family: 'Cormorant Garamond', serif; font-size: 96px; font-style: italic;
  color: rgba(255,107,0,.12); line-height: 1; pointer-events: none;
}

.vd-story-label {
  font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #FF6B00; margin-bottom: 16px;
}
.vd-story-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(20px, 3vw, 28px); font-weight: 300; font-style: italic;
  color: #1A1208; line-height: 1.45; margin-bottom: 20px;
}
.vd-story-quote em { color: #FF6B00; font-style: italic; }

.vd-story-body { font-size: 14px; line-height: 1.8; color: rgba(26,18,8,.65); }
.vd-story-body p + p { margin-top: 12px; }
.vd-story-body strong { color: #1A1208; font-weight: 600; }

.vd-story-right { padding: 40px; display: flex; flex-direction: column; gap: 20px; }

.vd-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.vd-stat-box {
  background: #FDFAF6; border-radius: 16px;
  border: 1px solid rgba(255,107,0,.1); padding: 18px 16px;
  text-align: center;
  transition: border-color .2s, transform .2s;
}
.vd-stat-box:hover { border-color: rgba(255,107,0,.35); transform: translateY(-2px); }
.vd-stat-num   { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 600; color: #FF6B00; line-height: 1; }
.vd-stat-label { font-size: 11px; color: rgba(26,18,8,.55); margin-top: 4px; }

.vd-pack-box {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  border-radius: 20px; padding: 22px 24px;
}
.vd-pack-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 12px; }
.vd-pack-row {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,.07);
  font-size: 12px;
}
.vd-pack-row:last-child { border-bottom: none; }
.vd-pack-icon { font-size: 14px; width: 22px; text-align: center; }
.vd-pack-text { color: rgba(255,255,255,.8); }
.vd-pack-check { margin-left: auto; color: #86efac; font-size: 12px; font-weight: 700; }

/* ════════════════════════════════════════════
   2-COL GRID — misiune + valori
════════════════════════════════════════════ */
.vd-grid2 {
  display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 24px;
}
@media (min-width: 768px) {
  .vd-grid2 { grid-template-columns: 1fr 1fr; }
}

/* ── misiune card ── */
.vd-mission {
  background: #fff; border-radius: 24px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 10px rgba(0,0,0,.04);
  padding: 32px;
  opacity: 0; animation: vd-up .8s ease .3s forwards;
}
.vd-section-label {
  font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #FF6B00; margin-bottom: 14px; display: flex; align-items: center; gap: 7px;
}
.vd-section-icon {
  width: 28px; height: 28px; border-radius: 8px; background: #FFF4ED;
  display: flex; align-items: center; justify-content: center; font-size: 13px;
}
.vd-card-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px; font-weight: 300; color: #1A1208; margin-bottom: 16px; line-height: 1.2;
}
.vd-card-h2 em { font-style: italic; color: #FF6B00; }
.vd-card-text { font-size: 14px; line-height: 1.85; color: rgba(26,18,8,.65); }
.vd-card-text + .vd-card-text { margin-top: 12px; }
.vd-card-text strong { color: #1A1208; font-weight: 600; }

/* ── valori card ── */
.vd-values {
  background: linear-gradient(160deg, #FFF4ED 0%, #fff8f0 100%);
  border-radius: 24px; border: 1px solid rgba(255,107,0,.15);
  box-shadow: 0 2px 10px rgba(0,0,0,.04);
  padding: 32px;
  opacity: 0; animation: vd-up .8s ease .38s forwards;
}
.vd-value-list { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
.vd-value-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 14px; border-radius: 14px;
  transition: background .18s;
  opacity: 0;
}
.vd-value-item:nth-child(1) { animation: vd-rowIn .5s ease .5s forwards; }
.vd-value-item:nth-child(2) { animation: vd-rowIn .5s ease .6s forwards; }
.vd-value-item:nth-child(3) { animation: vd-rowIn .5s ease .7s forwards; }
.vd-value-item:nth-child(4) { animation: vd-rowIn .5s ease .8s forwards; }
.vd-value-item:nth-child(5) { animation: vd-rowIn .5s ease .9s forwards; }
.vd-value-item:hover { background: rgba(255,107,0,.06); }
.vd-value-ico {
  width: 34px; height: 34px; border-radius: 10px; background: #fff;
  border: 1px solid rgba(255,107,0,.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
  transition: background .2s, transform .2s;
}
.vd-value-item:hover .vd-value-ico { background: rgba(255,107,0,.12); transform: scale(1.08); }
.vd-value-txt { font-size: 13.5px; color: #1A1208; line-height: 1.6; }
.vd-value-txt strong { font-weight: 600; display: block; margin-bottom: 1px; }
.vd-value-sub { font-size: 12px; color: rgba(26,18,8,.55); }

/* ════════════════════════════════════════════
   WHY DIGITAL — features grid 3 col
════════════════════════════════════════════ */
.vd-why {
  background: #fff; border-radius: 24px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 10px rgba(0,0,0,.04);
  padding: 32px 36px; margin-bottom: 24px;
  opacity: 0; animation: vd-up .8s ease .45s forwards;
}
.vd-why-header { margin-bottom: 24px; }
.vd-why-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (min-width: 768px) {
  .vd-why-grid { grid-template-columns: repeat(3, 1fr); }
}
.vd-why-item {
  display: flex; flex-direction: column;
  background: #FDFAF6; border-radius: 16px;
  border: 1px solid rgba(255,107,0,.08); padding: 18px 16px;
  transition: border-color .2s, box-shadow .2s, transform .2s;
  cursor: default;
}
.vd-why-item:hover {
  border-color: rgba(255,107,0,.35);
  box-shadow: 0 4px 20px rgba(255,107,0,.1);
  transform: translateY(-2px);
}
.vd-why-ico  { font-size: 22px; margin-bottom: 10px; }
.vd-why-name { font-size: 13px; font-weight: 600; color: #1A1208; margin-bottom: 5px; }
.vd-why-desc { font-size: 12px; color: rgba(26,18,8,.55); line-height: 1.55; }

/* ════════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════════ */
.vd-cta-banner {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  border-radius: 28px; padding: 44px 40px;
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 20px;
  position: relative; overflow: hidden;
  opacity: 0; animation: vd-up .8s ease .55s forwards;
}
.vd-cta-banner::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
}
.vd-cta-ring {
  position: absolute; border-radius: 50%; border: 1px solid rgba(255,107,0,.15); pointer-events: none;
}
.vd-cta-r1 { width: 320px; height: 320px; top: -100px; right: -60px; }
.vd-cta-r2 { width: 200px; height: 200px; top: -40px; right: 0; animation: vd-spin 40s linear infinite; border-style: dashed; }

.vd-cta-label { font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.5); }
.vd-cta-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(26px, 4vw, 40px); font-weight: 300; color: #fff; line-height: 1.2;
}
.vd-cta-h2 em { font-style: italic; color: #FF8C35; }
.vd-cta-sub { font-size: 14px; color: rgba(255,255,255,.6); max-width: 440px; line-height: 1.7; }
.vd-cta-price {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(255,107,0,.18); border: 1px solid rgba(255,107,0,.35);
  border-radius: 100px; padding: 8px 20px;
  font-size: 13px; font-weight: 600; color: #FFB374;
}
.vd-cta-btn {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 15px 32px; border-radius: 100px;
  background: #FF6B00; color: #fff;
  font-size: 15px; font-weight: 600; text-decoration: none;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(255,107,0,.4);
  transition: background .25s, transform .2s, box-shadow .25s;
}
.vd-cta-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  background-size: 400px 100%; animation: vd-shimmer 2.5s linear infinite;
}
.vd-cta-btn:hover { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,107,0,.5); }
.vd-cta-note { font-size: 12px; color: rgba(255,255,255,.35); }

/* ── guarantee strip ── */
.vd-guarantee {
  display: flex; align-items: center; justify-content: center; gap: 28px;
  flex-wrap: wrap;
  background: #fff; border-radius: 20px;
  border: 1px solid rgba(255,107,0,.1);
  padding: 18px 28px; margin-top: 24px;
  opacity: 0; animation: vd-up .8s ease .65s forwards;
}
.vd-gi   { display: flex; align-items: center; gap: 9px; }
.vd-gico { font-size: 20px; }
.vd-gtxt { font-size: 12px; font-weight: 500; color: rgba(26,18,8,.65); }
.vd-gtxt strong { color: #1A1208; display: block; font-size: 12.5px; }
.vd-gdiv { width: 1px; height: 28px; background: rgba(26,18,8,.1); }

/* ── ticker ── */
.vd-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; }
.vd-ti-inner { display: flex; width: max-content; animation: vd-tick 24s linear infinite; }
.vd-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vd-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ═══════════════ RESPONSIVE ═══════════════ */
@media (max-width: 639px) {
  .vd-inner { padding: 32px 16px 48px; }
  .vd-story-left { padding: 28px 24px 24px; }
  .vd-story-left::after { font-size: 64px; top: 16px; right: 16px; }
  .vd-story-right { padding: 24px; }
  .vd-story-inner { border-right: none; }
  .vd-mission, .vd-values { padding: 24px; }
  .vd-why { padding: 24px 22px; }
  .vd-cta-banner { padding: 32px 24px; }
  .vd-guarantee { gap: 14px; padding: 14px 20px; }
  .vd-gdiv { display: none; }
  .vd-cta-r1, .vd-cta-r2 { display: none; }
}
@media (min-width: 640px) and (max-width: 859px) {
  .vd-inner { padding: 40px 28px 56px; }
  .vd-story-left { border-right: none; border-bottom: 1px solid rgba(255,107,0,.1); }
}
`

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const PACK_FEATURES = [
  { icon: '💌', text: 'Invitații digitale nelimitate' },
  { icon: '🍽️', text: 'Meniu nuntă cu cod QR' },
  { icon: '📷', text: 'Upload poze de la invitați' },
  { icon: '🗂️', text: 'Organizare poze pe momente' },
  { icon: '📊', text: 'Export Excel invitați' },
  { icon: '🗺️', text: 'Hărți GPS integrate' },
]

const VALUES = [
  {
    icon: '✨',
    title: 'Eleganță autentică',
    desc: 'Fiecare invitație trebuie să impresioneze discret, fără artificii inutile.',
  },
  {
    icon: '💬',
    title: 'Dialog deschis',
    desc: 'Susținem colaborarea strânsă cu clienții, de la setup până în ziua evenimentului.',
  },
  {
    icon: '🏆',
    title: 'Calitate fără compromisuri',
    desc: 'Oferim soluții premium, testate pe mii de evenimente reale.',
  },
  {
    icon: '🌱',
    title: 'Sustenabilitate',
    desc: 'Digital înseamnă fără hârtie, fără risipă — un gest mic cu impact mare.',
  },
  {
    icon: '⚡',
    title: 'Simplitate radicală',
    desc: 'Tot ce e complex rămâne în spate. Tu vezi doar ce contează.',
  },
]

const WHY = [
  { icon: '🔗', name: 'Link instant',       desc: 'Trimiți invitația prin WhatsApp, SMS sau email în câteva secunde.' },
  { icon: '✅', name: 'RSVP în timp real',  desc: 'Confirmările apar instant în tabloul tău de bord, fără telefoane.' },
  { icon: '📊', name: 'Export Excel',        desc: 'Descarcă lista completă cu status și observații oricând.' },
  { icon: '📷', name: 'Album foto colectiv', desc: 'Invitații contribuie cu pozele lor, organizate pe momente.' },
  { icon: '🍽️', name: 'Meniu cu QR',        desc: 'Scanează la masă — meniu digital elegant, fără laminat.' },
  { icon: '🌍', name: 'Fără distanțe',      desc: 'Invitați din toată lumea primesc și confirmă din orice dispozitiv.' },
]

const TICKER = [
  '💍 Invitații Nelimitate',
  '🍽️ Meniu cu Cod QR',
  '📷 Upload Poze Invitați',
  '✅ RSVP Instant',
  '📊 Export Excel',
  '🗺️ GPS Integrat',
  '🗂️ Organizare Momente',
  '💸 300 Lei · Plată Unică',
]

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function DesprePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* JSON-LD Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'VibeInvite',
            url: 'https://vibeinvite.ro',
            logo: 'https://vibeinvite.ro/logo.svg',
            description:
              'Platformă românească de invitații digitale all-in-one pentru nuntă și botez. Invitații nelimitate, meniu QR, upload poze invitați, export Excel. 300 lei, plată unică.',
            foundingLocation: { '@type': 'Place', name: 'România' },
            areaServed: 'RO',
            knowsAbout: [
              'invitații digitale nuntă',
              'invitații botez online',
              'meniu QR nuntă',
              'RSVP online',
              'organizare eveniment nuntă',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              availableLanguage: 'Romanian',
              url: 'https://vibeinvite.ro/contact',
            },
          }),
        }}
      />

      <div className="vd-page">
        {/* bg orbs */}
        <div className="vd-orb vd-o1" aria-hidden="true" />
        <div className="vd-orb vd-o2" aria-hidden="true" />
        <div className="vd-orb vd-o3" aria-hidden="true" />

        {/* ticker top */}
        <div className="vd-ticker" aria-hidden="true">
          <div className="vd-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vd-ti">{t}<span className="vd-tdot" /></div>
            ))}
          </div>
        </div>

        <div className="vd-inner">

          {/* ── PAGE HEADER ── */}
          <header className="vd-header">
            <p className="vd-tagline" aria-label="Un singur pachet, tot ce ai nevoie pentru nuntă">
              🎊 Un singur pachet — tot ce ai nevoie pentru nuntă
            </p>
            <p className="vd-super">
              <span className="vd-sdot" aria-hidden="true" />
              Despre VibeInvite
            </p>
            <h1 className="vd-h1">
              Povestea din spatele <em>invitației</em>{' '}
              <strong>perfecte</strong>
            </h1>
            <p className="vd-lead">
              VibeInvite a apărut din dorința de a oferi cuplurilor din România{' '}
              <strong>mai mult decât o invitație digitală</strong> — un pachet complet care
              acoperă tot ce ai nevoie de la primul „da" până după petrecere.
            </p>
          </header>

          {/* ── STORY CARD ── */}
          <article className="vd-story" aria-label="Povestea VibeInvite">
            <div className="vd-story-inner">

              {/* left — quote + text */}
              <div className="vd-story-left">
                <p className="vd-story-label">Povestea noastră</p>
                <p className="vd-story-quote">
                  „Am vrut ca fiecare cuplu să aibă o invitație la fel de <em>frumoasă</em> ca ziua cea mare."
                </p>
                <div className="vd-story-body">
                  <p>
                    VibeInvite a luat naștere din frustrarea față de soluțiile existente — fie prea scumpe,
                    fie prea rigide, fie incomplete. Am văzut cupluri care trimiteau invitațiile pe un link,
                    gestionau RSVP-ul pe WhatsApp și colectau pozele pe Google Drive. <strong>Haos curat.</strong>
                  </p>
                  <p>
                    Răspunsul nostru a fost simplu: un singur pachet, o singură platformă, o singură dată plătit.
                    <strong> 300 lei</strong> și ai tot ce îți trebuie — de la invitația digitală trimisă instant,
                    până la albumul foto creat de invitații tăi în timp real.
                  </p>
                  <p>
                    Astăzi, <strong>12.000+ cupluri</strong> au ales VibeInvite pentru nunta sau botezul lor.
                    Fiecare eveniment ne motivează să facem platforma și mai bună.
                  </p>
                </div>
              </div>

              {/* right — stats + pack */}
              <div className="vd-story-right">
                <div className="vd-stat-grid" aria-label="Statistici VibeInvite">
                  {[
                    { num: '12K+',  label: 'Evenimente organizate' },
                    { num: '98%',   label: 'Clienți mulțumiți' },
                    { num: '4.9★', label: 'Rating mediu' },
                    { num: '3 min', label: 'Setup invitație' },
                  ].map((s) => (
                    <div key={s.label} className="vd-stat-box">
                      <p className="vd-stat-num">{s.num}</p>
                      <p className="vd-stat-label">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="vd-pack-box" aria-label="Ce include pachetul">
                  <p className="vd-pack-title">Pachetul include</p>
                  {PACK_FEATURES.map((f) => (
                    <div key={f.text} className="vd-pack-row">
                      <span className="vd-pack-icon" aria-hidden="true">{f.icon}</span>
                      <span className="vd-pack-text">{f.text}</span>
                      <span className="vd-pack-check">✓</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </article>

          {/* ── MISIUNE + VALORI ── */}
          <div className="vd-grid2">

            {/* misiune */}
            <section className="vd-mission" aria-labelledby="vd-mission-h">
              <p className="vd-section-label">
                <span className="vd-section-icon" aria-hidden="true">🎯</span>
                Misiunea noastră
              </p>
              <h2 id="vd-mission-h" className="vd-card-h2">
                Eleganță digitală, <em>accesibilă</em> oricui
              </h2>
              <p className="vd-card-text">
                Misiunea VibeInvite este să conecteze <strong>stilul premium</strong> cu accesibilitatea digitală.
                Credem că o invitație frumoasă nu trebuie să coste o avere și nici să necesite un designer.
              </p>
              <p className="vd-card-text" style={{ marginTop: 12 }}>
                Ne concentrăm pe <strong>design curat</strong>, flux de utilizare intuitiv și funcționalități
                care chiar contează — nu funcții de dragul funcțiilor. Fiecare decizie de produs pornește
                de la o întrebare simplă: <em>face viața cuplului mai ușoară?</em>
              </p>
              <p className="vd-card-text" style={{ marginTop: 12 }}>
                De aceea am ales modelul <strong>pachet unic, plată unică</strong>. Fără abonamente, fără
                surprize, fără stres — doar bucuria de a trimite cea mai frumoasă invitație.
              </p>
            </section>

            {/* valori */}
            <section className="vd-values" aria-labelledby="vd-values-h">
              <p className="vd-section-label">
                <span className="vd-section-icon" aria-hidden="true">💎</span>
                Valorile noastre
              </p>
              <h2 id="vd-values-h" className="vd-card-h2">
                Ce ne <em>ghidează</em> în fiecare zi
              </h2>
              <ul className="vd-value-list" style={{ listStyle: 'none' }}>
                {VALUES.map((v) => (
                  <li key={v.title} className="vd-value-item">
                    <div className="vd-value-ico" aria-hidden="true">{v.icon}</div>
                    <div className="vd-value-txt">
                      <strong>{v.title}</strong>
                      <span className="vd-value-sub">{v.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ── WHY DIGITAL ── */}
          <section className="vd-why" aria-labelledby="vd-why-h">
            <div className="vd-why-header">
              <p className="vd-section-label">
                <span className="vd-section-icon" aria-hidden="true">🚀</span>
                De ce digital
              </p>
              <h2 id="vd-why-h" className="vd-card-h2" style={{ marginBottom: 4 }}>
                Tot ce fac invitațiile clasice, <em>în plus</em>
              </h2>
              <p className="vd-card-text">
                Invitațiile digitale VibeInvite nu înlocuiesc doar hârtia — adaugă funcționalități
                pe care invitațiile clasice nu le pot oferi niciodată.
              </p>
            </div>
            <div className="vd-why-grid" role="list" aria-label="Avantajele invitațiilor digitale">
              {WHY.map((w) => (
                <div key={w.name} className="vd-why-item" role="listitem">
                  <span className="vd-why-ico" aria-hidden="true">{w.icon}</span>
                  <p className="vd-why-name">{w.name}</p>
                  <p className="vd-why-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BANNER ── */}
          <div className="vd-cta-banner" aria-label="Creează invitația ta">
            <div className="vd-cta-ring vd-cta-r1" aria-hidden="true" />
            <div className="vd-cta-ring vd-cta-r2" aria-hidden="true" />
            <p className="vd-cta-label">Gata să începi?</p>
            <h2 className="vd-cta-h2">
              Un singur pachet — <em>tot ce ai nevoie</em> pentru nuntă
            </h2>
            <p className="vd-cta-sub">
              Invitații nelimitate, meniu QR, upload poze invitați, organizare momente și export Excel.
              Totul într-un singur loc, o singură dată plătit.
            </p>
            <p className="vd-cta-price">
              <span aria-hidden="true">💸</span>
              300 Lei · Plată Unică · Fără Abonament
            </p>
            <Link href="/preturi" className="vd-cta-btn">
              <span aria-hidden="true">✨</span>
              Creează Invitația — E Free să Testezi
            </Link>
            <p className="vd-cta-note">Activare instant · Invitați nelimitați · Acces 12 luni</p>
          </div>

          {/* ── guarantee strip ── */}
          <div className="vd-guarantee" aria-label="Garanții incluse">
            {[
              { icon: '🔒', strong: 'Plată securizată',  text: 'Procesator certificat PCI DSS' },
              { icon: '♾️', strong: 'Nelimitat',          text: 'Invitați și funcții fără restricții' },
              { icon: '⚡', strong: 'Activare instant',   text: 'Disponibil imediat după plată' },
              { icon: '🛠️', strong: 'Suport inclus',      text: 'Email & WhatsApp, echipă reală' },
            ].map((g, i, arr) => (
              <>
                <div key={g.strong} className="vd-gi">
                  <span className="vd-gico" aria-hidden="true">{g.icon}</span>
                  <span className="vd-gtxt">
                    <strong>{g.strong}</strong>
                    {g.text}
                  </span>
                </div>
                {i < arr.length - 1 && <div key={`div-${i}`} className="vd-gdiv" aria-hidden="true" />}
              </>
            ))}
          </div>

        </div>

        {/* ticker bottom */}
        <div className="vd-ticker" aria-hidden="true">
          <div className="vd-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vd-ti">{t}<span className="vd-tdot" /></div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
