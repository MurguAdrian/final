// app/(fotografi)/fotograf-bucuresti-razvan-ristea/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Răzvan Ristea – Fotograf Nuntă București | VibeInvite',
  description: 'Răzvan Ristea – fotograf profesionist de nunți și evenimente în București. Stil documentary și artistic, emoții autentice, momente unice. Contact: +40726711251.',
  keywords: [
    'fotograf nuntă București',
    'fotograf București',
    'Răzvan Ristea fotograf',
    'fotograf profesionist București',
    'foto video nuntă București',
    'fotograf evenimente București',
    'fotograf nuntă Ilfov',
    'fotograf cuplu București',
    'fotograf documentary București',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-bucuresti-razvan-ristea',
    title: 'Răzvan Ristea – Fotograf Nuntă București | VibeInvite',
    description: 'Fotograf profesionist de nunți în București. Stil documentary și artistic, emoții autentice.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'Răzvan Ristea fotograf nuntă București' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Răzvan Ristea – Fotograf Nuntă București',
    description: 'Fotograf profesionist de nunți în București. Emoții autentice, momente unice.',
    images: ['https://www.vibeinvite.ro/weed.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}