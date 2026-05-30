

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_DOMAIN, DEFAULT_OG, OG_WIDTH, OG_HEIGHT } from '../constants/marketingDefaults'

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
═══════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: 'VibeInvite | Invitații Nuntă Online — Platformă Completă pentru Miri',
  description:
    'Invitații nuntă online prin link personalizat, confirmare participare, gestionare invitați, meniu QR și upload poze. Platformă digitală completă pentru organizarea nunții tale.',
  keywords: [
    'invitații nuntă online',
    'invitații digitale pentru nuntă',
    'invitație nuntă prin link',
    'confirmare invitați online',
    'organizare nuntă digitală',
    'invitatie online',
    'link invitatie nunta',
    'gestionare invitatii nunta',
    'invitatie digitala nunta',
    'RSVP nunta online',
    'invitații botez online',
    'dashboard miri',
    'meniu nunta QR cod',
    'export excel invitatii',
    'invitații PDF România',
  ],
  authors: [{ name: 'VibeInvite', url: 'https://vibeinvite.ro' }],
  creator: 'VibeInvite',
  publisher: 'VibeInvite',
  metadataBase: new URL(SITE_DOMAIN),
  alternates: { canonical: SITE_DOMAIN },
  openGraph: {
    type: 'website',
    url: 'https://vibeinvite.ro',
    title: 'VibeInvite — Invitații Nuntă Online, Platformă Completă pentru Miri',
    description:
      'Invitații digitale pentru nuntă prin link personalizat, confirmare participare, gestionare invitați și experiență digitală completă. Simplu, modern, fără hârtie.',
    siteName: 'VibeInvite',
    images: [
      {
        url: DEFAULT_OG,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: 'VibeInvite — Invitații Nuntă Online',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeInvite — Invitații Nuntă Online',
    description: 'Platformă completă: invitații digitale, confirmare participare, gestionare invitați, meniu QR.',
    images: [SITE_DOMAIN + '/social/twitter-card.png'],
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
    other: [
      { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'mask-icon', url: '/icons/maskable-icon-512x512.png', color: '#FF6B00' },
      { rel: 'manifest', url: '/manifest.webmanifest' },
    ],
  },
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --orange: #FF6B00;
  --orange-light: #FF8C35;
  --orange-pale: #FFF4ED;
  --orange-border: rgba(255,107,0,.18);
  --ink: #1A1208;
  --ink-mid: rgba(26,18,8,.6);
  --ink-soft: rgba(26,18,8,.38);
  --bg: #FDFAF6;
  --white: #ffffff;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
}

body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--ink); }

/* ── fade-in animations ─────── */
@keyframes vi-up   { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
@keyframes vi-in   { from { opacity:0; } to { opacity:1; } }
@keyframes vi-tick { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes vi-dot  { 0%,100% { opacity:.4; transform: scale(.8); } 50% { opacity:1; transform: scale(1.2); } }
@keyframes vi-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }

/* ════════════════════════════════
   HERO
════════════════════════════════ */
.vi-hero {
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

/* subtle mesh background */
.vi-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 680px 420px at 85% 0%, rgba(255,107,0,.07) 0%, transparent 60%),
    radial-gradient(ellipse 440px 320px at 10% 80%, rgba(255,107,0,.05) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.vi-hero-inner {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: 72px 32px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

/* LEFT */
.vi-copy { display: flex; flex-direction: column; }

.vi-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange-pale); border: 1px solid var(--orange-border);
  border-radius: 100px; padding: 5px 14px 5px 10px;
  font-size: 11.5px; font-weight: 600; color: var(--orange);
  letter-spacing: .06em; text-transform: uppercase;
  width: fit-content; margin-bottom: 20px;
  opacity: 0; animation: vi-up .5s ease .05s forwards;
}
.vi-eyebrow-dot {
  width: 7px; height: 7px; background: var(--orange);
  border-radius: 50%; animation: vi-dot 1.8s ease-in-out infinite;
}

.vi-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(38px, 4.2vw, 62px);
  font-weight: 300; line-height: 1.06;
  color: var(--ink); margin-bottom: 20px;
  opacity: 0; animation: vi-up .6s ease .15s forwards;
}
.vi-h1 em     { font-style: italic; color: var(--orange); }
.vi-h1 strong { font-weight: 600; }

