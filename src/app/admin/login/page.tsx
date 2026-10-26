import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acceso de administración",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return <LoginForm configured={isAdminConfigured()} />;
}
