"use client";

import { M } from "@/components/motion";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "gsap/all";
import { Project } from "@/types";
import { OLIVIER_DETAILS, PESSAC_DETAILS, PROJECTS, SIGNATURE_FEATURES, UPCOMING_BENEFITS } from "@/app/data";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);



const useReveal = (ref: React.RefObject<HTMLElement | null>, start = "top 80%") => {
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start },
      }
    );
  }, [ref, start]);
};

const GoldLine = () => (
  <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent opacity-40" />
);

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 font-calibri text-sm uppercase tracking-[0.35em] text-[#c9a96e]">
    {children}
  </p>
);

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: project.index * 0.15,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    return () => ctx.revert();
  }, [project.index]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden border border-white/10 bg-[#0a0a0a] transition-all duration-700 hover:border-[#c9a96e]/40"
      style={{ opacity: 0 }}
    >
      {/* image */}
      <div className="relative h-72 overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url("${project.image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute left-5 top-5 border border-[#c9a96e]/50 bg-[#0a0a0a]/70 px-3 py-1 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e] backdrop-blur-sm">
          {project.status}
        </div>
      </div>

      {/* content */}
      <div className="p-7">
        <p className="mb-1 font-calibri text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]/70">
          {project.location} · {project.typology}
        </p>
        <h3 className="mb-4 font-georgia text-3xl font-light italic text-white">
          {project.name}
        </h3>
        <p className="mb-7 text-sm leading-relaxed text-white/50">
          {project.description}
        </p>
        <button className="group/btn flex items-center gap-3 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:gap-5">
          <span>{project.cta}</span>
          <span className="block h-px w-8 bg-[#c9a96e] transition-all duration-300 group-hover/btn:w-12" />
        </button>
      </div>
    </div>
  );
};


const ProjectPage = () => {
  const [activeFilter, setActiveFilter] = useState({
    brand: "Tous",
    ville: "Toutes",
    statut: "Tous",
    type: "Toutes",
  });
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    brand: "",
    ville: "",
    type: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const pessacRef = useRef<HTMLElement>(null);
  const olivierRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLElement>(null);
  const upcomingRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const filtered = PROJECTS.filter((p) => {
    if (activeFilter.brand !== "Tous" && p.brand !== activeFilter.brand)
      return false;
    if (activeFilter.ville !== "Toutes" && p.city !== activeFilter.ville)
      return false;
    if (activeFilter.statut !== "Tous" && p.statut !== activeFilter.statut)
      return false;
    if (activeFilter.type !== "Toutes" && p.type !== activeFilter.type)
      return false;
    return true;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(heroTitleRef.current, { y: -100, opacity: 0, ease: "none" })
        .to(heroOverlayRef.current, { opacity: 0, ease: "none" }, 0);

      const sections = [
        filterRef, cardsRef, pessacRef, olivierRef,
        signatureRef, upcomingRef, formRef, ctaRef,
      ];
      sections.forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          }
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

  const scrollToProject = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const FilterBtn = ({
    label,
    group,
    value,
  }: {
    label: string;
    group: keyof typeof activeFilter;
    value: string;
  }) => (
    <button
      onClick={() => setActiveFilter((f) => ({ ...f, [group]: value }))}
      className={`border px-4 py-2 font-calibri text-lg max-sm:text-sm uppercase tracking-widest transition-all duration-300 ${
        activeFilter[group] === value
          ? "border-[#c9a96e] bg-[#c9a96e]/10 text-[#c9a96e]"
          : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <main
        className="relative w-screen  bg-[#0e0e0e] text-white font-calibri"
      >
        <section
          ref={heroRef}
          className="relative flex h-screen w-screen items-end max-sm:items-center overflow-hidden pb-24"
          style={{
            backgroundImage: `url("/assets/projects/PESSAC/2.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            ref={heroOverlayRef}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,6,6,1) 0%, rgba(6,6,6,0.65) 70%, rgba(6,6,6,0.2) 100%)",
            }}
          />

          <M.div
            className="absolute left-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 0.6 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />

          <div
            ref={heroTitleRef}
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
              className="mb-6 max-w-4xl leading-[1] text-white font-calibri font-semibold"
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
              de nos opérations raconte la même histoire : celle d'un promoteur
              qui assume le délai, le standard et le service.
            </M.p>
          </div>

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
              className="h-10 w-px bg-gradient-to-b from-[#c9a96e] to-transparent"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </M.div>
        </section>

        <section
          ref={filterRef}
          className="relative border-b border-white/5 px-10 py-20 md:px-20"
          style={{ opacity: 0 }}
        >
          <div className="mb-12">
            <SectionTag>Explorer nos programmes</SectionTag>
          </div>

          <div className="flex flex-wrap gap-10">
            <div>
              <p className="mb-3 font-calibri text-lg max-sm:text-sm uppercase tracking-widest text-white/25">
                Marque
              </p>
              <div className="flex flex-wrap gap-2">
                {["Tous", "Atlantis Signature", "Pessac Collection", "L'Olivier du Parc"].map(
                  (v) => <FilterBtn key={v} label={v} group="brand" value={v} />
                )}
              </div>
            </div>

            <div>
              <p className="mb-3 font-calibri text-lg max-sm:text-sm uppercase tracking-widest text-white/25">
                Ville
              </p>
              <div className="flex flex-wrap gap-2">
                {["Toutes", "Casablanca", "Had Soualem", "Littoral"].map((v) => (
                  <FilterBtn key={v} label={v} group="ville" value={v} />
                ))}
              </div>
            </div>

            {/* Statut */}
            <div>
              <p className="mb-3 font-calibri text-lg max-sm:text-sm uppercase tracking-widest text-white/25">
                Statut
              </p>
              <div className="flex flex-wrap gap-2">
                {["Tous", "En cours", "À venir", "Sur rendez-vous"].map((v) => (
                  <FilterBtn key={v} label={v} group="statut" value={v} />
                ))}
              </div>
            </div>

            {/* Typologie */}
            <div>
              <p className="mb-3 font-calibri text-lg uppercase tracking-widest text-white/25">
                Typologie
              </p>
              <div className="flex flex-wrap gap-2">
                {["Toutes", "Résidentiel", "Bureaux", "Mixte"].map((v) => (
                  <FilterBtn key={v} label={v} group="type" value={v} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={cardsRef}
          className="px-10 py-24 md:px-20"
          style={{ opacity: 0 }}
        >
          <SectionTag>Programmes en cours de commercialisation</SectionTag>
          <h2
            className="mb-3 leading-tight text-white font-georgia"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Trois adresses, une même rigueur.
          </h2>
          <p className="mb-14 text-sm text-white/40">
            Trois adresses, trois ambitions différentes, une même rigueur
            d'exécution.
          </p>

          {filtered.length === 0 ? (
            <p className="py-20 text-center font-calibri text-xs text-white/30">
              Aucun programme ne correspond à ces filtres.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={() => scrollToProject(p.id)}
                />
              ))}
            </div>
          )}
        </section>

        <GoldLine />

        {/* ── PESSAC DETAIL ─────────────────────────────────────────────────── */}
        <section
          id="pessac"
          ref={pessacRef}
          className="relative px-10 py-28 md:px-20"
          style={{ opacity: 0 }}
        >
          {/* large ghost text */}
          <div
            className="pointer-events-none absolute right-0 top-10 select-none font-georgia text-[12vw] font-light italic text-white/[0.03]"
            aria-hidden
          >
            Pessac
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* left */}
            <div>
              <SectionTag>Pessac Collection</SectionTag>
              <h2
                className="mb-8 leading-tight text-white font-georgia"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                Au cœur vibrant
                <br />
                de Casablanca.
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-white/50">
                Pessac Collection est une œuvre architecturale contemporaine
                conçue pour raviver l'esprit des joyaux de l'architecture
                casablancaise. Le bâtiment réunit, dans une écriture sobre et
                raffinée en béton blanc, des appartements résidentiels et des
                plateaux de bureaux.
              </p>

              {/* details grid */}
              <div className="mb-10 space-y-3 border-l border-[#c9a96e]/30 pl-6">
                {PESSAC_DETAILS.details.map((d) => (
                  <div key={d.label} className="flex gap-4">
                    <span className="w-28 shrink-0 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">
                      {d.label}
                    </span>
                    <span className="text-sm text-white/60">{d.value}</span>
                  </div>
                ))}
              </div>

              <button className="border border-[#c9a96e]/60 bg-transparent px-8 py-3 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/10">
                Demander la brochure Pessac Collection
              </button>
            </div>

            {/* right */}
            <div className="space-y-10">
              {/* prestations */}
              <div>
                <p className="mb-5 font-calibri text-[10px] uppercase tracking-widest text-white/30">
                  Prestations
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PESSAC_DETAILS.prestations.map((p) => (
                    <div
                      key={p}
                      className="border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white/50"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* targets */}
              <div>
                <p className="mb-5 font-calibri text-[10px] uppercase tracking-widest text-white/30">
                  Pour qui
                </p>
                <div className="space-y-4">
                  {PESSAC_DETAILS.targets.map((t, i) => (
                    <div key={i} className="flex gap-4 text-sm text-white/50">
                      <span className="mt-1 text-[#c9a96e]">{t.icon}</span>
                      <p>{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <GoldLine />

        {/* ── OLIVIER DETAIL ────────────────────────────────────────────────── */}
        <section
          id="olivier"
          ref={olivierRef}
          className="relative px-10 py-28 md:px-20"
          style={{ opacity: 0 }}
        >
          <div
            className="pointer-events-none absolute left-0 top-10 select-none font-georgia text-[12vw] font-light italic text-white/[0.03]"
            aria-hidden
          >
            Olivier
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionTag>L'Olivier du Parc</SectionTag>
              <h2
                className="mb-8 leading-tight text-white font-georgia"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                Habiter à Had Soualem,
                <br />à la porte de Casablanca.
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-white/50">
                L'Olivier du Parc propose un cadre résidentiel structuré, pensé
                pour les familles. Quatre tranches successives, une qualité de
                construction tenue, une commercialisation progressive : tout est
                conçu pour offrir aux acquéreurs la meilleure expérience
                possible.
              </p>

              <div className="mb-10 space-y-3 border-l border-[#c9a96e]/30 pl-6">
                {OLIVIER_DETAILS.details.map((d) => (
                  <div key={d.label} className="flex gap-4">
                    <span className="w-28 shrink-0 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">
                      {d.label}
                    </span>
                    <span className="text-sm text-white/60">{d.value}</span>
                  </div>
                ))}
              </div>

              <button className="border border-[#c9a96e]/60 bg-transparent px-8 py-3 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/10">
                Réserver une visite à L'Olivier du Parc
              </button>
            </div>

            <div className="space-y-8">
              {/* modalites */}
              <div className="border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03] p-8">
                <p className="mb-2 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">
                  Modalités d'acquisition
                </p>
                <p className="text-sm text-white/60">
                  {OLIVIER_DETAILS.modalites}
                </p>
              </div>

              {/* pourquoi */}
              <div className="border border-white/5 bg-white/[0.02] p-8">
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

        <GoldLine />

        {/* ── SIGNATURE DETAIL ──────────────────────────────────────────────── */}
        <section
          id="signature"
          ref={signatureRef}
          className="relative overflow-hidden px-10 py-28 md:px-20"
          style={{ opacity: 0 }}
        >
          <div
            className="pointer-events-none absolute right-0 top-10 select-none font-georgia text-[12vw] font-light italic text-white/[0.03]"
            aria-hidden
          >
            Signature
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <SectionTag>Atlantis Signature</SectionTag>
            <h2
              className="mb-8 leading-tight text-white font-georgia"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Des résidences d'exception,
              <br />à découvrir sur rendez-vous.
            </h2>
            <p className="mb-14 text-sm leading-relaxed text-white/50">
              Plusieurs programmes Atlantis Signature sont actuellement en
              commercialisation à Casablanca et sur le littoral. Conçus comme
              des pièces uniques, en série limitée, ils sont présentés en détail
              lors d'un rendez-vous personnalisé.
            </p>

            <div className="mb-14 grid gap-4 text-left sm:grid-cols-2">
              {SIGNATURE_FEATURES.map((f) => (
                <div
                  key={f}
                  className="flex gap-4 border border-white/5 px-6 py-5 text-sm text-white/50"
                >
                  <span className="mt-1 shrink-0 text-[#c9a96e]">◆</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <button className="border border-[#c9a96e]/60 bg-transparent px-10 py-4 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/10">
              Demander un rendez-vous Signature
            </button>
          </div>
        </section>

        <GoldLine />

        {/* ── UPCOMING ──────────────────────────────────────────────────────── */}
        <section
          ref={upcomingRef}
          className="relative overflow-hidden px-10 py-28 md:px-20"
          style={{ opacity: 0 }}
        >
          {/* decorative horizontal lines */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-evenly">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-px w-full bg-white/[0.025]" />
            ))}
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2">
            <div>
              <SectionTag>Programmes à venir</SectionTag>
              <h2
                className="mb-6 leading-tight text-white font-georgia"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                Les projets de demain.
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Nous préparons en continu les programmes qui ouvriront leur
                commercialisation dans les prochains mois. Pour être informé en
                avant-première — et bénéficier des conditions de pré-lancement
                — inscrivez-vous à notre liste d'attente prioritaire.
              </p>
            </div>

            <div className="space-y-4">
              {UPCOMING_BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 border-b border-white/5 pb-4"
                >
                  <span className="mt-1 font-calibri text-xs text-[#c9a96e]/50">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-white/50">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRE-REGISTRATION FORM ─────────────────────────────────────────── */}
        <section
          ref={formRef}
          className="border-t border-white/5 bg-[#0a0a0a] px-10 py-28 md:px-20"
          style={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-2xl">
            <SectionTag>Liste d'attente prioritaire</SectionTag>
            <h2
              className="mb-12 leading-tight text-white font-georgia"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Recevoir les annonces de lancement
            </h2>

            {submitted ? (
              <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/[0.04] p-10 text-center">
                <p className="mb-2 font-calibri text-xs uppercase tracking-widest text-[#c9a96e]">
                  Inscription confirmée
                </p>
                <p className="text-sm text-white/50">
                  Vous recevrez un e-mail de bienvenue sous peu. Nous vous
                  contacterons en priorité lors du prochain lancement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { key: "nom", label: "Nom", type: "text" },
                    { key: "email", label: "E-mail", type: "email" },
                    { key: "telephone", label: "Téléphone", type: "tel" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/30">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            [field.key]: e.target.value,
                          }))
                        }
                        required={field.key !== "telephone"}
                        className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/20 focus:border-[#c9a96e]/50"
                        placeholder={field.label}
                      />
                    </div>
                  ))}

                  {[
                    {
                      key: "brand",
                      label: "Marque d'intérêt",
                      options: [
                        "Toutes",
                        "Atlantis Signature",
                        "Pessac Collection",
                        "L'Olivier du Parc",
                      ],
                    },
                    {
                      key: "ville",
                      label: "Ville d'intérêt",
                      options: ["Toutes", "Casablanca", "Had Soualem", "Littoral"],
                    },
                    {
                      key: "type",
                      label: "Type de projet",
                      options: ["Tous", "Résidentiel", "Bureaux", "Mixte"],
                    },
                  ].map((select) => (
                    <div key={select.key}>
                      <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/30">
                        {select.label}
                      </label>
                      <select
                        value={formData[select.key as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            [select.key]: e.target.value,
                          }))
                        }
                        className="w-full border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white/60 outline-none transition-colors duration-200 focus:border-[#c9a96e]/50"
                      >
                        <option value="">{select.options[0]}</option>
                        {select.options.slice(1).map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full border border-[#c9a96e]/60 bg-[#c9a96e]/[0.06] py-4 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/15"
                >
                  Recevoir les annonces de lancement
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section
          ref={ctaRef}
          className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden px-10 py-28 text-center"
          style={{ opacity: 0 }}
        >
          {/* gradient backdrop */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 70%)",
            }}
          />

          <SectionTag>Contact</SectionTag>
          <h2
            className="mb-6 max-w-2xl leading-tight text-white font-georgia"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Vous souhaitez découvrir un programme ?
          </h2>
          <p className="mb-10 max-w-lg text-sm text-white/40">
            Un conseiller Atlantis vous accompagne dans le choix du projet, la
            demande de brochure ou la réservation d'une visite.
          </p>
          <button className="border border-[#c9a96e]/60 bg-transparent px-12 py-4 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-500 hover:bg-[#c9a96e] hover:text-[#060606]">
            Être rappelé
          </button>

          {/* bottom gold line */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
        </section>
      </main>
    </>
  );
};

export default ProjectPage;