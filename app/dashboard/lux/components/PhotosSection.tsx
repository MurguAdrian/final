"use client";
import React, { useState, useEffect } from 'react';

export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
  const [isActive, setIsActive] = useState(initialData?.is_photos_active ?? false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (isActive) fetchPhotos();
    
    if (initialData?.photos_expires_at) {
      const timer = setInterval(() => {
        const diff = +new Date(initialData.photos_expires_at) - +new Date();
        if (diff <= 0) {
          setTimeLeft("EXPIRAT - Pozele vor fi șterse");
          clearInterval(timer);
        } else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / 1000 / 60) % 60);
          setTimeLeft(`${d}z ${h}h ${m}m rămase`);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, initialData]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/list?orderId=${orderId}`);
      const data = await res.json();
      if (data.photos) setPhotos(data.photos);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const togglePhotos = async (val: boolean) => {
    // Dacă activează, punem data de azi + 7 zile
    const expiresAt = val ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null;
    setIsActive(val);
    await fetch('/api/dashboard/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, isPhotosActive: val, photos_expires_at: expiresAt }),
    });
    onSave();
  };

  return (
    <div>
      <h2 style={{ color: '#d4af37' }}>📸 Galerie Foto Live</h2>
      
      <div style={cardS}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={isActive} onChange={e => togglePhotos(e.target.checked)} />
            {isActive ? " MODUL ACTIV" : " MODUL INACTIV"}
          </label>
          {isActive && <span style={{ color: '#ffa500' }}>⏳ {timeLeft}</span>}
        </div>
        <p style={{ color: '#888', marginTop: '10px', fontSize: '0.8rem' }}>
          Activarea pornește cronometrul de 7 zile. După expirare, pozele sunt șterse definitiv.
        </p>
      </div>

      {isActive && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
             <h3 style={{ color: '#d4af37' }}>Poze Încărcate ({photos.length})</h3>
             <button onClick={fetchPhotos} style={refreshBtn}>REFRESH</button>
          </div>
          <div style={galleryGrid}>
            {photos.map((p) => (
              <div key={p.id} style={pWrapper}>
                <img src={p.url} alt="Nunta" style={imgS} />
                <a href={p.url} download target="_blank" style={dlBtn}>DESCARCĂ</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const cardS = { background: '#111', padding: '25px', borderRadius: '8px', border: '1px solid #d4af3744' };
const galleryGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' };
const pWrapper = { position: 'relative' as any, height: '150px', borderRadius: '4px', overflow: 'hidden' };
const imgS = { width: '100%', height: '100%', objectFit: 'cover' as any };
const dlBtn = { position: 'absolute' as any, bottom: 0, width: '100%', background: '#d4af37', color: '#000', textAlign: 'center' as any, fontSize: '0.6rem', fontWeight: 'bold' as any, textDecoration: 'none', padding: '3px 0' };
const refreshBtn = { background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 15px', cursor: 'pointer' };