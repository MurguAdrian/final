import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Găsim conturile expirate (12 luni de la creare)
    const expiredAccounts = await sql`
      SELECT id, email FROM orders
      WHERE expires_at < NOW()
    `;

    for (const account of expiredAccounts) {
      // 1. Ștergem pozele din Cloudinary
      try {
        await cloudinary.api.delete_resources_by_tag(`order_${account.id}`);
        console.log(`☁️ Cloudinary curat pentru contul: ${account.email}`);
      } catch (e) {
        console.error(`Eroare Cloudinary pentru ${account.email}:`, e);
      }

      // 2. Ștergem din orders — CASCADE șterge automat
      // wedding_settings, wedding_photos, rsvp_responses
      await sql`DELETE FROM orders WHERE id = ${account.id}`;
      console.log(`✅ Cont șters: ${account.email}`);
    }

    return NextResponse.json({
      success: true,
      deletedAccounts: expiredAccounts.length,
    });
  } catch (error: any) {
    console.error("Eroare account-cleanup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}