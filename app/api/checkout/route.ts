import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

// Setăm versiunea exactă cerută de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia' as any, 
});

export async function POST(req: Request) {
  try {
    const { email, priceId, themeName } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    const baseUrl = "https://www.vibeinvite.ro";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      customer_email: email,
success_url: `${baseUrl}/success`,      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        email: email,
        themeName: themeName,
      },
    });

    await sql`
      INSERT INTO orders (email, theme_name, price_id, stripe_session_id, status)
      VALUES (${email}, ${themeName}, ${priceId}, ${session.id}, 'pending')
    `;

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Eroare Stripe Checkout:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}