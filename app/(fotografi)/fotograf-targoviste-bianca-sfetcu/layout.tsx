// app/(fotografi)/fotograf-targoviste-bianca-sfetcu/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bianca Sfetcu Foto-Video – Fotograf Nuntă Târgoviște, Dâmbovița | VibeInvite',
  description: 'Bianca Sfetcu – fotograf foto-video profesionist în Târgoviște, Dâmbovița. Surprind iubirea în toate formele ei. Nunți, logodne, sesiuni cuplu. Contact: 0771622171.',
  keywords: [
    'fotograf nuntă Târgoviște',
    'fotograf Târgoviște',
    'fotograf Dâmbovița',
    'Bianca Sfetcu fotograf',
    'foto video nuntă Târgoviște',
    'fotograf profesionist Dâmbovița',
    'fotograf nuntă Muntenia',
    'fotograf cuplu Târgoviște',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-targoviste-bianca-sfetcu',
    title: 'Bianca Sfetcu Foto-Video – Fotograf Nuntă Târgoviște | VibeInvite',
    description: 'Fotograf foto-video profesionist în Târgoviște. Surprind iubirea în toate formele ei.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'Bianca Sfetcu fotograf nuntă Târgoviște' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bianca Sfetcu – Fotograf Nuntă Târgoviște',
    description: 'Fotograf foto-video profesionist în Târgoviște, Dâmbovița.',
    images: ['https://www.vibeinvite.ro/weed.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}