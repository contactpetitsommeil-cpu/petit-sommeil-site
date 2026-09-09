/**
 * Questionnaire Petit Sommeil, v3, cinq tranches.
 * Source unique des champs. Reproduit `docs/questionnaire.md` v3.
 * Aucun champ ne s'ajoute ni ne se retire sans décision écrite dans `docs/decisions.md`.
 * `{prenom}` est remplacé par le prénom de l'enfant côté îlot JS ; sans JS, par « ton enfant ».
 * `showFor` accepte un identifiant de tranche ou plusieurs séparés par des virgules (ex. 'b3,b4').
 */

export type Option = string | { label: string; value?: string; showFor?: string };

interface Base { key: string; label: string; hint?: string }
export type Field =
  | (Base & { type: 'tiles'; options: Option[]; cols: number; multi?: boolean })
  | (Base & { type: 'text' | 'email' | 'tel' | 'date'; placeholder?: string })
  | (Base & { type: 'textarea'; placeholder?: string; rows?: number })
  | (Base & { type: 'select'; options: Option[] })
  | (Base & { type: 'consent'; href: string });

export const BRACKETS = [
  { value: 'b0', label: '0 à 6 mois', minMonths: 0,  maxMonths: 6  },
  { value: 'b1', label: '6 à 18 mois', minMonths: 6,  maxMonths: 18 },
  { value: 'b2', label: '18 à 24 mois', minMonths: 18, maxMonths: 24 },
  { value: 'b3', label: '24 à 36 mois', minMonths: 24, maxMonths: 36 },
  { value: 'b4', label: '3 à 6 ans',    minMonths: 36, maxMonths: 72 },
] as const;

export type BracketKey = typeof BRACKETS[number]['value'];

export const stepTitles = [
  'Parlons de {prenom}',
  'Les journées de {prenom}',
  'Le coucher et les nuits',
  'Tes attentes',
  'Tes coordonnées',
];

/* ---------------------------------------------------------------- Étape 1 */

export const step1: Field[] = [
  { key: 'childName', type: 'text', label: 'Prénom de ton enfant', placeholder: 'Léo' },
  { key: 'birthDate', type: 'date', label: 'Date de naissance', hint: 'La tranche d’âge se pré-sélectionne toute seule', placeholder: 'jj/mm/aaaa' },
  { key: 'tranche', type: 'tiles', label: 'Tranche d’âge', cols: 3,
    options: BRACKETS.map((b) => ({ label: b.label, value: b.value })) },
  { key: 'sibling', type: 'tiles', label: 'Place dans la fratrie', cols: 4,
    options: ['Enfant unique', 'Aîné(e)', 'Cadet(te)', 'Benjamin(e)'] },
  { key: 'care', type: 'tiles', label: 'Mode de garde', cols: 2,
    options: [
      'À la maison',
      'Assistante maternelle',
      'Crèche',
      { label: 'École', showFor: 'b3,b4' },
    ] },
  { key: 'concerns', type: 'tiles', multi: true, cols: 2,
    label: 'Ce qui t’amène', hint: 'Plusieurs réponses possibles',
    options: [
      'Endormissements difficiles',
      'Réveils nocturnes fréquents',
      'Réveils trop précoces',
      'Siestes courtes ou absentes',
      'Terreurs nocturnes ou cauchemars',
      'Transition lit ou chambre',
      'Sevrage de la tétée ou du biberon de nuit',
      'Autre',
    ] },
];

/* ------------------------------------------------- Étape 2, par tranche */

