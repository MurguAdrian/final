import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Invitație Botez Fată — Floral Roz Elegant | VibeInvite',
  description: 'Invitație de botez pentru fată cu design floral roz premium. Descarcă PDF și JPG instant. Plată unică 30 lei.',
  openGraph: {
    type: 'website', siteName: 'VibeInvite',
    url: 'https://www.vibeinvite.ro/invitatie-botez-fete-roz',
    title: 'Invitație Botez Fată Floral Roz — VibeInvite',
    description: 'Design floral roz premium pentru botez de fată. PDF + JPG instant. 30 lei, plată unică.',
    images: [{ url: 'https://www.vibeinvite.ro/og-botez-fete-roz.jpg', width: 1200, height: 630, alt: 'Invitație Botez Fată Roz' }],
  },
  alternates: { canonical: 'https://www.vibeinvite.ro/invitatie-botez-fete-roz' },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
