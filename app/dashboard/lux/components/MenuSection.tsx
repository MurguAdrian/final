
// "use client";
// import React, { useState, useEffect } from 'react';

// /* ══════════════════════════════════════
//    TYPES
// ══════════════════════════════════════ */
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

// const DEFAULT_CATEGORIES: MenuCategory[] = [
//   { id: 'aperitive', label: 'Aperitive & Gustări', emoji: '🍽️', active: false, items: [] },
//   { id: 'principal', label: 'Fel Principal', emoji: '🥩', active: false, items: [] },
//   { id: 'desert', label: 'Tort & Desert', emoji: '🎂', active: false, items: [] },
//   { id: 'alcoolice', label: 'Băuturi Alcoolice', emoji: '🍾', active: false, items: [] },
//   { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice', emoji: '💧', active: false, items: [] },
//   { id: 'candybar', label: 'Candy Bar', emoji: '🍬', active: false, items: [] },
//   { id: 'cafea', label: 'Cafea & Digestive', emoji: '☕', active: false, items: [] },
//   { id: 'altele', label: 'Altele', emoji: '✨', active: false, items: [] },
// ];

// function buildInitialCategories(saved: any): MenuCategory[] {
//   if (!saved?.categories?.length) return DEFAULT_CATEGORIES;
//   return DEFAULT_CATEGORIES.map(def => {
//     const found = saved.categories.find((c: any) => c.id === def.id);
//     return found ? { ...def, active: found.active ?? false, items: found.items ?? [] } : def;
//   });
// }

// /* ══════════════════════════════════════
//    SVG ICONS
// ══════════════════════════════════════ */
// const IconPlus = () => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13 }}>
//     <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
//     <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//   </svg>
// );
// const IconTrash = () => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13 }}>
//     <path d="M4 6h12M8 6V4h4v2M7 6l1 10h4l1-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const IconChevron = ({ open }: { open: boolean }) => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, transition: 'transform .3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
//     <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const IconSpin = () => (
//   <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, animation: 'lux-spin 1s linear infinite' }}>
//     <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
//     <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// );

// /* ══════════════════════════════════════
//    TOGGLE
// ══════════════════════════════════════ */
// const LuxToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
//   <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
//     <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
//     <div style={{
//       width: 44, height: 24, borderRadius: 12, position: 'relative', flexShrink: 0,
//       background: checked ? 'linear-gradient(135deg,#8B6914,#D4AF37)' : 'rgba(212,175,55,.1)',
//       border: `1px solid ${checked ? 'rgba(212,175,55,.5)' : 'rgba(212,175,55,.18)'}`,
//       boxShadow: checked ? '0 0 12px rgba(212,175,55,.28)' : 'none',
//       transition: 'all .3s ease'
//     }}>
//       <div style={{
//         position: 'absolute', top: 2, left: 2, width: 18, height: 18, borderRadius: '50%',
//         background: checked ? '#fff' : 'rgba(212,175,55,.4)',
//         boxShadow: '0 2px 6px rgba(0,0,0,.35)',
//         transform: checked ? 'translateX(20px)' : 'translateX(0)',
//         transition: 'transform .3s ease, background .3s ease'
//       }} />
//     </div>
//     <span style={{
//       fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.16em',
//       textTransform: 'uppercase',
//       color: checked ? '#D4AF37' : 'rgba(212,175,55,.35)',
//       transition: 'color .3s'
//     }}>{checked ? 'Activ' : 'Inactiv'}</span>
//   </label>
// );

// /* ══════════════════════════════════════
//    GOLD DIVIDER
// ══════════════════════════════════════ */
// const GoldDivider = () => (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '24px 0' }}>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.3))' }} />
//     <svg viewBox="0 0 60 20" width="50" height="16" fill="none" style={{ flexShrink: 0 }}>
//       <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
//       <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
//       <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".8" />
//       <circle cx="30" cy="10" r="1.8" fill="#D4AF37" fillOpacity=".7" />
//     </svg>
//     <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.3),transparent)' }} />
//   </div>
// );

