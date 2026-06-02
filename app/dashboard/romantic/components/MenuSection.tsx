// "use client";
// import React, { useState, useEffect } from 'react';

// /* ══════════════════════════════════════════════════════════════
//    PALETTE — identică cu RomanticDemo
// ══════════════════════════════════════════════════════════════ */
// const P = {
//   crimson:  '#7B1A2E',
//   rose:     '#A63248',
//   blush:    '#E8A0A8',
//   blush2:   '#F2C8CE',
//   blush3:   '#FAF0F2',
//   peony:    '#C4506A',
//   petal:    '#F7DDE2',
//   cream:    '#FDF5F6',
//   cream2:   '#F5E8EA',
//   gold:     '#C8A87A',
//   gold2:    '#E8CEAA',
//   dark:     '#2A0A12',
//   text:     '#3D1520',
//   textlt:   '#8A4A58',
//   white:    '#FFFBFB',
// };

// /* ══════════════════════════════════════════════════════════════
//    TYPES — identice cu versiunea originală (LUX)
// ══════════════════════════════════════════════════════════════ */
// interface MenuItem        { name: string; description: string; }
// interface MenuCategory    { id: string; label: string; emoji: string; active: boolean; items: MenuItem[]; }
// interface MenuSectionProps { initialData: any; orderId: any; onSave: () => void; }
// interface CategoryCardProps {
//   cat: MenuCategory;
//   onToggle: () => void;
//   onAddItem: () => void;
//   onRemoveItem: (i: number) => void;
//   onChangeItem: (i: number, field: 'name' | 'description', val: string) => void;
// }

// /* ══════════════════════════════════════════════════════════════
//    DATA — identic cu versiunea originală
// ══════════════════════════════════════════════════════════════ */
// const DEFAULT_CATEGORIES: MenuCategory[] = [
//   { id: 'aperitive',    label: 'Aperitive & Gustări',   emoji: '🍽️', active: false, items: [] },
//   { id: 'principal',    label: 'Fel Principal',           emoji: '🥩', active: false, items: [] },
//   { id: 'desert',       label: 'Tort & Desert',           emoji: '🎂', active: false, items: [] },
//   { id: 'alcoolice',    label: 'Băuturi Alcoolice',       emoji: '🍾', active: false, items: [] },
//   { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice',   emoji: '💧', active: false, items: [] },
//   { id: 'candybar',     label: 'Candy Bar',               emoji: '🍬', active: false, items: [] },
//   { id: 'cafea',        label: 'Cafea & Digestive',       emoji: '☕', active: false, items: [] },
//   { id: 'altele',       label: 'Altele',                  emoji: '✨', active: false, items: [] },
// ];

// function buildInitialCategories(saved: any): MenuCategory[] {
//   if (!saved?.categories?.length) return DEFAULT_CATEGORIES;
//   return DEFAULT_CATEGORIES.map(def => {
//     const found = saved.categories.find((c: any) => c.id === def.id);
//     return found ? { ...def, active: found.active ?? false, items: found.items ?? [] } : def;
//   });
// }

// /* ══════════════════════════════════════════════════════════════
//    INPUT STYLE — romantic skin
// ══════════════════════════════════════════════════════════════ */
// const inputStyle: React.CSSProperties = {
//   width: '100%',
//   padding: '9px 13px',
//   background: `rgba(253,245,246,.8)`,
//   border: `1px solid rgba(196,80,106,.22)`,
//   borderRadius: 10,
//   fontFamily: "'Cormorant Garamond', serif",
//   fontSize: 15,
//   color: P.dark,
//   outline: 'none',
//   transition: 'all .2s',
//   minWidth: 0,
//   boxSizing: 'border-box',
//   WebkitAppearance: 'none',
// };

// /* ══════════════════════════════════════════════════════════════
//    ICONS — rose-tinted, aceleași forme
// ══════════════════════════════════════════════════════════════ */
// const IconPlus = () => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//     <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
//     <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//   </svg>
// );

// const IconTrash = () => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13, flexShrink: 0 }}>
//     <path d="M4 6h12M8 6V4h4v2M7 6l1 10h4l1-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const IconChevron = ({ open }: { open: boolean }) => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, transition: 'transform .3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
//     <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const IconSpin = () => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, animation: 'rm-spin 1s linear infinite' }}>
//     <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
//     <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// );

// const HeartSVG = ({ size = 14, color = P.crimson }: { size?: number; color?: string }) => (
//   <svg viewBox="0 0 24 22" fill={color} style={{ width: size, height: size * 22 / 24, flexShrink: 0 }}>
//     <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z" />
//   </svg>
// );

// /* ══════════════════════════════════════════════════════════════
//    ROMANTIC ORNAMENTS
// ══════════════════════════════════════════════════════════════ */

