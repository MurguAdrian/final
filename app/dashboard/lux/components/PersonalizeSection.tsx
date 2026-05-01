"use client";
import React, { useState, useEffect } from 'react';

export const PersonalizeSection = ({ initialData, orderId, onSave }: any) => {
  const [loading, setLoading] = useState(false);

  // Funcții pentru limite de ani
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 5;

  const [formData, setFormData] = useState({
    customSlug: initialData?.custom_slug || '',
    brideName: initialData?.bride_name || '',
    groomName: initialData?.groom_name || '',
    nasiNames: initialData?.nasi_names || '',
    parentsNames: initialData?.parents_names || '',
    weddingDate: initialData?.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
    weddingTime: initialData?.wedding_time ? initialData.wedding_time.substring(0, 5) : '', // taie secundele dacă vin din DB
    locationName: initialData?.location_name || '',
    googleMapsUrl: initialData?.google_maps_url || '',
    wazeUrl: initialData?.waze_url || '',
    religiousDate: initialData?.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
    religiousTime: initialData?.religious_time ? initialData.religious_time.substring(0, 5) : '',
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
        weddingTime: initialData.wedding_time ? initialData.wedding_time.substring(0, 5) : '',
        locationName: initialData.location_name || '',
        googleMapsUrl: initialData.google_maps_url || '',
        wazeUrl: initialData.waze_url || '',
        religiousDate: initialData.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
        religiousTime: initialData.religious_time ? initialData.religious_time.substring(0, 5) : '',
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

  // --- COMPONENTE CUSTOM PENTRU DATA SI ORA ---

  // DatePicker Custom: Afișează dropdown-uri ZI / LUNĂ / AN
  const CustomDatePicker = ({ value, onChangeKey }: { value: string, onChangeKey: string }) => {
    const [day, month, year] = value ? value.split('-').reverse() : ['', '', ''];

    const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
      let d = type === 'day' ? val : (day || '01');
      let m = type === 'month' ? val : (month || '01');
      let y = type === 'year' ? val : (year || currentYear.toString());
      
      // Dacă vreun câmp e lăsat gol forțat
      if (!val) {
        setFormData({ ...formData, [onChangeKey]: '' });
        return;
      }

      setFormData({ ...formData, [onChangeKey]: `${y}-${m}-${d}` });
    };

    return (
      <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
        <select style={{...inpS, padding: '12px 5px'}} value={day} onChange={e => handleDateChange('day', e.target.value)}>
          <option value="">Zi</option>
          {[...Array(31)].map((_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>)}
        </select>
        <select style={{...inpS, padding: '12px 5px'}} value={month} onChange={e => handleDateChange('month', e.target.value)}>
          <option value="">Lună</option>
          {['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
            <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
          ))}
        </select>
        <select style={{...inpS, padding: '12px 5px'}} value={year} onChange={e => handleDateChange('year', e.target.value)}>
          <option value="">An</option>
          {[...Array(maxYear - currentYear + 1)].map((_, i) => <option key={i} value={currentYear + i}>{currentYear + i}</option>)}
        </select>
      </div>
    );
  };

  // TimePicker Custom: Afișează formatul de 24h
  const CustomTimePicker = ({ value, onChangeKey }: { value: string, onChangeKey: string }) => {
    const [hours, minutes] = value ? value.split(':') : ['', ''];

    const handleTimeChange = (type: 'h' | 'm', val: string) => {
      let h = type === 'h' ? val : (hours || '12');
      let m = type === 'm' ? val : (minutes || '00');
      
      if (!val) {
         setFormData({ ...formData, [onChangeKey]: '' });
         return;
      }

      setFormData({ ...formData, [onChangeKey]: `${h}:${m}` });
    };

    return (
      <div style={{ display: 'flex', gap: '5px', width: '100%', alignItems: 'center' }}>
        <select style={{...inpS, padding: '12px 5px', textAlign: 'center'}} value={hours} onChange={e => handleTimeChange('h', e.target.value)}>
          <option value="">Ora</option>
          {[...Array(24)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
        <span style={{color: '#d4af37'}}>:</span>
        <select style={{...inpS, padding: '12px 5px', textAlign: 'center'}} value={minutes} onChange={e => handleTimeChange('m', e.target.value)}>
          <option value="">Min</option>
          {[...Array(60)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={handleSave} style={{ maxWidth: '900px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 style={{ color: '#d4af37', margin: 0 }}>🎨 Personalizare Detalii</h2>
        <a href={`/invitatie/lux/${formData.customSlug}`} target="_blank" style={previewBtn}>PREVIZUALIZARE</a>
      </div>

      <div style={sectionBox}>
         <label style={labS}>🔗 URL PERSONALIZAT (ex: nunta-noastra)</label>
         <div style={{display: 'flex', alignItems: 'center', background: '#000', border: '1px solid #333', borderRadius: '4px', overflow: 'hidden'}}>
            <span style={{padding: '12px', color: '#666', background: '#0a0a0a', fontSize: '0.8rem'}}>vibeinvite.ro/</span>
            <input style={{...inpS, border: 'none', background: 'transparent'}} value={formData.customSlug} onChange={e => setFormData({...formData, customSlug: e.target.value.toLowerCase().replace(/\s/g, '-')})} placeholder="nunta-andrei-maria" />
         </div>
      </div>

      <div style={grid2}>
        <div style={sectionBox}>
          <h3 style={secTitle}>Miri & Familie</h3>
          <label style={labS}>Nume Mireasă</label>
          <input placeholder="ex: Maria" style={inpS} value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} />
          <label style={labS}>Nume Mire</label>
          <input placeholder="ex: Andrei" style={inpS} value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} />
          <label style={labS}>Nași</label>
          <input placeholder="ex: Popescu Ion și Elena" style={inpS} value={formData.nasiNames} onChange={e => setFormData({...formData, nasiNames: e.target.value})} />
          <label style={labS}>Părinți</label>
          <input placeholder="ex: Din partea mirelui... / miresei..." style={inpS} value={formData.parentsNames} onChange={e => setFormData({...formData, parentsNames: e.target.value})} />
        </div>

        <div style={sectionBox}>
          <h3 style={secTitle}>🥂 Petrecere Restaurant</h3>
          <label style={labS}>Data Petrecerii</label>
          <CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" />
          
          <label style={{...labS, marginTop: '10px'}}>Ora Începerii (24h)</label>
          <CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" />
          
          <label style={{...labS, marginTop: '10px'}}>Locație (Nume Restaurant)</label>
          <input placeholder="ex: Restaurant Aristocrat" style={inpS} value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})} />
          <label style={labS}>Link Google Maps</label>
          <input placeholder="https://maps.app.goo.gl/..." style={inpS} value={formData.googleMapsUrl} onChange={e => setFormData({...formData, googleMapsUrl: e.target.value})} />
          <label style={labS}>Link Waze</label>
          <input placeholder="https://waze.com/ul/..." style={inpS} value={formData.wazeUrl} onChange={e => setFormData({...formData, wazeUrl: e.target.value})} />
        </div>
      </div>

      <div style={{...sectionBox, marginTop: '20px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>
          <h3 style={{...secTitle, margin: 0}}>⛪ Cununia Religioasă</h3>
          <label style={{ cursor: 'pointer', color: '#d4af37', fontWeight: 'bold' }}>
            <input type="checkbox" checked={formData.isReligiousActive} onChange={e => setFormData({...formData, isReligiousActive: e.target.checked})} /> Activează Afișarea
          </label>
        </div>
        
        {formData.isReligiousActive && (
          <div style={grid2}>
            <div>
              <label style={labS}>Data Cununiei</label>
              <CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" />
            </div>
            <div>
              <label style={labS}>Ora (24h)</label>
              <CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labS}>Biserica</label>
              <input placeholder="ex: Biserica Sf. Maria" style={inpS} value={formData.religiousLocation} onChange={e => setFormData({...formData, religiousLocation: e.target.value})} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labS}>Waze Biserică</label>
              <input placeholder="Link Waze" style={inpS} value={formData.religiousWaze} onChange={e => setFormData({...formData, religiousWaze: e.target.value})} />
            </div>
          </div>
        )}
      </div>

      <div style={grid2}>
        <div style={sectionBox}>
          <h3 style={secTitle}>📞 Contact pentru Oaspeți</h3>
          <label style={labS}>Telefon Mireasă</label>
          <input placeholder="07XX XXX XXX" style={inpS} value={formData.contactPhoneBride} onChange={e => setFormData({...formData, contactPhoneBride: e.target.value})} />
          <label style={labS}>Telefon Mire</label>
          <input placeholder="07XX XXX XXX" style={inpS} value={formData.contactPhoneGroom} onChange={e => setFormData({...formData, contactPhoneGroom: e.target.value})} />
        </div>
        
        <div style={sectionBox}>
          <h3 style={secTitle}>🏨 Opțiuni RSVP (Formular)</h3>
          <p style={{fontSize: '0.7rem', color: '#888', marginBottom: '15px'}}>Bifează dacă vrei ca invitații să specifice aceste detalii când confirmă prezența:</p>
          <label style={{ display: 'block', margin: '10px 0', cursor: 'pointer', color: '#ccc' }}>
            <input type="checkbox" style={{marginRight: '10px'}} checked={formData.isAccommodationActive} onChange={e => setFormData({...formData, isAccommodationActive: e.target.checked})} /> 
            Întreabă dacă au nevoie de Cazare
          </label>
          <label style={{ display: 'block', margin: '10px 0', cursor: 'pointer', color: '#ccc' }}>
            <input type="checkbox" style={{marginRight: '10px'}} checked={formData.isTransportActive} onChange={e => setFormData({...formData, isTransportActive: e.target.checked})} /> 
            Întreabă dacă au nevoie de Transport
          </label>
        </div>
      </div>

      <div style={{...sectionBox, marginTop: '20px'}}>
        <h3 style={secTitle}>📖 Povestea Noastră</h3>
        <textarea placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..." style={{...inpS, height: '100px'}} value={formData.ourStory} onChange={e => setFormData({...formData, ourStory: e.target.value})} />
      </div>

      <button type="submit" disabled={loading} style={saveBtn}>{loading ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE"}</button>
    </form>
  );
};

// STILURI RAFINATE
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' };
const sectionBox = { background: '#111', padding: '25px', borderRadius: '12px', border: '1px solid #d4af3733', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' };
const secTitle = { color: '#d4af37', fontSize: '0.9rem', marginTop: 0, marginBottom: '20px', textTransform: 'uppercase' as any, letterSpacing: '1px', borderBottom: '1px solid #333', paddingBottom: '10px' };
const inpS = { width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', outline: 'none', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9rem' };
const labS = { color: '#888', fontSize: '0.7rem', display: 'block', marginBottom: '5px', textTransform: 'uppercase' as any };
const previewBtn = { padding: '8px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', borderRadius: '4px', fontSize: '0.8rem', transition: 'all 0.3s' };
const saveBtn = { width: '100%', padding: '18px', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '30px', borderRadius: '6px', fontSize: '1rem', letterSpacing: '1px', boxShadow: '0 4px 10px rgba(212, 175, 55, 0.2)' };