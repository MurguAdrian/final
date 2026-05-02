
// "use client";
// import React, { useEffect, useState } from 'react';

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
//       color: 'rgba(212,175,55,.65)'
//     }}>
//       <div style={{
//         width: 18, height: 18, border: '1.5px solid rgba(212,175,55,.3)',
//         borderTopColor: '#D4AF37', borderRadius: '50%',
//         animation: 'lux-spin 1s linear infinite'
//       }} />
//       Se încarcă experiența premium...
//       <style>{`@keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes lux-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//         @keyframes lux-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
//         @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
//         .lux-row:hover { background: rgba(212,175,55,.04) !important; }
//         .lux-export-btn:hover { background: rgba(212,175,55,.16) !important; border-color: rgba(212,175,55,.55) !important; color: #F5D678 !important; }
//         .lux-copy-btn:hover { background: linear-gradient(135deg,#8B6914,#D4AF37,#F5D678,#D4AF37,#8B6914) !important; }
//       `}</style>

//       <div style={{ animation: 'lux-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

//         {/* ── HEADER ── */}
//         <div style={{
//           display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
//           flexWrap: 'wrap', gap: 16, marginBottom: 32
//         }}>
//           <div>
//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em',
//               textTransform: 'uppercase', color: 'rgba(212,175,55,.5)', marginBottom: 8
//             }}>Panou Principal</p>
//             <h2 style={{
//               fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,3.5vw,38px)',
//               fontWeight: 300, fontStyle: 'italic', color: '#F5E6A8', margin: 0, lineHeight: 1.1
//             }}>Centrul de Comandă</h2>
//           </div>
//           {data?.guests?.length > 0 && (
//             <button
//               className="lux-export-btn"
//               onClick={exportToExcel}
//               style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 8,
//                 padding: '10px 20px', borderRadius: 4,
//                 background: 'rgba(212,175,55,.06)',
//                 border: '1px solid rgba(212,175,55,.28)',
//                 color: 'rgba(212,175,55,.8)',
//                 fontFamily: "'Cinzel', serif", fontSize: 10,
//                 fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase',
//                 cursor: 'pointer', transition: 'all .2s',
//                 whiteSpace: 'nowrap'
//               }}>
//               <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
//                 <path d="M10 13V4M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Exportă Lista Excel
//             </button>
//           )}
//         </div>

//         {/* ── GOLD DIVIDER ── */}
//         <GoldDivider />

