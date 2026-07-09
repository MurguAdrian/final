import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Invitație Botez Fată — Baloane Pastel Magice | VibeInvite',
  description: 'Invitație de botez pentru fată cu baloane pastel, fundal lavandă și tipografie elegantă. PDF + JPG instant. 30 lei.',
  openGraph: {
    type: 'website', siteName: 'VibeInvite',
    url: 'https://www.vibeinvite.ro/invitatie-botez-fete-baloane',
    title: 'Invitație Botez Fată Baloane Pastel — VibeInvite',
    description: 'Baloane pastel, confetti auriu și design magic pentru botez de fată. PDF + JPG instant. 30 lei.',
    images: [{ url: 'https://www.vibeinvite.ro/og-botez-fete-baloane.jpg', width: 1200, height: 630, alt: 'Invitație Botez Fată Baloane' }],
  },
  alternates: { canonical: 'https://www.vibeinvite.ro/invitatie-botez-fete-baloane' },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
