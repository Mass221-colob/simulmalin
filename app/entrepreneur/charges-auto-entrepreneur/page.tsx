import type { Metadata } from "next";
import Link from "next/link";
import AutoEntrepreneurCalculator from "@/components/calculateurs/AutoEntrepreneurCalculator";
import { ANNEE, AUTO_ENTREPRENEUR } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur charges auto-entrepreneur ${ANNEE} — revenu net réel`,
  description: `Calculez vos charges d'auto-entrepreneur ${ANNEE} : cotisations par activité, ACRE, versement libératoire, revenu net réel. Alertes seuils de TVA et plafonds micro.`,
  alternates: { canonical: "/entrepreneur/charges-auto-entrepreneur/" },
};

const FAQ = [
  {
    q: "Quelles charges paie réellement un auto-entrepreneur ?",
    r: "Les cotisations sociales représentent la charge principale : environ 12,3 % du chiffre d'affaires en achat-revente, 21,2 % pour les prestations commerciales et artisanales, et environ 26 % pour les activités libérales (BNC). S'y ajoutent la contribution à la formation professionnelle (0,1 à 0,3 %), la cotisation foncière des entreprises à partir de la deuxième année, et l'impôt sur le revenu.",
  },
  {
    q: "Versement libératoire ou barème classique : que choisir ?",
    r: "Le versement libératoire (1 à 2,2 % du CA selon l'activité) est avantageux si votre taux d'imposition serait supérieur au barème — typiquement pour les foyers déjà imposés dans la tranche à 11 % ou plus. Si votre foyer est faiblement ou non imposable, le barème classique est préférable : vous paieriez avec le versement libératoire un impôt que vous n'auriez pas dû. Il est soumis à un plafond de revenu fiscal de référence.",
  },
  {
    q: "Comment fonctionne l'ACRE ?",
    r: "L'ACRE réduit vos cotisations sociales d'environ 50 % jusqu'à la fin du troisième trimestre civil suivant votre inscription. Elle est automatique pour la plupart des créateurs éligibles (demandeurs d'emploi, moins de 26 ans, RSA…) mais doit être demandée dans les 45 jours pour les auto-entrepreneurs. C'est un levier majeur de trésorerie la première année.",
  },
  {
    q: "Que se passe-t-il si je dépasse le seuil de TVA ?",
    r: "En dessous du seuil de franchise, vous facturez sans TVA (mention « TVA non applicable, art. 293 B du CGI »). En cas de dépassement, une tolérance s'applique jusqu'au seuil majoré ; au-delà, vous devez facturer la TVA dès le premier jour de dépassement, obtenir un numéro de TVA intracommunautaire et déposer des déclarations. Vous récupérez en contrepartie la TVA sur vos achats professionnels.",
  },
  {
    q: "Et si je dépasse le plafond du régime micro ?",
    r: "Le régime micro-entrepreneur tolère une année de dépassement. Après deux années consécutives au-dessus du plafond, vous basculez dans le régime réel de l'entreprise individuelle : comptabilité complète, charges calculées sur le bénéfice réel et non plus sur le chiffre d'affaires. Ce n'est pas une punition — c'est souvent le signe qu'il est temps de passer en société.",
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
        <Link href="/entrepreneur/" className="hover:text-marine">Auto-entrepreneur</Link>
        <span className="mx-2">›</span>
        <span>Charges et revenu net</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Charges <span className="surligne">auto-entrepreneur</span> {ANNEE} : votre net réel
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Du chiffre d'affaires au revenu disponible : cotisations par activité, ACRE, versement
        libératoire — avec les jauges de seuils TVA et plafonds pour piloter votre année.
      </p>

      <div className="mt-8">
        <AutoEntrepreneurCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Le piège du CA : penser en net</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          L'erreur classique du nouvel indépendant consiste à raisonner en chiffre d'affaires
          comme un salarié raisonne en salaire. Or un consultant libéral qui facture 4 000 € par
          mois n'en conserve qu'environ 2 950 € après cotisations — avant impôt, avant CFE, avant
          mutuelle (non prise en charge), et sans congés payés ni chômage. La règle de survie :
          pour un revenu équivalent à un salaire donné, visez un chiffre d'affaires supérieur
          d'au moins 40 à 50 %. C'est aussi pour cela que vos tarifs d'indépendant doivent être
          nettement supérieurs au coût horaire d'un salarié : ils financent votre protection
          sociale, vos périodes creuses et votre matériel.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold">Les seuils {ANNEE} à connaître</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-griseNote">
                <th className="filet py-2 font-medium">Activité</th>
                <th className="filet py-2 text-right font-medium">Cotisations</th>
                <th className="filet py-2 text-right font-medium">Seuil TVA</th>
                <th className="filet py-2 text-right font-medium">Plafond micro</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(AUTO_ENTREPRENEUR).map((a) => (
                <tr key={a.libelle} className="filet">
                  <td className="py-2">{a.libelle}</td>
                  <td className="py-2 text-right font-tab">{a.cotisations.toLocaleString("fr-FR")} %</td>
                  <td className="py-2 text-right font-tab">{a.seuilTVA.toLocaleString("fr-FR")} €</td>
                  <td className="py-2 text-right font-tab">{a.plafondCA.toLocaleString("fr-FR")} €</td>
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

        <h2 className="mt-10 font-display text-2xl font-bold">Par chiffre d'affaires</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[15000, 20000, 30000, 40000, 50000, 60000, 70000, 77000].map((c) => (
            <li key={c}>
              <Link
                href={`/entrepreneur/charges-auto-entrepreneur/${c}/`}
                className="block rounded-md border border-ligne bg-white px-3 py-2 font-tab transition hover:border-marine hover:text-marine"
              >
                {c.toLocaleString("fr-FR")} € de CA
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-griseNote">
          Sources : autoentrepreneur.urssaf.fr, service-public.fr. Taux {ANNEE} indicatifs
          (le taux BNC suit une trajectoire de hausse). Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
