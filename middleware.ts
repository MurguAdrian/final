import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';

  const isScraper = /facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|Discordbot|iframely|preview/i.test(ua);

  if (isScraper) {
    return NextResponse.next();
  }

  // dacă ai altă logică de auth, o pui aici
  return NextResponse.next();
}

export const config = {
  matcher: ['/invitatie/:path*', '/api/og/:path*'],
};