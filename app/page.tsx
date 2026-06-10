

// import type { Metadata } from 'next'
// import Link from 'next/link'
// import { SITE_DOMAIN, DEFAULT_OG, OG_WIDTH, OG_HEIGHT } from '../constants/marketingDefaults'

// /* ═══════════════════════════════════════════════════════════════
//    SEO METADATA
// ═══════════════════════════════════════════════════════════════ */
// export const metadata: Metadata = {
//   title: 'VibeInvite | Invitații Nuntă Online — Platformă Completă pentru Miri',
//   description:
//     'Invitații nuntă online prin link personalizat, confirmare participare, gestionare invitați, meniu QR și upload poze. Platformă digitală completă pentru organizarea nunții tale.',
//   keywords: [
//     'invitații nuntă online',
//     'invitații digitale pentru nuntă',
//     'invitație nuntă prin link',
//     'confirmare invitați online',
//     'organizare nuntă digitală',
//     'invitatie online',
//     'link invitatie nunta',
//     'gestionare invitatii nunta',
//     'invitatie digitala nunta',
//     'RSVP nunta online',
//     'invitații botez online',
//     'dashboard miri',
//     'meniu nunta QR cod',
//     'export excel invitatii',
//     'invitații PDF România',
//   ],
//   authors: [{ name: 'VibeInvite', url: 'https://www.vibeinvite.ro' }],
//   creator: 'VibeInvite',
//   publisher: 'VibeInvite',
//   metadataBase: new URL(SITE_DOMAIN),
//   alternates: { canonical: SITE_DOMAIN },
//   openGraph: {
//     type: 'website',
//     url: 'https://www.vibeinvite.ro',
//     title: 'VibeInvite — Invitații Nuntă Online, Platformă Completă pentru Miri',
//     description:
//       'Invitații digitale pentru nuntă prin link personalizat, confirmare participare, gestionare invitați și experiență digitală completă. Simplu, modern, fără hârtie.',
//     siteName: 'VibeInvite',
//     images: [
//       {
//         url: DEFAULT_OG,
//         width: OG_WIDTH,
//         height: OG_HEIGHT,
//         alt: 'VibeInvite — Invitații Nuntă Online',
//       },
//     ],
//     locale: 'ro_RO',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'VibeInvite — Invitații Nuntă Online',
//     description: 'Platformă completă: invitații digitale, confirmare participare, gestionare invitați, meniu QR.',
//     images: [SITE_DOMAIN + '/social/twitter-card.png'],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   icons: {
//     icon: '/favicon.ico',
//     shortcut: '/favicon-16x16.png',
//     apple: '/apple-touch-icon.png',
//     other: [
//       { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
//       { rel: 'mask-icon', url: '/icons/maskable-icon-512x512.png', color: '#FF6B00' },
//       { rel: 'manifest', url: '/manifest.webmanifest' },
//     ],
//   },
// }

// /* ═══════════════════════════════════════════════════════════════
//    STYLES
// ═══════════════════════════════════════════════════════════════ */
// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

// *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// :root {
//   --orange: #FF6B00;
//   --orange-light: #FF8C35;
//   --orange-pale: #FFF4ED;
//   --orange-border: rgba(255,107,0,.18);
//   --ink: #1A1208;
//   --ink-mid: rgba(26,18,8,.6);
//   --ink-soft: rgba(26,18,8,.38);
//   --bg: #FDFAF6;
//   --white: #ffffff;
//   --radius-sm: 10px;
//   --radius-md: 16px;
//   --radius-lg: 24px;
//   --radius-xl: 32px;
// }

// body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--ink); }

// /* ── fade-in animations ─────── */
// @keyframes vi-up   { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
// @keyframes vi-in   { from { opacity:0; } to { opacity:1; } }
// @keyframes vi-tick { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
// @keyframes vi-dot  { 0%,100% { opacity:.4; transform: scale(.8); } 50% { opacity:1; transform: scale(1.2); } }
// @keyframes vi-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }

// /* ════════════════════════════════
//    HERO
// ════════════════════════════════ */
// .vi-hero {
//   background: var(--bg);
//   position: relative;
//   overflow: hidden;
// }

// /* subtle mesh background */
// .vi-hero::before {
//   content: '';
//   position: absolute;
//   inset: 0;
//   background:
//     radial-gradient(ellipse 680px 420px at 85% 0%, rgba(255,107,0,.07) 0%, transparent 60%),
//     radial-gradient(ellipse 440px 320px at 10% 80%, rgba(255,107,0,.05) 0%, transparent 60%);
//   pointer-events: none;
//   z-index: 0;
// }

// .vi-hero-inner {
//   position: relative; z-index: 1;
//   max-width: 1200px; margin: 0 auto;
//   padding: 72px 32px 80px;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 64px;
//   align-items: center;
// }

// /* LEFT */
// .vi-copy { display: flex; flex-direction: column; }

// .vi-eyebrow {
//   display: inline-flex; align-items: center; gap: 8px;
//   background: var(--orange-pale); border: 1px solid var(--orange-border);
//   border-radius: 100px; padding: 5px 14px 5px 10px;
//   font-size: 11.5px; font-weight: 600; color: var(--orange);
//   letter-spacing: .06em; text-transform: uppercase;
//   width: fit-content; margin-bottom: 20px;
//   opacity: 0; animation: vi-up .5s ease .05s forwards;
// }
// .vi-eyebrow-dot {
//   width: 7px; height: 7px; background: var(--orange);
//   border-radius: 50%; animation: vi-dot 1.8s ease-in-out infinite;
// }

// .vi-h1 {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: clamp(38px, 4.2vw, 62px);
//   font-weight: 300; line-height: 1.06;
//   color: var(--ink); margin-bottom: 20px;
//   opacity: 0; animation: vi-up .6s ease .15s forwards;
// }
// .vi-h1 em     { font-style: italic; color: var(--orange); }
// .vi-h1 strong { font-weight: 600; }

// .vi-lead {
//   font-size: 16px; line-height: 1.75;
//   color: var(--ink-mid); max-width: 480px;
//   margin-bottom: 32px;
//   opacity: 0; animation: vi-up .6s ease .25s forwards;
// }
// .vi-lead strong { color: var(--ink); font-weight: 500; }

// /* feature list */
// .vi-flist {
//   list-style: none;
//   display: flex; flex-direction: column; gap: 10px;
//   margin-bottom: 36px;
//   opacity: 0; animation: vi-up .6s ease .32s forwards;
// }
// .vi-fitem {
//   display: flex; align-items: center; gap: 10px;
//   font-size: 14px; color: var(--ink-mid); font-weight: 400;
// }
// .vi-fitem::before {
//   content: '';
//   width: 20px; height: 20px; flex-shrink: 0;
//   border-radius: 50%; background: var(--orange-pale);
//   border: 1px solid var(--orange-border);
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8'%3E%3Cpath d='M1 4l2.5 2.5L9 1' stroke='%23FF6B00' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   background-position: center;
// }
// .vi-fitem strong { color: var(--ink); font-weight: 500; }

// /* CTA group */
// .vi-cta-group {
//   display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
//   opacity: 0; animation: vi-up .6s ease .42s forwards;
// }
// .vi-cta-primary {
//   display: inline-flex; align-items: center; gap: 8px;
//   background: var(--orange); color: #fff;
//   padding: 14px 26px; border-radius: 100px;
//   font-size: 14px; font-weight: 600; text-decoration: none;
//   box-shadow: 0 6px 24px rgba(255,107,0,.32);
//   position: relative; overflow: hidden;
//   transition: background .2s, transform .18s, box-shadow .2s;
// }
// .vi-cta-primary::after {
//   content: ''; position: absolute; inset: 0;
//   background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
//   background-size: 400px 100%; animation: vi-shimmer 2.8s linear infinite;
// }
// .vi-cta-primary:hover {
//   background: var(--orange-light);
//   transform: translateY(-2px);
//   box-shadow: 0 10px 32px rgba(255,107,0,.38);
// }
// .vi-cta-ghost {
//   font-size: 13.5px; font-weight: 500; color: var(--ink);
//   text-decoration: none; border-bottom: 1.5px solid rgba(26,18,8,.2);
//   padding-bottom: 2px; transition: color .2s, border-color .2s;
// }
// .vi-cta-ghost:hover { color: var(--orange); border-color: var(--orange); }

// /* stats */
// .vi-stats {
//   display: flex; gap: 28px; margin-top: 40px; padding-top: 28px;
//   border-top: 1px solid rgba(26,18,8,.08);
//   opacity: 0; animation: vi-up .6s ease .52s forwards;
// }
// .vi-stat  { display: flex; flex-direction: column; gap: 3px; }
// .vi-sn    { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: var(--ink); line-height: 1; }
// .vi-sl    { font-size: 11.5px; color: var(--ink-soft); letter-spacing: .03em; }
// .vi-sd    { width: 1px; background: rgba(26,18,8,.12); align-self: stretch; }

// /* RIGHT — visual panel */
// .vi-visual {
//   display: flex; flex-direction: column; gap: 12px;
//   opacity: 0; animation: vi-in .8s ease .3s forwards;
// }

// /* invite card mock */
// .vi-card {
//   background: var(--white);
//   border: 1px solid rgba(26,18,8,.07);
//   border-radius: var(--radius-xl);
//   box-shadow: 0 2px 4px rgba(0,0,0,.03), 0 16px 48px rgba(0,0,0,.08);
//   overflow: hidden;
// }
// .vi-card-top {
//   background: linear-gradient(155deg, #FFF4ED 0%, #FFFAF5 100%);
//   padding: 28px 28px 22px;
//   border-bottom: 1px solid rgba(255,107,0,.1);
//   text-align: center;
//   position: relative;
// }
// .vi-card-top::before {
//   content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
//   background: linear-gradient(90deg, var(--orange), var(--orange-light));
// }
// .vi-monogram {
//   width: 58px; height: 58px; border-radius: 50%;
//   background: var(--white); border: 1.5px solid rgba(255,107,0,.25);
//   display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
//   font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: var(--orange);
// }
// .vi-card-title {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: 18px; font-weight: 300; color: var(--ink); line-height: 1.4;
// }
// .vi-card-title em { font-style: italic; color: var(--orange); font-size: 22px; }
// .vi-card-date { font-size: 11px; color: var(--ink-soft); letter-spacing: .1em; text-transform: uppercase; margin-top: 10px; }