export const step2: Record<BracketKey, Field[]> = {
  b0: [
    { key: 'b0_feeding', type: 'tiles', label: 'Alimentation', cols: 3, options: ['Allaitement', 'Biberon', 'Mixte'] },
    { key: 'b0_meals', type: 'tiles', label: 'Repas sur 24h', cols: 4, options: ['5 ou moins', '6 à 7', '8 à 9', '10 et plus'] },
    { key: 'b0_nightMeals', type: 'tiles', label: 'Repas la nuit', cols: 4, options: ['0', '1', '2', '3 et plus'] },
    { key: 'b0_wake', type: 'tiles', label: 'Heure du réveil le matin', cols: 4, options: ['Avant 6h', '6h à 7h', '7h à 8h', 'Après 8h'] },
    { key: 'b0_naps', type: 'tiles', label: 'Nombre de siestes', cols: 4, options: ['1 à 2', '3', '4', '5 et plus'] },
    { key: 'b0_tired', type: 'textarea', label: 'Signes de fatigue que tu remarques', hint: 'Facultatif',
      placeholder: 'Ex : frotte les yeux, bâille, devient grognon…' },
  ],
  b1: [
    { key: 'b1_solids', type: 'tiles', label: 'Diversification commencée ?', cols: 3, options: ['Pas encore', 'Depuis peu', 'Bien installée'] },
    { key: 'b1_nightMilk', type: 'tiles', label: 'Lait ou biberon la nuit', cols: 2, options: ['Oui', 'Non'] },
    { key: 'b1_wake', type: 'tiles', label: 'Heure du réveil le matin', cols: 4, options: ['Avant 6h', '6h à 7h', '7h à 8h', 'Après 8h'] },
    { key: 'b1_naps', type: 'tiles', label: 'Nombre de siestes', cols: 3, options: ['1', '2', '3'] },
    { key: 'b1_outside', type: 'tiles', label: 'Temps dehors par jour', cols: 3, options: ['Moins de 30 min', '30 min à 1h', 'Plus d’1h'] },
    { key: 'b1_screens', type: 'tiles', label: 'Écrans', cols: 2, options: ['Aucun', 'Un peu'] },
    { key: 'b1_dev', type: 'tiles', multi: true, cols: 2, label: 'Étapes récentes', hint: 'Plusieurs réponses possibles',
      options: ['Dents', 'Quatre pattes', 'Se met debout', 'Marche', 'Rien de particulier'] },
  ],
  b2: [
    { key: 'b2_nightDrink', type: 'tiles', label: 'Boisson la nuit', cols: 3, options: ['Non', 'Eau', 'Lait'] },
    { key: 'b2_wake', type: 'tiles', label: 'Heure du réveil le matin', cols: 4, options: ['Avant 6h', '6h à 7h', '7h à 8h', 'Après 8h'] },
    { key: 'b2_nap', type: 'tiles', label: 'Sieste', cols: 3, options: ['Oui, tous les jours', 'Parfois', 'Plus de sieste'] },
    { key: 'b2_bedtime', type: 'tiles', label: 'Heure du coucher', cols: 4, options: ['Avant 19h', '19h à 20h', '20h à 21h', 'Après 21h'] },
    { key: 'b2_dev', type: 'tiles', multi: true, cols: 2, label: 'Étapes récentes', hint: 'Plusieurs réponses possibles',
      options: ['Marche', 'Langage qui décolle', 'Dents du fond', 'Changement récent (déménagement, naissance, garde)', 'Rien de particulier'] },
    { key: 'b2_changes', type: 'textarea', label: 'Un changement récent à me signaler ?', hint: 'Facultatif',
      placeholder: 'Ex : arrivée d’un petit frère, entrée en crèche…' },
  ],
  b3: [
    { key: 'b3_nightDrink', type: 'tiles', label: 'Boisson la nuit', cols: 3, options: ['Non', 'Eau', 'Lait'] },
    { key: 'b3_wake', type: 'tiles', label: 'Heure du réveil le matin', cols: 4, options: ['Avant 6h', '6h à 7h', '7h à 8h', 'Après 8h'] },
    { key: 'b3_nap', type: 'tiles', label: 'Sieste', cols: 3, options: ['Oui, tous les jours', 'Parfois', 'Plus de sieste'] },
    { key: 'b3_bedtime', type: 'tiles', label: 'Heure du coucher', cols: 4, options: ['Avant 19h', '19h à 20h', '20h à 21h', 'Après 21h'] },
    { key: 'b3_bed', type: 'tiles', label: 'Lit', cols: 3, options: ['Lit à barreaux', 'Lit de grand', 'Transition en cours'] },
    { key: 'b3_potty', type: 'tiles', label: 'Propreté', cols: 2, options: ['Pas commencée', 'En cours', 'Acquise le jour', 'Acquise jour et nuit'] },
    { key: 'b3_dev', type: 'tiles', multi: true, cols: 2, label: 'Étapes récentes', hint: 'Plusieurs réponses possibles',
      options: ['Langage qui décolle', 'Entrée en collectivité', 'Arrivée d’un frère ou d’une sœur', 'Déménagement', 'Rien de particulier'] },
  ],
  b4: [
    { key: 'b4_wake', type: 'tiles', label: 'Heure du réveil le matin', cols: 4, options: ['Avant 6h', '6h à 7h', '7h à 8h', 'Après 8h'] },
    { key: 'b4_nap', type: 'tiles', label: 'Sieste', cols: 2, options: ['Non', 'Occasionnelle'] },
    { key: 'b4_screens', type: 'tiles', label: 'Temps d’écran par jour', cols: 3, options: ['Aucun', 'Moins d’1h', 'Plus d’1h'] },
    { key: 'b4_activity', type: 'tiles', label: 'Activité physique', cols: 3, options: ['Peu', 'Tous les jours un peu', 'Beaucoup'] },
    { key: 'b4_night', type: 'tiles', multi: true, cols: 2, label: 'La nuit, ton enfant', hint: 'Plusieurs réponses possibles',
      options: ['A peur du noir', 'Fait des cauchemars', 'Fait des terreurs nocturnes', 'Mouille son lit', 'Rien de tout ça'] },
  ],
};

