import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function PublicInvitation({ params }: { params: { slug: string } }) {
  const sql = neon(process.env.DATABASE_URL!);
  
  const wedding = await sql`
    SELECT * FROM wedding_settings 
    WHERE custom_slug = ${params.slug}
  `;

  if (!wedding || wedding.length === 0) {
    notFound();
  }

  const data = wedding[0];

  return (
    <div style={{ 
      minHeight: '100vh', background: '#121212', color: '#d4af37', 
      textAlign: 'center', padding: '100px 20px', fontFamily: 'serif' 
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        {data.bride_name} & {data.groom_name}
      </h1>
      <h2 style={{ fontWeight: '300', letterSpacing: '2px' }}>VĂ INVITĂ LA NUNTĂ</h2>
      <hr style={{ width: '100px', borderColor: '#d4af37', margin: '40px auto' }} />
      <p style={{ fontSize: '1.5rem' }}>Locația: {data.location_name}</p>
      
      <div style={{ 
        marginTop: '60px', padding: '40px', border: '1px solid #d4af3733', 
        maxWidth: '500px', margin: '60px auto' 
      }}>
        <h3 style={{ marginBottom: '20px' }}>Confirmă prezența</h3>
        <p style={{ color: '#888' }}>Formularul de RSVP va apărea aici.</p>
      </div>
    </div>
  );
}