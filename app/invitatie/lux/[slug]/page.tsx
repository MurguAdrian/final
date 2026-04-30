
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

//         {/* MENIU */}
//         {s.is_menu_active && s.menu_details?.items && (
//           <div style={infoBox}>
//             <h3 style={goldText}>MENIU</h3>
//             {s.menu_details.items.map((item: any, idx: number) => (
//               <div key={idx} style={{ marginBottom: '20px' }}>
//                 <div style={{ color: '#d4af37', fontWeight: 'bold' }}>{item.title}</div>
//                 <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.description}</div>
//               </div>
//             ))}
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

// Forțăm randarea dinamică pentru ca baza de date să fie interogată la fiecare vizită
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);
  
  // 1. Căutăm nunta în baza de date
  const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;

  if (!data || data.length === 0) notFound();
  const s = data[0];

  // ============================================================
  // 2. AICI ESTE LINIA DE COD: Incrementăm vizualizările în DB
  // ============================================================
  await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE id = ${s.id}`;

  return (
    <div style={publicWrapper}>
      {/* HEADER FULLSCREEN */}
      <section style={heroSection}>
        <h1 style={goldText}>VĂ INVITĂM</h1>
        <h2 style={namesText}>{s.bride_name} & {s.groom_name}</h2>
        <div style={{ opacity: 0.8 }}>
            <p>Alături de nașii: {s.nasi_names}</p>
            <p>Împreună cu părinții: {s.parents_names}</p>
        </div>

        {/* NUMĂRĂTOARE INVERSĂ (COUNTDOWN) */}
        {s.wedding_date && <Countdown targetDate={s.wedding_date} />}
      </section>

      {/* DETALII EVENIMENT */}
      <section style={detailSection}>
        <div style={infoBox}>
          <h3 style={goldText}>PETRECEREA</h3>
          <p style={{ fontSize: '1.5rem' }}>
            {s.wedding_date ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data nesetată'}
          </p>
          <p>Ora {s.wedding_time || '--:--'}</p>
          <p style={{ margin: '15px 0', fontWeight: 'bold' }}>{s.location_name}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {s.waze_url && <a href={s.waze_url} target="_blank" style={btnGold}>WAZE</a>}
            {s.google_maps_url && <a href={s.google_maps_url} target="_blank" style={btnGold}>GOOGLE MAPS</a>}
          </div>
        </div>

        {/* CUNUNIA RELIGIOASĂ */}
        {s.is_religious_active && (
          <div style={infoBox}>
            <h3 style={goldText}>CUNUNIA RELIGIOASĂ</h3>
            <p>{s.religious_date ? new Date(s.religious_date).toLocaleDateString('ro-RO') : ''}</p>
            <p>Ora {s.religious_time}</p>
            <p>{s.religious_location}</p>
            {s.religious_waze && <a href={s.religious_waze} target="_blank" style={btnGold}>WAZE BISERICĂ</a>}
          </div>
        )}

        {/* POVESTEA NOASTRĂ */}
        {s.our_story && (
          <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.8' }}>"{s.our_story}"</p>
          </div>
        )}

        {/* MENIU */}
        {s.is_menu_active && s.menu_details?.items && (
          <div style={infoBox}>
            <h3 style={goldText}>MENIU</h3>
            {s.menu_details.items.map((item: any, idx: number) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <div style={{ color: '#d4af37', fontWeight: 'bold' }}>{item.title}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.description}</div>
              </div>
            ))}
          </div>
        )}

{/* BUTON GALERIE FOTO LIVE - Apare doar dacă e activă și NEEXPIRATĂ */}
        {s.is_photos_active && s.gallery_status === 'active' && s.photos_expires_at && new Date(s.photos_expires_at) > new Date() && (
          <div style={{ padding: '40px 20px', borderTop: '1px solid #d4af3711' }}>
            <h3 style={goldText}>📸 GALERIE FOTO LIVE</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '20px' }}>
              Împarte momentele surprinse de tine cu noi!
            </p>
            <a 
              href={`/invitatie/lux/${params.slug}/upload`} 
              style={{ ...btnGold, padding: '15px 40px', fontSize: '1rem', background: '#d4af37', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}
            >
              ÎNCARCĂ POZE
            </a>
          </div>
        )}

        {/* ICONIȚE CAZARE & TRANSPORT */}
        {(s.is_accommodation_active || s.is_transport_active) && (
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', padding: '20px', marginTop: '20px' }}>
            {s.is_accommodation_active && <div style={{ fontSize: '2.5rem' }} title="Cazare disponibilă">🏠</div>}
            {s.is_transport_active && <div style={{ fontSize: '2.5rem' }} title="Transport asigurat">🚌</div>}
          </div>
        )}
      </section>

      {/* RSVP FORMULAR */}
      <section id="rsvp" style={{ padding: '100px 20px', background: '#080808' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <LuxRsvpForm 
             orderId={s.order_id} 
             showAccommodation={s.is_accommodation_active} 
             showTransport={s.is_transport_active} 
          />
        </div>
      </section>

      <footer style={{ padding: '50px', opacity: 0.4, fontSize: '0.7rem' }}>
        Contact: {s.contact_phone_bride} / {s.contact_phone_groom}
      </footer>
    </div>
  );
}

// STILURI PENTRU FULLSCREEN
const publicWrapper: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  background: '#000', color: '#fff', textAlign: 'center', zIndex: 99999,
  fontFamily: 'serif', overflowY: 'auto', overflowX: 'hidden'
};

const heroSection: React.CSSProperties = { 
  minHeight: '100vh', display: 'flex', flexDirection: 'column', 
  justifyContent: 'center', padding: '20px', borderBottom: '1px solid #d4af3722' 
};

const detailSection: React.CSSProperties = { padding: '80px 20px' };

const infoBox: React.CSSProperties = { 
  border: '1px solid #d4af3733', padding: '40px 20px', maxWidth: '550px', 
  margin: '0 auto 40px auto', background: '#0a0a0a' 
};

const goldText = { color: '#d4af37', letterSpacing: '4px', marginBottom: '20px' };
const namesText = { fontSize: '4rem', margin: '30px 0', fontWeight: '300', color: '#fff' };
const btnGold = { 
  display: 'inline-block', padding: '12px 25px', border: '1px solid #d4af37', 
  color: '#d4af37', textDecoration: 'none', fontSize: '0.7rem', marginTop: '10px' 
};