//         {/* ── LINK CARD ── */}
//         <div style={{
//           borderRadius: 16,
//           overflow: 'hidden',
//           border: `1px solid ${isComplete ? 'rgba(212,175,55,.28)' : 'rgba(255,165,0,.35)'}`,
//           background: isComplete
//             ? 'linear-gradient(160deg,rgba(212,175,55,.07) 0%,rgba(212,175,55,.03) 100%)'
//             : 'linear-gradient(160deg,rgba(255,140,0,.1) 0%,rgba(255,140,0,.04) 100%)',
//           padding: 'clamp(18px,3vw,28px)',
//           marginBottom: 32,
//           position: 'relative',
//           boxShadow: '0 8px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: `linear-gradient(90deg,transparent,${isComplete ? 'rgba(212,175,55,.4)' : 'rgba(255,165,0,.3)'},transparent)`
//           }} />
//           {!isComplete ? (
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
//                 <div style={{
//                   width: 36, height: 36, borderRadius: 8,
//                   background: 'rgba(255,165,0,.12)', border: '1px solid rgba(255,165,0,.3)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
//                 }}>
//                   <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
//                     <path d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="rgba(255,165,0,.9)" strokeWidth="1.5" strokeLinecap="round" />
//                   </svg>
//                 </div>
//                 <h4 style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 'clamp(11px,1.3vw,13px)',
//                   fontWeight: 600, letterSpacing: '.12em', color: 'rgba(255,165,0,.9)', margin: 0
//                 }}>Pasul 1: Configurează Link-ul</h4>
//               </div>
//               <p style={{
//                 fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(13px,1.5vw,16px)',
//                 fontStyle: 'italic', color: 'rgba(245,230,168,.5)', lineHeight: 1.7
//               }}>Mergi la Personalizare pentru a alege numele link-ului.</p>
//             </div>
//           ) : (
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
//                 <div style={{
//                   width: 36, height: 36, borderRadius: 8,
//                   background: 'rgba(212,175,55,.12)', border: '1px solid rgba(212,175,55,.3)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
//                 }}>
//                   <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
//                     <path d="M10 2L10 6M13 5l-3 3-3-3M3 12h14M5 16h10" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//                 <h4 style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 'clamp(11px,1.3vw,13px)',
//                   fontWeight: 600, letterSpacing: '.12em', color: '#D4AF37', margin: 0
//                 }}>Invitația ta este LIVE</h4>
//               </div>
//               <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
//                 <input
//                   readOnly
//                   value={`https://vibeinvite.ro/invitatie/lux/${userSlug}`}
//                   style={{
//                     flex: 1, minWidth: 200, padding: '11px 16px',
//                     background: 'rgba(0,0,0,.4)', border: '1px solid rgba(212,175,55,.2)',
//                     borderRadius: 8, color: '#D4AF37',
//                     fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '.06em',
//                     outline: 'none'
//                   }}
//                 />
//                 <button
//                   className="lux-copy-btn"
//                   onClick={() => { navigator.clipboard.writeText(`https://vibeinvite.ro/invitatie/lux/${userSlug}`); alert("Copiat!"); }}
//                   style={{
//                     padding: '11px 22px', borderRadius: 8,
//                     background: 'rgba(212,175,55,.15)',
//                     border: '1px solid rgba(212,175,55,.35)',
//                     color: '#D4AF37',
//                     fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700,
//                     letterSpacing: '.18em', textTransform: 'uppercase',
//                     cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap'
//                   }}>
//                   Copiază
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ── STATS GRID ── */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,140px),1fr))',
//           gap: 'clamp(10px,1.5vw,16px)',
//           marginBottom: 32
//         }}>
//           <StatCard title="Vizualizări" value={data?.views} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
//               <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
//               <circle cx="10" cy="10" r="2.5" stroke="#D4AF37" strokeWidth="1.3" />
//             </svg>
//           } />
//           <StatCard title="Confirmări (DA)" value={data?.stats?.da} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
//               <path d="M4 10l4 4 8-8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           } />
//           <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
//               <circle cx="8" cy="6" r="2.5" stroke="#D4AF37" strokeWidth="1.3" />
//               <path d="M3 17c0-3 2-5 5-5s5 2 5 5" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
//               <path d="M13 8c1.3.6 2 1.8 2 3M16 17c0-2.5-1-4.5-3-5.5" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
//             </svg>
//           } />
//           <StatCard title="Necesită Cazare" value={data?.stats?.cazare} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
//               <path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           } />
//           <StatCard title="Necesită Transport" value={data?.stats?.transport} icon={
//             <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, height: 16 }}>
//               <rect x="2" y="7" width="16" height="9" rx="2" stroke="#D4AF37" strokeWidth="1.3" />
//               <path d="M5 7V5a3 3 0 0 1 6 0v2M6 16v2M14 16v2" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
//             </svg>
//           } />
//         </div>

//         {/* ── GOLD DIVIDER ── */}
//         <GoldDivider />

//         {/* ── GUEST TABLE ── */}
//         <div style={{
//           background: 'rgba(212,175,55,.03)',
//           border: '1px solid rgba(212,175,55,.18)',
//           borderRadius: 20,
//           overflow: 'hidden',
//           boxShadow: '0 8px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(212,175,55,.08)',
//           position: 'relative'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'
//           }} />

//           <div style={{ padding: 'clamp(18px,3vw,28px)', borderBottom: '1px solid rgba(212,175,55,.12)' }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.32em',
//               textTransform: 'uppercase', color: 'rgba(212,175,55,.45)', marginBottom: 6
//             }}>Registrul Invitaților</p>
//             <h3 style={{
//               fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,2.2vw,24px)',
//               fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', margin: 0
//             }}>Detalii Răspunsuri</h3>
//           </div>

