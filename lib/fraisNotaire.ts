import {
  EMOLUMENTS_NOTAIRE,
  DMTO,
  TPF_NEUF,
  CSI,
  DEBOURS,
  TVA_EMOLUMENTS,
} from "@/data/baremes2026";

export type TypeBien = "ancien" | "neuf";
export type TauxDMTO = "standard" | "reduit";

export interface ResultatNotaire {
  prix: number;
  emolumentsHT: number;
  tvaEmoluments: number;
  droitsMutation: number;
  tauxDroits: number; // % appliqué
  csi: number;
  debours: number;
  total: number;
  pourcentage: number; // % du prix
}

/** Émoluments HT du notaire par le barème réglementé. */
export function calculerEmoluments(prix: number): number {
  let total = 0;
  let plancher = 0;
  for (const t of EMOLUMENTS_NOTAIRE) {
    const plafond = t.jusqu ?? Infinity;
    const assiette = Math.max(0, Math.min(prix, plafond) - plancher);
    total += (assiette * t.taux) / 100;
    plancher = plafond;
    if (prix <= plafond) break;
  }
  return total;
}

/** Calcul complet des frais d'acquisition ("frais de notaire"). */
export function calculerFraisNotaire(
  prix: number,
  type: TypeBien,
  dmto: TauxDMTO = "standard"
): ResultatNotaire {
  const emolumentsHT = calculerEmoluments(prix);
  const tvaEmoluments = (emolumentsHT * TVA_EMOLUMENTS) / 100;
  const tauxDroits = type === "neuf" ? TPF_NEUF : DMTO[dmto];
  const droitsMutation = (prix * tauxDroits) / 100;
  const csi = (prix * CSI) / 100;
  const debours = DEBOURS[type];
  const total = emolumentsHT + tvaEmoluments + droitsMutation + csi + debours;

  return {
    prix,
    emolumentsHT,
    tvaEmoluments,
    droitsMutation,
    tauxDroits,
    csi,
    debours,
    total,
    pourcentage: prix > 0 ? (total / prix) * 100 : 0,
  };
}
