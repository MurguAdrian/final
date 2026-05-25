"use client";
import React, { useState, useEffect } from 'react';

export default function UploadPage({ params }: { params: { slug: string } }) {
  const [agreed, setAgreed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/dashboard/summary?slug=${params.slug}`)
      .then(res => res.json())
      .then(data => setOrderId(data.weddingDetails.order_id));
  }, [params.slug]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !orderId) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId.toString());
      try {
        await fetch("/api/photos/upload", { method: "POST", body: formData });
      } catch (err) { console.error("Eroare la una din poze"); }
    }
    setUploading(false);
    setUploaded(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html {
          height: 100%;
          min-height: 100dvh;
          background: #FDF5F6;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        body {
          font-family: 'Cormorant Garamond', serif;
          color: #3D1520;
          height: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        input, textarea, select { font-size: 16px !important; }

        .rm-upload-page {
          min-height: 100dvh; width: 100%;
          background: radial-gradient(ellipse 90% 80% at 50% 40%, #FDF5F6 0%, #FAF0F2 45%, #F2C8CE 80%, #E8A0A8 100%);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(20px, 4vw, 40px) clamp(16px, 4vw, 24px);
          position: relative; overflow: hidden;
          padding-bottom: max(clamp(20px, 4vw, 40px), env(safe-area-inset-bottom));
        }

        .rm-up-corner { position: absolute; pointer-events: none; }
        .rm-up-corner.tl { top: 0; left: 0; }
        .rm-up-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
        .rm-up-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .rm-up-corner.br { bottom: 0; right: 0; transform: scale(-1); }
        .rm-up-line { position: absolute; left: 5%; right: 5%; height: 1px; background: linear-gradient(90deg, transparent, rgba(196,80,106,.2), transparent); pointer-events: none; }
        .rm-up-line.top { top: 8%; }
        .rm-up-line.bottom { bottom: 8%; }

        .rm-upload-card {
          position: relative; z-index: 10;
          background: rgba(255,251,251,.92);
          border: 1.5px solid rgba(196,80,106,.2);
          border-radius: 24px;
          padding: clamp(32px, 5vw, 52px) clamp(24px, 5vw, 44px);
          max-width: 440px; width: 100%;
          box-shadow: 0 30px 80px rgba(123,26,46,.12), 0 0 40px rgba(196,80,106,.04);
          text-align: center;
          animation: rm-cardReveal .6s cubic-bezier(.4,0,.2,1) both;
          overflow: hidden;
        }
        .rm-card-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1.5px; background: linear-gradient(90deg, transparent, rgba(196,80,106,.5), transparent); }
        .rm-card-corner { position: absolute; width: 14px; height: 14px; border-color: rgba(196,80,106,.3); }
        .rm-card-corner.tl { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
        .rm-card-corner.tr { top: 10px; right: 10px; border-top: 1px solid; border-right: 1px solid; }
        .rm-card-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid; border-left: 1px solid; }
        .rm-card-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }

        .rm-camera-circle { width: clamp(64px, 12vw, 80px); height: clamp(64px, 12vw, 80px); border-radius: 50%; background: rgba(196,80,106,.08); border: 2px solid rgba(196,80,106,.25); display: flex; align-items: center; justify-content: center; margin: 0 auto clamp(16px, 3vw, 24px); }
        .rm-upload-eyebrow { font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px); letter-spacing: .32em; text-transform: uppercase; color: rgba(166,50,72,.6); margin-bottom: 10px; }
        .rm-upload-title { font-family: 'Playfair Display', serif; font-size: clamp(26px, 4vw, 34px); font-style: italic; font-weight: 400; color: #7B1A2E; margin-bottom: 10px; line-height: 1.2; }
        .rm-upload-divider { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(196,80,106,.5), transparent); margin: 0 auto 18px; }
        .rm-upload-desc { font-size: clamp(13px, 1.6vw, 16px); font-style: italic; color: rgba(138,74,88,.7); line-height: 1.8; margin-bottom: 24px; }

        .rm-consent-block { display: flex; align-items: flex-start; gap: 12px; background: rgba(196,80,106,.04); border: 1px solid rgba(196,80,106,.15); border-radius: 12px; padding: 14px 16px; margin-bottom: 24px; text-align: left; cursor: pointer; transition: border-color .2s, background .2s; }
        .rm-consent-block:hover { border-color: rgba(196,80,106,.3); background: rgba(196,80,106,.07); }
        .rm-consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #A63248; cursor: pointer; }
        .rm-consent-text { font-family: 'Cormorant Garamond', serif; font-size: clamp(12px, 1.5vw, 14px); font-style: italic; color: rgba(138,74,88,.7); line-height: 1.7; cursor: pointer; }

        .rm-upload-label-btn { display: block; width: 100%; padding: clamp(14px, 2vw, 18px) 0; border-radius: 100px; background: linear-gradient(135deg, #7B1A2E 0%, #A63248 45%, #C4506A 55%, #A63248 70%, #7B1A2E 100%); color: #fff; font-family: 'Cinzel', serif; font-size: clamp(10px, 1.3vw, 12px); font-weight: 600; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; border: none; text-align: center; box-shadow: 0 8px 28px rgba(123,26,46,.28); transition: transform .2s, box-shadow .2s, opacity .2s; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; }
        .rm-upload-label-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent); background-size: 350px 100%; animation: rm-shimmer 3s linear infinite; }
        .rm-upload-label-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(123,26,46,.4); }
        .rm-upload-label-btn:disabled { opacity: .3; cursor: not-allowed; background: rgba(196,80,106,.3); box-shadow: none; }
        .rm-upload-label-btn span { position: relative; z-index: 1; }

        .rm-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
        .rm-success-title { font-family: 'Playfair Display', serif; font-size: clamp(24px, 4vw, 32px); font-style: italic; font-weight: 400; color: #7B1A2E; margin-bottom: 10px; }
        .rm-success-text { font-style: italic; font-size: clamp(14px, 1.7vw, 17px); color: rgba(138,74,88,.7); line-height: 1.8; }
        .rm-upload-footer { font-family: 'Cinzel', serif; font-size: clamp(7px, .9vw, 9px); letter-spacing: .2em; text-transform: uppercase; color: rgba(138,74,88,.3); margin-top: clamp(20px, 3vw, 28px); }
        .rm-upload-spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: rm-spin .7s linear infinite; vertical-align: middle; margin-right: 8px; }

        @keyframes rm-cardReveal { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes rm-shimmer { 0% { background-position: -350px 0; } 100% { background-position: 350px 0; } }
        @keyframes rm-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="rm-upload-page">
        {/* Decorative petal corners */}
        <svg className="rm-up-corner tl" viewBox="0 0 120 120" fill="none" style={{width:'min(120px,16vw)',height:'min(120px,16vw)',opacity:.5}}>
          <path d="M8 8 L8 90 M8 8 L90 8" stroke="rgba(196,80,106,.5)" strokeWidth="1"/>
          <path d="M18 18 L18 72 M18 18 L72 18" stroke="rgba(196,80,106,.3)" strokeWidth=".6"/>
          <ellipse cx="8" cy="8" rx="5" ry="8" fill="rgba(196,80,106,.4)" transform="rotate(-30 8 8)"/>
        </svg>
        <svg className="rm-up-corner tr" viewBox="0 0 120 120" fill="none" style={{width:'min(120px,16vw)',height:'min(120px,16vw)',opacity:.5}}>
          <path d="M8 8 L8 90 M8 8 L90 8" stroke="rgba(196,80,106,.5)" strokeWidth="1"/>
          <path d="M18 18 L18 72 M18 18 L72 18" stroke="rgba(196,80,106,.3)" strokeWidth=".6"/>
          <ellipse cx="8" cy="8" rx="5" ry="8" fill="rgba(196,80,106,.4)" transform="rotate(-30 8 8)"/>
        </svg>
        <svg className="rm-up-corner bl" viewBox="0 0 120 120" fill="none" style={{width:'min(120px,16vw)',height:'min(120px,16vw)',opacity:.5}}>
          <path d="M8 8 L8 90 M8 8 L90 8" stroke="rgba(196,80,106,.5)" strokeWidth="1"/>
          <path d="M18 18 L18 72 M18 18 L72 18" stroke="rgba(196,80,106,.3)" strokeWidth=".6"/>
          <ellipse cx="8" cy="8" rx="5" ry="8" fill="rgba(196,80,106,.4)" transform="rotate(-30 8 8)"/>
        </svg>
        <svg className="rm-up-corner br" viewBox="0 0 120 120" fill="none" style={{width:'min(120px,16vw)',height:'min(120px,16vw)',opacity:.5}}>
          <path d="M8 8 L8 90 M8 8 L90 8" stroke="rgba(196,80,106,.5)" strokeWidth="1"/>
          <path d="M18 18 L18 72 M18 18 L72 18" stroke="rgba(196,80,106,.3)" strokeWidth=".6"/>
          <ellipse cx="8" cy="8" rx="5" ry="8" fill="rgba(196,80,106,.4)" transform="rotate(-30 8 8)"/>
        </svg>
        <div className="rm-up-line top"/>
        <div className="rm-up-line bottom"/>

        <div className="rm-upload-card">
          <div className="rm-card-top-line"/>
          <div className="rm-card-corner tl"/><div className="rm-card-corner tr"/>
          <div className="rm-card-corner bl"/><div className="rm-card-corner br"/>

          <div className="rm-camera-circle">
            <svg viewBox="0 0 48 48" fill="none" style={{width:'clamp(32px,6vw,42px)',height:'clamp(32px,6vw,42px)'}}>
              <rect x="4" y="14" width="40" height="28" rx="4" stroke="#A63248" strokeWidth="1.8" strokeOpacity=".7"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#A63248" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke="#A63248" strokeWidth="1.5" strokeOpacity=".7"/>
              <circle cx="24" cy="28" r="4" fill="#A63248" fillOpacity=".2"/>
              <circle cx="37" cy="20" r="2" fill="#A63248" fillOpacity=".5"/>
            </svg>
          </div>

          {uploaded ? (
            <>
              <div className="rm-success-icon">
                <svg viewBox="0 0 60 60" fill="none" style={{width:52,height:52}}>
                  <circle cx="30" cy="30" r="28" stroke="url(#rmSucGrad)" strokeWidth="1.2"/>
                  <path d="M18 30 L26 38 L42 22" stroke="#A63248" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="rmSucGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#E8A0A8"/>
                      <stop offset="50%" stopColor="#A63248"/>
                      <stop offset="100%" stopColor="#7B1A2E"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="rm-upload-eyebrow">♥ Trimis cu succes ♥</p>
              <h2 className="rm-upload-title">Mulțumim!</h2>
              <div className="rm-upload-divider"/>
              <p className="rm-success-text">Pozele au fost trimise cu succes mirilor.<br/>Abia așteptăm să le vedem!</p>
            </>
          ) : (
            <>
              <p className="rm-upload-eyebrow">♥ Galerie Foto Live ♥</p>
              <h2 className="rm-upload-title">Încarcă Poze</h2>
              <div className="rm-upload-divider"/>
              <p className="rm-upload-desc">Fotografiile sunt destinate exclusiv mirilor și vor fi disponibile în albumul online pe toată durata existenței evenimentului.</p>
              <label className="rm-consent-block">
                <input type="checkbox" className="rm-consent-checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}/>
                <span className="rm-consent-text">Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora în albumul privat al mirilor.</span>
              </label>
              {agreed ? (
                <label className="rm-upload-label-btn" style={{cursor:'pointer'}}>
                  <span>{uploading ? (<><span className="rm-upload-spinner"/>{' '}SE ÎNCARCĂ...</>) : ('♥ SELECTEAZĂ POZE ♥')}</span>
                  <input type="file" multiple accept="image/*" disabled={uploading} style={{ display: 'none' }} onChange={handleFile}/>
                </label>
              ) : (
                <button className="rm-upload-label-btn" disabled style={{cursor:'not-allowed'}}><span>♥ SELECTEAZĂ POZE ♥</span></button>
              )}
            </>
          )}

          <p className="rm-upload-footer">VIBE INVITE · ROMANTIC EDITION</p>
        </div>
      </div>
    </>
  );
}
