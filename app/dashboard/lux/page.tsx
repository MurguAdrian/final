

// // "use client";
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { SummarySection } from './components/SummarySection';
// // import { PersonalizeSection } from './components/PersonalizeSection';
// // import { MenuSection } from './components/MenuSection';
// // import { PhotosSection } from './components/PhotosSection';

// // export default function LuxDashboard() {
// //   const [activeTab, setActiveTab] = useState('summary');
// //   const [loading, setLoading] = useState(true);
// //   const [weddingData, setWeddingData] = useState<any>(null);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   const refreshData = useCallback(async () => {
// //     try {
// //       const res = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
// //       if (res.ok) {
// //         const data = await res.json();
// //         setWeddingData(data.weddingDetails);
// //       } else if (res.status === 401) {
// //         window.location.href = '/login';
// //       }
// //     } catch (err) {
// //       console.error("Eroare la sincronizare:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     refreshData();
// //   }, [refreshData]);

// //   if (loading) return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
// //         @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
// //       `}</style>
// //       <div style={{
// //         background: '#050401', color: '#D4AF37', height: '100vh', width: '100vw',
// //         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
// //       }}>
// //         <div style={{
// //           width: 36, height: 36, border: '1.5px solid rgba(212,175,55,.25)',
// //           borderTopColor: '#D4AF37', borderRadius: '50%',
// //           animation: 'lux-spin 1s linear infinite'
// //         }} />
// //         <span style={{
// //           fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.36em',
// //           textTransform: 'uppercase', color: 'rgba(212,175,55,.6)'
// //         }}>Sincronizare Date Lux...</span>
// //       </div>
// //     </>
// //   );

// //   const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
// //   const currentOrderId = weddingData?.order_id || weddingData?.id;

// //   const tabs = [
// //     {
// //       id: 'summary', label: 'Dashboard',
// //       icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
// //         <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
// //         <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
// //         <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
// //         <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
// //       </svg>
// //     },
// //     {
// //       id: 'personalize', label: 'Personalizare',
// //       icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
// //         <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     },
// //     {
// //       id: 'menu', label: 'Meniu Nuntă',
// //       icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
// //         <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     },
// //     {
// //       id: 'photos', label: 'Galerie Poze',
// //       icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
// //         <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
// //         <path d="M6 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" />
// //         <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
// //       </svg>
// //     },
// //   ];

// //   const tabLabels: Record<string, string> = {
// //     summary: 'Dashboard',
// //     personalize: 'Personalizare',
// //     menu: 'Meniu Nuntă',
// //     photos: 'Galerie Poze',
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
// //         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
// //         html,body{height:100%;-webkit-font-smoothing:antialiased;}
// //         body{font-family:'Lato',sans-serif;background:#050401;color:#F5E6A8;}
// //         @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
// //         @keyframes lux-fade-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
// //         @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
// //         .lux-tab:hover { background: rgba(212,175,55,.08) !important; color: #D4AF37 !important; }
// //         .lux-tab-active { background: linear-gradient(135deg,rgba(212,175,55,.18) 0%,rgba(212,175,55,.08) 100%) !important; color: #F5D678 !important; border-color: rgba(212,175,55,.35) !important; }
// //         .lux-signout:hover { background: rgba(255,60,60,.12) !important; border-color: rgba(255,80,80,.5) !important; color: #ff6b6b !important; }
// //         .lux-mobile-tab:hover { background: rgba(212,175,55,.1) !important; }
// //         @media(max-width:768px){
// //           .lux-sidebar { display: none !important; }
// //           .lux-main { padding: 16px 16px 100px !important; }
// //           .lux-mobile-nav { display: flex !important; }
// //           .lux-mobile-header { display: flex !important; }
// //         }
// //         @media(min-width:769px){
// //           .lux-mobile-nav { display: none !important; }
// //           .lux-mobile-header { display: none !important; }
// //         }
// //       `}</style>

// //       <div style={{
// //         position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
// //         display: 'flex', background: '#050401', zIndex: 9999, overflow: 'hidden'
// //       }}>

// //         {/* ── BACKGROUND ATMOSPHERE ── */}
// //         <div style={{
// //           position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
// //           background: 'radial-gradient(ellipse 70% 60% at 20% 50%,rgba(212,175,55,.04) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(212,175,55,.03) 0%,transparent 55%)'
// //         }} />

// //         {/* ══════════════════════════
// //             MOBILE HEADER
// //         ══════════════════════════ */}
// //         <div className="lux-mobile-header" style={{
// //           position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
// //           height: 56, alignItems: 'center', justifyContent: 'space-between',
// //           padding: '0 16px',
// //           background: 'rgba(5,4,1,.96)', borderBottom: '1px solid rgba(212,175,55,.15)',
// //           backdropFilter: 'blur(16px)'
// //         }}>
// //           <div>
// //             <span style={{
// //               fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
// //               letterSpacing: '.22em', color: '#D4AF37'
// //             }}>VIBE<span style={{ color: 'rgba(212,175,55,.45)' }}>INVITE</span></span>
// //           </div>
// //           <span style={{
// //             fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
// //             fontStyle: 'italic', color: 'rgba(212,175,55,.5)'
// //           }}>{tabLabels[activeTab]}</span>
// //           <div style={{
// //             display: 'flex', alignItems: 'center', gap: 6,
// //             padding: '5px 12px', borderRadius: 100,
// //             background: isProfileComplete ? 'rgba(212,175,55,.08)' : 'rgba(255,165,0,.08)',
// //             border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.25)' : 'rgba(255,165,0,.25)'}`,
// //             fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.16em',
// //             color: isProfileComplete ? 'rgba(212,175,55,.8)' : 'rgba(255,165,0,.8)'
// //           }}>
// //             <div style={{
// //               width: 5, height: 5, borderRadius: '50%',
// //               background: isProfileComplete ? '#D4AF37' : '#ffa500',
// //               boxShadow: `0 0 6px ${isProfileComplete ? 'rgba(212,175,55,.6)' : 'rgba(255,165,0,.6)'}`
// //             }} />
// //             {isProfileComplete ? 'LIVE' : 'SETUP'}
// //           </div>
// //         </div>

