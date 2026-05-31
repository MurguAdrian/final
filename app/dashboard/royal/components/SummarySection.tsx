// "use client";
// import React, { useEffect, useState } from 'react';

// const R = {
//   navy: '#0B1929', navy2: '#0F2040', royalBg: '#071220',
//   silver: '#C8D8E8', silver2: '#A8BDD0', silver3: '#E8F0F8', silver4: '#6888A8',
//   accent: '#7CA8D8', accent2: '#9FBFE8', text: '#E0EAF5', textlt: '#8AAAC8',
// };

// interface SummaryProps {
//   isComplete: boolean;
// }

// export const SummarySection = ({ isComplete }: SummaryProps) => {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
//         const result = await res.json();
//         setData(result);
//       } catch (err) {
//         console.error("Eroare API Summary:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const exportToExcel = () => {
//     if (!data?.guests) return;
//     const headers = ["Nume Invitat", "Status", "Adulti", "Copii", "Cazare", "Transport", "Preferinte Dieta", "Mentiuni"];
//     const rows = data.guests.map((g: any) => [
//       g.guest_name,
//       g.is_coming ? "DA" : "NU",
//       g.adults_count,
//       g.kids_count,
//       g.needs_accommodation ? "DA" : "NU",
//       g.needs_transport ? "DA" : "NU",
//       g.dietary_preferences || "-",
//       g.other_mentions || "-"
//     ]);
//     const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", `lista_invitati_${data?.weddingDetails?.custom_slug || 'export'}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const userSlug = data?.weddingDetails?.custom_slug || "nunta-ta";

//   if (loading) return (
//     <div style={{
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       padding: '60px 20px', gap: 14,
//       fontFamily: "'Cinzel', serif",
//       fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase' as const,
//       color: R.silver4
//     }}>
//       <div style={{
//         width: 18, height: 18, border: `1.5px solid rgba(200,216,232,.3)`,
//         borderTopColor: R.silver, borderRadius: '50%',
//         animation: 'ry-spin 1s linear infinite'
//       }} />
//       Se încarcă...
//       <style>{`@keyframes ry-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes ry-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//         @keyframes ry-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//         @keyframes ry-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
//         .ry-row:hover { background: rgba(124,168,216,.04) !important; }
//         .ry-export-btn:hover { background: rgba(200,216,232,.12) !important; border-color: rgba(200,216,232,.5) !important; color: ${R.silver3} !important; }
//         .ry-copy-btn:hover { background: rgba(124,168,216,.25) !important; }
//         .ry-share-btn:hover { background: rgba(124,168,216,.14) !important; border-color: rgba(200,216,232,.5) !important; color: ${R.silver3} !important; }

//         .sum-wrap { width: 100%; max-width: 100%; box-sizing: border-box; overflow-x: hidden; }
//         .sum-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
//         .sum-link-row { display: flex; gap: 10px; flex-wrap: wrap; }
//         .sum-stats-grid {
//           display: grid;
//           grid-template-columns: repeat(5, 1fr);
//           gap: clamp(8px,1.5vw,14px);
//           margin-bottom: 28px;
//         }

//         .sum-table-wrap {
//           overflow-x: auto;
//           -webkit-overflow-scrolling: auto;
//           overscroll-behavior-x: contain;
//         }

//         .sum-link-input {
//           font-size: 16px !important;
//           -webkit-appearance: none;
//           appearance: none;
//         }

//         @media (max-width: 600px) {
//           .share-label { display: none; }
//           .ry-share-btn { padding: 10px 12px !important; }
//         }
//         @media (max-width: 900px) {
//           .sum-stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
//         }
//         @media (max-width: 600px) {
//           .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .sum-link-row { flex-direction: column !important; }
//           .sum-link-row input { min-width: 0 !important; width: 100% !important; }
//           .sum-link-row button { width: 100% !important; }
//           .sum-header { flex-direction: column !important; align-items: flex-start !important; }
//           .ry-export-btn span { display: none; }
//         }
//         @media (max-width: 400px) {
//           .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
//         }

//         @media (max-width: 640px) {
//           .th-cazare, .td-cazare,
//           .th-transport, .td-transport { display: none !important; }
//         }
//         @media (max-width: 480px) {
//           .th-details, .td-details { display: none !important; }
//         }
//       `}</style>

//       <div className="sum-wrap" style={{ animation: 'ry-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

