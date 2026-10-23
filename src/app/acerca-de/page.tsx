import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de",
  description: "Conoce el propósito de este blog dedicado al fútbol.",
};

export default function AboutPage() {
  return (
    <main className="main-content page-content">
      <p className="eyebrow">Acerca de</p>
      <h1>El fútbol también se cuenta.</h1>
      <p className="page-lead">
        Este blog nace para explorar el juego desde todos sus ángulos: sus
        historias, sus ideas y las personas que lo hacen especial.
      </p>
      <p className="page-copy">
        Publicamos análisis, historias y perspectivas para disfrutar del fútbol
        más allá del resultado. El contenido de esta revista está pensado para
        leerse con calma y desde cualquier dispositivo.
      </p>
      <Link className="text-link" href="/">
        <span aria-hidden="true">←</span> Volver al inicio
      </Link>
    </main>
  );
}
