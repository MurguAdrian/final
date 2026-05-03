
// import { neon } from "@neondatabase/serverless";
// import { notFound } from "next/navigation";
// import LuxRsvpForm from "./LuxRsvpForm";
// import Countdown from "./components/Countdown";

// // Forțăm randarea dinamică pentru ca baza de date să fie interogată la fiecare vizită
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// export default async function InvitationPage({ params }: { params: { slug: string } }) {
//   const sql = neon(process.env.DATABASE_URL!);
  
//   // 1. Căutăm nunta în baza de date
//   const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;

//   if (!data || data.length === 0) notFound();
//   const s = data[0];

//   // ============================================================
//   // 2. AICI ESTE LINIA DE COD: Incrementăm vizualizările în DB
//   // ============================================================
//   await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE id = ${s.id}`;

//   return (
//     <div style={publicWrapper}>
//       {/* HEADER FULLSCREEN */}
//       <section style={heroSection}>
//         <h1 style={goldText}>VĂ INVITĂM</h1>
//         <h2 style={namesText}>{s.bride_name} & {s.groom_name}</h2>
//         <div style={{ opacity: 0.8 }}>
//             <p>Alături de nașii: {s.nasi_names}</p>
//             <p>Împreună cu părinții: {s.parents_names}</p>
//         </div>

//         {/* NUMĂRĂTOARE INVERSĂ (COUNTDOWN) */}
//         {s.wedding_date && <Countdown targetDate={s.wedding_date} />}
//       </section>

//       {/* DETALII EVENIMENT */}
//       <section style={detailSection}>
//         <div style={infoBox}>
//           <h3 style={goldText}>PETRECEREA</h3>
//           <p style={{ fontSize: '1.5rem' }}>
//             {s.wedding_date ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data nesetată'}
//           </p>
//           <p>Ora {s.wedding_time || '--:--'}</p>
//           <p style={{ margin: '15px 0', fontWeight: 'bold' }}>{s.location_name}</p>
//           <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
//             {s.waze_url && <a href={s.waze_url} target="_blank" style={btnGold}>WAZE</a>}
//             {s.google_maps_url && <a href={s.google_maps_url} target="_blank" style={btnGold}>GOOGLE MAPS</a>}
//           </div>
//         </div>

//         {/* CUNUNIA RELIGIOASĂ */}
//         {s.is_religious_active && (
//           <div style={infoBox}>
//             <h3 style={goldText}>CUNUNIA RELIGIOASĂ</h3>
//             <p>{s.religious_date ? new Date(s.religious_date).toLocaleDateString('ro-RO') : ''}</p>
//             <p>Ora {s.religious_time}</p>
//             <p>{s.religious_location}</p>
//             {s.religious_waze && <a href={s.religious_waze} target="_blank" style={btnGold}>WAZE BISERICĂ</a>}
//           </div>
//         )}

//         {/* POVESTEA NOASTRĂ */}
//         {s.our_story && (
//           <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
//             <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.8' }}>"{s.our_story}"</p>
//           </div>
//         )}

// {/* ============================================================ */}
//         {/* MENIU EVENIMENT (Actualizat pentru noul format pe categorii) */}
//         {/* ============================================================ */}
//         {s.is_menu_active && s.menu_details?.categories && (
//           <div style={{ ...infoBox, padding: '50px 20px', maxWidth: '650px' }}>
//             <h3 style={{ ...goldText, marginBottom: '40px' }}>MENIUL EVENIMENTULUI</h3>
            