// .vi-card-body { padding: 16px 20px; }
// .vi-card-row  {
//   display: flex; align-items: center; gap: 10px;
//   padding: 9px 0; border-bottom: 1px solid rgba(0,0,0,.04);
// }
// .vi-card-row:last-of-type { border-bottom: none; }
// .vi-card-ico  {
//   width: 32px; height: 32px; border-radius: 9px; background: var(--orange-pale);
//   display: flex; align-items: center; justify-content: center;
//   font-size: 13px; flex-shrink: 0;
// }
// .vi-card-label { font-size: 10px; color: var(--ink-soft); }
// .vi-card-val   { font-size: 12.5px; font-weight: 500; color: var(--ink); }

// .vi-confirm-btn {
//   display: block; width: 100%; margin-top: 12px; margin-bottom: 2px;
//   background: var(--orange); color: #fff; border: none; border-radius: 100px;
//   padding: 11px; font-size: 12px; font-weight: 600; font-family: inherit;
//   letter-spacing: .04em; cursor: pointer;
//   transition: background .2s, transform .15s;
// }
// .vi-confirm-btn:hover { background: var(--orange-light); transform: scale(1.01); }

// /* slug pill */
// .vi-slug-pill {
//   display: flex; align-items: center; gap: 8px;
//   background: var(--white); border: 1px solid rgba(26,18,8,.09);
//   border-radius: var(--radius-md); padding: 12px 16px;
//   box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 6px 20px rgba(0,0,0,.05);
// }
// .vi-slug-icon {
//   width: 32px; height: 32px; border-radius: 8px; background: var(--orange-pale);
//   display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;
// }
// .vi-slug-label { font-size: 10px; color: var(--ink-soft); }
// .vi-slug-val   { font-size: 12.5px; font-weight: 500; color: var(--orange); }

// /* status row */
// .vi-status-row {
//   display: grid; grid-template-columns: repeat(3,1fr); gap: 8px;
// }
// .vi-status-card {
//   background: var(--white); border: 1px solid rgba(26,18,8,.07);
//   border-radius: var(--radius-md); padding: 12px 14px;
//   box-shadow: 0 1px 3px rgba(0,0,0,.03), 0 4px 14px rgba(0,0,0,.04);
// }
// .vi-status-n  { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; color: var(--ink); line-height: 1; }
// .vi-status-l  { font-size: 10px; color: var(--ink-soft); margin-top: 3px; }
// .vi-status-b  { display: inline-block; margin-top: 6px; font-size: 9.5px; font-weight: 600; border-radius: 100px; padding: 2px 8px; }
// .vi-status-b.green  { background: #dcfce7; color: #15803d; }
// .vi-status-b.yellow { background: #fef3c7; color: #b45309; }
// .vi-status-b.red    { background: #fee2e2; color: #b91c1c; }


// /* ════════════════════════════════
//    TICKER
// ════════════════════════════════ */
// .vi-ticker     { overflow: hidden; background: var(--orange); padding: 9px 0; }
// .vi-ti-inner   { display: flex; width: max-content; animation: vi-tick 22s linear infinite; }
// .vi-ti         { display: flex; align-items: center; gap: 8px; padding: 0 28px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
// .vi-tdot       { width: 3px; height: 3px; background: rgba(255,255,255,.5); border-radius: 50%; flex-shrink: 0; }


// /* ════════════════════════════════
//    SECTION BASE
// ════════════════════════════════ */
// .vi-section {
//   max-width: 1200px; margin: 0 auto;
//   padding: 80px 32px;
// }
// .vi-section-divider {
//   height: 1px; background: rgba(26,18,8,.07);
//   max-width: 1200px; margin: 0 auto;
// }

// .vi-section-label {
//   display: inline-flex; align-items: center; gap: 8px;
//   border: 1px solid var(--orange-border); border-radius: 100px;
//   padding: 4px 14px 4px 10px; font-size: 11px; font-weight: 600;
//   color: var(--orange); letter-spacing: .07em; text-transform: uppercase;
//   margin-bottom: 18px; background: var(--orange-pale);
// }

// .vi-section-title {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: clamp(30px, 3.2vw, 46px); font-weight: 300;
//   line-height: 1.1; color: var(--ink); margin-bottom: 14px;
// }
// .vi-section-title em { font-style: italic; color: var(--orange); }
// .vi-section-title strong { font-weight: 600; }

// .vi-section-sub {
//   font-size: 15px; line-height: 1.75; color: var(--ink-mid);
//   max-width: 560px; margin-bottom: 44px;
// }


// /* ════════════════════════════════
//    A) INVITAȚII ONLINE — FEATURES
// ════════════════════════════════ */
// .vi-feat-grid {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 16px;
//   margin-bottom: 40px;
// }
// .vi-feat-card {
//   background: var(--white);
//   border: 1px solid rgba(26,18,8,.07);
//   border-radius: var(--radius-lg);
//   padding: 22px 20px;
//   transition: border-color .2s, box-shadow .2s, transform .2s;
// }
// .vi-feat-card:hover {
//   border-color: var(--orange-border);
//   box-shadow: 0 4px 24px rgba(255,107,0,.08);
//   transform: translateY(-2px);
// }
// .vi-feat-emoji {
//   width: 40px; height: 40px; border-radius: 11px; background: var(--orange-pale);
//   display: flex; align-items: center; justify-content: center;
//   font-size: 18px; margin-bottom: 14px;
// }
// .vi-feat-name { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
// .vi-feat-desc { font-size: 13px; line-height: 1.6; color: var(--ink-mid); }

// /* valabilitate + pricing note */
// .vi-pricing-note {
//   display: flex; align-items: center; gap: 12px;
//   background: var(--orange-pale); border: 1px solid var(--orange-border);
//   border-radius: var(--radius-md); padding: 14px 20px;
//   font-size: 13px; color: var(--ink); margin-bottom: 28px;
// }
// .vi-pricing-note strong { color: var(--orange); font-weight: 600; }

// .vi-bottom-cta {
//   display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
// }


// /* ════════════════════════════════
//    B) FOTOGRAFI PILOT
// ════════════════════════════════ */
// .vi-photo-section {
//   background: var(--ink);
//   position: relative; overflow: hidden;
// }
// .vi-photo-section::before {
//   content: ''; position: absolute; inset: 0;
//   background: radial-gradient(ellipse 600px 400px at 90% 50%, rgba(255,107,0,.12) 0%, transparent 60%);
//   pointer-events: none;
// }
// .vi-photo-inner {
//   position: relative; z-index: 1;
//   max-width: 1200px; margin: 0 auto;
//   padding: 80px 32px;
//   display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
// }
// .vi-photo-label {
//   display: inline-flex; align-items: center; gap: 8px;
//   border: 1px solid rgba(255,107,0,.35); border-radius: 100px;
//   padding: 4px 14px 4px 10px; font-size: 11px; font-weight: 600;
//   color: var(--orange); letter-spacing: .07em; text-transform: uppercase;
//   margin-bottom: 18px; background: rgba(255,107,0,.1);
//   width: fit-content;
// }
// .vi-photo-title {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: clamp(28px, 2.8vw, 42px); font-weight: 300;
//   line-height: 1.1; color: #fff; margin-bottom: 14px;
// }
// .vi-photo-title em { font-style: italic; color: var(--orange); }
// .vi-photo-sub { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,.58); margin-bottom: 28px; }

// .vi-photo-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; }
// .vi-photo-item {
//   display: flex; align-items: flex-start; gap: 10px;
//   font-size: 13.5px; color: rgba(255,255,255,.72);
// }
// .vi-photo-item::before {
//   content: ''; width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px;
//   border-radius: 50%; background: rgba(255,107,0,.2);
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='7' viewBox='0 0 9 7'%3E%3Cpath d='M1 3.5l2 2L8 1' stroke='%23FF6B00' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
//   background-repeat: no-repeat; background-position: center;
// }

// .vi-photo-cta {
//   display: inline-flex; align-items: center; gap: 8px;
//   border: 1.5px solid rgba(255,107,0,.5); color: var(--orange);
//   padding: 13px 22px; border-radius: 100px;
//   font-size: 14px; font-weight: 600; text-decoration: none;
//   transition: background .2s, border-color .2s, transform .18s;
// }
// .vi-photo-cta:hover {
//   background: rgba(255,107,0,.12);
//   border-color: var(--orange);
//   transform: translateY(-1px);
// }
// .vi-photo-note { font-size: 11.5px; color: rgba(255,255,255,.35); margin-top: 12px; }

// /* right panel – cards stack */
// .vi-photo-cards { display: flex; flex-direction: column; gap: 10px; }
// .vi-photo-card {
//   background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
//   border-radius: var(--radius-md); padding: 16px 18px;
//   display: flex; align-items: center; gap: 14px;
// }
// .vi-photo-card-ico {
//   width: 40px; height: 40px; border-radius: 10px;
//   background: rgba(255,107,0,.12); border: 1px solid rgba(255,107,0,.2);
//   display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
// }
// .vi-photo-card-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
// .vi-photo-card-desc  { font-size: 12px; color: rgba(255,255,255,.48); }


// /* ════════════════════════════════
//    FOOTER STRIP
// ════════════════════════════════ */
// .vi-footer-strip {
//   background: var(--bg); border-top: 1px solid rgba(26,18,8,.07);
//   padding: 24px 32px;
//   display: flex; align-items: center; justify-content: center; gap: 8px;
//   font-size: 12px; color: var(--ink-soft);
// }
// .vi-footer-strip a { color: var(--orange); text-decoration: none; }
// .vi-footer-strip a:hover { text-decoration: underline; }


// /* ════════════════════════════════
//    RESPONSIVE
// ════════════════════════════════ */
// @media (max-width: 1023px) {
//   .vi-hero-inner { grid-template-columns: 1fr; gap: 40px; padding: 52px 28px 60px; }
//   .vi-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
//   .vi-card { grid-column: span 2; }
//   .vi-status-row { grid-template-columns: repeat(3,1fr); }
//   .vi-feat-grid { grid-template-columns: repeat(2, 1fr); }
//   .vi-photo-inner { grid-template-columns: 1fr; gap: 40px; padding: 64px 28px; }
// }

// @media (max-width: 767px) {
//   .vi-hero-inner { padding: 40px 20px 52px; }
//   .vi-section { padding: 60px 20px; }
//   .vi-feat-grid { grid-template-columns: 1fr; }
//   .vi-visual { display: flex; flex-direction: column; }
//   .vi-card { width: 100%; }
//   .vi-status-row { grid-template-columns: repeat(3, 1fr); }
//   .vi-stats { flex-wrap: wrap; gap: 20px; }
//   .vi-photo-inner { padding: 52px 20px; }
//   .vi-photo-cards { display: none; }
//   .vi-bottom-cta { flex-direction: column; align-items: flex-start; }
//   .vi-cta-group { flex-direction: column; align-items: flex-start; }
// }

