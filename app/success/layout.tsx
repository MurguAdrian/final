import type { Metadata } from 'next'
import { SITE_DOMAIN } from '../../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'Plată reușită | VibeInvite',
  description:
    'Pagina de confirmare a plății VibeInvite. Conținut privat și nerelevant pentru indexare.',
  metadataBase: new URL(SITE_DOMAIN),
  alternates: { canonical: `${SITE_DOMAIN}/success` },
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
