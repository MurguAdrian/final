import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' });
const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const { email, priceId, themeName } = await req.json();

    // 1. Creăm sesiunea la Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      metadata: { email, themeName },
    });

    // 2. SALVĂM ÎN NEON (Status: pending)
    await sql`
      INSERT INTO orders (email, theme_name, price_id, stripe_session_id, status)
      VALUES (${email}, ${themeName}, ${priceId}, ${session.id}, 'pending')
    `;

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}