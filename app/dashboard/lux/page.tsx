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

//   if (loading) return <div style={fullScreenCenter}>SINCRONIZARE DATE LUX...</div>;

//   const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
//   const currentOrderId = weddingData?.order_id || weddingData?.id;

//   return (
//     <div style={dashboardWrapper}>
//       <aside style={sidebarS}>
//         <div style={{ textAlign: 'center', marginBottom: '40px' }}>
//           <h1 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '1.2rem', margin: 0 }}>VIBE INVITE</h1>
//           <span style={{ fontSize: '0.6rem', color: '#d4af37', opacity: 0.6 }}>PREMIUM LUXURY EDITION</span>
//         </div>

//         <nav style={{ flex: 1, padding: '0 20px' }}>
//           <TabButton active={activeTab === 'summary'} label="📊 Dashboard" onClick={() => setActiveTab('summary')} />
//           <TabButton active={activeTab === 'personalize'} label="🎨 Personalizare" onClick={() => setActiveTab('personalize')} />
//           <TabButton active={activeTab === 'menu'} label="🍴 Meniu Nuntă" onClick={() => setActiveTab('menu')} />
//           <TabButton active={activeTab === 'photos'} label="📸 Galerie Poze" onClick={() => setActiveTab('photos')} />
//         </nav>

//         <div style={{ padding: '20px' }}>
//            <div style={statusCardS(isProfileComplete)}>
//              <p style={{ fontSize: '0.6rem', color: isProfileComplete ? '#d4af37' : '#ffa500', margin: '0 0 5px 0' }}>
//                {isProfileComplete ? '● LINK ACTIV' : '○ INCOMPLET'}
//              </p>
//              {isProfileComplete && <p style={{ fontSize: '0.7rem', color: '#fff', wordBreak: 'break-all' }}>vibeinvite.ro/invitatie/lux/{weddingData.custom_slug}</p>}
//            </div>
//            <button onClick={() => window.location.href='/login'} style={signOutBtn}>IEȘIRE</button>
//         </div>
//       </aside>

//       <main style={mainContentS}>
//         {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} />}
        
//         {activeTab === 'personalize' && (
//           <PersonalizeSection 
//             initialData={weddingData} 
//             orderId={currentOrderId} 
//             onSave={refreshData} 
//           />
//         )}
        
//         {activeTab === 'menu' && (
//           <MenuSection 
//             initialData={weddingData} 
//             orderId={currentOrderId} 
//             onSave={refreshData} 
//           />
//         )}
        
