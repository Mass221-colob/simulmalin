export interface ResultatCreditConso {
  mensualite: number;
  coutInterets: number;
  coutAssurance: number;
  coutTotal: number;
  montantTotalDu: number;
  taeg: number;
}

export function calculerCreditConso(
  capital: number,
  tauxAnnuel: number,
  dureeMois: number,
  fraisDossier: number,
  assuranceMensuelle: number
): ResultatCreditConso {
  const t = tauxAnnuel / 100 / 12;
  const m = t === 0 ? capital / dureeMois : (capital * t) / (1 - Math.pow(1 + t, -dureeMois));
  const coutInterets = m * dureeMois - capital;
  const coutAssurance = assuranceMensuelle * dureeMois;
  const coutTotal = coutInterets + coutAssurance + fraisDossier;

  // TAEG approché : taux annuel équivalent incluant frais et assurance
  const mensualiteTotale = m + assuranceMensuelle;
  const capitalNet = capital - fraisDossier;
  let bas = 0, haut = 1;
  for (let i = 0; i < 60; i++) {
    const milieu = (bas + haut) / 2;
    const tm = milieu / 12;
    const versementActualise =
      tm === 0 ? mensualiteTotale * dureeMois
               : (mensualiteTotale * (1 - Math.pow(1 + tm, -dureeMois))) / tm;
    if (versementActualise > capitalNet) bas = milieu;
    else haut = milieu;
  }

  return {
    mensualite: m + assuranceMensuelle,
    coutInterets,
    coutAssurance,
    coutTotal,
    montantTotalDu: capital + coutTotal,
    taeg: ((bas + haut) / 2) * 100,
  };
}
