"use client";

import { M } from "@/components/motion";
import { useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { SectionTag, DisplayH2 } from "@/components/UI/SectionHeader";
import { ENGAGEMENTS, BRANDS, PROJECTS, CONFIANCE } from "@/app/data/home";
import HomdeContactForm from "./HomeForm";

gsap.registerPlugin(ScrollTrigger);

type HomeFormData = {
  nom: string;
  telephone: string;
  email: string;
  projet: string;
  interet: string;
  message: string;
};

type ContactFieldConfig = {
  key: keyof HomeFormData;
  label: string;
  type: "text" | "tel" | "email";
  required?: boolean;
};

const INITIAL_FORM_DATA: HomeFormData = {
  nom: "",
  telephone: "",
  email: "",
  projet: "",
  interet: "",
  message: "",
};

const CONTACT_FIELDS: ContactFieldConfig[] = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "telephone", label: "Téléphone", type: "tel", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
];

const CONTACT_BULLETS = [
  "Réponse sous 24h ouvrées",
  "Aucun engagement",
  "Conseiller dédié",
];

const HomeContent = () => {
  const [formData, setFormData] = useState<HomeFormData>(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const promesseRef = useRef<HTMLElement>(null);
  const engagementsRef = useRef<HTMLElement>(null);
  const marquesRef = useRef<HTMLElement>(null);
  const projetsRef = useRef<HTMLElement>(null);
  const confianceRef = useRef<HTMLElement>(null);
  const investirRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = mainRef.current;
      if (!scope) return;

      const revealSections = [
        promesseRef.current,
        confianceRef.current,
        investirRef.current,
        contactRef.current,
      ].filter(Boolean) as HTMLElement[];
      const engagementCards = gsap.utils.toArray<HTMLElement>(".engagement-card", scope);
      const brandCards = gsap.utils.toArray<HTMLElement>(".brand-card", scope);
      const projectCards = gsap.utils.toArray<HTMLElement>(".project-card", scope);

      if (heroRef.current && heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          y: -80,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      revealSections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 36, willChange: "transform, opacity" },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.25,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
            onComplete: () => {
              gsap.set(section, { willChange: "auto" });
            },
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      const revealCards = (
        targets: HTMLElement[],
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        start = "top 88%",
        staggerDelay = 0.06,
      ) => {
        if (!targets.length) return;

        targets.forEach((target, index) => {
          gsap.fromTo(
            target,
            {
              autoAlpha: 0,
              willChange: "transform, opacity",
              ...fromVars,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: index * staggerDelay,
              clearProps: "transform,opacity,visibility",
              onComplete: () => {
                gsap.set(target, { willChange: "auto" });
              },
              ...toVars,
              scrollTrigger: {
                trigger: target,
                start,
                once: true,
              },
            },
          );
        });
      };

      revealCards(engagementCards, { y: 28 }, { duration: 0.5 }, "top 90%");
      revealCards(
        brandCards,
        { x: -24 },
        {
          duration: 0.55,
        },
        "top 93%",
        0.03,
      );
      revealCards(
        projectCards,
        { y: 32 },
        {
          duration: 1,
        },
        "top 92%",
      );

      ScrollTrigger.refresh();
    },
    { scope: mainRef },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const updateFormField = (key: keyof HomeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main ref={mainRef} className="relative w-screen overflow-x-hidden bg-[#0e0e0e] text-white">
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
        <M.div
          className="absolute left-6 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #c9a96e, transparent)",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 0.7 }}
          transition={{
            duration: 2.5,
            delay: 0.3,
            ease: "easeOut",
          }}
        />

        <M.div
          className="absolute left-5 top-20 w-px"
          style={{ background: "rgba(201,169,110,0.2)" }}
          initial={{ height: 0 }}
          animate={{ height: "90%" }}
          transition={{
            duration: 1.8,
            delay: 0.6,
            ease: "easeOut",
          }}
        />

        <div
          ref={heroTextRef}
          className="relative z-10 px-16 md:px-24 max-sm:px-10 w-full h-full flex flex-col justify-end max-sm:justify-center max-sm:pt-20"
        >
          <M.p
            className="mb-4 font-calibri text-[15px] uppercase tracking-[0.45em] text-[#c9a96e]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
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
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.7,
              ease: "easeOut",
            }}
            className="font-georgia"
          >
            Bâtir des adresses
            <br />
            <span className="text-[#c9a96e]">qui font date.</span>
          </M.h1>

          <M.p
            className="mb-10 mt-7 max-w-xl text-md leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
          >
            Atlantis Immobilier conçoit, construit et livre des lieux de vie et de travail au Maroc. Trois marques portent notre exigence, une seule signature les réunit.
          </M.p>

          <M.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-calibri text-[8px] uppercase tracking-[0.3em] text-white/20">
            Scroll
          </span>
          <M.div
            className="h-12 w-px origin-top bg-linear-to-b from-[#c9a96e]/60 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </M.div>
      </M.section>

      <section
        ref={promesseRef}
        className="relative overflow-hidden border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8"
      >
        <div
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[10vw] font-light italic font-georgia text-white/2.5"
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
              Construire au Maroc engage une responsabilité : celle de bâtir pour les familles d'aujourd'hui et le patrimoine de demain. Nous tenons cette responsabilité avec la même exigence sur chacun de nos programmes, qu'il s'agisse d'un appartement familial à Had Soualem, d'une résidence d'exception à Casablanca ou d'un immeuble tertiaire au cœur de la capitale économique.
            </p>
            <p className="text-[15px] leading-[1.85] text-white/40">
              Notre méthode est constante : un foncier choisi, une architecture pensée, des matériaux maîtrisés, des délais respectés. Le reste — l'élégance, l'usage, la valeur — en découle naturellement.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-px w-16 bg-[#c9a96e]/40" />
              <span className="font-calibri text-[9px] uppercase tracking-[0.4em] text-[#c9a96e]/40">
                Atlantis Immobilier
              </span>
            </div>
          </div>
        </div>
      </section>

      <section ref={engagementsRef} className="border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
        <div className="mb-16">
          <SectionTag>Nos engagements</SectionTag>
          <DisplayH2>Ce qui nous engage.</DisplayH2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {ENGAGEMENTS.map((e) => {
            const Icon = e.icon;
            return (
              <div
                key={e.num}
                className="select-none engagement-card group relative border border-white/6 bg-white/1.5 p-8 transition-all duration-300 hover:border-[#c9a96e]/30 hover:bg-[#c9a96e]/3"
              >
                <div
                  className="absolute font-georgia right-6 top-7 font-light italic text-gold-muted/50 transition-colors duration-300 group-hover:text-gold-muted"
                  style={{ fontSize: "5rem", lineHeight: 1 }}
                >
                  <Icon size={48} strokeWidth={1.5} />
                </div>

                <div className="relative">
                  <p className="mb-1 font-calibri text-[15px] uppercase tracking-widest text-[#c9a96e]/50">
                    {e.num}
                  </p>
                  <h3 className="mb-4 text-xl leading-snug text-white/90 font-georgia" style={{ fontStyle: "italic", fontWeight: 400 }}>
                    {e.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/40">{e.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section ref={marquesRef} className="relative overflow-hidden border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
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
            Chacune répond à une promesse claire ; toutes partagent la même méthode et le même niveau d'exigence.
          </p>
        </div>

        <div className="space-y-px">
          {BRANDS.map((brand) => (
            <Link href={brand.href} key={brand.name}>
              <div
                className="brand-card group flex cursor-pointer items-center justify-between gap-8 border border-white/5 bg-white/1 px-10 py-8 transition-all duration-500 hover:border-[#c9a96e]/25 hover:bg-[#c9a96e]/3 max-sm:flex-col max-sm:items-start"
              >
                <div className="flex items-center gap-8">
                  <span
                    className="shrink-0 font-light italic text-[#c9a96e]/20 transition-colors duration-300 group-hover:text-[#c9a96e]/40"
                    style={{ fontSize: "3rem" }}
                  >
                    {brand.roman}
                  </span>
                  <div>
                    <p className="mb-1 font-calibri text-sm uppercase tracking-widest text-[#c9a96e]/50">
                      {brand.tag}
                    </p>
                    <h3 className="text-2xl text-white/90 transition-colors font-georgia duration-300 group-hover:text-white" style={{ fontStyle: "italic", fontWeight: 400 }}>
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

      <section ref={projetsRef} className="border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
        <div className="mb-16">
          <SectionTag>Projets en cours</SectionTag>
          <DisplayH2 className="mb-4">
            Nos projets ouverts
            <br />
            à la commercialisation.
          </DisplayH2>
          <p className="text-normal text-white/35">
            Trois adresses, trois ambitions différentes, une même rigueur d'exécution.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {PROJECTS.map((p) => (
            <Link key={p.id} href={`/projets#${p.id}`} className="flex h-full">
              <div
                className="project-card group relative flex h-full w-full cursor-pointer flex-col overflow-hidden border border-white/6 bg-[#0a0a0a] transition-all duration-500 hover:border-[#c9a96e]/30"
              >
                <div className="relative h-110 overflow-hidden">
                  <div
                    className="bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 h-100 scale-110"
                    style={{ backgroundImage: `url("${p.image}")` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/2 to-transparent" />
                  <div className="absolute left-4 top-4 border border-[#c9a96e]/40 bg-black/60 px-3 py-1 font-calibri text-sm uppercase tracking-widest text-[#c9a96e] backdrop-blur-sm">
                    {p.tag}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-7 py-8">
                  <p className="mb-1 font-calibri text-[12px] uppercase tracking-widest text-[#c9a96e]/50">
                    {p.location}
                  </p>
                  <h3 className="mb-4 text-[1.4rem] text-white font-georgia" style={{ fontStyle: "italic", fontWeight: 300 }}>
                    {p.name}
                  </h3>
                  <p className="mb-6 flex-1 text-normal leading-relaxed text-white/40">
                    {p.desc}
                  </p>
                  <div className="flex items-center gap-3 font-calibri text-[15px] uppercase tracking-widest text-[#c9a96e] transition-all duration-300">
                    <span className="group-hover:scale-120 group-hover:underline transition-all duration-300 pl-10">Découvrir</span>
                    <span className="block h-px w-6 bg-[#c9a96e] transition-all duration-300 group-hover:w-10" />
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

      <section ref={confianceRef} className="relative overflow-hidden border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
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
              <div key={c.title} className="border border-white/5 bg-white/1.5 p-10 text-center">
                <div className="mb-3 text-[3.5rem] font-light italic text-[#c9a96e]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {c.num}
                </div>
                <h3 className="mb-3 text-normal font-normal uppercase tracking-wider text-white/80">
                  {c.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/35">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl border-l-2 border-[#c9a96e]/30 py-2 pl-8 text-center sm:text-left">
            <p className="text-2xl italic text-white/60" style={{ fontWeight: 300 }}>
              « Ce qui nous distingue n'est pas une promesse. <span className="text-[#c9a96e]/80">C'est une méthode.</span> »
            </p>
          </div>
        </div>
      </section>

      <section ref={investirRef} className="relative overflow-hidden border-b border-white/5">
        <div className="grid lg:grid-cols-2">
          <div
            className="relative min-h-105 bg-cover bg-center"
            style={{
              backgroundImage: `url("/assets/projects/SIGNATURE/1.jpeg")`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, transparent 60%, #060606 100%)",
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
              Pour les investisseurs marocains et résidents, comme pour la diaspora, le Maroc reste un marché de fond. Atlantis Immobilier vous accompagne dans une logique patrimoniale : choix de l'emplacement, étude de rendement, montage juridique et fiscal, gestion locative.
            </p>
            <p className="mb-10 text-normal font-light italic text-[#c9a96e]/70">
              Nous ne vendons pas une opportunité — nous construisons une stratégie.
            </p>
            <button className="self-start border border-[#c9a96e]/60 px-8 py-4 font-calibri text-normal uppercase tracking-widest text-[#c9a96e] transition-all duration-500 hover:bg-[#c9a96e] hover:text-[#060606]">
              Parler à un conseiller patrimonial
            </button>
          </div>
        </div>
      </section>

      <section ref={contactRef} className="bg-[#080808] px-16 py-32 md:px-24 max-sm:px-8">
        <div className="grid gap-20 lg:grid-cols-[1fr_1.5fr]">
          <div className="pt-1">
            <SectionTag>Contact</SectionTag>
            <DisplayH2 className="mb-6">
              Avant de partir,
              <br />
              parlons de votre projet.
            </DisplayH2>
            <p className="text-normal leading-relaxed text-white/40">
              Une visite, une question, un dossier de prix : un conseiller vous rappelle sous 24 heures ouvrées.
            </p>

            <div className="mt-12 space-y-5 border-t border-white/6 pt-10">
              {CONTACT_BULLETS.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-1 w-1 rounded-full bg-[#c9a96e]/60" />
                  <span className="font-calibri text-[10px] uppercase tracking-widest text-white/30">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <HomdeContactForm />
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between border-t border-white/5 px-16 py-6 md:px-24 max-sm:px-8">
        <span className="font-calibri text-[9px] uppercase tracking-widest text-white/20">
          © {new Date().getFullYear()} Atlantis Immobilier
        </span>
        <div className="h-px w-32 bg-linear-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
        <span className="font-calibri text-[9px] uppercase tracking-widest text-white/20">
          Casablanca, Maroc
        </span>
      </div>
    </main>
  );
};

export default HomeContent;
