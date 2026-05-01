"use client";
import React, { useState, useEffect } from 'react';

export const PersonalizeSection = ({ initialData, orderId, onSave }: any) => {
  const [loading, setLoading] = useState(false);

  // Funcții helper pentru data curentă și limita de +5 ani
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const getMaxDate = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 5); 
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    customSlug: initialData?.custom_slug || '',
    brideName: initialData?.bride_name || '',
    groomName: initialData?.groom_name || '',
    nasiNames: initialData?.nasi_names || '',
    parentsNames: initialData?.parents_names || '',
    weddingDate: initialData?.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
    weddingTime: initialData?.wedding_time || '',
    locationName: initialData?.location_name || '',
    googleMapsUrl: initialData?.google_maps_url || '',
    wazeUrl: initialData?.waze_url || '',
    religiousDate: initialData?.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        customSlug: initialData.custom_slug || '',
        brideName: initialData.bride_name || '',
        groomName: initialData.groom_name || '',
        nasiNames: initialData.nasi_names || '',
        parentsNames: initialData.parents_names || '',
        weddingDate: initialData.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
        weddingTime: initialData.wedding_time || '',
        locationName: initialData.location_name || '',
        googleMapsUrl: initialData.google_maps_url || '',
        wazeUrl: initialData.waze_url || '',
        religiousDate: initialData.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
        religiousTime: initialData.religious_time || '',
        religiousLocation: initialData.religious_location || '',
        religiousWaze: initialData.religious_waze || '',
        ourStory: initialData.our_story || '',
        contactPhoneBride: initialData.contact_phone_bride || '',
        contactPhoneGroom: initialData.contact_phone_groom || '',
        isReligiousActive: initialData.is_religious_active ?? false,
        isAccommodationActive: initialData.is_accommodation_active ?? false,
        isTransportActive: initialData.is_transport_active ?? false,
      });
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
        alert("Personalizare salvată cu succes! ✨");
        onSave();
      } else {
        const errorData = await res.json();
        alert("Eroare: " + (errorData.error || "A apărut o problemă."));
      }
    } catch (e) { 
      alert("Eroare de conexiune la server."); 
    }
    setLoading(false);
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
        {/* SECȚIUNEA MIRI & FAMILIE */}
        <div style={sectionBox}>
          <h3 style={secTitle}>Miri & Familie</h3>
          <input placeholder="Nume Mireasă" style={inpS} value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} />
          <input placeholder="Nume Mire" style={inpS} value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} />
          <input placeholder="Nași" style={inpS} value={formData.nasiNames} onChange={e => setFormData({...formData, nasiNames: e.target.value})} />
          <input placeholder="Părinți" style={inpS} value={formData.parentsNames} onChange={e => setFormData({...formData, parentsNames: e.target.value})} />
        </div>

        {/* SECȚIUNEA RESTAURANT */}
        <div style={sectionBox}>
          <h3 style={secTitle}>Petrecere Restaurant</h3>
          <input 
            type="date" 
            style={inpS} 
            min={getTodayDate()} 
            max={getMaxDate()} 
            value={formData.weddingDate} 
            onChange={e => setFormData({...formData, weddingDate: e.target.value})} 
          />
          <input 
            type="time" 
            style={inpS} 
            step="60" 
            value={formData.weddingTime} 
            onChange={e => setFormData({...formData, weddingTime: e.target.value})} 
          />
          <input placeholder="Nume Restaurant" style={inpS} value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})} />
          <input placeholder="Link Google Maps" style={inpS} value={formData.googleMapsUrl} onChange={e => setFormData({...formData, googleMapsUrl: e.target.value})} />
          <input placeholder="Link Waze" style={inpS} value={formData.wazeUrl} onChange={e => setFormData({...formData, wazeUrl: e.target.value})} />
        </div>
      </div>

      {/* SECȚIUNEA RELIGIE */}
      <div style={{...sectionBox, marginTop: '20px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={secTitle}>⛪ Cununia Religioasă</h3>
          <label style={{ cursor: 'pointer', color: '#d4af37' }}>
            <input type="checkbox" checked={formData.isReligiousActive} onChange={e => setFormData({...formData, isReligiousActive: e.target.checked})} /> Activează
          </label>
        </div>
        
        {/* Input-urile pentru Biserică erau tăiate, le-am repus. */}
        <div style={grid2}>
          <input 
            type="date" 
            style={inpS} 
            min={getTodayDate()} 
            max={getMaxDate()} 
            value={formData.religiousDate} 
            onChange={e => setFormData({...formData, religiousDate: e.target.value})} 
          />
          <input 
            type="time" 
            style={inpS} 
            step="60" 
            value={formData.religiousTime} 
            onChange={e => setFormData({...formData, religiousTime: e.target.value})} 
          />
          <input placeholder="Biserica" style={inpS} value={formData.religiousLocation} onChange={e => setFormData({...formData, religiousLocation: e.target.value})} />
          <input placeholder="Waze Biserică" style={inpS} value={formData.religiousWaze} onChange={e => setFormData({...formData, religiousWaze: e.target.value})} />
        </div>
      </div>

      <div style={grid2}>
        {/* SECȚIUNEA CONTACT */}
        <div style={sectionBox}>
          <h3 style={secTitle}>Contact</h3>
          <input placeholder="Tel Mireasă" style={inpS} value={formData.contactPhoneBride} onChange={e => setFormData({...formData, contactPhoneBride: e.target.value})} />
          <input placeholder="Tel Mire" style={inpS} value={formData.contactPhoneGroom} onChange={e => setFormData({...formData, contactPhoneGroom: e.target.value})} />
        </div>
        
        {/* SECȚIUNEA OPȚIUNI */}
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

const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' };
const sectionBox = { background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333' };
const secTitle = { color: '#d4af37', fontSize: '0.8rem', marginTop: 0, textTransform: 'uppercase' as any };
const inpS = { width: '100%', background: '#000', border: '1px solid #333', color: '#fff', padding: '12px', outline: 'none' };
const labS = { color: '#d4af37', fontSize: '0.7rem', display: 'block', marginBottom: '5px' };
const previewBtn = { padding: '10px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', borderRadius: '4px' };
const saveBtn = { width: '100%', padding: '15px', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '30px' };