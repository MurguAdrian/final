// import { NextResponse } from "next/server";
// import { neon } from "@neondatabase/serverless";
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const orderId = searchParams.get("orderId");
//   const slug = searchParams.get("slug");

//   const sql = neon(process.env.DATABASE_URL!);

//   try {
//     let settings;

//     // Prioritate slug (pentru pagina publică)
//     if (slug) {
//       settings = await sql`
//         SELECT * FROM wedding_settings WHERE custom_slug = ${slug} LIMIT 1
//       `;
//     } 
//     // Secundar orderId (pentru dashboard)
//     else if (orderId) {
//       settings = await sql`
//         SELECT * FROM wedding_settings WHERE order_id = ${parseInt(orderId)} LIMIT 1
//       `;
//     } else {
//       return NextResponse.json({ error: "Lipsesc parametrii" }, { status: 400 });
//     }

//     if (!settings || settings.length === 0) {
//       return NextResponse.json({ weddingDetails: null }, { status: 404 });
//     }

//     const currentOrderId = settings[0].order_id;

//     // Statistici
//     const stats = await sql`
//       SELECT 
//         COUNT(*) FILTER (WHERE is_coming = true) as total_da,
//         COUNT(*) FILTER (WHERE is_coming = false) as total_nu,
//         COALESCE(SUM(adults_count) FILTER (WHERE is_coming = true), 0) as total_adulti,
//         COALESCE(SUM(kids_count) FILTER (WHERE is_coming = true), 0) as total_copii
//       FROM rsvp_responses 
//       WHERE order_id = ${currentOrderId}
//     `;

//     // Invitați
//     const guests = await sql`
//       SELECT * FROM rsvp_responses 
//       WHERE order_id = ${currentOrderId} 
//       ORDER BY created_at DESC
//     `;

//     return NextResponse.json({
//       views: settings[0]?.view_count || 0,
//       weddingDetails: settings[0],
//       stats: {
//         da: parseInt(stats[0].total_da) || 0,
//         nu: parseInt(stats[0].total_nu) || 0,
//         adulti: parseInt(stats[0].total_adulti) || 0,
//         copii: parseInt(stats[0].total_copii) || 0,
//       },
//       guests
//     });
//   } catch (error) {
//     console.error("Eroare API:", error);
//     return NextResponse.json({ error: "Eroare server" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const slug = searchParams.get("slug");

  const sql = neon(process.env.DATABASE_URL!);

  try {
    let settings;

    if (slug) {
      settings = await sql`SELECT * FROM wedding_settings WHERE custom_slug = ${slug} LIMIT 1`;
    } else if (orderId) {
      settings = await sql`SELECT * FROM wedding_settings WHERE order_id = ${parseInt(orderId)} LIMIT 1`;
    } else {
      return NextResponse.json({ error: "Lipsesc parametrii" }, { status: 400 });
    }

    if (!settings || settings.length === 0) {
      return NextResponse.json({ weddingDetails: null }, { status: 404 });
    }

    const currentOrderId = settings[0].order_id;

    // Statistici extinse (Adăugat Cazare și Transport)
    const stats = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE is_coming = true) as total_da,
        COUNT(*) FILTER (WHERE is_coming = false) as total_nu,
        COALESCE(SUM(adults_count) FILTER (WHERE is_coming = true), 0) as total_adulti,
        COALESCE(SUM(kids_count) FILTER (WHERE is_coming = true), 0) as total_copii,
        COUNT(*) FILTER (WHERE needs_accommodation = true AND is_coming = true) as total_cazare,
        COUNT(*) FILTER (WHERE needs_transport = true AND is_coming = true) as total_transport
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
        cazare: parseInt(stats[0].total_cazare) || 0,
        transport: parseInt(stats[0].total_transport) || 0,
      },
      guests
    });
  } catch (error) {
    console.error("Eroare API:", error);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}