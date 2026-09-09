/**
 * Retouche des photos du site (commande 9, 08/09/2026). Node + sharp, aucune dépendance nouvelle.
 *
 *   node scripts/photos/retouche.mjs            toutes les photos
 *   node scripts/photos/retouche.mjs 03-et-toi  une seule
 *
 * Pour chaque photo : lecture (HEIC converti par `sips`), `.rotate()` (orientation EXIF appliquée puis
 * retirée), jamais de `.withMetadata()` (toutes les métadonnées partent, GPS et date compris : c'est le
 * point non négociable), agrandissement ×2 pour les images générées, puis preset et overrides dans
 * l'ordre recomb → modulate → linear (contraste) → linear (noirs relevés), sortie sRGB, recadrage par
 * emplacement, JPEG qualité 90 mozjpeg. Masters dans site/src/assets/photos/, Astro fabrique AVIF et WebP.
 * Idempotent : on relance, il écrase. Vérification finale des métadonnées sur chaque sortie.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { preset, photos, SRC_DIR, OUT_DIR, PLANCHE_DIR } from './photos.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const srcDir = path.join(ROOT, SRC_DIR);
const outDir = path.join(ROOT, OUT_DIR);
const plancheDir = path.join(ROOT, PLANCHE_DIR);
const EXT = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG', '.heic', '.HEIC'];
const only = process.argv.slice(2);

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(plancheDir, { recursive: true });

/* ---------- Sources ---------- */
function findSource(name) {
  for (const e of EXT) {
    const p = path.join(srcDir, name + e);
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`Source introuvable pour « ${name} » dans ${SRC_DIR} (extensions ${EXT.join(' ')})`);
}

/** HEIC : sharp ne le lit pas sans libheif ; sips (macOS) le convertit en JPEG qualité 100 dans un dossier temporaire. */
function readable(file) {
  if (!/\.heic$/i.test(file)) return file;
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'ps-photo-')), path.basename(file, path.extname(file)) + '.jpg');
  execFileSync('sips', ['-s', 'format', 'jpeg', '--setProperty', 'formatOptions', '100', file, '--out', tmp], { stdio: 'ignore' });
  return tmp;
}

/* ---------- Agrandissement ×2 des images générées ---------- */
/* Real-ESRGAN n'est utilisé que sur demande explicite (PS_ESRGAN=1 npm run photos) : le 08/09, le binaire Intel
   (realesrgan-ncnn-vulkan 20220424) a produit des tuiles mélangées sous Rosetta sur Apple Silicon, quels que soient
   -t, -j ou -g. Upscayl (arm64) validé le soir même : voir hasUpscayl ci-dessous. */
const esrganWhich = spawnSync('which', ['realesrgan-ncnn-vulkan'], { encoding: 'utf8' });
const hasRealesrgan = process.env.PS_ESRGAN === '1' && esrganWhich.status === 0;
/* Les modèles (`models/`) sont cherchés à côté du vrai binaire, même s'il est appelé par un lien symbolique. */
const esrganModels = hasRealesrgan ? path.join(path.dirname(fs.realpathSync(esrganWhich.stdout.trim())), 'models') : null;
/* Upscayl (application libre, `brew install --cask upscayl`) embarque le même moteur compilé pour Apple Silicon :
   validé le 08/09 sur la photo 03 (tuiles propres, modèle `upscayl-standard-4x`). C'est lui qui sert par défaut s'il est là. */
const UPSCAYL = '/Applications/Upscayl.app/Contents/Resources';
const hasUpscayl = process.env.PS_UPSCAYL !== '0' && fs.existsSync(path.join(UPSCAYL, 'bin', 'upscayl-bin'));
let upscaleMethod = hasRealesrgan ? 'Real-ESRGAN (realesrgan-x4plus, -s 2)'
  : hasUpscayl ? 'Upscayl (upscayl-standard-4x, -s 2, moteur Apple Silicon)'
  : 'lanczos3 de sharp (ni Upscayl ni Real-ESRGAN)';

/** Retourne un buffer raw {data, info} de l'image tournée, agrandie si demandé. */
async function loadBase(file, factor, sharpen = 0.6) {
  const rotated = sharp(file, { limitInputPixels: false }).rotate();
  if (!factor) return rotated.raw().toBuffer({ resolveWithObject: true });
  if (hasRealesrgan || hasUpscayl) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ps-esrgan-'));
    const inp = path.join(dir, 'in.png');
    const out = path.join(dir, 'out.png');
    await rotated.png().toFile(inp);
    if (hasRealesrgan) execFileSync('realesrgan-ncnn-vulkan', ['-i', inp, '-o', out, '-n', 'realesrgan-x4plus', '-s', String(factor), '-m', esrganModels], { stdio: 'ignore' });
    else execFileSync(path.join(UPSCAYL, 'bin', 'upscayl-bin'), ['-i', inp, '-o', out, '-n', 'upscayl-standard-4x', '-z', '4', '-s', String(factor), '-m', path.join(UPSCAYL, 'models')], { stdio: 'ignore' });
    return sharp(out, { limitInputPixels: false }).raw().toBuffer({ resolveWithObject: true });
  }
  const meta = await sharp(file).metadata();
  const w = (meta.orientation >= 5 ? meta.height : meta.width) * factor;
  return rotated.resize({ width: w, kernel: sharp.kernel.lanczos3 }).sharpen({ sigma: sharpen }).raw().toBuffer({ resolveWithObject: true });
}

