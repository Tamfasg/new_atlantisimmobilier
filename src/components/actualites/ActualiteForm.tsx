"use client";

import { useForm } from "react-hook-form";

import { Btn } from "./ActualiteBtn";
import { Body } from "./ActualitesHelper";
import { cx } from "./ActualitesHelper";

export type NewsFormData = {
  nom: string;
  email: string;
  telephone?: string;
  sujet?: string;
};

const newsFields = [
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
    required: false,
  },
] as const;

const sujetOptions = ["Projets", "Investissement", "MRE", "Tous"];

export default function ActualiteForm() {
  const inputClassName =
    "box-border w-full border border-emerald-light/30 bg-transparent px-[clamp(0.8rem,2vw,1rem)] py-[clamp(0.65rem,2vw,0.85rem)] font-calibri text-[clamp(13px,3vw,15px)] text-cream outline-none transition-colors duration-200 placeholder:text-cream/25 focus:border-champagne/50";

  const labelClassName =
    "mb-[7px] block font-calibri text-[10px] font-bold uppercase tracking-[0.35em] text-cream/30";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsFormData>({
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      sujet: "",
    },
  });

  const onSubmit = async (data: NewsFormData) => {
    const res = await fetch("/api/actualites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error(result);
      throw new Error(result.error || "Erreur lors de l'inscription");
    }

    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="reveal-right border border-champagne/25 bg-champagne/[0.04] p-[clamp(2rem,5vw,3rem)] text-center opacity-0">
        <p className="mb-4 font-georgia text-[clamp(2rem,5vw,2.5rem)] italic text-champagne">
          Merci.
        </p>

        <Body opacity={0.55}>
          Votre inscription a bien été prise en compte. Vous recevrez nos
          prochaines actualités en avant-première.
        </Body>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="reveal-right opacity-0">
      <div className="mb-[clamp(0.8rem,2vw,1rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-[clamp(0.8rem,2vw,1rem)]">
        {newsFields.map((field) => (
          <div key={field.key}>
            <label className={labelClassName}>{field.label}</label>

            <input
              type={field.type}
              placeholder={field.label}
              {...register(field.key, {
                required: field.required
                  ? `${field.label} est obligatoire`
                  : false,
              })}
              className={inputClassName}
            />

            {errors[field.key] && (
              <p className="mt-1 font-calibri text-[9px] uppercase tracking-widest text-red-400/70">
                {errors[field.key]?.message}
              </p>
            )}
          </div>
        ))}

        <div>
          <label className={labelClassName}>Sujet d&apos;intérêt</label>

          <select
            {...register("sujet")}
            className={cx(inputClassName, "text-cream/60")}
          >
            <option value="" className="bg-emerald-luxury text-cream">
              Sélectionner
            </option>

            {sujetOptions.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-emerald-luxury text-cream"
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Btn
        label={isSubmitting ? "Inscription..." : "S'inscrire aux actualités"}
        type="submit"
        full
      />

      <p className="mt-4 font-calibri text-[11px] leading-[1.65] text-cream/[0.22]">
        Vos données sont traitées dans le strict respect de la loi 09-08
        relative à la protection des données personnelles.
      </p>
    </form>
  );
}
