
// "use client";
// import React, { useState } from 'react';

// export default function LuxRsvpForm({ orderId, showAccommodation, showTransport }: any) {
//   const [submitted, setSubmitted] = useState(false);
//   const [isComing, setIsComing] = useState("true");

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const formData = new FormData(e.currentTarget);
//   const payload = {
//     orderId,
//     guestName: formData.get("guestName"),
//     isComing: isComing === "true",
//     partnerName: formData.get("partnerName") || null,
//     plusOne: !!formData.get("partnerName"),
//     adultsCount: isComing === "true" ? 1 : 0, // Minim 1 adult dacă vine
//     kidsCount: parseInt(formData.get("kidsCount") as string) || 0,
//     dietaryPreferences: formData.get("dietary") || null,
//     needsAccommodation: formData.get("accommodation") === "true",
//     needsTransport: formData.get("transport") === "true",
//     otherMentions: formData.get("mentions") || null
//   };

//   await fetch("/api/rsvp", { 
//     method: "POST", 
//     headers: { "Content-Type": "application/json" }, 
//     body: JSON.stringify(payload) 
//   });
//   setSubmitted(true);
// };

//   if (submitted) return <h2>Mulțumim! ✦</h2>;

//   return (
//     <form onSubmit={handleSubmit} style={{ textAlign: 'left', background: '#111', padding: '30px', border: '1px solid #d4af3722' }}>
//       <h3 style={{ textAlign: 'center' }}>R.S.V.P.</h3>
//       <input name="guestName" required placeholder="Nume Complet" style={inputS} />
//       <select onChange={e => setIsComing(e.target.value)} style={inputS}>
//         <option value="true">VIN CU DRAG</option>
//         <option value="false">NU POT</option>
//       </select>
//       {isComing === "true" && (
//         <>
//           <input name="partnerName" placeholder="Nume Partener" style={inputS} />
//           <input name="kidsCount" type="number" placeholder="Copii" style={inputS} />
//           <input name="dietary" placeholder="Preferințe meniu" style={inputS} />
//           {showAccommodation && <select name="accommodation" style={inputS}><option value="false">NU AM NEVOIE CAZARE</option><option value="true">DA CAZARE</option></select>}
//           {showTransport && <select name="transport" style={inputS}><option value="false">NU TRANSPORT</option><option value="true">DA TRANSPORT</option></select>}
//           <textarea name="mentions" placeholder="Alte mențiuni" style={inputS} />
//         </>
//       )}
//       <button type="submit" style={{ width: '100%', background: '#d4af37', padding: '15px' }}>CONFIRMĂ</button>
//     </form>
//   );
// }
// const inputS = { width: '100%', background: 'transparent', border: '1px solid #333', color: '#fff', padding: '12px', marginBottom: '10px' };


"use client";
import React, { useState } from 'react';

