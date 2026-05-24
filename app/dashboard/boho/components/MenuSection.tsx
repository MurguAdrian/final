"use client";
import React, { useState, useEffect } from 'react';

interface MenuItem {
  name: string;
  description: string;
}

interface MenuCategory {
  id: string;
  label: string;
  emoji: string;
  active: boolean;
  items: MenuItem[];
}

interface MenuSectionProps {
  initialData: any;
  orderId: any;
  onSave: () => void;
}

interface CategoryCardProps {
  cat: MenuCategory;
  onToggle: () => void;
  onAddItem: () => void;
  onRemoveItem: (i: number) => void;
  onChangeItem: (i: number, field: 'name' | 'description', val: string) => void;
}

const DEFAULT_CATEGORIES: MenuCategory[] = [
  { id: 'aperitive',    label: 'Aperitive & Gustări',     emoji: '🍽️', active: false, items: [] },
  { id: 'principal',    label: 'Fel Principal',            emoji: '🥩', active: false, items: [] },
  { id: 'desert',       label: 'Tort & Desert',            emoji: '🎂', active: false, items: [] },
  { id: 'alcoolice',    label: 'Băuturi Alcoolice',        emoji: '🍾', active: false, items: [] },
  { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice',    emoji: '💧', active: false, items: [] },
  { id: 'candybar',     label: 'Candy Bar',                emoji: '🍬', active: false, items: [] },
  { id: 'cafea',        label: 'Cafea & Digestive',        emoji: '☕', active: false, items: [] },
  { id: 'altele',       label: 'Altele',                   emoji: '✨', active: false, items: [] },
];

function buildInitialCategories(saved: any): MenuCategory[] {
  if (!saved?.categories?.length) return DEFAULT_CATEGORIES;
  return DEFAULT_CATEGORIES.map(def => {
    const found = saved.categories.find((c: any) => c.id === def.id);
    return found ? { ...def, active: found.active ?? false, items: found.items ?? [] } : def;
  });
}

const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
    <path d="M4 6h12M8 6V4h4v2M7 6l1 10h4l1-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, transition: 'transform .3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSpin = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, animation: 'boho-spin 1s linear infinite' }}>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
    <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BohoToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <label
    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}
    onClick={e => e.stopPropagation()}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
    />
    <div style={{
      width: 44, height: 24, borderRadius: 12, position: 'relative', flexShrink: 0,
      background: checked ? 'linear-gradient(135deg,#C4785A,#E8A48A)' : 'rgba(196,120,90,.12)',
      border: `1px solid ${checked ? 'rgba(196,120,90,.5)' : 'rgba(196,120,90,.2)'}`,
      boxShadow: checked ? '0 0 12px rgba(196,120,90,.2)' : 'none',
      transition: 'all .3s ease',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: 2, width: 18, height: 18, borderRadius: '50%',
        background: checked ? '#FDF6EF' : 'rgba(196,120,90,.4)',
        boxShadow: '0 2px 6px rgba(0,0,0,.15)',
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform .3s ease, background .3s ease',
      }} />
    </div>
    <span style={{
      fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: checked ? '#C4785A' : 'rgba(196,120,90,.35)',
      transition: 'color .3s', whiteSpace: 'nowrap',
    }}>{checked ? 'Activ' : 'Inactiv'}</span>
  </label>
);

const BohoDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '20px 0' }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(196,120,90,.25))' }} />
    <svg viewBox="0 0 60 20" width="50" height="16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 C10 6, 15 6, 20 10" stroke="#C4785A" strokeWidth=".8" strokeOpacity=".5" fill="none" />
      <path d="M40 10 C45 6, 50 6, 55 10" stroke="#C4785A" strokeWidth=".8" strokeOpacity=".5" fill="none" />
      <circle cx="30" cy="10" r="3" fill="none" stroke="#C4785A" strokeWidth="1" strokeOpacity=".7" />
      <circle cx="30" cy="10" r="1.2" fill="#C4785A" fillOpacity=".6" />
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(196,120,90,.25),transparent)' }} />
  </div>
);

