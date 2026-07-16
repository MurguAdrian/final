import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';

const CANONICAL_HOSTNAME = 'www.vibeinvite.ro';
const CANONICAL_PROTOCOL = 'https:';

const SKIP = new Set([
  // Pagini de bază, utilitare și fluxuri
  'servicii-nunta', 'auth', 'checkout', 'contact', 'cookies', 'dashboard',
  'despre', 'gdpr', 'invitatie', 'invitatii-digitale', 'invitatii-PDF', 'invitatii-pdf-success',
  'login', 'pilot', 'politica', 'preturi', 'public', 'setup-password',
  'success', 'termeni', 'api', '_next', 'favicon.ico', 'robots.txt', 'sitemap.xml',

  // Fotografi & Formații
  'fotograf-bacau-tr-visuals', 'fotograf-brasov-ireph-graphy', 'fotograf-bucuresti-razvan-ristea',
  'fotograf-craiova-fotoali', 'fotograf-ilfov-dgc-media-wedding', 'fotograf-miercurea-ciuc-david-foto-video',
  'fotograf-onesti-dragoi-george-adrian', 'fotograf-ploiesti-jo-photography', 'fotograf-targoviste-bianca-sfetcu',
  'formatie-bucuresti-iordanescu-orchestra','fotograf-bucuresti-raluca-storylens','foto-video-prahova-mia-frames',

  // Modele fizice/PDF (create recent)
  'invitatie-botez-baiat-astronaut', 'invitatie-botez-baieti-masina', 'invitatie-botez-baieti-pirat',
  'invitatie-botez-fete-baloane', 'invitatie-botez-fete-castel', 'invitatie-botez-fete-roz',
  'invitatie-nunta-casa', 'invitatie-nunta-de-vara', 'invitatie-nunta-img-coral',
  'invitatie-nunta-pdf-auriu', 'invitatie-nunta-pdf-simpla', 'invitatie-nunta-poza',
  'invitatie-nunta-rustic', 'invitatie-nunta-sub-stele', 'invitatii-nunta-ocean',

  // Modele Online / Digitale
  'invitatie-botez-online-baiat-astronaut', 'invitatie-botez-online-baiat-masinuta', 'invitatie-botez-online-baiat-steluta',
  'invitatie-botez-online-ursulet', 'invitatie-botez-online-fata-baloane', 'invitatie-botez-online-fata-fluture',
  'invitatie-online-aniversare-majorat-18-ani', 'invitatii-online-nunta-boho', 'invitatii-online-nunta-lux',
  'invitatii-online-nunta-minimal', 'invitatii-online-nunta-natura', 'invitatii-online-nunta-romantic',
  'invitatii-online-nunta-royal'
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
    } catch {
      // Fail-safe
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};