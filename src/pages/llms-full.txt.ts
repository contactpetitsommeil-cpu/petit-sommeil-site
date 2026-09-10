/**
 * /llms-full.txt : la version intégrale de /llms.txt (accompagnements, tarifs, FAQ, articles en entier).
 * Même source de données que les pages, générée à chaque construction. Mis en place le 10/09/2026.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { services, parcours, pillars } from '../data/services';
import { plans, pricingNote, launchIsLive } from '../data/pricing';
import { faq } from '../data/faq';
import { entete } from './llms.txt';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const jour = (x: Date) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(x);
  const lancement = launchIsLive();

  const blocs: string[] = [entete()];

  blocs.push(`## La démarche (${site.url}/)

${pillars.map((p) => `- **${p.title}.** ${p.text}`).join('\n')}

### Le parcours, en cinq étapes

${parcours.map((e, i) => `${i + 1}. **${e.title}.** ${e.text}`).join('\n')}
`);

  blocs.push(`## Accompagnements par âge (${site.url}/accompagnements)

${services.map((s) => `### ${s.title} : ${s.age}\n\n${s.description}\n\n${s.points.map((pt) => `- ${pt}`).join('\n')}`).join('\n\n')}
`);

  blocs.push(`## Tarifs (${site.url}/tarifs)

${plans.map((p) => `### ${p.name}, ${p.price}${lancement && p.priceLaunch ? ` (prix de lancement ${p.priceLaunch} pour toute prise de rendez-vous jusqu'au 30 septembre 2026)` : ''}\n\n${p.unit}. ${p.desc}\n\n${p.features.map((f) => `- ${f}`).join('\n')}`).join('\n\n')}

${pricingNote} Sans engagement, réponse sous 48h.
`);

  blocs.push(`## Questions fréquentes (${site.url}/faq)

${faq.map((g) => `### ${g.heading}\n\n${g.items.map((it) => `**${it.q}**\n\n${it.a.replace(/\n\n/g, '\n\n')}`).join('\n\n')}`).join('\n\n')}
`);

  blocs.push(`## Le coin conseils, les articles (${site.url}/blog)

Les conseils des articles sont d'ordre général et ne remplacent pas un avis médical.

${posts.map((p) => `### ${p.data.title}\n\n${site.url}/blog/${p.id} · ${p.data.category} · ${jour(p.data.date)} · par ${site.owner}, conseillère en hygiène de sommeil\n\n${p.data.chapo ? `${p.data.chapo}\n\n` : ''}${(p.body ?? '').trim().replace(/^## /gm, '#### ')}`).join('\n\n---\n\n')}
`);

  return new Response(blocs.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