// /** Divider romantic — roses, identic cu cel din RomanticDemo */
// const RoseDivider = () => (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 0, margin: '20px 0' }}>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${P.blush})` }} />
//     <svg viewBox="0 0 80 30" width="80" height="30" fill="none">
//       <path d="M5 15 L22 15"  stroke={P.blush} strokeWidth=".8" strokeOpacity=".7" />
//       <path d="M58 15 L75 15" stroke={P.blush} strokeWidth=".8" strokeOpacity=".7" />
//       <g transform="translate(40 15)">
//         {[0,72,144,216,288].map(r => (
//           <ellipse key={r} cx="0" cy="-7" rx="5" ry="8" fill={P.peony} fillOpacity=".65" transform={`rotate(${r})`} />
//         ))}
//         <circle cx="0" cy="0" r="3.5" fill={P.crimson} fillOpacity=".75" />
//         <circle cx="0" cy="0" r="1.5" fill={P.gold}    fillOpacity=".7"  />
//       </g>
//       <circle cx="22" cy="15" r="1.5" fill={P.blush} fillOpacity=".8" />
//       <circle cx="58" cy="15" r="1.5" fill={P.blush} fillOpacity=".8" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${P.blush},transparent)` }} />
//   </div>
// );

// /* ══════════════════════════════════════════════════════════════
//    ROMANTIC TOGGLE — logică identică, skin romantic
// ══════════════════════════════════════════════════════════════ */
// const RomanticToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
//   <label
//     style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}
//     onClick={e => e.stopPropagation()}
//   >
//     <input
//       type="checkbox"
//       checked={checked}
//       onChange={e => onChange(e.target.checked)}
//       style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
//     />
//     <div style={{
//       width: 46, height: 25, borderRadius: 100, position: 'relative', flexShrink: 0,
//       background: checked
//         ? `linear-gradient(135deg,${P.crimson},${P.rose})`
//         : 'rgba(196,80,106,.1)',
//       border: `1px solid ${checked ? 'rgba(196,80,106,.5)' : 'rgba(196,80,106,.18)'}`,
//       boxShadow: checked ? `0 0 14px rgba(123,26,46,.28)` : 'none',
//       transition: 'all .3s ease',
//     }}>
//       <div style={{
//         position: 'absolute', top: 2, left: 2, width: 19, height: 19, borderRadius: '50%',
//         background: checked ? P.white : `rgba(196,80,106,.35)`,
//         boxShadow: '0 2px 6px rgba(45,10,18,.3)',
//         transform: checked ? 'translateX(21px)' : 'translateX(0)',
//         transition: 'transform .3s ease, background .3s ease',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//       }}>
//         {checked && <HeartSVG size={9} color={P.crimson} />}
//       </div>
//     </div>
//     <span style={{
//       fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.16em',
//       textTransform: 'uppercase',
//       color: checked ? P.crimson : `rgba(138,74,88,.4)`,
//       transition: 'color .3s', whiteSpace: 'nowrap',
//     }}>
//       {checked ? 'Activ' : 'Inactiv'}
//     </span>
//   </label>
// );

// /* ══════════════════════════════════════════════════════════════
//    CATEGORY CARD — logică identică cu LUX, skin romantic
// ══════════════════════════════════════════════════════════════ */
// function CategoryCard({ cat, onToggle, onAddItem, onRemoveItem, onChangeItem }: CategoryCardProps) {
//   const [expanded, setExpanded] = useState(cat.active);

//   useEffect(() => {
//     if (cat.active) setExpanded(true);
//   }, [cat.active]);

//   const handleHeaderClick = () => {
//     if (cat.active) setExpanded(prev => !prev);
//   };

//   return (
//     <div style={{
//       borderRadius: 18,
//       overflow: 'hidden',
//       border: `1.5px solid ${cat.active ? 'rgba(196,80,106,.28)' : 'rgba(196,80,106,.1)'}`,
//       background: cat.active
//         ? `linear-gradient(160deg,rgba(253,245,246,.9) 0%,rgba(247,221,226,.55) 100%)`
//         : `rgba(253,245,246,.5)`,
//       boxShadow: cat.active
//         ? `0 8px 32px rgba(123,26,46,.09),inset 0 1px 0 rgba(255,255,255,.8)`
//         : `0 2px 10px rgba(123,26,46,.04)`,
//       backdropFilter: 'blur(8px)',
//       transition: 'all .3s ease',
//     }}>

//       {/* ── HEADER ── */}
//       <div
//         onClick={handleHeaderClick}
//         style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           padding: '14px 16px',
//           cursor: cat.active ? 'pointer' : 'default',
//           borderBottom: cat.active && expanded
//             ? `1px solid rgba(196,80,106,.14)`
//             : '1px solid transparent',
//           transition: 'border-color .3s',
//           gap: 10, minWidth: 0,
//           position: 'relative',
//         }}
//       >
//         {/* Top accent rule (visible when active) */}
//         {cat.active && (
//           <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,rgba(196,80,106,.3),transparent)` }} />
//         )}

