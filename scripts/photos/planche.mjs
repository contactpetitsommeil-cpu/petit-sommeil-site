/**
 * Planche contact des photos (commande 9) : livrables/photos/planche-contact.html, page autonome à ouvrir
 * en double-clic depuis le Finder. Lit manifest.json (écrit par retouche.mjs) et photos.config.mjs.
 *   node scripts/photos/planche.mjs   (ou npm run planche)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preset, photos, OUT_DIR, PLANCHE_DIR } from './photos.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, OUT_DIR, 'manifest.json'), 'utf8'));
const OUT = path.join(ROOT, 'livrables/photos/planche-contact.html');
const rel = (p) => path.relative(path.dirname(OUT), path.join(ROOT, p)).split(path.sep).join('/');
const ko = (n) => `${(n / 1024).toFixed(0)} Ko`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const usages = {
  '01-hero': 'Accueil, hero (colonne droite, au-dessus du titre sur téléphone)',
  '02-portrait': 'À propos, en tête, à la place du « S »',
  '03-et-toi': 'Accueil et À propos, section « Et toi, dans tout ça ? »',
  '04-detail': 'Accueil, respiration entre le parcours et le planning',
  '05-accompagnements': 'Accompagnements, en-tête sous le PageHero',
  '06-enfant': 'Accompagnements, en regard de la tranche 3-6 ans',
  '07-planning': 'Planning de sommeil, à côté de l’aperçu de la feuille',
  '08-contact': 'Contact, rond de 120 px dans l’encart marine',
};

const fmtPreset = (p) => [
  `luminosité ${p.brightness}`, `saturation ${p.saturation}`,
  `contraste ${p.contrast.a} / ${p.contrast.b}`, `noirs ${p.lift.a} / ${p.lift.b}`,
  `température R ${p.warm[0][0]} · V ${p.warm[1][1]} · B ${p.warm[2][2]}`,
].join(' · ');

let rows = '';
for (const photo of photos) {
  const outs = manifest.results.filter((r) => r.id === photo.id);
  const ov = Object.keys(photo.overrides ?? {});
  const full = outs.find((r) => r.crop === 'full');
  const cells = outs.filter((r) => r.crop !== 'full').map((r) => {
    const crop = photo.crops[r.crop] ?? photo.variants?.[r.crop];
    return `
      <figure class="${r.variant ? 'variant' : ''}">
        <img src="${rel(r.file)}" alt="" width="${r.width}" height="${r.height}">
        <figcaption>
          <b>${esc(r.crop)}${r.variant ? ' (variante, planche seulement)' : ''}</b>
          ${r.width} × ${r.height} · ${crop.ratio} · ${ko(r.size)}
          ${crop.region ? `<br>région ${esc(JSON.stringify(crop.region))}` : crop.focus ? `<br>point ${crop.focus.left}, ${crop.focus.top}` : '<br>attention'}
        </figcaption>
      </figure>`;
  }).join('');
  const detail = photo.upscale ? `
      <div class="detail">
        <p class="k">Agrandissement ×${photo.upscale}, détail à 100 % (360 × 270 px de l’original)</p>
        <div class="detail-pair">
          <figure><img src="planche/detail-orig-${photo.id}.jpg" alt="" width="360" height="270"><figcaption>original, pixels d’origine</figcaption></figure>
          <figure><img src="planche/detail-x2-${photo.id}.jpg" alt="" width="720" height="540" style="width:360px"><figcaption>agrandi ×${photo.upscale}, affiché à la même taille</figcaption></figure>
          <figure><img src="planche/detail-x2-${photo.id}.jpg" alt="" width="720" height="540"><figcaption>agrandi ×${photo.upscale}, pixels réels</figcaption></figure>
        </div>
      </div>` : '';
  rows += `
  <section class="row" id="${photo.id}">
    <header>
      <h2>${esc(photo.id)}</h2>
      <p class="use">${esc(usages[photo.id] ?? '')}</p>
      <p class="meta">source <code>${esc(photo.src)}</code>${photo.src !== photo.id ? ' (dérivé)' : ''}${photo.upscale ? ` · agrandi ×${photo.upscale} avant retouche` : ''}${photo.portrait ? ' · JPEG 4:4:4' : ' · JPEG 4:2:0'}${full ? ` · master <code>${esc(path.basename(full.file))}</code> ${full.width} × ${full.height}, ${ko(full.size)}` : ''}</p>
      <p class="meta">${ov.length ? `<strong>Overrides</strong> : ${esc(ov.map((k) => `${k} = ${JSON.stringify(photo.overrides[k])}`).join(' · '))}` : 'Aucun override : preset commun'}</p>
    </header>
    <div class="strip">
      <figure class="before">
        <img src="planche/avant-${photo.id}.jpg" alt="">
        <figcaption><b>avant</b> fichier source réduit, sans retouche</figcaption>
      </figure>
      ${cells}
    </div>
    ${detail}
  </section>`;
}

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Planche contact, photos Petit Sommeil</title>
<style>
  :root { --bg: #F8F3EA; --card: #FCF9F3; --border: #EBE0CE; --ink: #4A463E; --strong: #0B1A4A; --muted: #6F6960; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 15px/1.5 'Mulish', system-ui, -apple-system, 'Segoe UI', sans-serif; padding: 32px 40px 80px; }
  h1 { font-family: 'Playfair Display', 'Iowan Old Style', Georgia, serif; color: var(--strong); font-size: 32px; margin: 0 0 6px; }
  h2 { font-family: 'Playfair Display', 'Iowan Old Style', Georgia, serif; color: var(--strong); font-size: 22px; margin: 0 0 2px; }
  .lead { max-width: 80ch; margin: 0 0 8px; }
  .preset { font-size: 13px; color: var(--muted); margin: 0 0 32px; }
  code { font-size: 13px; background: var(--card); border: 1px solid var(--border); border-radius: 4px; padding: 0 5px; }
  .row { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 22px 24px 18px; margin-bottom: 22px; }
  .use { margin: 0 0 4px; font-weight: 700; color: var(--strong); }
  .meta { margin: 0; font-size: 13px; color: var(--muted); }
  .strip { display: flex; gap: 18px; overflow-x: auto; padding: 16px 0 6px; align-items: flex-start; }
  figure { margin: 0; flex: 0 0 auto; }
  figure img { display: block; height: 260px; width: auto; max-width: 620px; object-fit: contain; border-radius: 10px; background: var(--border); }
  figcaption { font-size: 12.5px; color: var(--muted); margin-top: 8px; line-height: 1.4; max-width: 340px; }
  figcaption b { display: block; color: var(--ink); font-weight: 700; }
  .before img { outline: 2px dashed var(--border); outline-offset: 3px; }
  .variant img { opacity: 0.85; outline: 2px dotted #C7A36A; outline-offset: 3px; }
  .detail { border-top: 1px solid var(--border); margin-top: 10px; padding-top: 12px; }
  .k { margin: 0 0 8px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink); }
  .detail-pair { display: flex; gap: 18px; flex-wrap: wrap; align-items: flex-start; }
  .detail-pair img { height: auto; border-radius: 6px; }
  .toc { font-size: 13px; margin: 0 0 24px; color: var(--muted); }
  .toc a { color: var(--strong); }
</style>
</head>
<body>
  <h1>Planche contact, photos du site</h1>
  <p class="lead">Générée le ${new Date(manifest.generated).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })} par <code>site/scripts/photos/planche.mjs</code>, à partir des masters de <code>site/src/assets/photos/</code> (JPEG qualité 90, sans aucune métadonnée). À gauche le fichier reçu, réduit et sans retouche ; à droite les cadrages retouchés qui partent dans le site. Les cadrages en pointillé or sont des variantes pour trancher, non utilisées par le site.</p>
  <p class="preset"><strong>Preset commun</strong> : ${esc(fmtPreset(preset))}. <strong>Agrandissement des images générées</strong> : ${esc(manifest.upscale)}.</p>
  <p class="toc">${photos.map((p) => `<a href="#${p.id}">${p.id}</a>`).join(' · ')}</p>
  ${rows}
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log(`${path.relative(ROOT, OUT)} écrit, ${photos.length} emplacements, ${manifest.results.length} sorties`);
