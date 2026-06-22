"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { C, F, FS, SP, BR, IS, SH, GR, KEYFRAMES, FONTS_IMPORT } from '../astronautTokens';
import Swal from 'sweetalert2';
import { useAutoSave } from '../hooks/useAutoSave';

interface PersonalizeSectionProps {
  initialData: any;
  orderId:     any;
  onSave:      () => void;
}

interface FormData {
  customSlug:             string;
  brideName:              string;
  groomName:              string;
  nasiNames:              string;
  parentsNames:           string;
  weddingDate:            string;
  weddingTime:            string;
  locationName:           string;
  googleMapsUrl:          string;
  wazeUrl:                string;
  religiousDate:          string;
  religiousTime:          string;
  religiousLocation:      string;
  religiousMaps:          string;
  religiousWaze:          string;
  ourStory:               string;
  contactPhoneBride:      string;
  contactPhoneGroom:      string;
  isReligiousActive:      boolean;
  isAccommodationActive:  boolean;
  isTransportActive:      boolean;
}

// ─── STYLE HELPERS ───────────────────────────────────────
const labS: React.CSSProperties = {
  display:       'block',
  fontFamily:    F.ui,
  fontSize:      FS.label,
  fontWeight:    700,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color:         C.textMuted,
  marginBottom:  SP.xs + 2,
};

const hintS: React.CSSProperties = {
  fontFamily:   F.body,
  fontStyle:    'italic',
  fontSize:     FS.base,
  color:        C.textFaint,
  marginTop:    -SP.sm,
  marginBottom: SP.xs,
};

const checkboxLabel: React.CSSProperties = {
  display:    'flex',
  alignItems: 'center',
  gap:        SP.lg,
  cursor:     'pointer',
  userSelect: 'none',
};

const checkboxBox: React.CSSProperties = {
  width:          18,
  height:         18,
  borderRadius:   BR.xs,
  border:         `1px solid ${C.borderAccent}`,
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  flexShrink:     0,
  transition:     'all .18s',
};

const cardBase: React.CSSProperties = {
  background:   C.surface,
  borderRadius: BR.lg,
  border:       `1px solid ${C.border}`,
  boxShadow:    SH.card,
  overflow:     'hidden',
};

// ─── SHARED COMPONENTS ───────────────────────────────────
const StarDividerLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: SP.sm }}>
    <div style={{ flex: 1, height: 1, background: GR.dividerLeft }} />
    <svg viewBox="0 0 40 14" width="40" height="14" fill="none">
      <path d="M3 7 L14 7" stroke={C.textSub} strokeWidth=".8" strokeOpacity=".45" />
      <path d="M26 7 L37 7" stroke={C.textSub} strokeWidth=".8" strokeOpacity=".45" />
      <path d="M20 3 L21.5 6.5 L25 7 L21.5 7.5 L20 11 L18.5 7.5 L15 7 L18.5 6.5 Z" fill="none" stroke={C.gold} strokeWidth="1" strokeOpacity=".75" />
      <circle cx="20" cy="7" r="1.5" fill={C.gold} fillOpacity=".65" />
    </svg>
    <div style={{ flex: 1, height: 1, background: GR.dividerRight }} />
  </div>
);

interface SectionCardProps {
  title: string; icon?: string;
  children: React.ReactNode; style?: React.CSSProperties;
}

const SectionCard = ({ title, icon, children, style }: SectionCardProps) => (
  <div className="ps-card" style={{ ...cardBase, ...style }}>
    <div style={{
      padding:      `${SP.md}px ${SP.xl}px ${SP.sm + 2}px`,
      borderBottom: `1px solid ${C.border}`,
      display:      'flex',
      alignItems:   'center',
      gap:          SP.sm,
    }}>
      {icon && <span style={{ fontSize: IS.md, opacity: 0.85 }}>{icon}</span>}
      <p style={{
        fontFamily:    F.ui,
        fontSize:      FS.label,
        fontWeight:    700,
        letterSpacing: '.16em',
        textTransform: 'uppercase',
        color:         C.textMuted,
        margin:        0,
      }}>
        {title}
      </p>
    </div>
    <div style={{ padding: `${SP.lg}px ${SP.xl}px` }}>
      {children}
    </div>
  </div>
);

