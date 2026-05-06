import { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "pessac",
    brand: "Pessac Collection",
    name: "Pessac Collection",
    location: "Casablanca",
    status: "En cours de construction",
    typology: "Mixte — résidentiel et bureaux",
    description:
      "Au cœur vibrant de Casablanca, à l'angle du boulevard de la Résistance et de la rue Pessac, un programme mixte résidentiel et bureaux qui réinterprète l'esprit Art Déco de la ville.",
    cta: "Découvrir",
    city: "Casablanca",
    statut: "En cours",
    type: "Mixte",
    image: "/assets/projects/PESSAC/2.jpeg",
    index: 1,
  },
  {
    id: "olivier",
    brand: "L'Olivier du Parc",
    name: "L'Olivier du Parc",
    location: "Had Soualem",
    status: "Tranche 1 en cours",
    typology: "Résidentiel — appartements",
    description:
      "À la porte de Casablanca, un ensemble résidentiel structuré de 675 logements, déployé en quatre tranches successives, pensé pour les familles.",
    cta: "Découvrir",
    city: "Had Soualem",
    statut: "En cours",
    type: "Résidentiel",
    image: "/assets/projects/OLIVIER/1.jpeg",
    index: 2,
  },
  {
    id: "signature",
    brand: "Atlantis Signature",
    name: "Atlantis Signature",
    location: "Casablanca & littoral",
    status: "Sur rendez-vous",
    typology: "Résidentiel haut standing",
    description:
      "Plusieurs programmes haut standing en cours, conçus comme des pièces uniques, à découvrir lors d'un rendez-vous personnalisé avec un conseiller patrimonial.",
    cta: "Prendre rendez-vous",
    city: "Littoral",
    statut: "Sur rendez-vous",
    type: "Résidentiel",
    image: "/assets/projects/SIGNATURE/1.jpeg",
    index: 3,
  },
];

export const PESSAC_DETAILS = {
  details: [
    { label: "Marque", value: "Pessac Collection" },
    { label: "Localisation", value: "Angle Bd de la Résistance × rue Pessac" },
    { label: "Typologie", value: "Mixte — résidentiel et bureaux" },
    { label: "Style", value: "Paquebot streamline, hommage Art Déco" },
    { label: "Statut", value: "En cours de construction" },
  ],
  prestations: [
    "Hall d'entrée Art Déco contemporain",
    "Terrasse panoramique",
    "Espace bien-être avec salle de sport et spa",
    "Jardins paysagers",
    "Sécurité 24/7",
    "Parkings privatifs",
    "Ascenseurs haut de gamme",
  ],
  targets: [
    {
      icon: "◆",
      text: "Pour les acquéreurs urbains qui veulent vivre au cœur de Casablanca dans un cadre architectural d'exception.",
    },
    {
      icon: "◆",
      text: "Pour les entreprises qui choisissent une adresse tertiaire valorisante.",
    },
    {
      icon: "◆",
      text: "Pour les investisseurs qui cherchent un actif rare dans un emplacement central.",
    },
  ],
};

export const OLIVIER_DETAILS = {
  details: [
    { label: "Marque", value: "L'Olivier du Parc" },
    { label: "Localisation", value: "Had Soualem" },
    { label: "Volumétrie", value: "675 logements — 4 tranches" },
    { label: "Cadence", value: "36 mois" },
    { label: "Statut", value: "Tranche 1 en cours" },
  ],
  modalites:
    "Réservation à 20 % du prix d'acquisition. Échéancier équilibré jusqu'à la livraison.",
  pourquoi:
    "À 30 minutes du centre de Casablanca, Had Soualem combine accessibilité, calme résidentiel et perspective de valorisation.",
};

export const SIGNATURE_FEATURES = [
  "Des emplacements rares, sélectionnés pour leur qualité d'environnement",
  "Une architecture contemporaine, signée par des cabinets reconnus",
  "Des typologies généreuses, des prestations triées",
  "Un nombre de lots volontairement limité",
];

export const UPCOMING_BENEFITS = [
  "Accès prioritaire aux meilleurs lots, avant ouverture publique",
  "Conditions de réservation préférentielles sur les programmes éligibles",
  "Information détaillée dès la phase de pré-commercialisation",
  "Accompagnement personnalisé par un conseiller dédié",
];
