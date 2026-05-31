// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import { SummarySection } from './components/SummarySection';
// import { PersonalizeSection } from './components/PersonalizeSection';
// import { MenuSection } from './components/MenuSection';
// import { PhotosSection } from './components/PhotosSection';
// import { DeleteAccountButton } from './components/DeleteAccountButton';

// const R = {
//   navy: '#0B1929',
//   navy2: '#0F2040',
//   royalBg: '#071220',
//   silver: '#C8D8E8',
//   silver2: '#A8BDD0',
//   silver3: '#E8F0F8',
//   silver4: '#6888A8',
//   velvet2: '#243870',
//   accent: '#7CA8D8',
//   text: '#E0EAF5',
//   textlt: '#8AAAC8',
// };

// export default function RoyalDashboard() {
//   const [activeTab, setActiveTab] = useState('summary');
//   const [loading, setLoading] = useState(true);
//   const [weddingData, setWeddingData] = useState<any>(null);

//   const refreshData = useCallback(async () => {
//     try {
//       const res = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
//       if (res.ok) {
//         const data = await res.json();
//         setWeddingData(data.weddingDetails);
//       } else if (res.status === 401) {
//         window.location.href = '/login';
//       }
//     } catch (err) {
//       console.error("Eroare la sincronizare:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     refreshData();
//   }, [refreshData]);

//   if (loading) return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         @keyframes ry-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//       `}</style>
//       <div style={{
//         background: R.royalBg, color: R.silver, height: '100dvh', width: '100vw',
//         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
//       }}>
//         <div style={{
//           width: 36, height: 36, border: `1.5px solid rgba(200,216,232,.25)`,
//           borderTopColor: R.silver, borderRadius: '50%',
//           animation: 'ry-spin 1s linear infinite'
//         }} />
//         <span style={{
//           fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.36em',
//           textTransform: 'uppercase', color: R.silver4
//         }}>Sincronizare Date Royal...</span>
//       </div>
//     </>
//   );

//   const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
//   const currentOrderId = weddingData?.order_id || weddingData?.id;

//   const tabs = [
//     {
//       id: 'summary', label: 'Dashboard',
//       icon: (
//         <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//           <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
//           <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
//           <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
//           <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
//         </svg>
//       )
//     },
//     {
//       id: 'personalize', label: 'Personalizare',
//       icon: (
//         <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//           <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       )
//     },
//     {
//       id: 'menu', label: 'Meniu',
//       icon: (
//         <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//           <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       )
//     },
//     {
//       id: 'photos', label: 'Galerie',
//       icon: (
//         <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//           <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
//           <path d="M6 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" />
//           <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
//         </svg>
//       )
//     },
//   ];

//   const tabLabels: Record<string, string> = {
//     summary: 'Dashboard',
//     personalize: 'Personalizare',
//     menu: 'Meniu Nuntă',
//     photos: 'Galerie Poze',
//   };

//   const SignOutIcon = () => (
//     <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//       <path d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"
//         stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         html {
//           height: 100%;
//           overscroll-behavior: none;
//           -webkit-text-size-adjust: 100%;
//         }
//         body {
//           height: 100%;
//           overscroll-behavior: none;
//           font-family: 'Lato', sans-serif;
//           background: ${R.royalBg};
//           color: ${R.text};
//           -webkit-font-smoothing: antialiased;
//           overflow: hidden;
//         }

//         @keyframes ry-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
//         @keyframes ry-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
//         @keyframes ry-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .5 } }

//         .ry-tab { transition: background .2s, color .2s, border-color .2s; }
//         .ry-tab:hover  { background: rgba(124,168,216,.08) !important; color: ${R.silver} !important; }
//         .ry-tab-active { background: rgba(124,168,216,.12) !important; color: ${R.silver3} !important; border-color: rgba(200,216,232,.3) !important; }

//         .ry-signout { transition: background .2s, border-color .2s, color .2s; }
//         .ry-signout:hover { background: rgba(255,60,60,.12) !important; border-color: rgba(255,80,80,.45) !important; color: #ff6b6b !important; }

//         .ry-mobile-tab { transition: color .2s, background .2s; }
//         .ry-mobile-tab:hover { background: rgba(124,168,216,.08) !important; }

//         .ry-app-shell {
//           position: fixed;
//           top: 0; left: 0;
//           width: 100%;
//           height: 100dvh;
//           display: flex;
//           background: ${R.royalBg};
//           overflow: hidden;
//         }

//         .ry-sidebar { display: flex !important; }
//         .ry-mobile-header { display: none !important; }
//         .ry-mobile-nav { display: none !important; }
//         .ry-tablet-nav { display: none !important; }

