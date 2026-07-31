"use client";

import { useMemo, useState } from "react";
import { calculerARE, type TrancheAge } from "@/lib/chomage";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function ChomageCalculator({
  salaireInitial = 2500,
}: {
  salaireInitial?: number;
}) {
  const [salaire, setSalaire] = useState(salaireInitial);
  const [mois, setMois] = useState(24);
  const [age, setAge] = useState<TrancheAge>("moins53");

  const r = useMemo(
    () => (salaire > 0 ? calculerARE(salaire, mois, age) : null),
    [salaire, mois, age]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="salaire" className="etiquette">
              Salaire brut mensuel moyen (24 derniers mois, primes incluses)
            </label>
            <div className="relative">
              <input
                id="salaire" type="number" inputMode="decimal" min={0} step={50}
                value={salaire || ""}
                onChange={(e) => setSalaire(parseFloat(e.target.value) || 0)}
                className="champ pr-10" placeholder="2 500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="mois" className="etiquette">
              Mois travaillés sur les 24 derniers : <span className="font-tab text-encre">{mois}</span>
            </label>
            <input
              id="mois" type="range" min={1} max={24} step={1}
              value={mois}
              onChange={(e) => setMois(parseInt(e.target.value))}
              className="mt-3 w-full accent-marine"
            />
            {mois < 6 && (
              <p className="mt-1 text-xs font-semibold text-[#A3341F]">
                ⚠️ Il faut au moins 6 mois travaillés (dans les 24 derniers) pour ouvrir des droits.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="etiquette">Votre âge à la fin du contrat</label>
            <select id="age" value={age} onChange={(e) => setAge(e.target.value as TrancheAge)} className="champ">
              <option value="moins53">Moins de 53 ans</option>
              <option value="de53a54">53 ou 54 ans</option>
              <option value="plus55">55 ans et plus</option>
            </select>
          </div>
        </div>
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {r && r.dureeJours > 0 ? (
            <>
              <p className="etiquette">Allocation mensuelle brute estimée</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">{euros(r.allocationMensuelle)} €</span>
              </p>
              <p className="mt-1 text-sm text-griseNote">
                soit {r.tauxRemplacement.toFixed(0)} % de votre ancien salaire brut
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Allocation journalière</dt>
                  <dd className="font-tab font-medium">{r.allocationJournaliere.toFixed(2).replace(".", ",")} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Salaire journalier de référence</dt>
                  <dd className="font-tab font-medium">{r.sjr.toFixed(2).replace(".", ",")} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Durée d'indemnisation</dt>
                  <dd className="font-tab font-medium">
                    {Math.round(r.dureeJours)} jours (≈ {r.dureeMois.toFixed(1).replace(".", ",")} mois)
                  </dd>
                </div>
                <div className="flex justify-between pb-1">
                  <dt className="text-griseNote">Total estimé sur la période</dt>
                  <dd className="font-tab font-semibold text-marine">
                    {euros(r.allocationJournaliere * r.dureeJours)} €
                  </dd>
                </div>
              </dl>

              {r.degressivite && (
                <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                  ⚠️ <strong>Dégressivité :</strong> votre allocation dépasse le seuil des hauts
                  revenus. À partir du 7e mois d'indemnisation, elle sera réduite de 30 %, soit
                  environ <strong className="font-tab">{euros(r.allocationApresDegressivite)} €</strong>{" "}
                  par mois.
                </p>
              )}
              {r.formuleRetenue === "minimum" && (
                <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                  ✓ L'allocation minimale s'applique à votre situation.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-griseNote">
              {r && r.dureeJours === 0
                ? "Avec moins de 6 mois travaillés sur les 24 derniers mois, les droits ne sont pas ouverts dans le cas général."
                : "Saisissez votre salaire pour voir l'estimation."}
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation brute {ANNEE} (avant CSG/CRDS éventuelles), hors délais de carence et
          différés d'indemnisation. Les règles de l'assurance chômage évoluent fréquemment :
          seule l'étude personnalisée de France Travail fait foi.
        </p>
      </aside>
    </div>
  );
}
