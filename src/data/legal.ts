/**
 * Textes légaux. Même voix que le site, plus sobre.
 * Les mentions « [À COMPLÉTER : …] » sont rendues visibles par LegalPage.astro :
 * rien ne part en ligne avec un trou invisible.
 * Nom, SIRET et adresse : réponses de Sarah du 02/09/2026 (livrables/reponses-sarah-2026-09-02.md, partie 2).
 * Assurance RC pro : attestation du 04/09/2026 (livrables/legal/attestation-rc-pro-orus-hiscox-2026-2027.pdf), sans plafonds ni période, qui se renouvellent chaque année.
 * Médiateur : coordonnées publiques de SMP, pré-remplies le 04/09/2026 ; adhésion de Sarah à confirmer par le bureau (voir le marqueur [À CONFIRMER] plus bas, invisible sur le site).
 * L'email affiché vient de site.ts (site.email), un seul endroit à changer.
 */
import { site } from './site';

export interface LegalSection { h: string; body: (string | string[])[] }
export interface LegalDoc { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[] }

const UPDATED = 'septembre 2026';

export const mentionsLegales: LegalDoc = {
  eyebrow: 'Informations légales',
  title: 'Mentions légales',
  updated: UPDATED,
  intro: 'Qui édite ce site, qui l’héberge, et dans quel cadre.',
  sections: [
    { h: 'Éditeur du site', body: [
      'Le site petitsommeil.fr est édité par Sarah Höhn, conseillère en hygiène de sommeil pour les enfants de 0 à 6 ans, en entreprise individuelle (micro-entreprise).',
      [
        'Nom commercial : Petit Sommeil',
        'Exploitante : Sarah Höhn',
        'Statut : entrepreneur individuel (micro-entreprise)',
        'SIRET : 914 319 710 00028',
        'Adresse : 19 chemin des Cancales, 35960 Le Vivier-sur-Mer',
        `Email : ${site.email}`,
        'Directrice de la publication : Sarah Höhn',
      ],
      'TVA non applicable, article 293 B du Code général des impôts.',
    ] },
    { h: 'Assurance responsabilité civile professionnelle', body: [
      [
        'Assureur : Hiscox SA, Hiscox France, 38 avenue de l’Opéra, 75002 Paris, contrat souscrit par l’intermédiaire d’Orus France SAS (courtier, ORIAS 26000343)',
        'Contrat n° : RCPH278639259',
        'Couverture géographique : monde entier, hors États-Unis et Canada',
      ],
    ] },
    { h: 'Hébergement', body: [
      'Le site est hébergé par Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis. Contact : support@netlify.com.',
    ] },
    { h: 'Nature des prestations', body: [
      'Petit Sommeil propose un accompagnement et des conseils en hygiène de sommeil de l’enfant. Ces prestations sont pédagogiques. Elles ne sont ni un avis médical, ni un diagnostic, ni un traitement.',
      'En cas de doute sur la santé de ton enfant, parles-en à ton médecin ou à ton pédiatre.',
    ] },
    { h: 'Propriété intellectuelle', body: [
      'Les textes, illustrations, logo et mise en page de ce site appartiennent à Petit Sommeil, sauf mention contraire. Toute reproduction sans accord écrit est interdite.',
    ] },
    { h: 'Responsabilité', body: [
      'Les informations du site sont données à titre indicatif. Petit Sommeil fait de son mieux pour qu’elles soient exactes, sans pouvoir garantir l’absence d’erreur ni l’usage qui en est fait.',
      'Le site peut renvoyer vers des sites tiers dont Petit Sommeil ne maîtrise pas le contenu.',
    ] },
    { h: 'Données personnelles et cookies', body: [
      'Le traitement de tes données est décrit dans la politique de confidentialité, accessible depuis le pied de page.',
    ] },
    { h: 'Droit applicable', body: [
      'Ces mentions sont régies par le droit français. En cas de litige, et à défaut d’accord amiable, les tribunaux français sont compétents.',
    ] },
  ],
};

