
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { C, F, FS, SP, BR, SH, GR, LY, KEYFRAMES } from '../baloaneTokens';
import { useAutoSave } from '../hooks/useAutoSave';
import Swal from 'sweetalert2';

interface PersonalizeSectionProps {
  initialData: any;
  orderId:     any;
  onSave:      () => void;
}

interface FormState {
  customSlug:        string;
  brideName:         string;
  nasiNames:         string;
  parentsNames:      string;
  religiousLocation: string;
  religiousDate:     string;
  religiousTime:     string;
  religiousMaps:     string;
  religiousWaze:     string;
  locationName:      string;
  weddingDate:       string;
  weddingTime:       string;
  googleMapsUrl:     string;
  wazeUrl:           string;
  contactPhoneBride: string;
}

const buildForm = (data: any): FormState => ({
  customSlug:        data?.custom_slug          || '',
  brideName:         data?.bride_name           || '',
  nasiNames:         data?.nasi_names           || '',
  parentsNames:      data?.parents_names        || '',
  religiousLocation: data?.religious_location   || '',
  religiousDate:     data?.religious_date
    ? new Date(data.religious_date).toISOString().split('T')[0]
    : '',
  religiousTime:     data?.religious_time ? String(data.religious_time).substring(0, 5) : '',
  religiousMaps:     data?.religious_maps_url   || '',
  religiousWaze:     data?.religious_waze       || '',
  locationName:      data?.location_name        || '',
  weddingDate:       data?.wedding_date
    ? new Date(data.wedding_date).toISOString().split('T')[0]
    : '',
  weddingTime:       data?.wedding_time ? String(data.wedding_time).substring(0, 5) : '',
  googleMapsUrl:     data?.google_maps_url      || '',
  wazeUrl:           data?.waze_url             || '',
  contactPhoneBride: data?.contact_phone_bride  || '',
});

const sCard: React.CSSProperties = {
  background:     C.surface,
  border:         `1px solid ${C.border}`,
  borderRadius:   BR.card,
  backdropFilter: 'blur(12px)',
  padding:        `clamp(${SP.lg}px,3vw,${SP.xxl + SP.xs}px)`,
};

const sLabel: React.CSSProperties = {
  display:       'block',
  fontFamily:    F.ui,
  fontSize:      FS.tiny,
  letterSpacing: '.18em',
  textTransform: 'uppercase',
  color:         C.textMuted,
  fontWeight:    700,
  marginBottom:  SP.sm,
};

const PS_CSS = `
  ${KEYFRAMES}
  .ps-input-astr {
    width: 100%; padding: ${SP.md}px ${SP.lg - 2}px; border-radius: ${BR.md}px;
    border: 1.5px solid ${C.border}; background: rgba(255,255,255,.06);
    color: ${C.text}; font-family: ${F.mono}; font-size: ${FS.input}px;
    outline: none; box-sizing: border-box; display: block;
    transition: border-color .2s, box-shadow .2s;
    -webkit-appearance: none; appearance: none;
  }
  .ps-input-astr:focus {
    border-color: rgba(244,216,126,.55) !important;
    box-shadow: ${SH.glow};
  }
  .ps-input-astr::placeholder { color: ${C.textFaint}; }
  .ps-input-astr option { background: ${C.bgMid}; color: ${C.text}; }
  .ps-select-astr {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239CB6E8' stroke-opacity='.6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-color: rgba(255,255,255,.06);
    padding-right: 28px !important;
    cursor: pointer;
  }
  .ps-gen-btn-astr {
    width: 100%; padding: ${SP.sm + 2}px ${SP.lg - 2}px; border-radius: ${BR.md}px;
    border: 1.5px dashed ${C.borderAccent}; background: ${GR.btnGhost};
    color: ${C.textMuted}; font-family: ${F.ui};
    font-size: ${FS.tiny}px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
    cursor: pointer; transition: all .18s; display: flex; align-items: center;
    justify-content: center; gap: ${SP.xs + 2}px; margin-bottom: ${SP.lg - 2}px;
  }
  .ps-gen-btn-astr:hover:not(:disabled) {
    background: rgba(124,107,196,.16) !important;
    border-color: ${C.accent} !important;
    color: ${C.gold} !important;
  }
  .ps-gen-btn-astr:disabled { opacity: .4; cursor: not-allowed; }
  .ps-test-btn-astr {
    flex-shrink: 0; padding: 0 10px; height: 44px;
    background: rgba(124,107,196,.06); border: 1px solid ${C.borderAccent};
    border-radius: ${BR.md}px; color: ${C.textMuted};
    font-family: ${F.ui}; font-size: ${FS.tiny}px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase; cursor: pointer;
    white-space: nowrap; transition: all .18s; display: flex; align-items: center; gap: ${SP.xs}px;
  }
  .ps-test-btn-astr:hover {
    background: rgba(124,107,196,.16) !important;
    border-color: ${C.accent} !important;
    color: ${C.text} !important;
  }
  .ps-save-btn-astr {
    width: 100%; padding: ${SP.lg}px 0; border-radius: ${BR.pill}px;
    background: ${GR.btnPrimary};
    color: ${C.white}; font-family: ${F.ui};
    font-size: clamp(10px,2.5vw,13px); font-weight: 700;
    letter-spacing: .22em; text-transform: uppercase;
    border: none; cursor: pointer;
    box-shadow: ${SH.btnPrimary};
    position: relative; overflow: hidden;
    transition: transform .22s, box-shadow .22s;
  }
  .ps-save-btn-astr:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: ${SH.btnHover};
  }
  .ps-save-btn-astr:disabled { opacity: .55; cursor: not-allowed; }
  .ps-save-btn-astr::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
    background-size: 350px 100%; animation: ast-shimmer 3s linear infinite;
  }
  .ast-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px,1fr)); gap: ${SP.lg - 2}px; }
  .ast-grid-2-fixed { display: grid; grid-template-columns: 1fr 1fr; gap: ${SP.lg - 2}px; }
  @media (max-width: ${LY.bpMobile + 80}px) { .ast-grid-2-fixed { grid-template-columns: 1fr !important; } }
`;

