import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia' as any,
});

export async function POST(req: Request) {
  try {
    const { email, priceId, themeName } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);

    // --- VERIFICARE EMAIL EXISTENT ---
    const existingUser = await sql`
      SELECT id FROM orders 
      WHERE email = ${email} AND status = 'paid' 
      LIMIT 1
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Acest email este deja asociat unui cont activ. Te rugăm să te loghezi sau să folosești alt email." },
        { status: 400 }
      );
    }
    // ----------------------------------

    const baseUrl = "https://www.vibeinvite.ro";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      customer_email: email,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        email: email,
        themeName: themeName,
      },
    });

    // Inserăm comanda ca 'pending'
    await sql`
      INSERT INTO orders (email, theme_name, price_id, stripe_session_id, status)
      VALUES (${email}, ${themeName}, ${priceId}, ${session.id}, 'pending')
    `;

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Eroare Checkout:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}