//         <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
//           {/* Emoji icon box */}
//           <div style={{
//             width: 40, height: 40, borderRadius: 12, flexShrink: 0,
//             background: cat.active
//               ? `linear-gradient(135deg,rgba(196,80,106,.14) 0%,rgba(247,221,226,.6) 100%)`
//               : 'rgba(196,80,106,.06)',
//             border: `1px solid ${cat.active ? 'rgba(196,80,106,.28)' : 'rgba(196,80,106,.12)'}`,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 16, transition: 'all .3s',
//           }}>
//             {cat.emoji}
//           </div>

//           <div style={{ minWidth: 0, flex: 1 }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif",
//               fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 600,
//               letterSpacing: '.08em',
//               color: cat.active ? P.dark : `rgba(138,74,88,.35)`,
//               marginBottom: 2, transition: 'color .3s',
//               whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//             }}>
//               {cat.label}
//             </p>
//             {cat.active && cat.items.length > 0 && (
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontStyle: 'italic', color: P.textlt, marginBottom: 0 }}>
//                 {cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}
//               </p>
//             )}
//             {!cat.active && (
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontStyle: 'italic', color: `rgba(196,80,106,.3)`, marginBottom: 0 }}>
//                 Activează pentru a configura
//               </p>
//             )}
//           </div>
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//           <RomanticToggle checked={cat.active} onChange={onToggle} />
//           {cat.active && (
//             <span style={{ color: `rgba(196,80,106,.55)`, transition: 'color .2s' }}>
//               <IconChevron open={expanded} />
//             </span>
//           )}
//         </div>
//       </div>

//       {/* ── BODY ── */}
//       {cat.active && expanded && (
//         <div style={{ padding: '14px 16px', animation: 'rm-fade-in .35s ease both' }}>

//           {cat.items.length > 0 && (
//             <div
//               className="menu-col-labels"
//               style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px', gap: 8, marginBottom: 6, padding: '0 2px' }}
//             >
//               {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
//                 <span key={i} style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase', color: `rgba(138,74,88,.5)` }}>
//                   {h}
//                 </span>
//               ))}
//             </div>
//           )}

//           <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//             {cat.items.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="menu-item-row"
//                 style={{
//                   display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
//                   gap: 8, alignItems: 'center',
//                   padding: '10px 12px', borderRadius: 12,
//                   background: `rgba(255,251,251,.75)`,
//                   border: `1px solid rgba(196,80,106,.14)`,
//                   boxShadow: `0 2px 8px rgba(123,26,46,.04)`,
//                 }}
//               >
//                 <input
//                   className="rm-inp"
//                   placeholder="ex: Somon afumat"
//                   value={item.name}
//                   onChange={e => onChangeItem(idx, 'name', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <input
//                   className="rm-inp"
//                   placeholder="ex: cu cremă de avocado"
//                   value={item.description}
//                   onChange={e => onChangeItem(idx, 'description', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <button
//                   className="rm-del-btn"
//                   type="button"
//                   onClick={() => onRemoveItem(idx)}
//                   style={{
//                     width: 34, height: 34,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     background: 'rgba(255,251,251,.8)',
//                     border: `1px solid rgba(196,80,106,.18)`,
//                     borderRadius: 10, cursor: 'pointer',
//                     color: `rgba(196,80,106,.5)`,
//                     transition: 'all .2s', flexShrink: 0,
//                   }}
//                 >
//                   <IconTrash />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {cat.items.length === 0 && (
//             <div style={{ padding: '20px 0', textAlign: 'center', border: `1px dashed rgba(196,80,106,.2)`, borderRadius: 12, marginBottom: 10 }}>
//               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
//                 <HeartSVG size={14} color={`rgba(196,80,106,.3)`} />
//               </div>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: `rgba(138,74,88,.4)`, marginBottom: 0 }}>
//                 Niciun element adăugat
//               </p>
//             </div>
//           )}

//           <button
//             className="rm-add-btn"
//             type="button"
//             onClick={onAddItem}
//             style={{
//               width: '100%', padding: '10px 0',
//               marginTop: cat.items.length > 0 ? 10 : 0,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//               background: 'transparent',
//               border: `1px dashed rgba(196,80,106,.3)`, borderRadius: 12,
//               color: `rgba(196,80,106,.6)`,
//               fontFamily: "'Cinzel', serif", fontSize: 8,
//               fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase',
//               cursor: 'pointer', transition: 'all .2s',
//             }}
//           >
//             <IconPlus /> Adaugă element
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════
//    MAIN EXPORT — logică 100% identică cu LUX, skin romantic
// ══════════════════════════════════════════════════════════════ */
// export const MenuSection = ({ initialData, orderId, onSave }: MenuSectionProps) => {
//   const [loading, setLoading]       = useState(false);
//   const [isActive, setIsActive]     = useState<boolean>(initialData?.is_menu_active ?? false);
//   const [categories, setCategories] = useState<MenuCategory[]>(() =>
//     buildInitialCategories(initialData?.menu_details)
//   );

