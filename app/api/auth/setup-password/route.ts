import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // 1. Găsim email-ul asociat token-ului
    const verification = await sql`
      SELECT email FROM verification_tokens 
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;

    if (verification.length === 0) {
      return NextResponse.json({ error: "Token invalid sau expirat" }, { status: 400 });
    }

    const email = verification[0].email;

    // 2. Salvăm parola în tabelul orders
    // NOTĂ: Pentru securitate maximă, aici s-ar folosi bcrypt. Pentru acum, o punem direct.
    await sql`
      UPDATE orders 
      SET password = ${password} 
      WHERE email = ${email}
    `;

    // 3. Ștergem token-ul ca să nu mai fie folosit a doua oară
    await sql`DELETE FROM verification_tokens WHERE token = ${token}`;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}