// //         {/* ══════════════════════════
// //             DESKTOP SIDEBAR
// //         ══════════════════════════ */}
// //         <aside className="lux-sidebar" style={{
// //           width: 260, flexShrink: 0,
// //           background: 'linear-gradient(180deg,#0C0903 0%,#080601 100%)',
// //           borderRight: '1px solid rgba(212,175,55,.15)',
// //           display: 'flex', flexDirection: 'column',
// //           padding: '32px 0', position: 'relative', zIndex: 10,
// //           boxShadow: '4px 0 40px rgba(0,0,0,.5)'
// //         }}>
// //           {/* Top accent line */}
// //           <div style={{
// //             position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
// //             background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)'
// //           }} />

// //           {/* Logo */}
// //           <div style={{ textAlign: 'center', padding: '0 24px 28px', borderBottom: '1px solid rgba(212,175,55,.1)' }}>
// //             <div style={{ marginBottom: 8 }}>
// //               <svg viewBox="0 0 120 60" fill="none" style={{ width: 56, height: 28, margin: '0 auto' }}>
// //                 <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#sg)" strokeWidth="1.4" strokeLinejoin="round" />
// //                 <circle cx="60" cy="5" r="3" fill="url(#sg)" />
// //                 <circle cx="30" cy="40" r="2" fill="url(#sg)" />
// //                 <circle cx="90" cy="40" r="2" fill="url(#sg)" />
// //                 <path d="M4 50 L116 50" stroke="url(#sg)" strokeWidth="1" />
// //                 <defs><linearGradient id="sg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B6914" /><stop offset="40%" stopColor="#D4AF37" /><stop offset="60%" stopColor="#F5D678" /><stop offset="100%" stopColor="#8B6914" /></linearGradient></defs>
// //               </svg>
// //             </div>
// //             <h1 style={{
// //               fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
// //               letterSpacing: '.28em', color: '#D4AF37', margin: '0 0 4px'
// //             }}>VIBE<span style={{ color: 'rgba(212,175,55,.45)' }}>INVITE</span></h1>
// //             <span style={{
// //               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em',
// //               textTransform: 'uppercase', color: 'rgba(212,175,55,.35)'
// //             }}>Premium Luxury Edition</span>
// //           </div>

// //           {/* Nav */}
// //           <nav style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
// //             <p style={{
// //               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.28em',
// //               textTransform: 'uppercase', color: 'rgba(212,175,55,.3)',
// //               padding: '0 12px', marginBottom: 8
// //             }}>Navigare</p>
// //             {tabs.map(tab => (
// //               <button
// //                 key={tab.id}
// //                 className={`lux-tab ${activeTab === tab.id ? 'lux-tab-active' : ''}`}
// //                 onClick={() => setActiveTab(tab.id)}
// //                 style={{
// //                   width: '100%', padding: '12px 16px',
// //                   display: 'flex', alignItems: 'center', gap: 12,
// //                   background: 'transparent',
// //                   border: '1px solid transparent',
// //                   borderRadius: 10,
// //                   color: activeTab === tab.id ? '#F5D678' : 'rgba(212,175,55,.55)',
// //                   cursor: 'pointer', textAlign: 'left',
// //                   transition: 'all .2s ease',
// //                   fontFamily: "'Cinzel', serif",
// //                   fontSize: 10, fontWeight: 600, letterSpacing: '.12em',
// //                 }}>
// //                 <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
// //                 {tab.label}
// //                 {activeTab === tab.id && (
// //                   <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,.6)' }} />
// //                 )}
// //               </button>
// //             ))}
// //           </nav>

// //           {/* Status + Logout */}
// //           <div style={{ padding: '0 16px 0' }}>
// //             {/* Status card */}
// //             <div style={{
// //               padding: '14px 16px', marginBottom: 12,
// //               background: isProfileComplete ? 'rgba(212,175,55,.05)' : 'rgba(255,140,0,.06)',
// //               border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.2)' : 'rgba(255,140,0,.25)'}`,
// //               borderRadius: 12,
// //               position: 'relative', overflow: 'hidden'
// //             }}>
// //               <div style={{
// //                 position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
// //                 background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(212,175,55,.35)' : 'rgba(255,140,0,.3)'},transparent)`
// //               }} />
// //               <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 8 : 0 }}>
// //                 <div style={{
// //                   width: 6, height: 6, borderRadius: '50%',
// //                   background: isProfileComplete ? '#D4AF37' : '#ffa500',
// //                   boxShadow: `0 0 8px ${isProfileComplete ? 'rgba(212,175,55,.7)' : 'rgba(255,165,0,.7)'}`,
// //                   animation: 'lux-pulse 2s ease-in-out infinite',
// //                   flexShrink: 0
// //                 }} />
// //                 <span style={{
// //                   fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
// //                   textTransform: 'uppercase',
// //                   color: isProfileComplete ? 'rgba(212,175,55,.8)' : 'rgba(255,165,0,.8)'
// //                 }}>{isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}</span>
// //               </div>
// //               {isProfileComplete && (
// //                 <p style={{
// //                   fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
// //                   fontStyle: 'italic', color: 'rgba(212,175,55,.5)',
// //                   wordBreak: 'break-all', lineHeight: 1.5
// //                 }}>vibeinvite.ro/invitatie/lux/<strong style={{ color: 'rgba(212,175,55,.75)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong></p>
// //               )}
// //             </div>

// //             {/* Divider */}
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 12 }}>
// //               <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.2))' }} />
// //               <div style={{ width: 4, height: 4, background: 'rgba(212,175,55,.3)', transform: 'rotate(45deg)', margin: '0 6px' }} />
// //               <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.2),transparent)' }} />
// //             </div>

// //             {/* Sign out */}
// //             <button
// //               className="lux-signout"
// //               onClick={() => window.location.href = '/login'}
// //               style={{
// //                 width: '100%',
// //                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
// //                 padding: '10px 16px', borderRadius: 8,
// //                 background: 'rgba(255,60,60,.06)',
// //                 border: '1px solid rgba(255,60,60,.2)',
// //                 color: 'rgba(255,100,100,.7)',
// //                 fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
// //                 letterSpacing: '.18em', textTransform: 'uppercase',
// //                 cursor: 'pointer', transition: 'all .2s'
// //               }}>
// //               <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13 }}>
// //                 <path d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
// //               </svg>
// //               Ieșire
// //             </button>

