import { NextResponse } from "next/server";
import { motDePasseValide, creerSession, detruireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { motDePasse } = await req.json().catch(() => ({ motDePasse: "" }));
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { erreur: "Aucun mot de passe administrateur n'est configuré sur le serveur." },
      { status: 500 }
    );
  }
  if (!motDePasseValide(String(motDePasse || ""))) {
    return NextResponse.json({ erreur: "Mot de passe incorrect." }, { status: 401 });
  }
  creerSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  detruireSession();
  return NextResponse.json({ ok: true });
}
