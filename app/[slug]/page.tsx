// // import { neon } from "@neondatabase/serverless";
// // import { notFound, redirect } from "next/navigation";

// // export const dynamic = 'force-dynamic';

// // export default async function RedirectByTheme({ params }: { params: { slug: string } }) {
// //   const { slug } = params;
// //   const sql = neon(process.env.DATABASE_URL!);
  
// //   // Căutăm în orders legat cu wedding_settings ce temă are acest slug
// //   const result = await sql`
// //     SELECT o.theme_name 
// //     FROM orders o
// //     JOIN wedding_settings ws ON o.id = ws.order_id
// //     WHERE ws.custom_slug = ${slug}
// //     LIMIT 1
// //   `;

// //   if (!result || result.length === 0) {
// //     notFound();
// //   }

// //   const theme = result[0].theme_name.toLowerCase(); // 'lux' sau 'nature'

// //   // Incrementăm vizualizările aici, la poarta de intrare
// //   await sql`UPDATE wedding_settings SET view_count = view_count + 1 WHERE custom_slug = ${slug}`;

// //   // Îl trimitem la pagina cu design-ul specific, dar el în browser vede tot URL-ul scurt!
// //   redirect(`/invitatie/${theme}/${slug}`);
// // }
// import { neon } from "@neondatabase/serverless";
// import { notFound } from "next/navigation";
// import LuxRsvpForm from "@/app/invitatie/lux/[slug]/LuxRsvpForm";


// export default async function LuxInvitationPage({ params }: { params: { slug: string } }) {
//   const { slug } = params;
//   const sql = neon(process.env.DATABASE_URL!);
//   const wedding = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${slug}`;
//   if (!wedding.length) notFound();
//   const data = wedding[0];

//   return (
//     <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#d4af37', fontFamily: "'Playfair Display', serif", padding: '80px 20px', border: '10px solid #d4af37', boxSizing: 'border-box', textAlign: 'center' }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <h2 style={{ letterSpacing: '8px', fontSize: '0.9rem', opacity: 0.8 }}>VĂ INVITĂM</h2>
//         <h1 style={{ fontSize: '4.5rem', margin: '30px 0', fontWeight: '400' }}>{data.bride_name} & {data.groom_name}</h1>
        
//         {data.nasi_names && <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Alături de nașii: <strong>{data.nasi_names}</strong></p>}
//         {data.parents_names && <p style={{ opacity: 0.7 }}>Împreună cu părinții: {data.parents_names}</p>}
        
//         <div style={{ height: '1px', width: '150px', background: '#d4af37', margin: '40px auto' }}></div>
        
//         <p style={{ fontSize: '1.8rem' }}>{data.wedding_date ? new Date(data.wedding_date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data va fi anunțată'}</p>
//         <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{data.location_name}</p>

//         {(data.waze_url || data.google_maps_url) && (
//           <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '30px 0' }}>
//             {data.waze_url && <a href={data.waze_url} style={linkB}>WAZE</a>}
//             {data.google_maps_url && <a href={data.google_maps_url} style={linkB}>MAPS</a>}
//           </div>
//         )}

//         {data.our_story && <p style={{ fontStyle: 'italic', maxWidth: '600px', margin: '40px auto', lineHeight: '1.8', opacity: 0.8 }}>"{data.our_story}"</p>}

//         <LuxRsvpForm orderId={data.order_id} />
//       </div>
//     </div>
//   );
// }

// const linkB = { padding: '8px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '1px' };