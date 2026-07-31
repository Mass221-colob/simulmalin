import type { Metadata } from "next";
import Link from "next/link";
import LicenciementCalculator from "@/components/calculateurs/LicenciementCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur indemnité de licenciement ${ANNEE} — montant légal exact`,
  description: `Calculez votre indemnité légale de licenciement ${ANNEE} : ¼ de mois par année jusqu'à 10 ans, ⅓ au-delà. Salaire de référence, rupture conventionnelle, faute grave.`,
  alternates: { canonical: "/emploi/indemnite-licenciement/" },
};

const FAQ = [
  {
    q: "Comment se calcule l'indemnité légale de licenciement ?",
    r: "La formule légale accorde un quart de mois de salaire de référence par année d'ancienneté pour les dix premières années, puis un tiers de mois par année au-delà de dix ans. Les années incomplètes comptent au prorata des mois. Exemple : 12 ans d'ancienneté = (10 × ¼) + (2 × ⅓) = 3,17 mois de salaire.",
  },
  {
    q: "Quel salaire sert de référence ?",
    r: "Le plus favorable des deux calculs suivants : la moyenne de vos douze derniers mois de salaire brut, ou la moyenne de vos trois derniers mois (les primes annuelles étant alors proratisées). L'employeur doit retenir automatiquement la formule qui vous avantage.",
  },
  {
    q: "L'indemnité est-elle imposable ?",
    r: "L'indemnité légale de licenciement est exonérée d'impôt sur le revenu en totalité. Les sommes négociées au-delà peuvent être exonérées dans certaines limites (double de la rémunération annuelle brute ou moitié de l'indemnité totale, plafonnées). En rupture conventionnelle, le régime est proche mais des cotisations spécifiques s'appliquent.",
  },
  {
    q: "Ai-je droit à une indemnité en cas de faute grave ?",
    r: "Non : la faute grave (et a fortiori la faute lourde) prive de l'indemnité légale de licenciement et de l'indemnité de préavis. Vous conservez en revanche vos congés payés acquis. La qualification de faute grave est fréquemment requalifiée par les conseils de prud'hommes : un avis juridique peut valoir la peine.",
  },
  {
    q: "Ma convention collective peut-elle prévoir plus ?",
    r: "Oui, et c'est fréquent : de nombreuses conventions (Syntec, métallurgie, banque…) prévoient des indemnités supérieures au minimum légal, notamment pour les cadres ou les grandes anciennetés. La règle : c'est toujours le montant le plus favorable qui s'applique. Vérifiez votre convention avant toute négociation.",
  },
  {
    q: "Et en rupture conventionnelle ?",
    r: "L'indemnité spécifique de rupture conventionnelle ne peut pas être inférieure à l'indemnité légale de licenciement — c'est le plancher que calcule cet outil. Tout le reste est négociation : ancienneté stratégique, préjudice, contexte du départ. Beaucoup de salariés obtiennent bien davantage que le minimum.",
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
        <Link href="/emploi/" className="hover:text-marine">Emploi</Link>
        <span className="mx-2">›</span>
        <span>Indemnité de licenciement</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">indemnité de licenciement</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Formule légale exacte, double calcul du salaire de référence, rupture conventionnelle et
        faute grave : sachez précisément ce qui vous est dû avant de signer.
      </p>

      <div className="mt-8">
        <LicenciementCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le détail qui change tout : le salaire de référence</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          La plupart des salariés calculent leur indemnité sur leur dernier salaire — et se
          trompent. La loi impose de comparer deux moyennes : celle des douze derniers mois et
          celle des trois derniers (primes annuelles proratisées), puis de retenir la plus
          favorable. Si vous avez touché un treizième mois ou une prime récente, la formule des
          trois mois peut sensiblement augmenter votre indemnité. Autre subtilité : l'ancienneté
          se calcule jusqu'à la fin du préavis, même s'il n'est pas exécuté — quelques mois qui
          peuvent faire franchir un seuil. Enfin, gardez en tête que ce calculateur donne le
          minimum légal : votre convention collective prime si elle est plus généreuse, et en
          rupture conventionnelle, ce minimum n'est que le point de départ de la négociation.
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

        <h2 className="mt-10 font-display text-2xl font-bold">Par ancienneté</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[2, 3, 5, 8, 10, 15, 20, 25].map((a) => (
            <li key={a}>
              <Link
                href={`/emploi/indemnite-licenciement/${a}-ans/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                {a} ans d'ancienneté
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl font-bold">Calculateurs liés</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Après la rupture, estimez vos droits avec le futur calculateur d'allocations chômage,
          et vérifiez votre nouveau budget avec le{" "}
          <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
            calculateur brut en net
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Sources : Code du travail (art. L1234-9, R1234-1 à R1234-4), service-public.fr.
          Ces informations ne constituent pas un conseil juridique. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
