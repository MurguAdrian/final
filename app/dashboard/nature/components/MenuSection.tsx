// "use client";
// import React, { useState, useEffect } from 'react';

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

// /* ── Icons ── */
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
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, animation: 'nat-spin 1s linear infinite' }}>
//     <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
//     <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// );

// /* ── Nature Toggle ── */
// const NatureToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
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
//       background: checked ? 'linear-gradient(135deg,#3A5E33,#274422)' : 'rgba(58,94,51,.1)',
//       border: `1px solid ${checked ? 'rgba(58,94,51,.5)' : 'rgba(58,94,51,.18)'}`,
//       boxShadow: checked ? '0 0 12px rgba(58,94,51,.28)' : 'none',
//       transition: 'all .3s ease',
//     }}>
//       <div style={{
//         position: 'absolute', top: 2, left: 2, width: 18, height: 18, borderRadius: '50%',
//         background: checked ? '#fff' : 'rgba(58,94,51,.4)',
//         boxShadow: '0 2px 6px rgba(0,0,0,.2)',
//         transform: checked ? 'translateX(20px)' : 'translateX(0)',
//         transition: 'transform .3s ease, background .3s ease',
//       }} />
//     </div>
//     <span style={{
//       fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.16em',
//       textTransform: 'uppercase',
//       color: checked ? '#3A5E33' : 'rgba(58,94,51,.35)',
//       transition: 'color .3s', whiteSpace: 'nowrap',
//     }}>{checked ? 'Activ' : 'Inactiv'}</span>
//   </label>
// );

// /* ── Botanical Divider ── */
// const BotanicalDivider = () => (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '20px 0' }}>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(154,123,63,.35))' }} />
//     <svg viewBox="0 0 60 24" width="52" height="20" fill="none" style={{ flexShrink: 0 }}>
//       <path d="M5 12 L22 12" stroke="#9A7B3F" strokeWidth=".8" strokeOpacity=".5" />
//       <path d="M38 12 L55 12" stroke="#9A7B3F" strokeWidth=".8" strokeOpacity=".5" />
//       <ellipse cx="30" cy="12" rx="6" ry="10" fill="#4A6741" fillOpacity=".22" />
//       <ellipse cx="30" cy="12" rx="3" ry="6" fill="#4A6741" fillOpacity=".38" />
//       <circle cx="30" cy="12" r="2" fill="#C9A84C" fillOpacity=".65" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(154,123,63,.35),transparent)' }} />
//   </div>
// );

// /* ── Category Card ── */
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
//       borderRadius: 18, overflow: 'hidden',
//       border: `1.5px solid ${cat.active ? 'rgba(154,123,63,.25)' : 'rgba(154,123,63,.1)'}`,
//       background: cat.active
//         ? 'rgba(255,255,255,.72)'
//         : 'rgba(255,255,255,.45)',
//       backdropFilter: 'blur(10px)',
//       boxShadow: cat.active
//         ? '0 6px 28px rgba(26,38,20,.08),inset 0 1px 0 rgba(255,255,255,.6)'
//         : '0 2px 10px rgba(26,38,20,.04)',
//       transition: 'all .3s ease',
//     }}>

//       {/* Header */}
//       <div
//         onClick={handleHeaderClick}
//         style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           padding: '14px 18px',
//           cursor: cat.active ? 'pointer' : 'default',
//           borderBottom: cat.active && expanded ? '1px solid rgba(154,123,63,.12)' : '1px solid transparent',
//           transition: 'border-color .3s',
//           gap: 10, minWidth: 0,
//         }}
//       >
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
//           <div style={{
//             width: 40, height: 40, borderRadius: 12, flexShrink: 0,
//             background: cat.active ? 'rgba(58,94,51,.1)' : 'rgba(58,94,51,.05)',
//             border: `1.5px solid ${cat.active ? 'rgba(58,94,51,.22)' : 'rgba(58,94,51,.1)'}`,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 17, transition: 'all .3s',
//           }}>{cat.emoji}</div>

