import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Forțăm Next.js să nu pună datele în cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    
    // Interogăm baza de date
    const photos = await sql`
      SELECT id, url, public_id, created_at 
      FROM wedding_photos 
      WHERE order_id = ${parseInt(orderId)} 
      ORDER BY created_at DESC
    `;

    // Returnăm un obiect care conține array-ul de poze
    return NextResponse.json({ photos });
  } catch (error: any) {
    console.error("API List Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}