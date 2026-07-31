import type { Metadata } from "next";
import Link from "next/link";
import LicenciementCalculator from "@/components/calculateurs/LicenciementCalculator";
import { calculerIndemnite } from "@/lib/licenciement";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

/**
 * SEO PROGRAMMATIQUE — "indemnité de licenciement X ans d'ancienneté"
 * /emploi/indemnite-licenciement/2-ans/ … /30-ans/ → 29 pages.
 */

const ANCIENNETES: number[] = [];
for (let a = 2; a <= 30; a++) ANCIENNETES.push(a);

const SALAIRES_EXEMPLES = [1800, 2000, 2500, 3000, 3500, 4000];

export function generateStaticParams() {
  return ANCIENNETES.map((a) => ({ annees: `${a}-ans` }));
}

export const dynamicParams = false;

function parseAnnees(param: string): number {
  return parseInt(param.replace("-ans", ""));
}

export function generateMetadata({ params }: { params: { annees: string } }): Metadata {
  const a = parseAnnees(params.annees);
  const ex = calculerIndemnite(2500, a, 0, "licenciement");
  const nbMois = (ex.indemnite / 2500).toFixed(2).replace(".", ",");
  return {
    title: `Indemnité de licenciement après ${a} ans d'ancienneté (${ANNEE})`,
    description: `Avec ${a} ans d'ancienneté, l'indemnité légale de licenciement vaut ${nbMois} mois de salaire. Exemple : ${euros(ex.indemnite)} € pour 2 500 € brut. Tableau par salaire.`,
    alternates: { canonical: `/emploi/indemnite-licenciement/${a}-ans/` },
  };
}

export default function Page({ params }: { params: { annees: string } }) {
  const a = parseAnnees(params.annees);
  const exemple = calculerIndemnite(2500, a, 0, "licenciement");
  const nbMois = exemple.indemnite / 2500;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/emploi/indemnite-licenciement/" className="hover:text-marine">Indemnité de licenciement</Link>
        <span className="mx-2">›</span>
        <span>{a} ans</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Indemnité de licenciement après <span className="surligne">{a} ans</span> d'ancienneté
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Avec {a} ans d'ancienneté, l'indemnité légale représente{" "}
        <strong className="text-encre">
          {nbMois.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} mois de salaire de
          référence
        </strong>
        {a > 10
          ? " (¼ de mois par année pour les 10 premières, ⅓ au-delà)."
          : " (¼ de mois de salaire par année d'ancienneté)."}
      </p>

      <h2 className="mt-8 font-display text-2xl font-bold">Montants selon votre salaire</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full max-w-xl text-sm">
          <thead>
            <tr className="text-left text-griseNote">
              <th className="filet py-2 font-medium">Salaire brut mensuel</th>
              <th className="filet py-2 text-right font-medium">Indemnité légale</th>
            </tr>
          </thead>
          <tbody>
            {SALAIRES_EXEMPLES.map((s) => {
              const r = calculerIndemnite(s, a, 0, "licenciement");
              return (
                <tr key={s} className="filet">
                  <td className="py-2 font-tab">{euros(s)} €</td>
                  <td className="py-2 text-right font-tab font-semibold">{euros(r.indemnite)} €</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-griseNote">
        Montants exonérés d'impôt sur le revenu. En rupture conventionnelle, ces montants sont le
        minimum négociable.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold">Calcul précis pour votre situation</h2>
      <p className="mb-6 mt-2 text-griseNote">
        Salaire exact, mois supplémentaires, type de rupture :
      </p>
      <LicenciementCalculator anneesInitiales={a} />

      <h2 className="mt-12 font-display text-2xl font-bold">Anciennetés proches</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        {[a - 2, a - 1, a + 1, a + 2]
          .filter((x) => ANCIENNETES.includes(x))
          .map((x) => (
            <li key={x}>
              <Link
                href={`/emploi/indemnite-licenciement/${x}-ans/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                {x} ans d'ancienneté
              </Link>
            </li>
          ))}
      </ul>

      <p className="mt-10 text-xs text-griseNote">
        Indemnité légale (Code du travail) — votre convention collective peut prévoir davantage.
        Ces informations ne constituent pas un conseil juridique. Mis à jour : janvier {ANNEE}.
      </p>
    </div>
  );
}