// /* ══════════════════════════════════════
//    CATEGORY CARD
// ══════════════════════════════════════ */
// function CategoryCard({
//   cat, onToggle, onAddItem, onRemoveItem, onChangeItem
// }: {
//   cat: MenuCategory;
//   onToggle: () => void;
//   onAddItem: () => void;
//   onRemoveItem: (i: number) => void;
//   onChangeItem: (i: number, field: 'name' | 'description', val: string) => void;
// }) {
//   const [expanded, setExpanded] = useState(cat.active);

//   useEffect(() => { if (cat.active) setExpanded(true); }, [cat.active]);

//   const handleHeaderClick = () => {
//     if (cat.active) setExpanded(p => !p);
//   };

//   return (
//     <div style={{
//       borderRadius: 16, overflow: 'hidden',
//       border: `1px solid ${cat.active ? 'rgba(212,175,55,.28)' : 'rgba(212,175,55,.1)'}`,
//       background: cat.active
//         ? 'linear-gradient(160deg,rgba(212,175,55,.07) 0%,rgba(212,175,55,.03) 100%)'
//         : 'rgba(212,175,55,.02)',
//       boxShadow: cat.active ? '0 6px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)' : '0 2px 10px rgba(0,0,0,.2)',
//       transition: 'all .3s ease'
//     }}>
//       {/* Header */}
//       <div
//         onClick={handleHeaderClick}
//         style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           padding: 'clamp(14px,2vw,20px) clamp(16px,2.5vw,24px)',
//           cursor: cat.active ? 'pointer' : 'default',
//           borderBottom: cat.active && expanded ? '1px solid rgba(212,175,55,.12)' : '1px solid transparent',
//           transition: 'border-color .3s',
//           gap: 12
//         }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
//           {/* Icon bubble */}
//           <div style={{
//             width: 42, height: 42, borderRadius: 12, flexShrink: 0,
//             background: cat.active ? 'rgba(212,175,55,.12)' : 'rgba(212,175,55,.05)',
//             border: `1px solid ${cat.active ? 'rgba(212,175,55,.3)' : 'rgba(212,175,55,.1)'}`,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 18, transition: 'all .3s'
//           }}>{cat.emoji}</div>

//           <div style={{ minWidth: 0 }}>
//             <p style={{
//               fontFamily: "'Cinzel', serif",
//               fontSize: 'clamp(10px,1.2vw,12px)', fontWeight: 600,
//               letterSpacing: '.1em', color: cat.active ? '#F5E6A8' : 'rgba(245,230,168,.4)',
//               marginBottom: 3, transition: 'color .3s',
//               whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
//             }}>{cat.label}</p>
//             {cat.active && cat.items.length > 0 && (
//               <p style={{
//                 fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
//                 fontStyle: 'italic', color: 'rgba(212,175,55,.5)'
//               }}>{cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}</p>
//             )}
//             {!cat.active && (
//               <p style={{
//                 fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
//                 fontStyle: 'italic', color: 'rgba(212,175,55,.25)'
//               }}>Activează pentru a configura</p>
//             )}
//           </div>
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
//           <LuxToggle checked={cat.active} onChange={onToggle} />
//           {cat.active && (
//             <span style={{ color: 'rgba(212,175,55,.5)', transition: 'color .2s' }}>
//               <IconChevron open={expanded} />
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Body */}
//       {cat.active && expanded && (
//         <div style={{ padding: 'clamp(14px,2vw,20px) clamp(16px,2.5vw,24px)', animation: 'lux-fade-in .35s ease both' }}>

//           {/* Column labels */}
//           {cat.items.length > 0 && (
//             <div style={{
//               display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
//               gap: 10, marginBottom: 8, padding: '0 4px'
//             }}>
//               {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
//                 <span key={i} style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 7,
//                   letterSpacing: '.22em', textTransform: 'uppercase',
//                   color: 'rgba(212,175,55,.38)'
//                 }}>{h}</span>
//               ))}
//             </div>
//           )}

