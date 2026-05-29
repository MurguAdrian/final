// andre/app/fotografi/page.tsx

import Link from "next/link";

export default function FotografiiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-10">

        {/* HERO */}
        <section className="text-center space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Program Pilot Fotografii Evenimente
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            În derulare există un proiect pilot dedicat fotografilor pentru evenimente.
            Scopul este dezvoltarea unei rețele locale de fotografi și videografi,
            integrați în platforma <span className="font-semibold">VibeInvite</span>.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm">
            🚀 Program activ – acces limitat
          </div>
        </section>

        {/* INFO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Ce oferim</h2>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>• Site / portofoliu personal pentru fiecare fotograf</li>
              <li>• Implementare SEO local (manual, optimizat)</li>
              <li>• Prezentare directă în platformă</li>
              <li>• Fără costuri pentru participanți</li>
            </ul>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Scopul proiectului</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Construirea unui marketplace local pentru fotografi și videografi,
              astfel încât utilizatorii să poată găsi rapid servicii pentru evenimente
              direct în zona lor.
            </p>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-black text-white rounded-2xl p-8 text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold">
            Vrei să faci parte din program?
          </h2>

          <p className="text-gray-300 text-sm md:text-base">
            Trimite un email și vei fi contactat în maximum 48 de ore pentru colaborare.
          </p>

          <a
            href="mailto:office@vibeinvite.ro?subject=Program%20Pilot%20Fotografi"
            className="inline-block px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition"
          >
            Aplică prin email
          </a>
        </section>

        {/* NAV / MARKETPLACE ENTRY */}
        <section className="text-center space-y-4">
          <p className="text-gray-500 text-sm">
            Program Pilot
          </p>
        </section>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-gray-400">
          VibeInvite – platformă de invitații digitale & colaborări pentru evenimente
        </p>
      </div>
    </main>
  );
}