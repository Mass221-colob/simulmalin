/**
 * BARÈMES ET CONSTANTES FISCALES — ANNÉE 2026
 * ============================================
 * ⚠️ FICHIER CENTRAL : c'est LE fichier à mettre à jour chaque janvier.
 * ⚠️ AVANT MISE EN LIGNE : vérifier chaque valeur sur les sources officielles :
 *    - SMIC & PASS : urssaf.fr
 *    - Barème IR : impots.gouv.fr / service-public.fr
 *    - Taux de cotisations : urssaf.fr (taux et barèmes)
 * Les valeurs ci-dessous sont des estimations de départ à confirmer.
 */

export const ANNEE = 2026;

// Salaire minimum (à vérifier — valeur indicative)
export const SMIC = {
  horaireBrut: 12.31,      // ✅ vérifié : revalorisation du 1er juin 2026
  mensuelBrut35h: 1867.02, // 35h/semaine, 151,67 h/mois
  heuresMensuelles: 151.67,
};

// Plafond Annuel de la Sécurité Sociale (à vérifier)
export const PASS = {
  annuel: 48060, // ✅ vérifié 2026 (arrêté du 22 décembre 2025)
  mensuel: 4005,
};

/**
 * Cotisations SALARIALES (part retenue sur le brut).
 * Modèle simplifié mais fidèle aux grandes lignes d'une fiche de paie
 * du secteur privé. La CSG/CRDS s'applique sur 98,25 % du brut
 * (dans la limite de 4 PASS).
 */
export type Statut = "non-cadre" | "cadre" | "fonction-publique";

export interface LigneCotisation {
  libelle: string;
  taux: number; // en % du brut (ou de l'assiette CSG si csg = true)
  assietteCSG?: boolean;
}

export const COTISATIONS_SALARIALES: Record<Statut, LigneCotisation[]> = {
  "non-cadre": [
    { libelle: "Assurance vieillesse plafonnée", taux: 6.9 },
    { libelle: "Assurance vieillesse déplafonnée", taux: 0.4 },
    { libelle: "Retraite complémentaire AGIRC-ARRCO (T1)", taux: 3.15 },
    { libelle: "Contribution d'équilibre général (CEG)", taux: 0.86 },
    { libelle: "CSG déductible", taux: 6.8, assietteCSG: true },
    { libelle: "CSG non déductible", taux: 2.4, assietteCSG: true },
    { libelle: "CRDS", taux: 0.5, assietteCSG: true },
  ],
  cadre: [
    { libelle: "Assurance vieillesse plafonnée", taux: 6.9 },
    { libelle: "Assurance vieillesse déplafonnée", taux: 0.4 },
    { libelle: "Retraite complémentaire AGIRC-ARRCO (T1)", taux: 3.15 },
    { libelle: "Contribution d'équilibre général (CEG)", taux: 0.86 },
    { libelle: "Cotisation APEC", taux: 0.024 },
    { libelle: "CSG déductible", taux: 6.8, assietteCSG: true },
    { libelle: "CSG non déductible", taux: 2.4, assietteCSG: true },
    { libelle: "CRDS", taux: 0.5, assietteCSG: true },
  ],
  "fonction-publique": [
    { libelle: "Pension civile (retraite)", taux: 11.1 },
    { libelle: "RAFP (retraite additionnelle)", taux: 5.0 },
    // Dans la fonction publique la CSG/CRDS s'applique aussi ; taux moyen simplifié :
    { libelle: "CSG déductible", taux: 6.8, assietteCSG: true },
    { libelle: "CSG non déductible", taux: 2.4, assietteCSG: true },
    { libelle: "CRDS", taux: 0.5, assietteCSG: true },
  ],
};

// Assiette CSG/CRDS = 98,25 % du brut
export const ASSIETTE_CSG = 0.9825;

/**
 * Barème progressif de l'impôt sur le revenu (revenus 2025, imposés en 2026).
 * ⚠️ À vérifier lors de la loi de finances.
 * Tranches ANNUELLES par part fiscale.
 */
// ✅ VÉRIFIÉ : barème officiel de la loi de finances 2026 (revenus 2025),
// source service-public.gouv.fr — indexé sur l'inflation (+0,9 %).
export const BAREME_IR: { jusqu: number | null; taux: number }[] = [
  { jusqu: 11600, taux: 0 },
  { jusqu: 29579, taux: 11 },
  { jusqu: 84577, taux: 30 },
  { jusqu: 181917, taux: 41 },
  { jusqu: null, taux: 45 },
];

