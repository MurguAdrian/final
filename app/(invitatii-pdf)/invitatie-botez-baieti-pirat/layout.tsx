import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Invitație Botez Băiat Pirat — VibeInvite',
  description: 'Descarcă invitația de botez pentru băiat în format PDF și JPG. Design pirat cu hartă, comoară și valuri. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website', siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatie-botez-baieti-pirat',
    title: 'Invitație Botez Băiat Pirat — VibeInvite',
    description: 'Design pirat cu hartă de comoară, valuri și pavillon negru. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-botez-pirat.jpg', width: 1200, height: 630, alt: 'Invitație Botez Pirat' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatie-botez-baieti-pirat' },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
