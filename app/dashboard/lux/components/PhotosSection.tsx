"use client";
import React, { useState, useEffect } from 'react';

export const PhotosSection = ({ orderId }: { orderId: number }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/dashboard/summary?orderId=${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setIsActive(data.weddingDetails?.is_photos_active || false);
      }
    }
    load();
  }, [orderId]);

  const toggle = async (val: boolean) => {
    setIsActive(val);
    await fetch('/api/dashboard/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, isPhotosActive: val }),
    });
  };

  return (
    <div>
      <h2 style={{ color: '#d4af37' }}>📸 Galerie Foto Live</h2>
      <p style={{ color: '#888' }}>Permite invitaților să încarce poze în timp real în timpul nunții prin scanarea codului QR.</p>
      
      <div style={{ background: '#111', padding: '30px', borderRadius: '8px', border: '1px solid #d4af3744', marginTop: '20px' }}>
        <label style={{ fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <input type="checkbox" style={{ width: '25px', height: '25px' }} checked={isActive} onChange={e => toggle(e.target.checked)} />
          {isActive ? "MODUL ACTIV" : "MODUL INACTIV"}
        </label>
        
        {isActive && (
          <div style={{ marginTop: '30px', color: '#d4af37' }}>
            <p>✅ Invitații vor vedea butonul de "Încarcă Poze" pe invitație.</p>
            <p>🖼️ Pozele încărcate vor apărea aici (Funcție în curs de implementare...).</p>
          </div>
        )}
      </div>
    </div>
  );
};