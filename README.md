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

### Acceso al panel de administración

Para usar el panel, copia `.env.example` a `.env.local` y define una contraseña
larga para `ADMIN_PASSWORD`:

```powershell
Copy-Item .env.example .env.local
```

Abre `/admin` e inicia sesión con esa contraseña. El navegador recibe y envía
automáticamente una cookie de sesión para mantener el acceso. No tienes que
generar, copiar ni guardar la cookie en `.env`. Desde el panel puedes crear y
editar artículos y decidir si están publicados. Los borradores solo aparecen
en el panel.

## API y automatizaciones

El panel y las automatizaciones se autentican de forma distinta:

- **Panel:** usa `ADMIN_PASSWORD` para iniciar sesión. La cookie de sesión la
  gestiona el navegador; permite trabajar desde el panel, incluidas las
  operaciones de edición y publicación.
- **Automatizaciones y agentes:** usan `API_TOKEN` para enviar solicitudes a la
  API. Este token no inicia sesión en el panel y, actualmente, solo permite
  crear borradores. No permite editar ni publicar artículos.

Solo necesitas configurar `API_TOKEN` si vas a usar la API para crear
borradores. Genera un valor aleatorio:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Guarda el resultado como `API_TOKEN` en `.env.local` y configura el mismo valor
como variable de entorno en la automatización que llamará a la API. Debe tener
al menos 32 caracteres. Reinicia el servidor después de cambiar `.env.local`.
No compartas ni publiques los secretos; `.env.local` está excluido de Git.

La lista y el detalle de artículos publicados son públicos:

```bash
curl -L http://localhost:3000/api/articulos/
curl -L http://localhost:3000/api/articulos/el-futbol-que-no-sale-en-las-estadisticas/
```

Para crear un borrador en PowerShell, establece el token en la sesión y envíalo
en el encabezado `Authorization`. Sustituye `TU_API_TOKEN` por el valor de
`API_TOKEN`; no lo escribas en el código de tu automatización:

```powershell
$env:API_TOKEN = "TU_API_TOKEN"
curl.exe -L `
  -H "Authorization: Bearer $env:API_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"slug":"analisis-del-partido","title":"Análisis del partido","category":"Táctica","date":"27 de octubre de 2026","readingTime":"4 min de lectura","excerpt":"Una mirada al encuentro.","lead":"El partido se decidió por la organización.","image":"/images/partido.jpg","imageAlt":"Partido de fútbol","sections":[{"heading":"El desarrollo","paragraphs":["El equipo mantuvo el orden."]}]}' `
  http://localhost:3000/api/articulos/
```

La API responde `201` cuando crea el artículo y siempre lo guarda como borrador,
incluso si la petición incluye `"published": true`. Los borradores no aparecen
en las consultas públicas. No necesitas gestionar archivos de cookies para las
automatizaciones.

## Contenido e imágenes

Las imágenes pueden ser rutas locales o URLs HTTPS de cualquier dominio. Las
imágenes de Unsplash se optimizan con Next.js; las de otros sitios se cargan
directamente desde el navegador, así que el servidor no necesita una lista de
dominios ni descarga esas imágenes.

Los artículos se guardan en `data/blog.sqlite`, que se crea automáticamente y
no se incluye en Git. En producción, SQLite requiere un disco persistente; si
el proveedor de despliegue no lo ofrece, habrá que migrar a una base de datos
persistente antes de publicar cambios desde el panel.

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Comandos disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo
npm run lint      # Ejecuta ESLint
npm run typecheck # Comprueba los tipos de TypeScript
npm test          # Compila y ejecuta las pruebas de integración de la API
npm run build     # Genera la compilación de producción
npm run start     # Inicia la aplicación compilada
```

## Estructura

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   │   ├── admin/
│   │   └── articulos/[slug]/
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
    ├── api-auth.ts
    ├── articles.ts
    ├── database.ts
    ├── validate-article.ts
    └── utils.ts
```

Las rutas y páginas utilizan el App Router de Next.js. Los componentes de
shadcn/ui se guardan en el propio proyecto para poder adaptarlos a la identidad
visual.

## Documentación

- [PRD](./PRD.md): requisitos, alcance y dirección técnica.
- [Briefing](./briefing.md): resumen del objetivo y de la experiencia.
- [Visión del producto](./spec/vision.md): público, propuesta de valor y principios.
- [Alcance](./spec/scope.md): funcionalidades incluidas y excluidas.
- [Criterios de aceptación](./spec/acceptance-criteria.md): condiciones para validar el MVP.

## Fuera del alcance inicial

El MVP no contempla cuentas ni perfiles de usuario, comentarios, buscador,
suscripciones, publicación automatizada ni un CMS externo.