// //             <p style={{
// //               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em',
// //               textTransform: 'uppercase', color: 'rgba(212,175,55,.2)',
// //               textAlign: 'center', marginTop: 16
// //             }}>VibeInvite © 2026</p>
// //           </div>

// //           {/* Bottom accent line */}
// //           <div style={{
// //             position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
// //             background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)'
// //           }} />
// //         </aside>

// //         {/* ══════════════════════════
// //             MAIN CONTENT
// //         ══════════════════════════ */}
// //         <main className="lux-main" style={{
// //           flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden',
// //           padding: 'clamp(32px,4vw,56px) clamp(24px,5vw,72px)',
// //           position: 'relative', zIndex: 5
// //         }}>
// //           {/* Art deco corner accents */}
// //           <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(140px,14vw)', height: 'min(140px,14vw)', opacity: .35, pointerEvents: 'none', zIndex: 4 }}>
// //             <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
// //               <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg2)" strokeWidth="1.2" />
// //               <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg2)" strokeWidth=".7" strokeOpacity=".6" />
// //               <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg2)" fillOpacity=".6" />
// //               <defs><linearGradient id="dg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#8B6914" stopOpacity=".3" /></linearGradient></defs>
// //             </svg>
// //           </div>
// //           <div style={{ position: 'fixed', bottom: 0, right: 0, width: 'min(120px,12vw)', height: 'min(120px,12vw)', opacity: .25, pointerEvents: 'none', zIndex: 4 }}>
// //             <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,-1)', width: '100%', height: '100%' }}>
// //               <path d="M8 8 L8 120 M8 8 L120 8" stroke="#D4AF37" strokeWidth="1" />
// //               <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="#D4AF37" fillOpacity=".5" />
// //             </svg>
// //           </div>

// //           <div style={{ animation: 'lux-fade-in .5s ease both', position: 'relative', zIndex: 5 }}>
// //             {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} />}
// //             {activeTab === 'personalize' && (
// //               <PersonalizeSection
// //                 initialData={weddingData}
// //                 orderId={currentOrderId}
// //                 onSave={refreshData}
// //               />
// //             )}
// //             {activeTab === 'menu' && (
// //               <MenuSection
// //                 initialData={weddingData}
// //                 orderId={currentOrderId}
// //                 onSave={refreshData}
// //               />
// //             )}
// //             {activeTab === 'photos' && (
// //               <PhotosSection
// //                 initialData={weddingData}
// //                 orderId={currentOrderId}
// //                 onSave={refreshData}
// //               />
// //             )}
// //           </div>
// //         </main>

// //         {/* ══════════════════════════
// //             MOBILE BOTTOM NAV
// //         ══════════════════════════ */}
// //         <nav className="lux-mobile-nav" style={{
// //           position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
// //           height: 70,
// //           background: 'rgba(5,4,1,.97)',
// //           borderTop: '1px solid rgba(212,175,55,.15)',
// //           backdropFilter: 'blur(20px)',
// //           alignItems: 'stretch', justifyContent: 'stretch',
// //           boxShadow: '0 -8px 40px rgba(0,0,0,.6)'
// //         }}>
// //           <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35),transparent)' }} />
// //           {tabs.map(tab => (
// //             <button
// //               key={tab.id}
// //               className="lux-mobile-tab"
// //               onClick={() => setActiveTab(tab.id)}
// //               style={{
// //                 flex: 1, display: 'flex', flexDirection: 'column',
// //                 alignItems: 'center', justifyContent: 'center', gap: 5,
// //                 background: 'transparent', border: 'none', cursor: 'pointer',
// //                 borderTop: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
// //                 transition: 'all .2s',
// //                 color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.4)',
// //                 padding: '8px 4px'
// //               }}>
// //               <span style={{ transition: 'transform .2s', transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)' }}>
// //                 {tab.icon}
// //               </span>
// //               <span style={{
// //                 fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.1em',
// //                 textTransform: 'uppercase', fontWeight: 600,
// //                 color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.35)'
// //               }}>{tab.label.split(' ')[0]}</span>
// //             </button>
// //           ))}
// //         </nav>

// //         {/* Mobile top spacer */}
// //         <style>{`
// //           @media(max-width:768px){
// //             .lux-main { padding-top: 72px !important; }
// //           }
// //         `}</style>
// //       </div>
// //     </>
// //   );
// // }





// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import { SummarySection } from './components/SummarySection';
// import { PersonalizeSection } from './components/PersonalizeSection';
// import { MenuSection } from './components/MenuSection';
// import { PhotosSection } from './components/PhotosSection';

// export default function LuxDashboard() {
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
//         @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//       `}</style>
//       <div style={{
//         background: '#050401', color: '#D4AF37', height: '100vh', width: '100vw',
//         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
//       }}>
//         <div style={{
//           width: 36, height: 36, border: '1.5px solid rgba(212,175,55,.25)',
//           borderTopColor: '#D4AF37', borderRadius: '50%',
//           animation: 'lux-spin 1s linear infinite'
//         }} />
//         <span style={{
//           fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.36em',
//           textTransform: 'uppercase', color: 'rgba(212,175,55,.6)'
//         }}>Sincronizare Date Lux...</span>
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
//       id: 'menu', label: 'Meniu Nuntă',
//       icon: (
//         <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
//           <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       )
//     },
//     {
//       id: 'photos', label: 'Galerie Poze',
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
//     <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13 }}>
//       <path d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"
//         stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html, body { height: 100%; -webkit-font-smoothing: antialiased; }
//         body { font-family: 'Lato', sans-serif; background: #050401; color: #F5E6A8; }

//         @keyframes lux-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
//         @keyframes lux-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
//         @keyframes lux-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .5 } }

//         /* ── Tab buttons ── */
//         .lux-tab { transition: background .2s, color .2s, border-color .2s; }
//         .lux-tab:hover  { background: rgba(212,175,55,.08) !important; color: #D4AF37 !important; }
//         .lux-tab-active { background: linear-gradient(135deg,rgba(212,175,55,.18) 0%,rgba(212,175,55,.08) 100%) !important; color: #F5D678 !important; border-color: rgba(212,175,55,.35) !important; }

