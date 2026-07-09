import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă Simplă Elegantă — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design simplu și elegant pe hârtie texturată cu sigiliu ceară albastru. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://www.vibeinvite.ro/invitatie-nunta-pdf-simpla',
    title: 'Invitație Nuntă Simplă Elegantă — VibeInvite',
    description: 'Design minimalist pe hârtie texturată cu sigiliu ceară albastru. Personalizabil, descarcabil instant în PDF și JPG. 30 lei, plată unică.',
    images: [{ url: 'https://www.vibeinvite.ro/og-invitatie-simpla.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă Simplă Elegantă' }],
  },
  alternates: { canonical: 'https://www.vibeinvite.ro/invitatie-nunta-pdf-simpla' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
