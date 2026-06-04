// "use client";
// import React, { useState, useEffect } from 'react';

// const R = {
//   navy: '#0B1929', navy2: '#0F2040', royalBg: '#071220',
//   silver: '#C8D8E8', silver2: '#A8BDD0', silver3: '#E8F0F8', silver4: '#6888A8',
//   accent: '#7CA8D8', text: '#E0EAF5', textlt: '#8AAAC8',
// };

// interface PersonalizeSectionProps {
//   initialData: any;
//   orderId: any;
//   onSave: () => void;
// }

// interface FormData {
//   customSlug: string;
//   brideName: string;
//   groomName: string;
//   nasiNames: string;
//   parentsNames: string;
//   weddingDate: string;
//   weddingTime: string;
//   locationName: string;
//   googleMapsUrl: string;
//   wazeUrl: string;
//   religiousDate: string;
//   religiousTime: string;
//   religiousLocation: string;
//   religiousWaze: string;
//   ourStory: string;
//   contactPhoneBride: string;
//   contactPhoneGroom: string;
//   isReligiousActive: boolean;
//   isAccommodationActive: boolean;
//   isTransportActive: boolean;
// }

// export const PersonalizeSection = ({ initialData, orderId, onSave }: PersonalizeSectionProps) => {
//   const [loading, setLoading] = useState(false);

//   const currentYear = new Date().getFullYear();
//   const maxYear = currentYear + 5;

//   const buildForm = (data: any): FormData => ({
//     customSlug: data?.custom_slug || '',
//     brideName: data?.bride_name || '',
//     groomName: data?.groom_name || '',
//     nasiNames: data?.nasi_names || '',
//     parentsNames: data?.parents_names || '',
//     weddingDate: data?.wedding_date ? new Date(data.wedding_date).toISOString().split('T')[0] : '',
//     weddingTime: data?.wedding_time ? data.wedding_time.substring(0, 5) : '',
//     locationName: data?.location_name || '',
//     googleMapsUrl: data?.google_maps_url || '',
//     wazeUrl: data?.waze_url || '',
//     religiousDate: data?.religious_date ? new Date(data.religious_date).toISOString().split('T')[0] : '',
//     religiousTime: data?.religious_time ? data.religious_time.substring(0, 5) : '',
//     religiousLocation: data?.religious_location || '',
//     religiousWaze: data?.religious_waze || '',
//     ourStory: data?.our_story || '',
//     contactPhoneBride: data?.contact_phone_bride || '',
//     contactPhoneGroom: data?.contact_phone_groom || '',
//     isReligiousActive: data?.is_religious_active ?? false,
//     isAccommodationActive: data?.is_accommodation_active ?? false,
//     isTransportActive: data?.is_transport_active ?? false,
//   });

//   const [formData, setFormData] = useState<FormData>(() => buildForm(initialData));

//   useEffect(() => {
//     if (initialData) setFormData(buildForm(initialData));
//   }, [initialData]);

//   const set = (key: keyof FormData, value: any) =>
//     setFormData(prev => ({ ...prev, [key]: value }));

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
//         alert('Personalizare salvată cu succes! ✨');
//         onSave();
//       } else {
//         const err = await res.json();
//         alert('Eroare: ' + (err.error || 'A apărut o problemă.'));
//       }
//     } catch {
//       alert('Eroare de conexiune la server.');
//     }
//     setLoading(false);
//   };

//   const CustomDatePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
//     const parts = value ? value.split('-') : ['', '', ''];
//     const year = parts[0];
//     const month = parts[1];
//     const day = parts[2];

//     const handleChange = (type: 'day' | 'month' | 'year', val: string) => {
//       if (!val) { set(onChangeKey, ''); return; }
//       const d = type === 'day'   ? val : (day   || '01');
//       const m = type === 'month' ? val : (month || '01');
//       const y = type === 'year'  ? val : (year  || String(currentYear));
//       set(onChangeKey, `${y}-${m}-${d}`);
//     };

//     return (
//       <div style={{ display: 'flex', gap: 6, width: '100%' }}>
//         <select className="ps-input ps-select" value={day} onChange={e => handleChange('day', e.target.value)}>
//           <option value="">Zi</option>
//           {Array.from({ length: 31 }, (_, i) => (
//             <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
//           ))}
//         </select>
//         <select className="ps-input ps-select" value={month} onChange={e => handleChange('month', e.target.value)}>
//           <option value="">Lună</option>
//           {['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
//             <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
//           ))}
//         </select>
//         <select className="ps-input ps-select" value={year} onChange={e => handleChange('year', e.target.value)}>
//           <option value="">An</option>
//           {Array.from({ length: maxYear - currentYear + 1 }, (_, i) => (
//             <option key={i} value={String(currentYear + i)}>{currentYear + i}</option>
//           ))}
//         </select>
//       </div>
//     );
//   };

//   const CustomTimePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
//     const [hours, minutes] = value ? value.split(':') : ['', ''];

//     const handleChange = (type: 'h' | 'm', val: string) => {
//       if (!val) { set(onChangeKey, ''); return; }
//       const h = type === 'h' ? val : (hours   || '12');
//       const m = type === 'm' ? val : (minutes || '00');
//       set(onChangeKey, `${h}:${m}`);
//     };

//     return (
//       <div style={{ display: 'flex', gap: 6, width: '100%', alignItems: 'center' }}>
//         <select className="ps-input ps-select" value={hours} onChange={e => handleChange('h', e.target.value)}>
//           <option value="">Ora</option>
//           {Array.from({ length: 24 }, (_, i) => (
//             <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
//           ))}
//         </select>
//         <span style={{ color: R.silver, fontSize: 16, fontWeight: 300, flexShrink: 0, opacity: 0.7 }}>:</span>
//         <select className="ps-input ps-select" value={minutes} onChange={e => handleChange('m', e.target.value)}>
//           <option value="">Min</option>
//           {Array.from({ length: 60 }, (_, i) => (
//             <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
//           ))}
//         </select>
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }

