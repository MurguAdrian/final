// FIȘIER: andre/app/dashboard/minimal/components/PersonalizeSection.tsx
// MODIFICĂRI FAȚĂ DE ROMANTIC:
//   - Import tokens: romanticTokens → minimalTokens
//   - Culori: toate rgba(196,80,106,...) / rgba(166,50,72,...) / rgba(61,21,32,...) → echivalente charcoal/gri
//   - Fonturi: Cinzel → DM Sans; Cormorant Garamond → Spectral
//   - Preview link: /romantic/ → /minimal/

"use client";
import React, { useState, useEffect } from 'react';
import { C, F, FS, SP, BR, IS, SH, GR, KEYFRAMES } from '../minimalTokens';

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
  religiousWaze:          string;
  ourStory:               string;
  contactPhoneBride:      string;
  contactPhoneGroom:      string;
  isReligiousActive:      boolean;
  isAccommodationActive:  boolean;
  isTransportActive:      boolean;
}

const labS: React.CSSProperties = {
  display: 'block',
  fontFamily: F.heading,
  fontSize: 'clamp(9px, 1.8vw, 11px)',
  fontWeight: 600,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: 'rgba(26,26,26,.45)',
  marginBottom: 6,
};

const hintS: React.CSSProperties = {
  fontFamily: F.body,
  fontStyle: 'italic', fontSize: FS.base,
  color: 'rgba(26,26,26,.25)',
  marginTop: -8, marginBottom: SP.xs,
};

const checkboxLabel: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: BR.lg,
  cursor: 'pointer', userSelect: 'none',
};

const checkboxBox: React.CSSProperties = {
  width: 18, height: 18, borderRadius: 4,
  border: '1px solid rgba(26,26,26,.18)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0, transition: 'all .18s',
};

const cardBase: React.CSSProperties = {
  background: 'linear-gradient(160deg,rgba(255,255,255,.98) 0%,rgba(249,250,251,.99) 100%)',
  borderRadius: BR.lg,
  border: `1px solid ${C.borderLight}`,
  boxShadow: SH.card,
  overflow: 'hidden',
};

const RoseDividerLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: SP.sm }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(26,26,26,.12))` }} />
    <svg viewBox="0 0 40 14" width="40" height="14" fill="none">
      <path d="M3 7 L14 7" stroke="#1a1a1a" strokeWidth=".8" strokeOpacity=".2" />
      <path d="M26 7 L37 7" stroke="#1a1a1a" strokeWidth=".8" strokeOpacity=".2" />
      <rect x="17" y="4" width="6" height="6" stroke="#1a1a1a" strokeWidth=".9" strokeOpacity=".45" transform="rotate(45 20 7)" fill="none" />
      <circle cx="20" cy="7" r="1.5" fill="#1a1a1a" fillOpacity=".35" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(26,26,26,.12),transparent)` }} />
  </div>
);

interface SectionCardProps {
  title: string; icon?: string;
  children: React.ReactNode; style?: React.CSSProperties;
}