//         {/* HEADER */}
//         <div className="sum-header">
//           <div>
//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em',
//               textTransform: 'uppercase', color: R.silver4, marginBottom: 8
//             }}>Panou Principal</p>
//             <h2 style={{
//               fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,4vw,38px)',
//               fontWeight: 300, fontStyle: 'italic', color: R.silver3, margin: 0, lineHeight: 1.1
//             }}>Centrul de Comandă</h2>
//           </div>
//           {data?.guests?.length > 0 && (
//             <button
//               className="ry-export-btn"
//               onClick={exportToExcel}
//               style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 7,
//                 padding: '9px 16px', borderRadius: 4,
//                 background: `rgba(124,168,216,.06)`,
//                 border: `1px solid rgba(200,216,232,.28)`,
//                 color: R.silver2,
//                 fontFamily: "'Cinzel', serif", fontSize: 10,
//                 fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase',
//                 cursor: 'pointer', transition: 'all .2s',
//                 whiteSpace: 'nowrap', flexShrink: 0
//               }}>
//               <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                 <path d="M10 13V4M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               <span>Exportă Lista</span>
//             </button>
//           )}
//         </div>

//         <RoyalDivider />

//         {/* LINK CARD */}
//         <div style={{
//           borderRadius: 14,
//           overflow: 'hidden',
//           border: `1px solid ${isComplete ? `rgba(200,216,232,.25)` : 'rgba(255,165,0,.35)'}`,
//           background: isComplete
//             ? `rgba(15,32,64,.5)`
//             : 'rgba(255,140,0,.06)',
//           padding: 'clamp(16px,3vw,24px)',
//           marginBottom: 28,
//           position: 'relative',
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: `linear-gradient(90deg,transparent,${isComplete ? `rgba(200,216,232,.35)` : 'rgba(255,165,0,.3)'},transparent)`
//           }} />
//           {!isComplete ? (
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
//                 <div style={{
//                   width: 34, height: 34, borderRadius: 8, flexShrink: 0,
//                   background: 'rgba(255,165,0,.12)', border: '1px solid rgba(255,165,0,.3)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
//                     <path d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="rgba(255,165,0,.9)" strokeWidth="1.5" strokeLinecap="round" />
//                   </svg>
//                 </div>
//                 <h4 style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)',
//                   fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,165,0,.9)', margin: 0
//                 }}>Pasul 1: Configurează Link-ul</h4>
//               </div>
//               <p style={{
//                 fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(13px,2vw,16px)',
//                 fontStyle: 'italic', color: R.textlt, lineHeight: 1.7
//               }}>Mergi la Personalizare pentru a alege numele link-ului.</p>
//             </div>
//           ) : (
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
//                 <div style={{
//                   width: 34, height: 34, borderRadius: 8, flexShrink: 0,
//                   background: `rgba(124,168,216,.12)`, border: `1px solid rgba(200,216,232,.3)`,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
//                     <path d="M10 2L10 6M13 5l-3 3-3-3M3 12h14M5 16h10" stroke={R.silver} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//                 <h4 style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)',
//                   fontWeight: 600, letterSpacing: '.1em', color: R.silver, margin: 0
//                 }}>Invitația ta este LIVE</h4>
//               </div>

//               <div className="sum-link-row">
//                 <input
//                   readOnly
//                   className="sum-link-input"
//                   value={`https://vibeinvite.ro/invitatie/royal/${userSlug}`}
//                   style={{
//                     flex: 1, minWidth: 0, padding: '10px 14px',
//                     background: 'rgba(0,0,0,.4)', border: `1px solid rgba(200,216,232,.2)`,
//                     borderRadius: 8, color: R.silver,
//                     fontFamily: "'Cinzel', serif",
//                     letterSpacing: '.06em',
//                     outline: 'none', width: '100%', boxSizing: 'border-box' as const,
//                     WebkitAppearance: 'none' as any,
//                   }}
//                 />
//                 <button
//                   className="ry-copy-btn"
//                   onClick={() => {
//                     navigator.clipboard.writeText(`https://vibeinvite.ro/invitatie/royal/${userSlug}`);
//                     alert("Copiat!");
//                   }}
//                   style={{
//                     padding: '10px 20px', borderRadius: 8,
//                     background: `rgba(124,168,216,.15)`,
//                     border: `1px solid rgba(200,216,232,.35)`,
//                     color: R.silver,
//                     fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700,
//                     letterSpacing: '.18em', textTransform: 'uppercase' as const,
//                     cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap' as const
//                   }}>
//                   Copiază
//                 </button>
//                 <button
//                   className="ry-share-btn"
//                   onClick={() => {
//                     const url = `https://vibeinvite.ro/invitatie/royal/${userSlug}`;
//                     if (navigator.share) {
//                       navigator.share({
//                         title: 'Invitație Nuntă',
//                         text: 'Te invităm să fii alături de noi în ziua nunții noastre 💍',
//                         url,
//                       }).catch(() => {});
//                     } else {
//                       window.open(
//                         `https://wa.me/?text=${encodeURIComponent('Te invităm să fii alături de noi 💍 ' + url)}`,
//                         '_blank'
//                       );
//                     }
//                   }}
//                   style={{
//                     padding: '10px 16px', borderRadius: 8,
//                     background: `rgba(124,168,216,.08)`,
//                     border: `1px solid rgba(200,216,232,.28)`,
//                     color: R.silver2,
//                     fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
//                     letterSpacing: '.12em', textTransform: 'uppercase' as const,
//                     cursor: 'pointer', transition: 'all .2s',
//                     display: 'flex', alignItems: 'center', gap: 7,
//                     whiteSpace: 'nowrap' as const, flexShrink: 0
//                   }}>
//                   <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//                     <circle cx="15" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
//                     <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
//                     <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
//                     <path d="M7 9l6-4M7 11l6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//                   </svg>
//                   <span className="share-label">Share</span>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* STATS GRID */}
//         <div className="sum-stats-grid">
//           <StatCard title="Vizualizări" value={data?.views} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//               <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke={R.accent} strokeWidth="1.3" strokeLinecap="round" />
//               <circle cx="10" cy="10" r="2.5" stroke={R.accent} strokeWidth="1.3" />
//             </svg>
//           } />
//           <StatCard title="Confirmări (DA)" value={data?.stats?.da} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//               <path d="M4 10l4 4 8-8" stroke={R.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           } />
//           <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//               <circle cx="8" cy="6" r="2.5" stroke={R.accent} strokeWidth="1.3" />
//               <path d="M3 17c0-3 2-5 5-5s5 2 5 5" stroke={R.accent} strokeWidth="1.3" strokeLinecap="round" />
//               <path d="M13 8c1.3.6 2 1.8 2 3M16 17c0-2.5-1-4.5-3-5.5" stroke={R.accent} strokeWidth="1.3" strokeLinecap="round" />
//             </svg>
//           } />
//           <StatCard title="Cazare" value={data?.stats?.cazare} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//               <path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke={R.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           } />
//           <StatCard title="Transport" value={data?.stats?.transport} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//               <rect x="2" y="7" width="16" height="9" rx="2" stroke={R.accent} strokeWidth="1.3" />
//               <path d="M5 7V5a3 3 0 0 1 6 0v2M6 16v2M14 16v2" stroke={R.accent} strokeWidth="1.3" strokeLinecap="round" />
//             </svg>
//           } />
//         </div>

