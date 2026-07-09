import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitație Nuntă Ocean — VibeInvite',
  description: 'Descarcă invitația ta de nuntă în format PDF și JPG. Design albastru floral acuarelă, personalizabil instant. Plată unică 30 lei, fără abonament.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: 'https://vibeinvite.ro/invitatii-nunta-ocean',
    title: 'Invitație Nuntă Ocean — VibeInvite',
    description: 'Design albastru acuarelă cu flori și frunze pentru nunta ta. Personalizabil, descarcabil instant în PDF și JPG. 30 lei, plată unică.',
    images: [{ url: 'https://vibeinvite.ro/og-invitatie-ocean.jpg', width: 1200, height: 630, alt: 'Invitație Nuntă Ocean' }],
  },
  alternates: { canonical: 'https://vibeinvite.ro/invitatii-nunta-ocean' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
