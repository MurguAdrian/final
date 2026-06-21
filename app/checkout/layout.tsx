




// andre/app/checkout/layout.tsx
import type { Metadata } from 'next'
import { SITE_DOMAIN } from '../../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'Alege Tema Invitației Digitale | VibeInvite — Nunți & Botez',
  description:
    'Alege tema invitației tale digitale pentru nuntă sau botez. 6 teme premium pentru nunți și 6 teme dedicate botezului. Plată unică, acces permanent la dashboard, meniu QR și album foto colectiv.',
  metadataBase: new URL(SITE_DOMAIN),
  alternates: { canonical: `${SITE_DOMAIN}/checkout` },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Invitații Digitale Premium | VibeInvite',
    description: 'Teme digitale pentru nuntă și botez. Design premium, configurare rapidă, acces imediat după plată.',
    url: `${SITE_DOMAIN}/checkout`,
    siteName: 'VibeInvite',
    locale: 'ro_RO',
    type: 'website',
  },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}