import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any, // Folosește o versiune stabilă
});

export async function POST(req: Request) {
  try {
    const { email, priceId, themeName } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);

    // 1. Creăm sesiunea de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/setup-password?token={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      metadata: {
        email: email,
        themeName: themeName,
      },
    });

    // 2. Salvăm comanda în baza de date cu status 'pending'
    // IMPORTANT: Verifică dacă tabelul tău 'orders' are coloana stripe_session_id
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