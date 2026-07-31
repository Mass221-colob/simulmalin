import { INDEMNITE_LICENCIEMENT } from "@/data/baremes2026";

export type TypeRupture =
  | "licenciement"        // licenciement pour motif personnel ou économique
  | "rupture-conventionnelle"
  | "faute-grave";        // faute grave ou lourde : pas d'indemnité légale

export interface ResultatLicenciement {
  eligible: boolean;
  salaireReference: number;
  ancienneteAnnees: number; // ancienneté totale en années décimales
  indemnite: number;
  detailTranche1: { annees: number; montant: number };
  detailTranche2: { annees: number; montant: number };
}

/**
 * Salaire de référence : le plus favorable entre
 *  - la moyenne des 12 derniers mois
 *  - la moyenne des 3 derniers mois (primes annuelles proratisées)
 */
export function salaireReference(moyenne12Mois: number, moyenne3Mois: number): number {
  return Math.max(moyenne12Mois, moyenne3Mois);
}

/** Calcul de l'indemnité légale de licenciement. */
export function calculerIndemnite(
  salaireRef: number,
  annees: number,
  mois: number,
  type: TypeRupture
): ResultatLicenciement {
  const { ancienneteMinimaleMois, tauxJusqua10Ans, tauxApres10Ans } = INDEMNITE_LICENCIEMENT;
  const ancienneteTotaleMois = annees * 12 + mois;
  const ancienneteAnnees = ancienneteTotaleMois / 12;

  // Faute grave/lourde : aucune indemnité légale
  // Ancienneté insuffisante (sauf rupture conventionnelle : indemnité due dès le 1er jour... 
  // en pratique le minimum légal s'applique, calculé au prorata)
  const eligible =
    type !== "faute-grave" &&
    (type === "rupture-conventionnelle" || ancienneteTotaleMois >= ancienneteMinimaleMois);

  if (!eligible || salaireRef <= 0) {
    return {
      eligible: false,
      salaireReference: salaireRef,
      ancienneteAnnees,
      indemnite: 0,
      detailTranche1: { annees: 0, montant: 0 },
      detailTranche2: { annees: 0, montant: 0 },
    };
  }

  const anneesT1 = Math.min(ancienneteAnnees, 10);
  const anneesT2 = Math.max(0, ancienneteAnnees - 10);
  const montantT1 = salaireRef * tauxJusqua10Ans * anneesT1;
  const montantT2 = salaireRef * tauxApres10Ans * anneesT2;

  return {
    eligible: true,
    salaireReference: salaireRef,
    ancienneteAnnees,
    indemnite: montantT1 + montantT2,
    detailTranche1: { annees: anneesT1, montant: montantT1 },
    detailTranche2: { annees: anneesT2, montant: montantT2 },
  };
}
