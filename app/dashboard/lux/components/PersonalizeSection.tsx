// "use client";
// import React, { useState } from 'react';

// interface PersonalizeProps {
//   onSave: () => void;
// }

// export const PersonalizeSection = ({ onSave }: PersonalizeProps) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     customSlug: '',
//     brideName: '',
//     groomName: '',
//     locationName: ''
//   });

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/dashboard/personalize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           orderId: 1, // În producție va veni din sesiune
//           ...formData
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Datele au fost salvate cu succes!");
//         onSave(); // Anunțăm părintele că profilul e complet
//       } else {
//         alert(data.error || "Eroare la salvare");
//       }
//     } catch (err) {
//       alert("Eroare de conexiune");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ animation: 'fadeIn 0.5s ease-in', fontFamily: 'serif', maxWidth: '600px' }}>
//       <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: '300', color: '#d4af37' }}>
//         🎨 Personalizează Invitația
//       </h2>
//       <p style={{ color: '#888', marginBottom: '40px' }}>Setează detaliile care vor apărea pe invitația ta digitală.</p>

//       <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
//         {/* LINK PERSONALIZAT */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           <label style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: 'bold' }}>LINK-UL TĂU PERSONALIZAT</label>
//           <div style={{ display: 'flex', alignItems: 'center', background: '#1c1c1c', border: '1px solid #333' }}>
//             <span style={{ padding: '12px', color: '#666', borderRight: '1px solid #333' }}>vibeinvite.ro/</span>
//             <input 
//               required
//               placeholder="ex: nunta-noastra-2026"
//               value={formData.customSlug}
//               onChange={(e) => setFormData({...formData, customSlug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
//               style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '12px', outline: 'none' }}
//             />
//           </div>
//           <small style={{ color: '#555' }}>Fără spații, poți folosi cratimă (-).</small>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>NUME MIREASĂ</label>
//             <input 
//               required
//               style={inputStyle} 
//               value={formData.brideName}
//               onChange={(e) => setFormData({...formData, brideName: e.target.value})}
//             />
//           </div>
//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>NUME MIRE</label>
//             <input 
//               required
//               style={inputStyle} 
//               value={formData.groomName}
//               onChange={(e) => setFormData({...formData, groomName: e.target.value})}
//             />
//           </div>
//         </div>

//         <div style={inputGroupStyle}>
//           <label style={labelStyle}>LOCAȚIA EVENIMENTULUI</label>
//           <input 
//             required
//             placeholder="Numele Restaurantului / Sala"
//             style={inputStyle} 
//             value={formData.locationName}
//             onChange={(e) => setFormData({...formData, locationName: e.target.value})}
//           />
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           style={{ 
//             marginTop: '20px', padding: '15px', background: '#d4af37', color: 'black', 
//             fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' 
//           }}
//         >
//           {loading ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const inputGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '8px' };
// const labelStyle = { color: '#d4af37', fontSize: '0.8rem', fontWeight: 'bold' };
// const inputStyle = { 
//   background: '#1c1c1c', border: '1px solid #333', color: '#fff', padding: '12px', outline: 'none' 
// };
"use client";
import React, { useState, useEffect } from 'react';

export const PersonalizeSection = ({ onSave }: { onSave: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customSlug: '', brideName: '', groomName: '', nasiNames: '',
    parentsNames: '', weddingDate: '', locationName: '',
    wazeUrl: '', googleMapsUrl: '', ourStory: ''
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/dashboard/summary?orderId=1`);
      const data = await res.json();
      if (data.weddingDetails) {
        const d = data.weddingDetails;
        setFormData({
          customSlug: d.custom_slug || '',
          brideName: d.bride_name || '',
          groomName: d.groom_name || '',
          nasiNames: d.nasi_names || '',
          parentsNames: d.parents_names || '',
          weddingDate: d.wedding_date ? d.wedding_date.split('T')[0] : '',
          locationName: d.location_name || '',
          wazeUrl: d.waze_url || '',
          googleMapsUrl: d.google_maps_url || '',
          ourStory: d.our_story || ''
        });
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: 1, ...formData }),
      });
      if (res.ok) { alert("Salvat!"); onSave(); }
    } catch (err) { alert("Eroare!"); } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: '800px', color: '#fff', fontFamily: 'serif' }}>
      <h2 style={{ color: '#d4af37', marginBottom: '30px' }}>Personalizare Invitație Lux</h2>
      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={labelS}>URL PERSONALIZAT (vibeinvite.ro/nume-slug)</label>
          <input style={inputS} value={formData.customSlug} onChange={e => setFormData({...formData, customSlug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
        </div>
        <div><label style={labelS}>MIREASĂ</label><input style={inputS} value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} /></div>
        <div><label style={labelS}>MIRE</label><input style={inputS} value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} /></div>
        <div><label style={labelS}>NAȘI</label><input style={inputS} value={formData.nasiNames} onChange={e => setFormData({...formData, nasiNames: e.target.value})} /></div>
        <div><label style={labelS}>PĂRINȚI</label><input style={inputS} value={formData.parentsNames} onChange={e => setFormData({...formData, parentsNames: e.target.value})} /></div>
        <div><label style={labelS}>DATA NUNȚII</label><input type="date" style={inputS} value={formData.weddingDate} onChange={e => setFormData({...formData, weddingDate: e.target.value})} /></div>
        <div><label style={labelS}>LOCAȚIE</label><input style={inputS} value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})} /></div>
        <div><label style={labelS}>LINK WAZE</label><input style={inputS} value={formData.wazeUrl} onChange={e => setFormData({...formData, wazeUrl: e.target.value})} /></div>
        <div><label style={labelS}>LINK MAPS</label><input style={inputS} value={formData.googleMapsUrl} onChange={e => setFormData({...formData, googleMapsUrl: e.target.value})} /></div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={labelS}>POVESTEA NOASTRĂ</label>
          <textarea style={{...inputS, height: '100px'}} value={formData.ourStory} onChange={e => setFormData({...formData, ourStory: e.target.value})} />
        </div>
        <button type="submit" disabled={loading} style={btnS}>{loading ? "Se salvează..." : "SALVEAZĂ MODIFICĂRILE"}</button>
      </form>
    </div>
  );
};

const labelS = { color: '#d4af37', fontSize: '0.7rem', fontWeight: 'bold' };
const inputS = { width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '10px', marginTop: '5px' };
const btnS = { gridColumn: '1/-1', background: '#d4af37', color: '#000', padding: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer' };