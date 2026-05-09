import { create } from "zustand";

export type ContactFormData = {
  nom: string;
  email: string;
  telephone: string;
  ville?: string;
  projet?: string;
  interet?: string;
  message?: string;
};

type ContactStore = {
  submitted: boolean;
  setSubmitted: (value: boolean) => void;
  resetSubmitted: () => void;
};

export const useContactStore = create<ContactStore>((set) => ({
  submitted: false,

  setSubmitted: (value) => set({ submitted: value }),

  resetSubmitted: () => set({ submitted: false }),
}));