//           <div style={{ minWidth: 0, flex: 1 }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif",
//               fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 600,
//               letterSpacing: '.06em',
//               color: cat.active ? '#1C2218' : 'rgba(28,34,24,.4)',
//               marginBottom: 2, transition: 'color .3s',
//               whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//             }}>{cat.label}</p>
//             {cat.active && cat.items.length > 0 && (
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontStyle: 'italic', color: 'rgba(107,122,94,.65)', marginBottom: 0 }}>
//                 {cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}
//               </p>
//             )}
//             {!cat.active && (
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontStyle: 'italic', color: 'rgba(107,122,94,.4)', marginBottom: 0 }}>
//                 Activează pentru a configura
//               </p>
//             )}
//           </div>
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//           <NatureToggle checked={cat.active} onChange={onToggle} />
//           {cat.active && (
//             <span style={{ color: 'rgba(107,122,94,.55)', transition: 'color .2s' }}>
//               <IconChevron open={expanded} />
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Body */}
//       {cat.active && expanded && (
//         <div style={{ padding: '16px 18px', animation: 'nat-fade-in .35s ease both' }}>

//           {cat.items.length > 0 && (
//             <div
//               className="menu-col-labels"
//               style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px', gap: 8, marginBottom: 8, padding: '0 2px' }}
//             >
//               {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
//                 <span key={i} style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(107,122,94,.5)' }}>
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
//                   background: 'rgba(235,244,231,.5)',
//                   border: '1px solid rgba(154,123,63,.12)',
//                 }}
//               >
//                 <input
//                   className="nat-inp"
//                   placeholder="ex: Somon afumat"
//                   value={item.name}
//                   onChange={e => onChangeItem(idx, 'name', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <input
//                   className="nat-inp"
//                   placeholder="ex: cu cremă de avocado"
//                   value={item.description}
//                   onChange={e => onChangeItem(idx, 'description', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <button
//                   className="nat-row-del"
//                   type="button"
//                   onClick={() => onRemoveItem(idx)}
//                   style={{
//                     width: 32, height: 32,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     background: 'rgba(220,50,50,.06)',
//                     border: '1px solid rgba(220,50,50,.15)',
//                     borderRadius: 10, cursor: 'pointer',
//                     color: 'rgba(200,80,80,.65)', transition: 'all .2s', flexShrink: 0,
//                   }}
//                 >
//                   <IconTrash />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {cat.items.length === 0 && (
//             <div style={{ padding: '22px 0', textAlign: 'center', border: '1px dashed rgba(154,123,63,.18)', borderRadius: 14, marginBottom: 10 }}>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: 'rgba(107,122,94,.5)', marginBottom: 0 }}>
//                 Niciun element adăugat
//               </p>
//             </div>
//           )}

//           <button
//             className="nat-add"
//             type="button"
//             onClick={onAddItem}
//             style={{
//               width: '100%', padding: '11px 0',
//               marginTop: cat.items.length > 0 ? 10 : 0,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//               background: 'transparent',
//               border: '1px dashed rgba(58,94,51,.22)', borderRadius: 12,
//               color: 'rgba(58,94,51,.6)',
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

// /* ════════════════════════════════════════════════════════ MAIN EXPORT ══ */
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
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

//         *, *::before, *::after { box-sizing: border-box; }

//         @keyframes nat-spin    { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
//         @keyframes nat-fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
//         @keyframes nat-shimmer { 0%{ background-position: -350px 0 } 100%{ background-position: 350px 0 } }

//         /* ── iOS zoom fix: 16px obligatoriu pe input ── */
//         .nat-inp {
//           font-size: 16px !important;
//           -webkit-text-size-adjust: 100%;
//           -webkit-appearance: none;
//           appearance: none;
//         }

//         /* ── Overscroll bounce prevent ── */
//         .menu-section-wrap {
//           overscroll-behavior: contain;
//           -webkit-overflow-scrolling: auto;
//         }

//         .nat-inp:focus         { border-color: rgba(58,94,51,.5) !important; background: rgba(235,244,231,.7) !important; outline: none; }
//         .nat-inp::placeholder  { color: rgba(107,122,94,.35) !important; font-style: italic; }
//         .nat-row-del:hover     { background: rgba(220,50,50,.14) !important; border-color: rgba(200,60,60,.35) !important; color: #c85050 !important; }
//         .nat-add:hover         { background: rgba(58,94,51,.06) !important; border-color: rgba(58,94,51,.42) !important; color: #3A5E33 !important; }
//         .nat-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 50px rgba(58,94,51,.45) !important; }
//         .nat-save:disabled     { opacity: .6; cursor: not-allowed; }

//         /* ── Layout ── */
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

//       <div
//         className="menu-section-wrap"
//         style={{
//           animation: 'nat-fade-in .55s ease both',
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >

