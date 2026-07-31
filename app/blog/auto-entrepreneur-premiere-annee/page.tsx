import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { articleParSlug } from "@/data/articles";

const meta = articleParSlug("auto-entrepreneur-premiere-annee")!;
export const metadata: Metadata = {
  title: meta.titre, description: meta.extrait,
  alternates: { canonical: `/blog/${meta.slug}/` },
};

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p>
        Le régime de la micro-entreprise est simple à créer — quelques minutes en ligne — et
        c'est précisément ce qui piège. Les erreurs de la première année ne se voient pas tout
        de suite : elles apparaissent au premier appel de cotisations, au premier contrôle de
        seuil, ou l'année suivante au moment de la déclaration. Voici les sept plus fréquentes.
      </p>

      <h2 className="font-display text-2xl font-bold">1. Confondre chiffre d'affaires et revenu</h2>
      <p>
        C'est l'erreur fondatrice, celle dont découlent la plupart des autres. Un consultant qui
        facture 4 000 € par mois n'en conserve pas 4 000. Après cotisations sociales, il lui
        reste environ 2 950 €, avant impôt, avant cotisation foncière des entreprises, avant
        mutuelle — et sans congés payés ni chômage. La règle de survie : votre tarif doit
        dépasser d'au moins 40 à 50 % ce que vous viseriez en salaire net.
      </p>

      <h2 className="font-display text-2xl font-bold">2. Oublier de demander l'ACRE</h2>
      <p>
        Cette exonération réduit d'environ moitié vos cotisations sociales pendant les premiers
        trimestres. Pour les micro-entrepreneurs, elle n'est pas automatique : la demande doit
        être faite dans les 45 jours suivant la création. Passé ce délai, l'avantage est perdu
        définitivement — plusieurs milliers d'euros sur une première année active.
      </p>

      <h2 className="font-display text-2xl font-bold">3. Ne pas provisionner les cotisations</h2>
      <p>
        L'argent encaissé n'est pas l'argent gagné. Ouvrez un compte séparé et virez-y
        systématiquement le pourcentage de cotisations correspondant à votre activité, dès
        réception de chaque paiement. Les indépendants qui se retrouvent en difficulté sont
        presque toujours ceux qui ont vécu sur leur chiffre d'affaires brut pendant six mois.
      </p>

      <h2 className="font-display text-2xl font-bold">4. Choisir le versement libératoire à l'aveugle</h2>
      <p>
        Cocher cette option paraît malin — payer son impôt au fil de l'eau, à petit taux. Mais
        si votre foyer n'est pas imposable, vous payez un impôt que le barème ne vous aurait
        jamais réclamé. Le calcul dépend entièrement de la situation fiscale de votre foyer, pas
        de votre seule activité.
      </p>

      <h2 className="font-display text-2xl font-bold">5. Franchir le seuil de TVA sans le voir</h2>
      <p>
        Tant que vous restez sous le seuil de franchise, vous facturez sans TVA. Au-delà, vous
        devez la facturer — parfois rétroactivement au premier jour du dépassement. Découvrir
        cela après coup signifie devoir refacturer ses clients ou payer la TVA de sa poche.
        Surveillez votre cumul annuel mois par mois, surtout si votre activité s'accélère en fin
        d'année.
      </p>

      <h2 className="font-display text-2xl font-bold">6. Ignorer la CFE de la deuxième année</h2>
      <p>
        La cotisation foncière des entreprises est généralement exonérée la première année, puis
        tombe fin décembre de la deuxième — pour un montant de quelques centaines d'euros selon
        la commune. Beaucoup de nouveaux indépendants la découvrent au pire moment, sans l'avoir
        provisionnée.
      </p>

      <h2 className="font-display text-2xl font-bold">7. Négliger la protection sociale</h2>
      <p>
        Pas de chômage, indemnités journalières faibles, retraite proportionnelle à un chiffre
        d'affaires souvent modeste : la micro-entreprise offre une couverture nettement
        inférieure au salariat. Une mutuelle correcte, une prévoyance et une épargne de
        précaution de trois à six mois de charges ne sont pas du luxe mais la contrepartie
        normale de l'indépendance.
      </p>

      <p>
        Chiffrez votre situation réelle avec le{" "}
        <Link href="/entrepreneur/charges-auto-entrepreneur/" className="font-semibold text-marine hover:underline">
          calculateur de charges auto-entrepreneur
        </Link>{" "}
        — ses jauges vous alertent avant le franchissement des seuils — et lisez notre guide sur
        le{" "}
        <Link href="/blog/versement-liberatoire-ou-bareme/" className="font-semibold text-marine hover:underline">
          versement libératoire
        </Link>.
      </p>
    </ArticleLayout>
  );
}
