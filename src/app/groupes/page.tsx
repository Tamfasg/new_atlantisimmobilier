"use client";

import Link from "next/link";
import { useEffect } from "react";
import { M } from "@/components/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ShieldCheck,
  Gem,
  Leaf,
  Building2,
  Landmark,
  MapPinned,
  UsersRound,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const VALEURS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "La parole tenue.",
    desc: "Le délai annoncé, le prix annoncé, la prestation annoncée. La fiabilité devient notre première signature.",
  },
  {
    num: "02",
    icon: Gem,
    title: "La qualité au plus haut standard.",
    desc: "Matériaux, finitions, isolation, sécurité : chaque détail doit tenir dans le temps.",
  },
  {
    num: "03",
    icon: MapPinned,
    title: "L’écoute du quartier.",
    desc: "Chaque projet dialogue avec son environnement : urbanisme, voisinage, flux et mémoire du site.",
  },
  {
    num: "04",
    icon: Landmark,
    title: "La transparence financière.",
    desc: "Pas de coûts cachés. Des conditions lisibles, un calendrier clair et une relation construite sur la confiance.",
  },
];

const METHODE = [
  {
    step: "I",
    title: "Choisir le foncier",
    desc: "Exposition, accessibilité, potentiel du quartier et qualité de vie.",
    stat: "01",
  },
  {
    step: "II",
    title: "Concevoir avec les meilleurs",
    desc: "Architectes, bureaux d’étude et équipes dédiées au programme.",
    stat: "02",
  },
  {
    step: "III",
    title: "Construire en maîtrise",
    desc: "Suivi qualité, partenaires sélectionnés et contrôle chantier régulier.",
    stat: "03",
  },
  {
    step: "IV",
    title: "Livrer et accompagner",
    desc: "La remise des clés marque le début du service après-livraison.",
    stat: "04",
  },
];

const ENGAGEMENTS = [
  {
    icon: Leaf,
    title: "Performance énergétique",
    value: 82,
    desc: "Orientation, isolation, ventilation et lumière naturelle.",
  },
  {
    icon: Building2,
    title: "Matériaux locaux",
    value: 74,
    desc: "Priorité à la filière marocaine à qualité égale.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité chantier",
    value: 91,
    desc: "Protocoles HSE stricts sur chaque site.",
  },
  {
    icon: UsersRound,
    title: "Accompagnement client",
    value: 88,
    desc: "Un suivi clair avant, pendant et après livraison.",
  },
];

const BRANDS = [
  {
    name: "Atlantis Signature",
    segment: "Haut standing",
    city: "Casablanca & littoral",
    emotion: "Élégance, exclusivité",
    image: "/assets/projects/PESSAC/2.jpeg",
    href: "/projets#signature",
  },
  {
    name: "Pessac Collection",
    segment: "Premium urbain",
    city: "Casablanca centre",
    emotion: "Mémoire & élan urbain",
    image: "/assets/projects/PESSAC/2.jpeg",
    href: "/projets#pessac",
  },
  {
    name: "L’Olivier du Parc",
    segment: "Moyen standing",
    city: "Had Soualem",
    emotion: "Sérénité, projection",
    image: "/assets/projects/PESSAC/2.jpeg",
    href: "/projets#olivier",
  },
];



const TRUST_DATA = [
  { label: "Délais", value: 86 },
  { label: "Qualité", value: 92 },
  { label: "Transparence", value: 88 },
  { label: "Service", value: 90 },
];

/* ─────────────────────────────────────────────
   SHARED TEXT
───────────────────────────────────────────── */

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <p className="font-calibri mb-5 text-xs font-bold uppercase tracking-[0.38em] text-champagne/80">
    {children}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-georgia text-[clamp(2.4rem,5vw,5rem)] font-normal italic leading-[0.98] text-cream">
    {children}
  </h2>
);

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <p className="font-calibri text-base leading-[1.9] text-cream/55">
    {children}
  </p>
);