//         /* ── Sign-out button ── */
//         .lux-signout { transition: background .2s, border-color .2s, color .2s; }
//         .lux-signout:hover { background: rgba(255,60,60,.14) !important; border-color: rgba(255,80,80,.55) !important; color: #ff6b6b !important; }

//         /* ── Mobile tab strip ── */
//         .lux-mobile-tab { transition: color .2s, background .2s; }
//         .lux-mobile-tab:hover { background: rgba(212,175,55,.08) !important; }

//         /* ══════════════════════════════════════
//            RESPONSIVE BREAKPOINTS
//            xs  < 480px   — phone portrait
//            sm  480–767px — phone landscape / small tablet
//            md  768–1023px — tablet
//            lg  ≥ 1024px  — desktop
//         ══════════════════════════════════════ */

//         /* SIDEBAR — visible only on desktop */
//         .lux-sidebar       { display: flex !important; }

//         /* MOBILE / TABLET HEADER — hidden on desktop */
//         .lux-mobile-header { display: none !important; }

//         /* MOBILE BOTTOM NAV — hidden on desktop */
//         .lux-mobile-nav    { display: none !important; }

//         /* TABLET SIDEBAR NAV — hidden on desktop (uses bottom nav) */
//         .lux-tablet-nav    { display: none !important; }

//         /* ── Tablet (768–1023) ── */
//         @media (max-width: 1023px) {
//           .lux-sidebar       { display: none   !important; }
//           .lux-mobile-header { display: flex   !important; }
//           .lux-tablet-nav    { display: flex   !important; }
//           .lux-main          { padding: 80px 20px 90px !important; }
//         }

//         /* ── Phone (< 768) ── */
//         @media (max-width: 767px) {
//           .lux-tablet-nav    { display: none !important; }
//           .lux-mobile-nav    { display: flex !important; }
//           .lux-main          { padding: 72px 14px 84px !important; }
//         }

//         /* ── Very small phones (< 380) ── */
//         @media (max-width: 379px) {
//           .lux-main { padding: 68px 10px 80px !important; }
//         }

//         /* Mobile header height compensation already handled above */
//       `}</style>

//       <div style={{
//         position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
//         display: 'flex', background: '#050401', zIndex: 9999, overflow: 'hidden'
//       }}>

//         {/* ── BACKGROUND ATMOSPHERE ── */}
//         <div style={{
//           position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
//           background: `
//             radial-gradient(ellipse 70% 60% at 20% 50%, rgba(212,175,55,.04) 0%, transparent 60%),
//             radial-gradient(ellipse 50% 40% at 80% 80%, rgba(212,175,55,.03) 0%, transparent 55%)
//           `
//         }} />

//         {/* ══════════════════════════════════════════════
//             MOBILE / TABLET HEADER  (≤ 1023px)
//         ══════════════════════════════════════════════ */}
//         <header className="lux-mobile-header" style={{
//           position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
//           height: 56,
//           display: 'none', /* overridden by media query */
//           alignItems: 'center', justifyContent: 'space-between',
//           padding: '0 16px',
//           background: 'rgba(5,4,1,.97)',
//           borderBottom: '1px solid rgba(212,175,55,.15)',
//           backdropFilter: 'blur(20px)',
//           gap: 10,
//         }}>
//           {/* Left — Logo */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//             <svg viewBox="0 0 120 60" fill="none" style={{ width: 30, height: 15 }}>
//               <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#mhg)" strokeWidth="1.4" strokeLinejoin="round" />
//               <circle cx="60" cy="5" r="3" fill="url(#mhg)" />
//               <circle cx="30" cy="40" r="2" fill="url(#mhg)" />
//               <circle cx="90" cy="40" r="2" fill="url(#mhg)" />
//               <path d="M4 50 L116 50" stroke="url(#mhg)" strokeWidth="1" />
//               <defs>
//                 <linearGradient id="mhg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
//                   <stop offset="0%" stopColor="#8B6914" />
//                   <stop offset="40%" stopColor="#D4AF37" />
//                   <stop offset="60%" stopColor="#F5D678" />
//                   <stop offset="100%" stopColor="#8B6914" />
//                 </linearGradient>
//               </defs>
//             </svg>
//             <span style={{
//               fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 600,
//               letterSpacing: '.22em', color: '#D4AF37'
//             }}>
//               VIBE<span style={{ color: 'rgba(212,175,55,.4)' }}>INVITE</span>
//             </span>
//           </div>

//           {/* Center — current tab label */}
//           <span style={{
//             fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//             fontStyle: 'italic', color: 'rgba(212,175,55,.5)',
//             flex: 1, textAlign: 'center',
//             overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
//           }}>
//             {tabLabels[activeTab]}
//           </span>

//           {/* Right — Status pill + Sign-out */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//             {/* Status pill */}
//             <div style={{
//               display: 'flex', alignItems: 'center', gap: 5,
//               padding: '4px 10px', borderRadius: 100,
//               background: isProfileComplete ? 'rgba(212,175,55,.08)' : 'rgba(255,165,0,.08)',
//               border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.25)' : 'rgba(255,165,0,.25)'}`,
//               fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.14em',
//               color: isProfileComplete ? 'rgba(212,175,55,.8)' : 'rgba(255,165,0,.8)',
//               whiteSpace: 'nowrap'
//             }}>
//               <div style={{
//                 width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
//                 background: isProfileComplete ? '#D4AF37' : '#ffa500',
//                 boxShadow: `0 0 6px ${isProfileComplete ? 'rgba(212,175,55,.6)' : 'rgba(255,165,0,.6)'}`,
//                 animation: 'lux-pulse 2s ease-in-out infinite'
//               }} />
//               {isProfileComplete ? 'LIVE' : 'SETUP'}
//             </div>

