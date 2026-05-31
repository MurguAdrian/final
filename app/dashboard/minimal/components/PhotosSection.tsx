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

  // ─────────────────────────────
  // POLL DB – la fiecare 30s pentru a verifica starea actuală
  // ─────────────────────────────
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

  // ─────────────────────────────
  // STATE MACHINE SIMPLIFICAT
  // ─────────────────────────────
  useEffect(() => {
    const dbStatus = initialData?.gallery_status;
    const start = initialData?.photos_activated_at;

    if (dbStatus === 'active' || start) {
      setStatus('active');
    } else {
      setStatus('inactive');
    }
  }, [initialData]);

  // ─────────────────────────────
  // LOAD PHOTOS
  // ─────────────────────────────
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

  // ─────────────────────────────
  // ACTIVATE
  // ─────────────────────────────
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

  // ─────────────────────────────
  // DOWNLOAD
  // ─────────────────────────────
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

  // ─── MINIMAL DESIGN TOKENS ───
  const ACCENT  = '#C8503A';
  const DARK    = '#111111';
  const MID     = '#555555';
  const LIGHT   = '#AAAAAA';
  const RULE    = '#E2E2E2';
  const BG      = '#F7F4F0';

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: DARK, width: '100%', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box', overflowX: 'hidden', background: BG }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input, textarea, select { font-size: 16px !important; -webkit-text-size-adjust: 100%; }

        .mn-photo-card:hover .mn-photo-overlay { opacity: 1 !important; }
        .mn-photo-card:hover img { transform: scale(1.05); }

        .mn-primary-btn:hover  { opacity: 0.85 !important; }
        .mn-ghost-btn:hover    { border-color: ${ACCENT} !important; color: ${DARK} !important; background: ${ACCENT}10 !important; }
        .mn-dl-btn:hover       { background: ${ACCENT}18 !important; border-color: ${ACCENT} !important; }

        @keyframes mn-spin    { from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
        @keyframes mn-fadeIn  { from{ opacity: 0; transform: translateY(8px) } to{ opacity: 1; transform: translateY(0) } }

        .mn-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
        @media (max-width: 500px) { .mn-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; } }
        @media (max-width: 600px) {
          .mn-gallery-header-row  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .mn-gallery-header-btns { width: 100% !important; }
          .mn-gallery-header-btns button { flex: 1 !important; justify-content: center !important; }
          .mn-dl-all-btn { width: 100% !important; justify-content: center !important; }
        }
        .mn-photos-wrap { width: 100%; max-width: 900px; box-sizing: border-box; overflow-x: hidden; }
      `}</style>

      <div className="mn-photos-wrap">

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 24, height: 2, background: ACCENT }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.32em', textTransform: 'uppercase', color: LIGHT, fontWeight: 500 }}>
                Panou Control
              </p>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 400, fontStyle: 'italic', color: DARK, margin: 0, letterSpacing: '-.01em' }}>
              Galerie Foto
            </h2>
          </div>
          {/* Icon box */}
          <div style={{ width: 48, height: 48, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: 24, height: 24 }}>
              <rect x="4" y="14" width="40" height="28" rx="2" stroke="white" strokeWidth="1.8" />
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="24" cy="28" r="8" stroke="white" strokeWidth="1.5" />
              <circle cx="24" cy="28" r="4" fill="white" fillOpacity=".25" />
              <circle cx="37" cy="20" r="2" fill="white" fillOpacity=".6" />
            </svg>
          </div>
        </div>

        {/* Rule */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}60, transparent)`, margin: '14px 0 24px' }} />

        {/* ── INACTIVE (Prima activare) ── */}
        {isFirstActivation && (
          <div style={{ background: '#fff', borderTop: `4px solid ${ACCENT}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 16, boxShadow: '0 2px 16px rgba(0,0,0,.05)' }}>
            {/* Card eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 18, height: 2, background: ACCENT }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600 }}>
                Activare
              </p>
            </div>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,3vw,24px)', fontStyle: 'italic', fontWeight: 400, color: DARK, marginBottom: 10, lineHeight: 1.25 }}>
              Activare Modul Foto Permanent
            </h3>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px,1.6vw,15px)', fontStyle: 'italic', color: MID, lineHeight: 1.85, marginBottom: 20 }}>
              Activează galeria foto live. Invitații tăi vor putea încărca fotografii realizate cu telefonul direct în albumul vostru privat, pe toată durata evenimentului.
            </p>

            {/* Consent */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '14px 16px', background: BG, border: `1px solid ${RULE}`, borderLeft: `3px solid ${ACCENT}`, marginBottom: 20 }}>
              <div style={{
                width: 18, height: 18, border: `1.5px solid ${consentChecked ? ACCENT : RULE}`,
                background: consentChecked ? ACCENT : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1, transition: 'all .18s',
              }}>
                {consentChecked && (
                  <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}>
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={e => setConsentChecked(e.target.checked)}
                style={{ display: 'none' }}
              />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '.04em', color: MID, lineHeight: 1.65 }}>
                Sunt de acord cu activarea modulului foto pe toată durata existenței contului (12 luni).
              </span>
            </label>

            <button
              type="button"
              onClick={handleActivate}
              disabled={!consentChecked}
              className="mn-primary-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '13px 28px', background: consentChecked ? DARK : LIGHT,
                color: '#fff', border: 'none', cursor: consentChecked ? 'pointer' : 'not-allowed',
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                letterSpacing: '.22em', textTransform: 'uppercase', transition: 'all .2s', width: '100%',
              }}
            >
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
                <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Activează Galeria Foto Live
            </button>
          </div>
        )}

        {/* ── ACTIVE ── */}
        {!isFirstActivation && status === 'active' && (
          <div style={{ background: '#fff', borderLeft: `4px solid #4CAF50`, padding: 'clamp(18px,3vw,28px)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 16px rgba(0,0,0,.04)' }}>
            {/* Status dot */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', border: '1px solid rgba(76,175,80,.3)', background: 'rgba(76,175,80,.07)', flexShrink: 0 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4CAF50', display: 'inline-block', boxShadow: '0 0 6px #4CAF50', flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#4CAF50', fontWeight: 500 }}>
                Galerie Activă permanent
              </span>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', color: MID, lineHeight: 1.7, margin: 0 }}>
              Modulul este complet funcțional. Invitații au la dispoziție butonul de upload direct pe invitația digitală și pot încărca amintiri pe tot parcursul nunții.
            </p>
          </div>
        )}

        {/* ── GALERIE ── */}
        {hasEverBeenActivated && (
          <div style={{ marginTop: 28, animation: 'mn-fadeIn .5s ease both' }}>

            {/* Galerie header */}
            <div className="mn-gallery-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
              <div>
                {/* Eyebrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 16, height: 2, background: ACCENT }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', color: LIGHT, fontWeight: 500 }}>
                    Albumul tău privat online
                  </p>
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,3vw,26px)', fontStyle: 'italic', fontWeight: 400, color: DARK, margin: 0 }}>
                  {photoCount} {photoCount === 1 ? 'fotografie' : 'fotografii'} încărcate
                </p>
              </div>

              <div className="mn-gallery-header-btns" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {photos.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={downloadingAll}
                    className="mn-primary-btn mn-dl-all-btn"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '9px 18px', background: DARK, color: '#fff', border: 'none',
                      cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                      fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase',
                      transition: 'opacity .2s', opacity: downloadingAll ? 0.65 : 1, width: 'auto',
                    }}
                  >
                    {downloadingAll ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'mn-spin 1s linear infinite', flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.8" strokeDasharray="20 10" />
                        </svg>
                        Descărcând...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                          <path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2 14 L14 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        Descarcă Toate pozele
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={fetchPhotos}
                  className="mn-ghost-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '9px 16px', background: 'transparent',
                    border: `1px solid ${RULE}`, color: MID,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                    fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .18s',
                  }}
                >
                  {loading ? (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'mn-spin 1s linear infinite', flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke={MID} strokeWidth="1.8" strokeDasharray="20 10" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                      <path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke={MID} strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke={MID} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  Actualizează
                </button>
              </div>
            </div>

            {/* Grid / Empty state */}
            {photos.length === 0 && !loading ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '52px 20px', background: '#fff', border: `1px dashed ${RULE}`,
                borderTop: `3px solid ${RULE}`, textAlign: 'center',
              }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38, marginBottom: 14, opacity: .25 }}>
                  <rect x="4" y="14" width="40" height="28" rx="2" stroke={DARK} strokeWidth="1.5" />
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke={DARK} strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="24" cy="28" r="8" stroke={DARK} strokeWidth="1.2" />
                </svg>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontStyle: 'italic', color: LIGHT, marginBottom: 6 }}>
                  Nicio fotografie încărcată de invitați
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: `${LIGHT}99` }}>
                  Imaginile trimise de invitați vor apărea instant aici
                </p>
              </div>
            ) : (
              <div className="mn-gallery-grid">
                {photos.map((p: Photo) => (
                  <div key={p.id} className="mn-photo-card" style={{
                    position: 'relative', aspectRatio: '1', overflow: 'hidden',
                    border: `1px solid ${RULE}`, background: '#F0EDE8', cursor: 'pointer',
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="Amintire eveniment" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' }} />
                    <div className="mn-photo-overlay" style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top,rgba(17,17,17,.9) 0%,rgba(17,17,17,.4) 50%,transparent 100%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                      gap: 5, padding: 8, opacity: 0, transition: 'opacity .3s ease',
                    }}>
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(p)}
                        disabled={downloadingId === p.id}
                        className="mn-dl-btn"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '6px 12px', background: 'rgba(255,255,255,.1)',
                          border: `1px solid rgba(255,255,255,.3)`, color: '#fff',
                          fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                          fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase',
                          cursor: 'pointer', width: '100%', justifyContent: 'center', transition: 'all .2s',
                        }}
                      >
                        {downloadingId === p.id ? (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'mn-spin 1s linear infinite', flexShrink: 0 }}>
                            <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.8" strokeDasharray="20 10" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                            <path d="M8 2 L8 10 M4 7 L8 11 L12 7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 13.5 L14 13.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        )}
                        {downloadingId === p.id ? '...' : 'Descarcă'}
                      </button>
                      <a href={p.url} target="_blank" rel="noreferrer" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '5px 12px', background: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.7)',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.1em',
                        textTransform: 'uppercase', textDecoration: 'none',
                        width: '100%', justifyContent: 'center', transition: 'all .2s',
                      }}>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                          <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="rgba(255,255,255,.7)" strokeWidth="1.4" />
                          <circle cx="8" cy="8" r="2" stroke="rgba(255,255,255,.7)" strokeWidth="1.4" />
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