//         .ps-input { font-size: 16px !important; -webkit-text-size-adjust: 100%; }
//         .ps-wrap { overscroll-behavior: contain; -webkit-overflow-scrolling: auto; }

//         .ps-input {
//           width: 100%;
//           background: rgba(15,32,64,.5);
//           border: 1px solid rgba(200,216,232,.18);
//           color: ${R.silver3};
//           padding: 10px 12px;
//           border-radius: 6px;
//           margin-bottom: 12px;
//           font-family: 'Cormorant Garamond', serif;
//           transition: border-color .2s, box-shadow .2s;
//           min-width: 0;
//           -webkit-appearance: none;
//           appearance: none;
//         }
//         .ps-input:focus {
//           border-color: rgba(200,216,232,.55) !important;
//           box-shadow: 0 0 0 3px rgba(124,168,216,.08) !important;
//           outline: none !important;
//         }
//         .ps-input::placeholder { color: rgba(200,216,232,.2); }
//         .ps-input option { background: #0F2040; color: ${R.silver3}; }

//         .ps-select {
//           flex: 1;
//           padding: 10px 24px 10px 10px !important;
//           cursor: pointer;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23A8BDD0' stroke-opacity='.55' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 8px center;
//           background-color: rgba(15,32,64,.5);
//         }

//         .ps-card { transition: box-shadow .25s ease; }
//         .ps-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.4), 0 0 0 1px rgba(200,216,232,.18) !important; }
//         .ps-preview-btn { transition: all .2s ease; }
//         .ps-preview-btn:hover { background: rgba(124,168,216,.14) !important; border-color: rgba(200,216,232,.55) !important; color: ${R.silver3} !important; }
//         .ps-save-btn { transition: all .22s; }
//         .ps-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(124,168,216,.25) !important; }
//         .ps-save-btn:disabled { opacity: .55; cursor: not-allowed; }
//         .ps-toggle { transition: all .2s; }
//         .ps-toggle:hover { border-color: rgba(200,216,232,.4) !important; background: rgba(124,168,216,.1) !important; }

//         .ps-wrap { width: 100%; max-width: 960px; box-sizing: border-box; overflow-x: hidden; }
//         .ps-two-col       { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
//         .ps-religious-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
//         .ps-rsvp-grid     { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

//         @media (max-width: 700px) {
//           .ps-two-col        { grid-template-columns: 1fr !important; }
//           .ps-religious-grid { grid-template-columns: 1fr !important; }
//           .ps-rsvp-grid      { grid-template-columns: 1fr !important; }
//           .ps-slug-prefix    { display: none !important; }
//         }
//         @media (max-width: 400px) {
//           .ps-span-full { grid-column: span 1 !important; }
//         }

//         @keyframes shimmer-ps {
//           0%   { background-position: -350px 0 }
//           100% { background-position:  350px 0 }
//         }
//       `}</style>

//       <form onSubmit={handleSave} className="ps-wrap" style={{ paddingBottom: 80, fontFamily: "'Lato', sans-serif" }}>

//         {/* ── HEADER ── */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28, width: '100%' }}>
//           <div>
//             <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase', color: R.silver4, marginBottom: 6 }}>
//               Dashboard
//             </p>
//             <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,5vw,30px)', fontWeight: 300, fontStyle: 'italic', color: R.silver3, margin: 0, letterSpacing: '.02em', lineHeight: 1.2 }}>
//               Personalizare Detalii
//             </h2>
//           </div>

//           <a
//             href={`/invitatie/royal/${formData.customSlug}`}
//             target="_blank"
//             rel="noreferrer"
//             className="ps-preview-btn"
//             style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 18px', border: `1px solid rgba(200,216,232,.3)`, borderRadius: 6, color: R.silver, textDecoration: 'none', fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', background: `rgba(124,168,216,.06)`, whiteSpace: 'nowrap', width: '100%' }}
//           >
//             <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14, flexShrink: 0 }}>
//               <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
//               <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
//             </svg>
//             <span>Previzualizare</span>
//           </a>
//         </div>

//         <GoldDividerLine />

//         {/* ── URL PERSONALIZAT ── */}
//         <SectionCard title="🔗 URL Personalizat" style={{ marginTop: 24 }}>
//           <label style={labS}>Slug personalizat</label>
//           <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 6, overflow: 'hidden', border: `1px solid rgba(200,216,232,.2)`, background: R.navy }}>
//             <span className="ps-slug-prefix" style={{ padding: '11px 12px', color: R.silver4, background: `rgba(124,168,216,.06)`, fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: '.06em', borderRight: `1px solid rgba(200,216,232,.12)`, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
//               www.vibeinvite.ro/
//             </span>
//             <input
//               className="ps-input"
//               style={{ border: 'none', borderRadius: 0, background: 'transparent', flex: 1, marginBottom: 0, minWidth: 0 }}
//               value={formData.customSlug}
//               onChange={e => set('customSlug', e.target.value.toLowerCase().replace(/\s/g, '-'))}
//               placeholder="nunta-andrei-maria"
//               autoCapitalize="none"
//               autoCorrect="off"
//             />
//           </div>
//           <p style={hintS}>Folosiți doar litere mici, cifre și cratimă.</p>
//         </SectionCard>

