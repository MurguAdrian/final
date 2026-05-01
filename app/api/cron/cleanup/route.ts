import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: Request) {
  // Verificăm o cheie secretă ca să nu poată rula oricine acest API
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  
  // Șterge comenzile mai vechi de 12 luni
  // ATENȚIE: Asigură-te că tabelele tale au Foreign Keys cu ON DELETE CASCADE
  await sql`
    DELETE FROM orders 
    WHERE created_at < NOW() - INTERVAL '12 months'
  `;

  return NextResponse.json({ success: true, message: "Datele vechi au fost șterse." });
}