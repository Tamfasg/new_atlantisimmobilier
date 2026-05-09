
import type { ReactNode } from "react";

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const bodyTone = {
  0.22: "text-cream/[0.22]",
  0.28: "text-cream/[0.28]",
  0.3: "text-cream/30",
  0.35: "text-cream/35",
  0.4: "text-cream/40",
  0.42: "text-cream/[0.42]",
  0.45: "text-cream/[0.45]",
  0.48: "text-cream/[0.48]",
  0.5: "text-cream/50",
  0.55: "text-cream/55",
  0.6: "text-cream/60",
} as const;

const toneClass = (color: string) =>
  color.toLowerCase() === "#2e7d6a" ? "text-emerald-light" : "text-champagne";

export const GoldRule = () => (
  <div className="h-px w-full bg-[linear-gradient(to_right,transparent,var(--champagne)_40%,var(--champagne)_60%,transparent)] opacity-40" />
);

export const EmeraldRule = () => (
  <div className="h-px w-full bg-[linear-gradient(to_right,transparent,var(--emerald-light)_40%,var(--emerald-light)_60%,transparent)] opacity-30" />
);

export const Tag = ({
  children,
  color = "#C9A96E",
  className,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) => (
  <p
    className={cx(
      "mb-[clamp(12px,3vw,18px)] font-calibri text-[clamp(10px,2.5vw,12px)] font-bold uppercase tracking-[0.4em]",
      toneClass(color),
      className,
    )}
  >
    {children}
  </p>
);

export const H2 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h2
    className={cx(
      "font-georgia text-[clamp(1.9rem,5vw,3.8rem)] font-normal italic leading-[1.07] text-cream",
      className,
    )}
  >
    {children}
  </h2>
);

export const Body = ({
  children,
  opacity = 0.55,
  className,
}: {
  children: ReactNode;
  opacity?: keyof typeof bodyTone;
  className?: string;
}) => (
  <p
    className={cx(
      "font-calibri text-[clamp(1rem,3.5vw,16px)] leading-[1.85]",
      bodyTone[opacity] ?? bodyTone[0.55],
      className,
    )}
  >
    {children}
  </p>
);

export const GeoGrid = ({ className }: { className?: string }) => (
  <svg
    className={cx("size-[180px] text-champagne opacity-[0.07]", className)}
    viewBox="0 0 180 180"
    fill="none"
    aria-hidden="true"
  >
    <polygon points="90,5 169,47.5 169,132.5 90,175 11,132.5 11,47.5" stroke="currentColor" strokeWidth="1.2" />
    <polygon points="90,22 152,56 152,124 90,158 28,124 28,56" stroke="currentColor" strokeWidth="0.7" />
    <polygon points="90,40 134,64 134,116 90,140 46,116 46,64" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="90" cy="90" r="12" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <circle cx="90" cy="90" r="3" fill="currentColor" />
    <line x1="0" y1="90" x2="180" y2="90" stroke="currentColor" strokeWidth="0.3" />
    <line x1="90" y1="0" x2="90" y2="180" stroke="currentColor" strokeWidth="0.3" />
  </svg>
);

