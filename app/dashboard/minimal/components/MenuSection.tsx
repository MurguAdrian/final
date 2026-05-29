"use client";
import React, { useState, useEffect } from 'react';

/* ── Tokens (module-level — un singur loc de modificat) ── */
const ACCENT = '#C8503A';
const DARK   = '#111111';
const MID    = '#555555';
const LIGHT  = '#AAAAAA';
const RULE   = '#E2E2E2';
const BG     = '#F7F4F0';

/* ── Types ── */
interface MenuItem        { name: string; description: string; }
interface MenuCategory    { id: string; label: string; emoji: string; active: boolean; items: MenuItem[]; }
interface MenuSectionProps { initialData: any; orderId: any; onSave: () => void; }
interface CategoryCardProps {
  cat: MenuCategory;
  onToggle: () => void;
  onAddItem: () => void;
  onRemoveItem: (i: number) => void;
  onChangeItem: (i: number, field: 'name' | 'description', val: string) => void;
}

/* ── Static data ── */
const DEFAULT_CATEGORIES: MenuCategory[] = [
  { id: 'aperitive',    label: 'Aperitive & Gustări',   emoji: '🍽️', active: false, items: [] },
  { id: 'principal',    label: 'Fel Principal',           emoji: '🥩', active: false, items: [] },
  { id: 'desert',       label: 'Tort & Desert',           emoji: '🎂', active: false, items: [] },
  { id: 'alcoolice',    label: 'Băuturi Alcoolice',       emoji: '🍾', active: false, items: [] },
  { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice',   emoji: '💧', active: false, items: [] },
  { id: 'candybar',     label: 'Candy Bar',               emoji: '🍬', active: false, items: [] },
  { id: 'cafea',        label: 'Cafea & Digestive',       emoji: '☕', active: false, items: [] },
  { id: 'altele',       label: 'Altele',                  emoji: '✨', active: false, items: [] },
];

/* ── Helpers ── */
function buildInitialCategories(saved: any): MenuCategory[] {
  if (!saved?.categories?.length) return DEFAULT_CATEGORIES;
  return DEFAULT_CATEGORIES.map(def => {
    const found = saved.categories.find((c: any) => c.id === def.id);
    return found ? { ...def, active: found.active ?? false, items: found.items ?? [] } : def;
  });
}

/* ── Input base style (module-level to avoid recreating each render) ── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  background: '#fff',
  border: `1px solid ${RULE}`,
  fontFamily: "'DM Sans', sans-serif",
  color: DARK,
  outline: 'none',
  transition: 'border-color .2s',
  minWidth: 0,
  boxSizing: 'border-box',
  WebkitAppearance: 'none',
};

/* ── Icons ── */
const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
    <path d="M4 6h12M8 6V4h4v2M7 6l1 10h4l1-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0, transition: 'transform .25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSpin = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0, animation: 'mn-spin 1s linear infinite' }}>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".2" />
    <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ── Divider (definit înainte de utilizare) ── */
const MinDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '18px 0' }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${RULE})` }} />
    <div style={{ width: 5, height: 5, background: ACCENT, transform: 'rotate(45deg)', margin: '0 8px', opacity: .4 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${RULE},transparent)` }} />
  </div>
);

/* ── Toggle ── */
const MinToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <label
    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', flexShrink: 0 }}
  >
    {/* Folosim onChange-ul nativ al checkbox-ului, eliminând onClick de pe label */}
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)} 
      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} 
    />
    <div style={{
      width: 40, height: 22, position: 'relative', flexShrink: 0,
      background: checked ? ACCENT : RULE,
      transition: 'background .25s',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: 2, width: 18, height: 18,
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,.2)',
        transform: checked ? 'translateX(18px)' : 'translateX(0)',
        transition: 'transform .25s',
      }} />
    </div>
    <span style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: checked ? ACCENT : LIGHT,
      transition: 'color .25s', whiteSpace: 'nowrap',
    }}>
      {checked ? 'Activ' : 'Inactiv'}
    </span>
  </label>
);

