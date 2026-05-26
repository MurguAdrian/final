export const metadata = {
  // Prevent parent openGraph / twitter images inheritance for invitation routes
  openGraph: {
    images: [],
  },
  twitter: {
    images: [],
  },
}

export default function InvitatieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
