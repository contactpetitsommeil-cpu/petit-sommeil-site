/**
 * /llms.txt : carte du site en Markdown pour les assistants IA (standard llmstxt.org).
 * Généré à chaque construction depuis les mêmes données que les pages, donc jamais en retard sur le site.
 * Contenu : ce que le site dit déjà, rien de plus (docs/contexte.md, docs/voix-et-ton.md).
 * Mis en place le 10/09/2026 (audit de lancement, temps 1). La version complète est /llms-full.txt.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { services } from '../data/services';
import { plans, launchIsLive } from '../data/pricing';

export const entete = () => `# ${site.name}

> ${site.owner}, conseillère en hygiène de sommeil pour les enfants de 0 à 6 ans. Consultations en visio partout en France, et à domicile autour de Saint-Malo (Ille-et-Vilaine, Bretagne). Aucune méthode de pleurs contrôlés, aucune promesse de résultat : le sommeil de l'enfant est analysé, puis un plan d'action est construit avec la famille.

Site : ${site.url} · Contact : ${site.email} · Instagram : ${site.instagram}
Tagline : « ${site.tagline} » · Signature : « Doucement, pas à pas, vers des nuits plus sereines. »

## En bref

- Qui : ${site.owner}, ${site.role.toLowerCase()}. Formée par Oh Mama Care (hygiène de sommeil des enfants de 0 à 6 ans, session de mai 2026). Entrepreneur individuel, Petit Sommeil.
- Pour qui : les familles d'un enfant de 0 à 6 ans, réveils nocturnes, endormissements difficiles, siestes, réveils matinaux, peurs du soir. Le parent compte autant que l'enfant : un temps d'échange sur le vécu parental (fatigue, post-partum) est proposé, jamais imposé.
- Où : visio partout en France. À domicile : Saint-Malo, Dinard, Dol-de-Bretagne, Cancale, Saint-Méloir-des-Ondes, Plerguer, Miniac, Le Tronchet, Beaussais-sur-Mer (1 € par km au-delà de 20 km).
- Comment : 1) questionnaire en ligne, 2) planning de sommeil sur 7 jours rempli par les parents, 3) échange de 1h30 en visio ou à domicile, 4) plan d'action écrit sous 48h, 5) contact quotidien (hors dimanche) si un accompagnement est choisi.
- Ce qu'elle ne fait pas : pas de méthode de pleurs contrôlés, pas de diagnostic médical (elle oriente vers pédiatre, médecin, ostéopathe ou consultante en lactation), pas de comparaison entre enfants, pas de promesse de « nuits complètes ». Accompagnement jusqu'à 6 ans.
- Tranches d'âge : ${services.map((s) => `${s.title} (${s.age.toLowerCase()})`).join(' · ')}.
- Tarifs : ${plans.map((p) => `${p.name} ${p.price}${launchIsLive() && p.priceLaunch ? ` (${p.priceLaunch} jusqu'au 30/09/2026)` : ''}`).join(' · ')}. Règlement le jour de la consultation (virement, espèces, chèque).
- Délais : réponse sous 48h, rendez-vous en général sous deux semaines, sans engagement. Report sans frais si prévenue 48h avant.
- Horaires : consultations du lundi au vendredi, 9h à 12h et 13h30 à 17h. Pendant un accompagnement, joignable de 9h à 21h (jours fériés 9h à 12h), dimanche non.
`;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const d = (x: Date) => x.toISOString().slice(0, 10);
  const texte = `${entete()}
## Pages

- [Accueil](${site.url}/) : la démarche, le parcours en cinq étapes, les tranches d'âge, les avis des familles.
- [Accompagnements](${site.url}/accompagnements) : le sommeil et les objectifs d'accompagnement par tranche d'âge, de 0 à 6 ans.
- [Tarifs](${site.url}/tarifs) : consultation unique, consultation de suivi, accompagnement 15 jours, accompagnement 1 mois.
- [Questionnaire](${site.url}/questionnaire) : le point de départ de tout accompagnement, cinq étapes adaptées à l'âge de l'enfant.
- [Planning de sommeil à imprimer](${site.url}/planning-de-sommeil) : la feuille de sept jours, gratuite, en deux versions (0 à 2 ans, 2 à 6 ans).
- [Questions fréquentes](${site.url}/faq) : déroulé d'une consultation, résultats, délais, horaires, paiement, annulation, visio ou domicile.
- [À propos](${site.url}/a-propos) : le parcours de Sarah, sa formation, ce qu'elle ne fait pas, où elle consulte.
- [Le coin conseils](${site.url}/blog) : des repères sur le sommeil de l'enfant, sans injonction ni promesse.
- [Contact](${site.url}/contact) : formulaire et email.

## Articles

${posts.map((p) => `- [${p.data.title}](${site.url}/blog/${p.id}) : ${p.data.description} (${p.data.category}, ${d(p.data.date)})`).join('\n')}

## Pages légales

- [Mentions légales](${site.url}/mentions-legales)
- [Politique de confidentialité](${site.url}/politique-confidentialite)
- [Conditions générales de vente](${site.url}/cgv)

## Version complète

- [llms-full.txt](${site.url}/llms-full.txt) : le contenu intégral des accompagnements, des tarifs, de la FAQ et des articles.
`;
  return new Response(texte, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
