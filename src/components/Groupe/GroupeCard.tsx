import { BRANDS, METHODE } from "@/app/data/groupe";
import { ArrowUpRight } from "lucide-react";
import { SectionTag, SectionTitle } from "../Groupe/GroupeHelper";
import Image from "next/image";
import Link from "next/link";

export const BrandJourney = () => {
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
            <Image
              src={brand.image}
              alt={brand.name}
              fill
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



export const ValueCard = ({
  num,
  title,
  desc,
  icon: Icon,
}: {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}) => {
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

export const MethodHorizontal = () => {
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
            Cette section donne une sensation plus premium et plus rare qu’un
            simple reveal vertical. Le scroll devient une visite guidée.
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
