/**
 * Manifeste des articles du blog — pour l'index, le sitemap et les liens "articles liés".
 * Chaque article vit dans app/blog/<slug>/page.tsx
 */
export interface ArticleMeta {
  slug: string;
  titre: string;
  extrait: string;
  date: string; // ISO
  categorie: string;
  lectureMin: number;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "comprendre-sa-fiche-de-paie",
    titre: "Comprendre sa fiche de paie ligne par ligne (2026)",
    extrait:
      "Brut, net imposable, CSG déductible ou non : ce que signifie vraiment chaque ligne de votre bulletin, et les 3 chiffres à vérifier chaque mois.",
    date: "2026-01-10",
    categorie: "Salaire",
    lectureMin: 6,
  },
  {
    slug: "versement-liberatoire-ou-bareme",
    titre: "Auto-entrepreneur : versement libératoire ou barème classique ?",
    extrait:
      "1 à 2,2 % du CA tout de suite, ou le barème progressif plus tard ? La réponse dépend d'un seul chiffre — et beaucoup d'indépendants se trompent.",
    date: "2026-01-18",
    categorie: "Auto-entrepreneur",
    lectureMin: 5,
  },
  {
    slug: "taux-endettement-35-pourcent",
    titre: "Taux d'endettement à 35 % : comment la banque calcule vraiment",
    extrait:
      "Quels revenus comptent, quelles charges pèsent, et les marges de manœuvre que les banques gardent pour déroger à la règle du HCSF.",
    date: "2026-01-25",
    categorie: "Immobilier",
    lectureMin: 6,
  },
  {
    slug: "rupture-conventionnelle-negocier",
    titre: "Rupture conventionnelle : comment négocier au-dessus du minimum",
    extrait:
      "Le minimum légal n'est qu'un plancher. Arguments, timing, erreurs à éviter : la méthode pour négocier une indemnité à la hauteur de votre départ.",
    date: "2026-02-02",
    categorie: "Emploi",
    lectureMin: 7,
  },
  {
    slug: "prime-activite-non-recours",
    titre: "Prime d'activité : pourquoi un tiers des ayants droit ne la touche pas",
    extrait:
      "Elle n'est jamais automatique, jamais rétroactive, et beaucoup de salariés ignorent qu'ils y ont droit. Le point sur les idées fausses.",
    date: "2026-02-10",
    categorie: "Emploi",
    lectureMin: 5,
  },
  {
    slug: "frais-notaire-reduire",
    titre: "Frais de notaire : 3 leviers légaux pour les réduire",
    extrait:
      "Mobilier déduit, frais d'agence séparés, forfait travaux : ce que votre notaire ne vous proposera pas spontanément.",
    date: "2026-02-18",
    categorie: "Immobilier",
    lectureMin: 6,
  },
  {
    slug: "tranche-marginale-imposition",
    titre: "« Je suis dans la tranche à 30 % » : la plus grosse erreur sur l'impôt",
    extrait:
      "Non, une augmentation ne peut pas vous faire perdre de l'argent. Comprendre la progressivité une bonne fois pour toutes.",
    date: "2026-02-25",
    categorie: "Impôts",
    lectureMin: 5,
  },
  {
    slug: "auto-entrepreneur-premiere-annee",
    titre: "Auto-entrepreneur : les 7 erreurs qui coûtent cher la première année",
    extrait:
      "ACRE oubliée, trésorerie mal provisionnée, seuil de TVA franchi sans le voir : le guide de survie du nouvel indépendant.",
    date: "2026-03-04",
    categorie: "Auto-entrepreneur",
    lectureMin: 7,
  },
  {
    slug: "epargner-tot-interets-composes",
    titre: "Commencer à épargner à 25 ou à 35 ans : l'écart est vertigineux",
    extrait:
      "Deux épargnants, deux stratégies opposées, et un résultat qui contredit l'intuition. La démonstration chiffrée.",
    date: "2026-03-12",
    categorie: "Épargne",
    lectureMin: 5,
  },
  {
    slug: "retraite-relever-carriere",
    titre: "Retraite : pourquoi consulter son relevé de carrière dès 45 ans",
    extrait:
      "Trimestres manquants, périodes oubliées, rachat d'années d'études : ce qui se corrige encore à 45 ans et plus du tout à 62.",
    date: "2026-03-20",
    categorie: "Emploi",
    lectureMin: 6,
  },
];

export function articleParSlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
