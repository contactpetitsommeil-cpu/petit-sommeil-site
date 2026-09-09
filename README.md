# Petit Sommeil — site

Site statique [Astro](https://astro.build) de Sarah H., conseillère en sommeil.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

- `src/styles/tokens.css` — seule source de couleurs / typos / rayons (design system Claude Design)
- `src/data/*.ts` — contenus éditables (nav, offres, FAQ, tranches d'âge)
- `src/content/blog/*.md` — articles
- `src/layouts/Base.astro` — `<head>` SEO, header, footer ; `title` et `description` obligatoires
- `archive/` — éléments retirés (splash screen), jamais importés

Placeholders à compléter : `[À COMPLÉTER]` dans les pages légales, images dans `public/images/`.
