import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// MODIFICARE AICI: Nu mai pune const sql = neon(...) aici sus!

export async function POST(req: Request) {
  try {
    // Inițializăm conexiunea DOAR când primim cererea
    const sql = neon(process.env.DATABASE_URL!);
    
    const { token, password } = await req.json();

    const verification = await sql`
      SELECT email FROM verification_tokens 
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;

    if (verification.length === 0) {
      return NextResponse.json({ error: "Token invalid sau expirat" }, { status: 400 });
    }

    const email = verification[0].email;

    await sql`
      UPDATE orders 
      SET password = ${password} 
      WHERE email = ${email}
    `;

    await sql`DELETE FROM verification_tokens WHERE token = ${token}`;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Eroare la setup-password:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}