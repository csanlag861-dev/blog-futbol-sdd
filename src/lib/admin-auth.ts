import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "blog_admin_session";
const sessionDurationSeconds = 60 * 60 * 8;

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sign(timestamp: string, password: string) {
  return createHmac("sha256", password).update(timestamp).digest("hex");
}

export function verifyAdminPassword(candidate: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length > 256 || candidate.length > 256) return false;

  const expected = Buffer.from(password);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function isAdminAuthenticated() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const value = (await cookies()).get(cookieName)?.value;
  const [timestamp, signature, extra] = value?.split(".") ?? [];
  if (!timestamp || !signature || extra || !/^\d+$/.test(timestamp)) return false;

  const issuedAt = Number(timestamp);
  const now = Math.floor(Date.now() / 1000);
  if (issuedAt > now || now - issuedAt > sessionDurationSeconds) return false;

  const expected = Buffer.from(sign(timestamp, password));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function createAdminSession() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD no está configurada.");

  const timestamp = String(Math.floor(Date.now() / 1000));
  return {
    name: cookieName,
    value: `${timestamp}.${sign(timestamp, password)}`,
    options: {
      httpOnly: true,
      sameSite: "strict" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: sessionDurationSeconds,
    },
  };
}

export function clearAdminSession() {
  return {
    name: cookieName,
    value: "",
    options: {
      httpOnly: true,
      sameSite: "strict" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    },
  };
}
