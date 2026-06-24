// import Link from 'next/link'

// export default function Footer() {
//   const year = new Date().getFullYear()

//   return (
//     <footer style={{
//       backgroundColor: '#FDFAF6',
//       borderTop: '1px solid rgba(255,107,0,.12)',
//       fontFamily: "'DM Sans', sans-serif",
//     }}>
//       <div style={{
//         maxWidth: '1160px',
//         margin: '0 auto',
//         padding: '40px 20px 32px',
//       }}>

//         {/* top: brand + coloane */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
//           gap: '32px',
//           marginBottom: '32px',
//         }}>

//           {/* brand */}
//           <div>
//             <p style={{ fontSize: '18px', fontWeight: 600, color: '#1A1208', marginBottom: '8px' }}>
//               Vibe<span style={{ color: '#FF6B00' }}>Invite</span>
//             </p>
//             <p style={{ fontSize: '13px', color: 'rgba(26,18,8,.55)', lineHeight: 1.7, marginBottom: '12px' }}>
//               Invitații digitale premium pentru nuntă și botez.
//             </p>
//             <a href="tel:+40752954258" style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none', marginBottom: '6px' }}>
//               📞 +40 752 954 258
//             </a>
//             <a href="mailto:office@vibeinvite.ro" style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none' }}>
//               ✉️ office@vibeinvite.ro
//             </a>
//           </div>

//           {/* pagini */}
//           <div>
//             <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FF6B00', marginBottom: '14px' }}>
//               Pagini
//             </p>
//             {[
//               { label: 'Prețuri',                   href: '/preturi' },
//               { label: 'Modele Invitații Digitale', href: '/invitatii-digitale' },
//               { label: 'Modele Invitații PDF',  href: '/invitatii-PDF' },
//               { label: 'Despre VibeInvite',         href: '/despre' },
//             ].map((item) => (
//               <Link key={item.href} href={item.href} style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none', marginBottom: '8px' }}>
//                 {item.label}
//               </Link>
//             ))}
//           </div>

//           {/* legal */}
//           <div>
//             <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FF6B00', marginBottom: '14px' }}>
//               Legal
//             </p>
//             {[
//               { label: 'Termeni și Condiții', href: '/termeni' },
//                             { label: 'GDPR', href: '/gdpr' },
//               { label: 'Politica Cookie',     href: '/politica' },
//             ].map((item) => (
//               <Link key={item.href} href={item.href} style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none', marginBottom: '8px' }}>
//                 {item.label}
//               </Link>
//             ))}
//           </div>

//         </div>

//         {/* bottom */}
//         <div style={{ borderTop: '1px solid rgba(26,18,8,.08)', paddingTop: '20px', fontSize: '12px', color: 'rgba(26,18,8,.35)' }}>
//           © {year} VibeInvite · Făcut cu ♥ în România
//         </div>

//       </div>
//     </footer>
//   )
// }
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const year = new Date().getFullYear()

  const hideOn = [
    '/invitatie-nunta-pdf-auriu',
    '/invitatie-nunta-de-vara',
  ]

  if (hideOn.some(p => pathname.startsWith(p))) return null

  return (
    <footer style={{
      backgroundColor: '#FDFAF6',
      borderTop: '1px solid rgba(255,107,0,.12)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '40px 20px 32px',
      }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          marginBottom: '32px',
        }}>

          <div>
            <p style={{ fontSize: '18px', fontWeight: 600, color: '#1A1208', marginBottom: '8px' }}>
              Vibe<span style={{ color: '#FF6B00' }}>Invite</span>
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(26,18,8,.55)', lineHeight: 1.7, marginBottom: '12px' }}>
              Invitații digitale premium pentru nuntă și botez.
            </p>
            <a href="tel:+40752954258" style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none', marginBottom: '6px' }}>
              📞 +40 752 954 258
            </a>
            <a href="mailto:office@vibeinvite.ro" style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none' }}>
              ✉️ office@vibeinvite.ro
            </a>
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FF6B00', marginBottom: '14px' }}>
              Pagini
            </p>
            {[
              { label: 'Prețuri',                   href: '/preturi' },
              { label: 'Modele Invitații Digitale', href: '/invitatii-digitale' },
              { label: 'Modele Invitații PDF',      href: '/invitatii-PDF' },
              { label: 'Despre VibeInvite',         href: '/despre' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none', marginBottom: '8px' }}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FF6B00', marginBottom: '14px' }}>
              Legal
            </p>
            {[
              { label: 'Termeni și Condiții', href: '/termeni' },
              { label: 'GDPR',               href: '/gdpr' },
              { label: 'Politica Cookie',    href: '/politica' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ display: 'block', fontSize: '13px', color: 'rgba(26,18,8,.6)', textDecoration: 'none', marginBottom: '8px' }}>
                {item.label}
              </Link>
            ))}
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(26,18,8,.08)', paddingTop: '20px', fontSize: '12px', color: 'rgba(26,18,8,.35)' }}>
          © {year} VibeInvite · Făcut cu ♥ în România
        </div>

      </div>
    </footer>
  )
}