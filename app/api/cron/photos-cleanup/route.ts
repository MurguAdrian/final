import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

// Configurăm Cloudinary pentru a putea șterge fișierele fizice
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Găsim albumele activate acum mai bine de 30 de zile și care nu sunt deja "deleted"
    const expiredAlbums = await sql`
      SELECT order_id 
      FROM wedding_settings 
      WHERE photos_activated_at < NOW() - INTERVAL '30 days'
      AND gallery_status != 'deleted'
    `;

    for (const album of expiredAlbums) {
      const orderId = album.order_id;
      
      // 1. Ștergem pozele fizic din Cloudinary pentru a nu consuma spațiul inutil
      try {
        await cloudinary.api.delete_resources_by_tag(`order_${orderId}`);
        console.log(`☁️ Poze șterse din Cloudinary (30 zile) pentru orderId: ${orderId}`);
      } catch (e) {
        console.error(`Eroare la ștergerea din Cloudinary pt orderId ${orderId}:`, e);
      }

      // 2. Ștergem pozele din baza de date
      await sql`DELETE FROM wedding_photos WHERE order_id = ${orderId}`;

      // 3. Modificăm statusul galeriei pentru a o bloca definitiv și a permite un "New Album"
      await sql`
        UPDATE wedding_settings 
        SET gallery_status = 'deleted',
            photos_expires_at = NULL,
            photo_consent_accepted = false,
            is_unlock_paid = false
        WHERE order_id = ${orderId}
      `;
      console.log(`✅ Albumul ${orderId} a fost șters definitiv (au trecut 30 zile).`);
    }

    return NextResponse.json({ 
        success: true, 
        deletedAlbums: expiredAlbums.length 
    });
  } catch (error: any) {
    console.error("Eroare Cron Photos Cleanup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}