//         {/* ── HEADER ── */}
//         <div style={{ marginBottom: 6 }}>
//           <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(154,123,63,.6)', marginBottom: 8 }}>
//             Configurare
//           </p>
//           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
//             <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,5vw,36px)', fontWeight: 300, fontStyle: 'italic', color: '#1C2218', margin: 0, lineHeight: 1.1 }}>
//               Meniu Nuntă
//             </h2>
//             {isActive && (
//               <div className="menu-stats-row" style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,4vw,30px)', fontWeight: 300, color: '#3A5E33', lineHeight: 1, marginBottom: 2 }}>{activeCount}</p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(107,122,94,.55)', marginBottom: 0 }}>Categorii</p>
//                 </div>
//                 <div style={{ width: 1, background: 'rgba(154,123,63,.2)' }} />
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,4vw,30px)', fontWeight: 300, color: '#3A5E33', lineHeight: 1, marginBottom: 2 }}>{totalItems}</p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(107,122,94,.55)', marginBottom: 0 }}>Feluri</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <BotanicalDivider />

//         {/* ── MASTER TOGGLE ── */}
//         <div style={{
//           padding: '18px 20px',
//           background: isActive
//             ? 'rgba(255,255,255,.72)'
//             : 'rgba(255,255,255,.45)',
//           border: `1.5px solid ${isActive ? 'rgba(154,123,63,.22)' : 'rgba(154,123,63,.1)'}`,
//           borderRadius: 18, marginBottom: 24,
//           boxShadow: isActive
//             ? '0 6px 28px rgba(26,38,20,.08),inset 0 1px 0 rgba(255,255,255,.6)'
//             : '0 2px 10px rgba(26,38,20,.04)',
//           backdropFilter: 'blur(10px)',
//           position: 'relative', overflow: 'hidden', transition: 'all .3s',
//         }}>
//           {/* top shimmer line */}
//           <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(58,94,51,.3)' : 'rgba(154,123,63,.12)'},transparent)` }} />
//           <div className="menu-master-toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
//               <div style={{
//                 width: 42, height: 42, borderRadius: 13, flexShrink: 0,
//                 background: isActive ? 'rgba(58,94,51,.1)' : 'rgba(58,94,51,.05)',
//                 border: `1.5px solid ${isActive ? 'rgba(58,94,51,.22)' : 'rgba(58,94,51,.1)'}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 19, transition: 'all .3s',
//               }}>🍽️</div>
//               <div style={{ minWidth: 0 }}>
//                 <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.06em', color: '#1C2218', marginBottom: 3 }}>
//                   Afișează meniul pe invitație
//                 </p>
//                 <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: isActive ? 'rgba(58,94,51,.6)' : 'rgba(107,122,94,.45)', lineHeight: 1.4, marginBottom: 0 }}>
//                   {isActive ? 'Invitații vor vedea meniul complet' : 'Activează pentru a configura și afișa'}
//                 </p>
//               </div>
//             </div>
//             <NatureToggle checked={isActive} onChange={setIsActive} />
//           </div>
//         </div>

//         {/* ── CATEGORIES ── */}
//         {isActive && (
//           <div style={{ animation: 'nat-fade-in .4s ease both' }}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
//               <p style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.26em', textTransform: 'uppercase', color: 'rgba(107,122,94,.55)', marginBottom: 0 }}>
//                 Categorii Meniu
//               </p>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(107,122,94,.45)', marginBottom: 0 }}>
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
//             <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '13px 16px', borderRadius: 14, background: 'rgba(235,244,231,.6)', border: '1px solid rgba(58,94,51,.12)', marginBottom: 20 }}>
//               <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
//                 <circle cx="10" cy="10" r="8" stroke="#3A5E33" strokeWidth="1.2" strokeOpacity=".55" />
//                 <path d="M10 9v5M10 7h.01" stroke="#3A5E33" strokeWidth="1.3" strokeLinecap="round" strokeOpacity=".65" />
//               </svg>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(58,94,51,.65)', lineHeight: 1.7, marginBottom: 0 }}>
//                 Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ── SAVE ── */}
//         <button
//           className="nat-save"
//           type="button"
//           onClick={handleSave}
//           disabled={loading}
//           style={{
//             width: '100%', padding: '16px 0', borderRadius: 100,
//             background: 'linear-gradient(135deg,#3A5E33 0%,#274422 100%)',
//             color: '#fff',
//             fontFamily: "'Cinzel', serif",
//             fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 700,
//             letterSpacing: '.22em', textTransform: 'uppercase',
//             border: '1.5px solid rgba(90,140,78,.3)',
//             cursor: 'pointer',
//             boxShadow: '0 10px 32px rgba(58,94,51,.38)',
//             transition: 'transform .22s, box-shadow .22s',
//             position: 'relative', overflow: 'hidden',
//           }}
//         >
//           <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
//             {loading ? <><IconSpin /> Salvare în curs...</> : '✦ Salvează Meniul ✦'}
//           </span>
//           {!loading && (
//             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)', backgroundSize: '350px 100%', animation: 'nat-shimmer 3s linear infinite' }} />
//           )}
//         </button>

