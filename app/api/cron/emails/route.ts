// import { NextResponse } from "next/server";
// import { Resend } from 'resend';
// import { neon } from "@neondatabase/serverless";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function GET(request: Request) {
//   const sql = neon(process.env.DATABASE_URL!);

//   try {
//     // 1. Notificare cu 2 zile înainte de nuntă (Să activeze galeria)
//     const upcomingWeddings = await sql`
//       SELECT o.email, s.bride_name, s.custom_slug 
//       FROM wedding_settings s
//       JOIN orders o ON s.order_id = o.id
//       WHERE s.wedding_date::date = (NOW() + INTERVAL '2 days')::date
//       AND s.gallery_status = 'inactive'
//     `;

//     for (const wedding of upcomingWeddings) {
//       await resend.emails.send({
//         from: 'Vibe Invite <onboarding@resend.dev>', // Recomandat sa folosesti asta pana verifici domeniul tau
//         to: wedding.email,
//         subject: 'Nu uita să activezi Galeria Foto Live!',
//         html: `<h1>Bună, ${wedding.bride_name}!</h1>
//                <p>Nunta voastră se apropie! Nu uita să activezi galeria foto din dashboard pentru ca invitații să poată încărca poze live.</p>
//                <a href="https://vibeinvite.ro/dashboard/lux">Intră în Dashboard</a>`
//       });
//     }

//     // 2. Notificare expirare galerie (Am pus 12 ore fereastra ca sa evitam erori de Timezone)
//     const expiringSoon = await sql`
//       SELECT o.email, s.photos_expires_at, s.order_id
//       FROM wedding_settings s
//       JOIN orders o ON s.order_id = o.id
//       WHERE s.gallery_status = 'active'
//       AND s.photos_expires_at > NOW() 
//       AND s.photos_expires_at <= (NOW() + INTERVAL '12 hours')
//     `;

//     for (const item of expiringSoon) {
//       await resend.emails.send({
//         from: 'Vibe Invite <onboarding@resend.dev>',
//         to: item.email,
//         subject: '⚠️ Galeria ta foto expiră în curând!',
//         html: `<p>Mai aveți foarte puțin timp! Galeria foto se va închide în curând. Prelungește acum accesul pentru a nu pierde momentele invitaților.</p>
//                <a href="https://vibeinvite.ro/dashboard/lux">Prelungește acum</a>`
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       sentUpcoming: upcomingWeddings.length, 
//       sentExpiring: expiringSoon.length 
//     });
//   } catch (error: any) {
//     console.error("Cron Error:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { neon } from "@neondatabase/serverless";
export const dynamic = 'force-dynamic';
// 1. Ștergem instanțierea globală de aici

export async function GET(request: Request) {
  // 2. Folosim un fallback pentru DATABASE_URL ca să nu crape neon la build
  const databaseUrl = process.env.DATABASE_URL || "postgres://localhost:5432/dummy";
  const sql = neon(databaseUrl);

  try {
    // 3. Instanțiem Resend în interiorul funcției cu un fallback
    const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

    // --- LOGICA TA RĂMÂNE IDENTICĂ ---

    // 1. Notificare cu 2 zile înainte de nuntă
    const upcomingWeddings = await sql`
      SELECT o.email, s.bride_name, s.custom_slug 
      FROM wedding_settings s
      JOIN orders o ON s.order_id = o.id
      WHERE s.wedding_date::date = (NOW() + INTERVAL '2 days')::date
      AND s.gallery_status = 'inactive'
    `;

    for (const wedding of upcomingWeddings) {
      await resend.emails.send({
        from: 'Vibe Invite <onboarding@resend.dev>',
        to: wedding.email,
        subject: 'Nu uita să activezi Galeria Foto Live!',
        html: `<h1>Bună, ${wedding.bride_name}!</h1>
               <p>Nunta voastră se apropie! Nu uita să activezi galeria foto din dashboard pentru ca invitații să poată încărca poze live.</p>
               <a href="https://vibeinvite.ro/dashboard/lux">Intră în Dashboard</a>`
      });
    }

    // 2. Notificare expirare galerie
    const expiringSoon = await sql`
      SELECT o.email, s.photos_expires_at, s.order_id
      FROM wedding_settings s
      JOIN orders o ON s.order_id = o.id
      WHERE s.gallery_status = 'active'
      AND s.photos_expires_at > NOW() 
      AND s.photos_expires_at <= (NOW() + INTERVAL '12 hours')
    `;

    for (const item of expiringSoon) {
      await resend.emails.send({
        from: 'Vibe Invite <onboarding@resend.dev>',
        to: item.email,
        subject: '⚠️ Galeria ta foto expiră în curând!',
        html: `<p>Mai aveți foarte puțin timp! Galeria foto se va închide în curând. Prelungește acum accesul pentru a nu pierde momentele invitaților.</p>
               <a href="https://vibeinvite.ro/dashboard/lux">Prelungește acum</a>`
      });
    }

    return NextResponse.json({ 
      success: true, 
      sentUpcoming: upcomingWeddings.length, 
      sentExpiring: expiringSoon.length 
    });
  } catch (error: any) {
    console.error("Cron Error:", error.message);
    // Dacă eroarea este despre cheia API sau DB în timpul build-ului local, 
    // putem returna un mesaj mai prietenos.
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}