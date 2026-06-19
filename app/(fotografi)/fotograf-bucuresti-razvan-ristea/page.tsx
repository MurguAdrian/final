// app/(fotografi)/fotograf-bucuresti-razvan-ristea/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-bucuresti-razvan-ristea';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.rr { font-family:'Space Grotesk',sans-serif; background:#080808; color:#F0EDE8; min-height:100vh; overflow-x:hidden; }
header, footer { display:none !important; }
/* NAV */
.rr-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:18px 28px; display:flex; align-items:center; justify-content:space-between;
  mix-blend-mode:normal; transition:all .5s ease;
}
.rr-nav.scrolled {
  background:rgba(8,8,8,0.92); backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(240,237,232,0.06); padding:12px 28px;
}
.rr-nav-back {
  display:flex; align-items:center; gap:8px;
  font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase;
  text-decoration:none; color:rgba(240,237,232,0.5); transition:color .2s;
}
.rr-nav-back:hover { color:#F0EDE8; }
.rr-nav-name {
  font-family:'Cormorant',serif; font-size:20px; font-weight:300; font-style:italic;
  color:#F0EDE8; letter-spacing:.04em;
}

/* FULLSCREEN HERO */
.rr-hero {
  height:100svh; position:relative; overflow:hidden; background:#080808;
  display:flex; align-items:flex-end;
}

.rr-hero-slides { position:absolute; inset:0; }
.rr-slide {
  position:absolute; inset:0; opacity:0;
  animation:rrSlide 15s infinite;
}
.rr-slide:nth-child(1) { animation-delay:0s; }
.rr-slide:nth-child(2) { animation-delay:5s; }
.rr-slide:nth-child(3) { animation-delay:10s; }

@keyframes rrSlide {
  0%   { opacity:0; transform:scale(1.08); }
  8%   { opacity:1; transform:scale(1.04); }
  30%  { opacity:1; transform:scale(1); }
  38%  { opacity:0; transform:scale(.98); }
  100% { opacity:0; transform:scale(.98); }
}

.rr-slide img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.45) saturate(.9);
}

.rr-hero-overlay {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 40%, rgba(8,8,8,0.1) 100%);
}

/* HERO NOISE */
.rr-hero-noise {
  position:absolute; inset:0; opacity:.03; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size:200px;
}

.rr-hero-content {
  position:relative; z-index:10; padding:0 28px 48px; width:100%;
}
@media(min-width:768px){ .rr-hero-content { padding:0 60px 72px; } }

.rr-hero-counter {
  font-size:10px; font-weight:500; letter-spacing:.2em; text-transform:uppercase;
  color:rgba(240,237,232,0.25); margin-bottom:20px;
  display:flex; align-items:center; gap:12px;
}
.rr-hero-counter-line { flex:1; max-width:60px; height:1px; background:rgba(240,237,232,0.15); position:relative; overflow:hidden; }
.rr-hero-counter-line::after {
  content:''; position:absolute; top:0; left:-100%; height:100%; width:100%;
  background:rgba(240,237,232,0.6); animation:rrProgress 5s linear infinite;
}
@keyframes rrProgress { from{left:-100%} to{left:100%} }

.rr-hero-h1 {
  font-family:'Cormorant',serif;
  font-size:clamp(52px,12vw,130px); font-weight:300; color:#F0EDE8;
  line-height:.88; margin-bottom:4px;
  animation:rrHeroIn 1.2s cubic-bezier(.16,1,.3,1) .2s both;
}
.rr-hero-h1 span { display:block; }
.rr-hero-h1 em { font-style:italic; color:rgba(240,237,232,0.35); }

@keyframes rrHeroIn {
  from { opacity:0; transform:translateY(40px) skewY(2deg); }
  to { opacity:1; transform:translateY(0) skewY(0); }
}

.rr-hero-sub {
  font-size:clamp(12px,2vw,15px); font-weight:400; letter-spacing:.12em; text-transform:uppercase;
  color:rgba(240,237,232,0.35); margin-bottom:36px;
  animation:rrHeroIn 1.2s cubic-bezier(.16,1,.3,1) .4s both;
}

.rr-hero-row {
  display:flex; align-items:center; gap:20px; flex-wrap:wrap;
  animation:rrHeroIn 1.2s cubic-bezier(.16,1,.3,1) .6s both;
}
.rr-hero-pill {
  background:rgba(240,237,232,0.07); border:1px solid rgba(240,237,232,0.12);
  color:rgba(240,237,232,0.55); font-size:11px; font-weight:500; letter-spacing:.06em;
  padding:6px 16px; border-radius:100px;
}
.rr-hero-scroll-hint {
  margin-left:auto; display:flex; align-items:center; gap:8px;
  font-size:10px; color:rgba(240,237,232,0.2); letter-spacing:.12em; text-transform:uppercase;
}
.rr-hero-scroll-arrow {
  width:28px; height:28px; border:1px solid rgba(240,237,232,0.15); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  animation:rrBounce 2s ease-in-out infinite;
}
@keyframes rrBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }

