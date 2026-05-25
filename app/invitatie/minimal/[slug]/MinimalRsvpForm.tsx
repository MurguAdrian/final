"use client";
import React, { useState } from 'react';

export default function MinimalRsvpForm({ orderId, showAccommodation, showTransport }: any) {
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
        <div style={{ textAlign: 'center', padding: 'clamp(24px,4vw,40px) clamp(16px,3vw,28px)' }}>
          <svg viewBox="0 0 60 60" fill="none" style={{ width: 52, height: 52, display: 'block', margin: '0 auto 16px' }}>
            <circle cx="30" cy="30" r="28" stroke="#C8503A" strokeWidth="1.2"/>
            <path d="M18 30 L26 38 L42 22" stroke="#C8503A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C8503A', fontWeight: 600, marginBottom: 10 }}>Confirmat</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3.5vw,30px)', fontStyle: 'italic', fontWeight: 400, color: '#111', marginBottom: 10 }}>Mulțumim!</h2>
          <div style={{ width: 32, height: 2, background: '#C8503A', margin: '0 auto 14px' }}/>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px,1.6vw,15px)', color: '#555', lineHeight: 1.8 }}>
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
        <div style={{ position: 'relative', zIndex: 1, animation: 'mn-formReveal 0.5s ease both', width: '100%' }}>

          <div className="mn-field-block">
            <label className="mn-field-label">Nume și Prenume</label>
            <input name="guestName" required placeholder="ex. Maria Ionescu" className="mn-input" autoComplete="name" autoCapitalize="words"/>
            <span className="mn-field-hint">Vă rugăm introduceți numele complet.</span>
          </div>

          <div className="mn-field-block">
            <label className="mn-field-label">Răspuns</label>
            <div className="mn-radio-group">
              <label className="mn-radio-label">
                <input type="radio" name="raspuns" value="true" defaultChecked onChange={() => setIsComing("true")}/>
                Particip
              </label>
              <label className="mn-radio-label">
                <input type="radio" name="raspuns" value="false" onChange={() => setIsComing("false")}/>
                Nu Particip
              </label>
            </div>
            <span className="mn-field-hint">Selectați "Nu Particip" în cazul în care nu puteți ajunge.</span>
          </div>

          <select onChange={e => setIsComing(e.target.value)} value={isComing} style={{ display: 'none' }}>
            <option value="true">Particip</option>
            <option value="false">Nu Particip</option>
          </select>

          {isComing === "true" && (
            <>
              <div className="mn-field-block">
                <label className="mn-field-label">Nume Partener (opțional)</label>
                <input name="partnerName" placeholder="ex. Ion Ionescu" className="mn-input" autoComplete="off" autoCapitalize="words"/>
                <span className="mn-field-hint">Lăsați gol dacă veniți singur/ă.</span>
              </div>

              <div className="mn-field-block">
                <label className="mn-field-label">Număr Copii</label>
                <input name="kidsCount" type="number" min="0" placeholder="0" className="mn-input mn-input--narrow" inputMode="numeric" pattern="[0-9]*"/>
                <span className="mn-field-hint">Introduceți 0 dacă nu veniți cu copii.</span>
              </div>

              <div className="mn-field-block">
                <label className="mn-field-label">Preferințe Meniu</label>
                <input name="dietary" placeholder="ex. Vegetarian, alergii, etc." className="mn-input" autoComplete="off" autoCapitalize="sentences"/>
                <span className="mn-field-hint">Menționați orice preferință sau restricție alimentară.</span>
              </div>

              {showAccommodation && (
                <div className="mn-field-block">
                  <label className="mn-field-label">Aveți nevoie de cazare?</label>
                  <div className="mn-radio-group">
                    <label className="mn-radio-label">
                      <input type="radio" name="accommodation" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="mn-radio-label">
                      <input type="radio" name="accommodation" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              {showTransport && (
                <div className="mn-field-block">
                  <label className="mn-field-label">Aveți nevoie de transport?</label>
                  <div className="mn-radio-group">
                    <label className="mn-radio-label">
                      <input type="radio" name="transport" value="false" defaultChecked/>
                      Nu, mulțumesc
                    </label>
                    <label className="mn-radio-label">
                      <input type="radio" name="transport" value="true"/>
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              <div className="mn-field-block">
                <label className="mn-field-label">Alte Mențiuni</label>
                <textarea name="mentions" placeholder="Orice altceva doriți să ne comunicați..." className="mn-input" rows={3} style={{ resize: 'vertical', minHeight: 80 }} autoCapitalize="sentences"/>
              </div>
            </>
          )}

          <button type="submit" className="mn-submit-btn">
            <span style={{ position: 'relative', zIndex: 1 }}>Confirmă Prezența →</span>
          </button>
        </div>
      </form>
    </>
  );
}

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
`;

const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  .mn-input {
    width: 100%;
    background: #F7F4F0;
    border: none;
    border-bottom: 1px solid #E2E2E2;
    color: #111;
    padding: 11px 0;
    margin-bottom: 4px;
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    display: block;
    min-height: 44px;
    border-radius: 0;
    background: transparent;
  }
  .mn-input::placeholder { color: #AAAAAA; }
  .mn-input:focus { border-bottom-color: #C8503A; }
  .mn-input--narrow { max-width: 140px; }

  .mn-radio-group { display: flex; gap: 10px; flex-wrap: wrap; }

  .mn-radio-label {
    flex: 1;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 10px;
    min-height: 44px;
    border: 1px solid #E2E2E2;
    background: #fff;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    letter-spacing: .08em;
    color: #555;
    transition: all 0.18s;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
  }
  .mn-radio-label:hover { border-color: #C8503A; color: #111; background: rgba(200,80,58,.04); }

  .mn-radio-label input[type="radio"] {
    accent-color: #C8503A;
    width: 15px; height: 15px;
    flex-shrink: 0; margin: 0;
  }

  .mn-field-label {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(9px,1vw,10px);
    letter-spacing: .26em;
    text-transform: uppercase;
    color: #AAAAAA;
    margin-bottom: 6px;
    font-weight: 500;
  }

  .mn-field-hint {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(11px,1.2vw,12px);
    color: #AAAAAA;
    margin-top: 6px;
    display: block;
    line-height: 1.5;
  }

  .mn-field-block { margin-bottom: 24px; width: 100%; }

  .mn-submit-btn {
    display: block;
    width: 100%;
    padding: 14px 0;
    min-height: 50px;
    background: #111;
    color: #fff;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(11px,1.3vw,13px);
    font-weight: 500;
    letter-spacing: .24em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: background .2s;
    position: relative;
    overflow: hidden;
    margin-top: 8px;
    -webkit-tap-highlight-color: transparent;
  }
  .mn-submit-btn:hover { background: #C8503A; }
  .mn-submit-btn:active { background: #A03828; }

  @keyframes mn-formReveal { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 480px) {
    .mn-field-block { margin-bottom: 20px; }
    .mn-input { font-size: 16px; padding: 12px 0; }
    .mn-input--narrow { max-width: 100%; }
    .mn-radio-group { gap: 8px; flex-wrap: wrap; }
    .mn-radio-label { flex: 1 1 calc(50% - 4px); min-width: 0; font-size: 11px; padding: 12px 8px; white-space: normal; text-align: center; }
    .mn-field-label { font-size: 10px; letter-spacing: .18em; margin-bottom: 6px; }
    .mn-field-hint { font-size: 12px; margin-top: 5px; }
    .mn-submit-btn { font-size: 12px; letter-spacing: .18em; min-height: 52px; }
  }
`;