//         {/* ── MIRI + RESTAURANT ── */}
//         <div className="ps-two-col" style={{ marginTop: 16 }}>
//           <SectionCard title="Miri & Familie" icon="💍">
//             <FG>
//               <label style={labS}>Nume Mireasă</label>
//               <input className="ps-input" placeholder="ex: Maria" value={formData.brideName} onChange={e => set('brideName', e.target.value)} />
//             </FG>
//             <FG>
//               <label style={labS}>Nume Mire</label>
//               <input className="ps-input" placeholder="ex: Andrei" value={formData.groomName} onChange={e => set('groomName', e.target.value)} />
//             </FG>
//             <FG>
//               <label style={labS}>Nași</label>
//               <input className="ps-input" placeholder="ex: Popescu Ion și Elena" value={formData.nasiNames} onChange={e => set('nasiNames', e.target.value)} />
//             </FG>
//             <FG noMargin>
//               <label style={labS}>Părinți</label>
//               <input className="ps-input" style={{ marginBottom: 0 }} placeholder="ex: Din partea mirelui..." value={formData.parentsNames} onChange={e => set('parentsNames', e.target.value)} />
//             </FG>
//           </SectionCard>

//           <SectionCard title="Petrecere Restaurant" icon="🥂">
//             <FG>
//               <label style={labS}>Data Petrecerii</label>
//               <CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" />
//             </FG>
//             <FG>
//               <label style={labS}>Ora Începerii (24h)</label>
//               <CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" />
//             </FG>
//             <FG>
//               <label style={labS}>Locație (Nume Restaurant)</label>
//               <input className="ps-input" placeholder="ex: Restaurant Aristocrat" value={formData.locationName} onChange={e => set('locationName', e.target.value)} />
//             </FG>
//             <FG>
//               <label style={labS}>Link Google Maps</label>
//               <input className="ps-input" placeholder="https://maps.app.goo.gl/..." value={formData.googleMapsUrl} onChange={e => set('googleMapsUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" />
//             </FG>
//             <FG noMargin>
//               <label style={labS}>Link Waze</label>
//               <input className="ps-input" style={{ marginBottom: 0 }} placeholder="https://waze.com/ul/..." value={formData.wazeUrl} onChange={e => set('wazeUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" />
//             </FG>
//           </SectionCard>
//         </div>

//         {/* ── CUNUNIA RELIGIOASĂ ── */}
//         <div style={{ ...cardBase, marginTop: 16, padding: 0 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: formData.isReligiousActive ? `1px solid rgba(200,216,232,.12)` : 'none', flexWrap: 'wrap', gap: 10 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <span style={{ fontSize: 16 }}>⛪</span>
//               <div>
//                 <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: R.silver, margin: 0 }}>Cununia Religioasă</p>
//                 <p style={{ fontSize: 11, color: R.silver4, marginTop: 3, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginBottom: 0 }}>Secțiune opțională</p>
//               </div>
//             </div>
//             <label
//               className="ps-toggle"
//               style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '7px 14px', borderRadius: 100, border: `1px solid ${formData.isReligiousActive ? `rgba(200,216,232,.4)` : `rgba(200,216,232,.18)`}`, background: formData.isReligiousActive ? `rgba(124,168,216,.12)` : `rgba(124,168,216,.04)`, userSelect: 'none', flexShrink: 0 }}
//             >
//               <input type="checkbox" checked={formData.isReligiousActive} onChange={e => set('isReligiousActive', e.target.checked)} style={{ display: 'none' }} />
//               <div style={{ width: 32, height: 18, borderRadius: 9, background: formData.isReligiousActive ? `linear-gradient(90deg,${R.navy2},${R.accent})` : `rgba(200,216,232,.15)`, position: 'relative', transition: 'background .2s', flexShrink: 0, border: `1px solid rgba(200,216,232,.2)` }}>
//                 <div style={{ position: 'absolute', top: 2, left: formData.isReligiousActive ? 14 : 2, width: 12, height: 12, borderRadius: '50%', background: formData.isReligiousActive ? '#fff' : `rgba(200,216,232,.5)`, transition: 'left .2s, background .2s' }} />
//               </div>
//               <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: formData.isReligiousActive ? R.silver : R.silver4, whiteSpace: 'nowrap' }}>
//                 {formData.isReligiousActive ? 'Activă' : 'Inactivă'}
//               </span>
//             </label>
//           </div>

//           {formData.isReligiousActive && (
//             <div style={{ padding: '16px 20px' }}>
//               <div className="ps-religious-grid">
//                 <FG>
//                   <label style={labS}>Data Cununiei</label>
//                   <CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" />
//                 </FG>
//                 <FG>
//                   <label style={labS}>Ora (24h)</label>
//                   <CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" />
//                 </FG>
//                 <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
//                   <FG>
//                     <label style={labS}>Biserica</label>
//                     <input className="ps-input" placeholder="ex: Biserica Sf. Maria" value={formData.religiousLocation} onChange={e => set('religiousLocation', e.target.value)} />
//                   </FG>
//                 </div>
//                 <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
//                   <FG noMargin>
//                     <label style={labS}>Waze Biserică</label>
//                     <input className="ps-input" style={{ marginBottom: 0 }} placeholder="Link Waze" value={formData.religiousWaze} onChange={e => set('religiousWaze', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" />
//                   </FG>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ── CONTACT + RSVP ── */}
//         <div className="ps-rsvp-grid" style={{ marginTop: 16 }}>
//           <SectionCard title="Contact pentru Oaspeți" icon="📞">
//             <FG>
//               <label style={labS}>Telefon Mireasă</label>
//               <input className="ps-input" placeholder="07XX XXX XXX" value={formData.contactPhoneBride} onChange={e => set('contactPhoneBride', e.target.value)} inputMode="tel" autoComplete="tel" />
//             </FG>
//             <FG noMargin>
//               <label style={labS}>Telefon Mire</label>
//               <input className="ps-input" style={{ marginBottom: 0 }} placeholder="07XX XXX XXX" value={formData.contactPhoneGroom} onChange={e => set('contactPhoneGroom', e.target.value)} inputMode="tel" autoComplete="tel" />
//             </FG>
//           </SectionCard>

