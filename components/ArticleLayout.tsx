import Link from "next/link";
import type { ArticleMeta } from "@/data/articles";
import { ARTICLES } from "@/data/articles";
import { IllustrationArticle, VignetteArticle } from "@/components/IllustrationsBlog";

export default function ArticleLayout({
  meta,
  children,
}: {
  meta: ArticleMeta;
  children: React.ReactNode;
}) {
  const dateFr = new Date(meta.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const autres = ARTICLES.filter((a) => a.slug !== meta.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.titre,
    datePublished: meta.date,
    dateModified: meta.date,
    author: { "@type": "Organization", name: "SimulMalin" },
    publisher: { "@type": "Organization", name: "SimulMalin" },
    description: meta.extrait,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/blog/" className="hover:text-marine">Blog</Link>
      </nav>

      <p className="etiquette">{meta.categorie} · {dateFr} · {meta.lectureMin} min de lecture</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {meta.titre}
      </h1>

      <IllustrationArticle categorie={meta.categorie} className="mt-6" />

      <article className="article-corps mt-8 space-y-5 leading-relaxed text-encre/90">
        {children}
      </article>

      <div className="mt-12 rounded-xl border border-ligne bg-white p-5 shadow-fiche">
        <p className="font-display font-bold">À lire ensuite</p>
        <ul className="mt-3 space-y-2 text-sm">
          {autres.map((a) => (
            <li key={a.slug}>
              <Link href={`/blog/${a.slug}/`} className="group flex items-center gap-3">
                <span className="h-12 w-20 shrink-0 overflow-hidden rounded-md border border-ligne">
                  <VignetteArticle categorie={a.categorie} />
                </span>
                <span className="text-marine group-hover:underline">{a.titre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-xs text-griseNote">
        Publié le {dateFr}. Contenu informatif ne constituant ni un conseil juridique, ni un
        conseil fiscal ou financier personnalisé.
      </p>
    </div>
  );
}
