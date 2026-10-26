import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Blog de fútbol",
    template: "%s | Blog de fútbol",
  },
  description:
    "Un espacio para descubrir y disfrutar artículos sobre el mundo del fútbol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link className="wordmark" href="/">
              <span className="wordmark-mark" aria-hidden="true">
                B
              </span>
              <span>Blog de fútbol</span>
            </Link>
            <nav aria-label="Navegación principal" className="site-nav">
              <Link href="/">Inicio</Link>
              <Link href="/acerca-de">Acerca de</Link>
              <Link href="/admin">Administración</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-footer-inner">
            <span>Blog de fútbol</span>
            <span>Un espacio para disfrutar del juego.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
