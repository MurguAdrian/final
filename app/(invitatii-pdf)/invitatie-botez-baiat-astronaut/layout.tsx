import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Botez Băiat Astronaut — VibeInvite',
  description: 'Descarcă invitația de botez pentru băiat în format PDF și JPG. Design spațial cu rachete, lună și stele. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-botez-baiat-astronaut',
    title: 'Invitație Botez Băiat Astronaut — VibeInvite',
    description: 'Invitație botez cu design spațial — rachete, lună, stele și astronaut. Personalizabil, descarcabil instant PDF + JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-botez-astronaut.jpg', width: 1200, height: 630, alt: 'Invitație Botez Astronaut' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-botez-baiat-astronaut' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
