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

  // Logica inteligentă pentru locație:
  // Dacă mirele a pus link, îl folosim. Dacă a pus doar text (Salon Alexander...), generăm un link de căutare Google.
  const googleMapsFinalUrl = data.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location_name)}`;
  const wazeFinalUrl = data.waze_url || `https://waze.com/ul?q=${encodeURIComponent(data.location_name)}`;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#d4af37', fontFamily: "'Playfair Display', serif", padding: '60px 20px', border: '12px solid #d4af37', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ letterSpacing: '8px', fontSize: '0.8rem', opacity: 0.7 }}>VĂ INVITĂM CU DRAG</h2>
        <h1 style={{ fontSize: '4rem', margin: '30px 0' }}>{data.bride_name} & {data.groom_name}</h1>
        
        {data.nasi_names && <p style={{ fontSize: '1.3rem' }}>Nași: <strong>{data.nasi_names}</strong></p>}
        {data.parents_names && <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Părinți: {data.parents_names}</p>}
        
        <div style={{ height: '1px', width: '100px', background: '#d4af37', margin: '30px auto' }}></div>
        
        <p style={{ fontSize: '1.8rem' }}>
            {data.wedding_date ? new Date(data.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : "Data urmeză să fie stabilită"}
        </p>
        
        <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>📍 {data.location_name}</p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '30px 0' }}>
            <a href={googleMapsFinalUrl} target="_blank" style={linkStyle}>VEZI GOOGLE MAPS</a>
            <a href={wazeFinalUrl} target="_blank" style={linkStyle}>VEZI PE WAZE</a>
        </div>

        {data.our_story && (
          <div style={{ margin: '40px auto', maxWidth: '500px', fontStyle: 'italic', opacity: 0.9, lineHeight: '1.6' }}>
            <p>"{data.our_story}"</p>
          </div>
        )}

        <LuxRsvpForm orderId={data.order_id} />
      </div>
    </div>
  );
}

const linkStyle = { padding: '12px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' };