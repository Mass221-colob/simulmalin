import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("tranche-marginale-imposition")!;
export const metadata: Metadata = {
  title: meta.titre, description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        « J'ai refusé l'augmentation, sinon je changeais de tranche et je perdais de l'argent. »
        Cette phrase, on l'entend chaque année dans les entreprises françaises. Elle repose sur
        une incompréhension du barème progressif — et elle conduit certains salariés à refuser
        des revenus supplémentaires par crainte d'un phénomène qui n'existe tout simplement pas.
      </p>

      <h2 className="font-display text-2xl font-bold">Le barème découpe, il ne bascule pas</h2>
      <p>
        L'impôt sur le revenu français fonctionne par tranches successives. Chaque euro gagné est
        taxé au taux de la tranche dans laquelle il tombe — et uniquement lui. Les premiers euros
        restent exonérés, les suivants sont taxés à 11 %, ceux d'après à 30 %, et ainsi de suite.
        Franchir un seuil ne requalifie jamais l'ensemble de vos revenus : seule la fraction
        au-dessus du seuil subit le taux supérieur.
      </p>
      <p>
        Concrètement : si vous dépassez de 100 € le seuil de la tranche à 30 %, vous payez 30 €
        d'impôt sur ces 100 € — et il vous en reste 70. Vous êtes plus riche, pas plus pauvre.
        Mathématiquement, il est impossible qu'une augmentation de salaire réduise votre revenu
        après impôt.
      </p>

      <h2 className="font-display text-2xl font-bold">Taux marginal et taux moyen : deux chiffres à ne pas confondre</h2>
      <p>
        Le taux marginal (TMI) est celui de votre tranche la plus haute : il s'applique au
        prochain euro gagné, et c'est le bon repère pour évaluer un choix — accepter une
        augmentation, déduire des frais réels, faire un don, opter pour le versement libératoire.
        Le taux moyen, lui, rapporte votre impôt total à votre revenu total : c'est ce que vous
        payez réellement, et il est toujours nettement inférieur. Un célibataire dans la tranche
        à 30 % a couramment un taux moyen autour de 11 % : il ne verse pas 30 % de ses revenus au
        fisc, loin de là.
      </p>

      <h2 className="font-display text-2xl font-bold">Où l'intuition a malgré tout raison</h2>
      <p>
        Le raisonnement du « seuil » n'est pas totalement infondé — il s'applique simplement
        ailleurs. Certaines prestations sociales, elles, fonctionnent bien avec des plafonds
        couperets : dépasser un revenu fiscal de référence de quelques euros peut faire perdre
        une bourse, une exonération ou une aide. Ce sont ces dispositifs, et non le barème de
        l'impôt, qui justifient parfois d'examiner attentivement un franchissement de seuil.
      </p>

      <p>
        Visualisez votre propre situation tranche par tranche avec le{" "}
        <Link href="/impots/impot-revenu/" className="font-semibold text-marine hover:underline">
          calculateur d'impôt sur le revenu
        </Link>{" "}
        : il affiche votre TMI et votre taux moyen côte à côte, et montre exactement comment
        votre revenu se répartit dans le barème.
      </p>
    </ArticleLayout>
  );
}
