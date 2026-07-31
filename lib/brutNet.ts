import {
  COTISATIONS_SALARIALES,
  ASSIETTE_CSG,
  SMIC,
  type Statut,
  type LigneCotisation,
} from "@/data/baremes2026";

export type Periode = "mensuel" | "annuel" | "horaire";

export interface DetailCotisation {
  libelle: string;
  taux: number;
  montant: number; // € mensuel
}

export interface ResultatBrutNet {
  brutMensuel: number;
  netMensuel: number;
  netAnnuel: number;
  netApresImpot: number;
  impotMensuel: number;
  totalCotisations: number;
  tauxGlobal: number; // % de cotisations
  details: DetailCotisation[];
}

/** Convertit la saisie en brut mensuel selon la période choisie. */
export function versBrutMensuel(
  montant: number,
  periode: Periode,
  tempsPartiel: number // 100 = temps plein
): number {
  let mensuel: number;
  if (periode === "annuel") mensuel = montant / 12;
  else if (periode === "horaire") mensuel = montant * SMIC.heuresMensuelles;
  else mensuel = montant;
  return mensuel * (tempsPartiel / 100);
}

/** Calcule le net à partir du brut mensuel. */
export function calculerBrutNet(
  brutMensuel: number,
  statut: Statut,
  tauxPrelevementSource: number // en %, saisi par l'utilisateur
): ResultatBrutNet {
  const lignes: LigneCotisation[] = COTISATIONS_SALARIALES[statut];

  const details: DetailCotisation[] = lignes.map((l) => {
    const assiette = l.assietteCSG ? brutMensuel * ASSIETTE_CSG : brutMensuel;
    return {
      libelle: l.libelle,
      taux: l.taux,
      montant: (assiette * l.taux) / 100,
    };
  });

  const totalCotisations = details.reduce((s, d) => s + d.montant, 0);
  const netMensuel = brutMensuel - totalCotisations;
  const impotMensuel = (netMensuel * tauxPrelevementSource) / 100;

  return {
    brutMensuel,
    netMensuel,
    netAnnuel: netMensuel * 12,
    netApresImpot: netMensuel - impotMensuel,
    impotMensuel,
    totalCotisations,
    tauxGlobal: brutMensuel > 0 ? (totalCotisations / brutMensuel) * 100 : 0,
    details,
  };
}

/** Calcul inverse : quel brut pour obtenir un net donné (recherche par itération). */
export function calculerNetVersBrut(netVoulu: number, statut: Statut): number {
  let bas = netVoulu;
  let haut = netVoulu * 1.6;
  for (let i = 0; i < 40; i++) {
    const milieu = (bas + haut) / 2;
    const net = calculerBrutNet(milieu, statut, 0).netMensuel;
    if (net < netVoulu) bas = milieu;
    else haut = milieu;
  }
  return (bas + haut) / 2;
}

export function euros(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function eurosPrecis(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
