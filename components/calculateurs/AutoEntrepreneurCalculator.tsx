"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculerAE } from "@/lib/autoEntrepreneur";
import { euros } from "@/lib/brutNet";
import { ANNEE, AUTO_ENTREPRENEUR, type ActiviteAE } from "@/data/baremes2026";

export default function AutoEntrepreneurCalculator({
  caInitial = 30000,
}: {
  caInitial?: number;
}) {
  const [periode, setPeriode] = useState<"mensuel" | "annuel">("annuel");
  const [ca, setCa] = useState(caInitial);
  const [activite, setActivite] = useState<ActiviteAE>("prestation-bnc");
  const [acre, setAcre] = useState(false);
  const [vl, setVl] = useState(false);

  const caAnnuel = periode === "mensuel" ? ca * 12 : ca;
  const cfg = AUTO_ENTREPRENEUR[activite];

  const r = useMemo(
    () => (caAnnuel > 0 ? calculerAE(caAnnuel, activite, acre, vl) : null),
    [caAnnuel, activite, acre, vl]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ca" className="etiquette">Chiffre d'affaires encaissé</label>
            <div className="relative">
              <input
                id="ca" type="number" inputMode="decimal" min={0} step={500}
                value={ca || ""}
                onChange={(e) => setCa(parseFloat(e.target.value) || 0)}
                className="champ pr-10" placeholder="30 000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <span className="etiquette">Période</span>
            <div className="inline-flex w-full rounded-lg border border-ligne p-1 text-sm font-semibold">
              <button
                onClick={() => setPeriode("annuel")}
                className={`flex-1 rounded-md px-4 py-2 transition ${
                  periode === "annuel" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
                }`}
              >
                Annuel
              </button>
              <button
                onClick={() => setPeriode("mensuel")}
                className={`flex-1 rounded-md px-4 py-2 transition ${
                  periode === "mensuel" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
                }`}
              >
                Mensuel
              </button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="activite" className="etiquette">Type d'activité</label>
            <select
              id="activite"
              value={activite}
              onChange={(e) => setActivite(e.target.value as ActiviteAE)}
              className="champ"
            >
              {Object.entries(AUTO_ENTREPRENEUR).map(([k, v]) => (
                <option key={k} value={k}>{v.libelle}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-encre/90">
            <input type="checkbox" checked={acre} onChange={(e) => setAcre(e.target.checked)}
              className="h-4 w-4 accent-marine" />
            Bénéficiaire de l'ACRE (début d'activité, cotisations réduites ~50 %)
          </label>

          <label className="flex items-center gap-2 text-sm text-encre/90">
            <input type="checkbox" checked={vl} onChange={(e) => setVl(e.target.checked)}
              className="h-4 w-4 accent-marine" />
            Versement libératoire de l'impôt ({cfg.versementLiberatoire} % du CA)
          </label>
        </div>

        {/* ---- Jauges de seuils ---- */}
        {r && (
          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-semibold text-griseNote">Franchise de TVA</span>
                <span className="font-tab">
                  {euros(caAnnuel)} € / {euros(cfg.seuilTVA)} €
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-papier">
                <div
                  className={`h-full rounded-full transition-all ${
                    r.depassementTVA ? "bg-[#A3341F]" : r.progressionTVA > 80 ? "bg-fluoFonce" : "bg-vertNet"
                  }`}
                  style={{ width: `${r.progressionTVA}%` }}
                />
              </div>
              {r.depassementTVAMajore ? (
                <p className="mt-1 text-xs font-semibold text-[#A3341F]">
                  ⚠️ Seuil majoré ({euros(cfg.seuilTVAMajore)} €) dépassé : TVA due dès le 1er jour
                  du dépassement. Facturation avec TVA obligatoire.
                </p>
              ) : r.depassementTVA ? (
                <p className="mt-1 text-xs font-semibold text-[#A3341F]">
                  ⚠️ Seuil de franchise dépassé : vous basculerez dans le régime TVA (tolérance
                  jusqu'à {euros(cfg.seuilTVAMajore)} €).
                </p>
              ) : r.progressionTVA > 80 ? (
                <p className="mt-1 text-xs text-encre/80">
                  Vous approchez du seuil de TVA — anticipez la facturation avec TVA.
                </p>
              ) : null}
            </div>

            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-semibold text-griseNote">Plafond du régime micro</span>
                <span className="font-tab">
                  {euros(caAnnuel)} € / {euros(cfg.plafondCA)} €
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-papier">
                <div
                  className={`h-full rounded-full transition-all ${
                    r.depassementPlafond ? "bg-[#A3341F]" : "bg-marine"
                  }`}
                  style={{ width: `${r.progressionPlafond}%` }}
                />
              </div>
              {r.depassementPlafond && (
                <p className="mt-1 text-xs font-semibold text-[#A3341F]">
                  ⚠️ Plafond dépassé : sortie du régime micro-entrepreneur après 2 années
                  consécutives de dépassement (passage en entreprise individuelle au réel).
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {r ? (
            <>
              <p className="etiquette">Revenu net {vl ? "après impôt (VL)" : "avant impôt"}</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">{euros(vl ? r.netApresVL : r.netAvantImpot)} €</span>
                <span className="ml-2 text-base font-semibold text-griseNote">/ an</span>
              </p>
              <p className="mt-1 text-sm text-griseNote">
                soit {euros((vl ? r.netApresVL : r.netAvantImpot) / 12)} € par mois
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Chiffre d'affaires annuel</dt>
                  <dd className="font-tab font-medium">{euros(r.caAnnuel)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">
                    Cotisations sociales ({r.tauxCotisations.toLocaleString("fr-FR")} %{acre ? " avec ACRE" : ""})
                  </dt>
                  <dd className="font-tab font-medium">− {euros(r.cotisations)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Formation professionnelle (CFP)</dt>
                  <dd className="font-tab font-medium">− {euros(r.cfp)} €</dd>
                </div>
                {vl ? (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">Impôt (versement libératoire)</dt>
                    <dd className="font-tab font-medium">− {euros(r.impotVL)} €</dd>
                  </div>
                ) : (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">Bénéfice imposable (abattement {r.abattement} %)</dt>
                    <dd className="font-tab font-medium">{euros(r.beneficeImposable)} €</dd>
                  </div>
                )}
              </dl>

              {!vl && (
                <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                  💡 Sans versement libératoire, ce bénéfice imposable s'ajoute aux revenus de
                  votre foyer et suit le barème progressif —{" "}
                  <Link href="/impots/impot-revenu/" className="font-semibold text-marine hover:underline">
                    estimez votre impôt ici
                  </Link>.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-griseNote">Saisissez votre chiffre d'affaires.</p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation {ANNEE} hors taxes pour frais de chambre consulaire (artisans/commerçants) et
          hors cotisation foncière des entreprises (CFE). Taux à jour de la trajectoire {ANNEE}.
        </p>
      </aside>
    </div>
  );
}