export default function LuxRsvpForm({ orderId, showAccommodation, showTransport }: any) {
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
    );
  }

  return (
    <>
      <style>{`
        .lux-input {
          width: 100%;
          background: rgba(212,175,55,0.05);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 10px;
          color: #F5E6A8;
          padding: 13px 16px;
          margin-bottom: 4px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(14px, 1.8vw, 16px);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }
        .lux-input::placeholder { color: rgba(212,175,55,0.35); }
        .lux-input:focus {
          border-color: rgba(212,175,55,0.55);
          background: rgba(212,175,55,0.08);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }
        .lux-select-wrapper {
          position: relative;
        }
        .lux-select-wrapper::after {
          content: '';
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid rgba(212,175,55,0.5);
          pointer-events: none;
        }
        .lux-select-wrapper select {
          cursor: pointer;
          padding-right: 40px;
        }
        .lux-radio-group {
          display: flex;
          gap: 10px;
        }
        .lux-radio-label {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid rgba(212,175,55,0.2);
          background: rgba(212,175,55,0.04);
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: clamp(9px, 1.1vw, 11px);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.7);
          transition: all 0.2s;
          user-select: none;
        }
        .lux-radio-label:hover {
          border-color: rgba(212,175,55,0.45);
          background: rgba(212,175,55,0.1);
          color: #D4AF37;
        }
        .lux-radio-label input[type="radio"] {
          accent-color: #D4AF37;
          width: 14px;
          height: 14px;
        }
        .lux-field-label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: clamp(8px, 1vw, 10px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.5);
          margin-bottom: 8px;
        }
        .lux-field-hint {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(11px, 1.3vw, 13px);
          font-style: italic;
          color: rgba(212,175,55,0.3);
          margin-top: 5px;
          display: block;
        }
        .lux-submit-btn {
          display: block;
          width: 100%;
          padding: clamp(14px, 2vw, 18px) 0;
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
        }
        .lux-submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          background-size: 600px 100%;
          animation: shimmer 3s linear infinite;
        }
        .lux-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 55px rgba(212,175,55,0.5), 0 2px 0 rgba(245,214,120,0.4) inset;
        }
        .lux-field-block {
          margin-bottom: 20px;
        }
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        @keyframes formReveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <form onSubmit={handleSubmit} style={formWrapper}>
        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}/>

        {/* Corner accents */}
        {(['topleft','topright','bottomleft','bottomright'] as const).map(pos => (
          <div key={pos} style={{
            position: 'absolute',
            top: pos.includes('top') ? 12 : 'auto',
            bottom: pos.includes('bottom') ? 12 : 'auto',
            left: pos.includes('left') ? 12 : 'auto',
            right: pos.includes('right') ? 12 : 'auto',
            width: 14, height: 14,
            borderTop: pos.includes('top') ? '1px solid rgba(212,175,55,0.35)' : 'none',
            borderBottom: pos.includes('bottom') ? '1px solid rgba(212,175,55,0.35)' : 'none',
            borderLeft: pos.includes('left') ? '1px solid rgba(212,175,55,0.35)' : 'none',
            borderRight: pos.includes('right') ? '1px solid rgba(212,175,55,0.35)' : 'none',
          }}/>
        ))}

        <div style={{ position: 'relative', zIndex: 1, animation: 'formReveal 0.5s ease both' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(9px,1.1vw,11px)', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.55)', marginBottom: 8 }}>
              ◆ Confirmare Prezență ◆
            </p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,36px)', fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', marginBottom: 4 }}>
              R.S.V.P.
            </h3>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)', margin: '8px auto 0' }}/>
          </div>

          {/* Nume */}
          <div className="lux-field-block">
            <label className="lux-field-label">Nume și Prenume</label>
            <input name="guestName" required placeholder="ex. Maria Ionescu" className="lux-input" />
            <span className="lux-field-hint">Vă rugăm introduceți numele complet.</span>
          </div>

          {/* Răspuns */}
          <div className="lux-field-block">
            <label className="lux-field-label">Răspuns</label>
            <div className="lux-radio-group">
              <label className="lux-radio-label">
                <input type="radio" name="raspuns" value="true" defaultChecked onChange={() => setIsComing("true")} />
                Particip
              </label>
              <label className="lux-radio-label">
                <input type="radio" name="raspuns" value="false" onChange={() => setIsComing("false")} />
                Nu Particip
              </label>
            </div>
            <span className="lux-field-hint">Selectați "Nu Particip" în cazul în care nu puteți ajunge.</span>
          </div>

          {/* Hidden fields — păstrăm logica originală cu select ascuns */}
          <select onChange={e => setIsComing(e.target.value)} value={isComing} style={{ display: 'none' }}>
            <option value="true">VIN CU DRAG</option>
            <option value="false">NU POT</option>
          </select>

          {isComing === "true" && (
            <>
              {/* Partener */}
              <div className="lux-field-block">
                <label className="lux-field-label">Nume Partener (opțional)</label>
                <input name="partnerName" placeholder="ex. Ion Ionescu" className="lux-input" />
                <span className="lux-field-hint">Lăsați gol dacă veniți singur/ă.</span>
              </div>

              {/* Copii */}
              <div className="lux-field-block">
                <label className="lux-field-label">Număr Copii</label>
                <input name="kidsCount" type="number" min="0" placeholder="0" className="lux-input" />
                <span className="lux-field-hint">Introduceți 0 dacă nu veniți cu copii.</span>
              </div>

              {/* Preferințe meniu */}
              <div className="lux-field-block">
                <label className="lux-field-label">Preferințe Meniu</label>
                <input name="dietary" placeholder="ex. Vegetarian, alergii, etc." className="lux-input" />
                <span className="lux-field-hint">Menționați orice preferință sau restricție alimentară.</span>
              </div>

              {/* Cazare */}
              {showAccommodation && (
                <div className="lux-field-block">
                  <label className="lux-field-label">Aveți nevoie de cazare?</label>
                  <div className="lux-radio-group">
                    <label className="lux-radio-label">
                      <input type="radio" name="accommodation" value="false" defaultChecked />
                      Nu, mulțumesc
                    </label>
                    <label className="lux-radio-label">
                      <input type="radio" name="accommodation" value="true" />
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              {/* Transport */}
              {showTransport && (
                <div className="lux-field-block">
                  <label className="lux-field-label">Aveți nevoie de transport?</label>
                  <div className="lux-radio-group">
                    <label className="lux-radio-label">
                      <input type="radio" name="transport" value="false" defaultChecked />
                      Nu, mulțumesc
                    </label>
                    <label className="lux-radio-label">
                      <input type="radio" name="transport" value="true" />
                      Da, am nevoie
                    </label>
                  </div>
                </div>
              )}

              {/* Alte mențiuni */}
              <div className="lux-field-block">
                <label className="lux-field-label">Alte Mențiuni</label>
                <textarea name="mentions" placeholder="Orice altceva doriți să ne comunicați..." className="lux-input" rows={3} style={{ resize: 'vertical', minHeight: 80 }} />
              </div>
            </>
          )}

          {/* Submit */}
          <button type="submit" className="lux-submit-btn">
            <span style={{ position: 'relative', zIndex: 1 }}>◆ Confirmă Prezența ◆</span>
          </button>
        </div>
      </form>
    </>
  );
}

const formWrapper: React.CSSProperties = {
  background: 'linear-gradient(170deg, #1A1408, #0A0803)',
  border: '1px solid rgba(212,175,55,0.2)',
  borderRadius: 20,
  padding: 'clamp(28px,4vw,44px) clamp(22px,4vw,36px)',
  position: 'relative',
  boxShadow: '0 20px 80px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  overflow: 'hidden',
};

const confirmationBox: React.CSSProperties = {
  background: 'linear-gradient(170deg, #1A1408, #0A0803)',
  border: '1px solid rgba(212,175,55,0.2)',
  borderRadius: 20,
  padding: 'clamp(40px,6vw,60px) clamp(24px,4vw,40px)',
  textAlign: 'center',
  boxShadow: '0 20px 80px rgba(0,0,0,0.7)',
};
