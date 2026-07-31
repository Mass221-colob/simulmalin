import type { Metadata } from "next";
import HubCategorie from "@/components/HubCategorie";

export const metadata: Metadata = {
  title: "Calculateurs auto-entrepreneur 2026",
  description: "Simulateurs auto-entrepreneur 2026 : cotisations sociales, revenu net, versement libératoire, seuils de TVA et plafonds.",
  alternates: { canonical: "/entrepreneur/" },
};

export default function Page() {
  return (
    <HubCategorie
      titre="Auto-entrepreneur"
      intro="Du chiffre d'affaires au revenu réellement disponible : cotisations, impôt, seuils de TVA — tout ce qu'un indépendant doit anticiper."
      outils={[
        { nom: "Charges et revenu net", desc: "Cotisations selon l'activité, avec ou sans ACRE", href: "/entrepreneur/charges-auto-entrepreneur/" },
        { nom: "Versement libératoire", desc: "Est-il avantageux dans votre situation ?" },
        { nom: "Calculateur TVA (HT ⇄ TTC)", desc: "Conversion aux taux 20, 10, 5,5 et 2,1 %", href: "/entrepreneur/tva/" },
        { nom: "Seuils de TVA et plafonds", desc: "Alertes de franchissement selon votre CA" },
      ]}
    />
  );
}