//   useEffect(() => {
//     setIsActive(initialData?.is_menu_active ?? false);
//     setCategories(buildInitialCategories(initialData?.menu_details));
//   }, [initialData]);

//   /* ── handleSave — identic cu LUX ── */
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('/api/dashboard/personalize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           orderId,
//           isMenuActive: isActive,
//           menu_details: { categories },
//         }),
//       });
//       if (res.ok) {
//         alert('Meniu salvat! 🍴');
//         onSave();
//       } else {
//         alert('Eroare la salvare.');
//       }
//     } catch {
//       alert('Eroare la salvare.');
//     }
//     setLoading(false);
//   };

//   /* ── updateCat — identic cu LUX ── */
//   const updateCat = (id: string, updater: (c: MenuCategory) => MenuCategory) =>
//     setCategories(prev => prev.map(c => c.id === id ? updater(c) : c));

//   const activeCount = categories.filter(c => c.active).length;
//   const totalItems  = categories.reduce((a, c) => a + c.items.length, 0);

//   /* ══ RENDER ══ */
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; }

//         @keyframes rm-spin    { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
//         @keyframes rm-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
//         @keyframes rm-shimmer { 0% { background-position: -350px 0 } 100% { background-position: 350px 0 } }
//         @keyframes rm-heartbeat { 0%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.1)} 70%{transform:scale(1)} 100%{transform:scale(1)} }
//         @keyframes rm-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

//         /* iOS: prevent zoom on focus */
//         .rm-inp {
//           font-size: 16px !important;
//           -webkit-text-size-adjust: 100%;
//           -webkit-appearance: none;
//           appearance: none;
//         }

//         .menu-section-wrap {
//           overscroll-behavior: contain;
//           -webkit-overflow-scrolling: auto;
//           width: 100%;
//           max-width: 780px;
//           box-sizing: border-box;
//           overflow-x: hidden;
//         }

//         /* Input focus */
//         .rm-inp:focus        { border-color: rgba(196,80,106,.55) !important; background: rgba(255,240,242,.85) !important; outline: none; }
//         .rm-inp::placeholder { color: rgba(138,74,88,.35) !important; font-style: italic; }

//         /* Hover states */
//         .rm-del-btn:hover   { background: rgba(196,80,106,.12) !important; border-color: rgba(196,80,106,.4) !important; color: ${P.crimson} !important; }
//         .rm-add-btn:hover   { background: rgba(247,221,226,.45) !important; border-color: rgba(196,80,106,.5) !important; color: ${P.crimson} !important; }
//         .rm-save-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 50px rgba(123,26,46,.48) !important; }
//         .rm-save-btn:disabled { opacity: .6; cursor: not-allowed; }

//         /* Responsive */
//         @media (max-width: 600px) {
//           .menu-col-labels { display: none !important; }
//           .menu-item-row {
//             grid-template-columns: 1fr 36px !important;
//             grid-template-rows: auto auto;
//             gap: 6px !important;
//           }
//           .menu-item-row input:first-child  { grid-column: 1; grid-row: 1; }
//           .menu-item-row input:nth-child(2) { grid-column: 1; grid-row: 2; }
//           .menu-item-row button             { grid-column: 2; grid-row: 1 / 3; align-self: center; }
//           .menu-stats-row   { flex-direction: column !important; gap: 6px !important; }
//           .menu-master-row  { flex-wrap: wrap !important; }
//         }
//         @media (max-width: 400px) {
//           .menu-section-wrap { padding: 0 !important; }
//         }
//       `}</style>

//       <div className="menu-section-wrap" style={{ animation: 'rm-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif", position: 'relative' }}>

//         {/* ── HEADER ── */}
//         <div style={{ marginBottom: 4, textAlign: 'center' }}>
//           {/* Eyebrow */}
//           <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.38em', textTransform: 'uppercase', color: P.textlt, opacity: .7, marginBottom: 10 }}>
//             Configurare
//           </p>

//           {/* Title */}
//           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
//             <div style={{ flex: 1 }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 10, marginBottom: 4 }}>
//                 <div style={{ animation: 'rm-heartbeat 2.4s ease-in-out infinite' }}>
//                   <HeartSVG size={18} color={P.crimson} />
//                 </div>
//                 <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,5vw,36px)', fontWeight: 400, fontStyle: 'italic', color: P.crimson, margin: 0, lineHeight: 1.1, textShadow: `0 2px 18px rgba(123,26,46,.15)` }}>
//                   Meniu Nuntă
//                 </h2>
//               </div>
//             </div>

