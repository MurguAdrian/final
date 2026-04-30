import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    
    // PASUL 1: Mutăm în ARHIVĂ nunțile la care le-au expirat cele 3/5 zile active
    // Le dăm 30 de zile de "grație"
    const toArchive = await sql`
      UPDATE wedding_settings 
      SET gallery_status = 'expired',
          archive_expires_at = NOW() + INTERVAL '30 days'
      WHERE photos_expires_at < NOW() 
        AND gallery_status = 'active'
      RETURNING order_id;
    `;

    // PASUL 2: Găsim nunțile cărora le-a expirat și ARHIVA de 30 de zile
    const toDelete = await sql`
      SELECT order_id FROM wedding_settings 
      WHERE gallery_status = 'expired' 
        AND archive_expires_at < NOW()
    `;

    // PASUL 3: Ștergem definitiv DOAR ce a trecut de cele 30 de zile
for (const wedding of toDelete) {
        // Ștergem pozele fizice din Cloudinary
        await cloudinary.api.delete_resources_by_tag(`order_${wedding.order_id}`);
        
        // IMPORTANT: Marcăm statusul ca 'deleted' și oprim galeria definitiv
        await sql`
          UPDATE wedding_settings 
          SET gallery_status = 'deleted', 
              is_photos_active = false 
          WHERE order_id = ${wedding.order_id}
        `;
        
        // Ștergem link-urile din baza de date
        await sql`DELETE FROM wedding_photos WHERE order_id = ${wedding.order_id}`;
    }

    return NextResponse.json({ 
        success: true, 
        mutatedToArchive: toArchive.length, 
        deletedForever: toDelete.length 
    });
}