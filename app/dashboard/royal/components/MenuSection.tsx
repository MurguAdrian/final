// "use client";
// import React, { useState, useEffect } from 'react';

// const R = {
//   navy: '#0B1929', navy2: '#0F2040', royalBg: '#071220',
//   silver: '#C8D8E8', silver2: '#A8BDD0', silver3: '#E8F0F8', silver4: '#6888A8',
//   accent: '#7CA8D8', accent2: '#9FBFE8', text: '#E0EAF5', textlt: '#8AAAC8',
// };

// interface MenuItem {
//   name: string;
//   description: string;
// }

// interface MenuCategory {
//   id: string;
//   label: string;
//   emoji: string;
//   active: boolean;
//   items: MenuItem[];
// }

// interface MenuSectionProps {
//   initialData: any;
//   orderId: any;
//   onSave: () => void;
// }

// interface CategoryCardProps {
//   cat: MenuCategory;
//   onToggle: () => void;
//   onAddItem: () => void;
//   onRemoveItem: (i: number) => void;
//   onChangeItem: (i: number, field: 'name' | 'description', val: string) => void;
// }

// const DEFAULT_CATEGORIES: MenuCategory[] = [
//   { id: 'aperitive',    label: 'Aperitive & Gustări',     emoji: '🍽️', active: false, items: [] },
//   { id: 'principal',    label: 'Fel Principal',            emoji: '🥩', active: false, items: [] },
//   { id: 'desert',       label: 'Tort & Desert',            emoji: '🎂', active: false, items: [] },
//   { id: 'alcoolice',    label: 'Băuturi Alcoolice',        emoji: '🍾', active: false, items: [] },
//   { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice',    emoji: '💧', active: false, items: [] },
//   { id: 'candybar',     label: 'Candy Bar',                emoji: '🍬', active: false, items: [] },
//   { id: 'cafea',        label: 'Cafea & Digestive',        emoji: '☕', active: false, items: [] },
//   { id: 'altele',       label: 'Altele',                   emoji: '✨', active: false, items: [] },
// ];

// function buildInitialCategories(saved: any): MenuCategory[] {
//   if (!saved?.categories?.length) return DEFAULT_CATEGORIES;
//   return DEFAULT_CATEGORIES.map(def => {
//     const found = saved.categories.find((c: any) => c.id === def.id);
//     return found ? { ...def, active: found.active ?? false, items: found.items ?? [] } : def;
//   });
// }

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
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, animation: 'ry-spin 1s linear infinite' }}>
//     <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
//     <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// );

// const LuxToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
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
//       width: 44, height: 24, borderRadius: 12, position: 'relative', flexShrink: 0,
//       background: checked ? `linear-gradient(135deg,${R.navy2},${R.accent})` : `rgba(200,216,232,.1)`,
//       border: `1px solid ${checked ? `rgba(200,216,232,.45)` : `rgba(200,216,232,.18)`}`,
//       transition: 'all .3s ease',
//     }}>
//       <div style={{
//         position: 'absolute', top: 2, left: 2, width: 18, height: 18, borderRadius: '50%',
//         background: checked ? '#fff' : `rgba(200,216,232,.4)`,
//         boxShadow: '0 2px 6px rgba(0,0,0,.3)',
//         transform: checked ? 'translateX(20px)' : 'translateX(0)',
//         transition: 'transform .3s ease, background .3s ease',
//       }} />
//     </div>
//     <span style={{
//       fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.16em',
//       textTransform: 'uppercase',
//       color: checked ? R.silver : R.silver4,
//       transition: 'color .3s', whiteSpace: 'nowrap',
//     }}>{checked ? 'Activ' : 'Inactiv'}</span>
//   </label>
// );