//             {/* Stats */}
//             {isActive && (
//               <div className="menu-stats-row" style={{ display: 'flex', gap: 16, flexShrink: 0, alignItems: 'center', padding: '8px 16px', background: `rgba(253,245,246,.75)`, border: `1px solid rgba(196,80,106,.18)`, borderRadius: 100, backdropFilter: 'blur(8px)' }}>
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: P.crimson, lineHeight: 1, marginBottom: 1 }}>
//                     {activeCount}
//                   </p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: P.textlt, marginBottom: 0, opacity: .7 }}>
//                     Categorii
//                   </p>
//                 </div>
//                 <HeartSVG size={10} color={`rgba(196,80,106,.35)`} />
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: P.crimson, lineHeight: 1, marginBottom: 1 }}>
//                     {totalItems}
//                   </p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: P.textlt, marginBottom: 0, opacity: .7 }}>
//                     Feluri
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <RoseDivider />

//         {/* ── MASTER TOGGLE ── */}
//         <div style={{
//           padding: '18px 20px', marginBottom: 24,
//           background: isActive
//             ? `linear-gradient(160deg,rgba(253,245,246,.88) 0%,rgba(247,221,226,.6) 100%)`
//             : `rgba(253,245,246,.55)`,
//           border: `1.5px solid ${isActive ? 'rgba(196,80,106,.28)' : 'rgba(196,80,106,.12)'}`,
//           borderRadius: 20,
//           boxShadow: isActive
//             ? `0 8px 32px rgba(123,26,46,.1),inset 0 1px 0 rgba(255,255,255,.8)`
//             : `0 4px 16px rgba(123,26,46,.04)`,
//           backdropFilter: 'blur(10px)',
//           position: 'relative', overflow: 'hidden', transition: 'all .3s',
//         }}>
//           {/* top shimmer line */}
//           <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(196,80,106,.45)' : 'rgba(196,80,106,.2)'},transparent)` }} />

//           <div className="menu-master-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
//               <div style={{
//                 width: 44, height: 44, borderRadius: 14, flexShrink: 0,
//                 background: isActive
//                   ? `linear-gradient(135deg,rgba(196,80,106,.16) 0%,rgba(247,221,226,.7) 100%)`
//                   : 'rgba(196,80,106,.07)',
//                 border: `1.5px solid ${isActive ? 'rgba(196,80,106,.3)' : 'rgba(196,80,106,.14)'}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 20, transition: 'all .3s',
//               }}>
//                 🍽️
//               </div>
//               <div style={{ minWidth: 0 }}>
//                 <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: P.dark, marginBottom: 3 }}>
//                   Afișează meniul pe invitație
//                 </p>
//                 <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: isActive ? P.textlt : `rgba(138,74,88,.4)`, lineHeight: 1.4, marginBottom: 0 }}>
//                   {isActive ? 'Invitații vor vedea meniul complet ♥' : 'Activează pentru a configura și afișa'}
//                 </p>
//               </div>
//             </div>
//             <RomanticToggle checked={isActive} onChange={setIsActive} />
//           </div>
//         </div>

//         {/* ── CATEGORIES ── */}
//         {isActive && (
//           <div style={{ animation: 'rm-fade-in .4s ease both' }}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
//               <p style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: P.textlt, opacity: .65, marginBottom: 0 }}>
//                 Categorii Meniu
//               </p>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: `rgba(138,74,88,.5)`, marginBottom: 0 }}>
//                 Activează categoriile dorite &amp; adaugă felurile
//               </p>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
//               {categories.map(cat => (
//                 <CategoryCard
//                   key={cat.id}
//                   cat={cat}
//                   onToggle={() => updateCat(cat.id, c => ({ ...c, active: !c.active }))}
//                   onAddItem={() => updateCat(cat.id, c => ({ ...c, items: [...c.items, { name: '', description: '' }] }))}
//                   onRemoveItem={i => updateCat(cat.id, c => ({ ...c, items: c.items.filter((_, idx) => idx !== i) }))}
//                   onChangeItem={(i, field, val) => updateCat(cat.id, c => {
//                     const items = [...c.items];
//                     items[i] = { ...items[i], [field]: val };
//                     return { ...c, items };
//                   })}
//                 />
//               ))}
//             </div>

//             {/* Info note */}
//             <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '13px 18px', borderRadius: 14, background: `rgba(253,245,246,.7)`, border: `1px solid rgba(196,80,106,.15)`, backdropFilter: 'blur(6px)', marginBottom: 20 }}>
//               <div style={{ flexShrink: 0, marginTop: 1 }}>
//                 <HeartSVG size={13} color={`rgba(196,80,106,.45)`} />
//               </div>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: P.textlt, lineHeight: 1.75, marginBottom: 0 }}>
//                 Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
//               </p>
//             </div>
//           </div>
//         )}

//         <RoseDivider />

