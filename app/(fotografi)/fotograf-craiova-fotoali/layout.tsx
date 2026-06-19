// app/(fotografi)/foto-ali/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FotoAli – Fotograf Nuntă Craiova, Dolj | VibeInvite',
  description: 'FotoAli – fotograf profesionist de nunți și evenimente în Craiova, județul Dolj. Servicii foto-video premium, stil documentar și artistic. Contact direct: 0769217174.',
  keywords: [
    'fotograf nuntă Craiova',
    'fotograf Craiova',
    'fotograf Dolj',
    'foto video nuntă Craiova',
    'fotograf profesionist Craiova',
    'FotoAli fotograf',
    'fotograf nuntă Oltenia',
    'fotograf evenimente Craiova',
    'ședință foto mireasă Craiova',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-craiova-fotoali',
    title: 'FotoAli – Fotograf Nuntă Craiova | VibeInvite',
    description: 'Fotograf profesionist de nunți în Craiova. Stil documentar și artistic, disponibil în toată România.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'FotoAli fotograf nuntă Craiova' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FotoAli – Fotograf Nuntă Craiova',
    description: 'Fotograf profesionist de nunți în Craiova, Dolj. Disponibil în toată România.',
    images: ['https://www.vibeinvite.ro/weed.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}