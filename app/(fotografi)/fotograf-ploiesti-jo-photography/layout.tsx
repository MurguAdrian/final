// app/(fotografi)/fotograf-ploiesti-jo-photography/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JoPhotography – Fotograf Nuntă Ploiești, Prahova | VibeInvite',
  description: 'JoPhotography – fotograf profesionist de nunți în Ploiești, Prahova. Surprind emoțiile și trăirile oamenilor în imagini ce vor rămâne mărturii peste ani. Contact: 0728433155.',
  keywords: [
    'fotograf nuntă Ploiești',
    'fotograf Ploiești',
    'fotograf Prahova',
    'JoPhotography fotograf',
    'foto video nuntă Ploiești',
    'fotograf profesionist Prahova',
    'fotograf nuntă Muntenia',
    'fotograf evenimente Ploiești',
    'Jo Photography nuntă',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-ploiesti-jo-photography',
    title: 'JoPhotography – Fotograf Nuntă Ploiești | VibeInvite',
    description: 'Surprind emoțiile și trăirile oamenilor în imagini ce vor rămâne mărturii peste ani. Fotograf nuntă Ploiești.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'JoPhotography fotograf nuntă Ploiești' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoPhotography – Fotograf Nuntă Ploiești',
    description: 'Fotograf profesionist de nunți în Ploiești, Prahova.',
    images: ['https://www.vibeinvite.ro/weed.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}