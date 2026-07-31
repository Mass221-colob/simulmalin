import type { Metadata } from "next";
import Link from "next/link";
import { ANNEE } from "@/data/baremes2026";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Pourquoi SimulMalin existe, comment nos calculateurs sont construits et vérifiés, et quels engagements nous prenons envers nos lecteurs.",
  alternates: { canonical: "/a-propos/" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        À propos de <span className="surligne">SimulMalin</span>
      </h1>

      <div className="mt-6 space-y-5 leading-relaxed text-encre/90">
        <p>
          SimulMalin est né d'un constat simple : les calculs qui comptent le plus dans une vie —
          son salaire net, son impôt, le vrai coût d'un achat immobilier, ses droits en cas de
          rupture — sont aussi les plus opaques. Les simulateurs existants sont souvent lents,
          saturés de publicité intrusive, ou basés sur des barèmes périmés. Nous avons voulu
          l'inverse : des outils rapides, gratuits, et surtout qui montrent leur calcul.
        </p>

        <h2 className="pt-4 font-display text-2xl font-bold">Comment nos calculateurs sont construits</h2>
        <p>
          Chaque calculateur repose sur les textes officiels : Code du travail, Code général des
          impôts, barèmes publiés par l'URSSAF, la DGFiP ou les organismes compétents. Les
          constantes utilisées (SMIC, plafond de la Sécurité sociale, tranches du barème de
          l'impôt, taux de cotisations) sont centralisées dans un fichier unique, mis à jour à
          chaque révision légale et vérifié contre les sources officielles.
        </p>
        <p>
          Nous validons nos moteurs de calcul en comparant leurs résultats aux exemples publiés
          par l'administration. Le calculateur d'impôt sur le revenu, par exemple, reproduit à
          l'euro près l'exemple officiel de service-public.gouv.fr. Quand un calcul repose sur une
          estimation ou une simplification — c'est le cas de l'assurance chômage ou de la
          retraite complémentaire, trop dépendantes des parcours individuels — nous l'indiquons
          explicitement sur la page concernée.
        </p>

        <h2 className="pt-4 font-display text-2xl font-bold">Nos engagements</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Sources citées.</strong> Chaque page indique les textes et organismes sur
            lesquels le calcul s'appuie.
          </li>
          <li>
            <strong>Mise à jour annuelle.</strong> Tous les barèmes sont révisés en janvier, dès
            la publication de la loi de finances, et à chaque revalorisation en cours d'année.
          </li>
          <li>
            <strong>Calcul transparent.</strong> Aucune boîte noire : le détail ligne par ligne
            est affiché — cotisations, tranches d'imposition, répartition des frais.
          </li>
          <li>
            <strong>Vos données restent chez vous.</strong> Les montants que vous saisissez sont
            traités dans votre navigateur. Ils ne sont ni transmis, ni enregistrés, ni partagés.
          </li>
          <li>
            <strong>Aucune inscription.</strong> Tous les outils sont accessibles librement,
            sans compte ni adresse email.
          </li>
        </ul>

        <h2 className="pt-4 font-display text-2xl font-bold">Ce que nous ne sommes pas</h2>
        <p>
          SimulMalin est un outil d'information, pas un cabinet. Nous ne sommes ni avocats, ni
          experts-comptables, ni conseillers en investissement, et nos résultats ne constituent
          pas un conseil personnalisé. Ils vous donnent un ordre de grandeur fiable pour préparer
          une décision, une négociation ou un rendez-vous — mais pour une situation particulière,
          seuls l'administration compétente ou un professionnel habilité font autorité.
        </p>

        <h2 className="pt-4 font-display text-2xl font-bold">Comment le site est financé</h2>
        <p>
          Par la publicité, ce qui permet de garder l'ensemble des outils gratuits et ouverts.
          Nous refusons les formats qui recouvrent les calculateurs ou gênent la saisie : la
          publicité ne doit jamais passer avant l'usage.
        </p>

        <h2 className="pt-4 font-display text-2xl font-bold">Une erreur, une suggestion ?</h2>
        <p>
          Les signalements d'erreurs de calcul ou de barème sont traités en priorité, et les
          suggestions de nouveaux calculateurs orientent réellement nos prochains
          développements. Écrivez-nous via la{" "}
          <Link href="/contact/" className="font-semibold text-marine hover:underline">
            page contact
          </Link>{" "}
          — chaque message est lu.
        </p>

        <p className="pt-4 text-sm text-griseNote">
          Dernière révision des barèmes : janvier {ANNEE}. L'identité de l'éditeur du site figure
          dans les{" "}
          <Link href="/mentions-legales/" className="font-semibold text-marine hover:underline">
            mentions légales
          </Link>.
        </p>
      </div>
    </div>
  );
}
