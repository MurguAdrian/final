import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

// Cron-ul de photos-cleanup cu 30 zile a fost eliminat conform noii logici.
// Pozele rămân în Cloudinary cât există contul (12 luni).
// Ștergerea pozelor se face exclusiv în account-cleanup când expiră orders.expires_at.
// Acest endpoint returnează 200 pentru a nu rupe vercel.json dacă e configurat acolo.

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    message: "Photos cleanup dezactivat. Pozele sunt gestionate de account-cleanup la expirarea contului (12 luni).",
  });
}