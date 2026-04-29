

// import { neon } from "@neondatabase/serverless";
// import { notFound } from "next/navigation";
// import LuxRsvpForm from "./LuxRsvpForm";

// export default async function LuxInvitationPage({ params }: { params: { slug: string } }) {
//   const { slug } = params;
//   const sql = neon(process.env.DATABASE_URL!);
  
//   // Luăm toate datele din baza de date
//   const wedding = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${slug}`;
//   if (!wedding.length) notFound();
//   const data = wedding[0];

//   // Generăm link-urile de hărți dacă nu sunt puse manual
//   const googleMapsUrl = data.google_maps_url?.startsWith('http') 
//     ? data.google_maps_url 
//     : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location_name)}`;

//   const wazeUrl = data.waze_url?.startsWith('http') 
//     ? data.waze_url 
//     : `https://waze.com/ul?q=${encodeURIComponent(data.location_name)}`;

//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       background: '#0a0a0a', 
//       color: '#d4af37', 
//       fontFamily: "'Playfair Display', serif", 
//       padding: '60px 20px',
//       border: '12px solid #d4af37',
//       boxSizing: 'border-box',
//       textAlign: 'center'
//     }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <h2 style={{ letterSpacing: '8px', fontSize: '0.8rem', opacity: 0.8, marginBottom: '20px' }}>VĂ INVITĂM</h2>
        
//         {/* MIRII */}
//         <h1 style={{ fontSize: '3.5rem', margin: '20px 0', fontWeight: '400', textTransform: 'uppercase' }}>
//           {data.bride_name} <br/> & <br/> {data.groom_name}
//         </h1>

//         <div style={{ height: '1px', width: '100px', background: '#d4af37', margin: '30px auto' }}></div>

//         {/* NAȘII - SECȚIUNE NOUĂ */}
//         {data.nasi_names && (
//           <div style={{ marginBottom: '20px' }}>
//             <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#fff', opacity: 0.9 }}>Alături de nașii:</p>
//             <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data.nasi_names}</p>
//           </div>
//         )}

//         {/* PĂRINȚII - SECȚIUNE NOUĂ */}
//         {data.parents_names && (
//           <div style={{ marginBottom: '30px' }}>
//             <p style={{ fontSize: '0.9rem', color: '#fff', opacity: 0.7 }}>Cu binecuvântarea părinților:</p>
//             <p style={{ fontSize: '1.1rem' }}>{data.parents_names}</p>
//           </div>
//         )}

//         {/* DATA ȘI LOCAȚIA */}
//         <p style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#fff' }}>
//           {data.wedding_date 
//             ? new Date(data.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) 
//             : "Data va fi anunțată"}
//         </p>
//         <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>📍 {data.location_name}</p>

//         {/* BUTOANE LOCAȚIE - SECȚIUNE NOUĂ */}
//         <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '30px 0' }}>
//           <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={btnLocatie}>GOOGLE MAPS</a>
//           <a href={wazeUrl} target="_blank" rel="noopener noreferrer" style={btnLocatie}>WAZE</a>
//         </div>

//         {/* POVESTEA NOASTRĂ - SECȚIUNE NOUĂ */}
//         {data.our_story && (
//           <div style={{ marginTop: '50px', padding: '0 20px', fontStyle: 'italic', borderTop: '1px solid #d4af3733', paddingTop: '30px' }}>
//             <h3 style={{ fontSize: '0.9rem', letterSpacing: '3px', marginBottom: '15px' }}>POVESTEA NOASTRĂ</h3>
//             <p style={{ lineHeight: '1.8', color: '#eee' }}>"{data.our_story}"</p>
//           </div>
//         )}

//         <div style={{ height: '1px', width: '150px', background: '#d4af3722', margin: '50px auto' }}></div>

//         {/* FORMULARUL */}
//         <LuxRsvpForm orderId={data.order_id} />
//       </div>
//     </div>
//   );
// }

// const btnLocatie = {
//   padding: '10px 20px',
//   border: '1px solid #d4af37',
//   color: '#d4af37',
//   textDecoration: 'none',
//   fontSize: '0.7rem',
//   fontWeight: 'bold',
//   letterSpacing: '1px',
//   transition: '0.3s'
// };


import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import LuxRsvpForm from "./LuxRsvpForm";

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${params.slug} LIMIT 1`;

  if (!data || data.length === 0) notFound();
  const s = data[0];

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
      </section>

      {/* EVENIMENT RESTAURANT */}
      <section style={detailSection}>
        <div style={infoBox}>
          <h3 style={goldText}>PETRECEREA</h3>
          <p style={{ fontSize: '1.5rem' }}>{s.wedding_date ? new Date(s.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data nesetată'}</p>
          <p>Ora {s.wedding_time || '--:--'}</p>
          <p style={{ margin: '15px 0', fontWeight: 'bold' }}>{s.location_name}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {s.waze_url && <a href={s.waze_url} style={btnGold}>WAZE</a>}
            {s.google_maps_url && <a href={s.google_maps_url} style={btnGold}>GOOGLE MAPS</a>}
          </div>
        </div>

        {/* RELIGIOASĂ - SE AFIȘEAZĂ DOAR DACĂ E ACTIVĂ */}
        {s.is_religious_active && (
          <div style={infoBox}>
            <h3 style={goldText}>CUNUNIA RELIGIOASĂ</h3>
            <p>{s.religious_date ? new Date(s.religious_date).toLocaleDateString('ro-RO') : ''}</p>
            <p>Ora {s.religious_time}</p>
            <p>{s.religious_location}</p>
            {s.religious_waze && <a href={s.religious_waze} style={btnGold}>WAZE BISERICĂ</a>}
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

        {/* CAZARE & TRANSPORT */}
        {(s.is_accommodation_active || s.is_transport_active) && (
          <div style={infoBox}>
            <h3 style={goldText}>DETALII SUPLIMENTARE</h3>
            {s.is_accommodation_active && <p style={{ margin: '10px 0' }}>🏠 Punem la dispoziție locuri de cazare.</p>}
            {s.is_transport_active && <p style={{ margin: '10px 0' }}>🚌 Transportul este asigurat de către noi.</p>}
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
        Contact Miri: {s.contact_phone_bride} / {s.contact_phone_groom}
      </footer>
    </div>
  );
}

// STILURI FULLSCREEN PENTRU INVITATIE
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