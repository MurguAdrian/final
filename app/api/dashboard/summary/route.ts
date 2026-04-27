import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Luăm setările proaspete
    const settings = await sql`
      SELECT view_count, bride_name, groom_name, location_name, custom_slug 
      FROM wedding_settings 
      WHERE order_id = ${parseInt(orderId)}
      LIMIT 1
    `;

    const stats = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE is_coming = true) as total_da,
        COUNT(*) FILTER (WHERE is_coming = false) as total_nu,
        SUM(adults_count) FILTER (WHERE is_coming = true) as total_adulti,
        SUM(kids_count) FILTER (WHERE is_coming = true) as total_copii
      FROM rsvp_responses 
      WHERE order_id = ${parseInt(orderId)}
    `;

    const guests = await sql`
      SELECT * FROM rsvp_responses 
      WHERE order_id = ${parseInt(orderId)} 
      ORDER BY created_at DESC
    `;

    const response = NextResponse.json({
      views: settings[0]?.view_count || 0,
      weddingDetails: settings[0] || null,
      stats: {
        da: parseInt(stats[0].total_da) || 0,
        nu: parseInt(stats[0].total_nu) || 0,
        adulti: parseInt(stats[0].total_adulti) || 0,
        copii: parseInt(stats[0].total_copii) || 0,
      },
      guests
    });

    // Setăm headere de NO CACHE agresiv
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}