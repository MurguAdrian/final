// FIȘIER: andre/app/dashboard/minimal/components/MenuSection.tsx
// MODIFICĂRI FAȚĂ DE ROMANTIC:
//   - Import tokens: romanticTokens → minimalTokens
//   - Culori: toate rgba(196,80,106,...) / rgba(166,50,72,...) / rgba(138,74,88,...) → echivalente charcoal/gri
//   - Fonturi: Playfair Display → Plus Jakarta Sans; Cinzel → DM Sans; Cormorant → Spectral

"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { C, F, FS, SP, BR, IS, SH, GR, KEYFRAMES } from '../minimalTokens';
import Swal from 'sweetalert2';
import { useAutoSave } from '../hooks/useAutoSave';

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

const DEFAULT_CATEGORIES: MenuCategory[] = [
  { id: 'aperitive',    label: 'Aperitive & Gustări',   emoji: '🍽️', active: false, items: [] },
  { id: 'principal',    label: 'Fel Principal',          emoji: '🥩', active: false, items: [] },
  { id: 'desert',       label: 'Tort & Desert',          emoji: '🎂', active: false, items: [] },
  { id: 'alcoolice',    label: 'Băuturi Alcoolice',      emoji: '🍾', active: false, items: [] },
  { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice',  emoji: '💧', active: false, items: [] },
  { id: 'candybar',     label: 'Candy Bar',              emoji: '🍬', active: false, items: [] },
  { id: 'cafea',        label: 'Cafea & Digestive',      emoji: '☕', active: false, items: [] },
  { id: 'altele',       label: 'Altele',                 emoji: '✨', active: false, items: [] },
];

function buildInitialCategories(saved: any): MenuCategory[] {
  if (!saved?.categories?.length) return DEFAULT_CATEGORIES;
  return DEFAULT_CATEGORIES.map(def => {
    const found = saved.categories.find((c: any) => c.id === def.id);
    return found ? { ...def, active: found.active ?? false, items: found.items ?? [] } : def;
  });
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: `9px 13px`,
  background: `rgba(249,250,251,.9)`,
  border: `1px solid rgba(26,26,26,.14)`,
  borderRadius: BR.md,
  fontFamily: F.body,
  fontSize: FS.input,
  color: C.dark,
  outline: 'none',
  transition: 'all .2s',
  minWidth: 0,
  boxSizing: 'border-box' as const,
  WebkitAppearance: 'none' as any,
};

const IconPlus = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.sm, height: IS.sm, flexShrink: 0 }}>
    <path d="M4 6h12M8 6V4h4v2M7 6l1 10h4l1-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.md, height: IS.md, flexShrink: 0, transition: 'transform .3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSpin = () => (
  <svg viewBox="0 0 20 20" fill="none" style={{ width: IS.md, height: IS.md, flexShrink: 0, animation: 'rm-spin 1s linear infinite' }}>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
    <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MinimalSquare = ({ size = IS.md, color = C.crimson }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, flexShrink: 0 }}>
    <rect x="3" y="3" width="8" height="8" rx="1" fill={color} fillOpacity=".9" />
    <rect x="13" y="3" width="8" height="8" rx="1" fill={color} fillOpacity=".45" />
    <rect x="3" y="13" width="8" height="8" rx="1" fill={color} fillOpacity=".45" />
    <rect x="13" y="13" width="8" height="8" rx="1" fill={color} fillOpacity=".2" />
  </svg>
);

const MinimalDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 0, margin: `${SP.xl}px 0` }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(26,26,26,.12))` }} />
    <svg viewBox="0 0 80 30" width="80" height="30" fill="none">
      <path d="M5 15 L22 15"  stroke="#1a1a1a" strokeWidth=".8" strokeOpacity=".2" />
      <path d="M58 15 L75 15" stroke="#1a1a1a" strokeWidth=".8" strokeOpacity=".2" />
      <rect x="27" y="9" width="6" height="6" stroke="#1a1a1a" strokeWidth=".9" strokeOpacity=".45" transform="rotate(45 30 15)" fill="none" />
      <circle cx="30" cy="15" r="1.8" fill="#1a1a1a" fillOpacity=".3" />
      <circle cx="22" cy="15" r="1.5" fill="#1a1a1a" fillOpacity=".15" />
      <circle cx="58" cy="15" r="1.5" fill="#1a1a1a" fillOpacity=".15" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(26,26,26,.12),transparent)` }} />
  </div>
);

const MinimalToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <label
    style={{ display: 'inline-flex', alignItems: 'center', gap: SP.sm, cursor: 'pointer', flexShrink: 0 }}
    onClick={e => e.stopPropagation()}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
    />
    <div style={{
      width: 46, height: 25, borderRadius: 100, position: 'relative', flexShrink: 0,
      background: checked ? GR.roseBtn : 'rgba(26,26,26,.08)',
      border: `1px solid ${checked ? 'rgba(26,26,26,.35)' : 'rgba(26,26,26,.12)'}`,
      boxShadow: checked ? SH.toggleGlow : 'none',
      transition: 'all .3s ease',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: 2, width: 19, height: 19, borderRadius: '50%',
        background: checked ? C.white : `rgba(26,26,26,.3)`,
        boxShadow: '0 2px 6px rgba(0,0,0,.2)',
        transform: checked ? 'translateX(21px)' : 'translateX(0)',
        transition: 'transform .3s ease, background .3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <MinimalSquare size={9} color={C.crimson} />}
      </div>
    </div>
    <span style={{
      fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.16em', textTransform: 'uppercase' as const,
      color: checked ? C.crimson : `rgba(26,26,26,.3)`,
      transition: 'color .3s', whiteSpace: 'nowrap' as const,
    }}>
      {checked ? 'Activ' : 'Inactiv'}
    </span>
  </label>
);

function CategoryCard({ cat, onToggle, onAddItem, onRemoveItem, onChangeItem }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(cat.active);

  useEffect(() => {
    if (cat.active) setExpanded(true);
  }, [cat.active]);

  return (
    <div style={{
      borderRadius: BR.xxl,
      overflow: 'hidden',
      border: `1.5px solid ${cat.active ? 'rgba(26,26,26,.18)' : 'rgba(26,26,26,.07)'}`,
      background: cat.active ? GR.cardActive : GR.cardInactive,
      boxShadow: cat.active ? SH.cardActive : `0 2px 10px rgba(0,0,0,.03)`,
      backdropFilter: 'blur(8px)',
      transition: 'all .3s ease',
    }}>

      <div
        onClick={() => cat.active && setExpanded(prev => !prev)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `14px ${SP.lg}px`,
          cursor: cat.active ? 'pointer' : 'default',
          borderBottom: cat.active && expanded ? `1px solid rgba(26,26,26,.08)` : '1px solid transparent',
          transition: 'border-color .3s',
          gap: SP.sm, minWidth: 0,
          position: 'relative',
        }}
      >
        {cat.active && (
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,rgba(26,26,26,.12),transparent)` }} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: BR.lg, flexShrink: 0,
            background: cat.active ? `linear-gradient(135deg,rgba(26,26,26,.08) 0%,rgba(243,244,246,.7) 100%)` : 'rgba(26,26,26,.04)',
            border: `1px solid ${cat.active ? 'rgba(26,26,26,.18)' : 'rgba(26,26,26,.07)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: SP.lg, transition: 'all .3s',
          }}>
            {cat.emoji}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontFamily: F.heading, fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 600,
              letterSpacing: '.08em', color: cat.active ? C.dark : `rgba(26,26,26,.28)`,
              marginBottom: 2, transition: 'color .3s',
              whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {cat.label}
            </p>
            {cat.active && cat.items.length > 0 && (
              <p style={{ fontFamily: F.body, fontSize: FS.base, fontStyle: 'italic', color: C.textLight, marginBottom: 0 }}>
                {cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}
              </p>
            )}
            {!cat.active && (
              <p style={{ fontFamily: F.body, fontSize: FS.base, fontStyle: 'italic', color: `rgba(26,26,26,.22)`, marginBottom: 0 }}>
                Activează pentru a configura
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flexShrink: 0 }}>
          <MinimalToggle checked={cat.active} onChange={onToggle} />
          {cat.active && (
            <span style={{ color: `rgba(26,26,26,.4)`, transition: 'color .2s' }}>
              <IconChevron open={expanded} />
            </span>
          )}
        </div>
      </div>

      {cat.active && expanded && (
        <div style={{ padding: `14px ${SP.lg}px`, animation: 'rm-fade-in .35s ease both' }}>
          {cat.items.length > 0 && (
            <div
              className="menu-col-labels"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px', gap: SP.sm, marginBottom: 6, padding: '0 2px' }}
            >
              {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
                <span key={i} style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: `rgba(26,26,26,.35)` }}>
                  {h}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: SP.sm }}>
            {cat.items.map((item, idx) => (
              <div
                key={idx}
                className="menu-item-row"
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
                  gap: SP.sm, alignItems: 'center',
                  padding: `10px 12px`, borderRadius: BR.lg,
                  background: `rgba(255,255,255,.8)`,
                  border: `1px solid rgba(26,26,26,.08)`,
                  boxShadow: `0 2px 8px rgba(0,0,0,.03)`,
                }}
              >
                <input className="rm-inp" placeholder="ex: Somon afumat" value={item.name}        onChange={e => onChangeItem(idx, 'name',        e.target.value)} style={inputStyle} />
                <input className="rm-inp" placeholder="ex: cu cremă de avocado" value={item.description} onChange={e => onChangeItem(idx, 'description', e.target.value)} style={inputStyle} />
                <button
                  className="rm-del-btn"
                  type="button"
                  onClick={() => onRemoveItem(idx)}
                  style={{
                    width: 34, height: 34,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,.9)',
                    border: `1px solid rgba(26,26,26,.1)`,
                    borderRadius: BR.md, cursor: 'pointer',
                    color: `rgba(26,26,26,.4)`, transition: 'all .2s', flexShrink: 0,
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          {cat.items.length === 0 && (
            <div style={{ padding: `${SP.xl}px 0`, textAlign: 'center', border: `1px dashed rgba(26,26,26,.12)`, borderRadius: BR.lg, marginBottom: SP.sm }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <MinimalSquare size={IS.md} color={`rgba(26,26,26,.2)`} />
              </div>
              <p style={{ fontFamily: F.body, fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: `rgba(26,26,26,.3)`, marginBottom: 0 }}>
                Niciun element adăugat
              </p>
            </div>
          )}

          <button
            className="rm-add-btn"
            type="button"
            onClick={onAddItem}
            style={{
              width: '100%', padding: `10px 0`,
              marginTop: cat.items.length > 0 ? SP.sm : 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: SP.sm,
              background: 'transparent',
              border: `1px dashed rgba(26,26,26,.18)`, borderRadius: BR.lg,
              color: `rgba(26,26,26,.45)`,
              fontFamily: F.heading, fontSize: FS.tiny, fontWeight: 600,
              letterSpacing: '.2em', textTransform: 'uppercase' as const,
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
  const [loading,    setLoading]    = useState(false);
  const [isActive,   setIsActive]   = useState<boolean>(initialData?.is_menu_active ?? false);
  const [categories, setCategories] = useState<MenuCategory[]>(() => buildInitialCategories(initialData?.menu_details));

  useEffect(() => {
    const nextActive = initialData?.is_menu_active ?? false;
    const nextCats   = buildInitialCategories(initialData?.menu_details);
    setIsActive(prev => prev === nextActive ? prev : nextActive);
    setCategories(prev =>
      JSON.stringify(prev) === JSON.stringify(nextCats) ? prev : nextCats
    );
  }, [initialData]);

  const autoSaveFn = useCallback(async (data: { isActive: boolean; categories: MenuCategory[] }) => {
    if (!orderId) throw new Error('orderId missing');
    const res = await fetch('/api/dashboard/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, isMenuActive: data.isActive, menu_details: { categories: data.categories } }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${res.status}`);
    }
  }, [orderId]);

  const { status: autoSaveStatus, setStatus: setAutoSaveStatus, cancelPending } =
    useAutoSave({ isActive, categories }, autoSaveFn, 1200);

  const handleSave = async () => {
    cancelPending();
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, isMenuActive: isActive, menu_details: { categories } }),
      });
      if (res.ok) {
        setAutoSaveStatus('saved');
        Swal.fire({
          title: '<span style="color: #1a1a1a; font-family: sans-serif;">Meniu salvat</span>',
          text: 'Detaliile culinare au fost salvate cu succes.',
          icon: 'success',
          confirmButtonColor: '#444444',
          background: '#f8f8f8',
        });
        onSave();
      } else {
        setAutoSaveStatus('unsaved');
        Swal.fire({
          title: '<span style="color: #1a1a1a; font-family: sans-serif;">Eroare la salvare</span>',
          text: 'Nu am putut salva meniul. Te rugăm să încerci din nou.',
          icon: 'error',
          confirmButtonColor: '#444444',
          background: '#f8f8f8',
        });
      }
    } catch {
      setAutoSaveStatus('unsaved');
      Swal.fire({
        title: '<span style="color: #1a1a1a; font-family: sans-serif;">Eroare de conexiune</span>',
        text: 'Conexiunea a eșuat. Încearcă din nou puțin mai târziu.',
        icon: 'error',
        confirmButtonColor: '#444444',
        background: '#f8f8f8',
      });
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Spectral:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        ${KEYFRAMES}
        *, *::before, *::after { box-sizing: border-box; }

        .rm-inp {
          font-size: ${FS.input}px !important;
          -webkit-text-size-adjust: 100%;
          -webkit-appearance: none;
          appearance: none;
        }

        .rm-inp:focus        { border-color: rgba(26,26,26,.4) !important; background: rgba(255,255,255,.95) !important; outline: none; }
        .rm-inp::placeholder { color: rgba(26,26,26,.22) !important; font-style: italic; }

        .rm-del-btn:hover { background: rgba(26,26,26,.07) !important; border-color: rgba(26,26,26,.28) !important; color: ${C.crimson} !important; }
        .rm-add-btn:hover { background: rgba(26,26,26,.04) !important; border-color: rgba(26,26,26,.3) !important; color: ${C.crimson} !important; }
        .rm-save-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 50px rgba(0,0,0,.28) !important; }
        .rm-save-btn:disabled { opacity: .6; cursor: not-allowed; }

        .menu-section-wrap {
          width: 100%;
          max-width: 780px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

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
          .menu-stats-row   { flex-direction: column !important; gap: 6px !important; }
          .menu-master-row  { flex-wrap: wrap !important; }
        }
        @media (max-width: 400px) {
          .menu-section-wrap { padding: 0 !important; }
        }
      `}</style>

      <div className="menu-section-wrap" style={{ animation: 'rm-fade-in .55s ease both', fontFamily: F.body, paddingBottom: '10vh' }}>

        <div style={{ marginBottom: SP.xs, textAlign: 'center' }}>
          <p style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.38em', textTransform: 'uppercase' as const, color: C.textLight, opacity: .7, marginBottom: SP.sm }}>
            Configurare
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: BR.lg }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: SP.sm, marginBottom: SP.xs }}>
                <div style={{ animation: 'rm-heartbeat 2.4s ease-in-out infinite' }}>
                  <MinimalSquare size={18} color={C.crimson} />
                </div>
                <h2 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(22px,5vw,36px)',
                  fontWeight: 400, fontStyle: 'italic', color: C.crimson, margin: 0,
                  lineHeight: 1.1, textShadow: `0 2px 18px rgba(0,0,0,.08)`,
                }}>
                  Meniu Nuntă
                </h2>
              </div>
            </div>

            {isActive && (
              <div className="menu-stats-row" style={{
                display: 'flex', gap: SP.lg, flexShrink: 0, alignItems: 'center',
                padding: `${SP.sm}px ${SP.lg}px`,
                background: `rgba(249,250,251,.9)`,
                border: `1px solid rgba(26,26,26,.1)`,
                borderRadius: 100, backdropFilter: 'blur(8px)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: C.crimson, lineHeight: 1, marginBottom: 1 }}>{activeCount}</p>
                  <p style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.textLight, marginBottom: 0, opacity: .7 }}>Categorii</p>
                </div>
                <MinimalSquare size={10} color={`rgba(26,26,26,.25)`} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: C.crimson, lineHeight: 1, marginBottom: 1 }}>{totalItems}</p>
                  <p style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.textLight, marginBottom: 0, opacity: .7 }}>Feluri</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <MinimalDivider />

        <div style={{
          padding: `18px ${SP.xl}px`, marginBottom: SP.xxl,
          background: isActive ? GR.masterActive : `rgba(249,250,251,.6)`,
          border: `1.5px solid ${isActive ? 'rgba(26,26,26,.18)' : 'rgba(26,26,26,.08)'}`,
          borderRadius: BR.xxl,
          boxShadow: isActive ? SH.cardActive : `0 4px 16px rgba(0,0,0,.03)`,
          backdropFilter: 'blur(10px)',
          position: 'relative', overflow: 'hidden', transition: 'all .3s',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(26,26,26,.18)' : 'rgba(26,26,26,.08)'},transparent)` }} />
          <div className="menu-master-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: BR.lg }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: BR.lg, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: isActive ? `linear-gradient(135deg,rgba(26,26,26,.08) 0%,rgba(243,244,246,.8) 100%)` : 'rgba(26,26,26,.04)',
                border: `1.5px solid ${isActive ? 'rgba(26,26,26,.2)' : 'rgba(26,26,26,.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: SP.xl, transition: 'all .3s',
              }}>🍽️</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: F.heading, fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: C.dark, marginBottom: 3 }}>
                  Afișează meniul pe invitație
                </p>
                <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: isActive ? C.textLight : `rgba(26,26,26,.3)`, lineHeight: 1.4, marginBottom: 0 }}>
                  {isActive ? 'Invitații vor vedea meniul complet —' : 'Activează pentru a configura și afișa'}
                </p>
              </div>
            </div>
            <MinimalToggle checked={isActive} onChange={setIsActive} />
          </div>
        </div>

        {isActive && (
          <div style={{ animation: 'rm-fade-in .4s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap' as const, gap: SP.sm }}>
              <p style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.28em', textTransform: 'uppercase' as const, color: C.textLight, opacity: .65, marginBottom: 0 }}>
                Categorii Meniu
              </p>
              <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: `rgba(26,26,26,.38)`, marginBottom: 0 }}>
                Activează categoriile dorite &amp; adaugă felurile
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: SP.sm, marginBottom: SP.xxl }}>
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
              display: 'flex', alignItems: 'flex-start', gap: SP.sm,
              padding: `13px 18px`, borderRadius: BR.xl,
              background: `rgba(249,250,251,.8)`, border: `1px solid rgba(26,26,26,.08)`,
              backdropFilter: 'blur(6px)', marginBottom: SP.xl,
            }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <MinimalSquare size={IS.md - 1} color={`rgba(26,26,26,.3)`} />
              </div>
              <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: C.textLight, lineHeight: 1.75, marginBottom: 0 }}>
                Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
              </p>
            </div>
          </div>
        )}

        <MinimalDivider />

        {autoSaveStatus !== 'idle' && !loading && (
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={{
              fontFamily: F.heading,
              fontSize: FS.tiny,
              letterSpacing: '.14em',
              color: autoSaveStatus === 'saving'  ? 'rgba(166,50,72,.45)'
                   : autoSaveStatus === 'saved'   ? 'rgba(80,140,80,.75)'
                   : 'rgba(166,50,72,.4)',
            }}>
              {autoSaveStatus === 'saving'  && '◌  Salvare automată...'}
              {autoSaveStatus === 'saved'   && '✓  Salvat automat'}
              {autoSaveStatus === 'unsaved' && '●  Modificări nesalvate'}
            </span>
          </div>
        )}

        <button
          className="rm-save-btn"
          type="button"
          onClick={handleSave}
          disabled={loading}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 100,
            background: GR.roseBtn,
            color: C.white, fontFamily: F.heading,
            fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 600,
            letterSpacing: '.22em', textTransform: 'uppercase' as const,
            border: 'none', cursor: 'pointer',
            boxShadow: SH.btnSave,
            transition: 'transform .22s, box-shadow .22s',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: SP.sm }}>
            {loading
              ? <><IconSpin /> Salvare în curs...</>
              : <><MinimalSquare size={IS.md - 1} color={C.white} /> Salvează Meniul <MinimalSquare size={IS.md - 1} color={C.white} /></>
            }
          </span>
          {!loading && (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)', backgroundSize: '350px 100%', animation: 'rm-shimmer 3s linear infinite' }} />
          )}
        </button>

        <p style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: `rgba(26,26,26,.18)`, textAlign: 'center', marginTop: SP.lg }}>
          VibeInvite · Meniu Nuntă · Tema Minimal
        </p>
      </div>
    </>
  );
};