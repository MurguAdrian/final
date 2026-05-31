// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import { SummarySection } from './components/SummarySection';
// import { PersonalizeSection } from './components/PersonalizeSection';
// import { MenuSection } from './components/MenuSection';
// import { PhotosSection } from './components/PhotosSection';
// import { DeleteAccountButton } from './components/DeleteAccountButton';

// export default function RomanticDashboard() {
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
//         @keyframes rm-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//         html,body{height:100%;overflow:hidden;overscroll-behavior:none;}
//       `}</style>
//       <div style={{
//         background: '#FDF5F6', color: '#7B1A2E', height: '100dvh', width: '100vw',
//         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
//       }}>
//         <div style={{
//           width: 36, height: 36, border: '1.5px solid rgba(166,50,72,.2)',
//           borderTopColor: '#A63248', borderRadius: '50%',
//           animation: 'rm-spin 1s linear infinite'
//         }} />
//         <span style={{
//           fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.32em',
//           textTransform: 'uppercase', color: 'rgba(166,50,72,.55)'
//         }}>Se încarcă...</span>
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
//           background: #FDF5F6;
//           color: #3D1520;
//           -webkit-font-smoothing: antialiased;
//           overflow: hidden;
//         }

//         @keyframes rm-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
//         @keyframes rm-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
//         @keyframes rm-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .5 } }

//         .rm-tab { transition: background .2s, color .2s, border-color .2s; }
//         .rm-tab:hover  { background: rgba(196,80,106,.07) !important; color: #A63248 !important; }
//         .rm-tab-active { background: linear-gradient(135deg,rgba(196,80,106,.12) 0%,rgba(196,80,106,.05) 100%) !important; color: #7B1A2E !important; border-color: rgba(196,80,106,.3) !important; }

//         .rm-signout { transition: background .2s, border-color .2s, color .2s; }
//         .rm-signout:hover { background: rgba(255,60,60,.1) !important; border-color: rgba(255,80,80,.45) !important; color: #e05555 !important; }

//         .rm-mobile-tab { transition: color .2s, background .2s; }
//         .rm-mobile-tab:hover { background: rgba(196,80,106,.06) !important; }

//         .rm-app-shell {
//           position: fixed;
//           top: 0; left: 0;
//           width: 100%;
//           height: 100dvh;
//           display: flex;
//           background: #FDF5F6;
//           overflow: hidden;
//         }

//         .rm-sidebar { display: flex !important; }
//         .rm-mobile-header { display: none !important; }
//         .rm-mobile-nav { display: none !important; }
//         .rm-tablet-nav { display: none !important; }

//         .rm-main {
//           flex: 1;
//           height: 100dvh;
//           overflow-y: auto;
//           overflow-x: hidden;
//           overscroll-behavior-y: contain;
//           -webkit-overflow-scrolling: auto;
//           padding: clamp(28px,4vw,52px) clamp(20px,4vw,64px);
//           position: relative;
//           z-index: 5;
//           background: #FDF5F6;
//         }

//         @media (max-width: 1023px) {
//           .rm-sidebar { display: none !important; }
//           .rm-mobile-header { display: flex !important; }
//           .rm-tablet-nav { display: flex !important; }
//           .rm-main {
//             padding-top: 116px !important;
//             padding-left: 16px !important;
//             padding-right: 16px !important;
//             padding-bottom: 40px !important;
//           }
//         }

//         @media (max-width: 767px) {
//           .rm-tablet-nav { display: none !important; }
//           .rm-mobile-nav { display: flex !important; }
//           .rm-main {
//             padding-top: 72px !important;
//             padding-left: 12px !important;
//             padding-right: 12px !important;
//             padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 20px) !important;
//             height: 100dvh !important;
//           }
//         }

//         @media (max-width: 379px) {
//           .rm-main {
//             padding-left: 8px !important;
//             padding-right: 8px !important;
//           }
//         }

//         .rm-main > * { max-width: 100%; box-sizing: border-box; }
//         img, svg { max-width: 100%; }

//         .rm-mobile-nav {
//           padding-bottom: env(safe-area-inset-bottom, 0px) !important;
//           height: calc(68px + env(safe-area-inset-bottom, 0px)) !important;
//         }

//         input, textarea, select {
//           font-size: 16px !important;
//         }
//       `}</style>
// {/* PORTAL TARGET */}
//         <div id="modal-root" style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, pointerEvents: 'none' }} />
//       <div className="rm-app-shell">

//         {/* BG ATMOSPHERE */}
//         <div style={{
//           position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
//           background: `
//             radial-gradient(ellipse 70% 60% at 15% 50%, rgba(232,160,168,.1) 0%, transparent 55%),
//             radial-gradient(ellipse 50% 40% at 85% 80%, rgba(196,80,106,.06) 0%, transparent 50%)
//           `
//         }} />

