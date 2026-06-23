"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SummarySection      from './components/SummarySection';
import PersonalizeSection  from './components/PersonalizeSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';
import { C, F, FS, SP, BR, LY, GR, SH, KEYFRAMES, FONTS_IMPORT } from './ursuletTokens';

const GCSS = `
  ${FONTS_IMPORT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { height: 100%; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
  body { height: 100%; overflow: hidden; }
  input, select, textarea { font-size: ${FS.input}px !important; font-family: ${F.mono}; }
  ${KEYFRAMES}
  ::selection { background: rgba(122,170,192,.25); color: ${C.text}; }
  .ast-input { transition: border-color .2s, box-shadow .2s; }
  .ast-input:focus { border-color: rgba(122,170,192,.55) !important; box-shadow: ${SH.glow}; outline: none; }
  .ast-ghost:hover { border-color: rgba(122,170,192,.4) !important; color: ${C.text} !important; }

  .ast-tab { transition: color .18s, border-color .18s, background .18s; }
  .ast-tab:hover:not(.ast-tab-active) {
    color: ${C.accentDark} !important;
    background: rgba(89,176,227,.06) !important;
  }
  .ast-tab-active {
    color: ${C.accentDark} !important;
    border-bottom-color: ${C.accent} !important;
    background: rgba(89,176,227,.06) !important;
  }

  .ast-signout { transition: all .2s; }
  .ast-signout:hover { background: rgba(255,60,60,.1) !important; border-color: rgba(255,80,80,.45) !important; color: #e05555 !important; }

  .ast-app-shell {
    position: fixed; inset: 0; width: 100%;
    height: 100dvh; height: 100vh;
    display: flex; flex-direction: column;
    overflow: hidden;
    background: ${GR.bg};
    z-index: 0;
  }

  .ast-header {
    position: relative; z-index: 50;
    height: 58px; flex-shrink: 0;
    display: flex; align-items: center;
    justify-content: space-between;
    gap: ${SP.md}px;
    padding: 0 ${SP.mainPadH};
    background: ${GR.header};
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(122,170,192,.16);
    box-shadow: ${SH.header};
  }

  .ast-invite-banner {
    flex-shrink: 0;
    background: rgba(255,255,255,.78);
    border-bottom: 1px solid rgba(122,170,192,.16);
    backdrop-filter: blur(10px);
    padding: 0 ${SP.mainPadH};
  }

  .ast-invite-inner {
    max-width: ${LY.maxContent}px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${SP.sm}px;
    padding: ${SP.sm + 2}px 0;
  }

  .ast-tab-bar {
    flex-shrink: 0;
    background: rgba(255,255,255,.70);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(215,190,168,.28);
  }

  .ast-tab-inner {
    max-width: ${LY.maxContent}px;
    margin: 0 auto;
    display: flex;
    padding: 0 ${SP.mainPadH};
    gap: 2px;
  }

  .ast-main {
    flex: 1; min-height: 0;
    overflow-y: auto; overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
    background: transparent;
  }

  .ast-main-inner {
    max-width: ${LY.maxContent}px;
    margin: 0 auto;
    padding: ${SP.mainPad} ${SP.mainPadH} 80px;
  }

  .ast-copy-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: ${SP.sm}px; padding: ${SP.xs + 2}px ${SP.lg - 2}px;
    border-radius: ${BR.pill}px;
    background: ${GR.btnPrimary};
    color: ${C.white}; font-family: ${F.ui};
    font-size: ${FS.xs}px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    border: none; cursor: pointer;
    box-shadow: 0 6px 22px rgba(106,66,41,.28);
    transition: transform .2s, box-shadow .2s; flex-shrink: 0;
  }
  .ast-copy-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(106,66,41,.42); }

  .ast-open-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: ${SP.sm}px; padding: ${SP.xs + 2}px ${SP.lg - 2}px;
    border-radius: ${BR.pill}px;
    background: rgba(89,176,227,.08); color: ${C.accentDark};
    font-family: ${F.ui};
    font-size: ${FS.xs}px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    border: 1px solid rgba(89,176,227,.28);
    cursor: pointer; text-decoration: none; flex-shrink: 0;
    transition: background .2s, border-color .2s;
  }
  .ast-open-btn:hover { background: rgba(89,176,227,.16); border-color: rgba(89,176,227,.45); }

  .ast-share-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: ${SP.sm}px; padding: ${SP.xs + 2}px ${SP.lg - 2}px;
    border-radius: ${BR.pill}px;
    background: rgba(227,168,89,.08); color: ${C.textMuted};
    font-family: ${F.ui};
    font-size: ${FS.xs}px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    border: 1px solid rgba(227,168,89,.28);
    cursor: pointer; flex-shrink: 0;
    transition: background .2s, border-color .2s, color .2s;
  }
  .ast-share-btn:hover { background: rgba(227,168,89,.16); border-color: rgba(227,168,89,.45); color: ${C.goldDim}; }

  @media (max-width: ${LY.bpMobile}px) {
    .ast-invite-inner { flex-direction: column; align-items: flex-start; }
    .ast-invite-link  { max-width: 100%; }
    .ast-copy-btn, .ast-open-btn, .ast-share-btn { width: 100%; }
  }
`;

const LoadingScreen = () => (
  <>
    <style>{GCSS}</style>
    <div style={{
      position: 'fixed', inset: 0, background: GR.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: SP.lg,
    }}>
      <div style={{ fontSize: FS.xxl * 2, display: 'inline-block', animation: 'ast-float-y 2s ease-in-out infinite' }}>🧸</div>
      <p style={{ fontFamily: F.ui, fontSize: FS.xs, letterSpacing: '.22em', textTransform: 'uppercase', color: C.textMuted }}>
        Se încarcă...
      </p>
    </div>
  </>
);

