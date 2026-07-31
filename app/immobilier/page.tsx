import type { Metadata } from "next";
import HubCategorie from "@/components/HubCategorie";

export const metadata: Metadata = {
  title: "Calculateurs immobilier 2026",
  description: "Simulateurs immobilier 2026 : frais de notaire, capacité d'emprunt, mensualités de prêt, rendement locatif, PTZ.",
  alternates: { canonical: "/immobilier/" },
};

export default function Page() {
  return (
    <HubCategorie
      titre="Immobilier"
      intro="Du calcul des frais de notaire au tableau d'amortissement complet de votre prêt : tous les chiffres d'un achat immobilier, sans surprise."
      outils={[
        { nom: "Frais de notaire", desc: "Neuf ou ancien, détail complet par département", href: "/immobilier/frais-notaire/" },
        { nom: "Capacité d'emprunt", desc: "Combien pouvez-vous emprunter avec la règle des 35 % ?", href: "/immobilier/pret-immobilier/" },
        { nom: "Mensualités de prêt", desc: "Tableau d'amortissement mois par mois, coût total du crédit", href: "/immobilier/pret-immobilier/" },
        { nom: "Rendement locatif", desc: "Brut, net et net-net après impôts, cash-flow mensuel", href: "/immobilier/rendement-locatif/" },
        { nom: "Plus-value immobilière", desc: "Abattements par durée de détention, net vendeur", href: "/immobilier/plus-value/" },
        { nom: "Prêt à taux zéro (PTZ)", desc: "Éligibilité selon zone et revenus", href: "/immobilier/ptz/" },
      ]}
    />
  );
}
