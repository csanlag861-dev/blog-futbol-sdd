import type { Article } from "@/lib/articles";

type ArticleValidation =
  | { ok: true; article: Article }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function isAllowedImage(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return true;

  try {
    const imageUrl = new URL(value);
    return (
      imageUrl.protocol === "https:" &&
      imageUrl.hostname !== "" &&
      imageUrl.username === "" &&
      imageUrl.password === ""
    );
  } catch {
    return false;
  }
}

export function validateArticle(value: unknown): ArticleValidation {
  if (!isRecord(value)) {
    return { ok: false, error: "Los datos del artículo no tienen un formato válido." };
  }

  const textFields = [
    ["slug", 120],
    ["title", 160],
    ["category", 80],
    ["date", 80],
    ["readingTime", 40],
    ["excerpt", 300],
    ["lead", 600],
    ["image", 2048],
    ["imageAlt", 200],
  ] as const;

  for (const [field, maxLength] of textFields) {
    if (!isText(value[field], maxLength)) {
      return {
        ok: false,
        error: `El campo «${field}» es obligatorio y no puede superar ${maxLength} caracteres.`,
      };
    }
  }

  if (
    typeof value.slug !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug)
  ) {
    return { ok: false, error: "El slug solo puede contener letras minúsculas, números y guiones." };
  }

  if (typeof value.image !== "string" || !isAllowedImage(value.image)) {
    return {
      ok: false,
      error: "La imagen debe ser una ruta local o una URL HTTPS válida, sin credenciales.",
    };
  }

  if (typeof value.published !== "boolean") {
    return { ok: false, error: "Indica si el artículo está publicado." };
  }

  if (!Array.isArray(value.sections) || value.sections.length === 0 || value.sections.length > 12) {
    return { ok: false, error: "El artículo debe tener entre 1 y 12 secciones." };
  }

  const sections: Article["sections"] = [];
  for (const section of value.sections) {
    if (
      !isRecord(section) ||
      !isText(section.heading, 120) ||
      !Array.isArray(section.paragraphs) ||
      section.paragraphs.length === 0 ||
      section.paragraphs.length > 50 ||
      !section.paragraphs.every((paragraph) => isText(paragraph, 5000))
    ) {
      return {
        ok: false,
        error: "Cada sección necesita un título y al menos un párrafo válido.",
      };
    }

    sections.push({
      heading: section.heading as string,
      paragraphs: section.paragraphs as string[],
    });
  }

  return {
    ok: true,
    article: {
      slug: value.slug as string,
      title: value.title as string,
      category: value.category as string,
      date: value.date as string,
      readingTime: value.readingTime as string,
      excerpt: value.excerpt as string,
      lead: value.lead as string,
      image: value.image as string,
      imageAlt: value.imageAlt as string,
      sections,
      published: value.published as boolean,
    },
  };
}
