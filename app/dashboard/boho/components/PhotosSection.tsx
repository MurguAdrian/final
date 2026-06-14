"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { C, F, FS, SP, BR, IS, SH, GR, KEYFRAMES } from '../bohoTokens';
import Swal from 'sweetalert2';

interface Photo { id: string; url: string; }

interface PhotosSectionProps {
  initialData: any;
  orderId:     any;
  onSave:      () => void;
}

type GalleryStatus = 'inactive' | 'active';

// ─── DIVIDER ─────────────────────────────────────────────
const BohoDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: `14px 0 ${SP.xl}px` }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(193,113,74,.28))` }} />
    <svg viewBox="0 0 60 20" width="50" height="16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 L20 10" stroke={C.rose} strokeWidth=".8" strokeOpacity=".45" />
      <path d="M40 10 L55 10" stroke={C.rose} strokeWidth=".8" strokeOpacity=".45" />
      <path d="M30 4 Q34 7 34 10 Q34 13 30 16 Q26 13 26 10 Q26 7 30 4Z" fill="none" stroke={C.rose} strokeWidth="1" strokeOpacity=".75" />
      <circle cx="30" cy="10" r="1.8" fill={C.rose} fillOpacity=".6" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(193,113,74,.28),transparent)` }} />
  </div>
);

