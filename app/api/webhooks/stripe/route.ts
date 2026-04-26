import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' });
const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Gândim ca un profesionist: gestionăm stările principale ale plății
  switch (event.type) {
    
    // CAZUL 1: Plata a reușit (Card sau plată instantă)
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      await sql`
        UPDATE orders 
        SET status = 'paid' 
        WHERE stripe_session_id = ${session.id}
      `;
      console.log(`✅ Plata confirmata pentru: ${session.id}`);
      // AICI poți declanșa și trimiterea email-ului de "Bun venit"
      break;

    // CAZUL 2: Plata a eșuat (Bancă a respins tranzacția ulterior)
    case 'checkout.session.async_payment_failed':
      await sql`
        UPDATE orders 
        SET status = 'failed' 
        WHERE stripe_session_id = ${session.id}
      `;
      console.log(`❌ Plata esuata pentru: ${session.id}`);
      break;

    // CAZUL 3: Sesiunea a expirat (Userul a închis tab-ul și nu s-a mai întors)
    case 'checkout.session.expired':
      await sql`
        UPDATE orders 
        SET status = 'expired' 
        WHERE stripe_session_id = ${session.id}
      `;
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}