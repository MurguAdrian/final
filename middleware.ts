// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const CANONICAL_HOSTNAME = 'www.vibeinvite.ro';
// const CANONICAL_PROTOCOL = 'https:';

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   const host = request.nextUrl.hostname;
//   const protocol = request.nextUrl.protocol;

//   if (host !== CANONICAL_HOSTNAME || protocol !== CANONICAL_PROTOCOL) {
//     url.hostname = CANONICAL_HOSTNAME;
//     url.protocol = CANONICAL_PROTOCOL;
//     return NextResponse.redirect(url, 308);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/:path*'],
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOSTNAME = 'www.vibeinvite.ro';
const CANONICAL_PROTOCOL = 'https:';

export function middleware(request: NextRequest) {
  // ❗ IMPORTANT: NU rula în development
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};