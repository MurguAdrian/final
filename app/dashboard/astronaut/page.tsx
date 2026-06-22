"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAutoSave } from './hooks/useAutoSave';

// ── DESIGN TOKENS (din tema Astronaut) ─────────────────────
const BG = 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(80,70,160,.35) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(40,50,120,.4) 0%, transparent 55%), linear-gradient(160deg, #14152B 0%, #1E2046 45%, #2A1F4D 100%)';

const T = {
  accent:  '#7C6BC4',
  dark:    '#5848A0',
  gold:    '#F4D87E',
  text:    '#F4F6FB',
  sub:     '#B8C4E8',
  muted:   '#9CB6E8',
  surface: 'rgba(255,255,255,.05)',
  border:  'rgba(156,182,232,.18)',
};

// ── CSS GLOBAL ──────────────────────────────────────────────
const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=Cormorant:ital,wght@0,300&family=Quicksand:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{min-height:100dvh;-webkit-font-smoothing:antialiased;}
  input,select,textarea{font-size:16px!important;font-family:'Nunito',sans-serif;}
  @keyframes ast-spin{to{transform:rotate(360deg)}}
  @keyframes ast-fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  ::selection{background:rgba(124,107,196,.35);color:#F4F6FB;}
  .ast-input{transition:border-color .2s,box-shadow .2s;}
  .ast-input:focus{border-color:rgba(244,216,126,.55)!important;box-shadow:0 0 0 3px rgba(124,107,196,.18);outline:none;}
  .ast-ghost:hover{border-color:rgba(156,182,232,.4)!important;color:#F4F6FB!important;}
  .ast-tr:hover td{background:rgba(255,255,255,.025);}
  .ast-grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;}
  .ast-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;}
  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(1) opacity(.4);cursor:pointer;}
  @media(max-width:480px){
    .ast-stats{grid-template-columns:repeat(2,1fr)!important;}
  }
