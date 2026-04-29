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
    const sql = neon(process.env.DATABASE_URL!);

    // SQL-ul folosește exact coloanele tale din listă
    await sql`
      INSERT INTO wedding_settings (
        order_id, custom_slug, bride_name, groom_name, nasi_names, parents_names, 
        wedding_date, wedding_time, location_name, google_maps_url, waze_url,
        religious_date, religious_time, religious_location, religious_waze, 
        is_religious_active, is_menu_active, is_accommodation_active, is_transport_active,
        contact_phone_bride, contact_phone_groom, our_story, menu_details, is_photos_active
      )
      VALUES (
        ${body.orderId}, ${body.customSlug}, ${body.brideName}, ${body.groomName}, ${body.nasiNames}, ${body.parentsNames},
        ${body.weddingDate || null}, ${body.weddingTime}, ${body.locationName}, ${body.googleMapsUrl}, ${body.wazeUrl},
        ${body.religiousDate || null}, ${body.religiousTime}, ${body.religiousLocation}, ${body.religiousWaze},
        ${body.isReligiousActive}, ${body.isMenuActive}, ${body.isAccommodationActive}, ${body.isTransportActive},
        ${body.contactPhoneBride}, ${body.contactPhoneGroom}, ${body.our_story || body.ourStory}, ${body.menu_details || null}, ${body.isPhotosActive || false}
      )
      ON CONFLICT (order_id) DO UPDATE SET
        custom_slug = EXCLUDED.custom_slug,
        bride_name = EXCLUDED.bride_name,
        groom_name = EXCLUDED.groom_name,
        nasi_names = EXCLUDED.nasi_names,
        parents_names = EXCLUDED.parents_names,
        wedding_date = EXCLUDED.wedding_date,
        wedding_time = EXCLUDED.wedding_time,
        location_name = EXCLUDED.location_name,
        google_maps_url = EXCLUDED.google_maps_url,
        waze_url = EXCLUDED.waze_url,
        religious_date = EXCLUDED.religious_date,
        religious_time = EXCLUDED.religious_time,
        religious_location = EXCLUDED.religious_location,
        religious_waze = EXCLUDED.religious_waze,
        is_religious_active = EXCLUDED.is_religious_active,
        is_menu_active = EXCLUDED.is_menu_active,
        is_accommodation_active = EXCLUDED.is_accommodation_active,
        is_transport_active = EXCLUDED.is_transport_active,
        contact_phone_bride = EXCLUDED.contact_phone_bride,
        contact_phone_groom = EXCLUDED.contact_phone_groom,
        our_story = EXCLUDED.our_story,
        menu_details = EXCLUDED.menu_details,
        is_photos_active = EXCLUDED.is_photos_active;
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}