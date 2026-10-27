import { NextResponse } from "next/server";
import {
  createArticle,
  DuplicateArticleSlugError,
  getPublishedArticles,
} from "@/lib/database";
import { isApiTokenAuthorized, isApiTokenConfigured } from "@/lib/api-auth";
import { validateDraftArticle } from "@/lib/validate-article";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ articles: getPublishedArticles() });
}

export async function POST(request: Request) {
  if (!isApiTokenConfigured()) {
    return NextResponse.json(
      { error: "La API no está configurada. Define un API_TOKEN de al menos 32 caracteres." },
      { status: 503 },
    );
  }

  if (!isApiTokenAuthorized(request.headers.get("authorization"))) {
    return NextResponse.json(
      { error: "Falta un token Bearer válido." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "La solicitud no tiene un formato válido." },
        { status: 400 },
      );
    }
    throw error;
  }

  const validation = validateDraftArticle(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    createArticle(validation.article);
  } catch (error) {
    if (error instanceof DuplicateArticleSlugError) {
      return NextResponse.json(
        { error: "Ya existe un artículo con ese slug." },
        { status: 409 },
      );
    }
    throw error;
  }

  return NextResponse.json({ article: validation.article }, { status: 201 });
}
