"use client";

import { useMemo, useState } from "react";
import { calculerEpargne } from "@/lib/epargne";
import { euros } from "@/lib/brutNet";
import { ANNEE, EPARGNE } from "@/data/baremes2026";

const SUPPORTS = [
  { cle: "livretA", nom: "Livret A / LDDS", taux: EPARGNE.livretA.taux, fiscalite: 0, note: "Défiscalisé, plafonné, disponible" },
  { cle: "lep", nom: "LEP (sous conditions de revenus)", taux: EPARGNE.lep.taux, fiscalite: 0, note: "Défiscalisé, le mieux rémunéré" },
  { cle: "av-fonds-euros", nom: "Assurance-vie fonds euros", taux: 2.5, fiscalite: EPARGNE.fiscaliteAssuranceVie, note: "Capital garanti, prélèvements sociaux" },
  { cle: "av-uc", nom: "Assurance-vie unités de compte", taux: 5, fiscalite: EPARGNE.fiscaliteAssuranceVie, note: "Risque de perte en capital" },
  { cle: "bourse", nom: "PEA / actions (historique long terme)", taux: 7, fiscalite: EPARGNE.fiscaliteAssuranceVie, note: "Volatil, horizon 8 ans minimum" },
  { cle: "perso", nom: "Personnalisé", taux: 4, fiscalite: EPARGNE.flatTax, note: "" },
];

export default function EpargneCalculator() {
  const [initial, setInitial] = useState(1000);
  const [mensuel, setMensuel] = useState(200);
  const [annees, setAnnees] = useState(20);
  const [support, setSupport] = useState("av-fonds-euros");
  const [taux, setTaux] = useState(2.5);
  const [fiscalite, setFiscalite] = useState(EPARGNE.fiscaliteAssuranceVie);

  const changerSupport = (cle: string) => {
    setSupport(cle);
    const s = SUPPORTS.find((x) => x.cle === cle)!;
    setTaux(s.taux);
    setFiscalite(s.fiscalite);
  };

  const r = useMemo(
    () => calculerEpargne(initial, mensuel, taux, annees, fiscalite),
    [initial, mensuel, taux, annees, fiscalite]
  );

  const supportActif = SUPPORTS.find((s) => s.cle === support)!;

  // Graphique SVG
  const W = 560, H = 200, P = 4;
  const max = Math.max(...r.courbe.map((c) => c.total), 1);
  const x = (i: number) => (i / (r.courbe.length - 1)) * (W - P * 2) + P;
  const y = (v: number) => H - P - (v / max) * (H - P * 2);
  const aireTotal = `M ${x(0)},${y(r.courbe[0].total)} ` +
    r.courbe.map((c, i) => `L ${x(i)},${y(c.total)}`).join(" ") +
    ` L ${x(r.courbe.length - 1)},${H - P} L ${x(0)},${H - P} Z`;
  const aireVerse = `M ${x(0)},${y(r.courbe[0].verse)} ` +
    r.courbe.map((c, i) => `L ${x(i)},${y(c.verse)}`).join(" ") +
    ` L ${x(r.courbe.length - 1)},${H - P} L ${x(0)},${H - P} Z`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="initial" className="etiquette">Capital de départ</label>
            <div className="relative">
              <input id="initial" type="number" inputMode="decimal" min={0} step={100}
                value={initial || ""} onChange={(e) => setInitial(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <label htmlFor="mensuel" className="etiquette">Versement mensuel</label>
            <div className="relative">
              <input id="mensuel" type="number" inputMode="decimal" min={0} step={25}
                value={mensuel || ""} onChange={(e) => setMensuel(parseFloat(e.target.value) || 0)}
                className="champ pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="support" className="etiquette">Support d'épargne</label>
            <select id="support" value={support} onChange={(e) => changerSupport(e.target.value)} className="champ">
              {SUPPORTS.map((s) => (
                <option key={s.cle} value={s.cle}>{s.nom}</option>
              ))}
            </select>
            {supportActif.note && (
              <p className="mt-1 text-xs text-griseNote">{supportActif.note}</p>
            )}
          </div>

          <div>
            <label htmlFor="annees" className="etiquette">
              Durée : <span className="font-tab text-encre">{annees} ans</span>
            </label>
            <input id="annees" type="range" min={1} max={40} step={1} value={annees}
              onChange={(e) => setAnnees(parseInt(e.target.value))} className="mt-3 w-full accent-marine" />
          </div>

          <div>
            <label htmlFor="taux" className="etiquette">Rendement annuel (%)</label>
            <input id="taux" type="number" inputMode="decimal" min={0} max={20} step={0.1}
              value={taux} onChange={(e) => setTaux(parseFloat(e.target.value) || 0)} className="champ" />
          </div>
        </div>

        {/* ---- Graphique ---- */}
        <div className="mt-6">
          <p className="etiquette">Croissance du capital</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img"
            aria-label={`Évolution du capital sur ${annees} ans`}>
            <path d={aireTotal} fill="#20356B" opacity="0.85" />
            <path d={aireVerse} fill="#9AA3B8" opacity="0.9" />
          </svg>
          <ul className="mt-2 flex flex-wrap gap-4 text-xs">
            <li className="flex items-center gap-2 text-griseNote">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#9AA3B8]" /> Vos versements
            </li>
            <li className="flex items-center gap-2 text-griseNote">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#20356B]" /> Intérêts générés
            </li>
          </ul>
        </div>

        {/* ---- Jalons ---- */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-griseNote">
                <th className="filet py-1.5 font-medium">Année</th>
                <th className="filet py-1.5 text-right font-medium">Versé</th>
                <th className="filet py-1.5 text-right font-medium">Intérêts</th>
                <th className="filet py-1.5 text-right font-medium">Capital</th>
              </tr>
            </thead>
            <tbody>
              {r.courbe
                .filter((c) => c.annee > 0 && (c.annee % 5 === 0 || c.annee === annees))
                .map((c) => (
                  <tr key={c.annee} className="filet">
                    <td className="py-1.5 font-tab">{c.annee}</td>
                    <td className="py-1.5 text-right font-tab">{euros(c.verse)} €</td>
                    <td className="py-1.5 text-right font-tab text-marine">{euros(c.interets)} €</td>
                    <td className="py-1.5 text-right font-tab font-semibold">{euros(c.total)} €</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Capital après {annees} ans</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">{euros(r.capitalFinal)} €</span>
          </p>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Total versé</dt>
              <dd className="font-tab font-medium">{euros(r.totalVerse)} €</dd>
            </div>
            <div className="filet flex justify-between pb-2.5">
              <dt className="text-griseNote">Intérêts générés</dt>
              <dd className="font-tab font-medium text-marine">+ {euros(r.totalInterets)} €</dd>
            </div>
            {fiscalite > 0 && (
              <>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Fiscalité ({fiscalite} % des gains)</dt>
                  <dd className="font-tab font-medium">− {euros(r.impots)} €</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Capital net estimé</dt>
                  <dd className="font-tab text-vertNet">{euros(r.capitalFinalNet)} €</dd>
                </div>
              </>
            )}
          </dl>

          <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
            💡 Les intérêts représentent{" "}
            <strong>{r.capitalFinal > 0 ? ((r.totalInterets / r.capitalFinal) * 100).toFixed(0) : 0} %</strong>{" "}
            de votre capital final. Chaque année supplémentaire accélère l'effet — c'est toute la
            puissance des intérêts composés.
          </p>
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Simulation {ANNEE} à rendement constant. Les performances passées ne préjugent pas des
          performances futures. Ceci n'est pas un conseil en investissement.
        </p>
      </aside>
    </div>
  );
}
