import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  DuplicateArticleSlugError,
  updateArticle,
} from "@/lib/database";
import { validateArticle } from "@/lib/validate-article";

type ArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function PUT(request: Request, { params }: ArticleRouteProps) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "La solicitud no tiene un formato válido." }, { status: 400 });
    }
    throw error;
  }

  const validation = validateArticle(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { slug } = await params;
  const article = { ...validation.article, slug };
  try {
    const updated = updateArticle(slug, article);
    if (!updated) {
      return NextResponse.json({ error: "No se encontró el artículo que quieres editar." }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof DuplicateArticleSlugError) {
      return NextResponse.json({ error: "Ya existe un artículo con ese slug." }, { status: 409 });
    }
    throw error;
  }

  return NextResponse.json({ article });
}
