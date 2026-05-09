"use client";

import { useForm } from "react-hook-form";
import {
  ContactFormData,
  useContactStore,
} from "@/store/contact-store";

const CONTACT_FIELDS = [
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

export default function ContactForm() {
  const { submitted, setSubmitted } = useContactStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      ville: "",
      projet: "",
      interet: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
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

    setSubmitted(true);
    reset();
  };

  return (
    <>
      {submitted ? (
        <div className="flex h-full items-center justify-center border border-[#c9a96e]/25 bg-[#c9a96e]/3 p-12 text-center">
          <div>
            <div
              className="mb-4 text-5xl italic text-[#c9a96e]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Merci.
            </div>

            <p className="font-calibri text-normal uppercase tracking-widest text-white/40">
              Un conseiller vous contactera sous 24h ouvrées.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_FIELDS.map((field) => (
              <div key={field.key}>
                <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
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
                  className="w-full border border-white/8 bg-transparent px-4 py-3 text-normal text-white outline-none transition-colors duration-200 placeholder:text-white/15 focus:border-[#c9a96e]/40"
                />

                {errors[field.key] && (
                  <p className="mt-1 font-calibri text-[9px] uppercase tracking-widest text-red-400/70">
                    {errors[field.key]?.message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
                Projet
              </label>

              <select
                {...register("projet")}
                className="w-full border border-white/8 bg-[#080808] px-4 py-3 text-normal text-white/60 outline-none focus:border-[#c9a96e]/40"
              >
                <option value="">Sélectionner</option>
                <option value="Résidence principale">
                  Résidence principale
                </option>
                <option value="Investissement">Investissement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
              Marque ou ville d&apos;intérêt
            </label>

            <input
              type="text"
              placeholder="Ex: Pessac Collection, Casablanca…"
              {...register("interet")}
              className="w-full border border-white/8 bg-transparent px-4 py-3 text-normal text-white outline-none placeholder:text-white/15 transition-colors duration-200 focus:border-[#c9a96e]/40"
            />
          </div>

          <div>
            <label className="mb-2 block font-calibri text-[9px] uppercase tracking-widest text-white/25">
              Message libre
            </label>

            <textarea
              rows={4}
              placeholder="Votre message…"
              {...register("message")}
              className="w-full resize-none border border-white/8 bg-transparent px-4 py-3 text-normal text-white outline-none placeholder:text-white/15 transition-colors duration-200 focus:border-[#c9a96e]/40"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-[#c9a96e]/60 bg-[#c9a96e]/5 py-4 font-calibri text-normal uppercase tracking-widest text-[#c9a96e] transition-all duration-400 hover:bg-[#c9a96e]/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Envoi..." : "Être rappelé"}
          </button>

          <p className="pt-1 text-center font-calibri text-[8px] uppercase tracking-wider text-white/20">
            Vos données sont traitées dans le strict respect de la loi 09-08
            relative à la protection des données personnelles.
          </p>
        </form>
      )}
    </>
  );
}