export const confidentialite: LegalDoc = {
  eyebrow: 'Tes données',
  title: 'Politique de confidentialité',
  updated: UPDATED,
  intro: 'Ce que le site collecte, où ça part, et combien de temps c’est gardé. En clair.',
  sections: [
    { h: 'Qui est responsable', body: [
      `Sarah Höhn (Petit Sommeil) est responsable du traitement des données collectées sur petitsommeil.fr. Pour toute question, écris à ${site.email}.`,
    ] },
    { h: 'Ce que le questionnaire collecte', body: [
      'Le questionnaire ne demande que ce qui sert à préparer notre échange :',
      [
        'Le prénom et la date de naissance de ton enfant, sa tranche d’âge.',
        'Des réponses sur ses journées et ses nuits : repas, siestes, coucher, réveils.',
        'Ce que tu traverses, ce que tu as déjà essayé, ton objectif.',
        'Ton prénom, ton email, et ton téléphone si tu le laisses.',
      ],
      'Aucune donnée de santé détaillée n’est collectée en ligne. Une seule question, libre et facultative, te demande s’il y a quelque chose sur la santé de ton enfant que je devrais savoir. Tu peux la laisser vide. Le reste se dit en consultation, de vive voix.',
    ] },
    { h: 'Ce que le formulaire de contact collecte', body: [
      'Ton prénom, ton email et ton message. Rien d’autre.',
    ] },
    { h: 'Où ça part', body: [
      'Les formulaires sont traités par Netlify, l’hébergeur du site, qui me les transmet par email. Netlify est une société américaine : les données peuvent transiter par des serveurs situés hors de l’Union européenne. Netlify est certifiée au cadre de protection des données UE-États-Unis (Data Privacy Framework) et applique les clauses contractuelles types de la Commission européenne, les deux garanties prévues par le RGPD pour ce type de transfert.',
      'Tes données ne sont jamais vendues ni transmises à des tiers pour de la publicité.',
      'Les réponses du questionnaire sont aussi enregistrées dans ton navigateur, sur ton appareil, pour que tu puisses t’arrêter et reprendre. Elles sont effacées après l’envoi.',
    ] },
    { h: 'Pourquoi, et sur quelle base', body: [
      'Tes données servent à te répondre, à préparer et réaliser l’accompagnement, et, si tu l’as accepté, à t’envoyer les conseils du blog.',
      'Les bases légales sont la préparation et l’exécution de la prestation, ton consentement pour les emails de conseils, et mon intérêt légitime à améliorer le service.',
    ] },
    { h: 'Combien de temps', body: [
      'Une demande sans suite est conservée au maximum 3 ans après le dernier échange. Les données d’un accompagnement sont gardées le temps de l’accompagnement, puis archivées selon les obligations comptables.',
      'Tu peux te désinscrire des emails de conseils à tout moment, en un clic.',
    ] },
    { h: 'Tes droits', body: [
      `Tu peux accéder à tes données, les corriger, les faire effacer, en limiter l’usage, t’y opposer ou les récupérer. Écris à ${site.email}. Tu peux aussi saisir la CNIL (cnil.fr).`,
    ] },
    { h: 'Cookies', body: [
      'Le site n’utilise aucun cookie publicitaire et aucun traceur tiers. Seul le stockage local de ton navigateur sert à sauvegarder le questionnaire en cours.',
    ] },
  ],
};

