import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { ANNEE } from "@/data/baremes2026";

const CATEGORIES = [
  { titre: "Salaire", desc: "Brut en net, coût employeur, temps partiel", href: "/salaire/brut-net/", dispo: true },
  { titre: "Impôts", desc: "Impôt sur le revenu, prélèvement à la source", href: "/impots/", dispo: true },
  { titre: "Immobilier", desc: "Frais de notaire, prêt, capacité d'emprunt", href: "/immobilier/", dispo: true },
  { titre: "Emploi & droits", desc: "Licenciement, rupture conventionnelle, chômage", href: "/emploi/", dispo: true },
  { titre: "Auto-entrepreneur", desc: "Charges, revenus nets, seuils de TVA", href: "/entrepreneur/", dispo: true },
  { titre: "Épargne & crédit", desc: "Intérêts composés, crédit consommation", href: "/epargne/", dispo: true },
];

export default function Home() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className="border-b border-ligne bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="etiquette">Barèmes officiels {ANNEE} · gratuit · sans inscription</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Vos calculs de salaire, d'impôts et d'immobilier,{" "}
            <span className="surligne">enfin clairs</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-griseNote">
            Des simulateurs précis qui détaillent chaque ligne du calcul, comme sur votre fiche de
            paie — mais en compréhensible.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/salaire/brut-net/"
              className="rounded-lg bg-marine px-5 py-3 font-semibold text-white transition hover:bg-marineFonce"
            >
              Convertir mon brut en net
            </Link>
            <Link
              href="/salaire/brut-net/3000/"
              className="rounded-lg border border-ligne bg-white px-5 py-3 font-semibold text-encre transition hover:border-marine hover:text-marine"
            >
              3 000 € brut, ça fait combien ?
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Catégories ---- */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold">Tous les calculateurs</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) =>
            c.dispo ? (
              <Link
                key={c.titre}
                href={c.href}
                className="group rounded-xl border border-ligne bg-white p-5 shadow-fiche transition hover:border-marine"
              >
                <h3 className="font-display text-lg font-bold group-hover:text-marine">{c.titre}</h3>
                <p className="mt-1 text-sm text-griseNote">{c.desc}</p>
              </Link>
            ) : (
              <div key={c.titre} className="rounded-xl border border-dashed border-ligne p-5 opacity-70">
                <h3 className="font-display text-lg font-bold">{c.titre}</h3>
                <p className="mt-1 text-sm text-griseNote">{c.desc}</p>
                <p className="mt-2 inline-block rounded bg-papier px-2 py-0.5 text-xs font-semibold text-griseNote">
                  Bientôt disponible
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ---- Derniers articles ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold">Derniers articles</h2>
          <Link href="/blog/" className="text-sm font-semibold text-marine hover:underline">
            Tout le blog →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}/`}
              className="group rounded-xl border border-ligne bg-white p-5 shadow-fiche transition hover:border-marine"
            >
              <p className="etiquette">{a.categorie} · {a.lectureMin} min</p>
              <h3 className="mt-1 font-display text-base font-bold leading-snug group-hover:text-marine">
                {a.titre}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Confiance ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-xl border border-ligne bg-white p-6 shadow-fiche sm:p-8">
          <h2 className="font-display text-xl font-bold">Pourquoi faire confiance à ces résultats ?</h2>
          <div className="mt-4 grid gap-6 text-sm leading-relaxed text-encre/90 sm:grid-cols-3">
            <p>
              <strong className="block">Sources officielles.</strong> Chaque taux provient de
              l'URSSAF, d'impots.gouv.fr ou de service-public.fr, avec la source citée sur chaque page.
            </p>
            <p>
              <strong className="block">Mise à jour annuelle.</strong> Tous les barèmes sont
              actualisés chaque janvier dès la publication de la loi de finances.
            </p>
            <p>
              <strong className="block">Calcul transparent.</strong> Aucune boîte noire : le détail
              de chaque ligne de cotisation est affiché, comme sur une fiche de paie.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
