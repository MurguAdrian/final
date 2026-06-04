"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { SummarySection } from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection } from './components/MenuSection';
import { PhotosSection } from './components/PhotosSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';

export default function BohoDashboard() {
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lora:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        @keyframes boho-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <div style={{
        background: '#FDF6EF', color: '#C4785A', height: '100dvh', width: '100vw',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
      }}>
        <div style={{
          width: 36, height: 36, border: '1.5px solid rgba(196,120,90,.25)',
          borderTopColor: '#C4785A', borderRadius: '50%',
          animation: 'boho-spin 1s linear infinite'
        }} />
        <span style={{
          fontFamily: "'Playfair Display', serif", fontSize: 10, letterSpacing: '.32em',
          textTransform: 'uppercase', color: 'rgba(196,120,90,.65)'
        }}>Sincronizare Date Boho...</span>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lora:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html {
          height: 100%;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
        }
        body {
          height: 100%;
          overscroll-behavior: none;
          font-family: 'Lora', serif;
          background: #FDF6EF;
          color: #7A4A35;
          -webkit-font-smoothing: antialiased;
          overflow: hidden;
        }

        @keyframes boho-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
        @keyframes boho-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes boho-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .5 } }

        .boho-tab { transition: background .2s, color .2s, border-color .2s; }
        .boho-tab:hover  { background: rgba(196,120,90,.07) !important; color: #C4785A !important; }
        .boho-tab-active { background: linear-gradient(135deg,rgba(196,120,90,.14) 0%,rgba(196,120,90,.07) 100%) !important; color: #C4785A !important; border-color: rgba(196,120,90,.3) !important; }

        .boho-signout { transition: background .2s, border-color .2s, color .2s; }
        .boho-signout:hover { background: rgba(200,60,40,.08) !important; border-color: rgba(200,60,40,.4) !important; color: #c04040 !important; }

        .boho-mobile-tab { transition: color .2s, background .2s; }
        .boho-mobile-tab:hover { background: rgba(196,120,90,.06) !important; }

        .boho-app-shell {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 100dvh;
          display: flex;
          background: #FDF6EF;
          overflow: hidden;
        }

        .boho-sidebar { display: flex !important; }
        .boho-mobile-header { display: none !important; }
        .boho-mobile-nav { display: none !important; }
        .boho-tablet-nav { display: none !important; }

        .boho-main {
          flex: 1;
          height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: auto;
          padding: clamp(28px,4vw,52px) clamp(20px,4vw,64px);
          position: relative;
          z-index: 5;
        }

        @media (max-width: 1023px) {
          .boho-sidebar { display: none !important; }
          .boho-mobile-header { display: flex !important; }
          .boho-tablet-nav { display: flex !important; }
          .boho-main {
            padding-top: 116px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-bottom: 40px !important;
          }
        }

        @media (max-width: 767px) {
          .boho-tablet-nav { display: none !important; }
          .boho-mobile-nav { display: flex !important; }
          .boho-main {
            padding-top: 72px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 20px) !important;
            height: 100dvh !important;
          }
        }

        @media (max-width: 379px) {
          .boho-main {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
        }

        .boho-main > * { max-width: 100%; box-sizing: border-box; }
        img, svg { max-width: 100%; }

        .boho-mobile-nav {
          padding-bottom: env(safe-area-inset-bottom, 0px) !important;
          height: calc(68px + env(safe-area-inset-bottom, 0px)) !important;
        }

        input, textarea, select {
          font-size: 16px !important;
        }
      `}</style>
{/* PORTAL TARGET */}
        <div id="modal-root" style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, pointerEvents: 'none' }} />
      <div className="boho-app-shell">

        {/* BG TEXTURE */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 15% 40%, rgba(196,120,90,.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 75%, rgba(232,180,140,.05) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 10%, rgba(220,160,120,.04) 0%, transparent 50%)
          `
        }} />

        {/* ══ MOBILE / TABLET HEADER ══ */}
        <header className="boho-mobile-header" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 56,
          display: 'none',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 14px',
          background: 'rgba(253,246,239,.97)',
          borderBottom: '1px solid rgba(196,120,90,.18)',
          backdropFilter: 'blur(20px)',
          gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <svg viewBox="0 0 80 40" fill="none" style={{ width: 28, height: 14 }}>
              <path d="M10 35 C20 10, 40 5, 40 5 C40 5, 60 10, 70 35" stroke="url(#mhb)" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
              <path d="M5 35 L75 35" stroke="url(#mhb)" strokeWidth="1" />
              <circle cx="40" cy="5" r="2.5" fill="url(#mhb)" />
              <defs>
                <linearGradient id="mhb" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C4785A" stopOpacity=".5" />
                  <stop offset="50%" stopColor="#C4785A" />
                  <stop offset="100%" stopColor="#C4785A" stopOpacity=".5" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, fontWeight: 600, letterSpacing: '.16em', color: '#C4785A' }}>
              VIBE<span style={{ color: 'rgba(196,120,90,.4)' }}>INVITE</span>
            </span>
          </div>

          <span style={{ fontFamily: "'Lora', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(196,120,90,.55)', flex: 1, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 6px' }}>
            {tabLabels[activeTab]}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 9px', borderRadius: 100,
              background: isProfileComplete ? 'rgba(196,120,90,.08)' : 'rgba(210,140,60,.08)',
              border: `1px solid ${isProfileComplete ? 'rgba(196,120,90,.25)' : 'rgba(210,140,60,.25)'}`,
              fontFamily: "'Playfair Display', serif", fontSize: 8, letterSpacing: '.1em',
              color: isProfileComplete ? '#C4785A' : 'rgba(180,120,50,.9)',
              whiteSpace: 'nowrap'
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                background: isProfileComplete ? '#C4785A' : '#d4884a',
                boxShadow: `0 0 5px ${isProfileComplete ? 'rgba(196,120,90,.5)' : 'rgba(210,140,60,.5)'}`,
                animation: 'boho-pulse 2s ease-in-out infinite'
              }} />
              {isProfileComplete ? 'LIVE' : 'SETUP'}
            </div>
