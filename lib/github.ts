/**
 * Écriture des articles sur GitHub via l'API REST.
 * Le token n'est jamais exposé au navigateur : tout passe par les routes API serveur.
 */

const API = "https://api.github.com";

function config() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // format : proprietaire/depot
  const branche = process.env.GITHUB_BRANCHE || "main";
  if (!token || !repo) {
    throw new Error(
      "Configuration manquante : définissez GITHUB_TOKEN et GITHUB_REPO dans les variables d'environnement."
    );
  }
  return { token, repo, branche };
}

async function appel(chemin: string, options: RequestInit = {}) {
  const { token } = config();
  const r = await fetch(`${API}${chemin}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  if (!r.ok && r.status !== 404) {
    const detail = await r.text();
    throw new Error(`GitHub ${r.status} : ${detail.slice(0, 200)}`);
  }
  return r;
}

/** Encode en base64 en préservant l'UTF-8 (accents). */
function enBase64(texte: string) {
  return Buffer.from(texte, "utf-8").toString("base64");
}

/** Récupère le SHA du fichier s'il existe déjà (nécessaire pour une mise à jour). */
async function shaExistant(chemin: string): Promise<string | undefined> {
  const { repo, branche } = config();
  const r = await appel(`/repos/${repo}/contents/${chemin}?ref=${branche}`);
  if (r.status === 404) return undefined;
  const j = await r.json();
  return j.sha as string;
}

/** Crée ou met à jour un fichier, puis déclenche le redéploiement Vercel. */
export async function ecrireFichier(chemin: string, contenu: string, message: string) {
  const { repo, branche } = config();
  const sha = await shaExistant(chemin);
  const r = await appel(`/repos/${repo}/contents/${chemin}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: enBase64(contenu),
      branch: branche,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!r.ok) throw new Error("Écriture refusée par GitHub.");
  return r.json();
}

/** Supprime un fichier du dépôt. */
export async function supprimerFichier(chemin: string, message: string) {
  const { repo, branche } = config();
  const sha = await shaExistant(chemin);
  if (!sha) throw new Error("Fichier introuvable sur GitHub.");
  const r = await appel(`/repos/${repo}/contents/${chemin}`, {
    method: "DELETE",
    body: JSON.stringify({ message, sha, branch: branche }),
  });
  if (!r.ok) throw new Error("Suppression refusée par GitHub.");
  return r.json();
}

/** Vérifie que la configuration est complète (sans exposer le token). */
export function configurationOk() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}
