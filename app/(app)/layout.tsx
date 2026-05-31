/**
 * ─── APP MODE LAYOUT ─────────────────────────────────────────────────────────
 * Layout SEPARAT pentru zona de aplicație.
 * NU moștenește header/footer din layout-ul global al site-ului.
 * Toate paginile din /app/(app)/* rulează în FULL SCREEN MODE.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VibeInvite — Dashboard',
  description: 'Gestionează invitația ta digitală',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      Acest div învelitor forțează:
        - 100% width & height față de viewport
        - Nicio moștenire de padding/margin din RootLayout
        - overflow:hidden la nivel de shell
          (scroll-ul propriu-zis este controlat în interiorul componentelor)
      
      IMPORTANT: RootLayout (app/layout.tsx) NU trebuie să rendeze
      header/footer global în interiorul acestui layout.
      Dacă le redă, mută-le în propriul lor (site)/layout.tsx.
    */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
