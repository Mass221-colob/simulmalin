"use client";

import { useMemo, useState } from "react";
import { calculerPrimeActivite } from "@/lib/primeActivite";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function PrimeActiviteCalculator() {
  const [revenu, setRevenu] = useState(1400);
  const [conjoint, setConjoint] = useState(0);
  const [enCouple, setEnCouple] = useState(false);
  const [enfants, setEnfants] = useState(0);
  const [apl, setApl] = useState(false);

  const r = useMemo(
    () => calculerPrimeActivite(revenu, enCouple ? conjoint : 0, enfants, enCouple, apl),
    [revenu, conjoint, enCouple, enfants, apl]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rev" className="etiquette">Vos revenus nets mensuels</label>
            <div className="relative">
              <input id="rev" type="number" inputMode="decimal" min={0} step={50}
                value={revenu || ""} onChange={(e) => setRevenu(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="enf" className="etiquette">Enfants à charge</label>
            <select id="enf" value={enfants} onChange={(e) => setEnfants(parseInt(e.target.value))} className="champ">
              {[0, 1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-encre/90">
            <input type="checkbox" checked={enCouple} onChange={(e) => setEnCouple(e.target.checked)}
              className="h-4 w-4 accent-marine" />
            En couple (marié, pacsé ou concubinage)
          </label>

          <label className="flex items-center gap-2 text-sm text-encre/90">
            <input type="checkbox" checked={apl} onChange={(e) => setApl(e.target.checked)}
              className="h-4 w-4 accent-marine" />
            Je perçois une aide au logement
          </label>

          {enCouple && (
            <div className="sm:col-span-2">
              <label htmlFor="conj" className="etiquette">Revenus nets mensuels du conjoint</label>
              <div className="relative">
                <input id="conj" type="number" inputMode="decimal" min={0} step={50}
                  value={conjoint || ""} onChange={(e) => setConjoint(parseFloat(e.target.value) || 0)}
                  className="champ pr-10" placeholder="0" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 rounded-md bg-papier p-3 text-xs text-encre/80">
          ℹ️ La prime d'activité est versée par la CAF ou la MSA et se demande en ligne. Elle est
          recalculée chaque trimestre selon vos ressources déclarées.
        </p>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Prime d'activité estimée</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">{euros(r.montant)} €</span>
            <span className="ml-2 text-base font-semibold text-griseNote">/ mois</span>
          </p>

          {r.montant > 0 ? (
            <>
              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Montant forfaitaire du foyer</dt>
                  <dd className="font-tab font-medium">{euros(r.montantForfaitaire)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Bonifications individuelles</dt>
                  <dd className="font-tab font-medium">+ {euros(r.bonifications)} €</dd>
                </div>
                {r.forfaitLogement > 0 && (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">Forfait logement déduit</dt>
                    <dd className="font-tab font-medium">− {euros(r.forfaitLogement)} €</dd>
                  </div>
                )}
                <div className="flex justify-between pb-1">
                  <dt className="text-griseNote">Revenu total avec la prime</dt>
                  <dd className="font-tab font-semibold text-vertNet">
                    {euros(revenu + (enCouple ? conjoint : 0) + r.montant)} €
                  </dd>
                </div>
              </dl>
              <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                💡 Faites la demande sur caf.fr — elle n'est jamais automatique, et un tiers des
                foyers éligibles ne la réclame pas.
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-encre/90">
              Avec ces revenus, votre foyer ne semble pas éligible à la prime d'activité. Le
              simulateur officiel de la CAF reste la référence, notamment si votre situation a
              changé récemment.
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation simplifiée {ANNEE}. Le calcul réel intègre d'autres ressources (pensions,
          allocations, patrimoine). Seule la CAF détermine vos droits.
        </p>
      </aside>
    </div>
  );
}
