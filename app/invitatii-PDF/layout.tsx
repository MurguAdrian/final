// andre/app/invitatii-PDF/layout.tsx
import React from 'react'
import { Metadata } from 'next'
import { DEFAULT_OG, SITE_DOMAIN, OG_WIDTH, OG_HEIGHT } from '../../constants/marketingDefaults'

export const metadata: Metadata = {
  title: 'Invitații PDF — VibeInvite',
  description: 'Creează invitații PDF moderne și ușor de distribuit pentru evenimentele tale.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'VibeInvite',
    url: SITE_DOMAIN + '/invitatii-PDF',
    title: 'Invitații PDF — VibeInvite',
    description: 'Creează invitații PDF moderne și ușor de distribuit pentru evenimentele tale.',
    images: [
      { url: DEFAULT_OG, width: OG_WIDTH, height: OG_HEIGHT, alt: 'VibeInvite — Invitații PDF' },
    ],
  },
  alternates: { canonical: SITE_DOMAIN + '/invitatii-PDF' },
}

export default function InvitatiiOnlineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}