# Commande atelier n°12, la fin des tarifs de lancement

> À coller dans Claude Code, ouvert à la racine `PROJETS/petit-sommeil`. Écrite le 30/09/2026 par le bureau. L'offre de lancement s'arrête ce soir : prix de lancement pour toute prise de rendez-vous **jusqu'au 30 septembre 2026 inclus** (décision du 29/08). À partir du 1er octobre, le site n'affiche plus que la grille normale.
>
> **Publication : pas avant le 1er octobre, 00 h 00.** Tout peut être préparé, construit et commité ce soir, mais `publier-site.sh` ne se lance qu'après minuit. Publier avant retirerait l'offre quelques heures trop tôt, alors que Sarah l'a promise jusqu'au 30 au soir.

## Pourquoi une commande alors que le code prévoyait la fin tout seul

Ce qui marche déjà : le script inline de `tarifs.astro` retire le bandeau et les prix de lancement dans le navigateur dès minuit. Un parent qui ouvre `/tarifs` demain voit donc les bons prix, sans rien republier.

Ce qui reste faux sur le site en ligne (vérifié le 30/09 sur `petitsommeil.fr`) :

1. **La meta description et l'Open Graph de `/tarifs`**, écrites en dur : « Consultation dès 65 €, offre de lancement jusqu'au 30 septembre 2026… ». C'est ce que Google et les aperçus de lien montreront pendant des semaines.
2. **`/llms.txt` et `/llms-full.txt`** : générés au build du 10/09, ils affichent encore « 40 € jusqu'au 30/09/2026 » et les trois autres prix de lancement. Les assistants IA les citeraient.
3. **Le HTML de `/tarifs`** contient toujours le bandeau et les prix de lancement : ils restent visibles sans JavaScript, dans le code lu par les robots, et peuvent clignoter une fraction de seconde avant que le script les retire.

## Le prompt à coller

Tout premier geste : si `.git/index.lock` existe, supprime-le. C'est un fichier vide laissé par le bureau le 30/09 vers 17 h 13 en lisant `git status` depuis le pont Cowork (même incident que le 03/09) ; aucune opération git n'était en cours. Puis applique la règle du miroir de `CLAUDE.md` : `git status`, commit `bureau:` de ce que le bureau a déposé (cette commande, `docs/decisions.md`, `BACKLOG.md`). Deux fichiers modifiés traînent depuis avant le 17/09, `CLAUDE.md` et `README.md` (une ligne chacun, la commande `/audit-seo-geo`) : s'ils sont toujours justes, commite-les à part, sinon signale-le. Lis la ligne du 30/09 en tête de `docs/decisions.md`.

### 1. Retirer l'offre de lancement du code, pour de bon

On ne garde pas de mécanique en sommeil : l'historique git la conserve si Sarah refait une promotion un jour.

- `site/src/data/pricing.ts` : supprime `priceLaunch` des quatre formules et de l'interface `Plan`, supprime `LAUNCH_END_ISO`, `launchIsLive()` et leur commentaire. Les prix normaux ne bougent pas : 65 €, 40 €, 180 €, 280 €.
- `site/src/pages/tarifs.astro` : supprime l'import de `LAUNCH_END_ISO` et `launchIsLive`, la constante `showLaunch`, le bloc `<aside class="launch">`, le script inline de fin de page et les styles `.launch*`, `.price-launch`, `.price-old` (y compris `.featured .price-old`). Chaque carte affiche un seul prix, dans le style du prix courant. Vérifie que la carte mise en avant (accompagnement 15 jours, fond marine) garde un contraste AA sur son prix.
- `site/src/pages/llms.txt.ts` et `site/src/pages/llms-full.txt.ts` : retire les conditions `launchIsLive()` et toute mention de lancement. Les tarifs s'y lisent seuls : « Consultation unique 65 € · Consultation de suivi 40 € · Accompagnement 15 jours 180 € · Accompagnement 1 mois 280 € ».
- Nouvelle meta description de `/tarifs`, mot pour mot, même typographie que le reste du site (espace fine insécable avant « € ») :

  « Consultation dès 65 €, accompagnement 15 jours à 180 €. Contact quotidien durant l'accompagnement, en visio ou à domicile près de Saint-Malo. »

  141 caractères. Le `<title>` ne change pas. L'Open Graph suit.

### 2. Ne pas toucher

- `site/src/pages/index.astro`, `priceRange: '40 € à 280 €'` : juste, le 40 € est le prix normal de la consultation de suivi.
- Le JSON-LD des offres de `/tarifs` : il donne déjà les prix normaux.
- Aucune mention du salon de la parentalité du 31/10 : les prix de lancement y valent pour les rendez-vous pris sur place, ce n'est pas une offre du site (décision du 29/08).
- Aucun texte d'article, de FAQ ou de CGV : aucun ne parle du lancement.

### 3. Vérifications

En natif sur le Mac (pas depuis le pont Cowork, qui casserait `node_modules`) :

- `npm run build` depuis `site/`, même nombre de pages qu'au dernier build.
- `python3 scripts/verif-metas.py` : `/tarifs` à 141, aucune page hors gabarit.
- `grep -ri -E "lancement|30 septembre|30/09/2026|LAUNCH|price-old|data-launch" dist/` : plus rien, hors éventuels commentaires sans rapport (le « audit de lancement » du `robots.txt` et du blog peut rester, signale-le).
- `grep -E "40 €|25 €|155 €|225 €" dist/tarifs/index.html` : seul le 40 € de la consultation de suivi doit sortir.
- Lighthouse mobile sur `/tarifs` : accessibilité et SEO à 100.
- Captures de `/tarifs` en 390 et 1280 dans `livrables/captures-2026-10-01/`.

### 4. Publication, après minuit seulement

Si l'horloge du Mac affiche le 30/09, arrête-toi après les vérifications et dis à Florent : « prêt, à publier après minuit ». Le 1er octobre ou après : `.claude/scripts/publier-site.sh`, puis contrôle en ligne que `https://petitsommeil.fr/tarifs` (code source, pas seulement l'affichage), `/llms.txt` et `/llms-full.txt` ne contiennent plus aucun prix de lancement.

### 5. Clôture

Rapport court `livrables/rapport-atelier-12.md` : ce qui a été retiré, sortie de `verif-metas.py` et des deux `grep`, Lighthouse, captures, heure de publication. Ligne `[atelier]` en tête de `docs/decisions.md` avec la plage de commits, case cochée dans `BACKLOG.md` sous « Commande 12 ».

## Après publication, pour Florent (pas l'atelier)

Dans la Search Console du site : « Inspection de l'URL », coller `https://petitsommeil.fr/tarifs`, puis « Demander une indexation ». Google mettra à jour la description plus vite qu'en attendant son prochain passage.
