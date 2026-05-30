"use client";
import React, { useState } from 'react';

export default function RomanticRsvpForm({ orderId, showAccommodation, showTransport }: any) {
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
              <circle cx="30" cy="30" r="28" stroke="url(#rmCheckGrad)" strokeWidth="1.2"/>
              <path d="M18 30 L26 38 L42 22" stroke="#A63248" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="rmCheckGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E8A0A8"/>
                  <stop offset="50%" stopColor="#A63248"/>
                  <stop offset="100%" stopColor="#7B1A2E"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,36px)', fontStyle: 'italic', fontWeight: 400, color: '#7B1A2E', marginBottom: 12 }}>
            Mulțumim! ♥
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(138,74,88,.7)', lineHeight: 1.8 }}>
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
        <div style={{ position: 'relative', zIndex: 1, animation: 'rm-formReveal 0.5s ease both', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <svg viewBox="0 0 24 22" fill="#E8A0A8" style={{ width: 28, height: 26 }}>
                <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z"/>
              </svg>
            </div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(138,74,88,.6)', marginBottom: 8 }}>
              ♥ Confirmare Prezență ♥
            </p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,36px)', fontStyle: 'italic', fontWeight: 400, color: '#7B1A2E', marginBottom: 4 }}>
              R.S.V.P.
            </h3>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,80,106,.5), transparent)', margin: '8px auto 0' }}/>
          </div>

          <div className="rm-field-block">
            <label className="rm-field-label">Nume și Prenume</label>
            <input name="guestName" required placeholder="ex. Maria Ionescu" className="rm-input" autoComplete="name" autoCapitalize="words"/>
            <span className="rm-field-hint">Vă rugăm introduceți numele complet.</span>
          </div>

          <div className="rm-field-block">
            <label className="rm-field-label">Răspuns</label>
            <div className="rm-radio-group">
              <label className="rm-radio-label">
                <input type="radio" name="raspuns" value="true" defaultChecked onChange={() => setIsComing("true")}/>
                Particip
              </label>
              <label className="rm-radio-label">
                <input type="radio" name="raspuns" value="false" onChange={() => setIsComing("false")}/>
                Nu Particip
              </label>
            </div>
            <span className="rm-field-hint">Selectați "Nu Particip" în cazul în care nu puteți ajunge.</span>
          </div>

          <select onChange={e => setIsComing(e.target.value)} value={isComing} style={{ display: 'none' }}>
            <option value="true">VIN CU DRAG</option>
            <option value="false">NU POT</option>
          </select>

          {isComing === "true" && (
            <>
              <div className="rm-field-block">
                <label className="rm-field-label">Nume Partener (opțional)</label>
                <input name="partnerName" placeholder="ex. Ion Ionescu" className="rm-input" autoComplete="off" autoCapitalize="words"/>
                <span className="rm-field-hint">Lăsați gol dacă veniți singur/ă.</span>
              </div>

              <div className="rm-field-block">
                <label className="rm-field-label">Număr Copii</label>
                <input name="kidsCount" type="number" min="0" placeholder="0" className="rm-input rm-input--narrow" inputMode="numeric" pattern="[0-9]*"/>
                <span className="rm-field-hint">Introduceți 0 dacă nu veniți cu copii.</span>
              </div>

              <div className="rm-field-block">
                <label className="rm-field-label">Preferințe Meniu</label>
                <input name="dietary" placeholder="ex. Vegetarian, alergii, etc." className="rm-input" autoComplete="off" autoCapitalize="sentences"/>
                <span className="rm-field-hint">Menționați orice preferință sau restricție alimentară.</span>
              </div>

              {showAccommodation && (
                <div className="rm-field-block">
                  <label className="rm-field-label">Aveți nevoie de cazare?</label>
                  <div className="rm-radio-group">
                    <label className="rm-radio-label">
                      <input type="radio" name="accommodation" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="rm-radio-label">
                      <input type="radio" name="accommodation" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              {showTransport && (
                <div className="rm-field-block">
                  <label className="rm-field-label">Aveți nevoie de transport?</label>
                  <div className="rm-radio-group">
                    <label className="rm-radio-label">
                      <input type="radio" name="transport" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="rm-radio-label">
                      <input type="radio" name="transport" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              <div className="rm-field-block">
                <label className="rm-field-label">Alte Mențiuni</label>
                <textarea name="mentions" placeholder="Orice altceva doriți să ne comunicați..." className="rm-input" rows={3} style={{ resize: 'vertical', minHeight: 80 }} autoCapitalize="sentences"/>
              </div>
            </>
          )}

          {/* GDPR Consent Section */}
          <div style={{ background: 'rgba(196,80,106,.06)', border: '1.5px solid rgba(196,80,106,.15)', borderRadius: '10px', padding: '13px 15px', marginBottom: '18px', marginTop: '22px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: 'rgba(138,74,88,.55)', lineHeight: '1.5', marginBottom: '10px', fontStyle: 'italic' }}>
              <strong>🔒 Date Protejate:</strong> Datele tale se colectează și șterg după 12 luni. <strong>NU colectăm date medicale.</strong>
              <a href="https://vibeinvite.ro/politica" target="_blank" rel="noopener" style={{ color: '#A63248', textDecoration: 'underline', marginLeft: '4px' }}>Citire completă</a>
            </p>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
              <input 
                type="checkbox" 
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                style={{ marginTop: '3px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#A63248' }}
              />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: '#FFF5F7', fontStyle: 'italic', lineHeight: '1.5' }}>
                Accept colectarea datelor conform Politicii de Confidențialitate. *
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="rm-submit-btn"
            disabled={!gdprConsent}
            style={{ opacity: !gdprConsent ? 0.55 : 1, cursor: !gdprConsent ? 'not-allowed' : 'pointer' }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>♥ Confirmă Prezența ♥</span>
          </button>
        </div>
      </form>
    </>
  );
}

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Playfair+Display:ital,wght@1,400;1,600&display=swap');
`;

const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Playfair+Display:ital,wght@1,400;1,600&display=swap');

  .rm-input {
    width: 100%;
    background: rgba(255,251,251,.85);
    border: 1px solid rgba(196,80,106,.2);
    border-radius: 10px;
    color: #3D1520;
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

  .rm-input::placeholder { color: rgba(138,74,88,.4); }

  .rm-input:focus {
    border-color: rgba(196,80,106,.5);
    background: rgba(255,240,242,.8);
    box-shadow: 0 0 0 3px rgba(196,80,106,.07);
  }

  .rm-input--narrow { max-width: 140px; }

  .rm-radio-group { display: flex; gap: 10px; flex-wrap: wrap; }

  .rm-radio-label {
    flex: 1;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 14px;
    min-height: 48px;
    border-radius: 10px;
    border: 1px solid rgba(196,80,106,.2);
    background: rgba(255,251,251,.8);
    cursor: pointer;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(138,74,88,.8);
    transition: all 0.2s;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
  }

  .rm-radio-label:hover { border-color: rgba(196,80,106,.45); background: rgba(255,240,242,.85); color: #A63248; }
  .rm-radio-label:active { border-color: rgba(196,80,106,.6); background: rgba(255,240,242,.95); }

  .rm-radio-label input[type="radio"] {
    accent-color: #A63248;
    width: 16px; height: 16px;
    flex-shrink: 0;
    margin: 0;
  }

  .rm-field-label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(9px, 1vw, 11px);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(138,74,88,.6);
    margin-bottom: 10px;
  }

  .rm-field-hint {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(12px, 1.3vw, 13px);
    font-style: italic;
    color: rgba(138,74,88,.45);
    margin-top: 7px;
    display: block;
    line-height: 1.5;
  }

  .rm-field-block { margin-bottom: 24px; width: 100%; }

  .rm-submit-btn {
    display: block;
    width: 100%;
    padding: 16px 0;
    min-height: 52px;
    border-radius: 100px;
    background: linear-gradient(135deg, #7B1A2E 0%, #A63248 45%, #C4506A 55%, #A63248 70%, #7B1A2E 100%);
    color: #fff;
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: clamp(11px, 1.4vw, 13px);
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    box-shadow: 0 8px 32px rgba(123,26,46,.3);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    margin-top: 8px;
    -webkit-tap-highlight-color: transparent;
  }

  .rm-submit-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
    background-size: 600px 100%;
    animation: rm-shimmer 3s linear infinite;
  }

  .rm-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(123,26,46,.45); }
  .rm-submit-btn:active { transform: translateY(0); box-shadow: 0 4px 20px rgba(123,26,46,.28); }

  @keyframes rm-shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
  @keyframes rm-formReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 480px) {
    .rm-field-block { margin-bottom: 20px; }
    .rm-input { font-size: 16px; padding: 14px 14px; border-radius: 8px; }
    .rm-input--narrow { max-width: 100%; }
    .rm-radio-group { gap: 8px; flex-wrap: wrap; }
    .rm-radio-label { flex: 1 1 calc(50% - 4px); min-width: 0; font-size: 11px; padding: 13px 10px; letter-spacing: 0.05em; white-space: normal; text-align: center; }
    .rm-field-label { font-size: 10px; letter-spacing: 0.18em; margin-bottom: 8px; }
    .rm-field-hint { font-size: 13px; margin-top: 6px; }
    .rm-submit-btn { font-size: 12px; letter-spacing: 0.16em; min-height: 54px; }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .rm-input { font-size: 16px; padding: 13px 16px; }
    .rm-radio-label { font-size: 12px; padding: 13px 14px; }
    .rm-field-label { font-size: 10px; }
  }
`;

const confirmationBox: React.CSSProperties = {
  textAlign: 'center',
  padding: 'clamp(24px,4vw,40px) clamp(16px,3vw,28px)',
};
