import type { PhotoId } from './photos';
import type { IconName } from './icons';

/**
 * Tranches d'âge et parcours. Les noms des tranches, les résumés et les trois points
 * sont les mots de Sarah (reçus le 02/09/2026, réglés le 03/09), version site de
 * livrables/textes/textes-sarah-02-09.md, section 2. Ne pas les étoffer.
 * Parcours en cinq étapes : docs/contexte.md, section Parcours client.
 */

export interface Service {
  id: string;
  photo: PhotoId;       // la photo de la carte, voir data/photos.ts (règle hybride du 08/09)
  icon: IconName;
  title: string;        // la tranche : « 0 à 6 mois »
  age: string;          // le nom qu'elle donne à la tranche : « Les premiers sommeils »
  short: string;        // accroche courte (ServiceCard)
  description: string;  // son résumé, page accompagnements
  points: string[];     // ses trois points, page accompagnements
}

export const services: Service[] = [
  {
    id: '0-6-mois',
    photo: '09-pieds',
    icon: 'moonHeart',
    title: '0 à 6 mois',
    age: 'Les premiers sommeils',
    short: 'Les premiers repères.',
    description: 'Les premiers mois sont une période de grandes découvertes, et le sommeil y change vite. Le rythme jour-nuit se met en place petit à petit, et chaque bébé avance au sien. Ici, on cherche avant tout à comprendre ses besoins et à l’accompagner en douceur, sans viser la perfection à leur détriment.',
    points: ['Accompagner la mise en place du rythme', 'Respecter ses besoins de sommeil et ses temps d’éveil', 'Créer des repères qui rassurent'],
  },
  {
    id: '6-18-mois',
    photo: '10-bras',
    icon: 'moon',
    title: '6 à 18 mois',
    age: 'Grandir au rythme du sommeil',
    short: 'Les nuits qui bougent.',
    description: 'Le sommeil évolue. Les siestes se structurent, et les nuits peuvent être bousculées par les grandes étapes du développement. L’objectif est d’installer de la régularité et des repères qui aident vraiment à retrouver des nuits plus sereines.',
    points: ['Structurer les siestes et le rythme de la journée', 'Favoriser des nuits plus sereines', 'Accompagner les changements liés au développement, et les endormissements'],
  },
  {
    id: '18-24-mois',
    photo: '11-main',
    icon: 'moonStar',
    title: '18 à 24 mois',
    age: 'Je m’endors, en confiance',
    short: 'Les grands changements.',
    description: 'Ton enfant affirme davantage son autonomie et peut s’opposer au moment du coucher. Le changement de rythme, les émotions, les nouvelles acquisitions : beaucoup de choses peuvent perturber son sommeil. L’objectif est de poser des repères clairs tout en respectant ses besoins.',
    points: ['Accompagner les transitions et l’évolution des siestes', 'Poser un cadre rassurant autour du coucher', 'Favoriser l’autonomie, avec bienveillance'],
  },
  {
    id: '24-36-mois',
    photo: '12-barreaux',
    icon: 'sparkle',
    title: '24 à 36 mois',
    age: 'Les petits explorateurs',
    short: 'Le lit de grand.',
    description: 'Ton enfant s’affirme de plus en plus. L’autonomie et les émotions prennent une grande place au moment du coucher. Les oppositions, les réveils, les refus de sieste peuvent déstabiliser ses habitudes de sommeil. L’objectif est de trouver un équilibre entre le cadre, son autonomie et ses besoins.',
    points: ['Accompagner l’évolution ou l’arrêt progressif des siestes', 'Installer un cadre et une routine de coucher qui rassurent', 'Favoriser l’autonomie tout en accompagnant les émotions'],
  },
  {
    id: '3-6-ans',
    photo: '13-enfant-3-6',
    icon: 'book',
    title: '3 à 6 ans',
    age: 'Les grands rêveurs',
    short: 'Les peurs du soir.',
    description: 'Ton enfant développe son imagination et son autonomie. Certaines difficultés peuvent apparaître : peur du noir, cauchemars, réveils la nuit, ou du mal à s’endormir. L’objectif est de le rassurer avec bienveillance et de poser un cadre, avec les bons repères, pour retrouver des nuits plus sereines.',
    points: ['Apaiser les peurs et les inquiétudes du coucher', 'Garder les repères et une routine qui rassure', 'Encourager l’autonomie et la confiance au moment du coucher'],
  },
];

/** Parcours en cinq étapes, docs/contexte.md, section Parcours client. Textes : livrables/textes/accueil.md, bloc 5. */
export const parcours = [
  { icon: 'book', title: 'Tu remplis le questionnaire', text: 'Cinq minutes, des questions adaptées à l’âge de ton enfant. Je te réponds sous 48h.' },
  { icon: 'calendar', title: 'Tu tiens le planning de sommeil', text: 'Sept jours, une feuille, un stylo. C’est lui qui me permet de comprendre les nuits de ton enfant avant qu’on se parle.' },
  { icon: 'video', title: 'On échange', text: '1h30 en visio ou chez toi. Un échange simple, constructif et libre, sur le sommeil de ton enfant et sur ce que tu traverses. Ton enfant n’a pas besoin d’être là.' },
  { icon: 'moon', title: 'Tu reçois ton plan d’action', text: 'Sous 48h maximum, par écrit. Ce qui t’amène, des repères sur le sommeil à l’âge de ton enfant, et un tableau qui reprend ce qu’on a décidé ensemble.' },
  { icon: 'heart', title: 'On reste en contact', text: 'Si tu as choisi un accompagnement : chaque jour, sauf le dimanche, pendant 15 jours ou un mois. Je t’accompagne, je te soutiens, je t’écoute.' },
] as const;

export const pillars = [
  { icon: 'leaf', title: 'En douceur', text: 'Aucune méthode de pleurs contrôlés. On avance dans le respect de ton enfant et de tes choix.' },
  { icon: 'heart', title: 'Sans culpabilité', text: 'Tu fais déjà de ton mieux. Mon rôle est de t’outiller, jamais de te juger.' },
  { icon: 'shield', title: 'Fondé sur la physiologie', text: 'Des repères basés sur la physiologie du sommeil et le développement de l’enfant.' },
  { icon: 'sparkle', title: 'Sur mesure', text: 'Chaque famille est unique. Tout commence par un questionnaire, jamais par une recette.' },
] as const;
