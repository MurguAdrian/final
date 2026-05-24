"use client";
import React, { useEffect, useState } from 'react';

interface SummaryProps {
  isComplete: boolean;
}

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
      g.guest_name,
      g.is_coming ? "DA" : "NU",
      g.adults_count,
      g.kids_count,
      g.needs_accommodation ? "DA" : "NU",
      g.needs_transport ? "DA" : "NU",
      g.dietary_preferences || "-",
      g.other_mentions || "-"
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
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '60px 20px', gap: 14,
      fontFamily: "'Playfair Display', serif",
      fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase' as const,
      color: 'rgba(196,120,90,.65)'
    }}>
      <div style={{
        width: 18, height: 18, border: '1.5px solid rgba(196,120,90,.3)',
        borderTopColor: '#C4785A', borderRadius: '50%',
        animation: 'boho-spin 1s linear infinite'
      }} />
      Se încarcă...
      <style>{`@keyframes boho-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes boho-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lora:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes boho-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes boho-fade-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .boho-row:hover { background: rgba(196,120,90,.04) !important; }
        .boho-export-btn:hover { background: rgba(196,120,90,.12) !important; border-color: rgba(196,120,90,.5) !important; color: #C4785A !important; }
        .boho-copy-btn:hover { background: linear-gradient(135deg,#C4785A,#E8A48A,#F5C4A8,#E8A48A,#C4785A) !important; color: #FDF6EF !important; }

        .sum-wrap { width: 100%; max-width: 100%; box-sizing: border-box; overflow-x: hidden; }
        .sum-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
        .sum-link-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .sum-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(8px,1.5vw,14px);
          margin-bottom: 28px;
        }

        .sum-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: auto;
          overscroll-behavior-x: contain;
        }

        .boho-share-btn:hover { background: rgba(196,120,90,.12) !important; border-color: rgba(196,120,90,.45) !important; color: #C4785A !important; }
        @media (max-width: 600px) {
          .share-label { display: none; }
          .boho-share-btn { padding: 10px 12px !important; }
        }

        .sum-link-input {
          font-size: 16px !important;
          -webkit-appearance: none;
          appearance: none;
        }

        @media (max-width: 900px) {
          .sum-stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sum-link-row { flex-direction: column !important; }
          .sum-link-row input { min-width: 0 !important; width: 100% !important; }
          .sum-link-row button { width: 100% !important; }
          .sum-header { flex-direction: column !important; align-items: flex-start !important; }
          .boho-export-btn span { display: none; }
        }
        @media (max-width: 400px) {
          .sum-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px) {
          .th-cazare, .td-cazare,
          .th-transport, .td-transport { display: none !important; }
        }
        @media (max-width: 480px) {
          .th-details, .td-details { display: none !important; }
        }
      `}</style>

      <div className="sum-wrap" style={{ animation: 'boho-fade-in .55s ease both', fontFamily: "'Lora', serif" }}>

        <div className="sum-header">
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(196,120,90,.55)', marginBottom: 8 }}>Panou Principal</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,4vw,38px)', fontWeight: 400, fontStyle: 'italic', color: '#7A4A35', margin: 0, lineHeight: 1.1 }}>Centrul de Comandă</h2>
          </div>
          {data?.guests?.length > 0 && (
            <button
              className="boho-export-btn"
              onClick={exportToExcel}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 16px', borderRadius: 10,
                background: 'rgba(196,120,90,.06)',
                border: '1px solid rgba(196,120,90,.25)',
                color: 'rgba(122,74,53,.8)',
                fontFamily: "'Playfair Display', serif", fontSize: 10,
                fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all .2s',
                whiteSpace: 'nowrap', flexShrink: 0
              }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <path d="M10 13V4M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Exportă Lista</span>
            </button>
          )}
        </div>

        <BohoDivider />

        <div style={{
          borderRadius: 16, overflow: 'hidden',
          border: `1px solid ${isComplete ? 'rgba(196,120,90,.25)' : 'rgba(220,140,60,.35)'}`,
          background: isComplete
            ? 'linear-gradient(160deg,rgba(255,245,235,.95) 0%,rgba(253,240,230,.98) 100%)'
            : 'linear-gradient(160deg,rgba(255,220,180,.2) 0%,rgba(253,240,230,.9) 100%)',
          padding: 'clamp(16px,3vw,24px)',
          marginBottom: 28,
          position: 'relative',
          boxShadow: '0 6px 28px rgba(196,120,90,.1),inset 0 1px 0 rgba(255,255,255,.9)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isComplete ? 'rgba(196,120,90,.3)' : 'rgba(220,140,60,.25)'},transparent)` }} />
          {!isComplete ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: 'rgba(220,140,60,.1)', border: '1px solid rgba(220,140,60,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="rgba(200,120,50,.9)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: 'rgba(180,100,40,.9)', margin: 0 }}>Pasul 1: Configurează Link-ul</h4>
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(13px,2vw,16px)', fontStyle: 'italic', color: 'rgba(122,74,53,.5)', lineHeight: 1.7 }}>Mergi la Personalizare pentru a alege numele link-ului.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: 'rgba(196,120,90,.1)', border: '1px solid rgba(196,120,90,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M10 2L10 6M13 5l-3 3-3-3M3 12h14M5 16h10" stroke="#C4785A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: '#C4785A', margin: 0 }}>Invitația ta este LIVE</h4>
              </div>

              <div className="sum-link-row">
                <input
                  readOnly
                  className="sum-link-input"
                  value={`https://vibeinvite.ro/invitatie/boho/${userSlug}`}
                  style={{
                    flex: 1, minWidth: 0, padding: '10px 14px',
                    background: 'rgba(255,255,255,.7)', border: '1px solid rgba(196,120,90,.2)',
                    borderRadius: 10, color: '#C4785A',
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: '.06em',
                    outline: 'none', width: '100%', boxSizing: 'border-box' as const,
                    WebkitAppearance: 'none' as any,
                  }}
                />
                <button
                  className="boho-copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://vibeinvite.ro/invitatie/boho/${userSlug}`);
                    alert("Copiat!");
                  }}
                  style={{
                    padding: '10px 20px', borderRadius: 10,
                    background: 'rgba(196,120,90,.12)',
                    border: '1px solid rgba(196,120,90,.35)',
                    color: '#C4785A',
                    fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600,
                    letterSpacing: '.14em', textTransform: 'uppercase' as const,
                    cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap' as const
                  }}>
                  Copiază
                </button>
                <button
                  className="boho-share-btn"
                  onClick={() => {
                    const url = `https://vibeinvite.ro/invitatie/boho/${userSlug}`;
                    if (navigator.share) {
                      navigator.share({ title: 'Invitație Nuntă', text: 'Te invităm să fii alături de noi în ziua nunții noastre 🌿', url }).catch(() => {});
                    } else {
                      window.open(`https://wa.me/?text=${encodeURIComponent('Te invităm să fii alături de noi 🌿 ' + url)}`, '_blank');
                    }
                  }}
                  style={{
                    padding: '10px 16px', borderRadius: 10,
                    background: 'rgba(196,120,90,.06)',
                    border: '1px solid rgba(196,120,90,.25)',
                    color: 'rgba(122,74,53,.8)',
                    fontFamily: "'Playfair Display', serif", fontSize: 12, fontWeight: 600,
                    letterSpacing: '.1em', textTransform: 'uppercase' as const,
                    cursor: 'pointer', transition: 'all .2s',
                    display: 'flex', alignItems: 'center', gap: 7,
                    whiteSpace: 'nowrap' as const, flexShrink: 0
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

        <div className="sum-stats-grid">
          <StatCard title="Vizualizări" value={data?.views} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="10" cy="10" r="2.5" stroke="#C4785A" strokeWidth="1.3" />
            </svg>
          } />
          <StatCard title="Confirmări (DA)" value={data?.stats?.da} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M4 10l4 4 8-8" stroke="#C4785A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Total Persoane" value={(data?.stats?.adulti || 0) + (data?.stats?.copii || 0)} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <circle cx="8" cy="6" r="2.5" stroke="#C4785A" strokeWidth="1.3" />
              <path d="M3 17c0-3 2-5 5-5s5 2 5 5" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M13 8c1.3.6 2 1.8 2 3M16 17c0-2.5-1-4.5-3-5.5" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
          <StatCard title="Cazare" value={data?.stats?.cazare} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          } />
          <StatCard title="Transport" value={data?.stats?.transport} icon={
            <svg viewBox="0 0 20 20" fill="none" style={{ width: 15, height: 15 }}>
              <rect x="2" y="7" width="16" height="9" rx="2" stroke="#C4785A" strokeWidth="1.3" />
              <path d="M5 7V5a3 3 0 0 1 6 0v2M6 16v2M14 16v2" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          } />
        </div>

        <BohoDivider />

        <div style={{
          background: 'rgba(255,248,240,.9)',
          border: '1px solid rgba(196,120,90,.18)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 6px 32px rgba(196,120,90,.1),inset 0 1px 0 rgba(255,255,255,.9)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.3),transparent)' }} />

          <div style={{ padding: 'clamp(16px,3vw,24px)', borderBottom: '1px solid rgba(196,120,90,.1)' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(196,120,90,.5)', marginBottom: 5 }}>Registrul Invitaților</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,3vw,24px)', fontStyle: 'italic', fontWeight: 400, color: '#7A4A35', margin: 0 }}>Detalii Răspunsuri</h3>
          </div>

          <div className="sum-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
              <thead>
                <tr style={{ background: 'rgba(196,120,90,.06)' }}>
                  <th style={thStyle}>Nume</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Persoane</th>
                  <th style={{ ...thStyle }} className="th-cazare">Cazare</th>
                  <th style={{ ...thStyle }} className="th-transport">Transport</th>
                  <th style={{ ...thStyle }} className="th-details">Detalii</th>
                </tr>
              </thead>
              <tbody>
                {data?.guests?.length > 0 ? (
                  data.guests.map((guest: any) => (
                    <tr key={guest.id} className="boho-row" style={{ borderBottom: '1px solid rgba(196,120,90,.08)', transition: 'background .2s' }}>
                      <td style={tdStyle}>
                        <span style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(13px,2vw,17px)', fontWeight: 600, color: '#7A4A35' }}>{guest.guest_name}</span>
                        {guest.partner_name && (
                          <span style={{ display: 'block', fontFamily: "'Lora', serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(196,120,90,.5)', marginTop: 2 }}>+ {guest.partner_name}</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {guest.is_coming ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 100, background: 'rgba(100,160,80,.08)', border: '1px solid rgba(100,160,80,.25)', fontFamily: "'Playfair Display', serif", fontSize: 8, letterSpacing: '.1em', color: 'rgba(80,140,60,.9)', whiteSpace: 'nowrap' }}>✦ VINE</span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 100, background: 'rgba(200,80,60,.07)', border: '1px solid rgba(200,80,60,.22)', fontFamily: "'Playfair Display', serif", fontSize: 8, letterSpacing: '.1em', color: 'rgba(180,70,50,.9)', whiteSpace: 'nowrap' }}>◆ NU</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: 'rgba(122,74,53,.7)', letterSpacing: '.06em' }}>{guest.adults_count}A / {guest.kids_count}C</span>
                      </td>
                      <td style={tdStyle} className="td-cazare">
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: guest.needs_accommodation ? '#C4785A' : 'rgba(122,74,53,.25)', letterSpacing: '.06em' }}>
                          {guest.needs_accommodation ? "✦ DA" : "—"}
                        </span>
                      </td>
                      <td style={tdStyle} className="td-transport">
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: guest.needs_transport ? '#C4785A' : 'rgba(122,74,53,.25)', letterSpacing: '.06em' }}>
                          {guest.needs_transport ? "✦ DA" : "—"}
                        </span>
                      </td>
                      <td style={tdStyle} className="td-details">
                        {guest.dietary_preferences && (
                          <div style={{ marginBottom: guest.other_mentions ? 5 : 0 }}>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(196,120,90,.55)', display: 'block', marginBottom: 2 }}>Dietă</span>
                            <span style={{ fontFamily: "'Lora', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(122,74,53,.7)' }}>{guest.dietary_preferences}</span>
                          </div>
                        )}
                        {guest.other_mentions && (
                          <div>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(196,120,90,.55)', display: 'block', marginBottom: 2 }}>Mesaj</span>
                            <span style={{ fontFamily: "'Lora', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(122,74,53,.7)' }}>{guest.other_mentions}</span>
                          </div>
                        )}
                        {!guest.dietary_preferences && !guest.other_mentions && (
                          <span style={{ color: 'rgba(122,74,53,.2)', fontSize: 14 }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                      <div style={{ marginBottom: 10, opacity: .3 }}>
                        <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36, margin: '0 auto' }}>
                          <rect x="8" y="8" width="32" height="36" rx="3" stroke="#C4785A" strokeWidth="1.5" />
                          <path d="M16 18h16M16 25h16M16 32h8" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontStyle: 'italic', fontWeight: 400, color: 'rgba(122,74,53,.35)', marginBottom: 5 }}>Niciun răspuns încă</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(196,120,90,.3)' }}>Distribuie invitația pentru a primi confirmări</p>
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
  padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
  fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.2em',
  textTransform: 'uppercase', color: 'rgba(196,120,90,.6)',
  textAlign: 'left', fontWeight: 600,
  borderBottom: '1px solid rgba(196,120,90,.12)',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,14px)',
  verticalAlign: 'top',
};

const StatCard = ({ title, value, icon }: any) => (
  <div style={{
    background: 'rgba(255,248,240,.9)',
    border: '1px solid rgba(196,120,90,.18)',
    borderRadius: 16,
    padding: 'clamp(12px,2vw,20px) clamp(10px,1.5vw,16px)',
    textAlign: 'center' as const,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(196,120,90,.08),inset 0 1px 0 rgba(255,255,255,.9)',
    transition: 'transform .2s ease, box-shadow .2s ease'
  }}>
    <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.25),transparent)' }} />
    {icon && (
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(196,120,90,.08)', border: '1px solid rgba(196,120,90,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', flexShrink: 0 }}>{icon}</div>
    )}
    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(196,120,90,.5)', marginBottom: 6 }}>{title}</p>
    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 400, color: '#7A4A35', margin: 0, lineHeight: 1 }}>{value || 0}</h4>
  </div>
);

const BohoDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 24 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.3))' }} />
    <svg viewBox="0 0 60 20" width="54" height="18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 C10 6, 15 6, 20 10" stroke="#C4785A" strokeWidth=".8" strokeOpacity=".6" fill="none" />
      <path d="M40 10 C45 6, 50 6, 55 10" stroke="#C4785A" strokeWidth=".8" strokeOpacity=".6" fill="none" />
      <circle cx="30" cy="10" r="3.5" fill="none" stroke="#C4785A" strokeWidth="1" strokeOpacity=".8" />
      <circle cx="30" cy="10" r="1.5" fill="#C4785A" fillOpacity=".6" />
      <circle cx="18" cy="10" r="1" fill="#C4785A" fillOpacity=".4" />
      <circle cx="42" cy="10" r="1" fill="#C4785A" fillOpacity=".4" />
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(196,120,90,.3),transparent)' }} />
  </div>
);
