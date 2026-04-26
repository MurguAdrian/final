import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  apiVersion: '2026-04-22.dahlia' // Am pus versiunea stabilă de API
});

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const { email, priceId, themeName } = await req.json();

    // 1. Calculăm data de expirare (Data de azi + 1 an)
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    // 2. Creăm sesiunea la Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      metadata: { 
        email: email, 
        themeName: themeName 
      },
    });

    // 3. SALVĂM ÎN NEON (Status: pending + Data Expirării)
    await sql`
      INSERT INTO orders (
        email, 
        theme_name, 
        price_id, 
        stripe_session_id, 
        status, 
        expires_at
      )
      VALUES (
        ${email}, 
        ${themeName}, 
        ${priceId}, 
        ${session.id}, 
        'pending', 
        ${expirationDate}
      )
    `;

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Eroare Checkout:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}