// ── LocationLinks ────────────────────────────────────────
interface LocationLinksProps {
  locationValue: string;
  mapsValue:     string;
  wazeValue:     string;
  mapsKey:       keyof FormState;
  wazeKey:       keyof FormState;
  setter:        (key: keyof FormState, value: string) => void;
}

const LocationLinks = ({ locationValue, mapsValue, wazeValue, mapsKey, wazeKey, setter }: LocationLinksProps) => {
  const generateLinks = () => {
    const trimmed = locationValue.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);
    setter(mapsKey, `https://www.google.com/maps/search/?api=1&query=${encoded}`);
    setter(wazeKey,  `https://waze.com/ul?q=${encoded}&navigate=yes`);
  };

  return (
    <>
      <button type="button" className="ps-gen-btn-astr" onClick={generateLinks} disabled={!locationValue.trim()}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 12, height: 12, flexShrink: 0 }}>
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" strokeLinecap="round"/>
        </svg>
        Generează automat din numele locației
      </button>

      <div style={{ marginBottom: SP.lg - 2 }}>
        <label style={sLabel}>Link Google Maps</label>
        <div style={{ display: 'flex', gap: SP.xs + 2 }}>
          <input className="ps-input-astr" style={{ marginBottom: 0, flex: 1 }} placeholder="https://www.google.com/maps/..." value={mapsValue} onChange={e => setter(mapsKey, e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" />
          {mapsValue.trim() && (
            <button type="button" className="ps-test-btn-astr" onClick={() => window.open(mapsValue.trim(), '_blank', 'noopener,noreferrer')}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 11, height: 11 }}><path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" strokeLinecap="round"/><path d="M10 2h4v4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2L8 8" strokeLinecap="round"/></svg>
              Test
            </button>
          )}
        </div>
        <p style={{ fontFamily: F.body, fontSize: FS.xs, fontStyle: 'italic', color: C.textFaint, marginTop: SP.xs + 1 }}>
          Sau deschide Google Maps → Share → Copy Link și lipește manual.
        </p>
      </div>

      <div>
        <label style={sLabel}>Link Waze</label>
        <div style={{ display: 'flex', gap: SP.xs + 2 }}>
          <input className="ps-input-astr" style={{ marginBottom: 0, flex: 1 }} placeholder="https://waze.com/ul/..." value={wazeValue} onChange={e => setter(wazeKey, e.target.value)} inputMode="url" autoCapitalize="none" autoCorrect="off" />
          {wazeValue.trim() && (
            <button type="button" className="ps-test-btn-astr" onClick={() => window.open(wazeValue.trim(), '_blank', 'noopener,noreferrer')}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 11, height: 11 }}><path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" strokeLinecap="round"/><path d="M10 2h4v4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2L8 8" strokeLinecap="round"/></svg>
              Test
            </button>
          )}
        </div>
        <p style={{ fontFamily: F.body, fontSize: FS.xs, fontStyle: 'italic', color: C.textFaint, marginTop: SP.xs + 1 }}>
          Sau deschide Waze → caută locația → Share → Copy Link și lipește manual.
        </p>
      </div>
    </>
  );
};

