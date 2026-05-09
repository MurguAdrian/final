// // "use client";
// // import React, { useState, useEffect, useCallback } from 'react';

// // export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
// //   const [status, setStatus] = useState(initialData?.gallery_status || 'inactive');
// //   const [photos, setPhotos] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [timeLeft, setTimeLeft] = useState("");
// //   const [consentChecked, setConsentChecked] = useState(false);

// //   const fetchPhotos = useCallback(async () => {
// //     if (!orderId) return;
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
// //       const data = await res.json();
// //       if (data.photos) setPhotos(data.photos);
// //     } catch (e) { console.error(e); }
// //     setLoading(false);
// //   }, [orderId]);

// //   useEffect(() => {
// //     setStatus(initialData?.gallery_status || 'inactive');
// //     if (initialData?.photos_expires_at && initialData?.gallery_status === 'active') {
// //       const timer = setInterval(() => {
// //         const diff = +new Date(initialData.photos_expires_at) - +new Date();
// //         if (diff <= 0) { setTimeLeft("EXPIRAT"); setStatus('expired'); clearInterval(timer); }
// //         else {
// //           const d = Math.floor(diff / (1000 * 60 * 60 * 24));
// //           const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
// //           const m = Math.floor((diff / 1000 / 60) % 60);
// //           setTimeLeft(`${d}z ${h}h ${m}m rămase`);
// //         }
// //       }, 1000);
// //       return () => clearInterval(timer);
// //     }
// //   }, [initialData]);

// //   useEffect(() => {
// //     if ((status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted') {
// //       fetchPhotos();
// //     }
// //   }, [status, fetchPhotos, initialData]);

// //   const handleActivate = async () => {
// //     if (!consentChecked) { alert("Trebuie să accepți termenii pentru a activa."); return; }
// //     const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
// //     try {
// //       await fetch('/api/dashboard/personalize', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ 
// //           orderId, 
// //           isPhotosActive: true, 
// //           gallery_status: 'active', 
// //           photos_expires_at: expiresAt,
// //           photos_activated_at: new Date().toISOString(),
// //           photo_consent_accepted: true 
// //         }),
// //       });
// //       onSave();
// //     } catch (e) { console.error(e); }
// //   };

// //   const handlePayment = async (type: 'extend' | 'unlock' | 'new_album') => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch('/api/checkout/gallery', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ orderId, type }),
// //       });
// //       const data = await res.json();
// //       if (data.url) window.location.href = data.url;
// //     } catch (e) { alert("Eroare plată"); }
// //     finally { setLoading(false); }
// //   };

// //   return (
// //     <div>
// //       <h2 style={{ color: '#d4af37', fontSize: '1.8rem', marginBottom: '20px' }}>📸 Gestiune Galerie Foto</h2>

// //       {status === 'inactive' && (
// //         <div style={cardS}>
// //           <h3>Activare Modul</h3>
// //           <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>
// //             Confirm că sunt beneficiarul exclusiv al fotografiilor și îmi asum responsabilitatea legală pentru utilizarea acestora.
// //           </p>
// //           <label style={{ display: 'flex', gap: '10px', marginBottom: '20px', cursor: 'pointer' }}>
// //             <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} />
// //             <span style={{ fontSize: '0.8rem' }}>Accept responsabilitatea integrală și termenii de stocare (30 zile).</span>
// //           </label>
// //           <button onClick={handleActivate} disabled={!consentChecked} style={{ ...btnGoldFull, opacity: consentChecked ? 1 : 0.5 }}>
// //             ACTIVEAZĂ 3 ZILE GRATUIT
// //           </button>
// //         </div>
// //       )}

// //       {status === 'active' && (
// //         <div style={cardS}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //             <h3 style={{ color: '#4caf50' }}>🟢 ACTIV</h3>
// //             <span style={{ color: '#ffa500' }}>⏳ {timeLeft}</span>
// //           </div>
// //           {/* Prelungirea e permisă doar în primele 3 zile */}
// //           {new Date(initialData.photos_expires_at).getTime() - new Date(initialData.photos_activated_at).getTime() < 4 * 24 * 60 * 60 * 1000 && (
// //              <button onClick={() => handlePayment('extend')} style={{ ...btnGoldFull, marginTop: '20px' }}>
// //                PRELUNGEȘTE CU 5 ZILE (150 RON)
// //              </button>
// //           )}
// //         </div>
// //       )}

// //       {status === 'expired' && !initialData?.is_unlock_paid && (
// //         <div style={{ ...cardS, border: '1px solid #ff4444' }}>
// //           <h3 style={{ color: '#ff4444' }}>🔴 TIMP EXPIRAT</h3>
// //           <p style={{ color: '#888', fontSize: '0.8rem' }}>Upload-ul este blocat. Poți debloca vizualizarea pentru încă 5 zile.</p>
// //           <button onClick={() => handlePayment('unlock')} style={{ ...btnGoldFull, background: '#ff4444', color: '#fff', marginTop: '20px' }}>
// //             DEBLOCHEAZĂ VIZUALIZARE (200 RON)
// //           </button>
// //         </div>
// //       )}

// //       {status === 'deleted' && (
// //         <div style={cardS}>
// //           <h3 style={{ color: '#888' }}>🔒 ALBUM ȘTERS DEFINITIV</h3>
// //           <p style={{ fontSize: '0.8rem', color: '#666' }}>Cele 30 de zile au trecut. Poți porni un album nou.</p>
// //           <button onClick={() => handlePayment('new_album')} style={{ ...btnGoldFull, marginTop: '20px' }}>
// //             CREEAZĂ ALBUM NOU (400 RON)
// //           </button>
// //         </div>
// //       )}

// //       {(status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted' && (
// //         <div style={{ marginTop: '40px' }}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
// //             <h3>Fotografii ({photos.length})</h3>
// //             <button onClick={fetchPhotos} style={refreshBtn}>{loading ? "..." : "🔄 REFRESH"}</button>
// //           </div>
// //           <div style={galleryGrid}>
// //             {photos.map((p: any) => (
// //               <div key={p.id} style={photoWrapper}>
// //                 <img src={p.url} alt="Nunta" style={imgS} />
// //                 <a href={p.url} target="_blank" rel="noreferrer" style={downloadOverlay}>DESCARCĂ</a>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const cardS = { background: '#111', padding: '25px', borderRadius: '8px', border: '1px solid #d4af3722' };
// // const btnGoldFull = { width: '100%', padding: '15px', background: '#d4af37', color: '#000', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
// // const refreshBtn = { background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 15px', cursor: 'pointer' };
// // const galleryGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' };
// // const photoWrapper = { position: 'relative' as any, height: '150px', overflow: 'hidden' };
// // const imgS = { width: '100%', height: '100%', objectFit: 'cover' as any };
// // const downloadOverlay = { position: 'absolute' as any, bottom: 0, width: '100%', background: 'rgba(212, 175, 55, 0.9)', color: '#000', textAlign: 'center' as any, padding: '5px', fontSize: '0.6rem', textDecoration: 'none' };

// "use client";
// import React, { useState, useEffect, useCallback } from 'react';

// export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
//   const [status, setStatus] = useState(initialData?.gallery_status || 'inactive');
//   const [photos, setPhotos] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [consentChecked, setConsentChecked] = useState(false);
//   const [downloadingAll, setDownloadingAll] = useState(false);
//   const [downloadingId, setDownloadingId] = useState<string | null>(null);

//   const fetchPhotos = useCallback(async () => {
//     if (!orderId) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
//       const data = await res.json();
//       if (data.photos) setPhotos(data.photos);
//     } catch (e) { console.error(e); }
//     setLoading(false);
//   }, [orderId]);