// const GoldDivider = () => (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '20px 0' }}>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(200,216,232,.25))` }} />
//     <svg viewBox="0 0 60 20" width="50" height="16" fill="none" style={{ flexShrink: 0 }}>
//       <path d="M5 10 L20 10" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".45" />
//       <path d="M40 10 L55 10" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".45" />
//       <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#C8D8E8" strokeWidth="1" strokeOpacity=".75" />
//       <circle cx="30" cy="10" r="1.8" fill="#C8D8E8" fillOpacity=".6" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(200,216,232,.25),transparent)` }} />
//   </div>
// );

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
//       borderRadius: 14, overflow: 'hidden',
//       border: `1px solid ${cat.active ? `rgba(200,216,232,.25)` : `rgba(200,216,232,.1)`}`,
//       background: cat.active
//         ? `rgba(15,32,64,.55)`
//         : `rgba(15,32,64,.25)`,
//       transition: 'all .3s ease',
//     }}>
//       <div
//         onClick={handleHeaderClick}
//         style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           padding: '14px 16px',
//           cursor: cat.active ? 'pointer' : 'default',
//           borderBottom: cat.active && expanded ? `1px solid rgba(200,216,232,.1)` : '1px solid transparent',
//           transition: 'border-color .3s',
//           gap: 10, minWidth: 0,
//         }}
//       >
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
//           <div style={{
//             width: 38, height: 38, borderRadius: 10, flexShrink: 0,
//             background: cat.active ? `rgba(124,168,216,.12)` : `rgba(124,168,216,.05)`,
//             border: `1px solid ${cat.active ? `rgba(200,216,232,.28)` : `rgba(200,216,232,.1)`}`,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 16, transition: 'all .3s',
//           }}>{cat.emoji}</div>

//           <div style={{ minWidth: 0, flex: 1 }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif",
//               fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 600,
//               letterSpacing: '.08em',
//               color: cat.active ? R.silver3 : R.silver4,
//               marginBottom: 2, transition: 'color .3s',
//               whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//             }}>{cat.label}</p>
//             {cat.active && cat.items.length > 0 && (
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontStyle: 'italic', color: R.silver4, marginBottom: 0 }}>
//                 {cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}
//               </p>
//             )}
//             {!cat.active && (
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontStyle: 'italic', color: `rgba(200,216,232,.25)`, marginBottom: 0 }}>
//                 Activează pentru a configura
//               </p>
//             )}
//           </div>
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//           <LuxToggle checked={cat.active} onChange={onToggle} />
//           {cat.active && (
//             <span style={{ color: R.silver4, transition: 'color .2s' }}>
//               <IconChevron open={expanded} />
//             </span>
//           )}
//         </div>
//       </div>

//       {cat.active && expanded && (
//         <div style={{ padding: '14px 16px', animation: 'ry-fade-in .35s ease both' }}>
//           {cat.items.length > 0 && (
//             <div
//               className="menu-col-labels"
//               style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px', gap: 8, marginBottom: 6, padding: '0 2px' }}
//             >
//               {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
//                 <span key={i} style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase', color: R.silver4, opacity: .6 }}>
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
//                   padding: '10px', borderRadius: 10,
//                   background: 'rgba(0,0,0,.2)',
//                   border: `1px solid rgba(200,216,232,.1)`,
//                 }}
//               >
//                 <input
//                   className="ry-inp"
//                   placeholder="ex: Somon afumat"
//                   value={item.name}
//                   onChange={e => onChangeItem(idx, 'name', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <input
//                   className="ry-inp"
//                   placeholder="ex: cu cremă de avocado"
//                   value={item.description}
//                   onChange={e => onChangeItem(idx, 'description', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <button
//                   className="ry-row-del"
//                   type="button"
//                   onClick={() => onRemoveItem(idx)}
//                   style={{
//                     width: 32, height: 32,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     background: 'rgba(255,60,60,.07)',
//                     border: '1px solid rgba(255,60,60,.18)',
//                     borderRadius: 8, cursor: 'pointer',
//                     color: 'rgba(255,100,100,.6)', transition: 'all .2s', flexShrink: 0,
//                   }}
//                 >
//                   <IconTrash />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {cat.items.length === 0 && (
//             <div style={{ padding: '20px 0', textAlign: 'center', border: `1px dashed rgba(200,216,232,.15)`, borderRadius: 10, marginBottom: 10 }}>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: R.silver4, opacity: .6, marginBottom: 0 }}>
//                 Niciun element adăugat
//               </p>
//             </div>
//           )}

