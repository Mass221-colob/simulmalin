import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("frais-notaire-reduire")!;
export const metadata: Metadata = {
  title: meta.titre, description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Sur un achat dans l'ancien, les frais d'acquisition représentent 7 à 8 % du prix. La
        marge de manœuvre est réelle mais étroite : les droits de mutation, qui en constituent
        l'essentiel, sont fixés par la loi et intouchables. En revanche, l'assiette sur laquelle
        ils se calculent, elle, peut légitimement être réduite. Voici les trois leviers.
      </p>

      <h2 className="font-display text-2xl font-bold">1. Déduire la valeur du mobilier</h2>
      <p>
        Les droits de mutation ne portent que sur l'immobilier. Si le vendeur laisse une cuisine
        équipée, de l'électroménager, des meubles sur mesure ou une véranda démontable, leur
        valeur peut être extraite du prix de vente et mentionnée séparément dans l'acte. Sur
        10 000 € de mobilier, l'économie approche 750 €. Deux conditions à respecter
        scrupuleusement : établir un inventaire détaillé avec les factures ou une estimation
        justifiée, et rester raisonnable — l'administration fiscale requalifie les valorisations
        manifestement gonflées, et le redressement coûte plus cher que l'économie.
      </p>

      <h2 className="font-display text-2xl font-bold">2. Séparer les frais d'agence</h2>
      <p>
        Lorsque les honoraires d'agence sont à la charge de l'acquéreur et payés directement à
        l'agence, ils sortent de l'assiette des droits de mutation. Cette configuration dépend de
        la rédaction du mandat : si le mandat prévoit des honoraires à la charge du vendeur,
        ils sont inclus dans le prix et donc taxés. Le sujet se négocie au moment du compromis,
        pas après — et sur des honoraires de 15 000 €, l'écart avoisine 1 100 €.
      </p>

      <h2 className="font-display text-2xl font-bold">3. Demander une remise sur les émoluments</h2>
      <p>
        C'est le levier le plus modeste mais il existe. Les notaires peuvent consentir une remise
        sur leurs émoluments, uniquement pour la part du prix dépassant 150 000 € et dans une
        limite réglementée. Sur une transaction importante, cela représente quelques centaines
        d'euros. À demander poliment en amont, sachant qu'un notaire n'est jamais tenu
        d'accepter — et que le reste du décompte sera strictement identique quelle que soit
        l'étude choisie.
      </p>

      <h2 className="font-display text-2xl font-bold">Le levier qui n'en est pas un</h2>
      <p>
        Chercher « un notaire moins cher » est une perte de temps : le barème des émoluments est
        national et les droits sont fiscaux. En revanche, un vrai levier existe en amont du
        choix du bien : acheter dans le neuf divise les frais par trois environ, puisque les
        droits de mutation y sont remplacés par une simple taxe de publicité foncière.
      </p>

      <p>
        Chiffrez précisément votre situation avec le{" "}
        <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
          calculateur de frais de notaire
        </Link>{" "}
        — il détaille exactement quelle part revient à l'État, à votre département et au notaire.
      </p>
    </ArticleLayout>
  );
}
