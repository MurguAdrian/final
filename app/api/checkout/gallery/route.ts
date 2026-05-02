import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' as any });
    const { orderId, type } = await request.json();

    let amount = 15000; // Default Prelungire: 150 RON
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
      metadata: { orderId: orderId.toString(), paymentType: type },
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/lux?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/lux?payment=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}