//           <button
//             className="ry-add"
//             type="button"
//             onClick={onAddItem}
//             style={{
//               width: '100%', padding: '10px 0',
//               marginTop: cat.items.length > 0 ? 10 : 0,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//               background: 'transparent',
//               border: `1px dashed rgba(200,216,232,.22)`, borderRadius: 10,
//               color: R.silver4,
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

// export const MenuSection = ({ initialData, orderId, onSave }: MenuSectionProps) => {
//   const [loading, setLoading] = useState(false);
//   const [isActive, setIsActive] = useState<boolean>(initialData?.is_menu_active ?? false);
//   const [categories, setCategories] = useState<MenuCategory[]>(() =>
//     buildInitialCategories(initialData?.menu_details)
//   );

//   useEffect(() => {
//     setIsActive(initialData?.is_menu_active ?? false);
//     setCategories(buildInitialCategories(initialData?.menu_details));
//   }, [initialData]);

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

//   const updateCat = (id: string, updater: (c: MenuCategory) => MenuCategory) =>
//     setCategories(prev => prev.map(c => c.id === id ? updater(c) : c));

//   const activeCount = categories.filter(c => c.active).length;
//   const totalItems  = categories.reduce((a, c) => a + c.items.length, 0);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; }

//         @keyframes ry-spin    { from { transform: rotate(0deg)  } to { transform: rotate(360deg) } }
//         @keyframes ry-fade-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
//         @keyframes shimmer     { 0%{ background-position: -350px 0 } 100%{ background-position: 350px 0 } }

//         .ry-inp {
//           font-size: 16px !important;
//           -webkit-text-size-adjust: 100%;
//           -webkit-appearance: none;
//           appearance: none;
//         }

//         .menu-section-wrap {
//           overscroll-behavior: contain;
//           -webkit-overflow-scrolling: auto;
//         }

//         .ry-inp:focus         { border-color: rgba(200,216,232,.5) !important; background: rgba(124,168,216,.07) !important; outline: none; }
//         .ry-inp::placeholder  { color: rgba(200,216,232,.22) !important; font-style: italic; }
//         .ry-row-del:hover     { background: rgba(255,60,60,.18) !important; border-color: rgba(255,80,80,.4) !important; color: #ff7070 !important; }
//         .ry-add:hover         { background: rgba(124,168,216,.07) !important; border-color: rgba(200,216,232,.4) !important; color: ${R.silver3} !important; }
//         .ry-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(124,168,216,.3) !important; }
//         .ry-save:disabled     { opacity: .6; cursor: not-allowed; }

//         .menu-section-wrap { width: 100%; max-width: 780px; box-sizing: border-box; overflow-x: hidden; }

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
//           .menu-stats-row  { flex-direction: column !important; gap: 6px !important; }
//           .menu-master-toggle { flex-wrap: wrap !important; }
//         }
//         @media (max-width: 400px) {
//           .menu-section-wrap { padding: 0 !important; }
//         }
//       `}</style>

//       <div className="menu-section-wrap" style={{ animation: 'ry-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

//         {/* ── HEADER ── */}
//         <div style={{ marginBottom: 6 }}>
//           <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em', textTransform: 'uppercase', color: R.silver4, marginBottom: 8 }}>
//             Configurare
//           </p>
//           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
//             <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,5vw,36px)', fontWeight: 300, fontStyle: 'italic', color: R.silver3, margin: 0, lineHeight: 1.1 }}>
//               Meniu Nuntă
//             </h2>
//             {isActive && (
//               <div className="menu-stats-row" style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,4vw,28px)', fontWeight: 300, color: R.silver, lineHeight: 1, marginBottom: 2 }}>{activeCount}</p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: R.silver4, marginBottom: 0 }}>Categorii</p>
//                 </div>
//                 <div style={{ width: 1, background: `rgba(200,216,232,.2)` }} />
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,4vw,28px)', fontWeight: 300, color: R.silver, lineHeight: 1, marginBottom: 2 }}>{totalItems}</p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: R.silver4, marginBottom: 0 }}>Feluri</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <GoldDivider />

