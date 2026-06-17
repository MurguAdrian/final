// app/[shortSlug]/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { shortSlug: string } }
) {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT slug FROM mkt_providers WHERE short_slug = ${params.shortSlug} AND is_active = true LIMIT 1`;
  
  if (rows.length === 0) {
    return NextResponse.redirect(new URL('/servicii-nunta', request.url));
  }
  
  return NextResponse.redirect(new URL(`/${rows[0].slug}`, request.url), 301);
}