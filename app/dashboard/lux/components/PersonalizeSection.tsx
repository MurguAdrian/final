// // "use client";
// // import React, { useState, useEffect } from 'react';

// // export const PersonalizeSection = ({ initialData, orderId, onSave }: any) => {
// //   const [loading, setLoading] = useState(false);

// //   // Funcții pentru limite de ani
// //   const currentYear = new Date().getFullYear();
// //   const maxYear = currentYear + 5;

// //   const [formData, setFormData] = useState({
// //     customSlug: initialData?.custom_slug || '',
// //     brideName: initialData?.bride_name || '',
// //     groomName: initialData?.groom_name || '',
// //     nasiNames: initialData?.nasi_names || '',
// //     parentsNames: initialData?.parents_names || '',
// //     weddingDate: initialData?.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
// //     weddingTime: initialData?.wedding_time ? initialData.wedding_time.substring(0, 5) : '', // taie secundele dacă vin din DB
// //     locationName: initialData?.location_name || '',
// //     googleMapsUrl: initialData?.google_maps_url || '',
// //     wazeUrl: initialData?.waze_url || '',
// //     religiousDate: initialData?.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
// //     religiousTime: initialData?.religious_time ? initialData.religious_time.substring(0, 5) : '',
// //     religiousLocation: initialData?.religious_location || '',
// //     religiousWaze: initialData?.religious_waze || '',
// //     ourStory: initialData?.our_story || '',
// //     contactPhoneBride: initialData?.contact_phone_bride || '',
// //     contactPhoneGroom: initialData?.contact_phone_groom || '',
// //     isReligiousActive: initialData?.is_religious_active ?? false,
// //     isAccommodationActive: initialData?.is_accommodation_active ?? false,
// //     isTransportActive: initialData?.is_transport_active ?? false,
// //   });

// //   useEffect(() => {
// //     if (initialData) {
// //       setFormData({
// //         customSlug: initialData.custom_slug || '',
// //         brideName: initialData.bride_name || '',
// //         groomName: initialData.groom_name || '',
// //         nasiNames: initialData.nasi_names || '',
// //         parentsNames: initialData.parents_names || '',
// //         weddingDate: initialData.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
// //         weddingTime: initialData.wedding_time ? initialData.wedding_time.substring(0, 5) : '',
// //         locationName: initialData.location_name || '',
// //         googleMapsUrl: initialData.google_maps_url || '',
// //         wazeUrl: initialData.waze_url || '',
// //         religiousDate: initialData.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
// //         religiousTime: initialData.religious_time ? initialData.religious_time.substring(0, 5) : '',
// //         religiousLocation: initialData.religious_location || '',
// //         religiousWaze: initialData.religious_waze || '',
// //         ourStory: initialData.our_story || '',
// //         contactPhoneBride: initialData.contact_phone_bride || '',
// //         contactPhoneGroom: initialData.contact_phone_groom || '',
// //         isReligiousActive: initialData.is_religious_active ?? false,
// //         isAccommodationActive: initialData.is_accommodation_active ?? false,
// //         isTransportActive: initialData.is_transport_active ?? false,
// //       });
// //     }
// //   }, [initialData]);

// //   const handleSave = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const res = await fetch('/api/dashboard/personalize', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ orderId, ...formData }),
// //       });
// //       if (res.ok) {
// //         alert("Personalizare salvată cu succes! ✨");
// //         onSave();
// //       } else {
// //         const errorData = await res.json();
// //         alert("Eroare: " + (errorData.error || "A apărut o problemă."));
// //       }
// //     } catch (e) { 
// //       alert("Eroare de conexiune la server."); 
// //     }
// //     setLoading(false);
// //   };

// //   // --- COMPONENTE CUSTOM PENTRU DATA SI ORA ---

// //   // DatePicker Custom: Afișează dropdown-uri ZI / LUNĂ / AN
// //   const CustomDatePicker = ({ value, onChangeKey }: { value: string, onChangeKey: string }) => {
// //     const [day, month, year] = value ? value.split('-').reverse() : ['', '', ''];

// //     const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
// //       let d = type === 'day' ? val : (day || '01');
// //       let m = type === 'month' ? val : (month || '01');
// //       let y = type === 'year' ? val : (year || currentYear.toString());
      
// //       // Dacă vreun câmp e lăsat gol forțat
// //       if (!val) {
// //         setFormData({ ...formData, [onChangeKey]: '' });
// //         return;
// //       }

// //       setFormData({ ...formData, [onChangeKey]: `${y}-${m}-${d}` });
// //     };

// //     return (
// //       <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
// //         <select style={{...inpS, padding: '12px 5px'}} value={day} onChange={e => handleDateChange('day', e.target.value)}>
// //           <option value="">Zi</option>
// //           {[...Array(31)].map((_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>)}
// //         </select>
// //         <select style={{...inpS, padding: '12px 5px'}} value={month} onChange={e => handleDateChange('month', e.target.value)}>
// //           <option value="">Lună</option>
// //           {['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
// //             <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
// //           ))}
// //         </select>
// //         <select style={{...inpS, padding: '12px 5px'}} value={year} onChange={e => handleDateChange('year', e.target.value)}>
// //           <option value="">An</option>
// //           {[...Array(maxYear - currentYear + 1)].map((_, i) => <option key={i} value={currentYear + i}>{currentYear + i}</option>)}
// //         </select>
// //       </div>
// //     );
// //   };

// //   // TimePicker Custom: Afișează formatul de 24h
// //   const CustomTimePicker = ({ value, onChangeKey }: { value: string, onChangeKey: string }) => {
// //     const [hours, minutes] = value ? value.split(':') : ['', ''];

// //     const handleTimeChange = (type: 'h' | 'm', val: string) => {
// //       let h = type === 'h' ? val : (hours || '12');
// //       let m = type === 'm' ? val : (minutes || '00');
      
// //       if (!val) {
// //          setFormData({ ...formData, [onChangeKey]: '' });
// //          return;
// //       }

// //       setFormData({ ...formData, [onChangeKey]: `${h}:${m}` });
// //     };

// //     return (
// //       <div style={{ display: 'flex', gap: '5px', width: '100%', alignItems: 'center' }}>
// //         <select style={{...inpS, padding: '12px 5px', textAlign: 'center'}} value={hours} onChange={e => handleTimeChange('h', e.target.value)}>
// //           <option value="">Ora</option>
// //           {[...Array(24)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
// //         </select>
// //         <span style={{color: '#d4af37'}}>:</span>
// //         <select style={{...inpS, padding: '12px 5px', textAlign: 'center'}} value={minutes} onChange={e => handleTimeChange('m', e.target.value)}>
// //           <option value="">Min</option>
// //           {[...Array(60)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
// //         </select>
// //       </div>
// //     );
// //   };

// //   return (
// //     <form onSubmit={handleSave} style={{ maxWidth: '900px', paddingBottom: '100px' }}>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
// //         <h2 style={{ color: '#d4af37', margin: 0 }}>🎨 Personalizare Detalii</h2>
// //         <a href={`/invitatie/lux/${formData.customSlug}`} target="_blank" style={previewBtn}>PREVIZUALIZARE</a>
// //       </div>

