import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold">Politique de confidentialité</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-encre/90">
        <section>
          <h2 className="font-display text-xl font-bold">Données saisies dans les calculateurs</h2>
          <p className="mt-2">
            Les montants que vous saisissez dans les calculateurs (salaires, revenus, prix) sont
            traités uniquement dans votre navigateur. Ils ne sont jamais transmis à nos serveurs,
            ni enregistrés, ni partagés.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold">Cookies et publicité</h2>
          <p className="mt-2">
            Ce site utilise Google AdSense pour afficher des publicités qui financent sa gratuité.
            Google et ses partenaires peuvent utiliser des cookies pour personnaliser les annonces.
            Lors de votre première visite, une bannière de consentement vous permet d'accepter ou de
            refuser ces cookies, conformément au RGPD. Vous pouvez modifier votre choix à tout
            moment. Plus d'informations : https://policies.google.com/technologies/partner-sites
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold">Mesure d'audience</h2>
          <p className="mt-2">
            Nous mesurons la fréquentation du site de manière agrégée afin d'améliorer nos
            calculateurs. {/* Adapter selon l'outil retenu : Plausible (sans cookie) ou GA4 */}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold">Vos droits</h2>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
            suppression des données vous concernant. Contact : contact@simulmalin.net
          </p>
        </section>
      </div>
    </div>
  );
}
