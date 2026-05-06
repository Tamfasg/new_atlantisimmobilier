"use client";

import { M } from "@/components/motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Clock3, Handshake, Landmark, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ENGAGEMENTS = [
  {
    num: "01",
    icon: Landmark,
    title: "Une exigence architecturale assumée.",
    desc: "Chaque projet commence par une intention : raconter quelque chose du lieu, du quartier, de la ville. Nos architectes travaillent à des bâtiments qui vieillissent bien et qui, dix ans après leur livraison, parlent encore juste.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Le respect du délai comme valeur cardinale.",
    desc: "Au Maroc, livrer dans les temps fait la différence. Nous structurons nos chantiers, nos partenaires et notre trésorerie pour tenir nos engagements de livraison — c'est la première preuve de sérieux.",
  },
  {
    num: "03",
    icon: Handshake,
    title: "Un accompagnement client de bout en bout.",
    desc: "De la première visite à la remise des clés, un interlocuteur unique vous accompagne. Conseil patrimonial, montage de financement, suivi technique, service après-livraison : tout est intégré.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Une vision patrimoniale, pas seulement immobilière.",
    desc: "Acheter chez Atlantis Immobilier, c'est s'inscrire dans une logique de valeur durable. Nos emplacements et nos prestations sont choisis pour que votre acquisition prenne du sens — et de la valeur — dans le temps.",
  },
];

const BRANDS = [
  {
    name: "Atlantis Signature",
    tag: "Haut standing",
    desc: "Résidentiel haut standing et premium. Pour celles et ceux qui cherchent une adresse, un cadre de vie et un standard architectural d'exception.",
    href: "/groupes#atlantis-signature",
    roman: "I",
  },
  {
    name: "Pessac Collection",
    tag: "Urbain & Mixte",
    desc: "Résidentiel et bureaux au cœur vibrant de Casablanca. L'architecture en édition urbaine — un hommage contemporain au patrimoine de la ville.",
    href: "/groupes#pessac-collection",
    roman: "II",
  },
  {
    name: "L'Olivier du Parc",
    tag: "Résidentiel familial",
    desc: "Résidences modernes à Had Soualem. Le confort d'une vie de famille, dans un cadre apaisé, à un standard accessible et tenu.",
    href: "/groupes#olivier-du-parc",
    roman: "III",
  },
];

const PROJECTS = [
  {
    id: "pessac",
    name: "Pessac Collection",
    location: "Casablanca",
    desc: "Au cœur vibrant de Casablanca, à l'angle du boulevard de la Résistance et de la rue Pessac, un programme mixte résidentiel et bureaux qui réinterprète l'esprit Art Déco de la ville.",
    image: "/assets/projects/PESSAC/2.jpeg",
    tag: "En cours",
  },
  {
    id: "olivier",
    name: "L'Olivier du Parc",
    location: "Had Soualem",
    desc: "À la porte de Casablanca, un ensemble résidentiel structuré de 675 logements, déployé en quatre tranches successives, pensé pour les familles.",
    image: "/assets/projects/PESSAC/1.jpeg",
    tag: "Tranche 1",
  },
  {
    id: "signature",
    name: "Atlantis Signature",
    location: "Casablanca & littoral",
    desc: "Plusieurs programmes haut standing en cours, conçus comme des pièces uniques, à découvrir lors d'un rendez-vous personnalisé.",
    image: "/assets/projects/PESSAC/3.jpeg",
    tag: "Sur rendez-vous",
  },
];


const CONFIANCE = [
  {
    num: "98%",
    title: "Délais tenus",
    desc: "Nos programmes sont structurés et financés pour livrer dans les temps annoncés.",
  },
  {
    num: "A+",
    title: "Construction maîtrisée",
    desc: "Cahiers des charges techniques alignés sur les standards les plus exigeants.",
  },
  {
    num: "360°",
    title: "Service intégré",
    desc: "Un interlocuteur unique, du premier rendez-vous au suivi après livraison.",
  },
];

