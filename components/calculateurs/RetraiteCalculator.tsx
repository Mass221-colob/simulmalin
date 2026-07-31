"use client";

import { useMemo, useState } from "react";
import { calculerRetraite } from "@/lib/retraite";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function RetraiteCalculator() {
  const [naissance, setNaissance] = useState(1975);
  const [trimestres, setTrimestres] = useState(120);
  const [sam, setSam] = useState(32000);
  const [ageDepart, setAgeDepart] = useState(64);

  const r = useMemo(
    () => calculerRetraite(naissance, trimestres, sam, ageDepart),
    [naissance, trimestres, sam, ageDepart]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nais" className="etiquette">Année de naissance</label>
            <input id="nais" type="number" inputMode="numeric" min={1950} max={2005}
              value={naissance} onChange={(e) => setNaissance(parseInt(e.target.value) || 1975)}
              className="champ" />
          </div>

          <div>
            <label htmlFor="trim" className="etiquette">
              Trimestres déjà acquis : <span className="font-tab text-encre">{trimestres}</span>
            </label>
            <input id="trim" type="range" min={0} max={180} step={1} value={trimestres}
              onChange={(e) => setTrimestres(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
            <p className="mt-1 text-xs text-griseNote">
              Chiffre exact disponible sur votre relevé de carrière (info-retraite.fr).
            </p>
          </div>

          <div>
            <label htmlFor="sam" className="etiquette">Salaire annuel brut moyen (25 meilleures années)</label>
            <div className="relative">
              <input id="sam" type="number" inputMode="decimal" min={0} step={1000}
                value={sam || ""} onChange={(e) => setSam(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="age" className="etiquette">
              Âge de départ souhaité : <span className="font-tab text-encre">{ageDepart} ans</span>
            </label>
            <input id="age" type="range" min={r.ageLegal} max={70} step={1} value={ageDepart}
              onChange={(e) => setAgeDepart(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
          </div>
        </div>

        <div className="mt-6 rounded-md bg-papier p-4 text-sm">
          <p className="font-semibold">Votre âge légal de départ</p>
          <p className="mt-1 font-tab text-2xl font-bold">
            {r.ageLegal} ans{r.moisLegal > 0 ? ` et ${r.moisLegal} mois` : ""}
          </p>
          <p className="mt-1 text-xs text-griseNote">
            Avec {r.trimestresRequis} trimestres requis pour le taux plein (réforme 2023).
            Taux plein automatique à 67 ans quel que soit le nombre de trimestres.
          </p>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Pension mensuelle brute estimée</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">{euros(r.pensionAvecComplementaire)} €</span>
          </p>
          <p className="mt-1 text-sm text-griseNote">régime général + complémentaire estimée</p>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Régime général seul</dt>
              <dd className="font-tab font-medium">{euros(r.pensionEstimee)} €</dd>
            </div>
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Trimestres manquants au départ</dt>
              <dd className="font-tab font-medium">{r.trimestresManquants}</dd>
            </div>
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Taux appliqué</dt>
              <dd className="font-tab font-medium">{r.tauxApplique.toFixed(2).replace(".", ",")} %</dd>
            </div>
            {r.decote > 0 && (
              <div className="flex justify-between pb-1">
                <dt className="text-griseNote">Décote</dt>
                <dd className="font-tab font-semibold text-[#A3341F]">− {r.decote.toFixed(2).replace(".", ",")} pts</dd>
              </div>
            )}
          </dl>

          {r.trimestresManquants > 0 ? (
            <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
              ⚠️ Il vous manque {r.trimestresManquants} trimestre(s) pour le taux plein à cet âge :
              votre pension subit une décote définitive. Travailler{" "}
              {(r.trimestresManquants / 4).toFixed(1).replace(".", ",")} an(s) de plus l'annulerait.
            </p>
          ) : (
            <p className="mt-3 rounded-md bg-papier p-3 text-xs text-vertNet">
              ✓ Vous atteignez le taux plein à cet âge de départ.
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation très simplifiée {ANNEE} : la complémentaire AGIRC-ARRCO fonctionne par points
          et varie fortement selon la carrière. Seul votre relevé sur info-retraite.fr fait foi.
        </p>
      </aside>
    </div>
  );
}
