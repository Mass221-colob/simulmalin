import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-display text-6xl font-extrabold">
        4<span className="surligne">0</span>4
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold">Cette page n'existe pas</h1>
      <p className="mt-2 text-griseNote">
        L'adresse est peut-être erronée, ou la page a été déplacée.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-lg bg-marine px-5 py-3 font-semibold text-white transition hover:bg-marineFonce">
          Retour à l'accueil
        </Link>
        <Link href="/salaire/brut-net/" className="rounded-lg border border-ligne bg-white px-5 py-3 font-semibold transition hover:border-marine hover:text-marine">
          Calculateur brut en net
        </Link>
      </div>
    </div>
  );
}
