/**
 * Âge en mois révolus à partir d'une date ISO (champ `birthDate` du questionnaire).
 * Un seul calcul pour les deux îlots : le questionnaire (pré-sélection de la tranche)
 * et la page de remerciement (choix du planning 0-2 ou 2-6 ans). Commande 13, 07/10/2026.
 */
export function monthsFromDate(iso: string): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  if (now.getDate() < d.getDate()) months -= 1;
  return months;
}
