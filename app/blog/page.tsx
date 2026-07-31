import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { VignetteArticle } from "@/components/IllustrationsBlog";

export const metadata: Metadata = {
  title: "Blog — comprendre l'argent, les impôts et vos droits",
  description:
    "Guides clairs sur le salaire, les impôts, l'immobilier et le statut d'auto-entrepreneur : comprendre les règles pour faire les bons choix.",
  alternates: { canonical: "/blog/" },
};

export default function Page() {
  const tries = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  const [une, ...suite] = tries;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Le blog <span className="surligne">SimulMalin</span>
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Des guides sans jargon pour comprendre ce que les calculateurs calculent — et prendre de
        meilleures décisions avec votre argent.
      </p>

      {/* ---- Article à la une ---- */}
      <Link
        href={`/blog/${une.slug}/`}
        className="group mt-8 block overflow-hidden rounded-xl border border-ligne bg-white shadow-fiche transition hover:border-marine sm:grid sm:grid-cols-2"
      >
        <span className="block h-44 border-b border-ligne sm:h-full sm:border-b-0 sm:border-r">
          <VignetteArticle categorie={une.categorie} />
        </span>
        <span className="block p-6">
          <span className="etiquette">
            À la une · {une.categorie} ·{" "}
            {new Date(une.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold leading-snug group-hover:text-marine">
            {une.titre}
          </h2>
          <span className="mt-3 block text-sm text-griseNote">{une.extrait}</span>
          <span className="mt-4 block text-sm font-semibold text-marine">
            Lire l'article ({une.lectureMin} min) →
          </span>
        </span>
      </Link>

      {/* ---- Autres articles ---- */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suite.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}/`}
            className="group flex flex-col overflow-hidden rounded-xl border border-ligne bg-white shadow-fiche transition hover:border-marine"
          >
            <span className="block h-32 border-b border-ligne">
              <VignetteArticle categorie={a.categorie} />
            </span>
            <span className="flex flex-1 flex-col p-5">
              <span className="etiquette">
                {a.categorie} ·{" "}
                {new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}{" "}
                · {a.lectureMin} min
              </span>
              <h2 className="mt-1 font-display text-lg font-bold leading-snug group-hover:text-marine">
                {a.titre}
              </h2>
              <span className="mt-2 text-sm text-griseNote">{a.extrait}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
