"use client";
import React, { useState } from 'react';

interface Props {
  orderId:   number;
  onClose:   () => void;
  onSuccess: () => void;
}

export default function UrsuletRsvpForm({ orderId, onClose, onSuccess }: Props) {
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
        <div style={{ fontSize:48, marginBottom:14 }}>🧸</div>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(20px,3.5vw,26px)', fontStyle:'italic', fontWeight:500, color:'#8B5E3C', marginBottom:10 }}>
          Mulțumim!
        </h3>
        <p style={{ fontFamily:"'Cormorant',serif", fontSize:'clamp(14px,1.8vw,17px)', fontStyle:'italic', color:'#A07850', lineHeight:1.8 }}>
          Confirmarea a fost înregistrată cu succes.<br />Abia așteptăm să vă avem alături!
        </p>
        <button
          onClick={onClose}
          style={{ marginTop:20, background:'none', border:'1px solid rgba(122,170,192,.35)', borderRadius:100, padding:'8px 22px', cursor:'pointer', fontFamily:"'Quicksand',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#7AAAC0', transition:'all .2s' }}
        >
          Închide
        </button>
      </div>
    );
  }

  const chip = (active: boolean): React.CSSProperties => ({
    flex:1, textAlign:'center', padding:'12px 8px', borderRadius:12,
    cursor:'pointer', userSelect:'none',
    border:`1.5px solid ${active ? '#7AAAC0' : 'rgba(122,170,192,.24)'}`,
    background: active ? 'rgba(122,170,192,.14)' : 'rgba(255,255,255,.72)',
    color:'#8B5E3C',
    fontFamily:"'Nunito',sans-serif", fontSize:13, fontWeight:700,
    transition:'all .18s',
  });

  const kidsChip = (opt: string): React.CSSProperties => ({
    flex:'1 0 auto', minWidth:44, maxWidth:60, textAlign:'center',
    padding:'11px 6px', borderRadius:12, cursor:'pointer', userSelect:'none',
    border:`1.5px solid ${kids===opt ? '#7AAAC0' : 'rgba(122,170,192,.24)'}`,
    background: kids===opt ? 'rgba(122,170,192,.14)' : 'rgba(255,255,255,.72)',
    color:'#8B5E3C',
    fontFamily:"'Nunito',sans-serif", fontSize:13, fontWeight:700,
    transition:'all .18s',
  });

  const canSubmit = !loading && gdpr && isComing !== null && name.trim().length > 0;

  return (
    <>
      <style>{RSVP_CSS}</style>
      <form onSubmit={handleSubmit} style={{ width:'100%' }}>

        <div style={{ textAlign:'center', marginBottom:22 }}>
          <span style={{ fontSize:34, display:'block', marginBottom:8 }}>🧸</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(20px,3vw,26px)', fontStyle:'italic', fontWeight:500, color:'#8B5E3C', marginBottom:5 }}>
            Confirmă Participarea
          </h2>
          <div style={{ width:32, height:1, background:'rgba(122,170,192,.5)', margin:'0 auto 9px' }} />
          <p style={{ fontFamily:"'Cormorant',serif", fontSize:14, fontStyle:'italic', color:'#A07850', lineHeight:1.7 }}>Completează câmpurile de mai jos</p>
        </div>

        <div style={{ marginBottom:20 }}>
          <label className="urs-label">Nume și Prenume *</label>
          <input className="urs-input" required value={name} onChange={e => setName(e.target.value)} placeholder="ex. Maria Ionescu" autoComplete="name" autoCapitalize="words" />
        </div>

        <div style={{ marginBottom:20 }}>
          <label className="urs-label">Răspuns *</label>
          <div style={{ display:'flex', gap:8 }}>
            <div onClick={() => setIsComing(true)}  style={chip(isComing===true)}>✓ Particip</div>
            <div onClick={() => setIsComing(false)} style={chip(isComing===false)}>✗ Nu pot</div>
          </div>
        </div>

        {isComing && (
          <>
            <div style={{ marginBottom:20 }}>
              <label className="urs-label">Nume Partener (opțional)</label>
              <input className="urs-input" value={partner} onChange={e => setPartner(e.target.value)} placeholder="ex. Ion Ionescu" autoComplete="off" autoCapitalize="words" />
              <p style={{ fontFamily:"'Cormorant',serif", fontSize:12, fontStyle:'italic', color:'rgba(122,170,192,.7)', marginTop:6 }}>
                Lăsați gol dacă veniți singur/ă.
              </p>
            </div>

            <div style={{ marginBottom:20 }}>
              <label className="urs-label">Număr Copii</label>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {['0','1','2','3','4+'].map(opt => (
                  <div key={opt} onClick={() => setKids(kids===opt ? '' : opt)} style={kidsChip(opt)}>{opt}</div>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{ background:'rgba(152,192,220,.1)', border:'1px solid rgba(122,170,192,.2)', borderRadius:11, padding:'12px 14px', marginBottom:18 }}>
          <p style={{ fontFamily:"'Cormorant',serif", fontSize:12, color:'#A07850', lineHeight:1.5, marginBottom:8, fontStyle:'italic' }}>
            <strong>🔒 Date Protejate:</strong> Datele tale se colectează și se șterg după 12 luni.{' '}
            <a href="https://www.vibeinvite.ro/confidentialitate" target="_blank" rel="noopener noreferrer" style={{ color:'#4880A0', textDecoration:'underline' }}>Politica</a>
          </p>
          <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
            <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} style={{ marginTop:3, width:16, height:16, accentColor:'#7AAAC0', cursor:'pointer', flexShrink:0 }} />
            <span style={{ fontFamily:"'Cormorant',serif", fontSize:12, color:'#A07850', fontStyle:'italic', lineHeight:1.5 }}>
              Accept colectarea datelor conform Politicii de Confidențialitate. *
            </span>
          </label>
        </div>

        <button type="submit" className="urs-submit-btn" disabled={!canSubmit} style={{ opacity:canSubmit ? 1 : .5, cursor:canSubmit ? 'pointer' : 'not-allowed' }}>
          <span style={{ position:'relative', zIndex:1 }}>
            {loading ? '⏳ Se trimite...' : '🎈 Confirmă Participarea'}
          </span>
        </button>

        <div style={{ textAlign:'center', marginTop:12 }}>
          <button type="button" onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Cormorant',serif", fontSize:13, fontStyle:'italic', color:'rgba(122,170,192,.7)', textDecoration:'underline' }}>
            Închide
          </button>
        </div>
      </form>
    </>
  );
}

const RSVP_CSS = `
  .urs-label {
    display: block; font-family: 'Quicksand', sans-serif;
    font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
    color: #7AAAC0; font-weight: 700; margin-bottom: 8px;
  }
  .urs-input {
    width: 100%; padding: 11px 13px; border-radius: 12px;
    border: 1.5px solid rgba(122,170,192,.28);
    background: rgba(255,255,255,.88);
    font-family: 'Nunito', sans-serif; font-size: 16px; color: #8B5E3C;
    outline: none; transition: border-color .2s, box-shadow .2s;
    box-sizing: border-box; display: block; -webkit-appearance: none;
  }
  .urs-input::placeholder { color: rgba(122,170,192,.45); }
  .urs-input:focus { border-color: rgba(122,170,192,.68); box-shadow: 0 0 0 3px rgba(122,170,192,.12); }
  .urs-submit-btn {
    display: block; width: 100%; padding: 14px 0; border-radius: 100px;
    background: linear-gradient(135deg, #7AAAC0 0%, #4880A0 100%);
    color: #fff; text-align: center; font-family: 'Quicksand', sans-serif;
    font-size: clamp(11px,1.3vw,13px); font-weight: 700;
    letter-spacing: .18em; text-transform: uppercase;
    border: none; box-shadow: 0 8px 26px rgba(72,128,160,.35);
    transition: transform .22s, box-shadow .22s;
    position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent;
  }
  .urs-submit-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(72,128,160,.5); }
  .urs-submit-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
    background-size: 350px 100%; animation: urs-shimmer 3s linear infinite;
  }
  @keyframes urs-shimmer { 0%{background-position:-350px 0} 100%{background-position:350px 0} }
  @media(max-width:480px){
    .urs-input { font-size: 16px; padding: 11px 12px; border-radius: 10px; }
    .urs-submit-btn { font-size: 12px; }
  }
`;