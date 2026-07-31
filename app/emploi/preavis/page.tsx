import type { Metadata } from "next";
import Link from "next/link";
import PreavisCalculator from "@/components/calculateurs/PreavisCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur préavis ${ANNEE} — licenciement, démission, retraite`,
  description: `Quelle durée de préavis en ${ANNEE} ? Licenciement, démission ou départ à la retraite : durées légales selon l'ancienneté et le statut, avec date de fin estimée.`,
  alternates: { canonical: "/emploi/preavis/" },
};

const FAQ = [
  {
    q: "Quelle est la durée légale du préavis de licenciement ?",
    r: "Le Code du travail fixe un minimum : un mois entre six mois et deux ans d'ancienneté, deux mois au-delà de deux ans. En dessous de six mois, aucune durée légale n'est prévue — c'est la convention collective ou l'usage qui s'applique. Ces durées sont des planchers : votre convention peut prévoir plus, notamment trois mois pour les cadres.",
  },
  {
    q: "Et en cas de démission ?",
    r: "La loi ne fixe aucune durée pour la démission : tout dépend de votre convention collective, de votre contrat ou de l'usage de la profession. En pratique, on observe fréquemment un mois pour les non-cadres et trois mois pour les cadres. Partir sans respecter son préavis expose à devoir verser une indemnité compensatrice à l'employeur.",
  },
  {
    q: "Peut-on être dispensé de préavis ?",
    r: "Oui, de deux façons. Si l'employeur vous en dispense, il doit vous verser une indemnité compensatrice de préavis équivalente au salaire que vous auriez perçu. Si c'est vous qui demandez la dispense et qu'il l'accepte, aucune indemnité n'est due. En cas de faute grave, le préavis n'est ni exécuté ni indemnisé.",
  },
  {
    q: "Ai-je droit à des heures pour chercher un emploi ?",
    r: "La plupart des conventions collectives prévoient des heures de recherche d'emploi pendant le préavis, souvent deux heures par jour travaillé, rémunérées en cas de licenciement. Ce droit n'est pas systématique dans la loi : il dépend de votre convention ou des usages de l'entreprise.",
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
        <span>Préavis</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur de <span className="surligne">préavis</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Licenciement, démission ou retraite : la durée applicable selon votre ancienneté, avec
        la date de fin estimée.
      </p>

      <div className="mt-8">
        <PreavisCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le réflexe indispensable : votre convention collective</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Les durées légales affichées ici sont des minimums, et c'est une nuance qui change tout
          en pratique : dans la grande majorité des branches, la convention collective prévoit des
          préavis plus longs que la loi, particulièrement pour les cadres où trois mois sont la
          norme. Son intitulé figure obligatoirement sur votre bulletin de paie et son texte est
          consultable gratuitement sur Legifrance. C'est aussi elle qui détermine vos heures de
          recherche d'emploi et d'éventuelles conditions de dispense. Autre point à connaître :
          le préavis compte dans votre ancienneté, même s'il n'est pas exécuté — un détail qui
          peut faire franchir un seuil dans le calcul de votre indemnité de licenciement.
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
          Voir aussi :{" "}
          <Link href="/emploi/conges-payes/" className="font-semibold text-marine hover:underline">congés payés</Link>,{" "}
          <Link href="/emploi/indemnite-licenciement/" className="font-semibold text-marine hover:underline">
            indemnité de licenciement
          </Link>{" "}
          et{" "}
          <Link href="/emploi/allocation-chomage/" className="font-semibold text-marine hover:underline">
            allocation chômage
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : Code du travail (art. L1234-1), service-public.fr. Ces informations ne
          constituent pas un conseil juridique. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
