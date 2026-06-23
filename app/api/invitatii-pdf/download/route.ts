import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const maxDuration = 60

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia' as any,
})

async function renderFile(html: string, format: 'pdf' | 'jpg'): Promise<Uint8Array> {
  const chromium = await import('@sparticuz/chromium')
  const puppeteer = await import('puppeteer-core')
  const executablePath = await chromium.default.executablePath()
  const browser = await puppeteer.default.launch({
    args: chromium.default.args,
    defaultViewport: { width: 794, height: 1123 },
    executablePath,
    headless: true as any,
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 794, height: 1123 })
  await page.setContent(html, { waitUntil: 'load' })
  await new Promise(r => setTimeout(r, 2000))

  let bytes: Uint8Array
  if (format === 'jpg') {
    const shot = await page.screenshot({
      type: 'jpeg', quality: 95, encoding: 'binary', fullPage: false,
      clip: { x: 0, y: 0, width: 794, height: 1123 },
    }) as Buffer
    bytes = new Uint8Array(shot)
  } else {
    const pdf = await page.pdf({
      width: '794px', height: '1123px', printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })
    bytes = new Uint8Array(pdf.buffer as ArrayBuffer)
  }
  await browser.close()
  return bytes
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
      let buildHTML: (fields: Record<string, string>) => string
      try {
        const mod = await import(`@/app/(invitatii-pdf)/${template}/buildHTML`)
        buildHTML = mod.buildHTML
      } catch {
        return new NextResponse(`Template necunoscut: ${template}`, { status: 400 })
      }

      const html = buildHTML(fields)
      const bytes = await renderFile(html, format)
      return new Response(bytes.buffer as ArrayBuffer, {
        headers: {
          'Content-Type': format === 'pdf' ? 'application/pdf' : 'image/jpeg',
          'Content-Disposition': `attachment; filename="${filename}.${format}"`,
        },
      })
    }

    return NextResponse.redirect(
      `${origin}/invitatii-pdf-success?session_id=${sessionId}`,
      { status: 302 }
    )

  } catch (err: any) {
    console.error('Download error:', err)
    return new NextResponse('Eroare la generare. Te rugăm să încerci din nou.', { status: 500 })
  }
}