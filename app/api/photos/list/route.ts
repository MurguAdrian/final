// import { NextResponse } from "next/server";
// import { neon } from "@neondatabase/serverless";

// // Forțăm Next.js să nu pună datele în cache
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const orderId = searchParams.get("orderId");

//     if (!orderId) {
//       return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
//     }

//     const sql = neon(process.env.DATABASE_URL!);
    
//     // Interogăm baza de date
//     const photos = await sql`
//       SELECT id, url, public_id, created_at 
//       FROM wedding_photos 
//       WHERE order_id = ${parseInt(orderId)} 
//       ORDER BY created_at DESC
//     `;

//     // Returnăm un obiect care conține array-ul de poze
//     return NextResponse.json({ photos });
//   } catch (error: any) {
//     console.error("API List Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

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