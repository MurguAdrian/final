import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    
    // 1. Găsim comenzile care au expirat (cele care au trecut de data expires_at)
    const expiredAccounts = await sql`
      SELECT id, email FROM orders 
      WHERE expires_at < NOW()
    `;

    for (const account of expiredAccounts) {
        // 2. Ștergem folderul cu poze din Cloudinary pentru a elibera spațiul
        try {
            await cloudinary.api.delete_resources_by_tag(`order_${account.id}`);
            console.log(`Poze șterse pentru contul: ${account.email}`);
        } catch (e) {
            console.error("Eroare ștergere Cloudinary:", e);
        }
        
        // 3. Ștergem rândul din 'orders'
        // ATENȚIE: ON DELETE CASCADE va șterge automat wedding_settings, wedding_photos și rsvp_responses
        await sql`DELETE FROM orders WHERE id = ${account.id}`;
    }

    return NextResponse.json({ 
        success: true, 
        deletedAccounts: expiredAccounts.length 
    });
}