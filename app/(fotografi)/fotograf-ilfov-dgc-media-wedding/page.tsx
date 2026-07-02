// app/(fotografi)/fotograf-ilfov-dgc-media-wedding/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';
import DgcGalleryItem from './DgcGalleryItem';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-ilfov-dgc-media-wedding';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
header, footer, .cookie-consent { display:none !important; }

@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,600;1,6..96,900&family=Archivo:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.dg { font-family:'Archivo',sans-serif; background:#F7F3ED; color:#191512; min-height:100vh; overflow-x:hidden; }
.dg ::selection { background:#191512; color:#F7F3ED; }

/* ============ NAV ============ */
.dg-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:16px 20px; display:flex; align-items:center; justify-content:space-between;
  transition:all .4s ease;
}
@media(min-width:768px){ .dg-nav { padding:18px 40px; } }
.dg-nav.scrolled {
  background:rgba(247,243,237,0.96); backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(25,21,18,0.12);
  padding:12px 20px;
}
@media(min-width:768px){ .dg-nav.scrolled { padding:12px 40px; } }
.dg-nav-back {
  display:flex; align-items:center; gap:6px; font-size:10px; font-weight:600;
  letter-spacing:.16em; text-transform:uppercase; text-decoration:none;
  color:rgba(25,21,18,0.5); transition:color .2s;
}
.dg-nav-back:hover { color:#191512; }
.dg-nav-logo {
  font-family:'Bodoni Moda',serif; font-size:17px; font-weight:700; font-style:italic;
  color:#191512; letter-spacing:.02em;
}
.dg-nav-logo span { color:#A85C3F; }

/* ============ MASTHEAD ============ */
.dg-mast {
  padding:104px 20px 0; text-align:center; position:relative;
}
@media(min-width:768px){ .dg-mast { padding:128px 40px 0; } }

.dg-mast-pre {
  display:inline-flex; align-items:center; gap:14px;
  font-size:9px; font-weight:600; letter-spacing:.34em; text-transform:uppercase;
  color:rgba(25,21,18,0.45); margin-bottom:22px;
  animation:dgUp .8s ease .1s both;
}
@media(min-width:768px){ .dg-mast-pre { font-size:10px; } }
.dg-mast-pre::before, .dg-mast-pre::after {
  content:''; display:block; width:36px; height:1px; background:rgba(25,21,18,0.25);
}

.dg-mast-h1 {
  font-family:'Bodoni Moda',serif; font-weight:900;
  font-size:clamp(56px,15vw,190px); line-height:.82; letter-spacing:-.01em;
  color:#191512; text-transform:uppercase;
  animation:dgUp .9s ease .25s both;
}
.dg-mast-h1 em {
  display:block; font-style:italic; font-weight:400; text-transform:none;
  font-size:clamp(30px,7vw,90px); color:#A85C3F; margin-top:2px; letter-spacing:0;
}

.dg-mast-meta {
  margin:26px auto 0; max-width:820px;
  display:flex; align-items:center; justify-content:center; flex-wrap:wrap;
  gap:8px 0;
  border-top:1px solid #191512; border-bottom:1px solid #191512;
  padding:12px 8px;
  animation:dgUp .9s ease .4s both;
}
.dg-mast-meta-item {
  font-size:9px; font-weight:600; letter-spacing:.22em; text-transform:uppercase;
  color:#191512; padding:0 14px; white-space:nowrap;
  border-right:1px solid rgba(25,21,18,0.25);
}
@media(min-width:768px){ .dg-mast-meta-item { font-size:10.5px; padding:0 22px; } }
.dg-mast-meta-item:last-child { border-right:none; }
.dg-mast-meta-item.hot { color:#A85C3F; }

@keyframes dgUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }

/* ============ COVER ============ */
.dg-cover-wrap {
  padding:34px 20px 0; max-width:1240px; margin:0 auto; position:relative;
}
@media(min-width:768px){ .dg-cover-wrap { padding:44px 40px 0; } }

.dg-cover {
  position:relative; overflow:hidden;
  border:1px solid #191512;
  box-shadow:14px 14px 0 #191512;
  animation:dgCover 1.2s cubic-bezier(.16,1,.3,1) .5s both;
}
@media(max-width:640px){ .dg-cover { box-shadow:8px 8px 0 #191512; } }
@keyframes dgCover {
  from { opacity:0; transform:translateY(40px); clip-path:inset(12% 8% 12% 8%); }
  to { opacity:1; transform:translateY(0); clip-path:inset(0 0 0 0); }
}
.dg-cover img {
  width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; display:block;
  transition:transform 8s ease;
}
@media(max-width:640px){ .dg-cover img { aspect-ratio:4/3; } }
.dg-cover:hover img { transform:scale(1.05); }

.dg-cover-tag {
  position:absolute; top:16px; left:16px;
  background:#F7F3ED; border:1px solid #191512;
  font-size:9px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
  padding:7px 14px; color:#191512;
}
.dg-cover-caption {
  display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding:14px 4px 0; max-width:1240px; margin:0 auto;
}
.dg-cover-caption-l {
  font-family:'Bodoni Moda',serif; font-style:italic; font-size:14px; color:rgba(25,21,18,0.6);
}
.dg-cover-caption-r {
  font-size:9px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:rgba(25,21,18,0.4);
  white-space:nowrap;
}

/* ============ CTA ROW ============ */
.dg-cta-row {
  display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap;
  padding:38px 20px 30px;
  animation:dgUp .9s ease .7s both;
}
.dg-btn-main {
  display:flex; align-items:center; gap:9px;
  background:#191512; color:#F7F3ED; font-size:11px; font-weight:700;
  letter-spacing:.14em; text-transform:uppercase;
  padding:16px 32px; text-decoration:none; border:1px solid #191512;
  transition:all .25s;
}
.dg-btn-main:hover { background:#A85C3F; border-color:#A85C3F; }
.dg-btn-ghost {
  display:flex; align-items:center; gap:9px;
  background:transparent; color:#191512; font-size:11px; font-weight:600;
  letter-spacing:.14em; text-transform:uppercase;
  padding:16px 28px; text-decoration:none; border:1px solid rgba(25,21,18,0.3);
  transition:all .25s;
}
.dg-btn-ghost:hover { border-color:#191512; background:rgba(25,21,18,0.04); }

/* ============ STRIP ============ */
.dg-strip {
  background:#191512; padding:16px 20px;
  display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .dg-strip { padding:18px 40px; } }
.dg-strip-avatar {
  width:50px; height:50px; flex-shrink:0;
  object-fit:cover; object-position:center top;
  border:1px solid rgba(247,243,237,0.3);
}
.dg-strip-name {
  font-family:'Bodoni Moda',serif; font-size:16px; font-weight:700; font-style:italic;
  color:#F7F3ED;
}
.dg-strip-sub { font-size:10px; color:rgba(247,243,237,0.45); margin-top:2px; letter-spacing:.14em; text-transform:uppercase; }
.dg-strip-spacer { flex:1; }
.dg-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#F7F3ED; color:#191512; font-size:11px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase;
  padding:11px 20px; text-decoration:none; white-space:nowrap;
  transition:background .2s;
}
.dg-strip-cta:hover { background:#A85C3F; color:#F7F3ED; }

/* ============ BODY ============ */
.dg-body { max-width:1240px; margin:0 auto; padding:64px 20px 160px; }
@media(min-width:640px){ .dg-body { padding:76px 40px 160px; } }
@media(min-width:1024px){ .dg-body { display:grid; grid-template-columns:1fr 330px; gap:64px; padding:80px 40px 120px; } }

.dg-sh { display:flex; align-items:baseline; gap:16px; margin-bottom:34px; border-bottom:1px solid #191512; padding-bottom:14px; }
.dg-sh-no {
  font-family:'Bodoni Moda',serif; font-style:italic; font-size:15px; color:#A85C3F; white-space:nowrap;
}
.dg-sh-title {
  font-family:'Bodoni Moda',serif; font-size:clamp(28px,5vw,46px); font-weight:900;
  color:#191512; letter-spacing:-.01em; text-transform:uppercase; line-height:1;
}
.dg-sh-title em { font-style:italic; font-weight:400; text-transform:none; color:#A85C3F; }
.dg-sh-fill { flex:1; }
.dg-sh-side {
  font-size:9px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
  color:rgba(25,21,18,0.35); white-space:nowrap; display:none;
}
@media(min-width:640px){ .dg-sh-side { display:block; } }

/* ============ GALLERY ============ */
.dg-gallery { margin-bottom:72px; }
.dg-gal { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
@media(min-width:768px){ .dg-gal { grid-template-columns:repeat(3,1fr); gap:18px; } }

.dg-gi {
  position:relative; overflow:hidden; cursor:pointer; display:block;
  aspect-ratio:2/3; background:#e8e1d6;
  border:1px solid #191512;
}
.dg-gi:nth-child(1) { grid-column:1/-1; aspect-ratio:16/9; }
@media(max-width:640px){ .dg-gi:nth-child(1) { aspect-ratio:4/3; } }
.dg-gi:nth-child(even) { transform:translateY(0); }
@media(min-width:768px){
  .dg-gi:nth-child(3) { transform:translateY(24px); }
}

.dg-gi img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:saturate(.96);
  transition:transform .9s cubic-bezier(.16,1,.3,1), filter .4s ease;
}
.dg-gi:hover img { transform:scale(1.06); filter:saturate(1.08); }

.dg-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(25,21,18,0.88) 0%, transparent 52%);
  opacity:0; transition:opacity .4s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:18px;
}
.dg-gi:hover .dg-gi-mask { opacity:1; }
.dg-gi-label {
  font-family:'Bodoni Moda',serif; font-style:italic; font-size:16px;
  color:#F7F3ED; margin-bottom:10px;
}
.dg-gi-cta {
  display:inline-flex; align-items:center; gap:6px;
  background:#F7F3ED; color:#191512; font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
  padding:8px 16px; text-decoration:none; width:fit-content;
}

/* ============ LETTER (ABOUT) ============ */
.dg-letter { margin-bottom:72px; }
.dg-letter-card {
  background:#FFFDF9; border:1px solid #191512;
  box-shadow:10px 10px 0 rgba(25,21,18,0.08);
  padding:48px 44px; position:relative;
}
@media(max-width:640px){ .dg-letter-card { padding:30px 22px; box-shadow:6px 6px 0 rgba(25,21,18,0.08); } }

.dg-letter-kicker {
  font-size:9px; font-weight:700; letter-spacing:.26em; text-transform:uppercase;
  color:#A85C3F; margin-bottom:22px; display:flex; align-items:center; gap:12px;
}
.dg-letter-kicker::after { content:''; flex:1; height:1px; background:rgba(25,21,18,0.15); }

.dg-letter-quote {
  font-family:'Bodoni Moda',serif; font-weight:400; font-style:italic;
  font-size:clamp(21px,3.6vw,32px); line-height:1.4; color:#191512;
  margin-bottom:28px;
}
.dg-letter-quote strong { font-weight:700; font-style:normal; color:#A85C3F; }

.dg-letter-text {
  font-size:14px; line-height:2; color:rgba(25,21,18,0.65);
}
.dg-letter-text + .dg-letter-text { margin-top:16px; }
.dg-letter-text strong { color:#191512; font-weight:600; }

.dg-letter-text.dropcap::first-letter {
  font-family:'Bodoni Moda',serif; font-weight:900;
  font-size:64px; line-height:.8; color:#A85C3F;
  float:left; padding:8px 12px 0 0;
}

.dg-letter-sig {
  margin-top:34px; padding-top:26px; border-top:1px solid rgba(25,21,18,0.12);
  display:flex; align-items:center; gap:16px;
}
.dg-letter-sig-av {
  width:52px; height:52px; object-fit:cover; object-position:center top;
  border:1px solid #191512;
}
.dg-letter-sig-name { font-family:'Bodoni Moda',serif; font-style:italic; font-size:17px; font-weight:700; color:#191512; }
.dg-letter-sig-role { font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:rgba(25,21,18,0.4); margin-top:3px; }

/* ============ INDEX (FEATURES) ============ */
.dg-index { margin-bottom:56px; }
.dg-index-list { border-top:1px solid #191512; }
.dg-index-item {
  display:flex; align-items:baseline; gap:16px;
  padding:20px 4px; border-bottom:1px solid rgba(25,21,18,0.18);
}
.dg-index-no {
  font-family:'Bodoni Moda',serif; font-style:italic; font-size:15px; color:#A85C3F;
  flex-shrink:0; width:34px;
}
.dg-index-t {
  font-size:13px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#191512;
  flex-shrink:0;
}
.dg-index-dots { flex:1; border-bottom:1px dotted rgba(25,21,18,0.3); transform:translateY(-4px); min-width:20px; }
.dg-index-d { font-size:12px; color:rgba(25,21,18,0.5); text-align:right; max-width:46%; line-height:1.5; }
@media(max-width:560px){
  .dg-index-item { flex-wrap:wrap; gap:8px 12px; }
  .dg-index-dots { display:none; }
  .dg-index-d { max-width:100%; text-align:left; width:100%; padding-left:46px; }
}

/* ============ SIDEBAR ============ */
.dg-sidebar { display:flex; flex-direction:column; gap:16px; }

.dg-contact-card {
  background:#191512; padding:30px 26px; position:relative;
  border:1px solid #191512;
}
.dg-ct-label {
  font-size:9px; font-weight:700; letter-spacing:.24em; text-transform:uppercase;
  color:#A85C3F; margin-bottom:10px;
}
.dg-ct-title {
  font-family:'Bodoni Moda',serif; font-style:italic; font-size:26px; font-weight:700;
  color:#F7F3ED; margin-bottom:8px; line-height:1.1;
}
.dg-ct-sub { font-size:12px; color:rgba(247,243,237,0.45); margin-bottom:22px; line-height:1.7; }
.dg-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#F7F3ED; color:#191512; font-size:11px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase;
  padding:15px; text-decoration:none;
  transition:background .2s, color .2s; margin-bottom:8px;
}
.dg-ct-btn:hover { background:#A85C3F; color:#F7F3ED; }
.dg-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:15px; text-decoration:none;
  transition:opacity .2s; margin-bottom:12px;
}
.dg-ct-wa:hover { opacity:.9; }
.dg-ct-note { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:rgba(247,243,237,0.3); text-align:center; }

.dg-facts-card {
  background:#FFFDF9; border:1px solid #191512;
}
.dg-fact {
  display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding:15px 20px; border-bottom:1px solid rgba(25,21,18,0.12);
}
.dg-fact:last-child { border-bottom:none; }
.dg-fact-l { font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:rgba(25,21,18,0.45); }
.dg-fact-v { font-family:'Bodoni Moda',serif; font-style:italic; font-size:15px; font-weight:700; color:#191512; text-align:right; }
.dg-fact-v.hot { color:#A85C3F; }

.dg-conn-card {
  background:#FFFDF9; border:1px solid #191512; padding:20px;
}
.dg-conn-head {
  font-size:9px; font-weight:700; letter-spacing:.24em; text-transform:uppercase;
  color:#A85C3F; margin-bottom:10px;
}
.dg-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(25,21,18,0.1);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.dg-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.dg-conn-row:hover { opacity:.6; }
.dg-conn-l { display:flex; align-items:center; gap:12px; }
.dg-conn-ico { width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.dg-conn-lbl { font-size:13px; font-weight:600; color:#191512; }
.dg-conn-sub { font-size:11px; color:rgba(25,21,18,0.4); }

.dg-loc-card { background:#FFFDF9; border:1px solid #191512; padding:16px 18px; }
.dg-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#191512; transition:opacity .2s; }
.dg-loc-row:hover { opacity:.7; }
.dg-loc-ico {
  width:42px; height:42px; background:#191512;
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.dg-loc-name { font-family:'Bodoni Moda',serif; font-style:italic; font-size:15px; font-weight:700; }
.dg-loc-sub { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:rgba(25,21,18,0.4); margin-top:2px; }

.dg-share-card {
  background:#191512; padding:16px 18px;
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.dg-share-lbl { font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:rgba(247,243,237,0.4); margin-bottom:3px; }
.dg-share-url { font-family:'Bodoni Moda',serif; font-style:italic; font-size:15px; font-weight:700; color:#F7F3ED; }

/* ============ MOBILE BAR ============ */
.dg-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(247,243,237,0.97); backdrop-filter:blur(20px);
  border-top:1px solid #191512;
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .dg-bar { display:none; } }
.dg-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#191512; color:#F7F3ED; font-size:11px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase;
  padding:14px; text-decoration:none;
}
.dg-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:12px; font-weight:700;
  padding:14px; text-decoration:none;
}
`;

const GALLERY_LABELS = [
  'Semnătura unui început',
  'Portret de familie',
  'Buchetul miresei',
  'Schimbul verighetelor',
];

export default async function DgcMediaWeddingPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill,g_face/${p.profile_image}.jpg`;
  const clickTarget = p.website_url || '#';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="dg">

        {/* NAV */}
        <nav className="dg-nav" id="dg-nav">
          <a href="/servicii-nunta" className="dg-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="dg-nav-logo">DGC <span>Media Wedding</span></div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* MASTHEAD */}
        <div className="dg-mast">
          <div className="dg-mast-pre">VibeInvite Prezintă · Foto &amp; Video</div>
          <h1 className="dg-mast-h1">
            DGC Media
            <em>Wedding</em>
          </h1>
          <div className="dg-mast-meta">
            <span className="dg-mast-meta-item">Ilfov · București</span>
            <span className="dg-mast-meta-item">Foto &amp; Video Complet</span>
            <span className="dg-mast-meta-item">Contract + Factură</span>
            <span className="dg-mast-meta-item hot">Sezon 2026–2027</span>
          </div>
        </div>

        {/* COVER */}
        <div className="dg-cover-wrap">
          <div className="dg-cover">
            <div className="dg-cover-tag">Ediția Nunților</div>
            {galleryIds[0] && (
              <img
                src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1600/${galleryIds[0]}.jpg`}
                alt={p.name}
              />
            )}
          </div>
          <div className="dg-cover-caption">
            <span className="dg-cover-caption-l">Documentăm totul — de la pregătiri până la ultimul dans.</span>
            <span className="dg-cover-caption-r">Fig. 01 — Cununia civilă</span>
          </div>
        </div>

        {/* CTA */}
        <div className="dg-cta-row">
          {p.phone && (
            <a href={`tel:${p.phone}`} className="dg-btn-main">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
              </svg>
              Sună Acum
            </a>
          )}
          {p.website_url && (
            <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="dg-btn-ghost">
              Website Oficial →
            </a>
          )}
        </div>

        {/* STRIP */}
        <div className="dg-strip">
          <img className="dg-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="dg-strip-name">DGC Media Wedding</div>
            <div className="dg-strip-sub">Foto-Video · {p.oras}, {p.judet}</div>
          </div>
          <div className="dg-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="dg-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="dg-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="dg-gallery">
                <div className="dg-sh">
                  <span className="dg-sh-no">No. 01</span>
                  <h2 className="dg-sh-title">Porto<em>foliu</em></h2>
                  <div className="dg-sh-fill" />
                  <span className="dg-sh-side">Selecție — Nunți 2025</span>
                </div>
                <div className="dg-gal">
                  {galleryIds.map((id, i) => (
                    <DgcGalleryItem
                      key={id}
                      href={clickTarget}
                      slug={p.slug}
                      imgSrc={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${id}.jpg`}
                      alt={`${p.name} – ${GALLERY_LABELS[i] || 'fotografie'}`}
                      label={GALLERY_LABELS[i]}
                      eager={i === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* LETTER */}
            <div className="dg-letter">
              <div className="dg-sh">
                <span className="dg-sh-no">No. 02</span>
                <h2 className="dg-sh-title">Scrisoarea <em>Editorului</em></h2>
                <div className="dg-sh-fill" />
                <span className="dg-sh-side">Despre DGC</span>
              </div>
              <div className="dg-letter-card">
                <div className="dg-letter-kicker">Misiunea noastră</div>
                <p className="dg-letter-quote">
                  „Fotografii profesionale, filmări de calitate, montaj modern și livrare rapidă — <strong>totul într-un singur pachet</strong> dedicat amintirilor care contează."
                </p>
                <p className="dg-letter-text dropcap">
                  Alegeți <strong>DGC Media Wedding</strong> pentru servicii foto-video complete și de încredere. Documentăm întreaga desfășurare a evenimentului, de la pregătiri până la ultimele momente ale petrecerii — fără să ratăm nimic din povestea voastră.
                </p>
                <p className="dg-letter-text">
                  Folosim <strong>echipamente moderne</strong> și o abordare creativă, dar adevărata noastră diferență este atenția la oameni. Ne implicăm, observăm, simțim și spunem povestea ta în imagini care rămân valabile peste ani.
                </p>
                <p className="dg-letter-text">
                  Oferim <strong>contract și factură fiscală</strong> pentru toate serviciile, iar calendarul nostru are <strong>date disponibile pentru sezonul 2026–2027</strong>. Rezervă din timp.
                </p>
                <div className="dg-letter-sig">
                  <img className="dg-letter-sig-av" src={profileImg} alt={p.name} />
                  <div>
                    <div className="dg-letter-sig-name">DGC Media Wedding SRL</div>
                    <div className="dg-letter-sig-role">{p.oras}, {p.judet} · Foto &amp; Video</div>
                  </div>
                </div>
              </div>
            </div>

            {/* INDEX */}
            <div className="dg-index">
              <div className="dg-sh">
                <span className="dg-sh-no">No. 03</span>
                <h2 className="dg-sh-title">Ce <em>Primești</em></h2>
                <div className="dg-sh-fill" />
                <span className="dg-sh-side">Sumar servicii</span>
              </div>
              <div className="dg-index-list">
                <div className="dg-index-item">
                  <span className="dg-index-no">I.</span>
                  <span className="dg-index-t">Foto &amp; Video Complet</span>
                  <span className="dg-index-dots" />
                  <span className="dg-index-d">De la pregătiri până la ultimul dans, totul documentat</span>
                </div>
                <div className="dg-index-item">
                  <span className="dg-index-no">II.</span>
                  <span className="dg-index-t">Montaj Modern</span>
                  <span className="dg-index-dots" />
                  <span className="dg-index-d">Editare cinematografică, stil actual</span>
                </div>
                <div className="dg-index-item">
                  <span className="dg-index-no">III.</span>
                  <span className="dg-index-t">Livrare Rapidă</span>
                  <span className="dg-index-dots" />
                  <span className="dg-index-d">Amintirile tale, gata în timp record</span>
                </div>
                <div className="dg-index-item">
                  <span className="dg-index-no">IV.</span>
                  <span className="dg-index-t">Contract + Factură Fiscală</span>
                  <span className="dg-index-dots" />
                  <span className="dg-index-d">Servicii oficiale, siguranță totală</span>
                </div>
                <div className="dg-index-item">
                  <span className="dg-index-no">V.</span>
                  <span className="dg-index-t">Date 2026–2027</span>
                  <span className="dg-index-dots" />
                  <span className="dg-index-d">Calendar deschis pentru ambele sezoane</span>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="dg-sidebar">

            <div className="dg-contact-card">
              <div className="dg-ct-label">Contact Direct</div>
              <div className="dg-ct-title">Rezervă-ți data</div>
              <p className="dg-ct-sub">Contactează-ne pentru disponibilitate și o ofertă personalizată pentru evenimentul tău.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="dg-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="dg-ct-wa" />}
              <p className="dg-ct-note">Răspundem rapid</p>
            </div>

            <div className="dg-facts-card">
              <div className="dg-fact"><span className="dg-fact-l">Servicii</span><span className="dg-fact-v">Foto &amp; Video</span></div>
              <div className="dg-fact"><span className="dg-fact-l">Zonă</span><span className="dg-fact-v">Ilfov · București</span></div>
              <div className="dg-fact"><span className="dg-fact-l">Acte</span><span className="dg-fact-v">Contract + Factură</span></div>
              <div className="dg-fact"><span className="dg-fact-l">Disponibilitate</span><span className="dg-fact-v hot">2026–2027</span></div>
            </div>

            {p.website_url && (
              <div className="dg-conn-card">
                <div className="dg-conn-head">Online</div>
                <SocialLinks
                  provider={p}
                  rowClass="dg-conn-row"
                  leftClass="dg-conn-l"
                  icoClass="dg-conn-ico"
                  lblClass="dg-conn-lbl"
                  subClass="dg-conn-sub"
                />
              </div>
            )}

            {p.maps_url && (
              <div className="dg-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="dg-loc-row">
                  <div className="dg-loc-ico">
                    <svg width="18" height="18" fill="none" stroke="#F7F3ED" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="dg-loc-name">{p.oras}, {p.judet}</div>
                    <div className="dg-loc-sub">Disponibili deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="dg-share-card">
              <div>
                <div className="dg-share-lbl">Distribuie profilul</div>
                <div className="dg-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="dg-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="dg-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="dg-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('dg-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}