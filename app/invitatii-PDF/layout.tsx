import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

export const metadata = {
  title: 'Invitatii Online — VibeInvite',
  description: 'Creează invitații online moderne și ușor de distribuit pentru evenimentele tale.',
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/invitatii-PDF',
    title: 'Invitatii PDF — VibeInvite',
    description: 'Creează invitații PDF moderne și ușor de distribuit pentru evenimentele tale.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Invitații Online' },
    ],
  },
  alternates: { canonical: SITE_DOMAIN + '/invitatii-PDF' },
}

export default function InvitatiiOnlineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
