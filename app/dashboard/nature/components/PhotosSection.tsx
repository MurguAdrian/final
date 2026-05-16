
// "use client";
// import React, { useState, useEffect, useCallback, useRef } from 'react';

// interface Photo {
//   id: string;
//   url: string;
// }

// interface PhotosSectionProps {
//   initialData: any;
//   orderId: any;
//   onSave: () => void;
// }

// type GalleryStatus = 'inactive' | 'active' | 'expired';

// export const PhotosSection = ({ initialData: _initialData, orderId, onSave }: PhotosSectionProps) => {
//   const [initialData, setInitialData]       = useState(_initialData);
//   const [status, setStatus]                 = useState<GalleryStatus | null>(null);
//   const [photos, setPhotos]                 = useState<Photo[]>([]);
//   const [loading, setLoading]               = useState(false);
//   const [timeLeft, setTimeLeft]             = useState('');
//   const [consentChecked, setConsentChecked] = useState(false);
//   const [downloadingAll, setDownloadingAll] = useState(false);
//   const [downloadingId, setDownloadingId]   = useState<string | null>(null);
//   const [photoCount, setPhotoCount]         = useState<number>(0);
//   const tickerRef = useRef<NodeJS.Timeout | null>(null);

//   // ─────────────────────────────
//   // POLL DB – la fiecare 30s
//   // ─────────────────────────────
//   const fetchSettings = useCallback(async () => {
//     try {
//       const res  = await fetch(`/api/photos/settings?orderId=${orderId}`);
//       const data = await res.json();
//       if (data?.settings) setInitialData(data.settings);
//     } catch (e) { console.error('Poll error:', e); }
//   }, [orderId]);

//   useEffect(() => {
//     const interval = setInterval(fetchSettings, 30000);
//     return () => clearInterval(interval);
//   }, [fetchSettings]);

//   // ─────────────────────────────
//   // STATE MACHINE
//   // Activ = gallery_status='active' ȘI photos_expires_at > now
//   // Expirat = orice altceva (inclusiv inactive din start)
//   // ─────────────────────────────
//   useEffect(() => {
//     if (tickerRef.current) clearInterval(tickerRef.current);

//     const start = initialData?.photos_activated_at;
//     const expiresAt = initialData?.photos_expires_at;
//     const dbStatus = initialData?.gallery_status;

//     if (!start || dbStatus === 'inactive' || !expiresAt) {
//       setStatus('inactive');
//       setTimeLeft('');
//       return;
//     }

//     const tick = () => {
//       const now = Date.now();
//       const softExpiry = new Date(expiresAt).getTime();

//       if (now >= softExpiry) {
//         setStatus('expired');
//         setTimeLeft('EXPIRAT');
//       } else {
//         setStatus('active');
//         const diff = softExpiry - now;
//         const d = Math.floor(diff / 86400000);
//         const h = Math.floor((diff / 3600000) % 24);
//         const m = Math.floor((diff / 60000) % 60);
//         setTimeLeft(`${d}z ${h}h ${m}m rămase`);
//       }
//     };

//     tick();
//     tickerRef.current = setInterval(tick, 60000);
//     return () => { if (tickerRef.current) clearInterval(tickerRef.current); };
//   }, [initialData]);

//   // ─────────────────────────────
//   // LOAD PHOTOS – mereu, indiferent de status
//   // ─────────────────────────────
//   const fetchPhotos = useCallback(async () => {
//     if (!orderId) return;
//     setLoading(true);
//     try {
//       const res  = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
//       const data = await res.json();
//       if (data.photos) {
//         setPhotos(data.photos);
//         setPhotoCount(data.photos.length);
//       }
//     } catch (e) { console.error(e); }
//     setLoading(false);
//   }, [orderId]);

//   useEffect(() => {
//     // Încărcăm pozele mereu (le afișăm și în starea expired, blocate)
//     if (initialData?.photos_activated_at) {
//       fetchPhotos();
//     }
//   }, [fetchPhotos, initialData]);

//   // ─────────────────────────────
//   // ACTIVATE – prima activare gratuită
//   // ─────────────────────────────
//   const handleActivate = async () => {
//     if (!consentChecked) { alert('Trebuie să accepți termenii pentru a activa.'); return; }
//     try {
//       await fetch('/api/dashboard/personalize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           orderId,
//           isPhotosActive:         true,
//           gallery_status:         'active',
//           photos_activated_at:    new Date().toISOString(),
//           photos_expires_at:      new Date(Date.now() + 3 * 86400000).toISOString(),
//           photo_consent_accepted: true,
//           is_unlock_paid:         false,
//         }),
//       });
//       await fetchSettings();
//     } catch (e) { console.error(e); }
//   };

