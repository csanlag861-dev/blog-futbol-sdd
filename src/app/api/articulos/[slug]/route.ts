import { NextResponse } from "next/server";
import { getPublishedArticle } from "@/lib/database";

export const runtime = "nodejs";

type ArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) {
    return NextResponse.json(
      { error: "No se encontró el artículo publicado." },
      { status: 404 },
    );
  }

  return NextResponse.json({ article });
}
