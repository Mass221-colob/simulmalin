import type { Metadata } from "next";
import Link from "next/link";
import PrimeActiviteCalculator from "@/components/calculateurs/PrimeActiviteCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Simulateur prime d'activité ${ANNEE} — montant et éligibilité`,
  description: `Estimez votre prime d'activité ${ANNEE} : montant selon vos revenus, votre situation familiale et vos aides au logement. Un tiers des foyers éligibles ne la demandent pas.`,
  alternates: { canonical: "/emploi/prime-activite/" },
};

const FAQ = [
  {
    q: "Qui peut toucher la prime d'activité ?",
    r: "Toute personne d'au moins 18 ans exerçant une activité professionnelle — salariée, indépendante ou étudiante salariée sous conditions — et résidant en France de façon stable. Elle est ouverte aux apprentis, aux auto-entrepreneurs et aux fonctionnaires. Elle dépend des ressources de l'ensemble du foyer, pas seulement des vôtres.",
  },
  {
    q: "Comment est-elle calculée ?",
    r: "Le calcul combine un montant forfaitaire majoré selon la composition du foyer, une bonification individuelle qui augmente avec le revenu d'activité jusqu'à environ 1,2 SMIC, et une prise en compte partielle des revenus (61 %). Un forfait logement est déduit si vous percevez une aide au logement ou êtes hébergé gratuitement.",
  },
  {
    q: "Comment faire la demande ?",
    r: "Uniquement en ligne sur caf.fr (ou msa.fr pour le régime agricole). Elle n'est jamais versée automatiquement : c'est la principale raison pour laquelle près d'un tiers des foyers éligibles n'en bénéficient pas. Le versement démarre le mois de la demande — aucun rattrapage rétroactif n'est possible, d'où l'intérêt de ne pas attendre.",
  },
  {
    q: "Faut-il la déclarer tous les trimestres ?",
    r: "Oui. Vous devez déclarer vos ressources chaque trimestre ; le montant est alors recalculé pour les trois mois suivants et reste figé sur cette période, même si vos revenus varient. Un oubli de déclaration suspend le versement.",
  },
  {
    q: "Est-elle imposable ?",
    r: "Non, la prime d'activité n'est pas imposable et n'a pas à figurer sur votre déclaration de revenus. Elle n'est pas non plus prise en compte dans le calcul de votre impôt.",
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
        <span>Prime d'activité</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Simulateur <span className="surligne">prime d'activité</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Un complément de revenu pour les travailleurs modestes — que près d'un tiers des foyers
        éligibles ne réclament jamais.
      </p>

      <div className="mt-8"><PrimeActiviteCalculator /></div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le non-recours : des milliards non versés</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          La prime d'activité souffre d'un taux de non-recours considérable. Les raisons sont
          toujours les mêmes : beaucoup de travailleurs pensent qu'elle est réservée aux
          chômeurs ou aux bénéficiaires du RSA, alors qu'elle s'adresse précisément à ceux qui
          travaillent ; d'autres croient qu'elle est automatique. Or elle ne l'est jamais, et
          surtout elle n'est pas rétroactive : chaque mois sans demande est définitivement perdu.
          Si votre revenu se situe entre un mi-temps au SMIC et environ 1,5 SMIC — davantage avec
          des enfants ou en couple avec un seul salaire — la simulation vaut les cinq minutes
          qu'elle prend.
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
          Pour connaître le revenu net à renseigner ici, utilisez le{" "}
          <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
            calculateur brut en net
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : caf.fr, service-public.fr. Estimation indicative — seule la CAF détermine vos
          droits. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