const fromRaw = ({ data, info }) => sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels }, limitInputPixels: false });

/* ---------- Le preset, dans l'ordre, sur un buffer raw ---------- */
async function grade(raw, p) {
  let cur = raw;
  if (p.warm) cur = await fromRaw(cur).recomb(p.warm).raw().toBuffer({ resolveWithObject: true });
  if (p.brightness !== undefined || p.saturation !== undefined)
    cur = await fromRaw(cur).modulate({ brightness: p.brightness ?? 1, saturation: p.saturation ?? 1 }).raw().toBuffer({ resolveWithObject: true });
  if (p.contrast) cur = await fromRaw(cur).linear(p.contrast.a, p.contrast.b).raw().toBuffer({ resolveWithObject: true });
  if (p.lift) cur = await fromRaw(cur).linear(p.lift.a, p.lift.b).raw().toBuffer({ resolveWithObject: true });
  return cur;
}

/* ---------- Recadrage ---------- */
const parseRatio = (r) => { const [a, b] = r.split(':').map(Number); return a / b; };

/** Rectangle du cadrage dans l'image de base, à partir d'une `region`, d'un `focus` en fraction, ou de l'attention. */
function cropRect(base, crop, photoFocus) {
  const { width: W, height: H } = base.info;
  const r = parseRatio(crop.ratio);
  let cw = Math.min(W, Math.round(H * r));
  let ch = Math.round(cw / r);
  if (ch > H) { ch = H; cw = Math.round(H * r); }
  if (crop.region) {
    cw = Math.round(W * crop.region.width);
    ch = Math.round(cw / r);
    const left = Math.round(W * crop.region.left), top = Math.round(H * crop.region.top);
    if (left + cw > W || top + ch > H) throw new Error(`region hors image (${crop.ratio}, ${JSON.stringify(crop.region)})`);
    return { left, top, width: cw, height: ch, how: `région ${JSON.stringify(crop.region)}` };
  }
  const focus = crop.focus ?? (photoFocus && photoFocus !== 'attention' ? photoFocus : null);
  if (focus) {
    return { left: Math.round((W - cw) * focus.left), top: Math.round((H - ch) * focus.top), width: cw, height: ch, how: `point ${focus.left}, ${focus.top}` };
  }
  return null; // attention
}

async function writeCrop(graded, crop, outFile, portrait, photoFocus) {
  const rect = cropRect(graded, crop, photoFocus);
  const r = parseRatio(crop.ratio);
  const width = crop.width, height = Math.round(crop.width / r);
  let pipe = fromRaw(graded);
  if (rect) pipe = pipe.extract({ left: rect.left, top: rect.top, width: rect.width, height: rect.height }).resize({ width, height, fit: 'cover' });
  else pipe = pipe.resize({ width, height, fit: 'cover', position: sharp.strategy.attention });
  const info = await pipe.toColourspace('srgb')
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: portrait ? '4:4:4' : '4:2:0' })
    .toFile(outFile);
  return { ...info, how: rect ? rect.how : 'attention' };
}

/* ---------- Vérification des métadonnées ---------- */
async function checkMetadata(file) {
  const m = await sharp(file).metadata();
  const problems = [];
  if (m.exif) problems.push(`exif (${m.exif.length} o)`);
  if (m.xmp) problems.push('xmp');
  if (m.iptc) problems.push('iptc');
  if (m.icc) {
    const desc = m.icc.toString('latin1');
    if (!/sRGB/i.test(desc)) problems.push('icc non sRGB');
  }
  if (m.orientation && m.orientation !== 1) problems.push(`orientation ${m.orientation}`);
  return { file: path.basename(file), width: m.width, height: m.height, space: m.space, icc: m.icc ? 'sRGB' : 'aucun', ok: problems.length === 0, problems };
}

/* ---------- Boucle ---------- */
const results = [];
const targets = photos.filter((p) => only.length === 0 || only.includes(p.id));
if (targets.length === 0) { console.error(`Aucune photo ne correspond à ${only.join(', ')}`); process.exit(1); }