// ─── STYLES ──────────────────────────────────────────────
const ph: Record<string, React.CSSProperties> = {
  wrapper:           { fontFamily: F.ui, color: C.text, width: '100%', maxWidth: 900, boxSizing: 'border-box', overflowX: 'hidden' },
  header:            { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: SP.sm, gap: BR.lg },
  headerLabel:       { fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(160,82,45,.5)', marginBottom: SP.xs },
  title:             { fontFamily: F.body, fontSize: FS.titleXl, fontWeight: 300, fontStyle: 'italic', color: C.rose, margin: 0, letterSpacing: '.04em' },
  headerIcon:        { width: 48, height: 48, borderRadius: BR.lg, background: C.roseAlpha08, border: `1px solid ${C.borderMed}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  card:              { background: 'rgba(193,113,74,.03)', border: `1px solid ${C.borderMed}`, borderRadius: BR.xl, overflow: 'hidden', marginBottom: 14 },
  cardInner:         { padding: 'clamp(16px,3vw,24px)', display: 'flex', flexDirection: 'column', gap: SP.sm },
  statusIconWrap:    { width: 48, height: 48, borderRadius: '50%', background: C.roseAlpha08, border: `1px solid ${C.borderMed}`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardTitle:         { fontFamily: F.body, fontSize: FS.titleSm, fontStyle: 'italic', fontWeight: 400, color: C.text, margin: 0 },
  cardDesc:          { fontFamily: F.body, fontSize: 'clamp(13px,2vw,15px)', fontStyle: 'italic', color: C.textMuted, lineHeight: 1.7, margin: 0 },
  consentLabel:      { display: 'flex', alignItems: 'flex-start', gap: BR.lg, cursor: 'pointer', padding: `12px 14px`, background: 'rgba(193,113,74,.04)', border: `1px solid ${C.borderMed}`, borderRadius: BR.md },
  checkbox:          { width: 18, height: 18, border: `1.5px solid rgba(193,113,74,.35)`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all .2s' },
  checkboxChecked:   { background: C.rose, borderColor: C.rose },
  consentText:       { fontFamily: F.heading, fontSize: FS.xs, letterSpacing: '.06em', color: 'rgba(160,82,45,.65)', lineHeight: 1.6 },
  roseBtn:           { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: SP.sm, padding: `12px ${SP.xl}px`, borderRadius: BR.sm, background: GR.roseBtn, color: C.white, fontFamily: F.heading, fontSize: FS.base, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: SH.btnRose, width: '100%' } as React.CSSProperties,
  ghostBtn:          { display: 'inline-flex', alignItems: 'center', gap: 7, padding: `9px ${SP.lg}px`, borderRadius: BR.sm, background: C.roseAlpha08, border: `1px solid ${C.borderMed}`, color: C.rose, fontFamily: F.heading, fontSize: FS.xs, fontWeight: 600, letterSpacing: '.12em', cursor: 'pointer', whiteSpace: 'nowrap' } as React.CSSProperties,
  statusBadgeActive: { display: 'inline-flex', alignItems: 'center', gap: SP.sm, padding: `5px 14px`, borderRadius: 100, background: 'rgba(76,175,80,.09)', border: '1px solid rgba(76,175,80,.28)', fontFamily: F.heading, fontSize: FS.xs, letterSpacing: '.18em', textTransform: 'uppercase', color: '#5a9e5d' },
  statusDot:         { width: 7, height: 7, borderRadius: '50%', background: '#6abf6e', display: 'inline-block', boxShadow: '0 0 6px #6abf6e', flexShrink: 0 },
  galleryCount:      { fontFamily: F.body, fontSize: FS.titleSm, fontStyle: 'italic', color: C.text, margin: 0, fontWeight: 300 },
  gallerySubCount:   { fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(160,82,45,.5)', marginTop: 2, marginBottom: 0 },
  photoCard:         { position: 'relative', aspectRatio: '1', borderRadius: BR.md, overflow: 'hidden', border: `1px solid ${C.borderMed}`, background: C.cream, cursor: 'pointer' } as React.CSSProperties,
  photoImg:          { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' } as React.CSSProperties,
  photoOverlay:      { position: 'absolute', inset: 0, background: `linear-gradient(to top,rgba(44,26,14,.88) 0%,rgba(44,26,14,.35) 50%,transparent 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 5, padding: SP.sm, opacity: 0, transition: 'opacity .3s ease' } as React.CSSProperties,
  dlBtn:             { display: 'inline-flex', alignItems: 'center', gap: 5, padding: `6px 12px`, borderRadius: BR.sm, background: 'rgba(249,244,238,.85)', border: `1px solid rgba(193,113,74,.28)`, color: C.rose, fontFamily: F.heading, fontSize: FS.tiny, fontWeight: 600, letterSpacing: '.1em', cursor: 'pointer', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
  viewBtn:           { display: 'inline-flex', alignItems: 'center', gap: 5, padding: `5px 12px`, borderRadius: BR.sm, background: 'rgba(249,244,238,.55)', border: `1px solid rgba(193,113,74,.2)`, color: 'rgba(160,82,45,.7)', fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.1em', textDecoration: 'none', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
  emptyState:        { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: `40px ${SP.xl}px`, background: 'rgba(193,113,74,.03)', border: '1px dashed rgba(193,113,74,.18)', borderRadius: BR.xl, textAlign: 'center' } as React.CSSProperties,
};

// ─── MAIN COMPONENT ──────────────────────────────────────
export const PhotosSection = ({ initialData: _initialData, orderId, onSave }: PhotosSectionProps) => {
  const [initialData,    setInitialData]    = useState(_initialData);
  const [status,         setStatus]         = useState<GalleryStatus | null>(null);
  const [photos,         setPhotos]         = useState<Photo[]>([]);
  const [loading,        setLoading]        = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadingId,  setDownloadingId]  = useState<string | null>(null);
  const [photoCount,     setPhotoCount]     = useState<number>(0);

  const fetchSettings = useCallback(async () => {
    try {
      const res  = await fetch(`/api/photos/settings?orderId=${orderId}`);
      const data = await res.json();
      if (data?.settings) setInitialData(data.settings);
    } catch (e) { console.error('Poll error:', e); }
  }, [orderId]);

  useEffect(() => {
    const interval = setInterval(fetchSettings, 30000);
    return () => clearInterval(interval);
  }, [fetchSettings]);

  useEffect(() => {
    const dbStatus = initialData?.gallery_status;
    const start    = initialData?.photos_activated_at;
    setStatus(dbStatus === 'active' || start ? 'active' : 'inactive');
  }, [initialData]);

  const fetchPhotos = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res  = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
      const data = await res.json();
      if (data.photos) { setPhotos(data.photos); setPhotoCount(data.photos.length); }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    if (initialData?.photos_activated_at) fetchPhotos();
  }, [fetchPhotos, initialData]);

  const handleActivate = async () => {
    if (!consentChecked) {
      Swal.fire({
        title: '<span style="color: #7A3B1E; font-family: serif;">Un mic detaliu... 🌿</span>',
        text: 'Pentru a continua, te rugăm să accepți termenii și condițiile.',
        icon: 'warning',
        confirmButtonColor: '#A0522D',
        background: '#fdf6f0',
      });
      return;
    }
    try {
      await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId, isPhotosActive: true, gallery_status: 'active',
          photos_activated_at: new Date().toISOString(),
          photo_consent_accepted: true, is_unlock_paid: false,
        }),
      });
      await fetchSettings();
    } catch (e) { console.error(e); }
  };

  const handleDownloadSingle = async (photo: Photo) => {
    setDownloadingId(photo.id);
    try {
      const response = await fetch(photo.url);
      const blob     = await response.blob();
      const url      = window.URL.createObjectURL(blob);
      const a        = document.createElement('a');
      a.href         = url;
      const ext      = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
      a.download     = `foto-nunta-${photo.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open(photo.url, '_blank');
    }
    setDownloadingId(null);
  };

  const handleDownloadAll = async () => {
    if (photos.length === 0) return;
    setDownloadingAll(true);
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      try {
        const response = await fetch(photo.url);
        const blob     = await response.blob();
        const url      = window.URL.createObjectURL(blob);
        const a        = document.createElement('a');
        a.href         = url;
        const ext      = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
        a.download     = `foto-nunta-${String(i + 1).padStart(3, '0')}.${ext}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) { console.error(`Eroare poza ${i + 1}:`, e); }
    }
    setDownloadingAll(false);
  };

  const isFirstActivation    = !initialData?.photos_activated_at;
  const hasEverBeenActivated = !!initialData?.photos_activated_at;

  return (
    <div style={ph.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        ${KEYFRAMES}
        *, *::before, *::after { box-sizing: border-box; }
        input, textarea, select { font-size: ${FS.input}px !important; -webkit-text-size-adjust: 100%; }

        .photo-card:hover .photo-overlay { opacity: 1 !important; }
        .photo-card:hover img            { transform: scale(1.06); }
        .rose-btn:hover                  { transform: translateY(-2px); box-shadow: ${SH.btnRoseHover} !important; }
        .ghost-btn:hover                 { background: rgba(193,113,74,.1) !important; border-color: rgba(193,113,74,.45) !important; }
        .dl-btn:hover                    { background: rgba(193,113,74,.12) !important; }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: ${SP.sm + 2}px;
        }
        .photos-section-wrap { width: 100%; max-width: 900px; box-sizing: border-box; overflow-x: hidden; }

        @media (max-width: 600px) {
          .gallery-header-row  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .gallery-header-btns { width: 100% !important; }
          .gallery-header-btns button { flex: 1 !important; justify-content: center !important; }
          .dl-all-btn { width: 100% !important; justify-content: center !important; }
        }
        @media (max-width: 500px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
        }
      `}</style>

      <div className="photos-section-wrap">

        {/* HEADER */}
        <div style={ph.header}>
          <div>
            <p style={ph.headerLabel}>Panou Control</p>
            <h2 style={ph.title}>Galerie Foto</h2>
          </div>
          <div style={ph.headerIcon}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: 26, height: 26 }}>
              <rect x="4" y="14" width="40" height="28" rx="5" stroke={C.rose} strokeWidth="1.8" strokeOpacity=".7" />
              <path d="M14 14 L17 8 L31 8 L34 14" stroke={C.rose} strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round" />
              <circle cx="24" cy="28" r="8" stroke={C.rose} strokeWidth="1.5" strokeOpacity=".7" />
              <circle cx="24" cy="28" r="4" fill={C.rose} fillOpacity=".2" />
              <circle cx="37" cy="20" r="2" fill={C.rose} fillOpacity=".5" />
            </svg>
          </div>
        </div>

        <BohoDivider />

        {/* INACTIVE — FIRST ACTIVATION */}
        {isFirstActivation && (
          <div style={ph.card}>
            <div style={ph.cardInner}>
              <div style={ph.statusIconWrap}>
                <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
                  <circle cx="20" cy="20" r="18" stroke={C.rose} strokeWidth="1.5" strokeOpacity=".35" />
                  <path d="M20 12 L20 22 M20 27 L20 28" stroke={C.rose} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={ph.cardTitle}>Activare Modul Foto Permanent</h3>
              <p style={ph.cardDesc}>
                Activează galeria foto live. Invitații tăi vor putea încărca fotografii realizate cu telefonul direct în albumul vostru privat, pe toată durata evenimentului.
              </p>
              <label style={ph.consentLabel}>
                <div style={{ ...ph.checkbox, ...(consentChecked ? ph.checkboxChecked : {}) }}>
                  {consentChecked && (
                    <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}>
                      <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} style={{ display: 'none' }} />
                <span style={ph.consentText}>Sunt de acord cu activarea modulului foto pe toată durata existenței contului (12 luni).</span>
              </label>
              <button
                type="button"
                onClick={handleActivate}
                disabled={!consentChecked}
                className="rose-btn"
                style={{ ...ph.roseBtn, opacity: consentChecked ? 1 : 0.45, cursor: consentChecked ? 'pointer' : 'not-allowed', transition: 'all .25s' }}
              >
                <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.xl, height: IS.xl, flexShrink: 0 }}>
                  <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Activează Galeria Foto Live
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE STATUS */}
        {!isFirstActivation && status === 'active' && (
          <div style={ph.card}>
            <div style={ph.cardInner}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: SP.sm }}>
                <div style={ph.statusBadgeActive}>
                  <span style={ph.statusDot} />
                  Galerie Activă permanent
                </div>
              </div>
              <p style={{ ...ph.cardDesc, marginTop: SP.xs }}>
                Modulul este complet funcțional. Invitații au la dispoziție butonul de upload direct pe invitația digitală și pot încărca amintiri pe tot parcursul nunții.
              </p>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {hasEverBeenActivated && (
          <div style={{ marginTop: SP.xxxl, animation: 'rm-fade-in .5s ease both' }}>
            <div className="gallery-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: SP.lg, gap: BR.lg, flexWrap: 'wrap' }}>
              <div>
                <p style={ph.galleryCount}>{photoCount} {photoCount === 1 ? 'fotografie' : 'fotografii'} încărcate</p>
                <p style={ph.gallerySubCount}>Albumul tău privat online</p>
              </div>
              <div className="gallery-header-btns" style={{ display: 'flex', gap: SP.sm, flexWrap: 'wrap' }}>
                {photos.length > 0 && (
                  <button type="button" onClick={handleDownloadAll} disabled={downloadingAll} className="rose-btn dl-all-btn" style={{ ...ph.roseBtn, padding: `9px 18px`, fontSize: FS.base, gap: 7, transition: 'all .25s', opacity: downloadingAll ? 0.7 : 1, width: 'auto' }}>
                    {downloadingAll
                      ? <><svg viewBox="0 0 16 16" fill="none" style={{ width: IS.sm, height: IS.sm, animation: 'rm-spin 1s linear infinite', flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke="#fff" strokeWidth="1.8" strokeDasharray="20 10" /></svg>Descărcând...</>
                      : <><svg viewBox="0 0 16 16" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}><path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 14 L14 14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>Descarcă Toate pozele</>
                    }
                  </button>
                )}
                <button type="button" onClick={fetchPhotos} className="ghost-btn" style={{ ...ph.ghostBtn, transition: 'all .25s' }}>
                  {loading
                    ? <svg viewBox="0 0 16 16" fill="none" style={{ width: IS.sm, height: IS.sm, animation: 'rm-spin 1s linear infinite', flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke={C.rose} strokeWidth="1.8" strokeDasharray="20 10" /></svg>
                    : <svg viewBox="0 0 16 16" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}><path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke={C.rose} strokeWidth="1.6" strokeLinecap="round" /><path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke={C.rose} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  }
                  Actualizează
                </button>
              </div>
            </div>

            {photos.length === 0 && !loading ? (
              <div style={ph.emptyState}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38, marginBottom: BR.lg, opacity: .35 }}>
                  <rect x="4" y="14" width="40" height="28" rx="5" stroke={C.rose} strokeWidth="1.5" />
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke={C.rose} strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="24" cy="28" r="8" stroke={C.rose} strokeWidth="1.2" />
                </svg>
                <p style={{ fontFamily: F.body, fontSize: FS.base + 2, fontStyle: 'italic', color: 'rgba(160,82,45,.38)', marginBottom: SP.xs }}>Nicio fotografie încărcată de invitați</p>
                <p style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.18em', color: 'rgba(160,82,45,.22)', marginBottom: 0 }}>IMAGINILE TRIMISE DE INVITAȚI VOR APĂREA INSTANT AICI</p>
              </div>
            ) : (
              <div className="gallery-grid">
                {photos.map((p: Photo) => (
                  <div key={p.id} className="photo-card" style={ph.photoCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="Amintire eveniment" style={ph.photoImg} />
                    <div className="photo-overlay" style={ph.photoOverlay}>
                      <button type="button" onClick={() => handleDownloadSingle(p)} disabled={downloadingId === p.id} className="dl-btn" style={ph.dlBtn}>
                        {downloadingId === p.id
                          ? <svg viewBox="0 0 16 16" fill="none" style={{ width: IS.sm, height: IS.sm, animation: 'rm-spin 1s linear infinite', flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke={C.rose} strokeWidth="1.8" strokeDasharray="20 10" /></svg>
                          : <svg viewBox="0 0 16 16" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}><path d="M8 2 L8 10 M4 7 L8 11 L12 7" stroke={C.rose} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 13.5 L14 13.5" stroke={C.rose} strokeWidth="1.6" strokeLinecap="round" /></svg>
                        }
                        {downloadingId === p.id ? '...' : 'Descarcă'}
                      </button>
                      <a href={p.url} target="_blank" rel="noreferrer" style={ph.viewBtn}>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}>
                          <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="rgba(160,82,45,.7)" strokeWidth="1.4" />
                          <circle cx="8" cy="8" r="2" stroke="rgba(160,82,45,.7)" strokeWidth="1.4" />
                        </svg>
                        Vezi Full
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
