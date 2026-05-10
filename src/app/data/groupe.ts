import {
  ShieldCheck,
  Gem,
  Leaf,
  Building2,
  Landmark,
  MapPinned,
  UsersRound,
} from "lucide-react";

export const VALEURS = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "La parole tenue.",
    desc: "Le délai annoncé, le prix annoncé, la prestation annoncée. La fiabilité devient notre première signature.",
  },
  {
    num: "02",
    icon: Gem,
    title: "La qualité au plus haut standard.",
    desc: "Matériaux, finitions, isolation, sécurité : chaque détail doit tenir dans le temps.",
  },
  {
    num: "03",
    icon: MapPinned,
    title: "L’écoute du quartier.",
    desc: "Chaque projet dialogue avec son environnement : urbanisme, voisinage, flux et mémoire du site.",
  },
  {
    num: "04",
    icon: Landmark,
    title: "La transparence financière.",
    desc: "Pas de coûts cachés. Des conditions lisibles, un calendrier clair et une relation construite sur la confiance.",
  },
];

export const METHODE = [
  {
    step: "I",
    title: "Choisir le foncier",
    desc: "Exposition, accessibilité, potentiel du quartier et qualité de vie.",
    stat: "01",
  },
  {
    step: "II",
    title: "Concevoir avec les meilleurs",
    desc: "Architectes, bureaux d’étude et équipes dédiées au programme.",
    stat: "02",
  },
  {
    step: "III",
    title: "Construire en maîtrise",
    desc: "Suivi qualité, partenaires sélectionnés et contrôle chantier régulier.",
    stat: "03",
  },
  {
    step: "IV",
    title: "Livrer et accompagner",
    desc: "La remise des clés marque le début du service après-livraison.",
    stat: "04",
  },
];

export const ENGAGEMENTS = [
  {
    icon: Leaf,
    title: "Performance énergétique",
    value: 82,
    desc: "Orientation, isolation, ventilation et lumière naturelle.",
  },
  {
    icon: Building2,
    title: "Matériaux locaux",
    value: 74,
    desc: "Priorité à la filière marocaine à qualité égale.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité chantier",
    value: 91,
    desc: "Protocoles HSE stricts sur chaque site.",
  },
  {
    icon: UsersRound,
    title: "Accompagnement client",
    value: 88,
    desc: "Un suivi clair avant, pendant et après livraison.",
  },
];

export const BRANDS = [
  {
    name: "Atlantis Signature",
    segment: "Haut standing",
    city: "Casablanca & littoral",
    emotion: "Élégance, exclusivité",
    image: "/assets/projects/SIGNATURE/4.jpg",
    href: "/project#signature",
  },
  {
    name: "Pessac Collection",
    segment: "Premium urbain",
    city: "Casablanca centre",
    emotion: "Mémoire & élan urbain",
    image: "/assets/projects/PESSAC/2.jpeg",
    href: "/project#pessac",
  },
  {
    name: "L’Olivier du Parc",
    segment: "Moyen standing",
    city: "Had Soualem",
    emotion: "Sérénité, projection",
    image: "/assets/projects/SIGNATURE/11.jpg",
    href: "/project#olivier",
  },
];

export const TRUST_DATA = [
  { label: "Délais", value: 86 },
  { label: "Qualité", value: 92 },
  { label: "Transparence", value: 88 },
  { label: "Service", value: 90 },
];
