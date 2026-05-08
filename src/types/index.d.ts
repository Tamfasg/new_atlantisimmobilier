import { MotionValue } from 'motion';
import { RefObject } from 'react';






export type refAnimationWrapper = HTMLElement |null

export type yValueType = MotionValue<number>



export interface Project {
  id: string;
  brand: "Pessac Collection" | "L'Olivier du Parc" | "Atlantis Signature";
  name: string;
  location: string;
  status: string;
  typology: string;
  description: string;
  cta: string;
  city: "Casablanca" | "Had Soualem" | "Littoral";
  statut: "En cours" | "À venir" | "Sur rendez-vous";
  type: "Résidentiel" | "Bureaux" | "Mixte";
  image: string;
  index: number;
}



export type InvestirFormData = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  profil: string;
  projet: string;
  marque: string;
  message: string;
  consent: boolean;
};