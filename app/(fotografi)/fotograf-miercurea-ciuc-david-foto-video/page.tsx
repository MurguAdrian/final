// app/(fotografi)/fotograf-miercurea-ciuc-david-foto-video/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-miercurea-ciuc-david-foto-video';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
header, footer, .cookie-consent { display:none !important; }

@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Manrope:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.df { font-family:'Manrope',sans-serif; background:#F4F1EC; color:#2B2622; min-height:100vh; overflow-x:hidden; }

/* NAV */
.df-nav {
  position:fixed; top:0; left:0; right:0; z-index:300;
  padding:18px 24px; display:flex; align-items:center; justify-content:space-between;
  transition:all .4s ease;
}
.df-nav.scrolled {
  background:rgba(244,241,236,0.95); backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(43,38,34,0.07);
}
.df-nav-back {
  display:flex; align-items:center; gap:6px; font-size:12px; font-weight:500;
  text-decoration:none; color:rgba(43,38,34,0.5); transition:color .2s;
}
.df-nav-back:hover { color:#2B2622; }
.df-nav-logo { font-family:'Fraunces',serif; font-size:18px; font-style:italic; font-weight:400; color:#2B2622; }

/* HERO — asymmetric split */
.df-hero {
  min-height:100svh; position:relative; display:flex; flex-direction:column;
  background:#F4F1EC;
}

.df-hero-top {
  flex:1; display:grid; grid-template-columns:1fr;
  padding-top:90px;
}
@media(min-width:900px){
  .df-hero-top { grid-template-columns:1.1fr .9fr; padding-top:0; align-items:center; }
}

.df-hero-text {
  padding:24px 24px 32px;
  display:flex; flex-direction:column; justify-content:center;
  position:relative; z-index:5;
}
@media(min-width:900px){ .df-hero-text { padding:40px 24px 40px 56px; } }

.df-hero-eyebrow {
  display:flex; align-items:center; gap:10px; margin-bottom:24px;
  opacity:0; animation:dfUp .8s ease .2s forwards;
}
.df-hero-eyebrow-dot { width:6px; height:6px; background:#A8763E; border-radius:50%; }
.df-hero-eyebrow-text { font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:rgba(43,38,34,0.45); }

.df-hero-h1 {
  font-family:'Fraunces',serif; font-weight:300;
  font-size:clamp(48px,8vw,96px); line-height:.95; color:#2B2622;
  margin-bottom:8px;
  opacity:0; animation:dfUp .9s ease .35s forwards;
}
.df-hero-h1 em { font-style:italic; color:#A8763E; display:block; }

.df-hero-sub {
  font-size:14px; font-weight:500; letter-spacing:.06em; text-transform:uppercase;
  color:rgba(43,38,34,0.4); margin-bottom:28px;
  opacity:0; animation:dfUp .9s ease .5s forwards;
}

.df-hero-desc {
  font-size:15px; line-height:1.8; color:rgba(43,38,34,0.55);
  max-width:440px; margin-bottom:32px;
  opacity:0; animation:dfUp .9s ease .65s forwards;
}
.df-hero-desc strong { color:#2B2622; font-weight:600; }

.df-hero-actions {
  display:flex; gap:12px; flex-wrap:wrap;
  opacity:0; animation:dfUp .9s ease .8s forwards;
}
.df-hero-btn-main {
  display:flex; align-items:center; gap:8px;
  background:#2B2622; color:#F4F1EC; font-size:13px; font-weight:600;
  padding:14px 28px; border-radius:100px; text-decoration:none;
  transition:transform .2s, background .2s;
}
.df-hero-btn-main:hover { transform:translateY(-2px); background:#3a342e; }
.df-hero-btn-outline {
  display:flex; align-items:center; gap:8px;
  background:transparent; border:1px solid rgba(43,38,34,0.2);
  color:rgba(43,38,34,0.6); font-size:13px; font-weight:500;
  padding:14px 24px; border-radius:100px; text-decoration:none;
  transition:all .2s;
}
.df-hero-btn-outline:hover { border-color:rgba(43,38,34,0.4); color:#2B2622; }

@keyframes dfUp {
  from { opacity:0; transform:translateY(22px); }
  to { opacity:1; transform:translateY(0); }
}

.df-hero-visual {
  position:relative; overflow:hidden;
  height:50vh; min-height:340px;
}
@media(min-width:900px){ .df-hero-visual { height:100svh; } }

.df-hero-visual img {
  width:100%; height:100%; object-fit:cover; display:block;
  transform:scale(1.06);
  animation:dfImgIn 1.6s cubic-bezier(.16,1,.3,1) forwards;
}
@keyframes dfImgIn { from{transform:scale(1.12);filter:brightness(.7);} to{transform:scale(1.02);filter:brightness(.95);} }

.df-hero-visual-tag {
  position:absolute; bottom:24px; left:24px; z-index:5;
  background:rgba(244,241,236,0.92); backdrop-filter:blur(8px);
  padding:10px 18px; border-radius:100px;
  font-family:'Fraunces',serif; font-style:italic; font-size:13px; color:#2B2622;
  display:none;
}
@media(min-width:900px){ .df-hero-visual-tag { display:block; } }

/* THUMB STRIP — secondary images mobile */
.df-hero-thumbs {
  display:grid; grid-template-columns:1fr 1fr; gap:3px;
}
@media(min-width:900px){ .df-hero-thumbs { display:none; } }
.df-hero-thumbs img { width:100%; height:140px; object-fit:cover; display:block; filter:brightness(.92); }

/* STRIP */
.df-strip {
  background:#fff; border-bottom:1px solid rgba(43,38,34,0.07);
  padding:16px 24px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .df-strip { padding:18px 48px; } }
.df-strip-avatar {
  width:52px; height:52px; border-radius:50%; flex-shrink:0;
  object-fit:cover; border:2px solid rgba(168,118,62,0.3);
}
.df-strip-name { font-size:15px; font-weight:700; color:#2B2622; }
.df-strip-sub { font-size:12px; color:#A8763E; font-weight:500; }
.df-strip-spacer { flex:1; }
.df-strip-cta {
  display:flex; align-items:center; gap:7px;
  background:#2B2622; color:#F4F1EC; font-size:13px; font-weight:700;
  padding:10px 20px; border-radius:100px; text-decoration:none; white-space:nowrap;
  transition:opacity .2s;
}
.df-strip-cta:hover { opacity:.85; }

/* BODY */
.df-body { max-width:1200px; margin:0 auto; padding:72px 20px 160px; }
@media(min-width:640px){ .df-body { padding:80px 40px 160px; } }
@media(min-width:1024px){ .df-body { display:grid; grid-template-columns:1fr 340px; gap:60px; padding:80px 48px 120px; } }

.df-sh { margin-bottom:28px; }
.df-sh-pre { font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#A8763E; margin-bottom:8px; }
.df-sh-title { font-family:'Fraunces',serif; font-size:clamp(26px,4vw,38px); font-weight:300; color:#2B2622; }
.df-sh-title em { font-style:italic; }

/* GALLERY */
.df-gallery { margin-bottom:60px; }
.df-gal {
  display:grid; grid-template-columns:repeat(6,1fr); gap:10px;
}
@media(max-width:767px){ .df-gal { grid-template-columns:1fr 1fr; } }

.df-gi { position:relative; overflow:hidden; border-radius:18px; background:#e5ddd0; cursor:pointer; }
.df-gi:nth-child(1) { grid-column:1/4; aspect-ratio:4/5; }
.df-gi:nth-child(2) { grid-column:4/7; aspect-ratio:4/5; }
.df-gi:nth-child(3) { grid-column:1/7; aspect-ratio:21/9; }
@media(max-width:767px){
  .df-gi:nth-child(1) { grid-column:1/2; aspect-ratio:3/4; }
  .df-gi:nth-child(2) { grid-column:2/3; aspect-ratio:3/4; }
  .df-gi:nth-child(3) { grid-column:1/-1; aspect-ratio:16/10; }
}

.df-gi img {
  width:100%; height:100%; object-fit:cover; display:block;
  transition:transform .8s cubic-bezier(.16,1,.3,1), filter .4s ease;
  filter:brightness(.95);
}
.df-gi:hover img { transform:scale(1.06); filter:brightness(1.02); }

.df-gi-mask {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(43,38,34,0.85) 0%, transparent 55%);
  opacity:0; transition:opacity .35s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:20px;
}
.df-gi:hover .df-gi-mask { opacity:1; }
.df-gi-label { font-family:'Fraunces',serif; font-style:italic; font-size:16px; color:#F4F1EC; margin-bottom:8px; }
.df-gi-cta {
  display:inline-flex; align-items:center; gap:6px;
  background:#F4F1EC; color:#2B2622; font-size:11px; font-weight:700;
  padding:7px 16px; border-radius:100px; text-decoration:none; width:fit-content;
}

/* STORY */
.df-story { margin-bottom:56px; }
.df-story-card {
  background:#fff; border-radius:28px; padding:44px;
  border:1px solid rgba(43,38,34,0.06);
  position:relative; overflow:hidden;
}
@media(max-width:640px){ .df-story-card { padding:28px 22px; } }
.df-story-card::before {
  content:'"'; position:absolute; top:-30px; left:24px;
  font-family:'Fraunces',serif; font-size:220px; font-style:italic; font-weight:300;
  color:rgba(168,118,62,0.06); line-height:1; pointer-events:none;
}
.df-story-label { font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#A8763E; margin-bottom:20px; position:relative; }
.df-story-quote {
  font-family:'Fraunces',serif; font-size:clamp(20px,3.5vw,28px); font-weight:300; font-style:italic;
  color:#2B2622; line-height:1.5; margin-bottom:24px; position:relative;
}
.df-story-text { font-size:14px; line-height:1.95; color:rgba(43,38,34,0.55); position:relative; }
.df-story-text + .df-story-text { margin-top:14px; }
.df-story-text strong { color:#2B2622; font-weight:700; }

.df-story-sig {
  margin-top:32px; padding-top:24px; position:relative;
  border-top:1px solid rgba(43,38,34,0.08);
  display:flex; align-items:center; gap:14px;
}
.df-story-sig-av { width:48px; height:48px; border-radius:50%; object-fit:cover; border:2px solid rgba(168,118,62,0.25); }
.df-story-sig-name { font-size:14px; font-weight:700; color:#2B2622; }
.df-story-sig-role { font-size:11px; color:rgba(43,38,34,0.4); margin-top:1px; }

/* SIDEBAR */
.df-sidebar { display:flex; flex-direction:column; gap:14px; }

.df-contact-card {
  background:#2B2622; border-radius:24px; padding:28px;
  position:relative; overflow:hidden;
}
.df-contact-card::before {
  content:''; position:absolute; top:-50px; right:-50px;
  width:180px; height:180px; border-radius:50%;
  background:radial-gradient(circle,rgba(168,118,62,0.18) 0%,transparent 65%);
  pointer-events:none;
}
.df-ct-label { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#A8763E; margin-bottom:8px; }
.df-ct-title { font-family:'Fraunces',serif; font-size:23px; font-weight:300; font-style:italic; color:#F4F1EC; margin-bottom:6px; }
.df-ct-sub { font-size:12px; color:rgba(244,241,236,0.4); margin-bottom:20px; line-height:1.7; }
.df-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#A8763E; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  transition:opacity .2s, transform .15s; margin-bottom:8px;
}
.df-ct-btn:hover { opacity:.9; transform:translateY(-1px); }
.df-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.df-ct-wa:hover { opacity:.9; }
.df-ct-note { font-size:11px; color:rgba(244,241,236,0.25); text-align:center; }

.df-conn-card {
  background:#fff; border-radius:24px; padding:22px;
  border:1px solid rgba(43,38,34,0.06);
}
.df-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(43,38,34,0.06);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.df-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.df-conn-row:hover { opacity:.6; }
.df-conn-l { display:flex; align-items:center; gap:12px; }
.df-conn-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.df-conn-lbl { font-size:13.5px; font-weight:500; color:#2B2622; }
.df-conn-sub { font-size:11px; color:rgba(43,38,34,0.38); }

.df-loc-card {
  background:#fff; border-radius:20px; padding:18px 20px;
  border:1px solid rgba(43,38,34,0.06);
}
.df-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#2B2622; transition:opacity .2s; }
.df-loc-row:hover { opacity:.7; }
.df-loc-ico { width:42px; height:42px; border-radius:12px; background:#F4EBDD; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.df-loc-name { font-size:14px; font-weight:600; }
.df-loc-sub { font-size:11px; color:rgba(43,38,34,0.4); margin-top:2px; }

.df-share-card {
  background:#fff; border-radius:18px; padding:16px 18px;
  border:1px solid rgba(43,38,34,0.06);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.df-share-lbl { font-size:12px; font-weight:500; color:rgba(43,38,34,0.45); margin-bottom:3px; }
.df-share-url { font-size:13px; font-weight:700; color:#A8763E; }

/* MOBILE BAR */
.df-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(244,241,236,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(43,38,34,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .df-bar { display:none; } }
.df-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#2B2622; color:#F4F1EC; font-size:14px; font-weight:700;
  padding:13px; border-radius:14px; text-decoration:none;
}
.df-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:13px; font-weight:600;
  padding:13px; border-radius:14px; text-decoration:none;
}
@media(max-width:374px){ .df-hero-h1 { font-size:40px; } }
`;

const GALLERY_LABELS = ['Privirea care spune tot', 'Eleganță naturală', 'Povestea voastră'];

export default async function DavidFotoVideoPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;
  const profileImg = p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill/${p.profile_image}.jpg`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="df">

        {/* NAV */}
        <nav className="df-nav" id="df-nav">
          <a href="/servicii-nunta" className="df-nav-back">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi
          </a>
          <div className="df-nav-logo">David Foto-Video</div>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        {/* HERO */}
        <div className="df-hero">
          <div className="df-hero-top">
            <div className="df-hero-text">
              <div className="df-hero-eyebrow">
                <span className="df-hero-eyebrow-dot" />
                <span className="df-hero-eyebrow-text">Fotograf Verificat · VibeInvite</span>
              </div>
              <h1 className="df-hero-h1">
                David
                <em>Foto-Video</em>
              </h1>
              <p className="df-hero-sub">Miercurea Ciuc · Harghita</p>
              <p className="df-hero-desc">
                Amintiri <strong>trăite din nou</strong>, emoții surprinse la momentul potrivit și povești spuse prin fiecare cadru.
              </p>
              <div className="df-hero-actions">
                {p.phone && (
                  <a href={`tel:${p.phone}`} className="df-hero-btn-main">
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                    </svg>
                    Sună Acum
                  </a>
                )}
                {p.website_url && (
                  <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="df-hero-btn-outline">
                    Vezi Website
                  </a>
                )}
              </div>
            </div>
            <div className="df-hero-visual">
              {galleryIds[0] && (
                <img
                  src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${galleryIds[0]}.jpg`}
                  alt={p.name}
                />
              )}
              <div className="df-hero-visual-tag">Miercurea Ciuc, Harghita</div>
            </div>
          </div>
          {galleryIds.length > 1 && (
            <div className="df-hero-thumbs">
              {galleryIds.slice(1, 3).map((id) => (
                <img key={id} src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_600/${id}.jpg`} alt={p.name} loading="lazy" />
              ))}
            </div>
          )}
        </div>

        {/* STRIP */}
        <div className="df-strip">
          <img className="df-strip-avatar" src={profileImg} alt={p.name} />
          <div>
            <div className="df-strip-name">{p.name}</div>
            <div className="df-strip-sub">Foto-Video Profesionist · {p.oras}</div>
          </div>
          <div className="df-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="df-strip-cta" />}
        </div>

        {/* BODY */}
        <div className="df-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="df-gallery">
                <div className="df-sh">
                  <div className="df-sh-pre">Portofoliu</div>
                  <h2 className="df-sh-title">Momente <em>Reale</em></h2>
                </div>
                <div className="df-gal">
                  {galleryIds.map((id, i) => (
                    <div key={id} className="df-gi">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/${id}.jpg`}
                        alt={`${p.name} – ${GALLERY_LABELS[i] || 'fotografie'}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="df-gi-mask">
                        <div className="df-gi-label">{GALLERY_LABELS[i]}</div>
                        <a href={p.facebook_url || p.website_url || '#'} target="_blank" rel="noopener noreferrer" className="df-gi-cta">
                          Vezi mai mult →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STORY */}
            <div className="df-story">
              <div className="df-sh">
                <div className="df-sh-pre">Despre noi</div>
                <h2 className="df-sh-title">Povestea <em>Noastră</em></h2>
              </div>
              <div className="df-story-card">
                <div className="df-story-label">✦ Filozofia echipei</div>
                <p className="df-story-quote">
                  „David Foto Video înseamnă mai mult decât imagini frumoase — înseamnă amintiri trăite din nou."
                </p>
                <p className="df-story-text">
                  Suntem pasionați de <strong>fotografie și videografie</strong> și credem că fiecare eveniment are o energie unică, care merită păstrată exact așa cum a fost: naturală, sinceră și plină de viață.
                </p>
                <p className="df-story-text">
                  De la <strong>nunți și botezuri</strong> până la evenimente private sau ședințe foto, ne concentrăm pe detalii, pe emoții și pe acele momente pe care nu vrei să le uiți niciodată.
                </p>
                <p className="df-story-text">
                  Adevărata noastră diferență este <strong>atenția la oameni</strong>. Nu ne limităm la a face poze — ne implicăm, observăm, simțim și spunem povestea ta în imagini care rămân valabile peste ani.
                </p>
                <div className="df-story-sig">
                  <img className="df-story-sig-av" src={profileImg} alt={p.name} />
                  <div>
                    <div className="df-story-sig-name">David Foto-Video</div>
                    <div className="df-story-sig-role">Miercurea Ciuc, Harghita</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="df-sidebar">

            <div className="df-contact-card">
              <div className="df-ct-label">✦ Contact Direct</div>
              <div className="df-ct-title">Hai să povestim</div>
              <p className="df-ct-sub">Contactează-ne pentru disponibilitate și o ofertă personalizată.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="df-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="df-ct-wa" />}
              <p className="df-ct-note">Răspundem în mai puțin de 24h</p>
            </div>

            <div className="df-conn-card">
              <div className="df-sh" style={{marginBottom:'14px'}}>
                <div className="df-sh-pre">Social</div>
              </div>
              <SocialLinks
                provider={p}
                rowClass="df-conn-row"
                leftClass="df-conn-l"
                icoClass="df-conn-ico"
                lblClass="df-conn-lbl"
                subClass="df-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="df-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="df-loc-row">
                  <div className="df-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="#A8763E" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="df-loc-name">{p.oras}, {p.judet}</div>
                    <div className="df-loc-sub">Disponibili deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="df-share-card">
              <div>
                <div className="df-share-lbl">Distribuie profilul</div>
                <div className="df-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="df-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="df-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="df-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('df-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}