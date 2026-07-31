import type { Metadata } from "next";
import Link from "next/link";
import ChomageCalculator from "@/components/calculateurs/ChomageCalculator";
import { calculerARE } from "@/lib/chomage";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

/**
 * SEO PROGRAMMATIQUE — "allocation chômage pour X € de salaire"
 * 1 500 → 6 000 € par pas de 250 → 19 pages.
 */

const SALAIRES: number[] = [];
for (let s = 1500; s <= 6000; s += 250) SALAIRES.push(s);

export function generateStaticParams() {
  return SALAIRES.map((s) => ({ salaire: String(s) }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { salaire: string } }): Metadata {
  const s = parseInt(params.salaire);
  const r = calculerARE(s, 24, "moins53");
  return {
    title: `Chômage pour ${s.toLocaleString("fr-FR")} € brut : ${euros(r.allocationMensuelle)} € d'ARE (${ANNEE})`,
    description: `Avec un salaire de ${s.toLocaleString("fr-FR")} € brut, l'allocation chômage atteint environ ${euros(r.allocationMensuelle)} € brut par mois (${r.tauxRemplacement.toFixed(0)} % du salaire). Durée et dégressivité détaillées.`,
    alternates: { canonical: `/emploi/allocation-chomage/${s}/` },
  };
}

export default function Page({ params }: { params: { salaire: string } }) {
  const s = parseInt(params.salaire);
  const r = calculerARE(s, 24, "moins53");
  const sFr = s.toLocaleString("fr-FR");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/emploi/allocation-chomage/" className="hover:text-marine">Allocation chômage</Link>
        <span className="mx-2">›</span>
        <span>{sFr} €</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Chômage pour {sFr} € brut :{" "}
        <span className="surligne font-tab">{euros(r.allocationMensuelle)} €</span> / mois
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Après un salaire de {sFr} € brut mensuel, l'ARE s'élève à environ{" "}
        <strong className="text-encre">{euros(r.allocationMensuelle)} € brut par mois</strong>{" "}
        ({r.allocationJournaliere.toFixed(2).replace(".", ",")} € par jour), soit{" "}
        {r.tauxRemplacement.toFixed(0)} % de votre ancien brut — pour une carrière continue et
        un âge inférieur à 53 ans.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
          <p className="etiquette">Allocation journalière</p>
          <p className="font-tab text-2xl font-semibold">{r.allocationJournaliere.toFixed(2).replace(".", ",")} €</p>
        </div>
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
          <p className="etiquette">Durée maximale estimée</p>
          <p className="font-tab text-2xl font-semibold">{r.dureeMois.toFixed(1).replace(".", ",")} mois</p>
        </div>
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
          <p className="etiquette">Dégressivité hauts revenus</p>
          <p className="font-tab text-2xl font-semibold">{r.degressivite ? "Oui (−30 %)" : "Non"}</p>
          {r.degressivite && (
            <p className="mt-1 text-xs text-griseNote">
              ≈ {euros(r.allocationApresDegressivite)} €/mois dès le 7e mois
            </p>
          )}
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Ajustez à votre parcours</h2>
      <p className="mb-6 mt-2 text-griseNote">Mois travaillés, âge, périodes d'inactivité :</p>
      <ChomageCalculator salaireInitial={s} />

      <h2 className="mt-12 font-display text-2xl font-bold">Salaires proches</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        {[s - 500, s - 250, s + 250, s + 500]
          .filter((x) => SALAIRES.includes(x))
          .map((x) => (
            <li key={x}>
              <Link
                href={`/emploi/allocation-chomage/${x}/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                {x.toLocaleString("fr-FR")} € brut
              </Link>
            </li>
          ))}
      </ul>

      <p className="mt-10 text-xs text-griseNote">
        Estimation brute simplifiée {ANNEE} — avant CSG/CRDS, hors différés d'indemnisation.
        Sources : unedic.org, francetravail.fr. Seule l'étude de France Travail fait foi.
      </p>
    </div>
  );
}
