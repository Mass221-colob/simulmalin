import type { Metadata } from "next";
import Link from "next/link";
import FraisNotaireCalculator from "@/components/calculateurs/FraisNotaireCalculator";
import { calculerFraisNotaire } from "@/lib/fraisNotaire";
import { euros } from "@/lib/brutNet";
import { ANNEE, DMTO } from "@/data/baremes2026";
import { DEPARTEMENTS, departementParSlug } from "@/data/departements";

/**
 * SEO PROGRAMMATIQUE — 101 pages, une par département.
 * /immobilier/frais-notaire/gironde-33/, /immobilier/frais-notaire/paris-75/, etc.
 */

export function generateStaticParams() {
  return DEPARTEMENTS.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

const PRIX_EXEMPLES = [150000, 200000, 250000, 300000, 400000];

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const dep = departementParSlug(params.slug)!;
  const ex = calculerFraisNotaire(250000, "ancien", dep.dmto);
  return {
    title: `Frais de notaire ${dep.nom} (${dep.code}) ${ANNEE} — taux et calcul`,
    description: `Frais de notaire en ${dep.nom} : taux de droits de mutation ${ex.tauxDroits.toFixed(2)} % dans l'ancien. Exemple : ${euros(ex.total)} € de frais pour un achat à 250 000 €.`,
    alternates: { canonical: `/immobilier/frais-notaire/${dep.slug}/` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const dep = departementParSlug(params.slug)!;
  const reduit = dep.dmto === "reduit";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/immobilier/frais-notaire/" className="hover:text-marine">Frais de notaire</Link>
        <span className="mx-2">›</span>
        <span>{dep.nom}</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Frais de notaire en <span className="surligne">{dep.nom}</span> ({dep.code})
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Dans l'ancien, le département {reduit ? "applique le taux réduit" : "applique le taux standard"} de
        droits de mutation : <strong className="text-encre">{DMTO[dep.dmto].toFixed(2)} %</strong> du prix
        d'achat{reduit ? ", un avantage rare en France" : ""}. Dans le neuf, le taux est national (≈ 0,71 %).
      </p>

      <h2 className="mt-8 font-display text-2xl font-bold">Exemples de frais dans l'ancien</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full max-w-2xl text-sm">
          <thead>
            <tr className="text-left text-griseNote">
              <th className="filet py-2 font-medium">Prix du bien</th>
              <th className="filet py-2 text-right font-medium">Frais de notaire</th>
              <th className="filet py-2 text-right font-medium">% du prix</th>
              <th className="filet py-2 text-right font-medium">Coût total</th>
            </tr>
          </thead>
          <tbody>
            {PRIX_EXEMPLES.map((p) => {
              const r = calculerFraisNotaire(p, "ancien", dep.dmto);
              return (
                <tr key={p} className="filet">
                  <td className="py-2 font-tab">{euros(p)} €</td>
                  <td className="py-2 text-right font-tab font-semibold">{euros(r.total)} €</td>
                  <td className="py-2 text-right font-tab">{r.pourcentage.toFixed(2)} %</td>
                  <td className="py-2 text-right font-tab">{euros(p + r.total)} €</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Calculez pour votre projet en {dep.nom}</h2>
      <p className="mb-6 mt-2 text-griseNote">Prix exact, neuf ou ancien : le détail complet ci-dessous.</p>
      <FraisNotaireCalculator codeDepartementInitial={dep.code} />

      <h2 className="mt-12 font-display text-2xl font-bold">Autres départements</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        {(() => {
          const i = DEPARTEMENTS.findIndex((d) => d.code === dep.code);
          const proches = [i - 2, i - 1, i + 1, i + 2]
            .filter((j) => j >= 0 && j < DEPARTEMENTS.length)
            .map((j) => DEPARTEMENTS[j]);
          return proches.map((d) => (
            <li key={d.code}>
              <Link
                href={`/immobilier/frais-notaire/${d.slug}/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 transition hover:border-marine hover:text-marine"
              >
                {d.nom} ({d.code})
              </Link>
            </li>
          ));
        })()}
      </ul>
      <p className="mt-6 text-sm text-griseNote">
        Voir aussi :{" "}
        <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
          tous les départements
        </Link>{" "}
        ·{" "}
        <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
          calculateur brut en net
        </Link>
      </p>

      <p className="mt-10 text-xs text-griseNote">
        ⚠️ Certains départements ont voté des majorations temporaires des droits de mutation
        depuis 2025 : le taux exact applicable à votre achat est confirmé par votre notaire.
        Sources : notaires.fr, impots.gouv.fr. Mis à jour : janvier {ANNEE}.
      </p>
    </div>
  );
}
