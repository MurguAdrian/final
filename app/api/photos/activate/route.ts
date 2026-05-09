import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      UPDATE wedding_settings
      SET
        gallery_status = 'active',
        photos_activated_at = NOW(),
        photos_expires_at = NOW() + INTERVAL '3 days',
        is_unlock_paid = false
      WHERE order_id = ${orderId}
        AND gallery_status = 'inactive'
    `;

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}