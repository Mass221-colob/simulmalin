import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog — comprendre l'argent, les impôts et vos droits",
  description:
    "Guides clairs sur le salaire, les impôts, l'immobilier et le statut d'auto-entrepreneur : comprendre les règles pour faire les bons choix.",
  alternates: { canonical: "/blog/" },
};

export default function Page() {
  const tries = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Le blog <span className="surligne">SimulMalin</span>
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Des guides sans jargon pour comprendre ce que les calculateurs calculent — et prendre de
        meilleures décisions avec votre argent.
      </p>

      <div className="mt-8 space-y-4">
        {tries.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}/`}
            className="group block rounded-xl border border-ligne bg-white p-5 shadow-fiche transition hover:border-marine"
          >
            <p className="etiquette">
              {a.categorie} ·{" "}
              {new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}{" "}
              · {a.lectureMin} min
            </p>
            <h2 className="mt-1 font-display text-xl font-bold group-hover:text-marine">{a.titre}</h2>
            <p className="mt-2 text-sm text-griseNote">{a.extrait}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
