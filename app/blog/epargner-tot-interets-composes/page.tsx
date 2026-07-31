import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("epargner-tot-interets-composes")!;
export const metadata: Metadata = {
  title: meta.titre, description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Prenons deux personnes qui épargnent 200 € par mois sur un support rapportant 5 % par an.
        La première commence à 25 ans et s'arrête à 35 ans : dix ans d'effort, 24 000 € versés,
        puis plus rien — elle laisse simplement dormir son capital. La seconde commence à 35 ans
        et verse sans interruption jusqu'à 65 ans : trente ans d'effort, 72 000 € versés, trois
        fois plus que la première.
      </p>

      <h2 className="font-display text-2xl font-bold">Le résultat contredit l'intuition</h2>
      <p>
        À 65 ans, leurs capitaux sont du même ordre de grandeur. Celle qui a versé trois fois
        moins d'argent obtient un résultat comparable, parfois supérieur. La différence ne vient
        ni du montant, ni de la discipline, ni du rendement : elle vient des quarante années
        laissées aux premiers versements pour se composer, contre trente au maximum pour les
        seconds — et bien moins pour ceux effectués en fin de parcours.
      </p>

      <h2 className="font-display text-2xl font-bold">Pourquoi la courbe s'emballe</h2>
      <p>
        Les intérêts composés produisent des intérêts sur les intérêts. Les premières années,
        l'effet est presque invisible : votre capital ressemble à la somme de vos versements. Puis
        l'écart se creuse, lentement d'abord, puis de façon spectaculaire. Sur un horizon long,
        la majeure partie du capital final ne provient plus de ce que vous avez versé mais de ce
        que le temps a produit. C'est pourquoi les dix dernières années d'un plan d'épargne
        rapportent souvent davantage que les vingt premières.
      </p>

      <h2 className="font-display text-2xl font-bold">Ce que cela implique concrètement</h2>
      <p>
        La conséquence pratique est contre-intuitive : commencer petit et tôt bat presque
        toujours commencer gros et tard. Cinquante euros par mois à vingt-cinq ans valent mieux
        que d'attendre d'avoir « les moyens de vraiment épargner ». Le second enseignement, c'est
        que le temps perdu ne se rattrape jamais complètement : à cinquante ans, il faut un
        effort d'épargne considérablement plus élevé pour atteindre le même résultat, parce que
        les années de composition manquent.
      </p>

      <h2 className="font-display text-2xl font-bold">Les nuances honnêtes</h2>
      <p>
        Ces démonstrations reposent sur un rendement constant, ce qui n'existe pas dans la
        réalité : les marchés fluctuent, les taux des livrets évoluent, et un rendement élevé
        s'accompagne toujours d'un risque de perte. Il faut aussi raisonner net d'inflation — un
        placement à 4 % avec 2 % d'inflation ne vous enrichit réellement que de 2 %. Enfin,
        épargner suppose d'abord de ne pas avoir de crédit à la consommation coûteux en cours :
        rembourser une dette à 6 % rapporte davantage, et sans risque, que placer à 4 %.
      </p>

      <p>
        Faites tourner vos propres chiffres avec le{" "}
        <Link href="/epargne/interets-composes/" className="font-semibold text-marine hover:underline">
          calculateur d'intérêts composés
        </Link>{" "}
        : le graphique sépare visuellement ce que vous avez versé de ce que le temps a produit.
      </p>
    </ArticleLayout>
  );
}
