"use client";
import React, { useState, useEffect, useRef } from 'react';
import { C, F, FS, SP, BR, SH, GR, LY, KEYFRAMES, FONTS_IMPORT } from '../flutureTokens';

const thStyle: React.CSSProperties = {
  padding: `clamp(10px,1.5vw,14px)`,
  fontFamily: F.ui,
  fontSize: 'clamp(9px,1.8vw,11px)',
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: C.textMuted,
  textAlign: 'left',
  fontWeight: 700,
  borderBottom: `1px solid ${C.borderLight}`,
  whiteSpace: 'nowrap',
  position: 'sticky',
  top: 0,
  background: 'rgba(20,21,43,.97)',
  zIndex: 2,
};

const tdStyle: React.CSSProperties = {
  padding: `clamp(10px,1.5vw,14px)`,
  verticalAlign: 'top',
};

const sCard: React.CSSProperties = {
  background: C.surface,
  border: `1px solid ${C.borderLight}`,
  borderRadius: BR.card,
  backdropFilter: 'blur(12px)',
  overflow: 'hidden',
};

const SUMMARY_CSS = `
  ${FONTS_IMPORT}
  ${KEYFRAMES}
  *, *::before, *::after { box-sizing: border-box; }
  @keyframes ast-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .ast-row:hover td { background: rgba(255,255,255,.025) !important; }
  .ast-export-btn:hover {
    background: rgba(124,107,196,.18) !important;
    border-color: rgba(124,107,196,.45) !important;
    color: ${C.text} !important;
  }
  .ast-stats-grid {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: clamp(8px,1.5vw,14px);
    margin-bottom: 28px;
  }
  .ast-table-wrap {
    overflow-x: auto;
    overflow-y: auto;
    max-height: clamp(300px,55vh,620px);
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: none;
    touch-action: pan-y;
    border-radius: 0 0 ${BR.card}px ${BR.card}px;
  }
  @media (max-width:900px) { .ast-stats-grid { grid-template-columns: repeat(3,1fr) !important; } }
  @media (max-width:600px) {
    .ast-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
    .ast-export-btn span { display:none; }
    .th-details, .td-details { display:none !important; }
  }
  @media (max-width:400px) { .ast-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
`;

interface Guest {
  id?:                  number;
  guest_name?:          string;
  full_name?:           string;
  name?:                string;
  partner_name?:        string;
  is_coming:            boolean;
  adults_count:         number;
  kids_count:           number;
  dietary_preferences?: string;
  other_mentions?:      string;
}

