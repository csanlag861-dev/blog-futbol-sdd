"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Article } from "@/lib/articles";

type SectionDraft = {
  heading: string;
  text: string;
};

type ArticleDraft = Omit<Article, "sections"> & {
  sections: SectionDraft[];
};

function newArticle(): ArticleDraft {
  return {
    slug: "",
    title: "",
    category: "",
    date: new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date()),
    readingTime: "5 min de lectura",
    excerpt: "",
    lead: "",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "",
    published: false,
    sections: [{ heading: "El artículo", text: "" }],
  };
}

function articleDraft(article: Article): ArticleDraft {
  return {
    ...article,
    sections: article.sections.map((section) => ({
      heading: section.heading,
      text: section.paragraphs.join("\n\n"),
    })),
  };
}

function makeSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function AdminPanel({ initialArticles }: { initialArticles: Article[] }) {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [draft, setDraft] = useState<ArticleDraft>(newArticle);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function startNewArticle() {
    setDraft(newArticle());
    setOriginalSlug(null);
    setMessage("");
    setError("");
  }

  function editArticle(article: Article) {
    setDraft(articleDraft(article));
    setOriginalSlug(article.slug);
    setMessage("");
    setError("");
  }

  function updateField(field: keyof Omit<ArticleDraft, "sections">, value: string | boolean) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateSection(index: number, field: keyof SectionDraft, value: string) {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section,
      ),
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);

    const article: Article = {
      ...draft,
      sections: draft.sections.map((section) => ({
        heading: section.heading,
        paragraphs: section.text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
      })),
    };

    try {
      const endpoint = originalSlug
        ? `/api/admin/articles/${encodeURIComponent(originalSlug)}`
        : "/api/admin/articles";
      const response = await fetch(endpoint, {
        method: originalSlug ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      const result = (await response.json()) as { article?: Article; error?: string };

      if (!response.ok || !result.article) {
        setError(result.error ?? "No se pudo guardar el artículo.");
        return;
      }

      setArticles((current) => {
        const remaining = current.filter((item) => item.slug !== originalSlug);
        return [result.article!, ...remaining];
      });
      setDraft(articleDraft(result.article));
      setOriginalSlug(result.article.slug);
      setMessage("Artículo guardado correctamente.");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) {
        setError("No se pudo cerrar la sesión. Inténtalo de nuevo.");
        return;
      }
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
    }
  }

  return (
    <main className="main-content admin-page">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Panel editorial</p>
          <h1>Artículos</h1>
          <p className="admin-intro">
            Crea y edita publicaciones. Los borradores solo aparecen en este panel.
          </p>
        </div>
        <button className="admin-button admin-button-secondary" onClick={handleLogout} type="button">
          Cerrar sesión
        </button>
      </div>

      <div className="admin-layout">
        <section className="admin-list-card" aria-labelledby="articles-list-title">
          <div className="admin-list-heading">
            <h2 id="articles-list-title">Todos los artículos</h2>
            <button className="admin-button" onClick={startNewArticle} type="button">
              Nuevo artículo
            </button>
          </div>
          {articles.length === 0 ? (
            <p className="admin-empty">Todavía no hay artículos.</p>
          ) : (
            <ul className="admin-article-list">
              {articles.map((article) => (
                <li className="admin-article-item" key={article.slug}>
                  <div>
                    <strong>{article.title}</strong>
                    <span className={`admin-status ${article.published ? "is-published" : "is-draft"}`}>
                      {article.published ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                  <button
                    className="admin-edit-button"
                    onClick={() => editArticle(article)}
                    type="button"
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-editor-card" aria-labelledby="editor-title">
          <h2 id="editor-title">{originalSlug ? "Editar artículo" : "Nuevo artículo"}</h2>
          <form className="admin-form" onSubmit={handleSave}>
            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Título</span>
                <input
                  onChange={(event) => {
                    const title = event.target.value;
                    setDraft((current) => ({
                      ...current,
                      title,
                      ...(originalSlug ? {} : { slug: makeSlug(title) }),
                    }));
                  }}
                  required
                  value={draft.title}
                />
              </label>
              <label className="admin-field">
                <span>Slug de la URL</span>
                <input
                  onChange={(event) => updateField("slug", event.target.value)}
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  readOnly={Boolean(originalSlug)}
                  required
                  value={draft.slug}
                />
                {originalSlug && (
                  <small>
                    El slug no se puede cambiar para conservar la URL del artículo.
                  </small>
                )}
              </label>
              <label className="admin-field">
                <span>Categoría</span>
                <input onChange={(event) => updateField("category", event.target.value)} required value={draft.category} />
              </label>
              <label className="admin-field">
                <span>Fecha</span>
                <input onChange={(event) => updateField("date", event.target.value)} required value={draft.date} />
              </label>
              <label className="admin-field">
                <span>Tiempo de lectura</span>
                <input onChange={(event) => updateField("readingTime", event.target.value)} required value={draft.readingTime} />
              </label>
              <label className="admin-field">
                <span>URL de imagen</span>
                <input onChange={(event) => updateField("image", event.target.value)} required value={draft.image} />
                <small>Usa una ruta local o una URL HTTPS directa a una imagen.</small>
              </label>
            </div>
            <label className="admin-field">
              <span>Texto alternativo de la imagen</span>
              <input onChange={(event) => updateField("imageAlt", event.target.value)} required value={draft.imageAlt} />
            </label>
            <label className="admin-field">
              <span>Extracto para la portada</span>
              <textarea onChange={(event) => updateField("excerpt", event.target.value)} required rows={2} value={draft.excerpt} />
            </label>
            <label className="admin-field">
              <span>Entradilla del artículo</span>
              <textarea onChange={(event) => updateField("lead", event.target.value)} required rows={3} value={draft.lead} />
            </label>

            <div className="admin-sections-heading">
              <h3>Contenido</h3>
              <button
                className="admin-edit-button"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    sections: [...current.sections, { heading: "", text: "" }],
                  }))
                }
                type="button"
              >
                Añadir sección
              </button>
            </div>
            {draft.sections.map((section, index) => (
              <fieldset className="admin-section-fields" key={index}>
                <legend>Sección {index + 1}</legend>
                <label className="admin-field">
                  <span>Subtítulo</span>
                  <input
                    onChange={(event) => updateSection(index, "heading", event.target.value)}
                    required
                    value={section.heading}
                  />
                </label>
                <label className="admin-field">
                  <span>Párrafos</span>
                  <textarea
                    onChange={(event) => updateSection(index, "text", event.target.value)}
                    placeholder="Escribe los párrafos y sepáralos con una línea en blanco."
                    required
                    rows={6}
                    value={section.text}
                  />
                </label>
                {draft.sections.length > 1 && (
                  <button
                    className="admin-edit-button admin-remove-button"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.filter((_, sectionIndex) => sectionIndex !== index),
                      }))
                    }
                    type="button"
                  >
                    Quitar sección
                  </button>
                )}
              </fieldset>
            ))}

            <label className="admin-publish-toggle">
              <input
                checked={draft.published}
                onChange={(event) => updateField("published", event.target.checked)}
                type="checkbox"
              />
              <span>Publicado</span>
              <small>Si está desactivado, el artículo no se mostrará a los visitantes.</small>
            </label>

            {error && <p className="admin-message admin-message-error" role="alert">{error}</p>}
            {message && <p className="admin-message admin-message-success" role="status">{message}</p>}
            <div className="admin-form-actions">
              <button className="admin-button" disabled={isSaving} type="submit">
                {isSaving ? "Guardando…" : "Guardar artículo"}
              </button>
              {originalSlug && draft.published && (
                <Link className="text-link" href={`/articulos/${originalSlug}`} target="_blank">
                  Ver artículo <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
