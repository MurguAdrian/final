"use client";
import React, { useState } from 'react';

interface PersonalizeProps {
  onSave: () => void;
}

export const PersonalizeSection = ({ onSave }: PersonalizeProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customSlug: '',
    brideName: '',
    groomName: '',
    locationName: ''
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: 1, // În producție va veni din sesiune
          ...formData
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Datele au fost salvate cu succes!");
        onSave(); // Anunțăm părintele că profilul e complet
      } else {
        alert(data.error || "Eroare la salvare");
      }
    } catch (err) {
      alert("Eroare de conexiune");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in', fontFamily: 'serif', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: '300', color: '#d4af37' }}>
        🎨 Personalizează Invitația
      </h2>
      <p style={{ color: '#888', marginBottom: '40px' }}>Setează detaliile care vor apărea pe invitația ta digitală.</p>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        {/* LINK PERSONALIZAT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: 'bold' }}>LINK-UL TĂU PERSONALIZAT</label>
          <div style={{ display: 'flex', alignItems: 'center', background: '#1c1c1c', border: '1px solid #333' }}>
            <span style={{ padding: '12px', color: '#666', borderRight: '1px solid #333' }}>vibeinvite.ro/</span>
            <input 
              required
              placeholder="ex: nunta-noastra-2026"
              value={formData.customSlug}
              onChange={(e) => setFormData({...formData, customSlug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '12px', outline: 'none' }}
            />
          </div>
          <small style={{ color: '#555' }}>Fără spații, poți folosi cratimă (-).</small>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>NUME MIREASĂ</label>
            <input 
              required
              style={inputStyle} 
              value={formData.brideName}
              onChange={(e) => setFormData({...formData, brideName: e.target.value})}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>NUME MIRE</label>
            <input 
              required
              style={inputStyle} 
              value={formData.groomName}
              onChange={(e) => setFormData({...formData, groomName: e.target.value})}
            />
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>LOCAȚIA EVENIMENTULUI</label>
          <input 
            required
            placeholder="Numele Restaurantului / Sala"
            style={inputStyle} 
            value={formData.locationName}
            onChange={(e) => setFormData({...formData, locationName: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '20px', padding: '15px', background: '#d4af37', color: 'black', 
            fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' 
          }}
        >
          {loading ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE"}
        </button>
      </form>
    </div>
  );
};

const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
const labelStyle = { color: '#d4af37', fontSize: '0.8rem', fontWeight: 'bold' };
const inputStyle = { 
  background: '#1c1c1c', border: '1px solid #333', color: '#fff', padding: '12px', outline: 'none' 
};