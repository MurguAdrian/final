"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { SummarySection } from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection } from './components/MenuSection';
import { PhotosSection } from './components/PhotosSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';

export default function NatureDashboard() {
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
        @keyframes nat-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <div style={{
        background: '#EDF5E8', color: '#3A5E33', height: '100dvh', width: '100vw',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
      }}>
        <div style={{
          width: 36, height: 36, border: '1.5px solid rgba(58,94,51,.2)',
          borderTopColor: '#3A5E33', borderRadius: '50%',
          animation: 'nat-spin 1s linear infinite'
        }} />
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '.36em',
          textTransform: 'uppercase', color: 'rgba(58,94,51,.6)'
        }}>Sincronizare Date Nature...</span>
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

  const FloralSprig = () => (
    <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 70, opacity: .18 }}>
      <path d="M40 135 Q37 110 36 90 Q32 65 37 38 Q39 22 40 8" stroke="#5C8A52" strokeWidth="1.4" strokeOpacity=".6" fill="none" strokeLinecap="round" />
      <path d="M37 93 Q25 84 18 76" stroke="#5C8A52" strokeWidth=".9" strokeOpacity=".5" fill="none" strokeLinecap="round" />
      <path d="M37 72 Q50 64 57 55" stroke="#5C8A52" strokeWidth=".9" strokeOpacity=".5" fill="none" strokeLinecap="round" />
      <ellipse cx="15" cy="74" rx="9" ry="4" fill="#7AB86A" fillOpacity=".5" transform="rotate(-38 15 74)" />
      <ellipse cx="58" cy="52" rx="8" ry="3.5" fill="#6AAE5A" fillOpacity=".45" transform="rotate(32 58 52)" />
      <g transform="translate(40 9)">
        {[0, 72, 144, 216, 288].map(r => (<ellipse key={r} cx="0" cy="-6" rx="4" ry="8" fill="white" fillOpacity=".8" transform={`rotate(${r})`} />))}
        <circle cx="0" cy="0" r="3" fill="#F2D98E" fillOpacity=".9" />
      </g>
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html {
          height: 100%;
          min-height: 100dvh;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
        }
        body {
          height: 100%;
          min-height: 100dvh;
          overscroll-behavior: none;
          font-family: 'Lato', sans-serif;
          background: #EDF5E8;
          color: #1C2218;
          -webkit-font-smoothing: antialiased;
          overflow: hidden;
          position: fixed;
          width: 100%;
        }
        input, textarea, select { font-size: 16px !important; -webkit-text-size-adjust: 100%; }

        @keyframes nat-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
        @keyframes nat-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes nat-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .5 } }

        .nat-tab { transition: background .2s, color .2s, border-color .2s; }
        .nat-tab:hover  { background: rgba(58,94,51,.08) !important; color: #3A5E33 !important; }
        .nat-tab-active { background: linear-gradient(135deg,rgba(58,94,51,.18) 0%,rgba(58,94,51,.08) 100%) !important; color: #274422 !important; border-color: rgba(58,94,51,.35) !important; }

        .nat-signout { transition: background .2s, border-color .2s, color .2s; }
        .nat-signout:hover { background: rgba(220,50,50,.1) !important; border-color: rgba(220,50,50,.45) !important; color: #c0392b !important; }

        .nat-mobile-tab { transition: color .2s, background .2s; }
        .nat-mobile-tab:hover { background: rgba(58,94,51,.08) !important; }

        .nat-app-shell {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 100dvh;
          display: flex;
          background: radial-gradient(ellipse 65% 55% at 16% 18%, rgba(140,190,130,.11) 0%, transparent 55%), radial-gradient(ellipse 58% 50% at 84% 82%, rgba(225,205,148,.14) 0%, transparent 55%), linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%);
          overflow: hidden;
        }

        .nat-sidebar { display: flex !important; }
        .nat-mobile-header { display: none !important; }
        .nat-mobile-nav { display: none !important; }
        .nat-tablet-nav { display: none !important; }

        .nat-main {
          flex: 1;
          height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior-y: contain;
          padding: clamp(28px,4vw,52px) clamp(20px,4vw,64px);
          position: relative;
          z-index: 5;
        }

        @media (max-width: 1023px) {
          .nat-sidebar { display: none !important; }
          .nat-mobile-header { display: flex !important; }
          .nat-tablet-nav { display: flex !important; }
          .nat-main {
            padding-top: 116px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-bottom: 40px !important;
          }
        }

        @media (max-width: 767px) {
          .nat-tablet-nav { display: none !important; }
          .nat-mobile-nav { display: flex !important; }
          .nat-main {
            padding-top: 72px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 20px) !important;
            height: 100dvh !important;
          }
        }

        @media (max-width: 379px) {
          .nat-main { padding-left: 8px !important; padding-right: 8px !important; }
        }

        .nat-main > * { max-width: 100%; box-sizing: border-box; }
        img, svg { max-width: 100%; }

        .nat-mobile-nav {
          padding-bottom: env(safe-area-inset-bottom, 0px) !important;
          height: calc(68px + env(safe-area-inset-bottom, 0px)) !important;
        }
      `}</style>

      <div className="nat-app-shell">

        {/* BG botanical corners */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 'min(160px,18vw)', height: 'min(160px,18vw)', opacity: .55, pointerEvents: 'none', zIndex: 0 }}>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".35" />
            <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".35" />
            <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".28" fill="none" strokeLinecap="round" />
            <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".22" transform="rotate(44 52 58)" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 'min(160px,18vw)', height: 'min(160px,18vw)', opacity: .45, pointerEvents: 'none', zIndex: 0, transform: 'scale(-1)' }}>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".35" />
            <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".35" />
            <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".28" fill="none" strokeLinecap="round" />
            <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".22" transform="rotate(44 52 58)" />
          </svg>
        </div>

        {/* ══ MOBILE / TABLET HEADER (≤ 1023px) ══ */}
        <header className="nat-mobile-header" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 56,
          display: 'none',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 14px',
          background: 'rgba(253,250,242,.97)',
          borderBottom: '1px solid rgba(154,123,63,.18)',
          backdropFilter: 'blur(20px)',
          gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600, letterSpacing: '.2em', color: '#3A5E33' }}>
              Vibe<span style={{ color: '#C9A84C' }}>Invite</span>
            </span>
          </div>

          <span style={{
            fontFamily: "'Cormorant', serif", fontSize: 14,
            fontStyle: 'italic', color: '#6B7A5E',
            flex: 1, textAlign: 'center',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            padding: '0 6px'
          }}>
            {tabLabels[activeTab]}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 9px', borderRadius: 100,
              background: isProfileComplete ? 'rgba(58,94,51,.1)' : 'rgba(201,168,76,.1)',
              border: `1px solid ${isProfileComplete ? 'rgba(58,94,51,.3)' : 'rgba(201,168,76,.3)'}`,
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em',
              color: isProfileComplete ? '#3A5E33' : '#9A7B3F',
              whiteSpace: 'nowrap'
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                background: isProfileComplete ? '#3A5E33' : '#C9A84C',
                boxShadow: `0 0 6px ${isProfileComplete ? 'rgba(58,94,51,.6)' : 'rgba(201,168,76,.6)'}`,
                animation: 'nat-pulse 2s ease-in-out infinite'
              }} />
              {isProfileComplete ? 'LIVE' : 'SETUP'}
            </div>
                 <div style={{ marginBottom: 8 }}>
   <DeleteAccountButton />            </div>
            <button
              className="nat-signout"
              onClick={() => window.location.href = '/login'}
              title="Ieșire"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '6px 10px', borderRadius: 8,
                background: 'rgba(220,50,50,.05)',
                border: '1px solid rgba(220,50,50,.18)',
                color: 'rgba(180,40,40,.7)',
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
        <aside className="nat-sidebar" style={{
          width: 248, flexShrink: 0,
          background: 'linear-gradient(180deg, rgba(237,245,232,.98) 0%, rgba(243,238,216,.98) 100%)',
          borderRight: '1px solid rgba(154,123,63,.2)',
          flexDirection: 'column',
          padding: '28px 0',
          position: 'relative', zIndex: 10,
          boxShadow: '4px 0 30px rgba(58,94,51,.08)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.45),transparent)' }} />

          {/* Logo */}
          <div style={{ textAlign: 'center', padding: '0 20px 24px', borderBottom: '1px solid rgba(154,123,63,.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <FloralSprig />
            </div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, letterSpacing: '.28em', color: '#3A5E33', margin: '0 0 4px' }}>
              VIBE<span style={{ color: 'rgba(58,94,51,.45)' }}>INVITE</span>
            </h1>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(107,122,94,.6)' }}>Nature Edition</span>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(107,122,94,.55)', padding: '0 10px', marginBottom: 8 }}>Navigare</p>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nat-tab ${activeTab === tab.id ? 'nat-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', padding: '11px 14px',
                  display: 'flex', alignItems: 'center', gap: 11,
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 10,
                  color: activeTab === tab.id ? '#274422' : 'rgba(58,94,51,.55)',
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: "'Cinzel', serif",
                  fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
                }}>
                <span style={{ opacity: activeTab === tab.id ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#3A5E33', boxShadow: '0 0 8px rgba(58,94,51,.5)', flexShrink: 0 }} />
                )}
              </button>
            ))}
          </nav>

          {/* Status + Logout */}
          <div style={{ padding: '0 14px' }}>
            <div style={{
              padding: '12px 14px', marginBottom: 10,
              background: isProfileComplete ? 'rgba(58,94,51,.07)' : 'rgba(201,168,76,.07)',
              border: `1px solid ${isProfileComplete ? 'rgba(58,94,51,.22)' : 'rgba(201,168,76,.28)'}`,
              borderRadius: 12, position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(58,94,51,.3)' : 'rgba(201,168,76,.3)'},transparent)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: isProfileComplete ? '#3A5E33' : '#C9A84C',
                  boxShadow: `0 0 8px ${isProfileComplete ? 'rgba(58,94,51,.6)' : 'rgba(201,168,76,.6)'}`,
                  animation: 'nat-pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em', textTransform: 'uppercase', color: isProfileComplete ? 'rgba(58,94,51,.8)' : 'rgba(154,123,63,.8)' }}>
                  {isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}
                </span>
              </div>
              {isProfileComplete && (
                <p style={{ fontFamily: "'Cormorant', serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(58,94,51,.55)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                  vibeinvite.ro/invitatie/nature/<strong style={{ color: 'rgba(58,94,51,.8)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.22))' }} />
              <div style={{ width: 4, height: 4, background: 'rgba(154,123,63,.35)', transform: 'rotate(45deg)', margin: '0 6px' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(154,123,63,.22),transparent)' }} />
            </div>
     <div style={{ marginBottom: 8 }}>
   <DeleteAccountButton />            </div>
            <button
              className="nat-signout"
              onClick={() => window.location.href = '/login'}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '9px 14px', borderRadius: 8,
                background: 'rgba(220,50,50,.05)',
                border: '1px solid rgba(220,50,50,.15)',
                color: 'rgba(180,40,40,.65)',
                fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
                letterSpacing: '.18em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}>
              <SignOutIcon />
              Ieșire
            </button>

            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(107,122,94,.35)', textAlign: 'center', marginTop: 14 }}>
              VibeInvite © 2026
            </p>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.3),transparent)' }} />
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="nat-main">
          <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(120px,12vw)', height: 'min(120px,12vw)', opacity: .22, pointerEvents: 'none', zIndex: 4 }}>
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}>
              <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".5" />
              <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".5" />
              <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".38" fill="none" strokeLinecap="round" />
              <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".3" transform="rotate(44 52 58)" />
            </svg>
          </div>

          <div style={{ animation: 'nat-fade-in .5s ease both', position: 'relative', zIndex: 5, width: '100%' }}>
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
        <nav className="nat-tablet-nav" style={{
          position: 'fixed', top: 56, left: 0, right: 0, zIndex: 150,
          height: 48,
          background: 'rgba(253,250,242,.97)',
          borderBottom: '1px solid rgba(154,123,63,.15)',
          backdropFilter: 'blur(16px)',
          alignItems: 'stretch',
          display: 'none',
          padding: '0 12px', gap: 4,
          overflowX: 'auto',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nat-tab ${activeTab === tab.id ? 'nat-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '0 14px', flexShrink: 0,
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: 8,
                color: activeTab === tab.id ? '#274422' : 'rgba(58,94,51,.5)',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                fontSize: 9, fontWeight: 600, letterSpacing: '.1em',
                whiteSpace: 'nowrap',
              }}>
              <span style={{ opacity: activeTab === tab.id ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3A5E33', boxShadow: '0 0 6px rgba(58,94,51,.5)', marginLeft: 2, flexShrink: 0 }} />
              )}
            </button>
          ))}
        </nav>

        {/* ══ PHONE BOTTOM NAV (< 768px) ══ */}
        <nav className="nat-mobile-nav" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
          minHeight: 68,
          background: 'rgba(253,250,242,.98)',
          borderTop: '1px solid rgba(154,123,63,.18)',
          backdropFilter: 'blur(20px)',
          display: 'none',
          alignItems: 'flex-start',
          justifyContent: 'stretch',
          boxShadow: '0 -4px 24px rgba(58,94,51,.08)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.3),transparent)' }} />
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="nat-mobile-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderTop: activeTab === tab.id ? '2px solid #3A5E33' : '2px solid transparent',
                color: activeTab === tab.id ? '#3A5E33' : 'rgba(58,94,51,.4)',
                padding: '10px 4px 8px',
                minWidth: 0,
                minHeight: 56,
              }}>
              <span style={{ transition: 'transform .2s', transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)', flexShrink: 0 }}>
                {tab.icon}
              </span>
              <span style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.08em',
                textTransform: 'uppercase', fontWeight: 600,
                color: activeTab === tab.id ? '#3A5E33' : 'rgba(58,94,51,.35)',
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
