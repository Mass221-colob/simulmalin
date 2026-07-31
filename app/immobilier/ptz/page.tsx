import type { Metadata } from "next";
import Link from "next/link";
import PtzCalculator from "@/components/calculateurs/PtzCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Simulateur PTZ ${ANNEE} — éligibilité et montant du prêt à taux zéro`,
  description: `Calculez votre prêt à taux zéro ${ANNEE} : plafonds de revenus par zone, quotité finançable, montant du PTZ et reste à financer. Simulation immédiate.`,
  alternates: { canonical: "/immobilier/ptz/" },
};

const FAQ = [
  {
    q: "Qui peut bénéficier du prêt à taux zéro ?",
    r: "Le PTZ est réservé aux primo-accédants, c'est-à-dire aux personnes qui n'ont pas été propriétaires de leur résidence principale au cours des deux années précédentes. Le logement financé doit devenir votre résidence principale, et vos revenus ne doivent pas dépasser un plafond qui dépend de la zone et de la taille du foyer.",
  },
  {
    q: "Quel revenu est pris en compte ?",
    r: "L'administration retient le plus élevé de deux montants : votre revenu fiscal de référence de l'avant-dernière année, ou le coût total de l'opération divisé par neuf. Cette seconde règle évite qu'un ménage aux revenus modestes finance une opération disproportionnée.",
  },
  {
    q: "À quoi correspondent les zones A, B et C ?",
    r: "Le zonage reflète la tension du marché immobilier local. La zone A bis couvre Paris et sa proche couronne, la zone A les grandes métropoles tendues, la B1 les grandes agglomérations, la B2 les villes moyennes et la C le reste du territoire. Plus la zone est tendue, plus les plafonds de revenus et de coût d'opération sont élevés. Votre commune exacte se vérifie sur le simulateur officiel de l'ANIL.",
  },
  {
    q: "Comment se rembourse le PTZ ?",
    r: "Sans aucun intérêt, et avec un différé de remboursement pouvant atteindre plusieurs années selon votre tranche de revenus : vous ne commencez à rembourser le PTZ qu'après cette période, ce qui allège considérablement vos mensualités au début. La durée totale s'étale généralement de vingt à vingt-cinq ans.",
  },
  {
    q: "Le PTZ finance-t-il tous les logements ?",
    r: "Non, et c'est le point le plus mouvant du dispositif : les types de logements éligibles (neuf, ancien avec travaux, appartement ou maison individuelle) et les zones concernées ont été modifiés à plusieurs reprises ces dernières années. Vérifiez impérativement les conditions en vigueur auprès de votre banque ou de l'ADIL de votre département avant de bâtir votre plan de financement.",
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
        <Link href="/immobilier/" className="hover:text-marine">Immobilier</Link>
        <span className="mx-2">›</span>
        <span>PTZ</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Simulateur <span className="surligne">prêt à taux zéro</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Éligibilité selon vos revenus et votre zone, quotité finançable et montant du PTZ —
        le coup de pouce le plus puissant pour un premier achat.
      </p>

      <div className="mt-8"><PtzCalculator /></div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Pourquoi le PTZ vaut bien plus que son montant</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Un PTZ de 60 000 € ne représente pas seulement 60 000 € empruntés : c'est surtout
          l'équivalent de plusieurs dizaines de milliers d'euros d'intérêts jamais payés sur la
          durée du crédit. Combiné au différé de remboursement, il abaisse vos mensualités des
          premières années, ce qui améliore mécaniquement votre taux d'endettement et donc votre
          capacité d'emprunt globale. Autrement dit, le PTZ ne finance pas seulement une partie
          du bien : il augmente le budget total auquel vous pouvez prétendre. C'est pourquoi il
          faut le simuler avant même de chercher un bien — il peut déplacer votre recherche vers
          une gamme de prix supérieure.
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
          Complétez votre plan de financement avec le{" "}
          <Link href="/immobilier/pret-immobilier/" className="font-semibold text-marine hover:underline">
            calculateur de prêt immobilier
          </Link>{" "}
          et les{" "}
          <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
            frais de notaire
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          ⚠️ Dispositif fréquemment réformé. Sources : service-public.fr, ANIL. Estimation
          indicative — faites valider par votre banque. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
