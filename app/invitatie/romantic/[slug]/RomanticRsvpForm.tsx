

"use client";
import React, { useState } from 'react';

export default function RomanticRsvpForm({ orderId, showAccommodation, showTransport }: any) {
  const [submitted, setSubmitted] = useState(false);
  const [isComing, setIsComing] = useState("true");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              <circle cx="30" cy="30" r="28" stroke="url(#checkGrad)" strokeWidth="1.2"/>
              <path d="M18 30 L26 38 L42 22" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="checkGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8B6914"/>
                  <stop offset="50%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#8B6914"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,4vw,36px)', fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', marginBottom: 12 }}>
            Mulțumim! ✦
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(212,175,55,0.6)', lineHeight: 1.8 }}>
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
        <div style={{ position: 'relative', zIndex: 1, animation: 'formReveal 0.5s ease both', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <svg viewBox="0 0 120 60" fill="none" style={{ width: 60, height: 30 }}>
                <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#fcg)" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="60" cy="5" r="3.5" fill="url(#fcg)"/>
                <circle cx="30" cy="40" r="2.5" fill="url(#fcg)"/>
                <circle cx="90" cy="40" r="2.5" fill="url(#fcg)"/>
                <path d="M4 50 L116 50" stroke="url(#fcg)" strokeWidth="1"/>
                <defs>
                  <linearGradient id="fcg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8B6914"/>
                    <stop offset="40%" stopColor="#D4AF37"/>
                    <stop offset="60%" stopColor="#F5D678"/>
                    <stop offset="100%" stopColor="#8B6914"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.55)', marginBottom: 8 }}>
              ◆ Confirmare Prezență ◆
            </p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,36px)', fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', marginBottom: 4 }}>
              R.S.V.P.
            </h3>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)', margin: '8px auto 0' }}/>
          </div>

          <div className="lux-field-block">
            <label className="lux-field-label">Nume și Prenume</label>
            <input name="guestName" required placeholder="ex. Maria Ionescu" className="lux-input" autoComplete="name" autoCapitalize="words"/>
            <span className="lux-field-hint">Vă rugăm introduceți numele complet.</span>
          </div>

          <div className="lux-field-block">
            <label className="lux-field-label">Răspuns</label>
            <div className="lux-radio-group">
              <label className="lux-radio-label">
                <input type="radio" name="raspuns" value="true" defaultChecked onChange={() => setIsComing("true")}/>
                Particip
              </label>
              <label className="lux-radio-label">
                <input type="radio" name="raspuns" value="false" onChange={() => setIsComing("false")}/>
                Nu Particip
              </label>
            </div>
            <span className="lux-field-hint">Selectați "Nu Particip" în cazul în care nu puteți ajunge.</span>
          </div>

          <select onChange={e => setIsComing(e.target.value)} value={isComing} style={{ display: 'none' }}>
            <option value="true">VIN CU DRAG</option>
            <option value="false">NU POT</option>
          </select>

          {isComing === "true" && (
            <>
              <div className="lux-field-block">
                <label className="lux-field-label">Nume Partener (opțional)</label>
                <input name="partnerName" placeholder="ex. Ion Ionescu" className="lux-input" autoComplete="off" autoCapitalize="words"/>
                <span className="lux-field-hint">Lăsați gol dacă veniți singur/ă.</span>
              </div>

              <div className="lux-field-block">
                <label className="lux-field-label">Număr Copii</label>
                <input name="kidsCount" type="number" min="0" placeholder="0" className="lux-input lux-input--narrow" inputMode="numeric" pattern="[0-9]*"/>
                <span className="lux-field-hint">Introduceți 0 dacă nu veniți cu copii.</span>
              </div>

              <div className="lux-field-block">
                <label className="lux-field-label">Preferințe Meniu</label>
                <input name="dietary" placeholder="ex. Vegetarian, alergii, etc." className="lux-input" autoComplete="off" autoCapitalize="sentences"/>
                <span className="lux-field-hint">Menționați orice preferință sau restricție alimentară.</span>
              </div>

              {showAccommodation && (
                <div className="lux-field-block">
                  <label className="lux-field-label">Aveți nevoie de cazare?</label>
                  <div className="lux-radio-group">
                    <label className="lux-radio-label">
                      <input type="radio" name="accommodation" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="lux-radio-label">
                      <input type="radio" name="accommodation" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              {showTransport && (
                <div className="lux-field-block">
                  <label className="lux-field-label">Aveți nevoie de transport?</label>
                  <div className="lux-radio-group">
                    <label className="lux-radio-label">
                      <input type="radio" name="transport" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="lux-radio-label">
                      <input type="radio" name="transport" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              <div className="lux-field-block">
                <label className="lux-field-label">Alte Mențiuni</label>
                <textarea name="mentions" placeholder="Orice altceva doriți să ne comunicați..." className="lux-input" rows={3} style={{ resize: 'vertical', minHeight: 80 }} autoCapitalize="sentences"/>
              </div>
            </>
          )}

          <button type="submit" className="lux-submit-btn">
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

  .lux-input {
    width: 100%;
    background: rgba(212,175,55,0.05);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 10px;
    color: #F5E6A8;
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

  .lux-input::placeholder { color: rgba(212,175,55,0.35); }

  .lux-input:focus {
    border-color: rgba(212,175,55,0.55);
    background: rgba(212,175,55,0.08);
    box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
  }

  .lux-input--narrow { max-width: 140px; }

  .lux-radio-group { display: flex; gap: 10px; flex-wrap: wrap; }

  .lux-radio-label {
    flex: 1;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 14px;
    min-height: 48px;
    border-radius: 10px;
    border: 1px solid rgba(212,175,55,0.2);
    background: rgba(212,175,55,0.04);
    cursor: pointer;
    font-family: 'Cinzel', serif;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.7);
    transition: all 0.2s;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
  }

  .lux-radio-label:hover { border-color: rgba(212,175,55,0.45); background: rgba(212,175,55,0.1); color: #D4AF37; }
  .lux-radio-label:active { border-color: rgba(212,175,55,0.6); background: rgba(212,175,55,0.14); }

  .lux-radio-label input[type="radio"] {
    accent-color: #D4AF37;
    width: 16px; height: 16px;
    flex-shrink: 0;
    margin: 0;
  }

  .lux-field-label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(9px, 1vw, 11px);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.5);
    margin-bottom: 10px;
  }

  .lux-field-hint {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(12px, 1.3vw, 13px);
    font-style: italic;
    color: rgba(212,175,55,0.3);
    margin-top: 7px;
    display: block;
    line-height: 1.5;
  }

  .lux-field-block { margin-bottom: 24px; width: 100%; }

  .lux-submit-btn {
    display: block;
    width: 100%;
    padding: 16px 0;
    min-height: 52px;
    border-radius: 4px;
    background: linear-gradient(135deg, #8B6914 0%, #D4AF37 45%, #F5D678 55%, #D4AF37 70%, #8B6914 100%);
    color: #0A0803;
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: clamp(11px, 1.4vw, 13px);
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    box-shadow: 0 8px 40px rgba(212,175,55,0.3), 0 2px 0 rgba(245,214,120,0.4) inset;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    margin-top: 8px;
    -webkit-tap-highlight-color: transparent;
  }

  .lux-submit-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    background-size: 600px 100%;
    animation: shimmer 3s linear infinite;
  }

  .lux-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 55px rgba(212,175,55,0.5), 0 2px 0 rgba(245,214,120,0.4) inset; }
  .lux-submit-btn:active { transform: translateY(0); box-shadow: 0 4px 20px rgba(212,175,55,0.35), 0 2px 0 rgba(245,214,120,0.4) inset; }

  @keyframes shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
  @keyframes formReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 480px) {
    .lux-field-block { margin-bottom: 20px; }
    .lux-input { font-size: 16px; padding: 14px 14px; border-radius: 8px; }
    .lux-input--narrow { max-width: 100%; }
    .lux-radio-group { gap: 8px; flex-wrap: wrap; }
    .lux-radio-label { flex: 1 1 calc(50% - 4px); min-width: 0; font-size: 11px; padding: 13px 10px; letter-spacing: 0.05em; white-space: normal; text-align: center; }
    .lux-field-label { font-size: 10px; letter-spacing: 0.18em; margin-bottom: 8px; }
    .lux-field-hint { font-size: 13px; margin-top: 6px; }
    .lux-submit-btn { font-size: 12px; letter-spacing: 0.16em; min-height: 54px; }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .lux-input { font-size: 16px; padding: 13px 16px; }
    .lux-radio-label { font-size: 12px; padding: 13px 14px; }
    .lux-field-label { font-size: 10px; }
  }
`;

const confirmationBox: React.CSSProperties = {
  textAlign: 'center',
  padding: 'clamp(24px,4vw,40px) clamp(16px,3vw,28px)',
};