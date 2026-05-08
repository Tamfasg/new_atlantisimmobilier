"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Body } from "./InvestriHelper";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const FaqItem = ({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    gsap.to(bodyRef.current, {
      height: open ? "auto" : 0,
      duration: 0.45,
      ease: "power2.inOut",
    });
  }, [open]);

  return (
    <div
      className="stagger-item border-b border-[#2E7D6A]/20 opacity-0"
      data-dir={index % 2 === 0 ? "left" : "right"}
      data-delay={`${index * 0.07}`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-[clamp(1rem,3vw,1.5rem)] text-left"
      >
        <span className="font-georgia text-[clamp(1rem,2.8vw,1.15rem)] leading-[1.3] font-normal italic text-[#F5F0E8]">
          {q}
        </span>
        <span
          className={cx(
            "inline-block shrink-0 text-[1.2rem] leading-none text-[#C9A96E] transition-transform duration-[350ms]",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      <div ref={bodyRef} className="h-0 overflow-hidden">
        <div className="pb-[clamp(1rem,3vw,1.5rem)]">
          <Body opacity={0.55}>{a}</Body>
        </div>
      </div>
    </div>
  );
};
