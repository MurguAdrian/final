import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { neon } from "@neondatabase/serverless";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    // 1. Notificare cu 2 zile înainte de nuntă (Să activeze galeria)
    const upcomingWeddings = await sql`
      SELECT o.email, s.bride_name, s.custom_slug 
      FROM wedding_settings s
      JOIN orders o ON s.order_id = o.id
      WHERE s.wedding_date::date = (NOW() + INTERVAL '2 days')::date
      AND s.gallery_status = 'inactive'
    `;

    for (const wedding of upcomingWeddings) {
      await resend.emails.send({
        from: 'Vibe Invite <onboarding@resend.dev>', // Recomandat sa folosesti asta pana verifici domeniul tau
        to: wedding.email,
        subject: 'Nu uita să activezi Galeria Foto Live!',
        html: `<h1>Bună, ${wedding.bride_name}!</h1>
               <p>Nunta voastră se apropie! Nu uita să activezi galeria foto din dashboard pentru ca invitații să poată încărca poze live.</p>
               <a href="https://vibeinvite.ro/dashboard/lux">Intră în Dashboard</a>`
      });
    }

    // 2. Notificare expirare galerie (Am pus 12 ore fereastra ca sa evitam erori de Timezone)
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}