//         <RoyalDivider />

//         {/* GUEST TABLE */}
//         <div style={{
//           background: `rgba(15,32,64,.4)`,
//           border: `1px solid rgba(200,216,232,.16)`,
//           borderRadius: 16,
//           overflow: 'hidden',
//           position: 'relative'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: `linear-gradient(90deg,transparent,rgba(200,216,232,.35),transparent)`
//           }} />

//           <div style={{ padding: 'clamp(16px,3vw,24px)', borderBottom: `1px solid rgba(200,216,232,.1)` }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.32em',
//               textTransform: 'uppercase', color: R.silver4, marginBottom: 5
//             }}>Registrul Invitaților</p>
//             <h3 style={{
//               fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px,3vw,24px)',
//               fontStyle: 'italic', fontWeight: 300, color: R.silver3, margin: 0
//             }}>Detalii Răspunsuri</h3>
//           </div>

//           <div className="sum-table-wrap">
//             <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
//               <thead>
//                 <tr style={{ background: `rgba(124,168,216,.06)` }}>
//                   <th style={thStyle}>Nume</th>
//                   <th style={thStyle}>Status</th>
//                   <th style={thStyle}>Persoane</th>
//                   <th style={{ ...thStyle }} className="th-cazare">Cazare</th>
//                   <th style={{ ...thStyle }} className="th-transport">Transport</th>
//                   <th style={{ ...thStyle }} className="th-details">Detalii</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data?.guests?.length > 0 ? (
//                   data.guests.map((guest: any) => (
//                     <tr
//                       key={guest.id}
//                       className="ry-row"
//                       style={{ borderBottom: `1px solid rgba(200,216,232,.07)`, transition: 'background .2s' }}>
//                       <td style={tdStyle}>
//                         <span style={{
//                           fontFamily: "'Cormorant Garamond', serif",
//                           fontSize: 'clamp(13px,2vw,17px)', fontWeight: 600, color: R.silver3
//                         }}>{guest.guest_name}</span>
//                         {guest.partner_name && (
//                           <span style={{
//                             display: 'block', fontFamily: "'Cormorant Garamond', serif",
//                             fontSize: 11, fontStyle: 'italic', color: R.silver4, marginTop: 2
//                           }}>+ {guest.partner_name}</span>
//                         )}
//                       </td>
//                       <td style={tdStyle}>
//                         {guest.is_coming ? (
//                           <span style={{
//                             display: 'inline-flex', alignItems: 'center', gap: 5,
//                             padding: '3px 10px', borderRadius: 100,
//                             background: 'rgba(74,222,128,.08)', border: '1px solid rgba(74,222,128,.25)',
//                             fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
//                             color: 'rgba(134,239,172,.9)', whiteSpace: 'nowrap'
//                           }}>✦ VINE</span>
//                         ) : (
//                           <span style={{
//                             display: 'inline-flex', alignItems: 'center', gap: 5,
//                             padding: '3px 10px', borderRadius: 100,
//                             background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.25)',
//                             fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
//                             color: 'rgba(252,165,165,.9)', whiteSpace: 'nowrap'
//                           }}>◆ NU</span>
//                         )}
//                       </td>
//                       <td style={tdStyle}>
//                         <span style={{
//                           fontFamily: "'Cinzel', serif", fontSize: 11,
//                           color: R.silver2, letterSpacing: '.06em'
//                         }}>{guest.adults_count}A / {guest.kids_count}C</span>
//                       </td>
//                       <td style={tdStyle} className="td-cazare">
//                         <span style={{
//                           fontFamily: "'Cinzel', serif", fontSize: 11,
//                           color: guest.needs_accommodation ? R.silver : `rgba(200,216,232,.25)`,
//                           letterSpacing: '.06em'
//                         }}>
//                           {guest.needs_accommodation ? "◆ DA" : "—"}
//                         </span>
//                       </td>
//                       <td style={tdStyle} className="td-transport">
//                         <span style={{
//                           fontFamily: "'Cinzel', serif", fontSize: 11,
//                           color: guest.needs_transport ? R.silver : `rgba(200,216,232,.25)`,
//                           letterSpacing: '.06em'
//                         }}>
//                           {guest.needs_transport ? "◆ DA" : "—"}
//                         </span>
//                       </td>
//                       <td style={tdStyle} className="td-details">
//                         {guest.dietary_preferences && (
//                           <div style={{ marginBottom: guest.other_mentions ? 5 : 0 }}>
//                             <span style={{
//                               fontFamily: "'Cinzel', serif", fontSize: 7,
//                               letterSpacing: '.14em', textTransform: 'uppercase',
//                               color: R.silver4, display: 'block', marginBottom: 2
//                             }}>Dietă</span>
//                             <span style={{
//                               fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//                               fontStyle: 'italic', color: R.textlt
//                             }}>{guest.dietary_preferences}</span>
//                           </div>
//                         )}
//                         {guest.other_mentions && (
//                           <div>
//                             <span style={{
//                               fontFamily: "'Cinzel', serif", fontSize: 7,
//                               letterSpacing: '.14em', textTransform: 'uppercase',
//                               color: R.silver4, display: 'block', marginBottom: 2
//                             }}>Mesaj</span>
//                             <span style={{
//                               fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//                               fontStyle: 'italic', color: R.textlt
//                             }}>{guest.other_mentions}</span>
//                           </div>
//                         )}
//                         {!guest.dietary_preferences && !guest.other_mentions && (
//                           <span style={{ color: `rgba(200,216,232,.2)`, fontSize: 14 }}>—</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={6} style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
//                       <div style={{ marginBottom: 10, opacity: .3 }}>
//                         <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36, margin: '0 auto' }}>
//                           <rect x="8" y="8" width="32" height="36" rx="3" stroke={R.silver} strokeWidth="1.5" />
//                           <path d="M16 18h16M16 25h16M16 32h8" stroke={R.silver} strokeWidth="1.3" strokeLinecap="round" />
//                         </svg>
//                       </div>
//                       <p style={{
//                         fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
//                         fontStyle: 'italic', fontWeight: 300, color: R.silver4,
//                         marginBottom: 5
//                       }}>Niciun răspuns încă</p>
//                       <p style={{
//                         fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.22em',
//                         textTransform: 'uppercase', color: R.silver4, opacity: .5
//                       }}>Distribuie invitația pentru a primi confirmări</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// const thStyle: React.CSSProperties = {
//   padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
//   fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em',
//   textTransform: 'uppercase', color: 'rgba(200,216,232,.55)',
//   textAlign: 'left', fontWeight: 600,
//   borderBottom: '1px solid rgba(200,216,232,.15)',
//   whiteSpace: 'nowrap',
// };

