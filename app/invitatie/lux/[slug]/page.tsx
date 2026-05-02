
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
import MenuSection from "./MenuSection";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);

  const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;

  if (!data || data.length === 0) notFound();
  const s = data[0];

  await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE id = ${s.id}`;

  return (
    <div style={publicWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        @keyframes lux-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* ── Layout helpers ── */
        .lux-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(40px,8vw,100px) clamp(20px,5vw,60px);
          position: relative;
          border-bottom: 1px solid rgba(212,175,55,.12);
        }
        .lux-names {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px,11vw,110px);
          font-weight: 300;
          font-style: italic;
          color: #F5E6A8;
          line-height: .9;
          letter-spacing: -.01em;
          text-shadow: 0 0 80px rgba(212,175,55,.2);
          margin: 0;
        }
        .lux-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(8px,1.1vw,11px);
          letter-spacing: .38em;
          text-transform: uppercase;
          color: rgba(212,175,55,.6);
        }
        .lux-info-card {
          border: 1px solid rgba(212,175,55,.18);
          border-radius: 20px;
          background: rgba(255,255,255,.025);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .lux-info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 80px rgba(0,0,0,.7), 0 0 40px rgba(212,175,55,.08);
        }
        .lux-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 8px;
          font-family: 'Cinzel', serif;
          font-size: clamp(9px,1vw,11px);
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all .2s ease;
          border: none;
          flex: 1;
        }
        .lux-btn-gold {
          background: linear-gradient(135deg,#8B6914 0%,#D4AF37 45%,#F5D678 55%,#D4AF37 70%,#8B6914 100%);
          color: #0A0803;
          font-weight: 700;
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(212,175,55,.3);
        }
        .lux-btn-gold::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          background-size: 600px 100%;
          animation: shimmer 3s linear infinite;
        }
        .lux-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 14px 48px rgba(212,175,55,.5); }
        .lux-btn-waze {
          background: linear-gradient(135deg,rgba(8,162,212,.2),rgba(8,162,212,.1));
          border: 1px solid rgba(8,162,212,.3) !important;
          color: rgba(140,210,240,.9);
        }
        .lux-btn-maps {
          background: linear-gradient(135deg,rgba(76,175,79,.18),rgba(76,175,79,.08));
          border: 1px solid rgba(76,175,79,.28) !important;
          color: rgba(120,210,120,.9);
        }
        .art-deco-corner {
          position: absolute;
          pointer-events: none;
          width: clamp(120px,16vw,200px);
          height: clamp(120px,16vw,200px);
          opacity: .65;
        }
        .section-detail {
          padding: clamp(60px,8vw,100px) clamp(16px,4vw,40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(32px,4vw,48px);
        }
        @media (max-width:600px) {
          .lux-names { font-size: clamp(44px,14vw,80px); }
          .lux-info-card:hover { transform: none; }
        }
      `}</style>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="lux-hero" style={{
        background: 'radial-gradient(ellipse 90% 80% at 50% 40%,#1A1408 0%,#0A0803 55%,#050401 100%)'
      }}>
        {/* Art Deco Corners */}
        <ArtDecoCornerSVG style={{ top: 0, left: 0 }} />
        <ArtDecoCornerSVG style={{ top: 0, right: 0 }} flip />
        <ArtDecoCornerSVG style={{ bottom: 0, left: 0 }} flipY />
        <ArtDecoCornerSVG style={{ bottom: 0, right: 0 }} flip flipY />

        <div style={{ position: 'absolute', top: '8%', left: '5%', right: '5%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)', pointerEvents: 'none' }}/>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', maxWidth: 700 }}>

          <div style={{ animation: 'fadeUp .6s ease both', marginBottom: 12 }}>
            <CrownSVG />
          </div>

          <p className="lux-label" style={{ animation: 'fadeUp .7s ease both .08s', marginBottom: 20 }}>
            VĂ INVITĂM
          </p>

          {/* Names */}
          <div style={{ animation: 'fadeUp .8s ease both .14s', textAlign: 'center', marginBottom: 16 }}>
            <h2 className="lux-names">{s.bride_name}</h2>
            <div className="lux-label" style={{ color: 'rgba(212,175,55,.45)', letterSpacing: '.3em', margin: '10px 0', fontSize: 'clamp(13px,1.8vw,20px)' }}>&amp;</div>
            <h2 className="lux-names">{s.groom_name}</h2>
          </div>

          <GoldDividerSVG style={{ animation: 'fadeUp .8s ease both .2s', marginBottom: 20 }} />

          {/* Nași + Părinți */}
          <div style={{ animation: 'fadeUp .8s ease both .26s', textAlign: 'center', lineHeight: 1.9 }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,1.6vw,17px)', fontStyle: 'italic', color: 'rgba(245,230,168,.6)', marginBottom: 6 }}>
              Alături de nașii: <span style={{ color: '#D4AF37' }}>{s.nasi_names}</span>
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(12px,1.4vw,15px)', fontStyle: 'italic', color: 'rgba(245,230,168,.4)' }}>
              Împreună cu părinții: {s.parents_names}
            </p>
          </div>

          {/* Countdown */}
          {s.wedding_date && (
            <div style={{ animation: 'fadeUp .8s ease both .32s', width: '100%', marginTop: 32 }}>
              <Countdown targetDate={s.wedding_date} />
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════
          DETALII
      ════════════════════════════════ */}
      <section className="section-detail" style={{ background: '#070602' }}>

        {/* PETRECERE */}
        <div className="lux-info-card" style={{ width: '100%', maxWidth: 560, boxShadow: '0 8px 60px rgba(0,0,0,.6)' }}>
          <div style={{ padding: '20px 28px 16px', background: 'linear-gradient(135deg,rgba(212,175,55,.12) 0%,rgba(212,175,55,.05) 100%)', borderBottom: '1px solid rgba(212,175,55,.12)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                <path d="M8 18c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-2 3-6 3-6s3 4 3 6z"/>
                <path d="M5 12V4M19 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4zM17 10V6M12 8l2-2M12 8l-2-2M12 8v4"/>
              </svg>
            </div>
            <div>
              <p className="lux-label" style={{ fontSize: 8, letterSpacing: '.22em', color: 'rgba(212,175,55,.5)', marginBottom: 3 }}>EVENIMENTUL PRINCIPAL</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(18px,2.5vw,24px)', fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', margin: 0 }}>PETRECEREA</h3>
            </div>
          </div>
          <div style={{ padding: '24px 28px 28px' }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(14px,1.8vw,18px)', color: '#D4AF37', fontWeight: 400, marginBottom: 6, letterSpacing: '.05em' }}>
              {s.wedding_date
                ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Data nesetată'}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,1.6vw,16px)', fontStyle: 'italic', color: 'rgba(245,230,168,.5)', marginBottom: 16 }}>
              Ora {s.wedding_time || '--:--'}
            </p>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(12px,1.5vw,15px)', color: '#F5E6A8', fontWeight: 600, marginBottom: 20, letterSpacing: '.06em' }}>
              {s.location_name}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {s.waze_url && (
                <a href={s.waze_url} target="_blank" className="lux-btn lux-btn-waze" style={{ border: '1px solid rgba(8,162,212,.3)' }}>
                  <WazeIcon /> Waze
                </a>
              )}
              {s.google_maps_url && (
                <a href={s.google_maps_url} target="_blank" className="lux-btn lux-btn-maps" style={{ border: '1px solid rgba(76,175,79,.28)' }}>
                  <MapsIcon /> Google Maps
                </a>
              )}
            </div>
          </div>
        </div>

        {/* CUNUNIA RELIGIOASĂ */}
        {s.is_religious_active && (
          <div className="lux-info-card" style={{ width: '100%', maxWidth: 560, boxShadow: '0 8px 60px rgba(0,0,0,.6)' }}>
            <div style={{ padding: '20px 28px 16px', background: 'linear-gradient(135deg,rgba(212,175,55,.12) 0%,rgba(212,175,55,.05) 100%)', borderBottom: '1px solid rgba(212,175,55,.12)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <path d="M12 2L12 6M10 4h4"/>
                  <rect x="4" y="9" width="16" height="12" rx="1"/>
                  <path d="M9 21V14a3 3 0 0 1 6 0v7M4 9l8-4 8 4"/>
                </svg>
              </div>
              <div>
                <p className="lux-label" style={{ fontSize: 8, letterSpacing: '.22em', color: 'rgba(212,175,55,.5)', marginBottom: 3 }}>CEREMONIE</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(18px,2.5vw,24px)', fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', margin: 0 }}>CUNUNIA RELIGIOASĂ</h3>
              </div>
            </div>
            <div style={{ padding: '24px 28px 28px' }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(13px,1.6vw,16px)', color: '#D4AF37', marginBottom: 6 }}>
                {s.religious_date ? new Date(s.religious_date).toLocaleDateString('ro-RO') : ''}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,1.5vw,16px)', fontStyle: 'italic', color: 'rgba(245,230,168,.5)', marginBottom: 10 }}>
                Ora {s.religious_time}
              </p>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(12px,1.4vw,14px)', color: '#F5E6A8', fontWeight: 600, marginBottom: 20 }}>
                {s.religious_location}
              </p>
              {s.religious_waze && (
                <a href={s.religious_waze} target="_blank" className="lux-btn lux-btn-waze" style={{ border: '1px solid rgba(8,162,212,.3)', display: 'inline-flex' }}>
                  <WazeIcon /> Waze Biserică
                </a>
              )}
            </div>
          </div>
        )}

        {/* POVESTEA NOASTRĂ */}
        {s.our_story && (
          <div style={{ maxWidth: 600, width: '100%', padding: '0 8px', textAlign: 'center' }}>
            <GoldDividerSVG />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(16px,2vw,20px)', lineHeight: 1.9, color: 'rgba(245,230,168,.65)', marginTop: 32 }}>
              &ldquo;{s.our_story}&rdquo;
            </p>
            <GoldDividerSVG style={{ marginTop: 32 }} />
          </div>
        )}

        {/* ════════════════════════════════
            MENIU — apare DOAR dacă mirii
            l-au activat din dashboard
            ŞI există cel puțin o categorie
            activă cu items adăugate
        ════════════════════════════════ */}
        {s.is_menu_active && s.menu_details?.categories && (
          <MenuSection menuDetails={s.menu_details} />
        )}

        {/* GALERIE FOTO LIVE */}
        {s.gallery_status === 'active' && s.photos_expires_at && new Date(s.photos_expires_at).getTime() > new Date().getTime() && (
          <div style={{ width: '100%', maxWidth: 560, border: '1.5px dashed rgba(212,175,55,.25)', borderRadius: 24, padding: 'clamp(28px,4vw,44px) clamp(20px,4vw,36px)', textAlign: 'center', background: 'linear-gradient(160deg,rgba(212,175,55,.06) 0%,rgba(212,175,55,.02) 100%)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .03, transform: 'scale(3)', pointerEvents: 'none' }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: 80, height: 80 }}>
                <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.5"/>
                <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5"/>
                <circle cx="24" cy="28" r="4" fill="#D4AF37"/>
              </svg>
            </div>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(212,175,55,.1)', border: '2px solid rgba(212,175,55,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: 38, height: 38 }}>
                <rect x="4" y="14" width="40" height="28" rx="4" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7"/>
                <path d="M14 14 L17 8 L31 8 L34 14" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity=".7" strokeLinejoin="round"/>
                <circle cx="24" cy="28" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity=".7"/>
                <circle cx="24" cy="28" r="4" fill="#D4AF37" fillOpacity=".28"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,3vw,28px)', fontStyle: 'italic', fontWeight: 300, color: '#F5E6A8', marginBottom: 12 }}>
              📸 Galerie Foto Live
            </h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(13px,1.6vw,16px)', color: 'rgba(212,175,55,.5)', marginBottom: 24, lineHeight: 1.8 }}>
              Împărtășește momentele surprinse de tine cu noi!
            </p>
            <a href={`/invitatie/lux/${params.slug}/upload`} className="lux-btn lux-btn-gold" style={{ padding: '14px 40px', fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: '.2em', display: 'inline-flex' }}>
              ✦ Încarcă Poze
            </a>
          </div>
        )}

        {/* ICONIȚE CAZARE & TRANSPORT */}
        {(s.is_accommodation_active || s.is_transport_active) && (
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', padding: '16px 20px' }}>
            {s.is_accommodation_active && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: '2.8rem' }} title="Cazare disponibilă">🏠</div>
                <p className="lux-label" style={{ fontSize: 8, color: 'rgba(212,175,55,.4)' }}>CAZARE</p>
              </div>
            )}
            {s.is_transport_active && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: '2.8rem' }} title="Transport asigurat">🚌</div>
                <p className="lux-label" style={{ fontSize: 8, color: 'rgba(212,175,55,.4)' }}>TRANSPORT</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ════════════════════════════════
          RSVP
      ════════════════════════════════ */}
      <section id="rsvp" style={{ padding: 'clamp(60px,8vw,120px) clamp(16px,4vw,40px)', background: '#050401', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)' }}/>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <CrownSVG />
            <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(14px,1.8vw,18px)', letterSpacing: '.32em', color: '#D4AF37', marginTop: 16, marginBottom: 8 }}>
              R · S · V · P
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.7vw,17px)', color: 'rgba(245,230,168,.5)' }}>
              Confirmați prezența Dvs.
            </p>
          </div>
          <LuxRsvpForm
            orderId={s.order_id}
            showAccommodation={s.is_accommodation_active}
            showTransport={s.is_transport_active}
          />
        </div>
      </section>

      <footer style={{ padding: 'clamp(30px,4vw,50px) 20px', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,.08)' }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.22em', color: 'rgba(212,175,55,.3)' }}>
          {s.contact_phone_bride} · {s.contact_phone_groom}
        </p>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SVG HELPERS