const GoldLine = () => (
  <div className="my-0 h-2 w-full bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
);

const SectionTag = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <p
    className={`mb-5 text-[15px] uppercase tracking-[0.4em] font-calibri select-none  ${
      light ? "text-[#c9a96e]/70" : "text-[#c9a96e]"
    }`}
  >
    {children}
  </p>
);

const DisplayH2 = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`leading-[1.05] text-white  ${className} font-georgia font-bold select-none`}
    style={{
      fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
      fontStyle: "italic",
    }}
  >
    {children}
  </h2>
);

const HomePage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    projet: "",
    interet: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const promesseRef = useRef<HTMLElement>(null);
  const engagementsRef = useRef<HTMLElement>(null);
  const marquesRef = useRef<HTMLElement>(null);
  const projetsRef = useRef<HTMLElement>(null);
  const confianceRef = useRef<HTMLElement>(null);
  const investirRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroLoaded(true);

    const ctx = gsap.context(() => {
      gsap.to(heroTextRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Sections reveal
      const sections = [
        promesseRef,
        engagementsRef,
        marquesRef,
        projetsRef,
        confianceRef,
        investirRef,
        contactRef,
      ];

      sections.forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "easeOut",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%",
            },
          },
        );
      });

      const cards = document.querySelectorAll(".engagement-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.20,
            ease: "easeOut",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });

      const brandCards = document.querySelectorAll(".brand-card");
      brandCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: i * 0.2,
            ease: "easeOut",
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });

      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.2,
            ease: "easeOut",
            scrollTrigger: { trigger: card, start: "top 90%" },
          },
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <main
        className="relative w-screen overflow-x-hidden bg-[#0e0e0e] text-white"
        style={{}}
      >
        <M.section
          ref={heroRef}
          className="relative flex h-screen w-screen flex-col justify-end overflow-hidden pb-20"
          style={{
            backgroundImage: `url("/assets/projects/PESSAC/2.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,6,6,0.97) 0%, rgba(6,6,6,0.6) 45%, rgba(6,6,6,0.15) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(6,6,6,0.5) 0%, transparent 60%)",
            }}
          />

          <M.div
            className="absolute left-6 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #c9a96e, transparent)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={heroLoaded ? { width: "100%", opacity: 0.7 } : {}}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
          />

          <M.div
            className="absolute left-5 top-20 w-px"
            style={{ background: "rgba(201,169,110,0.2)" }}
            initial={{ height: 0 }}
            animate={heroLoaded ? { height: "90%" } : {}}
            transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
          />

          <div
            ref={heroTextRef}
            className="relative z-10 px-16 md:px-24 max-sm:px-10 w-full h-full flex flex-col justify-end max-sm:justify-center max-sm:pt-20"
          >
            <M.p
              className="mb-4 font-calibri text-[15px] uppercase tracking-[0.45em] text-[#c9a96e]"
              initial={{ opacity: 0, y: 15 }}
              animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              Atlantis Immobilier
            </M.p>

            <M.h1
              style={{
                fontSize: "clamp(3.2rem, 9vw, 8.5rem)",
                fontWeight: 300,
                fontStyle: "normal",
                lineHeight: 1,
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
              className="font-georgia"
            >
              Bâtir des adresses
              <br />
              <span className="text-[#c9a96e]">qui font date.</span>
            </M.h1>

            <M.p
              className="mb-10 mt-7 max-w-xl text-md leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1.0 }}
            >
              Atlantis Immobilier conçoit, construit et livre des lieux de vie
              et de travail au Maroc. Trois marques portent notre exigence, une
              seule signature les réunit.
            </M.p>

            <M.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.25 }}
            >
              <Link
                href="/projets"
                className="inline-flex items-center gap-4 border border-[#c9a96e]/70 px-8 py-4 font-calibri text-normal uppercase tracking-widest text-[#c9a96e] transition-all duration-500 hover:bg-[#c9a96e] hover:text-[#060606]"
              >
                <span>Découvrir nos projets</span>
                <span className="block h-px w-6 bg-current" />
              </Link>
            </M.div>
          </div>

          <M.div
            className="absolute bottom-8 right-12 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={heroLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
          >
            <span className="font-calibri text-[8px] uppercase tracking-[0.3em] text-white/20">
              Scroll
            </span>
            <M.div
              className="h-12 w-px origin-top bg-gradient-to-b from-[#c9a96e]/60 to-transparent"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
            />
          </M.div>
        </M.section>
        <section
          ref={promesseRef}
          className="relative overflow-hidden border-b border-white/[0.05] px-16 py-32 md:px-24 max-sm:px-8"
          style={{ opacity: 0 }}
        >
          <div
            className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[10vw] font-light italic font-georgia text-white/[0.025]"
            style={{}}
            aria-hidden
          >
            Atlantis Immobilier
          </div>

          <div className="relative grid gap-20 lg:grid-cols-[1fr_1.4fr]">
            <div className="pt-2 font-georgia">
              <SectionTag>Notre promesse</SectionTag>
              <DisplayH2>
                Trois standards.
                <br />
                Une seule rigueur.
              </DisplayH2>
            </div>

            <div className="space-y-8">
              <p className="text-[20px] leading-[1.85] text-white/80 font-calibri">
                Construire au Maroc engage une responsabilité : celle de bâtir
                pour les familles d'aujourd'hui et le patrimoine de demain. Nous
                tenons cette responsabilité avec la même exigence sur chacun de
                nos programmes, qu'il s'agisse d'un appartement familial à Had
                Soualem, d'une résidence d'exception à Casablanca ou d'un
                immeuble tertiaire au cœur de la capitale économique.
              </p>
              <p className="text-[15px] leading-[1.85] text-white/40">
                Notre méthode est constante : un foncier choisi, une
                architecture pensée, des matériaux maîtrisés, des délais
                respectés. Le reste — l'élégance, l'usage, la valeur — en
                découle naturellement.
              </p>

              {/* decorative accent */}
              <div className="flex items-center gap-4 pt-4">
                <div className="h-px w-16 bg-[#c9a96e]/40" />
                <span className="font-calibri text-[9px] uppercase tracking-[0.4em] text-[#c9a96e]/40">
                  Atlantis Immobilier
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={engagementsRef}
          className="border-b border-white/[0.05] px-16 py-32 md:px-24 max-sm:px-8"
          style={{ opacity: 0 }}
        >
          <div className="mb-16">
            <SectionTag>Nos engagements</SectionTag>
            <DisplayH2>Ce qui nous engage.</DisplayH2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {ENGAGEMENTS.map((e) => {
              const Icon = e.icon;
              return(
              <div
                key={e.num}
                className="select-none engagement-card group relative border border-white/[0.06] bg-white/[0.015] p-8 transition-all duration-300 hover:border-[#c9a96e]/30 hover:bg-[#c9a96e]/[0.03]"
                style={{ opacity: 0 }}
              >
                <div
                  className="absolute font-georgia right-6 top-7 font-light italic text-gold-muted/[0.5] transition-colors duration-300 group-hover:text-gold-muted"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                  }}
                >
                  <Icon size={48} strokeWidth={1.5} />
                </div>

                <div className="relative">
                  <p className="mb-1 font-calibri text-[15px] uppercase tracking-widest text-[#c9a96e]/50">
                    {e.num}
                  </p>
                  <h3
                    className="mb-4 text-xl leading-snug text-white/90 font-georgia"
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {e.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/40">
                    {e.desc}
                  </p>
                </div>
              </div>
            )})}
          </div>
        </section>
        <section
          ref={marquesRef}
          className="relative overflow-hidden border-b border-white/[0.05] px-16 py-32 md:px-24 max-sm:px-8"
          style={{ opacity: 0 }}
        >
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionTag>Nos trois marques</SectionTag>
              <DisplayH2>
                Une signature.
                <br />
                Trois univers.
              </DisplayH2>
            </div>
            <p className="max-w-sm text-normal leading-relaxed text-white/40">
              Chacune répond à une promesse claire ; toutes partagent la même
              méthode et le même niveau d'exigence.
            </p>
          </div>

          <div className="space-y-px">
            {BRANDS.map((brand, i) => (
              <Link href={brand.href} key={brand.name}>
                <div
                  className="brand-card group flex cursor-pointer items-center justify-between gap-8 border border-white/[0.05] bg-white/[0.01] px-10 py-8 transition-all duration-500 hover:border-[#c9a96e]/25 hover:bg-[#c9a96e]/[0.03] max-sm:flex-col max-sm:items-start"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-8">
                    <span
                      className="shrink-0 font-light italic text-[#c9a96e]/20 transition-colors duration-300 group-hover:text-[#c9a96e]/40"
                      style={{
                        fontSize: "3rem",
                      }}
                    >
                      {brand.roman}
                    </span>
                    <div>
                      <p className="mb-1 font-calibri text-sm uppercase tracking-widest text-[#c9a96e]/50">
                        {brand.tag}
                      </p>
                      <h3
                        className="text-2xl text-white/90 transition-colors font-georgia duration-300 group-hover:text-white"
                        style={{
                          fontStyle: "italic",
                          fontWeight: 400,
                        }}
                      >
                        {brand.name}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-md text-lg text-cream/70 group-hover:text-cream/90 transition-colors duration-300 max-sm:pl-10">
                    {brand.desc}
                  </p>

                  <div className="flex shrink-0 items-center gap-3 font-calibri text-sm uppercase tracking-widest text-[#c9a96e]/40 transition-all duration-300 group-hover:text-[#c9a96e] max-sm:pl-14">
                    <span>Découvrir</span>
                    <span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/groupes"
              className="inline-flex items-center gap-4 border border-white/10 px-8 py-3 font-calibri text-sm uppercase tracking-widest text-white/40 transition-all duration-400 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
            >
              Découvrir les trois marques
            </Link>
          </div>
        </section>
        <section
          ref={projetsRef}
          className="border-b border-white/[0.05] px-16 py-32 md:px-24 max-sm:px-8"
          style={{ opacity: 0 }}
        >
          <div className="mb-16">
            <SectionTag>Projets en cours</SectionTag>
            <DisplayH2 className="mb-4">
              Nos projets ouverts
              <br />à la commercialisation.
            </DisplayH2>
            <p className="text-normal text-white/35">
              Trois adresses, trois ambitions différentes, une même rigueur
              d'exécution.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {PROJECTS.map((p, i) => (
              <Link
                href={`/projets#${p.id}`}
                key={p.id}
                className="flex h-full"
              >
                <div
                  className="project-card group relative flex h-full w-full cursor-pointer flex-col  overflow-hidden border border-white/[0.06] bg-[#0a0a0a] transition-all duration-500 hover:border-[#c9a96e]/30"
                  style={{ opacity: 0 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url("${p.image}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                    <div className="absolute left-4 top-4 border border-[#c9a96e]/40 bg-black/60 px-3 py-1 font-calibri text-[9px] uppercase tracking-widest text-[#c9a96e] backdrop-blur-sm">
                      {p.tag}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-7 py-8">
                    <p className="mb-1 font-calibri text-[12px] uppercase tracking-widest text-[#c9a96e]/50">
                      {p.location}
                    </p>
                    <h3
                      className="mb-4 text-[1.4rem] text-white font-georgia"
                      style={{
                        fontStyle: "italic",
                        fontWeight: 300,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p className="mb-6 flex-1 text-normal leading-relaxed text-white/40">
                      {p.desc}
                    </p>
                    <div className="flex items-center gap-3 font-calibri text-[15px] uppercase tracking-widest text-[#c9a96e] transition-all duration-300">
                      <span className="group-hover:scale-120 group-hover:underline transition-all duration-300 pl-10">Découvrir</span>
                      <ArrowRight className="group-hover:translate-x-10 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projets"
              className="inline-flex items-center gap-4 border border-[#c9a96e]/50 px-10 py-4 font-calibri text-normal uppercase tracking-widest text-[#c9a96e] transition-all duration-500 hover:bg-[#c9a96e] hover:text-[#060606]"
            >
              Voir tous les projets
            </Link>
          </div>
        </section>

        <section
          ref={confianceRef}
          className="relative overflow-hidden border-b border-white/[0.05] px-16 py-32 md:px-24 max-sm:px-8"
          style={{ opacity: 0 }}
        >
          {/* radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.055) 0%, transparent 100%)",
            }}
          />

          <div className="relative">
            <div className="mb-16 text-center">
              <SectionTag>Confiance</SectionTag>
              <DisplayH2>Pourquoi nous confier votre projet.</DisplayH2>
            </div>

            <div className="mb-16 grid gap-px sm:grid-cols-3">
              {CONFIANCE.map((c) => (
                <div
                  key={c.title}
                  className="border border-white/[0.05] bg-white/[0.015] p-10 text-center"
                >
                  <div
                    className="mb-3 text-[3.5rem] font-light italic text-[#c9a96e]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {c.num}
                  </div>
                  <h3 className="mb-3 text-normal font-normal uppercase tracking-wider text-white/80">
                    {c.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/35">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto max-w-2xl border-l-2 border-[#c9a96e]/30 py-2 pl-8 text-center sm:text-left">
              <p
                className="text-2xl italic text-white/60"
                style={{
                  fontWeight: 300,
                }}
              >
                « Ce qui nous distingue n'est pas une promesse.{" "}
                <span className="text-[#c9a96e]/80">C'est une méthode.</span> »
              </p>
            </div>
          </div>
        </section>
        <section
          ref={investirRef}
          className="relative overflow-hidden border-b border-white/[0.05]"
          style={{ opacity: 0 }}
        >
          <div className="grid lg:grid-cols-2">
            <div
              className="relative min-h-[420px] bg-cover bg-center"
              style={{
                backgroundImage: `url("/assets/projects/SIGNATURE/1.jpeg")`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent 60%, #060606 100%)",
                }}
              />
            </div>

            <div className="flex flex-col justify-center px-16 py-24 md:px-20 max-sm:px-8">
              <SectionTag>Investir au Maroc</SectionTag>
              <DisplayH2 className="mb-8">
                Investir
                <br />
                avec une vision.
              </DisplayH2>
              <p className="mb-5 text-normal leading-relaxed text-white/50">
                Pour les investisseurs marocains et résidents, comme pour la
                diaspora, le Maroc reste un marché de fond. Atlantis Immobilier
                vous accompagne dans une logique patrimoniale : choix de
                l'emplacement, étude de rendement, montage juridique et fiscal,
                gestion locative.
              </p>
              <p className="mb-10 text-normal font-light italic text-[#c9a96e]/70">
                Nous ne vendons pas une opportunité — nous construisons une
                stratégie.
              </p>
              <button className="self-start border border-[#c9a96e]/60 px-8 py-4 font-calibri text-normal uppercase tracking-widest text-[#c9a96e] transition-all duration-500 hover:bg-[#c9a96e] hover:text-[#060606]">
                Parler à un conseiller patrimonial
              </button>
            </div>
          </div>
        </section>

        <section
          ref={contactRef}
          className="bg-[#080808] px-16 py-32 md:px-24 max-sm:px-8"
          style={{ opacity: 0 }}
        >
          <div className="grid gap-20 lg:grid-cols-[1fr_1.5fr]">
            {/* left */}
            <div className="pt-1">
              <SectionTag>Contact</SectionTag>
              <DisplayH2 className="mb-6">
                Avant de partir,
                <br />
                parlons de votre projet.
              </DisplayH2>
              <p className="text-normal leading-relaxed text-white/40">
                Une visite, une question, un dossier de prix : un conseiller
                vous rappelle sous 24 heures ouvrées.
              </p>

              <div className="mt-12 space-y-5 border-t border-white/[0.06] pt-10">
                {[
                  "Réponse sous 24h ouvrées",
                  "Aucun engagement",
                  "Conseiller dédié",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="h-1 w-1 rounded-full bg-[#c9a96e]/60" />
                    <span className="font-calibri text-[10px] uppercase tracking-widest text-white/30">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex h-full items-center justify-center border border-[#c9a96e]/25 bg-[#c9a96e]/[0.03] p-12 text-center">
                  <div>
                    <div
                      className="mb-4 text-5xl italic text-[#c9a96e]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Merci.
                    </div>
                    <p className="font-calibri text-normal uppercase tracking-widest text-white/40">
                      Un conseiller vous contactera sous 24h ouvrées.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        key: "nom",
                        label: "Nom",
                        type: "text",
                        required: true,
                      },
                      {
                        key: "telephone",
                        label: "Téléphone",
                        type: "tel",
                        required: true,
                      },
                      {
                        key: "email",
                        label: "E-mail",
                        type: "email",
                        required: true,
                      },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          required={f.required}
                          value={formData[f.key as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData((d) => ({
                              ...d,
                              [f.key]: e.target.value,
                            }))
                          }
                          placeholder={f.label}
                          className="w-full border border-white/8 bg-transparent px-4 py-3 text-normal text-white outline-none transition-colors duration-200 placeholder:text-white/15 focus:border-[#c9a96e]/40"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
                        Projet
                      </label>
                      <select
                        value={formData.projet}
                        onChange={(e) =>
                          setFormData((d) => ({ ...d, projet: e.target.value }))
                        }
                        className="w-full border border-white/8 bg-[#080808] px-4 py-3 text-normal text-white/60 outline-none focus:border-[#c9a96e]/40"
                      >
                        <option value="">Sélectionner</option>
                        <option>Résidence principale</option>
                        <option>Investissement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
                      Marque ou ville d'intérêt
                    </label>
                    <input
                      type="text"
                      value={formData.interet}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, interet: e.target.value }))
                      }
                      placeholder="Ex: Pessac Collection, Casablanca…"
                      className="w-full border border-white/8 bg-transparent px-4 py-3 text-normal text-white outline-none placeholder:text-white/15 focus:border-[#c9a96e]/40 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
                      Message libre
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, message: e.target.value }))
                      }
                      placeholder="Votre message…"
                      className="w-full resize-none border border-white/8 bg-transparent px-4 py-3 text-normal text-white outline-none placeholder:text-white/15 focus:border-[#c9a96e]/40 transition-colors duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full border border-[#c9a96e]/60 bg-[#c9a96e]/[0.05] py-4 font-calibri text-normal uppercase tracking-widest text-[#c9a96e] transition-all duration-400 hover:bg-[#c9a96e]/15"
                  >
                    Être rappelé
                  </button>

                  <p className="pt-1 text-center font-calibri text-[8px] uppercase tracking-wider text-white/20">
                    Vos données sont traitées dans le strict respect de la loi
                    09-08 relative à la protection des données personnelles.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-white/[0.05] px-16 py-6 md:px-24 max-sm:px-8">
          <span className="font-calibri text-[9px] uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} Atlantis Immobilier
          </span>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
          <span className="font-calibri text-[9px] uppercase tracking-widest text-white/20">
            Casablanca, Maroc
          </span>
        </div>
      </main>
    </>
  );
};

export default HomePage;
