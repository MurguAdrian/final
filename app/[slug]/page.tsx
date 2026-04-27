"use client";
import { useState, useEffect, ReactNode } from "react";
import React from "react";

export default function PublicInvitation({ params }: { params: { slug: string } }) {
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    guestName: "",
    isComing: true,
    adultsCount: 1,
    kidsCount: 0,
    dietaryPreferences: ""
  });

  // Rezolvăm params.slug pentru a fi siguri că e citit corect
  const unwrappedParams = React.use(params as any) as { slug: string };
  const currentSlug = unwrappedParams.slug;

  useEffect(() => {
    async function fetchWedding() {
      try {
        const res = await fetch(`/api/dashboard/summary?slug=${currentSlug}`);
        const data = await res.json();
        if (data.weddingDetails) {
          setWedding(data.weddingDetails);
        }
      } catch (err) {
        console.error("Eroare fetch invitație:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWedding();
  }, [currentSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: wedding.order_id,
          ...formData
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert("Eroare la trimitere");
    }
  };

  if (loading) return <div style={{background: '#121212', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37'}}>Se încarcă invitația...</div>;
  
  if (!wedding) return (
    <div style={{background: '#121212', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <h1>404</h1>
      <p>Ne pare rău, invitația "{currentSlug}" nu a fost găsită.</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: '#d4af37', fontFamily: 'serif', padding: '60px 20px', textAlign: 'center' }}>
      <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>{wedding.bride_name} & {wedding.groom_name}</h1>
      <p style={{ fontSize: '1.2rem', letterSpacing: '2px', marginBottom: '40px' }}>VĂ INVITĂ SĂ LE FIȚI ALĂTURI</p>
      
      <div style={{border: '1px solid #d4af3733', padding: '20px', display: 'inline-block', marginBottom: '40px'}}>
        <p style={{margin: 0}}>Locația: <strong>{wedding.location_name}</strong></p>
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto', background: '#1c1c1c', padding: '30px', border: '1px solid #d4af3733', textAlign: 'left' }}>
        {submitted ? (
          <div style={{textAlign: 'center', padding: '20px'}}>
            <h2 style={{ color: '#4caf50' }}>Mulțumim! ✅</h2>
            <p>Răspunsul tău a fost înregistrat.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Confirmă Prezența</h3>
            
            <div>
              <label style={{ fontSize: '0.7rem', display: 'block', marginBottom: '5px' }}>NUME COMPLET</label>
              <input required style={inputStyle} value={formData.guestName} onChange={e => setFormData({...formData, guestName: e.target.value})} />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', display: 'block', marginBottom: '5px' }}>VEI VENI?</label>
              <select style={inputStyle} value={formData.isComing ? "true" : "false"} onChange={e => setFormData({...formData, isComing: e.target.value === "true"})}>
                <option value="true">DA, cu mare drag!</option>
                <option value="false">NU, din păcate.</option>
              </select>
            </div>

            {formData.isComing && (
              <>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.7rem', display: 'block', marginBottom: '5px' }}>ADULȚI</label>
                    <input type="number" min="1" style={inputStyle} value={formData.adultsCount} onChange={e => setFormData({...formData, adultsCount: parseInt(e.target.value)})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.7rem', display: 'block', marginBottom: '5px' }}>COPII</label>
                    <input type="number" min="0" style={inputStyle} value={formData.kidsCount} onChange={e => setFormData({...formData, kidsCount: parseInt(e.target.value)})} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', display: 'block', marginBottom: '5px' }}>PREFERINȚE MÂNCARE / OBSERVAȚII</label>
                  <textarea style={{...inputStyle, height: '80px', resize: 'none'}} value={formData.dietaryPreferences} onChange={e => setFormData({...formData, dietaryPreferences: e.target.value})} />
                </div>
              </>
            )}

            <button type="submit" style={{ background: '#d4af37', color: 'black', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: '0.3s' }}>
              TRIMITE RĂSPUNS
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle = { 
  background: '#000', 
  border: '1px solid #333', 
  color: '#fff', 
  padding: '12px', 
  outline: 'none', 
  width: '100%',
  boxSizing: 'border-box' as const
};