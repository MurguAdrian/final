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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html {
          height: 100%;
          min-height: 100dvh;
          background: #EDE0C4;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        body {
          font-family: 'EB Garamond', serif;
          color: #4A3728;
          height: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        input, textarea, select { font-size: 16px !important; }

        .bh-upload-page {
          min-height: 100dvh; width: 100%;
          background: radial-gradient(ellipse 90% 80% at 50% 40%, #F5EDD8 0%, #EDE0C4 55%, #E5D5B0 100%);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(20px, 4vw, 40px) clamp(16px, 4vw, 24px);
          position: relative; overflow: hidden;
          padding-bottom: max(clamp(20px, 4vw, 40px), env(safe-area-inset-bottom));
        }

        .bh-feather { position: absolute; width: min(120px, 16vw); height: min(200px, 28vw); opacity: .55; pointer-events: none; }
        .bh-feather.tl { top: 0; left: 0; }
        .bh-feather.tr { top: 0; right: 0; transform: scaleX(-1); }
        .bh-feather.bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .bh-feather.br { bottom: 0; right: 0; transform: scale(-1); }
        .bh-up-line { position: absolute; left: 5%; right: 5%; height: 1px; background: linear-gradient(90deg, transparent, rgba(193,127,62,.2), transparent); pointer-events: none; }
        .bh-up-line.top { top: 8%; }
        .bh-up-line.bottom { bottom: 8%; }

        .bh-upload-card {
          position: relative; z-index: 10;
          background: linear-gradient(165deg, #FEFAF0, #F5EDD8);
          border: 1.5px solid rgba(193,127,62,.25);
          border-radius: 28px;
          padding: clamp(32px, 5vw, 52px) clamp(24px, 5vw, 44px);
          max-width: 440px; width: 100%;
          box-shadow: 0 30px 80px rgba(74,55,40,.18), 0 0 40px rgba(193,127,62,.06);
          text-align: center;
          animation: bh-cardReveal .6s cubic-bezier(.4,0,.2,1) both;
          overflow: hidden;
        }
        .bh-card-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(193,127,62,.45), transparent); }
        .bh-card-corner { position: absolute; width: 12px; height: 12px; border-color: rgba(193,127,62,.35); }
        .bh-card-corner.tl { top: 10px; left: 10px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .bh-card-corner.tr { top: 10px; right: 10px; border-top: 1.5px solid; border-right: 1.5px solid; }
        .bh-card-corner.bl { bottom: 10px; left: 10px; border-bottom: 1.5px solid; border-left: 1.5px solid; }
        .bh-card-corner.br { bottom: 10px; right: 10px; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        .bh-camera-circle { width: clamp(64px, 12vw, 80px); height: clamp(64px, 12vw, 80px); border-radius: 50%; background: rgba(193,127,62,.12); border: 2px solid rgba(193,127,62,.3); display: flex; align-items: center; justify-content: center; margin: 0 auto clamp(16px, 3vw, 24px); }
        .bh-upload-eyebrow { font-family: 'EB Garamond', serif; font-size: clamp(10px, 1.1vw, 12px); letter-spacing: .18em; text-transform: uppercase; font-style: italic; color: rgba(139,99,67,.65); margin-bottom: 10px; }
        .bh-upload-title { font-family: 'Dancing Script', cursive; font-size: clamp(26px, 4vw, 34px); font-weight: 600; color: #4A3728; margin-bottom: 10px; line-height: 1.2; }
        .bh-upload-divider { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(193,127,62,.5), transparent); margin: 0 auto 18px; }
        .bh-upload-desc { font-size: clamp(13px, 1.6vw, 15px); font-style: italic; font-family: 'EB Garamond', serif; color: rgba(107,78,42,.7); line-height: 1.8; margin-bottom: 24px; }

        .bh-consent-block { display: flex; align-items: flex-start; gap: 12px; background: rgba(193,127,62,.07); border: 1.5px solid rgba(193,127,62,.2); border-radius: 14px; padding: 14px 16px; margin-bottom: 24px; text-align: left; cursor: pointer; transition: border-color .2s, background .2s; }
        .bh-consent-block:hover { border-color: rgba(193,127,62,.38); background: rgba(193,127,62,.12); }
        .bh-consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #C17F3E; cursor: pointer; }
        .bh-consent-text { font-family: 'EB Garamond', serif; font-size: clamp(12px, 1.5vw, 14px); font-style: italic; color: rgba(107,78,42,.7); line-height: 1.7; cursor: pointer; }

        .bh-upload-label-btn { display: block; width: 100%; padding: clamp(14px, 2vw, 18px) 0; border-radius: 100px; background: linear-gradient(135deg, #8B6343 0%, #6B4E2A 100%); color: #F5EDD8; font-family: 'EB Garamond', serif; font-size: clamp(13px, 1.5vw, 15px); font-style: italic; letter-spacing: .1em; cursor: pointer; border: none; text-align: center; box-shadow: 0 8px 28px rgba(139,99,67,.28); transition: transform .2s, box-shadow .2s, opacity .2s; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; }
        .bh-upload-label-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent); background-size: 350px 100%; animation: bh-shimmer 3s linear infinite; }
        .bh-upload-label-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(139,99,67,.42); }
        .bh-upload-label-btn:disabled { opacity: .35; cursor: not-allowed; background: rgba(193,127,62,.3); box-shadow: none; }
        .bh-upload-label-btn span { position: relative; z-index: 1; }

        /* ── PROGRESS ── */
        .bh-progress-wrap {
          margin-top: 20px;
          animation: bh-fadeUp .4s ease both;
        }
        .bh-progress-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }
        .bh-progress-label {
          font-family: 'EB Garamond', serif;
          font-size: clamp(10px, 1.1vw, 12px);
          letter-spacing: .18em; text-transform: uppercase;
          font-style: italic; color: rgba(139,99,67,.65);
        }
        .bh-progress-counter {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(16px, 2.5vw, 20px);
          font-weight: 600; color: #4A3728; line-height: 1;
        }
        .bh-progress-counter span {
          font-size: clamp(11px, 1.4vw, 13px);
          color: rgba(139,99,67,.45);
          font-family: 'EB Garamond', serif;
          font-style: italic; letter-spacing: .1em;
        }
        .bh-progress-track {
          width: 100%; height: 5px;
          background: rgba(193,127,62,.12);
          border-radius: 100px; overflow: hidden;
          border: 1px solid rgba(193,127,62,.18);
          margin-bottom: 8px;
        }
        .bh-progress-bar {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, #8B6343, #C17F3E, #D4935A);
          box-shadow: 0 0 6px rgba(193,127,62,.4);
          transition: width .35s cubic-bezier(.4,0,.2,1);
        }
        .bh-progress-hint {
          font-family: 'EB Garamond', serif;
          font-size: clamp(12px, 1.4vw, 14px);
          font-style: italic; color: rgba(107,78,42,.55);
          text-align: center; min-height: 20px;
        }

        /* ── SUCCESS ── */
        .bh-upload-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
        .bh-upload-success-title { font-family: 'Dancing Script', cursive; font-size: clamp(24px, 4vw, 32px); font-weight: 600; color: #4A3728; margin-bottom: 10px; }
        .bh-upload-success-text { font-style: italic; font-family: 'EB Garamond', serif; font-size: clamp(14px, 1.7vw, 16px); color: rgba(139,99,67,.7); line-height: 1.8; }
        .bh-success-stats {
          display: flex; justify-content: center; gap: 16px;
          margin: 18px 0; flex-wrap: wrap;
        }
        .bh-success-stat {
          text-align: center;
          padding: 10px 18px;
          background: rgba(193,127,62,.08);
          border: 1px solid rgba(193,127,62,.2);
          border-radius: 14px; min-width: 80px;
        }
        .bh-success-stat-num {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(24px, 4vw, 30px);
          font-weight: 600; color: #4A3728; line-height: 1;
          margin-bottom: 4px;
        }
        .bh-success-stat-label {
          font-family: 'EB Garamond', serif;
          font-size: clamp(9px, 1vw, 11px);
          letter-spacing: .14em; text-transform: uppercase;
          font-style: italic; color: rgba(139,99,67,.5);
        }
        .bh-success-stat.failed { border-color: rgba(180,80,50,.25); background: rgba(180,80,50,.06); }
        .bh-success-stat.failed .bh-success-stat-num { color: rgba(160,70,40,.8); }
        .bh-success-stat.failed .bh-success-stat-label { color: rgba(160,70,40,.45); }

        .bh-upload-footer { font-family: 'EB Garamond', serif; font-size: clamp(9px, 1vw, 11px); letter-spacing: .18em; text-transform: uppercase; font-style: italic; color: rgba(139,99,67,.35); margin-top: clamp(20px, 3vw, 28px); }
        .bh-upload-spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(245,237,216,.3); border-top-color: #F5EDD8; border-radius: 50%; animation: bh-spin .7s linear infinite; vertical-align: middle; margin-right: 8px; }

        @keyframes bh-cardReveal { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bh-shimmer { 0% { background-position: -350px 0; } 100% { background-position: 350px 0; } }
        @keyframes bh-spin { to { transform: rotate(360deg); } }
        @keyframes bh-fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="bh-upload-page">
        <svg className="bh-feather tl" viewBox="0 0 60 200" fill="none">
          <path d="M30 190 Q28 140 22 100 Q14 55 8 20 Q22 45 30 80 Q38 55 52 20 Q46 55 38 100 Q32 140 30 190Z" fill="#C17F3E" fillOpacity=".2" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".35"/>
          <path d="M30 190 L30 80" stroke="#8B6343" strokeWidth="1" strokeOpacity=".4"/>
          {[80,100,120,140,160].map((y,i)=>{const w=14-i*1.5;return(<g key={y}><path d={`M30 ${y} Q${30-w} ${y-6} ${22-i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".35" fill="none"/><path d={`M30 ${y} Q${30+w} ${y-6} ${38+i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".35" fill="none"/></g>);})}
        </svg>
        <svg className="bh-feather tr" viewBox="0 0 60 200" fill="none">
          <path d="M30 190 Q28 140 22 100 Q14 55 8 20 Q22 45 30 80 Q38 55 52 20 Q46 55 38 100 Q32 140 30 190Z" fill="#C17F3E" fillOpacity=".2" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".35"/>
          <path d="M30 190 L30 80" stroke="#8B6343" strokeWidth="1" strokeOpacity=".4"/>
          {[80,100,120,140,160].map((y,i)=>{const w=14-i*1.5;return(<g key={y}><path d={`M30 ${y} Q${30-w} ${y-6} ${22-i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".35" fill="none"/><path d={`M30 ${y} Q${30+w} ${y-6} ${38+i*2} ${y-12}`} stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".35" fill="none"/></g>);})}
        </svg>
        <div className="bh-up-line top"/>
        <div className="bh-up-line bottom"/>

        <div className="bh-upload-card">
          <div className="bh-card-top-line"/>
          <div className="bh-card-corner tl"/><div className="bh-card-corner tr"/>
          <div className="bh-card-corner bl"/><div className="bh-card-corner br"/>

          <div className="bh-camera-circle">
            <svg viewBox="0 0 48 48" fill="none" style={{width:'clamp(32px,6vw,42px)' as any, height:'clamp(32px,6vw,42px)' as any}}>
              <rect x="4" y="14" width="40" height="28" rx="4" stroke="#C17F3E" strokeWidth="1.8" strokeOpacity=".7"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#C17F3E" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke="#C17F3E" strokeWidth="1.5" strokeOpacity=".7"/>
              <circle cx="24" cy="28" r="4" fill="#C17F3E" fillOpacity=".22"/>
              <circle cx="37" cy="20" r="2" fill="#C17F3E" fillOpacity=".5"/>
              <circle cx="10" cy="20" r="1.2" fill="#7A9E6A" fillOpacity=".6"/>
            </svg>
          </div>

          {uploaded ? (
            <>
              <div className="bh-upload-success-icon">
                <svg viewBox="0 0 60 60" fill="none" style={{width:52, height:52}}>
                  <circle cx="30" cy="30" r="28" stroke="url(#bhSucGrad)" strokeWidth="1.2"/>
                  <path d="M18 30 L26 38 L42 22" stroke="#C17F3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="bhSucGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#8B6343"/>
                      <stop offset="50%" stopColor="#C17F3E"/>
                      <stop offset="100%" stopColor="#8B6343"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="bh-upload-eyebrow">✿ trimis cu succes ✿</p>
              <h2 className="bh-upload-success-title">Mulțumim! 🌿</h2>
              <div className="bh-upload-divider"/>

              <div className="bh-success-stats">
                <div className="bh-success-stat">
                  <div className="bh-success-stat-num">{successCount}</div>
                  <div className="bh-success-stat-label">
                    {successCount === 1 ? 'Poză trimisă' : 'Poze trimise'}
                  </div>
                </div>
                {failedFiles > 0 && (
                  <div className="bh-success-stat failed">
                    <div className="bh-success-stat-num">{failedFiles}</div>
                    <div className="bh-success-stat-label">
                      {failedFiles === 1 ? 'Eroare' : 'Erori'}
                    </div>
                  </div>
                )}
              </div>

              <p className="bh-upload-success-text">
                {failedFiles === 0
                  ? 'Pozele au fost trimise cu succes mirilor. Abia așteptăm să le vedem!'
                  : `${successCount} ${successCount === 1 ? 'poză trimisă' : 'poze trimise'} cu succes. ${failedFiles} ${failedFiles === 1 ? 'fișier nu a putut fi încărcat' : 'fișiere nu au putut fi încărcate'}.`
                }
              </p>
            </>
          ) : (
            <>
              <p className="bh-upload-eyebrow">✿ galerie foto live ✿</p>
              <h2 className="bh-upload-title">Încarcă Poze</h2>
              <div className="bh-upload-divider"/>
              <p className="bh-upload-desc">Fotografiile sunt destinate exclusiv mirilor și vor fi disponibile în albumul online pe toată durata existenței evenimentului.</p>

              <label className="bh-consent-block">
                <input
                  type="checkbox" className="bh-consent-checkbox"
                  checked={agreed} onChange={e => setAgreed(e.target.checked)}
                />
                <span className="bh-consent-text">Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora în albumul privat al mirilor.</span>
              </label>

              {agreed ? (
                <label className="bh-upload-label-btn" style={{ cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? .75 : 1 }}>
                  <span>
                    {uploading
                      ? <><span className="bh-upload-spinner"/>Se încarcă...</>
                      : '✿ Selectează Poze ✿'
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
                <button className="bh-upload-label-btn" disabled style={{ cursor: 'not-allowed' }}>
                  <span>✿ Selectează Poze ✿</span>
                </button>
              )}

              {uploading && totalFiles > 0 && (
                <div className="bh-progress-wrap">
                  <div className="bh-progress-header">
                    <span className="bh-progress-label">Se încarcă...</span>
                    <span className="bh-progress-counter">
                      {doneFiles} <span>/ {totalFiles} poze</span>
                    </span>
                  </div>
                  <div className="bh-progress-track">
                    <div className="bh-progress-bar" style={{ width: `${progressPct}%` }}/>
                  </div>
                  <p className="bh-progress-hint">
                    {doneFiles < totalFiles
                      ? `Se procesează poza ${doneFiles + 1} din ${totalFiles}...`
                      : 'Finalizare...'
                    }
                  </p>
                </div>
              )}
            </>
          )}

          <p className="bh-upload-footer">VIBE INVITE · BOHO EDITION</p>
        </div>
      </div>
    </>
  );
}