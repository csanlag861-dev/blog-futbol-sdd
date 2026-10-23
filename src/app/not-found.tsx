import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main-content page-content">
      <p className="eyebrow">404 · Página no encontrada</p>
      <h1>Esta página se ha ido fuera de juego.</h1>
      <p className="page-lead">
        Puede que la dirección no exista o que el contenido se haya movido.
      </p>
      <Link className="text-link" href="/">
        <span aria-hidden="true">←</span> Volver al inicio
      </Link>
    </main>
  );
}