// @media (max-width: 479px) {
//   .vi-h1 { font-size: 36px; }
//   .vi-status-row { grid-template-columns: 1fr 1fr; }
//   .vi-status-row > :last-child { display: none; }
// }
// `

// /* ═══════════════════════════════════════════════════════════════
//    DATA
// ═══════════════════════════════════════════════════════════════ */
// const TICKER_ITEMS = [
//   '💌 Invitații Nuntă Online',
//   '🎀 Invitații Botez',
//   '🔗 Link personalizat',
//   '✅ Confirmare participare',
//   '📋 Gestionare invitați',
//   '📷 Colectare poze live',
//   '🍽️ Meniu in Invitatie',
//   '📊 Export Excel',
//   '🗺️ GPS integrat',
//   '📱 Mobile-ready',
// ]

// const FEATURES_MAIN = [
//   {
//     icon: '💌',
//     name: 'Invitație prin link',
//     desc: 'URL personalizat de forma vibeinvite.ro/nunta-mea. Trimiți unui invitat sau tuturor deodată.',
//   },
//   {
//     icon: '✅',
//     name: 'Confirmare participare',
//     desc: 'Invitații confirmă online: vin / nu vin, număr copii, transport și observații.',
//   },
//   {
//     icon: '📋',
//     name: 'Dashboard miri',
//     desc: 'Urmărești statusul fiecărui invitat în timp real, direct din contul tău.',
//   },
//   {
//     icon: '📷',
//     name: 'Upload poze invitați',
//     desc: 'Invitații tăi pot încărca poze din eveniment. Tu le accesezi exclusiv din dashboard.',
//   },
//   {
//     icon: '🍽️',
//     name: 'Meniu in Invitatie',
//     desc: 'Afișezi meniul nunții direct în invitație ',
//   },
//   {
//     icon: '📊',
//     name: 'Export Excel',
//     desc: 'Lista completă: nume, status, copii, transport, observații — gata de printat sau trimis.',
//   },
// ]

// const PHOTO_CARDS = [
//   { icon: '📸', title: 'Pagină proprie de portofoliu', desc: 'Prezintă stilul tău unui public local' },
//   { icon: '🗺️', title: 'SEO local Google', desc: 'Vizibilitate pentru căutări din zona ta' },
//   { icon: '💬', title: 'Contact direct cu mirii', desc: 'Fără intermediari, fără comisioane' },
//   { icon: '🎁', title: 'Complet gratuit', desc: 'Zero costuri de listare sau onboarding' },
// ]

// /* ═══════════════════════════════════════════════════════════════
//    PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════ */
// export default function Page() {
//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: CSS }} />

//       {/* JSON-LD */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             '@context': 'https://schema.org',
//             '@type': 'WebSite',
//             name: 'VibeInvite',
//             url: 'https://www.vibeinvite.ro',
//             description:
//               'Platformă completă de invitații nuntă online prin link personalizat, confirmare participare, gestionare invitați și experiență digitală completă.',
//             potentialAction: {
//               '@type': 'SearchAction',
//               target: 'https://www.vibeinvite.ro/cautare?q={search_term_string}',
//               'query-input': 'required name=search_term_string',
//             },
//           }),
//         }}
//       />
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             '@context': 'https://schema.org',
//             '@type': 'SoftwareApplication',
//             name: 'VibeInvite',
//             applicationCategory: 'LifestyleApplication',
//             operatingSystem: 'Web, iOS, Android',
//             offers: {
//               '@type': 'Offer',
//               price: '0',
//               priceCurrency: 'RON',
//               description: 'Link invitație online',
//             },
//             aggregateRating: {
//               '@type': 'AggregateRating',
//               ratingValue: '4.9',
//               ratingCount: '1240',
//             },
//           }),
//         }}
//       />

//       {/* ══════════════ HERO ══════════════ */}
//       <section className="vi-hero" aria-label="VibeInvite — Invitații nuntă online">
//         <div className="vi-hero-inner">

//           {/* LEFT — copy */}
//           <div className="vi-copy">
//             <span className="vi-eyebrow">
//               <span className="vi-eyebrow-dot" aria-hidden="true" />
//               Platformă invitații nuntă online
//             </span>

//             <h1 className="vi-h1">
//               Invitații digitale<br />
//               pentru nuntă,{' '}
//               <em>simple</em>{' '}
//               și <strong>complete</strong>
//             </h1>

//             <p className="vi-lead">
//               Trimite <strong>invitații nuntă online</strong> printr-un link personalizat, urmărești cine confirmă participarea și gestionezi toată lista de invitați din dashboard — fără hârtie, fără bătăi de cap.
//             </p>

//             <ul className="vi-flist" aria-label="Ce include platforma">
//               <li className="vi-fitem"><strong>URL personalizat</strong> — vibeinvite.ro/nunta-ta</li>
//               <li className="vi-fitem"><strong>Confirmare participare</strong> cu copii, transport și observații</li>
//               <li className="vi-fitem"><strong>Tracking</strong> deschidere link, în timp real</li>
//               <li className="vi-fitem"><strong>Meniu</strong> și <strong>GPS</strong> integrate în invitație</li>
//               <li className="vi-fitem"><strong>Colectare poze</strong> de la invitați, acces exclusiv miri</li>
//               <li className="vi-fitem"><strong>Export Excel</strong> — lista completă, gata de utilizat</li>
//             </ul>

//             <div className="vi-cta-group">
//               <Link href="/preturi" className="vi-cta-primary">
//                 <span aria-hidden="true">✨</span>
//                 Creează invitația ta online
//               </Link>
//               <Link href="/invitatii-digitale" className="vi-cta-ghost">
//                 Vezi modele →
//               </Link>
//             </div>

//             <div className="vi-stats" aria-label="Statistici VibeInvite">
//               <div className="vi-stat">
//                 <span className="vi-sn">Nelimitat</span>
//                 <span className="vi-sl">Invitatii Trimise</span>
//               </div>
//               <div className="vi-sd" aria-hidden="true" />
//               <div className="vi-stat">
//                 <span className="vi-sn">25 GB</span>
//                 <span className="vi-sl">Poze Incarcate</span>
//               </div>
//               <div className="vi-sd" aria-hidden="true" />
//               <div className="vi-stat">
//                 <span className="vi-sn">5 min</span>
//                 <span className="vi-sl">Timp de creare</span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT — visual */}
//           <div className="vi-visual" aria-hidden="true">

//             {/* invite card preview */}
//             <div className="vi-card">
//               <div className="vi-card-top">
//                 <div className="vi-monogram">A & M</div>
//                 <div className="vi-card-title">
//                   Vă invităm la<br />
//                   <em>Nunta Noastră</em>
//                 </div>
//                 <div className="vi-card-date">15 Septembrie 2025</div>
//               </div>
//               <div className="vi-card-body">
//                 <div className="vi-card-row">
//                   <div className="vi-card-ico">🕕</div>
//                   <div>
//                     <div className="vi-card-label">Ora evenimentului</div>
//                     <div className="vi-card-val">18:00 — Cununia civilă</div>
//                   </div>
//                 </div>
//                 <div className="vi-card-row">
//                   <div className="vi-card-ico">📍</div>
//                   <div>
//                     <div className="vi-card-label">Locația</div>
//                     <div className="vi-card-val">Grand Hotel Continental</div>
//                   </div>
//                 </div>
//                 <div className="vi-card-row">
//                   <div className="vi-card-ico">🍽️</div>
//                   <div>
//                     <div className="vi-card-label">Meniu</div>
//                     <div className="vi-card-val">Scanează codul QR</div>
//                   </div>
//              </div>
// <Link href="/invitatii-digitale" className="vi-cta-ghost">
//   <button className="vi-confirm-btn">
//     CONFIRMĂ PARTICIPAREA ♥
//   </button>
// </Link>
// </div>
//             </div>

//             {/* URL slug */}
//             <div className="vi-slug-pill">
//               <div className="vi-slug-icon">🔗</div>
//               <div>
//                 <div className="vi-slug-label">Link personalizat</div>
//                 <div className="vi-slug-val">www.vibeinvite.ro/nunta-ana-si-mihai</div>
//               </div>
//             </div>

//             {/* status mini cards */}
//             <div className="vi-status-row">
//               <div className="vi-status-card">
//                 <div className="vi-status-n">84</div>
//                 <div className="vi-status-l">Invitați</div>
//                 <span className="vi-status-b green">Confirmați</span>
//               </div>
//               <div className="vi-status-card">
//                 <div className="vi-status-n">12</div>
//                 <div className="vi-status-l">Invitați</div>
//                 <span className="vi-status-b yellow">În așteptare</span>
//               </div>
//               <div className="vi-status-card">
//                 <div className="vi-status-n">4</div>
//                 <div className="vi-status-l">Invitați</div>
//                 <span className="vi-status-b red">Nu vin</span>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* ticker */}
//         <div className="vi-ticker" aria-hidden="true">
//           <div className="vi-ti-inner">
//             {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
//               <div key={i} className="vi-ti">
//                 {t}<span className="vi-tdot" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════════ A) INVITAȚII ONLINE ══════════════ */}
//       <section aria-labelledby="inv-title">
//         <div className="vi-section">
//           <span className="vi-section-label">
//             <span aria-hidden="true">💌</span>
//             Invitații PDF
//           </span>
//           <h2 className="vi-section-title" id="inv-title">
//             Tot ce ai nevoie pentru <em>organizarea nunții</em>,<br />
//             <strong>într-un singur loc</strong>
//           </h2>
//           <p className="vi-section-sub">
//             De la invitația digitală trimisă printr-un link, până la gestionarea confirmărilor și colectarea pozelor — platforma VibeInvite acoperă tot ce înseamnă <strong>organizare nuntă digitală</strong>.
//           </p>

//           <ul
//             className="vi-feat-grid"
//             aria-label="Funcționalitățile platformei de invitații nuntă online"
//             style={{ listStyle: 'none' }}
//           >
//             {FEATURES_MAIN.map((f) => (
//               <li key={f.name} className="vi-feat-card">
//                 <div className="vi-feat-emoji" aria-hidden="true">{f.icon}</div>
//                 <div className="vi-feat-name">{f.name}</div>
//                 <div className="vi-feat-desc">{f.desc}</div>
//               </li>
//             ))}
//           </ul>

//           <div className="vi-pricing-note" role="note">
//             <span aria-hidden="true">🗓️</span>
//             Pachetul include acces complet timp de <strong>12 luni</strong> de la activare — invitații nelimitate, fără costuri ascunse.
//           </div>

//           <div className="vi-bottom-cta">
//             <Link href="/preturi" className="vi-cta-primary">
//               <span aria-hidden="true">✨</span>
//               Creează invitația ta online
//             </Link>
//             <Link href="/invitatii-digitale" className="vi-cta-ghost">
//               Vezi toate modelele →
//             </Link>
//           </div>
//         </div>
//       </section>

