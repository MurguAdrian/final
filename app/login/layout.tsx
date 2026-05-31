import type { Metadata } from 'next'
import { SITE_DOMAIN } from '../../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'Autentificare | VibeInvite',
  description:
    'Pagina de autentificare a VibeInvite. Conținut privat pentru utilizatorii înregistrați și nerelevant pentru indexare.',
  metadataBase: new URL(SITE_DOMAIN),
  alternates: { canonical: `${SITE_DOMAIN}/login` },
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