───────────────────────────────────────────────── */

function CrownSVG() {
  return (
    <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 80, height: 40, display: 'block', margin: '0 auto' }}>
      <path d="M10 50 L10 20 L30 40 L60 5 L90 40 L110 20 L110 50 Z"
        fill="none" stroke="url(#cg)" strokeWidth="1.4" strokeLinejoin="round"/>
      <circle cx="60" cy="5" r="3.5" fill="url(#cg)"/>
      <circle cx="30" cy="40" r="2.5" fill="url(#cg)"/>
      <circle cx="90" cy="40" r="2.5" fill="url(#cg)"/>
      <circle cx="10" cy="20" r="2" fill="url(#cg)"/>
      <circle cx="110" cy="20" r="2" fill="url(#cg)"/>
      <path d="M4 50 L116 50" stroke="url(#cg)" strokeWidth="1"/>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#8B6914"/>
          <stop offset="40%"  stopColor="#D4AF37"/>
          <stop offset="60%"  stopColor="#F5D678"/>
          <stop offset="100%" stopColor="#8B6914"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function ArtDecoCornerSVG({ style, flip, flipY }: { style?: React.CSSProperties; flip?: boolean; flipY?: boolean }) {
  return (
    <div className="art-deco-corner" style={style}>
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scale(${flip ? -1 : 1},${flipY ? -1 : 1})`, width: '100%', height: '100%' }}>
        <path d="M8 8 L8 120 M8 8 L120 8" stroke="url(#dg)" strokeWidth="1.2"/>
        <path d="M18 18 L18 100 M18 18 L100 18" stroke="url(#dg)" strokeWidth=".7" strokeOpacity=".6"/>
        <path d="M28 28 L28 80 M28 28 L80 28" stroke="url(#dg)" strokeWidth=".5" strokeOpacity=".4"/>
        <path d="M8 50 L22 50 M8 70 L16 70 M8 90 L16 90" stroke="url(#dg)" strokeWidth=".8"/>
        <path d="M50 8 L50 22 M70 8 L70 16 M90 8 L90 16" stroke="url(#dg)" strokeWidth=".8"/>
        <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#dg)" fillOpacity=".8"/>
        <rect x="13" y="13" width="7" height="7" transform="rotate(45 18 18)"
          fill="none" stroke="url(#dg)" strokeWidth=".8" strokeOpacity=".5"/>
        <defs>
          <linearGradient id="dg" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#D4AF37"/>
            <stop offset="50%"  stopColor="#F5D678"/>
            <stop offset="100%" stopColor="#8B6914" stopOpacity=".4"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function GoldDividerSVG({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 440, margin: '0 auto', ...style }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.5))' }}/>
      <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
        <path d="M5 10 L20 10"  stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
        <path d="M40 10 L55 10" stroke="#D4AF37" strokeWidth=".8" strokeOpacity=".6"/>
        <rect x="25" y="5" width="10" height="10" transform="rotate(45 30 10)"
          fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity=".9"/>
        <circle cx="30" cy="10" r="2" fill="#D4AF37" fillOpacity=".8"/>
        <circle cx="18" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
        <circle cx="42" cy="10" r="1" fill="#D4AF37" fillOpacity=".5"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,.5),transparent)' }}/>
    </div>
  );
}

function WazeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
      <path d="M20.54 6.63A10.22 10.22 0 0 0 12 2a10.22 10.22 0 0 0-8.54 4.63A10 10 0 0 0 2 12.27C2.06 17.73 6.58 22 12.08 22H20a2 2 0 0 0 2-2v-7.73a10 10 0 0 0-1.46-5.64zM8.5 14a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 14zm7 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.5 14z"/>
    </svg>
  );
}

function MapsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}

/* STYLES */
const publicWrapper: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  background: '#050401', color: '#fff', textAlign: 'center', zIndex: 99999,
  fontFamily: 'serif', overflowY: 'auto', overflowX: 'hidden',
};
