
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SummarySection      from './components/SummarySection';
import PersonalizeSection  from './components/PersonalizeSection';
import { DeleteAccountButton } from './components/DeleteAccountButton';
import { C, F, FS, SP, BR, LY, GR, SH, KEYFRAMES, FONTS_IMPORT } from './baloaneTokens';

const GCSS = `
  ${FONTS_IMPORT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { height: 100%; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
  body { height: 100%; overflow: hidden; }
  input, select, textarea { font-size: ${FS.input}px !important; font-family: ${F.mono}; }
  ${KEYFRAMES}
  ::selection { background: rgba(124,107,196,.35); color: ${C.text}; }
  .ast-input { transition: border-color .2s, box-shadow .2s; }
  .ast-input:focus { border-color: rgba(244,216,126,.55) !important; box-shadow: ${SH.glow}; outline: none; }
  .ast-ghost:hover { border-color: rgba(156,182,232,.4) !important; color: ${C.text} !important; }
  .ast-tab { transition: color .18s, border-color .18s; }
  .ast-tab:hover { color: ${C.gold} !important; }
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
    border-bottom: 1px solid ${C.border};
    box-shadow: ${SH.header};
  }

  .ast-invite-banner {
    flex-shrink: 0;
    background: ${GR.btnGhost};
    border-bottom: 1px solid ${C.borderAccent};
    padding: ${SP.sm}px ${SP.mainPadH};
    display: flex; align-items: center;
    flex-wrap: wrap; gap: ${SP.sm}px;
  }

  .ast-tab-bar {
    flex-shrink: 0;
    background: rgba(14,15,35,.5);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid ${C.border};
    padding: 0 ${SP.mainPadH};
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
    box-shadow: 0 6px 22px rgba(88,72,160,.4);
    transition: transform .2s, box-shadow .2s; flex-shrink: 0;
  }
  .ast-copy-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(88,72,160,.55); }

  .ast-open-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: ${SP.sm}px; padding: ${SP.xs + 2}px ${SP.lg - 2}px;
    border-radius: ${BR.pill}px;
    background: ${GR.btnGhost}; color: ${C.text};
    font-family: ${F.ui};
    font-size: ${FS.xs}px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    border: 1px solid ${C.borderAccent};
    cursor: pointer; text-decoration: none; flex-shrink: 0;
    transition: background .2s, border-color .2s;
  }
  .ast-open-btn:hover { background: rgba(124,107,196,.28); border-color: rgba(124,107,196,.5); }

  @media (max-width: ${LY.bpMobile}px) {
    .ast-invite-banner { flex-direction: column; align-items: flex-start; }
    .ast-invite-link   { max-width: 100%; }
    .ast-copy-btn, .ast-open-btn { width: 100%; }
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
      <div style={{ fontSize: FS.xxl * 2, display: 'inline-block', animation: 'ast-spin 2s linear infinite' }}>🚀</div>
      <p style={{ fontFamily: F.ui, fontSize: FS.xs, letterSpacing: '.22em', textTransform: 'uppercase', color: C.textMuted }}>
        Se încarcă misiunea...
      </p>
    </div>
  </>
);

export default function BaloaneDashboard() {
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
  const inviteLink     = customSlug ? `https://www.vibeinvite.ro/invitatie/baloane/${customSlug}` : '';

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
            <span style={{ fontSize: SP.xl, flexShrink: 0 }}>🚀</span>
            <span style={{
              fontFamily: F.ui, fontSize: FS.base, fontWeight: 700,
              letterSpacing: '.1em', textTransform: 'uppercase',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              color: C.text,
            }}>
              Vibe<span style={{ color: C.accent }}>Invite</span>
              <span style={{ color: C.textMuted, fontWeight: 400, fontSize: FS.tiny, marginLeft: SP.sm }}>Baloane</span>
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
            <span style={{
              fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.2em',
              textTransform: 'uppercase', color: C.textMuted, flexShrink: 0,
            }}>
              🔗 Link invitație
            </span>
            <span className="ast-invite-link" style={{
              fontFamily: F.mono, fontSize: FS.sm, color: C.gold,
              flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {inviteLink}
            </span>
            <button onClick={copy} className="ast-copy-btn">
              {copied ? '✓ Copiat!' : 'Copiează'}
            </button>
            <a href={inviteLink} target="_blank" rel="noopener noreferrer" className="ast-open-btn">
              Deschide ↗
            </a>
          </div>
        )}

        {/* TAB BAR */}
        <div className="ast-tab-bar">
          <div style={{ maxWidth: LY.maxContent, margin: '0 auto', display: 'flex' }}>
            {([
              { key: 'summary',     label: '📊 Sumar' },
              { key: 'personalize', label: '⚙️ Personalizare' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                className="ast-tab"
                onClick={() => setTab(key)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: `clamp(${SP.md}px,2vw,${SP.lg}px) clamp(${SP.md}px,2.5vw,22px)`,
                  fontFamily: F.ui, fontSize: FS.xs, fontWeight: 700,
                  letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  color: tab === key ? C.gold : C.textMuted,
                  borderBottom: `2px solid ${tab === key ? C.gold : 'transparent'}`,
                }}
              >
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
