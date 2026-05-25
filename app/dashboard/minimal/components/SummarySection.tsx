"use client";
import React, { useEffect, useState } from 'react';

interface SummaryProps {
  isComplete: boolean;
}

const ACCENT = '#C8503A';
const ACCENT2 = '#E8C4B8';
const DARK = '#111111';
const MID = '#555555';
const LIGHT = '#AAAAAA';
const RULE = '#E2E2E2';
const BG = '#F7F4F0';

export const SummarySection = ({ isComplete }: SummaryProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/dashboard/summary?t=${Date.now()}`);
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

  const exportToExcel = () => {
    if (!data?.guests) return;
    const headers = ["Nume Invitat", "Status", "Adulti", "Copii", "Cazare", "Transport", "Preferinte Dieta", "Mentiuni"];
    const rows = data.guests.map((g: any) => [
      g.guest_name, g.is_coming ? "DA" : "NU", g.adults_count, g.kids_count,
      g.needs_accommodation ? "DA" : "NU", g.needs_transport ? "DA" : "NU",
      g.dietary_preferences || "-", g.other_mentions || "-"
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `lista_invitati_${data?.weddingDetails?.custom_slug || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const userSlug = data?.weddingDetails?.custom_slug || "nunta-ta";

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase' as const, color: LIGHT }}>
      <div style={{ width: 16, height: 16, border: `1.5px solid ${RULE}`, borderTopColor: ACCENT, borderRadius: '50%', animation: 'mn-spin 1s linear infinite' }} />
      Se încarcă...
      <style>{`@keyframes mn-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes mn-fade-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes mn-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes mn-fade-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .mn-row:hover { background: rgba(200,80,58,.03) !important; }
        .mn-export-btn:hover { background: #fff !important; border-color: ${ACCENT} !important; color: ${ACCENT} !important; }
        .mn-copy-btn:hover { background: ${ACCENT} !important; color: #fff !important; }
        .mn-share-btn:hover { background: #fff !important; border-color: ${ACCENT} !important; color: ${ACCENT} !important; }

        .sum-wrap { width: 100%; max-width: 100%; box-sizing: border-box; overflow-x: hidden; }
        .sum-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; }
        .sum-link-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .sum-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(8px,1.5vw,12px);
          margin-bottom: 24px;
        }
        .sum-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: auto; overscroll-behavior-x: contain; }
        .sum-link-input { font-size: 16px !important; -webkit-appearance: none; appearance: none; }

        @media (max-width: 900px) { .sum-stats-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) {
          .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sum-link-row { flex-direction: column !important; }
          .sum-link-row input { min-width: 0 !important; width: 100% !important; }
          .sum-link-row button { width: 100% !important; }
          .sum-header { flex-direction: column !important; align-items: flex-start !important; }
          .mn-export-btn span { display: none; }
          .share-label { display: none; }
          .mn-share-btn { padding: 10px 12px !important; }
        }
        @media (max-width: 640px) { .th-cazare, .td-cazare, .th-transport, .td-transport { display: none !important; } }
        @media (max-width: 480px) { .th-details, .td-details { display: none !important; } }
      `}</style>

      <div className="sum-wrap" style={{ animation: 'mn-fade-in .5s ease both', fontFamily: "'DM Sans', sans-serif" }}>

        {/* HEADER */}
        <div className="sum-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 28, height: 2, background: ACCENT }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT }}>Panou Principal</p>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 400, fontStyle: 'italic', color: DARK, margin: 0, lineHeight: 1.1 }}>
              Centrul de Comandă
            </h2>
          </div>
          {data?.guests?.length > 0 && (
            <button className="mn-export-btn" onClick={exportToExcel} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px',
              background: BG, border: `1px solid ${RULE}`, color: MID,
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap', flexShrink: 0
            }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <path d="M10 13V4M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Exportă Lista</span>
            </button>
          )}
        </div>

        <MinDivider />

        {/* LINK CARD */}
        <div style={{
          border: `1px solid ${isComplete ? RULE : 'rgba(200,80,58,.3)'}`,
          borderLeft: `3px solid ${isComplete ? '#5a9a6a' : ACCENT}`,
          background: '#fff', padding: 'clamp(16px,3vw,24px)', marginBottom: 24,
          boxShadow: '0 2px 12px rgba(0,0,0,.04)'
        }}>
          {!isComplete ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(200,80,58,.08)', border: `1px solid rgba(200,80,58,.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: ACCENT, margin: 0 }}>
                  Pasul 1: Configurează Link-ul
                </h4>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px,2vw,15px)', fontStyle: 'italic', color: LIGHT, lineHeight: 1.7 }}>
                Mergi la Personalizare pentru a alege numele link-ului.
              </p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(90,154,106,.08)', border: '1px solid rgba(90,154,106,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M4 10l4 4 8-8" stroke="#5a9a6a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: DARK, margin: 0 }}>
                  Invitația ta este LIVE
                </h4>
              </div>
              <div className="sum-link-row">
                <input readOnly className="sum-link-input" value={`https://vibeinvite.ro/invitatie/minimal/${userSlug}`} style={{
                  flex: 1, minWidth: 0, padding: '10px 14px',
                  background: BG, border: `1px solid ${RULE}`, color: MID,
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: '.04em',
                  outline: 'none', width: '100%', boxSizing: 'border-box' as const,
                  WebkitAppearance: 'none' as any,
                }} />
                <button className="mn-copy-btn" onClick={() => { navigator.clipboard.writeText(`https://vibeinvite.ro/invitatie/minimal/${userSlug}`); alert("Copiat!"); }} style={{
                  padding: '10px 20px', background: DARK, border: `1px solid ${DARK}`, color: '#fff',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap'
                }}>Copiază</button>
                <button className="mn-share-btn" onClick={() => {
                  const url = `https://vibeinvite.ro/invitatie/minimal/${userSlug}`;
                  if (navigator.share) {
                    navigator.share({ title: 'Invitație Nuntă', text: 'Te invităm să fii alături de noi 💍', url }).catch(() => {});
                  } else {
                    window.open(`https://wa.me/?text=${encodeURIComponent('Te invităm să fii alături de noi 💍 ' + url)}`, '_blank');
                  }
                }} style={{
                  padding: '10px 16px', background: BG, border: `1px solid ${RULE}`, color: MID,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 7,
                  whiteSpace: 'nowrap', flexShrink: 0
                }}>
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

        {/* STATS */}
        <div className="sum-stats-grid">
          <StatCard title="Vizualizări" value={data?.views} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="10" cy="10" r="2.5" stroke={ACCENT} strokeWidth="1.3" />
            </svg>
          } />
          <StatCard title="Confirmări (DA)" value={data?.stats?.da} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M4 10l4 4 8-8" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
              <circle cx="8" cy="6" r="2.5" stroke={ACCENT} strokeWidth="1.3" />
              <path d="M3 17c0-3 2-5 5-5s5 2 5 5" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" />
              <path d="M13 8c1.3.6 2 1.8 2 3M16 17c0-2.5-1-4.5-3-5.5" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
          <StatCard title="Cazare" value={data?.stats?.cazare} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Transport" value={data?.stats?.transport} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
              <rect x="2" y="7" width="16" height="9" rx="2" stroke={ACCENT} strokeWidth="1.3" />
              <path d="M5 7V5a3 3 0 0 1 6 0v2M6 16v2M14 16v2" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
        </div>

        <MinDivider />

        {/* TABLE */}
        <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderTop: `3px solid ${ACCENT}`, boxShadow: '0 2px 12px rgba(0,0,0,.04)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: 'clamp(16px,3vw,24px)', borderBottom: `1px solid ${RULE}` }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT, marginBottom: 4 }}>Registrul Invitaților</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,3vw,22px)', fontStyle: 'italic', fontWeight: 400, color: DARK, margin: 0 }}>
              Detalii Răspunsuri
            </h3>
          </div>
          <div className="sum-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
              <thead>
                <tr style={{ background: BG }}>
                  {[
                    { label: 'Nume', cls: '' },
                    { label: 'Status', cls: '' },
                    { label: 'Persoane', cls: '' },
                    { label: 'Cazare', cls: 'th-cazare' },
                    { label: 'Transport', cls: 'th-transport' },
                    { label: 'Detalii', cls: 'th-details' },
                  ].map(h => (
                    <th key={h.label} className={h.cls} style={thStyle}>{h.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.guests?.length > 0 ? (
                  data.guests.map((guest: any) => (
                    <tr key={guest.id} className="mn-row" style={{ borderBottom: `1px solid ${RULE}`, transition: 'background .15s' }}>
                      <td style={tdStyle}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px,2vw,16px)', fontWeight: 400, color: DARK }}>{guest.guest_name}</span>
                        {guest.partner_name && (
                          <span style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontStyle: 'italic', color: LIGHT, marginTop: 2 }}>+ {guest.partner_name}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {guest.is_coming ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(90,154,106,.07)', border: '1px solid rgba(90,154,106,.25)', fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.14em', color: '#5a9a6a', whiteSpace: 'nowrap' }}>VINE</span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(200,80,58,.07)', border: '1px solid rgba(200,80,58,.25)', fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.14em', color: ACCENT, whiteSpace: 'nowrap' }}>NU</span>
                        )}
                      </td>
                      <td style={tdStyle}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: MID, letterSpacing: '.04em' }}>{guest.adults_count}A / {guest.kids_count}C</span></td>
                      <td style={tdStyle} className="td-cazare"><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: guest.needs_accommodation ? DARK : RULE }}>{guest.needs_accommodation ? "DA" : "—"}</span></td>
                      <td style={tdStyle} className="td-transport"><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: guest.needs_transport ? DARK : RULE }}>{guest.needs_transport ? "DA" : "—"}</span></td>
                      <td style={tdStyle} className="td-details">
                        {guest.dietary_preferences && (
                          <div style={{ marginBottom: guest.other_mentions ? 5 : 0 }}>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase', color: LIGHT, display: 'block', marginBottom: 2 }}>Dietă</span>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontStyle: 'italic', color: MID }}>{guest.dietary_preferences}</span>
                          </div>
                        )}
                        {guest.other_mentions && (
                          <div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase', color: LIGHT, display: 'block', marginBottom: 2 }}>Mesaj</span>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontStyle: 'italic', color: MID }}>{guest.other_mentions}</span>
                          </div>
                        )}
                        {!guest.dietary_preferences && !guest.other_mentions && (
                          <span style={{ color: RULE, fontSize: 14 }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                      <svg viewBox="0 0 48 48" fill="none" style={{ width: 32, height: 32, margin: '0 auto 10px', opacity: .25 }}>
                        <rect x="8" y="8" width="32" height="36" rx="2" stroke={DARK} strokeWidth="1.5" />
                        <path d="M16 18h16M16 25h16M16 32h8" stroke={DARK} strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontStyle: 'italic', color: LIGHT, marginBottom: 4 }}>Niciun răspuns încă</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#CCCCCC' }}>Distribuie invitația pentru a primi confirmări</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const thStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px)',
  fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.22em',
  textTransform: 'uppercase', color: '#AAAAAA',
  textAlign: 'left', fontWeight: 500,
  borderBottom: '1px solid #E2E2E2', whiteSpace: 'nowrap',
};
const tdStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px)', verticalAlign: 'top',
};

const StatCard = ({ title, value, icon }: any) => (
  <div style={{
    background: '#fff', border: '1px solid #E2E2E2', borderTop: `2px solid #C8503A`,
    padding: 'clamp(12px,2vw,18px) clamp(10px,1.5vw,16px)', textAlign: 'center' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,.04)',
  }}>
    {icon && (
      <div style={{ width: 30, height: 30, background: 'rgba(200,80,58,.07)', border: '1px solid rgba(200,80,58,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>{icon}</div>
    )}
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: 6 }}>{title}</p>
    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 400, fontStyle: 'italic', color: '#111', margin: 0, lineHeight: 1 }}>{value || 0}</h4>
  </div>
);

const MinDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 24 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#E2E2E2)' }} />
    <div style={{ width: 6, height: 6, background: '#C8503A', transform: 'rotate(45deg)', margin: '0 10px', opacity: .5 }} />
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#E2E2E2,transparent)' }} />
  </div>
);
