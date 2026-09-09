export interface FaqItem { q: string; a: string }
export interface FaqGroup { id: string; heading: string; items: FaqItem[] }

/**
 * FAQ Petit Sommeil. Réponses validées par Sarah les 30/08 et 01/09/2026.
 * Source : livrables/textes/faq.md. Phrase finale de « On est sûr du résultat ? » actée le 03/09/2026
 * (« seul(e) », puis sa signature). Un double saut de ligne dans `a` fait un nouveau paragraphe.
 */

export const faq: FaqGroup[] = [
  {
    id: 'consultations',
    heading: 'La consultation et l’accompagnement',
    items: [
      {
        q: 'Comment se passe une consultation unique ?',
        a: 'Tu remplis le questionnaire et le planning de sommeil. J’analyse le sommeil de ton enfant, puis on élabore ensemble un plan d’action qui suit tes besoins à toi. Et si tu le souhaites, on parle aussi de ce que ces nuits provoquent chez toi, et dans vos relations.',
      },
      {
        q: 'Comment se passe un accompagnement de 15 jours ou d’un mois ?',
        a: 'On commence comme une consultation unique. Ensuite, on reste en contact tous les jours, sauf le dimanche, pendant toute la durée choisie. Chaque jour, tu me dis où vous en êtes : je t’accompagne dans ce que tu mets en place, je te soutiens et je t’écoute.',
      },
      {
        q: 'Mon enfant doit être présent ?',
        a: 'Comme tu préfères. Nos échanges sont libres, et il n’y a pas de bonne façon de faire. Certaines familles se sentent plus à l’aise sans leur enfant, surtout quand on aborde le côté émotionnel. D’autres préfèrent qu’il reste auprès d’elles. Chaque famille, chaque envie, chaque histoire.',
      },
      {
        q: 'Qu’est-ce que je reçois après la consultation ?',
        a: 'Un plan d’action écrit, sous 48h maximum. Tu y retrouves ce qui t’amène, des repères sur le sommeil à l’âge de ton enfant, et un tableau qui reprend ce qu’on a décidé ensemble.',
      },
    ],
  },
  {
    id: 'resultats',
    heading: 'Ce que je peux te dire, honnêtement',
    items: [
      {
        q: 'On est sûr du résultat ?',
        a: 'Personne ne peut te promettre des nuits parfaites, et méfie-toi de qui te le promet. Ton enfant est un être à part entière, avec ses besoins et ses envies, qui ne sont pas toujours les nôtres. Ce que je peux faire, c’est comprendre son sommeil, construire un plan avec toi, et le reprendre autant de fois qu’il le faudra. Ce que je te garantis, c’est ça : tu ne traverses pas ça seul(e).\n\nDoucement, pas à pas, vers des nuits plus sereines.',
      },
      {
        q: 'Au bout de combien de temps voit-on des premiers changements ?',
        a: 'La plupart des familles constatent les premiers changements en une à deux semaines, une fois le plan mis en place. Ce n’est pas magique, et il faut de la patience.',
      },
    ],
  },
  {
    id: 'organisation',
    heading: 'Organisation pratique',
    items: [
      {
        q: 'Sous combien de temps on se voit ?',
        a: 'Je te réponds sous 48h. Ensuite, on se voit en général dans les deux semaines. Ce délai n’est pas du retard : il te laisse le temps de remplir le planning de sommeil sur sept jours, et c’est lui qui me permet de comprendre les nuits de ton enfant avant qu’on se parle.',
      },
      {
        q: 'Quels sont tes horaires ?',
        a: 'Consultations du lundi au vendredi, 9h à 12h et 13h30 à 17h. Pendant un accompagnement, je suis joignable du lundi au vendredi de 9h à 21h, les jours fériés de 9h à 12h. Le samedi, on peut s’arranger si tu as besoin d’un coup de main. Le dimanche, je coupe.',
      },
      {
        q: 'Comment se passe le paiement ?',
        a: 'Le règlement se fait le jour de la consultation, par virement, espèces ou chèque.',
      },
      {
        q: 'Et si je dois annuler ?',
        a: 'Préviens-moi 48h avant et on reporte, sans frais. Si c’est plus tard, écris-moi quand même : on regarde ensemble, il n’y a rien d’automatique.',
      },
      {
        q: 'Les consultations se font en visio ou en présentiel ?',
        a: 'Les deux. La visio convient à la grande majorité des familles, partout en France. Le présentiel est possible à Saint-Malo, Dinard, Dol-de-Bretagne, Cancale, Saint-Méloir-des-Ondes, Plerguer, Miniac et Le Tronchet. Au-delà de 20 km, un forfait de 1 € par kilomètre s’ajoute.',
      },
    ],
  },
];

/** Sélection courte pour la page Tarifs : ce qu’on lit avant de se lancer. */
export const faqShort: FaqItem[] = [
  faq[2].items[0], // Sous combien de temps on se voit ?
  faq[0].items[1], // Comment se passe un accompagnement ?
  faq[2].items[2], // Comment se passe le paiement ?
  faq[2].items[3], // Annulation
];
