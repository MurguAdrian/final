


import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tipuri MIME acceptate — DOAR imagini, fără video
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/gif',
  'image/avif',
];

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const orderId = formData.get("orderId");

    if (!file || !orderId) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    // ── VALIDARE TIP FIȘIER ──
    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { error: "Doar fotografii sunt acceptate (JPG, PNG, WEBP, HEIC). Videoclipurile nu sunt permise." },
        { status: 415 }
      );
    }

    // ── VALIDARE EXTENSIE (dublă verificare) ──
    const fileName = file.name.toLowerCase();
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.wmv', '.flv', '.webm', '.m4v', '.3gp', '.ogv'];
    if (videoExtensions.some(ext => fileName.endsWith(ext))) {
      return NextResponse.json(
        { error: "Videoclipurile nu sunt acceptate. Încarcă doar fotografii." },
        { status: 415 }
      );
    }

    // ── VALIDARE DIMENSIUNE ──
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `Fotografia depășește limita de ${MAX_FILE_SIZE_MB}MB.` },
        { status: 413 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);
    const oid = parseInt(orderId as string);

    // ── VERIFICARE STATUS GALERIE ──
    const settings = await sql`
      SELECT gallery_status, photos_expires_at
      FROM wedding_settings
      WHERE order_id = ${oid}
      LIMIT 1
    `;

    if (settings.length === 0) {
      return NextResponse.json({ error: "Evenimentul nu a fost găsit." }, { status: 404 });
    }

    const { gallery_status, photos_expires_at } = settings[0];

    // if (gallery_status !== 'active') {
    //   return NextResponse.json(
    //     { error: "Galeria foto nu este activă momentan. Revino mai târziu." },
    //     { status: 403 }
    //   );
    // }

    // if (!photos_expires_at || new Date() > new Date(photos_expires_at)) {
    //   return NextResponse.json(
    //     { error: "Perioada de încărcare a expirat." },
    //     { status: 403 }
    //   );
    // }

if (gallery_status !== 'active') {
  return NextResponse.json(
    { error: "Galeria foto nu este activă momentan. Revino mai târziu." },
    { status: 403 }
  );
}
// Am șt


    // ── UPLOAD CLOUDINARY ──
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `vibe_invite/order_${oid}`,
          tags: [`order_${oid}`],
          resource_type: "image", // forțăm image — Cloudinary va respinge video
          allowed_formats: ["jpg", "jpeg", "png", "webp", "heic", "heif", "gif", "avif"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    // ── SALVARE ÎN DB ──
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