//           <SectionCard title="Opțiuni RSVP" icon="📋">
//             <p style={{ fontSize: 13, color: R.silver4, marginBottom: 16, lineHeight: 1.7, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
//               Bifează dacă dorești ca invitații să specifice aceste detalii la confirmare:
//             </p>
//             <label style={checkboxLabel}>
//               <div style={{ ...checkboxBox, background: formData.isAccommodationActive ? `rgba(124,168,216,.25)` : 'transparent', borderColor: formData.isAccommodationActive ? R.accent : `rgba(200,216,232,.25)` }}>
//                 {formData.isAccommodationActive && <span style={{ color: R.silver, fontSize: 10, lineHeight: 1 }}>✓</span>}
//               </div>
//               <input type="checkbox" checked={formData.isAccommodationActive} onChange={e => set('isAccommodationActive', e.target.checked)} style={{ display: 'none' }} />
//               <span style={{ color: R.text, fontSize: 14, fontFamily: "'Cormorant Garamond', serif" }}>Întreabă dacă au nevoie de Cazare</span>
//             </label>
//             <label style={{ ...checkboxLabel, marginTop: 10 }}>
//               <div style={{ ...checkboxBox, background: formData.isTransportActive ? `rgba(124,168,216,.25)` : 'transparent', borderColor: formData.isTransportActive ? R.accent : `rgba(200,216,232,.25)` }}>
//                 {formData.isTransportActive && <span style={{ color: R.silver, fontSize: 10, lineHeight: 1 }}>✓</span>}
//               </div>
//               <input type="checkbox" checked={formData.isTransportActive} onChange={e => set('isTransportActive', e.target.checked)} style={{ display: 'none' }} />
//               <span style={{ color: R.text, fontSize: 14, fontFamily: "'Cormorant Garamond', serif" }}>Întreabă dacă au nevoie de Transport</span>
//             </label>
//           </SectionCard>
//         </div>

//         {/* ── POVESTEA NOASTRĂ ── */}
//         <SectionCard title="Povestea Noastră" icon="📖" style={{ marginTop: 16 }}>
//           <label style={labS}>Mesaj pentru invitați</label>
//           <textarea
//             className="ps-input"
//             placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..."
//             style={{ height: 110, resize: 'vertical', lineHeight: 1.7, marginBottom: 0 }}
//             value={formData.ourStory}
//             onChange={e => set('ourStory', e.target.value)}
//           />
//           <p style={hintS}>Maxim 500 de caractere recomandat.</p>
//         </SectionCard>

//         {/* ── SAVE ── */}
//         <div style={{ marginTop: 28, position: 'relative' }}>
//           <button
//             type="submit"
//             disabled={loading}
//             className="ps-save-btn"
//             style={{
//               width: '100%', padding: '16px 0',
//               background: loading
//                 ? `rgba(124,168,216,.2)`
//                 : `linear-gradient(135deg,${R.navy2} 0%,${R.silver4} 45%,${R.silver2} 55%,${R.silver4} 70%,${R.navy2} 100%)`,
//               color: loading ? R.silver4 : R.navy,
//               fontFamily: "'Cinzel', serif",
//               fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 700,
//               letterSpacing: '.22em', textTransform: 'uppercase',
//               border: 'none', borderRadius: 6,
//               cursor: loading ? 'not-allowed' : 'pointer',
//               boxShadow: `0 6px 24px rgba(124,168,216,.18)`,
//               position: 'relative', overflow: 'hidden',
//             }}
//           >
//             {!loading && (
//               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)', backgroundSize: '350px 100%', animation: 'shimmer-ps 3s linear infinite' }} />
//             )}
//             <span style={{ position: 'relative', zIndex: 1 }}>
//               {loading ? '◆  Se salvează...  ◆' : '◆  Salvează Modificările  ◆'}
//             </span>
//           </button>
//         </div>

//       </form>
//     </>
//   );
// };

// const GoldDividerLine = () => (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 8 }}>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(200,216,232,.3))` }} />
//     <svg viewBox="0 0 40 14" width="40" height="14" fill="none">
//       <path d="M3 7 L14 7" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
//       <path d="M26 7 L37 7" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
//       <rect x="15" y="3" width="8" height="8" transform="rotate(45 20 7)" fill="none" stroke="#C8D8E8" strokeWidth="1" strokeOpacity=".8" />
//       <circle cx="20" cy="7" r="1.5" fill="#C8D8E8" fillOpacity=".6" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(200,216,232,.3),transparent)` }} />
//   </div>
// );

// const cardBase: React.CSSProperties = {
//   background: `linear-gradient(160deg,rgba(15,32,64,.95) 0%,rgba(11,25,41,.98) 100%)`,
//   borderRadius: 12,
//   border: `1px solid rgba(200,216,232,.15)`,
//   overflow: 'hidden',
// };

// interface SectionCardProps {
//   title: string;
//   icon?: string;
//   children: React.ReactNode;
//   style?: React.CSSProperties;
// }

// const SectionCard = ({ title, icon, children, style }: SectionCardProps) => (
//   <div className="ps-card" style={{ ...cardBase, ...style }}>
//     <div style={{ padding: '14px 18px 10px', borderBottom: `1px solid rgba(200,216,232,.1)`, display: 'flex', alignItems: 'center', gap: 8 }}>
//       {icon && <span style={{ fontSize: 14, opacity: .85 }}>{icon}</span>}
//       <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: `rgba(200,216,232,.7)`, margin: 0 }}>
//         {title}
//       </p>
//     </div>
//     <div style={{ padding: '16px 18px' }}>{children}</div>
//   </div>
// );

// const FG = ({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) => (
//   <div style={{ marginBottom: noMargin ? 0 : 4 }}>{children}</div>
// );

