
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

export const PersonalizeSection = ({ initialData, orderId, onSave }: any) => {
  const [loading, setLoading] = useState(false);
  // Inițializăm state-ul cu datele primite de la părinte sau cu șiruri goale (ca să nu dea eroare de undefined)
  const [formData, setFormData] = useState({
    customSlug: initialData?.custom_slug || '',
    brideName: initialData?.bride_name || '',
    groomName: initialData?.groom_name || '',
    nasiNames: initialData?.nasi_names || '',
    parentsNames: initialData?.parents_names || '',
    weddingDate: initialData?.wedding_date ? initialData.wedding_date.split('T')[0] : '',
    weddingTime: initialData?.wedding_time || '',
    locationName: initialData?.location_name || '',
    googleMapsUrl: initialData?.google_maps_url || '',
    wazeUrl: initialData?.waze_url || '',
    religiousDate: initialData?.religious_date ? initialData.religious_date.split('T')[0] : '',
    religiousTime: initialData?.religious_time || '',
    religiousLocation: initialData?.religious_location || '',
    religiousWaze: initialData?.religious_waze || '',
    ourStory: initialData?.our_story || '',
    contactPhoneBride: initialData?.contact_phone_bride || '',
    contactPhoneGroom: initialData?.contact_phone_groom || '',
    isReligiousActive: initialData?.is_religious_active ?? false,
    isAccommodationActive: initialData?.is_accommodation_active ?? false,
    isTransportActive: initialData?.is_transport_active ?? false,
  });

  // Dacă datele din părinte se schimbă, actualizăm și aici (Sync)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        customSlug: initialData.custom_slug || '',
        weddingDate: initialData.wedding_date ? initialData.wedding_date.split('T')[0] : '',
        religiousDate: initialData.religious_date ? initialData.religious_date.split('T')[0] : '',
      }));
    }
  }, [initialData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, ...formData }),
      });
      if (res.ok) {
        alert("Sincronizat cu succes în baza de date!");
        onSave(); // Spunem părintelui să facă refresh la date
      }
    } catch (e) { alert("Eroare la salvare"); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSave} style={{ maxWidth: '900px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 style={{ color: '#d4af37', margin: 0 }}>🎨 Personalizare Detalii</h2>
        <a href={`/invitatie/lux/${formData.customSlug}`} target="_blank" style={previewBtn}>PREVIZUALIZARE</a>
      </div>

      <div style={sectionBox}>
         <label style={labS}>URL PERSONALIZAT (ex: nunta-noastra)</label>
         <input style={inpS} value={formData.customSlug} onChange={e => setFormData({...formData, customSlug: e.target.value.toLowerCase().replace(/\s/g, '-')})} />
      </div>

      <div style={grid2}>
        <div style={sectionBox}>
          <h3 style={secTitle}>Miri & Familie</h3>
          <input placeholder="Nume Mireasă" style={inpS} value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} />
          <input placeholder="Nume Mire" style={inpS} value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} />
          <input placeholder="Nași" style={inpS} value={formData.nasiNames} onChange={e => setFormData({...formData, nasiNames: e.target.value})} />
          <input placeholder="Părinți" style={inpS} value={formData.parentsNames} onChange={e => setFormData({...formData, parentsNames: e.target.value})} />
        </div>

        <div style={sectionBox}>
          <h3 style={secTitle}>Petrecere Restaurant</h3>
          <input type="date" style={inpS} value={formData.weddingDate} onChange={e => setFormData({...formData, weddingDate: e.target.value})} />
          <input type="time" style={inpS} value={formData.weddingTime} onChange={e => setFormData({...formData, weddingTime: e.target.value})} />
          <input placeholder="Nume Restaurant" style={inpS} value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})} />
          <input placeholder="Link Google Maps" style={inpS} value={formData.googleMapsUrl} onChange={e => setFormData({...formData, googleMapsUrl: e.target.value})} />
          <input placeholder="Link Waze" style={inpS} value={formData.wazeUrl} onChange={e => setFormData({...formData, wazeUrl: e.target.value})} />
        </div>
      </div>

      <div style={{...sectionBox, marginTop: '20px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={secTitle}>⛪ Cununia Religioasă</h3>
          <label style={{ cursor: 'pointer', color: '#d4af37' }}>
            <input type="checkbox" checked={formData.isReligiousActive} onChange={e => setFormData({...formData, isReligiousActive: e.target.checked})} /> Activează
          </label>
        </div>
        <div style={grid2}>
          <input type="date" style={inpS} value={formData.religiousDate} onChange={e => setFormData({...formData, religiousDate: e.target.value})} />
          <input type="time" style={inpS} value={formData.religiousTime} onChange={e => setFormData({...formData, religiousTime: e.target.value})} />
          <input placeholder="Biserica" style={inpS} value={formData.religiousLocation} onChange={e => setFormData({...formData, religiousLocation: e.target.value})} />
          <input placeholder="Waze Biserică" style={inpS} value={formData.religiousWaze} onChange={e => setFormData({...formData, religiousWaze: e.target.value})} />
        </div>
      </div>

      <div style={grid2}>
        <div style={sectionBox}>
          <h3 style={secTitle}>Contact</h3>
          <input placeholder="Tel Mireasă" style={inpS} value={formData.contactPhoneBride} onChange={e => setFormData({...formData, contactPhoneBride: e.target.value})} />
          <input placeholder="Tel Mire" style={inpS} value={formData.contactPhoneGroom} onChange={e => setFormData({...formData, contactPhoneGroom: e.target.value})} />
        </div>
        <div style={sectionBox}>
          <h3 style={secTitle}>Opțiuni Invitați</h3>
          <label style={{ display: 'block', margin: '5px 0' }}><input type="checkbox" checked={formData.isAccommodationActive} onChange={e => setFormData({...formData, isAccommodationActive: e.target.checked})} /> Cazare</label>
          <label style={{ display: 'block', margin: '5px 0' }}><input type="checkbox" checked={formData.isTransportActive} onChange={e => setFormData({...formData, isTransportActive: e.target.checked})} /> Transport</label>
        </div>
      </div>

      <textarea placeholder="Povestea noastră..." style={{...inpS, height: '100px', marginTop: '20px'}} value={formData.ourStory} onChange={e => setFormData({...formData, ourStory: e.target.value})} />

      <button type="submit" disabled={loading} style={saveBtn}>{loading ? "SINCRONIZARE..." : "SALVEAZĂ TOTUL ÎN BAZA DE DATE"}</button>
    </form>
  );
};

// CSS (n-ai nevoie sa-l modifici daca il ai deja)
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' };
const sectionBox = { background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333' };
const secTitle = { color: '#d4af37', fontSize: '0.8rem', marginTop: 0, textTransform: 'uppercase' as any };
const inpS = { width: '100%', background: '#000', border: '1px solid #333', color: '#fff', padding: '12px', outline: 'none' };
const labS = { color: '#d4af37', fontSize: '0.7rem', display: 'block', marginBottom: '5px' };
const previewBtn = { padding: '10px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', borderRadius: '4px' };
const saveBtn = { width: '100%', padding: '15px', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '30px' };