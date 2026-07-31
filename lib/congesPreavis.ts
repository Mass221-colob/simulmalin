import { CONGES } from "@/data/baremes2026";

export type TypeDecompte = "ouvrables" | "ouvres";

export interface ResultatConges {
  joursAcquis: number;
  joursRestants: number;
  indemniteDixieme: number;      // règle du 1/10e
  indemniteMaintien: number;     // règle du maintien de salaire
  indemniteRetenue: number;      // la plus favorable
  regleRetenue: "1/10e" | "maintien";
  valeurJour: number;
}

export function calculerConges(
  moisTravailles: number,
  joursPris: number,
  salaireBrutMensuel: number,
  remunerationPeriode: number,   // brut total de la période de référence
  type: TypeDecompte
): ResultatConges {
  const parMois = type === "ouvrables" ? CONGES.joursOuvrablesParMois : CONGES.joursOuvresParMois;
  const max = type === "ouvrables" ? CONGES.maxOuvrables : CONGES.maxOuvres;
  const joursMoisType = type === "ouvrables" ? 26 : 21.67;

  const joursAcquis = Math.min(Math.round(moisTravailles * parMois * 100) / 100, max);
  const joursRestants = Math.max(0, joursAcquis - joursPris);

  // Règle du 1/10e : 10 % de la rémunération brute de la période de référence
  const indemniteTotaleDixieme = (remunerationPeriode * CONGES.tauxIndemnite) / 100;
  const indemniteDixieme = joursAcquis > 0 ? (indemniteTotaleDixieme / joursAcquis) * joursRestants : 0;

  // Règle du maintien : salaire qu'aurait perçu le salarié
  const valeurJour = salaireBrutMensuel / joursMoisType;
  const indemniteMaintien = valeurJour * joursRestants;

  const maintienGagne = indemniteMaintien >= indemniteDixieme;

  return {
    joursAcquis,
    joursRestants,
    indemniteDixieme,
    indemniteMaintien,
    indemniteRetenue: Math.max(indemniteDixieme, indemniteMaintien),
    regleRetenue: maintienGagne ? "maintien" : "1/10e",
    valeurJour,
  };
}

export type MotifRupture = "licenciement" | "demission" | "retraite";

export interface ResultatPreavis {
  dureeMois: number;
  dureeTexte: string;
  note: string;
}

export function calculerPreavis(
  ancienneteMois: number,
  motif: MotifRupture,
  cadre: boolean
): ResultatPreavis {
  if (motif === "demission") {
    if (cadre) {
      return {
        dureeMois: 3,
        dureeTexte: "3 mois (usage cadres)",
        note: "Aucune durée légale pour la démission : c'est la convention collective ou l'usage de la profession qui s'applique. Pour les cadres, 3 mois est la pratique la plus courante.",
      };
    }
    return {
      dureeMois: 1,
      dureeTexte: "1 mois (usage courant)",
      note: "Aucune durée légale pour la démission : votre convention collective fixe la règle. Un mois est la pratique la plus fréquente pour les non-cadres.",
    };
  }

  if (motif === "retraite") {
    const m = ancienneteMois >= 24 ? 2 : ancienneteMois >= 6 ? 1 : 0;
    return {
      dureeMois: m,
      dureeTexte: m === 0 ? "Selon convention" : `${m} mois`,
      note: "Le départ volontaire à la retraite suit les mêmes durées que le préavis de licenciement.",
    };
  }

  // Licenciement
  if (ancienneteMois < 6) {
    return {
      dureeMois: 0,
      dureeTexte: "Selon convention ou usage",
      note: "En dessous de 6 mois d'ancienneté, la loi ne fixe pas de durée : la convention collective, l'accord d'entreprise ou l'usage local s'appliquent.",
    };
  }
  if (ancienneteMois < 24) {
    return {
      dureeMois: 1,
      dureeTexte: "1 mois",
      note: "Durée légale minimale entre 6 mois et 2 ans d'ancienneté. Votre convention collective peut prévoir davantage, notamment pour les cadres (souvent 3 mois).",
    };
  }
  return {
    dureeMois: 2,
    dureeTexte: "2 mois",
    note: "Durée légale minimale à partir de 2 ans d'ancienneté. Les conventions collectives prévoient fréquemment 3 mois pour les cadres.",
  };
}
