import type { Metadata } from "next";
import Link from "next/link";
import FraisNotaireCalculator from "@/components/calculateurs/FraisNotaireCalculator";
import { ANNEE } from "@/data/baremes2026";
import { DEPARTEMENTS } from "@/data/departements";

export const metadata: Metadata = {
  title: `Calculateur frais de notaire ${ANNEE} — neuf et ancien, par département`,
  description: `Calculez vos frais de notaire ${ANNEE} : détail complet (droits de mutation, émoluments, débours), neuf ou ancien, taux par département. Estimation immédiate.`,
  alternates: { canonical: "/immobilier/frais-notaire/" },
};

const FAQ = [
  {
    q: "Pourquoi parle-t-on de frais de notaire de 7 à 8 % dans l'ancien ?",
    r: "Dans l'ancien, les frais d'acquisition représentent généralement 7 à 8 % du prix pour les biens courants. L'essentiel (environ 5,8 % du prix) part en droits de mutation versés à l'État et au département. Le notaire ne perçoit que ses émoluments réglementés, soit environ 1 % du prix, auxquels s'ajoutent la TVA, les débours et la contribution de sécurité immobilière.",
  },
  {
    q: "Pourquoi les frais sont-ils réduits dans le neuf (2 à 3 %) ?",
    r: "Un logement neuf est déjà soumis à la TVA de 20 % incluse dans le prix de vente. En contrepartie, les droits de mutation sont remplacés par une simple taxe de publicité foncière d'environ 0,7 %, ce qui divise les frais d'acquisition par deux ou trois par rapport à l'ancien.",
  },
  {
    q: "Les frais varient-ils vraiment selon le département ?",
    r: "Oui, dans l'ancien : la part départementale des droits de mutation est votée localement. Quelques départements comme l'Indre, le Morbihan ou Mayotte appliquent historiquement un taux réduit. Depuis 2025, certains départements ont au contraire voté une majoration temporaire — d'où l'intérêt de vérifier le taux de votre département avant de finaliser votre plan de financement.",
  },
  {
    q: "Peut-on négocier les frais de notaire ?",
    r: "Les droits de mutation et taxes sont fixés par la loi : impossible d'y toucher. Seuls les émoluments du notaire peuvent faire l'objet d'une remise, limitée par la réglementation et uniquement sur la part du prix dépassant 150 000 €. En pratique, l'économie reste modeste.",
  },
  {
    q: "Comment réduire légalement les frais ?",
    r: "Deux leviers principaux : déduire du prix la valeur du mobilier laissé (cuisine équipée, électroménager) car les droits ne s'appliquent que sur l'immobilier, et payer les frais d'agence séparément lorsque le mandat le permet, afin qu'ils n'entrent pas dans l'assiette des droits.",
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
        <Link href="/immobilier/" className="hover:text-marine">Immobilier</Link>
        <span className="mx-2">›</span>
        <span>Frais de notaire</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Calculateur <span className="surligne">frais de notaire</span> {ANNEE}
      </h1>
      <p className="mt-3 max-w-2xl text-griseNote">
        Neuf ou ancien, taux de votre département, et surtout : le détail exact de qui reçoit
        quoi. Parce que non, ces frais ne vont pas au notaire.
      </p>

      <div className="mt-8">
        <FraisNotaireCalculator />
      </div>

      <article className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Ce que recouvrent vraiment les « frais de notaire »</h2>
        <p className="mt-3 leading-relaxed text-encre/90">
          Le terme officiel est « frais d'acquisition », et il est bien mieux choisi. Sur un achat
          dans l'ancien à 250 000 €, environ 14 500 € partent en droits de mutation — un impôt
          collecté par le notaire pour le compte de l'État et de votre département — tandis que le
          notaire lui-même perçoit environ 2 400 € d'émoluments hors taxes, fixés par un barème
          national identique chez tous les notaires de France. S'y ajoutent la TVA sur ces
          émoluments, environ 1 400 € de débours (documents d'urbanisme, cadastre, géomètre…) et
          la contribution de sécurité immobilière qui finance la publicité foncière. Inutile donc
          de chercher un notaire « moins cher » : à bien identique, le décompte sera le même.
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

        <h2 className="mt-10 font-display text-2xl font-bold">Frais de notaire par département</h2>
        <p className="mt-3 text-griseNote">
          Consultez le taux et une estimation détaillée pour votre département :
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {DEPARTEMENTS.map((d) => (
            <li key={d.code}>
              <Link href={`/immobilier/frais-notaire/${d.slug}/`} className="text-marine hover:underline">
                {d.nom} ({d.code})
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-griseNote">
          Sources : notaires.fr (barème des émoluments), impots.gouv.fr (droits de mutation).
          Dernière mise à jour : janvier {ANNEE}.
        </p>
      </article>
    </div>
  );
}