// const tdStyle: React.CSSProperties = {
//   padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
//   verticalAlign: 'top',
// };

// const StatCard = ({ title, value, icon }: any) => (
//   <div style={{
//     background: `rgba(15,32,64,.5)`,
//     border: `1px solid rgba(200,216,232,.16)`,
//     borderRadius: 14,
//     padding: 'clamp(12px,2vw,20px) clamp(10px,1.5vw,16px)',
//     textAlign: 'center' as const,
//     position: 'relative',
//     overflow: 'hidden',
//   }}>
//     <div style={{
//       position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
//       background: `linear-gradient(90deg,transparent,rgba(200,216,232,.3),transparent)`
//     }} />
//     {icon && (
//       <div style={{
//         width: 32, height: 32, borderRadius: 9,
//         background: `rgba(124,168,216,.08)`, border: `1px solid rgba(200,216,232,.2)`,
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         margin: '0 auto 8px', flexShrink: 0
//       }}>{icon}</div>
//     )}
//     <p style={{
//       fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
//       textTransform: 'uppercase', color: 'rgba(200,216,232,.45)',
//       marginBottom: 6
//     }}>{title}</p>
//     <h4 style={{
//       fontFamily: "'Cormorant Garamond', serif",
//       fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 300,
//       color: 'rgba(200,216,232,.55)', margin: 0, lineHeight: 1,
//     }}>{value || 0}</h4>
//   </div>
// );

