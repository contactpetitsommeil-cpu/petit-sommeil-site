/**
 * Les photos du site (commande 9, puis règle hybride du 08/09/2026) : quel master sert à quel cadrage, et le
 * texte alternatif de chaque emplacement. Les masters JPEG sont produits par `npm run photos`
 * (site/scripts/photos/) dans `src/assets/photos/` ; seuls ceux importés ici sont émis dans le site construit.
 * Astro fabrique AVIF et WebP. Les alts décrivent la photo réelle, sans promesse, à la troisième personne.
 */
import type { ImageMetadata } from 'astro';
import hero_mobile from '../assets/photos/01-hero-mobile.jpg';
import hero_desktop from '../assets/photos/01-hero-desktop.jpg';
import portrait_all from '../assets/photos/02-portrait-all.jpg';
import ettoi_mobile from '../assets/photos/03-et-toi-mobile.jpg';
import ettoi_desktop from '../assets/photos/03-et-toi-desktop.jpg';
import detail_all from '../assets/photos/04-detail-all.jpg';
import accomp_mobile from '../assets/photos/05-accompagnements-mobile.jpg';
import accomp_desktop from '../assets/photos/05-accompagnements-desktop.jpg';
import planning_all from '../assets/photos/07-planning-all.jpg';
import contact_all from '../assets/photos/08-contact-all.jpg';
import pieds_carte from '../assets/photos/09-pieds-carte.jpg';
import bras_carte from '../assets/photos/10-bras-carte.jpg';
import main_carte from '../assets/photos/11-main-carte.jpg';
import barreaux_carte from '../assets/photos/12-barreaux-carte.jpg';
import enfant36_carte from '../assets/photos/13-enfant-3-6-carte.jpg';
import litbarreaux_carte from '../assets/photos/14-lit-barreaux-carte.jpg';
import litdoudou_carte from '../assets/photos/16-lit-doudou-veilleuse-carte.jpg';
import art_allaiter from '../assets/photos/20-allaiter-la-nuit-carte.jpg';
import art_faute from '../assets/photos/21-ce-nest-pas-ta-faute-carte.jpg';
import art_cododo from '../assets/photos/22-cododo-ou-pas-carte.jpg';
import art_pleurer from '../assets/photos/23-laisse-le-pleurer-carte.jpg';
import art_postpartum from '../assets/photos/24-post-partum-carte.jpg';
import art_porter from '../assets/photos/25-porter-son-bebe-carte.jpg';
import art_reveil from '../assets/photos/26-reveil-matinal-carte.jpg';

export type PhotoId =
  | '01-hero' | '02-portrait' | '03-et-toi' | '04-detail' | '05-accompagnements' | '07-planning' | '08-contact'
  | '09-pieds' | '10-bras' | '11-main' | '12-barreaux' | '13-enfant-3-6' | '14-lit-barreaux' | '16-lit-doudou-veilleuse'
  | '20-allaiter-la-nuit' | '21-ce-nest-pas-ta-faute' | '22-cododo-ou-pas' | '23-laisse-le-pleurer' | '24-post-partum' | '25-porter-son-bebe' | '26-reveil-matinal';