//           <div style={{ overflowX: 'auto' }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
//               <thead>
//                 <tr style={{ background: 'rgba(212,175,55,.06)' }}>
//                   {['Nume', 'Status', 'Persoane', 'Cazare', 'Transport', 'Detalii / Mențiuni'].map(h => (
//                     <th key={h} style={{
//                       padding: 'clamp(10px,1.5vw,16px) clamp(10px,1.5vw,16px)',
//                       fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.22em',
//                       textTransform: 'uppercase', color: 'rgba(212,175,55,.55)',
//                       textAlign: 'left', fontWeight: 600,
//                       borderBottom: '1px solid rgba(212,175,55,.15)'
//                     }}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data?.guests?.length > 0 ? (
//                   data.guests.map((guest: any) => (
//                     <tr
//                       key={guest.id}
//                       className="lux-row"
//                       style={{ borderBottom: '1px solid rgba(212,175,55,.07)', transition: 'background .2s' }}>
//                       <td style={{ padding: 'clamp(10px,1.5vw,16px)' }}>
//                         <span style={{
//                           fontFamily: "'Cormorant Garamond', serif",
//                           fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 600, color: '#F5E6A8'
//                         }}>{guest.guest_name}</span>
//                         {guest.partner_name && (
//                           <span style={{
//                             display: 'block', fontFamily: "'Cormorant Garamond', serif",
//                             fontSize: 12, fontStyle: 'italic', color: 'rgba(212,175,55,.45)', marginTop: 2
//                           }}>+ {guest.partner_name}</span>
//                         )}
//                       </td>
//                       <td style={{ padding: 'clamp(10px,1.5vw,16px)' }}>
//                         {guest.is_coming ? (
//                           <span style={{
//                             display: 'inline-flex', alignItems: 'center', gap: 6,
//                             padding: '4px 12px', borderRadius: 100,
//                             background: 'rgba(74,222,128,.08)', border: '1px solid rgba(74,222,128,.25)',
//                             fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.14em',
//                             color: 'rgba(134,239,172,.9)'
//                           }}>✦ VINE</span>
//                         ) : (
//                           <span style={{
//                             display: 'inline-flex', alignItems: 'center', gap: 6,
//                             padding: '4px 12px', borderRadius: 100,
//                             background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.25)',
//                             fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.14em',
//                             color: 'rgba(252,165,165,.9)'
//                           }}>◆ NU</span>
//                         )}
//                       </td>
//                       <td style={{ padding: 'clamp(10px,1.5vw,16px)' }}>
//                         <span style={{
//                           fontFamily: "'Cinzel', serif", fontSize: 11,
//                           color: 'rgba(212,175,55,.7)', letterSpacing: '.08em'
//                         }}>{guest.adults_count}A / {guest.kids_count}C</span>
//                       </td>
//                       <td style={{ padding: 'clamp(10px,1.5vw,16px)' }}>
//                         <span style={{
//                           fontFamily: "'Cinzel', serif", fontSize: 11,
//                           color: guest.needs_accommodation ? 'rgba(212,175,55,.8)' : 'rgba(245,230,168,.25)',
//                           letterSpacing: '.06em'
//                         }}>
//                           {guest.needs_accommodation ? "◆ DA" : "—"}
//                         </span>
//                       </td>
//                       <td style={{ padding: 'clamp(10px,1.5vw,16px)' }}>
//                         <span style={{
//                           fontFamily: "'Cinzel', serif", fontSize: 11,
//                           color: guest.needs_transport ? 'rgba(212,175,55,.8)' : 'rgba(245,230,168,.25)',
//                           letterSpacing: '.06em'
//                         }}>
//                           {guest.needs_transport ? "◆ DA" : "—"}
//                         </span>
//                       </td>
//                       <td style={{ padding: 'clamp(10px,1.5vw,16px)' }}>
//                         {guest.dietary_preferences && (
//                           <div style={{ marginBottom: guest.other_mentions ? 6 : 0 }}>
//                             <span style={{
//                               fontFamily: "'Cinzel', serif", fontSize: 8,
//                               letterSpacing: '.14em', textTransform: 'uppercase',
//                               color: 'rgba(212,175,55,.5)', display: 'block', marginBottom: 2
//                             }}>Dietă</span>
//                             <span style={{
//                               fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//                               fontStyle: 'italic', color: 'rgba(245,230,168,.7)'
//                             }}>{guest.dietary_preferences}</span>
//                           </div>
//                         )}
//                         {guest.other_mentions && (
//                           <div>
//                             <span style={{
//                               fontFamily: "'Cinzel', serif", fontSize: 8,
//                               letterSpacing: '.14em', textTransform: 'uppercase',
//                               color: 'rgba(212,175,55,.5)', display: 'block', marginBottom: 2
//                             }}>Mesaj</span>
//                             <span style={{
//                               fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//                               fontStyle: 'italic', color: 'rgba(245,230,168,.7)'
//                             }}>{guest.other_mentions}</span>
//                           </div>
//                         )}
//                         {!guest.dietary_preferences && !guest.other_mentions && (
//                           <span style={{ color: 'rgba(245,230,168,.2)', fontSize: 14 }}>—</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={6} style={{ padding: 'clamp(40px,6vw,64px)', textAlign: 'center' }}>
//                       <div style={{ marginBottom: 12, opacity: .3 }}>
//                         <svg viewBox="0 0 48 48" fill="none" style={{ width: 40, height: 40, margin: '0 auto' }}>
//                           <rect x="8" y="8" width="32" height="36" rx="3" stroke="#D4AF37" strokeWidth="1.5" />
//                           <path d="M16 18h16M16 25h16M16 32h8" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
//                         </svg>
//                       </div>
//                       <p style={{
//                         fontFamily: "'Cormorant Garamond', serif", fontSize: 18,
//                         fontStyle: 'italic', fontWeight: 300, color: 'rgba(212,175,55,.35)',
//                         marginBottom: 6
//                       }}>Niciun răspuns încă</p>
//                       <p style={{
//                         fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.22em',
//                         textTransform: 'uppercase', color: 'rgba(212,175,55,.25)'
//                       }}>Distribuie invitația pentru a primi confirmări</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div style={{
//             position: 'absolute' as const, bottom: 0, left: '10%', right: '10%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)'
//           }} />
//         </div>

