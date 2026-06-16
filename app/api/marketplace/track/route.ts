// app/api/marketplace/track/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { slug, type } = await req.json();
    if (!slug || !type) return NextResponse.json({ ok: false }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL!);
    if (type === 'view') {
      await sql`UPDATE mkt_providers SET views_count = views_count + 1 WHERE slug = ${slug}`;
    } else if (type === 'call') {
      await sql`UPDATE mkt_providers SET calls_count = calls_count + 1 WHERE slug = ${slug}`;
    } else if (type === 'social') {
      await sql`UPDATE mkt_providers SET socials_count = socials_count + 1 WHERE slug = ${slug}`;
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}