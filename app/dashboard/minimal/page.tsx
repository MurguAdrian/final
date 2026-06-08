// FIȘIER: andre/app/dashboard/minimal/page.tsx
// MODIFICĂRI FAȚĂ DE ROMANTIC:
//   - Import tokens: romanticTokens → minimalTokens
//   - Culori: toate rgba(196,80,106,...) / rgba(166,50,72,...) / C.rose / C.crimson → echivalente charcoal/gri
//   - Fonturi: Google Fonts import Playfair+Cormorant+Cinzel+Lato → Plus Jakarta Sans+DM Sans+Spectral

"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { SummarySection }     from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection }        from './components/MenuSection';
import { PhotosSection }      from './components/PhotosSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';
import {
  C, F, FS, SP, BR, IS, SH, LY, GR, KEYFRAMES,
} from './minimalTokens';

const FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Spectral:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');`;

const GLOBAL_CSS = `
${FONTS_IMPORT}
${KEYFRAMES}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  touch-action: manipulation;
}

body {
  height: 100%;
  font-family: ${F.ui};
  background: ${C.cream};
  color: ${C.text};
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

input, textarea, select {
  font-size: ${FS.input}px !important;
  -webkit-text-size-adjust: 100%;
}

img, svg { max-width: 100%; }

.rm-app-shell {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background: ${C.cream};
  z-index: 0;
}

.rm-sidebar {
  width: ${LY.sidebarWidth}px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
}

.rm-main {
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  touch-action: pan-y;
  position: relative;
  z-index: 5;
  background: ${C.cream};
  padding: ${SP.mainPad} ${SP.mainPadH};
  scroll-behavior: smooth;
}

.rm-mobile-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  height: ${LY.mobileHeaderH}px;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  background: rgba(255,255,255,0.97);
  border-bottom: 1px solid ${C.borderLight};
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  gap: 8px;
  will-change: transform;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.rm-tablet-nav {
  position: fixed;
  top: ${LY.mobileHeaderH}px;
  left: 0; right: 0;
  z-index: 150;
  height: ${LY.tabletNavH}px;
  background: rgba(255,255,255,0.97);
  border-bottom: 1px solid rgba(26,26,26,0.08);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  display: none;
  align-items: stretch;
  padding: 0 12px;
  gap: 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.rm-mobile-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 200;
  min-height: ${LY.mobileNavH}px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  height: calc(${LY.mobileNavH}px + env(safe-area-inset-bottom, 0px));
  background: rgba(255,255,255,0.98);
  border-top: 1px solid ${C.borderLight};
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  box-shadow: 0 -4px 30px rgba(0,0,0,0.06);
  display: none;
  align-items: flex-start;
  justify-content: stretch;
  will-change: transform;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

@media (max-width: ${LY.bpTablet}px) {
  .rm-sidebar       { display: none !important; }
  .rm-mobile-header { display: flex !important; }
  .rm-tablet-nav    { display: flex !important; }
  .rm-main {
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

.rm-tab {
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.rm-tab:hover {
  background: rgba(26,26,26,0.05) !important;
  color: ${C.rose} !important;
}
.rm-tab-active {
  background: linear-gradient(135deg, rgba(26,26,26,0.08) 0%, rgba(26,26,26,0.03) 100%) !important;
  color: ${C.crimson} !important;
  border-color: rgba(26,26,26,0.2) !important;
}

.rm-signout { transition: background 0.2s, border-color 0.2s, color 0.2s; }
.rm-signout:hover {
  background: rgba(255,60,60,0.1) !important;
  border-color: rgba(255,80,80,0.45) !important;
  color: #e05555 !important;
}

.rm-mobile-tab { transition: color 0.2s, background 0.2s; }
.rm-mobile-tab:hover { background: rgba(26,26,26,0.04) !important; }

@media (max-width: 600px) {
  .share-label { display: none; }
  .rm-share-btn { padding: 10px 12px !important; }
}
`;

const SignOutIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}>
    <path
      d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const MinimalLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 32, height: 32, margin: '0 auto' }}>
    <rect x="3" y="3" width="8" height="8" rx="1" fill={C.rose} fillOpacity=".85" />
    <rect x="13" y="3" width="8" height="8" rx="1" fill={C.rose} fillOpacity=".4" />
    <rect x="3" y="13" width="8" height="8" rx="1" fill={C.rose} fillOpacity=".4" />
    <rect x="13" y="13" width="8" height="8" rx="1" fill={C.rose} fillOpacity=".15" />
  </svg>
);

const MinimalIcon = ({ size = IS.md, color = C.rose }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, flexShrink: 0 }}>
    <rect x="3" y="3" width="8" height="8" rx="1" fill={color} fillOpacity=".9" />
    <rect x="13" y="3" width="8" height="8" rx="1" fill={color} fillOpacity=".45" />
    <rect x="3" y="13" width="8" height="8" rx="1" fill={color} fillOpacity=".45" />
    <rect x="13" y="13" width="8" height="8" rx="1" fill={color} fillOpacity=".2" />
  </svg>
);

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

