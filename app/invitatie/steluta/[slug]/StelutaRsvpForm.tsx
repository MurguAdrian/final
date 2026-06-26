"use client";
import React, { useState } from 'react';

interface Props {
  orderId:   number;
  onClose:   () => void;
  onSuccess: () => void;
}

export default function StelutaRsvpForm({ orderId, onClose, onSuccess }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [isComing,  setIsComing]  = useState<boolean | null>(null);
  const [name,      setName]      = useState('');
  const [partner,   setPartner]   = useState('');
  const [kids,      setKids]      = useState('');
  const [gdpr,      setGdpr]      = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim())      { alert('Introduceți numele și prenumele.'); return; }
    if (isComing === null) { alert('Selectați dacă participați sau nu.'); return; }
    if (!gdpr)             { alert('Acceptați politica de confidențialitate pentru a continua.'); return; }

    const kidsCount   = parseInt(kids) || 0;
    const adultsCount = isComing ? (partner.trim() ? 2 : 1) : 0;

    setLoading(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          guestName:   name.trim(),
          partnerName: partner.trim() || null,
          isComing,
          adultsCount,
          kidsCount,
          plusOne:     !!partner.trim(),
        }),
      });
      if (!res.ok) throw new Error('server error');
      setSubmitted(true);
      onSuccess();
    } catch {
      alert('Eroare la trimitere. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign:'center', padding:'24px 0' }}>
        <div style={{ fontSize:48, marginBottom:14 }}>🌟</div>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(20px,3.5vw,26px)', fontStyle:'italic', fontWeight:400, color:'#065F46', marginBottom:10 }}>
          Mulțumim!
        </h3>
        <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', color:'#374151', lineHeight:1.8 }}>
          Confirmarea a fost înregistrată cu succes.<br />Abia așteptăm să vă avem alături!
        </p>
        <button
          onClick={onClose}
          style={{ marginTop:20, background:'none', border:'1px solid rgba(110,231,183,.35)', borderRadius:100, padding:'8px 22px', cursor:'pointer', fontFamily:"'Quicksand',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#059669', transition:'all .2s' }}
        >
          Închide
        </button>
      </div>
    );
  }

  const chip = (active: boolean): React.CSSProperties => ({
    flex:1, textAlign:'center', padding:'12px 8px', borderRadius:12,
    cursor:'pointer', userSelect:'none',
    border:`1.5px solid ${active ? '#059669' : 'rgba(5,150,105,.22)'}`,
    background: active ? 'rgba(5,150,105,.12)' : 'rgba(255,255,255,.75)',
    color:'#065F46',
    fontFamily:"'Quicksand',sans-serif", fontSize:13, fontWeight:700,
    transition:'all .18s',
  });

  const kidsChip = (opt: string): React.CSSProperties => ({
    flex:'1 0 auto', minWidth:44, maxWidth:60, textAlign:'center',
    padding:'11px 6px', borderRadius:12, cursor:'pointer', userSelect:'none',
    border:`1.5px solid ${kids===opt ? '#059669' : 'rgba(5,150,105,.22)'}`,
    background: kids===opt ? 'rgba(5,150,105,.12)' : 'rgba(255,255,255,.75)',
    color:'#065F46',
    fontFamily:"'Quicksand',sans-serif", fontSize:13, fontWeight:700,
    transition:'all .18s',
  });

  const canSubmit = !loading && gdpr && isComing !== null && name.trim().length > 0;

  return (
    <>
      <style>{RSVP_CSS}</style>
      <form onSubmit={handleSubmit} style={{ width:'100%' }}>

        <div style={{ textAlign:'center', marginBottom:22 }}>
          <span style={{ fontSize:34, display:'block', marginBottom:8 }}>🌟</span>
          <p style={{ fontFamily:"'Quicksand',sans-serif", fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#059669', fontWeight:700, marginBottom:8 }}>
            Confirmare Participare
          </p>
          <div style={{ width:40, height:1.5, background:'linear-gradient(90deg,#6EE7B7,#FCD34D)', margin:'0 auto', borderRadius:2 }} />
        </div>

        <div style={{ marginBottom:20 }}>
          <label className="stl-label">Nume și Prenume *</label>
          <input className="stl-input" required value={name} onChange={e => setName(e.target.value)} placeholder="ex. Maria Ionescu" autoComplete="name" autoCapitalize="words" />
        </div>

        <div style={{ marginBottom:20 }}>
          <label className="stl-label">Răspuns *</label>
          <div style={{ display:'flex', gap:10 }}>
            <div onClick={() => setIsComing(true)}  style={chip(isComing===true)}>✓ Particip</div>
            <div onClick={() => setIsComing(false)} style={chip(isComing===false)}>✗ Nu pot</div>
          </div>
        </div>

        {isComing && (
          <>
            <div style={{ marginBottom:20 }}>
              <label className="stl-label">Nume Partener (opțional)</label>
              <input className="stl-input" value={partner} onChange={e => setPartner(e.target.value)} placeholder="ex. Ion Ionescu" autoComplete="off" autoCapitalize="words" />
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:12, fontStyle:'italic', color:'rgba(107,114,128,.6)', marginTop:6 }}>
                Lăsați gol dacă veniți singur/ă.
              </p>
            </div>

            <div style={{ marginBottom:20 }}>
              <label className="stl-label">Număr Copii</label>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {['0','1','2','3','4+'].map(opt => (
                  <div key={opt} onClick={() => setKids(kids===opt ? '' : opt)} style={kidsChip(opt)}>{opt}</div>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{ background:'rgba(110,231,183,.1)', border:'1px solid rgba(110,231,183,.25)', borderRadius:12, padding:'12px 14px', marginBottom:18 }}>
          <p style={{ fontFamily:"'Cormorant',serif", fontSize:12, color:'#374151', lineHeight:1.5, marginBottom:8, fontStyle:'italic' }}>
            <strong>🔒 Date Protejate:</strong> Datele tale se colectează și se șterg după 12 luni.{' '}
            <a href="https://www.vibeinvite.ro/politica" target="_blank" rel="noopener noreferrer" style={{ color:'#059669', textDecoration:'underline' }}>Politica</a>
          </p>
          <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
            <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} style={{ marginTop:3, width:16, height:16, accentColor:'#34D399', cursor:'pointer', flexShrink:0 }} />
            <span style={{ fontFamily:"'Cormorant',serif", fontSize:12, color:'#374151', fontStyle:'italic', lineHeight:1.5 }}>
              Accept colectarea datelor conform Politicii de Confidențialitate. *
            </span>
          </label>
        </div>

        <button type="submit" className="stl-submit-btn" disabled={!canSubmit} style={{ opacity:canSubmit ? 1 : .5, cursor:canSubmit ? 'pointer' : 'not-allowed' }}>
          <span style={{ position:'relative', zIndex:1 }}>
            {loading ? '⏳ Se trimite...' : '✨ Trimite Confirmarea'}
          </span>
        </button>

        <div style={{ textAlign:'center', marginTop:14 }}>
          <button type="button" onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Cormorant',serif", fontSize:13, fontStyle:'italic', color:'rgba(107,114,128,.55)', textDecoration:'underline' }}>
            Închide
          </button>
        </div>
      </form>
    </>
  );
}

const RSVP_CSS = `
  .stl-label {
    display: block; font-family: 'Quicksand', sans-serif;
    font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    color: #059669; font-weight: 700; margin-bottom: 10px;
  }
  .stl-input {
    width: 100%; padding: 13px 14px; border-radius: 12px;
    border: 1.5px solid rgba(110,231,183,.3);
    background: rgba(255,255,255,.9);
    font-family: 'Nunito', sans-serif; font-size: 16px; color: #065F46;
    outline: none; transition: border-color .2s, box-shadow .2s;
    box-sizing: border-box; display: block; -webkit-appearance: none;
  }
  .stl-input::placeholder { color: rgba(5,150,105,.35); }
  .stl-input:focus { border-color: rgba(5,150,105,.6); box-shadow: 0 0 0 3px rgba(110,231,183,.18); }
  .stl-submit-btn {
    display: block; width: 100%; padding: 15px 0; border-radius: 100px;
    background: linear-gradient(135deg, #34D399 0%, #D97706 100%);
    color: #fff; text-align: center; font-family: 'Quicksand', sans-serif;
    font-size: clamp(11px,1.3vw,13px); font-weight: 700;
    letter-spacing: .18em; text-transform: uppercase;
    border: none; box-shadow: 0 10px 32px rgba(5,150,105,.38);
    transition: transform .22s, box-shadow .22s;
    position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent;
  }
  .stl-submit-btn:not(:disabled):hover { transform: translateY(-3px); box-shadow: 0 18px 46px rgba(5,150,105,.55); }
  .stl-submit-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
    background-size: 300px 100%; animation: stl-shimmer 2.5s linear infinite;
  }
  @keyframes stl-shimmer { 0%{background-position:0% 0} 100%{background-position:300% 0} }
  @media(max-width:480px){
    .stl-input { font-size: 16px; padding: 13px 12px; border-radius: 10px; }
    .stl-submit-btn { font-size: 12px; }
  }
`;