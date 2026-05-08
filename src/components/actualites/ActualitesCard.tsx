import { ARTICLES } from "@/app/data/actualites";
import Image from "next/image";
import Link from "next/link";
import { Body } from "./ActualitesHelper";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const categoryTheme = {
  Projets: {
    text: "text-champagne",
    border: "border-champagne/40",
    hoverBorder: "group-hover:border-champagne/60",
    line: "bg-champagne",
  },
  Projet: {
    text: "text-champagne",
    border: "border-champagne/40",
    hoverBorder: "group-hover:border-champagne/60",
    line: "bg-champagne",
  },
  Lancement: {
    text: "text-champagne",
    border: "border-champagne/40",
    hoverBorder: "group-hover:border-champagne/60",
    line: "bg-champagne",
  },
  Chantiers: {
    text: "text-emerald-light",
    border: "border-emerald-light/40",
    hoverBorder: "group-hover:border-emerald-light/60",
    line: "bg-emerald-light",
  },
  Investissement: {
    text: "text-olive",
    border: "border-olive/40",
    hoverBorder: "group-hover:border-olive/60",
    line: "bg-olive",
  },
  "MRE / Diaspora": {
    text: "text-stone-soft",
    border: "border-stone-soft/40",
    hoverBorder: "group-hover:border-stone-soft/60",
    line: "bg-stone-soft",
  },
  "Conseils d'achat": {
    text: "text-warm",
    border: "border-warm/40",
    hoverBorder: "group-hover:border-warm/60",
    line: "bg-warm",
  },
  "Marché immobilier": {
    text: "text-emerald-light",
    border: "border-emerald-light/40",
    hoverBorder: "group-hover:border-emerald-light/60",
    line: "bg-emerald-light",
  },
  "Groupe Atlantis": {
    text: "text-gold-muted",
    border: "border-gold-muted/40",
    hoverBorder: "group-hover:border-gold-muted/60",
    line: "bg-gold-muted",
  },
} as const;

const getCategoryTheme = (cat: string) => {
  return categoryTheme[cat as keyof typeof categoryTheme] ?? categoryTheme.Projets;
};


export const ArticleCard = ({
  article,
  index,
  variant = "grid",
}: {
  article: typeof ARTICLES[0];
  index: number;
  variant?: "grid" | "featured";
}) => {
  const dir = index % 2 === 0 ? "left" : "right";
  const accent = getCategoryTheme(article.category);

  if (variant === "featured") {
    return (
      <Link href={`/actualites/${article.slug}`} className="group block text-inherit no-underline">
        <div
          className="stagger-item grid cursor-pointer grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-0 border border-champagne/20 opacity-0 transition-colors duration-[400ms] group-hover:border-champagne/50"
          data-dir="left"
          data-delay="0"
        >
          <div className="relative min-h-[clamp(220px,35vw,360px)] overflow-hidden">
            <Image
              src={article.image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,37,28,0.72),transparent)]" />
            <div className={cx("absolute left-[1.2rem] top-[1.2rem] border bg-emerald-deep/80 px-3 py-1 backdrop-blur-md", accent.border)}>
              <span className={cx("font-calibri text-[10px] font-bold uppercase tracking-[0.3em]", accent.text)}>{article.category}</span>
            </div>
          </div>
          <div className="flex flex-col justify-between bg-emerald-luxury p-[clamp(2rem,5vw,3rem)]">
            <div>
              <p className="mb-4 font-calibri text-[11px] tracking-[0.25em] text-cream/30">{article.date} · {article.readTime} de lecture</p>
              <h3 className="mb-[1.2rem] font-georgia text-[clamp(1.4rem,3.5vw,2rem)] font-normal italic leading-[1.2] text-cream">{article.title}</h3>
              <Body opacity={0.5}>{article.desc}</Body>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span className={cx("font-calibri text-[11px] font-bold uppercase tracking-[0.3em]", accent.text)}>Lire l&apos;article</span>
              <div className={cx("h-px w-8 opacity-70", accent.line)} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/actualites/${article.slug}`} className="group block h-full text-inherit no-underline">
      <div
        className={cx(
          "stagger-item flex h-full cursor-pointer flex-col border border-emerald-light/20 bg-emerald-luxury opacity-0 transition-colors duration-[400ms] group-hover:bg-emerald-mid",
          accent.hoverBorder,
        )}
        data-dir={dir}
        data-delay={`${index * 0.08}`}
      >
        <div className="relative h-[clamp(140px,22vw,200px)] shrink-0 overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--emerald-luxury),transparent_70%)]" />
          <div className={cx("absolute left-4 top-4 border bg-emerald-deep/75 px-2.5 py-[3px] backdrop-blur-sm", accent.border)}>
            <span className={cx("font-calibri text-[9px] font-bold uppercase tracking-[0.28em]", accent.text)}>{article.category}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-[clamp(1.2rem,3vw,1.8rem)]">
          <p className="mb-3 font-calibri text-[10px] tracking-[0.2em] text-cream/[0.28]">{article.date} · {article.readTime}</p>
          <h3 className="mb-[0.85rem] flex-1 font-georgia text-[clamp(1.05rem,2.8vw,1.3rem)] font-normal italic leading-[1.25] text-cream">{article.title}</h3>
          <Body opacity={0.45} className="mb-[1.2rem] text-[clamp(12px,3vw,14px)]">{article.desc}</Body>
          <div className="mt-auto flex items-center gap-[0.6rem]">
            <span className={cx("font-calibri text-[10px] font-bold uppercase tracking-[0.28em]", accent.text)}>Lire plus</span>
            <div className={cx("h-px w-5 opacity-60", accent.line)} />
          </div>
        </div>
      </div>
    </Link>
  );
};
