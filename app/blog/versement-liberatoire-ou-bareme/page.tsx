import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("versement-liberatoire-ou-bareme")!;

export const metadata: Metadata = {
  title: meta.titre,
  description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        C'est l'une des premières cases à cocher quand on crée sa micro-entreprise, et l'une des
        plus mal comprises : faut-il opter pour le versement libératoire de l'impôt sur le
        revenu ? La réponse tient en une règle simple — mais encore faut-il la connaître, car un
        mauvais choix peut vous coûter plusieurs centaines d'euros par an.
      </p>

      <h2 className="font-display text-2xl font-bold">Deux mécanismes très différents</h2>
      <p>
        <strong>Avec le versement libératoire</strong>, vous payez votre impôt en même temps que
        vos cotisations, en pourcentage fixe du chiffre d'affaires encaissé : 1 % en
        achat-revente, 1,7 % en prestations commerciales et artisanales, 2,2 % en libéral.
        L'impôt est soldé au fil de l'eau, définitivement — d'où le nom « libératoire ».
      </p>
      <p>
        <strong>Sans l'option</strong>, votre chiffre d'affaires est reporté sur la déclaration
        annuelle du foyer. L'administration applique un abattement forfaitaire pour frais
        (71 % en vente, 50 % en BIC services, 34 % en BNC), et le bénéfice ainsi calculé rejoint
        les autres revenus du foyer, soumis au barème progressif — avec ses tranches à 0 %,
        11 %, 30 % et au-delà.
      </p>

      <h2 className="font-display text-2xl font-bold">La règle de décision</h2>
      <p>
        Tout se joue sur votre <strong>taux d'imposition réel au barème</strong>. Si votre foyer
        n'est pas imposable — ce qui est le cas de près d'un foyer sur deux en France — le
        versement libératoire est une erreur pure : vous payez un impôt (1 à 2,2 % du CA) que le
        barème ne vous aurait jamais réclamé. À l'inverse, si votre foyer est confortablement
        installé dans la tranche à 11 % ou 30 % (grâce au salaire d'un conjoint, par exemple),
        le versement libératoire est presque toujours gagnant : 2,2 % du CA en libéral
        équivaut, après abattement de 34 %, à environ 3,3 % du bénéfice — bien moins que 11 %
        ou 30 %.
      </p>
      <p>
        Un exemple concret : un consultant en BNC facture 40 000 €. Au versement libératoire, il
        paie 880 € d'impôt. Au barème, son bénéfice imposable est de 26 400 € ; célibataire sans
        autre revenu, son impôt serait d'environ 1 700 € — le versement libératoire lui fait
        gagner plus de 800 €. Mais si ce même consultant était non imposable (enfants, revenus
        modestes du foyer), le barème lui aurait coûté 0 €.
      </p>

      <h2 className="font-display text-2xl font-bold">Les conditions et le piège du plafond</h2>
      <p>
        L'option n'est pas ouverte à tous : votre revenu fiscal de référence de l'avant-dernière
        année ne doit pas dépasser un plafond (environ 28 800 € par part). L'option se prend à
        la création ou avant le 30 septembre pour l'année suivante, auprès de l'URSSAF. Et
        attention au faux ami : le versement libératoire ne dispense pas de déclarer le CA sur
        la déclaration annuelle — il y figure pour le calcul du taux appliqué aux autres revenus
        du foyer.
      </p>

      <p>
        Avant de choisir, faites tourner les deux scénarios avec vos vrais chiffres : notre{" "}
        <Link href="/entrepreneur/charges-auto-entrepreneur/" className="font-semibold text-marine hover:underline">
          calculateur auto-entrepreneur
        </Link>{" "}
        montre l'impact du versement libératoire sur votre net, et le{" "}
        <Link href="/impots/impot-revenu/" className="font-semibold text-marine hover:underline">
          calculateur d'impôt sur le revenu
        </Link>{" "}
        vous donne ce que le barème coûterait à votre foyer. Dix minutes qui peuvent valoir
        plusieurs centaines d'euros chaque année.
      </p>
    </ArticleLayout>
  );
}
