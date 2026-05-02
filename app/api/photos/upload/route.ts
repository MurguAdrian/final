import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const orderId = formData.get("orderId");

    if (!file || !orderId) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    const oid = parseInt(orderId as string);

    // 1. VERIFICARE STATUS: Doar dacă e 'active' și nu a expirat timpul
    const settings = await sql`
      SELECT gallery_status, photos_expires_at 
      FROM wedding_settings 
      WHERE order_id = ${oid} LIMIT 1
    `;

    if (settings.length === 0) {
      return NextResponse.json({ error: "Evenimentul nu a fost găsit." }, { status: 404 });
    }

    const { gallery_status, photos_expires_at } = settings[0];

    if (gallery_status !== 'active') {
      return NextResponse.json({ error: "Modulul foto nu este activ." }, { status: 403 });
    }

    if (photos_expires_at && new Date() > new Date(photos_expires_at)) {
      return NextResponse.json({ error: "Timpul de încărcare a expirat." }, { status: 403 });
    }

    // 2. PROCESARE UPLOAD
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `vibe_invite/order_${oid}`,
          tags: [`order_${oid}`],
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    // 3. SALVARE ÎN DB
    await sql`
      INSERT INTO wedding_photos (order_id, url, public_id)
      VALUES (${oid}, ${uploadResponse.secure_url}, ${uploadResponse.public_id})
    `;

    return NextResponse.json({ success: true, url: uploadResponse.secure_url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}