// //       <div style={sectionBox}>
// //          <label style={labS}>🔗 URL PERSONALIZAT (ex: nunta-noastra)</label>
// //          <div style={{display: 'flex', alignItems: 'center', background: '#000', border: '1px solid #333', borderRadius: '4px', overflow: 'hidden'}}>
// //             <span style={{padding: '12px', color: '#666', background: '#0a0a0a', fontSize: '0.8rem'}}>vibeinvite.ro/</span>
// //             <input style={{...inpS, border: 'none', background: 'transparent'}} value={formData.customSlug} onChange={e => setFormData({...formData, customSlug: e.target.value.toLowerCase().replace(/\s/g, '-')})} placeholder="nunta-andrei-maria" />
// //          </div>
// //       </div>

// //       <div style={grid2}>
// //         <div style={sectionBox}>
// //           <h3 style={secTitle}>Miri & Familie</h3>
// //           <label style={labS}>Nume Mireasă</label>
// //           <input placeholder="ex: Maria" style={inpS} value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} />
// //           <label style={labS}>Nume Mire</label>
// //           <input placeholder="ex: Andrei" style={inpS} value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} />
// //           <label style={labS}>Nași</label>
// //           <input placeholder="ex: Popescu Ion și Elena" style={inpS} value={formData.nasiNames} onChange={e => setFormData({...formData, nasiNames: e.target.value})} />
// //           <label style={labS}>Părinți</label>
// //           <input placeholder="ex: Din partea mirelui... / miresei..." style={inpS} value={formData.parentsNames} onChange={e => setFormData({...formData, parentsNames: e.target.value})} />
// //         </div>

// //         <div style={sectionBox}>
// //           <h3 style={secTitle}>🥂 Petrecere Restaurant</h3>
// //           <label style={labS}>Data Petrecerii</label>
// //           <CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" />
          
// //           <label style={{...labS, marginTop: '10px'}}>Ora Începerii (24h)</label>
// //           <CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" />
          
// //           <label style={{...labS, marginTop: '10px'}}>Locație (Nume Restaurant)</label>
// //           <input placeholder="ex: Restaurant Aristocrat" style={inpS} value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})} />
// //           <label style={labS}>Link Google Maps</label>
// //           <input placeholder="https://maps.app.goo.gl/..." style={inpS} value={formData.googleMapsUrl} onChange={e => setFormData({...formData, googleMapsUrl: e.target.value})} />
// //           <label style={labS}>Link Waze</label>
// //           <input placeholder="https://waze.com/ul/..." style={inpS} value={formData.wazeUrl} onChange={e => setFormData({...formData, wazeUrl: e.target.value})} />
// //         </div>
// //       </div>

// //       <div style={{...sectionBox, marginTop: '20px'}}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>
// //           <h3 style={{...secTitle, margin: 0}}>⛪ Cununia Religioasă</h3>
// //           <label style={{ cursor: 'pointer', color: '#d4af37', fontWeight: 'bold' }}>
// //             <input type="checkbox" checked={formData.isReligiousActive} onChange={e => setFormData({...formData, isReligiousActive: e.target.checked})} /> Activează Afișarea
// //           </label>
// //         </div>
        
// //         {formData.isReligiousActive && (
// //           <div style={grid2}>
// //             <div>
// //               <label style={labS}>Data Cununiei</label>
// //               <CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" />
// //             </div>
// //             <div>
// //               <label style={labS}>Ora (24h)</label>
// //               <CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" />
// //             </div>
// //             <div style={{ gridColumn: 'span 2' }}>
// //               <label style={labS}>Biserica</label>
// //               <input placeholder="ex: Biserica Sf. Maria" style={inpS} value={formData.religiousLocation} onChange={e => setFormData({...formData, religiousLocation: e.target.value})} />
// //             </div>
// //             <div style={{ gridColumn: 'span 2' }}>
// //               <label style={labS}>Waze Biserică</label>
// //               <input placeholder="Link Waze" style={inpS} value={formData.religiousWaze} onChange={e => setFormData({...formData, religiousWaze: e.target.value})} />
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div style={grid2}>
// //         <div style={sectionBox}>
// //           <h3 style={secTitle}>📞 Contact pentru Oaspeți</h3>
// //           <label style={labS}>Telefon Mireasă</label>
// //           <input placeholder="07XX XXX XXX" style={inpS} value={formData.contactPhoneBride} onChange={e => setFormData({...formData, contactPhoneBride: e.target.value})} />
// //           <label style={labS}>Telefon Mire</label>
// //           <input placeholder="07XX XXX XXX" style={inpS} value={formData.contactPhoneGroom} onChange={e => setFormData({...formData, contactPhoneGroom: e.target.value})} />
// //         </div>
        
// //         <div style={sectionBox}>
// //           <h3 style={secTitle}>🏨 Opțiuni RSVP (Formular)</h3>
// //           <p style={{fontSize: '0.7rem', color: '#888', marginBottom: '15px'}}>Bifează dacă vrei ca invitații să specifice aceste detalii când confirmă prezența:</p>
// //           <label style={{ display: 'block', margin: '10px 0', cursor: 'pointer', color: '#ccc' }}>
// //             <input type="checkbox" style={{marginRight: '10px'}} checked={formData.isAccommodationActive} onChange={e => setFormData({...formData, isAccommodationActive: e.target.checked})} /> 
// //             Întreabă dacă au nevoie de Cazare
// //           </label>
// //           <label style={{ display: 'block', margin: '10px 0', cursor: 'pointer', color: '#ccc' }}>
// //             <input type="checkbox" style={{marginRight: '10px'}} checked={formData.isTransportActive} onChange={e => setFormData({...formData, isTransportActive: e.target.checked})} /> 
// //             Întreabă dacă au nevoie de Transport
// //           </label>
// //         </div>
// //       </div>

// //       <div style={{...sectionBox, marginTop: '20px'}}>
// //         <h3 style={secTitle}>📖 Povestea Noastră</h3>
// //         <textarea placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..." style={{...inpS, height: '100px'}} value={formData.ourStory} onChange={e => setFormData({...formData, ourStory: e.target.value})} />
// //       </div>

// //       <button type="submit" disabled={loading} style={saveBtn}>{loading ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE"}</button>
// //     </form>
// //   );
// // };

// // // STILURI RAFINATE
// // const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' };
// // const sectionBox = { background: '#111', padding: '25px', borderRadius: '12px', border: '1px solid #d4af3733', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' };
// // const secTitle = { color: '#d4af37', fontSize: '0.9rem', marginTop: 0, marginBottom: '20px', textTransform: 'uppercase' as any, letterSpacing: '1px', borderBottom: '1px solid #333', paddingBottom: '10px' };
// // const inpS = { width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', outline: 'none', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9rem' };
// // const labS = { color: '#888', fontSize: '0.7rem', display: 'block', marginBottom: '5px', textTransform: 'uppercase' as any };
// // const previewBtn = { padding: '8px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', borderRadius: '4px', fontSize: '0.8rem', transition: 'all 0.3s' };
// // const saveBtn = { width: '100%', padding: '18px', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '30px', borderRadius: '6px', fontSize: '1rem', letterSpacing: '1px', boxShadow: '0 4px 10px rgba(212, 175, 55, 0.2)' };

// "use client";
// import React, { useState, useEffect } from 'react';

// export const PersonalizeSection = ({ initialData, orderId, onSave }: any) => {
//   const [loading, setLoading] = useState(false);

//   const currentYear = new Date().getFullYear();
//   const maxYear = currentYear + 5;

