"use client";

import { useForm } from "react-hook-form";
import { cx } from "./InvestirContent";
import { Btn } from "./InvestirBtn";
import { Body } from "./InvestriHelper";


const labelClass =
  "mb-2 block font-calibri text-[9px] uppercase tracking-widest text-[rgba(245,240,232,0.35)]";

const inputClass =
  "w-full border border-[rgba(245,240,232,0.1)] bg-transparent px-4 py-3 font-calibri text-normal text-[#F5F0E8] outline-none transition-colors duration-200 placeholder:text-[rgba(245,240,232,0.18)] focus:border-[rgba(201,169,110,0.45)]";

const contactFields = [
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
  {
    key: "ville",
    label: "Ville",
    type: "text",
    required: false,
  },
] as const;

const contactSelects = [
  {
    key: "profil",
    label: "Profil",
    opts: ["Particulier", "Investisseur", "Entreprise", "Institutionnel"],
  },
  {
    key: "budget",
    label: "Budget",
    opts: [
      "Moins de 1M MAD",
      "1M - 2M MAD",
      "2M - 5M MAD",
      "Plus de 5M MAD",
    ],
  },
  {
    key: "objectif",
    label: "Objectif",
    opts: [
      "Résidence principale",
      "Investissement locatif",
      "Revente",
      "Patrimoine familial",
    ],
  },
  {
    key: "delai",
    label: "Délai",
    opts: ["Immédiat", "1 à 3 mois", "3 à 6 mois", "6 mois et plus"],
  },
] as const;

type InvestirFormData = {
  nom: string;
  email: string;
  telephone: string;
  ville?: string;
  profil?: string;
  budget?: string;
  objectif?: string;
  delai?: string;
  message?: string;
  consent: boolean;
};

export default function InvestirForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<InvestirFormData>({
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      ville: "",
      profil: "",
      budget: "",
      objectif: "",
      delai: "",
      message: "",
      consent: false,
    },
  });

  const submitted = isSubmitSuccessful;

  const onSubmit = async (data: InvestirFormData) => {
    const res = await fetch("/api/investir", {
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

  return (
    <>
      {submitted ? (
        <div className="border border-[rgba(201,169,110,0.25)] bg-[rgba(201,169,110,0.04)] p-[clamp(2rem,5vw,3rem)] text-center">
          <p className="mb-4 font-georgia text-[clamp(2rem,5vw,2.5rem)] italic text-[#C9A96E]">
            Merci.
          </p>

          <Body opacity={0.55}>
            Votre demande a bien été transmise. Un conseiller vous contactera
            sous 24 heures ouvrées.
          </Body>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="reveal-right opacity-0">
          <div className="mb-[clamp(0.8rem,2vw,1rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-[clamp(0.8rem,2vw,1rem)]">
            {contactFields.map((field) => (
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

          <div className="mb-[clamp(0.8rem,2vw,1rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-[clamp(0.8rem,2vw,1rem)]">
            {contactSelects.map((select) => (
              <div key={select.key}>
                <label className={labelClass}>{select.label}</label>

                <select
                  {...register(select.key)}
                  className={cx(
                    inputClass,
                    "bg-[#0B2B26] text-[rgba(245,240,232,0.6)]",
                  )}
                >
                  <option value="" className="bg-[#0B2B26] text-[#F5F0E8]">
                    Sélectionner
                  </option>

                  {select.opts.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#0B2B26] text-[#F5F0E8]"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mb-[clamp(0.8rem,2vw,1rem)]">
            <label className={labelClass}>Message libre</label>

            <textarea
              rows={4}
              placeholder="Votre message…"
              {...register("message")}
              className={cx(inputClass, "resize-none")}
            />
          </div>

          <div className="mb-[clamp(1.2rem,3vw,1.5rem)] flex items-start gap-3.5">
            <input
              type="checkbox"
              id="consent"
              {...register("consent", {
                required: "Vous devez accepter le traitement des données",
              })}
              className="mt-[3px] h-4 w-4 shrink-0 accent-[#C9A96E]"
            />

            <label
              htmlFor="consent"
              className="cursor-pointer font-calibri text-[clamp(11px,2.5vw,12px)] leading-[1.6] text-[rgba(245,240,232,0.38)]"
            >
              J’accepte que mes données soient utilisées pour traiter ma
              demande, conformément à la loi 09-08 sur la protection des données
              personnelles.
            </label>
          </div>

          {errors.consent && (
            <p className="-mt-3 mb-4 font-calibri text-[9px] uppercase tracking-widest text-red-400/70">
              {errors.consent.message}
            </p>
          )}

          <Btn
            label={isSubmitting ? "Envoi..." : "Envoyer ma demande"}
            type="submit"
            full
          />

          <p className="mt-4 font-calibri text-[11px] leading-[1.7] text-[rgba(245,240,232,0.22)]">
            Vos données sont traitées dans le strict respect de la loi 09-08.
            Elles sont utilisées uniquement pour répondre à votre demande et ne
            sont en aucun cas cédées à des tiers.
          </p>
        </form>
      )}
    </>
  );
}