.vi-lead {
  font-size: 16px; line-height: 1.75;
  color: var(--ink-mid); max-width: 480px;
  margin-bottom: 32px;
  opacity: 0; animation: vi-up .6s ease .25s forwards;
}
.vi-lead strong { color: var(--ink); font-weight: 500; }

/* feature list */
.vi-flist {
  list-style: none;
  display: flex; flex-direction: column; gap: 10px;
  margin-bottom: 36px;
  opacity: 0; animation: vi-up .6s ease .32s forwards;
}
.vi-fitem {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; color: var(--ink-mid); font-weight: 400;
}
.vi-fitem::before {
  content: '';
  width: 20px; height: 20px; flex-shrink: 0;
  border-radius: 50%; background: var(--orange-pale);
  border: 1px solid var(--orange-border);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8'%3E%3Cpath d='M1 4l2.5 2.5L9 1' stroke='%23FF6B00' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}
.vi-fitem strong { color: var(--ink); font-weight: 500; }

/* CTA group */
.vi-cta-group {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  opacity: 0; animation: vi-up .6s ease .42s forwards;
}
.vi-cta-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: #fff;
  padding: 14px 26px; border-radius: 100px;
  font-size: 14px; font-weight: 600; text-decoration: none;
  box-shadow: 0 6px 24px rgba(255,107,0,.32);
  position: relative; overflow: hidden;
  transition: background .2s, transform .18s, box-shadow .2s;
}
.vi-cta-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
  background-size: 400px 100%; animation: vi-shimmer 2.8s linear infinite;
}
.vi-cta-primary:hover {
  background: var(--orange-light);
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(255,107,0,.38);
}
.vi-cta-ghost {
  font-size: 13.5px; font-weight: 500; color: var(--ink);
  text-decoration: none; border-bottom: 1.5px solid rgba(26,18,8,.2);
  padding-bottom: 2px; transition: color .2s, border-color .2s;
}
.vi-cta-ghost:hover { color: var(--orange); border-color: var(--orange); }

/* stats */
.vi-stats {
  display: flex; gap: 28px; margin-top: 40px; padding-top: 28px;
  border-top: 1px solid rgba(26,18,8,.08);
  opacity: 0; animation: vi-up .6s ease .52s forwards;
}
.vi-stat  { display: flex; flex-direction: column; gap: 3px; }
.vi-sn    { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: var(--ink); line-height: 1; }
.vi-sl    { font-size: 11.5px; color: var(--ink-soft); letter-spacing: .03em; }
.vi-sd    { width: 1px; background: rgba(26,18,8,.12); align-self: stretch; }

/* RIGHT — visual panel */
.vi-visual {
  display: flex; flex-direction: column; gap: 12px;
  opacity: 0; animation: vi-in .8s ease .3s forwards;
}

/* invite card mock */
.vi-card {
  background: var(--white);
  border: 1px solid rgba(26,18,8,.07);
  border-radius: var(--radius-xl);
  box-shadow: 0 2px 4px rgba(0,0,0,.03), 0 16px 48px rgba(0,0,0,.08);
  overflow: hidden;
}
.vi-card-top {
  background: linear-gradient(155deg, #FFF4ED 0%, #FFFAF5 100%);
  padding: 28px 28px 22px;
  border-bottom: 1px solid rgba(255,107,0,.1);
  text-align: center;
  position: relative;
}
.vi-card-top::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--orange), var(--orange-light));
}
.vi-monogram {
  width: 58px; height: 58px; border-radius: 50%;
  background: var(--white); border: 1.5px solid rgba(255,107,0,.25);
  display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
  font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: var(--orange);
}
.vi-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px; font-weight: 300; color: var(--ink); line-height: 1.4;
}
.vi-card-title em { font-style: italic; color: var(--orange); font-size: 22px; }
.vi-card-date { font-size: 11px; color: var(--ink-soft); letter-spacing: .1em; text-transform: uppercase; margin-top: 10px; }

