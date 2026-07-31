import { TAUX_ENDETTEMENT_MAX } from "@/data/baremes2026";

export interface LigneAmortissement {
  mois: number;
  interets: number;
  capitalRembourse: number;
  assurance: number;
  mensualiteTotale: number;
  restantDu: number;
}

export interface ResultatPret {
  capital: number;
  dureeAnnees: number;
  tauxAnnuel: number;
  tauxAssurance: number;
  mensualiteHorsAssurance: number;
  assuranceMensuelle: number;
  mensualiteTotale: number;
  coutInterets: number;
  coutAssurance: number;
  coutTotalCredit: number;
  tableau: LigneAmortissement[];
}

/** Mensualité hors assurance (formule d'annuité constante). */
export function mensualite(capital: number, tauxAnnuel: number, dureeAnnees: number): number {
  const n = dureeAnnees * 12;
  if (n <= 0 || capital <= 0) return 0;
  const t = tauxAnnuel / 100 / 12;
  if (t === 0) return capital / n;
  return (capital * t) / (1 - Math.pow(1 + t, -n));
}

/** Calcul complet du prêt avec tableau d'amortissement mensuel. */
export function calculerPret(
  capital: number,
  tauxAnnuel: number,
  dureeAnnees: number,
  tauxAssurance: number
): ResultatPret {
  const n = dureeAnnees * 12;
  const t = tauxAnnuel / 100 / 12;
  const m = mensualite(capital, tauxAnnuel, dureeAnnees);
  const assuranceMensuelle = (capital * tauxAssurance) / 100 / 12; // sur capital initial

  const tableau: LigneAmortissement[] = [];
  let restant = capital;
  for (let mois = 1; mois <= n; mois++) {
    const interets = restant * t;
    let capitalRembourse = m - interets;
    if (mois === n) capitalRembourse = restant; // ajustement dernier mois (arrondis)
    restant = Math.max(0, restant - capitalRembourse);
    tableau.push({
      mois,
      interets,
      capitalRembourse,
      assurance: assuranceMensuelle,
      mensualiteTotale: m + assuranceMensuelle,
      restantDu: restant,
    });
  }

  const coutInterets = tableau.reduce((s, l) => s + l.interets, 0);
  const coutAssurance = assuranceMensuelle * n;

  return {
    capital,
    dureeAnnees,
    tauxAnnuel,
    tauxAssurance,
    mensualiteHorsAssurance: m,
    assuranceMensuelle,
    mensualiteTotale: m + assuranceMensuelle,
    coutInterets,
    coutAssurance,
    coutTotalCredit: coutInterets + coutAssurance,
    tableau,
  };
}

export interface ResultatCapacite {
  mensualiteMax: number; // assurance incluse
  capitalEmpruntable: number;
  budgetTotal: number; // avec apport
  tauxEndettementUtilise: number;
}

/** Capacité d'emprunt selon la règle des 35 % (assurance incluse). */
export function calculerCapacite(
  revenusNetsMensuels: number,
  chargesMensuelles: number, // autres crédits en cours
  tauxAnnuel: number,
  dureeAnnees: number,
  tauxAssurance: number,
  apport: number
): ResultatCapacite {
  const mensualiteMax = Math.max(
    0,
    (revenusNetsMensuels * TAUX_ENDETTEMENT_MAX) / 100 - chargesMensuelles
  );

  // Recherche du capital dont (mensualité + assurance) = mensualiteMax
  let bas = 0;
  let haut = mensualiteMax * dureeAnnees * 12 || 1;
  for (let i = 0; i < 50; i++) {
    const milieu = (bas + haut) / 2;
    const total = mensualite(milieu, tauxAnnuel, dureeAnnees) + (milieu * tauxAssurance) / 100 / 12;
    if (total < mensualiteMax) bas = milieu;
    else haut = milieu;
  }
  const capital = Math.floor((bas + haut) / 2);

  return {
    mensualiteMax,
    capitalEmpruntable: capital,
    budgetTotal: capital + apport,
    tauxEndettementUtilise: TAUX_ENDETTEMENT_MAX,
  };
}

/** Agrégation annuelle du tableau (pour affichage compact). */
export function tableauParAnnee(tableau: LigneAmortissement[]) {
  const annees: {
    annee: number;
    interets: number;
    capital: number;
    assurance: number;
    restantDu: number;
  }[] = [];
  for (let a = 0; a * 12 < tableau.length; a++) {
    const tranche = tableau.slice(a * 12, (a + 1) * 12);
    annees.push({
      annee: a + 1,
      interets: tranche.reduce((s, l) => s + l.interets, 0),
      capital: tranche.reduce((s, l) => s + l.capitalRembourse, 0),
      assurance: tranche.reduce((s, l) => s + l.assurance, 0),
      restantDu: tranche[tranche.length - 1].restantDu,
    });
  }
  return annees;
}
