import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Botez Băiat Mașină de Curse — VibeInvite',
  description: 'Descarcă invitația de botez pentru băiat în format PDF și JPG. Design racing cu mașini de curse, pistă și trofeul campionului. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-botez-baieti-masina',
    title: 'Invitație Botez Băiat Mașină de Curse — VibeInvite',
    description: 'Invitație botez racing cu mașini, pistă și trofeu. Personalizabil, descarcabil instant PDF + JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-botez-masina.jpg', width: 1200, height: 630, alt: 'Invitație Botez Mașină de Curse' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-botez-baieti-masina' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
