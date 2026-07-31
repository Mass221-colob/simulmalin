import type { MetadataRoute } from "next";
import { DEPARTEMENTS } from "@/data/departements";
import { metasArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://simulmalin.net";
  const statiques = ["", "/salaire/brut-net", "/impots", "/impots/impot-revenu", "/immobilier/frais-notaire", "/immobilier/pret-immobilier", "/immobilier/rendement-locatif", "/immobilier/plus-value", "/immobilier/ptz", "/emploi/pension-alimentaire", "/epargne/credit-consommation", "/emploi/indemnite-licenciement", "/emploi/allocation-chomage", "/emploi/conges-payes", "/emploi/preavis", "/emploi/prime-activite", "/emploi/retraite", "/entrepreneur/charges-auto-entrepreneur", "/epargne", "/epargne/interets-composes", "/entrepreneur/tva", "/blog", "/immobilier", "/emploi", "/entrepreneur", "/a-propos", "/contact"].map((p) => ({
    url: `${base}${p}/`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const programmatiques: MetadataRoute.Sitemap = [];
  for (let m = 1500; m <= 10000; m += 100) {
    programmatiques.push({
      url: `${base}/salaire/brut-net/${m}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (let r = 15000; r <= 60000; r += 1000) {
    programmatiques.push({
      url: `${base}/impots/impot-revenu/${r}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (let r = 65000; r <= 100000; r += 5000) {
    programmatiques.push({
      url: `${base}/impots/impot-revenu/${r}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  const combinaisonsPret: string[] = [];
  for (let m = 100000; m <= 500000; m += 50000) {
    for (const d of [10, 15, 20, 25]) combinaisonsPret.push(`${m}-sur-${d}-ans`);
  }
  for (const m of [120000, 180000, 220000, 280000]) {
    for (const d of [20, 25]) combinaisonsPret.push(`${m}-sur-${d}-ans`);
  }
  for (const slug of combinaisonsPret) {
    programmatiques.push({
      url: `${base}/immobilier/pret-immobilier/${slug}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (let a = 2; a <= 30; a++) {
    programmatiques.push({
      url: `${base}/emploi/indemnite-licenciement/${a}-ans/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (let c = 10000; c <= 90000; c += 5000) {
    programmatiques.push({
      url: `${base}/entrepreneur/charges-auto-entrepreneur/${c}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (let s = 1500; s <= 6000; s += 250) {
    programmatiques.push({
      url: `${base}/emploi/allocation-chomage/${s}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (const d of DEPARTEMENTS) {
    programmatiques.push({
      url: `${base}/immobilier/frais-notaire/${d.slug}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (const a of metasArticles()) {
    programmatiques.push({
      url: `${base}/blog/${a.slug}/`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return [...statiques, ...programmatiques];
}
