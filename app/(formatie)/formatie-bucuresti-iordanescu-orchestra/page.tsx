// app/(formatie)/formatie-bucuresti-iordanescu-orchestra/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';
import IoGalleryItem from './IoGalleryItem';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'formatie-bucuresti-iordanescu-orchestra';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
header, footer, .cookie-consent { display:none !important; }

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.io { font-family:'Jost',sans-serif; background:#0A0907; color:#F2EDE3; min-height:100vh; overflow-x:hidden; }

/* NAV */
.io-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:18px 24px; display:flex; align-items:center; justify-content:space-between;
  transition:all .4s ease;
}
.io-nav.scrolled {
  background:rgba(10,9,7,0.94); backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(212,175,99,0.1);
}
.io-nav-back {
  display:flex; align-items:center; gap:6px; font-size:11px; font-weight:500;
  letter-spacing:.1em; text-transform:uppercase; text-decoration:none;
  color:rgba(242,237,227,0.45); transition:color .2s;
}
.io-nav-back:hover { color:#D4AF63; }
.io-nav-logo {
  font-family:'Cormorant Garamond',serif; font-size:19px; font-style:italic; font-weight:400;
  color:#F2EDE3; letter-spacing:.04em;
}
.io-nav-logo span { color:#D4AF63; }

/* HERO — spotlight stage */
.io-hero {
  height:100svh; min-height:600px; position:relative; overflow:hidden; background:#0A0907;
}

.io-hero-img {
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  filter:brightness(.45) saturate(1.1);
  animation:ioZoom 16s ease-in-out infinite alternate;
}
@keyframes ioZoom { from{transform:scale(1)} to{transform:scale(1.07)} }

.io-hero-vignette {
  position:absolute; inset:0;
  background:radial-gradient(ellipse at center, transparent 30%, rgba(10,9,7,0.7) 100%),
             linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.3) 45%, rgba(10,9,7,0.15) 100%);
}

/* SPOTLIGHT BEAMS */
.io-beam {
  position:absolute; top:-10%; width:140px; height:140%;
  background:linear-gradient(to bottom, rgba(212,175,99,0.07), transparent 70%);
  transform:rotate(12deg); pointer-events:none;
  animation:ioBeamMove 8s ease-in-out infinite alternate;
}
.io-beam.b1 { left:10%; animation-delay:0s; }
.io-beam.b2 { left:55%; transform:rotate(-10deg); animation-delay:2s; }
.io-beam.b3 { left:80%; animation-delay:4s; }
@keyframes ioBeamMove { from{opacity:.4} to{opacity:.9} }

.io-hero-content {
  position:absolute; inset:0; z-index:10;
  display:flex; flex-direction:column; justify-content:flex-end; align-items:center;
  text-align:center; padding:40px 24px 56px;
}
@media(min-width:768px){ .io-hero-content { padding:60px 60px 80px; } }

