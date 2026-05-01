import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs'; // ADĂUGAT

export async function POST(req: Request) {
  try {
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

    // CRIPTĂM PAROLA ÎNAINTE DE SALVARE
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      UPDATE orders 
      SET password = ${hashedPassword} 
      WHERE email = ${email}
    `;

    await sql`DELETE FROM verification_tokens WHERE token = ${token}`;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Eroare la setup-password:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}