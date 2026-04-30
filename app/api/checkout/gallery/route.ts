import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia' as any, 
});

    const { orderId, type } = await request.json();

    const isUnlock = type === 'unlock';
    const amount = isUnlock ? 10000 : 5000; // 100 RON sau 50 RON
    const title = isUnlock ? "Deblocare Arhivă Foto (5 zile)" : "Prelungire Galerie Foto (5 zile)";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: { name: title },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // IMPORTANT: Punem orderId și paymentType aici pentru Webhook
      metadata: { 
        orderId: orderId.toString(), 
        paymentType: type // 'extend' sau 'unlock'
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/lux?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/lux?payment=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}