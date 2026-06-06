

// "use client";
// import React, { useState, useEffect } from 'react';

// export default function UploadPage({ params }: { params: { slug: string } }) {
//   const [agreed, setAgreed] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploaded, setUploaded] = useState(false);
//   const [orderId, setOrderId] = useState<number | null>(null);

//   useEffect(() => {
//     fetch(`/api/dashboard/summary?slug=${params.slug}`)
//       .then(res => res.json())
//       .then(data => setOrderId(data.weddingDetails.order_id));
//   }, [params.slug]);

//   const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || !orderId) return;
//     setUploading(true);
//     const files = Array.from(e.target.files);
//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("orderId", orderId.toString());
//       try {
//         await fetch("/api/photos/upload", { method: "POST", body: formData });
//       } catch (err) { console.error("Eroare la una din poze"); }
//     }
//     setUploading(false);
//     setUploaded(true);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html {
//           height: 100%;
//           min-height: 100dvh;
//           background: #000;
//           -webkit-font-smoothing: antialiased;
//           overscroll-behavior: none;
//         }
//         body {
//           font-family: 'Cormorant Garamond', serif;
//           color: #fff;
//           height: 100%;
//           min-height: 100dvh;
//           overflow-x: hidden;
//           overscroll-behavior: none;
//           -webkit-text-size-adjust: 100%;
//           text-size-adjust: 100%;
//         }
//         input, textarea, select { font-size: 16px !important; }

//         .upload-page {
//           min-height: 100dvh; width: 100%;
//           background: radial-gradient(ellipse 90% 80% at 50% 40%, #1A1408 0%, #0A0803 55%, #040301 100%);
//           display: flex; align-items: center; justify-content: center;
//           padding: clamp(20px, 4vw, 40px) clamp(16px, 4vw, 24px);
//           position: relative; overflow: hidden;
//           padding-bottom: max(clamp(20px, 4vw, 40px), env(safe-area-inset-bottom));
//         }

//         .up-corner { position: absolute; width: min(160px, 20vw); height: min(160px, 20vw); opacity: .55; pointer-events: none; }
//         .up-corner.tl { top: 0; left: 0; }
//         .up-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
//         .up-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
//         .up-corner.br { bottom: 0; right: 0; transform: scale(-1); }
//         .up-line { position: absolute; left: 5%; right: 5%; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.2), transparent); pointer-events: none; }
//         .up-line.top { top: 8%; }
//         .up-line.bottom { bottom: 8%; }

//         .upload-card {
//           position: relative; z-index: 10;
//           background: linear-gradient(170deg, #1A1408, #0A0803);
//           border: 1px solid rgba(212,175,55,.22);
//           border-radius: 20px;
//           padding: clamp(32px, 5vw, 52px) clamp(24px, 5vw, 44px);
//           max-width: 440px; width: 100%;
//           box-shadow: 0 30px 80px rgba(0,0,0,.8), 0 0 40px rgba(212,175,55,.06);
//           text-align: center;
//           animation: cardReveal .6s cubic-bezier(.4,0,.2,1) both;
//           overflow: hidden;
//         }
//         .card-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent); }
//         .card-corner { position: absolute; width: 14px; height: 14px; border-color: rgba(212,175,55,.3); }
//         .card-corner.tl { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
//         .card-corner.tr { top: 10px; right: 10px; border-top: 1px solid; border-right: 1px solid; }
//         .card-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid; border-left: 1px solid; }
//         .card-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }

//         .camera-circle { width: clamp(64px, 12vw, 80px); height: clamp(64px, 12vw, 80px); border-radius: 50%; background: rgba(212,175,55,.1); border: 2px solid rgba(212,175,55,.28); display: flex; align-items: center; justify-content: center; margin: 0 auto clamp(16px, 3vw, 24px); }
//         .upload-eyebrow { font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px); letter-spacing: .32em; text-transform: uppercase; color: rgba(212,175,55,.55); margin-bottom: 10px; }
//         .upload-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(26px, 4vw, 34px); font-style: italic; font-weight: 300; color: #F5E6A8; margin-bottom: 10px; line-height: 1.2; }
//         .upload-divider { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent); margin: 0 auto 18px; }
//         .upload-desc { font-size: clamp(13px, 1.6vw, 16px); font-style: italic; color: rgba(212,175,55,.55); line-height: 1.8; margin-bottom: 24px; }

