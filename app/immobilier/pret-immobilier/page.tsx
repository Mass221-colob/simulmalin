import type { Metadata } from "next";
import Link from "next/link";
import PretImmobilierCalculator from "@/components/calculateurs/PretImmobilierCalculator";
import { ANNEE, TAUX_ENDETTEMENT_MAX } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur prêt immobilier ${ANNEE} — mensualités, capacité d'emprunt, amortissement`,
  description: `Simulez votre prêt immobilier ${ANNEE} : mensualités avec assurance, capacité d'emprunt (règle des 35 %), tableau d'amortissement complet exportable, coût total du crédit.`,
  alternates: { canonical: "/immobilier/pret-immobilier/" },
};

const FAQ = [
  {
    q: "Comment est calculée ma capacité d'emprunt ?",
    r: "Les banques appliquent la norme du HCSF : vos mensualités de crédit, assurance emprunteur comprise, ne doivent pas dépasser 35 % de vos revenus nets. Le calculateur déduit d'abord vos crédits en cours, puis recherche le capital maximal dont la mensualité respecte ce plafond. Votre apport s'ajoute ensuite pour former votre budget total d'achat.",
  },
  {
    q: "Quelle durée de prêt choisir ?",
    r: "Plus la durée est longue, plus la mensualité baisse — mais plus le coût total explose, car les intérêts courent plus longtemps et le taux proposé est lui-même plus élevé. Passer de 15 à 25 ans peut presque doubler le coût des intérêts. La bonne durée est la plus courte que votre budget mensuel supporte confortablement.",
  },
  {
    q: "Pourquoi mes premières mensualités remboursent-elles si peu de capital ?",
    r: "Avec une mensualité constante, les intérêts se calculent chaque mois sur le capital restant dû. Au début, ce capital est maximal : la part d'intérêts l'est donc aussi. Au fil des années, la mécanique s'inverse — c'est exactement ce que montre le tableau d'amortissement, et c'est aussi pourquoi renégocier ou rembourser par anticipation rapporte surtout en début de prêt.",
  },
  {
    q: "L'assurance emprunteur est-elle obligatoire ?",
    r: "Légalement non, mais aucune banque ne prête sans elle en pratique. En revanche, vous êtes libre de la choisir ailleurs que dans votre banque (délégation d'assurance) et d'en changer à tout moment depuis la loi Lemoine : sur un gros capital, l'économie atteint souvent plusieurs milliers d'euros.",
  },
  {
    q: "Que manque-t-il à cette simulation ?",
    r: "Les frais de dossier bancaires, les frais de garantie (caution ou hypothèque, environ 1 à 2 % du capital) et les frais de notaire, qui s'ajoutent au projet. Pour ces derniers, utilisez notre calculateur dédié. Le TAEG de l'offre finale de votre banque intégrera l'ensemble de ces coûts.",
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
        <Link href="/immobilier/" className="hover:text-marine">Immobilier</Link>
        <span className="mx-2">›</span>
        <span>Prêt immobilier</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">prêt immobilier</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Mensualités assurance incluse, capacité d'emprunt selon la règle des {TAUX_ENDETTEMENT_MAX} %,
        et le tableau d'amortissement complet — exportable pour votre rendez-vous banquier.
      </p>

      <div className="mt-8">
        <PretImmobilierCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Ce que la mensualité ne dit pas : le coût total</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Deux offres à mensualité identique peuvent cacher des coûts totaux très différents.
          Sur un emprunt de 200 000 € à 3,3 % sur 20 ans, vous rembourserez environ 74 000 €
          d'intérêts et d'assurance en plus du capital — soit plus du tiers du montant emprunté.
          C'est ce chiffre, bien plus que la mensualité, qui doit guider vos négociations : chaque
          dixième de point de taux gagné, chaque changement d'assurance emprunteur, chaque année
          de durée en moins se traduit en milliers d'euros. Le tableau d'amortissement révèle
          aussi une réalité méconnue : les premières années, plus de la moitié de votre mensualité
          part en intérêts, et vous ne devenez réellement « propriétaire » de votre capital que
          progressivement.
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

        <h2 className="mt-10 font-display text-2xl font-bold">Simulations les plus recherchées</h2>
        <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {[
            [150000, 20], [150000, 25], [200000, 20],
            [200000, 25], [250000, 20], [250000, 25],
            [300000, 20], [300000, 25], [400000, 25],
          ].map(([m, d]) => (
            <li key={`${m}-${d}`}>
              <Link
                href={`/immobilier/pret-immobilier/${m}-sur-${d}-ans/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                Emprunter {m.toLocaleString("fr-FR")} € sur {d} ans
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl font-bold">Calculateurs liés</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          N'oubliez pas d'ajouter les{" "}
          <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
            frais de notaire
          </Link>{" "}
          à votre budget, et vérifiez votre reste à vivre avec le{" "}
          <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
            calculateur brut en net
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Taux indicatifs de marché — l'offre réelle dépend de votre profil. Un crédit vous engage
          et doit être remboursé ; vérifiez vos capacités de remboursement avant de vous engager.
          Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
