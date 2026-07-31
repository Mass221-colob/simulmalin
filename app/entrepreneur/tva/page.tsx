import type { Metadata } from "next";
import Link from "next/link";
import TvaCalculator from "@/components/calculateurs/TvaCalculator";
import { ANNEE, TAUX_TVA } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur TVA ${ANNEE} — conversion HT ⇄ TTC`,
  description: `Calculez la TVA ${ANNEE} dans les deux sens : HT vers TTC ou TTC vers HT, aux taux 20 %, 10 %, 5,5 % et 2,1 %. Résultat instantané pour vos factures.`,
  alternates: { canonical: "/entrepreneur/tva/" },
};

const FAQ = [
  {
    q: "Comment retrouver le montant HT à partir du TTC ?",
    r: "Il faut diviser, et non soustraire : le HT s'obtient en divisant le TTC par 1,20 pour un taux de 20 %. L'erreur classique consiste à retirer 20 % du TTC, ce qui donne un résultat faux — retirer 20 % de 120 € donne 96 € alors que le HT correct est 100 €.",
  },
  {
    q: "Quel taux de TVA appliquer à mon activité ?",
    r: "Le taux normal de 20 % couvre la majorité des biens et services. Le taux intermédiaire de 10 % vise notamment la restauration, les transports de voyageurs et les travaux de rénovation de logements anciens. Le taux réduit de 5,5 % s'applique aux produits alimentaires, aux livres, à l'énergie et aux travaux d'amélioration énergétique. Le taux de 2,1 % est réservé aux médicaments remboursables et à la presse.",
  },
  {
    q: "Suis-je concerné en tant qu'auto-entrepreneur ?",
    r: "Tant que votre chiffre d'affaires reste sous le seuil de franchise en base, vous facturez sans TVA en portant la mention « TVA non applicable, art. 293 B du CGI ». Au-delà, vous devez facturer la TVA, la reverser à l'État et pouvez en contrepartie récupérer celle payée sur vos achats professionnels.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/entrepreneur/" className="hover:text-marine">Auto-entrepreneur</Link>
        <span className="mx-2">›</span>
        <span>TVA</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">TVA</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Conversion HT ⇄ TTC dans les deux sens, aux quatre taux en vigueur.
      </p>

      <div className="mt-8">
        <TvaCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Les taux de TVA en {ANNEE}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-griseNote">
                <th className="filet py-2 font-medium">Taux</th>
                <th className="filet py-2 font-medium">S'applique notamment à</th>
              </tr>
            </thead>
            <tbody>
              {TAUX_TVA.map((t) => (
                <tr key={t.taux} className="filet">
                  <td className="py-2 font-tab font-semibold">{t.taux.toLocaleString("fr-FR")} %</td>
                  <td className="py-2">{t.exemple}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 font-display text-2xl font-bold">Questions fréquentes</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-lg border border-ligne bg-white p-4">
              <summary className="cursor-pointer font-semibold marker:content-none">{f.q}</summary>
              <p className="mt-2 leading-relaxed text-encre/90">{f.r}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 leading-relaxed text-encre/90">
          Pour savoir si votre activité franchit le seuil de TVA, utilisez le{" "}
          <Link href="/entrepreneur/charges-auto-entrepreneur/" className="font-semibold text-marine hover:underline">
            calculateur de charges auto-entrepreneur
          </Link>{" "}
          et ses jauges de seuils.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : impots.gouv.fr, service-public.fr. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
