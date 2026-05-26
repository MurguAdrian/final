import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

export const metadata = {
  title: 'Prețuri — VibeInvite',
  description: 'Află planurile și prețurile pentru invitații digitale și pachetele noastre premium.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/preturi',
    title: 'Prețuri — VibeInvite',
    description: 'Află planurile și prețurile pentru invitații digitale și pachetele noastre premium.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Prețuri' },
    ],
  },
  alternates: { canonical: SITE_DOMAIN + '/preturi' },
}

export default function PreturiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