export function SummarySection() {
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
        console.error('Eroare API Summary:', err);
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
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      const deltaY   = e.touches[0].clientY - startY;
      const atTop    = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) e.preventDefault();
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove',  onTouchMove,  { passive: false });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove',  onTouchMove);
    };
  }, []);

  const exportToCSV = () => {
    if (!data?.guests) return;
    const headers = ['Nume Invitat', 'Partener', 'Status', 'Adulti', 'Copii'];
    const rows    = data.guests.map((g: Guest) => [
      g.guest_name ?? g.full_name ?? g.name ?? '',
      g.partner_name || '-',
      g.is_coming ? 'DA' : 'NU',
      g.adults_count,
      g.kids_count,
    ]);
    const csv  = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `invitati_fluture_${data?.weddingDetails?.custom_slug || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 14, fontFamily: F.ui, fontSize: FS.xs, letterSpacing: '.28em', textTransform: 'uppercase', color: C.textMuted }}>
      <div style={{ width: 18, height: 18, border: `1.5px solid rgba(156,182,232,.25)`, borderTopColor: C.accent, borderRadius: '50%', animation: 'ast-spin 1s linear infinite' }} />
      Se încarcă...
      <style>{`@keyframes ast-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );

  const guests: Guest[] = data?.guests ?? [];
  const stats           = data?.stats  ?? {};
  const views           = data?.views  ?? 0;

  return (
    <>
      <style>{SUMMARY_CSS}</style>
      <div style={{ animation: 'ast-fade-in .55s ease both', fontFamily: F.mono }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: SP.md, marginBottom: SP.xxl }}>
          <div>
            <p style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.36em', textTransform: 'uppercase', color: C.textFaint, marginBottom: SP.sm }}>
              Panou Principal
            </p>
            <h2 style={{ fontFamily: F.display, fontSize: FS.titleMd, fontWeight: 400, fontStyle: 'italic', color: C.text, margin: 0, lineHeight: 1.1 }}>
              Centrul de Comandă
            </h2>
          </div>
          {guests.length > 0 && (
            <button className="ast-export-btn" onClick={exportToCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: BR.pill, background: 'rgba(124,107,196,.08)', border: `1px solid ${C.borderAccent}`, color: C.textMuted, fontFamily: F.ui, fontSize: FS.tiny, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <path d="M10 13V4M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Exportă Lista</span>
            </button>
          )}
        </div>

        {/* STATS GRID */}
        <div className="ast-stats-grid">
          {[
            { icon: '👁️', label: 'Vizualizări',   value: views,                                     color: C.textMuted   },
            { icon: '✅',  label: 'Confirmați',     value: stats.da     ?? 0,                         color: C.success     },
            { icon: '❌',  label: 'Refuzuri',       value: stats.nu     ?? 0,                         color: C.error       },
            { icon: '👥',  label: 'Adulți',         value: stats.adulti ?? 0,                         color: C.gold        },
            { icon: '👶',  label: 'Copii',          value: stats.copii  ?? 0,                         color: C.accent      },
          ].map(s => (
            <div key={s.label} style={{ ...sCard, textAlign: 'center', padding: 'clamp(14px,2.5vw,22px) 10px' }}>
              <div style={{ fontSize: 'clamp(22px,3.5vw,28px)', marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: F.display, fontSize: FS.stat, fontWeight: 300, color: s.color, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.15em', textTransform: 'uppercase', color: C.textMuted, marginTop: 6, fontWeight: 700 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: SP.xxl }}>
          <div style={{ flex: 1, height: 1, background: GR.dividerLeft }} />
          <svg viewBox="0 0 60 20" width="54" height="18" fill="none" style={{ flexShrink: 0 }}>
            <path d="M5 10 L20 10" stroke={C.textMuted} strokeWidth=".8" strokeOpacity=".5" />
            <path d="M40 10 L55 10" stroke={C.textMuted} strokeWidth=".8" strokeOpacity=".5" />
            <path d="M30 4 Q34 7 34 10 Q34 13 30 16 Q26 13 26 10 Q26 7 30 4Z" fill="none" stroke={C.gold} strokeWidth="1" strokeOpacity=".8" />
            <circle cx="30" cy="10" r="2" fill={C.gold} fillOpacity=".7" />
          </svg>
          <div style={{ flex: 1, height: 1, background: GR.dividerRight }} />
        </div>

        {/* GUEST TABLE */}
        <div style={{ ...sCard, padding: 0 }}>
          <div style={{ padding: 'clamp(16px,3vw,24px)', borderBottom: `1px solid ${C.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: SP.md }}>
            <div>
              <p style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.32em', textTransform: 'uppercase', color: C.textFaint, marginBottom: 5 }}>
                Registrul Invitaților
              </p>
              <h3 style={{ fontFamily: F.display, fontSize: 'clamp(16px,3vw,24px)', fontStyle: 'italic', fontWeight: 400, color: C.text, margin: 0 }}>
                Detalii Răspunsuri
                {guests.length > 0 && (
                  <span style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.18em', color: C.textFaint, marginLeft: 12, fontStyle: 'normal', fontWeight: 700 }}>
                    {guests.length} {guests.length === 1 ? 'răspuns' : 'răspunsuri'}
                  </span>
                )}
              </h3>
            </div>
          </div>

          <div className="ast-table-wrap" ref={tableWrapRef}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 360 }}>
              <thead>
                <tr>
                  <th style={thStyle}>Nume</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Persoane</th>
                  <th style={thStyle} className="th-details">Partener / Copii</th>
                </tr>
              </thead>
              <tbody>
                {guests.length > 0 ? (
                  guests.map((guest, i) => {
                    const guestName = guest.guest_name ?? guest.full_name ?? guest.name ?? '—';
                    const totalPersons = (guest.adults_count ?? 0) + (guest.kids_count ?? 0);
                    return (
                      <tr key={guest.id ?? i} className="ast-row" style={{ borderBottom: `1px solid rgba(156,182,232,.07)`, transition: 'background .2s' }}>
                        <td style={tdStyle}>
                          <span style={{ fontFamily: F.mono, fontSize: 'clamp(13px,2vw,15px)', fontWeight: 600, color: C.text }}>{guestName}</span>
                        </td>
                        <td style={tdStyle}>
                          {guest.is_coming
                            ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: BR.pill, background: 'rgba(76,175,80,.14)', border: '1px solid rgba(76,175,80,.28)', fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.12em', fontWeight: 700, color: C.success, whiteSpace: 'nowrap' }}>✓ VINE</span>
                            : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: BR.pill, background: 'rgba(232,64,64,.12)', border: '1px solid rgba(232,64,64,.24)', fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.12em', fontWeight: 700, color: C.error, whiteSpace: 'nowrap' }}>✗ NU</span>
                          }
                        </td>
                        <td style={tdStyle}>
                          <span style={{ fontFamily: F.ui, fontSize: FS.xs, color: C.textSub, letterSpacing: '.06em', fontWeight: 700 }}>
                            {totalPersons}
                          </span>
                        </td>
                        <td style={tdStyle} className="td-details">
                          {guest.partner_name && (
                            <div style={{ marginBottom: guest.kids_count > 0 ? 4 : 0 }}>
                              <span style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.14em', textTransform: 'uppercase', color: C.textFaint, display: 'block', marginBottom: 2 }}>Partener</span>
                              <span style={{ fontFamily: F.mono, fontSize: FS.sm, color: C.textSub }}>{guest.partner_name}</span>
                            </div>
                          )}
                          {guest.kids_count > 0 && (
                            <div>
                              <span style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.14em', textTransform: 'uppercase', color: C.textFaint, display: 'block', marginBottom: 2 }}>Copii</span>
                              <span style={{ fontFamily: F.mono, fontSize: FS.sm, color: C.textSub }}>{guest.kids_count}</span>
                            </div>
                          )}
                          {!guest.partner_name && !guest.kids_count && (
                            <span style={{ color: 'rgba(156,182,232,.25)', fontSize: 14 }}>—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} style={{ padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                      <div style={{ marginBottom: 10, opacity: .4, fontSize: 40 }}>🪐</div>
                      <p style={{ fontFamily: F.display, fontSize: 17, fontStyle: 'italic', fontWeight: 400, color: C.textMuted, marginBottom: 5 }}>
                        Niciun răspuns încă
                      </p>
                      <p style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.22em', textTransform: 'uppercase', color: C.textFaint }}>
                        Distribuie invitația pentru a primi confirmări
                      </p>
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

export default SummarySection;
