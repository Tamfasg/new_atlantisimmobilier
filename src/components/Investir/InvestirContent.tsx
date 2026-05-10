"use client";

import { M } from "@/components/motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FAQS,
  FINANCEMENT_OPTIONS,
  GARANTIES,
  INVESTISSEUR_ETUDE,
  INVESTISSEUR_POURQUOI,
  MRE_FEATURES,
  PARCOURS_STEPS,
  parcoursCards,
  RESIDENCE_ITEMS,
} from "../../app/data/investir";
import { Btn } from "./InvestirBtn";
import {
  Body,
  Bracket,
  EmeraldRule,
  GoldRule,
  H2,
  Tag,
} from "./InvestriHelper";
import { FaqItem } from "./InvestirFAQ";
import { GeoHex, GeoRings } from "./InvestirIcons";
import InvestirForm from "./InvestirForm";

gsap.registerPlugin(ScrollTrigger);

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const sectionClass =
  "relative overflow-hidden px-[clamp(1.5rem,6vw,5rem)] py-[clamp(4rem,10vw,7rem)]";
const twoColumnClass =
  "relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[clamp(2.5rem,6vw,5rem)]";

const InvestirContent = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | undefined;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        if (heroRef.current && heroTextRef.current) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            })
            .to(heroTextRef.current, { y: -75, opacity: 0, ease: "none" }, 0)
            .to(heroOverlayRef.current, { opacity: 0, ease: "none" }, 0);
        }

        gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: -70 },
            {
              opacity: 1,
              x: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: 70 },
            {
              opacity: 1,
              x: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".stagger-item").forEach((el) => {
          const dir = el.dataset.dir === "right" ? 1 : -1;
          const delay = parseFloat(el.dataset.delay || "0");

          gsap.fromTo(
            el,
            { opacity: 0, x: dir * 55 },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
              delay,
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <main className="relative w-screen overflow-x-hidden bg-[#060F0D] font-calibri text-[#F5F0E8] selection:bg-[rgba(201,169,110,0.28)] selection:text-[#F5F0E8]">
      <section
        ref={heroRef}
        className="relative flex h-screen w-screen items-end max-sm:items-center overflow-hidden bg-[url('/assets/projects/PESSAC/2.jpeg')] bg-cover bg-[center_25%] pb-[clamp(3.5rem,9vw,6rem)]"
      >
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,15,13,1)_0%,rgba(11,43,38,0.82)_45%,rgba(11,43,38,0.15)_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,15,13,0.7)_0%,transparent_60%)]" />

        <M.div
          className="absolute left-0 top-0 h-0.5 bg-[linear-gradient(to_right,transparent,#C9A96E,transparent)]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 0.8 }}
          transition={{ duration: 2.5, delay: 0.3 }}
        />

        <M.div
          className="absolute left-[clamp(1rem,4vw,2.5rem)] top-0 w-px bg-[rgba(201,169,110,0.22)]"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        <div className="pointer-events-none absolute right-[clamp(1.5rem,5vw,3rem)] top-[clamp(1.5rem,5vw,3rem)]">
          <M.div
            initial={{ opacity: 0, rotate: -15 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            <GeoHex
              className="h-[15vw] w-[15vw] min-h-[60px] min-w-[60px] max-h-[120px] max-w-[120px]"
              color="#C9A96E"
              opacity={0.14}
            />
          </M.div>
        </div>

        <div
          ref={heroTextRef}
          className="relative z-10 w-full px-[clamp(1.5rem,6vw,5rem)]"
        >
          <M.p
            className="mb-[clamp(0.8rem,2vw,1.2rem)] font-calibri text-[clamp(10px,3vw,13px)] font-bold uppercase tracking-[0.42em] text-[#C9A96E]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Investir
          </M.p>

          <M.h1
            className="mb-[clamp(1rem,3vw,1.8rem)] max-w-[min(900px,90vw)] font-georgia text-[clamp(3.1rem,8vw,7.5rem)] leading-[1.03] font-semibold italic text-[#F5F0E8]"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.05, delay: 0.6 }}
          >
            Acquérir avec méthode.
            <br />
            <span className="text-[#C9A96E]">Investir avec sens.</span>
          </M.h1>

          <M.div
            className="max-w-[min(640px,90vw)]"
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
          >
            <Body>
              Acheter un bien immobilier au Maroc engage. Nous le savons, et
              nous accompagnons chaque acquéreur comme s’il s’agissait de notre
              propre famille.
            </Body>
          </M.div>
        </div>

        <M.div
          className="absolute bottom-[clamp(1.5rem,4vw,2.5rem)] right-[clamp(1.5rem,4vw,2.5rem)] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-[rgba(245,240,232,0.25)]">
            Défiler
          </span>
          <M.div
            className="h-9 w-px origin-top bg-[linear-gradient(to_bottom,#C9A96E,transparent)]"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.1 }}
          />
        </M.div>
      </section>

      <section className={cx(sectionClass, "bg-[#0B2B26]")}>
        <div className="pointer-events-none absolute right-[clamp(-3rem,-8vw,-1.5rem)] top-1/2 -translate-y-1/2">
          <GeoRings size={280} color="#2E7D6A" opacity={0.08} />
        </div>

        <div className="reveal-left mb-[clamp(2.5rem,6vw,4rem)] opacity-0">
          <Tag>Choisir votre parcours</Tag>
          <H2>Vous êtes…</H2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(1rem,3vw,1.5px)] bg-[rgba(46,125,106,0.18)]">
          {parcoursCards.map((card, index) => (
            <a key={card.id} href={`#${card.id}`} className="no-underline">
              <div
                className="stagger-item relative flex min-h-[clamp(180px,30vw,240px)] cursor-pointer flex-col justify-between bg-[#0B2B26] p-[clamp(2rem,5vw,3rem)] opacity-0 transition-colors duration-[400ms] hover:bg-[#1A4A42]"
                data-dir={card.dir}
                data-delay={`${index * 0.15}`}
              >
                <Bracket pos="tl" />
                <Bracket pos="br" />
                <div>
                  <h3 className="mb-3 font-georgia text-[clamp(1.2rem,3.5vw,1.6rem)] leading-[1.25] font-normal italic text-[#F5F0E8]">
                    {card.title}
                  </h3>
                  <Body opacity={0.5}>{card.desc}</Body>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="font-calibri text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">
                    Voir
                  </span>
                  <div className="h-px w-[30px] bg-[#C9A96E] opacity-60" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <GoldRule />

      <section id="residence" className={cx(sectionClass, "bg-[#060F0D]")}>
        <div className="pointer-events-none absolute left-[clamp(-3rem,-8vw,-1.5rem)] top-12">
          <GeoRings size={240} color="#C9A96E" opacity={0.06} />
        </div>

        <div className={twoColumnClass}>
          <div>
            <div className="reveal-left opacity-0">
              <Tag>Acquérir sa résidence principale</Tag>
              <H2 className="mb-[clamp(1.5rem,4vw,2rem)]">
                Choisir où vivre, et y rester.
              </H2>
              <Body className="mb-5">
                Pour une résidence principale, le bon programme n’est pas
                seulement celui qui plaît au moment de la visite. C’est celui
                qui s’adapte à la vie qui vient : la famille qui s’agrandit, les
                enfants qui grandissent, le quartier qui évolue.
              </Body>
              <Body opacity={0.42} className="mb-[clamp(1.5rem,4vw,2rem)]">
                Nous vous aidons à faire ce choix avec la bonne perspective.
              </Body>
            </div>
            
          </div>

          <div>
            <p className="reveal-right mb-6 font-calibri text-[11px] font-bold uppercase tracking-[0.35em] text-[rgba(245,240,232,0.3)] opacity-0">
              Ce que nous regardons avec vous
            </p>
            {RESIDENCE_ITEMS.map((item, index) => (
              <div
                key={item}
                className="stagger-item flex items-start gap-4 border-b border-[rgba(46,125,106,0.18)] py-[clamp(0.9rem,2.5vw,1.3rem)] opacity-0"
                data-dir="right"
                data-delay={`${index * 0.1}`}
              >
                <span className="mt-2 shrink-0 text-[0.6rem] text-[#C9A96E]">
                  ◆
                </span>
                <Body opacity={0.58}>{item}</Body>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmeraldRule />

      <section id="investisseur" className={cx(sectionClass, "bg-[#0B2B26]")}>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,transparent_50%,rgba(46,125,106,0.06)_50%)]" />

        <div className="reveal-left relative mb-[clamp(2.5rem,6vw,4rem)] opacity-0">
          <Tag>Investir dans la pierre marocaine</Tag>
          <H2>Investir, c’est une décision de long terme.</H2>
        </div>

        <div className={twoColumnClass}>
          <div>
            <div className="reveal-left opacity-0">
              <Body className="mb-5">
                L’immobilier marocain offre, à qui sait choisir, un rapport
                rendement/sécurité parmi les plus intéressants de la région.
                Encore faut-il sélectionner le bon emplacement, la bonne
                typologie, et le bon promoteur.
              </Body>
              <Body opacity={0.42} className="mb-[clamp(1.5rem,4vw,2rem)]">
                Notre rôle est de vous éviter les erreurs coûteuses et de vous
                aider à construire une stratégie patrimoniale cohérente.
              </Body>
            </div>
            <p className="reveal-left mb-5 mt-[clamp(1rem,3vw,2rem)] font-calibri text-[11px] font-bold uppercase tracking-[0.35em] text-[rgba(245,240,232,0.3)] opacity-0">
              Ce que nous étudions ensemble
            </p>
            {INVESTISSEUR_ETUDE.map((item, index) => (
              <div
                key={item}
                className="stagger-item flex items-start gap-4 border-b border-[rgba(46,125,106,0.18)] py-[clamp(0.8rem,2vw,1.1rem)] opacity-0"
                data-dir="left"
                data-delay={`${index * 0.09}`}
              >
                <span className="mt-2 shrink-0 text-[0.6rem] text-[#C9A96E]">
                  ◆
                </span>
                <Body opacity={0.55}>{item}</Body>
              </div>
            ))}
            
          </div>

          <div>
            <p className="reveal-right mb-6 font-calibri text-[11px] font-bold uppercase tracking-[0.35em] text-[rgba(245,240,232,0.3)] opacity-0">
              Pourquoi Atlantis pour investir
            </p>
            <div className="relative">
              <Bracket pos="tl" />
              <Bracket pos="br" />
              <div className="border border-[rgba(46,125,106,0.2)] p-[clamp(1.5rem,4vw,2rem)]">
                {INVESTISSEUR_POURQUOI.map((item, index) => (
                  <div
                    key={item}
                    className={cx(
                      "stagger-item flex items-start gap-4 py-[clamp(0.9rem,2.5vw,1.3rem)] opacity-0",
                      index < INVESTISSEUR_POURQUOI.length - 1 &&
                        "border-b border-[rgba(46,125,106,0.15)]",
                    )}
                    data-dir="right"
                    data-delay={`${index * 0.1}`}
                  >
                    <span className="mt-2 shrink-0 text-[0.6rem] text-[#C9A96E]">
                      ◆
                    </span>
                    <Body opacity={0.6}>{item}</Body>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldRule />

      <section className={cx(sectionClass, "bg-[#060F0D]")}>
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] bg-[linear-gradient(to_bottom,transparent,#C9A96E_30%,#C9A96E_70%,transparent)] opacity-[0.35]" />

        <div className={twoColumnClass}>
          <div>
            <div className="reveal-left opacity-0">
              <Tag color="#2E7D6A">Marocains du monde — Cellule MRE</Tag>
              <H2 className="mb-[clamp(1.5rem,4vw,2rem)]">
                Investir au Maroc depuis l’étranger.
              </H2>
              <Body className="mb-5">
                Vous vivez à l’étranger et vous souhaitez acquérir au Maroc —
                pour préparer un retour, pour rester ancré, pour transmettre.
                Notre cellule MRE est dimensionnée pour vous : visites
                virtuelles, signatures à distance, suivi par un interlocuteur
                dédié, gestion locative déléguée.
              </Body>
              <Body opacity={0.42} className="mb-[clamp(1.5rem,4vw,2rem)]">
                La distance ne doit pas être un obstacle à un investissement
                juste.
              </Body>
              
            </div>
          </div>

          <div>
            <p className="reveal-right mb-6 font-calibri text-[11px] font-bold uppercase tracking-[0.35em] text-[rgba(46,125,106,0.7)] opacity-0">
              Services dédiés
            </p>
            {MRE_FEATURES.map((feature, index) => (
              <div
                key={feature}
                className="stagger-item flex items-start gap-4 border-b border-[rgba(46,125,106,0.18)] py-[clamp(0.9rem,2.5vw,1.3rem)] opacity-0"
                data-dir="right"
                data-delay={`${index * 0.09}`}
              >
                <span className="mt-2 shrink-0 text-[0.6rem] text-[#2E7D6A]">
                  ◆
                </span>
                <Body opacity={0.58}>{feature}</Body>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmeraldRule />

      <section className={cx(sectionClass, "bg-[#0B2B26]")}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(46,125,106,0.13)_1px,transparent_1px)] [background-size:clamp(22px,4vw,36px)_clamp(22px,4vw,36px)]" />

        <div className="reveal-left relative mb-[clamp(2.5rem,6vw,4rem)] opacity-0">
          <Tag>Le parcours d’acquisition</Tag>
          <H2>Comment se passe un achat chez Atlantis.</H2>
        </div>

        <div className="relative">
          {PARCOURS_STEPS.map((step, index) => (
            <div
              key={step.n}
              className={cx(
                "stagger-item grid grid-cols-[clamp(50px,10vw,90px)_1fr] items-start gap-[clamp(1rem,3vw,2rem)] py-[clamp(1.5rem,4vw,2.2rem)] opacity-0",
                index < PARCOURS_STEPS.length - 1 &&
                  "border-b border-[rgba(46,125,106,0.2)]",
              )}
              data-dir={index % 2 === 0 ? "left" : "right"}
              data-delay={`${index * 0.08}`}
            >
              <div className="flex flex-col items-center gap-1.5 pt-1">
                <div className="flex h-[clamp(32px,6vw,44px)] w-[clamp(32px,6vw,44px)] shrink-0 items-center justify-center border border-[rgba(201,169,110,0.35)]">
                  <span className="font-calibri text-[clamp(10px,2.5vw,12px)] font-bold tracking-[0.15em] text-[rgba(201,169,110,0.65)]">
                    {step.n}
                  </span>
                </div>
                {index < PARCOURS_STEPS.length - 1 && (
                  <div className="h-[clamp(30px,6vw,50px)] w-px bg-[linear-gradient(to_bottom,rgba(201,169,110,0.3),transparent)]" />
                )}
              </div>
              <div>
                <h3 className="mb-2 font-georgia text-[clamp(1.1rem,3vw,1.4rem)] leading-[1.3] font-normal italic text-[#F5F0E8]">
                  {step.title}
                </h3>
                <Body opacity={0.5}>{step.desc}</Body>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GoldRule />

      <section className={cx(sectionClass, "bg-[#060F0D]")}>
        <div className="mb-[clamp(2.5rem,6vw,4rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(2rem,5vw,5rem)]">
          <div className="reveal-left opacity-0">
            <Tag>Garanties & cadre juridique</Tag>
            <H2>Le cadre qui sécurise votre acquisition.</H2>
          </div>
          <div className="reveal-right flex items-center opacity-0">
            <Body opacity={0.5}>
              Acheter dans le neuf au Maroc bénéficie d’un cadre juridique
              précis. Atlantis Immobilier l’applique strictement, et y ajoute
              ses propres engagements.
            </Body>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-px bg-[rgba(46,125,106,0.15)]">
          {GARANTIES.map((garantie, index) => (
            <div
              key={garantie.title}
              className="stagger-item border-t-2 border-t-transparent bg-[#060F0D] px-[clamp(1.2rem,3vw,2rem)] py-[clamp(1.8rem,4vw,2.5rem)] opacity-0 transition-colors duration-[400ms] hover:border-t-[#C9A96E] hover:bg-[#0B2B26]"
              data-dir={index < 2 ? "left" : "right"}
              data-delay={`${index * 0.1}`}
            >
              <p className="mb-4 text-[clamp(1.6rem,4vw,2rem)] leading-none text-[#C9A96E]">
                {garantie.icon}
              </p>
              <h3 className="mb-3 font-georgia text-[clamp(1rem,2.5vw,1.15rem)] leading-[1.3] italic text-[#F5F0E8]">
                {garantie.title}
              </h3>
              <Body opacity={0.45}>{garantie.desc}</Body>
            </div>
          ))}
        </div>
      </section>

      <EmeraldRule />

      <section className={cx(sectionClass, "bg-[#0B2B26]")}>
        <div className="pointer-events-none absolute bottom-[clamp(-3rem,-8vw,-1rem)] right-[clamp(-3rem,-8vw,-1rem)]">
          <GeoRings size={220} color="#2E7D6A" opacity={0.07} />
        </div>

        <div className={twoColumnClass}>
          <div>
            <div className="reveal-left opacity-0">
              <Tag>Financement</Tag>
              <H2 className="mb-[clamp(1.5rem,4vw,2rem)]">
                Financer votre acquisition.
              </H2>
              <Body className="mb-6">
                Nous travaillons avec les principales banques marocaines. Notre
                équipe vous oriente vers les solutions les mieux adaptées à
                votre profil.
              </Body>
            </div>
          </div>

          <div>
            <p className="reveal-right mb-6 font-calibri text-[11px] font-bold uppercase tracking-[0.35em] text-[rgba(245,240,232,0.3)] opacity-0">
              Options disponibles
            </p>
            {FINANCEMENT_OPTIONS.map((option, index) => (
              <div
                key={option}
                className="stagger-item flex items-start gap-4 border-b border-[rgba(46,125,106,0.18)] py-[clamp(0.9rem,2.5vw,1.3rem)] opacity-0"
                data-dir="right"
                data-delay={`${index * 0.1}`}
              >
                <span className="mt-2 shrink-0 text-[0.6rem] text-[#C9A96E]">
                  ◆
                </span>
                <Body opacity={0.58}>{option}</Body>
              </div>
            ))}
            <p className="reveal-right mt-6 font-calibri text-[12px] italic text-[rgba(245,240,232,0.28)] opacity-0">
              L’octroi du financement reste à l’appréciation de l’établissement
              prêteur.
            </p>
          </div>
        </div>
      </section>

      <GoldRule />

      <section className={cx(sectionClass, "bg-[#060F0D]")}>
        <div className="reveal-left mb-[clamp(2.5rem,6vw,4rem)] opacity-0">
          <Tag>Questions fréquentes</Tag>
          <H2>Questions fréquentes.</H2>
        </div>

        <div className="max-w-[min(860px,100%)]">
          {FAQS.map((faq, index) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={index} />
          ))}
        </div>
      </section>

      <EmeraldRule />

      <section className={cx(sectionClass, "bg-[#0B2B26]")} id="contact">
        <div className={twoColumnClass}>
          <div>
            <div className="reveal-left opacity-0">
              <Tag>Parlons de votre projet</Tag>
              <H2 className="mb-[clamp(1rem,3vw,1.5rem)]">
                Une visite, une question, un dossier de prix.
              </H2>
              <Body opacity={0.5} className="mb-[clamp(1.5rem,4vw,2.5rem)]">
                Un conseiller Atlantis vous rappelle sous 24 heures ouvrées.
                Vous pouvez aussi nous écrire ou nous rendre visite à
                Casablanca.
              </Body>
            </div>

          </div>
          <div id="invester-contact">
            <InvestirForm />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(46,125,106,0.18)] px-[clamp(1.5rem,6vw,5rem)] py-[clamp(1rem,3vw,1.5rem)]">
        <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-[rgba(245,240,232,0.2)]">
          © {new Date().getFullYear()} Atlantis Immobilier
        </span>
        <div className="h-px w-20 bg-[linear-gradient(to_right,transparent,rgba(201,169,110,0.3),transparent)]" />
        <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-[rgba(245,240,232,0.2)]">
          Casablanca, Maroc
        </span>
      </div>
    </main>
  );
};

export default InvestirContent;
