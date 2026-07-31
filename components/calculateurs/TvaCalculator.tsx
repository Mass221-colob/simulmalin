"use client";

import { useMemo, useState } from "react";
import { euros, eurosPrecis } from "@/lib/brutNet";
import { TAUX_TVA } from "@/data/baremes2026";

export default function TvaCalculator({ tauxInitial = 20 }: { tauxInitial?: number }) {
  const [sens, setSens] = useState<"ht-ttc" | "ttc-ht">("ht-ttc");
  const [montant, setMontant] = useState(100);
  const [taux, setTaux] = useState(tauxInitial);

  const r = useMemo(() => {
    if (!montant || montant <= 0) return null;
    if (sens === "ht-ttc") {
      const tva = (montant * taux) / 100;
      return { ht: montant, tva, ttc: montant + tva };
    }
    const ht = montant / (1 + taux / 100);
    return { ht, tva: montant - ht, ttc: montant };
  }, [sens, montant, taux]);

  const tauxInfo = TAUX_TVA.find((t) => t.taux === taux);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="mb-5 inline-flex rounded-lg border border-ligne p-1 text-sm font-semibold">
          <button onClick={() => setSens("ht-ttc")}
            className={`rounded-md px-4 py-1.5 transition ${sens === "ht-ttc" ? "bg-marine text-white" : "text-griseNote hover:text-encre"}`}>
            HT → TTC
          </button>
          <button onClick={() => setSens("ttc-ht")}
            className={`rounded-md px-4 py-1.5 transition ${sens === "ttc-ht" ? "bg-marine text-white" : "text-griseNote hover:text-encre"}`}>
            TTC → HT
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="montant" className="etiquette">
              Montant {sens === "ht-ttc" ? "hors taxes" : "toutes taxes comprises"}
            </label>
            <div className="relative">
              <input id="montant" type="number" inputMode="decimal" min={0} step={10}
                value={montant || ""} onChange={(e) => setMontant(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="taux" className="etiquette">Taux de TVA</label>
            <select id="taux" value={taux} onChange={(e) => setTaux(parseFloat(e.target.value))} className="champ">
              {TAUX_TVA.map((t) => (
                <option key={t.taux} value={t.taux}>{t.libelle}</option>
              ))}
            </select>
            {tauxInfo && <p className="mt-1 text-xs text-griseNote">{tauxInfo.exemple}</p>}
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {r ? (
            <>
              <p className="etiquette">Montant {sens === "ht-ttc" ? "TTC" : "HT"}</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">
                  {eurosPrecis(sens === "ht-ttc" ? r.ttc : r.ht)} €
                </span>
              </p>
              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Montant HT</dt>
                  <dd className="font-tab font-medium">{eurosPrecis(r.ht)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">TVA ({taux.toLocaleString("fr-FR")} %)</dt>
                  <dd className="font-tab font-medium">{eurosPrecis(r.tva)} €</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Montant TTC</dt>
                  <dd className="font-tab">{eurosPrecis(r.ttc)} €</dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="text-sm text-griseNote">Saisissez un montant.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
