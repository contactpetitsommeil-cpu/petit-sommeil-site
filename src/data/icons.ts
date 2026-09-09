/** Icônes trait fin (24x24, stroke currentColor). Usage : <Fragment set:html={icons.moon} /> */
const wrap = (inner: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const icons = {
  moon: wrap('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'),
  moonStar: wrap('<path d="M18 15.5A7 7 0 0 1 8.5 6a7 7 0 1 0 9.5 9.5z"/><path d="M18 3v4M16 5h4"/>'),
  moonHeart: wrap('<path d="M18 15.5A7 7 0 0 1 8.5 6a7 7 0 1 0 9.5 9.5z"/><path d="M18.5 3.2c.8-.9 2.4-.6 2.6.7.2 1.2-1.5 2.4-2.6 3.3-1.1-.9-2.8-2.1-2.6-3.3.2-1.3 1.8-1.6 2.6-.7z"/>'),
  book: wrap('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5V5.5M20 18v3H6.5"/>'),
  video: wrap('<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10 5-3v10l-5-3z"/>'),
  calendar: wrap('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  mail: wrap('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  instagram: wrap('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>'),
  arrowRight: wrap('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  check: wrap('<path d="M5 12.5 10 17 19 7"/>'),
  heart: wrap('<path d="M12 20.5 4.6 13.2A4.5 4.5 0 0 1 11 6.8l1 1 1-1a4.5 4.5 0 0 1 6.4 6.4z"/>'),
  leaf: wrap('<path d="M5 19C5 9 12 4 20 4c0 8-5 15-15 15z"/><path d="M5 19c3-5 6-8 10-10"/>'),
  shield: wrap('<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/>'),
  sparkle: wrap('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8"/>'),
};
export type IconName = keyof typeof icons;
