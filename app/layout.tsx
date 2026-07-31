import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const display = { variable: "" };
const sans = { variable: "" };
const mono = { variable: "" };

export const metadata: Metadata = {
  metadataBase: new URL("https://simulmalin.net"),
  title: {
    default: "SimulMalin — Calculateurs salaire, impôts et immobilier 2026",
    template: "%s | SimulMalin",
  },
  description:
    "Calculateurs et simulateurs gratuits mis à jour 2026 : salaire brut en net, impôt sur le revenu, frais de notaire, prêt immobilier. Barèmes officiels, résultat immédiat.",
};

const NAV = [
  { href: "/salaire/brut-net/", label: "Salaire" },
  { href: "/impots/", label: "Impôts" },
  { href: "/immobilier/", label: "Immobilier" },
  { href: "/emploi/", label: "Emploi" },
  { href: "/entrepreneur/", label: "Auto-entrepreneur" },
  { href: "/epargne/", label: "Épargne" },
  { href: "/blog/", label: "Blog" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <header className="border-b border-ligne bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
              Simul<span className="surligne">Malin</span>
            </Link>
            <nav aria-label="Navigation principale" className="hidden gap-6 text-sm font-semibold md:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-encre/80 transition hover:text-marine">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-20 border-t border-ligne bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm md:grid-cols-4">
            <div>
              <p className="font-display text-lg font-extrabold">
                Simul<span className="surligne">Malin</span>
              </p>
              <p className="mt-2 text-griseNote">
                Des calculateurs clairs, gratuits et à jour des barèmes {new Date().getFullYear()}.
                Sources : service-public.fr, URSSAF, impots.gouv.fr.
              </p>
            </div>
            <div>
              <p className="mb-2 font-semibold">Calculateurs</p>
              <ul className="space-y-1.5 text-griseNote">
                <li><Link className="hover:text-marine" href="/salaire/brut-net/">Salaire brut en net</Link></li>
                <li><Link className="hover:text-marine" href="/salaire/brut-net/3000/">3 000 € brut en net</Link></li>
                <li><Link className="hover:text-marine" href="/impots/impot-revenu/">Impôt sur le revenu</Link></li>
                <li><Link className="hover:text-marine" href="/immobilier/frais-notaire/">Frais de notaire</Link></li>
                <li><Link className="hover:text-marine" href="/immobilier/pret-immobilier/">Prêt immobilier</Link></li>
                <li><Link className="hover:text-marine" href="/emploi/indemnite-licenciement/">Indemnité de licenciement</Link></li>
                <li><Link className="hover:text-marine" href="/entrepreneur/charges-auto-entrepreneur/">Charges auto-entrepreneur</Link></li>
                <li><Link className="hover:text-marine" href="/emploi/allocation-chomage/">Allocation chômage</Link></li>
                <li><Link className="hover:text-marine" href="/immobilier/rendement-locatif/">Rendement locatif</Link></li>
                <li><Link className="hover:text-marine" href="/epargne/interets-composes/">Intérêts composés</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold">Le site</p>
              <ul className="space-y-1.5 text-griseNote">
                <li><Link className="hover:text-marine" href="/blog/">Blog</Link></li>
                <li><Link className="hover:text-marine" href="/a-propos/">À propos</Link></li>
                <li><Link className="hover:text-marine" href="/contact/">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold">Légal</p>
              <ul className="space-y-1.5 text-griseNote">
                <li><Link className="hover:text-marine" href="/mentions-legales/">Mentions légales</Link></li>
                <li><Link className="hover:text-marine" href="/politique-confidentialite/">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-ligne py-4 text-center text-xs text-griseNote">
            © {new Date().getFullYear()} SimulMalin — Les résultats sont des estimations
            indicatives et ne constituent pas un conseil fiscal ou juridique.
          </div>
        </footer>
      </body>
    </html>
  );
}
