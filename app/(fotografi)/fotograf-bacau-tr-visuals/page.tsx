// app/(fotografi)/fotograf-bacau-tr-visuals/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-bacau-tr-visuals';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.tr { font-family:'Inter',sans-serif; background:#0C0C0C; color:#FAFAFA; min-height:100vh; overflow-x:hidden; }

/* NAV */
.tr-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:16px 24px; display:flex; align-items:center; justify-content:space-between;
  transition:all .4s ease;
}
.tr-nav.scrolled {
  background:rgba(12,12,12,0.94); backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(250,250,250,0.06);
}
.tr-nav-back {
  display:flex; align-items:center; gap:6px;
  font-size:11px; font-weight:500; letter-spacing:.1em; text-transform:uppercase;
  text-decoration:none; color:rgba(250,250,250,0.4); transition:color .2s;
}
.tr-nav-back:hover { color:#FAFAFA; }
.tr-nav-logo {
  font-family:'Syne',sans-serif; font-size:18px; font-weight:800;
  color:#FAFAFA; letter-spacing:-.02em;
}
.tr-nav-logo span { color:#7EFF6E; }

/* HERO — split diagonal */
.tr-hero {
  min-height:100svh; display:grid;
  grid-template-columns:1fr; position:relative; overflow:hidden;
  background:#0C0C0C;
}
@media(min-width:768px){ .tr-hero { grid-template-columns:1fr 1fr; } }

.tr-hero-visual {
  position:relative; overflow:hidden;
  min-height:50svh;
}
@media(min-width:768px){ .tr-hero-visual { min-height:100svh; } }

.tr-hero-img-wrap {
  position:absolute; inset:0;
  display:grid; grid-template-rows:1fr 1fr; gap:3px;
}
@media(min-width:768px){ .tr-hero-img-wrap { grid-template-rows:1fr; } }

.tr-hero-img-main {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.7) saturate(1.1);
  animation:trZoom 12s ease-in-out infinite alternate;
}
@keyframes trZoom { from{transform:scale(1)} to{transform:scale(1.06)} }

.tr-hero-img-sec {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.6) saturate(1.1);
}
@media(min-width:768px){ .tr-hero-img-sec { display:none; } }

.tr-hero-visual::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(135deg, transparent 40%, rgba(12,12,12,0.8) 100%);
}
@media(min-width:768px){
  .tr-hero-visual::after {
    background:linear-gradient(to right, transparent 60%, rgba(12,12,12,1) 100%);
  }
}