// const RoyalDivider = () => (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 24 }}>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(200,216,232,.3))` }} />
//     <svg viewBox="0 0 60 20" width="54" height="18" fill="none" style={{ flexShrink: 0 }}>
//       <path d="M5 10 L20 10" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
//       <path d="M40 10 L55 10" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
//       <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#C8D8E8" strokeWidth="1" strokeOpacity=".8" />
//       <circle cx="30" cy="10" r="2" fill="#C8D8E8" fillOpacity=".6" />
//       <circle cx="18" cy="10" r="1" fill="#C8D8E8" fillOpacity=".4" />
//       <circle cx="42" cy="10" r="1" fill="#C8D8E8" fillOpacity=".4" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(200,216,232,.3),transparent)` }} />
//   </div>
// );


"use client";
import React, { useEffect, useState } from 'react';
import { C, G, F, FS, ANIM } from '../ui.tokens';

// ─────────────────────────────────────────────────────────────
//  Stiluri tabel – definite o dată, reutilizate în tot fișierul
// ─────────────────────────────────────────────────────────────
const thStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px)',
  fontFamily: F.display, fontSize: FS.label, letterSpacing: '.22em',
  textTransform: 'uppercase', color: 'rgba(200,216,232,.55)',
  textAlign: 'left', fontWeight: 600,
  borderBottom: `1px solid rgba(200,216,232,.15)`,
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px)',
  verticalAlign: 'top',
};

// ─────────────────────────────────────────────────────────────
interface SummaryProps { isComplete: boolean; }

