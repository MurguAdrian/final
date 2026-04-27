import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import RsvpForm from "./RsvpForm";
export const dynamic = 'force-dynamic';

export default async function PublicInvitation({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const sql = neon(process.env.DATABASE_URL!);
  
  // Căutăm nunta în DB
  const wedding = await sql`
    SELECT * FROM wedding_settings 
    WHERE custom_slug = ${slug}
  `;

  if (!wedding || wedding.length === 0) {
    notFound();
  }

  const data = wedding[0];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#121212', 
      color: '#d4af37', 
      textAlign: 'center', 
      padding: '60px 20px', 
      fontFamily: 'serif' 
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>
        {data.bride_name} & {data.groom_name}
      </h1>
      <p style={{ letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.8 }}>
        Vă invită să le fiți alături
      </p>
      
      <div style={{ margin: '40px auto', padding: '20px', borderTop: '1px solid #d4af3733', borderBottom: '1px solid #d4af3733', display: 'inline-block' }}>
        <p style={{ margin: 0, fontSize: '1.2rem' }}>Locația: <strong>{data.location_name}</strong></p>
      </div>

      {/* Injectăm formularul de client și îi trimitem order_id-ul */}
      <RsvpForm orderId={data.order_id} />
    </div>
  );
}