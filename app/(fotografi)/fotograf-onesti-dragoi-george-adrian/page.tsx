// app/fotograf-onesti-dragoi-george-adrian/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import TrackView from './TrackView';
import ShareButton from './ShareButton';
import ContactBar from './ContactBar';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SLUG = 'fotograf-onesti-dragoi-george-adrian';

async function getProvider() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM mkt_providers WHERE slug = ${SLUG} AND is_active = true LIMIT 1`;
  return rows[0] || null;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.fp-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  min-height: 100vh;
  color: #1A1208;
}

/* ── HERO ── */
.fp-hero {
  position: relative;
  height: 420px;
  overflow: hidden;
  background: #1A1208;
}
@media(min-width:768px){ .fp-hero { height: 560px; } }
@media(min-width:1024px){ .fp-hero { height: 640px; } }

.fp-hero-bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center top;
  filter: brightness(.55);
  transition: transform 8s ease;
}
.fp-hero:hover .fp-hero-bg { transform: scale(1.04); }

.fp-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(26,18,8,0.1) 0%, rgba(26,18,8,0.7) 100%);
}

.fp-hero-top {
  position: absolute; top: 16px; left: 16px; right: 16px;
  display: flex; align-items: center; justify-content: space-between; z-index: 10;
}
.fp-back {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.12); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.18); border-radius: 100px;
  padding: 8px 16px; font-size: 13px; color: #fff; text-decoration: none;
  transition: background .2s;
}
.fp-back:hover { background: rgba(255,255,255,0.2); }
.fp-share-btn {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px;
  background: rgba(255,255,255,0.12); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.18); border-radius: 50%;
  color: #fff; cursor: pointer; transition: background .2s; border: none;
}
.fp-share-btn:hover { background: rgba(255,255,255,0.22); }

.fp-hero-content {
  position: absolute; bottom: 28px; left: 20px; right: 20px; z-index: 10;
}
@media(min-width:768px){ .fp-hero-content { bottom: 40px; left: 40px; right: 40px; } }

.fp-hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,107,0,0.2); border: 1px solid rgba(255,107,0,0.4);
  border-radius: 100px; padding: 4px 14px; font-size: 11px; font-weight: 600;
  color: #FF8C35; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 12px;
}
.fp-hero-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 7vw, 64px); font-weight: 300; color: #fff; line-height: 1.05;
  margin-bottom: 8px;
}
.fp-hero-name em { font-style: italic; color: #FF8C35; }
.fp-hero-meta {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}
.fp-hero-loc {
  display: flex; align-items: center; gap: 5px;
  font-size: 13px; color: rgba(255,255,255,0.7);
}
.fp-hero-tag {
  background: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.85); font-size: 11px; font-weight: 500;
  padding: 3px 12px; border-radius: 100px; text-transform: capitalize;
}

/* ── PROFILE CARD ── */
.fp-profile-card {
  max-width: 740px; margin: -48px auto 0; position: relative; z-index: 20;
  background: #fff; border-radius: 28px;
  border: 1px solid rgba(26,18,8,0.07);
  box-shadow: 0 8px 48px rgba(0,0,0,0.1);
  padding: 28px 24px;
  display: flex; align-items: center; gap: 20px;
  flex-wrap: wrap;
}
@media(min-width:640px){ .fp-profile-card { padding: 32px 36px; gap: 28px; } }

.fp-avatar {
  width: 80px; height: 80px; border-radius: 50%; flex-shrink: 0;
  object-fit: cover; border: 3px solid #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}
@media(min-width:640px){ .fp-avatar { width: 96px; height: 96px; } }

.fp-profile-info { flex: 1; min-width: 0; }
.fp-profile-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(20px, 4vw, 28px); font-weight: 600; color: #1A1208; margin-bottom: 4px;
}
.fp-profile-subtitle { font-size: 13px; color: #FF6B00; font-weight: 500; margin-bottom: 10px; text-transform: capitalize; }
.fp-profile-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.fp-tag {
  font-size: 11px; color: rgba(26,18,8,0.55);
  background: #F5F0EA; padding: 4px 12px; border-radius: 100px; font-weight: 500;
}

.fp-phone-btn {
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
  background: linear-gradient(135deg,#FF6B00,#FF8C35);
  color: #fff; font-size: 13.5px; font-weight: 600;
  padding: 12px 22px; border-radius: 16px; text-decoration: none;
  box-shadow: 0 4px 20px rgba(255,107,0,0.3);
  transition: opacity .2s, transform .15s;
}
.fp-phone-btn:hover { opacity: .9; transform: translateY(-1px); }

/* ── MAIN CONTENT ── */
.fp-content {
  max-width: 740px; margin: 0 auto; padding: 32px 16px 120px;
}
@media(min-width:640px){ .fp-content { padding: 40px 24px 120px; } }

/* ── GALLERY ── */
.fp-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 400; color: #1A1208; margin-bottom: 16px;
}
.fp-section-title em { font-style: italic; color: #FF6B00; }

.fp-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px;
  margin-bottom: 32px;
}
.fp-gallery-item {
  position: relative; overflow: hidden; border-radius: 18px;
  cursor: pointer; background: #f0ece6;
}
.fp-gallery-item:first-child {
  grid-column: 1 / -1;
  aspect-ratio: 16/9;
}
.fp-gallery-item:not(:first-child) { aspect-ratio: 1; }

.fp-gallery-item img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .5s ease;
}
.fp-gallery-item:hover img { transform: scale(1.05); }

.fp-gallery-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(26,18,8,0.65) 0%, transparent 50%);
  opacity: 0; transition: opacity .3s;
  display: flex; align-items: flex-end; justify-content: center; padding-bottom: 16px;
}
.fp-gallery-item:hover .fp-gallery-overlay { opacity: 1; }
.fp-gallery-cta {
  background: rgba(255,255,255,0.95); color: #1A1208;
  font-size: 12px; font-weight: 600; padding: 7px 18px; border-radius: 100px;
  text-decoration: none; letter-spacing: .02em;
  transition: background .2s;
}
.fp-gallery-cta:hover { background: #fff; }

/* ── CONNECT ── */
.fp-connect {
  background: #fff; border-radius: 24px; padding: 24px;
  border: 1px solid rgba(26,18,8,0.06);
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  margin-bottom: 20px;
}
.fp-connect-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 0; border-bottom: 1px solid rgba(26,18,8,0.05);
  text-decoration: none; transition: opacity .2s;
}
.fp-connect-row:last-child { border-bottom: none; padding-bottom: 0; }
.fp-connect-row:hover { opacity: .75; }
.fp-connect-left { display: flex; align-items: center; gap: 14px; }
.fp-connect-ico {
  width: 40px; height: 40px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.fp-connect-label { font-size: 14px; font-weight: 500; color: #1A1208; }
.fp-connect-sub { font-size: 11px; color: rgba(26,18,8,0.4); margin-top: 1px; }
.fp-ext-ico { color: rgba(26,18,8,0.25); }

/* ── LOCATION ── */
.fp-location {
  background: #fff; border-radius: 24px; padding: 24px;
  border: 1px solid rgba(26,18,8,0.06);
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  margin-bottom: 20px;
}
.fp-location-row {
  display: flex; align-items: center; gap: 14px;
  text-decoration: none; color: #1A1208;
  transition: opacity .2s;
}
.fp-location-row:hover { opacity: .75; }
.fp-location-ico {
  width: 44px; height: 44px; border-radius: 14px; background: #FFF4ED;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.fp-location-name { font-size: 14px; font-weight: 600; color: #1A1208; }
.fp-location-sub { font-size: 12px; color: rgba(26,18,8,0.4); margin-top: 2px; }

/* ── FIXED BOTTOM BAR ── */
.fp-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  background: rgba(253,250,246,0.95); backdrop-filter: blur(16px);
  border-top: 1px solid rgba(26,18,8,0.07);
  padding: 12px 16px; padding-bottom: max(12px, env(safe-area-inset-bottom));
  display: flex; gap: 10px;
}
@media(min-width:768px){ .fp-bar { display: none; } }

.fp-bar-call {
  flex: 2; display: flex; align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(135deg,#FF6B00,#FF8C35);
  color: #fff; font-size: 14px; font-weight: 600;
  padding: 14px; border-radius: 16px; text-decoration: none;
  box-shadow: 0 4px 20px rgba(255,107,0,0.3);
}
.fp-bar-ig {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
  background: linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);
  color: #fff; font-size: 13px; font-weight: 600;
  padding: 14px; border-radius: 16px; text-decoration: none;
}
.fp-bar-share {
  width: 52px; display: flex; align-items: center; justify-content: center;
  background: #F5F0EA; border-radius: 16px; border: none; cursor: pointer;
  color: rgba(26,18,8,0.6);
}

@media(max-width:374px){
  .fp-hero { height: 360px; }
  .fp-profile-card { margin-top: -36px; }
}
`;

