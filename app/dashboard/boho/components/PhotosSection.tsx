"use client";
import React, { useState, useEffect, useCallback } from 'react';

interface Photo {
  id: string;
  url: string;
}

interface PhotosSectionProps {
  initialData: any;
  orderId: any;
  onSave: () => void;
}

type GalleryStatus = 'inactive' | 'active';

export const PhotosSection = ({ initialData: _initialData, orderId, onSave }: PhotosSectionProps) => {
  const [initialData, setInitialData]       = useState(_initialData);
  const [status, setStatus]                 = useState<GalleryStatus | null>(null);
  const [photos, setPhotos]                 = useState<Photo[]>([]);
  const [loading, setLoading]               = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadingId, setDownloadingId]   = useState<string | null>(null);
  const [photoCount, setPhotoCount]         = useState<number>(0);

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
    const start = initialData?.photos_activated_at;

    if (dbStatus === 'active' || start) {
      setStatus('active');
    } else {
      setStatus('inactive');
    }
  }, [initialData]);

  const fetchPhotos = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res  = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
      const data = await res.json();
      if (data.photos) {
        setPhotos(data.photos);
        setPhotoCount(data.photos.length);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    if (initialData?.photos_activated_at) {
      fetchPhotos();
    }
  }, [fetchPhotos, initialData]);

  const handleActivate = async () => {
    if (!consentChecked) { alert('Trebuie să accepți termenii pentru a activa.'); return; }
    try {
      await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          isPhotosActive:         true,
          gallery_status:         'active',
          photos_activated_at:    new Date().toISOString(),
          photo_consent_accepted: true,
          is_unlock_paid:         false,
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

  const isFirstActivation = !initialData?.photos_activated_at;
  const hasEverBeenActivated = !!initialData?.photos_activated_at;

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lora:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input, textarea, select { font-size: 16px !important; -webkit-text-size-adjust: 100%; }
        .photo-card:hover .photo-overlay { opacity: 1 !important; }
        .photo-card:hover img            { transform: scale(1.06); }
        .gold-btn:hover                  { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(196,120,90,.35) !important; }
        .ghost-btn:hover                 { background: rgba(196,120,90,.1) !important; border-color: rgba(196,120,90,.45) !important; }
        .dl-btn:hover                    { background: rgba(196,120,90,.15) !important; }
        @keyframes spin    { from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
        @keyframes fadeIn  { from{ opacity: 0; transform: translateY(8px) } to{ opacity: 1; transform: translateY(0) } }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
        @media (max-width: 500px) { .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; } }
        @media (max-width: 600px) {
          .gallery-header-row  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .gallery-header-btns { width: 100% !important; }
          .gallery-header-btns button { flex: 1 !important; justify-content: center !important; }
          .dl-all-btn { width: 100% !important; justify-content: center !important; }
        }
        .photos-section-wrap { width: 100%; max-width: 900px; box-sizing: border-box; overflow-x: hidden; }
      `}</style>

      <div className="photos-section-wrap">

        <div style={styles.header}>
          <div>
            <p style={styles.headerLabel}>Panou Control</p>
            <h2 style={styles.title}>Galerie Foto</h2>
          </div>
          <div style={styles.headerIcon}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: 26, height: 26 }}>
              <rect x="4" y="14" width="40" height="28" rx="5" stroke="#C4785A" strokeWidth="1.8" strokeOpacity=".8" />
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#C4785A" strokeWidth="1.8" strokeOpacity=".8" strokeLinejoin="round" />
              <circle cx="24" cy="28" r="8" stroke="#C4785A" strokeWidth="1.5" strokeOpacity=".8" />
              <circle cx="24" cy="28" r="4" fill="#C4785A" fillOpacity=".2" />
              <circle cx="37" cy="20" r="2" fill="#C4785A" fillOpacity=".5" />
            </svg>
          </div>
        </div>

        <div style={styles.divider} />

        {isFirstActivation && (
          <div style={styles.card}>
            <div style={styles.cardInner}>
              <div style={styles.statusIconWrap}>
                <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
                  <circle cx="20" cy="20" r="18" stroke="#C4785A" strokeWidth="1.5" strokeOpacity=".4" />
                  <path d="M20 12 L20 22 M20 27 L20 28" stroke="#C4785A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={styles.cardTitle}>Activare Modul Foto Permanent</h3>
              <p style={styles.cardDesc}>
                Activează galeria foto live. Invitații tăi vor putea încărca fotografii realizate cu telefonul direct în albumul vostru privat, pe toată durata evenimentului.
              </p>
              <label style={styles.consentLabel}>
                <div style={{ ...styles.checkbox, ...(consentChecked ? styles.checkboxChecked : {}) }}>
                  {consentChecked && (
                    <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}>
                      <path d="M2 6L5 9L10 3" stroke="#FDF6EF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={e => setConsentChecked(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <span style={styles.consentText}>Sunt de acord cu activarea modulului foto pe toată durata existenței contului (12 luni).</span>
              </label>
              <button
                type="button"
                onClick={handleActivate}
                disabled={!consentChecked}
                className="gold-btn"
                style={{ ...styles.goldBtn, opacity: consentChecked ? 1 : 0.45, cursor: consentChecked ? 'pointer' : 'not-allowed', transition: 'all .25s' }}
              >
                <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="#FDF6EF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Activează Galeria Foto Live
              </button>
            </div>
          </div>
        )}

        {!isFirstActivation && status === 'active' && (
          <div style={styles.card}>
            <div style={styles.cardInner}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={styles.statusBadgeActive}>
                  <span style={styles.statusDot} />
                  Galerie Activă permanent
                </div>
              </div>
              <p style={{ ...styles.cardDesc, marginTop: 4 }}>
                Modulul este complet funcțional. Invitații au la dispoziție butonul de upload direct pe invitația digitală și pot încărca amintiri pe tot parcursul nunții.
              </p>
            </div>
          </div>
        )}

        {hasEverBeenActivated && (
          <div style={{ marginTop: 28, animation: 'fadeIn .5s ease both' }}>
            <div className="gallery-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
              <div>
                <p style={styles.galleryCount}>
                  {photoCount} {photoCount === 1 ? 'fotografie' : 'fotografii'} încărcate
                </p>
                <p style={styles.gallerySubCount}>
                  Albumul tău privat online
                </p>
              </div>
              <div className="gallery-header-btns" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {photos.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={downloadingAll}
                    className="gold-btn dl-all-btn"
                    style={{ ...styles.goldBtn, padding: '9px 18px', fontSize: 11, gap: 7, transition: 'all .25s', opacity: downloadingAll ? 0.7 : 1, width: 'auto' }}
                  >
                    {downloadingAll ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="6" stroke="#FDF6EF" strokeWidth="1.8" strokeDasharray="20 10" />
                        </svg>
                        Descărcând...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                          <path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="#FDF6EF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2 14 L14 14" stroke="#FDF6EF" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        Descarcă Toate pozele
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={fetchPhotos}
                  className="ghost-btn"
                  style={{ ...styles.ghostBtn, transition: 'all .25s' }}
                >
                  {loading ? (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke="#C4785A" strokeWidth="1.8" strokeDasharray="20 10" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                      <path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke="#C4785A" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke="#C4785A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  Actualizează
                </button>
              </div>
            </div>

            {photos.length === 0 && !loading ? (
              <div style={styles.emptyState}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38, marginBottom: 12, opacity: .35 }}>
                  <rect x="4" y="14" width="40" height="28" rx="5" stroke="#C4785A" strokeWidth="1.5" />
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke="#C4785A" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="24" cy="28" r="8" stroke="#C4785A" strokeWidth="1.2" />
                </svg>
                <p style={{ fontFamily: "'Lora',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(122,74,53,.4)', marginBottom: 4 }}>
                  Nicio fotografie încărcată de invitați
                </p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 9, letterSpacing: '.18em', color: 'rgba(196,120,90,.3)', marginBottom: 0 }}>
                  IMAGINILE TRIMISE DE INVITAȚI VOR APĂREA INSTANT AICI
                </p>
              </div>
            ) : (
              <div className="gallery-grid">
                {photos.map((p: Photo) => (
                  <div key={p.id} className="photo-card" style={styles.photoCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="Amintire eveniment" style={styles.photoImg} />
                    <div className="photo-overlay" style={styles.photoOverlay}>
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(p)}
                        disabled={downloadingId === p.id}
                        className="dl-btn"
                        style={styles.dlBtn}
                      >
                        {downloadingId === p.id ? (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                            <circle cx="8" cy="8" r="6" stroke="#C4785A" strokeWidth="1.8" strokeDasharray="20 10" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                            <path d="M8 2 L8 10 M4 7 L8 11 L12 7" stroke="#C4785A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 13.5 L14 13.5" stroke="#C4785A" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        )}
                        {downloadingId === p.id ? '...' : 'Descarcă'}
                      </button>
                      <a href={p.url} target="_blank" rel="noreferrer" style={styles.viewBtn}>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                          <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="rgba(122,74,53,.8)" strokeWidth="1.4" />
                          <circle cx="8" cy="8" r="2" stroke="rgba(122,74,53,.8)" strokeWidth="1.4" />
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

const B = {
  terra:       '#C4785A',
  terraDim:   'rgba(196,120,90,.55)',
  terraFaint: 'rgba(196,120,90,.1)',
  terraBorder:'rgba(196,120,90,.2)',
  text:       '#7A4A35',
  textDim:    'rgba(122,74,53,.5)',
  cream:      '#FDF6EF',
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: { fontFamily: "'Lora', serif", color: B.text, width: '100%', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box', overflowX: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 12 },
  headerLabel: { fontFamily: "'Playfair Display',serif", fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', color: B.terraDim, marginBottom: 4 },
  title: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 400, fontStyle: 'italic', color: B.terra, margin: 0, letterSpacing: '.04em' },
  headerIcon: { width: 48, height: 48, borderRadius: 14, background: B.terraFaint, border: `1px solid ${B.terraBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  divider: { height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.25),transparent)', margin: '14px 0 20px' },
  card: { background: 'rgba(255,248,240,.9)', border: `1px solid ${B.terraBorder}`, borderRadius: 16, overflow: 'hidden', marginBottom: 14, boxShadow: '0 4px 16px rgba(196,120,90,.08)' },
  cardInner: { padding: 'clamp(16px,3vw,24px)', display: 'flex', flexDirection: 'column', gap: 10 },
  statusIconWrap: { width: 48, height: 48, borderRadius: '50%', background: B.terraFaint, border: `1px solid ${B.terraBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', fontWeight: 400, color: B.text, margin: 0 },
  cardDesc: { fontFamily: "'Lora',serif", fontSize: 'clamp(13px,2vw,15px)', fontStyle: 'italic', color: B.textDim, lineHeight: 1.7, margin: 0 },
  consentLabel: { display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px', background: B.terraFaint, border: `1px solid ${B.terraBorder}`, borderRadius: 12 },
  checkbox: { width: 18, height: 18, borderRadius: 5, border: '1.5px solid rgba(196,120,90,.4)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all .2s' },
  checkboxChecked: { background: '#C4785A', borderColor: '#C4785A' },
  consentText: { fontFamily: "'Playfair Display',serif", fontSize: 10, letterSpacing: '.06em', color: 'rgba(122,74,53,.7)', lineHeight: 1.6 },
  goldBtn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 12, background: 'linear-gradient(135deg,#C4785A 0%,#E8A48A 40%,#F5C4A8 55%,#E8A48A 70%,#C4785A 100%)', color: '#FDF6EF', fontFamily: "'Playfair Display',serif", fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(196,120,90,.25)', width: '100%' } as React.CSSProperties,
  ghostBtn: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 10, background: B.terraFaint, border: `1px solid ${B.terraBorder}`, color: B.terra, fontFamily: "'Playfair Display',serif", fontSize: 10, fontWeight: 600, letterSpacing: '.1em', cursor: 'pointer', whiteSpace: 'nowrap' } as React.CSSProperties,
  statusBadgeActive: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, background: 'rgba(100,160,100,.1)', border: '1px solid rgba(100,160,100,.3)', fontFamily: "'Playfair Display',serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#5A9A5A' },
  statusDot: { width: 7, height: 7, borderRadius: '50%', background: '#6AB56A', display: 'inline-block', boxShadow: '0 0 6px #6AB56A', flexShrink: 0 },
  galleryCount: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', color: B.text, margin: 0, fontWeight: 400 },
  gallerySubCount: { fontFamily: "'Playfair Display',serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: B.terraDim, marginTop: 2, marginBottom: 0 },
  photoCard: { position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', border: `1px solid ${B.terraBorder}`, background: '#F5EDE4', cursor: 'pointer' } as React.CSSProperties,
  photoImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' } as React.CSSProperties,
  photoOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(122,74,53,.85) 0%,rgba(122,74,53,.3) 50%,transparent 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 5, padding: 8, opacity: 0, transition: 'opacity .3s ease' } as React.CSSProperties,
  dlBtn: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, background: 'rgba(253,246,239,.15)', border: '1px solid rgba(196,120,90,.4)', color: '#FDF6EF', fontFamily: "'Playfair Display',serif", fontSize: 9, fontWeight: 600, letterSpacing: '.1em', cursor: 'pointer', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
  viewBtn: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8, background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(253,246,239,.8)', fontFamily: "'Playfair Display',serif", fontSize: 9, letterSpacing: '.1em', textDecoration: 'none', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'rgba(196,120,90,.04)', border: '1px dashed rgba(196,120,90,.2)', borderRadius: 16, textAlign: 'center' } as React.CSSProperties,
};
