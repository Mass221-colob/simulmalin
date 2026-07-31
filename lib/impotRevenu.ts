import {
  BAREME_IR,
  ABATTEMENT_10,
  DECOTE,
  PLAFOND_DEMI_PART,
} from "@/data/baremes2026";

export type Situation = "celibataire" | "couple";

export interface DetailTranche {
  de: number;
  a: number | null;
  taux: number;
  assiette: number; // part du revenu (par part fiscale) taxée dans cette tranche
  impot: number; // impôt de la tranche pour tout le foyer
}

export interface ResultatIR {
  revenuImposable: number;
  parts: number;
  impotBrut: number; // avant décote, après plafonnement QF
  decote: number;
  impotNet: number;
  tauxMoyen: number; // % du revenu imposable
  tauxMarginal: number; // % de la tranche la plus haute atteinte
  tranches: DetailTranche[];
  plafonnementApplique: boolean;
  revenuNetApresImpot: number;
  impotMensuel: number;
}

/** Nombre de parts fiscales du foyer. */
export function calculerParts(situation: Situation, enfants: number): number {
  let parts = situation === "couple" ? 2 : 1;
  for (let i = 1; i <= enfants; i++) {
    parts += i <= 2 ? 0.5 : 1; // 0,5 part pour les 2 premiers, 1 part à partir du 3e
  }
  return parts;
}

/** Applique l'abattement forfaitaire de 10 % (salariés). */
export function appliquerAbattement(revenuBrutAnnuel: number): number {
  const abattement = Math.min(
    Math.max(revenuBrutAnnuel * ABATTEMENT_10.taux, ABATTEMENT_10.minimum),
    ABATTEMENT_10.maximum
  );
  return Math.max(0, revenuBrutAnnuel - abattement);
}

/** Impôt brut par le barème pour un revenu et un nombre de parts (sans décote). */
function impotBareme(revenuImposable: number, parts: number): { impot: number; tranches: DetailTranche[]; tauxMarginal: number } {
  const quotient = revenuImposable / parts;
  const tranches: DetailTranche[] = [];
  let impot = 0;
  let tauxMarginal = 0;
  let plancher = 0;

  for (const t of BAREME_IR) {
    const plafond = t.jusqu ?? Infinity;
    const assiette = Math.max(0, Math.min(quotient, plafond) - plancher);
    const impotTranche = (assiette * t.taux) / 100 * parts;
    if (assiette > 0 && t.taux > 0) tauxMarginal = t.taux;
    if (quotient > plancher) {
      tranches.push({
        de: plancher,
        a: t.jusqu,
        taux: t.taux,
        assiette,
        impot: impotTranche,
      });
    }
    impot += impotTranche;
    plancher = plafond;
    if (quotient <= plafond) break;
  }
  return { impot, tranches, tauxMarginal };
}

/** Calcul complet de l'impôt sur le revenu. */
export function calculerIR(
  revenuImposable: number,
  situation: Situation,
  enfants: number
): ResultatIR {
  const parts = calculerParts(situation, enfants);
  const partsSansEnfants = situation === "couple" ? 2 : 1;

  // 1. Impôt avec quotient familial complet
  const avecQF = impotBareme(revenuImposable, parts);

  // 2. Plafonnement du quotient familial :
  //    l'avantage lié aux enfants ne peut dépasser PLAFOND_DEMI_PART par demi-part.
  const sansEnfants = impotBareme(revenuImposable, partsSansEnfants);
  const demiPartsSupp = (parts - partsSansEnfants) * 2;
  const impotPlancher = sansEnfants.impot - PLAFOND_DEMI_PART * demiPartsSupp;
  const plafonnementApplique = enfants > 0 && avecQF.impot < impotPlancher;
  const impotBrut = plafonnementApplique ? impotPlancher : avecQF.impot;
  const detail = plafonnementApplique ? sansEnfants : avecQF;

  // 3. Décote
  const seuil = situation === "couple" ? DECOTE.seuilCouple : DECOTE.seuilCelibataire;
  const forfait = situation === "couple" ? DECOTE.forfaitCouple : DECOTE.forfaitCelibataire;
  let decote = 0;
  if (impotBrut > 0 && impotBrut < seuil) {
    decote = Math.min(impotBrut, Math.max(0, forfait - impotBrut * DECOTE.taux));
  }

  const impotNet = Math.max(0, Math.round(impotBrut - decote));

  return {
    revenuImposable,
    parts,
    impotBrut,
    decote,
    impotNet,
    tauxMoyen: revenuImposable > 0 ? (impotNet / revenuImposable) * 100 : 0,
    tauxMarginal: detail.tauxMarginal,
    tranches: detail.tranches,
    plafonnementApplique,
    revenuNetApresImpot: revenuImposable - impotNet,
    impotMensuel: impotNet / 12,
  };
}
