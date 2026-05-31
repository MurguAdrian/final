"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const DeleteAccountButton = ({ fullWidth = false }: { fullWidth?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirmed) return;
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/delete-account', { method: 'DELETE' });
      if (res.ok) {
        router.push('/');
      } else {
        alert('A apărut o eroare. Încearcă din nou.');
      }
    } catch {
      alert('Eroare de conexiune.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,300;0,400;1,300&display=swap');
        @keyframes del-fade-in { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }
        .del-btn-icon:hover { background: rgba(200,80,60,.12) !important; border-color: rgba(200,80,60,.35) !important; color: rgba(180,60,40,.9) !important; }
        .del-btn-full:hover { background: rgba(200,80,60,.1) !important; border-color: rgba(200,80,60,.35) !important; color: rgba(180,60,40,.85) !important; }
        .del-cancel:hover { background: rgba(58,94,51,.12) !important; }
        .del-confirm-btn:enabled:hover { background: rgba(180,55,35,.95) !important; }
      `}</style>

      {/* ── BUTON: icon (header) sau full-width (sidebar) ── */}
      {fullWidth ? (
        <button
          className="del-btn-full"
          onClick={() => { setOpen(true); setConfirmed(false); }}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '9px 14px', borderRadius: 8,
            background: 'rgba(200,80,60,.05)',
            border: '1px solid rgba(200,80,60,.15)',
            color: 'rgba(180,60,40,.55)',
            fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
            letterSpacing: '.18em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all .2s',
          }}>
          <TrashIcon />
          Șterge Cont
        </button>
      ) : (
<button
          className="del-btn-icon"
          onClick={() => { setOpen(true); setConfirmed(false); }}
          title="Șterge cont"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            padding: '6px 10px', borderRadius: 8,
            background: 'rgba(200,80,60,.05)',
            border: '1px solid rgba(200,80,60,.18)',
            color: 'rgba(180,60,40,.7)',
            fontFamily: "'Cinzel', serif", fontSize: 8, fontWeight: 600,
            letterSpacing: '.14em', textTransform: 'uppercase' as const,
            cursor: 'pointer', whiteSpace: 'nowrap' as const,
            transition: 'all .2s',
          }}>
          <TrashIcon />
          <span>Ștergere</span>
        </button>
      )}

      {/* ── POPUP ── */}
      {open && (
        <div
          onClick={() => !loading && setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(30,20,15,.5)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(160deg,#FDFAF2,#F8F0E0)',
              border: '1px solid rgba(154,123,63,.25)',
              borderRadius: 20, padding: 'clamp(24px,4vw,36px)',
              maxWidth: 400, width: '100%',
              boxShadow: '0 24px 64px rgba(80,40,20,.2)',
              fontFamily: "'Lora', serif",
              position: 'relative',
              animation: 'del-fade-in .22s ease both',
            }}>

            {/* Linie decorativă */}
            <div style={{
              position: 'absolute', top: 0, left: '12%', right: '12%', height: 1,
              background: 'linear-gradient(90deg,transparent,rgba(200,80,60,.35),transparent)'
            }} />

            {/* Icon */}
            <div style={{
              width: 48, height: 48, borderRadius: 14, margin: '0 auto 16px',
              background: 'rgba(200,80,60,.08)', border: '1px solid rgba(200,80,60,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  stroke="rgba(200,80,60,.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 22,
              fontWeight: 400, fontStyle: 'italic', color: '#5A3020',
              textAlign: 'center', margin: '0 0 10px'
            }}>Șterge Contul</h3>

            <p style={{
              fontSize: 14, color: 'rgba(90,48,32,.65)', textAlign: 'center',
              lineHeight: 1.75, margin: '0 0 8px'
            }}>
              Această acțiune este{' '}
              <strong style={{ color: 'rgba(180,60,40,.85)' }}>permanentă și ireversibilă.</strong>
              {' '}Se vor șterge invitația, confirmările invitaților, pozele și toate setările tale.
            </p>

            <p style={{
              fontSize: 13, color: 'rgba(180,60,40,.7)', textAlign: 'center',
              lineHeight: 1.6, margin: '0 0 20px', fontStyle: 'italic',
            }}>
              Nu vei primi nicio rambursare pentru suma plătită.
            </p>

            {/* Checkbox */}
            <label style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              cursor: 'pointer', marginBottom: 22,
              background: 'rgba(200,80,60,.04)',
              border: `1px solid ${confirmed ? 'rgba(200,80,60,.35)' : 'rgba(200,80,60,.15)'}`,
              borderRadius: 10, padding: '10px 13px',
              transition: 'border-color .2s',
            }}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                style={{ marginTop: 2, accentColor: '#C4785A', width: 15, height: 15, flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: 'rgba(90,48,32,.75)', lineHeight: 1.55 }}>
                Înțeleg că datele mele vor fi șterse definitiv și că nu voi primi banii înapoi.
              </span>
            </label>

            {/* Butoane */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="del-cancel"
                onClick={() => setOpen(false)}
                disabled={loading}
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: 10,
                  background: 'rgba(58,94,51,.07)', border: '1px solid rgba(58,94,51,.18)',
                  color: 'rgba(58,94,51,.75)', fontFamily: "'Cinzel', serif",
                  fontSize: 9, fontWeight: 600, letterSpacing: '.14em',
                  textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s',
                }}>
                Anulează
              </button>
              <button
                className="del-confirm-btn"
                onClick={handleDelete}
                disabled={!confirmed || loading}
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: 10,
                  background: confirmed ? 'rgba(190,60,40,.82)' : 'rgba(200,80,60,.15)',
                  border: '1px solid rgba(200,80,60,.25)',
                  color: confirmed ? '#FDF8F0' : 'rgba(200,80,60,.35)',
                  fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 600,
                  letterSpacing: '.14em', textTransform: 'uppercase',
                  cursor: confirmed && !loading ? 'pointer' : 'not-allowed',
                  transition: 'all .2s',
                }}>
                {loading ? 'Se șterge...' : 'Șterge Definitiv'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TrashIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="14" height="14" style={{ flexShrink: 0 }}>
    <path d="M4 6h12M9 6V4h2v2M8 9v6M12 9v6M5 6l1 11h8l1-11"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);