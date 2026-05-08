import Link from "next/link";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Btn = ({
  label,
  href,
  type = "button",
  color = "#C9A96E",
  borderColor = "rgba(201,169,110,0.6)",
  full = false,
  onClick,
}: {
  label: string;
  href?: string;
  type?: "button" | "submit";
  color?: string;
  borderColor?: string;
  hoverBg?: string;
  hoverText?: string;
  full?: boolean;
  onClick?: () => void;
}) => {
  const isEmerald =
    color.toLowerCase() === "#2e7d6a" || borderColor.includes("46,125,106");
  const buttonClassName = cx(
    "inline-block cursor-pointer border bg-transparent px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] text-center font-calibri text-[clamp(10px,2.5vw,12px)] font-bold uppercase tracking-[0.3em] no-underline transition-colors duration-[350ms]",
    full ? "w-full" : "w-auto",
    isEmerald
      ? "border-emerald-light/60 text-emerald-light hover:bg-emerald-light hover:text-emerald-deep"
      : "border-champagne/60 text-champagne hover:bg-champagne hover:text-emerald-deep",
  );

  if (href)
    return (
      <Link href={href} className={buttonClassName}>
        {label}
      </Link>
    );

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClassName}
    >
      {label}
    </button>
  );
};