//   useEffect(() => {
//     setStatus(initialData?.gallery_status || 'inactive');
//     if (initialData?.photos_expires_at && initialData?.gallery_status === 'active') {
//       const timer = setInterval(() => {
//         const diff = +new Date(initialData.photos_expires_at) - +new Date();
//         if (diff <= 0) { setTimeLeft("EXPIRAT"); setStatus('expired'); clearInterval(timer); }
//         else {
//           const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const m = Math.floor((diff / 1000 / 60) % 60);
//           setTimeLeft(`${d}z ${h}h ${m}m rămase`);
//         }
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if ((status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted') {
//       fetchPhotos();
//     }
//   }, [status, fetchPhotos, initialData]);

//   const handleActivate = async () => {
//     if (!consentChecked) { alert("Trebuie să accepți termenii pentru a activa."); return; }
//     const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
//     try {
//       await fetch('/api/dashboard/personalize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           orderId, 
//           isPhotosActive: true, 
//           gallery_status: 'active', 
//           photos_expires_at: expiresAt,
//           photos_activated_at: new Date().toISOString(),
//           photo_consent_accepted: true 
//         }),
//       });
//       onSave();
//     } catch (e) { console.error(e); }
//   };

//   const handlePayment = async (type: 'extend' | 'unlock' | 'new_album') => {
//     setLoading(true);
//     try {
//       const res = await fetch('/api/checkout/gallery', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId, type }),
//       });
//       const data = await res.json();
//       if (data.url) window.location.href = data.url;
//     } catch (e) { alert("Eroare plată"); }
//     finally { setLoading(false); }
//   };

//   const handleDownloadSingle = async (photo: any) => {
//     setDownloadingId(photo.id);
//     try {
//       const response = await fetch(photo.url);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       const ext = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
//       a.download = `foto-nunta-${photo.id}.${ext}`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (e) {
//       console.error(e);
//       window.open(photo.url, '_blank');
//     }
//     setDownloadingId(null);
//   };

//   const handleDownloadAll = async () => {
//     if (photos.length === 0) return;
//     setDownloadingAll(true);
//     try {
//       for (let i = 0; i < photos.length; i++) {
//         const photo = photos[i];
//         try {
//           const response = await fetch(photo.url);
//           const blob = await response.blob();
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           const ext = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
//           a.download = `foto-nunta-${String(i + 1).padStart(3, '0')}.${ext}`;
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//           document.body.removeChild(a);
//           await new Promise(resolve => setTimeout(resolve, 300));
//         } catch (e) {
//           console.error(`Eroare la descărcarea pozei ${i + 1}:`, e);
//         }
//       }
//     } catch (e) {
//       console.error(e);
//     }
//     setDownloadingAll(false);
//   };

//   return (
//     <div style={styles.wrapper}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         .photo-card:hover .photo-overlay { opacity: 1 !important; }
//         .photo-card:hover img { transform: scale(1.06); }
//         .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.45) !important; }
//         .ghost-btn:hover { background: rgba(212,175,55,.12) !important; border-color: rgba(212,175,55,.5) !important; }
//         .danger-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(220,60,60,.35) !important; }
//         .dl-btn:hover { background: rgba(212,175,55,.18) !important; }
//         @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
//         @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
//         @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
//         @media (max-width: 600px) {
//           .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .header-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
//           .dl-all-btn { width: 100% !important; justify-content: center !important; }
//         }
//       `}</style>

//       {/* ── HEADER ── */}
//       <div style={styles.header}>
//         <div>
//           <p style={styles.headerLabel}>Panou Control</p>
//           <h2 style={styles.title}>Galerie Foto</h2>
//         </div>
//         <div style={styles.headerIcon}>
//           <svg viewBox="0 0 48 48" fill="none" style={{width:28,height:28}}>
//             <rect x="4" y="14" width="40" height="28" rx="5" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".8"/>
//             <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".8" strokeLinejoin="round"/>
//             <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".8"/>
//             <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".3"/>
//             <circle cx="37" cy="20" r="2" fill="#D4AF37" fillOpacity=".6"/>
//           </svg>
//         </div>
//       </div>

//       <div style={styles.divider}/>

//       {/* ── INACTIVE ── */}
//       {status === 'inactive' && (
//         <div style={styles.card}>
//           <div style={styles.cardInner}>
//             <div style={styles.statusIconWrap}>
//               <svg viewBox="0 0 40 40" fill="none" style={{width:32,height:32}}>
//                 <circle cx="20" cy="20" r="18" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".4"/>
//                 <path d="M20 12 L20 22 M20 27 L20 28" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             </div>
//             <h3 style={styles.cardTitle}>Activare Modul Foto</h3>
//             <p style={styles.cardDesc}>
//               Confirm că sunt beneficiarul exclusiv al fotografiilor și îmi asum responsabilitatea legală pentru utilizarea acestora.
//             </p>
//             <label style={styles.consentLabel}>
//               <div style={{...styles.checkbox, ...(consentChecked ? styles.checkboxChecked : {})}}>
//                 {consentChecked && (
//                   <svg viewBox="0 0 12 12" fill="none" style={{width:10,height:10}}>
//                     <path d="M2 6L5 9L10 3" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 )}
//               </div>
//               <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} style={{display:'none'}}/>
//               <span style={styles.consentText}>Accept responsabilitatea integrală și termenii de stocare (30 zile).</span>
//             </label>
//             <button onClick={handleActivate} disabled={!consentChecked} className="gold-btn"
//               style={{...styles.goldBtn, opacity: consentChecked ? 1 : 0.45, cursor: consentChecked ? 'pointer' : 'not-allowed', transition:'all .25s'}}>
//               <svg viewBox="0 0 20 20" fill="none" style={{width:16,height:16}}>
//                 <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               Activează 3 Zile Gratuit
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ── ACTIVE ── */}
//       {status === 'active' && (
//         <div style={styles.card}>
//           <div style={styles.cardInner}>
//             <div style={styles.statusRow}>
//               <div style={styles.statusBadgeActive}>
//                 <span style={styles.statusDot}/>
//                 Activ
//               </div>
//               <div style={styles.timerBadge}>
//                 <svg viewBox="0 0 16 16" fill="none" style={{width:12,height:12}}>
//                   <circle cx="8" cy="8" r="6.5" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity=".7"/>
//                   <path d="M8 5 L8 8.5 L10.5 10" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
//                 </svg>
//                 {timeLeft}
//               </div>
//             </div>
//             {new Date(initialData.photos_expires_at).getTime() - new Date(initialData.photos_activated_at).getTime() < 4 * 24 * 60 * 60 * 1000 && (
//               <button onClick={() => handlePayment('extend')} className="gold-btn"
//                 style={{...styles.goldBtn, marginTop:8, transition:'all .25s'}}>
//                 <svg viewBox="0 0 20 20" fill="none" style={{width:16,height:16}}>
//                   <path d="M2 10C2 5.58 5.58 2 10 2s8 3.58 8 8-3.58 8-8 8" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round"/>
//                   <path d="M2 10 L5 7 M2 10 L5 13" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 Prelungește cu 5 Zile — 150 RON
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ── EXPIRED ── */}
//       {status === 'expired' && !initialData?.is_unlock_paid && (
//         <div style={{...styles.card, borderColor:'rgba(220,60,60,.3)'}}>
//           <div style={styles.cardInner}>
//             <div style={styles.statusBadgeExpired}>
//               <span style={{...styles.statusDot, background:'#dc3c3c'}}/>
//               Timp Expirat
//             </div>
//             <p style={{...styles.cardDesc, marginTop:8}}>Upload-ul este blocat. Poți debloca vizualizarea pentru încă 5 zile.</p>
//             <button onClick={() => handlePayment('unlock')} className="danger-btn"
//               style={{...styles.goldBtn, background:'linear-gradient(135deg,#8B2020 0%,#dc3c3c 45%,#f06060 55%,#dc3c3c 70%,#8B2020 100%)', marginTop:8, transition:'all .25s', boxShadow:'0 8px 28px rgba(220,60,60,.25)'}}>
//               Deblochează Vizualizare — 200 RON
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ── DELETED ── */}
//       {status === 'deleted' && (
//         <div style={{...styles.card, borderColor:'rgba(212,175,55,.1)'}}>
//           <div style={styles.cardInner}>
//             <div style={styles.statusBadgeDeleted}>
//               <svg viewBox="0 0 16 16" fill="none" style={{width:12,height:12}}>
//                 <path d="M8 1 L8 8 M8 11 L8 12" stroke="rgba(212,175,55,.5)" strokeWidth="1.5" strokeLinecap="round"/>
//                 <circle cx="8" cy="8" r="7" stroke="rgba(212,175,55,.3)" strokeWidth="1"/>
//               </svg>
//               Album Șters Definitiv
//             </div>
//             <p style={{...styles.cardDesc, marginTop:8}}>Cele 30 de zile au trecut. Poți porni un album nou.</p>
//             <button onClick={() => handlePayment('new_album')} className="gold-btn"
//               style={{...styles.goldBtn, marginTop:8, transition:'all .25s'}}>
//               Creează Album Nou — 400 RON
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ── GALLERY ── */}
//       {(status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted' && (
//         <div style={{marginTop:32, animation:'fadeIn .5s ease both'}}>
//           {/* Gallery Header */}
//           <div className="header-row" style={styles.galleryHeader}>
//             <div>
//               <p style={styles.galleryCount}>
//                 {photos.length} {photos.length === 1 ? 'fotografie' : 'fotografii'}
//               </p>
//               <p style={styles.gallerySubCount}>albumul tău privat</p>
//             </div>
//             <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
//               {photos.length > 0 && (
//                 <button onClick={handleDownloadAll} disabled={downloadingAll} className="gold-btn dl-all-btn"
//                   style={{...styles.goldBtn, padding:'10px 20px', fontSize:11, gap:8, transition:'all .25s', opacity: downloadingAll ? 0.7 : 1}}>
//                   {downloadingAll ? (
//                     <>
//                       <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14,animation:'spin 1s linear infinite'}}>
//                         <circle cx="8" cy="8" r="6" stroke="#0A0803" strokeWidth="1.8" strokeDasharray="20 10"/>
//                       </svg>
//                       Descărcând...
//                     </>
//                   ) : (
//                     <>
//                       <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}>
//                         <path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                         <path d="M2 14 L14 14" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round"/>
//                       </svg>
//                       Descarcă Toate
//                     </>
//                   )}
//                 </button>
//               )}
//               <button onClick={fetchPhotos} className="ghost-btn"
//                 style={{...styles.ghostBtn, transition:'all .25s'}}>
//                 {loading ? (
//                   <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14,animation:'spin 1s linear infinite'}}>
//                     <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="20 10"/>
//                   </svg>
//                 ) : (
//                   <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}>
//                     <path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round"/>
//                     <path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 )}
//                 Refresh
//               </button>
//             </div>
//           </div>

