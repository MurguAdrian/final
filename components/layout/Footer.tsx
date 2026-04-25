import Link from 'next/link'

const quickLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Prețuri', href: '/preturi' },
  { label: 'Despre', href: '/despre' },
]

export default function Footer() {
  return (
    <footer className="border-t border-sand/60 bg-white/90 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-ash">VibeInvite</p>
          <p className="max-w-md text-sm leading-7 text-charcoal/80">
            Invitații digitale moderne pentru nunți, botezuri și evenimente speciale.
          </p>
          <p className="text-sm text-charcoal/70">VibeInvite © 2026</p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal/80">Linkuri rapide</h2>
          <ul className="space-y-3 text-sm text-charcoal/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-charcoal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal/80">Social</h2>
          <div className="space-y-3 text-sm text-charcoal/80">
            <p>Instagram • Facebook • Pinterest</p>
            <p className="max-w-sm leading-7">
              Urmărește inspirația pentru invitații digitale elegante și află noutăți despre colecțiile premium VibeInvite.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