//         {/* MOBILE / TABLET HEADER */}
//         <header className="rm-mobile-header" style={{
//           position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
//           height: 56,
//           display: 'none',
//           alignItems: 'center', justifyContent: 'space-between',
//           padding: '0 14px',
//           background: 'rgba(253,245,246,.97)',
//           borderBottom: '1px solid rgba(196,80,106,.15)',
//           backdropFilter: 'blur(20px)',
//           gap: 8,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
//             <svg viewBox="0 0 24 22" fill="#A63248" style={{ width: 18, height: 17 }}>
//               <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z" />
//             </svg>
//             <span style={{
//               fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
//               letterSpacing: '.2em', color: '#7B1A2E'
//             }}>
//               VIBE<span style={{ color: 'rgba(166,50,72,.4)' }}>INVITE</span>
//             </span>
//           </div>

//           <span style={{
//             fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//             fontStyle: 'italic', color: 'rgba(166,50,72,.5)',
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
//               background: isProfileComplete ? 'rgba(196,80,106,.07)' : 'rgba(255,165,0,.08)',
//               border: `1px solid ${isProfileComplete ? 'rgba(196,80,106,.25)' : 'rgba(255,165,0,.25)'}`,
//               fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
//               color: isProfileComplete ? 'rgba(166,50,72,.85)' : 'rgba(255,165,0,.8)',
//               whiteSpace: 'nowrap'
//             }}>
//               <div style={{
//                 width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
//                 background: isProfileComplete ? '#A63248' : '#ffa500',
//                 boxShadow: `0 0 6px ${isProfileComplete ? 'rgba(166,50,72,.6)' : 'rgba(255,165,0,.6)'}`,
//                 animation: 'rm-pulse 2s ease-in-out infinite'
//               }} />
//               {isProfileComplete ? 'LIVE' : 'SETUP'}
//             </div>
// <DeleteAccountButton />
//             <button
//               className="rm-signout"
//               onClick={() => window.location.href = '/login'}
//               title="Ieșire"
//               style={{
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
//                 padding: '6px 10px', borderRadius: 8,
//                 background: 'rgba(255,60,60,.06)',
//                 border: '1px solid rgba(255,60,60,.2)',
//                 color: 'rgba(200,80,80,.75)',
//                 fontFamily: "'Cinzel', serif", fontSize: 8, fontWeight: 600,
//                 letterSpacing: '.14em', textTransform: 'uppercase',
//                 cursor: 'pointer', whiteSpace: 'nowrap'
//               }}>
//               <SignOutIcon />
//               <span>Ieșire</span>
//             </button>
//           </div>
//         </header>

//         {/* DESKTOP SIDEBAR */}
//         <aside className="rm-sidebar" style={{
//           width: 248, flexShrink: 0,
//           background: 'linear-gradient(180deg,#FEF8F8 0%,#FAF0F2 100%)',
//           borderRight: '1px solid rgba(196,80,106,.15)',
//           flexDirection: 'column',
//           padding: '28px 0',
//           position: 'relative', zIndex: 10,
//           boxShadow: '4px 0 30px rgba(123,26,46,.06)'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(196,80,106,.4),transparent)'
//           }} />

//           {/* Logo */}
//           <div style={{ textAlign: 'center', padding: '0 20px 24px', borderBottom: '1px solid rgba(196,80,106,.1)' }}>
//             <div style={{ marginBottom: 10 }}>
//               <svg viewBox="0 0 24 22" fill="#A63248" style={{ width: 32, height: 30, margin: '0 auto', filter: 'drop-shadow(0 2px 8px rgba(166,50,72,.2))' }}>
//                 <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z" />
//               </svg>
//             </div>
//             <h1 style={{
//               fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
//               letterSpacing: '.28em', color: '#7B1A2E', margin: '0 0 4px'
//             }}>VIBE<span style={{ color: 'rgba(166,50,72,.4)' }}>INVITE</span></h1>
//             <span style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em',
//               textTransform: 'uppercase', color: 'rgba(166,50,72,.35)'
//             }}>Romantic Edition</span>
//           </div>

//           {/* Nav */}
//           <nav style={{ flex: 1, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.28em',
//               textTransform: 'uppercase', color: 'rgba(166,50,72,.3)',
//               padding: '0 10px', marginBottom: 8
//             }}>Navigare</p>
//             {tabs.map(tab => (
//               <button
//                 key={tab.id}
//                 className={`rm-tab ${activeTab === tab.id ? 'rm-tab-active' : ''}`}
//                 onClick={() => setActiveTab(tab.id)}
//                 style={{
//                   width: '100%', padding: '11px 14px',
//                   display: 'flex', alignItems: 'center', gap: 11,
//                   background: 'transparent',
//                   border: '1px solid transparent',
//                   borderRadius: 10,
//                   color: activeTab === tab.id ? '#7B1A2E' : 'rgba(166,50,72,.5)',
//                   cursor: 'pointer', textAlign: 'left',
//                   fontFamily: "'Cinzel', serif",
//                   fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
//                 }}>
//                 <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
//                 {tab.label}
//                 {activeTab === tab.id && (
//                   <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#A63248', boxShadow: '0 0 8px rgba(166,50,72,.5)', flexShrink: 0 }} />
//                 )}
//               </button>
//             ))}
//           </nav>