export default function UrsuletDashboard() {
  const router = useRouter();
  const [tab, setTab]                 = useState<'summary' | 'personalize'>('summary');
  const [loading, setLoading]         = useState(true);
  const [weddingData, setWeddingData] = useState<any>(null);
  const [copied, setCopied]           = useState(false);

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
      if (res.status === 401) { router.push('/login'); return; }
      if (res.ok) {
        const data = await res.json();
        setWeddingData(data.weddingDetails ?? null);
      }
    } catch (err) {
      console.error('Eroare la sincronizare:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { refreshData(); }, [refreshData]);

  if (loading) return <LoadingScreen />;

  const currentOrderId = weddingData?.order_id ?? weddingData?.id ?? null;
  const customSlug     = weddingData?.custom_slug ?? '';
  const inviteLink     = customSlug ? `https://www.vibeinvite.ro/invitatie/ursulet/${customSlug}` : '';

  const copy = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{GCSS}</style>

      <div className="ast-app-shell">

        {/* HEADER */}
        <header className="ast-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, minWidth: 0 }}>
            <span style={{ fontSize: SP.xl + 2, flexShrink: 0 }}>🧸</span>
            <span style={{
              fontFamily: F.ui, fontSize: FS.base, fontWeight: 700,
              letterSpacing: '.1em', textTransform: 'uppercase',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              color: C.text,
            }}>
              Vibe<span style={{ color: C.accent }}>Invite</span>
              <span style={{ color: C.textMuted, fontWeight: 400, fontSize: FS.tiny, marginLeft: SP.sm }}>ursulet</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flexShrink: 0 }}>
            <DeleteAccountButton />
            <button
              className="ast-signout"
              onClick={() => router.push('/login')}
              style={{
                background: 'rgba(255,60,60,.06)',
                border: '1px solid rgba(255,60,60,.2)',
                color: 'rgba(200,80,80,.75)',
                borderRadius: BR.pill,
                padding: `${SP.xs + 2}px ${SP.lg - 2}px`,
                fontFamily: F.ui, fontSize: FS.tiny, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Ieșire
            </button>
          </div>
        </header>

        {/* INVITE LINK BANNER */}
        {inviteLink && (
          <div className="ast-invite-banner">
            <div className="ast-invite-inner">
              <div style={{
                display: 'flex', alignItems: 'center', gap: SP.xs + 2,
                padding: `${SP.xs}px ${SP.md}px`,
                background: 'rgba(89,176,227,.08)',
                border: '1px solid rgba(89,176,227,.22)',
                borderRadius: BR.pill,
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 16 16" fill="none" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                  <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4" />
                  <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12" />
                </svg>
                <span style={{ fontFamily: F.ui, fontSize: FS.tiny, letterSpacing: '.14em', textTransform: 'uppercase', color: C.accent, fontWeight: 700 }}>
                  Link invitație
                </span>
              </div>

              <span className="ast-invite-link" style={{
                fontFamily: F.mono, fontSize: FS.sm, color: C.text,
                flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                fontWeight: 600,
              }}>
                {inviteLink}
              </span>

              <button onClick={copy} className="ast-copy-btn">
                {copied
                  ? <><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}><path d="M2 8l4 4 8-8" /></svg> Copiat!</>
                  : <><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}><rect x="4" y="4" width="9" height="9" rx="1.5" /><path d="M3 10V3a1 1 0 0 1 1-1h7" /></svg> Copiează</>
                }
              </button>

              <button className="ast-share-btn" onClick={() => { if (navigator.share && inviteLink) navigator.share({ url: inviteLink, title: 'Invitație Botez' }); }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
                  <circle cx="12" cy="3" r="1.5" /><circle cx="12" cy="13" r="1.5" /><circle cx="3" cy="8" r="1.5" />
                  <path d="M10.5 3.9L4.5 7.2M4.5 8.8l6 3.3" />
                </svg>
                Share
              </button>

              <a href={inviteLink} target="_blank" rel="noopener noreferrer" className="ast-open-btn">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
                  <path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" />
                  <path d="M10 2h4v4" /><path d="M14 2L8 8" />
                </svg>
                Deschide ↗
              </a>
            </div>
          </div>
        )}

        {/* TAB BAR */}
        <div className="ast-tab-bar">
          <div className="ast-tab-inner">
            {([
              { key: 'summary',     label: 'Sumar',         icon: '📊' },
              { key: 'personalize', label: 'Personalizare', icon: '⚙️' },
            ] as const).map(({ key, label, icon }) => (
              <button
                key={key}
                className={`ast-tab${tab === key ? ' ast-tab-active' : ''}`}
                onClick={() => setTab(key)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: `clamp(${SP.md}px,2vw,${SP.lg}px) clamp(${SP.md}px,2.5vw,22px)`,
                  fontFamily: F.ui, fontSize: FS.xs, fontWeight: 700,
                  letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  color: tab === key ? C.accentDark : C.textMuted,
                  borderBottom: `2.5px solid ${tab === key ? C.accent : 'transparent'}`,
                  display: 'flex', alignItems: 'center', gap: SP.xs + 2,
                  borderRadius: `${BR.sm}px ${BR.sm}px 0 0`,
                  marginBottom: -1,
                }}
              >
                <span style={{ fontSize: 14 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="ast-main">
          <div className="ast-main-inner">
            {tab === 'summary' && (
              <SummarySection key="summary" />
            )}
            {tab === 'personalize' && (
              <PersonalizeSection
                key="personalize"
                initialData={weddingData}
                orderId={currentOrderId}
                onSave={refreshData}
              />
            )}
          </div>
        </main>

      </div>
    </>
  );
}
