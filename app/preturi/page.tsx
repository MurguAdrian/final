const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.pp {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ─── orbs ─── */
@keyframes pp-orb { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(30px,-22px) scale(1.06)} 70%{transform:translate(-16px,16px) scale(.95)} }
.pp-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; filter:blur(90px); }
.pp-o1 { width:560px; height:560px; background:radial-gradient(circle,rgba(255,107,0,.13) 0%,transparent 70%); top:-120px; right:-100px; animation:pp-orb 16s ease-in-out infinite; }
.pp-o2 { width:380px; height:380px; background:radial-gradient(circle,rgba(255,107,0,.08) 0%,transparent 70%); bottom:40px; left:-80px; animation:pp-orb 20s ease-in-out infinite reverse; }

/* ─── ticker ─── */
@keyframes pp-tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.pp-ticker { background:#FF6B00; padding:10px 0; overflow:hidden; position:relative; z-index:10; }
.pp-ticker-inner { display:flex; width:max-content; animation:pp-tick 26s linear infinite; }
.pp-ti { display:flex; align-items:center; gap:10px; padding:0 30px; color:#fff; font-size:12px; font-weight:500; white-space:nowrap; letter-spacing:.05em; }
.pp-tdot { width:4px; height:4px; background:rgba(255,255,255,.45); border-radius:50%; }

/* ─── animations ─── */
@keyframes pp-up   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes pp-in   { from{opacity:0} to{opacity:1} }
@keyframes pp-shine { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
@keyframes pp-dot  { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes pp-pulse { 0%{transform:scale(.85);opacity:.7} 70%{transform:scale(1.35);opacity:0} 100%{opacity:0} }
@keyframes pp-row  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

/* ─── layout ─── */
.pp-inner {
  position:relative; z-index:10;
  max-width:1200px; margin:0 auto;
  padding:56px 24px 72px;
}

/* ══════════════════════════════
   HERO
══════════════════════════════ */
.pp-hero {
  display:grid;
  grid-template-columns:1fr;
  gap:32px;
  margin-bottom:64px;
  opacity:0; animation:pp-up .7s ease .1s forwards;
}
@media(min-width:960px) {
  .pp-hero { grid-template-columns:1fr 1fr; align-items:center; gap:48px; }
}

/* hero left */
.pp-hero-left { display:flex; flex-direction:column; gap:20px; }

.pp-eyebrow {
  display:inline-flex; align-items:center; gap:8px;
  background:#FFF4ED; border:1px solid rgba(255,107,0,.3); border-radius:100px;
  padding:6px 16px 6px 10px; font-size:11px; font-weight:600; letter-spacing:.07em;
  text-transform:uppercase; color:#FF6B00; width:fit-content;
}
.pp-edot { width:7px; height:7px; background:#FF6B00; border-radius:50%; animation:pp-dot 1.8s ease-in-out infinite; }

.pp-h1 {
  font-family:'Cormorant Garamond', serif;
  font-size:clamp(36px,5.5vw,64px);
  font-weight:300; line-height:1.06; color:#1A1208;
}
.pp-h1 em { font-style:italic; color:#FF6B00; }
.pp-h1 strong { font-weight:600; }

.pp-hero-sub {
  font-size:15px; line-height:1.75; color:rgba(26,18,8,.65);
  max-width:440px;
}
.pp-hero-sub strong { color:#1A1208; font-weight:600; }

/* hero right — price block */
.pp-price-block {
  background:#fff;
  border-radius:32px;
  border:1px solid rgba(255,107,0,.15);
  box-shadow:0 2px 12px rgba(0,0,0,.04), 0 24px 64px rgba(0,0,0,.09);
  overflow:hidden;
  position:relative;
}
.pp-price-block::before {
  content:''; position:absolute; top:0; left:0; right:0; height:4px;
  background:linear-gradient(90deg,#FF6B00,#FF8C35,#FF6B00);
}

.pp-price-top {
  padding:36px 36px 28px;
  background:linear-gradient(150deg,#FFF4ED 0%,#fffaf5 100%);
  position:relative;
}

.pp-plan-label {
  font-size:11px; font-weight:700; letter-spacing:.09em;
  text-transform:uppercase; color:#FF6B00;
  display:flex; align-items:center; gap:10px; margin-bottom:18px;
}
.pp-plan-badge {
  background:#FF6B00; color:#fff; border-radius:100px;
  padding:3px 12px; font-size:9px; font-weight:800; letter-spacing:.07em;
}

.pp-price-row { display:flex; align-items:baseline; gap:8px; margin-bottom:10px; }
.pp-curr { font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:300; color:#FF6B00; margin-top:10px; }
.pp-amount { font-family:'Cormorant Garamond',serif; font-size:clamp(60px,9vw,88px); font-weight:600; color:#1A1208; line-height:1; }
.pp-price-aside { display:flex; flex-direction:column; gap:3px; }
.pp-price-type { font-size:14px; font-weight:600; color:#1A1208; }
.pp-price-note { font-size:11px; color:rgba(26,18,8,.5); }

.pp-price-pills {
  display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;
}
.pp-pill {
  display:inline-flex; align-items:center; gap:5px;
  background:#fff; border:1px solid rgba(255,107,0,.2); border-radius:100px;
  padding:5px 12px; font-size:11.5px; font-weight:500; color:#1A1208;
}
.pp-pill span { color:#FF6B00; font-size:13px; }

/* CTA */
.pp-cta {
  display:inline-flex; align-items:center; justify-content:center; gap:10px;
  width:100%; padding:17px 28px; border-radius:100px;
  background:#FF6B00; color:#fff;
  font-size:15px; font-weight:600; text-decoration:none;
  position:relative; overflow:hidden;
  box-shadow:0 10px 32px rgba(255,107,0,.42);
  transition:background .25s, transform .2s, box-shadow .25s;
}
.pp-cta::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  background-size:500px 100%; animation:pp-shine 2.6s linear infinite;
}
.pp-cta:hover { background:#e85e00; transform:translateY(-2px); box-shadow:0 16px 44px rgba(255,107,0,.48); }

.pp-cta-note {
  text-align:center; margin-top:11px;
  font-size:12px; color:rgba(26,18,8,.45);
  display:flex; align-items:center; justify-content:center; gap:6px;
}

/* ring pulse */
.pp-ring-wrap { position:absolute; top:28px; right:28px; width:68px; height:68px; }
.pp-ring { position:absolute; inset:0; border-radius:50%; border:2px solid rgba(255,107,0,.35); animation:pp-pulse 3s ease-out infinite; }
.pp-ring-inner { position:absolute; inset:0; border-radius:50%; background:#FFF4ED; display:flex; align-items:center; justify-content:center; font-size:26px; }

/* ══════════════════════════════
   WHAT YOU GET — main section
══════════════════════════════ */
.pp-section-label {
  font-size:11px; font-weight:700; letter-spacing:.09em;
  text-transform:uppercase; color:rgba(26,18,8,.4);
  margin-bottom:12px;
}

.pp-section-h2 {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(28px,4vw,44px);
  font-weight:300; line-height:1.1; color:#1A1208;
  margin-bottom:8px;
}
.pp-section-h2 em { font-style:italic; color:#FF6B00; }

.pp-section-sub {
  font-size:14px; color:rgba(26,18,8,.6); line-height:1.7;
  margin-bottom:36px; max-width:560px;
}

/* feature grid */
.pp-feat-grid {
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
  margin-bottom:56px;
  opacity:0; animation:pp-up .8s ease .3s forwards;
}
@media(min-width:640px) { .pp-feat-grid { grid-template-columns:1fr 1fr; } }
@media(min-width:1024px) { .pp-feat-grid { grid-template-columns:1fr 1fr 1fr; } }

.pp-feat-card {
  background:#fff;
  border:1px solid rgba(255,107,0,.1);
  border-radius:20px;
  padding:22px 22px 20px;
  display:flex; flex-direction:column; gap:12px;
  transition:border-color .2s, transform .2s, box-shadow .2s;
  position:relative; overflow:hidden;
}
.pp-feat-card::before {
  content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg,#FF6B00,#FF8C35);
  transform:scaleX(0); transform-origin:left;
  transition:transform .3s;
}
.pp-feat-card:hover { border-color:rgba(255,107,0,.3); transform:translateY(-3px); box-shadow:0 8px 32px rgba(255,107,0,.1); }
.pp-feat-card:hover::before { transform:scaleX(1); }

.pp-feat-icon {
  width:44px; height:44px; border-radius:12px;
  background:#FFF4ED; display:flex; align-items:center; justify-content:center;
  font-size:20px; flex-shrink:0;
  transition:background .2s, transform .2s;
}
.pp-feat-card:hover .pp-feat-icon { background:rgba(255,107,0,.15); transform:scale(1.08); }

.pp-feat-name {
  font-size:14px; font-weight:600; color:#1A1208; line-height:1.3;
}
.pp-feat-desc {
  font-size:12.5px; color:rgba(26,18,8,.55); line-height:1.65; flex:1;
}

/* sub-items inside card */
.pp-feat-tags {
  display:flex; flex-wrap:wrap; gap:5px; margin-top:4px;
}
.pp-feat-tag {
  display:inline-flex; align-items:center; gap:4px;
  background:#F5F0E8; border-radius:100px;
  padding:3px 10px; font-size:11px; font-weight:500; color:#1A1208;
}
.pp-feat-tag-dot { width:5px; height:5px; background:#FF6B00; border-radius:50%; }

/* ══════════════════════════════
   COMPARISON + TRUST ROW
══════════════════════════════ */
.pp-bottom-grid {
  display:grid;
  grid-template-columns:1fr;
  gap:20px;
  margin-bottom:48px;
  opacity:0; animation:pp-up .8s ease .45s forwards;
}
@media(min-width:760px) {
  .pp-bottom-grid { grid-template-columns:1.15fr 1fr; align-items:start; }
}

/* compare card */
.pp-compare {
  background:linear-gradient(140deg,#1A1208 0%,#2b1d0d 100%);
  border-radius:24px; padding:28px 28px 24px;
}
.pp-compare-h { font-size:15px; font-weight:600; color:#fff; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
.pp-compare-sub { font-size:11.5px; color:rgba(255,255,255,.45); font-weight:400; }

.pp-compare-table { display:flex; flex-direction:column; gap:0; }
.pp-compare-row {
  display:grid;
  grid-template-columns:1fr auto auto;
  gap:12px; align-items:center;
  padding:11px 0;
  border-bottom:1px solid rgba(255,255,255,.07);
  font-size:12.5px;
}
.pp-compare-row:last-child { border-bottom:none; }
.pp-compare-lbl { color:rgba(255,255,255,.65); }
.pp-compare-vibe { font-weight:700; color:#86efac; text-align:right; }
.pp-compare-old { font-size:11.5px; color:rgba(255,255,255,.3); text-align:right; text-decoration:line-through; }

.pp-compare-hdr {
  display:grid; grid-template-columns:1fr auto auto;
  gap:12px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,.12);
}
.pp-compare-hdr-lbl { font-size:10px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.35); }
.pp-compare-hdr-vibe { font-size:10px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#FF8C35; text-align:right; }
.pp-compare-hdr-old { font-size:10px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.25); text-align:right; }

/* trust stats */
.pp-trust {
  background:#fff;
  border:1px solid rgba(255,107,0,.12);
  border-radius:24px;
  padding:28px 26px;
  display:flex; flex-direction:column; gap:20px;
}
.pp-trust-h { font-size:15px; font-weight:600; color:#1A1208; display:flex; align-items:center; gap:8px; }

.pp-stats { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.pp-stat {
  background:#FDFAF6; border:1px solid rgba(255,107,0,.1);
  border-radius:16px; padding:16px 14px; text-align:center;
  transition:border-color .2s, transform .2s;
}
.pp-stat:hover { border-color:rgba(255,107,0,.3); transform:translateY(-2px); }
.pp-stat-num { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:600; color:#FF6B00; line-height:1; }
.pp-stat-lbl { font-size:11px; color:rgba(26,18,8,.5); margin-top:4px; }

/* faq mini inside trust */
.pp-faq { display:flex; flex-direction:column; gap:0; }
.pp-faq-item { padding:12px 0; border-bottom:1px solid rgba(0,0,0,.06); }
.pp-faq-item:last-child { border-bottom:none; padding-bottom:0; }
.pp-faq-q { font-size:12.5px; font-weight:600; color:#1A1208; margin-bottom:4px; }
.pp-faq-a { font-size:12px; color:rgba(26,18,8,.6); line-height:1.65; }

/* ══════════════════════════════
   GUARANTEE BAR
══════════════════════════════ */
.pp-guarantee {
  display:flex; align-items:center; justify-content:center;
  flex-wrap:wrap; gap:24px;
  background:#fff; border:1px solid rgba(255,107,0,.1);
  border-radius:20px; padding:22px 28px;
  margin-bottom:56px;
  opacity:0; animation:pp-up .8s ease .55s forwards;
}
.pp-guar-item { display:flex; align-items:center; gap:10px; }
.pp-guar-icon { font-size:22px; }
.pp-guar-text { font-size:12.5px; font-weight:500; color:rgba(26,18,8,.65); }
.pp-guar-text strong { display:block; font-size:13px; color:#1A1208; }
.pp-guar-div { width:1px; height:32px; background:rgba(26,18,8,.1); }
@media(max-width:520px) { .pp-guar-div { display:none; } .pp-guarantee { gap:16px; } }

/* ══════════════════════════════
   BOTTOM CTA STRIP
══════════════════════════════ */
.pp-cta-strip {
  background:linear-gradient(135deg,#FF6B00,#FF8C35);
  border-radius:28px; padding:44px 36px;
  text-align:center;
  opacity:0; animation:pp-up .8s ease .65s forwards;
}
.pp-cta-strip-h {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(28px,4.5vw,48px);
  font-weight:300; color:#fff; line-height:1.1; margin-bottom:10px;
}
.pp-cta-strip-h strong { font-weight:600; }
.pp-cta-strip-sub { font-size:14px; color:rgba(255,255,255,.8); margin-bottom:28px; }
.pp-cta-strip-btn {
  display:inline-flex; align-items:center; gap:10px;
  background:#fff; color:#FF6B00;
  padding:16px 36px; border-radius:100px;
  font-size:15px; font-weight:700; text-decoration:none;
  box-shadow:0 8px 28px rgba(0,0,0,.15);
  transition:transform .2s, box-shadow .2s;
}
.pp-cta-strip-btn:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(0,0,0,.2); }
.pp-cta-strip-note { margin-top:14px; font-size:12px; color:rgba(255,255,255,.65); }

/* ═══════════ responsive padding ═══════════ */
@media(max-width:640px) {
  .pp-inner { padding:32px 16px 48px; }
  .pp-price-top { padding:24px 22px 20px; }
  .pp-compare { padding:22px 18px 20px; }
  .pp-trust { padding:22px 20px; }
  .pp-cta-strip { padding:32px 22px; }
  .pp-price-row { flex-wrap:wrap; }
}
`

const TICKER = [
  '💌 Invitații Nelimitate',
  '📷 Album Foto 25 GB',
  '🍽️ Meniu Inclus',
  '✅ RSVP Instant',
  '📊 Export Excel',
  '🗺️ GPS Integrat',
  '🗂️ Organizare Momente',
  '💸 300 Lei · Plată Unică',
]

const FEATURES = [
  {
    icon: '💌',
    name: 'Invitații online nelimitate',
    desc: 'Trimite la oricâți invitați, fără restricții. Fiecare primește un link unic personalizat.',
    tags: ['vibeinvite.ro/andreea-adrian', 'Link unic per invitat'],
  },
  {
    icon: '📷',
    name: 'Album foto 25 GB',
    desc: 'Invitații încarcă poze direct din invitație. Tu și partenerul vedeți totul în timp real.',
    tags: ['25 GB spațiu', 'Organizare pe momente'],
  },
  {
    icon: '🍽️',
    name: 'Meniu personalizat în invitație',
    desc: 'Adaugi meniul nunții direct în invitație. Invitații îl văd de pe telefon, la masă.',
    tags: ['Meniu complet', 'Fără QR separat'],
  },
  {
    icon: '🗺️',
    name: 'Locații integrate cu GPS',
    desc: 'Trasee exacte configurate în invitație, disponibile cu un singur tap.',
    tags: ['Waze restaurant', 'Google Maps restaurant', 'Waze biserică', 'Google Maps biserică'],
  },
  {
    icon: '⏳',
    name: 'Countdown live',
    desc: 'Numărator activ până la eveniment, vizibil de toți invitații direct în invitație.',
    tags: ['Actualizare automată'],
  },
  {
    icon: '✅',
    name: 'RSVP + centralizator detaliat',
    desc: 'Colectezi confirmare + nevoi logistice pentru fiecare invitat.',
    tags: ['Transport necesar', 'Cazare necesară', 'Status fiecare invitat'],
  },
  {
    icon: '📊',
    name: 'Dashboard + statistici',
    desc: 'Câți au deschis invitația, câți au confirmat, câți au nevoie de transport sau cazare.',
    tags: ['Statistici în timp real', 'Export Excel 1-click'],
  },
  {
    icon: '✏️',
    name: 'Editare nelimitată',
    desc: 'Modifici oricând textul, ora, locația sau imaginile. Toți invitații văd imediat.',
    tags: ['Fără blocare', 'Update instant'],
  },
]

const COMPARE = [
  { lbl: 'Cost total', vibe: '300 lei', old: '1.500+ lei' },
  { lbl: 'Invitații trimise', vibe: 'Nelimitat', old: 'Fix (tipărite)' },
  { lbl: 'RSVP + logistică', vibe: 'Inclus', old: 'Imposibil' },
  { lbl: 'Album foto invitați', vibe: '25 GB inclus', old: 'Nu există' },
  { lbl: 'Export Excel', vibe: 'Inclus', old: 'Manual / imposibil' },
  { lbl: 'Editare după trimitere', vibe: 'Nelimitată', old: 'Imposibil' },
]

const FAQ = [
  {
    q: 'Este cu adevărat o singură plată?',
    a: '300 lei, o dată. Fără abonament lunar, fără costuri ascunse, fără surprize.',
  },
  {
    q: 'Câți invitați pot trimite?',
    a: 'Nelimitat. Poți trimite linkul la oricâți dorești.',
  },
  {
    q: 'Cât timp am acces?',
    a: '12 luni de la activare — suficient pentru pregătire, eveniment și descărcat pozele.',
  },
  {
    q: 'Pot modifica invitația după trimitere?',
    a: 'Da, oricând. Modificările apar instant pentru toți invitații.',
  },
]

const GUARANTEE = [
  { icon: '🔒', strong: 'Plată securizată', text: 'Procesator certificat PCI DSS' },
  { icon: '♾️', strong: 'Invitați nelimitați', text: 'Fără restricții de număr' },
  { icon: '⚡', strong: 'Activare instant', text: 'Disponibil imediat după plată' },
  { icon: '🛠️', strong: 'Suport inclus', text: 'Email & WhatsApp' },
]

import Link from 'next/link'

export default function PreturiPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pp">
        <div className="pp-orb pp-o1" aria-hidden />
        <div className="pp-orb pp-o2" aria-hidden />

        {/* Ticker top */}
        <div className="pp-ticker" aria-hidden>
          <div className="pp-ticker-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="pp-ti">{t}<span className="pp-tdot" /></div>
            ))}
          </div>
        </div>

        <div className="pp-inner">

          {/* ── HERO ── */}
          <section className="pp-hero" aria-label="Pachet și preț">
            <div className="pp-hero-left">
              <p className="pp-eyebrow">
                <span className="pp-edot" aria-hidden />
                Prețuri transparente · Fără surprize
              </p>

              <h1 className="pp-h1">
                Tot ce ai nevoie<br />
                pentru nuntă,<br />
                <em>într-un singur pachet</em>
              </h1>

              <p className="pp-hero-sub">
                <strong>300 lei, o singură dată.</strong> Invitații nelimitate, album foto 25 GB,
                meniu în invitație, GPS integrat, countdown, RSVP cu logistică, statistici și export Excel.
                Fără abonament, fără limite, fără bătăi de cap.
              </p>
            </div>

            <div className="pp-price-block">
              <div className="pp-price-top">
                <div className="pp-ring-wrap" aria-hidden>
                  <div className="pp-ring" />
                  <div className="pp-ring-inner">🎊</div>
                </div>

                <p className="pp-plan-label">
                  Pachet All-in-One
                  <span className="pp-plan-badge">SINGURUL PLAN</span>
                </p>

                <div className="pp-price-row">
                  <span className="pp-curr" aria-hidden>RON</span>
                  <span className="pp-amount" aria-label="300 lei">300</span>
                  <div className="pp-price-aside">
                    <span className="pp-price-type">Plată unică</span>
                    <span className="pp-price-note">Fără abonament</span>
                  </div>
                </div>

                <div className="pp-price-pills">
                  <span className="pp-pill"><span>✓</span> Acces 12 luni</span>
                  <span className="pp-pill"><span>✓</span> Activare instant</span>
                  <span className="pp-pill"><span>✓</span> Invitați nelimitați</span>
                </div>

                <Link href="/checkout" className="pp-cta">
                  <span aria-hidden>✨</span>
                  Cumpără Pachetul — 300 Lei
                </Link>

                <p className="pp-cta-note">
                  <span aria-hidden>🔒</span>
                  Plată securizată · Activare instant · Fără abonament
                </p>
              </div>
            </div>
          </section>

          {/* ── CE PRIMEȘTI ── */}
          <section aria-label="Ce include pachetul" style={{ opacity: 0, animation: 'pp-up .7s ease .2s forwards' }}>
            <p className="pp-section-label">Ce primești</p>
            <h2 className="pp-section-h2">
              Totul inclus,<br /><em>nimic separat</em>
            </h2>
            <p className="pp-section-sub">
              Un singur plan fără niveluri, fără upgrade-uri, fără funcții blocate. Plătești 300 lei și deblochezi tot.
            </p>
          </section>

          <div className="pp-feat-grid">
            {FEATURES.map((f) => (
              <div key={f.name} className="pp-feat-card">
                <div className="pp-feat-icon" aria-hidden>{f.icon}</div>
                <p className="pp-feat-name">{f.name}</p>
                <p className="pp-feat-desc">{f.desc}</p>
                {f.tags.length > 0 && (
                  <div className="pp-feat-tags">
                    {f.tags.map((t) => (
                      <span key={t} className="pp-feat-tag">
                        <span className="pp-feat-tag-dot" aria-hidden />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── COMPARISON + TRUST ── */}
          <div className="pp-bottom-grid">
            {/* comparison */}
            <div className="pp-compare" aria-label="Comparație VibeInvite vs invitații tipărite">
              <p className="pp-compare-h">
                VibeInvite vs. clasic
                <span className="pp-compare-sub">— de ce merită</span>
              </p>
              <div className="pp-compare-table">
                <div className="pp-compare-hdr">
                  <span className="pp-compare-hdr-lbl">Criteriu</span>
                  <span className="pp-compare-hdr-vibe">VibeInvite</span>
                  <span className="pp-compare-hdr-old">Clasic</span>
                </div>
                {COMPARE.map((r) => (
                  <div key={r.lbl} className="pp-compare-row">
                    <span className="pp-compare-lbl">{r.lbl}</span>
                    <span className="pp-compare-vibe">{r.vibe}</span>
                    <span className="pp-compare-old">{r.old}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* trust + faq */}
            <div className="pp-trust" aria-label="De ce VibeInvite și întrebări frecvente">
              <p className="pp-trust-h">
                <span aria-hidden>⭐</span>
                De ce aleg VibeInvite
              </p>

              <div className="pp-stats">
                {[
                  { num: '3 min', lbl: 'Timp setup' },
                  { num: '25 GB', lbl: 'Poze incluse' },
                  { num: '∞', lbl: 'Invitați' },
                  { num: '4.9★', lbl: 'Rating mediu' },
                ].map((s) => (
                  <div key={s.lbl} className="pp-stat">
                    <p className="pp-stat-num">{s.num}</p>
                    <p className="pp-stat-lbl">{s.lbl}</p>
                  </div>
                ))}
              </div>

              <div className="pp-faq" aria-label="Întrebări frecvente">
                {FAQ.map((item) => (
                  <div key={item.q} className="pp-faq-item">
                    <p className="pp-faq-q">{item.q}</p>
                    <p className="pp-faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── GUARANTEE ── */}
          <div className="pp-guarantee" aria-label="Garanții incluse">
            {GUARANTEE.map((g, i) => (
              <>
                <div key={g.strong} className="pp-guar-item">
                  <span className="pp-guar-icon" aria-hidden>{g.icon}</span>
                  <span className="pp-guar-text">
                    <strong>{g.strong}</strong>
                    {g.text}
                  </span>
                </div>
                {i < GUARANTEE.length - 1 && (
                  <div key={`gd-${i}`} className="pp-guar-div" aria-hidden />
                )}
              </>
            ))}
          </div>

          {/* ── BOTTOM CTA STRIP ── */}
          <div className="pp-cta-strip">
            <h2 className="pp-cta-strip-h">
              Gata să creezi<br /><strong>invitația perfectă?</strong>
            </h2>
            <p className="pp-cta-strip-sub">300 lei, o dată. Activare instant. Totul inclus.</p>
            <Link href="/checkout" className="pp-cta-strip-btn">
              <span aria-hidden>✨</span>
              Cumpără Pachetul
            </Link>
            <p className="pp-cta-strip-note">🔒 Plată securizată · Fără abonament · Acces 12 luni</p>
          </div>

        </div>

        {/* Ticker bottom */}
        <div className="pp-ticker" aria-hidden>
          <div className="pp-ticker-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="pp-ti">{t}<span className="pp-tdot" /></div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
