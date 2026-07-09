import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă Pădure de Toamnă — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design cu fundal forestier de toamnă, monogramă elegantă și text alb. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-nunta-poza',
    title: 'Invitație Nuntă Pădure de Toamnă — VibeInvite',
    description: 'Design forestier de toamnă cu monogramă și text alb elegant. Personalizabil, descarcabil instant PDF + JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-invitatie-poza.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă Pădure de Toamnă' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-nunta-poza' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
