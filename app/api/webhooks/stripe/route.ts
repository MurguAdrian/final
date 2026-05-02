

// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { neon } from "@neondatabase/serverless";
// import { Resend } from "resend";
// import crypto from "crypto";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2026-04-22.dahlia' as any,
// });

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = req.headers.get("stripe-signature")!;
//   const sql = neon(process.env.DATABASE_URL!);

//   try {
//     const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

//     // --- 1. IDEMPOTENCY: Verificăm dacă am procesat deja acest event ---
//     const existingEvent = await sql`SELECT id FROM processed_stripe_events WHERE stripe_event_id = ${event.id} LIMIT 1`;
//     if (existingEvent.length > 0) {
//         console.log(`ℹ️ Event-ul Stripe ${event.id} a fost deja procesat. Se ignoră.`);
//         return NextResponse.json({ received: true, status: 'already_processed' });
//     }
//     // Salvăm event-ul pentru a nu-l procesa de 2 ori
//     await sql`INSERT INTO processed_stripe_events (stripe_event_id) VALUES (${event.id})`;


//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;
//       const metadata = session.metadata || {};

//       console.log("--- START PROCESARE WEBHOOK ---");
//       console.log("Session ID:", session.id);

//       // =========================================================================
//       // CAZUL A: PLATA INIȚIALĂ A INVITAȚIEI (Codul tău vechi)
//       // =========================================================================
//       if (!metadata.paymentType) {
//           const email = session.customer_email;
//           console.log("Tip plată: ACHIZIȚIE INIȚIALĂ INVITAȚIE. Email:", email);

//           const setupToken = crypto.randomBytes(32).toString('hex');
          
//           try {
//             await sql`
//               INSERT INTO verification_tokens (email, token, expires_at)
//               VALUES (${email}, ${setupToken}, NOW() + INTERVAL '24 hours')
//             `;
//             console.log("✅ Token inserat cu succes în DB");
//           } catch (dbError: any) {
//             console.error("❌ EROARE LA INSERT TOKEN:", dbError.message);
//             throw new Error("DB Insert Failed");
//           }

//           await sql`
//             UPDATE orders 
//             SET status = 'paid', 
//                 expires_at = NOW() + INTERVAL '12 months' 
//             WHERE stripe_session_id = ${session.id}
//           `;
//           console.log("✅ Status comandă actualizat la 'paid'");

//           try {
//             const { data, error } = await resend.emails.send({
//               from: 'Vibe Invite <onboarding@resend.dev>', 
//               to: email as string,
//               subject: 'Setează parola pentru invitația ta Vibe Invite',
//               html: `
//                 <div style="font-family: sans-serif; padding: 20px;">
//                   <h2>Bun venit! ✨</h2>
//                   <p>Apasă pe butonul de mai jos pentru a-ți seta parola:</p>
//                   <a href="https://www.vibeinvite.ro/setup-password?token=${setupToken}" 
//                      style="background: black; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
//                     Setează Parola
//                   </a>
//                 </div>
//               `
//             });

//             if (error) console.error("❌ EROARE RESEND:", error);
//             else console.log("📧 Email trimis cu succes!", data);
//           } catch (emailErr: any) {
//             console.error("❌ CRASH LA TRIMITERE EMAIL:", emailErr.message);
//           }
//       } 
      
//       // =========================================================================
//       // CAZUL B: PLĂȚI PENTRU MODULUL FOTO (Extend, Unlock, New Album)
//       // =========================================================================
//       else if (metadata.orderId && metadata.paymentType) {
//           const orderId = parseInt(metadata.orderId);
//           const paymentType = metadata.paymentType;
//           console.log(`Tip plată: FOTO [${paymentType}] pt Order ID: ${orderId}`);

//           try {
//             // --- LOGICA EXACTĂ PER TIP DE PLATĂ ---

//             if (paymentType === 'extend') {
//                 await sql`
//                   UPDATE wedding_settings 
//                   SET photos_expires_at = photos_expires_at + INTERVAL '5 days'
//                   WHERE order_id = ${orderId}
//                 `;
//                 console.log("✅ Galerie prelungită cu 5 zile.");
//             } 
            
//             else if (paymentType === 'unlock') {
//                 // Deblocare de 200 RON: Simplificată pentru a funcționa garantat
//                 await sql`
//                   UPDATE wedding_settings 
//                   SET 
//                     is_unlock_paid = true,
//                     gallery_status = 'expired', 
//                     photos_expires_at = NOW() + INTERVAL '5 days' 
//                   WHERE order_id = ${orderId}
//                 `;
//                 console.log("✅ Deblocare temporară pt vizualizare aplicată (5 zile).");
//             } 
            