//             {/* Sign-out button */}
//             <button
//               className="lux-signout"
//               onClick={() => window.location.href = '/login'}
//               title="Ieșire"
//               style={{
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
//                 padding: '6px 11px', borderRadius: 8,
//                 background: 'rgba(255,60,60,.07)',
//                 border: '1px solid rgba(255,60,60,.22)',
//                 color: 'rgba(255,100,100,.75)',
//                 fontFamily: "'Cinzel', serif", fontSize: 8, fontWeight: 600,
//                 letterSpacing: '.16em', textTransform: 'uppercase',
//                 cursor: 'pointer', whiteSpace: 'nowrap'
//               }}>
//               <SignOutIcon />
//               <span style={{ display: 'inline' }}>Ieșire</span>
//             </button>
//           </div>
//         </header>

//         {/* ══════════════════════════════════════════════
//             DESKTOP SIDEBAR  (≥ 1024px)
//         ══════════════════════════════════════════════ */}
//         <aside className="lux-sidebar" style={{
//           width: 260, flexShrink: 0,
//           background: 'linear-gradient(180deg,#0C0903 0%,#080601 100%)',
//           borderRight: '1px solid rgba(212,175,55,.15)',
//           flexDirection: 'column',
//           padding: '32px 0',
//           position: 'relative', zIndex: 10,
//           boxShadow: '4px 0 40px rgba(0,0,0,.5)'
//         }}>
//           {/* Top accent line */}
//           <div style={{
//             position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)'
//           }} />

//           {/* Logo */}
//           <div style={{ textAlign: 'center', padding: '0 24px 28px', borderBottom: '1px solid rgba(212,175,55,.1)' }}>
//             <div style={{ marginBottom: 8 }}>
//               <svg viewBox="0 0 120 60" fill="none" style={{ width: 56, height: 28, margin: '0 auto' }}>
//                 <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#sg)" strokeWidth="1.4" strokeLinejoin="round" />
//                 <circle cx="60" cy="5" r="3" fill="url(#sg)" />
//                 <circle cx="30" cy="40" r="2" fill="url(#sg)" />
//                 <circle cx="90" cy="40" r="2" fill="url(#sg)" />
//                 <path d="M4 50 L116 50" stroke="url(#sg)" strokeWidth="1" />
//                 <defs>
//                   <linearGradient id="sg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
//                     <stop offset="0%" stopColor="#8B6914" />
//                     <stop offset="40%" stopColor="#D4AF37" />
//                     <stop offset="60%" stopColor="#F5D678" />
//                     <stop offset="100%" stopColor="#8B6914" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>
//             <h1 style={{
//               fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
//               letterSpacing: '.28em', color: '#D4AF37', margin: '0 0 4px'
//             }}>VIBE<span style={{ color: 'rgba(212,175,55,.45)' }}>INVITE</span></h1>
//             <span style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em',
//               textTransform: 'uppercase', color: 'rgba(212,175,55,.35)'
//             }}>Premium Luxury Edition</span>
//           </div>

//           {/* Nav */}
//           <nav style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.28em',
//               textTransform: 'uppercase', color: 'rgba(212,175,55,.3)',
//               padding: '0 12px', marginBottom: 8
//             }}>Navigare</p>
//             {tabs.map(tab => (
//               <button
//                 key={tab.id}
//                 className={`lux-tab ${activeTab === tab.id ? 'lux-tab-active' : ''}`}
//                 onClick={() => setActiveTab(tab.id)}
//                 style={{
//                   width: '100%', padding: '12px 16px',
//                   display: 'flex', alignItems: 'center', gap: 12,
//                   background: 'transparent',
//                   border: '1px solid transparent',
//                   borderRadius: 10,
//                   color: activeTab === tab.id ? '#F5D678' : 'rgba(212,175,55,.55)',
//                   cursor: 'pointer', textAlign: 'left',
//                   fontFamily: "'Cinzel', serif",
//                   fontSize: 10, fontWeight: 600, letterSpacing: '.12em',
//                 }}>
//                 <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
//                 {tab.label}
//                 {activeTab === tab.id && (
//                   <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,.6)' }} />
//                 )}
//               </button>
//             ))}
//           </nav>

//           {/* Status + Logout */}
//           <div style={{ padding: '0 16px 0' }}>
//             <div style={{
//               padding: '14px 16px', marginBottom: 12,
//               background: isProfileComplete ? 'rgba(212,175,55,.05)' : 'rgba(255,140,0,.06)',
//               border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.2)' : 'rgba(255,140,0,.25)'}`,
//               borderRadius: 12, position: 'relative', overflow: 'hidden'
//             }}>
//               <div style={{
//                 position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//                 background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(212,175,55,.35)' : 'rgba(255,140,0,.3)'},transparent)`
//               }} />
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 8 : 0 }}>
//                 <div style={{
//                   width: 6, height: 6, borderRadius: '50%',
//                   background: isProfileComplete ? '#D4AF37' : '#ffa500',
//                   boxShadow: `0 0 8px ${isProfileComplete ? 'rgba(212,175,55,.7)' : 'rgba(255,165,0,.7)'}`,
//                   animation: 'lux-pulse 2s ease-in-out infinite',
//                   flexShrink: 0
//                 }} />
//                 <span style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
//                   textTransform: 'uppercase',
//                   color: isProfileComplete ? 'rgba(212,175,55,.8)' : 'rgba(255,165,0,.8)'
//                 }}>{isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}</span>
//               </div>
//               {isProfileComplete && (
//                 <p style={{
//                   fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
//                   fontStyle: 'italic', color: 'rgba(212,175,55,.5)',
//                   wordBreak: 'break-all', lineHeight: 1.5
//                 }}>
//                   vibeinvite.ro/invitatie/lux/<strong style={{ color: 'rgba(212,175,55,.75)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
//                 </p>
//               )}
//             </div>

//             {/* Divider */}
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
//               <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.2))' }} />
//               <div style={{ width: 4, height: 4, background: 'rgba(212,175,55,.3)', transform: 'rotate(45deg)', margin: '0 6px' }} />
//               <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.2),transparent)' }} />
//             </div>

//             <button
//               className="lux-signout"
//               onClick={() => window.location.href = '/login'}
//               style={{
//                 width: '100%',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//                 padding: '10px 16px', borderRadius: 8,
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
//               textTransform: 'uppercase', color: 'rgba(212,175,55,.2)',
//               textAlign: 'center', marginTop: 16
//             }}>VibeInvite © 2026</p>
//           </div>

