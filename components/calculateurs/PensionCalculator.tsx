"use client";

import { useMemo, useState } from "react";
import { calculerPension, type TypeGarde } from "@/lib/pensionAlimentaire";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function PensionCalculator() {
  const [revenu, setRevenu] = useState(2200);
  const [enfants, setEnfants] = useState(2);
  const [garde, setGarde] = useState<TypeGarde>("classique");

  const r = useMemo(() => calculerPension(revenu, enfants, garde), [revenu, enfants, garde]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rev" className="etiquette">Revenu mensuel net du parent débiteur</label>
            <div className="relative">
              <input id="rev" type="number" inputMode="decimal" min={0} step={50}
                value={revenu || ""} onChange={(e) => setRevenu(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="enf" className="etiquette">Nombre d'enfants concernés</label>
            <select id="enf" value={enfants} onChange={(e) => setEnfants(parseInt(e.target.value))} className="champ">
              {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="garde" className="etiquette">Modalité de garde</label>
            <select id="garde" value={garde} onChange={(e) => setGarde(e.target.value as TypeGarde)} className="champ">
              <option value="reduit">Droit de visite réduit</option>
              <option value="classique">Droit de visite et d'hébergement classique</option>
              <option value="alterne">Résidence alternée</option>
            </select>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-papier p-3 text-xs text-encre/80">
          Le barème déduit d'abord un minimum vital de {euros(646.52)} € du revenu du parent
          débiteur, puis applique un pourcentage dépendant du nombre d'enfants et de l'amplitude
          du droit de visite.
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Pension mensuelle indicative</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">{euros(r.pensionTotale)} €</span>
          </p>
          <p className="mt-1 text-sm text-griseNote">
            soit {euros(r.pensionParEnfant)} € par enfant
          </p>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Revenu retenu (après minimum vital)</dt>
              <dd className="font-tab font-medium">{euros(r.revenuRetenu)} €</dd>
            </div>
            <div className="flex justify-between pb-1">
              <dt className="text-griseNote">Taux appliqué par enfant</dt>
              <dd className="font-tab font-medium">{r.tauxApplique.toLocaleString("fr-FR")} %</dd>
            </div>
          </dl>

          <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
            ⚖️ Ce barème est <strong>purement indicatif</strong>. Le juge aux affaires familiales
            fixe librement le montant en tenant compte des ressources et charges de chaque parent
            et des besoins réels de l'enfant.
          </p>
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Table de référence indicative du ministère de la Justice, {ANNEE}. Ces informations ne
          constituent pas un conseil juridique.
        </p>
      </aside>
    </div>
  );
}