// ── CustomDatePicker ─────────────────────────────────────
const CustomDatePicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const currentYear = new Date().getFullYear();
  const maxYear     = currentYear + 5;
  const parts       = value ? value.split('-') : ['', '', ''];
  const [year, month, day] = parts;

  const handleChange = (type: 'day' | 'month' | 'year', val: string) => {
    if (!val) { onChange(''); return; }
    const d = type === 'day'   ? val : (day   || '01');
    const m = type === 'month' ? val : (month || '01');
    const y = type === 'year'  ? val : (year  || String(currentYear));
    onChange(`${y}-${m}-${d}`);
  };

  return (
    <div style={{ display: 'flex', gap: SP.xs + 2, width: '100%' }}>
      <select className="ps-input-astr ps-select-astr" style={{ flex: 1 }} value={day} onChange={e => handleChange('day', e.target.value)}>
        <option value="">Zi</option>
        {Array.from({ length: 31 }, (_, i) => <option key={i} value={String(i+1).padStart(2,'0')}>{i+1}</option>)}
      </select>
      <select className="ps-input-astr ps-select-astr" style={{ flex: 1 }} value={month} onChange={e => handleChange('month', e.target.value)}>
        <option value="">Lună</option>
        {['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
          <option key={i} value={String(i+1).padStart(2,'0')}>{m}</option>
        ))}
      </select>
      <select className="ps-input-astr ps-select-astr" style={{ flex: 1 }} value={year} onChange={e => handleChange('year', e.target.value)}>
        <option value="">An</option>
        {Array.from({ length: maxYear - currentYear + 1 }, (_, i) => (
          <option key={i} value={String(currentYear+i)}>{currentYear+i}</option>
        ))}
      </select>
    </div>
  );
};

// ── CustomTimePicker ─────────────────────────────────────
const CustomTimePicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [hours, minutes] = value ? value.split(':') : ['', ''];

  const handleChange = (type: 'h' | 'm', val: string) => {
    if (!val) { onChange(''); return; }
    const h = type === 'h' ? val : (hours   || '12');
    const m = type === 'm' ? val : (minutes || '00');
    onChange(`${h}:${m}`);
  };

  return (
    <div style={{ display: 'flex', gap: SP.xs + 2, width: '100%', alignItems: 'center' }}>
      <select className="ps-input-astr ps-select-astr" style={{ flex: 1 }} value={hours} onChange={e => handleChange('h', e.target.value)}>
        <option value="">Ora</option>
        {Array.from({ length: 24 }, (_, i) => <option key={i} value={String(i).padStart(2,'0')}>{String(i).padStart(2,'0')}</option>)}
      </select>
      <span style={{ color: C.gold, fontSize: FS.lg, fontWeight: 300, flexShrink: 0, opacity: 0.7 }}>:</span>
      <select className="ps-input-astr ps-select-astr" style={{ flex: 1 }} value={minutes} onChange={e => handleChange('m', e.target.value)}>
        <option value="">Min</option>
        {Array.from({ length: 60 }, (_, i) => <option key={i} value={String(i).padStart(2,'0')}>{String(i).padStart(2,'0')}</option>)}
      </select>
    </div>
  );
};

