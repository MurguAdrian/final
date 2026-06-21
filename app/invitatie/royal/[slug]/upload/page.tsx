
"use client";
import React, { useState, useEffect } from 'react';

export default function UploadPage({ params }: { params: { slug: string } }) {
  const [agreed,      setAgreed]      = useState(false);
  const [uploading,   setUploading]   = useState(false);
  const [uploaded,    setUploaded]    = useState(false);
  const [orderId,     setOrderId]     = useState<number | null>(null);
  const [totalFiles,  setTotalFiles]  = useState(0);
  const [doneFiles,   setDoneFiles]   = useState(0);
  const [failedFiles, setFailedFiles] = useState(0);

  useEffect(() => {
    fetch(`/api/public/order-id?slug=${params.slug}`)
      .then(res => res.json())
      .then(data => setOrderId(data.orderId));
  }, [params.slug]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !orderId) return;
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setTotalFiles(files.length);
    setDoneFiles(0);
    setFailedFiles(0);
    setUploading(true);
    let failed = 0;
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId.toString());
      try {
        await fetch("/api/photos/upload", { method: "POST", body: formData });
      } catch {
        failed++;
        setFailedFiles(failed);
      }
      setDoneFiles(prev => prev + 1);
    }
    setUploading(false);
    setUploaded(true);
  };

  const progressPct  = totalFiles > 0 ? Math.round((doneFiles / totalFiles) * 100) : 0;
  const successCount = doneFiles - failedFiles;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html {
          height: 100%; min-height: 100dvh;
          background: #071220;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        body {
          font-family: 'Cormorant Garamond', serif;
          color: #E0EAF5;
          height: 100%; min-height: 100dvh;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        input, textarea, select { font-size: 16px !important; }

        .rup-page {
          position: fixed; inset: 0;
          width: 100%; height: 100dvh; height: 100vh;
          background: radial-gradient(ellipse 90% 80% at 50% 40%, #0B1929 0%, #071220 55%, #040D18 100%);
          display: flex; align-items: center; justify-content: center;
          overflow-y: auto; overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: none;
          padding: max(clamp(20px,4vw,40px), env(safe-area-inset-top))
                   max(clamp(16px,4vw,24px), env(safe-area-inset-right))
                   max(clamp(20px,4vw,40px), env(safe-area-inset-bottom))
                   max(clamp(16px,4vw,24px), env(safe-area-inset-left));
        }

        .rup-corner { position: fixed; pointer-events: none; z-index: 0; }
        .rup-corner.tl { top: 0; left: 0; }
        .rup-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
        .rup-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .rup-corner.br { bottom: 0; right: 0; transform: scale(-1); }
        .rup-line {
          position: fixed; left: 5%; right: 5%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,216,232,.2), transparent);
          pointer-events: none; z-index: 0;
        }
        .rup-line.top    { top: 8%; }
        .rup-line.bottom { bottom: 8%; }

        .rup-card {
          position: relative; z-index: 10;
          background: linear-gradient(170deg, #0F2040, #071220);
          border: 1px solid rgba(200,216,232,.22);
          border-radius: 20px;
          padding: clamp(32px,5vw,52px) clamp(24px,5vw,44px);
          max-width: 440px; width: 100%;
          box-shadow: 0 30px 80px rgba(4,18,40,.85), 0 0 40px rgba(124,168,216,.06);
          text-align: center;
          animation: rup-reveal .6s cubic-bezier(.4,0,.2,1) both;
          overflow: hidden;
        }
        .rup-card-top-line {
          position: absolute; top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,216,232,.45), transparent);
        }
        .rup-card-corner { position: absolute; width: 14px; height: 14px; border-color: rgba(200,216,232,.28); }
        .rup-card-corner.tl { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
        .rup-card-corner.tr { top: 10px; right: 10px; border-top: 1px solid; border-right: 1px solid; }
        .rup-card-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid; border-left: 1px solid; }
        .rup-card-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }

        .rup-camera-circle {
          width: clamp(64px,12vw,80px); height: clamp(64px,12vw,80px);
          border-radius: 50%;
          background: rgba(124,168,216,.1);
          border: 2px solid rgba(200,216,232,.26);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto clamp(16px,3vw,24px);
        }

        .rup-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: clamp(8px,1vw,10px);
          letter-spacing: .32em; text-transform: uppercase;
          color: rgba(200,216,232,.55); margin-bottom: 10px;
        }
        .rup-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px,4vw,34px);
          font-style: italic; font-weight: 300;
          color: #E8F0F8; margin-bottom: 10px; line-height: 1.2;
        }
        .rup-divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,216,232,.45), transparent);
          margin: 0 auto 18px;
        }
        .rup-desc {
          font-size: clamp(13px,1.6vw,16px);
          font-style: italic; color: rgba(200,216,232,.55);
          line-height: 1.8; margin-bottom: 24px;
        }

        .rup-consent-block {
          display: flex; align-items: flex-start; gap: 12px;
          background: rgba(124,168,216,.04);
          border: 1px solid rgba(200,216,232,.15);
          border-radius: 10px; padding: 14px 16px;
          margin-bottom: 24px; text-align: left;
          cursor: pointer; transition: border-color .2s, background .2s;
        }
        .rup-consent-block:hover { border-color: rgba(200,216,232,.3); background: rgba(124,168,216,.08); }
        .rup-consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #7CA8D8; cursor: pointer; }
        .rup-consent-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px,1.5vw,14px);
          font-style: italic; color: rgba(200,216,232,.6);
          line-height: 1.7; cursor: pointer;
        }

        .rup-btn {
          display: block; width: 100%;
          padding: clamp(14px,2vw,18px) 0;
          border-radius: 6px;
          background: linear-gradient(135deg, #152B52 0%, #243870 35%, #7CA8D8 50%, #243870 65%, #152B52 100%);
          color: #E8F0F8;
          font-family: 'Cinzel', serif;
          font-size: clamp(10px,1.3vw,13px); font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase;
          cursor: pointer; border: 1px solid rgba(200,216,232,.28);
          text-align: center;
          box-shadow: 0 8px 32px rgba(4,18,40,.6), 0 0 20px rgba(124,168,216,.15);
          transition: transform .2s, box-shadow .2s, opacity .2s;
          position: relative; overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .rup-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
          background-size: 350px 100%;
          animation: rup-shimmer 3s linear infinite;
        }
        .rup-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(4,18,40,.8), 0 0 30px rgba(124,168,216,.25); }
        .rup-btn:disabled { opacity: .3; cursor: not-allowed; background: rgba(124,168,216,.2); box-shadow: none; }
        .rup-btn span { position: relative; z-index: 1; }

        /* ── PROGRESS ── */
        .rup-progress-wrap {
          margin-top: 20px;
          animation: rup-fadeUp .4s ease both;
        }
        .rup-progress-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }
        .rup-progress-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(9px,1.2vw,11px);
          letter-spacing: .22em; text-transform: uppercase;
          color: rgba(200,216,232,.5);
        }
        .rup-progress-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(15px,2.5vw,19px);
          font-style: italic; color: #C8D8E8; line-height: 1;
        }
        .rup-progress-counter span {
          font-size: clamp(11px,1.5vw,13px);
          color: rgba(200,216,232,.4);
          font-style: normal; font-family: 'Cinzel', serif; letter-spacing: .1em;
        }
        .rup-progress-track {
          width: 100%; height: 6px;
          background: rgba(124,168,216,.1);
          border-radius: 100px; overflow: hidden;
          border: 1px solid rgba(200,216,232,.12);
          margin-bottom: 8px;
        }
        .rup-progress-bar {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, #152B52, #7CA8D8, #C8D8E8);
          box-shadow: 0 0 8px rgba(124,168,216,.4);
          transition: width .35s cubic-bezier(.4,0,.2,1);
        }
        .rup-progress-names {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px,1.5vw,14px);
          font-style: italic; color: rgba(200,216,232,.45);
          text-align: center; min-height: 20px;
        }

        /* ── SUCCESS ── */
        .rup-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
        .rup-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px,4vw,32px);
          font-style: italic; font-weight: 300;
          color: #E8F0F8; margin-bottom: 10px;
        }
        .rup-success-text {
          font-style: italic;
          font-size: clamp(14px,1.7vw,17px);
          color: rgba(200,216,232,.6); line-height: 1.8;
        }
        .rup-success-stats {
          display: flex; justify-content: center; gap: 20px;
          margin: 18px 0; flex-wrap: wrap;
        }
        .rup-success-stat {
          text-align: center; padding: 10px 18px;
          background: rgba(124,168,216,.06);
          border: 1px solid rgba(200,216,232,.15);
          border-radius: 12px; min-width: 80px;
        }
        .rup-success-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px,4vw,30px);
          font-style: italic; color: #C8D8E8; line-height: 1;
          margin-bottom: 4px;
        }
        .rup-success-stat-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(7px,.9vw,9px);
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(200,216,232,.35);
        }
        .rup-success-stat.failed .rup-success-stat-num { color: rgba(200,140,120,.7); }
        .rup-success-stat.failed .rup-success-stat-label { color: rgba(200,140,120,.4); }

        .rup-footer {
          font-family: 'Cinzel', serif;
          font-size: clamp(7px,.9vw,9px);
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(200,216,232,.25);
          margin-top: clamp(20px,3vw,28px);
        }

        .rup-spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(232,240,248,.3);
          border-top-color: #E8F0F8; border-radius: 50%;
          animation: rup-spin .7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }

        @keyframes rup-reveal {
          from { opacity: 0; transform: translateY(24px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes rup-shimmer {
          0%   { background-position: -350px 0; }
          100% { background-position:  350px 0; }
        }
        @keyframes rup-spin { to { transform: rotate(360deg); } }
        @keyframes rup-fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="rup-page">

        {/* Palace corners */}
        <svg className="rup-corner tl" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#rupg1)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#rupg1)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#rupg1)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="rupg1" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8D8E8"/>
              <stop offset="100%" stopColor="#6888A8" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="rup-corner tr" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#rupg2)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#rupg2)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#rupg2)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="rupg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8D8E8"/>
              <stop offset="100%" stopColor="#6888A8" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="rup-corner bl" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#rupg3)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#rupg3)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#rupg3)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="rupg3" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8D8E8"/>
              <stop offset="100%" stopColor="#6888A8" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="rup-corner br" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#rupg4)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#rupg4)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#rupg4)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="rupg4" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8D8E8"/>
              <stop offset="100%" stopColor="#6888A8" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="rup-line top"/>
        <div className="rup-line bottom"/>

        <div className="rup-card">
          <div className="rup-card-top-line"/>
          <div className="rup-card-corner tl"/><div className="rup-card-corner tr"/>
          <div className="rup-card-corner bl"/><div className="rup-card-corner br"/>

          <div className="rup-camera-circle">
            <svg viewBox="0 0 48 48" fill="none" style={{width:'clamp(32px,6vw,42px)',height:'clamp(32px,6vw,42px)'}}>
              <rect x="4" y="14" width="40" height="28" rx="4" stroke="#C8D8E8" strokeWidth="1.8" strokeOpacity=".7"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#C8D8E8" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke="#C8D8E8" strokeWidth="1.5" strokeOpacity=".7"/>
              <circle cx="24" cy="28" r="4" fill="#C8D8E8" fillOpacity=".22"/>
              <circle cx="37" cy="20" r="2" fill="#C8D8E8" fillOpacity=".5"/>
            </svg>
          </div>

          {uploaded ? (
            <>
              <div className="rup-success-icon">
                <svg viewBox="0 0 60 60" fill="none" style={{width:52,height:52}}>
                  <circle cx="30" cy="30" r="28" stroke="url(#rupSuccGrad)" strokeWidth="1.2"/>
                  <path d="M18 30 L26 38 L42 22" stroke="#C8D8E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="rupSuccGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6888A8"/>
                      <stop offset="50%" stopColor="#C8D8E8"/>
                      <stop offset="100%" stopColor="#6888A8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="rup-eyebrow">◆ Trimis cu succes ◆</p>
              <h2 className="rup-success-title">Mulțumim! ✦</h2>
              <div className="rup-divider"/>

              <div className="rup-success-stats">
                <div className="rup-success-stat">
                  <div className="rup-success-stat-num">{successCount}</div>
                  <div className="rup-success-stat-label">
                    {successCount === 1 ? 'Poză trimisă' : 'Poze trimise'}
                  </div>
                </div>
                {failedFiles > 0 && (
                  <div className="rup-success-stat failed">
                    <div className="rup-success-stat-num">{failedFiles}</div>
                    <div className="rup-success-stat-label">
                      {failedFiles === 1 ? 'Eroare' : 'Erori'}
                    </div>
                  </div>
                )}
              </div>

              <p className="rup-success-text">
                {failedFiles === 0
                  ? 'Pozele au fost trimise cu succes mirilor. Abia așteptăm să le vedem!'
                  : `${successCount} ${successCount === 1 ? 'poză trimisă' : 'poze trimise'} cu succes. ${failedFiles} ${failedFiles === 1 ? 'fișier nu a putut fi încărcat' : 'fișiere nu au putut fi încărcate'}.`
                }
              </p>
            </>
          ) : (
            <>
              <p className="rup-eyebrow">◆ Galerie Foto Live ◆</p>
              <h2 className="rup-title">Încarcă Poze</h2>
              <div className="rup-divider"/>
              <p className="rup-desc">
                Fotografiile sunt destinate exclusiv mirilor și vor fi disponibile în albumul online pe toată durata existenței evenimentului.
              </p>

              <label className="rup-consent-block">
                <input
                  type="checkbox"
                  className="rup-consent-checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                />
                <span className="rup-consent-text">
                  Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora în albumul privat al mirilor.
                </span>
              </label>

              {agreed ? (
                <label className="rup-btn" style={{cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? .75 : 1}}>
                  <span>
                    {uploading
                      ? <><span className="rup-spinner"/>SE ÎNCARCĂ...</>
                      : '◆ SELECTEAZĂ POZE ◆'
                    }
                  </span>
                  <input
                    type="file" multiple accept="image/*"
                    disabled={uploading}
                    style={{ display: 'none' }}
                    onChange={handleFile}
                  />
                </label>
              ) : (
                <button className="rup-btn" disabled>
                  <span>◆ SELECTEAZĂ POZE ◆</span>
                </button>
              )}

              {uploading && totalFiles > 0 && (
                <div className="rup-progress-wrap">
                  <div className="rup-progress-header">
                    <span className="rup-progress-label">Se încarcă...</span>
                    <span className="rup-progress-counter">
                      {doneFiles} <span>/ {totalFiles} poze</span>
                    </span>
                  </div>
                  <div className="rup-progress-track">
                    <div className="rup-progress-bar" style={{ width: `${progressPct}%` }}/>
                  </div>
                  <p className="rup-progress-names">
                    {doneFiles < totalFiles
                      ? `Se procesează poza ${doneFiles + 1} din ${totalFiles}...`
                      : 'Finalizare...'
                    }
                  </p>
                </div>
              )}
            </>
          )}

          <p className="rup-footer">VIBE INVITE · ROYAL EDITION</p>
        </div>
      </div>
    </>
  );
}