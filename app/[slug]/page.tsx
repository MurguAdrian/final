"use client";
import React, { useState, useEffect, use } from "react";

export default function PublicInvitation({ params }: { params: Promise<{ slug: string }> }) {
  // Despachetăm slug-ul folosind 'use' (recomandat de Next.js 15 pentru live)
  const { slug } = use(params);
  
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchWedding() {
      try {
        // Punem un timestamp ca să spargem cache-ul browserului pe live
        const res = await fetch(`/api/dashboard/summary?slug=${slug}&t=${Date.now()}`, {
          cache: 'no-store'
        });
        const data = await res.json();

        if (data.weddingDetails) {
          setWedding(data.weddingDetails);
        }
      } catch (err) {
        console.error("Eroare Live Fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWedding();
  }, [slug]);

  // --- LOGICĂ RSVP ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      orderId: wedding.order_id,
      guestName: formData.get("guestName"),
      isComing: formData.get("isComing") === "true",
      adultsCount: parseInt(formData.get("adultsCount") as string) || 0,
      kidsCount: parseInt(formData.get("kidsCount") as string) || 0,
      dietaryPreferences: formData.get("dietary")
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert("Eroare la trimiterea răspunsului.");
    }
  };

  if (loading) return (
    <div style={{ background: '#121212', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37' }}>
      <p>Se încarcă invitația...</p>
    </div>
  );

  if (!wedding) return (
    <div style={{ background: '#121212', height: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#d4af37' }}>404</h1>
      <p>Invitația <strong>{slug}</strong> nu a fost găsită.</p>
      <a href="/" style={{ color: '#d4af37', marginTop: '20px', textDecoration: 'underline' }}>Înapoi la prima pagină</a>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: '#d4af37', fontFamily: 'serif', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem' }}>{wedding.bride_name} & {wedding.groom_name}</h1>
      <p style={{ letterSpacing: '2px', opacity: 0.8 }}>VĂ INVITĂ SĂ LE FIȚI ALĂTURI</p>
      
      <div style={{ margin: '30px auto', padding: '15px', border: '1px solid #d4af3733', display: 'inline-block' }}>
        Locația: <strong>{wedding.location_name}</strong>
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto', background: '#1a1a1a', padding: '30px', border: '1px solid #d4af3722', textAlign: 'left' }}>
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#4caf50' }}>Mulțumim! ✅</h2>
            <p>Răspunsul a fost salvat.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ textAlign: 'center', color: '#fff', marginBottom: '10px' }}>Confirmă Prezența</h3>
            
            <input name="guestName" required placeholder="Numele tău complet" style={inputStyle} />
            
            <select name="isComing" style={inputStyle}>
              <option value="true">Vin cu drag!</option>
              <option value="false">Din păcate, nu pot.</option>
            </select>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input name="adultsCount" type="number" placeholder="Adulți" defaultValue="1" style={inputStyle} />
              <input name="kidsCount" type="number" placeholder="Copii" defaultValue="0" style={inputStyle} />
            </div>

            <textarea name="dietary" placeholder="Preferințe culinare / Mesaj" style={{ ...inputStyle, height: '80px' }} />

            <button type="submit" style={{ background: '#d4af37', color: 'black', border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              TRIMITE RĂSPUNS
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle = { background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', width: '100%', boxSizing: 'border-box' as const, outline: 'none' };