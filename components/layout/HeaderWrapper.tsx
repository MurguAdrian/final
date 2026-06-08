// 'use client'

// import { usePathname } from 'next/navigation'
// import Header from '@/components/layout/Header'

// export default function HeaderWrapper() {
//   const pathname = usePathname()

//   const HIDE_HEADER_ROUTES = [
//     '/dashboard',
//   ]

//   if (HIDE_HEADER_ROUTES.some(route => pathname.startsWith(route))) {
//     return null
//   }

//   return <Header />
// }

'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function HeaderWrapper() {
  const pathname = usePathname()

  const HIDE_HEADER_ROUTES = [
    '/dashboard',
    '/invitatii-digitale/demo' // ✦ Linia adăugată pentru a ascunde header-ul pe toate demo-urile
  ]

  // Optional: am pus un semn de întrebare la pathname?.startsWith pentru siguranță
  if (HIDE_HEADER_ROUTES.some(route => pathname?.startsWith(route))) {
    return null
  }

  return <Header />
}