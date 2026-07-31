import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter l'équipe SimulMalin : signaler une erreur, suggérer un calculateur.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold">Contact</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-encre/90">
        <p>
          Pour signaler une erreur de calcul, suggérer un nouveau calculateur ou toute autre
          demande, écrivez-nous à :
        </p>
        <p className="rounded-lg border border-ligne bg-white p-4 font-tab text-lg">
          contact@simulmalin.net
        </p>
        <p className="text-sm text-griseNote">
          Nous répondons généralement sous 48 heures ouvrées. Les signalements d'erreurs de barème
          sont traités en priorité.
        </p>
      </div>
    </div>
  );
}
