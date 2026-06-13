import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitații Botez Online | Demo Stil Ursulet Bej — VibeInvite',
  description: 'Invitație digitală de botez unisex — ursulet bej acuarelă, balonaș bleu, fundă. RSVP instant, GPS Waze și Google Maps.',
  keywords: ['invitatii botez online', 'invitatie botez ursulet', 'invitatie botez baiat', 'invitatie botez fetita', 'invitatie botez bej', 'invitatie botez unisex', 'vibeinvite'],
  alternates: {
    canonical: 'https://www.vibeinvite.ro/invitatie-botez-online-ursulet',
  },
  openGraph: {
    title: 'Invitații Botez Online — Ursulet Bej | VibeInvite',
    description: 'Invitație digitală de botez cu ursulet acuarelă, bej și bleu. RSVP, GPS instant.',
    url: 'https://www.vibeinvite.ro/invitatie-botez-online-ursulet',
    siteName: 'VibeInvite',
    locale: 'ro_RO',
    type: 'website',
    images: [
    {
        url: 'https://www.vibeinvite.ro/og-main.jpg', // Imaginea ta generală din public
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invitații Botez Online — Ursulet Bej | VibeInvite',
    description: 'Invitație digitală de botez cu ursulet acuarelă, bej și bleu. RSVP, GPS instant.',
    images: ['https://www.vibeinvite.ro/og-botez-ursulet.jpg'],
  },
}

export default function UrsuletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}