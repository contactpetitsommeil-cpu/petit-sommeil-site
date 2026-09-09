#!/bin/sh
# Aperçu de la feuille du planning sur le site : la première page du vrai PDF 0-2 ans, en WebP.
# À relancer depuis la racine du dépôt quand le bureau régénère le PDF (build.py).
#   sh site/scripts/apercu-planning.sh
set -e
SRC=livrables/planning-de-sommeil/planning-0-2-ans.pdf
TMP=$(mktemp -d)
pdftoppm -png -r 200 -f 1 -l 1 -scale-to-x 1400 -scale-to-y -1 "$SRC" "$TMP/apercu"
cwebp -quiet -q 82 "$TMP/apercu-1.png" -o site/public/images/planning-apercu.webp
rm -rf "$TMP"
ls -la site/public/images/planning-apercu.webp
