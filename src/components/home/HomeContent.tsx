"use client";

import { M } from "@/components/motion";
import { useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { BRANDS, CONFIANCE, ENGAGEMENTS, PROJECTS } from "@/app/data/home";
import HomdeContactForm from "./HomeForm";

import { DisplayH2, SectionTag } from "@/components/UI/SectionHeader";

type RevealDirection = "up" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
};

type ActionLink = {
  href: string;
  label: string;
};

type HomeActionKey =
  | "projects"
  | "brands"
  | "allProjects"
  | "advisor"
  | "projectCard";

const HOME_ACTIONS: Record<HomeActionKey, ActionLink> = {
  projects: {
    href: "/project",
    label: "Découvrir nos projets",
  },
  brands: {
    href: "/groupes",
    label: "Découvrir les trois marques",
  },
  allProjects: {
    href: "/project",
    label: "Voir tous les projets",
  },
  advisor: {
    href: "/contact#form",
    label: "Parler à un conseiller patrimonial",
  },
  projectCard: {
    href: "/project",
    label: "Découvrir",
  },
} as const;

const CONTACT_BULLETS = [
  "Réponse sous 24h ouvrées",
  "Aucun engagement",
  "Conseiller dédié",
] as const;

const heroTitleStyle = {
  fontSize: "clamp(3.2rem, 9vw, 8.5rem)",
  fontWeight: 300,
  fontStyle: "normal",
  lineHeight: 1,
} satisfies CSSProperties;

const iconStyle = {
  fontSize: "5rem",
  lineHeight: 1,
} satisfies CSSProperties;

const cardTitleStyle = {
  fontStyle: "italic",
  fontWeight: 400,
} satisfies CSSProperties;

const projectTitleStyle = {
  fontStyle: "italic",
  fontWeight: 300,
} satisfies CSSProperties;

const quoteStyle = {
  fontWeight: 300,
} satisfies CSSProperties;

const revealInitial: Record<RevealDirection, Record<string, number>> = {
  up: { opacity: 0, y: 42 },
  left: { opacity: 0, x: -56 },
  right: { opacity: 0, x: 56 },
};

const Reveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
}: RevealProps) => {
  return (
    <M.div
      className={className}
      initial={revealInitial[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </M.div>
  );
};

const PrimaryLink = ({
  action,
  className = "",
}: {
  action: ActionLink;
  className?: string;
}) => {
  return (
    <Link
      href={action.href}
      className={[
        "inline-flex items-center gap-4 border border-[#c9a96e]/60 px-8 py-4 font-calibri text-normal uppercase tracking-widest text-[#c9a96e] transition-all duration-500 hover:bg-[#c9a96e] hover:text-[#060606]",
        className,
      ].join(" ")}
    >
      <span>{action.label}</span>
      <span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
    </Link>
  );
};

const HomeContent = () => {
  const { scrollYProgress } = useScroll();

  const heroTextY = useTransform(scrollYProgress, [0, 0.18], [0, -80]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  return (
    <main className="relative w-screen overflow-x-hidden bg-[#0e0e0e] text-white">
      <M.section
        className="relative flex h-screen w-screen flex-col justify-end overflow-hidden bg-cover pb-20 max-sm:justify-center max-sm:pb-0"
        style={{
          backgroundImage: `url("/assets/projects/PESSAC/2.jpeg")`,
          backgroundPosition: "center 30%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,6,0.97)_0%,rgba(6,6,6,0.6)_45%,rgba(6,6,6,0.15)_100%)]" />

        <M.div
          className="absolute left-6 top-0 h-px bg-[linear-gradient(to_right,transparent,#c9a96e,transparent)]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 0.7 }}
          transition={{
            duration: 2.5,
            delay: 0.3,
            ease: "easeOut",
          }}
        />

        <M.div
          className="absolute left-5 top-20 w-px bg-[#c9a96e]/20"
          initial={{ height: 0 }}
          animate={{ height: "90%" }}
          transition={{
            duration: 1.8,
            delay: 0.6,
            ease: "easeOut",
          }}
        />

        <M.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 flex h-full w-full flex-col justify-end px-16 md:px-24 max-sm:justify-center max-sm:px-10 max-sm:pt-20"
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
            style={heroTitleStyle}
            className="font-georgia"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.7,
              ease: "easeOut",
            }}
          >
            Bâtir des adresses
            <br />
            <span className="text-[#c9a96e]">qui font date.</span>
          </M.h1>

          <M.p
            className="mb-10 mt-7 max-w-xl text-md leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
          >
            Atlantis Immobilier conçoit, construit et livre des lieux de vie et
            de travail au Maroc. Trois marques portent notre exigence, une seule
            signature les réunit.
          </M.p>

          <M.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
          >
            <PrimaryLink action={HOME_ACTIONS.projects} />
          </M.div>
        </M.div>

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
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
          />
        </M.div>
      </M.section>

      <Reveal className="relative overflow-hidden border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
        <div
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-georgia text-[10vw] font-light italic text-white/2.5"
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
            <p className="font-calibri text-[20px] leading-[1.85] text-white/80">
              Construire au Maroc engage une responsabilité : celle de bâtir
              pour les familles d&apos;aujourd&apos;hui et le patrimoine de
              demain. Nous tenons cette responsabilité avec la même exigence sur
              chacun de nos programmes, qu&apos;il s&apos;agisse d&apos;un
              appartement familial à Had Soualem, d&apos;une résidence
              d&apos;exception à Casablanca ou d&apos;un immeuble tertiaire au
              cœur de la capitale économique.
            </p>

            <p className="text-[15px] leading-[1.85] text-white/40">
              Notre méthode est constante : un foncier choisi, une architecture
              pensée, des matériaux maîtrisés, des délais respectés. Le reste —
              l&apos;élégance, l&apos;usage, la valeur — en découle
              naturellement.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-px w-16 bg-[#c9a96e]/40" />

              <span className="font-calibri text-[9px] uppercase tracking-[0.4em] text-[#c9a96e]/40">
                Atlantis Immobilier
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
        <Reveal className="mb-16">
          <SectionTag>Nos engagements</SectionTag>
          <DisplayH2>Ce qui nous engage.</DisplayH2>
        </Reveal>

        <div className="grid items-stretch gap-6 sm:grid-cols-2">
  {ENGAGEMENTS.map((engagement, index) => {
    const Icon = engagement.icon;

    return (
      <Reveal
        key={engagement.num}
        delay={index * 0.06}
        direction={index % 2 === 0 ? "left" : "right"}
        className="h-full"
      >
        <div className="group relative flex h-60 max-sm:h-80 select-none flex-col border border-white/6 bg-white/1.5 p-8 transition-all duration-300 hover:border-[#c9a96e]/30 hover:bg-[#c9a96e]/3">
          <div
            className="absolute right-6 top-7 font-georgia font-light italic text-gold-muted/50 transition-colors duration-300 group-hover:text-gold-muted"
            style={iconStyle}
          >
            <Icon size={48} strokeWidth={1.5} />
          </div>

          <div className="relative flex h-full flex-col">
            <p className="mb-5 max-sm:mb-5 font-calibri text-sm max-sm:text-sm uppercase tracking-widest text-[#c9a96e]/50">
              {engagement.num}
            </p>

            <h3
              className="max-sm:mb-2 max-w-[85%] font-georgia text-2xl max-sm:text-xl leading-7 text-white/90"
              style={cardTitleStyle}
            >
              {engagement.title}
            </h3>

            <p className="mt-auto text-xl max-sm:text-base leading-6 text-white/40">
              {engagement.desc}
            </p>
          </div>
        </div>
      </Reveal>
    );
  })}
</div>
      </section>

      <section className="relative overflow-hidden border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
        <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-8">
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
            méthode et le même niveau d&apos;exigence.
          </p>
        </Reveal>

        <div className="space-y-px">
          {BRANDS.map((brand, index) => (
            <Reveal
              key={brand.name}
              delay={index * 0.05}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <Link href={brand.href}>
                <div className="group flex cursor-pointer items-center justify-between gap-8 border border-white/5 bg-white/1 px-10 py-8 transition-all duration-500 hover:border-[#c9a96e]/25 hover:bg-[#c9a96e]/3 max-sm:flex-col max-sm:items-start">
                  <div className="flex items-center gap-8">
                    <span className="shrink-0 text-[3rem] font-light italic text-[#c9a96e]/20 transition-colors duration-300 group-hover:text-[#c9a96e]/40">
                      {brand.roman}
                    </span>

                    <div>
                      <p className="mb-1 font-calibri text-sm uppercase tracking-widest text-[#c9a96e]/50">
                        {brand.tag}
                      </p>

                      <h3
                        className="font-georgia text-2xl text-white/90 transition-colors duration-300 group-hover:text-white"
                        style={cardTitleStyle}
                      >
                        {brand.name}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-md text-lg text-cream/70 transition-colors duration-300 group-hover:text-cream/90 max-sm:pl-10">
                    {brand.desc}
                  </p>

                  <div className="flex shrink-0 items-center gap-3 font-calibri text-sm uppercase tracking-widest text-[#c9a96e]/40 transition-all duration-300 group-hover:text-[#c9a96e] max-sm:pl-14">
                    <span>Découvrir</span>
                    <span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href={HOME_ACTIONS.brands.href}
            className="inline-flex items-center gap-4 border border-white/10 px-8 py-3 font-calibri text-sm uppercase tracking-widest text-white/40 transition-all duration-400 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
          >
            {HOME_ACTIONS.brands.label}
          </Link>
        </Reveal>
      </section>

      <section className="border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
        <Reveal className="mb-16">
          <SectionTag>Projets en cours</SectionTag>

          <DisplayH2 className="mb-4">
            Nos projets ouverts
            <br />
            à la commercialisation.
          </DisplayH2>

          <p className="text-normal text-white/35">
            Trois adresses, trois ambitions différentes, une même rigueur
            d&apos;exécution.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.07}>
              <Link href={`/project#${project.id}`} className="flex h-full">
                <div className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden border border-white/6 bg-[#0a0a0a] transition-all duration-500 hover:border-[#c9a96e]/30">
                  <div className="relative h-110 overflow-hidden">
                    <div
                      className="h-100 scale-110 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url("${project.image}")` }}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/2 to-transparent" />

                    <div className="absolute left-4 top-4 border border-[#c9a96e]/40 bg-black/60 px-3 py-1 font-calibri text-sm uppercase tracking-widest text-[#c9a96e] backdrop-blur-sm">
                      {project.tag}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-7 py-8">
                    <p className="mb-1 font-calibri text-[12px] uppercase tracking-widest text-[#c9a96e]/50">
                      {project.location}
                    </p>

                    <h3
                      className="mb-4 font-georgia text-[1.4rem] text-white"
                      style={projectTitleStyle}
                    >
                      {project.name}
                    </h3>

                    <p className="mb-6 flex-1 text-normal leading-relaxed text-white/40">
                      {project.desc}
                    </p>

                    <div className="flex items-center gap-3 font-calibri text-[15px] uppercase tracking-widest text-[#c9a96e] transition-all duration-300">
                      <span className="pl-10 transition-all duration-300 group-hover:scale-120 group-hover:underline">
                        {HOME_ACTIONS.projectCard.label}
                      </span>

                      <span className="block h-px w-6 bg-[#c9a96e] transition-all duration-300 group-hover:w-10" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <PrimaryLink action={HOME_ACTIONS.allProjects} />
        </Reveal>
      </section>

      <Reveal className="relative overflow-hidden border-b border-white/5 px-16 py-32 md:px-24 max-sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(201,169,110,0.055)_0%,transparent_100%)]" />

        <div className="relative">
          <div className="mb-16 text-center">
            <SectionTag>Confiance</SectionTag>
            <DisplayH2>Pourquoi nous confier votre projet.</DisplayH2>
          </div>

          <div className="mb-16 grid gap-px sm:grid-cols-3">
            {CONFIANCE.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="border border-white/5 bg-white/1.5 p-10 text-center">
                  <div className="mb-3 font-georgia text-[3.5rem] font-light italic text-[#c9a96e]">
                    {item.num}
                  </div>

                  <h3 className="mb-3 text-normal font-normal uppercase tracking-wider text-white/80">
                    {item.title}
                  </h3>

                  <p className="text-[13px] leading-relaxed text-white/35">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto max-w-2xl border-l-2 border-[#c9a96e]/30 py-2 pl-8 text-center sm:text-left">
            <p className="text-2xl italic text-white/60" style={quoteStyle}>
              « Ce qui nous distingue n&apos;est pas une promesse.{" "}
              <span className="text-[#c9a96e]/80">
                C&apos;est une méthode.
              </span>{" "}
              »
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="relative overflow-hidden border-b border-white/5">
        <div className="grid lg:grid-cols-2">
          <div
            className="relative min-h-105 bg-cover bg-center"
            style={{
              backgroundImage: `url("/assets/projects/SIGNATURE/1.jpeg")`,
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_60%,#060606_100%)]" />
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
              l&apos;emplacement, étude de rendement, montage juridique et
              fiscal, gestion locative.
            </p>

            <p className="mb-10 text-normal font-light italic text-[#c9a96e]/70">
              Nous ne vendons pas une opportunité — nous construisons une
              stratégie.
            </p>

            <PrimaryLink action={HOME_ACTIONS.advisor} className="self-start" />
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-[#080808] px-16 py-32 md:px-24 max-sm:px-8">
        <div className="grid gap-20 lg:grid-cols-[1fr_1.5fr]">
          <div className="pt-1">
            <SectionTag>Contact</SectionTag>

            <DisplayH2 className="mb-6">
              Avant de partir,
              <br />
              parlons de votre projet.
            </DisplayH2>

            <p className="text-normal leading-relaxed text-white/40">
              Une visite, une question, un dossier de prix : un conseiller vous
              rappelle sous 24 heures ouvrées.
            </p>

            <div className="mt-12 space-y-5 border-t border-white/6 pt-10">
              {CONTACT_BULLETS.map((item) => (
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
            <HomdeContactForm />
          </div>
        </div>
      </Reveal>

      <footer className="flex items-center justify-between border-t border-white/5 px-16 py-6 md:px-24 max-sm:px-8">
        <span className="font-calibri text-[9px] uppercase tracking-widest text-white/20">
          © {new Date().getFullYear()} Atlantis Immobilier
        </span>

        <div className="h-px w-32 bg-linear-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

        <span className="font-calibri text-[9px] uppercase tracking-widest text-white/20">
          Casablanca, Maroc
        </span>
      </footer>
    </main>
  );
};

export default HomeContent;