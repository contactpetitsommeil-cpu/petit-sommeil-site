export const site = {
  name: 'Petit Sommeil',
  tagline: 'Le sommeil ne s’apprend pas, il s’accompagne.',
  taglineLine1: 'Le sommeil ne s’apprend pas,',
  taglineLine2: 'il s’accompagne.',
  owner: 'Sarah H.',
  role: 'Conseillère en hygiène de sommeil, bébé et enfant',
  /* Email affiché sur le site (pied de page, contact, pages légales, schema) et adresse qui reçoit les
     formulaires (contact, questionnaire, planning, newsletter). Décision de Florent le 03/09/2026 : le Gmail
     partout, en minuscules (Gmail ignore la casse). Une adresse au nom de domaine chez OVH, peut-être plus tard. */
  email: 'contact.petitsommeil@gmail.com',
  /* Même adresse pour les notifications Netlify Forms, qui se règlent dans l'interface Netlify
     (Site configuration → Notifications → Form submission). Voir netlify.toml. */
  formsEmail: 'contact.petitsommeil@gmail.com',
  instagram: 'https://instagram.com/lepetitsommeil',
  instagramHandle: '@lepetitsommeil',
  url: 'https://petitsommeil.fr',
  /* Lien direct « Écrire un avis » de la fiche d'établissement Google de Sarah, fourni par Florent le 03/09/2026. */
  googleReviewUrl: 'https://g.page/r/CfgX19Enx9v0EBM/review',
  reassurance: 'Sans engagement · Réponse sous 48h',
  year: new Date().getFullYear(),
};

/**
 * Visibilité du téléchargement du planning (demande de Sarah du 02/09, second point de la commande 4).
 * 'none' : rien de plus (pied de page et Tarifs). 'accueil' : un bloc dédié sur l'accueil, après le parcours.
 * Sarah a choisi le bloc sur l'accueil (maquette A) le 04/09/2026 ; la maquette B (entrée de menu) est retirée du code.
 */
export const planningVisibility: 'none' | 'accueil' = 'accueil';

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Accompagnements', href: '/accompagnements' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Conseils', href: '/blog' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export const footerColumns = [
  { heading: 'Navigation', items: nav },
  {
    heading: 'Par âge',
    items: [
      { label: '0 à 6 mois', href: '/accompagnements#0-6-mois' },
      { label: '6 à 18 mois', href: '/accompagnements#6-18-mois' },
      { label: '18 à 24 mois', href: '/accompagnements#18-24-mois' },
      { label: '24 à 36 mois', href: '/accompagnements#24-36-mois' },
      { label: '3 à 6 ans', href: '/accompagnements#3-6-ans' },
    ],
  },
  {
    heading: 'Infos',
    items: [
      { label: 'Questions fréquentes', href: '/faq' },
      { label: 'Questionnaire', href: '/questionnaire' },
      { label: 'Planning de sommeil à imprimer', href: '/planning-de-sommeil' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { label: 'CGV', href: '/cgv' },
    ],
  },
];