//           {/* Grid */}
//           {photos.length === 0 && !loading ? (
//             <div style={styles.emptyState}>
//               <svg viewBox="0 0 48 48" fill="none" style={{width:40,height:40,marginBottom:12,opacity:.4}}>
//                 <rect x="4" y="14" width="40" height="28" rx="5" stroke="#D4AF37" strokeWidth="1.5"/>
//                 <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round"/>
//                 <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.2"/>
//               </svg>
//               <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontStyle:'italic',color:'rgba(212,175,55,.4)'}}>Nicio fotografie încă</p>
//               <p style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'.18em',color:'rgba(212,175,55,.25)',marginTop:4}}>FOTOGRAFIILE INVITAȚILOR VOR APĂREA AICI</p>
//             </div>
//           ) : (
//             <div className="gallery-grid" style={styles.galleryGrid}>
//               {photos.map((p: any) => (
//                 <div key={p.id} className="photo-card" style={styles.photoCard}>
//                   <img src={p.url} alt="Nunta" style={styles.photoImg}/>
//                   <div className="photo-overlay" style={styles.photoOverlay}>
//                     <button
//                       onClick={() => handleDownloadSingle(p)}
//                       disabled={downloadingId === p.id}
//                       className="dl-btn"
//                       style={styles.dlBtn}>
//                       {downloadingId === p.id ? (
//                         <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14,animation:'spin 1s linear infinite'}}>
//                           <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="20 10"/>
//                         </svg>
//                       ) : (
//                         <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}>
//                           <path d="M8 2 L8 10 M4 7 L8 11 L12 7" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                           <path d="M2 13.5 L14 13.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round"/>
//                         </svg>
//                       )}
//                       {downloadingId === p.id ? '...' : 'Descarcă'}
//                     </button>
//                     <a href={p.url} target="_blank" rel="noreferrer" style={styles.viewBtn}>
//                       <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}>
//                         <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="rgba(212,175,55,.8)" strokeWidth="1.4"/>
//                         <circle cx="8" cy="8" r="2" stroke="rgba(212,175,55,.8)" strokeWidth="1.4"/>
//                       </svg>
//                       Vezi
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ── STYLES ── */
// const G = {
//   gold: '#D4AF37',
//   goldLight: '#F5D678',
//   goldDim: 'rgba(212,175,55,.55)',
//   goldFaint: 'rgba(212,175,55,.12)',
//   goldBorder: 'rgba(212,175,55,.2)',
//   bg: '#080603',
//   surface: 'rgba(212,175,55,.04)',
//   text: '#F5E6A8',
//   textDim: 'rgba(245,230,168,.5)',
// };

