import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("retraite-relever-carriere")!;
export const metadata: Metadata = {
  title: meta.titre, description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        La retraite paraît lointaine à quarante-cinq ans, et c'est exactement pour cette raison
        qu'il faut s'y intéresser à cet âge : c'est la dernière période où les erreurs de carrière
        peuvent encore être corrigées. À soixante ans, la plupart des recours sont fermés.
      </p>

      <h2 className="font-display text-2xl font-bold">Ce que contient votre relevé</h2>
      <p>
        Accessible gratuitement sur info-retraite.fr, le relevé de carrière recense l'ensemble
        des trimestres validés auprès de tous vos régimes, année par année, employeur par
        employeur. C'est le document qui déterminera votre taux de pension — et il comporte plus
        souvent qu'on ne le croit des trous : jobs étudiants déclarés partiellement, périodes
        d'intérim, stages, années à l'étranger, service national, périodes de chômage non
        indemnisé, congés parentaux mal reportés.
      </p>

      <h2 className="font-display text-2xl font-bold">Pourquoi quelques trimestres pèsent si lourd</h2>
      <p>
        Chaque trimestre manquant au moment du départ réduit votre taux de 1,25 point de façon
        définitive. Huit trimestres manquants font tomber le taux de 50 % à 40 % : sur une
        pension de 1 500 €, cela représente environ 300 € de moins chaque mois, pendant vingt ou
        vingt-cinq ans. Rapporté à l'ensemble de la retraite, l'enjeu se chiffre en dizaines de
        milliers d'euros. C'est sans doute le calcul financier le plus rentable qu'un salarié
        puisse faire dans sa vie — et il prend une heure.
      </p>

      <h2 className="font-display text-2xl font-bold">Ce qui se corrige encore</h2>
      <p>
        Une période manquante peut être régularisée sur présentation de bulletins de salaire ou
        de contrats : d'où l'importance d'avoir conservé ses documents, et de faire la démarche
        tant que les employeurs existent encore et que les archives sont accessibles. Les années
        d'études supérieures peuvent par ailleurs être rachetées, de même que certaines années
        incomplètes — une opération coûteuse dont l'intérêt dépend de votre situation, mais qui
        peut être fiscalement avantageuse puisque le rachat est déductible du revenu imposable.
      </p>

      <h2 className="font-display text-2xl font-bold">Le calendrier à retenir</h2>
      <p>
        Vers 45 ans : première vérification complète du relevé et régularisation des anomalies.
        À 55 ans : simulation de plusieurs scénarios de départ pour arbitrer entre âge légal,
        taux plein et surcote. Deux ans avant le départ : demande d'estimation officielle et
        constitution du dossier. Entre ces jalons, un principe simple — conservez tous vos
        bulletins de salaire, définitivement. Ils restent la seule preuve opposable en cas de
        litige sur un trimestre.
      </p>

      <p>
        Testez différents âges de départ avec le{" "}
        <Link href="/emploi/retraite/" className="font-semibold text-marine hover:underline">
          calculateur retraite
        </Link>{" "}
        pour visualiser l'effet de la décote, et préparez votre complément de revenu avec le{" "}
        <Link href="/epargne/interets-composes/" className="font-semibold text-marine hover:underline">
          simulateur d'épargne
        </Link>.
      </p>
    </ArticleLayout>
  );
}
