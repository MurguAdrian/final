"use client";
import React, { useState, useEffect, useCallback } from 'react';

export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
  const [isActive, setIsActive] = useState(initialData?.is_photos_active ?? false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Funcția de fetch definită cu useCallback pentru a fi stabilă
  const fetchPhotos = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
      const data = await res.json();
      if (data.photos) {
        setPhotos(data.photos);
      }
    } catch (e) {
      console.error("Fetch photos error:", e);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  // Încărcăm pozele la montarea componentei dacă modulul e activ
  useEffect(() => {
    if (isActive) {
      fetchPhotos();
    }
  }, [isActive, fetchPhotos]);

  const togglePhotos = async (val: boolean) => {
    const expiresAt = val ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null;
    setIsActive(val);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...initialData,
          orderId, 
          isPhotosActive: val, 
          photos_expires_at: expiresAt 
        }),
      });
      if (res.ok) onSave();
    } catch (e) {
      console.error("Toggle error:", e);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <h2 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '30px' }}>📸 Galerie Foto Live</h2>
      
      <div style={cardS}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <input 
              type="checkbox" 
              style={{ width: '22px', height: '22px' }} 
              checked={isActive} 
              onChange={e => togglePhotos(e.target.checked)} 
            />
            <span style={{ fontWeight: 'bold' }}>{isActive ? "MODUL ACTIV" : "MODUL INACTIV"}</span>
          </label>
          {isActive && (
            <button onClick={fetchPhotos} style={refreshBtn}>
              {loading ? "SE ÎNCARCĂ..." : "🔄 REFRESH POZE"}
            </button>
          )}
        </div>
        <p style={{ color: '#888', marginTop: '15px', fontSize: '0.85rem' }}>
          {isActive 
            ? "Invitații pot vedea butonul de upload. Pozele vor fi șterse automat după 7 zile." 
            : "Activează galeria pentru a genera link-ul de upload pentru invitați."}
        </p>
      </div>

      {isActive && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.1rem' }}>
            Imagini Surprinse de Invitați ({photos.length})
          </h3>
          
          {photos.length > 0 ? (
            <div style={galleryGrid}>
              {photos.map((p: any) => (
                <div key={p.id} style={photoWrapper}>
                  <img src={p.url} alt="Nunta" style={imgS} />
                  <a href={p.url} target="_blank" rel="noreferrer" style={downloadOverlay}>
                    DESCHIDE / SALVEAZĂ
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '50px', textAlign: 'center', background: '#111', borderRadius: '8px', border: '1px dashed #333' }}>
              <p style={{ color: '#666' }}>
                {loading ? "Se caută poze noi..." : "Încă nicio poză încărcată. Trimite link-ul invitaților!"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// STILURI
const cardS = { background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #d4af3733' };
const galleryGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' };
const photoWrapper = { position: 'relative' as any, height: '200px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', background: '#000' };
const imgS = { width: '100%', height: '100%', objectFit: 'cover' as any };
const downloadOverlay = { position: 'absolute' as any, bottom: 0, width: '100%', background: 'rgba(212, 175, 55, 0.9)', color: '#000', textAlign: 'center' as any, padding: '8px', fontSize: '0.7rem', fontWeight: 'bold' as any, textDecoration: 'none' };
const refreshBtn = { background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as any, fontSize: '0.75rem' };