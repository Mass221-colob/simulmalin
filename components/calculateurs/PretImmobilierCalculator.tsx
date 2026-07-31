"use client";

import { useMemo, useState } from "react";
import {
  calculerPret,
  calculerCapacite,
  tableauParAnnee,
} from "@/lib/pretImmobilier";
import { euros } from "@/lib/brutNet";
import {
  ANNEE,
  TAUX_INDICATIFS,
  TAUX_ASSURANCE_DEFAUT,
  TAUX_ENDETTEMENT_MAX,
} from "@/data/baremes2026";

type Mode = "mensualite" | "capacite";

export default function PretImmobilierCalculator({
  capitalInitial = 200000,
  dureeInitiale = 20,
}: {
  capitalInitial?: number;
  dureeInitiale?: number;
}) {
  const [mode, setMode] = useState<Mode>("mensualite");

  // Mode mensualité
  const [capital, setCapital] = useState(capitalInitial);
  // Commun
  const [duree, setDuree] = useState(dureeInitiale);
  const [taux, setTaux] = useState<number>(TAUX_INDICATIFS[dureeInitiale] ?? 3.3);
  const [assurance, setAssurance] = useState<number>(TAUX_ASSURANCE_DEFAUT);
  // Mode capacité
  const [revenus, setRevenus] = useState(3000);
  const [charges, setCharges] = useState(0);
  const [apport, setApport] = useState(20000);

  const [tableauOuvert, setTableauOuvert] = useState(false);

  const changerDuree = (d: number) => {
    setDuree(d);
    if (TAUX_INDICATIFS[d]) setTaux(TAUX_INDICATIFS[d]);
  };

  const capacite = useMemo(
    () =>
      mode === "capacite" && revenus > 0
        ? calculerCapacite(revenus, charges, taux, duree, assurance, apport)
        : null,
    [mode, revenus, charges, taux, duree, assurance, apport]
  );

  const capitalEffectif = mode === "capacite" ? capacite?.capitalEmpruntable ?? 0 : capital;

  const pret = useMemo(
    () =>
      capitalEffectif > 0 && taux >= 0 && duree > 0
        ? calculerPret(capitalEffectif, taux, duree, assurance)
        : null,
    [capitalEffectif, taux, duree, assurance]
  );

  const annees = useMemo(() => (pret ? tableauParAnnee(pret.tableau) : []), [pret]);

  const exporterCSV = () => {
    if (!pret) return;
    const lignes = [
      "Mois;Intérêts;Capital remboursé;Assurance;Mensualité totale;Capital restant dû",
      ...pret.tableau.map(
        (l) =>
          `${l.mois};${l.interets.toFixed(2)};${l.capitalRembourse.toFixed(2)};${l.assurance.toFixed(2)};${l.mensualiteTotale.toFixed(2)};${l.restantDu.toFixed(2)}`
      ),
    ].join("\n");
    const blob = new Blob(["\uFEFF" + lignes], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `amortissement-${capitalEffectif}e-${duree}ans.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="mb-5 inline-flex rounded-lg border border-ligne p-1 text-sm font-semibold">
          <button
            onClick={() => setMode("mensualite")}
            className={`rounded-md px-4 py-1.5 transition ${
              mode === "mensualite" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
            }`}
          >
            Quelle mensualité ?
          </button>
          <button
            onClick={() => setMode("capacite")}
            className={`rounded-md px-4 py-1.5 transition ${
              mode === "capacite" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
            }`}
          >
            Combien emprunter ?
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {mode === "mensualite" ? (
            <div className="sm:col-span-2">
              <label htmlFor="capital" className="etiquette">Montant emprunté</label>
              <div className="relative">
                <input
                  id="capital"
                  type="number" inputMode="decimal" min={0} step={5000}
                  value={capital || ""}
                  onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
                  className="champ pr-10" placeholder="200 000"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="revenus" className="etiquette">Revenus nets mensuels du foyer</label>
                <div className="relative">
                  <input
                    id="revenus" type="number" inputMode="decimal" min={0} step={100}
                    value={revenus || ""}
                    onChange={(e) => setRevenus(parseFloat(e.target.value) || 0)}
                    className="champ pr-10" placeholder="3 000"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
                </div>
              </div>
              <div>
                <label htmlFor="charges" className="etiquette">Crédits en cours (mensualités)</label>
                <div className="relative">
                  <input
                    id="charges" type="number" inputMode="decimal" min={0} step={50}
                    value={charges || ""}
                    onChange={(e) => setCharges(parseFloat(e.target.value) || 0)}
                    className="champ pr-10" placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
                </div>
              </div>
              <div>
                <label htmlFor="apport" className="etiquette">Apport personnel</label>
                <div className="relative">
                  <input
                    id="apport" type="number" inputMode="decimal" min={0} step={1000}
                    value={apport || ""}
                    onChange={(e) => setApport(parseFloat(e.target.value) || 0)}
                    className="champ pr-10" placeholder="20 000"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="duree" className="etiquette">Durée</label>
            <select id="duree" value={duree} onChange={(e) => changerDuree(parseInt(e.target.value))} className="champ">
              {[10, 15, 20, 25].map((d) => (
                <option key={d} value={d}>{d} ans</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="taux" className="etiquette">Taux d'intérêt (%)</label>
            <input
              id="taux" type="number" inputMode="decimal" min={0} max={15} step={0.05}
              value={taux || ""}
              onChange={(e) => setTaux(parseFloat(e.target.value) || 0)}
              className="champ"
            />
            <p className="mt-1 text-xs text-griseNote">Taux indicatif pré-rempli selon la durée — ajustez avec l'offre de votre banque.</p>
          </div>

          <div>
            <label htmlFor="assurance" className="etiquette">Assurance emprunteur (%/an)</label>
            <input
              id="assurance" type="number" inputMode="decimal" min={0} max={2} step={0.05}
              value={assurance}
              onChange={(e) => setAssurance(parseFloat(e.target.value) || 0)}
              className="champ"
            />
          </div>
        </div>

        {/* ---- Tableau d'amortissement ---- */}
        {pret && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setTableauOuvert(!tableauOuvert)}
                className="text-sm font-semibold text-marine underline-offset-2 hover:underline"
                aria-expanded={tableauOuvert}
              >
                {tableauOuvert ? "Masquer" : "Voir"} le tableau d'amortissement
              </button>
              <button
                onClick={exporterCSV}
                className="rounded-md border border-ligne bg-white px-3 py-1.5 text-xs font-semibold transition hover:border-marine hover:text-marine"
              >
                ⬇ Exporter le détail mensuel (CSV)
              </button>
            </div>

            {tableauOuvert && (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs">
                  <caption className="sr-only">Tableau d'amortissement par année</caption>
                  <thead>
                    <tr className="text-left text-griseNote">
                      <th className="filet py-1.5 font-medium">Année</th>
                      <th className="filet py-1.5 text-right font-medium">Intérêts</th>
                      <th className="filet py-1.5 text-right font-medium">Capital</th>
                      <th className="filet py-1.5 text-right font-medium">Assurance</th>
                      <th className="filet py-1.5 text-right font-medium">Restant dû</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annees.map((a) => (
                      <tr key={a.annee} className="filet">
                        <td className="py-1.5 font-tab">{a.annee}</td>
                        <td className="py-1.5 text-right font-tab">{euros(a.interets)} €</td>
                        <td className="py-1.5 text-right font-tab">{euros(a.capital)} €</td>
                        <td className="py-1.5 text-right font-tab">{euros(a.assurance)} €</td>
                        <td className="py-1.5 text-right font-tab">{euros(a.restantDu)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-griseNote">
                  Le détail mois par mois ({pret.tableau.length} lignes) est disponible via l'export CSV.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {pret ? (
            <>
              {mode === "capacite" && capacite ? (
                <>
                  <p className="etiquette">Vous pouvez emprunter environ</p>
                  <p className="font-display text-4xl font-extrabold tracking-tight">
                    <span className="surligne font-tab">{euros(capacite.capitalEmpruntable)} €</span>
                  </p>
                  <p className="mt-1 text-sm text-griseNote">
                    Budget total avec apport : <strong className="text-encre">{euros(capacite.budgetTotal)} €</strong>
                  </p>
                </>
              ) : (
                <>
                  <p className="etiquette">Mensualité (assurance incluse)</p>
                  <p className="font-display text-4xl font-extrabold tracking-tight">
                    <span className="surligne font-tab">{euros(pret.mensualiteTotale)} €</span>
                    <span className="ml-2 text-base font-semibold text-griseNote">/ mois</span>
                  </p>
                </>
              )}

              <dl className="mt-5 space-y-2.5 text-sm">
                {mode === "capacite" && capacite && (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">Mensualité max ({TAUX_ENDETTEMENT_MAX} % des revenus)</dt>
                    <dd className="font-tab font-medium">{euros(capacite.mensualiteMax)} €</dd>
                  </div>
                )}
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Dont assurance</dt>
                  <dd className="font-tab font-medium">{euros(pret.assuranceMensuelle)} € / mois</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Coût des intérêts</dt>
                  <dd className="font-tab font-medium">{euros(pret.coutInterets)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Coût de l'assurance</dt>
                  <dd className="font-tab font-medium">{euros(pret.coutAssurance)} €</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Coût total du crédit</dt>
                  <dd className="font-tab text-marine">{euros(pret.coutTotalCredit)} €</dd>
                </div>
              </dl>

              <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                💡 Sur {duree} ans, vous rembourserez au total{" "}
                <strong>{euros(pret.capital + pret.coutTotalCredit)} €</strong> pour{" "}
                {euros(pret.capital)} € empruntés.
              </p>
            </>
          ) : (
            <p className="text-sm text-griseNote">Renseignez les champs pour voir le résultat.</p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation {ANNEE} à titre indicatif : le taux réel dépend de votre profil et de la
          banque. Hors frais de dossier et de garantie. Un crédit vous engage et doit être remboursé.
        </p>
      </aside>
    </div>
  );
}