.vi-card-body { padding: 16px 20px; }
.vi-card-row  {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 0; border-bottom: 1px solid rgba(0,0,0,.04);
}
.vi-card-row:last-of-type { border-bottom: none; }
.vi-card-ico  {
  width: 32px; height: 32px; border-radius: 9px; background: var(--orange-pale);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; flex-shrink: 0;
}
.vi-card-label { font-size: 10px; color: var(--ink-soft); }
.vi-card-val   { font-size: 12.5px; font-weight: 500; color: var(--ink); }

.vi-confirm-btn {
  display: block; width: 100%; margin-top: 12px; margin-bottom: 2px;
  background: var(--orange); color: #fff; border: none; border-radius: 100px;
  padding: 11px; font-size: 12px; font-weight: 600; font-family: inherit;
  letter-spacing: .04em; cursor: pointer;
  transition: background .2s, transform .15s;
}
.vi-confirm-btn:hover { background: var(--orange-light); transform: scale(1.01); }

/* slug pill */
.vi-slug-pill {
  display: flex; align-items: center; gap: 8px;
  background: var(--white); border: 1px solid rgba(26,18,8,.09);
  border-radius: var(--radius-md); padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 6px 20px rgba(0,0,0,.05);
}
.vi-slug-icon {
  width: 32px; height: 32px; border-radius: 8px; background: var(--orange-pale);
  display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;
}
.vi-slug-label { font-size: 10px; color: var(--ink-soft); }
.vi-slug-val   { font-size: 12.5px; font-weight: 500; color: var(--orange); }

/* status row */
.vi-status-row {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 8px;
}
.vi-status-card {
  background: var(--white); border: 1px solid rgba(26,18,8,.07);
  border-radius: var(--radius-md); padding: 12px 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,.03), 0 4px 14px rgba(0,0,0,.04);
}
.vi-status-n  { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; color: var(--ink); line-height: 1; }
.vi-status-l  { font-size: 10px; color: var(--ink-soft); margin-top: 3px; }
.vi-status-b  { display: inline-block; margin-top: 6px; font-size: 9.5px; font-weight: 600; border-radius: 100px; padding: 2px 8px; }
.vi-status-b.green  { background: #dcfce7; color: #15803d; }
.vi-status-b.yellow { background: #fef3c7; color: #b45309; }
.vi-status-b.red    { background: #fee2e2; color: #b91c1c; }


/* ════════════════════════════════
   TICKER
════════════════════════════════ */
.vi-ticker     { overflow: hidden; background: var(--orange); padding: 9px 0; }
.vi-ti-inner   { display: flex; width: max-content; animation: vi-tick 22s linear infinite; }
.vi-ti         { display: flex; align-items: center; gap: 8px; padding: 0 28px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vi-tdot       { width: 3px; height: 3px; background: rgba(255,255,255,.5); border-radius: 50%; flex-shrink: 0; }


/* ════════════════════════════════
   SECTION BASE
════════════════════════════════ */
.vi-section {
  max-width: 1200px; margin: 0 auto;
  padding: 80px 32px;
}
.vi-section-divider {
  height: 1px; background: rgba(26,18,8,.07);
  max-width: 1200px; margin: 0 auto;
}

.vi-section-label {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--orange-border); border-radius: 100px;
  padding: 4px 14px 4px 10px; font-size: 11px; font-weight: 600;
  color: var(--orange); letter-spacing: .07em; text-transform: uppercase;
  margin-bottom: 18px; background: var(--orange-pale);
}

.vi-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(30px, 3.2vw, 46px); font-weight: 300;
  line-height: 1.1; color: var(--ink); margin-bottom: 14px;
}
.vi-section-title em { font-style: italic; color: var(--orange); }
.vi-section-title strong { font-weight: 600; }

.vi-section-sub {
  font-size: 15px; line-height: 1.75; color: var(--ink-mid);
  max-width: 560px; margin-bottom: 44px;
}


/* ════════════════════════════════
   A) INVITAȚII ONLINE — FEATURES
════════════════════════════════ */
.vi-feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}
.vi-feat-card {
  background: var(--white);
  border: 1px solid rgba(26,18,8,.07);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.vi-feat-card:hover {
  border-color: var(--orange-border);
  box-shadow: 0 4px 24px rgba(255,107,0,.08);
  transform: translateY(-2px);
}
.vi-feat-emoji {
  width: 40px; height: 40px; border-radius: 11px; background: var(--orange-pale);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; margin-bottom: 14px;
}
.vi-feat-name { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
.vi-feat-desc { font-size: 13px; line-height: 1.6; color: var(--ink-mid); }

/* valabilitate + pricing note */
.vi-pricing-note {
  display: flex; align-items: center; gap: 12px;
  background: var(--orange-pale); border: 1px solid var(--orange-border);
  border-radius: var(--radius-md); padding: 14px 20px;
  font-size: 13px; color: var(--ink); margin-bottom: 28px;
}
.vi-pricing-note strong { color: var(--orange); font-weight: 600; }

.vi-bottom-cta {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}


/* ════════════════════════════════
   B) FOTOGRAFI PILOT
════════════════════════════════ */
.vi-photo-section {
  background: var(--ink);
  position: relative; overflow: hidden;
}
.vi-photo-section::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 600px 400px at 90% 50%, rgba(255,107,0,.12) 0%, transparent 60%);
  pointer-events: none;
}
.vi-photo-inner {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: 80px 32px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
}
.vi-photo-label {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(255,107,0,.35); border-radius: 100px;
  padding: 4px 14px 4px 10px; font-size: 11px; font-weight: 600;
  color: var(--orange); letter-spacing: .07em; text-transform: uppercase;
  margin-bottom: 18px; background: rgba(255,107,0,.1);
  width: fit-content;
}
.vi-photo-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(28px, 2.8vw, 42px); font-weight: 300;
  line-height: 1.1; color: #fff; margin-bottom: 14px;
}
.vi-photo-title em { font-style: italic; color: var(--orange); }
.vi-photo-sub { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,.58); margin-bottom: 28px; }