const FG = ({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) => (
  <div style={{ marginBottom: noMargin ? 0 : SP.md }}>{children}</div>
);

// ─── LocationLinks ────────────────────────────────────────
interface LocationLinksProps {
  locationValue:    string;
  mapsValue:        string;
  wazeValue:        string;
  mapsKey:          keyof FormData;
  wazeKey:          keyof FormData;
  setter:           (key: keyof FormData, value: any) => void;
  mapsPlaceholder?: string;
  wazePlaceholder?: string;
}

const LocationLinks = ({
  locationValue, mapsValue, wazeValue,
  mapsKey, wazeKey, setter,
  mapsPlaceholder = 'https://maps.app.goo.gl/...',
  wazePlaceholder  = 'https://waze.com/ul/...',
}: LocationLinksProps) => {
  const generateLinks = () => {
    const trimmed = locationValue.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);
    setter(mapsKey, `https://www.google.com/maps/search/?api=1&query=${encoded}`);
    setter(wazeKey,  `https://waze.com/ul?q=${encoded}&navigate=yes`);
  };

  const testBtnStyle: React.CSSProperties = {
    flexShrink:    0,
    padding:       `0 ${SP.sm + 2}px`,
    height:        38,
    background:    GR.btnGhost,
    border:        `1px solid ${C.borderAccent}`,
    borderRadius:  BR.sm,
    color:         C.textMuted,
    fontFamily:    F.ui,
    fontSize:      FS.label,
    fontWeight:    700,
    letterSpacing: '.12em',
    textTransform: 'uppercase' as const,
    cursor:        'pointer',
    whiteSpace:    'nowrap' as const,
    transition:    'all .18s',
    display:       'flex',
    alignItems:    'center',
    gap:           SP.xs,
  };

  const generateBtnStyle: React.CSSProperties = {
    width:          '100%',
    padding:        `${SP.sm + 1}px ${SP.lg - 2}px`,
    background:     GR.btnGhost,
    border:         `1px dashed ${C.borderAccent}`,
    borderRadius:   BR.sm,
    color:          C.textMuted,
    fontFamily:     F.ui,
    fontSize:       FS.label,
    fontWeight:     700,
    letterSpacing:  '.14em',
    textTransform:  'uppercase' as const,
    cursor:         locationValue.trim() ? 'pointer' : 'not-allowed',
    opacity:        locationValue.trim() ? 1 : 0.45,
    transition:     'all .18s',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            SP.xs + 2,
    marginBottom:   SP.md,
  };

  return (
    <>
      <button
        type="button"
        onClick={generateLinks}
        disabled={!locationValue.trim()}
        style={generateBtnStyle}
        className="ps-gen-btn"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: IS.xs, height: IS.xs, flexShrink: 0 }}>
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" strokeLinecap="round"/>
        </svg>
        Generează automat din numele locației
      </button>

      <FG>
        <label style={labS}>Link Google Maps</label>
        <div style={{ display: 'flex', gap: SP.xs + 2 }}>
          <input
            className="ps-input"
            style={{ marginBottom: 0, flex: 1 }}
            placeholder={mapsPlaceholder}
            value={mapsValue}
            onChange={e => setter(mapsKey, e.target.value)}
            inputMode="url" autoCapitalize="none" autoCorrect="off"
          />
          {mapsValue.trim() && (
            <button type="button" style={testBtnStyle} className="ps-test-btn"
              onClick={() => window.open(mapsValue.trim(), '_blank', 'noopener,noreferrer')}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 11, height: 11 }}>
                <path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" strokeLinecap="round"/>
                <path d="M10 2h4v4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2L8 8" strokeLinecap="round"/>
              </svg>
              Test
            </button>
          )}
        </div>
        <p style={{ ...hintS, marginTop: SP.xs }}>
          Sau deschide Google Maps → Share → Copy Link și lipește manual.
        </p>
      </FG>

      <FG noMargin>
        <label style={labS}>Link Waze</label>
        <div style={{ display: 'flex', gap: SP.xs + 2 }}>
          <input
            className="ps-input"
            style={{ marginBottom: 0, flex: 1 }}
            placeholder={wazePlaceholder}
            value={wazeValue}
            onChange={e => setter(wazeKey, e.target.value)}
            inputMode="url" autoCapitalize="none" autoCorrect="off"
          />
          {wazeValue.trim() && (
            <button type="button" style={testBtnStyle} className="ps-test-btn"
              onClick={() => window.open(wazeValue.trim(), '_blank', 'noopener,noreferrer')}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 11, height: 11 }}>
                <path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" strokeLinecap="round"/>
                <path d="M10 2h4v4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2L8 8" strokeLinecap="round"/>
              </svg>
              Test
            </button>
          )}
        </div>
        <p style={{ ...hintS, marginTop: SP.xs }}>
          Sau deschide Waze → caută locația → Share → Copy Link și lipește manual.
        </p>
      </FG>
    </>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────
