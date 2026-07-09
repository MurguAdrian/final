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
header, footer, .cookie-consent { display:none !important; }

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.tr { font-family:'Inter',sans-serif; background:#080808; color:#fff; min-height:100vh; overflow-x:hidden; }

/* NAV */
.tr-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:16px 24px; display:flex; align-items:center; justify-content:space-between;
  transition:all .3s ease;
}
.tr-nav.scrolled { background:rgba(8,8,8,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.05); }
.tr-nav-back {
  display:flex; align-items:center; gap:6px; font-size:11px; font-weight:500;
  letter-spacing:.1em; text-transform:uppercase; text-decoration:none;
  color:rgba(255,255,255,0.4); transition:color .2s;
}
.tr-nav-back:hover { color:#fff; }
.tr-nav-logo { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:.08em; color:#fff; }
.tr-nav-logo span { color:#E8FF00; }

/* HERO */
.tr-hero { position:relative; height:100svh; min-height:600px; overflow:hidden; background:#080808; }

.tr-hero-bg {
  position:absolute; inset:0;
  display:grid; grid-template-columns:1fr 1fr 1fr; gap:2px;
}
.tr-hero-bg-img {
  width:100%; height:100%; object-fit:cover;
  filter:brightness(.3) saturate(1.3);
  transition:filter .4s ease;
}
.tr-hero-bg:hover .tr-hero-bg-img { filter:brightness(.25) saturate(1.3); }

.tr-hero-grad {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,.6) 40%, rgba(8,8,8,.2) 100%);
}

/* GLITCH EFFECT */
.tr-hero-glitch {
  position:absolute; inset:0; z-index:5; pointer-events:none;
  background:repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,255,0,0.015) 2px, rgba(232,255,0,0.015) 4px);
}

.tr-hero-content {
  position:absolute; inset:0; z-index:10;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:40px 24px;
}
@media(min-width:768px){ .tr-hero-content { padding:60px 60px; } }

