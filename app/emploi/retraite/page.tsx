import type { Metadata } from "next";
import Link from "next/link";
import RetraiteCalculator from "@/components/calculateurs/RetraiteCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur retraite ${ANNEE} — âge de départ et pension estimée`,
  description: `Âge légal de départ selon votre année de naissance (réforme 2023), trimestres requis, décote et estimation de pension. Simulateur retraite ${ANNEE}.`,
  alternates: { canonical: "/emploi/retraite/" },
};

const FAQ = [
  {
    q: "À quel âge puis-je partir à la retraite ?",
    r: "Depuis la réforme de 2023, l'âge légal augmente progressivement de 62 à 64 ans selon l'année de naissance, à raison de trois mois par génération. Les personnes nées à partir de 1968 partiront à 64 ans. Cet âge légal est le seuil à partir duquel vous pouvez liquider vos droits — pas nécessairement celui où vous obtiendrez le taux plein.",
  },
  {
    q: "Quelle différence entre âge légal et taux plein ?",
    r: "Atteindre l'âge légal ne suffit pas : il faut également avoir validé le nombre de trimestres requis (172 pour les générations récentes). Si des trimestres manquent, une décote définitive s'applique à votre pension. À 67 ans, le taux plein est automatique quel que soit le nombre de trimestres — c'est la solution de repli pour les carrières incomplètes.",
  },
  {
    q: "Comment fonctionne la décote ?",
    r: "Chaque trimestre manquant réduit votre taux de 1,25 point, dans la limite de 20 trimestres. Partir avec huit trimestres manquants abaisse ainsi votre taux de 50 % à 40 % — et cette réduction est définitive, appliquée toute votre vie. À l'inverse, chaque trimestre travaillé au-delà du taux plein donne droit à une surcote qui majore la pension.",
  },
  {
    q: "Comment est calculée la pension du régime général ?",
    r: "La formule retient votre salaire annuel moyen des 25 meilleures années (dans la limite du plafond de la Sécurité sociale), multiplié par le taux (50 % au maximum) et proratisé selon vos trimestres validés. S'y ajoute la retraite complémentaire AGIRC-ARRCO, qui fonctionne par points et représente souvent 25 à 50 % de la pension totale pour un salarié du privé.",
  },
  {
    q: "Où obtenir un calcul officiel ?",
    r: "Sur info-retraite.fr, qui centralise tous vos régimes et propose un simulateur officiel à partir de votre carrière réelle. Ce site est la seule source fiable pour connaître vos trimestres validés — cette estimation ne remplace en aucun cas votre relevé de carrière.",
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
        <span>Retraite</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">retraite</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Âge légal selon votre génération, trimestres requis, décote et pension estimée —
        avec les règles issues de la réforme 2023.
      </p>

      <div className="mt-8"><RetraiteCalculator /></div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Les trimestres comptent plus que l'âge</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          L'erreur la plus répandue consiste à raisonner uniquement en âge. Or c'est le nombre de
          trimestres validés qui détermine votre taux, et donc le montant que vous percevrez
          pendant vingt ou trente ans. Partir dès l'âge légal avec des trimestres manquants
          entraîne une décote définitive : quelques trimestres de plus peuvent représenter des
          dizaines de milliers d'euros sur l'ensemble de la retraite. D'où l'importance de
          consulter son relevé de carrière bien avant l'échéance — idéalement dès 45 ou 50 ans —
          pour repérer les périodes manquantes (petits boulots, stages, années à l'étranger) et
          les régulariser tant que c'est encore possible. Certaines périodes peuvent d'ailleurs
          être rachetées, notamment les années d'études supérieures.
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
          Préparez votre complément de revenu avec le{" "}
          <Link href="/epargne/interets-composes/" className="font-semibold text-marine hover:underline">
            calculateur d'intérêts composés
          </Link>{" "}
          — épargner tôt change tout.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Estimation très simplifiée. Sources : info-retraite.fr, lassuranceretraite.fr,
          service-public.fr. Seul votre relevé de carrière officiel fait foi. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
