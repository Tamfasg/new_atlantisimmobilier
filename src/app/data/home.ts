import { Clock3, Handshake, Landmark, TrendingUp } from "lucide-react";

export const ENGAGEMENTS = [
  {
    num: "01",
    icon: Landmark,
    title: "Une exigence architecturale assumée.",
    desc: "Chaque projet commence par une intention : raconter quelque chose du lieu, du quartier, de la ville. Nos architectes travaillent à des bâtiments qui vieillissent bien et qui, dix ans après leur livraison, parlent encore juste.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Le respect du délai comme valeur cardinale.",
    desc: "Au Maroc, livrer dans les temps fait la différence. Nous structurons nos chantiers, nos partenaires et notre trésorerie pour tenir nos engagements de livraison — c'est la première preuve de sérieux.",
  },
  {
    num: "03",
    icon: Handshake,
    title: "Un accompagnement client de bout en bout.",
    desc: "De la première visite à la remise des clés, un interlocuteur unique vous accompagne. Conseil patrimonial, montage de financement, suivi technique, service après-livraison : tout est intégré.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Une vision patrimoniale, pas seulement immobilière.",
    desc: "Acheter chez Atlantis Immobilier, c'est s'inscrire dans une logique de valeur durable. Nos emplacements et nos prestations sont choisis pour que votre acquisition prenne du sens — et de la valeur — dans le temps.",
  },
];

export const BRANDS = [
  {
    name: "Atlantis Signature",
    tag: "Haut standing",
    desc: "Résidentiel haut standing et premium. Pour celles et ceux qui cherchent une adresse, un cadre de vie et un standard architectural d'exception.",
    href: "/project#signature",
    roman: "I",
  },
  {
    name: "Pessac Collection",
    tag: "Urbain & Mixte",
    desc: "Résidentiel et bureaux au cœur vibrant de Casablanca. L'architecture en édition urbaine — un hommage contemporain au patrimoine de la ville.",
    href: "/project#pessac",
    roman: "II",
  },
  {
    name: "L'Olivier du Parc",
    tag: "Résidentiel familial",
    desc: "Résidences modernes à Had Soualem. Le confort d'une vie de famille, dans un cadre apaisé, à un standard accessible et tenu.",
    href: "/project#olivier",
    roman: "III",
  },
];

export const PROJECTS = [
  {
    id: "pessac",
    name: "Pessac Collection",
    location: "Casablanca",
    desc: "Au cœur vibrant de Casablanca, à l'angle du boulevard de la Résistance et de la rue Pessac, un programme mixte résidentiel et bureaux qui réinterprète l'esprit Art Déco de la ville.",
    image: "/logos/pessac-collection.svg",
    tag: "En cours",
  },
  {
    id: "olivier",
    name: "L'Olivier du Parc",
    location: "Had Soualem",
    desc: "À la porte de Casablanca, un ensemble résidentiel structuré de 675 logements, déployé en quatre tranches successives, pensé pour les familles.",
    image: "/logos/olivier-du-parc.svg",
    tag: "Tranche 1",
  },
  {
    id: "signature",
    name: "Atlantis Signature",
    location: "Casablanca & littoral",
    desc: "Plusieurs programmes haut standing en cours, conçus comme des pièces uniques, à découvrir lors d'un rendez-vous personnalisé.",
    image: "/logos/atlantis-signature.svg",
    tag: "Sur rendez-vous",
  },
];

export const CONFIANCE = [
  {
    num: "98%",
    title: "Délais tenus",
    desc: "Nos programmes sont structurés et financés pour livrer dans les temps annoncés.",
  },
  {
    num: "A+",
    title: "Construction maîtrisée",
    desc: "Cahiers des charges techniques alignés sur les standards les plus exigeants.",
  },
  {
    num: "360°",
    title: "Service intégré",
    desc: "Un interlocuteur unique, du premier rendez-vous au suivi après livraison.",
  },
];