//   // ─────────────────────────────
//   // REACTIVATE – plată 200 RON → Stripe
//   // ─────────────────────────────
//   const handleReactivate = async () => {
//     setLoading(true);
//     try {
//       const res  = await fetch('/api/checkout/gallery', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId, type: 'reactivate' }),
//       });
//       const data = await res.json();
//       if (data.url) window.location.href = data.url;
//     } catch { alert('Eroare la plată'); }
//     setLoading(false);
//   };

//   // ─────────────────────────────
//   // DOWNLOAD
//   // ─────────────────────────────
//   const handleDownloadSingle = async (photo: Photo) => {
//     setDownloadingId(photo.id);
//     try {
//       const response = await fetch(photo.url);
//       const blob     = await response.blob();
//       const url      = window.URL.createObjectURL(blob);
//       const a        = document.createElement('a');
//       a.href         = url;
//       const ext      = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
//       a.download     = `foto-nunta-${photo.id}.${ext}`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch {
//       window.open(photo.url, '_blank');
//     }
//     setDownloadingId(null);
//   };

//   const handleDownloadAll = async () => {
//     if (photos.length === 0) return;
//     setDownloadingAll(true);
//     for (let i = 0; i < photos.length; i++) {
//       const photo = photos[i];
//       try {
//         const response = await fetch(photo.url);
//         const blob     = await response.blob();
//         const url      = window.URL.createObjectURL(blob);
//         const a        = document.createElement('a');
//         a.href         = url;
//         const ext      = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
//         a.download     = `foto-nunta-${String(i + 1).padStart(3, '0')}.${ext}`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//         await new Promise(resolve => setTimeout(resolve, 300));
//       } catch (e) { console.error(`Eroare poza ${i + 1}:`, e); }
//     }
//     setDownloadingAll(false);
//   };

//   const isFirstActivation = !initialData?.photos_activated_at;
//   const hasEverBeenActivated = !!initialData?.photos_activated_at;

//   return (
//     <div style={styles.wrapper}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//         input, textarea, select { font-size: 16px !important; -webkit-text-size-adjust: 100%; }
//         .photos-section-wrap { overscroll-behavior: contain; -webkit-overflow-scrolling: auto; }
//         .photo-card:hover .photo-overlay { opacity: 1 !important; }
//         .photo-card:hover img            { transform: scale(1.06); }
//         .gold-btn:hover                  { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.45) !important; }
//         .ghost-btn:hover                 { background: rgba(212,175,55,.12) !important; border-color: rgba(212,175,55,.5) !important; }
//         .dl-btn:hover                    { background: rgba(212,175,55,.18) !important; }
//         @keyframes shimmer { 0%{ background-position: -400px 0 } 100%{ background-position: 400px 0 } }
//         @keyframes spin    { from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
//         @keyframes fadeIn  { from{ opacity: 0; transform: translateY(8px) } to{ opacity: 1; transform: translateY(0) } }
//         @keyframes fogPulse { 0%,100%{ opacity:.92 } 50%{ opacity:.82 } }
//         .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
//         @media (max-width: 500px) { .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; } }
//         @media (max-width: 600px) {
//           .gallery-header-row  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
//           .gallery-header-btns { width: 100% !important; }
//           .gallery-header-btns button { flex: 1 !important; justify-content: center !important; }
//           .dl-all-btn { width: 100% !important; justify-content: center !important; }
//         }
//         .photos-section-wrap { width: 100%; max-width: 900px; box-sizing: border-box; overflow-x: hidden; }
//         .locked-photo { position: relative; aspect-ratio: 1; border-radius: 10px; overflow: hidden; border: 1px solid rgba(212,175,55,.15); background: #0A0803; }
//         .locked-photo img { width: 100%; height: 100%; object-fit: cover; display: block; filter: blur(18px) brightness(0.35) saturate(0.3); transform: scale(1.1); }
//         .locked-photo .fog-layer { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(5,4,1,0.55) 0%, rgba(5,4,1,0.88) 100%); animation: fogPulse 4s ease-in-out infinite; }
//         .locked-photo .lock-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
//       `}</style>

//       <div className="photos-section-wrap">

//         {/* ── HEADER ── */}
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

