/**
 * Les trois avis reçus le 02/09/2026, avec l'accord des témoins (transmis par Sarah).
 * Forme actée par elle le 03/09 : prénom et initiale, prénom de l'enfant retiré, emojis conservés.
 * Ce sont les mots des parents, cités tels quels : ne pas retoucher, ne pas ajouter d'avis
 * sans accord écrit. Source : livrables/textes/textes-sarah-02-09.md, section 5.
 */

export interface Testimonial { quote: string; author: string }

export const testimonials: Testimonial[] = [
  {
    author: 'Justine M.',
    quote: 'Super accompagnement ! Sarah est toujours de très bons conseils pour ma fille. J’apprécie particulièrement ses conseils qui ne se limitent pas uniquement au sommeil : elle prend aussi en compte son comportement, son alimentation, ses besoins et son évolution pour comprendre ce qui peut influencer ses nuits. J’apprécie vraiment son écoute, sa bienveillance et surtout ses conseils concrets, adaptés à notre situation. Ça m’aide beaucoup au quotidien ! Je recommande à 100 % ❤️',
  },
  {
    author: 'Ophélie G.',
    quote: 'Maman d’un bébé d’un mois et demi, j’ai déjà eu l’occasion d’échanger avec Sarah afin d’avoir des conseils. Même s’il est encore trop tôt pour me prononcer sur le sommeil de mon tout-petit, je sais d’avance vers qui me tourner quand j’en aurai besoin. Sarah est une personne à l’écoute, bienveillante, sans aucun jugement et surtout très rassurante. Ça donnerait presque envie d’avoir besoin d’elle ☺️',
  },
  {
    author: 'Célia R.',
    quote: 'Sarah n’a pas hésité à m’aider pour le sommeil de ma fille, où j’ai vu de véritables progrès. Elle m’a accompagnée et continue de le faire si j’ai une question ou autre. Le fait de se sentir soutenue est apaisant et elle nous redonne confiance. C’est une personne très gentille et patiente qui aime son métier. Je recommande +++',
  },
];