//       <div className="vi-section-divider" role="separator" />

//       {/* ══════════════ B) FOTOGRAFI PILOT ══════════════ */}
//       <section className="vi-photo-section" aria-labelledby="photo-title">
//         <div className="vi-photo-inner">

//           {/* LEFT */}
//           <div>
//             <span className="vi-photo-label">
//               <span aria-hidden="true">📸</span>
//               Proiect Pilot — Fotografi Locali
//             </span>
//             <h2 className="vi-photo-title" id="photo-title">
//               Ești fotograf de eveniment?<br />
//               <em>Hai în echipă</em>
//             </h2>
//             <p className="vi-photo-sub">
//               Căutăm fotografi din toată țara pentru un proiect pilot gratuit. Îți creăm o pagină de portofoliu cu focus pe SEO local, ca să fii găsit de mirii din zona ta.
//             </p>

//             <ul className="vi-photo-list" aria-label="Ce include colaborarea">
//               <li className="vi-photo-item">Pagină proprie de portofoliu pe www.vibeinvite.ro</li>
//               <li className="vi-photo-item">Optimizare SEO locală pentru Google (manual, fără automatizări)</li>
//               <li className="vi-photo-item">Vizibilitate direct în fața mirilor care creează invitații</li>
//               <li className="vi-photo-item">Zero costuri — complet gratuit pe durata pilotului</li>
//             </ul>

//             <a href="mailto:office@vibeinvite.ro" className="vi-photo-cta">
//               <span aria-hidden="true">✉️</span>
//               Contactează-ne la office@vibeinvite.ro
//             </a>
//             <p className="vi-photo-note">Răspundem în maximum 48 de ore.</p>
//           </div>

//           {/* RIGHT */}
//           <div className="vi-photo-cards" aria-hidden="true">
//             {PHOTO_CARDS.map((c) => (
//               <div key={c.title} className="vi-photo-card">
//                 <div className="vi-photo-card-ico">{c.icon}</div>
//                 <div>
//                   <div className="vi-photo-card-title">{c.title}</div>
//                   <div className="vi-photo-card-desc">{c.desc}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   )
// }





'use client'

import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   NOTE: metadata lives in layout.tsx (this is 'use client')
   All SEO keywords preserved from original.
═══════════════════════════════════════════════════════════════ */

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

html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; font-size: 16px; }

/* ── Animations ── */
@keyframes vi-up     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes vi-in     { from{opacity:0} to{opacity:1} }
@keyframes vi-tick   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vi-dot    { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vi-shimmer{ 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vi-pulse  { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,0,.4)} 70%{box-shadow:0 0 0 10px rgba(255,107,0,0)} }
@keyframes vi-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
@keyframes vi-float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes vi-float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
@keyframes vi-float4 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(.5deg)} }
@keyframes vi-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes vi-qrPulse{ 0%,100%{opacity:.5;transform:scale(.97)} 50%{opacity:1;transform:scale(1)} }
@keyframes vi-scanLine{ 0%{top:8px;opacity:1} 80%{top:calc(100% - 12px);opacity:1} 100%{top:8px;opacity:0} }
@keyframes vi-photoIn { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
@keyframes vi-pulseMono { 0%,100%{transform:scale(.9);opacity:.8} 70%{transform:scale(1.3);opacity:0} 100%{transform:scale(.9);opacity:0} }
@keyframes vi-rowIn  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

/* ════════════════════════════════
   STICKY MOBILE BAR
════════════════════════════════ */
.vi-sticky-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  background: var(--white); border-top: 1px solid rgba(26,18,8,.08);
  padding: 12px 20px max(16px, env(safe-area-inset-bottom));
  display: none;
  box-shadow: 0 -4px 24px rgba(0,0,0,.1);
}
.vi-sticky-btn {
  display: block; width: 100%; text-align: center;
  background: var(--orange); color: #fff;
  padding: 18px; border-radius: 100px;
  font-size: 17px; font-weight: 600; text-decoration: none;
  animation: vi-pulse 2.5s ease-in-out infinite;
}

/* ════════════════════════════════
   HERO
════════════════════════════════ */
.vi-hero { background: var(--bg); position: relative; overflow: hidden; }
.vi-hero::before {
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 680px 420px at 85% 0%,rgba(255,107,0,.07) 0%,transparent 60%),
    radial-gradient(ellipse 440px 320px at 10% 80%,rgba(255,107,0,.05) 0%,transparent 60%);
  pointer-events: none; z-index: 0;
}
.vi-hero-inner {
  position: relative; z-index: 1;
  max-width: 1380px; margin: 0 auto;
  padding: 48px 28px 56px;
  display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center;
}

/* COPY */
.vi-copy { display: flex; flex-direction: column; }
.vi-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange-pale); border: 1px solid var(--orange-border);
  border-radius: 100px; padding: 6px 16px 6px 12px;
  font-size: 13px; font-weight: 600; color: var(--orange);
  letter-spacing: .06em; text-transform: uppercase;
  width: fit-content; margin-bottom: 16px;
  opacity: 0; animation: vi-up .5s ease .05s forwards;
}
.vi-eyebrow-dot { width: 7px; height: 7px; background: var(--orange); border-radius: 50%; animation: vi-dot 1.8s ease-in-out infinite; }
.vi-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(38px,9vw,62px); font-weight: 300; line-height: 1.06;
  color: var(--ink); margin-bottom: 16px;
  opacity: 0; animation: vi-up .6s ease .15s forwards;
}
.vi-h1 em     { font-style: italic; color: var(--orange); }
.vi-h1 strong { font-weight: 600; }
.vi-lead {
  font-size: 17px; line-height: 1.8; color: var(--ink-mid); max-width: 480px;
  margin-bottom: 24px;
  opacity: 0; animation: vi-up .6s ease .25s forwards;
}
.vi-lead strong { color: var(--ink); font-weight: 500; }

/* trust */
.vi-trust-inline {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  margin-bottom: 28px;
  opacity: 0; animation: vi-up .6s ease .3s forwards;
}
.vi-trust-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--white); border: 1px solid rgba(26,18,8,.08);
  border-radius: 100px; padding: 5px 13px;
  font-size: 13px; font-weight: 500; color: var(--ink-mid);
}

/* CTA group */
.vi-cta-group {
  display: flex; flex-direction: column; gap: 12px;
  opacity: 0; animation: vi-up .6s ease .38s forwards;
}
.vi-cta-primary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--orange); color: #fff;
  padding: 18px 28px; border-radius: 100px;
  font-size: 17px; font-weight: 600; text-decoration: none;
  box-shadow: 0 6px 24px rgba(255,107,0,.32);
  position: relative; overflow: hidden; text-align: center;
  transition: background .2s, transform .18s, box-shadow .2s;
}
.vi-cta-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
  background-size: 400px 100%; animation: vi-shimmer 2.8s linear infinite;
}
.vi-cta-primary:active { transform: scale(.98); }
.vi-cta-secondary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--white); color: var(--ink);
  padding: 17px 28px; border-radius: 100px;
  font-size: 16px; font-weight: 500; text-decoration: none;
  border: 1.5px solid rgba(26,18,8,.14); text-align: center;
  transition: border-color .2s, background .2s;
}
.vi-cta-ghost {
  font-size: 15px; font-weight: 500; color: var(--ink); text-decoration: none;
  border-bottom: 1.5px solid rgba(26,18,8,.2); padding-bottom: 2px;
  transition: color .2s, border-color .2s; align-self: center;
}
.vi-cta-ghost:hover { color: var(--orange); border-color: var(--orange); }

/* stats strip */
.vi-stats {
  display: flex; gap: 0; margin-top: 32px; padding-top: 24px;
  border-top: 1px solid rgba(26,18,8,.08);
  opacity: 0; animation: vi-up .6s ease .48s forwards;
}
.vi-stat  { flex: 1; display: flex; flex-direction: column; gap: 3px; align-items: center; }
.vi-sn    { font-family: 'Cormorant Garamond',serif; font-size: 28px; font-weight: 600; color: var(--ink); line-height: 1; }
.vi-sl    { font-size: 13px; color: var(--ink-soft); letter-spacing: .03em; text-align: center; }
.vi-sd    { width: 1px; background: rgba(26,18,8,.1); align-self: stretch; }

/* ── HERO VISUAL (device panel from invitatii-digitale) ── */
.vi-hero-devices {
  display: flex; align-items: flex-end; justify-content: center;
  gap: 18px; padding: 28px 20px 0; overflow: hidden;
  opacity: 0; animation: vi-in .9s ease .35s forwards;
}

