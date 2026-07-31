import type { Metadata } from "next";
import Link from "next/link";
import BrutNetCalculator from "@/components/calculateurs/BrutNetCalculator";
import { calculerBrutNet, euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

/**
 * SEO PROGRAMMATIQUE
 * Génère statiquement une page par montant : /salaire/brut-net/1500/ … /salaire/brut-net/10000/
 * → 86 pages ciblant les requêtes "3000 brut en net", "2500 euros brut en net", etc.
 */

const MONTANTS: number[] = [];
for (let m = 1500; m <= 10000; m += 100) MONTANTS.push(m);

export function generateStaticParams() {
  return MONTANTS.map((m) => ({ montant: String(m) }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { montant: string };
}): Metadata {
  const m = parseInt(params.montant);
  const net = euros(calculerBrutNet(m, "non-cadre", 0).netMensuel);
  return {
    title: `${m.toLocaleString("fr-FR")} € brut en net ${ANNEE} : ${net} € net par mois`,
    description: `${m.toLocaleString("fr-FR")} € brut correspondent à environ ${net} € net mensuel pour un non-cadre en ${ANNEE}. Détail cadre, fonction publique, net après impôt.`,
    alternates: { canonical: `/salaire/brut-net/${m}/` },
  };
}

export default function Page({ params }: { params: { montant: string } }) {
  const brut = parseInt(params.montant);
  const nonCadre = calculerBrutNet(brut, "non-cadre", 0);
  const cadre = calculerBrutNet(brut, "cadre", 0);
  const fp = calculerBrutNet(brut, "fonction-publique", 0);

  const brutFr = brut.toLocaleString("fr-FR");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/salaire/brut-net/" className="hover:text-marine">Brut en net</Link>
        <span className="mx-2">›</span>
        <span>{brutFr} €</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {brutFr} € brut en net : <span className="surligne font-tab">{euros(nonCadre.netMensuel)} €</span> par mois
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Un salaire de {brutFr} € brut mensuel correspond à environ{" "}
        <strong className="text-encre">{euros(nonCadre.netMensuel)} € net</strong> pour un salarié
        non-cadre en {ANNEE}, avant impôt sur le revenu. Le détail selon votre statut :
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Non-cadre", r: nonCadre },
          { label: "Cadre", r: cadre },
          { label: "Fonction publique", r: fp },
        ].map(({ label, r }) => (
          <div key={label} className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
            <p className="etiquette">{label}</p>
            <p className="font-tab text-2xl font-semibold">{euros(r.netMensuel)} € <span className="text-sm font-normal text-griseNote">net/mois</span></p>
            <p className="mt-1 text-xs text-griseNote">
              soit {euros(r.netAnnuel)} € net/an — cotisations : {r.tauxGlobal.toFixed(1)} %
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Ajustez le calcul à votre situation</h2>
      <p className="mb-6 mt-2 text-griseNote">
        Temps partiel, taux de prélèvement à la source, calcul inverse : affinez ci-dessous.
      </p>
      <BrutNetCalculator montantInitial={brut} />

      <h2 className="mt-12 font-display text-2xl font-bold">Montants proches</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        {[brut - 200, brut - 100, brut + 100, brut + 200]
          .filter((m) => m >= 1500 && m <= 10000)
          .map((m) => (
            <li key={m}>
              <Link
                href={`/salaire/brut-net/${m}/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                {m.toLocaleString("fr-FR")} € brut en net
              </Link>
            </li>
          ))}
      </ul>

      <p className="mt-10 text-xs text-griseNote">
        Estimations basées sur les taux de cotisations standards {ANNEE}. Sources : URSSAF,
        service-public.fr. Mis à jour en janvier {ANNEE}.
      </p>
    </div>
  );
}
