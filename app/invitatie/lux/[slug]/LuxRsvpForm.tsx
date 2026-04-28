// "use client";
// import React, { useState } from 'react';

// export default function LuxRsvpForm({ orderId }: { orderId: number }) {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
    
//     const payload = {
//       orderId,
//       guestName: formData.get("guestName"),
//       isComing: formData.get("isComing") === "true",
//       partnerName: formData.get("partnerName") || null,
//       kidsCount: parseInt(formData.get("kidsCount") as string) || 0,
//       dietaryPreferences: formData.get("dietary"),
//       needsAccommodation: formData.get("accommodation") === "true",
//     };

//     const res = await fetch("/api/rsvp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) setSubmitted(true);
//   };

//   if (submitted) return <h2 style={{ marginTop: '50px' }}>Vă mulțumim! Prezența este confirmată. ✦</h2>;

//   return (
//     <form onSubmit={handleSubmit} style={{ 
//       marginTop: '60px', textAlign: 'left', background: '#111', padding: '40px', border: '1px solid #d4af3733' 
//     }}>
//       <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>R.S.V.P</h3>
      
//       <div style={group}>
//         <label style={label}>NUME ȘI PRENUME</label>
//         <input name="guestName" required style={input} />
//       </div>

//       <div style={group}>
//         <label style={label}>PARTICIPAȚI?</label>
//         <select name="isComing" style={input}>
//           <option value="true">DA, CU MARE PLĂCERE</option>
//           <option value="false">DIN PĂCATE, NU</option>
//         </select>
//       </div>

//       {/* Putem adăuga restul câmpurilor (copii, partener) cu același stil */}
      
//       <button type="submit" style={{ 
//         width: '100%', padding: '20px', background: '#d4af37', color: '#000', 
//         border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px',
//         textTransform: 'uppercase', letterSpacing: '2px'
//       }}>
//         Trimite Confirmarea
//       </button>
//     </form>
//   );
// }

// const group = { marginBottom: '20px' };
// const label = { display: 'block', fontSize: '0.7rem', color: '#d4af37', marginBottom: '5px', fontWeight: 'bold' };
// const input = { width: '100%', background: 'transparent', border: '1px solid #d4af3744', padding: '12px', color: '#fff', outline: 'none' };

"use client";
import React, { useState } from 'react';

export default function LuxRsvpForm({ orderId }: { orderId: number }) {
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
      kidsCount: parseInt(formData.get("kidsCount") as string) || 0,
      hasKids: parseInt(formData.get("kidsCount") as string) > 0,
      dietaryPreferences: formData.get("dietary"),
      needsAccommodation: formData.get("accommodation") === "true",
    };

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) setSubmitted(true);
  };

  if (submitted) return <h2 style={{ color: '#d4af37', marginTop: '40px' }}>✦ Vă mulțumim! Prezența a fost confirmată. ✦</h2>;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '60px', textAlign: 'left', background: '#111', padding: '40px', border: '1px solid #d4af3733' }}>
      <h3 style={{ textAlign: 'center', color: '#fff', letterSpacing: '4px', marginBottom: '30px' }}>R.S.V.P.</h3>
      
      <div style={group}>
        <label style={label}>NUME ȘI PRENUME</label>
        <input name="guestName" required style={input} />
      </div>

      <div style={group}>
        <label style={label}>VEȚI FI PREZENȚI?</label>
        <select name="isComing" style={input} onChange={e => setIsComing(e.target.value)}>
          <option value="true">DA, CU MARE PLĂCERE</option>
          <option value="false">DIN PĂCATE, NU</option>
        </select>
      </div>

      {isComing === "true" && (
        <>
          <div style={group}><label style={label}>NUME PARTENER (DACĂ E CAZUL)</label><input name="partnerName" style={input} /></div>
          <div style={group}><label style={label}>NUMĂR COPII</label><input name="kidsCount" type="number" defaultValue="0" style={input} /></div>
          <div style={group}><label style={label}>PREFERINȚE CULINARE</label><input name="dietary" placeholder="Ex: Meniu vegetarian" style={input} /></div>
          <div style={group}>
            <label style={label}>AVEȚI NEVOIE DE CAZARE?</label>
            <select name="accommodation" style={input}>
              <option value="false">NU</option>
              <option value="true">DA</option>
            </select>
          </div>
        </>
      )}
      
      <button type="submit" style={btnStyle}>Trimite Confirmarea</button>
    </form>
  );
}

const group = { marginBottom: '20px' };
const label = { display: 'block', fontSize: '0.65rem', color: '#d4af37', marginBottom: '5px', letterSpacing: '1px' };
const input = { width: '100%', background: 'transparent', border: '1px solid #d4af3744', padding: '12px', color: '#fff', outline: 'none' };
const btnStyle = { width: '100%', padding: '18px', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '2px' };