//         .ry-main {
//           flex: 1;
//           height: 100dvh;
//           overflow-y: auto;
//           overflow-x: hidden;
//           overscroll-behavior-y: contain;
//           -webkit-overflow-scrolling: auto;
//           padding: clamp(28px,4vw,52px) clamp(20px,4vw,64px);
//           position: relative;
//           z-index: 5;
//         }

//         @media (max-width: 1023px) {
//           .ry-sidebar { display: none !important; }
//           .ry-mobile-header { display: flex !important; }
//           .ry-tablet-nav { display: flex !important; }
//           .ry-main {
//             padding-top: 116px !important;
//             padding-left: 16px !important;
//             padding-right: 16px !important;
//             padding-bottom: 40px !important;
//           }
//         }

//         @media (max-width: 767px) {
//           .ry-tablet-nav { display: none !important; }
//           .ry-mobile-nav { display: flex !important; }
//           .ry-main {
//             padding-top: 72px !important;
//             padding-left: 12px !important;
//             padding-right: 12px !important;
//             padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 20px) !important;
//             height: 100dvh !important;
//           }
//         }

//         @media (max-width: 379px) {
//           .ry-main {
//             padding-left: 8px !important;
//             padding-right: 8px !important;
//           }
//         }

//         .ry-main > * { max-width: 100%; box-sizing: border-box; }
//         img, svg { max-width: 100%; }

//         .ry-mobile-nav {
//           padding-bottom: env(safe-area-inset-bottom, 0px) !important;
//           height: calc(68px + env(safe-area-inset-bottom, 0px)) !important;
//         }

//         input, textarea, select {
//           font-size: 16px !important;
//         }
//       `}</style>
// {/* PORTAL TARGET */}
//         <div id="modal-root" style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, pointerEvents: 'none' }} />
//       <div className="ry-app-shell">

//         {/* BG ATMOSPHERE */}
//         <div style={{
//           position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
//           background: `
//             radial-gradient(ellipse 70% 60% at 20% 50%, rgba(124,168,216,.04) 0%, transparent 60%),
//             radial-gradient(ellipse 50% 40% at 80% 80%, rgba(124,168,216,.03) 0%, transparent 55%)
//           `
//         }} />

//         {/* ══ MOBILE / TABLET HEADER (≤ 1023px) ══ */}
//         <header className="ry-mobile-header" style={{
//           position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
//           height: 56,
//           display: 'none',
//           alignItems: 'center', justifyContent: 'space-between',
//           padding: '0 14px',
//           background: `rgba(7,18,32,.97)`,
//           borderBottom: `1px solid rgba(200,216,232,.15)`,
//           backdropFilter: 'blur(20px)',
//           gap: 8,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
//             <span style={{
//               fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
//               letterSpacing: '.2em', color: R.silver
//             }}>
//               VIBE<span style={{ color: R.silver4 }}>INVITE</span>
//             </span>
//           </div>

//           <span style={{
//             fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//             fontStyle: 'italic', color: R.silver4,
//             flex: 1, textAlign: 'center',
//             overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//             padding: '0 6px'
//           }}>
//             {tabLabels[activeTab]}
//           </span>

//           <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
//             <div style={{
//               display: 'flex', alignItems: 'center', gap: 4,
//               padding: '4px 9px', borderRadius: 100,
//               background: isProfileComplete ? `rgba(124,168,216,.08)` : 'rgba(255,165,0,.08)',
//               border: `1px solid ${isProfileComplete ? `rgba(200,216,232,.25)` : 'rgba(255,165,0,.25)'}`,
//               fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
//               color: isProfileComplete ? R.silver2 : 'rgba(255,165,0,.8)',
//               whiteSpace: 'nowrap'
//             }}>
//               <div style={{
//                 width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
//                 background: isProfileComplete ? R.accent : '#ffa500',
//                 animation: 'ry-pulse 2s ease-in-out infinite'
//               }} />
//               {isProfileComplete ? 'LIVE' : 'SETUP'}
//             </div>
// <DeleteAccountButton />
//             <button
//               className="ry-signout"
//               onClick={() => window.location.href = '/login'}
//               title="Ieșire"
//               style={{
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
//                 padding: '6px 10px', borderRadius: 8,
//                 background: 'rgba(255,60,60,.07)',
//                 border: '1px solid rgba(255,60,60,.22)',
//                 color: 'rgba(255,100,100,.75)',
//                 fontFamily: "'Cinzel', serif", fontSize: 8, fontWeight: 600,
//                 letterSpacing: '.14em', textTransform: 'uppercase',
//                 cursor: 'pointer', whiteSpace: 'nowrap'
//               }}>
//               <SignOutIcon />
//               <span>Ieșire</span>
//             </button>
//           </div>
//         </header>

