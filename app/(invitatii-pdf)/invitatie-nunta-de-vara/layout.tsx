import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă de Vară — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design organic de vară, verde salvie și eucalipt, personalizabil instant. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-nunta-de-vara',
    title: 'Invitație Nuntă de Vară — VibeInvite',
    description: 'Design organic de vară pentru nunta ta. Verde salvie, eucalipt și minimalism cald. Personalizabil, descarcabil instant în PDF și JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-invitatie-vara.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă de Vară' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-nunta-de-vara' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
