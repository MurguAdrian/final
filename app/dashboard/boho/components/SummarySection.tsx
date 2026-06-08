"use client";
import React, { useEffect, useState, useRef } from 'react';

interface SummaryProps {
  isComplete: boolean;
}

export const SummarySection = ({ isComplete }: SummaryProps) => {
  const [data, setData]       = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const tableWrapRef          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res    = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Eroare API Summary:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const el = tableWrapRef.current;
    if (!el) return;

    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaY    = e.touches[0].clientY - startY;
      const atTop     = el.scrollTop === 0;
      const atBottom  = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        e.preventDefault();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove',  onTouchMove,  { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove',  onTouchMove);
    };
  }, []);

  const exportToExcel = () => {
    if (!data?.guests) return;
    const headers = ["Nume Invitat", "Status", "Adulti", "Copii", "Cazare", "Transport", "Preferinte Dieta", "Mentiuni"];
    const rows    = data.guests.map((g: any) => [
      g.guest_name,
      g.is_coming ? "DA" : "NU",
      g.adults_count,
      g.kids_count,
      g.needs_accommodation ? "DA" : "NU",
      g.needs_transport     ? "DA" : "NU",
      g.dietary_preferences || "-",
      g.other_mentions      || "-",
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url  = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `lista_invitati_${data?.weddingDetails?.custom_slug || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const userSlug = data?.weddingDetails?.custom_slug || "nunta-ta";

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '60px 20px', gap: 14,
      fontFamily: "'Cinzel', serif",
      fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase' as const,
      color: 'rgba(160,82,45,.55)',
    }}>
      <div style={{
        width: 18, height: 18,
        border: '1.5px solid rgba(193,113,74,.25)',
        borderTopColor: '#A0522D',
        borderRadius: '50%',
        animation: 'rm-spin 1s linear infinite',
      }} />
      Se încarcă...
      <style>{`
        @keyframes rm-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes rm-fade-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes rm-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes rm-fade-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .rm-row:hover        { background: rgba(193,113,74,.03) !important; }
        .rm-export-btn:hover { background: rgba(193,113,74,.1) !important; border-color: rgba(193,113,74,.45) !important; color: #7A3B1E !important; }
        .rm-copy-btn:hover   { background: linear-gradient(135deg,#7A3B1E,#A0522D,#C1714A,#A0522D,#7A3B1E) !important; }
        .rm-share-btn:hover  { background: rgba(193,113,74,.1) !important; border-color: rgba(193,113,74,.45) !important; color: #7A3B1E !important; }

        .sum-wrap   { width: 100%; max-width: 100%; box-sizing: border-box; overflow-x: hidden; }
        .sum-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
        .sum-link-row { display: flex; gap: 10px; flex-wrap: wrap; }

        .sum-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(8px, 1.5vw, 14px);
          margin-bottom: 28px;
        }

        .sum-table-wrap {
          overflow-x: auto;
          overflow-y: auto;
          max-height: clamp(300px, 55vh, 620px);
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: none;
          touch-action: pan-y;
          border-radius: 0 0 16px 16px;
        }

        .sum-link-input { font-size: 16px !important; -webkit-appearance: none; appearance: none; }

        @media (max-width: 900px) { .sum-stats-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) {
          .sum-stats-grid      { grid-template-columns: repeat(2, 1fr) !important; }
          .sum-link-row        { flex-direction: column !important; }
          .sum-link-row input  { min-width: 0 !important; width: 100% !important; }
          .sum-link-row button { width: 100% !important; }
          .sum-header          { flex-direction: column !important; align-items: flex-start !important; }
          .rm-export-btn span  { display: none; }
          .share-label         { display: none; }
          .rm-share-btn        { padding: 10px 12px !important; }
          .sum-table-wrap      { max-height: clamp(240px, 45vh, 480px) !important; }
        }
        @media (max-width: 400px) {
          .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px) { .th-cazare, .td-cazare, .th-transport, .td-transport { display: none !important; } }
        @media (max-width: 480px) { .th-details, .td-details { display: none !important; } }
      `}</style>

      <div className="sum-wrap" style={{ animation: 'rm-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

        {/* HEADER */}
        <div className="sum-header">
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em', textTransform: 'uppercase', color: 'rgba(160,82,45,.45)', marginBottom: 8 }}>
              Panou Principal
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,4vw,38px)', fontWeight: 300, fontStyle: 'italic', color: '#2C1A0E', margin: 0, lineHeight: 1.1 }}>
              Centrul de Comandă
            </h2>
          </div>
          {data?.guests?.length > 0 && (
            <button className="rm-export-btn" onClick={exportToExcel} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 4, background: 'rgba(193,113,74,.05)', border: '1px solid rgba(193,113,74,.22)', color: 'rgba(160,82,45,.75)', fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <path d="M10 13V4M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Exportă Lista</span>
            </button>
          )}
        </div>

        <BohoDivider />

        {/* LINK CARD */}
        <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${isComplete ? 'rgba(193,113,74,.25)' : 'rgba(255,165,0,.3)'}`, background: isComplete ? 'linear-gradient(160deg,rgba(193,113,74,.05) 0%,rgba(193,113,74,.02) 100%)' : 'linear-gradient(160deg,rgba(255,140,0,.08) 0%,rgba(255,140,0,.03) 100%)', padding: 'clamp(16px,3vw,24px)', marginBottom: 28, position: 'relative', boxShadow: '0 4px 24px rgba(122,59,30,.06),inset 0 1px 0 rgba(193,113,74,.06)' }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isComplete ? 'rgba(193,113,74,.35)' : 'rgba(255,165,0,.25)'},transparent)` }} />

          {!isComplete ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: 'rgba(255,165,0,.1)', border: '1px solid rgba(255,165,0,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="rgba(255,165,0,.9)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,165,0,.9)', margin: 0 }}>
                  Pasul 1: Configurează Link-ul
                </h4>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(13px,2vw,16px)', fontStyle: 'italic', color: 'rgba(44,26,14,.45)', lineHeight: 1.7 }}>
                Mergi la Personalizare pentru a alege numele link-ului.
              </p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: 'rgba(193,113,74,.1)', border: '1px solid rgba(193,113,74,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 22" fill="#A0522D" style={{ width: 14, height: 13 }}>
                    <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z" />
                  </svg>
                </div>
                <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.1em', color: '#A0522D', margin: 0 }}>
                  Invitația ta este LIVE
                </h4>
              </div>
              <div className="sum-link-row">
                <input
                  readOnly
                  className="sum-link-input"
                  value={`https://www.vibeinvite.ro/invitatie/boho/${userSlug}`}
                  style={{ flex: 1, minWidth: 0, padding: '10px 14px', background: 'rgba(249,244,238,.8)', border: '1px solid rgba(193,113,74,.18)', borderRadius: 8, color: '#A0522D', fontFamily: "'Cinzel', serif", letterSpacing: '.06em', outline: 'none', width: '100%', boxSizing: 'border-box' as const, WebkitAppearance: 'none' as any }}
                />
                <button className="rm-copy-btn" onClick={() => { navigator.clipboard.writeText(`https://www.vibeinvite.ro/invitatie/boho/${userSlug}`); alert("Copiat!"); }} style={{ padding: '10px 20px', borderRadius: 8, background: 'rgba(193,113,74,.12)', border: '1px solid rgba(193,113,74,.3)', color: '#7A3B1E', fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap' as const }}>
                  Copiază
                </button>
                <button className="rm-share-btn" onClick={() => { const url = `https://www.vibeinvite.ro/invitatie/boho/${userSlug}`; if (navigator.share) { navigator.share({ title: 'Invitație Nuntă', text: 'Te invităm să fii alături de noi în ziua nunții noastre 💍', url }).catch(() => {}); } else { window.open(`https://wa.me/?text=${encodeURIComponent('Te invităm să fii alături de noi 💍 ' + url)}`, '_blank'); } }} style={{ padding: '10px 16px', borderRadius: 8, background: 'rgba(193,113,74,.06)', border: '1px solid rgba(193,113,74,.22)', color: 'rgba(160,82,45,.75)', fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                    <circle cx="15" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M7 9l6-4M7 11l6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span className="share-label">Share</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STATS GRID */}
        <div className="sum-stats-grid">
          <StatCard title="Vizualizări" value={data?.views} icon={<svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}><path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke="#A0522D" strokeWidth="1.3" strokeLinecap="round" /><circle cx="10" cy="10" r="2.5" stroke="#A0522D" strokeWidth="1.3" /></svg>} />
          <StatCard title="Confirmări (DA)" value={data?.stats?.da} icon={<svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}><path d="M4 10l4 4 8-8" stroke="#A0522D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
          <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} icon={<svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}><circle cx="8" cy="6" r="2.5" stroke="#A0522D" strokeWidth="1.3" /><path d="M3 17c0-3 2-5 5-5s5 2 5 5" stroke="#A0522D" strokeWidth="1.3" strokeLinecap="round" /><path d="M13 8c1.3.6 2 1.8 2 3M16 17c0-2.5-1-4.5-3-5.5" stroke="#A0522D" strokeWidth="1.3" strokeLinecap="round" /></svg>} />
          <StatCard title="Cazare" value={data?.stats?.cazare} icon={<svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}><path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke="#A0522D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
          <StatCard title="Transport" value={data?.stats?.transport} icon={<svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}><rect x="2" y="7" width="16" height="9" rx="2" stroke="#A0522D" strokeWidth="1.3" /><path d="M5 7V5a3 3 0 0 1 6 0v2M6 16v2M14 16v2" stroke="#A0522D" strokeWidth="1.3" strokeLinecap="round" /></svg>} />
        </div>

        <BohoDivider />

        {/* GUEST TABLE */}
        <div style={{ background: 'rgba(193,113,74,.02)', border: '1px solid rgba(193,113,74,.15)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(122,59,30,.05),inset 0 1px 0 rgba(193,113,74,.05)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(193,113,74,.35),transparent)' }} />

          <div style={{ padding: 'clamp(16px,3vw,24px)', borderBottom: '1px solid rgba(193,113,74,.1)' }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(160,82,45,.4)', marginBottom: 5 }}>Registrul Invitaților</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px,3vw,24px)', fontStyle: 'italic', fontWeight: 300, color: '#2C1A0E', margin: 0 }}>
              Detalii Răspunsuri
              {data?.guests?.length > 0 && (
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.18em', color: 'rgba(160,82,45,.4)', marginLeft: 12, fontStyle: 'normal', fontWeight: 400 }}>
                  {data.guests.length} {data.guests.length === 1 ? 'răspuns' : 'răspunsuri'}
                </span>
              )}
            </h3>
          </div>

          <div className="sum-table-wrap" ref={tableWrapRef}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
              <thead>
                <tr style={{ background: '#FAF3EE' }}>
                  <th style={thStyle}>Nume</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Persoane</th>
                  <th style={thStyle} className="th-cazare">Cazare</th>
                  <th style={thStyle} className="th-transport">Transport</th>
                  <th style={thStyle} className="th-details">Detalii</th>
                </tr>
              </thead>
              <tbody>
                {data?.guests?.length > 0 ? (
                  data.guests.map((guest: any) => (
                    <tr key={guest.id} className="rm-row" style={{ borderBottom: '1px solid rgba(193,113,74,.06)', transition: 'background .2s' }}>
                      <td style={tdStyle}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(13px,2vw,17px)', fontWeight: 600, color: '#2C1A0E' }}>{guest.guest_name}</span>
                        {guest.partner_name && <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(160,82,45,.4)', marginTop: 2 }}>+ {guest.partner_name}</span>}
                      </td>
                      <td style={tdStyle}>
                        {guest.is_coming
                          ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 100, background: 'rgba(74,222,128,.07)', border: '1px solid rgba(74,222,128,.22)', fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em', color: 'rgba(74,180,100,.9)', whiteSpace: 'nowrap' }}>♥ VINE</span>
                          : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 100, background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.22)', fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.12em', color: 'rgba(220,80,80,.85)', whiteSpace: 'nowrap' }}>◆ NU</span>
                        }
                      </td>
                      <td style={tdStyle}><span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: 'rgba(160,82,45,.65)', letterSpacing: '.06em' }}>{guest.adults_count}A / {guest.kids_count}C</span></td>
                      <td style={tdStyle} className="td-cazare"><span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: guest.needs_accommodation ? 'rgba(160,82,45,.8)' : 'rgba(44,26,14,.2)', letterSpacing: '.06em' }}>{guest.needs_accommodation ? "♥ DA" : "—"}</span></td>
                      <td style={tdStyle} className="td-transport"><span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: guest.needs_transport ? 'rgba(160,82,45,.8)' : 'rgba(44,26,14,.2)', letterSpacing: '.06em' }}>{guest.needs_transport ? "♥ DA" : "—"}</span></td>
                      <td style={tdStyle} className="td-details">
                        {guest.dietary_preferences && <div style={{ marginBottom: guest.other_mentions ? 5 : 0 }}><span style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(160,82,45,.45)', display: 'block', marginBottom: 2 }}>Dietă</span><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(44,26,14,.6)' }}>{guest.dietary_preferences}</span></div>}
                        {guest.other_mentions     && <div><span style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(160,82,45,.45)', display: 'block', marginBottom: 2 }}>Mesaj</span><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(44,26,14,.6)' }}>{guest.other_mentions}</span></div>}
                        {!guest.dietary_preferences && !guest.other_mentions && <span style={{ color: 'rgba(44,26,14,.18)', fontSize: 14 }}>—</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                      <div style={{ marginBottom: 10, opacity: .35 }}>
                        <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36, margin: '0 auto' }}>
                          <rect x="8" y="8" width="32" height="36" rx="3" stroke="#A0522D" strokeWidth="1.5" />
                          <path d="M16 18h16M16 25h16M16 32h8" stroke="#A0522D" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: 'italic', fontWeight: 300, color: 'rgba(160,82,45,.3)', marginBottom: 5 }}>Niciun răspuns încă</p>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(160,82,45,.22)' }}>Distribuie invitația pentru a primi confirmări</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ height: 32 }} />
      </div>
    </>
  );
};

