const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Btn = ({
  label,
  onClick,
  type = "button",
  full = false,
  color = "#C9A96E",
  borderColor = "rgba(201,169,110,0.6)",
  className,
}: {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  full?: boolean;
  color?: string;
  borderColor?: string;
  hoverBg?: string;
  hoverText?: string;
  className?: string;
}) => {
  const isEmerald =
    color.toLowerCase() === "#2e7d6a" || borderColor.includes("46,125,106");

  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        "inline-block cursor-pointer border bg-transparent px-[clamp(1.5rem,4vw,2.2rem)] py-[clamp(0.8rem,2.5vw,1rem)] font-calibri text-[clamp(10px,2.5vw,12px)] font-bold uppercase tracking-[0.3em] transition-colors duration-[350ms]",
        full ? "w-full" : "w-auto",
        isEmerald
          ? "border-[#2E7D6A]/60 text-[#2E7D6A] hover:bg-[#2E7D6A] hover:text-[#060F0D]"
          : "border-[#C9A96E]/60 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#060F0D]",
        className,
      )}
    >
      {label}
    </button>
  );
};
