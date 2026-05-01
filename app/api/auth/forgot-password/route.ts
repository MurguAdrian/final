import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const { email } = await req.json();

    // 1. Verificăm dacă userul există
    const user = await sql`SELECT email FROM orders WHERE email = ${email} AND status = 'paid' LIMIT 1`;
    
    if (user.length === 0) {
      // Din motive de securitate, e mai bine să nu confirmăm dacă email-ul există sau nu, 
      // dar pentru debug acum, lăsăm eroarea asta.
      return NextResponse.json({ error: "Email-ul nu a fost găsit sau plata nu e confirmată" }, { status: 404 });
    }

    // 2. Generăm token-ul
    const token = crypto.randomBytes(32).toString('hex');

    // 3. Salvăm în DB folosind formatul de timp al bazei de date (ca la Webhook)
    await sql`
      INSERT INTO verification_tokens (email, token, expires_at)
      VALUES (${email}, ${token}, NOW() + INTERVAL '1 hour')
    `;

    // 4. Trimitem email-ul
    // ATENȚIE: Am pus onboarding@resend.dev pentru că domeniul tău nu e încă verificat DNS în Resend
    const { data, error } = await resend.emails.send({
      from: 'Vibe Invite <onboarding@resend.dev>', 
      to: email,
      subject: 'Resetare Parolă Vibe Invite',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Ai cerut resetarea parolei</h2>
          <p>Apasă pe butonul de mai jos pentru a alege o parolă nouă (link-ul expiră într-o oră):</p>
          <a href="https://www.vibeinvite.ro/auth/reset-password?token=${token}" 
             style="background: black; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Resetează Parola
          </a>
        </div>
      `
    });

    if (error) {
      console.error("Eroare Resend:", error);
      return NextResponse.json({ error: "Eroare la trimiterea email-ului" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Eroare ForgotPassword:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}