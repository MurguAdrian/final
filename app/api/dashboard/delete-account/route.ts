import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

export async function DELETE(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const session = await getSession();

    if (!session?.email) {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
    }

    const email = session.email;

    // Verifică dacă există order-ul
    const [order] = await sql`
      SELECT id FROM orders WHERE email = ${email} LIMIT 1
    `;

    if (!order) {
      return NextResponse.json({ error: "Contul nu există" }, { status: 404 });
    }

    // CASCADE șterge automat: rsvp_responses, wedding_settings, wedding_photos
    await sql`
      DELETE FROM orders WHERE email = ${email}
    `;

    // Șterge și verification_tokens (nu are FK la orders)
    await sql`
      DELETE FROM verification_tokens WHERE email = ${email}
    `;

    // Șterge cookie-ul de sesiune
    const response = NextResponse.json({ success: true });
    response.cookies.delete("auth_token"); // adaptează la numele cookie-ului tău
    return response;

  } catch (err) {
    console.error("Delete account error:", err);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}