//           {/* Status + Logout */}
//           <div style={{ padding: '0 14px' }}>
//             <div style={{
//               padding: '12px 14px', marginBottom: 10,
//               background: isProfileComplete ? 'rgba(196,80,106,.05)' : 'rgba(255,140,0,.05)',
//               border: `1px solid ${isProfileComplete ? 'rgba(196,80,106,.2)' : 'rgba(255,140,0,.22)'}`,
//               borderRadius: 12, position: 'relative', overflow: 'hidden'
//             }}>
//               <div style={{
//                 position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//                 background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(196,80,106,.35)' : 'rgba(255,140,0,.28)'},transparent)`
//               }} />
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
//                 <div style={{
//                   width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
//                   background: isProfileComplete ? '#A63248' : '#ffa500',
//                   boxShadow: `0 0 8px ${isProfileComplete ? 'rgba(166,50,72,.6)' : 'rgba(255,165,0,.6)'}`,
//                   animation: 'rm-pulse 2s ease-in-out infinite',
//                 }} />
//                 <span style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
//                   textTransform: 'uppercase',
//                   color: isProfileComplete ? 'rgba(166,50,72,.8)' : 'rgba(255,165,0,.8)'
//                 }}>{isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}</span>
//               </div>
//               {isProfileComplete && (
//                 <p style={{
//                   fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
//                   fontStyle: 'italic', color: 'rgba(166,50,72,.5)',
//                   wordBreak: 'break-all', lineHeight: 1.5
//                 }}>
//                   vibeinvite.ro/invitatie/romantic/<strong style={{ color: 'rgba(166,50,72,.8)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
//                 </p>
//               )}
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//               <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,80,106,.2))' }} />
//               <div style={{ width: 4, height: 4, background: 'rgba(196,80,106,.35)', transform: 'rotate(45deg)', margin: '0 6px' }} />
//               <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(196,80,106,.2),transparent)' }} />
//             </div>
// <DeleteAccountButton />
//             <button
//               className="rm-signout"
//               onClick={() => window.location.href = '/login'}
//               style={{
//                 width: '100%',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//                 padding: '9px 14px', borderRadius: 8,
//                 background: 'rgba(255,60,60,.05)',
//                 border: '1px solid rgba(255,60,60,.18)',
//                 color: 'rgba(200,80,80,.7)',
//                 fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
//                 letterSpacing: '.18em', textTransform: 'uppercase',
//                 cursor: 'pointer',
//               }}>
//               <SignOutIcon />
//               Ieșire
//             </button>

//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em',
//               textTransform: 'uppercase', color: 'rgba(166,50,72,.2)',
//               textAlign: 'center', marginTop: 14
//             }}>VibeInvite © 2026</p>
//           </div>

//           <div style={{
//             position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(196,80,106,.25),transparent)'
//           }} />
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="rm-main">
//           <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(120px,12vw)', height: 'min(120px,12vw)', opacity: .18, pointerEvents: 'none', zIndex: 4 }}>
//             <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
//               <path d="M8 8 L8 120 M8 8 L120 8" stroke="rgba(196,80,106,.6)" strokeWidth="1.2" />
//               <path d="M18 18 L18 100 M18 18 L100 18" stroke="rgba(196,80,106,.4)" strokeWidth=".7" />
//               <ellipse cx="8" cy="8" rx="6" ry="6" fill="rgba(196,80,106,.3)" />
//             </svg>
//           </div>

//           <div style={{ animation: 'rm-fade-in .5s ease both', position: 'relative', zIndex: 5, width: '100%' }}>
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

