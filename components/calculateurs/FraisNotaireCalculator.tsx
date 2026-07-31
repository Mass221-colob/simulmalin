"use client";

import { useMemo, useState } from "react";
import { calculerFraisNotaire, type TypeBien } from "@/lib/fraisNotaire";
import { euros } from "@/lib/brutNet";
import { DEPARTEMENTS } from "@/data/departements";
import { ANNEE } from "@/data/baremes2026";

export default function FraisNotaireCalculator({
  prixInitial = 250000,
  codeDepartementInitial = "75",
}: {
  prixInitial?: number;
  codeDepartementInitial?: string;
}) {
  const [prix, setPrix] = useState<number>(prixInitial);
  const [type, setType] = useState<TypeBien>("ancien");
  const [codeDep, setCodeDep] = useState<string>(codeDepartementInitial);

  const departement = DEPARTEMENTS.find((d) => d.code === codeDep) ?? DEPARTEMENTS[0];

  const resultat = useMemo(() => {
    if (!prix || prix <= 0) return null;
    return calculerFraisNotaire(prix, type, departement.dmto);
  }, [prix, type, departement]);

  const segments = resultat
    ? [
        { label: "Droits de mutation (État & collectivités)", montant: resultat.droitsMutation, couleur: "#20356B" },
        { label: "Émoluments du notaire (HT)", montant: resultat.emolumentsHT, couleur: "#5A7BC4" },
        { label: "TVA sur émoluments", montant: resultat.tvaEmoluments, couleur: "#9AA3B8" },
        { label: "Débours et formalités", montant: resultat.debours, couleur: "#C2801B" },
        { label: "Contribution de sécurité immobilière", montant: resultat.csi, couleur: "#A3341F" },
      ]
    : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* ---- Formulaire ---- */}
      <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="prix" className="etiquette">Prix d'achat du bien</label>
            <div className="relative">
              <input
                id="prix"
                type="number"
                inputMode="decimal"
                min={0}
                step={1000}
                value={prix || ""}
                onChange={(e) => setPrix(parseFloat(e.target.value) || 0)}
                className="champ pr-10"
                placeholder="250 000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-tab text-griseNote">€</span>
            </div>
          </div>

          <div>
            <span className="etiquette">Type de bien</span>
            <div className="inline-flex w-full rounded-lg border border-ligne p-1 text-sm font-semibold">
              <button
                onClick={() => setType("ancien")}
                className={`flex-1 rounded-md px-4 py-2 transition ${
                  type === "ancien" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
                }`}
              >
                Ancien
              </button>
              <button
                onClick={() => setType("neuf")}
                className={`flex-1 rounded-md px-4 py-2 transition ${
                  type === "neuf" ? "bg-marine text-white" : "text-griseNote hover:text-encre"
                }`}
              >
                Neuf
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="dep" className="etiquette">Département</label>
            <select
              id="dep"
              value={codeDep}
              onChange={(e) => setCodeDep(e.target.value)}
              className="champ"
              disabled={type === "neuf"}
            >
              {DEPARTEMENTS.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} — {d.nom}
                </option>
              ))}
            </select>
            {type === "neuf" && (
              <p className="mt-1 text-xs text-griseNote">
                Dans le neuf, le taux est identique dans toute la France.
              </p>
            )}
          </div>
        </div>

        {/* ---- Répartition visuelle ---- */}
        {resultat && (
          <div className="mt-6">
            <p className="etiquette">Où va votre argent</p>
            <div className="flex h-9 w-full overflow-hidden rounded-md" role="img"
              aria-label="Répartition des frais de notaire">
              {segments.map((s) => (
                <div
                  key={s.label}
                  style={{ width: `${(s.montant / resultat.total) * 100}%`, background: s.couleur }}
                  title={`${s.label} : ${euros(s.montant)} €`}
                />
              ))}
            </div>
            <ul className="mt-3 space-y-1.5 text-xs">
              {segments.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-griseNote">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.couleur }} />
                    {s.label}
                  </span>
                  <span className="font-tab font-medium">{euros(s.montant)} €</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-md bg-papier p-3 text-xs text-encre/80">
              💡 Contrairement à leur nom, l'essentiel des « frais de notaire » ne revient pas au
              notaire : ce sont des impôts versés à l'État et aux collectivités.
            </p>
          </div>
        )}
      </div>

      {/* ---- Résultat ---- */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche sm:p-6">
          {resultat ? (
            <>
              <p className="etiquette">Frais de notaire estimés ({type})</p>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                <span className="surligne font-tab">{euros(resultat.total)} €</span>
              </p>
              <p className="mt-1 text-sm text-griseNote">
                soit {resultat.pourcentage.toFixed(2)} % du prix d'achat
              </p>

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Prix du bien</dt>
                  <dd className="font-tab font-medium">{euros(resultat.prix)} €</dd>
                </div>
                <div className="filet flex justify-between pb-2.5">
                  <dt className="text-griseNote">Taux de droits appliqué</dt>
                  <dd className="font-tab font-medium">{resultat.tauxDroits.toFixed(2)} %</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Coût total de l'acquisition</dt>
                  <dd className="font-tab">{euros(resultat.prix + resultat.total)} €</dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="text-sm text-griseNote">
              Saisissez le prix du bien pour voir l'estimation.
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-griseNote">
          Estimation {ANNEE} hors cas particuliers (négociation des émoluments au-delà de
          150 000 €, exonérations locales). Le décompte exact est établi par votre notaire.
        </p>
      </aside>
    </div>
  );
}