export default async function FotografDragoiPage() {
  const p = await getProvider();
  if (!p) notFound();

  const galleryIds: string[] = p.gallery_images ? p.gallery_images.split(',') : [];
  const shortUrl = `https://vibeinvite.ro/${p.short_slug}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <TrackView slug={p.slug} />
      <div className="fp-page">

        {/* HERO */}
        <div className="fp-hero">
          <img
            className="fp-hero-bg"
            src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1400/${galleryIds[0] || p.profile_image}.jpg`}
            alt={p.name}
          />
          <div className="fp-hero-overlay" />

          <div className="fp-hero-top">
            <a href="/servicii-nunta" className="fp-back">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Înapoi
            </a>
            <ShareButton shortUrl={shortUrl} name={p.name} />
          </div>

          <div className="fp-hero-content">
            <div className="fp-hero-badge">✦ Fotograf Verificat</div>
            <h1 className="fp-hero-name">
              {p.name.split(' ')[0]} <em>{p.name.split(' ').slice(1).join(' ')}</em>
            </h1>
            <div className="fp-hero-meta">
              <div className="fp-hero-loc">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {p.oras}, {p.judet}
              </div>
              {p.subtype && <span className="fp-hero-tag">{p.subtype}</span>}
            </div>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="fp-profile-card">
          <img
            className="fp-avatar"
            src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_200,h_200,c_fill,g_face/${p.profile_image}.jpg`}
            alt={p.name}
          />
          <div className="fp-profile-info">
            <div className="fp-profile-name">{p.name}</div>
            <div className="fp-profile-subtitle">Fotograf {p.subtype}</div>
            <div className="fp-profile-tags">
              <span className="fp-tag">{p.oras}</span>
              <span className="fp-tag">{p.judet}</span>
              <span className="fp-tag">Disponibil deplasări</span>
            </div>
          </div>
          {p.phone && (
            <a href={`tel:${p.phone}`} className="fp-phone-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
              </svg>
              Sună
            </a>
          )}
        </div>

        {/* CONTENT */}
        <div className="fp-content">

          {/* GALLERY */}
          {galleryIds.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 className="fp-section-title">Portfolio <em>Highlights</em></h2>
              <div className="fp-gallery">
                {galleryIds.map((id, i) => (
                  <div key={id} className="fp-gallery-item">
                    <img
                      src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/${id}.jpg`}
                      alt={`${p.name} foto ${i + 1}`}
                      loading="lazy"
                    />
                    <div className="fp-gallery-overlay">
                      <a
                        href={p.website_url || p.instagram_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fp-gallery-cta"
                      >
                        Descoperă →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONNECT */}
          <h2 className="fp-section-title" style={{ marginBottom: '14px' }}>Connect</h2>
          <div className="fp-connect">
    {p.instagram_url && (
  <a href={p.instagram_url} target="_blank" rel="noopener noreferrer" className="fp-connect-row">
    <div className="fp-connect-left">
      <div className="fp-connect-ico" style={{ background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)' }}>
        <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>
      <div>
        <div className="fp-connect-label">Instagram</div>
        <div className="fp-connect-sub">Vezi galeria completă</div>
      </div>
    </div>
    <svg className="fp-ext-ico" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </a>
)}
           
            {p.facebook_url && (
              <a href={p.facebook_url} target="_blank" rel="noopener noreferrer" className="fp-connect-row">
                <div className="fp-connect-left">
                  <div className="fp-connect-ico" style={{ background: '#1877F2' }}>
                    <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="fp-connect-label">Facebook</div>
                    <div className="fp-connect-sub">Pagina oficială</div>
                  </div>
                </div>
                <svg className="fp-ext-ico" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {p.website_url && (
              <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="fp-connect-row">
                <div className="fp-connect-left">
                  <div className="fp-connect-ico" style={{ background: '#1A1208' }}>
                    <svg width="18" height="18" fill="none" stroke="#fff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <div className="fp-connect-label">Website / Portofoliu</div>
                    <div className="fp-connect-sub">Portofoliu complet</div>
                  </div>
                </div>
                <svg className="fp-ext-ico" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {/* LOCATION */}
          {p.maps_url && (
            <>
              <h2 className="fp-section-title" style={{ marginBottom: '14px' }}>Locație</h2>
              <div className="fp-location">
                <a href={p.maps_url} target="_blank" rel="noopener noreferrer" className="fp-location-row">
                  <div className="fp-location-ico">
                    <svg width="22" height="22" fill="none" stroke="#FF6B00" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="fp-location-name">{p.oras}, {p.judet}</div>
                    <div className="fp-location-sub">Deschide în Google Maps · Disponibil deplasări naționale</div>
                  </div>
                </a>
              </div>
            </>
          )}

        </div>

        {/* FIXED BOTTOM BAR MOBILE */}
        <ContactBar provider={p} shortUrl={shortUrl} />

      </div>
    </>
  );
}