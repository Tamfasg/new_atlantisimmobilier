"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger);

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
        },
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
      <div className="relative h-72 overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url("${project.image}")` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0a0a0a, rgba(10,10,10,0.3), transparent)" }}
        />
        <div className="absolute left-5 top-5 border border-[#c9a96e]/50 bg-[#0a0a0a]/70 px-3 py-1 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e] backdrop-blur-sm">
          {project.status}
        </div>
      </div>

      <div className="p-7">
        <p className="mb-1 font-calibri text-[10px] uppercase tracking-widest text-[#c9a96e]/70">
          {project.location} · {project.typology}
        </p>
        <h3 className="mb-4 font-georgia text-3xl font-light italic text-white">
          {project.name}
        </h3>
        <p className="mb-7 text-sm leading-relaxed text-white/50">{project.description}</p>
        <button className="group/btn flex items-center gap-3 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:gap-5">
          <span>{project.cta}</span>
          <span className="block h-px w-8 bg-[#c9a96e] transition-all duration-300 group-hover/btn:w-12" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
