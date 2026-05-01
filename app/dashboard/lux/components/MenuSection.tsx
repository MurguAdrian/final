// "use client";
// import React, { useState, useEffect } from 'react';

// export const MenuSection = ({ initialData, orderId, onSave }: any) => {
//   const [loading, setLoading] = useState(false);
//   const [isActive, setIsActive] = useState(initialData?.is_menu_active ?? false);
//   const [menuItems, setMenuItems] = useState<any[]>(initialData?.menu_details?.items || []);

//   useEffect(() => {
//     setIsActive(initialData?.is_menu_active ?? false);
//     setMenuItems(initialData?.menu_details?.items || []);
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
//           menu_details: { items: menuItems } 
//           // NU mai trimitem initialData aici. API-ul va păstra restul datelor prin COALESCE.
//         }),
//       });
//       if (res.ok) {
//         alert("Meniu salvat! 🍴");
//         onSave();
//       }
//     } catch (e) { alert("Eroare"); }
//     setLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: '800px' }}>
//       <h2 style={{ color: '#d4af37' }}>🍴 Configurare Meniu</h2>
//       <label style={{ display: 'block', marginBottom: '20px', cursor: 'pointer' }}>
//         <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} /> 
//         <span style={{ marginLeft: '10px' }}>Afișează meniul pe invitație</span>
//       </label>

//       {isActive && (
//         <div style={{ background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
//           {menuItems.map((item, idx) => (
//             <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//               <input placeholder="Titlu (ex: Fel Principal)" style={inpS} value={item.title} onChange={e => {
//                 const n = [...menuItems]; n[idx].title = e.target.value; setMenuItems(n);
//               }} />
//               <input placeholder="Descriere" style={inpS} value={item.description} onChange={e => {
//                 const n = [...menuItems]; n[idx].description = e.target.value; setMenuItems(n);
//               }} />
//               <button onClick={() => setMenuItems(menuItems.filter((_, i) => i !== idx))} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>Șterge</button>
//             </div>
//           ))}
//           <button onClick={() => setMenuItems([...menuItems, { title: '', description: '' }])} style={addBtn}>+ Adaugă rând</button>
//         </div>
//       )}
//       <button onClick={handleSave} style={saveBtn}>{loading ? "SALVARE..." : "SALVEAZĂ MENIUL"}</button>
//     </div>
//   );
// };

// const inpS = { flex: 1, background: '#000', border: '1px solid #333', color: '#fff', padding: '12px' };
// const addBtn = { width: '100%', padding: '10px', background: 'none', border: '1px dashed #d4af37', color: '#d4af37', cursor: 'pointer', marginTop: '10px' };
// const saveBtn = { width: '100%', padding: '15px', background: '#d4af37', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '20px' };

"use client";
import React, { useState, useEffect } from 'react';

