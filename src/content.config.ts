import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Titre pour le <title> si le titre éditorial est trop long une fois suffixé. */
    seoTitle: z.string().optional(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    readingTime: z.string().optional(),
    featured: z.boolean().default(false),
    /** Chapô, affiché sous le titre. */
    chapo: z.string().optional(),
    /** Un brouillon ne se construit pas. */
    draft: z.boolean().default(false),
  }),
});
export const collections = { blog };
