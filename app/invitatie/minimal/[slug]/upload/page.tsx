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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html {
          height: 100%;
          min-height: 100dvh;
          background: #F7F4F0;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        body {
          font-family: 'DM Sans', sans-serif;
          color: #111;
          height: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        input, textarea, select { font-size: 16px !important; }

        .mn-upload-page {
          min-height: 100dvh; width: 100%;
          background: #F7F4F0;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(20px,4vw,40px) clamp(16px,4vw,24px);
          position: relative; overflow: hidden;
          padding-bottom: max(clamp(20px,4vw,40px), env(safe-area-inset-bottom));
        }

        .mn-upload-accent-left { position: absolute; top: 0; left: 0; width: clamp(4px,.5vw,6px); height: 100%; background: #C8503A; z-index: 1; pointer-events: none; }
        .mn-upload-accent-bottom { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#C8503A 0%,#E8C4B8 60%,transparent 100%); opacity: .6; pointer-events: none; }

        .mn-upload-card {
          position: relative; z-index: 10;
          background: #fff;
          border-top: 4px solid #C8503A;
          padding: clamp(32px,5vw,52px) clamp(24px,5vw,44px);
          max-width: 440px; width: 100%;
          box-shadow: 0 8px 48px rgba(0,0,0,.07);
          text-align: center;
          animation: mn-cardReveal .6s cubic-bezier(.4,0,.2,1) both;
        }

        .mn-upload-camera { width: clamp(64px,12vw,80px); height: clamp(64px,12vw,80px); border-radius: 50%; background: rgba(200,80,58,.08); border: 2px solid rgba(200,80,58,.2); display: flex; align-items: center; justify-content: center; margin: 0 auto clamp(16px,3vw,24px); }
        .mn-upload-eyebrow { font-family: 'DM Sans', sans-serif; font-size: clamp(8px,1vw,10px); letter-spacing: .32em; text-transform: uppercase; color: #C8503A; margin-bottom: 10px; font-weight: 500; }
        .mn-upload-title { font-family: 'Playfair Display', serif; font-size: clamp(24px,3.5vw,32px); font-style: italic; font-weight: 400; color: #111; margin-bottom: 10px; line-height: 1.2; }
        .mn-upload-divider { width: 40px; height: 2px; background: #C8503A; margin: 0 auto 18px; }
        .mn-upload-desc { font-size: clamp(13px,1.6vw,15px); color: #555; line-height: 1.85; margin-bottom: 24px; font-weight: 300; }

        .mn-consent-block { display: flex; align-items: flex-start; gap: 12px; background: rgba(200,80,58,.04); border: 1px solid rgba(200,80,58,.15); padding: 14px 16px; margin-bottom: 24px; text-align: left; cursor: pointer; transition: border-color .2s, background .2s; }
        .mn-consent-block:hover { border-color: rgba(200,80,58,.3); background: rgba(200,80,58,.07); }
        .mn-consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #C8503A; cursor: pointer; }
        .mn-consent-text { font-family: 'DM Sans', sans-serif; font-size: clamp(12px,1.5vw,13px); color: #555; line-height: 1.7; cursor: pointer; }

        .mn-upload-btn { display: block; width: 100%; padding: clamp(14px,2vw,18px) 0; background: #111; color: #fff; font-family: 'DM Sans', sans-serif; font-size: clamp(10px,1.3vw,12px); font-weight: 500; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; border: none; text-align: center; transition: background .2s, opacity .2s; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; }
        .mn-upload-btn:not(:disabled):hover { background: #C8503A; }
        .mn-upload-btn:disabled { opacity: .35; cursor: not-allowed; }

        .mn-upload-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
        .mn-upload-success-title { font-family: 'Playfair Display', serif; font-size: clamp(24px,4vw,30px); font-style: italic; font-weight: 400; color: #111; margin-bottom: 10px; }
        .mn-upload-success-text { font-size: clamp(13px,1.5vw,15px); color: #555; line-height: 1.85; }
        .mn-upload-footer { font-family: 'DM Sans', sans-serif; font-size: clamp(7px,.9vw,9px); letter-spacing: .2em; text-transform: uppercase; color: #AAAAAA; margin-top: clamp(20px,3vw,28px); }
        .mn-upload-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: mn-spin .7s linear infinite; vertical-align: middle; margin-right: 8px; }

        @keyframes mn-cardReveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mn-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="mn-upload-page">
        <div className="mn-upload-accent-left"/>
        <div className="mn-upload-accent-bottom"/>

        <div className="mn-upload-card">
          <div className="mn-upload-camera">
            <svg viewBox="0 0 48 48" fill="none" style={{ width: 'clamp(30px,5.5vw,38px)' as any, height: 'clamp(30px,5.5vw,38px)' as any }}>
              <rect x="4" y="14" width="40" height="28" rx="3" stroke="#C8503A" strokeWidth="1.8" strokeOpacity=".8"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#C8503A" strokeWidth="1.8" strokeOpacity=".8" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke="#C8503A" strokeWidth="1.5" strokeOpacity=".8"/>
              <circle cx="24" cy="28" r="4" fill="#C8503A" fillOpacity=".2"/>
              <circle cx="37" cy="20" r="2" fill="#C8503A" fillOpacity=".5"/>
            </svg>
          </div>

          {uploaded ? (
            <>
              <div className="mn-upload-success-icon">
                <svg viewBox="0 0 60 60" fill="none" style={{ width: 52, height: 52 }}>
                  <circle cx="30" cy="30" r="28" stroke="#C8503A" strokeWidth="1.2"/>
                  <path d="M18 30 L26 38 L42 22" stroke="#C8503A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="mn-upload-eyebrow">Trimis cu succes</p>
              <h2 className="mn-upload-title">Mulțumim!</h2>
              <div className="mn-upload-divider"/>
              <p className="mn-upload-success-text">Pozele au fost trimise cu succes mirilor.<br/>Abia așteptăm să le vedem!</p>
            </>
          ) : (
            <>
              <p className="mn-upload-eyebrow">Galerie Foto Live</p>
              <h2 className="mn-upload-title">Încarcă Poze</h2>
              <div className="mn-upload-divider"/>
              <p className="mn-upload-desc">Fotografiile sunt destinate exclusiv mirilor și vor fi disponibile în albumul online pe toată durata existenței evenimentului.</p>
              <label className="mn-consent-block">
                <input type="checkbox" className="mn-consent-checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}/>
                <span className="mn-consent-text">Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora în albumul privat al mirilor.</span>
              </label>
              {agreed ? (
                <label className="mn-upload-btn" style={{ cursor: 'pointer' }}>
                  <span>{uploading ? (<><span className="mn-upload-spinner"/>{' '}Se încarcă...</>) : ('Selectează Poze')}</span>
                  <input type="file" multiple accept="image/*" disabled={uploading} style={{ display: 'none' }} onChange={handleFile}/>
                </label>
              ) : (
                <button className="mn-upload-btn" disabled><span>Selectează Poze</span></button>
              )}
            </>
          )}

          <p className="mn-upload-footer">Vibe Invite · Tema Minimal</p>
        </div>
      </div>
    </>
  );
}