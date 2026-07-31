import type { Metadata } from "next";
import Link from "next/link";
import CreditConsoCalculator from "@/components/calculateurs/CreditConsoCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur crédit à la consommation ${ANNEE} — mensualité et TAEG`,
  description: `Simulez votre crédit à la consommation ${ANNEE} : mensualité, coût total, TAEG estimé incluant frais de dossier et assurance. Comparez les offres objectivement.`,
  alternates: { canonical: "/epargne/credit-consommation/" },
};

const FAQ = [
  {
    q: "Qu'est-ce que le TAEG et pourquoi est-il le seul chiffre à comparer ?",
    r: "Le taux annuel effectif global intègre le taux d'intérêt, les frais de dossier, l'assurance obligatoire et tous les frais liés au crédit. Deux offres affichant le même taux nominal peuvent avoir des TAEG très différents. La loi impose au prêteur de l'afficher : c'est le seul indicateur qui permet une comparaison honnête.",
  },
  {
    q: "Quelle différence entre prêt personnel et crédit renouvelable ?",
    r: "Le prêt personnel a un montant, une durée et un taux fixés dès le départ : vous savez exactement ce que vous paierez. Le crédit renouvelable (ou revolving) est une réserve d'argent réutilisable, à taux généralement bien plus élevé et à remboursement étalé. À montant égal, le crédit renouvelable coûte souvent deux à trois fois plus cher.",
  },
  {
    q: "Puis-je me rétracter après avoir signé ?",
    r: "Oui. Vous disposez d'un délai légal de rétractation de 14 jours calendaires à compter de la signature de l'offre, sans avoir à vous justifier ni à payer de pénalité. Un formulaire détachable est obligatoirement joint à l'offre de crédit.",
  },
  {
    q: "Puis-je rembourser par anticipation ?",
    r: "Toujours. Pour un crédit à la consommation, aucune indemnité n'est due si le remboursement anticipé est inférieur à 10 000 € sur douze mois. Au-delà, l'indemnité est plafonnée à 1 % du capital remboursé (0,5 % si la durée restante est inférieure à un an). Rembourser tôt réduit fortement le coût total.",
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
        <Link href="/epargne/" className="hover:text-marine">Épargne & crédit</Link>
        <span className="mx-2">›</span>
        <span>Crédit à la consommation</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">crédit à la consommation</span>
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Mensualité, coût total et TAEG estimé — le seul chiffre qui permet de comparer
        honnêtement deux offres.
      </p>

      <div className="mt-8"><CreditConsoCalculator /></div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Allonger la durée : le piège le plus courant</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Face à une mensualité trop lourde, le réflexe naturel consiste à étirer la durée. La
          mensualité baisse, la sensation d'accessibilité augmente — et le coût explose. Un prêt
          de 10 000 € à 5,5 % coûte environ 900 € d'intérêts sur trois ans, mais plus du double
          sur sept ans. Les organismes de crédit connaissent parfaitement ce biais et mettent
          systématiquement la mensualité en avant plutôt que le coût total. Le bon réflexe est
          inverse : fixez d'abord la durée la plus courte que votre budget supporte, puis vérifiez
          que la mensualité reste tenable — et comparez uniquement les TAEG, jamais les
          mensualités.
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
          Avant d'emprunter, vérifiez ce que la même somme placée rapporterait avec le{" "}
          <Link href="/epargne/interets-composes/" className="font-semibold text-marine hover:underline">
            calculateur d'intérêts composés
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement
          avant de vous engager. Sources : service-public.fr, Banque de France.
          Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
