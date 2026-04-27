import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import LuxRsvpForm from "./LuxRsvpForm"; // Formularul stilizat LUX

export default async function LuxInvitationPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const sql = neon(process.env.DATABASE_URL!);
  
  const wedding = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${slug}`;
  if (!wedding.length) notFound();
  const data = wedding[0];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a', // Negru mat profund
      color: '#d4af37', 
      fontFamily: "'Playfair Display', serif", 
      padding: '80px 20px',
      border: '10px solid #d4af37', // Ramă aurie pe tot ecranul
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ letterSpacing: '8px', fontSize: '1rem', opacity: 0.8 }}>VĂ INVITĂM</h2>
        
        <h1 style={{ fontSize: '4rem', margin: '40px 0', fontWeight: '400' }}>
          {data.bride_name} <br/> & <br/> {data.groom_name}
        </h1>

        <div style={{ height: '2px', width: '100px', background: '#d4af37', margin: '0 auto 40px' }}></div>

        <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Sâmbătă, 27 Septembrie 2026</p>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Locația: {data.location_name}</p>

        <LuxRsvpForm orderId={data.order_id} />
      </div>
    </div>
  );
}