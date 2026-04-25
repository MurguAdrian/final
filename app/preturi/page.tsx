import type { Metadata } from 'next'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
═══════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: 'Prețuri | VibeInvite — Pachet Complet 300 Lei, Plată Unică',
  description:
    'Un singur pachet all-in-one pentru nuntă și botez: invitații digitale nelimitate, meniu QR, upload poze invitați, organizare momente, export Excel. 300 lei, plată unică, fără abonament.',
  keywords: [
    'pret invitatii digitale',
    'invitatii nunta pret',
    'pachet invitatii online ieftin',
    'invitatii digitale 300 lei',
    'invitatii nelimitate nunta',
    'meniu nunta QR pret',
    'upload poze nunta invitati',
    'export excel invitatii nunta',
    'pachet all-in-one nunta',
    'invitatii online plata unica',
  ],
  openGraph: {
    title: 'VibeInvite — Pachet Complet 300 Lei, Plată Unică',
    description: 'Tot ce ai nevoie pentru nuntă într-un singur pachet: invitații nelimitate, meniu QR, poze invitați, export Excel. 300 lei, o singură dată.',
    images: [{ url: '/og-preturi.jpg', width: 1200, height: 630 }],
  },
}

/* ═══════════════════════════════════════════════════════════════
   STYLES — prefix vp- (pricing page), aceeași identitate vizuală
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vp-page * { box-sizing: border-box; margin: 0; padding: 0; }

.vp-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* ── orbs ── */
@keyframes vp-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vp-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vp-o1  { width: 500px; height: 500px; background: radial-gradient(circle,rgba(255,107,0,.15) 0%,transparent 70%); top: -100px; right: -80px; animation: vp-orb 14s ease-in-out infinite; }
.vp-o2  { width: 320px; height: 320px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 60px; left: -60px; animation: vp-orb 18s ease-in-out infinite reverse; }

