"use client";
import React, { useState, useEffect } from 'react';

export default function UploadPage({ params }: { params: { slug: string } }) {
  const [agreed, setAgreed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/dashboard/summary?slug=${params.slug}`)
      .then(res => res.json())
      .then(data => setOrderId(data.weddingDetails.order_id));
  }, [params.slug]);

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

  return (
    <div style={fullScreen}>
      <div style={modalS}>
        <h2 style={{ color: '#d4af37', marginBottom: '10px' }}>📸 ÎNCARCĂ POZE</h2>
        <p style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '20px' }}>
          Fotografiile sunt destinate exclusiv mirilor și vor fi stocate maximum 30 de zile, după care vor fi șterse automat.
        </p>

        <div style={{ textAlign: 'left', marginBottom: '25px', display: 'flex', gap: '10px' }}>
          <input 
            type="checkbox" 
            id="consent" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ marginTop: '4px' }}
          />
          <label htmlFor="consent" style={{ fontSize: '0.75rem', opacity: 0.8, cursor: 'pointer' }}>
            Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora timp de maximum 30 de zile, exclusiv pentru mirii evenimentului.
          </label>
        </div>

        {agreed ? (
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
        ) : (
          <button style={{ ...uploadLabel, opacity: 0.3, cursor: 'not-allowed' }} disabled>
            SELECTEAZĂ POZE
          </button>
        )}

        <p style={{ marginTop: '30px', fontSize: '0.7rem', opacity: 0.4 }}>VIBE INVITE LUXURY EDITION</p>
      </div>
    </div>
  );
}

const fullScreen = { background: '#000', color: '#fff', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' };
const modalS = { background: '#0a0a0a', padding: '40px 20px', borderRadius: '12px', border: '1px solid #d4af3733', maxWidth: '400px', textAlign: 'center' as any };
const uploadLabel = { background: '#d4af37', color: '#000', padding: '15px 30px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-block', width: '100%', border: 'none' };