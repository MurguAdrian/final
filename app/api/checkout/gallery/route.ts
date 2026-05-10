

import { NextResponse } from "next/server";
import Stripe from "stripe";

const PAYMENT_CONFIG: Record<string, { amount: number; title: string; description: string }> = {
  reactivate: {
    amount: 20000,
    title: "Reactivare Galerie Foto — 3 Zile",
    description: "Redeschide galeria foto pentru 3 zile în același album. Pozele existente sunt păstrate.",
  },
  // Păstrate pentru compatibilitate dacă există webhook-uri în tranzit
  extend: {
    amount: 15000,
    title: "Prelungire Galerie Foto (+5 Zile)",
    description: "Prelungire perioadă galerie foto cu 5 zile.",
  },
  unlock: {
    amount: 20000,
    title: "Deblocare Vizualizare Galerie",
    description: "Deblochează vizualizarea fotografiilor pentru 5 zile.",
  },
  new_album: {
    amount: 40000,
    title: "Activare Album Foto Nou",
    description: "Pornește un album foto nou de la zero.",
  },
};

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia' as any,
    });

    const body = await request.json();
    const { orderId, type, theme = 'lux' } = body;

    if (!orderId || !type) {
      return NextResponse.json({ error: "orderId și type sunt obligatorii" }, { status: 400 });
    }

    const config = PAYMENT_CONFIG[type];
    if (!config) {
      return NextResponse.json({ error: `Tip de plată necunoscut: ${type}` }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "https://www.vibeinvite.ro";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "ron",
          product_data: {
            name: config.title,
            description: config.description,
          },
          unit_amount: config.amount,
        },
        quantity: 1,
      }],
      mode: "payment",
      metadata: {
        orderId: orderId.toString(),
        paymentType: type,
        theme,
      },
      success_url: `${origin}/dashboard/${theme}?payment=success&tab=photos`,
      cancel_url:  `${origin}/dashboard/${theme}?payment=canceled&tab=photos`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Gallery Error:", error?.message, error?.raw);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}