/* ── animations ── */
@keyframes vp-up       { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes vp-in       { from{opacity:0} to{opacity:1} }
@keyframes vp-shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vp-pulse    { 0%{transform:scale(.9);opacity:.8} 70%{transform:scale(1.3);opacity:0} 100%{transform:scale(.9);opacity:0} }
@keyframes vp-dot      { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vp-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes vp-tick     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vp-checkIn  { from{transform:scale(0) rotate(-45deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
@keyframes vp-rowIn    { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }

/* ── container ── */
.vp-inner {
  position: relative; z-index: 10;
  max-width: 1160px; margin: 0 auto;
  padding: 48px 20px 64px;
}

/* ── page header ── */
.vp-header { text-align: center; margin-bottom: 52px; opacity: 0; animation: vp-up .7s ease .1s forwards; }

.vp-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vp-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vp-dot 1.8s ease-in-out infinite; }

.vp-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 300; line-height: 1.08; color: #1A1208;
  margin-bottom: 16px;
}
.vp-h1 em     { font-style: italic; color: #FF6B00; }
.vp-h1 strong { font-weight: 600; }

.vp-lead {
  font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62);
  max-width: 520px; margin: 0 auto;
}
.vp-lead strong { color: #1A1208; font-weight: 600; }

/* ── tagline strip ── */
.vp-tagline-strip {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, #FF6B00, #FF8C35);
  color: #fff; border-radius: 12px; padding: 9px 20px;
  font-size: 13px; font-weight: 600; letter-spacing: .02em;
  margin-bottom: 20px;
}

/* ════════════════════════════════════════════
   MAIN PRICING CARD
════════════════════════════════════════════ */
.vp-plan-wrap {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  opacity: 0; animation: vp-up .8s ease .25s forwards;
}

@media (min-width: 900px) {
  .vp-plan-wrap { grid-template-columns: 1.1fr 0.9fr; align-items: start; gap: 28px; }
}

/* ── main card ── */
.vp-card {
  background: #fff;
  border-radius: 28px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 16px 56px rgba(0,0,0,.08);
  overflow: hidden;
  position: relative;
}
.vp-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
}

/* card top */
.vp-card-top {
  padding: 36px 36px 28px;
  background: linear-gradient(160deg, #FFF4ED 0%, #fff8f0 100%);
  border-bottom: 1px solid rgba(255,107,0,.1);
  position: relative;
}

.vp-plan-label {
  font-size: 11px; font-weight: 600; letter-spacing: .08em;
  text-transform: uppercase; color: #FF6B00; margin-bottom: 14px;
  display: flex; align-items: center; gap: 8px;
}
.vp-plan-badge {
  background: #FF6B00; color: #fff; border-radius: 100px;
  padding: 2px 10px; font-size: 9px; font-weight: 700; letter-spacing: .06em;
}

.vp-price-row {
  display: flex; align-items: baseline; gap: 10px; margin-bottom: 6px;
}
.vp-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(52px, 8vw, 80px);
  font-weight: 600; color: #1A1208; line-height: 1;
}
.vp-price-currency {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 300; color: #FF6B00; align-self: flex-start; margin-top: 10px;
}
.vp-price-meta {
  display: flex; flex-direction: column;
}
.vp-price-type {
  font-size: 13px; font-weight: 600; color: #1A1208;
}
.vp-price-note {
  font-size: 11px; color: rgba(26,18,8,.5); margin-top: 2px;
}

.vp-price-sub {
  font-size: 13px; color: rgba(26,18,8,.6); margin-bottom: 24px; line-height: 1.6;
}
.vp-price-sub strong { color: #1A1208; }

/* CTA */
.vp-cta {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 16px 28px; border-radius: 100px;
  background: #FF6B00; color: #fff;
  font-size: 15px; font-weight: 600; text-decoration: none;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(255,107,0,.38);
  transition: background .25s, transform .2s, box-shadow .25s;
}
.vp-cta::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  background-size: 400px 100%; animation: vp-shimmer 2.5s linear infinite;
}
.vp-cta:hover { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,107,0,.45); }

.vp-cta-note {
  text-align: center; margin-top: 12px;
  font-size: 12px; color: rgba(26,18,8,.45);
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.vp-lock { font-size: 13px; }

/* pulse ring on price */
.vp-price-ring {
  position: absolute; top: 32px; right: 32px;
  width: 72px; height: 72px; border-radius: 50%;
  border: 2px solid rgba(255,107,0,.3);
  animation: vp-pulse 3s ease-out infinite;
}
.vp-price-ring2 {
  position: absolute; top: 32px; right: 32px;
  width: 72px; height: 72px; border-radius: 50%;
  background: #FFF4ED;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
}

/* ── features list ── */
.vp-card-body { padding: 28px 36px 32px; }

.vp-features-title {
  font-size: 11px; font-weight: 600; letter-spacing: .08em;
  text-transform: uppercase; color: rgba(26,18,8,.45);
  margin-bottom: 18px;
}

.vp-feat-list { display: flex; flex-direction: column; gap: 2px; }

.vp-feat-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 12px;
  transition: background .18s;
  opacity: 0;
}
.vp-feat-row:hover { background: #FFF4ED; }

/* staggered animation */
.vp-feat-row:nth-child(1)  { animation: vp-rowIn .5s ease .4s  forwards; }
.vp-feat-row:nth-child(2)  { animation: vp-rowIn .5s ease .5s  forwards; }
.vp-feat-row:nth-child(3)  { animation: vp-rowIn .5s ease .6s  forwards; }
.vp-feat-row:nth-child(4)  { animation: vp-rowIn .5s ease .7s  forwards; }
.vp-feat-row:nth-child(5)  { animation: vp-rowIn .5s ease .8s  forwards; }
.vp-feat-row:nth-child(6)  { animation: vp-rowIn .5s ease .9s  forwards; }
.vp-feat-row:nth-child(7)  { animation: vp-rowIn .5s ease 1.0s forwards; }
.vp-feat-row:nth-child(8)  { animation: vp-rowIn .5s ease 1.1s forwards; }

.vp-feat-icon-wrap {
  width: 36px; height: 36px; border-radius: 10px;
  background: #FFF4ED; display: flex; align-items: center;
  justify-content: center; font-size: 17px; flex-shrink: 0;
  transition: background .2s, transform .2s;
}
.vp-feat-row:hover .vp-feat-icon-wrap { background: rgba(255,107,0,.15); transform: scale(1.08); }

.vp-feat-check {
  width: 20px; height: 20px; border-radius: 50%;
  background: #dcfce7; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-left: auto;
  font-size: 11px; color: #15803d;
}

.vp-feat-info { flex: 1; }
.vp-feat-name { font-size: 13.5px; font-weight: 500; color: #1A1208; }
.vp-feat-sub  { font-size: 11.5px; color: rgba(26,18,8,.5); margin-top: 1px; }

.vp-feat-separator {
  height: 1px; background: rgba(255,107,0,.08);
  margin: 4px 12px;
}

/* ════════════════════════════════════════════
   RIGHT SIDE — visual / trust / FAQ
════════════════════════════════════════════ */
.vp-right { display: flex; flex-direction: column; gap: 20px; }

/* trust card */
.vp-trust {
  background: #fff; border-radius: 24px;
  border: 1px solid rgba(255,107,0,.12);
  box-shadow: 0 2px 12px rgba(0,0,0,.05);
  padding: 24px 26px;
  opacity: 0; animation: vp-up .8s ease .35s forwards;
}
.vp-trust-title {
  font-size: 13px; font-weight: 600; color: #1A1208; margin-bottom: 16px;
  display: flex; align-items: center; gap: 8px;
}
.vp-trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.vp-trust-item {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  background: #FDFAF6; border-radius: 14px; padding: 14px 10px;
  border: 1px solid rgba(255,107,0,.08);
  transition: border-color .2s, transform .2s;
}
.vp-trust-item:hover { border-color: rgba(255,107,0,.3); transform: translateY(-2px); }
.vp-trust-num  { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; color: #FF6B00; line-height: 1; }
.vp-trust-label { font-size: 11px; color: rgba(26,18,8,.55); margin-top: 3px; }

/* comparison note */
.vp-compare {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  border-radius: 24px; padding: 24px 26px;
  opacity: 0; animation: vp-up .8s ease .45s forwards;
}
.vp-compare-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 14px; }
.vp-compare-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.08);
  font-size: 12.5px;
}
.vp-compare-row:last-child { border-bottom: none; }
.vp-compare-label { color: rgba(255,255,255,.7); }
.vp-compare-val   { font-weight: 600; }
.vp-compare-val.good { color: #86efac; }
.vp-compare-val.meh  { color: rgba(255,255,255,.4); text-decoration: line-through; }

/* FAQ mini */
.vp-faq {
  background: #fff; border-radius: 24px;
  border: 1px solid rgba(255,107,0,.12);
  padding: 24px 26px;
  opacity: 0; animation: vp-up .8s ease .55s forwards;
}
.vp-faq-title { font-size: 13px; font-weight: 600; color: #1A1208; margin-bottom: 14px; }
.vp-faq-item  { padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,.05); }
.vp-faq-item:last-child { border-bottom: none; }
.vp-faq-q { font-size: 12.5px; font-weight: 600; color: #1A1208; margin-bottom: 4px; }
.vp-faq-a { font-size: 12px; color: rgba(26,18,8,.6); line-height: 1.6; }

/* ── guarantee bar ── */
.vp-guarantee {
  display: flex; align-items: center; justify-content: center; gap: 32px;
  flex-wrap: wrap;
  background: #fff; border-radius: 20px;
  border: 1px solid rgba(255,107,0,.1);
  padding: 20px 28px; margin-top: 36px;
  opacity: 0; animation: vp-up .8s ease .6s forwards;
}
.vp-guar-item { display: flex; align-items: center; gap: 10px; }
.vp-guar-icon { font-size: 22px; }
.vp-guar-text { font-size: 12.5px; font-weight: 500; color: rgba(26,18,8,.7); }
.vp-guar-text strong { color: #1A1208; display: block; font-size: 13px; }
.vp-guar-div { width: 1px; height: 32px; background: rgba(26,18,8,.1); }

/* ── ticker ── */
.vp-ticker     { overflow: hidden; background: #FF6B00; padding: 10px 0; }
.vp-ti-inner   { display: flex; width: max-content; animation: vp-tick 24s linear infinite; }
.vp-ti         { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vp-tdot       { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ═══════════════ RESPONSIVE ═══════════════ */
@media (max-width: 639px) {
  .vp-inner { padding: 32px 16px 48px; }
  .vp-card-top  { padding: 24px 22px 20px; }
  .vp-card-body { padding: 20px 22px 24px; }
  .vp-price { font-size: 56px; }
  .vp-trust-grid { grid-template-columns: 1fr 1fr; }
  .vp-guarantee { gap: 16px; padding: 16px 20px; }
  .vp-guar-div { display: none; }
  .vp-compare-row { flex-direction: column; align-items: flex-start; gap: 2px; }
}

@media (min-width: 640px) and (max-width: 899px) {
  .vp-inner { padding: 40px 28px 56px; }
}
`

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '💌',
    name: 'Invitații digitale nelimitate',
    sub: 'Link personalizat pentru fiecare invitat, distribuit instant',
  },
  {
    icon: '✅',
    name: 'RSVP online + listă invitați',
    sub: 'Confirmări în timp real, status acceptat / refuzat / așteptare',
  },
  {
    icon: '🍽️',
    name: 'Meniu nuntă cu cod QR',
    sub: 'Invitații scanează meniul direct de pe telefon, la masă',
  },
  {
    icon: '📷',
    name: 'Upload poze de către invitați',
    sub: 'Colectare live în timpul nunții, botezului sau petrecerii',
  },
  {
    icon: '🗂️',
    name: 'Organizare poze pe momente',
    sub: 'Sortare automată: cununie, cocktail, cină, dans, tort…',
  },
  {
    icon: '📊',
    name: 'Export Excel invitați',
    sub: 'Acceptat / refuzat / observații — descărcat cu un click',
  },
  {
    icon: '🗺️',
    name: 'Hărți GPS integrate',
    sub: 'Trasee exacte către biserică, restaurant și locații secundare',
  },
  {
    icon: '📱',
    name: 'Optimizat mobile & desktop',
    sub: 'Experiență perfectă pe orice dispozitiv, indiferent de browser',
  },
]

const COMPARE = [
  { label: 'Invitații tipărite (500 buc)', vibeVal: '300 lei', oldVal: '1.500+ lei', good: false },
  { label: 'Platești o singură dată', vibeVal: 'Da', oldVal: 'Abonament lunar', good: true },
  { label: 'RSVP online inclus', vibeVal: 'Da', oldVal: 'Extra cost', good: true },
  { label: 'Upload poze invitați', vibeVal: 'Da', oldVal: 'Nu există', good: true },
  { label: 'Export Excel invitați', vibeVal: 'Da', oldVal: 'Manual / imposibil', good: true },
]

const FAQ = [
  {
    q: 'Este cu adevărat o singură plată?',
    a: 'Da. Plătești 300 lei o singură dată și ai acces la toate funcțiile pentru evenimentul tău, fără abonament lunar sau costuri ascunse.',
  },
  {
    q: 'Câți invitați pot trimite?',
    a: 'Nelimitat. Poți trimite linkul invitației la oricâți invitați dorești, fără nicio restricție.',
  },
  {
    q: 'Cât timp am acces la platformă?',
    a: 'Ai acces 12 luni de la activare — suficient pentru pregătire, eveniment și descărcarea pozelor după.',
  },
  {
    q: 'Pot modifica invitația după ce am trimis-o?',
    a: 'Da, poți edita oricând textul, ora, locația sau imaginile. Modificările se actualizează instant pentru toți invitații.',
  },
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

const GUARANTEE = [
  { icon: '🔒', strong: 'Plată securizată', text: 'Procesator certificat PCI DSS' },
  { icon: '♾️', strong: 'Invitați nelimitați', text: 'Fără restricții de număr' },
  { icon: '⚡', strong: 'Activare instant', text: 'Disponibil imediat după plată' },
  { icon: '🛠️', strong: 'Suport inclus', text: 'Echipă disponibilă pe email & WhatsApp' },
]

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function PricingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'VibeInvite — Pachet All-in-One Nuntă',
            description:
              'Invitații digitale nelimitate, meniu QR, upload poze invitați, organizare momente, export Excel. 300 lei, plată unică.',
            offers: {
              '@type': 'Offer',
              price: '300',
              priceCurrency: 'RON',
              priceValidUntil: '2026-12-31',
              availability: 'https://schema.org/InStock',
              url: 'https://vibeinvite.ro/preturi',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1240',
            },
          }),
        }}
      />

      <div className="vp-page">
        {/* bg orbs */}
        <div className="vp-orb vp-o1" aria-hidden="true" />
        <div className="vp-orb vp-o2" aria-hidden="true" />

        {/* ── ticker top ── */}
        <div className="vp-ticker" aria-hidden="true">
          <div className="vp-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vp-ti">
                {t}<span className="vp-tdot" />
              </div>
            ))}
          </div>
        </div>

        <div className="vp-inner">

          {/* ── PAGE HEADER ── */}
          <header className="vp-header">
            <p className="vp-tagline-strip" aria-label="Un singur pachet, tot ce ai nevoie pentru nuntă">
              🎊 Un singur pachet — tot ce ai nevoie pentru nuntă
            </p>

            <p className="vp-super">
              <span className="vp-sdot" aria-hidden="true" />
              Prețuri transparente · Fără surprize
            </p>

            <h1 className="vp-h1">
              Tot ce ai nevoie, <em>într-un singur</em>{' '}
              <strong>pachet</strong>
            </h1>

            <p className="vp-lead">
              <strong>300 lei, o singură dată.</strong> Invitații digitale nelimitate, meniu cu QR, upload poze invitați,
              organizare momente și export Excel — fără abonament, fără costuri ascunse.
            </p>
          </header>

          {/* ── MAIN LAYOUT ── */}
          <div className="vp-plan-wrap">

            {/* LEFT — pricing card */}
            <div className="vp-card" role="main" aria-label="Detalii pachet VibeInvite">

              {/* card top — price */}
              <div className="vp-card-top">
                <div className="vp-price-ring2" aria-hidden="true">🎊</div>
                <div className="vp-price-ring" aria-hidden="true" />

                <p className="vp-plan-label">
                  Pachet All-in-One
                  <span className="vp-plan-badge">RECOMANDAT</span>
                </p>

                <div className="vp-price-row">
                  <span className="vp-price-currency" aria-hidden="true">RON</span>
                  <span className="vp-price">300</span>
                  <div className="vp-price-meta">
                    <span className="vp-price-type">Plată unică</span>
                    <span className="vp-price-note">Fără abonament lunar</span>
                  </div>
                </div>

                <p className="vp-price-sub">
                  Activare <strong>instant</strong> după plată · Acces <strong>12 luni</strong> ·{' '}
                  Invitați <strong>nelimitați</strong>
                </p>

                <Link href="/checkout" className="vp-cta">
                  <span aria-hidden="true">✨</span>
                  Cumpără Pachetul — 300 Lei
                </Link>

                <p className="vp-cta-note">
                  <span className="vp-lock" aria-hidden="true">🔒</span>
                  Plată securizată · Activare instant · Fără abonament
                </p>
              </div>

              {/* card body — features */}
              <div className="vp-card-body">
                <p className="vp-features-title">Ce include pachetul</p>

                <ul className="vp-feat-list" aria-label="Funcționalități incluse în pachet">
                  {FEATURES.map((f, i) => (
                    <>
                      <li key={f.name} className="vp-feat-row">
                        <div className="vp-feat-icon-wrap" aria-hidden="true">{f.icon}</div>
                        <div className="vp-feat-info">
                          <p className="vp-feat-name">{f.name}</p>
                          <p className="vp-feat-sub">{f.sub}</p>
                        </div>
                        <div className="vp-feat-check" aria-label="Inclus">✓</div>
                      </li>
                      {i < FEATURES.length - 1 && (
                        <li key={`sep-${i}`} className="vp-feat-separator" aria-hidden="true" />
                      )}
                    </>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT — trust + compare + faq */}
            <div className="vp-right">

              {/* trust stats */}
              <div className="vp-trust">
                <p className="vp-trust-title">
                  <span aria-hidden="true">⭐</span>
                  De ce aleg VibeInvite
                </p>
                <div className="vp-trust-grid">
                  {[
                    { num: '12K+', label: 'Invitații create' },
                    { num: '98%',  label: 'Clienți mulțumiți' },
                    { num: '3 min', label: 'Timp de setup' },
                    { num: '4.9★', label: 'Rating mediu' },
                  ].map((t) => (
                    <div key={t.label} className="vp-trust-item">
                      <span className="vp-trust-num">{t.num}</span>
                      <span className="vp-trust-label">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* comparison */}
              <div className="vp-compare" aria-label="Comparație VibeInvite vs alternativele clasice">
                <p className="vp-compare-title">VibeInvite vs. alternativele clasice</p>
                {COMPARE.map((row) => (
                  <div key={row.label} className="vp-compare-row">
                    <span className="vp-compare-label">{row.label}</span>
                    <span className={`vp-compare-val ${row.good ? 'good' : ''}`}>{row.vibeVal}</span>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="vp-faq" aria-label="Întrebări frecvente despre prețuri">
                <p className="vp-faq-title">Întrebări frecvente</p>
                {FAQ.map((item) => (
                  <div key={item.q} className="vp-faq-item">
                    <p className="vp-faq-q">{item.q}</p>
                    <p className="vp-faq-a">{item.a}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── GUARANTEE BAR ── */}
          <div className="vp-guarantee" aria-label="Garanții incluse">
            {GUARANTEE.map((g, i) => (
              <>
                <div key={g.strong} className="vp-guar-item">
                  <span className="vp-guar-icon" aria-hidden="true">{g.icon}</span>
                  <span className="vp-guar-text">
                    <strong>{g.strong}</strong>
                    {g.text}
                  </span>
                </div>
                {i < GUARANTEE.length - 1 && (
                  <div key={`gdiv-${i}`} className="vp-guar-div" aria-hidden="true" />
                )}
              </>
            ))}
          </div>

        </div>

        {/* ── ticker bottom ── */}
        <div className="vp-ticker" aria-hidden="true">
          <div className="vp-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vp-ti">
                {t}<span className="vp-tdot" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
