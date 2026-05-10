"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().min(8, "Numéro requis"),
  email: z.string().email("E-mail invalide"),
  ville: z.string().min(1, "Ville requise"),
  vousEtes: z.string().min(1, "Champ requis"),
  projet: z.string().min(1, "Champ requis"),
  interet: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consentement requis",
  }),
});

type ContactPageFormData = z.infer<typeof contactSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static Data
// ─────────────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Sous combien de temps serai-je rappelé ?",
    a: "Un conseiller Atlantis vous rappelle sous 24 heures ouvrées.",
  },
  {
    q: "Puis-je demander une brochure ?",
    a: "Oui. Indiquez simplement la marque ou le projet qui vous intéresse dans le formulaire.",
  },
  {
    q: "Puis-je réserver une visite ?",
    a: "Oui. Notre équipe peut organiser une visite du show-room, du chantier ou d'un programme disponible.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui. Vos données sont traitées conformément à la loi 09-08 relative à la protection des données personnelles.",
  },
] as const;

const INFO_CARDS = [
  {
    icon: "☎",
    title: "Téléphone",
    desc: "Un conseiller vous répond pendant les horaires d'ouverture.",
    value: "+212 608-081155 | +212 608808044",
  },
  {
    icon: "◎",
    title: "Adresse",
    desc: "Atlantis Immobilier — Casablanca, Maroc.",
    value: "Adresse du siège à ajouter",
  },
] as const;

const PROFILE_OPTIONS = [
  "Particulier",
  "Investisseur",
  "Professionnel",
  "MRE",
] as const;

const CITY_OPTIONS = ["Casablanca", "Had Soualem"] as const;

const PROJECT_OPTIONS = [
  "Résidence principale",
  "Investissement locatif",
  "Bureaux",
  "Demande de brochure",
  "Demande de visite",
  "Autre",
] as const;

const INTEREST_OPTIONS = [
  "Atlantis Signature",
  "Pessac Collection",
  "L'Olivier du Parc",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Classes
// ─────────────────────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white/[0.03] border border-gold-muted/20 rounded-sm px-4 py-3 " +
  "font-calibri text-sm text-cream outline-none transition duration-200 " +
  "placeholder:text-cream/20 hover:border-gold-muted/35 " +
  "focus:border-gold-muted/60 focus:bg-white/[0.05]";

const labelCls =
  "mb-1.5 block font-calibri text-[10px] font-bold uppercase tracking-[0.35em] text-cream/30";

const errorCls = "mt-1 block font-calibri text-[11px] text-red-400";

// ─────────────────────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────────────────────

async function submitContact(data: ContactPageFormData) {
  const payload = {
    nom: data.nom,
    email: data.email,
    telephone: data.telephone,
    ville: data.ville,
    vousEtes: data.vousEtes,
    projet: data.projet,
    interet: data.interet || null,
    message: data.message || null,
    consent: data.consent,
  };

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      typeof json?.error === "string" ? json.error : "Erreur lors de l'envoi",
    );
  }

  return json;
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────────────────────────────────────

type RevealDir = "up" | "left" | "right";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const ease = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

const easeSnap = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

function getRevealVariant(dir: RevealDir) {
  if (dir === "left") return slideLeft;
  if (dir === "right") return slideRight;
  return fadeUp;
}

