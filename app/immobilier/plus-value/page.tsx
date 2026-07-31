import type { Metadata } from "next";
import Link from "next/link";
import PlusValueCalculator from "@/components/calculateurs/PlusValueCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur plus-value immobilière ${ANNEE} — impôt et abattements`,
  description: `Calculez l'impôt sur votre plus-value immobilière ${ANNEE} : abattements par durée de détention, exonération à 22 et 30 ans, surtaxe, net vendeur estimé.`,
  alternates: { canonical: "/immobilier/plus-value/" },
};

const FAQ = [
  {
    q: "La vente de ma résidence principale est-elle taxée ?",
    r: "Non. La vente de votre résidence principale est totalement exonérée d'impôt sur la plus-value, sans condition de durée de détention. L'exonération couvre aussi les dépendances vendues en même temps. Elle suppose que le logement soit votre résidence effective au jour de la vente.",
  },
  {
    q: "Comment fonctionnent les abattements pour durée de détention ?",
    r: "Aucun abattement les cinq premières années. Ensuite, l'impôt sur le revenu bénéficie de 6 % d'abattement par an de la sixième à la vingt-et-unième année puis 4 % la vingt-deuxième : l'exonération est totale après 22 ans. Les prélèvements sociaux suivent un rythme plus lent (1,65 % par an, puis 9 % à partir de la vingt-troisième année) et ne disparaissent qu'après 30 ans de détention.",
  },
  {
    q: "Puis-je majorer mon prix d'acquisition ?",
    r: "Oui, et c'est le principal levier de réduction. Les frais d'acquisition peuvent être retenus pour leur montant réel ou pour un forfait de 7,5 % du prix d'achat. Les travaux d'amélioration justifiés par factures s'ajoutent ; après cinq ans de détention, vous pouvez opter pour un forfait de 15 % du prix d'achat sans aucun justificatif — souvent plus avantageux que les factures réelles.",
  },
  {
    q: "Quel est le taux d'imposition ?",
    r: "La plus-value nette est taxée à 19 % au titre de l'impôt sur le revenu et à 17,2 % de prélèvements sociaux, soit 36,2 % au total avant abattements. Une surtaxe progressive s'ajoute pour les plus-values imposables supérieures à 50 000 €. L'ensemble est calculé, prélevé et reversé directement par le notaire lors de la vente.",
  },
  {
    q: "Existe-t-il d'autres cas d'exonération ?",
    r: "Oui : la première cession d'un logement autre que la résidence principale sous conditions de remploi dans l'achat d'une résidence principale, les ventes inférieures à 15 000 €, les cessions par des retraités ou invalides aux revenus modestes, ou encore certaines expropriations. Ces régimes ayant des conditions strictes, faites-les valider par votre notaire.",
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
        <span>Plus-value immobilière</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">plus-value immobilière</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Abattements par durée de détention, forfait travaux, surtaxe : ce que vous garderez
        vraiment après la vente.
      </p>

      <div className="mt-8"><PlusValueCalculator /></div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le forfait travaux de 15 % : le réflexe qui fait gagner des milliers d'euros</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Après cinq ans de détention, la loi vous autorise à majorer votre prix d'acquisition de
          15 % au titre des travaux, sans produire la moindre facture. Sur un bien acheté
          180 000 €, cela représente 27 000 € de plus-value effacée d'un trait — soit près de
          10 000 € d'impôt économisés. Vous pouvez évidemment préférer vos factures réelles si
          elles dépassent ce forfait, mais elles doivent alors concerner des travaux
          d'amélioration, de construction ou d'agrandissement : l'entretien courant et les
          réparations ne comptent pas. Attention également, le même euro ne peut servir deux
          fois : des travaux déjà déduits de vos revenus fonciers ne peuvent être ajoutés ici.
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
          Voir aussi le{" "}
          <Link href="/immobilier/rendement-locatif/" className="font-semibold text-marine hover:underline">
            rendement locatif
          </Link>{" "}
          et les{" "}
          <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
            frais de notaire
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : impots.gouv.fr, service-public.fr, articles 150 U et suivants du CGI.
          Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
