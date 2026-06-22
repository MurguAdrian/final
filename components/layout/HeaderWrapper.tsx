

'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function HeaderWrapper() {
  const pathname = usePathname()

  const HIDE_HEADER_ROUTES = [
    '/dashboard',
    '/invitatie',
    '/invitatii-digitale/demo', // ✦ Linia adăugată pentru a ascunde header-ul pe toate demo-urile
    '/invitatie-botez-online-baiat-masinuta',
'/invitatie-botez-online-baiat-steluta',
'/invitatie-botez-online-fata-baloane',
'/invitatie-botez-online-fata-fluture',
'/invitatie-botez-online-ursulet',
'/invitatie-online-aniversare-majorat-18-ani',
'/invitatii-online-nunta-boho',
'/invitatii-online-nunta-lux',
'/invitatii-online-nunta-minimal',
'/invitatii-online-nunta-natura',
'/invitatii-online-nunta-romantic',
'/invitatii-online-nunta-royal'
  ]

  // Optional: am pus un semn de întrebare la pathname?.startsWith pentru siguranță
  if (HIDE_HEADER_ROUTES.some(route => pathname?.startsWith(route))) {
    return null
  }

  return <Header />
}