function Reveal({
  children,
  dir = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  dir?: RevealDir;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      variants={getRevealVariant(dir)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ ...ease, delay }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerList({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  dir = "up",
  className = "",
}: {
  children: ReactNode;
  dir?: RevealDir;
  className?: string;
}) {
  return (
    <motion.div
      variants={getRevealVariant(dir)}
      transition={easeSnap}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Pieces
// ─────────────────────────────────────────────────────────────────────────────

function GeoRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden>
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="100"
        cy="100"
        r="72"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <circle
        cx="100"
        cy="100"
        r="50"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="5" fill="currentColor" />
      <line
        x1="5"
        y1="100"
        x2="195"
        y2="100"
        stroke="currentColor"
        strokeWidth="0.4"
      />
      <line
        x1="100"
        y1="5"
        x2="100"
        y2="195"
        stroke="currentColor"
        strokeWidth="0.4"
      />
    </svg>
  );
}

function Brackets({ color = "gold" }: { color?: "gold" | "emerald" }) {
  const borderColor =
    color === "gold" ? "border-gold-muted/40" : "border-[#2E7D6A]/50";

  return (
    <>
      <span
        className={`absolute left-2.5 top-2.5 size-4 border-l border-t ${borderColor}`}
      />
      <span
        className={`absolute right-2.5 top-2.5 size-4 border-r border-t ${borderColor}`}
      />
      <span
        className={`absolute bottom-2.5 left-2.5 size-4 border-b border-l ${borderColor}`}
      />
      <span
        className={`absolute bottom-2.5 right-2.5 size-4 border-b border-r ${borderColor}`}
      />
    </>
  );
}

function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return <span className={errorCls}>{message}</span>;
}

function FaqItem({ q, a, dir }: { q: string; a: string; dir: RevealDir }) {
  const [open, setOpen] = useState(false);

  return (
    <StaggerItem dir={dir} className="border-b border-[#2E7D6A]/20">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-georgia text-base/snug italic text-cream/90 sm:text-lg">
          {q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28 }}
          className="shrink-0 text-xl leading-none text-gold-muted"
          style={{ willChange: "transform" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-calibri text-sm/relaxed text-cream/55 sm:text-base/relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </StaggerItem>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPageFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      email: "",
      ville: "",
      vousEtes: "",
      projet: "",
      interet: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactPageFormData) => {
    setServerError(null);

    try {
      await submitContact(data);
      reset();
      setSubmitted(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer.",
      );
    }
  };

  return (
    <main className="relative w-screen overflow-x-hidden bg-[#060F0D] font-calibri text-cream">
      <style>{`
        @keyframes kenburns {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative flex h-screen w-screen items-end overflow-hidden pb-20 max-sm:items-center sm:pb-24 lg:items-end">
        <div
          className="absolute inset-0 animate-[kenburns_8s_ease-out_forwards] bg-cover bg-[center_25%]"
          style={{
            backgroundImage: `url("/assets/projects/PESSAC/2.jpeg")`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#060F0D] via-[#0B2B26]/80 to-[#0B2B26]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F0D]/75 to-transparent" />

        <motion.div
          className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-muted to-transparent"
          animate={{ scaleX: 1, opacity: 0.8 }}
          transition={{ duration: 2.5, delay: 0.3 }}
          style={{ willChange: "transform, opacity" }}
        />

        <motion.div
          className="absolute left-4 top-0 w-px bg-gold-muted/22 sm:left-10"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            height: "100%",
            transformOrigin: "top",
            willChange: "transform",
          }}
        />

        <motion.div
          className="pointer-events-none absolute right-6 top-6 size-24 text-gold-muted/14 sm:right-12 sm:top-12 sm:size-32"
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.3, delay: 1 }}
        >
          <GeoRings />
        </motion.div>

        <div className="relative z-10 w-full px-6 sm:px-16 lg:px-20">
          <motion.p
            className="mb-4 font-calibri text-[10px] font-bold uppercase tracking-[0.42em] text-gold-muted sm:text-[12px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Contact
          </motion.p>

          <motion.h1
            className="mb-5 max-w-[min(800px,88vw)] font-georgia text-[clamp(2.4rem,8vw,7rem)] font-normal italic leading-[1.03] text-cream"
            initial={{ y: 55, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.05, delay: 0.6 }}
            style={{ willChange: "transform, opacity" }}
          >
            Parlons de votre
            <br />
            <span className="text-gold-muted">projet immobilier.</span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-[min(560px,88vw)] font-calibri text-[clamp(14px,3.5vw,17px)] leading-[1.8] text-cream/55"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            Une visite, une question, un dossier de prix ou un conseil
            patrimonial : notre équipe vous accompagne avec clarté, méthode et
            discrétion.
          </motion.p>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
          >
            <a
              href="#form"
              className="inline-flex items-center gap-3 border border-gold-muted/65 px-6 py-3.5 font-calibri text-[11px] font-bold uppercase tracking-[0.3em] text-gold-muted transition-all duration-300 hover:bg-gold-muted hover:text-[#060F0D] sm:text-[12px]"
            >
              Être rappelé par un conseiller
              <span className="block h-px w-6 bg-current" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 right-6 flex flex-col items-center gap-2 sm:bottom-10 sm:right-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
          <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-cream/22">
            Défiler
          </span>

          <motion.div
            className="h-9 w-px bg-gradient-to-b from-gold-muted to-transparent"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.1 }}
            style={{ willChange: "transform" }}
          />
        </motion.div>
      </section>

      {/* FORM + INFO */}
      <section
        id="form"
        className="relative overflow-hidden bg-[#0B2B26] px-6 py-20 sm:px-16 lg:px-20 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgba(46,125,106,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal dir="left" className="mb-12">
              <p className="mb-5 font-calibri text-[11px] font-bold uppercase tracking-[0.4em] text-gold-muted">
                Demande de contact
              </p>

              <h2 className="mb-4 font-georgia text-[clamp(1.9rem,5vw,3.8rem)] font-normal italic leading-[1.07] text-cream">
                Un conseiller Atlantis vous répond sous 24 heures ouvrées.
              </h2>

              <p className="font-calibri text-[clamp(14px,3.5vw,16px)] leading-[1.85] text-cream/45">
                Remplissez le formulaire ci-dessous. Votre demande sera
                transmise à l&apos;équipe concernée selon votre projet, votre
                profil et la marque qui vous intéresse.
              </p>
            </Reveal>

            <StaggerList className="flex flex-col gap-px bg-[#2E7D6A]/20">
              {INFO_CARDS.map((card) => (
                <StaggerItem key={card.title} dir="left">
                  <div className="group grid grid-cols-[48px_1fr] gap-4 border-l-2 border-transparent bg-[#0B2B26] p-5 transition-all duration-300 hover:border-gold-muted/60 hover:bg-[#1A4A42]">
                    <span className="mt-0.5 text-[1.7rem] leading-none text-gold-muted">
                      {card.icon}
                    </span>

                    <div>
                      <p className="mb-1 font-calibri text-lg font-bold uppercase tracking-[0.3em] text-gold-muted/70">
                        {card.title}
                      </p>

                      <p className="mb-1.5 font-calibri text-sm leading-relaxed text-cream/45">
                        {card.desc}
                      </p>

                      <p className="font-calibri text-base text-cream">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>

          <Reveal dir="right">
            <div className="relative border border-gold-muted/25 bg-[#0B2B26]/70 p-7 backdrop-blur-md sm:p-9">
              <Brackets color="gold" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <p className="mb-3 font-georgia text-[clamp(2rem,5vw,2.8rem)] italic text-gold-muted">
                      Merci.
                    </p>

                    <p className="font-calibri text-base leading-relaxed text-cream/65">
                      Votre demande a bien été envoyée. Un conseiller Atlantis
                      vous rappellera sous 24 heures ouvrées.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Nom</label>
                        <input
                          {...register("nom")}
                          placeholder="Votre nom"
                          className={inputCls}
                        />
                        <FormError message={errors.nom?.message} />
                      </div>

                      <div>
                        <label className={labelCls}>Téléphone</label>
                        <input
                          {...register("telephone")}
                          placeholder="+212 …"
                          className={inputCls}
                        />
                        <FormError message={errors.telephone?.message} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>E-mail</label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="votre@email.com"
                          className={inputCls}
                        />
                        <FormError message={errors.email?.message} />
                      </div>

                      <div>
                        <label className={labelCls}>Ville</label>
                        <select
                          {...register("ville")}
                          className={`${inputCls} text-cream/65`}
                        >
                          <option value="">Sélectionner</option>

                          {CITY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <FormError message={errors.ville?.message} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Vous êtes</label>
                        <select
                          {...register("vousEtes")}
                          className={`${inputCls} text-cream/65`}
                        >
                          <option value="">Sélectionner</option>

                          {PROFILE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <FormError message={errors.vousEtes?.message} />
                      </div>

                      <div>
                        <label className={labelCls}>Votre projet</label>
                        <select
                          {...register("projet")}
                          className={`${inputCls} text-cream/65`}
                        >
                          <option value="">Sélectionner</option>

                          {PROJECT_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <FormError message={errors.projet?.message} />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>
                        Marque ou ville d&apos;intérêt
                      </label>

                      <select
                        {...register("interet")}
                        className={`${inputCls} text-cream/65`}
                      >
                        <option value="">Indifférent</option>

                        {INTEREST_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelCls}>Message</label>

                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Votre message…"
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        {...register("consent")}
                        className="mt-1 size-3.5 shrink-0 cursor-pointer accent-gold-muted"
                      />

                      <label
                        htmlFor="consent"
                        className="cursor-pointer font-calibri text-[11px] leading-[1.65] text-cream/38"
                      >
                        J&apos;accepte que mes données soient utilisées pour
                        traiter ma demande, conformément à la loi 09-08.
                      </label>
                    </div>

                    <FormError message={errors.consent?.message} />

                    <AnimatePresence>
                      {serverError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="border border-red-400/30 bg-red-400/8 px-4 py-3"
                        >
                          <p className="font-calibri text-[13px] text-red-400">
                            {serverError}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full border border-gold-muted/65 py-4 font-calibri text-[12px] font-bold uppercase tracking-[0.3em] text-gold-muted transition-all duration-300 hover:bg-gold-muted hover:text-[#060F0D] hover:shadow-[0_8px_28px_rgba(201,169,110,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
                    </button>

                    <p className="font-calibri text-[11px] leading-[1.65] text-cream/22">
                      Vos données sont traitées dans le strict respect de la loi
                      09-08. Elles ne sont en aucun cas cédées à des tiers.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold-muted/40 to-transparent" />

      {/* WHATSAPP CTA */}
      <section className="relative overflow-hidden bg-[#060F0D] px-6 py-20 sm:px-16 lg:px-20 lg:py-28">
        <div className="pointer-events-none absolute right-[-3rem] top-1/2 size-56 -translate-y-1/2 text-[#2E7D6A]/7">
          <GeoRings />
        </div>

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal dir="left">
            <p className="mb-5 font-calibri text-[11px] font-bold uppercase tracking-[0.4em] text-[#2E7D6A]">
              Contact rapide
            </p>

            <h2 className="mb-4 font-georgia text-[clamp(1.9rem,5vw,3.8rem)] font-normal italic leading-[1.07] text-cream">
              Vous préférez WhatsApp ?
            </h2>

            <p className="mb-8 font-calibri text-[clamp(14px,3.5vw,16px)] leading-[1.85] text-cream/50">
              Échangez directement avec un conseiller Atlantis pour recevoir une
              réponse rapide sur nos programmes, nos disponibilités ou nos
              visites.
            </p>

            <a
              href="https://api.whatsapp.com/send/?phone=212608081155&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#2E7D6A]/65 px-6 py-3.5 font-calibri text-[11px] font-bold uppercase tracking-[0.3em] text-[#2E7D6A] transition-all duration-300 hover:bg-[#2E7D6A] hover:text-[#060F0D] sm:text-[12px]"
            >
              <span className="text-lg leading-none">◎</span>
              Contacter sur WhatsApp
            </a>
          </Reveal>

          <Reveal dir="right">
            <div className="relative border border-[#2E7D6A]/25 p-7">
              <Brackets color="emerald" />

              <p className="mb-4 font-calibri text-[10px] font-bold uppercase tracking-[0.35em] text-[#2E7D6A]/70">
                Réponse garantie
              </p>

              {[
                "Réponse sous 2 heures en journée",
                "Brochures envoyées directement sur votre téléphone",
                "Planification de visite en quelques messages",
              ].map((item, index, array) => (
                <div
                  key={item}
                  className={`flex items-start gap-3 py-3.5 ${
                    index < array.length - 1
                      ? "border-b border-[#2E7D6A]/15"
                      : ""
                  }`}
                >
                  <span className="mt-1.5 shrink-0 text-[0.5rem] text-[#2E7D6A]">
                    ◆
                  </span>

                  <p className="font-calibri text-sm leading-relaxed text-cream/55 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#2E7D6A]/35 to-transparent" />

      {/* MAP */}
      <section className="bg-[#0B2B26] px-6 py-20 sm:px-16 lg:px-20 lg:py-28">
        <Reveal dir="left" className="mb-10">
          <p className="mb-5 font-calibri text-[11px] font-bold uppercase tracking-[0.4em] text-gold-muted">
            Nous trouver
          </p>

          <h2 className="mb-3 font-georgia text-[clamp(1.9rem,5vw,3.8rem)] font-normal italic leading-[1.07] text-cream">
            Atlantis Immobilier à Casablanca.
          </h2>

          <p className="max-w-xl font-calibri text-[clamp(14px,3.5vw,16px)] leading-[1.85] text-cream/45">
            Notre équipe vous accueille sur rendez-vous pour vous présenter nos
            programmes, nos brochures et les étapes de votre acquisition.
          </p>
        </Reveal>

       <Reveal dir="up">
  <a
    href="https://www.google.com/maps/search/?api=1&query=33.569600,-7.623700"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Ouvrir Atlantis Immobilier sur Google Maps"
    className="group relative block overflow-hidden border border-[#2E7D6A]/30 bg-[#060F0D]/80"
  >
    <div className="relative h-64 w-full sm:h-80 lg:h-[420px]">
      <iframe
        title="Atlantis Immobilier Map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-7.6262%2C33.5679%2C-7.6212%2C33.5713&layer=mapnik&marker=33.569600%2C-7.623700"
        loading="lazy"
        className="pointer-events-none h-full w-full grayscale-[0.25] contrast-[1.08] transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ border: 0 }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,15,13,0.65)_0%,transparent_45%,rgba(6,15,13,0.2)_100%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center">
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#060F0D] via-[#060F0D]/85 to-transparent px-6 pb-6 pt-20">
        <p className="font-georgia text-lg italic text-cream">
          Atlantis Immobilier
        </p>

        <p className="mt-1 font-calibri text-[11px] uppercase tracking-[0.25em] text-cream/40">
          Casablanca, Maroc
        </p>

        <p className="mt-3 font-calibri text-[10px] font-bold uppercase tracking-[0.28em] text-gold-muted/80">
          Cliquer pour ouvrir dans Google Maps
        </p>
      </div>
    </div>
  </a>
</Reveal>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold-muted/40 to-transparent" />

      {/* FAQ */}
      <section className="bg-[#060F0D] px-6 py-20 sm:px-16 lg:px-20 lg:py-28">
        <Reveal dir="left" className="mb-10">
          <p className="mb-5 font-calibri text-[11px] font-bold uppercase tracking-[0.4em] text-gold-muted">
            Questions rapides
          </p>

          <h2 className="font-georgia text-[clamp(1.9rem,5vw,3.8rem)] font-normal italic leading-[1.07] text-cream">
            Avant de nous écrire.
          </h2>
        </Reveal>

        <StaggerList className="max-w-3xl" stagger={0.07}>
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              dir={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </StaggerList>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#2E7D6A]/35 to-transparent" />

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0B2B26] px-6 py-20 text-center sm:px-16 lg:px-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,169,110,0.07)_0%,transparent_100%)]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 text-gold-muted/5">
          <GeoRings />
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-muted/30 to-transparent" />

        <Reveal dir="up" className="relative">
          <p className="mb-5 font-calibri text-[11px] font-bold uppercase tracking-[0.4em] text-gold-muted">
            Votre projet commence ici
          </p>

          <h2 className="mx-auto mb-4 max-w-2xl font-georgia text-[clamp(1.9rem,5vw,3.8rem)] font-normal italic leading-[1.07] text-cream">
            Une adresse, une visite, une décision.
          </h2>

          <p className="mx-auto mb-10 max-w-lg font-calibri text-[clamp(14px,3.5vw,16px)] leading-[1.85] text-cream/45">
            Que vous cherchiez une résidence principale, un investissement ou
            une adresse professionnelle, Atlantis Immobilier vous accompagne pas
            à pas.
          </p>

          <a
            href="#form"
            className="inline-flex items-center gap-3 border border-gold-muted/65 px-10 py-4 font-calibri text-[12px] font-bold uppercase tracking-[0.3em] text-gold-muted transition-all duration-300 hover:bg-gold-muted hover:text-[#060F0D] hover:shadow-[0_10px_32px_rgba(201,169,110,0.28)]"
          >
            Envoyer ma demande
          </a>
        </Reveal>
      </section>

      {/* FOOTER LINE */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#2E7D6A]/18 px-6 py-5 sm:px-16 lg:px-20">
        <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-cream/20">
          © {new Date().getFullYear()} Atlantis Immobilier
        </span>

        <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold-muted/30 to-transparent" />

        <span className="font-calibri text-[9px] uppercase tracking-[0.3em] text-cream/20">
          Casablanca, Maroc
        </span>
      </div>
    </main>
  );
}
