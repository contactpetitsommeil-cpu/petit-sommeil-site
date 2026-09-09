/**
 * Configuration de la retouche des photos (commande 9, 08/09/2026).
 * Un objet par emplacement. Les chemins sont relatifs à la racine du dépôt (le dossier parent de `site/`).
 * Lancement : `npm run photos` depuis `site/` (voir retouche.mjs).
 */

/** Réglage commun à toute la série, valeurs de départ à ajuster sur la planche contact. */
export const preset = {
  brightness: 1.03,      // exposition légère (modulate)
  saturation: 0.92,      // on retire du criard iPhone (modulate)
  contrast: { a: 1.05, b: -6 },   // .linear(a, b), contraste doux
  lift: { a: 0.97, b: 7 },        // noirs relevés, rendu papier
  warm: [[1.02, 0, 0], [0, 1.0, 0], [0, 0, 0.96]],  // .recomb, température vers le crème de la charte
};

/** Où lire, où écrire. */
export const SRC_DIR = 'livrables/photos/selection';
export const OUT_DIR = 'site/src/assets/photos';
export const PLANCHE_DIR = 'livrables/photos/planche';   // images « avant » réduites, pour la planche contact

/**
 * Chaque photo :
 * - `id`         : préfixe des fichiers de sortie (`<id>-<crop>.jpg`, `<id>-full.jpg`).
 * - `src`        : nom du fichier source sans extension (jpg, jpeg, png, heic acceptés),
 *                  ou l'`id` d'une autre photo pour en dériver un cadrage (08 reprend 02).
 * - `crops`      : un cadrage par clé (`mobile`, `desktop`, `all`…), ratio et largeur de sortie.
 *                  `focus` (fraction {left, top}) ou `region` (fractions {left, top, width}) par cadrage
 *                  priment sur le `focus` de la photo. Sans rien : `sharp.strategy.attention`.
 * - `focus`      : 'attention' ou { left, top } en fraction de l'image (0 à 1), point que le cadrage conserve.
 * - `sharpen`    : sigma de l'accentuation après agrandissement (0.6 par défaut).
 * - `upscale`    : 2 pour les images générées (03, 04, 05, 07) : agrandissement ×2 AVANT le pipeline,
 *                  Real-ESRGAN si `realesrgan-ncnn-vulkan` est sur le PATH, sinon lanczos3 de sharp
 *                  (le script dit lequel il a utilisé). Jamais au-delà de 2.
 * - `portrait`   : true pour un visage (JPEG en 4:4:4, sinon 4:2:0).
 * - `overrides`  : clés du preset à remplacer pour cette photo seule. Chaque override est justifié
 *                  dans le rapport (`livrables/rapport-atelier-09.md`).
 * - `variants`   : cadrages supplémentaires montrés sur la planche contact seulement, jamais importés
 *                  par le site. Servent à trancher un cadrage.
 */
