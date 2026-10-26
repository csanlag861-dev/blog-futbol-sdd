import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/database";
import { shouldOptimizeImage } from "@/lib/image-source";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const articles = getPublishedArticles();

  return (
    <main className="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Fútbol, más allá del resultado</p>
        <h1 id="hero-title">
          Historias que
          <br />
          <span>nacen en el césped.</span>
        </h1>
        <p className="hero-description">
          Un espacio para leer, pensar y disfrutar todo lo que hace del fútbol
          algo único.
        </p>
        <Link className="hero-link" href="/acerca-de">
          Conoce el proyecto <span aria-hidden="true">→</span>
        </Link>
        <div className="hero-ball" aria-hidden="true">
          <span />
        </div>
      </section>
      <section className="stories-section" aria-labelledby="stories-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">La revista</p>
            <h2 id="stories-title">Historias para disfrutar el juego</h2>
          </div>
          <span className="section-index" aria-hidden="true">
            {String(articles.length).padStart(2, "0")} /{" "}
            {String(articles.length).padStart(2, "0")}
          </span>
        </div>
        <div className="article-grid">
          {articles.map((article) => (
            <Link
              className="story-card"
              href={`/articulos/${article.slug}`}
              key={article.slug}
            >
              <div className="story-card-image">
                <Image
                  alt={article.imageAlt}
                  className="story-card-photo"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  src={article.image}
                  unoptimized={!shouldOptimizeImage(article.image)}
                />
              </div>
              <div className="story-card-content">
                <div className="story-card-meta">
                  <span>{article.category}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="story-card-link">
                  Leer artículo <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
