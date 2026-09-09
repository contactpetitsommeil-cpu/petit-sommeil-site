#!/usr/bin/env python3
"""Vérifie title (≤ 60), meta description (≤ 155) et nombre de h1 sur toutes les pages de dist/. Usage : python3 scripts/verif-metas.py"""
import re, glob, os, html
root = os.path.join(os.path.dirname(__file__), '..', 'dist')
rows = []
for p in sorted(glob.glob(os.path.join(root, '**', '*.html'), recursive=True)):
    s = open(p, encoding='utf-8').read()
    t = html.unescape(re.search(r'<title>(.*?)</title>', s, re.S).group(1)).strip()
    m = re.search(r'<meta name="description" content="([^"]*)"', s)
    d = html.unescape(m.group(1)) if m else ''
    h1 = len(re.findall(r'<h1[\s>]', s))
    route = '/' + os.path.relpath(p, root).replace('index.html', '').removesuffix('.html').rstrip('/')
    rows.append((route or '/', len(t), len(d), h1, t, d))
print('| Page | Title | Meta | h1 |')
print('|---|---|---|---|')
bad = 0
for r in rows:
    flag = lambda ok: '' if ok else ' ⚠'
    ok = r[1] <= 60 and r[2] <= 155 and r[3] == 1
    bad += not ok
    print(f'| `{r[0] or "/"}` | {r[1]}{flag(r[1]<=60)} | {r[2]}{flag(r[2]<=155)} | {r[3]}{flag(r[3]==1)} |')
print(f'\n{len(rows)} pages, {bad} hors gabarit')