//         {activeTab === 'photos' && (
//           <PhotosSection 
//             initialData={weddingData} 
//             orderId={currentOrderId} 
//             onSave={refreshData} 
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// // Stiluri (Rămân aceleași pe care le ai deja)
// const dashboardWrapper: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', background: '#0a0a0a', zIndex: 9999, overflow: 'hidden' };
// const sidebarS: React.CSSProperties = { width: '280px', background: '#111', borderRight: '1px solid #d4af3722', display: 'flex', flexDirection: 'column', padding: '30px 0' };
// const mainContentS: React.CSSProperties = { flex: 1, height: '100vh', overflowY: 'auto', padding: '50px 80px', color: '#fff' };
// const fullScreenCenter: React.CSSProperties = { background: '#000', color: '#d4af37', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' };
// const statusCardS = (ok: boolean): React.CSSProperties => ({ padding: '12px', background: '#000', border: `1px solid ${ok ? '#d4af37' : '#ffa500'}`, borderRadius: '8px' });
// const signOutBtn: React.CSSProperties = { width: '100%', background: 'transparent', color: '#ff4444', border: '1px solid #ff4444', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', marginTop: '10px' };
// const TabButton = ({ active, label, onClick }: any) => (
//     <button onClick={onClick} style={{ width: '100%', padding: '14px 20px', marginBottom: '8px', background: active ? '#d4af37' : 'transparent', color: active ? '#000' : '#d4af37', border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold' }}>{label}</button>
// );


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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    },
    {
      id: 'personalize', label: 'Personalizare',
      icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
        <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    },
    {
      id: 'menu', label: 'Meniu Nuntă',
      icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
        <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    },
    {
      id: 'photos', label: 'Galerie Poze',
      icon: <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
        <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    },
  ];

  const tabLabels: Record<string, string> = {
    summary: 'Dashboard',
    personalize: 'Personalizare',
    menu: 'Meniu Nuntă',
    photos: 'Galerie Poze',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;-webkit-font-smoothing:antialiased;}
        body{font-family:'Lato',sans-serif;background:#050401;color:#F5E6A8;}
        @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes lux-fade-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        .lux-tab:hover { background: rgba(212,175,55,.08) !important; color: #D4AF37 !important; }
        .lux-tab-active { background: linear-gradient(135deg,rgba(212,175,55,.18) 0%,rgba(212,175,55,.08) 100%) !important; color: #F5D678 !important; border-color: rgba(212,175,55,.35) !important; }
        .lux-signout:hover { background: rgba(255,60,60,.12) !important; border-color: rgba(255,80,80,.5) !important; color: #ff6b6b !important; }
        .lux-mobile-tab:hover { background: rgba(212,175,55,.1) !important; }
        @media(max-width:768px){
          .lux-sidebar { display: none !important; }
          .lux-main { padding: 16px 16px 100px !important; }
          .lux-mobile-nav { display: flex !important; }
          .lux-mobile-header { display: flex !important; }
        }
        @media(min-width:769px){
          .lux-mobile-nav { display: none !important; }
          .lux-mobile-header { display: none !important; }
        }
      `}</style>

      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        display: 'flex', background: '#050401', zIndex: 9999, overflow: 'hidden'
      }}>

        {/* ── BACKGROUND ATMOSPHERE ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 70% 60% at 20% 50%,rgba(212,175,55,.04) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(212,175,55,.03) 0%,transparent 55%)'
        }} />

        {/* ══════════════════════════
            MOBILE HEADER
        ══════════════════════════ */}
        <div className="lux-mobile-header" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 56, alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px',
          background: 'rgba(5,4,1,.96)', borderBottom: '1px solid rgba(212,175,55,.15)',
          backdropFilter: 'blur(16px)'
        }}>
          <div>
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
              letterSpacing: '.22em', color: '#D4AF37'
            }}>VIBE<span style={{ color: 'rgba(212,175,55,.45)' }}>INVITE</span></span>
          </div>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
            fontStyle: 'italic', color: 'rgba(212,175,55,.5)'
          }}>{tabLabels[activeTab]}</span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: 100,
            background: isProfileComplete ? 'rgba(212,175,55,.08)' : 'rgba(255,165,0,.08)',
            border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.25)' : 'rgba(255,165,0,.25)'}`,
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.16em',
            color: isProfileComplete ? 'rgba(212,175,55,.8)' : 'rgba(255,165,0,.8)'
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              background: isProfileComplete ? '#D4AF37' : '#ffa500',
              boxShadow: `0 0 6px ${isProfileComplete ? 'rgba(212,175,55,.6)' : 'rgba(255,165,0,.6)'}`
            }} />
            {isProfileComplete ? 'LIVE' : 'SETUP'}
          </div>
        </div>

        {/* ══════════════════════════
            DESKTOP SIDEBAR
        ══════════════════════════ */}
        <aside className="lux-sidebar" style={{
          width: 260, flexShrink: 0,
          background: 'linear-gradient(180deg,#0C0903 0%,#080601 100%)',
          borderRight: '1px solid rgba(212,175,55,.15)',
          display: 'flex', flexDirection: 'column',
          padding: '32px 0', position: 'relative', zIndex: 10,
          boxShadow: '4px 0 40px rgba(0,0,0,.5)'
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)'
          }} />

          {/* Logo */}
          <div style={{ textAlign: 'center', padding: '0 24px 28px', borderBottom: '1px solid rgba(212,175,55,.1)' }}>
            <div style={{ marginBottom: 8 }}>
              <svg viewBox="0 0 120 60" fill="none" style={{ width: 56, height: 28, margin: '0 auto' }}>
                <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#sg)" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="60" cy="5" r="3" fill="url(#sg)" />
                <circle cx="30" cy="40" r="2" fill="url(#sg)" />
                <circle cx="90" cy="40" r="2" fill="url(#sg)" />
                <path d="M4 50 L116 50" stroke="url(#sg)" strokeWidth="1" />
                <defs><linearGradient id="sg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B6914" /><stop offset="40%" stopColor="#D4AF37" /><stop offset="60%" stopColor="#F5D678" /><stop offset="100%" stopColor="#8B6914" /></linearGradient></defs>
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
          <nav style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.28em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,.3)',
              padding: '0 12px', marginBottom: 8
            }}>Navigare</p>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`lux-tab ${activeTab === tab.id ? 'lux-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', padding: '12px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 10,
                  color: activeTab === tab.id ? '#F5D678' : 'rgba(212,175,55,.55)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all .2s ease',
                  fontFamily: "'Cinzel', serif",
                  fontSize: 10, fontWeight: 600, letterSpacing: '.12em',
                }}>
                <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,.6)' }} />
                )}
              </button>
            ))}
          </nav>

          {/* Status + Logout */}
          <div style={{ padding: '0 16px 0' }}>
            {/* Status card */}
            <div style={{
              padding: '14px 16px', marginBottom: 12,
              background: isProfileComplete ? 'rgba(212,175,55,.05)' : 'rgba(255,140,0,.06)',
              border: `1px solid ${isProfileComplete ? 'rgba(212,175,55,.2)' : 'rgba(255,140,0,.25)'}`,
              borderRadius: 12,
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(212,175,55,.35)' : 'rgba(255,140,0,.3)'},transparent)`
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 8 : 0 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: isProfileComplete ? '#D4AF37' : '#ffa500',
                  boxShadow: `0 0 8px ${isProfileComplete ? 'rgba(212,175,55,.7)' : 'rgba(255,165,0,.7)'}`,
                  animation: 'lux-pulse 2s ease-in-out infinite',
                  flexShrink: 0
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
                }}>vibeinvite.ro/invitatie/lux/<strong style={{ color: 'rgba(212,175,55,.75)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong></p>
              )}
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.2))' }} />
              <div style={{ width: 4, height: 4, background: 'rgba(212,175,55,.3)', transform: 'rotate(45deg)', margin: '0 6px' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.2),transparent)' }} />
            </div>

            {/* Sign out */}
            <button
              className="lux-signout"
              onClick={() => window.location.href = '/login'}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 8,
                background: 'rgba(255,60,60,.06)',
                border: '1px solid rgba(255,60,60,.2)',
                color: 'rgba(255,100,100,.7)',
                fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
                letterSpacing: '.18em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all .2s'
              }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13 }}>
                <path d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ieșire
            </button>

            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,.2)',
              textAlign: 'center', marginTop: 16
            }}>VibeInvite © 2026</p>
          </div>

          {/* Bottom accent line */}
          <div style={{
            position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent)'
          }} />
        </aside>

        {/* ══════════════════════════
            MAIN CONTENT
        ══════════════════════════ */}
        <main className="lux-main" style={{
          flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden',
          padding: 'clamp(32px,4vw,56px) clamp(24px,5vw,72px)',
          position: 'relative', zIndex: 5
        }}>
          {/* Art deco corner accents */}
          <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(140px,14vw)', height: 'min(140px,14vw)', opacity: .35, pointerEvents: 'none', zIndex: 4 }}>
            <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
              <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg2)" strokeWidth="1.2" />
              <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg2)" strokeWidth=".7" strokeOpacity=".6" />
              <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg2)" fillOpacity=".6" />
              <defs><linearGradient id="dg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#8B6914" stopOpacity=".3" /></linearGradient></defs>
            </svg>
          </div>
          <div style={{ position: 'fixed', bottom: 0, right: 0, width: 'min(120px,12vw)', height: 'min(120px,12vw)', opacity: .25, pointerEvents: 'none', zIndex: 4 }}>
            <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,-1)', width: '100%', height: '100%' }}>
              <path d="M8 8 L8 120 M8 8 L120 8" stroke="#D4AF37" strokeWidth="1" />
              <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="#D4AF37" fillOpacity=".5" />
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

        {/* ══════════════════════════
            MOBILE BOTTOM NAV
        ══════════════════════════ */}
        <nav className="lux-mobile-nav" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
          height: 70,
          background: 'rgba(5,4,1,.97)',
          borderTop: '1px solid rgba(212,175,55,.15)',
          backdropFilter: 'blur(20px)',
          alignItems: 'stretch', justifyContent: 'stretch',
          boxShadow: '0 -8px 40px rgba(0,0,0,.6)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35),transparent)' }} />
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="lux-mobile-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 5,
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderTop: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
                transition: 'all .2s',
                color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.4)',
                padding: '8px 4px'
              }}>
              <span style={{ transition: 'transform .2s', transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)' }}>
                {tab.icon}
              </span>
              <span style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.1em',
                textTransform: 'uppercase', fontWeight: 600,
                color: activeTab === tab.id ? '#D4AF37' : 'rgba(212,175,55,.35)'
              }}>{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>

        {/* Mobile top spacer */}
        <style>{`
          @media(max-width:768px){
            .lux-main { padding-top: 72px !important; }
          }
        `}</style>
      </div>
    </>
  );
}