// app/(fotografi)/fotograf-targoviste-bianca-sfetcu/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-targoviste-bianca-sfetcu';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.bs { font-family:'DM Sans',sans-serif; background:#FDF9F6; color:#1A0A0A; min-height:100vh; overflow-x:hidden; }

/* NAV */
.bs-nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  padding:16px 24px; display:flex; align-items:center; justify-content:space-between;
  transition:all .4s ease;
}
.bs-nav.scrolled {
  background:rgba(253,249,246,0.97); backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(26,10,10,0.07); padding:12px 24px;
}
.bs-nav-back {
  display:flex; align-items:center; gap:6px; font-size:12px; font-weight:500;
  text-decoration:none; color:rgba(255,255,255,0.8); letter-spacing:.04em;
  transition:color .2s;
}
.bs-nav.scrolled .bs-nav-back { color:#1A0A0A; }
.bs-nav-back:hover { opacity:.7; }
.bs-nav-brand {
  font-family:'Playfair Display',serif; font-size:16px; font-style:italic;
  color:#fff; transition:color .2s; letter-spacing:.02em;
}
.bs-nav.scrolled .bs-nav-brand { color:#1A0A0A; }

/* HERO — vertical split cu imagini portret */
.bs-hero {
  min-height:100svh; display:flex; flex-direction:column;
  position:relative; background:#1A0A0A; overflow:hidden;
}
@media(min-width:768px){ .bs-hero { flex-direction:row; } }

.bs-hero-gallery {
  display:grid; grid-template-columns:1fr 1fr;
  grid-template-rows:280px 280px;
  height:auto; flex-shrink:0;
}
@media(min-width:768px){
  .bs-hero-gallery {
    width:55%; height:100svh; grid-template-columns:1fr 1fr;
    grid-template-rows:1fr 1fr;
  }
}

.bs-hi { position:relative; overflow:hidden; }
.bs-hi:nth-child(1) { grid-column:1/-1; }
@media(min-width:768px){ .bs-hi:nth-child(1) { grid-column:1/2; grid-row:1/3; } }
.bs-hi:nth-child(2) { }
@media(min-width:768px){ .bs-hi:nth-child(2) { grid-row:1/2; } }
.bs-hi:nth-child(3) { }
@media(min-width:768px){ .bs-hi:nth-child(3) { grid-row:2/3; } }
.bs-hi img {
  width:100%; height:100%; object-fit:cover; object-position:center top;
  display:block; filter:brightness(.88) saturate(1.05);
  transition:transform .8s cubic-bezier(.16,1,.3,1), filter .4s ease;
}
.bs-hi:hover img { transform:scale(1.06); filter:brightness(.95) saturate(1.1); }
.bs-hi::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(to bottom, transparent 50%, rgba(26,10,10,0.4) 100%);
  pointer-events:none;
}

/* HERO CONTENT */
.bs-hero-content {
  flex:1; display:flex; flex-direction:column; justify-content:center;
  padding:48px 32px;
  position:relative;
}
@media(min-width:768px){ .bs-hero-content { padding:80px 56px; width:45%; } }

.bs-hero-content::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse at 80% 20%, rgba(180,120,100,0.12) 0%, transparent 60%);
  pointer-events:none;
}

.bs-hero-tag {
  display:inline-flex; align-items:center; gap:8px; width:fit-content;
  margin-bottom:28px;
  opacity:0; animation:bsFadeUp .8s ease .3s forwards;
}
.bs-hero-tag-line { width:28px; height:1px; background:rgba(180,120,100,0.6); }
.bs-hero-tag-text {
  font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  color:rgba(180,120,100,0.8);
}

.bs-hero-h1 {
  font-family:'Playfair Display',serif;
  font-size:clamp(44px,7vw,88px); font-weight:400; color:#fff;
  line-height:.92; margin-bottom:6px;
  opacity:0; animation:bsFadeUp .8s ease .5s forwards;
}
.bs-hero-h1-sub {
  font-family:'Playfair Display',serif;
  font-size:clamp(28px,4vw,52px); font-weight:400; font-style:italic;
  color:rgba(180,120,100,0.75); line-height:1; margin-bottom:28px;
  opacity:0; animation:bsFadeUp .8s ease .65s forwards;
}

.bs-hero-desc {
  font-size:14px; line-height:1.85; color:rgba(255,255,255,0.45);
  max-width:320px; margin-bottom:36px;
  opacity:0; animation:bsFadeUp .8s ease .8s forwards;
}
.bs-hero-desc em { color:rgba(180,120,100,0.7); font-style:italic; }

