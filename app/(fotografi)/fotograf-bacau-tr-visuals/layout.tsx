// app/(fotografi)/fotograf-bacau-tr-visuals/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tr.Visuals – Fotograf & Videograf Nuntă Bacău | VibeInvite',
  description: 'Tr.Visuals – echipă de fotografi și videografi din Bacău. Calitate premium la prețuri accesibile. Foto-video nuntă, botez și evenimente. Contact: 0770635374.',
  keywords: [
    'fotograf nuntă Bacău',
    'videograf nuntă Bacău',
    'foto video nuntă Bacău',
    'Tr.Visuals Bacău',
    'fotograf Bacău prețuri accesibile',
    'fotograf evenimente Bacău',
    'echipă foto video Bacău',
    'fotograf botez Bacău',
  ],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/fotograf-bacau-tr-visuals' },
  openGraph: {
    type: 'profile',
    url: 'https://www.vibeinvite.ro/fotograf-bacau-tr-visuals',
    title: 'Tr.Visuals – Fotograf & Videograf Nuntă Bacău | VibeInvite',
    description: 'Echipă de fotografi și videografi din Bacău. Calitate premium, prețuri accesibile, vibe garantat.',
    siteName: 'VibeInvite',
    images: [{ url: 'https://www.vibeinvite.ro/weed.jpg', width: 1200, height: 630, alt: 'Tr.Visuals fotograf nuntă Bacău' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tr.Visuals – Fotograf Nuntă Bacău',
    description: 'Echipă foto-video din Bacău. Calitate premium, prețuri accesibile.',
    images: ['https://www.vibeinvite.ro/weed.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}