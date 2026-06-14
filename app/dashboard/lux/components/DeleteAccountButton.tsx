"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export const DeleteAccountButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const router = useRouter();

  useEffect(() => {
    setPortalTarget(document.getElementById('modal-root'));
  }, []);

  const handleDelete = async () => {
    if (!confirmed) return;
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/delete-account', { method: 'DELETE' });
      if (res.ok) {
        router.push('/');
      } else {
        Swal.fire({
          title: '<span style="color: #8B6914; font-family: serif;">Of, o problemă... ◆</span>',
          text: 'Nu am putut procesa ștergerea. Te rugăm să încerci din nou.',
          icon: 'error',
          confirmButtonColor: '#D4AF37',
          background: '#fdfbf0',
        });
      }
    } catch {
      Swal.fire({
        title: '<span style="color: #8B6914; font-family: serif;">Eroare de conexiune ◆</span>',
        text: 'Conexiunea a eșuat. Încearcă din nou puțin mai târziu.',
        icon: 'error',
        confirmButtonColor: '#D4AF37',
        background: '#fdfbf0',
      });
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div
      onClick={() => !loading && setOpen(false)}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100vw', height: '100vh',
        zIndex: 999999,
        background: 'rgba(30,20,15,.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        pointerEvents: 'all',
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg,#FDFAF2,#F8F0E0)',
          border: '1px solid rgba(154,123,63,.25)',
          borderRadius: 20,
          padding: 'clamp(24px,5vw,36px)',
          maxWidth: 400, width: '100%',
          boxShadow: '0 24px 64px rgba(80,40,20,.25)',
          fontFamily: "'Lora', serif",
        }}>

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
          fontFamily: "'Cinzel', serif", fontSize: 18,
          fontWeight: 500, color: '#5A3020',
          textAlign: 'center', margin: '0 0 10px', letterSpacing: '.06em'
        }}>Șterge Contul</h3>

        <p style={{ fontSize: 14, color: 'rgba(90,48,32,.65)', textAlign: 'center', lineHeight: 1.75, margin: '0 0 8px' }}>
          Această acțiune este{' '}
          <strong style={{ color: 'rgba(180,60,40,.85)' }}>permanentă și ireversibilă.</strong>
          {' '}Se vor șterge invitația, confirmările, pozele și toate setările.
        </p>

        <p style={{ fontSize: 13, color: 'rgba(180,60,40,.7)', textAlign: 'center', lineHeight: 1.6, margin: '0 0 20px', fontStyle: 'italic' }}>
          Nu vei primi nicio rambursare pentru suma plătită.
        </p>

        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          cursor: 'pointer', marginBottom: 22,
          background: 'rgba(200,80,60,.04)',
          border: `1px solid ${confirmed ? 'rgba(200,80,60,.35)' : 'rgba(200,80,60,.15)'}`,
          borderRadius: 10, padding: '10px 13px', transition: 'border-color .2s',
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

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 10,
              background: 'rgba(58,94,51,.07)', border: '1px solid rgba(58,94,51,.18)',
              color: 'rgba(58,94,51,.75)', fontFamily: "'Cinzel', serif",
              fontSize: 9, fontWeight: 600, letterSpacing: '.14em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}>
            Anulează
          </button>
          <button
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
            }}>
            {loading ? 'Se șterge...' : 'Șterge Definitiv'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => { setOpen(true); setConfirmed(false); }}
        title="Șterge cont"
        style={{
          background: 'none', border: 'none',
          cursor: 'pointer', padding: 6, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(180,60,40,.5)', flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'rgba(180,60,40,.9)'; e.currentTarget.style.background = 'rgba(200,80,60,.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(180,60,40,.5)'; e.currentTarget.style.background = 'none'; }}
      >
        <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
          <path d="M4 6h12M9 6V4h2v2M8 9v6M12 9v6M5 6l1 10h8l1-10"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && portalTarget && createPortal(modal, portalTarget)}
    </>
  );
};