//         {/* ── MASTER TOGGLE ── */}
//         <div style={{
//           padding: 16,
//           background: isActive ? `rgba(15,32,64,.55)` : `rgba(15,32,64,.3)`,
//           border: `1px solid ${isActive ? `rgba(200,216,232,.25)` : `rgba(200,216,232,.12)`}`,
//           borderRadius: 14, marginBottom: 24,
//           position: 'relative', overflow: 'hidden', transition: 'all .3s',
//         }}>
//           <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? `rgba(200,216,232,.4)` : `rgba(200,216,232,.18)`},transparent)` }} />
//           <div className="menu-master-toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
//               <div style={{
//                 width: 40, height: 40, borderRadius: 10, flexShrink: 0,
//                 background: isActive ? `rgba(124,168,216,.12)` : `rgba(124,168,216,.05)`,
//                 border: `1px solid ${isActive ? `rgba(200,216,232,.3)` : `rgba(200,216,232,.14)`}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 18, transition: 'all .3s',
//               }}>🍽️</div>
//               <div style={{ minWidth: 0 }}>
//                 <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: R.silver3, marginBottom: 3 }}>
//                   Afișează meniul pe invitație
//                 </p>
//                 <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontStyle: 'italic', color: isActive ? R.silver4 : `rgba(200,216,232,.3)`, lineHeight: 1.4, marginBottom: 0 }}>
//                   {isActive ? 'Invitații vor vedea meniul complet' : 'Activează pentru a configura și afișa'}
//                 </p>
//               </div>
//             </div>
//             <LuxToggle checked={isActive} onChange={setIsActive} />
//           </div>
//         </div>

//         {/* ── CATEGORIES ── */}
//         {isActive && (
//           <div style={{ animation: 'ry-fade-in .4s ease both' }}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
//               <p style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: R.silver4, marginBottom: 0 }}>
//                 Categorii Meniu
//               </p>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontStyle: 'italic', color: `rgba(200,216,232,.35)`, marginBottom: 0 }}>
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

//             <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', borderRadius: 10, background: `rgba(124,168,216,.04)`, border: `1px solid rgba(200,216,232,.1)`, marginBottom: 20 }}>
//               <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
//                 <circle cx="10" cy="10" r="8" stroke={R.silver4} strokeWidth="1.2" strokeOpacity=".55" />
//                 <path d="M10 9v5M10 7h.01" stroke={R.silver4} strokeWidth="1.3" strokeLinecap="round" strokeOpacity=".65" />
//               </svg>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: R.silver4, opacity: .7, lineHeight: 1.7, marginBottom: 0 }}>
//                 Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ── SAVE ── */}
//         <button
//           className="ry-save"
//           type="button"
//           onClick={handleSave}
//           disabled={loading}
//           style={{
//             width: '100%', padding: '16px 0', borderRadius: 4,
//             background: `linear-gradient(135deg,${R.navy2} 0%,${R.silver4} 45%,${R.silver2} 55%,${R.silver4} 70%,${R.navy2} 100%)`,
//             color: R.navy,
//             fontFamily: "'Cinzel', serif",
//             fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 700,
//             letterSpacing: '.22em', textTransform: 'uppercase',
//             border: 'none', cursor: 'pointer',
//             boxShadow: `0 6px 24px rgba(124,168,216,.18)`,
//             transition: 'transform .22s, box-shadow .22s',
//             position: 'relative', overflow: 'hidden',
//           }}
//         >
//           <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
//             {loading ? <><IconSpin /> Salvare în curs...</> : '◆ Salvează Meniul ◆'}
//           </span>
//           {!loading && (
//             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)', backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
//           )}
//         </button>

//         <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em', textTransform: 'uppercase', color: R.silver4, opacity: .35, textAlign: 'center', marginTop: 14 }}>
//           VibeInvite · Meniu Nuntă Premium
//         </p>

