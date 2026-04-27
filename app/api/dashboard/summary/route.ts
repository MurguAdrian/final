import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    // 1. Luăm setările nunții (view_count)
    const settings = await sql`
      SELECT view_count FROM wedding_settings WHERE order_id = ${orderId}
    `;

    // 2. Luăm statisticile RSVP
    const stats = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE is_coming = true) as total_da,
        COUNT(*) FILTER (WHERE is_coming = false) as total_nu,
        SUM(adults_count) FILTER (WHERE is_coming = true) as total_adulti,
        SUM(kids_count) FILTER (WHERE is_coming = true) as total_copii
      FROM rsvp_responses 
      WHERE order_id = ${orderId}
    `;

    // 3. Luăm lista completă de invitați pentru tabel
    const guests = await sql`
      SELECT * FROM rsvp_responses 
      WHERE order_id = ${orderId} 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      views: settings[0]?.view_count || 0,
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
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}