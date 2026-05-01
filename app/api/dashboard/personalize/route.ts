
// import { NextResponse } from "next/server";
// import { neon } from "@neondatabase/serverless";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const sql = neon(process.env.DATABASE_URL!);

//     await sql`
//       INSERT INTO wedding_settings (
//         order_id, custom_slug, bride_name, groom_name, nasi_names, parents_names, 
//         wedding_date, wedding_time, location_name, google_maps_url, waze_url,
//         religious_date, religious_time, religious_location, religious_waze, 
//         is_religious_active, is_menu_active, is_accommodation_active, is_transport_active,
//         contact_phone_bride, contact_phone_groom, our_story, menu_details, 
//         is_photos_active, photos_expires_at, gallery_status, archive_expires_at
//       )
//       VALUES (
//         ${body.orderId}, ${body.customSlug || null}, ${body.brideName || null}, ${body.groomName || null}, ${body.nasiNames || null}, ${body.parentsNames || null},
//         ${body.weddingDate || null}, ${body.weddingTime || null}, ${body.locationName || null}, ${body.googleMapsUrl || null}, ${body.wazeUrl || null},
//         ${body.religiousDate || null}, ${body.religiousTime || null}, ${body.religiousLocation || null}, ${body.religiousWaze || null},
//         ${body.isReligiousActive ?? null}, ${body.isMenuActive ?? null}, ${body.isAccommodationActive ?? null}, ${body.isTransportActive ?? null},
//         ${body.contactPhoneBride || null}, ${body.contactPhoneGroom || null}, ${body.ourStory || null}, ${body.menu_details || null}, 
//         ${body.isPhotosActive ?? null}, ${body.photos_expires_at || null}, ${body.gallery_status || 'inactive'}, ${body.archive_expires_at || null}
//       )
//       ON CONFLICT (order_id) DO UPDATE SET
//         custom_slug = COALESCE(EXCLUDED.custom_slug, wedding_settings.custom_slug),
//         bride_name = COALESCE(EXCLUDED.bride_name, wedding_settings.bride_name),
//         groom_name = COALESCE(EXCLUDED.groom_name, wedding_settings.groom_name),
//         nasi_names = COALESCE(EXCLUDED.nasi_names, wedding_settings.nasi_names),
//         parents_names = COALESCE(EXCLUDED.parents_names, wedding_settings.parents_names),
//         wedding_date = COALESCE(EXCLUDED.wedding_date, wedding_settings.wedding_date),
//         wedding_time = COALESCE(EXCLUDED.wedding_time, wedding_settings.wedding_time),
//         location_name = COALESCE(EXCLUDED.location_name, wedding_settings.location_name),
//         google_maps_url = COALESCE(EXCLUDED.google_maps_url, wedding_settings.google_maps_url),
//         waze_url = COALESCE(EXCLUDED.waze_url, wedding_settings.waze_url),
//         religious_date = COALESCE(EXCLUDED.religious_date, wedding_settings.religious_date),
//         religious_time = COALESCE(EXCLUDED.religious_time, wedding_settings.religious_time),
//         religious_location = COALESCE(EXCLUDED.religious_location, wedding_settings.religious_location),
//         religious_waze = COALESCE(EXCLUDED.religious_waze, wedding_settings.religious_waze),
//         is_religious_active = COALESCE(EXCLUDED.is_religious_active, wedding_settings.is_religious_active),
//         is_accommodation_active = COALESCE(EXCLUDED.is_accommodation_active, wedding_settings.is_accommodation_active),
//         is_transport_active = COALESCE(EXCLUDED.is_transport_active, wedding_settings.is_transport_active),
//         contact_phone_bride = COALESCE(EXCLUDED.contact_phone_bride, wedding_settings.contact_phone_bride),
//         contact_phone_groom = COALESCE(EXCLUDED.contact_phone_groom, wedding_settings.contact_phone_groom),
//         our_story = COALESCE(EXCLUDED.our_story, wedding_settings.our_story),
//         is_menu_active = COALESCE(EXCLUDED.is_menu_active, wedding_settings.is_menu_active),
//         menu_details = COALESCE(EXCLUDED.menu_details, wedding_settings.menu_details),
//         is_photos_active = COALESCE(EXCLUDED.is_photos_active, wedding_settings.is_photos_active),
//         photos_expires_at = COALESCE(EXCLUDED.photos_expires_at, wedding_settings.photos_expires_at),
//         gallery_status = COALESCE(EXCLUDED.gallery_status, wedding_settings.gallery_status),
//         archive_expires_at = COALESCE(EXCLUDED.archive_expires_at, wedding_settings.archive_expires_at);
//     `;

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  try {
    const body = await request.json();
    const sql = neon(process.env.DATABASE_URL!);

    // Verificăm dacă orderId-ul trimis aparține într-adevăr userului logat
    const check = await sql`SELECT id FROM orders WHERE id = ${body.orderId} AND email = ${session.email} LIMIT 1`;
    if (check.length === 0) return NextResponse.json({ error: "Acțiune nepermisă" }, { status: 403 });

    await sql`
      INSERT INTO wedding_settings (
        order_id, custom_slug, bride_name, groom_name, nasi_names, parents_names, 
        wedding_date, wedding_time, location_name, google_maps_url, waze_url,
        religious_date, religious_time, religious_location, religious_waze, 
        is_religious_active, is_menu_active, is_accommodation_active, is_transport_active,
        contact_phone_bride, contact_phone_groom, our_story, menu_details, 
        is_photos_active, gallery_status
      )
      VALUES (
        ${body.orderId}, ${body.customSlug || null}, ${body.brideName || null}, ${body.groomName || null}, ${body.nasiNames || null}, ${body.parentsNames || null},
        ${body.weddingDate || null}, ${body.weddingTime || null}, ${body.locationName || null}, ${body.googleMapsUrl || null}, ${body.wazeUrl || null},
        ${body.religiousDate || null}, ${body.religiousTime || null}, ${body.religiousLocation || null}, ${body.religiousWaze || null},
        ${body.isReligiousActive ?? false}, ${body.isMenuActive ?? false}, ${body.isAccommodationActive ?? false}, ${body.isTransportActive ?? false},
        ${body.contactPhoneBride || null}, ${body.contactPhoneGroom || null}, ${body.ourStory || null}, ${JSON.stringify(body.menu_details) || null}, 
        ${body.isPhotosActive ?? false}, ${body.gallery_status || 'inactive'}
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
        is_accommodation_active = EXCLUDED.is_accommodation_active,
        is_transport_active = EXCLUDED.is_transport_active,
        contact_phone_bride = EXCLUDED.contact_phone_bride,
        contact_phone_groom = EXCLUDED.contact_phone_groom,
        our_story = EXCLUDED.our_story,
        is_menu_active = EXCLUDED.is_menu_active,
        menu_details = EXCLUDED.menu_details,
        is_photos_active = EXCLUDED.is_photos_active,
        gallery_status = EXCLUDED.gallery_status;
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Personalize Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}