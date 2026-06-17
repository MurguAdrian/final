// app/(fotografi)/fotograf-onesti-dragoi-george-adrian/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from './TrackView';
import ShareButton from './ShareButton';
import ContactBar from './ContactBar';
import CallButton from './CallButton';
import SocialLinks from './SocialLinks';
import WaButton from './WaButton';

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

.fp-hero {
  height:300px; position:relative; overflow:hidden;
  background:linear-gradient(135deg,#1A1208 0%,#2d1f0e 40%,#3d2510 70%,#1A1208 100%);
}
@media(min-width:768px){ .fp-hero { height:360px; } }
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
  font-size:clamp(32px,7vw,64px); font-weight:300; color:#fff; line-height:1.05; margin-bottom:14px;
}
.fp-hero-name em { font-style:italic; color:#FFAD70; }
.fp-hero-pills { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; }
.fp-hero-pill {
  background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18);
  color:rgba(255,255,255,0.75); font-size:11px; font-weight:500;
  padding:4px 12px; border-radius:100px;
}

.fp-strip {
  background:#fff; border-bottom:1px solid rgba(26,18,8,0.06);
  padding:14px 20px; display:flex; align-items:center; gap:12px;
}
@media(min-width:640px){ .fp-strip { padding:16px 36px; gap:16px; } }
.fp-strip-avatar {
  width:52px; height:52px; border-radius:50%; flex-shrink:0;
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

.fp-body { max-width:1100px; margin:0 auto; padding:36px 16px 90px; }
@media(min-width:640px){ .fp-body { padding:44px 28px 90px; } }
@media(min-width:1024px){ .fp-body { display:grid; grid-template-columns:1fr 340px; gap:40px; padding:44px 40px 100px; } }
.fp-sh { display:flex; align-items:center; gap:12px; margin-bottom:20px; }
.fp-sh-title { font-family:'Cormorant Garamond',serif; font-size:clamp(20px,3.5vw,28px); font-weight:300; color:#1A1208; white-space:nowrap; }
.fp-sh-title em { font-style:italic; color:#FF6B00; }
.fp-sh-line { flex:1; height:1px; background:rgba(26,18,8,0.08); }

.fp-gallery { margin-bottom:36px; }
.fp-gal-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }

.fp-gi { position:relative; overflow:hidden; border-radius:16px; background:#f0ece6; cursor:pointer; }
.fp-gi::before { content:''; display:block; padding-top:100%; }
.fp-gi:nth-child(1) { grid-column:1/-1; }
.fp-gi:nth-child(1)::before { padding-top:60%; }
.fp-gi img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; object-position:center; display:block; transition:transform .5s ease; background:#f0ece6; }
.fp-gi:hover img { transform:scale(1.04); }
.fp-gi-mask {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(26,18,8,0.8) 0%, transparent 50%);
  opacity:0; transition:opacity .3s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:14px; z-index:2;
}
.fp-gi:hover .fp-gi-mask { opacity:1; }
.fp-gi-label { font-size:10px; color:rgba(255,255,255,0.55); text-transform:uppercase; letter-spacing:.08em; margin-bottom:5px; }
.fp-gi-cta {
  display:inline-flex; align-items:center; gap:5px;
  background:#fff; color:#1A1208; font-size:12px; font-weight:700;
  padding:6px 14px; border-radius:100px; text-decoration:none; width:fit-content;
}

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
.fp-ct-sub { font-size:12px; color:rgba(255,255,255,0.42); margin-bottom:16px; line-height:1.65; }
.fp-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:linear-gradient(135deg,#FF6B00,#FF8C35);
  color:#fff; font-size:14px; font-weight:700;
  padding:13px; border-radius:14px; text-decoration:none;
  box-shadow:0 6px 24px rgba(255,107,0,0.38);
  transition:opacity .2s, transform .15s; margin-bottom:8px;
}
.fp-ct-btn:hover { opacity:.9; transform:translateY(-1px); }
.fp-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:13px; border-radius:14px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.fp-ct-wa:hover { opacity:.9; }
.fp-ct-note { font-size:11px; color:rgba(255,255,255,0.28); text-align:center; }

.fp-conn-card {
  background:#fff; border-radius:24px; padding:20px;
  border:1px solid rgba(26,18,8,0.06); box-shadow:0 2px 14px rgba(0,0,0,0.04);
}
.fp-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(26,18,8,0.05);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
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

        {/* <nav className="fp-nav" id="fp-nav">
          <a href="/servicii-nunta" className="fp-nav-back">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Furnizori
          </a>
        </nav> */}

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

        <div className="fp-strip">
          <img
            className="fp-strip-avatar"
            src={p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill,g_face/${p.profile_image}.jpg`}
            alt={p.name}
          />
          <div>
            <div className="fp-strip-name">{p.name}</div>
            <div className="fp-strip-sub">Fotograf Profesionist · {p.oras}</div>
          </div>
          <div className="fp-strip-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} />}
        </div>

        <div className="fp-body">
          <div>

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
                  <div className="fp-stat"><div className="fp-stat-n">13+</div><div className="fp-stat-l">Ani experiență</div></div>
                  <div className="fp-stat"><div className="fp-stat-n">300+</div><div className="fp-stat-l">Evenimente</div></div>
                  <div className="fp-stat"><div className="fp-stat-n">100%</div><div className="fp-stat-l">Clienți mulțumiți</div></div>
                </div>
              </div>
            </div>

          </div>

          <div className="fp-sidebar">

            <div className="fp-contact-card">
              <div className="fp-ct-title">Rezervă o sesiune</div>
              <p className="fp-ct-sub">Contactează-mă direct pentru disponibilitate și pachete personalizate foto-video.</p>
              {p.phone && (
                <CallButton phone={p.phone} slug={p.slug} variant="sidebar" />
              )}
        {p.phone && (
  <WaButton phone={p.phone} slug={p.slug} />
)}
              <p className="fp-ct-note">Răspund în mai puțin de 24h</p>
            </div>

            <div className="fp-conn-card">
              <div className="fp-sh" style={{marginBottom:'14px'}}>
                <h3 className="fp-sh-title" style={{fontSize:'18px'}}>Connect</h3>
                <div className="fp-sh-line" />
              </div>
              <SocialLinks provider={p} />
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

      {/* <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('fp-nav');
          if(window.scrollY>60){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} /> */}
    </>
  );
}