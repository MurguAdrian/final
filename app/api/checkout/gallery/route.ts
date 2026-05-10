// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(request: Request) {
//   try {
//     // Folosim versiunea specifica contului tau: 2026-04-22.dahlia
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
//       apiVersion: '2026-04-22.dahlia' as any 
//     });

//     const { orderId, type } = await request.json();

//     // Detectam automat URL-ul (www.vibeinvite.ro) ca sa nu mai depindem de variabile de mediu lipsa
//     const origin = request.headers.get("origin") || "https://www.vibeinvite.ro";

//     let amount = 15000; // 150 RON
//     let title = "Prelungire Galerie Foto (+5 zile)";

//     if (type === 'unlock') {
//       amount = 20000; // 200 RON
//       title = "Deblocare Vizualizare Galerie";
//     } else if (type === 'new_album') {
//       amount = 40000; // 400 RON
//       title = "Activare Album Foto Nou";
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [{
//         price_data: {
//           currency: "ron",
//           product_data: { name: title },
//           unit_amount: amount,
//         },
//         quantity: 1,
//       }],
//       mode: "payment",
//       // Metadata sunt esentiale pentru Webhook-ul tau (checkout.session.completed)
//       metadata: { 
//         orderId: orderId.toString(), 
//         paymentType: type 
//       },
//       success_url: `${origin}/dashboard/lux?payment=success`,
//       cancel_url: `${origin}/dashboard/lux?payment=canceled`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error: any) {
//     console.error("Stripe Error Details:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
  const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/dummy";

  const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2026-04-22.dahlia' as any,
  });
  const sql = neon(DB_URL);

  try {
    const { orderId, type } = await req.json();

    if (!orderId || type !== 'reactivate') {
      return NextResponse.json({ error: "Parametri invalizi" }, { status: 400 });
    }

    // Verificăm că orderul există
    const rows = await sql`
      SELECT order_id FROM wedding_settings WHERE order_id = ${parseInt(orderId)} LIMIT 1
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "Order negăsit" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: 'Reactivare Galerie Foto — 3 Zile',
              description: 'Redeschide galeria foto pentru 3 zile. Invitații vor putea încărca fotografii din nou în același album.',
            },
            unit_amount: 20000, // 200 RON în bani
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/lux?tab=photos&success=reactivate`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/lux?tab=photos`,
      metadata: {
        orderId: String(orderId),
        paymentType: 'reactivate',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout gallery error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}