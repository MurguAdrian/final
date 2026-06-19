// app/servicii-nunta/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicii Nuntă România | Fotografi, DJ, Formații, Candy Bar – VibeInvite',
  description:
    'Găsește cei mai buni fotografi, DJ, formații muzicale și candy bar pentru nunta ta. Furnizori verificați din toate județele României. Listare gratuită, contact direct.',
  keywords: [
    'servicii nunta Romania',
    'fotograf nunta',
    'DJ nunta',
    'formatie muzicala nunta',
    'candy bar nunta',
    'furnizori nunta',
    'fotograf nunta Bacau',
    'fotograf nunta Iasi',
    'fotograf nunta Cluj',
    'fotograf nunta Bucuresti',
    'servicii nunta locale',
    'nunta Romania furnizori verificati',
  ],
  authors: [{ name: 'VibeInvite', url: 'https://www.vibeinvite.ro' }],
  metadataBase: new URL('https://www.vibeinvite.ro'),
  alternates: { canonical: 'https://www.vibeinvite.ro/servicii-nunta' },
  openGraph: {
    type: 'website',
    url: 'https://www.vibeinvite.ro/servicii-nunta',
    title: 'Servicii Nuntă România | Fotografi, DJ, Formații – VibeInvite',
    description:
      'Fotografi, DJ, formații și candy bar pentru nunta ta. Furnizori verificați din toată România. Contact direct, fără intermediari.',
    siteName: 'VibeInvite',
    images: [{ url: '/weed.jpg', width: 1200, height: 630, alt: 'Servicii Nuntă VibeInvite' }],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicii Nuntă România | VibeInvite',
    description: 'Fotografi, DJ, formații și candy bar pentru nunta ta. Furnizori verificați din toată România.',
    images: ['/weed.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function ServiciiNuntaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}