.tr-hero-badge {
  display:inline-flex; align-items:center; gap:8px; width:fit-content;
  background:rgba(232,255,0,0.1); border:1px solid rgba(232,255,0,0.3);
  color:#E8FF00; font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
  padding:5px 14px; border-radius:2px; margin-bottom:20px;
}
.tr-badge-dot { width:5px; height:5px; background:#E8FF00; border-radius:50%; animation:trPulse 1.2s ease-in-out infinite; }
@keyframes trPulse { 0%,100%{opacity:1} 50%{opacity:.2} }

.tr-hero-h1 {
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(72px,18vw,200px); color:#fff;
  line-height:.85; letter-spacing:.02em; margin-bottom:16px;
  animation:trSlideUp 1s cubic-bezier(.16,1,.3,1) .1s both;
}
.tr-hero-h1 .accent { color:#E8FF00; }
.tr-hero-h1 .outline { -webkit-text-stroke:2px rgba(255,255,255,0.2); color:transparent; }

@keyframes trSlideUp {
  from { opacity:0; transform:translateY(60px); }
  to { opacity:1; transform:translateY(0); }
}

.tr-hero-bottom {
  display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:20px;
  animation:trSlideUp 1s cubic-bezier(.16,1,.3,1) .3s both;
}
.tr-hero-desc {
  font-size:14px; line-height:1.7; color:rgba(255,255,255,0.45);
  max-width:400px;
}
.tr-hero-desc strong { color:rgba(255,255,255,0.85); }
.tr-hero-cta-wrap { display:flex; gap:10px; flex-shrink:0; }
.tr-hero-btn {
  display:flex; align-items:center; gap:8px;
  background:#E8FF00; color:#080808; font-size:13px; font-weight:700; letter-spacing:.04em;
  padding:14px 24px; border-radius:2px; text-decoration:none;
  transition:transform .2s, box-shadow .2s;
  box-shadow:0 0 0 rgba(232,255,0,0);
}
.tr-hero-btn:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(232,255,0,0.3); }
.tr-hero-btn-outline {
  display:flex; align-items:center; gap:8px;
  background:transparent; border:1px solid rgba(255,255,255,0.2);
  color:rgba(255,255,255,0.6); font-size:13px; font-weight:500;
  padding:14px 20px; border-radius:2px; text-decoration:none;
  transition:all .2s;
}
.tr-hero-btn-outline:hover { border-color:rgba(255,255,255,0.5); color:#fff; }

/* ENERGY BAR */
.tr-energy {
  background:#E8FF00; padding:12px 0; overflow:hidden;
  display:flex; align-items:center;
}
.tr-energy-inner {
  display:flex; width:max-content;
  animation:trTick 18s linear infinite;
}
@keyframes trTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.tr-energy-item {
  display:flex; align-items:center; gap:10px; padding:0 28px;
  font-family:'Bebas Neue',sans-serif; font-size:16px; letter-spacing:.1em;
  color:#080808; white-space:nowrap;
}
.tr-energy-sep { font-size:20px; opacity:.3; }

/* STRIP */
.tr-strip {
  background:#0D0D0D; border-bottom:1px solid rgba(255,255,255,0.05);
  padding:14px 24px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .tr-strip { padding:16px 48px; } }
.tr-strip-avatar {
  width:48px; height:48px; border-radius:2px; flex-shrink:0;
  object-fit:cover; border:1px solid rgba(232,255,0,0.3);
}
.tr-strip-name { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:.06em; color:#fff; }
.tr-strip-sub { font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:.06em; text-transform:uppercase; }
.tr-strip-spacer { flex:1; }
.tr-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#E8FF00; color:#080808; font-size:12px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  padding:9px 18px; border-radius:2px; text-decoration:none; white-space:nowrap;
  transition:opacity .2s;
}
.tr-strip-cta:hover { opacity:.85; }

/* BODY */
.tr-body { max-width:1200px; margin:0 auto; padding:64px 20px 160px; }
@media(min-width:640px){ .tr-body { padding:72px 40px 160px; } }
@media(min-width:1024px){ .tr-body { display:grid; grid-template-columns:1fr 320px; gap:60px; padding:72px 48px 120px; } }

.tr-sh { margin-bottom:28px; }
.tr-sh-pre {
  font-size:10px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
  color:#E8FF00; margin-bottom:6px;
}
.tr-sh-title {
  font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,6vw,60px);
  color:#fff; letter-spacing:.04em; line-height:.9;
}

/* GALLERY */
.tr-gallery { margin-bottom:60px; }
.tr-gal { display:grid; gap:3px; }

.tr-gi { position:relative; overflow:hidden; background:#111; cursor:pointer; }
.tr-gi:nth-child(1) { aspect-ratio:16/8; }
.tr-gi:nth-child(2) { display:grid; grid-template-columns:1fr 1fr; gap:3px; }
.tr-gi:nth-child(2) > div { position:relative; overflow:hidden; aspect-ratio:1; }
.tr-gi:nth-child(3) { aspect-ratio:16/7; }
.tr-gi:nth-child(4) { aspect-ratio:16/8; }

.tr-gi img, .tr-gi > div img {
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.8) saturate(1.1);
  transition:transform .7s cubic-bezier(.16,1,.3,1), filter .4s;
}
.tr-gi:hover img, .tr-gi > div:hover img { transform:scale(1.07); filter:brightness(1) saturate(1.2); }

.tr-gi-over {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(8,8,8,.9) 0%, transparent 60%);
  opacity:0; transition:opacity .3s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:18px;
}
.tr-gi:hover .tr-gi-over, .tr-gi > div:hover .tr-gi-over { opacity:1; }
.tr-gi-lbl { font-size:9px; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:.14em; margin-bottom:6px; font-family:'Bebas Neue',sans-serif; font-size:13px; }
.tr-gi-btn {
  display:inline-flex; align-items:center; gap:5px;
  background:#E8FF00; color:#080808; font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
  padding:6px 14px; border-radius:2px; text-decoration:none; width:fit-content;
}

