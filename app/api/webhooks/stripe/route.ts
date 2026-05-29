


import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import crypto from "crypto";

export async function POST(req: Request) {
  // 1. Definim cheile cu fallback-uri pentru a trece de build
  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
  const RESEND_KEY = process.env.RESEND_API_KEY || "re_placeholder";
  const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/dummy";
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder";

  // 2. Instanțiem clienții în interiorul funcției
  const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2026-04-22.dahlia' as any,
  });
  const resend = new Resend(RESEND_KEY);
  const sql = neon(DB_URL);

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  try {
    // 3. Construim event-ul
    const event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);

    // --- 1. IDEMPOTENCY ---
    const existingEvent = await sql`SELECT id FROM processed_stripe_events WHERE stripe_event_id = ${event.id} LIMIT 1`;
    if (existingEvent.length > 0) {
        console.log(`ℹ️ Event-ul Stripe ${event.id} a fost deja procesat.`);
        return NextResponse.json({ received: true, status: 'already_processed' });
    }
    
    await sql`INSERT INTO processed_stripe_events (stripe_event_id) VALUES (${event.id})`;

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      console.log("--- START PROCESARE WEBHOOK ---");

      // CAZUL A: PLATA INIȚIALĂ
      if (!metadata.paymentType) {
          const email = session.customer_email;
          const setupToken = crypto.randomBytes(32).toString('hex');
          
          await sql`
            INSERT INTO verification_tokens (email, token, expires_at)
            VALUES (${email}, ${setupToken}, NOW() + INTERVAL '24 hours')
          `;

          await sql`
            UPDATE orders 
            SET status = 'paid', 
                expires_at = NOW() + INTERVAL '12 months' 
            WHERE stripe_session_id = ${session.id}
          `;

          const { error } = await resend.emails.send({
            from: 'Vibe Invite <office@vibeinvite.ro>', 
            to: email as string,
            subject: 'Setează parola pentru invitația ta Vibe Invite',
            html: `
  <div style="background-color:#f4f6f8;padding:40px 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.06);">
      <tr>
        <td style="padding:32px 32px 24px 32px;font-family:Arial,Helvetica,sans-serif;color:#111;">
          
          <h2 style="margin:0 0 12px 0;font-size:22px;font-weight:600;">
            Bun venit pe Vibe Invite
          </h2>

          <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#444;">
            Ai primit o invitație care necesită configurarea unei parole pentru a-ți accesa contul.
          </p>

          <p style="margin:0 0 28px 0;font-size:15px;color:#444;">
            Apasă pe butonul de mai jos pentru a continua:
          </p>

                      <a href="https://www.vibeinvite.ro/setup-password?token=${setupToken}" 
             style="
               display:inline-block;
               background:#111;
               color:#ffffff;
               padding:14px 28px;
               font-size:14px;
               font-weight:600;
               text-decoration:none;
               border-radius:6px;
             ">
            Setează parola
          </a>

          <p style="margin:32px 0 0 0;font-size:13px;color:#777;">
            Dacă nu ai solicitat această acțiune, poți ignora acest email în siguranță.
          </p>

        </td>
      </tr>

      <tr>
        <td style="padding:16px 32px;background:#fafafa;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999;text-align:center;border-top:1px solid #eee;">
          © ${new Date().getFullYear()} VibeInvite.ro · Toate drepturile rezervate
        </td>
      </tr>
    </table>
  </div>
            `
          });
          if (error) console.error("❌ EROARE RESEND:", error);
      } 

// CAZUL B: MODUL FOTO
  else if (metadata.orderId && metadata.paymentType === 'reactivate') {
    const orderId = parseInt(metadata.orderId);

    // 🔥 MODIFICARE: Doar ne asigurăm că e 'active', fără să mai punem interval de 3 zile
    await sql`
      UPDATE wedding_settings
      SET gallery_status = 'active'
      WHERE order_id = ${orderId}
    `;
  }
}

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ EROARE GENERALĂ WEBHOOK:", err.message);
    // Returnăm 400 doar dacă semnătura e greșită, altfel Next.js build s-ar putea opri
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}