export const PersonalizeSection = ({ initialData, orderId, onSave }: PersonalizeSectionProps) => {
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const maxYear     = currentYear + 5;

  const buildForm = (data: any): FormData => ({
    customSlug:            data?.custom_slug            || '',
    brideName:             data?.bride_name             || '',
    groomName:             data?.groom_name             || '',
    nasiNames:             data?.nasi_names             || '',
    parentsNames:          data?.parents_names          || '',
    weddingDate:           data?.wedding_date           ? new Date(data.wedding_date).toISOString().split('T')[0]   : '',
    weddingTime:           data?.wedding_time           ? data.wedding_time.substring(0, 5)                         : '',
    locationName:          data?.location_name          || '',
    googleMapsUrl:         data?.google_maps_url        || '',
    wazeUrl:               data?.waze_url               || '',
    religiousDate:         data?.religious_date         ? new Date(data.religious_date).toISOString().split('T')[0] : '',
    religiousTime:         data?.religious_time         ? data.religious_time.substring(0, 5)                       : '',
    religiousLocation:     data?.religious_location     || '',
    religiousMaps:         data?.religious_maps_url     || '',
    religiousWaze:         data?.religious_waze         || '',
    ourStory:              data?.our_story              || '',
    contactPhoneBride:     data?.contact_phone_bride    || '',
    contactPhoneGroom:     data?.contact_phone_groom    || '',
    isReligiousActive:     data?.is_religious_active    ?? false,
    isAccommodationActive: data?.is_accommodation_active ?? false,
    isTransportActive:     data?.is_transport_active    ?? false,
  });

  const [formData, setFormData] = useState<FormData>(() => buildForm(initialData));

  useEffect(() => {
    if (initialData) {
      const next = buildForm(initialData);
      setFormData(prev => JSON.stringify(prev) === JSON.stringify(next) ? prev : next);
    }
  }, [initialData]);

  const set = (key: keyof FormData, value: any) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const autoSaveFn = useCallback(async (data: FormData) => {
    if (!orderId) throw new Error('orderId missing');
    const res = await fetch('/api/dashboard/personalize', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ orderId, ...data }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${res.status}`);
    }
  }, [orderId]);

  const { status: autoSaveStatus, setStatus: setAutoSaveStatus, cancelPending } =
    useAutoSave(formData, autoSaveFn, 1200);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cancelPending();
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ orderId, ...formData }),
      });
      if (res.ok) {
        setAutoSaveStatus('saved');
        Swal.fire({
          title:              `<span style="color:${C.gold};font-family:serif;">Salvat! 🚀</span>`,
          text:               'Personalizarea a fost salvată cu succes.',
          icon:               'success',
          confirmButtonColor: C.accent,
          background:         C.bgMid,
          color:              C.text,
        });
        onSave();
      } else {
        const err = await res.json();
        setAutoSaveStatus('unsaved');
        if (res.status === 409 || err.error?.toLowerCase().includes('exist') || err.error?.toLowerCase().includes('link')) {
          Swal.fire({
            title:              `<span style="color:${C.gold};font-family:serif;">Link rezervat 🌟</span>`,
            text:               'Acest link personalizat este deja rezervat.',
            icon:               'warning',
            confirmButtonColor: C.goldDim,
            background:         C.bgMid,
            color:              C.text,
          });
        } else {
          Swal.fire({
            title:              `<span style="color:${C.text};font-family:serif;">Eroare 🛸</span>`,
            text:               err.error || 'A apărut o problemă. Încearcă din nou.',
            icon:               'error',
            confirmButtonColor: C.accentDark,
            background:         C.bgMid,
            color:              C.text,
          });
        }
      }
    } catch {
      setAutoSaveStatus('unsaved');
      Swal.fire({
        title:              `<span style="color:${C.text};font-family:serif;">Eroare conexiune 🛸</span>`,
        text:               'Nu ne putem conecta la server momentan.',
        icon:               'error',
        confirmButtonColor: C.accentDark,
        background:         C.bgMid,
        color:              C.text,
      });
    }
    setLoading(false);
  };

  // ─── DATE PICKER ─────────────────────────────────────
  const CustomDatePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const parts              = value ? value.split('-') : ['', '', ''];
    const [year, month, day] = parts;
    const handleChange = (type: 'day' | 'month' | 'year', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const d = type === 'day'   ? val : (day   || '01');
      const m = type === 'month' ? val : (month || '01');
      const y = type === 'year'  ? val : (year  || String(currentYear));
      set(onChangeKey, `${y}-${m}-${d}`);
    };
    return (
      <div style={{ display: 'flex', gap: SP.xs + 2, width: '100%' }}>
        <select className="ps-input ps-select" value={day}   onChange={e => handleChange('day',   e.target.value)}>
          <option value="">Zi</option>
          {Array.from({ length: 31 }, (_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>)}
        </select>
        <select className="ps-input ps-select" value={month} onChange={e => handleChange('month', e.target.value)}>
          <option value="">Lună</option>
          {['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
            <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
          ))}
        </select>
        <select className="ps-input ps-select" value={year}  onChange={e => handleChange('year',  e.target.value)}>
          <option value="">An</option>
          {Array.from({ length: maxYear - currentYear + 1 }, (_, i) => (
            <option key={i} value={String(currentYear + i)}>{currentYear + i}</option>
          ))}
        </select>
      </div>
    );
  };

  // ─── TIME PICKER ─────────────────────────────────────
  const CustomTimePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const [hours, minutes] = value ? value.split(':') : ['', ''];
    const handleChange = (type: 'h' | 'm', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const h = type === 'h' ? val : (hours   || '12');
      const m = type === 'm' ? val : (minutes || '00');
      set(onChangeKey, `${h}:${m}`);
    };
    return (
      <div style={{ display: 'flex', gap: SP.xs + 2, width: '100%', alignItems: 'center' }}>
        <select className="ps-input ps-select" value={hours}   onChange={e => handleChange('h', e.target.value)}>
          <option value="">Ora</option>
          {Array.from({ length: 24 }, (_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
        <span style={{ color: C.gold, fontSize: FS.lg, fontWeight: 300, flexShrink: 0, opacity: 0.6 }}>:</span>
        <select className="ps-input ps-select" value={minutes} onChange={e => handleChange('m', e.target.value)}>
          <option value="">Min</option>
          {Array.from({ length: 60 }, (_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
      </div>
    );
  };

  // ─── RENDER ──────────────────────────────────────────
  return (
    <>
      <style>{`
        ${FONTS_IMPORT}
        ${KEYFRAMES}
        *, *::before, *::after { box-sizing: border-box; }

        .ps-input {
          font-size: ${FS.input}px !important;
          -webkit-text-size-adjust: 100%;
          -webkit-appearance: none;
          appearance: none;
        }

        .ps-wrap {
          width: 100%;
          max-width: 960px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .ps-input {
          width: 100%;
          background: rgba(255,255,255,.06);
          border: 1px solid ${C.border};
          color: ${C.text};
          padding: ${SP.sm + 2}px ${SP.md}px;
          border-radius: ${BR.sm}px;
          margin-bottom: ${SP.lg}px;
          font-family: ${F.body};
          transition: border-color .2s, box-shadow .2s;
          min-width: 0;
        }
        .ps-input:focus {
          border-color: rgba(244,216,126,.55) !important;
          box-shadow: ${SH.glow} !important;
          outline: none !important;
        }
        .ps-input::placeholder { color: ${C.textFaint}; }
        .ps-input option       { background: ${C.bgMid}; color: ${C.text}; }

        .ps-select {
          flex: 1;
          padding: ${SP.sm + 2}px ${SP.xl + 4}px ${SP.sm + 2}px ${SP.sm + 2}px !important;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239CB6E8' stroke-opacity='.5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-color: rgba(255,255,255,.06);
        }

        .ps-card { transition: box-shadow .25s ease; }
        .ps-card:hover { box-shadow: ${SH.cardHover} !important; }

        .ps-preview-btn { transition: all .2s ease; }
        .ps-preview-btn:hover {
          background: ${GR.btnGhost} !important;
          border-color: ${C.accent} !important;
          color: ${C.gold} !important;
        }

        .ps-save-btn { transition: all .22s; }
        .ps-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: ${SH.btnHover} !important; }
        .ps-save-btn:disabled { opacity: .55; cursor: not-allowed; }

        .ps-toggle { transition: all .2s; }
        .ps-toggle:hover { border-color: ${C.accent} !important; background: rgba(124,107,196,.1) !important; }

        .ps-gen-btn:hover:not(:disabled) {
          background: rgba(124,107,196,.16) !important;
          border-color: ${C.accent} !important;
          color: ${C.gold} !important;
        }
        .ps-test-btn:hover {
          background: rgba(124,107,196,.16) !important;
          border-color: ${C.accent} !important;
          color: ${C.text} !important;
        }

        .ps-two-col        { display: grid; grid-template-columns: 1fr 1fr; gap: ${SP.lg}px; }
        .ps-religious-grid { display: grid; grid-template-columns: 1fr 1fr; gap: ${SP.lg - 2}px; }
        .ps-rsvp-grid      { display: grid; grid-template-columns: 1fr 1fr; gap: ${SP.lg}px; }

        @media (max-width: 700px) {
          .ps-two-col        { grid-template-columns: 1fr !important; }
          .ps-religious-grid { grid-template-columns: 1fr !important; }
          .ps-rsvp-grid      { grid-template-columns: 1fr !important; }
          .ps-slug-prefix    { display: none !important; }
        }
        @media (max-width: 400px) {
          .ps-span-full { grid-column: span 1 !important; }
        }

        @keyframes shimmer-ps {
          0%   { background-position: -350px 0 }
          100% { background-position:  350px 0 }
        }
      `}</style>

      <form
        onSubmit={handleSave}
        className="ps-wrap"
        style={{ paddingBottom: '10vh', fontFamily: F.ui }}
      >
        {/* HEADER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SP.xl, marginBottom: SP.xxxl, width: '100%' }}>
          <div>
            <p style={{ fontFamily: F.ui, fontSize: FS.xs, letterSpacing: '.32em', textTransform: 'uppercase' as const, color: C.textFaint, marginBottom: SP.xs + 2 }}>
              Dashboard
            </p>
            <h2 style={{ fontFamily: F.heading, fontSize: FS.titleMd, fontWeight: 400, fontStyle: 'italic', color: C.text, margin: 0, letterSpacing: '.02em', lineHeight: 1.2 }}>
              Personalizare Avansată
            </h2>
          </div>
          <a
            href={`/invitatie/astronaut/${formData.customSlug}`}
            target="_blank" rel="noreferrer"
            className="ps-preview-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: SP.sm, padding: `${SP.md}px ${SP.lg + 2}px`,
              border: `1px solid ${C.borderAccent}`,
              borderRadius: BR.sm, color: C.textSub, textDecoration: 'none',
              fontFamily: F.ui, fontSize: FS.xs, fontWeight: 700,
              letterSpacing: '.18em', textTransform: 'uppercase' as const,
              background: GR.btnGhost, whiteSpace: 'nowrap' as const, width: '100%',
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: IS.md, height: IS.md, flexShrink: 0 }}>
              <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
            </svg>
            <span>Previzualizare</span>
          </a>
        </div>

        <StarDividerLine />

        {/* URL */}
        <SectionCard title="🔗 URL Personalizat" style={{ marginTop: SP.xxl }}>
          <label style={labS}>Link personalizat</label>
          <div style={{
            display: 'flex', alignItems: 'stretch',
            borderRadius: BR.sm, overflow: 'hidden',
            border: `1px solid ${C.border}`, background: C.surface,
          }}>
            <span className="ps-slug-prefix" style={{
              padding: `11px ${SP.md}px`, color: C.textFaint,
              background: 'rgba(255,255,255,.03)',
              fontSize: FS.base, fontFamily: F.ui, letterSpacing: '.06em',
              borderRight: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const,
              display: 'flex', alignItems: 'center',
            }}>
              www.vibeinvite.ro/
            </span>
            <input
              className="ps-input"
              style={{ border: 'none', borderRadius: 0, background: 'transparent', flex: 1, marginBottom: 0, minWidth: 0 }}
              value={formData.customSlug}
              onChange={e => set('customSlug', e.target.value.toLowerCase().replace(/\s/g, '-'))}
              placeholder="botez-zian-2025"
              autoCapitalize="none" autoCorrect="off"
            />
          </div>
          <p style={hintS}>Folosiți doar litere mici, cifre și cratimă.</p>
        </SectionCard>

        {/* FAMILIE + RESTAURANT */}
        <div className="ps-two-col" style={{ marginTop: SP.lg }}>
          <SectionCard title="Copil &amp; Familie" icon="🚀">
            <FG><label style={labS}>Prenumele Copilului</label><input className="ps-input" placeholder="ex: Zian" value={formData.brideName} onChange={e => set('brideName', e.target.value)} /></FG>
            <FG><label style={labS}>Prenume (opțional)</label><input className="ps-input" placeholder="ex: Andrei" value={formData.groomName} onChange={e => set('groomName', e.target.value)} /></FG>
            <FG><label style={labS}>Nași</label><input className="ps-input" placeholder="ex: Popescu Ion și Elena" value={formData.nasiNames} onChange={e => set('nasiNames', e.target.value)} /></FG>
            <FG noMargin><label style={labS}>Părinți</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="ex: Ionescu Adrian cu Maria" value={formData.parentsNames} onChange={e => set('parentsNames', e.target.value)} /></FG>
          </SectionCard>

          <SectionCard title="Recepție" icon="🎉">
            <FG><label style={labS}>Data Recepției</label><CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" /></FG>
            <FG><label style={labS}>Ora Începerii (24h)</label><CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" /></FG>
            <FG>
              <label style={labS}>Locație Restaurant</label>
              <input className="ps-input" placeholder="ex: Restaurant Orion, Bacău" value={formData.locationName} onChange={e => set('locationName', e.target.value)} />
            </FG>
            <LocationLinks
              locationValue={formData.locationName}
              mapsValue={formData.googleMapsUrl}
              wazeValue={formData.wazeUrl}
              mapsKey="googleMapsUrl"
              wazeKey="wazeUrl"
              setter={set}
            />
          </SectionCard>
        </div>

        {/* SLUJBĂ RELIGIOASĂ */}
        <div style={{ ...cardBase, marginTop: SP.lg, padding: 0 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: `${SP.lg}px ${SP.xl}px`,
            borderBottom: formData.isReligiousActive ? `1px solid ${C.border}` : 'none',
            flexWrap: 'wrap' as const, gap: SP.sm,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm }}>
              <span style={{ fontSize: SP.lg }}>⛪</span>
              <div>
                <p style={{ fontFamily: F.ui, fontSize: FS.xs, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: C.textMuted, margin: 0 }}>Slujba Religioasă</p>
                <p style={{ fontSize: FS.base, color: C.textFaint, marginTop: 3, fontStyle: 'italic', fontFamily: F.body, marginBottom: 0 }}>Secțiune opțională</p>
              </div>
            </div>
            <label
              className="ps-toggle"
              style={{
                display: 'flex', alignItems: 'center', gap: SP.sm,
                cursor: 'pointer', padding: `7px ${SP.lg - 2}px`,
                borderRadius: BR.pill,
                border: `1px solid ${formData.isReligiousActive ? C.borderAccent : C.border}`,
                background: formData.isReligiousActive ? 'rgba(124,107,196,.1)' : 'rgba(124,107,196,.03)',
                userSelect: 'none' as const, flexShrink: 0,
              }}
            >
              <input type="checkbox" checked={formData.isReligiousActive} onChange={e => set('isReligiousActive', e.target.checked)} style={{ display: 'none' }} />
              <div style={{
                width: 32, height: 18, borderRadius: 9,
                background: formData.isReligiousActive ? GR.btnPrimary : `rgba(124,107,196,.15)`,
                position: 'relative', transition: 'background .2s', flexShrink: 0,
                border: `1px solid ${C.borderAccent}`,
              }}>
                <div style={{
                  position: 'absolute', top: 2,
                  left: formData.isReligiousActive ? 14 : 2,
                  width: 12, height: 12, borderRadius: '50%',
                  background: formData.isReligiousActive ? C.white : C.textMuted,
                  transition: 'left .2s, background .2s',
                }} />
              </div>
              <span style={{
                fontFamily: F.ui, fontSize: FS.tiny, letterSpacing: '.14em',
                textTransform: 'uppercase' as const,
                color: formData.isReligiousActive ? C.textSub : C.textFaint,
                whiteSpace: 'nowrap' as const,
              }}>
                {formData.isReligiousActive ? 'Activă' : 'Inactivă'}
              </span>
            </label>
          </div>

          {formData.isReligiousActive && (
            <div style={{ padding: `${SP.lg}px ${SP.xl}px` }}>
              <div className="ps-religious-grid">
                <FG><label style={labS}>Data Botezului</label><CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" /></FG>
                <FG><label style={labS}>Ora (24h)</label><CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" /></FG>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <FG>
                    <label style={labS}>Locație Biserică</label>
                    <input className="ps-input" placeholder="ex: Biserica Sf. Andrei, Bacău" value={formData.religiousLocation} onChange={e => set('religiousLocation', e.target.value)} />
                  </FG>
                </div>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <LocationLinks
                    locationValue={formData.religiousLocation}
                    mapsValue={formData.religiousMaps}
                    wazeValue={formData.religiousWaze}
                    mapsKey="religiousMaps"
                    wazeKey="religiousWaze"
                    setter={set}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CONTACT + RSVP */}
        <div className="ps-rsvp-grid" style={{ marginTop: SP.lg }}>
          <SectionCard title="Contact" icon="📞">
            <FG><label style={labS}>Telefon Mamă</label><input className="ps-input" placeholder="07XX XXX XXX" value={formData.contactPhoneBride} onChange={e => set('contactPhoneBride', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
            <FG noMargin><label style={labS}>Telefon Tată</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="07XX XXX XXX" value={formData.contactPhoneGroom} onChange={e => set('contactPhoneGroom', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
          </SectionCard>

          <SectionCard title="Opțiuni RSVP" icon="📋">
            <p style={{ fontSize: FS.md, color: C.textMuted, marginBottom: SP.lg, lineHeight: 1.7, fontFamily: F.body, fontStyle: 'italic' }}>
              Bifează dacă dorești ca invitații să specifice aceste detalii la confirmare:
            </p>
            <label style={checkboxLabel}>
              <div style={{
                ...checkboxBox,
                background:   formData.isAccommodationActive ? 'rgba(124,107,196,.2)' : 'transparent',
                borderColor:  formData.isAccommodationActive ? C.accent : C.borderAccent,
              }}>
                {formData.isAccommodationActive && <span style={{ color: C.gold, fontSize: FS.xs, lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isAccommodationActive} onChange={e => set('isAccommodationActive', e.target.checked)} style={{ display: 'none' }} />
              <span style={{ color: C.textSub, fontSize: FS.md, fontFamily: F.body }}>Întreabă dacă au nevoie de Cazare</span>
            </label>
            <label style={{ ...checkboxLabel, marginTop: SP.sm }}>
              <div style={{
                ...checkboxBox,
                background:  formData.isTransportActive ? 'rgba(124,107,196,.2)' : 'transparent',
                borderColor: formData.isTransportActive ? C.accent : C.borderAccent,
              }}>
                {formData.isTransportActive && <span style={{ color: C.gold, fontSize: FS.xs, lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isTransportActive} onChange={e => set('isTransportActive', e.target.checked)} style={{ display: 'none' }} />
              <span style={{ color: C.textSub, fontSize: FS.md, fontFamily: F.body }}>Întreabă dacă au nevoie de Transport</span>
            </label>
          </SectionCard>
        </div>

        {/* MESAJ */}
        <SectionCard title="Mesaj pentru Invitați" icon="📖" style={{ marginTop: SP.lg }}>
          <label style={labS}>Mesaj scurt</label>
          <textarea
            className="ps-input"
            placeholder="Un mesaj din partea părinților pentru invitați..."
            style={{ height: 110, resize: 'vertical' as const, lineHeight: 1.7, marginBottom: 0 }}
            value={formData.ourStory}
            onChange={e => set('ourStory', e.target.value)}
          />
          <p style={hintS}>Maxim 500 de caractere recomandat.</p>
        </SectionCard>

        {/* SAVE */}
        <div style={{ marginTop: SP.xxxl, position: 'relative' }}>
          {autoSaveStatus !== 'idle' && !loading && (
            <div style={{ textAlign: 'center', marginBottom: SP.sm + 2 }}>
              <span style={{
                fontFamily:    F.ui,
                fontSize:      FS.tiny,
                letterSpacing: '.14em',
                color: autoSaveStatus === 'saving'  ? C.textFaint
                     : autoSaveStatus === 'saved'   ? C.success
                     : C.gold,
              }}>
                {autoSaveStatus === 'saving'  && '◌  Salvare automată...'}
                {autoSaveStatus === 'saved'   && '✓  Salvat automat'}
                {autoSaveStatus === 'unsaved' && '●  Modificări nesalvate'}
              </span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="ps-save-btn"
            style={{
              width:         '100%',
              padding:       `${SP.lg}px 0`,
              background:    loading ? 'rgba(124,107,196,.2)' : GR.btnPrimary,
              color:         loading ? C.textFaint : C.white,
              fontFamily:    F.ui,
              fontSize:      'clamp(10px,2.5vw,12px)',
              fontWeight:    700,
              letterSpacing: '.22em',
              textTransform: 'uppercase' as const,
              border:        'none',
              borderRadius:  BR.pill,
              cursor:        loading ? 'not-allowed' : 'pointer',
              boxShadow:     SH.btnPrimary,
              position:      'relative',
              overflow:      'hidden',
            }}
          >
            {!loading && (
              <div style={{
                position: 'absolute', inset: 0,
                background:     'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)',
                backgroundSize: '350px 100%',
                animation:      'shimmer-ps 3s linear infinite',
              }} />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {loading ? '🚀  Se salvează...' : '🚀  Salvează Modificările'}
            </span>
          </button>
        </div>
      </form>
    </>
  );
};
