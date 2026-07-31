import { ARE } from "@/data/baremes2026";

export type TrancheAge = "moins53" | "de53a54" | "plus55";

export interface ResultatARE {
  sjr: number;                    // salaire journalier de référence
  allocationJournaliere: number;  // brute, avant dégressivité
  allocationMensuelle: number;    // brute (× 30,4)
  tauxRemplacement: number;       // % du salaire brut
  dureeJours: number;
  dureeMois: number;
  degressivite: boolean;          // concerné par la dégressivité après 6 mois
  allocationApresDegressivite: number; // mensuelle, si concerné
  formuleRetenue: "proportionnelle" | "alternative" | "minimum" | "plafond";
}

/**
 * Estimation simplifiée de l'ARE.
 * Hypothèse : activité continue sur la période de référence
 * (SJR ≈ salaire mensuel brut / 30,4).
 */
export function calculerARE(
  salaireBrutMensuel: number,
  moisTravailles24DerniersMois: number,
  age: TrancheAge
): ResultatARE {
  const sjr = salaireBrutMensuel / ARE.joursParMois;

  // Formules concurrentes
  const proportionnelle = (sjr * ARE.tauxProportionnel) / 100 + ARE.partieFixe;
  const alternative = (sjr * ARE.tauxAlternatif) / 100;
  let allocation = Math.max(proportionnelle, alternative);
  let formule: ResultatARE["formuleRetenue"] =
    proportionnelle >= alternative ? "proportionnelle" : "alternative";

  // Minimum
  if (allocation < ARE.minimumJournalier) {
    allocation = Math.min(ARE.minimumJournalier, (sjr * ARE.plafondPourcentSJR) / 100);
    formule = "minimum";
  }

  // Plafond : 75 % du SJR
  const plafond = (sjr * ARE.plafondPourcentSJR) / 100;
  if (allocation > plafond) {
    allocation = plafond;
    formule = "plafond";
  }

  // Durée : jours calendaires travaillés × coefficient, bornée
  const joursAffilies = moisTravailles24DerniersMois * ARE.joursParMois;
  const maxJours = ARE.dureesMaxJours[age];
  let dureeJours = Math.min(joursAffilies, maxJours) * ARE.coefficientDuree;
  dureeJours = Math.max(ARE.dureeMinJours, Math.round(dureeJours));
  // Si affiliation insuffisante pour le minimum, pas de droits
  if (joursAffilies < ARE.dureeMinJours) dureeJours = 0;

  const degressivite =
    allocation > ARE.seuilDegressiviteJournalier && age === "moins53";

  return {
    sjr,
    allocationJournaliere: allocation,
    allocationMensuelle: allocation * ARE.joursParMois,
    tauxRemplacement: salaireBrutMensuel > 0 ? ((allocation * ARE.joursParMois) / salaireBrutMensuel) * 100 : 0,
    dureeJours,
    dureeMois: dureeJours / ARE.joursParMois,
    degressivite,
    allocationApresDegressivite: allocation * ARE.joursParMois * (1 - ARE.tauxDegressivite / 100),
    formuleRetenue: formule,
  };
}
