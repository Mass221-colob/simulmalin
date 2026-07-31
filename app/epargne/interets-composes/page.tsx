import type { Metadata } from "next";
import Link from "next/link";
import EpargneCalculator from "@/components/calculateurs/EpargneCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur intérêts composés ${ANNEE} — simulateur d'épargne`,
  description: `Simulez la croissance de votre épargne ${ANNEE} : intérêts composés avec versements mensuels, graphique d'évolution, comparaison Livret A, assurance-vie et PEA.`,
  alternates: { canonical: "/epargne/interets-composes/" },
};

const FAQ = [
  {
    q: "Qu'est-ce que l'intérêt composé exactement ?",
    r: "L'intérêt composé, ce sont des intérêts qui produisent eux-mêmes des intérêts. Avec 10 000 € à 5 %, vous gagnez 500 € la première année ; la deuxième, les 5 % s'appliquent à 10 500 €, soit 525 €, et ainsi de suite. La croissance n'est pas linéaire mais exponentielle : c'est pourquoi la courbe du capital s'écarte progressivement de celle des versements.",
  },
  {
    q: "Pourquoi le temps compte-t-il plus que le montant ?",
    r: "Parce que l'effet s'accélère avec les années. Épargner 200 € par mois pendant 30 ans à 5 % produit bien plus du double de ce que produit le même effort sur 15 ans : les dernières années génèrent à elles seules une part énorme des gains. Commencer tôt, même avec de petits montants, bat presque toujours un effort plus important mais tardif.",
  },
  {
    q: "Quel rendement retenir pour une simulation réaliste ?",
    r: "Les livrets réglementés suivent les taux fixés par l'État et protègent surtout contre l'inflation. Les fonds euros d'assurance-vie servent des rendements modérés avec capital garanti. Les placements en actions (PEA, unités de compte) ont historiquement délivré davantage sur le long terme, mais avec une volatilité forte et un risque réel de perte en capital. Il n'existe pas de rendement élevé sans risque : méfiez-vous de toute promesse qui l'affirme.",
  },
  {
    q: "L'inflation est-elle prise en compte ?",
    r: "Non, cette simulation raisonne en euros courants. Pour connaître votre pouvoir d'achat futur, retranchez mentalement l'inflation du rendement : un placement à 4 % avec 2 % d'inflation ne vous enrichit réellement que de 2 % par an. C'est le rendement « réel », le seul qui compte à long terme.",
  },
  {
    q: "Quelle fiscalité sur les gains ?",
    r: "Le Livret A, le LDDS et le LEP sont totalement exonérés d'impôt et de prélèvements sociaux. L'assurance-vie supporte au minimum 17,2 % de prélèvements sociaux sur les gains, avec un régime fiscal avantageux après huit ans. Les autres placements relèvent en général du prélèvement forfaitaire unique de 30 %. Le PEA est exonéré d'impôt sur le revenu après cinq ans, les prélèvements sociaux restant dus.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/epargne/" className="hover:text-marine">Épargne</Link>
        <span className="mx-2">›</span>
        <span>Intérêts composés</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">intérêts composés</span>
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Voyez la part de votre capital qui vient de votre effort — et celle qui vient du temps.
        Versements mensuels, graphique de croissance et fiscalité par support.
      </p>

      <div className="mt-8">
        <EpargneCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le temps fait le gros du travail</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Prenez deux épargnants qui placent 200 € par mois à 5 %. Le premier commence à 25 ans et
          s'arrête à 35 ans : il aura versé 24 000 € et n'y touchera plus. Le second commence à
          35 ans et verse jusqu'à 65 ans, soit 72 000 €. À 65 ans, le premier — qui a versé trois
          fois moins — se retrouve avec un capital comparable, parfois supérieur. La différence
          ne vient pas du montant épargné mais des années laissées aux intérêts pour se composer.
          C'est le seul levier financier accessible à tous, et le seul qu'on ne peut pas
          rattraper : dix ans perdus au début ne se rachètent jamais complètement ensuite.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold">Questions fréquentes</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-lg border border-ligne bg-white p-4">
              <summary className="cursor-pointer font-semibold marker:content-none">{f.q}</summary>
              <p className="mt-2 leading-relaxed text-encre/90">{f.r}</p>
            </details>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl font-bold">Calculateurs liés</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Pour déterminer ce que vous pouvez épargner chaque mois, commencez par votre{" "}
          <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
            salaire net
          </Link>{" "}
          ; et si vous hésitez entre épargne et immobilier, comparez avec le{" "}
          <Link href="/immobilier/rendement-locatif/" className="font-semibold text-marine hover:underline">
            rendement locatif
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Simulation à rendement constant, hors inflation. Les performances passées ne préjugent
          pas des performances futures. Ces informations ne constituent pas un conseil en
          investissement. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