export const MenuSection = ({ initialData, orderId, onSave }: any) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_menu_active ?? false);
  const [menuItems, setMenuItems] = useState<any[]>(initialData?.menu_details?.items || []);

  useEffect(() => {
    setIsActive(initialData?.is_menu_active ?? false);
    setMenuItems(initialData?.menu_details?.items || []);
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
          menu_details: { items: menuItems }
        }),
      });
      if (res.ok) {
        alert("Meniu salvat! 🍴");
        onSave();
      }
    } catch (e) { alert("Eroare"); }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
        @keyframes lux-fade-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-350px 0}100%{background-position:350px 0}}
        .lux-inp:focus { border-color: rgba(212,175,55,.55) !important; background: rgba(212,175,55,.06) !important; }
        .lux-inp::placeholder { color: rgba(245,230,168,.25) !important; font-style: italic; }
        .lux-row-del:hover { background: rgba(255,60,60,.18) !important; border-color: rgba(255,80,80,.45) !important; color: #ff7070 !important; }
        .lux-add:hover { background: rgba(212,175,55,.08) !important; border-color: rgba(212,175,55,.5) !important; color: #F5D678 !important; }
        .lux-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 50px rgba(212,175,55,.55) !important; }
        .lux-save:disabled { opacity: .6; cursor: not-allowed; }
        .lux-toggle { position: relative; display: inline-flex; align-items: center; cursor: pointer; gap: 14px; }
        .lux-toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
        .lux-toggle-track { width: 48px; height: 26px; border-radius: 13px; transition: all .3s ease; position: relative; flex-shrink: 0; }
        .lux-toggle-thumb { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; transition: transform .3s ease; box-shadow: 0 2px 6px rgba(0,0,0,.4); }
      `}</style>

      <div style={{ maxWidth: 760, animation: 'lux-fade-in .55s ease both', fontFamily: "'Cormorant Garamond', serif" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 28 }}>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.36em',
            textTransform: 'uppercase', color: 'rgba(212,175,55,.5)', marginBottom: 8
          }}>Configurare</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(24px,3vw,36px)', fontWeight: 300, fontStyle: 'italic',
            color: '#F5E6A8', margin: 0, lineHeight: 1.1
          }}>Meniu Nuntă</h2>
        </div>

        {/* ── GOLD DIVIDER ── */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 28 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.35))' }} />
          <svg viewBox="0 0 60 20" width="60" height="20" fill="none" style={{ flexShrink: 0 }}>
            <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6" />
            <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6" />
            <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9" />
            <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8" />
            <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5" />
            <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5" />
          </svg>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.35),transparent)' }} />
        </div>

        {/* ── TOGGLE CARD ── */}
        <div style={{
          background: isActive
            ? 'linear-gradient(160deg,rgba(212,175,55,.09) 0%,rgba(212,175,55,.04) 100%)'
            : 'rgba(212,175,55,.03)',
          border: `1px solid ${isActive ? 'rgba(212,175,55,.3)' : 'rgba(212,175,55,.14)'}`,
          borderRadius: 16, padding: 'clamp(18px,2.5vw,26px)',
          marginBottom: 24, position: 'relative', overflow: 'hidden',
          boxShadow: '0 6px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)',
          transition: 'all .3s ease'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
            background: `linear-gradient(90deg,transparent,${isActive ? 'rgba(212,175,55,.45)' : 'rgba(212,175,55,.2)'},transparent)`,
            transition: 'all .3s'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: isActive ? 'rgba(212,175,55,.14)' : 'rgba(212,175,55,.06)',
                border: `1px solid ${isActive ? 'rgba(212,175,55,.35)' : 'rgba(212,175,55,.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all .3s'
              }}>
                <svg viewBox="0 0 20 20" fill="none" style={{ width: 18, height: 18 }}>
                  <path d="M6 2v6c0 1.66 1.34 3 3 3s3-1.34 3-3V2M9 11v7M4 18h10" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={isActive ? '1' : '.5'} />
                </svg>
              </div>
              <div>
                <p style={{
                  fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,1.2vw,12px)',
                  fontWeight: 600, letterSpacing: '.1em', color: '#F5E6A8', marginBottom: 3
                }}>Afișează meniul pe invitație</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                  fontStyle: 'italic', color: 'rgba(212,175,55,.5)', lineHeight: 1.4
                }}>
                  {isActive ? 'Invitații vor vedea meniul în ziua evenimentului' : 'Meniul este ascuns momentan'}
                </p>
              </div>
            </div>

            {/* Custom Toggle */}
            <label className="lux-toggle">
              <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
              <div className="lux-toggle-track" style={{
                background: isActive
                  ? 'linear-gradient(135deg,#8B6914,#D4AF37)'
                  : 'rgba(212,175,55,.12)',
                border: `1px solid ${isActive ? 'rgba(212,175,55,.5)' : 'rgba(212,175,55,.2)'}`,
                boxShadow: isActive ? '0 0 14px rgba(212,175,55,.3)' : 'none'
              }}>
                <div className="lux-toggle-thumb" style={{
                  transform: isActive ? 'translateX(22px)' : 'translateX(0)',
                  background: isActive ? '#fff' : 'rgba(212,175,55,.5)'
                }} />
              </div>
              <span style={{
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: isActive ? '#D4AF37' : 'rgba(212,175,55,.4)',
                transition: 'color .3s'
              }}>{isActive ? 'Activ' : 'Inactiv'}</span>
            </label>
          </div>
        </div>

        {/* ── MENU ITEMS ── */}
        {isActive && (
          <div style={{ animation: 'lux-fade-in .4s ease both' }}>
            <div style={{
              background: 'rgba(212,175,55,.03)',
              border: '1px solid rgba(212,175,55,.18)',
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.08)',
              marginBottom: 20, position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)'
              }} />

              {/* Column headers */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 44px',
                gap: 12, padding: '14px 20px',
                background: 'rgba(212,175,55,.06)',
                borderBottom: '1px solid rgba(212,175,55,.12)'
              }}>
                {['Titlu Fel', 'Descriere', ''].map((h, i) => (
                  <span key={i} style={{
                    fontFamily: "'Cinzel', serif", fontSize: 8,
                    letterSpacing: '.22em', textTransform: 'uppercase',
                    color: 'rgba(212,175,55,.45)'
                  }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {menuItems.length === 0 && (
                  <div style={{ padding: '32px 0', textAlign: 'center' }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
                      fontStyle: 'italic', fontWeight: 300, color: 'rgba(212,175,55,.3)',
                      marginBottom: 4
                    }}>Niciun fel adăugat încă</p>
                    <p style={{
                      fontFamily: "'Cinzel', serif", fontSize: 8,
                      letterSpacing: '.2em', textTransform: 'uppercase',
                      color: 'rgba(212,175,55,.2)'
                    }}>Apasă + Adaugă rând pentru a începe</p>
                  </div>
                )}

                {menuItems.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 44px',
                    gap: 12, alignItems: 'center',
                    padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(212,175,55,.03)',
                    border: '1px solid rgba(212,175,55,.1)',
                    transition: 'border-color .2s'
                  }}>
                    <input
                      className="lux-inp"
                      placeholder="ex: Fel Principal"
                      value={item.title}
                      onChange={e => {
                        const n = [...menuItems]; n[idx].title = e.target.value; setMenuItems(n);
                      }}
                      style={{
                        width: '100%', padding: '10px 14px',
                        background: 'rgba(0,0,0,.35)',
                        border: '1px solid rgba(212,175,55,.2)',
                        borderRadius: 8,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 15, color: '#F5E6A8',
                        outline: 'none', transition: 'all .2s'
                      }}
                    />
                    <input
                      className="lux-inp"
                      placeholder="ex: Piept de rață cu sos de portocale"
                      value={item.description}
                      onChange={e => {
                        const n = [...menuItems]; n[idx].description = e.target.value; setMenuItems(n);
                      }}
                      style={{
                        width: '100%', padding: '10px 14px',
                        background: 'rgba(0,0,0,.35)',
                        border: '1px solid rgba(212,175,55,.2)',
                        borderRadius: 8,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 15, color: '#F5E6A8',
                        outline: 'none', transition: 'all .2s'
                      }}
                    />
                    <button
                      className="lux-row-del"
                      onClick={() => setMenuItems(menuItems.filter((_, i) => i !== idx))}
                      style={{
                        width: 36, height: 36,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,60,60,.08)',
                        border: '1px solid rgba(255,60,60,.2)',
                        borderRadius: 8, cursor: 'pointer',
                        color: 'rgba(255,100,100,.7)', transition: 'all .2s',
                        flexShrink: 0
                      }}>
                      <svg viewBox="0 0 20 20" fill="none" style={{ width: 13, height: 13 }}>
                        <path d="M4 6h12M8 6V4h4v2M7 6l1 10h4l1-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add row button */}
              <div style={{ padding: '0 20px 16px' }}>
                <button
                  className="lux-add"
                  onClick={() => setMenuItems([...menuItems, { title: '', description: '' }])}
                  style={{
                    width: '100%', padding: '12px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: 'transparent',
                    border: '1px dashed rgba(212,175,55,.28)',
                    borderRadius: 10,
                    color: 'rgba(212,175,55,.55)',
                    fontFamily: "'Cinzel', serif", fontSize: 9,
                    fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all .2s'
                  }}>
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14 }}>
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Adaugă rând
                </button>
              </div>
            </div>

            {/* Info note */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '12px 16px', borderRadius: 10,
              background: 'rgba(212,175,55,.04)',
              border: '1px solid rgba(212,175,55,.12)',
              marginBottom: 20
            }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                <circle cx="10" cy="10" r="8" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity=".6" />
                <path d="M10 9v5M10 7h.01" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeOpacity=".7" />
              </svg>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                fontStyle: 'italic', color: 'rgba(212,175,55,.45)', lineHeight: 1.7
              }}>
                Meniul va fi afișat invitaților pe pagina invitației. Poți reveni oricând pentru a adăuga sau edita felurile de mâncare.
              </p>
            </div>
          </div>
        )}

        {/* ── SAVE BUTTON ── */}
        <button
          className="lux-save"
          onClick={handleSave}
          disabled={loading}
          style={{
            width: '100%', padding: 'clamp(14px,1.8vw,18px) 0',
            borderRadius: 4,
            background: 'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)',
            color: '#0A0803',
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(10px,1.2vw,12px)', fontWeight: 700, letterSpacing: '.22em',
            textTransform: 'uppercase', border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 36px rgba(212,175,55,.32),0 2px 0 rgba(245,214,120,.4) inset',
            transition: 'transform .22s, box-shadow .22s',
            position: 'relative', overflow: 'hidden'
          }}>
          <span style={{ position: 'relative', zIndex: 1 }}>
            {loading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <svg viewBox="0 0 20 20" fill="none" style={{ width: 14, height: 14, animation: 'lux-spin 1s linear infinite' }}>
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
                  <path d="M10 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Salvare în curs...
              </span>
            ) : '◆ Salvează Meniul ◆'}
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
          fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'rgba(212,175,55,.25)',
          textAlign: 'center', marginTop: 14
        }}>VibeInvite · Meniu Nuntă Premium</p>
      </div>
    </>
  );
};