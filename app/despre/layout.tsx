import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

export const metadata = {
  title: 'Despre — VibeInvite',
  description: 'Despre VibeInvite: misiunea noastră, valorile și serviciile pe care le oferim.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/despre',
    title: 'Despre — VibeInvite',
    description: 'Despre VibeInvite: misiunea noastră, valorile și serviciile pe care le oferim.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Despre' },
    ],
  },
  alternates: { canonical: SITE_DOMAIN + '/despre' },
}

export default function DespreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