//         {/* ── INACTIVE (niciodată activat) ── */}
//         {isFirstActivation && (
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
//                 Activează galeria foto pentru 3 zile gratuit. Invitații tăi vor putea încărca fotografii direct de pe telefon în timpul nunții.
//               </p>
//               <label style={styles.consentLabel}>
//                 <div style={{ ...styles.checkbox, ...(consentChecked ? styles.checkboxChecked : {}) }}>
//                   {consentChecked && (
//                     <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}>
//                       <path d="M2 6L5 9L10 3" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   )}
//                 </div>
//                 <input
//                   type="checkbox"
//                   checked={consentChecked}
//                   onChange={e => setConsentChecked(e.target.checked)}
//                   style={{ display: 'none' }}
//                 />
//                 <span style={styles.consentText}>Accept termenii — fotografiile sunt stocate pe durata contractului (12 luni).</span>
//               </label>
//               <button
//                 type="button"
//                 onClick={handleActivate}
//                 disabled={!consentChecked}
//                 className="gold-btn"
//                 style={{ ...styles.goldBtn, opacity: consentChecked ? 1 : 0.45, cursor: consentChecked ? 'pointer' : 'not-allowed', transition: 'all .25s' }}
//               >
//                 <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
//                   <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 Activează 3 Zile Gratuit
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ── ACTIVE ── */}
//         {!isFirstActivation && status === 'active' && (
//           <div style={styles.card}>
//             <div style={styles.cardInner}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
//                 <div style={styles.statusBadgeActive}>
//                   <span style={styles.statusDot} />
//                   Activ — Invitații pot încărca poze
//                 </div>
//                 <div style={styles.timerBadge}>
//                   <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
//                     <circle cx="8" cy="8" r="6.5" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity=".7" />
//                     <path d="M8 5 L8 8.5 L10.5 10" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
//                   </svg>
//                   {timeLeft}
//                 </div>
//               </div>
//               <p style={{ ...styles.cardDesc, marginTop: 0 }}>
//                 Galeria este activă. Invitații tăi văd butonul de upload pe invitație și pot încărca fotografii (doar imagini, fără video).
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ── EXPIRED (a mai fost activ) ── */}
//         {!isFirstActivation && status === 'expired' && (
//           <div style={{ ...styles.card, borderColor: 'rgba(212,175,55,.25)' }}>
//             <div style={styles.cardInner}>
//               <div style={styles.statusBadgeExpired}>
//                 <span style={{ ...styles.statusDot, background: '#c8a800', boxShadow: '0 0 6px #c8a800' }} />
//                 Galerie Inactivă
//               </div>
//               <p style={{ ...styles.cardDesc, marginTop: 4 }}>
//                 Perioada de 3 zile a expirat. Invitații nu mai pot încărca poze și butonul a dispărut de pe invitație. Reactivează pentru alte 3 zile pentru a redeschide galeria și a permite noi încărcări în același album.
//               </p>
//               <button
//                 type="button"
//                 onClick={handleReactivate}
//                 disabled={loading}
//                 className="gold-btn"
//                 style={{ ...styles.goldBtn, marginTop: 4, transition: 'all .25s', opacity: loading ? 0.7 : 1 }}
//               >
//                 {loading ? (
//                   <>
//                     <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
//                       <circle cx="8" cy="8" r="6" stroke="#0A0803" strokeWidth="1.8" strokeDasharray="20 10" />
//                     </svg>
//                     Se procesează...
//                   </>
//                 ) : (
//                   <>
//                     <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
//                       <path d="M2 10C2 5.58 5.58 2 10 2s8 3.58 8 8-3.58 8-8 8" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" />
//                       <path d="M2 10 L5 7 M2 10 L5 13" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     Reactivează Galeria — 200 RON
//                   </>
//                 )}
//               </button>
//               <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.1em', color: 'rgba(212,175,55,.35)', marginTop: 2, textAlign: 'center' }}>
//                 Același album · Pozele existente păstrate · Alte 3 zile de upload
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ── GALLERY (mereu vizibilă dacă a fost vreodată activat) ── */}
//         {hasEverBeenActivated && (
//           <div style={{ marginTop: 28, animation: 'fadeIn .5s ease both' }}>

