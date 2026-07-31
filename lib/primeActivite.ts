import { PRIME_ACTIVITE, SMIC } from "@/data/baremes2026";

export interface ResultatPrime {
  eligible: boolean;
  montantForfaitaire: number;
  bonifications: number;
  revenusPris: number;
  forfaitLogement: number;
  montant: number;
  nbParts: number;
}

/**
 * Estimation simplifiée de la prime d'activité.
 * Formule : (forfait majoré + bonifications + 61 % des revenus pro) − ressources du foyer
 */
export function calculerPrimeActivite(
  revenuNetMensuel: number,     // revenus d'activité du demandeur
  revenuConjoint: number,
  enfants: number,
  enCouple: boolean,
  aideLogement: boolean
): ResultatPrime {
  const p = PRIME_ACTIVITE;

  // Montant forfaitaire majoré selon la composition
  let coef = 1;
  if (enCouple) coef += p.majorationConjoint;
  for (let i = 1; i <= enfants; i++) {
    coef += i <= 2 ? p.majoration1erEnfant : p.majorationEnfantSuivant;
  }
  const montantForfaitaire = p.montantForfaitaire * coef;

  // Bonification individuelle (par travailleur, selon le niveau de revenu)
  const smicNet = SMIC.mensuelBrut35h * 0.78;
  const bonif = (revenu: number) => {
    const ratio = revenu / smicNet;
    if (ratio < p.seuilBonification) return 0;
    if (ratio >= p.plafondBonification) return p.bonificationMax;
    return (
      (p.bonificationMax * (ratio - p.seuilBonification)) /
      (p.plafondBonification - p.seuilBonification)
    );
  };
  const bonifications = bonif(revenuNetMensuel) + (enCouple ? bonif(revenuConjoint) : 0);

  // Forfait logement (déduit si aide au logement ou logement gratuit)
  const idx = enfants === 0 && !enCouple ? 0 : enfants <= 1 || !enCouple ? 1 : 2;
  const forfaitLogement = aideLogement ? p.montantForfaitaire * p.forfaitLogement[idx] : 0;

  const revenusFoyer = revenuNetMensuel + revenuConjoint;
  const revenusPris = revenusFoyer * p.tauxRevenusPro;

  const montantBrut =
    montantForfaitaire + bonifications + revenusPris - revenusFoyer - forfaitLogement;
  const montant = Math.max(0, montantBrut);

  return {
    eligible: montant >= p.montantMinimalVerse,
    montantForfaitaire,
    bonifications,
    revenusPris,
    forfaitLogement,
    montant: montant >= p.montantMinimalVerse ? montant : 0,
    nbParts: coef,
  };
}