/* GREEN ACCENT LINE */
.tr-hero-visual::before {
  content:''; position:absolute; top:0; left:0; width:3px; height:100%;
  background:linear-gradient(to bottom, #7EFF6E, transparent);
  z-index:10;
}

.tr-hero-content {
  display:flex; flex-direction:column; justify-content:center;
  padding:60px 32px 80px;
  position:relative; z-index:10;
}
@media(min-width:768px){ .tr-hero-content { padding:100px 60px 100px 48px; } }

.tr-hero-tag {
  display:inline-flex; align-items:center; gap:8px; width:fit-content;
  background:rgba(126,255,110,0.1); border:1px solid rgba(126,255,110,0.2);
  color:#7EFF6E; font-size:10px; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
  padding:5px 14px; border-radius:4px; margin-bottom:24px;
  animation:trFadeUp .8s ease .2s both;
}
.tr-hero-tag-dot { width:5px; height:5px; background:#7EFF6E; border-radius:50%; animation:trPulse 1.5s ease-in-out infinite; }
@keyframes trPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }

.tr-hero-h1 {
  font-family:'Syne',sans-serif;
  font-size:clamp(48px,10vw,100px); font-weight:800;
  color:#FAFAFA; line-height:.9; letter-spacing:-.03em;
  margin-bottom:20px;
  animation:trFadeUp .8s ease .35s both;
}
.tr-hero-h1 .tr-green { color:#7EFF6E; }
.tr-hero-h1 .tr-outline {
  -webkit-text-stroke:1px rgba(250,250,250,0.3);
  color:transparent;
}

.tr-hero-desc {
  font-size:15px; line-height:1.75; color:rgba(250,250,250,0.45);
  max-width:380px; margin-bottom:36px;
  animation:trFadeUp .8s ease .5s both;
}
.tr-hero-desc strong { color:rgba(250,250,250,0.8); }

.tr-hero-tags {
  display:flex; flex-wrap:wrap; gap:8px; margin-bottom:40px;
  animation:trFadeUp .8s ease .65s both;
}
.tr-hero-chip {
  background:rgba(250,250,250,0.06); border:1px solid rgba(250,250,250,0.1);
  color:rgba(250,250,250,0.55); font-size:11px; font-weight:500;
  padding:6px 14px; border-radius:4px; letter-spacing:.04em;
}

.tr-hero-btns {
  display:flex; gap:12px; flex-wrap:wrap;
  animation:trFadeUp .8s ease .8s both;
}
.tr-hero-btn-main {
  display:flex; align-items:center; gap:8px;
  background:#7EFF6E; color:#0C0C0C; font-size:13px; font-weight:700; letter-spacing:.04em;
  padding:14px 28px; border-radius:4px; text-decoration:none;
  transition:transform .2s, box-shadow .2s;
  box-shadow:0 0 0 rgba(126,255,110,0);
}
.tr-hero-btn-main:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(126,255,110,0.3); }
.tr-hero-btn-sec {
  display:flex; align-items:center; gap:8px;
  background:transparent; border:1px solid rgba(250,250,250,0.15);
  color:rgba(250,250,250,0.6); font-size:13px; font-weight:500;
  padding:14px 24px; border-radius:4px; text-decoration:none;
  transition:all .2s;
}
.tr-hero-btn-sec:hover { border-color:rgba(250,250,250,0.4); color:#FAFAFA; }

@keyframes trFadeUp {
  from { opacity:0; transform:translateY(20px); }
  to { opacity:1; transform:translateY(0); }
}

/* COUNTER BAR */
.tr-counter {
  background:#7EFF6E; display:grid; grid-template-columns:repeat(3,1fr);
}
.tr-counter-item {
  padding:20px 16px; text-align:center;
  border-right:1px solid rgba(12,12,12,0.1);
}
.tr-counter-item:last-child { border-right:none; }
.tr-counter-n {
  font-family:'Syne',sans-serif; font-size:32px; font-weight:800;
  color:#0C0C0C; line-height:1; letter-spacing:-.02em;
}
.tr-counter-l { font-size:10px; font-weight:600; color:rgba(12,12,12,0.5); margin-top:4px; letter-spacing:.08em; text-transform:uppercase; }

/* STRIP */
.tr-strip {
  background:#111; border-bottom:1px solid rgba(250,250,250,0.06);
  padding:16px 24px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .tr-strip { padding:18px 48px; } }
.tr-strip-avatar {
  width:52px; height:52px; border-radius:4px; flex-shrink:0;
  object-fit:cover; border:1px solid rgba(126,255,110,0.3);
}
.tr-strip-name { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#FAFAFA; }
.tr-strip-sub { font-size:11px; color:rgba(250,250,250,0.35); margin-top:2px; letter-spacing:.04em; }
.tr-strip-spacer { flex:1; }
.tr-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#7EFF6E; color:#0C0C0C; font-size:13px; font-weight:700;
  padding:10px 20px; border-radius:4px; text-decoration:none; white-space:nowrap;
  transition:opacity .2s;
}
.tr-strip-cta:hover { opacity:.85; }

/* BODY */
.tr-body { max-width:1200px; margin:0 auto; padding:72px 20px 180px; }
@media(min-width:640px){ .tr-body { padding:80px 40px 180px; } }
@media(min-width:1024px){ .tr-body { display:grid; grid-template-columns:1fr 340px; gap:64px; padding:80px 48px 120px; } }

.tr-sh { margin-bottom:32px; }
.tr-sh-pre {
  font-size:10px; font-weight:600; letter-spacing:.18em; text-transform:uppercase;
  color:#7EFF6E; margin-bottom:6px; display:flex; align-items:center; gap:8px;
}
.tr-sh-pre::before { content:''; display:block; width:20px; height:1px; background:#7EFF6E; }
.tr-sh-title { font-family:'Syne',sans-serif; font-size:clamp(26px,4vw,40px); font-weight:800; color:#FAFAFA; letter-spacing:-.02em; }

/* GALLERY */
.tr-gallery { margin-bottom:64px; }
.tr-gal { display:grid; gap:4px; grid-template-columns:1fr 1fr; }

.tr-gi { position:relative; overflow:hidden; background:#1a1a1a; cursor:pointer; }
.tr-gi:nth-child(1) { grid-column:1/-1; aspect-ratio:16/7; }
.tr-gi:nth-child(2) { aspect-ratio:4/5; }
.tr-gi:nth-child(3) { aspect-ratio:4/5; }
.tr-gi:nth-child(4) { grid-column:1/-1; aspect-ratio:16/6; }
.tr-gi:nth-child(5) { grid-column:1/-1; aspect-ratio:16/7; }

.tr-gi img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.85) saturate(.9);
  transition:transform .8s cubic-bezier(.16,1,.3,1), filter .4s ease;
}
.tr-gi:hover img { transform:scale(1.06); filter:brightness(1) saturate(1.1); }

.tr-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(12,12,12,0.95) 0%, transparent 55%);
  opacity:0; transition:opacity .35s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:20px;
}
.tr-gi:hover .tr-gi-mask { opacity:1; }
.tr-gi-label { font-size:10px; color:rgba(250,250,250,0.4); text-transform:uppercase; letter-spacing:.12em; margin-bottom:6px; font-family:'Syne',sans-serif; }
.tr-gi-cta {
  display:inline-flex; align-items:center; gap:6px;
  background:#7EFF6E; color:#0C0C0C; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  padding:7px 16px; border-radius:4px; text-decoration:none; width:fit-content;
}

/* ABOUT */
.tr-about { margin-bottom:56px; }
.tr-about-grid { display:grid; gap:3px; }
@media(min-width:640px){ .tr-about-grid { grid-template-columns:1fr 1fr; } }

.tr-about-left {
  background:#111; padding:40px 32px; border-radius:0;
}
@media(max-width:639px){ .tr-about-left { padding:28px 22px; } }
.tr-about-tagline {
  font-family:'Syne',sans-serif; font-size:clamp(20px,3.5vw,28px); font-weight:800;
  color:#FAFAFA; line-height:1.2; margin-bottom:20px; letter-spacing:-.02em;
}
.tr-about-tagline span { color:#7EFF6E; }
.tr-about-text { font-size:13.5px; line-height:1.9; color:rgba(250,250,250,0.45); }
.tr-about-text + .tr-about-text { margin-top:12px; }
.tr-about-text strong { color:rgba(250,250,250,0.8); font-weight:600; }

.tr-about-right {
  background:#7EFF6E; padding:40px 32px;
  display:flex; flex-direction:column; justify-content:center; gap:24px;
}
@media(max-width:639px){ .tr-about-right { padding:28px 22px; } }
.tr-feat { display:flex; align-items:flex-start; gap:14px; }
.tr-feat-ico {
  width:40px; height:40px; border-radius:4px; background:rgba(12,12,12,0.1);
  display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:18px;
}
.tr-feat-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#0C0C0C; margin-bottom:3px; }
.tr-feat-desc { font-size:12px; color:rgba(12,12,12,0.55); line-height:1.5; }

/* SIDEBAR */
.tr-sidebar { display:flex; flex-direction:column; gap:14px; }

.tr-contact-card {
  background:#7EFF6E; border-radius:4px; padding:26px;
  position:relative; overflow:hidden;
}
.tr-ct-label { font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:rgba(12,12,12,0.4); margin-bottom:8px; }
.tr-ct-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:#0C0C0C; margin-bottom:6px; letter-spacing:-.02em; }
.tr-ct-sub { font-size:12px; color:rgba(12,12,12,0.5); margin-bottom:20px; line-height:1.7; }
.tr-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#0C0C0C; color:#7EFF6E; font-size:14px; font-weight:700;
  padding:14px; border-radius:4px; text-decoration:none;
  transition:opacity .2s; margin-bottom:8px; font-family:'Syne',sans-serif;
}
.tr-ct-btn:hover { opacity:.85; }
.tr-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:4px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.tr-ct-wa:hover { opacity:.9; }
.tr-ct-note { font-size:11px; color:rgba(12,12,12,0.35); text-align:center; }

.tr-conn-card {
  background:#111; border-radius:4px; padding:20px;
  border:1px solid rgba(250,250,250,0.06);
}
.tr-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(250,250,250,0.05);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.tr-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.tr-conn-row:hover { opacity:.6; }
.tr-conn-l { display:flex; align-items:center; gap:12px; }
.tr-conn-ico { width:36px; height:36px; border-radius:4px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.tr-conn-lbl { font-size:13.5px; font-weight:500; color:#FAFAFA; }
.tr-conn-sub { font-size:11px; color:rgba(250,250,250,0.3); }

.tr-loc-card {
  background:#111; border-radius:4px; padding:18px 20px;
  border:1px solid rgba(250,250,250,0.06);
}
.tr-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#FAFAFA; transition:opacity .2s; }
.tr-loc-row:hover { opacity:.7; }
.tr-loc-ico { width:42px; height:42px; border-radius:4px; background:rgba(126,255,110,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.tr-loc-name { font-size:14px; font-weight:600; color:#FAFAFA; font-family:'Syne',sans-serif; }
.tr-loc-sub { font-size:11px; color:rgba(250,250,250,0.3); margin-top:2px; }

.tr-share-card {
  background:#111; border-radius:4px; padding:16px 18px;
  border:1px solid rgba(250,250,250,0.06);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.tr-share-lbl { font-size:12px; font-weight:500; color:rgba(250,250,250,0.3); margin-bottom:3px; }
.tr-share-url { font-size:13px; font-weight:700; color:#7EFF6E; font-family:'Syne',sans-serif; }

/* MOBILE BAR */
.tr-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(12,12,12,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(250,250,250,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .tr-bar { display:none; } }
.tr-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#7EFF6E; color:#0C0C0C; font-size:14px; font-weight:700;
  padding:13px; border-radius:4px; text-decoration:none; font-family:'Syne',sans-serif;
}
.tr-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:13px; font-weight:600;
  padding:13px; border-radius:4px; text-decoration:none;
}
`;

const GALLERY_LABELS = [
  'Magia momentului',
  'Portret autentic',
  'Conexiune reală',
  'Lumina perfectă',
  'Vibe garantat',
];

export default async function TrVisualsPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill/${p.profile_image}.jpg`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="tr">

        {/* NAV */}
        <nav className="tr-nav" id="tr-nav">
          <a href="/servicii-nunta" className="tr-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="tr-nav-logo">Tr.<span>Visuals</span></div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="tr-hero">
          <div className="tr-hero-visual">
            {galleryIds[0] && (
              <img
                className="tr-hero-img-main"
                src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1400/${galleryIds[0]}.jpg`}
                alt={p.name}
              />
            )}
            {galleryIds[1] && (
              <img
                className="tr-hero-img-sec"
                src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${galleryIds[1]}.jpg`}
                alt={p.name}
                loading="lazy"
              />
            )}
          </div>

          <div className="tr-hero-content">
            <div className="tr-hero-tag">
              <span className="tr-hero-tag-dot" />
              Verificat · VibeInvite
            </div>
            <h1 className="tr-hero-h1">
              <span className="tr-green">Tr.</span>
              <span className="tr-outline">Visuals</span>
            </h1>
            <p className="tr-hero-desc">
              O echipă <strong>tânără și pasionată</strong> din Bacău care oferă calitate premium la prețuri accesibile — și sporim vibe-ul petrecerii tale!
            </p>
            <div className="tr-hero-tags">
              <span className="tr-hero-chip">📷 Foto · Video</span>
              <span className="tr-hero-chip">📍 Bacău</span>
              <span className="tr-hero-chip">⚡ Vibe garantat</span>
              <span className="tr-hero-chip">💰 Prețuri accesibile</span>
            </div>
            <div className="tr-hero-btns">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="tr-hero-btn-main">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="tr-hero-btn-sec">
                  Linktr.ee →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* COUNTER */}
        <div className="tr-counter">
          <div className="tr-counter-item"><div className="tr-counter-n">3+</div><div className="tr-counter-l">Ani Activitate</div></div>
          <div className="tr-counter-item"><div className="tr-counter-n">100+</div><div className="tr-counter-l">Evenimente</div></div>
          <div className="tr-counter-item"><div className="tr-counter-n">100%</div><div className="tr-counter-l">Vibe Garantat</div></div>
        </div>

        {/* STRIP */}
        <div className="tr-strip">
          <img className="tr-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="tr-strip-name">{p.name}</div>
            <div className="tr-strip-sub">Echipă Foto-Video · {p.oras}, {p.judet}</div>
          </div>
          <div className="tr-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="tr-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="tr-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="tr-gallery">
                <div className="tr-sh">
                  <div className="tr-sh-pre">Portfolio</div>
                  <h2 className="tr-sh-title">Munca Noastră</h2>
                </div>
                <div className="tr-gal">
                  {galleryIds.map((id, i) => (
                    <div key={id} className="tr-gi">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${id}.jpg`}
                        alt={`${p.name} – ${GALLERY_LABELS[i] || 'fotografie'}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="tr-gi-mask">
                        <div className="tr-gi-label">{GALLERY_LABELS[i]}</div>
                        <a href={p.instagram_url || p.website_url || '#'} target="_blank" rel="noopener noreferrer" className="tr-gi-cta">
                          Vezi mai mult →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT */}
            <div className="tr-about">
              <div className="tr-sh">
                <div className="tr-sh-pre">Despre noi</div>
                <h2 className="tr-sh-title">Cine Suntem</h2>
              </div>
              <div className="tr-about-grid">
                <div className="tr-about-left">
                  <h3 className="tr-about-tagline">
                    Nu doar fotografiem —<br />
                    <span>sporim vibe-ul</span> petrecerii tale.
                  </h3>
                  <p className="tr-about-text">
                    Suntem <strong>Tr.Visuals</strong>, o echipă tânără de fotografi și videografi din <strong>Bacău</strong> cu o energie aparte și un simț estetic bine ascuțit.
                  </p>
                  <p className="tr-about-text">
                    Credem că o nuntă sau un eveniment nu ar trebui să fie doar despre poze frumoase — ar trebui să fie despre <strong>atmosferă, energie și amintiri vii</strong>. Suntem acolo cu voi, nu doar în fața voastră.
                  </p>
                  <p className="tr-about-text">
                    Disponibili în <strong>Bacău și toată România</strong> pentru nunți, botezuri, petreceri și evenimente corporate. Prețuri accesibile, calitate de top.
                  </p>
                </div>
                <div className="tr-about-right">
                  <div className="tr-feat">
                    <div className="tr-feat-ico">📷</div>
                    <div>
                      <div className="tr-feat-title">Foto & Video Premium</div>
                      <div className="tr-feat-desc">Echipament profesional, rezultate de top la prețuri corecte.</div>
                    </div>
                  </div>
                  <div className="tr-feat">
                    <div className="tr-feat-ico">⚡</div>
                    <div>
                      <div className="tr-feat-title">Vibe Garantat</div>
                      <div className="tr-feat-desc">Nu stăm pe margine — sporim energia petrecerii tale.</div>
                    </div>
                  </div>
                  <div className="tr-feat">
                    <div className="tr-feat-ico">🎯</div>
                    <div>
                      <div className="tr-feat-title">Prețuri Accesibile</div>
                      <div className="tr-feat-desc">Cea mai bună calitate la prețuri pe care ți le permiți.</div>
                    </div>
                  </div>
                  <div className="tr-feat">
                    <div className="tr-feat-ico">🇷🇴</div>
                    <div>
                      <div className="tr-feat-title">Disponibili Național</div>
                      <div className="tr-feat-desc">Bacău și toată România. Venim unde e nunta ta.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="tr-sidebar">

            <div className="tr-contact-card">
              <div className="tr-ct-label">✦ Contact Direct</div>
              <div className="tr-ct-title">Hai să facem treabă!</div>
              <p className="tr-ct-sub">Contactează-ne pentru disponibilitate și o ofertă personalizată.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="tr-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="tr-ct-wa" />}
              <p className="tr-ct-note">Răspundem rapid!</p>
            </div>

            <div className="tr-conn-card">
              <div className="tr-sh" style={{marginBottom:'14px'}}>
                <div className="tr-sh-pre">Social</div>
              </div>
              <SocialLinks
                provider={p}
                rowClass="tr-conn-row"
                leftClass="tr-conn-l"
                icoClass="tr-conn-ico"
                lblClass="tr-conn-lbl"
                subClass="tr-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="tr-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="tr-loc-row">
                  <div className="tr-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="#7EFF6E" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="tr-loc-name">{p.oras}, {p.judet}</div>
                    <div className="tr-loc-sub">Disponibili deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="tr-share-card">
              <div>
                <div className="tr-share-lbl">Distribuie profilul</div>
                <div className="tr-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="tr-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="tr-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="tr-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('tr-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}