export const SummarySection = ({ isComplete }: SummaryProps) => {
  const [data,    setData]    = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res    = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Eroare API Summary:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const exportToExcel = () => {
    if (!data?.guests) return;
    const headers = ['Nume Invitat','Status','Adulti','Copii','Cazare','Transport','Preferinte Dieta','Mentiuni'];
    const rows = data.guests.map((g: any) => [
      g.guest_name,
      g.is_coming ? 'DA' : 'NU',
      g.adults_count, g.kids_count,
      g.needs_accommodation ? 'DA' : 'NU',
      g.needs_transport     ? 'DA' : 'NU',
      g.dietary_preferences || '-',
      g.other_mentions      || '-',
    ]);
    const csv  = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `lista_invitati_${data?.weddingDetails?.custom_slug || 'export'}.csv`;
    a.style.visibility = 'hidden';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const userSlug = data?.weddingDetails?.custom_slug || 'nunta-ta';

  // ── Loading ───────────────────────────────────────────────
  if (loading) return (
    <>
      <style>{`@keyframes ry-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '60px 20px', gap: 14,
        fontFamily: F.display, fontSize: 11, letterSpacing: '.28em',
        textTransform: 'uppercase', color: C.silver4,
      }}>
        <div style={{
          width: 18, height: 18,
          border: `1.5px solid rgba(200,216,232,.3)`,
          borderTopColor: C.silver, borderRadius: '50%',
          animation: ANIM.spin,
        }} />
        Se încarcă...
      </div>
    </>
  );

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes ry-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ry-fade-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* ── Interactiv ─────────────────────────────────── */
        .ry-row:hover          { background: ${C.hoverRow} !important; }
        .ry-export-btn:hover   { background: rgba(200,216,232,.12) !important; border-color: rgba(200,216,232,.5) !important; color: ${C.silver3} !important; }
        .ry-copy-btn:hover     { background: ${C.hoverCopy} !important; }
        .ry-share-btn:hover    { background: rgba(124,168,216,.14) !important; border-color: rgba(200,216,232,.5) !important; color: ${C.silver3} !important; }

        /* ── Layout wrapper – scroll safe ───────────────── */
        .sum-wrap {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: hidden;     /* previne scroll lateral */
          /* NU overflow-y! scroll-ul se face din .ry-main */
        }

        /* ── Header & grid ───────────────────────────────── */
        .sum-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 28px;
        }
        .sum-link-row { display: flex; gap: 10px; flex-wrap: wrap; }

        .sum-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(8px,1.5vw,14px);
          margin-bottom: 28px;
        }

        /* ── Tabel ───────────────────────────────────────── */
        .sum-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          touch-action: pan-x pan-y;
        }

        /* Input – previne zoom iOS */
        .sum-link-input { font-size: 16px !important; -webkit-appearance: none; appearance: none; }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 900px) { .sum-stats-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 600px) {
          .sum-stats-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .sum-link-row     { flex-direction: column !important; }
          .sum-link-row input  { min-width: 0 !important; width: 100% !important; }
          .sum-link-row button { width: 100% !important; }
          .sum-header       { flex-direction: column !important; align-items: flex-start !important; }
          .ry-export-btn span  { display: none; }
          .share-label         { display: none; }
          .ry-share-btn        { padding: 10px 12px !important; }
        }
        @media (max-width: 400px) { .sum-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }

        /* Coloane tabel ascunse pe ecrane mici */
        @media (max-width: 640px) { .th-cazare, .td-cazare, .th-transport, .td-transport { display: none !important; } }
        @media (max-width: 480px) { .th-details, .td-details { display: none !important; } }
      `}</style>

      <div className="sum-wrap" style={{ animation: ANIM.fadeIn, fontFamily: F.serif }}>

        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="sum-header">
          <div>
            <p style={{
              fontFamily: F.display, fontSize: FS.labelLg,
              letterSpacing: '.36em', textTransform: 'uppercase',
              color: C.silver4, marginBottom: 8,
            }}>Panou Principal</p>
            <h2 style={{
              fontFamily: F.serif, fontSize: 'clamp(22px,4vw,38px)',
              fontWeight: 300, fontStyle: 'italic', color: C.silver3,
              margin: 0, lineHeight: 1.1,
            }}>Centrul de Comandă</h2>
          </div>
          {data?.guests?.length > 0 && (
            <button
              className="ry-export-btn"
              onClick={exportToExcel}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 16px', borderRadius: 4,
                background: C.hoverTab,
                border: `1px solid rgba(200,216,232,.28)`,
                color: C.silver2,
                fontFamily: F.display, fontSize: 10, fontWeight: 600,
                letterSpacing: '.16em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all .2s',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <path d="M10 13V4M6 9l4 4 4-4M4 16h12"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Exportă Lista</span>
            </button>
          )}
        </div>

        <RoyalDivider />

        {/* ── LINK CARD ───────────────────────────────────── */}
        <div style={{
          borderRadius: 14, overflow: 'hidden',
          border: `1px solid ${isComplete ? C.border1 : 'rgba(255,165,0,.35)'}`,
          background: isComplete ? C.glass1 : C.warnBg,
          padding: 'clamp(16px,3vw,24px)',
          marginBottom: 28, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: `linear-gradient(90deg,transparent,${isComplete ? `rgba(200,216,232,.35)` : 'rgba(255,165,0,.3)'},transparent)`,
          }} />

          {!isComplete ? (
            /* — Profil incomplet — */
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(255,165,0,.12)', border: '1px solid rgba(255,165,0,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      stroke="rgba(255,165,0,.9)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: F.display, fontSize: 'clamp(10px,2.5vw,13px)',
                  fontWeight: 600, letterSpacing: '.1em',
                  color: 'rgba(255,165,0,.9)', margin: 0,
                }}>Pasul 1: Configurează Link-ul</h4>
              </div>
              <p style={{
                fontFamily: F.serif, fontSize: 'clamp(13px,2vw,16px)',
                fontStyle: 'italic', color: C.textlt, lineHeight: 1.7,
              }}>
                Mergi la Personalizare pentru a alege numele link-ului.
              </p>
            </div>
          ) : (
            /* — Link activ — */
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: C.hoverTabA, border: `1px solid rgba(200,216,232,.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 2L10 6M13 5l-3 3-3-3M3 12h14M5 16h10"
                      stroke={C.silver} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: F.display, fontSize: 'clamp(10px,2.5vw,13px)',
                  fontWeight: 600, letterSpacing: '.1em', color: C.silver, margin: 0,
                }}>Invitația ta este LIVE</h4>
              </div>

              <div className="sum-link-row">
                <input
                  readOnly
                  className="sum-link-input"
                  value={`https://vibeinvite.ro/invitatie/royal/${userSlug}`}
                  style={{
                    flex: 1, minWidth: 0, padding: '10px 14px',
                    background: 'rgba(0,0,0,.4)', border: `1px solid rgba(200,216,232,.2)`,
                    borderRadius: 8, color: C.silver,
                    fontFamily: F.display, letterSpacing: '.06em',
                    outline: 'none', width: '100%', boxSizing: 'border-box',
                  }}
                />
                <button
                  className="ry-copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://vibeinvite.ro/invitatie/royal/${userSlug}`);
                    alert('Copiat!');
                  }}
                  style={{
                    padding: '10px 20px', borderRadius: 8,
                    background: C.hoverTabA,
                    border: `1px solid rgba(200,216,232,.35)`,
                    color: C.silver,
                    fontFamily: F.display, fontSize: 16, fontWeight: 700,
                    letterSpacing: '.18em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap',
                  }}>
                  Copiază
                </button>
                <button
                  className="ry-share-btn"
                  onClick={() => {
                    const url = `https://vibeinvite.ro/invitatie/royal/${userSlug}`;
                    if (navigator.share) {
                      navigator.share({ title: 'Invitație Nuntă', text: 'Te invităm 💍', url }).catch(() => {});
                    } else {
                      window.open(`https://wa.me/?text=${encodeURIComponent('Te invităm 💍 ' + url)}`, '_blank');
                    }
                  }}
                  style={{
                    padding: '10px 16px', borderRadius: 8,
                    background: C.hoverTab,
                    border: `1px solid rgba(200,216,232,.28)`,
                    color: C.silver2,
                    fontFamily: F.display, fontSize: 13, fontWeight: 600,
                    letterSpacing: '.12em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all .2s',
                    display: 'flex', alignItems: 'center', gap: 7,
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                    <circle cx="15" cy="4"  r="2" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="5"  cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M7 9l6-4M7 11l6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span className="share-label">Share</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── STATISTICI ─────────────────────────────────── */}
        <div className="sum-stats-grid">
          <StatCard title="Vizualizări" value={data?.views} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="10" cy="10" r="2.5" stroke={C.accent} strokeWidth="1.3" />
            </svg>
          } />
          <StatCard title="Confirmări (DA)" value={data?.stats?.da} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M4 10l4 4 8-8" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <circle cx="8" cy="6" r="2.5" stroke={C.accent} strokeWidth="1.3" />
              <path d="M3 17c0-3 2-5 5-5s5 2 5 5" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" />
              <path d="M13 8c1.3.6 2 1.8 2 3M16 17c0-2.5-1-4.5-3-5.5" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
          <StatCard title="Cazare" value={data?.stats?.cazare} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Transport" value={data?.stats?.transport} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <rect x="2" y="7" width="16" height="9" rx="2" stroke={C.accent} strokeWidth="1.3" />
              <path d="M5 7V5a3 3 0 0 1 6 0v2M6 16v2M14 16v2" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
        </div>

        <RoyalDivider />

        {/* ── TABEL INVITAȚI ─────────────────────────────── */}
        <div style={{
          background: C.glass2,
          border: `1px solid rgba(200,216,232,.16)`,
          borderRadius: 16, overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: `linear-gradient(90deg,transparent,rgba(200,216,232,.35),transparent)`,
          }} />

          <div style={{ padding: 'clamp(16px,3vw,24px)', borderBottom: `1px solid rgba(200,216,232,.1)` }}>
            <p style={{
              fontFamily: F.display, fontSize: FS.label, letterSpacing: '.32em',
              textTransform: 'uppercase', color: C.silver4, marginBottom: 5,
            }}>Registrul Invitaților</p>
            <h3 style={{
              fontFamily: F.serif, fontSize: 'clamp(16px,3vw,24px)',
              fontStyle: 'italic', fontWeight: 300, color: C.silver3, margin: 0,
            }}>Detalii Răspunsuri</h3>
          </div>

          {/* Tabel cu scroll orizontal propriu */}
          <div className="sum-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
              <thead>
                <tr style={{ background: `rgba(124,168,216,.06)` }}>
                  <th style={thStyle}>Nume</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Persoane</th>
                  <th style={thStyle} className="th-cazare">Cazare</th>
                  <th style={thStyle} className="th-transport">Transport</th>
                  <th style={thStyle} className="th-details">Detalii</th>
                </tr>
              </thead>
              <tbody>
                {data?.guests?.length > 0 ? (
                  data.guests.map((guest: any) => (
                    <tr key={guest.id} className="ry-row"
                      style={{ borderBottom: `1px solid rgba(200,216,232,.07)`, transition: 'background .2s' }}>
                      <td style={tdStyle}>
                        <span style={{
                          fontFamily: F.serif, fontSize: 'clamp(13px,2vw,17px)',
                          fontWeight: 600, color: C.silver3,
                        }}>{guest.guest_name}</span>
                        {guest.partner_name && (
                          <span style={{
                            display: 'block', fontFamily: F.serif,
                            fontSize: 11, fontStyle: 'italic', color: C.silver4, marginTop: 2,
                          }}>+ {guest.partner_name}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {guest.is_coming ? (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '3px 10px', borderRadius: 100,
                            background: 'rgba(74,222,128,.08)', border: '1px solid rgba(74,222,128,.25)',
                            fontFamily: F.display, fontSize: 8, letterSpacing: '.12em',
                            color: 'rgba(134,239,172,.9)', whiteSpace: 'nowrap',
                          }}>✦ VINE</span>
                        ) : (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '3px 10px', borderRadius: 100,
                            background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.25)',
                            fontFamily: F.display, fontSize: 8, letterSpacing: '.12em',
                            color: 'rgba(252,165,165,.9)', whiteSpace: 'nowrap',
                          }}>◆ NU</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          fontFamily: F.display, fontSize: 11,
                          color: C.silver2, letterSpacing: '.06em',
                        }}>{guest.adults_count}A / {guest.kids_count}C</span>
                      </td>
                      <td style={tdStyle} className="td-cazare">
                        <span style={{
                          fontFamily: F.display, fontSize: 11, letterSpacing: '.06em',
                          color: guest.needs_accommodation ? C.silver : `rgba(200,216,232,.25)`,
                        }}>
                          {guest.needs_accommodation ? '◆ DA' : '—'}
                        </span>
                      </td>
                      <td style={tdStyle} className="td-transport">
                        <span style={{
                          fontFamily: F.display, fontSize: 11, letterSpacing: '.06em',
                          color: guest.needs_transport ? C.silver : `rgba(200,216,232,.25)`,
                        }}>
                          {guest.needs_transport ? '◆ DA' : '—'}
                        </span>
                      </td>
                      <td style={tdStyle} className="td-details">
                        {guest.dietary_preferences && (
                          <div style={{ marginBottom: guest.other_mentions ? 5 : 0 }}>
                            <span style={{
                              fontFamily: F.display, fontSize: 7, letterSpacing: '.14em',
                              textTransform: 'uppercase', color: C.silver4,
                              display: 'block', marginBottom: 2,
                            }}>Dietă</span>
                            <span style={{
                              fontFamily: F.serif, fontSize: 13,
                              fontStyle: 'italic', color: C.textlt,
                            }}>{guest.dietary_preferences}</span>
                          </div>
                        )}
                        {guest.other_mentions && (
                          <div>
                            <span style={{
                              fontFamily: F.display, fontSize: 7, letterSpacing: '.14em',
                              textTransform: 'uppercase', color: C.silver4,
                              display: 'block', marginBottom: 2,
                            }}>Mesaj</span>
                            <span style={{
                              fontFamily: F.serif, fontSize: 13,
                              fontStyle: 'italic', color: C.textlt,
                            }}>{guest.other_mentions}</span>
                          </div>
                        )}
                        {!guest.dietary_preferences && !guest.other_mentions && (
                          <span style={{ color: `rgba(200,216,232,.2)`, fontSize: 14 }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                      <div style={{ marginBottom: 10, opacity: .3 }}>
                        <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36, margin: '0 auto' }}>
                          <rect x="8" y="8" width="32" height="36" rx="3" stroke={C.silver} strokeWidth="1.5" />
                          <path d="M16 18h16M16 25h16M16 32h8" stroke={C.silver} strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p style={{
                        fontFamily: F.serif, fontSize: 17, fontStyle: 'italic',
                        fontWeight: 300, color: C.silver4, marginBottom: 5,
                      }}>Niciun răspuns încă</p>
                      <p style={{
                        fontFamily: F.display, fontSize: 8, letterSpacing: '.22em',
                        textTransform: 'uppercase', color: C.silver4, opacity: .5,
                      }}>Distribuie invitația pentru a primi confirmări</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
//  Sub-componente
// ─────────────────────────────────────────────────────────────
const StatCard = ({ title, value, icon }: any) => (
  <div style={{
    background: C.glass1,
    border: `1px solid rgba(200,216,232,.16)`,
    borderRadius: 14,
    padding: 'clamp(12px,2vw,20px) clamp(10px,1.5vw,16px)',
    textAlign: 'center', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
      background: `linear-gradient(90deg,transparent,rgba(200,216,232,.3),transparent)`,
    }} />
    {icon && (
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: C.hoverTab, border: `1px solid rgba(200,216,232,.2)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 8px', flexShrink: 0,
      }}>{icon}</div>
    )}
    <p style={{
      fontFamily: F.display, fontSize: 7, letterSpacing: '.2em',
      textTransform: 'uppercase', color: 'rgba(200,216,232,.45)', marginBottom: 6,
    }}>{title}</p>
    <h4 style={{
      fontFamily: F.serif, fontSize: 'clamp(24px,3.5vw,38px)',
      fontWeight: 300, color: 'rgba(200,216,232,.55)', margin: 0, lineHeight: 1,
    }}>{value || 0}</h4>
  </div>
);

const RoyalDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 24 }}>
    <div style={{ flex: 1, height: 1, background: G.sepH }} />
    <svg viewBox="0 0 60 20" width="54" height="18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 L20 10"  stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
      <path d="M40 10 L55 10" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".5" />
      <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)"
        fill="none" stroke="#C8D8E8" strokeWidth="1" strokeOpacity=".8" />
      <circle cx="30" cy="10" r="2"  fill="#C8D8E8" fillOpacity=".6" />
      <circle cx="18" cy="10" r="1"  fill="#C8D8E8" fillOpacity=".4" />
      <circle cx="42" cy="10" r="1"  fill="#C8D8E8" fillOpacity=".4" />
    </svg>
    <div style={{ flex: 1, height: 1, background: G.sepHRev }} />
  </div>
);
