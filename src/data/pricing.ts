export interface Plan {
  id: string;
  name: string;
  price: string;
  unit: string;
  featured?: boolean;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  variant: 'primary' | 'secondary' | 'gold';
}

export const plans: Plan[] = [
  {
    id: 'consultation',
    name: 'Consultation unique',
    price: '65 €',
    unit: '1h30, visio ou à domicile',
    desc: 'Le rendez-vous complet pour comprendre et poser les premiers repères.',
    features: [
      'Questionnaire et planning de sommeil remplis avant',
      'Bilan complet et écoute pendant l’échange',
      'Plan d’action écrit, envoyé sous 48h',
    ],
    cta: 'Démarrer le questionnaire',
    href: '/questionnaire',
    variant: 'secondary',
  },
  {
    id: 'suivi',
    name: 'Consultation de suivi',
    price: '40 €',
    unit: '45 min, famille déjà connue',
    desc: 'Pour reprendre le plan quand le quotidien a changé.',
    features: [
      'Réservé aux familles déjà accompagnées',
      'Point de situation et ajustements',
      'Plan d’action mis à jour, envoyé sous 48h',
    ],
    cta: 'Prendre un suivi',
    href: '/contact',
    variant: 'secondary',
  },
  {
    id: 'accompagnement-15',
    name: 'Accompagnement 15 jours',
    price: '180 €',
    unit: 'Consultation, puis contact quotidien pendant 15 jours',
    featured: true,
    desc: 'La consultation complète, puis on se parle chaque jour, du lundi au samedi.',
    features: [
      'Tout ce qui est prévu dans la consultation unique',
      'Contact quotidien par SMS ou visio, hors dimanche',
      'Joignable de 9h à 21h pendant la durée choisie',
      'Le sommeil de ton enfant, et ta place à toi dans tout ça',
    ],
    cta: 'Démarrer le questionnaire',
    href: '/questionnaire',
    variant: 'gold',
  },
  {
    id: 'accompagnement-30',
    name: 'Accompagnement 1 mois',
    price: '280 €',
    unit: 'Consultation, puis contact quotidien pendant 1 mois',
    desc: 'Le même rythme, sur un mois entier, pour laisser au plan le temps de s’installer.',
    features: [
      'Tout ce qui est prévu dans la consultation unique',
      'Contact quotidien par SMS ou visio, hors dimanche',
      'Joignable de 9h à 21h pendant la durée choisie',
      'Le temps d’ajuster le plan au fil des semaines',
    ],
    cta: 'Démarrer le questionnaire',
    href: '/questionnaire',
    variant: 'secondary',
  },
];

export const pricingNote =
  'Règlement le jour de la consultation, par virement, espèces ou chèque.';

