"use client";

import { useMemo, useState } from "react";
import {
  calculerBrutNet,
  calculerNetVersBrut,
  versBrutMensuel,
  euros,
  eurosPrecis,
  type Periode,
} from "@/lib/brutNet";
import { LIBELLES_STATUT, type Statut } from "@/data/baremes2026";

export default function BrutNetCalculator({
  montantInitial = 2500,
}: {
  montantInitial?: number;
}) {
  const [mode, setMode] = useState<"brut-net" | "net-brut">("brut-net");
  const [montant, setMontant] = useState<number>(montantInitial);
  const [periode, setPeriode] = useState<Periode>("mensuel");
  const [statut, setStatut] = useState<Statut>("non-cadre");
  const [tempsPartiel, setTempsPartiel] = useState<number>(100);
  const [tauxImpot, setTauxImpot] = useState<number>(0);
  const [detailOuvert, setDetailOuvert] = useState(false);

  const resultat = useMemo(() => {
    if (!montant || montant <= 0) return null;
    if (mode === "net-brut") {
      const brut = calculerNetVersBrut(montant, statut);
      return calculerBrutNet(brut, statut, tauxImpot);
    }
    const brutMensuel = versBrutMensuel(montant, periode, tempsPartiel);
    return calculerBrutNet(brutMensuel, statut, tauxImpot);
  }, [mode, montant, periode, statut, tempsPartiel, tauxImpot]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        {/* Sélecteur de mode */}
        <div className="mb-5 inline-flex rounded-lg border border-ligne p-1 text-sm font-semibold">
          <button
            onClick={() => setMode("brut-net")}
            className={`rounded-md px-4 py-1.5 transition ${
              mode === "brut-net" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
            }`}
          >
            Brut → Net
          </button>
          <button
            onClick={() => setMode("net-brut")}
            className={`rounded-md px-4 py-1.5 transition ${
              mode === "net-brut" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
            }`}
          >
            Net → Brut
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="montant" className="etiquette">
              {mode === "brut-net" ? "Salaire brut" : "Salaire net souhaité (mensuel)"}
            </label>
            <div className="relative">
              <input
                id="montant"
                type="number"
                inputMode="decimal"
                min={0}
                value={montant || ""}
                onChange={(e) => setMontant(parseFloat(e.target.value) || 0)}
                className="champ pr-10"
                placeholder="2 500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          {mode === "brut-net" && (
            <div>
              <label htmlFor="periode" className="etiquette">Période</label>
              <select
                id="periode"
                value={periode}
                onChange={(e) => setPeriode(e.target.value as Periode)}
                className="champ"
              >
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
                <option value="horaire">Horaire</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="statut" className="etiquette">Statut</label>
            <select
              id="statut"
              value={statut}
              onChange={(e) => setStatut(e.target.value as Statut)}
              className="champ"
            >
              {Object.entries(LIBELLES_STATUT).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          {mode === "brut-net" && (
            <div>
              <label htmlFor="tp" className="etiquette">
                Temps de travail : <span className="font-tab text-encre">{tempsPartiel}%</span>
              </label>
              <input
                id="tp"
                type="range"
                min={10}
                max={100}
                step={10}
                value={tempsPartiel}
                onChange={(e) => setTempsPartiel(parseInt(e.target.value))}
                className="mt-3 w-full accent-marine"
              />
            </div>
          )}

          <div>
            <label htmlFor="ir" className="etiquette">Taux de prélèvement à la source (%)</label>
            <input
              id="ir"
              type="number"
              inputMode="decimal"
              min={0}
              max={45}
              step={0.1}
              value={tauxImpot || ""}
              onChange={(e) => setTauxImpot(parseFloat(e.target.value) || 0)}
              className="champ"
              placeholder="0"
            />
            <p className="mt-1 text-xs text-griseNote">
              Visible sur votre fiche de paie ou votre espace impots.gouv.fr. Laissez 0 pour l'ignorer.
            </p>
          </div>
        </div>
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {resultat ? (
            <>
              <p className="etiquette">
                {mode === "brut-net" ? "Salaire net mensuel (avant impôt)" : "Salaire brut mensuel nécessaire"}
              </p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">
                  {mode === "brut-net"
                    ? euros(resultat.netMensuel)
                    : euros(resultat.brutMensuel)}{" "}€
                </span>
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Brut mensuel</dt>
                  <dd className="font-tab font-medium">{euros(resultat.brutMensuel)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">
                    Cotisations salariales ({resultat.tauxGlobal.toFixed(1)} %)
                  </dt>
                  <dd className="font-tab font-medium">− {euros(resultat.totalCotisations)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Net annuel</dt>
                  <dd className="font-tab font-medium">{euros(resultat.netAnnuel)} €</dd>
                </div>
                {tauxImpot > 0 && (
                  <>
                    <div className="filet flex justify-between pb-2.5">
                      <dt className="text-griseNote">Impôt à la source ({tauxImpot} %)</dt>
                      <dd className="font-tab font-medium">− {euros(resultat.impotMensuel)} €</dd>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <dt>Net après impôt</dt>
                      <dd className="font-tab text-vertNet">{euros(resultat.netApresImpot)} €</dd>
                    </div>
                  </>
                )}
              </dl>

              <button
                onClick={() => setDetailOuvert(!detailOuvert)}
                className="mt-4 text-sm font-semibold text-marine underline-offset-2 hover:underline"
                aria-expanded={detailOuvert}
              >
                {detailOuvert ? "Masquer" : "Voir"} le détail des cotisations
              </button>

              {detailOuvert && (
                <table className="mt-3 w-full text-xs">
                  <caption className="sr-only">Détail des cotisations salariales</caption>
                  <tbody>
                    {resultat.details.map((d) => (
                      <tr key={d.libelle} className="filet">
                        <td className="py-1.5 pr-2 text-griseNote">{d.libelle}</td>
                        <td className="py-1.5 pr-2 text-right font-tab">{d.taux} %</td>
                        <td className="py-1.5 text-right font-tab">{eurosPrecis(d.montant)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <p className="text-sm text-griseNote">
              Saisissez un montant pour voir le résultat instantanément.
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation indicative basée sur les taux standards {new Date().getFullYear()}. Le net réel
          peut varier selon la convention collective et la mutuelle d'entreprise.
        </p>
      </aside>
    </div>
  );
}