function CategoryCard({ cat, onToggle, onAddItem, onRemoveItem, onChangeItem }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(cat.active);

  useEffect(() => {
    if (cat.active) setExpanded(true);
  }, [cat.active]);

  const handleHeaderClick = () => {
    if (cat.active) setExpanded(prev => !prev);
  };

  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${cat.active ? 'rgba(196,120,90,.3)' : 'rgba(196,120,90,.12)'}`,
      background: cat.active
        ? 'linear-gradient(160deg,rgba(255,245,235,.9) 0%,rgba(253,246,239,.95) 100%)'
        : 'rgba(253,246,239,.5)',
      boxShadow: cat.active
        ? '0 4px 20px rgba(196,120,90,.12),inset 0 1px 0 rgba(255,255,255,.8)'
        : '0 2px 8px rgba(196,120,90,.06)',
      transition: 'all .3s ease',
    }}>
      <div
        onClick={handleHeaderClick}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px',
          cursor: cat.active ? 'pointer' : 'default',
          borderBottom: cat.active && expanded ? '1px solid rgba(196,120,90,.12)' : '1px solid transparent',
          transition: 'border-color .3s',
          gap: 10, minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12, flexShrink: 0,
            background: cat.active ? 'rgba(196,120,90,.12)' : 'rgba(196,120,90,.06)',
            border: `1px solid ${cat.active ? 'rgba(196,120,90,.25)' : 'rgba(196,120,90,.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, transition: 'all .3s',
          }}>{cat.emoji}</div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 600,
              color: cat.active ? '#7A4A35' : 'rgba(122,74,53,.4)',
              marginBottom: 2, transition: 'color .3s',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{cat.label}</p>
            {cat.active && cat.items.length > 0 && (
              <p style={{ fontFamily: "'Lora', serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(196,120,90,.6)', marginBottom: 0 }}>
                {cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}
              </p>
            )}
            {!cat.active && (
              <p style={{ fontFamily: "'Lora', serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(196,120,90,.35)', marginBottom: 0 }}>
                Activează pentru a configura
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <BohoToggle checked={cat.active} onChange={onToggle} />
          {cat.active && (
            <span style={{ color: 'rgba(196,120,90,.5)', transition: 'color .2s' }}>
              <IconChevron open={expanded} />
            </span>
          )}
        </div>
      </div>

      {cat.active && expanded && (
        <div style={{ padding: '14px 16px', animation: 'boho-fade-in .35s ease both' }}>

          {cat.items.length > 0 && (
            <div
              className="menu-col-labels"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px', gap: 8, marginBottom: 6, padding: '0 2px' }}
            >
              {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
                <span key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(196,120,90,.45)' }}>
                  {h}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cat.items.map((item, idx) => (
              <div
                key={idx}
                className="menu-item-row"
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
                  gap: 8, alignItems: 'center',
                  padding: '10px', borderRadius: 12,
                  background: 'rgba(255,255,255,.7)',
                  border: '1px solid rgba(196,120,90,.15)',
                }}
              >
                <input
                  className="boho-inp"
                  placeholder="ex: Somon afumat"
                  value={item.name}
                  onChange={e => onChangeItem(idx, 'name', e.target.value)}
                  style={inputStyle}
                />
                <input
                  className="boho-inp"
                  placeholder="ex: cu cremă de avocado"
                  value={item.description}
                  onChange={e => onChangeItem(idx, 'description', e.target.value)}
                  style={inputStyle}
                />
                <button
                  className="boho-row-del"
                  type="button"
                  onClick={() => onRemoveItem(idx)}
                  style={{
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(220,80,60,.06)',
                    border: '1px solid rgba(220,80,60,.18)',
                    borderRadius: 8, cursor: 'pointer',
                    color: 'rgba(200,80,60,.6)', transition: 'all .2s', flexShrink: 0,
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          {cat.items.length === 0 && (
            <div style={{ padding: '20px 0', textAlign: 'center', border: '1px dashed rgba(196,120,90,.2)', borderRadius: 12, marginBottom: 10 }}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: 'rgba(196,120,90,.4)', marginBottom: 0 }}>
                Niciun element adăugat
              </p>
            </div>
          )}

          <button
            className="boho-add"
            type="button"
            onClick={onAddItem}
            style={{
              width: '100%', padding: '10px 0',
              marginTop: cat.items.length > 0 ? 10 : 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: 'transparent',
              border: '1px dashed rgba(196,120,90,.3)', borderRadius: 12,
              color: 'rgba(196,120,90,.6)',
              fontFamily: "'Playfair Display', serif", fontSize: 8,
              fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all .2s',
            }}
          >
            <IconPlus /> Adaugă element
          </button>
        </div>
      )}
    </div>
  );
}

export const MenuSection = ({ initialData, orderId, onSave }: MenuSectionProps) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(initialData?.is_menu_active ?? false);
  const [categories, setCategories] = useState<MenuCategory[]>(() =>
    buildInitialCategories(initialData?.menu_details)
  );

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
        body: JSON.stringify({
          orderId,
          isMenuActive: isActive,
          menu_details: { categories },
        }),
      });
      if (res.ok) {
        alert('Meniu salvat! 🌿');
        onSave();
      } else {
        alert('Eroare la salvare.');
      }
    } catch {
      alert('Eroare la salvare.');
    }
    setLoading(false);
  };

  const updateCat = (id: string, updater: (c: MenuCategory) => MenuCategory) =>
    setCategories(prev => prev.map(c => c.id === id ? updater(c) : c));

  const activeCount = categories.filter(c => c.active).length;
  const totalItems  = categories.reduce((a, c) => a + c.items.length, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lora:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes boho-spin    { from { transform: rotate(0deg)  } to { transform: rotate(360deg) } }
        @keyframes boho-fade-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes boho-shimmer { 0%{ background-position: -350px 0 } 100%{ background-position: 350px 0 } }

        .boho-inp {
          font-size: 16px !important;
          -webkit-text-size-adjust: 100%;
          -webkit-appearance: none;
          appearance: none;
        }

        .menu-section-wrap {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: auto;
        }

        .boho-inp:focus         { border-color: rgba(196,120,90,.5) !important; background: rgba(196,120,90,.05) !important; outline: none; }
        .boho-inp::placeholder  { color: rgba(122,74,53,.25) !important; font-style: italic; }
        .boho-row-del:hover     { background: rgba(220,80,60,.14) !important; border-color: rgba(200,80,60,.4) !important; color: #c44040 !important; }
        .boho-add:hover         { background: rgba(196,120,90,.06) !important; border-color: rgba(196,120,90,.45) !important; color: #C4785A !important; }
        .boho-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(196,120,90,.35) !important; }
        .boho-save:disabled     { opacity: .6; cursor: not-allowed; }

        .menu-section-wrap { width: 100%; max-width: 780px; box-sizing: border-box; overflow-x: hidden; }

        @media (max-width: 600px) {
          .menu-col-labels { display: none !important; }
          .menu-item-row {
            grid-template-columns: 1fr 36px !important;
            grid-template-rows: auto auto;
            gap: 6px !important;
          }
          .menu-item-row input:first-child  { grid-column: 1; grid-row: 1; }
          .menu-item-row input:nth-child(2) { grid-column: 1; grid-row: 2; }
          .menu-item-row button             { grid-column: 2; grid-row: 1 / 3; align-self: center; }
          .menu-stats-row  { flex-direction: column !important; gap: 6px !important; }
          .menu-master-toggle { flex-wrap: wrap !important; }
        }
        @media (max-width: 400px) {
          .menu-section-wrap { padding: 0 !important; }
        }
      `}</style>

      <div className="menu-section-wrap" style={{ animation: 'boho-fade-in .55s ease both', fontFamily: "'Lora', serif" }}>

        <div style={{ marginBottom: 6 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(196,120,90,.6)', marginBottom: 8 }}>
            Configurare
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,5vw,36px)', fontWeight: 400, fontStyle: 'italic', color: '#7A4A35', margin: 0, lineHeight: 1.1 }}>
              Meniu Nuntă
            </h2>
            {isActive && (
              <div className="menu-stats-row" style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,28px)', fontWeight: 400, color: '#C4785A', lineHeight: 1, marginBottom: 2 }}>{activeCount}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(196,120,90,.5)', marginBottom: 0 }}>Categorii</p>
                </div>
                <div style={{ width: 1, background: 'rgba(196,120,90,.2)' }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,28px)', fontWeight: 400, color: '#C4785A', lineHeight: 1, marginBottom: 2 }}>{totalItems}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(196,120,90,.5)', marginBottom: 0 }}>Feluri</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <BohoDivider />

        <div style={{
          padding: 16,
          background: isActive
            ? 'linear-gradient(160deg,rgba(255,245,235,.95) 0%,rgba(253,240,230,.98) 100%)'
            : 'rgba(253,246,239,.6)',
          border: `1px solid ${isActive ? 'rgba(196,120,90,.25)' : 'rgba(196,120,90,.12)'}`,
          borderRadius: 16, marginBottom: 24,
          boxShadow: '0 4px 20px rgba(196,120,90,.08),inset 0 1px 0 rgba(255,255,255,.8)',
          position: 'relative', overflow: 'hidden', transition: 'all .3s',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(196,120,90,.3)' : 'rgba(196,120,90,.15)'},transparent)` }} />
          <div className="menu-master-toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: isActive ? 'rgba(196,120,90,.12)' : 'rgba(196,120,90,.06)',
                border: `1px solid ${isActive ? 'rgba(196,120,90,.28)' : 'rgba(196,120,90,.12)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'all .3s',
              }}>🍽️</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, color: '#7A4A35', marginBottom: 3 }}>
                  Afișează meniul pe invitație
                </p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 12, fontStyle: 'italic', color: isActive ? 'rgba(196,120,90,.6)' : 'rgba(196,120,90,.35)', lineHeight: 1.4, marginBottom: 0 }}>
                  {isActive ? 'Invitații vor vedea meniul complet' : 'Activează pentru a configura și afișa'}
                </p>
              </div>
            </div>
            <BohoToggle checked={isActive} onChange={setIsActive} />
          </div>
        </div>

        {isActive && (
          <div style={{ animation: 'boho-fade-in .4s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 8, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(196,120,90,.5)', marginBottom: 0 }}>
                Categorii Meniu
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 12, fontStyle: 'italic', color: 'rgba(196,120,90,.4)', marginBottom: 0 }}>
                Activează categoriile dorite &amp; adaugă felurile
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
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

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', borderRadius: 12, background: 'rgba(196,120,90,.04)', border: '1px solid rgba(196,120,90,.12)', marginBottom: 20 }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                <circle cx="10" cy="10" r="8" stroke="#C4785A" strokeWidth="1.2" strokeOpacity=".55" />
                <path d="M10 9v5M10 7h.01" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" strokeOpacity=".65" />
              </svg>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(122,74,53,.5)', lineHeight: 1.7, marginBottom: 0 }}>
                Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
              </p>
            </div>
          </div>
        )}

        <button
          className="boho-save"
          type="button"
          onClick={handleSave}
          disabled={loading}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 12,
            background: 'linear-gradient(135deg,#C4785A 0%,#E8A48A 45%,#F5C4A8 55%,#E8A48A 70%,#C4785A 100%)',
            color: '#FDF6EF',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 600,
            letterSpacing: '.18em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(196,120,90,.25),0 2px 0 rgba(255,200,180,.3) inset',
            transition: 'transform .22s, box-shadow .22s',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {loading ? <><IconSpin /> Salvare în curs...</> : '✦ Salvează Meniul ✦'}
          </span>
          {!loading && (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', backgroundSize: '350px 100%', animation: 'boho-shimmer 3s linear infinite' }} />
          )}
        </button>

        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(196,120,90,.3)', textAlign: 'center', marginTop: 14 }}>
          VibeInvite · Meniu Nuntă Boho
        </p>

      </div>
    </>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  background: 'rgba(255,255,255,.8)',
  border: '1px solid rgba(196,120,90,.2)',
  borderRadius: 8,
  fontFamily: "'Lora', serif",
  color: '#7A4A35',
  outline: 'none',
  transition: 'all .2s',
  minWidth: 0,
  boxSizing: 'border-box',
  WebkitAppearance: 'none',
};
