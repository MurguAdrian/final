import React from 'react';

export default function NatureDashboard() {
  return (
    <div style={{ background: '#f0fdf4', color: '#166534', minHeight: '100vh', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Nature - Tema NATURE</h1>
      <hr style={{ borderColor: '#166534' }} />
      <p style={{ fontSize: '1.2rem' }}>Bine ai venit! Să personalizăm invitația voastră inspirată din natură.</p>
      <div style={{ marginTop: '30px', border: '1px solid #166534', padding: '20px', background: 'white', borderRadius: '15px' }}>
        <h3>Setări Invitație</h3>
        <p>Locație: Grădina de Vară</p>
        <button style={{ padding: '10px 20px', background: '#166534', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Editează Detalii
        </button>
      </div>
    </div>
  );
}