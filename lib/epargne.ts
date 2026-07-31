export interface PointCroissance {
  annee: number;
  verse: number;      // cumul des versements
  interets: number;   // cumul des intérêts
  total: number;
}

export interface ResultatEpargne {
  capitalFinal: number;
  totalVerse: number;
  totalInterets: number;
  courbe: PointCroissance[];
  capitalFinalNet: number;   // après fiscalité éventuelle
  impots: number;
}

/**
 * Capitalisation avec versements mensuels (intérêts composés, capitalisation annuelle
 * des versements mensuels approximée par capitalisation mensuelle).
 */
export function calculerEpargne(
  capitalInitial: number,
  versementMensuel: number,
  tauxAnnuel: number,
  annees: number,
  tauxFiscalite: number // % appliqué aux intérêts (0 pour livrets défiscalisés)
): ResultatEpargne {
  const tm = tauxAnnuel / 100 / 12;
  const courbe: PointCroissance[] = [];
  let capital = capitalInitial;
  let verse = capitalInitial;

  courbe.push({ annee: 0, verse, interets: 0, total: capital });

  for (let a = 1; a <= annees; a++) {
    for (let m = 0; m < 12; m++) {
      capital = capital * (1 + tm) + versementMensuel;
      verse += versementMensuel;
    }
    courbe.push({
      annee: a,
      verse,
      interets: capital - verse,
      total: capital,
    });
  }

  const totalInterets = capital - verse;
  const impots = (totalInterets * tauxFiscalite) / 100;

  return {
    capitalFinal: capital,
    totalVerse: verse,
    totalInterets,
    courbe,
    capitalFinalNet: capital - impots,
    impots,
  };
}
