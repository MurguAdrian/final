
// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { neon } from '@neondatabase/serverless';

// export async function POST(req: Request) {
//   try {
//     // MUTAT AICI: Inițializăm Stripe DOAR când funcția este apelată
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
//  apiVersion: '2026-04-22.dahlia' 
//     });

//     // MUTAT AICI: Inițializăm SQL DOAR când funcția este apelată
//     const sql = neon(process.env.DATABASE_URL!);

//     const { email, priceId, themeName } = await req.json();

//     const expirationDate = new Date();
//     expirationDate.setFullYear(expirationDate.getFullYear() + 1);

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       customer_email: email,
//       line_items: [{ price: priceId, quantity: 1 }],
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
//       metadata: { email, themeName },
//     });

//     await sql`
//       INSERT INTO orders (email, theme_name, price_id, stripe_session_id, status, expires_at)
//       VALUES (${email}, ${themeName}, ${priceId}, ${session.id}, 'pending', ${expirationDate})
//     `;

//     return NextResponse.json({ url: session.url });
//   } catch (err: any) {
//     console.error("Checkout error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27' as any });
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata;

      // CAZUL 1: PLATA PENTRU O NUNTĂ NOUĂ (TEMA)
      if (meta?.themeName) {
        await sql`
          UPDATE orders 
          SET status = 'paid' 
          WHERE stripe_session_id = ${session.id}
        `;
        console.log("Comandă nuntă nouă confirmată!");
      } 
      
      // CAZUL 2: PLATA PENTRU GALERIA FOTO (UPGRADE)
      else if (meta?.paymentType) {
        const orderId = parseInt(meta.orderId);
        
        if (meta.paymentType === 'extend') {
          await sql`
            UPDATE wedding_settings 
            SET photos_expires_at = photos_expires_at + INTERVAL '5 days',
                gallery_status = 'active'
            WHERE order_id = ${orderId}
          `;
        } else if (meta.paymentType === 'unlock') {
          await sql`
            UPDATE wedding_settings 
            SET photos_expires_at = NOW() + INTERVAL '5 days',
                is_unlock_paid = true,
                gallery_status = 'active'
            WHERE order_id = ${orderId}
          `;
        }
        console.log("Plată galerie foto confirmată!");
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}