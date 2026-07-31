import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("comprendre-sa-fiche-de-paie")!;

export const metadata: Metadata = {
  title: meta.titre,
  description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        La fiche de paie française est réputée pour être l'une des plus complexes du monde — et
        pourtant, une fois qu'on sait où regarder, elle raconte une histoire simple : celle du
        chemin qui mène de votre salaire brut au montant qui arrive sur votre compte. Voici
        comment la lire ligne par ligne, sans jargon.
      </p>

      <h2 className="font-display text-2xl font-bold">Le haut du bulletin : le brut et ce qu'il contient</h2>
      <p>
        Tout commence par le <strong>salaire de base</strong>, celui de votre contrat. S'y
        ajoutent éventuellement les heures supplémentaires, les primes et les avantages en nature
        (véhicule, logement, titres-restaurant côté employeur). La somme forme le{" "}
        <strong>salaire brut</strong> — le chiffre de référence pour presque tous vos droits :
        indemnités de licenciement, retraite, chômage. C'est aussi lui qu'il faut annoncer en
        entretien d'embauche, jamais le net.
      </p>

      <h2 className="font-display text-2xl font-bold">Le bloc central : les cotisations, à quoi elles servent</h2>
      <p>
        Vient ensuite le tableau des cotisations, regroupées par risque couvert. La{" "}
        <strong>santé</strong> (maladie, invalidité) est aujourd'hui essentiellement financée par
        l'employeur et la CSG. La <strong>retraite</strong> pèse le plus lourd côté salarié :
        assurance vieillesse de base (6,90 % plafonnés + 0,40 % sur la totalité) et retraite
        complémentaire AGIRC-ARRCO. Le <strong>chômage</strong> est financé par l'employeur
        depuis 2018. Chaque ligne affiche une base, un taux et deux colonnes de montants : votre
        part et celle de l'employeur — qui paie en réalité 25 à 42 % de charges patronales en
        plus de votre brut.
      </p>
      <p>
        Deux lignes méritent une attention particulière : la <strong>CSG déductible</strong>{" "}
        (6,8 %) et la <strong>CSG/CRDS non déductible</strong> (2,9 %). Toutes deux se calculent
        sur 98,25 % du brut. La différence ? La première est déduite de votre revenu imposable,
        la seconde non — c'est pour cela que votre « net imposable » est plus élevé que votre
        net versé.
      </p>

      <h2 className="font-display text-2xl font-bold">Le bas du bulletin : les trois « nets »</h2>
      <p>
        La fiche moderne affiche trois montants qu'il ne faut plus confondre. Le{" "}
        <strong>net social</strong> sert de référence pour les demandes de RSA ou de prime
        d'activité. Le <strong>net à payer avant impôt</strong> est votre salaire après
        cotisations. Le <strong>net payé</strong> est ce qui arrive sur votre compte, après
        déduction du prélèvement à la source calculé sur le net imposable, au taux transmis par
        l'administration fiscale.
      </p>

      <h2 className="font-display text-2xl font-bold">Les 3 vérifications à faire chaque mois</h2>
      <p>
        <strong>1. Le taux de prélèvement à la source</strong> : après un mariage, une naissance
        ou une baisse de revenus, il doit être mis à jour sur impots.gouv.fr — sinon vous faites
        une avance de trésorerie à l'État. <strong>2. La base des heures</strong> : 151,67 h pour
        un temps plein ; toute heure supplémentaire doit apparaître majorée (+25 % puis +50 %).{" "}
        <strong>3. Le net imposable cumulé</strong> : c'est lui qui pré-remplira votre
        déclaration de revenus au printemps — un écart se corrige bien plus facilement en cours
        d'année.
      </p>

      <p>
        Pour vérifier que votre net correspond bien à votre brut, utilisez notre{" "}
        <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
          calculateur brut en net
        </Link>{" "}
        : il reproduit ligne par ligne le calcul de votre bulletin, et vous montre en un instant
        si un écart mérite une question au service paie.
      </p>
    </ArticleLayout>
  );
}
