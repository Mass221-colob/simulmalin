import type { Metadata } from "next";
import Link from "next/link";
import BrutNetCalculator from "@/components/calculateurs/BrutNetCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur salaire brut en net ${ANNEE} — gratuit et instantané`,
  description: `Convertissez votre salaire brut en net ${ANNEE} : cadre, non-cadre, fonction publique, temps partiel, avant et après impôt. Détail des cotisations ligne par ligne.`,
  alternates: { canonical: "/salaire/brut-net/" },
};

const FAQ = [
  {
    q: "Quelle est la différence entre le salaire brut et le salaire net ?",
    r: "Le salaire brut est le montant inscrit dans votre contrat de travail, avant toute retenue. Le salaire net est ce qui arrive réellement sur votre compte bancaire, après déduction des cotisations sociales salariales (retraite, CSG, CRDS…). L'écart représente environ 22 % du brut pour un non-cadre et 25 % pour un cadre.",
  },
  {
    q: `Combien font 2 500 € brut en net en ${ANNEE} ?`,
    r: "Pour un salarié non-cadre, 2 500 € brut correspondent à environ 1 950 € net mensuel avant impôt sur le revenu. Utilisez le calculateur ci-dessus pour affiner selon votre statut exact et votre taux de prélèvement à la source.",
  },
  {
    q: "Pourquoi un cadre touche-t-il un net plus faible à brut égal ?",
    r: "Les cadres cotisent légèrement plus, notamment via la cotisation APEC et des tranches de retraite complémentaire supplémentaires au-delà du plafond de la Sécurité sociale. L'écart reste toutefois modeste : environ 2 à 3 points de pourcentage.",
  },
  {
    q: "Le net affiché est-il le montant que je toucherai vraiment ?",
    r: "C'est une estimation fiable à quelques euros près. Le net réel dépend aussi de votre convention collective, de la part salariale de la mutuelle d'entreprise, des titres-restaurant ou d'un éventuel forfait transport. Pour connaître le montant exact après impôt, renseignez votre taux de prélèvement à la source.",
  },
  {
    q: "Comment passer du net au brut ?",
    r: "Utilisez le mode « Net → Brut » du calculateur : indiquez le net mensuel que vous visez et l'outil calcule le brut à négocier. En ordre de grandeur, multipliez votre net par 1,28 (non-cadre) ou 1,33 (cadre) pour retrouver le brut.",
  },
  {
    q: "Où trouver mon taux de prélèvement à la source ?",
    r: "Il figure en bas de votre fiche de paie et dans votre espace particulier sur impots.gouv.fr, rubrique « Gérer mon prélèvement à la source ». Vous pouvez le modifier en cas de changement de situation.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <span>Salaire brut en net</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur salaire <span className="surligne">brut en net</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Résultat instantané, détail des cotisations ligne par ligne, avant et après impôt.
        Barèmes {ANNEE} — mis à jour en janvier {ANNEE}.
      </p>

      <div className="mt-8">
        <BrutNetCalculator />
      </div>

      {/* ---- Contenu SEO ---- */}
      <article className="prose-custom mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Comment est calculé votre salaire net ?</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Votre employeur retient chaque mois sur votre salaire brut les cotisations sociales
          salariales : l'assurance vieillesse qui finance votre retraite de base, la retraite
          complémentaire AGIRC-ARRCO, puis la CSG et la CRDS qui financent la protection sociale.
          Particularité souvent méconnue : la CSG et la CRDS ne s'appliquent pas sur 100 % du brut
          mais sur 98,25 % de celui-ci. Une fois toutes ces lignes déduites, il reste votre net
          « avant impôt ». Depuis 2019, l'impôt sur le revenu est ensuite prélevé à la source
          directement sur ce net, selon un taux personnalisé transmis par l'administration fiscale.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold">Les ordres de grandeur à retenir en {ANNEE}</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Pour estimer rapidement de tête : un salarié non-cadre du privé conserve environ 78 % de
          son brut, un cadre environ 75 %, et un agent de la fonction publique environ 85 % (les
          fonctionnaires cotisent sur leur traitement indiciaire, ce qui explique l'écart). Ces
          proportions valent pour le net avant impôt. Le montant final sur votre compte dépend
          ensuite de votre taux de prélèvement à la source, qui varie de 0 % pour les foyers non
          imposables à plus de 20 % pour les hauts revenus.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold">Questions fréquentes</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-lg border border-ligne bg-white p-4">
              <summary className="cursor-pointer font-semibold marker:content-none">
                {f.q}
              </summary>
              <p className="mt-2 leading-relaxed text-encre/90">{f.r}</p>
            </details>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl font-bold">Montants les plus recherchés</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[1800, 2000, 2200, 2500, 2800, 3000, 3500, 4000].map((m) => (
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
          Sources : URSSAF (taux de cotisations), impots.gouv.fr (prélèvement à la source),
          service-public.fr. Dernière mise à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
