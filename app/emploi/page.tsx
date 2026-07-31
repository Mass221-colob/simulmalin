import type { Metadata } from "next";
import HubCategorie from "@/components/HubCategorie";

export const metadata: Metadata = {
  title: "Calculateurs emploi et droits 2026",
  description: "Simulateurs emploi 2026 : indemnité de licenciement, rupture conventionnelle, allocations chômage, congés payés, préavis.",
  alternates: { canonical: "/emploi/" },
};

export default function Page() {
  return (
    <HubCategorie
      titre="Emploi"
      intro="Licenciement, rupture conventionnelle, chômage : connaissez vos droits au centime près avant de signer quoi que ce soit."
      outils={[
        { nom: "Indemnité de licenciement", desc: "Indemnité légale selon ancienneté et salaire de référence", href: "/emploi/indemnite-licenciement/" },
        { nom: "Rupture conventionnelle", desc: "Indemnité minimale et calendrier de la procédure" },
        { nom: "Allocations chômage (ARE)", desc: "Montant et durée d'indemnisation estimés", href: "/emploi/allocation-chomage/" },
        { nom: "Congés payés", desc: "Jours acquis et indemnité de congés", href: "/emploi/conges-payes/" },
        { nom: "Préavis", desc: "Durée du préavis de démission ou de licenciement", href: "/emploi/preavis/" },
        { nom: "Prime d'activité", desc: "Éligibilité et montant estimé", href: "/emploi/prime-activite/" },
        { nom: "Retraite", desc: "Âge de départ, trimestres et pension estimée", href: "/emploi/retraite/" },
        { nom: "Pension alimentaire", desc: "Barème indicatif du ministère de la Justice", href: "/emploi/pension-alimentaire/" },
      ]}
    />
  );
}