.vi-photo-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; }
.vi-photo-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13.5px; color: rgba(255,255,255,.72);
}
.vi-photo-item::before {
  content: ''; width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px;
  border-radius: 50%; background: rgba(255,107,0,.2);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='7' viewBox='0 0 9 7'%3E%3Cpath d='M1 3.5l2 2L8 1' stroke='%23FF6B00' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: center;
}

.vi-photo-cta {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1.5px solid rgba(255,107,0,.5); color: var(--orange);
  padding: 13px 22px; border-radius: 100px;
  font-size: 14px; font-weight: 600; text-decoration: none;
  transition: background .2s, border-color .2s, transform .18s;
}
.vi-photo-cta:hover {
  background: rgba(255,107,0,.12);
  border-color: var(--orange);
  transform: translateY(-1px);
}
.vi-photo-note { font-size: 11.5px; color: rgba(255,255,255,.35); margin-top: 12px; }

/* right panel – cards stack */
.vi-photo-cards { display: flex; flex-direction: column; gap: 10px; }
.vi-photo-card {
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius-md); padding: 16px 18px;
  display: flex; align-items: center; gap: 14px;
}
.vi-photo-card-ico {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(255,107,0,.12); border: 1px solid rgba(255,107,0,.2);
  display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
}
.vi-photo-card-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
.vi-photo-card-desc  { font-size: 12px; color: rgba(255,255,255,.48); }


/* ════════════════════════════════
   FOOTER STRIP
════════════════════════════════ */
.vi-footer-strip {
  background: var(--bg); border-top: 1px solid rgba(26,18,8,.07);
  padding: 24px 32px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 12px; color: var(--ink-soft);
}
.vi-footer-strip a { color: var(--orange); text-decoration: none; }
.vi-footer-strip a:hover { text-decoration: underline; }


