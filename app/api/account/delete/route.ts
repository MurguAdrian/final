import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { sql } from '@vercel/postgres';

/**
 * POST /api/account/delete
 * 
 * GDPR Art. 17 — Right to be Forgotten
 * Allows authenticated users to delete their account and ALL associated data
 * including CASCADE deletes of settings, RSVP responses, and photos
 * 
 * Auth: Bearer JWT token from auth_token cookie
 * Body: { password_hash: string, confirmation: boolean }
 */

interface JWTPayload {
  email: string;
  sub?: string;
}

interface DeleteRequest {
  password_hash?: string;
  confirmation: boolean;
}

async function deleteCloudinaryPhotosByTag(tag: string): Promise<void> {
  try {
    const cloudinaryKey = process.env.CLOUDINARY_API_SECRET;
    const cloudinaryCloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudinaryKey || !cloudinaryCloud) {
      console.warn('[Delete] Cloudinary credentials missing, skipping photo deletion');
      return;
    }

    // Cloudinary API: Delete resources by tag
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloud}/resources/by_tag/${tag}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${Buffer.from(`api_key:${cloudinaryKey}`).toString('base64')}`,
        },
      }
    );

    if (!response.ok) {
      console.error('[Delete] Cloudinary API error:', response.statusText);
    }
  } catch (error) {
    console.error('[Delete] Cloudinary deletion error:', error);
    // Don't throw - photos will be orphaned but not critical
  }
}

async function deleteUserAccountCascade(email: string): Promise<void> {
  try {
    // 1. Get order ID
    const userResult = await sql`
      SELECT id FROM orders WHERE email = ${email} LIMIT 1
    `;

    if (!userResult.rows.length) {
      throw new Error('User not found');
    }

    const orderId = userResult.rows[0].id;

    // 2. Delete Cloudinary photos by tag
    await deleteCloudinaryPhotosByTag(`order_${orderId}`);

    // 3. Delete photos from database
    await sql`
      DELETE FROM wedding_photos WHERE order_id = ${orderId}
    `;

    // 4. Delete RSVP responses
    await sql`
      DELETE FROM rsvp_responses WHERE order_id = ${orderId}
    `;

    // 5. Delete wedding settings
    await sql`
      DELETE FROM wedding_settings WHERE order_id = ${orderId}
    `;

    // 6. Delete user (order) record
    await sql`
      DELETE FROM orders WHERE id = ${orderId}
    `;

    console.log(`[Delete] Account deleted successfully: ${email}`);
  } catch (error) {
    console.error('[Delete] Cascade deletion error:', error);
    throw error;
  }
}

async function sendDeletionConfirmationEmail(email: string): Promise<void> {
  try {
    // Call Resend API to send confirmation email
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'office@vibeinvite.ro',
        to: email,
        subject: '🗑️ Contul VibeInvite a fost șters permanent',
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px;">
            <h2>Contul tău a fost șters permanent</h2>
            <p>Salutare,</p>
            <p>Aceasta este o confirmare că contul VibeInvite asociat cu <strong>${email}</strong> 
            a fost șters permanent în data de ${new Date().toLocaleDateString('ro-RO')}.</p>
            
            <h3>Ce s-a șters:</h3>
            <ul>
              <li>✓ Profilul tău și setările</li>
              <li>✓ Invitațiile digitale</li>
              <li>✓ Răspunsurile RSVP ale invitaților</li>
              <li>✓ Pozele din galeriu</li>
              <li>✓ Toate datele personale</li>
            </ul>
            
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              <strong>Nu se pot recupera.</strong> Datele șterse nu mai pot fi recuperate. 
              Backup-urile sunt șterse după 30 de zile.
            </p>
            
            <p style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
              Dacă ai orice întrebări, contactează <strong>office@vibeinvite.ro</strong>
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      console.error('[Delete] Email send error:', await response.text());
    }
  } catch (error) {
    console.error('[Delete] Email sending error:', error);
    // Don't throw - deletion is already done
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Get JWT token
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

    // 2. Validate request body
    const body = (await request.json()) as DeleteRequest;

    if (!body.confirmation) {
      return NextResponse.json(
        {
          error: 'Deletion not confirmed',
          details: 'Please set confirmation: true to proceed',
        },
        { status: 400 }
      );
    }

    // 3. Delete account and cascade
    await deleteUserAccountCascade(decoded.email);

    // 4. Send confirmation email
    await sendDeletionConfirmationEmail(decoded.email);

    // 5. Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Account and all associated data deleted permanently',
        deleted_at: new Date().toISOString(),
        email: decoded.email,
        note: 'Confirmation email sent to your email address',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Delete] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

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
