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
    const orderId = formData.get("orderId") as string;

    if (!file || !orderId) return NextResponse.json({ error: "Lipsesc date" }, { status: 400 });

    // Verificăm să fie DOAR poze
    if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Doar imaginile sunt permise (fără video)" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `vibe_invite/order_${orderId}`,
          tags: [`order_${orderId}`, "wedding_photo"],
          resource_type: "image",
        },
        (error: any, result: any) => { // Am adăugat tipurile aici
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO wedding_photos (order_id, url, public_id)
      VALUES (${parseInt(orderId)}, ${uploadResponse.secure_url}, ${uploadResponse.public_id})
    `;

    return NextResponse.json({ success: true, url: uploadResponse.secure_url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}