// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { neon } from '@neondatabase/serverless';
// import { Resend } from 'resend';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
//  apiVersion: '2026-04-22.dahlia' 
// });
// const sql = neon(process.env.DATABASE_URL!);
// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = req.headers.get('stripe-signature')!;
//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch (err: any) {
//     console.error(`❌ Webhook Error: ${err.message}`);
//     return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   const customerEmail = session.customer_details?.email || session.customer_email;

//   switch (event.type) {
    
//     case 'checkout.session.completed':
//     case 'checkout.session.async_payment_succeeded':
//       if (customerEmail) {
//         // 1. Generăm un Token unic pentru Magic Link
//         const token = crypto.randomUUID();
//         const expiration = new Date(Date.now() + 3600000); // Expiră în 60 de minute

//         try {
//           // 2. Salvăm token-ul în Neon (pentru a-l verifica ulterior pe pagina de setup-password)
//           await sql`
//             INSERT INTO verification_tokens (email, token, expires_at)
//             VALUES (${customerEmail}, ${token}, ${expiration})
//           `;

//           // 3. Trimitem Email-ul cu Magic Link prin Resend
//           await resend.emails.send({
//             from: 'Vibe Invite <onboarding@resend.dev>', // Schimbă cu domeniul tău după verificare
//             to: [customerEmail],
//             subject: 'Setează parola pentru invitația ta 🎉',
//             html: `
//               <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
//                 <h2 style="color: #333;">Bună!</h2>
//                 <p style="font-size: 16px; color: #555;">Plata pentru invitația ta a fost confirmată cu succes.</p>
//                 <p style="font-size: 16px; color: #555;">Apasă pe butonul de mai jos pentru a-ți seta parola și a începe personalizarea:</p>
//                 <div style="text-align: center; margin: 30px 0;">
//                   <a href="${process.env.NEXT_PUBLIC_URL}/setup-password?token=${token}" 
//                      style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
//                     Setează Parola Acum
//                   </a>
//                 </div>
//                 <p style="font-size: 12px; color: #999;">Acest link este valabil 60 de minute. Dacă nu ai făcut această achiziție, ignoră acest email.</p>
//               </div>
//             `
//           });

//           // 4. Update status în tabelul orders
//           await sql`
//             UPDATE orders 
//             SET status = 'paid' 
//             WHERE stripe_session_id = ${session.id}
//           `;

//           console.log(`✅ Proces finalizat cu succes pentru: ${customerEmail}`);
//         } catch (error) {
//           console.error('❌ Eroare la procesarea post-plată:', error);
//           return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//         }
//       }
//       break;

//     case 'checkout.session.async_payment_failed':
//       await sql`UPDATE orders SET status = 'failed' WHERE stripe_session_id = ${session.id}`;
//       console.log(`❌ Plata eșuată pentru sesiunea: ${session.id}`);
//       break;

//     case 'checkout.session.expired':
//       await sql`UPDATE orders SET status = 'expired' WHERE stripe_session_id = ${session.id}`;
//       console.log(`⚠️ Sesiune expirată: ${session.id}`);
//       break;

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return NextResponse.json({ received: true });
// }
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

export async function POST(req: Request) {
  // 1. Inițializăm serviciile DOAR în interiorul funcției
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
apiVersion: '2026-04-22.dahlia' 
  });
  const sql = neon(process.env.DATABASE_URL!);
  const resend = new Resend(process.env.RESEND_API_KEY!);
  
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    // Folosim variabila locală stripe
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const customerEmail = session.customer_details?.email || session.customer_email;

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      if (customerEmail) {
        const token = crypto.randomUUID();
        const expiration = new Date(Date.now() + 3600000);

        try {
          await sql`
            INSERT INTO verification_tokens (email, token, expires_at)
            VALUES (${customerEmail}, ${token}, ${expiration})
          `;

          await resend.emails.send({
            from: 'Vibe Invite <onboarding@resend.dev>',
            to: [customerEmail],
            subject: 'Setează parola pentru invitația ta 🎉',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                <h2>Bună!</h2>
                <p>Plata a fost confirmată. Setează parola aici:</p>
                <a href="${process.env.NEXT_PUBLIC_URL}/setup-password?token=${token}" 
                   style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                  Setează Parola
                </a>
              </div>
            `
          });

          await sql`UPDATE orders SET status = 'paid' WHERE stripe_session_id = ${session.id}`;
        } catch (error) {
          console.error('❌ Database/Email error:', error);
        }
      }
      break;

    case 'checkout.session.async_payment_failed':
      await sql`UPDATE orders SET status = 'failed' WHERE stripe_session_id = ${session.id}`;
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}