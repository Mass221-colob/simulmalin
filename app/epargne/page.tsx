import type { Metadata } from "next";
import HubCategorie from "@/components/HubCategorie";

export const metadata: Metadata = {
  title: "Calculateurs épargne et crédit 2026",
  description: "Simulateurs d'épargne 2026 : intérêts composés, livrets, assurance-vie, crédit à la consommation. Projections chiffrées et graphiques.",
  alternates: { canonical: "/epargne/" },
};

export default function Page() {
  return (
    <HubCategorie
      titre="Épargne"
      intro="Combien vaudra votre épargne dans 10, 20 ou 30 ans ? Visualisez l'effet des intérêts composés et comparez les supports."
      outils={[
        { nom: "Intérêts composés", desc: "Projection avec versements mensuels, graphique de croissance", href: "/epargne/interets-composes/" },
        { nom: "Crédit à la consommation", desc: "Mensualités, coût total et TAEG", href: "/epargne/credit-consommation/" },
        { nom: "Comparateur de livrets", desc: "Livret A, LDDS, LEP : plafonds et rendements" },
      ]}
    />
  );
}
