import { cookies } from "next/headers";
import { createHash } from "crypto";

const NOM_COOKIE = "sm_admin";

function jeton() {
  const mdp = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(`simulmalin:${mdp}`).digest("hex");
}

export function motDePasseValide(saisi: string) {
  const attendu = process.env.ADMIN_PASSWORD;
  if (!attendu) return false;
  return saisi === attendu;
}

export function creerSession() {
  cookies().set(NOM_COOKIE, jeton(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 heures
  });
}

export function detruireSession() {
  cookies().delete(NOM_COOKIE);
}

export function sessionValide() {
  if (!process.env.ADMIN_PASSWORD) return false;
  return cookies().get(NOM_COOKIE)?.value === jeton();
}