//         {/* TABLET HORIZONTAL NAV */}
//         <nav className="rm-tablet-nav" style={{
//           position: 'fixed', top: 56, left: 0, right: 0, zIndex: 150,
//           height: 48,
//           background: 'rgba(253,245,246,.97)',
//           borderBottom: '1px solid rgba(196,80,106,.12)',
//           backdropFilter: 'blur(16px)',
//           alignItems: 'stretch',
//           display: 'none',
//           padding: '0 12px', gap: 4,
//           overflowX: 'auto',
//         }}>
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className={`rm-tab ${activeTab === tab.id ? 'rm-tab-active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 7,
//                 padding: '0 14px', flexShrink: 0,
//                 background: 'transparent',
//                 border: '1px solid transparent',
//                 borderRadius: 8,
//                 color: activeTab === tab.id ? '#7B1A2E' : 'rgba(166,50,72,.45)',
//                 cursor: 'pointer',
//                 fontFamily: "'Cinzel', serif",
//                 fontSize: 9, fontWeight: 600, letterSpacing: '.1em',
//                 whiteSpace: 'nowrap',
//               }}>
//               <span style={{ opacity: activeTab === tab.id ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
//               {tab.label}
//               {activeTab === tab.id && (
//                 <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#A63248', boxShadow: '0 0 6px rgba(166,50,72,.5)', marginLeft: 2, flexShrink: 0 }} />
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* PHONE BOTTOM NAV */}
//         <nav className="rm-mobile-nav" style={{
//           position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
//           minHeight: 68,
//           background: 'rgba(253,245,246,.98)',
//           borderTop: '1px solid rgba(196,80,106,.15)',
//           backdropFilter: 'blur(20px)',
//           display: 'none',
//           alignItems: 'flex-start',
//           justifyContent: 'stretch',
//           boxShadow: '0 -4px 30px rgba(123,26,46,.08)'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(196,80,106,.3),transparent)'
//           }} />
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className="rm-mobile-tab"
//               onClick={() => setActiveTab(tab.id)}
//               style={{
//                 flex: 1, display: 'flex', flexDirection: 'column',
//                 alignItems: 'center', justifyContent: 'center', gap: 4,
//                 background: 'transparent', border: 'none', cursor: 'pointer',
//                 borderTop: activeTab === tab.id ? '2px solid #A63248' : '2px solid transparent',
//                 color: activeTab === tab.id ? '#A63248' : 'rgba(166,50,72,.35)',
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
//                 color: activeTab === tab.id ? '#A63248' : 'rgba(166,50,72,.3)',
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
import { MenuSection }        from './components/MenuSection';
import { PhotosSection }      from './components/PhotosSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';
import {
  C, F, FS, SP, BR, IS, SH, LY, GR, KEYFRAMES,
} from './romanticTokens';

// ─── GOOGLE FONTS ────────────────────────────────────────
const FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');`;

// ─── GLOBAL CSS ──────────────────────────────────────────
//
// ╔══════════════════════════════════════════════════════╗
// ║  ARHITECTURA DE SCROLL – principii cheie             ║
// ║                                                      ║
// ║  Problema anterioară:                                ║
// ║  • body { overflow: hidden } bloca scrollul pe iOS  ║
// ║  • html { overflow: hidden } – la fel               ║
// ║  • position:fixed pe shell fără scroll container    ║
// ║                                                      ║
// ║  Soluția corectă:                                    ║
// ║  • html, body: height:100%, overflow:hidden DOAR    ║
// ║    pentru a preveni double-scroll (body vs main)     ║
// ║  • Shell: display:flex, height:100dvh,              ║
// ║    overflow:hidden  →  containerul rigid             ║
// ║  • .rm-sidebar: overflow-y:auto (scroll propriu)    ║
// ║  • .rm-main: flex:1, overflow-y:auto, height:100%   ║
// ║    → SINGURUL element care scrollează conținut       ║
// ║  • NU se folosește position:fixed pe shell           ║
// ║  • touch-action:pan-y pe scroll containers          ║
// ║  • -webkit-overflow-scrolling:touch pentru iOS      ║
// ╚══════════════════════════════════════════════════════╝
//
const GLOBAL_CSS = `
${FONTS_IMPORT}

${KEYFRAMES}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/*
  html + body: înălțime fixă, fără overflow propriu.
  Asta previne ca body-ul să fie el însuși scrollabil,
  lăsând scroll-ul exclusiv în .rm-main.
*/
html {
  height: 100%;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  height: 100%;
  font-family: ${F.ui};
  background: ${C.cream};
  color: ${C.text};
  -webkit-font-smoothing: antialiased;
  /*
    overflow:hidden pe body este CORECT și NECESAR
    când avem un scroll container explicit (.rm-main).
    Previne double-scroll bar și scrollul accidental al body-ului.
  */
  overflow: hidden;
}

/* Previne zoom pe focus pentru inputuri pe iOS */
input, textarea, select {
  font-size: ${FS.input}px !important;
  -webkit-text-size-adjust: 100%;
}

img, svg { max-width: 100%; }

/* ─── APP SHELL ─────────────────────────────────────────
   display:flex + height:100dvh = cadru rigid.
   NU este position:fixed – asta cauza probleme pe iOS.
   Copiii (sidebar + main) ocupă tot spațiul disponibil.
──────────────────────────────────────────────────────── */
.rm-app-shell {
  display: flex;
  width: 100%;
  height: 100dvh;
  height: 100vh; /* fallback pentru browsere vechi */
  overflow: hidden; /* previne leak de scroll în afara shell-ului */
  background: ${C.cream};
  position: relative;
}

/* ─── SIDEBAR ───────────────────────────────────────────
   Sidebar-ul are propriul scroll vertical dacă conținutul
   depășește înălțimea disponibilă.
──────────────────────────────────────────────────────── */
.rm-sidebar {
  width: ${LY.sidebarWidth}px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
}

/* ─── MAIN SCROLL CONTAINER ─────────────────────────────
   Acesta este SINGURUL element care scrollează vizibil.
   flex:1 îl face să ocupe tot spațiul rămas după sidebar.
   overflow-y:auto + height:100% = scroll natural.
   touch-action:pan-y = iOS/Android recunosc gestul vertical.
──────────────────────────────────────────────────────── */
.rm-main {
  flex: 1;
  min-width: 0; /* previne overflow în flex */
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  touch-action: pan-y;
  position: relative;
  z-index: 5;
  background: ${C.cream};
  /* Padding responsive – conținut aerat pe orice device */
  padding: ${SP.mainPad} ${SP.mainPadH};
}

/* ─── MOBILE HEADER (fixed față de viewport, nu de shell) */
.rm-mobile-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  height: ${LY.mobileHeaderH}px;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  background: rgba(253,245,246,0.97);
  border-bottom: 1px solid ${C.borderLight};
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  gap: 8px;
  /* Hardware acceleration */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

/* ─── TABLET HORIZONTAL NAV ─────────────────────────────*/
.rm-tablet-nav {
  position: fixed;
  top: ${LY.mobileHeaderH}px;
  left: 0; right: 0;
  z-index: 150;
  height: ${LY.tabletNavH}px;
  background: rgba(253,245,246,0.97);
  border-bottom: 1px solid rgba(196,80,106,0.12);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  display: none;
  align-items: stretch;
  padding: 0 12px;
  gap: 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

/* ─── MOBILE BOTTOM NAV ──────────────────────────────── */
.rm-mobile-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 200;
  min-height: ${LY.mobileNavH}px;
  /* Safe area pentru iPhone cu notch */
  padding-bottom: env(safe-area-inset-bottom, 0px);
  height: calc(${LY.mobileNavH}px + env(safe-area-inset-bottom, 0px));
  background: rgba(253,245,246,0.98);
  border-top: 1px solid ${C.borderLight};
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  box-shadow: 0 -4px 30px rgba(123,26,46,0.08);
  display: none;
  align-items: flex-start;
  justify-content: stretch;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

/* ─── RESPONSIVE BREAKPOINTS ────────────────────────────
   Tablet: ≤1023px → ascunde sidebar, arată header+tablet nav
   Mobile: ≤767px  → ascunde tablet nav, arată bottom nav
──────────────────────────────────────────────────────── */
@media (max-width: ${LY.bpTablet}px) {
  .rm-sidebar       { display: none !important; }
  .rm-mobile-header { display: flex !important; }
  .rm-tablet-nav    { display: flex !important; }
  .rm-main {
    /* Spațiu pentru header (56px) + tablet nav (48px) */
    padding-top: ${LY.mobileHeaderH + LY.tabletNavH + 16}px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    padding-bottom: 40px !important;
  }
}

@media (max-width: ${LY.bpMobile}px) {
  .rm-tablet-nav { display: none !important; }
  .rm-mobile-nav { display: flex !important; }
  .rm-main {
    /* Spațiu pentru header (56px) + bottom nav (68px) + safe area */
    padding-top: ${LY.mobileHeaderH + 16}px !important;
    padding-left: 12px !important;
    padding-right: 12px !important;
    padding-bottom: calc(
      ${LY.mobileNavH}px
      + env(safe-area-inset-bottom, 0px)
      + 20px
    ) !important;
  }
}

@media (max-width: 379px) {
  .rm-main {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}

/* ─── INTERACTIVITATE ────────────────────────────────── */
.rm-tab {
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.rm-tab:hover {
  background: rgba(196,80,106,0.07) !important;
  color: ${C.rose} !important;
}
.rm-tab-active {
  background: linear-gradient(135deg, rgba(196,80,106,0.12) 0%, rgba(196,80,106,0.05) 100%) !important;
  color: ${C.crimson} !important;
  border-color: rgba(196,80,106,0.3) !important;
}

.rm-signout { transition: background 0.2s, border-color 0.2s, color 0.2s; }
.rm-signout:hover {
  background: rgba(255,60,60,0.1) !important;
  border-color: rgba(255,80,80,0.45) !important;
  color: #e05555 !important;
}

.rm-mobile-tab { transition: color 0.2s, background 0.2s; }
.rm-mobile-tab:hover { background: rgba(196,80,106,0.06) !important; }

/* Responsive helpers */
@media (max-width: 600px) {
  .share-label { display: none; }
  .rm-share-btn { padding: 10px 12px !important; }
}
`;

// ─── ICOANE ──────────────────────────────────────────────
const SignOutIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}>
    <path
      d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const HeartLogo = () => (
  <svg viewBox="0 0 24 22" fill={C.rose} style={{ width: 32, height: 30, margin: '0 auto', filter: 'drop-shadow(0 2px 8px rgba(166,50,72,.2))' }}>
    <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z" />
  </svg>
);

