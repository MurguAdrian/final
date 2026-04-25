export const metadata = {
  title: 'Invitații Online | VibeInvite',
  description: 'Află cum funcționează invitațiile online pentru nunți și evenimente speciale cu VibeInvite, soluția ideală pentru distribuire rapidă și RSVP digital.',
}

export default function InvitatiiOnlinePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="space-y-8 rounded-[32px] bg-white/95 p-10 shadow-soft">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.26em] text-gold">Invitații Online</p>
          <h1 className="section-title text-4xl font-semibold text-charcoal">Sistem de invitații interactive pentru nuntă</h1>
          <p className="max-w-3xl text-lg leading-8 text-charcoal/75">
            Invitațiile online VibeInvite sunt concepute pentru a oferi invitaților o experiență fluidă, modernă și memorabilă. Transmite informația esențială cu un design curat și un format adaptat pentru mobil.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-charcoal">Ce înseamnă invitații online?</h2>
            <p className="text-sm leading-7 text-charcoal/75">
              Invitațiile online sunt pagini digitale care pot fi trimise rapid prin link sau cod QR. Ele includ informații despre locație, program, RSVP și imagini relevante, astfel încât invitații să urmărească totul de pe telefon sau desktop.
            </p>
            <p className="text-sm leading-7 text-charcoal/75">
              Cu VibeInvite, fiecare invitație online poate fi personalizată cu culori, fonturi și accente aurii pentru a oferi o impresie premium. Versatilitatea acestor invitații le face ideale pentru nunți, botezuri și evenimente corporate.
            </p>
            <h3 className="text-2xl font-semibold text-charcoal">Avantajele invitațiilor online</h3>
            <ul className="space-y-3 text-sm leading-7 text-charcoal/75">
              <li>Distribuire instantanee prin link și social media</li>
              <li>Confirmări RSVP automate și listă de invitați actualizată</li>
              <li>Hartă cu traseu GPS și locație clar vizibilă</li>
              <li>Designuri responsive, elegante și ușor de accesat</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-sand/80 bg-sand/70 p-8">
            <h3 className="text-xl font-semibold text-charcoal">Focus SEO</h3>
            <p className="mt-3 text-sm leading-7 text-charcoal/75">
              Textul nostru se concentrează pe termeni precum „invitații online nuntă” și „invitații digitale premium”, pentru a susține vizibilitatea serviciului pe piața locală.
            </p>
            <p className="mt-4 text-sm leading-7 text-charcoal/75">
              Folosim structuri clare și conținut prietenos pentru motoarele de căutare, păstrând în același timp un ton elegant și profesional.
            </p>
          </div>
        </div>

        <div className="rounded-[32px] border border-sand/80 bg-cream p-8 text-sm leading-7 text-charcoal/75">
          <p>
            Invitațiile online VibeInvite sunt concepute pentru oameni care apreciază calitatea și simplitatea. Ele oferă un mod eficient de a păstra legătura cu invitații tăi, de a primi confirmări rapide și de a transmite toate detaliile logistice într-un mod modern.
          </p>
          <p className="mt-4">
            Alegând o invitație online, redai invitației energie și profesionalism, iar invitații pot naviga cu ușurință între informații, galerie foto și secțiunea RSVP. Astfel, fiecare maximă atenție este acordată spiritului evenimentului tău.
          </p>
        </div>
      </div>
    </div>
  )
}
