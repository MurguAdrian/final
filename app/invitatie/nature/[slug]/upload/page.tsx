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
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html {
//           height: 100%;
//           min-height: 100dvh;
//           background: #FDFAF2;
//           -webkit-font-smoothing: antialiased;
//           overscroll-behavior: none;
//         }
//         body {
//           font-family: 'Lato', sans-serif;
//           color: #1C2218;
//           height: 100%;
//           min-height: 100dvh;
//           overflow-x: hidden;
//           overscroll-behavior: none;
//           -webkit-text-size-adjust: 100%;
//           text-size-adjust: 100%;
//         }
//         input, textarea, select { font-size: 16px !important; }

//         .nat-upload-page {
//           min-height: 100dvh; width: 100%;
//           background: radial-gradient(ellipse 70% 60% at 18% 22%, rgba(140,190,130,.13) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 82% 78%, rgba(225,205,148,.16) 0%, transparent 55%), linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%);
//           display: flex; align-items: center; justify-content: center;
//           padding: clamp(20px, 4vw, 40px) clamp(16px, 4vw, 24px);
//           position: relative; overflow: hidden;
//           padding-bottom: max(clamp(20px, 4vw, 40px), env(safe-area-inset-bottom));
//         }

//         .nat-up-corner { position: absolute; pointer-events: none; }
//         .nat-up-corner.tl { top: 0; left: 0; width: min(160px,20vw); height: min(160px,20vw); opacity: .72; }
//         .nat-up-corner.tr { top: 0; right: 0; width: min(160px,20vw); height: min(160px,20vw); opacity: .72; transform: scaleX(-1); }
//         .nat-up-corner.bl { bottom: 0; left: 0; width: min(140px,18vw); height: min(140px,18vw); opacity: .65; transform: scaleY(-1); }
//         .nat-up-corner.br { bottom: 0; right: 0; width: min(140px,18vw); height: min(140px,18vw); opacity: .65; transform: scale(-1); }

//         .nat-upload-card {
//           position: relative; z-index: 10;
//           background: rgba(255,255,255,.82);
//           border: 1px solid rgba(154,123,63,.22);
//           border-radius: 24px;
//           padding: clamp(32px, 5vw, 52px) clamp(24px, 5vw, 44px);
//           max-width: 440px; width: 100%;
//           box-shadow: 0 20px 60px rgba(26,38,20,.1), 0 4px 20px rgba(26,38,20,.06);
//           text-align: center;
//           animation: natCardReveal .6s cubic-bezier(.4,0,.2,1) both;
//           overflow: hidden;
//           backdrop-filter: blur(12px);
//         }
//         .nat-card-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(154,123,63,.42), transparent); }
//         .nat-card-corner { position: absolute; width: 14px; height: 14px; border-color: rgba(154,123,63,.3); }
//         .nat-card-corner.tl { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
//         .nat-card-corner.tr { top: 10px; right: 10px; border-top: 1px solid; border-right: 1px solid; }
//         .nat-card-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid; border-left: 1px solid; }
//         .nat-card-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }

//         .nat-camera-circle { width: clamp(64px, 12vw, 80px); height: clamp(64px, 12vw, 80px); border-radius: 50%; background: rgba(58,94,51,.1); border: 2px solid rgba(58,94,51,.2); display: flex; align-items: center; justify-content: center; margin: 0 auto clamp(16px, 3vw, 24px); }
//         .nat-upload-eyebrow { font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px); letter-spacing: .28em; text-transform: uppercase; color: #9A7B3F; margin-bottom: 10px; opacity: .82; }
//         .nat-upload-title { font-family: 'Playfair Display', serif; font-size: clamp(26px, 4vw, 34px); font-style: italic; font-weight: 400; color: '#1C2218'; margin-bottom: 10px; line-height: 1.2; }
//         .nat-upload-divider { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(154,123,63,.5), transparent); margin: 0 auto 18px; }
//         .nat-upload-desc { font-family: 'Cormorant', serif; font-size: clamp(13px, 1.6vw, 16px); font-style: italic; color: #6B7A5E; line-height: 1.8; margin-bottom: 24px; }

//         .nat-consent-block { display: flex; align-items: flex-start; gap: 12px; background: rgba(235,244,231,.5); border: 1px solid rgba(154,123,63,.18); border-radius: 12px; padding: 14px 16px; margin-bottom: 24px; text-align: left; cursor: pointer; transition: border-color .2s, background .2s; }
//         .nat-consent-block:hover { border-color: rgba(154,123,63,.38); background: rgba(235,244,231,.8); }
//         .nat-consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #3A5E33; cursor: pointer; }
//         .nat-consent-text { font-family: 'Cormorant', serif; font-size: clamp(12px, 1.5vw, 14px); font-style: italic; color: #6B7A5E; line-height: 1.7; cursor: pointer; }

//         .nat-upload-label-btn { display: block; width: 100%; padding: clamp(14px, 2vw, 18px) 0; border-radius: 100px; background: linear-gradient(135deg, #3A5E33 0%, #274422 100%); color: #fff; font-family: 'Cinzel', serif; font-size: clamp(10px, 1.3vw, 13px); font-weight: 600; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; border: none; text-align: center; box-shadow: 0 8px 28px rgba(58,94,51,.32); transition: transform .2s, box-shadow .2s, opacity .2s; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; }
//         .nat-upload-label-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent); background-size: 350px 100%; animation: shimmer 3s linear infinite; }
//         .nat-upload-label-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(58,94,51,.45); }
//         .nat-upload-label-btn:disabled { opacity: .3; cursor: not-allowed; background: rgba(58,94,51,.3); box-shadow: none; }
//         .nat-upload-label-btn span { position: relative; z-index: 1; }

//         .nat-upload-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
//         .nat-upload-success-title { font-family: 'Playfair Display', serif; font-size: clamp(24px, 4vw, 32px); font-style: italic; font-weight: 400; color: '#3A5E33'; margin-bottom: 10px; }
//         .nat-upload-success-text { font-family: 'Cormorant', serif; font-style: italic; font-size: clamp(14px, 1.7vw, 17px); color: #6B7A5E; line-height: 1.8; }
//         .nat-upload-footer { font-family: 'Cinzel', serif; font-size: clamp(7px, .9vw, 9px); letter-spacing: .2em; text-transform: uppercase; color: rgba(107,122,94,.35); margin-top: clamp(20px, 3vw, 28px); }
//         .nat-upload-spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; vertical-align: middle; margin-right: 8px; }

//         @keyframes natCardReveal { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
//         @keyframes shimmer { 0% { background-position: -350px 0; } 100% { background-position: 350px 0; } }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>

//       <div className="nat-upload-page">
//         {/* Botanical corners */}
//         <svg className="nat-up-corner tl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38" />
//           <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round" />
//           <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)" />
//         </svg>
//         <svg className="nat-up-corner tr" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38" />
//           <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round" />
//           <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)" />
//         </svg>
//         <svg className="nat-up-corner bl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38" />
//           <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round" />
//           <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)" />
//         </svg>
//         <svg className="nat-up-corner br" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42" />
//           <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38" />
//           <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round" />
//           <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)" />
//         </svg>

//         <div className="nat-upload-card">
//           <div className="nat-card-top-line" />
//           <div className="nat-card-corner tl" /><div className="nat-card-corner tr" />
//           <div className="nat-card-corner bl" /><div className="nat-card-corner br" />

//           <div className="nat-camera-circle">
//             <svg viewBox="0 0 48 48" fill="none" style={{ width: 'clamp(32px,6vw,42px)', height: 'clamp(32px,6vw,42px)' } as React.CSSProperties}>
//               <rect x="4" y="14" width="40" height="28" rx="4" stroke="#3A5E33" strokeWidth="1.8" strokeOpacity=".7" />
//               <path d="M14 14 L17 8 L31 8 L34 14" stroke="#3A5E33" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round" />
//               <circle cx="24" cy="28" r="8" stroke="#3A5E33" strokeWidth="1.5" strokeOpacity=".7" />
//               <circle cx="24" cy="28" r="4" fill="#3A5E33" fillOpacity=".25" />
//               <circle cx="37" cy="20" r="2" fill="#3A5E33" fillOpacity=".5" />
//             </svg>
//           </div>

//           {uploaded ? (
//             <>
//               <div className="nat-upload-success-icon">
//                 <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(58,94,51,.1)', border: '2px solid rgba(58,94,51,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✅</div>
//               </div>
//               <p className="nat-upload-eyebrow">✦ Trimis cu succes ✦</p>
//               <h2 className="nat-upload-success-title" style={{ color: '#3A5E33' }}>Mulțumim! 🌿</h2>
//               <div className="nat-upload-divider" />
//               <p className="nat-upload-success-text">Pozele au fost trimise cu succes mirilor.<br />Abia așteptăm să le vedem!</p>
//             </>
//           ) : (
//             <>
//               <p className="nat-upload-eyebrow">✦ Galerie Foto Live ✦</p>
//               <h2 className="nat-upload-title" style={{ color: '#1C2218' }}>Încarcă Poze</h2>
//               <div className="nat-upload-divider" />
//               <p className="nat-upload-desc">Fotografiile sunt destinate exclusiv mirilor și vor fi stocate maximum 30 de zile, după care vor fi șterse automat.</p>
//               <label className="nat-consent-block">
//                 <input type="checkbox" className="nat-consent-checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
//                 <span className="nat-consent-text">Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora timp de maximum 30 de zile, exclusiv pentru mirii evenimentului.</span>
//               </label>
//               {agreed ? (
//                 <label className="nat-upload-label-btn" style={{ cursor: 'pointer' }}>
//                   <span>{uploading ? (<><span className="nat-upload-spinner" />{' '}SE ÎNCARCĂ...</>) : ('✦ SELECTEAZĂ POZE ✦')}</span>
//                   <input type="file" multiple accept="image/*" disabled={uploading} style={{ display: 'none' }} onChange={handleFile} />
//                 </label>
//               ) : (
//                 <button className="nat-upload-label-btn" disabled style={{ cursor: 'not-allowed' }}><span>✦ SELECTEAZĂ POZE ✦</span></button>
//               )}
//             </>
//           )}

//           <p className="nat-upload-footer">VIBE INVITE · NATURE EDITION</p>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html {
          height: 100%; min-height: 100dvh;
          background: #FDFAF2;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        body {
          font-family: 'Lato', sans-serif;
          color: #1C2218;
          height: 100%; min-height: 100dvh;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        input, textarea, select { font-size: 16px !important; }

        .nat-upload-page {
          position: fixed; inset: 0;
          width: 100%; height: 100dvh; height: 100vh;
          background: radial-gradient(ellipse 70% 60% at 18% 22%, rgba(140,190,130,.13) 0%, transparent 55%),
                      radial-gradient(ellipse 60% 55% at 82% 78%, rgba(225,205,148,.16) 0%, transparent 55%),
                      linear-gradient(155deg, #FDFAF2 0%, #F3EED8 45%, #EDF5E8 100%);
          display: flex; align-items: center; justify-content: center;
          overflow-y: auto; overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: none;
          padding: max(clamp(20px,4vw,40px), env(safe-area-inset-top))
                   max(clamp(16px,4vw,24px), env(safe-area-inset-right))
                   max(clamp(20px,4vw,40px), env(safe-area-inset-bottom))
                   max(clamp(16px,4vw,24px), env(safe-area-inset-left));
        }

        .nat-up-corner { position: fixed; pointer-events: none; z-index: 0; }
        .nat-up-corner.tl { top: 0; left: 0; width: min(160px,20vw); height: min(160px,20vw); opacity: .72; }
        .nat-up-corner.tr { top: 0; right: 0; width: min(160px,20vw); height: min(160px,20vw); opacity: .72; transform: scaleX(-1); }
        .nat-up-corner.bl { bottom: 0; left: 0; width: min(140px,18vw); height: min(140px,18vw); opacity: .65; transform: scaleY(-1); }
        .nat-up-corner.br { bottom: 0; right: 0; width: min(140px,18vw); height: min(140px,18vw); opacity: .65; transform: scale(-1); }

        .nat-upload-card {
          position: relative; z-index: 10;
          background: rgba(255,255,255,.82);
          border: 1px solid rgba(154,123,63,.22);
          border-radius: 24px;
          padding: clamp(32px,5vw,52px) clamp(24px,5vw,44px);
          max-width: 440px; width: 100%;
          box-shadow: 0 20px 60px rgba(26,38,20,.1), 0 4px 20px rgba(26,38,20,.06);
          text-align: center;
          animation: natCardReveal .6s cubic-bezier(.4,0,.2,1) both;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .nat-card-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(154,123,63,.42), transparent); }
        .nat-card-corner { position: absolute; width: 14px; height: 14px; border-color: rgba(154,123,63,.3); }
        .nat-card-corner.tl { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
        .nat-card-corner.tr { top: 10px; right: 10px; border-top: 1px solid; border-right: 1px solid; }
        .nat-card-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid; border-left: 1px solid; }
        .nat-card-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }

        .nat-camera-circle {
          width: clamp(64px,12vw,80px); height: clamp(64px,12vw,80px);
          border-radius: 50%;
          background: rgba(58,94,51,.1);
          border: 2px solid rgba(58,94,51,.2);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto clamp(16px,3vw,24px);
        }

        .nat-upload-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: clamp(8px,1vw,10px);
          letter-spacing: .28em; text-transform: uppercase;
          color: #9A7B3F; margin-bottom: 10px; opacity: .82;
        }
        .nat-upload-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px,4vw,34px);
          font-style: italic; font-weight: 400;
          color: #1C2218; margin-bottom: 10px; line-height: 1.2;
        }
        .nat-upload-divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(154,123,63,.5), transparent);
          margin: 0 auto 18px;
        }
        .nat-upload-desc {
          font-family: 'Cormorant', serif;
          font-size: clamp(13px,1.6vw,16px);
          font-style: italic; color: #6B7A5E;
          line-height: 1.8; margin-bottom: 24px;
        }

        .nat-consent-block {
          display: flex; align-items: flex-start; gap: 12px;
          background: rgba(235,244,231,.5);
          border: 1px solid rgba(154,123,63,.18);
          border-radius: 12px; padding: 14px 16px;
          margin-bottom: 24px; text-align: left;
          cursor: pointer; transition: border-color .2s, background .2s;
        }
        .nat-consent-block:hover { border-color: rgba(154,123,63,.38); background: rgba(235,244,231,.8); }
        .nat-consent-checkbox { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: #3A5E33; cursor: pointer; }
        .nat-consent-text {
          font-family: 'Cormorant', serif;
          font-size: clamp(12px,1.5vw,14px);
          font-style: italic; color: #6B7A5E;
          line-height: 1.7; cursor: pointer;
        }

        .nat-upload-label-btn {
          display: block; width: 100%;
          padding: clamp(14px,2vw,18px) 0;
          border-radius: 100px;
          background: linear-gradient(135deg, #3A5E33 0%, #274422 100%);
          color: #fff; font-family: 'Cinzel', serif;
          font-size: clamp(10px,1.3vw,13px); font-weight: 600;
          letter-spacing: .2em; text-transform: uppercase;
          cursor: pointer; border: none; text-align: center;
          box-shadow: 0 8px 28px rgba(58,94,51,.32);
          transition: transform .2s, box-shadow .2s, opacity .2s;
          position: relative; overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .nat-upload-label-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent);
          background-size: 350px 100%;
          animation: nat-shimmer 3s linear infinite;
        }
        .nat-upload-label-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(58,94,51,.45); }
        .nat-upload-label-btn:disabled { opacity: .3; cursor: not-allowed; background: rgba(58,94,51,.3); box-shadow: none; }
        .nat-upload-label-btn span { position: relative; z-index: 1; }

        /* ── PROGRESS ── */
        .nat-progress-wrap {
          margin-top: 20px;
          animation: nat-fadeUp .4s ease both;
        }
        .nat-progress-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }
        .nat-progress-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(9px,1.2vw,11px);
          letter-spacing: .22em; text-transform: uppercase;
          color: rgba(107,122,94,.7);
        }
        .nat-progress-counter {
          font-family: 'Playfair Display', serif;
          font-size: clamp(15px,2.5vw,19px);
          font-style: italic; color: #3A5E33; line-height: 1;
        }
        .nat-progress-counter span {
          font-size: clamp(11px,1.5vw,13px);
          color: rgba(107,122,94,.5);
          font-style: normal; font-family: 'Cinzel', serif; letter-spacing: .1em;
        }
        .nat-progress-track {
          width: 100%; height: 6px;
          background: rgba(58,94,51,.1);
          border-radius: 100px; overflow: hidden;
          border: 1px solid rgba(154,123,63,.15);
          margin-bottom: 8px;
        }
        .nat-progress-bar {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, #274422, #3A5E33, #5C8A52);
          box-shadow: 0 0 8px rgba(58,94,51,.35);
          transition: width .35s cubic-bezier(.4,0,.2,1);
        }
        .nat-progress-names {
          font-family: 'Cormorant', serif;
          font-size: clamp(12px,1.5vw,14px);
          font-style: italic; color: rgba(107,122,94,.6);
          text-align: center; min-height: 20px;
        }

        /* ── SUCCESS ── */
        .nat-upload-success-icon { display: flex; justify-content: center; margin-bottom: 16px; }
        .nat-upload-success-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px,4vw,32px);
          font-style: italic; font-weight: 400;
          color: #3A5E33; margin-bottom: 10px;
        }
        .nat-upload-success-text {
          font-family: 'Cormorant', serif;
          font-style: italic;
          font-size: clamp(14px,1.7vw,17px);
          color: #6B7A5E; line-height: 1.8;
        }
        .nat-success-stats {
          display: flex; justify-content: center; gap: 20px;
          margin: 18px 0; flex-wrap: wrap;
        }
        .nat-success-stat {
          text-align: center; padding: 10px 18px;
          background: rgba(58,94,51,.05);
          border: 1px solid rgba(154,123,63,.18);
          border-radius: 12px; min-width: 80px;
        }
        .nat-success-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px,4vw,30px);
          font-style: italic; color: #3A5E33; line-height: 1;
          margin-bottom: 4px;
        }
        .nat-success-stat-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(7px,.9vw,9px);
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(107,122,94,.5);
        }
        .nat-success-stat.failed .nat-success-stat-num { color: rgba(160,80,40,.7); }
        .nat-success-stat.failed .nat-success-stat-label { color: rgba(160,80,40,.4); }

        .nat-upload-footer {
          font-family: 'Cinzel', serif;
          font-size: clamp(7px,.9vw,9px);
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(107,122,94,.35);
          margin-top: clamp(20px,3vw,28px);
        }

        .nat-upload-spinner {
          display: inline-block; width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff; border-radius: 50%;
          animation: nat-spin .7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }

        @keyframes natCardReveal {
          from { opacity: 0; transform: translateY(24px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes nat-shimmer {
          0%   { background-position: -350px 0; }
          100% { background-position:  350px 0; }
        }
        @keyframes nat-spin { to { transform: rotate(360deg); } }
        @keyframes nat-fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="nat-upload-page">

        {/* Botanical corners */}
        <svg className="nat-up-corner tl" viewBox="0 0 200 200" fill="none">
          <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38"/>
          <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
          <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)"/>
        </svg>
        <svg className="nat-up-corner tr" viewBox="0 0 200 200" fill="none">
          <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38"/>
          <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
          <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)"/>
        </svg>
        <svg className="nat-up-corner bl" viewBox="0 0 200 200" fill="none">
          <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38"/>
          <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
          <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)"/>
        </svg>
        <svg className="nat-up-corner br" viewBox="0 0 200 200" fill="none">
          <path d="M12 12 L12 96" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <path d="M12 12 L96 12" stroke="#8A6B2E" strokeWidth="1.2" strokeOpacity=".42"/>
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="#8A6B2E" strokeWidth="1" strokeOpacity=".38"/>
          <path d="M30 30 Q54 70 92 104" stroke="#5C8A52" strokeWidth="1.1" strokeOpacity=".35" fill="none" strokeLinecap="round"/>
          <ellipse cx="52" cy="58" rx="14" ry="6" fill="#7AB86A" fillOpacity=".32" transform="rotate(44 52 58)"/>
        </svg>

        <div className="nat-upload-card">
          <div className="nat-card-top-line"/>
          <div className="nat-card-corner tl"/><div className="nat-card-corner tr"/>
          <div className="nat-card-corner bl"/><div className="nat-card-corner br"/>

          <div className="nat-camera-circle">
            <svg viewBox="0 0 48 48" fill="none" style={{width:'clamp(32px,6vw,42px)',height:'clamp(32px,6vw,42px)'}}>
              <rect x="4" y="14" width="40" height="28" rx="4" stroke="#3A5E33" strokeWidth="1.8" strokeOpacity=".7"/>
              <path d="M14 14 L17 8 L31 8 L34 14" stroke="#3A5E33" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
              <circle cx="24" cy="28" r="8" stroke="#3A5E33" strokeWidth="1.5" strokeOpacity=".7"/>
              <circle cx="24" cy="28" r="4" fill="#3A5E33" fillOpacity=".25"/>
              <circle cx="37" cy="20" r="2" fill="#3A5E33" fillOpacity=".5"/>
            </svg>
          </div>

          {uploaded ? (
            <>
              <div className="nat-upload-success-icon">
                <div style={{width:56,height:56,borderRadius:'50%',background:'rgba(58,94,51,.1)',border:'2px solid rgba(58,94,51,.28)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>✅</div>
              </div>
              <p className="nat-upload-eyebrow">✦ Trimis cu succes ✦</p>
              <h2 className="nat-upload-success-title">Mulțumim! 🌿</h2>
              <div className="nat-upload-divider"/>

              <div className="nat-success-stats">
                <div className="nat-success-stat">
                  <div className="nat-success-stat-num">{successCount}</div>
                  <div className="nat-success-stat-label">
                    {successCount === 1 ? 'Poză trimisă' : 'Poze trimise'}
                  </div>
                </div>
                {failedFiles > 0 && (
                  <div className="nat-success-stat failed">
                    <div className="nat-success-stat-num">{failedFiles}</div>
                    <div className="nat-success-stat-label">
                      {failedFiles === 1 ? 'Eroare' : 'Erori'}
                    </div>
                  </div>
                )}
              </div>

              <p className="nat-upload-success-text">
                {failedFiles === 0
                  ? 'Pozele au fost trimise cu succes mirilor. Abia așteptăm să le vedem!'
                  : `${successCount} ${successCount === 1 ? 'poză trimisă' : 'poze trimise'} cu succes. ${failedFiles} ${failedFiles === 1 ? 'fișier nu a putut fi încărcat' : 'fișiere nu au putut fi încărcate'}.`
                }
              </p>
            </>
          ) : (
            <>
              <p className="nat-upload-eyebrow">✦ Galerie Foto Live ✦</p>
              <h2 className="nat-upload-title">Încarcă Poze</h2>
              <div className="nat-upload-divider"/>
              <p className="nat-upload-desc">
                Fotografiile sunt destinate exclusiv mirilor și vor fi stocate maximum 30 de zile, după care vor fi șterse automat.
              </p>

              <label className="nat-consent-block">
                <input
                  type="checkbox"
                  className="nat-consent-checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                />
                <span className="nat-consent-text">
                  Confirm că am acordul persoanelor din fotografii și sunt de acord cu stocarea acestora timp de maximum 30 de zile, exclusiv pentru mirii evenimentului.
                </span>
              </label>

              {agreed ? (
                <label className="nat-upload-label-btn" style={{cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? .75 : 1}}>
                  <span>
                    {uploading
                      ? <><span className="nat-upload-spinner"/>SE ÎNCARCĂ...</>
                      : '✦ SELECTEAZĂ POZE ✦'
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
                <button className="nat-upload-label-btn" disabled>
                  <span>✦ SELECTEAZĂ POZE ✦</span>
                </button>
              )}

              {uploading && totalFiles > 0 && (
                <div className="nat-progress-wrap">
                  <div className="nat-progress-header">
                    <span className="nat-progress-label">Se încarcă...</span>
                    <span className="nat-progress-counter">
                      {doneFiles} <span>/ {totalFiles} poze</span>
                    </span>
                  </div>
                  <div className="nat-progress-track">
                    <div className="nat-progress-bar" style={{ width: `${progressPct}%` }}/>
                  </div>
                  <p className="nat-progress-names">
                    {doneFiles < totalFiles
                      ? `Se procesează poza ${doneFiles + 1} din ${totalFiles}...`
                      : 'Finalizare...'
                    }
                  </p>
                </div>
              )}
            </>
          )}

          <p className="nat-upload-footer">VIBE INVITE · NATURE EDITION</p>
        </div>
      </div>
    </>
  );
}