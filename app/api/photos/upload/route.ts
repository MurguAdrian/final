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
    const slug = formData.get("slug");

    if (!file || !orderId) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    // Convertim fișierul pentru Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload către Cloudinary într-un folder specific nunții
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `vibe_invite/order_${orderId}`, // Folder per nuntă
          tags: [`order_${orderId}`],             // Tag pentru filtrare ușoară
          resource_type: "image",                // DOAR poze (fără video)
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    // Salvăm link-ul pozei în baza noastră de date (Neon)
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO wedding_photos (order_id, url, public_id)
      VALUES (${parseInt(orderId as string)}, ${uploadResponse.secure_url}, ${uploadResponse.public_id})
    `;

    return NextResponse.json({ success: true, url: uploadResponse.secure_url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}