// const labS: React.CSSProperties = {
//   display: 'block',
//   fontFamily: "'Cinzel', serif",
//   fontSize: 8, fontWeight: 600,
//   letterSpacing: '.24em', textTransform: 'uppercase',
//   color: `rgba(200,216,232,.5)`,
//   marginBottom: 6,
// };

// const hintS: React.CSSProperties = {
//   fontFamily: "'Cormorant Garamond', serif",
//   fontStyle: 'italic', fontSize: 11,
//   color: `rgba(200,216,232,.3)`,
//   marginTop: -8, marginBottom: 4,
// };

// const checkboxLabel: React.CSSProperties = {
//   display: 'flex', alignItems: 'center', gap: 12,
//   cursor: 'pointer', userSelect: 'none',
// };

// const checkboxBox: React.CSSProperties = {
//   width: 18, height: 18, borderRadius: 4,
//   border: `1px solid rgba(200,216,232,.25)`,
//   display: 'flex', alignItems: 'center', justifyContent: 'center',
//   flexShrink: 0, transition: 'all .18s',
// };



"use client";
import React, { useState, useEffect } from 'react';
import { C, G, F, FS, ANIM } from '../ui.tokens';

interface PersonalizeSectionProps {
  initialData: any;
  orderId:     any;
  onSave:      () => void;
}

interface FormData {
  customSlug:           string;
  brideName:            string;
  groomName:            string;
  nasiNames:            string;
  parentsNames:         string;
  weddingDate:          string;
  weddingTime:          string;
  locationName:         string;
  googleMapsUrl:        string;
  wazeUrl:              string;
  religiousDate:        string;
  religiousTime:        string;
  religiousLocation:    string;
  religiousWaze:        string;
  ourStory:             string;
  contactPhoneBride:    string;
  contactPhoneGroom:    string;
  isReligiousActive:    boolean;
  isAccommodationActive:boolean;
  isTransportActive:    boolean;
}