/* ── Category Card ── */
function CategoryCard({ cat, onToggle, onAddItem, onRemoveItem, onChangeItem }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(cat.active);

  useEffect(() => {
    if (cat.active) setExpanded(true);
  }, [cat.active]);

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${cat.active ? 'rgba(200,80,58,.25)' : RULE}`,
      borderLeft: `3px solid ${cat.active ? ACCENT : RULE}`,
      transition: 'all .25s', overflow: 'hidden',
      boxShadow: cat.active ? '0 2px 12px rgba(200,80,58,.06)' : '0 1px 4px rgba(0,0,0,.03)',
    }}>
      {/* Header */}
      <div
        onClick={() => { if (cat.active) setExpanded(prev => !prev); }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px',
          cursor: cat.active ? 'pointer' : 'default',
          borderBottom: cat.active && expanded ? `1px solid ${RULE}` : '1px solid transparent',
          transition: 'border-color .25s',
          gap: 10, minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 34, height: 34,
            background: cat.active ? 'rgba(200,80,58,.07)' : BG,
            border: `1px solid ${cat.active ? 'rgba(200,80,58,.2)' : RULE}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontSize: 14, transition: 'all .25s',
          }}>
            {cat.emoji}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 500,
              letterSpacing: '.04em',
              color: cat.active ? DARK : LIGHT,
              marginBottom: 2, transition: 'color .25s',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {cat.label}
            </p>
            {cat.active && cat.items.length > 0 && (
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, fontStyle: 'italic', color: LIGHT, marginBottom: 0 }}>
                {cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}
              </p>
            )}
            {!cat.active && (
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, fontStyle: 'italic', color: '#CCCCCC', marginBottom: 0 }}>
                Activează pentru a configura
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <MinToggle checked={cat.active} onChange={onToggle} />
          {cat.active && <span style={{ color: LIGHT }}><IconChevron open={expanded} /></span>}
        </div>
      </div>

      {/* Body */}
      {cat.active && expanded && (
        <div style={{ padding: '12px 14px', animation: 'mn-fade-in .3s ease both' }}>
          {cat.items.length > 0 && (
            <div
              className="menu-col-labels"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 34px', gap: 8, marginBottom: 5, padding: '0 2px' }}
            >
              {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
                <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase', color: LIGHT }}>
                  {h}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {cat.items.map((item, idx) => (
              <div
                key={idx}
                className="menu-item-row"
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.4fr 34px',
                  gap: 8, alignItems: 'center',
                  padding: '8px 10px',
                  background: BG,
                  border: `1px solid ${RULE}`,
                }}
              >
                <input
                  className="mn-inp"
                  placeholder="ex: Somon afumat"
                  value={item.name}
                  onChange={e => onChangeItem(idx, 'name', e.target.value)}
                  style={inputStyle}
                />
                <input
                  className="mn-inp"
                  placeholder="ex: cu cremă de avocado"
                  value={item.description}
                  onChange={e => onChangeItem(idx, 'description', e.target.value)}
                  style={inputStyle}
                />
                <button
                  type="button"
                  className="mn-del-btn"
                  onClick={() => onRemoveItem(idx)}
                  style={{
                    width: 30, height: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#fff',
                    border: `1px solid ${RULE}`,
                    cursor: 'pointer', color: LIGHT,
                    transition: 'all .18s', flexShrink: 0,
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          {cat.items.length === 0 && (
            <div style={{ padding: '16px 0', textAlign: 'center', border: `1px dashed ${RULE}`, marginBottom: 8 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontStyle: 'italic', color: LIGHT, marginBottom: 0 }}>
                Niciun element adăugat
              </p>
            </div>
          )}

          <button
            type="button"
            className="mn-add-btn"
            onClick={onAddItem}
            style={{
              width: '100%', padding: '9px 0',
              marginTop: cat.items.length > 0 ? 8 : 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              background: 'transparent',
              border: `1px dashed rgba(200,80,58,.3)`,
              color: 'rgba(200,80,58,.6)',
              fontFamily: "'DM Sans', sans-serif", fontSize: 8, fontWeight: 600,
              letterSpacing: '.2em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all .18s',
            }}
          >
            <IconPlus /> Adaugă element
          </button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════ MAIN EXPORT ══ */
export const MenuSection = ({ initialData, orderId, onSave }: MenuSectionProps) => {
  const [loading, setLoading]       = useState(false);
  const [isActive, setIsActive]     = useState<boolean>(initialData?.is_menu_active ?? false);
  const [categories, setCategories] = useState<MenuCategory[]>(() => buildInitialCategories(initialData?.menu_details));

  useEffect(() => {
    setIsActive(initialData?.is_menu_active ?? false);
    setCategories(buildInitialCategories(initialData?.menu_details));
  }, [initialData]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, isMenuActive: isActive, menu_details: { categories } }),
      });
      if (res.ok) { alert('Meniu salvat! 🍴'); onSave(); }
      else { alert('Eroare la salvare.'); }
    } catch { alert('Eroare la salvare.'); }
    setLoading(false);
  };

  const updateCat = (id: string, updater: (c: MenuCategory) => MenuCategory) =>
    setCategories(prev => prev.map(c => c.id === id ? updater(c) : c));

  const activeCount = categories.filter(c => c.active).length;
  const totalItems  = categories.reduce((a, c) => a + c.items.length, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes mn-spin    { from { transform: rotate(0deg)  } to { transform: rotate(360deg) } }
        @keyframes mn-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }

        /* iOS: prevent zoom on focus */
        .mn-inp {
          font-size: 16px !important;
          -webkit-text-size-adjust: 100%;
          -webkit-appearance: none;
          appearance: none;
        }

        .menu-section-wrap {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: auto;
          width: 100%;
          max-width: 780px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .mn-inp:focus        { border-color: ${ACCENT} !important; outline: none; }
        .mn-inp::placeholder { color: #CCCCCC !important; font-style: italic; }

        .mn-del-btn:hover { background: rgba(200,80,58,.08) !important; border-color: rgba(200,80,58,.3) !important; color: ${ACCENT} !important; }
        .mn-add-btn:hover { background: rgba(200,80,58,.05) !important; border-color: rgba(200,80,58,.5) !important; color: ${ACCENT} !important; }
        .mn-save-btn:hover:not(:disabled) { background: #9a3e2d !important; transform: translateY(-1px); }
        .mn-save-btn:disabled { opacity: .55; cursor: not-allowed; }

        @media (max-width: 600px) {
          .menu-col-labels { display: none !important; }
          .menu-item-row {
            grid-template-columns: 1fr 34px !important;
            grid-template-rows: auto auto;
            gap: 5px !important;
          }
          .menu-item-row input:first-child  { grid-column: 1; grid-row: 1; }
          .menu-item-row input:nth-child(2) { grid-column: 1; grid-row: 2; }
          .menu-item-row button             { grid-column: 2; grid-row: 1 / 3; align-self: center; }
          .menu-stats-row  { flex-direction: column !important; gap: 5px !important; }
        }
      `}</style>

      <div className="menu-section-wrap" style={{ animation: 'mn-fade-in .5s ease both', fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 28, height: 2, background: ACCENT }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: LIGHT }}>
              Configurare
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,5vw,34px)', fontWeight: 400, fontStyle: 'italic', color: DARK, margin: 0, lineHeight: 1.1 }}>
              Meniu Nuntă
            </h2>
            {isActive && (
              <div className="menu-stats-row" style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: ACCENT, lineHeight: 1, marginBottom: 2 }}>
                    {activeCount}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: LIGHT, marginBottom: 0 }}>
                    Categorii
                  </p>
                </div>
                <div style={{ width: 1, background: RULE }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: ACCENT, lineHeight: 1, marginBottom: 2 }}>
                    {totalItems}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: LIGHT, marginBottom: 0 }}>
                    Feluri
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <MinDivider />

        {/* ── MASTER TOGGLE ── */}
        <div style={{
          padding: '14px 16px', marginBottom: 20,
          background: '#fff',
          border: `1px solid ${isActive ? 'rgba(200,80,58,.25)' : RULE}`,
          borderLeft: `3px solid ${isActive ? ACCENT : RULE}`,
          boxShadow: '0 2px 8px rgba(0,0,0,.04)',
          transition: 'all .25s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 36, height: 36,
                background: isActive ? 'rgba(200,80,58,.08)' : BG,
                border: `1px solid ${isActive ? 'rgba(200,80,58,.2)' : RULE}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 16, transition: 'all .25s',
              }}>
                🍽️
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 500, letterSpacing: '.04em', color: DARK, marginBottom: 2 }}>
                  Afișează meniul pe invitație
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, fontStyle: 'italic', color: isActive ? MID : LIGHT, lineHeight: 1.4, marginBottom: 0 }}>
                  {isActive ? 'Invitații vor vedea meniul complet' : 'Activează pentru a configura și afișa'}
                </p>
              </div>
            </div>
            <MinToggle checked={isActive} onChange={setIsActive} />
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        {isActive && (
          <div style={{ animation: 'mn-fade-in .35s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '.24em', textTransform: 'uppercase', color: LIGHT, marginBottom: 0 }}>
                Categorii Meniu
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, fontStyle: 'italic', color: LIGHT, marginBottom: 0 }}>
                Activează categoriile dorite &amp; adaugă felurile
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {categories.map(cat => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  onToggle={() => updateCat(cat.id, c => ({ ...c, active: !c.active }))}
                  onAddItem={() => updateCat(cat.id, c => ({ ...c, items: [...c.items, { name: '', description: '' }] }))}
                  onRemoveItem={i => updateCat(cat.id, c => ({ ...c, items: c.items.filter((_, idx) => idx !== i) }))}
                  onChangeItem={(i, field, val) => updateCat(cat.id, c => {
                    const items = [...c.items];
                    items[i] = { ...items[i], [field]: val };
                    return { ...c, items };
                  })}
                />
              ))}
            </div>

            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 9,
              padding: '11px 14px',
              background: '#fff',
              border: `1px solid ${RULE}`,
              borderLeft: `3px solid rgba(200,80,58,.3)`,
              marginBottom: 16,
            }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0, marginTop: 1 }}>
                <circle cx="10" cy="10" r="8" stroke={LIGHT} strokeWidth="1.2" />
                <path d="M10 9v5M10 7h.01" stroke={LIGHT} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, fontStyle: 'italic', color: LIGHT, lineHeight: 1.7, marginBottom: 0 }}>
                Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
              </p>
            </div>
          </div>
        )}

        {/* ── SAVE ── */}
        <button
          type="button"
          className="mn-save-btn"
          onClick={handleSave}
          disabled={loading}
          style={{
            width: '100%', padding: '15px 0',
            background: DARK, color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 600,
            letterSpacing: '.22em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer',
            transition: 'all .2s',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            {loading ? <><IconSpin /> Salvare în curs...</> : '← Salvează Meniul →'}
          </span>
        </button>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, letterSpacing: '.2em', textTransform: 'uppercase', color: '#CCCCCC', textAlign: 'center', marginTop: 12 }}>
          VibeInvite · Tema Minimal
        </p>

      </div>
    </>
  );
};