//         {/* ══ DESKTOP SIDEBAR (≥ 1024px) ══ */}
//         <aside className="ry-sidebar" style={{
//           width: 248, flexShrink: 0,
//           background: `linear-gradient(180deg,${R.navy2} 0%,${R.navy} 100%)`,
//           borderRight: `1px solid rgba(200,216,232,.15)`,
//           flexDirection: 'column',
//           padding: '28px 0',
//           position: 'relative', zIndex: 10,
//           boxShadow: '4px 0 30px rgba(0,0,0,.35)'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
//             background: `linear-gradient(90deg,transparent,rgba(200,216,232,.4),transparent)`
//           }} />

//           {/* Logo */}
//           <div style={{ textAlign: 'center', padding: '0 20px 24px', borderBottom: `1px solid rgba(200,216,232,.1)` }}>
//             <h1 style={{
//               fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
//               letterSpacing: '.28em', color: R.silver, margin: '0 0 4px'
//             }}>VIBE<span style={{ color: R.silver4 }}>INVITE</span></h1>
//             <span style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em',
//               textTransform: 'uppercase', color: R.silver4
//             }}>Premium Royal Edition</span>
//           </div>

//           {/* Nav */}
//           <nav style={{ flex: 1, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.28em',
//               textTransform: 'uppercase', color: R.silver4,
//               padding: '0 10px', marginBottom: 8
//             }}>Navigare</p>
//             {tabs.map(tab => (
//               <button
//                 key={tab.id}
//                 className={`ry-tab ${activeTab === tab.id ? 'ry-tab-active' : ''}`}
//                 onClick={() => setActiveTab(tab.id)}
//                 style={{
//                   width: '100%', padding: '11px 14px',
//                   display: 'flex', alignItems: 'center', gap: 11,
//                   background: 'transparent',
//                   border: '1px solid transparent',
//                   borderRadius: 10,
//                   color: activeTab === tab.id ? R.silver3 : R.silver4,
//                   cursor: 'pointer', textAlign: 'left',
//                   fontFamily: "'Cinzel', serif",
//                   fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
//                 }}>
//                 <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
//                 {tab.label}
//                 {activeTab === tab.id && (
//                   <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: R.accent, flexShrink: 0 }} />
//                 )}
//               </button>
//             ))}
//           </nav>

//           {/* Status + Logout */}
//           <div style={{ padding: '0 14px' }}>
//             <div style={{
//               padding: '12px 14px', marginBottom: 10,
//               background: isProfileComplete ? `rgba(124,168,216,.06)` : 'rgba(255,140,0,.06)',
//               border: `1px solid ${isProfileComplete ? `rgba(200,216,232,.2)` : 'rgba(255,140,0,.25)'}`,
//               borderRadius: 12, position: 'relative', overflow: 'hidden'
//             }}>
//               <div style={{
//                 position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//                 background: `linear-gradient(90deg,transparent,${isProfileComplete ? `rgba(200,216,232,.3)` : 'rgba(255,140,0,.25)'},transparent)`
//               }} />
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
//                 <div style={{
//                   width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
//                   background: isProfileComplete ? R.accent : '#ffa500',
//                   animation: 'ry-pulse 2s ease-in-out infinite',
//                 }} />
//                 <span style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
//                   textTransform: 'uppercase',
//                   color: isProfileComplete ? R.silver2 : 'rgba(255,165,0,.8)'
//                 }}>{isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}</span>
//               </div>
//               {isProfileComplete && (
//                 <p style={{
//                   fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
//                   fontStyle: 'italic', color: R.silver4,
//                   wordBreak: 'break-all', lineHeight: 1.5
//                 }}>
//                   vibeinvite.ro/invitatie/royal/<strong style={{ color: R.silver2, fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
//                 </p>
//               )}
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//               <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(200,216,232,.2))` }} />
//               <div style={{ width: 4, height: 4, background: `rgba(200,216,232,.3)`, transform: 'rotate(45deg)', margin: '0 6px' }} />
//               <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(200,216,232,.2),transparent)` }} />
//             </div>
// <DeleteAccountButton />
//             <button
//               className="ry-signout"
//               onClick={() => window.location.href = '/login'}
//               style={{
//                 width: '100%',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//                 padding: '9px 14px', borderRadius: 8,
//                 background: 'rgba(255,60,60,.06)',
//                 border: '1px solid rgba(255,60,60,.2)',
//                 color: 'rgba(255,100,100,.7)',
//                 fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
//                 letterSpacing: '.18em', textTransform: 'uppercase',
//                 cursor: 'pointer',
//               }}>
//               <SignOutIcon />
//               Ieșire
//             </button>

