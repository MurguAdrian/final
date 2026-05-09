'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function HeaderWrapper() {
  const pathname = usePathname()

  const HIDE_HEADER_ROUTES = [
    '/dashboard',
  ]

  if (HIDE_HEADER_ROUTES.some(route => pathname.startsWith(route))) {
    return null
  }

  return <Header />
}