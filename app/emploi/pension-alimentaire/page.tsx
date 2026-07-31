import type { Metadata } from "next";
import Link from "next/link";
import PensionCalculator from "@/components/calculateurs/PensionCalculator";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: `Calculateur pension alimentaire ${ANNEE} — barème indicatif`,
  description: `Estimez la pension alimentaire ${ANNEE} avec la table de référence du ministère de la Justice : selon les revenus, le nombre d'enfants et la modalité de garde.`,
  alternates: { canonical: "/emploi/pension-alimentaire/" },
};

const FAQ = [
  {
    q: "Ce barème s'impose-t-il au juge ?",
    r: "Non. La table de référence diffusée par le ministère de la Justice est purement indicative : elle donne un ordre de grandeur et sert souvent de base de discussion. Le juge aux affaires familiales fixe librement le montant en fonction des ressources et des charges de chaque parent ainsi que des besoins concrets de l'enfant.",
  },
  {
    q: "Comment le barème est-il construit ?",
    r: "On retranche d'abord du revenu du parent débiteur un minimum vital correspondant au montant du RSA pour une personne seule. On applique ensuite au solde un pourcentage qui décroît avec le nombre d'enfants et qui varie selon l'amplitude du droit de visite et d'hébergement — plus le parent accueille l'enfant, plus le pourcentage diminue, puisqu'il assume directement une part des frais.",
  },
  {
    q: "Une pension est-elle due en résidence alternée ?",
    r: "Oui, cela reste fréquent. La résidence alternée ne supprime pas l'obligation d'entretien : si les revenus des deux parents sont très différents, une pension peut être fixée pour rééquilibrer le niveau de vie de l'enfant entre les deux foyers.",
  },
  {
    q: "La pension est-elle révisable ?",
    r: "Oui, en cas de changement notable de situation (perte d'emploi, hausse de revenus, évolution des besoins de l'enfant). Elle est en principe indexée chaque année sur l'indice des prix à la consommation, l'indexation figurant dans le jugement. En l'absence d'accord amiable, il faut ressaisir le juge.",
  },
  {
    q: "Quelle est la fiscalité de la pension ?",
    r: "Le parent qui verse la pension peut la déduire de ses revenus imposables, sous conditions ; celui qui la reçoit doit la déclarer comme un revenu. Cette règle vaut pour les enfants mineurs et, dans certaines limites, pour les enfants majeurs à charge.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/emploi/" className="hover:text-marine">Emploi</Link>
        <span className="mx-2">›</span>
        <span>Pension alimentaire</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">pension alimentaire</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Une estimation fondée sur la table de référence indicative du ministère de la Justice,
        selon les revenus, le nombre d'enfants et la modalité de garde.
      </p>

      <div className="mt-8"><PensionCalculator /></div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Un repère utile, pas une règle</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          La table de référence a été conçue pour réduire les écarts de traitement d'un tribunal à
          l'autre et pour aider les parents à trouver un accord sans contentieux. Elle ne
          remplace pourtant jamais l'appréciation du juge, qui prend en compte des éléments que
          le barème ignore : charges de logement de chaque parent, frais de scolarité ou de
          santé particuliers, situation d'un nouveau conjoint, éloignement géographique. En
          pratique, ce chiffre sert surtout de point de départ raisonnable dans une négociation
          amiable — et un accord trouvé entre parents, homologué ensuite par le juge, reste
          presque toujours préférable à une décision imposée.
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

        <p className="mt-8 leading-relaxed text-encre/90">
          Pour connaître le revenu net à renseigner, utilisez le{" "}
          <Link href="/salaire/brut-net/" className="font-semibold text-marine hover:underline">
            calculateur brut en net
          </Link>.
        </p>

        <p className="mt-10 text-xs text-griseNote">
          Source : table de référence indicative du ministère de la Justice. Ces informations ne
          constituent pas un conseil juridique. Mis à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
