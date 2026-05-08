import { InvestirFormData } from "@/types";

export const initialFormData: InvestirFormData = {
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  profil: "",
  projet: "",
  marque: "",
  message: "",
  consent: false,
};



export const contactFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "prenom", label: "Prénom", type: "text", required: true },
  {
    key: "telephone",
    label: "Téléphone (avec indicatif)",
    type: "tel",
    required: true,
  },
  { key: "email", label: "E-mail", type: "email", required: true },
] as const;

export const contactSelects = [
  {
    key: "profil",
    label: "Vous êtes",
    opts: ["Particulier", "Investisseur", "Professionnel", "MRE"],
  },
  {
    key: "projet",
    label: "Votre projet",
    opts: [
      "Résidence principale",
      "Investissement locatif",
      "Bureaux",
      "Autre",
    ],
  },
  {
    key: "marque",
    label: "Marque ou ville d’intérêt",
    opts: [
      "Atlantis Signature",
      "Pessac Collection",
      "L’Olivier du Parc",
      "Indifférent",
    ],
  },
] as const;

export const contactStats = [
  { val: "24h", label: "Délai de rappel garanti" },
  { val: "100%", label: "Dossiers traités avec confidentialité" },
  { val: "3", label: "Marques, un seul niveau d’exigence" },
] as const;