//         <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(107,122,94,.35)', textAlign: 'center', marginTop: 14 }}>
//           VibeInvite · Meniu Nuntă Premium
//         </p>

//       </div>
//     </>
//   );
// };

// /* ── Input base style ── */
// const inputStyle: React.CSSProperties = {
//   width: '100%',
//   padding: '8px 12px',
//   background: 'rgba(255,255,255,.75)',
//   border: '1.5px solid rgba(154,123,63,.2)',
//   borderRadius: 10,
//   fontFamily: "'Cormorant Garamond', serif",
//   color: '#1C2218',
//   outline: 'none',
//   transition: 'all .2s',
//   minWidth: 0,
//   boxSizing: 'border-box',
//   WebkitAppearance: 'none',
// };





"use client";
import React, { useState, useEffect } from 'react';
import { C, F, FS, SP, BR, IS, SH, GR, KEYFRAMES } from '../natureTokens';

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
  background: `rgba(253,250,242,.8)`,
  border: `1px solid rgba(58,94,51,.22)`,
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

const LeafSVG = ({ size = IS.md, color = C.rose }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size, flexShrink: 0 }}>
    <path d="M17 8C8 10 5.9 16.17 3.82 19.5c-.6.95.26 2.04 1.3 1.72C7.27 20.42 11.5 19 14 16c3-3.5 4-9 3-8z" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   BOTANICAL DIVIDER
══════════════════════════════════════════════════════════════ */
const BotanicalDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 0, margin: `${SP.xl}px 0` }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${C.blush})` }} />
    <svg viewBox="0 0 80 30" width="80" height="30" fill="none">
      <path d="M5 15 L22 15"  stroke={C.blush} strokeWidth=".8" strokeOpacity=".7" />
      <path d="M58 15 L75 15" stroke={C.blush} strokeWidth=".8" strokeOpacity=".7" />
      <g transform="translate(40 15)">
        <path d="M0 -12 Q4 -6 4 0 Q4 6 0 12 Q-4 6 -4 0 Q-4 -6 0 -12Z" fill={C.peony} fillOpacity=".55" />
        <path d="M-10 -6 Q-4 -2 0 0 Q-4 2 -10 6" stroke={C.peony} strokeWidth=".8" strokeOpacity=".5" fill="none" />
        <path d="M10 -6 Q4 -2 0 0 Q4 2 10 6"   stroke={C.peony} strokeWidth=".8" strokeOpacity=".5" fill="none" />
        <circle cx="0" cy="0" r="2.5" fill={C.gold} fillOpacity=".75" />
      </g>
      <circle cx="22" cy="15" r="1.5" fill={C.blush} fillOpacity=".8" />
      <circle cx="58" cy="15" r="1.5" fill={C.blush} fillOpacity=".8" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${C.blush},transparent)` }} />
  </div>
);

