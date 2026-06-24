import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { buildHTML as buildHTML_auriu } from '@/app/(invitatii-pdf)/invitatie-nunta-pdf-auriu/buildHTML'
import { buildHTML_vara } from '@/app/(invitatii-pdf)/invitatie-nunta-de-vara/buildHTML'
import { buildHTML_ocean } from '@/app/(invitatii-pdf)/invitatii-nunta-ocean/buildHTML'
import { buildHTML_simpla } from '@/app/(invitatii-pdf)/invitatie-nunta-pdf-simpla/buildHTML'
import { buildHTML_coral } from '@/app/(invitatii-pdf)/invitatie-nunta-img-coral/buildHTML'
// import { buildHTML as buildHTML_royal } from '@/app/(invitatii-pdf)/invitatie-nunta-pdf-royal/buildHTML'

export const maxDuration = 60

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-05-27.dahlia' as any,
})

const REGISTRY: Record<string, (fields: Record<string, string>) => string> = {
  'invitatie-nunta-pdf-auriu': buildHTML_auriu,
  'invitatie-nunta-de-vara': buildHTML_vara,
    'invitatii-nunta-ocean': buildHTML_ocean,
  'invitatie-nunta-pdf-simpla': buildHTML_simpla,
  'invitatie-nunta-img-coral': buildHTML_coral,


  // 'invitatie-nunta-pdf-royal': buildHTML_royal,
}

function toBase64(str: string): string {
  return Buffer.from(str, 'utf-8').toString('base64')
}

async function renderPDF(html: string): Promise<Uint8Array> {
  const res = await fetch('https://api.doppio.sh/v1/render/pdf/direct', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DOPPIO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page: {
        setContent: {
          html: toBase64(html),
          options: { waitUntil: ['networkidle0'] },
        },
        pdf: {
          printBackground: true,
          width: '794px',
          height: '1123px',
          margin: { top: '0', right: '0', bottom: '0', left: '0' },
        },
      },
    }),
  })
  if (!res.ok) throw new Error(`Doppio PDF error: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

async function renderJPG(html: string): Promise<Uint8Array> {
  const res = await fetch('https://api.doppio.sh/v1/render/screenshot/direct', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DOPPIO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      launch: {
        defaultViewport: { width: 794, height: 1123 },
      },
      page: {
        setContent: {
          html: toBase64(html),
          options: { waitUntil: ['networkidle0'] },
        },
        screenshot: {
          type: 'jpeg',
          quality: 95,
          fullPage: false,
        },
      },
    }),
  })
  if (!res.ok) throw new Error(`Doppio JPG error: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  const format = searchParams.get('format') as 'pdf' | 'jpg' | null

  if (!sessionId) return new NextResponse('Session ID lipsă', { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return new NextResponse('Plata nu a fost confirmată', { status: 402 })
    if (session.metadata?.paymentType !== 'invitatie_pdf') return new NextResponse('Tip plată invalid', { status: 400 })

    const fields = JSON.parse(session.metadata?.fields || '{}') as Record<string, string>
    const template = session.metadata?.template || ''
    const filename = `invitatie-${fields.bride || fields.babyName || 'vibeinvite'}`

    if (format === 'pdf' || format === 'jpg') {
      const buildHTML = REGISTRY[template]
      if (!buildHTML) return new NextResponse(`Template necunoscut: ${template}`, { status: 400 })

      const html = buildHTML(fields)
      const bytes = format === 'pdf' ? await renderPDF(html) : await renderJPG(html)

      return new Response(bytes.buffer as ArrayBuffer, {
        headers: {
          'Content-Type': format === 'pdf' ? 'application/pdf' : 'image/jpeg',
          'Content-Disposition': `attachment; filename="${filename}.${format}"`,
          'Cache-Control': 'no-store',
        },
      })
    }

    return NextResponse.redirect(
      `${origin}/invitatii-pdf-success?session_id=${sessionId}`,
      { status: 302 }
    )

  } catch (err: any) {
    console.error('Download error:', err)
    return new NextResponse(`Eroare: ${err.message}`, { status: 500 })
  }
}