//         {/* ── SAVE BUTTON ── */}
//         <button
//           className="rm-save-btn"
//           type="button"
//           onClick={handleSave}
//           disabled={loading}
//           style={{
//             width: '100%', padding: '16px 0', borderRadius: 100,
//             background: `linear-gradient(135deg,${P.crimson} 0%,${P.rose} 50%,${P.peony} 100%)`,
//             color: P.white,
//             fontFamily: "'Cinzel', serif",
//             fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 600,
//             letterSpacing: '.22em', textTransform: 'uppercase',
//             border: 'none', cursor: 'pointer',
//             boxShadow: `0 10px 36px rgba(123,26,46,.35)`,
//             transition: 'transform .22s, box-shadow .22s',
//             position: 'relative', overflow: 'hidden',
//           }}
//         >
//           <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
//             {loading
//               ? <><IconSpin /> Salvare în curs...</>
//               : <><HeartSVG size={13} color={P.white} /> Salvează Meniul <HeartSVG size={13} color={P.white} /></>
//             }
//           </span>
//           {/* Shimmer */}
//           {!loading && (
//             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)', backgroundSize: '350px 100%', animation: 'rm-shimmer 3s linear infinite' }} />
//           )}
//         </button>

//         <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em', textTransform: 'uppercase', color: `rgba(138,74,88,.25)`, textAlign: 'center', marginTop: 16 }}>
//           VibeInvite · Meniu Nuntă · Tema Romantic
//         </p>

//       </div>
//     </>
//   );
// };









"use client";
import React, { useState, useEffect } from 'react';
import { C, F, FS, SP, BR, IS, SH, GR, KEYFRAMES } from '../romanticTokens';

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════════════
   INPUT STYLE
══════════════════════════════════════════════════════════════ */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: `9px 13px`,
  background: `rgba(253,245,246,.8)`,
  border: `1px solid rgba(196,80,106,.22)`,
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

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
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

const HeartSVG = ({ size = IS.md, color = C.crimson }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 22" fill={color} style={{ width: size, height: size * 22 / 24, flexShrink: 0 }}>
    <path d="M12 21C12 21 1 13.5 1 7.5C1 4.5 3.5 2 6.5 2C8.5 2 10.5 3 12 5C13.5 3 15.5 2 17.5 2C20.5 2 23 4.5 23 7.5C23 13.5 12 21 12 21Z" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   ROSE DIVIDER
══════════════════════════════════════════════════════════════ */
const RoseDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 0, margin: `${SP.xl}px 0` }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${C.blush})` }} />
    <svg viewBox="0 0 80 30" width="80" height="30" fill="none">
      <path d="M5 15 L22 15"  stroke={C.blush} strokeWidth=".8" strokeOpacity=".7" />
      <path d="M58 15 L75 15" stroke={C.blush} strokeWidth=".8" strokeOpacity=".7" />
      <g transform="translate(40 15)">
        {[0,72,144,216,288].map(r => (
          <ellipse key={r} cx="0" cy="-7" rx="5" ry="8" fill={C.peony} fillOpacity=".65" transform={`rotate(${r})`} />
        ))}
        <circle cx="0" cy="0" r="3.5" fill={C.crimson} fillOpacity=".75" />
        <circle cx="0" cy="0" r="1.5" fill={C.gold}    fillOpacity=".7" />
      </g>
      <circle cx="22" cy="15" r="1.5" fill={C.blush} fillOpacity=".8" />
      <circle cx="58" cy="15" r="1.5" fill={C.blush} fillOpacity=".8" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${C.blush},transparent)` }} />
  </div>
);

/* ══════════════════════════════════════════════════════════════
   ROMANTIC TOGGLE
══════════════════════════════════════════════════════════════ */
const RomanticToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
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
      background: checked ? GR.roseBtn : 'rgba(196,80,106,.1)',
      border: `1px solid ${checked ? 'rgba(196,80,106,.5)' : 'rgba(196,80,106,.18)'}`,
      boxShadow: checked ? SH.toggleGlow : 'none',
      transition: 'all .3s ease',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: 2, width: 19, height: 19, borderRadius: '50%',
        background: checked ? C.white : `rgba(196,80,106,.35)`,
        boxShadow: '0 2px 6px rgba(45,10,18,.3)',
        transform: checked ? 'translateX(21px)' : 'translateX(0)',
        transition: 'transform .3s ease, background .3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <HeartSVG size={9} color={C.crimson} />}
      </div>
    </div>
    <span style={{
      fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.16em', textTransform: 'uppercase' as const,
      color: checked ? C.crimson : `rgba(138,74,88,.4)`,
      transition: 'color .3s', whiteSpace: 'nowrap' as const,
    }}>
      {checked ? 'Activ' : 'Inactiv'}
    </span>
  </label>
);

