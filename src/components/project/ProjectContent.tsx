"use client";

import { M } from "@/components/motion";
import { useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import {
  OLIVIER_DETAILS,
  PESSAC_DETAILS,
  PROJECTS,
  SIGNATURE_FEATURES,
  UPCOMING_BENEFITS,
} from "@/app/data";

import FilterButton, {
  type ProjectFilter,
} from "@/components/project/FilterButton";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectForm from "@/components/project/ProjectForm";
import GoldLine from "@/components/UI/GoldLine";
import { SectionTag } from "@/components/UI/SectionHeader";

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

type ProjectActionKey = "pessac" | "olivier" | "signature" | "rappel";

type FilterGroup = {
  title: string;
  group: keyof ProjectFilter;
  values: string[];
};

const PROJECT_ACTIONS: Record<ProjectActionKey, ActionLink> = {
  pessac: {
    href: "/contact?projet=Pessac%20Collection",
    label: "Demander la brochure Pessac Collection",
  },
  olivier: {
    href: "/contact?projet=L%27Olivier%20du%20Parc",
    label: "Réserver une visite à L'Olivier du Parc",
  },
  signature: {
    href: "/contact?projet=Atlantis%20Signature",
    label: "Demander un rendez-vous Signature",
  },
  rappel: {
    href: "/contact",
    label: "Être rappelé",
  },
} as const;

const FILTER_GROUPS: FilterGroup[] = [
  {
    title: "Marque",
    group: "brand",
    values: [
      "Tous",
      "Atlantis Signature",
      "Pessac Collection",
      "L'Olivier du Parc",
    ],
  },
  {
    title: "Ville",
    group: "ville",
    values: ["Toutes", "Casablanca", "Had Soualem", "Littoral"],
  },
  {
    title: "Statut",
    group: "statut",
    values: ["Tous", "En cours", "À venir", "Sur rendez-vous"],
  },
  {
    title: "Typologie",
    group: "type",
    values: ["Toutes", "Résidentiel", "Bureaux", "Mixte"],
  },
];

const DEFAULT_FILTER: ProjectFilter = {
  brand: "Tous",
  ville: "Toutes",
  statut: "Tous",
  type: "Toutes",
};

const revealInitial: Record<RevealDirection, Record<string, number>> = {
  up: { opacity: 0, y: 46 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
};

const sectionTitleStyle = {
  fontSize: "clamp(2rem, 4vw, 3.5rem)",
  fontWeight: 300,
  fontStyle: "italic",
} satisfies React.CSSProperties;

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

const ProjectAction = ({
  action,
  large = false,
  filled = false,
}: {
  action: ActionLink;
  large?: boolean;
  filled?: boolean;
}) => {
  return (
    <Link
      href={action.href}
      className={[
        "inline-flex items-center justify-center border border-[#c9a96e]/60 bg-transparent font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300",
        large ? "px-10 py-4" : "px-8 py-3",
        filled
          ? "hover:bg-[#c9a96e] hover:text-[#060606]"
          : "hover:bg-[#c9a96e]/10",
      ].join(" ")}
    >
      {action.label}
    </Link>
  );
};

const ProjectDetailsList = ({
  details,
}: {
  details: readonly {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <div className="mb-10 space-y-3 border-l border-[#c9a96e]/30 pl-6">
      {details.map((detail) => (
        <div key={detail.label} className="flex gap-4">
          <span className="w-28 shrink-0 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">
            {detail.label}
          </span>

          <span className="text-sm text-white/60">{detail.value}</span>
        </div>
      ))}
    </div>
  );
};

const SectionWatermark = ({
  children,
  align = "right",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) => {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute top-10 select-none font-georgia text-[12vw] font-light italic text-white/3",
        align === "left" ? "left-0" : "right-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

const ProjectContent = () => {
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilter>(DEFAULT_FILTER);

  const { scrollYProgress } = useScroll();

  const heroTextY = useTransform(scrollYProgress, [0, 0.18], [0, -100]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter.brand !== "Tous" && project.brand !== activeFilter.brand) {
      return false;
    }

    if (
      activeFilter.ville !== "Toutes" &&
      project.city !== activeFilter.ville
    ) {
      return false;
    }

    if (
      activeFilter.statut !== "Tous" &&
      project.statut !== activeFilter.statut
    ) {
      return false;
    }

    if (activeFilter.type !== "Toutes" && project.type !== activeFilter.type) {
      return false;
    }

    return true;
  });

  const scrollToProject = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="relative w-screen overflow-x-hidden bg-[#0e0e0e] font-calibri text-white">
      <section
        className="relative flex h-screen w-screen items-end overflow-hidden bg-cover bg-center pb-24 max-sm:items-center"
        style={{
          backgroundImage: `url("/assets/projects/PESSAC/3.jpeg")`,
        }}
      >
        <M.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,6,1)_0%,rgba(6,6,6,0.65)_70%,rgba(6,6,6,0.2)_100%)]"
        />

        <M.div
          className="absolute left-0 top-0 h-1 bg-linear-to-r from-transparent via-[#c9a96e] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />

        <M.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 w-full px-10 md:px-20"
        >
          <M.p
            className="mb-4 font-calibri text-xs uppercase tracking-[0.4em] text-[#c9a96e]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nos projets
          </M.p>

          <M.h1
            className="mb-6 max-w-4xl font-calibri font-semibold leading-none text-white"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontStyle: "italic",
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Chaque projet,
            <br />
            <span className="text-[#c9a96e]">une promesse tenue.</span>
          </M.h1>

          <M.p
            className="max-w-2xl text-lg leading-relaxed text-white/50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            De nos chantiers en cours à nos programmes en préparation, chacune
            de nos opérations raconte la même histoire : celle d&apos;un
            promoteur qui assume le délai, le standard et le service.
          </M.p>
        </M.div>

        <M.div
          className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="font-calibri text-[9px] uppercase tracking-widest text-white/30">
            Défiler
          </span>

          <M.div
            className="h-10 w-px origin-top bg-linear-to-b from-[#c9a96e] to-transparent"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </M.div>
      </section>

      <Reveal className="relative border-b border-white/5 px-10 py-20 md:px-20">
        <div className="mb-12">
          <SectionTag>Explorer nos programmes</SectionTag>
        </div>

        <div className="flex flex-wrap gap-10">
          {FILTER_GROUPS.map((filterGroup) => (
            <div key={filterGroup.group}>
              <p className="mb-3 font-calibri text-lg uppercase tracking-widest text-white/25 max-sm:text-sm">
                {filterGroup.title}
              </p>

              <div className="flex flex-wrap gap-2">
                {filterGroup.values.map((value) => (
                  <FilterButton
                    key={`${filterGroup.group}-${value}`}
                    label={value}
                    group={filterGroup.group}
                    value={value}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="px-10 py-24 md:px-20">
        <SectionTag>Programmes en cours de commercialisation</SectionTag>

        <h2
          className="mb-3 font-georgia leading-tight text-white"
          style={sectionTitleStyle}
        >
          Trois adresses, une même rigueur.
        </h2>

        <p className="mb-14 text-sm text-white/40">
          Trois adresses, trois ambitions différentes, une même rigueur
          d&apos;exécution.
        </p>

        {filteredProjects.length === 0 ? (
          <p className="py-20 text-center font-calibri text-xs text-white/30">
            Aucun programme ne correspond à ces filtres.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => scrollToProject(project.id)}
              />
            ))}
          </div>
        )}
      </Reveal>

      <GoldLine />

      <Reveal
        direction="left"
        className="relative px-10 py-28 md:px-20"
      >
        <section id="pessac">
          <SectionWatermark>Pessac</SectionWatermark>

          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionTag>Pessac Collection</SectionTag>

              <h2
                className="mb-8 font-georgia leading-tight text-white"
                style={sectionTitleStyle}
              >
                Au cœur vibrant
                <br />
                de Casablanca.
              </h2>

              <p className="mb-10 text-sm leading-relaxed text-white/50">
                Pessac Collection est une œuvre architecturale contemporaine
                conçue pour raviver l&apos;esprit des joyaux de
                l&apos;architecture casablancaise. Le bâtiment réunit, dans une
                écriture sobre et raffinée en béton blanc, des appartements
                résidentiels et des plateaux de bureaux.
              </p>

              <ProjectDetailsList details={PESSAC_DETAILS.details} />

              <ProjectAction action={PROJECT_ACTIONS.pessac} />
            </div>

            <div className="space-y-10">
              <div>
                <p className="mb-5 font-calibri text-[10px] uppercase tracking-widest text-white/30">
                  Prestations
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {PESSAC_DETAILS.prestations.map((item) => (
                    <div
                      key={item}
                      className="border border-white/5 bg-white/2 px-4 py-3 text-xs text-white/50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-5 font-calibri text-[10px] uppercase tracking-widest text-white/30">
                  Pour qui
                </p>

                <div className="space-y-4">
                  {PESSAC_DETAILS.targets.map((target, index) => (
                    <div key={index} className="flex gap-4 text-sm text-white/50">
                      <span className="mt-1 text-[#c9a96e]">
                        {target.icon}
                      </span>

                      <p>{target.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <GoldLine />

      <Reveal
        direction="right"
        className="relative px-10 py-28 md:px-20"
      >
        <section id="olivier">
          <SectionWatermark align="left">Olivier</SectionWatermark>

          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionTag>L&apos;Olivier du Parc</SectionTag>

              <h2
                className="mb-8 font-georgia leading-tight text-white"
                style={sectionTitleStyle}
              >
                Habiter à Had Soualem,
                <br />
                à la porte de Casablanca.
              </h2>

              <p className="mb-10 text-sm leading-relaxed text-white/50">
                L&apos;Olivier du Parc propose un cadre résidentiel structuré,
                pensé pour les familles. Quatre tranches successives, une
                qualité de construction tenue, une commercialisation progressive
                : tout est conçu pour offrir aux acquéreurs la meilleure
                expérience possible.
              </p>

              <ProjectDetailsList details={OLIVIER_DETAILS.details} />

              <ProjectAction action={PROJECT_ACTIONS.olivier} />
            </div>

            <div className="space-y-8">
              <div className="border border-[#c9a96e]/20 bg-[#c9a96e]/3 p-8">
                <p className="mb-2 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">
                  Modalités d&apos;acquisition
                </p>

                <p className="text-sm text-white/60">
                  {OLIVIER_DETAILS.modalites}
                </p>
              </div>

              <div className="border border-white/5 bg-white/2 p-8">
                <p className="mb-2 font-calibri text-[10px] uppercase tracking-widest text-white/30">
                  Pourquoi Had Soualem
                </p>

                <p className="text-sm text-white/60">
                  {OLIVIER_DETAILS.pourquoi}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <GoldLine />

      <Reveal
        direction="up"
        className="relative overflow-hidden px-10 py-28 md:px-20"
      >
        <section id="signature">
          <SectionWatermark>Signature</SectionWatermark>

          <div className="mx-auto max-w-3xl text-center">
            <SectionTag>Atlantis Signature</SectionTag>

            <h2
              className="mb-8 font-georgia leading-tight text-white"
              style={sectionTitleStyle}
            >
              Des résidences d&apos;exception,
              <br />
              à découvrir sur rendez-vous.
            </h2>

            <p className="mb-14 text-sm leading-relaxed text-white/50">
              Plusieurs programmes Atlantis Signature sont actuellement en
              commercialisation à Casablanca et sur le littoral. Conçus comme
              des pièces uniques, en série limitée, ils sont présentés en détail
              lors d&apos;un rendez-vous personnalisé.
            </p>

            <div className="mb-14 grid gap-4 text-left sm:grid-cols-2">
              {SIGNATURE_FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex gap-4 border border-white/5 px-6 py-5 text-sm text-white/50"
                >
                  <span className="mt-1 shrink-0 text-[#c9a96e]">◆</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <ProjectAction action={PROJECT_ACTIONS.signature} large />
          </div>
        </section>
      </Reveal>

      <GoldLine />

      <Reveal className="relative overflow-hidden px-10 py-28 md:px-20">
        <section>
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-evenly">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-px w-full bg-white/2.5" />
            ))}
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2">
            <div>
              <SectionTag>Programmes à venir</SectionTag>

              <h2
                className="mb-6 font-georgia leading-tight text-white"
                style={sectionTitleStyle}
              >
                Les projets de demain.
              </h2>

              <p className="text-sm leading-relaxed text-white/50">
                Nous préparons en continu les programmes qui ouvriront leur
                commercialisation dans les prochains mois. Pour être informé en
                avant-première — et bénéficier des conditions de pré-lancement —
                inscrivez-vous à notre liste d&apos;attente prioritaire.
              </p>
            </div>

            <div className="space-y-4">
              {UPCOMING_BENEFITS.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-start gap-5 border-b border-white/5 pb-4"
                >
                  <span className="mt-1 font-calibri text-xs text-[#c9a96e]/50">
                    0{index + 1}
                  </span>

                  <p className="text-sm text-white/50">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <section className="border-t border-white/5 bg-[#0a0a0a] px-10 py-28 md:px-20">
        <div className="mx-auto max-w-2xl">
          <SectionTag>Liste d&apos;attente prioritaire</SectionTag>

          <h2
            className="mb-12 font-georgia leading-tight text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Recevoir les annonces de lancement
          </h2>

          <ProjectForm />
        </div>
      </section>

      <Reveal className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden px-10 py-28 text-center">
        <section>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.07)_0%,transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center">
            <SectionTag>Contact</SectionTag>

            <h2
              className="mb-6 max-w-2xl font-georgia leading-tight text-white"
              style={sectionTitleStyle}
            >
              Vous souhaitez découvrir un programme ?
            </h2>

            <p className="mb-10 max-w-lg text-sm text-white/40">
              Un conseiller Atlantis vous accompagne dans le choix du projet, la
              demande de brochure ou la réservation d&apos;une visite.
            </p>

            <ProjectAction action={PROJECT_ACTIONS.rappel} large filled />
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
        </section>
      </Reveal>
    </main>
  );
};

export default ProjectContent;