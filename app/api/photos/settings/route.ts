import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = parseInt(searchParams.get("orderId") || "");

    if (!orderId) {
      return NextResponse.json({ error: "orderId lipsă" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const rows = await sql`
      SELECT
        gallery_status,
        photos_activated_at,
        photos_expires_at,
        is_unlock_paid
      FROM wedding_settings
      WHERE order_id = ${orderId}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Nu a fost găsit." }, { status: 404 });
    }

    return NextResponse.json({ settings: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}