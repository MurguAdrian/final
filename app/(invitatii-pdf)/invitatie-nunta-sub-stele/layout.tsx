import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă Sub Stele — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design celestial albastru-noapte cu constelații aurii, faze ale lunii și sigiliu ceară cupru. Plată unică 30 lei.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-nunta-sub-stele',
    title: 'Invitație Nuntă Sub Stele — VibeInvite',
    description: 'Design celestial midnight blue cu constelații aurii și faze ale lunii. Personalizabil, descarcabil instant PDF + JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-invitatie-sub-stele.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă Sub Stele' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-nunta-sub-stele' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
