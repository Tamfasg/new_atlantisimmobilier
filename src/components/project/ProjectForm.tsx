"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";

export type ProjectFormData = {
  nom: string;
  email: string;
  telephone: string;
  brand: string;
  ville: string;
  type: string;
};

const SELECT_FIELDS = [
  {
    key: "brand",
    label: "Marque d'intérêt",
    options: ["Toutes", "Atlantis Signature", "Pessac Collection", "L'Olivier du Parc"],
  },
  {
    key: "ville",
    label: "Ville d'intérêt",
    options: ["Toutes", "Casablanca", "Had Soualem", "Littoral"],
  },
  {
    key: "type",
    label: "Type de projet",
    options: ["Tous", "Résidentiel", "Bureaux", "Mixte"],
  },
];

const TEXT_FIELDS = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
  { key: "telephone", label: "Téléphone", type: "tel", required: true },
];

const ProjectForm = ({
  formData,
  setFormData,
  submitted,
  handleSubmit,
}: {
  formData: ProjectFormData;
  setFormData: Dispatch<SetStateAction<ProjectFormData>>;
  submitted: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  if (submitted) {
    return (
      <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/4 p-10 text-center">
        <p className="mb-2 font-calibri text-xs uppercase tracking-widest text-[#c9a96e]">
          Inscription confirmée
        </p>
        <p className="text-sm text-white/50">
          Vous recevrez un e-mail de bienvenue sous peu. Nous vous contacterons en priorité lors du prochain lancement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {TEXT_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/30">
              {field.label}
            </label>
            <input
              type={field.type}
              value={formData[field.key as keyof ProjectFormData]}
              onChange={(e) =>
                setFormData((f) => ({
                  ...f,
                  [field.key]: e.target.value,
                }))
              }
              required={field.required}
              className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/20 focus:border-[#c9a96e]/50"
              placeholder={field.label}
            />
          </div>
        ))}

        {SELECT_FIELDS.map((select) => (
          <div key={select.key}>
            <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/30">
              {select.label}
            </label>
            <select
              value={formData[select.key as keyof ProjectFormData]}
              onChange={(e) =>
                setFormData((f) => ({
                  ...f,
                  [select.key]: e.target.value,
                }))
              }
              className="w-full border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white/60 outline-none transition-colors duration-200 focus:border-[#c9a96e]/50"
            >
              <option value="">{select.options[0]}</option>
              {select.options.slice(1).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-4 w-full border border-[#c9a96e]/60 bg-[#c9a96e]/6 py-4 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/15"
      >
        Recevoir les annonces de lancement
      </button>
    </form>
  );
};

export default ProjectForm;
