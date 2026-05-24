import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0A0803',
        }}
      >
        <div style={{
          fontSize: 80, color: '#D4AF37', display: 'flex',
        }}>
          TEST OK
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}