export const photos = [
  {
    id: '01-hero', src: '01-hero', portrait: true,
    crops: {
      /* Téléphone en carré (décision de Florent du 08/09) : le 4:5 coupait les deux enfants aux épaules. */
      mobile:  { ratio: '1:1', width: 1200, focus: { left: 0.47, top: 0.5 } },
      /* Ordinateur : le cadre entier 3:2, les deux enfants en entier (Florent, 08/09), dans une colonne élargie. */
      desktop: { ratio: '3:2', width: 1800, focus: { left: 0.5, top: 0.5 } },
    },
    overrides: {},
  },
  {
    id: '02-portrait', src: '02-portrait', portrait: true,
    crops: { all: { ratio: '4:5', width: 1200, focus: { left: 0.5, top: 0.25 } } },
    overrides: {},
  },
  {
    /* Scène de l'accueil (règle hybride du 08/09) : la photo occupe l'écran, la carte glisse à droite du parent. */
    id: '03-et-toi', src: '03-et-toi', upscale: 2,
    crops: {
      mobile:  { ratio: '3:4', width: 1200, focus: { left: 0.2, top: 0.4 } },
      desktop: { ratio: '3:2', width: 2400, focus: { left: 0.5, top: 0.5 } },
    },
    overrides: {},
  },
  {
    /* Les mains, en carré dans la marge du bloc planning de l'accueil. */
    id: '04-detail', src: '04-detail', upscale: 2,
    crops: { all: { ratio: '1:1', width: 1200, focus: { left: 0.55, top: 0.5 } } },
    overrides: {},
  },
  {
    /* Scène d'Accompagnements : Sarah à droite, la carte à gauche. */
    /* Source ChatGPT de 1 376 px : le cadre entier 16:9 (aucun zoom sur un écran de 1 280) et une accentuation un peu plus
       forte après l'agrandissement (Florent, 08/09 : « pixellisée, pas nette »). Elle ne sera jamais nette sur grand écran sans Real-ESRGAN. */
    id: '05-accompagnements', src: '05-accompagnements', upscale: 2, sharpen: 1.1, portrait: true,
    crops: {
      mobile:  { ratio: '3:4', width: 1200, focus: { left: 0.8, top: 0.5 } },
      desktop: { ratio: '16:9', width: 2400, focus: { left: 0.5, top: 0.5 } },
    },
    overrides: {},
  },
  {
    /* Le cadre entier (tasse, feuille, table), en portrait : Florent trouvait le recadrage serré moche (08/09). */
    id: '07-planning', src: '07-planning', upscale: 2,
    crops: { all: { ratio: '3:4', width: 1200, focus: { left: 0.5, top: 0.5 } } },
    overrides: {},
  },
  {
    id: '08-contact', src: '02-portrait', portrait: true,
    crops: { all: { ratio: '1:1', width: 800, region: { left: 0.2, top: 0.1, width: 0.6 } } },
    overrides: {},
  },
  /* Les cinq tranches d'Accompagnements (photos du photographe déposées le 08/09, accord des parents) : cartes 4:5. */
  { id: '09-pieds',    src: '09-pieds',    portrait: true, crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.3, top: 0.5 } } }, overrides: {} },
  { id: '10-bras',     src: '10-bras',     portrait: true, crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.5, top: 0.5 } } }, overrides: {} },
  { id: '11-main',     src: '11-main',     portrait: true, crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.75, top: 0.5 } } }, overrides: {} },
  { id: '12-barreaux', src: '12-barreaux', portrait: true, crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.55, top: 0.5 } } }, overrides: {} },
  /* Tranche 3-6 ans : image générée (Gemini, prompt de l'atelier, 08/09), enfant de dos au bord de son lit. Agrandie ×2 comme les autres images générées. */
  { id: '13-enfant-3-6', src: '13-enfant-3-6', upscale: 2, crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.6, top: 0.5 } } }, overrides: {} },
  /* Accueil (08/09) : le lit à barreaux et son mobile pour « Ce que je ne ferai jamais » (photographe), la lune et la veilleuse pour « Si je ne suis pas la bonne personne » (iPhone de Sarah). */
  { id: '14-lit-barreaux', src: '14-lit-barreaux', crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.5, top: 0.45 } } }, overrides: {} },
  { id: '15-lune', src: '15-lune', crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.5, top: 0.5 } } }, overrides: {} },
  /* 09/09 : Florent remplace la lune par le lit à barreaux avec le doudou lapin et la veilleuse ours (image générée 768 × 1 376, agrandie ×2 comme les autres). La 15 reste dans la config, plus importée par le site. */
  { id: '16-lit-doudou-veilleuse', src: 'lit-doudou-veilleuse', upscale: 2, crops: { carte: { ratio: '4:5', width: 900, focus: { left: 0.5, top: 0.55 } } }, overrides: {} },
  /* Les sept images des articles du coin conseils (Gemini sur les prompts de l'atelier, 08/09), 1 264 × 848, agrandies ×2, cadre entier 3:2. */
  ...['20-allaiter-la-nuit', '21-ce-nest-pas-ta-faute', '22-cododo-ou-pas', '23-laisse-le-pleurer', '24-post-partum', '25-porter-son-bebe', '26-reveil-matinal']
    .map((id) => ({ id, src: id, upscale: 2, crops: { carte: { ratio: '3:2', width: 1200, focus: { left: 0.5, top: 0.5 } } }, overrides: {} })),
];
