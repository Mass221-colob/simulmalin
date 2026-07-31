import type { Metadata } from "next";
import Link from "next/link";
import RendementLocatifCalculator from "@/components/calculateurs/RendementLocatifCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur rendement locatif ${ANNEE} — brut, net, net-net et cash-flow`,
  description: `Calculez le vrai rendement de votre investissement locatif ${ANNEE} : rendement brut, net de charges, net-net après impôts, cash-flow mensuel et comparaison des 4 régimes fiscaux.`,
  alternates: { canonical: "/immobilier/rendement-locatif/" },
};

const FAQ = [
  {
    q: "Quelle différence entre rendement brut, net et net-net ?",
    r: "Le rendement brut divise simplement le loyer annuel par le prix d'achat : c'est le chiffre affiché dans les annonces, et le plus trompeur. Le rendement net déduit les charges réelles (copropriété, taxe foncière, assurance, gestion, vacance). Le rendement net-net déduit en plus la fiscalité — impôt sur le revenu à votre tranche marginale et 17,2 % de prélèvements sociaux. C'est le seul chiffre qui compte vraiment : un bien affiché à 8 % brut tombe souvent à 3-4 % net-net.",
  },
  {
    q: "Qu'est-ce qu'un bon rendement locatif ?",
    r: "Tout dépend du marché et du risque accepté. Dans les grandes métropoles tendues, un rendement brut de 3 à 4 % est courant, compensé par une plus-value potentielle à la revente. Dans les villes moyennes, on trouve 6 à 9 % brut mais avec un risque de vacance et de dégradation plus élevé. La règle de prudence : un investissement dont le rendement net-net est inférieur au taux de votre crédit doit se justifier par autre chose que le rendement (patrimoine, plus-value, défiscalisation).",
  },
  {
    q: "Micro-foncier ou régime réel : lequel choisir ?",
    r: "Le micro-foncier applique un abattement forfaitaire de 30 % sur les loyers, sans justificatif — avantageux si vos charges réelles représentent moins de 30 % des loyers. Le régime réel permet de déduire les charges effectives et surtout les intérêts d'emprunt : dès que vous financez à crédit ou réalisez des travaux, il devient presque toujours plus intéressant. Le comparateur ci-dessus fait le calcul avec vos chiffres.",
  },
  {
    q: "Pourquoi le meublé (LMNP) est-il souvent plus rentable ?",
    r: "En meublé, le micro-BIC offre un abattement de 50 % au lieu de 30 %. Mais c'est surtout le régime réel LMNP qui change tout : il autorise l'amortissement comptable du bien, ce qui efface souvent la totalité du revenu imposable pendant dix à quinze ans. En contrepartie : mobilier à fournir, baux plus courts, rotation locative plus forte et comptabilité à tenir (souvent via un expert-comptable).",
  },
  {
    q: "Faut-il viser le cash-flow positif ?",
    r: "Un cash-flow positif signifie que les loyers couvrent le crédit, les charges et les impôts : l'opération s'autofinance et ne pèse pas sur votre budget. C'est l'objectif des investisseurs qui veulent enchaîner les acquisitions. Un cash-flow négatif n'est pas disqualifiant si l'effort d'épargne est maîtrisé et que vous constituez du patrimoine — mais il limite votre capacité à réinvestir et fragilise votre dossier bancaire suivant.",
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
        <span>Rendement locatif</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">rendement locatif</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Le rendement brut ne veut rien dire. Ici : charges réelles, fiscalité, cash-flow mensuel
        et comparaison automatique des 4 régimes fiscaux pour trouver le plus avantageux.
      </p>

      <div className="mt-8">
        <RendementLocatifCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Les charges que les vendeurs oublient de mentionner</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          L'écart entre le rendement affiché dans une annonce et le rendement réellement perçu
          tient à une liste de postes systématiquement absents du discours commercial : la taxe
          foncière, souvent équivalente à un mois de loyer voire davantage ; les charges de
          copropriété non récupérables sur le locataire ; l'assurance propriétaire non occupant ;
          les frais de gestion si vous déléguez à une agence (6 à 10 % des loyers) ; la vacance
          locative entre deux locataires ; et enfin l'entretien courant et le renouvellement des
          équipements, qu'il est prudent de provisionner. Ajoutez-y la fiscalité et vous
          comprenez pourquoi un « 8 % brut » se transforme couramment en 3,5 % net-net. Cela ne
          condamne pas l'investissement locatif — l'effet de levier du crédit et la constitution
          de patrimoine restent puissants — mais impose de raisonner sur les bons chiffres.
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

        <h2 className="mt-10 font-display text-2xl font-bold">Calculateurs liés</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Complétez votre étude avec les{" "}
          <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
            frais de notaire
          </Link>{" "}
          et le{" "}
          <Link href="/immobilier/pret-immobilier/" className="font-semibold text-marine hover:underline">
            calculateur de prêt immobilier
          </Link>{" "}
          (qui vous donne la mensualité et les intérêts annuels à reporter ci-dessus), puis
          lisez notre guide sur le{" "}
          <Link href="/blog/taux-endettement-35-pourcent/" className="font-semibold text-marine hover:underline">
            taux d'endettement à 35 %
          </Link>{" "}
          — les revenus locatifs y sont retenus à 70 % seulement.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : impots.gouv.fr (régimes micro-foncier, micro-BIC, LMNP), service-public.fr.
          Ces informations ne constituent pas un conseil en investissement. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
