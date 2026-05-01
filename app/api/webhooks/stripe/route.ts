import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET! // Asigură-te că ai asta în Vercel!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Update status în 'paid' pe baza session.id
      await sql`
        UPDATE orders 
        SET status = 'paid' 
        WHERE stripe_session_id = ${session.id}
      `;

      // Aici poți adăuga și logica de trimitere email prin Resend dacă vrei
      console.log("Plată confirmată pentru sesiunea:", session.id);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { neon } from '@neondatabase/serverless';
// import { Resend } from 'resend';

// export async function POST(req: Request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
//     apiVersion: '2026-04-22.dahlia' as any 
//   });
//   const sql = neon(process.env.DATABASE_URL!);
//   const resend = new Resend(process.env.RESEND_API_KEY!);
  
//   const body = await req.text();
//   const sig = req.headers.get('stripe-signature')!;
//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch (err: any) {
//     return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   const meta = session.metadata;
//   const customerEmail = session.customer_details?.email || session.customer_email;

//   if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    
//     // CAZUL 1: CLIENT NOU (Cumpără invitația)
//     if (meta?.themeName && customerEmail) {
//       const token = crypto.randomUUID();
//       const expiration = new Date(Date.now() + 3600000);

//       try {
//         await sql`
//           INSERT INTO verification_tokens (email, token, expires_at)
//           VALUES (${customerEmail}, ${token}, ${expiration})
//         `;

//         await resend.emails.send({
//           from: 'Vibe Invite <onboarding@resend.dev>',
//           to: [customerEmail],
//           subject: 'Setează parola pentru invitația ta 🎉',
//           html: `
//             <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
//               <h2>Bună!</h2>
//               <p>Plata pentru tema <strong>${meta.themeName}</strong> a fost confirmată. Setează parola aici:</p>
//               <a href="${process.env.NEXT_PUBLIC_URL}/setup-password?token=${token}" 
//                  style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
//                 Setează Parola
//               </a>
//             </div>
//           `
//         });

//         await sql`UPDATE orders SET status = 'paid' WHERE stripe_session_id = ${session.id}`;
//       } catch (error) {
//         console.error('❌ Error New Order:', error);
//       }
//     }

//     // CAZUL 2: UPGRADE GALERIE (Prelungire sau Deblocare)
//     else if (meta?.paymentType) {
//       const orderId = parseInt(meta.orderId);
//       try {
//         if (meta.paymentType === 'extend') {
//           await sql`
//             UPDATE wedding_settings 
//             SET photos_expires_at = photos_expires_at + INTERVAL '5 days',
//                 gallery_status = 'active'
//             WHERE order_id = ${orderId}
//           `;
//         } else if (meta.paymentType === 'unlock') {
//           await sql`
//             UPDATE wedding_settings 
//             SET photos_expires_at = NOW() + INTERVAL '5 days',
//                 is_unlock_paid = true,
//                 gallery_status = 'active'
//             WHERE order_id = ${orderId}
//           `;
//         }
//         console.log(`✅ Upgrade confirmat pentru Order ${orderId}`);
//       } catch (error) {
//         console.error('❌ Error Gallery Upgrade:', error);
//       }
//     }
//   }

//   return NextResponse.json({ received: true });
// }