"use client";

import type { ReactNode } from "react";

export const SectionTag = ({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) => (
  <p
    className={`mb-5 text-[15px] uppercase tracking-[0.4em] font-calibri select-none ${
      light ? "text-[#c9a96e]/70" : "text-[#c9a96e]"
    }`}
  >
    {children}
  </p>
);

export const DisplayH2 = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h2
    className={`leading-[1.05] text-white ${className} font-georgia font-bold select-none`}
    style={{
      fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
      fontStyle: "italic",
    }}
  >
    {children}
  </h2>
);