/* ══════════════════════════════════════════════════════════════
   NATURE TOGGLE
══════════════════════════════════════════════════════════════ */
const NatureToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
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
      background: checked ? GR.roseBtn : 'rgba(58,94,51,.1)',
      border: `1px solid ${checked ? 'rgba(58,94,51,.5)' : 'rgba(58,94,51,.18)'}`,
      boxShadow: checked ? SH.toggleGlow : 'none',
      transition: 'all .3s ease',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: 2, width: 19, height: 19, borderRadius: '50%',
        background: checked ? C.white : `rgba(58,94,51,.35)`,
        boxShadow: '0 2px 6px rgba(26,38,20,.3)',
        transform: checked ? 'translateX(21px)' : 'translateX(0)',
        transition: 'transform .3s ease, background .3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <LeafSVG size={9} color={C.rose} />}
      </div>
    </div>
    <span style={{
      fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.16em', textTransform: 'uppercase' as const,
      color: checked ? C.rose : `rgba(74,103,65,.4)`,
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
      border: `1.5px solid ${cat.active ? 'rgba(58,94,51,.28)' : 'rgba(58,94,51,.1)'}`,
      background: cat.active ? GR.cardActive : GR.cardInactive,
      boxShadow: cat.active ? SH.cardActive : `0 2px 10px rgba(26,38,20,.04)`,
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
          borderBottom: cat.active && expanded ? `1px solid rgba(58,94,51,.14)` : '1px solid transparent',
          transition: 'border-color .3s',
          gap: SP.sm, minWidth: 0,
          position: 'relative',
        }}
      >
        {cat.active && (
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,rgba(58,94,51,.3),transparent)` }} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: BR.lg, flexShrink: 0,
            background: cat.active ? `linear-gradient(135deg,rgba(58,94,51,.14) 0%,rgba(220,232,214,.6) 100%)` : 'rgba(58,94,51,.06)',
            border: `1px solid ${cat.active ? 'rgba(58,94,51,.28)' : 'rgba(58,94,51,.12)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: SP.lg, transition: 'all .3s',
          }}>
            {cat.emoji}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontFamily: F.heading, fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 600,
              letterSpacing: '.08em', color: cat.active ? C.dark : `rgba(74,103,65,.35)`,
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
              <p style={{ fontFamily: F.body, fontSize: FS.base, fontStyle: 'italic', color: `rgba(58,94,51,.3)`, marginBottom: 0 }}>
                Activează pentru a configura
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SP.sm, flexShrink: 0 }}>
          <NatureToggle checked={cat.active} onChange={onToggle} />
          {cat.active && (
            <span style={{ color: `rgba(58,94,51,.55)`, transition: 'color .2s' }}>
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
                <span key={i} style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: `rgba(74,103,65,.5)` }}>
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
                  background: `rgba(253,250,242,.75)`,
                  border: `1px solid rgba(58,94,51,.14)`,
                  boxShadow: `0 2px 8px rgba(26,38,20,.04)`,
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
                    background: 'rgba(253,250,242,.8)',
                    border: `1px solid rgba(58,94,51,.18)`,
                    borderRadius: BR.md, cursor: 'pointer',
                    color: `rgba(58,94,51,.5)`, transition: 'all .2s', flexShrink: 0,
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          {cat.items.length === 0 && (
            <div style={{ padding: `${SP.xl}px 0`, textAlign: 'center', border: `1px dashed rgba(58,94,51,.2)`, borderRadius: BR.lg, marginBottom: SP.sm }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <LeafSVG size={IS.md} color={`rgba(58,94,51,.3)`} />
              </div>
              <p style={{ fontFamily: F.body, fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: `rgba(74,103,65,.4)`, marginBottom: 0 }}>
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
              border: `1px dashed rgba(58,94,51,.3)`, borderRadius: BR.lg,
              color: `rgba(58,94,51,.6)`,
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

        .rm-inp:focus        { border-color: rgba(58,94,51,.55) !important; background: rgba(240,248,237,.85) !important; outline: none; }
        .rm-inp::placeholder { color: rgba(74,103,65,.35) !important; font-style: italic; }

        .rm-del-btn:hover { background: rgba(58,94,51,.12) !important; border-color: rgba(58,94,51,.4) !important; color: ${C.rose} !important; }
        .rm-add-btn:hover { background: rgba(220,232,214,.45) !important; border-color: rgba(58,94,51,.5) !important; color: ${C.rose} !important; }
        .rm-save-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 50px rgba(26,38,20,.48) !important; }
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

        {/* HEADER */}
        <div style={{ marginBottom: SP.xs, textAlign: 'center' }}>
          <p style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.38em', textTransform: 'uppercase' as const, color: C.textLight, opacity: .7, marginBottom: SP.sm }}>
            Configurare
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: BR.lg }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: SP.sm, marginBottom: SP.xs }}>
                <div style={{ animation: 'rm-heartbeat 2.4s ease-in-out infinite' }}>
                  <LeafSVG size={18} color={C.rose} />
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,5vw,36px)',
                  fontWeight: 400, fontStyle: 'italic', color: C.rose, margin: 0,
                  lineHeight: 1.1, textShadow: `0 2px 18px rgba(26,38,20,.15)`,
                }}>
                  Meniu Nuntă
                </h2>
              </div>
            </div>

            {isActive && (
              <div className="menu-stats-row" style={{
                display: 'flex', gap: SP.lg, flexShrink: 0, alignItems: 'center',
                padding: `${SP.sm}px ${SP.lg}px`,
                background: `rgba(253,250,242,.75)`,
                border: `1px solid rgba(58,94,51,.18)`,
                borderRadius: 100, backdropFilter: 'blur(8px)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: C.rose, lineHeight: 1, marginBottom: 1 }}>{activeCount}</p>
                  <p style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.textLight, marginBottom: 0, opacity: .7 }}>Categorii</p>
                </div>
                <LeafSVG size={10} color={`rgba(58,94,51,.35)`} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,4vw,26px)', fontWeight: 400, fontStyle: 'italic', color: C.rose, lineHeight: 1, marginBottom: 1 }}>{totalItems}</p>
                  <p style={{ fontFamily: F.heading, fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.textLight, marginBottom: 0, opacity: .7 }}>Feluri</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <BotanicalDivider />

        {/* MASTER TOGGLE */}
        <div style={{
          padding: `18px ${SP.xl}px`, marginBottom: SP.xxl,
          background: isActive ? GR.masterActive : `rgba(253,250,242,.55)`,
          border: `1.5px solid ${isActive ? 'rgba(58,94,51,.28)' : 'rgba(58,94,51,.12)'}`,
          borderRadius: BR.xxl,
          boxShadow: isActive ? SH.cardActive : `0 4px 16px rgba(26,38,20,.04)`,
          backdropFilter: 'blur(10px)',
          position: 'relative', overflow: 'hidden', transition: 'all .3s',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(58,94,51,.45)' : 'rgba(58,94,51,.2)'},transparent)` }} />
          <div className="menu-master-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: BR.lg }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: BR.lg, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: isActive ? `linear-gradient(135deg,rgba(58,94,51,.16) 0%,rgba(220,232,214,.7) 100%)` : 'rgba(58,94,51,.07)',
                border: `1.5px solid ${isActive ? 'rgba(58,94,51,.3)' : 'rgba(58,94,51,.14)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: SP.xl, transition: 'all .3s',
              }}>🍽️</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: F.heading, fontSize: 'clamp(10px,2.5vw,13px)', fontWeight: 600, letterSpacing: '.08em', color: C.dark, marginBottom: 3 }}>
                  Afișează meniul pe invitație
                </p>
                <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: isActive ? C.textLight : `rgba(74,103,65,.4)`, lineHeight: 1.4, marginBottom: 0 }}>
                  {isActive ? 'Invitații vor vedea meniul complet 🌿' : 'Activează pentru a configura și afișa'}
                </p>
              </div>
            </div>
            <NatureToggle checked={isActive} onChange={setIsActive} />
          </div>
        </div>

        {/* CATEGORIES */}
        {isActive && (
          <div style={{ animation: 'rm-fade-in .4s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap' as const, gap: SP.sm }}>
              <p style={{ fontFamily: F.heading, fontSize: FS.tiny, letterSpacing: '.28em', textTransform: 'uppercase' as const, color: C.textLight, opacity: .65, marginBottom: 0 }}>
                Categorii Meniu
              </p>
              <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: `rgba(74,103,65,.5)`, marginBottom: 0 }}>
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
              background: `rgba(253,250,242,.7)`, border: `1px solid rgba(58,94,51,.15)`,
              backdropFilter: 'blur(6px)', marginBottom: SP.xl,
            }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <LeafSVG size={IS.md - 1} color={`rgba(58,94,51,.45)`} />
              </div>
              <p style={{ fontFamily: F.body, fontSize: FS.md, fontStyle: 'italic', color: C.textLight, lineHeight: 1.75, marginBottom: 0 }}>
                Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
              </p>
            </div>
          </div>
        )}

        <BotanicalDivider />

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
              : <><LeafSVG size={IS.md - 1} color={C.white} /> Salvează Meniul <LeafSVG size={IS.md - 1} color={C.white} /></>
            }
          </span>
          {!loading && (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)', backgroundSize: '350px 100%', animation: 'rm-shimmer 3s linear infinite' }} />
          )}
        </button>

        <p style={{ fontFamily: F.heading, fontSize: FS.micro, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: `rgba(74,103,65,.25)`, textAlign: 'center', marginTop: SP.lg }}>
          VibeInvite · Meniu Nuntă · Tema Nature
        </p>
      </div>
    </>
  );
};
