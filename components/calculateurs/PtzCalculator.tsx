"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculerPTZ } from "@/lib/ptz";
import { euros } from "@/lib/brutNet";
import { ANNEE, PTZ, type ZonePTZ } from "@/data/baremes2026";

const ZONES: ZonePTZ[] = ["A bis", "A", "B1", "B2", "C"];

export default function PtzCalculator() {
  const [rfr, setRfr] = useState(35000);
  const [personnes, setPersonnes] = useState(2);
  const [zone, setZone] = useState<ZonePTZ>("B1");
  const [cout, setCout] = useState(220000);
  const [primo, setPrimo] = useState(true);

  const r = useMemo(
    () => calculerPTZ(rfr, personnes, zone, cout, primo),
    [rfr, personnes, zone, cout, primo]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <label className="mb-4 flex items-center gap-2 text-sm text-encre/90">
          <input type="checkbox" checked={primo} onChange={(e) => setPrimo(e.target.checked)}
            className="h-4 w-4 accent-marine" />
          Je suis primo-accédant (pas propriétaire de ma résidence principale depuis 2 ans)
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rfr" className="etiquette">Revenu fiscal de référence (N-2)</label>
            <div className="relative">
              <input id="rfr" type="number" inputMode="decimal" min={0} step={1000}
                value={rfr || ""} onChange={(e) => setRfr(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
            <p className="mt-1 text-xs text-griseNote">Sur votre avis d'imposition.</p>
          </div>

          <div>
            <label htmlFor="pers" className="etiquette">Personnes dans le foyer</label>
            <select id="pers" value={personnes} onChange={(e) => setPersonnes(parseInt(e.target.value))} className="champ">
              {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="zone" className="etiquette">Zone du logement</label>
            <select id="zone" value={zone} onChange={(e) => setZone(e.target.value as ZonePTZ)} className="champ">
              {ZONES.map((z) => <option key={z} value={z}>Zone {z}</option>)}
            </select>
            <p className="mt-1 text-xs text-griseNote">{PTZ.villesExemples[zone]}</p>
          </div>

          <div>
            <label htmlFor="cout" className="etiquette">Coût total de l'opération</label>
            <div className="relative">
              <input id="cout" type="number" inputMode="decimal" min={0} step={5000}
                value={cout || ""} onChange={(e) => setCout(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-papier p-3 text-xs text-encre/80">
          Plafond de revenus en zone {zone} pour {personnes} personne(s) :{" "}
          <strong className="font-tab">{euros(r.plafondRevenu)} €</strong> · Coût d'opération
          retenu (plafonné) : <strong className="font-tab">{euros(r.coutRetenu)} €</strong>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Montant du PTZ estimé</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">{euros(r.montantPTZ)} €</span>
          </p>

          {r.eligible ? (
            <>
              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Tranche de revenus</dt>
                  <dd className="font-tab font-medium">{r.tranche} sur 4</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Quotité finançable</dt>
                  <dd className="font-tab font-medium">{r.quotite} %</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Reste à financer</dt>
                  <dd className="font-tab">{euros(cout - r.montantPTZ)} €</dd>
                </div>
              </dl>
              <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                💡 Le PTZ est sans intérêts et souvent assorti d'un différé de remboursement de
                plusieurs années — il allège fortement vos mensualités de départ.
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-encre/90">{r.raisonRefus}</p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation {ANNEE}. Le PTZ est réformé régulièrement (types de logements éligibles,
          zones, quotités) : faites valider par votre banque ou l'ADIL. Complétez avec le{" "}
          <Link href="/immobilier/pret-immobilier/" className="font-semibold text-marine hover:underline">
            calculateur de prêt
          </Link>.
        </p>
      </aside>
    </div>
  );
}
