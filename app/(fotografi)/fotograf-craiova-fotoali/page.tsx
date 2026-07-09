// app/(fotografi)/foto-ali/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from '@/components/marketplace/TrackView';
import ShareButton from '@/components/marketplace/ShareButton';
import CallButton from '@/components/marketplace/CallButton';
import WaButton from '@/components/marketplace/WaButton';
import SocialLinks from '@/components/marketplace/SocialLinks';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-craiova-fotoali';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
header, footer { display:none !important; }

.fa { font-family:'DM Sans',sans-serif; background:#0A0A0A; color:#F5F0EA; min-height:100vh; }

.fa-nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 20px; transition:background .3s; border-bottom:1px solid transparent;
}
.fa-nav.scrolled { background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom-color:rgba(255,255,255,0.06); }
.fa-nav-back {
  display:flex; align-items:center; gap:6px; font-size:13px; font-weight:500;
  text-decoration:none; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);
  padding:8px 16px; border-radius:100px; backdrop-filter:blur(8px); color:#fff; transition:background .2s;
}
.fa-nav-back:hover { background:rgba(255,255,255,0.14); }

.fa-hero {
  height:100svh; min-height:500px; max-height:800px;
  position:relative; overflow:hidden; background:#0A0A0A;
}
@media(min-width:768px){ .fa-hero { max-height:900px; } }
.fa-hero-img {
  width:100%; height:100%; object-fit:cover; object-position:center;
  transition:transform 10s ease; filter:brightness(.75);
}
.fa-hero:hover .fa-hero-img { transform:scale(1.06); }
.fa-hero-grad {
  position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.9) 100%);
}
.fa-hero-content {
  position:absolute; bottom:0; left:0; right:0; padding:40px 24px;
  display:flex; flex-direction:column; gap:12px;
}
@media(min-width:768px){ .fa-hero-content { padding:60px 60px; } }
.fa-hero-chip {
  display:inline-flex; align-items:center; gap:7px; width:fit-content;
  background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
  color:rgba(255,255,255,0.7); font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  padding:5px 16px; border-radius:100px;
}
.fa-hero-chip-dot { width:5px; height:5px; background:#fff; border-radius:50%; opacity:.6; }
.fa-hero-name {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(40px,10vw,96px); font-weight:300; color:#fff; line-height:.95;
}
.fa-hero-name em { font-style:italic; color:rgba(255,255,255,0.55); display:block; font-size:.65em; }
.fa-hero-scroll {
  display:flex; align-items:center; gap:8px;
  font-size:11px; color:rgba(255,255,255,0.35); letter-spacing:.1em; text-transform:uppercase;
  margin-top:8px;
}
.fa-hero-scroll-line { width:40px; height:1px; background:rgba(255,255,255,0.2); }

.fa-intro {
  background:#111; border-bottom:1px solid rgba(255,255,255,0.06);
  padding:20px 24px; display:flex; align-items:center; gap:16px;
}
@media(min-width:640px){ .fa-intro { padding:22px 48px; } }
.fa-intro-avatar {
  width:56px; height:56px; border-radius:50%; flex-shrink:0;
  object-fit:cover; border:1px solid rgba(255,255,255,0.15);
}
.fa-intro-name { font-size:15px; font-weight:700; color:#fff; }
.fa-intro-sub { font-size:12px; color:rgba(255,255,255,0.4); margin-top:2px; }
.fa-intro-spacer { flex:1; }
.fa-strip-cta {
  display:flex; align-items:center; gap:8px;
  background:#fff; color:#0A0A0A; font-size:13px; font-weight:700;
  padding:10px 20px; border-radius:12px; text-decoration:none; white-space:nowrap;
  transition:opacity .2s;
}
.fa-strip-cta:hover { opacity:.85; }

.fa-body { max-width:1200px; margin:0 auto; padding:60px 20px 160px; }
@media(min-width:640px){ .fa-body { padding:72px 40px 160px; } }
@media(min-width:1024px){ .fa-body { display:grid; grid-template-columns:1fr 320px; gap:60px; padding:72px 48px 120px; } }

.fa-sh { display:flex; align-items:center; gap:14px; margin-bottom:28px; }
.fa-sh-title { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,4vw,32px); font-weight:300; color:#fff; white-space:nowrap; }
.fa-sh-title em { font-style:italic; color:rgba(255,255,255,0.35); }
.fa-sh-line { flex:1; height:1px; background:rgba(255,255,255,0.08); }

.fa-gallery { margin-bottom:60px; }
.fa-gal { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
@media(min-width:640px){ .fa-gal { gap:12px; } }

.fa-gi { position:relative; overflow:hidden; cursor:pointer; background:#1a1a1a; }
.fa-gi:nth-child(1) { grid-column:1/-1; border-radius:20px; }
.fa-gi:nth-child(1)::before { content:''; display:block; padding-top:52%; }
.fa-gi:nth-child(2) { border-radius:16px; }
.fa-gi:nth-child(2)::before { content:''; display:block; padding-top:140%; }
.fa-gi:nth-child(3) { border-radius:16px; }
.fa-gi:nth-child(3)::before { content:''; display:block; padding-top:140%; }
.fa-gi:nth-child(4) { grid-column:1/-1; border-radius:20px; }
.fa-gi:nth-child(4)::before { content:''; display:block; padding-top:45%; }
.fa-gi:nth-child(5) { grid-column:1/-1; border-radius:20px; }
.fa-gi:nth-child(5)::before { content:''; display:block; padding-top:45%; }

.fa-gi img {
  position:absolute; inset:0; width:100%; height:100%;
  object-fit:cover; object-position:center;
  display:block; transition:transform .6s ease, filter .4s ease;
  filter:brightness(.92);
}
.fa-gi:hover img { transform:scale(1.05); filter:brightness(1); }
.fa-gi-overlay {
  position:absolute; inset:0; z-index:2;
  background:linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%);
  opacity:0; transition:opacity .35s;
  display:flex; flex-direction:column; justify-content:flex-end; padding:20px;
}
.fa-gi:hover .fa-gi-overlay { opacity:1; }
.fa-gi-label { font-size:10px; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:.1em; margin-bottom:6px; }
.fa-gi-cta {
  display:inline-flex; align-items:center; gap:6px;
  background:#fff; color:#0A0A0A; font-size:12px; font-weight:700;
  padding:7px 16px; border-radius:100px; text-decoration:none; width:fit-content;
}

.fa-about { margin-bottom:48px; }
.fa-about-card {
  background:#111; border-radius:24px; padding:32px;
  border:1px solid rgba(255,255,255,0.07);
}
.fa-quote {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(18px,3.5vw,26px); font-weight:300; font-style:italic;
  color:#fff; line-height:1.45; margin-bottom:20px;
  border-left:2px solid rgba(255,255,255,0.2); padding-left:20px;
}
.fa-text { font-size:14px; line-height:1.9; color:rgba(255,255,255,0.5); margin-bottom:12px; }
.fa-text strong { color:rgba(255,255,255,0.85); font-weight:600; }
.fa-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:24px; }
.fa-stat { background:#1a1a1a; border-radius:16px; padding:18px 12px; text-align:center; border:1px solid rgba(255,255,255,0.06); }
.fa-stat-n { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:600; color:#fff; line-height:1; }
.fa-stat-l { font-size:10.5px; color:rgba(255,255,255,0.3); margin-top:5px; line-height:1.3; }

.fa-sidebar { display:flex; flex-direction:column; gap:14px; }

.fa-contact-card {
  background:#fff; border-radius:24px; padding:24px;
}
.fa-ct-title { font-family:'Cormorant Garamond',serif; font-size:21px; font-weight:600; color:#0A0A0A; margin-bottom:6px; }
.fa-ct-sub { font-size:12px; color:rgba(10,10,10,0.45); margin-bottom:18px; line-height:1.65; }
.fa-ct-btn {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#0A0A0A; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  transition:opacity .2s; margin-bottom:8px;
}
.fa-ct-btn:hover { opacity:.8; }
.fa-ct-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  background:#25D366; color:#fff; font-size:14px; font-weight:700;
  padding:14px; border-radius:14px; text-decoration:none;
  transition:opacity .2s; margin-bottom:10px;
}
.fa-ct-wa:hover { opacity:.9; }
.fa-ct-note { font-size:11px; color:rgba(10,10,10,0.3); text-align:center; }

.fa-conn-card {
  background:#111; border-radius:24px; padding:20px;
  border:1px solid rgba(255,255,255,0.07);
}
.fa-conn-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:11px 0; border-bottom:1px solid rgba(255,255,255,0.05);
  text-decoration:none; transition:opacity .2s; cursor:pointer;
}
.fa-conn-row:last-child { border-bottom:none; padding-bottom:0; }
.fa-conn-row:hover { opacity:.6; }
.fa-conn-l { display:flex; align-items:center; gap:12px; }
.fa-conn-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.fa-conn-lbl { font-size:13.5px; font-weight:500; color:#fff; }
.fa-conn-sub { font-size:11px; color:rgba(255,255,255,0.3); }

.fa-loc-card {
  background:#111; border-radius:20px; padding:18px 20px;
  border:1px solid rgba(255,255,255,0.07);
}
.fa-loc-row { display:flex; align-items:center; gap:12px; text-decoration:none; color:#fff; transition:opacity .2s; }
.fa-loc-row:hover { opacity:.7; }
.fa-loc-ico { width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.fa-loc-name { font-size:14px; font-weight:600; color:#fff; }
.fa-loc-sub { font-size:11px; color:rgba(255,255,255,0.35); margin-top:2px; }

.fa-share-card {
  background:#111; border-radius:18px; padding:16px 18px;
  border:1px solid rgba(255,255,255,0.07);
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.fa-share-lbl { font-size:12px; font-weight:500; color:rgba(255,255,255,0.35); margin-bottom:3px; }
.fa-share-url { font-size:13px; font-weight:700; color:#fff; }

.fa-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background:rgba(10,10,10,0.97); backdrop-filter:blur(20px);
  border-top:1px solid rgba(255,255,255,0.08);
  padding:10px 14px; padding-bottom:max(10px,env(safe-area-inset-bottom));
  display:flex; gap:8px;
}
@media(min-width:1024px){ .fa-bar { display:none; } }
.fa-bar-call {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  background:#fff; color:#0A0A0A; font-size:14px; font-weight:700;
  padding:13px; border-radius:14px; text-decoration:none;
}
.fa-bar-wa {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  background:#25D366; color:#fff; font-size:13px; font-weight:600;
  padding:13px; border-radius:14px; text-decoration:none;
}
@media(max-width:374px){ .fa-hero { min-height:420px; } }
`;

const GALLERY_DATA = [
  { label: 'Eleganță în lumină naturală', pos: 'center' },
  { label: 'Portret de mireasă', pos: 'center top' },
  { label: 'Detalii fine', pos: 'center' },
  { label: 'Poveste vizuală', pos: 'center' },
  { label: 'Momentul perfect', pos: 'center top' },
];

export default async function FotoAliPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://www.vibeinvite.ro/${p.short_slug}`;
  const heroImg = galleryIds[0]
    ? `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1600/${galleryIds[0]}.jpg`
    : p.profile_image_url || '';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="fa">

        <nav className="fa-nav" id="fa-nav">
          <a href="/servicii-nunta" className="fa-nav-back">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Furnizori
          </a>
          <ShareButton shortUrl={shortUrl} name={p.name} />
        </nav>

        <div className="fa-hero">
          <img className="fa-hero-img" src={heroImg} alt={p.name} />
          <div className="fa-hero-grad" />
          <div className="fa-hero-content">
            <div className="fa-hero-chip">
              <span className="fa-hero-chip-dot" />
              Fotograf Verificat · VibeInvite
            </div>
            <h1 className="fa-hero-name">
              {p.name}
              <em>Fotograf · {p.oras}</em>
            </h1>
            <div className="fa-hero-scroll">
              <div className="fa-hero-scroll-line" />
              Descoperă portfoliul
            </div>
          </div>
        </div>

        <div className="fa-intro">
          <img
            className="fa-intro-avatar"
            src={p.profile_image_url || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill/${p.profile_image}.jpg`}
            alt={p.name}
          />
          <div>
            <div className="fa-intro-name">{p.name}</div>
            <div className="fa-intro-sub">Fotograf Profesionist · {p.oras}, {p.judet}</div>
          </div>
          <div className="fa-intro-spacer" />
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="fa-strip-cta" />}
        </div>

        <div className="fa-body">
          <div>

            {galleryIds.length > 0 && (
              <div className="fa-gallery">
                <div className="fa-sh">
                  <h2 className="fa-sh-title">Portfolio <em>Highlights</em></h2>
                  <div className="fa-sh-line" />
                </div>
                <div className="fa-gal">
                  {galleryIds.map((id, i) => (
                    <div key={id} className="fa-gi">
                      <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1000/${id}.jpg`}
                        alt={`${p.name} – ${GALLERY_DATA[i]?.label || 'fotografie'}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        style={{ objectPosition: GALLERY_DATA[i]?.pos || 'center' }}
                      />
                      <div className="fa-gi-overlay">
                        <div className="fa-gi-label">{GALLERY_DATA[i]?.label || 'Fotografie'}</div>
                        <a href={p.website_url || '#'} target="_blank" rel="noopener noreferrer" className="fa-gi-cta">
                          Vezi portofoliul →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="fa-about">
              <div className="fa-sh">
                <h2 className="fa-sh-title">Despre <em>Mine</em></h2>
                <div className="fa-sh-line" />
              </div>
              <div className="fa-about-card">
                <p className="fa-quote">
                  „Fiecare mireasă are o poveste unică. Misiunea mea e să o captez înainte ca momentul să treacă."
                </p>
                <p className="fa-text">
                  Sunt <strong>FotoAli</strong>, fotograf specializat în nunți și evenimente din <strong>Craiova și Oltenia</strong>. Cu un ochi pentru detalii și o pasiune autentică pentru lumină și emoție, transform fiecare cadru într-o amintire vie.
                </p>
                <p className="fa-text">
                  Stilul meu îmbină <strong>fotografia documentară</strong> cu cea artistică — discret, prezent, dar niciodată în plus. Fie că e prima dans sau privirea dintre părinți, nu ratez nimic.
                </p>
                <p className="fa-text">
                  Disponibil în <strong>toată România</strong> pentru nunți, logodne, sesiuni foto și evenimente corporate.
                </p>
                <div className="fa-stats">
                  <div className="fa-stat"><div className="fa-stat-n">8+</div><div className="fa-stat-l">Ani experiență</div></div>
                  <div className="fa-stat"><div className="fa-stat-n">200+</div><div className="fa-stat-l">Evenimente</div></div>
                  <div className="fa-stat"><div className="fa-stat-n">100%</div><div className="fa-stat-l">Clienți fericiți</div></div>
                </div>
              </div>
            </div>

          </div>

          <div className="fa-sidebar">

            <div className="fa-contact-card">
              <div className="fa-ct-title">Rezervă o ședință</div>
              <p className="fa-ct-sub">Contactează-mă direct pentru disponibilitate și ofertă personalizată.</p>
              {p.phone && <CallButton phone={p.phone} slug={p.slug} className="fa-ct-btn" />}
              {p.phone && <WaButton phone={p.phone} slug={p.slug} className="fa-ct-wa" />}
              <p className="fa-ct-note">Răspund în mai puțin de 24h</p>
            </div>

            <div className="fa-conn-card">
              <div className="fa-sh" style={{marginBottom:'14px'}}>
                <h3 className="fa-sh-title" style={{fontSize:'18px'}}>Connect</h3>
                <div className="fa-sh-line" />
              </div>
              <SocialLinks
                provider={p}
                rowClass="fa-conn-row"
                leftClass="fa-conn-l"
                icoClass="fa-conn-ico"
                lblClass="fa-conn-lbl"
                subClass="fa-conn-sub"
              />
            </div>

            {p.maps_url && (
              <div className="fa-loc-card">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="fa-loc-row">
                  <div className="fa-loc-ico">
                    <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.6)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="fa-loc-name">{p.oras}, {p.judet}</div>
                    <div className="fa-loc-sub">Disponibil deplasări · Google Maps</div>
                  </div>
                </a>
              </div>
            )}

            <div className="fa-share-card">
              <div>
                <div className="fa-share-lbl">Distribuie profilul</div>
                <div className="fa-share-url">vibeinvite.ro/{p.short_slug}</div>
              </div>
              <ShareButton shortUrl={shortUrl} name={p.name} />
            </div>

          </div>
        </div>

        <div className="fa-bar">
          {p.phone && <CallButton phone={p.phone} slug={p.slug} className="fa-bar-call" />}
          {p.phone && <WaButton phone={p.phone} slug={p.slug} className="fa-bar-wa" />}
        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll',function(){
          var n=document.getElementById('fa-nav');
          if(window.scrollY>80){n.classList.add('scrolled');}
          else{n.classList.remove('scrolled');}
        });
      `}} />
    </>
  );
}