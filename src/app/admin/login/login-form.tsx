"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "No se pudo iniciar sesión.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="main-content admin-page admin-login-page">
      <section className="admin-login-card" aria-labelledby="login-title">
        <p className="eyebrow">Acceso privado</p>
        <h1 id="login-title">Administración</h1>
        {configured ? (
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="admin-field">
              <span>Contraseña de administrador</span>
              <input
                autoComplete="current-password"
                autoFocus
                disabled={isSubmitting}
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>
            {error && <p className="admin-message admin-message-error" role="alert">{error}</p>}
            <button className="admin-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Comprobando…" : "Entrar"}
            </button>
          </form>
        ) : (
          <p className="admin-message">
            Para habilitar el acceso, define <code>ADMIN_PASSWORD</code> en el archivo
            <code> .env.local</code> y reinicia el servidor.
          </p>
        )}
      </section>
    </main>
  );
}
