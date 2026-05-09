"use client";

import { useForm } from "react-hook-form";

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
    options: [
      "Toutes",
      "Atlantis Signature",
      "Pessac Collection",
      "L'Olivier du Parc",
    ],
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
] as const;

const TEXT_FIELDS = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "E-mail",
    type: "email",
    required: true,
  },
  {
    key: "telephone",
    label: "Téléphone",
    type: "tel",
    required: true,
  },
] as const;

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ProjectFormData>({
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      brand: "",
      ville: "",
      type: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    const res = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error(result);
      throw new Error(result.error || "Erreur lors de l'envoi");
    }

    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/4 p-10 text-center">
        <p className="mb-2 font-calibri text-xs uppercase tracking-widest text-[#c9a96e]">
          Inscription confirmée
        </p>

        <p className="text-sm text-white/50">
          Vous recevrez un e-mail de bienvenue sous peu. Nous vous contacterons
          en priorité lors du prochain lancement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {TEXT_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/30">
              {field.label}
            </label>

            <input
              type={field.type}
              placeholder={field.label}
              {...register(field.key, {
                required: field.required
                  ? `${field.label} est obligatoire`
                  : false,
              })}
              className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/20 focus:border-[#c9a96e]/50"
            />

            {errors[field.key] && (
              <p className="mt-1 font-calibri text-[9px] uppercase tracking-widest text-red-400/70">
                {errors[field.key]?.message}
              </p>
            )}
          </div>
        ))}

        {SELECT_FIELDS.map((select) => (
          <div key={select.key}>
            <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/30">
              {select.label}
            </label>

            <select
              {...register(select.key)}
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
        disabled={isSubmitting}
        className="mt-4 w-full border border-[#c9a96e]/60 bg-[#c9a96e]/6 py-4 font-calibri text-xs uppercase tracking-widest text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e]/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Envoi..."
          : "Recevoir les annonces de lancement"}
      </button>
    </form>
  );
};

export default ProjectForm;