//       </div>
//     </>
//   );
// };

// const inputStyle: React.CSSProperties = {
//   width: '100%',
//   padding: '8px 10px',
//   background: 'rgba(0,0,0,.25)',
//   border: `1px solid rgba(200,216,232,.18)`,
//   borderRadius: 8,
//   fontFamily: "'Cormorant Garamond', serif",
//   color: '#E8F0F8',
//   outline: 'none',
//   transition: 'all .2s',
//   minWidth: 0,
//   boxSizing: 'border-box',
//   WebkitAppearance: 'none',
// };

"use client";
import React, { useState, useEffect } from 'react';
import { C, G, F, FS, ANIM } from '../ui.tokens';

interface MenuItem     { name: string; description: string; }
interface MenuCategory { id: string; label: string; emoji: string; active: boolean; items: MenuItem[]; }

interface MenuSectionProps  { initialData: any; orderId: any; onSave: () => void; }
interface CategoryCardProps {
  cat:          MenuCategory;
  onToggle:     () => void;
  onAddItem:    () => void;
  onRemoveItem: (i: number) => void;
  onChangeItem: (i: number, field: 'name' | 'description', val: string) => void;
}

const DEFAULT_CATEGORIES: MenuCategory[] = [
  { id: 'aperitive',    label: 'Aperitive & Gustări',  emoji: '🍽️', active: false, items: [] },
  { id: 'principal',    label: 'Fel Principal',         emoji: '🥩', active: false, items: [] },
  { id: 'desert',       label: 'Tort & Desert',         emoji: '🎂', active: false, items: [] },
  { id: 'alcoolice',    label: 'Băuturi Alcoolice',     emoji: '🍾', active: false, items: [] },
  { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice', emoji: '💧', active: false, items: [] },
  { id: 'candybar',     label: 'Candy Bar',             emoji: '🍬', active: false, items: [] },
  { id: 'cafea',        label: 'Cafea & Digestive',     emoji: '☕', active: false, items: [] },
  { id: 'altele',       label: 'Altele',                emoji: '✨', active: false, items: [] },
];

function buildInitialCategories(saved: any): MenuCategory[] {
  if (!saved?.categories?.length) return DEFAULT_CATEGORIES;
  return DEFAULT_CATEGORIES.map(def => {
    const found = saved.categories.find((c: any) => c.id === def.id);
    return found ? { ...def, active: found.active ?? false, items: found.items ?? [] } : def;
  });
}

// ── Icoane ───────────────────────────────────────────────────
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
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, animation: ANIM.spin }}>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
    <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LuxToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}
    onClick={e => e.stopPropagation()}>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
    <div style={{
      width: 44, height: 24, borderRadius: 12, position: 'relative', flexShrink: 0,
      background: checked ? G.toggle : `rgba(200,216,232,.1)`,
      border: `1px solid ${checked ? `rgba(200,216,232,.45)` : `rgba(200,216,232,.18)`}`,
      transition: 'all .3s ease',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: 2, width: 18, height: 18,
        borderRadius: '50%',
        background: checked ? '#fff' : `rgba(200,216,232,.4)`,
        boxShadow: '0 2px 6px rgba(0,0,0,.3)',
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform .3s ease, background .3s ease',
      }} />
    </div>
    <span style={{
      fontFamily: F.display, fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase',
      color: checked ? C.silver : C.silver4, transition: 'color .3s', whiteSpace: 'nowrap',
    }}>
      {checked ? 'Activ' : 'Inactiv'}
    </span>
  </label>
);

const GoldDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '20px 0' }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,rgba(200,216,232,.25))` }} />
    <svg viewBox="0 0 60 20" width="50" height="16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 L20 10"  stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".45" />
      <path d="M40 10 L55 10" stroke="#C8D8E8" strokeWidth=".8" strokeOpacity=".45" />
      <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)"
        fill="none" stroke="#C8D8E8" strokeWidth="1" strokeOpacity=".75" />
      <circle cx="30" cy="10" r="1.8" fill="#C8D8E8" fillOpacity=".6" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(200,216,232,.25),transparent)` }} />
  </div>
);

