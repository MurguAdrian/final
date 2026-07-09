import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă PDF Auriu — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design auriu elegant, personalizabil instant. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://www.vibeinvite.ro/invitatie-nunta-pdf-auriu',
    title: 'Invitație Nuntă PDF Auriu — VibeInvite',
    description: 'Design auriu elegant pentru nunta ta. Personalizabil, descarcabil instant în PDF și JPG. 30 lei, plată unică.',
    images: [{ url: 'https://www.vibeinvite.ro/og-invitatie-auriu.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă PDF Auriu' }],
  },
  alternates: { canonical: 'https://www.vibeinvite.ro/invitatie-nunta-pdf-auriu' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
