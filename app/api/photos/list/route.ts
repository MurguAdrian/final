

import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth"; // Importăm helper-ul de sesiune

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // 1. Verificăm cine este utilizatorul logat
    const session = await getSession();

    if (!session || !session.email) {
      return NextResponse.json({ error: "Neautorizat. Te rugăm să te loghezi." }, { status: 401 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    // 2. Interogăm baza de date folosind un JOIN între poze și comenzi.
    // Astfel, aducem doar pozele unde email-ul din tabelul 'orders' coincide cu cel din sesiune.
    const photos = await sql`
      SELECT wp.id, wp.url, wp.public_id, wp.created_at 
      FROM wedding_photos wp
      JOIN orders o ON wp.order_id = o.id
      WHERE o.email = ${session.email}
      ORDER BY wp.created_at DESC
    `;

    // 3. Returnăm rezultatul
    return NextResponse.json({ photos });

  } catch (error: any) {
    console.error("API List Error:", error);
    return NextResponse.json({ error: "Eroare la încărcarea galeriei foto." }, { status: 500 });
  }
}