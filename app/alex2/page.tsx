// app/alex2/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

type Tier = {
  index: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    index: "01",
    name: "Bronze",
    price: "149",
    tagline: "Verificarea de bază, făcută corect",
    features: [
      "Verificare anuală completă",
      "Inspecție vizuală sistem",
      "Verificare invertor",
      "Parametri AC/DC",
      "Raport de sănătate",
      "Reducere la manoperă",
    ],
  },
  {
    index: "02",
    name: "Silver",
    price: "349",
    tagline: "Monitorizare activă, intervenție rapidă",
    features: [
      "Tot din Bronze",
      "Monitorizare lunară",
      "Alertă producție",
      "Curățare filtre invertor",
      "Verificare împământare & protecții",
      "Intervenție prioritară",
    ],
  },
  {
    index: "03",
    name: "Gold",
    price: "649",
    tagline: "Performanță maximizată, fără compromis",
    featured: true,
    features: [
      "Tot din Silver",
      "Spălare profesională anuală",
      "Termografiere",
      "Verificare baterii",
      "Optimizare parametri",
      "Analiză de performanță",
      "1 intervenție gratuită / an",
    ],
  },
  {
    index: "04",
    name: "Platinum",
    price: "999",
    tagline: "Liniște totală, control complet",
    features: [
      "Tot din Gold",
      "2 spălări / an",
      "Monitorizare proactivă",
      "Analize trimestriale",
      "2 intervenții gratuite / an",
      "Verificare completă instalație electrică",
      "Măsurători PRAM",
      "Suport prioritar 24/7",
    ],
  },
];

const extras = [
  "Spălări suplimentare",
  "Termografiere",
  "Protecție anti-porumbei",
  "Actualizări firmware",
  "Verificări post furtună / grindină",
  "Revizii instalații electrice",
  "Service stații EV",
];

const compare = [
  { label: "Verificare anuală", market: true, sinus: true },
  { label: "Inspecție vizuală", market: true, sinus: true },
  { label: "Verificare invertor", market: true, sinus: true },
  { label: "Actualizări firmware", market: true, sinus: true },
  { label: "Spălare panouri", market: false, sinus: true },
  { label: "Monitorizare proactivă", market: false, sinus: true },
  { label: "Raport anual detaliat", market: false, sinus: true },
  { label: "Verificare instalație electrică", market: false, sinus: true },
  { label: "Suport dosar prosumator", market: false, sinus: true },
  { label: "Dosar tehnic digital", market: false, sinus: true },
  { label: "Verificări post fenomene meteo", market: false, sinus: true },
  { label: "Preluare mentenanță de la alte firme", market: false, sinus: true },
];

