import type { Metadata } from "next";
import Link from "next/link";
import AutoEntrepreneurCalculator from "@/components/calculateurs/AutoEntrepreneurCalculator";
import { calculerAE } from "@/lib/autoEntrepreneur";
import { euros } from "@/lib/brutNet";
import { ANNEE, AUTO_ENTREPRENEUR, type ActiviteAE } from "@/data/baremes2026";

/**
 * SEO PROGRAMMATIQUE — "auto-entrepreneur X € de chiffre d'affaires"
 * 10 000 → 90 000 € par pas de 5 000 → 17 pages.
 */

const CAS: number[] = [];
for (let c = 10000; c <= 90000; c += 5000) CAS.push(c);

export function generateStaticParams() {
  return CAS.map((c) => ({ ca: String(c) }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { ca: string } }): Metadata {
  const c = parseInt(params.ca);
  const bnc = calculerAE(c, "prestation-bnc", false, false);
  return {
    title: `Auto-entrepreneur : ${c.toLocaleString("fr-FR")} € de CA, combien en net (${ANNEE}) ?`,
    description: `Avec ${c.toLocaleString("fr-FR")} € de chiffre d'affaires, un auto-entrepreneur en libéral garde ${euros(bnc.netAvantImpot)} € net avant impôt. Détail par activité, ACRE et versement libératoire.`,
    alternates: { canonical: `/entrepreneur/charges-auto-entrepreneur/${c}/` },
  };
}

export default function Page({ params }: { params: { ca: string } }) {
  const ca = parseInt(params.ca);
  const caFr = ca.toLocaleString("fr-FR");

  const activites = (Object.keys(AUTO_ENTREPRENEUR) as ActiviteAE[]).map((a) => ({
    cle: a,
    libelle: AUTO_ENTREPRENEUR[a].libelle,
    r: calculerAE(ca, a, false, false),
  }));

  const bnc = activites.find((a) => a.cle === "prestation-bnc")!.r;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/entrepreneur/charges-auto-entrepreneur/" className="hover:text-marine">
          Charges auto-entrepreneur
        </Link>
        <span className="mx-2">›</span>
        <span>{caFr} €</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {caFr} € de CA en auto-entrepreneur :{" "}
        <span className="surligne font-tab">{euros(bnc.netAvantImpot)} €</span> net
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Avec {caFr} € de chiffre d'affaires annuel, une activité libérale (BNC) conserve environ{" "}
        <strong className="text-encre">{euros(bnc.netAvantImpot)} € avant impôt</strong>, soit{" "}
        {euros(bnc.netMensuel)} € par mois. Le détail selon votre activité :
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {activites.map(({ cle, libelle, r }) => (
          <div key={cle} className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
            <p className="etiquette">{libelle}</p>
            <p className="font-tab text-2xl font-semibold">
              {euros(r.netAvantImpot)} € <span className="text-sm font-normal text-griseNote">net/an</span>
            </p>
            <p className="mt-1 text-xs text-griseNote">
              Cotisations : {euros(r.cotisations + r.cfp)} € ({(r.tauxCotisations + AUTO_ENTREPRENEUR[cle].cfp).toLocaleString("fr-FR")} %)
              {r.depassementTVA && " — ⚠️ seuil TVA dépassé"}
              {r.depassementPlafond && " — ⚠️ plafond micro dépassé"}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Ajustez avec l'ACRE et le versement libératoire</h2>
      <p className="mb-6 mt-2 text-griseNote">
        Début d'activité, option fiscale, jauges de seuils : le calcul complet ci-dessous.
      </p>
      <AutoEntrepreneurCalculator caInitial={ca} />

      <h2 className="mt-12 font-display text-2xl font-bold">Chiffres d'affaires proches</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        {[ca - 10000, ca - 5000, ca + 5000, ca + 10000]
          .filter((c) => CAS.includes(c))
          .map((c) => (
            <li key={c}>
              <Link
                href={`/entrepreneur/charges-auto-entrepreneur/${c}/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                {c.toLocaleString("fr-FR")} € de CA
              </Link>
            </li>
          ))}
      </ul>

      <p className="mt-10 text-xs text-griseNote">
        Estimations {ANNEE} hors CFE et taxes consulaires. Sources : autoentrepreneur.urssaf.fr,
        service-public.fr. Mis à jour : janvier {ANNEE}.
      </p>
    </div>
  );
}
