import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold">Mentions légales</h1>

      <div className="mt-6 space-y-6 leading-relaxed text-encre/90">
        <section>
          <h2 className="font-display text-xl font-bold">Éditeur du site</h2>
          {/*
            ⚠️ À VÉRIFIER AVANT MISE EN LIGNE — obligation légale (LCEN art. 6-III).

            Configuration retenue : éditeur PARTICULIER (non professionnel), qui peut
            légalement ne pas publier son adresse à condition que les coordonnées de
            l'hébergeur figurent ci-dessous (c'est le cas) et que son identité complète
            soit communiquée à cet hébergeur.

            → Vérifiez l'orthographe du nom.
            → Si vous exercez sous une structure enregistrée (entreprise individuelle,
              SARL, SAS…), remplacez « Particulier » par votre statut et ajoutez le
              numéro d'identification (NINEA, RCCM, SIREN) ainsi que l'adresse du siège :
              la dispense d'adresse ne vaut que pour les éditeurs non professionnels.
            → Créez l'adresse contact@simulmalin.net (redirection chez votre registrar).
          */}
          <p className="mt-2">
            Nom : Massamba Diop
            <br />
            Statut : particulier (éditeur non professionnel)
            <br />
            Courriel : contact@simulmalin.net
            <br />
            Directeur de la publication : Massamba Diop
          </p>
          <p className="mt-2 text-sm text-griseNote">
            Conformément à l'article 6-III-2 de la loi pour la confiance dans l'économie
            numérique, l'éditeur non professionnel de ce site a choisi de ne pas rendre publique
            son adresse. Son identité complète a été communiquée à l'hébergeur, dont les
            coordonnées figurent ci-dessous, et reste à la disposition de toute autorité
            judiciaire ou administrative habilitée.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold">Hébergement</h2>
          <p className="mt-2">
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold">Nature des informations publiées</h2>
          <p className="mt-2">
            Les calculateurs et contenus de SimulMalin sont fournis à titre purement informatif
            et indicatif. Ils ne constituent en aucun cas un conseil fiscal, juridique, comptable
            ou financier personnalisé. Malgré le soin apporté à l'exactitude des barèmes et à leur
            actualisation, l'éditeur ne saurait être tenu responsable des décisions prises sur la
            base des résultats affichés. Pour toute situation particulière, rapprochez-vous des
            organismes officiels compétents ou d'un professionnel habilité. La méthodologie
            employée est détaillée sur la page{" "}
            <Link href="/a-propos/" className="font-semibold text-marine hover:underline">
              À propos
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold">Propriété intellectuelle</h2>
          <p className="mt-2">
            L'ensemble du site — textes, calculateurs, code source, identité visuelle — est
            protégé par le droit d'auteur. Toute reproduction ou réutilisation sans autorisation
            préalable est interdite. Les données publiques citées (barèmes, textes légaux)
            demeurent la propriété de leurs émetteurs respectifs.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold">Données personnelles</h2>
          <p className="mt-2">
            Le traitement des données est décrit dans la{" "}
            <Link href="/politique-confidentialite/" className="font-semibold text-marine hover:underline">
              politique de confidentialité
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
