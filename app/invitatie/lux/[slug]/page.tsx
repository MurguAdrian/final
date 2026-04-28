// import { neon } from "@neondatabase/serverless";
// import { notFound } from "next/navigation";
// import LuxRsvpForm from "./LuxRsvpForm"; // Formularul stilizat LUX

// export default async function LuxInvitationPage({ params }: { params: { slug: string } }) {
//   const { slug } = params;
//   const sql = neon(process.env.DATABASE_URL!);
  
//   const wedding = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${slug}`;
//   if (!wedding.length) notFound();
//   const data = wedding[0];

//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       background: '#0a0a0a', // Negru mat profund
//       color: '#d4af37', 
//       fontFamily: "'Playfair Display', serif", 
//       padding: '80px 20px',
//       border: '10px solid #d4af37', // Ramă aurie pe tot ecranul
//       boxSizing: 'border-box'
//     }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <h2 style={{ letterSpacing: '8px', fontSize: '1rem', opacity: 0.8 }}>VĂ INVITĂM</h2>
        
//         <h1 style={{ fontSize: '4rem', margin: '40px 0', fontWeight: '400' }}>
//           {data.bride_name} <br/> & <br/> {data.groom_name}
//         </h1>

//         <div style={{ height: '2px', width: '100px', background: '#d4af37', margin: '0 auto 40px' }}></div>

//         <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Sâmbătă, 27 Septembrie 2026</p>
//         <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Locația: {data.location_name}</p>

//         <LuxRsvpForm orderId={data.order_id} />
//       </div>
//     </div>
//   );
// }

import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import LuxRsvpForm from "./LuxRsvpForm";

export default async function LuxInvitationPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const sql = neon(process.env.DATABASE_URL!);
  const wedding = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${slug}`;
  
  if (!wedding.length) notFound();
  const data = wedding[0];

  // Fix Link-uri Locație
  const googleMapsFinalUrl = data.google_maps_url?.startsWith('http') 
    ? data.google_maps_url 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location_name + " " + (data.google_maps_url || ""))}`;

  const wazeFinalUrl = data.waze_url?.startsWith('http') 
    ? data.waze_url 
    : `https://waze.com/ul?q=${encodeURIComponent(data.location_name)}`;

  return (
    <div style={{ 
      minHeight: '100vh', background: '#0a0a0a', color: '#d4af37', 
      fontFamily: "'Playfair Display', serif", padding: '60px 20px', 
      border: '15px solid #d4af37', boxSizing: 'border-box', textAlign: 'center' 
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ letterSpacing: '8px', fontSize: '0.8rem', opacity: 0.7 }}>VĂ INVITĂM CU DRAG</h2>
        
        {/* MIRE ȘI MIREASĂ */}
        <h1 style={{ fontSize: '4rem', margin: '30px 0' }}>{data.bride_name} & {data.groom_name}</h1>
        
        {/* NAȘI - ACUM SE VA AFIȘA */}
        {data.nasi_names && (
          <p style={{ fontSize: '1.4rem', marginBottom: '10px' }}>
            Alături de nașii: <br/> 
            <strong style={{ color: '#fff' }}>{data.nasi_names}</strong>
          </p>
        )}

        {/* PĂRINȚI - ACUM SE VA AFIȘA */}
        {data.parents_names && (
          <p style={{ opacity: 0.8, fontSize: '1rem', marginBottom: '30px' }}>
            Cu binecuvântarea părinților: <br/> 
            {data.parents_names}
          </p>
        )}
        
        <div style={{ height: '1px', width: '150px', background: '#d4af37', margin: '40px auto' }}></div>
        
        {/* DATA NUNȚII */}
        <p style={{ fontSize: '2rem', margin: '0' }}>
            {data.wedding_date ? new Date(data.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : "Data va fi anunțată"}
        </p>
        
        {/* LOCAȚIA */}
        <p style={{ fontSize: '1.4rem', marginTop: '10px' }}>📍 {data.location_name}</p>

        {/* BUTOANE LOCAȚIE */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '40px 0' }}>
            <a href={googleMapsFinalUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>GOOGLE MAPS</a>
            <a href={wazeFinalUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>WAZE</a>
        </div>

        {/* POVESTEA NOASTRĂ - ACUM SE VA AFIȘA */}
        {data.our_story && (
          <div style={{ margin: '60px auto', maxWidth: '600px', fontStyle: 'italic', opacity: 0.9, lineHeight: '1.8', borderTop: '1px solid #d4af3722', paddingTop: '30px' }}>
            <h3 style={{ fontSize: '1rem', letterSpacing: '3px', marginBottom: '20px' }}>POVESTEA NOASTRĂ</h3>
            <p>"{data.our_story}"</p>
          </div>
        )}

        <div style={{ height: '1px', width: '100px', background: '#d4af3722', margin: '60px auto' }}></div>

        {/* FORMULAR RSVP */}
        <LuxRsvpForm orderId={data.order_id} />
      </div>
    </div>
  );
}

const linkStyle = { 
  padding: '12px 25px', border: '1px solid #d4af37', color: '#d4af37', 
  textDecoration: 'none', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px' 
};