// ─────────────────────────────────────────────────────────────
export const PersonalizeSection = ({ initialData, orderId, onSave }: PersonalizeSectionProps) => {
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const maxYear     = currentYear + 5;

  const buildForm = (data: any): FormData => ({
    customSlug:            data?.custom_slug        || '',
    brideName:             data?.bride_name         || '',
    groomName:             data?.groom_name         || '',
    nasiNames:             data?.nasi_names         || '',
    parentsNames:          data?.parents_names      || '',
    weddingDate:           data?.wedding_date       ? new Date(data.wedding_date).toISOString().split('T')[0] : '',
    weddingTime:           data?.wedding_time       ? data.wedding_time.substring(0, 5) : '',
    locationName:          data?.location_name      || '',
    googleMapsUrl:         data?.google_maps_url    || '',
    wazeUrl:               data?.waze_url           || '',
    religiousDate:         data?.religious_date     ? new Date(data.religious_date).toISOString().split('T')[0] : '',
    religiousTime:         data?.religious_time     ? data.religious_time.substring(0, 5) : '',
    religiousLocation:     data?.religious_location || '',
    religiousWaze:         data?.religious_waze     || '',
    ourStory:              data?.our_story          || '',
    contactPhoneBride:     data?.contact_phone_bride || '',
    contactPhoneGroom:     data?.contact_phone_groom || '',
    isReligiousActive:     data?.is_religious_active     ?? false,
    isAccommodationActive: data?.is_accommodation_active ?? false,
    isTransportActive:     data?.is_transport_active     ?? false,
  });

  const [formData, setFormData] = useState<FormData>(() => buildForm(initialData));

  useEffect(() => { if (initialData) setFormData(buildForm(initialData)); }, [initialData]);

  const set = (key: keyof FormData, value: any) =>
    setFormData(prev => ({ ...prev, [key]: value }));

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
        alert('Personalizare salvată cu succes! ✨');
        onSave();
      } else {
        const err = await res.json();
        alert('Eroare: ' + (err.error || 'A apărut o problemă.'));
      }
    } catch {
      alert('Eroare de conexiune la server.');
    }
    setLoading(false);
  };

  // ── Custom pickers (fără input[type=date] care face zoom pe iOS) ──
  const CustomDatePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const parts  = value ? value.split('-') : ['', '', ''];
    const year = parts[0], month = parts[1], day = parts[2];

    const handleChange = (type: 'day' | 'month' | 'year', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const d = type === 'day'   ? val : (day   || '01');
      const m = type === 'month' ? val : (month || '01');
      const y = type === 'year'  ? val : (year  || String(currentYear));
      set(onChangeKey, `${y}-${m}-${d}`);
    };

    return (
      <div style={{ display: 'flex', gap: 6, width: '100%' }}>
        <select className="ps-input ps-select" value={day}   onChange={e => handleChange('day',   e.target.value)}>
          <option value="">Zi</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
          ))}
        </select>
        <select className="ps-input ps-select" value={month} onChange={e => handleChange('month', e.target.value)}>
          <option value="">Lună</option>
          {['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
            <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
          ))}
        </select>
        <select className="ps-input ps-select" value={year}  onChange={e => handleChange('year',  e.target.value)}>
          <option value="">An</option>
          {Array.from({ length: maxYear - currentYear + 1 }, (_, i) => (
            <option key={i} value={String(currentYear + i)}>{currentYear + i}</option>
          ))}
        </select>
      </div>
    );
  };

  const CustomTimePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const [hours, minutes] = value ? value.split(':') : ['', ''];

    const handleChange = (type: 'h' | 'm', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const h = type === 'h' ? val : (hours   || '12');
      const m = type === 'm' ? val : (minutes || '00');
      set(onChangeKey, `${h}:${m}`);
    };

    return (
      <div style={{ display: 'flex', gap: 6, width: '100%', alignItems: 'center' }}>
        <select className="ps-input ps-select" value={hours}   onChange={e => handleChange('h', e.target.value)}>
          <option value="">Ora</option>
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
          ))}
        </select>
        <span style={{ color: C.silver, fontSize: 16, fontWeight: 300, flexShrink: 0, opacity: 0.7 }}>:</span>
        <select className="ps-input ps-select" value={minutes} onChange={e => handleChange('m', e.target.value)}>
          <option value="">Min</option>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Scroll safe wrapper ────────────────────────── */
        .ps-wrap {
          width: 100%;
          max-width: 960px;
          box-sizing: border-box;
          overflow-x: hidden;   /* fără scroll lateral */
          /* NU overflow-y — scroll din .ry-main */
        }

        /* ── Inputs – 16px previne zoom iOS ─────────────── */
        .ps-input {
          font-size: 16px !important;
          -webkit-text-size-adjust: 100%;
          width: 100%;
          background: rgba(15,32,64,.5);
          border: 1px solid rgba(200,216,232,.18);
          color: ${C.silver3};
          padding: 10px 12px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-family: ${F.serif};
          transition: border-color .2s, box-shadow .2s;
          min-width: 0;
          -webkit-appearance: none;
          appearance: none;
        }
        .ps-input:focus {
          border-color: rgba(200,216,232,.55) !important;
          box-shadow: 0 0 0 3px rgba(124,168,216,.08) !important;
          outline: none !important;
        }
        .ps-input::placeholder { color: rgba(200,216,232,.2); }
        .ps-input option       { background: #0F2040; color: ${C.silver3}; }

        .ps-select {
          flex: 1;
          padding: 10px 24px 10px 10px !important;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23A8BDD0' stroke-opacity='.55' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-color: rgba(15,32,64,.5);
        }

        /* ── Hover ──────────────────────────────────────── */
        .ps-card:hover         { box-shadow: 0 8px 32px rgba(0,0,0,.4), 0 0 0 1px rgba(200,216,232,.18) !important; }
        .ps-preview-btn:hover  { background: rgba(124,168,216,.14) !important; border-color: rgba(200,216,232,.55) !important; color: ${C.silver3} !important; }
        .ps-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(124,168,216,.25) !important; }
        .ps-save-btn:disabled  { opacity: .55; cursor: not-allowed; }
        .ps-toggle:hover       { border-color: rgba(200,216,232,.4) !important; background: rgba(124,168,216,.1) !important; }

        /* ── Animații ───────────────────────────────────── */
        @keyframes shimmer-ps { 0%{ background-position: -350px 0 } 100%{ background-position: 350px 0 } }

        /* ── Grid layout ────────────────────────────────── */
        .ps-two-col        { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ps-religious-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ps-rsvp-grid      { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 700px) {
          .ps-two-col        { grid-template-columns: 1fr !important; }
          .ps-religious-grid { grid-template-columns: 1fr !important; }
          .ps-rsvp-grid      { grid-template-columns: 1fr !important; }
          .ps-slug-prefix    { display: none !important; }
        }
        @media (max-width: 400px) { .ps-span-full { grid-column: span 1 !important; } }
      `}</style>

      <form onSubmit={handleSave} className="ps-wrap" style={{ paddingBottom: 80, fontFamily: F.body }}>

        {/* ── HEADER ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28, width: '100%' }}>
          <div>
            <p style={{
              fontFamily: F.display, fontSize: 10, letterSpacing: '.32em',
              textTransform: 'uppercase', color: C.silver4, marginBottom: 6,
            }}>Dashboard</p>
            <h2 style={{
              fontFamily: F.serif, fontSize: 'clamp(20px,5vw,30px)',
              fontWeight: 300, fontStyle: 'italic', color: C.silver3,
              margin: 0, letterSpacing: '.02em', lineHeight: 1.2,
            }}>Personalizare Detalii</h2>
          </div>

          <a
            href={`/invitatie/royal/${formData.customSlug}`}
            target="_blank"
            rel="noreferrer"
            className="ps-preview-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 18px', border: `1px solid rgba(200,216,232,.3)`,
              borderRadius: 6, color: C.silver, textDecoration: 'none',
              fontFamily: F.display, fontSize: 10, fontWeight: 600,
              letterSpacing: '.18em', textTransform: 'uppercase',
              background: C.hoverTab, whiteSpace: 'nowrap', width: '100%',
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"
              style={{ width: 14, height: 14, flexShrink: 0 }}>
              <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
            </svg>
            <span>Previzualizare</span>
          </a>
        </div>

        <GoldDividerLine />

        {/* ── URL PERSONALIZAT ────────────────────────────── */}
        <SectionCard title="🔗 URL Personalizat" style={{ marginTop: 24 }}>
          <label style={labS}>Slug personalizat</label>
          <div style={{
            display: 'flex', alignItems: 'stretch', borderRadius: 6,
            overflow: 'hidden', border: `1px solid rgba(200,216,232,.2)`,
            background: C.navy,
          }}>
            <span className="ps-slug-prefix" style={{
              padding: '11px 12px', color: C.silver4,
              background: C.hoverTab, fontSize: 12,
              fontFamily: F.display, letterSpacing: '.06em',
              borderRight: `1px solid rgba(200,216,232,.12)`,
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center',
            }}>
              www.vibeinvite.ro/
            </span>
            <input
              className="ps-input"
              style={{ border: 'none', borderRadius: 0, background: 'transparent', flex: 1, marginBottom: 0, minWidth: 0 }}
              value={formData.customSlug}
              onChange={e => set('customSlug', e.target.value.toLowerCase().replace(/\s/g, '-'))}
              placeholder="nunta-andrei-maria"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <p style={hintS}>Folosiți doar litere mici, cifre și cratimă.</p>
        </SectionCard>

        {/* ── MIRI + RESTAURANT ───────────────────────────── */}
        <div className="ps-two-col" style={{ marginTop: 16 }}>
          <SectionCard title="Miri & Familie" icon="💍">
            <FG><label style={labS}>Nume Mireasă</label>
              <input className="ps-input" placeholder="ex: Maria" value={formData.brideName} onChange={e => set('brideName', e.target.value)} /></FG>
            <FG><label style={labS}>Nume Mire</label>
              <input className="ps-input" placeholder="ex: Andrei" value={formData.groomName} onChange={e => set('groomName', e.target.value)} /></FG>
            <FG><label style={labS}>Nași</label>
              <input className="ps-input" placeholder="ex: Popescu Ion și Elena" value={formData.nasiNames} onChange={e => set('nasiNames', e.target.value)} /></FG>
            <FG noMargin><label style={labS}>Părinți</label>
              <input className="ps-input" style={{ marginBottom: 0 }} placeholder="ex: Din partea mirelui..." value={formData.parentsNames} onChange={e => set('parentsNames', e.target.value)} /></FG>
          </SectionCard>

          <SectionCard title="Petrecere Restaurant" icon="🥂">
            <FG><label style={labS}>Data Petrecerii</label>
              <CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" /></FG>
            <FG><label style={labS}>Ora Începerii (24h)</label>
              <CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" /></FG>
            <FG><label style={labS}>Locație (Nume Restaurant)</label>
              <input className="ps-input" placeholder="ex: Restaurant Aristocrat" value={formData.locationName} onChange={e => set('locationName', e.target.value)} /></FG>
            <FG><label style={labS}>Link Google Maps</label>
              <input className="ps-input" placeholder="https://maps.app.goo.gl/..." value={formData.googleMapsUrl} onChange={e => set('googleMapsUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
            <FG noMargin><label style={labS}>Link Waze</label>
              <input className="ps-input" style={{ marginBottom: 0 }} placeholder="https://waze.com/ul/..." value={formData.wazeUrl} onChange={e => set('wazeUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
          </SectionCard>
        </div>

        {/* ── CUNUNIA RELIGIOASĂ ───────────────────────────── */}
        <div style={{ ...cardBase, marginTop: 16, padding: 0 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 20px',
            borderBottom: formData.isReligiousActive ? `1px solid rgba(200,216,232,.12)` : 'none',
            flexWrap: 'wrap', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16 }}>⛪</span>
              <div>
                <p style={{ fontFamily: F.display, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: C.silver, margin: 0 }}>Cununia Religioasă</p>
                <p style={{ fontSize: 11, color: C.silver4, marginTop: 3, fontStyle: 'italic', fontFamily: F.serif, marginBottom: 0 }}>Secțiune opțională</p>
              </div>
            </div>
            <label className="ps-toggle" style={{
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              padding: '7px 14px', borderRadius: 100,
              border: `1px solid ${formData.isReligiousActive ? `rgba(200,216,232,.4)` : `rgba(200,216,232,.18)`}`,
              background: formData.isReligiousActive ? C.hoverTabA : C.hoverTab,
              userSelect: 'none', flexShrink: 0,
            }}>
              <input type="checkbox" checked={formData.isReligiousActive}
                onChange={e => set('isReligiousActive', e.target.checked)} style={{ display: 'none' }} />
              <div style={{
                width: 32, height: 18, borderRadius: 9, position: 'relative',
                background: formData.isReligiousActive ? G.toggle : `rgba(200,216,232,.15)`,
                transition: 'background .2s', flexShrink: 0, border: `1px solid rgba(200,216,232,.2)`,
              }}>
                <div style={{
                  position: 'absolute', top: 2,
                  left: formData.isReligiousActive ? 14 : 2,
                  width: 12, height: 12, borderRadius: '50%',
                  background: formData.isReligiousActive ? '#fff' : `rgba(200,216,232,.5)`,
                  transition: 'left .2s, background .2s',
                }} />
              </div>
              <span style={{
                fontFamily: F.display, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase',
                color: formData.isReligiousActive ? C.silver : C.silver4, whiteSpace: 'nowrap',
              }}>
                {formData.isReligiousActive ? 'Activă' : 'Inactivă'}
              </span>
            </label>
          </div>

          {formData.isReligiousActive && (
            <div style={{ padding: '16px 20px' }}>
              <div className="ps-religious-grid">
                <FG><label style={labS}>Data Cununiei</label>
                  <CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" /></FG>
                <FG><label style={labS}>Ora (24h)</label>
                  <CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" /></FG>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <FG><label style={labS}>Biserica</label>
                    <input className="ps-input" placeholder="ex: Biserica Sf. Maria" value={formData.religiousLocation} onChange={e => set('religiousLocation', e.target.value)} /></FG>
                </div>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <FG noMargin><label style={labS}>Waze Biserică</label>
                    <input className="ps-input" style={{ marginBottom: 0 }} placeholder="Link Waze" value={formData.religiousWaze} onChange={e => set('religiousWaze', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── CONTACT + RSVP ───────────────────────────────── */}
        <div className="ps-rsvp-grid" style={{ marginTop: 16 }}>
          <SectionCard title="Contact pentru Oaspeți" icon="📞">
            <FG><label style={labS}>Telefon Mireasă</label>
              <input className="ps-input" placeholder="07XX XXX XXX" value={formData.contactPhoneBride} onChange={e => set('contactPhoneBride', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
            <FG noMargin><label style={labS}>Telefon Mire</label>
              <input className="ps-input" style={{ marginBottom: 0 }} placeholder="07XX XXX XXX" value={formData.contactPhoneGroom} onChange={e => set('contactPhoneGroom', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
          </SectionCard>

          <SectionCard title="Opțiuni RSVP" icon="📋">
            <p style={{ fontSize: 13, color: C.silver4, marginBottom: 16, lineHeight: 1.7, fontFamily: F.serif, fontStyle: 'italic' }}>
              Bifează dacă dorești ca invitații să specifice aceste detalii la confirmare:
            </p>
            <label style={checkboxLabel}>
              <div style={{ ...checkboxBox, background: formData.isAccommodationActive ? `rgba(124,168,216,.25)` : 'transparent', borderColor: formData.isAccommodationActive ? C.accent : `rgba(200,216,232,.25)` }}>
                {formData.isAccommodationActive && <span style={{ color: C.silver, fontSize: 10, lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isAccommodationActive} onChange={e => set('isAccommodationActive', e.target.checked)} style={{ display: 'none' }} />
              <span style={{ color: C.text, fontSize: 14, fontFamily: F.serif }}>Întreabă dacă au nevoie de Cazare</span>
            </label>
            <label style={{ ...checkboxLabel, marginTop: 10 }}>
              <div style={{ ...checkboxBox, background: formData.isTransportActive ? `rgba(124,168,216,.25)` : 'transparent', borderColor: formData.isTransportActive ? C.accent : `rgba(200,216,232,.25)` }}>
                {formData.isTransportActive && <span style={{ color: C.silver, fontSize: 10, lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isTransportActive} onChange={e => set('isTransportActive', e.target.checked)} style={{ display: 'none' }} />
              <span style={{ color: C.text, fontSize: 14, fontFamily: F.serif }}>Întreabă dacă au nevoie de Transport</span>
            </label>
          </SectionCard>
        </div>

        {/* ── POVESTEA NOASTRĂ ─────────────────────────────── */}
        <SectionCard title="Povestea Noastră" icon="📖" style={{ marginTop: 16 }}>
          <label style={labS}>Mesaj pentru invitați</label>
          <textarea
            className="ps-input"
            placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..."
            style={{ height: 110, resize: 'vertical', lineHeight: 1.7, marginBottom: 0 }}
            value={formData.ourStory}
            onChange={e => set('ourStory', e.target.value)}
          />
          <p style={hintS}>Maxim 500 de caractere recomandat.</p>
        </SectionCard>

        {/* ── SALVEAZĂ ─────────────────────────────────────── */}
        <div style={{ marginTop: 28, position: 'relative' }}>
          <button
            type="submit"
            disabled={loading}
            className="ps-save-btn"
            style={{
              width: '100%', padding: '16px 0',
              background: loading ? `rgba(124,168,216,.2)` : G.btnPrimary,
              color: loading ? C.silver4 : C.navy,
              fontFamily: F.display,
              fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 700,
              letterSpacing: '.22em', textTransform: 'uppercase',
              border: 'none', borderRadius: 6,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: `0 6px 24px rgba(124,168,216,.18)`,
              position: 'relative', overflow: 'hidden',
              transition: 'transform .22s, box-shadow .22s',
            }}
          >
            {!loading && (
              <div style={{
                position: 'absolute', inset: 0,
                background: G.shimmer,
                backgroundSize: '350px 100%',
                animation: ANIM.shimmer,
              }} />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {loading ? '◆  Se salvează...  ◆' : '◆  Salvează Modificările  ◆'}
            </span>
          </button>
        </div>

      </form>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
//  Sub-componente locale
// ─────────────────────────────────────────────────────────────
const GoldDividerLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 8 }}>
    <div style={{ flex: 1, height: 1, background: G.sepH }} />
    <svg viewBox="0 0 40 14" width="40" height="14" fill="none">
      <path d="M3 7 L14 7"  stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
      <path d="M26 7 L37 7" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
      <rect x="15" y="3" width="8" height="8" transform="rotate(45 20 7)"
        fill="none" stroke="#C8D8E8" strokeWidth="1" strokeOpacity=".8" />
      <circle cx="20" cy="7" r="1.5" fill="#C8D8E8" fillOpacity=".6" />
    </svg>
    <div style={{ flex: 1, height: 1, background: G.sepHRev }} />
  </div>
);

const cardBase: React.CSSProperties = {
  background: `linear-gradient(160deg,rgba(15,32,64,.95) 0%,rgba(11,25,41,.98) 100%)`,
  borderRadius: 12,
  border: `1px solid rgba(200,216,232,.15)`,
  overflow: 'hidden',
};

interface SectionCardProps {
  title: string; icon?: string;
  children: React.ReactNode; style?: React.CSSProperties;
}
const SectionCard = ({ title, icon, children, style }: SectionCardProps) => (
  <div className="ps-card" style={{ ...cardBase, ...style }}>
    <div style={{ padding: '14px 18px 10px', borderBottom: `1px solid rgba(200,216,232,.1)`, display: 'flex', alignItems: 'center', gap: 8 }}>
      {icon && <span style={{ fontSize: 14, opacity: .85 }}>{icon}</span>}
      <p style={{ fontFamily: F.display, fontSize: 9, fontWeight: 600, letterSpacing: '.28em', textTransform: 'uppercase', color: `rgba(200,216,232,.7)`, margin: 0 }}>
        {title}
      </p>
    </div>
    <div style={{ padding: '16px 18px' }}>{children}</div>
  </div>
);

const FG = ({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) => (
  <div style={{ marginBottom: noMargin ? 0 : 4 }}>{children}</div>
);

const labS: React.CSSProperties = {
  display: 'block', fontFamily: F.display,
  fontSize: 8, fontWeight: 600, letterSpacing: '.24em', textTransform: 'uppercase',
  color: `rgba(200,216,232,.5)`, marginBottom: 6,
};
const hintS: React.CSSProperties = {
  fontFamily: F.serif, fontStyle: 'italic', fontSize: 11,
  color: `rgba(200,216,232,.3)`, marginTop: -8, marginBottom: 4,
};
const checkboxLabel: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 12,
  cursor: 'pointer', userSelect: 'none',
};
const checkboxBox: React.CSSProperties = {
  width: 18, height: 18, borderRadius: 4,
  border: `1px solid rgba(200,216,232,.25)`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0, transition: 'all .18s',
};
