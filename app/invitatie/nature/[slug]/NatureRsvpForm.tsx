"use client";
import React, { useState } from 'react';

export default function NatureRsvpForm({ orderId, showAccommodation, showTransport }: any) {
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
            <span style={{ fontSize: 48, display: 'block', textAlign: 'center' }}>🌿</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,36px)', fontStyle: 'italic', fontWeight: 400, color: '#3A5E33', marginBottom: 12, textAlign: 'center' }}>
            Mulțumim! ✦
          </h2>
          <p style={{ fontFamily: "'Cormorant', serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.8vw,17px)', color: '#6B7A5E', lineHeight: 1.8, textAlign: 'center' }}>
            Confirmarea a fost înregistrată cu succes.<br />Abia așteptăm să vă avem alături!
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
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>🌿</span>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9A7B3F', marginBottom: 8, opacity: .82 }}>
              ✦ Confirmare Prezență ✦
            </p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,36px)', fontStyle: 'italic', fontWeight: 400, color: '#3A5E33', marginBottom: 4 }}>
              R.S.V.P.
            </h3>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(154,123,63,.5), transparent)', margin: '8px auto 0' }} />
          </div>

          <div className="nat-field-block">
            <label className="nat-field-label">Nume și Prenume</label>
            <input name="guestName" required placeholder="ex. Maria Ionescu" className="nat-input" autoComplete="name" autoCapitalize="words" />
            <span className="nat-field-hint">Vă rugăm introduceți numele complet.</span>
          </div>

          <div className="nat-field-block">
            <label className="nat-field-label">Răspuns</label>
            <div className="nat-radio-group">
              <label className="nat-radio-label">
                <input type="radio" name="raspuns" value="true" defaultChecked onChange={() => setIsComing("true")} />
                Particip
              </label>
              <label className="nat-radio-label">
                <input type="radio" name="raspuns" value="false" onChange={() => setIsComing("false")} />
                Nu Particip
              </label>
            </div>
            <span className="nat-field-hint">Selectați "Nu Particip" în cazul în care nu puteți ajunge.</span>
          </div>

          <select onChange={e => setIsComing(e.target.value)} value={isComing} style={{ display: 'none' }}>
            <option value="true">VIN CU DRAG</option>
            <option value="false">NU POT</option>
          </select>

          {isComing === "true" && (
            <>
              <div className="nat-field-block">
                <label className="nat-field-label">Nume Partener (opțional)</label>
                <input name="partnerName" placeholder="ex. Ion Ionescu" className="nat-input" autoComplete="off" autoCapitalize="words" />
                <span className="nat-field-hint">Lăsați gol dacă veniți singur/ă.</span>
              </div>

              <div className="nat-field-block">
                <label className="nat-field-label">Număr Copii</label>
                <input name="kidsCount" type="number" min="0" placeholder="0" className="nat-input nat-input--narrow" inputMode="numeric" pattern="[0-9]*" />
                <span className="nat-field-hint">Introduceți 0 dacă nu veniți cu copii.</span>
              </div>

              <div className="nat-field-block">
                <label className="nat-field-label">Preferințe Meniu</label>
                <input name="dietary" placeholder="ex. Vegetarian, alergii, etc." className="nat-input" autoComplete="off" autoCapitalize="sentences" />
                <span className="nat-field-hint">Menționați orice preferință sau restricție alimentară.</span>
              </div>

              {showAccommodation && (
                <div className="nat-field-block">
                  <label className="nat-field-label">Aveți nevoie de cazare?</label>
                  <div className="nat-radio-group">
                    <label className="nat-radio-label">
                      <input type="radio" name="accommodation" value="false" defaultChecked />
                      Nu, mulțumesc
                    </label>
                    <label className="nat-radio-label">
                      <input type="radio" name="accommodation" value="true" />
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              {showTransport && (
                <div className="nat-field-block">
                  <label className="nat-field-label">Aveți nevoie de transport?</label>
                  <div className="nat-radio-group">
                    <label className="nat-radio-label">
                      <input type="radio" name="transport" value="false" defaultChecked />
                      Nu, mulțumesc
                    </label>
                    <label className="nat-radio-label">
                      <input type="radio" name="transport" value="true" />
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              <div className="nat-field-block">
                <label className="nat-field-label">Alte Mențiuni</label>
                <textarea name="mentions" placeholder="Orice altceva doriți să ne comunicați..." className="nat-input" rows={3} style={{ resize: 'vertical', minHeight: 80 }} autoCapitalize="sentences" />
              </div>
            </>
          )}

          <button type="submit" className="nat-submit-btn">
            <span style={{ position: 'relative', zIndex: 1 }}>✦ Confirmă Prezența ✦</span>
          </button>
        </div>
      </form>
    </>
  );
}

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
`;

const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

  .nat-input {
    width: 100%;
    background: rgba(255,255,255,.75);
    border: 1.5px solid rgba(154,123,63,.25);
    border-radius: 12px;
    color: #1C2218;
    padding: 10px 14px;
    margin-bottom: 4px;
    font-family: 'Lato', sans-serif;
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

  .nat-input::placeholder { color: rgba(154,123,63,.45); }

  .nat-input:focus {
    border-color: rgba(154,123,63,.6);
    background: rgba(255,255,255,.9);
    box-shadow: 0 0 0 3px rgba(154,123,63,.08);
  }

  .nat-input--narrow { max-width: 140px; }

  .nat-radio-group { display: flex; gap: 8px; flex-wrap: wrap; }

  .nat-radio-label {
    flex: 1;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 10px;
    min-height: 48px;
    border-radius: 12px;
    border: 1.5px solid rgba(154,123,63,.22);
    background: rgba(255,255,255,.7);
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    color: #1C2218;
    transition: all 0.2s;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
  }

  .nat-radio-label:hover { border-color: rgba(154,123,63,.55); background: rgba(235,244,231,.8); }
  .nat-radio-label:active { border-color: rgba(154,123,63,.7); background: rgba(235,244,231,.9); }

  .nat-radio-label input[type="radio"] {
    accent-color: #3A5E33;
    width: 16px; height: 16px;
    flex-shrink: 0;
    margin: 0;
  }

  .nat-field-label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(9px, 1vw, 11px);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #6B7A5E;
    margin-bottom: 8px;
  }

  .nat-field-hint {
    font-family: 'Cormorant', serif;
    font-size: clamp(12px, 1.3vw, 13px);
    font-style: italic;
    color: rgba(107,122,94,.65);
    margin-top: 5px;
    display: block;
    line-height: 1.5;
  }

  .nat-field-block { margin-bottom: 20px; width: 100%; }

  .nat-submit-btn {
    display: block;
    width: 100%;
    padding: 14px 0;
    min-height: 52px;
    border-radius: 100px;
    background: linear-gradient(135deg, #3A5E33 0%, #274422 100%);
    color: #fff;
    text-align: center;
    font-family: 'Cinzel', serif;
    font-size: clamp(11px, 1.4vw, 13px);
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    box-shadow: 0 8px 28px rgba(58,94,51,.32);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    margin-top: 8px;
    -webkit-tap-highlight-color: transparent;
  }

  .nat-submit-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent);
    background-size: 350px 100%;
    animation: shimmer 3s linear infinite;
  }

  .nat-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(58,94,51,.45); }
  .nat-submit-btn:active { transform: translateY(0); box-shadow: 0 4px 20px rgba(58,94,51,.35); }

  @keyframes shimmer { 0% { background-position: -350px 0; } 100% { background-position: 350px 0; } }
  @keyframes formReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 480px) {
    .nat-field-block { margin-bottom: 18px; }
    .nat-input { font-size: 16px; padding: 13px 14px; border-radius: 10px; }
    .nat-input--narrow { max-width: 100%; }
    .nat-radio-group { gap: 8px; flex-wrap: wrap; }
    .nat-radio-label { flex: 1 1 calc(50% - 4px); min-width: 0; font-size: 12px; padding: 12px 10px; white-space: normal; text-align: center; }
    .nat-field-label { font-size: 10px; letter-spacing: 0.14em; margin-bottom: 7px; }
    .nat-field-hint { font-size: 13px; margin-top: 5px; }
    .nat-submit-btn { font-size: 12px; letter-spacing: 0.16em; min-height: 52px; }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .nat-input { font-size: 16px; padding: 12px 14px; }
    .nat-radio-label { font-size: 13px; padding: 12px 10px; }
    .nat-field-label { font-size: 10px; }
  }
`;

const confirmationBox: React.CSSProperties = {
  textAlign: 'center',
  padding: 'clamp(24px,4vw,40px) clamp(16px,3vw,28px)',
};