const SectionCard = ({ title, icon, children, style }: SectionCardProps) => (
  <div className="ps-card" style={{ ...cardBase, ...style }}>
    <div style={{ padding: `14px 18px 10px`, borderBottom: `1px solid rgba(26,26,26,.06)`, display: 'flex', alignItems: 'center', gap: SP.sm }}>
      {icon && <span style={{ fontSize: 14, opacity: 0.85 }}>{icon}</span>}
      <p style={{ fontFamily: F.heading, fontSize: 'clamp(9px, 1.8vw, 11px)', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(26,26,26,.55)', margin: 0 }}>
        {title}
      </p>
    </div>
    <div style={{ padding: `${SP.lg}px 18px` }}>
      {children}
    </div>
  </div>
);

const FG = ({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) => (
  <div style={{ marginBottom: noMargin ? 0 : SP.md }}>{children}</div>
);

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
    weddingDate:           data?.wedding_date           ? new Date(data.wedding_date).toISOString().split('T')[0]    : '',
    weddingTime:           data?.wedding_time           ? data.wedding_time.substring(0, 5)                          : '',
    locationName:          data?.location_name          || '',
    googleMapsUrl:         data?.google_maps_url        || '',
    wazeUrl:               data?.waze_url               || '',
    religiousDate:         data?.religious_date         ? new Date(data.religious_date).toISOString().split('T')[0]  : '',
    religiousTime:         data?.religious_time         ? data.religious_time.substring(0, 5)                        : '',
    religiousLocation:     data?.religious_location     || '',
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
    if (initialData) setFormData(buildForm(initialData));
  }, [initialData]);

  const set = (key: keyof FormData, value: any) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, ...formData }),
      });
      if (res.ok) {
        alert('Personalizare salvată cu succes! ✨');
        onSave();
      } else {
        const err = await res.json();
        alert('Eroare: ' + (err.error || 'A apărut o problemă.'));
      }
    } catch {
      alert('Eroare de conexiune la server.');
    }
    setLoading(false);
  };

  const CustomDatePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const parts          = value ? value.split('-') : ['', '', ''];
    const [year, month, day] = parts;
    const handleChange = (type: 'day' | 'month' | 'year', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const d = type === 'day'   ? val : (day   || '01');
      const m = type === 'month' ? val : (month || '01');
      const y = type === 'year'  ? val : (year  || String(currentYear));
      set(onChangeKey, `${y}-${m}-${d}`);
    };
    return (
      <div style={{ display: 'flex', gap: 6, width: '100%' }}>
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

  const CustomTimePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const [hours, minutes] = value ? value.split(':') : ['', ''];
    const handleChange = (type: 'h' | 'm', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const h = type === 'h' ? val : (hours   || '12');
      const m = type === 'm' ? val : (minutes || '00');
      set(onChangeKey, `${h}:${m}`);
    };
    return (
      <div style={{ display: 'flex', gap: 6, width: '100%', alignItems: 'center' }}>
        <select className="ps-input ps-select" value={hours}   onChange={e => handleChange('h', e.target.value)}>
          <option value="">Ora</option>
          {Array.from({ length: 24 }, (_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
        <span style={{ color: C.rose, fontSize: SP.lg, fontWeight: 300, flexShrink: 0, opacity: 0.6 }}>:</span>
        <select className="ps-input ps-select" value={minutes} onChange={e => handleChange('m', e.target.value)}>
          <option value="">Min</option>
          {Array.from({ length: 60 }, (_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Spectral:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
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
          background: rgba(249,250,251,.9);
          border: 1px solid rgba(26,26,26,.12);
          color: ${C.text};
          padding: 10px 12px;
          border-radius: ${BR.sm}px;
          margin-bottom: ${BR.lg}px;
          font-family: ${F.body};
          transition: border-color .2s, box-shadow .2s;
          min-width: 0;
        }
        .ps-input:focus {
          border-color: rgba(26,26,26,.35) !important;
          box-shadow: 0 0 0 3px rgba(26,26,26,.05) !important;
          outline: none !important;
        }
        .ps-input::placeholder { color: rgba(26,26,26,.2); }
        .ps-input option       { background: #ffffff; color: ${C.text}; }

        .ps-select {
          flex: 1;
          padding: 10px 24px 10px 10px !important;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%231a1a1a' stroke-opacity='.35' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-color: rgba(249,250,251,.9);
        }

        .ps-card { transition: box-shadow .25s ease; }
        .ps-card:hover { box-shadow: ${SH.cardHover} !important; }

        .ps-preview-btn { transition: all .2s ease; }
        .ps-preview-btn:hover { background: rgba(26,26,26,.07) !important; border-color: rgba(26,26,26,.35) !important; color: ${C.crimson} !important; }

        .ps-save-btn { transition: all .22s; }
        .ps-save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(0,0,0,.22) !important; }
        .ps-save-btn:disabled { opacity: .55; cursor: not-allowed; }

        .ps-toggle { transition: all .2s; }
        .ps-toggle:hover { border-color: rgba(26,26,26,.3) !important; background: rgba(26,26,26,.06) !important; }

        .ps-two-col        { display: grid; grid-template-columns: 1fr 1fr; gap: ${SP.lg}px; }
        .ps-religious-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
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

      <form onSubmit={handleSave} className="ps-wrap" style={{ paddingBottom: '10vh', fontFamily: F.ui }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: SP.xl, marginBottom: SP.xxxl, width: '100%' }}>
          <div>
            <p style={{ fontFamily: F.heading, fontSize: FS.xs, letterSpacing: '.32em', textTransform: 'uppercase' as const, color: 'rgba(26,26,26,.35)', marginBottom: 6 }}>
              Dashboard
            </p>
            <h2 style={{ fontFamily: F.body, fontSize: FS.titleMd, fontWeight: 300, fontStyle: 'italic', color: C.text, margin: 0, letterSpacing: '.02em', lineHeight: 1.2 }}>
              Personalizare Detalii
            </h2>
          </div>
          <a
            href={`/invitatie/minimal/${formData.customSlug}`}
            target="_blank" rel="noreferrer"
            className="ps-preview-btn"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: SP.sm, padding: `12px 18px`, border: `1px solid rgba(26,26,26,.18)`, borderRadius: BR.sm, color: C.rose, textDecoration: 'none', fontFamily: F.heading, fontSize: FS.xs, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, background: 'rgba(26,26,26,.03)', whiteSpace: 'nowrap' as const, width: '100%' }}
         >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: IS.md, height: IS.md, flexShrink: 0 }}>
              <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
            </svg>
            <span>Previzualizare</span>
          </a>
        </div>

        <RoseDividerLine />

        <SectionCard title="🔗 URL Personalizat" style={{ marginTop: SP.xxl }}>
          <label style={labS}>Slug personalizat</label>
          <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: BR.sm, overflow: 'hidden', border: `1px solid rgba(26,26,26,.12)`, background: C.cream }}>
            <span className="ps-slug-prefix" style={{ padding: `11px 12px`, color: 'rgba(26,26,26,.3)', background: 'rgba(26,26,26,.03)', fontSize: FS.base, fontFamily: F.heading, letterSpacing: '.06em', borderRight: `1px solid rgba(26,26,26,.08)`, whiteSpace: 'nowrap' as const, display: 'flex', alignItems: 'center' }}>
              www.vibeinvite.ro/
            </span>
            <input
              className="ps-input"
              style={{ border: 'none', borderRadius: 0, background: 'transparent', flex: 1, marginBottom: 0, minWidth: 0 }}
              value={formData.customSlug}
              onChange={e => set('customSlug', e.target.value.toLowerCase().replace(/\s/g, '-'))}
              placeholder="nunta-andrei-maria"
              autoCapitalize="none" autoCorrect="off"
            />
          </div>
          <p style={hintS}>Folosiți doar litere mici, cifre și cratimă.</p>
        </SectionCard>

        <div className="ps-two-col" style={{ marginTop: SP.lg }}>
          <SectionCard title="Miri & Familie" icon="💍">
            <FG><label style={labS}>Nume Mireasă</label><input className="ps-input" placeholder="ex: Maria"                  value={formData.brideName}   onChange={e => set('brideName',   e.target.value)} /></FG>
            <FG><label style={labS}>Nume Mire</label>   <input className="ps-input" placeholder="ex: Andrei"                 value={formData.groomName}   onChange={e => set('groomName',   e.target.value)} /></FG>
            <FG><label style={labS}>Nași</label>        <input className="ps-input" placeholder="ex: Popescu Ion și Elena"   value={formData.nasiNames}   onChange={e => set('nasiNames',   e.target.value)} /></FG>
            <FG noMargin><label style={labS}>Părinți</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="ex: Din partea mirelui..." value={formData.parentsNames} onChange={e => set('parentsNames', e.target.value)} /></FG>
          </SectionCard>

          <SectionCard title="Petrecere Restaurant" icon="🥂">
            <FG><label style={labS}>Data Petrecerii</label>          <CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" /></FG>
            <FG><label style={labS}>Ora Începerii (24h)</label>      <CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" /></FG>
            <FG><label style={labS}>Locație (Nume Restaurant)</label> <input className="ps-input" placeholder="ex: Restaurant Aristocrat"  value={formData.locationName}  onChange={e => set('locationName',  e.target.value)} /></FG>
            <FG><label style={labS}>Link Google Maps</label>          <input className="ps-input" placeholder="https://maps.app.goo.gl/..."  value={formData.googleMapsUrl} onChange={e => set('googleMapsUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
            <FG noMargin><label style={labS}>Link Waze</label>        <input className="ps-input" style={{ marginBottom: 0 }} placeholder="https://waze.com/ul/..." value={formData.wazeUrl} onChange={e => set('wazeUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
          </SectionCard>
        </div>

        <div style={{ ...cardBase, marginTop: SP.lg, padding: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${SP.lg}px ${SP.xl}px`, borderBottom: formData.isReligiousActive ? `1px solid rgba(26,26,26,.07)` : 'none', flexWrap: 'wrap' as const, gap: SP.sm }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm }}>
              <span style={{ fontSize: SP.lg }}>⛪</span>
              <div>
                <p style={{ fontFamily: F.heading, fontSize: FS.xs, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: C.rose, margin: 0 }}>Cununia Religioasă</p>
                <p style={{ fontSize: FS.base, color: 'rgba(26,26,26,.3)', marginTop: 3, fontStyle: 'italic', fontFamily: F.body, marginBottom: 0 }}>Secțiune opțională</p>
              </div>
            </div>
            <label className="ps-toggle" style={{ display: 'flex', alignItems: 'center', gap: SP.sm, cursor: 'pointer', padding: `7px 14px`, borderRadius: BR.pill, border: `1px solid ${formData.isReligiousActive ? 'rgba(26,26,26,.25)' : 'rgba(26,26,26,.1)'}`, background: formData.isReligiousActive ? 'rgba(26,26,26,.06)' : 'rgba(26,26,26,.02)', userSelect: 'none' as const, flexShrink: 0 }}>
              <input type="checkbox" checked={formData.isReligiousActive} onChange={e => set('isReligiousActive', e.target.checked)} style={{ display: 'none' }} />
              <div style={{ width: 32, height: 18, borderRadius: 9, background: formData.isReligiousActive ? GR.roseBtn : 'rgba(26,26,26,.1)', position: 'relative', transition: 'background .2s', flexShrink: 0, border: `1px solid rgba(26,26,26,.15)` }}>
                <div style={{ position: 'absolute', top: 2, left: formData.isReligiousActive ? 14 : 2, width: 12, height: 12, borderRadius: '50%', background: formData.isReligiousActive ? C.white : 'rgba(26,26,26,.35)', transition: 'left .2s, background .2s' }} />
              </div>
              <span style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: formData.isReligiousActive ? C.rose : 'rgba(26,26,26,.3)', whiteSpace: 'nowrap' as const }}>
                {formData.isReligiousActive ? 'Activă' : 'Inactivă'}
              </span>
            </label>
          </div>

          {formData.isReligiousActive && (
            <div style={{ padding: `${SP.lg}px ${SP.xl}px` }}>
              <div className="ps-religious-grid">
                <FG><label style={labS}>Data Cununiei</label><CustomDatePicker value={formData.religiousDate} onChangeKey="religiousDate" /></FG>
                <FG><label style={labS}>Ora (24h)</label><CustomTimePicker value={formData.religiousTime} onChangeKey="religiousTime" /></FG>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <FG><label style={labS}>Biserica</label><input className="ps-input" placeholder="ex: Biserica Sf. Maria" value={formData.religiousLocation} onChange={e => set('religiousLocation', e.target.value)} /></FG>
                </div>
                <div style={{ gridColumn: 'span 2' }} className="ps-span-full">
                  <FG noMargin><label style={labS}>Waze Biserică</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="Link Waze" value={formData.religiousWaze} onChange={e => set('religiousWaze', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ps-rsvp-grid" style={{ marginTop: SP.lg }}>
          <SectionCard title="Contact pentru Oaspeți" icon="📞">
            <FG><label style={labS}>Telefon Mireasă</label><input className="ps-input" placeholder="07XX XXX XXX" value={formData.contactPhoneBride} onChange={e => set('contactPhoneBride', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
            <FG noMargin><label style={labS}>Telefon Mire</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="07XX XXX XXX" value={formData.contactPhoneGroom} onChange={e => set('contactPhoneGroom', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
          </SectionCard>

          <SectionCard title="Opțiuni RSVP" icon="📋">
            <p style={{ fontSize: FS.md, color: 'rgba(26,26,26,.35)', marginBottom: SP.lg, lineHeight: 1.7, fontFamily: F.body, fontStyle: 'italic' }}>
              Bifează dacă dorești ca invitații să specifice aceste detalii la confirmare:
            </p>
            <label style={checkboxLabel}>
              <div style={{ ...checkboxBox, background: formData.isAccommodationActive ? 'rgba(26,26,26,.12)' : 'transparent', borderColor: formData.isAccommodationActive ? C.rose : 'rgba(26,26,26,.18)' }}>
                {formData.isAccommodationActive && <span style={{ color: C.rose, fontSize: FS.xs, lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isAccommodationActive} onChange={e => set('isAccommodationActive', e.target.checked)} style={{ display: 'none' }} />
              <span style={{ color: 'rgba(15,23,42,.7)', fontSize: 14, fontFamily: F.body }}>Întreabă dacă au nevoie de Cazare</span>
            </label>
            <label style={{ ...checkboxLabel, marginTop: SP.sm }}>
              <div style={{ ...checkboxBox, background: formData.isTransportActive ? 'rgba(26,26,26,.12)' : 'transparent', borderColor: formData.isTransportActive ? C.rose : 'rgba(26,26,26,.18)' }}>
                {formData.isTransportActive && <span style={{ color: C.rose, fontSize: FS.xs, lineHeight: 1 }}>✓</span>}
              </div>
              <input type="checkbox" checked={formData.isTransportActive} onChange={e => set('isTransportActive', e.target.checked)} style={{ display: 'none' }} />
              <span style={{ color: 'rgba(15,23,42,.7)', fontSize: 14, fontFamily: F.body }}>Întreabă dacă au nevoie de Transport</span>
            </label>
          </SectionCard>
        </div>

        <SectionCard title="Povestea Noastră" icon="📖" style={{ marginTop: SP.lg }}>
          <label style={labS}>Mesaj pentru invitați</label>
          <textarea
            className="ps-input"
            placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..."
            style={{ height: 110, resize: 'vertical' as const, lineHeight: 1.7, marginBottom: 0 }}
            value={formData.ourStory}
            onChange={e => set('ourStory', e.target.value)}
          />
          <p style={hintS}>Maxim 500 de caractere recomandat.</p>
        </SectionCard>

        <div style={{ marginTop: SP.xxxl, position: 'relative' }}>
          <button
            type="submit"
            disabled={loading}
            className="ps-save-btn"
            style={{
              width: '100%', padding: '16px 0',
              background: loading ? 'rgba(26,26,26,.12)' : GR.roseBtnFull,
              color: loading ? 'rgba(26,26,26,.4)' : C.white,
              fontFamily: F.heading, fontSize: 'clamp(10px,2.5vw,12px)',
              fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase' as const,
              border: 'none', borderRadius: BR.sm,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: SH.btnRose,
              position: 'relative', overflow: 'hidden',
            }}
          >
            {!loading && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)', backgroundSize: '350px 100%', animation: 'shimmer-ps 3s linear infinite' }} />}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {loading ? '—  Se salvează...  —' : '—  Salvează Modificările  —'}
            </span>
          </button>
        </div>
      </form>
    </>
  );
};