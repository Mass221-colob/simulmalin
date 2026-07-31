"use client";

import { useMemo, useState } from "react";
import { calculerConges, type TypeDecompte } from "@/lib/congesPreavis";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function CongesCalculator() {
  const [mois, setMois] = useState(12);
  const [pris, setPris] = useState(0);
  const [salaire, setSalaire] = useState(2500);
  const [primes, setPrimes] = useState(0);
  const [type, setType] = useState<TypeDecompte>("ouvrables");

  const remunerationPeriode = salaire * mois + primes;

  const r = useMemo(
    () => calculerConges(mois, pris, salaire, remunerationPeriode, type),
    [mois, pris, salaire, remunerationPeriode, type]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="mois" className="etiquette">
              Mois travaillés sur la période : <span className="font-tab text-encre">{mois}</span>
            </label>
            <input id="mois" type="range" min={1} max={12} step={1} value={mois}
              onChange={(e) => setMois(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
            <p className="mt-1 text-xs text-griseNote">
              Période de référence : du 1er juin au 31 mai (sauf accord d'entreprise).
            </p>
          </div>

          <div>
            <span className="etiquette">Décompte de votre entreprise</span>
            <div className="inline-flex w-full rounded-lg border border-ligne p-1 text-sm font-semibold">
              <button onClick={() => setType("ouvrables")}
                className={`flex-1 rounded-md px-3 py-2 transition ${type === "ouvrables" ? "bg-marine text-white" : "text-griseNote hover:text-encre"}`}>
                Jours ouvrables
              </button>
              <button onClick={() => setType("ouvres")}
                className={`flex-1 rounded-md px-3 py-2 transition ${type === "ouvres" ? "bg-marine text-white" : "text-griseNote hover:text-encre"}`}>
                Jours ouvrés
              </button>
            </div>
            <p className="mt-1 text-xs text-griseNote">
              Ouvrables = lundi au samedi (30 j/an) · Ouvrés = lundi au vendredi (25 j/an)
            </p>
          </div>

          <div>
            <label htmlFor="pris" className="etiquette">Jours déjà pris</label>
            <input id="pris" type="number" inputMode="numeric" min={0} max={30}
              value={pris} onChange={(e) => setPris(parseInt(e.target.value) || 0)} className="champ" />
          </div>

          <div>
            <label htmlFor="salaire" className="etiquette">Salaire brut mensuel</label>
            <div className="relative">
              <input id="salaire" type="number" inputMode="decimal" min={0} step={50}
                value={salaire || ""} onChange={(e) => setSalaire(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="primes" className="etiquette">Primes et variables perçus sur la période (optionnel)</label>
            <div className="relative">
              <input id="primes" type="number" inputMode="decimal" min={0} step={100}
                value={primes || ""} onChange={(e) => setPrimes(parseFloat(e.target.value) || 0)}
                className="champ pr-10" placeholder="0" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
            <p className="mt-1 text-xs text-griseNote">
              Les primes augmentent l'indemnité via la règle du 1/10e — pensez à les renseigner.
            </p>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Jours de congés restants</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">
              {r.joursRestants.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
            </span>
            <span className="ml-2 text-base font-semibold text-griseNote">
              jours {type === "ouvrables" ? "ouvrables" : "ouvrés"}
            </span>
          </p>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Jours acquis</dt>
              <dd className="font-tab font-medium">
                {r.joursAcquis.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
              </dd>
            </div>
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Valeur d'un jour</dt>
              <dd className="font-tab font-medium">{euros(r.valeurJour)} €</dd>
            </div>
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Règle du 1/10e</dt>
              <dd className="font-tab font-medium">{euros(r.indemniteDixieme)} €</dd>
            </div>
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Règle du maintien</dt>
              <dd className="font-tab font-medium">{euros(r.indemniteMaintien)} €</dd>
            </div>
            <div className="flex justify-between font-semibold">
              <dt>Indemnité due (brut)</dt>
              <dd className="font-tab text-vertNet">{euros(r.indemniteRetenue)} €</dd>
            </div>
          </dl>

          <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
            ✓ La loi impose de retenir la formule la plus favorable : ici, la règle{" "}
            <strong>{r.regleRetenue === "maintien" ? "du maintien de salaire" : "du 1/10e"}</strong>.
          </p>
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation brute {ANNEE}. Votre convention collective peut accorder des jours
          supplémentaires (ancienneté, fractionnement). Mis à jour : janvier {ANNEE}.
        </p>
      </aside>
    </div>
  );
}
