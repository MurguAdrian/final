import CookieConsent from '../../components/CookieConsent'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

export default function InvitatiiPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CookieConsent />
    </>
  )
}