//             {/* Header galerie */}
//             <div className="gallery-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
//               <div>
//                 <p style={styles.galleryCount}>
//                   {photoCount} {photoCount === 1 ? 'fotografie' : 'fotografii'}
//                 </p>
//                 <p style={styles.gallerySubCount}>
//                   {status === 'active' ? 'albumul tău privat · activ' : 'albumul tău privat · inactiv'}
//                 </p>
//               </div>
//               {status === 'active' && (
//                 <div className="gallery-header-btns" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                   {photos.length > 0 && (
//                     <button
//                       type="button"
//                       onClick={handleDownloadAll}
//                       disabled={downloadingAll}
//                       className="gold-btn dl-all-btn"
//                       style={{ ...styles.goldBtn, padding: '9px 18px', fontSize: 11, gap: 7, transition: 'all .25s', opacity: downloadingAll ? 0.7 : 1, width: 'auto' }}
//                     >
//                       {downloadingAll ? (
//                         <>
//                           <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
//                             <circle cx="8" cy="8" r="6" stroke="#0A0803" strokeWidth="1.8" strokeDasharray="20 10" />
//                           </svg>
//                           Descărcând...
//                         </>
//                       ) : (
//                         <>
//                           <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                             <path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M2 14 L14 14" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" />
//                           </svg>
//                           Descarcă Toate
//                         </>
//                       )}
//                     </button>
//                   )}
//                   <button
//                     type="button"
//                     onClick={fetchPhotos}
//                     className="ghost-btn"
//                     style={{ ...styles.ghostBtn, transition: 'all .25s' }}
//                   >
//                     {loading ? (
//                       <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
//                         <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="20 10" />
//                       </svg>
//                     ) : (
//                       <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                         <path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
//                         <path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     )}
//                     Refresh
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* ── GRID POZE ── */}
//             {photos.length === 0 && !loading ? (
//               <div style={styles.emptyState}>
//                 <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38, marginBottom: 12, opacity: .4 }}>
//                   <rect x="4" y="14" width="40" height="28" rx="5" stroke="#D4AF37" strokeWidth="1.5" />
//                   <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
//                   <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.2" />
//                 </svg>
//                 <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(212,175,55,.4)', marginBottom: 4 }}>
//                   Nicio fotografie încă
//                 </p>
//                 <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.18em', color: 'rgba(212,175,55,.25)', marginBottom: 0 }}>
//                   FOTOGRAFIILE INVITAȚILOR VOR APĂREA AICI
//                 </p>
//               </div>
//             ) : status === 'active' ? (
//               /* GALERIE DEBLOCATĂ */
//               <div className="gallery-grid">
//                 {photos.map((p: Photo) => (
//                   <div key={p.id} className="photo-card" style={styles.photoCard}>
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img src={p.url} alt="Nunta" style={styles.photoImg} />
//                     <div className="photo-overlay" style={styles.photoOverlay}>
//                       <button
//                         type="button"
//                         onClick={() => handleDownloadSingle(p)}
//                         disabled={downloadingId === p.id}
//                         className="dl-btn"
//                         style={styles.dlBtn}
//                       >
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
//             ) : (
//               /* GALERIE BLOCATĂ — ceață + lacăt */
//               <>
//                 <div style={{
//                   display: 'flex', alignItems: 'center', gap: 8,
//                   padding: '10px 14px', marginBottom: 14,
//                   background: 'rgba(212,175,55,.06)',
//                   border: '1px solid rgba(212,175,55,.18)',
//                   borderRadius: 10,
//                 }}>
//                   <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
//                     <rect x="5" y="9" width="10" height="8" rx="2" stroke="rgba(212,175,55,.6)" strokeWidth="1.4" />
//                     <path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="rgba(212,175,55,.6)" strokeWidth="1.4" strokeLinecap="round" />
//                     <circle cx="10" cy="13" r="1" fill="rgba(212,175,55,.6)" />
//                   </svg>
//                   <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.14em', color: 'rgba(212,175,55,.55)' }}>
//                     ACCES BLOCAT · Reactivează galeria pentru a vizualiza și descărca fotografiile
//                   </span>
//                 </div>
//                 <div className="gallery-grid">
//                   {photos.map((p: Photo) => (
//                     <div key={p.id} className="locked-photo">
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img src={p.url} alt="" />
//                       <div className="fog-layer" />
//                       <div className="lock-icon">
//                         <svg viewBox="0 0 32 32" fill="none" style={{ width: 28, height: 28, opacity: 0.85 }}>
//                           <rect x="7" y="14" width="18" height="14" rx="3" fill="rgba(212,175,55,.15)" stroke="#D4AF37" strokeWidth="1.5" />
//                           <path d="M11 14V11a5 5 0 0 1 10 0v3" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
//                           <circle cx="16" cy="21" r="2" fill="#D4AF37" fillOpacity=".8" />
//                         </svg>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════ STYLES ══ */

// const G = {
//   gold:      '#D4AF37',
//   goldDim:   'rgba(212,175,55,.55)',
//   goldFaint: 'rgba(212,175,55,.12)',
//   goldBorder:'rgba(212,175,55,.2)',
//   text:      '#F5E6A8',
//   textDim:   'rgba(245,230,168,.5)',
// };