.io-hero-badge {
  display:inline-flex; align-items:center; gap:10px; width:fit-content;
  margin-bottom:24px;
  opacity:0; animation:ioFadeUp .9s ease .25s forwards;
}
.io-hero-badge-line { width:30px; height:1px; background:rgba(212,175,99,0.5); }
.io-hero-badge-text { font-size:10px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:#D4AF63; }

.io-hero-h1 {
  font-family:'Cormorant Garamond',serif; font-weight:300;
  font-size:clamp(48px,10vw,110px); line-height:.95; color:#F2EDE3;
  margin-bottom:6px;
  opacity:0; animation:ioFadeUp 1s ease .4s forwards;
}
.io-hero-h1 em { font-style:italic; color:#D4AF63; display:block; }

.io-hero-sub {
  font-size:13px; font-weight:400; letter-spacing:.16em; text-transform:uppercase;
  color:rgba(242,237,227,0.4); margin-bottom:36px;
  opacity:0; animation:ioFadeUp 1s ease .55s forwards;
}

@keyframes ioFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

.io-hero-actions {
  display:flex; gap:12px; flex-wrap:wrap; justify-content:center;
  opacity:0; animation:ioFadeUp 1s ease .7s forwards;
}
.io-hero-btn-main {
  display:flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#D4AF63,#B8943F);
  color:#0A0907; font-size:13px; font-weight:700; letter-spacing:.03em;
  padding:15px 30px; border-radius:2px; text-decoration:none;
  box-shadow:0 10px 36px rgba(212,175,99,0.25);
  transition:transform .2s, box-shadow .2s;
}
.io-hero-btn-main:hover { transform:translateY(-2px); box-shadow:0 14px 44px rgba(212,175,99,0.35); }
.io-hero-btn-outline {
  display:flex; align-items:center; gap:8px;
  background:transparent; border:1px solid rgba(242,237,227,0.2);
  color:rgba(242,237,227,0.6); font-size:13px; font-weight:500;
  padding:15px 26px; border-radius:2px; text-decoration:none;
  transition:all .2s;
}
.io-hero-btn-outline:hover { border-color:rgba(212,175,99,0.5); color:#D4AF63; }

/* VIOLIN MOTIF DIVIDER */
.io-divider {
  background:#0A0907; padding:24px 0; display:flex; align-items:center; justify-content:center; gap:16px;
  border-top:1px solid rgba(212,175,99,0.1); border-bottom:1px solid rgba(212,175,99,0.1);
}
.io-divider-line { width:60px; height:1px; background:linear-gradient(to right, transparent, rgba(212,175,99,0.5)); }
.io-divider-line.r { background:linear-gradient(to left, transparent, rgba(212,175,99,0.5)); }
.io-divider svg { color:#D4AF63; }

/* STRIP */
.io-strip {
  background:#120F0A; border-bottom:1px solid rgba(212,175,99,0.08);
  padding:16px 24px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .io-strip { padding:18px 48px; } }
.io-strip-avatar {
  width:52px; height:52px; border-radius:50%; flex-shrink:0;
  object-fit:cover; border:2px solid rgba(212,175,99,0.35);
}
.io-strip-name { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:600; color:#F2EDE3; }
.io-strip-sub { font-size:11px; color:#D4AF63; font-weight:500; letter-spacing:.04em; }
.io-strip-spacer { flex:1; }
.io-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:linear-gradient(135deg,#D4AF63,#B8943F);
  color:#0A0907; font-size:13px; font-weight:700;
  padding:10px 20px; border-radius:2px; text-decoration:none; white-space:nowrap;
  transition:opacity .2s;
}
.io-strip-cta:hover { opacity:.9; }

/* BODY */
.io-body { max-width:1200px; margin:0 auto; padding:72px 20px 160px; }
@media(min-width:640px){ .io-body { padding:80px 40px 160px; } }
@media(min-width:1024px){ .io-body { display:grid; grid-template-columns:1fr 340px; gap:64px; padding:80px 48px 120px; } }

.io-sh { text-align:center; margin-bottom:36px; }
@media(min-width:1024px){ .io-sh { text-align:left; } }
.io-sh-pre { font-size:10px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:#D4AF63; margin-bottom:8px; }
.io-sh-title { font-family:'Cormorant Garamond',serif; font-size:clamp(26px,4vw,40px); font-weight:300; color:#F2EDE3; }
.io-sh-title em { font-style:italic; color:#D4AF63; }

/* GALLERY — stage frames */
.io-gallery { margin-bottom:60px; }
.io-gal { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
@media(min-width:640px){ .io-gal { grid-template-columns:repeat(3,1fr); } }

.io-gi {
  position:relative; overflow:hidden; cursor:pointer; aspect-ratio:3/4;
  border:1px solid rgba(212,175,99,0.15); display:block;
}
.io-gi:first-child { grid-column:1/-1; aspect-ratio:16/8; }
@media(min-width:640px){ .io-gi:first-child { grid-column:1/3; aspect-ratio:16/10; } }

.io-gi img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.75) saturate(1.05);
  transition:transform .8s cubic-bezier(.16,1,.3,1), filter .4s ease;
}
.io-gi:hover img { transform:scale(1.08); filter:brightness(.95) saturate(1.15); }

.io-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(10,9,7,0.92) 0%, transparent 55%);
  display:flex; flex-direction:column; justify-content:flex-end; padding:16px;
}
.io-gi-label { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:15px; color:#F2EDE3; margin-bottom:8px; }
.io-gi-cta {
  display:inline-flex; align-items:center; gap:5px;
  background:rgba(212,175,99,0.9); color:#0A0907; font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  padding:6px 14px; border-radius:2px; text-decoration:none; width:fit-content;
  opacity:0; transform:translateY(6px); transition:all .3s;
}
.io-gi:hover .io-gi-cta { opacity:1; transform:translateY(0); }

/* ABOUT */
.io-about { margin-bottom:56px; }
.io-about-card {
  background:#120F0A; border-radius:4px; padding:44px;
  border:1px solid rgba(212,175,99,0.1);
  position:relative; overflow:hidden;
}
@media(max-width:640px){ .io-about-card { padding:28px 22px; } }
.io-about-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(to right, transparent, #D4AF63, transparent);
}

/* PACKAGES */
.io-packages { margin-bottom:56px; }
.io-pkg-grid { display:grid; gap:16px; }
@media(min-width:768px){ .io-pkg-grid { grid-template-columns:repeat(3,1fr); } }

.io-pkg-card {
  background:#120F0A; border:1px solid rgba(212,175,99,0.15);
  border-radius:4px; padding:28px 24px;
  display:flex; flex-direction:column;
  position:relative;
}
.io-pkg-featured {
  border-color:rgba(212,175,99,0.5);
  background:linear-gradient(160deg,#1a1510 0%,#120F0A 100%);
}
.io-pkg-badge {
  position:absolute; top:-12px; left:50%; transform:translateX(-50%);
  background:linear-gradient(135deg,#D4AF63,#B8943F); color:#0A0907;
  font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  padding:5px 14px; border-radius:100px; white-space:nowrap;
}
.io-pkg-name {
  font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:500;
  color:#D4AF63; text-align:center; margin-bottom:6px;
}
.io-pkg-tag {
  font-size:11px; color:rgba(242,237,227,0.4); text-align:center;
  margin-bottom:20px; line-height:1.5; min-height:32px;
}
.io-pkg-list { list-style:none; flex:1; }
.io-pkg-list li {
  font-size:12.5px; color:rgba(242,237,227,0.55); line-height:1.6;
  padding:8px 0 8px 22px; position:relative;
  border-bottom:1px solid rgba(212,175,99,0.06);
}
.io-pkg-list li:last-child { border-bottom:none; }
.io-pkg-list li::before {
  content:'✓'; position:absolute; left:0; top:8px;
  color:#D4AF63; font-size:12px; font-weight:700;
}
.io-pkg-list li.io-pkg-highlight { color:#D4AF63; font-weight:600; }
.io-pkg-foot {
  margin-top:18px; padding-top:16px; border-top:1px solid rgba(212,175,99,0.1);
  font-size:11px; color:#D4AF63; text-align:center; font-style:italic;
  font-family:'Cormorant Garamond',serif; font-size:14px;
}

.io-perks {
  margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:2px;
  border-top:1px solid rgba(212,175,99,0.12); padding-top:24px;
}
@media(min-width:768px){ .io-perks { grid-template-columns:repeat(4,1fr); } }
.io-perk { display:flex; align-items:center; gap:10px; padding:14px; background:#120F0A; }
.io-perk-ico { font-size:20px; flex-shrink:0; }
.io-perk-t { font-size:12px; font-weight:600; color:#F2EDE3; }
.io-perk-d { font-size:10.5px; color:rgba(242,237,227,0.35); margin-top:2px; }

.io-quote {
  font-family:'Cormorant Garamond',serif; font-size:clamp(20px,3.5vw,28px); font-weight:300; font-style:italic;
  color:#F2EDE3; line-height:1.5; margin-bottom:24px; text-align:center;
}
.io-quote span { color:#D4AF63; }
.io-text { font-size:14px; line-height:1.95; color:rgba(242,237,227,0.5); }
.io-text + .io-text { margin-top:14px; }
.io-text strong { color:rgba(242,237,227,0.85); font-weight:600; }

.io-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:32px; }
.io-stat { background:#0A0907; padding:20px 12px; text-align:center; border:1px solid rgba(212,175,99,0.08); }
.io-stat-n { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:500; color:#D4AF63; line-height:1; }
.io-stat-l { font-size:10px; color:rgba(242,237,227,0.35); margin-top:6px; letter-spacing:.06em; text-transform:uppercase; }

/* SIDEBAR */
.io-sidebar { display:flex; flex-direction:column; gap:14px; }

.io-contact-card {
  background:linear-gradient(160deg,#1a1510 0%,#120F0A 100%);
  border-radius:4px; padding:28px;
  border:1px solid rgba(212,175,99,0.2); position:relative; overflow:hidden;
}
.io-contact-card::before {
  content:''; position:absolute; top:-60px; right:-60px;
  width:200px; height:200px; border-radius:50%;
  background:radial-gradient(circle,rgba(212,175,99,0.15) 0%,transparent 65%);
  pointer-events:none;
}
.io-ct-label { font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#D4AF63; margin-bottom:8px; }
.io-ct-title { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:300; color:#F2EDE3; margin-bottom:6px; }
.io-ct-sub { font-size:12px; color:rgba(242,237,227,0.4); margin-bottom:22px; line-height:1.7; }
.io-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:linear-gradient(135deg,#D4AF63,#B8943F);
  color:#0A0907; font-size:14px; font-weight:700;
  padding:14px; border-radius:2px; text-decoration:none;
  box-shadow:0 6px 24px rgba(212,175,99,0.25);
  transition:opacity .2s, transform .15s; margin-bottom:8px;
}
.io-ct-btn:hover { opacity:.9; transform:translateY(-1px); }
.io-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:2px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.io-ct-wa:hover { opacity:.9; }
.io-ct-note { font-size:11px; color:rgba(242,237,227,0.25); text-align:center; }

.io-conn-card {
  background:#120F0A; border-radius:4px; padding:20px;
  border:1px solid rgba(212,175,99,0.1);
}
.io-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(212,175,99,0.06);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.io-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.io-conn-row:hover { opacity:.6; }
.io-conn-l { display:flex; align-items:center; gap:12px; }
.io-conn-ico { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.io-conn-lbl { font-size:13.5px; font-weight:500; color:#F2EDE3; }
.io-conn-sub { font-size:11px; color:rgba(242,237,227,0.3); }

.io-loc-card {
  background:#120F0A; border-radius:4px; padding:18px 20px;
  border:1px solid rgba(212,175,99,0.1);
}
.io-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#F2EDE3; transition:opacity .2s; }
.io-loc-row:hover { opacity:.7; }
.io-loc-ico { width:42px; height:42px; border-radius:8px; background:rgba(212,175,99,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.io-loc-name { font-size:14px; font-weight:600; color:#F2EDE3; }
.io-loc-sub { font-size:11px; color:rgba(242,237,227,0.3); margin-top:2px; }

.io-share-card {
  background:#120F0A; border-radius:4px; padding:16px 18px;
  border:1px solid rgba(212,175,99,0.1);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.io-share-lbl { font-size:12px; font-weight:500; color:rgba(242,237,227,0.3); margin-bottom:3px; }
.io-share-url { font-size:13px; font-weight:700; color:#D4AF63; }

/* MOBILE BAR */
.io-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(10,9,7,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(212,175,99,0.12);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .io-bar { display:none; } }
.io-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(135deg,#D4AF63,#B8943F); color:#0A0907;
  font-size:14px; font-weight:700; padding:13px; border-radius:2px; text-decoration:none;
  box-shadow:0 4px 16px rgba(212,175,99,0.25);
}
.io-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff;
  font-size:13px; font-weight:600; padding:13px; border-radius:2px; text-decoration:none;
}
@media(max-width:374px){ .io-hero-h1 { font-size:40px; } }
`;

const GALLERY_LABELS = [
  'Vioară live, emoție pură',
  'Energie de petrecere',
  'Orchestra completă',
  'Booking & Organizare',
  'Identitate Iordănescu',
];

export default async function IordanescuOrchestraPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill/${p.profile_image}.jpg`;
  const clickTarget = p.facebook_url || p.website_url || '#';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="io">

        {/* NAV */}
        <nav className="io-nav" id="io-nav">
          <a href="/servicii-nunta" className="io-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="io-nav-logo">Iordănescu <span>Orchestra</span></div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="io-hero">
          {galleryIds[0] && (
            <img
              className="io-hero-img"
              src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1800/${galleryIds[0]}.jpg`}
              alt={p.name}
            />
          )}
          <div className="io-hero-vignette" />
          <div className="io-beam b1" />
          <div className="io-beam b2" />
          <div className="io-beam b3" />

          <div className="io-hero-content">
            <div className="io-hero-badge">
              <div className="io-hero-badge-line" />
              <span className="io-hero-badge-text">Formație Verificată · VibeInvite</span>
              <div className="io-hero-badge-line" />
            </div>
            <h1 className="io-hero-h1">
              Iordănescu
              <em>Orchestra</em>
            </h1>
            <p className="io-hero-sub">Formație Profesională · București</p>
            <div className="io-hero-actions">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="io-hero-btn-main">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="io-hero-btn-outline">
                  Vezi Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* VIOLIN DIVIDER */}
        <div className="io-divider">
          <div className="io-divider-line" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M14.5 3.5c1 1 1 2.5 0 3.5l-7 7c-1 1-2.5 1-3.5 0s-1-2.5 0-3.5l7-7c1-1 2.5-1 3.5 0z"/>
            <path d="M11 7l6 6"/>
            <circle cx="18" cy="18" r="3"/>
            <path d="M5 12L3 14l2 2 2-2"/>
          </svg>
          <div className="io-divider-line r" />
        </div>

        {/* STRIP */}
        <div className="io-strip">
          <img className="io-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="io-strip-name">{p.name}</div>
            <div className="io-strip-sub">Formație · {p.oras}</div>
          </div>
          <div className="io-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="io-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="io-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="io-gallery">
                <div className="io-sh">
                  <div className="io-sh-pre">Pe scenă</div>
                  <h2 className="io-sh-title">Momente <em>Live</em></h2>
                </div>
                <div className="io-gal">
                  {galleryIds.map((id, i) => (
                    <IoGalleryItem
                      key={id}
                      href={clickTarget}
                      slug={p.slug}
                      imgSrc={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1000/${id}.jpg`}
                      alt={`${p.name} – ${GALLERY_LABELS[i] || 'eveniment'}`}
                      label={GALLERY_LABELS[i]}
                      eager={i === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* PACHETE */}
            <div className="io-packages">
              <div className="io-sh">
                <div className="io-sh-pre">Ce oferim</div>
                <h2 className="io-sh-title">Pachete pentru <em>Evenimentul Tău</em></h2>
              </div>
              <div className="io-pkg-grid">
                <div className="io-pkg-card">
                  <div className="io-pkg-name">Gold</div>
                  <div className="io-pkg-tag">Pentru momente intime și elegante</div>
                  <ul className="io-pkg-list">
                    <li>Formație restrânsă</li>
                    <li>1–2 soliști</li>
                    <li>Program de muzică populară și lăutărească</li>
                    <li>Program adaptat duratei evenimentului</li>
                    <li>Sonorizare de bază</li>
                  </ul>
                  <div className="io-pkg-foot">Ideal pentru evenimente mai mici și private</div>
                </div>
                <div className="io-pkg-card io-pkg-featured">
                  <div className="io-pkg-badge">★ Cel mai ales</div>
                  <div className="io-pkg-name">Premium</div>
                  <div className="io-pkg-tag">Echilibrul perfect între preț și experiență</div>
                  <ul className="io-pkg-list">
                    <li>Orchestră completă</li>
                    <li>Vioară live</li>
                    <li>2–3 soliști</li>
                    <li>Repertoriu variat: popular, lăutăresc, grecesc, internațional</li>
                    <li>Program adaptat evenimentului</li>
                  </ul>
                  <div className="io-pkg-foot">Pachetul preferat de majoritatea clienților</div>
                </div>
                <div className="io-pkg-card">
                  <div className="io-pkg-name">All Inclusive</div>
                  <div className="io-pkg-tag">Pentru evenimente de neuitat</div>
                  <ul className="io-pkg-list">
                    <li>Orchestră completă</li>
                    <li>3–4 soliști</li>
                    <li>Program artistic extins</li>
                    <li>Obiceiuri și tradiții (opțional)</li>
                    <li>Consultanță în organizarea evenimentului</li>
                    <li>Sonorizare premium</li>
                    <li>Momente artistice speciale (vioară show, moment surpriză)</li>
                    <li className="io-pkg-highlight">Garanția continuității muzicale — fără pauze pe durata programului</li>
                  </ul>
                  <div className="io-pkg-foot">Pentru cei care își doresc spectacol și eleganță</div>
                </div>
              </div>

              <div className="io-perks">
                <div className="io-perk">
                  <div className="io-perk-ico">📅</div>
                  <div><div className="io-perk-t">Reducere Duminică</div><div className="io-perk-d">Pentru evenimentele de duminică</div></div>
                </div>
                <div className="io-perk">
                  <div className="io-perk-ico">🏷️</div>
                  <div><div className="io-perk-t">Reducere Extrasezon</div><div className="io-perk-d">Ianuarie – Aprilie</div></div>
                </div>
                <div className="io-perk">
                  <div className="io-perk-ico">🎁</div>
                  <div><div className="io-perk-t">Moment Artistic Bonus</div><div className="io-perk-d">Set live inclus</div></div>
                </div>
                <div className="io-perk">
                  <div className="io-perk-ico">🤝</div>
                  <div><div className="io-perk-t">Flexibilitate</div><div className="io-perk-d">Adaptare după dorințele voastre</div></div>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="io-about">
              <div className="io-sh">
                <div className="io-sh-pre">Despre noi</div>
                <h2 className="io-sh-title">Cine <em>Suntem</em></h2>
              </div>
              <div className="io-about-card">
                <p className="io-quote">
                  „Muzica noastră, <span>emoția voastră</span>! Transformăm fiecare eveniment într-o amintire de neuitat."
                </p>
                <p className="io-text">
                  Suntem <strong>Iordănescu Orchestra</strong>, o formație profesională din <strong>București</strong> dedicată evenimentelor de excepție. Vioara este semnătura noastră — fiecare interpretare e gândită să creeze emoție și să ridice atmosfera la următorul nivel.
                </p>
                <p className="io-text">
                  Repertoriul nostru acoperă <strong>muzică populară, lăutărească, grecească și internațională</strong>, adaptat perfect pentru fiecare moment al evenimentului tău — de la intrarea miresei până la ultimul dans.
                </p>
                <p className="io-text">
                  Disponibili pentru <strong>nunți, botezuri și evenimente corporate</strong> în toată România.
                </p>
                <div className="io-stats">
                  <div className="io-stat"><div className="io-stat-n">10+</div><div className="io-stat-l">Ani Experiență</div></div>
                  <div className="io-stat"><div className="io-stat-n">500+</div><div className="io-stat-l">Evenimente</div></div>
                  <div className="io-stat"><div className="io-stat-n">100%</div><div className="io-stat-l">Energie Live</div></div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="io-sidebar">

            <div className="io-contact-card">
              <div className="io-ct-label">✦ Contact Direct</div>
              <div className="io-ct-title">Rezervă formația</div>
              <p className="io-ct-sub">Contactează-ne pentru disponibilitate și ofertă personalizată.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="io-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="io-ct-wa" />}
              <p className="io-ct-note">Răspundem rapid!</p>
            </div>

            <div className="io-conn-card">
              <div className="io-sh" style={{marginBottom:'14px', textAlign:'left'}}>
                <div className="io-sh-pre">Social</div>
              </div>
              <SocialLinks
                provider={p}
                rowClass="io-conn-row"
                leftClass="io-conn-l"
                icoClass="io-conn-ico"
                lblClass="io-conn-lbl"
                subClass="io-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="io-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="io-loc-row">
                  <div className="io-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="#D4AF63" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="io-loc-name">{p.oras}, {p.judet}</div>
                    <div className="io-loc-sub">Disponibili deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="io-share-card">
              <div>
                <div className="io-share-lbl">Distribuie profilul</div>
                <div className="io-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="io-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="io-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="io-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('io-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}