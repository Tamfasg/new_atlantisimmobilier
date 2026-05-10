"use client";

import { useForm } from "react-hook-form";
import { Body, cx } from "./ActualitesHelper";
import { Btn } from "./ActualiteBtn";

const labelClass =
  "mb-2 block font-calibri text-[9px] uppercase tracking-widest text-cream/35";

const inputClass =
  "w-full border border-cream/10 bg-transparent px-4 py-3 font-calibri text-[14px] text-cream outline-none transition-colors duration-200 placeholder:text-cream/20 focus:border-champagne/45";

const actualiteFields = [
  {
    key: "nom",
    label: "Nom complet",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "Email",
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

const sujets = [
  "Recevoir les actualités",
  "Suivi des projets",
  "Conseils d’investissement",
  "Nouvelle opportunité",
  "Demande d’information",
] as const;

type ActualiteFormData = {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  consent: boolean;
};

export default function ActualiteForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ActualiteFormData>({
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      sujet: "Recevoir les actualités",
      consent: false,
    },
  });

  const onSubmit = async (data: ActualiteFormData) => {
    const res = await fetch("/api/actualites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "actualites",
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        sujet: data.sujet,
        projet: data.sujet || "Actualites",
      }),
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
      <div className="border border-champagne/25 bg-champagne/[0.04] p-[clamp(2rem,5vw,3rem)] text-center">
        <p className="mb-4 font-georgia text-[clamp(2rem,5vw,2.5rem)] italic text-champagne">
          Merci.
        </p>

        <Body opacity={0.55}>
          Votre inscription a bien été transmise. Vous recevrez les prochaines
          actualités Atlantis Immobilier.
        </Body>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[clamp(0.8rem,2vw,1rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-[clamp(0.8rem,2vw,1rem)]">
        {actualiteFields.map((field) => (
          <div key={field.key}>
            <label className={labelClass}>{field.label}</label>

            <input
              type={field.type}
              placeholder={field.label}
              {...register(field.key, {
                required: field.required
                  ? `${field.label} est obligatoire`
                  : false,
              })}
              className={inputClass}
            />

            {errors[field.key] && (
              <p className="mt-1 font-calibri text-[9px] uppercase tracking-widest text-red-400/70">
                {errors[field.key]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mb-[clamp(0.8rem,2vw,1rem)]">
        <label className={labelClass}>Sujet</label>

        <select
          {...register("sujet", {
            required: "Le sujet est obligatoire",
          })}
          className={cx(inputClass, "bg-emerald-deep text-cream/65")}
        >
          {sujets.map((sujet) => (
            <option key={sujet} value={sujet} className="bg-emerald-deep text-cream">
              {sujet}
            </option>
          ))}
        </select>

        {errors.sujet && (
          <p className="mt-1 font-calibri text-[9px] uppercase tracking-widest text-red-400/70">
            {errors.sujet.message}
          </p>
        )}
      </div>

      <div className="mb-[clamp(1.2rem,3vw,1.5rem)] flex items-start gap-3.5">
        <input
          type="checkbox"
          id="actualites-consent"
          {...register("consent", {
            required: "Vous devez accepter le traitement des données",
          })}
          className="mt-[3px] h-4 w-4 shrink-0 accent-champagne"
        />

        <label
          htmlFor="actualites-consent"
          className="cursor-pointer font-calibri text-[clamp(11px,2.5vw,12px)] leading-[1.6] text-cream/40"
        >
          J’accepte que mes données soient utilisées pour recevoir les actualités
          et être contacté par Atlantis Immobilier.
        </label>
      </div>

      {errors.consent && (
        <p className="-mt-3 mb-4 font-calibri text-[9px] uppercase tracking-widest text-red-400/70">
          {errors.consent.message}
        </p>
      )}

      <Btn
        label={isSubmitting ? "Envoi..." : "Recevoir les actualités"}
        type="submit"
        full
      />

      <p className="mt-4 font-calibri text-[11px] leading-[1.7] text-cream/25">
        Vos données sont utilisées uniquement pour traiter votre demande et vous
        transmettre les informations liées aux actualités Atlantis Immobilier.
      </p>
    </form>
  );
}