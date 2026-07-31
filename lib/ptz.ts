import { PTZ, type ZonePTZ } from "@/data/baremes2026";

export interface ResultatPTZ {
  eligible: boolean;
  plafondRevenu: number;
  revenuRetenu: number;
  tranche: number;              // 1 à 4
  quotite: number;              // %
  coutRetenu: number;
  montantPTZ: number;
  raisonRefus?: string;
}

export function calculerPTZ(
  revenuFiscalReference: number,
  personnesFoyer: number,
  zone: ZonePTZ,
  coutOperation: number,
  primoAccedant: boolean
): ResultatPTZ {
  const idxPers = Math.min(personnesFoyer, 8) - 1;
  const plafondRevenu = PTZ.plafondsRevenus[zone][idxPers];
  const plafondOperation =
    PTZ.plafondsOperation[zone][Math.min(personnesFoyer, 5) - 1];
  const coutRetenu = Math.min(coutOperation, plafondOperation);

  // Revenu retenu : le plus élevé entre RFR et coût/9
  const revenuRetenu = Math.max(revenuFiscalReference, coutOperation / 9);

  if (!primoAccedant) {
    return {
      eligible: false, plafondRevenu, revenuRetenu, tranche: 0, quotite: 0,
      coutRetenu, montantPTZ: 0,
      raisonRefus: "Le PTZ est réservé aux primo-accédants (ne pas avoir été propriétaire de sa résidence principale au cours des deux dernières années).",
    };
  }

  if (revenuRetenu > plafondRevenu) {
    return {
      eligible: false, plafondRevenu, revenuRetenu, tranche: 0, quotite: 0,
      coutRetenu, montantPTZ: 0,
      raisonRefus: `Vos revenus dépassent le plafond de ${plafondRevenu.toLocaleString("fr-FR")} € applicable en zone ${zone} pour ${personnesFoyer} personne(s).`,
    };
  }

  // Tranche selon la position dans le plafond
  const ratio = revenuRetenu / plafondRevenu;
  const tranche = ratio <= 0.45 ? 1 : ratio <= 0.7 ? 2 : ratio <= 0.9 ? 3 : 4;
  const quotite = PTZ.quotites[tranche - 1];

  return {
    eligible: quotite > 0,
    plafondRevenu, revenuRetenu, tranche, quotite, coutRetenu,
    montantPTZ: (coutRetenu * quotite) / 100,
  };
}
