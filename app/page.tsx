import type { Metadata } from 'next'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
═══════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: 'VibeInvite | Invitații Digitale Online Ieftine — Link Invitație Free',
  description:
    'Pachet all-in-one pentru nuntă: invitații digitale, meniu cu QR, upload poze invitați, organizare momente și export Excel. Link invitație online free, RSVP instant, listă invitați în timp real.',
  keywords: [
    'invitații digitale online ieftine',
    'invitatie online free',
    'link invitatie online',
    'invitatie instant',
    'lista invitatii acceptati',
    'meniu nunta QR cod',
    'upload poze nunta invitati',
    'organizare poze nunta',
    'export excel invitatii',
    'invitații nuntă digitale',
    'invitații botez online',
    'RSVP online',
    'invitație digitală gratis',
    'invitații online România',
    'creare invitatie online',
    'invitatie nunta online ieftina',
    'invitatie digitala nunta',
    'pachet all-in-one nunta',
  ],
  authors: [{ name: 'VibeInvite', url: 'https://vibeinvite.ro' }],
  creator: 'VibeInvite',
  publisher: 'VibeInvite',
  metadataBase: new URL('https://vibeinvite.ro'),
  alternates: { canonical: 'https://vibeinvite.ro' },
  openGraph: {
    type: 'website',
    url: 'https://vibeinvite.ro',
    title: 'VibeInvite — Un singur pachet, tot ce ai nevoie pentru nuntă',
    description:
      'Invitații digitale, meniu QR, upload poze invitați, organizare momente și export Excel. Link invitație free, RSVP instant. Pachet all-in-one pentru nuntă și botez.',
    siteName: 'VibeInvite',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VibeInvite — Invitații Digitale Online' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeInvite — Pachet All-in-One pentru Nuntă',
    description: 'Invitații digitale, meniu QR, upload poze, export Excel. Link invitație free. Tot ce ai nevoie.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'PUNE_AICI_CODUL_GOOGLE_SEARCH_CONSOLE',
  },
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
   Modificări față de versiunea anterioară:
   - padding tablet corectat (xl breakpoint nou)
   - min-height hero ajustat per breakpoint
   - features grid adăugat (all-in-one package)
   - micro-interacțiuni pe chips + card hover
   - mobile-first approach
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vi-hero * { box-sizing: border-box; margin: 0; padding: 0; }

.vi-hero {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── orbs ─────────────────────────────────── */
@keyframes vi-orb {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(34px,-24px) scale(1.06); }
  66%     { transform: translate(-16px,16px) scale(.96); }
}
.vi-orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(72px); }
.vi-o1  { width: 560px; height: 560px; background: radial-gradient(circle, rgba(255,107,0,.20) 0%, transparent 70%); top: -110px; right: -80px; animation: vi-orb 13s ease-in-out infinite; }
.vi-o2  { width: 360px; height: 360px; background: radial-gradient(circle, rgba(255,107,0,.11) 0%, transparent 70%); bottom: 30px; left: -70px; animation: vi-orb 17s ease-in-out infinite reverse; }
.vi-o3  { width: 240px; height: 240px; background: radial-gradient(circle, rgba(255,210,120,.12) 0%, transparent 70%); top: 42%; left: 44%; animation: vi-orb 21s ease-in-out infinite 5s; }

/* ── petals ───────────────────────────────── */
@keyframes vi-petal {
  0%,100% { transform: translateY(0) rotate(0deg); opacity: .65; }
  50%     { transform: translateY(-20px) rotate(9deg); opacity: 1; }
}
.vi-petal { position: absolute; border-radius: 50% 10% 50% 10%; pointer-events: none; z-index: 1; animation: vi-petal ease-in-out infinite; }

