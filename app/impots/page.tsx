import type { Metadata } from "next";
import HubCategorie from "@/components/HubCategorie";

export const metadata: Metadata = {
  title: "Calculateurs impôts 2026",
  description: "Simulateurs d'impôts 2026 : impôt sur le revenu, prélèvement à la source, TVA. Barèmes officiels, résultats instantanés.",
  alternates: { canonical: "/impots/" },
};

export default function Page() {
  return (
    <HubCategorie
      titre="Impôts"
      intro="Estimez votre impôt sur le revenu et comprenez votre taux de prélèvement à la source, avec le barème officiel 2026 détaillé tranche par tranche."
      outils={[
        { nom: "Impôt sur le revenu", desc: "Barème 2026, parts fiscales, taux marginal et taux moyen", href: "/impots/impot-revenu/" },
        { nom: "Taux de prélèvement à la source", desc: "Vérifiez le taux appliqué sur votre fiche de paie" },
        { nom: "TVA", desc: "Conversion HT ↔ TTC aux taux 20 %, 10 %, 5,5 % et 2,1 %" },
      ]}
    />
  );
}
