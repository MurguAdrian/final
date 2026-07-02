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

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.dg { font-family:'Outfit',sans-serif; background:#FAFAF8; color:#1C1C1A; min-height:100vh; overflow-x:hidden; }

/* NAV */
.dg-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:16px 24px; display:flex; align-items:center; justify-content:space-between;
  transition:all .4s ease;
}
.dg-nav.scrolled {
  background:rgba(250,250,248,0.96); backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(28,28,26,0.08);
}
.dg-nav-back {
  display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase; text-decoration:none;
  color:rgba(255,255,255,0.7); transition:color .2s;
}
.dg-nav.scrolled .dg-nav-back { color:rgba(28,28,26,0.5); }
.dg-nav-back:hover { opacity:.7; }
.dg-nav-logo {
  font-family:'Outfit',sans-serif; font-size:16px; font-weight:800;
  color:#fff; letter-spacing:.04em; text-transform:uppercase;
  transition:color .2s;
}
.dg-nav.scrolled .dg-nav-logo { color:#1C1C1A; }
.dg-nav-logo span { color:#E8C547; }

/* HERO — full bleed cu overlay geometric */
.dg-hero {
  min-height:100svh; position:relative; overflow:hidden; background:#0F0F0D;
  display:flex; flex-direction:column;
}
@media(min-width:900px){ .dg-hero { flex-direction:row; } }

.dg-hero-media {
  position:relative; overflow:hidden;
  height:55svh; flex-shrink:0;
}
@media(min-width:900px){ .dg-hero-media { width:58%; height:100svh; } }

.dg-hero-media img {
  width:100%; height:100%; object-fit:cover; object-position:center top;
  filter:brightness(.8);
  animation:dgZoom 14s ease-in-out infinite alternate;
}
@keyframes dgZoom { from{transform:scale(1)} to{transform:scale(1.06)} }

.dg-hero-media::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(135deg, transparent 55%, rgba(15,15,13,0.9) 100%);
}
@media(min-width:900px){
  .dg-hero-media::after {
    background:linear-gradient(to right, transparent 60%, rgba(15,15,13,1) 100%);
  }
}

/* GEOMETRIC ACCENT */
.dg-hero-media::before {
  content:''; position:absolute; bottom:0; left:0; right:0; height:4px; z-index:5;
  background:linear-gradient(to right, #E8C547, #F0A500, #E8C547);
}

.dg-hero-text {
  flex:1; display:flex; flex-direction:column; justify-content:center;
  padding:40px 28px 60px; position:relative; z-index:10;
}
@media(min-width:900px){ .dg-hero-text { padding:80px 56px 80px 48px; } }

.dg-hero-badge {
  display:inline-flex; align-items:center; gap:8px; width:fit-content;
  background:rgba(232,197,71,0.12); border:1px solid rgba(232,197,71,0.25);
  color:#E8C547; font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
  padding:5px 14px; border-radius:3px; margin-bottom:24px;
  animation:dgUp .8s ease .2s both;
}
.dg-badge-dot { width:5px; height:5px; background:#E8C547; border-radius:50%; animation:dgPulse 1.4s ease-in-out infinite; }
@keyframes dgPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }

.dg-hero-h1 {
  font-family:'Outfit',sans-serif; font-weight:800;
  font-size:clamp(40px,9vw,88px); color:#fff; line-height:.92; letter-spacing:-.02em;
  margin-bottom:10px;
  animation:dgUp .9s ease .35s both;
}
.dg-hero-h1 .dg-gold { color:#E8C547; }
.dg-hero-h1 .dg-thin { font-weight:300; display:block; font-size:.6em; color:rgba(255,255,255,0.5); letter-spacing:.08em; text-transform:uppercase; font-size:clamp(14px,2vw,22px); margin-bottom:4px; }

.dg-hero-tagline {
  font-family:'Lora',serif; font-style:italic;
  font-size:clamp(14px,2vw,18px); color:rgba(255,255,255,0.45);
  line-height:1.65; max-width:380px; margin-bottom:32px;
  animation:dgUp .9s ease .5s both;
}
.dg-hero-tagline strong { color:rgba(255,255,255,0.75); font-style:normal; }

.dg-hero-guarantee {
  display:flex; align-items:center; gap:10px; margin-bottom:36px;
  animation:dgUp .9s ease .65s both;
}
.dg-hero-guarantee-badge {
  background:rgba(232,197,71,0.15); border:1px solid rgba(232,197,71,0.3);
  padding:7px 14px; border-radius:3px; font-size:11px; font-weight:700;
  color:#E8C547; letter-spacing:.06em;
}

.dg-hero-actions {
  display:flex; gap:12px; flex-wrap:wrap;
  animation:dgUp .9s ease .8s both;
}
.dg-hero-btn-main {
  display:flex; align-items:center; gap:8px;
  background:#E8C547; color:#0F0F0D; font-size:13px; font-weight:800; letter-spacing:.04em; text-transform:uppercase;
  padding:14px 28px; border-radius:3px; text-decoration:none;
  transition:transform .2s, box-shadow .2s;
  box-shadow:0 8px 28px rgba(232,197,71,0.3);
}
.dg-hero-btn-main:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(232,197,71,0.4); }
.dg-hero-btn-sec {
  display:flex; align-items:center; gap:8px;
  background:transparent; border:1px solid rgba(255,255,255,0.2);
  color:rgba(255,255,255,0.65); font-size:13px; font-weight:500;
  padding:14px 24px; border-radius:3px; text-decoration:none;
  transition:all .2s;
}
.dg-hero-btn-sec:hover { border-color:rgba(232,197,71,0.5); color:#E8C547; }

@keyframes dgUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

/* GOLD BAR */
.dg-gold-bar {
  background:#E8C547; padding:0; overflow:hidden; height:48px;
  display:flex; align-items:center;
}
.dg-gold-bar-inner {
  display:flex; width:max-content;
  animation:dgTick 22s linear infinite;
}
@keyframes dgTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.dg-gold-bar-item {
  display:flex; align-items:center; gap:10px; padding:0 24px;
  font-family:'Outfit',sans-serif; font-size:12px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; color:#0F0F0D; white-space:nowrap;
}
.dg-gold-bar-sep { opacity:.3; font-size:16px; }

/* STRIP */
.dg-strip {
  background:#fff; border-bottom:1px solid rgba(28,28,26,0.07);
  padding:14px 24px; display:flex; align-items:center; gap:14px;
  box-shadow:0 2px 12px rgba(0,0,0,0.04);
}
@media(min-width:640px){ .dg-strip { padding:16px 48px; } }
.dg-strip-avatar {
  width:50px; height:50px; border-radius:3px; flex-shrink:0;
  object-fit:cover; object-position:center top;
  border:2px solid rgba(232,197,71,0.4);
}
.dg-strip-name { font-size:14px; font-weight:800; color:#1C1C1A; text-transform:uppercase; letter-spacing:.02em; }
.dg-strip-sub { font-size:11px; color:rgba(28,28,26,0.45); margin-top:1px; }
.dg-strip-spacer { flex:1; }
.dg-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#E8C547; color:#0F0F0D; font-size:12px; font-weight:800;
  padding:9px 18px; border-radius:3px; text-decoration:none; white-space:nowrap;
  text-transform:uppercase; letter-spacing:.04em; transition:opacity .2s;
}
.dg-strip-cta:hover { opacity:.85; }

/* BODY */
.dg-body { max-width:1200px; margin:0 auto; padding:64px 20px 160px; }
@media(min-width:640px){ .dg-body { padding:72px 40px 160px; } }
@media(min-width:1024px){ .dg-body { display:grid; grid-template-columns:1fr 340px; gap:60px; padding:72px 48px 120px; } }

.dg-sh { margin-bottom:28px; }
.dg-sh-pre { font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:#E8C547; margin-bottom:6px; display:flex; align-items:center; gap:8px; }
.dg-sh-pre::before { content:''; display:block; width:16px; height:2px; background:#E8C547; }
.dg-sh-title { font-family:'Outfit',sans-serif; font-size:clamp(24px,4vw,36px); font-weight:800; color:#1C1C1A; letter-spacing:-.02em; }
.dg-sh-title em { font-style:italic; font-family:'Lora',serif; font-weight:400; color:rgba(28,28,26,0.45); }

/* GALLERY */
.dg-gallery { margin-bottom:56px; }
.dg-gal { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
@media(min-width:640px){ .dg-gal { grid-template-columns:repeat(4,1fr); } }

.dg-gi { position:relative; overflow:hidden; background:#e5e0d8; cursor:pointer; aspect-ratio:2/3; display:block; }
.dg-gi:nth-child(1) { grid-column:1/-1; aspect-ratio:16/9; }
@media(min-width:640px){ .dg-gi:nth-child(1) { grid-column:1/3; aspect-ratio:4/5; } }

.dg-gi img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.92) saturate(.95);
  transition:transform .8s cubic-bezier(.16,1,.3,1), filter .4s ease;
}
.dg-gi:hover img { transform:scale(1.07); filter:brightness(1) saturate(1.05); }

.dg-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(15,15,13,0.92) 0%, transparent 55%);
  opacity:0; transition:opacity .35s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:16px;
}
.dg-gi:hover .dg-gi-mask { opacity:1; }
.dg-gi-label { font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:.1em; margin-bottom:6px; font-weight:600; }
.dg-gi-cta {
  display:inline-flex; align-items:center; gap:5px;
  background:#E8C547; color:#0F0F0D; font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase;
  padding:6px 14px; border-radius:3px; text-decoration:none; width:fit-content;
}

/* ABOUT */
.dg-about { margin-bottom:56px; }
.dg-about-wrap { display:grid; gap:3px; }
@media(min-width:640px){ .dg-about-wrap { grid-template-columns:1fr 1fr; } }

.dg-about-left {
  background:#1C1C1A; padding:40px 32px; position:relative; overflow:hidden;
}
@media(max-width:639px){ .dg-about-left { padding:28px 22px; } }
.dg-about-left::before {
  content:''; position:absolute; top:0; left:0; width:100%; height:3px;
  background:linear-gradient(to right, #E8C547, #F0A500);
}
.dg-about-pre { font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#E8C547; margin-bottom:16px; }
.dg-about-quote {
  font-family:'Lora',serif; font-style:italic;
  font-size:clamp(17px,3vw,22px); color:#fff; line-height:1.55; margin-bottom:20px;
}
.dg-about-text { font-size:13.5px; line-height:1.9; color:rgba(255,255,255,0.45); }
.dg-about-text + .dg-about-text { margin-top:12px; }
.dg-about-text strong { color:rgba(255,255,255,0.8); font-weight:600; }

.dg-about-right {
  background:#E8C547; padding:40px 32px;
  display:flex; flex-direction:column; gap:0;
}
@media(max-width:639px){ .dg-about-right { padding:28px 22px; } }
.dg-feat { padding:18px 0; border-bottom:1px solid rgba(15,15,13,0.1); display:flex; align-items:flex-start; gap:14px; }
.dg-feat:last-child { border-bottom:none; }
.dg-feat-ico { font-size:22px; flex-shrink:0; margin-top:2px; }
.dg-feat-title { font-size:14px; font-weight:800; color:#0F0F0D; margin-bottom:3px; text-transform:uppercase; letter-spacing:.02em; }
.dg-feat-desc { font-size:12px; color:rgba(15,15,13,0.55); line-height:1.5; }

.dg-about-sig {
  margin-top:28px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.08);
  display:flex; align-items:center; gap:12px;
}
.dg-about-sig-av { width:44px; height:44px; border-radius:3px; object-fit:cover; object-position:center top; border:2px solid rgba(232,197,71,0.3); }
.dg-about-sig-name { font-size:13px; font-weight:800; color:#fff; text-transform:uppercase; letter-spacing:.04em; }
.dg-about-sig-role { font-size:11px; color:rgba(255,255,255,0.3); margin-top:1px; }

/* SIDEBAR */
.dg-sidebar { display:flex; flex-direction:column; gap:12px; }

.dg-contact-card {
  background:#1C1C1A; border-radius:4px; padding:26px;
  position:relative; overflow:hidden;
  border:1px solid rgba(232,197,71,0.15);
}
.dg-contact-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(to right, #E8C547, #F0A500);
}
.dg-ct-label { font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#E8C547; margin-bottom:8px; }
.dg-ct-title { font-family:'Outfit',sans-serif; font-size:22px; font-weight:800; color:#fff; margin-bottom:6px; letter-spacing:-.01em; }
.dg-ct-sub { font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:20px; line-height:1.7; }
.dg-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#E8C547; color:#0F0F0D; font-size:13px; font-weight:800;
  padding:14px; border-radius:3px; text-decoration:none; text-transform:uppercase; letter-spacing:.04em;
  transition:opacity .2s; margin-bottom:8px;
  box-shadow:0 6px 20px rgba(232,197,71,0.25);
}
.dg-ct-btn:hover { opacity:.9; }
.dg-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:13px; font-weight:700;
  padding:14px; border-radius:3px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.dg-ct-wa:hover { opacity:.9; }
.dg-ct-note { font-size:11px; color:rgba(255,255,255,0.25); text-align:center; }

.dg-trust-card {
  background:#fff; border-radius:4px; padding:18px 20px;
  border:1px solid rgba(28,28,26,0.07);
  display:grid; grid-template-columns:1fr 1fr; gap:2px;
}
.dg-trust-item { padding:12px; text-align:center; background:#FAFAF8; }
.dg-trust-n { font-size:22px; font-weight:800; color:#1C1C1A; letter-spacing:-.02em; }
.dg-trust-l { font-size:10px; color:rgba(28,28,26,0.45); margin-top:3px; letter-spacing:.06em; text-transform:uppercase; }

.dg-guarantee-card {
  background:#E8C547; border-radius:4px; padding:18px 20px;
  display:flex; align-items:center; gap:14px;
}
.dg-guarantee-ico { font-size:28px; flex-shrink:0; }
.dg-guarantee-title { font-size:13px; font-weight:800; color:#0F0F0D; text-transform:uppercase; letter-spacing:.04em; }
.dg-guarantee-desc { font-size:11px; color:rgba(15,15,13,0.55); margin-top:2px; line-height:1.4; }

.dg-conn-card {
  background:#fff; border-radius:4px; padding:20px;
  border:1px solid rgba(28,28,26,0.07);
}
.dg-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(28,28,26,0.06);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.dg-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.dg-conn-row:hover { opacity:.6; }
.dg-conn-l { display:flex; align-items:center; gap:12px; }
.dg-conn-ico { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.dg-conn-lbl { font-size:13.5px; font-weight:600; color:#1C1C1A; }
.dg-conn-sub { font-size:11px; color:rgba(28,28,26,0.38); }

.dg-loc-card {
  background:#fff; border-radius:4px; padding:16px 18px;
  border:1px solid rgba(28,28,26,0.07);
}
.dg-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#1C1C1A; transition:opacity .2s; }
.dg-loc-row:hover { opacity:.7; }
.dg-loc-ico { width:40px; height:40px; border-radius:8px; background:#FFF8DC; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.dg-loc-name { font-size:14px; font-weight:700; }
.dg-loc-sub { font-size:11px; color:rgba(28,28,26,0.4); margin-top:1px; }

.dg-share-card {
  background:#fff; border-radius:4px; padding:14px 16px;
  border:1px solid rgba(28,28,26,0.07);
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.dg-share-lbl { font-size:11px; color:rgba(28,28,26,0.4); margin-bottom:2px; }
.dg-share-url { font-size:13px; font-weight:700; color:#E8C547; }

/* MOBILE BAR */
.dg-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(250,250,248,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(28,28,26,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .dg-bar { display:none; } }
.dg-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#E8C547; color:#0F0F0D; font-size:13px; font-weight:800;
  padding:13px; border-radius:3px; text-decoration:none; text-transform:uppercase; letter-spacing:.04em;
  box-shadow:0 4px 16px rgba(232,197,71,0.3);
}
.dg-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:13px; font-weight:600;
  padding:13px; border-radius:3px; text-decoration:none;
}
@media(max-width:374px){ .dg-hero-h1 { font-size:34px; } }
`;

const GALLERY_LABELS = ['Lumină naturală', 'Portret de mireasă', 'Moment emoționant', 'Poveste vizuală'];

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
          <div className="dg-nav-logo">DGC <span>MEDIA</span></div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="dg-hero">
          <div className="dg-hero-media">
            {galleryIds[0] && (
              <img
                src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1400/${galleryIds[0]}.jpg`}
                alt={p.name}
              />
            )}
          </div>
          <div className="dg-hero-text">
            <div className="dg-hero-badge">
              <span className="dg-badge-dot" />
              Verificat · VibeInvite
            </div>
            <h1 className="dg-hero-h1">
              <span className="dg-thin">Foto-Video Premium</span>
              DGC <span className="dg-gold">Media</span>
            </h1>
            <p className="dg-hero-tagline">
              Documentăm întreaga desfășurare a evenimentului, de la pregătiri până la ultimele momente. <strong>Amintiri care contează.</strong>
            </p>
            <div className="dg-hero-guarantee">
              <div className="dg-hero-guarantee-badge">✓ Contract + Factură Fiscală</div>
              <div className="dg-hero-guarantee-badge">📅 Date 2026–2027</div>
            </div>
            <div className="dg-hero-actions">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="dg-hero-btn-main">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="dg-hero-btn-sec">
                  Website Oficial →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* GOLD BAR */}
        <div className="dg-gold-bar">
          <div className="dg-gold-bar-inner">
            {['FOTO · VIDEO', 'ILFOV · BUCUREȘTI', 'MONTAJ MODERN', 'LIVRARE RAPIDĂ', 'CONTRACT + FACTURĂ', 'DATE 2026-2027', 'FOTO · VIDEO', 'ILFOV · BUCUREȘTI', 'MONTAJ MODERN', 'LIVRARE RAPIDĂ', 'CONTRACT + FACTURĂ', 'DATE 2026-2027'].map((item, i) => (
              <div key={i} className="dg-gold-bar-item">
                {item}
                <span className="dg-gold-bar-sep">◆</span>
              </div>
            ))}
          </div>
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
                  <div className="dg-sh-pre">Portofoliu</div>
                  <h2 className="dg-sh-title">Munca <em>Noastră</em></h2>
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

            {/* ABOUT */}
            <div className="dg-about">
              <div className="dg-sh">
                <div className="dg-sh-pre">Despre noi</div>
                <h2 className="dg-sh-title">De ce <em>DGC?</em></h2>
              </div>
              <div className="dg-about-wrap">
                <div className="dg-about-left">
                  <div className="dg-about-pre">✦ Misiunea noastră</div>
                  <p className="dg-about-quote">
                    „Fotografii profesionale, filmări de calitate, montaj modern și livrare rapidă — totul într-un singur pachet."
                  </p>
                  <p className="dg-about-text">
                    La <strong>DGC Media Wedding</strong> documentăm întreaga desfășurare a evenimentului, de la pregătiri până la ultimele momente ale petrecerii. Nu ratem nimic.
                  </p>
                  <p className="dg-about-text">
                    Folosim <strong>echipamente moderne</strong> și o abordare creativă, dar adevărata noastră diferență este atenția la oameni. Ne implicăm, observăm, simțim și spunem povestea ta în imagini care rămân valabile peste ani.
                  </p>
                  <p className="dg-about-text">
                    Oferim <strong>contract și factură fiscală</strong> pentru toate serviciile. Disponibili pentru sezonul <strong>2026–2027</strong>.
                  </p>
                  <div className="dg-about-sig">
                    <img className="dg-about-sig-av" src={profileImg} alt={p.name} />
                    <div>
                      <div className="dg-about-sig-name">DGC Media Wedding SRL</div>
                      <div className="dg-about-sig-role">{p.oras}, {p.judet}</div>
                    </div>
                  </div>
                </div>
                <div className="dg-about-right">
                  <div className="dg-feat">
                    <div className="dg-feat-ico">📷</div>
                    <div>
                      <div className="dg-feat-title">Foto & Video Complet</div>
                      <div className="dg-feat-desc">Pachet integrat de la pregătiri până la ultimul dans.</div>
                    </div>
                  </div>
                  <div className="dg-feat">
                    <div className="dg-feat-ico">🎬</div>
                    <div>
                      <div className="dg-feat-title">Montaj Modern</div>
                      <div className="dg-feat-desc">Editare cinematografică, livrare rapidă în format digital.</div>
                    </div>
                  </div>
                  <div className="dg-feat">
                    <div className="dg-feat-ico">📄</div>
                    <div>
                      <div className="dg-feat-title">Contract + Factură</div>
                      <div className="dg-feat-desc">Servicii oficiale cu acte fiscale pentru liniștea ta.</div>
                    </div>
                  </div>
                  <div className="dg-feat">
                    <div className="dg-feat-ico">📅</div>
                    <div>
                      <div className="dg-feat-title">Date 2026–2027</div>
                      <div className="dg-feat-desc">Disponibili pentru ambele sezoane. Rezervă din timp!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="dg-sidebar">

            <div className="dg-contact-card">
              <div className="dg-ct-label">✦ Contact Direct</div>
              <div className="dg-ct-title">Rezervă acum</div>
              <p className="dg-ct-sub">Contactează-ne pentru disponibilitate și ofertă personalizată.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="dg-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="dg-ct-wa" />}
              <p className="dg-ct-note">Răspundem rapid!</p>
            </div>

            <div className="dg-trust-card">
              <div className="dg-trust-item"><div className="dg-trust-n">✓</div><div className="dg-trust-l">Contract</div></div>
              <div className="dg-trust-item"><div className="dg-trust-n">✓</div><div className="dg-trust-l">Factură</div></div>
              <div className="dg-trust-item"><div className="dg-trust-n">2026</div><div className="dg-trust-l">Date libere</div></div>
              <div className="dg-trust-item"><div className="dg-trust-n">2027</div><div className="dg-trust-l">Date libere</div></div>
            </div>

            <div className="dg-guarantee-card">
              <div className="dg-guarantee-ico">🏆</div>
              <div>
                <div className="dg-guarantee-title">Calitate Garantată</div>
                <div className="dg-guarantee-desc">Pachet complet foto-video cu montaj modern și livrare rapidă.</div>
              </div>
            </div>

            {p.website_url && (
              <div className="dg-conn-card">
                <div className="dg-sh" style={{marginBottom:'12px'}}>
                  <div className="dg-sh-pre">Online</div>
                </div>
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
                    <svg width="18" height="18" fill="none" stroke="#E8C547" viewBox="0 0 24 24">
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