.bs-hero-loc {
  display:flex; align-items:center; gap:6px;
  font-size:12px; color:rgba(255,255,255,0.35); margin-bottom:40px;
  opacity:0; animation:bsFadeUp .8s ease .9s forwards;
}

.bs-hero-actions {
  display:flex; gap:12px; flex-wrap:wrap;
  opacity:0; animation:bsFadeUp .8s ease 1.05s forwards;
}
.bs-hero-btn-main {
  display:flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#B47864,#9A5E50);
  color:#fff; font-size:13px; font-weight:700;
  padding:14px 28px; border-radius:100px; text-decoration:none;
  box-shadow:0 8px 32px rgba(180,120,100,0.35);
  transition:transform .2s, box-shadow .2s;
}
.bs-hero-btn-main:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(180,120,100,0.45); }
.bs-hero-btn-ig {
  display:flex; align-items:center; gap:8px;
  background:transparent; border:1px solid rgba(255,255,255,0.18);
  color:rgba(255,255,255,0.65); font-size:13px; font-weight:500;
  padding:14px 24px; border-radius:100px; text-decoration:none;
  transition:all .2s;
}
.bs-hero-btn-ig:hover { border-color:rgba(255,255,255,0.45); color:#fff; }

@keyframes bsFadeUp {
  from { opacity:0; transform:translateY(24px); }
  to { opacity:1; transform:translateY(0); }
}

/* FLOATING BADGE */
.bs-badge {
  position:absolute; bottom:32px; right:32px;
  width:100px; height:100px; border-radius:50%;
  background:rgba(180,120,100,0.15); border:1px solid rgba(180,120,100,0.25);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  animation:bsSpin 20s linear infinite;
  display:none;
}
@media(min-width:768px){ .bs-badge { display:flex; } }
@keyframes bsSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.bs-badge-inner { animation:bsSpinReverse 20s linear infinite; text-align:center; }
@keyframes bsSpinReverse { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
.bs-badge-num { font-family:'Playfair Display',serif; font-size:22px; color:rgba(180,120,100,0.8); }
.bs-badge-txt { font-size:8px; color:rgba(255,255,255,0.3); letter-spacing:.08em; text-transform:uppercase; }

/* STRIP */
.bs-strip {
  background:#fff; border-bottom:1px solid rgba(26,10,10,0.07);
  padding:16px 24px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .bs-strip { padding:18px 48px; } }
.bs-strip-avatar {
  width:52px; height:52px; border-radius:50%; flex-shrink:0;
  object-fit:cover; object-position:center top;
  border:2px solid rgba(180,120,100,0.3);
}
.bs-strip-name { font-size:15px; font-weight:700; color:#1A0A0A; }
.bs-strip-sub { font-size:12px; color:#B47864; font-weight:500; }
.bs-strip-spacer { flex:1; }
.bs-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:linear-gradient(135deg,#B47864,#9A5E50);
  color:#fff; font-size:13px; font-weight:700;
  padding:10px 20px; border-radius:100px; text-decoration:none; white-space:nowrap;
  box-shadow:0 4px 16px rgba(180,120,100,0.3); transition:opacity .2s;
}
.bs-strip-cta:hover { opacity:.9; }

/* BODY */
.bs-body { max-width:1200px; margin:0 auto; padding:72px 20px 160px; }
@media(min-width:640px){ .bs-body { padding:80px 40px 160px; } }
@media(min-width:1024px){ .bs-body { display:grid; grid-template-columns:1fr 340px; gap:64px; padding:80px 48px 120px; } }

.bs-sh { margin-bottom:28px; }
.bs-sh-pre { font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#B47864; display:block; margin-bottom:6px; }
.bs-sh-title { font-family:'Playfair Display',serif; font-size:clamp(24px,4vw,36px); font-weight:400; color:#1A0A0A; }
.bs-sh-title em { font-style:italic; }

/* GALLERY — portrait masonry */
.bs-gallery { margin-bottom:64px; }
.bs-gal {
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:8px; height:520px;
}
@media(max-width:767px){
  .bs-gal { grid-template-columns:1fr 1fr; height:auto; }
}

.bs-gi { position:relative; overflow:hidden; border-radius:16px; background:#e8ddd8; cursor:pointer; }
@media(max-width:767px){
  .bs-gi { aspect-ratio:2/3; }
  .bs-gi:nth-child(1) { grid-column:1/-1; aspect-ratio:3/2; }
}

.bs-gi img {
  width:100%; height:100%; object-fit:cover; object-position:center top;
  display:block; transition:transform .7s cubic-bezier(.16,1,.3,1), filter .4s;
  filter:brightness(.93) saturate(1.02);
}
.bs-gi:hover img { transform:scale(1.08); filter:brightness(1) saturate(1.08); }

.bs-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(26,10,10,0.9) 0%, transparent 55%);
  opacity:0; transition:opacity .35s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:16px;
}
.bs-gi:hover .bs-gi-mask { opacity:1; }
.bs-gi-num { font-family:'Playfair Display',serif; font-size:32px; font-weight:400; font-style:italic; color:rgba(180,120,100,0.5); line-height:1; margin-bottom:4px; }
.bs-gi-label { font-size:10px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:.1em; margin-bottom:8px; }
.bs-gi-cta {
  display:inline-flex; align-items:center; gap:5px;
  background:rgba(255,255,255,0.95); color:#1A0A0A;
  font-size:11px; font-weight:700;
  padding:6px 14px; border-radius:100px; text-decoration:none; width:fit-content;
}

/* STORY */
.bs-story { margin-bottom:56px; }
.bs-story-card {
  position:relative; border-radius:28px; overflow:hidden;
  background:#1A0A0A; padding:48px 40px;
}
@media(max-width:640px){ .bs-story-card { padding:32px 24px; } }

.bs-story-card::before {
  content:'LOVE'; position:absolute;
  font-family:'Playfair Display',serif; font-size:180px; font-weight:700; font-style:italic;
  color:rgba(180,120,100,0.04); line-height:1;
  bottom:-20px; right:-10px; pointer-events:none; white-space:nowrap;
}

.bs-story-grid {
  display:grid; gap:32px;
}
@media(min-width:640px){ .bs-story-grid { grid-template-columns:1fr 1fr; } }

.bs-story-left {}
.bs-story-pre { font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgba(180,120,100,0.6); margin-bottom:16px; }
.bs-story-quote {
  font-family:'Playfair Display',serif;
  font-size:clamp(18px,3vw,26px); font-weight:400; font-style:italic;
  color:#fff; line-height:1.5; margin-bottom:20px;
  border-left:2px solid rgba(180,120,100,0.4); padding-left:20px;
}
.bs-story-text { font-size:13.5px; line-height:1.9; color:rgba(255,255,255,0.45); }
.bs-story-text strong { color:rgba(255,255,255,0.8); font-weight:600; }
.bs-story-text + .bs-story-text { margin-top:12px; }

.bs-story-right { display:flex; flex-direction:column; gap:16px; }
.bs-story-stat {
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);
  border-radius:18px; padding:20px 22px;
  display:flex; align-items:center; gap:16px;
}
.bs-story-stat-n { font-family:'Playfair Display',serif; font-size:36px; font-weight:400; color:#B47864; line-height:1; flex-shrink:0; }
.bs-story-stat-l { font-size:12px; color:rgba(255,255,255,0.4); line-height:1.5; }
.bs-story-stat-l strong { color:rgba(255,255,255,0.7); font-weight:600; display:block; font-size:13px; }

.bs-story-sig {
  margin-top:32px; padding-top:24px;
  border-top:1px solid rgba(255,255,255,0.07);
  display:flex; align-items:center; gap:14px;
}
.bs-story-sig-av { width:44px; height:44px; border-radius:50%; object-fit:cover; object-position:center top; border:1px solid rgba(180,120,100,0.3); }
.bs-story-sig-name { font-size:14px; font-weight:600; color:#fff; }
.bs-story-sig-role { font-size:11px; color:rgba(255,255,255,0.3); margin-top:1px; }

/* SIDEBAR */
.bs-sidebar { display:flex; flex-direction:column; gap:14px; }

.bs-contact-card {
  background:linear-gradient(160deg,#1A0A0A 0%,#2d1010 100%);
  border-radius:24px; padding:26px;
  border:1px solid rgba(180,120,100,0.15); position:relative; overflow:hidden;
}
.bs-contact-card::before {
  content:''; position:absolute; top:-60px; right:-60px;
  width:200px; height:200px; border-radius:50%;
  background:radial-gradient(circle,rgba(180,120,100,0.15) 0%,transparent 65%);
  pointer-events:none;
}
.bs-ct-label { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:rgba(180,120,100,0.6); margin-bottom:8px; }
.bs-ct-title { font-family:'Playfair Display',serif; font-size:22px; font-weight:400; font-style:italic; color:#fff; margin-bottom:6px; }
.bs-ct-sub { font-size:12px; color:rgba(255,255,255,0.35); margin-bottom:20px; line-height:1.7; }
.bs-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:linear-gradient(135deg,#B47864,#9A5E50);
  color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  box-shadow:0 6px 24px rgba(180,120,100,0.3);
  transition:opacity .2s, transform .15s; margin-bottom:8px;
}
.bs-ct-btn:hover { opacity:.9; transform:translateY(-1px); }
.bs-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.bs-ct-wa:hover { opacity:.9; }
.bs-ct-note { font-size:11px; color:rgba(255,255,255,0.2); text-align:center; }

.bs-conn-card {
  background:#fff; border-radius:24px; padding:20px;
  border:1px solid rgba(26,10,10,0.07); box-shadow:0 2px 14px rgba(0,0,0,0.04);
}
.bs-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(26,10,10,0.06);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.bs-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.bs-conn-row:hover { opacity:.65; }
.bs-conn-l { display:flex; align-items:center; gap:12px; }
.bs-conn-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.bs-conn-lbl { font-size:13.5px; font-weight:500; color:#1A0A0A; }
.bs-conn-sub { font-size:11px; color:rgba(26,10,10,0.38); }

.bs-loc-card {
  background:#fff; border-radius:20px; padding:18px 20px;
  border:1px solid rgba(26,10,10,0.07); box-shadow:0 2px 14px rgba(0,0,0,0.03);
}
.bs-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#1A0A0A; transition:opacity .2s; }
.bs-loc-row:hover { opacity:.7; }
.bs-loc-ico { width:42px; height:42px; border-radius:12px; background:#FFF0EC; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.bs-loc-name { font-size:14px; font-weight:600; }
.bs-loc-sub { font-size:11px; color:rgba(26,10,10,0.4); margin-top:2px; }

.bs-share-card {
  background:#FDF9F6; border-radius:18px; padding:16px 18px;
  border:1px solid rgba(26,10,10,0.07);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.bs-share-lbl { font-size:12px; font-weight:500; color:rgba(26,10,10,0.45); margin-bottom:3px; }
.bs-share-url { font-size:13px; font-weight:700; color:#B47864; }

/* MOBILE BAR */
.bs-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(253,249,246,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(26,10,10,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .bs-bar { display:none; } }
.bs-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(135deg,#B47864,#9A5E50); color:#fff;
  font-size:14px; font-weight:700; padding:13px; border-radius:14px; text-decoration:none;
  box-shadow:0 4px 16px rgba(180,120,100,0.28);
}
.bs-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff;
  font-size:13px; font-weight:600; padding:13px; border-radius:14px; text-decoration:none;
}
@media(max-width:374px){ .bs-hero-h1 { font-size:38px; } }
`;

const GALLERY_LABELS = [
  'Iubire în lumină',
  'Sărut complice',
  'Emoție pură',
  'Cererea în căsătorie',
  'Apus de poveste',
];

export default async function BiancaSfetcuPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill,g_face/${p.profile_image}.jpg`;
  const heroImgs = galleryIds.slice(0, 3);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="bs">

        {/* NAV */}
        <nav className="bs-nav" id="bs-nav">
          <a href="/servicii-nunta" className="bs-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="bs-nav-brand">Bianca Sfetcu</div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="bs-hero">
          <div className="bs-hero-gallery">
            {heroImgs.map((id, i) => (
              <div key={id} className="bs-hi">
                <img
                  src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${id}.jpg`}
                  alt={`${p.name} ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          <div className="bs-hero-content">
            <div className="bs-hero-tag">
              <div className="bs-hero-tag-line" />
              <span className="bs-hero-tag-text">Fotograf Verificat · VibeInvite</span>
            </div>
            <h1 className="bs-hero-h1">Bianca</h1>
            <div className="bs-hero-h1-sub">Sfetcu</div>
            <p className="bs-hero-desc">
              Surprind <em>iubirea în toate formele ei</em> — de la privirea dintre doi oameni până la lacrimile de bucurie ale unei mame.
            </p>
            <div className="bs-hero-loc">
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {p.oras}, {p.judet} · Disponibilă național
            </div>
            <div className="bs-hero-actions">
              {p.phone && (
                <a href={`tel:${p.phone}`} className="bs-hero-btn-main">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Sună Acum
                </a>
              )}
              {p.instagram_url && (
                <a href={p.instagram_url} target="_blank" rel="noopener noreferrer" className="bs-hero-btn-ig">
                  Instagram
                </a>
              )}
            </div>
            <div className="bs-badge">
              <div className="bs-badge-inner">
                <div className="bs-badge-num">∞</div>
                <div className="bs-badge-txt">Amintiri</div>
              </div>
            </div>
          </div>
        </div>

        {/* STRIP */}
        <div className="bs-strip">
          <img className="bs-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="bs-strip-name">{p.name}</div>
            <div className="bs-strip-sub">Fotograf Foto-Video · {p.oras}</div>
          </div>
          <div className="bs-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="bs-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="bs-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="bs-gallery">
                <div className="bs-sh">
                  <span className="bs-sh-pre">Portofoliu</span>
                  <h2 className="bs-sh-title">Momente <em>Eterne</em></h2>
                </div>
                <div className="bs-gal">
                  {galleryIds.map((id, i) => (
                    <div key={id} className="bs-gi">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${id}.jpg`}
                        alt={`${p.name} – ${GALLERY_LABELS[i] || 'fotografie'}`}
                        loading="lazy"
                      />
                      <div className="bs-gi-mask">
                        <div className="bs-gi-num">0{i + 1}</div>
                        <div className="bs-gi-label">{GALLERY_LABELS[i]}</div>
                        <a href={p.facebook_url || p.instagram_url || '#'} target="_blank" rel="noopener noreferrer" className="bs-gi-cta">
                          Vezi mai mult →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STORY */}
            <div className="bs-story">
              <div className="bs-sh">
                <span className="bs-sh-pre">Povestea mea</span>
                <h2 className="bs-sh-title">Despre <em>Bianca</em></h2>
              </div>
              <div className="bs-story-card">
                <div className="bs-story-grid">
                  <div className="bs-story-left">
                    <div className="bs-story-pre">✦ Viziunea artistei</div>
                    <p className="bs-story-quote">
                      „Surprind iubirea în toate formele ei — de la prima privire până la ultima dans."
                    </p>
                    <p className="bs-story-text">
                      Sunt <strong>Bianca Sfetcu</strong>, fotograf și videograf din <strong>Târgoviște</strong>, cu o pasiune adâncă pentru poveștile de iubire autentice. Cred că fiecare cuplu are o poveste unică — și misiunea mea e să o captez cu sensibilitate și artă.
                    </p>
                    <p className="bs-story-text">
                      Lucrez discret, cu respect pentru intimitatea momentelor, dar cu un ochi mereu atent la detaliile care fac diferența: o mână strânsă, un zâmbet furat, o lacrimă de bucurie.
                    </p>
                    <p className="bs-story-text">
                      Disponibilă în <strong>toată România</strong> pentru nunți, logodne, sesiuni cuplu și portrete.
                    </p>
                  </div>
                  <div className="bs-story-right">
                    <div className="bs-story-stat">
                      <div className="bs-story-stat-n">5+</div>
                      <div className="bs-story-stat-l"><strong>Ani de experiență</strong>Pasiune transformată în artă</div>
                    </div>
                    <div className="bs-story-stat">
                      <div className="bs-story-stat-n">150+</div>
                      <div className="bs-story-stat-l"><strong>Nunți fotografiate</strong>Povești de iubire imortalizate</div>
                    </div>
                    <div className="bs-story-stat">
                      <div className="bs-story-stat-n">100%</div>
                      <div className="bs-story-stat-l"><strong>Dedicare totală</strong>Fiecare nuntă, un proiect personal</div>
                    </div>
                  </div>
                </div>
                <div className="bs-story-sig">
                  <img className="bs-story-sig-av" src={profileImg} alt={p.name} />
                  <div>
                    <div className="bs-story-sig-name">Bianca Sfetcu</div>
                    <div className="bs-story-sig-role">Fotograf Foto-Video · {p.oras}, {p.judet}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="bs-sidebar">

            <div className="bs-contact-card">
              <div className="bs-ct-label">✦ Rezervă acum</div>
              <div className="bs-ct-title">Hai să creăm magia</div>
              <p className="bs-ct-sub">Contactează-mă direct pentru disponibilitate și pachete personalizate.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="bs-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="bs-ct-wa" />}
              <p className="bs-ct-note">Răspund în mai puțin de 24h</p>
            </div>

            <div className="bs-conn-card">
              <div className="bs-sh" style={{marginBottom:'14px'}}>
                <span className="bs-sh-pre">Social Media</span>
              </div>
              <SocialLinks
                provider={p}
                rowClass="bs-conn-row"
                leftClass="bs-conn-l"
                icoClass="bs-conn-ico"
                lblClass="bs-conn-lbl"
                subClass="bs-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="bs-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="bs-loc-row">
                  <div className="bs-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="#B47864" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="bs-loc-name">{p.oras}, {p.judet}</div>
                    <div className="bs-loc-sub">Disponibilă deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="bs-share-card">
              <div>
                <div className="bs-share-lbl">Distribuie profilul</div>
                <div className="bs-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="bs-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="bs-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="bs-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('bs-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}