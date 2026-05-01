import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Destructurăm tot, inclusiv needsTransport
    const { 
      orderId, guestName, isComing, partnerName, 
      plusOne, adultsCount, kidsCount, dietaryPreferences, 
      needsAccommodation, needsTransport, otherMentions 
    } = body;

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO rsvp_responses (
        order_id, guest_name, is_coming, partner_name, 
        plus_one, adults_count, kids_count, 
        dietary_preferences, needs_accommodation, needs_transport, other_mentions
      ) VALUES (
        ${parseInt(orderId)}, 
        ${guestName}, 
        ${isComing}, 
        ${partnerName || null}, 
        ${plusOne || false}, 
        ${parseInt(adultsCount) || 0}, 
        ${parseInt(kidsCount) || 0}, 
        ${dietaryPreferences || null}, 
        ${needsAccommodation || false}, 
        ${needsTransport || false}, 
        ${otherMentions || null}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Eroare RSVP API:", error);
    return NextResponse.json({ error: "Eroare la salvarea răspunsului: " + error.message }, { status: 500 });
  }
}