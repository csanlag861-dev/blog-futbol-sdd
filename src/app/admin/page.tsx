import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminPanel } from "@/app/admin/admin-panel";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { getAllArticles } from "@/lib/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administración",
};

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <main className="main-content admin-page">
        <section className="admin-setup-card">
          <p className="eyebrow">Configuración necesaria</p>
          <h1>Activa el panel de administración</h1>
          <p>
            Añade <code>ADMIN_PASSWORD</code> a <code>.env.local</code> y reinicia el
            servidor para proteger el acceso.
          </p>
          <Link className="text-link" href="/">Volver al blog</Link>
        </section>
      </main>
    );
  }

  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return <AdminPanel initialArticles={getAllArticles()} />;
}