/* ════════════════════════════════
   TICKER
════════════════════════════════ */
.vi-ticker   { overflow: hidden; background: var(--orange); padding: 9px 0; }
.vi-ti-inner { display: flex; width: max-content; animation: vi-tick 22s linear infinite; }
.vi-ti       { display: flex; align-items: center; gap: 8px; padding: 0 24px; color: #fff; font-size: 13px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vi-tdot     { width: 3px; height: 3px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ════════════════════════════════
   HOW IT WORKS
════════════════════════════════ */
.vi-how { max-width: 1200px; margin: 0 auto; padding: 64px 28px 56px; }
.vi-how-steps { display: flex; flex-direction: column; gap: 0; margin-top: 36px; position: relative; }
.vi-how-steps::before {
  content: ''; position: absolute; left: 20px; top: 32px; bottom: 32px; width: 1px;
  background: var(--orange-border);
}
.vi-step { display: flex; align-items: flex-start; gap: 20px; padding: 20px 0; position: relative; }
.vi-step-num {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
  background: var(--orange-pale); border: 2px solid var(--orange-border);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond',serif; font-size: 20px; font-weight: 600; color: var(--orange);
  position: relative; z-index: 1;
}
.vi-step-title { font-size: 17px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.vi-step-desc  { font-size: 15px; line-height: 1.65; color: var(--ink-mid); }
.vi-step-tag {
  display: inline-block; margin-top: 6px;
  background: var(--orange-pale); border: 1px solid var(--orange-border);
  color: var(--orange); font-size: 12px; font-weight: 600; padding: 3px 12px; border-radius: 100px;
}

/* ════════════════════════════════
   SECTION BASE
════════════════════════════════ */
.vi-section { max-width: 1200px; margin: 0 auto; padding: 56px 28px; }
.vi-section-divider { height: 1px; background: rgba(26,18,8,.07); max-width: 1200px; margin: 0 auto; }
.vi-section-label {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--orange-border); border-radius: 100px;
  padding: 5px 16px 5px 12px; font-size: 13px; font-weight: 600;
  color: var(--orange); letter-spacing: .07em; text-transform: uppercase;
  margin-bottom: 16px; background: var(--orange-pale);
}
.vi-section-title {
  font-family: 'Cormorant Garamond',serif;
  font-size: clamp(30px,6.5vw,44px); font-weight: 300; line-height: 1.1;
  color: var(--ink); margin-bottom: 12px;
}
.vi-section-title em { font-style: italic; color: var(--orange); }
.vi-section-title strong { font-weight: 600; }
.vi-section-sub { font-size: 16px; line-height: 1.75; color: var(--ink-mid); max-width: 520px; margin-bottom: 36px; }

/* ── Features grid ── */
.vi-feat-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 32px; }
.vi-feat-card {
  background: var(--white); border: 1px solid rgba(26,18,8,.07);
  border-radius: var(--radius-lg); padding: 20px 18px;
  display: flex; align-items: flex-start; gap: 14px;
  transition: border-color .2s, box-shadow .2s;
}
.vi-feat-card:hover { border-color: var(--orange-border); box-shadow: 0 4px 20px rgba(255,107,0,.08); }
.vi-feat-emoji {
  width: 42px; height: 42px; border-radius: 11px; background: var(--orange-pale);
  display: flex; align-items: center; justify-content: center; font-size: 19px; flex-shrink: 0;
}
.vi-feat-name { font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.vi-feat-desc { font-size: 15px; line-height: 1.6; color: var(--ink-mid); }

/* pricing note */
.vi-pricing-note {
  display: flex; align-items: flex-start; gap: 12px;
  background: var(--orange-pale); border: 1px solid var(--orange-border);
  border-radius: var(--radius-md); padding: 16px 18px;
  font-size: 15px; color: var(--ink); margin-bottom: 24px; line-height: 1.6;
}
.vi-pricing-note strong { color: var(--orange); font-weight: 600; }
.vi-bottom-cta { display: flex; flex-direction: column; gap: 12px; }

/* ════════════════════════════════
   VS SECTION
════════════════════════════════ */
.vi-vs-section { background: var(--ink); padding: 56px 28px; }
.vi-vs-inner { max-width: 1200px; margin: 0 auto; }
.vi-vs-label {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(255,107,0,.35); border-radius: 100px;
  padding: 5px 16px 5px 12px; font-size: 13px; font-weight: 600;
  color: var(--orange); letter-spacing: .07em; text-transform: uppercase;
  margin-bottom: 16px; background: rgba(255,107,0,.1);
}
.vi-vs-title {
  font-family: 'Cormorant Garamond',serif;
  font-size: clamp(28px,6vw,42px); font-weight: 300; color: #fff; line-height: 1.15; margin-bottom: 8px;
}
.vi-vs-title em { font-style: italic; color: var(--orange); }
.vi-vs-sub { font-size: 16px; color: rgba(255,255,255,.5); margin-bottom: 32px; line-height: 1.7; }
.vi-vs-table {
  display: flex; flex-direction: column; gap: 1px;
  border-radius: var(--radius-lg); overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
}
.vi-vs-header { display: grid; grid-template-columns: 1fr 1fr 1fr; background: rgba(255,255,255,.04); padding: 12px 14px; }
.vi-vs-col-label { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,.4); text-align: center; }
.vi-vs-col-label.hl { color: var(--orange); }
.vi-vs-row { display: grid; grid-template-columns: 1fr 1fr 1fr; background: rgba(255,255,255,.03); border-top: 1px solid rgba(255,255,255,.05); padding: 14px; }
.vi-vs-row.feat { background: rgba(255,107,0,.07); }
.vi-vs-cell { font-size: 14px; color: rgba(255,255,255,.55); display: flex; align-items: center; justify-content: center; text-align: center; }
.vi-vs-cell.lbl { justify-content: flex-start; color: rgba(255,255,255,.7); font-size: 14px; }
.vi-check { color: var(--orange); font-weight: 700; font-size: 16px; }
.vi-cross { color: rgba(255,255,255,.22); font-size: 16px; }

/* ════════════════════════════════
   FAQ
════════════════════════════════ */
.vi-faq { max-width: 1200px; margin: 0 auto; padding: 56px 28px; }
.vi-faq-list { display: flex; flex-direction: column; gap: 10px; margin-top: 32px; }
.vi-faq-item { background: var(--white); border: 1px solid rgba(26,18,8,.08); border-radius: var(--radius-md); padding: 18px 20px; }
.vi-faq-q { font-size: 17px; font-weight: 600; color: var(--ink); margin-bottom: 8px; line-height: 1.4; }
.vi-faq-a { font-size: 15px; color: var(--ink-mid); line-height: 1.7; }
.vi-faq-a strong { color: var(--ink); font-weight: 500; }

/* ════════════════════════════════
   FINAL CTA
════════════════════════════════ */
.vi-final-cta {
  background: linear-gradient(155deg,#FF6B00 0%,#FF8C35 100%);
  padding: 56px 28px 72px; text-align: center;
  position: relative; overflow: hidden;
}
.vi-final-cta::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 500px 300px at 50% 100%,rgba(255,255,255,.1) 0%,transparent 60%);
  pointer-events: none;
}
.vi-final-inner { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
.vi-final-emoji { font-size: 40px; margin-bottom: 16px; }
.vi-final-title {
  font-family: 'Cormorant Garamond',serif;
  font-size: clamp(32px,7vw,50px); font-weight: 300;
  color: #fff; line-height: 1.1; margin-bottom: 12px;
}
.vi-final-title strong { font-weight: 600; }
.vi-final-sub { font-size: 16px; color: rgba(255,255,255,.75); line-height: 1.7; margin-bottom: 32px; }
.vi-final-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--white); color: var(--orange);
  padding: 18px 32px; border-radius: 100px;
  font-size: 17px; font-weight: 700; text-decoration: none;
  box-shadow: 0 8px 32px rgba(0,0,0,.18);
  transition: transform .18s, box-shadow .2s;
  max-width: 360px; margin: 0 auto;
}
.vi-final-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,.24); }
.vi-final-note { font-size: 13px; color: rgba(255,255,255,.6); margin-top: 14px; }

/* ════════════════════════════════
   FOTOGRAFI PILOT
════════════════════════════════ */
.vi-photo-section { background: var(--bg); border-top: 1px solid rgba(26,18,8,.07); }
.vi-photo-inner { max-width: 1200px; margin: 0 auto; padding: 56px 28px; display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; }
.vi-photo-label {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--orange-border); border-radius: 100px;
  padding: 5px 16px 5px 12px; font-size: 13px; font-weight: 600;
  color: var(--orange); letter-spacing: .07em; text-transform: uppercase;
  margin-bottom: 16px; background: var(--orange-pale); width: fit-content;
}
.vi-photo-title {
  font-family: 'Cormorant Garamond',serif;
  font-size: clamp(28px,5.5vw,40px); font-weight: 300; line-height: 1.1;
  color: var(--ink); margin-bottom: 12px;
}
.vi-photo-title em { font-style: italic; color: var(--orange); }
.vi-photo-sub { font-size: 16px; line-height: 1.75; color: var(--ink-mid); margin-bottom: 24px; }
.vi-photo-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.vi-photo-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 15px; color: var(--ink-mid); line-height: 1.5;
}
.vi-photo-item::before {
  content: ''; width: 20px; height: 20px; flex-shrink: 0; margin-top: 1px;
  border-radius: 50%; background: var(--orange-pale);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='7' viewBox='0 0 9 7'%3E%3Cpath d='M1 3.5l2 2L8 1' stroke='%23FF6B00' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: center;
}
.vi-photo-cta {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--ink); color: #fff; padding: 17px 24px; border-radius: 100px;
  font-size: 16px; font-weight: 600; text-decoration: none;
  transition: background .2s, transform .18s; width: 100%;
}
.vi-photo-cta:active { transform: scale(.98); }
.vi-photo-note { font-size: 13px; color: var(--ink-soft); margin-top: 10px; text-align: center; }

/* ════════════════════════════════
   DEVICE FRAMES (from invitatii-digitale)
════════════════════════════════ */
.vi-phone-wrap  { animation: vi-float  4.2s ease-in-out infinite; flex-shrink: 0; }
.vi-tablet-wrap { animation: vi-float2 5s   ease-in-out infinite .9s; flex-shrink: 0; }
.vi-laptop-wrap { animation: vi-float3 5.8s ease-in-out infinite 1.8s; flex-shrink: 0; }
.vi-qr-wrap     { animation: vi-float4 4.6s ease-in-out infinite 2.4s; flex-shrink: 0; }