export const cgv: LegalDoc = {
  eyebrow: 'Conditions',
  title: 'Conditions générales de vente',
  updated: UPDATED,
  intro: 'Les règles du jeu entre nous, pour que tout soit clair avant de commencer.',
  sections: [
    { h: 'Article 1. Objet', body: [
      'Ces conditions s’appliquent aux consultations et accompagnements en hygiène de sommeil de l’enfant proposés par Petit Sommeil (Sarah Höhn, entrepreneur individuel, SIRET 914 319 710 00028, 19 chemin des Cancales, 35960 Le Vivier-sur-Mer) à toute personne majeure. Prendre rendez-vous, c’est les accepter.',
    ] },
    { h: 'Article 2. Prestations', body: [
      'Petit Sommeil propose une consultation unique, une consultation de suivi pour les familles déjà accompagnées, et deux accompagnements de 15 jours ou d’un mois qui ajoutent un contact quotidien, hors dimanche. Le détail et les prix sont sur la page Tarifs. Le prix applicable est celui affiché le jour de la prise de rendez-vous.',
      'Ces prestations sont pédagogiques et de conseil. Elles ne remplacent pas un avis médical.',
    ] },
    { h: 'Article 3. Réservation', body: [
      'Tout commence par le questionnaire en ligne. Sarah répond sous 48h et propose un créneau, en général dans les deux semaines, le temps que la famille remplisse le planning de sommeil sur sept jours. Sarah peut refuser ou réorienter une demande qui sort de son champ, par exemple vers un médecin.',
    ] },
    { h: 'Article 4. Prix et paiement', body: [
      'Les prix sont en euros, TVA non applicable (article 293 B du CGI). Le règlement se fait le jour de la consultation, par virement, espèces ou chèque.',
    ] },
    { h: 'Article 5. Déplacement à domicile', body: [
      'Les consultations à domicile sont possibles autour de Saint-Malo. Au-delà de 20 km, un forfait déplacement de 1 € par kilomètre supplémentaire s’ajoute au prix de la consultation. Il est annoncé avant la prise de rendez-vous.',
    ] },
    { h: 'Article 6. Ce que tu reçois', body: [
      'Après chaque consultation, Sarah envoie un plan d’action écrit, sous 48h maximum. Il reprend ce qui t’amène, des repères sur le sommeil à l’âge de ton enfant, et un tableau de ce qui a été décidé ensemble.',
      'Pendant un accompagnement, le contact est quotidien, sauf le dimanche, par SMS ou visio, de 9h à 21h en semaine et de 9h à 12h les jours fériés.',
    ] },
    { h: 'Article 7. Résultats', body: [
      'Sarah s’engage à faire de son mieux, pas à un résultat. C’est le parent qui met le plan d’action en place au quotidien, et le plan peut devoir être repris si le quotidien change. Un enfant est un être vivant à part entière, avec ses besoins et ses envies : personne ne peut garantir des nuits parfaites, et Petit Sommeil ne le fera pas.',
    ] },
    { h: 'Article 8. Annulation et report', body: [
      'Préviens 48h avant le rendez-vous et on reporte, sans frais. Si c’est plus tard, écris quand même : on regarde ensemble, au cas par cas, rien n’est automatique.',
      'Si c’est Sarah qui a un empêchement, la séance est reportée ou remboursée, à ton choix.',
    ] },
    { h: 'Article 9. Droit de rétractation', body: [
      'Tu disposes d’un délai de 14 jours pour te rétracter, conformément au Code de la consommation. Si la consultation a lieu avant la fin de ce délai, à ta demande, tu renonces à ce droit pour la prestation réalisée.',
    ] },
    { h: 'Article 10. Assurance', body: [
      'Sarah Höhn, entrepreneur individuel (SIRET 914 319 710 00028, 19 chemin des Cancales, 35960 Le Vivier-sur-Mer), exerçant sous le nom Petit Sommeil, est couverte par une assurance responsabilité civile professionnelle souscrite auprès de Hiscox SA, Hiscox France, 38 avenue de l’Opéra, 75002 Paris, par l’intermédiaire d’Orus France SAS (courtier, ORIAS 26000343), contrat n° RCPH278639259. Couverture géographique : monde entier, hors États-Unis et Canada.',
    ] },
    { h: 'Article 11. Données personnelles', body: [
      'Les données collectées sont traitées selon la politique de confidentialité, accessible depuis le pied de page.',
    ] },
    // Médiateur : adhésion de Sarah à SMP confirmée le 10/09/2026 (Florent), coordonnées ci-dessous inchangées.
    { h: 'Article 12. Litiges', body: [
      'Ces conditions relèvent du droit français. En cas de désaccord, on cherche d’abord une solution ensemble. Sinon, tu peux saisir gratuitement le médiateur de la consommation dont je relève : Société de la Médiation Professionnelle, Alteritae, 5 rue Salvaing, 12000 Rodez, www.mediateur-consommation-smp.fr, ou par le formulaire de son site. Les tribunaux français restent compétents.',
    ] },
  ],
};
