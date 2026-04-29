// "use client";
// import React, { useState } from 'react';

// export default function RsvpForm({ orderId }: { orderId: number }) {
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.currentTarget);
    
//     const payload = {
//       orderId: orderId,
//       guestName: formData.get("guestName"),
//       isComing: formData.get("isComing") === "true",
//       adultsCount: parseInt(formData.get("adultsCount") as string) || 0,
//       kidsCount: parseInt(formData.get("kidsCount") as string) || 0,
//       dietaryPreferences: formData.get("dietary")
//     };

//     try {
//       const res = await fetch("/api/rsvp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (res.ok) setSubmitted(true);
//       else alert("Eroare la trimitere.");
//     } catch (err) {
//       alert("Eroare de rețea.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <div style={{ marginTop: '40px', color: '#4caf50' }}>
//         <h2>Mulțumim! ✅</h2>
//         <p>Răspunsul tău a fost salvat cu succes.</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: '400px', margin: '40px auto', background: '#1a1a1a', padding: '30px', border: '1px solid #d4af3722', textAlign: 'left' }}>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//         <h3 style={{ textAlign: 'center', color: '#fff' }}>CONFIRMĂ PREZENȚA</h3>
        
//         <label style={labelStyle}>NUME COMPLET</label>
//         <input name="guestName" required style={inputStyle} />
        
//         <label style={labelStyle}>VEI VENI?</label>
//         <select name="isComing" style={inputStyle}>
//           <option value="true">DA, confirm prezența!</option>
//           <option value="false">NU, nu pot veni.</option>
//         </select>

//         <div style={{ display: 'flex', gap: '10px' }}>
//           <div style={{ flex: 1 }}>
//             <label style={labelStyle}>ADULȚI</label>
//             <input name="adultsCount" type="number" min="1" defaultValue="1" style={inputStyle} />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={labelStyle}>COPII</label>
//             <input name="kidsCount" type="number" min="0" defaultValue="0" style={inputStyle} />
//           </div>
//         </div>

//         <label style={labelStyle}>MESAJ / PREFERINȚE CULINARE</label>
//         <textarea name="dietary" style={{ ...inputStyle, height: '80px', resize: 'none' }} />

//         <button type="submit" disabled={loading} style={{ 
//           background: '#d4af37', color: 'black', border: 'none', padding: '12px', 
//           fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' 
//         }}>
//           {loading ? "SE TRIMITE..." : "TRIMITE RĂSPUNS"}
//         </button>
//       </form>
//     </div>
//   );
// }

// const labelStyle = { fontSize: '0.7rem', color: '#888' };
// const inputStyle = { background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px', width: '100%', boxSizing: 'border-box' as const };