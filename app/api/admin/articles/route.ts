import { NextResponse } from "next/server";
import { sessionValide } from "@/lib/auth";
import { ecrireFichier, supprimerFichier, configurationOk } from "@/lib/github";

export const dynamic = "force-dynamic";

function slugifier(titre: string) {
  return titre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function echapper(v: string) {
  return String(v).replace(/"/g, "'").replace(/\n/g, " ").trim();
}

export async function POST(req: Request) {
  if (!sessionValide()) {
    return NextResponse.json({ erreur: "Session expirée. Reconnectez-vous." }, { status: 401 });
  }
  if (!configurationOk()) {
    return NextResponse.json(
      { erreur: "GITHUB_TOKEN ou GITHUB_REPO n'est pas configuré sur Vercel." },
      { status: 500 }
    );
  }

  const b = await req.json().catch(() => null);
  if (!b?.titre || !b?.contenu) {
    return NextResponse.json({ erreur: "Le titre et le contenu sont obligatoires." }, { status: 400 });
  }

  const slug: string = b.slug?.trim() || slugifier(b.titre);
  const md = `---
titre: "${echapper(b.titre)}"
extrait: "${echapper(b.extrait || "")}"
date: "${b.date || new Date().toISOString().slice(0, 10)}"
categorie: "${echapper(b.categorie || "Impôts")}"
lectureMin: ${Number(b.lectureMin) || 5}
---

${String(b.contenu).trim()}
`;

  try {
    await ecrireFichier(
      `content/articles/${slug}.md`,
      md,
      `Article : ${echapper(b.titre).slice(0, 60)}`
    );
    return NextResponse.json({ ok: true, slug });
  } catch (e: any) {
    return NextResponse.json({ erreur: e?.message || "Échec de la publication." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!sessionValide()) {
    return NextResponse.json({ erreur: "Session expirée." }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ erreur: "Slug manquant." }, { status: 400 });

  try {
    await supprimerFichier(`content/articles/${slug}.md`, `Suppression : ${slug}`);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ erreur: e?.message || "Échec de la suppression." }, { status: 500 });
  }
}
