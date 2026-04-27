import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, guestName, isComing, adultsCount, kidsCount, dietaryPreferences } = body;

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO rsvp_responses (
        order_id, 
        guest_name, 
        is_coming, 
        adults_count, 
        kids_count, 
        dietary_preferences
      ) VALUES (
        ${orderId}, 
        ${guestName}, 
        ${isComing}, 
        ${adultsCount}, 
        ${kidsCount}, 
        ${dietaryPreferences}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Eroare RSVP:", error);
    return NextResponse.json({ error: "Eroare la trimiterea răspunsului" }, { status: 500 });
  }
}