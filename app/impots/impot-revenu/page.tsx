import type { Metadata } from "next";
import Link from "next/link";
import ImpotRevenuCalculator from "@/components/calculateurs/ImpotRevenuCalculator";
import { ANNEE, BAREME_IR } from "@/data/baremes2026";
import { euros } from "@/lib/brutNet";

export const metadata: Metadata = {
  title: `Calculateur impôt sur le revenu ${ANNEE} — barème, parts, décote`,
  description: `Estimez votre impôt sur le revenu ${ANNEE} : barème progressif par tranches, parts fiscales, décote, plafonnement du quotient familial. Taux moyen et taux marginal expliqués.`,
  alternates: { canonical: "/impots/impot-revenu/" },
};

const FAQ = [
  {
    q: "Quelle est la différence entre taux moyen et taux marginal (TMI) ?",
    r: "Le taux marginal est le taux de la tranche la plus haute que votre revenu atteint : c'est le taux appliqué à chaque euro supplémentaire gagné. Le taux moyen est le rapport entre votre impôt total et votre revenu : c'est ce que vous payez réellement en proportion. Être « dans la tranche à 30 % » ne signifie pas payer 30 % d'impôt sur tout son revenu — seule la partie du revenu située dans cette tranche est taxée à 30 %.",
  },
  {
    q: "Comment fonctionnent les parts fiscales ?",
    r: "Le quotient familial divise le revenu du foyer par un nombre de parts : 1 pour un célibataire, 2 pour un couple marié ou pacsé, plus 0,5 part pour chacun des deux premiers enfants et 1 part entière à partir du troisième. Le barème s'applique au revenu par part, puis l'impôt est multiplié par le nombre de parts. C'est ce qui rend l'impôt plus léger pour les familles — dans la limite du plafonnement du quotient familial.",
  },
  {
    q: "Qu'est-ce que la décote ?",
    r: "La décote est un mécanisme qui réduit automatiquement l'impôt des foyers faiblement imposés, sans aucune démarche. Elle s'applique lorsque l'impôt brut reste sous un certain seuil et peut aller jusqu'à annuler complètement l'impôt.",
  },
  {
    q: "Dois-je déclarer mon salaire net ou brut ?",
    r: "Ni l'un ni l'autre exactement : l'impôt se calcule sur le « net imposable », visible en bas de votre fiche de paie (ligne « net fiscal » ou « net imposable »). Il est légèrement supérieur au net versé car la CSG non déductible et la CRDS restent imposables. L'administration applique ensuite un abattement de 10 % pour frais professionnels, sauf si vous optez pour les frais réels.",
  },
  {
    q: "Ce calculateur remplace-t-il ma déclaration ?",
    r: "Non. Il fournit une estimation fiable pour anticiper votre budget, mais seul le calcul de l'administration fiscale fait foi. Les réductions et crédits d'impôt spécifiques (dons, emploi à domicile, garde d'enfants…) ne sont pas intégrés ici et peuvent réduire sensiblement le montant final.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/impots/" className="hover:text-marine">Impôts</Link>
        <span className="mx-2">›</span>
        <span>Impôt sur le revenu</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">impôt sur le revenu</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Barème progressif, parts fiscales, décote et plafonnement du quotient familial :
        visualisez tranche par tranche comment votre impôt est calculé.
      </p>

      <div className="mt-8">
        <ImpotRevenuCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le barème {ANNEE} par tranches</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          L'impôt sur le revenu français est progressif : votre revenu est découpé en tranches,
          et chaque tranche est taxée à son propre taux. Voici le barème appliqué à une part
          fiscale :
        </p>
        <table className="mt-4 w-full max-w-md text-sm">
          <thead>
            <tr className="text-left text-griseNote">
              <th className="filet py-2 font-medium">Revenu par part</th>
              <th className="filet py-2 text-right font-medium">Taux</th>
            </tr>
          </thead>
          <tbody>
            {BAREME_IR.map((t, i) => {
              const precedent = i === 0 ? 0 : BAREME_IR[i - 1].jusqu ?? 0;
              return (
                <tr key={i} className="filet">
                  <td className="py-2 font-tab">
                    {t.jusqu
                      ? `${euros(precedent)} € → ${euros(t.jusqu)} €`
                      : `au-delà de ${euros(precedent)} €`}
                  </td>
                  <td className="py-2 text-right font-tab font-semibold">{t.taux} %</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2 className="mt-10 font-display text-2xl font-bold">Pourquoi votre vrai taux est plus bas que vous ne le pensez</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          L'erreur la plus répandue consiste à croire qu'entrer dans « la tranche à 30 % »
          signifie payer 30 % d'impôt sur l'ensemble de ses revenus. En réalité, seuls les euros
          situés au-dessus du seuil de la tranche sont taxés à 30 % : tout ce qui se trouve
          en dessous reste taxé à 0 % et 11 %. C'est pourquoi un célibataire avec 35 000 € de
          revenu imposable a un taux marginal de 30 % mais un taux moyen d'environ 11 % seulement.
          Cette progressivité garantit aussi qu'une augmentation de salaire ne peut jamais vous
          faire « perdre de l'argent » à cause de l'impôt.
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

        <h2 className="mt-10 font-display text-2xl font-bold">Revenus les plus recherchés</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[20000, 25000, 30000, 35000, 40000, 50000, 60000, 80000].map((m) => (
            <li key={m}>
              <Link
                href={`/impots/impot-revenu/${m}/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                Impôt sur {m.toLocaleString("fr-FR")} €
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl font-bold">Calculateurs liés</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Pour connaître le revenu net qui sert de base à ce calcul, utilisez d'abord notre{" "}
          <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
            calculateur salaire brut en net
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : impots.gouv.fr (barème, décote, plafonnement du quotient familial),
          service-public.fr. Dernière mise à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