const HeartIcon = ({ size = IS.md, color = C.rose }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 22" fill={color} style={{ width: size, height: size * 22 / 24, flexShrink: 0 }}>
    <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z" />
  </svg>
);

// ─── TABS CONFIG ─────────────────────────────────────────
const TABS = [
  {
    id: 'summary', label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.lg, height: IS.lg }}>
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: 'personalize', label: 'Personalizare',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.lg, height: IS.lg }}>
        <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'menu', label: 'Meniu',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.lg, height: IS.lg }}>
        <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'photos', label: 'Galerie',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.lg, height: IS.lg }}>
        <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
];

const TAB_LABELS: Record<string, string> = {
  summary:     'Dashboard',
  personalize: 'Personalizare',
  menu:        'Meniu Nuntă',
  photos:      'Galerie Poze',
};

// ─── LOADING SCREEN ──────────────────────────────────────
const LoadingScreen = () => (
  <>
    <style>{`
      ${FONTS_IMPORT}
      ${KEYFRAMES}
      html, body { height: 100%; overflow: hidden; }
    `}</style>
    <div style={{
      background: C.cream, color: C.crimson,
      height: '100dvh', width: '100vw',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: SP.lg,
    }}>
      <div style={{
        width: 36, height: 36,
        border: `1.5px solid rgba(166,50,72,0.2)`,
        borderTopColor: C.rose, borderRadius: '50%',
        animation: 'rm-spin 1s linear infinite',
      }} />
      <span style={{
        fontFamily: F.heading, fontSize: FS.sm,
        letterSpacing: '.32em', textTransform: 'uppercase' as const,
        color: 'rgba(166,50,72,0.55)',
      }}>Se încarcă...</span>
    </div>
  </>
);

