// import { NextResponse } from "next/server";
// import { neon } from "@neondatabase/serverless";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { 
//       orderId, customSlug, brideName, groomName, nasiNames, 
//       parentsNames, weddingDate, locationName, wazeUrl, googleMapsUrl, ourStory 
//     } = body;

//     const sql = neon(process.env.DATABASE_URL!);

//     await sql`
//       INSERT INTO wedding_settings (
//         order_id, custom_slug, bride_name, groom_name, nasi_names, 
//         parents_names, wedding_date, location_name, waze_url, google_maps_url, our_story
//       )
//       VALUES (
//         ${orderId}, ${customSlug}, ${brideName}, ${groomName}, ${nasiNames}, 
//         ${parentsNames}, ${weddingDate || null}, ${locationName}, ${wazeUrl}, ${googleMapsUrl}, ${ourStory}
//       )
//       ON CONFLICT (order_id) 
//       DO UPDATE SET 
//         custom_slug = EXCLUDED.custom_slug,
//         bride_name = EXCLUDED.bride_name,
//         groom_name = EXCLUDED.groom_name,
//         nasi_names = EXCLUDED.nasi_names,
//         parents_names = EXCLUDED.parents_names,
//         wedding_date = EXCLUDED.wedding_date,
//         location_name = EXCLUDED.location_name,
//         waze_url = EXCLUDED.waze_url,
//         google_maps_url = EXCLUDED.google_maps_url,
//         our_story = EXCLUDED.our_story;
//     `;

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("Eroare salvare DB:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      orderId, customSlug, brideName, groomName, nasiNames, parentsNames, 
      weddingDate, weddingTime, locationName, wazeUrl, googleMapsUrl, ourStory,
      religiousDate, religiousTime, religiousLocation, religiousWaze, isReligiousActive,
      isMenuActive, isAccommodationActive, isTransportActive,
      contactPhoneBride, contactPhoneGroom 
    } = body;

    if (!orderId) return NextResponse.json({ error: "Lipseste Order ID" }, { status: 400 });

    const sql = neon(process.env.DATABASE_URL!);

    // 1. Verificăm dacă slug-ul este deja luat de altcineva
    const existingSlug = await sql`
      SELECT order_id FROM wedding_settings 
      WHERE custom_slug = ${customSlug} AND order_id != ${orderId} 
      LIMIT 1
    `;

    if (existingSlug.length > 0) {
      return NextResponse.json({ error: "SLUG_TAKEN" }, { status: 400 });
    }

    // 2. Update sau Insert (Am adăugat wedding_time în baza de date presupunând că îl vei stoca în coloana existentă sau una nouă - dacă nu ai coloana, o folosim în text sau JSON)
    // Notă: Dacă nu ai coloana wedding_time în DB, o poți adăuga rapid în Neon: ALTER TABLE wedding_settings ADD COLUMN wedding_time TEXT;
    await sql`
      INSERT INTO wedding_settings (
        order_id, custom_slug, bride_name, groom_name, nasi_names, parents_names, 
        wedding_date, wedding_time, location_name, waze_url, google_maps_url, our_story,
        religious_date, religious_time, religious_location, religious_waze, is_religious_active,
        is_menu_active, is_accommodation_active, is_transport_active,
        contact_phone_bride, contact_phone_groom
      )
      VALUES (
        ${orderId}, ${customSlug}, ${brideName}, ${groomName}, ${nasiNames}, ${parentsNames}, 
        ${weddingDate || null}, ${weddingTime}, ${locationName}, ${wazeUrl}, ${googleMapsUrl}, ${ourStory},
        ${religiousDate || null}, ${religiousTime}, ${religiousLocation}, ${religiousWaze}, ${isReligiousActive},
        ${isMenuActive}, ${isAccommodationActive}, ${isTransportActive},
        ${contactPhoneBride}, ${contactPhoneGroom}
      )
      ON CONFLICT (order_id) 
DO UPDATE SET 
  custom_slug = EXCLUDED.custom_slug, 
  bride_name = EXCLUDED.bride_name, 
  groom_name = EXCLUDED.groom_name,
  nasi_names = EXCLUDED.nasi_names, 
  parents_names = EXCLUDED.parents_names,
  wedding_date = EXCLUDED.wedding_date, 
  wedding_time = EXCLUDED.wedding_time,
  location_name = EXCLUDED.location_name,
  waze_url = EXCLUDED.waze_url, 
  google_maps_url = EXCLUDED.google_maps_url, 
  our_story = EXCLUDED.our_story,
  religious_date = EXCLUDED.religious_date, 
  religious_time = EXCLUDED.religious_time, 
  religious_location = EXCLUDED.religious_location, 
  religious_waze = EXCLUDED.religious_waze, 
  is_religious_active = EXCLUDED.is_religious_active, 
  is_menu_active = EXCLUDED.is_menu_active, 
  is_accommodation_active = EXCLUDED.is_accommodation_active, 
  is_transport_active = EXCLUDED.is_transport_active,
  is_photos_active = EXCLUDED.is_photos_active, -- ADĂUGAT
  menu_details = EXCLUDED.menu_details, -- ADĂUGAT (pentru meniu)
  contact_phone_bride = EXCLUDED.contact_phone_bride, 
  contact_phone_groom = EXCLUDED.contact_phone_groom;
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}