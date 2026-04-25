export const metadata = {
  title: 'Login | VibeInvite',
  description: 'Pagina de login VibeInvite pentru acces rapid la contul tău și administrarea invitațiilor digitale.',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-6 py-16 lg:px-8">
      <div className="w-full max-w-xl rounded-[32px] border border-sand/80 bg-white/95 p-10 shadow-soft">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.26em] text-gold">Login</p>
          <h1 className="section-title text-4xl font-semibold text-charcoal">Accesează contul VibeInvite</h1>
          <p className="text-sm leading-7 text-charcoal/75">
            Pagina de login este pregătită pentru fluxurile viitoare de autentificare și gestionare a invitațiilor. În acest moment aici găsești un layout elegant și coerent cu restul platformei.
          </p>
        </div>

        <form className="mt-10 space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-charcoal/80">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplu@vibeinvite.ro"
              className="w-full rounded-full border border-sand/70 bg-cream px-5 py-3 text-charcoal outline-none transition focus:border-gold/80"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-charcoal/80">
              Parolă
            </label>
            <input
              id="password"
              type="password"
              placeholder="******"
              className="w-full rounded-full border border-sand/70 bg-cream px-5 py-3 text-charcoal outline-none transition focus:border-gold/80"
            />
          </div>
          <button className="inline-flex w-full items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white hover:bg-charcoal/90">
            Autentificare
          </button>
        </form>

        <div className="mt-8 rounded-[28px] border border-sand/80 bg-sand/70 p-6 text-sm leading-7 text-charcoal/75">
          <p>
            Acesta este un șablon UI pregătit pentru viitoarele componente de autentificare. Fără backend activ, vei avea un design modern și coerent cu identitatea VibeInvite.
          </p>
        </div>
      </div>
    </div>
  )
}
