"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculerRendement,
  LIBELLES_REGIME,
  type RegimeFiscal,
  type EntreesLocatif,
} from "@/lib/rendementLocatif";
import { euros } from "@/lib/brutNet";
import { ANNEE } from "@/data/baremes2026";

export default function RendementLocatifCalculator({
  prixInitial = 150000,
  loyerInitial = 700,
}: {
  prixInitial?: number;
  loyerInitial?: number;
}) {
  const [prix, setPrix] = useState(prixInitial);
  const [notaire, setNotaire] = useState(Math.round(prixInitial * 0.076));
  const [travaux, setTravaux] = useState(0);
  const [loyer, setLoyer] = useState(loyerInitial);
  const [charges, setCharges] = useState(600);
  const [taxeFonciere, setTaxeFonciere] = useState(900);
  const [pno, setPno] = useState(150);
  const [gestion, setGestion] = useState(0);
  const [vacance, setVacance] = useState(5);
  const [mensualite, setMensualite] = useState(0);
  const [interets, setInterets] = useState(0);
  const [tmi, setTmi] = useState(30);
  const [regime, setRegime] = useState<RegimeFiscal>("micro-foncier");

  const entrees: EntreesLocatif = {
    prixAchat: prix,
    fraisNotaire: notaire,
    travaux,
    loyerMensuel: loyer,
    chargesAnnuelles: charges,
    taxeFonciere,
    assurancePNO: pno,
    fraisGestion: gestion,
    vacanceLocative: vacance,
    mensualiteCredit: mensualite,
    interetsAnnuels: interets,
    tmi,
    regime,
  };

  const r = useMemo(() => (prix > 0 && loyer > 0 ? calculerRendement(entrees) : null), [
    prix, notaire, travaux, loyer, charges, taxeFonciere, pno, gestion, vacance,
    mensualite, interets, tmi, regime,
  ]);

  // Comparaison des 4 régimes
  const comparaison = useMemo(() => {
    if (!r) return [];
    return (Object.keys(LIBELLES_REGIME) as RegimeFiscal[]).map((reg) => ({
      regime: reg,
      libelle: LIBELLES_REGIME[reg],
      res: calculerRendement({ ...entrees, regime: reg }),
    }));
  }, [r, entrees]);

  const meilleur = comparaison.length
    ? comparaison.reduce((a, b) => (b.res.revenuNetApresImpot > a.res.revenuNetApresImpot ? b : a))
    : null;

  const Champ = ({ id, label, value, onChange, step = 100, suffixe = "€" }: any) => (
    <div>
      <label htmlFor={id} className="etiquette">{label}</label>
      <div className="relative">
        <input
          id={id} type="number" inputMode="decimal" min={0} step={step}
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="champ pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-sm text-griseNote">{suffixe}</span>
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <p className="mb-3 font-display font-bold">L'acquisition</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Champ id="prix" label="Prix d'achat" value={prix} onChange={setPrix} step={1000} />
          <Champ id="notaire" label="Frais de notaire" value={notaire} onChange={setNotaire} step={500} />
          <Champ id="travaux" label="Travaux" value={travaux} onChange={setTravaux} step={500} />
        </div>

        <p className="mb-3 mt-6 font-display font-bold">Les revenus et charges</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Champ id="loyer" label="Loyer mensuel hors charges" value={loyer} onChange={setLoyer} step={25} />
          <Champ id="charges" label="Charges annuelles" value={charges} onChange={setCharges} step={50} />
          <Champ id="tf" label="Taxe foncière" value={taxeFonciere} onChange={setTaxeFonciere} step={50} />
          <Champ id="pno" label="Assurance PNO" value={pno} onChange={setPno} step={25} />
          <div>
            <label htmlFor="gestion" className="etiquette">
              Frais de gestion : <span className="font-tab text-encre">{gestion} %</span>
            </label>
            <input id="gestion" type="range" min={0} max={12} step={1} value={gestion}
              onChange={(e) => setGestion(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
          </div>
          <div>
            <label htmlFor="vacance" className="etiquette">
              Vacance locative : <span className="font-tab text-encre">{vacance} %</span>
            </label>
            <input id="vacance" type="range" min={0} max={20} step={1} value={vacance}
              onChange={(e) => setVacance(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
          </div>
        </div>

        <p className="mb-3 mt-6 font-display font-bold">Financement et fiscalité</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Champ id="mens" label="Mensualité de crédit" value={mensualite} onChange={setMensualite} step={50} />
          <Champ id="int" label="Intérêts annuels" value={interets} onChange={setInterets} step={100} />
          <div>
            <label htmlFor="tmi" className="etiquette">Votre tranche d'imposition</label>
            <select id="tmi" value={tmi} onChange={(e) => setTmi(parseInt(e.target.value))} className="champ">
              {[0, 11, 30, 41, 45].map((t) => (
                <option key={t} value={t}>{t} %</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="regime" className="etiquette">Régime fiscal</label>
            <select id="regime" value={regime} onChange={(e) => setRegime(e.target.value as RegimeFiscal)} className="champ">
              {Object.entries(LIBELLES_REGIME).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ---- Comparaison des régimes ---- */}
        {r && meilleur && (
          <div className="mt-6">
            <p className="etiquette">Comparaison des régimes fiscaux (net après impôt / an)</p>
            <table className="mt-2 w-full text-xs">
              <tbody>
                {comparaison.map((c) => (
                  <tr key={c.regime} className={`filet ${c.regime === meilleur.regime ? "font-semibold" : ""}`}>
                    <td className="py-1.5 pr-2">
                      {c.regime === meilleur.regime && <span className="text-vertNet">★ </span>}
                      {c.libelle}
                    </td>
                    <td className="py-1.5 text-right font-tab">{euros(c.res.revenuNetApresImpot)} €</td>
                    <td className="py-1.5 pl-2 text-right font-tab text-griseNote">
                      {c.res.rendementNetNet.toFixed(2).replace(".", ",")} %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-griseNote">
              ★ Régime le plus avantageux avec vos chiffres. Le passage en meublé implique
              d'autres obligations (mobilier, déclaration, comptabilité en LMNP réel).
            </p>
          </div>
        )}
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {r ? (
            <>
              <p className="etiquette">Rendement net-net (après impôts)</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">{r.rendementNetNet.toFixed(2).replace(".", ",")} %</span>
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Rendement brut</dt>
                  <dd className="font-tab font-medium">{r.rendementBrut.toFixed(2).replace(".", ",")} %</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Rendement net de charges</dt>
                  <dd className="font-tab font-medium">{r.rendementNet.toFixed(2).replace(".", ",")} %</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Investissement total</dt>
                  <dd className="font-tab font-medium">{euros(r.investissementTotal)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Loyers encaissés / an</dt>
                  <dd className="font-tab font-medium">{euros(r.loyerAnnuelEncaisse)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Charges / an</dt>
                  <dd className="font-tab font-medium">− {euros(r.chargesTotales)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Impôts + prélèvements (17,2 %)</dt>
                  <dd className="font-tab font-medium">− {euros(r.impotTotal)} €</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Cash-flow mensuel</dt>
                  <dd className={`font-tab ${r.cashFlowMensuel >= 0 ? "text-vertNet" : "text-[#A3341F]"}`}>
                    {r.cashFlowMensuel >= 0 ? "+" : ""}{euros(r.cashFlowMensuel)} €
                  </dd>
                </div>
              </dl>

              <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
                {r.cashFlowMensuel >= 0
                  ? "✓ Opération autofinancée : les loyers couvrent le crédit et les charges."
                  : `⚠️ Effort d'épargne de ${euros(Math.abs(r.cashFlowMensuel))} € par mois à prévoir.`}
              </p>
            </>
          ) : (
            <p className="text-sm text-griseNote">Renseignez le prix et le loyer.</p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation {ANNEE}. Besoin des frais de notaire exacts ?{" "}
          <Link href="/immobilier/frais-notaire/" className="font-semibold text-marine hover:underline">
            Calculez-les ici
          </Link>. Ceci n'est pas un conseil en investissement.
        </p>
      </aside>
    </div>
  );
}