export const LIBELLES_STATUT: Record<Statut, string> = {
  "non-cadre": "Salarié non-cadre",
  cadre: "Salarié cadre",
  "fonction-publique": "Fonction publique",
};

/**
 * ---- IMPÔT SUR LE REVENU : constantes complémentaires ----
 * ⚠️ Valeurs indicatives à vérifier sur impots.gouv.fr (loi de finances).
 */

// Abattement forfaitaire de 10 % pour frais professionnels (salariés)
export const ABATTEMENT_10 = {
  taux: 0.10,
  minimum: 495,    // ✅ vérifié 2026
  maximum: 14171,  // ✅ vérifié 2026 (par déclarant)
};

// Décote (réduit l'impôt des foyers faiblement imposés)
export const DECOTE = {
  seuilCelibataire: 1982,  // ✅ vérifié 2026
  seuilCouple: 3278,
  forfaitCelibataire: 897, // ✅ vérifié 2026
  forfaitCouple: 1483,
  taux: 0.4525,
};

// Plafonnement du quotient familial : avantage max par demi-part supplémentaire
export const PLAFOND_DEMI_PART = 1791; // ✅ vérifié 2026

/**
 * ---- FRAIS DE NOTAIRE : constantes ----
 * ⚠️ Valeurs indicatives à vérifier sur notaires.fr et impots.gouv.fr.
 */

// Émoluments du notaire (barème réglementé, par tranches du prix de vente)
export const EMOLUMENTS_NOTAIRE: { jusqu: number | null; taux: number }[] = [
  { jusqu: 6500, taux: 3.87 },
  { jusqu: 17000, taux: 1.596 },
  { jusqu: 60000, taux: 1.064 },
  { jusqu: null, taux: 0.799 },
];

// Droits de mutation (DMTO) — logement ANCIEN, en % du prix
export const DMTO = {
  standard: 5.80665, // taux le plus courant (dép. 4,50 % + commune 1,20 % + frais d'assiette)
  reduit: 5.09006,   // départements restés au taux réduit (Indre, Morbihan, Mayotte)
};

// Logement NEUF : taxe de publicité foncière (le prix inclut déjà la TVA)
export const TPF_NEUF = 0.71498; // % du prix

// Contribution de sécurité immobilière
export const CSI = 0.1; // % du prix

// Débours et formalités (forfait estimatif)
export const DEBOURS = { ancien: 1360, neuf: 1000 };

// TVA sur les émoluments du notaire
export const TVA_EMOLUMENTS = 20; // %

/**
 * ---- PRÊT IMMOBILIER : constantes ----
 * ⚠️ Taux indicatifs de marché à actualiser régulièrement (source : observatoires de crédit).
 */

// Taux d'endettement maximal (norme HCSF)
export const TAUX_ENDETTEMENT_MAX = 35; // % des revenus nets, assurance incluse

// Taux d'intérêt indicatifs par durée (hors assurance) — à actualiser
export const TAUX_INDICATIFS: Record<number, number> = {
  10: 2.95,
  15: 3.15,
  20: 3.3,
  25: 3.45,
};

// Taux d'assurance emprunteur indicatif (% du capital initial, par an)
export const TAUX_ASSURANCE_DEFAUT = 0.35;

/**
 * ---- INDEMNITÉ DE LICENCIEMENT : constantes légales ----
 * Source : Code du travail, art. R1234-2 (à vérifier sur service-public.fr).
 */
export const INDEMNITE_LICENCIEMENT = {
  ancienneteMinimaleMois: 8, // 8 mois d'ancienneté ininterrompue minimum
  tauxJusqua10Ans: 1 / 4,    // 1/4 de mois de salaire par année (10 premières années)
  tauxApres10Ans: 1 / 3,     // 1/3 de mois par année au-delà de 10 ans
};

/**
 * ---- AUTO-ENTREPRENEUR : constantes ----
 * ⚠️ Taux et seuils à vérifier sur autoentrepreneur.urssaf.fr (ils évoluent chaque année,
 * notamment le taux BNC qui suit une trajectoire de hausse jusqu'en 2026).
 */
