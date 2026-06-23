import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia' as any,
})

export async function POST(req: Request) {
  try {
    const { fields, template } = await req.json()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: 'price_1TlThUDLRG6cKGjIZat9Jjvp',
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/invitatii-pdf/download?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${template}`,
      metadata: {
        template,
        fields: JSON.stringify(fields),
        paymentType: 'invitatie_pdf',
      },
      payment_intent_data: {
        metadata: {
          template,
          paymentType: 'invitatie_pdf',
        },
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}