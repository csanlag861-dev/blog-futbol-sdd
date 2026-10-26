# Blog de fútbol

Blog editorial de fútbol en español, diseñado para ofrecer una experiencia de lectura clara, navegación sencilla y una interfaz adaptable a móviles, tabletas y escritorio.

> **Estado:** blog con artículos iniciales y panel privado para gestionarlos.

## Objetivo

Reunir artículos de fútbol en un espacio ligero y fácil de recorrer. El proyecto está preparado para incorporar publicaciones, páginas individuales de artículo y contenido local mantenible.

## Tecnologías

- [Next.js](https://nextjs.org/) con App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Requisitos

- Node.js 20.9 o posterior
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

Para habilitar el panel, copia `.env.example` a `.env.local`, establece una
contraseña larga para `ADMIN_PASSWORD` y reinicia el servidor:

```powershell
Copy-Item .env.example .env.local
```

El panel está disponible en `/admin`. Permite crear y editar artículos, añadir
secciones y decidir si cada artículo está publicado. Los borradores solo
aparecen en el panel. Los perfiles de usuario no están incluidos porque el blog
todavía no tiene cuentas.

Las imágenes pueden ser rutas locales o URLs HTTPS de cualquier dominio. Las
imágenes de Unsplash se optimizan con Next.js; las de otros sitios se cargan
directamente desde el navegador, así que el servidor no necesita una lista de
dominios ni descarga esas imágenes.

Los artículos se guardan en `data/blog.sqlite`, que se crea automáticamente y
no se incluye en Git. En producción, SQLite requiere un disco persistente; si
el proveedor de despliegue no lo ofrece, habrá que migrar a una base de datos
persistente antes de publicar cambios desde el panel.

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### Comandos disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo
npm run lint      # Ejecuta ESLint
npm run typecheck # Comprueba los tipos de TypeScript
npm run build     # Genera la compilación de producción
npm run start     # Inicia la aplicación compilada
```

## Estructura

```text
src/
├── app/
│   ├── admin/
│   ├── api/admin/
│   ├── acerca-de/
│   │   └── page.tsx
│   ├── articulos/[slug]/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       └── button.tsx
└── lib/
    ├── admin-auth.ts
    ├── articles.ts
    ├── database.ts
    └── utils.ts
```

Las rutas y páginas utilizan el App Router de Next.js. Los componentes de shadcn/ui se guardan en el propio proyecto para poder adaptarlos a la identidad visual.

## Documentación

- [PRD](./PRD.md): requisitos, alcance y dirección técnica.
- [Briefing](./briefing.md): resumen del objetivo y de la experiencia.
- [Visión del producto](./spec/vision.md): público, propuesta de valor y principios.
- [Alcance](./spec/scope.md): funcionalidades incluidas y excluidas.
- [Criterios de aceptación](./spec/acceptance-criteria.md): condiciones para validar el MVP.

## Fuera del alcance inicial

El MVP no contempla cuentas ni perfiles de usuario, comentarios, buscador,
suscripciones, publicación automatizada ni un CMS externo.