//             else if (paymentType === 'new_album') {
//                 // Reset complet
//                 await sql`
//                   UPDATE wedding_settings 
//                   SET 
//                     gallery_status = 'inactive',
//                     photos_expires_at = NULL,
//                     photos_activated_at = NULL,
//                     archive_expires_at = NULL,
//                     photo_consent_accepted = false,
//                     is_unlock_paid = false
//                   WHERE order_id = ${orderId}
//                 `;
//                 console.log("✅ Album nou activat (status resetat la inactive, necesită consimțământ).");
//             }
//           } catch (dbError: any) {
//             console.error("❌ EROARE DB FOTO WEBHOOK:", dbError.message);
//             throw new Error("DB Update Photo Module Failed");
//           }
//       }
//     }

//     return NextResponse.json({ received: true });
//   } catch (err: any) {
//     console.error("❌ EROARE GENERALĂ WEBHOOK:", err.message);
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import crypto from "crypto";

export async function POST(req: Request) {
  // 1. Definim cheile cu fallback-uri pentru a trece de build
  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
  const RESEND_KEY = process.env.RESEND_API_KEY || "re_placeholder";
  const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/dummy";
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder";

  // 2. Instanțiem clienții în interiorul funcției
  const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2026-04-22.dahlia' as any,
  });
  const resend = new Resend(RESEND_KEY);
  const sql = neon(DB_URL);

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  try {
    // 3. Construim event-ul
    const event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);

    // --- 1. IDEMPOTENCY ---
    const existingEvent = await sql`SELECT id FROM processed_stripe_events WHERE stripe_event_id = ${event.id} LIMIT 1`;
    if (existingEvent.length > 0) {
        console.log(`ℹ️ Event-ul Stripe ${event.id} a fost deja procesat.`);
        return NextResponse.json({ received: true, status: 'already_processed' });
    }
    
    await sql`INSERT INTO processed_stripe_events (stripe_event_id) VALUES (${event.id})`;

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      console.log("--- START PROCESARE WEBHOOK ---");

      // CAZUL A: PLATA INIȚIALĂ
      if (!metadata.paymentType) {
          const email = session.customer_email;
          const setupToken = crypto.randomBytes(32).toString('hex');
          
          await sql`
            INSERT INTO verification_tokens (email, token, expires_at)
            VALUES (${email}, ${setupToken}, NOW() + INTERVAL '24 hours')
          `;

          await sql`
            UPDATE orders 
            SET status = 'paid', 
                expires_at = NOW() + INTERVAL '12 months' 
            WHERE stripe_session_id = ${session.id}
          `;

          const { error } = await resend.emails.send({
            from: 'Vibe Invite <onboarding@resend.dev>', 
            to: email as string,
            subject: 'Setează parola pentru invitația ta Vibe Invite',
            html: `
              <div style="font-family: sans-serif; padding: 20px;">
                <h2>Bun venit! ✨</h2>
                <p>Apasă pe butonul de mai jos pentru a-ți seta parola:</p>
                <a href="https://www.vibeinvite.ro/setup-password?token=${setupToken}" 
                   style="background: black; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Setează Parola
                </a>
              </div>
            `
          });
          if (error) console.error("❌ EROARE RESEND:", error);
      } 
      
      // CAZUL B: MODUL FOTO
      else if (metadata.orderId && metadata.paymentType) {
          const orderId = parseInt(metadata.orderId);
          const paymentType = metadata.paymentType;

          if (paymentType === 'extend') {
              await sql`UPDATE wedding_settings SET photos_expires_at = photos_expires_at + INTERVAL '5 days' WHERE order_id = ${orderId}`;
          } 
          else if (paymentType === 'unlock') {
              await sql`UPDATE wedding_settings SET is_unlock_paid = true, gallery_status = 'expired', photos_expires_at = NOW() + INTERVAL '5 days' WHERE order_id = ${orderId}`;
          } 
          else if (paymentType === 'new_album') {
              await sql`UPDATE wedding_settings SET gallery_status = 'inactive', photos_expires_at = NULL, photos_activated_at = NULL, archive_expires_at = NULL, photo_consent_accepted = false, is_unlock_paid = false WHERE order_id = ${orderId}`;
          }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ EROARE GENERALĂ WEBHOOK:", err.message);
    // Returnăm 400 doar dacă semnătura e greșită, altfel Next.js build s-ar putea opri
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}