import type { Metadata } from 'next'
import { SITE_DOMAIN } from '../../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'Autentificare și resetare parolă | VibeInvite',
  description:
    'Pagini private VibeInvite pentru autentificare și resetare parolă. Conținut destinat doar utilizatorilor înregistrați.',
  metadataBase: new URL(SITE_DOMAIN),
  alternates: { canonical: `${SITE_DOMAIN}/auth` },
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
