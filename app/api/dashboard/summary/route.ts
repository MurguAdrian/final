import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const slug = searchParams.get("slug");

  const sql = neon(process.env.DATABASE_URL!);

  try {
    let settings;

    if (orderId) {
      // Logica pentru Dashboard
      settings = await sql`
        SELECT * FROM wedding_settings WHERE order_id = ${parseInt(orderId)} LIMIT 1
      `;
    } else if (slug) {
      // Logica pentru Pagina Publică
      settings = await sql`
        SELECT * FROM wedding_settings WHERE custom_slug = ${slug} LIMIT 1
      `;
    } else {
      return NextResponse.json({ error: "Lipsesc parametrii" }, { status: 400 });
    }

    if (settings.length === 0) {
      return NextResponse.json({ weddingDetails: null }, { status: 404 });
    }

    const currentOrderId = settings[0].order_id;

    // Luăm statisticile și invitații folosind order_id-ul găsit
    const stats = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE is_coming = true) as total_da,
        COUNT(*) FILTER (WHERE is_coming = false) as total_nu,
        SUM(adults_count) FILTER (WHERE is_coming = true) as total_adulti,
        SUM(kids_count) FILTER (WHERE is_coming = true) as total_copii
      FROM rsvp_responses 
      WHERE order_id = ${currentOrderId}
    `;

    const guests = await sql`
      SELECT * FROM rsvp_responses 
      WHERE order_id = ${currentOrderId} 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      views: settings[0]?.view_count || 0,
      weddingDetails: settings[0],
      stats: {
        da: parseInt(stats[0].total_da) || 0,
        nu: parseInt(stats[0].total_nu) || 0,
        adulti: parseInt(stats[0].total_adulti) || 0,
        copii: parseInt(stats[0].total_copii) || 0,
      },
      guests
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Eroare bază de date" }, { status: 500 });
  }
}