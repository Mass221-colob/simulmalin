import type { Metadata } from "next";
import Link from "next/link";
import ChomageCalculator from "@/components/calculateurs/ChomageCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur allocation chômage (ARE) ${ANNEE} — montant et durée`,
  description: `Estimez votre allocation chômage ${ANNEE} : montant mensuel de l'ARE, durée d'indemnisation selon l'âge, dégressivité des hauts revenus. Simulation immédiate.`,
  alternates: { canonical: "/emploi/allocation-chomage/" },
};

const FAQ = [
  {
    q: "Comment est calculée l'allocation chômage ?",
    r: "France Travail calcule d'abord votre salaire journalier de référence (SJR) à partir de vos salaires bruts des 24 derniers mois (36 pour les 53 ans et plus), divisés par les jours calendaires de la période. L'allocation journalière est ensuite la formule la plus favorable entre 40,4 % du SJR plus une partie fixe, et 57 % du SJR — sans pouvoir dépasser 75 % du SJR ni descendre sous le minimum.",
  },
  {
    q: "Combien de temps suis-je indemnisé ?",
    r: "La durée dépend de votre affiliation : en principe autant de jours que vous avez travaillé sur la période de référence, affectés d'un coefficient de réduction lorsque la conjoncture de l'emploi est jugée favorable, avec un minimum de 6 mois. Les plafonds augmentent avec l'âge : environ 18 mois avant 53 ans, davantage au-delà. Ces règles ayant été réformées plusieurs fois récemment, vérifiez votre situation exacte auprès de France Travail.",
  },
  {
    q: "Démission, rupture conventionnelle, licenciement : qui a droit à l'ARE ?",
    r: "Le licenciement (même pour faute grave) et la rupture conventionnelle ouvrent droit au chômage. La démission n'y ouvre pas droit, sauf cas de démission légitime (suivi de conjoint, création d'entreprise sous conditions, salaires impayés…) ou projet de reconversion validé. C'est l'une des grandes forces de la rupture conventionnelle face à la démission.",
  },
  {
    q: "Pourquoi ne toucherai-je pas mon allocation dès le premier jour ?",
    r: "Trois délais se cumulent : un délai d'attente de 7 jours, un différé congés payés (proportionnel à votre indemnité de congés versée au départ) et, si vous avez perçu des indemnités de rupture au-delà du minimum légal, un différé spécifique pouvant atteindre 150 jours. Un départ bien négocié doit anticiper cette période sans revenu.",
  },
  {
    q: "L'allocation est-elle imposable ? Y a-t-il des retenues ?",
    r: "L'ARE est imposable à l'impôt sur le revenu et soumise au prélèvement à la source. Selon son montant, elle peut aussi supporter la CSG et la CRDS — les allocations modestes en sont exonérées. Le montant net perçu est donc légèrement inférieur au brut estimé ici.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/emploi/" className="hover:text-marine">Emploi</Link>
        <span className="mx-2">›</span>
        <span>Allocation chômage</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">allocation chômage</span> (ARE) {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Montant mensuel, durée d'indemnisation selon votre âge, alerte dégressivité : une
        estimation claire pour préparer votre budget de transition.
      </p>

      <div className="mt-8">
        <ChomageCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le taux de remplacement : à quoi s'attendre</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Contrairement à une idée répandue, l'allocation chômage ne remplace pas un pourcentage
          fixe du salaire. La double formule (40,4 % + partie fixe, ou 57 %) produit un taux de
          remplacement dégressif : autour de 75 % du brut pour les anciens salaires proches du
          SMIC, environ 65 % pour un salaire médian, et 57 % pour les salaires élevés — avant
          l'éventuelle dégressivité de 30 % qui frappe les hauts revenus à partir du septième
          mois. Rapportée au <em>net</em> que vous touchiez, l'allocation représente souvent 70
          à 80 % : la chute de revenus est réelle mais moins brutale que la comparaison au brut
          le laisse croire. D'où l'importance de la simuler avant une rupture conventionnelle,
          pour négocier une indemnité qui couvre aussi les différés d'indemnisation.
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

        <h2 className="mt-10 font-display text-2xl font-bold">Par niveau de salaire</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[1800, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map((s) => (
            <li key={s}>
              <Link
                href={`/emploi/allocation-chomage/${s}/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                Chômage pour {s.toLocaleString("fr-FR")} € brut
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl font-bold">Calculateurs liés</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Avant la rupture, chiffrez votre{" "}
          <Link href="/emploi/indemnite-licenciement/" className="font-semibold text-marine hover:underline">
            indemnité de licenciement ou de rupture conventionnelle
          </Link>{" "}
          — et lisez notre guide pour{" "}
          <Link href="/blog/rupture-conventionnelle-negocier/" className="font-semibold text-marine hover:underline">
            négocier au-dessus du minimum
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : unedic.org, francetravail.fr. Estimation simplifiée : les règles d'assurance
          chômage évoluent fréquemment et seule l'étude de France Travail fait foi.
          Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
