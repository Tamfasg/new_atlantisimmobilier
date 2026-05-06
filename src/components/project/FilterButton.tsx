"use client";

import type { Dispatch, SetStateAction } from "react";

export type ProjectFilter = {
  brand: string;
  ville: string;
  statut: string;
  type: string;
};

const FilterButton = ({
  label,
  group,
  value,
  activeFilter,
  setActiveFilter,
}: {
  label: string;
  group: keyof ProjectFilter;
  value: string;
  activeFilter: ProjectFilter;
  setActiveFilter: Dispatch<SetStateAction<ProjectFilter>>;
}) => (
  <button
    type="button"
    onClick={() => setActiveFilter((f) => ({ ...f, [group]: value }))}
    className={`border px-4 py-2 font-calibri text-lg max-sm:text-sm uppercase tracking-widest transition-all duration-300 ${
      activeFilter[group] === value
        ? "border-[#c9a96e] bg-[#c9a96e]/10 text-[#c9a96e]"
        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
    }`}
  >
    {label}
  </button>
);

export default FilterButton;