//         .consent-block { display: flex; align-items: flex-start; gap: 12px; background: rgba(212,175,55,.04); border: 1px solid rgba(212,175,55,.15); border-radius: 10px; padding: 14px 16px; margin-bottom: 24px; text-align: left; cursor: pointer; transition: border-color .2s, background .2s; }
//         .consent-block:hover { border-color: rgba(212,175,55,.3); background: rgba(212,175,55,.07); }
//         .consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #D4AF37; cursor: pointer; }
//         .consent-text { font-family: 'Cormorant Garamond', serif; font-size: clamp(12px, 1.5vw, 14px); font-style: italic; color: rgba(212,175,55,.6); line-height: 1.7; cursor: pointer; }

//         .upload-label-btn { display: block; width: 100%; padding: clamp(14px, 2vw, 18px) 0; border-radius: 4px; background: linear-gradient(135deg, #8B6914 0%, #D4AF37 45%, #F5D678 55%, #D4AF37 70%, #8B6914 100%); color: #0A0803; font-family: 'Cinzel', serif; font-size: clamp(10px, 1.3vw, 13px); font-weight: 700; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; border: none; text-align: center; box-shadow: 0 8px 32px rgba(212,175,55,.3); transition: transform .2s, box-shadow .2s, opacity .2s; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; }
//         .upload-label-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent); background-size: 350px 100%; animation: shimmer 3s linear infinite; }
//         .upload-label-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(212,175,55,.5); }
//         .upload-label-btn:disabled { opacity: .3; cursor: not-allowed; background: rgba(212,175,55,.3); box-shadow: none; }
//         .upload-label-btn span { position: relative; z-index: 1; }

//         .upload-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
//         .upload-success-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(24px, 4vw, 32px); font-style: italic; font-weight: 300; color: #F5E6A8; margin-bottom: 10px; }
//         .upload-success-text { font-style: italic; font-size: clamp(14px, 1.7vw, 17px); color: rgba(212,175,55,.6); line-height: 1.8; }
//         .upload-footer { font-family: 'Cinzel', serif; font-size: clamp(7px, .9vw, 9px); letter-spacing: .2em; text-transform: uppercase; color: rgba(212,175,55,.25); margin-top: clamp(20px, 3vw, 28px); }
//         .upload-spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(10,8,3,.3); border-top-color: #0A0803; border-radius: 50%; animation: spin .7s linear infinite; vertical-align: middle; margin-right: 8px; }

//         @keyframes cardReveal { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
//         @keyframes shimmer { 0% { background-position: -350px 0; } 100% { background-position: 350px 0; } }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>

//       <div className="upload-page">
//         <svg className="up-corner tl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#upg1)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#upg1)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#upg1)" fillOpacity=".8"/><defs><linearGradient id="upg1" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
//         <svg className="up-corner tr" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#upg2)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#upg2)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#upg2)" fillOpacity=".8"/><defs><linearGradient id="upg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
//         <svg className="up-corner bl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#upg3)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#upg3)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#upg3)" fillOpacity=".8"/><defs><linearGradient id="upg3" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
//         <svg className="up-corner br" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#upg4)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#upg4)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#upg4)" fillOpacity=".8"/><defs><linearGradient id="upg4" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
//         <div className="up-line top"/>
//         <div className="up-line bottom"/>

//         <div className="upload-card">
//           <div className="card-top-line"/>
//           <div className="card-corner tl"/><div className="card-corner tr"/>
//           <div className="card-corner bl"/><div className="card-corner br"/>