//           {/* Items */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//             {cat.items.map((item, idx) => (
//               <div key={idx} style={{
//                 display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
//                 gap: 10, alignItems: 'center',
//                 padding: '10px 12px', borderRadius: 10,
//                 background: 'rgba(0,0,0,.25)',
//                 border: '1px solid rgba(212,175,55,.1)',
//               }}>
//                 <input
//                   className="lux-inp"
//                   placeholder="ex: Somon afumat"
//                   value={item.name}
//                   onChange={e => onChangeItem(idx, 'name', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <input
//                   className="lux-inp"
//                   placeholder="ex: cu cremă de avocado și icre"
//                   value={item.description}
//                   onChange={e => onChangeItem(idx, 'description', e.target.value)}
//                   style={inputStyle}
//                 />
//                 <button
//                   className="lux-row-del"
//                   onClick={() => onRemoveItem(idx)}
//                   style={{
//                     width: 32, height: 32,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     background: 'rgba(255,60,60,.07)',
//                     border: '1px solid rgba(255,60,60,.18)',
//                     borderRadius: 8, cursor: 'pointer',
//                     color: 'rgba(255,100,100,.6)', transition: 'all .2s', flexShrink: 0
//                   }}>
//                   <IconTrash />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Empty state */}
//           {cat.items.length === 0 && (
//             <div style={{
//               padding: '24px 0', textAlign: 'center',
//               border: '1px dashed rgba(212,175,55,.15)', borderRadius: 10,
//               marginBottom: 10
//             }}>
//               <p style={{
//                 fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
//                 fontStyle: 'italic', fontWeight: 300, color: 'rgba(212,175,55,.3)'
//               }}>Niciun element adăugat</p>
//             </div>
//           )}

//           {/* Add item */}
//           <button
//             className="lux-add"
//             onClick={onAddItem}
//             style={{
//               width: '100%', padding: '10px 0', marginTop: cat.items.length > 0 ? 10 : 0,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//               background: 'transparent',
//               border: '1px dashed rgba(212,175,55,.25)', borderRadius: 10,
//               color: 'rgba(212,175,55,.5)',
//               fontFamily: "'Cinzel', serif", fontSize: 8,
//               fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase',
//               cursor: 'pointer', transition: 'all .2s'
//             }}>
//             <IconPlus /> Adaugă element
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ══════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════ */
// export const MenuSection = ({ initialData, orderId, onSave }: any) => {
//   const [loading, setLoading] = useState(false);
//   const [isActive, setIsActive] = useState(initialData?.is_menu_active ?? false);
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
//           menu_details: { categories }
//         }),
//       });
//       if (res.ok) { alert("Meniu salvat! 🍴"); onSave(); }
//     } catch (e) { alert("Eroare la salvare"); }
//     setLoading(false);
//   };

//   const updateCat = (id: string, updater: (c: MenuCategory) => MenuCategory) =>
//     setCategories(prev => prev.map(c => c.id === id ? updater(c) : c));

//   const activeCount = categories.filter(c => c.active).length;
//   const totalItems = categories.reduce((a, c) => a + c.items.length, 0);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
//         @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//         @keyframes lux-fade-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
//         @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
//         .lux-inp:focus{border-color:rgba(212,175,55,.5)!important;background:rgba(212,175,55,.07)!important;outline:none;}
//         .lux-inp::placeholder{color:rgba(245,230,168,.22)!important;font-style:italic;}
//         .lux-row-del:hover{background:rgba(255,60,60,.18)!important;border-color:rgba(255,80,80,.4)!important;color:#ff7070!important;}
//         .lux-add:hover{background:rgba(212,175,55,.07)!important;border-color:rgba(212,175,55,.45)!important;color:#F5D678!important;}
//         .lux-save:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 16px 50px rgba(212,175,55,.55)!important;}
//         .lux-save:disabled{opacity:.6;cursor:not-allowed;}
//         .lux-toggle-master:hover{background:rgba(212,175,55,.1)!important;border-color:rgba(212,175,55,.4)!important;}
//       `}</style>

//       <div style={{ maxWidth: 780, animation: 'lux-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