//             {/* Filtrăm doar categoriile active care au cel puțin un item adăugat */}
//             {s.menu_details.categories
//               .filter((cat: any) => cat.active && cat.items && cat.items.length > 0)
//               .map((cat: any, cIdx: number) => (
//                 <div key={cIdx} style={{ marginBottom: '40px' }}>
//                   <div style={{ display: 'inline-block', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '10px', marginBottom: '20px' }}>
//                     <h4 style={{ color: '#fff', fontSize: '1.2rem', margin: 0, fontWeight: 300, letterSpacing: '2px' }}>
//                       <span style={{ marginRight: '10px' }}>{cat.emoji}</span>
//                       {cat.label}
//                     </h4>
//                   </div>
                  
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                     {cat.items.map((item: any, iIdx: number) => (
//                       <div key={iIdx}>
//                         <div style={{ color: '#d4af37', fontSize: '1.1rem' }}>{item.name}</div>
//                         {item.description && (
//                           <div style={{ fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic', marginTop: '4px' }}>
//                             {item.description}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}

//         {/* ============================================================ */}
//         {/* BUTON GALERIE FOTO LIVE - LOGICĂ ACTUALIZATĂ                 */}
//         {/* ============================================================ */}
//         {s.gallery_status === 'active' && s.photos_expires_at && new Date(s.photos_expires_at).getTime() > new Date().getTime() && (
//           <div style={{ padding: '40px 20px', borderTop: '1px solid #d4af3711' }}>
//             <h3 style={goldText}>📸 GALERIE FOTO LIVE</h3>
//             <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '20px' }}>
//               Împarte momentele surprinse de tine cu noi!
//             </p>
//             <a 
//               href={`/invitatie/lux/${params.slug}/upload`} 
//               style={{ ...btnGold, padding: '15px 40px', fontSize: '1rem', background: '#d4af37', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}
//             >
//               ÎNCARCĂ POZE
//             </a>
//           </div>
//         )}

//         {/* ICONIȚE CAZARE & TRANSPORT */}
//         {(s.is_accommodation_active || s.is_transport_active) && (
//           <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', padding: '20px', marginTop: '20px' }}>
//             {s.is_accommodation_active && <div style={{ fontSize: '2.5rem' }} title="Cazare disponibilă">🏠</div>}
//             {s.is_transport_active && <div style={{ fontSize: '2.5rem' }} title="Transport asigurat">🚌</div>}
//           </div>
//         )}
//       </section>

//       {/* RSVP FORMULAR */}
//       <section id="rsvp" style={{ padding: '100px 20px', background: '#080808' }}>
//         <div style={{ maxWidth: '500px', margin: '0 auto' }}>
//           <LuxRsvpForm 
//              orderId={s.order_id} 
//              showAccommodation={s.is_accommodation_active} 
//              showTransport={s.is_transport_active} 
//           />
//         </div>
//       </section>

//       <footer style={{ padding: '50px', opacity: 0.4, fontSize: '0.7rem' }}>
//         Contact: {s.contact_phone_bride} / {s.contact_phone_groom}
//       </footer>
//     </div>
//   );
// }

// // STILURI PENTRU FULLSCREEN
// const publicWrapper: React.CSSProperties = {
//   position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
//   background: '#000', color: '#fff', textAlign: 'center', zIndex: 99999,
//   fontFamily: 'serif', overflowY: 'auto', overflowX: 'hidden'
// };

// const heroSection: React.CSSProperties = { 
//   minHeight: '100vh', display: 'flex', flexDirection: 'column', 
//   justifyContent: 'center', padding: '20px', borderBottom: '1px solid #d4af3722' 
// };

// const detailSection: React.CSSProperties = { padding: '80px 20px' };

// const infoBox: React.CSSProperties = { 
//   border: '1px solid #d4af3733', padding: '40px 20px', maxWidth: '550px', 
//   margin: '0 auto 40px auto', background: '#0a0a0a' 
// };

// const goldText = { color: '#d4af37', letterSpacing: '4px', marginBottom: '20px' };
// const namesText = { fontSize: '4rem', margin: '30px 0', fontWeight: '300', color: '#fff' };
// const btnGold = { 
//   display: 'inline-block', padding: '12px 25px', border: '1px solid #d4af37', 
//   color: '#d4af37', textDecoration: 'none', fontSize: '0.7rem', marginTop: '10px' 
// };


// import { neon } from "@neondatabase/serverless";
// import { notFound } from "next/navigation";
// import LuxRsvpForm from "./LuxRsvpForm";
// import Countdown from "./components/Countdown";

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// export default async function InvitationPage({ params }: { params: { slug: string } }) {
//   const sql = neon(process.env.DATABASE_URL!);
  
//   const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;
//   if (!data || data.length === 0) notFound();
//   const s = data[0];

//   await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE id = ${s.id}`;

//   const brideInitial = s.bride_name ? s.bride_name.charAt(0).toUpperCase() : 'M';
//   const groomInitial = s.groom_name ? s.groom_name.charAt(0).toUpperCase() : 'I';

//   return (
//     <>
//       <style>{`
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&display=swap');        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html { scroll-behavior: smooth; }
//         body { background: #000; color: #fff; font-family: 'Cormorant Garamond', serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

//         /* ── ENVELOPE SCENE ── */
//         .lux-scene {
//           position: fixed; inset: 0; z-index: 9999;
//           background: radial-gradient(ellipse 90% 80% at 50% 40%, #1A1408 0%, #0A0803 55%, #040301 100%);
//           display: flex; flex-direction: column; align-items: center; justify-content: center;
//           padding: 20px; overflow: hidden;
//           transition: opacity 0.9s ease, visibility 0.9s ease;
//         }
//         .lux-scene.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

//         .lux-scene-corner {
//           position: absolute; width: min(180px, 22vw); height: min(180px, 22vw); opacity: 0.65; pointer-events: none;
//         }
//         .lux-scene-corner.tl { top: 0; left: 0; }
//         .lux-scene-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
//         .lux-scene-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
//         .lux-scene-corner.br { bottom: 0; right: 0; transform: scale(-1); }

//         .lux-scene-line {
//           position: absolute; left: 5%; right: 5%; height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(212,175,55,.22), transparent);
//           pointer-events: none;
//         }
//         .lux-scene-line.top { top: 10%; }
//         .lux-scene-line.bottom { bottom: 10%; }

//         /* Crown */
//         .scene-crown { animation: fadeUp 0.6s ease both; margin-bottom: 6px; }
//         .scene-subtitle {
//           font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
//           letter-spacing: .36em; text-transform: uppercase; color: rgba(212,175,55,.65);
//           margin-bottom: 14px; animation: fadeUp 0.7s ease both 0.05s;
//         }
//         .scene-names {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(26px, 4vw, 48px); font-weight: 300; font-style: italic;
//           color: #F5D678; text-align: center; line-height: 1.15;
//           animation: fadeUp 0.8s ease both 0.1s; margin-bottom: 18px;
//           text-shadow: 0 0 40px rgba(212,175,55,.3);
//         }
//         .scene-names strong { font-weight: 600; font-style: normal; color: #F5E6A8; }
//         .scene-names span { color: rgba(212,175,55,.5); font-weight: 300; font-size: .75em; display: inline; margin: 0 8px; letter-spacing: .2em; font-style: normal; }

//         /* Envelope */
//         .envelope-wrap {
//           position: relative;
//           width: clamp(260px, 42vw, 500px);
//           cursor: pointer; user-select: none;
//           filter: drop-shadow(0 40px 80px rgba(0,0,0,.7));
//           animation: envFloat 5s ease-in-out infinite, fadeUp 0.9s ease both 0.18s;
//           transition: transform 0.2s ease;
//         }
//         .envelope-wrap:hover { transform: translateY(-4px); }
//         .envelope-shadow {
//           position: absolute; bottom: -18px; left: 8%; right: 8%; height: 22px;
//           background: radial-gradient(ellipse, rgba(212,175,55,.18) 0%, transparent 70%);
//           filter: blur(10px); z-index: 0;
//         }

//         /* Letter inside envelope */
//         .envelope-letter {
//           position: absolute; left: 8%; right: 8%; bottom: 4%; height: 62%; z-index: 2;
//           background: linear-gradient(170deg, #1A1408 0%, #0D0A04 100%);
//           border: 1px solid rgba(212,175,55,.35); border-radius: 4px;
//           display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
//           box-shadow: 0 2px 8px rgba(0,0,0,.4); overflow: hidden;
//           transform: translateY(0);
//           transition: transform 1.4s cubic-bezier(.22,.1,.2,1) .2s, box-shadow 1.4s ease .2s, z-index 0s .2s;
//         }
//         .envelope-letter.opening {
//           transform: translateY(-148%) scale(1.06) rotate(-0.6deg);
//           box-shadow: 0 40px 100px rgba(0,0,0,.9), 0 0 60px rgba(212,175,55,.2);
//           z-index: 30;
//         }
//         .letter-lines {
//           position: absolute; inset: 0; opacity: .07;
//           background-image: repeating-linear-gradient(0deg, #D4AF37 0, #D4AF37 1px, transparent 1px, transparent 32px);
//         }
//         .letter-border { position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 1px solid rgba(212,175,55,.2); border-radius: 2px; }
//         .letter-content { text-align: center; padding: 0 20px; position: relative; z-index: 1; }
//         .letter-couple {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(14px, 2.4vw, 24px); font-style: italic; font-weight: 300;
//           color: #D4AF37; line-height: 1.2; letter-spacing: .04em;
//         }
//         .letter-divider {
//           width: 40px; height: 1px;
//           background: linear-gradient(90deg, transparent, #D4AF37, transparent);
//           margin: 8px auto;
//         }
//         .letter-date {
//           font-family: 'Cinzel', serif; font-size: clamp(7px, .9vw, 9px);
//           letter-spacing: .3em; text-transform: uppercase; color: rgba(212,175,55,.7); font-weight: 400;
//         }

//         /* Envelope body */
//         .envelope-body { width: 100%; padding-top: 60%; position: relative; z-index: 5; }
//         .envelope-inner {
//           position: absolute; inset: 0;
//           background: #0A0803; border-radius: 6px;
//           border: 1px solid rgba(212,175,55,.28);
//           box-shadow: 0 8px 40px rgba(0,0,0,.8), inset 0 1px 0 rgba(212,175,55,.15);
//           overflow: hidden;
//         }
//         .env-noise {
//           position: absolute; inset: 0; opacity: .06;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='.012' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
//         }
//         .env-left { position: absolute; top: 0; bottom: 0; left: 0; width: 50%; background: linear-gradient(160deg, #0E0C06, #080602); clip-path: polygon(0 0,0 100%,100% 100%); }
//         .env-right { position: absolute; top: 0; bottom: 0; right: 0; width: 50%; background: linear-gradient(200deg, #0E0C06, #080602); clip-path: polygon(100% 0,0 100%,100% 100%); }
//         .env-bottom { position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, #0C0A04, #070601); clip-path: polygon(0 100%,50% 0,100% 100%); }
//         .env-top-line { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.4), transparent); }

//         /* Seal */
//         .envelope-seal {
//           position: absolute; top: 50%; left: 50%;
//           transform: translate(-50%, -52%);
//           width: clamp(50px, 9vw, 80px); height: clamp(50px, 9vw, 80px);
//           background: radial-gradient(circle at 35% 35%, #F5D678 0%, #D4AF37 40%, #8B6914 100%);
//           border-radius: 50%; border: 2px solid rgba(245,214,120,.5);
//           display: flex; align-items: center; justify-content: center;
//           box-shadow: 0 0 0 6px rgba(212,175,55,.08), 0 0 0 12px rgba(212,175,55,.04), 0 8px 30px rgba(0,0,0,.8);
//           z-index: 10; transition: opacity .25s;
//         }
//         .envelope-seal.opening { opacity: 0; }
//         .seal-ring-outer {
//           position: absolute; inset: -8px; border: 1px solid rgba(212,175,55,.3);
//           border-radius: 50%; border-style: dashed; animation: lux-spin 30s linear infinite;
//         }
//         .seal-ring-inner { position: absolute; inset: -14px; border: 1px solid rgba(212,175,55,.12); border-radius: 50%; }
//         .seal-text {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(12px, 2vw, 19px); font-style: italic; color: #0A0803; font-weight: 600;
//           position: relative; z-index: 1;
//         }

//         /* Flap */
//         .envelope-flap {
//           position: absolute; top: 0; left: 0; right: 0; z-index: 8; height: 52%;
//           background: linear-gradient(160deg, #14100A, #0A0803);
//           clip-path: polygon(0 0,100% 0,50% 100%);
//           transform-origin: top center;
//           transform: perspective(800px) rotateX(0deg);
//           transition: transform 1.05s cubic-bezier(.4,0,.2,1);
//           border-bottom: 1px solid rgba(212,175,55,.25);
//         }
//         .envelope-flap.opening { transform: perspective(800px) rotateX(192deg); }
//         .flap-sheen { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(212,175,55,.08) 0%, transparent 50%); }

//         /* Open hint */
//         .open-hint {
//           font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
//           letter-spacing: .28em; text-transform: uppercase; color: rgba(212,175,55,.55);
//           animation: fadeUp 1s ease both .35s, lux-pulse 3s ease-in-out infinite 1.3s;
//           margin-top: 14px;
//         }
//         .open-hint.opening { animation: none; opacity: .8; }

//         /* ── GOLD DIVIDER ── */
//         .gold-divider {
//           display: flex; align-items: center; width: 100%; max-width: 440px; margin: 28px auto;
//         }
//         .gold-divider-line-l { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.6)); }
//         .gold-divider-line-r { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(212,175,55,.6), transparent); }

//         /* ── MAIN INVITATION ── */
//         .lux-invitation {
//           background: #000; color: #fff; text-align: center;
//           font-family: 'Cormorant Garamond', serif;
//           overflow-x: hidden; overflow-y: auto;
//           opacity: 0; transition: opacity 0.7s ease 0.1s;
//           min-height: 100vh;
//         }
//         .lux-invitation.visible { opacity: 1; }

//         /* Hero */
//         .lux-hero {
//           min-height: 100vh; display: flex; flex-direction: column;
//           justify-content: center; padding: clamp(40px, 8vw, 80px) 20px;
//           border-bottom: 1px solid rgba(212,175,55,.15);
//           position: relative; overflow: hidden;
//         }
//         .hero-bg-grad {
//           position: absolute; inset: 0; pointer-events: none;
//           background: radial-gradient(ellipse 80% 70% at 50% 40%, #1A1408 0%, #0A0803 55%, #000 100%);
//         }
//         .hero-corner { position: absolute; width: min(160px, 20vw); height: min(160px, 20vw); opacity: .6; pointer-events: none; }
//         .hero-corner.tl { top: 0; left: 0; }
//         .hero-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
//         .hero-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
//         .hero-corner.br { bottom: 0; right: 0; transform: scale(-1); }

//         .hero-inner { position: relative; z-index: 2; }
//         .hero-crown { display: flex; justify-content: center; margin-bottom: 8px; }
//         .hero-eyebrow {
//           font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
//           letter-spacing: .36em; text-transform: uppercase; color: rgba(212,175,55,.65); margin-bottom: 16px;
//         }
//         .hero-names {
//           font-size: clamp(52px, 10vw, 100px); font-weight: 600; font-style: italic;
//           color: #F5E6A8; line-height: .92; letter-spacing: -.01em;
//           text-shadow: 0 0 60px rgba(212,175,55,.25); margin-bottom: 4px;
//         }
//         .hero-amp {
//           font-family: 'Cinzel', serif; font-size: clamp(14px, 2vw, 22px);
//           font-weight: 400; color: rgba(212,175,55,.6); margin: 8px 0; letter-spacing: .3em; display: block;
//         }
//         .hero-sub {
//           font-size: clamp(14px, 1.8vw, 18px); font-style: italic; font-weight: 300;
//           color: rgba(245,230,168,.55); margin-top: 16px; letter-spacing: .06em;
//         }
//         .hero-extra { opacity: 0.75; margin-top: 10px; font-size: clamp(13px, 1.6vw, 16px); font-style: italic; color: rgba(245,214,120,.6); }

//         /* Details section */
//         .lux-details { padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px); }
//         .lux-info-box {
//           border: 1px solid rgba(212,175,55,.2); padding: clamp(32px, 5vw, 48px) clamp(20px, 4vw, 32px);
//           max-width: 560px; margin: 0 auto 40px auto; background: #0a0a0a;
//           border-radius: 4px; position: relative;
//         }
//         .info-box-corner {
//           position: absolute; width: 14px; height: 14px;
//           border-color: rgba(212,175,55,.3);
//         }
//         .info-box-corner.tl { top: 8px; left: 8px; border-top: 1px solid; border-left: 1px solid; }
//         .info-box-corner.tr { top: 8px; right: 8px; border-top: 1px solid; border-right: 1px solid; }
//         .info-box-corner.bl { bottom: 8px; left: 8px; border-bottom: 1px solid; border-left: 1px solid; }
//         .info-box-corner.br { bottom: 8px; right: 8px; border-bottom: 1px solid; border-right: 1px solid; }

//         .gold-heading {
//           color: #d4af37; letter-spacing: 4px; margin-bottom: 20px;
//           font-family: 'Cinzel', serif; font-size: clamp(12px, 1.4vw, 14px);
//         }
//         .event-date { font-size: clamp(18px, 3vw, 28px); margin: 4px 0; }
//         .event-time { font-size: clamp(13px, 1.6vw, 16px); opacity: 0.7; margin: 4px 0; }
//         .event-location { margin: 16px 0; font-weight: 600; font-size: clamp(14px, 1.8vw, 18px); color: rgba(245,230,168,.9); }
//         .nav-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
//         .btn-gold {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 10px 22px; border: 1px solid #d4af37;
//           color: #d4af37; text-decoration: none; font-size: clamp(9px, 1.1vw, 11px);
//           font-family: 'Cinzel', serif; letter-spacing: .14em; text-transform: uppercase;
//           transition: background .2s, color .2s; border-radius: 2px; margin-top: 8px;
//         }
//         .btn-gold:hover { background: rgba(212,175,55,.12); }
//         .btn-gold-solid {
//           display: inline-flex; align-items: center; justify-content: center; gap: 6px;
//           padding: 13px 28px; border-radius: 4px;
//           background: linear-gradient(135deg, #8B6914 0%, #D4AF37 45%, #F5D678 55%, #D4AF37 70%, #8B6914 100%);
//           color: #0A0803; text-decoration: none; font-size: clamp(10px, 1.2vw, 12px);
//           font-family: 'Cinzel', serif; letter-spacing: .18em; text-transform: uppercase;
//           font-weight: 700; cursor: pointer; border: none;
//           box-shadow: 0 8px 32px rgba(212,175,55,.3); transition: transform .2s, box-shadow .2s;
//           position: relative; overflow: hidden;
//         }
//         .btn-gold-solid::after {
//           content: ''; position: absolute; inset: 0;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
//           background-size: 350px 100%; animation: shimmer 3s linear infinite;
//         }
//         .btn-gold-solid:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(212,175,55,.5); }
//         .btn-gold-solid span { position: relative; z-index: 1; }

//         /* Story */
//         .lux-story { padding: clamp(40px, 8vw, 80px) 20px; max-width: 620px; margin: 0 auto; }
//         .story-text { font-style: italic; font-size: clamp(15px, 1.8vw, 19px); line-height: 1.9; color: rgba(245,230,168,.8); }

//         /* Menu button section */
//         .menu-btn-section { padding: 40px 20px; text-align: center; }

//         /* Accommodation/Transport icons */
//         .extras-icons { display: flex; gap: 30px; justify-content: center; padding: 20px; margin-top: 20px; }

//         /* RSVP section */
//         .lux-rsvp { padding: clamp(60px, 10vw, 100px) 20px; background: #080808; }
//         .rsvp-inner { max-width: 520px; margin: 0 auto; }

//         /* Footer */
//         .lux-footer { padding: clamp(30px, 6vw, 60px); opacity: .4; font-size: .7rem; font-family: 'Cinzel', serif; letter-spacing: .1em; }

//         /* ── MODAL OVERLAY ── */
//         .lux-modal-overlay {
//           position: fixed; inset: 0; z-index: 500;
//           background: rgba(0,0,0,.85); backdrop-filter: blur(14px);
//           display: flex; align-items: center; justify-content: center;
//           padding: clamp(12px, 3vw, 24px); overflow-y: auto;
//           animation: fadeIn .28s ease;
//           -webkit-overflow-scrolling: touch;
//         }
//         .lux-modal {
//           background: linear-gradient(170deg, #1A1408, #0A0803);
//           border: 1px solid rgba(212,175,55,.25); border-radius: 20px;
//           padding: clamp(24px, 4vw, 40px) clamp(18px, 4vw, 32px);
//           max-width: 520px; width: 100%;
//           box-shadow: 0 40px 100px rgba(0,0,0,.9), 0 0 60px rgba(212,175,55,.1);
//           animation: slideUp .32s cubic-bezier(.4,0,.2,1);
//           max-height: 92vh; overflow-y: auto; position: relative;
//           -webkit-overflow-scrolling: touch;
//           padding-bottom: max(clamp(24px, 4vw, 40px), env(safe-area-inset-bottom));
//         }
//         .modal-top-line {
//           position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent);
//         }
//         .modal-close-btn {
//           position: absolute; top: 14px; right: 14px;
//           background: rgba(212,175,55,.1); border: 1px solid rgba(212,175,55,.25);
//           border-radius: 50%; width: 32px; height: 32px;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; color: rgba(212,175,55,.7); font-size: 16px;
//           transition: background .2s; z-index: 10; font-family: serif;
//         }
//         .modal-close-btn:hover { background: rgba(212,175,55,.2); }
//         .modal-heading {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(24px, 3.5vw, 32px); font-style: italic; font-weight: 300;
//           color: #F5E6A8; margin-bottom: 8px; text-align: center;
//         }
//         .modal-eyebrow {
//           font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
//           letter-spacing: .36em; text-transform: uppercase; color: rgba(212,175,55,.55);
//           margin-bottom: 8px; text-align: center;
//         }
//         .modal-divider { width: 36px; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent); margin: 0 auto 16px; }

//         /* Menu modal items */
//         .menu-cat-title {
//           color: #fff; font-size: clamp(12px, 1.5vw, 15px); margin: 0;
//           font-weight: 300; letter-spacing: 2px; font-family: 'Cinzel', serif;
//         }
//         .menu-cat-header {
//           display: inline-block; border-bottom: 1px solid rgba(212,175,55,.3);
//           padding-bottom: 10px; margin-bottom: 20px;
//         }
//         .menu-item-name { color: #d4af37; font-size: clamp(14px, 1.8vw, 18px); }
//         .menu-item-desc { font-size: clamp(11px, 1.3vw, 13px); opacity: .6; font-style: italic; margin-top: 4px; }

//         /* Gallery */
//         .gallery-section { padding: clamp(32px, 6vw, 60px) 20px; border-top: 1px solid rgba(212,175,55,.08); text-align: center; }
//         .gallery-hint { font-size: clamp(10px, 1.2vw, 12px); opacity: .65; margin-bottom: 20px; font-style: italic; }
//         .gallery-btn {
//           display: inline-block; padding: clamp(13px,2vw,17px) clamp(28px,4vw,44px);
//           background: #d4af37; color: #000; border-radius: 4px; font-weight: bold;
//           text-decoration: none; font-family: 'Cinzel', serif; font-size: clamp(10px, 1.2vw, 12px);
//           letter-spacing: .14em; text-transform: uppercase;
//           box-shadow: 0 8px 28px rgba(212,175,55,.3); transition: transform .2s, box-shadow .2s;
//         }
//         .gallery-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.5); }

//         /* ── ANIMATIONS ── */
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes envFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
//         @keyframes lux-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         @keyframes lux-pulse { 0%,100% { opacity: .45; } 50% { opacity: .9; } }
//         @keyframes shimmer { 0% { background-position: -350px 0; } 100% { background-position: 350px 0; } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes slideUp { from { opacity: 0; transform: scale(.93) translateY(18px); } to { opacity: 1; transform: scale(1) translateY(0); } }

//         /* ── RESPONSIVE ── */
//         @media (max-width: 480px) {
//           .hero-names { font-size: clamp(44px, 14vw, 72px); }
//           .lux-modal { max-height: 88vh; border-radius: 16px; }
//         }
//       `}</style>

//       {/* ══════════════════════════════════════
//           ENVELOPE SCENE
//       ══════════════════════════════════════ */}
//       <div id="lux-scene" className="lux-scene">
//         {/* Corner decorations */}
//         <svg className="lux-scene-corner tl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg1)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg1)" strokeWidth=".7" strokeOpacity=".6"/><path d="M8 50 L22 50 M8 70 L16 70" stroke="url(#dg1)" strokeWidth=".8"/><path d="M50 8 L50 22 M70 8 L70 16" stroke="url(#dg1)" strokeWidth=".8"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg1)" fillOpacity=".8"/><defs><linearGradient id="dg1" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
//         <svg className="lux-scene-corner tr" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg2)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg2)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg2)" fillOpacity=".8"/><defs><linearGradient id="dg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
//         <svg className="lux-scene-corner bl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg3)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg3)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg3)" fillOpacity=".8"/><defs><linearGradient id="dg3" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
//         <svg className="lux-scene-corner br" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg4)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg4)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg4)" fillOpacity=".8"/><defs><linearGradient id="dg4" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
//         <div className="lux-scene-line top"/>
//         <div className="lux-scene-line bottom"/>

//         {/* Crown */}
//         <div className="scene-crown">
//           <svg viewBox="0 0 120 60" fill="none" style={{width:72,height:36}}>
//             <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#cg1)" strokeWidth="1.4" strokeLinejoin="round"/>
//             <circle cx="60" cy="5" r="3.5" fill="url(#cg1)"/>
//             <circle cx="30" cy="40" r="2.5" fill="url(#cg1)"/>
//             <circle cx="90" cy="40" r="2.5" fill="url(#cg1)"/>
//             <path d="M4 50 L116 50" stroke="url(#cg1)" strokeWidth="1"/>
//             <defs><linearGradient id="cg1" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B6914"/><stop offset="40%" stopColor="#D4AF37"/><stop offset="60%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914"/></linearGradient></defs>
//           </svg>
//         </div>
//         <p className="scene-subtitle">Invitație de Nuntă</p>
//         <h1 className="scene-names">
//           <strong>{s.bride_name}</strong>
//           <span>&amp;</span>
//           <strong>{s.groom_name}</strong>
//         </h1>

//         {/* Envelope */}
//         <div className="envelope-wrap" id="envelope-wrap" role="button" tabIndex={0} aria-label="Deschide invitația">
//           <div className="envelope-shadow"/>
//           {/* Letter */}
//           <div className="envelope-letter" id="envelope-letter">
//             <div className="letter-lines"/>
//             <div className="letter-border"/>
//             <div className="letter-content">
//               <p className="letter-couple">{s.bride_name} &amp; {s.groom_name}</p>
//               <div className="letter-divider"/>
//               <p className="letter-date">
//                 {s.wedding_date ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
//               </p>
//             </div>
//           </div>
//           {/* Body */}
//           <div className="envelope-body">
//             <div className="envelope-inner">
//               <div className="env-noise"/>
//               <div className="env-left"/>
//               <div className="env-right"/>
//               <div className="env-bottom"/>
//               <div className="env-top-line"/>
//             </div>
//             {/* Seal */}
//             <div className="envelope-seal" id="envelope-seal">
//               <div className="seal-ring-outer"/>
//               <div className="seal-ring-inner"/>
//               <span className="seal-text">{brideInitial}&amp;{groomInitial}</span>
//             </div>
//             {/* Flap */}
//             <div className="envelope-flap" id="envelope-flap">
//               <div className="flap-sheen"/>
//             </div>
//           </div>
//         </div>

//         <p className="open-hint" id="open-hint">Atinge pentru a deschide</p>
//       </div>

//       {/* ══════════════════════════════════════
//           MAIN INVITATION
//       ══════════════════════════════════════ */}
//       <div className="lux-invitation" id="lux-invitation">

//         {/* HERO */}
//         <section className="lux-hero">
//           <div className="hero-bg-grad"/>
//           <svg className="hero-corner tl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#hdg1)" strokeWidth="1.2"/><defs><linearGradient id="hdg1" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
//           <svg className="hero-corner tr" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#hdg2)" strokeWidth="1.2"/><defs><linearGradient id="hdg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
//           <div className="hero-inner">
//             <div className="hero-crown">
//               <svg viewBox="0 0 120 60" fill="none" style={{width:72,height:36}}>
//                 <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#hcg)" strokeWidth="1.4" strokeLinejoin="round"/>
//                 <circle cx="60" cy="5" r="3.5" fill="url(#hcg)"/>
//                 <circle cx="30" cy="40" r="2.5" fill="url(#hcg)"/>
//                 <circle cx="90" cy="40" r="2.5" fill="url(#hcg)"/>
//                 <path d="M4 50 L116 50" stroke="url(#hcg)" strokeWidth="1"/>
//                 <defs><linearGradient id="hcg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B6914"/><stop offset="40%" stopColor="#D4AF37"/><stop offset="60%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914"/></linearGradient></defs>
//               </svg>
//             </div>
//             <p className="hero-eyebrow">VĂ INVITĂM</p>
//             <div className="hero-names">{s.bride_name}</div>
//             <span className="hero-amp">&amp;</span>
//             <div className="hero-names">{s.groom_name}</div>

//             <div className="gold-divider" style={{margin:'20px auto'}}>
//               <div className="gold-divider-line-l"/>
//               <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
//                 <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/>
//                 <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/>
//                 <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
//                 <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
//               </svg>
//               <div className="gold-divider-line-r"/>
//             </div>

//             <div className="hero-extra">
//               <p>Alături de nașii: {s.nasi_names}</p>
//               <p>Împreună cu părinții: {s.parents_names}</p>
//             </div>

//             {s.wedding_date && <Countdown targetDate={s.wedding_date} />}
//           </div>
//         </section>

//         {/* DETAILS */}
//         <section className="lux-details">

//           {/* Party box */}
//           <div className="lux-info-box">
//             <div className="info-box-corner tl"/><div className="info-box-corner tr"/>
//             <div className="info-box-corner bl"/><div className="info-box-corner br"/>
//             <h3 className="gold-heading">PETRECEREA</h3>
//             <p className="event-date">
//               {s.wedding_date ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data nesetată'}
//             </p>
//             <p className="event-time">Ora {s.wedding_time || '--:--'}</p>
//             <p className="event-location">{s.location_name}</p>
//             <div className="nav-btns">
//               {s.waze_url && <a href={s.waze_url} target="_blank" className="btn-gold">WAZE</a>}
//               {s.google_maps_url && <a href={s.google_maps_url} target="_blank" className="btn-gold">GOOGLE MAPS</a>}
//             </div>
//           </div>

//           {/* Religious box */}
//           {s.is_religious_active && (
//             <div className="lux-info-box">
//               <div className="info-box-corner tl"/><div className="info-box-corner tr"/>
//               <div className="info-box-corner bl"/><div className="info-box-corner br"/>
//               <h3 className="gold-heading">CUNUNIA RELIGIOASĂ</h3>
//               <p className="event-date">{s.religious_date ? new Date(s.religious_date).toLocaleDateString('ro-RO') : ''}</p>
//               <p className="event-time">Ora {s.religious_time}</p>
//               <p className="event-location">{s.religious_location}</p>
//               {s.religious_waze && (
//                 <div className="nav-btns">
//                   <a href={s.religious_waze} target="_blank" className="btn-gold">WAZE BISERICĂ</a>
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="gold-divider"><div className="gold-divider-line-l"/><svg viewBox="0 0 60 20" width="60" height="20" fill="none"><rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/><circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/><circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/><circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/></svg><div className="gold-divider-line-r"/></div>

//           {/* Story */}
//           {s.our_story && (
//             <div className="lux-story">
//               <p className="story-text">"{s.our_story}"</p>
//             </div>
//           )}

//           {/* ── MENU BUTTON ── */}
//           {s.is_menu_active && s.menu_details?.categories && (
//             <div className="menu-btn-section">
//               <h3 className="gold-heading" style={{marginBottom:16}}>MENIUL EVENIMENTULUI</h3>
//               <button
//                 className="btn-gold-solid"
//                 id="open-menu-modal"
//                 aria-label="Deschide meniu"
//               >
//                 <span>◆ Vezi Meniu ◆</span>
//               </button>
//             </div>
//           )}

//           {/* ── MENU MODAL ── */}
//           {s.is_menu_active && s.menu_details?.categories && (
//             <div className="lux-modal-overlay" id="menu-modal" style={{display:'none'}} role="dialog" aria-modal="true" aria-label="Meniu eveniment">
//               <div className="lux-modal" style={{maxWidth:600}}>
//                 <div className="modal-top-line"/>
//                 <button className="modal-close-btn" id="close-menu-modal" aria-label="Închide">✕</button>
//                 <div style={{textAlign:'center',marginBottom:28}}>
//                   <p className="modal-eyebrow">◆ Gastronomie ◆</p>
//                   <h2 className="modal-heading">Meniul Evenimentului</h2>
//                   <div className="modal-divider"/>
//                 </div>
//                 {s.menu_details.categories
//                   .filter((cat: any) => cat.active && cat.items && cat.items.length > 0)
//                   .map((cat: any, cIdx: number) => (
//                     <div key={cIdx} style={{marginBottom:36}}>
//                       <div className="menu-cat-header">
//                         <h4 className="menu-cat-title">
//                           <span style={{marginRight:10}}>{cat.emoji}</span>
//                           {cat.label}
//                         </h4>
//                       </div>
//                       <div style={{display:'flex',flexDirection:'column',gap:16}}>
//                         {cat.items.map((item: any, iIdx: number) => (
//                           <div key={iIdx}>
//                             <div className="menu-item-name">{item.name}</div>
//                             {item.description && (
//                               <div className="menu-item-desc">{item.description}</div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 <div style={{textAlign:'center',marginTop:24}}>
//                   <button className="btn-gold-solid" id="close-menu-modal-2" style={{minWidth:160}}>
//                     <span>◆ Închide ◆</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="gold-divider"><div className="gold-divider-line-l"/><svg viewBox="0 0 60 20" width="60" height="20" fill="none"><rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/><circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/><circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/><circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/></svg><div className="gold-divider-line-r"/></div>

//           {/* Gallery */}
//           {s.gallery_status === 'active' && s.photos_expires_at && new Date(s.photos_expires_at).getTime() > new Date().getTime() && (
//             <div className="gallery-section">
//               <h3 className="gold-heading">📸 GALERIE FOTO LIVE</h3>
//               <p className="gallery-hint">Împărtășește momentele surprinse de tine cu noi!</p>
//               <a href={`/invitatie/lux/${params.slug}/upload`} className="gallery-btn">
//                 ÎNCARCĂ POZE
//               </a>
//             </div>
//           )}

//           {/* Extras */}
//           {(s.is_accommodation_active || s.is_transport_active) && (
//             <div className="extras-icons">
//               {s.is_accommodation_active && <div style={{fontSize:'2.5rem'}} title="Cazare disponibilă">🏠</div>}
//               {s.is_transport_active && <div style={{fontSize:'2.5rem'}} title="Transport asigurat">🚌</div>}
//             </div>
//           )}
//         </section>

//         {/* ── RSVP SECTION ── */}
//         <section id="rsvp" className="lux-rsvp">
//           <div className="rsvp-inner" style={{textAlign:'center'}}>
//             <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,17px)',fontStyle:'italic',color:'rgba(212,175,55,.55)',marginBottom:20,lineHeight:1.7}}>
//               Vă rugăm să confirmați prezența Dvs.
//             </p>
//             <button
//               className="btn-gold-solid"
//               id="open-rsvp-modal"
//               style={{width:'100%',maxWidth:400,display:'block',margin:'0 auto',padding:'clamp(14px,2vw,18px) 0'}}
//               aria-label="Deschide formular RSVP"
//             >
//               <span>◆ Confirmă Prezența ◆</span>
//             </button>
//           </div>
//         </section>

//         {/* ── RSVP MODAL ── */}
//         <div className="lux-modal-overlay" id="rsvp-modal" style={{display:'none'}} role="dialog" aria-modal="true" aria-label="Confirmare prezenta">
//           <div className="lux-modal">
//             <div className="modal-top-line"/>
//             <button className="modal-close-btn" id="close-rsvp-modal" aria-label="Închide">✕</button>
//             <LuxRsvpForm
//               orderId={s.order_id}
//               showAccommodation={s.is_accommodation_active}
//               showTransport={s.is_transport_active}
//             />
//           </div>
//         </div>

//         <footer className="lux-footer">
//           Contact: {s.contact_phone_bride} / {s.contact_phone_groom}
//         </footer>
//       </div>

//       {/* ══════════════════════════════════════
//           CONTROLLER — UN SINGUR SCRIPT
//           State machine: cover → opening → invite
//           Compatibil cu: Chrome, Safari, FB/Messenger
//           in-app browser, iOS WebView, Android WebView
//       ══════════════════════════════════════ */}
//       <script dangerouslySetInnerHTML={{ __html: `
//         (function () {
//           'use strict';

//           /* ─── CONSTANTE ─── */
//           var AUTO_OPEN_MS = 2500;   /* ms până la deschidere automată */
//           var OPEN_ANIM_MS = 1700;   /* ms durată animație deschidere */

//           /* ─── STATE ─── */
//           var phase = 'idle'; /* idle | cover | opening | invite */
//           var autoTimer = null;
//           var countdownInterval = null;
//           var pollRaf = null;

//           /* ─── ELEMENTE ─── */
//           var scene, invite, envWrap, letter, flap, seal, hint;

//           /* ─────────────────────────────────────
//              grab() — preia elementele din DOM.
//              Returnează true doar când TOATE există.
//           ───────────────────────────────────── */
//           function grab() {
//             scene   = document.getElementById('lux-scene');
//             invite  = document.getElementById('lux-invitation');
//             envWrap = document.getElementById('envelope-wrap');
//             letter  = document.getElementById('envelope-letter');
//             flap    = document.getElementById('envelope-flap');
//             seal    = document.getElementById('envelope-seal');
//             hint    = document.getElementById('open-hint');
//             return !!(scene && invite && envWrap && letter && flap && seal && hint);
//           }

//           /* ─────────────────────────────────────
//              openEnvelope() — tranziție cover → invite.
//              Idempotentă: apeluri multiple sunt ignorate.
//           ───────────────────────────────────── */
//           function openEnvelope() {
//             if (phase !== 'cover') return;
//             phase = 'opening';

//             /* Oprește timere active */
//             if (autoTimer)       { clearTimeout(autoTimer);      autoTimer = null; }
//             if (countdownInterval){ clearInterval(countdownInterval); countdownInterval = null; }

//             /* Feedback vizual */
//             if (hint) { hint.className = 'open-hint opening'; hint.textContent = '◆  Dezvăluind invitația  ◆'; }

//             /* Animație plic */
//             if (flap) flap.classList.add('opening');
//             if (seal) seal.classList.add('opening');
//             setTimeout(function () { if (letter) letter.classList.add('opening'); }, 300);

//             /* Tranziție la invitație */
//             setTimeout(function () {
//               if (scene)  scene.classList.add('hidden');
//               if (invite) invite.classList.add('visible');
//               phase = 'invite';
//             }, OPEN_ANIM_MS);
//           }

//           /* ─────────────────────────────────────
//              startAutoOpen() — countdown vizual
//              + deschidere automată după AUTO_OPEN_MS.
//           ───────────────────────────────────── */
//           function startAutoOpen() {
//             var remaining = Math.round(AUTO_OPEN_MS / 1000);

//             /* Actualizează hint-ul în fiecare secundă */
//             countdownInterval = setInterval(function () {
//               remaining--;
//               if (hint && phase === 'cover') {
//                 hint.textContent = remaining > 0
//                   ? ('Atinge pentru a deschide · ' + remaining + 's')
//                   : 'Se deschide...';
//               }
//               if (remaining <= 0) {
//                 clearInterval(countdownInterval);
//                 countdownInterval = null;
//               }
//             }, 1000);

//             /* Deschidere automată */
//             autoTimer = setTimeout(function () {
//               if (phase === 'cover') openEnvelope();
//             }, AUTO_OPEN_MS);
//           }

//           /* ─────────────────────────────────────
//              attachEvents() — leagă click/touch/key.
//              Apelat o singură dată după grab().
//           ───────────────────────────────────── */
//           function attachEvents() {
//             /* Click pe plic sau pe toată scena */
//             function onUserOpen(e) {
//               if (e) e.stopPropagation();
//               if (phase === 'cover') openEnvelope();
//             }

//             envWrap.addEventListener('click', onUserOpen);
//             envWrap.addEventListener('touchend', function (e) {
//               e.preventDefault(); /* previne double-fire pe iOS */
//               onUserOpen(null);
//             }, { passive: false });
//             envWrap.addEventListener('keydown', function (e) {
//               if (e.key === 'Enter' || e.key === ' ') onUserOpen(null);
//             });

//             /* Fallback: click pe toată scena (in-app browser safety) */
//             scene.addEventListener('click', function () {
//               if (phase === 'cover') openEnvelope();
//             });

//             /* ── RSVP Modal ── */
//             var rsvpModal    = document.getElementById('rsvp-modal');
//             var openRsvpBtn  = document.getElementById('open-rsvp-modal');
//             var closeRsvpBtn = document.getElementById('close-rsvp-modal');

//             function openRsvp()  { if (rsvpModal) { rsvpModal.style.display = 'flex'; document.body.style.overflow = 'hidden'; } }
//             function closeRsvp() { if (rsvpModal) { rsvpModal.style.display = 'none';  document.body.style.overflow = ''; } }

//             if (openRsvpBtn)  openRsvpBtn.addEventListener('click', openRsvp);
//             if (closeRsvpBtn) closeRsvpBtn.addEventListener('click', closeRsvp);
//             if (rsvpModal)    rsvpModal.addEventListener('click', function (e) { if (e.target === rsvpModal) closeRsvp(); });

//             /* ── Menu Modal ── */
//             var menuModal     = document.getElementById('menu-modal');
//             var openMenuBtn   = document.getElementById('open-menu-modal');
//             var closeMenuBtn  = document.getElementById('close-menu-modal');
//             var closeMenuBtn2 = document.getElementById('close-menu-modal-2');

//             function openMenu()  { if (menuModal) { menuModal.style.display = 'flex'; document.body.style.overflow = 'hidden'; } }
//             function closeMenu() { if (menuModal) { menuModal.style.display = 'none';  document.body.style.overflow = ''; } }

//             if (openMenuBtn)   openMenuBtn.addEventListener('click', openMenu);
//             if (closeMenuBtn)  closeMenuBtn.addEventListener('click', closeMenu);
//             if (closeMenuBtn2) closeMenuBtn2.addEventListener('click', closeMenu);
//             if (menuModal)     menuModal.addEventListener('click', function (e) { if (e.target === menuModal) closeMenu(); });

//             /* Escape key */
//             document.addEventListener('keydown', function (e) {
//               if (e.key === 'Escape') { closeRsvp(); closeMenu(); }
//             });
//           }

//           /* ─────────────────────────────────────
//              pollUntilReady() — polling cu rAF.
//              Sigur pe orice browser/WebView:
//              nu depinde de readyState, nu face
//              setTimeout recursiv care poate fi
//              throttled în in-app browsers.
//           ───────────────────────────────────── */
//           function pollUntilReady() {
//             if (grab()) {
//               /* DOM complet — inițializăm */
//               phase = 'cover';
//               attachEvents();
//               startAutoOpen();
//             } else {
//               /* Mai așteptăm un frame */
//               pollRaf = requestAnimationFrame(pollUntilReady);
//             }
//           }

//           /* ─────────────────────────────────────
//              Boot — pornim polling-ul imediat.
//              Nu verificăm readyState intenționat:
//              rAF se execută numai când browserul
//              e gata să deseneze, deci DOM e sigur.
//           ───────────────────────────────────── */
//           requestAnimationFrame(pollUntilReady);

//         })();
//       `}} />
//     </>
//   );
// }
import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* ══════════════════════════════════════════════════════════════
   SSR METADATA — Facebook / Messenger / WhatsApp OG preview
   Se recalculează la fiecare request → mereu actualizat instant
══════════════════════════════════════════════════════════════ */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;
  if (!data || data.length === 0) return {};
  const s = data[0];

  const brideName  = s.bride_name  ?? '';
  const groomName  = s.groom_name  ?? '';
  const dateStr    = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const locationStr = s.location_name ?? '';

  const title       = `${brideName} & ${groomName} — Invitație de Nuntă`;
  const description = `Suntem fericiți să vă invităm la nunta noastră${dateStr ? ` pe ${dateStr}` : ''}${locationStr ? ` la ${locationStr}` : ''}. Confirmați prezența online!`;
  const url         = `https://vibeinvite.ro/invitatie/lux/${params.slug}`;
  const ogImage     = s.og_image_url ?? 'https://vibeinvite.ro/og-lux.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'VibeInvite',
      type:     'website',
      locale:   'ro_RO',
      images:   [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      [ogImage],
    },
    alternates: { canonical: url },
  };
}

/* ══════════════════════════════════════════════════════════════
   PAGE — Server Component
   Preia datele din DB și le pasează clientului serializat.
══════════════════════════════════════════════════════════════ */
export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;
  if (!data || data.length === 0) notFound();
  const s = data[0];

  await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE id = ${s.id}`;

  const settings = {
    id:                      s.id,
    bride_name:              s.bride_name               ?? '',
    groom_name:              s.groom_name               ?? '',
    wedding_date:            s.wedding_date              ? new Date(s.wedding_date).toISOString()  : null,
    wedding_time:            s.wedding_time              ?? '',
    location_name:           s.location_name             ?? '',
    waze_url:                s.waze_url                  ?? '',
    google_maps_url:         s.google_maps_url           ?? '',
    nasi_names:              s.nasi_names                ?? '',
    parents_names:           s.parents_names             ?? '',
    our_story:               s.our_story                 ?? '',
    contact_phone_bride:     s.contact_phone_bride       ?? '',
    contact_phone_groom:     s.contact_phone_groom       ?? '',
    is_religious_active:     !!s.is_religious_active,
    religious_date:          s.religious_date            ? new Date(s.religious_date).toISOString() : null,
    religious_time:          s.religious_time            ?? '',
    religious_location:      s.religious_location        ?? '',
    religious_waze:          s.religious_waze            ?? '',
    is_menu_active:          !!s.is_menu_active,
    menu_details:            s.menu_details              ?? null,
    is_accommodation_active: !!s.is_accommodation_active,
    is_transport_active:     !!s.is_transport_active,
    gallery_status:          s.gallery_status            ?? '',
    photos_expires_at:       s.photos_expires_at         ? new Date(s.photos_expires_at).toISOString() : null,
    order_id:                s.order_id                  ?? '',
    slug:                    params.slug,
  };

  return <LuxInvitation settings={settings} />;
}

/* ══════════════════════════════════════════════════════════════
   CLIENT COMPONENTS
══════════════════════════════════════════════════════════════ */
'use client';

import { useState, useEffect, useCallback } from 'react';
import LuxRsvpForm from './LuxRsvpForm';

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
interface Settings {
  id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string | null;
  wedding_time: string;
  location_name: string;
  waze_url: string;
  google_maps_url: string;
  nasi_names: string;
  parents_names: string;
  our_story: string;
  contact_phone_bride: string;
  contact_phone_groom: string;
  is_religious_active: boolean;
  religious_date: string | null;
  religious_time: string;
  religious_location: string;
  religious_waze: string;
  is_menu_active: boolean;
  menu_details: any;
  is_accommodation_active: boolean;
  is_transport_active: boolean;
  gallery_status: string;
  photos_expires_at: string | null;
  order_id: string;
  slug: string;
}

type Phase = 'envelope' | 'opening' | 'invite';

/* ══════════════════════════════════════════════════════════════
   COUNTDOWN HOOK
══════════════════════════════════════════════════════════════ */
function useCountdown(isoDate: string | null) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!isoDate) return;
    const ms = new Date(isoDate).getTime();
    const tick = () => {
      const diff = ms - Date.now();
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isoDate]);
  return t;
}
const pad = (n: number) => String(n).padStart(2, '0');

/* ══════════════════════════════════════════════════════════════
   SVG HELPERS
══════════════════════════════════════════════════════════════ */
const CrownSVG = ({ size = 80 }: { size?: number }) => (
  <svg viewBox="0 0 120 60" fill="none" style={{ width: size, height: size * 0.5 }}>
    <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#cg)" strokeWidth="1.4" strokeLinejoin="round"/>
    <circle cx="60" cy="5" r="3.5" fill="url(#cg)"/>
    <circle cx="30" cy="40" r="2.5" fill="url(#cg)"/>
    <circle cx="90" cy="40" r="2.5" fill="url(#cg)"/>
    <circle cx="10" cy="20" r="2" fill="url(#cg)"/>
    <circle cx="110" cy="20" r="2" fill="url(#cg)"/>
    <path d="M4 50 L116 50" stroke="url(#cg)" strokeWidth="1"/>
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B6914"/>
        <stop offset="40%" stopColor="#D4AF37"/>
        <stop offset="60%" stopColor="#F5D678"/>
        <stop offset="100%" stopColor="#8B6914"/>
      </linearGradient>
    </defs>
  </svg>
);

const ArtDecoCorner = ({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) => (
  <svg viewBox="0 0 160 160" fill="none" style={{ transform: `scale(${flip ? -1 : 1},${flipY ? -1 : 1})`, width: '100%', height: '100%' }}>
    <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg)" strokeWidth="1.2"/>
    <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg)" strokeWidth=".7" strokeOpacity=".6"/>
    <path d="M28 28 L28 80 M28 28 L80 28" stroke="url(#dg)" strokeWidth=".5" strokeOpacity=".4"/>
    <path d="M8 50 L22 50 M8 70 L16 70 M8 90 L16 90" stroke="url(#dg)" strokeWidth=".8"/>
    <path d="M50 8 L50 22 M70 8 L70 16 M90 8 L90 16" stroke="url(#dg)" strokeWidth=".8"/>
    <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg)" fillOpacity=".8"/>
    <rect x="13" y="13" width="7" height="7" transform="rotate(45 18 18)" fill="none" stroke="url(#dg)" strokeWidth=".8" strokeOpacity=".5"/>
    <defs>
      <linearGradient id="dg" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4AF37"/>
        <stop offset="50%" stopColor="#F5D678"/>
        <stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/>
      </linearGradient>
    </defs>
  </svg>
);

const GoldDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 440 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.6))' }}/>
    <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
      <path d="M5 10 L20 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
      <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
      <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/>
      <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/>
      <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
      <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
    </svg>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.6),transparent)' }}/>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MODAL WRAPPER — cu buton back/close și full-screen pe mobile
══════════════════════════════════════════════════════════════ */
function LuxModal({ onClose, children, label }: { onClose: () => void; children: React.ReactNode; label: string }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(10px,3vw,24px)', overflowY: 'auto',
        animation: 'lux-fadeIn .28s ease',
        WebkitOverflowScrolling: 'touch' as any,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(170deg,#1A1408,#0A0803)',
          border: '1px solid rgba(212,175,55,.28)',
          borderRadius: 'clamp(12px,2vw,20px)',
          padding: 'clamp(20px,4vw,40px) clamp(16px,4vw,32px)',
          maxWidth: 520, width: '100%',
          boxShadow: '0 40px 100px rgba(0,0,0,.95),0 0 60px rgba(212,175,55,.12)',
          animation: 'lux-slideUp .32s cubic-bezier(.4,0,.2,1)',
          maxHeight: '92vh', overflowY: 'auto', position: 'relative',
          WebkitOverflowScrolling: 'touch' as any,
          paddingBottom: 'max(clamp(20px,4vw,40px), env(safe-area-inset-bottom))',
        }}
      >
        {/* Top gold line */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)' }}/>

        {/* Back / Close button */}
        <button
          onClick={onClose}
          aria-label="Înapoi"
          style={{
            position: 'absolute', top: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.25)',
            borderRadius: 100, padding: '6px 14px 6px 10px',
            color: '#D4AF37', cursor: 'pointer',
            fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.14em',
            textTransform: 'uppercase', transition: 'background .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,175,55,.1)')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Înapoi
        </button>

        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ENVELOPE SCREEN
══════════════════════════════════════════════════════════════ */
function EnvelopeScreen({ s, phase, onOpen }: { s: Settings; phase: Phase; onOpen: () => void }) {
  const bi = s.bride_name.charAt(0).toUpperCase() || 'M';
  const gi = s.groom_name.charAt(0).toUpperCase() || 'I';
  const dateLabel = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const isOpening = phase === 'opening';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      background: 'radial-gradient(ellipse 90% 80% at 50% 40%,#1A1408 0%,#0A0803 55%,#040301 100%)',
      transition: 'opacity 0.9s ease, visibility 0.9s ease',
      opacity: isOpening ? 1 : 1,
    }}>
      {/* Art Deco corners */}
      {([['tl',false,false],['tr',true,false],['bl',false,true],['br',true,true]] as const).map(([k,fx,fy])=>(
        <div key={k} style={{
          position:'absolute',
          top: fy?'auto':0, bottom: fy?0:'auto',
          left: fx?'auto':0, right: fx?0:'auto',
          width:'min(200px,22vw)', height:'min(200px,22vw)',
          opacity:.7, pointerEvents:'none',
        }}>
          <ArtDecoCorner flip={fx} flipY={fy}/>
        </div>
      ))}
      <div style={{ position:'absolute', top:'10%', left:'5%', right:'5%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.22),transparent)', pointerEvents:'none'}}/>
      <div style={{ position:'absolute', bottom:'10%', left:'5%', right:'5%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.22),transparent)', pointerEvents:'none'}}/>

      <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'20px 24px' }}>
        {/* Crown */}
        <div style={{ animation:'lux-fadeUp .6s ease both', marginBottom:-2 }}><CrownSVG size={80}/></div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(9px,1vw,11px)', letterSpacing:'.38em', textTransform:'uppercase', color:'rgba(212,175,55,.7)', animation:'lux-fadeUp .7s ease both .05s' }}>
          Invitație de Nuntă
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(30px,4.5vw,54px)', fontWeight:300, fontStyle:'italic', color:'#F5D678', textAlign:'center', lineHeight:1.15, animation:'lux-fadeUp .8s ease both .12s', margin:0, textShadow:'0 0 40px rgba(212,175,55,.3)' }}>
          <strong style={{ fontWeight:600, fontStyle:'normal', color:'#F5E6A8' }}>{s.bride_name}</strong>
          <span style={{ color:'rgba(212,175,55,.5)', fontWeight:300, fontSize:'.75em', display:'block', margin:'2px 0', letterSpacing:'.2em', fontStyle:'normal' }}>&amp;</span>
          <strong style={{ fontWeight:600, fontStyle:'normal', color:'#F5E6A8' }}>{s.groom_name}</strong>
        </h1>

        {/* Envelope */}
        <div
          onClick={onOpen}
          role="button" tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen()}
          style={{
            animation: 'lux-envFloat 5s ease-in-out infinite, lux-fadeUp .9s ease both .2s',
            position: 'relative', width: 'clamp(270px,44vw,520px)',
            cursor: 'pointer', userSelect: 'none',
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,.7))',
          }}
        >
          <div style={{ position:'absolute', bottom:-20, left:'8%', right:'8%', height:24, background:'radial-gradient(ellipse,rgba(212,175,55,.18) 0%,transparent 70%)', filter:'blur(12px)', zIndex:0 }}/>

          {/* Letter */}
          <div style={{
            position:'absolute', left:'8%', right:'8%', bottom:'4%', height:'62%',
            zIndex: isOpening ? 30 : 2,
            background:'linear-gradient(170deg,#1A1408 0%,#0D0A04 100%)',
            border:'1px solid rgba(212,175,55,.35)', borderRadius:4,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10,
            boxShadow: isOpening ? '0 40px 100px rgba(0,0,0,.9),0 0 60px rgba(212,175,55,.2)' : '0 2px 8px rgba(0,0,0,.4)',
            transform: isOpening ? 'translateY(-145%) scale(1.06) rotate(-0.6deg)' : 'translateY(0)',
            transition: 'transform 1.4s cubic-bezier(.22,.1,.2,1) .2s,box-shadow 1.4s ease .2s',
            overflow: 'hidden',
          }}>
            <div style={{ position:'absolute', inset:0, opacity:.07, backgroundImage:'repeating-linear-gradient(0deg,#D4AF37 0,#D4AF37 1px,transparent 1px,transparent 32px)' }}/>
            <div style={{ position:'absolute', top:8, left:8, right:8, bottom:8, border:'1px solid rgba(212,175,55,.2)', borderRadius:2 }}/>
            <div style={{ textAlign:'center', padding:'0 20px', position:'relative', zIndex:1 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2.8vw,28px)', fontStyle:'italic', fontWeight:300, color:'#D4AF37', lineHeight:1.2 }}>
                {s.bride_name} &amp; {s.groom_name}
              </p>
              <div style={{ width:40, height:1, background:'linear-gradient(90deg,transparent,#D4AF37,transparent)', margin:'10px auto' }}/>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(7px,.9vw,9px)', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(212,175,55,.7)', fontWeight:400 }}>
                {dateLabel}
              </p>
            </div>
          </div>

          {/* Envelope body */}
          <div style={{ width:'100%', paddingTop:'60%', position:'relative', zIndex:5 }}>
            <div style={{ position:'absolute', inset:0, background:'#0A0803', borderRadius:6, border:'1px solid rgba(212,175,55,.28)', boxShadow:'0 8px 40px rgba(0,0,0,.8),inset 0 1px 0 rgba(212,175,55,.15)', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, bottom:0, left:0, width:'50%', background:'linear-gradient(160deg,#0E0C06,#080602)', clipPath:'polygon(0 0,0 100%,100% 100%)' }}/>
              <div style={{ position:'absolute', top:0, bottom:0, right:0, width:'50%', background:'linear-gradient(200deg,#0E0C06,#080602)', clipPath:'polygon(100% 0,0 100%,100% 100%)' }}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', background:'linear-gradient(180deg,#0C0A04,#070601)', clipPath:'polygon(0 100%,50% 0,100% 100%)' }}/>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)' }}/>
            </div>
            {/* Seal */}
            <div style={{
              position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-52%)',
              width:'clamp(54px,9vw,84px)', height:'clamp(54px,9vw,84px)',
              background:'radial-gradient(circle at 35% 35%,#F5D678 0%,#D4AF37 40%,#8B6914 100%)',
              borderRadius:'50%', border:'2px solid rgba(245,214,120,.5)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 0 6px rgba(212,175,55,.08),0 0 0 12px rgba(212,175,55,.04),0 8px 30px rgba(0,0,0,.8)',
              zIndex:10, opacity: isOpening ? 0 : 1, transition:'opacity .25s',
            }}>
              <div style={{ position:'absolute', inset:-8, border:'1px solid rgba(212,175,55,.3)', borderRadius:'50%', borderStyle:'dashed', animation:'lux-spin 30s linear infinite' }}/>
              <div style={{ position:'absolute', inset:-14, border:'1px solid rgba(212,175,55,.12)', borderRadius:'50%' }}/>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,2vw,20px)', fontStyle:'italic', color:'#0A0803', fontWeight:600, position:'relative', zIndex:1 }}>
                {bi}&amp;{gi}
              </span>
            </div>
            {/* Flap */}
            <div style={{
              position:'absolute', top:0, left:0, right:0, zIndex:8, height:'52%',
              background:'linear-gradient(160deg,#14100A,#0A0803)',
              clipPath:'polygon(0 0,100% 0,50% 100%)',
              transformOrigin:'top center',
              transform: isOpening ? 'perspective(800px) rotateX(192deg)' : 'perspective(800px) rotateX(0deg)',
              transition:'transform 1.05s cubic-bezier(.4,0,.2,1)',
              borderBottom:'1px solid rgba(212,175,55,.25)',
            }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,rgba(212,175,55,.08) 0%,transparent 50%)' }}/>
            </div>
          </div>
        </div>

        <p style={{
          fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,1vw,10px)',
          letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(212,175,55,.55)',
          animation: isOpening ? 'none' : 'lux-fadeUp 1s ease both .35s, lux-pulse 3s ease-in-out infinite 1.3s',
          opacity: isOpening ? .8 : undefined,
        }} id="open-hint">
          {isOpening ? '◆  Dezvăluind invitația  ◆' : 'Atinge pentru a deschide'}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INVITATION SCREEN — full design matching demo
══════════════════════════════════════════════════════════════ */
function InvitationScreen({ s }: { s: Settings }) {
  const [vis, setVis]             = useState(false);
  const [rsvpOpen, setRsvpOpen]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [flipS, setFlipS]         = useState(false);
  const cd = useCountdown(s.wedding_date);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { setFlipS(true); const t = setTimeout(() => setFlipS(false), 160); return () => clearTimeout(t); }, [cd.s]);

  const a = (delay: number): React.CSSProperties => ({
    opacity:    vis ? 1 : 0,
    transform:  vis ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
  });

  const weddingDateLabel = s.wedding_date
    ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : '';

  const religiousDateLabel = s.religious_date
    ? new Date(s.religious_date).toLocaleDateString('ro-RO', { day:'numeric', month:'long', year:'numeric' })
    : '';

  const galleryActive = s.gallery_status === 'active'
    && s.photos_expires_at
    && new Date(s.photos_expires_at).getTime() > Date.now();

  const locCards = [
    ...(s.is_religious_active ? [{
      type: 'Cununia Religioasă',
      name: 'Slujba Religioasă',
      venue: s.religious_location,
      time: s.religious_time,
      date: religiousDateLabel,
      waze: s.religious_waze,
      maps: '',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:20,height:20 }}>
          <path d="M12 2L12 6M10 4h4"/><rect x="4" y="9" width="16" height="12" rx="1"/>
          <path d="M9 21V14a3 3 0 0 1 6 0v7"/><path d="M4 9l8-4 8 4"/>
        </svg>
      ),
    }] : []),
    {
      type: 'Petrecerea',
      name: s.location_name,
      venue: s.location_name,
      time: s.wedding_time,
      date: weddingDateLabel,
      waze: s.waze_url,
      maps: s.google_maps_url,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:20,height:20 }}>
          <path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/>
          <path d="M5 12V4"/><path d="M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z"/>
          <path d="M17 10V6"/><path d="M12 8l2-2M12 8l-2-2M12 8v4"/>
        </svg>
      ),
    },
  ];

  const locCard: React.CSSProperties = {
    borderRadius: 16, overflow: 'hidden',
    border: '1px solid rgba(212,175,55,.2)',
    background: 'rgba(255,255,255,.03)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 40px rgba(0,0,0,.5)',
    transition: 'transform .25s ease, box-shadow .25s ease',
  };

  const navBtn: React.CSSProperties = {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
    padding:'9px 14px', borderRadius:8,
    fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:600, letterSpacing:'.12em',
    cursor:'pointer', flex:1, whiteSpace:'nowrap', border:'none', textDecoration:'none',
  };

  return (
    <div style={{ position:'fixed', inset:0, overflowY:'auto', overflowX:'hidden', WebkitOverflowScrolling:'touch' as any }}>
      {/* Background layers */}
      <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse 90% 80% at 50% 30%,#1A1408 0%,#0A0803 55%,#050401 100%)', zIndex:0 }}/>
      <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse 60% 50% at 15% 20%,rgba(212,175,55,.07) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 85% 80%,rgba(212,175,55,.06) 0%,transparent 55%)', zIndex:1, pointerEvents:'none' }}/>
      <div style={{ position:'fixed', inset:0, opacity:.04, zIndex:1, pointerEvents:'none', backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='.008' numOctaves='8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}/>

      {/* Art Deco corners (fixed) */}
      {([['tl',false,false],['tr',true,false],['bl',false,true],['br',true,true]] as const).map(([k,fx,fy])=>(
        <div key={k} style={{ position:'fixed', top:fy?'auto':0, bottom:fy?0:'auto', left:fx?'auto':0, right:fx?0:'auto', width:'min(180px,20vw)', height:'min(180px,20vw)', opacity:.65, pointerEvents:'none', zIndex:2 }}>
          <ArtDecoCorner flip={fx} flipY={fy}/>
        </div>
      ))}

      {/* Content */}
      <div style={{ position:'relative', zIndex:10, maxWidth:700, margin:'0 auto', padding:'clamp(40px,7vw,70px) clamp(16px,4vw,32px) 60px', display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>

        {/* Crown */}
        <div style={{ ...a(0), marginBottom:10 }}><CrownSVG size={80}/></div>
        <p style={{ ...a(.06), fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,1vw,10px)', letterSpacing:'.36em', textTransform:'uppercase', color:'rgba(212,175,55,.65)', marginBottom:12 }}>
          Cu Onoare Vă Invităm
        </p>

        {/* Names */}
        <div style={{ ...a(.1), textAlign:'center', marginBottom:6 }}>
          <span style={{ display:'block', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,10vw,108px)', fontWeight:600, fontStyle:'italic', color:'#F5E6A8', lineHeight:.92, textShadow:'0 0 60px rgba(212,175,55,.25)' }}>
            {s.bride_name}
          </span>
          <span style={{ display:'block', fontFamily:"'Cinzel',serif", fontSize:'clamp(14px,2vw,22px)', fontWeight:400, color:'rgba(212,175,55,.6)', margin:'8px 0', letterSpacing:'.3em' }}>&amp;</span>
          <span style={{ display:'block', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,10vw,108px)', fontWeight:600, fontStyle:'italic', color:'#F5E6A8', lineHeight:.92, textShadow:'0 0 60px rgba(212,175,55,.25)' }}>
            {s.groom_name}
          </span>
        </div>

        <div style={{ ...a(.16), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'22px auto' }}><GoldDivider/></div>

        {/* Date */}
        <div style={{ ...a(.20), textAlign:'center', marginBottom:16 }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(13px,1.8vw,17px)', letterSpacing:'.18em', color:'#D4AF37', fontWeight:400, marginBottom:6, textTransform:'capitalize' }}>
            {weddingDateLabel}
          </p>
          {s.location_name && (
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.7vw,18px)', fontStyle:'italic', fontWeight:300, color:'rgba(245,230,168,.55)', letterSpacing:'.06em' }}>
              {s.location_name}
            </p>
          )}
        </div>

        {/* Nași + Părinți */}
        {(s.nasi_names || s.parents_names) && (
          <div style={{ ...a(.25), textAlign:'center', padding:'22px 32px', border:'1px solid rgba(212,175,55,.2)', borderRadius:16, background:'rgba(212,175,55,.04)', backdropFilter:'blur(8px)', maxWidth:400, width:'100%', position:'relative', boxShadow:'0 4px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(212,175,55,.1)', marginBottom:0 }}>
            {[['tl',8,8,null,null],['tr',8,null,8,null],['bl',null,8,null,8],['br',null,null,8,8]].map(([k,top,left,bottom,right])=>(
              <div key={String(k)} style={{ position:'absolute', top:top??'auto', left:left??'auto', bottom:bottom??'auto', right:right??'auto', width:12, height:12, borderTop:top!==null?'1px solid rgba(212,175,55,.4)':'none', borderBottom:bottom!==null?'1px solid rgba(212,175,55,.4)':'none', borderLeft:left!==null?'1px solid rgba(212,175,55,.4)':'none', borderRight:right!==null?'1px solid rgba(212,175,55,.4)':'none' }}/>
            ))}
            {s.nasi_names && <>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(12px,1.4vw,14px)', fontStyle:'italic', color:'rgba(212,175,55,.6)', marginBottom:8 }}>Alături de nașii noștri</p>
              <div style={{ width:32, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 10px' }}/>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(18px,2.5vw,24px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8' }}>{s.nasi_names}</p>
            </>}
            {s.parents_names && <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,1.6vw,16px)', fontStyle:'italic', color:'rgba(212,175,55,.5)', marginTop:10 }}>Împreună cu {s.parents_names}</p>}
          </div>
        )}

        <div style={{ ...a(.30), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* COUNTDOWN */}
        {s.wedding_date && (
          <div style={{ ...a(.34), width:'100%', maxWidth:480, background:'rgba(212,175,55,.04)', border:'1px solid rgba(212,175,55,.18)', borderRadius:20, padding:'24px 16px', boxShadow:'0 8px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(212,175,55,.08)', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)' }}/>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(7px,.9vw,9px)', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(212,175,55,.55)', marginBottom:18 }}>
              Timp Rămas Până La Marea Sărbătoare
            </p>
            <div style={{ display:'flex', gap:0, justifyContent:'center' }}>
              {([
                { n: pad(cd.d), l: 'Zile' },
                { n: pad(cd.h), l: 'Ore' },
                { n: pad(cd.m), l: 'Minute' },
                { n: pad(cd.s), l: 'Secunde', flip: flipS },
              ] as any[]).map((u, i, arr) => (
                <div key={u.l} style={{ flex:1, maxWidth:112, textAlign:'center', padding:'0 4px', borderRight: i < arr.length-1 ? '1px solid rgba(212,175,55,.12)' : 'none' }}>
                  <span style={{ display:'block', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,6vw,62px)', fontWeight:300, lineHeight:1, color: u.flip ? '#F5D678' : '#D4AF37', transform: u.flip ? 'scale(1.08) translateY(-3px)' : 'scale(1)', transition:'transform .15s ease,color .15s ease', textShadow: u.flip ? '0 0 20px rgba(212,175,55,.4)' : 'none' }}>{u.n}</span>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(6px,.8vw,8px)', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(212,175,55,.45)', display:'block', marginTop:4 }}>{u.l}</span>
                </div>
              ))}
            </div>
            <div style={{ position:'absolute', bottom:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)' }}/>
          </div>
        )}

        <div style={{ ...a(.40), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* LOCATION CARDS */}
        <div style={{ ...a(.44), width:'100%', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap:'clamp(12px,2vw,20px)', maxWidth:640 }}>
          {locCards.map(card => (
            <div key={card.type} style={locCard}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 60px rgba(0,0,0,.7),0 0 30px rgba(212,175,55,.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 8px 40px rgba(0,0,0,.5)'; }}
            >
              <div style={{ padding:'16px 18px 12px', background:'linear-gradient(135deg,rgba(212,175,55,.15) 0%,rgba(212,175,55,.06) 100%)', borderBottom:'1px solid rgba(212,175,55,.15)', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'rgba(212,175,55,.12)', border:'1px solid rgba(212,175,55,.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{card.icon}</div>
                <div>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(212,175,55,.55)', display:'block', marginBottom:2 }}>{card.type}</span>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', lineHeight:1.2 }}>{card.name}</p>
                </div>
              </div>
              <div style={{ padding:'14px 18px 16px' }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(212,175,55,.08)', border:'1px solid rgba(212,175,55,.2)', borderRadius:100, padding:'4px 12px', fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(212,175,55,.7)', marginBottom:14 }}>
                  ◆ {card.date}{card.time ? ` · ora ${card.time}` : ''}
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  {card.waze && (
                    <a href={card.waze} target="_blank" rel="noopener noreferrer" style={{ ...navBtn, background:'linear-gradient(135deg,rgba(8,162,212,.25),rgba(8,162,212,.15))', color:'rgba(140,210,240,.9)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13,height:13 }}><path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/></svg>
                      Waze
                    </a>
                  )}
                  {card.maps && (
                    <a href={card.maps} target="_blank" rel="noopener noreferrer" style={{ ...navBtn, background:'linear-gradient(135deg,rgba(76,175,79,.22),rgba(76,175,79,.12))', color:'rgba(120,210,120,.9)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13,height:13 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      Maps
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        {(s.contact_phone_bride || s.contact_phone_groom) && (
          <div style={{ ...a(.50), width:'100%', maxWidth:640, background:'rgba(212,175,55,.04)', border:'1px solid rgba(212,175,55,.18)', borderRadius:16, padding:'16px 20px', backdropFilter:'blur(8px)', boxShadow:'0 6px 30px rgba(0,0,0,.4)', marginTop:'clamp(12px,2vw,20px)' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(212,175,55,.5)', marginBottom:12 }}>Contact</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
              {[{name:s.bride_name,phone:s.contact_phone_bride},{name:s.groom_name,phone:s.contact_phone_groom}].filter(c=>c.phone).map(c=>(
                <div key={c.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flex:1, minWidth:200, flexWrap:'wrap', gap:8 }}>
                  <div>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', fontStyle:'italic', color:'#F5E6A8', marginBottom:2 }}>{c.name}</p>
                    <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(11px,1.2vw,13px)', color:'#D4AF37', letterSpacing:'.08em', fontWeight:600 }}>{c.phone}</p>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <a href={`tel:${c.phone}`} style={{ ...navBtn, padding:'9px 16px', borderRadius:100, background:'rgba(212,175,55,.12)', border:'1px solid rgba(212,175,55,.3)', color:'#D4AF37' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:13,height:13 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Sună
                    </a>
                    <a href={`https://wa.me/${c.phone?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ ...navBtn, padding:'9px 16px', borderRadius:100, background:'rgba(37,211,102,.12)', border:'1px solid rgba(37,211,102,.3)', color:'rgba(100,220,130,.9)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13,height:13 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.487a.5.5 0 0 0 .609.61l5.718-1.493A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.234-1.385l-.376-.22-3.892 1.016 1.024-3.793-.234-.382A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ ...a(.54), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* OUR STORY */}
        {s.our_story && (
          <div style={{ ...a(.56), maxWidth:560, textAlign:'center', padding:'0 8px', marginBottom:8 }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(15px,1.9vw,19px)', fontStyle:'italic', fontWeight:300, color:'rgba(245,230,168,.8)', lineHeight:1.9 }}>
              &ldquo;{s.our_story}&rdquo;
            </p>
          </div>
        )}

        {/* MENU BUTTON */}
        {s.is_menu_active && s.menu_details?.categories && (
          <>
            <div style={{ ...a(.58), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>
            <div style={{ ...a(.60), textAlign:'center' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(212,175,55,.6)', marginBottom:16 }}>MENIUL EVENIMENTULUI</p>
              <button onClick={() => setMenuOpen(true)} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 32px', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', border:'none', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:'clamp(10px,1.2vw,12px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', boxShadow:'0 8px 28px rgba(212,175,55,.3)', position:'relative', overflow:'hidden' }}>
                <span style={{ position:'relative', zIndex:1 }}>◆ Vezi Meniu ◆</span>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', backgroundSize:'350px 100%', animation:'lux-shimmer 3s linear infinite' }}/>
              </button>
            </div>
          </>
        )}

        {/* PHOTO UPLOAD */}
        {galleryActive && (
          <>
            <div style={{ ...a(.62), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>
            <div style={{ ...a(.64), width:'100%', maxWidth:640, background:'linear-gradient(160deg,rgba(212,175,55,.07) 0%,rgba(212,175,55,.03) 100%)', border:'1.5px dashed rgba(212,175,55,.3)', borderRadius:20, padding:'clamp(22px,3vw,32px) clamp(18px,3vw,28px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}>
                  <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(212,175,55,.1)', border:'2px solid rgba(212,175,55,.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg viewBox="0 0 48 48" fill="none" style={{ width:38, height:38 }}>
                      <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
                      <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
                      <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
                      <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".28"/>
                    </svg>
                  </div>
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(18px,2.6vw,26px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:8 }}>Împărtășiți momentele cu noi ✦</h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,1.6vw,16px)', fontStyle:'italic', color:'rgba(212,175,55,.55)', lineHeight:1.8, marginBottom:18, maxWidth:440, margin:'0 auto 18px' }}>
                  Faceți poze și încărcați-le direct din telefon.<br/>Mirii vor accesa toate imaginile într-un album privat exclusivist.
                </p>
                <button onClick={() => setUploadOpen(true)} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 32px', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', border:'none', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:'clamp(10px,1.2vw,12px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', boxShadow:'0 8px 28px rgba(212,175,55,.3)', position:'relative', overflow:'hidden' }}>
                  <span style={{ position:'relative', zIndex:1 }}>◆ Încarcă Pozele Tale ◆</span>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', backgroundSize:'350px 100%', animation:'lux-shimmer 3s linear infinite' }}/>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Extras icons */}
        {(s.is_accommodation_active || s.is_transport_active) && (
          <div style={{ ...a(.66), display:'flex', gap:24, justifyContent:'center', marginTop:12 }}>
            {s.is_accommodation_active && <div style={{ fontSize:'2.2rem' }} title="Cazare disponibilă">🏠</div>}
            {s.is_transport_active && <div style={{ fontSize:'2.2rem' }} title="Transport asigurat">🚌</div>}
          </div>
        )}

        <div style={{ ...a(.68), display:'flex', alignItems:'center', width:'100%', maxWidth:440, margin:'24px auto' }}><GoldDivider/></div>

        {/* RSVP */}
        <div style={{ ...a(.70), textAlign:'center', width:'100%', maxWidth:420 }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.7vw,17px)', fontStyle:'italic', color:'rgba(212,175,55,.55)', marginBottom:16, lineHeight:1.7, letterSpacing:'.04em' }}>
            Vă rugăm să confirmați prezența Dvs.
          </p>
          <button
            onClick={() => setRsvpOpen(true)}
            style={{ display:'block', width:'100%', padding:'clamp(14px,2vw,18px) 0', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', textAlign:'center', fontFamily:"'Cinzel',serif", fontSize:'clamp(11px,1.3vw,13px)', fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', cursor:'pointer', border:'none', boxShadow:'0 8px 40px rgba(212,175,55,.35),0 2px 0 rgba(245,214,120,.5) inset', position:'relative', overflow:'hidden' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 60px rgba(212,175,55,.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 40px rgba(212,175,55,.35)'; }}
          >
            <span style={{ position:'relative', zIndex:1 }}>◆ Confirmă Prezența ◆</span>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)', backgroundSize:'350px 100%', animation:'lux-shimmer 3s linear infinite' }}/>
          </button>
        </div>

        {/* Footer */}
        <p style={{ ...a(.74), fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,.9vw,10px)', letterSpacing:'.12em', color:'rgba(212,175,55,.25)', marginTop:40, textAlign:'center' }}>
          Contact: {s.contact_phone_bride}{s.contact_phone_bride && s.contact_phone_groom ? ' / ' : ''}{s.contact_phone_groom}
        </p>
      </div>

      {/* ── RSVP MODAL ── */}
      {rsvpOpen && (
        <LuxModal onClose={() => setRsvpOpen(false)} label="RSVP">
          <div style={{ textAlign:'center', marginBottom:22, paddingTop:20 }}>
            <div style={{ marginBottom:10 }}><CrownSVG size={64}/></div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3.5vw,30px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:8 }}>Confirmă Prezența</h2>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 8px' }}/>
          </div>
          <LuxRsvpForm
            orderId={s.order_id}
            showAccommodation={s.is_accommodation_active}
            showTransport={s.is_transport_active}
          />
        </LuxModal>
      )}

      {/* ── MENU MODAL ── */}
      {menuOpen && s.menu_details?.categories && (
        <LuxModal onClose={() => setMenuOpen(false)} label="Meniu">
          <div style={{ textAlign:'center', marginBottom:24, paddingTop:20 }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(8px,1vw,10px)', letterSpacing:'.36em', textTransform:'uppercase', color:'rgba(212,175,55,.55)', marginBottom:8 }}>◆ Gastronomie ◆</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(24px,3.5vw,32px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:8 }}>Meniul Evenimentului</h2>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 16px' }}/>
          </div>
          {s.menu_details.categories
            .filter((cat: any) => cat.active && cat.items?.length > 0)
            .map((cat: any, ci: number) => (
              <div key={ci} style={{ marginBottom:32 }}>
                <div style={{ display:'inline-block', borderBottom:'1px solid rgba(212,175,55,.3)', paddingBottom:10, marginBottom:16 }}>
                  <h4 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(12px,1.5vw,14px)', color:'#fff', fontWeight:300, letterSpacing:2, margin:0 }}>
                    {cat.emoji && <span style={{ marginRight:8 }}>{cat.emoji}</span>}{cat.label}
                  </h4>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {cat.items.map((item: any, ii: number) => (
                    <div key={ii}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', color:'#D4AF37', fontStyle:'italic' }}>{item.name}</div>
                      {item.description && <div style={{ fontSize:'clamp(11px,1.2vw,13px)', color:'rgba(212,175,55,.5)', fontStyle:'italic', marginTop:3, fontFamily:"'Cormorant Garamond',serif" }}>{item.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <div style={{ textAlign:'center', marginTop:20 }}>
            <button onClick={() => setMenuOpen(false)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 28px', borderRadius:4, background:'linear-gradient(135deg,#8B6914,#D4AF37,#8B6914)', color:'#0A0803', border:'none', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:11, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase' }}>
              ◆ Închide
            </button>
          </div>
        </LuxModal>
      )}

      {/* ── UPLOAD MODAL ── */}
      {uploadOpen && (
        <LuxModal onClose={() => setUploadOpen(false)} label="Upload">
          <div style={{ textAlign:'center', paddingTop:20 }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
              <div style={{ width:68, height:68, borderRadius:'50%', background:'rgba(212,175,55,.1)', border:'2px solid rgba(212,175,55,.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width:36, height:36 }}>
                  <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
                  <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
                  <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
                  <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".25"/>
                </svg>
              </div>
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3vw,30px)', fontStyle:'italic', fontWeight:300, color:'#F5E6A8', marginBottom:10 }}>Încarcă pozele!</h2>
            <div style={{ width:36, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent)', margin:'0 auto 14px' }}/>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(13px,1.6vw,16px)', fontStyle:'italic', color:'rgba(212,175,55,.55)', marginBottom:24, lineHeight:1.8 }}>
              Faceți poze în timpul nunții și încărcați-le direct din telefon.<br/>
              Mirii vor accesa toate imaginile voastre într-un album privat exclusivist.
            </p>
            <a
              href={`/invitatie/lux/${s.slug}/upload`}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 32px', borderRadius:4, background:'linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%)', color:'#0A0803', textDecoration:'none', fontFamily:"'Cinzel',serif", fontSize:'clamp(10px,1.2vw,12px)', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', boxShadow:'0 8px 28px rgba(212,175,55,.3)' }}
            >
              ◆ Deschide Upload
            </a>
          </div>
        </LuxModal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT CLIENT COMPONENT
══════════════════════════════════════════════════════════════ */
function LuxInvitation({ settings }: { settings: Settings }) {
  const [phase, setPhase] = useState<Phase>('envelope');

  const openEnvelope = useCallback(() => {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setTimeout(() => setPhase('invite'), 1700);
  }, [phase]);

  /* Auto-open after 1.5s */
  useEffect(() => {
    if (phase !== 'envelope') return;
    const t = setTimeout(openEnvelope, 1500);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #050401; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        @keyframes lux-fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes lux-envFloat{ 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes lux-spin    { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes lux-pulse   { 0%,100% { opacity:.45; } 50% { opacity:.9; } }
        @keyframes lux-shimmer { 0% { background-position:-350px 0; } 100% { background-position:350px 0; } }
        @keyframes lux-fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes lux-slideUp { from { opacity:0; transform:scale(.93) translateY(18px); } to { opacity:1; transform:scale(1) translateY(0); } }

        .lux-invite-scroll { scroll-behavior: smooth; }

        @media (max-width: 480px) {}
      `}</style>

      {phase !== 'invite' && (
        <EnvelopeScreen s={settings} phase={phase} onOpen={openEnvelope} />
      )}
      {phase === 'invite' && (
        <InvitationScreen s={settings} />
      )}
    </>
  );
}
