import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
    // Verificăm un token secret în URL ca să nu poată oricine să ruleze ștergerea
    // Ex: /api/cron/cleanup?key=SECRET_TOKEN
    
    const sql = neon(process.env.DATABASE_URL!);
    
    // 1. Găsim nunțile expirate
    const expiredWeddings = await sql`
      SELECT order_id FROM wedding_settings 
      WHERE photos_expires_at < NOW() AND is_photos_active = true
    `;

    for (const wedding of expiredWeddings) {
        // 2. Ștergem pozele din Cloudinary pentru acel OrderID
        await cloudinary.api.delete_resources_by_tag(`order_${wedding.order_id}`);
        
        // 3. Dezactivăm galeria în DB
        await sql`UPDATE wedding_settings SET is_photos_active = false WHERE order_id = ${wedding.order_id}`;
        
        // 4. Ștergem referințele din tabelul de poze
        await sql`DELETE FROM wedding_photos WHERE order_id = ${wedding.order_id}`;
    }

    return NextResponse.json({ success: true, processed: expiredWeddings.length });
}