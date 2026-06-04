"use client";
import React, { useState } from 'react';

export default function RoyalRsvpForm({ orderId, showAccommodation, showTransport }: any) {
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
          <div style={{ marginBottom: 20 }}>
            <svg viewBox="0 0 60 60" fill="none" style={{ width: 56, height: 56, display: 'block', margin: '0 auto' }}>
              <circle cx="30" cy="30" r="28" stroke="url(#royalCheckGrad)" strokeWidth="1.2"/>
              <path d="M18 30 L26 38 L42 22" stroke="#C8D8E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="royalCheckGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6888A8"/>
                  <stop offset="50%" stopColor="#C8D8E8"/>
                  <stop offset="100%" stopColor="#6888A8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(26px,4vw,36px)',
            fontStyle: 'italic', fontWeight: 300,
            color: '#E8F0F8', marginBottom: 12
          }}>
            Mulțumim! ✦
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(14px,1.8vw,17px)',
            color: 'rgba(200,216,232,0.6)', lineHeight: 1.8
          }}>
            Confirmarea a fost înregistrată cu succes.<br/>Abia așteptăm să vă avem alături!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{FORM_CSS}</style>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ position: 'relative', zIndex: 1, animation: 'royal-formReveal 0.5s ease both', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              {/* Heraldic crown SVG */}
              <svg viewBox="0 0 120 60" fill="none" style={{ width: 60, height: 30 }}>
                <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#rfcg)" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="60" cy="5" r="3.5" fill="url(#rfcg)"/>
                <circle cx="30" cy="40" r="2.5" fill="url(#rfcg)"/>
                <circle cx="90" cy="40" r="2.5" fill="url(#rfcg)"/>
                <path d="M4 50 L116 50" stroke="url(#rfcg)" strokeWidth="1"/>
                <defs>
                  <linearGradient id="rfcg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6888A8"/>
                    <stop offset="40%" stopColor="#C8D8E8"/>
                    <stop offset="60%" stopColor="#E8F0F8"/>
                    <stop offset="100%" stopColor="#6888A8"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(9px,1.1vw,11px)',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(200,216,232,0.55)', marginBottom: 8
            }}>
              ◆ Confirmare Prezență ◆
            </p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px,4vw,36px)',
              fontStyle: 'italic', fontWeight: 300,
              color: '#E8F0F8', marginBottom: 4
            }}>
              R.S.V.P.
            </h3>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,216,232,0.5), transparent)', margin: '8px auto 0' }}/>
          </div>

          <div className="royal-field-block">
            <label className="royal-field-label">Nume și Prenume</label>
            <input name="guestName" required placeholder="ex. Maria Ionescu" className="royal-input" autoComplete="name" autoCapitalize="words"/>
            <span className="royal-field-hint">Vă rugăm introduceți numele complet.</span>
          </div>

          <div className="royal-field-block">
            <label className="royal-field-label">Răspuns</label>
            <div className="royal-radio-group">
              <label className="royal-radio-label">
                <input type="radio" name="raspuns" value="true" defaultChecked onChange={() => setIsComing("true")}/>
                Particip
              </label>
              <label className="royal-radio-label">
                <input type="radio" name="raspuns" value="false" onChange={() => setIsComing("false")}/>
                Nu Particip
              </label>
            </div>
            <span className="royal-field-hint">Selectați "Nu Particip" în cazul în care nu puteți ajunge.</span>
          </div>

          <select onChange={e => setIsComing(e.target.value)} value={isComing} style={{ display: 'none' }}>
            <option value="true">VIN CU DRAG</option>
            <option value="false">NU POT</option>
          </select>

          {isComing === "true" && (
            <>
              <div className="royal-field-block">
                <label className="royal-field-label">Nume Partener (opțional)</label>
                <input name="partnerName" placeholder="ex. Ion Ionescu" className="royal-input" autoComplete="off" autoCapitalize="words"/>
                <span className="royal-field-hint">Lăsați gol dacă veniți singur/ă.</span>
              </div>

              <div className="royal-field-block">
                <label className="royal-field-label">Număr Copii</label>
                <input name="kidsCount" type="number" min="0" placeholder="0" className="royal-input royal-input--narrow" inputMode="numeric" pattern="[0-9]*"/>
                <span className="royal-field-hint">Introduceți 0 dacă nu veniți cu copii.</span>
              </div>

              <div className="royal-field-block">
                <label className="royal-field-label">Preferințe Meniu</label>
                <input name="dietary" placeholder="ex. Vegetarian, alergii, etc." className="royal-input" autoComplete="off" autoCapitalize="sentences"/>
                <span className="royal-field-hint">Menționați orice preferință sau restricție alimentară.</span>
              </div>

              {showAccommodation && (
                <div className="royal-field-block">
                  <label className="royal-field-label">Aveți nevoie de cazare?</label>
                  <div className="royal-radio-group">
                    <label className="royal-radio-label">
                      <input type="radio" name="accommodation" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="royal-radio-label">
                      <input type="radio" name="accommodation" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              {showTransport && (
                <div className="royal-field-block">
                  <label className="royal-field-label">Aveți nevoie de transport?</label>
                  <div className="royal-radio-group">
                    <label className="royal-radio-label">
                      <input type="radio" name="transport" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="royal-radio-label">
                      <input type="radio" name="transport" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              <div className="royal-field-block">
                <label className="royal-field-label">Alte Mențiuni</label>
                <textarea name="mentions" placeholder="Orice altceva doriți să ne comunicați..." className="royal-input" rows={3} style={{ resize: 'vertical', minHeight: 80 }} autoCapitalize="sentences"/>
              </div>
            </>
          )}

          {/* GDPR Consent Section */}
          <div style={{ background: 'rgba(124,168,216,.06)', border: '1.5px solid rgba(124,168,216,.15)', borderRadius: '10px', padding: '13px 15px', marginBottom: '18px', marginTop: '22px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: 'rgba(124,168,216,.55)', lineHeight: '1.5', marginBottom: '10px', fontStyle: 'italic' }}>
              <strong>🔒 Date Protejate:</strong> Datele tale se colectează și șterg după 12 luni. <strong>NU colectăm date medicale.</strong>
              <a href="https://www.vibeinvite.ro/politica" target="_blank" rel="noopener" style={{ color: '#7CA8D8', textDecoration: 'underline', marginLeft: '4px' }}>Citire completă</a>
            </p>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
              <input 
                type="checkbox" 
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                style={{ marginTop: '3px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#7CA8D8' }}
              />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: '#E8F0F8', fontStyle: 'italic', lineHeight: '1.5' }}>
                Accept colectarea datelor conform Politicii de Confidențialitate. *
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="royal-submit-btn"
            disabled={!gdprConsent}
            style={{ opacity: !gdprConsent ? 0.55 : 1, cursor: !gdprConsent ? 'not-allowed' : 'pointer' }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>◆ Confirmă Prezența ◆</span>
          </button>
        </div>
      </form>
    </>
  );
}

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
`;

const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');

  .royal-input {
    width: 100%;
    background: rgba(124,168,216,0.06);
    border: 1px solid rgba(200,216,232,0.22);
    border-radius: 10px;
    color: #E8F0F8;
    padding: 14px 16px;
    margin-bottom: 4px;
    font-family: 'Cormorant Garamond', serif;
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
  .royal-input::placeholder { color: rgba(200,216,232,0.3); }
  .royal-input:focus {
    border-color: rgba(200,216,232,0.55);
    background: rgba(124,168,216,0.1);
    box-shadow: 0 0 0 3px rgba(124,168,216,0.1);
  }
  .royal-input--narrow { max-width: 140px; }

  .royal-radio-group { display: flex; gap: 10px; flex-wrap: wrap; }
  .royal-radio-label {
    flex: 1; min-width: 120px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 14px; min-height: 48px;
    border-radius: 10px;
    border: 1px solid rgba(200,216,232,0.2);
    background: rgba(124,168,216,0.05);
    cursor: pointer;
    font-family: 'Cinzel', serif; font-size: 13px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(200,216,232,0.7);
    transition: all 0.2s;
    user-select: none; -webkit-user-select: none;
    white-space: nowrap;
  }
  .royal-radio-label:hover { border-color: rgba(200,216,232,0.45); background: rgba(124,168,216,0.12); color: #C8D8E8; }
  .royal-radio-label:active { border-color: rgba(200,216,232,0.6); background: rgba(124,168,216,0.16); }
  .royal-radio-label input[type="radio"] {
    accent-color: #7CA8D8;
    width: 16px; height: 16px;
    flex-shrink: 0; margin: 0;
  }

  .royal-field-label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(9px, 1vw, 11px);
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(200,216,232,0.5);
    margin-bottom: 10px;
  }
  .royal-field-hint {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(12px, 1.3vw, 13px);
    font-style: italic;
    color: rgba(200,216,232,0.3);
    margin-top: 7px; display: block; line-height: 1.5;
  }
  .royal-field-block { margin-bottom: 24px; width: 100%; }

  .royal-submit-btn {
    display: block; width: 100%;
    padding: 16px 0; min-height: 52px;
    border-radius: 6px;
    background: linear-gradient(135deg, #152B52 0%, #243870 35%, #9FBFE8 50%, #243870 65%, #152B52 100%);
    color: #E8F0F8;
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: clamp(11px, 1.4vw, 13px); font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    cursor: pointer; border: 1px solid rgba(200,216,232,.3);
    box-shadow: 0 8px 40px rgba(4,18,40,.5), 0 0 20px rgba(124,168,216,.15), 0 2px 0 rgba(200,216,232,.15) inset;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative; overflow: hidden;
    margin-top: 8px;
    -webkit-tap-highlight-color: transparent;
  }
  .royal-submit-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    background-size: 600px 100%;
    animation: royal-shimmer 3s linear infinite;
  }
  .royal-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 55px rgba(4,18,40,.7), 0 0 30px rgba(124,168,216,.25), 0 2px 0 rgba(200,216,232,.15) inset; }
  .royal-submit-btn:active { transform: translateY(0); box-shadow: 0 4px 20px rgba(4,18,40,.5); }

  @keyframes royal-shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
  @keyframes royal-formReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 480px) {
    .royal-field-block { margin-bottom: 20px; }
    .royal-input { font-size: 16px; padding: 14px 14px; border-radius: 8px; }
    .royal-input--narrow { max-width: 100%; }
    .royal-radio-group { gap: 8px; flex-wrap: wrap; }
    .royal-radio-label { flex: 1 1 calc(50% - 4px); min-width: 0; font-size: 11px; padding: 13px 10px; letter-spacing: 0.05em; white-space: normal; text-align: center; }
    .royal-field-label { font-size: 10px; letter-spacing: 0.18em; margin-bottom: 8px; }
    .royal-field-hint { font-size: 13px; margin-top: 6px; }
    .royal-submit-btn { font-size: 12px; letter-spacing: 0.16em; min-height: 54px; }
  }
  @media (min-width: 481px) and (max-width: 768px) {
    .royal-input { font-size: 16px; padding: 13px 16px; }
    .royal-radio-label { font-size: 12px; padding: 13px 14px; }
    .royal-field-label { font-size: 10px; }
  }
`;

const confirmationBox: React.CSSProperties = {
  textAlign: 'center',
  padding: 'clamp(24px,4vw,40px) clamp(16px,3vw,28px)',
};
