import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      orderId, 
      guestName, 
      isComing, 
      partnerName, 
      hasKids, 
      kidsCount, 
      dietaryPreferences, 
      needsAccommodation 
    } = body;

    const sql = neon(process.env.DATABASE_URL!);

    // Inserăm datele extinse
    await sql`
      INSERT INTO rsvp_responses (
        order_id, 
        guest_name, 
        is_coming, 
        partner_name, 
        has_kids, 
        kids_count, 
        dietary_preferences, 
        needs_accommodation
      ) VALUES (
        ${orderId}, 
        ${guestName}, 
        ${isComing}, 
        ${partnerName}, 
        ${hasKids}, 
        ${kidsCount}, 
        ${dietaryPreferences}, 
        ${needsAccommodation}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Eroare RSVP API:", error);
    return NextResponse.json({ error: "Eroare la trimiterea răspunsului" }, { status: 500 });
  }
}