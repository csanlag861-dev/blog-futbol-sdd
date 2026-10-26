import "server-only";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { articles as initialArticles, type Article } from "@/lib/articles";

type StoredArticle = Omit<
  Article,
  "published" | "sections" | "readingTime" | "imageAlt"
> & {
  reading_time: string;
  image_alt: string;
  published: number;
  sections: string;
};

const globalForDatabase = globalThis as typeof globalThis & {
  articleDatabase?: Database.Database;
};

function openDatabase() {
  if (globalForDatabase.articleDatabase) {
    return globalForDatabase.articleDatabase;
  }

  const directory = path.join(process.cwd(), "data");
  mkdirSync(directory, { recursive: true });

  const database = new Database(path.join(directory, "blog.sqlite"));
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      reading_time TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      lead TEXT NOT NULL,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      sections TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  const seed = database.transaction(() => {
    const hasSeeded = database
      .prepare("SELECT 1 FROM app_meta WHERE key = ?")
      .get("initial_articles");
    if (hasSeeded) return;

    const insert = database.prepare(`
      INSERT OR IGNORE INTO articles
        (slug, title, category, date, reading_time, excerpt, lead, image, image_alt, sections, published)
      VALUES
        (@slug, @title, @category, @date, @readingTime, @excerpt, @lead, @image, @imageAlt, @sections, @published)
    `);

    for (const article of initialArticles) {
      insert.run({
        ...article,
        readingTime: article.readingTime,
        imageAlt: article.imageAlt,
        sections: JSON.stringify(article.sections),
        published: Number(article.published),
      });
    }

    database
      .prepare("INSERT INTO app_meta (key, value) VALUES (?, ?)")
      .run("initial_articles", "done");
  });
  seed();

  globalForDatabase.articleDatabase = database;
  return database;
}

function fromRow(row: StoredArticle): Article {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    date: row.date,
    readingTime: row.reading_time,
    excerpt: row.excerpt,
    lead: row.lead,
    image: row.image,
    imageAlt: row.image_alt,
    sections: JSON.parse(row.sections) as Article["sections"],
    published: Boolean(row.published),
  };
}

export function getPublishedArticles() {
  const rows = openDatabase()
    .prepare("SELECT * FROM articles WHERE published = 1 ORDER BY rowid DESC")
    .all() as StoredArticle[];
  return rows.map(fromRow);
}

export function getAllArticles() {
  const rows = openDatabase()
    .prepare("SELECT * FROM articles ORDER BY rowid DESC")
    .all() as StoredArticle[];
  return rows.map(fromRow);
}

export function getPublishedArticle(slug: string) {
  const row = openDatabase()
    .prepare("SELECT * FROM articles WHERE slug = ? AND published = 1")
    .get(slug) as StoredArticle | undefined;
  return row ? fromRow(row) : undefined;
}

export class DuplicateArticleSlugError extends Error {}

export function createArticle(article: Article) {
  const database = openDatabase();
  const create = database.transaction(() => {
    const duplicate = database
      .prepare("SELECT 1 FROM articles WHERE slug = ?")
      .get(article.slug);
    if (duplicate) throw new DuplicateArticleSlugError();

    database.prepare(`
      INSERT INTO articles
        (slug, title, category, date, reading_time, excerpt, lead, image, image_alt, sections, published)
      VALUES
        (@slug, @title, @category, @date, @readingTime, @excerpt, @lead, @image, @imageAlt, @sections, @published)
    `).run({
      ...article,
      readingTime: article.readingTime,
      imageAlt: article.imageAlt,
      sections: JSON.stringify(article.sections),
      published: Number(article.published),
    });
  });

  create();
}

export function updateArticle(originalSlug: string, article: Article) {
  const database = openDatabase();
  const update = database.transaction(() => {
    const duplicate = database
      .prepare("SELECT 1 FROM articles WHERE slug = ? AND slug != ?")
      .get(article.slug, originalSlug);
    if (duplicate) throw new DuplicateArticleSlugError();

    const result = database
      .prepare(`
        UPDATE articles SET
          slug = @slug,
          title = @title,
          category = @category,
          date = @date,
          reading_time = @readingTime,
          excerpt = @excerpt,
          lead = @lead,
          image = @image,
          image_alt = @imageAlt,
          sections = @sections,
          published = @published
        WHERE slug = @originalSlug
      `)
      .run({
        ...article,
        originalSlug,
        readingTime: article.readingTime,
        imageAlt: article.imageAlt,
        sections: JSON.stringify(article.sections),
        published: Number(article.published),
      });

    return result.changes > 0;
  });

  return update();
}