//         {/* ── HEADER ── */}
//         <div style={{ marginBottom: 6 }}>
//           <p style={{
//             fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em',
//             textTransform: 'uppercase', color: 'rgba(212,175,55,.5)', marginBottom: 8
//           }}>Configurare</p>
//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
//             <h2 style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 'clamp(24px,3vw,36px)', fontWeight: 300, fontStyle: 'italic',
//               color: '#F5E6A8', margin: 0, lineHeight: 1.1
//             }}>Meniu Nuntă</h2>
//             {isActive && (
//               <div style={{ display: 'flex', gap: 16 }}>
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 300, color: '#D4AF37', lineHeight: 1 }}>{activeCount}</p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,.4)' }}>Categorii</p>
//                 </div>
//                 <div style={{ width: 1, background: 'rgba(212,175,55,.2)' }} />
//                 <div style={{ textAlign: 'center' }}>
//                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 300, color: '#D4AF37', lineHeight: 1 }}>{totalItems}</p>
//                   <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,.4)' }}>Feluri</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <GoldDivider />

//         {/* ── MASTER TOGGLE ── */}
//         <div style={{
//           padding: 'clamp(16px,2.5vw,24px)',
//           background: isActive
//             ? 'linear-gradient(160deg,rgba(212,175,55,.09) 0%,rgba(212,175,55,.04) 100%)'
//             : 'rgba(212,175,55,.03)',
//           border: `1px solid ${isActive ? 'rgba(212,175,55,.28)' : 'rgba(212,175,55,.12)'}`,
//           borderRadius: 16, marginBottom: 28,
//           boxShadow: '0 6px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)',
//           position: 'relative', overflow: 'hidden', transition: 'all .3s'
//         }}>
//           <div style={{
//             position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
//             background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(212,175,55,.45)' : 'rgba(212,175,55,.2)'},transparent)`
//           }} />
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
//               <div style={{
//                 width: 44, height: 44, borderRadius: 12, flexShrink: 0,
//                 background: isActive ? 'rgba(212,175,55,.12)' : 'rgba(212,175,55,.05)',
//                 border: `1px solid ${isActive ? 'rgba(212,175,55,.32)' : 'rgba(212,175,55,.14)'}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 20, transition: 'all .3s'
//               }}>🍽️</div>
//               <div>
//                 <p style={{
//                   fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,1.2vw,13px)',
//                   fontWeight: 600, letterSpacing: '.1em', color: '#F5E6A8', marginBottom: 4
//                 }}>Afișează meniul pe invitație</p>
//                 <p style={{
//                   fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//                   fontStyle: 'italic',
//                   color: isActive ? 'rgba(212,175,55,.5)' : 'rgba(212,175,55,.3)',
//                   lineHeight: 1.4
//                 }}>
//                   {isActive
//                     ? 'Invitații vor vedea meniul complet în pagina invitației'
//                     : 'Activează pentru a configura și afișa meniul'}
//                 </p>
//               </div>
//             </div>
//             <LuxToggle checked={isActive} onChange={setIsActive} />
//           </div>
//         </div>

//         {/* ── CATEGORIES ── */}
//         {isActive && (
//           <div style={{ animation: 'lux-fade-in .4s ease both' }}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
//               <p style={{
//                 fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.28em',
//                 textTransform: 'uppercase', color: 'rgba(212,175,55,.4)'
//               }}>Categorii Meniu</p>
//               <p style={{
//                 fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
//                 fontStyle: 'italic', color: 'rgba(212,175,55,.35)'
//               }}>Activează categoriile dorite &amp; adaugă felurile</p>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
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
//             <div style={{
//               display: 'flex', alignItems: 'flex-start', gap: 10,
//               padding: '12px 18px', borderRadius: 10,
//               background: 'rgba(212,175,55,.04)', border: '1px solid rgba(212,175,55,.1)',
//               marginBottom: 24
//             }}>
//               <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 3 }}>
//                 <circle cx="10" cy="10" r="8" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity=".55" />
//                 <path d="M10 9v5M10 7h.01" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeOpacity=".65" />
//               </svg>
//               <p style={{
//                 fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
//                 fontStyle: 'italic', color: 'rgba(212,175,55,.4)', lineHeight: 1.7
//               }}>
//                 Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale — poți lăsa câmpul gol dacă nu este cazul.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ── SAVE ── */}
//         <button
//           className="lux-save"
//           onClick={handleSave}
//           disabled={loading}
//           style={{
//             width: '100%', padding: 'clamp(14px,1.8vw,18px) 0',
//             borderRadius: 4,
//             background: 'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',
//             color: '#0A0803',
//             fontFamily: "'Cinzel', serif",
//             fontSize: 'clamp(10px,1.2vw,12px)', fontWeight: 700,
//             letterSpacing: '.22em', textTransform: 'uppercase',
//             border: 'none', cursor: 'pointer',
//             boxShadow: '0 8px 36px rgba(212,175,55,.32),0 2px 0 rgba(245,214,120,.4) inset',
//             transition: 'transform .22s,box-shadow .22s',
//             position: 'relative', overflow: 'hidden'
//           }}>
//           <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
//             {loading ? <><IconSpin /> Salvare în curs...</> : '◆ Salvează Meniul ◆'}
//           </span>
//           {!loading && (
//             <div style={{
//               position: 'absolute', inset: 0,
//               background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)',
//               backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite'
//             }} />
//           )}
//         </button>

