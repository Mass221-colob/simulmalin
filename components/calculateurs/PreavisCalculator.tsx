"use client";

import { useMemo, useState } from "react";
import { calculerPreavis, type MotifRupture } from "@/lib/congesPreavis";
import { ANNEE } from "@/data/baremes2026";

export default function PreavisCalculator() {
  const [annees, setAnnees] = useState(3);
  const [mois, setMois] = useState(0);
  const [motif, setMotif] = useState<MotifRupture>("licenciement");
  const [cadre, setCadre] = useState(false);
  const [dateDebut, setDateDebut] = useState("");

  const ancienneteMois = annees * 12 + mois;
  const r = useMemo(() => calculerPreavis(ancienneteMois, motif, cadre), [ancienneteMois, motif, cadre]);

  const dateFin = useMemo(() => {
    if (!dateDebut || r.dureeMois === 0) return null;
    const d = new Date(dateDebut);
    if (isNaN(d.getTime())) return null;
    d.setMonth(d.getMonth() + r.dureeMois);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }, [dateDebut, r.dureeMois]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="motif" className="etiquette">Motif de la rupture</label>
            <select id="motif" value={motif} onChange={(e) => setMotif(e.target.value as MotifRupture)} className="champ">
              <option value="licenciement">Licenciement</option>
              <option value="demission">Démission</option>
              <option value="retraite">Départ volontaire à la retraite</option>
            </select>
          </div>

          <div>
            <label htmlFor="annees" className="etiquette">Ancienneté — années</label>
            <input id="annees" type="number" inputMode="numeric" min={0} max={50}
              value={annees} onChange={(e) => setAnnees(parseInt(e.target.value) || 0)} className="champ" />
          </div>

          <div>
            <label htmlFor="mois" className="etiquette">+ mois</label>
            <select id="mois" value={mois} onChange={(e) => setMois(parseInt(e.target.value))} className="champ">
              {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="etiquette">Date de notification (optionnel)</label>
            <input id="date" type="date" value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)} className="champ" />
          </div>

          <label className="flex items-center gap-2 self-end pb-2 text-sm text-encre/90">
            <input type="checkbox" checked={cadre} onChange={(e) => setCadre(e.target.checked)}
              className="h-4 w-4 accent-marine" />
            Statut cadre
          </label>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          <p className="etiquette">Durée de préavis</p>
          <p className="font-display text-4xl font-extrabold tracking-tight">
            <span className="surligne font-tab">{r.dureeTexte}</span>
          </p>

          {dateFin && (
            <p className="mt-4 rounded-md bg-papier p-3 text-sm text-encre/90">
              📅 Dernier jour travaillé estimé : <strong>{dateFin}</strong>
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-encre/90">{r.note}</p>

          {cadre && motif === "licenciement" && (
            <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
              ℹ️ En tant que cadre, votre convention collective prévoit très probablement 3 mois —
              vérifiez-la, elle prime sur le minimum légal affiché ici.
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Durées légales minimales {ANNEE}. La convention collective, l'accord d'entreprise ou le
          contrat de travail peuvent prévoir des durées plus longues et s'imposent alors.
        </p>
      </aside>
    </div>
  );
}