<DeleteAccountButton />
            <button
              className="boho-signout"
              onClick={() => window.location.href = '/login'}
              title="Ieșire"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '6px 10px', borderRadius: 8,
                background: 'rgba(200,60,40,.06)',
                border: '1px solid rgba(200,60,40,.2)',
                color: 'rgba(180,60,40,.75)',
                fontFamily: "'Playfair Display', serif", fontSize: 8, fontWeight: 600,
                letterSpacing: '.12em', textTransform: 'uppercase',
                cursor: 'pointer', whiteSpace: 'nowrap'
              }}>
              <SignOutIcon />
              <span>Ieșire</span>
            </button>
          </div>
        </header>

        {/* ══ DESKTOP SIDEBAR ══ */}
        <aside className="boho-sidebar" style={{
          width: 248, flexShrink: 0,
          background: 'linear-gradient(180deg,#FAF0E6 0%,#F7EDE0 100%)',
          borderRight: '1px solid rgba(196,120,90,.18)',
          flexDirection: 'column',
          padding: '28px 0',
          position: 'relative', zIndex: 10,
          boxShadow: '4px 0 30px rgba(196,120,90,.08)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.4),transparent)' }} />

          <div style={{ textAlign: 'center', padding: '0 20px 24px', borderBottom: '1px solid rgba(196,120,90,.12)' }}>
            <div style={{ marginBottom: 10 }}>
              <svg viewBox="0 0 80 44" fill="none" style={{ width: 52, height: 28, margin: '0 auto' }}>
                <path d="M10 38 C20 12, 40 6, 40 6 C40 6, 60 12, 70 38" stroke="url(#sbg)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <path d="M5 38 L75 38" stroke="url(#sbg)" strokeWidth="1" />
                <circle cx="40" cy="6" r="3" fill="url(#sbg)" />
                <path d="M25 38 C30 28, 40 24, 40 24 C40 24, 50 28, 55 38" stroke="url(#sbg)" strokeWidth="1" strokeOpacity=".5" fill="none" />
                <defs>
                  <linearGradient id="sbg" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#C4785A" stopOpacity=".4" />
                    <stop offset="50%" stopColor="#C4785A" />
                    <stop offset="100%" stopColor="#C4785A" stopOpacity=".4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 600, letterSpacing: '.24em', color: '#C4785A', margin: '0 0 4px' }}>
              VIBE<span style={{ color: 'rgba(196,120,90,.4)' }}>INVITE</span>
            </h1>
            <span style={{ fontFamily: "'Lora', serif", fontSize: 8, letterSpacing: '.18em', fontStyle: 'italic', textTransform: 'uppercase', color: 'rgba(196,120,90,.4)' }}>
              Boho Collection
            </span>
          </div>

          <nav style={{ flex: 1, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(196,120,90,.35)', padding: '0 10px', marginBottom: 8 }}>Navigare</p>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`boho-tab ${activeTab === tab.id ? 'boho-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', padding: '11px 14px',
                  display: 'flex', alignItems: 'center', gap: 11,
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 12,
                  color: activeTab === tab.id ? '#C4785A' : 'rgba(122,74,53,.5)',
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 10, fontWeight: 600, letterSpacing: '.08em',
                }}>
                <span style={{ opacity: activeTab === tab.id ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#C4785A', boxShadow: '0 0 7px rgba(196,120,90,.5)', flexShrink: 0 }} />
                )}
              </button>
            ))}
          </nav>

          <div style={{ padding: '0 14px' }}>
            <div style={{
              padding: '12px 14px', marginBottom: 10,
              background: isProfileComplete ? 'rgba(196,120,90,.06)' : 'rgba(210,140,60,.06)',
              border: `1px solid ${isProfileComplete ? 'rgba(196,120,90,.2)' : 'rgba(210,140,60,.2)'}`,
              borderRadius: 14, position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(196,120,90,.3)' : 'rgba(210,140,60,.25)'},transparent)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: isProfileComplete ? '#C4785A' : '#d4884a',
                  boxShadow: `0 0 7px ${isProfileComplete ? 'rgba(196,120,90,.6)' : 'rgba(210,140,60,.6)'}`,
                  animation: 'boho-pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: isProfileComplete ? '#C4785A' : 'rgba(180,110,40,.8)' }}>
                  {isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}
                </span>
              </div>
              {isProfileComplete && (
                <p style={{ fontFamily: "'Lora', serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(122,74,53,.55)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                  www.vibeinvite.ro/invitatie/boho/<strong style={{ color: '#C4785A', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.2))' }} />
              <svg viewBox="0 0 16 8" width="16" height="8" fill="none" style={{ margin: '0 6px', flexShrink: 0 }}>
                <path d="M1 4 C4 1, 8 1, 8 1 C8 1, 12 1, 15 4" stroke="#C4785A" strokeWidth=".8" strokeOpacity=".4" fill="none" />
              </svg>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(196,120,90,.2),transparent)' }} />
            </div>
<DeleteAccountButton />
            <button
              className="boho-signout"
              onClick={() => window.location.href = '/login'}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '9px 14px', borderRadius: 10,
                background: 'rgba(200,60,40,.05)',
                border: '1px solid rgba(200,60,40,.18)',
                color: 'rgba(180,60,40,.65)',
                fontFamily: "'Playfair Display', serif", fontSize: 9, fontWeight: 600,
                letterSpacing: '.14em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}>
              <SignOutIcon />
              Ieșire
            </button>

            <p style={{ fontFamily: "'Lora', serif", fontSize: 7, letterSpacing: '.14em', fontStyle: 'italic', textTransform: 'uppercase', color: 'rgba(196,120,90,.25)', textAlign: 'center', marginTop: 14 }}>
              VibeInvite © 2026
            </p>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.2),transparent)' }} />
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="boho-main">
          <div style={{ position: 'fixed', top: 0, right: 0, width: 'min(120px,12vw)', height: 'min(120px,12vw)', opacity: .2, pointerEvents: 'none', zIndex: 4 }}>
            <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
              <path d="M8 8 C8 8, 60 20, 80 80 C100 140, 120 155, 155 155" stroke="url(#bg2)" strokeWidth="1" fill="none" />
              <path d="M8 30 C8 30, 45 40, 60 80 C75 120, 90 140, 130 155" stroke="url(#bg2)" strokeWidth=".6" strokeOpacity=".5" fill="none" />
              <circle cx="8" cy="8" r="4" fill="url(#bg2)" fillOpacity=".6" />
              <defs>
                <linearGradient id="bg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C4785A" />
                  <stop offset="100%" stopColor="#C4785A" stopOpacity=".1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ animation: 'boho-fade-in .5s ease both', position: 'relative', zIndex: 5, width: '100%' }}>
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
        <nav className="boho-tablet-nav" style={{
          position: 'fixed', top: 56, left: 0, right: 0, zIndex: 150,
          height: 48,
          background: 'rgba(253,246,239,.97)',
          borderBottom: '1px solid rgba(196,120,90,.15)',
          backdropFilter: 'blur(16px)',
          alignItems: 'stretch',
          display: 'none',
          padding: '0 12px', gap: 4,
          overflowX: 'auto',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`boho-tab ${activeTab === tab.id ? 'boho-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '0 14px', flexShrink: 0,
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: 8,
                color: activeTab === tab.id ? '#C4785A' : 'rgba(122,74,53,.45)',
                cursor: 'pointer',
                fontFamily: "'Playfair Display', serif",
                fontSize: 9, fontWeight: 600, letterSpacing: '.08em',
                whiteSpace: 'nowrap',
              }}>
              <span style={{ opacity: activeTab === tab.id ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C4785A', boxShadow: '0 0 5px rgba(196,120,90,.5)', marginLeft: 2, flexShrink: 0 }} />
              )}
            </button>
          ))}
        </nav>

        {/* ══ PHONE BOTTOM NAV ══ */}
        <nav className="boho-mobile-nav" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
          minHeight: 68,
          background: 'rgba(253,246,239,.98)',
          borderTop: '1px solid rgba(196,120,90,.18)',
          backdropFilter: 'blur(20px)',
          display: 'none',
          alignItems: 'flex-start',
          justifyContent: 'stretch',
          boxShadow: '0 -6px 28px rgba(196,120,90,.1)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.28),transparent)' }} />
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="boho-mobile-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderTop: activeTab === tab.id ? '2px solid #C4785A' : '2px solid transparent',
                color: activeTab === tab.id ? '#C4785A' : 'rgba(122,74,53,.4)',
                padding: '10px 4px 8px',
                minWidth: 0,
                minHeight: 56,
              }}>
              <span style={{ transition: 'transform .2s', transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)', flexShrink: 0 }}>
                {tab.icon}
              </span>
              <span style={{
                fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.06em',
                textTransform: 'uppercase', fontWeight: 600,
                color: activeTab === tab.id ? '#C4785A' : 'rgba(122,74,53,.35)',
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