export type ActiviteAE = "vente" | "prestation-bic" | "prestation-bnc";

// ✅ Seuils de franchise TVA vérifiés sur entreprendre.service-public.gouv.fr :
// inchangés en 2026 (85 000/93 500 € vente ; 37 500/41 250 € services).
// Le projet de seuil unique à 25 000 € a été abandonné.
export const AUTO_ENTREPRENEUR: Record<
  ActiviteAE,
  {
    libelle: string;
    cotisations: number;      // % du CA (taux plein)
    cfp: number;              // contribution formation professionnelle, % du CA
    versementLiberatoire: number; // % du CA (impôt sur le revenu)
    abattement: number;       // % d'abattement forfaitaire si imposition au barème
    plafondCA: number;        // plafond annuel du régime micro
    seuilTVA: number;         // franchise en base de TVA (seuil de base)
    seuilTVAMajore: number;   // seuil majoré (tolérance)
  }
> = {
  vente: {
    libelle: "Achat-revente de marchandises (BIC)",
    cotisations: 12.3,
    cfp: 0.1,
    versementLiberatoire: 1.0,
    abattement: 71,
    plafondCA: 203100, // ✅ vérifié : plafonds micro 2026-2028
    seuilTVA: 85000,
    seuilTVAMajore: 93500,
  },
  "prestation-bic": {
    libelle: "Prestations de services commerciales ou artisanales (BIC)",
    cotisations: 21.2,
    cfp: 0.3,
    versementLiberatoire: 1.7,
    abattement: 50,
    plafondCA: 83600,
    seuilTVA: 37500,
    seuilTVAMajore: 41250,
  },
  "prestation-bnc": {
    libelle: "Professions libérales et prestations BNC",
    cotisations: 23.1, // ✅ vérifié 2026 (hors CIPAV ; 21,1 % pour les libéraux CIPAV)
    cfp: 0.2,
    versementLiberatoire: 2.2,
    abattement: 34,
    plafondCA: 83600,
    seuilTVA: 37500,
    seuilTVAMajore: 41250,
  },
};

// ACRE : exonération partielle de cotisations en début d'activité (~50 %)
export const ACRE_REDUCTION = 0.5;

/**
 * ---- ALLOCATIONS CHÔMAGE (ARE) : constantes ----
 * ⚠️ RÉGLEMENTATION TRÈS ÉVOLUTIVE : vérifier impérativement sur unedic.org et
 * francetravail.fr avant mise en ligne (partie fixe, minimum et seuils revalorisés
 * chaque 1er juillet ; règles de durée modifiées par les réformes successives).
 */
export const ARE = {
  // Allocation journalière = max(40,4 % du SJR + partie fixe ; 57 % du SJR)
  tauxProportionnel: 40.4,   // % du SJR
  partieFixe: 13.11,         // € / jour
  tauxAlternatif: 57,        // % du SJR
  minimumJournalier: 31.97,  // € / jour
  plafondPourcentSJR: 75,    // l'allocation ne peut dépasser 75 % du SJR

  // Durée d'indemnisation
  coefficientDuree: 0.75,    // modulation "conjoncture favorable" (réforme 2023)
  dureeMinJours: 182,        // 6 mois minimum
  dureesMaxJours: {          // avant application du coefficient
    moins53: 730,
    de53a54: 913,
    plus55: 1095,
  },

  // Dégressivité (-30 % à partir du 7e mois) pour les hauts revenus, moins de 57 ans
  seuilDegressiviteJournalier: 92.11, // € / jour d'allocation
  tauxDegressivite: 30,               // %

  joursParMois: 30.4,
};

/**
 * ---- RENDEMENT LOCATIF : constantes ----
 * ⚠️ À vérifier sur impots.gouv.fr (régimes micro-foncier, micro-BIC, LMNP).
 */
export const LOCATIF = {
  // Abattements forfaitaires des régimes micro
  microFoncier: { abattement: 30, plafondRecettes: 15000 },      // location nue
  microBIC: { abattement: 50, plafondRecettes: 77700 },          // meublé non professionnel
  prelevementsSociaux: 17.2,                                     // % sur revenus fonciers
  // Charges courantes estimées (% du loyer annuel) si l'utilisateur ne les détaille pas
  chargesParDefautPourcent: 25,
};

