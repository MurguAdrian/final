// app/(fotografi)/fotograf-brasov-ireph-graphy/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';
import IrGalleryItem from './IrGalleryItem';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-brasov-ireph-graphy';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
header, footer, .cookie-consent { display:none !important; }

@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html { scroll-behavior:smooth; }

.ir { font-family:'Space Mono',monospace; background:#0D0D0D; color:#EDEDEA; min-height:100vh; overflow-x:hidden; position:relative; }
.ir ::selection { background:#C41E1E; color:#EDEDEA; }

/* FILM GRAIN */
.ir::before {
  content:''; position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:180px;
}
.ir > * { position:relative; z-index:2; }

/* REVEAL */
.ir-rv { opacity:0; transform:translateY(28px); transition:opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
.ir-rv.in { opacity:1; transform:translateY(0); }

/* NAV */
.ir-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:14px 18px; display:flex; align-items:center; justify-content:space-between;
  transition:all .35s ease;
}
@media(min-width:768px){ .ir-nav { padding:16px 36px; } }
.ir-nav.scrolled {
  background:rgba(13,13,13,0.93); backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(237,237,234,0.1);
}
.ir-nav-back {
  display:flex; align-items:center; gap:6px; font-size:10px; font-weight:700;
  letter-spacing:.14em; text-transform:uppercase; text-decoration:none;
  color:rgba(237,237,234,0.5); transition:color .2s;
}
.ir-nav-back:hover { color:#EDEDEA; }
.ir-nav-logo { font-family:'Instrument Serif',serif; font-size:19px; letter-spacing:.02em; color:#EDEDEA; }
.ir-nav-logo i { color:#C41E1E; font-style:normal; }

/* HERO */
.ir-hero {
  min-height:100svh; position:relative; display:flex; flex-direction:column; justify-content:flex-end;
  padding:96px 18px 36px;
}
@media(min-width:900px){ .ir-hero { padding:110px 36px 48px; } }

.ir-hero-photo {
  position:absolute; inset:0; overflow:hidden;
}
.ir-hero-photo img {
  width:100%; height:100%; object-fit:cover; object-position:center 22%;
  filter:grayscale(1) brightness(.5) contrast(1.06);
  animation:irHero 2.2s cubic-bezier(.16,1,.3,1) both;
}
@keyframes irHero { from{transform:scale(1.1); filter:grayscale(1) brightness(.2) contrast(1.06);} to{transform:scale(1); filter:grayscale(1) brightness(.5) contrast(1.06);} }
.ir-hero-photo::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(to top, #0D0D0D 4%, rgba(13,13,13,.55) 42%, rgba(13,13,13,.15) 100%);
}

.ir-hero-meta {
  display:flex; align-items:center; gap:12px; flex-wrap:wrap;
  font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:rgba(237,237,234,0.55);
  margin-bottom:18px;
  animation:irUp 1s ease .5s both;
}
.ir-hero-meta .red { color:#C41E1E; }
.ir-hero-meta-line { width:44px; height:1px; background:rgba(237,237,234,0.3); }

.ir-hero-h1 {
  font-family:'Instrument Serif',serif; font-weight:400;
  font-size:clamp(58px,15vw,180px); line-height:.86; letter-spacing:-.01em; color:#EDEDEA;
  animation:irUp 1.1s ease .65s both;
}
.ir-hero-h1 em { font-style:italic; display:block; color:rgba(237,237,234,0.55); }
.ir-hero-h1 .red { color:#C41E1E; }

.ir-hero-foot {
  display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap;
  margin-top:26px;
  animation:irUp 1.1s ease .85s both;
}
.ir-hero-desc {
  font-size:11.5px; line-height:1.9; color:rgba(237,237,234,0.55); max-width:360px;
}
.ir-hero-desc b { color:#EDEDEA; font-weight:700; }
.ir-hero-ctas { display:flex; gap:10px; flex-wrap:wrap; }
.ir-btn {
  display:flex; align-items:center; gap:8px;
  background:#EDEDEA; color:#0D0D0D; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  padding:15px 26px; text-decoration:none; border:1px solid #EDEDEA;
  transition:background .25s, color .25s, border-color .25s;
}
.ir-btn:hover { background:#C41E1E; border-color:#C41E1E; color:#EDEDEA; }
.ir-btn-ghost {
  display:flex; align-items:center; gap:8px;
  background:transparent; color:rgba(237,237,234,0.7); font-size:11px; font-weight:400; letter-spacing:.1em; text-transform:uppercase;
  padding:15px 22px; text-decoration:none; border:1px solid rgba(237,237,234,0.3);
  transition:border-color .25s, color .25s;
}
.ir-btn-ghost:hover { border-color:#EDEDEA; color:#EDEDEA; }

@keyframes irUp { from{opacity:0; transform:translateY(24px);} to{opacity:1; transform:translateY(0);} }

/* FILM STRIP MARQUEE */
.ir-film {
  background:#0D0D0D; border-top:1px solid rgba(237,237,234,0.15); border-bottom:1px solid rgba(237,237,234,0.15);
  padding:13px 0; overflow:hidden;
}
.ir-film-inner { display:flex; width:max-content; animation:irTick 26s linear infinite; }
@keyframes irTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.ir-film-item {
  display:flex; align-items:center; gap:14px; padding:0 22px;
  font-size:10px; letter-spacing:.24em; text-transform:uppercase; color:rgba(237,237,234,0.45); white-space:nowrap;
}
.ir-film-item .red { color:#C41E1E; }
.ir-film-sq { width:7px; height:7px; border:1px solid rgba(237,237,234,0.3); }

/* STRIP */
.ir-strip {
  background:#111; border-bottom:1px solid rgba(237,237,234,0.08);
  padding:14px 18px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .ir-strip { padding:16px 36px; } }
.ir-strip-avatar {
  width:50px; height:50px; flex-shrink:0;
  object-fit:cover; object-position:center top;
  filter:grayscale(1); border:1px solid rgba(237,237,234,0.25);
}
.ir-strip-name { font-family:'Instrument Serif',serif; font-size:18px; color:#EDEDEA; }
.ir-strip-sub { font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(237,237,234,0.4); margin-top:3px; }
.ir-strip-spacer { flex:1; }
.ir-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#EDEDEA; color:#0D0D0D; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  padding:11px 18px; text-decoration:none; white-space:nowrap;
  transition:background .2s, color .2s;
}
.ir-strip-cta:hover { background:#C41E1E; color:#EDEDEA; }

/* BODY */
.ir-body { max-width:1240px; margin:0 auto; padding:64px 18px 170px; }
@media(min-width:640px){ .ir-body { padding:76px 36px 170px; } }
@media(min-width:1024px){ .ir-body { display:grid; grid-template-columns:1fr 320px; gap:60px; padding:84px 36px 130px; } }

.ir-sh { display:flex; align-items:baseline; gap:14px; margin-bottom:34px; border-bottom:1px solid rgba(237,237,234,0.2); padding-bottom:14px; }
.ir-sh-no { font-size:10px; letter-spacing:.2em; color:#C41E1E; white-space:nowrap; }
.ir-sh-title { font-family:'Instrument Serif',serif; font-size:clamp(30px,5.5vw,52px); color:#EDEDEA; line-height:1; }
.ir-sh-title em { font-style:italic; color:rgba(237,237,234,0.5); }
.ir-sh-fill { flex:1; }
.ir-sh-side { font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(237,237,234,0.35); white-space:nowrap; display:none; }
@media(min-width:640px){ .ir-sh-side { display:block; } }

/* CONTACT SHEET GALLERY */
.ir-gallery { margin-bottom:76px; }
.ir-sheet { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(min-width:768px){ .ir-sheet { grid-template-columns:repeat(3,1fr); gap:20px; } }

.ir-fr { display:block; text-decoration:none; cursor:pointer; }
.ir-fr-wide { grid-column:1/-1; }
@media(min-width:768px){ .ir-fr-wide { grid-column:span 2; } }

.ir-fr-top {
  display:flex; align-items:center; gap:8px;
  font-size:8.5px; letter-spacing:.22em; text-transform:uppercase; color:rgba(237,237,234,0.4);
  padding-bottom:7px;
}
.ir-fr-dot { width:4px; height:4px; background:#C41E1E; border-radius:50%; }

.ir-fr-img {
  position:relative; overflow:hidden; background:#181818;
  border:1px solid rgba(237,237,234,0.18);
  aspect-ratio:2/3;
}
.ir-fr-wide .ir-fr-img { aspect-ratio:3/2; }
@media(max-width:640px){ .ir-fr-wide .ir-fr-img { aspect-ratio:4/3; } }

.ir-fr-img img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:grayscale(1) contrast(1.05) brightness(.92);
  transition:transform 1s cubic-bezier(.16,1,.3,1), filter .6s ease;
}
.ir-fr:hover .ir-fr-img img { transform:scale(1.05); filter:grayscale(0) contrast(1) brightness(1); }

.ir-fr-veil {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(13,13,13,.85) 0%, transparent 45%);
  opacity:0; transition:opacity .4s;
  display:flex; align-items:flex-end; padding:16px;
}
.ir-fr:hover .ir-fr-veil { opacity:1; }
.ir-fr-veil-cta {
  font-size:9px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  color:#0D0D0D; background:#EDEDEA; padding:9px 15px;
}

.ir-fr-cap {
  font-family:'Instrument Serif',serif; font-style:italic; font-size:14px;
  color:rgba(237,237,234,0.6); padding-top:9px;
}

/* DARKROOM (ABOUT) */
.ir-dark { margin-bottom:64px; }
.ir-dark-card {
  background:#0A0A0A; border:1px solid rgba(237,237,234,0.14);
  padding:46px 40px; position:relative; overflow:hidden;
}
@media(max-width:640px){ .ir-dark-card { padding:30px 22px; } }
.ir-dark-card::before {
  content:''; position:absolute; top:-90px; right:-90px; width:280px; height:280px; border-radius:50%;
  background:radial-gradient(circle, rgba(196,30,30,0.16) 0%, transparent 65%);
  pointer-events:none; animation:irGlow 5s ease-in-out infinite alternate;
}
@keyframes irGlow { from{opacity:.5} to{opacity:1} }

.ir-dark-kicker {
  display:flex; align-items:center; gap:12px;
  font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:#C41E1E; margin-bottom:24px;
}
.ir-dark-kicker::after { content:''; flex:1; height:1px; background:rgba(237,237,234,0.12); }

.ir-dark-quote {
  font-family:'Instrument Serif',serif; font-size:clamp(24px,4.4vw,40px);
  line-height:1.25; color:#EDEDEA; margin-bottom:28px;
}
.ir-dark-quote em { font-style:italic; color:#C41E1E; }

.ir-dark-text { font-size:12.5px; line-height:2.05; color:rgba(237,237,234,0.5); max-width:640px; }
.ir-dark-text + .ir-dark-text { margin-top:14px; }
.ir-dark-text b { color:rgba(237,237,234,0.9); font-weight:700; }

.ir-dark-specs {
  display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:34px;
  background:rgba(237,237,234,0.12); border:1px solid rgba(237,237,234,0.12);
}
.ir-spec { background:#0A0A0A; padding:18px 12px; text-align:center; }
.ir-spec-n { font-family:'Instrument Serif',serif; font-size:30px; color:#EDEDEA; line-height:1; }
.ir-spec-n .red { color:#C41E1E; }
.ir-spec-l { font-size:8.5px; letter-spacing:.18em; text-transform:uppercase; color:rgba(237,237,234,0.4); margin-top:7px; }

.ir-dark-sig {
  margin-top:34px; padding-top:26px; border-top:1px solid rgba(237,237,234,0.1);
  display:flex; align-items:center; gap:16px;
}
.ir-dark-sig-av { width:52px; height:52px; object-fit:cover; object-position:center top; filter:grayscale(1); border:1px solid rgba(237,237,234,0.25); }
.ir-dark-sig-name { font-family:'Instrument Serif',serif; font-size:19px; color:#EDEDEA; }
.ir-dark-sig-role { font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(237,237,234,0.35); margin-top:4px; }

/* SIDEBAR */
.ir-sidebar { display:flex; flex-direction:column; gap:14px; }

.ir-ct-card {
  background:#EDEDEA; padding:28px 24px; position:relative;
}
.ir-ct-label { font-size:9px; font-weight:700; letter-spacing:.24em; text-transform:uppercase; color:#C41E1E; margin-bottom:10px; }
.ir-ct-title { font-family:'Instrument Serif',serif; font-size:28px; color:#0D0D0D; line-height:1.05; margin-bottom:8px; }
.ir-ct-title em { font-style:italic; }
.ir-ct-sub { font-size:11px; line-height:1.8; color:rgba(13,13,13,0.55); margin-bottom:20px; }
.ir-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#0D0D0D; color:#EDEDEA; font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  padding:15px; text-decoration:none;
  transition:background .2s; margin-bottom:8px;
}
.ir-ct-btn:hover { background:#C41E1E; }
.ir-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:15px; text-decoration:none;
  transition:opacity .2s; margin-bottom:12px;
}
.ir-ct-wa:hover { opacity:.9; }
.ir-ct-note { font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:rgba(13,13,13,0.4); text-align:center; }

.ir-facts { background:#111; border:1px solid rgba(237,237,234,0.12); }
.ir-fact {
  display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding:14px 18px; border-bottom:1px solid rgba(237,237,234,0.08);
}
.ir-fact:last-child { border-bottom:none; }
.ir-fact-l { font-size:8.5px; letter-spacing:.18em; text-transform:uppercase; color:rgba(237,237,234,0.4); }
.ir-fact-v { font-family:'Instrument Serif',serif; font-style:italic; font-size:15px; color:#EDEDEA; text-align:right; }
.ir-fact-v.red { color:#C41E1E; }

.ir-conn-card { background:#111; border:1px solid rgba(237,237,234,0.12); padding:20px; }
.ir-conn-head { font-size:9px; font-weight:700; letter-spacing:.24em; text-transform:uppercase; color:#C41E1E; margin-bottom:10px; }
.ir-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(237,237,234,0.08);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.ir-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.ir-conn-row:hover { opacity:.6; }
.ir-conn-l { display:flex; align-items:center; gap:12px; }
.ir-conn-ico { width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ir-conn-lbl { font-size:12.5px; font-weight:700; color:#EDEDEA; }
.ir-conn-sub { font-size:10.5px; color:rgba(237,237,234,0.4); }

.ir-loc-card { background:#111; border:1px solid rgba(237,237,234,0.12); padding:16px 18px; }
.ir-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#EDEDEA; transition:opacity .2s; }
.ir-loc-row:hover { opacity:.7; }
.ir-loc-ico { width:42px; height:42px; background:rgba(196,30,30,0.12); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ir-loc-name { font-family:'Instrument Serif',serif; font-style:italic; font-size:16px; }
.ir-loc-sub { font-size:8.5px; letter-spacing:.16em; text-transform:uppercase; color:rgba(237,237,234,0.35); margin-top:3px; }

.ir-share-card {
  background:#111; border:1px solid rgba(237,237,234,0.12); padding:16px 18px;
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.ir-share-lbl { font-size:8.5px; letter-spacing:.18em; text-transform:uppercase; color:rgba(237,237,234,0.35); margin-bottom:4px; }
.ir-share-url { font-family:'Instrument Serif',serif; font-style:italic; font-size:16px; color:#EDEDEA; }

/* MOBILE BAR */
.ir-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(13,13,13,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(237,237,234,0.15);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .ir-bar { display:none; } }
.ir-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#EDEDEA; color:#0D0D0D; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  padding:14px; text-decoration:none;
}
.ir-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:14px; text-decoration:none;
}
@media(max-width:374px){ .ir-hero-h1 { font-size:48px; } }
`;

const FRAMES = [
  { frame: 'FR.01', label: 'Emoția din priviri', wide: false },
  { frame: 'FR.02', label: 'Detaliul care contează', wide: false },
  { frame: 'FR.03', label: 'Bucuria împreună', wide: true },
  { frame: 'FR.04', label: 'Familie, aproape', wide: false },
  { frame: 'FR.05', label: 'Începutul poveștii', wide: false },
];

export default async function IrephGraphyPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_300,h_300,c_fill,g_face/${p.profile_image}.jpg`;
  const heroImg = `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1600/${p.profile_image}.jpg`;
  const clickTarget = p.website_url || p.instagram_url || '#';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ireph_graphy',
    description: 'Fotograf de evenimente în Brașov. Nunți, botezuri, cununii și ședințe foto de familie.',
    url: 'https://www.vibeinvite.ro/fotograf-brasov-ireph-graphy',
    telephone: '+40734537605',
    address: { '@type': 'PostalAddress', addressLocality: 'Brașov', addressRegion: 'Brașov', addressCountry: 'RO' },
    image: heroImg,
    sameAs: [p.instagram_url, p.website_url].filter(Boolean),
    priceRange: '$$',
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackView slug={p.slug} />
      <div className="ir">

        {/* NAV */}
        <nav className="ir-nav" id="ir-nav">
          <a href="/servicii-nunta" className="ir-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="ir-nav-logo">Ireph<i>_</i>graphy</div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="ir-hero">
          <div className="ir-hero-photo">
            <img src={heroImg} alt={`${p.name} – fotograf evenimente Brașov`} />
          </div>
          <div className="ir-hero-meta">
            <span className="red">●</span>
            <span>Fotograf Verificat</span>
            <span className="ir-hero-meta-line" />
            <span>Brașov · România</span>
            <span className="ir-hero-meta-line" />
            <span>ISO 400 · 35MM</span>
          </div>
          <h1 className="ir-hero-h1">
            Ireph
            <em>graphy<span className="red">.</span></em>
          </h1>
          <div className="ir-hero-foot">
            <p className="ir-hero-desc">
              Fotografie de evenimente cu <b>suflet</b> — alb-negru și culoare, emoții reale, cadre care rămân. <b>Nunți · Botezuri · Cununii · Familie</b>
            </p>
            <div className="ir-hero-ctas">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="ir-btn">
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="ir-btn-ghost">
                  Portofoliu →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* FILM STRIP */}
        <div className="ir-film">
          <div className="ir-film-inner">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ['IREPH_GRAPHY', 'BRAȘOV', 'NUNȚI', 'BOTEZURI', 'CUNUNII', 'FAMILIE', 'ALB-NEGRU', 'EMOȚIE'].map((t, i) => (
                <div key={`${k}-${i}`} className="ir-film-item">
                  <span className="ir-film-sq" />
                  <span className={i % 4 === 0 ? 'red' : ''}>{t}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* STRIP */}
        <div className="ir-strip">
          <img className="ir-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="ir-strip-name">Ireph_graphy</div>
            <div className="ir-strip-sub">Fotograf Evenimente · {p.oras}</div>
          </div>
          <div className="ir-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="ir-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="ir-body">
          <div>

            {/* CONTACT SHEET */}
            {galleryIds.length > 0 && (
              <div className="ir-gallery ir-rv">
                <div className="ir-sh">
                  <span className="ir-sh-no">CS-01</span>
                  <h2 className="ir-sh-title">Contact <em>Sheet</em></h2>
                  <div className="ir-sh-fill" />
                  <span className="ir-sh-side">Selecție — Evenimente</span>
                </div>
                <div className="ir-sheet">
                  {galleryIds.map((id, i) => (
                    <IrGalleryItem
                      key={id}
                      href={clickTarget}
                      slug={p.slug}
                      imgSrc={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1100/${id}.jpg`}
                      alt={`Ireph_graphy – ${FRAMES[i]?.label || 'fotografie eveniment Brașov'}`}
                      frame={FRAMES[i]?.frame || `FR.0${i + 1}`}
                      label={FRAMES[i]?.label || 'Fotografie'}
                      wide={FRAMES[i]?.wide}
                      eager={i === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* DARKROOM */}
            <div className="ir-dark ir-rv">
              <div className="ir-sh">
                <span className="ir-sh-no">CS-02</span>
                <h2 className="ir-sh-title">Camera <em>Obscură</em></h2>
                <div className="ir-sh-fill" />
                <span className="ir-sh-side">Despre Irena</span>
              </div>
              <div className="ir-dark-card">
                <div className="ir-dark-kicker">Filozofia din spatele obiectivului</div>
                <p className="ir-dark-quote">
                  Cele mai sincere emoții nu se regizează — <em>se așteaptă, se simt, se prind în cadru.</em>
                </p>
                <p className="ir-dark-text">
                  Sunt <b>Irena</b>, fotograf de evenimente din <b>Brașov</b>. Lucrez discret, aproape invizibil, și caut mereu momentul acela mic pe care toți ceilalți îl ratează: o strângere de mână, o lacrimă ascunsă, un râs care nu se poate controla.
                </p>
                <p className="ir-dark-text">
                  Stilul meu îmbină <b>alb-negrul atemporal</b> cu culoarea caldă a momentelor de familie. Fiecare eveniment e tratat ca un film — cu început, tensiune și final fericit.
                </p>
                <p className="ir-dark-text">
                  Disponibilă în <b>Brașov și toată România</b> pentru nunți, botezuri, cununii și ședințe foto de familie.
                </p>
                <div className="ir-dark-specs">
                  <div className="ir-spec"><div className="ir-spec-n">5<span className="red">+</span></div><div className="ir-spec-l">Ani experiență</div></div>
                  <div className="ir-spec"><div className="ir-spec-n">100<span className="red">+</span></div><div className="ir-spec-l">Evenimente</div></div>
                  <div className="ir-spec"><div className="ir-spec-n"><span className="red">∞</span></div><div className="ir-spec-l">Emoții surprinse</div></div>
                </div>
                <div className="ir-dark-sig">
                  <img className="ir-dark-sig-av" src={profileImg} alt={p.name} />
                  <div>
                    <div className="ir-dark-sig-name">Irena · Ireph_graphy</div>
                    <div className="ir-dark-sig-role">Fotograf Evenimente · Brașov</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="ir-sidebar">

            <div className="ir-ct-card ir-rv">
              <div className="ir-ct-label">Contact Direct</div>
              <div className="ir-ct-title">Rezervă <em>data ta</em></div>
              <p className="ir-ct-sub">Scrie-mi pentru disponibilitate și o ofertă personalizată pentru evenimentul tău.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="ir-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="ir-ct-wa" />}
              <p className="ir-ct-note">Răspund rapid</p>
            </div>

            <div className="ir-facts ir-rv">
              <div className="ir-fact"><span className="ir-fact-l">Servicii</span><span className="ir-fact-v">Foto &amp; Video</span></div>
              <div className="ir-fact"><span className="ir-fact-l">Zonă</span><span className="ir-fact-v">Brașov · România</span></div>
              <div className="ir-fact"><span className="ir-fact-l">Stil</span><span className="ir-fact-v red">Alb-Negru · Editorial</span></div>
              <div className="ir-fact"><span className="ir-fact-l">Evenimente</span><span className="ir-fact-v">Nunți · Botezuri · Familie</span></div>
            </div>

            <div className="ir-conn-card ir-rv">
              <div className="ir-conn-head">Online</div>
              <SocialLinks
                provider={p}
                rowClass="ir-conn-row"
                leftClass="ir-conn-l"
                icoClass="ir-conn-ico"
                lblClass="ir-conn-lbl"
                subClass="ir-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="ir-loc-card ir-rv">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="ir-loc-row">
                  <div className="ir-loc-ico">
                    <svg width="18" height="18" fill="none" stroke="#C41E1E" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="ir-loc-name">{p.oras}, {p.judet}</div>
                    <div className="ir-loc-sub">Disponibilă deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="ir-share-card ir-rv">
              <div>
                <div className="ir-share-lbl">Distribuie profilul</div>
                <div className="ir-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="ir-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="ir-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="ir-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('ir-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
        (function(){
          var els=document.querySelectorAll('.ir-rv');
          if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
          var io=new IntersectionObserver(function(entries){
            entries.forEach(function(en){
              if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
            });
          },{threshold:.12});
          els.forEach(function(e){io.observe(e);});
        })();
      `}} />
    </>
  );
}