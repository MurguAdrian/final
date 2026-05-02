// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { neon } from "@neondatabase/serverless";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2026-04-22.dahlia' as any,
// });

// export async function POST(req: Request) {
//   try {
//     const { email, priceId, themeName } = await req.json();
//     const sql = neon(process.env.DATABASE_URL!);

//     // 1. VERIFICARE: Există deja acest email cu status 'paid'?
//     const existing = await sql`
//       SELECT id FROM orders WHERE email = ${email} AND status = 'paid' LIMIT 1
//     `;

//     if (existing.length > 0) {
//       return NextResponse.json(
//         { error: "Acest email are deja un cont activ. Te rugăm să te loghezi." },
//         { status: 400 }
//       );
//     }

//     const baseUrl = "https://www.vibeinvite.ro";

//     // 2. Creare sesiune Stripe
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [{ price: priceId, quantity: 1 }],
//       mode: "payment",
//       customer_email: email,
//       success_url: `${baseUrl}/success`,
//       cancel_url: `${baseUrl}/checkout`,
//       metadata: { email, themeName },
//     });

//     // 3. Salvare comandă pending
//     await sql`
//       INSERT INTO orders (email, theme_name, price_id, stripe_session_id, status)
//       VALUES (${email}, ${themeName}, ${priceId}, ${session.id}, 'pending')
//     `;

//     return NextResponse.json({ url: session.url });
//   } catch (err: any) {
//     console.error("Eroare Checkout:", err.message);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  // 1. Definim cheile cu fallback-uri (ca să nu dea eroare la build local)
  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
  const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/dummy";

  // 2. Instanțiem Stripe și Neon în interiorul funcției
  const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2026-04-22.dahlia' as any,
  });

  try {
    const { email, priceId, themeName } = await req.json();
    const sql = neon(DB_URL);

    // 1. VERIFICARE: Există deja acest email cu status 'paid'?
    const existing = await sql`
      SELECT id FROM orders WHERE email = ${email} AND status = 'paid' LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Acest email are deja un cont activ. Te rugăm să te loghezi." },
        { status: 400 }
      );
    }

    const baseUrl = "https://www.vibeinvite.ro";

    // 2. Creare sesiune Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      customer_email: email,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: { email, themeName },
    });

    // 3. Salvare comandă pending
    await sql`
      INSERT INTO orders (email, theme_name, price_id, stripe_session_id, status)
      VALUES (${email}, ${themeName}, ${priceId}, ${session.id}, 'pending')
    `;

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Eroare Checkout:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}