/* ── rings ───────────────────────────────── */
@keyframes vi-spin  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
@keyframes vi-spin2 { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
.vi-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(255,107,0,.11); pointer-events: none; z-index: 1; }
.vi-r1   { width: 480px; height: 480px; top: -40px; right: -50px; }
.vi-r2   { width: 340px; height: 340px; top: 56px; right: 36px; border-style: dashed; animation: vi-spin 44s linear infinite; }
.vi-r3   { width: 218px; height: 218px; top: 131px; right: 116px; animation: vi-spin 28s linear infinite reverse; }

/* ── animations ──────────────────────────── */
@keyframes vi-up      { from { opacity:0; transform: translateY(26px); } to { opacity:1; transform: translateY(0); } }
@keyframes vi-in      { from { opacity:0; } to { opacity:1; } }
@keyframes vi-dot     { 0%,100% { opacity:.4; transform: scale(.8); } 50% { opacity:1; transform: scale(1.2); } }
@keyframes vi-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
@keyframes vi-float   { 0%,100% { transform: translateY(0) rotate(-1.8deg); } 50% { transform: translateY(-14px) rotate(-1.1deg); } }
@keyframes vi-pulse   { 0% { transform: scale(.9); opacity:.8; } 70% { transform: scale(1.32); opacity:0; } 100% { transform: scale(.9); opacity:0; } }
@keyframes vi-heart   { 0%,100% { transform: scale(1); } 14% { transform: scale(1.22); } 28% { transform: scale(1); } 42% { transform: scale(1.12); } 70% { transform: scale(1); } }
@keyframes vi-gf      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
@keyframes vi-pf      { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(-1deg); } }
@keyframes vi-tick    { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes vi-featIn  { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }

/* ── badge ───────────────────────────────── */
.vi-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .05em; text-transform: uppercase;
  opacity: 0; animation: vi-up .6s ease .1s forwards;
}
.vi-bdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vi-dot 1.8s ease-in-out infinite; }