/* ------------------------------------------------- Étape 3, par tranche */

export const step3: Record<BracketKey, Field[]> = {
  b0: [
    { key: 'b0_fallAsleep', type: 'tiles', multi: true, cols: 2, label: 'Comment s’endort {prenom} ?',
      options: ['Seul(e)', 'Dans les bras', 'Bercé(e)', 'Au sein', 'Au biberon', 'En porte-bébé'] },
    { key: 'b0_feedToSleep', type: 'tiles', label: 'S’endort au sein ou au biberon ?', cols: 2, options: ['Oui', 'Non'] },
    { key: 'b0_routine', type: 'textarea', label: 'Ta routine du soir', hint: 'Facultatif', placeholder: 'Ex : bain, tétée, berceuse…' },
    { key: 'b0_wakeups', type: 'tiles', label: 'Réveils par nuit', cols: 4, options: ['0 à 1', '2 à 3', '4 à 5', '6 et plus'] },
    { key: 'b0_soothe', type: 'tiles', multi: true, cols: 2, label: 'Ce qui aide à se rendormir',
      options: ['Sein', 'Biberon', 'Portage', 'Tétine', 'Ta présence'] },
  ],
  b1: [
    { key: 'b1_routine', type: 'tiles', multi: true, cols: 2, label: 'Ta routine du soir',
      options: ['Bain', 'Lecture', 'Chanson', 'Câlin', 'Pas de routine fixe'] },
    { key: 'b1_who', type: 'tiles', label: 'Qui couche {prenom} ?', cols: 3,
      options: ['Toujours la même personne', 'Ça dépend des soirs', 'Les deux parents'] },
    { key: 'b1_fallAsleep', type: 'tiles', multi: true, cols: 2, label: 'Comment s’endort {prenom} ?',
      options: ['Seul(e)', 'Dans les bras', 'Avec un parent à côté', 'Avec la tétine', 'Avec le doudou'] },
    { key: 'b1_fallAsleepTime', type: 'tiles', label: 'Temps pour s’endormir', cols: 3, options: ['Moins de 15 min', '15 à 45 min', 'Plus de 45 min'] },
    { key: 'b1_wakeups', type: 'tiles', label: 'Réveils par nuit', cols: 4, options: ['0 à 1', '2 à 3', '4 à 5', '6 et plus'] },
    { key: 'b1_soothe', type: 'tiles', multi: true, cols: 2, label: 'Ce qui aide à se rendormir',
      options: ['Eau', 'Lait', 'Ta présence', 'Cododo'] },
  ],
  b2: [
    { key: 'b2_routine', type: 'tiles', multi: true, cols: 2, label: 'Ta routine du soir',
      options: ['Lecture', 'Chanson', 'Doudou', 'Pas de routine fixe'] },
    { key: 'b2_parentStays', type: 'tiles', label: 'Un parent reste jusqu’à l’endormissement ?', cols: 2, options: ['Oui', 'Non'] },
    { key: 'b2_separation', type: 'tiles', label: 'Anxiété de séparation le soir ?', cols: 3, options: ['Oui', 'Parfois', 'Non'] },
    { key: 'b2_wakeups', type: 'tiles', label: 'Réveils par nuit', cols: 4, options: ['0 à 1', '2 à 3', '4 à 5', '6 et plus'] },
    { key: 'b2_parentsBed', type: 'tiles', label: 'Revient dans le lit des parents ?', cols: 3, options: ['Oui, souvent', 'Parfois', 'Non'] },
  ],
  b3: [
    { key: 'b3_routine', type: 'tiles', multi: true, cols: 2, label: 'Ta routine du soir',
      options: ['Bain', 'Lecture', 'Chanson', 'Doudou', 'Pas de routine fixe'] },
    { key: 'b3_refuses', type: 'tiles', label: 'Refuse le coucher ?', cols: 3, options: ['Souvent', 'Parfois', 'Non'] },
    { key: 'b3_getsUp', type: 'tiles', label: 'Sort de son lit le soir ou la nuit ?', cols: 3, options: ['Souvent', 'Parfois', 'Non'] },
    { key: 'b3_parentStays', type: 'tiles', label: 'Un parent reste jusqu’à l’endormissement ?', cols: 2, options: ['Oui', 'Non'] },
    { key: 'b3_wakeups', type: 'tiles', label: 'Réveils par nuit', cols: 4, options: ['0', '1', '2 à 3', '4 et plus'] },
    { key: 'b3_parentsBed', type: 'tiles', label: 'Revient dans le lit des parents ?', cols: 3, options: ['Oui, souvent', 'Parfois', 'Non'] },
  ],
  b4: [
    { key: 'b4_routine', type: 'tiles', multi: true, cols: 2, label: 'Ta routine du soir',
      options: ['Bain', 'Lecture', 'Discussion', 'Chanson', 'Pas de routine fixe'] },
    { key: 'b4_refuses', type: 'tiles', label: 'Refuse le coucher ?', cols: 3, options: ['Souvent', 'Parfois', 'Non'] },
    { key: 'b4_fallAsleep', type: 'tiles', label: 'Comment s’endort {prenom} ?', cols: 2, options: ['Seul(e)', 'Avec un parent présent'] },
    { key: 'b4_wakeups', type: 'tiles', label: 'Réveils par nuit', cols: 4, options: ['0', '1', '2 à 3', '4 et plus'] },
    { key: 'b4_interventions', type: 'textarea', label: 'Ce que tu fais quand {prenom} se réveille', hint: 'Facultatif',
      placeholder: 'Ex : je vais le rassurer, il vient dans notre lit…' },
  ],
};

