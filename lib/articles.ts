import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMeta {
  slug: string;
  titre: string;
  extrait: string;
  date: string;
  categorie: string;
  lectureMin: number;
}

export interface Article extends ArticleMeta {
  contenu: string; // corps en Markdown
}

const DOSSIER = path.join(process.cwd(), "content/articles");

/** Tous les articles, triés du plus récent au plus ancien. */
export function tousLesArticles(): Article[] {
  if (!fs.existsSync(DOSSIER)) return [];
  return fs
    .readdirSync(DOSSIER)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const brut = fs.readFileSync(path.join(DOSSIER, f), "utf-8");
      const { data, content } = matter(brut);
      return {
        slug: f.replace(/\.md$/, ""),
        titre: String(data.titre ?? "Sans titre"),
        extrait: String(data.extrait ?? ""),
        date: String(data.date ?? "2026-01-01"),
        categorie: String(data.categorie ?? "Impôts"),
        lectureMin: Number(data.lectureMin ?? 5),
        contenu: content.trim(),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function articleParSlug(slug: string): Article | undefined {
  return tousLesArticles().find((a) => a.slug === slug);
}

export function metasArticles(): ArticleMeta[] {
  return tousLesArticles().map(({ contenu, ...m }) => m);
}

export const CATEGORIES = [
  "Salaire",
  "Impôts",
  "Immobilier",
  "Emploi",
  "Auto-entrepreneur",
  "Épargne",
] as const;
