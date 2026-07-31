import Link from "next/link";

export interface Outil {
  nom: string;
  desc: string;
  href?: string; // absent = à venir
}

export default function HubCategorie({
  titre,
  intro,
  outils,
}: {
  titre: string;
  intro: string;
  outils: Outil[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <span>{titre}</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateurs <span className="surligne">{titre.toLowerCase()}</span>
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">{intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {outils.map((o) =>
          o.href ? (
            <Link
              key={o.nom}
              href={o.href}
              className="group rounded-xl border border-ligne bg-white p-5 shadow-fiche transition hover:border-marine"
            >
              <h2 className="font-display text-lg font-bold group-hover:text-marine">{o.nom}</h2>
              <p className="mt-1 text-sm text-griseNote">{o.desc}</p>
            </Link>
          ) : (
            <div key={o.nom} className="rounded-xl border border-dashed border-ligne p-5 opacity-75">
              <h2 className="font-display text-lg font-bold">{o.nom}</h2>
              <p className="mt-1 text-sm text-griseNote">{o.desc}</p>
              <p className="mt-2 inline-block rounded bg-papier px-2 py-0.5 text-xs font-semibold text-griseNote">
                Bientôt disponible
              </p>
            </div>
          )
        )}
      </div>

      <p className="mt-10 text-sm text-griseNote">
        En attendant, essayez notre{" "}
        <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
          calculateur brut en net
        </Link>
        , déjà disponible.
      </p>
    </div>
  );
}
