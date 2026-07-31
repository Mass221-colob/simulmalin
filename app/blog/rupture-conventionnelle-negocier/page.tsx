import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("rupture-conventionnelle-negocier")!;

export const metadata: Metadata = {
  title: meta.titre,
  description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        La rupture conventionnelle a un immense mérite : contrairement à la démission, elle ouvre
        droit au chômage et à une indemnité. Mais elle a aussi un piège bien connu des employeurs
        et méconnu des salariés : le montant proposé en premier est presque toujours le minimum
        légal. Or ce minimum n'est qu'un plancher — tout le reste est négociation.
      </p>

      <h2 className="font-display text-2xl font-bold">Connaître son plancher avant de parler</h2>
      <p>
        L'indemnité spécifique de rupture conventionnelle ne peut pas être inférieure à
        l'indemnité légale de licenciement : un quart de mois de salaire de référence par année
        d'ancienneté jusqu'à dix ans, un tiers au-delà. Première étape avant tout entretien :
        calculer ce plancher au centime près, en vérifiant le salaire de référence le plus
        favorable (moyenne des 12 derniers mois ou des 3 derniers) et en comptant l'ancienneté
        jusqu'à la date de rupture envisagée. Vérifiez aussi votre convention collective : si
        elle prévoit une indemnité de licenciement supérieure au légal, c'est elle qui devient
        votre plancher.
      </p>

      <h2 className="font-display text-2xl font-bold">Les arguments qui font monter le montant</h2>
      <p>
        La négociation ne se joue pas sur la sympathie mais sur le <strong>coût de
        l'alternative</strong> pour l'employeur. Si la rupture vous est proposée (réorganisation,
        mésentente), l'alternative est un licenciement : procédure, préavis, risque de
        contentieux prud'homal — un risque qui se chiffre en mois de salaire. Une demande à
        1,5 ou 2 fois le minimum est alors parfaitement audible. Autres leviers : une ancienneté
        importante, des compétences difficiles à remplacer, des heures supplémentaires ou congés
        non soldés, un contexte de départ dont l'entreprise préfère qu'il reste serein. Si c'est
        vous qui demandez la rupture, le rapport de force s'inverse : l'employeur peut refuser,
        et le minimum devient souvent le maximum réaliste.
      </p>

      <h2 className="font-display text-2xl font-bold">Le calendrier et les pièges de procédure</h2>
      <p>
        La procédure protège les deux parties : un ou plusieurs entretiens, la signature du
        formulaire, puis <strong>15 jours calendaires de rétractation</strong> pour chacun, et
        enfin l'homologation par l'administration sous 15 jours ouvrables. Comptez cinq à six
        semaines entre la signature et le départ effectif. Trois pièges classiques : signer le
        jour même de l'entretien (rien ne l'impose — prenez le temps de vérifier les montants),
        négliger la date de rupture (la repousser de quelques semaines peut faire franchir un
        seuil d'ancienneté), et oublier que l'indemnité au-delà du minimum légal reste largement
        exonérée d'impôt mais peut supporter la CSG/CRDS — le net final mérite d'être calculé
        avant d'accepter.
      </p>

      <h2 className="font-display text-2xl font-bold">Après la signature : sécuriser la suite</h2>
      <p>
        La rupture conventionnelle ouvre droit à l'allocation chômage après un délai de carence
        qui dépend notamment de l'indemnité « supra-légale » perçue : plus vous négociez
        au-dessus du minimum, plus la carence peut s'allonger (jusqu'à 150 jours). Ce n'est pas
        une raison de négocier moins — l'indemnité reste acquise quand l'allocation est
        temporaire — mais c'est un paramètre à intégrer dans votre plan de trésorerie des
        premiers mois.
      </p>

      <p>
        Commencez par chiffrer votre plancher avec le{" "}
        <Link href="/emploi/indemnite-licenciement/" className="font-semibold text-marine hover:underline">
          calculateur d'indemnité
        </Link>{" "}
        (mode « rupture conventionnelle »), puis anticipez votre budget d'après avec le{" "}
        <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
          calculateur brut en net
        </Link>{" "}
        pour évaluer vos futures offres.
      </p>
    </ArticleLayout>
  );
}