export const photos: Record<PhotoId, { alt: string; crops: Record<string, ImageMetadata> }> = {
  '01-hero': { alt: 'Sarah sourit à sa fille, ses deux enfants contre elle, le garçon de dos', crops: { mobile: hero_mobile, desktop: hero_desktop } },
  '02-portrait': { alt: 'Sarah, conseillère en sommeil, souriante, les bras croisés', crops: { all: portrait_all } },
  '03-et-toi': { alt: 'Un parent de dos, un mug à la main, face à une porte-fenêtre ouverte sur le jardin au petit matin', crops: { mobile: ettoi_mobile, desktop: ettoi_desktop } },
  '04-detail': { alt: 'La main d’un parent qui tient celle de son nouveau-né, posées sur un drap de lin', crops: { all: detail_all } },
  '05-accompagnements': { alt: 'Sarah en consultation en visio, à sa table, un carnet à la main devant son ordinateur', crops: { mobile: accomp_mobile, desktop: accomp_desktop } },
  '07-planning': { alt: 'Un planning de sommeil rempli au stylo, posé sur une table à côté d’un mug', crops: { all: planning_all } },
  '08-contact': { alt: 'Sarah', crops: { all: contact_all } },
  /* Les cinq tranches d'Accompagnements, photos du photographe (08/09), accord des parents. */
  '09-pieds': { alt: 'Les pieds d’un nouveau-né sur un drap de lin', crops: { carte: pieds_carte } },
  '10-bras': { alt: 'Un bébé blotti dans les bras de sa mère', crops: { carte: bras_carte } },
  '11-main': { alt: 'La main d’un bébé tenue dans celle de sa mère', crops: { carte: main_carte } },
  '12-barreaux': { alt: 'La main d’un bébé tendue entre les barreaux de son lit', crops: { carte: barreaux_carte } },
  /* Image générée (Gemini, 08/09), enfant de dos : pas un vrai enfant. */
  '13-enfant-3-6': { alt: 'Un enfant de quatre ans en pyjama, de dos, assis au bord de son lit, un livre sur les genoux', crops: { carte: enfant36_carte } },
  '14-lit-barreaux': { alt: 'Un lit à barreaux en bois clair, une couverture posée sur le rebord, un mobile au-dessus', crops: { carte: litbarreaux_carte } },
  /* Image générée (09/09), remplace la lune (15) : pas une vraie chambre. */
  '16-lit-doudou-veilleuse': { alt: 'Un doudou lapin en tricot allongé dans un lit à barreaux, à côté d’une veilleuse en forme d’ourson allumée', crops: { carte: litdoudou_carte } },
  /* Les images des articles (générées sur `livrables/prompts-gemini-articles.md`, 08/09). */
  '20-allaiter-la-nuit': { alt: 'Un fauteuil d’allaitement dans la pénombre, une lampe allumée, un lange sur l’accoudoir', crops: { carte: art_allaiter } },
  '21-ce-nest-pas-ta-faute': { alt: 'Les mains d’un parent autour d’un mug, sur une table en bois, au petit matin', crops: { carte: art_faute } },
  '22-cododo-ou-pas': { alt: 'Un grand lit défait au matin et, contre lui, un berceau cododo en bois clair', crops: { carte: art_cododo } },
  '23-laisse-le-pleurer': { alt: 'La main d’un parent posée sur le dos d’un bébé endormi, vue de dessus', crops: { carte: art_pleurer } },
  '24-post-partum': { alt: 'Une table de nuit à l’aube, la lampe encore allumée, un verre d’eau et un téléphone retourné', crops: { carte: art_postpartum } },
  '25-porter-son-bebe': { alt: 'Un parent de dos qui porte son nouveau-né dans une écharpe en lin, devant une fenêtre', crops: { carte: art_porter } },
  '26-reveil-matinal': { alt: 'Une chambre d’enfant encore sombre, un rai de lumière sur le bord du volet, un boudin de porte au sol', crops: { carte: art_reveil } },
};

/** L'image de chaque article du coin conseils, par identifiant d'article (le nom du fichier .md). */
export const articles: Record<string, PhotoId> = {
  'allaiter-la-nuit': '20-allaiter-la-nuit',
  'ce-nest-pas-ta-faute': '21-ce-nest-pas-ta-faute',
  'cododo-ou-pas': '22-cododo-ou-pas',
  'laisse-le-pleurer-il-apprendra-quoi': '23-laisse-le-pleurer',
  'manque-de-sommeil-post-partum': '24-post-partum',
  'porter-son-bebe-neuf-mois-dans-le-ventre': '25-porter-son-bebe',
  'reveil-matinal-lumiere-babyphone': '26-reveil-matinal',
};