// const styles: Record<string, React.CSSProperties> = {
//   wrapper: {
//     fontFamily: "'Lato', sans-serif",
//     color: G.text,
//     maxWidth: 900,
//     width: '100%',
//     margin: '0 auto',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   headerLabel: {
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     letterSpacing: '.3em',
//     textTransform: 'uppercase',
//     color: G.goldDim,
//     marginBottom: 4,
//   },
//   title: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(24px,3.5vw,34px)',
//     fontWeight: 300,
//     fontStyle: 'italic',
//     color: G.gold,
//     margin: 0,
//     letterSpacing: '.04em',
//   },
//   headerIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 12,
//     background: G.goldFaint,
//     border: `1px solid ${G.goldBorder}`,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   divider: {
//     height: 1,
//     background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.3),transparent)',
//     margin: '16px 0 24px',
//   },
//   card: {
//     background: G.surface,
//     border: `1px solid ${G.goldBorder}`,
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 16,
//     backdropFilter: 'blur(8px)',
//   },
//   cardInner: {
//     padding: 'clamp(20px,3vw,28px)',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 12,
//   },
//   statusIconWrap: {
//     width: 52,
//     height: 52,
//     borderRadius: '50%',
//     background: 'rgba(212,175,55,.08)',
//     border: `1px solid ${G.goldBorder}`,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 4,
//   },
//   cardTitle: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(18px,2.5vw,22px)',
//     fontStyle: 'italic',
//     fontWeight: 400,
//     color: G.text,
//     margin: 0,
//   },
//   cardDesc: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(13px,1.6vw,15px)',
//     fontStyle: 'italic',
//     color: G.textDim,
//     lineHeight: 1.7,
//     margin: 0,
//   },
//   consentLabel: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: 12,
//     cursor: 'pointer',
//     padding: '14px 16px',
//     background: 'rgba(212,175,55,.06)',
//     border: `1px solid ${G.goldBorder}`,
//     borderRadius: 10,
//   },
//   checkbox: {
//     width: 18,
//     height: 18,
//     borderRadius: 4,
//     border: `1.5px solid rgba(212,175,55,.4)`,
//     background: 'transparent',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0,
//     marginTop: 1,
//     transition: 'all .2s',
//   },
//   checkboxChecked: {
//     background: G.gold,
//     borderColor: G.gold,
//   },
//   consentText: {
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.06em',
//     color: 'rgba(212,175,55,.7)',
//     lineHeight: 1.6,
//   },
//   goldBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     padding: '13px 24px',
//     borderRadius: 8,
//     background: 'linear-gradient(135deg,#8B6914 0%,#D4AF37 40%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',
//     color: '#0A0803',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 11,
//     fontWeight: 700,
//     letterSpacing: '.16em',
//     textTransform: 'uppercase',
//     border: 'none',
//     cursor: 'pointer',
//     boxShadow: '0 8px 28px rgba(212,175,55,.3)',
//     width: '100%',
//   } as React.CSSProperties,
//   ghostBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 8,
//     padding: '10px 18px',
//     borderRadius: 8,
//     background: G.goldFaint,
//     border: `1px solid ${G.goldBorder}`,
//     color: G.gold,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     fontWeight: 600,
//     letterSpacing: '.12em',
//     cursor: 'pointer',
//     whiteSpace: 'nowrap',
//   } as React.CSSProperties,
//   statusRow: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//     gap: 10,
//   },
//   statusBadgeActive: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 8,
//     padding: '6px 16px',
//     borderRadius: 100,
//     background: 'rgba(76,175,80,.12)',
//     border: '1px solid rgba(76,175,80,.3)',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.18em',
//     textTransform: 'uppercase',
//     color: '#81c784',
//   },
//   statusBadgeExpired: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 8,
//     padding: '6px 16px',
//     borderRadius: 100,
//     background: 'rgba(220,60,60,.1)',
//     border: '1px solid rgba(220,60,60,.25)',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.18em',
//     textTransform: 'uppercase',
//     color: '#ef9a9a',
//   },
//   statusBadgeDeleted: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 8,
//     padding: '6px 16px',
//     borderRadius: 100,
//     background: 'rgba(212,175,55,.06)',
//     border: `1px solid ${G.goldBorder}`,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.18em',
//     textTransform: 'uppercase',
//     color: G.goldDim,
//   },
//   statusDot: {
//     width: 7,
//     height: 7,
//     borderRadius: '50%',
//     background: '#81c784',
//     display: 'inline-block',
//     boxShadow: '0 0 6px #81c784',
//   },
//   timerBadge: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 7,
//     padding: '6px 14px',
//     borderRadius: 100,
//     background: 'rgba(212,175,55,.08)',
//     border: `1px solid ${G.goldBorder}`,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.12em',
//     color: G.gold,
//   },
//   galleryHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     gap: 16,
//     flexWrap: 'wrap',
//   },
//   galleryCount: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(18px,2.5vw,22px)',
//     fontStyle: 'italic',
//     color: G.text,
//     margin: 0,
//     fontWeight: 300,
//   },
//   gallerySubCount: {
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     letterSpacing: '.22em',
//     textTransform: 'uppercase',
//     color: G.goldDim,
//     marginTop: 2,
//   },
//   galleryGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
//     gap: 12,
//   },
//   photoCard: {
//     position: 'relative',
//     aspectRatio: '1',
//     borderRadius: 10,
//     overflow: 'hidden',
//     border: `1px solid ${G.goldBorder}`,
//     background: '#0A0803',
//     cursor: 'pointer',
//   } as React.CSSProperties,
//   photoImg: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     display: 'block',
//     transition: 'transform .4s ease',
//   } as React.CSSProperties,
//   photoOverlay: {
//     position: 'absolute',
//     inset: 0,
//     background: 'linear-gradient(to top, rgba(5,4,1,.92) 0%, rgba(5,4,1,.4) 50%, transparent 100%)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     gap: 6,
//     padding: 10,
//     opacity: 0,
//     transition: 'opacity .3s ease',
//   } as React.CSSProperties,
//   dlBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 6,
//     padding: '7px 14px',
//     borderRadius: 6,
//     background: 'rgba(212,175,55,.12)',
//     border: `1px solid rgba(212,175,55,.35)`,
//     color: G.gold,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     fontWeight: 600,
//     letterSpacing: '.1em',
//     cursor: 'pointer',
//     width: '100%',
//     justifyContent: 'center',
//     transition: 'all .2s',
//   } as React.CSSProperties,
//   viewBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 6,
//     padding: '6px 14px',
//     borderRadius: 6,
//     background: 'rgba(255,255,255,.06)',
//     border: '1px solid rgba(255,255,255,.12)',
//     color: 'rgba(245,230,168,.7)',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     letterSpacing: '.1em',
//     textDecoration: 'none',
//     width: '100%',
//     justifyContent: 'center',
//     transition: 'all .2s',
//   } as React.CSSProperties,
//   emptyState: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '48px 20px',
//     background: G.surface,
//     border: `1px dashed ${G.goldBorder}`,
//     borderRadius: 16,
//     textAlign: 'center',
//   } as React.CSSProperties,
// };

// "use client";
// import React, { useState, useEffect, useCallback } from 'react';

// export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
//   const [status, setStatus] = useState(initialData?.gallery_status || 'inactive');
//   const [photos, setPhotos] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [consentChecked, setConsentChecked] = useState(false);
//   const [downloadingAll, setDownloadingAll] = useState(false);
//   const [downloadingId, setDownloadingId] = useState<string | null>(null);

//   const fetchPhotos = useCallback(async () => {
//     if (!orderId) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
//       const data = await res.json();
//       if (data.photos) setPhotos(data.photos);
//     } catch (e) { console.error(e); }
//     setLoading(false);
//   }, [orderId]);