//           <div className="camera-circle">
//             <svg viewBox="0 0 48 48" fill="none" style={{width:'clamp(32px,6vw,42px)' as any,height:'clamp(32px,6vw,42px)' as any}}>
//               <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
//               <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
//               <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
//               <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".25"/>
//               <circle cx="37" cy="20" r="2" fill="#D4AF37" fillOpacity=".5"/>
//             </svg>
//           </div>

//           {uploaded ? (
//             <>
//               <div className="upload-success-icon">
//                 <svg viewBox="0 0 60 60" fill="none" style={{width:52,height:52}}>
//                   <circle cx="30" cy="30" r="28" stroke="url(#sucGrad)" strokeWidth="1.2"/>
//                   <path d="M18 30 L26 38 L42 22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <defs>
//                     <linearGradient id="sucGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
//                       <stop offset="0%" stopColor="#8B6914"/>
//                       <stop offset="50%" stopColor="#D4AF37"/>
//                       <stop offset="100%" stopColor="#8B6914"/>
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>
//               <p className="upload-eyebrow">◆ Trimis cu succes ◆</p>
//               <h2 className="upload-title">Mulțumim! ✦</h2>
//               <div className="upload-divider"/>
//               <p className="upload-success-text">Pozele au fost trimise cu succes mirilor.<br/>Abia așteptăm să le vedem!</p>
//             </>
//           ) : (
//             <>
//               <p className="upload-eyebrow">◆ Galerie Foto Live ◆</p>
//               <h2 className="upload-title">Încarcă Poze</h2>
//               <div className="upload-divider"/>
// <p className="upload-desc">Fotografiile sunt destinate exclusiv mirilor și vor fi disponibile în albumul online pe toată durata existenței evenimentului.</p>
// <label className="consent-block">
//   <input type="checkbox" id="consent" className="consent-checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}/>
//   <span className="consent-text">Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora în albumul privat al mirilor.</span>
// </label>
//               {agreed ? (
//                 <label className="upload-label-btn" style={{cursor:'pointer'}}>
//                   <span>{uploading ? (<><span className="upload-spinner"/>{' '}SE ÎNCARCĂ...</>) : ('◆ SELECTEAZĂ POZE ◆')}</span>
//                   <input type="file" multiple accept="image/*" disabled={uploading} style={{ display: 'none' }} onChange={handleFile}/>
//                 </label>
//               ) : (
//                 <button className="upload-label-btn" disabled style={{cursor:'not-allowed'}}><span>◆ SELECTEAZĂ POZE ◆</span></button>
//               )}
//             </>
//           )}

