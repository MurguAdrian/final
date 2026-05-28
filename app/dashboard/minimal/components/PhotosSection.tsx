"use client";
import React, { useState, useEffect, useCallback } from 'react';

/* ── Tokens (module-level — identice cu MenuSection și page.tsx) ── */
const ACCENT = '#C8503A';
const DARK   = '#111111';
const MID    = '#555555';
const LIGHT  = '#AAAAAA';
const RULE   = '#E2E2E2';
const BG     = '#F7F4F0';

/* ── Types ── */
interface Photo             { id: string; url: string; }
interface PhotosSectionProps { initialData: any; orderId: any; onSave: () => void; }
type GalleryStatus = 'inactive' | 'active';

/* ════════════════════════════════════════════ COMPONENT ══ */
export const PhotosSection = ({ initialData: _initialData, orderId, onSave }: PhotosSectionProps) => {
  const [initialData, setInitialData]       = useState(_initialData);
  const [status, setStatus]                 = useState<GalleryStatus | null>(null);
  const [photos, setPhotos]                 = useState<Photo[]>([]);
  const [loading, setLoading]               = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadingId, setDownloadingId]   = useState<string | null>(null);
  const [photoCount, setPhotoCount]         = useState<number>(0);

  /* ── Poll DB la fiecare 30s ── */
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

  /* ── State machine simplificat ── */
  useEffect(() => {
    const dbStatus = initialData?.gallery_status;
    const start    = initialData?.photos_activated_at;
    if (dbStatus === 'active' || start) setStatus('active');
    else setStatus('inactive');
  }, [initialData]);

  /* ── Load photos ── */
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

  /* ── Activate ── */
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

  /* ── Download single ── */
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
      document.body.appendChild(a); a.click();
      window.URL.revokeObjectURL(url); document.body.removeChild(a);
    } catch { window.open(photo.url, '_blank'); }
    setDownloadingId(null);
  };

  /* ── Download all ── */
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
        document.body.appendChild(a); a.click();
        window.URL.revokeObjectURL(url); document.body.removeChild(a);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) { console.error(`Eroare poza ${i + 1}:`, e); }
    }
    setDownloadingAll(false);
  };

  const isFirstActivation    = !initialData?.photos_activated_at;
  const hasEverBeenActivated = !!initialData?.photos_activated_at;

  /* ══ RENDER ══ */
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: DARK, width: '100%', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        input, textarea, select { font-size: 16px !important; -webkit-text-size-adjust: 100%; }

        @keyframes mn-spin    { from { transform: rotate(0deg)  } to { transform: rotate(360deg) } }
        @keyframes mn-fade-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }

        .photos-section-wrap { width: 100%; max-width: 900px; box-sizing: border-box; overflow-x: hidden; }

        /* hover states */
        .photo-card:hover .photo-overlay { opacity: 1 !important; }
        .photo-card:hover img            { transform: scale(1.04); }
        .mn-gold-btn:hover:not(:disabled)  { background: #9a3e2d !important; transform: translateY(-1px); }
        .mn-ghost-btn:hover  { background: #fff !important; border-color: ${ACCENT} !important; color: ${ACCENT} !important; }
        .mn-dl-btn:hover     { background: rgba(200,80,58,.1) !important; border-color: rgba(200,80,58,.4) !important; }

        /* gallery grid */
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }

        @media (max-width: 500px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
        }
        @media (max-width: 600px) {
          .gallery-header-row  { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .gallery-header-btns { width: 100% !important; }
          .gallery-header-btns button { flex: 1 !important; justify-content: center !important; }
          .dl-all-btn { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      <div className="photos-section-wrap">

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 28, height: 2, background: ACCENT }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, marginBottom: 0 }}>
                Panou Control
              </p>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 400, fontStyle: 'italic', color: DARK, margin: 0, letterSpacing: '.02em' }}>
              Galerie Foto
            </h2>
          </div>
          <div style={{ width: 44, height: 44, background: '#fff', border: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: 22, height: 22 }}>
              <rect x="4" y="14" width="40" height="28" rx="3" stroke={ACCENT} strokeWidth="1.6" strokeOpacity=".7" />
              <path d="M14 14 L17 8 L31 8 L34 14" stroke={ACCENT} strokeWidth="1.6" strokeOpacity=".7" strokeLinejoin="round" />
              <circle cx="24" cy="28" r="8" stroke={ACCENT} strokeWidth="1.4" strokeOpacity=".7" />
              <circle cx="24" cy="28" r="4" fill={ACCENT} fillOpacity=".2" />
              <circle cx="37" cy="20" r="2" fill={ACCENT} fillOpacity=".5" />
            </svg>
          </div>
        </div>

        {/* ── Accent rule ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg,${ACCENT},#E8C4B8,transparent)`, margin: '12px 0 18px', opacity: .5 }} />

        {/* ── INACTIVE – Înainte de prima activare ── */}
        {isFirstActivation && (
          <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderTop: `3px solid ${ACCENT}`, marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
            <div style={{ padding: 'clamp(16px,3vw,24px)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ width: 44, height: 44, background: BG, border: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 40 40" fill="none" style={{ width: 22, height: 22 }}>
                  <circle cx="20" cy="20" r="17" stroke={ACCENT} strokeWidth="1.3" strokeOpacity=".5" />
                  <path d="M20 12 L20 22 M20 27 L20 28" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', fontWeight: 400, color: DARK, margin: 0 }}>
                Activare Modul Foto Permanent
              </h3>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px,2vw,15px)', fontStyle: 'italic', color: LIGHT, lineHeight: 1.7, margin: 0 }}>
                Activează galeria foto live. Invitații tăi vor putea încărca fotografii realizate cu telefonul direct în albumul vostru privat, pe toată durata evenimentului.
              </p>

              {/* Consent */}
              <label
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px', background: BG, border: `1px solid ${RULE}`, borderLeft: `3px solid rgba(200,80,58,.3)` }}
                onClick={() => setConsentChecked(prev => !prev)}
              >
                <div style={{ width: 18, height: 18, border: `1px solid ${consentChecked ? ACCENT : RULE}`, background: consentChecked ? ACCENT : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all .18s' }}>
                  {consentChecked && (
                    <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}>
                      <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" checked={consentChecked} onChange={() => {}} style={{ display: 'none' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: MID, lineHeight: 1.6 }}>
                  Sunt de acord cu activarea modulului foto pe toată durata existenței contului (12 luni).
                </span>
              </label>

              {/* Activate button */}
              <button
                type="button"
                className="mn-gold-btn"
                onClick={handleActivate}
                disabled={!consentChecked}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 20px',
                  background: DARK, color: '#fff',
                  border: 'none',
                  cursor: consentChecked ? 'pointer' : 'not-allowed',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
                  letterSpacing: '.16em', textTransform: 'uppercase',
                  opacity: consentChecked ? 1 : .4,
                  transition: 'all .2s', width: '100%',
                }}
              >
                <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
                  <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Activează Galeria Foto Live
              </button>
            </div>
          </div>
        )}

        {/* ── ACTIVE ── */}
        {!isFirstActivation && status === 'active' && (
          <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderLeft: `3px solid #5a9a6a`, marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
            <div style={{ padding: 'clamp(14px,2.5vw,20px)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '4px 12px',
                  background: 'rgba(90,154,106,.08)', border: '1px solid rgba(90,154,106,.25)',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase',
                  color: '#5a9a6a',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5a9a6a', display: 'inline-block' }} />
                  Galerie Activă permanent
                </span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(12px,2vw,14px)', fontStyle: 'italic', color: LIGHT, lineHeight: 1.7, margin: 0 }}>
                Modulul este complet funcțional. Invitații au la dispoziție butonul de upload direct pe invitația digitală.
              </p>
            </div>
          </div>
        )}

        {/* ── GALLERY ── */}
        {hasEverBeenActivated && (
          <div style={{ marginTop: 24, animation: 'mn-fade-in .5s ease both' }}>

            {/* Sub-header galerie */}
            <div className="gallery-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,3vw,20px)', fontStyle: 'italic', color: DARK, margin: 0, fontWeight: 400 }}>
                  {photoCount} {photoCount === 1 ? 'fotografie' : 'fotografii'} încărcate
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: LIGHT, marginTop: 2, marginBottom: 0 }}>
                  Albumul tău privat online
                </p>
              </div>

              <div className="gallery-header-btns" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {photos.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={downloadingAll}
                    className="mn-gold-btn dl-all-btn"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      padding: '9px 16px',
                      background: DARK, color: '#fff', border: 'none',
                      cursor: downloadingAll ? 'not-allowed' : 'pointer',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                      letterSpacing: '.12em', textTransform: 'uppercase',
                      transition: 'all .2s', opacity: downloadingAll ? 0.7 : 1, width: 'auto',
                    }}
                  >
                    {downloadingAll ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, animation: 'mn-spin 1s linear infinite', flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="6" stroke="#fff" strokeWidth="1.8" strokeDasharray="20 10" />
                        </svg>
                        Descărcând...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
                          <path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2 14 L14 14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        Descarcă Toate
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={fetchPhotos}
                  className="mn-ghost-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '9px 14px',
                    background: BG, border: `1px solid ${RULE}`, color: MID,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                    letterSpacing: '.1em',
                    cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap',
                  }}
                >
                  {loading ? (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, animation: 'mn-spin 1s linear infinite', flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke={ACCENT} strokeWidth="1.8" strokeDasharray="20 10" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
                      <path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  Actualizează
                </button>
              </div>
            </div>

            {/* Grid */}
            {photos.length === 0 && !loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px 20px', background: '#fff', border: `1px dashed ${RULE}`, textAlign: 'center' }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: 32, height: 32, marginBottom: 10, opacity: .3 }}>
                  <rect x="4" y="14" width="40" height="28" rx="3" stroke={DARK} strokeWidth="1.5" />
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke={DARK} strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="24" cy="28" r="8" stroke={DARK} strokeWidth="1.2" />
                </svg>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontStyle: 'italic', color: LIGHT, marginBottom: 4 }}>
                  Nicio fotografie încărcată de invitați
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 0 }}>
                  IMAGINILE TRIMISE DE INVITAȚI VOR APĂREA INSTANT AICI
                </p>
              </div>
            ) : (
              <div className="gallery-grid">
                {photos.map((p: Photo) => (
                  <div
                    key={p.id}
                    className="photo-card"
                    style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', border: `1px solid ${RULE}`, background: BG, cursor: 'pointer' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt="Amintire eveniment"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .35s ease' }}
                    />
                    <div
                      className="photo-overlay"
                      style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(17,17,17,.85) 0%,rgba(17,17,17,.3) 50%,transparent 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 5, padding: 8, opacity: 0, transition: 'opacity .25s ease' }}
                    >
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(p)}
                        disabled={downloadingId === p.id}
                        className="mn-dl-btn"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px',
                          background: 'rgba(247,244,240,.12)', border: '1px solid rgba(247,244,240,.3)',
                          color: '#F7F4F0',
                          fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: '.08em',
                          cursor: 'pointer', width: '100%', justifyContent: 'center', transition: 'all .18s',
                        }}
                      >
                        {downloadingId === p.id ? (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, height: 11, animation: 'mn-spin 1s linear infinite', flexShrink: 0 }}>
                            <circle cx="8" cy="8" r="6" stroke="#F7F4F0" strokeWidth="1.8" strokeDasharray="20 10" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, height: 11, flexShrink: 0 }}>
                            <path d="M8 2 L8 10 M4 7 L8 11 L12 7" stroke="#F7F4F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 13.5 L14 13.5" stroke="#F7F4F0" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                        {downloadingId === p.id ? '...' : 'Descarcă'}
                      </button>

                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px',
                          background: 'rgba(247,244,240,.08)', border: '1px solid rgba(247,244,240,.2)',
                          color: 'rgba(247,244,240,.75)',
                          fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.08em',
                          textDecoration: 'none', width: '100%', justifyContent: 'center', transition: 'all .18s',
                        }}
                      >
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, height: 11, flexShrink: 0 }}>
                          <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="currentColor" strokeWidth="1.3" />
                          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
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