//         <p style={{
//           fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
//           textTransform: 'uppercase', color: 'rgba(212,175,55,.2)',
//           textAlign: 'center', marginTop: 14
//         }}>VibeInvite · Meniu Nuntă Premium</p>
//       </div>
//     </>
//   );
// };

// const inputStyle: React.CSSProperties = {
//   width: '100%', padding: '9px 12px',
//   background: 'rgba(0,0,0,.3)',
//   border: '1px solid rgba(212,175,55,.18)',
//   borderRadius: 8,
//   fontFamily: "'Cormorant Garamond', serif",
//   fontSize: 15, color: '#F5E6A8',
//   outline: 'none', transition: 'all .2s'
// };

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

const DEFAULT_CATEGORIES: MenuCategory[] = [
  { id: 'aperitive', label: 'Aperitive & Gustări', emoji: '🍽️', active: false, items: [] },
  { id: 'principal', label: 'Fel Principal', emoji: '🥩', active: false, items: [] },
  { id: 'desert', label: 'Tort & Desert', emoji: '🎂', active: false, items: [] },
  { id: 'alcoolice', label: 'Băuturi Alcoolice', emoji: '🍾', active: false, items: [] },
  { id: 'nonalcoolice', label: 'Băuturi Non-Alcoolice', emoji: '💧', active: false, items: [] },
  { id: 'candybar', label: 'Candy Bar', emoji: '🍬', active: false, items: [] },
  { id: 'cafea', label: 'Cafea & Digestive', emoji: '☕', active: false, items: [] },
  { id: 'altele', label: 'Altele', emoji: '✨', active: false, items: [] },
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
  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, animation: 'lux-spin 1s linear infinite' }}>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
    <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LuxToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
    <div style={{
      width: 44, height: 24, borderRadius: 12, position: 'relative', flexShrink: 0,
      background: checked ? 'linear-gradient(135deg,#8B6914,#D4AF37)' : 'rgba(212,175,55,.1)',
      border: `1px solid ${checked ? 'rgba(212,175,55,.5)' : 'rgba(212,175,55,.18)'}`,
      boxShadow: checked ? '0 0 12px rgba(212,175,55,.28)' : 'none',
      transition: 'all .3s ease'
    }}>
      <div style={{
        position: 'absolute', top: 2, left: 2, width: 18, height: 18, borderRadius: '50%',
        background: checked ? '#fff' : 'rgba(212,175,55,.4)',
        boxShadow: '0 2px 6px rgba(0,0,0,.35)',
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform .3s ease, background .3s ease'
      }} />
    </div>
    <span style={{
      fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: checked ? '#D4AF37' : 'rgba(212,175,55,.35)',
      transition: 'color .3s',
      whiteSpace: 'nowrap'
    }}>{checked ? 'Activ' : 'Inactiv'}</span>
  </label>
);

const GoldDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '20px 0' }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.3))' }} />
    <svg viewBox="0 0 60 20" width="50" height="16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
      <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".5" />
      <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".8" />
      <circle cx="30" cy="10" r="1.8" fill="#D4AF37" fillOpacity=".7" />
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.3),transparent)' }} />
  </div>
);

