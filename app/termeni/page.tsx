import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termeni și Condiții | VibeInvite',
  description:
    'Termenii și condițiile de utilizare ale platformei VibeInvite.ro — invitații digitale pentru nuntă și botez. Citește condițiile înainte de utilizare.',
  alternates: { canonical: 'https://www.vibeinvite.ro/termeni' },
  robots: { index: true, follow: true },
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vt-page * { box-sizing: border-box; margin: 0; padding: 0; }

.vt-page {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

@keyframes vt-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vt-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vt-o1  { width: 480px; height: 480px; background: radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 70%); top: -80px; right: -80px; animation: vt-orb 14s ease-in-out infinite; }
.vt-o2  { width: 280px; height: 280px; background: radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%); bottom: 80px; left: -50px; animation: vt-orb 18s ease-in-out infinite reverse; }

@keyframes vt-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

.vt-inner {
  position: relative; z-index: 10;
  max-width: 860px; margin: 0 auto;
  padding: 48px 20px 80px;
}

/* header */
.vt-header {
  text-align: center; margin-bottom: 48px;
  opacity: 0; animation: vt-up .7s ease .1s forwards;
}
.vt-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vt-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; }
.vt-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 300; line-height: 1.1; color: #1A1208; margin-bottom: 12px;
}
.vt-h1 em { font-style: italic; color: #FF6B00; }
.vt-date { font-size: 12px; color: rgba(26,18,8,.45); letter-spacing: .04em; }

/* info box */
.vt-infobox {
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.25); border-radius: 16px;
  padding: 18px 22px; margin-bottom: 32px; font-size: 13px; line-height: 1.75;
  color: rgba(26,18,8,.7);
  opacity: 0; animation: vt-up .7s ease .2s forwards;
}
.vt-infobox strong { color: #1A1208; }

/* section cards */
.vt-card {
  background: #fff; border-radius: 20px;
  border: 1px solid rgba(255,107,0,.1);
  box-shadow: 0 2px 10px rgba(0,0,0,.04);
  padding: 32px 36px; margin-bottom: 20px;
  opacity: 0; animation: vt-up .7s ease .25s forwards;
  position: relative;
}
.vt-card::before {
  content: ''; position: absolute; top: 0; left: 32px; right: 32px; height: 2px;
  background: linear-gradient(90deg, #FF6B00, transparent);
  border-radius: 0 0 2px 2px;
}

.vt-card-label {
  font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: #FF6B00; margin-bottom: 8px;
}
.vt-card-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 400; color: #1A1208; margin-bottom: 18px; line-height: 1.25;
}
.vt-card-h2 em { font-style: italic; color: #FF6B00; }

.vt-body { font-size: 13.5px; line-height: 1.85; color: rgba(26,18,8,.68); }
.vt-body p { margin-bottom: 12px; }
.vt-body p:last-child { margin-bottom: 0; }
.vt-body strong { color: #1A1208; font-weight: 600; }
.vt-body em { font-style: italic; color: #FF6B00; }

.vt-list { list-style: none; padding: 0; margin: 10px 0; display: flex; flex-direction: column; gap: 7px; }
.vt-list li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px; color: rgba(26,18,8,.68); line-height: 1.65;
}
.vt-li-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B00; flex-shrink: 0; margin-top: 7px; }

/* warning card */
.vt-warn {
  background: linear-gradient(135deg, #1A1208 0%, #2d1f0e 100%);
  border-radius: 20px; padding: 28px 32px; margin-bottom: 20px;
  border: 1px solid rgba(255,107,0,.2);
  opacity: 0; animation: vt-up .7s ease .3s forwards;
}
.vt-warn-label { font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #FF8C35; margin-bottom: 8px; }
.vt-warn-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 400; color: #fff; margin-bottom: 16px; line-height: 1.25;
}
.vt-warn-h2 em { font-style: italic; color: #FF8C35; }
.vt-warn-body { font-size: 13px; line-height: 1.85; color: rgba(255,255,255,.65); }
.vt-warn-body p { margin-bottom: 10px; }
.vt-warn-body p:last-child { margin-bottom: 0; }
.vt-warn-body strong { color: #FFB374; font-weight: 600; }

/* operator box */
.vt-operator {
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.2); border-radius: 16px;
  padding: 22px 28px; margin-top: 32px; font-size: 13px; color: rgba(26,18,8,.65); line-height: 1.75;
  opacity: 0; animation: vt-up .7s ease .4s forwards;
}
.vt-operator strong { color: #1A1208; font-weight: 600; display: block; margin-bottom: 4px; font-size: 14px; }

@media (max-width: 600px) {
  .vt-inner { padding: 32px 16px 60px; }
  .vt-card  { padding: 24px 20px; }
  .vt-warn  { padding: 22px 20px; }
}
`

function Card({ no, label, title, children }: { no: string; label: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="vt-card">
      <p className="vt-card-label">Art. {no} — {label}</p>
      <h2 className="vt-card-h2">{title}</h2>
      <div className="vt-body">{children}</div>
    </div>
  )
}

function Warn({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="vt-warn">
      <p className="vt-warn-label">{label}</p>
      <h2 className="vt-warn-h2">{title}</h2>
      <div className="vt-warn-body">{children}</div>
    </div>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="vt-li-dot" aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}

export default function TermeniPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="vt-page">
        <div className="vt-orb vt-o1" aria-hidden="true" />
        <div className="vt-orb vt-o2" aria-hidden="true" />

        <div className="vt-inner">

          {/* HEADER */}
          <header className="vt-header">
            <p className="vt-super">
              <span className="vt-sdot" aria-hidden="true" />
              Document Legal
            </p>
            <h1 className="vt-h1">
              Termeni și <em>Condiții</em> de Utilizare
            </h1>
            <p className="vt-date">Versiunea 1.1 — Actualizat: 26.06.2026 · Intrare în vigoare: 11.07.2026</p>
          </header>

          {/* INFO BOX */}
          <div className="vt-infobox" role="note">
            <strong>Vă rugăm să citiți cu atenție acest document înainte de utilizarea platformei.</strong>{' '}
            Prin accesarea, înregistrarea sau utilizarea în orice mod a platformei VibeInvite.ro,
            confirmați că ați înțeles și acceptat în integralitate prezentele Termeni și Condiții.
            Dacă nu sunteți de acord cu oricare dintre prevederile de mai jos, vă rugăm să nu utilizați platforma.
          </div>

          {/* ART. 1 — OPERATORUL */}
          <Card no="1" label="Operatorul Platformei" title={<>Datele <em>Operatorului</em></>}>
            <p>
              Platforma VibeInvite.ro este deținută și operată de:
            </p>
            <p>
              <strong>MURGU ADRIAN PERSOANĂ FIZICĂ AUTORIZATĂ</strong><br />
              Sediu profesional: Aleea Parcului nr. 7, et. 9, Ap. 1, Municipiul Onești, Județul Bacău, România<br />
              Domeniu: www.vibeinvite.ro<br />
              Contact: office@vibeinvite.ro
            </p>
            <p>
              În cuprinsul prezentului document, operatorul va fi referit ca <strong>„VibeInvite"</strong>,
              <strong>„Operatorul"</strong> sau <strong>„noi"</strong>. Utilizatorii platformei vor fi referți
              ca <strong>„Utilizatori"</strong>, <strong>„Miri"</strong> sau, după caz, <strong>„Invitați"</strong>.
            </p>
          </Card>

          {/* ART. 2 — OBIECT */}
          <Card no="2" label="Obiectul Serviciului" title={<>Descrierea <em>Platformei</em></>}>
            <p>
              VibeInvite.ro este o platformă digitală de tip SaaS (Software as a Service) care oferă
              utilizatorilor instrumente pentru crearea, personalizarea și distribuirea de invitații digitale
              pentru evenimente private (nunți, botezuri, aniversări), precum și funcționalități conexe de
              gestionare a evenimentelor (RSVP, galerie foto, meniu digital, export date).
            </p>
            <p>
              Platforma este accesibilă contra unui tarif unic, conform ofertei afișate la momentul achiziției.
              Accesul la funcționalitățile complete este condiționat de efectuarea plății și confirmarea acesteia
              de către procesatorul de plăți.
            </p>
            <p>
              <strong>Serviciul este furnizat în starea în care se află („as-is") și în măsura disponibilității
              tehnice a platformei („as-available").</strong> VibeInvite nu garantează disponibilitatea
              neîntreruptă, completitudinea funcționalităților sau absența erorilor tehnice.
            </p>
          </Card>

          {/* ART. 3 — CONȚINUT AI */}
          <Warn
            label="Clauze Speciale — Conținut Generat cu Inteligență Artificială"
            title={<>Modele Vizuale <em>Generate cu AI</em></>}
          >
            <p>
              <strong>3.1.</strong> Utilizatorul ia cunoștință și acceptă în mod explicit că modelele vizuale,
              temele grafice, elementele de design, layout-urile și orice alte elemente de natură estetică
              disponibile pe platforma VibeInvite.ro sunt create integral sau parțial cu ajutorul unor sisteme
              de inteligență artificială (AI), incluzând, fără limitare, modele generative de imagini, text
              sau interfețe.
            </p>
            <p>
              <strong>3.2.</strong> Prin natura procesului de generare automată, <strong>VibeInvite nu
              garantează unicitatea, originalitatea absolută sau absența asemănărilor</strong> — intenționate
              sau neintenționate — cu alte creații, opere protejate prin drept de autor, mărci înregistrate
              sau alte drepturi de proprietate intelectuală aparținând unor terți.
            </p>
            <p>
              <strong>3.3. VibeInvite nu oferă nicio garanție legală sau comercială</strong> cu privire la
              conținutul generat de AI, inclusiv, dar fără a se limita la: originalitate, lipsă de viciu,
              adecvare pentru un scop specific, absența drepturilor terților sau conformitatea cu orice
              reglementare aplicabilă în domeniul dreptului de autor.
            </p>
            <p>
              <strong>3.4.</strong> Utilizatorul își asumă integral și exclusiv riscurile ce decurg din
              utilizarea conținutului generat cu AI, inclusiv eventualele pretenții formulate de terți cu
              privire la drepturi de autor, drepturi la imagine, mărci sau orice alte drepturi de proprietate
              intelectuală. VibeInvite este exonerat de orice răspundere în acest sens.
            </p>
            <p>
              <strong>3.5.</strong> Utilizatorul care distribuie invitații conținând elemente generate cu AI
              face aceasta pe propria răspundere și nu poate angaja răspunderea VibeInvite pentru nicio
              pretenție formulată de terți.
            </p>
          </Warn>

          {/* ART. 4 — OBLIGATII UTILIZATOR */}
          <Card no="4" label="Obligațiile Utilizatorilor" title={<>Responsabilitățile <em>Mirilor</em></>}>
            <p>Prin accesarea platformei și utilizarea serviciilor, Mirii se obligă:</p>
            <ul className="vt-list">
              <Li>Să furnizeze date corecte și complete la înregistrare și în procesul de personalizare.</Li>
              <Li>Să utilizeze platforma exclusiv în scopuri legale și în conformitate cu prezentele condiții.</Li>
              <Li>Să obțină, anterior distribuirii invitațiilor, <strong>consimțământul explicit al persoanelor ale căror date personale (inclusiv numele, imaginea sau preferințele dietetice) sunt colectate</strong> prin intermediul funcționalității RSVP, în conformitate cu Regulamentul (UE) 2016/679 (GDPR).</Li>
              <Li>Să informeze invitații cu privire la colectarea și prelucrarea datelor lor personale.</Li>
              <Li>Să nu distribuie prin intermediul platformei conținut ilegal, obscen, defăimător, discriminatoriu sau care încalcă drepturile terților.</Li>
              <Li>Să nu utilizeze platforma în scopuri comerciale, de resale sau redistribuire neautorizată.</Li>
              <Li>Să păstreze confidențialitatea datelor de acces (email, parolă) și să notifice imediat VibeInvite în caz de acces neautorizat.</Li>
              <Li>Să declare că au împlinit vârsta de <strong>18 ani</strong> la data creării contului. Platforma VibeInvite este destinată exclusiv persoanelor majore; minorii nu pot crea conturi fără acordul scris al unui părinte sau tutore legal, caz în care tutorele își asumă integral responsabilitățile prevăzute în prezentele condiții.</Li>
            </ul>
            <p>
              <strong>Mirii sunt singurii responsabili pentru modul în care distribuie invitațiile digitale
              și pentru conținutul pe care îl introduc în platformă.</strong> VibeInvite acționează exclusiv
              ca intermediar tehnic și nu exercită control editorial asupra conținutului creat de Utilizatori.
            </p>
          </Card>

          {/* ART. 5 — INVITATII */}
          <Card no="5" label="Invitații — Utilizatori Fără Cont" title={<>Responsabilitățile <em>Invitaților</em></>}>
            <p>
              Persoanele care accesează platforma prin link public (în calitate de invitați) și care
              utilizează funcționalitățile de RSVP sau upload de fotografii acceptă, prin simpla utilizare,
              următoarele:
            </p>
            <ul className="vt-list">
              <Li>Sunt singurii responsabili pentru conținutul (fotografii, text, date personale) pe care îl transmit prin intermediul platformei.</Li>
              <Li>Garantează că dețin drepturile necesare asupra fotografiilor încărcate și că persoanele care apar în acestea și-au exprimat consimțământul pentru publicare, inclusiv pentru minori.</Li>
              <Li>Nu vor încărca fotografii sau conținut care încalcă drepturi ale terților, conținut ilegal, obscen sau care lezează demnitatea persoanelor.</Li>
              <Li>VibeInvite nu are obligația de a modera, verifica sau elimina în timp real conținutul încărcat de invitați, deși își rezervă dreptul de a face acest lucru.</Li>
            </ul>
            <p>
              <strong>VibeInvite nu poate fi ținut răspunzător pentru conținutul încărcat de invitați,
              inclusiv pentru eventualele încălcări ale drepturilor de autor, dreptului la imagine
              sau ale oricăror alte drepturi ale terților.</strong>
            </p>
          </Card>

          {/* ART. 6 — LIMITARE RASPUNDERE */}
          <Warn
            label="Clauze de Limitare Maximă a Răspunderii"
            title={<>Limitarea <em>Răspunderii</em> VibeInvite</>}
          >
            <p>
              <strong>6.1. Excludere generală.</strong> În limita maximă permisă de legislația aplicabilă,
              VibeInvite exclude orice răspundere pentru prejudicii directe, indirecte, incidentale, speciale,
              punitive sau consecutive, indiferent de cauza acestora, inclusiv pierderi de profit, pierderi
              de date, întreruperea activității sau deteriorarea reputației.
            </p>
            <p>
              <strong>6.2. Conținut terți și AI.</strong> VibeInvite nu răspunde pentru:
            </p>
            <ul className="vt-list" style={{ marginBottom: '12px' }}>
              <Li>Încălcări ale drepturilor de autor, dreptului la imagine sau drepturilor la marcă generate prin utilizarea conținutului AI de pe platformă.</Li>
              <Li>Asemănări ale modelelor vizuale cu opere ale terților, indiferent dacă acestea sunt protejate sau nu.</Li>
              <Li>Conținut fotografic sau textual introdus de Utilizatori sau Invitați.</Li>
              <Li>Utilizarea conținutului platformei în scop personal sau comercial de către Utilizatori.</Li>
              <Li>Consecințele distribuirii invitațiilor de către Miri, inclusiv prelucrarea datelor invitaților.</Li>
            </ul>
            <p>
              <strong>6.3. Servicii terțe.</strong> VibeInvite utilizează servicii externe (Stripe pentru plăți,
              Cloudinary pentru stocarea fotografiilor, Resend pentru email, Neon pentru baze de date, Vercel
              pentru hosting). VibeInvite nu răspunde pentru întreruperile, erorile sau breșele de securitate
              ale acestor servicii terțe.
            </p>
            <p>
              <strong>6.4. Disponibilitate.</strong> VibeInvite nu garantează disponibilitatea neîntreruptă
              a platformei și nu răspunde pentru pierderile cauzate de întreruperi tehnice, mentenanță sau
              evenimente de forță majoră.
            </p>
            <p>
              <strong>6.5. Plafonul răspunderii.</strong> În situațiile în care răspunderea VibeInvite nu poate
              fi exclusă prin lege, aceasta este limitată la suma plătită de Utilizator pentru accesul la
              serviciu, în perioada de 12 luni anterioară producerii prejudiciului.
            </p>
            <p>
              <strong>6.6. Forță majoră.</strong> VibeInvite nu răspunde pentru întârzierea sau imposibilitatea executării obligațiilor sale cauzate de forță majoră sau de împrejurări imprevizibile și inevitabile, incluzând, fără limitare: dezastre naturale, conflicte armate, atacuri cibernetice (DDoS, ransomware), defecțiuni ale furnizorilor de infrastructură cloud (hosting, CDN, baze de date), acte ale autorităților publice sau modificări legislative care împiedică prestarea serviciului. VibeInvite va notifica Utilizatorii afectați în cel mai scurt timp rezonabil posibil și va depune eforturi rezonabile pentru restabilirea serviciului.
            </p>
          </Warn>

          {/* ART. 7 — PLATI */}
          <Card no="7" label="Plăți și Politica de Returnare" title={<>Tarife și <em>Rambursări</em></>}>
            <p>
              Accesul la funcționalitățile complete ale platformei se face contra unui tarif unic, afișat
              la momentul achiziției. Plata se procesează prin Stripe, un furnizor certificat PCI DSS.
              VibeInvite nu colectează și nu stochează datele cardului bancar.
            </p>
            <p>
              <strong>Politica de returnare:</strong> Dat fiind că serviciul este livrat digital și accesul
              la platforma este disponibil imediat după confirmare plăților, dreptul de retractare de 14 zile
              prevăzut de OUG nr. 34/2014 nu se aplică, în conformitate cu art. 16 lit. (m) din actul normativ
              menționat, Utilizatorul consimțind expres la executarea imediată a contractului și renunțând
              la dreptul de retractare.
            </p>
            <p>
              Rambursările pot fi acordate exclusiv la aprecierea VibeInvite, în situații excepționale
              documentate, și nu constituie un drept garantat al Utilizatorului.
            </p>
          </Card>

          {/* ART. 8 — GDPR */}
          <Card no="8" label="Protecția Datelor Personale" title={<>Prelucrarea <em>Datelor</em> — GDPR</>}>
            <p>
              VibeInvite prelucrează datele personale ale Utilizatorilor în calitate de Operator, în
              conformitate cu Regulamentul (UE) 2016/679 (GDPR) și Legea nr. 190/2018.
              Detaliile complete privind prelucrarea datelor sunt disponibile în <strong>Politica de
              Confidențialitate</strong>, accesibilă la www.vibeinvite.ro/politica.
            </p>
            <p>
              <strong>Responsabilitatea Mirilor ca Operatori independenți de date (GDPR Art. 28):</strong> Prin utilizarea funcționalității
              RSVP, Mirii colectează date personale ale invitaților lor (nume, preferințe dietetice, date de
              contact). În această calitate, Mirii acționează ca Operatori independenți și sunt responsabili
              exclusiv pentru conformitatea cu GDPR, inclusiv pentru obținerea consimțământului invitaților,
              informarea acestora și respectarea drepturilor lor. VibeInvite nu poate fi ținut răspunzător
              pentru neconformitățile GDPR ale Mirilor.
            </p>
            <p>
              Datele colectate prin platformă sunt stocate pe servere securizate. Fotografiile încărcate de
              invitați sunt stocate pe Cloudinary și șterse automat după expirarea galeriei (maxim 30 de zile
              de la activare), respectiv la expirarea perioadei de acces a contului.
            </p>
          </Card>

          {/* ART. 9 — PROPRIETATE INTELECTUALA */}
          <Card no="9" label="Proprietate Intelectuală" title={<>Drepturi de <em>Autor</em> și Proprietate</>}>
            <p>
              Platforma VibeInvite.ro, inclusiv codul sursă, interfața, elementele grafice proprii și
              arhitectura tehnică, sunt proprietatea VibeInvite și sunt protejate de legislația privind
              dreptul de autor. Orice reproducere, distribuire sau utilizare neautorizată este interzisă.
            </p>
            <p>
              <strong>Conținut generat cu AI:</strong> Modelele vizuale ale invitațiilor sunt generate integral
              sau parțial cu ajutorul sistemelor de inteligență artificială. VibeInvite nu revendică și nu
              garantează drepturi exclusive de autor asupra acestora și nu poate asigura absența asemănărilor
              cu opere ale terților. Utilizatorul utilizează aceste modele pe propria răspundere.
            </p>
            <p>
              <strong>Conținut introdus de Utilizatori:</strong> Prin introducerea de conținut în platformă
              (texte, fotografii, date), Utilizatorul acordă VibeInvite o licență limitată, neexclusivă și
              revocabilă de stocare și afișare a acestuia exclusiv în scopul furnizării serviciului.
              VibeInvite nu utilizează conținutul Utilizatorilor în scop de marketing fără acordul expres al acestora.
            </p>
          </Card>

          {/* ART. 10 — COOKIES */}
          <Card no="10" label="Cookie-uri și Date Tehnice" title={<><em>Cookie-uri</em> și Sesiuni</>}>
            <p>
              Platforma utilizează cookie-uri tehnice necesare funcționării (inclusiv cookie-ul de sesiune
              <strong> auth_token</strong>, de tip HTTP-only, cu expirare de 24 de ore). Aceste cookie-uri
              sunt esențiale pentru autentificare și nu pot fi dezactivate fără a afecta funcționalitatea.
            </p>
            <p>
              Detaliile complete privind tipurile de cookie-uri utilizate, scopul și opțiunile de gestionare
              sunt disponibile în <strong>Politica Cookie</strong>, accesibilă la www.vibeinvite.ro/cookies.
            </p>
          </Card>

          {/* ART. 11 — MODIFICARI */}
          <Card no="11" label="Modificarea Termenilor" title={<>Actualizarea <em>Documentului</em></>}>
            <p>
              VibeInvite își rezervă dreptul de a modifica prezentele Termeni și Condiții cu o perioadă de preaviz de cel puțin <strong>15 zile calendaristice</strong> față de data intrării în vigoare. Versiunea actualizată va fi publicată pe www.vibeinvite.ro/termeni cu data noii versiuni afișată în antet. Pentru modificări minore (corectare erori, actualizare date de contact), VibeInvite poate opera modificările fără perioadă de preaviz.
            </p>
            <p>
              Continuarea utilizării platformei după data intrării în vigoare a noii versiuni constituie acceptarea tacită a modificărilor. Dacă nu ești de acord cu noile condiții, ai dreptul de a solicita ștergerea contului înainte de data intrării în vigoare. Vă recomandăm să verificați periodic acest document.
            </p>
          </Card>

          {/* ART. 12 — INCETARE */}
          <Card no="12" label="Suspendare și Încetare" title={<>Suspendarea <em>Accesului</em></>}>
            <p>
              VibeInvite poate suspenda sau înceta accesul la platformă al oricărui Utilizator, cu sau fără notificare prealabilă în funcție de gravitatea situației, și fără obligația de restituire a tarifului plătit, în cazul în care:
            </p>
            <ul className="vt-list">
              <Li>Utilizatorul încalcă prezentele Termeni și Condiții.</Li>
              <Li>Utilizatorul distribuie conținut ilegal, obscen sau care lezează drepturile terților.</Li>
              <Li>Există suspiciuni rezonabile de fraudă sau utilizare abuzivă a platformei.</Li>
              <Li>Este necesară conformarea cu cerințe legale sau judiciare.</Li>
            </ul>
            <p>
              La expirarea perioadei de acces (12 luni de la activare), datele Utilizatorului și ale
              invitaților săi vor fi șterse automat, conform politicilor tehnice ale platformei.
            </p>
          </Card>

          {/* ART. 13 — LEGEA APLICABILA */}
          <Card no="13" label="Lege Aplicabilă și Jurisdicție" title={<>Drept <em>Aplicabil</em></>}>
            <p>
              Prezentele Termeni și Condiții sunt guvernate de legislația română, inclusiv de dispozițiile
              Codului Civil, OUG nr. 34/2014 privind drepturile consumatorilor și Regulamentul (UE) 2016/679 (GDPR).
            </p>
            <p>
              Orice litigiu izvorât din sau în legătură cu prezentele condiții va fi soluționat pe cale
              amiabilă. În lipsa unei soluții amiabile, competența revine instanțelor judecătorești
              din România, de la sediul Operatorului.
            </p>
            <p>
              Utilizatorii consumatori au dreptul de a recurge la platformele de soluționare alternativă
              a litigiilor, inclusiv platforma europeană ODR accesibilă la{' '}
              <strong>ec.europa.eu/consumers/odr</strong>.
            </p>
          </Card>

          {/* ART. 14 — DISCLAIMER FINAL */}
          <Warn
            label="Disclaimer General — Serviciu As-Is"
            title={<>Acceptarea <em>Riscurilor</em> de către Utilizator</>}
          >
            <p>
              <strong>PLATFORMA VIBEINVITE.RO ESTE FURNIZATĂ „CA ATARE" (AS-IS) ȘI „ÎN MĂSURA
              DISPONIBILITĂȚII" (AS-AVAILABLE).</strong> VibeInvite nu oferă garanții de nicio natură,
              exprese sau implicite, inclusiv, fără limitare:
            </p>
            <ul className="vt-list" style={{ marginBottom: '12px' }}>
              <Li>Garanții privind funcționarea neîntreruptă sau fără erori a platformei.</Li>
              <Li>Garanții privind originalitatea, unicitatea sau legalitatea modelelor vizuale generate cu AI.</Li>
              <Li>Garanții privind absența drepturilor terților asupra conținutului disponibil pe platformă.</Li>
              <Li>Garanții privind acuratețea, completitudinea sau adecvarea conținutului generat automat.</Li>
              <Li>Garanții privind compatibilitatea platformei cu toate dispozitivele sau browserele.</Li>
            </ul>
            <p>
              <strong>Utilizatorul recunoaște că utilizează platforma exclusiv pe propria răspundere</strong>
              și că VibeInvite nu poate fi ținut răspunzător pentru niciun prejudiciu direct sau indirect
              rezultat din utilizarea sau imposibilitatea utilizării serviciului.
            </p>
          </Warn>

          {/* OPERATOR BOX */}
          <div className="vt-operator">
            <strong>MURGU ADRIAN PERSOANĂ FIZICĂ AUTORIZATĂ</strong>
            Aleea Parcului nr. 7, et. 9, Ap. 1, Municipiul Onești, Județul Bacău, România
            <br />
            Email: office@vibeinvite.ro &nbsp;·&nbsp; Web: www.vibeinvite.ro
            <br /><br />
            Versiunea 1.0 intrată în vigoare la <strong>20.05.2026</strong>. Versiunea 1.1 actualizată la <strong>26.06.2026</strong>, intră în vigoare la <strong>11.07.2026</strong>.
            Orice versiune anterioară este înlocuită integral de prezentul document la data intrării în vigoare.
          </div>

        </div>
      </div>
    </>
  )
}
