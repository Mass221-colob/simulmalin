"use client";

import { useMemo, useState } from "react";
import { calculerIR, appliquerAbattement, type Situation } from "@/lib/impotRevenu";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

const COULEURS_TRANCHES = ["#9AA3B8", "#5A7BC4", "#20356B", "#C2801B", "#A3341F"];

export default function ImpotRevenuCalculator({
  revenuInitial = 30000,
}: {
  revenuInitial?: number;
}) {
  const [revenu, setRevenu] = useState<number>(revenuInitial);
  const [abattement, setAbattement] = useState(true);
  const [situation, setSituation] = useState<Situation>("celibataire");
  const [enfants, setEnfants] = useState(0);

  const resultat = useMemo(() => {
    if (!revenu || revenu <= 0) return null;
    const imposable = abattement ? appliquerAbattement(revenu) : revenu;
    return calculerIR(imposable, situation, enfants);
  }, [revenu, abattement, situation, enfants]);

  const totalAssiette = resultat
    ? resultat.tranches.reduce((s, t) => s + t.assiette, 0)
    : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="revenu" className="etiquette">Revenus annuels du foyer (salaires nets imposables)</label>
            <div className="relative">
              <input
                id="revenu"
                type="number"
                inputMode="decimal"
                min={0}
                value={revenu || ""}
                onChange={(e) => setRevenu(parseFloat(e.target.value) || 0)}
                className="champ pr-10"
                placeholder="30 000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
            <label className="mt-2 flex items-center gap-2 text-sm text-encre/90">
              <input
                type="checkbox"
                checked={abattement}
                onChange={(e) => setAbattement(e.target.checked)}
                className="h-4 w-4 accent-marine"
              />
              Appliquer l'abattement de 10 % pour frais professionnels (salariés)
            </label>
          </div>

          <div>
            <label htmlFor="situation" className="etiquette">Situation</label>
            <select
              id="situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value as Situation)}
              className="champ"
            >
              <option value="celibataire">Célibataire, divorcé·e ou veuf·ve</option>
              <option value="couple">Marié·e ou pacsé·e (imposition commune)</option>
            </select>
          </div>

          <div>
            <label htmlFor="enfants" className="etiquette">Enfants à charge</label>
            <select
              id="enfants"
              value={enfants}
              onChange={(e) => setEnfants(parseInt(e.target.value))}
              className="champ"
            >
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ---- Visualisation des tranches ---- */}
        {resultat && resultat.tranches.length > 0 && (
          <div className="mt-6">
            <p className="etiquette">Votre revenu dans le barème (par part fiscale)</p>
            <div className="flex h-9 w-full overflow-hidden rounded-md" role="img"
              aria-label="Répartition du revenu par tranche d'imposition">
              {resultat.tranches.map((t, i) => (
                <div
                  key={i}
                  style={{
                    width: `${(t.assiette / totalAssiette) * 100}%`,
                    background: COULEURS_TRANCHES[i] ?? "#A3341F",
                  }}
                  className="flex items-center justify-center text-[11px] font-semibold text-white"
                  title={`Tranche à ${t.taux} % : ${euros(t.assiette)} € par part`}
                >
                  {(t.assiette / totalAssiette) > 0.12 ? `${t.taux} %` : ""}
                </div>
              ))}
            </div>
            <table className="mt-3 w-full text-xs">
              <caption className="sr-only">Détail de l'impôt par tranche</caption>
              <thead>
                <tr className="text-left text-griseNote">
                  <th className="py-1 font-medium">Tranche (par part)</th>
                  <th className="py-1 text-right font-medium">Taux</th>
                  <th className="py-1 text-right font-medium">Impôt du foyer</th>
                </tr>
              </thead>
              <tbody>
                {resultat.tranches.map((t, i) => (
                  <tr key={i} className="filet">
                    <td className="py-1.5 font-tab">
                      {euros(t.de)} € → {t.a ? `${euros(t.a)} €` : "au-delà"}
                    </td>
                    <td className="py-1.5 text-right font-tab">{t.taux} %</td>
                    <td className="py-1.5 text-right font-tab">{euros(t.impot)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {resultat ? (
            <>
              <p className="etiquette">Impôt sur le revenu {ANNEE} estimé</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">{euros(resultat.impotNet)} €</span>
                <span className="ml-2 text-base font-semibold text-griseNote">/ an</span>
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Revenu imposable</dt>
                  <dd className="font-tab font-medium">{euros(resultat.revenuImposable)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Parts fiscales</dt>
                  <dd className="font-tab font-medium">{resultat.parts.toLocaleString("fr-FR")}</dd>
                </div>
                {resultat.decote > 0 && (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">Décote appliquée</dt>
                    <dd className="font-tab font-medium text-vertNet">− {euros(resultat.decote)} €</dd>
                  </div>
                )}
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Soit par mois</dt>
                  <dd className="font-tab font-medium">{euros(resultat.impotMensuel)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Taux moyen d'imposition</dt>
                  <dd className="font-tab font-medium">{resultat.tauxMoyen.toFixed(1)} %</dd>
                </div>
                <div className="flex justify-between pb-1">
                  <dt className="text-griseNote">Taux marginal (TMI)</dt>
                  <dd className="font-tab font-semibold">{resultat.tauxMarginal} %</dd>
                </div>
              </dl>

              {resultat.plafonnementApplique && (
                <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                  ℹ️ Le plafonnement du quotient familial s'applique à votre situation :
                  l'avantage fiscal par enfant est limité par la loi.
                </p>
              )}
              {resultat.impotNet === 0 && (
                <p className="mt-3 rounded-md bg-papier p-3 text-xs text-vertNet">
                  ✓ Avec ces revenus, votre foyer n'est pas imposable.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-griseNote">
              Saisissez vos revenus pour voir l'estimation instantanément.
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation indicative (barème {ANNEE}, décote et plafonnement du quotient familial inclus).
          Réductions et crédits d'impôt spécifiques non pris en compte.
        </p>
      </aside>
    </div>
  );
}
