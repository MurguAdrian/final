
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


import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import LuxRsvpForm from "./LuxRsvpForm";
import Countdown from "./components/Countdown";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);
  
  const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;
  if (!data || data.length === 0) notFound();
  const s = data[0];

  await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE id = ${s.id}`;

  const brideInitial = s.bride_name ? s.bride_name.charAt(0).toUpperCase() : 'M';
  const groomInitial = s.groom_name ? s.groom_name.charAt(0).toUpperCase() : 'I';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #000; color: #fff; font-family: 'Cormorant Garamond', serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        /* ── ENVELOPE SCENE ── */
        .lux-scene {
          position: fixed; inset: 0; z-index: 9999;
          background: radial-gradient(ellipse 90% 80% at 50% 40%, #1A1408 0%, #0A0803 55%, #040301 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 20px; overflow: hidden;
          transition: opacity 0.9s ease, visibility 0.9s ease;
        }
        .lux-scene.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

        .lux-scene-corner {
          position: absolute; width: min(180px, 22vw); height: min(180px, 22vw); opacity: 0.65; pointer-events: none;
        }
        .lux-scene-corner.tl { top: 0; left: 0; }
        .lux-scene-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
        .lux-scene-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .lux-scene-corner.br { bottom: 0; right: 0; transform: scale(-1); }

        .lux-scene-line {
          position: absolute; left: 5%; right: 5%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,.22), transparent);
          pointer-events: none;
        }
        .lux-scene-line.top { top: 10%; }
        .lux-scene-line.bottom { bottom: 10%; }

        /* Crown */
        .scene-crown { animation: fadeUp 0.6s ease both; margin-bottom: 6px; }
        .scene-subtitle {
          font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
          letter-spacing: .36em; text-transform: uppercase; color: rgba(212,175,55,.65);
          margin-bottom: 14px; animation: fadeUp 0.7s ease both 0.05s;
        }
        .scene-names {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 4vw, 48px); font-weight: 300; font-style: italic;
          color: #F5D678; text-align: center; line-height: 1.15;
          animation: fadeUp 0.8s ease both 0.1s; margin-bottom: 18px;
          text-shadow: 0 0 40px rgba(212,175,55,.3);
        }
        .scene-names strong { font-weight: 600; font-style: normal; color: #F5E6A8; }
        .scene-names span { color: rgba(212,175,55,.5); font-weight: 300; font-size: .75em; display: inline; margin: 0 8px; letter-spacing: .2em; font-style: normal; }

        /* Envelope */
        .envelope-wrap {
          position: relative;
          width: clamp(260px, 42vw, 500px);
          cursor: pointer; user-select: none;
          filter: drop-shadow(0 40px 80px rgba(0,0,0,.7));
          animation: envFloat 5s ease-in-out infinite, fadeUp 0.9s ease both 0.18s;
          transition: transform 0.2s ease;
        }
        .envelope-wrap:hover { transform: translateY(-4px); }
        .envelope-shadow {
          position: absolute; bottom: -18px; left: 8%; right: 8%; height: 22px;
          background: radial-gradient(ellipse, rgba(212,175,55,.18) 0%, transparent 70%);
          filter: blur(10px); z-index: 0;
        }

        /* Letter inside envelope */
        .envelope-letter {
          position: absolute; left: 8%; right: 8%; bottom: 4%; height: 62%; z-index: 2;
          background: linear-gradient(170deg, #1A1408 0%, #0D0A04 100%);
          border: 1px solid rgba(212,175,55,.35); border-radius: 4px;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,.4); overflow: hidden;
          transform: translateY(0);
          transition: transform 1.4s cubic-bezier(.22,.1,.2,1) .2s, box-shadow 1.4s ease .2s, z-index 0s .2s;
        }
        .envelope-letter.opening {
          transform: translateY(-148%) scale(1.06) rotate(-0.6deg);
          box-shadow: 0 40px 100px rgba(0,0,0,.9), 0 0 60px rgba(212,175,55,.2);
          z-index: 30;
        }
        .letter-lines {
          position: absolute; inset: 0; opacity: .07;
          background-image: repeating-linear-gradient(0deg, #D4AF37 0, #D4AF37 1px, transparent 1px, transparent 32px);
        }
        .letter-border { position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 1px solid rgba(212,175,55,.2); border-radius: 2px; }
        .letter-content { text-align: center; padding: 0 20px; position: relative; z-index: 1; }
        .letter-couple {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(14px, 2.4vw, 24px); font-style: italic; font-weight: 300;
          color: #D4AF37; line-height: 1.2; letter-spacing: .04em;
        }
        .letter-divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          margin: 8px auto;
        }
        .letter-date {
          font-family: 'Cinzel', serif; font-size: clamp(7px, .9vw, 9px);
          letter-spacing: .3em; text-transform: uppercase; color: rgba(212,175,55,.7); font-weight: 400;
        }

        /* Envelope body */
        .envelope-body { width: 100%; padding-top: 60%; position: relative; z-index: 5; }
        .envelope-inner {
          position: absolute; inset: 0;
          background: #0A0803; border-radius: 6px;
          border: 1px solid rgba(212,175,55,.28);
          box-shadow: 0 8px 40px rgba(0,0,0,.8), inset 0 1px 0 rgba(212,175,55,.15);
          overflow: hidden;
        }
        .env-noise {
          position: absolute; inset: 0; opacity: .06;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='.012' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }
        .env-left { position: absolute; top: 0; bottom: 0; left: 0; width: 50%; background: linear-gradient(160deg, #0E0C06, #080602); clip-path: polygon(0 0,0 100%,100% 100%); }
        .env-right { position: absolute; top: 0; bottom: 0; right: 0; width: 50%; background: linear-gradient(200deg, #0E0C06, #080602); clip-path: polygon(100% 0,0 100%,100% 100%); }
        .env-bottom { position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, #0C0A04, #070601); clip-path: polygon(0 100%,50% 0,100% 100%); }
        .env-top-line { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.4), transparent); }

        /* Seal */
        .envelope-seal {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -52%);
          width: clamp(50px, 9vw, 80px); height: clamp(50px, 9vw, 80px);
          background: radial-gradient(circle at 35% 35%, #F5D678 0%, #D4AF37 40%, #8B6914 100%);
          border-radius: 50%; border: 2px solid rgba(245,214,120,.5);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 6px rgba(212,175,55,.08), 0 0 0 12px rgba(212,175,55,.04), 0 8px 30px rgba(0,0,0,.8);
          z-index: 10; transition: opacity .25s;
        }
        .envelope-seal.opening { opacity: 0; }
        .seal-ring-outer {
          position: absolute; inset: -8px; border: 1px solid rgba(212,175,55,.3);
          border-radius: 50%; border-style: dashed; animation: lux-spin 30s linear infinite;
        }
        .seal-ring-inner { position: absolute; inset: -14px; border: 1px solid rgba(212,175,55,.12); border-radius: 50%; }
        .seal-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px, 2vw, 19px); font-style: italic; color: #0A0803; font-weight: 600;
          position: relative; z-index: 1;
        }

        /* Flap */
        .envelope-flap {
          position: absolute; top: 0; left: 0; right: 0; z-index: 8; height: 52%;
          background: linear-gradient(160deg, #14100A, #0A0803);
          clip-path: polygon(0 0,100% 0,50% 100%);
          transform-origin: top center;
          transform: perspective(800px) rotateX(0deg);
          transition: transform 1.05s cubic-bezier(.4,0,.2,1);
          border-bottom: 1px solid rgba(212,175,55,.25);
        }
        .envelope-flap.opening { transform: perspective(800px) rotateX(192deg); }
        .flap-sheen { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(212,175,55,.08) 0%, transparent 50%); }

        /* Open hint */
        .open-hint {
          font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
          letter-spacing: .28em; text-transform: uppercase; color: rgba(212,175,55,.55);
          animation: fadeUp 1s ease both .35s, lux-pulse 3s ease-in-out infinite 1.3s;
          margin-top: 14px;
        }
        .open-hint.opening { animation: none; opacity: .8; }

        /* ── GOLD DIVIDER ── */
        .gold-divider {
          display: flex; align-items: center; width: 100%; max-width: 440px; margin: 28px auto;
        }
        .gold-divider-line-l { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.6)); }
        .gold-divider-line-r { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(212,175,55,.6), transparent); }

        /* ── MAIN INVITATION ── */
        .lux-invitation {
          background: #000; color: #fff; text-align: center;
          font-family: 'Cormorant Garamond', serif;
          overflow-x: hidden; overflow-y: auto;
          opacity: 0; transition: opacity 0.7s ease 0.1s;
          min-height: 100vh;
        }
        .lux-invitation.visible { opacity: 1; }

        /* Hero */
        .lux-hero {
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: center; padding: clamp(40px, 8vw, 80px) 20px;
          border-bottom: 1px solid rgba(212,175,55,.15);
          position: relative; overflow: hidden;
        }
        .hero-bg-grad {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 70% at 50% 40%, #1A1408 0%, #0A0803 55%, #000 100%);
        }
        .hero-corner { position: absolute; width: min(160px, 20vw); height: min(160px, 20vw); opacity: .6; pointer-events: none; }
        .hero-corner.tl { top: 0; left: 0; }
        .hero-corner.tr { top: 0; right: 0; transform: scaleX(-1); }
        .hero-corner.bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .hero-corner.br { bottom: 0; right: 0; transform: scale(-1); }

        .hero-inner { position: relative; z-index: 2; }
        .hero-crown { display: flex; justify-content: center; margin-bottom: 8px; }
        .hero-eyebrow {
          font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
          letter-spacing: .36em; text-transform: uppercase; color: rgba(212,175,55,.65); margin-bottom: 16px;
        }
        .hero-names {
          font-size: clamp(52px, 10vw, 100px); font-weight: 600; font-style: italic;
          color: #F5E6A8; line-height: .92; letter-spacing: -.01em;
          text-shadow: 0 0 60px rgba(212,175,55,.25); margin-bottom: 4px;
        }
        .hero-amp {
          font-family: 'Cinzel', serif; font-size: clamp(14px, 2vw, 22px);
          font-weight: 400; color: rgba(212,175,55,.6); margin: 8px 0; letter-spacing: .3em; display: block;
        }
        .hero-sub {
          font-size: clamp(14px, 1.8vw, 18px); font-style: italic; font-weight: 300;
          color: rgba(245,230,168,.55); margin-top: 16px; letter-spacing: .06em;
        }
        .hero-extra { opacity: 0.75; margin-top: 10px; font-size: clamp(13px, 1.6vw, 16px); font-style: italic; color: rgba(245,214,120,.6); }

        /* Details section */
        .lux-details { padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px); }
        .lux-info-box {
          border: 1px solid rgba(212,175,55,.2); padding: clamp(32px, 5vw, 48px) clamp(20px, 4vw, 32px);
          max-width: 560px; margin: 0 auto 40px auto; background: #0a0a0a;
          border-radius: 4px; position: relative;
        }
        .info-box-corner {
          position: absolute; width: 14px; height: 14px;
          border-color: rgba(212,175,55,.3);
        }
        .info-box-corner.tl { top: 8px; left: 8px; border-top: 1px solid; border-left: 1px solid; }
        .info-box-corner.tr { top: 8px; right: 8px; border-top: 1px solid; border-right: 1px solid; }
        .info-box-corner.bl { bottom: 8px; left: 8px; border-bottom: 1px solid; border-left: 1px solid; }
        .info-box-corner.br { bottom: 8px; right: 8px; border-bottom: 1px solid; border-right: 1px solid; }

        .gold-heading {
          color: #d4af37; letter-spacing: 4px; margin-bottom: 20px;
          font-family: 'Cinzel', serif; font-size: clamp(12px, 1.4vw, 14px);
        }
        .event-date { font-size: clamp(18px, 3vw, 28px); margin: 4px 0; }
        .event-time { font-size: clamp(13px, 1.6vw, 16px); opacity: 0.7; margin: 4px 0; }
        .event-location { margin: 16px 0; font-weight: 600; font-size: clamp(14px, 1.8vw, 18px); color: rgba(245,230,168,.9); }
        .nav-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
        .btn-gold {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 22px; border: 1px solid #d4af37;
          color: #d4af37; text-decoration: none; font-size: clamp(9px, 1.1vw, 11px);
          font-family: 'Cinzel', serif; letter-spacing: .14em; text-transform: uppercase;
          transition: background .2s, color .2s; border-radius: 2px; margin-top: 8px;
        }
        .btn-gold:hover { background: rgba(212,175,55,.12); }
        .btn-gold-solid {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: 13px 28px; border-radius: 4px;
          background: linear-gradient(135deg, #8B6914 0%, #D4AF37 45%, #F5D678 55%, #D4AF37 70%, #8B6914 100%);
          color: #0A0803; text-decoration: none; font-size: clamp(10px, 1.2vw, 12px);
          font-family: 'Cinzel', serif; letter-spacing: .18em; text-transform: uppercase;
          font-weight: 700; cursor: pointer; border: none;
          box-shadow: 0 8px 32px rgba(212,175,55,.3); transition: transform .2s, box-shadow .2s;
          position: relative; overflow: hidden;
        }
        .btn-gold-solid::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
          background-size: 350px 100%; animation: shimmer 3s linear infinite;
        }
        .btn-gold-solid:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(212,175,55,.5); }
        .btn-gold-solid span { position: relative; z-index: 1; }

        /* Story */
        .lux-story { padding: clamp(40px, 8vw, 80px) 20px; max-width: 620px; margin: 0 auto; }
        .story-text { font-style: italic; font-size: clamp(15px, 1.8vw, 19px); line-height: 1.9; color: rgba(245,230,168,.8); }

        /* Menu button section */
        .menu-btn-section { padding: 40px 20px; text-align: center; }

        /* Accommodation/Transport icons */
        .extras-icons { display: flex; gap: 30px; justify-content: center; padding: 20px; margin-top: 20px; }

        /* RSVP section */
        .lux-rsvp { padding: clamp(60px, 10vw, 100px) 20px; background: #080808; }
        .rsvp-inner { max-width: 520px; margin: 0 auto; }

        /* Footer */
        .lux-footer { padding: clamp(30px, 6vw, 60px); opacity: .4; font-size: .7rem; font-family: 'Cinzel', serif; letter-spacing: .1em; }

        /* ── MODAL OVERLAY ── */
        .lux-modal-overlay {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,.85); backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(12px, 3vw, 24px); overflow-y: auto;
          animation: fadeIn .28s ease;
          -webkit-overflow-scrolling: touch;
        }
        .lux-modal {
          background: linear-gradient(170deg, #1A1408, #0A0803);
          border: 1px solid rgba(212,175,55,.25); border-radius: 20px;
          padding: clamp(24px, 4vw, 40px) clamp(18px, 4vw, 32px);
          max-width: 520px; width: 100%;
          box-shadow: 0 40px 100px rgba(0,0,0,.9), 0 0 60px rgba(212,175,55,.1);
          animation: slideUp .32s cubic-bezier(.4,0,.2,1);
          max-height: 92vh; overflow-y: auto; position: relative;
          -webkit-overflow-scrolling: touch;
          /* Safe area on iOS */
          padding-bottom: max(clamp(24px, 4vw, 40px), env(safe-area-inset-bottom));
        }
        .modal-top-line {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent);
        }
        .modal-close-btn {
          position: absolute; top: 14px; right: 14px;
          background: rgba(212,175,55,.1); border: 1px solid rgba(212,175,55,.25);
          border-radius: 50%; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(212,175,55,.7); font-size: 16px;
          transition: background .2s; z-index: 10; font-family: serif;
        }
        .modal-close-btn:hover { background: rgba(212,175,55,.2); }
        .modal-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3.5vw, 32px); font-style: italic; font-weight: 300;
          color: #F5E6A8; margin-bottom: 8px; text-align: center;
        }
        .modal-eyebrow {
          font-family: 'Cinzel', serif; font-size: clamp(8px, 1vw, 10px);
          letter-spacing: .36em; text-transform: uppercase; color: rgba(212,175,55,.55);
          margin-bottom: 8px; text-align: center;
        }
        .modal-divider { width: 36px; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,.5), transparent); margin: 0 auto 16px; }

        /* Menu modal items */
        .menu-cat-title {
          color: #fff; font-size: clamp(12px, 1.5vw, 15px); margin: 0;
          font-weight: 300; letter-spacing: 2px; font-family: 'Cinzel', serif;
        }
        .menu-cat-header {
          display: inline-block; border-bottom: 1px solid rgba(212,175,55,.3);
          padding-bottom: 10px; margin-bottom: 20px;
        }
        .menu-item-name { color: #d4af37; font-size: clamp(14px, 1.8vw, 18px); }
        .menu-item-desc { font-size: clamp(11px, 1.3vw, 13px); opacity: .6; font-style: italic; margin-top: 4px; }

        /* Gallery */
        .gallery-section { padding: clamp(32px, 6vw, 60px) 20px; border-top: 1px solid rgba(212,175,55,.08); text-align: center; }
        .gallery-hint { font-size: clamp(10px, 1.2vw, 12px); opacity: .65; margin-bottom: 20px; font-style: italic; }
        .gallery-btn {
          display: inline-block; padding: clamp(13px,2vw,17px) clamp(28px,4vw,44px);
          background: #d4af37; color: #000; border-radius: 4px; font-weight: bold;
          text-decoration: none; font-family: 'Cinzel', serif; font-size: clamp(10px, 1.2vw, 12px);
          letter-spacing: .14em; text-transform: uppercase;
          box-shadow: 0 8px 28px rgba(212,175,55,.3); transition: transform .2s, box-shadow .2s;
        }
        .gallery-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.5); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes envFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes lux-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes lux-pulse { 0%,100% { opacity: .45; } 50% { opacity: .9; } }
        @keyframes shimmer { 0% { background-position: -350px 0; } 100% { background-position: 350px 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: scale(.93) translateY(18px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        /* ── RESPONSIVE ── */
        @media (max-width: 480px) {
          .hero-names { font-size: clamp(44px, 14vw, 72px); }
          .lux-modal { max-height: 88vh; border-radius: 16px; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          ENVELOPE SCENE (client-side toggle)
      ══════════════════════════════════════ */}
      <div id="lux-scene" className="lux-scene">
        {/* Corner decorations */}
        <svg className="lux-scene-corner tl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg1)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg1)" strokeWidth=".7" strokeOpacity=".6"/><path d="M8 50 L22 50 M8 70 L16 70" stroke="url(#dg1)" strokeWidth=".8"/><path d="M50 8 L50 22 M70 8 L70 16" stroke="url(#dg1)" strokeWidth=".8"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg1)" fillOpacity=".8"/><defs><linearGradient id="dg1" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
        <svg className="lux-scene-corner tr" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg2)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg2)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg2)" fillOpacity=".8"/><defs><linearGradient id="dg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
        <svg className="lux-scene-corner bl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg3)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg3)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg3)" fillOpacity=".8"/><defs><linearGradient id="dg3" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
        <svg className="lux-scene-corner br" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg4)" strokeWidth="1.2"/><path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg4)" strokeWidth=".7" strokeOpacity=".6"/><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg4)" fillOpacity=".8"/><defs><linearGradient id="dg4" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="50%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/></linearGradient></defs></svg>
        <div className="lux-scene-line top"/>
        <div className="lux-scene-line bottom"/>

        {/* Crown */}
        <div className="scene-crown">
          <svg viewBox="0 0 120 60" fill="none" style={{width:72,height:36}}>
            <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#cg1)" strokeWidth="1.4" strokeLinejoin="round"/>
            <circle cx="60" cy="5" r="3.5" fill="url(#cg1)"/>
            <circle cx="30" cy="40" r="2.5" fill="url(#cg1)"/>
            <circle cx="90" cy="40" r="2.5" fill="url(#cg1)"/>
            <path d="M4 50 L116 50" stroke="url(#cg1)" strokeWidth="1"/>
            <defs><linearGradient id="cg1" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B6914"/><stop offset="40%" stopColor="#D4AF37"/><stop offset="60%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914"/></linearGradient></defs>
          </svg>
        </div>
        <p className="scene-subtitle">Invitație de Nuntă</p>
        <h1 className="scene-names">
          <strong>{s.bride_name}</strong>
          <span>&amp;</span>
          <strong>{s.groom_name}</strong>
        </h1>

        {/* Envelope */}
        <div className="envelope-wrap" id="envelope-wrap" role="button" tabIndex={0} aria-label="Deschide invitația">
          <div className="envelope-shadow"/>
          {/* Letter */}
          <div className="envelope-letter" id="envelope-letter">
            <div className="letter-lines"/>
            <div className="letter-border"/>
            <div className="letter-content">
              <p className="letter-couple">{s.bride_name} &amp; {s.groom_name}</p>
              <div className="letter-divider"/>
              <p className="letter-date">
                {s.wedding_date ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
              </p>
            </div>
          </div>
          {/* Body */}
          <div className="envelope-body">
            <div className="envelope-inner">
              <div className="env-noise"/>
              <div className="env-left"/>
              <div className="env-right"/>
              <div className="env-bottom"/>
              <div className="env-top-line"/>
            </div>
            {/* Seal */}
            <div className="envelope-seal" id="envelope-seal">
              <div className="seal-ring-outer"/>
              <div className="seal-ring-inner"/>
              <span className="seal-text">{brideInitial}&amp;{groomInitial}</span>
            </div>
            {/* Flap */}
            <div className="envelope-flap" id="envelope-flap">
              <div className="flap-sheen"/>
            </div>
          </div>
        </div>

        <p className="open-hint" id="open-hint">Atinge pentru a deschide</p>
      </div>

      {/* ══════════════════════════════════════
          MAIN INVITATION
      ══════════════════════════════════════ */}
      <div className="lux-invitation" id="lux-invitation">

        {/* HERO */}
        <section className="lux-hero">
          <div className="hero-bg-grad"/>
          <svg className="hero-corner tl" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#hdg1)" strokeWidth="1.2"/><defs><linearGradient id="hdg1" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
          <svg className="hero-corner tr" viewBox="0 0 160 160" fill="none"><path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#hdg2)" strokeWidth="1.2"/><defs><linearGradient id="hdg2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#8B6914" stopOpacity=".3"/></linearGradient></defs></svg>
          <div className="hero-inner">
            <div className="hero-crown">
              <svg viewBox="0 0 120 60" fill="none" style={{width:72,height:36}}>
                <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z" fill="none" stroke="url(#hcg)" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="60" cy="5" r="3.5" fill="url(#hcg)"/>
                <circle cx="30" cy="40" r="2.5" fill="url(#hcg)"/>
                <circle cx="90" cy="40" r="2.5" fill="url(#hcg)"/>
                <path d="M4 50 L116 50" stroke="url(#hcg)" strokeWidth="1"/>
                <defs><linearGradient id="hcg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#8B6914"/><stop offset="40%" stopColor="#D4AF37"/><stop offset="60%" stopColor="#F5D678"/><stop offset="100%" stopColor="#8B6914"/></linearGradient></defs>
              </svg>
            </div>
            <p className="hero-eyebrow">VĂ INVITĂM</p>
            <div className="hero-names">{s.bride_name}</div>
            <span className="hero-amp">&amp;</span>
            <div className="hero-names">{s.groom_name}</div>

            <div className="gold-divider" style={{margin:'20px auto'}}>
              <div className="gold-divider-line-l"/>
              <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
                <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/>
                <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/>
                <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
                <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
              </svg>
              <div className="gold-divider-line-r"/>
            </div>

            <div className="hero-extra">
              <p>Alături de nașii: {s.nasi_names}</p>
              <p>Împreună cu părinții: {s.parents_names}</p>
            </div>

            {s.wedding_date && <Countdown targetDate={s.wedding_date} />}
          </div>
        </section>

        {/* DETAILS */}
        <section className="lux-details">

          {/* Party box */}
          <div className="lux-info-box">
            <div className="info-box-corner tl"/><div className="info-box-corner tr"/>
            <div className="info-box-corner bl"/><div className="info-box-corner br"/>
            <h3 className="gold-heading">PETRECEREA</h3>
            <p className="event-date">
              {s.wedding_date ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data nesetată'}
            </p>
            <p className="event-time">Ora {s.wedding_time || '--:--'}</p>
            <p className="event-location">{s.location_name}</p>
            <div className="nav-btns">
              {s.waze_url && <a href={s.waze_url} target="_blank" className="btn-gold">WAZE</a>}
              {s.google_maps_url && <a href={s.google_maps_url} target="_blank" className="btn-gold">GOOGLE MAPS</a>}
            </div>
          </div>

          {/* Religious box */}
          {s.is_religious_active && (
            <div className="lux-info-box">
              <div className="info-box-corner tl"/><div className="info-box-corner tr"/>
              <div className="info-box-corner bl"/><div className="info-box-corner br"/>
              <h3 className="gold-heading">CUNUNIA RELIGIOASĂ</h3>
              <p className="event-date">{s.religious_date ? new Date(s.religious_date).toLocaleDateString('ro-RO') : ''}</p>
              <p className="event-time">Ora {s.religious_time}</p>
              <p className="event-location">{s.religious_location}</p>
              {s.religious_waze && (
                <div className="nav-btns">
                  <a href={s.religious_waze} target="_blank" className="btn-gold">WAZE BISERICĂ</a>
                </div>
              )}
            </div>
          )}

          <div className="gold-divider"><div className="gold-divider-line-l"/><svg viewBox="0 0 60 20" width="60" height="20" fill="none"><rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/><circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/><circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/><circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/></svg><div className="gold-divider-line-r"/></div>

          {/* Story */}
          {s.our_story && (
            <div className="lux-story">
              <p className="story-text">"{s.our_story}"</p>
            </div>
          )}

          {/* ── MENU BUTTON (opens modal via JS) ── */}
          {s.is_menu_active && s.menu_details?.categories && (
            <div className="menu-btn-section">
              <h3 className="gold-heading" style={{marginBottom:16}}>MENIUL EVENIMENTULUI</h3>
              <button
                className="btn-gold-solid"
                id="open-menu-modal"
                aria-label="Deschide meniu"
              >
                <span>◆ Vezi Meniu ◆</span>
              </button>
            </div>
          )}

          {/* ── MENU MODAL (hidden by default, shown via JS) ── */}
          {s.is_menu_active && s.menu_details?.categories && (
            <div className="lux-modal-overlay" id="menu-modal" style={{display:'none'}} role="dialog" aria-modal="true" aria-label="Meniu eveniment">
              <div className="lux-modal" style={{maxWidth:600}}>
                <div className="modal-top-line"/>
                <button className="modal-close-btn" id="close-menu-modal" aria-label="Închide">✕</button>
                <div style={{textAlign:'center',marginBottom:28}}>
                  <p className="modal-eyebrow">◆ Gastronomie ◆</p>
                  <h2 className="modal-heading">Meniul Evenimentului</h2>
                  <div className="modal-divider"/>
                </div>
                {s.menu_details.categories
                  .filter((cat: any) => cat.active && cat.items && cat.items.length > 0)
                  .map((cat: any, cIdx: number) => (
                    <div key={cIdx} style={{marginBottom:36}}>
                      <div className="menu-cat-header">
                        <h4 className="menu-cat-title">
                          <span style={{marginRight:10}}>{cat.emoji}</span>
                          {cat.label}
                        </h4>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:16}}>
                        {cat.items.map((item: any, iIdx: number) => (
                          <div key={iIdx}>
                            <div className="menu-item-name">{item.name}</div>
                            {item.description && (
                              <div className="menu-item-desc">{item.description}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                <div style={{textAlign:'center',marginTop:24}}>
                  <button className="btn-gold-solid" id="close-menu-modal-2" style={{minWidth:160}}>
                    <span>◆ Închide ◆</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="gold-divider"><div className="gold-divider-line-l"/><svg viewBox="0 0 60 20" width="60" height="20" fill="none"><rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/><circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/><circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/><circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/></svg><div className="gold-divider-line-r"/></div>

          {/* Gallery */}
          {s.gallery_status === 'active' && s.photos_expires_at && new Date(s.photos_expires_at).getTime() > new Date().getTime() && (
            <div className="gallery-section">
              <h3 className="gold-heading">📸 GALERIE FOTO LIVE</h3>
              <p className="gallery-hint">Împărtășește momentele surprinse de tine cu noi!</p>
              <a href={`/invitatie/lux/${params.slug}/upload`} className="gallery-btn">
                ÎNCARCĂ POZE
              </a>
            </div>
          )}

          {/* Extras */}
          {(s.is_accommodation_active || s.is_transport_active) && (
            <div className="extras-icons">
              {s.is_accommodation_active && <div style={{fontSize:'2.5rem'}} title="Cazare disponibilă">🏠</div>}
              {s.is_transport_active && <div style={{fontSize:'2.5rem'}} title="Transport asigurat">🚌</div>}
            </div>
          )}
        </section>

        {/* ── RSVP SECTION ── */}
        <section id="rsvp" className="lux-rsvp">
          <div className="rsvp-inner" style={{textAlign:'center'}}>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(14px,1.7vw,17px)',fontStyle:'italic',color:'rgba(212,175,55,.55)',marginBottom:20,lineHeight:1.7}}>
              Vă rugăm să confirmați prezența Dvs.
            </p>
            <button
              className="btn-gold-solid"
              id="open-rsvp-modal"
              style={{width:'100%',maxWidth:400,display:'block',margin:'0 auto',padding:'clamp(14px,2vw,18px) 0'}}
              aria-label="Deschide formular RSVP"
            >
              <span>◆ Confirmă Prezența ◆</span>
            </button>
          </div>
        </section>

        {/* ── RSVP MODAL ── */}
        <div className="lux-modal-overlay" id="rsvp-modal" style={{display:'none'}} role="dialog" aria-modal="true" aria-label="Confirmare prezenta">
          <div className="lux-modal">
            <div className="modal-top-line"/>
            <button className="modal-close-btn" id="close-rsvp-modal" aria-label="Închide">✕</button>
            <LuxRsvpForm
              orderId={s.order_id}
              showAccommodation={s.is_accommodation_active}
              showTransport={s.is_transport_active}
            />
          </div>
        </div>

        <footer className="lux-footer">
          Contact: {s.contact_phone_bride} / {s.contact_phone_groom}
        </footer>
      </div>

      {/* ══════════════════════════════════════
          CLIENT-SIDE SCENE CONTROLLER
      ══════════════════════════════════════ */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function init() {
          /* ── Re-try until DOM elements exist ── */
          var scene, invite, envWrap, letter, flap, seal, hint;
          var phase = 'envelope';
          var autoTimer = null;
          var countdownTimer = null;
          var AUTO_OPEN_SEC = 5; /* secunde până la deschidere automată */

          function grabElements() {
            scene   = document.getElementById('lux-scene');
            invite  = document.getElementById('lux-invitation');
            envWrap = document.getElementById('envelope-wrap');
            letter  = document.getElementById('envelope-letter');
            flap    = document.getElementById('envelope-flap');
            seal    = document.getElementById('envelope-seal');
            hint    = document.getElementById('open-hint');
            return !!(scene && invite && envWrap && letter && flap && seal && hint);
          }

          function openEnvelope() {
            if (phase !== 'envelope') return;
            phase = 'opening';
            /* Oprește countdown-ul automat */
            if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
            if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }

            if (hint) { hint.className = 'open-hint opening'; hint.textContent = '◆  Dezvăluind invitația  ◆'; }
            if (flap) flap.classList.add('opening');
            if (seal) seal.classList.add('opening');
            setTimeout(function() { if (letter) letter.classList.add('opening'); }, 300);
            setTimeout(function() {
              phase = 'invite';
              if (scene) scene.classList.add('hidden');
              if (invite) invite.classList.add('visible');
            }, 1700);
          }

          function startAutoOpen() {
            var sec = AUTO_OPEN_SEC;
            /* Actualizăm hint-ul cu countdown */
            countdownTimer = setInterval(function() {
              sec--;
              if (hint && phase === 'envelope') {
                hint.textContent = sec > 0
                  ? ('Atinge pentru a deschide · ' + sec + 's')
                  : 'Se deschide...';
              }
              if (sec <= 0) {
                clearInterval(countdownTimer);
                countdownTimer = null;
              }
            }, 1000);

            autoTimer = setTimeout(function() {
              if (phase === 'envelope') openEnvelope();
            }, AUTO_OPEN_SEC * 1000);
          }

          function setup() {
            if (!grabElements()) {
              /* DOM nu e gata încă — mai încearcă */
              setTimeout(setup, 50);
              return;
            }

            /* Click & keyboard pe plic */
            envWrap.addEventListener('click', openEnvelope);
            envWrap.addEventListener('keydown', function(e) {
              if (e.key === 'Enter' || e.key === ' ') openEnvelope();
            });
            /* Touch pe tot ecranul scenei */
            scene.addEventListener('click', function(e) {
              if (phase === 'envelope') openEnvelope();
            });

            /* Pornește countdown auto-open */
            startAutoOpen();

            /* ── RSVP Modal ── */
            var rsvpModal   = document.getElementById('rsvp-modal');
            var openRsvpBtn = document.getElementById('open-rsvp-modal');
            var closeRsvpBtn= document.getElementById('close-rsvp-modal');

            function openRsvpModal()  { if (rsvpModal) { rsvpModal.style.display = 'flex'; document.body.style.overflow = 'hidden'; } }
            function closeRsvpModal() { if (rsvpModal) { rsvpModal.style.display = 'none';  document.body.style.overflow = ''; } }

            if (openRsvpBtn)  openRsvpBtn.addEventListener('click', openRsvpModal);
            if (closeRsvpBtn) closeRsvpBtn.addEventListener('click', closeRsvpModal);
            if (rsvpModal)    rsvpModal.addEventListener('click', function(e) { if (e.target === rsvpModal) closeRsvpModal(); });

            /* ── Menu Modal ── */
            var menuModal    = document.getElementById('menu-modal');
            var openMenuBtn  = document.getElementById('open-menu-modal');
            var closeMenuBtn = document.getElementById('close-menu-modal');
            var closeMenuBtn2= document.getElementById('close-menu-modal-2');

            function openMenuModal()  { if (menuModal) { menuModal.style.display = 'flex'; document.body.style.overflow = 'hidden'; } }
            function closeMenuModal() { if (menuModal) { menuModal.style.display = 'none';  document.body.style.overflow = ''; } }

            if (openMenuBtn)   openMenuBtn.addEventListener('click', openMenuModal);
            if (closeMenuBtn)  closeMenuBtn.addEventListener('click', closeMenuModal);
            if (closeMenuBtn2) closeMenuBtn2.addEventListener('click', closeMenuModal);
            if (menuModal)     menuModal.addEventListener('click', function(e) { if (e.target === menuModal) closeMenuModal(); });

            /* Escape */
            document.addEventListener('keydown', function(e) {
              if (e.key === 'Escape') { closeRsvpModal(); closeMenuModal(); }
            });
          }

          /* Pornim setup imediat + fallback pe DOMContentLoaded + load */
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
          } else {
            setup();
          }
        })();
      `}} />
    </>
  );
}
