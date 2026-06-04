"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { SummarySection }     from './components/SummarySection';
import { PersonalizeSection } from './components/PersonalizeSection';
import { MenuSection }        from './components/MenuSection';
import { PhotosSection }      from './components/PhotosSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';

/* ── Design tokens – module-level (nu se recreează la fiecare render) ── */
const ACCENT = '#C8503A';
const DARK   = '#111111';
const MID    = '#555555';
const LIGHT  = '#AAAAAA';
const RULE   = '#E2E2E2';
const BG     = '#F7F4F0';

/* ── Tab config – module-level (SVG-urile sunt statice, nu au nevoie de closure) ── */
const TABS = [
  {
    id: 'summary', label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
        <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: 'personalize', label: 'Personalizare',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
        <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'menu', label: 'Meniu',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
        <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
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

const TAB_LABELS: Record<string, string> = {
  summary:     'Dashboard',
  personalize: 'Personalizare',
  menu:        'Meniu Nuntă',
  photos:      'Galerie Poze',
};

/* ── Shared icon ── */
const SignOutIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
    <path d="M13 15l4-5-4-5M17 10H7M10 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ════════════════════════════════════════ DASHBOARD ══ */
export default function MinimalDashboard() {
  const [activeTab, setActiveTab]   = useState('summary');
  const [loading, setLoading]       = useState(true);
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

  /* ── Loading screen ── */
  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');
        @keyframes mn-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
      <div style={{ background: BG, height: '100dvh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ width: 32, height: 32, border: '1.5px solid rgba(17,17,17,.15)', borderTopColor: ACCENT, borderRadius: '50%', animation: 'mn-spin 1s linear infinite' }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: LIGHT }}>
          Se încarcă...
        </span>
      </div>
    </>
  );

  const isProfileComplete = !!(weddingData?.bride_name && weddingData?.custom_slug);
  const currentOrderId    = weddingData?.order_id || weddingData?.id;

  /* ══ RENDER ══ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html {
          height: 100%;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
        }
        body {
          height: 100%;
          overscroll-behavior: none;
          font-family: 'DM Sans', sans-serif;
          background: ${BG};
          color: ${DARK};
          -webkit-font-smoothing: antialiased;
          overflow: hidden;
        }

        @keyframes mn-spin    { from { transform: rotate(0deg)  } to { transform: rotate(360deg) } }
        @keyframes mn-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes mn-pulse   { 0%,100% { opacity: 1 } 50% { opacity: .4 } }

        /* Tab states */
        .mn-tab            { transition: background .2s, color .2s, border-color .2s; }
        .mn-tab:hover      { background: rgba(200,80,58,.07) !important; color: ${ACCENT} !important; }
        .mn-tab-active     { background: #fff !important; color: ${DARK} !important; border-left: 3px solid ${ACCENT} !important; }

        /* Sign-out button */
        .mn-signout        { transition: background .2s, border-color .2s, color .2s; }
        .mn-signout:hover  { background: rgba(200,80,58,.08) !important; border-color: rgba(200,80,58,.4) !important; color: ${ACCENT} !important; }

        /* Mobile tab */
        .mn-mobile-tab       { transition: color .2s, background .2s; }
        .mn-mobile-tab:hover { background: rgba(200,80,58,.06) !important; }

        /* ── Layout ── */
        .mn-app-shell {
          position: fixed; top: 0; left: 0;
          width: 100%; height: 100dvh;
          display: flex; background: ${BG}; overflow: hidden;
        }

        .mn-sidebar       { display: flex !important; }
        .mn-mobile-header { display: none !important; }
        .mn-mobile-nav    { display: none !important; }
        .mn-tablet-nav    { display: none !important; }

        .mn-main {
          flex: 1; height: 100dvh;
          overflow-y: auto; overflow-x: hidden;
          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: auto;
          padding: clamp(28px,4vw,52px) clamp(20px,4vw,64px);
          position: relative; z-index: 5;
        }

        /* Tablet (768–1023) */
        @media (max-width: 1023px) {
          .mn-sidebar       { display: none !important; }
          .mn-mobile-header { display: flex !important; }
          .mn-tablet-nav    { display: flex !important; }
          .mn-main {
            padding-top: 116px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-bottom: 40px !important;
          }
        }

        /* Phone (< 768) */
        @media (max-width: 767px) {
          .mn-tablet-nav { display: none !important; }
          .mn-mobile-nav { display: flex !important; }
          .mn-main {
            padding-top: 72px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 20px) !important;
            height: 100dvh !important;
          }
        }

        @media (max-width: 379px) {
          .mn-main { padding-left: 8px !important; padding-right: 8px !important; }
        }

        .mn-main > * { max-width: 100%; box-sizing: border-box; }
        img, svg     { max-width: 100%; }

        .mn-mobile-nav {
          padding-bottom: env(safe-area-inset-bottom, 0px) !important;
          height: calc(68px + env(safe-area-inset-bottom, 0px)) !important;
        }

        /* iOS: prevent zoom on input focus */
        input, textarea, select { font-size: 16px !important; }
      `}</style>
{/* PORTAL TARGET */}
        <div id="modal-root" style={{ position: 'fixed', top: 0, left: 0, zIndex: 999999, pointerEvents: 'none' }} />
      <div className="mn-app-shell">

        {/* BG subtle radial */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, background: `radial-gradient(ellipse 60% 50% at 80% 20%, rgba(200,80,58,.04) 0%, transparent 60%)` }} />

        {/* ══ MOBILE / TABLET HEADER (≤ 1023px) ══ */}
        <header
          className="mn-mobile-header"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 56, display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', background: `rgba(247,244,240,.97)`, borderBottom: `1px solid ${RULE}`, backdropFilter: 'blur(12px)', gap: 8 }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{ width: 4, height: 24, background: ACCENT }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: DARK }}>
              Vibe<span style={{ fontWeight: 300, color: MID }}>Invite</span>
            </span>
          </div>

          {/* Current tab label */}
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontStyle: 'italic', color: LIGHT, flex: 1, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 6px' }}>
            {TAB_LABELS[activeTab]}
          </span>

          {/* Status + sign-out */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', border: `1px solid ${isProfileComplete ? RULE : 'rgba(200,80,58,.3)'}`, fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color: isProfileComplete ? MID : ACCENT, whiteSpace: 'nowrap', background: '#fff' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: isProfileComplete ? '#5a9a6a' : ACCENT, animation: 'mn-pulse 2s ease-in-out infinite' }} />
              {isProfileComplete ? 'LIVE' : 'SETUP'}
            </div>
            <DeleteAccountButton />
            <button
              className="mn-signout"
              onClick={() => window.location.href = '/login'}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', background: '#fff', border: `1px solid ${RULE}`, color: MID, fontFamily: "'DM Sans', sans-serif", fontSize: 8, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <SignOutIcon />
              <span>Ieșire</span>
            </button>
          </div>
        </header>

        {/* ══ DESKTOP SIDEBAR (≥ 1024px) ══ */}
        <aside
          className="mn-sidebar"
          style={{ width: 240, flexShrink: 0, background: '#fff', borderRight: `1px solid ${RULE}`, flexDirection: 'column', padding: '28px 0', position: 'relative', zIndex: 10, boxShadow: '2px 0 16px rgba(0,0,0,.04)' }}
        >
          {/* Accent strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: ACCENT }} />

          {/* Logo */}
          <div style={{ padding: '0 24px 24px 28px', borderBottom: `1px solid ${RULE}` }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, marginBottom: 4 }}>
              Minimal · Dashboard
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: DARK, lineHeight: 1.1 }}>
              Vibe<span style={{ fontWeight: 300, color: MID }}>Invite</span>
            </h1>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: LIGHT, padding: '0 10px', marginBottom: 8 }}>
              Navigare
            </p>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`mn-tab ${activeTab === tab.id ? 'mn-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: '1px solid transparent', borderLeft: activeTab === tab.id ? `3px solid ${ACCENT}` : '3px solid transparent', color: activeTab === tab.id ? DARK : MID, cursor: 'pointer', textAlign: 'left', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '.04em' }}
              >
                <span style={{ flexShrink: 0 }}>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div style={{ marginLeft: 'auto', width: 5, height: 5, background: ACCENT, flexShrink: 0 }} />
                )}
              </button>
            ))}
          </nav>

          {/* Status + logout */}
          <div style={{ padding: '0 14px' }}>
            <div style={{ padding: '12px 14px', marginBottom: 10, background: BG, border: `1px solid ${isProfileComplete ? RULE : 'rgba(200,80,58,.3)'}`, borderLeft: `3px solid ${isProfileComplete ? '#5a9a6a' : ACCENT}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: isProfileComplete ? 6 : 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: isProfileComplete ? '#5a9a6a' : ACCENT, animation: 'mn-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase', color: isProfileComplete ? '#5a9a6a' : ACCENT }}>
                  {isProfileComplete ? 'Link Activ' : 'Configurare Necesară'}
                </span>
              </div>
              {isProfileComplete && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: LIGHT, wordBreak: 'break-all', lineHeight: 1.5 }}>
                  www.vibeinvite.ro/…/<strong style={{ color: MID }}>{weddingData.custom_slug}</strong>
                </p>
              )}
            </div>

            <div style={{ height: 1, background: RULE, marginBottom: 10 }} />
<DeleteAccountButton />
            <button
              className="mn-signout"
              onClick={() => window.location.href = '/login'}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '9px 14px', background: BG, border: `1px solid ${RULE}`, color: MID, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              <SignOutIcon />
              Ieșire
            </button>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase', color: '#DDDDDD', textAlign: 'center', marginTop: 14 }}>
              VibeInvite · Tema Minimal © 2026
            </p>
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="mn-main">
          <div style={{ animation: 'mn-fade-in .5s ease both', position: 'relative', zIndex: 5, width: '100%' }}>
            {activeTab === 'summary' && <SummarySection isComplete={isProfileComplete} />}
            {activeTab === 'personalize' && (
              <PersonalizeSection initialData={weddingData} orderId={currentOrderId} onSave={refreshData} />
            )}
            {activeTab === 'menu' && (
              <MenuSection initialData={weddingData} orderId={currentOrderId} onSave={refreshData} />
            )}
            {activeTab === 'photos' && (
              <PhotosSection initialData={weddingData} orderId={currentOrderId} onSave={refreshData} />
            )}
          </div>
        </main>

        {/* ══ TABLET HORIZONTAL NAV (768–1023px) ══ */}
        <nav
          className="mn-tablet-nav"
          style={{ position: 'fixed', top: 56, left: 0, right: 0, zIndex: 150, height: 48, background: `rgba(247,244,240,.97)`, borderBottom: `1px solid ${RULE}`, backdropFilter: 'blur(12px)', alignItems: 'stretch', display: 'none', padding: '0 12px', gap: 4, overflowX: 'auto' }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`mn-tab ${activeTab === tab.id ? 'mn-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 14px', flexShrink: 0, background: 'transparent', border: 'none', borderBottom: activeTab === tab.id ? `2px solid ${ACCENT}` : '2px solid transparent', color: activeTab === tab.id ? DARK : MID, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '.04em', whiteSpace: 'nowrap' }}
            >
              <span style={{ flexShrink: 0 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ══ PHONE BOTTOM NAV (< 768px) ══ */}
        <nav
          className="mn-mobile-nav"
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, minHeight: 68, background: `rgba(247,244,240,.98)`, borderTop: `1px solid ${RULE}`, backdropFilter: 'blur(12px)', display: 'none', alignItems: 'flex-start', justifyContent: 'stretch', boxShadow: '0 -4px 20px rgba(0,0,0,.06)' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${ACCENT},#E8C4B8,transparent)`, opacity: .5 }} />
          {TABS.map(tab => (
            <button
              key={tab.id}
              className="mn-mobile-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', borderTop: activeTab === tab.id ? `2px solid ${ACCENT}` : '2px solid transparent', color: activeTab === tab.id ? ACCENT : LIGHT, padding: '10px 4px 8px', minWidth: 0, minHeight: 56 }}
            >
              <span style={{ transition: 'transform .2s', transform: activeTab === tab.id ? 'scale(1.1)' : 'scale(1)', flexShrink: 0 }}>
                {tab.icon}
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, color: activeTab === tab.id ? ACCENT : LIGHT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>

      </div>
    </>
  );
}
