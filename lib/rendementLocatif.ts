import { LOCATIF, BAREME_IR } from "@/data/baremes2026";

export type RegimeFiscal = "micro-foncier" | "reel-foncier" | "micro-bic" | "reel-bic";

export interface EntreesLocatif {
  prixAchat: number;
  fraisNotaire: number;
  travaux: number;
  loyerMensuel: number;
  chargesAnnuelles: number;     // copropriété non récupérables, entretien
  taxeFonciere: number;
  assurancePNO: number;
  fraisGestion: number;         // % du loyer (agence)
  vacanceLocative: number;      // % de l'année sans locataire
  mensualiteCredit: number;     // 0 si achat comptant
  interetsAnnuels: number;      // pour le régime réel
  tmi: number;                  // tranche marginale d'imposition (%)
  regime: RegimeFiscal;
}

export interface ResultatLocatif {
  investissementTotal: number;
  loyerAnnuelBrut: number;
  loyerAnnuelEncaisse: number;   // après vacance
  chargesTotales: number;
  revenuNetAvantImpot: number;
  baseImposable: number;
  impotRevenu: number;
  prelevementsSociaux: number;
  impotTotal: number;
  revenuNetApresImpot: number;
  rendementBrut: number;
  rendementNet: number;
  rendementNetNet: number;
  cashFlowMensuel: number;       // après crédit et impôts
}

export function calculerRendement(e: EntreesLocatif): ResultatLocatif {
  const investissementTotal = e.prixAchat + e.fraisNotaire + e.travaux;
  const loyerAnnuelBrut = e.loyerMensuel * 12;
  const loyerAnnuelEncaisse = loyerAnnuelBrut * (1 - e.vacanceLocative / 100);

  const gestion = (loyerAnnuelEncaisse * e.fraisGestion) / 100;
  const chargesTotales = e.chargesAnnuelles + e.taxeFonciere + e.assurancePNO + gestion;
  const revenuNetAvantImpot = loyerAnnuelEncaisse - chargesTotales;

  // Base imposable selon le régime
  let baseImposable = 0;
  if (e.regime === "micro-foncier") {
    baseImposable = loyerAnnuelEncaisse * (1 - LOCATIF.microFoncier.abattement / 100);
  } else if (e.regime === "micro-bic") {
    baseImposable = loyerAnnuelEncaisse * (1 - LOCATIF.microBIC.abattement / 100);
  } else if (e.regime === "reel-foncier") {
    baseImposable = Math.max(0, revenuNetAvantImpot - e.interetsAnnuels);
  } else {
    // réel BIC (LMNP) : amortissement du bien (~2,5 %/an sur le bâti estimé à 85 %)
    const amortissement = e.prixAchat * 0.85 * 0.025 + e.travaux * 0.05;
    baseImposable = Math.max(0, revenuNetAvantImpot - e.interetsAnnuels - amortissement);
  }

  const impotRevenu = (baseImposable * e.tmi) / 100;
  const prelevementsSociaux = (baseImposable * LOCATIF.prelevementsSociaux) / 100;
  const impotTotal = impotRevenu + prelevementsSociaux;
  const revenuNetApresImpot = revenuNetAvantImpot - impotTotal;

  return {
    investissementTotal,
    loyerAnnuelBrut,
    loyerAnnuelEncaisse,
    chargesTotales,
    revenuNetAvantImpot,
    baseImposable,
    impotRevenu,
    prelevementsSociaux,
    impotTotal,
    revenuNetApresImpot,
    rendementBrut: investissementTotal > 0 ? (loyerAnnuelBrut / investissementTotal) * 100 : 0,
    rendementNet: investissementTotal > 0 ? (revenuNetAvantImpot / investissementTotal) * 100 : 0,
    rendementNetNet: investissementTotal > 0 ? (revenuNetApresImpot / investissementTotal) * 100 : 0,
    cashFlowMensuel: revenuNetApresImpot / 12 - e.mensualiteCredit,
  };
}

export const LIBELLES_REGIME: Record<RegimeFiscal, string> = {
  "micro-foncier": "Location nue — micro-foncier (abattement 30 %)",
  "reel-foncier": "Location nue — régime réel (charges déduites)",
  "micro-bic": "Meublé — micro-BIC (abattement 50 %)",
  "reel-bic": "Meublé LMNP — réel (amortissement)",
};

/** TMI par défaut proposées à l'utilisateur. */
export const TMI_OPTIONS = BAREME_IR.map((t) => t.taux);