.vi-phone-frame {
  width: 86px; height: 178px; border-radius: 19px;
  border: 3px solid #222; background: #111; overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset, 0 12px 36px rgba(0,0,0,.32);
}
.vi-phone-notch   { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 34px; height: 6px; background: #222; border-radius: 0 0 5px 5px; z-index: 10; }
.vi-phone-side-btn{ position: absolute; right: -3px; top: 50px; width: 3px; height: 20px; background: #333; border-radius: 2px; }
.vi-phone-side-vol{ position: absolute; left: -3px; top: 46px; width: 3px; height: 13px; background: #333; border-radius: 2px; }
.vi-phone-side-v2 { position: absolute; left: -3px; top: 63px; width: 3px; height: 13px; background: #333; border-radius: 2px; }
.vi-phone-bar     { position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 26px; height: 3px; background: rgba(255,255,255,.2); border-radius: 2px; z-index: 10; }

.vi-tablet-frame {
  width: 136px; height: 192px; border-radius: 15px;
  border: 3.5px solid #222; background: #111; overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset, 0 12px 36px rgba(0,0,0,.32);
}
.vi-tablet-cam  { position: absolute; top: 5px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10; }
.vi-tablet-side { position: absolute; right: -4px; top: 56px; width: 3px; height: 28px; background: #333; border-radius: 2px; }
.vi-tablet-bar  { position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 30px; height: 3px; background: rgba(255,255,255,.18); border-radius: 2px; z-index: 10; }

.vi-laptop-lid {
  width: 238px; height: 150px; border-radius: 10px 10px 0 0;
  border: 3px solid #222; border-bottom: 2px solid #1a1a1a;
  background: #111; overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,.05) inset, 0 -4px 16px rgba(0,0,0,.15);
}
.vi-laptop-cam   { position: absolute; top: 4px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10; }
.vi-laptop-hinge { width: 260px; height: 6px; background: linear-gradient(to bottom,#2a2a2a,#1a1a1a); margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,.28); }
.vi-laptop-base  { width: 264px; height: 10px; background: linear-gradient(to bottom,#252525,#1c1c1c); border-radius: 0 0 6px 6px; margin: 0 auto; box-shadow: 0 4px 18px rgba(0,0,0,.22); position: relative; }
.vi-laptop-base::after { content:''; position:absolute; top:3px; left:50%; transform:translateX(-50%); width:44px; height:3px; border-radius:2px; background:rgba(255,255,255,.07); }

/* QR Card */
.vi-qr-card {
  width: 110px; background: #fff; border-radius: 18px;
  border: 1px solid rgba(255,107,0,.18);
  box-shadow: 0 8px 32px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.08);
  overflow: hidden; position: relative;
}
.vi-qr-top  { padding: 10px 10px 8px; text-align: center; position: relative; }
.vi-qr-top-label { font-size: 6px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #FF6B00; margin-bottom: 6px; display: block; }
.vi-qr-code {
  width: 64px; height: 64px; margin: 0 auto 6px; position: relative;
  border: 2px solid currentColor; border-radius: 6px; padding: 4px;
  animation: vi-qrPulse 2.4s ease-in-out infinite;
}
.vi-qr-grid { width: 100%; height: 100%; display: grid; grid-template-columns: repeat(7,1fr); grid-template-rows: repeat(7,1fr); gap: 1px; }
.vi-qr-cell { border-radius: 1px; }
.vi-qr-scan {
  position: absolute; left: 4px; right: 4px; height: 2px;
  background: linear-gradient(90deg,transparent,#FF6B00,transparent);
  border-radius: 1px; animation: vi-scanLine 2s ease-in-out infinite; z-index: 5;
}
.vi-qr-sublabel { font-size: 5.5px; color: rgba(26,18,8,.5); line-height: 1.4; margin-top: 2px; }
.vi-qr-divider  { height: 1px; background: rgba(255,107,0,.1); margin: 0 8px; }
.vi-qr-photos   { padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.vi-qr-photo    { border-radius: 6px; overflow: hidden; aspect-ratio: 1; position: relative; font-size: 18px; display: flex; align-items: center; justify-content: center; }
.vi-qr-photo:nth-child(1) { animation: vi-photoIn .4s ease .1s both; }
.vi-qr-photo:nth-child(2) { animation: vi-photoIn .4s ease .3s both; }
.vi-qr-photo:nth-child(3) { animation: vi-photoIn .4s ease .5s both; }
.vi-qr-photo:nth-child(4) { animation: vi-photoIn .4s ease .7s both; }
.vi-qr-photo-new { position: absolute; bottom: 2px; right: 2px; background: #FF6B00; color: #fff; font-size: 4px; font-weight: 700; padding: 1px 3px; border-radius: 3px; letter-spacing: .04em; }
.vi-qr-counter  { display: flex; align-items: center; justify-content: space-between; padding: 5px 9px 7px; font-size: 5.5px; color: rgba(26,18,8,.55); }
.vi-qr-live     { display: inline-flex; align-items: center; gap: 3px; background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 8px; font-size: 5px; font-weight: 700; }
.vi-qr-live-dot { width: 4px; height: 4px; border-radius: 50%; background: #15803d; animation: vi-dot 1.2s ease-in-out infinite; }

/* dev labels */
.vi-dev-label { text-align: center; margin-top: 7px; font-size: 9px; font-weight: 500; color: rgba(26,18,8,.38); letter-spacing: .03em; }

/* ════════════════════════════════
   VSC (invite/dash screen contents)
════════════════════════════════ */
.vsc { width:100%; height:100%; display:flex; flex-direction:column; overflow:hidden; }
.vsc-bar { height:3px; width:100%; flex-shrink:0; }
.vsc-invite-top { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px 8px 6px; text-align:center; position:relative; overflow:hidden; }
.vsc-deco { position:absolute; opacity:.1; font-size:30px; transform:rotate(15deg); top:4px; right:6px; pointer-events:none; }
.vsc-mono { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 6px; font-size:8.5px; font-style:italic; font-weight:700; position:relative; font-family:'Cormorant Garamond',serif; }
.vsc-mono-ring { position:absolute; inset:-5px; border-radius:50%; border:1px dashed; opacity:.5; animation:vi-spin 18s linear infinite; }
.vsc-pulse { position:absolute; inset:-8px; border-radius:50%; border:1.5px solid; animation:vi-pulseMono 2.6s ease-out infinite; }
.vsc-title { font-family:'Cormorant Garamond',serif; font-size:9.5px; line-height:1.35; }
.vsc-title em { font-style:italic; }
.vsc-divline { height:1px; width:30px; margin:4px auto; opacity:.5; }
.vsc-date { font-size:6px; letter-spacing:.07em; text-transform:uppercase; opacity:.65; margin-bottom:1px; }
.vsc-invite-rows { padding:5px 6px 4px; }
.vsc-row { display:flex; align-items:center; gap:4px; padding:3px 4px; border-radius:4px; margin-bottom:2.5px; }
.vsc-ico { width:11px; height:11px; border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:6px; flex-shrink:0; }
.vsc-txt-wrap { display:flex; flex-direction:column; }
.vsc-lbl { font-size:5px; opacity:.55; line-height:1.2; }
.vsc-val { font-size:6px; font-weight:600; line-height:1.2; }
.vsc-rsvp-btn { margin:4px 6px 4px; border-radius:20px; padding:4px 0; text-align:center; font-size:5.5px; font-weight:700; letter-spacing:.07em; cursor:default; }
.vsc-dash { width:100%; height:100%; display:flex; flex-direction:column; overflow:hidden; }
.vsc-dash-nav { height:17px; display:flex; align-items:center; padding:0 7px; gap:4px; flex-shrink:0; }
.vsc-dash-dot { width:5px; height:5px; border-radius:50%; }
.vsc-dash-logo { font-size:6px; font-weight:700; opacity:.55; margin-left:3px; letter-spacing:.03em; }
.vsc-dash-body { flex:1; padding:5px 6px; display:flex; flex-direction:column; gap:4px; overflow:hidden; }
.vsc-dash-section { font-size:5.5px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; opacity:.4; margin-bottom:2px; }
.vsc-stats-row { display:flex; gap:3px; }
.vsc-stat { flex:1; border-radius:5px; padding:4px 3px; text-align:center; }
.vsc-stat-num { font-size:10px; font-weight:700; line-height:1; }
.vsc-stat-lbl { font-size:4.5px; opacity:.6; margin-top:1px; }
.vsc-progress-wrap { border-radius:3px; overflow:hidden; height:4px; margin-top:2px; }
.vsc-progress-bar { height:100%; border-radius:3px; }
.vsc-guest-item { display:flex; align-items:center; justify-content:space-between; padding:3.5px 4px; border-radius:4px; margin-bottom:2px; }
.vsc-guest-name { font-size:5.5px; font-weight:500; }
.vsc-guest-badge { font-size:5px; padding:1.5px 4px; border-radius:8px; font-weight:700; }

/* ════════════════════════════════
   FOOTER
════════════════════════════════ */
.vi-footer-strip {
  background: var(--bg); border-top: 1px solid rgba(26,18,8,.07);
  padding: 20px 28px 32px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 13px; color: var(--ink-soft); flex-wrap: wrap; text-align: center;
}
.vi-footer-strip a { color: var(--orange); text-decoration: none; }
.vi-footer-strip a:hover { text-decoration: underline; }

/* ════════════════════════════════
   RESPONSIVE
════════════════════════════════ */
@media (min-width: 640px) {
  .vi-cta-group { flex-direction: row; }
  .vi-feat-grid { grid-template-columns: repeat(2,1fr); }
  .vi-feat-card { flex-direction: column; }
  .vi-bottom-cta { flex-direction: row; align-items: center; }
}
@media (min-width: 1024px) {
  .vi-hero-inner { grid-template-columns: 1fr 1fr; gap: 72px; padding: 72px 40px 80px; }
  .vi-feat-grid { grid-template-columns: repeat(3,1fr); }
  .vi-how-steps { flex-direction: row; }
  .vi-how-steps::before { display: none; }
  .vi-step { flex-direction: column; align-items: center; text-align: center; flex: 1; padding: 0 20px; position: relative; }
  .vi-step::after { content:'→'; position:absolute; right:-6px; top:10px; color:var(--orange-border); font-size:18px; }
  .vi-step:last-child::after { display: none; }
  .vi-step-num { margin-bottom: 12px; }
  .vi-photo-inner { grid-template-columns: 1fr 1fr; gap: 72px; padding: 80px 40px; }
  .vi-photo-cta { width: auto; }
  .vi-sticky-bar { display: none !important; }
}
@media (min-width: 1200px) {
  .vi-laptop-wrap { display: block !important; }
}
@media (max-width: 1023px) {
  .vi-sticky-bar { display: block; }
  body { padding-bottom: 72px; }
  .vi-laptop-wrap { display: none; }
}
@media (max-width: 640px) {
  .vi-hero-devices { gap: 12px; }
  .vi-qr-wrap { display: none; }
}
@media (max-width: 380px) {
  .vi-h1 { font-size: 34px; }
  .vi-tablet-wrap { display: none; }
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

const HOW_STEPS = [
  { num: '1', title: 'Alegi designul', desc: 'Selectezi un model din galeria noastră și îl personalizezi cu datele nunții voastre.', tag: '5 minute' },
  { num: '2', title: 'Primești linkul tău', desc: 'vibeinvite.ro/nunta-voastra — gata de trimis pe WhatsApp, Instagram sau SMS.', tag: 'Instant' },
  { num: '3', title: 'Urmărești totul live', desc: 'Cine a deschis invitația, cine confirmă, câți copii, transport — totul în dashboard.', tag: 'Real-time' },
]

const FEATURES_MAIN = [
  { icon: '💌', name: 'Invitație prin link personalizat', desc: 'URL de forma vibeinvite.ro/nunta-ta. Trimiți pe WhatsApp, Instagram sau SMS — fără aplicații extra.' },
  { icon: '✅', name: 'Confirmare participare online', desc: 'Invitații confirmă direct din link: vin / nu vin, număr copii, transport și observații.' },
  { icon: '📋', name: 'Dashboard miri în timp real', desc: 'Urmărești statusul fiecărui invitat live: confirmat, în așteptare, refuzat.' },
  { icon: '📷', name: 'Upload poze de la invitați', desc: 'Invitații tăi pot încărca poze din eveniment. Tu le accesezi exclusiv din dashboard.' },
  { icon: '🍽️', name: 'Meniu și GPS integrate', desc: 'Afișezi meniul nunții și harta locației direct în invitație — fără alte link-uri.' },
  { icon: '📊', name: 'Export Excel complet', desc: 'Nume, status, copii, transport, observații — lista gata de printat sau trimis traiteurului.' },
]

const VS_ROWS = [
  { feature: 'Confirmare participare',   vi: true,  alt: false },
  { feature: 'Tracking deschidere link', vi: true,  alt: false },
  { feature: 'Dashboard miri live',      vi: true,  alt: false },
  { feature: 'Upload poze invitați',     vi: true,  alt: false },
  { feature: 'Export Excel invitați',    vi: true,  alt: true  },
  { feature: 'GPS + Meniu integrate',    vi: true,  alt: true  },
  { feature: 'Actualizare oricând',      vi: true,  alt: true  },
  { feature: 'Zero hârtie / tipografie', vi: true,  alt: false },
]

const FAQS = [
  { q: 'Cât durează să creez invitația?', a: 'Aproximativ 5 minute. Alegi un design, completezi datele nunții, și primești linkul gata de trimis.' },
  { q: 'Pot schimba detaliile după ce am trimis linkul?', a: 'Da, oricând. Orice modificare se vede instant la toți invitații care redeschid linkul.' },
  { q: 'Câți invitați pot adăuga?', a: 'Nelimitat. Pachetul include invitații nelimitate și 25 GB spațiu pentru pozele încărcate de invitați.' },
  { q: 'Funcționează pe telefon?', a: 'Da, complet. Atât pentru tine (dashboard), cât și pentru invitați. Totul este optimizat pentru mobil.' },
  { q: 'Ce se întâmplă după eveniment?', a: 'Ai acces <strong>12 luni</strong> de la activare. Poți descărca toate pozele și lista de invitați oricând.' },
]

/* QR pattern */
const QR_PATTERN = [
  [1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1],
  [1,0,1,0,1,0,1],
  [1,0,0,1,0,0,1],
  [1,0,1,0,1,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
]

const MOMENTS = [
  { emoji: '💐', bg: 'linear-gradient(135deg,#fde8dc,#f5d0c0)', isNew: false },
  { emoji: '🥂', bg: 'linear-gradient(135deg,#fff8e6,#fef0c0)', isNew: true  },
  { emoji: '💃', bg: 'linear-gradient(135deg,#fdeaed,#f8d0d5)', isNew: true  },
  { emoji: '🎂', bg: 'linear-gradient(135deg,#f0fdf4,#d8f3dc)', isNew: false },
]

/* Hero theme — uses Nature green accent for a fresh feel */
const HERO_THEME = {
  barGrad:    'linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)',
  invTopBg:   'linear-gradient(170deg,#D8F3DC,#B7E4C7)',
  invBotBg:   '#fff',
  monoColor:  '#2D6A4F', monoBg: '#D8F3DC', titleColor: '#1B4332',
  divColor:   '#52B788', rowBg: '#F0FDF4', icoBg: '#D8F3DC',
  rsvpBg:     '#2D6A4F', rsvpColor: '#fff', deco: '🍃',
  navBg:      '#F0FDF4', statBg: '#D8F3DC', statColor: '#1B4332', guestBg: '#F0FDF4',
  badgeOk:    '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
  progressBg: '#D8F3DC', progressFill: '#2D6A4F',
  qrBorder:   'rgba(45,106,79,.2)', qrAccent: '#2D6A4F',
  accentSoft: '#52B788',
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN COMPONENTS (exact copies from invitatii-digitale)
═══════════════════════════════════════════════════════════════ */
type TTheme = typeof HERO_THEME

function InviteScreen({ t }: { t: TTheme }) {
  return (
    <div className="vsc" style={{ background: t.invBotBg }}>
      <div className="vsc-bar" style={{ background: t.barGrad }} />
      <div className="vsc-invite-top" style={{ background: t.invTopBg }}>
        <div aria-hidden="true" className="vsc-deco">{t.deco}</div>
        <div className="vsc-mono" style={{ background: t.monoBg, color: t.monoColor, border: `1.5px solid ${t.monoColor}40` }}>
          <div className="vsc-mono-ring" style={{ borderColor: t.monoColor }} />
          <div className="vsc-pulse" style={{ borderColor: t.monoColor + '60' }} />
          A&M
        </div>
        <p className="vsc-title" style={{ color: t.titleColor }}>
          Vă invităm la<br /><em>Nunta Noastră</em>
        </p>
        <div className="vsc-divline" style={{ background: t.divColor }} />
        <p className="vsc-date" style={{ color: t.titleColor }}>15 Sep · 2025</p>
      </div>
      <div className="vsc-invite-rows" style={{ background: t.invBotBg }}>
        {[
          { ico: '🕕', lbl: 'Ora', val: '18:00' },
          { ico: '📍', lbl: 'Locația', val: 'Grand Hotel' },
          { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' },
        ].map(r => (
          <div key={r.lbl} className="vsc-row" style={{ background: t.rowBg }}>
            <div className="vsc-ico" style={{ background: t.icoBg }}>{r.ico}</div>
            <div className="vsc-txt-wrap">
              <span className="vsc-lbl" style={{ color: t.titleColor }}>{r.lbl}</span>
              <span className="vsc-val" style={{ color: t.titleColor }}>{r.val}</span>
            </div>
          </div>
        ))}
        <div className="vsc-rsvp-btn" style={{ background: t.rsvpBg, color: t.rsvpColor }}>CONFIRMĂ PREZENȚA ♥</div>
      </div>
    </div>
  )
}

function DashboardScreen({ t }: { t: TTheme }) {
  return (
    <div className="vsc-dash" style={{ background: t.navBg }}>
      <div className="vsc-dash-nav" style={{ background: t.navBg, borderBottom: '1px solid rgba(0,0,0,.06)' }}>
        <div className="vsc-dash-dot" style={{ background: '#ff5f57' }} />
        <div className="vsc-dash-dot" style={{ background: '#ffbd2e' }} />
        <div className="vsc-dash-dot" style={{ background: '#28c840' }} />
        <span className="vsc-dash-logo" style={{ color: t.accentSoft }}>VibeInvite</span>
      </div>
      <div className="vsc-dash-body">
        <div className="vsc-dash-section" style={{ color: t.statColor }}>Dashboard</div>
        <div className="vsc-stats-row">
          {[{ n: '48', l: 'Total' }, { n: '32', l: 'Accept' }, { n: '16', l: 'Pend.' }].map(s => (
            <div key={s.l} className="vsc-stat" style={{ background: t.statBg }}>
              <div className="vsc-stat-num" style={{ color: t.statColor }}>{s.n}</div>
              <div className="vsc-stat-lbl" style={{ color: t.statColor }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="vsc-dash-section" style={{ color: t.statColor }}>Participare</div>
          <div className="vsc-progress-wrap" style={{ background: t.progressBg }}>
            <div className="vsc-progress-bar" style={{ width: '67%', background: t.progressFill }} />
          </div>
        </div>
        <div>
          <div className="vsc-dash-section" style={{ color: t.statColor }}>Invitați</div>
          {[
            { name: 'Ana & Mihai', ok: true },
            { name: 'Elena I.',    ok: true },
            { name: 'Radu P.',    ok: false },
            { name: 'Laura D.',   ok: true },
          ].map(g => (
            <div key={g.name} className="vsc-guest-item" style={{ background: t.guestBg }}>
              <span className="vsc-guest-name" style={{ color: t.titleColor }}>{g.name}</span>
              <span className="vsc-guest-badge" style={{ background: g.ok ? t.badgeOk : t.badgePend, color: g.ok ? t.badgeOkText : t.badgePendText }}>
                {g.ok ? '✓' : '⏳'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QrPhotoCard({ t }: { t: TTheme }) {
  return (
    <div className="vi-qr-card" style={{ borderColor: t.qrBorder }}>
      <div style={{ height: 3, background: t.barGrad }} />
      <div className="vi-qr-top">
        <span className="vi-qr-top-label" style={{ color: t.qrAccent }}>📷 Încarcă poze</span>
        <div className="vi-qr-code" style={{ borderColor: t.qrAccent, color: t.qrAccent }}>
          <div className="vi-qr-scan" style={{ background: `linear-gradient(90deg,transparent,${t.qrAccent},transparent)` }} />
          <div className="vi-qr-grid">
            {QR_PATTERN.flat().map((cell, i) => (
              <div key={i} className="vi-qr-cell" style={{ background: cell ? t.qrAccent : 'transparent' }} />
            ))}
          </div>
        </div>
        <p className="vi-qr-sublabel">Scanează &amp; trimite<br />momentele tale</p>
      </div>
      <div className="vi-qr-divider" />
      <div className="vi-qr-photos">
        {MOMENTS.map((m) => (
          <div key={m.emoji} className="vi-qr-photo" style={{ background: m.bg }}>
            <span style={{ fontSize: 20 }}>{m.emoji}</span>
            {m.isNew && <span className="vi-qr-photo-new">NOU</span>}
          </div>
        ))}
      </div>
      <div className="vi-qr-counter">
        <span>247 poze</span>
        <span className="vi-qr-live">
          <span className="vi-qr-live-dot" />
          LIVE
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const t = HERO_THEME

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebSite',
        name: 'VibeInvite', url: 'https://www.vibeinvite.ro',
        description: 'Platformă completă de invitații nuntă online prin link personalizat, confirmare participare, gestionare invitați și experiență digitală completă.',
        potentialAction: { '@type': 'SearchAction', target: 'https://www.vibeinvite.ro/cautare?q={search_term_string}', 'query-input': 'required name=search_term_string' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: 'VibeInvite', applicationCategory: 'LifestyleApplication', operatingSystem: 'Web, iOS, Android',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'RON', description: 'Link invitație online' },
      })}} />

      {/* Sticky mobile CTA */}
      <div className="vi-sticky-bar" aria-hidden="true">
        <Link href="/preturi" className="vi-sticky-btn">✨ Creează invitația ta</Link>
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <section className="vi-hero" aria-label="VibeInvite — Invitații nuntă online">
        <div className="vi-hero-inner">

          {/* COPY */}
          <div className="vi-copy">
            <span className="vi-eyebrow">
              <span className="vi-eyebrow-dot" aria-hidden="true" />
              Platformă invitații nuntă online
            </span>
            <h1 className="vi-h1">
              Invitația voastră,<br />
              trimisă pe <em>WhatsApp</em>{' '}
              în <strong>5 minute</strong>
            </h1>
            <p className="vi-lead">
              Fără tipografie, fără bătăi de cap. Creezi o <strong>invitație nuntă online</strong> cu un link personalizat, invitații confirmă direct, iar tu urmărești totul din telefon.
            </p>

            <div className="vi-trust-inline" aria-label="De ce VibeInvite">
              <span className="vi-trust-badge">🇷🇴 Made in România</span>
              <span className="vi-trust-badge">⚡ Gata în 5 minute</span>
              <span className="vi-trust-badge">📱 100% Mobile</span>
              <span className="vi-trust-badge">♻️ Fără hârtie</span>
            </div>

            <div className="vi-cta-group">
              <Link href="/preturi" className="vi-cta-primary">
                <span aria-hidden="true">✨</span>
                Creează invitația ta
              </Link>
              <Link href="/invitatii-digitale" className="vi-cta-secondary">
                Vezi modele →
              </Link>
            </div>

            <div className="vi-stats" aria-label="Ce include platforma">
              <div className="vi-stat">
                <span className="vi-sn">Nelimitat</span>
                <span className="vi-sl">Invitații trimise</span>
              </div>
              <div className="vi-sd" aria-hidden="true" />
              <div className="vi-stat">
                <span className="vi-sn">25 GB</span>
                <span className="vi-sl">Poze încărcate</span>
              </div>
              <div className="vi-sd" aria-hidden="true" />
              <div className="vi-stat">
                <span className="vi-sn">5 min</span>
                <span className="vi-sl">Timp de creare</span>
              </div>
            </div>
          </div>

          {/* DEVICES visual */}
          <div className="vi-hero-devices" aria-hidden="true">

            {/* Phone — Invite */}
            <div className="vi-phone-wrap">
              <div className="vi-phone-frame">
                <div className="vi-phone-notch" />
                <div className="vi-phone-side-btn" />
                <div className="vi-phone-side-vol" />
                <div className="vi-phone-side-v2" />
                <div className="vi-phone-bar" />
                <InviteScreen t={t} />
              </div>
              <p className="vi-dev-label">Telefon · Invitație</p>
            </div>

            {/* Tablet — Dashboard */}
            <div className="vi-tablet-wrap">
              <div className="vi-tablet-frame">
                <div className="vi-tablet-cam" />
                <div className="vi-tablet-side" />
                <div className="vi-tablet-bar" />
                <DashboardScreen t={t} />
              </div>
              <p className="vi-dev-label">Tabletă · Dashboard</p>
            </div>

            {/* Laptop — hidden on mobile, shown on wide desktop */}
            <div className="vi-laptop-wrap">
              <div className="vi-laptop-lid">
                <div className="vi-laptop-cam" />
                <InviteScreen t={t} />
              </div>
              <div className="vi-laptop-hinge" />
              <div className="vi-laptop-base" />
              <p className="vi-dev-label">Laptop · Previzualizare</p>
            </div>

            {/* QR Photo Card */}
            <div className="vi-qr-wrap">
              <QrPhotoCard t={t} />
              <p className="vi-dev-label">QR · Poze Instant</p>
            </div>

          </div>
        </div>

        {/* Ticker */}
        <div className="vi-ticker" aria-hidden="true">
          <div className="vi-ti-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <div key={i} className="vi-ti">{item}<span className="vi-tdot" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section aria-labelledby="how-title">
        <div className="vi-how">
          <span className="vi-section-label"><span aria-hidden="true">⚡</span>Cum funcționează</span>
          <h2 className="vi-section-title" id="how-title">Gata în <em>3 pași simpli</em></h2>
          <p className="vi-section-sub">Fără cont de design, fără ore pierdute. De la zero la invitație trimisă în mai puțin de 5 minute.</p>
          <div className="vi-how-steps" role="list">
            {HOW_STEPS.map(s => (
              <div key={s.num} className="vi-step" role="listitem">
                <div className="vi-step-num" aria-hidden="true">{s.num}</div>
                <div>
                  <div className="vi-step-title">{s.title}</div>
                  <div className="vi-step-desc">{s.desc}</div>
                  <span className="vi-step-tag">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="vi-section-divider" role="separator" />

      {/* ══════════════ FEATURES ══════════════ */}
      <section aria-labelledby="inv-title">
        <div className="vi-section">
          <span className="vi-section-label"><span aria-hidden="true">💌</span>Tot ce ai nevoie</span>
          <h2 className="vi-section-title" id="inv-title">
            O singură platformă,<br /><em>zero bătăi de cap</em>
          </h2>
          <p className="vi-section-sub">
            De la invitația trimisă pe WhatsApp până la lista finală de invitați — totul în dashboard-ul tău, pe telefon.
          </p>
          <ul className="vi-feat-grid" style={{ listStyle: 'none' }} aria-label="Funcționalitățile platformei de invitații nuntă online">
            {FEATURES_MAIN.map(f => (
              <li key={f.name} className="vi-feat-card">
                <div className="vi-feat-emoji" aria-hidden="true">{f.icon}</div>
                <div>
                  <div className="vi-feat-name">{f.name}</div>
                  <div className="vi-feat-desc">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="vi-pricing-note" role="note">
            <span aria-hidden="true">🗓️</span>
            <span>Pachetul include acces complet timp de <strong>12 luni</strong> de la activare — invitații nelimitate, 25 GB poze, fără costuri ascunse.</span>
          </div>
          <div className="vi-bottom-cta">
            <Link href="/preturi" className="vi-cta-primary">
              <span aria-hidden="true">✨</span>Creează invitația ta acum
            </Link>
            <Link href="/invitatii-digitale" className="vi-cta-ghost">
              Explorează modelele →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ VS ══════════════ */}
      <section className="vi-vs-section" aria-labelledby="vs-title">
        <div className="vi-vs-inner">
          <span className="vi-vs-label"><span aria-hidden="true">⚖️</span>De ce VibeInvite</span>
          <h2 className="vi-vs-title" id="vs-title">
            Nu e doar o invitație.<br />E <em>organizarea nunții</em> tale.
          </h2>
          <p className="vi-vs-sub">
            Invitațiile clasice pe hârtie îți spun cine a primit invitația. VibeInvite îți spune cine a confirmat, câți copii aduce, dacă are nevoie de transport — și exportă tot într-un Excel.
          </p>
          <div className="vi-vs-table" role="table">
            <div className="vi-vs-header" role="row">
              <div className="vi-vs-col-label" role="columnheader">Funcționalitate</div>
              <div className="vi-vs-col-label hl" role="columnheader">VibeInvite</div>
              <div className="vi-vs-col-label" role="columnheader">Hârtie / Altele</div>
            </div>
            {VS_ROWS.map((r, i) => (
              <div key={i} className={`vi-vs-row${i % 2 === 0 ? ' feat' : ''}`} role="row">
                <div className="vi-vs-cell lbl" role="cell">{r.feature}</div>
                <div className="vi-vs-cell" role="cell">{r.vi ? <span className="vi-check">✓</span> : <span className="vi-cross">✗</span>}</div>
                <div className="vi-vs-cell" role="cell">{r.alt ? <span style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px' }}>parțial</span> : <span className="vi-cross">✗</span>}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section aria-labelledby="faq-title">
        <div className="vi-faq">
          <span className="vi-section-label"><span aria-hidden="true">💬</span>Întrebări frecvente</span>
          <h2 className="vi-section-title" id="faq-title">
            Răspunsuri la ce te<br /><em>gândești acum</em>
          </h2>
          <div className="vi-faq-list" role="list">
            {FAQS.map((f, i) => (
              <div key={i} className="vi-faq-item" role="listitem" itemScope itemType="https://schema.org/Question">
                <div className="vi-faq-q" itemProp="name">{f.q}</div>
                <div className="vi-faq-a" itemScope itemType="https://schema.org/Answer" dangerouslySetInnerHTML={{ __html: `<span itemProp="text">${f.a}</span>` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="vi-final-cta" aria-labelledby="final-cta-title">
        <div className="vi-final-inner">
          <div className="vi-final-emoji" aria-hidden="true">💌</div>
          <h2 className="vi-final-title" id="final-cta-title">
            Nunta voastră merită<br />o invitație <strong>pe măsură</strong>
          </h2>
          <p className="vi-final-sub">
            Simplu de creat, frumos de trimis, ușor de gestionat. Totul într-un singur link — gata în 5 minute.
          </p>
          <Link href="/preturi" className="vi-final-btn">
            <span aria-hidden="true">✨</span>Creează invitația ta online
          </Link>
          <p className="vi-final-note">Acces complet 12 luni · Invitații nelimitate · 25 GB poze</p>
        </div>
      </section>

      {/* ══════════════ FOTOGRAFI PILOT ══════════════ */}
      <section className="vi-photo-section" aria-labelledby="photo-title">
        <div className="vi-photo-inner">
          <div>
            <span className="vi-photo-label"><span aria-hidden="true">📸</span>Proiect Pilot — Fotografi Locali</span>
            <h2 className="vi-photo-title" id="photo-title">
              Ești fotograf de eveniment?<br /><em>Hai în echipă</em>
            </h2>
            <p className="vi-photo-sub">
              Căutăm fotografi din toată țara pentru un proiect pilot gratuit. Îți creăm o pagină de portofoliu cu focus pe SEO local, ca să fii găsit de mirii din zona ta.
            </p>
            <ul className="vi-photo-list" aria-label="Ce include colaborarea">
              <li className="vi-photo-item">Pagină proprie de portofoliu pe vibeinvite.ro</li>
              <li className="vi-photo-item">Optimizare SEO locală pentru Google — fără automatizări</li>
              <li className="vi-photo-item">Vizibilitate directă în fața mirilor care creează invitații</li>
              <li className="vi-photo-item">Zero costuri — complet gratuit pe durata pilotului</li>
            </ul>
            <a href="mailto:office@vibeinvite.ro" className="vi-photo-cta">
              <span aria-hidden="true">✉️</span>Contactează-ne la office@vibeinvite.ro
            </a>
            <p className="vi-photo-note">Răspundem în maximum 48 de ore.</p>
          </div>

          {/* Desktop right panel */}
          <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '📸', title: 'Pagină proprie de portofoliu', desc: 'Prezintă stilul tău unui public local' },
              { icon: '🗺️', title: 'SEO local Google', desc: 'Vizibilitate pentru căutări din zona ta' },
              { icon: '💬', title: 'Contact direct cu mirii', desc: 'Fără intermediari, fără comisioane' },
              { icon: '🎁', title: 'Complet gratuit', desc: 'Zero costuri de listare sau onboarding' },
            ].map(c => (
              <div key={c.title} style={{ background: 'var(--white)', border: '1px solid rgba(26,18,8,.07)', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--orange-pale)', border: '1px solid var(--orange-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' }}>{c.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="vi-footer-strip">
        <span>© 2025 VibeInvite</span>
        <span>·</span>
        <Link href="/politica-confidentialitate">Politică Confidențialitate</Link>
        <span>·</span>
        <Link href="/termeni">Termeni și Condiții</Link>
        <span>·</span>
        <a href="mailto:office@vibeinvite.ro">office@vibeinvite.ro</a>
      </footer>
    </>
  )
}