

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

export default async function LuxInvitationPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const sql = neon(process.env.DATABASE_URL!);
  
  const wedding = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${slug}`;
  if (!wedding.length) notFound();
  const data = wedding[0];

  // LOGICA COUNTDOWN
  const weddingTime = data.wedding_date ? new Date(data.wedding_date).getTime() : 0;
  const now = new Date().getTime();
  const timeLeft = weddingTime - now;
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  const googleMapsUrl = data.google_maps_url?.startsWith('http') ? data.google_maps_url : `http://google.com/maps?q=${encodeURIComponent(data.location_name)}`;
  const wazeUrl = data.waze_url?.startsWith('http') ? data.waze_url : `https://waze.com/ul?q=${encodeURIComponent(data.location_name)}`;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#d4af37', fontFamily: "'Playfair Display', serif", padding: '60px 20px', border: '12px solid #d4af37', boxSizing: 'border-box', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* COUNTDOWN */}
        {daysLeft > 0 && (
          <p style={{ letterSpacing: '3px', fontSize: '0.7rem', marginBottom: '40px', color: '#fff', opacity: 0.6 }}>
            AU MAI RĂMAS {daysLeft} ZILE PÂNĂ LA MARELE EVENIMENT
          </p>
        )}

        <h2 style={{ letterSpacing: '8px', fontSize: '0.8rem', opacity: 0.8 }}>VĂ INVITĂM</h2>
        <h1 style={{ fontSize: '3.5rem', margin: '20px 0', textTransform: 'uppercase' }}>{data.bride_name} & {data.groom_name}</h1>

        <div style={{ height: '1px', width: '100px', background: '#d4af37', margin: '30px auto' }}></div>

        {/* CUNUNIA RELIGIOASĂ (Dacă e activată) */}
        {data.is_religious_active && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1rem', letterSpacing: '3px' }}>CUNUNIA RELIGIOASĂ</h3>
            <p style={{ color: '#fff' }}>{data.religious_date ? new Date(data.religious_date).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' }) : ""} - {data.religious_location}</p>
            {data.religious_waze && <a href={data.religious_waze} target="_blank" style={{ fontSize: '0.6rem', color: '#d4af37', textDecoration: 'underline' }}>LOCAȚIE BISERICĂ</a>}
          </div>
        )}

        {/* PETRECEREA */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1rem', letterSpacing: '3px' }}>PETRECEREA</h3>
          <p style={{ fontSize: '1.5rem', color: '#fff' }}>{data.wedding_date ? new Date(data.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : ""}</p>
          <p style={{ fontSize: '1.2rem' }}>{data.location_name}</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0' }}>
            <a href={googleMapsUrl} target="_blank" style={btnLocatie}>MAPS</a>
            <a href={wazeUrl} target="_blank" style={btnLocatie}>WAZE</a>
          </div>
        </div>

        {/* MENIU (Dacă e activat) */}
        {data.is_menu_active && (
          <div style={{ margin: '40px 0' }}>
            <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '12px 30px', cursor: 'pointer', letterSpacing: '2px' }}>
              VEZI MENIUL
            </button>
          </div>
        )}

        {/* CONTACT MIRI */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '40px 0', fontSize: '0.8rem' }}>
          {data.contact_phone_bride && <a href={`tel:${data.contact_phone_bride}`} style={{ color: '#fff', textDecoration: 'none' }}>📞 Mireasă</a>}
          {data.contact_phone_groom && <a href={`tel:${data.contact_phone_groom}`} style={{ color: '#fff', textDecoration: 'none' }}>📞 Mire</a>}
        </div>

        {/* RSVP FORM - Trimitem bifele de transport/cazare către el */}
        <LuxRsvpForm 
           orderId={data.order_id} 
           showAccommodation={data.is_accommodation_active} 
           showTransport={data.is_transport_active} 
        />
      </div>
    </div>
  );
}

const btnLocatie = { padding: '8px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontSize: '0.6rem', fontWeight: 'bold' };