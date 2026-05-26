import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

export const metadata = {
  title: 'Contact — VibeInvite',
  description: 'Contactează VibeInvite pentru întrebări despre invitații digitale și servicii premium.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/contact',
    title: 'Contact — VibeInvite',
    description: 'Contactează VibeInvite pentru întrebări despre invitații digitale și servicii premium.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Contact' },
    ],
  },
  alternates: { canonical: SITE_DOMAIN + '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
