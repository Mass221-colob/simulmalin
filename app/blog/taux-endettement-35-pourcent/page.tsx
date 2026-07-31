import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("taux-endettement-35-pourcent")!;

export const metadata: Metadata = {
  title: meta.titre,
  description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Depuis que le Haut Conseil de stabilité financière (HCSF) a rendu la règle contraignante,
        le chiffre de 35 % est devenu la clé de voûte de tout projet immobilier en France. Mais
        entre la règle théorique et la pratique des banques, il y a des subtilités qui peuvent
        faire basculer un dossier — dans un sens comme dans l'autre.
      </p>

      <h2 className="font-display text-2xl font-bold">La règle officielle</h2>
      <p>
        Vos charges d'emprunt — mensualité du nouveau prêt <strong>assurance emprunteur
        incluse</strong>, plus les mensualités de tous vos crédits en cours — ne doivent pas
        dépasser 35 % de vos revenus nets avant impôt. La durée du prêt est elle-même plafonnée
        à 25 ans (27 ans dans le neuf avec différé). Beaucoup d'emprunteurs oublient
        l'assurance dans leur calcul de coin de table : sur un gros capital, elle représente
        50 à 100 € par mois qui comptent dans les 35 %.
      </p>

      <h2 className="font-display text-2xl font-bold">Quels revenus comptent (et lesquels comptent à moitié)</h2>
      <p>
        Le salaire net en CDI compte en totalité, période d'essai terminée. Les revenus
        d'indépendant ou de CDD sont retenus sur la moyenne des deux ou trois dernières années —
        d'où l'importance des bilans pour les auto-entrepreneurs. Les <strong>revenus
        locatifs</strong> ne comptent généralement que pour 70 % (la décote couvre les périodes
        de vacance), et certaines primes variables sont moyennées ou écartées si elles ne sont
        pas récurrentes. Les pensions alimentaires reçues comptent ; celles versées s'ajoutent
        aux charges.
      </p>

      <h2 className="font-display text-2xl font-bold">La marge cachée : les 20 % de dérogation</h2>
      <p>
        Ce que peu d'emprunteurs savent : les banques disposent d'une <strong>marge de
        flexibilité de 20 %</strong> de leur production de crédits, qu'elles peuvent accorder en
        dérogeant à la règle des 35 %. Cette marge est réservée en priorité (à 70 %) aux achats
        de résidence principale et notamment aux primo-accédants. Concrètement : un dossier à
        37 % d'endettement avec un reste à vivre confortable, une épargne résiduelle et des
        revenus en progression peut passer — mais c'est la banque qui choisit ses dérogations,
        pas vous. Un bon dossier « hors norme » se négocie, idéalement avec un courtier.
      </p>

      <h2 className="font-display text-2xl font-bold">Le vrai juge de paix : le reste à vivre</h2>
      <p>
        Les 35 % ne sont qu'un filtre. La banque examine ensuite le <strong>reste à vivre</strong> :
        ce qui demeure chaque mois après la mensualité, rapporté à la composition du foyer. Un
        couple à 6 000 € de revenus endetté à 35 % conserve 3 900 € — très confortable. Une
        personne seule à 1 800 € endettée à 35 % ne garde que 1 170 € : le dossier peut être
        refusé malgré un taux d'endettement « dans les clous ». À l'inverse, les hauts revenus
        obtiennent plus facilement les dérogations, précisément grâce à ce critère.
      </p>

      <p>
        Pour situer votre projet, commencez par le{" "}
        <Link href="/immobilier/pret-immobilier/" className="font-semibold text-marine hover:underline">
          calculateur de capacité d'emprunt
        </Link>{" "}
        (mode « Combien emprunter ? ») qui applique exactement la règle des 35 % assurance
        incluse, puis ajoutez les{" "}
        <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
          frais de notaire
        </Link>{" "}
        pour obtenir le coût complet de l'opération.
      </p>
    </ArticleLayout>
  );
}