/* ─────────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────────── */

function useGroupeAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 60,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-tilt-card]").forEach((card) => {
        const move = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateY = (x / rect.width - 0.5) * 10;
          const rotateX = -(y / rect.height - 0.5) * 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            y: -8,
            duration: 0.45,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)",
          });
        };

        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
      });

      gsap.utils.toArray<HTMLElement>("[data-horizontal-track]").forEach((track) => {
        const parent = track.parentElement;
        if (!parent) return;

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-image-mask]").forEach((img) => {
        gsap.fromTo(
          img,
          {
            clipPath: "inset(18% 18% 18% 18% round 2rem)",
            scale: 1.15,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 45%",
              scrub: 1,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function GroupeHero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-deep px-6 pb-20 md:px-20">
      <img
        src="/assets/projects/PESSAC/2.jpeg"
        alt="Atlantis Immobilier"
        className="absolute inset-0 size-full object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(201,169,110,0.22),transparent_28%),linear-gradient(to_top,#060F0D_0%,rgba(6,15,13,0.86)_35%,rgba(6,15,13,0.22)_100%)]" />

      <M.div
        className="absolute left-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 0.8 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />

      <M.div
        className="absolute left-10 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-champagne/30 to-transparent md:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      />

      <div className="relative z-10 grid w-full gap-12 md:grid-cols-[1.35fr_0.65fr] md:items-end">
        <div className="w-full h-screen flex flex-col justify-end max-sm:justify-center max-sm:pt-30 pb-30">
          <M.p
            className="font-calibri mb-6 text-xs font-bold uppercase tracking-[0.45em] text-champagne"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Le Groupe Atlantis
          </M.p>

          <M.h1
            className="font-calibri max-w-5xl text-[clamp(3.4rem,9vw,9rem)] font-normal italic leading-[0.92] text-cream"
            initial={{ y: 70, opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            Trois marques.
            <br />
            <span className="text-champagne">Une exigence.</span>
          </M.h1>

          <M.p
            className="font-calibri mt-8 max-w-2xl text-base leading-8 text-cream/55"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
          >
            Un groupe immobilier marocain qui conçoit, construit et livre des lieux
            pensés pour durer — du haut standing urbain aux résidences familiales.
          </M.p>
        </div>

       
      </div>
    </section>
  );
}

function ValueCard({
  num,
  title,
  desc,
  icon: Icon,
}: {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}) {
  return (
    <article
      data-reveal
      data-tilt-card
      className="group relative min-h-[320px] overflow-hidden rounded-[2rem] border border-champagne/15 bg-emerald-deep/35 p-8 shadow-2xl shadow-black/20 [transform-style:preserve-3d]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,169,110,0.16),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent)] opacity-70" />

      <span className="absolute right-6 top-4 font-georgia text-8xl italic text-champagne/[0.06]">
        {num}
      </span>

      <div className="relative z-10 mb-10 flex items-center justify-between">
        <div className="flex size-14 items-center justify-center rounded-full border border-champagne/25 bg-deep/40 text-champagne">
          <Icon size={22} />
        </div>

      </div>

      <div className="relative z-10">
        <h3 className="font-georgia mb-4 text-4xl max-sm:text-2xl font-normal italic leading-tight text-cream">
          {title}
        </h3>

        <p className="font-calibri text-lg leading-7 text-cream/50">{desc}</p>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-champagne transition-all duration-700 group-hover:w-full" />
    </article>
  );
}

function MethodHorizontal() {
  return (
    <section className="relative h-screen overflow-hidden bg-emerald-luxury">
      <div
        data-horizontal-track
        className="flex h-screen w-max items-center gap-8 px-6 md:px-20"
      >
        <div className="w-[85vw] max-w-[720px] shrink-0">
          <SectionTag>Notre méthode</SectionTag>
          <SectionTitle>
            Au lieu de monter, la méthode glisse de côté.
          </SectionTitle>

          <p className="font-calibri mt-8 max-w-xl text-base leading-8 text-cream/50">
            Cette section donne une sensation plus premium et plus rare qu’un simple
            reveal vertical. Le scroll devient une visite guidée.
          </p>
        </div>

        {METHODE.map((item) => (
          <article
            key={item.step}
            className="relative h-[50vh] w-[75vw] max-h-[50vh] max-w-[520px] shrink-0 overflow-hidden rounded-lg border border-champagne/15 bg-deep p-10 max-sm:py-10 md:w-[38vw]"
          >
            <div className="absolute -right-5 -top-10 font-georgia text-[12rem] italic leading-none text-champagne/[0.06]">
              {item.stat}
            </div>

            <p className="font-georgia mb-10 text-5xl italic text-champagne/60">
              {item.step}
            </p>

            <h3 className="font-georgia mb-5 text-4xl italic leading-tight text-cream">
              {item.title}
            </h3>

            <p className="font-calibri text-lg leading-8 text-cream/70">
              {item.desc}
            </p>

            <div className="absolute bottom-10 left-10 right-10 h-px bg-gradient-to-r from-champagne/60 to-transparent" />
          </article>
        ))}
      </div>
    </section>
  );
}

function RingChart({ value }: { value: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  return (
    <div className="relative size-28">
      <svg className="size-28 -rotate-90">
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="rgba(245,240,232,0.1)"
          strokeWidth="7"
          fill="transparent"
        />
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="currentColor"
          strokeWidth="7"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          className="text-champagne"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center font-georgia text-2xl italic text-cream">
        {value}
      </span>
    </div>
  );
}

function EngagementDashboard() {
  return (
    <section className="relative overflow-hidden bg-deep px-6 py-28 md:px-20">
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-champagne/30 to-transparent md:left-10" />

      <div className="mb-16 grid gap-10 md:grid-cols-[0.9fr_1.4fr]">
        <div data-reveal>
          <SectionTag>Nos engagements</SectionTag>
          <SectionTitle>
            Une page qui respire comme un dashboard de confiance.
          </SectionTitle>
        </div>

        <div
          data-reveal
          className="grid gap-3 rounded-[2rem] border border-emerald-luxury/30 bg-emerald-deep/30 p-4 md:grid-cols-4"
        >
          {TRUST_DATA.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.4rem] border border-cream/10 bg-deep/40 p-5"
            >
              <p className="font-calibri mb-4 text-xs uppercase tracking-[0.25em] text-cream/35">
                {item.label}
              </p>

              <div className="h-2 overflow-hidden rounded-full bg-cream/10">
                <div
                  className="h-full rounded-full bg-champagne"
                  style={{ width: `${item.value}%` }}
                />
              </div>

              <p className="font-georgia mt-4 text-3xl italic text-cream">
                {item.value}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {ENGAGEMENTS.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              data-reveal
              data-tilt-card
              className="rounded-[2rem] border border-cream/10 bg-[linear-gradient(145deg,rgba(11,43,38,0.9),rgba(6,15,13,0.95))] p-6"
            >
              <div className="mb-6 flex items-center justify-between ">
                <div className="flex size-12 items-center justify-center rounded-full border border-champagne/20 text-champagne">
                  <Icon size={25} />
                </div>
                <RingChart value={item.value} />
              </div>

              <h3 className="font-georgia mb-3 text-2xl italic text-cream">
                {item.title}
              </h3>

              <p className="font-calibri text-lg leading-7 text-cream/70">
                {item.desc}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function BrandJourney() {
  return (
    <section className="relative overflow-hidden bg-deep px-6 py-28 md:px-20">
      <div className="mb-14 max-w-4xl" data-reveal>
        <SectionTag>Architecture du groupe</SectionTag>
        <SectionTitle>
          Trois marques, trois mondes, une même exigence.
        </SectionTitle>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {BRANDS.map((brand, index) => (
          <Link
            href={brand.href}
            key={brand.name}
            data-reveal
            data-tilt-card
            className="group relative block h-[620px] overflow-hidden rounded-[2.5rem] border border-cream/10 bg-emerald-deep"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="absolute inset-0 size-full object-cover opacity-60 transition duration-700 group-hover:scale-110 group-hover:opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/65 to-transparent" />

            <div className="absolute left-7 top-7 flex size-16 items-center justify-center rounded-full border border-champagne/25 bg-deep/40 font-georgia text-2xl italic text-champagne">
              0{index + 1}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-calibri mb-4 text-xs uppercase tracking-[0.35em] text-champagne/70">
                {brand.segment}
              </p>

              <h3 className="font-georgia mb-4 text-4xl italic leading-tight text-cream">
                {brand.name}
              </h3>

              <p className="font-calibri mb-6 text-sm leading-7 text-cream/50">
                {brand.city} · {brand.emotion}
              </p>

              <div className="flex items-center gap-3 font-calibri text-xs font-bold uppercase tracking-[0.3em] text-champagne">
                Découvrir <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function GroupePage() {
  useGroupeAnimations();

  return (
    <main className="min-h-screen overflow-x-hidden bg-deep text-cream">
      <GroupeHero />

      <section className="relative overflow-hidden bg-emerald-deep px-6 py-28 md:px-20">
        <div className="pointer-events-none absolute right-[-4vw] top-10 font-georgia text-[18vw] italic leading-none text-emerald-luxury/15">
          Vision
        </div>

        <div className="relative grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div data-reveal>
            <SectionTag>Notre vision</SectionTag>
            <SectionTitle>
              Construire avec le temps, pas seulement avec le béton.
            </SectionTitle>
          </div>

          <div data-reveal className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
            <div>
              <BodyText>
                Un bâtiment doit servir ceux qui l’habitent et résister à ceux
                qui passent. La qualité d’un acier, la profondeur d’une fondation,
                la précision d’un détail : ce sont ces choix invisibles qui créent
                une adresse durable.
              </BodyText>

              <div className="mt-10 border-l border-champagne/40 pl-6">
                <p className="font-georgia text-2xl italic leading-relaxed text-champagne/85">
                  « Nous ne livrons pas des mètres carrés. Nous livrons des années
                  de tranquillité. »
                </p>
              </div>
            </div>

            <div
              data-image-mask
              className="h-[520px] overflow-hidden rounded-[2rem] border border-champagne/15"
            >
              <img
                src="/assets/projects/PESSAC/2.jpeg"
                alt="Architecture Atlantis"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep px-6 py-28 md:px-20">
        <div data-reveal className="mb-14 max-w-4xl">
          <SectionTag>Nos valeurs</SectionTag>
          <SectionTitle>
            Des cartes plus vivantes, riches et interactives.
          </SectionTitle>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {VALEURS.map((item) => (
            <ValueCard key={item.num} {...item} />
          ))}
        </div>
      </section>

      <MethodHorizontal />

      <EngagementDashboard />

      <BrandJourney />

      <section className="relative overflow-hidden bg-emerald-deep px-6 py-28 md:px-20">
        <div data-reveal className="mx-auto max-w-5xl text-center">
          <SectionTag>Final signature</SectionTag>

          <h2 className="font-georgia text-[clamp(3rem,8vw,8rem)] font-normal italic leading-[0.95] text-cream">
            Une seule signature.
            <br />
            <span className="text-champagne">Atlantis Immobilier.</span>
          </h2>

          <p className="font-calibri mx-auto mt-8 max-w-2xl text-base leading-8 text-cream/50">
            Résidences familiales, programmes haut standing, ensembles tertiaires :
            trois marques portent la même exigence de qualité, de transparence et
            de durée.
          </p>
        </div>
      </section>
    </main>
  );
}