/* ════════════════════════════════
   RESPONSIVE
════════════════════════════════ */
@media (max-width: 1023px) {
  .vi-hero-inner { grid-template-columns: 1fr; gap: 40px; padding: 52px 28px 60px; }
  .vi-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .vi-card { grid-column: span 2; }
  .vi-status-row { grid-template-columns: repeat(3,1fr); }
  .vi-feat-grid { grid-template-columns: repeat(2, 1fr); }
  .vi-photo-inner { grid-template-columns: 1fr; gap: 40px; padding: 64px 28px; }
}

@media (max-width: 767px) {
  .vi-hero-inner { padding: 40px 20px 52px; }
  .vi-section { padding: 60px 20px; }
  .vi-feat-grid { grid-template-columns: 1fr; }
  .vi-visual { display: flex; flex-direction: column; }
  .vi-card { width: 100%; }
  .vi-status-row { grid-template-columns: repeat(3, 1fr); }
  .vi-stats { flex-wrap: wrap; gap: 20px; }
  .vi-photo-inner { padding: 52px 20px; }
  .vi-photo-cards { display: none; }
  .vi-bottom-cta { flex-direction: column; align-items: flex-start; }
  .vi-cta-group { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 479px) {
  .vi-h1 { font-size: 36px; }
  .vi-status-row { grid-template-columns: 1fr 1fr; }
  .vi-status-row > :last-child { display: none; }
}
`

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  '💌 Invitații Nuntă Online',
  '🎀 Invitații Botez',
  '🔗 Link personalizat',
  '✅ Confirmare participare',
  '📋 Gestionare invitați',
  '📷 Colectare poze live',
  '🍽️ Meniu in Invitatie',
  '📊 Export Excel',
  '🗺️ GPS integrat',
  '📱 Mobile-ready',
]

const FEATURES_MAIN = [
  {
    icon: '💌',
    name: 'Invitație prin link',
    desc: 'URL personalizat de forma vibeinvite.ro/nunta-mea. Trimiți unui invitat sau tuturor deodată.',
  },
  {
    icon: '✅',
    name: 'Confirmare participare',
    desc: 'Invitații confirmă online: vin / nu vin, număr copii, transport și observații.',
  },
  {
    icon: '📋',
    name: 'Dashboard miri',
    desc: 'Urmărești statusul fiecărui invitat în timp real, direct din contul tău.',
  },
  {
    icon: '📷',
    name: 'Upload poze invitați',
    desc: 'Invitații tăi pot încărca poze din eveniment. Tu le accesezi exclusiv din dashboard.',
  },
  {
    icon: '🍽️',
    name: 'Meniu in Invitatie',
    desc: 'Afișezi meniul nunții direct în invitație ',
  },
  {
    icon: '📊',
    name: 'Export Excel',
    desc: 'Lista completă: nume, status, copii, transport, observații — gata de printat sau trimis.',
  },
]

const PHOTO_CARDS = [
  { icon: '📸', title: 'Pagină proprie de portofoliu', desc: 'Prezintă stilul tău unui public local' },
  { icon: '🗺️', title: 'SEO local Google', desc: 'Vizibilitate pentru căutări din zona ta' },
  { icon: '💬', title: 'Contact direct cu mirii', desc: 'Fără intermediari, fără comisioane' },
  { icon: '🎁', title: 'Complet gratuit', desc: 'Zero costuri de listare sau onboarding' },
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
              'Platformă completă de invitații nuntă online prin link personalizat, confirmare participare, gestionare invitați și experiență digitală completă.',
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
              description: 'Link invitație online',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1240',
            },
          }),
        }}
      />

      {/* ══════════════ HERO ══════════════ */}
      <section className="vi-hero" aria-label="VibeInvite — Invitații nuntă online">
        <div className="vi-hero-inner">

          {/* LEFT — copy */}
          <div className="vi-copy">
            <span className="vi-eyebrow">
              <span className="vi-eyebrow-dot" aria-hidden="true" />
              Platformă invitații nuntă online
            </span>

            <h1 className="vi-h1">
              Invitații digitale<br />
              pentru nuntă,{' '}
              <em>simple</em>{' '}
              și <strong>complete</strong>
            </h1>

            <p className="vi-lead">
              Trimite <strong>invitații nuntă online</strong> printr-un link personalizat, urmărești cine confirmă participarea și gestionezi toată lista de invitați din dashboard — fără hârtie, fără bătăi de cap.
            </p>

            <ul className="vi-flist" aria-label="Ce include platforma">
              <li className="vi-fitem"><strong>URL personalizat</strong> — vibeinvite.ro/nunta-ta</li>
              <li className="vi-fitem"><strong>Confirmare participare</strong> cu copii, transport și observații</li>
              <li className="vi-fitem"><strong>Tracking</strong> deschidere link, în timp real</li>
              <li className="vi-fitem"><strong>Meniu</strong> și <strong>GPS</strong> integrate în invitație</li>
              <li className="vi-fitem"><strong>Colectare poze</strong> de la invitați, acces exclusiv miri</li>
              <li className="vi-fitem"><strong>Export Excel</strong> — lista completă, gata de utilizat</li>
            </ul>

            <div className="vi-cta-group">
              <Link href="/preturi" className="vi-cta-primary">
                <span aria-hidden="true">✨</span>
                Creează invitația ta online
              </Link>
              <Link href="/invitatii-digitale" className="vi-cta-ghost">
                Vezi modele →
              </Link>
            </div>

            <div className="vi-stats" aria-label="Statistici VibeInvite">
              <div className="vi-stat">
                <span className="vi-sn">Nelimitat</span>
                <span className="vi-sl">Invitatii Trimise</span>
              </div>
              <div className="vi-sd" aria-hidden="true" />
              <div className="vi-stat">
                <span className="vi-sn">25 GB</span>
                <span className="vi-sl">Poze Incarcate</span>
              </div>
              <div className="vi-sd" aria-hidden="true" />
              <div className="vi-stat">
                <span className="vi-sn">5 min</span>
                <span className="vi-sl">Timp de creare</span>
              </div>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="vi-visual" aria-hidden="true">

            {/* invite card preview */}
            <div className="vi-card">
              <div className="vi-card-top">
                <div className="vi-monogram">A & M</div>
                <div className="vi-card-title">
                  Vă invităm la<br />
                  <em>Nunta Noastră</em>
                </div>
                <div className="vi-card-date">15 Septembrie 2025</div>
              </div>
              <div className="vi-card-body">
                <div className="vi-card-row">
                  <div className="vi-card-ico">🕕</div>
                  <div>
                    <div className="vi-card-label">Ora evenimentului</div>
                    <div className="vi-card-val">18:00 — Cununia civilă</div>
                  </div>
                </div>
                <div className="vi-card-row">
                  <div className="vi-card-ico">📍</div>
                  <div>
                    <div className="vi-card-label">Locația</div>
                    <div className="vi-card-val">Grand Hotel Continental</div>
                  </div>
                </div>
                <div className="vi-card-row">
                  <div className="vi-card-ico">🍽️</div>
                  <div>
                    <div className="vi-card-label">Meniu</div>
                    <div className="vi-card-val">Scanează codul QR</div>
                  </div>
             </div>
<Link href="/invitatii-digitale" className="vi-cta-ghost">
  <button className="vi-confirm-btn">
    CONFIRMĂ PARTICIPAREA ♥
  </button>
</Link>
</div>
            </div>

            {/* URL slug */}
            <div className="vi-slug-pill">
              <div className="vi-slug-icon">🔗</div>
              <div>
                <div className="vi-slug-label">Link personalizat</div>
                <div className="vi-slug-val">vibeinvite.ro/nunta-ana-si-mihai</div>
              </div>
            </div>

            {/* status mini cards */}
            <div className="vi-status-row">
              <div className="vi-status-card">
                <div className="vi-status-n">84</div>
                <div className="vi-status-l">Invitați</div>
                <span className="vi-status-b green">Confirmați</span>
              </div>
              <div className="vi-status-card">
                <div className="vi-status-n">12</div>
                <div className="vi-status-l">Invitați</div>
                <span className="vi-status-b yellow">În așteptare</span>
              </div>
              <div className="vi-status-card">
                <div className="vi-status-n">4</div>
                <div className="vi-status-l">Invitați</div>
                <span className="vi-status-b red">Nu vin</span>
              </div>
            </div>

          </div>
        </div>

        {/* ticker */}
        <div className="vi-ticker" aria-hidden="true">
          <div className="vi-ti-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <div key={i} className="vi-ti">
                {t}<span className="vi-tdot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ A) INVITAȚII ONLINE ══════════════ */}
      <section aria-labelledby="inv-title">
        <div className="vi-section">
          <span className="vi-section-label">
            <span aria-hidden="true">💌</span>
            Invitații PDF
          </span>
          <h2 className="vi-section-title" id="inv-title">
            Tot ce ai nevoie pentru <em>organizarea nunții</em>,<br />
            <strong>într-un singur loc</strong>
          </h2>
          <p className="vi-section-sub">
            De la invitația digitală trimisă printr-un link, până la gestionarea confirmărilor și colectarea pozelor — platforma VibeInvite acoperă tot ce înseamnă <strong>organizare nuntă digitală</strong>.
          </p>

          <ul
            className="vi-feat-grid"
            aria-label="Funcționalitățile platformei de invitații nuntă online"
            style={{ listStyle: 'none' }}
          >
            {FEATURES_MAIN.map((f) => (
              <li key={f.name} className="vi-feat-card">
                <div className="vi-feat-emoji" aria-hidden="true">{f.icon}</div>
                <div className="vi-feat-name">{f.name}</div>
                <div className="vi-feat-desc">{f.desc}</div>
              </li>
            ))}
          </ul>

          <div className="vi-pricing-note" role="note">
            <span aria-hidden="true">🗓️</span>
            Pachetul include acces complet timp de <strong>12 luni</strong> de la activare — invitații nelimitate, fără costuri ascunse.
          </div>

          <div className="vi-bottom-cta">
            <Link href="/preturi" className="vi-cta-primary">
              <span aria-hidden="true">✨</span>
              Creează invitația ta online
            </Link>
            <Link href="/invitatii-digitale" className="vi-cta-ghost">
              Vezi toate modelele →
            </Link>
          </div>
        </div>
      </section>

      <div className="vi-section-divider" role="separator" />

      {/* ══════════════ B) FOTOGRAFI PILOT ══════════════ */}
      <section className="vi-photo-section" aria-labelledby="photo-title">
        <div className="vi-photo-inner">

          {/* LEFT */}
          <div>
            <span className="vi-photo-label">
              <span aria-hidden="true">📸</span>
              Proiect Pilot — Fotografi Locali
            </span>
            <h2 className="vi-photo-title" id="photo-title">
              Ești fotograf de eveniment?<br />
              <em>Hai în echipă</em>
            </h2>
            <p className="vi-photo-sub">
              Căutăm fotografi din toată țara pentru un proiect pilot gratuit. Îți creăm o pagină de portofoliu cu focus pe SEO local, ca să fii găsit de mirii din zona ta.
            </p>

            <ul className="vi-photo-list" aria-label="Ce include colaborarea">
              <li className="vi-photo-item">Pagină proprie de portofoliu pe vibeinvite.ro</li>
              <li className="vi-photo-item">Optimizare SEO locală pentru Google (manual, fără automatizări)</li>
              <li className="vi-photo-item">Vizibilitate direct în fața mirilor care creează invitații</li>
              <li className="vi-photo-item">Zero costuri — complet gratuit pe durata pilotului</li>
            </ul>

            <a href="mailto:office@vibeinvite.ro" className="vi-photo-cta">
              <span aria-hidden="true">✉️</span>
              Contactează-ne la office@vibeinvite.ro
            </a>
            <p className="vi-photo-note">Răspundem în maximum 48 de ore.</p>
          </div>

          {/* RIGHT */}
          <div className="vi-photo-cards" aria-hidden="true">
            {PHOTO_CARDS.map((c) => (
              <div key={c.title} className="vi-photo-card">
                <div className="vi-photo-card-ico">{c.icon}</div>
                <div>
                  <div className="vi-photo-card-title">{c.title}</div>
                  <div className="vi-photo-card-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