`;

// ── STYLE OBJECTS ───────────────────────────────────────────
const sCard: React.CSSProperties = {
  background: T.surface,
  border: `1px solid ${T.border}`,
  borderRadius: 20,
  backdropFilter: 'blur(12px)',
  padding: 'clamp(18px,3vw,28px)',
};

const sLabel: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Quicksand',sans-serif",
  fontSize: 10, letterSpacing: '.18em',
  textTransform: 'uppercase', color: T.muted, fontWeight: 700, marginBottom: 8,
};

const sInput: React.CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: 12,
  border: `1.5px solid ${T.border}`, background: 'rgba(255,255,255,.06)',
  color: T.text,
};

const sBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  padding: '11px 22px', borderRadius: 100,
  background: `linear-gradient(135deg,${T.accent},${T.dark})`,
  color: '#fff', fontFamily: "'Quicksand',sans-serif",
  fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
  border: 'none', cursor: 'pointer', boxShadow: '0 6px 22px rgba(88,72,160,.4)',
};

const sSecTitle: React.CSSProperties = {
  fontFamily: "'Playfair Display',serif",
  fontSize: 'clamp(16px,2.2vw,19px)', fontStyle: 'italic',
  fontWeight: 400, color: T.text, marginBottom: 18,
};

// ── TYPES ───────────────────────────────────────────────────
interface Guest {
  id?: number;
  full_name?: string;
  name?: string;
  is_coming: boolean;
  adults_count: number;
  kids_count: number;
}

interface FormState {
  childName:          string;
  customSlug:         string;
  parentsNames:       string;
  nasiNames:          string;
  churchLocation:     string;
  churchDate:         string;
  churchTime:         string;
  churchMaps:         string;
  churchWaze:         string;
  restaurantLocation: string;
  restaurantDate:     string;
  restaurantTime:     string;
  restaurantMaps:     string;
  restaurantWaze:     string;
  contactPhone:       string;
}

const EMPTY: FormState = {
  childName: '', customSlug: '', parentsNames: '', nasiNames: '',
  churchLocation: '', churchDate: '', churchTime: '', churchMaps: '', churchWaze: '',
  restaurantLocation: '', restaurantDate: '', restaurantTime: '', restaurantMaps: '', restaurantWaze: '',
  contactPhone: '',
};

// ── HELPERS ─────────────────────────────────────────────────
function csvExport(guests: Guest[]) {
  const rows = [
    ['Nume', 'Status', 'Adulți', 'Copii', 'Total'],
    ...guests.map(g => [
      `"${g.full_name ?? g.name ?? ''}"`,
      g.is_coming ? 'VIN' : 'NU VIN',
      g.adults_count ?? 0,
      g.kids_count ?? 0,
      (g.adults_count ?? 0) + (g.kids_count ?? 0),
    ]),
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'botez-astronaut.csv'; a.click();
  URL.revokeObjectURL(url);
}

// ── COMPONENT ───────────────────────────────────────────────
export default function DashboardAstronaut() {
  const router = useRouter();
  const [tab, setTab]         = useState<'summary' | 'personalize'>('summary');
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [views, setViews]     = useState(0);
  const [stats, setStats]     = useState({ da: 0, nu: 0, adulti: 0, copii: 0 });
  const [guests, setGuests]   = useState<Guest[]>([]);
  const [form, setForm]       = useState<FormState>(EMPTY);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied]   = useState(false);

  // ── FETCH INITIAL DATA ──
  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then(r => {
        if (r.status === 401) { router.push('/login'); return null; }
        return r.json();
      })
      .then(data => {
        if (!data) return;
        const d = data.weddingDetails ?? {};
        setOrderId(d.order_id ?? null);
        setViews(data.views ?? 0);
        setStats({
          da:     data.stats?.da     ?? 0,
          nu:     data.stats?.nu     ?? 0,
          adulti: data.stats?.adulti ?? 0,
          copii:  data.stats?.copii  ?? 0,
        });
        setGuests(data.guests ?? []);
        setForm({
          childName:          d.bride_name         ?? '',
          customSlug:         d.custom_slug         ?? '',
          parentsNames:       d.parents_names       ?? '',
          nasiNames:          d.nasi_names          ?? '',
          churchLocation:     d.religious_location  ?? '',
          churchDate:         d.religious_date      ?? '',
          churchTime:         d.religious_time      ?? '',
          churchMaps:         d.religious_maps_url  ?? '',
          churchWaze:         d.religious_waze      ?? '',
          restaurantLocation: d.location_name       ?? '',
          restaurantDate:     d.wedding_date        ?? '',
          restaurantTime:     d.wedding_time        ?? '',
          restaurantMaps:     d.google_maps_url     ?? '',
          restaurantWaze:     d.waze_url            ?? '',
          contactPhone:       d.contact_phone_bride ?? '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  // ── AUTOSAVE ──
  const saveFn = useCallback(async (f: FormState) => {
    if (!orderId) return;
    const res = await fetch('/api/dashboard/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        brideName:         f.childName,
        customSlug:        f.customSlug,
        parentsNames:      f.parentsNames,
        nasiNames:         f.nasiNames,
        religiousLocation: f.churchLocation,
        religiousDate:     f.churchDate,
        religiousTime:     f.churchTime,
        religiousMaps:     f.churchMaps,
        religiousWaze:     f.churchWaze,
        locationName:      f.restaurantLocation,
        weddingDate:       f.restaurantDate,
        weddingTime:       f.restaurantTime,
        googleMapsUrl:     f.restaurantMaps,
        wazeUrl:           f.restaurantWaze,
        contactPhoneBride: f.contactPhone,
      }),
    });
    if (!res.ok) throw new Error('save failed');
  }, [orderId]);

  const { status: saveStatus } = useAutoSave(form, saveFn);

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const inviteLink =
    form.customSlug && typeof window !== 'undefined'
      ? `${window.location.origin}/invitatie/astronaut/${form.customSlug}`
      : '';

  const copy = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm('Ești sigur? Toate datele vor fi șterse permanent.')) return;
    setDeleting(true);
    try { await fetch('/api/dashboard/delete-account', { method: 'DELETE' }); }
    finally { router.push('/'); }
  };

  const saveColor =
    saveStatus === 'saved'   ? '#4CAF50' :
    saveStatus === 'unsaved' ? T.gold : T.muted;
  const saveLabel =
    saveStatus === 'saving'  ? '⏳ Se salvează...' :
    saveStatus === 'saved'   ? '✓ Salvat' :
    saveStatus === 'unsaved' ? '● Nesalvat' : '';

  // ── LOADING ──
  if (loading) return (
    <>
      <style>{GCSS}</style>
      <div style={{ minHeight: '100dvh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: T.muted }}>
          <div style={{ fontSize: 48, display: 'inline-block', animation: 'ast-spin 2s linear infinite' }}>🚀</div>
          <p style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', marginTop: 16 }}>
            Se încarcă misiunea...
          </p>
        </div>
      </div>
    </>
  );

  // ── RENDER ──
  return (
    <>
      <style>{GCSS}</style>
      <div style={{ minHeight: '100dvh', background: BG, color: T.text, fontFamily: "'Nunito',sans-serif" }}>

        {/* ── HEADER ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50, height: 58,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: '0 clamp(14px,4vw,28px)',
          background: 'rgba(20,21,43,.93)', backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>🚀</span>
            <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Vibe<span style={{ color: T.accent }}>Invite</span>
              <span style={{ color: T.muted, fontWeight: 400, fontSize: 10, marginLeft: 8 }}>Astronaut</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {saveLabel && (
              <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 10, letterSpacing: '.1em', color: saveColor, whiteSpace: 'nowrap' }}>
                {saveLabel}
              </span>
            )}
            <button
              onClick={() => router.push('/login')}
              className="ast-ghost"
              style={{ background: 'none', border: `1px solid ${T.border}`, color: T.muted, borderRadius: 100, padding: '6px 14px', fontFamily: "'Quicksand',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s' }}
            >
              Ieșire
            </button>
          </div>
        </header>

        {/* ── INVITE LINK BANNER ── */}
        {inviteLink && (
          <div style={{ background: 'rgba(124,107,196,.1)', borderBottom: `1px solid rgba(124,107,196,.18)`, padding: '10px clamp(14px,4vw,28px)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: T.muted, flexShrink: 0 }}>🔗 Link invitație</span>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 12, color: T.gold, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {inviteLink}
            </span>
            <button onClick={copy} style={{ ...sBtn, padding: '6px 14px', flexShrink: 0 }}>
              {copied ? '✓ Copiat!' : 'Copiază'}
            </button>
            <a href={inviteLink} target="_blank" rel="noopener noreferrer" style={{ ...sBtn, padding: '6px 14px', textDecoration: 'none', background: 'rgba(124,107,196,.18)', boxShadow: 'none', border: `1px solid rgba(124,107,196,.28)`, flexShrink: 0 }}>
              Deschide ↗
            </a>
          </div>
        )}

        {/* ── TAB NAV ── */}
        <div style={{ background: 'rgba(14,15,35,.5)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${T.border}`, padding: '0 clamp(14px,4vw,28px)' }}>
          <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex' }}>
            {([
              { key: 'summary',     label: '📊 Sumar' },
              { key: 'personalize', label: '⚙️ Personalizare' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 'clamp(13px,2vw,16px) clamp(12px,2.5vw,22px)',
                  fontFamily: "'Quicksand',sans-serif", fontSize: 11, fontWeight: 700,
                  letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  color: tab === key ? T.gold : T.muted,
                  borderBottom: `2px solid ${tab === key ? T.gold : 'transparent'}`,
                  transition: 'color .18s, border-color .18s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(20px,4vw,36px) clamp(14px,4vw,28px) 80px' }}>

          {/* ════ SUMMARY TAB ════ */}
          {tab === 'summary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'ast-fade .35s ease both' }}>

              {/* Stats */}
              <div className="ast-stats">
                {([
                  { icon: '👁️', label: 'Vizualizări',  value: views,        color: T.muted    },
                  { icon: '✅', label: 'Confirmați',    value: stats.da,     color: '#4CAF50'  },
                  { icon: '❌', label: 'Refuzuri',      value: stats.nu,     color: '#E84040'  },
                  { icon: '👥', label: 'Adulți',        value: stats.adulti, color: T.gold     },
                  { icon: '👶', label: 'Copii',         value: stats.copii,  color: T.accent   },
                ] as const).map(s => (
                  <div key={s.label} style={{ ...sCard, textAlign: 'center', padding: 'clamp(14px,2.5vw,22px) 10px' }}>
                    <div style={{ fontSize: 'clamp(22px,3.5vw,28px)', marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Cormorant',serif", fontSize: 'clamp(30px,5vw,44px)', fontWeight: 300, color: s.color, lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: T.muted, marginTop: 6, fontWeight: 700 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Guest list */}
              <div style={sCard}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                  <h2 style={sSecTitle}>Lista Invitaților · {guests.length}</h2>
                  <button onClick={() => csvExport(guests)} style={sBtn}>📥 Export CSV</button>
                </div>

                {guests.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🪐</div>
                    <p style={{ fontFamily: "'Cormorant',serif", fontSize: 17, fontStyle: 'italic', color: T.sub }}>
                      Niciun invitat confirmat încă.
                    </p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 12, color: T.muted, marginTop: 6 }}>
                      Trimite linkul invitației pentru a primi confirmări.
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(11px,1.8vw,13px)', minWidth: 300 }}>
                      <thead>
                        <tr>
                          {(['Nume', 'Status', 'Persoane'] as const).map(h => (
                            <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontFamily: "'Quicksand',sans-serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: T.muted, fontWeight: 700, borderBottom: `1px solid ${T.border}` }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {guests.map((g, i) => (
                          <tr key={g.id ?? i} className="ast-tr">
                            <td style={{ padding: '12px 12px', color: T.text, fontWeight: 600, borderBottom: `1px solid rgba(156,182,232,.07)` }}>
                              {g.full_name ?? g.name ?? '—'}
                            </td>
                            <td style={{ padding: '12px 12px', borderBottom: `1px solid rgba(156,182,232,.07)` }}>
                              <span style={{
                                display: 'inline-block', padding: '3px 10px', borderRadius: 100,
                                fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                                background: g.is_coming ? 'rgba(76,175,80,.14)' : 'rgba(232,64,64,.12)',
                                color: g.is_coming ? '#4CAF50' : '#E84040',
                                border: `1px solid ${g.is_coming ? 'rgba(76,175,80,.28)' : 'rgba(232,64,64,.24)'}`,
                              }}>
                                {g.is_coming ? 'VIN' : 'NU VIN'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 12px', color: T.sub, borderBottom: `1px solid rgba(156,182,232,.07)` }}>
                              {(g.adults_count ?? 0) + (g.kids_count ?? 0)}
                              {(g.kids_count ?? 0) > 0 && (
                                <span style={{ fontSize: 10, color: T.muted, marginLeft: 6 }}>
                                  ({g.kids_count} copii)
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════ PERSONALIZE TAB ════ */}
          {tab === 'personalize' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'ast-fade .35s ease both' }}>

              {/* Copil + Slug */}
              <section style={sCard}>
                <h3 style={sSecTitle}>👶 Copil & Link Invitație</h3>
                <div className="ast-grid-2">
                  <div>
                    <label style={sLabel}>Numele Copilului</label>
                    <input className="ast-input" value={form.childName} onChange={set('childName')} placeholder="ex. Zian" style={sInput} />
                  </div>
                  <div>
                    <label style={sLabel}>Slug (Link Personalizat)</label>
                    <input className="ast-input" value={form.customSlug} onChange={set('customSlug')} placeholder="ex. botez-zian" style={sInput} />
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 11, color: T.muted, marginTop: 6, fontStyle: 'italic' }}>
                      /invitatie/astronaut/<strong style={{ color: T.gold }}>{form.customSlug || 'slug-tau'}</strong>
                    </p>
                  </div>
                </div>
              </section>

              {/* Părinți & Nași */}
              <section style={sCard}>
                <h3 style={sSecTitle}>👨‍👩‍👧 Părinți & Nași</h3>
                <div className="ast-grid-2">
                  <div>
                    <label style={sLabel}>Numele Părinților</label>
                    <input className="ast-input" value={form.parentsNames} onChange={set('parentsNames')} placeholder="ex. Ioana & Radu" style={sInput} />
                  </div>
                  <div>
                    <label style={sLabel}>Numele Nașilor</label>
                    <input className="ast-input" value={form.nasiNames} onChange={set('nasiNames')} placeholder="ex. Diana & Vlad" style={sInput} />
                  </div>
                </div>
              </section>

              {/* Biserică */}
              <section style={sCard}>
                <h3 style={sSecTitle}>⛪ Slujba Religioasă</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={sLabel}>Locație Biserică</label>
                    <input className="ast-input" value={form.churchLocation} onChange={set('churchLocation')} placeholder="ex. Biserica Sfântul Andrei, Bacău" style={sInput} />
                  </div>
                  <div className="ast-grid-2">
                    <div>
                      <label style={sLabel}>Data</label>
                      <input className="ast-input" type="date" value={form.churchDate} onChange={set('churchDate')} style={sInput} />
                    </div>
                    <div>
                      <label style={sLabel}>Ora</label>
                      <input className="ast-input" type="time" value={form.churchTime} onChange={set('churchTime')} style={sInput} />
                    </div>
                  </div>
                  <div className="ast-grid-2">
                    <div>
                      <label style={sLabel}>Link Google Maps</label>
                      <input className="ast-input" value={form.churchMaps} onChange={set('churchMaps')} placeholder="https://maps.google.com/..." style={sInput} />
                    </div>
                    <div>
                      <label style={sLabel}>Link Waze</label>
                      <input className="ast-input" value={form.churchWaze} onChange={set('churchWaze')} placeholder="https://waze.com/..." style={sInput} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Restaurant */}
              <section style={sCard}>
                <h3 style={sSecTitle}>🎉 Recepție / Restaurant</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={sLabel}>Locație Restaurant</label>
                    <input className="ast-input" value={form.restaurantLocation} onChange={set('restaurantLocation')} placeholder="ex. Restaurant Orion, Bacău" style={sInput} />
                  </div>
                  <div className="ast-grid-2">
                    <div>
                      <label style={sLabel}>Data</label>
                      <input className="ast-input" type="date" value={form.restaurantDate} onChange={set('restaurantDate')} style={sInput} />
                    </div>
                    <div>
                      <label style={sLabel}>Ora</label>
                      <input className="ast-input" type="time" value={form.restaurantTime} onChange={set('restaurantTime')} style={sInput} />
                    </div>
                  </div>
                  <div className="ast-grid-2">
                    <div>
                      <label style={sLabel}>Link Google Maps</label>
                      <input className="ast-input" value={form.restaurantMaps} onChange={set('restaurantMaps')} placeholder="https://maps.google.com/..." style={sInput} />
                    </div>
                    <div>
                      <label style={sLabel}>Link Waze</label>
                      <input className="ast-input" value={form.restaurantWaze} onChange={set('restaurantWaze')} placeholder="https://waze.com/..." style={sInput} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section style={sCard}>
                <h3 style={sSecTitle}>📞 Contact</h3>
                <div style={{ maxWidth: 300 }}>
                  <label style={sLabel}>Număr de Telefon</label>
                  <input className="ast-input" type="tel" value={form.contactPhone} onChange={set('contactPhone')} placeholder="ex. 0740 000 000" style={sInput} />
                </div>
              </section>

              {/* Zonă periculoasă */}
              <section style={{ ...sCard, borderColor: 'rgba(232,64,64,.22)' }}>
                <h3 style={{ ...sSecTitle, color: '#E84040' }}>⚠️ Zonă Periculoasă</h3>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: 13, color: T.muted, marginBottom: 18, lineHeight: 1.65 }}>
                  Ștergerea contului este ireversibilă. Toate datele (invitați, RSVP-uri, setări) vor fi eliminate permanent.
                </p>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{ ...sBtn, background: 'rgba(232,64,64,.13)', color: '#E84040', boxShadow: 'none', border: '1px solid rgba(232,64,64,.28)', opacity: deleting ? .6 : 1 }}
                >
                  {deleting ? 'Se șterge...' : '🗑️ Șterge Contul'}
                </button>
              </section>

            </div>
          )}
        </main>
      </div>
    </>
  );
}
