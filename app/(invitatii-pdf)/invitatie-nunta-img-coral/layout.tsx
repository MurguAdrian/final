import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă Botanică Mov-Coral — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design botanic cu flori mov, coral și auriu, monogramă hexagonală. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://www.vibeinvite.ro/invitatie-nunta-img-coral',
    title: 'Invitație Nuntă Botanică Mov-Coral — VibeInvite',
    description: 'Design botanic premium cu coroană florală mov, coral și auriu. Personalizabil, descarcabil instant PDF + JPG. 30 lei, plată unică.',
    images: [{ url: 'https://www.vibeinvite.ro/og-invitatie-coral.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă Botanică Mov-Coral' }],
  },
  alternates: { canonical: 'https://www.vibeinvite.ro/invitatie-nunta-img-coral' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
