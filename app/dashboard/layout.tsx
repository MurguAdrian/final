// import type { Metadata } from 'next'
// import { SITE_DOMAIN } from '../../constants/marketingDefaults'

// export const metadata: Metadata = {
//   title: 'Dashboard miri | VibeInvite',
//   description:
//     'Dashboard privat VibeInvite pentru gestionarea invitațiilor, confirmărilor și setărilor evenimentului.',
//   metadataBase: new URL(SITE_DOMAIN),
//   alternates: { canonical: `${SITE_DOMAIN}/dashboard` },
//   robots: { index: false, follow: false },
// }

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return <>{children}</>
// }


import type { Metadata } from 'next'
import { SITE_DOMAIN } from '../../constants/marketingDefaults'
type Props = {
  params: { theme: string } // sau slug, depinde cum se numește folderul tău cu [paranteze]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = params.theme;
  
  // Listă cu temele destinate exclusiv pentru Botez
  const botezThemes = ['astronaut', 'baloane', 'ursulet', 'fluture', 'masinuta', 'steluta'];
  
  // Verificăm dacă tema curentă face parte din categoria botez
  const isBotez = botezThemes.includes(theme?.toLowerCase());

  return {
    title: isBotez ? 'Dashboard Părinți | VibeInvite' : 'Dashboard Miri | VibeInvite',
    description: isBotez 
      ? 'Dashboard privat VibeInvite pentru gestionarea invitațiilor, confirmărilor și setărilor botezului.'
      : 'Dashboard privat VibeInvite pentru gestionarea invitațiilor, confirmărilor și setărilor nunții.',
    metadataBase: new URL(SITE_DOMAIN),
    robots: { index: false, follow: false },
  }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}