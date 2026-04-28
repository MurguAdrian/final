// import { NextResponse } from "next/server";
// import { neon } from "@neondatabase/serverless";

// export async function POST(request: Request) {
//   try {
//     const { orderId, customSlug, brideName, groomName, locationName } = await request.json();
//     const sql = neon(process.env.DATABASE_URL!);

//     // Facem UPSERT (Update sau Insert dacă nu există)
//     await sql`
//       INSERT INTO wedding_settings (order_id, custom_slug, bride_name, groom_name, location_name)
//       VALUES (${orderId}, ${customSlug}, ${brideName}, ${groomName}, ${locationName})
//       ON CONFLICT (order_id) 
//       DO UPDATE SET 
//         custom_slug = EXCLUDED.custom_slug,
//         bride_name = EXCLUDED.bride_name,
//         groom_name = EXCLUDED.groom_name,
//         location_name = EXCLUDED.location_name;
//     `;

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error(error);
//     if (error.message.includes("unique constraint")) {
//       return NextResponse.json({ error: "Acest link este deja folosit de altcineva." }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      orderId, customSlug, brideName, groomName, nasiNames, 
      parentsNames, weddingDate, locationName, wazeUrl, googleMapsUrl, ourStory 
    } = body;

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO wedding_settings (
        order_id, custom_slug, bride_name, groom_name, nasi_names, 
        parents_names, wedding_date, location_name, waze_url, google_maps_url, our_story
      )
      VALUES (
        ${orderId}, ${customSlug}, ${brideName}, ${groomName}, ${nasiNames}, 
        ${parentsNames}, ${weddingDate || null}, ${locationName}, ${wazeUrl}, ${googleMapsUrl}, ${ourStory}
      )
      ON CONFLICT (order_id) 
      DO UPDATE SET 
        custom_slug = EXCLUDED.custom_slug,
        bride_name = EXCLUDED.bride_name,
        groom_name = EXCLUDED.groom_name,
        nasi_names = EXCLUDED.nasi_names,
        parents_names = EXCLUDED.parents_names,
        wedding_date = EXCLUDED.wedding_date,
        location_name = EXCLUDED.location_name,
        waze_url = EXCLUDED.waze_url,
        google_maps_url = EXCLUDED.google_maps_url,
        our_story = EXCLUDED.our_story;
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Eroare salvare DB:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}