//       </div>
//     </>
//   );
// };

// const StatCard = ({ title, value, icon }: any) => (
//   <div style={{
//     background: 'rgba(212,175,55,.04)',
//     border: '1px solid rgba(212,175,55,.18)',
//     borderRadius: 16,
//     padding: 'clamp(16px,2vw,22px)',
//     textAlign: 'center' as const,
//     position: 'relative',
//     overflow: 'hidden',
//     boxShadow: '0 4px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)',
//     transition: 'transform .2s ease, box-shadow .2s ease'
//   }}>
//     <div style={{
//       position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
//       background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35),transparent)'
//     }} />
//     {icon && (
//       <div style={{
//         width: 36, height: 36, borderRadius: 10,
//         background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.2)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         margin: '0 auto 10px'
//       }}>{icon}</div>
//     )}
//     <p style={{
//       fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.24em',
//       textTransform: 'uppercase', color: 'rgba(212,175,55,.45)',
//       marginBottom: 8
//     }}>{title}</p>
//     <h4 style={{
//       fontFamily: "'Cormorant Garamond', serif",
//       fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 300,
//       color: '#F5E6A8', margin: 0, lineHeight: 1,
//       textShadow: '0 0 30px rgba(212,175,55,.2)'
//     }}>{value || 0}</h4>
//   </div>
// );

// const GoldDivider = () => (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 28 }}>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35))' }} />
//     <svg viewBox="0 0 60 20" width="60" height="20" fill="none" style={{ flexShrink: 0 }}>
//       <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6" />
//       <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6" />
//       <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9" />
//       <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8" />
//       <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5" />
//       <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.35),transparent)' }} />
//   </div>
// );

"use client";
import React, { useEffect, useState } from 'react';

interface SummaryProps {
  isComplete: boolean;
}

