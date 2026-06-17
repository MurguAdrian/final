// app/fotograf-onesti-dragoi-george-adrian/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from './TrackView';
import ShareButton from './ShareButton';
import ContactBar from './ContactBar';
import CallButton from './CallButton';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-onesti-dragoi-george-adrian';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.fp { font-family:'DM Sans',sans-serif; background:#FDFAF6; color:#1A1208; min-height:100vh; }

/* NAV */
.fp-nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:12px 20px;
  transition:background .3s, backdrop-filter .3s, border-color .3s;
  border-bottom:1px solid transparent;
}
.fp-nav.scrolled {
  background:rgba(253,250,246,0.96); backdrop-filter:blur(20px);
  border-bottom-color:rgba(26,18,8,0.07);
}
.fp-nav-back {
  display:flex; align-items:center; gap:6px;
  font-size:13px; font-weight:500; text-decoration:none;
  background:rgba(255,255,255,0.92); border:1px solid rgba(26,18,8,0.1);
  padding:8px 16px; border-radius:100px; backdrop-filter:blur(8px);
  color:#1A1208; transition:background .2s;
}
.fp-nav-back:hover { background:#fff; }

/* HERO — banner generat cu gradient */
.fp-hero {
  height:320px; position:relative; overflow:hidden;
  background:linear-gradient(135deg,#1A1208 0%,#2d1f0e 40%,#3d2510 70%,#1A1208 100%);
}
@media(min-width:768px){ .fp-hero { height:380px; } }
.fp-hero-orb1 {
  position:absolute; width:500px; height:500px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,107,0,0.22) 0%, transparent 65%);
  top:-150px; right:-100px; pointer-events:none;
}
.fp-hero-orb2 {
  position:absolute; width:300px; height:300px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,180,80,0.12) 0%, transparent 65%);
  bottom:-80px; left:-60px; pointer-events:none;
}
.fp-hero-pattern {
  position:absolute; inset:0; opacity:.04;
  background-image:repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%);
  background-size:20px 20px;
}
.fp-hero-content {
  position:absolute; inset:0; display:flex; flex-direction:column;
  align-items:center; justify-content:center; text-align:center; padding:24px;
}
.fp-hero-eyebrow {
  display:inline-flex; align-items:center; gap:7px;
  background:rgba(255,107,0,0.15); border:1px solid rgba(255,107,0,0.3);
  color:#FF8C35; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  padding:4px 16px; border-radius:100px; margin-bottom:16px;
}
.fp-hero-dot { width:5px; height:5px; background:#FF6B00; border-radius:50%; }
.fp-hero-name {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(36px,8vw,72px); font-weight:300; color:#fff; line-height:1.05; margin-bottom:14px;
}
.fp-hero-name em { font-style:italic; color:#FFAD70; }
.fp-hero-pills { display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; }
.fp-hero-pill {
  background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18);
  color:rgba(255,255,255,0.75); font-size:12px; font-weight:500;
  padding:5px 14px; border-radius:100px;
}

/* PROFILE STRIP */
.fp-strip {
  background:#fff; border-bottom:1px solid rgba(26,18,8,0.06);
  padding:16px 20px; display:flex; align-items:center; gap:14px;
}
@media(min-width:640px){ .fp-strip { padding:18px 36px; gap:18px; } }
.fp-strip-avatar {
  width:56px; height:56px; border-radius:50%; flex-shrink:0;
  object-fit:cover; object-position:center top;
  border:2px solid rgba(255,107,0,0.3);
}
.fp-strip-name { font-size:15px; font-weight:700; color:#1A1208; }
.fp-strip-sub { font-size:12px; color:#FF6B00; font-weight:500; }
.fp-strip-spacer { flex:1; }
.fp-strip-cta {
  display:flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#FF6B00,#FF8C35);
  color:#fff; font-size:13px; font-weight:600;
  padding:10px 20px; border-radius:12px; text-decoration:none;
  box-shadow:0 4px 16px rgba(255,107,0,0.25); white-space:nowrap;
  transition:opacity .2s;
}
.fp-strip-cta:hover { opacity:.9; }

/* BODY */
.fp-body { max-width:1100px; margin:0 auto; padding:36px 16px 140px; }
@media(min-width:640px){ .fp-body { padding:44px 28px 140px; } }
@media(min-width:1024px){ .fp-body { display:grid; grid-template-columns:1fr 340px; gap:40px; padding:44px 40px 100px; } }

.fp-sh { display:flex; align-items:center; gap:12px; margin-bottom:20px; }
.fp-sh-title { font-family:'Cormorant Garamond',serif; font-size:clamp(20px,3.5vw,28px); font-weight:300; color:#1A1208; white-space:nowrap; }
.fp-sh-title em { font-style:italic; color:#FF6B00; }
.fp-sh-line { flex:1; height:1px; background:rgba(26,18,8,0.08); }

/* GALLERY */
.fp-gallery { margin-bottom:36px; }
.fp-gal-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.fp-gi { position:relative; overflow:hidden; border-radius:16px; background:#f0ece6; cursor:pointer; }
.fp-gi:nth-child(1) { grid-column:1/-1; }
.fp-gi { aspect-ratio:unset; }
.fp-gi:nth-child(1) { aspect-ratio:4/3; }
.fp-gi:not(:nth-child(1)) { aspect-ratio:1; }
.fp-gi img { width:100%; height:100%; object-fit:contain; object-position:center; display:block; transition:transform .5s ease; background:#f0ece6; position:absolute; inset:0; }
.fp-gi { position:relative; }
.fp-gi::before { content:''; display:block; padding-top:100%; }
.fp-gi:nth-child(1)::before { padding-top:75%; }.fp-gi:hover img { transform:scale(1.04); }
.fp-gi-mask {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(26,18,8,0.8) 0%, transparent 50%);
  opacity:0; transition:opacity .3s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:14px;
}
.fp-gi:hover .fp-gi-mask { opacity:1; }
.fp-gi-label { font-size:10px; color:rgba(255,255,255,0.55); text-transform:uppercase; letter-spacing:.08em; margin-bottom:5px; }
.fp-gi-cta {
  display:inline-flex; align-items:center; gap:5px;
  background:#fff; color:#1A1208; font-size:12px; font-weight:700;
  padding:6px 14px; border-radius:100px; text-decoration:none; width:fit-content;
}

/* ABOUT */
.fp-about { margin-bottom:36px; }
.fp-about-card {
  background:#fff; border-radius:24px; padding:28px;
  border:1px solid rgba(26,18,8,0.06); box-shadow:0 2px 16px rgba(0,0,0,0.04);
}
.fp-about-quote {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(17px,3vw,22px); font-weight:300; font-style:italic;
  color:#1A1208; line-height:1.5; margin-bottom:18px;
  border-left:3px solid #FF6B00; padding-left:18px;
}
.fp-about-text { font-size:14px; line-height:1.9; color:rgba(26,18,8,0.62); margin-bottom:12px; }
.fp-about-text strong { color:#1A1208; font-weight:600; }
.fp-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:22px; }
.fp-stat { background:#FDFAF6; border-radius:16px; padding:16px 10px; text-align:center; border:1px solid rgba(26,18,8,0.05); }
.fp-stat-n { font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:600; color:#FF6B00; line-height:1; }
.fp-stat-l { font-size:10.5px; color:rgba(26,18,8,0.42); margin-top:4px; line-height:1.3; }

/* SIDEBAR */
.fp-sidebar { display:flex; flex-direction:column; gap:14px; }

.fp-contact-card {
  background:linear-gradient(135deg,#1A1208 0%,#2d1f0e 100%);
  border-radius:24px; padding:24px; position:relative; overflow:hidden;
}
.fp-contact-card::before {
  content:''; position:absolute; top:-50px; right:-50px;
  width:180px; height:180px; border-radius:50%;
  background:rgba(255,107,0,0.1); pointer-events:none;
}
.fp-ct-title { font-family:'Cormorant Garamond',serif; font-size:21px; font-weight:300; color:#fff; margin-bottom:6px; }
.fp-ct-sub { font-size:12px; color:rgba(255,255,255,0.42); margin-bottom:20px; line-height:1.65; }
.fp-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:linear-gradient(135deg,#FF6B00,#FF8C35);
  color:#fff; font-size:15px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  box-shadow:0 6px 24px rgba(255,107,0,0.38);
  transition:opacity .2s, transform .15s; margin-bottom:10px;
}
.fp-ct-btn:hover { opacity:.9; transform:translateY(-1px); }
.fp-ct-note { font-size:11px; color:rgba(255,255,255,0.28); text-align:center; }

.fp-conn-card {
  background:#fff; border-radius:24px; padding:20px;
  border:1px solid rgba(26,18,8,0.06); box-shadow:0 2px 14px rgba(0,0,0,0.04);
}
.fp-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(26,18,8,0.05);
  text-decoration:none; transition:opacity .2s;
}
.fp-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.fp-conn-row:hover { opacity:.7; }
.fp-conn-l { display:flex; align-items:center; gap:12px; }
.fp-conn-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.fp-conn-lbl { font-size:13.5px; font-weight:500; color:#1A1208; }
.fp-conn-sub { font-size:11px; color:rgba(26,18,8,0.38); }

.fp-loc-card {
  background:#fff; border-radius:20px; padding:18px 20px;
  border:1px solid rgba(26,18,8,0.06); box-shadow:0 2px 14px rgba(0,0,0,0.04);
}
.fp-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#1A1208; transition:opacity .2s; }
.fp-loc-row:hover { opacity:.7; }
.fp-loc-ico { width:42px; height:42px; border-radius:12px; background:#FFF4ED; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.fp-loc-name { font-size:14px; font-weight:600; }
.fp-loc-sub { font-size:11px; color:rgba(26,18,8,0.4); margin-top:2px; }

.fp-share-card {
  background:#F5F0EA; border-radius:18px; padding:16px 18px;
  border:1px solid rgba(26,18,8,0.06);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.fp-share-lbl { font-size:12px; font-weight:500; color:rgba(26,18,8,0.55); margin-bottom:3px; }
.fp-share-url { font-size:13px; font-weight:700; color:#FF6B00; }

/* MOBILE BAR */
.fp-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(253,250,246,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(26,18,8,0.07);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .fp-bar { display:none; } }
.fp-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(135deg,#FF6B00,#FF8C35); color:#fff;
  font-size:14px; font-weight:700; padding:13px; border-radius:14px; text-decoration:none;
  box-shadow:0 4px 16px rgba(255,107,0,0.28);
}
.fp-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff;
  font-size:13px; font-weight:600; padding:13px; border-radius:14px; text-decoration:none;
}
@media(min-width:1024px){ .fp-bar { display:none; } }
.fp-bar-call {
  flex:2; display:flex; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(135deg,#FF6B00,#FF8C35); color:#fff;
  font-size:14px; font-weight:700; padding:13px; border-radius:14px; text-decoration:none;
  box-shadow:0 4px 16px rgba(255,107,0,0.28);
}
.fp-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff;
  font-size:13px; font-weight:600; padding:13px; border-radius:14px; text-decoration:none;
}
.fp-bar-share-btn {
  width:50px; display:flex; align-items:center; justify-content:center;
  background:#F5F0EA; border-radius:14px; border:none; cursor:pointer; color:rgba(26,18,8,0.55);
}
`;

const GALLERY_LABELS = ['Momente de neuitat', 'Emoție autentică', 'Lumină naturală', 'Povești vizuale'];

export default async function FotografDragoiPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="fp">

        {/* NAV */}
        <nav className="fp-nav" id="fp-nav">
          <a href="/servicii-nunta" className="fp-nav-back">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Furnizori
          </a>
        </nav>

        {/* HERO — banner generat, fără imagine */}
        <div className="fp-hero">
          <div className="fp-hero-orb1" />
          <div className="fp-hero-orb2" />
          <div className="fp-hero-pattern" />
          <div className="fp-hero-content">
            <div className="fp-hero-eyebrow">
              <span className="fp-hero-dot" />
              Fotograf Verificat · VibeInvite
            </div>
            <h1 className="fp-hero-name">
              {p.name.split(' ')[0]} <em>{p.name.split(' ').slice(1).join(' ')}</em>
            </h1>
            <div className="fp-hero-pills">
              <span className="fp-hero-pill">📷 {p.subtype}</span>
              <span className="fp-hero-pill">📍 {p.oras}, {p.judet}</span>
              <span className="fp-hero-pill">⭐ 13+ ani experiență</span>
            </div>
          </div>
        </div>

        {/* STRIP */}
        <div className="fp-strip">
          <img
            className="fp-strip-avatar"
src={p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill,g_face/${p.profile_image}.jpg`}            alt={p.name}
          />
          <div>
            <div className="fp-strip-name">{p.name}</div>
            <div className="fp-strip-sub">Fotograf Profesionist · {p.oras}</div>
          </div>
          <div className="fp-strip-spacer" />
{p.phone && (
  <CallButton phone={p.phone} slug={p.slug} />
)}
        </div>

        {/* BODY */}
        <div className="fp-body">
          <div>

            {/* GALLERY */}
            {galleryIds.length > 0 && (
              <div className="fp-gallery">
                <div className="fp-sh">
                  <h2 className="fp-sh-title">Portfolio <em>Highlights</em></h2>
                  <div className="fp-sh-line" />
                </div>
                <div className="fp-gal-grid">
                  {galleryIds.map((id, i) => (
                    <div key={id} className="fp-gi">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_900/${id}.jpg`}
                        alt={`${p.name} – ${GALLERY_LABELS[i] || 'fotografie'}`}
                        loading="lazy"
                      />
                      <div className="fp-gi-mask">
                        <div className="fp-gi-label">{GALLERY_LABELS[i] || 'Fotografie'}</div>
                        <a href={p.website_url || '#'} target="_blank" rel="noopener noreferrer" className="fp-gi-cta">
                          Descoperă →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT */}
            <div className="fp-about">
              <div className="fp-sh">
                <h2 className="fp-sh-title">Despre <em>Mine</em></h2>
                <div className="fp-sh-line" />
              </div>
              <div className="fp-about-card">
                <p className="fp-about-quote">
                  „Nu fotografiez evenimente. Conserv emoții pe care le vei redescoperi peste 20 de ani."
                </p>
                <p className="fp-about-text">
                  Sunt fotograf de evenimente cu <strong>peste 13 ani de experiență</strong> și am învățat că cele mai frumoase fotografii nu se planifică — se trăiesc. Lucrez cu lumină naturală, mă integrez discret în atmosfera evenimentului și captez momentele exact așa cum sunt: autentice, calde și pline de emoție.
                </p>
                <p className="fp-about-text">
                  Sunt disponibil în <strong>{p.oras} și împrejurimi</strong>, cu posibilitate de deplasare în toată România. Fiecare nuntă sau eveniment este unic pentru mine — îl tratez ca pe un proiect personal, nu ca pe o comandă.
                </p>
                <div className="fp-stats">
                  <div className="fp-stat">
                    <div className="fp-stat-n">13+</div>
                    <div className="fp-stat-l">Ani experiență</div>
                  </div>
                  <div className="fp-stat">
                    <div className="fp-stat-n">300+</div>
                    <div className="fp-stat-l">Evenimente</div>
                  </div>
                  <div className="fp-stat">
                    <div className="fp-stat-n">100%</div>
                    <div className="fp-stat-l">Clienți mulțumiți</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="fp-sidebar">

            <div className="fp-contact-card">
              <div className="fp-ct-title">Rezervă o sesiune</div>
              <p className="fp-ct-sub">Contactează-mă direct pentru disponibilitate și pachete personalizate foto-video.</p>
              {p.phone && (
                <a href={`tel:${p.phone}`} className="fp-ct-btn">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  {p.phone}
                </a>
              )}
              <p className="fp-ct-note">Răspund în mai puțin de 24h</p>
            </div>

            <div className="fp-conn-card">
              <div className="fp-sh" style={{marginBottom:'14px'}}>
                <h3 className="fp-sh-title" style={{fontSize:'18px'}}>Connect</h3>
                <div className="fp-sh-line" />
              </div>
              {p.instagram_url && (
                <a href={p.instagram_url} target="_blank" rel="noopener noreferrer" className="fp-conn-row">
                  <div className="fp-conn-l">
                    <div className="fp-conn-ico" style={{background:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)'}}>
                      <svg width="17" height="17" fill="#fff" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </div>
                    <div>
                      <div className="fp-conn-lbl">Instagram</div>
                      <div className="fp-conn-sub">Galerie completă</div>
                    </div>
                  </div>
                  <svg width="14" height="14" fill="none" stroke="rgba(26,18,8,0.25)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              )}
              {p.facebook_url && (
                <a href={p.facebook_url} target="_blank" rel="noopener noreferrer" className="fp-conn-row">
                  <div className="fp-conn-l">
                    <div className="fp-conn-ico" style={{background:'#1877F2'}}>
                      <svg width="17" height="17" fill="#fff" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div>
                      <div className="fp-conn-lbl">Facebook</div>
                      <div className="fp-conn-sub">Pagina oficială</div>
                    </div>
                  </div>
                  <svg width="14" height="14" fill="none" stroke="rgba(26,18,8,0.25)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              )}
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="fp-conn-row">
                  <div className="fp-conn-l">
                    <div className="fp-conn-ico" style={{background:'#1A1208'}}>
                      <svg width="17" height="17" fill="none" stroke="#fff" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                    </div>
                    <div>
                      <div className="fp-conn-lbl">Portofoliu</div>
                      <div className="fp-conn-sub">Website oficial</div>
                    </div>
                  </div>
                  <svg width="14" height="14" fill="none" stroke="rgba(26,18,8,0.25)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              )}
            </div>

            {p.maps_url && (
              <div className="fp-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="fp-loc-row">
                  <div className="fp-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="#FF6B00" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <div className="fp-loc-name">{p.oras}, {p.judet}</div>
                    <div className="fp-loc-sub">Disponibil deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="fp-share-card">
              <div>
                <div className="fp-share-lbl">Distribuie profilul</div>
                <div className="fp-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        <ContactBar provider={p} shortUrl={shortUrl} />
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('fp-nav');
          if(window.scrollY>60){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}