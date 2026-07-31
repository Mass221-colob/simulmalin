import type { Metadata } from "next";
import Link from "next/link";
import ImpotRevenuCalculator from "@/components/calculateurs/ImpotRevenuCalculator";
import { calculerIR, appliquerAbattement } from "@/lib/impotRevenu";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

/**
 * SEO PROGRAMMATIQUE
 * /impots/impot-revenu/15000/ … /impots/impot-revenu/100000/
 * 15 000 → 60 000 par pas de 1 000, puis 60 000 → 100 000 par pas de 5 000.
 * → 54 pages ciblant "impôt sur 30000 euros", "combien d'impôt pour 40000", etc.
 */

const REVENUS: number[] = [];
for (let r = 15000; r <= 60000; r += 1000) REVENUS.push(r);
for (let r = 65000; r <= 100000; r += 5000) REVENUS.push(r);

export function generateStaticParams() {
  return REVENUS.map((r) => ({ revenu: String(r) }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { revenu: string };
}): Metadata {
  const r = parseInt(params.revenu);
  const imposable = appliquerAbattement(r);
  const celib = calculerIR(imposable, "celibataire", 0);
  return {
    title: `Impôt sur ${r.toLocaleString("fr-FR")} € de revenus en ${ANNEE} : ${euros(celib.impotNet)} € (célibataire)`,
    description: `Avec ${r.toLocaleString("fr-FR")} € de revenus annuels, un célibataire paie environ ${euros(celib.impotNet)} € d'impôt en ${ANNEE}. Détail couple et enfants, taux moyen et marginal.`,
    alternates: { canonical: `/impots/impot-revenu/${r}/` },
  };
}

export default function Page({ params }: { params: { revenu: string } }) {
  const revenu = parseInt(params.revenu);
  const imposable = appliquerAbattement(revenu);
  const revenuFr = revenu.toLocaleString("fr-FR");

  const situations = [
    { label: "Célibataire sans enfant", r: calculerIR(imposable, "celibataire", 0) },
    { label: "Couple sans enfant", r: calculerIR(imposable, "couple", 0) },
    { label: "Couple, 2 enfants", r: calculerIR(imposable, "couple", 2) },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/impots/impot-revenu/" className="hover:text-marine">Impôt sur le revenu</Link>
        <span className="mx-2">›</span>
        <span>{revenuFr} €</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Impôt sur {revenuFr} € de revenus :{" "}
        <span className="surligne font-tab">{euros(situations[0].r.impotNet)} €</span> en {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Pour {revenuFr} € de revenus annuels déclarés (soit {euros(imposable)} € imposables après
        l'abattement de 10 %), un célibataire sans enfant paie environ{" "}
        <strong className="text-encre">{euros(situations[0].r.impotNet)} €</strong> d'impôt sur le
        revenu. Selon votre situation familiale :
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {situations.map(({ label, r }) => (
          <div key={label} className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
            <p className="etiquette">{label}</p>
            <p className="font-tab text-2xl font-semibold">
              {euros(r.impotNet)} € <span className="text-sm font-normal text-griseNote">/ an</span>
            </p>
            <p className="mt-1 text-xs text-griseNote">
              Taux moyen : {r.tauxMoyen.toFixed(1)} % — TMI : {r.tauxMarginal} %
              {r.impotNet === 0 && " — non imposable"}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Affinez selon votre foyer</h2>
      <p className="mb-6 mt-2 text-griseNote">
        Nombre d'enfants, imposition commune, frais réels : ajustez tous les paramètres.
      </p>
      <ImpotRevenuCalculator revenuInitial={revenu} />

      <h2 className="mt-12 font-display text-2xl font-bold">Revenus proches</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        {[revenu - 2000, revenu - 1000, revenu + 1000, revenu + 2000]
          .filter((m) => REVENUS.includes(m))
          .map((m) => (
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

      <p className="mt-10 text-xs text-griseNote">
        Estimations {ANNEE} incluant décote et plafonnement du quotient familial, hors réductions
        et crédits d'impôt. Sources : impots.gouv.fr, service-public.fr.
      </p>
    </div>
  );
}