// const styles: Record<string, React.CSSProperties> = {
//   wrapper: { fontFamily: "'Lato', sans-serif", color: G.text, width: '100%', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box', overflowX: 'hidden' },
//   header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 12 },
//   headerLabel: { fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: G.goldDim, marginBottom: 4 },
//   title: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 300, fontStyle: 'italic', color: G.gold, margin: 0, letterSpacing: '.04em' },
//   headerIcon: { width: 48, height: 48, borderRadius: 12, background: G.goldFaint, border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
//   divider: { height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.3),transparent)', margin: '14px 0 20px' },
//   card: { background: 'rgba(212,175,55,.04)', border: `1px solid ${G.goldBorder}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 },
//   cardInner: { padding: 'clamp(16px,3vw,24px)', display: 'flex', flexDirection: 'column', gap: 10 },
//   statusIconWrap: { width: 48, height: 48, borderRadius: '50%', background: 'rgba(212,175,55,.08)', border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
//   cardTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', fontWeight: 400, color: G.text, margin: 0 },
//   cardDesc: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,2vw,15px)', fontStyle: 'italic', color: G.textDim, lineHeight: 1.7, margin: 0 },
//   consentLabel: { display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px', background: 'rgba(212,175,55,.06)', border: `1px solid ${G.goldBorder}`, borderRadius: 10 },
//   checkbox: { width: 18, height: 18, borderRadius: 4, border: '1.5px solid rgba(212,175,55,.4)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all .2s' },
//   checkboxChecked: { background: '#D4AF37', borderColor: '#D4AF37' },
//   consentText: { fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.06em', color: 'rgba(212,175,55,.7)', lineHeight: 1.6 },
//   goldBtn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, background: 'linear-gradient(135deg,#8B6914 0%,#D4AF37 40%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color: '#0A0803', fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(212,175,55,.3)', width: '100%' } as React.CSSProperties,
//   ghostBtn: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 8, background: G.goldFaint, border: `1px solid ${G.goldBorder}`, color: G.gold, fontFamily: "'Cinzel',serif", fontSize: 10, fontWeight: 600, letterSpacing: '.12em', cursor: 'pointer', whiteSpace: 'nowrap' } as React.CSSProperties,
//   statusBadgeActive: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, background: 'rgba(76,175,80,.12)', border: '1px solid rgba(76,175,80,.3)', fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#81c784' },
//   statusBadgeExpired: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, background: 'rgba(200,168,0,.1)', border: '1px solid rgba(200,168,0,.25)', fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#e8d060' },
//   statusDot: { width: 7, height: 7, borderRadius: '50%', background: '#81c784', display: 'inline-block', boxShadow: '0 0 6px #81c784', flexShrink: 0 },
//   timerBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(212,175,55,.08)', border: `1px solid ${G.goldBorder}`, fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.12em', color: G.gold, whiteSpace: 'nowrap' },
//   galleryCount: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', color: G.text, margin: 0, fontWeight: 300 },
//   gallerySubCount: { fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: G.goldDim, marginTop: 2, marginBottom: 0 },
//   photoCard: { position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden', border: `1px solid ${G.goldBorder}`, background: '#0A0803', cursor: 'pointer' } as React.CSSProperties,
//   photoImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' } as React.CSSProperties,
//   photoOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(5,4,1,.92) 0%,rgba(5,4,1,.4) 50%,transparent 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 5, padding: 8, opacity: 0, transition: 'opacity .3s ease' } as React.CSSProperties,
//   dlBtn: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, background: 'rgba(212,175,55,.12)', border: '1px solid rgba(212,175,55,.35)', color: '#D4AF37', fontFamily: "'Cinzel',serif", fontSize: 9, fontWeight: 600, letterSpacing: '.1em', cursor: 'pointer', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
//   viewBtn: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 6, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(245,230,168,.7)', fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.1em', textDecoration: 'none', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
//   emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'rgba(212,175,55,.04)', border: '1px dashed rgba(212,175,55,.2)', borderRadius: 14, textAlign: 'center' } as React.CSSProperties,
// };
"use client";
import React, { useState, useEffect, useCallback } from 'react';

interface Photo {
  id: string;
  url: string;
}

interface PhotosSectionProps {
  initialData: any;
  orderId: any;
  onSave: () => void;
}

type GalleryStatus = 'inactive' | 'active';

