"use client";

import { useMemo, useState } from "react";
import { calculerIndemnite, salaireReference, type TypeRupture } from "@/lib/licenciement";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function LicenciementCalculator({
  anneesInitiales = 5,
}: {
  anneesInitiales?: number;
}) {
  const [moy12, setMoy12] = useState(2500);
  const [moy3, setMoy3] = useState(2500);
  const [annees, setAnnees] = useState(anneesInitiales);
  const [mois, setMois] = useState(0);
  const [type, setType] = useState<TypeRupture>("licenciement");

  const salaireRef = useMemo(() => salaireReference(moy12 || 0, moy3 || 0), [moy12, moy3]);

  const resultat = useMemo(
    () => calculerIndemnite(salaireRef, annees, mois, type),
    [salaireRef, annees, mois, type]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="type" className="etiquette">Type de rupture</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as TypeRupture)}
              className="champ"
            >
              <option value="licenciement">Licenciement (motif personnel ou économique)</option>
              <option value="rupture-conventionnelle">Rupture conventionnelle</option>
              <option value="faute-grave">Licenciement pour faute grave ou lourde</option>
            </select>
          </div>

          <div>
            <label htmlFor="moy12" className="etiquette">Salaire brut moyen — 12 derniers mois</label>
            <div className="relative">
              <input
                id="moy12" type="number" inputMode="decimal" min={0} step={50}
                value={moy12 || ""}
                onChange={(e) => setMoy12(parseFloat(e.target.value) || 0)}
                className="champ pr-10" placeholder="2 500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="moy3" className="etiquette">Salaire brut moyen — 3 derniers mois</label>
            <div className="relative">
              <input
                id="moy3" type="number" inputMode="decimal" min={0} step={50}
                value={moy3 || ""}
                onChange={(e) => setMoy3(parseFloat(e.target.value) || 0)}
                className="champ pr-10" placeholder="2 500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
            <p className="mt-1 text-xs text-griseNote">
              Primes annuelles proratisées. La loi retient automatiquement la formule la plus favorable.
            </p>
          </div>

          <div>
            <label htmlFor="annees" className="etiquette">Ancienneté — années</label>
            <input
              id="annees" type="number" inputMode="numeric" min={0} max={50}
              value={annees}
              onChange={(e) => setAnnees(parseInt(e.target.value) || 0)}
              className="champ"
            />
          </div>

          <div>
            <label htmlFor="mois" className="etiquette">+ mois</label>
            <select id="mois" value={mois} onChange={(e) => setMois(parseInt(e.target.value))} className="champ">
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        {salaireRef > 0 && Math.max(moy12, moy3) !== Math.min(moy12, moy3) && (
          <p className="mt-4 rounded-md bg-papier p-3 text-xs text-encre/80">
            ✓ Salaire de référence retenu :{" "}
            <strong className="font-tab">{euros(salaireRef)} €</strong> (la formule la plus
            favorable des deux).
          </p>
        )}
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {type === "faute-grave" ? (
            <>
              <p className="etiquette">Indemnité légale</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">0 €</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-encre/90">
                En cas de faute grave ou lourde, l'indemnité légale de licenciement n'est pas due.
                Restent dues : l'indemnité de congés payés acquis et, sauf faute lourde privative,
                les salaires jusqu'au dernier jour travaillé. La qualification de faute grave est
                toutefois souvent contestable devant les prud'hommes.
              </p>
            </>
          ) : !resultat.eligible ? (
            <>
              <p className="etiquette">Indemnité légale</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">0 €</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-encre/90">
                L'indemnité légale de licenciement exige au moins 8 mois d'ancienneté
                ininterrompue chez le même employeur. Vérifiez toutefois votre convention
                collective, qui peut être plus favorable.
              </p>
            </>
          ) : (
            <>
              <p className="etiquette">
                Indemnité {type === "rupture-conventionnelle" ? "minimale de rupture conventionnelle" : "légale de licenciement"}
              </p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">{euros(resultat.indemnite)} €</span>
              </p>
              <p className="mt-1 text-sm text-griseNote">
                soit {(resultat.indemnite / salaireRef).toFixed(1)} mois de salaire — exonérée
                d'impôt sur le revenu à ce niveau
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Salaire de référence</dt>
                  <dd className="font-tab font-medium">{euros(salaireRef)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Ancienneté retenue</dt>
                  <dd className="font-tab font-medium">
                    {resultat.ancienneteAnnees.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} ans
                  </dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">
                    ¼ mois × {resultat.detailTranche1.annees.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} ans (≤ 10 ans)
                  </dt>
                  <dd className="font-tab font-medium">{euros(resultat.detailTranche1.montant)} €</dd>
                </div>
                {resultat.detailTranche2.annees > 0 && (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">
                      ⅓ mois × {resultat.detailTranche2.annees.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} ans (&gt; 10 ans)
                    </dt>
                    <dd className="font-tab font-medium">{euros(resultat.detailTranche2.montant)} €</dd>
                  </div>
                )}
              </dl>

              {type === "rupture-conventionnelle" && (
                <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                  💡 C'est le <strong>minimum légal</strong> : en rupture conventionnelle, tout se
                  négocie au-dessus de ce montant. Utilisez-le comme plancher de départ.
                </p>
              )}
            </>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation {ANNEE} selon l'indemnité légale (Code du travail). Votre convention
          collective peut prévoir un montant supérieur : vérifiez-la, elle prime si elle est plus
          favorable.
        </p>
      </aside>
    </div>
  );
}
