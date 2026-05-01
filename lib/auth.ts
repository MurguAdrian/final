import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'schimba-ma-intr-o-cheie-foarte-lunga');

export async function createSession(email: string, theme: string) {
  const token = await new SignJWT({ email, theme })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  cookies().set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 zi
    path: '/',
  });
}

export async function getSession() {
  const token = cookies().get('auth_token')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { email: string; theme: string };
  } catch (err) {
    return null;
  }
}