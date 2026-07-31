import { RETRAITE } from "@/data/baremes2026";

export interface ResultatRetraite {
  ageLegal: number;
  moisLegal: number;
  trimestresRequis: number;
  trimestresManquants: number;
  anneeDepartTauxPlein: number;
  ageDepartTauxPlein: number;
  decote: number;              // % appliqué si départ à l'âge légal
  tauxApplique: number;        // % du SAM
  pensionEstimee: number;      // régime général
  pensionAvecComplementaire: number;
}

export function calculerRetraite(
  anneeNaissance: number,
  trimestresAcquis: number,
  salaireAnnuelMoyen: number,
  ageDepartSouhaite: number
): ResultatRetraite {
  const regle =
    RETRAITE.ageLegalParAnnee.find((r) => anneeNaissance < r.neAvant) ??
    RETRAITE.ageLegalParAnnee[RETRAITE.ageLegalParAnnee.length - 1];

  const trimestresRequis = regle.trimestres;

  // Trimestres supplémentaires acquis entre l'âge légal et le départ souhaité
  const anneesTravailSupp = Math.max(0, ageDepartSouhaite - (regle.age + regle.mois / 12));
  const trimestresAuDepart = trimestresAcquis + Math.round(anneesTravailSupp * 4);
  const trimestresManquants = Math.max(0, trimestresRequis - trimestresAuDepart);

  // Décote (plafonnée) ou surcote
  let taux = RETRAITE.tauxPlein;
  let decote = 0;
  if (ageDepartSouhaite >= RETRAITE.ageTauxPleinAutomatique) {
    taux = RETRAITE.tauxPlein; // taux plein automatique
  } else if (trimestresManquants > 0) {
    const trimDecote = Math.min(trimestresManquants, RETRAITE.maxTrimestresDecote);
    decote = trimDecote * RETRAITE.decotePartrimestre;
    taux = RETRAITE.tauxPlein - decote;
  } else {
    const surcote = Math.max(0, trimestresAuDepart - trimestresRequis) * RETRAITE.surcoteParTrimestre;
    taux = RETRAITE.tauxPlein * (1 + surcote / 100);
  }

  // Proratisation si carrière incomplète
  const prorata = Math.min(1, trimestresAuDepart / trimestresRequis);
  const pension = (salaireAnnuelMoyen * (taux / 100) * prorata) / 12;

  // Complémentaire AGIRC-ARRCO : ordre de grandeur ~ +25 à 50 % pour un non-cadre
  const pensionAvecComplementaire = pension * 1.35;

  // Année où le taux plein est atteint
  const trimestresRestants = Math.max(0, trimestresRequis - trimestresAcquis);
  const ageDepartTauxPlein = Math.max(
    regle.age + regle.mois / 12,
    regle.age + regle.mois / 12 + trimestresRestants / 4
  );

  return {
    ageLegal: regle.age,
    moisLegal: regle.mois,
    trimestresRequis,
    trimestresManquants,
    anneeDepartTauxPlein: anneeNaissance + Math.ceil(ageDepartTauxPlein),
    ageDepartTauxPlein,
    decote,
    tauxApplique: taux,
    pensionEstimee: pension,
    pensionAvecComplementaire,
  };
}
