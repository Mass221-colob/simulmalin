import { PLUS_VALUE } from "@/data/baremes2026";

export interface ResultatPlusValue {
  prixAcquisitionCorrige: number;
  prixCessionCorrige: number;
  plusValueBrute: number;
  abattementIR: number;        // %
  abattementPS: number;        // %
  baseIR: number;
  basePS: number;
  impotIR: number;
  impotPS: number;
  surtaxe: number;
  impotTotal: number;
  netVendeur: number;
  exonereIR: boolean;
  exonerePS: boolean;
}

/** Abattement IR selon les années de détention. */
export function abattementIR(annees: number): number {
  if (annees < 6) return 0;
  if (annees >= 22) return 100;
  if (annees === 21) return Math.min(100, 6 * 16); // 6 %/an de la 6e à la 21e = 96 %
  return Math.min(100, (annees - 5) * 6);
}

/** Abattement prélèvements sociaux selon les années de détention. */
export function abattementPS(annees: number): number {
  if (annees < 6) return 0;
  if (annees >= 30) return 100;
  let a = 0;
  const de6a21 = Math.min(Math.max(annees - 5, 0), 16);
  a += de6a21 * 1.65;
  if (annees >= 22) a += 1.6;
  if (annees > 22) a += Math.min(annees - 22, 8) * 9;
  return Math.min(100, a);
}

/** Surtaxe progressive sur les plus-values imposables élevées (barème simplifié). */
function calculerSurtaxe(base: number): number {
  if (base <= PLUS_VALUE.seuilSurtaxe) return 0;
  const tranches: [number, number][] = [
    [60000, 2], [100000, 3], [150000, 4], [200000, 5], [250000, 6], [Infinity, 6],
  ];
  for (const [plafond, taux] of tranches) {
    if (base <= plafond) return (base * taux) / 100;
  }
  return (base * 6) / 100;
}

export function calculerPlusValue(
  prixAchat: number,
  fraisAcquisition: number,
  travaux: number,
  prixVente: number,
  fraisVente: number,
  anneesDetention: number,
  residencePrincipale: boolean,
  forfaitTravaux: boolean
): ResultatPlusValue {
  // Prix d'acquisition majoré
  const travauxRetenus =
    forfaitTravaux && anneesDetention > 5
      ? (prixAchat * PLUS_VALUE.forfaitTravaux) / 100
      : travaux;
  const prixAcquisitionCorrige = prixAchat + fraisAcquisition + travauxRetenus;
  const prixCessionCorrige = prixVente - fraisVente;

  const plusValueBrute = Math.max(0, prixCessionCorrige - prixAcquisitionCorrige);

  if (residencePrincipale) {
    return {
      prixAcquisitionCorrige, prixCessionCorrige, plusValueBrute,
      abattementIR: 100, abattementPS: 100,
      baseIR: 0, basePS: 0, impotIR: 0, impotPS: 0, surtaxe: 0, impotTotal: 0,
      netVendeur: prixCessionCorrige, exonereIR: true, exonerePS: true,
    };
  }

  const abIR = abattementIR(anneesDetention);
  const abPS = abattementPS(anneesDetention);
  const baseIR = plusValueBrute * (1 - abIR / 100);
  const basePS = plusValueBrute * (1 - abPS / 100);

  const impotIR = (baseIR * PLUS_VALUE.tauxIR) / 100;
  const impotPS = (basePS * PLUS_VALUE.tauxPS) / 100;
  const surtaxe = calculerSurtaxe(baseIR);
  const impotTotal = impotIR + impotPS + surtaxe;

  return {
    prixAcquisitionCorrige, prixCessionCorrige, plusValueBrute,
    abattementIR: abIR, abattementPS: abPS,
    baseIR, basePS, impotIR, impotPS, surtaxe, impotTotal,
    netVendeur: prixCessionCorrige - impotTotal,
    exonereIR: abIR >= 100, exonerePS: abPS >= 100,
  };
}
