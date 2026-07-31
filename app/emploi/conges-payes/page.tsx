import type { Metadata } from "next";
import Link from "next/link";
import CongesCalculator from "@/components/calculateurs/CongesCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur congés payés ${ANNEE} — jours acquis et indemnité`,
  description: `Calculez vos congés payés ${ANNEE} : jours acquis en ouvrables ou ouvrés, solde restant et indemnité compensatrice (règle du 1/10e ou maintien de salaire).`,
  alternates: { canonical: "/emploi/conges-payes/" },
};

const FAQ = [
  {
    q: "Combien de jours de congés par mois travaillé ?",
    r: "Vous acquérez 2,5 jours ouvrables par mois de travail effectif, soit 30 jours ouvrables (5 semaines) pour une année complète. Si votre entreprise décompte en jours ouvrés, cela correspond à 2,08 jours par mois, soit 25 jours par an — le nombre de semaines de congés est identique, seul le mode de comptage change.",
  },
  {
    q: "Jours ouvrables ou jours ouvrés : quelle différence ?",
    r: "Les jours ouvrables comptent du lundi au samedi (6 jours par semaine) : une semaine de congés consomme 6 jours. Les jours ouvrés couvrent le lundi au vendredi (5 jours) : la même semaine en consomme 5. Vérifiez sur votre bulletin de paie quel décompte votre employeur applique, sans quoi vous risquez de mal évaluer votre solde.",
  },
  {
    q: "Comment se calcule l'indemnité de congés payés ?",
    r: "Deux méthodes coexistent et l'employeur doit retenir la plus favorable au salarié. La règle du dixième attribue 10 % de la rémunération brute totale de la période de référence, primes comprises. La règle du maintien verse simplement le salaire que vous auriez perçu en travaillant. Si vous avez touché des primes ou des heures supplémentaires, le dixième est souvent plus avantageux.",
  },
  {
    q: "Que deviennent mes congés non pris en cas de départ ?",
    r: "Ils vous sont versés sous forme d'indemnité compensatrice de congés payés, quel que soit le motif de la rupture — y compris en cas de licenciement pour faute grave. Cette indemnité apparaît sur votre solde de tout compte et elle est soumise aux cotisations comme un salaire.",
  },
  {
    q: "Puis-je perdre mes congés si je ne les prends pas ?",
    r: "En principe, les congés doivent être pris pendant la période de prise (souvent du 1er mai au 31 octobre pour le congé principal) et se perdent au-delà. Mais la jurisprudence est claire : ils ne sont perdus que si l'employeur a effectivement mis le salarié en mesure de les prendre. En cas d'arrêt maladie ou de charge de travail empêchant leur prise, un report peut être exigé.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/emploi/" className="hover:text-marine">Emploi</Link>
        <span className="mx-2">›</span>
        <span>Congés payés</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">congés payés</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Jours acquis, solde restant et indemnité compensatrice — avec la comparaison automatique
        des deux règles légales de calcul.
      </p>

      <div className="mt-8">
        <CongesCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le calcul que votre employeur doit faire (et parfois oublie)</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          L'indemnité de congés payés obéit à une règle simple mais méconnue : l'employeur est
          tenu de comparer deux méthodes de calcul et de retenir celle qui vous avantage. La règle
          du dixième prend 10 % de tout ce que vous avez perçu sur la période de référence —
          salaires, primes variables, heures supplémentaires, majorations. La règle du maintien
          verse l'équivalent de votre salaire habituel. Pour un salarié au fixe sans prime, les
          deux se valent. Mais dès que vous touchez du variable, du treizième mois ou des heures
          supplémentaires régulières, le dixième devient nettement plus favorable — et c'est
          précisément là que des erreurs se glissent dans les soldes de tout compte. Vérifiez la
          ligne « indemnité compensatrice de congés payés » de votre solde : un écart se conteste
          facilement dans les trois ans.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold">Questions fréquentes</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-lg border border-ligne bg-white p-4">
              <summary className="cursor-pointer font-semibold marker:content-none">{f.q}</summary>
              <p className="mt-2 leading-relaxed text-encre/90">{f.r}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 leading-relaxed text-encre/90">
          En cas de départ, calculez aussi votre{" "}
          <Link href="/emploi/preavis/" className="font-semibold text-marine hover:underline">préavis</Link>,
          votre{" "}
          <Link href="/emploi/indemnite-licenciement/" className="font-semibold text-marine hover:underline">
            indemnité de licenciement
          </Link>{" "}
          et vos{" "}
          <Link href="/emploi/allocation-chomage/" className="font-semibold text-marine hover:underline">
            droits au chômage
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : Code du travail (art. L3141-3 et suivants), service-public.fr.
          Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