const faqs = [
  {
    q: "Ce se întâmplă dacă sistemul meu a fost instalat de altă firmă?",
    a: "Preluăm sistemul în mentenanță indiferent de firma care l-a instalat, după o verificare inițială gratuită a stării actuale.",
  },
  {
    q: "Pot schimba pachetul pe parcurs?",
    a: "Da, poți urca sau coborî nivelul de abonament oricând, diferența se recalculează proporțional cu perioada rămasă.",
  },
  {
    q: "Ce include raportul de sănătate al sistemului?",
    a: "Parametri de producție, randament comparat cu producția estimată, stare invertor, alarme înregistrate și recomandări tehnice.",
  },
  {
    q: "Cum funcționează intervenția prioritară?",
    a: "Abonații Silver, Gold și Platinum au timp de răspuns redus și programare cu prioritate față de clienții fără abonament.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Alex2Page() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className={`${styles.main} alex2Page`}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <span className={styles.logo}>
          SINUS <span className={styles.logoAccent}>CARE</span>
        </span>
        <a href="tel:+40758734009" className={styles.headerPhone}>
          0758 734 009
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroLabel}>Sinus Energy &middot; Mentenanță fotovoltaică</div>
        <h1 className={styles.heroTitle}>
          Sistemul tău are nevoie de <em>grijă</em>, nu doar de garanție.
        </h1>
        <p className={styles.heroText}>
          Patru abonamente de mentenanță pentru panouri fotovoltaice și
          instalații electrice, gândite să prevină problema înainte să apară.
        </p>
        <div className={styles.heroActions}>
          <a href="#pachete" className={styles.btnMain}>
            Vezi abonamentele
          </a>
          <a href="#comparatie" className={styles.btnGhost}>
            De ce SINUS CARE
          </a>
        </div>

        <Reveal className={styles.heroFigure} delay={150}>
          <div className={styles.heroFigureBar}>
            <div className={styles.heroStat}>
              <div className={styles.heroStatNum}>237</div>
              <div className={styles.heroStatLabel}>Proiecte</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatNum}>23.200</div>
              <div className={styles.heroStatLabel}>KW instalați</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatNum}>173</div>
              <div className={styles.heroStatLabel}>Clienți</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatNum}>4</div>
              <div className={styles.heroStatLabel}>Nivele de grijă</div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="pachete" className={styles.section}>
        <Reveal className={styles.sectionHead}>
          <div className={styles.eyebrow}>Pachete</div>
          <h2 className={styles.sectionTitle}>Alege nivelul de mentenanță</h2>
          <p className={styles.sectionText}>
            De la verificarea anuală de bază, până la protecția completă a
            sistemului și a instalației electrice.
          </p>
        </Reveal>

        <div className={styles.pricingList}>
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90}>
              <div className={`${styles.tier} ${tier.featured ? styles.tierFeatured : ""}`}>
                <div>
                  <div className={styles.tierIndex}>{tier.index}</div>
                  <div className={styles.tierName}>{tier.name}</div>
                  <div className={styles.tierTagline}>{tier.tagline}</div>
                </div>
                <ul className={styles.tierFeatures}>
                  {tier.features.map((f) => (
                    <li key={f} className={styles.tierFeatureItem}>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={styles.tierPriceCol}>
                  <div>
                    <span className={styles.tierPrice}>{tier.price} lei</span>
                    <div className={styles.tierPriceUnit}>facturat anual</div>
                  </div>
                  <span className={styles.tierCta}>Alege</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className={styles.sectionAlt}>
        <div className={styles.sectionAltInner}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.eyebrow}>À la carte</div>
            <h2 className={styles.sectionTitle}>Servicii suplimentare</h2>
          </Reveal>
          <Reveal>
            <div className={styles.extrasGrid}>
              {extras.map((e) => (
                <div key={e} className={styles.extraCell}>
                  <span className={styles.extraMark}>—</span>
                  {e}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <section id="comparatie" className={styles.section}>
        <Reveal className={styles.sectionHead}>
          <div className={styles.eyebrow}>Diferența</div>
          <h2 className={styles.sectionTitle}>SINUS CARE vs. piața din România</h2>
          <p className={styles.sectionText}>
            Majoritatea firmelor se opresc la verificarea de bază. Noi mergem
            mai departe, spre performanță și prevenție reală.
          </p>
        </Reveal>

        <Reveal>
          <div className={styles.compareTable}>
            <div className={styles.compareHeadRow}>
              <div className={styles.compareHeadCell}>Serviciu</div>
              <div className={styles.compareHeadCell}>Piață</div>
              <div className={styles.compareHeadCell}>Sinus Care</div>
            </div>
            {compare.map((row) => (
              <div key={row.label} className={styles.compareRow}>
                <div className={styles.compareLabelCell}>{row.label}</div>
                <div className={styles.compareValCell}>
                  {row.market ? "da" : "—"}
                </div>
                <div className={styles.compareValCell}>
                  {row.sinus ? <span className={styles.compareValYes}>da</span> : "—"}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div className={styles.sectionAlt}>
        <div className={styles.sectionAltInner}>
          <Reveal className={styles.sectionHead}>
            <div className={styles.eyebrow}>Întrebări</div>
            <h2 className={styles.sectionTitle}>Ce mai vrei să știi</h2>
          </Reveal>
          <Reveal>
            <div className={styles.faqList}>
              {faqs.map((f, i) => (
                <div key={f.q} className={styles.faqItem}>
                  <button
                    className={styles.faqBtn}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <span className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ""}`}>
                      +
                    </span>
                  </button>
                  <div className={`${styles.faqAnswerWrap} ${openFaq === i ? styles.faqAnswerWrapOpen : ""}`}>
                    <div className={styles.faqAnswerInner}>
                      <p className={styles.faqAnswer}>{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <section className={styles.ctaSection}>
        <Reveal>
          <h2 className={styles.ctaTitle}>Programează prima verificare</h2>
          <p className={styles.ctaText}>
            Un tehnician SINUS ENERGY îți evaluează gratuit sistemul și îți
            recomandă pachetul potrivit.
          </p>
          <div className={styles.ctaActions}>
            <a href="tel:+40758734009" className={styles.btnMain}>
              Sună acum &middot; 0758 734 009
            </a>
            <a href="mailto:office@sinusenergy.ro" className={styles.btnGhost}>
              office@sinusenergy.ro
            </a>
          </div>
        </Reveal>
      </section>

      <footer className={styles.footer}>
        &copy; 2025 Sinus Energy &middot; S.C. Sinus Electro S.R.L. &middot;
        Onești, Județul Bacău
      </footer>
    </main>
  );
}