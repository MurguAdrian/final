import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Invitație Botez Fată — Prințesă & Castel | VibeInvite',
  description: 'Invitație de botez pentru fată cu design regal: castel, coroană și stele aurii. PDF + JPG instant. 30 lei.',
  openGraph: {
    type: 'website', siteName: 'VibeInvite',
    url: 'https://www.vibeinvite.ro/invitatie-botez-fete-castel',
    title: 'Invitație Botez Fată Prințesă Castel — VibeInvite',
    description: 'Design regal cu castel, coroană aurie și stele — pentru mica prințesă. PDF + JPG. 30 lei.',
    images: [{ url: 'https://www.vibeinvite.ro/og-botez-fete-castel.jpg', width: 1200, height: 630, alt: 'Invitație Botez Prințesă' }],
  },
  alternates: { canonical: 'https://www.vibeinvite.ro/invitatie-botez-fete-castel' },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
