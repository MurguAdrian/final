"use client";
import React, { useState, useEffect, use } from "react";

export default function PublicInvitation({ params }: { params: Promise<{ slug: string }> }) {
  // Despachetăm slug-ul folosind 'use'
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Rezolvăm eroarea de hidratare: ne asigurăm că componenta s-a montat în browser
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !slug) return;

    async function fetchWedding() {
      try {
        // Cache busting agresiv pentru live
        const res = await fetch(`/api/dashboard/summary?slug=${slug}&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data && data.weddingDetails) {
          setWedding(data.weddingDetails);
        }
      } catch (err) {
        console.error("Eroare Live Fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWedding();
  }, [slug, mounted]);

  // Prevenim randarea pe server pentru a evita "Client-side exception"
  if (!mounted) return <div style={{ background: '#121212', minHeight: '100vh' }} />;

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
      else alert("Eroare la trimitere. Reîncercați.");
    } catch (err) {
      alert("Eroare de rețea.");
    }
  };

  if (loading) return (
    <div style={{ background: '#121212', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', fontFamily: 'serif' }}>
      <p>Se încarcă invitația...</p>
    </div>
  );

  if (!wedding) return (
    <div style={{ background: '#121212', height: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', fontFamily: 'serif' }}>
      <h1 style={{ color: '#d4af37', fontSize: '3rem' }}>404</h1>
      <p>Invitația <strong>{slug}</strong> nu a fost găsită.</p>
      <p style={{ color: '#666' }}>Verifică link-ul sau contactează mirii.</p>
      <a href="/" style={{ color: '#d4af37', marginTop: '20px', textDecoration: 'underline' }}>Înapoi la prima pagină</a>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: '#d4af37', fontFamily: 'serif', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{wedding.bride_name} & {wedding.groom_name}</h1>
      <p style={{ letterSpacing: '3px', opacity: 0.8, textTransform: 'uppercase', fontSize: '0.9rem' }}>Vă invită să le fiți alături</p>
      
      <div style={{ margin: '40px auto', padding: '20px', borderTop: '1px solid #d4af3733', borderBottom: '1px solid #d4af3733', display: 'inline-block' }}>
        <p style={{ margin: 0, fontSize: '1.2rem' }}>Locația: <strong>{wedding.location_name}</strong></p>
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto', background: '#1a1a1a', padding: '40px', border: '1px solid #d4af3722', textAlign: 'left', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ color: '#4caf50', marginBottom: '10px' }}>Mulțumim! ✅</h2>
            <p style={{ color: '#ccc' }}>Răspunsul tău a fost salvat cu succes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ textAlign: 'center', color: '#fff', marginBottom: '10px', letterSpacing: '1px' }}>CONFIRMĂ PREZENȚA</h3>
            
            <div style={inputContainer}>
              <label style={labelStyle}>NUME COMPLET</label>
              <input name="guestName" required placeholder="Ex: Popescu Ionut" style={inputStyle} />
            </div>
            
            <div style={inputContainer}>
              <label style={labelStyle}>VEI VENI?</label>
              <select name="isComing" style={inputStyle}>
                <option value="true">DA, confirm prezența!</option>
                <option value="false">NU, din păcate nu pot ajunge.</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>ADULȚI</label>
                <input name="adultsCount" type="number" min="1" defaultValue="1" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>COPII</label>
                <input name="kidsCount" type="number" min="0" defaultValue="0" style={inputStyle} />
              </div>
            </div>

            <div style={inputContainer}>
              <label style={labelStyle}>MESAJ / PREFERINȚE CULINARE</label>
              <textarea name="dietary" placeholder="Ex: Meniu vegetarian sau alergii..." style={{ ...inputStyle, height: '100px', resize: 'none' }} />
            </div>

            <button type="submit" style={{ background: '#d4af37', color: 'black', border: 'none', padding: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', borderRadius: '4px', fontSize: '1rem', transition: '0.3s' }}>
              TRIMITE RĂSPUNSUL
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputContainer = { display: 'flex', flexDirection: 'column' as const, gap: '5px' };
const labelStyle = { fontSize: '0.7rem', color: '#888', letterSpacing: '1px' };
const inputStyle = { background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', width: '100%', boxSizing: 'border-box' as const, outline: 'none', borderRadius: '4px', fontSize: '0.9rem' };