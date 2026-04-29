
// "use client";
// import React, { useState, useEffect } from 'react';

// export const PersonalizeSection = ({ onSave }: { onSave: () => void }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     customSlug: '', brideName: '', groomName: '', nasiNames: '',
//     parentsNames: '', weddingDate: '', locationName: '',
//     wazeUrl: '', googleMapsUrl: '', ourStory: ''
//   });

//   useEffect(() => {
//     async function load() {
//       const res = await fetch(`/api/dashboard/summary?orderId=1&t=${Date.now()}`);
//       const data = await res.json();
//       if (data.weddingDetails) {
//         const d = data.weddingDetails;
//         setFormData({
//           customSlug: d.custom_slug || '',
//           brideName: d.bride_name || '',
//           groomName: d.groom_name || '',
//           nasiNames: d.nasi_names || '',
//           parentsNames: d.parents_names || '', // Fix aici
//           weddingDate: d.wedding_date ? new Date(d.wedding_date).toISOString().split('T')[0] : '',
//           locationName: d.location_name || '',
//           wazeUrl: d.waze_url || '',
//           googleMapsUrl: d.google_maps_url || '',
//           ourStory: d.our_story || ''
//         });
//       }
//     }
//     load();
//   }, []);

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch('/api/dashboard/personalize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId: 1, ...formData }),
//       });
//       if (res.ok) {
//         alert("Date salvate permanent!");
//         onSave();
//       }
//     } catch (err) {
//       alert("Eroare la comunicarea cu serverul");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '800px', paddingBottom: '100px' }}>
//       <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Setări Invitație</h2>
//       <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//         <div style={{ gridColumn: '1/-1' }}>
//           <label style={labelS}>URL (vibeinvite.ro/test8)</label>
//           <input style={inputS} value={formData.customSlug} onChange={e => setFormData({...formData, customSlug: e.target.value})} />
//         </div>
//         <div><label style={labelS}>MIREASĂ</label><input style={inputS} value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} /></div>
//         <div><label style={labelS}>MIRE</label><input style={inputS} value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} /></div>
//         <div><label style={labelS}>NAȘI</label><input style={inputS} value={formData.nasiNames} onChange={e => setFormData({...formData, nasiNames: e.target.value})} /></div>
//         <div><label style={labelS}>PĂRINȚI</label><input style={inputS} value={formData.parentsNames} onChange={e => setFormData({...formData, parentsNames: e.target.value})} /></div>
//         <div><label style={labelS}>DATA</label><input type="date" style={inputS} value={formData.weddingDate} onChange={e => setFormData({...formData, weddingDate: e.target.value})} /></div>
//         <div><label style={labelS}>LOCAȚIE</label><input style={inputS} value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})} /></div>
//         <div><label style={labelS}>LINK WAZE</label><input style={inputS} value={formData.wazeUrl} onChange={e => setFormData({...formData, wazeUrl: e.target.value})} /></div>
//         <div><label style={labelS}>LINK MAPS</label><input style={inputS} value={formData.googleMapsUrl} onChange={e => setFormData({...formData, googleMapsUrl: e.target.value})} /></div>
//         <div style={{ gridColumn: '1/-1' }}><label style={labelS}>POVESTE</label><textarea style={{...inputS, height: '100px'}} value={formData.ourStory} onChange={e => setFormData({...formData, ourStory: e.target.value})} /></div>
//         <button type="submit" disabled={loading} style={btnS}>{loading ? "SALVARE..." : "SALVEAZĂ MODIFICĂRILE"}</button>
//       </form>
//     </div>
//   );
// };

// const labelS = { color: '#d4af37', fontSize: '0.7rem' };
// const inputS = { width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', marginTop: '5px' };
// const btnS = { gridColumn: '1/-1', background: '#d4af37', color: '#000', padding: '15px', fontWeight: 'bold', cursor: 'pointer', border: 'none' };

"use client";
import React, { useState, useEffect } from 'react';

export const PersonalizeSection = ({ onSave }: { onSave: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customSlug: '', brideName: '', groomName: '', nasiNames: '',
    parentsNames: '', weddingDate: '', locationName: '',
    wazeUrl: '', googleMapsUrl: '', ourStory: '',
    religiousDate: '', religiousLocation: '', religiousWaze: '',
    isReligiousActive: false, isMenuActive: false,
    isAccommodationActive: false, isTransportActive: false,
    contactPhoneBride: '', contactPhoneGroom: ''
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/dashboard/summary?orderId=1&t=${Date.now()}`);
      const data = await res.json();
      if (data.weddingDetails) {
        const d = data.weddingDetails;
        setFormData({
          ...formData,
          ...d,
          weddingDate: d.wedding_date ? d.wedding_date.split('T')[0] : '',
          religiousDate: d.religious_date ? d.religious_date.split('T')[0] : '',
        });
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/dashboard/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: 1, ...formData }),
    });
    alert("Salvat!");
    onSave();
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '900px', paddingBottom: '100px' }}>
      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* SECȚIUNEA 1: DE BAZĂ */}
        <h3 style={{ gridColumn: '1/-1', color: '#d4af37' }}>Informații Generale</h3>
        <input style={inputS} placeholder="Slug (ex: nunta-noastra)" value={formData.customSlug} onChange={e => setFormData({...formData, customSlug: e.target.value})} />
        <input style={inputS} placeholder="Mireasă" value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} />
        <input style={inputS} placeholder="Mire" value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} />
        <input type="date" style={inputS} value={formData.weddingDate} onChange={e => setFormData({...formData, weddingDate: e.target.value})} />

        {/* SECȚIUNEA 2: CUNUNIE RELIGIOASĂ */}
        <div style={{ gridColumn: '1/-1', padding: '20px', border: '1px solid #333' }}>
           <h3 style={{ color: '#d4af37' }}>Cununia Religioasă</h3>
           <label><input type="checkbox" checked={formData.isReligiousActive} onChange={e => setFormData({...formData, isReligiousActive: e.target.checked})} /> Activează pe invitație</label>
           <input style={inputS} placeholder="Locație Biserică" value={formData.religiousLocation} onChange={e => setFormData({...formData, religiousLocation: e.target.value})} />
           <input type="time" style={inputS} value={formData.religiousDate} onChange={e => setFormData({...formData, religiousDate: e.target.value})} />
        </div>

        {/* SECȚIUNEA 3: BIFE OPTIONALE */}
        <div style={{ gridColumn: '1/-1', display: 'flex', gap: '20px' }}>
           <label><input type="checkbox" checked={formData.isMenuActive} onChange={e => setFormData({...formData, isMenuActive: e.target.checked})} /> Meniu</label>
           <label><input type="checkbox" checked={formData.isAccommodationActive} onChange={e => setFormData({...formData, isAccommodationActive: e.target.checked})} /> Cazare</label>
           <label><input type="checkbox" checked={formData.isTransportActive} onChange={e => setFormData({...formData, isTransportActive: e.target.checked})} /> Transport</label>
        </div>

        {/* CONTACT */}
        <input style={inputS} placeholder="Telefon Mireasă" value={formData.contactPhoneBride} onChange={e => setFormData({...formData, contactPhoneBride: e.target.value})} />
        <input style={inputS} placeholder="Telefon Mire" value={formData.contactPhoneGroom} onChange={e => setFormData({...formData, contactPhoneGroom: e.target.value})} />

        <button type="submit" style={btnS}>{loading ? "Salvare..." : "SALVEAZĂ TOATE DATELE"}</button>
      </form>
    </div>
  );
};

const inputS = { width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '10px' };
const btnS = { gridColumn: '1/-1', background: '#d4af37', padding: '15px', fontWeight: 'bold', cursor: 'pointer' };