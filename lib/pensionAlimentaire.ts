import { PENSION_ALIMENTAIRE } from "@/data/baremes2026";

export type TypeGarde = "reduit" | "classique" | "alterne";

export interface ResultatPension {
  revenuRetenu: number;
  tauxApplique: number;
  pensionParEnfant: number;
  pensionTotale: number;
}

export function calculerPension(
  revenuMensuelDebiteur: number,
  nbEnfants: number,
  typeGarde: TypeGarde
): ResultatPension {
  const revenuRetenu = Math.max(0, revenuMensuelDebiteur - PENSION_ALIMENTAIRE.minimumVital);
  const idx = Math.min(nbEnfants, 5) - 1;
  const taux = PENSION_ALIMENTAIRE.taux[typeGarde][Math.max(0, idx)];
  const pensionParEnfant = (revenuRetenu * taux) / 100;

  return {
    revenuRetenu,
    tauxApplique: taux,
    pensionParEnfant,
    pensionTotale: pensionParEnfant * nbEnfants,
  };
}