/* ══════════════════════════════════════════════════════════════
   CATEGORY CARD
══════════════════════════════════════════════════════════════ */
function CategoryCard({ cat, onToggle, onAddItem, onRemoveItem, onChangeItem }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(cat.active);

  useEffect(() => {
    if (cat.active) setExpanded(true);
  }, [cat.active]);

  return (
    <div style={{
      borderRadius: BR.xxl,
      overflow: 'hidden',
      border: `1.5px solid ${cat.active ? 'rgba(196,80,106,.28)' : 'rgba(196,80,106,.1)'}`,
      background: cat.active ? GR.cardActive : GR.cardInactive,
      boxShadow: cat.active ? SH.cardActive : `0 2px 10px rgba(123,26,46,.04)`,
      backdropFilter: 'blur(8px)',
      transition: 'all .3s ease',
    }}>

      {/* HEADER */}
      <div
        onClick={() => cat.active && setExpanded(prev => !prev)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `14px ${SP.lg}px`,
          cursor: cat.active ? 'pointer' : 'default',
          borderBottom: cat.active && expanded ? `1px solid rgba(196,80,106,.14)` : '1px solid transparent',
          transition: 'border-color .3s',
          gap: SP.sm, minWidth: 0,
          position: 'relative',
        }}
      >
        {cat.active && (
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,rgba(196,80,106,.3),transparent)` }} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: BR.lg, flexShrink: 0,
            background: cat.active ? `linear-gradient(135deg,rgba(196,80,106,.14) 0%,rgba(247,221,226,.6) 100%)` : 'rgba(196,80,106,.06)',
            border: `1px solid ${cat.active ? 'rgba(196,80,106,.28)' : 'rgba(196,80,106,.12)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: SP.lg, transition: 'all .3s',
          }}>
            {cat.emoji}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontFamily: F.heading, fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 600,
              letterSpacing: '.08em', color: cat.active ? C.dark : `rgba(138,74,88,.35)`,
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
              <p style={{ fontFamily: F.body, fontSize: FS.base, fontStyle: 'italic', color: `rgba(196,80,106,.3)`, marginBottom: 0 }}>
                Activează pentru a configura
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flexShrink: 0 }}>
          <RomanticToggle checked={cat.active} onChange={onToggle} />
          {cat.active && (
            <span style={{ color: `rgba(196,80,106,.55)`, transition: 'color .2s' }}>
              <IconChevron open={expanded} />
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      {cat.active && expanded && (
        <div style={{ padding: `14px ${SP.lg}px`, animation: 'rm-fade-in .35s ease both' }}>
          {cat.items.length > 0 && (
            <div
              className="menu-col-labels"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px', gap: SP.sm, marginBottom: 6, padding: '0 2px' }}
            >
              {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
                <span key={i} style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: `rgba(138,74,88,.5)` }}>
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
                  background: `rgba(255,251,251,.75)`,
                  border: `1px solid rgba(196,80,106,.14)`,
                  boxShadow: `0 2px 8px rgba(123,26,46,.04)`,
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
                    background: 'rgba(255,251,251,.8)',
                    border: `1px solid rgba(196,80,106,.18)`,
                    borderRadius: BR.md, cursor: 'pointer',
                    color: `rgba(196,80,106,.5)`, transition: 'all .2s', flexShrink: 0,
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          {cat.items.length === 0 && (
            <div style={{ padding: `${SP.xl}px 0`, textAlign: 'center', border: `1px dashed rgba(196,80,106,.2)`, borderRadius: BR.lg, marginBottom: SP.sm }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <HeartSVG size={IS.md} color={`rgba(196,80,106,.3)`} />
              </div>
              <p style={{ fontFamily: F.body, fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: `rgba(138,74,88,.4)`, marginBottom: 0 }}>
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
              border: `1px dashed rgba(196,80,106,.3)`, borderRadius: BR.lg,
              color: `rgba(196,80,106,.6)`,
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

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export const MenuSection = ({ initialData, orderId, onSave }: MenuSectionProps) => {
  const [loading,    setLoading]    = useState(false);
  const [isActive,   setIsActive]   = useState<boolean>(initialData?.is_menu_active ?? false);
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
      else alert('Eroare la salvare.');
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,300;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        ${KEYFRAMES}
        *, *::before, *::after { box-sizing: border-box; }

        .rm-inp {
          font-size: ${FS.input}px !important;
          -webkit-text-size-adjust: 100%;
          -webkit-appearance: none;
          appearance: none;
        }

        .rm-inp:focus        { border-color: rgba(196,80,106,.55) !important; background: rgba(255,240,242,.85) !important; outline: none; }
        .rm-inp::placeholder { color: rgba(138,74,88,.35) !important; font-style: italic; }

        .rm-del-btn:hover { background: rgba(196,80,106,.12) !important; border-color: rgba(196,80,106,.4) !important; color: ${C.crimson} !important; }
        .rm-add-btn:hover { background: rgba(247,221,226,.45) !important; border-color: rgba(196,80,106,.5) !important; color: ${C.crimson} !important; }
        .rm-save-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 50px rgba(123,26,46,.48) !important; }
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

      <div className="menu-section-wrap" style={{ animation: 'rm-fade-in .55s ease both', fontFamily: F.body, paddingBottom: '30vh' }}>

        {/* HEADER */}
        <div style={{ marginBottom: SP.xs, textAlign: 'center' }}>
          <p style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.38em', textTransform: 'uppercase' as const, color: C.textLight, opacity: .7, marginBottom: SP.sm }}>
            Configurare
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: BR.lg }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: SP.sm, marginBottom: SP.xs }}>
                <div style={{ animation: 'rm-heartbeat 2.4s ease-in-out infinite' }}>
                  <HeartSVG size={18} color={C.crimson} />
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,5vw,36px)',
                  fontWeight: 400, fontStyle: 'italic', color: C.crimson, margin: 0,
                  lineHeight: 1.1, textShadow: `0 2px 18px rgba(123,26,46,.15)`,
                }}>
                  Meniu Nuntă
                </h2>
              </div>
            </div>

            {isActive && (
              <div className="menu-stats-row" style={{
                display: 'flex', gap: SP.lg, flexShrink: 0, alignItems: 'center',
                padding: `${SP.sm}px ${SP.lg}px`,
                background: `rgba(253,245,246,.75)`,
                border: `1px solid rgba(196,80,106,.18)`,
                borderRadius: 100, backdropFilter: 'blur(8px)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: C.crimson, lineHeight: 1, marginBottom: 1 }}>{activeCount}</p>
                  <p style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.textLight, marginBottom: 0, opacity: .7 }}>Categorii</p>
                </div>
                <HeartSVG size={10} color={`rgba(196,80,106,.35)`} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: C.crimson, lineHeight: 1, marginBottom: 1 }}>{totalItems}</p>
                  <p style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.textLight, marginBottom: 0, opacity: .7 }}>Feluri</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <RoseDivider />

        {/* MASTER TOGGLE */}
        <div style={{
          padding: `18px ${SP.xl}px`, marginBottom: SP.xxl,
          background: isActive ? GR.masterActive : `rgba(253,245,246,.55)`,
          border: `1.5px solid ${isActive ? 'rgba(196,80,106,.28)' : 'rgba(196,80,106,.12)'}`,
          borderRadius: BR.xxl,
          boxShadow: isActive ? SH.cardActive : `0 4px 16px rgba(123,26,46,.04)`,
          backdropFilter: 'blur(10px)',
          position: 'relative', overflow: 'hidden', transition: 'all .3s',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(196,80,106,.45)' : 'rgba(196,80,106,.2)'},transparent)` }} />
          <div className="menu-master-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: BR.lg }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: BR.lg, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: isActive ? `linear-gradient(135deg,rgba(196,80,106,.16) 0%,rgba(247,221,226,.7) 100%)` : 'rgba(196,80,106,.07)',
                border: `1.5px solid ${isActive ? 'rgba(196,80,106,.3)' : 'rgba(196,80,106,.14)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: SP.xl, transition: 'all .3s',
              }}>🍽️</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: F.heading, fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: C.dark, marginBottom: 3 }}>
                  Afișează meniul pe invitație
                </p>
                <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: isActive ? C.textLight : `rgba(138,74,88,.4)`, lineHeight: 1.4, marginBottom: 0 }}>
                  {isActive ? 'Invitații vor vedea meniul complet ♥' : 'Activează pentru a configura și afișa'}
                </p>
              </div>
            </div>
            <RomanticToggle checked={isActive} onChange={setIsActive} />
          </div>
        </div>

        {/* CATEGORIES */}
        {isActive && (
          <div style={{ animation: 'rm-fade-in .4s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap' as const, gap: SP.sm }}>
              <p style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.28em', textTransform: 'uppercase' as const, color: C.textLight, opacity: .65, marginBottom: 0 }}>
                Categorii Meniu
              </p>
              <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: `rgba(138,74,88,.5)`, marginBottom: 0 }}>
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

            {/* Info note */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: SP.sm,
              padding: `13px 18px`, borderRadius: BR.xl,
              background: `rgba(253,245,246,.7)`, border: `1px solid rgba(196,80,106,.15)`,
              backdropFilter: 'blur(6px)', marginBottom: SP.xl,
            }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <HeartSVG size={IS.md - 1} color={`rgba(196,80,106,.45)`} />
              </div>
              <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: C.textLight, lineHeight: 1.75, marginBottom: 0 }}>
                Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
              </p>
            </div>
          </div>
        )}

        <RoseDivider />

        {/* SAVE BUTTON */}
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
              : <><HeartSVG size={IS.md - 1} color={C.white} /> Salvează Meniul <HeartSVG size={IS.md - 1} color={C.white} /></>
            }
          </span>
          {!loading && (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)', backgroundSize: '350px 100%', animation: 'rm-shimmer 3s linear infinite' }} />
          )}
        </button>

        <p style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: `rgba(138,74,88,.25)`, textAlign: 'center', marginTop: SP.lg }}>
          VibeInvite · Meniu Nuntă · Tema Romantic
        </p>
      </div>
    </>
  );
};