/**
 * ---- ÉPARGNE : constantes ----
 * ⚠️ Taux des livrets révisés par l'État (1er février / 1er août) : à vérifier sur
 * service-public.fr avant mise en ligne.
 */
export const EPARGNE = {
  livretA: { taux: 1.7, plafond: 22950 },
  ldds: { taux: 1.7, plafond: 12000 },
  lep: { taux: 3.5, plafond: 10000 },
  pel: { taux: 1.75 },
  fiscaliteAssuranceVie: 17.2,   // prélèvements sociaux
  flatTax: 30,                   // PFU (12,8 % IR + 17,2 % PS)
};

/**
 * ---- TVA : taux en vigueur ----
 */
export const TAUX_TVA = [
  { taux: 20, libelle: "Taux normal (20 %)", exemple: "La plupart des biens et services" },
  { taux: 10, libelle: "Taux intermédiaire (10 %)", exemple: "Restauration, transport, travaux de rénovation" },
  { taux: 5.5, libelle: "Taux réduit (5,5 %)", exemple: "Alimentation, livres, énergie, travaux d'amélioration énergétique" },
  { taux: 2.1, libelle: "Taux super-réduit (2,1 %)", exemple: "Médicaments remboursables, presse" },
];

/**
 * ---- CONGÉS PAYÉS ET PRÉAVIS ----
 * Sources : Code du travail (art. L3141-3, L1234-1). À vérifier sur service-public.fr.
 */
export const CONGES = {
  joursOuvrablesParMois: 2.5,   // 30 jours ouvrables / an
  joursOuvresParMois: 2.08,     // 25 jours ouvrés / an
  maxOuvrables: 30,
  maxOuvres: 25,
  tauxIndemnite: 10,            // règle du 1/10e de la rémunération brute
};

export const PREAVIS_LICENCIEMENT = [
  { ancienneteMoisMin: 0, ancienneteMoisMax: 6, duree: "Selon convention ou usage", mois: 0 },
  { ancienneteMoisMin: 6, ancienneteMoisMax: 24, duree: "1 mois", mois: 1 },
  { ancienneteMoisMin: 24, ancienneteMoisMax: null, duree: "2 mois", mois: 2 },
];

/**
 * ---- PLUS-VALUE IMMOBILIÈRE ----
 * Abattements pour durée de détention. Source : impots.gouv.fr (art. 150 VC du CGI).
 */
export const PLUS_VALUE = {
  tauxIR: 19,
  tauxPS: 17.2,
  // Impôt sur le revenu : 6 %/an de la 6e à la 21e année, 4 % la 22e → exonération à 22 ans
  // Prélèvements sociaux : 1,65 %/an de la 6e à la 21e, 1,60 % la 22e, 9 %/an de la 23e à la 30e
  forfaitTravaux: 15,        // % du prix d'acquisition si détention > 5 ans
  forfaitFraisAcquisition: 7.5, // % forfaitaire si frais réels non justifiés
  // Surtaxe sur les plus-values élevées (au-delà de 50 000 €)
  seuilSurtaxe: 50000,
};

/**
 * ---- PRIME D'ACTIVITÉ ----
 * ⚠️ Montants revalorisés chaque avril : vérifier sur caf.fr / service-public.fr.
 */
export const PRIME_ACTIVITE = {
  montantForfaitaire: 646.52,        // personne seule sans enfant
  majorationConjoint: 0.5,           // +50 %
  majoration1erEnfant: 0.3,          // +30 %
  majoration2eEnfant: 0.3,
  majorationEnfantSuivant: 0.4,      // +40 % à partir du 3e
  bonificationMax: 187.16,           // bonification individuelle max
  seuilBonification: 0.5,            // s'active à partir de 0,5 SMIC
  plafondBonification: 1.2,          // maximale à 1,2 SMIC net
  tauxRevenusPro: 0.61,              // 61 % des revenus d'activité pris en compte
  forfaitLogement: [0.12, 0.16, 0.169], // % du forfait selon composition foyer
  montantMinimalVerse: 15,           // en dessous, pas de versement
};

/**
 * ---- RETRAITE (réforme 2023) ----
 * ⚠️ Vérifier sur info-retraite.fr et l'Assurance retraite.
 */
