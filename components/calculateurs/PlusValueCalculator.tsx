"use client";

import { useMemo, useState } from "react";
import { calculerPlusValue, abattementIR, abattementPS } from "@/lib/plusValue";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function PlusValueCalculator() {
  const [prixAchat, setPrixAchat] = useState(180000);
  const [fraisAcq, setFraisAcq] = useState(13000);
  const [travaux, setTravaux] = useState(0);
  const [forfait, setForfait] = useState(true);
  const [prixVente, setPrixVente] = useState(280000);
  const [fraisVente, setFraisVente] = useState(0);
  const [annees, setAnnees] = useState(12);
  const [rp, setRp] = useState(false);

  const r = useMemo(
    () => calculerPlusValue(prixAchat, fraisAcq, travaux, prixVente, fraisVente, annees, rp, forfait),
    [prixAchat, fraisAcq, travaux, prixVente, fraisVente, annees, rp, forfait]
  );

  const Champ = ({ id, label, value, onChange, step = 1000 }: any) => (
    <div>
      <label htmlFor={id} className="etiquette">{label}</label>
      <div className="relative">
        <input id={id} type="number" inputMode="decimal" min={0} step={step}
          value={value || ""} onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="champ pr-10" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <label className="mb-4 flex items-center gap-2 text-sm text-encre/90">
          <input type="checkbox" checked={rp} onChange={(e) => setRp(e.target.checked)}
            className="h-4 w-4 accent-marine" />
          Il s'agit de ma résidence principale (exonération totale)
        </label>

        <p className="mb-3 font-display font-bold">L'acquisition</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Champ id="pa" label="Prix d'achat" value={prixAchat} onChange={setPrixAchat} />
          <Champ id="fa" label="Frais d'acquisition" value={fraisAcq} onChange={setFraisAcq} step={500} />
          <Champ id="tr" label="Travaux justifiés" value={travaux} onChange={setTravaux} step={500} />
        </div>
        <label className="mt-2 flex items-center gap-2 text-sm text-encre/90">
          <input type="checkbox" checked={forfait} onChange={(e) => setForfait(e.target.checked)}
            className="h-4 w-4 accent-marine" disabled={annees <= 5} />
          Appliquer le forfait travaux de 15 % (possible après 5 ans, sans justificatif)
        </label>

        <p className="mb-3 mt-6 font-display font-bold">La vente</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Champ id="pv" label="Prix de vente" value={prixVente} onChange={setPrixVente} />
          <Champ id="fv" label="Frais de vente (diagnostics…)" value={fraisVente} onChange={setFraisVente} step={200} />
          <div>
            <label htmlFor="an" className="etiquette">
              Détention : <span className="font-tab text-encre">{annees} ans</span>
            </label>
            <input id="an" type="range" min={0} max={35} step={1} value={annees}
              onChange={(e) => setAnnees(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
          </div>
        </div>

        {!rp && (
          <div className="mt-6">
            <p className="etiquette">Abattements selon la durée de détention</p>
            <div className="mt-2 space-y-3">
              {[
                { label: `Impôt sur le revenu (19 %) — exonération à 22 ans`, val: r.abattementIR, couleur: "#20356B" },
                { label: `Prélèvements sociaux (17,2 %) — exonération à 30 ans`, val: r.abattementPS, couleur: "#5A7BC4" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-griseNote">{b.label}</span>
                    <span className="font-tab font-semibold">{b.val.toFixed(1).replace(".", ",")} %</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-papier">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${b.val}%`, background: b.couleur }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-griseNote">
              Chaque année de détention supplémentaire au-delà de 5 ans réduit l'imposition.
            </p>
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Impôt sur la plus-value</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">{euros(r.impotTotal)} €</span>
          </p>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Prix d'acquisition corrigé</dt>
              <dd className="font-tab font-medium">{euros(r.prixAcquisitionCorrige)} €</dd>
            </div>
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Plus-value brute</dt>
              <dd className="font-tab font-medium">{euros(r.plusValueBrute)} €</dd>
            </div>
            {!rp && (
              <>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Impôt sur le revenu (19 %)</dt>
                  <dd className="font-tab font-medium">{euros(r.impotIR)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Prélèvements sociaux (17,2 %)</dt>
                  <dd className="font-tab font-medium">{euros(r.impotPS)} €</dd>
                </div>
                {r.surtaxe > 0 && (
                  <div className="filet flex justify-between pb-2.5">
                    <dt className="text-griseNote">Surtaxe plus-value élevée</dt>
                    <dd className="font-tab font-medium">{euros(r.surtaxe)} €</dd>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-between font-semibold">
              <dt>Net vendeur estimé</dt>
              <dd className="font-tab text-vertNet">{euros(r.netVendeur)} €</dd>
            </div>
          </dl>

          {rp ? (
            <p className="mt-3 rounded-md bg-papier p-3 text-xs text-vertNet">
              ✓ La vente de votre résidence principale est totalement exonérée d'impôt sur la
              plus-value, quelle que soit la durée de détention.
            </p>
          ) : r.exonereIR && r.exonerePS ? (
            <p className="mt-3 rounded-md bg-papier p-3 text-xs text-vertNet">
              ✓ Après 30 ans de détention, la plus-value est totalement exonérée.
            </p>
          ) : (
            <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
              💡 En attendant {22 - annees > 0 ? `${22 - annees} an(s)` : "quelques années"} de plus,
              l'abattement continue de progresser.
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation {ANNEE} hors cas particuliers (première cession d'un logement autre que la RP,
          expropriation, retraités modestes). L'impôt est calculé et prélevé par le notaire.
        </p>
      </aside>
    </div>
  );
}