//           {/* Bottom accent line */}
//           <div style={{
//             position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)'
//           }} />
//         </aside>

//         {/* ══════════════════════════════════════════════
//             MAIN CONTENT
//         ══════════════════════════════════════════════ */}
//         <main className="lux-main" style={{
//           flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden',
//           padding: 'clamp(32px,4vw,56px) clamp(24px,5vw,72px)',
//           position: 'relative', zIndex: 5
//         }}>
//           {/* Art deco corner accents */}
//           <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(140px,14vw)', height: 'min(140px,14vw)', opacity: .3, pointerEvents: 'none', zIndex: 4 }}>
//             <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
//               <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg2)" strokeWidth="1.2" />
//               <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg2)" strokeWidth=".7" strokeOpacity=".6" />
//               <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg2)" fillOpacity=".6" />
//               <defs>
//                 <linearGradient id="dg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
//                   <stop offset="0%" stopColor="#D4AF37" />
//                   <stop offset="100%" stopColor="#8B6914" stopOpacity=".3" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//           <div style={{ position: 'fixed', bottom: 0, right: 0, width: 'min(120px,12vw)', height: 'min(120px,12vw)', opacity: .2, pointerEvents: 'none', zIndex: 4 }}>
//             <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,-1)', width: '100%', height: '100%' }}>
//               <path d="M8 8 L8 120 M8 8 L120 8" stroke="#D4AF37" strokeWidth="1" />
//               <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="#D4AF37" fillOpacity=".5" />
//             </svg>
//           </div>

//           <div style={{ animation: 'lux-fade-in .5s ease both', position: 'relative', zIndex: 5 }}>
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

