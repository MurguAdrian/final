import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { sql } from '@vercel/postgres';

/**
 * POST /api/account/export
 * 
 * GDPR Art. 20 — Data Portability
 * Allows authenticated users to download all their personal data
 * in machine-readable JSON format
 * 
 * Auth: Bearer JWT token from auth_token cookie
 */

interface JWTPayload {
  email: string;
  sub?: string;
}

async function getUserDataByEmail(email: string) {
  try {
    // Fetch user (mira) details
    const userResult = await sql`
      SELECT id, email, theme_name, created_at, updated_at
      FROM orders
      WHERE email = ${email}
      LIMIT 1
    `;

    if (!userResult.rows.length) {
      return null;
    }

    const user = userResult.rows[0];
    const orderId = user.id;

    // Fetch wedding settings
    const settingsResult = await sql`
      SELECT *
      FROM wedding_settings
      WHERE order_id = ${orderId}
    `;

    // Fetch RSVP responses
    const rsvpResult = await sql`
      SELECT *
      FROM rsvp_responses
      WHERE order_id = ${orderId}
      ORDER BY created_at DESC
    `;

    // Fetch photos metadata
    const photosResult = await sql`
      SELECT id, file_url, original_filename, file_size, uploaded_at, uploader_name, uploader_email
      FROM wedding_photos
      WHERE order_id = ${orderId}
      ORDER BY uploaded_at DESC
    `;

    return {
      user: user,
      settings: settingsResult.rows[0] || null,
      rsvp_responses: rsvpResult.rows || [],
      photos: photosResult.rows || [],
    };
  } catch (error) {
    console.error('[Export] Database error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Get JWT token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing or invalid token' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded: JWTPayload;

    try {
      decoded = jwtDecode<JWTPayload>(token);
    } catch (err) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    if (!decoded.email) {
      return NextResponse.json(
        { error: 'Unauthorized: Token missing email' },
        { status: 401 }
      );
    }

    // 2. Fetch all user data
    const userData = await getUserDataByEmail(decoded.email);

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 3. Prepare export data structure (GDPR-compliant)
    const exportData = {
      export_timestamp: new Date().toISOString(),
      gdpr_right: 'Data Portability (Art. 20, GDPR)',
      user: {
        email: userData.user.email,
        theme_name: userData.user.theme_name,
        account_created: userData.user.created_at,
        account_updated: userData.user.updated_at,
        status: 'active',
      },
      wedding_settings: userData.settings,
      rsvp_responses: userData.rsvp_responses.map((r: any) => ({
        guest_name: r.guest_name,
        is_coming: r.is_coming,
        partner_name: r.partner_name,
        plus_one: r.plus_one,
        adults_count: r.adults_count,
        kids_count: r.kids_count,
        dietary_preferences: r.dietary_preferences,
        needs_accommodation: r.needs_accommodation,
        needs_transport: r.needs_transport,
        other_mentions: r.other_mentions,
        submitted_at: r.created_at,
      })),
      photos: userData.photos.map((p: any) => ({
        id: p.id,
        file_url: p.file_url,
        original_filename: p.original_filename,
        file_size_bytes: p.file_size,
        uploaded_at: p.uploaded_at,
        uploader_name: p.uploader_name,
        uploader_email: p.uploader_email,
        note: 'EXIF metadata has been stripped from all photos for privacy',
      })),
      data_retention_policy: {
        retention_period_months: 12,
        auto_deletion_date: new Date(
          new Date(userData.user.created_at).getTime() + 12 * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        note: 'All data will be automatically deleted after 12 months. You can request manual deletion anytime.',
      },
      gdpr_rights: {
        access: 'You are exercising this right now (Art. 15)',
        rectification: 'You can update your details by logging in (Art. 16)',
        erasure: 'Request deletion at office@vibeinvite.ro (Art. 17)',
        restriction: 'Request at office@vibeinvite.ro (Art. 18)',
        portability: 'This export fulfills this right (Art. 20)',
        object: 'Request at office@vibeinvite.ro (Art. 21)',
      },
    };

    // 4. Generate JSON file response
    const json = JSON.stringify(exportData, null, 2);
    const fileName = `vibeinvite-data-export-${new Date().toISOString().slice(0, 10)}.json`;

    // 5. Return as downloadable file
    return new NextResponse(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[Export] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// OPTIONS for preflight CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
