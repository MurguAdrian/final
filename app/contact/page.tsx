import Link from 'next/link'

export const metadata = {
  title: 'Contact | VibeInvite',
  description: 'Contactează VibeInvite pentru suport invitații digitale și consultanță personalizată pentru nunți, botezuri și evenimente speciale.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <section className="space-y-8 rounded-[32px] bg-white/95 p-10 shadow-soft">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.26em] text-gold">Contact</p>
          <h1 className="section-title text-4xl font-semibold text-charcoal">Suport pentru invitații digitale</h1>
          <p className="max-w-3xl text-lg leading-8 text-charcoal/75">
            Echipa VibeInvite este gata să te ajute să transformi evenimentul tău într-o experiență memorabilă. Completează formularul și primești consultanță pentru invitații de nuntă, botez sau alte momente speciale.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form className="space-y-6 rounded-[28px] border border-sand/80 bg-cream p-8">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-charcoal/80">
                Nume
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ex: Maria Popescu"
                className="w-full rounded-full border border-sand/70 bg-white px-5 py-3 text-charcoal outline-none transition focus:border-gold/80"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-charcoal/80">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="exemplu@vibeinvite.ro"
                className="w-full rounded-full border border-sand/70 bg-white px-5 py-3 text-charcoal outline-none transition focus:border-gold/80"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-charcoal/80">
                Mesaj
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Spune-ne despre evenimentul tău și preferințele de design."
                className="w-full rounded-3xl border border-sand/70 bg-white px-5 py-4 text-charcoal outline-none transition focus:border-gold/80"
              />
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-4 text-sm font-semibold text-white hover:bg-charcoal/90">
              Trimite mesaj
            </button>
          </form>

          <div className="space-y-6 rounded-[28px] bg-sand/70 p-8">
            <div>
              <h2 className="text-2xl font-semibold text-charcoal">Suport invitații digitale</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal/75">
                Oferim consultanță de brand și design pentru invitații care îmbină eleganța și funcționalitatea.
              </p>
            </div>
            <div className="space-y-4 text-sm leading-7 text-charcoal/75">
              <p>
                Pentru detalii despre pachete, termene limită sau opțiuni de personalizare, suntem alături de tine cu o abordare profesionistă și flexibilă.
              </p>
              <p>
                Indiferent că pregătești o nuntă, un botez sau un eveniment corporate, VibeInvite se adaptează la stilul tău, oferind o experiență coerentă și rafinată.
              </p>
            </div>
            <Link href="/despre" className="inline-flex rounded-full border border-charcoal/10 bg-white px-6 py-3 text-sm font-semibold text-charcoal hover:bg-white/90">
              Despre VibeInvite
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
