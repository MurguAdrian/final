"use client";
import React, { useState } from 'react';

export default function UploadPage({ params }: { params: { slug: string } }) {
  const [agreed, setAgreed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  // Luăm orderId-ul nunții pe baza slug-ului la încărcare
  useState(() => {
    fetch(`/api/dashboard/summary?slug=${params.slug}`)
      .then(res => res.json())
      .then(data => setOrderId(data.weddingDetails.order_id));
  });

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !orderId) return;
    setUploading(true);

    const files = Array.from(e.target.files);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId.toString());

      try {
        await fetch("/api/photos/upload", { method: "POST", body: formData });
      } catch (err) { console.error("Eroare la una din poze"); }
    }

    setUploading(false);
    alert("Pozele au fost trimise cu succes mirilor!");
  };

  if (!agreed) {
    return (
      <div style={fullScreen}>
        <div style={modalS}>
          <h2 style={{ color: '#d4af37' }}>📸 Acord Încărcare Poze</h2>
          <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '20px 0' }}>
            Prin continuarea, ești de acord că pozele încărcate vor fi vizibile și descărcabile doar de către miri.
            <br/><br/>
            ● Pozele sunt stocate temporar (7 zile).<br/>
            ● Este interzisă încărcarea de conținut ofensator.<br/>
            ● Doar format foto (fără video).
          </p>
          <button onClick={() => setAgreed(true)} style={btnS}>SUNT DE ACORD</button>
        </div>
      </div>
    );
  }

  return (
    <div style={fullScreen}>
      <h1 style={{ color: '#d4af37', fontSize: '1.5rem' }}>ÎNCARCĂ POZE DE LA NUNTĂ</h1>
      <p style={{ opacity: 0.7, marginBottom: '30px' }}>Pozele apar instant în panoul mirilor.</p>
      
      <label style={uploadLabel}>
        {uploading ? "SE ÎNCARCĂ..." : "SELECTEAZĂ POZE"}
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          disabled={uploading} 
          style={{ display: 'none' }} 
          onChange={handleFile} 
        />
      </label>
      
      <p style={{ marginTop: '40px', fontSize: '0.7rem', opacity: 0.5 }}>VIBE INVITE LUXURY EDITION</p>
    </div>
  );
}

const fullScreen = { background: '#000', color: '#fff', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' as any, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as any, padding: '20px' };
const modalS = { background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #d4af37', maxWidth: '400px' };
const btnS = { background: '#d4af37', color: '#000', border: 'none', padding: '15px 30px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', width: '100%' };
const uploadLabel = { background: '#d4af37', color: '#000', padding: '20px 40px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-block' };