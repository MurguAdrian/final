"use client";
import React, { useState, useEffect, useCallback } from 'react';

export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
  const [status, setStatus] = useState(initialData?.gallery_status || 'inactive');
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

  const fetchPhotos = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
      const data = await res.json();
      if (data.photos) setPhotos(data.photos);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    setStatus(initialData?.gallery_status || 'inactive');
    if (initialData?.photos_expires_at && initialData?.gallery_status === 'active') {
      const timer = setInterval(() => {
        const diff = +new Date(initialData.photos_expires_at) - +new Date();
        if (diff <= 0) { setTimeLeft("EXPIRAT"); setStatus('expired'); clearInterval(timer); }
        else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / 1000 / 60) % 60);
          setTimeLeft(`${d}z ${h}h ${m}m rămase`);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [initialData]);

  useEffect(() => {
    if ((status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted') {
      fetchPhotos();
    }
  }, [status, fetchPhotos, initialData]);

  const handleActivate = async () => {
    if (!consentChecked) { alert("Trebuie să accepți termenii pentru a activa."); return; }
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    try {
      await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId, 
          isPhotosActive: true, 
          gallery_status: 'active', 
          photos_expires_at: expiresAt,
          photos_activated_at: new Date().toISOString(),
          photo_consent_accepted: true 
        }),
      });
      onSave();
    } catch (e) { console.error(e); }
  };

  const handlePayment = async (type: 'extend' | 'unlock' | 'new_album') => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, type }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) { alert("Eroare plată"); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h2 style={{ color: '#d4af37', fontSize: '1.8rem', marginBottom: '20px' }}>📸 Gestiune Galerie Foto</h2>

      {status === 'inactive' && (
        <div style={cardS}>
          <h3>Activare Modul</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>
            Confirm că sunt beneficiarul exclusiv al fotografiilor și îmi asum responsabilitatea legală pentru utilizarea acestora.
          </p>
          <label style={{ display: 'flex', gap: '10px', marginBottom: '20px', cursor: 'pointer' }}>
            <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} />
            <span style={{ fontSize: '0.8rem' }}>Accept responsabilitatea integrală și termenii de stocare (30 zile).</span>
          </label>
          <button onClick={handleActivate} disabled={!consentChecked} style={{ ...btnGoldFull, opacity: consentChecked ? 1 : 0.5 }}>
            ACTIVEAZĂ 3 ZILE GRATUIT
          </button>
        </div>
      )}

      {status === 'active' && (
        <div style={cardS}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ color: '#4caf50' }}>🟢 ACTIV</h3>
            <span style={{ color: '#ffa500' }}>⏳ {timeLeft}</span>
          </div>
          {/* Prelungirea e permisă doar în primele 3 zile */}
          {new Date(initialData.photos_expires_at).getTime() - new Date(initialData.photos_activated_at).getTime() < 4 * 24 * 60 * 60 * 1000 && (
             <button onClick={() => handlePayment('extend')} style={{ ...btnGoldFull, marginTop: '20px' }}>
               PRELUNGEȘTE CU 5 ZILE (150 RON)
             </button>
          )}
        </div>
      )}

      {status === 'expired' && !initialData?.is_unlock_paid && (
        <div style={{ ...cardS, border: '1px solid #ff4444' }}>
          <h3 style={{ color: '#ff4444' }}>🔴 TIMP EXPIRAT</h3>
          <p style={{ color: '#888', fontSize: '0.8rem' }}>Upload-ul este blocat. Poți debloca vizualizarea pentru încă 5 zile.</p>
          <button onClick={() => handlePayment('unlock')} style={{ ...btnGoldFull, background: '#ff4444', color: '#fff', marginTop: '20px' }}>
            DEBLOCHEAZĂ VIZUALIZARE (200 RON)
          </button>
        </div>
      )}

      {status === 'deleted' && (
        <div style={cardS}>
          <h3 style={{ color: '#888' }}>🔒 ALBUM ȘTERS DEFINITIV</h3>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Cele 30 de zile au trecut. Poți porni un album nou.</p>
          <button onClick={() => handlePayment('new_album')} style={{ ...btnGoldFull, marginTop: '20px' }}>
            CREEAZĂ ALBUM NOU (400 RON)
          </button>
        </div>
      )}

      {(status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted' && (
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3>Fotografii ({photos.length})</h3>
            <button onClick={fetchPhotos} style={refreshBtn}>{loading ? "..." : "🔄 REFRESH"}</button>
          </div>
          <div style={galleryGrid}>
            {photos.map((p: any) => (
              <div key={p.id} style={photoWrapper}>
                <img src={p.url} alt="Nunta" style={imgS} />
                <a href={p.url} target="_blank" rel="noreferrer" style={downloadOverlay}>DESCARCĂ</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const cardS = { background: '#111', padding: '25px', borderRadius: '8px', border: '1px solid #d4af3722' };
const btnGoldFull = { width: '100%', padding: '15px', background: '#d4af37', color: '#000', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const refreshBtn = { background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 15px', cursor: 'pointer' };
const galleryGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' };
const photoWrapper = { position: 'relative' as any, height: '150px', overflow: 'hidden' };
const imgS = { width: '100%', height: '100%', objectFit: 'cover' as any };
const downloadOverlay = { position: 'absolute' as any, bottom: 0, width: '100%', background: 'rgba(212, 175, 55, 0.9)', color: '#000', textAlign: 'center' as any, padding: '5px', fontSize: '0.6rem', textDecoration: 'none' };