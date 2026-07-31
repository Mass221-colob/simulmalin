"use client";

import { useMemo, useState } from "react";
import Markdown from "markdown-to-jsx";
import type { ArticleMeta } from "@/lib/articles";

const CATEGORIES = ["Salaire", "Impôts", "Immobilier", "Emploi", "Auto-entrepreneur", "Épargne"];

interface Props {
  connecte: boolean;
  configOk: boolean;
  articles: ArticleMeta[];
}

type Vue = "liste" | "editeur";

export default function AdminClient({ connecte: connecteInitial, configOk, articles }: Props) {
  const [connecte, setConnecte] = useState(connecteInitial);
  const [mdp, setMdp] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const [vue, setVue] = useState<Vue>("liste");
  const [succes, setSucces] = useState("");

  // Champs de l'éditeur
  const [slug, setSlug] = useState("");
  const [titre, setTitre] = useState("");
  const [extrait, setExtrait] = useState("");
  const [categorie, setCategorie] = useState("Impôts");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [lectureMin, setLectureMin] = useState(5);
  const [contenu, setContenu] = useState("");
  const [apercu, setApercu] = useState(false);

  const motsEstimes = useMemo(() => contenu.trim().split(/\s+/).filter(Boolean).length, [contenu]);

  async function connexion() {
    setErreur("");
    setChargement(true);
    try {
      const r = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motDePasse: mdp }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.erreur || "Connexion refusée.");
      setConnecte(true);
      setMdp("");
    } catch (e: any) {
      setErreur(e.message);
    } finally {
      setChargement(false);
    }
  }

  async function deconnexion() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setConnecte(false);
  }

  function nouvelArticle() {
    setSlug(""); setTitre(""); setExtrait(""); setCategorie("Impôts");
    setDate(new Date().toISOString().slice(0, 10)); setLectureMin(5); setContenu("");
    setErreur(""); setSucces(""); setApercu(false); setVue("editeur");
  }

  async function publier() {
    setErreur(""); setSucces(""); setChargement(true);
    try {
      const r = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, titre, extrait, categorie, date, lectureMin, contenu }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.erreur || "Échec de la publication.");
      setSucces(
        `Article enregistré. Le site se met à jour automatiquement : il sera visible sur /blog/${j.slug}/ dans deux à trois minutes.`
      );
    } catch (e: any) {
      setErreur(e.message);
    } finally {
      setChargement(false);
    }
  }

  async function supprimer(s: string, t: string) {
    if (!confirm(`Supprimer définitivement « ${t} » ?`)) return;
    setErreur(""); setSucces(""); setChargement(true);
    try {
      const r = await fetch(`/api/admin/articles?slug=${encodeURIComponent(s)}`, { method: "DELETE" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.erreur || "Échec de la suppression.");
      setSucces("Article supprimé. Le site se met à jour dans deux à trois minutes.");
    } catch (e: any) {
      setErreur(e.message);
    } finally {
      setChargement(false);
    }
  }

  /* ---------- Écran de connexion ---------- */
  if (!connecte) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="font-display text-2xl font-extrabold">
          Espace <span className="surligne">rédaction</span>
        </h1>
        <p className="mt-2 text-sm text-griseNote">
          Accès réservé. Cette page n'est pas indexée par les moteurs de recherche.
        </p>

        <div className="mt-6 rounded-xl border border-ligne bg-white p-5 shadow-fiche">
          <label htmlFor="mdp" className="etiquette">Mot de passe</label>
          <input
            id="mdp" type="password" value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && connexion()}
            className="champ" autoComplete="current-password"
          />
          <button
            onClick={connexion} disabled={chargement || !mdp}
            className="mt-4 w-full rounded-lg bg-marine px-5 py-3 font-semibold text-white transition hover:bg-marineFonce disabled:opacity-50"
          >
            {chargement ? "Vérification…" : "Se connecter"}
          </button>
          {erreur && <p className="mt-3 text-sm font-semibold text-[#A3341F]">{erreur}</p>}
        </div>
      </div>
    );
  }

  /* ---------- Tableau de bord ---------- */
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">
          Espace <span className="surligne">rédaction</span>
        </h1>
        <div className="flex gap-2">
          {vue === "editeur" && (
            <button onClick={() => setVue("liste")}
              className="rounded-lg border border-ligne bg-white px-4 py-2 text-sm font-semibold transition hover:border-marine">
              ← Retour à la liste
            </button>
          )}
          <button onClick={deconnexion}
            className="rounded-lg border border-ligne bg-white px-4 py-2 text-sm font-semibold text-griseNote transition hover:border-marine hover:text-marine">
            Se déconnecter
          </button>
        </div>
      </div>

      {!configOk && (
        <p className="mt-4 rounded-lg border border-[#A3341F] bg-white p-4 text-sm text-[#A3341F]">
          ⚠️ Les variables GITHUB_TOKEN et GITHUB_REPO ne sont pas configurées sur Vercel : la
          publication échouera tant qu'elles ne sont pas renseignées.
        </p>
      )}
      {erreur && (
        <p className="mt-4 rounded-lg border border-ligne bg-white p-4 text-sm font-semibold text-[#A3341F]">{erreur}</p>
      )}
      {succes && (
        <p className="mt-4 rounded-lg border border-ligne bg-white p-4 text-sm font-semibold text-vertNet">{succes}</p>
      )}

      {vue === "liste" ? (
        <>
          <button onClick={nouvelArticle}
            className="mt-6 rounded-lg bg-marine px-5 py-3 font-semibold text-white transition hover:bg-marineFonce">
            + Nouvel article
          </button>

          <p className="etiquette mt-8">{articles.length} articles publiés</p>
          <div className="mt-2 divide-y divide-ligne rounded-xl border border-ligne bg-white shadow-fiche">
            {articles.map((a) => (
              <div key={a.slug} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{a.titre}</p>
                  <p className="text-xs text-griseNote">
                    {a.categorie} ·{" "}
                    {new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    {" · "}/blog/{a.slug}/
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <a href={`/blog/${a.slug}/`} target="_blank" rel="noreferrer"
                    className="rounded-md border border-ligne px-3 py-1.5 text-xs font-semibold transition hover:border-marine hover:text-marine">
                    Voir
                  </a>
                  <button onClick={() => supprimer(a.slug, a.titre)} disabled={chargement}
                    className="rounded-md border border-ligne px-3 py-1.5 text-xs font-semibold text-[#A3341F] transition hover:border-[#A3341F] disabled:opacity-50">
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-griseNote">
            Pour modifier un article existant, créez-en un nouveau en reprenant exactement son
            identifiant d'URL : le fichier sera remplacé.
          </p>
        </>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,320px]">
          <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
            <div className="grid gap-4">
              <div>
                <label htmlFor="t" className="etiquette">Titre de l'article</label>
                <input id="t" value={titre} onChange={(e) => setTitre(e.target.value)}
                  className="champ" placeholder="Ex. : Comprendre sa fiche de paie" />
              </div>

              <div>
                <label htmlFor="ex" className="etiquette">Extrait (affiché sur les cartes du blog)</label>
                <textarea id="ex" value={extrait} onChange={(e) => setExtrait(e.target.value)}
                  className="champ min-h-[70px] font-sans text-base" rows={2}
                  placeholder="Deux phrases qui donnent envie de lire." />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="c" className="etiquette mb-0">Contenu (format Markdown)</label>
                <button onClick={() => setApercu(!apercu)}
                  className="text-xs font-semibold text-marine hover:underline">
                  {apercu ? "Revenir à l'édition" : "Aperçu"}
                </button>
              </div>

              {apercu ? (
                <div className="min-h-[420px] space-y-4 rounded-md border border-ligne bg-papier p-4">
                  <Markdown options={{ overrides: {
                    h2: { props: { className: "font-display text-xl font-bold pt-2" } },
                    p: { props: { className: "leading-relaxed text-encre/90" } },
                    a: { props: { className: "font-semibold text-marine underline" } },
                    ul: { props: { className: "list-disc pl-5 space-y-1" } },
                  }}}>
                    {contenu || "*Rien à prévisualiser pour l'instant.*"}
                  </Markdown>
                </div>
              ) : (
                <textarea id="c" value={contenu} onChange={(e) => setContenu(e.target.value)}
                  className="champ min-h-[420px] font-sans text-base leading-relaxed"
                  placeholder={"Écrivez ici.\n\n## Un sous-titre\n\nUn paragraphe. Mettez en **gras** ce qui compte, et créez un lien vers un calculateur avec [ce texte](/salaire/brut-net/)."} />
              )}

              <p className="text-xs text-griseNote">
                {motsEstimes} mots · Mise en forme : <code>## Titre</code> pour un sous-titre,{" "}
                <code>**gras**</code>, <code>[texte](/lien/)</code> pour un lien interne.
              </p>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border border-ligne bg-white p-5 shadow-fiche">
              <div className="grid gap-4">
                <div>
                  <label htmlFor="cat" className="etiquette">Catégorie</label>
                  <select id="cat" value={categorie} onChange={(e) => setCategorie(e.target.value)} className="champ">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <p className="mt-1 text-xs text-griseNote">Détermine l'illustration de l'article.</p>
                </div>

                <div>
                  <label htmlFor="d" className="etiquette">Date de publication</label>
                  <input id="d" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="champ" />
                </div>

                <div>
                  <label htmlFor="lm" className="etiquette">Temps de lecture (minutes)</label>
                  <input id="lm" type="number" min={1} max={30} value={lectureMin}
                    onChange={(e) => setLectureMin(parseInt(e.target.value) || 5)} className="champ" />
                  <p className="mt-1 text-xs text-griseNote">
                    Environ {Math.max(1, Math.round(motsEstimes / 200))} min pour {motsEstimes} mots.
                  </p>
                </div>

                <div>
                  <label htmlFor="s" className="etiquette">Identifiant d'URL (optionnel)</label>
                  <input id="s" value={slug} onChange={(e) => setSlug(e.target.value)}
                    className="champ text-sm" placeholder="généré depuis le titre" />
                </div>
              </div>

              <button onClick={publier} disabled={chargement || !titre || !contenu}
                className="mt-5 w-full rounded-lg bg-marine px-5 py-3 font-semibold text-white transition hover:bg-marineFonce disabled:opacity-50">
                {chargement ? "Publication en cours…" : "Publier l'article"}
              </button>
            </div>

            <p className="text-xs text-griseNote">
              La publication enregistre l'article sur GitHub, ce qui déclenche automatiquement la
              mise à jour du site. Comptez deux à trois minutes avant qu'il soit visible en ligne.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