//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em',
//               textTransform: 'uppercase', color: R.silver4,
//               textAlign: 'center', marginTop: 14, opacity: .4
//             }}>VibeInvite © 2026</p>
//           </div>

//           <div style={{
//             position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
//             background: `linear-gradient(90deg,transparent,rgba(200,216,232,.25),transparent)`
//           }} />
//         </aside>

//         {/* ══ MAIN CONTENT ══ */}
//         <main className="ry-main">
//           <div style={{ animation: 'ry-fade-in .5s ease both', position: 'relative', zIndex: 5, width: '100%' }}>
//             {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} />}
//             {activeTab === 'personalize' && (
//               <PersonalizeSection
//                 initialData={weddingData}
//                 orderId={currentOrderId}
//                 onSave={refreshData}
//               />
//             )}
//             {activeTab === 'menu' && (
//               <MenuSection
//                 initialData={weddingData}
//                 orderId={currentOrderId}
//                 onSave={refreshData}
//               />
//             )}
//             {activeTab === 'photos' && (
//               <PhotosSection
//                 initialData={weddingData}
//                 orderId={currentOrderId}
//                 onSave={refreshData}
//               />
//             )}
//           </div>
//         </main>

//         {/* ══ TABLET HORIZONTAL NAV (768–1023px) ══ */}
//         <nav className="ry-tablet-nav" style={{
//           position: 'fixed', top: 56, left: 0, right: 0, zIndex: 150,
//           height: 48,
//           background: `rgba(11,25,41,.97)`,
//           borderBottom: `1px solid rgba(200,216,232,.12)`,
//           backdropFilter: 'blur(16px)',
//           alignItems: 'stretch',
//           display: 'none',
//           padding: '0 12px', gap: 4,
//           overflowX: 'auto',
//         }}>
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className={`ry-tab ${activeTab === tab.id ? 'ry-tab-active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 7,
//                 padding: '0 14px', flexShrink: 0,
//                 background: 'transparent',
//                 border: '1px solid transparent',
//                 borderRadius: 8,
//                 color: activeTab === tab.id ? R.silver3 : R.silver4,
//                 cursor: 'pointer',
//                 fontFamily: "'Cinzel', serif",
//                 fontSize: 9, fontWeight: 600, letterSpacing: '.1em',
//                 whiteSpace: 'nowrap',
//               }}>
//               <span style={{ opacity: activeTab === tab.id ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
//               {tab.label}
//               {activeTab === tab.id && (
//                 <div style={{ width: 4, height: 4, borderRadius: '50%', background: R.accent, marginLeft: 2, flexShrink: 0 }} />
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* ══ PHONE BOTTOM NAV (< 768px) ══ */}
//         <nav className="ry-mobile-nav" style={{
//           position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
//           minHeight: 68,
//           background: `rgba(7,18,32,.98)`,
//           borderTop: `1px solid rgba(200,216,232,.15)`,
//           backdropFilter: 'blur(20px)',
//           display: 'none',
//           alignItems: 'flex-start',
//           justifyContent: 'stretch',
//           boxShadow: '0 -4px 24px rgba(0,0,0,.4)'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: `linear-gradient(90deg,transparent,rgba(200,216,232,.3),transparent)`
//           }} />
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className="ry-mobile-tab"
//               onClick={() => setActiveTab(tab.id)}
//               style={{
//                 flex: 1, display: 'flex', flexDirection: 'column',
//                 alignItems: 'center', justifyContent: 'center', gap: 4,
//                 background: 'transparent', border: 'none', cursor: 'pointer',
//                 borderTop: activeTab === tab.id ? `2px solid ${R.accent}` : '2px solid transparent',
//                 color: activeTab === tab.id ? R.silver : R.silver4,
//                 padding: '10px 4px 8px',
//                 minWidth: 0,
//                 minHeight: 56,
//               }}>
//               <span style={{
//                 transition: 'transform .2s',
//                 transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)',
//                 flexShrink: 0
//               }}>
//                 {tab.icon}
//               </span>
//               <span style={{
//                 fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.08em',
//                 textTransform: 'uppercase', fontWeight: 600,
//                 color: activeTab === tab.id ? R.silver : R.silver4,
//                 overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//                 maxWidth: '100%'
//               }}>
//                 {tab.label}
//               </span>
//             </button>
//           ))}
//         </nav>

//       </div>
//     </>
//   );
// }


"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { SummarySection }     from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection }         from './components/MenuSection';
import { PhotosSection }       from './components/PhotosSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';
import { C, G, F, FS, LAYOUT, ANIM, SH } from './ui.tokens';

// ─────────────────────────────────────────────────────────────
//  GLOBAL CSS – injectat o singură dată la nivel de pagină
//  Toate regulile de scroll, layout și animații se află AICI.
// ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── SCROLL ROOT ──────────────────────────────────────────
     Regulă de bază: html + body NU au overflow hidden.
     Scroll-ul se produce pe .ry-main (coloana de conținut),
     nu pe body, astfel încât sidebar-ul rămâne fix pe desktop
     iar pe mobil/tabletă tot .ry-main scrollează.
  ─────────────────────────────────────────────────────────── */
  html {
    height: 100%;
    /* Previne zoom automat pe iOS la focus pe input */
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    /* Previne bounce/overscroll la nivel de pagină */
    overscroll-behavior: none;
  }

  body {
    height: 100%;
    font-family: ${F.body};
    background: ${C.royalBg};
    color: ${C.text};
    -webkit-font-smoothing: antialiased;
    /* NU overflow:hidden! Lasă scroll-ul natural */
    overflow: hidden;          /* blochează scroll pe body — scrollăm din .ry-main */
    overscroll-behavior: none;
  }

  /* ── ANIMAȚII ───────────────────────────────────────────── */
  @keyframes ry-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
  @keyframes ry-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes ry-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .5 } }
  @keyframes shimmer-ps { 0% { background-position: -350px 0 } 100% { background-position: 350px 0 } }

  /* ── SHELL (container fix, full-screen) ──────────────────
     Folosim position:fixed + inset:0 în loc de height:100dvh
     pentru compatibilitate maximă pe Safari iOS.
  ─────────────────────────────────────────────────────────── */
  .ry-app-shell {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    display: flex;
    flex-direction: row;
    background: ${C.royalBg};
    overflow: hidden;   /* containerul exterior NU scrollează */
  }

  /* ── SIDEBAR (desktop ≥1024px) ──────────────────────────── */
  .ry-sidebar {
    display: flex !important;
    flex-direction: column;
    width: ${LAYOUT.sidebarWidth}px;
    flex-shrink: 0;
    height: 100%;          /* se întinde pe înălțimea shellului */
    overflow-y: auto;      /* sidebar poate scrolla dacă e nevoie */
    overflow-x: hidden;
    overscroll-behavior: contain;
  }

  /* ── MAIN (zona de conținut care scrollează) ─────────────
     Aceasta este SINGURA zonă cu scroll vertical.
     touch-action: pan-y => permite scroll touch, blochează
     pan-x și pinch-zoom accidental.
  ─────────────────────────────────────────────────────────── */
  .ry-main {
    flex: 1;
    min-width: 0;          /* previne overflow în flex container */
    height: 100%;          /* se extinde pe tot shellul */
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior-y: contain;
    /* iOS momentum scrolling (critică!) */
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    padding: ${LAYOUT.mainPaddingDesktop};
    position: relative;
    z-index: 5;
    /* Previne crearea unui stacking context care blochează modals */
    isolation: isolate;
  }

  .ry-main > * {
    max-width: 100%;
    box-sizing: border-box;
  }

  /* ── HEADER MOBIL/TABLETĂ (ascuns pe desktop) ─────────── */
  .ry-mobile-header {
    display: none !important;
  }

  /* ── NAV TABLETĂ ORIZONTAL (ascuns implicit) ─────────── */
  .ry-tablet-nav {
    display: none !important;
  }

  /* ── NAV TELEFON BOTTOM (ascuns implicit) ─────────────── */
  .ry-mobile-nav {
    display: none !important;
  }

  /* ── TABS ─────────────────────────────────────────────── */
  .ry-tab { transition: background .2s, color .2s, border-color .2s; }
  .ry-tab:hover  { background: ${C.hoverTab} !important; color: ${C.silver} !important; }
  .ry-tab-active { background: ${C.hoverTabA} !important; color: ${C.silver3} !important; border-color: rgba(200,216,232,.3) !important; }

  .ry-signout { transition: background .2s, border-color .2s, color .2s; }
  .ry-signout:hover {
    background: rgba(255,60,60,.12) !important;
    border-color: rgba(255,80,80,.45) !important;
    color: #ff6b6b !important;
  }

  .ry-mobile-tab { transition: color .2s, background .2s; }
  .ry-mobile-tab:hover { background: ${C.hoverTab} !important; }

  /* ── INPUT – previne zoom iOS (font-size ≥ 16px) ──────── */
  input, textarea, select {
    font-size: 16px !important;
    -webkit-text-size-adjust: 100%;
  }

  img, svg { max-width: 100%; }

  /* ════════════════════════════════════════════════════════
     RESPONSIVE – TABLETĂ (768px – 1023px)
  ════════════════════════════════════════════════════════ */
  @media (max-width: 1023px) {
    .ry-sidebar        { display: none !important; }
    .ry-mobile-header  { display: flex !important; }
    .ry-tablet-nav     { display: flex !important; }

    .ry-main {
      /* top = header(56px) + tabletNav(48px) + 12px gap */
      padding-top:    116px !important;
      padding-left:   16px  !important;
      padding-right:  16px  !important;
      padding-bottom: 40px  !important;
    }
  }

  /* ════════════════════════════════════════════════════════
     RESPONSIVE – TELEFON (≤ 767px)
  ════════════════════════════════════════════════════════ */
  @media (max-width: 767px) {
    .ry-tablet-nav  { display: none !important; }
    .ry-mobile-nav  { display: flex !important; }

    .ry-main {
      /* top = header(56px) + 12px; bottom = nav(68px) + safeArea + 16px */
      padding-top:    72px  !important;
      padding-left:   12px  !important;
      padding-right:  12px  !important;
      /*
        env(safe-area-inset-bottom) = zona home indicator iOS.
        68px = înălțimea navului fix + 16px buffer.
      */
      padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 16px) !important;
    }
  }

  /* ════════════════════════════════════════════════════════
     RESPONSIVE – TELEFON FOARTE MIC (≤ 379px)
  ════════════════════════════════════════════════════════ */
  @media (max-width: 379px) {
    .ry-main {
      padding-left:  8px !important;
      padding-right: 8px !important;
    }
  }

  /* ── NAV MOBIL: safe area padding ─────────────────────── */
  .ry-mobile-nav {
    padding-bottom: env(safe-area-inset-bottom, 0px) !important;
    min-height: calc(${LAYOUT.mobileNavH}px + env(safe-area-inset-bottom, 0px)) !important;
  }
`;

// ─────────────────────────────────────────────────────────────
export default function RoyalDashboard() {
  const [activeTab,   setActiveTab]   = useState('summary');
  const [loading,     setLoading]     = useState(true);
  const [weddingData, setWeddingData] = useState<any>(null);

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setWeddingData(data.weddingDetails);
      } else if (res.status === 401) {
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Eroare la sincronizare:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshData(); }, [refreshData]);

  // ── Loading screen ────────────────────────────────────────
  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: ${C.royalBg}; overflow: hidden; }
        @keyframes ry-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
      <div style={{
        position: 'fixed', inset: 0,
        background: C.royalBg, color: C.silver,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{
          width: 36, height: 36,
          border: `1.5px solid rgba(200,216,232,.25)`,
          borderTopColor: C.silver, borderRadius: '50%',
          animation: ANIM.spin,
        }} />
        <span style={{
          fontFamily: F.display, fontSize: FS.label,
          letterSpacing: '.36em', textTransform: 'uppercase', color: C.silver4,
        }}>Sincronizare Date Royal...</span>
      </div>
    </>
  );

  // ── Derived state ─────────────────────────────────────────
  const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
  const currentOrderId    = weddingData?.order_id || weddingData?.id;

  const tabs = [
    {
      id: 'summary', label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <rect x="2"  y="2"  width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="11" y="2"  width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="2"  y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
    {
      id: 'personalize', label: 'Personalizare',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'menu', label: 'Meniu',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'photos', label: 'Galerie',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
  ];

  const tabLabels: Record<string, string> = {
    summary:     'Dashboard',
    personalize: 'Personalizare',
    menu:        'Meniu Nuntă',
    photos:      'Galerie Poze',
  };

  const SignOutIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
      <path d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Portal target pentru modals – în afara oricărui overflow:hidden */}
      <div
        id="modal-root"
        style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: 'none' }}
      />

      <div className="ry-app-shell">

        {/* ── ATMOSFERĂ FUNDAL ─────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: G.atmosphere,
        }} />

        {/* ══ HEADER MOBIL/TABLETĂ (≤ 1023px) ═════════════════ */}
        <header className="ry-mobile-header" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: `${LAYOUT.mobileHeaderH}px`,
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 14px',
          background: C.glass4,
          borderBottom: `1px solid ${C.border3}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          gap: 8,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <span style={{
              fontFamily: F.display, fontSize: 11, fontWeight: 600,
              letterSpacing: '.2em', color: C.silver,
            }}>
              VIBE<span style={{ color: C.silver4 }}>INVITE</span>
            </span>
          </div>

          {/* Tab curent */}
          <span style={{
            fontFamily: F.serif, fontSize: 13, fontStyle: 'italic', color: C.silver4,
            flex: 1, textAlign: 'center',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            padding: '0 6px',
          }}>
            {tabLabels[activeTab]}
          </span>

          {/* Status + butoane */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 9px', borderRadius: 100,
              background: isProfileComplete ? C.hoverTab : 'rgba(255,165,0,.08)',
              border: `1px solid ${isProfileComplete ? C.border1 : C.warnBd}`,
              fontFamily: F.display, fontSize: 8, letterSpacing: '.12em',
              color: isProfileComplete ? C.silver2 : 'rgba(255,165,0,.8)',
              whiteSpace: 'nowrap',
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                background: isProfileComplete ? C.accent : C.warn,
                animation: ANIM.pulse,
              }} />
              {isProfileComplete ? 'LIVE' : 'SETUP'}
            </div>
            <DeleteAccountButton />
            <button
              className="ry-signout"
              onClick={() => window.location.href = '/login'}
              title="Ieșire"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '6px 10px', borderRadius: 8,
                background: 'rgba(255,60,60,.07)',
                border: '1px solid rgba(255,60,60,.22)',
                color: 'rgba(255,100,100,.75)',
                fontFamily: F.display, fontSize: 8, fontWeight: 600,
                letterSpacing: '.14em', textTransform: 'uppercase',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
              <SignOutIcon />
              <span>Ieșire</span>
            </button>
          </div>
        </header>

        {/* ══ SIDEBAR DESKTOP (≥ 1024px) ════════════════════════ */}
        <aside className="ry-sidebar" style={{
          background: G.sidebar,
          borderRight: `1px solid ${C.border3}`,
          padding: '28px 0',
          position: 'relative', zIndex: 10,
          boxShadow: SH.sidebar,
        }}>
          {/* Top line */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: G.topLine,
          }} />

          {/* Logo */}
          <div style={{
            textAlign: 'center', padding: '0 20px 24px',
            borderBottom: `1px solid ${C.border5}`,
          }}>
            <h1 style={{
              fontFamily: F.display, fontSize: 13, fontWeight: 600,
              letterSpacing: '.28em', color: C.silver, margin: '0 0 4px',
            }}>
              VIBE<span style={{ color: C.silver4 }}>INVITE</span>
            </h1>
            <span style={{
              fontFamily: F.display, fontSize: 7, letterSpacing: '.22em',
              textTransform: 'uppercase', color: C.silver4,
            }}>
              Premium Royal Edition
            </span>
          </div>

          {/* Navigare */}
          <nav style={{
            flex: 1, padding: '18px 14px',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <p style={{
              fontFamily: F.display, fontSize: 7, letterSpacing: '.28em',
              textTransform: 'uppercase', color: C.silver4,
              padding: '0 10px', marginBottom: 8,
            }}>Navigare</p>

            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`ry-tab ${activeTab === tab.id ? 'ry-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', padding: '11px 14px',
                  display: 'flex', alignItems: 'center', gap: 11,
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 10,
                  color: activeTab === tab.id ? C.silver3 : C.silver4,
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: F.display,
                  fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
                }}>
                <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>
                  {tab.icon}
                </span>
                {tab.label}
                {activeTab === tab.id && (
                  <div style={{
                    marginLeft: 'auto', width: 4, height: 4,
                    borderRadius: '50%', background: C.accent, flexShrink: 0,
                  }} />
                )}
              </button>
            ))}
          </nav>

          {/* Status + Logout */}
          <div style={{ padding: '0 14px' }}>
            {/* Status card */}
            <div style={{
              padding: '12px 14px', marginBottom: 10,
              background: isProfileComplete ? C.hoverTab : C.warnBg,
              border: `1px solid ${isProfileComplete ? C.border2 : C.warnBd}`,
              borderRadius: 12, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: `linear-gradient(90deg,transparent,${isProfileComplete ? `rgba(200,216,232,.3)` : 'rgba(255,140,0,.25)'},transparent)`,
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: isProfileComplete ? C.accent : C.warn,
                  animation: ANIM.pulse,
                }} />
                <span style={{
                  fontFamily: F.display, fontSize: 7, letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: isProfileComplete ? C.silver2 : 'rgba(255,165,0,.8)',
                }}>
                  {isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}
                </span>
              </div>
              {isProfileComplete && (
                <p style={{
                  fontFamily: F.serif, fontSize: 11,
                  fontStyle: 'italic', color: C.silver4,
                  wordBreak: 'break-all', lineHeight: 1.5,
                }}>
                  vibeinvite.ro/invitatie/royal/
                  <strong style={{ color: C.silver2, fontStyle: 'normal' }}>
                    {weddingData.custom_slug}
                  </strong>
                </p>
              )}
            </div>

            {/* Separator */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(200,216,232,.2))` }} />
              <div style={{ width: 4, height: 4, background: `rgba(200,216,232,.3)`, transform: 'rotate(45deg)', margin: '0 6px' }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(200,216,232,.2),transparent)` }} />
            </div>

            <DeleteAccountButton />

            {/* Ieșire */}
            <button
              className="ry-signout"
              onClick={() => window.location.href = '/login'}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '9px 14px', borderRadius: 8,
                background: 'rgba(255,60,60,.06)',
                border: '1px solid rgba(255,60,60,.2)',
                color: 'rgba(255,100,100,.7)',
                fontFamily: F.display, fontSize: 9, fontWeight: 600,
                letterSpacing: '.18em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}>
              <SignOutIcon />
              Ieșire
            </button>

            <p style={{
              fontFamily: F.display, fontSize: 7, letterSpacing: '.18em',
              textTransform: 'uppercase', color: C.silver4,
              textAlign: 'center', marginTop: 14, opacity: .4,
            }}>
              VibeInvite © 2026
            </p>
          </div>

          {/* Bottom line */}
          <div style={{
            position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
            background: `linear-gradient(90deg,transparent,rgba(200,216,232,.25),transparent)`,
          }} />
        </aside>

        {/* ══ MAIN – CONȚINUT PRINCIPAL ════════════════════════ */}
        <main className="ry-main">
          <div style={{ animation: ANIM.fadeIn, position: 'relative', zIndex: 5, width: '100%' }}>
            {activeTab === 'summary' && (
              <SummarySection isComplete={isProfileComplete} />
            )}
            {activeTab === 'personalize' && (
              <PersonalizeSection
                initialData={weddingData}
                orderId={currentOrderId}
                onSave={refreshData}
              />
            )}
            {activeTab === 'menu' && (
              <MenuSection
                initialData={weddingData}
                orderId={currentOrderId}
                onSave={refreshData}
              />
            )}
            {activeTab === 'photos' && (
              <PhotosSection
                initialData={weddingData}
                orderId={currentOrderId}
                onSave={refreshData}
              />
            )}
          </div>
        </main>

        {/* ══ NAV TABLETĂ ORIZONTAL (768–1023px) ═══════════════ */}
        <nav className="ry-tablet-nav" style={{
          position: 'fixed',
          top: `${LAYOUT.mobileHeaderH}px`,
          left: 0, right: 0, zIndex: 150,
          height: `${LAYOUT.tabletNavH}px`,
          background: `rgba(11,25,41,.97)`,
          borderBottom: `1px solid ${C.border4}`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          alignItems: 'stretch',
          padding: '0 12px', gap: 4,
          overflowX: 'auto',
          overflowY: 'hidden',
          /* Scroll orizontal pe nav fără a afecta main */
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`ry-tab ${activeTab === tab.id ? 'ry-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '0 14px', flexShrink: 0,
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: 8,
                color: activeTab === tab.id ? C.silver3 : C.silver4,
                cursor: 'pointer',
                fontFamily: F.display,
                fontSize: 9, fontWeight: 600, letterSpacing: '.1em',
                whiteSpace: 'nowrap',
              }}>
              <span style={{ opacity: activeTab === tab.id ? 1 : .65, flexShrink: 0 }}>
                {tab.icon}
              </span>
              {tab.label}
              {activeTab === tab.id && (
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: C.accent, marginLeft: 2, flexShrink: 0,
                }} />
              )}
            </button>
          ))}
        </nav>

        {/* ══ NAV TELEFON BOTTOM (< 768px) ═════════════════════ */}
        <nav className="ry-mobile-nav" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
          background: C.glass5,
          borderTop: `1px solid ${C.border3}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          alignItems: 'flex-start',
          justifyContent: 'stretch',
          boxShadow: SH.mobileNav,
          /* touch-action: none pe nav previne scroll accidental pe butoane */
          touchAction: 'none',
        } as React.CSSProperties}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: `linear-gradient(90deg,transparent,rgba(200,216,232,.3),transparent)`,
          }} />
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="ry-mobile-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderTop: activeTab === tab.id
                  ? `2px solid ${C.accent}`
                  : '2px solid transparent',
                color: activeTab === tab.id ? C.silver : C.silver4,
                padding: '10px 4px 8px',
                minWidth: 0, minHeight: 56,
              }}>
              <span style={{
                transition: 'transform .2s',
                transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)',
                flexShrink: 0,
              }}>
                {tab.icon}
              </span>
              <span style={{
                fontFamily: F.display, fontSize: 7, letterSpacing: '.08em',
                textTransform: 'uppercase', fontWeight: 600,
                color: activeTab === tab.id ? C.silver : C.silver4,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>

      </div>
    </>
  );
}