// ─── PULSE DOT ───────────────────────────────────────────
const PulseDot = ({ active }: { active: boolean }) => (
  <div style={{
    width: active ? 6 : 5, height: active ? 6 : 5,
    borderRadius: '50%', flexShrink: 0,
    background: active ? C.rose : '#ffa500',
    boxShadow: `0 0 ${active ? 8 : 6}px ${active ? 'rgba(166,50,72,0.6)' : 'rgba(255,165,0,0.6)'}`,
    animation: 'rm-pulse 2s ease-in-out infinite',
  }} />
);

// ─── MAIN DASHBOARD ──────────────────────────────────────
export default function RomanticDashboard() {
  const [activeTab,  setActiveTab]  = useState('summary');
  const [loading,    setLoading]    = useState(true);
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

  if (loading) return <LoadingScreen />;

  const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
  const currentOrderId    = weddingData?.order_id || weddingData?.id;

  // ─── STATUS BADGE ────────────────────────────────────
  const StatusBadge = ({ compact = false }: { compact?: boolean }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: SP.xs,
      padding: compact ? '4px 9px' : undefined,
      borderRadius: compact ? BR.pill : undefined,
      background: compact
        ? (isProfileComplete ? 'rgba(196,80,106,0.07)' : 'rgba(255,165,0,0.08)')
        : undefined,
      border: compact
        ? `1px solid ${isProfileComplete ? 'rgba(196,80,106,0.25)' : 'rgba(255,165,0,0.25)'}`
        : undefined,
      fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.12em',
      color: isProfileComplete ? 'rgba(166,50,72,0.85)' : 'rgba(255,165,0,0.8)',
      whiteSpace: 'nowrap' as const,
    }}>
      <PulseDot active={isProfileComplete} />
      {isProfileComplete ? 'LIVE' : 'SETUP'}
    </div>
  );

  // ─── TAB BUTTON ──────────────────────────────────────
  const TabButton = ({
    tab, variant,
  }: { tab: typeof TABS[number]; variant: 'sidebar' | 'tablet' | 'mobile' }) => {
    const isActive = activeTab === tab.id;

    if (variant === 'mobile') {
      return (
        <button
          className="rm-mobile-tab"
          onClick={() => setActiveTab(tab.id)}
          style={{
            flex: 1,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: SP.xs,
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderTop: isActive ? `2px solid ${C.rose}` : '2px solid transparent',
            color: isActive ? C.rose : 'rgba(166,50,72,0.35)',
            padding: '10px 4px 8px',
            minWidth: 0, minHeight: 56,
          }}>
          <span style={{ transition: 'transform .2s', transform: isActive ? 'scale(1.15)' : 'scale(1)', flexShrink: 0 }}>
            {tab.icon}
          </span>
          <span style={{
            fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.08em',
            textTransform: 'uppercase' as const, fontWeight: 600,
            color: isActive ? C.rose : 'rgba(166,50,72,0.3)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const,
            maxWidth: '100%',
          }}>{tab.label}</span>
        </button>
      );
    }

    if (variant === 'tablet') {
      return (
        <button
          className={`rm-tab ${isActive ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '0 14px', flexShrink: 0,
            background: 'transparent', border: '1px solid transparent', borderRadius: BR.sm,
            color: isActive ? C.crimson : 'rgba(166,50,72,0.45)',
            cursor: 'pointer', fontFamily: F.heading,
            fontSize: FS.tiny, fontWeight: 600, letterSpacing: '.1em',
            whiteSpace: 'nowrap' as const,
          }}>
          <span style={{ opacity: isActive ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
          {tab.label}
          {isActive && (
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.rose, boxShadow: '0 0 6px rgba(166,50,72,.5)', marginLeft: 2, flexShrink: 0 }} />
          )}
        </button>
      );
    }

    // sidebar
    return (
      <button
        className={`rm-tab ${isActive ? 'rm-tab-active' : ''}`}
        onClick={() => setActiveTab(tab.id)}
        style={{
          width: '100%', padding: `11px 14px`,
          display: 'flex', alignItems: 'center', gap: 11,
          background: 'transparent', border: '1px solid transparent', borderRadius: BR.lg,
          color: isActive ? C.crimson : 'rgba(166,50,72,0.5)',
          cursor: 'pointer', textAlign: 'left' as const,
          fontFamily: F.heading, fontSize: FS.sm, fontWeight: 600, letterSpacing: '.1em',
        }}>
        <span style={{ opacity: isActive ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
        {tab.label}
        {isActive && (
          <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: C.rose, boxShadow: '0 0 8px rgba(166,50,72,0.5)', flexShrink: 0 }} />
        )}
      </button>
    );
  };

  // ─── RENDER ──────────────────────────────────────────
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* PORTAL TARGET pentru modals */}
      <div id="modal-root" style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, pointerEvents: 'none' }} />

      <div className="rm-app-shell">

        {/* BG ATMOSPHERE */}
        <div style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 0,
          background: GR.bgAtmosphere,
        }} />

        {/* ── MOBILE / TABLET HEADER ─────────────────── */}
        <header className="rm-mobile-header">
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <HeartIcon size={18} color={C.rose} />
            <span style={{ fontFamily: F.heading, fontSize: FS.base, fontWeight: 600, letterSpacing: '.2em', color: C.crimson }}>
              VIBE<span style={{ color: 'rgba(166,50,72,0.4)' }}>INVITE</span>
            </span>
          </div>

          {/* Titlu tab curent */}
          <span style={{
            fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic',
            color: 'rgba(166,50,72,0.5)', flex: 1, textAlign: 'center',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            padding: '0 6px',
          }}>
            {TAB_LABELS[activeTab]}
          </span>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flexShrink: 0 }}>
            <StatusBadge compact />
            <DeleteAccountButton />
            <button
              className="rm-signout"
              onClick={() => window.location.href = '/login'}
              title="Ieșire"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '6px 10px', borderRadius: BR.sm,
                background: 'rgba(255,60,60,0.06)', border: '1px solid rgba(255,60,60,0.2)',
                color: 'rgba(200,80,80,0.75)',
                fontFamily: F.heading, fontSize: FS.tiny, fontWeight: 600,
                letterSpacing: '.14em', textTransform: 'uppercase' as const,
                cursor: 'pointer', whiteSpace: 'nowrap' as const,
              }}>
              <SignOutIcon />
              <span>Ieșire</span>
            </button>
          </div>
        </header>

        {/* ── DESKTOP SIDEBAR ────────────────────────── */}
        <aside className="rm-sidebar" style={{
          background: GR.sidebar,
          borderRight: `1px solid ${C.borderLight}`,
          flexDirection: 'column',
          padding: `${SP.xxxl}px 0`,
          position: 'relative', zIndex: 10,
          boxShadow: SH.sidebar,
          display: 'flex',
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: `linear-gradient(90deg,transparent,rgba(196,80,106,0.4),transparent)`,
          }} />

          {/* Logo */}
          <div style={{ textAlign: 'center', padding: `0 ${SP.xl}px ${SP.xxl}px`, borderBottom: `1px solid ${C.borderFaint}` }}>
            <div style={{ marginBottom: SP.sm }}>
              <HeartLogo />
            </div>
            <h1 style={{ fontFamily: F.heading, fontSize: FS.md, fontWeight: 600, letterSpacing: '.28em', color: C.crimson, margin: `0 0 ${SP.xs}px` }}>
              VIBE<span style={{ color: 'rgba(166,50,72,0.4)' }}>INVITE</span>
            </h1>
            <span style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: 'rgba(166,50,72,0.35)' }}>
              Romantic Edition
            </span>
          </div>

          {/* Nav tabs */}
          <nav style={{ flex: 1, padding: `18px 14px`, display: 'flex', flexDirection: 'column', gap: SP.xs }}>
            <p style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.28em', textTransform: 'uppercase' as const, color: 'rgba(166,50,72,0.3)', padding: `0 10px`, marginBottom: SP.sm }}>
              Navigare
            </p>
            {TABS.map(tab => <TabButton key={tab.id} tab={tab} variant="sidebar" />)}
          </nav>

          {/* Status + actions */}
          <div style={{ padding: `0 14px` }}>
            {/* Link status card */}
            <div style={{
              padding: `12px 14px`, marginBottom: SP.sm,
              background: isProfileComplete ? 'rgba(196,80,106,0.05)' : 'rgba(255,140,0,0.05)',
              border: `1px solid ${isProfileComplete ? 'rgba(196,80,106,0.2)' : 'rgba(255,140,0,0.22)'}`,
              borderRadius: BR.lg, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(196,80,106,0.35)' : 'rgba(255,140,0,0.28)'},transparent)`,
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
                <PulseDot active={isProfileComplete} />
                <span style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: isProfileComplete ? 'rgba(166,50,72,0.8)' : 'rgba(255,165,0,0.8)' }}>
                  {isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}
                </span>
              </div>
              {isProfileComplete && (
                <p style={{ fontFamily: F.body, fontSize: FS.base, fontStyle: 'italic', color: 'rgba(166,50,72,0.5)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                  vibeinvite.ro/invitatie/romantic/<strong style={{ color: 'rgba(166,50,72,0.8)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
                </p>
              )}
            </div>

            {/* Divider decorativ */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: SP.sm }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(196,80,106,0.2))` }} />
              <div style={{ width: 4, height: 4, background: 'rgba(196,80,106,0.35)', transform: 'rotate(45deg)', margin: `0 6px` }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(196,80,106,0.2),transparent)` }} />
            </div>

            <DeleteAccountButton />

            <button
              className="rm-signout"
              onClick={() => window.location.href = '/login'}
              style={{
                width: '100%', marginTop: SP.sm,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: SP.sm,
                padding: '9px 14px', borderRadius: BR.sm,
                background: 'rgba(255,60,60,0.05)', border: '1px solid rgba(255,60,60,0.18)',
                color: 'rgba(200,80,80,0.7)', fontFamily: F.heading, fontSize: FS.tiny,
                fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
              <SignOutIcon />
              Ieșire
            </button>

            <p style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'rgba(166,50,72,0.2)', textAlign: 'center', marginTop: 14 }}>
              VibeInvite © 2026
            </p>
          </div>

          {/* Bottom accent line */}
          <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg,transparent,rgba(196,80,106,0.25),transparent)` }} />
        </aside>

        {/* ── MAIN CONTENT ───────────────────────────── */}
        <main className="rm-main">
          {/* Corner decoration */}
          <div style={{
            position: 'fixed', top: 0, right: 0,
            width: 'min(120px,12vw)', height: 'min(120px,12vw)',
            opacity: .18, pointerEvents: 'none', zIndex: 4,
          }}>
            <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
              <path d="M8 8 L8 120 M8 8 L120 8" stroke="rgba(196,80,106,0.6)" strokeWidth="1.2" />
              <path d="M18 18 L18 100 M18 18 L100 18" stroke="rgba(196,80,106,0.4)" strokeWidth=".7" />
              <ellipse cx="8" cy="8" rx="6" ry="6" fill="rgba(196,80,106,0.3)" />
            </svg>
          </div>

          {/* Tab content */}
          <div style={{ animation: 'rm-fade-in .5s ease both', position: 'relative', zIndex: 5, width: '100%' }}>
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

        {/* ── TABLET HORIZONTAL NAV ──────────────────── */}
        <nav className="rm-tablet-nav">
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,80,106,0.12),transparent)' }} />
          {TABS.map(tab => <TabButton key={tab.id} tab={tab} variant="tablet" />)}
        </nav>

        {/* ── MOBILE BOTTOM NAV ──────────────────────── */}
        <nav className="rm-mobile-nav">
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,rgba(196,80,106,0.3),transparent)` }} />
          {TABS.map(tab => <TabButton key={tab.id} tab={tab} variant="mobile" />)}
        </nav>

      </div>
    </>
  );
}
