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

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;
//       const email = session.customer_email;

//       console.log("--- START PROCESARE WEBHOOK ---");
//       console.log("Email client:", email);

//       // 1. Generăm Token-ul
//       const setupToken = crypto.randomBytes(32).toString('hex');
      
//       // 2. Inserăm în verification_tokens (Folosim SQL pentru dată ca să nu avem erori de format JS)
//       try {
//         await sql`
//           INSERT INTO verification_tokens (email, token, expires_at)
//           VALUES (${email}, ${setupToken}, NOW() + INTERVAL '24 hours')
//         `;
//         console.log("✅ Token inserat cu succes în DB");
//       } catch (dbError: any) {
//         console.error("❌ EROARE LA INSERT TOKEN:", dbError.message);
//         throw new Error("DB Insert Failed");
//       }

//       // 3. Update status în 'paid'
// await sql`
//   UPDATE orders 
//   SET status = 'paid', 
//       expires_at = NOW() + INTERVAL '12 months' 
//   WHERE stripe_session_id = ${session.id}
// `;
//       console.log("✅ Status comandă actualizat la 'paid'");

//       // 4. Trimitem Email-ul
//       // OBLIGATORIU: Dacă nu ai domeniul verificat în Resend, folosește 'onboarding@resend.dev'
//       try {
//         const { data, error } = await resend.emails.send({
//           from: 'Vibe Invite <onboarding@resend.dev>', 
//           to: email as string,
//           subject: 'Setează parola pentru invitația ta Vibe Invite',
//           html: `
//             <div style="font-family: sans-serif; padding: 20px;">
//               <h2>Bun venit! ✨</h2>
//               <p>Apasă pe butonul de mai jos pentru a-ți seta parola:</p>
//               <a href="https://www.vibeinvite.ro/setup-password?token=${setupToken}" 
//                  style="background: black; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
//                 Setează Parola
//               </a>
//             </div>
//           `
//         });