function CategoryCard({
  cat, onToggle, onAddItem, onRemoveItem, onChangeItem
}: {
  cat: MenuCategory;
  onToggle: () => void;
  onAddItem: () => void;
  onRemoveItem: (i: number) => void;
  onChangeItem: (i: number, field: 'name' | 'description', val: string) => void;
}) {
  const [expanded, setExpanded] = useState(cat.active);

  useEffect(() => { if (cat.active) setExpanded(true); }, [cat.active]);

  const handleHeaderClick = () => {
    if (cat.active) setExpanded(p => !p);
  };

  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      border: `1px solid ${cat.active ? 'rgba(212,175,55,.28)' : 'rgba(212,175,55,.1)'}`,
      background: cat.active
        ? 'linear-gradient(160deg,rgba(212,175,55,.07) 0%,rgba(212,175,55,.03) 100%)'
        : 'rgba(212,175,55,.02)',
      boxShadow: cat.active ? '0 6px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)' : '0 2px 10px rgba(0,0,0,.2)',
      transition: 'all .3s ease'
    }}>
      {/* Header */}
      <div
        onClick={handleHeaderClick}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px',
          cursor: cat.active ? 'pointer' : 'default',
          borderBottom: cat.active && expanded ? '1px solid rgba(212,175,55,.12)' : '1px solid transparent',
          transition: 'border-color .3s',
          gap: 10,
          minWidth: 0,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: cat.active ? 'rgba(212,175,55,.12)' : 'rgba(212,175,55,.05)',
            border: `1px solid ${cat.active ? 'rgba(212,175,55,.3)' : 'rgba(212,175,55,.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, transition: 'all .3s'
          }}>{cat.emoji}</div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(10px,2.5vw,11px)', fontWeight: 600,
              letterSpacing: '.08em', color: cat.active ? '#F5E6A8' : 'rgba(245,230,168,.4)',
              marginBottom: 2, transition: 'color .3s',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }}>{cat.label}</p>
            {cat.active && cat.items.length > 0 && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                fontStyle: 'italic', color: 'rgba(212,175,55,.5)'
              }}>{cat.items.length} {cat.items.length === 1 ? 'element' : 'elemente'}</p>
            )}
            {!cat.active && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                fontStyle: 'italic', color: 'rgba(212,175,55,.25)'
              }}>Activează pentru a configura</p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <LuxToggle checked={cat.active} onChange={onToggle} />
          {cat.active && (
            <span style={{ color: 'rgba(212,175,55,.5)', transition: 'color .2s' }}>
              <IconChevron open={expanded} />
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      {cat.active && expanded && (
        <div style={{ padding: '14px 16px', animation: 'lux-fade-in .35s ease both' }}>

          {cat.items.length > 0 && (
            <div className="menu-col-labels" style={{
              display: 'grid', gridTemplateColumns: '1fr 1.4fr 36px',
              gap: 8, marginBottom: 6, padding: '0 2px'
            }}>
              {['Nume', 'Descriere (opțional)', ''].map((h, i) => (
                <span key={i} style={{
                  fontFamily: "'Cinzel', serif", fontSize: 7,
                  letterSpacing: '.22em', textTransform: 'uppercase',
                  color: 'rgba(212,175,55,.38)'
                }}>{h}</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cat.items.map((item, idx) => (
              <div key={idx} className="menu-item-row" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr 36px',
                gap: 8, alignItems: 'center',
                padding: '10px 10px', borderRadius: 10,
                background: 'rgba(0,0,0,.25)',
                border: '1px solid rgba(212,175,55,.1)',
              }}>
                <input
                  className="lux-inp"
                  placeholder="ex: Somon afumat"
                  value={item.name}
                  onChange={e => onChangeItem(idx, 'name', e.target.value)}
                  style={inputStyle}
                />
                <input
                  className="lux-inp"
                  placeholder="ex: cu cremă de avocado"
                  value={item.description}
                  onChange={e => onChangeItem(idx, 'description', e.target.value)}
                  style={inputStyle}
                />
                <button
                  className="lux-row-del"
                  onClick={() => onRemoveItem(idx)}
                  style={{
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,60,60,.07)',
                    border: '1px solid rgba(255,60,60,.18)',
                    borderRadius: 8, cursor: 'pointer',
                    color: 'rgba(255,100,100,.6)', transition: 'all .2s', flexShrink: 0
                  }}>
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          {cat.items.length === 0 && (
            <div style={{
              padding: '20px 0', textAlign: 'center',
              border: '1px dashed rgba(212,175,55,.15)', borderRadius: 10,
              marginBottom: 10
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                fontStyle: 'italic', fontWeight: 300, color: 'rgba(212,175,55,.3)'
              }}>Niciun element adăugat</p>
            </div>
          )}

          <button
            className="lux-add"
            onClick={onAddItem}
            style={{
              width: '100%', padding: '10px 0', marginTop: cat.items.length > 0 ? 10 : 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: 'transparent',
              border: '1px dashed rgba(212,175,55,.25)', borderRadius: 10,
              color: 'rgba(212,175,55,.5)',
              fontFamily: "'Cinzel', serif", fontSize: 8,
              fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all .2s'
            }}>
            <IconPlus /> Adaugă element
          </button>
        </div>
      )}
    </div>
  );
}

export const MenuSection = ({ initialData, orderId, onSave }: any) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_menu_active ?? false);
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
          menu_details: { categories }
        }),
      });
      if (res.ok) { alert("Meniu salvat! 🍴"); onSave(); }
    } catch (e) { alert("Eroare la salvare"); }
    setLoading(false);
  };

  const updateCat = (id: string, updater: (c: MenuCategory) => MenuCategory) =>
    setCategories(prev => prev.map(c => c.id === id ? updater(c) : c));

  const activeCount = categories.filter(c => c.active).length;
  const totalItems = categories.reduce((a, c) => a + c.items.length, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        @keyframes lux-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes lux-fade-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        .lux-inp:focus{border-color:rgba(212,175,55,.5)!important;background:rgba(212,175,55,.07)!important;outline:none;}
        .lux-inp::placeholder{color:rgba(245,230,168,.22)!important;font-style:italic;}
        .lux-row-del:hover{background:rgba(255,60,60,.18)!important;border-color:rgba(255,80,80,.4)!important;color:#ff7070!important;}
        .lux-add:hover{background:rgba(212,175,55,.07)!important;border-color:rgba(212,175,55,.45)!important;color:#F5D678!important;}
        .lux-save:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 16px 50px rgba(212,175,55,.55)!important;}
        .lux-save:disabled{opacity:.6;cursor:not-allowed;}
        .lux-toggle-master:hover{background:rgba(212,175,55,.1)!important;border-color:rgba(212,175,55,.4)!important;}

        /* ── Responsive ── */
        .menu-section-wrap { width: 100%; max-width: 780px; box-sizing: border-box; overflow-x: hidden; }

        @media (max-width: 600px) {
          .menu-col-labels { display: none !important; }
          .menu-item-row {
            grid-template-columns: 1fr 36px !important;
            grid-template-rows: auto auto;
            gap: 6px !important;
          }
          .menu-item-row input:first-child { grid-column: 1; grid-row: 1; }
          .menu-item-row input:nth-child(2) { grid-column: 1; grid-row: 2; }
          .menu-item-row button { grid-column: 2; grid-row: 1 / 3; align-self: center; }
          .menu-stats-row { flex-direction: column !important; gap: 6px !important; }
          .menu-master-toggle { flex-wrap: wrap !important; }
        }

        @media (max-width: 400px) {
          .menu-section-wrap { padding: 0 !important; }
        }
      `}</style>

      <div className="menu-section-wrap" style={{ animation: 'lux-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 6 }}>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em',
            textTransform: 'uppercase', color: 'rgba(212,175,55,.5)', marginBottom: 8
          }}>Configurare</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(22px,5vw,36px)', fontWeight: 300, fontStyle: 'italic',
              color: '#F5E6A8', margin: 0, lineHeight: 1.1
            }}>Meniu Nuntă</h2>
            {isActive && (
              <div className="menu-stats-row" style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,4vw,28px)', fontWeight: 300, color: '#D4AF37', lineHeight: 1 }}>{activeCount}</p>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,.4)' }}>Categorii</p>
                </div>
                <div style={{ width: 1, background: 'rgba(212,175,55,.2)' }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,4vw,28px)', fontWeight: 300, color: '#D4AF37', lineHeight: 1 }}>{totalItems}</p>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,.4)' }}>Feluri</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <GoldDivider />

        {/* MASTER TOGGLE */}
        <div style={{
          padding: '16px',
          background: isActive
            ? 'linear-gradient(160deg,rgba(212,175,55,.09) 0%,rgba(212,175,55,.04) 100%)'
            : 'rgba(212,175,55,.03)',
          border: `1px solid ${isActive ? 'rgba(212,175,55,.28)' : 'rgba(212,175,55,.12)'}`,
          borderRadius: 14, marginBottom: 24,
          boxShadow: '0 6px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)',
          position: 'relative', overflow: 'hidden', transition: 'all .3s'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(212,175,55,.45)' : 'rgba(212,175,55,.2)'},transparent)`
          }} />
          <div className="menu-master-toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: isActive ? 'rgba(212,175,55,.12)' : 'rgba(212,175,55,.05)',
                border: `1px solid ${isActive ? 'rgba(212,175,55,.32)' : 'rgba(212,175,55,.14)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'all .3s'
              }}>🍽️</div>
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2.5vw,13px)',
                  fontWeight: 600, letterSpacing: '.08em', color: '#F5E6A8', marginBottom: 3
                }}>Afișează meniul pe invitație</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                  fontStyle: 'italic',
                  color: isActive ? 'rgba(212,175,55,.5)' : 'rgba(212,175,55,.3)',
                  lineHeight: 1.4
                }}>
                  {isActive
                    ? 'Invitații vor vedea meniul complet'
                    : 'Activează pentru a configura și afișa'}
                </p>
              </div>
            </div>
            <LuxToggle checked={isActive} onChange={setIsActive} />
          </div>
        </div>

        {/* CATEGORIES */}
        {isActive && (
          <div style={{ animation: 'lux-fade-in .4s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
              <p style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.28em',
                textTransform: 'uppercase', color: 'rgba(212,175,55,.4)'
              }}>Categorii Meniu</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                fontStyle: 'italic', color: 'rgba(212,175,55,.35)'
              }}>Activează categoriile dorite &amp; adaugă felurile</p>
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

            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '12px 16px', borderRadius: 10,
              background: 'rgba(212,175,55,.04)', border: '1px solid rgba(212,175,55,.1)',
              marginBottom: 20
            }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                <circle cx="10" cy="10" r="8" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity=".55" />
                <path d="M10 9v5M10 7h.01" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeOpacity=".65" />
              </svg>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                fontStyle: 'italic', color: 'rgba(212,175,55,.4)', lineHeight: 1.7
              }}>
                Doar categoriile activate vor apărea pe invitație. Descrierile sunt opționale.
              </p>
            </div>
          </div>
        )}

        {/* SAVE */}
        <button
          className="lux-save"
          onClick={handleSave}
          disabled={loading}
          style={{
            width: '100%', padding: '16px 0',
            borderRadius: 4,
            background: 'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',
            color: '#0A0803',
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(10px,2.5vw,12px)', fontWeight: 700,
            letterSpacing: '.22em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 36px rgba(212,175,55,.32),0 2px 0 rgba(245,214,120,.4) inset',
            transition: 'transform .22s,box-shadow .22s',
            position: 'relative', overflow: 'hidden'
          }}>
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {loading ? <><IconSpin /> Salvare în curs...</> : '◆ Salvează Meniul ◆'}
          </span>
          {!loading && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)',
              backgroundSize: '350px 100%', animation: 'shimmer 3s linear infinite'
            }} />
          )}
        </button>

        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'rgba(212,175,55,.2)',
          textAlign: 'center', marginTop: 14
        }}>VibeInvite · Meniu Nuntă Premium</p>
      </div>
    </>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px',
  background: 'rgba(0,0,0,.3)',
  border: '1px solid rgba(212,175,55,.18)',
  borderRadius: 8,
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 14, color: '#F5E6A8',
  outline: 'none', transition: 'all .2s',
  minWidth: 0,
  boxSizing: 'border-box',
};