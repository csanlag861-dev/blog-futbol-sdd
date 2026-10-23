# Blog de fútbol

Blog editorial de fútbol en español, diseñado para ofrecer una experiencia de lectura clara, navegación sencilla y una interfaz adaptable a móviles, tabletas y escritorio.

> **Estado:** estructura inicial de la aplicación creada. El contenido editorial se incorporará más adelante.

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
│   ├── acerca-de/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       └── button.tsx
└── lib/
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

El MVP no contempla cuentas de usuario, comentarios, buscador, suscripciones, publicación automatizada, panel de administración ni CMS.