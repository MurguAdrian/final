

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

  // COUNTDOWN LOGIC
  const weddingTime = new Date(data.wedding_date).getTime();
  const daysLeft = Math.floor((weddingTime - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#d4af37', fontFamily: "serif", textAlign: 'center', padding: '60px 20px', border: '15px solid #d4af37' }}>
      {daysLeft > 0 && <p style={{ letterSpacing: '3px', fontSize: '0.8rem' }}>⏳ AU MAI RĂMAS {daysLeft} ZILE</p>}
      
      <h1 style={{ fontSize: '4rem', margin: '20px 0' }}>{data.bride_name} & {data.groom_name}</h1>
      <p>Nași: {data.nasi_names}</p>
      <p>Părinți: {data.parents_names}</p>

      {data.is_religious_active && (
        <div style={{ margin: '40px 0', border: '1px solid #d4af3733', padding: '20px' }}>
          <h3>⛪ CUNUNIA RELIGIOASĂ</h3>
          <p>{new Date(data.religious_date).toLocaleDateString('ro-RO')} | Ora {data.religious_time}</p>
          <p>{data.religious_location}</p>
        </div>
      )}

      <div style={{ margin: '40px 0' }}>
        <h3>🥂 PETRECEREA</h3>
        <p>{new Date(data.wedding_date).toLocaleDateString('ro-RO')} | Ora 19:00</p>
        <p>{data.location_name}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <a href={data.google_maps_url} style={btnS}>MAPS</a>
          <a href={data.waze_url} style={btnS}>WAZE</a>
        </div>
      </div>

      {data.is_menu_active && <button style={btnS}>🍴 VEZI MENIUL</button>}

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '40px 0' }}>
        <a href={`tel:${data.contact_phone_bride}`}>📞 Mireasă</a>
        <a href={`tel:${data.contact_phone_groom}`}>📞 Mire</a>
      </div>

      <LuxRsvpForm 
        orderId={data.order_id} 
        showAccommodation={data.is_accommodation_active} 
        showTransport={data.is_transport_active} 
      />
    </div>
  );
}
const btnS = { padding: '10px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none' };