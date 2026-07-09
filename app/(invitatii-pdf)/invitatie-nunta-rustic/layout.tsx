import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă Rustic Simfonic — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design rustic cu hârtie kraft, siluetă vioară și portativ muzical. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-nunta-rustic',
    title: 'Invitație Nuntă Rustic Simfonic — VibeInvite',
    description: 'Design rustic simfonic cu textură kraft, vioară minimalistă și portativ muzical. Personalizabil, descarcabil instant PDF + JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-invitatie-rustic.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă Rustic Simfonic' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-nunta-rustic' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