//         {/* ══════════════════════════════════════════════
//             TABLET HORIZONTAL NAV  (768–1023px)
//             Positioned below the header, above content
//         ══════════════════════════════════════════════ */}
//         <nav className="lux-tablet-nav" style={{
//           position: 'fixed', top: 56, left: 0, right: 0, zIndex: 150,
//           height: 48,
//           background: 'rgba(8,6,1,.97)',
//           borderBottom: '1px solid rgba(212,175,55,.12)',
//           backdropFilter: 'blur(16px)',
//           alignItems: 'stretch',
//           display: 'none', /* overridden by media query */
//           padding: '0 16px', gap: 4,
//           overflowX: 'auto',
//         }}>
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className={`lux-tab ${activeTab === tab.id ? 'lux-tab-active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 7,
//                 padding: '0 16px', flexShrink: 0,
//                 background: 'transparent',
//                 border: '1px solid transparent',
//                 borderRadius: 8,
//                 color: activeTab === tab.id ? '#F5D678' : 'rgba(212,175,55,.5)',
//                 cursor: 'pointer',
//                 fontFamily: "'Cinzel', serif",
//                 fontSize: 9, fontWeight: 600, letterSpacing: '.12em',
//                 whiteSpace: 'nowrap',
//               }}>
//               <span style={{ opacity: activeTab === tab.id ? 1 : .65 }}>{tab.icon}</span>
//               {tab.label}
//               {activeTab === tab.id && (
//                 <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 6px rgba(212,175,55,.6)', marginLeft: 2 }} />
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* ══════════════════════════════════════════════
//             PHONE BOTTOM NAV  (< 768px)
//         ══════════════════════════════════════════════ */}
//         <nav className="lux-mobile-nav" style={{
//           position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
//           height: 70,
//           background: 'rgba(5,4,1,.98)',
//           borderTop: '1px solid rgba(212,175,55,.15)',
//           backdropFilter: 'blur(20px)',
//           display: 'none', /* overridden by media query */
//           alignItems: 'stretch', justifyContent: 'stretch',
//           boxShadow: '0 -8px 40px rgba(0,0,0,.6)'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35),transparent)'
//           }} />
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className="lux-mobile-tab"
//               onClick={() => setActiveTab(tab.id)}
//               style={{
//                 flex: 1, display: 'flex', flexDirection: 'column',
//                 alignItems: 'center', justifyContent: 'center', gap: 5,
//                 background: 'transparent', border: 'none', cursor: 'pointer',
//                 borderTop: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
//                 color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.4)',
//                 padding: '8px 4px',
//               }}>
//               <span style={{
//                 transition: 'transform .2s',
//                 transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)'
//               }}>
//                 {tab.icon}
//               </span>
//               <span style={{
//                 fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.1em',
//                 textTransform: 'uppercase', fontWeight: 600,
//                 color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.35)'
//               }}>
//                 {tab.label.split(' ')[0]}
//               </span>
//             </button>
//           ))}
//         </nav>

//         {/* Tablet content offset — need extra top padding for header (56) + tab bar (48) */}
//         <style>{`
//           @media (min-width: 768px) and (max-width: 1023px) {
//             .lux-main { padding-top: 120px !important; }
//           }
//         `}</style>

//       </div>
//     </>
//   );
// }

"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { SummarySection } from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection } from './components/MenuSection';
import { PhotosSection } from './components/PhotosSection';

export default function LuxDashboard() {
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(true);
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
      console.error("Eroare la sincronizare:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <div style={{
        background: '#050401', color: '#D4AF37', height: '100vh', width: '100vw',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
      }}>
        <div style={{
          width: 36, height: 36, border: '1.5px solid rgba(212,175,55,.25)',
          borderTopColor: '#D4AF37', borderRadius: '50%',
          animation: 'lux-spin 1s linear infinite'
        }} />
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.36em',
          textTransform: 'uppercase', color: 'rgba(212,175,55,.6)'
        }}>Sincronizare Date Lux...</span>
      </div>
    </>
  );

  const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
  const currentOrderId = weddingData?.order_id || weddingData?.id;

  const tabs = [
    {
      id: 'summary', label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      )
    },
    {
      id: 'personalize', label: 'Personalizare',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 'menu', label: 'Meniu',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 'photos', label: 'Galerie',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
          <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      )
    },
  ];

  const tabLabels: Record<string, string> = {
    summary: 'Dashboard',
    personalize: 'Personalizare',
    menu: 'Meniu Nuntă',
    photos: 'Galerie Poze',
  };

  const SignOutIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
      <path d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; -webkit-font-smoothing: antialiased; }
        body { font-family: 'Lato', sans-serif; background: #050401; color: #F5E6A8; }

        @keyframes lux-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
        @keyframes lux-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes lux-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .5 } }

        /* Tab buttons */
        .lux-tab { transition: background .2s, color .2s, border-color .2s; }
        .lux-tab:hover  { background: rgba(212,175,55,.08) !important; color: #D4AF37 !important; }
        .lux-tab-active { background: linear-gradient(135deg,rgba(212,175,55,.18) 0%,rgba(212,175,55,.08) 100%) !important; color: #F5D678 !important; border-color: rgba(212,175,55,.35) !important; }

        /* Sign-out */
        .lux-signout { transition: background .2s, border-color .2s, color .2s; }
        .lux-signout:hover { background: rgba(255,60,60,.14) !important; border-color: rgba(255,80,80,.55) !important; color: #ff6b6b !important; }

        /* Mobile tab strip */
        .lux-mobile-tab { transition: color .2s, background .2s; }
        .lux-mobile-tab:hover { background: rgba(212,175,55,.08) !important; }

        /* ══ LAYOUT RULES ══ */

        /* Desktop sidebar */
        .lux-sidebar { display: flex !important; }
        .lux-mobile-header { display: none !important; }
        .lux-mobile-nav { display: none !important; }
        .lux-tablet-nav { display: none !important; }

        /* Tablet (768–1023) */
        @media (max-width: 1023px) {
          .lux-sidebar { display: none !important; }
          .lux-mobile-header { display: flex !important; }
          .lux-tablet-nav { display: flex !important; }
          .lux-main { padding-top: 112px !important; padding-left: 16px !important; padding-right: 16px !important; padding-bottom: 32px !important; }
        }

        /* Phone (< 768) */
        @media (max-width: 767px) {
          .lux-tablet-nav { display: none !important; }
          .lux-mobile-nav { display: flex !important; }
          .lux-main { padding-top: 72px !important; padding-left: 12px !important; padding-right: 12px !important; padding-bottom: 88px !important; }
        }

        /* Very small (< 380) */
        @media (max-width: 379px) {
          .lux-main { padding-left: 8px !important; padding-right: 8px !important; }
        }

        /* Tablet content: push below header (56) + tab bar (48) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .lux-main { padding-top: 116px !important; }
        }

        /* Prevent horizontal overflow globally */
        .lux-main > * { max-width: 100%; }
        img, svg { max-width: 100%; }
      `}</style>

      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        display: 'flex', background: '#050401', zIndex: 9999, overflow: 'hidden'
      }}>

        {/* BG ATMOSPHERE */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 20% 50%, rgba(212,175,55,.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(212,175,55,.03) 0%, transparent 55%)
          `
        }} />

        {/* ══ MOBILE / TABLET HEADER (≤ 1023px) ══ */}
        <header className="lux-mobile-header" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 56,
          display: 'none',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 14px',
          background: 'rgba(5,4,1,.97)',
          borderBottom: '1px solid rgba(212,175,55,.15)',
          backdropFilter: 'blur(20px)',
          gap: 8,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <svg viewBox="0 0 120 60" fill="none" style={{ width: 28, height: 14 }}>
              <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#mhg)" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="60" cy="5" r="3" fill="url(#mhg)" />
              <circle cx="30" cy="40" r="2" fill="url(#mhg)" />
              <circle cx="90" cy="40" r="2" fill="url(#mhg)" />
              <path d="M4 50 L116 50" stroke="url(#mhg)" strokeWidth="1" />
              <defs>
                <linearGradient id="mhg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8B6914" />
                  <stop offset="40%" stopColor="#D4AF37" />
                  <stop offset="60%" stopColor="#F5D678" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
              letterSpacing: '.2em', color: '#D4AF37'
            }}>
              VIBE<span style={{ color: 'rgba(212,175,55,.4)' }}>INVITE</span>
            </span>
          </div>

          {/* Current tab label */}
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
            fontStyle: 'italic', color: 'rgba(212,175,55,.5)',
            flex: 1, textAlign: 'center',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            padding: '0 6px'
          }}>
            {tabLabels[activeTab]}
          </span>

          {/* Status + Sign-out */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 9px', borderRadius: 100,
              background: isProfileComplete ? 'rgba(212,175,55,.08)' : 'rgba(255,165,0,.08)',
              border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.25)' : 'rgba(255,165,0,.25)'}`,
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
              color: isProfileComplete ? 'rgba(212,175,55,.8)' : 'rgba(255,165,0,.8)',
              whiteSpace: 'nowrap'
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                background: isProfileComplete ? '#D4AF37' : '#ffa500',
                boxShadow: `0 0 6px ${isProfileComplete ? 'rgba(212,175,55,.6)' : 'rgba(255,165,0,.6)'}`,
                animation: 'lux-pulse 2s ease-in-out infinite'
              }} />
              {isProfileComplete ? 'LIVE' : 'SETUP'}
            </div>

            <button
              className="lux-signout"
              onClick={() => window.location.href = '/login'}
              title="Ieșire"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '6px 10px', borderRadius: 8,
                background: 'rgba(255,60,60,.07)',
                border: '1px solid rgba(255,60,60,.22)',
                color: 'rgba(255,100,100,.75)',
                fontFamily: "'Cinzel', serif", fontSize: 8, fontWeight: 600,
                letterSpacing: '.14em', textTransform: 'uppercase',
                cursor: 'pointer', whiteSpace: 'nowrap'
              }}>
              <SignOutIcon />
              <span>Ieșire</span>
            </button>
          </div>
        </header>

        {/* ══ DESKTOP SIDEBAR (≥ 1024px) ══ */}
        <aside className="lux-sidebar" style={{
          width: 248, flexShrink: 0,
          background: 'linear-gradient(180deg,#0C0903 0%,#080601 100%)',
          borderRight: '1px solid rgba(212,175,55,.15)',
          flexDirection: 'column',
          padding: '28px 0',
          position: 'relative', zIndex: 10,
          boxShadow: '4px 0 40px rgba(0,0,0,.5)'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)'
          }} />

          {/* Logo */}
          <div style={{ textAlign: 'center', padding: '0 20px 24px', borderBottom: '1px solid rgba(212,175,55,.1)' }}>
            <div style={{ marginBottom: 8 }}>
              <svg viewBox="0 0 120 60" fill="none" style={{ width: 52, height: 26, margin: '0 auto' }}>
                <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#sg)" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="60" cy="5" r="3" fill="url(#sg)" />
                <circle cx="30" cy="40" r="2" fill="url(#sg)" />
                <circle cx="90" cy="40" r="2" fill="url(#sg)" />
                <path d="M4 50 L116 50" stroke="url(#sg)" strokeWidth="1" />
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8B6914" />
                    <stop offset="40%" stopColor="#D4AF37" />
                    <stop offset="60%" stopColor="#F5D678" />
                    <stop offset="100%" stopColor="#8B6914" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 style={{
              fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
              letterSpacing: '.28em', color: '#D4AF37', margin: '0 0 4px'
            }}>VIBE<span style={{ color: 'rgba(212,175,55,.45)' }}>INVITE</span></h1>
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,.35)'
            }}>Premium Luxury Edition</span>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.28em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,.3)',
              padding: '0 10px', marginBottom: 8
            }}>Navigare</p>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`lux-tab ${activeTab === tab.id ? 'lux-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', padding: '11px 14px',
                  display: 'flex', alignItems: 'center', gap: 11,
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 10,
                  color: activeTab === tab.id ? '#F5D678' : 'rgba(212,175,55,.55)',
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: "'Cinzel', serif",
                  fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
                }}>
                <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,.6)', flexShrink: 0 }} />
                )}
              </button>
            ))}
          </nav>

          {/* Status + Logout */}
          <div style={{ padding: '0 14px' }}>
            <div style={{
              padding: '12px 14px', marginBottom: 10,
              background: isProfileComplete ? 'rgba(212,175,55,.05)' : 'rgba(255,140,0,.06)',
              border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.2)' : 'rgba(255,140,0,.25)'}`,
              borderRadius: 12, position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(212,175,55,.35)' : 'rgba(255,140,0,.3)'},transparent)`
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: isProfileComplete ? '#D4AF37' : '#ffa500',
                  boxShadow: `0 0 8px ${isProfileComplete ? 'rgba(212,175,55,.7)' : 'rgba(255,165,0,.7)'}`,
                  animation: 'lux-pulse 2s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: isProfileComplete ? 'rgba(212,175,55,.8)' : 'rgba(255,165,0,.8)'
                }}>{isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}</span>
              </div>
              {isProfileComplete && (
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                  fontStyle: 'italic', color: 'rgba(212,175,55,.5)',
                  wordBreak: 'break-all', lineHeight: 1.5
                }}>
                  vibeinvite.ro/invitatie/lux/<strong style={{ color: 'rgba(212,175,55,.75)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.2))' }} />
              <div style={{ width: 4, height: 4, background: 'rgba(212,175,55,.3)', transform: 'rotate(45deg)', margin: '0 6px' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.2),transparent)' }} />
            </div>

            <button
              className="lux-signout"
              onClick={() => window.location.href = '/login'}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '9px 14px', borderRadius: 8,
                background: 'rgba(255,60,60,.06)',
                border: '1px solid rgba(255,60,60,.2)',
                color: 'rgba(255,100,100,.7)',
                fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
                letterSpacing: '.18em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}>
              <SignOutIcon />
              Ieșire
            </button>

            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,.2)',
              textAlign: 'center', marginTop: 14
            }}>VibeInvite © 2026</p>
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)'
          }} />
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="lux-main" style={{
          flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden',
          padding: 'clamp(28px,4vw,52px) clamp(20px,4vw,64px)',
          position: 'relative', zIndex: 5,
        }}>
          {/* Art deco corner accents */}
          <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(120px,12vw)', height: 'min(120px,12vw)', opacity: .25, pointerEvents: 'none', zIndex: 4 }}>
            <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
              <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg2)" strokeWidth="1.2" />
              <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg2)" strokeWidth=".7" strokeOpacity=".6" />
              <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg2)" fillOpacity=".6" />
              <defs>
                <linearGradient id="dg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8B6914" stopOpacity=".3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ animation: 'lux-fade-in .5s ease both', position: 'relative', zIndex: 5 }}>
            {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} />}
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

        {/* ══ TABLET HORIZONTAL NAV (768–1023px) ══ */}
        <nav className="lux-tablet-nav" style={{
          position: 'fixed', top: 56, left: 0, right: 0, zIndex: 150,
          height: 48,
          background: 'rgba(8,6,1,.97)',
          borderBottom: '1px solid rgba(212,175,55,.12)',
          backdropFilter: 'blur(16px)',
          alignItems: 'stretch',
          display: 'none',
          padding: '0 12px', gap: 4,
          overflowX: 'auto',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`lux-tab ${activeTab === tab.id ? 'lux-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '0 14px', flexShrink: 0,
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: 8,
                color: activeTab === tab.id ? '#F5D678' : 'rgba(212,175,55,.5)',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                fontSize: 9, fontWeight: 600, letterSpacing: '.1em',
                whiteSpace: 'nowrap',
              }}>
              <span style={{ opacity: activeTab === tab.id ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 6px rgba(212,175,55,.6)', marginLeft: 2, flexShrink: 0 }} />
              )}
            </button>
          ))}
        </nav>

        {/* ══ PHONE BOTTOM NAV (< 768px) ══ */}
        <nav className="lux-mobile-nav" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
          height: 68,
          background: 'rgba(5,4,1,.98)',
          borderTop: '1px solid rgba(212,175,55,.15)',
          backdropFilter: 'blur(20px)',
          display: 'none',
          alignItems: 'stretch', justifyContent: 'stretch',
          boxShadow: '0 -8px 40px rgba(0,0,0,.6)'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35),transparent)'
          }} />
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="lux-mobile-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderTop: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
                color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.4)',
                padding: '7px 4px',
                minWidth: 0,
              }}>
              <span style={{
                transition: 'transform .2s',
                transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)',
                flexShrink: 0
              }}>
                {tab.icon}
              </span>
              <span style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.08em',
                textTransform: 'uppercase', fontWeight: 600,
                color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.35)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                maxWidth: '100%'
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