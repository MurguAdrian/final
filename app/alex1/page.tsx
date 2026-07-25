// app/abonament-curatare-panouri/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

type Tier = {
  name: string;
  price: string;
  tagline: string;
  color: string;
  glow: string;
  features: string[];
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Bronze",
    price: "149",
    tagline: "Verificarea de bază, făcută corect",
    color: "#B5793B",
    glow: "rgba(181,121,59,0.45)",
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
    name: "Silver",
    price: "349",
    tagline: "Monitorizare activă, intervenție rapidă",
    color: "#9CA3AF",
    glow: "rgba(156,163,175,0.45)",
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
    name: "Gold",
    price: "649",
    tagline: "Performanță maximizată, fără compromis",
    color: "#E8B84B",
    glow: "rgba(232,184,75,0.55)",
    highlight: true,
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
    name: "Platinum",
    price: "999",
    tagline: "Liniște totală, control complet",
    color: "#2BD9C9",
    glow: "rgba(43,217,201,0.5)",
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
      { threshold: 0.15 }
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

function Particles() {
  const dots = Array.from({ length: 26 });
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((_, i) => {
        const left = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 12;
        const delay = Math.random() * 10;
        return (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function SunRays() {
  return (
    <svg className={styles.sunRays} viewBox="0 0 200 200">
      <g className={styles.spinSlow} style={{ transformOrigin: "100px 100px" }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <rect
            key={i}
            x="99"
            y="0"
            width="2"
            height="90"
            fill="#2BD9C9"
            transform={`rotate(${i * 15} 100 100)`}
          />
        ))}
      </g>
    </svg>
  );
}

function WaveDivider() {
  return (
    <div className={styles.wave}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path d="M0,40 C300,90 900,-10 1200,40 L1200,80 L0,80 Z" fill="#0A3D38" />
      </svg>
    </div>
  );
}

export default function AbonamentCuratarePanouri() {
  const [billing, setBilling] = useState<"anual" | "lunar">("anual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className={styles.main}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <svg width="34" height="24" viewBox="0 0 34 24" fill="none">
              <path
                d="M1 18C6 6 10 6 14 18C18 30 22 6 26 6C29 6 31 12 33 18"
                stroke="#2BD9C9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className={styles.logoText}>
              SINUS <span className={styles.accent}>CARE</span>
            </span>
          </div>
          <a href="tel:+40758734009" className={styles.headerCta}>
            +4 0758 734 009
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <SunRays />
        <Particles />
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={`${styles.dot} ${styles.pulseDot}`} />
            Preview pilot &middot; Sinus Energy
          </div>
          <h1 className={styles.heroTitle}>
            Panourile tale merită
            <br />
            <span className={styles.shimmerText}>mai mult decât o privire.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Abonamente de mentenanță pentru sisteme fotovoltaice și instalații
            electrice. Monitorizare, curățare, intervenție &mdash; înainte să
            devină problemă.
          </p>
          <div className={styles.heroButtons}>
            <a href="#pachete" className={`${styles.btnPrimary} ${styles.pulseGlow}`}>
              Vezi pachetele
            </a>
            <a href="#comparatie" className={styles.btnSecondary}>
              De ce SINUS CARE?
            </a>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {[
            ["237", "Proiecte"],
            ["23200", "KW instalați"],
            ["173", "Clienți"],
            ["4", "Nivele de grijă"],
          ].map(([num, label], i) => (
            <Reveal key={label} delay={i * 100} className={styles.statItem}>
              <div className={styles.statNum}>{num}</div>
              <div className={styles.statLabel}>{label}</div>
            </Reveal>
          ))}
        </div>

        <div className={`${styles.scrollHint} ${styles.bounce}`}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 4v16m0 0l-6-6m6 6l6-6"
              stroke="#2BD9C9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <section id="pachete" className={`${styles.section} ${styles.sectionAlt}`}>
        <Reveal className={styles.sectionHead}>
          <span className={styles.eyebrowTeal}>Pachetele SINUS CARE</span>
          <h2 className={styles.sectionTitle}>Alege nivelul de liniște</h2>
          <p className={styles.sectionText}>
            De la verificarea de bază la protecție completă pentru sistem și
            instalație electrică.
          </p>
        </Reveal>

        <Reveal delay={100} className={styles.toggleWrap}>
          <div className={styles.toggle}>
            <button
              onClick={() => setBilling("anual")}
              className={`${styles.toggleBtn} ${billing === "anual" ? styles.toggleBtnActive : ""}`}
            >
              Anual
            </button>
            <button
              onClick={() => setBilling("lunar")}
              className={`${styles.toggleBtn} ${billing === "lunar" ? styles.toggleBtnActive : ""}`}
            >
              Lunar &minus;12%
            </button>
          </div>
        </Reveal>

        <div className={styles.pricingGrid}>
          {tiers.map((tier, i) => {
            const priceNum =
              billing === "lunar"
                ? Math.round((parseInt(tier.price) / 12) * 1.14)
                : parseInt(tier.price);
            return (
              <Reveal key={tier.name} delay={i * 120}>
                <div
                  className={`${styles.card} ${tier.highlight ? styles.cardHighlight : ""}`}
                  style={{ boxShadow: tier.highlight ? `0 0 50px ${tier.glow}` : undefined }}
                >
                  {tier.highlight && <div className={styles.cardBadge}>Cel mai ales</div>}
                  <div
                    className={styles.cardIcon}
                    style={{ backgroundColor: `${tier.color}22`, border: `1px solid ${tier.color}55` }}
                  >
                    <span className={styles.cardIconDot} style={{ backgroundColor: tier.color }} />
                  </div>
                  <h3 className={styles.cardName}>{tier.name}</h3>
                  <p className={styles.cardTagline}>{tier.tagline}</p>
                  <div className={styles.cardPrice}>
                    <span className={styles.cardPriceNum}>{priceNum}</span>
                    <span className={styles.cardPriceCurrency}>lei</span>
                    <span className={styles.cardPricePeriod}>
                      /{billing === "anual" ? "an" : "lună"}
                    </span>
                  </div>
                  <ul className={styles.cardFeatures}>
                    {tier.features.map((f) => (
                      <li key={f} className={styles.cardFeatureItem}>
                        <svg
                          className={styles.cardFeatureIcon}
                          style={{ color: tier.color }}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={styles.cardBtn}
                    style={{
                      backgroundColor: tier.highlight ? tier.color : "transparent",
                      color: tier.highlight ? "#06302C" : tier.color,
                      border: `1.5px solid ${tier.color}`,
                    }}
                  >
                    Alege {tier.name}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <WaveDivider />

      <section className={`${styles.section} ${styles.sectionBase}`} style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className={styles.extrasWrap}>
          <Reveal className={styles.sectionHead}>
            <span className={styles.eyebrowGold}>À la carte</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: 36 }}>
              Servicii suplimentare
            </h2>
          </Reveal>
          <div className={styles.extrasList}>
            {extras.map((e, i) => (
              <Reveal key={e} delay={i * 60}>
                <div className={styles.extraChip}>{e}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="comparatie" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.compareWrap}>
          <Reveal className={styles.sectionHead}>
            <span className={styles.eyebrowTeal}>Diferența</span>
            <h2 className={styles.sectionTitle}>SINUS CARE vs. piața din România</h2>
          </Reveal>

          <Reveal>
            <div className={styles.compareTable}>
              <div className={styles.compareHead}>
                <div className={styles.compareCell}>Serviciu</div>
                <div className={styles.compareCellCenter} style={{ color: "rgba(255,255,255,0.5)" }}>
                  Piață
                </div>
                <div className={styles.compareCellCenterLast} style={{ color: "#2BD9C9" }}>
                  SINUS CARE
                </div>
              </div>
              {compare.map((row, i) => (
                <div
                  key={row.label}
                  className={`${styles.compareRow} ${i % 2 === 0 ? styles.compareRowAlt : ""}`}
                >
                  <div className={styles.compareCell}>{row.label}</div>
                  <div className={styles.compareCellCenter}>
                    {row.market ? (
                      <span className={styles.checkMuted}>&#10003;</span>
                    ) : (
                      <span className={styles.dashMuted}>&#8212;</span>
                    )}
                  </div>
                  <div className={styles.compareCellCenterLast}>
                    {row.sinus ? (
                      <span className={styles.checkCircle}>&#10003;</span>
                    ) : (
                      <span className={styles.dashMuted}>&#8212;</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

<section className={`${styles.section} ${styles.sectionBase}`}>
        <div className={styles.faqWrap}>
          <Reveal className={styles.sectionHead}>
            <span className={styles.eyebrowGold}>Întrebări</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: 36 }}>
              Ce mai vrei să știi
            </h2>
          </Reveal>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <div className={styles.faqItem}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={styles.faqBtn}
                  >
                    {f.q}
                    <span className={`${styles.faqPlus} ${openFaq === i ? styles.faqPlusOpen : ""}`}>
                      +
                    </span>
                  </button>
                  <div className={`${styles.faqAnswerWrap} ${openFaq === i ? styles.faqAnswerWrapOpen : ""}`}>
                    <div className={styles.faqAnswerInner}>
                      <p className={styles.faqAnswer}>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <Particles />
        <Reveal className={`${styles.ctaContent} ${styles.tiltFloat}`}>
          <h2 className={styles.ctaTitle}>Programează prima verificare</h2>
          <p className={styles.ctaText}>
            Un tehnician SINUS ENERGY îți evaluează gratuit sistemul și îți
            recomandă pachetul potrivit.
          </p>
          <div className={styles.ctaButtons}>
            <a href="tel:+40758734009" className={styles.btnPrimary}>
              Sună acum &middot; 0758 734 009
            </a>
            <a href="mailto:office@sinusenergy.ro" className={styles.btnSecondary}>
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