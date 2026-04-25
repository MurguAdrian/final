import Link from 'next/link'
import { QUICK_LINKS } from '@/constants/footerLinks'
import '@/styles/footer.css'

export default function Footer() {
  return (
    <footer className="vf-footer">
      <div className="vf-container">

        {/* BRAND */}
        <div>
          <p className="vf-brand">VibeInvite</p>

          <p className="vf-text" style={{ marginTop: 10 }}>
            Invitații digitale moderne pentru nunți, botezuri și evenimente speciale.
          </p>

          <p className="vf-text" style={{ marginTop: 12, opacity: .6 }}>
            VibeInvite © 2026
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h2 className="vf-title">Linkuri rapide</h2>

          <ul className="vf-links">
            {QUICK_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href}>
                  {/* Am schimbat link.label în link.name pentru a se potrivi cu obiectul din constants */}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h2 className="vf-title">Social</h2>

          <div className="vf-social">
            <p>Instagram • Facebook • Pinterest</p>

            <p style={{ marginTop: 10 }}>
              Urmărește inspirația pentru invitații digitale elegante și noutăți despre colecțiile VibeInvite.
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}