//   useEffect(() => {
//     setStatus(initialData?.gallery_status || 'inactive');
//     if (initialData?.photos_expires_at && initialData?.gallery_status === 'active') {
//       const timer = setInterval(() => {
//         const diff = +new Date(initialData.photos_expires_at) - +new Date();
//         if (diff <= 0) { setTimeLeft("EXPIRAT"); setStatus('expired'); clearInterval(timer); }
//         else {
//           const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const m = Math.floor((diff / 1000 / 60) % 60);
//           setTimeLeft(`${d}z ${h}h ${m}m rămase`);
//         }
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if ((status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted') {
//       fetchPhotos();
//     }
//   }, [status, fetchPhotos, initialData]);

//   const handleActivate = async () => {
//     if (!consentChecked) { alert("Trebuie să accepți termenii pentru a activa."); return; }
//     const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
//     try {
//       await fetch('/api/dashboard/personalize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           orderId,
//           isPhotosActive: true,
//           gallery_status: 'active',
//           photos_expires_at: expiresAt,
//           photos_activated_at: new Date().toISOString(),
//           photo_consent_accepted: true
//         }),
//       });
//       onSave();
//     } catch (e) { console.error(e); }
//   };

//   const handlePayment = async (type: 'extend' | 'unlock' | 'new_album') => {
//     setLoading(true);
//     try {
//       const res = await fetch('/api/checkout/gallery', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId, type }),
//       });
//       const data = await res.json();
//       if (data.url) window.location.href = data.url;
//     } catch (e) { alert("Eroare plată"); }
//     finally { setLoading(false); }
//   };

//   const handleDownloadSingle = async (photo: any) => {
//     setDownloadingId(photo.id);
//     try {
//       const response = await fetch(photo.url);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       const ext = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
//       a.download = `foto-nunta-${photo.id}.${ext}`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (e) {
//       console.error(e);
//       window.open(photo.url, '_blank');
//     }
//     setDownloadingId(null);
//   };

//   const handleDownloadAll = async () => {
//     if (photos.length === 0) return;
//     setDownloadingAll(true);
//     try {
//       for (let i = 0; i < photos.length; i++) {
//         const photo = photos[i];
//         try {
//           const response = await fetch(photo.url);
//           const blob = await response.blob();
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           const ext = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
//           a.download = `foto-nunta-${String(i + 1).padStart(3, '0')}.${ext}`;
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//           document.body.removeChild(a);
//           await new Promise(resolve => setTimeout(resolve, 300));
//         } catch (e) {
//           console.error(`Eroare la descărcarea pozei ${i + 1}:`, e);
//         }
//       }
//     } catch (e) {
//       console.error(e);
//     }
//     setDownloadingAll(false);
//   };

//   return (
//     <div style={styles.wrapper}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//         .photo-card:hover .photo-overlay { opacity: 1 !important; }
//         .photo-card:hover img { transform: scale(1.06); }
//         .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.45) !important; }
//         .ghost-btn:hover { background: rgba(212,175,55,.12) !important; border-color: rgba(212,175,55,.5) !important; }
//         .danger-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(220,60,60,.35) !important; }
//         .dl-btn:hover { background: rgba(212,175,55,.18) !important; }
//         @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
//         @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
//         @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

//         /* Gallery responsive */
//         .gallery-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
//           gap: 10px;
//         }
//         @media (max-width: 500px) {
//           .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
//         }
//         @media (max-width: 360px) {
//           .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
//         }

//         /* Gallery header stack on mobile */
//         @media (max-width: 600px) {
//           .gallery-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
//           .gallery-header-btns { width: 100% !important; }
//           .gallery-header-btns button { flex: 1 !important; justify-content: center !important; }
//           .dl-all-btn { width: 100% !important; justify-content: center !important; }
//         }

//         /* Photos section: no overflow */
//         .photos-section-wrap { width: 100%; max-width: 900px; box-sizing: border-box; overflow-x: hidden; }
//       `}</style>

//       <div className="photos-section-wrap">
//         {/* HEADER */}
//         <div style={styles.header}>
//           <div>
//             <p style={styles.headerLabel}>Panou Control</p>
//             <h2 style={styles.title}>Galerie Foto</h2>
//           </div>
//           <div style={styles.headerIcon}>
//             <svg viewBox="0 0 48 48" fill="none" style={{ width: 26, height: 26 }}>
//               <rect x="4" y="14" width="40" height="28" rx="5" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".8" />
//               <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".8" strokeLinejoin="round" />
//               <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".8" />
//               <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".3" />
//               <circle cx="37" cy="20" r="2" fill="#D4AF37" fillOpacity=".6" />
//             </svg>
//           </div>
//         </div>

//         <div style={styles.divider} />

//         {/* INACTIVE */}
//         {status === 'inactive' && (
//           <div style={styles.card}>
//             <div style={styles.cardInner}>
//               <div style={styles.statusIconWrap}>
//                 <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
//                   <circle cx="20" cy="20" r="18" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".4" />
//                   <path d="M20 12 L20 22 M20 27 L20 28" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
//                 </svg>
//               </div>
//               <h3 style={styles.cardTitle}>Activare Modul Foto</h3>
//               <p style={styles.cardDesc}>
//                 Confirm că sunt beneficiarul exclusiv al fotografiilor și îmi asum responsabilitatea legală pentru utilizarea acestora.
//               </p>
//               <label style={styles.consentLabel}>
//                 <div style={{ ...styles.checkbox, ...(consentChecked ? styles.checkboxChecked : {}) }}>
//                   {consentChecked && (
//                     <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}>
//                       <path d="M2 6L5 9L10 3" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   )}
//                 </div>
//                 <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} style={{ display: 'none' }} />
//                 <span style={styles.consentText}>Accept responsabilitatea integrală și termenii de stocare (30 zile).</span>
//               </label>
//               <button onClick={handleActivate} disabled={!consentChecked} className="gold-btn"
//                 style={{ ...styles.goldBtn, opacity: consentChecked ? 1 : 0.45, cursor: consentChecked ? 'pointer' : 'not-allowed', transition: 'all .25s' }}>
//                 <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
//                   <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 Activează 3 Zile Gratuit
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ACTIVE */}
//         {status === 'active' && (
//           <div style={styles.card}>
//             <div style={styles.cardInner}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
//                 <div style={styles.statusBadgeActive}>
//                   <span style={styles.statusDot} />
//                   Activ
//                 </div>
//                 <div style={styles.timerBadge}>
//                   <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
//                     <circle cx="8" cy="8" r="6.5" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity=".7" />
//                     <path d="M8 5 L8 8.5 L10.5 10" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
//                   </svg>
//                   {timeLeft}
//                 </div>
//               </div>
//               {new Date(initialData.photos_expires_at).getTime() - new Date(initialData.photos_activated_at).getTime() < 4 * 24 * 60 * 60 * 1000 && (
//                 <button onClick={() => handlePayment('extend')} className="gold-btn"
//                   style={{ ...styles.goldBtn, marginTop: 4, transition: 'all .25s' }}>
//                   <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
//                     <path d="M2 10C2 5.58 5.58 2 10 2s8 3.58 8 8-3.58 8-8 8" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" />
//                     <path d="M2 10 L5 7 M2 10 L5 13" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                   Prelungește cu 5 Zile — 150 RON
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* EXPIRED */}
//         {status === 'expired' && !initialData?.is_unlock_paid && (
//           <div style={{ ...styles.card, borderColor: 'rgba(220,60,60,.3)' }}>
//             <div style={styles.cardInner}>
//               <div style={styles.statusBadgeExpired}>
//                 <span style={{ ...styles.statusDot, background: '#dc3c3c' }} />
//                 Timp Expirat
//               </div>
//               <p style={{ ...styles.cardDesc, marginTop: 4 }}>Upload-ul este blocat. Poți debloca vizualizarea pentru încă 5 zile.</p>
//               <button onClick={() => handlePayment('unlock')} className="danger-btn"
//                 style={{ ...styles.goldBtn, background: 'linear-gradient(135deg,#8B2020 0%,#dc3c3c 45%,#f06060 55%,#dc3c3c 70%,#8B2020 100%)', marginTop: 4, transition: 'all .25s', boxShadow: '0 8px 28px rgba(220,60,60,.25)' }}>
//                 Deblochează Vizualizare — 200 RON
//               </button>
//             </div>
//           </div>
//         )}

//         {/* DELETED */}
//         {status === 'deleted' && (
//           <div style={{ ...styles.card, borderColor: 'rgba(212,175,55,.1)' }}>
//             <div style={styles.cardInner}>
//               <div style={styles.statusBadgeDeleted}>
//                 <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
//                   <path d="M8 1 L8 8 M8 11 L8 12" stroke="rgba(212,175,55,.5)" strokeWidth="1.5" strokeLinecap="round" />
//                   <circle cx="8" cy="8" r="7" stroke="rgba(212,175,55,.3)" strokeWidth="1" />
//                 </svg>
//                 Album Șters Definitiv
//               </div>
//               <p style={{ ...styles.cardDesc, marginTop: 4 }}>Cele 30 de zile au trecut. Poți porni un album nou.</p>
//               <button onClick={() => handlePayment('new_album')} className="gold-btn"
//                 style={{ ...styles.goldBtn, marginTop: 4, transition: 'all .25s' }}>
//                 Creează Album Nou — 400 RON
//               </button>
//             </div>
//           </div>
//         )}

