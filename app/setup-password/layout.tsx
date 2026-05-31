import type { Metadata } from 'next'
import { SITE_DOMAIN } from '../../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'Setare parolă | VibeInvite',
  description:
    'Pagina de setare parolă VibeInvite pentru clienți nou înregistrați. Conținut privat, nerelevant pentru motoarele de căutare.',
  metadataBase: new URL(SITE_DOMAIN),
  alternates: { canonical: `${SITE_DOMAIN}/setup-password` },
  robots: { index: false, follow: false },
}

export default function SetupPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
