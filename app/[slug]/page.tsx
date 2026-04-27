"use client";
import { useState, useEffect } from "react";

export default function PublicInvitation({ params }: { params: { slug: string } }) {
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  
  // State pentru Formular
  const [formData, setFormData] = useState({
    guestName: "",
    isComing: true,
    adultsCount: 1,
    kidsCount: 0,
    dietaryPreferences: ""
  });

  useEffect(() => {
    async function fetchWedding() {
      const res = await fetch(`/api/dashboard/summary?slug=${params.slug}`); // Refolosim API-ul sau facem unul dedicat
      // Nota: Pentru test, cautam dupa slug direct in baza de date
      const data = await res.json();
      setWedding(data.weddingDetails);
      setLoading(false);
    }
    fetchWedding();
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
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

  if (loading) return <div style={{background: '#121212', height: '100vh'}}></div>;
  if (!wedding) return <div>Invitația nu a fost găsită.</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: '#d4af37', fontFamily: 'serif', padding: '60px 20px', textAlign: 'center' }}>
      <h1>{wedding.bride_name} & {wedding.groom_name}</h1>
      <p style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>VĂ INVITĂ SĂ LE FIȚI ALĂTURI</p>
      <p>Locația: {wedding.location_name}</p>

      <div style={{ maxWidth: '400px', margin: '50px auto', background: '#1c1c1c', padding: '30px', border: '1px solid #d4af3733' }}>
        {submitted ? (
          <h2 style={{ color: '#4caf50' }}>Mulțumim pentru răspuns! ✅</h2>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <h3 style={{ textAlign: 'center' }}>Confirmă Prezența</h3>
            
            <label style={{ fontSize: '0.8rem' }}>NUME COMPLET</label>
            <input required style={inputStyle} value={formData.guestName} onChange={e => setFormData({...formData, guestName: e.target.value})} />

            <label style={{ fontSize: '0.8rem' }}>VEI VENI?</label>
            <select style={inputStyle} value={formData.isComing ? "true" : "false"} onChange={e => setFormData({...formData, isComing: e.target.value === "true"})}>
              <option value="true">DA, cu mare drag!</option>
              <option value="false">NU, din păcate.</option>
            </select>

            {formData.isComing && (
              <>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.7rem' }}>ADULȚI</label>
                    <input type="number" style={inputStyle} value={formData.adultsCount} onChange={e => setFormData({...formData, adultsCount: parseInt(e.target.value)})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.7rem' }}>COPII</label>
                    <input type="number" style={inputStyle} value={formData.kidsCount} onChange={e => setFormData({...formData, kidsCount: parseInt(e.target.value)})} />
                  </div>
                </div>
                <label style={{ fontSize: '0.8rem' }}>PREFERINȚE MÂNCARE / ALLERGII</label>
                <textarea style={inputStyle} value={formData.dietaryPreferences} onChange={e => setFormData({...formData, dietaryPreferences: e.target.value})} />
              </>
            )}

            <button type="submit" style={{ background: '#d4af37', color: 'black', border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              TRIMITE RĂSPUNS
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle = { background: '#000', border: '1px solid #333', color: '#fff', padding: '10px', outline: 'none', width: '100%' };