//         {/* GALLERY */}
//         {(status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted' && (
//           <div style={{ marginTop: 28, animation: 'fadeIn .5s ease both' }}>
//             <div className="gallery-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
//               <div>
//                 <p style={styles.galleryCount}>
//                   {photos.length} {photos.length === 1 ? 'fotografie' : 'fotografii'}
//                 </p>
//                 <p style={styles.gallerySubCount}>albumul tău privat</p>
//               </div>
//               <div className="gallery-header-btns" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                 {photos.length > 0 && (
//                   <button onClick={handleDownloadAll} disabled={downloadingAll} className="gold-btn dl-all-btn"
//                     style={{ ...styles.goldBtn, padding: '9px 18px', fontSize: 11, gap: 7, transition: 'all .25s', opacity: downloadingAll ? 0.7 : 1, width: 'auto' }}>
//                     {downloadingAll ? (
//                       <>
//                         <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
//                           <circle cx="8" cy="8" r="6" stroke="#0A0803" strokeWidth="1.8" strokeDasharray="20 10" />
//                         </svg>
//                         Descărcând...
//                       </>
//                     ) : (
//                       <>
//                         <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                           <path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                           <path d="M2 14 L14 14" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" />
//                         </svg>
//                         Descarcă Toate
//                       </>
//                     )}
//                   </button>
//                 )}
//                 <button onClick={fetchPhotos} className="ghost-btn"
//                   style={{ ...styles.ghostBtn, transition: 'all .25s' }}>
//                   {loading ? (
//                     <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
//                       <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="20 10" />
//                     </svg>
//                   ) : (
//                     <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                       <path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
//                       <path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   )}
//                   Refresh
//                 </button>
//               </div>
//             </div>