/* ── headline ────────────────────────────── */
.vi-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 4.8vw, 66px);
  font-weight: 300; line-height: 1.07; color: #1A1208;
  margin: 16px 0 18px;
  opacity: 0; animation: vi-up .8s ease .25s forwards;
}
.vi-h1 em     { font-style: italic; color: #FF6B00; }
.vi-h1 strong { font-weight: 600; }

/* ── tagline ─────────────────────────────── */
.vi-tagline {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, #FF6B00, #FF8C35);
  color: #fff; border-radius: 10px;
  padding: 8px 16px; font-size: 13px; font-weight: 600;
  letter-spacing: .02em; margin-bottom: 16px;
  opacity: 0; animation: vi-up .7s ease .18s forwards;
  width: fit-content;
}

/* ── sub ─────────────────────────────────── */
.vi-sub {
  font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62);
  max-width: 460px; opacity: 0; animation: vi-up .8s ease .4s forwards;
}
.vi-sub strong { color: #1A1208; font-weight: 600; }

/* ── features grid (all-in-one) ──────────── */
.vi-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 22px;
  opacity: 0; animation: vi-up .8s ease .5s forwards;
}
.vi-feat {
  display: flex; align-items: flex-start; gap: 10px;
  background: #fff; border: 1px solid rgba(255,107,0,.15); border-radius: 14px;
  padding: 12px 14px;
  transition: border-color .2s, box-shadow .2s, transform .2s;
  cursor: default;
}
.vi-feat:hover {
  border-color: rgba(255,107,0,.4);
  box-shadow: 0 4px 20px rgba(255,107,0,.1);
  transform: translateY(-2px);
}
.vi-feat-icon {
  width: 34px; height: 34px; border-radius: 10px;
  background: #FFF4ED; display: flex; align-items: center;
  justify-content: center; font-size: 16px; flex-shrink: 0;
  transition: background .2s;
}
.vi-feat:hover .vi-feat-icon { background: rgba(255,107,0,.15); }
.vi-feat-text { display: flex; flex-direction: column; }
.vi-feat-title { font-size: 12px; font-weight: 600; color: #1A1208; line-height: 1.3; }
.vi-feat-desc  { font-size: 11px; color: rgba(26,18,8,.55); margin-top: 2px; line-height: 1.4; }

/* ── chips ───────────────────────────────── */
.vi-chips {
  display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px;
  opacity: 0; animation: vi-up .8s ease .52s forwards;
}
.vi-chip {
  display: inline-flex; align-items: center; gap: 5px;
  background: #fff; border: 1px solid rgba(255,107,0,.18); border-radius: 100px;
  padding: 4px 12px; font-size: 11.5px; font-weight: 500; color: #1A1208;
  transition: border-color .2s, background .2s, transform .15s;
  cursor: default;
}
.vi-chip:hover {
  border-color: rgba(255,107,0,.45);
  background: #FFF4ED;
  transform: translateY(-1px);
}

/* ── actions ─────────────────────────────── */
.vi-actions {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  margin-top: 26px; opacity: 0; animation: vi-up .8s ease .62s forwards;
}
.vi-btnp {
  display: inline-flex; align-items: center; gap: 9px;
  background: #FF6B00; color: #fff; padding: 14px 28px; border-radius: 100px;
  font-size: 14px; font-weight: 600; text-decoration: none;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(255,107,0,.38);
  transition: background .25s, transform .2s, box-shadow .25s;
}
.vi-btnp::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  background-size: 400px 100%; animation: vi-shimmer 2.5s linear infinite;
}
.vi-btnp:hover { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 38px rgba(255,107,0,.45); }
.vi-btns {
  display: inline-flex; align-items: center; gap: 5px;
  color: #1A1208; font-size: 13px; font-weight: 500; text-decoration: none;
  border-bottom: 1.5px solid rgba(26,18,8,.22); padding-bottom: 2px;
  transition: color .2s, border-color .2s;
}
.vi-btns:hover { color: #FF6B00; border-color: #FF6B00; }

/* ── stats ───────────────────────────────── */
.vi-stats {
  display: flex; gap: 24px; margin-top: 36px;
  opacity: 0; animation: vi-up .8s ease .75s forwards;
}
.vi-stat  { display: flex; flex-direction: column; }
.vi-sn    { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: #1A1208; line-height: 1; }
.vi-sl    { font-size: 11px; color: rgba(26,18,8,.55); margin-top: 3px; letter-spacing: .03em; }
.vi-sd    { width: 1px; background: rgba(26,18,8,.18); align-self: stretch; }

/* ── visual col ──────────────────────────── */
.vi-visual {
  position: relative; display: flex; justify-content: center; align-items: center;
  min-height: 520px; opacity: 0; animation: vi-in 1s ease .4s forwards;
}

/* ── invite card ─────────────────────────── */
.vi-card {
  width: 300px; background: #fff; border-radius: 28px;
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 18px 64px rgba(0,0,0,.11), 0 0 0 1px rgba(255,107,0,.07);
  animation: vi-float 5.2s ease-in-out infinite;
  overflow: hidden; position: relative; z-index: 5;
  transition: box-shadow .3s;
}
.vi-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.06), 0 24px 80px rgba(0,0,0,.14), 0 0 0 1px rgba(255,107,0,.14); }

.vi-ctop {
  background: linear-gradient(160deg, #FFF4ED 0%, #fff5e6 100%);
  padding: 26px 24px 20px; text-align: center;
  border-bottom: 1px solid rgba(255,107,0,.1); position: relative;
}
.vi-ctop::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
}
.vi-mono {
  width: 62px; height: 62px; border-radius: 50%; background: #fff;
  border: 2px solid rgba(255,107,0,.22);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 13px;
  font-family: 'Cormorant Garamond', serif; font-size: 21px; font-style: italic; color: #FF6B00;
  position: relative;
}
.vi-mono::before {
  content: ''; position: absolute; inset: -6px; border-radius: 50%;
  border: 1px dashed rgba(255,107,0,.32); animation: vi-spin2 22s linear infinite;
}
.vi-pr { position: absolute; inset: -10px; border-radius: 50%; border: 2px solid rgba(255,107,0,.42); animation: vi-pulse 2.6s ease-out infinite; }

