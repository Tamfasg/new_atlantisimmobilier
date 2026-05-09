"use client";

import { M } from "@/components/motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ARTICLES,
  CATEGORIES,
  CONSEILS,
  PROJECT_UPDATES,
} from "@/app/data/actualites";
import { ArticleCard } from "./ActualitesCard";
import {
  Body,
  cx,
  EmeraldRule,
  GeoGrid,
  GoldRule,
  H2,
  Tag,
} from "./ActualitesHelper";
import { Btn } from "./ActualiteBtn";
import ActualiteForm from "./ActualiteForm";

gsap.registerPlugin(ScrollTrigger);

const projectAccent = (accent: string) => {
  const normalized = accent.toLowerCase();
  if (normalized === "#2e7d6a") {
    return {
      text: "text-emerald-light",
      bg: "bg-emerald-light",
      border: "border-emerald-light",
    };
  }

  if (normalized === "#8ba888") {
    return {
      text: "text-olive",
      bg: "bg-olive",
      border: "border-olive",
    };
  }

  return {
    text: "text-champagne",
    bg: "bg-champagne",
    border: "border-champagne",
  };
};

const ActualitesPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredArticles =
    activeCategory === "Tous"
      ? ARTICLES
      : ARTICLES.filter(
          (article) =>
            article.category === activeCategory ||
            article.category.replace(/s$/, "") ===
              activeCategory.replace(/s$/, ""),
        );

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
            .to(heroTextRef.current, { y: -70, opacity: 0, ease: "none" }, 0)
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
                start: "top 86%",
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
    <main className="relative w-screen overflow-x-hidden bg-emerald-deep font-calibri text-cream selection:bg-champagne/30 selection:text-cream">
      <section
        ref={heroRef}
        className="relative flex  h-screen w-screen items-end  max-sm:items-center overflow-hidden bg-emerald-deep pb-[clamp(3rem,8vw,5rem)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--emerald-light)_1px,transparent_1px),linear-gradient(90deg,var(--emerald-light)_1px,transparent_1px)] bg-[length:clamp(40px,8vw,80px)_clamp(40px,8vw,80px)] opacity-[0.06]" />

        <div
          ref={heroOverlayRef}
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_60%,rgba(15,61,46,0.9)_0%,rgba(8,37,28,0.6)_60%,transparent_100%)]"
        />

        <M.div
          className="absolute left-0 top-0 h-0.5 bg-[linear-gradient(to_right,transparent,var(--champagne),transparent)]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 0.75 }}
          transition={{ duration: 2.5, delay: 0.3 }}
        />

        <M.div
          className="absolute top-0 left-[clamp(1rem,4vw,2.5rem)] w-px bg-champagne/20"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        <div className="pointer-events-none absolute right-[clamp(1.5rem,5vw,3rem)] top-[clamp(1.5rem,5vw,3rem)]">
          <M.div
            initial={{ opacity: 0, rotate: -12 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            <GeoGrid className="size-35 text-champagne opacity-[0.12]" />
          </M.div>
        </div>

        <div className="pointer-events-none absolute right-[clamp(0rem,5vw,2rem)] top-1/2 -translate-y-1/2 select-none font-georgia text-[clamp(200px,40vw,380px)] font-normal italic leading-none text-emerald-light/[0.055]">
          A
        </div>

        <div
          ref={heroTextRef}
          className="relative z-10 w-full px-[clamp(1.5rem,6vw,5rem)]"
        >
          <M.p
            className="mb-[clamp(0.8rem,2vw,1.2rem)] font-calibri text-[clamp(10px,3vw,13px)] font-bold uppercase tracking-[0.42em] text-champagne"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Actualités
          </M.p>

          <M.h1
            className="mb-[clamp(1rem,3vw,1.6rem)] max-w-[min(800px,85vw)] font-georgia text-[clamp(3rem,7vw,7rem)] font-semibold italic leading-[1.03] text-cream"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.05, delay: 0.6 }}
          >
            Suivre l&apos;immobilier
            <br />
            <span className="text-champagne">avec méthode.</span>
          </M.h1>

          <M.div
            className="max-w-[min(600px,88vw)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
          >
            <Body opacity={0.5}>
              Nouveaux programmes, avancement des chantiers, conseils
              d&apos;acquisition, tendances du marché et informations utiles :
              retrouvez ici les actualités d&apos;Atlantis Immobilier.
            </Body>
          </M.div>
        </div>

        <M.div
          className="absolute bottom-[clamp(1.5rem,4vw,2.5rem)] right-[clamp(1.5rem,4vw,2.5rem)] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-cream/[0.22]">
            Défiler
          </span>
          <M.div
            className="h-9 w-px bg-[linear-gradient(to_bottom,var(--champagne),transparent)]"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.1 }}
          />
        </M.div>
      </section>

      <section className="bg-emerald-deep px-[clamp(1.5rem,6vw,5rem)] py-[clamp(4rem,9vw,6rem)]">
        <div className="reveal-left mb-[clamp(2rem,5vw,3rem)] opacity-0">
          <Tag>À la une</Tag>
          <H2>Nos dernières informations importantes.</H2>
        </div>
        <ArticleCard article={ARTICLES[0]} index={0} variant="featured" />
      </section>

      <GoldRule />

      <section className="border-b border-emerald-light/20 bg-emerald-luxury px-[clamp(1.5rem,6vw,5rem)] py-[clamp(2.5rem,6vw,4rem)]">
        <p className="reveal-left mb-[clamp(1rem,2.5vw,1.5rem)] font-calibri text-[clamp(12px,2.8vw,14px)] font-normal text-cream/40 opacity-0">
          Explorer par sujet
        </p>
        <div className="reveal-up flex flex-wrap gap-[0.6rem] opacity-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cx(
                "cursor-pointer border px-[clamp(0.8rem,2.5vw,1.1rem)] py-[clamp(0.4rem,1.5vw,0.55rem)] font-calibri text-[clamp(10px,2.5vw,12px)] font-bold uppercase tracking-[0.25em] transition-all duration-300",
                activeCategory === cat
                  ? "border-champagne bg-champagne/10 text-champagne"
                  : "border-emerald-light/30 bg-transparent text-cream/[0.45] hover:border-champagne/50 hover:text-champagne",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-emerald-deep px-[clamp(1.5rem,6vw,5rem)] py-[clamp(4rem,9vw,6rem)]">
        <div className="reveal-left mb-[clamp(2rem,5vw,3rem)] opacity-0">
          <Tag>Dernières actualités</Tag>
          <H2 className="mb-3">Articles récents.</H2>
          <Body opacity={0.42}>
            Un espace pour mieux comprendre nos projets, suivre leur évolution
            et préparer votre acquisition avec plus de clarté.
          </Body>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="border border-emerald-light/20 px-8 py-[clamp(4rem,10vw,7rem)] text-center">
            <p className="mb-4 font-georgia text-[clamp(1.5rem,4vw,2.5rem)] italic text-cream">
              Les actualités arrivent bientôt.
            </p>
            <Body opacity={0.45} className="mx-auto mb-8 max-w-[500px]">
              Nos équipes préparent les premières publications : annonces de
              lancement, conseils d&apos;achat, suivi de projets et informations
              dédiées aux investisseurs.
            </Body>
            <Btn label="Découvrir nos projets" href="/projets" />
          </div>
        ) : (
          <div
            className={cx(
              "grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-[clamp(1rem,2.5vw,1.5rem)]",
              filteredArticles.length > 1
                ? "bg-emerald-light/[0.12]"
                : "bg-transparent",
            )}
          >
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        )}
      </section>

      <EmeraldRule />

      <section className="relative overflow-hidden bg-emerald-luxury px-[clamp(1.5rem,6vw,5rem)] py-[clamp(4rem,9vw,6rem)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--emerald-light)_1px,transparent_1px)] bg-[length:clamp(22px,4vw,36px)_clamp(22px,4vw,36px)] opacity-[0.12]" />

        <div className="reveal-left relative mb-[clamp(2rem,5vw,3.5rem)] opacity-0">
          <Tag>Conseils & expertise</Tag>
          <H2 className="mb-3">Mieux acheter, mieux investir.</H2>
          <Body opacity={0.42} className="max-w-[min(640px,90vw)]">
            Atlantis Immobilier accompagne les acquéreurs dans leurs décisions :
            comprendre un emplacement, lire une grille de prix, évaluer une
            typologie, préparer son financement.
          </Body>
        </div>

        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-px bg-emerald-light/20">
          {CONSEILS.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className="group text-inherit no-underline"
            >
              <div
                className="stagger-item relative cursor-pointer border-t-2 border-transparent bg-emerald-luxury px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(2rem,5vw,3rem)] opacity-0 transition-colors duration-[400ms] group-hover:border-t-champagne group-hover:bg-emerald-mid"
                data-dir={i % 2 === 0 ? "left" : "right"}
                data-delay={`${i * 0.12}`}
              >
                <p className="mb-4 text-[clamp(1.6rem,4vw,2rem)] leading-none text-champagne">
                  {c.icon}
                </p>
                <h3 className="mb-[0.85rem] font-georgia text-[clamp(1.1rem,3vw,1.3rem)] italic leading-[1.3] text-cream">
                  {c.title}
                </h3>
                <Body
                  opacity={0.48}
                  className="mb-6 text-[clamp(13px,3vw,15px)]"
                >
                  {c.desc}
                </Body>
                <div className="flex items-center gap-[0.6rem]">
                  <span className="font-calibri text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">
                    En savoir plus
                  </span>
                  <div className="h-px w-5 bg-champagne opacity-60" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <GoldRule />

      <section className="bg-emerald-deep px-[clamp(1.5rem,6vw,5rem)] py-[clamp(4rem,9vw,6rem)]">
        <div className="reveal-left mb-[clamp(2rem,5vw,3.5rem)] opacity-0">
          <Tag>Suivi des projets</Tag>
          <H2 className="mb-3">Avancement des programmes.</H2>
          <Body opacity={0.42} className="max-w-[min(640px,90vw)]">
            Un espace dédié aux informations de chantier, aux étapes de
            commercialisation, aux nouvelles tranches et aux annonces
            importantes liées à nos programmes.
          </Body>
        </div>

        <div className="flex flex-col gap-px bg-emerald-light/15">
          {PROJECT_UPDATES.map((proj, i) => {
            const accent = projectAccent(proj.accent);

            return (
              <Link
                key={proj.name}
                href={proj.href}
                className="group text-inherit no-underline"
              >
                <div
                  className="stagger-item grid cursor-pointer grid-cols-[clamp(50px,10vw,90px)_1fr_auto] items-center gap-[clamp(1rem,3vw,2rem)] bg-emerald-deep p-[clamp(1.5rem,4vw,2.2rem)] opacity-0 transition-colors duration-[350ms] group-hover:bg-emerald-luxury"
                  data-dir={i % 2 === 0 ? "left" : "right"}
                  data-delay={`${i * 0.12}`}
                >
                  <span
                    className={cx(
                      "font-georgia text-[clamp(1.5rem,4vw,2.2rem)] italic opacity-60",
                      accent.text,
                    )}
                  >
                    {proj.roman}
                  </span>
                  <div>
                    <h3 className="mb-[0.4rem] font-georgia text-[clamp(1.1rem,3vw,1.4rem)] italic text-cream">
                      {proj.name}
                    </h3>
                    <Body
                      opacity={0.45}
                      className="text-[clamp(13px,3vw,15px)]"
                    >
                      {proj.desc}
                    </Body>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <div
                      className={cx(
                        "h-px w-[clamp(16px,4vw,28px)] opacity-[0.55]",
                        accent.bg,
                      )}
                    />
                    <div
                      className={cx(
                        "size-1.5 rotate-45 border-r border-t opacity-[0.55]",
                        accent.border,
                      )}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <EmeraldRule />

      <section className="bg-emerald-luxury px-[clamp(1.5rem,6vw,5rem)] py-[clamp(4rem,9vw,6rem)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[clamp(2.5rem,6vw,5rem)]">
          <div>
            <div className="reveal-left opacity-0">
              <Tag>Restez informé</Tag>
              <H2 className="mb-[clamp(1rem,3vw,1.5rem)]">
                Recevoir les actualités Atlantis.
              </H2>
              <Body opacity={0.5} className="mb-[clamp(1.5rem,4vw,2.5rem)]">
                Inscrivez-vous pour recevoir nos annonces de lancement, nos
                conseils d&apos;investissement et les informations importantes
                sur nos programmes.
              </Body>

              <div className="flex flex-col gap-[0.85rem]">
                {[
                  "Annonces de lancement en avant-première",
                  "Conseils d'investissement exclusifs",
                  "Suivi d'avancement des chantiers",
                  "Aucun spam, désinscription en un clic",
                ].map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="mt-[0.4rem] text-[0.6rem] text-champagne">
                      ◆
                    </span>
                    <Body opacity={0.5} className="text-[clamp(13px,3vw,15px)]">
                      {b}
                    </Body>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <ActualiteForm />
          </div>
        </div>
      </section>

      <GoldRule />

      <section className="relative overflow-hidden bg-emerald-deep px-[clamp(1.5rem,6vw,5rem)] py-[clamp(4rem,9vw,6rem)] text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(46,125,106,0.1)_0%,transparent_100%)]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <GeoGrid className="size-[260px] text-champagne opacity-[0.05]" />
        </div>

        <div className="reveal-up relative opacity-0">
          <Tag>Parlons de votre projet</Tag>
          <H2 className="mx-auto mb-[clamp(0.8rem,2.5vw,1.2rem)] max-w-[min(700px,90vw)]">
            Une actualité vous intéresse ?
          </H2>
          <Body
            opacity={0.45}
            className="mx-auto mb-[clamp(2rem,5vw,3rem)] max-w-[min(520px,88vw)]"
          >
            Un conseiller Atlantis peut vous rappeler pour vous présenter un
            programme, vous envoyer une brochure ou répondre à vos questions.
          </Body>
          <Btn label="Être rappelé" href="/investir#contact" />
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(to_right,transparent,var(--champagne),transparent)] opacity-30" />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-light/20 px-[clamp(1.5rem,6vw,5rem)] py-[clamp(1rem,3vw,1.5rem)]">
        <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-cream/20">
          © {new Date().getFullYear()} Atlantis Immobilier
        </span>
        <div className="h-px w-20 bg-[linear-gradient(to_right,transparent,var(--champagne),transparent)] opacity-30" />
        <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-cream/20">
          Casablanca, Maroc
        </span>
      </div>
    </main>
  );
};

export default ActualitesPage;
