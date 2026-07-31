import { AUTO_ENTREPRENEUR, ACRE_REDUCTION, type ActiviteAE } from "@/data/baremes2026";

export interface ResultatAE {
  caAnnuel: number;
  cotisations: number;
  tauxCotisations: number;
  cfp: number;
  impotVL: number; // 0 si pas de versement libératoire
  beneficeImposable: number; // si imposition au barème (après abattement)
  abattement: number;
  netAvantImpot: number;   // CA - cotisations - CFP
  netApresVL: number;      // si VL activé
  netMensuel: number;      // net avant impôt / 12
  depassementPlafond: boolean;
  depassementTVA: boolean;
  depassementTVAMajore: boolean;
  progressionPlafond: number; // % du plafond CA
  progressionTVA: number;     // % du seuil TVA
}

export function calculerAE(
  caAnnuel: number,
  activite: ActiviteAE,
  acre: boolean,
  versementLiberatoire: boolean
): ResultatAE {
  const cfg = AUTO_ENTREPRENEUR[activite];
  const tauxCotisations = acre ? cfg.cotisations * (1 - ACRE_REDUCTION) : cfg.cotisations;

  const cotisations = (caAnnuel * tauxCotisations) / 100;
  const cfp = (caAnnuel * cfg.cfp) / 100;
  const impotVL = versementLiberatoire ? (caAnnuel * cfg.versementLiberatoire) / 100 : 0;

  const abattementMontant = Math.max((caAnnuel * cfg.abattement) / 100, Math.min(305, caAnnuel));
  const beneficeImposable = Math.max(0, caAnnuel - abattementMontant);

  const netAvantImpot = caAnnuel - cotisations - cfp;
  const netApresVL = netAvantImpot - impotVL;

  return {
    caAnnuel,
    cotisations,
    tauxCotisations,
    cfp,
    impotVL,
    beneficeImposable,
    abattement: cfg.abattement,
    netAvantImpot,
    netApresVL,
    netMensuel: netAvantImpot / 12,
    depassementPlafond: caAnnuel > cfg.plafondCA,
    depassementTVA: caAnnuel > cfg.seuilTVA,
    depassementTVAMajore: caAnnuel > cfg.seuilTVAMajore,
    progressionPlafond: Math.min(100, (caAnnuel / cfg.plafondCA) * 100),
    progressionTVA: Math.min(100, (caAnnuel / cfg.seuilTVA) * 100),
  };
}