/* ---------------------------------------------------------------- Étape 4 */

export const step4: Field[] = [
  { key: 'since', type: 'tiles', label: 'Depuis combien de temps ?', cols: 4,
    options: ['Quelques jours', 'Quelques semaines', 'Plusieurs mois', 'Depuis toujours'] },
  { key: 'mood', type: 'tiles', label: 'Comment tu te sens ?', cols: 2,
    options: ['Fatigué(e) mais ça va', 'Épuisé(e)', 'Au bout du rouleau', 'Inquiet(ète) pour mon enfant'] },
  { key: 'describe', type: 'textarea', label: 'Décris la situation en quelques mots',
    hint: 'Le plus utile pour préparer notre échange', rows: 4,
    placeholder: 'Ex : Léo se réveille toutes les 2h et ne se rendort qu’au sein…' },
  { key: 'goal', type: 'textarea', label: 'Ton objectif principal', rows: 3,
    placeholder: 'Ex : que mon enfant s’endorme seul(e) et fasse des nuits plus longues.' },
  { key: 'tried', type: 'textarea', label: 'Tu as déjà tenté des choses ?', hint: 'Facultatif', rows: 3,
    placeholder: 'Ex : rituel du soir, veilleuse, décaler le coucher…' },
  { key: 'health', type: 'textarea', label: 'Y a-t-il quelque chose sur la santé de ton enfant que je devrais savoir ?',
    hint: 'Facultatif. On en reparlera surtout en consultation.', rows: 2,
    placeholder: 'Ex : reflux, allergie, né avant terme…' },
  { key: 'format', type: 'tiles', label: 'Quel format préfères-tu ?', cols: 3, options: ['Visio', 'À domicile', 'Peu importe'] },
];

/* ---------------------------------------------------------------- Étape 5 */

export const step5: Field[] = [
  { key: 'parentName', type: 'text', label: 'Ton prénom', placeholder: 'Julie' },
  { key: 'email', type: 'email', label: 'Email', placeholder: 'toi@exemple.fr' },
  { key: 'phone', type: 'tel', label: 'Téléphone', hint: 'Facultatif', placeholder: '06 12 34 56 78' },
  { key: 'source', type: 'select', label: 'Comment m’as-tu connue ?',
    options: ['Choisir…', 'Instagram', 'Recommandation', 'Recherche Google', 'Salon de la parentalité', 'Autre'] },
  { key: 'consent', type: 'consent', href: '/politique-confidentialite',
    label: 'J’accepte d’être recontacté(e) par Sarah au sujet de ma demande, et j’ai lu la politique de confidentialité.' },
];
