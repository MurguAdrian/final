import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';

const CANONICAL_HOSTNAME = 'www.vibeinvite.ro';
const CANONICAL_PROTOCOL = 'https:';

const SKIP = new Set([
  'servicii-nunta','auth','checkout','contact','cookies','dashboard',
  'despre','gdpr','invitatie','invitatii-digitale','invitatii-PDF',
  'login','pilot','politica','preturi','public','setup-password',
  'success','termeni','api','_next','favicon.ico','robots.txt','sitemap.xml','fotograf-ploiesti-jo-photography','fotograf-targoviste-bianca-sfetcu','fotograf-craiova-fotoali','fotograf-bucuresti-razvan-ristea','fotograf-ilfov-dgc-media-wedding',
]);

export async function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const host = url.hostname;
  const protocol = url.protocol;

  if (host !== CANONICAL_HOSTNAME || protocol !== CANONICAL_PROTOCOL) {
    url.hostname = CANONICAL_HOSTNAME;
    url.protocol = CANONICAL_PROTOCOL;
    return NextResponse.redirect(url, 308);
  }

  const segment = request.nextUrl.pathname.split('/')[1];
  if (
    segment &&
    !SKIP.has(segment) &&
    !segment.startsWith('_') &&
    !segment.includes('.') &&
    segment.length <= 30
  ) {
    try {
      const sql = neon(process.env.DATABASE_URL!);
      const rows = await sql`SELECT slug FROM mkt_providers WHERE short_slug = ${segment} AND is_active = true LIMIT 1`;
      if (rows.length > 0) {
        return NextResponse.redirect(new URL(`/${rows[0].slug}`, request.url), 301);
      }
    } catch {}
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};