//             {photos.length === 0 && !loading ? (
//               <div style={styles.emptyState}>
//                 <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38, marginBottom: 12, opacity: .4 }}>
//                   <rect x="4" y="14" width="40" height="28" rx="5" stroke="#D4AF37" strokeWidth="1.5" />
//                   <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
//                   <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.2" />
//                 </svg>
//                 <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(212,175,55,.4)' }}>Nicio fotografie încă</p>
//                 <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.18em', color: 'rgba(212,175,55,.25)', marginTop: 4 }}>FOTOGRAFIILE INVITAȚILOR VOR APĂREA AICI</p>
//               </div>
//             ) : (
//               <div className="gallery-grid">
//                 {photos.map((p: any) => (
//                   <div key={p.id} className="photo-card" style={styles.photoCard}>
//                     <img src={p.url} alt="Nunta" style={styles.photoImg} />
//                     <div className="photo-overlay" style={styles.photoOverlay}>
//                       <button
//                         onClick={() => handleDownloadSingle(p)}
//                         disabled={downloadingId === p.id}
//                         className="dl-btn"
//                         style={styles.dlBtn}>
//                         {downloadingId === p.id ? (
//                           <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
//                             <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="20 10" />
//                           </svg>
//                         ) : (
//                           <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                             <path d="M8 2 L8 10 M4 7 L8 11 L12 7" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M2 13.5 L14 13.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
//                           </svg>
//                         )}
//                         {downloadingId === p.id ? '...' : 'Descarcă'}
//                       </button>
//                       <a href={p.url} target="_blank" rel="noreferrer" style={styles.viewBtn}>
//                         <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                           <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="rgba(212,175,55,.8)" strokeWidth="1.4" />
//                           <circle cx="8" cy="8" r="2" stroke="rgba(212,175,55,.8)" strokeWidth="1.4" />
//                         </svg>
//                         Vezi
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const G = {
//   gold: '#D4AF37',
//   goldLight: '#F5D678',
//   goldDim: 'rgba(212,175,55,.55)',
//   goldFaint: 'rgba(212,175,55,.12)',
//   goldBorder: 'rgba(212,175,55,.2)',
//   bg: '#080603',
//   surface: 'rgba(212,175,55,.04)',
//   text: '#F5E6A8',
//   textDim: 'rgba(245,230,168,.5)',
// };

// const styles: Record<string, React.CSSProperties> = {
//   wrapper: {
//     fontFamily: "'Lato', sans-serif",
//     color: G.text,
//     width: '100%',
//     maxWidth: 900,
//     margin: '0 auto',
//     boxSizing: 'border-box',
//     overflowX: 'hidden',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     gap: 12,
//   },
//   headerLabel: {
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     letterSpacing: '.3em',
//     textTransform: 'uppercase',
//     color: G.goldDim,
//     marginBottom: 4,
//   },
//   title: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(22px,4vw,34px)',
//     fontWeight: 300,
//     fontStyle: 'italic',
//     color: G.gold,
//     margin: 0,
//     letterSpacing: '.04em',
//   },
//   headerIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     background: G.goldFaint,
//     border: `1px solid ${G.goldBorder}`,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0,
//   },
//   divider: {
//     height: 1,
//     background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.3),transparent)',
//     margin: '14px 0 20px',
//   },
//   card: {
//     background: G.surface,
//     border: `1px solid ${G.goldBorder}`,
//     borderRadius: 14,
//     overflow: 'hidden',
//     marginBottom: 14,
//     backdropFilter: 'blur(8px)',
//   },
//   cardInner: {
//     padding: 'clamp(16px,3vw,24px)',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 10,
//   },
//   statusIconWrap: {
//     width: 48,
//     height: 48,
//     borderRadius: '50%',
//     background: 'rgba(212,175,55,.08)',
//     border: `1px solid ${G.goldBorder}`,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardTitle: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(16px,3vw,22px)',
//     fontStyle: 'italic',
//     fontWeight: 400,
//     color: G.text,
//     margin: 0,
//   },
//   cardDesc: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(13px,2vw,15px)',
//     fontStyle: 'italic',
//     color: G.textDim,
//     lineHeight: 1.7,
//     margin: 0,
//   },
//   consentLabel: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: 12,
//     cursor: 'pointer',
//     padding: '12px 14px',
//     background: 'rgba(212,175,55,.06)',
//     border: `1px solid ${G.goldBorder}`,
//     borderRadius: 10,
//   },
//   checkbox: {
//     width: 18,
//     height: 18,
//     borderRadius: 4,
//     border: `1.5px solid rgba(212,175,55,.4)`,
//     background: 'transparent',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0,
//     marginTop: 1,
//     transition: 'all .2s',
//   },
//   checkboxChecked: {
//     background: G.gold,
//     borderColor: G.gold,
//   },
//   consentText: {
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.06em',
//     color: 'rgba(212,175,55,.7)',
//     lineHeight: 1.6,
//   },
//   goldBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//     padding: '12px 20px',
//     borderRadius: 8,
//     background: 'linear-gradient(135deg,#8B6914 0%,#D4AF37 40%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',
//     color: '#0A0803',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 11,
//     fontWeight: 700,
//     letterSpacing: '.16em',
//     textTransform: 'uppercase',
//     border: 'none',
//     cursor: 'pointer',
//     boxShadow: '0 8px 28px rgba(212,175,55,.3)',
//     width: '100%',
//   } as React.CSSProperties,
//   ghostBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 7,
//     padding: '9px 16px',
//     borderRadius: 8,
//     background: G.goldFaint,
//     border: `1px solid ${G.goldBorder}`,
//     color: G.gold,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     fontWeight: 600,
//     letterSpacing: '.12em',
//     cursor: 'pointer',
//     whiteSpace: 'nowrap',
//   } as React.CSSProperties,
//   statusBadgeActive: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 8,
//     padding: '5px 14px',
//     borderRadius: 100,
//     background: 'rgba(76,175,80,.12)',
//     border: '1px solid rgba(76,175,80,.3)',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.18em',
//     textTransform: 'uppercase',
//     color: '#81c784',
//   },
//   statusBadgeExpired: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 8,
//     padding: '5px 14px',
//     borderRadius: 100,
//     background: 'rgba(220,60,60,.1)',
//     border: '1px solid rgba(220,60,60,.25)',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.18em',
//     textTransform: 'uppercase',
//     color: '#ef9a9a',
//   },
//   statusBadgeDeleted: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 8,
//     padding: '5px 14px',
//     borderRadius: 100,
//     background: 'rgba(212,175,55,.06)',
//     border: `1px solid ${G.goldBorder}`,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.18em',
//     textTransform: 'uppercase',
//     color: G.goldDim,
//   },
//   statusDot: {
//     width: 7,
//     height: 7,
//     borderRadius: '50%',
//     background: '#81c784',
//     display: 'inline-block',
//     boxShadow: '0 0 6px #81c784',
//     flexShrink: 0,
//   },
//   timerBadge: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 6,
//     padding: '5px 12px',
//     borderRadius: 100,
//     background: 'rgba(212,175,55,.08)',
//     border: `1px solid ${G.goldBorder}`,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 10,
//     letterSpacing: '.12em',
//     color: G.gold,
//     whiteSpace: 'nowrap',
//   },
//   galleryCount: {
//     fontFamily: "'Cormorant Garamond',serif",
//     fontSize: 'clamp(16px,3vw,22px)',
//     fontStyle: 'italic',
//     color: G.text,
//     margin: 0,
//     fontWeight: 300,
//   },
//   gallerySubCount: {
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     letterSpacing: '.22em',
//     textTransform: 'uppercase',
//     color: G.goldDim,
//     marginTop: 2,
//   },
//   photoCard: {
//     position: 'relative',
//     aspectRatio: '1',
//     borderRadius: 10,
//     overflow: 'hidden',
//     border: `1px solid ${G.goldBorder}`,
//     background: '#0A0803',
//     cursor: 'pointer',
//   } as React.CSSProperties,
//   photoImg: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     display: 'block',
//     transition: 'transform .4s ease',
//   } as React.CSSProperties,
//   photoOverlay: {
//     position: 'absolute',
//     inset: 0,
//     background: 'linear-gradient(to top, rgba(5,4,1,.92) 0%, rgba(5,4,1,.4) 50%, transparent 100%)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     gap: 5,
//     padding: 8,
//     opacity: 0,
//     transition: 'opacity .3s ease',
//   } as React.CSSProperties,
//   dlBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 5,
//     padding: '6px 12px',
//     borderRadius: 6,
//     background: 'rgba(212,175,55,.12)',
//     border: `1px solid rgba(212,175,55,.35)`,
//     color: G.gold,
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     fontWeight: 600,
//     letterSpacing: '.1em',
//     cursor: 'pointer',
//     width: '100%',
//     justifyContent: 'center',
//     transition: 'all .2s',
//   } as React.CSSProperties,
//   viewBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: 5,
//     padding: '5px 12px',
//     borderRadius: 6,
//     background: 'rgba(255,255,255,.06)',
//     border: '1px solid rgba(255,255,255,.12)',
//     color: 'rgba(245,230,168,.7)',
//     fontFamily: "'Cinzel',serif",
//     fontSize: 9,
//     letterSpacing: '.1em',
//     textDecoration: 'none',
//     width: '100%',
//     justifyContent: 'center',
//     transition: 'all .2s',
//   } as React.CSSProperties,
//   emptyState: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '40px 20px',
//     background: G.surface,
//     border: `1px dashed ${G.goldBorder}`,
//     borderRadius: 14,
//     textAlign: 'center',
//   } as React.CSSProperties,
// };
"use client";
import React, { useState, useEffect, useCallback } from 'react';

export const PhotosSection = ({ initialData, orderId, onSave }: any) => {
  const [status, setStatus] = useState(initialData?.gallery_status || 'inactive');
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
      const data = await res.json();
      if (data.photos) setPhotos(data.photos);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    setStatus(initialData?.gallery_status || 'inactive');
    if (initialData?.photos_expires_at && initialData?.gallery_status === 'active') {
      const timer = setInterval(() => {
        const diff = +new Date(initialData.photos_expires_at) - +new Date();
        if (diff <= 0) { setTimeLeft("EXPIRAT"); setStatus('expired'); clearInterval(timer); }
        else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / 1000 / 60) % 60);
          setTimeLeft(`${d}z ${h}h ${m}m`);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [initialData]);

  useEffect(() => {
    if ((status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted') {
      fetchPhotos();
    }
  }, [status, fetchPhotos, initialData]);

  const handleActivate = async () => {
    if (!consentChecked) { alert("Trebuie să accepți termenii pentru a activa."); return; }
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    try {
      await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          isPhotosActive: true,
          gallery_status: 'active',
          photos_expires_at: expiresAt,
          photos_activated_at: new Date().toISOString(),
          photo_consent_accepted: true
        }),
      });
      onSave();
    } catch (e) { console.error(e); }
  };

  const handlePayment = async (type: 'extend' | 'unlock' | 'new_album') => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, type }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) { alert("Eroare plată"); }
    finally { setLoading(false); }
  };

  const handleDownloadSingle = async (photo: any) => {
    setDownloadingId(photo.id);
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
      a.download = `foto-nunta-${photo.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
      window.open(photo.url, '_blank');
    }
    setDownloadingId(null);
  };

  const handleDownloadAll = async () => {
    if (photos.length === 0) return;
    setDownloadingAll(true);
    try {
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        try {
          const response = await fetch(photo.url);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const ext = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
          a.download = `foto-nunta-${String(i + 1).padStart(3, '0')}.${ext}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (e) { console.error(`Eroare la descărcarea pozei ${i + 1}:`, e); }
      }
    } catch (e) { console.error(e); }
    setDownloadingAll(false);
  };

  const showGallery = (status === 'active' || initialData?.is_unlock_paid) && status !== 'deleted';

  return (
    <div className="w-full pb-10">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        .phs-fade { animation: fadeUp 0.4s ease both; }
        @keyframes spin { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
        .phs-spin { animation: spin 1s linear infinite; }
        .phs-card:hover .phs-overlay { opacity: 1 !important; }
        .phs-card:hover .phs-img { transform: scale(1.05); }
      `}</style>

      {/* Header */}
      <div className="mb-10 phs-fade">
        <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.38em] uppercase text-[#C9A84C]/40 mb-3">
          Panou Control
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-light italic text-[#EDE0C4] leading-tight">
          Galerie Foto
        </h1>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent mb-8" />

      {/* Status Cards */}
      {status === 'inactive' && (
        <div className="rounded-2xl border border-[#C9A84C]/15 bg-[#0E0B06] overflow-hidden mb-8 phs-fade">
          <div className="px-6 sm:px-8 py-8">
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl italic font-light text-[#EDE0C4] mb-2">
              Activare Galerie Foto
            </h3>
            <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[#EDE0C4]/50 leading-relaxed mb-6">
              Activând galeria, confirm că sunt beneficiarul exclusiv al fotografiilor și îmi asum responsabilitatea legală pentru utilizarea lor.
            </p>

            <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-[#C9A84C]/12 bg-[#C9A84C]/03 hover:border-[#C9A84C]/22 transition-all duration-200 mb-6">
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                  consentChecked ? 'bg-[#C9A84C]/25 border-[#C9A84C]' : 'border-[#C9A84C]/22'
                }`}
              >
                {consentChecked && <span className="text-[#C9A84C] text-[10px] font-bold">✓</span>}
              </div>
              <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} className="sr-only" />
              <span className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.08em] text-[#C9A84C]/65 leading-relaxed">
                Accept responsabilitatea integrală și termenii de stocare (30 zile).
              </span>
            </label>

            <GoldButton disabled={!consentChecked} onClick={handleActivate}>
              Activează 3 Zile Gratuit
            </GoldButton>
          </div>
        </div>
      )}

      {status === 'active' && (
        <div className="rounded-2xl border border-[#C9A84C]/18 bg-[#C9A84C]/04 overflow-hidden mb-8 phs-fade">
          <div className="px-6 sm:px-8 py-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/08 border border-emerald-500/22 font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.18em] uppercase text-emerald-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                Activ
              </span>
              {timeLeft && (
                <span className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.14em] text-[#C9A84C]/60 bg-[#C9A84C]/06 border border-[#C9A84C]/14 rounded-full px-3 py-1.5">
                  {timeLeft} rămase
                </span>
              )}
            </div>
            {new Date(initialData.photos_expires_at).getTime() - new Date(initialData.photos_activated_at).getTime() < 4 * 24 * 60 * 60 * 1000 && (
              <GoldButton onClick={() => handlePayment('extend')}>
                Prelungește cu 5 Zile — 150 RON
              </GoldButton>
            )}
          </div>
        </div>
      )}

      {status === 'expired' && !initialData?.is_unlock_paid && (
        <div className="rounded-2xl border border-red-500/22 bg-red-500/04 overflow-hidden mb-8 phs-fade">
          <div className="px-6 sm:px-8 py-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/08 border border-red-500/22 font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.18em] uppercase text-red-400/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              Timp Expirat
            </span>
            <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[#EDE0C4]/50 mb-5 leading-relaxed">
              Upload-ul este blocat. Poți debloca vizualizarea pentru încă 5 zile.
            </p>
            <button
              onClick={() => handlePayment('unlock')}
              className="w-full py-4 rounded-xl font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.22em] uppercase font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#7A1F1F,#c53030,#e05555,#c53030,#7A1F1F)', boxShadow: '0 8px 28px rgba(192,53,53,0.28)' }}
            >
              Deblochează Vizualizare — 200 RON
            </button>
          </div>
        </div>
      )}

      {status === 'deleted' && (
        <div className="rounded-2xl border border-[#C9A84C]/10 bg-[#0E0B06] overflow-hidden mb-8 phs-fade">
          <div className="px-6 sm:px-8 py-6">
            <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.2em] uppercase text-[#C9A84C]/40 mb-2">Album Șters Definitiv</p>
            <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[#EDE0C4]/45 mb-5 leading-relaxed">
              Cele 30 de zile au trecut. Poți porni un album nou.
            </p>
            <GoldButton onClick={() => handlePayment('new_album')}>
              Creează Album Nou — 400 RON
            </GoldButton>
          </div>
        </div>
      )}

      {/* Gallery */}
      {showGallery && (
        <div className="phs-fade">
          {/* Gallery header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[#EDE0C4]">
                {photos.length} {photos.length === 1 ? 'fotografie' : 'fotografii'}
              </p>
              <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.22em] uppercase text-[#C9A84C]/40 mt-1">
                Album privat
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {photos.length > 0 && (
                <button
                  onClick={handleDownloadAll}
                  disabled={downloadingAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.16em] uppercase font-semibold transition-all duration-200 disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg,#7A5C1A,#C9A84C,#E8C96A,#C9A84C,#7A5C1A)',
                    color: '#0A0804',
                    boxShadow: '0 4px 18px rgba(201,168,76,0.25)',
                  }}
                >
                  {downloadingAll ? (
                    <span className="w-3 h-3 rounded-full border border-[#0A0804]/40 border-t-[#0A0804] phs-spin" />
                  ) : null}
                  {downloadingAll ? 'Descărcând...' : 'Descarcă Toate'}
                </button>
              )}
              <button
                onClick={fetchPhotos}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#C9A84C]/18 bg-[#C9A84C]/06 hover:bg-[#C9A84C]/12 hover:border-[#C9A84C]/30 text-[#C9A84C]/70 hover:text-[#C9A84C] font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.16em] uppercase font-semibold transition-all duration-200"
              >
                {loading ? <span className="w-3 h-3 rounded-full border border-[#C9A84C]/40 border-t-[#C9A84C] phs-spin" /> : null}
                Actualizează
              </button>
            </div>
          </div>

          {photos.length === 0 && !loading ? (
            <div className="rounded-2xl border border-dashed border-[#C9A84C]/15 bg-[#C9A84C]/02 py-20 text-center">
              <p className="font-[family-name:var(--font-cormorant)] text-xl italic font-light text-[#C9A84C]/30 mb-2">
                Nicio fotografie încă
              </p>
              <p className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.25em] uppercase text-[#C9A84C]/18">
                Fotografiile invitaților vor apărea aici
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {photos.map((p: any) => (
                <div
                  key={p.id}
                  className="phs-card relative rounded-xl overflow-hidden border border-[#C9A84C]/12 bg-[#0A0804] cursor-pointer group"
                  style={{ aspectRatio: '1' }}
                >
                  <img
                    src={p.url}
                    alt="Nuntă"
                    className="phs-img w-full h-full object-cover block transition-transform duration-500"
                  />
                  <div
                    className="phs-overlay absolute inset-0 flex flex-col items-center justify-end gap-2 p-3 opacity-0 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.4) 55%, transparent 100%)' }}
                  >
                    <button
                      onClick={() => handleDownloadSingle(p)}
                      disabled={downloadingId === p.id}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#C9A84C]/14 hover:bg-[#C9A84C]/22 border border-[#C9A84C]/30 text-[#C9A84C] font-[family-name:var(--font-cinzel)] text-[8px] tracking-[0.12em] uppercase font-semibold transition-all duration-200 disabled:opacity-50"
                    >
                      {downloadingId === p.id
                        ? <span className="w-3 h-3 rounded-full border border-[#C9A84C]/40 border-t-[#C9A84C] phs-spin shrink-0" />
                        : null
                      }
                      {downloadingId === p.id ? '...' : 'Descarcă'}
                    </button>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/06 hover:bg-white/10 border border-white/12 text-[#EDE0C4]/65 font-[family-name:var(--font-cinzel)] text-[8px] tracking-[0.12em] uppercase font-semibold transition-all duration-200"
                    >
                      Vezi
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom breathing room */}
          <div className="h-12" />
        </div>
      )}
    </div>
  );
};

const GoldButton = ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full py-4 rounded-xl font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.22em] uppercase font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
    style={{
      background: disabled ? 'rgba(201,168,76,0.15)' : 'linear-gradient(135deg,#7A5C1A 0%,#C9A84C 40%,#E8C96A 55%,#C9A84C 70%,#7A5C1A 100%)',
      color: disabled ? 'rgba(201,168,76,0.4)' : '#0A0804',
      boxShadow: disabled ? 'none' : '0 8px 28px rgba(201,168,76,0.24)',
    }}
  >
    {children}
  </button>
);
