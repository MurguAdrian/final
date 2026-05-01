
"use client";
import React, { useState } from 'react';

export default function LuxRsvpForm({ orderId, showAccommodation, showTransport }: any) {
  const [submitted, setSubmitted] = useState(false);
  const [isComing, setIsComing] = useState("true");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const payload = {
    orderId,
    guestName: formData.get("guestName"),
    isComing: isComing === "true",
    partnerName: formData.get("partnerName") || null,
    plusOne: !!formData.get("partnerName"),
    adultsCount: isComing === "true" ? 1 : 0, // Minim 1 adult dacă vine
    kidsCount: parseInt(formData.get("kidsCount") as string) || 0,
    dietaryPreferences: formData.get("dietary") || null,
    needsAccommodation: formData.get("accommodation") === "true",
    needsTransport: formData.get("transport") === "true",
    otherMentions: formData.get("mentions") || null
  };

  await fetch("/api/rsvp", { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(payload) 
  });
  setSubmitted(true);
};

  if (submitted) return <h2>Mulțumim! ✦</h2>;

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'left', background: '#111', padding: '30px', border: '1px solid #d4af3722' }}>
      <h3 style={{ textAlign: 'center' }}>R.S.V.P.</h3>
      <input name="guestName" required placeholder="Nume Complet" style={inputS} />
      <select onChange={e => setIsComing(e.target.value)} style={inputS}>
        <option value="true">VIN CU DRAG</option>
        <option value="false">NU POT</option>
      </select>
      {isComing === "true" && (
        <>
          <input name="partnerName" placeholder="Nume Partener" style={inputS} />
          <input name="kidsCount" type="number" placeholder="Copii" style={inputS} />
          <input name="dietary" placeholder="Preferințe meniu" style={inputS} />
          {showAccommodation && <select name="accommodation" style={inputS}><option value="false">NU AM NEVOIE CAZARE</option><option value="true">DA CAZARE</option></select>}
          {showTransport && <select name="transport" style={inputS}><option value="false">NU TRANSPORT</option><option value="true">DA TRANSPORT</option></select>}
          <textarea name="mentions" placeholder="Alte mențiuni" style={inputS} />
        </>
      )}
      <button type="submit" style={{ width: '100%', background: '#d4af37', padding: '15px' }}>CONFIRMĂ</button>
    </form>
  );
}
const inputS = { width: '100%', background: 'transparent', border: '1px solid #333', color: '#fff', padding: '12px', marginBottom: '10px' };