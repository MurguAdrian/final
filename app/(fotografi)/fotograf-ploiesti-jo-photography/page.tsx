// app/(fotografi)/fotograf-ploiesti-jo-photography/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-ploiesti-jo-photography';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
header, footer { display:none !important; }

.jo { font-family:'DM Sans',sans-serif; background:#F8F4EF; color:#1C1410; min-height:100vh; overflow-x:hidden; }

/* NAV */
.jo-nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 24px;
  transition:all .4s ease;
}
.jo-nav.scrolled {
  background:rgba(248,244,239,0.96); backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(28,20,16,0.08);
  padding:10px 24px;
}
.jo-nav-back {
  display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600;
  text-decoration:none; color:#1C1410; letter-spacing:.06em; text-transform:uppercase;
  opacity:.5; transition:opacity .2s;
}
.jo-nav-back:hover { opacity:1; }
.jo-nav-logo {
  font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:400;
  color:#1C1410; letter-spacing:.08em;
}

/* CINEMATIC HERO */
.jo-hero {
  height:100svh; min-height:600px;
  display:grid; grid-template-columns:1fr 1fr;
  position:relative; overflow:hidden;
}
@media(max-width:767px){ .jo-hero { grid-template-columns:1fr; grid-template-rows:60vh auto; } }

.jo-hero-left {
  position:relative; overflow:hidden;
}
.jo-hero-img-main {
  width:100%; height:100%; object-fit:cover; object-position:center;
  transform:scale(1.08);
  animation: joHeroIn 1.8s cubic-bezier(.16,1,.3,1) forwards;
}
@keyframes joHeroIn {
  from { transform:scale(1.08); filter:brightness(.6); }
  to { transform:scale(1); filter:brightness(.85); }
}
.jo-hero-left-overlay {
  position:absolute; inset:0;
  background:linear-gradient(135deg, rgba(28,20,16,0.3) 0%, transparent 60%);
}

.jo-hero-right {
  background:#1C1410;
  display:flex; flex-direction:column; justify-content:center;
  padding:60px 48px;
  position:relative; overflow:hidden;
}
@media(max-width:767px){ .jo-hero-right { padding:40px 28px; justify-content:flex-start; } }

.jo-hero-right::before {
  content:''; position:absolute; top:-100px; right:-100px;
  width:400px; height:400px; border-radius:50%;
  background:radial-gradient(circle, rgba(198,154,108,0.12) 0%, transparent 65%);
  pointer-events:none;
}

.jo-hero-eyebrow {
  display:inline-flex; align-items:center; gap:8px;
  font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
  color:rgba(198,154,108,0.8); margin-bottom:24px;
  opacity:0; animation: joFadeUp .8s ease .4s forwards;
}
.jo-hero-eyebrow-line { width:32px; height:1px; background:rgba(198,154,108,0.5); }

.jo-hero-h1 {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(42px,6vw,80px); font-weight:300; color:#fff;
  line-height:1; margin-bottom:8px;
  opacity:0; animation: joFadeUp .8s ease .55s forwards;
}
.jo-hero-h1 em { font-style:italic; color:rgba(198,154,108,0.9); }

.jo-hero-tagline {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(16px,2vw,22px); font-weight:300; font-style:italic;
  color:rgba(255,255,255,0.45); line-height:1.5; margin-bottom:36px;
  opacity:0; animation: joFadeUp .8s ease .7s forwards;
  max-width:380px;
}

.jo-hero-pills {
  display:flex; flex-wrap:wrap; gap:8px; margin-bottom:40px;
  opacity:0; animation: joFadeUp .8s ease .85s forwards;
}
.jo-hero-pill {
  background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
  color:rgba(255,255,255,0.6); font-size:11px; font-weight:500;
  padding:5px 14px; border-radius:100px;
}