export const RETRAITE = {
  ageLegalParAnnee: [
    { neAvant: 1961, age: 62, mois: 0, trimestres: 168 },
    { neAvant: 1962, age: 62, mois: 3, trimestres: 169 },
    { neAvant: 1963, age: 62, mois: 6, trimestres: 170 },
    { neAvant: 1964, age: 62, mois: 9, trimestres: 171 },
    { neAvant: 1965, age: 63, mois: 0, trimestres: 172 },
    { neAvant: 1966, age: 63, mois: 3, trimestres: 172 },
    { neAvant: 1967, age: 63, mois: 6, trimestres: 172 },
    { neAvant: 1968, age: 63, mois: 9, trimestres: 172 },
    { neAvant: 9999, age: 64, mois: 0, trimestres: 172 },
  ],
  ageTauxPleinAutomatique: 67,
  tauxPlein: 50,                 // % du salaire annuel moyen (régime général)
  decotePartrimestre: 1.25,      // % de décote par trimestre manquant
  surcoteParTrimestre: 1.25,     // % de surcote par trimestre supplémentaire
  maxTrimestresDecote: 20,
};

/**
 * ---- PRÊT À TAUX ZÉRO (PTZ) ----
 * ⚠️ Dispositif régulièrement réformé : vérifier sur service-public.fr / anil.org.
 */
export type ZonePTZ = "A bis" | "A" | "B1" | "B2" | "C";

export const PTZ = {
  // Plafonds de revenu fiscal de référence par personne du foyer et par zone
  plafondsRevenus: {
    "A bis": [49000, 73500, 88200, 102900, 117600, 132300, 147000, 161700],
    A:       [49000, 73500, 88200, 102900, 117600, 132300, 147000, 161700],
    B1:      [34500, 51750, 62100, 72450, 82800, 93150, 103500, 113850],
    B2:      [31500, 47250, 56700, 66150, 75600, 85050, 94500, 103950],
    C:       [28500, 42750, 51300, 59850, 68400, 76950, 85500, 94050],
  } as Record<ZonePTZ, number[]>,
  // Coût maximal de l'opération retenu, par zone et taille du foyer
  plafondsOperation: {
    "A bis": [150000, 225000, 270000, 315000, 360000],
    A:       [150000, 225000, 270000, 315000, 360000],
    B1:      [135000, 202500, 243000, 283500, 324000],
    B2:      [110000, 165000, 198000, 231000, 264000],
    C:       [100000, 150000, 180000, 210000, 240000],
  } as Record<ZonePTZ, number[]>,
  // Quotité (part de l'opération finançable) selon la tranche de revenus
  quotites: [50, 40, 20, 0],
  villesExemples: {
    "A bis": "Paris et petite couronne",
    A: "Grandes métropoles tendues (Lyon, Marseille, Lille, Côte d'Azur, Genevois)",
    B1: "Grandes agglomérations (Bordeaux, Toulouse, Nantes, Rennes, Strasbourg)",
    B2: "Villes moyennes et périphéries",
    C: "Reste du territoire",
  } as Record<ZonePTZ, string>,
};

/**
 * ---- TAXE FONCIÈRE ----
 * Estimation : valeur locative cadastrale × 50 % × taux votés localement.
 */
export const TAXE_FONCIERE = {
  abattementForfaitaire: 50,      // % appliqué à la valeur locative brute
  tauxMoyenNational: 42,          // % cumulé (commune + intercommunalité) — ordre de grandeur
  taxeOrduresMoyenne: 9,          // % (TEOM)
};

/**
 * ---- PENSION ALIMENTAIRE ----
 * Table de référence indicative du ministère de la Justice
 * (% du revenu du débiteur, après déduction d'un minimum vital).
 */
export const PENSION_ALIMENTAIRE = {
  minimumVital: 646.52,   // RSA socle personne seule (déduit du revenu)
  // Taux par nombre d'enfants et amplitude du droit de visite
  taux: {
    reduit: [5.9, 4.7, 4.0, 3.4, 3.0],       // droit de visite réduit
    classique: [9.0, 7.8, 6.7, 5.9, 5.3],    // droit de visite et hébergement classique
    alterne: [5.4, 4.7, 4.0, 3.5, 3.2],      // résidence alternée
  },
};