// ─── STYLES ──────────────────────────────────────────────
const thStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
  fontFamily: "'Cinzel', serif",
  fontSize: 'clamp(9px, 1.8vw, 11px)',
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: 'rgba(160,82,45,.55)',
  textAlign: 'left',
  fontWeight: 600,
  borderBottom: '1px solid rgba(193,113,74,.12)',
  whiteSpace: 'nowrap',
  position: 'sticky',
  top: 0,
  background: '#FAF3EE',
  zIndex: 2,
};

const tdStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
  verticalAlign: 'top',
};

// ─── SUB-COMPONENTS ──────────────────────────────────────
const StatCard = ({ title, value, icon }: any) => (
  <div
    style={{
      background: 'rgba(193,113,74,.03)',
      border: '1px solid rgba(193,113,74,.15)',
      borderRadius: 14,
      padding: 'clamp(12px,2vw,20px) clamp(10px,1.5vw,16px)',
      textAlign: 'center' as const,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(122,59,30,.04), inset 0 1px 0 rgba(193,113,74,.06)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '15%',
        right: '15%',
        height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(193,113,74,.3),transparent)',
      }}
    />

    {icon && (
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: 'rgba(193,113,74,.07)',
          border: '1px solid rgba(193,113,74,.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    )}

    <p
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(9px, 2.2vw, 11px)',
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: 'rgba(160,82,45,.55)',
        marginBottom: 6,
        fontWeight: 500,
      }}
    >
      {title}
    </p>

    <h4
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(26px, 4vw, 40px)',
        fontWeight: 300,
        color: '#2C1A0E',
        margin: 0,
        lineHeight: 1,
      }}
    >
      {value || 0}
    </h4>
  </div>
);

const BohoDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 24 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(193,113,74,.3))' }} />
    <svg viewBox="0 0 60 20" width="54" height="18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 L20 10" stroke="#A0522D" strokeWidth=".8" strokeOpacity=".5" />
      <path d="M40 10 L55 10" stroke="#A0522D" strokeWidth=".8" strokeOpacity=".5" />
      <path d="M30 4 Q34 7 34 10 Q34 13 30 16 Q26 13 26 10 Q26 7 30 4Z" fill="none" stroke="#A0522D" strokeWidth="1" strokeOpacity=".8" />
      <circle cx="30" cy="10" r="2" fill="#A0522D" fillOpacity=".7" />
      <circle cx="18" cy="10" r="1" fill="#A0522D" fillOpacity=".4" />
      <circle cx="42" cy="10" r="1" fill="#A0522D" fillOpacity=".4" />
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(193,113,74,.3),transparent)' }} />
  </div>
);
