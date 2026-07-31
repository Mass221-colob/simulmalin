import type { Metadata } from "next";
import AdminClient from "@/components/AdminClient";
import { metasArticles } from "@/lib/articles";
import { sessionValide } from "@/lib/auth";
import { configurationOk } from "@/lib/github";

export const metadata: Metadata = {
  title: "Espace rédaction",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <AdminClient
      connecte={sessionValide()}
      configOk={configurationOk()}
      articles={metasArticles()}
    />
  );
}
