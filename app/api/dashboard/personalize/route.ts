import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  try {
    const body = await request.json();
    const sql = neon(process.env.DATABASE_URL!);

    if (!body.orderId) return NextResponse.json({ error: "Lipsește ID-ul comenzii" }, { status: 400 });

    // 1. Securitate: Verificăm dacă orderId aparține email-ului din sesiune
    const check = await sql`SELECT id FROM orders WHERE id = ${parseInt(body.orderId)} AND email = ${session.email} LIMIT 1`;
    if (check.length === 0) return NextResponse.json({ error: "Acțiune nepermisă. ID-ul nu aparține acestui cont." }, { status: 403 });

    // 2. Verificare slug unic (Să nu fure nimeni link-ul altuia)
    if (body.customSlug) {
      const slugCheck = await sql`
        SELECT id FROM wedding_settings 
        WHERE custom_slug = ${body.customSlug} AND order_id != ${parseInt(body.orderId)} 
        LIMIT 1
      `;
      if (slugCheck.length > 0) {
        return NextResponse.json({ error: "Acest link personalizat este deja folosit de alt cuplu. Alege altul!" }, { status: 400 });
      }
    }

    // 3. UPSERT
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
        ${parseInt(body.orderId)}, 
        ${body.customSlug || null}, 
        ${body.brideName || null}, 
        ${body.groomName || null}, 
        ${body.nasiNames || null}, 
        ${body.parentsNames || null},
        ${body.weddingDate || null}, 
        ${body.weddingTime || null}, 
        ${body.locationName || null}, 
        ${body.googleMapsUrl || null}, 
        ${body.wazeUrl || null},
        ${body.religiousDate || null}, 
        ${body.religiousTime || null}, 
        ${body.religiousLocation || null}, 
        ${body.religiousWaze || null},
        ${body.isReligiousActive ?? false}, 
        ${body.isMenuActive ?? false}, 
        ${body.isAccommodationActive ?? false}, 
        ${body.isTransportActive ?? false},
        ${body.contactPhoneBride || null}, 
        ${body.contactPhoneGroom || null}, 
        ${body.ourStory || null}, 
        ${JSON.stringify(body.menu_details) || null}, 
        ${body.isPhotosActive ?? false}, 
        ${body.gallery_status || 'inactive'}
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
        is_photos_active = EXCLUDED.is_photos_active,
        gallery_status = EXCLUDED.gallery_status;
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Personalize Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}