export const SummarySection = ({ isComplete }: SummaryProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Eroare API Summary:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const exportToExcel = () => {
    if (!data?.guests) return;
    const headers = ["Nume Invitat", "Status", "Adulti", "Copii", "Cazare", "Transport", "Preferinte Dieta", "Mentiuni"];
    const rows = data.guests.map((g: any) => [
      g.guest_name,
      g.is_coming ? "DA" : "NU",
      g.adults_count,
      g.kids_count,
      g.needs_accommodation ? "DA" : "NU",
      g.needs_transport ? "DA" : "NU",
      g.dietary_preferences || "-",
      g.other_mentions || "-"
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `lista_invitati_${data?.weddingDetails?.custom_slug || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const userSlug = data?.weddingDetails?.custom_slug || "nunta-ta";

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '60px 20px', gap: 14,
      fontFamily: "'Cinzel', serif",
      fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase' as const,
      color: 'rgba(212,175,55,.65)'
    }}>
      <div style={{
        width: 18, height: 18, border: '1.5px solid rgba(212,175,55,.3)',
        borderTopColor: '#D4AF37', borderRadius: '50%',
        animation: 'lux-spin 1s linear infinite'
      }} />
      Se încarcă...
      <style>{`@keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes lux-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes lux-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .lux-row:hover { background: rgba(212,175,55,.04) !important; }
        .lux-export-btn:hover { background: rgba(212,175,55,.16) !important; border-color: rgba(212,175,55,.55) !important; color: #F5D678 !important; }
        .lux-copy-btn:hover { background: linear-gradient(135deg,#8B6914,#D4AF37,#F5D678,#D4AF37,#8B6914) !important; }

        /* Responsive summary */
        .sum-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
        .sum-link-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .sum-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(8px,1.5vw,14px);
          margin-bottom: 28px;
        }
        .sum-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

        @media (max-width: 900px) {
          .sum-stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sum-link-row { flex-direction: column !important; }
          .sum-link-row input { min-width: 0 !important; }
          .sum-link-row button { width: 100% !important; }
          .sum-header { flex-direction: column !important; align-items: flex-start !important; }
          .lux-export-btn span { display: none; }
        }
        @media (max-width: 400px) {
          .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Table: hide less critical cols on mobile */
        @media (max-width: 640px) {
          .th-cazare, .td-cazare,
          .th-transport, .td-transport { display: none !important; }
        }
        @media (max-width: 480px) {
          .th-details, .td-details { display: none !important; }
        }
      `}</style>

      <div style={{ animation: 'lux-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

        {/* HEADER */}
        <div className="sum-header">
          <div>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,.5)', marginBottom: 8
            }}>Panou Principal</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,4vw,38px)',
              fontWeight: 300, fontStyle: 'italic', color: '#F5E6A8', margin: 0, lineHeight: 1.1
            }}>Centrul de Comandă</h2>
          </div>
          {data?.guests?.length > 0 && (
            <button
              className="lux-export-btn"
              onClick={exportToExcel}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 16px', borderRadius: 4,
                background: 'rgba(212,175,55,.06)',
                border: '1px solid rgba(212,175,55,.28)',
                color: 'rgba(212,175,55,.8)',
                fontFamily: "'Cinzel', serif", fontSize: 10,
                fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all .2s',
                whiteSpace: 'nowrap', flexShrink: 0
              }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <path d="M10 13V4M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Exportă Lista</span>
            </button>
          )}
        </div>

        <GoldDivider />

        {/* LINK CARD */}
        <div style={{
          borderRadius: 14,
          overflow: 'hidden',
          border: `1px solid ${isComplete ? 'rgba(212,175,55,.28)' : 'rgba(255,165,0,.35)'}`,
          background: isComplete
            ? 'linear-gradient(160deg,rgba(212,175,55,.07) 0%,rgba(212,175,55,.03) 100%)'
            : 'linear-gradient(160deg,rgba(255,140,0,.1) 0%,rgba(255,140,0,.04) 100%)',
          padding: 'clamp(16px,3vw,24px)',
          marginBottom: 28,
          position: 'relative',
          boxShadow: '0 8px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: `linear-gradient(90deg,transparent,${isComplete ? 'rgba(212,175,55,.4)' : 'rgba(255,165,0,.3)'},transparent)`
          }} />
          {!isComplete ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(255,165,0,.12)', border: '1px solid rgba(255,165,0,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="rgba(255,165,0,.9)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)',
                  fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,165,0,.9)', margin: 0
                }}>Pasul 1: Configurează Link-ul</h4>
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(13px,2vw,16px)',
                fontStyle: 'italic', color: 'rgba(245,230,168,.5)', lineHeight: 1.7
              }}>Mergi la Personalizare pentru a alege numele link-ului.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(212,175,55,.12)', border: '1px solid rgba(212,175,55,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 2L10 6M13 5l-3 3-3-3M3 12h14M5 16h10" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)',
                  fontWeight: 600, letterSpacing: '.1em', color: '#D4AF37', margin: 0
                }}>Invitația ta este LIVE</h4>
              </div>
              <div className="sum-link-row">
                <input
                  readOnly
                  value={`https://vibeinvite.ro/invitatie/lux/${userSlug}`}
                  style={{
                    flex: 1, minWidth: 0, padding: '10px 14px',
                    background: 'rgba(0,0,0,.4)', border: '1px solid rgba(212,175,55,.2)',
                    borderRadius: 8, color: '#D4AF37',
                    fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '.06em',
                    outline: 'none'
                  }}
                />
                <button
                  className="lux-copy-btn"
                  onClick={() => { navigator.clipboard.writeText(`https://vibeinvite.ro/invitatie/lux/${userSlug}`); alert("Copiat!"); }}
                  style={{
                    padding: '10px 20px', borderRadius: 8,
                    background: 'rgba(212,175,55,.15)',
                    border: '1px solid rgba(212,175,55,.35)',
                    color: '#D4AF37',
                    fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700,
                    letterSpacing: '.18em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap'
                  }}>
                  Copiază
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STATS GRID */}
        <div className="sum-stats-grid">
          <StatCard title="Vizualizări" value={data?.views} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="10" cy="10" r="2.5" stroke="#D4AF37" strokeWidth="1.3" />
            </svg>
          } />
          <StatCard title="Confirmări (DA)" value={data?.stats?.da} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M4 10l4 4 8-8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <circle cx="8" cy="6" r="2.5" stroke="#D4AF37" strokeWidth="1.3" />
              <path d="M3 17c0-3 2-5 5-5s5 2 5 5" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M13 8c1.3.6 2 1.8 2 3M16 17c0-2.5-1-4.5-3-5.5" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
          <StatCard title="Cazare" value={data?.stats?.cazare} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Transport" value={data?.stats?.transport} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <rect x="2" y="7" width="16" height="9" rx="2" stroke="#D4AF37" strokeWidth="1.3" />
              <path d="M5 7V5a3 3 0 0 1 6 0v2M6 16v2M14 16v2" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
        </div>

        <GoldDivider />

        {/* GUEST TABLE */}
        <div style={{
          background: 'rgba(212,175,55,.03)',
          border: '1px solid rgba(212,175,55,.18)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(212,175,55,.08)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'
          }} />

          <div style={{ padding: 'clamp(16px,3vw,24px)', borderBottom: '1px solid rgba(212,175,55,.12)' }}>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.32em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,.45)', marginBottom: 5
            }}>Registrul Invitaților</p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px,3vw,24px)',
              fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', margin: 0
            }}>Detalii Răspunsuri</h3>
          </div>

          <div className="sum-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
              <thead>
                <tr style={{ background: 'rgba(212,175,55,.06)' }}>
                  <th style={thStyle}>Nume</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Persoane</th>
                  <th style={{ ...thStyle }} className="th-cazare">Cazare</th>
                  <th style={{ ...thStyle }} className="th-transport">Transport</th>
                  <th style={{ ...thStyle }} className="th-details">Detalii</th>
                </tr>
              </thead>
              <tbody>
                {data?.guests?.length > 0 ? (
                  data.guests.map((guest: any) => (
                    <tr
                      key={guest.id}
                      className="lux-row"
                      style={{ borderBottom: '1px solid rgba(212,175,55,.07)', transition: 'background .2s' }}>
                      <td style={tdStyle}>
                        <span style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 'clamp(13px,2vw,17px)', fontWeight: 600, color: '#F5E6A8'
                        }}>{guest.guest_name}</span>
                        {guest.partner_name && (
                          <span style={{
                            display: 'block', fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 11, fontStyle: 'italic', color: 'rgba(212,175,55,.45)', marginTop: 2
                          }}>+ {guest.partner_name}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {guest.is_coming ? (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '3px 10px', borderRadius: 100,
                            background: 'rgba(74,222,128,.08)', border: '1px solid rgba(74,222,128,.25)',
                            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
                            color: 'rgba(134,239,172,.9)', whiteSpace: 'nowrap'
                          }}>✦ VINE</span>
                        ) : (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '3px 10px', borderRadius: 100,
                            background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.25)',
                            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
                            color: 'rgba(252,165,165,.9)', whiteSpace: 'nowrap'
                          }}>◆ NU</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          fontFamily: "'Cinzel', serif", fontSize: 11,
                          color: 'rgba(212,175,55,.7)', letterSpacing: '.06em'
                        }}>{guest.adults_count}A / {guest.kids_count}C</span>
                      </td>
                      <td style={tdStyle} className="td-cazare">
                        <span style={{
                          fontFamily: "'Cinzel', serif", fontSize: 11,
                          color: guest.needs_accommodation ? 'rgba(212,175,55,.8)' : 'rgba(245,230,168,.25)',
                          letterSpacing: '.06em'
                        }}>
                          {guest.needs_accommodation ? "◆ DA" : "—"}
                        </span>
                      </td>
                      <td style={tdStyle} className="td-transport">
                        <span style={{
                          fontFamily: "'Cinzel', serif", fontSize: 11,
                          color: guest.needs_transport ? 'rgba(212,175,55,.8)' : 'rgba(245,230,168,.25)',
                          letterSpacing: '.06em'
                        }}>
                          {guest.needs_transport ? "◆ DA" : "—"}
                        </span>
                      </td>
                      <td style={tdStyle} className="td-details">
                        {guest.dietary_preferences && (
                          <div style={{ marginBottom: guest.other_mentions ? 5 : 0 }}>
                            <span style={{
                              fontFamily: "'Cinzel', serif", fontSize: 7,
                              letterSpacing: '.14em', textTransform: 'uppercase',
                              color: 'rgba(212,175,55,.5)', display: 'block', marginBottom: 2
                            }}>Dietă</span>
                            <span style={{
                              fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                              fontStyle: 'italic', color: 'rgba(245,230,168,.7)'
                            }}>{guest.dietary_preferences}</span>
                          </div>
                        )}
                        {guest.other_mentions && (
                          <div>
                            <span style={{
                              fontFamily: "'Cinzel', serif", fontSize: 7,
                              letterSpacing: '.14em', textTransform: 'uppercase',
                              color: 'rgba(212,175,55,.5)', display: 'block', marginBottom: 2
                            }}>Mesaj</span>
                            <span style={{
                              fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                              fontStyle: 'italic', color: 'rgba(245,230,168,.7)'
                            }}>{guest.other_mentions}</span>
                          </div>
                        )}
                        {!guest.dietary_preferences && !guest.other_mentions && (
                          <span style={{ color: 'rgba(245,230,168,.2)', fontSize: 14 }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                      <div style={{ marginBottom: 10, opacity: .3 }}>
                        <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36, margin: '0 auto' }}>
                          <rect x="8" y="8" width="32" height="36" rx="3" stroke="#D4AF37" strokeWidth="1.5" />
                          <path d="M16 18h16M16 25h16M16 32h8" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
                        fontStyle: 'italic', fontWeight: 300, color: 'rgba(212,175,55,.35)',
                        marginBottom: 5
                      }}>Niciun răspuns încă</p>
                      <p style={{
                        fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.22em',
                        textTransform: 'uppercase', color: 'rgba(212,175,55,.25)'
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

const thStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
  fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em',
  textTransform: 'uppercase', color: 'rgba(212,175,55,.55)',
  textAlign: 'left', fontWeight: 600,
  borderBottom: '1px solid rgba(212,175,55,.15)',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
  verticalAlign: 'top',
};

const StatCard = ({ title, value, icon }: any) => (
  <div style={{
    background: 'rgba(212,175,55,.04)',
    border: '1px solid rgba(212,175,55,.18)',
    borderRadius: 14,
    padding: 'clamp(12px,2vw,20px) clamp(10px,1.5vw,16px)',
    textAlign: 'center' as const,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)',
    transition: 'transform .2s ease, box-shadow .2s ease'
  }}>
    <div style={{
      position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
      background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35),transparent)'
    }} />
    {icon && (
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 8px', flexShrink: 0
      }}>{icon}</div>
    )}
    <p style={{
      fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
      textTransform: 'uppercase', color: 'rgba(212,175,55,.45)',
      marginBottom: 6
    }}>{title}</p>
    <h4 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 300,
      color: '#F5E6A8', margin: 0, lineHeight: 1,
      textShadow: '0 0 30px rgba(212,175,55,.2)'
    }}>{value || 0}</h4>
  </div>
);

const GoldDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 24 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35))' }} />
    <svg viewBox="0 0 60 20" width="54" height="18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6" />
      <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6" />
      <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9" />
      <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8" />
      <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5" />
      <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5" />
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.35),transparent)' }} />
  </div>
);