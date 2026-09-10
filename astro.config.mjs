import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://petitsommeil.fr',
  trailingSlash: 'never',
  // CSS inliné dans chaque page : plus de feuille de style bloquante au premier rendu (Lighthouse mobile).
  build: { format: 'file', inlineStylesheets: 'always' },
  // Hors sitemap : pages de confirmation et 404 (noindex), et les fichiers llms.txt / llms-full.txt (pas des pages).
  integrations: [sitemap({ filter: (page) => !page.includes('-merci') && !page.includes('404') && !page.includes('llms') })],
});
