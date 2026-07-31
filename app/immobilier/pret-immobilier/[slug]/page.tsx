import type { Metadata } from "next";
import Link from "next/link";
import PretImmobilierCalculator from "@/components/calculateurs/PretImmobilierCalculator";
import { calculerPret } from "@/lib/pretImmobilier";
import { euros } from "@/lib/brutNet";
import { ANNEE, TAUX_INDICATIFS, TAUX_ASSURANCE_DEFAUT } from "@/data/baremes2026";

/**
 * SEO PROGRAMMATIQUE — "emprunter X € sur Y ans"
 * Montants 100 000 → 500 000 (pas de 50 000) × durées 10/15/20/25 ans = 36 pages,
 * + montants intermédiaires courants (120k, 180k, 220k, 280k) × 20/25 ans = 8 pages.
 * Slugs : /immobilier/pret-immobilier/200000-sur-20-ans/
 */

const COMBINAISONS: { montant: number; duree: number }[] = [];
for (let m = 100000; m <= 500000; m += 50000) {
  for (const d of [10, 15, 20, 25]) COMBINAISONS.push({ montant: m, duree: d });
}
for (const m of [120000, 180000, 220000, 280000]) {
  for (const d of [20, 25]) COMBINAISONS.push({ montant: m, duree: d });
}

const slugDe = (m: number, d: number) => `${m}-sur-${d}-ans`;

function parseSlug(slug: string): { montant: number; duree: number } | null {
  const match = slug.match(/^(\d+)-sur-(\d+)-ans$/);
  if (!match) return null;
  const montant = parseInt(match[1]);
  const duree = parseInt(match[2]);
  if (!COMBINAISONS.some((c) => c.montant === montant && c.duree === duree)) return null;
  return { montant, duree };
}

export function generateStaticParams() {
  return COMBINAISONS.map((c) => ({ slug: slugDe(c.montant, c.duree) }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { montant, duree } = parseSlug(params.slug)!;
  const taux = TAUX_INDICATIFS[duree];
  const r = calculerPret(montant, taux, duree, TAUX_ASSURANCE_DEFAUT);
  return {
    title: `Emprunter ${montant.toLocaleString("fr-FR")} € sur ${duree} ans : mensualité de ${euros(r.mensualiteTotale)} €`,
    description: `Prêt de ${montant.toLocaleString("fr-FR")} € sur ${duree} ans à ${taux} % : mensualité ${euros(r.mensualiteTotale)} € assurance incluse, coût total du crédit ${euros(r.coutTotalCredit)} €. Salaire nécessaire et tableau d'amortissement.`,
    alternates: { canonical: `/immobilier/pret-immobilier/${params.slug}/` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { montant, duree } = parseSlug(params.slug)!;
  const taux = TAUX_INDICATIFS[duree];
  const r = calculerPret(montant, taux, duree, TAUX_ASSURANCE_DEFAUT);
  const montantFr = montant.toLocaleString("fr-FR");
  // Salaire nécessaire : mensualité ≤ 35 % des revenus nets
  const salaireNecessaire = (r.mensualiteTotale / 35) * 100;

  const autresDurees = [10, 15, 20, 25].filter((d) => d !== duree);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/immobilier/pret-immobilier/" className="hover:text-marine">Prêt immobilier</Link>
        <span className="mx-2">›</span>
        <span>{montantFr} € sur {duree} ans</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Emprunter {montantFr} € sur {duree} ans :{" "}
        <span className="surligne font-tab">{euros(r.mensualiteTotale)} €</span> / mois
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Au taux indicatif de {taux} % (assurance {TAUX_ASSURANCE_DEFAUT} %), un prêt de {montantFr} €
        sur {duree} ans coûte <strong className="text-encre">{euros(r.mensualiteTotale)} € par mois</strong>,
        assurance incluse. Pour respecter la règle des 35 % d'endettement, il faut environ{" "}
        <strong className="text-encre">{euros(salaireNecessaire)} € de revenus nets mensuels</strong>.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
          <p className="etiquette">Coût des intérêts</p>
          <p className="font-tab text-2xl font-semibold">{euros(r.coutInterets)} €</p>
        </div>
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
          <p className="etiquette">Coût de l'assurance</p>
          <p className="font-tab text-2xl font-semibold">{euros(r.coutAssurance)} €</p>
        </div>
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
          <p className="etiquette">Coût total du crédit</p>
          <p className="font-tab text-2xl font-semibold text-marine">{euros(r.coutTotalCredit)} €</p>
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Ajustez le taux et votre situation</h2>
      <p className="mb-6 mt-2 text-griseNote">
        Taux de votre banque, assurance déléguée, tableau d'amortissement exportable :
      </p>
      <PretImmobilierCalculator capitalInitial={montant} dureeInitiale={duree} />

      <h2 className="mt-12 font-display text-2xl font-bold">Même montant, autres durées</h2>
      <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
        {autresDurees.map((d) => {
          const alt = calculerPret(montant, TAUX_INDICATIFS[d], d, TAUX_ASSURANCE_DEFAUT);
          const existe = COMBINAISONS.some((c) => c.montant === montant && c.duree === d);
          const contenu = (
            <>
              {montantFr} € sur {d} ans — {euros(alt.mensualiteTotale)} €/mois
            </>
          );
          return (
            <li key={d}>
              {existe ? (
                <Link
                  href={`/immobilier/pret-immobilier/${slugDe(montant, d)}/`}
                  className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
                >
                  {contenu}
                </Link>
              ) : (
                <span className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab">{contenu}</span>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-sm text-griseNote">
        Voir aussi : les{" "}
        <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
          frais de notaire
        </Link>{" "}
        à prévoir en plus de ce financement.
      </p>

      <p className="mt-10 text-xs text-griseNote">
        Taux indicatifs {ANNEE} — l'offre réelle dépend de votre profil et de la banque. Un crédit
        vous engage et doit être remboursé ; vérifiez vos capacités de remboursement avant de vous engager.
      </p>
    </div>
  );
}
