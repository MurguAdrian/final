import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const { email } = await req.json();

    const user = await sql`SELECT email FROM orders WHERE email = ${email} LIMIT 1`;
    if (user.length === 0) return NextResponse.json({ error: "Email-ul nu a fost găsit" }, { status: 404 });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 ora

    await sql`
      INSERT INTO verification_tokens (email, token, expires_at)
      VALUES (${email}, ${token}, ${expires})
    `;

    await resend.emails.send({
      from: 'Vibe Invite <no-reply@vibeinvite.ro>',
      to: email,
      subject: 'Resetare Parolă Vibe Invite',
      html: `<p>Apasă aici pentru a reseta parola: <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}">Resetează Parola</a></p>`
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}