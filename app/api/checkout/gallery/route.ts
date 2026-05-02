import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    // Folosim versiunea specifica contului tau: 2026-04-22.dahlia
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
      apiVersion: '2026-04-22.dahlia' as any 
    });

    const { orderId, type } = await request.json();

    // Detectam automat URL-ul (www.vibeinvite.ro) ca sa nu mai depindem de variabile de mediu lipsa
    const origin = request.headers.get("origin") || "https://www.vibeinvite.ro";

    let amount = 15000; // 150 RON
    let title = "Prelungire Galerie Foto (+5 zile)";

    if (type === 'unlock') {
      amount = 20000; // 200 RON
      title = "Deblocare Vizualizare Galerie";
    } else if (type === 'new_album') {
      amount = 40000; // 400 RON
      title = "Activare Album Foto Nou";
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "ron",
          product_data: { name: title },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: "payment",
      // Metadata sunt esentiale pentru Webhook-ul tau (checkout.session.completed)
      metadata: { 
        orderId: orderId.toString(), 
        paymentType: type 
      },
      success_url: `${origin}/dashboard/lux?payment=success`,
      cancel_url: `${origin}/dashboard/lux?payment=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error Details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}