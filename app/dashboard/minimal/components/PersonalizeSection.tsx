"use client";
import React, { useState, useEffect } from 'react';

interface PersonalizeSectionProps {
  initialData: any;
  orderId: any;
  onSave: () => void;
}

interface FormData {
  customSlug: string;
  brideName: string;
  groomName: string;
  nasiNames: string;
  parentsNames: string;
  weddingDate: string;
  weddingTime: string;
  locationName: string;
  googleMapsUrl: string;
  wazeUrl: string;
  religiousDate: string;
  religiousTime: string;
  religiousLocation: string;
  religiousWaze: string;
  ourStory: string;
  contactPhoneBride: string;
  contactPhoneGroom: string;
  isReligiousActive: boolean;
  isAccommodationActive: boolean;
  isTransportActive: boolean;
}

const ACCENT = '#C8503A';
const DARK = '#111111';
const MID = '#555555';
const LIGHT = '#AAAAAA';
const RULE = '#E2E2E2';
const BG = '#F7F4F0';

export const PersonalizeSection = ({ initialData, orderId, onSave }: PersonalizeSectionProps) => {
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 5;

  const buildForm = (data: any): FormData => ({
    customSlug: data?.custom_slug || '',
    brideName: data?.bride_name || '',
    groomName: data?.groom_name || '',
    nasiNames: data?.nasi_names || '',
    parentsNames: data?.parents_names || '',
    weddingDate: data?.wedding_date ? new Date(data.wedding_date).toISOString().split('T')[0] : '',
    weddingTime: data?.wedding_time ? data.wedding_time.substring(0, 5) : '',
    locationName: data?.location_name || '',
    googleMapsUrl: data?.google_maps_url || '',
    wazeUrl: data?.waze_url || '',
    religiousDate: data?.religious_date ? new Date(data.religious_date).toISOString().split('T')[0] : '',
    religiousTime: data?.religious_time ? data.religious_time.substring(0, 5) : '',
    religiousLocation: data?.religious_location || '',
    religiousWaze: data?.religious_waze || '',
    ourStory: data?.our_story || '',
    contactPhoneBride: data?.contact_phone_bride || '',
    contactPhoneGroom: data?.contact_phone_groom || '',
    isReligiousActive: data?.is_religious_active ?? false,
    isAccommodationActive: data?.is_accommodation_active ?? false,
    isTransportActive: data?.is_transport_active ?? false,
  });

  const [formData, setFormData] = useState<FormData>(() => buildForm(initialData));
  useEffect(() => { if (initialData) setFormData(buildForm(initialData)); }, [initialData]);

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
      if (res.ok) { alert('Personalizare salvată cu succes! ✨'); onSave(); }
      else { const err = await res.json(); alert('Eroare: ' + (err.error || 'A apărut o problemă.')); }
    } catch { alert('Eroare de conexiune la server.'); }
    setLoading(false);
  };

  const CustomDatePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const parts = value ? value.split('-') : ['', '', ''];
    const year = parts[0]; const month = parts[1]; const day = parts[2];
    const handleChange = (type: 'day' | 'month' | 'year', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const d = type === 'day' ? val : (day || '01');
      const m = type === 'month' ? val : (month || '01');
      const y = type === 'year' ? val : (year || String(currentYear));
      set(onChangeKey, `${y}-${m}-${d}`);
    };
    return (
      <div style={{ display: 'flex', gap: 6, width: '100%' }}>
        {[
          { val: day, type: 'day' as const, opts: Array.from({ length: 31 }, (_, i) => ({ v: String(i + 1).padStart(2, '0'), l: String(i + 1) })), ph: 'Zi' },
          { val: month, type: 'month' as const, opts: ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'].map((l, i) => ({ v: String(i + 1).padStart(2, '0'), l })), ph: 'Lună' },
          { val: year, type: 'year' as const, opts: Array.from({ length: maxYear - currentYear + 1 }, (_, i) => ({ v: String(currentYear + i), l: String(currentYear + i) })), ph: 'An' },
        ].map(s => (
          <select key={s.type} className="ps-input ps-select" value={s.val} onChange={e => handleChange(s.type, e.target.value)}>
            <option value="">{s.ph}</option>
            {s.opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        ))}
      </div>
    );
  };

  const CustomTimePicker = ({ value, onChangeKey }: { value: string; onChangeKey: keyof FormData }) => {
    const [hours, minutes] = value ? value.split(':') : ['', ''];
    const handleChange = (type: 'h' | 'm', val: string) => {
      if (!val) { set(onChangeKey, ''); return; }
      const h = type === 'h' ? val : (hours || '12');
      const m = type === 'm' ? val : (minutes || '00');
      set(onChangeKey, `${h}:${m}`);
    };
    return (
      <div style={{ display: 'flex', gap: 6, width: '100%', alignItems: 'center' }}>
        <select className="ps-input ps-select" value={hours} onChange={e => handleChange('h', e.target.value)}>
          <option value="">Ora</option>
          {Array.from({ length: 24 }, (_, i) => <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>)}
        </select>
        <span style={{ color: LIGHT, fontSize: 14, flexShrink: 0 }}>:</span>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .ps-input { font-size: 16px !important; -webkit-text-size-adjust: 100%; -webkit-appearance: none; appearance: none; }
        .ps-wrap { overscroll-behavior: contain; -webkit-overflow-scrolling: auto; }

        .ps-input {
          width: 100%;
          background: #fff;
          border: 1px solid #E2E2E2;
          border-bottom: 1px solid #E2E2E2;
          color: #111;
          padding: 10px 12px;
          margin-bottom: 12px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color .2s;
          min-width: 0;
        }
        .ps-input:focus { border-color: #C8503A !important; outline: none !important; }
        .ps-input::placeholder { color: #CCCCCC; }
        .ps-input option { background: #fff; color: #111; }

        .ps-select {
          flex: 1;
          padding: 10px 24px 10px 10px !important;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23AAAAAA' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-color: #fff;
        }

        .ps-card { transition: box-shadow .2s; }
        .ps-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08) !important; }
        .ps-preview-btn:hover { border-color: #C8503A !important; color: #C8503A !important; background: rgba(200,80,58,.05) !important; }
        .ps-save-btn:hover:not(:disabled) { background: #9a3e2d !important; transform: translateY(-1px); }
        .ps-save-btn:disabled { opacity: .55; cursor: not-allowed; }
        .ps-toggle:hover { border-color: #C8503A !important; }

        .ps-wrap { width: 100%; max-width: 960px; box-sizing: border-box; overflow-x: hidden; }
        .ps-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ps-religious-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ps-rsvp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @media (max-width: 700px) {
          .ps-two-col { grid-template-columns: 1fr !important; }
          .ps-religious-grid { grid-template-columns: 1fr !important; }
          .ps-rsvp-grid { grid-template-columns: 1fr !important; }
          .ps-slug-prefix { display: none !important; }
        }
        @media (max-width: 400px) { .ps-span-full { grid-column: span 1 !important; } }
      `}</style>

      <form onSubmit={handleSave} className="ps-wrap" style={{ paddingBottom: 80, fontFamily: "'DM Sans', sans-serif" }}>

        {/* HEADER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24, width: '100%' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 28, height: 2, background: ACCENT }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT }}>Dashboard</p>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px,5vw,30px)', fontWeight: 400, fontStyle: 'italic', color: DARK, margin: 0, lineHeight: 1.2 }}>
              Personalizare Detalii
            </h2>
          </div>
          <a href={`/invitatie/minimal/${formData.customSlug}`} target="_blank" rel="noreferrer" className="ps-preview-btn" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '11px 18px', border: `1px solid ${RULE}`, color: MID, textDecoration: 'none',
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
            background: '#fff', whiteSpace: 'nowrap', width: '100%', transition: 'all .2s'
          }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 13, height: 13, flexShrink: 0 }}>
              <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
            </svg>
            <span>Previzualizare</span>
          </a>
        </div>

        <MinDivider />

        {/* URL */}
        <SCard title="URL Personalizat" icon="🔗" style={{ marginTop: 20 }}>
          <label style={labS}>Slug personalizat</label>
          <div style={{ display: 'flex', alignItems: 'stretch', border: `1px solid ${RULE}`, background: '#fff', overflow: 'hidden' }}>
            <span className="ps-slug-prefix" style={{ padding: '11px 12px', color: LIGHT, background: BG, fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: '.04em', borderRight: `1px solid ${RULE}`, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
              www.vibeinvite.ro/
            </span>
            <input className="ps-input" style={{ border: 'none', background: 'transparent', flex: 1, marginBottom: 0, minWidth: 0 }}
              value={formData.customSlug}
              onChange={e => set('customSlug', e.target.value.toLowerCase().replace(/\s/g, '-'))}
              placeholder="nunta-andrei-maria" autoCapitalize="none" autoCorrect="off" />
          </div>
          <p style={hintS}>Folosiți doar litere mici, cifre și cratimă.</p>
        </SCard>

        {/* MIRI + RESTAURANT */}
        <div className="ps-two-col" style={{ marginTop: 16 }}>
          <SCard title="Miri & Familie" icon="💍">
            <FG><label style={labS}>Nume Mireasă</label><input className="ps-input" placeholder="ex: Maria" value={formData.brideName} onChange={e => set('brideName', e.target.value)} /></FG>
            <FG><label style={labS}>Nume Mire</label><input className="ps-input" placeholder="ex: Andrei" value={formData.groomName} onChange={e => set('groomName', e.target.value)} /></FG>
            <FG><label style={labS}>Nași</label><input className="ps-input" placeholder="ex: Popescu Ion și Elena" value={formData.nasiNames} onChange={e => set('nasiNames', e.target.value)} /></FG>
            <FG noMargin><label style={labS}>Părinți</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="ex: Din partea mirelui..." value={formData.parentsNames} onChange={e => set('parentsNames', e.target.value)} /></FG>
          </SCard>

          <SCard title="Petrecere Restaurant" icon="🥂">
            <FG><label style={labS}>Data Petrecerii</label><CustomDatePicker value={formData.weddingDate} onChangeKey="weddingDate" /></FG>
            <FG><label style={labS}>Ora Începerii (24h)</label><CustomTimePicker value={formData.weddingTime} onChangeKey="weddingTime" /></FG>
            <FG><label style={labS}>Locație (Nume Restaurant)</label><input className="ps-input" placeholder="ex: Restaurant Aristocrat" value={formData.locationName} onChange={e => set('locationName', e.target.value)} /></FG>
            <FG><label style={labS}>Link Google Maps</label><input className="ps-input" placeholder="https://maps.app.goo.gl/..." value={formData.googleMapsUrl} onChange={e => set('googleMapsUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
            <FG noMargin><label style={labS}>Link Waze</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="https://waze.com/ul/..." value={formData.wazeUrl} onChange={e => set('wazeUrl', e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" /></FG>
          </SCard>
        </div>

        {/* CUNUNIA */}
        <div style={{ background: '#fff', border: `1px solid ${RULE}`, marginTop: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: formData.isReligiousActive ? `1px solid ${RULE}` : 'none', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 15 }}>⛪</span>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: DARK, margin: 0 }}>Cununia Religioasă</p>
                <p style={{ fontSize: 11, color: LIGHT, marginTop: 2, fontStyle: 'italic', fontFamily: "'Playfair Display', serif", marginBottom: 0 }}>Secțiune opțională</p>
              </div>
            </div>
            <label className="ps-toggle" style={{
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '6px 14px',
              border: `1px solid ${formData.isReligiousActive ? ACCENT : RULE}`,
              background: formData.isReligiousActive ? 'rgba(200,80,58,.06)' : BG,
              transition: 'all .2s', userSelect: 'none', flexShrink: 0
            }}>
              <input type="checkbox" checked={formData.isReligiousActive} onChange={e => set('isReligiousActive', e.target.checked)} style={{ display: 'none' }} />
              <div style={{ width: 32, height: 18, position: 'relative', flexShrink: 0, background: formData.isReligiousActive ? ACCENT : RULE, transition: 'background .2s' }}>
                <div style={{ position: 'absolute', top: 2, left: formData.isReligiousActive ? 14 : 2, width: 14, height: 14, background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: formData.isReligiousActive ? ACCENT : LIGHT, whiteSpace: 'nowrap' }}>
                {formData.isReligiousActive ? 'Activă' : 'Inactivă'}
              </span>
            </label>
          </div>
          {formData.isReligiousActive && (
            <div style={{ padding: '14px 18px' }}>
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

        {/* CONTACT + RSVP */}
        <div className="ps-rsvp-grid" style={{ marginTop: 16 }}>
          <SCard title="Contact pentru Oaspeți" icon="📞">
            <FG><label style={labS}>Telefon Mireasă</label><input className="ps-input" placeholder="07XX XXX XXX" value={formData.contactPhoneBride} onChange={e => set('contactPhoneBride', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
            <FG noMargin><label style={labS}>Telefon Mire</label><input className="ps-input" style={{ marginBottom: 0 }} placeholder="07XX XXX XXX" value={formData.contactPhoneGroom} onChange={e => set('contactPhoneGroom', e.target.value)} inputMode="tel" autoComplete="tel" /></FG>
          </SCard>
          <SCard title="Opțiuni RSVP" icon="📋">
            <p style={{ fontSize: 13, color: LIGHT, marginBottom: 14, lineHeight: 1.7, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Bifează dacă dorești ca invitații să specifice aceste detalii la confirmare:
            </p>
            <CheckboxRow label="Întreabă dacă au nevoie de Cazare" checked={formData.isAccommodationActive} onChange={v => set('isAccommodationActive', v)} />
            <CheckboxRow label="Întreabă dacă au nevoie de Transport" checked={formData.isTransportActive} onChange={v => set('isTransportActive', v)} style={{ marginTop: 10 }} />
          </SCard>
        </div>

        {/* POVESTEA */}
        <SCard title="Povestea Noastră" icon="📖" style={{ marginTop: 16 }}>
          <label style={labS}>Mesaj pentru invitați</label>
          <textarea className="ps-input" placeholder="Cum v-ați cunoscut, un mesaj scurt pentru invitați..."
            style={{ height: 110, resize: 'vertical', lineHeight: 1.7, marginBottom: 0 }}
            value={formData.ourStory} onChange={e => set('ourStory', e.target.value)} />
          <p style={hintS}>Maxim 500 de caractere recomandat.</p>
        </SCard>

        {/* SAVE */}
        <div style={{ marginTop: 24 }}>
          <button type="submit" disabled={loading} className="ps-save-btn" style={{
            width: '100%', padding: '15px 0', background: loading ? LIGHT : DARK,
            color: '#fff', fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase',
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all .2s',
          }}>
            {loading ? 'Se salvează...' : '← Salvează Modificările →'}
          </button>
        </div>
      </form>
    </>
  );
};

const MinDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 8 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#E2E2E2)' }} />
    <div style={{ width: 5, height: 5, background: '#C8503A', transform: 'rotate(45deg)', margin: '0 8px', opacity: .4 }} />
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#E2E2E2,transparent)' }} />
  </div>
);

const SCard = ({ title, icon, children, style }: { title: string; icon?: string; children: React.ReactNode; style?: React.CSSProperties }) => (
  <div className="ps-card" style={{ background: '#fff', border: '1px solid #E2E2E2', borderTop: '2px solid #C8503A', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)', ...style }}>
    <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid #E2E2E2', display: 'flex', alignItems: 'center', gap: 8 }}>
      {icon && <span style={{ fontSize: 13 }}>{icon}</span>}
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '.24em', textTransform: 'uppercase', color: '#AAAAAA', margin: 0 }}>{title}</p>
    </div>
    <div style={{ padding: '14px 16px' }}>{children}</div>
  </div>
);

const FG = ({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) => (
  <div style={{ marginBottom: noMargin ? 0 : 4 }}>{children}</div>
);

const CheckboxRow = ({ label, checked, onChange, style }: { label: string; checked: boolean; onChange: (v: boolean) => void; style?: React.CSSProperties }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', ...style }} onClick={() => onChange(!checked)}>
    <div style={{ width: 18, height: 18, border: `1px solid ${checked ? '#C8503A' : '#E2E2E2'}`, background: checked ? '#C8503A' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .18s' }}>
      {checked && <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, height: 10 }}><path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </div>
    <span style={{ color: '#555', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
  </label>
);

const labS: React.CSSProperties = {
  display: 'block', fontFamily: "'DM Sans', sans-serif",
  fontSize: 8, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase',
  color: '#AAAAAA', marginBottom: 6,
};
const hintS: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 11,
  color: '#CCCCCC', marginTop: -8, marginBottom: 4,
};