export const PhotosSection = ({ initialData: _initialData, orderId, onSave }: PhotosSectionProps) => {
  const [initialData, setInitialData]       = useState(_initialData);
  const [status, setStatus]                 = useState<GalleryStatus | null>(null);
  const [photos, setPhotos]                 = useState<Photo[]>([]);
  const [loading, setLoading]               = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadingId, setDownloadingId]   = useState<string | null>(null);
  const [photoCount, setPhotoCount]         = useState<number>(0);

  // ─────────────────────────────
  // POLL DB – la fiecare 30s pentru a verifica starea actuală
  // ─────────────────────────────
  const fetchSettings = useCallback(async () => {
    try {
      const res  = await fetch(`/api/photos/settings?orderId=${orderId}`);
      const data = await res.json();
      if (data?.settings) setInitialData(data.settings);
    } catch (e) { console.error('Poll error:', e); }
  }, [orderId]);

  useEffect(() => {
    const interval = setInterval(fetchSettings, 30000);
    return () => clearInterval(interval);
  }, [fetchSettings]);

  // ─────────────────────────────
  // STATE MACHINE SIMPLIFICAT
  // Acum există doar stările: Active sau Inactive (Permanentă)
  // ─────────────────────────────
  useEffect(() => {
    const dbStatus = initialData?.gallery_status;
    const start = initialData?.photos_activated_at;

    if (dbStatus === 'active' || start) {
      setStatus('active');
    } else {
      setStatus('inactive');
    }
  }, [initialData]);

  // ─────────────────────────────
  // LOAD PHOTOS
  // ─────────────────────────────
  const fetchPhotos = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res  = await fetch(`/api/photos/list?orderId=${orderId}&t=${Date.now()}`);
      const data = await res.json();
      if (data.photos) {
        setPhotos(data.photos);
        setPhotoCount(data.photos.length);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    if (initialData?.photos_activated_at) {
      fetchPhotos();
    }
  }, [fetchPhotos, initialData]);

  // ─────────────────────────────
  // ACTIVATE – Activare permanentă pe baza contului
  // ─────────────────────────────
  const handleActivate = async () => {
    if (!consentChecked) { alert('Trebuie să accepți termenii pentru a activa.'); return; }
    try {
      await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          isPhotosActive:         true,
          gallery_status:         'active',
          photos_activated_at:    new Date().toISOString(),
          photo_consent_accepted: true,
          is_unlock_paid:         false,
        }),
      });
      await fetchSettings();
    } catch (e) { console.error(e); }
  };

  // ─────────────────────────────
  // DOWNLOAD
  // ─────────────────────────────
  const handleDownloadSingle = async (photo: Photo) => {
    setDownloadingId(photo.id);
    try {
      const response = await fetch(photo.url);
      const blob     = await response.blob();
      const url      = window.URL.createObjectURL(blob);
      const a        = document.createElement('a');
      a.href         = url;
      const ext      = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
      a.download     = `foto-nunta-${photo.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open(photo.url, '_blank');
    }
    setDownloadingId(null);
  };

  const handleDownloadAll = async () => {
    if (photos.length === 0) return;
    setDownloadingAll(true);
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      try {
        const response = await fetch(photo.url);
        const blob     = await response.blob();
        const url      = window.URL.createObjectURL(blob);
        const a        = document.createElement('a');
        a.href         = url;
        const ext      = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
        a.download     = `foto-nunta-${String(i + 1).padStart(3, '0')}.${ext}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) { console.error(`Eroare poza ${i + 1}:`, e); }
    }
    setDownloadingAll(false);
  };

  const isFirstActivation = !initialData?.photos_activated_at;
  const hasEverBeenActivated = !!initialData?.photos_activated_at;

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input, textarea, select { font-size: 16px !important; -webkit-text-size-adjust: 100%; }
        .photo-card:hover .photo-overlay { opacity: 1 !important; }
        .photo-card:hover img            { transform: scale(1.06); }
        .gold-btn:hover                  { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.45) !important; }
        .ghost-btn:hover                 { background: rgba(212,175,55,.12) !important; border-color: rgba(212,175,55,.5) !important; }
        .dl-btn:hover                    { background: rgba(212,175,55,.18) !important; }
        @keyframes spin    { from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
        @keyframes fadeIn  { from{ opacity: 0; transform: translateY(8px) } to{ opacity: 1; transform: translateY(0) } }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
        @media (max-width: 500px) { .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; } }
        @media (max-width: 600px) {
          .gallery-header-row  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .gallery-header-btns { width: 100% !important; }
          .gallery-header-btns button { flex: 1 !important; justify-content: center !important; }
          .dl-all-btn { width: 100% !important; justify-content: center !important; }
        }
        .photos-section-wrap { width: 100%; max-width: 900px; box-sizing: border-box; overflow-x: hidden; }
      `}</style>

      <div className="photos-section-wrap">

        {/* ── HEADER ── */}
        <div style={styles.header}>
          <div>
            <p style={styles.headerLabel}>Panou Control</p>
            <h2 style={styles.title}>Galerie Foto</h2>
          </div>
          <div style={styles.headerIcon}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: 26, height: 26 }}>
              <rect x="4" y="14" width="40" height="28" rx="5" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".8" />
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".8" strokeLinejoin="round" />
              <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".8" />
              <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".3" />
              <circle cx="37" cy="20" r="2" fill="#D4AF37" fillOpacity=".6" />
            </svg>
          </div>
        </div>

        <div style={styles.divider} />

        {/* ── INACTIVE (Înainte de prima activare) ── */}
        {isFirstActivation && (
          <div style={styles.card}>
            <div style={styles.cardInner}>
              <div style={styles.statusIconWrap}>
                <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
                  <circle cx="20" cy="20" r="18" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".4" />
                  <path d="M20 12 L20 22 M20 27 L20 28" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={styles.cardTitle}>Activare Modul Foto Permanent</h3>
              <p style={styles.cardDesc}>
                Activează galeria foto live. Invitații tăi vor putea încărca fotografii realizate cu telefonul direct în albumul vostru privat, pe toată durata evenimentului.
              </p>
              <label style={styles.consentLabel}>
                <div style={{ ...styles.checkbox, ...(consentChecked ? styles.checkboxChecked : {}) }}>
                  {consentChecked && (
                    <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}>
                      <path d="M2 6L5 9L10 3" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={e => setConsentChecked(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <span style={styles.consentText}>Sunt de acord cu activarea modulului foto pe toată durata existenței contului (12 luni).</span>
              </label>
              <button
                type="button"
                onClick={handleActivate}
                disabled={!consentChecked}
                className="gold-btn"
                style={{ ...styles.goldBtn, opacity: consentChecked ? 1 : 0.45, cursor: consentChecked ? 'pointer' : 'not-allowed', transition: 'all .25s' }}
              >
                <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <path d="M10 3 L10 17 M4 9 L10 3 L16 9" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Activează Galeria Foto Live
              </button>
            </div>
          </div>
        )}

        {/* ── ACTIVE (Fără cronometru sau avertismente de expirare) ── */}
        {!isFirstActivation && status === 'active' && (
          <div style={styles.card}>
            <div style={styles.cardInner}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={styles.statusBadgeActive}>
                  <span style={styles.statusDot} />
                  Galerie Activă permanent
                </div>
              </div>
              <p style={{ ...styles.cardDesc, marginTop: 4 }}>
                Modulul este complet funcțional. Invitații au la dispoziție butonul de upload direct pe invitația digitală și pot încărca amintiri pe tot parcursul nunții.
              </p>
            </div>
          </div>
        )}

        {/* ── EXPIRED COMPLET ȘTERS DE AICI ── */}

        {/* ── VIZUALIZARE GALERIE (Mereu curată, deblocată) ── */}
        {hasEverBeenActivated && (
          <div style={{ marginTop: 28, animation: 'fadeIn .5s ease both' }}>

            {/* Header sub-galerie */}
            <div className="gallery-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
              <div>
                <p style={styles.galleryCount}>
                  {photoCount} {photoCount === 1 ? 'fotografie' : 'fotografii'} încărcate
                </p>
                <p style={styles.gallerySubCount}>
                  Albumul tău privat online
                </p>
              </div>
              <div className="gallery-header-btns" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {photos.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={downloadingAll}
                    className="gold-btn dl-all-btn"
                    style={{ ...styles.goldBtn, padding: '9px 18px', fontSize: 11, gap: 7, transition: 'all .25s', opacity: downloadingAll ? 0.7 : 1, width: 'auto' }}
                  >
                    {downloadingAll ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="6" stroke="#0A0803" strokeWidth="1.8" strokeDasharray="20 10" />
                        </svg>
                        Descărcând...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                          <path d="M8 2 L8 11 M4 8 L8 12 L12 8" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2 14 L14 14" stroke="#0A0803" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        Descarcă Toate pozele
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={fetchPhotos}
                  className="ghost-btn"
                  style={{ ...styles.ghostBtn, transition: 'all .25s' }}
                >
                  {loading ? (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="20 10" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                      <path d="M2 8C2 4.68 4.68 2 8 2s6 2.68 6 6-2.68 6-6 6" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M2 8 L4.5 5.5 M2 8 L4.5 10.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  Actualizează
                </button>
              </div>
            </div>

            {/* Grid fotografii (Fără randare condiționată blurată/blocată) */}
            {photos.length === 0 && !loading ? (
              <div style={styles.emptyState}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38, marginBottom: 12, opacity: .4 }}>
                  <rect x="4" y="14" width="40" height="28" rx="5" stroke="#D4AF37" strokeWidth="1.5" />
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.2" />
                </svg>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(212,175,55,.4)', marginBottom: 4 }}>
                  Nicio fotografie încărcată de invitați
                </p>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.18em', color: 'rgba(212,175,55,.25)', marginBottom: 0 }}>
                  IMAGINILE TRIMISE DE INVITAȚI VOR APĂREA INSTANT AICI
                </p>
              </div>
            ) : (
              <div className="gallery-grid">
                {photos.map((p: Photo) => (
                  <div key={p.id} className="photo-card" style={styles.photoCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="Amintire eveniment" style={styles.photoImg} />
                    <div className="photo-overlay" style={styles.photoOverlay}>
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(p)}
                        disabled={downloadingId === p.id}
                        className="dl-btn"
                        style={styles.dlBtn}
                      >
                        {downloadingId === p.id ? (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                            <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1.8" strokeDasharray="20 10" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                            <path d="M8 2 L8 10 M4 7 L8 11 L12 7" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 13.5 L14 13.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        )}
                        {downloadingId === p.id ? '...' : 'Descarcă'}
                      </button>
                      <a href={p.url} target="_blank" rel="noreferrer" style={styles.viewBtn}>
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                          <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="rgba(212,175,55,.8)" strokeWidth="1.4" />
                          <circle cx="8" cy="8" r="2" stroke="rgba(212,175,55,.8)" strokeWidth="1.4" />
                        </svg>
                        Vezi Full
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════ STYLES ══ */

const G = {
  gold:       '#D4AF37',
  goldDim:   'rgba(212,175,55,.55)',
  goldFaint: 'rgba(212,175,55,.12)',
  goldBorder:'rgba(212,175,55,.2)',
  text:      '#F5E6A8',
  textDim:   'rgba(245,230,168,.5)',
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: { fontFamily: "'Lato', sans-serif", color: G.text, width: '100%', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box', overflowX: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 12 },
  headerLabel: { fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: G.goldDim, marginBottom: 4 },
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 300, fontStyle: 'italic', color: G.gold, margin: 0, letterSpacing: '.04em' },
  headerIcon: { width: 48, height: 48, borderRadius: 12, background: G.goldFaint, border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  divider: { height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.3),transparent)', margin: '14px 0 20px' },
  card: { background: 'rgba(212,175,55,.04)', border: `1px solid ${G.goldBorder}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 },
  cardInner: { padding: 'clamp(16px,3vw,24px)', display: 'flex', flexDirection: 'column', gap: 10 },
  statusIconWrap: { width: 48, height: 48, borderRadius: '50%', background: 'rgba(212,175,55,.08)', border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', fontWeight: 400, color: G.text, margin: 0 },
  cardDesc: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,2vw,15px)', fontStyle: 'italic', color: G.textDim, lineHeight: 1.7, margin: 0 },
  consentLabel: { display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px', background: 'rgba(212,175,55,.06)', border: `1px solid ${G.goldBorder}`, borderRadius: 10 },
  checkbox: { width: 18, height: 18, borderRadius: 4, border: '1.5px solid rgba(212,175,55,.4)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all .2s' },
  checkboxChecked: { background: '#D4AF37', borderColor: '#D4AF37' },
  consentText: { fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.06em', color: 'rgba(212,175,55,.7)', lineHeight: 1.6 },
  goldBtn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, background: 'linear-gradient(135deg,#8B6914 0%,#D4AF37 40%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color: '#0A0803', fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(212,175,55,.3)', width: '100%' } as React.CSSProperties,
  ghostBtn: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 8, background: G.goldFaint, border: `1px solid ${G.goldBorder}`, color: G.gold, fontFamily: "'Cinzel',serif", fontSize: 10, fontWeight: 600, letterSpacing: '.12em', cursor: 'pointer', whiteSpace: 'nowrap' } as React.CSSProperties,
  statusBadgeActive: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, background: 'rgba(76,175,80,.12)', border: '1px solid rgba(76,175,80,.3)', fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#81c784' },
  statusDot: { width: 7, height: 7, borderRadius: '50%', background: '#81c784', display: 'inline-block', boxShadow: '0 0 6px #81c784', flexShrink: 0 },
  galleryCount: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', color: G.text, margin: 0, fontWeight: 300 },
  gallerySubCount: { fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: G.goldDim, marginTop: 2, marginBottom: 0 },
  photoCard: { position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden', border: `1px solid ${G.goldBorder}`, background: '#0A0803', cursor: 'pointer' } as React.CSSProperties,
  photoImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' } as React.CSSProperties,
  photoOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(5,4,1,.92) 0%,rgba(5,4,1,.4) 50%,transparent 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 5, padding: 8, opacity: 0, transition: 'opacity .3s ease' } as React.CSSProperties,
  dlBtn: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, background: 'rgba(212,175,55,.12)', border: '1px solid rgba(212,175,55,.35)', color: '#D4AF37', fontFamily: "'Cinzel',serif", fontSize: 9, fontWeight: 600, letterSpacing: '.1em', cursor: 'pointer', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
  viewBtn: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 6, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(245,230,168,.7)', fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.1em', textDecoration: 'none', width: '100%', justifyContent: 'center', transition: 'all .2s' } as React.CSSProperties,
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'rgba(212,175,55,.04)', border: '1px dashed rgba(212,175,55,.2)', borderRadius: 14, textAlign: 'center' } as React.CSSProperties,
};