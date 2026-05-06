import { create } from "zustand";

type ProjectStore = {
  activeSection: number;
  setActiveSection: (section: number) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  activeSection: 1,
  setActiveSection: (section) => set({ activeSection: section }),
}));