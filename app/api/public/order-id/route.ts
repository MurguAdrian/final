import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug lipsă" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  const rows = await sql`
    SELECT order_id FROM wedding_settings WHERE custom_slug = ${slug} LIMIT 1
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Nu a fost găsit" }, { status: 404 });
  }

  return NextResponse.json({ orderId: rows[0].order_id });
}
