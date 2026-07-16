// app/(fotografi)/fotograf-bucuresti-raluca-storylens/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';
import RsGalleryItem from './RsGalleryItem';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-bucuresti-raluca-storylens';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
header, footer, .cookie-consent { display:none !important; }

@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Figtree:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html { scroll-behavior:smooth; }

.rs { font-family:'Figtree',sans-serif; background:#FBF6F0; color:#3D2C2A; min-height:100vh; overflow-x:hidden; }
.rs ::selection { background:#C97C8A; color:#fff; }
.rs-paper {
  background-image:radial-gradient(rgba(61,44,42,0.07) 1px, transparent 1px);
  background-size:22px 22px;
}

@keyframes rsUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

/* ============ NAV ============ */
.rs-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:14px 18px; display:flex; align-items:center; justify-content:space-between;
  transition:all .35s ease;
}
@media(min-width:768px){ .rs-nav { padding:16px 36px; } }
.rs-nav.scrolled {
  background:rgba(251,246,240,0.95); backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(61,44,42,0.08);
}
.rs-nav-back {
  display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600;
  letter-spacing:.08em; text-transform:uppercase; text-decoration:none;
  color:rgba(61,44,42,0.5); transition:color .2s;
}
.rs-nav-back:hover { color:#3D2C2A; }
.rs-nav-logo { font-family:'Caveat',cursive; font-size:24px; font-weight:700; color:#3D2C2A; }
.rs-nav-logo span { color:#C97C8A; }

/* ============ HERO ============ */
.rs-hero {
  padding:120px 20px 56px; display:flex; flex-direction:column; align-items:center;
  text-align:center; position:relative;
}
@media(min-width:900px){ .rs-hero { padding:140px 40px 72px; } }

.rs-hero-kicker {
  font-size:10px; font-weight:700; letter-spacing:.26em; text-transform:uppercase;
  color:#C97C8A; margin-bottom:14px;
  animation:rsUp .8s ease .1s both;
}
.rs-hero-h1 {
  font-family:'Fraunces',serif; font-weight:600;
  font-size:clamp(40px,9vw,84px); line-height:1; color:#3D2C2A;
  margin-bottom:8px;
  animation:rsUp .8s ease .25s both;
}
.rs-hero-h1 em { font-family:'Caveat',cursive; font-weight:700; font-style:normal; color:#C97C8A; font-size:1.12em; }
.rs-hero-sub {
  font-family:'Caveat',cursive; font-size:clamp(20px,4vw,28px); color:rgba(61,44,42,0.55);
  margin-bottom:34px;
  animation:rsUp .8s ease .4s both;
}

/* photo trio — sub titlu, nu peste nav */
.rs-hero-trio {
  display:flex; justify-content:center; align-items:flex-end; gap:0;
  margin-bottom:38px; width:100%; max-width:640px;
  animation:rsUp .9s ease .55s both;
}
.rs-trio-card {
  background:#fff; padding:8px 8px 26px;
  box-shadow:0 12px 30px rgba(61,44,42,0.16);
  width:33%; max-width:190px;
  transition:transform .45s cubic-bezier(.16,1,.3,1);
}
.rs-trio-card img { width:100%; aspect-ratio:1; object-fit:cover; display:block; }
.rs-trio-card.t1 { transform:rotate(-6deg) translateY(10px); z-index:1; }
.rs-trio-card.t2 { transform:rotate(0) translateY(-6px) scale(1.08); z-index:3; }
.rs-trio-card.t3 { transform:rotate(6deg) translateY(10px); z-index:2; }
.rs-trio-card:hover { transform:rotate(0) translateY(-14px) scale(1.1); z-index:5; }

.rs-hero-actions {
  display:flex; gap:10px; flex-wrap:wrap; justify-content:center;
  animation:rsUp .9s ease .7s both;
}
.rs-btn {
  display:flex; align-items:center; gap:8px;
  background:#3D2C2A; color:#FBF6F0; font-size:12px; font-weight:700;
  letter-spacing:.06em; padding:15px 30px; border-radius:100px; text-decoration:none;
  box-shadow:0 8px 24px rgba(61,44,42,0.25);
  transition:transform .2s, background .25s;
}
.rs-btn:hover { transform:translateY(-2px); background:#C97C8A; }
.rs-btn-soft {
  display:flex; align-items:center; gap:8px;
  background:#fff; color:#3D2C2A; font-size:12px; font-weight:600;
  padding:15px 26px; border-radius:100px; text-decoration:none;
  border:1.5px solid rgba(61,44,42,0.15);
  transition:border-color .25s, transform .2s;
}
.rs-btn-soft:hover { border-color:#C97C8A; transform:translateY(-2px); }

/* ============ RIBBON ============ */
.rs-ribbon {
  background:#C97C8A; padding:12px 0; overflow:hidden;
  box-shadow:0 6px 20px rgba(201,124,138,0.3);
}
.rs-ribbon-inner { display:flex; width:max-content; animation:rsTick 24s linear infinite; }
@keyframes rsTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.rs-ribbon-item {
  display:flex; align-items:center; gap:14px; padding:0 24px;
  font-family:'Caveat',cursive; font-size:20px; font-weight:600; color:#fff; white-space:nowrap;
}

/* ============ STRIP ============ */
.rs-strip {
  background:#fff; border-bottom:1px solid rgba(61,44,42,0.08);
  padding:16px 20px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .rs-strip { padding:18px 40px; } }
.rs-strip-avatar {
  width:52px; height:52px; border-radius:50%; flex-shrink:0;
  object-fit:cover; object-position:center top;
  border:2.5px solid #C97C8A;
}
.rs-strip-name { font-family:'Fraunces',serif; font-size:16px; font-weight:600; color:#3D2C2A; }
.rs-strip-sub { font-family:'Caveat',cursive; font-size:16px; color:#C97C8A; margin-top:1px; }
.rs-strip-spacer { flex:1; }
.rs-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#3D2C2A; color:#FBF6F0; font-size:11px; font-weight:700;
  letter-spacing:.06em; padding:11px 20px; border-radius:100px; text-decoration:none; white-space:nowrap;
  transition:background .2s;
}
.rs-strip-cta:hover { background:#C97C8A; }

/* ============ BODY ============ */
.rs-body { max-width:1200px; margin:0 auto; padding:64px 20px 170px; }
@media(min-width:640px){ .rs-body { padding:72px 36px 170px; } }
@media(min-width:1024px){ .rs-body { display:grid; grid-template-columns:1fr 320px; gap:60px; padding:80px 36px 130px; } }

.rs-sh { text-align:center; margin-bottom:38px; }
@media(min-width:1024px){ .rs-sh { text-align:left; } }
.rs-sh-script { font-family:'Caveat',cursive; font-size:clamp(22px,4vw,30px); font-weight:600; color:#C97C8A; display:block; margin-bottom:2px; }
.rs-sh-title { font-family:'Fraunces',serif; font-size:clamp(28px,5vw,44px); font-weight:600; color:#3D2C2A; line-height:1.05; }

/* ============ POLAROID BOARD ============ */
.rs-gallery { margin-bottom:76px; }
.rs-board {
  display:grid; grid-template-columns:1fr 1fr; gap:26px 14px;
  padding:8px 4px;
}
@media(min-width:768px){ .rs-board { grid-template-columns:repeat(3,1fr); gap:34px 22px; } }

.rs-pol {
  display:block; text-decoration:none; background:#fff;
  padding:10px 10px 14px;
  box-shadow:0 10px 28px rgba(61,44,42,0.14);
  transform:rotate(var(--rot,0deg));
  transition:transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s;
  position:relative; cursor:pointer;
}
.rs-pol:hover {
  transform:rotate(0deg) translateY(-8px) scale(1.03);
  box-shadow:0 20px 44px rgba(61,44,42,0.22);
  z-index:5;
}
.rs-pol:first-child { grid-column:1/-1; }
@media(min-width:768px){ .rs-pol:first-child { grid-column:span 2; } }

.rs-pol-tape {
  position:absolute; top:-11px; left:50%; transform:translateX(-50%) rotate(-3deg);
  width:76px; height:24px; background:rgba(201,124,138,0.4); z-index:3;
  clip-path:polygon(3% 0, 97% 6%, 100% 94%, 0 100%);
}
.rs-pol-img { position:relative; overflow:hidden; aspect-ratio:1; background:#f3ece5; }
.rs-pol:first-child .rs-pol-img { aspect-ratio:4/3; }
.rs-pol-img img {
  width:100%; height:100%; object-fit:cover; display:block;
  transition:transform .8s cubic-bezier(.16,1,.3,1);
}
.rs-pol:hover .rs-pol-img img { transform:scale(1.07); }
.rs-pol-cap {
  font-family:'Caveat',cursive; font-size:19px; font-weight:600; color:#3D2C2A;
  text-align:center; padding-top:10px;
}

/* ============ STORY ============ */
.rs-story { margin-bottom:72px; }
.rs-story-card {
  background:#fff; border-radius:26px; padding:46px 42px;
  box-shadow:0 14px 40px rgba(61,44,42,0.1);
  position:relative; overflow:hidden;
}
@media(max-width:640px){ .rs-story-card { padding:30px 22px; border-radius:20px; } }
.rs-story-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:5px;
  background:linear-gradient(to right, #C97C8A, #E8B4BE, #C97C8A);
}
.rs-story-heart {
  position:absolute; bottom:-34px; right:-18px;
  font-size:150px; opacity:.05; pointer-events:none; transform:rotate(-14deg);
}
.rs-story-kicker { font-family:'Caveat',cursive; font-size:24px; font-weight:600; color:#C97C8A; margin-bottom:14px; }
.rs-story-quote {
  font-family:'Fraunces',serif; font-style:italic; font-weight:400;
  font-size:clamp(19px,3.4vw,27px); line-height:1.5; color:#3D2C2A; margin-bottom:24px;
}
.rs-story-text { font-size:14px; line-height:2; color:rgba(61,44,42,0.6); }
.rs-story-text + .rs-story-text { margin-top:14px; }
.rs-story-text strong { color:#3D2C2A; font-weight:700; }

.rs-story-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:30px; }
.rs-stat {
  background:#FBF6F0; border-radius:16px; padding:18px 10px; text-align:center;
  border:1.5px dashed rgba(201,124,138,0.4);
}
.rs-stat-n { font-family:'Fraunces',serif; font-size:30px; font-weight:600; color:#C97C8A; line-height:1; }
.rs-stat-l { font-size:10.5px; color:rgba(61,44,42,0.5); margin-top:6px; line-height:1.4; }

.rs-story-sig {
  margin-top:32px; padding-top:26px; border-top:1.5px dashed rgba(61,44,42,0.15);
  display:flex; align-items:center; gap:14px;
}
.rs-story-sig-av { width:54px; height:54px; border-radius:50%; object-fit:cover; object-position:center top; border:2.5px solid #C97C8A; }
.rs-story-sig-name { font-family:'Caveat',cursive; font-size:24px; font-weight:700; color:#3D2C2A; }
.rs-story-sig-role { font-size:11px; color:rgba(61,44,42,0.45); margin-top:1px; }

/* ============ MOMENTS ============ */
.rs-moments { margin-bottom:56px; }
.rs-mom-grid { display:grid; gap:14px; }
@media(min-width:640px){ .rs-mom-grid { grid-template-columns:1fr 1fr; } }
.rs-mom {
  background:#fff; border-radius:20px; padding:24px 22px;
  box-shadow:0 8px 22px rgba(61,44,42,0.08);
  display:flex; align-items:flex-start; gap:16px;
  transition:transform .3s, box-shadow .3s;
}
.rs-mom:hover { transform:translateY(-4px); box-shadow:0 14px 32px rgba(61,44,42,0.14); }
.rs-mom-ico {
  width:48px; height:48px; border-radius:14px; background:#FBEFF1;
  display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:22px;
}
.rs-mom-t { font-family:'Fraunces',serif; font-size:17px; font-weight:600; color:#3D2C2A; margin-bottom:4px; }
.rs-mom-d { font-size:12.5px; line-height:1.7; color:rgba(61,44,42,0.55); }

/* ============ SIDEBAR ============ */
.rs-sidebar { display:flex; flex-direction:column; gap:14px; }

.rs-ct-card {
  background:#3D2C2A; border-radius:24px; padding:28px 26px;
  position:relative; overflow:hidden;
}
.rs-ct-card::before {
  content:'♡'; position:absolute; top:-24px; right:-10px;
  font-size:110px; color:rgba(201,124,138,0.15); pointer-events:none; transform:rotate(12deg);
}
.rs-ct-label { font-family:'Caveat',cursive; font-size:22px; font-weight:600; color:#E8B4BE; margin-bottom:6px; }
.rs-ct-title { font-family:'Fraunces',serif; font-size:24px; font-weight:600; color:#FBF6F0; margin-bottom:8px; line-height:1.15; }
.rs-ct-sub { font-size:12px; color:rgba(251,246,240,0.5); margin-bottom:22px; line-height:1.7; }
.rs-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#C97C8A; color:#fff; font-size:12px; font-weight:700; letter-spacing:.04em;
  padding:15px; border-radius:100px; text-decoration:none;
  box-shadow:0 8px 22px rgba(201,124,138,0.35);
  transition:transform .2s, opacity .2s; margin-bottom:8px;
}
.rs-ct-btn:hover { transform:translateY(-2px); opacity:.92; }
.rs-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:15px; border-radius:100px; text-decoration:none;
  transition:opacity .2s; margin-bottom:12px;
}
.rs-ct-wa:hover { opacity:.9; }
.rs-ct-note { font-family:'Caveat',cursive; font-size:17px; color:rgba(251,246,240,0.4); text-align:center; }

.rs-conn-card {
  background:#fff; border-radius:22px; padding:22px;
  box-shadow:0 8px 22px rgba(61,44,42,0.08);
}
.rs-conn-head { font-family:'Caveat',cursive; font-size:22px; font-weight:600; color:#C97C8A; margin-bottom:8px; }
.rs-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1.5px dashed rgba(61,44,42,0.1);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.rs-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.rs-conn-row:hover { opacity:.65; }
.rs-conn-l { display:flex; align-items:center; gap:12px; }
.rs-conn-ico { width:38px; height:38px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.rs-conn-lbl { font-size:13.5px; font-weight:600; color:#3D2C2A; }
.rs-conn-sub { font-size:11px; color:rgba(61,44,42,0.4); }

.rs-loc-card {
  background:#fff; border-radius:20px; padding:18px 20px;
  box-shadow:0 8px 22px rgba(61,44,42,0.08);
}
.rs-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#3D2C2A; transition:opacity .2s; }
.rs-loc-row:hover { opacity:.7; }
.rs-loc-ico { width:44px; height:44px; border-radius:14px; background:#FBEFF1; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.rs-loc-name { font-family:'Fraunces',serif; font-size:15px; font-weight:600; }
.rs-loc-sub { font-size:11px; color:rgba(61,44,42,0.4); margin-top:2px; }

.rs-share-card {
  background:#FBEFF1; border-radius:18px; padding:16px 18px;
  border:1.5px dashed rgba(201,124,138,0.5);
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.rs-share-lbl { font-family:'Caveat',cursive; font-size:17px; color:#C97C8A; margin-bottom:1px; }
.rs-share-url { font-size:13px; font-weight:700; color:#3D2C2A; }

/* ============ MOBILE BAR ============ */
.rs-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(251,246,240,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(61,44,42,0.1);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .rs-bar { display:none; } }
.rs-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#3D2C2A; color:#FBF6F0; font-size:12px; font-weight:700;
  padding:14px; border-radius:100px; text-decoration:none;
}
.rs-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:14px; border-radius:100px; text-decoration:none;
}
@media(max-width:374px){ .rs-hero-h1 { font-size:36px; } }
`;

const POLAROIDS = [
  { caption: 'Prima pagină a poveștii ♡', rotate: '-1.5deg' },
  { caption: 'Zâmbete mici, emoții mari', rotate: '2deg' },
  { caption: 'Da-ul care schimbă tot', rotate: '-2.4deg' },
  { caption: 'Ziua botezului', rotate: '1.6deg' },
  { caption: 'Împreună, pentru totdeauna', rotate: '-1deg' },
];

export default async function RalucaStoryLensPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_300,h_300,c_fill,g_face/${p.profile_image}.jpg`;
  const clickTarget = p.instagram_url || p.facebook_url || '#';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.vibeinvite.ro/fotograf-bucuresti-raluca-storylens',
    name: 'Raluca StoryLens',
    description: 'Fotograf de evenimente în București, specializată în botezuri și cununii.',
    url: 'https://www.vibeinvite.ro/fotograf-bucuresti-raluca-storylens',
    telephone: '+40773824267',
    address: { '@type': 'PostalAddress', addressLocality: 'București', addressCountry: 'RO' },
    image: profileImg,
    sameAs: [p.facebook_url, p.instagram_url].filter(Boolean),
    areaServed: 'București, România',
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackView slug={p.slug} />
      <div className="rs rs-paper">

        {/* NAV */}
        <nav className="rs-nav" id="rs-nav">
          <a href="/servicii-nunta" className="rs-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="rs-nav-logo">Raluca <span>StoryLens</span></div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="rs-hero">
          <div className="rs-hero-kicker">Fotograf Verificat · VibeInvite · București</div>
          <h1 className="rs-hero-h1">
            Raluca <em>StoryLens</em>
          </h1>
          <p className="rs-hero-sub">~ fiecare familie are o poveste. eu o păstrez în imagini ~</p>

          <div className="rs-hero-trio">
            {galleryIds[1] && (
              <div className="rs-trio-card t1">
                <img src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_500/${galleryIds[1]}.jpg`} alt={`${p.name} – fotografie botez București`} loading="eager" />
              </div>
            )}
            {galleryIds[0] && (
              <div className="rs-trio-card t2">
                <img src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_500/${galleryIds[0]}.jpg`} alt={`${p.name} – fotograf evenimente București`} loading="eager" />
              </div>
            )}
            {galleryIds[2] && (
              <div className="rs-trio-card t3">
                <img src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_500/${galleryIds[2]}.jpg`} alt={`${p.name} – fotografie cununie București`} loading="eager" />
              </div>
            )}
          </div>

          <div className="rs-hero-actions">
            {p.phone && (
              <a href={`tel:${p.phone}`} className="rs-btn">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
                Sună Acum
              </a>
            )}
            {p.instagram_url && (
              <a href={p.instagram_url} target="_blank" rel="noopener noreferrer" className="rs-btn-soft">
                Instagram →
              </a>
            )}
            {p.facebook_url && (
              <a href={p.facebook_url} target="_blank" rel="noopener noreferrer" className="rs-btn-soft">
                Facebook →
              </a>
            )}
          </div>
        </div>

        {/* RIBBON */}
        <div className="rs-ribbon">
          <div className="rs-ribbon-inner">
            {['botezuri ♡', 'cununii ♡', 'familii ♡', 'bebeluși ♡', 'emoții ♡', 'povești ♡', 'botezuri ♡', 'cununii ♡', 'familii ♡', 'bebeluși ♡', 'emoții ♡', 'povești ♡'].map((item, i) => (
              <div key={i} className="rs-ribbon-item">{item}</div>
            ))}
          </div>
        </div>

        {/* STRIP */}
        <div className="rs-strip">
          <img className="rs-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="rs-strip-name">{p.name}</div>
            <div className="rs-strip-sub">botezuri & cununii · {p.oras}</div>
          </div>
          <div className="rs-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="rs-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="rs-body">
          <div>

            {/* POLAROID BOARD */}
            {galleryIds.length > 0 && (
              <div className="rs-gallery">
                <div className="rs-sh">
                  <span className="rs-sh-script">din albumul meu</span>
                  <h2 className="rs-sh-title">Momente Păstrate</h2>
                </div>
                <div className="rs-board">
                  {galleryIds.map((id, i) => (
                    <RsGalleryItem
                      key={id}
                      href={clickTarget}
                      slug={p.slug}
                      imgSrc={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_900/${id}.jpg`}
                      alt={`Raluca StoryLens – ${POLAROIDS[i]?.caption || 'fotografie eveniment București'}`}
                      caption={POLAROIDS[i]?.caption || 'Moment de poveste'}
                      rotate={POLAROIDS[i]?.rotate || '0deg'}
                      eager={i === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STORY */}
            <div className="rs-story">
              <div className="rs-sh">
                <span className="rs-sh-script">cine sunt</span>
                <h2 className="rs-sh-title">Povestea Mea</h2>
              </div>
              <div className="rs-story-card">
                <span className="rs-story-heart">♡</span>
                <div className="rs-story-kicker">~ cu drag, Raluca</div>
                <p className="rs-story-quote">
                  „Cele mai prețioase amintiri nu sunt cele perfecte — sunt cele adevărate."
                </p>
                <p className="rs-story-text">
                  Sunt <strong>Raluca</strong>, fotograf de evenimente din <strong>București</strong>, specializată în <strong>botezuri și cununii</strong>. Iubesc momentele mici care spun povești mari: mânuțele unui bebeluș, emoția părinților, privirea dintre doi oameni care își spun „da".
                </p>
                <p className="rs-story-text">
                  Lucrez cald, discret și cu răbdare — mai ales cu cei mici, care au propriul lor ritm. Rezultatul: imagini naturale, luminoase, pline de viață, pe care le vei privi cu drag peste ani.
                </p>
                <p className="rs-story-text">
                  Disponibilă în <strong>București și împrejurimi</strong> pentru botezuri, cununii civile și religioase, și ședințe foto de familie.
                </p>
                <div className="rs-story-stats">
                  <div className="rs-stat"><div className="rs-stat-n">♡</div><div className="rs-stat-l">Botezuri cu suflet</div></div>
                  <div className="rs-stat"><div className="rs-stat-n">100+</div><div className="rs-stat-l">Povești fotografiate</div></div>
                  <div className="rs-stat"><div className="rs-stat-n">∞</div><div className="rs-stat-l">Emoții păstrate</div></div>
                </div>
                <div className="rs-story-sig">
                  <img className="rs-story-sig-av" src={profileImg} alt={p.name} />
                  <div>
                    <div className="rs-story-sig-name">Raluca ♡</div>
                    <div className="rs-story-sig-role">StoryLens · Fotograf Botezuri & Cununii · București</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MOMENTS */}
            <div className="rs-moments">
              <div className="rs-sh">
                <span className="rs-sh-script">ce fotografiez</span>
                <h2 className="rs-sh-title">Serviciile Mele</h2>
              </div>
              <div className="rs-mom-grid">
                <div className="rs-mom">
                  <div className="rs-mom-ico">👶</div>
                  <div>
                    <div className="rs-mom-t">Botezuri</div>
                    <div className="rs-mom-d">De la pregătiri până la petrecere — prima zi mare a celui mic, păstrată cu delicatețe.</div>
                  </div>
                </div>
                <div className="rs-mom">
                  <div className="rs-mom-ico">💍</div>
                  <div>
                    <div className="rs-mom-t">Cununii</div>
                    <div className="rs-mom-d">Civile și religioase — momentul „da" și toate emoțiile din jurul lui.</div>
                  </div>
                </div>
                <div className="rs-mom">
                  <div className="rs-mom-ico">👨‍👩‍👧</div>
                  <div>
                    <div className="rs-mom-t">Ședințe de Familie</div>
                    <div className="rs-mom-d">Portrete naturale, acasă sau în aer liber, cu cei dragi aproape.</div>
                  </div>
                </div>
                <div className="rs-mom">
                  <div className="rs-mom-ico">🎉</div>
                  <div>
                    <div className="rs-mom-t">Evenimente Private</div>
                    <div className="rs-mom-d">Aniversări și sărbători de familie — fiecare zâmbet, în cadru.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="rs-sidebar">

            <div className="rs-ct-card">
              <div className="rs-ct-label">~ hai să vorbim</div>
              <div className="rs-ct-title">Rezervă-ți data</div>
              <p className="rs-ct-sub">Scrie-mi pe WhatsApp sau sună-mă pentru disponibilitate și o ofertă personalizată.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="rs-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="rs-ct-wa" />}
              <p className="rs-ct-note">răspund rapid, promit ♡</p>
            </div>

            <div className="rs-conn-card">
              <div className="rs-conn-head">~ mă găsești aici</div>
              <SocialLinks
                provider={p}
                rowClass="rs-conn-row"
                leftClass="rs-conn-l"
                icoClass="rs-conn-ico"
                lblClass="rs-conn-lbl"
                subClass="rs-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="rs-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="rs-loc-row">
                  <div className="rs-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="#C97C8A" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="rs-loc-name">{p.oras}</div>
                    <div className="rs-loc-sub">Disponibilă și în împrejurimi · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="rs-share-card">
              <div>
                <div className="rs-share-lbl">~ trimite mai departe</div>
                <div className="rs-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="rs-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="rs-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="rs-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('rs-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}