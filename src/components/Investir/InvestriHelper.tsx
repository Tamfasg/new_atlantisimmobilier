import type { ReactNode } from "react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const bodyTone = {
  0.22: "text-[rgba(245,240,232,0.22)]",
  0.28: "text-[rgba(245,240,232,0.28)]",
  0.38: "text-[rgba(245,240,232,0.38)]",
  0.42: "text-[rgba(245,240,232,0.42)]",
  0.45: "text-[rgba(245,240,232,0.45)]",
  0.5: "text-[rgba(245,240,232,0.5)]",
  0.55: "text-[rgba(245,240,232,0.55)]",
  0.58: "text-[rgba(245,240,232,0.58)]",
  0.6: "text-[rgba(245,240,232,0.6)]",
} as const;

const toneClass = (color: string) =>
  color.toLowerCase() === "#2e7d6a" ? "text-[#2E7D6A]" : "text-[#C9A96E]";

const borderToneClass = (color: string, side: "top" | "bottom" | "left" | "right") => {
  const tone = color.toLowerCase() === "#2e7d6a" ? "border-[#2E7D6A]" : "border-[#C9A96E]";
  return `${side === "top" ? "border-t" : ""} ${side === "bottom" ? "border-b" : ""} ${
    side === "left" ? "border-l" : ""
  } ${side === "right" ? "border-r" : ""} ${tone}`;
};

export const GoldRule = () => (
  <div className="h-px w-full bg-[linear-gradient(to_right,transparent,#C9A96E_40%,#C9A96E_60%,transparent)] opacity-[0.45]" />
);

export const EmeraldRule = () => (
  <div className="h-px w-full bg-[linear-gradient(to_right,transparent,#2E7D6A_40%,#2E7D6A_60%,transparent)] opacity-[0.35]" />
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
      "font-georgia text-7xl max-sm:text-5xl leading-[1.07] font-normal italic text-[#F5F0E8]",
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
      "font-calibri text-[clamp(1rem,3.5vw,2remxpx)] leading-[1.85]",
      bodyTone[opacity] ?? bodyTone[0.55],
      className,
    )}
  >
    {children}
  </p>
);

export const Bracket = ({
  pos = "tl",
  color = "#C9A96E",
}: {
  pos?: "tl" | "tr" | "bl" | "br";
  color?: string;
}) => {
  const top = pos.startsWith("t");
  const left = pos.endsWith("l");

  return (
    <div
      className={cx(
        "absolute h-5 w-5 opacity-50",
        top ? "top-2.5" : "bottom-2.5",
        left ? "left-2.5" : "right-2.5",
        top && borderToneClass(color, "top"),
        !top && borderToneClass(color, "bottom"),
        left && borderToneClass(color, "left"),
        !left && borderToneClass(color, "right"),
      )}
    />
  );
};
