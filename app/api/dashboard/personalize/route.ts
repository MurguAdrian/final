import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

const clean = (val: any) => (val === "" || val === undefined ? null : val);

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  try {
    const body = await request.json();
    const sql = neon(process.env.DATABASE_URL!);
    const oid = parseInt(body.orderId);

    const check = await sql`SELECT id FROM orders WHERE id = ${oid} AND email = ${session.email} LIMIT 1`;
    if (check.length === 0) return NextResponse.json({ error: "Interzis" }, { status: 403 });

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
        ${oid}, ${clean(body.customSlug)}, ${clean(body.brideName)}, ${clean(body.groomName)}, 
        ${clean(body.nasiNames)}, ${clean(body.parentsNames)}, ${clean(body.weddingDate)}, 
        ${clean(body.weddingTime)}, ${clean(body.locationName)}, ${clean(body.googleMapsUrl)}, 
        ${clean(body.wazeUrl)}, ${clean(body.religiousDate)}, ${clean(body.religiousTime)}, 
        ${clean(body.religiousLocation)}, ${clean(body.religiousWaze)},
        ${body.isReligiousActive ?? null}, ${body.isMenuActive ?? null}, 
        ${body.isAccommodationActive ?? null}, ${body.isTransportActive ?? null},
        ${clean(body.contactPhoneBride)}, ${clean(body.contactPhoneGroom)}, 
        ${clean(body.ourStory)}, ${body.menu_details ? JSON.stringify(body.menu_details) : null}, 
        ${body.isPhotosActive ?? null}, ${body.gallery_status || null}
      )
      ON CONFLICT (order_id) DO UPDATE SET
        custom_slug = COALESCE(EXCLUDED.custom_slug, wedding_settings.custom_slug),
        bride_name = COALESCE(EXCLUDED.bride_name, wedding_settings.bride_name),
        groom_name = COALESCE(EXCLUDED.groom_name, wedding_settings.groom_name),
        nasi_names = COALESCE(EXCLUDED.nasi_names, wedding_settings.nasi_names),
        parents_names = COALESCE(EXCLUDED.parents_names, wedding_settings.parents_names),
        wedding_date = COALESCE(EXCLUDED.wedding_date, wedding_settings.wedding_date),
        wedding_time = COALESCE(EXCLUDED.wedding_time, wedding_settings.wedding_time),
        location_name = COALESCE(EXCLUDED.location_name, wedding_settings.location_name),
        google_maps_url = COALESCE(EXCLUDED.google_maps_url, wedding_settings.google_maps_url),
        waze_url = COALESCE(EXCLUDED.waze_url, wedding_settings.waze_url),
        religious_date = COALESCE(EXCLUDED.religious_date, wedding_settings.religious_date),
        religious_time = COALESCE(EXCLUDED.religious_time, wedding_settings.religious_time),
        religious_location = COALESCE(EXCLUDED.religious_location, wedding_settings.religious_location),
        religious_waze = COALESCE(EXCLUDED.religious_waze, wedding_settings.religious_waze),
        is_religious_active = COALESCE(EXCLUDED.is_religious_active, wedding_settings.is_religious_active),
        is_menu_active = COALESCE(EXCLUDED.is_menu_active, wedding_settings.is_menu_active),
        is_accommodation_active = COALESCE(EXCLUDED.is_accommodation_active, wedding_settings.is_accommodation_active),
        is_transport_active = COALESCE(EXCLUDED.is_transport_active, wedding_settings.is_transport_active),
        contact_phone_bride = COALESCE(EXCLUDED.contact_phone_bride, wedding_settings.contact_phone_bride),
        contact_phone_groom = COALESCE(EXCLUDED.contact_phone_groom, wedding_settings.contact_phone_groom),
        our_story = COALESCE(EXCLUDED.our_story, wedding_settings.our_story),
        menu_details = COALESCE(EXCLUDED.menu_details, wedding_settings.menu_details),
        is_photos_active = COALESCE(EXCLUDED.is_photos_active, wedding_settings.is_photos_active),
        gallery_status = COALESCE(EXCLUDED.gallery_status, wedding_settings.gallery_status);
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Personalize Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}