import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/admin-auth";

export async function POST() {
  const session = clearAdminSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(session.name, session.value, session.options);
  return response;
}
