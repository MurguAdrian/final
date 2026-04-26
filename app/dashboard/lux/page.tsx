import React from 'react';

export default function LuxDashboard() {
  return (
    <div style={{ background: '#1a1a1a', color: '#d4af37', minHeight: '100vh', padding: '50px', fontFamily: 'serif' }}>
      <h1>Dashboard Premium - Tema LUX</h1>
      <hr style={{ borderColor: '#d4af37' }} />
      <p style={{ fontSize: '1.2rem' }}>Bună! Aici poți edita invitația ta elegantă.</p>
      <div style={{ marginTop: '30px', border: '1px solid #d4af37', padding: '20px' }}>
        <h3>Setări Invitație</h3>
        <p>Nume Miri: Adrian & Partenera</p>
        <button style={{ padding: '10px 20px', background: '#d4af37', color: 'black', border: 'none', cursor: 'pointer' }}>
          Editează Detalii
        </button>
      </div>
    </div>
  );
}