//           <p className="upload-footer">VIBE INVITE · LUXURY EDITION</p>
//         </div>
//       </div>
//     </>
//   );
// }







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
    fetch(`/api/dashboard/summary?slug=${params.slug}`)
      .then(res => res.json())
      .then(data => setOrderId(data.weddingDetails.order_id));
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
          background: #000;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        body {
          font-family: 'Cormorant Garamond', serif;
          color: #fff;
          height: 100%; min-height: 100dvh;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        input, textarea, select { font-size: 16px !important; }

        .lux-upload-page {
          position: fixed; inset: 0;
          width: 100%; height: 100dvh; height: 100vh;
          background: radial-gradient(ellipse 90% 80% at 50% 40%, #1A1408 0%, #0A0803 55%, #040301 100%);
          display: flex; align-items: center; justify-content: center;
          overflow-y: auto; overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: none;
          padding: max(clamp(20px,4vw,40px), env(safe-area-inset-top))
                   max(clamp(16px,4vw,24px), env(safe-area-inset-right))
                   max(clamp(20px,4vw,40px), env(safe-area-inset-bottom))
                   max(clamp(16px,4vw,24px), env(safe-area-inset-left));
        }

        .lux-up-corner { position: fixed; pointer-events: none; z-index: 0; }
        .lux-up-corner.tl { top: 0; left: 0; }
        .lux-up-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
        .lux-up-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .lux-up-corner.br { bottom: 0; right: 0; transform: scale(-1); }
        .lux-up-line {
          position: fixed; left: 5%; right: 5%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,.2), transparent);
          pointer-events: none; z-index: 0;
        }
        .lux-up-line.top    { top: 8%; }
        .lux-up-line.bottom { bottom: 8%; }

        .lux-upload-card {
          position: relative; z-index: 10;
          background: linear-gradient(170deg, #1A1408, #0A0803);
          border: 1px solid rgba(212,175,55,.22);
          border-radius: 20px;
          padding: clamp(32px,5vw,52px) clamp(24px,5vw,44px);
          max-width: 440px; width: 100%;
          box-shadow: 0 30px 80px rgba(0,0,0,.8), 0 0 40px rgba(212,175,55,.06);
          text-align: center;
          animation: lux-cardReveal .6s cubic-bezier(.4,0,.2,1) both;
          overflow: hidden;
        }
        .lux-card-top-line {
          position: absolute; top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent);
        }
        .lux-card-corner { position: absolute; width: 14px; height: 14px; border-color: rgba(212,175,55,.3); }
        .lux-card-corner.tl { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
        .lux-card-corner.tr { top: 10px; right: 10px; border-top: 1px solid; border-right: 1px solid; }
        .lux-card-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid; border-left: 1px solid; }
        .lux-card-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }

        .lux-camera-circle {
          width: clamp(64px,12vw,80px); height: clamp(64px,12vw,80px);
          border-radius: 50%;
          background: rgba(212,175,55,.1);
          border: 2px solid rgba(212,175,55,.28);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto clamp(16px,3vw,24px);
        }

        .lux-upload-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: clamp(8px,1vw,10px);
          letter-spacing: .32em; text-transform: uppercase;
          color: rgba(212,175,55,.55); margin-bottom: 10px;
        }
        .lux-upload-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px,4vw,34px);
          font-style: italic; font-weight: 300;
          color: #F5E6A8; margin-bottom: 10px; line-height: 1.2;
        }
        .lux-upload-divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent);
          margin: 0 auto 18px;
        }
        .lux-upload-desc {
          font-size: clamp(13px,1.6vw,16px);
          font-style: italic; color: rgba(212,175,55,.55);
          line-height: 1.8; margin-bottom: 24px;
        }

        .lux-consent-block {
          display: flex; align-items: flex-start; gap: 12px;
          background: rgba(212,175,55,.04);
          border: 1px solid rgba(212,175,55,.15);
          border-radius: 10px; padding: 14px 16px;
          margin-bottom: 24px; text-align: left;
          cursor: pointer; transition: border-color .2s, background .2s;
        }
        .lux-consent-block:hover { border-color: rgba(212,175,55,.3); background: rgba(212,175,55,.07); }
        .lux-consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #D4AF37; cursor: pointer; }
        .lux-consent-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px,1.5vw,14px);
          font-style: italic; color: rgba(212,175,55,.6);
          line-height: 1.7; cursor: pointer;
        }

        .lux-upload-btn {
          display: block; width: 100%;
          padding: clamp(14px,2vw,18px) 0;
          border-radius: 4px;
          background: linear-gradient(135deg, #8B6914 0%, #D4AF37 45%, #F5D678 55%, #D4AF37 70%, #8B6914 100%);
          color: #0A0803;
          font-family: 'Cinzel', serif;
          font-size: clamp(10px,1.3vw,13px); font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase;
          cursor: pointer; border: none; text-align: center;
          box-shadow: 0 8px 32px rgba(212,175,55,.3);
          transition: transform .2s, box-shadow .2s, opacity .2s;
          position: relative; overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .lux-upload-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
          background-size: 350px 100%;
          animation: lux-shimmer 3s linear infinite;
        }
        .lux-upload-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(212,175,55,.5); }
        .lux-upload-btn:disabled { opacity: .3; cursor: not-allowed; background: rgba(212,175,55,.3); box-shadow: none; }
        .lux-upload-btn span { position: relative; z-index: 1; }

        /* ── PROGRESS ── */
        .lux-progress-wrap {
          margin-top: 20px;
          animation: lux-fadeUp .4s ease both;
        }
        .lux-progress-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }
        .lux-progress-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(9px,1.2vw,11px);
          letter-spacing: .22em; text-transform: uppercase;
          color: rgba(212,175,55,.5);
        }
        .lux-progress-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(15px,2.5vw,19px);
          font-style: italic; color: #F5E6A8; line-height: 1;
        }
        .lux-progress-counter span {
          font-size: clamp(11px,1.5vw,13px);
          color: rgba(212,175,55,.4);
          font-style: normal; font-family: 'Cinzel', serif; letter-spacing: .1em;
        }
        .lux-progress-track {
          width: 100%; height: 6px;
          background: rgba(212,175,55,.1);
          border-radius: 100px; overflow: hidden;
          border: 1px solid rgba(212,175,55,.15);
          margin-bottom: 8px;
        }
        .lux-progress-bar {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, #8B6914, #D4AF37, #F5D678);
          box-shadow: 0 0 8px rgba(212,175,55,.4);
          transition: width .35s cubic-bezier(.4,0,.2,1);
        }
        .lux-progress-names {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px,1.5vw,14px);
          font-style: italic; color: rgba(212,175,55,.45);
          text-align: center; min-height: 20px;
        }

        /* ── SUCCESS ── */
        .lux-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
        .lux-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px,4vw,32px);
          font-style: italic; font-weight: 300;
          color: #F5E6A8; margin-bottom: 10px;
        }
        .lux-success-text {
          font-style: italic;
          font-size: clamp(14px,1.7vw,17px);
          color: rgba(212,175,55,.6); line-height: 1.8;
        }
        .lux-success-stats {
          display: flex; justify-content: center; gap: 20px;
          margin: 18px 0; flex-wrap: wrap;
        }
        .lux-success-stat {
          text-align: center; padding: 10px 18px;
          background: rgba(212,175,55,.06);
          border: 1px solid rgba(212,175,55,.18);
          border-radius: 8px; min-width: 80px;
        }
        .lux-success-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px,4vw,30px);
          font-style: italic; color: #F5E6A8; line-height: 1;
          margin-bottom: 4px;
        }
        .lux-success-stat-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(7px,.9vw,9px);
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(212,175,55,.35);
        }
        .lux-success-stat.failed .lux-success-stat-num { color: rgba(220,120,80,.7); }
        .lux-success-stat.failed .lux-success-stat-label { color: rgba(220,120,80,.4); }

        .lux-upload-footer {
          font-family: 'Cinzel', serif;
          font-size: clamp(7px,.9vw,9px);
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(212,175,55,.25);
          margin-top: clamp(20px,3vw,28px);
        }

        .lux-upload-spinner {
          display: inline-block; width: 16px; height: 16px;
          border: 2px solid rgba(10,8,3,.3);
          border-top-color: #0A0803; border-radius: 50%;
          animation: lux-spin .7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }

        @keyframes lux-cardReveal {
          from { opacity: 0; transform: translateY(24px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lux-shimmer {
          0%   { background-position: -350px 0; }
          100% { background-position:  350px 0; }
        }
        @keyframes lux-spin { to { transform: rotate(360deg); } }
        @keyframes lux-fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="lux-upload-page">

        <svg className="lux-up-corner tl" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#luxg1)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#luxg1)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#luxg1)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="luxg1" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="lux-up-corner tr" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#luxg2)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#luxg2)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#luxg2)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="luxg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="lux-up-corner bl" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#luxg3)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#luxg3)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#luxg3)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="luxg3" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="lux-up-corner br" viewBox="0 0 160 160" fill="none" style={{width:'min(160px,20vw)',height:'min(160px,20vw)',opacity:.55}}>
          <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#luxg4)" strokeWidth="1.2"/>
          <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#luxg4)" strokeWidth=".7" strokeOpacity=".6"/>
          <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#luxg4)" fillOpacity=".8"/>
          <defs>
            <linearGradient id="luxg4" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="lux-up-line top"/>
        <div className="lux-up-line bottom"/>

        <div className="lux-upload-card">
          <div className="lux-card-top-line"/>
          <div className="lux-card-corner tl"/><div className="lux-card-corner tr"/>
          <div className="lux-card-corner bl"/><div className="lux-card-corner br"/>

          <div className="lux-camera-circle">
            <svg viewBox="0 0 48 48" fill="none" style={{width:'clamp(32px,6vw,42px)',height:'clamp(32px,6vw,42px)'}}>
              <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
              <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".25"/>
              <circle cx="37" cy="20" r="2" fill="#D4AF37" fillOpacity=".5"/>
            </svg>
          </div>

          {uploaded ? (
            <>
              <div className="lux-success-icon">
                <svg viewBox="0 0 60 60" fill="none" style={{width:52,height:52}}>
                  <circle cx="30" cy="30" r="28" stroke="url(#luxSucGrad)" strokeWidth="1.2"/>
                  <path d="M18 30 L26 38 L42 22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="luxSucGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#8B6914"/>
                      <stop offset="50%" stopColor="#D4AF37"/>
                      <stop offset="100%" stopColor="#8B6914"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="lux-upload-eyebrow">◆ Trimis cu succes ◆</p>
              <h2 className="lux-success-title">Mulțumim! ✦</h2>
              <div className="lux-upload-divider"/>

              <div className="lux-success-stats">
                <div className="lux-success-stat">
                  <div className="lux-success-stat-num">{successCount}</div>
                  <div className="lux-success-stat-label">
                    {successCount === 1 ? 'Poză trimisă' : 'Poze trimise'}
                  </div>
                </div>
                {failedFiles > 0 && (
                  <div className="lux-success-stat failed">
                    <div className="lux-success-stat-num">{failedFiles}</div>
                    <div className="lux-success-stat-label">
                      {failedFiles === 1 ? 'Eroare' : 'Erori'}
                    </div>
                  </div>
                )}
              </div>

              <p className="lux-success-text">
                {failedFiles === 0
                  ? 'Pozele au fost trimise cu succes mirilor. Abia așteptăm să le vedem!'
                  : `${successCount} ${successCount === 1 ? 'poză trimisă' : 'poze trimise'} cu succes. ${failedFiles} ${failedFiles === 1 ? 'fișier nu a putut fi încărcat' : 'fișiere nu au putut fi încărcate'}.`
                }
              </p>
            </>
          ) : (
            <>
              <p className="lux-upload-eyebrow">◆ Galerie Foto Live ◆</p>
              <h2 className="lux-upload-title">Încarcă Poze</h2>
              <div className="lux-upload-divider"/>
              <p className="lux-upload-desc">
                Fotografiile sunt destinate exclusiv mirilor și vor fi disponibile în albumul online pe toată durata existenței evenimentului.
              </p>

              <label className="lux-consent-block">
                <input
                  type="checkbox"
                  className="lux-consent-checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                />
                <span className="lux-consent-text">
                  Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora în albumul privat al mirilor.
                </span>
              </label>

              {agreed ? (
                <label className="lux-upload-btn" style={{cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? .75 : 1}}>
                  <span>
                    {uploading
                      ? <><span className="lux-upload-spinner"/>SE ÎNCARCĂ...</>
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
                <button className="lux-upload-btn" disabled>
                  <span>◆ SELECTEAZĂ POZE ◆</span>
                </button>
              )}

              {uploading && totalFiles > 0 && (
                <div className="lux-progress-wrap">
                  <div className="lux-progress-header">
                    <span className="lux-progress-label">Se încarcă...</span>
                    <span className="lux-progress-counter">
                      {doneFiles} <span>/ {totalFiles} poze</span>
                    </span>
                  </div>
                  <div className="lux-progress-track">
                    <div className="lux-progress-bar" style={{ width: `${progressPct}%` }}/>
                  </div>
                  <p className="lux-progress-names">
                    {doneFiles < totalFiles
                      ? `Se procesează poza ${doneFiles + 1} din ${totalFiles}...`
                      : 'Finalizare...'
                    }
                  </p>
                </div>
              )}
            </>
          )}

          <p className="lux-upload-footer">VIBE INVITE · LUXURY EDITION</p>
        </div>
      </div>
    </>
  );
}