// ─────────────────────────────────────────────────────────────
function CategoryCard({ cat, onToggle, onAddItem, onRemoveItem, onChangeItem }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(cat.active);
  useEffect(() => { if (cat.active) setExpanded(true); }, [cat.active]);

  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      border: `1px solid ${cat.active ? C.border1 : C.border5}`,
      background: cat.active ? C.glass1 : `rgba(15,32,64,.25)`,
      transition: 'all .3s ease',
    }}>
      {/* Header */}
      <div
        onClick={() => cat.active && setExpanded(p => !p)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px',
          cursor: cat.active ? 'pointer' : 'default',
          borderBottom: cat.active && expanded ? `1px solid rgba(200,216,232,.1)` : '1px solid transparent',
          transition: 'border-color .3s', gap: 10, minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: cat.active ? C.hoverTabA : `rgba(124,168,216,.05)`,
            border: `1px solid ${cat.active ? `rgba(200,216,232,.28)` : `rgba(200,216,232,.1)`}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, transition: 'all .3s',
          }}>{cat.emoji}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontFamily: F.display, fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 600, letterSpacing: '.08em',
              color: cat.active ? C.silver3 : C.silver4, marginBottom: 2, transition: 'color .3s',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{cat.label}</p>
            {cat.active && cat.items.length > 0 && (
              <p style={{ fontFamily: F.serif, fontSize: 11, fontStyle: 'italic', color: C.silver4, marginBottom: 0 }}>
                {cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}
              </p>
            )}
            {!cat.active && (
              <p style={{ fontFamily: F.serif, fontSize: 11, fontStyle: 'italic', color: `rgba(200,216,232,.25)`, marginBottom: 0 }}>
                Activează pentru a configura
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <LuxToggle checked={cat.active} onChange={onToggle} />
          {cat.active && <span style={{ color: C.silver4 }}><IconChevron open={expanded} /></span>}
        </div>
      </div>

      {/* Body */}
      {cat.active && expanded && (
        <div style={{ padding: '14px 16px', animation: ANIM.fadeIn }}>
          {cat.items.length > 0 && (
            <div className="menu-col-labels" style={{
              display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
              gap: 8, marginBottom: 6, padding: '0 2px',
            }}>
              {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
                <span key={i} style={{ fontFamily: F.display, fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase', color: C.silver4, opacity: .6 }}>
                  {h}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cat.items.map((item, idx) => (
              <div key={idx} className="menu-item-row" style={{
                display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
                gap: 8, alignItems: 'center',
                padding: '10px', borderRadius: 10,
                background: 'rgba(0,0,0,.2)', border: `1px solid rgba(200,216,232,.1)`,
              }}>
                <input className="ry-inp" placeholder="ex: Somon afumat"
                  value={item.name} onChange={e => onChangeItem(idx, 'name', e.target.value)} style={inputStyle} />
                <input className="ry-inp" placeholder="ex: cu cremă de avocado"
                  value={item.description} onChange={e => onChangeItem(idx, 'description', e.target.value)} style={inputStyle} />
                <button className="ry-row-del" type="button" onClick={() => onRemoveItem(idx)}
                  style={{
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,60,60,.07)', border: '1px solid rgba(255,60,60,.18)',
                    borderRadius: 8, cursor: 'pointer', color: 'rgba(255,100,100,.6)', transition: 'all .2s', flexShrink: 0,
                  }}>
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          {cat.items.length === 0 && (
            <div style={{ padding: '20px 0', textAlign: 'center', border: `1px dashed rgba(200,216,232,.15)`, borderRadius: 10, marginBottom: 10 }}>
              <p style={{ fontFamily: F.serif, fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: C.silver4, opacity: .6, marginBottom: 0 }}>
                Niciun element adăugat
              </p>
            </div>
          )}

          <button className="ry-add" type="button" onClick={onAddItem} style={{
            width: '100%', padding: '10px 0', marginTop: cat.items.length > 0 ? 10 : 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'transparent', border: `1px dashed rgba(200,216,232,.22)`, borderRadius: 10,
            color: C.silver4, fontFamily: F.display, fontSize: 8, fontWeight: 600,
            letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s',
          }}>
            <IconPlus /> Adaugă element
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
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
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes ry-spin    { from { transform: rotate(0deg)  } to { transform: rotate(360deg) } }
        @keyframes ry-fade-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes shimmer    { 0%{ background-position: -350px 0 } 100%{ background-position: 350px 0 } }

        /* ── Input – 16px previne zoom iOS ──────────────── */
        .ry-inp {
          font-size: 16px !important;
          -webkit-text-size-adjust: 100%;
          -webkit-appearance: none;
          appearance: none;
        }
        .ry-inp:focus        { border-color: rgba(200,216,232,.5) !important; background: rgba(124,168,216,.07) !important; outline: none; }
        .ry-inp::placeholder { color: rgba(200,216,232,.22) !important; font-style: italic; }

        /* ── Scroll safe wrapper ────────────────────────── */
        .menu-section-wrap {
          width: 100%;
          max-width: 780px;
          box-sizing: border-box;
          overflow-x: hidden;   /* fără scroll lateral */
          /* NU overflow-y — scroll din .ry-main */
        }

        /* ── Hover ──────────────────────────────────────── */
        .ry-row-del:hover  { background: rgba(255,60,60,.18) !important; border-color: rgba(255,80,80,.4) !important; color: #ff7070 !important; }
        .ry-add:hover      { background: rgba(124,168,216,.07) !important; border-color: rgba(200,216,232,.4) !important; color: ${C.silver3} !important; }
        .ry-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(124,168,216,.3) !important; }
        .ry-save:disabled  { opacity: .6; cursor: not-allowed; }

        /* ── Responsive ──────────────────────────────────── */
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
          .menu-stats-row    { flex-direction: column !important; gap: 6px !important; }
          .menu-master-toggle { flex-wrap: wrap !important; }
        }
      `}</style>

      <div className="menu-section-wrap" style={{ animation: ANIM.fadeIn, fontFamily: F.serif }}>

        {/* ── HEADER ─────────────────────────────────────── */}
        <div style={{ marginBottom: 6 }}>
          <p style={{ fontFamily: F.display, fontSize: FS.labelLg, letterSpacing: '.36em', textTransform: 'uppercase', color: C.silver4, marginBottom: 8 }}>
            Configurare
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(22px,5vw,36px)', fontWeight: 300, fontStyle: 'italic', color: C.silver3, margin: 0, lineHeight: 1.1 }}>
              Meniu Nuntă
            </h2>
            {isActive && (
              <div className="menu-stats-row" style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px,4vw,28px)', fontWeight: 300, color: C.silver, lineHeight: 1, marginBottom: 2 }}>{activeCount}</p>
                  <p style={{ fontFamily: F.display, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: C.silver4, marginBottom: 0 }}>Categorii</p>
                </div>
                <div style={{ width: 1, background: `rgba(200,216,232,.2)` }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px,4vw,28px)', fontWeight: 300, color: C.silver, lineHeight: 1, marginBottom: 2 }}>{totalItems}</p>
                  <p style={{ fontFamily: F.display, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: C.silver4, marginBottom: 0 }}>Feluri</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <GoldDivider />

        {/* ── TOGGLE PRINCIPAL ────────────────────────────── */}
        <div style={{
          padding: 16,
          background: isActive ? C.glass1 : `rgba(15,32,64,.3)`,
          border: `1px solid ${isActive ? C.border1 : C.border4}`,
          borderRadius: 14, marginBottom: 24,
          position: 'relative', overflow: 'hidden', transition: 'all .3s',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? `rgba(200,216,232,.4)` : `rgba(200,216,232,.18)`},transparent)` }} />
          <div className="menu-master-toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: isActive ? C.hoverTabA : `rgba(124,168,216,.05)`,
                border: `1px solid ${isActive ? `rgba(200,216,232,.3)` : `rgba(200,216,232,.14)`}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'all .3s',
              }}>🍽️</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: F.display, fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: C.silver3, marginBottom: 3 }}>
                  Afișează meniul pe invitație
                </p>
                <p style={{ fontFamily: F.serif, fontSize: 12, fontStyle: 'italic', color: isActive ? C.silver4 : `rgba(200,216,232,.3)`, lineHeight: 1.4, marginBottom: 0 }}>
                  {isActive ? 'Invitații vor vedea meniul complet' : 'Activează pentru a configura și afișa'}
                </p>
              </div>
            </div>
            <LuxToggle checked={isActive} onChange={setIsActive} />
          </div>
        </div>

        {/* ── CATEGORII ───────────────────────────────────── */}
        {isActive && (
          <div style={{ animation: ANIM.fadeIn }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
              <p style={{ fontFamily: F.display, fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: C.silver4, marginBottom: 0 }}>
                Categorii Meniu
              </p>
              <p style={{ fontFamily: F.serif, fontSize: 12, fontStyle: 'italic', color: `rgba(200,216,232,.35)`, marginBottom: 0 }}>
                Activează categoriile dorite &amp; adaugă felurile
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {categories.map(cat => (
                <CategoryCard key={cat.id} cat={cat}
                  onToggle      ={() => updateCat(cat.id, c => ({ ...c, active: !c.active }))}
                  onAddItem     ={() => updateCat(cat.id, c => ({ ...c, items: [...c.items, { name: '', description: '' }] }))}
                  onRemoveItem  ={i  => updateCat(cat.id, c => ({ ...c, items: c.items.filter((_, idx) => idx !== i) }))}
                  onChangeItem  ={(i, field, val) => updateCat(cat.id, c => {
                    const items = [...c.items];
                    items[i] = { ...items[i], [field]: val };
                    return { ...c, items };
                  })}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', borderRadius: 10, background: `rgba(124,168,216,.04)`, border: `1px solid rgba(200,216,232,.1)`, marginBottom: 20 }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                <circle cx="10" cy="10" r="8" stroke={C.silver4} strokeWidth="1.2" strokeOpacity=".55" />
                <path d="M10 9v5M10 7h.01" stroke={C.silver4} strokeWidth="1.3" strokeLinecap="round" strokeOpacity=".65" />
              </svg>
              <p style={{ fontFamily: F.serif, fontSize: 13, fontStyle: 'italic', color: C.silver4, opacity: .7, lineHeight: 1.7, marginBottom: 0 }}>
                Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
              </p>
            </div>
          </div>
        )}

        {/* ── SALVEAZĂ ─────────────────────────────────────── */}
        <button className="ry-save" type="button" onClick={handleSave} disabled={loading}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 4,
            background: G.btnPrimary, color: C.navy,
            fontFamily: F.display, fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 700,
            letterSpacing: '.22em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer',
            boxShadow: `0 6px 24px rgba(124,168,216,.18)`,
            transition: 'transform .22s, box-shadow .22s',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {loading ? <><IconSpin /> Salvare în curs...</> : '◆ Salvează Meniul ◆'}
          </span>
          {!loading && (
            <div style={{ position: 'absolute', inset: 0, background: G.shimmerBtn, backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite' }} />
          )}
        </button>

        <p style={{ fontFamily: F.display, fontSize: 7, letterSpacing: '.2em', textTransform: 'uppercase', color: C.silver4, opacity: .35, textAlign: 'center', marginTop: 14 }}>
          VibeInvite · Meniu Nuntă Premium
        </p>

      </div>
    </>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px',
  background: 'rgba(0,0,0,.25)', border: `1px solid rgba(200,216,232,.18)`,
  borderRadius: 8, fontFamily: F.serif, color: C.silver3,
  outline: 'none', transition: 'all .2s', minWidth: 0,
  boxSizing: 'border-box', WebkitAppearance: 'none',
} as React.CSSProperties;