//         if (error) {
//           console.error("❌ EROARE RESEND:", error);
//         } else {
//           console.log("📧 Email trimis cu succes!", data);
//         }
//       } catch (emailErr: any) {
//         console.error("❌ CRASH LA TRIMITERE EMAIL:", emailErr.message);
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia' as any,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    // --- 1. IDEMPOTENCY: Verificăm dacă am procesat deja acest event ---
    const existingEvent = await sql`SELECT id FROM processed_stripe_events WHERE stripe_event_id = ${event.id} LIMIT 1`;
    if (existingEvent.length > 0) {
        console.log(`ℹ️ Event-ul Stripe ${event.id} a fost deja procesat. Se ignoră.`);
        return NextResponse.json({ received: true, status: 'already_processed' });
    }
    // Salvăm event-ul pentru a nu-l procesa de 2 ori
    await sql`INSERT INTO processed_stripe_events (stripe_event_id) VALUES (${event.id})`;


    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      console.log("--- START PROCESARE WEBHOOK ---");
      console.log("Session ID:", session.id);

      // =========================================================================
      // CAZUL A: PLATA INIȚIALĂ A INVITAȚIEI (Codul tău vechi)
      // =========================================================================
      if (!metadata.paymentType) {
          const email = session.customer_email;
          console.log("Tip plată: ACHIZIȚIE INIȚIALĂ INVITAȚIE. Email:", email);

          const setupToken = crypto.randomBytes(32).toString('hex');
          
          try {
            await sql`
              INSERT INTO verification_tokens (email, token, expires_at)
              VALUES (${email}, ${setupToken}, NOW() + INTERVAL '24 hours')
            `;
            console.log("✅ Token inserat cu succes în DB");
          } catch (dbError: any) {
            console.error("❌ EROARE LA INSERT TOKEN:", dbError.message);
            throw new Error("DB Insert Failed");
          }

          await sql`
            UPDATE orders 
            SET status = 'paid', 
                expires_at = NOW() + INTERVAL '12 months' 
            WHERE stripe_session_id = ${session.id}
          `;
          console.log("✅ Status comandă actualizat la 'paid'");

          try {
            const { data, error } = await resend.emails.send({
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
            else console.log("📧 Email trimis cu succes!", data);
          } catch (emailErr: any) {
            console.error("❌ CRASH LA TRIMITERE EMAIL:", emailErr.message);
          }
      } 
      
      // =========================================================================
      // CAZUL B: PLĂȚI PENTRU MODULUL FOTO (Extend, Unlock, New Album)
      // =========================================================================
      else if (metadata.orderId && metadata.paymentType) {
          const orderId = parseInt(metadata.orderId);
          const paymentType = metadata.paymentType;
          console.log(`Tip plată: FOTO [${paymentType}] pt Order ID: ${orderId}`);

          // Căutăm starea curentă a galeriei
          const currentSettings = await sql`
            SELECT gallery_status, photos_activated_at, photos_expires_at, archive_expires_at, is_unlock_paid 
            FROM wedding_settings WHERE order_id = ${orderId} LIMIT 1
          `;

          if (currentSettings.length === 0) throw new Error("Nunta nu a fost gasita.");
          const setting = currentSettings[0];

          try {
            // --- LOGICA EXACTĂ PER TIP DE PLATĂ ---

            if (paymentType === 'extend') {
                // Verificăm dacă suntem în primele 3 zile (permitem o marjă scurtă)
                // O simplă verificare e dacă timpul curent este mai mic decât photos_expires_at
                const isWithinFirst3Days = setting.photos_expires_at && (new Date() <= new Date(setting.photos_expires_at));
                
                if (isWithinFirst3Days) {
                    await sql`
                      UPDATE wedding_settings 
                      SET photos_expires_at = photos_expires_at + INTERVAL '5 days'
                      WHERE order_id = ${orderId}
                    `;
                    console.log("✅ Galerie prelungită cu 5 zile.");
                } else {
                    console.error("❌ EROARE: S-a încercat 'extend', dar cele 3 zile inițiale au trecut.");
                }
            } 
            
            else if (paymentType === 'unlock') {
                // Verificăm dacă albumul este expirat dar nu șters definitiv
                // (archive_expires_at este data finală a celor 30 de zile)
                const isNotDeleted = setting.archive_expires_at && (new Date() < new Date(setting.archive_expires_at));

                if (setting.gallery_status === 'expired' && isNotDeleted) {
                    await sql`
                      UPDATE wedding_settings 
                      SET 
                        is_unlock_paid = true,
                        gallery_status = 'expired', -- Statusul ramane expired pt upload, dar unlock_paid devine true pt vizualizare
                        photos_expires_at = NOW() + INTERVAL '5 days' -- dăm 5 zile de vizualizare
                      WHERE order_id = ${orderId}
                    `;
                    console.log("✅ Deblocare temporară pt vizualizare aplicată (5 zile).");
                } else {
                    console.error("❌ EROARE: 'unlock' respins. Galeria nu este 'expired' sau a fost deja ștearsă definitiv.");
                }
            } 
            
            else if (paymentType === 'new_album') {
                // Reset complet
                await sql`
                  UPDATE wedding_settings 
                  SET 
                    gallery_status = 'inactive',
                    photos_expires_at = NULL,
                    photos_activated_at = NULL,
                    archive_expires_at = NULL,
                    photo_consent_accepted = false,
                    is_unlock_paid = false
                  WHERE order_id = ${orderId}
                `;
                console.log("✅ Album nou activat (status resetat la inactive, necesită consimțământ).");
            }
          } catch (dbError: any) {
            console.error("❌ EROARE DB FOTO WEBHOOK:", dbError.message);
            throw new Error("DB Update Photo Module Failed");
          }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ EROARE GENERALĂ WEBHOOK:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}