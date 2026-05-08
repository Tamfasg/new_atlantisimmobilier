"use client";

import { M } from "@/components/motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import { Project } from "@/types";
import {
  PROJECTS,
  PESSAC_DETAILS,
  OLIVIER_DETAILS,
  SIGNATURE_FEATURES,
  UPCOMING_BENEFITS,
} from "@/app/data";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectForm, { type ProjectFormData } from "@/components/project/ProjectForm";
import FilterButton, { type ProjectFilter } from "@/components/project/FilterButton";
import { SectionTag, DisplayH2 } from "@/components/UI/SectionHeader";
import GoldLine from "@/components/UI/GoldLine";

gsap.registerPlugin(ScrollTrigger);

const ProjectContent = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>({
    brand: "Tous",
    ville: "Toutes",
    statut: "Tous",
    type: "Toutes",
  });

  const [formData, setFormData] = useState<ProjectFormData>({
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
  const filterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const pessacRef = useRef<HTMLElement>(null);
  const olivierRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLElement>(null);
  const upcomingRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const filtered = PROJECTS.filter((p) => {
    if (activeFilter.brand !== "Tous" && p.brand !== activeFilter.brand) return false;
    if (activeFilter.ville !== "Toutes" && p.city !== activeFilter.ville) return false;
    if (activeFilter.statut !== "Tous" && p.statut !== activeFilter.statut) return false;
    if (activeFilter.type !== "Toutes" && p.type !== activeFilter.type) return false;
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
        filterRef,
        cardsRef,
        pessacRef,
        olivierRef,
        signatureRef,
        upcomingRef,
        formRef,
        ctaRef,
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
          },
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToProject = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative w-screen bg-[#0e0e0e] text-white font-calibri">
      <section
        ref={heroRef}
        className="relative flex h-screen w-screen items-end max-sm:items-center overflow-hidden pb-24"
        style={{
          backgroundImage: `url("/assets/projects/PESSAC/3.jpeg")`,
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
          className="absolute left-0 top-0 h-1 bg-linear-to-r from-transparent via-[#c9a96e] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />

        <div ref={heroTitleRef} className="relative z-10 w-full px-10 md:px-20">
          <M.p
            className="mb-4 font-calibri text-xs uppercase tracking-[0.4em] text-[#c9a96e]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nos projets
          </M.p>

          <M.h1
            className="mb-6 max-w-4xl leading-none text-white font-calibri font-semibold"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontStyle: "italic" }}
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
            De nos chantiers en cours à nos programmes en préparation, chacune de nos opérations raconte la même histoire : celle d'un promoteur qui assume le délai, le standard et le service.
          </M.p>
        </div>

        <M.div
          className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="font-calibri text-[9px] uppercase tracking-widest text-white/30">Défiler</span>
          <M.div
            className="h-10 w-px bg-linear-to-b from-[#c9a96e] to-transparent"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </M.div>
      </section>

      <M.div
        ref={filterRef}
        className="relative border-b border-white/5 px-10 py-20 md:px-20"
      >
        <div className="mb-12">
          <SectionTag>Explorer nos programmes</SectionTag>
        </div>

        <div className="flex flex-wrap gap-10">
          <div>
            <p className="mb-3 font-calibri text-lg max-sm:text-sm uppercase tracking-widest text-white/25">Marque</p>
            <div className="flex flex-wrap gap-2">
              {["Tous", "Atlantis Signature", "Pessac Collection", "L'Olivier du Parc"].map((value) => (
                <FilterButton
                  key={value}
                  label={value}
                  group="brand"
                  value={value}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-calibri text-lg max-sm:text-sm uppercase tracking-widest text-white/25">Ville</p>
            <div className="flex flex-wrap gap-2">
              {["Toutes", "Casablanca", "Had Soualem", "Littoral"].map((value) => (
                <FilterButton
                  key={value}
                  label={value}
                  group="ville"
                  value={value}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-calibri text-lg max-sm:text-sm uppercase tracking-widest text-white/25">Statut</p>
            <div className="flex flex-wrap gap-2">
              {["Tous", "En cours", "À venir", "Sur rendez-vous"].map((value) => (
                <FilterButton
                  key={value}
                  label={value}
                  group="statut"
                  value={value}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-calibri text-lg uppercase tracking-widest text-white/25">Typologie</p>
            <div className="flex flex-wrap gap-2">
              {["Toutes", "Résidentiel", "Bureaux", "Mixte"].map((value) => (
                <FilterButton
                  key={value}
                  label={value}
                  group="type"
                  value={value}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              ))}
            </div>
          </div>
        </div>
      </M.div>

      <section ref={cardsRef} className="px-10 py-24 md:px-20">
        <SectionTag>Programmes en cours de commercialisation</SectionTag>
        <h2
          className="mb-3 leading-tight text-white font-georgia"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, fontStyle: "italic" }}
        >
          Trois adresses, une même rigueur.
        </h2>
        <p className="mb-14 text-sm text-white/40">
          Trois adresses, trois ambitions différentes, une même rigueur d'exécution.
        </p>

        {filtered.length === 0 ? (
          <p className="py-20 text-center font-calibri text-xs text-white/30">Aucun programme ne correspond à ces filtres.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => scrollToProject(project.id)} />
            ))}
          </div>
        )}
      </section>

      <GoldLine />

      <section
        id="pessac"
        ref={pessacRef}
        className="relative px-10 py-28 md:px-20"
      >
        <div className="pointer-events-none absolute right-0 top-10 select-none font-georgia text-[12vw] font-light italic text-white/3" aria-hidden>
          Pessac
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionTag>Pessac Collection</SectionTag>
            <h2
              className="mb-8 leading-tight text-white font-georgia"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, fontStyle: "italic" }}
            >
              Au cœur vibrant
              <br />
              de Casablanca.
            </h2>
            <p className="mb-10 text-sm leading-relaxed text-white/50">
              Pessac Collection est une œuvre architecturale contemporaine conçue pour raviver l'esprit des joyaux de l'architecture casablancaise. Le bâtiment réunit, dans une écriture sobre et raffinée en béton blanc, des appartements résidentiels et des plateaux de bureaux.
            </p>

            <div className="mb-10 space-y-3 border-l border-[#c9a96e]/30 pl-6">
              {PESSAC_DETAILS.details.map((detail) => (
                <div key={detail.label} className="flex gap-4">
                  <span className="w-28 shrink-0 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">{detail.label}</span>
                  <span className="text-sm text-white/60">{detail.value}</span>
                </div>
              ))}
            </div>

            <button className="border border-[#c9a96e]/60 bg-transparent px-8 py-3 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/10">
              Demander la brochure Pessac Collection
            </button>
          </div>

          <div className="space-y-10">
            <div>
              <p className="mb-5 font-calibri text-[10px] uppercase tracking-widest text-white/30">Prestations</p>
              <div className="grid grid-cols-2 gap-2">
                {PESSAC_DETAILS.prestations.map((item) => (
                  <div key={item} className="border border-white/5 bg-white/2 px-4 py-3 text-xs text-white/50">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-5 font-calibri text-[10px] uppercase tracking-widest text-white/30">Pour qui</p>
              <div className="space-y-4">
                {PESSAC_DETAILS.targets.map((target, index) => (
                  <div key={index} className="flex gap-4 text-sm text-white/50">
                    <span className="mt-1 text-[#c9a96e]">{target.icon}</span>
                    <p>{target.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldLine />

      <section id="olivier" ref={olivierRef} className="relative px-10 py-28 md:px-20">
        <div className="pointer-events-none absolute left-0 top-10 select-none font-georgia text-[12vw] font-light italic text-white/3" aria-hidden>
          Olivier
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionTag>L'Olivier du Parc</SectionTag>
            <h2
              className="mb-8 leading-tight text-white font-georgia"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, fontStyle: "italic" }}
            >
              Habiter à Had Soualem,
              <br />
              à la porte de Casablanca.
            </h2>
            <p className="mb-10 text-sm leading-relaxed text-white/50">
              L'Olivier du Parc propose un cadre résidentiel structuré, pensé pour les familles. Quatre tranches successives, une qualité de construction tenue, une commercialisation progressive : tout est conçu pour offrir aux acquéreurs la meilleure expérience possible.
            </p>

            <div className="mb-10 space-y-3 border-l border-[#c9a96e]/30 pl-6">
              {OLIVIER_DETAILS.details.map((detail) => (
                <div key={detail.label} className="flex gap-4">
                  <span className="w-28 shrink-0 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">{detail.label}</span>
                  <span className="text-sm text-white/60">{detail.value}</span>
                </div>
              ))}
            </div>

            <button className="border border-[#c9a96e]/60 bg-transparent px-8 py-3 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/10">
              Réserver une visite à L'Olivier du Parc
            </button>
          </div>

          <div className="space-y-8">
            <div className="border border-[#c9a96e]/20 bg-[#c9a96e]/3 p-8">
              <p className="mb-2 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/60">Modalités d'acquisition</p>
              <p className="text-sm text-white/60">{OLIVIER_DETAILS.modalites}</p>
            </div>

            <div className="border border-white/5 bg-white/2 p-8">
              <p className="mb-2 font-calibri text-[10px] uppercase tracking-widest text-white/30">Pourquoi Had Soualem</p>
              <p className="text-sm text-white/60">{OLIVIER_DETAILS.pourquoi}</p>
            </div>
          </div>
        </div>
      </section>

      <GoldLine />

      <section id="signature" ref={signatureRef} className="relative overflow-hidden px-10 py-28 md:px-20">
        <div className="pointer-events-none absolute right-0 top-10 select-none font-georgia text-[12vw] font-light italic text-white/3" aria-hidden>
          Signature
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <SectionTag>Atlantis Signature</SectionTag>
          <h2
            className="mb-8 leading-tight text-white font-georgia"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, fontStyle: "italic" }}
          >
            Des résidences d'exception,
            <br />
            à découvrir sur rendez-vous.
          </h2>
          <p className="mb-14 text-sm leading-relaxed text-white/50">
            Plusieurs programmes Atlantis Signature sont actuellement en commercialisation à Casablanca et sur le littoral. Conçus comme des pièces uniques, en série limitée, ils sont présentés en détail lors d'un rendez-vous personnalisé.
          </p>

          <div className="mb-14 grid gap-4 text-left sm:grid-cols-2">
            {SIGNATURE_FEATURES.map((feature) => (
              <div key={feature} className="flex gap-4 border border-white/5 px-6 py-5 text-sm text-white/50">
                <span className="mt-1 shrink-0 text-[#c9a96e]">◆</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button className="border border-[#c9a96e]/60 bg-transparent px-10 py-4 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/10">
            Demander un rendez-vous Signature
          </button>
        </div>
      </section>

      <GoldLine />

      <section ref={upcomingRef} className="relative overflow-hidden px-10 py-28 md:px-20">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-evenly">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-px w-full bg-white/2.5" />
          ))}
        </div>

        <div className="relative grid gap-16 lg:grid-cols-2">
          <div>
            <SectionTag>Programmes à venir</SectionTag>
            <h2
              className="mb-6 leading-tight text-white font-georgia"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, fontStyle: "italic" }}
            >
              Les projets de demain.
            </h2>
            <p className="text-sm leading-relaxed text-white/50">
              Nous préparons en continu les programmes qui ouvriront leur commercialisation dans les prochains mois. Pour être informé en avant-première — et bénéficier des conditions de pré-lancement — inscrivez-vous à notre liste d'attente prioritaire.
            </p>
          </div>

          <div className="space-y-4">
            {UPCOMING_BENEFITS.map((benefit, index) => (
              <div key={index} className="flex items-start gap-5 border-b border-white/5 pb-4">
                <span className="mt-1 font-calibri text-xs text-[#c9a96e]/50">0{index + 1}</span>
                <p className="text-sm text-white/50">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} className="border-t border-white/5 bg-[#0a0a0a] px-10 py-28 md:px-20">
        <div className="mx-auto max-w-2xl">
          <SectionTag>Liste d'attente prioritaire</SectionTag>
          <h2
            className="mb-12 leading-tight text-white font-georgia"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, fontStyle: "italic" }}
          >
            Recevoir les annonces de lancement
          </h2>

          <ProjectForm formData={formData} setFormData={setFormData} submitted={submitted} handleSubmit={handleSubmit} />
        </div>
      </section>

      <section
        ref={ctaRef}
        className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden px-10 py-28 text-center"
      >
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
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, fontStyle: "italic" }}
        >
          Vous souhaitez découvrir un programme ?
        </h2>
        <p className="mb-10 max-w-lg text-sm text-white/40">
          Un conseiller Atlantis vous accompagne dans le choix du projet, la demande de brochure ou la réservation d'une visite.
        </p>
        <button className="border border-[#c9a96e]/60 bg-transparent px-12 py-4 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-500 hover:bg-[#c9a96e] hover:text-[#060606]">
          Être rappelé
        </button>

        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
      </section>
    </main>
  );
};

export default ProjectContent;