.vi-ctitle    { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 300; color: #1A1208; line-height: 1.35; }
.vi-ctitle em { font-style: italic; color: #FF6B00; font-size: 23px; }

.vi-divider { display: flex; align-items: center; gap: 10px; margin: 11px 0; }
.vi-dl      { flex: 1; height: 1px; background: rgba(255,107,0,.2); }
.vi-dico    { color: #FF6B00; font-size: 12px; animation: vi-heart 1.8s ease-in-out infinite; }
.vi-cdate   { font-size: 11px; color: rgba(26,18,8,.55); font-weight: 500; letter-spacing: .1em; text-transform: uppercase; }

.vi-cbody { padding: 14px 18px; }
.vi-crow  { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid rgba(0,0,0,.04); }
.vi-crow:last-of-type { border-bottom: none; }
.vi-cico  { width: 30px; height: 30px; border-radius: 8px; background: #FFF4ED; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px; }
.vi-crt   { font-size: 10px; color: rgba(26,18,8,.52); line-height: 1.3; }
.vi-crv   { font-size: 12px; font-weight: 500; color: #1A1208; }
.vi-rsvp  {
  margin: 11px 0 2px; background: #FF6B00; color: #fff; border: none;
  border-radius: 100px; padding: 10px 0; width: 100%; font-size: 12px;
  font-weight: 600; cursor: pointer; letter-spacing: .05em;
  transition: background .2s, transform .15s; font-family: inherit;
}
.vi-rsvp:hover { background: #FF8C35; transform: scale(1.02); }

/* ── guest list floating ─────────────────── */
.vi-glist {
  position: absolute; top: 28px; left: -88px;
  width: 176px; background: #fff; border-radius: 18px;
  box-shadow: 0 6px 28px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.04);
  padding: 13px 15px; z-index: 10;
  animation: vi-gf 4.8s ease-in-out infinite .6s;
}
.vi-glt   { font-size: 10px; font-weight: 600; color: rgba(26,18,8,.52); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 9px; }
.vi-guest { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(0,0,0,.04); }
.vi-guest:last-child { border-bottom: none; }
.vi-gn    { font-size: 11px; font-weight: 500; color: #1A1208; }
.vi-gb    { font-size: 9px; padding: 2px 7px; border-radius: 100px; font-weight: 600; white-space: nowrap; }
.vi-gb.ok   { background: #dcfce7; color: #15803d; }
.vi-gb.pend { background: #fef3c7; color: #b45309; }
.vi-gb.no   { background: #fee2e2; color: #b91c1c; }

/* ── free pill ───────────────────────────── */
.vi-fpill {
  position: absolute; bottom: 130px; right: -66px;
  background: #FF6B00; color: #fff; border-radius: 100px;
  padding: 10px 17px; font-size: 12px; font-weight: 700;
  box-shadow: 0 6px 22px rgba(255,107,0,.4); z-index: 10;
  white-space: nowrap; letter-spacing: .04em;
  animation: vi-pf 4s ease-in-out infinite 1.2s;
}

/* ── ticker ──────────────────────────────── */
.vi-ticker    { overflow: hidden; background: #FF6B00; padding: 10px 0; position: relative; z-index: 10; }
.vi-ti-inner  { display: flex; width: max-content; animation: vi-tick 24s linear infinite; }
.vi-ti        { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vi-tdot      { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; flex-shrink: 0; }

/* ══════════════════════════════════════════
   MAIN GRID LAYOUT
   Mobile-first: 1 col → tablet → desktop
══════════════════════════════════════════ */

/* mobile base */
.vi-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding: 32px 20px 28px;
  position: relative; z-index: 10;
  max-width: 1280px; margin: 0 auto; width: 100%;
}

/* tablet: 640px+ — single col, better padding, hide rings */
@media (min-width: 640px) {
  .vi-main { padding: 40px 32px 32px; gap: 36px; }
}

/* tablet landscape / small desktop: 900px+ — go 2 col */
@media (min-width: 900px) {
  .vi-main {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    gap: 48px;
    padding: 52px 48px 40px;
  }
  .vi-visual { min-height: 520px; }
}

/* desktop: 1200px+ */
@media (min-width: 1200px) {
  .vi-main { padding: 64px 56px 48px; gap: 56px; }
  .vi-visual { min-height: 540px; }
}

/* ── responsive tweaks ───────────────────── */

/* mobile: center everything */
@media (max-width: 639px) {
  .vi-sub     { margin: 0 auto; max-width: 100%; }
  .vi-features { grid-template-columns: 1fr 1fr; gap: 6px; }
  .vi-feat-desc { display: none; } /* hide desc on very small to keep compact */
  .vi-chips   { justify-content: center; }
  .vi-actions { justify-content: center; }
  .vi-stats   { justify-content: center; gap: 18px; }
  .vi-visual  { min-height: 380px; }
  .vi-card    { width: 272px; }
  .vi-glist   { display: none; }
  .vi-fpill   { right: -30px; bottom: 100px; font-size: 11px; padding: 8px 13px; }
  .vi-h1      { font-size: clamp(32px, 8vw, 44px); }
  .vi-sn      { font-size: 24px; }
  .vi-tagline { font-size: 12px; padding: 7px 13px; }
}

/* between 640-899: single col centered, show desc in features */
@media (min-width: 640px) and (max-width: 899px) {
  .vi-sub     { max-width: 540px; }
  .vi-features { grid-template-columns: 1fr 1fr; }
  .vi-visual  { min-height: 420px; }
  .vi-card    { width: 290px; }
  .vi-glist   { left: -60px; width: 160px; }
  .vi-fpill   { right: -44px; }
  .vi-r1,.vi-r2,.vi-r3 { display: none; }
}

/* 900px+ tablet landscape: rings hidden, glist visible */
@media (min-width: 900px) and (max-width: 1199px) {
  .vi-r1,.vi-r2,.vi-r3 { display: none; }
  .vi-glist  { left: -62px; width: 162px; }
  .vi-fpill  { right: -48px; }
  .vi-card   { width: 290px; }
}

/* 480px and below */
@media (max-width: 479px) {
  .vi-fpill { display: none; }
  .vi-features { grid-template-columns: 1fr; gap: 6px; }
  .vi-feat-desc { display: block; }
}
`

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const TICKER = [
  '💍 Invitații Nuntă Online',
  '🎀 Invitații Botez',
  '⚡ Link Invitație Free',
  '✅ RSVP Instant',
  '📋 Listă Invitați Acceptați',
  '📷 Upload Poze Invitați',
  '🍽️ Meniu cu Cod QR',
  '📊 Export Excel',
  '🗺️ GPS Integrat',
  '📱 Mobile Ready',
]

const GUESTS = [
  { name: 'Ana & Mihai',   status: 'ok',   label: 'Acceptat' },
  { name: 'Elena Ionescu', status: 'ok',   label: 'Acceptat' },
  { name: 'Radu Popescu',  status: 'pend', label: 'Așteptare' },
  { name: 'Laura Dan',     status: 'no',   label: 'Refuzat' },
]

// All-in-one feature cards — noile funcționalități comunicate în hero
const FEATURES = [
  {
    icon: '💌',
    title: 'Invitații digitale',
    desc: 'Link personalizat free, trimis instant',
  },
  {
    icon: '🍽️',
    title: 'Meniu cu QR',
    desc: 'Meniu interactiv scanabil la masă',
  },
  {
    icon: '📷',
    title: 'Upload poze invitați',
    desc: 'Poze colectate live în timpul nunții',
  },
  {
    icon: '📊',
    title: 'Export Excel',
    desc: 'Invitați + status + observații',
  },
]

const CHIPS = [
  { icon: '🔗', text: 'Link invitație free' },
  { icon: '✅', text: 'RSVP instant' },
  { icon: '📋', text: 'Listă invitați' },
  { icon: '🗺️', text: 'GPS inclus' },
  { icon: '📸', text: 'Momente foto' },
]

const PETALS = [
  { s: 14, t: '10%', l: '7%',  d: '0s',   dr: '6.2s', c: 'rgba(255,107,0,.18)' },
  { s: 10, t: '25%', l: '17%', d: '1.1s', dr: '7.4s', c: 'rgba(255,160,60,.13)' },
  { s: 17, t: '62%', l: '4%',  d: '2.1s', dr: '8.1s', c: 'rgba(255,107,0,.12)' },
  { s: 8,  t: '80%', l: '20%', d: '.5s',  dr: '5.4s', c: 'rgba(255,140,0,.15)' },
  { s: 12, t: '14%', r: '11%', d: '1.9s', dr: '7.8s', c: 'rgba(255,107,0,.13)' },
  { s: 15, t: '48%', r: '7%',  d: '3.1s', dr: '6.6s', c: 'rgba(255,180,80,.1)'  },
  { s: 9,  t: '79%', r: '14%', d: '1s',   dr: '9.2s', c: 'rgba(255,107,0,.14)' },
]

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'VibeInvite',
            url: 'https://vibeinvite.ro',
            description:
              'Pachet all-in-one pentru nuntă: invitații digitale, meniu QR, upload poze invitați, organizare momente și export Excel. Link invitație online free.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://vibeinvite.ro/cautare?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'VibeInvite',
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Web, iOS, Android',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'RON',
              description: 'Link invitație online free',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1240',
            },
          }),
        }}
      />

      {/* ══════════════ HERO START ══════════════ */}
      <section className="vi-hero" aria-label="VibeInvite — Invitații digitale online">

        {/* bg orbs */}
        <div className="vi-orb vi-o1" aria-hidden="true" />
        <div className="vi-orb vi-o2" aria-hidden="true" />
        <div className="vi-orb vi-o3" aria-hidden="true" />

        {/* petals */}
        {PETALS.map((p, i) => (
          <div
            key={i}
            className="vi-petal"
            aria-hidden="true"
            style={{
              width: p.s, height: p.s,
              background: p.c,
              top: p.t,
              left: (p as any).l,
              right: (p as any).r,
              animationDelay: p.d,
              animationDuration: p.dr,
            }}
          />
        ))}

        {/* rings */}
        <div className="vi-ring vi-r1" aria-hidden="true" />
        <div className="vi-ring vi-r2" aria-hidden="true" />
        <div className="vi-ring vi-r3" aria-hidden="true" />

        {/* ── GRID ── */}
        <div className="vi-main">

          {/* LEFT — copy */}
          <div>
            {/* tagline all-in-one */}
            <p className="vi-tagline" aria-label="Un singur pachet, tot ce ai nevoie pentru nuntă">
              🎊 Un singur pachet — tot ce ai nevoie pentru nuntă
            </p>

            <p className="vi-badge">
              <span className="vi-bdot" aria-hidden="true" />
              Invitație Online Free · 3 Minute
            </p>

            <h1 className="vi-h1">
              Invitații digitale <em>ieftine</em>,{' '}
              <strong>instant</strong> pentru toți invitații
            </h1>

            <p className="vi-sub">
              Generează un <strong>link invitație online</strong> în 3 minute,
              urmărește <strong>lista invitaților acceptați</strong> live,
              colectează poze și trimite meniul cu QR — fără hârtie, fără costuri ascunse.
            </p>

            {/* All-in-one features grid */}
            <ul
              className="vi-features"
              aria-label="Ce include pachetul VibeInvite"
              style={{ listStyle: 'none' }}
            >
              {FEATURES.map((f) => (
                <li key={f.title} className="vi-feat">
                  <div className="vi-feat-icon" aria-hidden="true">{f.icon}</div>
                  <div className="vi-feat-text">
                    <span className="vi-feat-title">{f.title}</span>
                    <span className="vi-feat-desc">{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* quick chips */}
            <ul className="vi-chips" aria-label="Funcționalități rapide" style={{ listStyle: 'none' }}>
              {CHIPS.map((c) => (
                <li key={c.text} className="vi-chip">
                  <span aria-hidden="true">{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>

            <div className="vi-actions">
              <Link href="/preturi" className="vi-btnp">
                <span aria-hidden="true">✨</span>
                Creează Invitația — E Free
              </Link>
              <Link href="/modele" className="vi-btns">
                Vezi modele →
              </Link>
            </div>

            <div className="vi-stats" aria-label="Statistici VibeInvite">
              <div className="vi-stat">
                <span className="vi-sn">12K+</span>
                <span className="vi-sl">Invitații create</span>
              </div>
              <div className="vi-sd" aria-hidden="true" />
              <div className="vi-stat">
                <span className="vi-sn">98%</span>
                <span className="vi-sl">Clienți mulțumiți</span>
              </div>
              <div className="vi-sd" aria-hidden="true" />
              <div className="vi-stat">
                <span className="vi-sn">3 min</span>
                <span className="vi-sl">Timp de creare</span>
              </div>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="vi-visual" aria-hidden="true">

            {/* floating guest list */}
            <div className="vi-glist">
              <div className="vi-glt">Listă invitați</div>
              {GUESTS.map((g) => (
                <div key={g.name} className="vi-guest">
                  <span className="vi-gn">{g.name}</span>
                  <span className={`vi-gb ${g.status}`}>{g.label}</span>
                </div>
              ))}
            </div>

            {/* free pill */}
            <div className="vi-fpill">🔗 Link Free</div>

            {/* invite card */}
            <div className="vi-card">
              <div className="vi-ctop">
                <div className="vi-mono">
                  <div className="vi-pr" />
                  A & M
                </div>
                <div className="vi-ctitle">
                  Vă invităm la<br />
                  <em>Nunta Noastră</em>
                </div>
                <div className="vi-divider">
                  <div className="vi-dl" />
                  <span className="vi-dico">♥</span>
                  <div className="vi-dl" />
                </div>
                <div className="vi-cdate">15 Septembrie · 2025</div>
              </div>

              <div className="vi-cbody">
                <div className="vi-crow">
                  <div className="vi-cico">🕕</div>
                  <div>
                    <div className="vi-crt">Ora evenimentului</div>
                    <div className="vi-crv">18:00 — Cununia civilă</div>
                  </div>
                </div>
                <div className="vi-crow">
                  <div className="vi-cico">📍</div>
                  <div>
                    <div className="vi-crt">Locația</div>
                    <div className="vi-crv">Grand Hotel Continental</div>
                  </div>
                </div>
                <div className="vi-crow">
                  <div className="vi-cico">🍽️</div>
                  <div>
                    <div className="vi-crt">Meniu</div>
                    <div className="vi-crv">Scanează codul QR</div>
                  </div>
                </div>
                <button className="vi-rsvp">CONFIRMĂ PREZENȚA ♥</button>
              </div>
            </div>

          </div>
        </div>

        {/* ── TICKER ── */}
        <div className="vi-ticker" aria-hidden="true">
          <div className="vi-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vi-ti">
                {t}<span className="vi-tdot" />
              </div>
            ))}
          </div>
        </div>

      </section>
      {/* ══════════════ HERO END ══════════════ */}
    </>
  )
}
