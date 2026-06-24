import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă Geometric Sage — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design geometric auriu cu monogramă frunze și pete acuarelă sage. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-nunta-casa',
    title: 'Invitație Nuntă Geometric Sage — VibeInvite',
    description: 'Design geometric auriu cu monogramă și pete acuarelă verde sage. Personalizabil, descarcabil instant PDF + JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-invitatie-casa.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă Geometric Sage' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-nunta-casa' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