.jo-hero-cta {
  display:flex; gap:12px; flex-wrap:wrap;
  opacity:0; animation: joFadeUp .8s ease 1s forwards;
}
.jo-hero-btn-primary {
  display:flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#C69A6C,#B8864E);
  color:#fff; font-size:13px; font-weight:700; letter-spacing:.04em;
  padding:13px 26px; border-radius:100px; text-decoration:none;
  box-shadow:0 8px 32px rgba(198,154,108,0.3);
  transition:transform .2s, box-shadow .2s;
}
.jo-hero-btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(198,154,108,0.4); }
.jo-hero-btn-secondary {
  display:flex; align-items:center; gap:8px;
  background:transparent; border:1px solid rgba(255,255,255,0.2);
  color:rgba(255,255,255,0.7); font-size:13px; font-weight:500;
  padding:13px 26px; border-radius:100px; text-decoration:none;
  transition:border-color .2s, color .2s;
}
.jo-hero-btn-secondary:hover { border-color:rgba(255,255,255,0.5); color:#fff; }

@keyframes joFadeUp {
  from { opacity:0; transform:translateY(20px); }
  to { opacity:1; transform:translateY(0); }
}

/* STATS BAR */
.jo-stats-bar {
  background:#1C1410; display:grid; grid-template-columns:repeat(3,1fr);
  border-top:1px solid rgba(255,255,255,0.06);
}
.jo-stat-item {
  padding:24px 20px; text-align:center;
  border-right:1px solid rgba(255,255,255,0.06);
}
.jo-stat-item:last-child { border-right:none; }
.jo-stat-n {
  font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:300;
  color:#C69A6C; line-height:1;
}
.jo-stat-l { font-size:10px; color:rgba(255,255,255,0.3); margin-top:4px; letter-spacing:.08em; text-transform:uppercase; }

/* STRIP */
.jo-strip {
  background:#fff; border-bottom:1px solid rgba(28,20,16,0.07);
  padding:16px 24px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .jo-strip { padding:18px 48px; } }
.jo-strip-avatar {
  width:52px; height:52px; border-radius:50%; flex-shrink:0;
  object-fit:cover; border:2px solid rgba(198,154,108,0.4);
}
.jo-strip-name { font-size:15px; font-weight:700; color:#1C1410; }
.jo-strip-sub { font-size:12px; color:#C69A6C; font-weight:500; }
.jo-strip-spacer { flex:1; }
.jo-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:linear-gradient(135deg,#C69A6C,#B8864E);
  color:#fff; font-size:13px; font-weight:700;
  padding:10px 20px; border-radius:100px; text-decoration:none;
  box-shadow:0 4px 16px rgba(198,154,108,0.3); white-space:nowrap;
  transition:opacity .2s;
}
.jo-strip-cta:hover { opacity:.9; }

/* BODY */
.jo-body { max-width:1200px; margin:0 auto; padding:72px 20px 160px; }
@media(min-width:640px){ .jo-body { padding:80px 40px 160px; } }
@media(min-width:1024px){ .jo-body { display:grid; grid-template-columns:1fr 340px; gap:64px; padding:80px 48px 120px; } }

.jo-sh { display:flex; align-items:center; gap:14px; margin-bottom:32px; }
.jo-sh-pre { font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#C69A6C; white-space:nowrap; }
.jo-sh-line { flex:1; height:1px; background:rgba(28,20,16,0.1); }
.jo-sh-title { font-family:'Cormorant Garamond',serif; font-size:clamp(24px,4vw,36px); font-weight:300; color:#1C1410; white-space:nowrap; }
.jo-sh-title em { font-style:italic; }

/* GALLERY — cinematic grid */
.jo-gallery { margin-bottom:64px; }
.jo-gal {
  display:grid;
  grid-template-columns:repeat(12,1fr);
  grid-template-rows:240px 240px;
  gap:10px;
}
@media(max-width:767px){
  .jo-gal {
    grid-template-columns:1fr 1fr;
    grid-template-rows:auto;
  }
}

.jo-gi { position:relative; overflow:hidden; border-radius:16px; background:#e8e0d8; cursor:pointer; }
.jo-gi:nth-child(1) { grid-column:1/6; grid-row:1/3; }
.jo-gi:nth-child(2) { grid-column:6/9; grid-row:1/2; }
.jo-gi:nth-child(3) { grid-column:9/13; grid-row:1/2; }
.jo-gi:nth-child(4) { grid-column:6/10; grid-row:2/3; }
.jo-gi:nth-child(5) { grid-column:10/13; grid-row:2/3; }

@media(max-width:767px){
  .jo-gi:nth-child(1) { grid-column:1/-1; aspect-ratio:16/10; }
  .jo-gi:nth-child(2) { grid-column:1/2; aspect-ratio:3/4; }
  .jo-gi:nth-child(3) { grid-column:2/3; aspect-ratio:3/4; }
  .jo-gi:nth-child(4) { grid-column:1/-1; aspect-ratio:16/9; }
  .jo-gi:nth-child(5) { grid-column:1/-1; aspect-ratio:16/9; }
}

.jo-gi img {
  width:100%; height:100%; object-fit:cover; display:block;
  transition:transform .7s cubic-bezier(.16,1,.3,1), filter .4s ease;
  filter:brightness(.95) saturate(.95);
}
.jo-gi:hover img { transform:scale(1.07); filter:brightness(1) saturate(1.05); }

.jo-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(28,20,16,0.85) 0%, transparent 50%);
  opacity:0; transition:opacity .4s ease;
  display:flex; flex-direction:column; justify-content:flex-end; padding:20px;
}
.jo-gi:hover .jo-gi-mask { opacity:1; }
.jo-gi-label { font-size:10px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:.1em; margin-bottom:6px; }
.jo-gi-cta {
  display:inline-flex; align-items:center; gap:5px;
  background:rgba(255,255,255,0.95); color:#1C1410;
  font-size:11px; font-weight:700; letter-spacing:.04em;
  padding:6px 14px; border-radius:100px; text-decoration:none; width:fit-content;
  transition:background .2s;
}
.jo-gi-cta:hover { background:#fff; }

/* MANIFESTO */
.jo-manifesto { margin-bottom:56px; }
.jo-manifesto-card {
  background:#1C1410; border-radius:28px; padding:48px 40px;
  position:relative; overflow:hidden;
}
@media(max-width:640px){ .jo-manifesto-card { padding:32px 24px; } }
.jo-manifesto-card::before {
  content:'"'; position:absolute; top:-20px; right:32px;
  font-family:'Cormorant Garamond',serif; font-size:200px; font-weight:300;
  color:rgba(198,154,108,0.08); line-height:1; pointer-events:none;
}
.jo-manifesto-label {
  font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
  color:rgba(198,154,108,0.6); margin-bottom:20px;
}
.jo-manifesto-quote {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(20px,4vw,32px); font-weight:300; font-style:italic;
  color:#fff; line-height:1.5; margin-bottom:24px;
}
.jo-manifesto-text { font-size:14px; line-height:1.95; color:rgba(255,255,255,0.45); }
.jo-manifesto-text + .jo-manifesto-text { margin-top:12px; }
.jo-manifesto-text strong { color:rgba(255,255,255,0.8); font-weight:600; }

.jo-manifesto-sig {
  margin-top:32px; padding-top:24px;
  border-top:1px solid rgba(255,255,255,0.08);
  display:flex; align-items:center; gap:14px;
}
.jo-manifesto-sig-avatar {
  width:48px; height:48px; border-radius:50%;
  object-fit:cover; border:2px solid rgba(198,154,108,0.3);
}
.jo-manifesto-sig-name { font-size:14px; font-weight:600; color:#fff; }
.jo-manifesto-sig-role { font-size:11px; color:rgba(255,255,255,0.35); margin-top:2px; }

/* SIDEBAR */
.jo-sidebar { display:flex; flex-direction:column; gap:16px; }

.jo-contact-card {
  background:linear-gradient(160deg,#1C1410 0%,#2d1f0e 100%);
  border-radius:24px; padding:28px; position:relative; overflow:hidden;
  border:1px solid rgba(198,154,108,0.15);
}
.jo-contact-card::before {
  content:''; position:absolute; top:-60px; right:-60px;
  width:200px; height:200px; border-radius:50%;
  background:radial-gradient(circle,rgba(198,154,108,0.15) 0%,transparent 65%);
  pointer-events:none;
}
.jo-ct-label { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:rgba(198,154,108,0.6); margin-bottom:8px; }
.jo-ct-title { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:300; color:#fff; margin-bottom:6px; }
.jo-ct-sub { font-size:12px; color:rgba(255,255,255,0.35); margin-bottom:22px; line-height:1.7; }
.jo-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:linear-gradient(135deg,#C69A6C,#B8864E);
  color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  box-shadow:0 6px 24px rgba(198,154,108,0.3);
  transition:opacity .2s, transform .15s; margin-bottom:8px;
}
.jo-ct-btn:hover { opacity:.9; transform:translateY(-1px); }
.jo-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.jo-ct-wa:hover { opacity:.9; }
.jo-ct-note { font-size:11px; color:rgba(255,255,255,0.2); text-align:center; }

.jo-conn-card {
  background:#fff; border-radius:24px; padding:22px;
  border:1px solid rgba(28,20,16,0.07);
  box-shadow:0 2px 16px rgba(0,0,0,0.04);
}
.jo-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(28,20,16,0.06);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.jo-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.jo-conn-row:hover { opacity:.65; }
.jo-conn-l { display:flex; align-items:center; gap:12px; }
.jo-conn-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.jo-conn-lbl { font-size:13.5px; font-weight:500; color:#1C1410; }
.jo-conn-sub { font-size:11px; color:rgba(28,20,16,0.38); }

.jo-loc-card {
  background:#fff; border-radius:20px; padding:18px 20px;
  border:1px solid rgba(28,20,16,0.07);
  box-shadow:0 2px 14px rgba(0,0,0,0.03);
}
.jo-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#1C1410; transition:opacity .2s; }
.jo-loc-row:hover { opacity:.7; }
.jo-loc-ico { width:42px; height:42px; border-radius:12px; background:#FFF4ED; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.jo-loc-name { font-size:14px; font-weight:600; }
.jo-loc-sub { font-size:11px; color:rgba(28,20,16,0.4); margin-top:2px; }

.jo-share-card {
  background:#F8F4EF; border-radius:18px; padding:16px 18px;
  border:1px solid rgba(28,20,16,0.07);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.jo-share-lbl { font-size:12px; font-weight:500; color:rgba(28,20,16,0.45); margin-bottom:3px; }
.jo-share-url { font-size:13px; font-weight:700; color:#C69A6C; }

/* MOBILE BAR */
.jo-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(248,244,239,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(28,20,16,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .jo-bar { display:none; } }
.jo-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(135deg,#C69A6C,#B8864E); color:#fff;
  font-size:14px; font-weight:700; padding:13px; border-radius:14px; text-decoration:none;
  box-shadow:0 4px 16px rgba(198,154,108,0.28);
}
.jo-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff;
  font-size:13px; font-weight:600; padding:13px; border-radius:14px; text-decoration:none;
}
@media(max-width:374px){ .jo-hero { min-height:500px; } }
`;

const GALLERY_DATA = [
  { label: 'Lumina de aur', link: 'facebook' },
  { label: 'Portret', link: 'facebook' },
  { label: 'Poveste de dragoste', link: 'facebook' },
  { label: 'Momentul magic', link: 'facebook' },
  { label: 'Trash the Dress', link: 'facebook' },
];

export default async function JoPhotographyPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill/${p.profile_image}.jpg`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="jo">

        {/* NAV */}
        <nav className="jo-nav" id="jo-nav">
          <a href="/servicii-nunta" className="jo-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="jo-nav-logo">JoPhotography</div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="jo-hero">
          <div className="jo-hero-left">
            {galleryIds[0] && (
              <img
                className="jo-hero-img-main"
                src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${galleryIds[0]}.jpg`}
                alt={p.name}
              />
            )}
            <div className="jo-hero-left-overlay" />
          </div>
          <div className="jo-hero-right">
            <div className="jo-hero-eyebrow">
              <div className="jo-hero-eyebrow-line" />
              Fotograf Verificat · VibeInvite
            </div>
            <h1 className="jo-hero-h1">
              Jo<em>Photography</em>
            </h1>
            <p className="jo-hero-tagline">
              „Iubesc să surprind emoțiile și trăirile oamenilor, sentimente ce peste ani vor fi mărturiile vieților lor."
            </p>
            <div className="jo-hero-pills">
              <span className="jo-hero-pill">📷 Foto · Video</span>
              <span className="jo-hero-pill">📍 {p.oras}, {p.judet}</span>
              <span className="jo-hero-pill">✨ Artă vizuală</span>
            </div>
            <div className="jo-hero-cta">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="jo-hero-btn-primary">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.facebook_url && (
                <a href={p.facebook_url} target="_blank" rel="noopener noreferrer" className="jo-hero-btn-secondary">
                  Vezi Portofoliul
                </a>
              )}
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="jo-stats-bar">
          <div className="jo-stat-item"><div className="jo-stat-n">10+</div><div className="jo-stat-l">Ani Experiență</div></div>
          <div className="jo-stat-item"><div className="jo-stat-n">400+</div><div className="jo-stat-l">Nunți Fotografiate</div></div>
          <div className="jo-stat-item"><div className="jo-stat-n">∞</div><div className="jo-stat-l">Amintiri Create</div></div>
        </div>

        {/* STRIP */}
        <div className="jo-strip">
          <img className="jo-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="jo-strip-name">{p.name}</div>
            <div className="jo-strip-sub">Fotograf Profesionist · {p.oras}</div>
          </div>
          <div className="jo-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="jo-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="jo-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="jo-gallery">
                <div className="jo-sh">
                  <span className="jo-sh-pre">Portfolio</span>
                  <div className="jo-sh-line" />
                  <h2 className="jo-sh-title"><em>Momente Unice</em></h2>
                </div>
                <div className="jo-gal">
                  {galleryIds.map((id, i) => (
                    <div key={id} className="jo-gi">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${id}.jpg`}
                        alt={`${p.name} – ${GALLERY_DATA[i]?.label || 'fotografie'}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="jo-gi-mask">
                        <div className="jo-gi-label">{GALLERY_DATA[i]?.label}</div>
                        <a href={p.facebook_url || '#'} target="_blank" rel="noopener noreferrer" className="jo-gi-cta">
                          Vezi pe Facebook →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MANIFESTO */}
            <div className="jo-manifesto">
              <div className="jo-sh">
                <span className="jo-sh-pre">Despre</span>
                <div className="jo-sh-line" />
                <h2 className="jo-sh-title"><em>Filozofia Mea</em></h2>
              </div>
              <div className="jo-manifesto-card">
                <div className="jo-manifesto-label">✦ Viziunea artistei</div>
                <p className="jo-manifesto-quote">
                  „Iubesc să surprind emoțiile și trăirile oamenilor — sentimente ce peste ani vor fi mărturiile vieților lor."
                </p>
                <p className="jo-manifesto-text">
                  Sunt <strong>Ioana Iuliana Vișan</strong>, fotograf din <strong>Ploiești</strong> cu o pasiune profundă pentru arta vizuală și storytelling autentic. Fiecare nuntă pe care o fotografiez este o lume în sine — cu personajele ei, cu tensiunile ei, cu bucuriile ei unice.
                </p>
                <p className="jo-manifesto-text">
                  Nu urmăresc să creez fotografii perfecte tehnic. Urmăresc să capturez <strong>adevărul emoțional</strong> al unui moment — privirea unui mire când vede mireasa, lacrimile unui tată, râsul dintre prieteni. Acestea sunt imaginile pe care le vei privi peste 30 de ani.
                </p>
                <p className="jo-manifesto-text">
                  Disponibilă în <strong>toată România</strong> și internațional pentru nunți, logodne, sesiuni de cuplu și portrete.
                </p>
                <div className="jo-manifesto-sig">
                  <img className="jo-manifesto-sig-avatar" src={profileImg} alt={p.name} />
                  <div>
                    <div className="jo-manifesto-sig-name">Ioana Iuliana Vișan</div>
                    <div className="jo-manifesto-sig-role">JoPhotography · Ploiești, Prahova</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="jo-sidebar">

            <div className="jo-contact-card">
              <div className="jo-ct-label">✦ Contact Direct</div>
              <div className="jo-ct-title">Rezervă ziua ta</div>
              <p className="jo-ct-sub">Contactează-mă pentru disponibilitate și pachete personalizate.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="jo-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="jo-ct-wa" />}
              <p className="jo-ct-note">Răspund în mai puțin de 24h</p>
            </div>

            <div className="jo-conn-card">
              <div className="jo-sh" style={{marginBottom:'14px'}}>
                <span className="jo-sh-pre">Social</span>
                <div className="jo-sh-line" />
              </div>
              <SocialLinks
                provider={p}
                rowClass="jo-conn-row"
                leftClass="jo-conn-l"
                icoClass="jo-conn-ico"
                lblClass="jo-conn-lbl"
                subClass="jo-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="jo-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="jo-loc-row">
                  <div className="jo-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="#C69A6C" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="jo-loc-name">{p.oras}, {p.judet}</div>
                    <div className="jo-loc-sub">Disponibilă deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="jo-share-card">
              <div>
                <div className="jo-share-lbl">Distribuie profilul</div>
                <div className="jo-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="jo-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="jo-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="jo-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('jo-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}