/* STATS TICKER */
.rr-ticker {
  background:#F0EDE8; padding:14px 0; overflow:hidden; position:relative;
}
.rr-ticker-inner {
  display:flex; width:max-content;
  animation:rrTick 20s linear infinite;
}
@keyframes rrTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.rr-ticker-item {
  display:flex; align-items:center; gap:12px; padding:0 32px;
  font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase;
  color:#080808; white-space:nowrap;
}
.rr-ticker-dot { width:4px; height:4px; background:#080808; border-radius:50%; opacity:.3; }

/* STRIP */
.rr-strip {
  background:#0D0D0D; border-bottom:1px solid rgba(240,237,232,0.06);
  padding:16px 28px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .rr-strip { padding:18px 48px; } }
.rr-strip-avatar {
  width:52px; height:52px; border-radius:50%; flex-shrink:0;
  object-fit:cover; border:1px solid rgba(240,237,232,0.15);
  filter:grayscale(.3);
}
.rr-strip-name { font-size:15px; font-weight:600; color:#F0EDE8; }
.rr-strip-sub { font-size:11px; color:rgba(240,237,232,0.35); margin-top:2px; letter-spacing:.04em; }
.rr-strip-spacer { flex:1; }
.rr-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#F0EDE8; color:#080808; font-size:13px; font-weight:700;
  padding:10px 20px; border-radius:100px; text-decoration:none; white-space:nowrap;
  transition:opacity .2s;
}
.rr-strip-cta:hover { opacity:.85; }

/* BODY */
.rr-body { max-width:1240px; margin:0 auto; padding:80px 20px 180px; }
@media(min-width:640px){ .rr-body { padding:88px 40px 180px; } }
@media(min-width:1024px){ .rr-body { display:grid; grid-template-columns:1fr 360px; gap:72px; padding:88px 48px 120px; } }

.rr-sh { margin-bottom:36px; }
.rr-sh-num { font-size:11px; font-weight:600; letter-spacing:.14em; color:rgba(240,237,232,0.2); margin-bottom:8px; }
.rr-sh-title { font-family:'Cormorant',serif; font-size:clamp(28px,5vw,48px); font-weight:300; color:#F0EDE8; line-height:1; }
.rr-sh-title em { font-style:italic; }

/* GALLERY — editorial grid */
.rr-gallery { margin-bottom:80px; }
.rr-gal {
  display:grid;
  grid-template-columns:repeat(12,1fr);
  grid-template-rows:300px 220px;
  gap:6px;
}
@media(max-width:767px){
  .rr-gal { grid-template-columns:1fr 1fr; grid-template-rows:auto; gap:4px; }
}

.rr-gi { position:relative; overflow:hidden; background:#1a1a1a; cursor:pointer; }
.rr-gi:nth-child(1) { grid-column:1/6; grid-row:1/3; border-radius:4px 0 0 4px; }
.rr-gi:nth-child(2) { grid-column:6/9; grid-row:1/2; }
.rr-gi:nth-child(3) { grid-column:9/13; grid-row:1/2; border-radius:0 4px 0 0; }
.rr-gi:nth-child(4) { grid-column:6/10; grid-row:2/3; }
.rr-gi:nth-child(5) { grid-column:10/13; grid-row:2/3; border-radius:0 0 4px 0; }

@media(max-width:767px){
  .rr-gi:nth-child(1) { grid-column:1/-1; aspect-ratio:16/9; border-radius:8px; }
  .rr-gi:nth-child(2) { aspect-ratio:2/3; border-radius:8px; }
  .rr-gi:nth-child(3) { aspect-ratio:2/3; border-radius:8px; }
  .rr-gi:nth-child(4) { grid-column:1/-1; aspect-ratio:16/8; border-radius:8px; }
  .rr-gi:nth-child(5) { grid-column:1/-1; aspect-ratio:16/8; border-radius:8px; }
}

.rr-gi img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.88) saturate(.85);
  transition:transform .9s cubic-bezier(.16,1,.3,1), filter .5s ease;
}
.rr-gi:hover img { transform:scale(1.08); filter:brightness(1) saturate(1.05); }

.rr-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(8,8,8,0.92) 0%, transparent 60%);
  opacity:0; transition:opacity .4s ease;
  display:flex; flex-direction:column; justify-content:flex-end; padding:20px;
}
.rr-gi:hover .rr-gi-mask { opacity:1; }
.rr-gi-idx {
  font-family:'Cormorant',serif; font-size:48px; font-weight:300; font-style:italic;
  color:rgba(240,237,232,0.15); line-height:1; margin-bottom:4px;
}
.rr-gi-label { font-size:10px; color:rgba(240,237,232,0.4); text-transform:uppercase; letter-spacing:.12em; margin-bottom:8px; }
.rr-gi-cta {
  display:inline-flex; align-items:center; gap:6px;
  background:#F0EDE8; color:#080808; font-size:11px; font-weight:700; letter-spacing:.04em;
  padding:7px 16px; border-radius:100px; text-decoration:none; width:fit-content;
  transition:background .2s;
}
.rr-gi-cta:hover { background:#fff; }

/* MANIFESTO */
.rr-manifesto { margin-bottom:72px; }
.rr-manifesto-wrap {
  display:grid; gap:2px;
}
@media(min-width:640px){ .rr-manifesto-wrap { grid-template-columns:1fr 1fr; } }

.rr-manifesto-left {
  background:#111; padding:48px 40px; border-radius:4px 0 0 4px;
  position:relative; overflow:hidden;
}
@media(max-width:639px){ .rr-manifesto-left { padding:32px 24px; border-radius:8px 8px 0 0; } }
.rr-manifesto-left::before {
  content:'R'; position:absolute; bottom:-40px; right:-20px;
  font-family:'Cormorant',serif; font-size:240px; font-weight:300; font-style:italic;
  color:rgba(240,237,232,0.03); line-height:1; pointer-events:none;
}
.rr-m-label { font-size:10px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:rgba(240,237,232,0.2); margin-bottom:20px; }
.rr-m-quote {
  font-family:'Cormorant',serif; font-size:clamp(20px,3.5vw,30px); font-weight:300; font-style:italic;
  color:#F0EDE8; line-height:1.45; margin-bottom:24px;
}
.rr-m-text { font-size:13.5px; line-height:1.95; color:rgba(240,237,232,0.4); }
.rr-m-text + .rr-m-text { margin-top:12px; }
.rr-m-text strong { color:rgba(240,237,232,0.75); font-weight:600; }

.rr-manifesto-right {
  background:#F0EDE8; padding:48px 40px; border-radius:0 4px 4px 0;
  display:flex; flex-direction:column; gap:0;
}
@media(max-width:639px){ .rr-manifesto-right { padding:32px 24px; border-radius:0 0 8px 8px; } }

.rr-stat-row {
  flex:1; display:flex; flex-direction:column; justify-content:center;
  padding:20px 0; border-bottom:1px solid rgba(8,8,8,0.08);
}
.rr-stat-row:last-child { border-bottom:none; }
.rr-stat-n { font-family:'Cormorant',serif; font-size:52px; font-weight:300; color:#080808; line-height:1; }
.rr-stat-l { font-size:12px; color:rgba(8,8,8,0.45); margin-top:4px; line-height:1.5; }
.rr-stat-l strong { color:#080808; font-weight:600; display:block; }

.rr-m-sig {
  margin-top:28px; padding-top:24px; border-top:1px solid rgba(240,237,232,0.08);
  display:flex; align-items:center; gap:12px;
}
.rr-m-sig-av { width:44px; height:44px; border-radius:50%; object-fit:cover; filter:grayscale(.3); border:1px solid rgba(240,237,232,0.15); }
.rr-m-sig-name { font-size:13px; font-weight:600; color:#F0EDE8; }
.rr-m-sig-role { font-size:11px; color:rgba(240,237,232,0.3); margin-top:1px; }

/* SIDEBAR */
.rr-sidebar { display:flex; flex-direction:column; gap:14px; }

.rr-contact-card {
  background:#F0EDE8; border-radius:20px; padding:26px;
  position:relative; overflow:hidden;
}
.rr-contact-card::before {
  content:''; position:absolute; top:-40px; right:-40px;
  width:160px; height:160px; border-radius:50%;
  background:rgba(8,8,8,0.04); pointer-events:none;
}
.rr-ct-label { font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:rgba(8,8,8,0.3); margin-bottom:8px; }
.rr-ct-title { font-family:'Cormorant',serif; font-size:24px; font-weight:300; font-style:italic; color:#080808; margin-bottom:6px; }
.rr-ct-sub { font-size:12px; color:rgba(8,8,8,0.45); margin-bottom:20px; line-height:1.7; }
.rr-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#080808; color:#F0EDE8; font-size:14px; font-weight:700;
  padding:14px; border-radius:12px; text-decoration:none;
  transition:opacity .2s; margin-bottom:8px;
}
.rr-ct-btn:hover { opacity:.8; }
.rr-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:12px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.rr-ct-wa:hover { opacity:.9; }
.rr-ct-note { font-size:11px; color:rgba(8,8,8,0.3); text-align:center; }

.rr-conn-card {
  background:#111; border-radius:20px; padding:20px;
  border:1px solid rgba(240,237,232,0.06);
}
.rr-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(240,237,232,0.05);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.rr-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.rr-conn-row:hover { opacity:.6; }
.rr-conn-l { display:flex; align-items:center; gap:12px; }
.rr-conn-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.rr-conn-lbl { font-size:13.5px; font-weight:500; color:#F0EDE8; }
.rr-conn-sub { font-size:11px; color:rgba(240,237,232,0.3); }

.rr-loc-card {
  background:#111; border-radius:18px; padding:18px 20px;
  border:1px solid rgba(240,237,232,0.06);
}
.rr-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#F0EDE8; transition:opacity .2s; }
.rr-loc-row:hover { opacity:.7; }
.rr-loc-ico { width:42px; height:42px; border-radius:12px; background:rgba(240,237,232,0.06); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.rr-loc-name { font-size:14px; font-weight:600; color:#F0EDE8; }
.rr-loc-sub { font-size:11px; color:rgba(240,237,232,0.3); margin-top:2px; }

.rr-share-card {
  background:#111; border-radius:18px; padding:16px 18px;
  border:1px solid rgba(240,237,232,0.06);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.rr-share-lbl { font-size:12px; font-weight:500; color:rgba(240,237,232,0.3); margin-bottom:3px; }
.rr-share-url { font-size:13px; font-weight:700; color:#F0EDE8; }

/* MOBILE BAR */
.rr-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(8,8,8,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(240,237,232,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .rr-bar { display:none; } }
.rr-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#F0EDE8; color:#080808; font-size:14px; font-weight:700;
  padding:13px; border-radius:12px; text-decoration:none;
}
.rr-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:13px; font-weight:600;
  padding:13px; border-radius:12px; text-decoration:none;
}
@media(max-width:374px){ .rr-hero-h1 { font-size:44px; } }
`;

const GALLERY_LABELS = [
  'Momentul adevărului',
  'Portret editorial',
  'Lumină de aur',
  'Complicitate',
  'Libertate',
];

export default async function RazvanRisteaPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill/${p.profile_image}.jpg`;

  const tickerItems = ['București', 'Fotograf Nuntă', 'Documentary Style', 'Răzvan Ristea', 'Emoții Autentice', 'Fine Art', 'București', 'Fotograf Nuntă', 'Documentary Style', 'Răzvan Ristea', 'Emoții Autentice', 'Fine Art'];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="rr">

        {/* NAV */}
        <nav className="rr-nav" id="rr-nav">
          <a href="/servicii-nunta" className="rr-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="rr-nav-name">Răzvan Ristea</div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="rr-hero">
          <div className="rr-hero-slides">
            {galleryIds.slice(0, 3).map((id, i) => (
              <div key={id} className="rr-slide">
                <img
                  src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1600/${id}.jpg`}
                  alt={`${p.name} ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
          <div className="rr-hero-overlay" />
          <div className="rr-hero-noise" />
          <div className="rr-hero-content">
            <div className="rr-hero-counter">
              <span>01 / 03</span>
              <div className="rr-hero-counter-line" />
              <span>București</span>
            </div>
            <h1 className="rr-hero-h1">
              <span>Răzvan</span>
              <em>Ristea</em>
            </h1>
            <p className="rr-hero-sub">Fotograf Documentary · București</p>
            <div className="rr-hero-row">
              <span className="rr-hero-pill">📷 Fine Art</span>
              <span className="rr-hero-pill">🎬 Documentary</span>
              <span className="rr-hero-pill">📍 București</span>
              <div className="rr-hero-scroll-hint">
                Scroll
                <div className="rr-hero-scroll-arrow">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TICKER */}
        <div className="rr-ticker">
          <div className="rr-ticker-inner">
            {tickerItems.map((item, i) => (
              <div key={i} className="rr-ticker-item">
                {item}
                <span className="rr-ticker-dot" />
              </div>
            ))}
          </div>
        </div>

        {/* STRIP */}
        <div className="rr-strip">
          <img className="rr-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="rr-strip-name">{p.name}</div>
            <div className="rr-strip-sub">Fotograf Profesionist · {p.oras}</div>
          </div>
          <div className="rr-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="rr-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="rr-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="rr-gallery">
                <div className="rr-sh">
                  <div className="rr-sh-num">01 — Portfolio</div>
                  <h2 className="rr-sh-title">Momente <em>Reale</em></h2>
                </div>
                <div className="rr-gal">
                  {galleryIds.map((id, i) => (
                    <div key={id} className="rr-gi">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${id}.jpg`}
                        alt={`${p.name} – ${GALLERY_LABELS[i] || 'fotografie'}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="rr-gi-mask">
                        <div className="rr-gi-idx">0{i + 1}</div>
                        <div className="rr-gi-label">{GALLERY_LABELS[i]}</div>
                        <a href={p.website_url || p.instagram_url || '#'} target="_blank" rel="noopener noreferrer" className="rr-gi-cta">
                          Portofoliu →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MANIFESTO */}
            <div className="rr-manifesto">
              <div className="rr-sh">
                <div className="rr-sh-num">02 — Despre</div>
                <h2 className="rr-sh-title">Viziunea <em>Mea</em></h2>
              </div>
              <div className="rr-manifesto-wrap">
                <div className="rr-manifesto-left">
                  <div className="rr-m-label">✦ Filozofia artistului</div>
                  <p className="rr-m-quote">
                    „Cea mai bună fotografie nu e cea mai bine expusă — e cea care simți că respiri când o privești."
                  </p>
                  <p className="rr-m-text">
                    Sunt <strong>Răzvan Ristea</strong>, fotograf din <strong>București</strong> specializat în nunți și evenimente. Abordez fiecare proiect cu ochiul unui documentarist și sensibilitatea unui artist — rezultatul sunt imagini care nu doar arată ce s-a întâmplat, ci transmit cum s-a simțit.
                  </p>
                  <p className="rr-m-text">
                    Lucrez cu <strong>lumină naturală</strong>, mă integrez organic în atmosfera zilei și captez momentele înainte ca oamenii să realizeze că sunt fotografiați. Asta produce autenticitate.
                  </p>
                  <p className="rr-m-text">
                    Disponibil în <strong>toată România</strong> și internațional. Portofoliu complet pe <strong>razvanristea.myportfolio.com</strong>.
                  </p>
                  <div className="rr-m-sig">
                    <img className="rr-m-sig-av" src={profileImg} alt={p.name} />
                    <div>
                      <div className="rr-m-sig-name">Răzvan Ristea</div>
                      <div className="rr-m-sig-role">Fotograf Documentary · București</div>
                    </div>
                  </div>
                </div>
                <div className="rr-manifesto-right">
                  <div className="rr-stat-row">
                    <div className="rr-stat-n">10+</div>
                    <div className="rr-stat-l"><strong>Ani de experiență</strong>Fine art & documentary</div>
                  </div>
                  <div className="rr-stat-row">
                    <div className="rr-stat-n">500+</div>
                    <div className="rr-stat-l"><strong>Nunți fotografiate</strong>În România și Europa</div>
                  </div>
                  <div className="rr-stat-row">
                    <div className="rr-stat-n">∞</div>
                    <div className="rr-stat-l"><strong>Pasiune</strong>Fiecare cadru, o decizie artistică</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="rr-sidebar">

            <div className="rr-contact-card">
              <div className="rr-ct-label">✦ Contact Direct</div>
              <div className="rr-ct-title">Hai să lucrăm împreună</div>
              <p className="rr-ct-sub">Contactează-mă pentru disponibilitate și pachete personalizate.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="rr-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="rr-ct-wa" />}
              <p className="rr-ct-note">Răspund în mai puțin de 24h</p>
            </div>

            <div className="rr-conn-card">
              <div className="rr-sh" style={{marginBottom:'14px'}}>
                <div className="rr-sh-num">03 — Social</div>
              </div>
              <SocialLinks
                provider={p}
                rowClass="rr-conn-row"
                leftClass="rr-conn-l"
                icoClass="rr-conn-ico"
                lblClass="rr-conn-lbl"
                subClass="rr-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="rr-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="rr-loc-row">
                  <div className="rr-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="rgba(240,237,232,0.5)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="rr-loc-name">{p.oras}, {p.judet}</div>
                    <div className="rr-loc-sub">Disponibil deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="rr-share-card">
              <div>
                <div className="rr-share-lbl">Distribuie profilul</div>
                <div className="rr-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="rr-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="rr-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="rr-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('rr-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}