import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("nouveau-taux-prelevement-source-septembre")!;
export const metadata: Metadata = {
  title: meta.titre, description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Chaque année, la même mécanique se rejoue sans que grand monde ne la remarque : au 1er
        septembre, le taux prélevé sur votre salaire change. Celui appliqué de janvier à août
        2026 reposait encore sur vos revenus de 2024 ; celui qui prend le relais découle de la
        déclaration que vous avez faite ce printemps, sur vos revenus 2025. Si votre situation a
        bougé entre-temps, l'écart peut être brutal.
      </p>

      <h2 className="font-display text-2xl font-bold">Pourquoi ce décalage de deux ans</h2>
      <p>
        Le prélèvement à la source est instantané sur le versement, mais pas sur le calcul du
        taux. L'administration applique le taux issu de la dernière déclaration traitée : de
        janvier à août, elle n'a encore que vos revenus de l'avant-dernière année. Une fois la
        campagne de printemps close et les avis émis, elle bascule sur les revenus les plus
        récents. C'est ce basculement qui intervient en septembre, et il est automatique : vous
        n'avez aucune démarche à faire pour qu'il s'applique.
      </p>

      <h2 className="font-display text-2xl font-bold">Les trois scénarios de septembre</h2>
      <p>
        <strong>Vos revenus ont augmenté en 2025.</strong> Le nouveau taux monte, votre net à
        payer baisse dès la paie de septembre. C'est logique mais souvent mal vécu, parce que la
        baisse arrive d'un coup et sans préavis.
      </p>
      <p>
        <strong>Vos revenus ont baissé en 2025.</strong> Le taux redescend et votre net remonte.
        Si vous aviez trop payé, un remboursement vous a par ailleurs été versé fin juillet ou
        début août.
      </p>
      <p>
        <strong>Rien n'a changé.</strong> Le taux bouge de quelques dixièmes au plus, effet de la
        revalorisation annuelle du barème. Vous ne verrez presque rien.
      </p>

      <h2 className="font-display text-2xl font-bold">Le cas qui coûte cher : la baisse de revenus en 2026</h2>
      <p>
        Voilà l'angle mort du dispositif. Le taux de septembre reflète 2025 — pas votre situation
        actuelle. Si vous êtes passé à temps partiel cette année, si vous avez perdu une prime
        récurrente, si vous vous êtes mis à votre compte, le taux appliqué reste calé sur une
        année où vous gagniez davantage. Vous avancez alors de l'argent à l'État, remboursé
        seulement à l'été 2027. Sur plusieurs mois, cela représente facilement plusieurs centaines
        d'euros immobilisés.
      </p>
      <p>
        La solution s'appelle la modulation : depuis votre espace sur impots.gouv.fr, rubrique
        « Gérer mon prélèvement à la source », vous estimez vos revenus réels de l'année et
        demandez un taux ajusté. Deux points à connaître. D'abord, la modulation à la baisse n'est
        recevable que si l'écart dépasse un seuil — une variation marginale ne sera pas acceptée.
        Ensuite, l'estimation vous engage : si vous sous-estimez volontairement vos revenus, des
        pénalités peuvent s'appliquer. Restez honnête et prudent dans vos projections.
      </p>

      <h2 className="font-display text-2xl font-bold">Ce que vous devez vérifier ce mois-ci</h2>
      <p>
        Votre avis d'impôt arrive entre fin juillet et fin août. Trois lignes méritent votre
        attention. Le <strong>montant d'impôt final</strong> d'abord : s'il dépasse ce qui a été
        prélevé, un solde vous sera réclamé à l'automne, échelonné de septembre à décembre s'il
        est important. Le <strong>nouveau taux</strong> ensuite, qui s'appliquera dès septembre.
        Enfin, pour les couples mariés ou pacsés, la <strong>répartition entre conjoints</strong> :
        un taux individualisé s'applique désormais par défaut, ce qui ne change rien au total dû
        par le foyer mais modifie la part prélevée sur chacun des deux salaires.
      </p>

      <h2 className="font-display text-2xl font-bold">Anticipez plutôt que de subir</h2>
      <p>
        Le réflexe utile prend cinq minutes : reportez le nouveau taux de votre avis dans un
        simulateur et regardez ce que deviendra votre net de septembre. Si la baisse vous gêne,
        vous saurez à quoi vous attendre plutôt que de la découvrir sur le bulletin. Et si votre
        situation 2026 diffère nettement de 2025, la demande de modulation vaut clairement le
        quart d'heure qu'elle prend.
      </p>

      <p>
        Testez l'impact sur votre salaire avec le{" "}
        <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
          calculateur brut en net
        </Link>{" "}
        — il intègre le taux de prélèvement à la source — et vérifiez la cohérence du montant
        annuel avec le{" "}
        <Link href="/impots/impot-revenu/" className="font-semibold text-marine hover:underline">
          calculateur d'impôt sur le revenu
        </Link>. Pour comprendre pourquoi votre taux n'est pas celui de votre tranche, lisez aussi{" "}
        <Link href="/blog/tranche-marginale-imposition/" className="font-semibold text-marine hover:underline">
          notre article sur la progressivité
        </Link>.
      </p>
    </ArticleLayout>
  );
}