/* VIBE SECTION */
.tr-vibe { margin-bottom:56px; }
.tr-vibe-card {
  background:#0D0D0D; border:1px solid rgba(255,255,255,0.06);
  border-radius:2px; overflow:hidden;
}
.tr-vibe-top {
  background:#E8FF00; padding:32px;
  display:flex; align-items:center; gap:20px;
}
@media(max-width:639px){ .tr-vibe-top { padding:24px; flex-direction:column; } }
.tr-vibe-top-avatar {
  width:72px; height:72px; border-radius:2px; flex-shrink:0;
  object-fit:cover; border:3px solid rgba(8,8,8,0.2);
}
.tr-vibe-top-name { font-family:'Bebas Neue',sans-serif; font-size:32px; color:#080808; letter-spacing:.04em; }
.tr-vibe-top-role { font-size:12px; color:rgba(8,8,8,0.5); letter-spacing:.08em; text-transform:uppercase; margin-top:2px; }
.tr-vibe-body { padding:32px; }
@media(max-width:639px){ .tr-vibe-body { padding:24px; } }
.tr-vibe-quote {
  font-family:'Bebas Neue',sans-serif; font-size:clamp(22px,4vw,36px);
  color:#fff; line-height:1.1; margin-bottom:20px; letter-spacing:.02em;
}
.tr-vibe-quote span { color:#E8FF00; }
.tr-vibe-text { font-size:13.5px; line-height:1.9; color:rgba(255,255,255,0.45); }
.tr-vibe-text + .tr-vibe-text { margin-top:10px; }
.tr-vibe-text strong { color:rgba(255,255,255,0.8); }
.tr-vibe-feats {
  display:grid; grid-template-columns:1fr 1fr; gap:2px; margin-top:24px;
}
.tr-vibe-feat {
  background:#111; padding:16px;
  display:flex; align-items:center; gap:10px;
}
.tr-vibe-feat-ico { font-size:20px; flex-shrink:0; }
.tr-vibe-feat-t { font-size:12px; font-weight:600; color:#fff; }
.tr-vibe-feat-d { font-size:11px; color:rgba(255,255,255,0.3); margin-top:2px; }

/* SIDEBAR */
.tr-sidebar { display:flex; flex-direction:column; gap:12px; }

.tr-contact-card {
  background:#E8FF00; border-radius:2px; padding:24px;
}
.tr-ct-label { font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgba(8,8,8,0.4); margin-bottom:8px; }
.tr-ct-title { font-family:'Bebas Neue',sans-serif; font-size:28px; color:#080808; letter-spacing:.02em; margin-bottom:6px; }
.tr-ct-sub { font-size:12px; color:rgba(8,8,8,0.5); margin-bottom:18px; line-height:1.6; }
.tr-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  background:#080808; color:#E8FF00; font-size:13px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  padding:13px; border-radius:2px; text-decoration:none;
  transition:opacity .2s; margin-bottom:8px;
}
.tr-ct-btn:hover { opacity:.85; }
.tr-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:8px;
  background:#25D366; color:#fff; font-size:13px; font-weight:700;
  padding:13px; border-radius:2px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.tr-ct-wa:hover { opacity:.9; }
.tr-ct-note { font-size:11px; color:rgba(8,8,8,0.35); text-align:center; }

.tr-conn-card {
  background:#0D0D0D; border-radius:2px; padding:20px;
  border:1px solid rgba(255,255,255,0.06);
}
.tr-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(255,255,255,0.05);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.tr-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.tr-conn-row:hover { opacity:.6; }
.tr-conn-l { display:flex; align-items:center; gap:12px; }
.tr-conn-ico { width:36px; height:36px; border-radius:2px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.tr-conn-lbl { font-size:13px; font-weight:500; color:#fff; }
.tr-conn-sub { font-size:11px; color:rgba(255,255,255,0.3); }

.tr-loc-card {
  background:#0D0D0D; border-radius:2px; padding:16px 18px;
  border:1px solid rgba(255,255,255,0.06);
}
.tr-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#fff; transition:opacity .2s; }
.tr-loc-row:hover { opacity:.7; }
.tr-loc-ico { width:40px; height:40px; border-radius:2px; background:rgba(232,255,0,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.tr-loc-name { font-size:14px; font-weight:600; color:#fff; }
.tr-loc-sub { font-size:11px; color:rgba(255,255,255,0.3); margin-top:1px; }

.tr-share-card {
  background:#0D0D0D; border-radius:2px; padding:14px 16px;
  border:1px solid rgba(255,255,255,0.06);
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.tr-share-lbl { font-size:11px; color:rgba(255,255,255,0.3); margin-bottom:2px; }
.tr-share-url { font-size:13px; font-weight:700; color:#E8FF00; }

/* MOBILE BAR */
.tr-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(8,8,8,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(255,255,255,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .tr-bar { display:none; } }
.tr-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#E8FF00; color:#080808; font-size:13px; font-weight:700; letter-spacing:.04em; text-transform:uppercase;
  padding:13px; border-radius:2px; text-decoration:none;
}
.tr-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:13px; font-weight:600;
  padding:13px; border-radius:2px; text-decoration:none;
}
`;

const GALLERY_LABELS = ['Vibe maxim', 'Portrete autentice', 'Dans & Energie', 'Momentul zilei'];

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
          <div className="tr-nav-logo">TR.<span>VISUALS</span></div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="tr-hero">
          <div className="tr-hero-bg">
            {galleryIds.slice(0, 3).map((id, i) => (
              <img
                key={id}
                className="tr-hero-bg-img"
                src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${id}.jpg`}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
          <div className="tr-hero-grad" />
          <div className="tr-hero-glitch" />
          <div className="tr-hero-content">
            <div className="tr-hero-badge">
              <span className="tr-badge-dot" />
              Fotografi Verificați · VibeInvite · Bacău
            </div>
            <h1 className="tr-hero-h1">
              <span className="accent">TR.</span>
              <span className="outline">VISUALS</span>
            </h1>
            <div className="tr-hero-bottom">
              <p className="tr-hero-desc">
                O echipă <strong>tânără și energică</strong> din Bacău — calitate premium, prețuri accesibile și <strong>vibe garantat</strong> la petrecerea ta.
              </p>
              <div className="tr-hero-cta-wrap">
                {p.phone && (
                  <a href={`tel:${p.phone}`} className="tr-hero-btn">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                    </svg>
                    Sună
                  </a>
                )}
                {p.instagram_url && (
                  <a href={p.instagram_url} target="_blank" rel="noopener noreferrer" className="tr-hero-btn-outline">
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ENERGY BAR */}
        <div className="tr-energy">
          <div className="tr-energy-inner">
            {['FOTO · VIDEO', 'BACĂU', 'VIBE GARANTAT', 'PREȚURI ACCESIBILE', 'NUNȚI', 'BOTEZURI', 'PETRECERI', 'FOTO · VIDEO', 'BACĂU', 'VIBE GARANTAT', 'PREȚURI ACCESIBILE', 'NUNȚI', 'BOTEZURI', 'PETRECERI'].map((item, i) => (
              <div key={i} className="tr-energy-item">
                {item}
                <span className="tr-energy-sep">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* STRIP */}
        <div className="tr-strip">
          <img className="tr-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="tr-strip-name">TR.VISUALS</div>
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
                  <div className="tr-gi">
                    <img src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${galleryIds[0]}.jpg`} alt={GALLERY_LABELS[0]} loading="eager" />
                    <div className="tr-gi-over">
                      <div className="tr-gi-lbl">{GALLERY_LABELS[0]}</div>
                      <a href={p.instagram_url || '#'} target="_blank" rel="noopener noreferrer" className="tr-gi-btn">Vezi pe Instagram →</a>
                    </div>
                  </div>
                  {galleryIds.length > 2 && (
                    <div className="tr-gi">
                      {[galleryIds[1], galleryIds[2]].map((id, i) => (
                        <div key={id}>
                          <img src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${id}.jpg`} alt={GALLERY_LABELS[i + 1]} loading="lazy" />
                          <div className="tr-gi-over">
                            <div className="tr-gi-lbl">{GALLERY_LABELS[i + 1]}</div>
                            <a href={p.instagram_url || '#'} target="_blank" rel="noopener noreferrer" className="tr-gi-btn">Vezi →</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {galleryIds[3] && (
                    <div className="tr-gi">
                      <img src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${galleryIds[3]}.jpg`} alt={GALLERY_LABELS[3]} loading="lazy" />
                      <div className="tr-gi-over">
                        <div className="tr-gi-lbl">{GALLERY_LABELS[3]}</div>
                        <a href={p.instagram_url || '#'} target="_blank" rel="noopener noreferrer" className="tr-gi-btn">Vezi pe Instagram →</a>
                      </div>
                    </div>
                  )}
                  {galleryIds[4] && (
                    <div className="tr-gi">
                      <img src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${galleryIds[4]}.jpg`} alt="Vibe garantat" loading="lazy" />
                      <div className="tr-gi-over">
                        <div className="tr-gi-lbl">Energie pură</div>
                        <a href={p.instagram_url || '#'} target="_blank" rel="noopener noreferrer" className="tr-gi-btn">Vezi pe Instagram →</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIBE */}
            <div className="tr-vibe">
              <div className="tr-sh">
                <div className="tr-sh-pre">Despre noi</div>
                <h2 className="tr-sh-title">Cine Suntem</h2>
              </div>
              <div className="tr-vibe-card">
                <div className="tr-vibe-top">
                  <img className="tr-vibe-top-avatar" src={profileImg} alt={p.name} />
                  <div>
                    <div className="tr-vibe-top-name">TR.VISUALS</div>
                    <div className="tr-vibe-top-role">Echipă Foto-Video · Bacău, România</div>
                  </div>
                </div>
                <div className="tr-vibe-body">
                  <div className="tr-vibe-quote">
                    Nu doar fotografiem —<br />
                    <span>sporim vibe-ul</span><br />
                    petrecerii tale.
                  </div>
                  <p className="tr-vibe-text">
                    Suntem <strong>Tr.Visuals</strong>, o echipă tânără de fotografi și videografi din <strong>Bacău</strong>. Nu stăm pe margine cu aparatul — suntem parte din petrecere, captăm energia live și ne asigurăm că amintirile tale sunt la fel de intense ca momentele trăite.
                  </p>
                  <p className="tr-vibe-text">
                    Oferim <strong>calitate profesională la prețuri accesibile</strong> — pentru că orice nuntă, botez sau petrecere merită să fie imortalizată corect, indiferent de buget.
                  </p>
                  <div className="tr-vibe-feats">
                    <div className="tr-vibe-feat"><div className="tr-vibe-feat-ico">📷</div><div><div className="tr-vibe-feat-t">Foto & Video</div><div className="tr-vibe-feat-d">Echipament pro</div></div></div>
                    <div className="tr-vibe-feat"><div className="tr-vibe-feat-ico">⚡</div><div><div className="tr-vibe-feat-t">Vibe Garantat</div><div className="tr-vibe-feat-d">Energie reală</div></div></div>
                    <div className="tr-vibe-feat"><div className="tr-vibe-feat-ico">💰</div><div><div className="tr-vibe-feat-t">Prețuri OK</div><div className="tr-vibe-feat-d">Calitate maximă</div></div></div>
                    <div className="tr-vibe-feat"><div className="tr-vibe-feat-ico">🇷🇴</div><div><div className="tr-vibe-feat-t">Național</div><div className="tr-vibe-feat-d">Venim la tine</div></div></div>
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
              <p className="tr-ct-sub">Scrie-ne pentru disponibilitate și o ofertă personalizată.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="tr-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="tr-ct-wa" />}
              <p className="tr-ct-note">Răspundem rapid!</p>
            </div>

            <div className="tr-conn-card">
              <div className="tr-sh" style={{marginBottom:'12px'}}>
                <div className="tr-sh-pre">Social</div>
              </div>
              <SocialLinks provider={p} rowClass="tr-conn-row" leftClass="tr-conn-l" icoClass="tr-conn-ico" lblClass="tr-conn-lbl" subClass="tr-conn-sub" />
            </div>

            {p.maps_url && (
              <div className="tr-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="tr-loc-row">
                  <div className="tr-loc-ico">
                    <svg width="18" height="18" fill="none" stroke="#E8FF00" viewBox="0 0 24 24">
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