const LoadingScreen = () => (
  <>
    <style>{`
      ${FONTS_IMPORT}
      ${KEYFRAMES}
      html, body { height: 100%; overflow: hidden; }
    `}</style>
    <div style={{
      position: 'fixed',
      inset: 0,
      background: C.cream,
      color: C.crimson,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SP.lg,
      zIndex: 9999,
    }}>
      <div style={{
        width: 36, height: 36,
        border: `1.5px solid rgba(26,26,26,0.15)`,
        borderTopColor: C.rose,
        borderRadius: '50%',
        animation: 'rm-spin 1s linear infinite',
      }} />
      <span style={{
        fontFamily: F.heading,
        fontSize: FS.sm,
        letterSpacing: '.32em',
        textTransform: 'uppercase' as const,
        color: 'rgba(26,26,26,0.45)',
      }}>Se încarcă...</span>
    </div>
  </>
);

const PulseDot = ({ active }: { active: boolean }) => (
  <div style={{
    width: active ? 6 : 5,
    height: active ? 6 : 5,
    borderRadius: '50%',
    flexShrink: 0,
    background: active ? C.rose : '#ffa500',
    boxShadow: `0 0 ${active ? 8 : 6}px ${active ? 'rgba(26,26,26,0.5)' : 'rgba(255,165,0,0.6)'}`,
    animation: 'rm-pulse 2s ease-in-out infinite',
  }} />
);