// ── MAIN COMPONENT ───────────────────────────────────────
export const PersonalizeSection = ({ initialData, orderId, onSave }: PersonalizeSectionProps) => {
  const [loading,  setLoading]  = useState(false);
  const [formData, setFormData] = useState<FormState>(() => buildForm(initialData));

  useEffect(() => {
    if (initialData) {
      const next = buildForm(initialData);
      setFormData(prev => JSON.stringify(prev) === JSON.stringify(next) ? prev : next);
    }
  }, [initialData]);

  const set = (key: keyof FormState, value: string) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const setFromEvent = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => set(key, e.target.value);

  const buildPayload = (data: FormState) => ({
    orderId,
    customSlug:            data.customSlug,
    brideName:             data.brideName,
    groomName:             '',
    nasiNames:             data.nasiNames,
    parentsNames:          data.parentsNames,
    weddingDate:           data.weddingDate,
    weddingTime:           data.weddingTime,
    locationName:          data.locationName,
    googleMapsUrl:         data.googleMapsUrl,
    wazeUrl:               data.wazeUrl,
    religiousDate:         data.religiousDate,
    religiousTime:         data.religiousTime,
    religiousLocation:     data.religiousLocation,
    religiousMaps:         data.religiousMaps,
    religiousWaze:         data.religiousWaze,
    contactPhoneBride:     data.contactPhoneBride,
    contactPhoneGroom:     '',
    ourStory:              '',
    isReligiousActive:     null,
    isAccommodationActive: null,
    isTransportActive:     null,
  });

  const autoSaveFn = useCallback(async (data: FormState) => {
    if (!orderId) throw new Error('orderId missing');
    const res = await fetch('/api/dashboard/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(data)),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(formData)),
      });
      if (res.ok) {
        setAutoSaveStatus('saved');
        onSave();
      } else {
        const err = await res.json().catch(() => ({}));
        setAutoSaveStatus('unsaved');
        const msg = (err.error || '').toLowerCase();
        if (res.status === 409 || msg.includes('duplicate') || msg.includes('unique') || msg.includes('exist') || msg.includes('slug')) {
          Swal.fire({
            title: '<span style="color:#f4d87e;font-family:sans-serif;">Link deja utilizat 🚀</span>',
            text: 'Link personalizat deja utilizat de alți părinți. Alege un alt Link unic.',
            icon: 'warning',
            confirmButtonColor: '#7c6bc4',
            background: '#0d1117',
            color: '#c9d1d9',
          });
        } else {
          Swal.fire({
            title: '<span style="color:#f4d87e;font-family:sans-serif;">Eroare la salvare</span>',
            text: err.error || 'A apărut o problemă. Încearcă din nou.',
            icon: 'error',
            confirmButtonColor: '#7c6bc4',
            background: '#0d1117',
            color: '#c9d1d9',
          });
        }
      }
    } catch {
      setAutoSaveStatus('unsaved');
      Swal.fire({
        title: '<span style="color:#f4d87e;font-family:sans-serif;">Eroare de conexiune</span>',
        text: 'Nu ne putem conecta la server momentan.',
        icon: 'error',
        confirmButtonColor: '#7c6bc4',
        background: '#0d1117',
        color: '#c9d1d9',
      });
    }
    setLoading(false);
  };

  const saveColor =
    autoSaveStatus === 'saved'   ? C.success  :
    autoSaveStatus === 'unsaved' ? C.gold      :
    C.textMuted;

  return (
    <>
      <style>{PS_CSS}</style>
      <form
        onSubmit={handleSave}
        style={{ display: 'flex', flexDirection: 'column', gap: SP.xl, animation: 'ast-fade-in .45s ease both', paddingBottom: '10vh' }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: SP.sm }}>
          <p style={{ fontFamily: F.ui, fontSize: FS.micro, letterSpacing: '.36em', textTransform: 'uppercase', color: C.textFaint, marginBottom: SP.sm }}>
            Dashboard
          </p>
          <h2 style={{ fontFamily: F.display, fontSize: FS.titleMd, fontWeight: 400, fontStyle: 'italic', color: C.text, margin: 0, lineHeight: 1.1 }}>
            Personalizare Detalii
          </h2>
        </div>

        {/* COPIL + SLUG */}
        <section style={sCard}>
          <h3 style={{ fontFamily: F.display, fontSize: FS.titleSm, fontStyle: 'italic', fontWeight: 400, color: C.text, marginBottom: SP.lg + 2 }}>
            👶 Copil & Link Invitație
          </h3>
          <div className="ast-grid-2">
            <div style={{ marginBottom: SP.lg - 2 }}>
              <label style={sLabel}>Prenumele Copilului</label>
              <input className="ps-input-astr" value={formData.brideName} onChange={setFromEvent('brideName')} placeholder="ex. Zian" />
            </div>
            <div style={{ marginBottom: SP.lg - 2 }}>
              <label style={sLabel}>Slug (Link Personalizat)</label>
              <input className="ps-input-astr" value={formData.customSlug} onChange={e => set('customSlug', e.target.value.toLowerCase().replace(/\s/g, '-'))} placeholder="ex. botez-zian" autoCapitalize="none" autoCorrect="off" />
              <p style={{ fontFamily: F.mono, fontSize: FS.xs, color: C.textMuted, marginTop: SP.xs + 2, fontStyle: 'italic' }}>
                /invitatie/baloane/<strong style={{ color: C.gold }}>{formData.customSlug || 'slug-tau'}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* PĂRINȚI & NAȘI */}
        <section style={sCard}>
          <h3 style={{ fontFamily: F.display, fontSize: FS.titleSm, fontStyle: 'italic', fontWeight: 400, color: C.text, marginBottom: SP.lg + 2 }}>
            👨‍👩‍👧 Părinți & Nași
          </h3>
          <div className="ast-grid-2">
            <div style={{ marginBottom: SP.lg - 2 }}>
              <label style={sLabel}>Numele Părinților</label>
              <input className="ps-input-astr" value={formData.parentsNames} onChange={setFromEvent('parentsNames')} placeholder="ex. Ioana & Radu" />
            </div>
            <div style={{ marginBottom: SP.lg - 2 }}>
              <label style={sLabel}>Numele Nașilor</label>
              <input className="ps-input-astr" value={formData.nasiNames} onChange={setFromEvent('nasiNames')} placeholder="ex. Diana & Vlad" />
            </div>
          </div>
        </section>

        {/* BISERICĂ */}
        <section style={sCard}>
          <h3 style={{ fontFamily: F.display, fontSize: FS.titleSm, fontStyle: 'italic', fontWeight: 400, color: C.text, marginBottom: SP.lg + 2 }}>
            ⛪ Slujba Religioasă
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: SP.lg - 2 }}>
            <div>
              <label style={sLabel}>Locație Biserică</label>
              <input className="ps-input-astr" value={formData.religiousLocation} onChange={setFromEvent('religiousLocation')} placeholder="ex. Biserica Sfântul Andrei, Bacău" />
            </div>
            <div className="ast-grid-2-fixed">
              <div>
                <label style={sLabel}>Data</label>
                <CustomDatePicker value={formData.religiousDate} onChange={v => set('religiousDate', v)} />
              </div>
              <div>
                <label style={sLabel}>Ora (24h)</label>
                <CustomTimePicker value={formData.religiousTime} onChange={v => set('religiousTime', v)} />
              </div>
            </div>
            <LocationLinks locationValue={formData.religiousLocation} mapsValue={formData.religiousMaps} wazeValue={formData.religiousWaze} mapsKey="religiousMaps" wazeKey="religiousWaze" setter={set} />
          </div>
        </section>

        {/* RESTAURANT */}
        <section style={sCard}>
          <h3 style={{ fontFamily: F.display, fontSize: FS.titleSm, fontStyle: 'italic', fontWeight: 400, color: C.text, marginBottom: SP.lg + 2 }}>
            🎉 Recepție / Restaurant
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: SP.lg - 2 }}>
            <div>
              <label style={sLabel}>Locație Restaurant</label>
              <input className="ps-input-astr" value={formData.locationName} onChange={setFromEvent('locationName')} placeholder="ex. Restaurant Orion, Bacău" />
            </div>
            <div className="ast-grid-2-fixed">
              <div>
                <label style={sLabel}>Data</label>
                <CustomDatePicker value={formData.weddingDate} onChange={v => set('weddingDate', v)} />
              </div>
              <div>
                <label style={sLabel}>Ora (24h)</label>
                <CustomTimePicker value={formData.weddingTime} onChange={v => set('weddingTime', v)} />
              </div>
            </div>
            <LocationLinks locationValue={formData.locationName} mapsValue={formData.googleMapsUrl} wazeValue={formData.wazeUrl} mapsKey="googleMapsUrl" wazeKey="wazeUrl" setter={set} />
          </div>
        </section>

        {/* CONTACT */}
        <section style={sCard}>
          <h3 style={{ fontFamily: F.display, fontSize: FS.titleSm, fontStyle: 'italic', fontWeight: 400, color: C.text, marginBottom: SP.lg + 2 }}>
            📞 Contact
          </h3>
          <div style={{ maxWidth: 320 }}>
            <label style={sLabel}>Număr de Telefon</label>
            <input className="ps-input-astr" type="tel" inputMode="tel" autoComplete="tel" value={formData.contactPhoneBride} onChange={setFromEvent('contactPhoneBride')} placeholder="ex. 0740 000 000" />
          </div>
        </section>

        {/* SAVE */}
        <div style={{ marginTop: SP.sm }}>
          {autoSaveStatus !== 'idle' && !loading && (
            <div style={{ textAlign: 'center', marginBottom: SP.sm + 2 }}>
              <span style={{ fontFamily: F.ui, fontSize: FS.tiny, letterSpacing: '.14em', color: saveColor, fontWeight: 700 }}>
                {autoSaveStatus === 'saving'  && '⏳ Salvare automată...'}
                {autoSaveStatus === 'saved'   && '✓ Salvat automat'}
                {autoSaveStatus === 'unsaved' && '● Modificări nesalvate'}
              </span>
            </div>
          )}
          <button type="submit" disabled={loading} className="ps-save-btn-astr">
            <span style={{ position: 'relative', zIndex: 1 }}>
              {loading ? '⏳ Se salvează...' : '🚀 Salvează Modificările'}
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalizeSection;
