import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

export const metadata = {
  title: 'Invitații Digitale — VibeInvite',
  description: 'Invitații digitale premium pentru nunți, botezuri și evenimente speciale.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/invitatii-digitale',
    title: 'Invitații Digitale — VibeInvite',
    description: 'Invitații digitale premium pentru nunți, botezuri și evenimente speciale.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Invitații Digitale' },
    ],
  },
  alternates: { canonical: SITE_DOMAIN + '/invitatii-digitale' },
}

export default function InvitatiiDigitaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