export default function MinimalDashboard() {
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

  if (loading) return <LoadingScreen />;

  const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
  const currentOrderId    = weddingData?.order_id || weddingData?.id;

  const StatusBadge = ({ compact = false }: { compact?: boolean }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: SP.xs,
      padding: compact ? '4px 9px' : undefined,
      borderRadius: compact ? BR.pill : undefined,
      background: compact
        ? (isProfileComplete ? 'rgba(26,26,26,0.06)' : 'rgba(255,165,0,0.08)')
        : undefined,
      border: compact
        ? `1px solid ${isProfileComplete ? 'rgba(26,26,26,0.18)' : 'rgba(255,165,0,0.25)'}`
        : undefined,
      fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.12em',
      color: isProfileComplete ? 'rgba(26,26,26,0.7)' : 'rgba(255,165,0,0.8)',
      whiteSpace: 'nowrap' as const,
    }}>
      <PulseDot active={isProfileComplete} />
      {isProfileComplete ? 'LIVE' : 'SETUP'}
    </div>
  );

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
            color: isActive ? C.rose : 'rgba(26,26,26,0.3)',
            padding: '10px 4px 8px',
            minWidth: 0, minHeight: 56,
          }}>
          <span style={{ transition: 'transform .2s', transform: isActive ? 'scale(1.15)' : 'scale(1)', flexShrink: 0 }}>
            {tab.icon}
          </span>
          <span style={{
            fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.08em',
            textTransform: 'uppercase' as const, fontWeight: 600,
            color: isActive ? C.rose : 'rgba(26,26,26,0.25)',
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
            color: isActive ? C.crimson : 'rgba(26,26,26,0.4)',
            cursor: 'pointer', fontFamily: F.heading,
            fontSize: FS.tiny, fontWeight: 600, letterSpacing: '.1em',
            whiteSpace: 'nowrap' as const,
          }}>
          <span style={{ opacity: isActive ? 1 : .65, flexShrink: 0 }}>{tab.icon}</span>
          {tab.label}
          {isActive && (
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.rose, boxShadow: '0 0 6px rgba(26,26,26,0.35)', marginLeft: 2, flexShrink: 0 }} />
          )}
        </button>
      );
    }

    return (
      <button
        className={`rm-tab ${isActive ? 'rm-tab-active' : ''}`}
        onClick={() => setActiveTab(tab.id)}
        style={{
          width: '100%', padding: `11px 14px`,
          display: 'flex', alignItems: 'center', gap: 11,
          background: 'transparent', border: '1px solid transparent', borderRadius: BR.lg,
          color: isActive ? C.crimson : 'rgba(26,26,26,0.4)',
          cursor: 'pointer', textAlign: 'left' as const,
          fontFamily: F.heading, fontSize: FS.sm, fontWeight: 600, letterSpacing: '.1em',
        }}>
        <span style={{ opacity: isActive ? 1 : .7, flexShrink: 0 }}>{tab.icon}</span>
        {tab.label}
        {isActive && (
          <div style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: C.rose, boxShadow: '0 0 8px rgba(26,26,26,0.3)', flexShrink: 0 }} />
        )}
      </button>
    );
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div id="modal-root" style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, pointerEvents: 'none' }} />

      <div className="rm-app-shell">

        <div style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 0,
          background: GR.bgAtmosphere,
        }} />

        <header className="rm-mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <MinimalIcon size={18} color={C.rose} />
            <span style={{ fontFamily: F.heading, fontSize: FS.base, fontWeight: 600, letterSpacing: '.2em', color: C.crimson }}>
              VIBE<span style={{ color: 'rgba(26,26,26,0.35)' }}>INVITE</span>
            </span>
          </div>

          <span style={{
            fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic',
            color: 'rgba(26,26,26,0.4)', flex: 1, textAlign: 'center',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            padding: '0 6px',
          }}>
            {TAB_LABELS[activeTab]}
          </span>

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

        <aside className="rm-sidebar" style={{
          background: GR.sidebar,
          borderRight: `1px solid ${C.borderLight}`,
          flexDirection: 'column',
          padding: `${SP.xxxl}px 0`,
          position: 'relative', zIndex: 10,
          boxShadow: SH.sidebar,
          display: 'flex',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg,transparent,rgba(26,26,26,0.15),transparent)` }} />

          <div style={{ textAlign: 'center', padding: `0 ${SP.xl}px ${SP.xxl}px`, borderBottom: `1px solid ${C.borderFaint}` }}>
            <div style={{ marginBottom: SP.sm }}>
              <MinimalLogo />
            </div>
            <h1 style={{ fontFamily: F.heading, fontSize: FS.md, fontWeight: 600, letterSpacing: '.28em', color: C.crimson, margin: `0 0 ${SP.xs}px` }}>
              VIBE<span style={{ color: 'rgba(26,26,26,0.3)' }}>INVITE</span>
            </h1>
            <span style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: 'rgba(26,26,26,0.3)' }}>
              Minimal Edition
            </span>
          </div>

          <nav style={{ flex: 1, padding: `18px 14px`, display: 'flex', flexDirection: 'column', gap: SP.xs }}>
            <p style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.28em', textTransform: 'uppercase' as const, color: 'rgba(26,26,26,0.25)', padding: `0 10px`, marginBottom: SP.sm }}>
              Navigare
            </p>
            {TABS.map(tab => <TabButton key={tab.id} tab={tab} variant="sidebar" />)}
          </nav>

          <div style={{ padding: `0 14px` }}>
            <div style={{
              padding: `12px 14px`, marginBottom: SP.sm,
              background: isProfileComplete ? 'rgba(26,26,26,0.03)' : 'rgba(255,140,0,0.05)',
              border: `1px solid ${isProfileComplete ? 'rgba(26,26,26,0.12)' : 'rgba(255,140,0,0.22)'}`,
              borderRadius: BR.lg, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isProfileComplete ? 'rgba(26,26,26,0.2)' : 'rgba(255,140,0,0.28)'},transparent)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isProfileComplete ? 7 : 0 }}>
                <PulseDot active={isProfileComplete} />
                <span style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: isProfileComplete ? 'rgba(26,26,26,0.65)' : 'rgba(255,165,0,0.8)' }}>
                  {isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}
                </span>
              </div>
              {isProfileComplete && (
                <p style={{ fontFamily: F.body, fontSize: FS.base, fontStyle: 'italic', color: 'rgba(26,26,26,0.4)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                  www.vibeinvite.ro/invitatie/minimal/<strong style={{ color: 'rgba(26,26,26,0.7)', fontStyle: 'normal' }}>{weddingData.custom_slug}</strong>
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: SP.sm }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(26,26,26,0.1))` }} />
              <div style={{ width: 4, height: 4, background: 'rgba(26,26,26,0.2)', transform: 'rotate(45deg)', margin: `0 6px` }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(26,26,26,0.1),transparent)` }} />
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

            <p style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'rgba(26,26,26,0.18)', textAlign: 'center', marginTop: 14 }}>
              VibeInvite © 2026
            </p>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg,transparent,rgba(26,26,26,0.12),transparent)` }} />
        </aside>

        <main className="rm-main">
          <div style={{
            position: 'fixed', top: 0, right: 0,
            width: 'min(120px,12vw)', height: 'min(120px,12vw)',
            opacity: .12, pointerEvents: 'none', zIndex: 4,
          }}>
            <svg viewBox="0 0 160 160" fill="none" style={{ transform: 'scale(-1,1)', width: '100%', height: '100%' }}>
              <path d="M8 8 L8 120 M8 8 L120 8" stroke="rgba(26,26,26,0.5)" strokeWidth="1.2" />
              <path d="M18 18 L18 100 M18 18 L100 18" stroke="rgba(26,26,26,0.3)" strokeWidth=".7" />
              <ellipse cx="8" cy="8" rx="6" ry="6" fill="rgba(26,26,26,0.2)" />
            </svg>
          </div>

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

        <nav className="rm-tablet-nav">
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(26,26,26,0.08),transparent)' }} />
          {TABS.map(tab => <TabButton key={tab.id} tab={tab} variant="tablet" />)}
        </nav>

        <nav className="rm-mobile-nav">
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,rgba(26,26,26,0.15),transparent)` }} />
          {TABS.map(tab => <TabButton key={tab.id} tab={tab} variant="mobile" />)}
        </nav>

      </div>
    </>
  );
}