import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

// Acest cron e acum redundant față de account-cleanup
// Îl păstrăm doar ca fallback simplu fără Cloudinary
export async function GET(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  await sql`DELETE FROM orders WHERE expires_at < NOW()`;

  return NextResponse.json({ success: true, message: "Conturi expirate șterse." });
}