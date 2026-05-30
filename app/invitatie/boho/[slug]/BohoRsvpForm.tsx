"use client";
import React, { useState } from 'react';

export default function BohoRsvpForm({ orderId, showAccommodation, showTransport }: any) {
  const [submitted, setSubmitted] = useState(false);
  const [isComing, setIsComing] = useState("true");
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate GDPR consent
    if (!gdprConsent) {
      alert('Vă rugăm să acceptați colectarea datelor personale pentru a continua.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload = {
      orderId,
      guestName: formData.get("guestName"),
      isComing: isComing === "true",
      partnerName: formData.get("partnerName") || null,
      plusOne: !!formData.get("partnerName"),
      adultsCount: isComing === "true" ? 1 : 0,
      kidsCount: parseInt(formData.get("kidsCount") as string) || 0,
      dietaryPreferences: formData.get("dietary") || null,
      needsAccommodation: formData.get("accommodation") === "true",
      needsTransport: formData.get("transport") === "true",
      otherMentions: formData.get("mentions") || null
    };

    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <style>{FONTS_CSS}</style>
        <div style={confirmationBox}>
          <div style={{ marginBottom:20 }}>
            <svg viewBox="0 0 60 60" fill="none" style={{ width:56, height:56, display:'block', margin:'0 auto' }}>
              <circle cx="30" cy="30" r="28" stroke="url(#bhCheckGrad)" strokeWidth="1.2"/>
              <path d="M18 30 L26 38 L42 22" stroke="#C17F3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="bhCheckGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8B6343"/>
                  <stop offset="50%" stopColor="#C17F3E"/>
                  <stop offset="100%" stopColor="#8B6343"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 style={{ fontFamily:"'Dancing Script', cursive", fontSize:'clamp(26px,4vw,36px)', color:'#4A3728', marginBottom:12 }}>
            Mulțumim! 🌿
          </h2>
          <p style={{ fontFamily:"'EB Garamond', serif", fontStyle:'italic', fontSize:'clamp(14px,1.8vw,17px)', color:'rgba(139,99,67,.7)', lineHeight:1.8 }}>
            Confirmarea a fost înregistrată cu succes.<br/>Abia așteptăm să vă avem alături!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{FORM_CSS}</style>
      <form onSubmit={handleSubmit} style={{ width:'100%' }}>
        <div style={{ position:'relative', zIndex:1, animation:'bh-formReveal 0.5s ease both', width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:10 }}>
              <svg viewBox="0 0 120 120" fill="none" style={{ width:52, height:52 }}>
                <circle cx="60" cy="60" r="18" stroke="#C17F3E" strokeWidth="1.2" strokeOpacity=".8"/>
                <circle cx="60" cy="60" r="12" stroke="#C17F3E" strokeWidth=".8" strokeOpacity=".5"/>
                <circle cx="60" cy="60" r="6" fill="#C17F3E" fillOpacity=".4"/>
                {[0,60,120,180,240,300].map((deg) => {
                  const rad=(deg*Math.PI)/180;
                  const x1=60+Math.cos(rad)*22; const y1=60+Math.sin(rad)*22;
                  const x2=60+Math.cos(rad)*46; const y2=60+Math.sin(rad)*46;
                  return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C17F3E" strokeWidth="1.2" strokeOpacity=".7" strokeLinecap="round"/>;
                })}
              </svg>
            </div>
            <p style={{ fontFamily:"'EB Garamond', serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'0.32em', textTransform:'uppercase', fontStyle:'italic', color:'rgba(139,99,67,.6)', marginBottom:8 }}>
              ✿ Confirmare Prezență ✿
            </p>
            <h3 style={{ fontFamily:"'Dancing Script', cursive", fontSize:'clamp(28px,4vw,36px)', color:'#4A3728', marginBottom:4 }}>
              R.S.V.P.
            </h3>
            <div style={{ width:40, height:1, background:'linear-gradient(90deg, transparent, rgba(193,127,62,0.5), transparent)', margin:'8px auto 0' }}/>
          </div>

          <div className="bh-field-block">
            <label className="bh-field-label">Nume și Prenume</label>
            <input name="guestName" required placeholder="ex. Maria Ionescu" className="bh-input" autoComplete="name" autoCapitalize="words"/>
            <span className="bh-field-hint">Vă rugăm introduceți numele complet.</span>
          </div>

          <div className="bh-field-block">
            <label className="bh-field-label">Răspuns</label>
            <div className="bh-radio-group">
              <label className="bh-radio-label">
                <input type="radio" name="raspuns" value="true" defaultChecked onChange={() => setIsComing("true")}/>
                Particip
              </label>
              <label className="bh-radio-label">
                <input type="radio" name="raspuns" value="false" onChange={() => setIsComing("false")}/>
                Nu Particip
              </label>
            </div>
            <span className="bh-field-hint">Selectați "Nu Particip" în cazul în care nu puteți ajunge.</span>
          </div>

          <select onChange={e => setIsComing(e.target.value)} value={isComing} style={{ display:'none' }}>
            <option value="true">VIN CU DRAG</option>
            <option value="false">NU POT</option>
          </select>

          {isComing === "true" && (
            <>
              <div className="bh-field-block">
                <label className="bh-field-label">Nume Partener (opțional)</label>
                <input name="partnerName" placeholder="ex. Ion Ionescu" className="bh-input" autoComplete="off" autoCapitalize="words"/>
                <span className="bh-field-hint">Lăsați gol dacă veniți singur/ă.</span>
              </div>

              <div className="bh-field-block">
                <label className="bh-field-label">Număr Copii</label>
                <input name="kidsCount" type="number" min="0" placeholder="0" className="bh-input bh-input--narrow" inputMode="numeric" pattern="[0-9]*"/>
                <span className="bh-field-hint">Introduceți 0 dacă nu veniți cu copii.</span>
              </div>

              <div className="bh-field-block">
                <label className="bh-field-label">Preferințe Meniu</label>
                <input name="dietary" placeholder="ex. Vegetarian, alergii, etc." className="bh-input" autoComplete="off" autoCapitalize="sentences"/>
                <span className="bh-field-hint">Menționați orice preferință sau restricție alimentară.</span>
              </div>

              {showAccommodation && (
                <div className="bh-field-block">
                  <label className="bh-field-label">Aveți nevoie de cazare?</label>
                  <div className="bh-radio-group">
                    <label className="bh-radio-label"><input type="radio" name="accommodation" value="false" defaultChecked/> Nu, mulțumesc</label>
                    <label className="bh-radio-label"><input type="radio" name="accommodation" value="true"/> Da, am nevoie</label>
                  </div>
                </div>
              )}

              {showTransport && (
                <div className="bh-field-block">
                  <label className="bh-field-label">Aveți nevoie de transport?</label>
                  <div className="bh-radio-group">
                    <label className="bh-radio-label"><input type="radio" name="transport" value="false" defaultChecked/> Nu, mulțumesc</label>
                    <label className="bh-radio-label"><input type="radio" name="transport" value="true"/> Da, am nevoie</label>
                  </div>
                </div>
              )}

              <div className="bh-field-block">
                <label className="bh-field-label">Alte Mențiuni</label>
                <textarea name="mentions" placeholder="Orice altceva doriți să ne comunicați..." className="bh-input" rows={3} style={{ resize:'vertical', minHeight:80 }} autoCapitalize="sentences"/>
              </div>
            </>
          )}

          {/* GDPR Consent Section */}
          <div style={{ background: 'rgba(193,127,62,.06)', border: '1.5px solid rgba(193,127,62,.15)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', marginTop: '24px' }}>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: 'rgba(107,78,42,.7)', lineHeight: '1.6', marginBottom: '12px', fontStyle: 'italic' }}>
              <strong>🔒 Protecția Datelor:</strong> Datele tale personale (nume, preferințe) vor fi colectate și stocate pentru gestionarea acestui eveniment. <strong>NU vom colecta date medicale sau numere de minori.</strong> Datele se vor șterge automat după 12 luni. 
              <a href="https://vibeinvite.ro/politica" target="_blank" rel="noopener noreferrer" style={{ color: '#C17F3E', textDecoration: 'underline', marginLeft: '4px' }}>
                Citire completă
              </a>
            </p>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
              <input 
                type="checkbox" 
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                style={{ marginTop: '3px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#C17F3E' }}
              />
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#4A3728', fontStyle: 'italic', lineHeight: '1.5' }}>
                Sunt de acord cu colectarea și prelucrarea datelor mele personale conform Politicii de Confidențialitate. *
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="bh-submit-btn"
            disabled={!gdprConsent}
            style={{ opacity: !gdprConsent ? 0.6 : 1, cursor: !gdprConsent ? 'not-allowed' : 'pointer' }}
          >
            <span style={{ position:'relative', zIndex:1 }}>✦ Confirmă Prezența ✦</span>
          </button>
        </div>
      </form>
    </>
  );
}

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
`;

const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');

  .bh-input {
    width: 100%;
    background: rgba(255,250,240,.8);
    border: 1.5px solid rgba(193,127,62,.25);
    border-radius: 12px;
    color: #4A3728;
    padding: 14px 16px;
    margin-bottom: 4px;
    font-family: 'EB Garamond', serif;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    appearance: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    display: block;
    min-height: 48px;
  }

  .bh-input::placeholder { color: rgba(139,99,67,.4); font-style: italic; }

  .bh-input:focus {
    border-color: rgba(193,127,62,.65);
    background: rgba(255,250,240,.95);
    box-shadow: 0 0 0 3px rgba(193,127,62,.08);
  }

  .bh-input--narrow { max-width: 140px; }

  .bh-radio-group { display: flex; gap: 10px; flex-wrap: wrap; }

  .bh-radio-label {
    flex: 1;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 14px;
    min-height: 48px;
    border-radius: 12px;
    border: 1.5px solid rgba(193,127,62,.22);
    background: rgba(255,250,240,.8);
    cursor: pointer;
    font-family: 'EB Garamond', serif;
    font-size: 14px;
    font-style: italic;
    color: rgba(107,78,42,.8);
    transition: all 0.2s;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
  }

  .bh-radio-label:hover { border-color: rgba(193,127,62,.5); background: rgba(193,127,62,.1); color: #6B4E2A; }
  .bh-radio-label:active { border-color: rgba(193,127,62,.65); background: rgba(193,127,62,.14); }

  .bh-radio-label input[type="radio"] {
    accent-color: #C17F3E;
    width: 16px; height: 16px;
    flex-shrink: 0;
    margin: 0;
  }

  .bh-field-label {
    display: block;
    font-family: 'EB Garamond', serif;
    font-size: clamp(10px, 1vw, 12px);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-style: italic;
    color: rgba(139,99,67,.65);
    margin-bottom: 10px;
  }

  .bh-field-hint {
    font-family: 'EB Garamond', serif;
    font-size: clamp(11px, 1.2vw, 13px);
    font-style: italic;
    color: rgba(139,99,67,.45);
    margin-top: 7px;
    display: block;
    line-height: 1.5;
  }

  .bh-field-block { margin-bottom: 24px; width: 100%; }

  .bh-submit-btn {
    display: block;
    width: 100%;
    padding: 16px 0;
    min-height: 52px;
    border-radius: 100px;
    background: linear-gradient(135deg, #8B6343 0%, #6B4E2A 100%);
    color: #F5EDD8;
    text-align: center;
    font-family: 'EB Garamond', serif;
    font-size: clamp(13px, 1.5vw, 15px);
    font-style: italic;
    letter-spacing: 0.12em;
    cursor: pointer;
    border: none;
    box-shadow: 0 8px 28px rgba(139,99,67,.28);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    margin-top: 8px;
    -webkit-tap-highlight-color: transparent;
  }

  .bh-submit-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
    background-size: 600px 100%;
    animation: bh-shimmer 3s linear infinite;
  }

  .bh-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(139,99,67,.42); }
  .bh-submit-btn:active { transform: translateY(0); box-shadow: 0 4px 16px rgba(139,99,67,.3); }

  @keyframes bh-shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
  @keyframes bh-formReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 480px) {
    .bh-field-block { margin-bottom: 20px; }
    .bh-input { font-size: 16px; padding: 14px 14px; border-radius: 10px; }
    .bh-input--narrow { max-width: 100%; }
    .bh-radio-group { gap: 8px; flex-wrap: wrap; }
    .bh-radio-label { flex: 1 1 calc(50% - 4px); min-width: 0; font-size: 13px; padding: 13px 10px; white-space: normal; text-align: center; }
    .bh-field-label { font-size: 11px; letter-spacing: 0.14em; margin-bottom: 8px; }
    .bh-field-hint { font-size: 13px; margin-top: 6px; }
    .bh-submit-btn { font-size: 14px; letter-spacing: 0.1em; min-height: 54px; }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .bh-input { font-size: 16px; padding: 13px 16px; }
    .bh-radio-label { font-size: 13px; padding: 13px 14px; }
    .bh-field-label { font-size: 11px; }
  }
`;

const confirmationBox: React.CSSProperties = {
  textAlign: 'center',
  padding: 'clamp(24px,4vw,40px) clamp(16px,3vw,28px)',
};