for (const photo of targets) {
  const srcName = photos.find((p) => p.id === photo.src && p.id !== photo.id)?.src ?? photo.src;
  const srcFile = findSource(srcName);
  const file = readable(srcFile);
  const t0 = Date.now();
  console.log(`\n${photo.id}  ←  ${path.relative(ROOT, srcFile)}`);

  const base = await loadBase(file, photo.upscale, photo.sharpen);
  if (photo.upscale) console.log(`  agrandissement ×${photo.upscale} : ${upscaleMethod} → ${base.info.width} × ${base.info.height}`);
  else console.log(`  base ${base.info.width} × ${base.info.height}`);

  const p = { ...preset, ...(photo.overrides ?? {}) };
  const ovKeys = Object.keys(photo.overrides ?? {});
  if (ovKeys.length) console.log(`  overrides : ${ovKeys.join(', ')}`);
  const graded = await grade(base, p);

  // master non recadré, 2400 max (pas pour un cadrage dérivé d'une autre photo : 08 reprend le master de 02)
  const derived = photos.some((p) => p.id === photo.src && p.id !== photo.id);
  if (!derived) {
    const fullFile = path.join(outDir, `${photo.id}-full.jpg`);
    const fullW = Math.min(2400, graded.info.width);
    const full = await fromRaw(graded).resize({ width: fullW }).toColourspace('srgb')
      .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: photo.portrait ? '4:4:4' : '4:2:0' }).toFile(fullFile);
    results.push({ id: photo.id, crop: 'full', file: fullFile, width: full.width, height: full.height, size: full.size });
    console.log(`  full     ${full.width} × ${full.height}  ${(full.size / 1024).toFixed(0)} Ko`);
  }

  for (const [name, crop] of Object.entries({ ...photo.crops, ...(photo.variants ?? {}) })) {
    const isVariant = !(name in photo.crops);
    const outFile = path.join(outDir, `${photo.id}-${name}.jpg`);
    const info = await writeCrop(graded, crop, outFile, photo.portrait, photo.focus ?? 'attention');
    results.push({ id: photo.id, crop: name, file: outFile, width: info.width, height: info.height, size: info.size, variant: isVariant });
    console.log(`  ${name.padEnd(8)} ${info.width} × ${info.height}  ${(info.size / 1024).toFixed(0)} Ko  ${crop.ratio}  cadrage : ${info.how}${isVariant ? '  (variante, planche seulement)' : ''}`);
  }

  // « avant » réduit pour la planche contact (sans métadonnées lui aussi), et un détail 100 % avant/après pour les images agrandies
  await sharp(file, { limitInputPixels: false }).rotate().resize({ width: 1000 }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(plancheDir, `avant-${photo.id}.jpg`));
  if (photo.upscale) {
    const orig = await sharp(file).rotate().raw().toBuffer({ resolveWithObject: true });
    const cw = 360, ch = 270;
    const ol = Math.round((orig.info.width - cw) / 2), ot = Math.round((orig.info.height - ch) / 2);
    await fromRaw(orig).extract({ left: ol, top: ot, width: cw, height: ch }).jpeg({ quality: 92 }).toFile(path.join(plancheDir, `detail-orig-${photo.id}.jpg`));
    await fromRaw(base).extract({ left: ol * photo.upscale, top: ot * photo.upscale, width: cw * photo.upscale, height: ch * photo.upscale }).jpeg({ quality: 92 }).toFile(path.join(plancheDir, `detail-x2-${photo.id}.jpg`));
  }
  console.log(`  ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}

/* ---------- Vérification finale ---------- */
console.log('\nVérification des métadonnées (exif, xmp, iptc, icc non sRGB, orientation) :');
let failed = 0;
for (const r of results) {
  const c = await checkMetadata(r.file);
  console.log(`  ${c.ok ? 'OK ' : 'KO '} ${c.file.padEnd(30)} ${String(c.width).padStart(4)} × ${String(c.height).padEnd(4)} ${c.space}  icc : ${c.icc}${c.ok ? '' : '  → ' + c.problems.join(', ')}`);
  if (!c.ok) failed++;
}
for (const f of fs.readdirSync(plancheDir)) {
  const c = await checkMetadata(path.join(plancheDir, f));
  if (!c.ok) { console.log(`  KO  planche/${f} → ${c.problems.join(', ')}`); failed++; }
}
// Manifeste : fusionné avec l'existant quand on ne traite qu'une partie des photos (les autres gardent leurs entrées).
const manifestFile = path.join(outDir, 'manifest.json');
const doneIds = new Set(targets.map((p) => p.id));
const previous = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')).results.filter((r) => !doneIds.has(r.id)) : [];
const merged = [...previous, ...results.map((r) => ({ ...r, file: path.relative(ROOT, r.file) }))].sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(manifestFile, JSON.stringify({ generated: new Date().toISOString(), upscale: upscaleMethod, preset, results: merged }, null, 2));
if (failed) { console.error(`\n${failed} fichier(s) portent encore des métadonnées : échec.`); process.exit(1); }
console.log(`\n${results.length} fichiers, aucune métadonnée. Agrandissement : ${upscaleMethod}.`);
