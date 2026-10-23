import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="main-content article-page">
      <Link className="article-back text-link" href="/">
        <span aria-hidden="true">←</span> Volver a los artículos
      </Link>
      <article>
        <header className="article-header">
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="article-lead">{article.lead}</p>
          <div className="article-byline">
            <span>Redacción</span>
            <span aria-hidden="true">·</span>
            <time>{article.date}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>
        </header>
        <div className="article-cover">
          <Image
            alt={article.imageAlt}
            className="article-cover-image"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 860px"
            src={article.image}
          />
        </div>
        <div className="article-body">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
