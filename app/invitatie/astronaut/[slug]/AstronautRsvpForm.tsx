"use client";
import React, { useState } from 'react';

interface Props {
  orderId: number;
}

export default function AstronautRsvpForm({ orderId }: Props) {
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [isComing, setIsComing]     = useState<boolean | null>(null);
  const [persoane, setPersoane]     = useState('');
  const [gdpr, setGdpr]             = useState(false);
  const [name, setName]             = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdpr)              { alert('Acceptați politica de confidențialitate pentru a continua.'); return; }
    if (isComing === null)  { alert('Selectați dacă participați sau nu.'); return; }
    if (!name.trim())       { alert('Introduceți numele și prenumele.'); return; }
    setLoading(true);
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          guestName:    name.trim(),
          isComing,
          adultsCount:  isComing ? parseInt(persoane) || 1 : 0,
          kidsCount:    0,
          plusOne:      isComing && parseInt(persoane) > 1,
        }),
      });
      setSubmitted(true);
    } catch {
      alert('Eroare la trimitere. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🪐</div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3.5vw,28px)', fontStyle: 'italic', fontWeight: 400, color: '#F4F6FB', marginBottom: 10 }}>
          Mulțumim!
        </h3>
        <p style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(14px,1.8vw,17px)', fontStyle: 'italic', color: '#B8C4E8', lineHeight: 1.8 }}>
          Confirmarea a fost înregistrată cu succes.<br />Abia așteptăm să vă avem alături!
        </p>
      </div>
    );
  }

  const chip = (active: boolean): React.CSSProperties => ({
    flex: 1, textAlign: 'center', padding: '12px 8px', borderRadius: 12,
    cursor: 'pointer', userSelect: 'none',
    border: `1.5px solid ${active ? '#F4D87E' : 'rgba(156,182,232,.25)'}`,
    background: active ? 'rgba(244,216,126,.14)' : 'rgba(255,255,255,.05)',
    color: active ? '#F4D87E' : '#F4F6FB',
    fontFamily: "'Quicksand',sans-serif", fontSize: 13, fontWeight: 700,
    transition: 'all .18s',
  });

  const chipSm = (active: boolean): React.CSSProperties => ({
    ...chip(active), flex: '1 0 auto', minWidth: 44, maxWidth: 60, padding: '11px 6px',
  });

  const canSubmit = !loading && gdpr && isComing !== null && name.trim().length > 0;

  return (
    <>
      <style>{RSVP_CSS}</style>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>

        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <span style={{ fontSize: 34, display: 'block', marginBottom: 8 }}>👨‍🚀</span>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#9CB6E8', fontWeight: 700, marginBottom: 8 }}>
            Confirmare Participare
          </p>
          <div style={{ width: 36, height: 1, background: 'rgba(244,216,126,.4)', margin: '0 auto' }} />
        </div>

        {/* name */}
        <div style={{ marginBottom: 20 }}>
          <label className="astr-label">Nume și Prenume</label>
          <input
            className="astr-input"
            required value={name}
            onChange={e => setName(e.target.value)}
            placeholder="ex. Maria Ionescu"
            autoComplete="name" autoCapitalize="words"
          />
        </div>

        {/* vin / nu vin */}
        <div style={{ marginBottom: 20 }}>
          <label className="astr-label">Răspuns</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <div onClick={() => setIsComing(true)}  style={chip(isComing === true)}>✓ Particip</div>
            <div onClick={() => setIsComing(false)} style={chip(isComing === false)}>✗ Nu pot</div>
          </div>
        </div>

        {/* nr persoane */}
        {isComing && (
          <div style={{ marginBottom: 20 }}>
            <label className="astr-label">Număr Persoane</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['1','2','3','4','5+'].map(opt => (
                <div key={opt} onClick={() => setPersoane(opt)} style={chipSm(persoane === opt)}>{opt}</div>
              ))}
            </div>
          </div>
        )}

        {/* gdpr */}
        <div style={{ background: 'rgba(124,107,196,.08)', border: '1px solid rgba(156,182,232,.16)', borderRadius: 12, padding: '12px 14px', marginBottom: 18 }}>
          <p style={{ fontFamily: "'Cormorant',serif", fontSize: 12, color: '#B8C4E8', lineHeight: 1.5, marginBottom: 8, fontStyle: 'italic' }}>
            <strong>🔒 Date Protejate:</strong> Datele tale se colectează și se șterg după 12 luni.{' '}
            <a href="https://www.vibeinvite.ro/confidentialitate" target="_blank" rel="noopener noreferrer" style={{ color: '#F4D87E', textDecoration: 'underline' }}>Politica</a>
          </p>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)}
              style={{ marginTop: 3, width: 16, height: 16, accentColor: '#7C6BC4', cursor: 'pointer', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Cormorant',serif", fontSize: 12, color: '#B8C4E8', fontStyle: 'italic', lineHeight: 1.5 }}>
              Accept colectarea datelor conform Politicii de Confidențialitate. *
            </span>
          </label>
        </div>

        <button type="submit" className="astr-submit-btn" disabled={!canSubmit} style={{ opacity: canSubmit ? 1 : .5, cursor: canSubmit ? 'pointer' : 'not-allowed' }}>
          <span style={{ position: 'relative', zIndex: 1 }}>
            {loading ? '⏳ Se trimite...' : '🚀 Confirmă Participarea'}
          </span>
        </button>
      </form>
    </>
  );
}

const RSVP_CSS = `
  .astr-label {
    display: block; font-family: 'Quicksand', sans-serif;
    font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    color: #9CB6E8; font-weight: 700; margin-bottom: 10px;
  }
  .astr-input {
    width: 100%; padding: 13px 14px; border-radius: 12px;
    border: 1.5px solid rgba(156,182,232,.28);
    background: rgba(255,255,255,.06);
    font-family: 'Nunito', sans-serif; font-size: 16px; color: #F4F6FB;
    outline: none; transition: border-color .2s, box-shadow .2s;
    box-sizing: border-box; display: block; -webkit-appearance: none;
  }
  .astr-input::placeholder { color: rgba(156,182,232,.4); }
  .astr-input:focus {
    border-color: rgba(244,216,126,.55);
    box-shadow: 0 0 0 3px rgba(124,107,196,.18);
  }
  .astr-submit-btn {
    display: block; width: 100%; padding: 15px 0; border-radius: 100px;
    background: linear-gradient(135deg, #7C6BC4 0%, #5848A0 100%);
    color: #fff; text-align: center;
    font-family: 'Quicksand', sans-serif;
    font-size: clamp(11px,1.3vw,13px); font-weight: 700;
    letter-spacing: .18em; text-transform: uppercase;
    border: none; box-shadow: 0 10px 36px rgba(88,72,160,.5);
    transition: transform .22s, box-shadow .22s;
    position: relative; overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  .astr-submit-btn:not(:disabled):hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 46px rgba(88,72,160,.65);
  }
  .astr-submit-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
    background-size: 350px 100%; animation: astr-shimmer 3s linear infinite;
  }
  @keyframes astr-shimmer { 0%{background-position:-350px 0} 100%{background-position:350px 0} }
  @media(max-width:480px){
    .astr-input { font-size: 16px; padding: 13px 12px; border-radius: 10px; }
    .astr-submit-btn { font-size: 12px; }
  }
`;