//   const [formData, setFormData] = useState({
//     customSlug: initialData?.custom_slug || '',
//     brideName: initialData?.bride_name || '',
//     groomName: initialData?.groom_name || '',
//     nasiNames: initialData?.nasi_names || '',
//     parentsNames: initialData?.parents_names || '',
//     weddingDate: initialData?.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
//     weddingTime: initialData?.wedding_time ? initialData.wedding_time.substring(0, 5) : '',
//     locationName: initialData?.location_name || '',
//     googleMapsUrl: initialData?.google_maps_url || '',
//     wazeUrl: initialData?.waze_url || '',
//     religiousDate: initialData?.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
//     religiousTime: initialData?.religious_time ? initialData.religious_time.substring(0, 5) : '',
//     religiousLocation: initialData?.religious_location || '',
//     religiousWaze: initialData?.religious_waze || '',
//     ourStory: initialData?.our_story || '',
//     contactPhoneBride: initialData?.contact_phone_bride || '',
//     contactPhoneGroom: initialData?.contact_phone_groom || '',
//     isReligiousActive: initialData?.is_religious_active ?? false,
//     isAccommodationActive: initialData?.is_accommodation_active ?? false,
//     isTransportActive: initialData?.is_transport_active ?? false,
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         customSlug: initialData.custom_slug || '',
//         brideName: initialData.bride_name || '',
//         groomName: initialData.groom_name || '',
//         nasiNames: initialData.nasi_names || '',
//         parentsNames: initialData.parents_names || '',
//         weddingDate: initialData.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
//         weddingTime: initialData.wedding_time ? initialData.wedding_time.substring(0, 5) : '',
//         locationName: initialData.location_name || '',
//         googleMapsUrl: initialData.google_maps_url || '',
//         wazeUrl: initialData.waze_url || '',
//         religiousDate: initialData.religious_date ? new Date(initialData.religious_date).toISOString().split('T')[0] : '',
//         religiousTime: initialData.religious_time ? initialData.religious_time.substring(0, 5) : '',
//         religiousLocation: initialData.religious_location || '',
//         religiousWaze: initialData.religious_waze || '',
//         ourStory: initialData.our_story || '',
//         contactPhoneBride: initialData.contact_phone_bride || '',
//         contactPhoneGroom: initialData.contact_phone_groom || '',
//         isReligiousActive: initialData.is_religious_active ?? false,
//         isAccommodationActive: initialData.is_accommodation_active ?? false,
//         isTransportActive: initialData.is_transport_active ?? false,
//       });
//     }
//   }, [initialData]);

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch('/api/dashboard/personalize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId, ...formData }),
//       });
//       if (res.ok) {
//         alert("Personalizare salvată cu succes! ✨");
//         onSave();
//       } else {
//         const errorData = await res.json();
//         alert("Eroare: " + (errorData.error || "A apărut o problemă."));
//       }
//     } catch (e) {
//       alert("Eroare de conexiune la server.");
//     }
//     setLoading(false);
//   };

//   // --- COMPONENTE CUSTOM PENTRU DATA SI ORA ---

//   const CustomDatePicker = ({ value, onChangeKey }: { value: string, onChangeKey: string }) => {
//     const [day, month, year] = value ? value.split('-').reverse() : ['', '', ''];

//     const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
//       let d = type === 'day' ? val : (day || '01');
//       let m = type === 'month' ? val : (month || '01');
//       let y = type === 'year' ? val : (year || currentYear.toString());

//       if (!val) {
//         setFormData({ ...formData, [onChangeKey]: '' });
//         return;
//       }

//       setFormData({ ...formData, [onChangeKey]: `${y}-${m}-${d}` });
//     };

//     return (
//       <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
//         <select style={selectS} value={day} onChange={e => handleDateChange('day', e.target.value)}>
//           <option value="">Zi</option>
//           {[...Array(31)].map((_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>)}
//         </select>
//         <select style={selectS} value={month} onChange={e => handleDateChange('month', e.target.value)}>
//           <option value="">Lună</option>
//           {['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
//             <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
//           ))}
//         </select>
//         <select style={selectS} value={year} onChange={e => handleDateChange('year', e.target.value)}>
//           <option value="">An</option>
//           {[...Array(maxYear - currentYear + 1)].map((_, i) => <option key={i} value={currentYear + i}>{currentYear + i}</option>)}
//         </select>
//       </div>
//     );
//   };

//   const CustomTimePicker = ({ value, onChangeKey }: { value: string, onChangeKey: string }) => {
//     const [hours, minutes] = value ? value.split(':') : ['', ''];

//     const handleTimeChange = (type: 'h' | 'm', val: string) => {
//       let h = type === 'h' ? val : (hours || '12');
//       let m = type === 'm' ? val : (minutes || '00');

//       if (!val) {
//         setFormData({ ...formData, [onChangeKey]: '' });
//         return;
//       }

//       setFormData({ ...formData, [onChangeKey]: `${h}:${m}` });
//     };

//     return (
//       <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center' }}>
//         <select style={selectS} value={hours} onChange={e => handleTimeChange('h', e.target.value)}>
//           <option value="">Ora</option>
//           {[...Array(24)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
//         </select>
//         <span style={{ color: '#D4AF37', fontSize: '18px', fontWeight: 300, flexShrink: 0, opacity: 0.7 }}>:</span>
//         <select style={selectS} value={minutes} onChange={e => handleTimeChange('m', e.target.value)}>
//           <option value="">Min</option>
//           {[...Array(60)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
//         </select>
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');

//         .ps-input:focus { border-color: rgba(212,175,55,.55) !important; box-shadow: 0 0 0 3px rgba(212,175,55,.08) !important; outline: none !important; }
//         .ps-input::placeholder { color: rgba(212,175,55,.2); }
//         .ps-input option { background: #0A0803; color: #F5E6A8; }
//         .ps-card { transition: box-shadow .25s ease, transform .25s ease; }
//         .ps-card:hover { box-shadow: 0 12px 48px rgba(0,0,0,.6), 0 0 0 1px rgba(212,175,55,.18) !important; }
//         .ps-preview-btn:hover { background: rgba(212,175,55,.14) !important; border-color: rgba(212,175,55,.6) !important; color: #F5D678 !important; }
//         .ps-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.4) !important; }
//         .ps-save-btn:disabled { opacity: .55; cursor: not-allowed; }
//         .ps-toggle:hover { border-color: rgba(212,175,55,.45) !important; background: rgba(212,175,55,.1) !important; }

//         @media (max-width: 700px) {
//           .ps-grid-2 { grid-template-columns: 1fr !important; }
//           .ps-header-row { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; }
//           .ps-rsvp-grid { grid-template-columns: 1fr !important; }
//         }
//         @media (max-width: 480px) {
//           .ps-slug-prefix { display: none !important; }
//         }
//       `}</style>

//       <form onSubmit={handleSave} style={{ maxWidth: '960px', paddingBottom: '120px', fontFamily: "'Lato', sans-serif" }}>

//         {/* ── HEADER ── */}
//         <div className="ps-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', gap: '16px' }}>
//           <div>
//             <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(212,175,55,.5)', marginBottom: '6px' }}>Dashboard</p>
//             <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 300, fontStyle: 'italic', color: '#F5E6A8', margin: 0, letterSpacing: '.02em' }}>
//               Personalizare Detalii
//             </h2>
//           </div>
//           <a
//             href={`/invitatie/lux/${formData.customSlug}`}
//             target="_blank"
//             className="ps-preview-btn"
//             style={{
//               display: 'inline-flex', alignItems: 'center', gap: '8px',
//               padding: '10px 22px', border: '1px solid rgba(212,175,55,.3)',
//               borderRadius: '4px', color: '#D4AF37', textDecoration: 'none',
//               fontFamily: "'Cinzel', serif", fontSize: '10px', fontWeight: 600,
//               letterSpacing: '.18em', textTransform: 'uppercase',
//               background: 'rgba(212,175,55,.06)', transition: 'all .2s',
//               whiteSpace: 'nowrap'
//             }}>
//             <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 13, height: 13 }}>
//               <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
//             </svg>
//             Previzualizare
//           </a>
//         </div>

//         {/* ── DIVIDER ── */}
//         <GoldDividerLine />

//         {/* ── URL PERSONALIZAT ── */}
//         <SectionCard title="🔗 URL Personalizat" subtitle="Adresa publică a invitației tale" style={{ marginTop: '28px' }}>
//           <label style={labS}>Slug personalizat</label>
//           <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(212,175,55,.2)', background: '#080603', transition: 'border-color .2s' }}>
//             <span className="ps-slug-prefix" style={{ padding: '12px 14px', color: 'rgba(212,175,55,.35)', background: 'rgba(212,175,55,.04)', fontSize: '12px', fontFamily: "'Cinzel', serif", letterSpacing: '.06em', borderRight: '1px solid rgba(212,175,55,.12)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
//               vibeinvite.ro/
//             </span>
//             <input
//               className="ps-input"
//               style={{ ...inpS, border: 'none', borderRadius: '0', background: 'transparent', flex: 1, marginBottom: 0 }}
//               value={formData.customSlug}
//               onChange={e => setFormData({ ...formData, customSlug: e.target.value.toLowerCase().replace(/\s/g, '-') })}
//               placeholder="nunta-andrei-maria"
//             />
//           </div>
//           <p style={hintS}>Folosiți doar litere mici, cifre și cratimă.</p>
//         </SectionCard>

//         {/* ── GRID MIRI + RESTAURANT ── */}
//         <div className="ps-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>

//           <SectionCard title="Miri & Familie" icon="💍">
//             <FieldGroup>
//               <label style={labS}>Nume Mireasă</label>
//               <input className="ps-input" placeholder="ex: Maria" style={inpS} value={formData.brideName} onChange={e => setFormData({ ...formData, brideName: e.target.value })} />
//             </FieldGroup>
//             <FieldGroup>
//               <label style={labS}>Nume Mire</label>
//               <input className="ps-input" placeholder="ex: Andrei" style={inpS} value={formData.groomName} onChange={e => setFormData({ ...formData, groomName: e.target.value })} />
//             </FieldGroup>
//             <FieldGroup>
//               <label style={labS}>Nași</label>
//               <input className="ps-input" placeholder="ex: Popescu Ion și Elena" style={inpS} value={formData.nasiNames} onChange={e => setFormData({ ...formData, nasiNames: e.target.value })} />
//             </FieldGroup>
//             <FieldGroup noMargin>
//               <label style={labS}>Părinți</label>
//               <input className="ps-input" placeholder="ex: Din partea mirelui... / miresei..." style={{ ...inpS, marginBottom: 0 }} value={formData.parentsNames} onChange={e => setFormData({ ...formData, parentsNames: e.target.value })} />
//             </FieldGroup>
//           </SectionCard>

//           <SectionCard title="Petrecere Restaurant" icon="🥂">
//             <FieldGroup>
//               <label style={labS}>Data Petrecerii</label>
//               <CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" />
//             </FieldGroup>
//             <FieldGroup>
//               <label style={labS}>Ora Începerii (24h)</label>
//               <CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" />
//             </FieldGroup>
//             <FieldGroup>
//               <label style={labS}>Locație (Nume Restaurant)</label>
//               <input className="ps-input" placeholder="ex: Restaurant Aristocrat" style={inpS} value={formData.locationName} onChange={e => setFormData({ ...formData, locationName: e.target.value })} />
//             </FieldGroup>
//             <FieldGroup>
//               <label style={labS}>Link Google Maps</label>
//               <input className="ps-input" placeholder="https://maps.app.goo.gl/..." style={inpS} value={formData.googleMapsUrl} onChange={e => setFormData({ ...formData, googleMapsUrl: e.target.value })} />
//             </FieldGroup>
//             <FieldGroup noMargin>
//               <label style={labS}>Link Waze</label>
//               <input className="ps-input" placeholder="https://waze.com/ul/..." style={{ ...inpS, marginBottom: 0 }} value={formData.wazeUrl} onChange={e => setFormData({ ...formData, wazeUrl: e.target.value })} />
//             </FieldGroup>
//           </SectionCard>
//         </div>

//         {/* ── CUNUNIA RELIGIOASĂ ── */}
//         <div style={{ ...cardBase, marginTop: '20px', padding: '0' }}>
//           {/* Toggle Header */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: formData.isReligiousActive ? '1px solid rgba(212,175,55,.12)' : 'none' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <span style={{ fontSize: '18px' }}>⛪</span>
//               <div>
//                 <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4AF37', margin: 0 }}>Cununia Religioasă</p>
//                 <p style={{ fontSize: '11px', color: 'rgba(212,175,55,.4)', marginTop: '3px', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>Secțiune opțională</p>
//               </div>
//             </div>
//             <label className="ps-toggle" style={{
//               display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
//               padding: '8px 16px', borderRadius: '100px',
//               border: `1px solid ${formData.isReligiousActive ? 'rgba(212,175,55,.4)' : 'rgba(212,175,55,.18)'}`,
//               background: formData.isReligiousActive ? 'rgba(212,175,55,.12)' : 'rgba(212,175,55,.04)',
//               transition: 'all .2s', userSelect: 'none'
//             }}>
//               <input
//                 type="checkbox"
//                 checked={formData.isReligiousActive}
//                 onChange={e => setFormData({ ...formData, isReligiousActive: e.target.checked })}
//                 style={{ display: 'none' }}
//               />
//               {/* Custom toggle */}
//               <div style={{
//                 width: '32px', height: '18px', borderRadius: '9px',
//                 background: formData.isReligiousActive ? 'linear-gradient(90deg, #8B6914, #D4AF37)' : 'rgba(212,175,55,.15)',
//                 position: 'relative', transition: 'background .2s', flexShrink: 0,
//                 border: '1px solid rgba(212,175,55,.2)'
//               }}>
//                 <div style={{
//                   position: 'absolute', top: '2px',
//                   left: formData.isReligiousActive ? '14px' : '2px',
//                   width: '12px', height: '12px', borderRadius: '50%',
//                   background: formData.isReligiousActive ? '#0A0803' : 'rgba(212,175,55,.5)',
//                   transition: 'left .2s, background .2s'
//                 }} />
//               </div>
//               <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: formData.isReligiousActive ? '#D4AF37' : 'rgba(212,175,55,.45)' }}>
//                 {formData.isReligiousActive ? 'Activă' : 'Inactivă'}
//               </span>
//             </label>
//           </div>

//           {formData.isReligiousActive && (
//             <div style={{ padding: '20px 24px' }}>
//               <div className="ps-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//                 <FieldGroup>
//                   <label style={labS}>Data Cununiei</label>
//                   <CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" />
//                 </FieldGroup>
//                 <FieldGroup>
//                   <label style={labS}>Ora (24h)</label>
//                   <CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" />
//                 </FieldGroup>
//                 <div style={{ gridColumn: 'span 2' }}>
//                   <FieldGroup>
//                     <label style={labS}>Biserica</label>
//                     <input className="ps-input" placeholder="ex: Biserica Sf. Maria" style={inpS} value={formData.religiousLocation} onChange={e => setFormData({ ...formData, religiousLocation: e.target.value })} />
//                   </FieldGroup>
//                 </div>
//                 <div style={{ gridColumn: 'span 2' }}>
//                   <FieldGroup noMargin>
//                     <label style={labS}>Waze Biserică</label>
//                     <input className="ps-input" placeholder="Link Waze" style={{ ...inpS, marginBottom: 0 }} value={formData.religiousWaze} onChange={e => setFormData({ ...formData, religiousWaze: e.target.value })} />
//                   </FieldGroup>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ── CONTACT + RSVP OPTIONS ── */}
//         <div className="ps-rsvp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
//           <SectionCard title="Contact pentru Oaspeți" icon="📞">
//             <FieldGroup>
//               <label style={labS}>Telefon Mireasă</label>
//               <input className="ps-input" placeholder="07XX XXX XXX" style={inpS} value={formData.contactPhoneBride} onChange={e => setFormData({ ...formData, contactPhoneBride: e.target.value })} />
//             </FieldGroup>
//             <FieldGroup noMargin>
//               <label style={labS}>Telefon Mire</label>
//               <input className="ps-input" placeholder="07XX XXX XXX" style={{ ...inpS, marginBottom: 0 }} value={formData.contactPhoneGroom} onChange={e => setFormData({ ...formData, contactPhoneGroom: e.target.value })} />
//             </FieldGroup>
//           </SectionCard>

//           <SectionCard title="Opțiuni RSVP" icon="📋">
//             <p style={{ fontSize: '12px', color: 'rgba(212,175,55,.4)', marginBottom: '18px', lineHeight: '1.7', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
//               Bifează dacă dorești ca invitații să specifice aceste detalii la confirmare:
//             </p>
//             <label style={checkboxLabel}>
//               <div style={{ ...checkboxBox, background: formData.isAccommodationActive ? 'rgba(212,175,55,.25)' : 'transparent', borderColor: formData.isAccommodationActive ? '#D4AF37' : 'rgba(212,175,55,.25)' }}>
//                 {formData.isAccommodationActive && <span style={{ color: '#D4AF37', fontSize: '10px', lineHeight: 1 }}>✓</span>}
//               </div>
//               <input type="checkbox" checked={formData.isAccommodationActive} onChange={e => setFormData({ ...formData, isAccommodationActive: e.target.checked })} style={{ display: 'none' }} />
//               <span style={{ color: 'rgba(245,230,168,.8)', fontSize: '13px', fontFamily: "'Cormorant Garamond', serif" }}>Întreabă dacă au nevoie de Cazare</span>
//             </label>
//             <label style={{ ...checkboxLabel, marginTop: '10px' }}>
//               <div style={{ ...checkboxBox, background: formData.isTransportActive ? 'rgba(212,175,55,.25)' : 'transparent', borderColor: formData.isTransportActive ? '#D4AF37' : 'rgba(212,175,55,.25)' }}>
//                 {formData.isTransportActive && <span style={{ color: '#D4AF37', fontSize: '10px', lineHeight: 1 }}>✓</span>}
//               </div>
//               <input type="checkbox" checked={formData.isTransportActive} onChange={e => setFormData({ ...formData, isTransportActive: e.target.checked })} style={{ display: 'none' }} />
//               <span style={{ color: 'rgba(245,230,168,.8)', fontSize: '13px', fontFamily: "'Cormorant Garamond', serif" }}>Întreabă dacă au nevoie de Transport</span>
//             </label>
//           </SectionCard>
//         </div>

//         {/* ── POVESTEA NOASTRĂ ── */}
//         <SectionCard title="Povestea Noastră" icon="📖" style={{ marginTop: '20px' }}>
//           <label style={labS}>Mesaj pentru invitați</label>
//           <textarea
//             className="ps-input"
//             placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..."
//             style={{ ...inpS, height: '120px', resize: 'vertical', lineHeight: '1.7', marginBottom: 0 }}
//             value={formData.ourStory}
//             onChange={e => setFormData({ ...formData, ourStory: e.target.value })}
//           />
//           <p style={hintS}>Maxim 500 de caractere recomandat.</p>
//         </SectionCard>

//         {/* ── SAVE BUTTON ── */}
//         <div style={{ marginTop: '32px', position: 'relative' }}>
//           <button
//             type="submit"
//             disabled={loading}
//             className="ps-save-btn"
//             style={{
//               width: '100%', padding: '17px 0',
//               background: loading
//                 ? 'rgba(212,175,55,.25)'
//                 : 'linear-gradient(135deg, #8B6914 0%, #D4AF37 45%, #F5D678 55%, #D4AF37 70%, #8B6914 100%)',
//               color: loading ? 'rgba(212,175,55,.6)' : '#0A0803',
//               fontFamily: "'Cinzel', serif", fontSize: '12px', fontWeight: 700,
//               letterSpacing: '.22em', textTransform: 'uppercase',
//               border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer',
//               boxShadow: '0 8px 32px rgba(212,175,55,.25)',
//               transition: 'all .22s', position: 'relative', overflow: 'hidden'
//             }}>
//             {!loading && (
//               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)', backgroundSize: '350px 100%', animation: 'shimmer-ps 3s linear infinite' }} />
//             )}
//             <span style={{ position: 'relative', zIndex: 1 }}>
//               {loading ? '◆  Se salvează...  ◆' : '◆  Salvează Modificările  ◆'}
//             </span>
//           </button>
//           <style>{`@keyframes shimmer-ps{0%{background-position:-350px 0}100%{background-position:350px 0}}`}</style>
//         </div>
//       </form>
//     </>
//   );
// };

// // ── HELPER COMPONENTS ──

// const GoldDividerLine = () => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', marginBottom: '8px' }}>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35))' }} />
//     <svg viewBox="0 0 40 14" width="40" height="14" fill="none">
//       <path d="M3 7 L14 7" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
//       <path d="M26 7 L37 7" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
//       <rect x="15" y="3" width="8" height="8" transform="rotate(45 20 7)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".8" />
//       <circle cx="20" cy="7" r="1.5" fill="#D4AF37" fillOpacity=".7" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.35),transparent)' }} />
//   </div>
// );

// const cardBase: React.CSSProperties = {
//   background: 'linear-gradient(160deg, rgba(26,20,8,.95) 0%, rgba(10,8,3,.98) 100%)',
//   borderRadius: '12px',
//   border: '1px solid rgba(212,175,55,.15)',
//   boxShadow: '0 4px 24px rgba(0,0,0,.5), inset 0 1px 0 rgba(212,175,55,.08)',
//   overflow: 'hidden',
// };

// const SectionCard = ({ title, icon, children, style }: { title: string; icon?: string; children: React.ReactNode; style?: React.CSSProperties; subtitle?: string }) => (
//   <div className="ps-card" style={{ ...cardBase, ...style }}>
//     <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(212,175,55,.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
//       {icon && <span style={{ fontSize: '15px', opacity: .85 }}>{icon}</span>}
//       <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(212,175,55,.75)', margin: 0 }}>{title}</p>
//     </div>
//     <div style={{ padding: '20px' }}>{children}</div>
//   </div>
// );

// const FieldGroup = ({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) => (
//   <div style={{ marginBottom: noMargin ? 0 : '4px' }}>{children}</div>
// );

// // ── STILURI ──

// const inpS: React.CSSProperties = {
//   width: '100%',
//   background: 'rgba(212,175,55,.04)',
//   border: '1px solid rgba(212,175,55,.18)',
//   color: '#F5E6A8',
//   padding: '11px 14px',
//   borderRadius: '6px',
//   marginBottom: '14px',
//   fontSize: '13px',
//   fontFamily: "'Cormorant Garamond', serif",
//   transition: 'border-color .2s, box-shadow .2s',
// };

// const selectS: React.CSSProperties = {
//   ...inpS,
//   flex: 1,
//   padding: '11px 8px',
//   cursor: 'pointer',
//   appearance: 'none' as any,
//   WebkitAppearance: 'none' as any,
//   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23D4AF37' stroke-opacity='.45' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'right 10px center',
//   paddingRight: '28px',
// };

// const labS: React.CSSProperties = {
//   display: 'block',
//   fontFamily: "'Cinzel', serif",
//   fontSize: '8px',
//   fontWeight: 600,
//   letterSpacing: '.24em',
//   textTransform: 'uppercase',
//   color: 'rgba(212,175,55,.5)',
//   marginBottom: '7px',
// };

// const hintS: React.CSSProperties = {
//   fontFamily: "'Cormorant Garamond', serif",
//   fontStyle: 'italic',
//   fontSize: '11px',
//   color: 'rgba(212,175,55,.3)',
//   marginTop: '-10px',
//   marginBottom: '4px',
// };

// const checkboxLabel: React.CSSProperties = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '12px',
//   cursor: 'pointer',
//   userSelect: 'none',
// };

// const checkboxBox: React.CSSProperties = {
//   width: '18px',
//   height: '18px',
//   borderRadius: '4px',
//   border: '1px solid rgba(212,175,55,.25)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   flexShrink: 0,
//   transition: 'all .18s',
// };

"use client";
import React, { useState, useEffect } from 'react';

export const PersonalizeSection = ({ initialData, orderId, onSave }: any) => {
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 5;

  const [formData, setFormData] = useState({
    customSlug: initialData?.custom_slug || '',
    brideName: initialData?.bride_name || '',
    groomName: initialData?.groom_name || '',
    nasiNames: initialData?.nasi_names || '',
    parentsNames: initialData?.parents_names || '',
    weddingDate: initialData?.wedding_date ? new Date(initialData.wedding_date).toISOString().split('T')[0] : '',
    weddingTime: initialData?.wedding_time ? initialData.wedding_time.substring(0, 5) : '',
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

  const CustomDatePicker = ({ value, onChangeKey }: { value: string, onChangeKey: string }) => {
    const [day, month, year] = value ? value.split('-').reverse() : ['', '', ''];

    const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
      let d = type === 'day' ? val : (day || '01');
      let m = type === 'month' ? val : (month || '01');
      let y = type === 'year' ? val : (year || currentYear.toString());

      if (!val) {
        setFormData({ ...formData, [onChangeKey]: '' });
        return;
      }

      setFormData({ ...formData, [onChangeKey]: `${y}-${m}-${d}` });
    };

    return (
      <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
        <select style={selectS} value={day} onChange={e => handleDateChange('day', e.target.value)}>
          <option value="">Zi</option>
          {[...Array(31)].map((_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>)}
        </select>
        <select style={selectS} value={month} onChange={e => handleDateChange('month', e.target.value)}>
          <option value="">Lună</option>
          {['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
            <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
          ))}
        </select>
        <select style={selectS} value={year} onChange={e => handleDateChange('year', e.target.value)}>
          <option value="">An</option>
          {[...Array(maxYear - currentYear + 1)].map((_, i) => <option key={i} value={currentYear + i}>{currentYear + i}</option>)}
        </select>
      </div>
    );
  };

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
      <div style={{ display: 'flex', gap: '6px', width: '100%', alignItems: 'center' }}>
        <select style={selectS} value={hours} onChange={e => handleTimeChange('h', e.target.value)}>
          <option value="">Ora</option>
          {[...Array(24)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
        <span style={{ color: '#D4AF37', fontSize: '16px', fontWeight: 300, flexShrink: 0, opacity: 0.7 }}>:</span>
        <select style={selectS} value={minutes} onChange={e => handleTimeChange('m', e.target.value)}>
          <option value="">Min</option>
          {[...Array(60)].map((_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');

        .ps-input:focus { border-color: rgba(212,175,55,.55) !important; box-shadow: 0 0 0 3px rgba(212,175,55,.08) !important; outline: none !important; }
        .ps-input::placeholder { color: rgba(212,175,55,.2); }
        .ps-input option { background: #0A0803; color: #F5E6A8; }
        .ps-card { transition: box-shadow .25s ease; }
        .ps-card:hover { box-shadow: 0 12px 48px rgba(0,0,0,.6), 0 0 0 1px rgba(212,175,55,.18) !important; }
        .ps-preview-btn:hover { background: rgba(212,175,55,.14) !important; border-color: rgba(212,175,55,.6) !important; color: #F5D678 !important; }
        .ps-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.4) !important; }
        .ps-save-btn:disabled { opacity: .55; cursor: not-allowed; }
        .ps-toggle:hover { border-color: rgba(212,175,55,.45) !important; background: rgba(212,175,55,.1) !important; }

        /* ── Responsive grid ── */
        .ps-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .ps-religious-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .ps-rsvp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 700px) {
          .ps-two-col { grid-template-columns: 1fr !important; }
          .ps-religious-grid { grid-template-columns: 1fr !important; }
          .ps-rsvp-grid { grid-template-columns: 1fr !important; }
          .ps-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .ps-slug-prefix { display: none !important; }
        }
        @media (max-width: 400px) {
          .ps-preview-btn span { display: none; }
        }
      `}</style>

      <form onSubmit={handleSave} style={{ maxWidth: '960px', width: '100%', paddingBottom: '80px', fontFamily: "'Lato', sans-serif" }}>

        {/* HEADER */}
{/* HEADER */}
<div
  className="ps-header-row"
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    gap: '12px'
  }}
>
  <div>
    <p
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '10px',
        letterSpacing: '.32em',
        textTransform: 'uppercase',
        color: 'rgba(212,175,55,.5)',
        marginBottom: '6px'
      }}
    >
      Dashboard
    </p>
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(20px, 4vw, 30px)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: '#F5E6A8',
        margin: 0,
        letterSpacing: '.02em'
      }}
    >
      Personalizare Detalii
    </h2>
  </div>

  <a
    href={`/invitatie/lux/${formData.customSlug}`}
    target="_blank"
    className="ps-preview-btn"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      padding: '9px 18px',
      border: '1px solid rgba(212,175,55,.3)',
      borderRadius: '4px',
      color: '#D4AF37',
      textDecoration: 'none',
      fontFamily: "'Cinzel', serif",
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      background: 'rgba(212,175,55,.06)',
      transition: 'all .2s',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }}
  >
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      style={{ width: 13, height: 13, flexShrink: 0 }}
    >
      <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
    </svg>
    <span>Previzualizare</span>
  </a>
</div>
        <GoldDividerLine />

        {/* URL PERSONALIZAT */}
        <SectionCard title="🔗 URL Personalizat" subtitle="Adresa publică a invitației tale" style={{ marginTop: '24px' }}>
          <label style={labS}>Slug personalizat</label>
          <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(212,175,55,.2)', background: '#080603' }}>
            <span className="ps-slug-prefix" style={{ padding: '11px 12px', color: 'rgba(212,175,55,.35)', background: 'rgba(212,175,55,.04)', fontSize: '12px', fontFamily: "'Cinzel', serif", letterSpacing: '.06em', borderRight: '1px solid rgba(212,175,55,.12)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
              vibeinvite.ro/
            </span>
            <input
              className="ps-input"
              style={{ ...inpS, border: 'none', borderRadius: '0', background: 'transparent', flex: 1, marginBottom: 0, minWidth: 0 }}
              value={formData.customSlug}
              onChange={e => setFormData({ ...formData, customSlug: e.target.value.toLowerCase().replace(/\s/g, '-') })}
              placeholder="nunta-andrei-maria"
            />
          </div>
          <p style={hintS}>Folosiți doar litere mici, cifre și cratimă.</p>
        </SectionCard>

        {/* GRID MIRI + RESTAURANT */}
        <div className="ps-two-col" style={{ marginTop: '16px' }}>

          <SectionCard title="Miri & Familie" icon="💍">
            <FieldGroup>
              <label style={labS}>Nume Mireasă</label>
              <input className="ps-input" placeholder="ex: Maria" style={inpS} value={formData.brideName} onChange={e => setFormData({ ...formData, brideName: e.target.value })} />
            </FieldGroup>
            <FieldGroup>
              <label style={labS}>Nume Mire</label>
              <input className="ps-input" placeholder="ex: Andrei" style={inpS} value={formData.groomName} onChange={e => setFormData({ ...formData, groomName: e.target.value })} />
            </FieldGroup>
            <FieldGroup>
              <label style={labS}>Nași</label>
              <input className="ps-input" placeholder="ex: Popescu Ion și Elena" style={inpS} value={formData.nasiNames} onChange={e => setFormData({ ...formData, nasiNames: e.target.value })} />
            </FieldGroup>
            <FieldGroup noMargin>
              <label style={labS}>Părinți</label>
              <input className="ps-input" placeholder="ex: Din partea mirelui... / miresei..." style={{ ...inpS, marginBottom: 0 }} value={formData.parentsNames} onChange={e => setFormData({ ...formData, parentsNames: e.target.value })} />
            </FieldGroup>
          </SectionCard>

          <SectionCard title="Petrecere Restaurant" icon="🥂">
            <FieldGroup>
              <label style={labS}>Data Petrecerii</label>
              <CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" />
            </FieldGroup>
            <FieldGroup>
              <label style={labS}>Ora Începerii (24h)</label>
              <CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" />
            </FieldGroup>
            <FieldGroup>
              <label style={labS}>Locație (Nume Restaurant)</label>
              <input className="ps-input" placeholder="ex: Restaurant Aristocrat" style={inpS} value={formData.locationName} onChange={e => setFormData({ ...formData, locationName: e.target.value })} />
            </FieldGroup>
            <FieldGroup>
              <label style={labS}>Link Google Maps</label>
              <input className="ps-input" placeholder="https://maps.app.goo.gl/..." style={inpS} value={formData.googleMapsUrl} onChange={e => setFormData({ ...formData, googleMapsUrl: e.target.value })} />
            </FieldGroup>
            <FieldGroup noMargin>
              <label style={labS}>Link Waze</label>
              <input className="ps-input" placeholder="https://waze.com/ul/..." style={{ ...inpS, marginBottom: 0 }} value={formData.wazeUrl} onChange={e => setFormData({ ...formData, wazeUrl: e.target.value })} />
            </FieldGroup>
          </SectionCard>
        </div>

        {/* CUNUNIA RELIGIOASĂ */}
        <div style={{ ...cardBase, marginTop: '16px', padding: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: formData.isReligiousActive ? '1px solid rgba(212,175,55,.12)' : 'none', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>⛪</span>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4AF37', margin: 0 }}>Cununia Religioasă</p>
                <p style={{ fontSize: '11px', color: 'rgba(212,175,55,.4)', marginTop: '3px', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>Secțiune opțională</p>
              </div>
            </div>
            <label className="ps-toggle" style={{
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
              padding: '7px 14px', borderRadius: '100px',
              border: `1px solid ${formData.isReligiousActive ? 'rgba(212,175,55,.4)' : 'rgba(212,175,55,.18)'}`,
              background: formData.isReligiousActive ? 'rgba(212,175,55,.12)' : 'rgba(212,175,55,.04)',
              transition: 'all .2s', userSelect: 'none', flexShrink: 0
            }}>
              <input
                type="checkbox"
                checked={formData.isReligiousActive}
                onChange={e => setFormData({ ...formData, isReligiousActive: e.target.checked })}
                style={{ display: 'none' }}
              />
              <div style={{
                width: '32px', height: '18px', borderRadius: '9px',
                background: formData.isReligiousActive ? 'linear-gradient(90deg, #8B6914, #D4AF37)' : 'rgba(212,175,55,.15)',
                position: 'relative', transition: 'background .2s', flexShrink: 0,
                border: '1px solid rgba(212,175,55,.2)'
              }}>
                <div style={{
                  position: 'absolute', top: '2px',
                  left: formData.isReligiousActive ? '14px' : '2px',
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: formData.isReligiousActive ? '#0A0803' : 'rgba(212,175,55,.5)',
                  transition: 'left .2s, background .2s'
                }} />
              </div>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: formData.isReligiousActive ? '#D4AF37' : 'rgba(212,175,55,.45)', whiteSpace: 'nowrap' }}>
                {formData.isReligiousActive ? 'Activă' : 'Inactivă'}
              </span>
            </label>
          </div>

          {formData.isReligiousActive && (
            <div style={{ padding: '16px 20px' }}>
              <div className="ps-religious-grid">
                <FieldGroup>
                  <label style={labS}>Data Cununiei</label>
                  <CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" />
                </FieldGroup>
                <FieldGroup>
                  <label style={labS}>Ora (24h)</label>
                  <CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" />
                </FieldGroup>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <FieldGroup>
                    <label style={labS}>Biserica</label>
                    <input className="ps-input" placeholder="ex: Biserica Sf. Maria" style={inpS} value={formData.religiousLocation} onChange={e => setFormData({ ...formData, religiousLocation: e.target.value })} />
                  </FieldGroup>
                </div>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <FieldGroup noMargin>
                    <label style={labS}>Waze Biserică</label>
                    <input className="ps-input" placeholder="Link Waze" style={{ ...inpS, marginBottom: 0 }} value={formData.religiousWaze} onChange={e => setFormData({ ...formData, religiousWaze: e.target.value })} />
                  </FieldGroup>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CONTACT + RSVP */}
        <div className="ps-rsvp-grid" style={{ marginTop: '16px' }}>
          <SectionCard title="Contact pentru Oaspeți" icon="📞">
            <FieldGroup>
              <label style={labS}>Telefon Mireasă</label>
              <input className="ps-input" placeholder="07XX XXX XXX" style={inpS} value={formData.contactPhoneBride} onChange={e => setFormData({ ...formData, contactPhoneBride: e.target.value })} />
            </FieldGroup>
            <FieldGroup noMargin>
              <label style={labS}>Telefon Mire</label>
              <input className="ps-input" placeholder="07XX XXX XXX" style={{ ...inpS, marginBottom: 0 }} value={formData.contactPhoneGroom} onChange={e => setFormData({ ...formData, contactPhoneGroom: e.target.value })} />
            </FieldGroup>
          </SectionCard>

          <SectionCard title="Opțiuni RSVP" icon="📋">
            <p style={{ fontSize: '12px', color: 'rgba(212,175,55,.4)', marginBottom: '16px', lineHeight: '1.7', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
              Bifează dacă dorești ca invitații să specifice aceste detalii la confirmare:
            </p>
            <label style={checkboxLabel}>
              <div style={{ ...checkboxBox, background: formData.isAccommodationActive ? 'rgba(212,175,55,.25)' : 'transparent', borderColor: formData.isAccommodationActive ? '#D4AF37' : 'rgba(212,175,55,.25)' }}>
                {formData.isAccommodationActive && <span style={{ color: '#D4AF37', fontSize: '10px', lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isAccommodationActive} onChange={e => setFormData({ ...formData, isAccommodationActive: e.target.checked })} style={{ display: 'none' }} />
              <span style={{ color: 'rgba(245,230,168,.8)', fontSize: '13px', fontFamily: "'Cormorant Garamond', serif" }}>Întreabă dacă au nevoie de Cazare</span>
            </label>
            <label style={{ ...checkboxLabel, marginTop: '10px' }}>
              <div style={{ ...checkboxBox, background: formData.isTransportActive ? 'rgba(212,175,55,.25)' : 'transparent', borderColor: formData.isTransportActive ? '#D4AF37' : 'rgba(212,175,55,.25)' }}>
                {formData.isTransportActive && <span style={{ color: '#D4AF37', fontSize: '10px', lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isTransportActive} onChange={e => setFormData({ ...formData, isTransportActive: e.target.checked })} style={{ display: 'none' }} />
              <span style={{ color: 'rgba(245,230,168,.8)', fontSize: '13px', fontFamily: "'Cormorant Garamond', serif" }}>Întreabă dacă au nevoie de Transport</span>
            </label>
          </SectionCard>
        </div>

        {/* POVESTEA NOASTRĂ */}
        <SectionCard title="Povestea Noastră" icon="📖" style={{ marginTop: '16px' }}>
          <label style={labS}>Mesaj pentru invitați</label>
          <textarea
            className="ps-input"
            placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..."
            style={{ ...inpS, height: '110px', resize: 'vertical', lineHeight: '1.7', marginBottom: 0 }}
            value={formData.ourStory}
            onChange={e => setFormData({ ...formData, ourStory: e.target.value })}
          />
          <p style={hintS}>Maxim 500 de caractere recomandat.</p>
        </SectionCard>

        {/* SAVE */}
        <div style={{ marginTop: '28px', position: 'relative' }}>
          <button
            type="submit"
            disabled={loading}
            className="ps-save-btn"
            style={{
              width: '100%', padding: '16px 0',
              background: loading
                ? 'rgba(212,175,55,.25)'
                : 'linear-gradient(135deg, #8B6914 0%, #D4AF37 45%, #F5D678 55%, #D4AF37 70%, #8B6914 100%)',
              color: loading ? 'rgba(212,175,55,.6)' : '#0A0803',
              fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 700,
              letterSpacing: '.22em', textTransform: 'uppercase',
              border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 32px rgba(212,175,55,.25)',
              transition: 'all .22s', position: 'relative', overflow: 'hidden'
            }}>
            {!loading && (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)', backgroundSize: '350px 100%', animation: 'shimmer-ps 3s linear infinite' }} />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {loading ? '◆  Se salvează...  ◆' : '◆  Salvează Modificările  ◆'}
            </span>
          </button>
          <style>{`@keyframes shimmer-ps{0%{background-position:-350px 0}100%{background-position:350px 0}}`}</style>
        </div>
      </form>
    </>
  );
};

const GoldDividerLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', marginBottom: '8px' }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35))' }} />
    <svg viewBox="0 0 40 14" width="40" height="14" fill="none">
      <path d="M3 7 L14 7" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
      <path d="M26 7 L37 7" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
      <rect x="15" y="3" width="8" height="8" transform="rotate(45 20 7)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".8" />
      <circle cx="20" cy="7" r="1.5" fill="#D4AF37" fillOpacity=".7" />
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.35),transparent)' }} />
  </div>
);

const cardBase: React.CSSProperties = {
  background: 'linear-gradient(160deg, rgba(26,20,8,.95) 0%, rgba(10,8,3,.98) 100%)',
  borderRadius: '12px',
  border: '1px solid rgba(212,175,55,.15)',
  boxShadow: '0 4px 24px rgba(0,0,0,.5), inset 0 1px 0 rgba(212,175,55,.08)',
  overflow: 'hidden',
};

const SectionCard = ({ title, icon, children, style }: { title: string; icon?: string; children: React.ReactNode; style?: React.CSSProperties; subtitle?: string }) => (
  <div className="ps-card" style={{ ...cardBase, ...style }}>
    <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid rgba(212,175,55,.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon && <span style={{ fontSize: '14px', opacity: .85 }}>{icon}</span>}
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(212,175,55,.75)', margin: 0 }}>{title}</p>
    </div>
    <div style={{ padding: '16px 18px' }}>{children}</div>
  </div>
);

const FieldGroup = ({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) => (
  <div style={{ marginBottom: noMargin ? 0 : '4px' }}>{children}</div>
);

const inpS: React.CSSProperties = {
  width: '100%',
  background: 'rgba(212,175,55,.04)',
  border: '1px solid rgba(212,175,55,.18)',
  color: '#F5E6A8',
  padding: '10px 12px',
  borderRadius: '6px',
  marginBottom: '12px',
  fontSize: '13px',
  fontFamily: "'Cormorant Garamond', serif",
  transition: 'border-color .2s, box-shadow .2s',
  minWidth: 0,
  boxSizing: 'border-box',
};

const selectS: React.CSSProperties = {
  ...inpS,
  flex: 1,
  padding: '10px 6px',
  cursor: 'pointer',
  appearance: 'none' as any,
  WebkitAppearance: 'none' as any,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23D4AF37' stroke-opacity='.45' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  paddingRight: '24px',
  minWidth: 0,
};

const labS: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Cinzel', serif",
  fontSize: '8px',
  fontWeight: 600,
  letterSpacing: '.24em',
  textTransform: 'uppercase',
  color: 'rgba(212,175,55,.5)',
  marginBottom: '6px',
};

const hintS: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontSize: '11px',
  color: 'rgba(212,175,55,.3)',
  marginTop: '-8px',
  marginBottom: '4px',
};

const checkboxLabel: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  userSelect: 'none',
};

const checkboxBox: React.CSSProperties = {
  width: '18px',
  height: '18px',
  borderRadius: '4px',
  border: '1px solid rgba(212,175,55,.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all .18s',
};