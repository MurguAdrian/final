"use client";
import React, { useState, useEffect } from 'react';

export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
  const [isActive, setIsActive] = useState(initialData?.is_photos_active ?? false);

  useEffect(() => {
    setIsActive(initialData?.is_photos_active ?? false);
  }, [initialData]);

  const togglePhotos = async (val: boolean) => {
    setIsActive(val);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, isPhotosActive: val }),
      });
      if (res.ok) onSave();
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <h2 style={{ color: '#d4af37' }}>📸 Galerie Foto Live</h2>
      <div style={{ background: '#111', padding: '30px', borderRadius: '8px', border: '1px solid #d4af3744' }}>
        <label style={{ fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <input type="checkbox" style={{ width: '20px', height: '20px' }} checked={isActive} onChange={e => togglePhotos(e.target.checked)} />
          {isActive ? "Galerie Activă" : "Galerie Inactivă"}
        </label>
        <p style={{ marginTop: '20px', color: '#888' }}>
          Când este activă, invitații vor vedea un buton de încărcare poze.
        </p>
      </div>
    </div>
  );
};