import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";
import { tousLesArticles, articleParSlug } from "@/lib/articles";
import { IllustrationArticle, VignetteArticle } from "@/components/IllustrationsBlog";

export function generateStaticParams() {
  return tousLesArticles().map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articleParSlug(params.slug);
  if (!a) return {};
  return {
    title: a.titre,
    description: a.extrait,
    alternates: { canonical: `/blog/${a.slug}/` },
  };
}

const options = {
  overrides: {
    h2: { props: { className: "font-display text-2xl font-bold pt-2" } },
    h3: { props: { className: "font-display text-xl font-bold pt-2" } },
    p: { props: { className: "leading-relaxed text-encre/90" } },
    ul: { props: { className: "list-disc space-y-2 pl-5 leading-relaxed text-encre/90" } },
    ol: { props: { className: "list-decimal space-y-2 pl-5 leading-relaxed text-encre/90" } },
    a: { props: { className: "font-semibold text-marine hover:underline" } },
    strong: { props: { className: "font-semibold" } },
    blockquote: {
      props: { className: "border-l-4 border-fluo pl-4 italic text-encre/80" },
    },
  },
};

export default function Page({ params }: { params: { slug: string } }) {
  const a = articleParSlug(params.slug);
  if (!a) notFound();

  const dateFr = new Date(a.date).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
  const autres = tousLesArticles().filter((x) => x.slug !== a.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titre,
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Organization", name: "SimulMalin" },
    publisher: { "@type": "Organization", name: "SimulMalin" },
    description: a.extrait,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-griseNote">
        <Link href="/" className="hover:text-marine">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/blog/" className="hover:text-marine">Blog</Link>
      </nav>

      <p className="etiquette">{a.categorie} · {dateFr} · {a.lectureMin} min de lecture</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {a.titre}
      </h1>

      <IllustrationArticle categorie={a.categorie} className="mt-6" />

      <article className="mt-8 space-y-5">
        <Markdown options={options}>{a.contenu}</Markdown>
      </article>

      <div className="mt-12 rounded-xl border border-ligne bg-white p-5 shadow-fiche">
        <p className="font-display font-bold">À lire ensuite</p>
        <ul className="mt-3 space-y-3 text-sm">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`/blog/${x.slug}/`} className="group flex items-center gap-3">
                <span className="h-12 w-20 shrink-0 overflow-hidden rounded-md border border-ligne">
                  <VignetteArticle categorie={x.categorie} />
                </span>
                <span className="text-marine group-hover:underline">{x.titre}</span>
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
