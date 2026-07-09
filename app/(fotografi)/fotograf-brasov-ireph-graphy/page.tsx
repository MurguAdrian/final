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

@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Karla:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html { scroll-behavior:smooth; }

.ir { font-family:'Karla',sans-serif; background:#FFFFFF; color:#0B0B0B; min-height:100vh; overflow-x:hidden; }
.ir ::selection { background:#0B0B0B; color:#fff; }

/* ============ NAV ============ */
.ir-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:16px 20px; display:flex; align-items:center; justify-content:space-between;
  transition:all .4s ease;
}
@media(min-width:768px){ .ir-nav { padding:18px 40px; } }
.ir-nav.scrolled {
  background:rgba(255,255,255,0.94); backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(11,11,11,0.1);
  padding:12px 20px;
}
@media(min-width:768px){ .ir-nav.scrolled { padding:12px 40px; } }
.ir-nav-back {
  display:flex; align-items:center; gap:6px; font-size:10px; font-weight:600;
  letter-spacing:.16em; text-transform:uppercase; text-decoration:none;
  color:rgba(11,11,11,0.5); transition:color .2s;
}
.ir-nav-back:hover { color:#0B0B0B; }
.ir-nav-logo {
  font-family:'Italiana',serif; font-size:20px; color:#0B0B0B; letter-spacing:.12em;
  text-transform:uppercase;
}

/* ============ HERO — monochrome editorial split ============ */
.ir-hero {
  min-height:100svh; display:flex; flex-direction:column; position:relative;
  background:#fff;
}
@media(min-width:900px){ .ir-hero { flex-direction:row; } }

.ir-hero-left {
  flex:1; display:flex; flex-direction:column; justify-content:center;
  padding:110px 24px 48px; position:relative; z-index:5;
}
@media(min-width:900px){ .ir-hero-left { padding:80px 48px 80px 56px; width:52%; } }

.ir-hero-kicker {
  display:flex; align-items:center; gap:12px; margin-bottom:26px;
  animation:irUp .8s ease .15s both;
}
.ir-hero-kicker-line { width:44px; height:1px; background:#0B0B0B; }
.ir-hero-kicker-text {
  font-size:10px; font-weight:700; letter-spacing:.3em; text-transform:uppercase;
  color:rgba(11,11,11,0.5);
}

.ir-hero-h1 {
  font-family:'Italiana',serif; font-weight:400;
  font-size:clamp(52px,11vw,120px); line-height:.92; color:#0B0B0B;
  letter-spacing:.01em; margin-bottom:20px; text-transform:uppercase;
  animation:irUp .9s ease .3s both;
}
.ir-hero-h1 span { display:block; padding-left:clamp(24px,6vw,80px); font-style:italic; }

.ir-hero-desc {
  font-size:14px; line-height:1.9; color:rgba(11,11,11,0.55);
  max-width:400px; margin-bottom:34px;
  animation:irUp .9s ease .45s both;
}
.ir-hero-desc strong { color:#0B0B0B; font-weight:700; }

.ir-hero-meta {
  display:flex; gap:24px; flex-wrap:wrap; margin-bottom:38px;
  animation:irUp .9s ease .6s both;
}
.ir-hero-meta-item { display:flex; flex-direction:column; gap:3px; }
.ir-hero-meta-k { font-size:9px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:rgba(11,11,11,0.35); }
.ir-hero-meta-v { font-family:'Italiana',serif; font-size:17px; color:#0B0B0B; }

.ir-hero-actions {
  display:flex; gap:10px; flex-wrap:wrap;
  animation:irUp .9s ease .75s both;
}
.ir-btn-dark {
  display:flex; align-items:center; gap:9px;
  background:#0B0B0B; color:#fff; font-size:11px; font-weight:700;
  letter-spacing:.14em; text-transform:uppercase;
  padding:16px 30px; text-decoration:none; border:1px solid #0B0B0B;
  transition:all .25s;
}
.ir-btn-dark:hover { background:#fff; color:#0B0B0B; }
.ir-btn-light {
  display:flex; align-items:center; gap:9px;
  background:transparent; color:#0B0B0B; font-size:11px; font-weight:600;
  letter-spacing:.14em; text-transform:uppercase;
  padding:16px 26px; text-decoration:none; border:1px solid rgba(11,11,11,0.25);
  transition:all .25s;
}
.ir-btn-light:hover { border-color:#0B0B0B; }

@keyframes irUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }

.ir-hero-right {
  position:relative; overflow:hidden;
  height:60svh; min-height:380px;
}
@media(min-width:900px){ .ir-hero-right { width:48%; height:100svh; } }

.ir-hero-right img {
  width:100%; height:100%; object-fit:cover; object-position:center top;
  filter:grayscale(1) contrast(1.05);
  animation:irHeroImg 1.6s cubic-bezier(.16,1,.3,1) both;
  transition:filter .8s ease;
}
.ir-hero-right:hover img { filter:grayscale(0) contrast(1); }
@keyframes irHeroImg { from{transform:scale(1.1);opacity:0} to{transform:scale(1);opacity:1} }

.ir-hero-right-frame {
  position:absolute; inset:16px; border:1px solid rgba(255,255,255,0.55);
  pointer-events:none;
}
.ir-hero-right-tag {
  position:absolute; bottom:28px; left:28px;
  font-family:'Italiana',serif; font-size:15px; letter-spacing:.14em; text-transform:uppercase;
  color:#fff; text-shadow:0 2px 12px rgba(0,0,0,0.4);
}

/* ============ MARQUEE ============ */
.ir-marquee {
  background:#0B0B0B; padding:14px 0; overflow:hidden;
}
.ir-marquee-inner { display:flex; width:max-content; animation:irTick 24s linear infinite; }
@keyframes irTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.ir-marquee-item {
  display:flex; align-items:center; gap:14px; padding:0 26px;
  font-family:'Italiana',serif; font-size:14px; letter-spacing:.24em; text-transform:uppercase;
  color:#fff; white-space:nowrap;
}
.ir-marquee-sep { opacity:.35; }

/* ============ STRIP ============ */
.ir-strip {
  background:#fff; border-bottom:1px solid rgba(11,11,11,0.1);
  padding:16px 20px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .ir-strip { padding:18px 40px; } }
.ir-strip-avatar {
  width:50px; height:50px; border-radius:50%; flex-shrink:0;
  object-fit:cover; object-position:center top;
  border:1px solid #0B0B0B; filter:grayscale(1);
}
.ir-strip-name { font-family:'Italiana',serif; font-size:18px; letter-spacing:.06em; color:#0B0B0B; }
.ir-strip-sub { font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:rgba(11,11,11,0.45); margin-top:2px; }
.ir-strip-spacer { flex:1; }
.ir-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#0B0B0B; color:#fff; font-size:10px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase;
  padding:11px 20px; text-decoration:none; white-space:nowrap;
  transition:opacity .2s;
}
.ir-strip-cta:hover { opacity:.8; }

/* ============ BODY ============ */
.ir-body { max-width:1240px; margin:0 auto; padding:64px 20px 160px; }
@media(min-width:640px){ .ir-body { padding:76px 40px 160px; } }
@media(min-width:1024px){ .ir-body { display:grid; grid-template-columns:1fr 330px; gap:64px; padding:80px 40px 120px; } }

.ir-sh { display:flex; align-items:baseline; gap:18px; margin-bottom:36px; }
.ir-sh-num { font-family:'Italiana',serif; font-size:15px; color:rgba(11,11,11,0.35); white-space:nowrap; }
.ir-sh-title {
  font-family:'Italiana',serif; font-size:clamp(30px,5vw,52px); font-weight:400;
  color:#0B0B0B; letter-spacing:.03em; text-transform:uppercase; line-height:1;
}
.ir-sh-line { flex:1; height:1px; background:rgba(11,11,11,0.15); transform:translateY(-6px); }

/* ============ GALLERY — darkroom contact sheet ============ */
.ir-gallery { margin-bottom:76px; }
.ir-gal {
  display:grid; grid-template-columns:repeat(2,1fr); gap:14px;
}
@media(min-width:768px){ .ir-gal { grid-template-columns:repeat(6,1fr); gap:18px; } }

.ir-gi {
  position:relative; overflow:hidden; cursor:pointer; display:block;
  background:#f2f2f2; border:1px solid rgba(11,11,11,0.12);
}
.ir-gi img {
  width:100%; height:100%; object-fit:cover; object-position:center top; display:block;
  filter:grayscale(1) contrast(1.04);
  transition:transform .9s cubic-bezier(.16,1,.3,1), filter .7s ease;
}
.ir-gi:hover img { transform:scale(1.05); filter:grayscale(0) contrast(1); }

.ir-gi-1 { grid-column:1/-1; aspect-ratio:3/4; }
@media(min-width:768px){ .ir-gi-1 { grid-column:1/3; grid-row:1/3; aspect-ratio:2/3; } }
.ir-gi-2 { aspect-ratio:2/3; }
@media(min-width:768px){ .ir-gi-2 { grid-column:3/5; aspect-ratio:3/4; } }
.ir-gi-3 { aspect-ratio:2/3; }
@media(min-width:768px){ .ir-gi-3 { grid-column:5/7; aspect-ratio:3/4; } }
.ir-gi-4 { grid-column:1/-1; aspect-ratio:16/10; }
@media(min-width:768px){ .ir-gi-4 { grid-column:3/7; aspect-ratio:16/9; } }
.ir-gi-5 { grid-column:1/-1; aspect-ratio:3/4; }
@media(min-width:768px){ .ir-gi-5 { grid-column:1/4; aspect-ratio:4/5; } }

.ir-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(11,11,11,0.88) 0%, transparent 50%);
  opacity:0; transition:opacity .4s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:18px;
}
.ir-gi:hover .ir-gi-mask { opacity:1; }
.ir-gi-num { font-family:'Italiana',serif; font-size:13px; letter-spacing:.2em; color:rgba(255,255,255,0.5); margin-bottom:4px; }
.ir-gi-label { font-family:'Italiana',serif; font-size:18px; letter-spacing:.05em; color:#fff; margin-bottom:10px; }
.ir-gi-cta {
  display:inline-flex; align-items:center; gap:6px;
  background:#fff; color:#0B0B0B; font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
  padding:8px 16px; text-decoration:none; width:fit-content;
}

/* ============ ABOUT — photo lab card ============ */
.ir-about { margin-bottom:72px; }
.ir-about-grid { display:grid; gap:0; border:1px solid #0B0B0B; }
@media(min-width:760px){ .ir-about-grid { grid-template-columns:1fr 1fr; } }

.ir-about-photo {
  position:relative; overflow:hidden; min-height:340px;
}
.ir-about-photo img {
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center top;
  filter:grayscale(1) contrast(1.05);
  transition:filter .8s ease;
}
.ir-about-photo:hover img { filter:grayscale(0); }
.ir-about-photo::after {
  content:'IREPH_GRAPHY · BRAȘOV'; position:absolute; bottom:16px; left:16px;
  font-size:9px; font-weight:700; letter-spacing:.24em; color:#fff;
  text-shadow:0 2px 10px rgba(0,0,0,0.5);
}

.ir-about-content {
  background:#0B0B0B; color:#fff; padding:44px 38px;
  display:flex; flex-direction:column; justify-content:center;
}
@media(max-width:640px){ .ir-about-content { padding:30px 22px; } }
.ir-about-kicker {
  font-size:9px; font-weight:700; letter-spacing:.28em; text-transform:uppercase;
  color:rgba(255,255,255,0.4); margin-bottom:20px;
}
.ir-about-quote {
  font-family:'Italiana',serif; font-size:clamp(22px,3.6vw,32px); line-height:1.35;
  color:#fff; margin-bottom:24px;
}
.ir-about-text { font-size:13.5px; line-height:1.95; color:rgba(255,255,255,0.5); }
.ir-about-text + .ir-about-text { margin-top:13px; }
.ir-about-text strong { color:#fff; font-weight:700; }

.ir-about-sig {
  margin-top:30px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.15);
  display:flex; align-items:center; gap:14px;
}
.ir-about-sig-name { font-family:'Italiana',serif; font-size:18px; letter-spacing:.08em; color:#fff; }
.ir-about-sig-role { font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-top:3px; }

/* ============ SERVICES ============ */
.ir-services { margin-bottom:56px; }
.ir-svc-list { border-top:1px solid #0B0B0B; }
.ir-svc {
  display:flex; align-items:center; gap:18px;
  padding:22px 6px; border-bottom:1px solid rgba(11,11,11,0.15);
  transition:padding .25s;
}
.ir-svc:hover { padding-left:14px; }
.ir-svc-num { font-family:'Italiana',serif; font-size:14px; color:rgba(11,11,11,0.35); width:34px; flex-shrink:0; }
.ir-svc-name {
  font-family:'Italiana',serif; font-size:clamp(19px,3vw,26px); letter-spacing:.05em;
  text-transform:uppercase; color:#0B0B0B;
}
.ir-svc-fill { flex:1; }
.ir-svc-note { font-size:11px; letter-spacing:.06em; color:rgba(11,11,11,0.45); text-align:right; }
@media(max-width:560px){ .ir-svc-note { display:none; } }

/* ============ SIDEBAR ============ */
.ir-sidebar { display:flex; flex-direction:column; gap:16px; }

.ir-contact-card { background:#0B0B0B; padding:30px 26px; }
.ir-ct-label { font-size:9px; font-weight:700; letter-spacing:.26em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:10px; }
.ir-ct-title { font-family:'Italiana',serif; font-size:28px; letter-spacing:.04em; color:#fff; margin-bottom:8px; line-height:1.1; }
.ir-ct-sub { font-size:12px; color:rgba(255,255,255,0.45); margin-bottom:22px; line-height:1.7; }
.ir-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#fff; color:#0B0B0B; font-size:11px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase;
  padding:15px; text-decoration:none;
  transition:opacity .2s; margin-bottom:8px;
}
.ir-ct-btn:hover { opacity:.85; }
.ir-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:15px; text-decoration:none;
  transition:opacity .2s; margin-bottom:12px;
}
.ir-ct-wa:hover { opacity:.9; }
.ir-ct-note { font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,0.3); text-align:center; }

.ir-conn-card { background:#fff; border:1px solid #0B0B0B; padding:20px; }
.ir-conn-head { font-size:9px; font-weight:700; letter-spacing:.26em; text-transform:uppercase; color:rgba(11,11,11,0.4); margin-bottom:10px; }
.ir-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(11,11,11,0.1);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.ir-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.ir-conn-row:hover { opacity:.6; }
.ir-conn-l { display:flex; align-items:center; gap:12px; }
.ir-conn-ico { width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ir-conn-lbl { font-size:13px; font-weight:600; color:#0B0B0B; }
.ir-conn-sub { font-size:11px; color:rgba(11,11,11,0.4); }

.ir-loc-card { background:#fff; border:1px solid #0B0B0B; padding:16px 18px; }
.ir-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#0B0B0B; transition:opacity .2s; }
.ir-loc-row:hover { opacity:.7; }
.ir-loc-ico {
  width:42px; height:42px; background:#0B0B0B;
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.ir-loc-name { font-family:'Italiana',serif; font-size:17px; letter-spacing:.05em; }
.ir-loc-sub { font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:rgba(11,11,11,0.4); margin-top:2px; }

.ir-share-card {
  background:#0B0B0B; padding:16px 18px;
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.ir-share-lbl { font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:3px; }
.ir-share-url { font-family:'Italiana',serif; font-size:16px; letter-spacing:.05em; color:#fff; }

/* ============ MOBILE BAR ============ */
.ir-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(255,255,255,0.97); backdrop-filter:blur(20px);
  border-top:1px solid #0B0B0B;
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .ir-bar { display:none; } }
.ir-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#0B0B0B; color:#fff; font-size:10px; font-weight:700;
  letter-spacing:.14em; text-transform:uppercase;
  padding:14px; text-decoration:none;
}
.ir-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:14px; text-decoration:none;
}
@media(max-width:374px){ .ir-hero-h1 { font-size:44px; } }
`;

const GALLERY_DATA = [
  { num: 'I', label: 'Portret în lumină' },
  { num: 'II', label: 'Emoția momentului' },
  { num: 'III', label: 'Bucuria zilei' },
  { num: 'IV', label: 'Împreună' },
  { num: 'V', label: 'Familie' },
];

export default async function IrephGraphyPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_400,h_400,c_fill,g_face/${p.profile_image}.jpg`;
  const clickTarget = p.website_url || p.instagram_url || '#';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
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
          <div className="ir-nav-logo">Ireph_graphy</div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="ir-hero">
          <div className="ir-hero-left">
            <div className="ir-hero-kicker">
              <div className="ir-hero-kicker-line" />
              <span className="ir-hero-kicker-text">Fotograf Verificat · VibeInvite</span>
            </div>
            <h1 className="ir-hero-h1">
              Ireph
              <span>graphy</span>
            </h1>
            <p className="ir-hero-desc">
              Fotografie <strong>alb-negru și color cu suflet</strong> — nunți, botezuri, cununii și ședințe foto de familie, în Brașov și oriunde te duce povestea.
            </p>
            <div className="ir-hero-meta">
              <div className="ir-hero-meta-item">
                <span className="ir-hero-meta-k">Locație</span>
                <span className="ir-hero-meta-v">Brașov</span>
              </div>
              <div className="ir-hero-meta-item">
                <span className="ir-hero-meta-k">Specializare</span>
                <span className="ir-hero-meta-v">Evenimente</span>
              </div>
              <div className="ir-hero-meta-item">
                <span className="ir-hero-meta-k">Stil</span>
                <span className="ir-hero-meta-v">Editorial · Candid</span>
              </div>
            </div>
            <div className="ir-hero-actions">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="ir-btn-dark">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="ir-btn-light">
                  Portofoliu →
                </a>
              )}
            </div>
          </div>
          <div className="ir-hero-right">
            <img
              src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1100/${p.profile_image}.jpg`}
              alt={p.name}
            />
            <div className="ir-hero-right-frame" />
            <div className="ir-hero-right-tag">Brașov · România</div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="ir-marquee">
          <div className="ir-marquee-inner">
            {['Nunți', 'Botezuri', 'Cununii', 'Familie', 'Brașov', 'Alb-Negru', 'Color', 'Nunți', 'Botezuri', 'Cununii', 'Familie', 'Brașov', 'Alb-Negru', 'Color'].map((item, i) => (
              <div key={i} className="ir-marquee-item">
                {item}
                <span className="ir-marquee-sep">✦</span>
              </div>
            ))}
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

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="ir-gallery">
                <div className="ir-sh">
                  <span className="ir-sh-num">No. 01</span>
                  <h2 className="ir-sh-title">Portofoliu</h2>
                  <div className="ir-sh-line" />
                </div>
                <div className="ir-gal">
                  {galleryIds.map((id, i) => (
                    <IrGalleryItem
                      key={id}
                      href={clickTarget}
                      slug={p.slug}
                      imgSrc={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1100/${id}.jpg`}
                      alt={`${p.name} – ${GALLERY_DATA[i]?.label || 'fotografie'}`}
                      label={GALLERY_DATA[i]?.label || 'Fotografie'}
                      num={GALLERY_DATA[i]?.num || ''}
                      eager={i === 0}
                      className={`ir-gi-${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT */}
            <div className="ir-about">
              <div className="ir-sh">
                <span className="ir-sh-num">No. 02</span>
                <h2 className="ir-sh-title">Despre</h2>
                <div className="ir-sh-line" />
              </div>
              <div className="ir-about-grid">
                <div className="ir-about-photo">
                  <img
                    src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_900/${p.profile_image}.jpg`}
                    alt={p.name}
                    loading="lazy"
                  />
                </div>
                <div className="ir-about-content">
                  <div className="ir-about-kicker">Viziunea artistei</div>
                  <p className="ir-about-quote">
                    „Cele mai frumoase fotografii nu se pozează — se trăiesc."
                  </p>
                  <p className="ir-about-text">
                    Sunt <strong>Irena</strong>, fotograf de evenimente din <strong>Brașov</strong>. Iubesc cadrele sincere, lumina naturală și emoțiile care nu pot fi regizate — de la lacrimile de bucurie până la îmbrățișările spontane.
                  </p>
                  <p className="ir-about-text">
                    Lucrez atât <strong>alb-negru</strong>, pentru intensitate și atemporalitate, cât și <strong>color</strong>, pentru viața și căldura momentului. Fiecare eveniment primește un stil vizual adaptat poveștii lui.
                  </p>
                  <p className="ir-about-text">
                    Disponibilă în <strong>Brașov și toată România</strong> pentru nunți, botezuri, cununii și ședințe foto de familie.
                  </p>
                  <div className="ir-about-sig">
                    <div>
                      <div className="ir-about-sig-name">Ireph_graphy</div>
                      <div className="ir-about-sig-role">Fotograf Evenimente · Brașov</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="ir-services">
              <div className="ir-sh">
                <span className="ir-sh-num">No. 03</span>
                <h2 className="ir-sh-title">Servicii</h2>
                <div className="ir-sh-line" />
              </div>
              <div className="ir-svc-list">
                <div className="ir-svc">
                  <span className="ir-svc-num">I.</span>
                  <span className="ir-svc-name">Nunți</span>
                  <span className="ir-svc-fill" />
                  <span className="ir-svc-note">De la pregătiri până la ultimul dans</span>
                </div>
                <div className="ir-svc">
                  <span className="ir-svc-num">II.</span>
                  <span className="ir-svc-name">Botezuri</span>
                  <span className="ir-svc-fill" />
                  <span className="ir-svc-note">Primele momente, păstrate pentru totdeauna</span>
                </div>
                <div className="ir-svc">
                  <span className="ir-svc-num">III.</span>
                  <span className="ir-svc-name">Cununii</span>
                  <span className="ir-svc-fill" />
                  <span className="ir-svc-note">Civile și religioase, documentate discret</span>
                </div>
                <div className="ir-svc">
                  <span className="ir-svc-num">IV.</span>
                  <span className="ir-svc-name">Ședințe Familie</span>
                  <span className="ir-svc-fill" />
                  <span className="ir-svc-note">Portrete naturale, în locațiile voastre preferate</span>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="ir-sidebar">

            <div className="ir-contact-card">
              <div className="ir-ct-label">Contact Direct</div>
              <div className="ir-ct-title">Rezervă-ți data</div>
              <p className="ir-ct-sub">Scrie-mi pentru disponibilitate și o ofertă personalizată pentru evenimentul tău.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="ir-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="ir-ct-wa" />}
              <p className="ir-ct-note">Răspund rapid</p>
            </div>

            <div className="ir-conn-card">
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
              <div className="ir-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="ir-loc-row">
                  <div className="ir-loc-ico">
                    <svg width="18" height="18" fill="none" stroke="#fff" viewBox="0 0 24 24">
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

            <div className="ir-share-card">
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
      `}} />
    </>
  );
}