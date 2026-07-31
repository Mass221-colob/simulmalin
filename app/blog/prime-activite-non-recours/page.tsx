import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("prime-activite-non-recours")!;
export const metadata: Metadata = {
  title: meta.titre, description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        C'est l'un des paradoxes les plus coûteux de notre système social : une aide conçue pour
        les travailleurs modestes, dotée de plusieurs milliards d'euros, et dont une part
        importante n'atteint jamais ses destinataires. Non par complexité administrative
        insurmontable, mais à cause de quelques idées fausses tenaces.
      </p>

      <h2 className="font-display text-2xl font-bold">Idée fausse n°1 : « c'est pour les chômeurs »</h2>
      <p>
        C'est exactement l'inverse. La prime d'activité récompense le travail : il faut exercer
        une activité professionnelle pour y prétendre. Salariés, apprentis, auto-entrepreneurs,
        agents publics, étudiants salariés sous conditions — tous peuvent être concernés. La
        confusion avec le RSA, qui s'adresse aux personnes sans activité, prive de nombreux
        travailleurs d'un complément auquel ils ont pleinement droit.
      </p>

      <h2 className="font-display text-2xl font-bold">Idée fausse n°2 : « je gagne trop »</h2>
      <p>
        Le seuil est plus haut qu'on ne l'imagine, surtout dès qu'il y a des enfants ou un seul
        salaire dans le couple. Une personne seule autour du SMIC est très souvent éligible. Un
        couple avec deux enfants dont un seul parent travaille peut l'être jusqu'à un niveau de
        revenu qui surprend beaucoup de gens. Le calcul dépend d'une combinaison de facteurs —
        composition du foyer, revenus de chacun, aide au logement — qu'aucune règle mentale
        simple ne résume : seule une simulation permet de trancher.
      </p>

      <h2 className="font-display text-2xl font-bold">Idée fausse n°3 : « ce serait automatique »</h2>
      <p>
        Voilà le point le plus coûteux. L'administration ne vous contactera pas. La demande se
        fait exclusivement en ligne, sur caf.fr ou msa.fr, et rien ne se déclenche sans elle.
        Pire : la prime n'est pas rétroactive. Elle démarre le mois de votre demande, jamais
        avant. Six mois d'hésitation, ce sont six mensualités définitivement perdues — souvent
        plusieurs centaines d'euros.
      </p>

      <h2 className="font-display text-2xl font-bold">Ce qu'il faut retenir</h2>
      <p>
        La prime n'est pas imposable, ne se déclare pas aux impôts, et se recalcule chaque
        trimestre sur la base d'une déclaration de ressources rapide. Le seul effort réel, c'est
        cette déclaration trimestrielle — et l'oublier suspend le versement. En contrepartie, le
        montant peut atteindre plusieurs centaines d'euros par mois pour un foyer avec enfants.
      </p>

      <p>
        Cinq minutes suffisent pour lever le doute : notre{" "}
        <Link href="/emploi/prime-activite/" className="font-semibold text-marine hover:underline">
          simulateur de prime d'activité
        </Link>{" "}
        vous donne une estimation immédiate, et le{" "}
        <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
          calculateur brut en net
        </Link>{" "}
        vous fournit le revenu net à y renseigner.
      </p>
    </ArticleLayout>
  );
}
