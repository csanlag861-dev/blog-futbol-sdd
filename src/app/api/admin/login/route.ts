import { NextResponse } from "next/server";
import { createAdminSession, isAdminConfigured, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "El panel no está configurado. Define ADMIN_PASSWORD en .env.local." },
      { status: 503 },
    );
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

  if (
    typeof body !== "object" ||
    body === null ||
    !("password" in body) ||
    typeof body.password !== "string" ||
    !verifyAdminPassword(body.password)
  ) {
    return NextResponse.json({ error: "La contraseña no es correcta." }, { status: 401 });
  }

  const session = createAdminSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(session.name, session.value, session.options);
  return response;
}
