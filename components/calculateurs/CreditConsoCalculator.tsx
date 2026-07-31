"use client";

import { useMemo, useState } from "react";
import { calculerCreditConso } from "@/lib/creditConso";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function CreditConsoCalculator() {
  const [capital, setCapital] = useState(10000);
  const [taux, setTaux] = useState(5.5);
  const [duree, setDuree] = useState(48);
  const [frais, setFrais] = useState(0);
  const [assurance, setAssurance] = useState(0);

  const r = useMemo(
    () => (capital > 0 && duree > 0 ? calculerCreditConso(capital, taux, duree, frais, assurance) : null),
    [capital, taux, duree, frais, assurance]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cap" className="etiquette">Montant emprunté</label>
            <div className="relative">
              <input id="cap" type="number" inputMode="decimal" min={0} step={500}
                value={capital || ""} onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="taux" className="etiquette">Taux d'intérêt annuel (%)</label>
            <input id="taux" type="number" inputMode="decimal" min={0} max={25} step={0.1}
              value={taux} onChange={(e) => setTaux(parseFloat(e.target.value) || 0)} className="champ" />
          </div>

          <div>
            <label htmlFor="duree" className="etiquette">
              Durée : <span className="font-tab text-encre">{duree} mois</span> ({(duree / 12).toFixed(1).replace(".", ",")} ans)
            </label>
            <input id="duree" type="range" min={6} max={84} step={6} value={duree}
              onChange={(e) => setDuree(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
          </div>

          <div>
            <label htmlFor="frais" className="etiquette">Frais de dossier</label>
            <div className="relative">
              <input id="frais" type="number" inputMode="decimal" min={0} step={10}
                value={frais || ""} onChange={(e) => setFrais(parseFloat(e.target.value) || 0)}
                className="champ pr-10" placeholder="0" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ass" className="etiquette">Assurance mensuelle (facultative)</label>
            <div className="relative">
              <input id="ass" type="number" inputMode="decimal" min={0} step={1}
                value={assurance || ""} onChange={(e) => setAssurance(parseFloat(e.target.value) || 0)}
                className="champ pr-10" placeholder="0" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
            <p className="mt-1 text-xs text-griseNote">
              L'assurance n'est jamais obligatoire sur un crédit à la consommation.
            </p>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {r ? (
            <>
              <p className="etiquette">Mensualité</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">{euros(r.mensualite)} €</span>
                <span className="ml-2 text-base font-semibold text-griseNote">/ mois</span>
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">TAEG estimé</dt>
                  <dd className="font-tab font-semibold">{r.taeg.toFixed(2).replace(".", ",")} %</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Coût des intérêts</dt>
                  <dd className="font-tab font-medium">{euros(r.coutInterets)} €</dd>
                </div>
                {assurance > 0 && (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">Coût de l'assurance</dt>
                    <dd className="font-tab font-medium">{euros(r.coutAssurance)} €</dd>
                  </div>
                )}
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Coût total du crédit</dt>
                  <dd className="font-tab font-medium text-marine">{euros(r.coutTotal)} €</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Montant total remboursé</dt>
                  <dd className="font-tab">{euros(r.montantTotalDu)} €</dd>
                </div>
              </dl>

              <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                💡 Le TAEG est le seul chiffre comparable entre deux offres : il intègre le taux,
                les frais de dossier et l'assurance. Un prêteur doit obligatoirement l'afficher.
              </p>
            </>
          ) : (
            <p className="text-sm text-griseNote">Renseignez le montant et la durée.</p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement
          avant de vous engager. Vous disposez d'un délai légal de rétractation de 14 jours.
          Estimation {ANNEE}.
        </p>
      </aside>
    </div>
  );
}
